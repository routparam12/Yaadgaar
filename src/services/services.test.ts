import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNewEventRecord,
  formatInvitationPipeDate,
  formatViewerCount,
  resolveEventByCode,
  streamService,
  validateBlessingInput,
} from './streamService';
import { buildAlbumSpreads } from './albumService';
import { formatPlanPriceDisplay, PRICING_PLANS } from './paymentService';
import { storageService } from './storageService';

test('validateBlessingInput rejects empty author or short message', () => {
  assert.equal(validateBlessingInput({ author: 'A', message: 'Shubh vivah' }).valid, false);
  assert.equal(validateBlessingInput({ author: 'Chacha Ji', message: 'Hi' }).valid, false);
  assert.equal(
    validateBlessingInput({ author: 'Chacha Ji', message: 'Sada sukhi raho!' }).valid,
    true,
  );
});

test('streamService adds blessing, resolves QR URLs, and creates host events', () => {
  const res = streamService.addBlessing({
    eventId: 'evt-nayana-aarav',
    author: 'Bua Ji',
    relation: 'Bua',
    city: 'Lucknow',
    message: 'Dher saara pyaar aur aashirwad!',
    ceremonyTag: 'Pheras',
  });
  assert.equal(res.ok, true);
  const wishes = streamService.getBlessings('evt-nayana-aarav');
  assert.equal(wishes[0].author, 'Bua Ji');

  const resolved = streamService.resolveByCodeOrUrl(
    'https://yaadgaar.in/join/NAYANA-AARAV-26',
  );
  assert.equal(resolved?.id, 'evt-nayana-aarav');

  const created = streamService.createEvent({
    brideName: 'Anupoma',
    groomName: 'Prakhar',
    city: 'Kolkata',
    venue: 'Rajbari Lawn',
    dateFormatted: 'December 2, 2026',
    schedule: [],
  });
  assert.equal(created.code, 'ANUPOMA-PRAKHAR-26');
  assert.equal(
    resolveEventByCode(streamService.getEvents(), 'ANUPOMA-PRAKHAR-26')?.coupleNames,
    'Anupoma & Prakhar',
  );
});

test('formatViewerCount formats Indian numerals cleanly', () => {
  assert.equal(formatViewerCount(1250), '1,250');
  assert.equal(formatViewerCount(-5), '0');
});

test('formatInvitationPipeDate parses Month Day Year cleanly', () => {
  const parsed = formatInvitationPipeDate('November 23, 2026');
  assert.deepEqual(parsed, { month: 'NOVEMBER', day: '23', year: '2026' });
});

test('buildNewEventRecord provides default schedule when empty', () => {
  const evt = buildNewEventRecord({
    brideName: 'Meera',
    groomName: 'Dev',
    city: 'Jodhpur',
    venue: 'Surya Garh',
    dateFormatted: 'Nov 14, 2026',
    schedule: [],
  });
  assert.equal(evt.schedule.length, 1);
  assert.equal(evt.schedule[0].ceremony, 'Pheras');
});

test('buildAlbumSpreads generates cover, dedication, and paired photo spreads', () => {
  const photos = storageService.getInitialPhotos();
  const spreads = buildAlbumSpreads({
    coupleNames: 'Nayana & Aarav',
    dateFormatted: 'November 23, 2026',
    venue: 'Jagmandir',
    dedication: 'For our families near and far.',
    photos,
  });
  assert.equal(spreads[0].kind, 'cover');
  assert.equal(spreads[1].kind, 'dedication');
  assert.equal(spreads.length, 2 + Math.ceil(photos.length / 2));
});

test('formatPlanPriceDisplay handles Self-Storage one-time and We Store It monthly/yearly', () => {
  const selfPlan = PRICING_PLANS[0];
  const vaultPlan = PRICING_PLANS[1];
  assert.equal(formatPlanPriceDisplay(selfPlan, 'monthly').amount, '₹199');
  assert.equal(formatPlanPriceDisplay(vaultPlan, 'monthly').amount, '₹299 / mo');
  assert.equal(formatPlanPriceDisplay(vaultPlan, 'yearly').amount, '₹2,999 / yr');
});

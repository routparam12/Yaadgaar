import {
  BlessingWish,
  CeremonyChapter,
  GuestbookEntry,
  ScheduleItem,
  WeddingEvent,
} from '../types/yaadgaar';

export const ASSET_IMAGES = {
  mandapCouple: '/assets/images/anime_mandap_couple_1794675233709.jpg',
  haldi: '/assets/images/anime_haldi_celebration_1794675234361.jpg',
  mehendi: '/assets/images/anime_mehendi_garden_1794675234782.jpg',
  sangeet: '/assets/images/anime_sangeet_dance_1794675235362.jpg',
  pheras: '/assets/images/anime_pheras_blessing_1794675236848.jpg',
  ganesh: '/assets/images/ganesha_gold_ivory_1794680087655.jpg',
};

const DEFAULT_CHAPTERS: CeremonyChapter[] = [
  {
    id: 'ch-haldi',
    ceremony: 'Haldi',
    title: 'Haldi & Choora Morning',
    duration: '42:18',
    timestampLabel: '00:00',
    description:
      'Sunlit courtyard blessings with haldi paste, marigold showers, and dholki songs led by both grandmothers.',
    thumbnail: ASSET_IMAGES.haldi,
    highlightQuote: 'Jitne haathon se haldi lagti hai, utni hi duaon se ghar sajta hai.',
  },
  {
    id: 'ch-mehendi',
    ceremony: 'Mehendi',
    title: 'Mehendi & Henna Courtyard',
    duration: '58:04',
    timestampLabel: '42:18',
    description:
      'Intricate bridal henna, green glass bangles, and cousins hiding the groom’s name in every swirl.',
    thumbnail: ASSET_IMAGES.mehendi,
    highlightQuote: 'Mehendi ka gehra rang pyaar aur parivaar ke saath ki nishani hai.',
  },
  {
    id: 'ch-sangeet',
    ceremony: 'Sangeet',
    title: 'Sangeet Evening & Dholak',
    duration: '1:24:10',
    timestampLabel: '1:40:22',
    description:
      'Lantern-lit performances, choreographed family medleys, and warm applause from relatives joining on video.',
    thumbnail: ASSET_IMAGES.sangeet,
    highlightQuote: 'Geeton mein woh kisse hain jo har peedhi yaad rakhegi.',
  },
  {
    id: 'ch-pheras',
    ceremony: 'Pheras',
    title: 'Varmala & Saat Pheras',
    duration: '1:48:50',
    timestampLabel: '3:04:32',
    description:
      'The sacred agni, tied gathbandhan cloth, and seven promises spoken under marigold canopies.',
    thumbnail: ASSET_IMAGES.pheras,
    highlightQuote: 'Saat kadam, ek saath, har janam ke liye.',
  },
  {
    id: 'ch-vidaai',
    ceremony: 'Vidaai',
    title: 'Vidaai & Aashirwad',
    duration: '26:12',
    timestampLabel: '4:53:22',
    description:
      'Tears, rice grains tossed over the shoulder, and gentle blessings for a joyful new beginning.',
    thumbnail: ASSET_IMAGES.mandapCouple,
    highlightQuote: 'Beti vida hoti hai par uska pyaar hamesha aangan mein rehta hai.',
  },
  {
    id: 'ch-reception',
    ceremony: 'Reception',
    title: 'Grand Reception Toast',
    duration: '52:40',
    timestampLabel: '5:19:34',
    description:
      'Candlelit speeches, family portraits, and remote guests raising a toast from six countries.',
    thumbnail: ASSET_IMAGES.sangeet,
    highlightQuote: 'Har shehar se ek hi dua — hamesha khush raho.',
  },
];

const INITIAL_EVENTS: WeddingEvent[] = [
  {
    id: 'evt-nayana-aarav',
    code: 'NAYANA-AARAV-26',
    coupleNames: 'Nayana & Aarav',
    brideName: 'Nayana',
    groomName: 'Aarav',
    city: 'Udaipur, Rajasthan',
    venue: 'Jagmandir Courtyard Mandap',
    monthLabel: 'November',
    yearLabel: '2026',
    highlightedDays: [22, 23],
    dateFormatted: 'November 23, 2026',
    status: 'live',
    activeCeremony: 'Pheras',
    viewerCount: 284,
    streamUrlPlaceholder: 'hls://stream.yaadgaar.in/live/nayana-aarav/master.m3u8',
    youtubeEmbedIdPlaceholder: 'live_mandap_nayana_aarav',
    storyNote:
      'For Dada-Dadi in Pune, Masi in Melbourne, and every friend who could not fly in — welcome to our mandap.',
    schedule: [
      {
        id: 'sch-1',
        ceremony: 'Haldi',
        time: '10:00 AM IST',
        dateLabel: 'Nov 22',
        venueNote: 'Surya Courtyard',
        iconKind: 'ceremony',
      },
      {
        id: 'sch-2',
        ceremony: 'Mehendi',
        time: '03:30 PM IST',
        dateLabel: 'Nov 22',
        venueNote: 'Champa Verandah',
        iconKind: 'blessing',
      },
      {
        id: 'sch-3',
        ceremony: 'Sangeet',
        time: '07:30 PM IST',
        dateLabel: 'Nov 22',
        venueNote: 'Darbar Lawn',
        iconKind: 'music',
      },
      {
        id: 'sch-4',
        ceremony: 'Pheras',
        time: '11:20 AM IST',
        dateLabel: 'Nov 23',
        venueNote: 'Lotus Mandap',
        iconKind: 'fire',
      },
      {
        id: 'sch-5',
        ceremony: 'Reception',
        time: '07:00 PM IST',
        dateLabel: 'Nov 23',
        venueNote: 'Grand Pavilion Feast',
        iconKind: 'feast',
      },
    ],
    chapters: DEFAULT_CHAPTERS,
  },
  {
    id: 'evt-ridhima-aman',
    code: 'RIDHIMA-AMAN-26',
    coupleNames: 'Ridhima & Aman',
    brideName: 'Ridhima',
    groomName: 'Aman',
    city: 'Jaipur, Rajasthan',
    venue: 'Samode Haveli Bagh',
    monthLabel: 'December',
    yearLabel: '2026',
    highlightedDays: [1, 2],
    dateFormatted: 'December 2, 2026',
    status: 'archived',
    activeCeremony: 'Reception',
    viewerCount: 412,
    streamUrlPlaceholder: 'hls://stream.yaadgaar.in/vod/ridhima-aman/master.m3u8',
    storyNote: 'Preserved forever with every family toast from Delhi, Mumbai, and California.',
    schedule: [
      {
        id: 'sch-r1',
        ceremony: 'Roka',
        time: '11:00 AM IST',
        dateLabel: 'Dec 1',
        venueNote: 'Main Haveli',
        iconKind: 'blessing',
      },
      {
        id: 'sch-r2',
        ceremony: 'Pheras',
        time: '04:15 PM IST',
        dateLabel: 'Dec 2',
        venueNote: 'Garden Mandap',
        iconKind: 'fire',
      },
      {
        id: 'sch-r3',
        ceremony: 'Reception',
        time: '08:00 PM IST',
        dateLabel: 'Dec 2',
        venueNote: 'Sheesh Mahal Dinner',
        iconKind: 'feast',
      },
    ],
    chapters: DEFAULT_CHAPTERS,
  },
];

const INITIAL_BLESSINGS: BlessingWish[] = [
  {
    id: 'w-1',
    eventId: 'evt-nayana-aarav',
    author: 'Sunita Masi',
    relation: 'Masi Ji',
    city: 'Melbourne',
    message: 'Nayana beta, watching from Melbourne with tears of joy. Bhagwan aap dono ki jodi hamesha salamat rakhe!',
    createdAt: '2 mins ago',
    ceremonyTag: 'Pheras',
  },
  {
    id: 'w-2',
    eventId: 'evt-nayana-aarav',
    author: 'Raghav & Priya',
    relation: 'College Friends',
    city: 'Bengaluru',
    message: 'Aarav looking royal in that safa! Sending loudest cheers for the varmala.',
    createdAt: '6 mins ago',
    ceremonyTag: 'Pheras',
  },
  {
    id: 'w-3',
    eventId: 'evt-nayana-aarav',
    author: 'Dada Ji & Dadi Maa',
    relation: 'Grandparents',
    city: 'Pune',
    message: 'Dono parivaaron ko dher saara aashirwad. Sada sukhi raho, hamesha saath muskurate raho.',
    createdAt: '14 mins ago',
    ceremonyTag: 'Haldi',
  },
];

const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb-1',
    eventId: 'evt-nayana-aarav',
    familyName: 'Sharma Parivaar (Bhopal)',
    city: 'Bhopal, India',
    attendingFrom: 'Remote',
    note: 'We gathered all 11 cousins around the TV on the livestream. Felt like we were sitting in the front row!',
    signedAt: 'Today · 11:08 AM',
  },
  {
    id: 'gb-2',
    eventId: 'evt-nayana-aarav',
    familyName: 'Dr. Arvind & Meera Iyer',
    city: 'Toronto, Canada',
    attendingFrom: 'Remote',
    note: 'Scanned the QR code right off your printed card! Wishing Nayana & Aarav a lifetime of warmth.',
    signedAt: 'Today · 10:45 AM',
  },
];

// Pure validation and transformation helpers (unit-tested in services.test.ts)
export function validateBlessingInput(input: {
  author: string;
  message: string;
}): { valid: boolean; error?: string } {
  const author = input.author.trim();
  const message = input.message.trim();
  if (author.length < 2) {
    return { valid: false, error: 'Please enter your name (at least 2 characters).' };
  }
  if (message.length < 4) {
    return { valid: false, error: 'Please write a heartfelt blessing (at least 4 characters).' };
  }
  if (message.length > 280) {
    return { valid: false, error: 'Blessing must be 280 characters or fewer.' };
  }
  return { valid: true };
}

export function resolveEventByCode(
  events: WeddingEvent[],
  rawCode: string,
): WeddingEvent | null {
  const normalized = rawCode.trim().toUpperCase().replace(/^YAADGAAR:/, '');
  if (!normalized) return null;
  return (
    events.find(
      (evt) =>
        evt.code.toUpperCase() === normalized ||
        evt.id.toUpperCase() === normalized ||
        normalized.includes(evt.code.toUpperCase()),
    ) ?? null
  );
}

export function formatViewerCount(count: number): string {
  return new Intl.NumberFormat('en-IN').format(Math.max(0, Math.round(count)));
}

export function buildNewEventRecord(input: {
  brideName: string;
  groomName: string;
  city: string;
  venue: string;
  dateFormatted: string;
  schedule: ScheduleItem[];
}): WeddingEvent {
  const bride = input.brideName.trim() || 'Aanya';
  const groom = input.groomName.trim() || 'Kabir';
  const slug = `${bride}-${groom}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const code = `${bride.toUpperCase().replace(/[^A-Z0-9]/g, '')}-${groom
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')}-26`;

  return {
    id: `evt-${slug}-${Date.now().toString(36)}`,
    code,
    coupleNames: `${bride} & ${groom}`,
    brideName: bride,
    groomName: groom,
    city: input.city.trim() || 'Jaipur, India',
    venue: input.venue.trim() || 'Royal Courtyard Mandap',
    monthLabel: 'December',
    yearLabel: '2026',
    highlightedDays: [14, 15],
    dateFormatted: input.dateFormatted.trim() || 'December 15, 2026',
    status: 'live',
    activeCeremony: input.schedule[0]?.ceremony ?? 'Haldi',
    viewerCount: 1,
    streamUrlPlaceholder: `hls://stream.yaadgaar.in/live/${slug}/master.m3u8`,
    storyNote: `Welcome to ${bride} & ${groom}'s ceremony — preserved forever on Yaadgaar.`,
    schedule:
      input.schedule.length > 0
        ? input.schedule
        : [
            {
              id: `sch-${Date.now()}`,
              ceremony: 'Pheras',
              time: '11:00 AM IST',
              dateLabel: 'Day 1',
              venueNote: input.venue.trim() || 'Main Mandap',
              iconKind: 'fire',
            },
          ],
    chapters: DEFAULT_CHAPTERS,
  };
}

class StreamService {
  private events: WeddingEvent[] = [...INITIAL_EVENTS];
  private blessings: BlessingWish[] = [...INITIAL_BLESSINGS];
  private guestbook: GuestbookEntry[] = [...INITIAL_GUESTBOOK];

  getEvents(): WeddingEvent[] {
    return [...this.events];
  }

  getEventById(id: string): WeddingEvent {
    return this.events.find((e) => e.id === id) ?? this.events[0];
  }

  resolveByCodeOrUrl(payload: string): WeddingEvent | null {
    // Handles either plain code ("NAYANA-AARAV-26") or QR URL ("https://yaadgaar.in/join/NAYANA-AARAV-26")
    const parts = payload.trim().split('/');
    const tail = parts[parts.length - 1] ?? payload;
    return resolveEventByCode(this.events, tail) ?? resolveEventByCode(this.events, payload);
  }

  getBlessings(eventId: string): BlessingWish[] {
    return this.blessings.filter((b) => b.eventId === eventId);
  }

  addBlessing(input: {
    eventId: string;
    author: string;
    relation: string;
    city: string;
    message: string;
    ceremonyTag?: WeddingEvent['activeCeremony'];
  }): { ok: true; blessing: BlessingWish } | { ok: false; error: string } {
    const check = validateBlessingInput({
      author: input.author,
      message: input.message,
    });
    if (!check.valid) {
      return { ok: false, error: check.error ?? 'Invalid blessing.' };
    }
    const blessing: BlessingWish = {
      id: `w-${Date.now().toString(36)}`,
      eventId: input.eventId,
      author: input.author.trim(),
      relation: input.relation.trim() || 'Family & Well-wisher',
      city: input.city.trim() || 'Joining Live',
      message: input.message.trim(),
      createdAt: 'Just now',
      ceremonyTag: input.ceremonyTag,
    };
    this.blessings = [blessing, ...this.blessings];
    return { ok: true, blessing };
  }

  getGuestbook(eventId: string): GuestbookEntry[] {
    return this.guestbook.filter((g) => g.eventId === eventId);
  }

  signGuestbook(input: {
    eventId: string;
    familyName: string;
    city: string;
    attendingFrom: 'Remote' | 'In Person';
    note: string;
  }): { ok: true; entry: GuestbookEntry } | { ok: false; error: string } {
    if (input.familyName.trim().length < 2) {
      return { ok: false, error: 'Please enter your name or family name.' };
    }
    if (input.note.trim().length < 4) {
      return { ok: false, error: 'Please write a short guestbook note.' };
    }
    const entry: GuestbookEntry = {
      id: `gb-${Date.now().toString(36)}`,
      eventId: input.eventId,
      familyName: input.familyName.trim(),
      city: input.city.trim() || 'India',
      attendingFrom: input.attendingFrom,
      note: input.note.trim(),
      signedAt: 'Just now',
    };
    this.guestbook = [entry, ...this.guestbook];
    return { ok: true, entry };
  }

  createEvent(input: {
    brideName: string;
    groomName: string;
    city: string;
    venue: string;
    dateFormatted: string;
    schedule: ScheduleItem[];
  }): WeddingEvent {
    const created = buildNewEventRecord(input);
    this.events = [created, ...this.events];
    return created;
  }

  bumpViewerCount(eventId: string, delta: number): number {
    this.events = this.events.map((e) =>
      e.id === eventId ? { ...e, viewerCount: Math.max(1, e.viewerCount + delta) } : e,
    );
    return this.getEventById(eventId).viewerCount;
  }
}

export function formatInvitationPipeDate(dateFormatted: string): {
  month: string;
  day: string;
  year: string;
} {
  const cleaned = dateFormatted.replace(/,/g, '').trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length >= 3) {
    return {
      month: parts[0].toUpperCase(),
      day: parts[1].toUpperCase(),
      year: parts[2].toUpperCase(),
    };
  }
  return {
    month: cleaned.toUpperCase() || 'NOVEMBER',
    day: '23',
    year: '2026',
  };
}

export const streamService = new StreamService();

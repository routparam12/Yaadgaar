import React, { useEffect, useState } from 'react';
import {
  Camera,
  CheckCircle2,
  Eye,
  Heart,
  MapPin,
  Radio,
  Send,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  BlessingWish,
  GuestbookEntry,
  ScheduleItem,
  WeddingEvent,
} from '../types/yaadgaar';
import {
  ASSET_IMAGES,
  formatViewerCount,
  streamService,
} from '../services/streamService';
import { MughalArchFrame } from '../components/MughalArchFrame';
import { PetalBurst } from '../components/PetalBurst';

interface EventLiveScreenProps {
  event: WeddingEvent;
  onOpenArchive: () => void;
  onOpenQr: () => void;
}

const CAMERA_FEEDS = [
  { id: 'mandap', label: 'Main Mandap (HLS)', image: ASSET_IMAGES.mandapCouple },
  { id: 'agni', label: 'Havan & Pheras', image: ASSET_IMAGES.pheras },
  { id: 'courtyard', label: 'Family Courtyard', image: ASSET_IMAGES.haldi },
];

const ScheduleIcon: React.FC<{ kind: ScheduleItem['iconKind'] }> = ({ kind }) => {
  switch (kind) {
    case 'ceremony':
      return (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="11" cy="15" r="5.5" stroke="#3E1230" strokeWidth="1.5" />
          <circle cx="17" cy="15" r="5.5" stroke="#C9A35B" strokeWidth="1.5" />
          <path d="M14 5 L15.5 8 L12.5 8 Z" fill="#D9482B" />
        </svg>
      );
    case 'feast':
      return (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="7.5" stroke="#3E1230" strokeWidth="1.5" />
          <circle cx="14" cy="14" r="4.2" stroke="#C9A35B" strokeWidth="1.2" />
          <line x1="4" y1="7" x2="4" y2="21" stroke="#3E1230" strokeWidth="1.4" />
          <line x1="24" y1="7" x2="24" y2="21" stroke="#3E1230" strokeWidth="1.4" />
        </svg>
      );
    case 'fire':
      return (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M14 5 C11 10, 9 13, 10.5 17 C11.5 19.5, 16.5 19.5, 17.5 17 C19 13, 17 10, 14 5 Z"
            fill="#E8A317"
            stroke="#D9482B"
            strokeWidth="1.4"
          />
          <rect x="7" y="20" width="14" height="3.5" stroke="#3E1230" strokeWidth="1.4" />
        </svg>
      );
    default:
      return (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M6 19 C9 12, 19 12, 22 19"
            stroke="#3E1230"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="14" cy="10" r="3.5" stroke="#D9482B" strokeWidth="1.4" />
        </svg>
      );
  }
};

export const EventLiveScreen: React.FC<EventLiveScreenProps> = ({
  event,
  onOpenArchive,
  onOpenQr,
}) => {
  const [activeCam, setActiveCam] = useState(CAMERA_FEEDS[0]);
  const [muted, setMuted] = useState(false);
  const [viewerCount, setViewerCount] = useState(event.viewerCount);
  const [wallTab, setWallTab] = useState<'blessings' | 'guestbook'>('blessings');

  const [blessings, setBlessings] = useState<BlessingWish[]>(() =>
    streamService.getBlessings(event.id),
  );
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>(() =>
    streamService.getGuestbook(event.id),
  );

  // Blessing form state
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('Family');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [petalTrigger, setPetalTrigger] = useState(0);

  // Guestbook form state
  const [gbFamily, setGbFamily] = useState('');
  const [gbCity, setGbCity] = useState('');
  const [gbMode, setGbMode] = useState<'Remote' | 'In Person'>('Remote');
  const [gbNote, setGbNote] = useState('');
  const [gbFeedback, setGbFeedback] = useState<string | null>(null);

  useEffect(() => {
    setBlessings(streamService.getBlessings(event.id));
    setGuestbook(streamService.getGuestbook(event.id));
    setViewerCount(event.viewerCount);
  }, [event.id, event.viewerCount]);

  // Gentle realistic viewer presence tick
  useEffect(() => {
    const id = window.setInterval(() => {
      const delta = Math.random() > 0.45 ? 1 : -1;
      setViewerCount(streamService.bumpViewerCount(event.id, delta));
    }, 6500);
    return () => window.clearInterval(id);
  }, [event.id]);

  const handleSubmitBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    const res = streamService.addBlessing({
      eventId: event.id,
      author,
      relation,
      city,
      message,
      ceremonyTag: event.activeCeremony,
    });
    if (!res.ok) {
      setFormError(res.error);
      return;
    }
    setFormError(null);
    setBlessings(streamService.getBlessings(event.id));
    setMessage('');
    setPetalTrigger((prev) => prev + 1);
  };

  const handleSubmitGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    const res = streamService.signGuestbook({
      eventId: event.id,
      familyName: gbFamily,
      city: gbCity,
      attendingFrom: gbMode,
      note: gbNote,
    });
    if (!res.ok) {
      setGbFeedback(res.error);
      return;
    }
    setGuestbook(streamService.getGuestbook(event.id));
    setGbFamily('');
    setGbNote('');
    setGbFeedback('Signed in the family guestbook!');
  };

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 py-8 sm:py-12">
      <PetalBurst triggerKey={petalTrigger} />

      {/* Event Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#B5767C]/35 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em]">
            <span className="inline-flex items-center gap-1.5 bg-[#D9482B] text-[#F6EBDD] px-2.5 py-1 font-medium">
              <Radio className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Now Live · {event.activeCeremony}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#3E1230] font-medium tabular-nums">
              <Eye className="h-3.5 w-3.5 text-[#8A2E52]" aria-hidden="true" />
              <span>{formatViewerCount(viewerCount)} parivaar watching</span>
            </span>
          </div>

          <h1 className="mt-3 font-couple text-5xl sm:text-6xl text-[#1E1E1E]">
            {event.coupleNames}
          </h1>
          <p className="mt-1.5 flex items-center gap-2 font-ui text-sm font-medium text-[#4A2A3E]">
            <MapPin className="h-4 w-4 text-[#8A2E52]" aria-hidden="true" />
            <span>
              {event.venue} · {event.city} · {event.dateFormatted}
            </span>
          </p>
        </div>

        <div className="font-ui flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={onOpenQr}
            className="rounded-full px-5 py-2 text-sm font-medium border-[1.5px] border-[#3E1230] bg-transparent text-[#3E1230] hover:bg-[#3E1230]/8 cursor-pointer whitespace-nowrap shrink-0"
          >
            Share Card QR
          </button>
          <button
            type="button"
            onClick={onOpenArchive}
            className="rounded-full px-5 py-2 text-sm font-medium bg-[#3E1230] text-[#FAF6F0] hover:bg-[#571A43] cursor-pointer whitespace-nowrap shrink-0"
          >
            View Chapters
          </button>
        </div>
      </div>

      {/* Main Split: Live Player + Real-Time Blessings Wall */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Structured HLS/YouTube Placeholder Player + Calendar + Schedule */}
        <div className="lg:col-span-7 space-y-8">
          <section
            aria-label="Live Ceremony Video Stream"
            data-stream-url={event.streamUrlPlaceholder}
            className="border border-[#B5767C]/45 bg-[#3E1230] text-[#F6EBDD] shadow-[0_18px_40px_rgba(62,18,48,0.16)]"
          >
            <div className="relative aspect-video overflow-hidden bg-[#27091d]">
              <img
                src={activeCam.image}
                alt={`${activeCam.label} stream view for ${event.coupleNames}`}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover opacity-90 transition-opacity duration-500"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#27091d]/90 via-transparent to-[#27091d]/40" />

              {/* Top Overlay Telemetry */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="bg-[#3E1230]/90 border border-[#C9A35B]/50 px-2.5 py-1 tracking-wider uppercase text-[11px]">
                  {activeCam.label}
                </span>
                <span className="bg-[#3E1230]/90 px-2.5 py-1 text-[11px] tabular-nums">
                  {formatViewerCount(viewerCount)} live
                </span>
              </div>

              {/* Bottom Player Controls */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-[#F6EBDD]/90 max-w-md truncate">
                  {event.storyNote}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMuted((m) => !m)}
                    aria-label={muted ? 'Unmute stream audio' : 'Mute stream audio'}
                    className="inline-flex items-center gap-1.5 bg-[#F6EBDD] text-[#3E1230] px-3 py-1.5 text-xs font-medium cursor-pointer"
                  >
                    {muted ? (
                      <VolumeX className="h-3.5 w-3.5" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                    <span>{muted ? 'Muted' : 'Shehnai Audio'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Camera Angle Switcher (HLS/RTMP multi-feed ready) */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-[#F6EBDD]/15 bg-[#3E1230]">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#C9A35B]">
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Mandap Feed:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {CAMERA_FEEDS.map((cam) => (
                  <button
                    key={cam.id}
                    type="button"
                    onClick={() => setActiveCam(cam)}
                    className={`px-3 py-1 text-xs cursor-pointer transition-colors ${
                      activeCam.id === cam.id
                        ? 'bg-[#C9A35B] text-[#3E1230] font-medium'
                        : 'border border-[#F6EBDD]/25 text-[#F6EBDD]/85 hover:border-[#F6EBDD]'
                    }`}
                  >
                    {cam.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Anupoma & Prakhar inspired Calendar Date Block + Couple Portrait */}
          <section className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center border border-[#B5767C]/40 bg-[#C76C38] text-[#F6EBDD] p-6 shadow-sm">
            <div className="sm:col-span-7 space-y-3">
              <p className="font-editorial text-xs uppercase tracking-[0.2em] text-[#F6EBDD]/85">
                Save the Date · Shubh Vivah
              </p>
              <h2 className="font-couple text-4xl sm:text-5xl">{event.coupleNames}</h2>

              <div className="border border-[#F6EBDD]/40 p-3 bg-[#B45E2D]/60">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest border-b border-[#F6EBDD]/30 pb-1.5 mb-2">
                  <span>{event.monthLabel}</span>
                  <span>{event.yearLabel}</span>
                </div>
                <div className="grid grid-cols-7 text-center text-[11px] font-medium opacity-80 mb-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <span key={`${d}-${i}`}>{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 text-center text-sm font-medium tabular-nums items-center">
                  {[20, 21, 22, 23, 24, 25, 26].map((day) => {
                    const isWeddingDay = event.highlightedDays.includes(day);
                    return (
                      <span
                        key={day}
                        className={`py-1 ${
                          isWeddingDay
                            ? 'rounded-full border-2 border-[#E8A317] bg-[#E8A317]/25 font-semibold'
                            : ''
                        }`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>
              <p className="text-xs text-[#F6EBDD]/85">
                {event.venue} · {event.city}
              </p>
            </div>

            <div className="sm:col-span-5 h-56 sm:h-64">
              <MughalArchFrame variant="closing" accentColor="#F5A623">
                <img
                  src={ASSET_IMAGES.mandapCouple}
                  alt={`Illustrated portrait of ${event.coupleNames}`}
                  referrerPolicy="no-referrer"
                  className="h-56 sm:h-64 w-full object-cover"
                />
              </MughalArchFrame>
            </div>
          </section>

          {/* Ceremony Schedule Strip */}
          <section className="rounded-2xl border border-[#3E1230]/15 bg-white p-6">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.01em] text-[#3E1230] text-center">
              Ceremony Schedule · Karyakram
            </h2>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {event.schedule.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center text-center border border-[#B5767C]/25 bg-[#FFFDF9] p-3"
                >
                  <ScheduleIcon kind={item.iconKind} />
                  <p className="mt-2 font-editorial text-lg font-semibold text-[#3E1230]">
                    {item.ceremony}
                  </p>
                  <p className="text-[11px] font-medium text-[#D9482B] tabular-nums">
                    {item.time}
                  </p>
                  <p className="text-[11px] text-[#3E1230]/70 mt-0.5">
                    {item.dateLabel} · {item.venueNote}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Real-Time Blessings Wall & Guestbook */}
        <aside className="lg:col-span-5 border border-[#B5767C]/45 bg-white p-5 sm:p-6">
          <div className="flex border-b border-[#B5767C]/30 mb-5">
            <button
              type="button"
              onClick={() => setWallTab('blessings')}
              className={`flex-1 pb-3 text-xs uppercase tracking-[0.15em] font-medium cursor-pointer border-b-2 transition-colors ${
                wallTab === 'blessings'
                  ? 'border-[#3E1230] text-[#3E1230]'
                  : 'border-transparent text-[#3E1230]/60'
              }`}
            >
              Blessings Wall ({blessings.length})
            </button>
            <button
              type="button"
              onClick={() => setWallTab('guestbook')}
              className={`flex-1 pb-3 text-xs uppercase tracking-[0.15em] font-medium cursor-pointer border-b-2 transition-colors ${
                wallTab === 'guestbook'
                  ? 'border-[#3E1230] text-[#3E1230]'
                  : 'border-transparent text-[#3E1230]/60'
              }`}
            >
              Guestbook ({guestbook.length})
            </button>
          </div>

          {wallTab === 'blessings' ? (
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-[#3E1230]">
                Dulha-dulhan ke liye dua
              </h2>
              <p className="font-ui text-sm text-[#4A2A3E] mt-1">
                Post your blessing — it blooms onto the live ceremony wall instantly.
              </p>

              <form onSubmit={handleSubmitBlessing} className="mt-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="blessing-author"
                      className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      id="blessing-author"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Meena Chachi"
                      className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230] focus:border-[#3E1230] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="blessing-relation"
                      className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
                    >
                      Relation / City
                    </label>
                    <input
                      id="blessing-relation"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Jaipur / Masi"
                      className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230] focus:border-[#3E1230] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="blessing-role"
                    className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
                  >
                    Parivaar Role
                  </label>
                  <select
                    id="blessing-role"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230] focus:border-[#3E1230] focus:outline-none"
                  >
                    <option value="Family">Family</option>
                    <option value="Grandparents">Dada / Dadi / Nana / Nani</option>
                    <option value="Mama / Masi">Mama / Masi / Bua / Chacha</option>
                    <option value="Friend">Dost / College Friend</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="blessing-msg"
                    className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
                  >
                    Your Blessing (Dua)
                  </label>
                  <textarea
                    id="blessing-msg"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your heartfelt aashirwad for Nayana & Aarav..."
                    className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230] focus:border-[#3E1230] focus:outline-none"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-xs text-[#D9482B] font-medium">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="font-ui w-full rounded-full inline-flex items-center justify-center gap-2 bg-[#3E1230] text-[#FAF6F0] py-2.5 text-sm font-medium hover:bg-[#571A43] transition-colors cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Dua bhejo</span>
                </button>
              </form>

              {/* Accessible Live Blessings Feed */}
              <div
                aria-live="polite"
                aria-label="Live Blessings Feed"
                className="mt-6 space-y-3 max-h-[380px] overflow-y-auto pr-1"
              >
                {blessings.map((wish) => (
                  <article
                    key={wish.id}
                    className="border border-[#B5767C]/30 bg-[#FFFDF9] p-3.5"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-[#3E1230]">
                        {wish.author}
                      </span>
                      <span className="text-[11px] text-[#8A2E52]">
                        {wish.createdAt}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#3E1230]/70">
                      {wish.relation} · {wish.city}
                    </p>
                    <p className="mt-2 text-sm text-[#3E1230]/90 leading-relaxed">
                      “{wish.message}”
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-[#3E1230]">
                Parivaar Guestbook
              </h2>
              <p className="font-ui text-sm text-[#4A2A3E] mt-1">
                Sign the keepsake registry so the couple knows who joined in spirit.
              </p>

              <form onSubmit={handleSubmitGuestbook} className="mt-4 space-y-3">
                <div>
                  <label
                    htmlFor="gb-family"
                    className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
                  >
                    Name / Family Name
                  </label>
                  <input
                    id="gb-family"
                    type="text"
                    value={gbFamily}
                    onChange={(e) => setGbFamily(e.target.value)}
                    placeholder="e.g. Kapoor Family"
                    className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="gb-city"
                      className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
                    >
                      Joining From
                    </label>
                    <input
                      id="gb-city"
                      type="text"
                      value={gbCity}
                      onChange={(e) => setGbCity(e.target.value)}
                      placeholder="e.g. London, UK"
                      className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gb-mode"
                      className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
                    >
                      Attendance
                    </label>
                    <select
                      id="gb-mode"
                      value={gbMode}
                      onChange={(e) =>
                        setGbMode(e.target.value as 'Remote' | 'In Person')
                      }
                      className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230]"
                    >
                      <option value="Remote">Watching Live</option>
                      <option value="In Person">At Venue</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="gb-note"
                    className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
                  >
                    Memory / Note
                  </label>
                  <textarea
                    id="gb-note"
                    rows={2}
                    value={gbNote}
                    onChange={(e) => setGbNote(e.target.value)}
                    placeholder="Share a memory or warm wish..."
                    className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230]"
                  />
                </div>
                {gbFeedback && (
                  <p className="inline-flex items-center gap-1.5 text-xs text-[#3E7B3A] font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{gbFeedback}</span>
                  </p>
                )}
                <button
                  type="submit"
                  className="font-ui w-full rounded-full inline-flex items-center justify-center gap-2 bg-[#3E1230] text-[#FAF6F0] py-2.5 text-sm font-medium hover:bg-[#571A43] cursor-pointer"
                >
                  <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Sign Guestbook</span>
                </button>
              </form>

              <div className="mt-6 space-y-3 max-h-[320px] overflow-y-auto">
                {guestbook.map((g) => (
                  <article
                    key={g.id}
                    className="border border-[#B5767C]/30 bg-[#FFFDF9] p-3.5"
                  >
                    <div className="flex justify-between text-xs font-semibold text-[#3E1230]">
                      <span>{g.familyName}</span>
                      <span className="font-normal text-[#8A2E52]">{g.signedAt}</span>
                    </div>
                    <p className="text-[11px] text-[#3E1230]/70">
                      {g.city} · {g.attendingFrom}
                    </p>
                    <p className="mt-1.5 text-sm text-[#3E1230]/90">{g.note}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

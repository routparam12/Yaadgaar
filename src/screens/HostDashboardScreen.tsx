import React, { useEffect, useState } from 'react';
import {
  CalendarPlus,
  Check,
  Copy,
  Eye,
  MessageCircleHeart,
  QrCode,
  Radio,
} from 'lucide-react';
import QRCode from 'qrcode';
import {
  CeremonyType,
  ScheduleItem,
  WeddingEvent,
} from '../types/yaadgaar';
import { formatViewerCount, streamService } from '../services/streamService';

interface HostDashboardScreenProps {
  events: WeddingEvent[];
  activeEvent: WeddingEvent;
  onSelectEvent: (eventId: string) => void;
  onEventCreated: (evt: WeddingEvent) => void;
  onOpenLive: () => void;
  onOpenQr: () => void;
}

const CEREMONY_OPTIONS: CeremonyType[] = [
  'Roka',
  'Haldi',
  'Mehendi',
  'Sangeet',
  'Pheras',
  'Vidaai',
  'Reception',
  'Griha Pravesh',
  'Naamkaran',
];

export const HostDashboardScreen: React.FC<HostDashboardScreenProps> = ({
  events,
  activeEvent,
  onSelectEvent,
  onEventCreated,
  onOpenLive,
  onOpenQr,
}) => {
  const [brideName, setBrideName] = useState('');
  const [groomName, setGroomName] = useState('');
  const [city, setCity] = useState('');
  const [venue, setVenue] = useState('');
  const [dateFormatted, setDateFormatted] = useState('December 18, 2026');
  const [selectedCeremonies, setSelectedCeremonies] = useState<CeremonyType[]>([
    'Haldi',
    'Mehendi',
    'Pheras',
  ]);
  const [createdBanner, setCreatedBanner] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [qrSvg, setQrSvg] = useState('');

  const wishes = streamService.getBlessings(activeEvent.id);
  const shareUrl = `https://yaadgaar.in/join/${activeEvent.code}`;

  useEffect(() => {
    QRCode.toString(shareUrl, {
      type: 'svg',
      margin: 1,
      width: 140,
      color: { dark: '#3E1230', light: '#FFFFFF' },
    })
      .then(setQrSvg)
      .catch(() => {});
  }, [shareUrl]);

  const toggleCeremony = (ceremony: CeremonyType) => {
    setSelectedCeremonies((prev) =>
      prev.includes(ceremony)
        ? prev.filter((c) => c !== ceremony)
        : [...prev, ceremony],
    );
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const schedule: ScheduleItem[] = selectedCeremonies.map((cer, idx) => ({
      id: `sch-new-${idx}`,
      ceremony: cer,
      time: idx === 0 ? '10:30 AM IST' : idx === 1 ? '04:00 PM IST' : '07:30 PM IST',
      dateLabel: dateFormatted,
      venueNote: venue.trim() || 'Main Mandap',
      iconKind: cer === 'Pheras' ? 'fire' : cer === 'Reception' ? 'feast' : 'ceremony',
    }));

    const created = streamService.createEvent({
      brideName: brideName || 'Kavya',
      groomName: groomName || 'Rohan',
      city: city || 'Jaipur, Rajasthan',
      venue: venue || 'Amer Courtyard',
      dateFormatted,
      schedule,
    });

    onEventCreated(created);
    setBrideName('');
    setGroomName('');
    setCity('');
    setVenue('');
    setCreatedBanner(
      `Created ceremony space for ${created.coupleNames} (Code: ${created.code}).`,
    );
  };

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Clipboard fallback
    }
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 py-8 sm:py-12">
      {/* Header + Event Selector */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#B5767C]/35 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#B5767C] font-medium">
            Host Studio · Manage Ceremonies & QR Invites
          </p>
          <h1 className="mt-2 font-editorial text-3xl sm:text-5xl uppercase tracking-[0.15em] text-[#1E1E1E]">
            Parivaar Host Dashboard
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="host-event-select" className="text-xs uppercase tracking-wider text-[#3E1230]/75">
            Active Event:
          </label>
          <select
            id="host-event-select"
            value={activeEvent.id}
            onChange={(e) => onSelectEvent(e.target.value)}
            className="border border-[#3E1230]/40 bg-white px-3 py-2 text-sm text-[#3E1230]"
          >
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.coupleNames} ({evt.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Overview Strip */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-[#B5767C]/40 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[#B5767C]">
            Live Viewers
          </p>
          <p className="mt-2 font-editorial text-4xl font-semibold text-[#3E1230] tabular-nums inline-flex items-center gap-2">
            <Eye className="h-6 w-6 text-[#D9482B]" aria-hidden="true" />
            <span>{formatViewerCount(activeEvent.viewerCount)}</span>
          </p>
        </div>

        <div className="border border-[#B5767C]/40 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[#B5767C]">
            Blessings Received
          </p>
          <p className="mt-2 font-editorial text-4xl font-semibold text-[#3E1230] tabular-nums inline-flex items-center gap-2">
            <MessageCircleHeart className="h-6 w-6 text-[#C9A35B]" aria-hidden="true" />
            <span>{wishes.length}</span>
          </p>
        </div>

        <div className="border border-[#B5767C]/40 bg-[#3E1230] text-[#F6EBDD] p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#C9A35B]">
              Event Code
            </p>
            <p className="mt-1 font-mono text-base font-semibold">
              {activeEvent.code}
            </p>
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="mt-2 inline-flex items-center gap-1.5 text-xs underline underline-offset-4 text-[#F6EBDD]/90 cursor-pointer"
            >
              {copiedLink ? (
                <Check className="h-3.5 w-3.5 text-[#C9A35B]" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span>{copiedLink ? 'Copied Join Link' : 'Copy Join Link'}</span>
            </button>
          </div>

          <div className="h-20 w-20 bg-white p-1 shrink-0">
            {qrSvg ? (
              <div
                className="h-full w-full [&>svg]:h-full [&>svg]:w-full"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
            ) : (
              <QrCode className="h-full w-full text-[#3E1230]" />
            )}
          </div>
        </div>
      </div>

      {/* Main Split: Create Event Form + Live Guest Wishes & Quick Launch */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section className="lg:col-span-6 border border-[#B5767C]/45 bg-white p-6">
          <h2 className="font-editorial text-2xl uppercase tracking-[0.15em] text-[#1E1E1E] flex items-center gap-2">
            <CalendarPlus className="h-5 w-5 text-[#C9A35B]" aria-hidden="true" />
            <span>Create New Ceremony Space</span>
          </h2>
          <p className="mt-1 font-editorial italic text-sm text-[#3E1230]/80 tracking-normal">
            Generate a fresh livestream room, ceremony schedule, and printable shaadi card QR.
          </p>

          <form onSubmit={handleCreateEvent} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="host-bride"
                  className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
                >
                  Bride / First Name
                </label>
                <input
                  id="host-bride"
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  placeholder="e.g. Anupoma"
                  required
                  className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230]"
                />
              </div>
              <div>
                <label
                  htmlFor="host-groom"
                  className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
                >
                  Groom / Second Name
                </label>
                <input
                  id="host-groom"
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  placeholder="e.g. Prakhar"
                  required
                  className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="host-venue"
                  className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
                >
                  Mandap / Venue
                </label>
                <input
                  id="host-venue"
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Taj Falaknuma Lawn"
                  className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230]"
                />
              </div>
              <div>
                <label
                  htmlFor="host-city"
                  className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
                >
                  City
                </label>
                <input
                  id="host-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Hyderabad, India"
                  className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="host-date"
                className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-1"
              >
                Ceremony Date
              </label>
              <input
                id="host-date"
                type="text"
                value={dateFormatted}
                onChange={(e) => setDateFormatted(e.target.value)}
                className="w-full border border-[#B5767C]/50 bg-[#FFFDF9] px-3 py-2 text-sm text-[#3E1230]"
              />
            </div>

            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#3E1230]/80 mb-2">
                Select Sacred Ceremonies for Schedule
              </span>
              <div className="flex flex-wrap gap-2">
                {CEREMONY_OPTIONS.map((cer) => {
                  const active = selectedCeremonies.includes(cer);
                  return (
                    <button
                      key={cer}
                      type="button"
                      onClick={() => toggleCeremony(cer)}
                      className={`px-3 py-1.5 text-xs border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#3E1230] text-[#F6EBDD] border-[#3E1230]'
                          : 'bg-[#FFFDF9] text-[#3E1230] border-[#B5767C]/45'
                      }`}
                    >
                      {cer}
                    </button>
                  );
                })}
              </div>
            </div>

            {createdBanner && (
              <p
                role="status"
                className="border border-[#3E7B3A]/40 bg-[#E5EBD9] px-3 py-2 text-xs text-[#244B21]"
              >
                {createdBanner}
              </p>
            )}

            <button
              type="submit"
              className="font-ui w-full rounded-full bg-[#181216] text-white py-2.5 text-[13.5px] font-medium hover:bg-[#3E1230] cursor-pointer"
            >
              Launch Ceremony &amp; Generate QR
            </button>
          </form>
        </section>

        {/* Right: Active Event Wishes & Actions */}
        <section className="lg:col-span-6 border border-[#B5767C]/45 bg-white p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-editorial text-2xl uppercase tracking-[0.15em] text-[#1E1E1E]">
              Recent Guest Wishes ({activeEvent.coupleNames})
            </h2>
            <div className="font-ui flex gap-2">
              <button
                type="button"
                onClick={onOpenLive}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 bg-[#D9482B] text-white text-xs font-medium cursor-pointer"
              >
                <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Open Live</span>
              </button>
              <button
                type="button"
                onClick={onOpenQr}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 border border-[#1E1E1E]/25 text-[#141414] text-xs font-medium cursor-pointer"
              >
                <QrCode className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Card QR</span>
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto">
            {wishes.length === 0 ? (
              <p className="text-sm italic text-[#3E1230]/70 py-8 text-center border border-dashed border-[#B5767C]/40">
                No wishes posted yet for {activeEvent.coupleNames}. Share the QR card so guests can send their first dua!
              </p>
            ) : (
              wishes.map((w) => (
                <article
                  key={w.id}
                  className="border border-[#B5767C]/30 bg-[#FFFDF9] p-3.5"
                >
                  <div className="flex justify-between text-xs font-semibold text-[#3E1230]">
                    <span>
                      {w.author} · {w.relation}
                    </span>
                    <span className="font-normal text-[#B5767C]">{w.createdAt}</span>
                  </div>
                  <p className="text-[11px] text-[#3E1230]/70">{w.city}</p>
                  <p className="mt-1.5 text-sm text-[#3E1230]/90">“{w.message}”</p>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  BookOpen,
  Check,
  Clock,
  Copy,
  Pause,
  Play,
  ShieldCheck,
} from 'lucide-react';
import { CeremonyChapter, WeddingEvent } from '../types/yaadgaar';
import { MughalArchFrame } from '../components/MughalArchFrame';

interface ArchiveScreenProps {
  event: WeddingEvent;
  onOpenAlbum: () => void;
}

export const ArchiveScreen: React.FC<ArchiveScreenProps> = ({
  event,
  onOpenAlbum,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<CeremonyChapter>(
    event.chapters[0],
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://yaadgaar.in/archive/${event.code.toLowerCase()}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Clipboard fallback
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#B5767C]/35 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#3E7B3A] font-semibold">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>Preserved Forever · Hamesha Ke Liye</span>
          </div>
          <h1 className="mt-2 font-editorial text-3xl sm:text-5xl uppercase tracking-[0.15em] text-[#1E1E1E]">
            {event.coupleNames} — Forever Archive
          </h1>
          <p className="mt-1 font-editorial text-xs sm:text-sm uppercase tracking-[0.18em] text-[#1E1E1E]/75">
            {event.dateFormatted} · {event.venue}, {event.city}
          </p>
        </div>

        <div className="font-ui flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium border border-[#1E1E1E]/25 bg-white text-[#141414] hover:border-[#1E1E1E] cursor-pointer whitespace-nowrap shrink-0"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-[#3E7B3A]" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>{copied ? 'Archive Link Copied' : 'Copy Share Link'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenAlbum}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium bg-[#181216] text-white hover:bg-[#3E1230] cursor-pointer whitespace-nowrap shrink-0"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Open Photo Book</span>
          </button>
        </div>
      </div>

      {/* Shareable Permalink Strip */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 bg-white border border-[#B5767C]/35 px-4 py-2.5 text-xs text-[#3E1230]">
        <span>
          Permanent Replay Link:{' '}
          <code className="font-mono text-[#3E1230] font-semibold">{shareUrl}</code>
        </span>
        <span className="text-[#3E7B3A] font-medium">
          6 Sacred Chapters · Zero Expiry
        </span>
      </div>

      {/* Main Replay Stage & Chapters List */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <div className="border border-[#B5767C]/45 bg-[#3E1230] text-[#F6EBDD]">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#27091d]">
              <img
                src={selectedChapter.thumbnail}
                alt={`${selectedChapter.title} permanent replay chapter`}
                referrerPolicy="no-referrer"
                className={`h-full w-full object-cover transition-transform duration-[4000ms] ${
                  isPlaying ? 'scale-105' : 'scale-100'
                }`}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#27091d]/90 via-transparent to-[#27091d]/30" />

              {/* Decorative Leaf & Butterfly Nostalgic Accent (Reference #6 mood) */}
              <svg
                className="pointer-events-none absolute top-4 right-4 w-16 h-16 opacity-80"
                viewBox="0 0 64 64"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M32 34 C24 22, 12 22, 14 32 C16 40, 26 38, 32 34 Z"
                  fill="#F6EBDD"
                  fillOpacity="0.85"
                />
                <path
                  d="M32 34 C40 22, 52 22, 50 32 C48 40, 38 38, 32 34 Z"
                  fill="#C9A35B"
                  fillOpacity="0.85"
                />
              </svg>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#C9A35B]">
                    Chapter · {selectedChapter.ceremony} · {selectedChapter.timestampLabel}
                  </p>
                  <h2 className="font-editorial text-2xl sm:text-3xl text-[#F6EBDD]">
                    {selectedChapter.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  aria-label={isPlaying ? 'Pause chapter replay' : 'Play chapter replay'}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C9A35B] text-[#3E1230] hover:bg-[#D7B36C] cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5 fill-current" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-5 bg-[#3E1230]">
              <p className="text-sm text-[#F6EBDD]/90 leading-relaxed">
                {selectedChapter.description}
              </p>
              <p className="mt-3 font-editorial italic text-lg text-[#C9A35B]">
                “{selectedChapter.highlightQuote}”
              </p>
            </div>
          </div>
        </div>

        {/* Chapters Selector + Nostalgic Leaf Frame Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-[#B5767C]/40 bg-white p-5">
            <h2 className="font-editorial text-2xl uppercase tracking-[0.15em] text-[#1E1E1E]">
              Ceremony Chapters
            </h2>
            <p className="font-editorial italic text-sm text-[#3E1230]/75 mt-1 tracking-normal">
              Jump straight to any sacred rasam from the wedding week.
            </p>

            <div className="mt-4 space-y-2.5">
              {event.chapters.map((chapter, idx) => {
                const isSelected = chapter.id === selectedChapter.id;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => {
                      setSelectedChapter(chapter);
                      setIsPlaying(true);
                    }}
                    className={`w-full flex items-center justify-between gap-3 p-3 text-left border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#3E1230] text-[#F6EBDD] border-[#3E1230]'
                        : 'bg-[#FFFDF9] text-[#3E1230] border-[#B5767C]/35 hover:border-[#3E1230]'
                    }`}
                  >
                    <div>
                      <p
                        className={`text-[11px] uppercase tracking-[0.16em] ${
                          isSelected ? 'text-[#C9A35B]' : 'text-[#B5767C]'
                        }`}
                      >
                        0{idx + 1} · {chapter.ceremony}
                      </p>
                      <p className="font-editorial text-lg font-medium">
                        {chapter.title}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs tabular-nums shrink-0 opacity-85">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{chapter.duration}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <MughalArchFrame accentColor="#3E7B3A" showGarlands={false}>
            <div className="text-center py-2">
              <p className="text-xs uppercase tracking-[0.18em] text-[#3E7B3A] font-semibold">
                Family Heirloom Promise
              </p>
              <p className="mt-2 font-editorial italic text-xl text-[#3E1230]">
                “Waqt guzar jaata hai, par pheras ke geet sada saath rehte hain.”
              </p>
            </div>
          </MughalArchFrame>
        </div>
      </div>
    </div>
  );
};

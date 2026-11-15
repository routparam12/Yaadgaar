import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Download,
  FolderOpen,
  ImagePlus,
  LayoutGrid,
  Maximize2,
  Plus,
  X,
} from 'lucide-react';
import { AlbumPhoto, WeddingEvent } from '../types/yaadgaar';
import { STORY_CHAPTER_ORDER, storageService } from '../services/storageService';
import { albumService } from '../services/albumService';
import { YarnHeartLogo } from '../components/YarnHeartLogo';

interface PhotoBookScreenProps {
  event: WeddingEvent;
}

type AlbumViewMode = 'book' | 'story-wall';

export const PhotoBookScreen: React.FC<PhotoBookScreenProps> = ({ event }) => {
  const [photos, setPhotos] = useState<AlbumPhoto[]>(() =>
    storageService.getInitialPhotos(),
  );
  const [folders, setFolders] = useState(() => storageService.getCloudFolders());
  const [dedication, setDedication] = useState(
    'Dedicated to every elder who sent their blessings from afar, and every friend who danced until dawn.',
  );
  const [viewMode, setViewMode] = useState<AlbumViewMode>('book');
  const [showImportDrawer, setShowImportDrawer] = useState(false);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [pdfNotice, setPdfNotice] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);

  const spreads = useMemo(
    () =>
      albumService.buildSpreads({
        coupleNames: event.coupleNames,
        dateFormatted: event.dateFormatted,
        venue: `${event.venue}, ${event.city}`,
        dedication,
        photos,
      }),
    [event.coupleNames, event.dateFormatted, event.venue, event.city, dedication, photos],
  );

  // Group all photos strictly into their 8 story chapters for the Story Wall view
  const chaptersWithPhotos = useMemo(
    () =>
      STORY_CHAPTER_ORDER.map((chap) => ({
        meta: chap,
        items: photos.filter((p) => p.storyStep === chap.step),
      })),
    [photos],
  );

  const goToSpread = (nextIdx: number) => {
    const clamped = Math.max(0, Math.min(spreads.length - 1, nextIdx));
    if (clamped === spreadIndex) return;
    setIsFlipping(true);
    window.setTimeout(() => {
      setSpreadIndex(clamped);
      setIsFlipping(false);
    }, 240);
  };

  const jumpToStoryChapter = (step: number) => {
    if (viewMode === 'story-wall') {
      const target = document.getElementById(`story-chapter-${step}`);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const matchingIndices = spreads
      .map((sp, idx) =>
        sp.kind === 'spread' &&
        (sp.leftPhoto?.storyStep === step || sp.rightPhoto?.storyStep === step)
          ? idx
          : -1,
      )
      .filter((idx) => idx !== -1);
    if (matchingIndices.length === 0) return;
    const currentPos = matchingIndices.indexOf(spreadIndex);
    const nextTarget =
      currentPos >= 0
        ? matchingIndices[(currentPos + 1) % matchingIndices.length]
        : matchingIndices[0];
    goToSpread(nextTarget);
  };

  const openPhotoInBook = (photoId: string) => {
    const idx = spreads.findIndex(
      (sp) =>
        sp.kind === 'spread' &&
        (sp.leftPhoto?.id === photoId || sp.rightPhoto?.id === photoId),
    );
    if (idx !== -1) {
      setViewMode('book');
      setSpreadIndex(idx);
      setLightboxIndex(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openLightboxForPhoto = (photoId: string) => {
    const idx = photos.findIndex((p) => p.id === photoId);
    if (idx !== -1) setLightboxIndex(idx);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'INPUT'
      ) {
        return;
      }

      if (lightboxIndex !== null) {
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight')
          setLightboxIndex((prev) =>
            prev === null ? null : (prev + 1) % photos.length,
          );
        if (e.key === 'ArrowLeft')
          setLightboxIndex((prev) =>
            prev === null ? null : (prev - 1 + photos.length) % photos.length,
          );
        return;
      }

      if (viewMode === 'book') {
        if (e.key === 'ArrowRight') goToSpread(spreadIndex + 1);
        if (e.key === 'ArrowLeft') goToSpread(spreadIndex - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  // Auto-scroll thumbnail strip to active spread button
  useEffect(() => {
    const activeBtn = stripRef.current?.querySelector<HTMLButtonElement>(
      `[data-spread-thumb="${spreadIndex}"]`,
    );
    activeBtn?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [spreadIndex]);

  const handleConnectCloud = (provider: 'google-drive' | 'dropbox') => {
    const imported = storageService.connectProvider(provider);
    setPhotos((prev) => [...prev, ...imported]);
    setFolders(storageService.getCloudFolders());
    setPdfNotice(
      `Imported ${imported.length} new memories from ${
        provider === 'google-drive' ? 'Google Drive' : 'Dropbox'
      }.`,
    );
  };

  const handleLocalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const uploaded = await storageService.readLocalFiles(e.target.files);
    setPhotos((prev) => [...prev, ...uploaded]);
    setPdfNotice(`Added ${uploaded.length} uploaded photo(s) to your album.`);
  };

  const handleDownloadPdf = async () => {
    setPdfNotice('Binding your heirloom PDF album...');
    const res = await albumService.exportAlbumPdf({
      coupleNames: event.coupleNames,
      dateFormatted: event.dateFormatted,
      venue: `${event.venue}, ${event.city}`,
      dedication,
      photos,
    });
    if (res.ok) {
      setPdfNotice(`Downloaded ${res.fileName}`);
    }
  };

  const currentSpread = spreads[spreadIndex] ?? spreads[0];
  const lightboxPhoto =
    lightboxIndex !== null ? photos[lightboxIndex] ?? null : null;

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 py-6 sm:py-10">
      {/* Editorial Monograph Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-[#3E1230]/15 pb-5">
        <div className="min-w-0">
          <p className="font-ui text-xs sm:text-[13px] text-[#8A2E52] font-semibold tracking-wide">
            Digital Wedding Photo Book · {photos.length} Curated Memories · 8 Sacred Chapters
          </p>
          <h1 className="mt-1.5 font-display text-3xl sm:text-4xl font-bold tracking-[-0.015em] leading-[1.08] text-[#3E1230]">
            {event.coupleNames} — Wedding Monograph
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* View Mode Switcher */}
          <div
            role="tablist"
            aria-label="Photo book presentation mode"
            className="font-ui inline-flex rounded-full border border-[#3E1230]/20 bg-white p-1 shadow-xs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'book'}
              onClick={() => setViewMode('book')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                viewMode === 'book'
                  ? 'bg-[#3E1230] text-[#FAF6F0]'
                  : 'text-[#3E1230]/80 hover:text-[#3E1230]'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Book Spreads</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'story-wall'}
              onClick={() => setViewMode('story-wall')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                viewMode === 'story-wall'
                  ? 'bg-[#3E1230] text-[#FAF6F0]'
                  : 'text-[#3E1230]/80 hover:text-[#3E1230]'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Story Gallery ({photos.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowImportDrawer((prev) => !prev)}
            className="font-ui inline-flex items-center gap-1.5 rounded-full px-4 py-2 border border-[#3E1230]/25 bg-white text-xs sm:text-sm font-medium text-[#3E1230] hover:border-[#3E1230] cursor-pointer whitespace-nowrap"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{showImportDrawer ? 'Hide Import' : 'Add Photos'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="font-ui inline-flex items-center gap-2 rounded-full px-5 py-2 bg-[#3E1230] text-[#FAF6F0] text-xs sm:text-sm font-medium hover:bg-[#571A43] cursor-pointer whitespace-nowrap shrink-0"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Collapsible Cloud & Device Photo Sources Bar */}
      {showImportDrawer && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3.5 bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#C9A35B]/45">
          {folders.map((folder) => (
            <div
              key={folder.provider}
              className="flex items-center justify-between gap-3 rounded-xl border border-[#B5767C]/35 bg-white p-3.5"
            >
              <div className="min-w-0">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3E1230]">
                  <Cloud className="h-3.5 w-3.5 text-[#C9A35B]" aria-hidden="true" />
                  <span>{folder.providerLabel}</span>
                </p>
                <p className="text-[11px] text-[#3E1230]/70 truncate mt-0.5">
                  {folder.folderName} · {folder.photoCount} files
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleConnectCloud(folder.provider as 'google-drive' | 'dropbox')
                }
                className="font-ui rounded-full px-3.5 py-1.5 text-xs font-medium border border-[#3E1230] text-[#3E1230] hover:bg-[#3E1230] hover:text-[#FAF6F0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {folder.connected ? 'Sync More' : 'Connect'}
              </button>
            </div>
          ))}

          <div className="flex items-center justify-between gap-3 rounded-xl border border-[#B5767C]/35 bg-white p-3.5">
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3E1230]">
                <FolderOpen className="h-3.5 w-3.5 text-[#3E7B3A]" aria-hidden="true" />
                <span>Local Gallery Upload</span>
              </p>
              <p className="text-[11px] text-[#3E1230]/70 mt-0.5">
                Add JPEG / PNG photos directly
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleLocalUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="font-ui inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs bg-[#C9A35B] text-[#3E1230] font-semibold hover:bg-[#D7B36C] cursor-pointer whitespace-nowrap shrink-0"
            >
              <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Upload</span>
            </button>
          </div>
        </div>
      )}

      {pdfNotice && (
        <p
          role="status"
          className="mt-4 rounded-xl border border-[#C9A35B]/60 bg-white px-4 py-2 text-xs text-[#3E1230]"
        >
          {pdfNotice}
        </p>
      )}

      {/* 8-Chapter Chronological Story Navigation Bar */}
      <div className="mt-5 rounded-2xl border border-[#B5767C]/30 bg-white/95 p-3.5 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5">
          <p className="font-ui text-xs font-semibold text-[#8A2E52]">
            Their Story Sequence · First Meeting to Bride Entry in Sasural
          </p>
          <span className="font-ui text-[11px] font-medium text-[#3E1230]/70 tabular-nums">
            8 Chapters · {photos.length} Bound Moments · {spreads.length} Spreads
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {STORY_CHAPTER_ORDER.map((chap) => {
            const isActiveChapter =
              viewMode === 'book' &&
              currentSpread.kind === 'spread' &&
              (currentSpread.leftPhoto?.storyStep === chap.step ||
                currentSpread.rightPhoto?.storyStep === chap.step);
            return (
              <button
                key={chap.step}
                type="button"
                onClick={() => jumpToStoryChapter(chap.step)}
                className={`font-ui rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActiveChapter
                    ? 'bg-[#3E1230] text-[#FAF6F0] shadow-xs'
                    : 'bg-[#FAF6F0] text-[#3E1230]/85 border border-[#B5767C]/30 hover:border-[#3E1230]'
                }`}
              >
                {chap.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ VIEW 1: HEIRLOOM 3D BOOK SPREADS ════════════════════════════════════ */}
      {viewMode === 'book' ? (
        <div className="mt-5 album-perspective">
          {/* Silk-Bound Hardcover Backdrop with Spine Seam */}
          <div
            className={`relative mx-auto max-w-6xl rounded-2xl border-2 border-[#3E1230]/40 bg-[#3E1230] p-2.5 sm:p-4 shadow-[0_28px_64px_rgba(62,18,48,0.22)] transition-transform duration-500 ${
              isFlipping ? 'scale-[0.99]' : 'scale-100'
            }`}
          >
            {/* Gold foil edge corners */}
            <div className="album-leaf relative grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden bg-[#FFFDF9] border border-[#C9A35B]/75 min-h-[470px]">
              {/* Book center binding shadow crease (desktop) */}
              <div
                className="pointer-events-none hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 z-20 bg-gradient-to-r from-black/10 via-black/5 to-black/10"
                aria-hidden="true"
              />

              {currentSpread.kind === 'cover' ? (
                <>
                  <div className="bg-[#3E1230] text-[#FAF6F0] p-8 sm:p-10 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-[#C9A35B]/45">
                    <YarnHeartLogo size={54} className="border border-[#C9A35B]/60 rounded-xl" />
                    <p className="mt-4 font-ui text-[11px] uppercase tracking-[0.26em] text-[#C9A35B]">
                      Yaadgaar Heirloom Anthology
                    </p>
                    <h2 className="mt-3 font-couple text-5xl sm:text-6xl text-[#FAF6F0]">
                      {currentSpread.title}
                    </h2>
                    <p className="mt-3 font-editorial text-xs uppercase tracking-[0.2em] text-[#FAF6F0]/80">
                      {currentSpread.subtitle}
                    </p>
                    <p className="mt-5 font-ui text-xs text-[#C9A35B]/90 tabular-nums">
                      {photos.length} Wedding Photographs & Illustrations · 8 Chapters
                    </p>
                  </div>
                  <div className="p-8 sm:p-10 flex flex-col items-center justify-between text-center bg-[#FAF6F0]">
                    <div className="w-full max-w-xs aspect-[3/4] overflow-hidden rounded-xl border border-[#C9A35B]/55 bg-white p-2 shadow-sm">
                      <img
                        src={photos[0]?.src}
                        alt="Cover keepsake vignette"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    </div>
                    <p className="mt-5 font-editorial italic text-xl text-[#3E1230] max-w-md leading-relaxed">
                      “First meeting se sasural tak — har rasam ek amar panna hai.”
                    </p>
                    <button
                      type="button"
                      onClick={() => goToSpread(1)}
                      className="mt-4 font-ui inline-flex items-center gap-1.5 rounded-full px-5 py-2 bg-[#3E1230] text-[#FAF6F0] text-xs font-medium hover:bg-[#571A43] cursor-pointer"
                    >
                      <span>Open Page 1</span>
                      <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </>
              ) : currentSpread.kind === 'dedication' ? (
                <>
                  <div className="p-7 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#C9A35B]/35 bg-[#FFFDF9]">
                    <div>
                      <p className="font-ui text-xs uppercase tracking-[0.2em] text-[#8A2E52]">
                        {currentSpread.title}
                      </p>
                      <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.015em] text-[#3E1230]">
                        To Our Parivaar
                      </h2>
                      <label
                        htmlFor="album-dedication"
                        className="block mt-5 font-ui text-[11px] uppercase tracking-wider text-[#3E1230]/70"
                      >
                        Customize Dedication Note
                      </label>
                      <textarea
                        id="album-dedication"
                        rows={4}
                        value={dedication}
                        onChange={(e) => setDedication(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#B5767C]/45 bg-[#FAF6F0] p-3.5 font-editorial italic text-lg text-[#3E1230]"
                      />
                    </div>
                    <p className="font-ui text-[11px] text-[#3E1230]/55 tabular-nums mt-4">
                      Folio 01 · Dedication
                    </p>
                  </div>
                  <div className="p-7 sm:p-10 flex flex-col justify-between bg-[#FAF6F0]/75">
                    {currentSpread.leftPhoto && (
                      <button
                        type="button"
                        onClick={() => openLightboxForPhoto(currentSpread.leftPhoto!.id)}
                        className="group relative overflow-hidden rounded-xl border border-[#C9A35B]/55 bg-white p-2 shadow-xs cursor-pointer text-left"
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#FAF6F0]">
                          <img
                            src={currentSpread.leftPhoto.src}
                            alt={currentSpread.leftPhoto.caption}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </button>
                    )}
                    <p className="mt-4 font-editorial italic text-lg text-[#3E1230]/85 leading-relaxed">
                      “{event.storyNote}”
                    </p>
                    <p className="font-ui text-[11px] text-[#3E1230]/55 tabular-nums text-right mt-4">
                      Folio 02 · Prologue
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {[currentSpread.leftPhoto, currentSpread.rightPhoto].map(
                    (photo, sideIdx) => {
                      const isAsymmetricOddSpread = spreadIndex % 2 === 1 && sideIdx === 1;
                      return (
                        <div
                          key={sideIdx}
                          className={`p-5 sm:p-8 flex flex-col justify-between ${
                            sideIdx === 0
                              ? 'border-b md:border-b-0 md:border-r border-[#C9A35B]/35 bg-[#FFFDF9]'
                              : 'bg-[#FAF6F0]/80'
                          }`}
                        >
                          {photo ? (
                            <div className="flex flex-col h-full justify-between">
                              <div>
                                <div className="flex items-center justify-between gap-2 font-ui text-[11px] font-medium text-[#8A2E52] mb-1.5">
                                  <span>{photo.dateTaken}</span>
                                  <span className="text-[#3E1230]/55">
                                    Chapter {String(photo.storyStep ?? 1).padStart(2, '0')}
                                  </span>
                                </div>

                                {photo.storyTitle && (
                                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#3E1230] mb-3 leading-snug">
                                    {photo.storyTitle}
                                  </h3>
                                )}

                                {/* Mounted print framed snugly around each photo's true proportions */}
                                <button
                                  type="button"
                                  onClick={() => openLightboxForPhoto(photo.id)}
                                  className="group relative flex items-center justify-center w-full rounded-xl bg-[#F3EAE0]/70 p-3 sm:p-4 cursor-pointer"
                                >
                                  <span
                                    className={`relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-[#C9A35B]/80 bg-white shadow-[0_10px_24px_rgba(62,18,48,0.12)] ${
                                      isAsymmetricOddSpread
                                        ? 'h-64 sm:h-72'
                                        : 'h-72 sm:h-80'
                                    }`}
                                  >
                                    <img
                                      src={photo.src}
                                      alt={photo.caption}
                                      referrerPolicy="no-referrer"
                                      className="h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                    <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-md bg-[#181216]/80 px-2 py-1 text-[10px] font-ui text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Maximize2 className="h-3 w-3" aria-hidden="true" />
                                      <span>View Full</span>
                                    </span>
                                  </span>
                                </button>

                                <p className="mt-3.5 font-editorial italic text-lg sm:text-[1.15rem] text-[#3E1230] leading-snug">
                                  {photo.caption}
                                </p>
                                {photo.storyNarrative && (
                                  <p className="mt-2 font-ui text-xs sm:text-[13px] text-[#3E1230]/75 leading-relaxed">
                                    {photo.storyNarrative}
                                  </p>
                                )}
                              </div>

                              <div
                                className={`font-ui text-[11px] text-[#3E1230]/55 tabular-nums mt-4 flex items-center ${
                                  sideIdx === 1 ? 'justify-end' : 'justify-start'
                                }`}
                              >
                                <span>Folio {String(currentSpread.pageNumbers[sideIdx]).padStart(2, '0')}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex h-full items-center justify-center text-center p-6">
                              <div className="max-w-xs space-y-2">
                                <p className="font-editorial italic text-xl text-[#3E1230]/75">
                                  “And so their shared home fills with warmth, songs, and decades yet unwritten.”
                                </p>
                                <p className="font-ui text-xs text-[#3E1230]/50">
                                  Add another photograph anytime using the Upload bar above.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    },
                  )}
                </>
              )}
            </div>
          </div>

          {/* Spread Turn Controls */}
          <div className="font-ui mt-5 flex flex-wrap items-center justify-between gap-4 max-w-6xl mx-auto">
            <button
              type="button"
              onClick={() => goToSpread(spreadIndex - 1)}
              disabled={spreadIndex === 0}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 border-[1.5px] border-[#3E1230] bg-white text-[#3E1230] text-sm font-medium disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span>Previous Spread</span>
            </button>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4A2A3E] tabular-nums">
              <span>
                Spread {spreadIndex + 1} of {spreads.length}
              </span>
              <span className="text-[#B5767C]">·</span>
              <button
                type="button"
                onClick={() => setViewMode('story-wall')}
                className="underline underline-offset-4 hover:text-[#3E1230] cursor-pointer"
              >
                See all {photos.length} memories at once
              </button>
            </div>

            <button
              type="button"
              onClick={() => goToSpread(spreadIndex + 1)}
              disabled={spreadIndex === spreads.length - 1}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-[#3E1230] text-[#FAF6F0] text-sm font-medium hover:bg-[#571A43] disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Next Spread</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Scrollable Visual Filmstrip Rail for Direct Spread Jumping */}
          <div
            ref={stripRef}
            aria-label="Photo book spread filmstrip"
            className="mt-4 max-w-6xl mx-auto flex gap-2.5 overflow-x-auto pb-2 px-1"
          >
            {spreads.map((sp, idx) => {
              const isActive = idx === spreadIndex;
              const thumbSrc =
                sp.kind === 'cover'
                  ? photos[0]?.src
                  : sp.leftPhoto?.src ?? sp.rightPhoto?.src ?? photos[0]?.src;
              const label =
                sp.kind === 'cover'
                  ? 'Cover'
                  : sp.kind === 'dedication'
                    ? 'Prologue'
                    : `P.${sp.pageNumbers[0]}–${sp.pageNumbers[1]}`;

              return (
                <button
                  key={sp.id}
                  type="button"
                  data-spread-thumb={idx}
                  onClick={() => goToSpread(idx)}
                  className={`shrink-0 w-24 rounded-xl border p-1.5 text-left transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#3E1230] bg-[#3E1230] text-[#FAF6F0] shadow-md -translate-y-0.5'
                      : 'border-[#B5767C]/35 bg-white text-[#3E1230] hover:border-[#3E1230]'
                  }`}
                >
                  <div className="h-12 w-full overflow-hidden rounded-lg bg-[#FAF6F0]">
                    {thumbSrc && (
                      <img
                        src={thumbSrc}
                        alt={label}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <p className="font-ui mt-1 text-[10px] font-medium text-center tabular-nums truncate">
                    {label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* ══ VIEW 2: FULL EDITORIAL STORY GALLERY (ALL 36+ MEMORIES) ══════════════ */
        <div className="mt-8 space-y-12">
          {chaptersWithPhotos.map(({ meta, items }) => (
            <section
              key={meta.step}
              id={`story-chapter-${meta.step}`}
              className="scroll-mt-24 border-b border-[#B5767C]/25 pb-10 last:border-b-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
                <div>
                  <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-[#8A2E52]">
                    Chapter {meta.roman} · {items.length} Memories
                  </p>
                  <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#3E1230]">
                    {meta.ceremony}
                  </h2>
                  <p className="mt-1 font-editorial italic text-base sm:text-lg text-[#3E1230]/80">
                    {meta.subtitle}
                  </p>
                </div>
              </div>

              <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
                {items.map((photo) => (
                  <article
                    key={photo.id}
                    className="break-inside-avoid group flex flex-col justify-between rounded-2xl border border-[#C9A35B]/45 bg-white p-3 shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div>
                      <button
                        type="button"
                        onClick={() => openLightboxForPhoto(photo.id)}
                        className="relative block w-full overflow-hidden rounded-xl bg-[#FAF6F0] border border-[#B5767C]/20 cursor-pointer"
                      >
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </button>

                      <div className="mt-3 px-1">
                        {photo.storyTitle && (
                          <h3 className="font-display text-base font-bold text-[#3E1230] leading-snug">
                            {photo.storyTitle}
                          </h3>
                        )}
                        <p className="mt-1.5 font-editorial italic text-sm sm:text-[15px] text-[#3E1230]/90 leading-snug">
                          {photo.caption}
                        </p>
                        {photo.storyNarrative && (
                          <p className="mt-1.5 font-ui text-xs text-[#3E1230]/70 leading-relaxed">
                            {photo.storyNarrative}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#B5767C]/20 flex items-center justify-between px-1">
                      <span className="font-ui text-[10.5px] text-[#3E1230]/60">
                        {photo.dateTaken}
                      </span>
                      <button
                        type="button"
                        onClick={() => openPhotoInBook(photo.id)}
                        className="font-ui text-[11px] font-medium text-[#8A2E52] hover:underline underline-offset-4 cursor-pointer"
                      >
                        Open in Book →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* ══ LIGHTBOX FULLSCREEN READER ════════════════════════════════════════════ */}
      {lightboxPhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.storyTitle ?? lightboxPhoto.caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A0814]/92 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close fullscreen reader"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() =>
              setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)
            }
            aria-label="Previous wedding photo"
            className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 mr-4 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="max-w-4xl w-full rounded-2xl bg-[#FAF6F0] border border-[#C9A35B]/60 p-4 sm:p-6 shadow-2xl">
            <div className="aspect-[4/3] max-h-[65vh] w-full overflow-hidden rounded-xl bg-white border border-[#B5767C]/25">
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.caption}
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <p className="font-ui text-xs font-semibold text-[#8A2E52]">
                  {lightboxPhoto.dateTaken} · {lightboxIndex + 1} of {photos.length}
                </p>
                {lightboxPhoto.storyTitle && (
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#3E1230] mt-0.5">
                    {lightboxPhoto.storyTitle}
                  </h3>
                )}
                <p className="mt-1 font-editorial italic text-base sm:text-lg text-[#3E1230]">
                  {lightboxPhoto.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openPhotoInBook(lightboxPhoto.id)}
                className="font-ui shrink-0 rounded-full px-4 py-2 bg-[#3E1230] text-[#FAF6F0] text-xs font-medium hover:bg-[#571A43] cursor-pointer"
              >
                Open This Page in Book
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLightboxIndex((lightboxIndex + 1) % photos.length)}
            aria-label="Next wedding photo"
            className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 ml-4 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

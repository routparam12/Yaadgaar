import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Cloud,
  Download,
  FolderOpen,
  ImagePlus,
} from 'lucide-react';
import { AlbumPhoto, WeddingEvent } from '../types/yaadgaar';
import { storageService } from '../services/storageService';
import { albumService } from '../services/albumService';
import { YarnHeartLogo } from '../components/YarnHeartLogo';

interface PhotoBookScreenProps {
  event: WeddingEvent;
}

export const PhotoBookScreen: React.FC<PhotoBookScreenProps> = ({ event }) => {
  const [photos, setPhotos] = useState<AlbumPhoto[]>(() =>
    storageService.getInitialPhotos(),
  );
  const [folders, setFolders] = useState(() => storageService.getCloudFolders());
  const [dedication, setDedication] = useState(
    'Dedicated to every elder who sent their blessings from afar, and every friend who danced until dawn.',
  );
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [pdfNotice, setPdfNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const goToSpread = (nextIdx: number) => {
    const clamped = Math.max(0, Math.min(spreads.length - 1, nextIdx));
    if (clamped === spreadIndex) return;
    setIsFlipping(true);
    window.setTimeout(() => {
      setSpreadIndex(clamped);
      setIsFlipping(false);
    }, 300);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'INPUT'
      ) {
        return;
      }
      if (e.key === 'ArrowRight') goToSpread(spreadIndex + 1);
      if (e.key === 'ArrowLeft') goToSpread(spreadIndex - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

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

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#3E1230]/15 pb-6">
        <div>
          <p className="font-ui text-[13px] sm:text-[14px] text-[#8A2E52] font-semibold">
            Digital Wedding Photo Book · {photos.length} Photos Bound
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-[-0.01em] leading-[1.08] text-[#3E1230]">
            {event.coupleNames} — Wedding Album
          </h1>
        </div>

        <button
          type="button"
          onClick={handleDownloadPdf}
          className="font-ui inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[#3E1230] text-[#FAF6F0] text-sm font-medium hover:bg-[#571A43] cursor-pointer whitespace-nowrap shrink-0"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          <span>Download Album PDF</span>
        </button>
      </div>

      {/* Cloud & Local Photo Sources Bar */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {folders.map((folder) => (
          <div
            key={folder.provider}
            className="flex items-center justify-between gap-3 border border-[#B5767C]/40 bg-white p-4"
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
              className="font-ui rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium border-[1.5px] border-[#3E1230] text-[#3E1230] hover:bg-[#3E1230] hover:text-[#FAF6F0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {folder.connected ? 'Sync More' : 'Connect'}
            </button>
          </div>
        ))}

        {/* Local Device Photo Upload */}
        <div className="flex items-center justify-between gap-3 border border-[#B5767C]/40 bg-white p-4">
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

      {pdfNotice && (
        <p
          role="status"
          className="mt-4 border border-[#C9A35B]/60 bg-white px-4 py-2 text-xs text-[#3E1230]"
        >
          {pdfNotice}
        </p>
      )}

      {/* Realistic 3D Page-Flip Album Stage */}
      <div className="mt-8 album-perspective">
        <div
          className={`relative mx-auto max-w-5xl border border-[#3E1230]/35 bg-[#3E1230] p-3 sm:p-5 shadow-[0_28px_60px_rgba(62,18,48,0.22)] transition-transform duration-600 ${
            isFlipping ? 'scale-[0.985]' : 'scale-100'
          }`}
        >
          {/* Open Hardbound Spread */}
          <div
            className="album-leaf grid grid-cols-1 md:grid-cols-2 min-h-[420px] bg-white border border-[#C9A35B]/60"
            style={{
              transform: isFlipping ? 'rotateY(-18deg)' : 'rotateY(0deg)',
            }}
          >
            {currentSpread.kind === 'cover' ? (
              <>
                <div className="bg-[#3E1230] text-[#F6EBDD] p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-[#C9A35B]/45">
                  <YarnHeartLogo size={54} className="border border-[#C9A35B]/60 rounded-xl" />
                  <p className="mt-4 text-xs uppercase tracking-[0.26em] text-[#C9A35B]">
                    Yaadgaar Heirloom Edition
                  </p>
                  <h2 className="mt-3 font-couple text-5xl text-[#F6EBDD]">
                    {currentSpread.title}
                  </h2>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#F6EBDD]/80">
                    {currentSpread.subtitle}
                  </p>
                </div>
                <div className="p-8 flex flex-col items-center justify-center text-center bg-white">
                  <p className="font-editorial italic text-2xl text-[#3E1230] max-w-sm leading-relaxed">
                    “Every garland, every mantra, every tear of joy — bound together so our grandchildren can turn these pages.”
                  </p>
                  <span className="mt-6 inline-block h-px w-16 bg-[#B5767C]" />
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#8A2E52]">
                    Turn the page to begin
                  </p>
                </div>
              </>
            ) : currentSpread.kind === 'dedication' ? (
              <>
                <div className="p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#B5767C]/35 bg-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8A2E52]">
                      {currentSpread.title}
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.01em] text-[#3E1230]">
                      To Our Parivaar
                    </h2>
                    <label
                      htmlFor="album-dedication"
                      className="block mt-4 text-[11px] uppercase tracking-wider text-[#3E1230]/70"
                    >
                      Customize Dedication Note
                    </label>
                    <textarea
                      id="album-dedication"
                      rows={4}
                      value={dedication}
                      onChange={(e) => setDedication(e.target.value)}
                      className="mt-2 w-full border border-[#B5767C]/45 bg-[#FFFDF9] p-3 font-editorial italic text-lg text-[#3E1230]"
                    />
                  </div>
                  <p className="text-[11px] text-[#3E1230]/60 tabular-nums mt-4">
                    Page 0{currentSpread.pageNumbers[0]}
                  </p>
                </div>
                <div className="p-8 flex flex-col justify-between bg-[#FFFDF9]">
                  {currentSpread.leftPhoto && (
                    <img
                      src={currentSpread.leftPhoto.src}
                      alt={currentSpread.leftPhoto.caption}
                      referrerPolicy="no-referrer"
                      className="h-64 w-full object-cover border border-[#C9A35B]/50"
                    />
                  )}
                  <p className="mt-4 font-editorial italic text-base text-[#3E1230]/85">
                    “{event.storyNote}”
                  </p>
                  <p className="text-[11px] text-[#3E1230]/60 tabular-nums text-right mt-4">
                    Page 0{currentSpread.pageNumbers[1]}
                  </p>
                </div>
              </>
            ) : (
              <>
                {[currentSpread.leftPhoto, currentSpread.rightPhoto].map(
                  (photo, sideIdx) => (
                    <div
                      key={sideIdx}
                      className={`p-6 sm:p-8 flex flex-col justify-between ${
                        sideIdx === 0
                          ? 'border-b md:border-b-0 md:border-r border-[#B5767C]/35 bg-white'
                          : 'bg-[#FFFDF9]'
                      }`}
                    >
                      {photo ? (
                        <div>
                          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[#8A2E52] mb-3">
                            <span>{photo.ceremony}</span>
                            <span>{photo.dateTaken}</span>
                          </div>
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            referrerPolicy="no-referrer"
                            className="aspect-[4/3] w-full object-cover border border-[#C9A35B]/45"
                          />
                          <p className="mt-4 font-editorial italic text-lg text-[#3E1230] leading-snug">
                            {photo.caption}
                          </p>
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center text-center text-sm italic text-[#3E1230]/60">
                          Upload another photo to fill this keepsake page.
                        </div>
                      )}
                      <p
                        className={`text-[11px] text-[#3E1230]/60 tabular-nums mt-4 ${
                          sideIdx === 1 ? 'text-right' : ''
                        }`}
                      >
                        Page {currentSpread.pageNumbers[sideIdx]}
                      </p>
                    </div>
                  ),
                )}
              </>
            )}
          </div>
        </div>

        {/* Page Turn Controls */}
        <div className="font-ui mt-6 flex flex-wrap items-center justify-between gap-4 max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => goToSpread(spreadIndex - 1)}
            disabled={spreadIndex === 0}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 border-[1.5px] border-[#3E1230] bg-transparent text-[#3E1230] text-sm font-medium disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Previous Page</span>
          </button>

          <div className="flex items-center gap-2 text-sm text-[#4A2A3E] tabular-nums">
            <span>
              Spread {spreadIndex + 1} of {spreads.length}
            </span>
          </div>

          <button
            type="button"
            onClick={() => goToSpread(spreadIndex + 1)}
            disabled={spreadIndex === spreads.length - 1}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-[#3E1230] text-[#FAF6F0] text-sm font-medium hover:bg-[#571A43] disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>Next Page</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Menu, QrCode, X } from 'lucide-react';
import { AppScreen, LanguageMode } from '../types/yaadgaar';
import { TranslationBundle } from '../data/translations';
import { YarnHeartLogo } from './YarnHeartLogo';

interface TopNavProps {
  activeScreen: AppScreen;
  language: LanguageMode;
  copy: TranslationBundle['nav'];
  onNavigate: (screen: AppScreen, sectionAnchor?: string) => void;
  onCycleLanguage: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeScreen,
  language,
  copy,
  onNavigate,
  onCycleLanguage,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const langButtonLabel =
    language === 'hinglish' ? 'EN / हिं' : language === 'en' ? 'हिं / HG' : 'HG / EN';

  const handleNav = (screen: AppScreen, anchor?: string) => {
    setMobileOpen(false);
    onNavigate(screen, anchor);
  };

  return (
    <header className="no-print sticky top-0 z-40 w-full bg-[#FAF6F0] border-b border-[#3E1230]/12 shadow-[0_4px_18px_rgba(62,18,48,0.06)] font-ui">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-6">
        {/* Zone 1: Brand Mark + Fraunces Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('landing')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E1230]"
          aria-label="Yaadgaar Home"
        >
          <YarnHeartLogo size={28} className="rounded-full" />
          <span className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[#3E1230]">
            Yaadgaar
          </span>
        </button>

        {/* Zone 2: Clean Single-Line DM Sans Nav Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-[15px] font-medium text-[#4A2A3E]"
        >
          <button
            type="button"
            onClick={() => handleNav('event')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer ${
              activeScreen === 'event'
                ? 'text-[#3E1230] font-semibold underline decoration-[#F26B21] decoration-2 underline-offset-4'
                : 'hover:text-[#3E1230]'
            }`}
          >
            {copy.live}
          </button>
          <button
            type="button"
            onClick={() => handleNav('archive')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer ${
              activeScreen === 'archive'
                ? 'text-[#3E1230] font-semibold underline decoration-[#3E7B3A] decoration-2 underline-offset-4'
                : 'hover:text-[#3E1230]'
            }`}
          >
            {copy.archive}
          </button>
          <button
            type="button"
            onClick={() => handleNav('album')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer ${
              activeScreen === 'album'
                ? 'text-[#3E1230] font-semibold underline decoration-[#D9482B] decoration-2 underline-offset-4'
                : 'hover:text-[#3E1230]'
            }`}
          >
            {copy.photoBook}
          </button>
          <button
            type="button"
            onClick={() => handleNav('landing', 'section-pricing')}
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#3E1230] transition-colors cursor-pointer"
          >
            {copy.pricing}
          </button>
          <button
            type="button"
            onClick={() => handleNav('dashboard')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer ${
              activeScreen === 'dashboard'
                ? 'text-[#3E1230] font-semibold underline decoration-[#8A2E52] decoration-2 underline-offset-4'
                : 'hover:text-[#3E1230]'
            }`}
          >
            {copy.dashboard}
          </button>
        </nav>

        {/* Zone 3: Language Switch + Plum Pill CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onCycleLanguage}
            aria-label={`Switch language. Current: ${language}`}
            className="px-2.5 py-1 text-[13.5px] font-medium text-[#4A2A3E] hover:text-[#3E1230] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {langButtonLabel}
          </button>

          <button
            type="button"
            onClick={() => handleNav('qr')}
            className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeScreen === 'qr'
                ? 'bg-[#C9A35B] text-[#3E1230]'
                : 'bg-[#3E1230] text-[#FAF6F0] hover:bg-[#571A43]'
            }`}
          >
            <QrCode className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{copy.scanQr}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#3E1230]/30 text-[#3E1230] cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-[#3E1230]/10 bg-[#FAF6F0] px-4 py-3 flex flex-col gap-1 font-ui shadow-md"
        >
          {(
            [
              ['event', copy.live],
              ['archive', copy.archive],
              ['album', copy.photoBook],
              ['qr', copy.scanQr],
              ['dashboard', copy.dashboard],
            ] as const
          ).map(([scr, label]) => (
            <button
              key={scr}
              type="button"
              onClick={() => handleNav(scr)}
              className={`w-full text-left rounded-xl px-4 py-2 text-[15px] font-medium cursor-pointer ${
                activeScreen === scr
                  ? 'bg-[#3E1230] text-[#FAF6F0]'
                  : 'text-[#3E1230] hover:bg-[#3E1230]/8'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNav('landing', 'section-pricing')}
            className="w-full text-left rounded-xl px-4 py-2 text-[15px] font-medium text-[#3E1230] hover:bg-[#3E1230]/8 cursor-pointer"
          >
            {copy.pricing}
          </button>
        </nav>
      )}
    </header>
  );
};

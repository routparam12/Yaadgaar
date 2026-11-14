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
    <header className="no-print sticky top-3 z-30 px-3 sm:px-6 pointer-events-none font-ui">
      {/* Compact floating white pill navbar modeled after Prism reference */}
      <div className="pointer-events-auto mx-auto max-w-4xl rounded-full bg-white border border-[#1E1E1E]/10 shadow-[0_6px_24px_rgba(20,20,20,0.06)] px-4 sm:px-5 py-1.5 flex items-center justify-between gap-4 sm:gap-6">
        {/* Zone 1: Brand Mark + Refined Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('landing')}
          className="flex items-center gap-2 text-left whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E1230]"
          aria-label="Yaadgaar Home"
        >
          <YarnHeartLogo size={26} className="rounded-full" />
          <span className="font-ui text-[16px] font-semibold tracking-[-0.02em] text-[#141414]">
            Yaadgaar
          </span>
        </button>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-[13.5px] font-medium tracking-normal text-[#4A4A4A]"
        >
          <button
            type="button"
            onClick={() => handleNav('event')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer ${
              activeScreen === 'event'
                ? 'text-[#141414] font-semibold underline decoration-[#D9482B] underline-offset-4'
                : 'hover:text-[#141414]'
            }`}
          >
            {copy.live}
          </button>
          <button
            type="button"
            onClick={() => handleNav('archive')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer ${
              activeScreen === 'archive'
                ? 'text-[#141414] font-semibold underline decoration-[#D9482B] underline-offset-4'
                : 'hover:text-[#141414]'
            }`}
          >
            {copy.archive}
          </button>
          <button
            type="button"
            onClick={() => handleNav('album')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer ${
              activeScreen === 'album'
                ? 'text-[#141414] font-semibold underline decoration-[#D9482B] underline-offset-4'
                : 'hover:text-[#141414]'
            }`}
          >
            {copy.photoBook}
          </button>
          <button
            type="button"
            onClick={() => handleNav('landing', 'section-pricing')}
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#141414] transition-colors cursor-pointer"
          >
            {copy.pricing}
          </button>
          <button
            type="button"
            onClick={() => handleNav('dashboard')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer ${
              activeScreen === 'dashboard'
                ? 'text-[#141414] font-semibold underline decoration-[#D9482B] underline-offset-4'
                : 'hover:text-[#141414]'
            }`}
          >
            {copy.dashboard}
          </button>
        </nav>

        {/* Zone 3: Language Switch + Primary Pill CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onCycleLanguage}
            aria-label={`Switch language. Current: ${language}`}
            className="px-2 py-1 text-[12.5px] font-medium text-[#4A4A4A] hover:text-[#141414] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {langButtonLabel}
          </button>

          <button
            type="button"
            onClick={() => handleNav('qr')}
            className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium tracking-normal whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeScreen === 'qr'
                ? 'bg-[#C9A35B] text-[#141414]'
                : 'bg-[#141115] text-white hover:bg-[#3E1230]'
            }`}
          >
            <QrCode className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{copy.scanQr}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#1E1E1E]/15 text-[#141414] cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Floating Dropdown */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="pointer-events-auto md:hidden mx-auto mt-2 max-w-4xl rounded-2xl bg-white border border-[#1E1E1E]/12 shadow-lg p-2.5 flex flex-col gap-1 font-ui"
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
              className={`w-full text-left rounded-xl px-4 py-2 text-[13.5px] font-medium cursor-pointer ${
                activeScreen === scr
                  ? 'bg-[#141115] text-white'
                  : 'text-[#141414] hover:bg-[#FAF6F0]'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNav('landing', 'section-pricing')}
            className="w-full text-left rounded-xl px-4 py-2 text-[13.5px] font-medium text-[#141414] hover:bg-[#FAF6F0] cursor-pointer"
          >
            {copy.pricing}
          </button>
        </nav>
      )}
    </header>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppScreen, LanguageMode, WeddingEvent } from './types/yaadgaar';
import { TRANSLATIONS } from './data/translations';
import { streamService } from './services/streamService';
import { TopNav } from './components/TopNav';
import {
  CeremonyMood,
  MandapThreeCanvas,
} from './components/MandapThreeCanvas';
import { ShubhAarambhIntro } from './components/ShubhAarambhIntro';
import { GoldSparkleCursor } from './components/GoldSparkleCursor';
import { LandingScreen } from './screens/LandingScreen';
import { EventLiveScreen } from './screens/EventLiveScreen';
import { ArchiveScreen } from './screens/ArchiveScreen';
import { QrInviteScreen } from './screens/QrInviteScreen';
import { PhotoBookScreen } from './screens/PhotoBookScreen';
import { HostDashboardScreen } from './screens/HostDashboardScreen';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('autostart') !== '1';
  });

  const [activeScreen, setActiveScreen] = useState<AppScreen>('landing');
  const [language, setLanguage] = useState<LanguageMode>('hinglish');
  const [mood, setMood] = useState<CeremonyMood>('pheras');

  const [events, setEvents] = useState<WeddingEvent[]>(() =>
    streamService.getEvents(),
  );
  const [activeEventId, setActiveEventId] = useState<string>(
    () => streamService.getEvents()[0].id,
  );

  const activeEvent =
    events.find((e) => e.id === activeEventId) ?? events[0];

  const copy = TRANSLATIONS[language];

  const handleCycleLanguage = useCallback(() => {
    setLanguage((prev) =>
      prev === 'hinglish' ? 'en' : prev === 'en' ? 'hi' : 'hinglish',
    );
  }, []);

  const handleNavigate = useCallback(
    (screen: AppScreen, sectionAnchor?: string) => {
      setActiveScreen(screen);
      if (screen === 'event') setMood('pheras');
      else if (screen === 'archive') setMood('mehendi');
      else if (screen === 'qr') setMood('sangeet');
      else if (screen === 'album') setMood('reception');
      else if (screen === 'dashboard') setMood('haldi');

      window.setTimeout(() => {
        if (sectionAnchor) {
          document
            .getElementById(sectionAnchor)
            ?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 40);
    },
    [],
  );

  // Allow deep-linking via ?event=CODE
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('event');
    if (codeParam) {
      const matched = streamService.resolveByCodeOrUrl(codeParam);
      if (matched) {
        setActiveEventId(matched.id);
        setActiveScreen('event');
        setShowIntro(false);
      }
    }
  }, []);

  const handleEventCreated = (created: WeddingEvent) => {
    setEvents(streamService.getEvents());
    setActiveEventId(created.id);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF6F0] text-[#4A2A3E]">
      {/* Three.js Ceremony Backdrop */}
      <MandapThreeCanvas
        mood={mood}
        className={activeScreen === 'landing' ? '!opacity-10' : '!opacity-12'}
      />

      {/* Subtle gold cursor trail on desktop */}
      <GoldSparkleCursor />

      {/* Optional Shubh Aarambh Intro */}
      <AnimatePresence>
        {showIntro && (
          <ShubhAarambhIntro
            copy={copy.intro}
            onEnter={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>

      {/* Persistent Minimal Editorial Top Bar */}
      <TopNav
        activeScreen={activeScreen}
        language={language}
        copy={copy.nav}
        onNavigate={handleNavigate}
        onCycleLanguage={handleCycleLanguage}
      />

      {/* Screen Content */}
      <main id="main-content" className="relative z-10">
        {activeScreen === 'landing' && (
          <LandingScreen
            copy={copy}
            language={language}
            activeEvent={activeEvent}
            onNavigate={handleNavigate}
            onMoodChange={setMood}
          />
        )}
        {activeScreen === 'event' && (
          <EventLiveScreen
            event={activeEvent}
            onOpenArchive={() => handleNavigate('archive')}
            onOpenQr={() => handleNavigate('qr')}
          />
        )}
        {activeScreen === 'archive' && (
          <ArchiveScreen
            event={activeEvent}
            onOpenAlbum={() => handleNavigate('album')}
          />
        )}
        {activeScreen === 'qr' && (
          <QrInviteScreen
            event={activeEvent}
            onResolveEventCode={(payload) =>
              streamService.resolveByCodeOrUrl(payload)
            }
            onEnterEvent={(matched) => {
              setActiveEventId(matched.id);
              handleNavigate('event');
            }}
          />
        )}
        {activeScreen === 'album' && <PhotoBookScreen event={activeEvent} />}
        {activeScreen === 'dashboard' && (
          <HostDashboardScreen
            events={events}
            activeEvent={activeEvent}
            onSelectEvent={setActiveEventId}
            onEventCreated={handleEventCreated}
            onOpenLive={() => handleNavigate('event')}
            onOpenQr={() => handleNavigate('qr')}
          />
        )}
      </main>
    </div>
  );
}

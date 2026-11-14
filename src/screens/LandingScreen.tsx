import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Check, Play, QrCode, ShieldCheck } from 'lucide-react';
import QRCode from 'qrcode';
import { AppScreen, LanguageMode, WeddingEvent } from '../types/yaadgaar';
import { TranslationBundle } from '../data/translations';
import { ASSET_IMAGES, formatInvitationPipeDate } from '../services/streamService';
import {
  BillingCycle,
  formatPlanPriceDisplay,
  paymentService,
} from '../services/paymentService';
import { MughalArchFrame } from '../components/MughalArchFrame';
import { MagneticDiyaButton } from '../components/GoldSparkleCursor';
import { CeremonyMood } from '../components/MandapThreeCanvas';
import { ScrollCircleIndicator } from '../components/ScrollCircleIndicator';
import { YarnHeartLogo } from '../components/YarnHeartLogo';

interface LandingScreenProps {
  copy: TranslationBundle;
  language: LanguageMode;
  activeEvent: WeddingEvent;
  onNavigate: (screen: AppScreen) => void;
  onMoodChange: (mood: CeremonyMood) => void;
}

const SECTION_BG_HEX: Record<number, string> = {
  0: '#FFE2CC', // 01 Live — Peach
  1: '#FFF0A8', // 02 Blessings — Haldi yellow
  2: '#DFF1D2', // 03 Archive — Mint
  3: '#FFD6E1', // 04 QR card — Blush pink
  4: '#FFE7BF', // 05 Photo book — Saffron cream
  5: '#FFCFC2', // 06 Closing — Rose peach
  6: '#FAF6F0', // 07 Pricing — Warm cream -> Footer plum #3E1230
};

function renderMultilineHeadline(headline: string) {
  const lines = headline.split('\n');
  return lines.map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </React.Fragment>
  ));
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  copy,
  language,
  activeEvent,
  onNavigate,
  onMoodChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [selectedPlanMsg, setSelectedPlanMsg] = useState<string | null>(null);
  const [previewQrSvg, setPreviewQrSvg] = useState<string>('');
  const [miniPageFlipped, setMiniPageFlipped] = useState(false);

  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const plans = paymentService.getPlans();
  const pipeDate = formatInvitationPipeDate(activeEvent.dateFormatted);

  useEffect(() => {
    QRCode.toString(`https://yaadgaar.in/join/${activeEvent.code}`, {
      type: 'svg',
      margin: 1,
      width: 148,
      color: { dark: '#3E1230', light: '#FAF6F0' },
    })
      .then((svg) => setPreviewQrSvg(svg))
      .catch(() => {});
  }, [activeEvent.code]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-section-index'));
            if (!Number.isNaN(idx)) {
              setActiveIndex(idx);
              const moods: CeremonyMood[] = [
                'pheras',
                'haldi',
                'mehendi',
                'sangeet',
                'reception',
                'vidaai',
                'blessing',
              ];
              onMoodChange(moods[idx] ?? 'pheras');
            }
          }
        }
      },
      { threshold: 0.38 },
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onMoodChange]);

  const scrollToNext = () => {
    const nextIdx = (activeIndex + 1) % 7;
    sectionRefs.current[nextIdx]?.scrollIntoView({ behavior: 'smooth' });
  };

  const sec = copy.sections;
  const sectionsList = [
    { key: 's01', data: sec.s01, visualSide: 'left' as const },
    { key: 's02', data: sec.s02, visualSide: 'right' as const },
    { key: 's03', data: sec.s03, visualSide: 'left' as const },
    { key: 's04', data: sec.s04, visualSide: 'right' as const },
    { key: 's05', data: sec.s05, visualSide: 'left' as const },
    { key: 's06', data: sec.s07, visualSide: 'right' as const },
  ];

  const isHindi = language === 'hi';
  const currentBgHex = SECTION_BG_HEX[activeIndex] ?? '#FFE2CC';

  const renderSectionVisual = (index: number) => {
    switch (index) {
      case 0:
        return (
          <MughalArchFrame variant="mandap" accentColor="#F26B21">
            <div className="relative h-[480px] sm:h-[580px] lg:h-[690px] w-full bg-[#3E1230]">
              <img
                src={ASSET_IMAGES.mandapCouple}
                alt="Illustration of Indian bride and groom under marigold mandap"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-[9000ms] ease-in-out hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3E1230]/92 via-[#3E1230]/25 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 px-6 sm:px-8 py-6 flex items-center justify-between gap-4 text-[#FAF6F0]">
                <div className="min-w-0">
                  <p className="font-ui text-xs uppercase tracking-[0.14em] text-[#F5A623] font-semibold">
                    Now Live · {activeEvent.activeCeremony}
                  </p>
                  <p className="font-couple text-3xl sm:text-4xl text-[#FAF6F0] truncate mt-0.5">
                    {activeEvent.coupleNames}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('event')}
                  aria-label="Play live wedding stream"
                  className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[#C8431A] text-[#FAF6F0] shadow-lg hover:bg-[#F26B21] hover:scale-105 transition-all cursor-pointer"
                >
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </button>
              </div>
            </div>
          </MughalArchFrame>
        );
      case 1:
        return (
          <MughalArchFrame variant="haldi" accentColor="#F5A623">
            <div className="relative h-[480px] sm:h-[580px] lg:h-[690px] w-full bg-[#3E1230]">
              <img
                src={ASSET_IMAGES.haldi}
                alt="Haldi ceremony celebration with marigolds and brass urli"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3E1230]/95 via-[#3E1230]/35 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 space-y-2.5">
                <div className="rounded-xl bg-[#FAF6F0]/95 px-4 py-3 text-left shadow-sm">
                  <p className="font-ui text-xs font-semibold text-[#8A2E52]">
                    Sunita Masi · Melbourne
                  </p>
                  <p className="font-ui text-[15px] text-[#3E1230] mt-0.5">
                    “Bhagwan aap dono ki jodi hamesha salamat rakhe!”
                  </p>
                </div>
                <div className="rounded-xl bg-[#FAF6F0]/95 px-4 py-3 text-left shadow-sm">
                  <p className="font-ui text-xs font-semibold text-[#8A2E52]">
                    Dada Ji & Dadi Maa · Pune
                  </p>
                  <p className="font-ui text-[15px] text-[#3E1230] mt-0.5">
                    “Sada sukhi raho, hamesha saath muskurate raho.”
                  </p>
                </div>
              </div>
            </div>
          </MughalArchFrame>
        );
      case 2:
        return (
          <MughalArchFrame variant="archive-grid" accentColor="#3E7B3A">
            <div className="h-[520px] sm:h-[620px] lg:h-[690px] w-full bg-[#3E1230]/95 p-3 sm:p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between px-2 pt-1 text-[#FAF6F0]">
                <span className="inline-flex items-center gap-1.5 font-ui text-xs font-semibold tracking-wide text-[#DFF1D2]">
                  <ShieldCheck className="h-4 w-4 text-[#F5A623]" aria-hidden="true" />
                  Preserved Forever
                </span>
                <span className="font-ui text-xs text-[#FAF6F0]/80 tabular-nums">
                  6 Sacred Chapters
                </span>
              </div>
              {/* 6 large interactive ceremony image tiles */}
              <div className="grid grid-cols-2 grid-rows-3 gap-3 flex-1 min-h-0">
                {activeEvent.chapters.slice(0, 6).map((chap, cIdx) => (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => onNavigate('archive')}
                    className="group relative overflow-hidden rounded-2xl border border-[#FAF6F0]/20 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F5A623]"
                  >
                    <img
                      src={chap.thumbnail}
                      alt={`${chap.ceremony} ceremony archive chapter`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3E1230]/92 via-[#3E1230]/25 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between gap-2 text-[#FAF6F0]">
                      <div>
                        <p className="font-ui text-[10px] uppercase tracking-wider text-[#F5A623] font-semibold">
                          0{cIdx + 1} · {chap.duration}
                        </p>
                        <p className="font-display text-lg sm:text-xl font-semibold leading-tight">
                          {chap.ceremony}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </MughalArchFrame>
        );
      case 3:
        return (
          <MughalArchFrame variant="shaadi-card" accentColor="#E8467C">
            <div className="h-[490px] sm:h-[600px] lg:h-[690px] w-full bg-[#FAF6F0] paper-grain flex flex-col items-center justify-center p-7 sm:p-10 text-center">
              <p className="font-display text-xs sm:text-sm uppercase tracking-[0.22em] text-[#3E1230] font-semibold">
                Save
              </p>
              <p className="font-couple text-3xl text-[#8A2E52] -my-1">the</p>
              <p className="font-display text-xs sm:text-sm uppercase tracking-[0.22em] text-[#3E1230] font-semibold">
                Date
              </p>

              <p className="font-couple text-5xl sm:text-6xl text-[#3E1230] mt-4">
                {activeEvent.coupleNames}
              </p>

              <p className="mt-3 font-display text-sm uppercase tracking-[0.16em] text-[#4A2A3E] flex items-center justify-center gap-2.5">
                <span>{pipeDate.month}</span>
                <span aria-hidden="true" className="text-[#8A2E52]/60">|</span>
                <span className="text-base font-semibold text-[#3E1230]">{pipeDate.day}</span>
                <span aria-hidden="true" className="text-[#8A2E52]/60">|</span>
                <span>{pipeDate.year}</span>
              </p>
              <p className="mt-1 font-ui text-xs tracking-[0.14em] uppercase text-[#4A2A3E]">
                {activeEvent.city}
              </p>

              <div className="my-6 flex h-40 w-40 items-center justify-center rounded-2xl border-2 border-[#E8467C]/45 bg-[#FAF6F0] p-2.5 shadow-sm">
                {previewQrSvg ? (
                  <div
                    className="h-full w-full [&>svg]:h-full [&>svg]:w-full"
                    dangerouslySetInnerHTML={{ __html: previewQrSvg }}
                    aria-label={`QR code for ${activeEvent.coupleNames}`}
                  />
                ) : (
                  <QrCode className="h-24 w-24 text-[#3E1230]" />
                )}
              </div>

              <p className="font-display italic text-base text-[#4A2A3E]">
                Formal invitation to follow · Code: {activeEvent.code}
              </p>
            </div>
          </MughalArchFrame>
        );
      case 4:
        return (
          <MughalArchFrame variant="album" accentColor="#D9482B">
            <div className="h-[460px] sm:h-[580px] lg:h-[690px] w-full bg-[#3E1230] p-5 sm:p-7 flex flex-col justify-between">
              <div className="album-perspective relative flex-1 w-full min-h-[340px]">
                {/* Open Two-Page Wedding Album Spread */}
                <div className="absolute inset-0 grid grid-cols-2 rounded-xl overflow-hidden border border-[#C9A35B]/60 bg-[#FAF6F0] shadow-inner">
                  <div className="border-r border-[#8A2E52]/20 p-3 sm:p-5 flex flex-col justify-between bg-[#FAF6F0]">
                    <span className="font-ui text-xs font-semibold text-[#8A2E52]">
                      Chapter IV · Pheras
                    </span>
                    <div className="my-2 flex-1 overflow-hidden rounded-lg border border-[#C9A35B]/45">
                      <img
                        src={ASSET_IMAGES.pheras}
                        alt="Sacred pheras illustration spread"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="font-display italic text-sm sm:text-base text-[#3E1230]">
                      Saat kadam, ek saath.
                    </p>
                  </div>
                  <div className="p-3 sm:p-5 flex flex-col justify-between bg-[#FFF8EE]">
                    <span className="font-ui text-xs font-semibold text-[#8A2E52]">
                      Chapter V · Sangeet
                    </span>
                    <div className="my-2 flex-1 overflow-hidden rounded-lg border border-[#C9A35B]/45">
                      <img
                        src={ASSET_IMAGES.sangeet}
                        alt="Sangeet evening illustration spread"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="font-display italic text-sm sm:text-base text-[#3E1230]">
                      Lanterns & dholak melodies.
                    </p>
                  </div>
                </div>

                {/* Interactive Turning Hardbound Front Cover */}
                <div
                  className="album-leaf absolute inset-y-0 right-0 w-1/2 pointer-events-none"
                  style={{
                    transform: miniPageFlipped ? 'rotateY(-155deg)' : 'rotateY(0deg)',
                  }}
                >
                  <div className="album-face absolute inset-0 bg-[#3E1230] text-[#FAF6F0] p-6 flex flex-col items-center justify-center text-center border-2 border-[#C9A35B] rounded-r-xl">
                    <YarnHeartLogo size={46} />
                    <p className="font-couple text-3xl sm:text-4xl mt-3 text-[#F5A623]">
                      {activeEvent.coupleNames}
                    </p>
                    <p className="font-ui text-xs tracking-wider text-[#FAF6F0]/80 mt-1">
                      Wedding Photo Book
                    </p>
                  </div>
                  <div className="album-face-back absolute inset-0 bg-[#FAF6F0] border border-[#C9A35B]/55 p-6 flex items-center justify-center text-center rounded-l-xl">
                    <p className="font-display italic text-lg sm:text-xl text-[#3E1230]">
                      “Sab photos ek album mein, bilkul asli kitaab jaisi.”
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[#FAF6F0]">
                <button
                  type="button"
                  onClick={() => setMiniPageFlipped((v) => !v)}
                  className="font-ui inline-flex items-center gap-2 rounded-full bg-[#FAF6F0] text-[#3E1230] px-4 py-2 text-xs sm:text-sm font-medium hover:bg-[#F5A623] transition-colors cursor-pointer"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span>{miniPageFlipped ? 'Close Cover' : 'Flip Sample Page'}</span>
                </button>
                <span className="font-ui text-xs text-[#FAF6F0]/85 font-medium">
                  PDF Export Ready
                </span>
              </div>
            </div>
          </MughalArchFrame>
        );
      default:
        return (
          <MughalArchFrame variant="closing" accentColor="#C9A35B">
            <div className="relative h-[480px] sm:h-[580px] lg:h-[690px] w-full bg-[#3E1230]">
              <img
                src={ASSET_IMAGES.pheras}
                alt="Sacred pheras around havan fire illustration"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3E1230]/92 via-[#3E1230]/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 px-6 sm:px-8 py-6 text-center text-[#FAF6F0]">
                <p className="font-ui text-xs sm:text-sm font-medium tracking-wide text-[#FAF6F0]/90">
                  Roka · Haldi · Mehendi · Sangeet · Pheras · Vidaai · Reception · Griha Pravesh · Naamkaran
                </p>
              </div>
            </div>
          </MughalArchFrame>
        );
    }
  };

  const handleSectionAction = (idx: number) => {
    if (idx === 0 || idx === 1) onNavigate('event');
    else if (idx === 2) onNavigate('archive');
    else if (idx === 3) onNavigate('qr');
    else if (idx === 4) onNavigate('album');
    else onNavigate('dashboard');
  };

  return (
    <div
      className="relative transition-colors duration-700 ease-out"
      style={{ backgroundColor: currentBgHex }}
    >
      {sectionsList.map((item, idx) => {
        const isVisualLeft = item.visualSide === 'left';

        return (
          <section
            key={item.key}
            id={`section-${item.data.numeral}`}
            ref={(el) => {
              sectionRefs.current[idx] = el;
            }}
            data-section-index={idx}
            className="relative flex items-center py-20 lg:py-24 px-5 sm:px-10 border-b border-[#3E1230]/10"
          >
            <div className="mx-auto w-full max-w-[1320px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Full-Bleed Arch Visual Column (~48–50% width, 680–760px desktop height) */}
              <div
                className={`lg:col-span-6 w-full ${
                  isVisualLeft ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                {renderSectionVisual(idx)}
              </div>

              {/* Editorial Copy Column (max 520px, zero numeral/eyebrow overlap) */}
              <div
                className={`lg:col-span-6 w-full ${
                  isVisualLeft ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="max-w-[560px]">
                  <span
                    aria-hidden="true"
                    className="block select-none font-display text-5xl sm:text-6xl leading-none font-semibold text-[#3E1230]/20 mb-3"
                  >
                    {item.data.numeral}
                  </span>

                  <p className="font-ui text-[13px] sm:text-[14px] font-semibold tracking-[0.03em] text-[#8A2E52]">
                    {item.data.ceremonyTag}
                  </p>

                  <h2
                    className={`mt-3 text-[38px] sm:text-[48px] lg:text-[56px] font-semibold tracking-[-0.01em] leading-[1.06] text-[#3E1230] ${
                      isHindi ? 'font-hindi-accent' : 'font-display'
                    }`}
                  >
                    {renderMultilineHeadline(item.data.headline)}
                  </h2>

                  <p
                    className={`mt-5 text-[18px] sm:text-[19px] font-normal leading-[1.6] text-[#4A2A3E] ${
                      isHindi ? 'font-hindi' : 'font-ui'
                    }`}
                  >
                    {item.data.subcopy}
                  </p>

                  {item.data.quote && (
                    <blockquote className="mt-6">
                      <p className="font-display italic text-[19px] sm:text-[21px] leading-[1.45] text-[#3E1230]/90">
                        “{item.data.quote}”
                      </p>
                    </blockquote>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-3.5">
                    <MagneticDiyaButton
                      onClick={() => handleSectionAction(idx)}
                      showDiyaOnHover={idx === 0}
                      variant="plum"
                    >
                      {item.data.ctaLabel}
                    </MagneticDiyaButton>

                    {idx === 0 && (
                      <button
                        type="button"
                        onClick={() => onNavigate('qr')}
                        className="font-ui rounded-full px-6 py-3 text-[15px] font-medium text-[#3E1230] border-[1.5px] border-[#3E1230] bg-transparent hover:bg-[#3E1230]/8 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {sec.s04.ctaLabel}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Compact Pricing Section (Last before Plum Footer, on Warm Cream #FAF6F0) */}
      <section
        id="section-pricing"
        ref={(el) => {
          sectionRefs.current[6] = el;
        }}
        data-section-index={6}
        className="relative py-16 lg:py-20 px-5 sm:px-10 bg-[#FAF6F0]"
      >
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#3E1230]/15 pb-4">
            <div>
              <p className="font-ui text-[13px] sm:text-[14px] font-semibold text-[#8A2E52]">
                07 · {sec.s06.ceremonyTag}
              </p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-semibold tracking-[-0.01em] leading-[1.1] text-[#3E1230]">
                {sec.s06.headline}
              </h2>
            </div>

            <div
              role="group"
              aria-label="Billing cycle toggle"
              className="font-ui inline-flex self-start sm:self-auto rounded-full border border-[#3E1230]/25 bg-white p-1"
            >
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`rounded-full px-4 py-1 text-xs sm:text-sm font-medium cursor-pointer transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-[#3E1230] text-[#FAF6F0]'
                    : 'text-[#4A2A3E] hover:text-[#3E1230]'
                }`}
              >
                {copy.pricing.toggleMonthly}
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`rounded-full px-4 py-1 text-xs sm:text-sm font-medium cursor-pointer transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-[#3E1230] text-[#FAF6F0]'
                    : 'text-[#4A2A3E] hover:text-[#3E1230]'
                }`}
              >
                {copy.pricing.toggleYearly}
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {plans.map((plan) => {
              const priceInfo = formatPlanPriceDisplay(plan, billingCycle);
              const isVault = plan.id === 'we-store-it';
              return (
                <div
                  key={plan.id}
                  className={`flex flex-col justify-between rounded-2xl p-5 border transition-colors ${
                    isVault
                      ? 'bg-[#3E1230] text-[#FAF6F0] border-[#C9A35B]/75 shadow-sm'
                      : 'bg-white text-[#3E1230] border-[#3E1230]/20'
                  }`}
                >
                  <div>
                    <span
                      className={`font-ui block text-xs font-semibold ${
                        isVault ? 'text-[#F5A623]' : 'text-[#8A2E52]'
                      }`}
                    >
                      {plan.hindiTag}
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-semibold tracking-[-0.01em] whitespace-nowrap">
                      {plan.name}
                    </h3>

                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="font-ui text-2xl font-bold tabular-nums">
                        {priceInfo.amount}
                      </p>
                      <span
                        className={`font-ui text-xs ${
                          isVault ? 'text-[#FAF6F0]/80' : 'text-[#4A2A3E]'
                        }`}
                      >
                        · {priceInfo.cadence}
                      </span>
                    </div>

                    <ul className="mt-3.5 space-y-2 border-t border-current/15 pt-3">
                      {plan.included.slice(0, 3).map((item) => (
                        <li key={item} className="font-ui flex items-start gap-2 text-[13.5px] leading-snug">
                          <Check
                            className={`h-4 w-4 shrink-0 mt-0.5 ${
                              isVault ? 'text-[#F5A623]' : 'text-[#3E7B3A]'
                            }`}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const res = paymentService.selectPlan(plan.id, billingCycle);
                      setSelectedPlanMsg(res.message);
                    }}
                    className={`font-ui mt-5 w-full rounded-full py-2.5 text-sm font-medium cursor-pointer transition-colors ${
                      isVault
                        ? 'bg-[#F5A623] text-[#3E1230] hover:bg-[#FFC14D]'
                        : 'bg-[#3E1230] text-[#FAF6F0] hover:bg-[#571A43]'
                    }`}
                  >
                    {copy.pricing.selectPlan}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Transparent Archive Expiry / Lapse Policy Note */}
          <p className="font-ui text-center text-[14px] leading-relaxed text-[#4A2A3E] pt-1">
            {copy.pricing.lapsePolicy}
          </p>

          {selectedPlanMsg && (
            <div
              role="status"
              className="font-ui flex items-center justify-between gap-4 rounded-xl border border-[#3E7B3A]/40 bg-[#DFF1D2] px-4 py-3 text-sm text-[#244B21]"
            >
              <span>{selectedPlanMsg}</span>
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="font-semibold underline underline-offset-4 whitespace-nowrap cursor-pointer"
              >
                Open Host Studio
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Warm Closing Plum Footer */}
      <footer
        id="section-contact"
        className="relative bg-[#3E1230] text-[#FAF6F0] py-14 px-6 sm:px-10 border-t border-[#C9A35B]/45"
      >
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <YarnHeartLogo size={42} className="border border-[#C9A35B]/50 rounded-full" />
            <div>
              <p className="font-display text-2xl font-semibold tracking-[-0.015em] text-[#FAF6F0]">
                Yaadgaar
              </p>
              <p className="mt-1 font-ui text-[15px] text-[#FAF6F0]/90">
                {copy.footer.contactTitle}
              </p>
              <p className="mt-0.5 font-ui text-sm text-[#F5A623]">
                {copy.footer.contactSubtitle}
              </p>
            </div>
          </div>

          <div className="font-ui flex flex-wrap gap-5 text-[14px] font-medium text-[#FAF6F0]/90">
            <button
              type="button"
              onClick={() => onNavigate('event')}
              className="hover:text-[#F5A623] cursor-pointer"
            >
              Live Ceremony
            </button>
            <button
              type="button"
              onClick={() => onNavigate('archive')}
              className="hover:text-[#F5A623] cursor-pointer"
            >
              Forever Archive
            </button>
            <button
              type="button"
              onClick={() => onNavigate('qr')}
              className="hover:text-[#F5A623] cursor-pointer"
            >
              QR Invitation
            </button>
            <button
              type="button"
              onClick={() => onNavigate('album')}
              className="hover:text-[#F5A623] cursor-pointer"
            >
              Photo Book
            </button>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="hover:text-[#F5A623] cursor-pointer"
            >
              Host Studio
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-6xl mt-8 pt-6 border-t border-[#FAF6F0]/15 font-ui text-sm text-[#FAF6F0]/75 flex flex-col sm:flex-row justify-between gap-2">
          <span>{copy.footer.copyright}</span>
          <span>Made with warmth for families across the world</span>
        </div>
      </footer>

      <ScrollCircleIndicator
        activeIndex={activeIndex}
        total={7}
        onNext={scrollToNext}
      />
    </div>
  );
};

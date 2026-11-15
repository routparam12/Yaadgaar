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

const SECTION_TINTS: Record<number, string> = {
  0: 'bg-[#FAF6F0]/90',
  1: 'bg-[#FBF6EA]/88', // Sunlit Haldi warm ivory
  2: 'bg-[#E5F0D8]/92', // Mehendi garden sage ivory
  3: 'bg-[#FAF3F6]/88', // Sangeet pearl ivory
  4: 'bg-[#FAF5F1]/90', // Reception blush ivory
  5: 'bg-[#FAF6F0]/92', // Pricing crisp warm ivory
  6: 'bg-[#FAF5F0]/90', // Closing warm ivory
};

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
      width: 120,
      color: { dark: '#1E1E1E', light: '#FAF6F0' },
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
                'blessing',
                'pheras',
              ];
              onMoodChange(moods[idx] ?? 'pheras');
            }
          }
        }
      },
      { threshold: 0.45 },
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
    {
      key: 's06',
      data: { ...sec.s07, numeral: '06' },
      visualSide: 'right' as const,
    },
  ];

  const isHindi = language === 'hi';

  const renderSectionVisual = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="mx-auto w-full max-w-[360px] sm:max-w-[385px]">
            <MughalArchFrame accentColor="#D9482B" variant="mandap">
              <div className="bg-[#3E1230] border border-[#C9A35B]/40">
                <div className="relative overflow-hidden aspect-[896/1200] bg-[#2D0B22]">
                  <img
                    src={ASSET_IMAGES.mandapCouple}
                    alt="Hand-painted illustration of Indian bride and groom seated under marigold mandap canopy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-4 py-3 flex items-center justify-between gap-3 text-[#F6EBDD] border-t border-[#C9A35B]/35">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#C9A35B]">
                      Now Live · {activeEvent.activeCeremony}
                    </p>
                    <p className="font-couple text-3xl text-[#FAF6F0] truncate">
                      {activeEvent.coupleNames}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('event')}
                    aria-label="Play live wedding stream"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F6EBDD] text-[#3E1230] shadow-md hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                  </button>
                </div>
              </div>
            </MughalArchFrame>
          </div>
        );
      case 1:
        return (
          <MughalArchFrame accentColor="#E8A317" variant="haldi">
            <div className="space-y-4 bg-white p-3.5 sm:p-4">
              <div className="overflow-hidden rounded-xl aspect-[1200/896] border border-[#E8A317]/35 bg-[#FAF6F0]">
                <img
                  src={ASSET_IMAGES.haldi}
                  alt="Haldi ceremony celebration with family, marigold garlands, and sunlit courtyard"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-2.5 text-left px-1">
                <div className="border-b border-[#B5767C]/25 pb-2">
                  <p className="text-xs font-medium text-[#3E1230]">
                    Sunita Masi · Melbourne
                  </p>
                  <p className="text-xs italic text-[#3E1230]/80 mt-0.5">
                    “Bhagwan aap dono ki jodi hamesha salamat rakhe!”
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#3E1230]">
                    Dada Ji & Dadi Maa · Pune
                  </p>
                  <p className="text-xs italic text-[#3E1230]/80 mt-0.5">
                    “Sada sukhi raho, hamesha saath muskurate raho.”
                  </p>
                </div>
              </div>
            </div>
          </MughalArchFrame>
        );
      case 2:
        return (
          <div className="rounded-2xl bg-[#3E1230] p-4 sm:p-5 border-2 border-[#3E7B3A]/75 shadow-xl">
            <div className="mb-3.5 flex items-center justify-between text-xs">
              <span className="font-ui inline-flex items-center gap-1.5 font-medium text-[#FAF6F0]">
                <ShieldCheck className="h-4 w-4 text-[#C9A35B]" aria-hidden="true" />
                <span>Preserved Forever</span>
              </span>
              <span className="font-ui text-[#FAF6F0]/75 tabular-nums">
                6 Sacred Chapters
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {activeEvent.chapters.slice(0, 6).map((chap, chapIdx) => (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => onNavigate('archive')}
                  className="group relative overflow-hidden rounded-lg aspect-[16/10] border border-[#C9A35B]/35 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A35B]"
                >
                  <img
                    src={chap.thumbnail}
                    alt={`${chap.ceremony} ceremony archive chapter`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#210618]/95 via-[#210618]/25 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <p className="font-ui text-[10.5px] font-medium text-[#C9A35B] tabular-nums">
                      {String(chapIdx + 1).padStart(2, '0')} · {chap.duration}
                    </p>
                    <p className="font-display text-base sm:text-lg font-bold leading-tight text-[#FAF6F0]">
                      {chap.ceremony}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <MughalArchFrame accentColor="#D9482B" variant="shaadi-card">
            <div className="bg-[#FAF6F0] p-6 sm:p-7 text-center border border-[#C9A35B]/45 paper-grain">
              <p className="font-editorial text-xs sm:text-sm uppercase tracking-[0.22em] text-[#1E1E1E]">
                SAVE
              </p>
              <p className="font-couple text-2xl text-[#1E1E1E] -my-1">the</p>
              <p className="font-editorial text-xs sm:text-sm uppercase tracking-[0.22em] text-[#1E1E1E]">
                DATE
              </p>

              <p className="font-couple text-4xl text-[#1E1E1E] mt-3">
                {activeEvent.coupleNames}
              </p>

              <p className="mt-2 font-editorial text-xs uppercase tracking-[0.18em] text-[#1E1E1E] flex items-center justify-center gap-2">
                <span>{pipeDate.month}</span>
                <span aria-hidden="true" className="text-[#1E1E1E]/55">|</span>
                <span className="text-sm font-medium">{pipeDate.day}</span>
                <span aria-hidden="true" className="text-[#1E1E1E]/55">|</span>
                <span>{pipeDate.year}</span>
              </p>
              <p className="mt-1 font-editorial text-[11px] tracking-[0.18em] uppercase text-[#1E1E1E]/80">
                {activeEvent.city}
              </p>

              <div className="my-4 mx-auto flex h-32 w-32 items-center justify-center border border-[#3E1230]/20 bg-[#FAF6F0] p-2">
                {previewQrSvg ? (
                  <div
                    className="h-full w-full [&>svg]:h-full [&>svg]:w-full"
                    dangerouslySetInnerHTML={{ __html: previewQrSvg }}
                    aria-label={`QR code for ${activeEvent.coupleNames}`}
                  />
                ) : (
                  <QrCode className="h-16 w-16 text-[#1E1E1E]" />
                )}
              </div>

              <p className="font-editorial italic text-sm text-[#1E1E1E]/80">
                Formal Invitation to follow · Code: {activeEvent.code}
              </p>
            </div>
          </MughalArchFrame>
        );
      case 4:
        return (
          <MughalArchFrame accentColor="#C9A35B" variant="album">
            <div className="bg-white p-4 border border-[#C9A35B]/45">
              <div className="album-perspective relative h-64 w-full">
                {/* Right base page */}
                <div className="absolute inset-0 grid grid-cols-2 border border-[#3E1230]/20 bg-[#FFFDF9] shadow-inner">
                  <div className="border-r border-[#B5767C]/30 p-3 flex flex-col justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-[#B5767C]">
                      Chapter I · First Meeting
                    </span>
                    <img
                      src="/assets/aistudio/image_1e4b5d46.png"
                      alt="Beginning of forever wedding memory"
                      referrerPolicy="no-referrer"
                      className="h-36 w-full object-cover object-top border border-[#C9A35B]/30"
                    />
                    <p className="text-[11px] italic text-[#3E1230]/80">
                      The quiet beginning of forever.
                    </p>
                  </div>
                  <div className="p-3 flex flex-col justify-between bg-[#F3E6E1]/50">
                    <span className="text-[10px] uppercase tracking-widest text-[#B5767C]">
                      Chapter VI · Hath Ganthi
                    </span>
                    <img
                      src="/assets/aistudio/image_2f653503.png"
                      alt="Hath Ganthi sacred wedding knot"
                      referrerPolicy="no-referrer"
                      className="h-36 w-full object-cover border border-[#C9A35B]/30"
                    />
                    <p className="text-[11px] italic text-[#3E1230]/80">
                      Bound together for seven lifetimes.
                    </p>
                  </div>
                </div>

                {/* Interactive turning front cover leaf */}
                <div
                  className="album-leaf absolute inset-y-0 right-0 w-1/2 pointer-events-none"
                  style={{
                    transform: miniPageFlipped ? 'rotateY(-155deg)' : 'rotateY(0deg)',
                  }}
                >
                  <div className="album-face absolute inset-0 bg-[#3E1230] text-[#F6EBDD] p-4 flex flex-col items-center justify-center border border-[#C9A35B]">
                    <YarnHeartLogo size={36} />
                    <p className="font-couple text-2xl mt-2 text-[#C9A35B]">
                      {activeEvent.coupleNames}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] mt-1">
                      36-Memory Photo Book
                    </p>
                  </div>
                  <div className="album-face-back absolute inset-0 bg-[#F6EBDD] border border-[#B5767C]/40 p-4 flex items-center justify-center text-center">
                    <p className="font-editorial italic text-sm text-[#3E1230]">
                      “First meeting se sasural tak, har rasam ek panna hai.”
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMiniPageFlipped((v) => !v)}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#3E1230] underline underline-offset-4 cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{miniPageFlipped ? 'Close Cover' : 'Flip Sample Page'}</span>
                </button>
                <span className="text-[11px] text-[#3E1230]/70">8 Story Chapters · PDF Ready</span>
              </div>
            </div>
          </MughalArchFrame>
        );
      default:
        return (
          <MughalArchFrame accentColor="#D9482B" variant="closing">
            <div className="bg-white p-3.5 sm:p-4">
              <div className="overflow-hidden rounded-xl aspect-[4/3] border border-[#C9A35B]/45 bg-[#FAF6F0]">
                <img
                  src={ASSET_IMAGES.pheras}
                  alt="Sacred pheras around havan fire illustration"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#3E1230]/75 leading-relaxed">
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
    <div className="relative">
      {sectionsList.map((item, idx) => {
        const isVisualLeft = item.visualSide === 'left';
        const tintClass = SECTION_TINTS[idx] ?? 'bg-[#FAF6F0]/90';

        return (
          <section
            key={item.key}
            id={`section-${item.data.numeral}`}
            ref={(el) => {
              sectionRefs.current[idx] = el;
            }}
            data-section-index={idx}
            className={`relative min-h-[calc(100vh-68px)] flex items-center py-16 sm:py-24 px-5 sm:px-10 transition-colors duration-700 border-b border-[#B5767C]/25 ${tintClass}`}
          >
            <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Visual Column */}
              <div
                className={`lg:col-span-6 ${
                  isVisualLeft ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                {renderSectionVisual(idx)}
              </div>

              {/* Editorial Story Column */}
              <div
                className={`relative lg:col-span-6 ${
                  isVisualLeft ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="select-none font-display text-5xl sm:text-6xl leading-none font-bold text-[#3E1230]/18 block mb-2 tabular-nums"
                >
                  {item.data.numeral}
                </span>

                <div className="relative z-10">
                  <p className="font-ui text-[13px] font-medium text-[#3E1230]/80">
                    {item.data.ceremonyTag}
                  </p>

                  <h2
                    className={`mt-2 text-4xl sm:text-[3rem] font-bold leading-[1.08] tracking-[-0.02em] text-[#3E1230] [text-wrap:balance] ${
                      isHindi ? 'font-hindi-accent tracking-normal' : 'font-display'
                    }`}
                  >
                    {item.data.headline}
                  </h2>

                  <p
                    className={`mt-4 text-[15px] sm:text-base leading-relaxed text-[#3E1230]/80 max-w-xl ${
                      isHindi ? 'font-hindi' : 'font-ui'
                    }`}
                  >
                    {item.data.subcopy}
                  </p>

                  {/* Editorial Italic Quote */}
                  <blockquote className="mt-5 max-w-lg">
                    <p className="font-editorial italic text-xl sm:text-[1.35rem] leading-snug tracking-normal text-[#3E1230]/90">
                      “{item.data.quote}”
                    </p>
                    <footer className="mt-2 font-ui text-xs font-medium text-[#B5767C]">
                      — {item.data.quoteAuthor}
                    </footer>
                  </blockquote>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
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
                        className="font-ui rounded-full px-5 py-2.5 text-[13.5px] font-medium text-[#141414] bg-white/85 border border-[#1E1E1E]/20 hover:border-[#1E1E1E] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Scan Card QR
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Compact Closing Pricing Section (Last before Footer) */}
      <section
        id="section-pricing"
        ref={(el) => {
          sectionRefs.current[6] = el;
        }}
        data-section-index={6}
        className="relative py-10 sm:py-12 px-5 sm:px-10 bg-[#FAF6F0]/95 border-b border-[#B5767C]/25"
      >
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#B5767C]/30 pb-3.5">
            <div>
              <p className="font-ui text-xs font-medium text-[#B5767C]">
                07 · {sec.s06.ceremonyTag}
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-[-0.015em] text-[#3E1230]">
                {sec.s06.headline}
              </h2>
            </div>

            <div
              role="group"
              aria-label="Billing cycle toggle"
              className="font-ui inline-flex self-start sm:self-auto rounded-full border border-[#1E1E1E]/15 bg-white p-0.5"
            >
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`rounded-full px-3.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-[#181216] text-white'
                    : 'text-[#4A4A4A] hover:text-[#141414]'
                }`}
              >
                {copy.pricing.toggleMonthly}
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`rounded-full px-3.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-[#181216] text-white'
                    : 'text-[#4A4A4A] hover:text-[#141414]'
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
                  className={`flex flex-col justify-between rounded-2xl p-4 sm:p-5 border transition-colors ${
                    isVault
                      ? 'bg-[#3E1230] text-[#FAF6F0] border-[#C9A35B]/70 shadow-sm'
                      : 'bg-white text-[#1E1E1E] border-[#B5767C]/35'
                  }`}
                >
                  <div>
                    <span
                      className={`font-ui block text-[10.5px] font-medium tracking-wide ${
                        isVault ? 'text-[#C9A35B]' : 'text-[#B5767C]'
                      }`}
                    >
                      {plan.hindiTag}
                    </span>
                    <h3 className="mt-0.5 font-display text-lg sm:text-xl font-bold whitespace-nowrap">
                      {plan.name}
                    </h3>

                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="font-ui text-2xl font-bold tabular-nums">
                        {priceInfo.amount}
                      </p>
                      <span
                        className={`font-ui text-[11px] ${
                          isVault ? 'text-[#FAF6F0]/75' : 'text-[#1E1E1E]/65'
                        }`}
                      >
                        · {priceInfo.cadence}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-1.5 border-t border-current/15 pt-2.5">
                      {plan.included.slice(0, 3).map((item) => (
                        <li key={item} className="font-ui flex items-start gap-2 text-[12px] leading-snug">
                          <Check
                            className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${
                              isVault ? 'text-[#C9A35B]' : 'text-[#3E7B3A]'
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
                    className={`font-ui mt-4 w-full rounded-full py-2 text-xs font-medium cursor-pointer transition-colors ${
                      isVault
                        ? 'bg-[#C9A35B] text-[#141414] hover:bg-[#D7B36C]'
                        : 'bg-[#181216] text-white hover:bg-[#3E1230]'
                    }`}
                  >
                    {copy.pricing.selectPlan}
                  </button>
                </div>
              );
            })}
          </div>

          {selectedPlanMsg && (
            <div
              role="status"
              className="font-ui flex items-center justify-between gap-4 rounded-xl border border-[#3E7B3A]/40 bg-[#E5EBD9] px-4 py-2.5 text-xs text-[#244B21]"
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

      {/* Warm Closing Footer */}
      <footer
        id="section-contact"
        className="relative bg-[#3E1230] text-[#FAF6F0] py-12 px-6 sm:px-10 border-t border-[#C9A35B]/40"
      >
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <YarnHeartLogo size={42} className="border border-[#C9A35B]/50 rounded-full" />
            <div>
              <p className="font-ui text-xl font-semibold tracking-[-0.015em] text-[#FAF6F0]">
                Yaadgaar
              </p>
              <p className="mt-1 font-editorial italic text-base text-[#FAF6F0]/85 tracking-normal">
                {copy.footer.contactTitle}
              </p>
              <p className="mt-0.5 font-editorial italic text-sm text-[#C9A35B] tracking-normal">
                {copy.footer.contactSubtitle}
              </p>
            </div>
          </div>

          <div className="font-ui flex flex-wrap gap-5 text-[13px] font-medium text-[#FAF6F0]/85">
            <button
              type="button"
              onClick={() => onNavigate('event')}
              className="hover:text-[#C9A35B] cursor-pointer"
            >
              Live Ceremony
            </button>
            <button
              type="button"
              onClick={() => onNavigate('archive')}
              className="hover:text-[#C9A35B] cursor-pointer"
            >
              Forever Archive
            </button>
            <button
              type="button"
              onClick={() => onNavigate('qr')}
              className="hover:text-[#C9A35B] cursor-pointer"
            >
              QR Invitation
            </button>
            <button
              type="button"
              onClick={() => onNavigate('album')}
              className="hover:text-[#C9A35B] cursor-pointer"
            >
              Photo Book
            </button>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="hover:text-[#C9A35B] cursor-pointer"
            >
              Host Studio
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-6xl mt-8 pt-6 border-t border-[#F6EBDD]/15 font-editorial italic text-sm text-[#FAF6F0]/70 flex flex-col sm:flex-row justify-between gap-2">
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

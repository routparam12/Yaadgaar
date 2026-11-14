import React from 'react';
import { motion } from 'motion/react';
import { ASSET_IMAGES } from '../services/streamService';
import { TranslationBundle } from '../data/translations';

interface ShubhAarambhIntroProps {
  copy: TranslationBundle['intro'];
  onEnter: () => void;
}

export const ShubhAarambhIntro: React.FC<ShubhAarambhIntroProps> = ({
  copy,
  onEnter,
}) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF6F0] p-4 sm:p-8 paper-grain"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shubh-aarambh-title"
    >
      {/* Thin rose/gold shaadi card border on warm ivory */}
      <div className="relative w-full max-w-2xl border border-[#8A2E52]/35 bg-[#FAF6F0] p-7 sm:p-12 text-center shadow-[0_24px_60px_rgba(62,18,48,0.12)] paper-grain">
        <div className="pointer-events-none absolute inset-2.5 border border-[#C9A35B]/55" />

        <div className="relative z-10 flex flex-col items-center">
          <p className="font-hindi-accent text-sm sm:text-base tracking-wide text-[#8A2E52]">
            {copy.mantra}
          </p>

          <div className="mt-4 mb-4 w-52 sm:w-64 overflow-hidden rounded-xl border border-[#C9A35B]/55 bg-[#FAF6F0] shadow-sm">
            <img
              src={ASSET_IMAGES.ganesh}
              alt="Shubh Aarambh Lord Ganesha embossed antique gold filigree on ivory"
              referrerPolicy="no-referrer"
              className="mx-auto aspect-[4/3] w-full object-cover"
            />
          </div>

          <h1
            id="shubh-aarambh-title"
            className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.01em] leading-[1.05] text-[#3E1230]"
          >
            {copy.title}
          </h1>

          <p className="mt-3 max-w-md font-ui text-[18px] leading-[1.6] text-[#4A2A3E]">
            {copy.subtitle}
          </p>

          {/* Animated Gathbandhan knot */}
          <div className="my-5 flex items-center justify-center" aria-hidden="true">
            <svg width="210" height="50" viewBox="0 0 210 50" fill="none">
              <motion.path
                d="M12 26 C44 9, 74 41, 105 25 C136 9, 166 41, 198 24"
                stroke="#D9482B"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
              <motion.path
                d="M12 23 C46 39, 76 11, 105 25 C134 39, 164 11, 198 27"
                stroke="#F5A623"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.2, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="105"
                cy="25"
                r="7"
                fill="#D9482B"
                stroke="#C9A35B"
                strokeWidth="2"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              />
            </svg>
          </div>

          <div className="font-ui flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onEnter}
              className="rounded-full px-7 py-2.5 bg-[#3E1230] text-[#FAF6F0] text-[15px] font-medium hover:bg-[#571A43] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A35B] whitespace-nowrap shrink-0 shadow-sm"
            >
              {copy.enterCta}
            </button>
            <button
              type="button"
              onClick={onEnter}
              className="rounded-full px-6 py-2.5 text-[15px] font-medium text-[#3E1230] border border-[#3E1230]/45 bg-[#FAF6F0] hover:border-[#3E1230] hover:bg-[#3E1230]/5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {copy.skipCta}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

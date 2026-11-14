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
      {/* Thin rose-tinted outer shaadi card border */}
      <div className="relative w-full max-w-2xl border border-[#B5767C]/60 bg-[#FAF6F0] p-6 sm:p-12 text-center shadow-[0_24px_60px_rgba(62,18,48,0.12)] paper-grain">
        <div className="pointer-events-none absolute inset-2.5 border border-[#C9A35B]/45" />

        <div className="relative z-10 flex flex-col items-center">
          <p className="font-hindi-accent text-sm sm:text-base tracking-widest text-[#C9A35B]">
            {copy.mantra}
          </p>

          <div className="mt-4 mb-4 w-48 sm:w-56 overflow-hidden border border-[#C9A35B]/60 bg-[#E6DFC9] p-1.5 shadow-sm">
            <img
              src={ASSET_IMAGES.ganesh}
              alt="Shubh Aarambh Lord Ganesha gold line-art motif"
              referrerPolicy="no-referrer"
              className="mx-auto aspect-[4/3] w-full object-cover mix-blend-multiply"
            />
          </div>

          <h1
            id="shubh-aarambh-title"
            className="font-editorial text-3xl sm:text-5xl uppercase tracking-[0.18em] text-[#1E1E1E]"
          >
            {copy.title}
          </h1>

          <p className="mt-3 max-w-md font-editorial italic text-base sm:text-lg leading-relaxed text-[#3E1230]/85">
            {copy.subtitle}
          </p>

          {/* Animated Gathbandhan knot tying itself */}
          <div className="my-5 flex items-center justify-center" aria-hidden="true">
            <svg width="210" height="54" viewBox="0 0 210 54" fill="none">
              <motion.path
                d="M12 28 C44 10, 74 44, 105 27 C136 10, 166 44, 198 26"
                stroke="#D9482B"
                strokeWidth="3.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <motion.path
                d="M12 25 C46 42, 76 12, 105 27 C134 42, 164 12, 198 29"
                stroke="#E8A317"
                strokeWidth="2.6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="105"
                cy="27"
                r="7.5"
                fill="#D9482B"
                stroke="#C9A35B"
                strokeWidth="2"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              />
            </svg>
          </div>

          <div className="font-ui flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onEnter}
              className="rounded-full px-7 py-2.5 bg-[#181216] text-white text-[13.5px] font-medium hover:bg-[#3E1230] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A35B] whitespace-nowrap shrink-0 shadow-sm"
            >
              {copy.enterCta}
            </button>
            <button
              type="button"
              onClick={onEnter}
              className="rounded-full px-5 py-2.5 text-[13px] font-medium text-[#1E1E1E]/75 hover:text-[#1E1E1E] border border-[#1E1E1E]/15 bg-white/80 cursor-pointer whitespace-nowrap shrink-0"
            >
              {copy.skipCta}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

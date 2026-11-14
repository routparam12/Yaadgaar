import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollCircleIndicatorProps {
  activeIndex: number;
  total: number;
  onNext: () => void;
}

export const ScrollCircleIndicator: React.FC<ScrollCircleIndicatorProps> = ({
  activeIndex,
  total,
  onNext,
}) => {
  const progress = Math.min(1, Math.max(0.14, (activeIndex + 1) / total));
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <button
      type="button"
      onClick={onNext}
      aria-label={`Section ${activeIndex + 1} of ${total}. Scroll to next section`}
      className="no-print fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#F6EBDD]/95 border border-[#B5767C]/45 text-[#3E1230] shadow-md hover:scale-105 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E1230]"
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#B5767C"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#3E1230"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col items-center leading-none">
        <span className="text-[10px] font-semibold tabular-nums tracking-wider">
          0{activeIndex + 1}
        </span>
        <ChevronDown className="h-3 w-3 mt-0.5" />
      </div>
    </button>
  );
};

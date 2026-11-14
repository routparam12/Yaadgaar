import React, { useEffect, useRef, useState } from 'react';

interface SparklePoint {
  id: number;
  x: number;
  y: number;
}

export const GoldSparkleCursor: React.FC = () => {
  const [sparkles, setSparkles] = useState<SparklePoint[]>([]);
  const lastEmitRef = useRef(0);
  const counterRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastEmitRef.current < 65) return;
      lastEmitRef.current = now;
      counterRef.current += 1;
      const pt: SparklePoint = {
        id: counterRef.current,
        x: e.clientX,
        y: e.clientY,
      };
      setSparkles((prev) => [...prev.slice(-7), pt]);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  if (sparkles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
      {sparkles.map((s, idx) => (
        <span
          key={s.id}
          className="absolute block rounded-full bg-[#C9A35B]"
          style={{
            left: s.x - 3,
            top: s.y - 3,
            width: 5,
            height: 5,
            opacity: ((idx + 1) / sparkles.length) * 0.45,
            transform: `scale(${0.6 + (idx / sparkles.length) * 0.6})`,
            transition: 'opacity 320ms ease-out, transform 320ms ease-out',
          }}
        />
      ))}
    </div>
  );
};

interface MagneticDiyaButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  showDiyaOnHover?: boolean;
  variant?: 'plum' | 'orange' | 'gold' | 'outline';
  className?: string;
}

export const MagneticDiyaButton: React.FC<MagneticDiyaButtonProps> = ({
  children,
  onClick,
  showDiyaOnHover = false,
  variant = 'plum',
  className = '',
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.14;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.14;
    el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
  };

  const resetTransform = () => {
    setHovered(false);
    if (btnRef.current) {
      btnRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  };

  const baseStyles =
    variant === 'plum'
      ? 'bg-[#3E1230] text-[#FAF6F0] hover:bg-[#571A43] shadow-[0_8px_22px_rgba(62,18,48,0.20)]'
      : variant === 'orange'
        ? 'bg-[#C8431A] text-[#FAF6F0] hover:bg-[#AA3714] shadow-[0_8px_22px_rgba(200,67,26,0.22)]'
        : variant === 'gold'
          ? 'bg-[#C9A35B] text-[#3E1230] hover:bg-[#D7B36C]'
          : 'border-[1.5px] border-[#3E1230] bg-transparent text-[#3E1230] hover:bg-[#3E1230]/8';

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
      className={`font-ui inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[15px] font-medium tracking-normal transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A35B] ${baseStyles} ${className}`}
    >
      {showDiyaOnHover && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-200"
        >
          <path
            d="M4 15 C4 19, 8 21, 12 21 C16 21, 20 19, 20 15 Z"
            fill="#F5A623"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M12 4 C10.5 7, 9.5 9.5, 10.5 12 C11.2 13.5, 12.8 13.5, 13.5 12 C14.5 9.5, 13.5 7, 12 4 Z"
            fill={hovered ? '#F5A623' : 'transparent'}
            stroke={hovered ? '#F26B21' : 'currentColor'}
            strokeWidth="1.2"
            style={{
              transition: 'fill 180ms ease, transform 180ms ease',
              transformOrigin: '12px 13px',
              transform: hovered ? 'scale(1.18)' : 'scale(0.9)',
            }}
          />
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
};

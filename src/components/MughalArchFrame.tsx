import React from 'react';

interface MughalArchFrameProps {
  children: React.ReactNode;
  accentColor?: string;
  showGarlands?: boolean;
  showGathbandhan?: boolean;
  className?: string;
}

export const MughalArchFrame: React.FC<MughalArchFrameProps> = ({
  children,
  accentColor = '#D9482B',
  showGarlands = true,
  showGathbandhan = true,
  className = '',
}) => {
  return (
    <div className={`relative mx-auto w-full max-w-[440px] ${className}`}>
      {/* Outer rich-white shaadi card frame with hand-painted Mughal cusp arch & florals */}
      <div className="relative overflow-hidden bg-white border border-[#C9A35B]/45 shadow-[0_22px_50px_rgba(62,18,48,0.10)] pt-10 pb-8 px-5 sm:px-7">
        {/* Top Hanging Marigold, Jasmine & Rose Garlands */}
        {showGarlands && (
          <>
            <svg
              className="pointer-events-none absolute top-0 left-3 w-14 h-40 z-20 animate-garland"
              viewBox="0 0 56 160"
              fill="none"
              aria-hidden="true"
            >
              <line x1="28" y1="0" x2="28" y2="140" stroke="#3E7B3A" strokeWidth="1.5" />
              {[16, 36, 56, 76, 96, 116, 138].map((y, idx) => (
                <g key={y} transform={`translate(28, ${y})`}>
                  <circle
                    r={idx === 6 ? 9 : idx % 3 === 1 ? 6 : 8}
                    fill={
                      idx === 6
                        ? '#E85D75'
                        : idx % 3 === 1
                          ? '#FFFFFF'
                          : idx % 2 === 0
                            ? '#F59E0B'
                            : '#FBBF24'
                    }
                    stroke="#3E1230"
                    strokeWidth="0.9"
                  />
                  <circle r="2.6" fill="#D9482B" opacity="0.65" />
                </g>
              ))}
            </svg>
            <svg
              className="pointer-events-none absolute top-0 right-3 w-14 h-40 z-20 animate-garland"
              style={{ animationDelay: '0.8s' }}
              viewBox="0 0 56 160"
              fill="none"
              aria-hidden="true"
            >
              <line x1="28" y1="0" x2="28" y2="140" stroke="#3E7B3A" strokeWidth="1.5" />
              {[16, 36, 56, 76, 96, 116, 138].map((y, idx) => (
                <g key={y} transform={`translate(28, ${y})`}>
                  <circle
                    r={idx === 6 ? 9 : idx % 3 === 1 ? 6 : 8}
                    fill={
                      idx === 6
                        ? '#E85D75'
                        : idx % 3 === 1
                          ? '#FFFFFF'
                          : idx % 2 === 0
                            ? '#F59E0B'
                            : '#FBBF24'
                    }
                    stroke="#3E1230"
                    strokeWidth="0.9"
                  />
                  <circle r="2.6" fill="#D9482B" opacity="0.65" />
                </g>
              ))}
            </svg>
          </>
        )}

        {/* Mughal Jharokha Arch SVG Border */}
        <svg
          className="pointer-events-none absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] z-10"
          viewBox="0 0 400 500"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M200 12 C185 32, 165 30, 146 46 C125 46, 108 62, 92 78 C64 82, 42 104, 34 134 C20 144, 14 166, 14 192 L14 484 L386 484 L386 192 C386 166, 380 144, 366 134 C358 104, 336 82, 308 78 C292 62, 275 46, 254 46 C235 30, 215 32, 200 12 Z"
            stroke={accentColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M200 22 C187 40, 169 38, 152 53 C133 53, 117 68, 102 83 C76 87, 56 107, 48 136 C35 145, 29 166, 29 190 L29 472 L371 472 L371 190 C371 166, 365 145, 352 136 C344 107, 324 87, 298 83 C283 68, 267 53, 248 53 C231 38, 213 40, 200 22 Z"
            stroke="#C9A35B"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.7"
          />
        </svg>

        {/* Banana Leaves at the lower outer arch corners (Nayana & Aarav style) */}
        <svg
          className="pointer-events-none absolute bottom-3 left-0.5 w-16 h-20 z-20"
          viewBox="0 0 96 112"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 102 C10 68, 26 42, 62 30 C54 58, 36 84, 6 102 Z"
            fill="#3E7B3A"
            fillOpacity="0.88"
            stroke="#244B21"
            strokeWidth="1.2"
          />
          <path
            d="M12 106 C28 84, 52 72, 82 70 C64 90, 42 102, 12 106 Z"
            fill="#569B4E"
            fillOpacity="0.85"
            stroke="#244B21"
            strokeWidth="1.2"
          />
          <path d="M10 98 L56 36" stroke="#F6EBDD" strokeWidth="1" opacity="0.7" />
        </svg>
        <svg
          className="pointer-events-none absolute bottom-3 right-0.5 w-16 h-20 z-20 -scale-x-100"
          viewBox="0 0 96 112"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 102 C10 68, 26 42, 62 30 C54 58, 36 84, 6 102 Z"
            fill="#3E7B3A"
            fillOpacity="0.88"
            stroke="#244B21"
            strokeWidth="1.2"
          />
          <path
            d="M12 106 C28 84, 52 72, 82 70 C64 90, 42 102, 12 106 Z"
            fill="#569B4E"
            fillOpacity="0.85"
            stroke="#244B21"
            strokeWidth="1.2"
          />
          <path d="M10 98 L56 36" stroke="#F6EBDD" strokeWidth="1" opacity="0.7" />
        </svg>

        {/* Inner Arch Content */}
        <div className="relative z-10">{children}</div>

        {/* Gathbandhan Knot Motif at Base */}
        {showGathbandhan && (
          <div className="relative z-20 mt-4 flex justify-center" aria-hidden="true">
            <svg width="240" height="36" viewBox="0 0 240 36" fill="none">
              <path
                d="M10 10 C55 24, 90 24, 120 18 C150 12, 185 12, 230 26"
                stroke="#D9482B"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M10 26 C55 12, 90 12, 120 18 C150 24, 185 24, 230 10"
                stroke="#E8A317"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <circle cx="120" cy="18" r="6" fill="#D9482B" stroke="#3E1230" strokeWidth="1.2" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

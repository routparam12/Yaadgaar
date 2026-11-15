import React from 'react';

export type ArchFrameVariant =
  | 'mandap'
  | 'haldi'
  | 'archive-grid'
  | 'shaadi-card'
  | 'album'
  | 'closing';

interface MughalArchFrameProps {
  children: React.ReactNode;
  accentColor?: string;
  variant?: ArchFrameVariant;
  className?: string;
}

export const MughalArchFrame: React.FC<MughalArchFrameProps> = ({
  children,
  accentColor = '#F26B21',
  variant = 'mandap',
  className = '',
}) => {
  const isMandap = variant === 'mandap';
  const isHaldi = variant === 'haldi';
  const isArchive = variant === 'archive-grid';
  const isShaadiCard = variant === 'shaadi-card';
  const isAlbum = variant === 'album';
  const isClosing = variant === 'closing';

  // Architectural corner radii tuned so artwork borders & garlands are never sliced off
  const archRadiusClass = isMandap
    ? 'rounded-t-[44px] sm:rounded-t-[56px] rounded-b-2xl'
    : isShaadiCard
      ? 'rounded-t-[48px] sm:rounded-t-[64px] rounded-b-2xl'
      : 'rounded-2xl';

  const innerRadiusClass = isMandap
    ? 'rounded-t-[36px] sm:rounded-t-[48px] rounded-b-xl'
    : 'rounded-t-[40px] sm:rounded-t-[54px] rounded-b-xl';

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`relative w-full overflow-hidden border-[2px] shadow-[0_22px_52px_rgba(62,18,48,0.13)] ${archRadiusClass}`}
        style={{ borderColor: accentColor }}
      >
        {/* Subtle inner hairline gold rim only on true arched variants */}
        {!isArchive && !isAlbum && !isHaldi && !isClosing && (
          <div
            className={`pointer-events-none absolute inset-2 z-20 border border-[#C9A35B]/50 ${innerRadiusClass}`}
            aria-hidden="true"
          />
        )}

        {/* Variant 1: Live Mandap — compact upper corner jasmine & marigold strings */}
        {isMandap && (
          <>
            <svg
              className="pointer-events-none absolute top-1 left-2.5 w-8 h-20 z-20 opacity-90 animate-garland"
              viewBox="0 0 48 128"
              fill="none"
              aria-hidden="true"
            >
              <line x1="24" y1="0" x2="24" y2="108" stroke="#3E7B3A" strokeWidth="1.5" />
              {[20, 42, 64, 86, 106].map((y, idx) => (
                <g key={y} transform={`translate(24, ${y})`}>
                  <circle
                    r={idx === 4 ? 7.5 : idx % 2 === 1 ? 5 : 6.5}
                    fill={idx === 4 ? '#E8467C' : idx % 2 === 1 ? '#FAF6F0' : '#F26B21'}
                    stroke="#3E1230"
                    strokeWidth="0.9"
                  />
                </g>
              ))}
            </svg>
            <svg
              className="pointer-events-none absolute top-1 right-2.5 w-8 h-20 z-20 opacity-90 animate-garland"
              style={{ animationDelay: '0.7s' }}
              viewBox="0 0 48 128"
              fill="none"
              aria-hidden="true"
            >
              <line x1="24" y1="0" x2="24" y2="108" stroke="#3E7B3A" strokeWidth="1.5" />
              {[20, 42, 64, 86, 106].map((y, idx) => (
                <g key={y} transform={`translate(24, ${y})`}>
                  <circle
                    r={idx === 4 ? 7.5 : idx % 2 === 1 ? 5 : 6.5}
                    fill={idx === 4 ? '#E8467C' : idx % 2 === 1 ? '#FAF6F0' : '#F5A623'}
                    stroke="#3E1230"
                    strokeWidth="0.9"
                  />
                </g>
              ))}
            </svg>
          </>
        )}

        {/* Variant 2: Haldi — subtle corner marigold studs anchored to the outer bezel (never covering illustration) */}
        {isHaldi && (
          <>
            <svg
              className="pointer-events-none absolute top-2 left-2 w-7 h-7 z-20 drop-shadow-sm"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="32" cy="32" r="22" fill="#F5A623" stroke="#3E1230" strokeWidth="1.5" />
              <circle cx="32" cy="32" r="13" fill="#F26B21" />
              <circle cx="32" cy="32" r="5.5" fill="#FAF6F0" />
            </svg>
            <svg
              className="pointer-events-none absolute top-2 right-2 w-7 h-7 z-20 drop-shadow-sm"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="32" cy="32" r="22" fill="#F5A623" stroke="#3E1230" strokeWidth="1.5" />
              <circle cx="32" cy="32" r="13" fill="#F26B21" />
              <circle cx="32" cy="32" r="5.5" fill="#FAF6F0" />
            </svg>
          </>
        )}

        {/* Variant 4: QR Shaadi Card — delicate banana leaves framing lower corners */}
        {isShaadiCard && (
          <>
            <svg
              className="pointer-events-none absolute bottom-1.5 left-1 w-14 h-16 z-20 opacity-90"
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
                fillOpacity="0.86"
                stroke="#244B21"
                strokeWidth="1.2"
              />
            </svg>
            <svg
              className="pointer-events-none absolute bottom-1.5 right-1 w-14 h-16 z-20 opacity-90 -scale-x-100"
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
                fillOpacity="0.86"
                stroke="#244B21"
                strokeWidth="1.2"
              />
            </svg>
          </>
        )}

        {/* Arch Content */}
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    </div>
  );
};

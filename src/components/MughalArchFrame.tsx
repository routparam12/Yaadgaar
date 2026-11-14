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

  // Full-bleed arch top rounding for architectural scale (~48% width column, 680-740px tall on desktop)
  const archRadiusClass = isMandap
    ? 'rounded-t-[170px] sm:rounded-t-[230px] rounded-b-3xl'
    : isHaldi
      ? 'rounded-t-[200px] sm:rounded-t-[260px] rounded-b-3xl'
      : isArchive
        ? 'rounded-3xl'
        : isShaadiCard
          ? 'rounded-t-[180px] sm:rounded-t-[240px] rounded-b-2xl'
          : isAlbum
            ? 'rounded-2xl'
            : 'rounded-t-[210px] rounded-b-3xl';

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`relative w-full overflow-hidden border-[2px] shadow-[0_24px_60px_rgba(62,18,48,0.14)] ${archRadiusClass}`}
        style={{ borderColor: accentColor }}
      >
        {/* Subtle inner hairline gold rim on rounded arches */}
        {!isArchive && !isAlbum && (
          <div
            className={`pointer-events-none absolute inset-2 z-20 border border-[#C9A35B]/55 ${archRadiusClass}`}
            aria-hidden="true"
          />
        )}

        {/* Variant 1: Live Mandap — delicate corner jasmine & orange marigold toran */}
        {isMandap && (
          <>
            <svg
              className="pointer-events-none absolute top-0 left-5 w-12 h-32 z-20 animate-garland"
              viewBox="0 0 48 128"
              fill="none"
              aria-hidden="true"
            >
              <line x1="24" y1="0" x2="24" y2="112" stroke="#3E7B3A" strokeWidth="1.5" />
              {[18, 38, 58, 78, 98, 114].map((y, idx) => (
                <g key={y} transform={`translate(24, ${y})`}>
                  <circle
                    r={idx === 5 ? 8 : idx % 2 === 1 ? 5.5 : 7.5}
                    fill={idx === 5 ? '#E8467C' : idx % 2 === 1 ? '#FAF6F0' : '#F26B21'}
                    stroke="#3E1230"
                    strokeWidth="0.9"
                  />
                </g>
              ))}
            </svg>
            <svg
              className="pointer-events-none absolute top-0 right-5 w-12 h-32 z-20 animate-garland"
              style={{ animationDelay: '0.7s' }}
              viewBox="0 0 48 128"
              fill="none"
              aria-hidden="true"
            >
              <line x1="24" y1="0" x2="24" y2="112" stroke="#3E7B3A" strokeWidth="1.5" />
              {[18, 38, 58, 78, 98, 114].map((y, idx) => (
                <g key={y} transform={`translate(24, ${y})`}>
                  <circle
                    r={idx === 5 ? 8 : idx % 2 === 1 ? 5.5 : 7.5}
                    fill={idx === 5 ? '#E8467C' : idx % 2 === 1 ? '#FAF6F0' : '#F5A623'}
                    stroke="#3E1230"
                    strokeWidth="0.9"
                  />
                </g>
              ))}
            </svg>
          </>
        )}

        {/* Variant 2: Haldi — sunlit marigold corner medallions (distinct from dangling strings) */}
        {isHaldi && (
          <>
            <svg
              className="pointer-events-none absolute top-4 left-4 w-16 h-16 z-20"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="32" cy="32" r="22" fill="#F5A623" fillOpacity="0.92" stroke="#3E1230" strokeWidth="1.2" />
              <circle cx="32" cy="32" r="14" fill="#F26B21" fillOpacity="0.7" />
              <circle cx="32" cy="32" r="6" fill="#FAF6F0" />
            </svg>
            <svg
              className="pointer-events-none absolute top-4 right-4 w-16 h-16 z-20"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="32" cy="32" r="22" fill="#F5A623" fillOpacity="0.92" stroke="#3E1230" strokeWidth="1.2" />
              <circle cx="32" cy="32" r="14" fill="#F26B21" fillOpacity="0.7" />
              <circle cx="32" cy="32" r="6" fill="#FAF6F0" />
            </svg>
          </>
        )}

        {/* Variant 4: QR Shaadi Card — fresh banana leaves framing the card corners */}
        {isShaadiCard && (
          <>
            <svg
              className="pointer-events-none absolute bottom-2 left-1 w-20 h-24 z-20"
              viewBox="0 0 96 112"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 102 C10 68, 26 42, 62 30 C54 58, 36 84, 6 102 Z"
                fill="#3E7B3A"
                fillOpacity="0.9"
                stroke="#244B21"
                strokeWidth="1.2"
              />
              <path
                d="M12 106 C28 84, 52 72, 82 70 C64 90, 42 102, 12 106 Z"
                fill="#569B4E"
                fillOpacity="0.88"
                stroke="#244B21"
                strokeWidth="1.2"
              />
            </svg>
            <svg
              className="pointer-events-none absolute bottom-2 right-1 w-20 h-24 z-20 -scale-x-100"
              viewBox="0 0 96 112"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 102 C10 68, 26 42, 62 30 C54 58, 36 84, 6 102 Z"
                fill="#3E7B3A"
                fillOpacity="0.9"
                stroke="#244B21"
                strokeWidth="1.2"
              />
              <path
                d="M12 106 C28 84, 52 72, 82 70 C64 90, 42 102, 12 106 Z"
                fill="#569B4E"
                fillOpacity="0.88"
                stroke="#244B21"
                strokeWidth="1.2"
              />
            </svg>
          </>
        )}

        {/* Variant 6: Closing — subtle temple lotus apex filigree */}
        {isClosing && (
          <svg
            className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 w-20 h-10 z-20"
            viewBox="0 0 80 40"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M40 4 C33 16, 33 28, 40 34 C47 28, 47 16, 40 4 Z"
              fill="#C9A35B"
              stroke="#3E1230"
              strokeWidth="1"
            />
            <path
              d="M40 34 C28 30, 18 22, 14 14 C24 14, 34 20, 40 34 Z"
              fill="#F26B21"
              fillOpacity="0.85"
              stroke="#3E1230"
              strokeWidth="1"
            />
            <path
              d="M40 34 C52 30, 62 22, 66 14 C56 14, 46 20, 40 34 Z"
              fill="#F26B21"
              fillOpacity="0.85"
              stroke="#3E1230"
              strokeWidth="1"
            />
          </svg>
        )}

        {/* Full-bleed Arch Content */}
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    </div>
  );
};

import React from 'react';

interface YarnHeartLogoProps {
  size?: number;
  className?: string;
}

export const YarnHeartLogo: React.FC<YarnHeartLogoProps> = ({
  size = 38,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#3E1230" />
      {/* Heart yarn silhouette */}
      <path
        d="M32 45 C20 39 12.5 31 12.5 22 C12.5 16 17.5 11.5 23 11.5 C27 11.5 30 14 32 18 C34 14 37 11.5 41 11.5 C46.5 11.5 51.5 16 51.5 22 C51.5 31 44 39 32 45 Z"
        stroke="#F6EBDD"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Woven yarn strands forming the knot of love */}
      <path
        d="M15.5 19.5 Q27 23.5 37.5 13.5"
        stroke="#F6EBDD"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M14 25 Q29.5 29.5 45.5 16"
        stroke="#F6EBDD"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M17.5 31.5 Q33 33.5 49 21.5"
        stroke="#F6EBDD"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M23 38 Q36 37.5 48 28.5"
        stroke="#F6EBDD"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M21 15.5 Q31 24.5 25.5 40.5"
        stroke="#F6EBDD"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M35.5 16 Q42 26 32.5 43"
        stroke="#F6EBDD"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Unraveling trailing thread */}
      <path
        d="M27 44 C17.5 48.5 15.5 55.5 26 55.5 C38 55.5 46.5 47 52.5 45.5 C56.5 44.5 56.5 50 52 52"
        stroke="#F6EBDD"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

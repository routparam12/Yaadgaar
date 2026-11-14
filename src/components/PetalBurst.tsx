import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  color: string;
  size: number;
}

interface PetalBurstProps {
  triggerKey: number;
}

const PETAL_COLORS = ['#E8A317', '#D9482B', '#B5767C', '#C9A35B', '#F2B84B'];

export const PetalBurst: React.FC<PetalBurstProps> = ({ triggerKey }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (triggerKey <= 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const generated: Petal[] = Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const speed = 70 + (i % 5) * 28;
      return {
        id: triggerKey * 100 + i,
        x: 50,
        y: 45,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed - 35,
        rot: (i * 37) % 360,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
        size: 8 + (i % 4) * 3,
      };
    });
    setPetals(generated);
    const timer = window.setTimeout(() => setPetals([]), 1150);
    return () => window.clearTimeout(timer);
  }, [triggerKey]);

  if (petals.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute block rounded-full transition-all duration-1000 ease-out"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.45}px`,
            backgroundColor: p.color,
            borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
            transform: `translate(${p.dx}px, ${p.dy}px) rotate(${p.rot}deg)`,
            opacity: 0,
            animation: 'petalBurstOut 1.05s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            ['--dx' as string]: `${p.dx}px`,
            ['--dy' as string]: `${p.dy}px`,
            ['--rot' as string]: `${p.rot}deg`,
          }}
        />
      ))}
      <style>{`
        @keyframes petalBurstOut {
          0% { transform: translate(0, 0) rotate(0deg) scale(0.7); opacity: 1; }
          75% { opacity: 0.9; }
          100% { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(1.1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

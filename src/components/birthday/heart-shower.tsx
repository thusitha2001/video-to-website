import type { CSSProperties } from 'react';

const HEART_COUNT = 46;
const HEART_PATH = 'M50 88C22 66 6 50 6 31 6 17 17 7 30 7c9 0 16 5 20 12 4-7 11-12 20-12 13 0 24 10 24 24 0 19-16 35-44 57Z';
const PALETTES = [
  ['oklch(.86 .1 8)', 'oklch(.68 .19 10)', 'oklch(.48 .17 12)'],
  ['oklch(.9 .07 350)', 'oklch(.74 .15 355)', 'oklch(.55 .16 358)'],
  ['oklch(.84 .13 20)', 'oklch(.64 .21 22)', 'oklch(.44 .17 22)'],
];

const seeded = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const hearts = Array.from({ length: HEART_COUNT }, (_, i) => {
  const depth = seeded(i + 1);
  return {
    left: seeded(i + 11) * 100,
    size: 18 + depth * 34,
    delay: seeded(i + 21) * 4.5,
    fall: 6.5 - depth * 2.2,
    spin: 1.6 + seeded(i + 31) * 2.4,
    sway: 20 + seeded(i + 41) * 50,
    tilt: -30 + seeded(i + 51) * 60,
    blur: depth < 0.25 ? 1.2 : 0,
    opacity: 0.55 + depth * 0.45,
    palette: i % PALETTES.length,
  };
});

export function HeartShower() {
  return (
    <div className="heart-shower" aria-hidden="true">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {PALETTES.map(([light, mid, dark], p) => (
            <radialGradient id={`heart-gloss-${p}`} key={p} cx="32%" cy="28%" r="78%">
              <stop offset="0%" stopColor="oklch(.98 .02 10)" />
              <stop offset="18%" stopColor={light} />
              <stop offset="62%" stopColor={mid} />
              <stop offset="100%" stopColor={dark} />
            </radialGradient>
          ))}
        </defs>
      </svg>
      {hearts.map((h, i) => (
        <span
          className="shower-heart"
          key={i}
          style={
            {
              left: `${h.left}%`,
              width: `${h.size}px`,
              opacity: h.opacity,
              filter: h.blur ? `blur(${h.blur}px)` : undefined,
              animationDuration: `${h.fall}s`,
              animationDelay: `${h.delay}s`,
              '--sway': `${h.sway}px`,
            } as CSSProperties
          }
        >
          <span
            className="shower-heart-spin"
            style={{ animationDuration: `${h.spin}s`, animationDelay: `${h.delay}s`, '--tilt': `${h.tilt}deg` } as CSSProperties}
          >
            <svg viewBox="0 0 100 95">
              <path d={HEART_PATH} fill={`url(#heart-gloss-${h.palette})`} />
              <ellipse cx="31" cy="27" rx="10" ry="6" fill="oklch(1 0 0 / .55)" transform="rotate(-35 31 27)" />
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
}

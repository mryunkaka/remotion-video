import React from 'react';
import {rnd} from '../lib';

// Realistic-proportion swordfish (Xiphias gladius), side view facing LEFT. viewBox 1000x300
export const Swordfish: React.FC<{id?: string; w?: number; t: number; wound?: number; glow?: number; open?: number}> = ({id = 'sf', w = 1000, t, wound = 0, glow = 0}) => {
  const tail = Math.sin(t * 3.4) * 9; const body = Math.sin(t * 3.4 - 1.2) * 3;
  return (
    <svg width={w} height={w * 0.3} viewBox="0 0 1000 300" style={{overflow: 'visible'}}>
      <defs>
        <linearGradient id={id + 'b'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#07192b" /><stop offset="0.38" stopColor="#173f5c" /><stop offset="0.55" stopColor="#5d8aa0" /><stop offset="0.72" stopColor="#b7cfd6" /><stop offset="1" stopColor="#e6f0f1" /></linearGradient>
        <linearGradient id={id + 'f'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0a2238" /><stop offset="1" stopColor="#2a5a78" /></linearGradient>
        <linearGradient id={id + 'h'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.5" stopColor="#cfe8f0" stopOpacity="0.28" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <pattern id={id + 's'} width="22" height="16" patternUnits="userSpaceOnUse"><path d="M0,16 Q11,2 22,16" fill="none" stroke="#06131f" strokeOpacity="0.22" strokeWidth="1.6" /></pattern>
        <radialGradient id={id + 'g'}><stop offset="0" stopColor="#ffd9a0" stopOpacity={glow} /><stop offset="1" stopColor="#ffd9a0" stopOpacity="0" /></radialGradient>
      </defs>
      <g transform={`translate(0,${150}) rotate(${body} 500 0) translate(0,-150)`}>
        {/* bill */}
        <path d="M6,128 L262,116 L262,150 Z" fill="#26323d" />
        <path d="M6,128 L262,116 L262,124 Z" fill="#5a7080" opacity="0.7" />
        {/* second dorsal + anal fins */}
        <path d="M690,100 C705,70 730,62 748,70 C735,80 725,92 722,104 Z" fill={`url(#${id}f)`} />
        <path d="M680,178 C695,205 720,214 738,208 C725,198 715,188 712,176 Z" fill={`url(#${id}f)`} />
        {/* body */}
        <path d="M262,116 C310,96 372,78 462,72 C600,66 722,92 806,124 L806,138 C724,170 600,196 462,190 C372,186 310,170 262,150 Z" fill={`url(#${id}b)`} />
        <path d="M262,116 C310,96 372,78 462,72 C600,66 722,92 806,124 L806,138 C724,170 600,196 462,190 C372,186 310,170 262,150 Z" fill={`url(#${id}s)`} />
        <path d="M300,128 C420,104 600,110 790,132" fill="none" stroke={`url(#${id}h)`} strokeWidth="14" />
        {/* first dorsal sail */}
        <path d="M392,82 C440,8 548,-6 640,44 C598,50 548,60 500,78 Z" fill={`url(#${id}f)`} />
        <path d="M430,70 C470,22 540,10 600,36" fill="none" stroke="#7fb0c8" strokeOpacity="0.35" strokeWidth="2" />
        {/* pectoral fin */}
        <path d="M410,176 C420,226 452,262 508,282 C500,244 486,214 470,184 Z" fill={`url(#${id}f)`} />
        {/* pelvic */}
        <path d="M520,186 C530,214 546,232 566,242 C562,220 556,204 548,190 Z" fill={`url(#${id}f)`} opacity="0.9" />
        {/* gill & eye */}
        <path d="M330,98 C346,120 346,146 328,172" fill="none" stroke="#06131f" strokeOpacity="0.5" strokeWidth="3" />
        <circle cx="292" cy="130" r="13" fill="#0a0f14" /><circle cx="292" cy="130" r="13" fill="none" stroke="#b9a15a" strokeWidth="2.5" /><circle cx="287" cy="125" r="3.6" fill="#fff" opacity="0.85" />
        {/* wound marks (non-graphic) */}
        {wound > 0 && <g opacity={wound}><path d="M470,120 l26,14 M500,112 l18,18 M444,140 l22,12" stroke="#5a1d1a" strokeWidth="3" strokeLinecap="round" opacity="0.7" /></g>}
        {glow > 0 && <ellipse cx="480" cy="135" rx="180" ry="90" fill={`url(#${id}g)`} />}
        {/* tail */}
        <g transform={`rotate(${tail} 800 131)`}>
          <path d="M800,125 C850,92 916,44 984,2 C966,58 950,100 944,131 C950,162 966,204 984,262 C916,222 850,172 800,138 Z" fill={`url(#${id}f)`} />
          <path d="M800,127 L944,131" stroke="#0a2238" strokeWidth="2" opacity="0.5" />
        </g>
      </g>
    </svg>
  );
};
export const SmallFish: React.FC<{s?: number; color?: string; o?: number; flip?: boolean; t?: number}> = ({s = 1, color = '#a9c7d1', o = 0.8, flip, t = 0}) => (
  <svg width={56 * s} height={20 * s} viewBox="0 0 56 20" style={{transform: flip ? 'scaleX(-1)' : undefined, opacity: o, overflow: 'visible'}}>
    <path d="M0,10 Q16,0 40,10 Q16,20 0,10 Z" fill={color} />
    <path d="M40,10 L55,1 L55,19 Z" fill={color} transform={`rotate(${Math.sin(t * 9) * 12} 40 10)`} />
    <circle cx="8" cy="9" r="1.2" fill="#0a1a24" />
  </svg>
);
export const Jelly: React.FC<{t: number; s?: number; hue?: string; seed?: number}> = ({t, s = 1, hue = '170,235,245', seed = 1}) => {
  const p = Math.sin(t * 2 + seed) * 0.08;
  return (
    <svg width={140 * s} height={260 * s} viewBox="0 0 140 260" style={{overflow: 'visible'}}>
      <defs><radialGradient id={'jg' + seed} cx="0.5" cy="0.8"><stop offset="0" stopColor={`rgba(${hue},0.05)`} /><stop offset="1" stopColor={`rgba(${hue},0.55)`} /></radialGradient></defs>
      {Array.from({length: 6}).map((_, i) => (<path key={i} d={`M${30 + i * 16},80 q${Math.sin(t * 2.4 + i + seed) * 10},40 ${Math.sin(t * 2 + i * 2) * 8},90 t${Math.sin(t * 2.2 + i) * 10},80`} stroke={`rgba(${hue},0.5)`} strokeWidth="2.2" fill="none" />))}
      <path d={`M10,80 C10,${10 - p * 60} 130,${10 - p * 60} 130,80 C110,92 30,92 10,80 Z`} fill={`url(#jg${seed})`} stroke={`rgba(${hue},0.7)`} strokeWidth="1.5" />
    </svg>
  );
};
export const Manta: React.FC<{t: number; s?: number}> = ({t, s = 1}) => {
  const f = Math.sin(t * 1.6) * 14;
  return (
    <svg width={600 * s} height={170 * s} viewBox="0 0 600 170" style={{overflow: 'visible'}}>
      <path d={`M300,10 C250,${-20 + f} 150,${-30 + f * 2} 10,${-10 + f * 3} C100,${30 + f} 170,50 260,70 L300,165 L340,70 C430,50 500,${30 + f} 590,${-10 + f * 3} C450,${-30 + f * 2} 350,${-20 + f} 300,10 Z`} fill="#0d2d40" opacity="0.92" />
      <path d="M300,20 L300,150" stroke="#3b6e86" strokeOpacity="0.4" strokeWidth="3" />
    </svg>
  );
};

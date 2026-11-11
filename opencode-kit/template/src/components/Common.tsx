import React from 'react';
import {W, H, C, lerp, rnd, prog, ease, easeOut} from '../lib';
import {F} from '../fonts';

export const Wrap: React.FC<{children: React.ReactNode; bg?: string}> = ({children, bg = '#02070d'}) => (<div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: bg}}>{children}</div>);
export const Cam: React.FC<{x?: number; y?: number; s?: number; r?: number; ox?: number; oy?: number; children: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, ox = W / 2, oy = H / 2, children}) => (
  <div style={{position: 'absolute', inset: 0, transformOrigin: `${ox}px ${oy}px`, transform: `translate(${x}px,${y}px) scale(${s}) rotate(${r}deg)`}}>{children}</div>
);
export const Abs: React.FC<{x: number; y: number; children: React.ReactNode; s?: number; r?: number; o?: number; ox?: string; style?: React.CSSProperties}> = ({x, y, children, s = 1, r = 0, o = 1, ox = '50% 100%', style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-100%) rotate(${r}deg) scale(${s})`, transformOrigin: ox, opacity: o, ...style}}>{children}</div>
);
export const Center: React.FC<{x: number; y: number; children: React.ReactNode; s?: number; r?: number; o?: number; style?: React.CSSProperties}> = ({x, y, children, s = 1, r = 0, o = 1, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${r}deg) scale(${s})`, opacity: o, ...style}}>{children}</div>
);
export const Rock: React.FC<{w?: number; flip?: boolean; lit?: string}> = ({w = 760, flip, lit = 'rgba(255,200,140,0.5)'}) => (
  <svg width={w} height={w * 0.6} viewBox="0 0 700 420" style={{overflow: 'visible', transform: flip ? 'scaleY(-1)' : undefined}}>
    <defs><linearGradient id="rk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a3a42" /><stop offset="0.5" stopColor="#10191f" /><stop offset="1" stopColor="#05090d" /></linearGradient></defs>
    <path d="M0,420 L30,330 L70,300 L110,240 L160,214 L200,150 L260,126 L330,150 L380,134 L430,176 L480,214 L526,262 L590,292 L650,352 L700,420 Z" fill="url(#rk)" />
    <path d="M110,240 L160,214 L200,150 L260,126 M260,126 L330,150 L380,134 M30,330 L70,300 L110,240" stroke={lit} strokeWidth="5" fill="none" strokeLinejoin="round" />
    <path d="M200,150 L230,230 L180,300 M330,150 L350,250 L300,330 M430,176 L440,260 L400,340" stroke="#000" strokeOpacity="0.45" strokeWidth="4" fill="none" />
    <path d="M0,420 Q80,400 160,414 T330,410 T520,414 T700,410 L700,430 L0,430 Z" fill="rgba(235,248,250,0.35)" />
  </svg>
);
// Island with jungle ridge silhouettes
export const Island: React.FC<{w?: number; c1?: string; c2?: string; c3?: string; lit?: string; mist?: number}> = ({w = 1000, c1 = '#2d5a62', c2 = '#173f46', c3 = '#0a2328', lit = 'rgba(255,214,150,0.55)', mist = 0.5}) => {
  const ridge = (seed: number, base: number, amp: number, x0: number, x1: number) => { let d = `M${x0},${base}`; for (let x = x0; x <= x1; x += 18) { const u = (x - x0) / (x1 - x0); const env = Math.sin(u * Math.PI) ** 0.8; d += ` L${x},${(base - env * amp - (rnd(Math.floor(x / 18), seed) * 26 + Math.sin(x * 0.03 + seed) * 16) * Math.min(1, env * 2)).toFixed(1)}`; } return d + ` L${x1},${base} Z`; };
  return (
    <svg width={w} height={w * 0.6} viewBox="0 0 1000 600" style={{overflow: 'visible'}}>
      <path d={ridge(1, 600, 430, 30, 970)} fill={c1} /><path d={ridge(2, 600, 330, 0, 820)} fill={c2} /><path d={ridge(3, 600, 220, 160, 1000)} fill={c3} />
      <path d={ridge(1, 600, 430, 30, 970).replace(/ L970,600 Z$/, '')} fill="none" stroke={lit} strokeWidth="4" />
      <rect x="0" y="470" width="1000" height="140" fill={`rgba(220,236,240,${mist})`} opacity="0.0" />
    </svg>
  );
};
export const Boat: React.FC<{s?: number; t: number; seed?: number}> = ({s = 1, t, seed = 0}) => (
  <svg width={120 * s} height={110 * s} viewBox="0 0 120 110" style={{overflow: 'visible', transform: `rotate(${Math.sin(t * 1.3 + seed) * 2.4}deg)`}}>
    <path d="M8,84 L112,84 L98,100 L22,100 Z" fill="#0b1820" /><path d="M60,10 L60,84 M60,12 L102,78 L60,78 Z" stroke="#0b1820" strokeWidth="3" fill="#0f232d" />
    <path d="M60,12 L102,78" stroke="rgba(255,200,130,0.8)" strokeWidth="2" fill="none" />
  </svg>
);
export const Moon: React.FC<{x: number; y: number; r?: number}> = ({x, y, r = 120}) => (
  <div style={{position: 'absolute', left: x - r * 4, top: y - r * 4, width: r * 8, height: r * 8, background: 'radial-gradient(circle, rgba(255,246,220,1) 0, rgba(255,246,220,1) 12%, rgba(255,240,200,0.5) 13%, rgba(190,215,235,0.18) 30%, rgba(0,0,0,0) 62%)', borderRadius: '50%'}} />
);
export const Stars: React.FC<{t: number; n?: number; h?: number}> = ({t, n = 90, h = 900}) => (
  <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>{Array.from({length: n}).map((_, i) => (<circle key={i} cx={rnd(i, 9) * W} cy={rnd(i, 10) * h} r={0.8 + rnd(i, 11) * 2} fill="#eaf2ff" opacity={0.3 + 0.6 * Math.abs(Math.sin(t * (0.6 + rnd(i, 12)) + i))} />))}</svg>
);
export const Tag: React.FC<{text: string; y?: number; o?: number}> = ({text, y = 1568, o = 0.6}) => (<div style={{position: 'absolute', left: 0, right: 0, top: y, textAlign: 'center', fontFamily: F.sans, fontWeight: 500, fontSize: 21, letterSpacing: '0.22em', color: C.white, opacity: o, textShadow: '0 2px 8px #000'}}>{text}</div>);
export const Bubbles: React.FC<{t: number; n?: number; x0?: number; y0?: number; spread?: number; seed?: number; o?: number}> = ({t, n = 26, x0 = 540, y0 = 1500, spread = 360, seed = 1, o = 0.6}) => (
  <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>{Array.from({length: n}).map((_, i) => { const sp = 120 + rnd(i, seed) * 220; const y = y0 - ((t * sp + rnd(i, seed + 1) * 2000) % 2200); const x = x0 + (rnd(i, seed + 2) - 0.5) * spread + Math.sin(t * 2 + i) * 14; const r = 3 + rnd(i, seed + 3) * 11; return <circle key={i} cx={x} cy={y} r={r} fill="rgba(220,245,250,0.08)" stroke="rgba(235,250,252,0.7)" strokeWidth="1.6" opacity={o} />; })}</svg>
);

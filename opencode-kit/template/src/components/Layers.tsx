import React from 'react';
import {Img, staticFile} from 'remotion';
import {W, H, rnd, lerp, clamp} from '../lib';
const tex = (n: string) => staticFile('images/textures/' + n);

export const Sky: React.FC<{t: number; top: string; mid: string; bottom: string; sunX?: number; sunY?: number; sunR?: number; sun?: string; sunA?: number; clouds?: number; cloudY?: number; cloudSpeed?: number; cloudTint?: string; horizon?: number}> = ({t, top, mid, bottom, sunX = 540, sunY = 700, sunR = 520, sun = 'rgba(255,217,160,0.55)', sunA = 1, clouds = 0.6, cloudY = 100, cloudSpeed = 14, cloudTint = 'rgba(255,255,255,1)', horizon = 1000}) => (
  <div style={{position: 'absolute', inset: 0}}>
    <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${top} 0%, ${mid} ${Math.round(horizon / H * 55)}%, ${bottom} ${Math.round(horizon / H * 100)}%)`}} />
    <div style={{position: 'absolute', left: sunX - sunR, top: sunY - sunR, width: sunR * 2, height: sunR * 2, borderRadius: '50%', background: `radial-gradient(circle, ${sun} 0%, rgba(0,0,0,0) 68%)`, opacity: sunA}} />
    <div style={{position: 'absolute', left: 0, top: cloudY, width: W, height: 640, backgroundImage: `url(${tex('clouds.png')})`, backgroundSize: '2048px 512px', backgroundRepeat: 'repeat-x', backgroundPosition: `${-t * cloudSpeed}px 0`, opacity: clouds, filter: 'none', WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 25%, #000 70%, transparent)'}} />
    <div style={{position: 'absolute', left: 0, top: cloudY + 260, width: W, height: 640, backgroundImage: `url(${tex('clouds.png')})`, backgroundSize: '3072px 768px', backgroundRepeat: 'repeat-x', backgroundPosition: `${-t * cloudSpeed * 1.7 - 400}px 0`, opacity: clouds * 0.7, mixBlendMode: 'screen', WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 30%, #000 60%, transparent)'}} />
  </div>
);

const wavePath = (y0: number, A: number, wl: number, spd: number, ph: number, t: number) => {
  let d = `M-20,${H + 20}`; const k = (Math.PI * 2) / wl;
  for (let x = -20; x <= W + 20; x += 30) {
    const y = y0 + A * Math.sin(x * k + t * spd + ph) + A * 0.45 * Math.sin(x * k * 2.3 - t * spd * 1.3 + ph * 2) + A * 0.2 * Math.sin(x * k * 4.1 + t * spd * 0.7);
    d += ` L${x},${y.toFixed(1)}`;
  }
  return d + ` L${W + 20},${H + 20} Z`;
};
export const Sea: React.FC<{t: number; horizon: number; far: string; near: string; crest?: string; amp?: number; speed?: number; sunX?: number; glint?: number; glintColor?: string; id?: string; bands?: number}> = ({t, horizon, far, near, crest = 'rgba(255,255,255,0.14)', amp = 1, speed = 1, sunX = 540, glint = 0.5, glintColor = 'rgba(255,225,170,0.9)', id = 's', bands = 9}) => {
  const els: React.ReactNode[] = [];
  for (let i = 0; i < bands; i++) {
    const q = i / (bands - 1); const y0 = horizon + (H - horizon) * Math.pow(q, 1.7);
    const A = amp * (3 + 52 * Math.pow(q, 1.5)); const wl = 120 + 520 * Math.pow(q, 1.1) + i * 12;
    const d = wavePath(y0, A, wl, speed * (0.7 + q * 0.9), i * 1.7, t);
    els.push(<path key={'w' + i} d={d} fill={`url(#${id}g${i})`} />);
    els.push(<path key={'c' + i} d={d.replace(/ L-?\d+(\.\d+)?,\d+ Z$/, '').replace(/^M-20,\d+ /, 'M')} fill="none" stroke={crest} strokeWidth={1 + q * 3} />);
  }
  const gl: React.ReactNode[] = [];
  for (let i = 0; i < 46; i++) {
    const q = Math.pow(rnd(i, 3), 1.4); const y = horizon + 14 + q * (H - horizon) * 0.45;
    const spread = 40 + q * 300; const x = sunX + (rnd(i, 5) - 0.5) * 2 * spread;
    const o = glint * Math.max(0, Math.sin(t * (1.5 + rnd(i, 7) * 2) + i * 2.1)) * (1 - q * 0.6);
    gl.push(<rect key={'g' + i} x={x} y={y} width={14 + q * 90} height={2 + q * 4} rx={2} fill={glintColor} opacity={o} />);
  }
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <defs>
        {Array.from({length: bands}).map((_, i) => {
          const q = i / (bands - 1);
          return <linearGradient key={i} id={`${id}g${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={far} stopOpacity={0.25 + 0.75 * q} /><stop offset="1" stopColor={near} stopOpacity={1} /></linearGradient>;
        })}
        <linearGradient id={id + 'base'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={far} /><stop offset="1" stopColor={near} /></linearGradient>
      </defs>
      <rect x={0} y={horizon} width={W} height={H - horizon} fill={`url(#${id}base)`} />
      {els}{gl}
    </svg>
  );
};
export const Fog: React.FC<{t: number; y: number; h?: number; o?: number; speed?: number; tint?: string; size?: number}> = ({t, y, h = 360, o = 0.5, speed = 10, tint, size = 2048}) => (
  <div style={{position: 'absolute', left: 0, top: y, width: W, height: h, backgroundImage: `url(${tex('fog.png')})`, backgroundSize: `${size}px ${h}px`, backgroundRepeat: 'repeat-x', backgroundPosition: `${-t * speed}px 0`, opacity: o, WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 40%, #000 60%, transparent)', filter: tint ? `drop-shadow(0 0 0 ${tint})` : undefined}} />
);
export const Rays: React.FC<{t: number; x: number; y: number; n?: number; color?: string; o?: number; spread?: number; len?: number; tilt?: number}> = ({t, x, y, n = 7, color = '255,236,190', o = 0.35, spread = 1100, len = 2200, tilt = 0}) => (
  <svg width={W} height={H} style={{position: 'absolute', inset: 0, mixBlendMode: 'screen'}}>
    <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={`rgb(${color})`} stopOpacity={1} /><stop offset="1" stopColor={`rgb(${color})`} stopOpacity={0} /></linearGradient></defs>
    {Array.from({length: n}).map((_, i) => {
      const a = (i / (n - 1) - 0.5) * spread + tilt + Math.sin(t * 0.35 + i * 1.7) * 40; const w = 40 + rnd(i, 2) * 110;
      const op = o * (0.45 + 0.55 * Math.sin(t * 0.6 + i * 2.3) ** 2);
      return <polygon key={i} points={`${x - w * 0.15},${y - 600} ${x + w * 0.15},${y - 600} ${x + a + w * 2.2},${y + len} ${x + a - w * 2.2},${y + len}`} fill="url(#rg)" opacity={op} />;
    })}
  </svg>
);
export const Deep: React.FC<{t: number; top?: string; mid?: string; bottom?: string; rays?: number; caustic?: number; snow?: number; rayX?: number; light?: number}> = ({t, top = '#1d7f8c', mid = '#0a3a52', bottom = '#030d18', rays = 0.35, caustic = 0.25, snow = 60, rayX = 540, light = 1}) => (
  <div style={{position: 'absolute', inset: 0}}>
    <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${top} 0%, ${mid} 45%, ${bottom} 100%)`}} />
    {rays > 0 && <Rays t={t} x={rayX} y={-120} n={8} o={rays * light} spread={1400} len={2300} color="170,235,240" />}
    <div style={{position: 'absolute', left: 0, top: 0, width: W, height: 900, backgroundImage: `url(${tex('caustics.png')})`, backgroundSize: '900px 900px', backgroundPosition: `${t * 24}px ${t * 10}px`, opacity: caustic * light, mixBlendMode: 'screen', WebkitMaskImage: 'linear-gradient(180deg,#000,transparent)'}} />
    {Array.from({length: snow}).map((_, i) => {
      const x = (rnd(i, 1) * W + Math.sin(t * 0.4 + i) * 20 + t * 6 * (rnd(i, 4) - 0.3)) % W; const y = ((rnd(i, 2) * H - t * (10 + rnd(i, 3) * 26)) % H + H) % H; const s = 2 + rnd(i, 5) * 5;
      return <div key={i} style={{position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%', background: 'rgba(210,240,245,0.55)', opacity: 0.2 + 0.5 * rnd(i, 6)}} />;
    })}
  </div>
);
export const Vignette: React.FC<{o?: number}> = ({o = 0.7}) => (<div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 46%, rgba(0,0,0,0) 38%, rgba(2,8,14,${o}) 100%)`}} />);
export const Grade: React.FC<{c?: string; o?: number}> = ({c = 'rgba(8,40,60,1)', o = 0.18}) => (<div style={{position: 'absolute', inset: 0, background: c, opacity: o, mixBlendMode: 'soft-light'}} />);
export const Grain: React.FC<{f: number; o?: number}> = ({f, o = 0.07}) => (<div style={{position: 'absolute', inset: -64, backgroundImage: `url(${tex('grain.png')})`, backgroundSize: '512px 512px', backgroundPosition: `${(f * 97) % 512}px ${(f * 61) % 512}px`, opacity: o, mixBlendMode: 'overlay'}} />);
export const Letterbox: React.FC = () => null;
// Concentric foam rings around an object
export const Rings: React.FC<{t: number; x: number; y: number; w?: number; n?: number; period?: number; o?: number}> = ({t, x, y, w = 420, n = 3, period = 3.2, o = 0.5}) => (
  <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
    {Array.from({length: n}).map((_, i) => { const p = ((t / period + i / n) % 1); return <ellipse key={i} cx={x} cy={y} rx={w * (0.4 + p * 1.1)} ry={w * 0.11 * (0.4 + p * 1.1)} fill="none" stroke="rgba(235,248,250,1)" strokeWidth={3 * (1 - p) + 0.5} opacity={o * (1 - p) * Math.min(1, p * 6)} />; })}
  </svg>
);
// Ballistic splash
export const Splash: React.FC<{t: number; t0: number; x: number; y: number; scale?: number; n?: number; seed?: number; slow?: number}> = ({t, t0, x, y, scale = 1, n = 40, seed = 1, slow = 1}) => {
  const dt = (t - t0) * slow; if (dt < 0 || dt > 2.6) return null;
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <ellipse cx={x} cy={y + 6} rx={(40 + dt * 380) * scale} ry={(8 + dt * 60) * scale} fill="none" stroke="rgba(240,250,252,0.8)" strokeWidth={Math.max(0.5, 6 - dt * 5)} opacity={Math.max(0, 1 - dt * 0.9)} />
      {Array.from({length: n}).map((_, i) => {
        const a = (rnd(i, seed) - 0.5) * 1.5; const sp = (380 + rnd(i, seed + 1) * 900) * scale; const vx = Math.sin(a) * sp * 0.7; const vy = -Math.cos(a) * sp;
        const px = x + vx * dt; const py = y + vy * dt + 0.5 * 1500 * scale * dt * dt; const o = Math.max(0, 1 - dt / (1.2 + rnd(i, seed + 2)));
        const r = (3 + rnd(i, seed + 3) * 9) * scale * (1 - dt * 0.25);
        return <ellipse key={i} cx={px} cy={py} rx={r} ry={r * 1.5} transform={`rotate(${Math.atan2(vy + 1500 * scale * dt, vx) * 57.3 + 90} ${px} ${py})`} fill="rgba(245,252,255,0.9)" opacity={o} />;
      })}
      <path d={`M${x - 70 * scale},${y} Q${x},${y - (260 * Math.sin(Math.min(1, dt * 2.2) * Math.PI * 0.9)) * scale} ${x + 70 * scale},${y} Z`} fill="rgba(235,248,252,0.55)" opacity={Math.max(0, 1 - dt * 1.3)} />
    </svg>
  );
};

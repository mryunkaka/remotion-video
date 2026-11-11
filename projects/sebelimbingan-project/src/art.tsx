import React from 'react';

export const W = 1080;
export const H = 1920;

export const prng = (seed: number) => {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
};

export type Pal = {top: string; mid: string; bot: string; sun: string; far: string; mid2: string; near: string; ground: string};
export const PAL = {
  dusk: {top: '#2b3a55', mid: '#c98a5a', bot: '#f2c48a', sun: '#ffe2a8', far: '#5f6f7a', mid2: '#37503f', near: '#1c2d24', ground: '#3b3226'},
  gold: {top: '#3a4a5e', mid: '#d9a066', bot: '#f6d9a0', sun: '#fff0c4', far: '#6c7c80', mid2: '#40583f', near: '#22362a', ground: '#4a3b2a'},
  smoke: {top: '#3b4048', mid: '#8a7a6a', bot: '#c9b79b', sun: '#e8d7b0', far: '#6a6f72', mid2: '#3d4a3d', near: '#1f2a22', ground: '#43372a'},
  sea: {top: '#27415c', mid: '#d99a68', bot: '#f4cf9a', sun: '#ffe9b8', far: '#5a7180', mid2: '#2e4a52', near: '#1c2d33', ground: '#2b3d49'},
  grey: {top: '#4a4f57', mid: '#8b8a86', bot: '#bdb5a6', sun: '#d9d2c2', far: '#777b7e', mid2: '#4b564c', near: '#2a322b', ground: '#4a4439'},
};

export const Sky: React.FC<{pal: Pal; id: string; sunX?: number; sunY?: number; sunR?: number}> = ({pal, id, sunX = 760, sunY = 760, sunR = 90}) => (
  <g>
    <defs>
      <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={pal.top} />
        <stop offset="0.55" stopColor={pal.mid} />
        <stop offset="1" stopColor={pal.bot} />
      </linearGradient>
      <radialGradient id={`sun-${id}`}>
        <stop offset="0" stopColor={pal.sun} stopOpacity="0.95" />
        <stop offset="0.35" stopColor={pal.sun} stopOpacity="0.35" />
        <stop offset="1" stopColor={pal.sun} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width={W} height={H} fill={`url(#sky-${id})`} />
    <circle cx={sunX} cy={sunY} r={sunR * 4} fill={`url(#sun-${id})`} />
    <circle cx={sunX} cy={sunY} r={sunR} fill={pal.sun} opacity="0.9" />
  </g>
);

export const Clouds: React.FC<{sec: number; y?: number; seed?: number; color?: string; opacity?: number}> = ({sec, y = 420, seed = 3, color = '#fff4e0', opacity = 0.18}) => {
  const r = prng(seed);
  return (
    <g opacity={opacity} fill={color}>
      {Array.from({length: 6}).map((_, i) => {
        const x0 = r() * 1400 - 200;
        const yy = y + r() * 380;
        const w = 260 + r() * 360;
        const x = ((x0 + sec * (6 + i * 2) + 400) % 1800) - 400;
        return (
          <g key={i}>
            <ellipse cx={x} cy={yy} rx={w} ry={26 + r() * 20} />
            <ellipse cx={x + w * 0.3} cy={yy - 18} rx={w * 0.55} ry={28} />
          </g>
        );
      })}
    </g>
  );
};

export const Hills: React.FC<{y: number; amp: number; color: string; seed: number; opacity?: number}> = ({y, amp, color, seed, opacity = 1}) => {
  const r = prng(seed);
  const p1 = r() * 6, p2 = r() * 6, p3 = r() * 6;
  let d = `M0 ${H}`;
  for (let x = 0; x <= W + 20; x += 20) {
    const yy = y - amp * (0.5 * Math.sin(x / 190 + p1) + 0.3 * Math.sin(x / 83 + p2) + 0.2 * Math.sin(x / 41 + p3));
    d += ` L${x} ${yy.toFixed(1)}`;
  }
  d += ` L${W} ${H} Z`;
  return <path d={d} fill={color} opacity={opacity} />;
};

export const Canopy: React.FC<{y: number; h: number; color: string; seed: number; sec?: number; palms?: number; step?: number; solid?: boolean}> = ({y, h, color, seed, sec = 0, palms = 0, step = 46, solid = true}) => {
  const r = prng(seed);
  const blobs: React.ReactNode[] = [];
  for (let x = -60; x < W + 80; x += step) {
    const rr = h * (0.45 + r() * 0.55);
    blobs.push(<ellipse key={x} cx={x + r() * 20} cy={y - r() * h * 0.5} rx={rr * 1.15} ry={rr} />);
  }
  const palmEls: React.ReactNode[] = [];
  for (let i = 0; i < palms; i++) {
    const px = 80 + r() * (W - 160);
    const ph = h * (1.6 + r() * 1.2);
    const lean = (r() - 0.5) * 70;
    const sway = Math.sin(sec * 0.8 + i) * 4;
    const topx = px + lean + sway, topy = y - ph;
    palmEls.push(
      <g key={'p' + i}>
        <path d={`M${px} ${y + 40} Q${px + lean * 0.2} ${y - ph * 0.5} ${topx} ${topy}`} stroke={color} strokeWidth={9} fill="none" />
        {Array.from({length: 8}).map((_, k) => {
          const a = (k / 8) * Math.PI * 2 + 0.2;
          const L = 90 + (k % 2) * 25;
          return <path key={k} d={`M${topx} ${topy} Q${topx + Math.cos(a) * L * 0.6} ${topy + Math.sin(a) * L * 0.3 - 40} ${topx + Math.cos(a) * L} ${topy + Math.sin(a) * L * 0.55 + 20}`} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" />;
        })}
      </g>
    );
  }
  return (
    <g fill={color}>
      {blobs}
      {solid && <rect x={-10} y={y} width={W + 20} height={H - y} />}
      {palmEls}
    </g>
  );
};

export const Ground: React.FC<{y: number; pal: Pal}> = ({y, pal}) => (
  <g>
    <defs>
      <linearGradient id={`gr-${y}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={pal.ground} />
        <stop offset="1" stopColor="#14100c" />
      </linearGradient>
    </defs>
    <rect x={0} y={y} width={W} height={H - y} fill={`url(#gr-${y})`} />
  </g>
);

export const Smoke: React.FC<{x: number; y: number; sec: number; amount?: number; color?: string; seed?: number}> = ({x, y, sec, amount = 1, color = '#3a3632', seed = 1}) => (
  <g>
    {Array.from({length: 10}).map((_, i) => {
      const t = (sec * 0.16 + i / 10 + seed * 0.13) % 1;
      return <circle key={i} cx={x + t * 120 + Math.sin(i * 2 + seed) * 14} cy={y - t * 460} r={22 + t * 95} fill={color} opacity={Math.max(0, (1 - t) * 0.42 * amount)} />;
    })}
  </g>
);

export const Worker: React.FC<{x: number; y: number; s?: number; sec: number; ph?: number; carry?: boolean; color?: string; dir?: number}> = ({x, y, s = 1, sec, ph = 0, carry, color = '#15110e', dir = 1}) => {
  const w = Math.sin(sec * 5 + ph) * 9;
  return (
    <g transform={`translate(${x} ${y}) scale(${s * dir} ${s})`} fill={color} stroke={color}>
      <path d="M-14 -66 L14 -66 L8 -60 L-8 -60 Z" stroke="none" />
      <circle cx="0" cy="-74" r="9" stroke="none" />
      <path d="M-10 -60 L10 -60 L9 -26 L-9 -26 Z" stroke="none" />
      <path d={`M-4 -26 L${-8 + w} 0`} strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d={`M4 -26 L${8 - w} 0`} strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d={`M-9 -56 L${-14 - w * 0.5} -30`} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d={`M9 -56 L${14 + w * 0.5} -32`} strokeWidth="5" strokeLinecap="round" fill="none" />
      {carry && <path d="M-22 -88 L22 -88 L16 -76 L-16 -76 Z" stroke="none" />}
    </g>
  );
};

export const Shed: React.FC<{x: number; y: number; w: number; h: number; color?: string; roof?: string; light?: number}> = ({x, y, w, h, color = '#2a2119', roof = '#171310', light = 0}) => (
  <g>
    <rect x={x} y={y - h} width={w} height={h} fill={color} />
    <path d={`M${x - 14} ${y - h} L${x + w / 2} ${y - h - h * 0.45} L${x + w + 14} ${y - h} Z`} fill={roof} />
    {Array.from({length: Math.max(1, Math.floor(w / 70))}).map((_, i) => (
      <rect key={i} x={x + 18 + i * 62} y={y - h * 0.7} width={26} height={h * 0.32} fill={light > 0 ? '#ffcf7a' : '#0f0d0b'} opacity={light > 0 ? 0.35 + 0.55 * light : 0.9} />
    ))}
  </g>
);

export const Chimney: React.FC<{x: number; y: number; h: number; w?: number; broken?: boolean; color?: string}> = ({x, y, h, w = 46, broken, color = '#2b211b'}) => (
  <g fill={color}>
    <path d={`M${x - w / 2} ${y} L${x - w / 3} ${y - h} L${x + w / 3} ${y - h + (broken ? 40 : 0)} L${x + w / 2} ${y} Z`} />
    {!broken && <rect x={x - w / 2.4} y={y - h - 10} width={w * 0.84} height={16} />}
    {broken && <path d={`M${x - w / 3} ${y - h} l12 -14 l10 10 l12 -12 l9 14 Z`} />}
  </g>
);

export const Adit: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-150 0 L-110 -150 L110 -150 L150 0 Z" fill="#3a2c20" />
    <path d="M-90 0 L-90 -110 Q0 -190 90 -110 L90 0 Z" fill="#050403" />
    <rect x="-100" y="-120" width="22" height="120" fill="#5a4129" />
    <rect x="78" y="-120" width="22" height="120" fill="#5a4129" />
    <rect x="-110" y="-135" width="220" height="22" fill="#4a3522" />
    <path d="M-60 0 L-60 -60 M0 0 L0 -90 M60 0 L60 -60" stroke="#1a130d" strokeWidth="4" />
  </g>
);

export const Rails: React.FC<{y: number; offset?: number}> = ({y, offset = 0}) => (
  <g>
    {Array.from({length: 22}).map((_, i) => {
      const x = ((i * 70 - offset) % 1540) - 100;
      return <rect key={i} x={x} y={y + 6} width={34} height={14} fill="#2b2118" />;
    })}
    <rect x={-20} y={y} width={W + 40} height={8} fill="#6d6256" />
    <rect x={-20} y={y + 2} width={W + 40} height={2} fill="#a39682" opacity={0.6} />
  </g>
);

export const Wheel: React.FC<{cx: number; cy: number; r: number; rot: number}> = ({cx, cy, r, rot}) => (
  <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
    <circle r={r} fill="#17120f" stroke="#7b6f60" strokeWidth={4} />
    {[0, 60, 120].map((a) => <line key={a} x1={-r} y1={0} x2={r} y2={0} transform={`rotate(${a})`} stroke="#7b6f60" strokeWidth={3} />)}
    <circle r={6} fill="#7b6f60" />
  </g>
);

export const Loco: React.FC<{x: number; y: number; sec: number; wagons?: number}> = ({x, y, sec, wagons = 3}) => {
  const rot = (sec * 280) % 360;
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* locomotive facing right, rail at y */}
      <rect x={20} y={-100} width={170} height={70} fill="#18130f" />
      <rect x={30} y={-150} width={100} height={52} fill="#241b14" />
      <path d="M22 -150 L138 -150 L146 -160 L14 -160 Z" fill="#100c09" />
      <rect x={44} y={-134} width={26} height={26} fill="#ffcf7a" opacity="0.55" />
      <rect x={190} y={-98} width={190} height={62} rx={30} fill="#1e1712" />
      <rect x={346} y={-132} width={36} height={40} fill="#100c09" />
      <path d="M340 -132 L388 -132 L376 -150 L352 -150 Z" fill="#100c09" />
      <circle cx={262} cy={-108} r={18} fill="#2a2018" />
      <path d="M380 -34 L430 0 L380 0 Z" fill="#100c09" />
      <rect x={20} y={-36} width={360} height={14} fill="#100c09" />
      <Wheel cx={90} cy={-18} r={30} rot={rot} />
      <Wheel cx={190} cy={-18} r={30} rot={rot} />
      <Wheel cx={300} cy={-14} r={22} rot={rot} />
      <Wheel cx={360} cy={-14} r={22} rot={rot} />
      {Array.from({length: wagons}).map((_, i) => {
        const wx = -330 - i * 310;
        return (
          <g key={i} transform={`translate(${wx} 0)`}>
            <path d="M0 -92 L300 -92 L286 -34 L14 -34 Z" fill="#1a140f" />
            <path d="M6 -92 Q40 -130 90 -112 Q150 -140 210 -114 Q260 -128 294 -92 Z" fill="#0b0908" />
            <rect x={0} y={-36} width={300} height={10} fill="#100c09" />
            <Wheel cx={60} cy={-14} r={20} rot={rot * 1.3} />
            <Wheel cx={240} cy={-14} r={20} rot={rot * 1.3} />
            <rect x={300} y={-60} width={10} height={6} fill="#6d6256" />
          </g>
        );
      })}
    </g>
  );
};

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.55}) => (
  <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
    <defs>
      <radialGradient id="vg" cx="0.5" cy="0.5" r="0.75">
        <stop offset="0.55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity={strength} />
      </radialGradient>
    </defs>
    <rect width={W} height={H} fill="url(#vg)" />
  </svg>
);

export const Ship: React.FC<{x: number; y: number; sec: number}> = ({x, y, sec}) => {
  const bob = Math.sin(sec * 1.1) * 5, tilt = Math.sin(sec * 0.8) * 0.8;
  return (
    <g transform={`translate(${x} ${y + bob}) rotate(${tilt})`}>
      <path d="M0 -70 L520 -70 L470 0 L50 0 Z" fill="#14110f" />
      <rect x={0} y={-76} width={520} height={10} fill="#7a2f23" />
      <rect x={90} y={-150} width={230} height={74} fill="#2a2420" />
      <rect x={120} y={-125} width={30} height={26} fill="#ffcf7a" opacity="0.5" />
      <rect x={170} y={-125} width={30} height={26} fill="#ffcf7a" opacity="0.5" />
      <rect x={200} y={-230} width={46} height={82} fill="#1a1512" />
      <rect x={196} y={-236} width={54} height={14} fill="#7a2f23" />
      <rect x={400} y={-300} width={8} height={230} fill="#14110f" />
      <path d="M404 -296 L300 -150" stroke="#14110f" strokeWidth={3} />
      <path d="M404 -296 L500 -140" stroke="#14110f" strokeWidth={3} />
      <path d="M330 -76 Q380 -120 430 -76 Z" fill="#0a0807" />
    </g>
  );
};

export const Waves: React.FC<{y: number; sec: number; color: string; opacity?: number}> = ({y, sec, color, opacity = 0.5}) => (
  <g stroke={color} strokeWidth={3} fill="none" opacity={opacity}>
    {Array.from({length: 14}).map((_, i) => {
      const yy = y + i * 34;
      const off = (sec * (14 + i * 2)) % 200;
      let d = `M${-200 - off} ${yy}`;
      for (let x = -200; x < W + 400; x += 100) d += ` q50 ${-10 - i * 0.6} 100 0`;
      return <path key={i} d={d} transform={`translate(${off} 0)`} />;
    })}
  </g>
);

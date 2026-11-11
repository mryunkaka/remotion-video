import React, {useId, useMemo} from 'react';
import {interpolateColors, random} from 'remotion';
import {H, W} from '../lib/layout';
import {clamp} from '../lib/util';

export const useUid = () => useId().replace(/[^a-zA-Z0-9]/g, '');
export type Pose = 'down' | 'wave' | 'point' | 'raise' | 'stop';

/* ---------------- Langit & bulan ---------------- */
export const Sky: React.FC<{frame: number; phase: number; moon?: boolean; moonX?: number; moonY?: number; glow?: number}> = ({
  frame, phase, moon, moonX = 770, moonY = 380, glow = 0.35,
}) => {
  const id = useUid();
  const top = interpolateColors(phase, [0, 1], ['#2b2148', '#03050b']);
  const mid = interpolateColors(phase, [0, 1], ['#8a4258', '#0a1426']);
  const low = interpolateColors(phase, [0, 1], ['#e69552', '#142536']);
  const stars = useMemo(
    () => Array.from({length: 55}, (_, i) => ({x: random(`sx${i}`) * W, y: random(`sy${i}`) * 760, r: 0.8 + random(`sr${i}`) * 1.5, p: random(`sp${i}`) * 6})),
    [],
  );
  return (
    <g>
      <defs>
        <linearGradient id={id + 's'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset=".55" stopColor={mid} />
          <stop offset="1" stopColor={low} />
        </linearGradient>
        <radialGradient id={id + 'm'}>
          <stop offset="0" stopColor="#e3ebf7" stopOpacity=".9" />
          <stop offset=".22" stopColor="#a5bad8" stopOpacity=".32" />
          <stop offset="1" stopColor="#a5bad8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={1500} fill={`url(#${id}s)`} />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#cfe0ff" opacity={clamp(phase - 0.3) * (0.35 + 0.25 * Math.sin(frame / 25 + s.p))} />
      ))}
      {moon && (
        <g opacity={0.35 + 0.65 * phase}>
          <circle cx={moonX} cy={moonY} r={300} fill={`url(#${id}m)`} opacity={glow + 0.2} />
          <circle cx={moonX} cy={moonY} r={52} fill="#e9eff8" opacity={0.92} />
          <circle cx={moonX - 14} cy={moonY - 8} r={46} fill="#cdd8e8" opacity={0.25} />
        </g>
      )}
    </g>
  );
};

/* ---------------- Bukit berlapis + Gunung Julahit ---------------- */
type Peak = {x: number; h: number; w: number};
const ridgeFn = (seed: string, base: number, amp: number, f: number, peak?: Peak) => {
  const p1 = random(seed + 'a') * 6, p2 = random(seed + 'b') * 6, p3 = random(seed + 'c') * 6;
  return (x: number) => {
    let y = base - amp * (0.5 * Math.sin(x * f + p1) + 0.3 * Math.sin(x * f * 2.3 + p2) + 0.2 * Math.sin(x * f * 4.1 + p3));
    if (peak) y -= peak.h * Math.exp(-Math.pow((x - peak.x) / peak.w, 2));
    return y;
  };
};
const ridgePath = (fn: (x: number) => number) => {
  let d = `M-80,${H}`;
  for (let x = -80; x <= W + 80; x += 24) d += ` L${x},${fn(x).toFixed(1)}`;
  return d + ` L${W + 80},${H} Z`;
};
export const julahitRidgeY = (x: number, peakX: number) => ridgeFn('hero', 960, 36, 0.007, {x: peakX, h: 330, w: 170})(x);

export const Hills: React.FC<{frame: number; peakX?: number; baseY?: number; fog?: number; rim?: number; layers?: number}> = ({
  frame, peakX = 540, baseY = 960, fog = 0.4, rim = 0.28, layers = 3,
}) => {
  const id = useUid();
  const L = useMemo(() => {
    const far = {d: ridgePath(ridgeFn('far', baseY - 40, 70, 0.005)), c: '#0e1a2a'};
    const mid = {d: ridgePath(ridgeFn('mid', baseY - 10, 50, 0.008)), c: '#0a141f'};
    const hf = ridgeFn('hero', baseY, 36, 0.007, {x: peakX, h: 330, w: 170});
    const hero = {d: ridgePath(hf), c: '#060d14'};
    return {far, mid, hero};
  }, [baseY, peakX]);
  const t = frame / 30;
  return (
    <g>
      <defs>
        <linearGradient id={id + 'f'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7f98ad" stopOpacity="0" />
          <stop offset=".6" stopColor="#7f98ad" stopOpacity={0.5 * fog} />
          <stop offset="1" stopColor="#7f98ad" stopOpacity="0" />
        </linearGradient>
      </defs>
      {layers >= 3 && <path d={L.far.d} fill={L.far.c} transform={`translate(${-t * 2},0)`} />}
      <rect x={-200} y={baseY - 240} width={W + 400} height={260} fill={`url(#${id}f)`} transform={`translate(${Math.sin(t / 3) * 40},0)`} />
      {layers >= 2 && <path d={L.mid.d} fill={L.mid.c} transform={`translate(${-t * 4},0)`} />}
      <path d={L.hero.d} fill={L.hero.c} stroke={`rgba(170,195,230,${rim})`} strokeWidth={2.5} />
      <rect x={-200} y={baseY - 130} width={W + 400} height={230} fill={`url(#${id}f)`} transform={`translate(${-Math.sin(t / 4) * 60},0)`} />
    </g>
  );
};

/* ---------------- Kabut ---------------- */
export const Fog: React.FC<{frame: number; y: number; h?: number; o?: number; speed?: number; color?: string}> = ({
  frame, y, h = 300, o = 0.4, speed = 1, color = '#8aa4b8',
}) => {
  const id = useUid();
  const t = frame / 30;
  return (
    <g opacity={o}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0" />
          <stop offset=".5" stopColor={color} stopOpacity=".85" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x={-300} y={y} width={W + 600} height={h} fill={`url(#${id})`} transform={`translate(${Math.sin(t * 0.35 * speed) * 70},0)`} />
      <rect x={-300} y={y + h * 0.3} width={W + 600} height={h * 0.8} fill={`url(#${id})`} opacity={0.7} transform={`translate(${-Math.sin(t * 0.25 * speed + 1) * 90},0)`} />
    </g>
  );
};

/* ---------------- Hujan (deterministik, <=120 garis) ---------------- */
export const Rain: React.FC<{frame: number; o?: number; n?: number}> = ({frame, o = 0.5, n = 90}) => {
  const drops = useMemo(
    () => Array.from({length: Math.min(n, 120)}, (_, i) => ({x: random(`rx${i}`) * (W + 300) - 150, y: random(`ry${i}`) * H, l: 28 + random(`rl${i}`) * 40, s: 30 + random(`rs${i}`) * 22})),
    [n],
  );
  if (o <= 0) return null;
  return (
    <g stroke="rgba(190,208,232,0.38)" strokeWidth={1.6} opacity={o} strokeLinecap="round">
      {drops.map((d, i) => {
        const y = (d.y + frame * d.s) % (H + 80) - 40;
        const x = d.x - y * 0.14;
        return <line key={i} x1={x} y1={y} x2={x - d.l * 0.14} y2={y + d.l} />;
      })}
    </g>
  );
};

/* ---------------- Pohon ---------------- */
export const Trees: React.FC<{side: 'l' | 'r'; seed: string; baseY: number; scale?: number; count?: number; color?: string; frame?: number}> = ({
  side, seed, baseY, scale = 1, count = 6, color = '#03070a', frame = 0,
}) => {
  const items = useMemo(
    () => Array.from({length: count}, (_, i) => {
      const u = i / Math.max(1, count - 1);
      return {x: (side === 'l' ? -40 + u * 360 : W + 40 - u * 360) + (random(seed + 'x' + i) - 0.5) * 60,
        h: (360 + random(seed + 'h' + i) * 340) * scale * (1 - u * 0.35), w: (80 + random(seed + 'w' + i) * 70) * scale, p: random(seed + 'p' + i) * 6};
    }),
    [side, seed, scale, count],
  );
  return (
    <g fill={color}>
      {items.map((t, i) => {
        const sway = Math.sin(frame / 60 + t.p) * 3;
        return (
          <g key={i} transform={`translate(${t.x},${baseY})`}>
            <rect x={-t.w * 0.08} y={-t.h} width={t.w * 0.16} height={t.h} />
            <ellipse cx={sway} cy={-t.h} rx={t.w * 1.5} ry={t.w * 0.9} />
            <ellipse cx={-t.w * 0.9 + sway} cy={-t.h * 0.82} rx={t.w * 1.1} ry={t.w * 0.7} />
            <ellipse cx={t.w * 0.9 + sway} cy={-t.h * 0.78} rx={t.w * 1.2} ry={t.w * 0.75} />
          </g>
        );
      })}
    </g>
  );
};

/* ---------------- Jalan basah ---------------- */
export const roadX = (y: number, hz = 860) => {
  const t = clamp((y - hz) / (H - hz));
  return {l: 540 - 36 - t * 760, r: 540 + 36 + t * 760};
};
export const WetRoad: React.FC<{frame: number; hz?: number; scroll?: number; lampX?: number; lampGlow?: number; sheen?: number}> = ({
  frame, hz = 860, scroll = 0, lampX, lampGlow = 0, sheen = 0.5,
}) => {
  const id = useUid();
  const t = frame / 30;
  const dashes = Array.from({length: 9}, (_, i) => {
    const z = ((i + (t * scroll) % 1) % 9) / 9;
    const k = Math.pow(z, 2.2);
    return {y: hz + k * (H - hz), w: 3 + k * 26, l: 8 + k * 170, o: 0.15 + k * 0.5};
  });
  const sheens = useMemo(() => Array.from({length: 14}, (_, i) => ({k: random('sh' + i), w: random('sw' + i), o: random('so' + i)})), []);
  return (
    <g>
      <defs>
        <linearGradient id={id + 'g'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#101a1f" />
          <stop offset="1" stopColor="#040608" />
        </linearGradient>
        <linearGradient id={id + 'r'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b2830" />
          <stop offset=".5" stopColor="#10181e" />
          <stop offset="1" stopColor="#070a0d" />
        </linearGradient>
        <linearGradient id={id + 'l'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity=".5" />
          <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x={0} y={hz} width={W} height={H - hz} fill={`url(#${id}g)`} />
      <polygon points={`${540 - 36},${hz} ${540 + 36},${hz} ${540 + 800},${H} ${540 - 800},${H}`} fill={`url(#${id}r)`} />
      <polyline points={`${540 - 36},${hz} ${540 - 800},${H}`} stroke="rgba(200,210,220,.18)" strokeWidth={3} fill="none" />
      <polyline points={`${540 + 36},${hz} ${540 + 800},${H}`} stroke="rgba(200,210,220,.18)" strokeWidth={3} fill="none" />
      {dashes.map((d, i) => <rect key={i} x={540 - d.w / 2} y={d.y} width={d.w} height={d.l} fill="#e8dcb8" opacity={d.o} />)}
      {sheens.map((s, i) => {
        const y = hz + 30 + s.k * s.k * (H - hz - 60);
        const rx = roadX(y, hz);
        return <rect key={i} x={rx.l + (rx.r - rx.l) * s.w * 0.7} y={y} width={30 + s.k * 220} height={2 + s.k * 3} fill="#a9c1cf" opacity={sheen * 0.16 * (0.4 + s.o)} />;
      })}
      {lampX !== undefined && lampGlow > 0 && (
        <g opacity={lampGlow}>
          <polygon points={`${lampX - 30},${hz + 60} ${lampX + 30},${hz + 60} ${lampX + 150},${H} ${lampX - 150},${H}`} fill={`url(#${id}l)`} opacity={0.55} />
          <ellipse cx={lampX} cy={hz + 120} rx={160} ry={34} fill="#ffcf8a" opacity={0.22} />
        </g>
      )}
    </g>
  );
};

/* ---------------- Lampu jalan ---------------- */
export const Streetlight: React.FC<{x: number; y: number; h: number; glow?: number; dir?: 1 | -1}> = ({x, y, h, glow = 1, dir = 1}) => {
  const id = useUid();
  const w = Math.max(4, h * 0.022);
  const hx = x + dir * h * 0.16, hy = y - h;
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#ffe3b0" stopOpacity=".95" />
          <stop offset=".25" stopColor="#ffbf70" stopOpacity=".4" />
          <stop offset="1" stopColor="#ffbf70" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id + 'c'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity=".38" />
          <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${hx - h * 0.03},${hy + 6} ${hx + h * 0.03},${hy + 6} ${hx + h * 0.3},${y} ${hx - h * 0.3},${y}`} fill={`url(#${id}c)`} opacity={glow} />
      <circle cx={hx} cy={hy} r={h * 0.55} fill={`url(#${id})`} opacity={glow * 0.8} />
      <rect x={x - w / 2} y={hy} width={w} height={h} fill="#05080b" />
      <path d={`M${x},${hy + h * 0.03} Q${x},${hy - h * 0.03} ${hx},${hy - h * 0.012}`} stroke="#05080b" strokeWidth={w * 0.8} fill="none" />
      <ellipse cx={hx} cy={hy} rx={h * 0.045} ry={h * 0.016} fill="#fff1d4" opacity={0.35 + 0.6 * glow} />
    </g>
  );
};

/* ---------------- Genangan ---------------- */
export const Puddle: React.FC<{x: number; y: number; rx: number; ry: number; frame: number; warm?: number; ripples?: number}> = ({x, y, rx, ry, frame, warm = 0.3, ripples = 2}) => {
  const id = useUid();
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#35465a" stopOpacity=".85" />
          <stop offset=".6" stopColor="#1b2735" stopOpacity=".8" />
          <stop offset="1" stopColor="#0c1218" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id + 'w'}>
          <stop offset="0" stopColor="#ffcf8a" stopOpacity={warm} />
          <stop offset="1" stopColor="#ffcf8a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={`url(#${id})`} />
      <ellipse cx={x} cy={y} rx={rx * 0.6} ry={ry * 0.6} fill={`url(#${id}w)`} />
      {Array.from({length: ripples}, (_, i) => {
        const p = ((frame / 40 + i / ripples + i * 0.13) % 1);
        return <ellipse key={i} cx={x + (i - 0.5) * rx * 0.5} cy={y + (i % 2) * ry * 0.2} rx={rx * 0.08 + rx * 0.3 * p} ry={ry * 0.08 + ry * 0.3 * p} fill="none" stroke="rgba(190,210,230,.5)" strokeWidth={2} opacity={(1 - p) * 0.8} />;
      })}
    </g>
  );
};

/* ---------------- Perempuan: siluet dari belakang / jauh (tanpa wajah) ---------------- */
export const Woman: React.FC<{x: number; y: number; h: number; pose: Pose; frame: number; dir?: 1 | -1; ghost?: boolean; turn?: boolean; opacity?: number; reflect?: boolean; rim?: number}> = ({
  x, y, h, pose, frame, dir = 1, ghost, turn, opacity = 1, reflect, rim = 0.35,
}) => {
  const id = useUid();
  const u = h / 400;
  const wv = Math.sin(frame / 5) * 14;
  const armPath = (p: Pose) => {
    switch (p) {
      case 'wave': return `M38,-292 L78,-338 L${84 + wv},-412`;
      case 'raise': return 'M38,-292 L74,-332 L84,-402';
      case 'point': return 'M38,-292 L112,-322 L196,-356';
      case 'stop': return 'M38,-292 L92,-286 L134,-282';
      default: return 'M38,-292 L52,-205 L46,-152';
    }
  };
  const body = (
    <g>
      {ghost && (
        <ellipse cx={0} cy={-200} rx={130} ry={270} fill={`url(#${id}h)`} />
      )}
      <path d="M-30,-350 C-44,-300 -42,-230 -24,-185 L24,-185 C42,-230 44,-300 30,-350 C22,-392 -22,-392 -30,-350 Z" fill="#020304" transform={turn ? 'translate(5,0)' : undefined} />
      <path d="M-36,-300 C-46,-220 -82,-110 -86,0 L86,0 C82,-110 46,-220 36,-300 Z" fill={ghost ? '#0a1019' : '#06080b'} stroke={`rgba(${ghost ? '150,185,230' : '255,205,150'},${rim})`} strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
      <ellipse cx={0} cy={-296} rx={46} ry={20} fill="#05070a" />
      <rect x={-9} y={-330} width={18} height={30} fill="#05070a" />
      <ellipse cx={turn ? 6 : 0} cy={-352} rx={24} ry={28} fill="#030507" stroke={`rgba(${ghost ? '150,185,230' : '255,205,150'},${rim * 0.7})`} strokeWidth={2} vectorEffect="non-scaling-stroke" />
      <path d="M-38,-292 L-52,-205 L-46,-152" stroke="#06080b" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <g transform={dir === -1 ? 'scale(-1,1)' : undefined}>
        <path d={armPath(pose)} stroke="#06080b" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </g>
  );
  return (
    <g opacity={opacity}>
      <defs>
        <radialGradient id={id + 'h'}>
          <stop offset="0" stopColor="#aac0e0" stopOpacity=".2" />
          <stop offset="1" stopColor="#aac0e0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={x} cy={y + 2} rx={h * 0.26} ry={h * 0.035} fill="#000" opacity={0.5} />
      {reflect && <g transform={`translate(${x},${y}) scale(${u},${-u * 0.8})`} opacity={0.2}>{body}</g>}
      <g transform={`translate(${x},${y}) scale(${u})`}>{body}</g>
    </g>
  );
};

/* ---------------- Tangan (foreground) ---------------- */
export const Hand: React.FC<{x: number; y: number; s: number; rot: number; frame: number; wave?: boolean}> = ({x, y, s, rot, frame, wave = true}) => {
  const w = wave ? Math.sin(frame / 3) * 12 : 0;
  const fill = '#050607', st = 'rgba(210,170,130,.4)';
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <path d="M-46,520 C-52,260 -50,60 -42,0 L42,0 C50,60 52,260 46,520 Z" fill={fill} stroke={st} strokeWidth={3} vectorEffect="non-scaling-stroke" />
      <g transform={`rotate(${w})`}>
        <ellipse cx={0} cy={-25} rx={56} ry={52} fill={fill} stroke={st} strokeWidth={3} vectorEffect="non-scaling-stroke" />
        {[-24, -8, 8, 22].map((a, i) => (
          <rect key={i} x={-11} y={-170 + Math.abs(a) * -0.3} width={22} height={125 - Math.abs(a) * 0.4} rx={11} fill={fill} stroke={st} strokeWidth={2} vectorEffect="non-scaling-stroke" transform={`rotate(${a} 0 -45)`} />
        ))}
        <rect x={-60} y={-90} width={24} height={85} rx={12} fill={fill} transform="rotate(-62 -48 -20)" />
      </g>
    </g>
  );
};

/* ---------------- Sepatu (POV ke bawah) ---------------- */
export const Shoes: React.FC<{x: number; y: number; s: number; frame: number}> = ({x, y, s, frame}) => {
  const a = Math.sin(frame / 14);
  const shoe = (dx: number, dy: number, key: string) => (
    <g key={key} transform={`translate(${x + dx},${y + dy}) scale(${s})`}>
      <path d="M-46,60 C-60,0 -48,-110 -10,-130 C30,-146 56,-80 50,-10 C48,36 40,62 0,70 Z" fill="#05070a" stroke="rgba(190,205,225,.35)" strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
      <ellipse cx={0} cy={-80} rx={26} ry={34} fill="#0b1118" opacity={0.7} />
    </g>
  );
  return <g>{shoe(-110, a * 40, 'l')}{shoe(110, -a * 40, 'r')}</g>;
};

/* ---------------- Jembatan tua berkabut ---------------- */
export const Bridge: React.FC<{frame: number; fog?: number}> = ({frame, fog = 0.5}) => {
  const id = useUid();
  const vy = 800;
  const P = (t: number) => ({y: vy + Math.pow(t, 1.8) * 1120, hw: 38 + Math.pow(t, 1.8) * 700, ph: 16 + Math.pow(t, 1.8) * 330});
  const ts = Array.from({length: 12}, (_, i) => (i + 1) / 12);
  return (
    <g>
      <defs>
        <linearGradient id={id + 'd'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1a17" />
          <stop offset="1" stopColor="#0a0908" />
        </linearGradient>
        <linearGradient id={id + 'c'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1822" />
          <stop offset="1" stopColor="#020407" />
        </linearGradient>
      </defs>
      <rect x={0} y={vy - 20} width={W} height={H - vy + 20} fill={`url(#${id}c)`} />
      <polygon points={`${540 - 38},${vy} ${540 + 38},${vy} ${540 + 740},${H} ${540 - 740},${H}`} fill={`url(#${id}d)`} />
      {ts.map((t, i) => {
        const p = P(t);
        return <line key={'p' + i} x1={540 - p.hw} y1={p.y} x2={540 + p.hw} y2={p.y} stroke="#050403" strokeWidth={2 + t * 5} opacity={0.8} />;
      })}
      {[-1, 1].map((sd) => (
        <g key={sd}>
          {ts.map((t, i) => {
            const p = P(t);
            return <line key={i} x1={540 + sd * p.hw} y1={p.y} x2={540 + sd * p.hw} y2={p.y - p.ph} stroke="#060504" strokeWidth={2 + t * 9} strokeLinecap="round" />;
          })}
          <polyline points={ts.map((t) => { const p = P(t); return `${540 + sd * p.hw},${p.y - p.ph}`; }).join(' ')} stroke="#0a0908" strokeWidth={5} fill="none" />
          <polyline points={ts.map((t) => { const p = P(t); return `${540 + sd * p.hw},${p.y - p.ph * 0.5}`; }).join(' ')} stroke="#0a0908" strokeWidth={3} fill="none" opacity={0.8} />
        </g>
      ))}
      <Fog frame={frame} y={vy - 120} h={340} o={0.75 * fog + 0.25} speed={0.8} color="#9fb6c6" />
      <Fog frame={frame} y={vy + 200} h={380} o={0.5 * fog} speed={1.2} color="#7f9aae" />
    </g>
  );
};

/* ---------------- Peta konseptual (tidak berskala, bukan geografi nyata) ---------------- */
export const MapConcept: React.FC<{frame: number; mode: 'kotabaru' | 'tanjung' | 'three' | 'saranjana'; p: number}> = ({frame, mode, p}) => {
  const id = useUid();
  const nodes = mode === 'kotabaru'
    ? [{x: 540, y: 820, n: 'KOTABARU', s: 'KALIMANTAN SELATAN', big: true}]
    : [{x: 250, y: 560, n: 'TANJUNG DEWA', s: '', big: mode === 'tanjung'},
       {x: 590, y: 850, n: 'GUNUNG JULAHIT', s: '', big: mode === 'three'},
       {x: 840, y: 1170, n: 'SARANJANA', s: mode === 'saranjana' ? 'CERITA LISAN / LEGENDA' : '', big: mode === 'saranjana'}];
  const rings = useMemo(() => [0, 1, 2, 3, 4].map((k) => {
    let d = '';
    for (let a = 0; a <= 360; a += 12) {
      const r = (170 + k * 120) * (1 + 0.1 * Math.sin(a * 0.05 + k * 2) + 0.06 * Math.sin(a * 0.13 + k));
      const x = 540 + Math.cos((a * Math.PI) / 180) * r * 1.0, y = 820 + Math.sin((a * Math.PI) / 180) * r * 0.9;
      d += `${a === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `;
    }
    return d + 'Z';
  }), []);
  const draw = mode === 'three' ? clamp(p * 1.6) : mode === 'saranjana' ? 1 : 0;
  const len1 = Math.hypot(340, 290), len2 = Math.hypot(250, 320);
  const pulse = 0.5 + 0.5 * Math.sin(frame / 12);
  return (
    <g>
      <defs>
        <radialGradient id={id} cx=".5" cy=".5" r=".7">
          <stop offset="0" stopColor="#10242b" />
          <stop offset="1" stopColor="#04090c" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id})`} />
      {Array.from({length: 13}, (_, i) => <line key={'v' + i} x1={i * 90} y1={0} x2={i * 90} y2={H} stroke="rgba(120,170,180,.07)" strokeWidth={1} />)}
      {Array.from({length: 22}, (_, i) => <line key={'h' + i} x1={0} y1={i * 90} x2={W} y2={i * 90} stroke="rgba(120,170,180,.07)" strokeWidth={1} />)}
      {rings.map((d, i) => <path key={i} d={d} fill="none" stroke="rgba(130,190,200,.13)" strokeWidth={1.6} />)}
      {nodes.length === 3 && (
        <g stroke="rgba(235,215,160,.75)" strokeWidth={3} fill="none" strokeDasharray="14 12" strokeLinecap="round">
          <line x1={250} y1={560} x2={590} y2={850} strokeDashoffset={-frame * 0.6} opacity={clamp(draw * 2)} style={{strokeDasharray: `14 12`}} />
          <line x1={590} y1={850} x2={840} y2={1170} strokeDashoffset={-frame * 0.6} opacity={clamp(draw * 2 - 1)} />
        </g>
      )}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={(n.big ? 34 : 20) + pulse * (n.big ? 12 : 4)} fill="none" stroke="rgba(240,220,170,.5)" strokeWidth={2} opacity={0.4 + 0.5 * pulse} />
          <circle cx={n.x} cy={n.y} r={n.big ? 14 : 9} fill="#f0dca8" />
          <text x={n.x} y={n.y - (n.big ? 62 : 44)} textAnchor="middle" fontFamily='"Segoe UI","Helvetica Neue",Arial,sans-serif' fontWeight={700} fontSize={n.big ? 46 : 34} letterSpacing={3} fill="#f2ead2" opacity={n.big ? 1 : 0.8}>{n.n}</text>
          {n.s && <text x={n.x} y={n.y + 64} textAnchor="middle" fontFamily='"Segoe UI","Helvetica Neue",Arial,sans-serif' fontSize={28} letterSpacing={4} fill="#b8c9c6">{n.s}</text>}
        </g>
      ))}
      <text x={540} y={1360} textAnchor="middle" fontFamily='"Segoe UI","Helvetica Neue",Arial,sans-serif' fontSize={26} letterSpacing={5} fill="rgba(200,220,215,.6)">PETA KONSEPTUAL · TIDAK BERSKALA</text>
    </g>
  );
};

/* ---------------- Overlay umum ---------------- */
export const Vignette: React.FC<{o?: number}> = ({o = 0.7}) => (
  <div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 46%, rgba(0,0,0,0) 38%, rgba(0,0,0,${o}) 100%)`, pointerEvents: 'none'}} />
);
export const GrainSoft: React.FC<{frame: number}> = ({frame}) => {
  const seed = Math.floor(frame / 2);
  const dots = useMemo(() => Array.from({length: 1}, () => 0), []);
  void dots;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, opacity: 0.07, mixBlendMode: 'screen', pointerEvents: 'none'}}>
      {Array.from({length: 110}, (_, i) => <rect key={i} x={random(`gx${seed}-${i}`) * W} y={random(`gy${seed}-${i}`) * H} width={2} height={2} fill="#fff" />)}
    </svg>
  );
};

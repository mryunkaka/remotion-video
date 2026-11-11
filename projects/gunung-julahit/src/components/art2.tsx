import React, {useMemo} from 'react';
import {random} from 'remotion';
import {H, W} from '../lib/layout';
import {clamp} from '../lib/util';
import {useUid} from './art';

/* Awan mengalir (lapisan berbeda kecepatan) */
export const CloudsDrift: React.FC<{frame: number; y: number; h?: number; o?: number; speed?: number; n?: number; color?: string}> = ({frame, y, h = 260, o = 0.5, speed = 1, n = 6, color = '#16212f'}) => {
  const cl = useMemo(() => Array.from({length: n}, (_, i) => ({x: random('cx' + i) * (W + 900), y: random('cy' + i) * h, rx: 220 + random('cr' + i) * 260, ry: 30 + random('cq' + i) * 40, s: 0.3 + random('cs' + i) * 0.7, o: 0.4 + random('co' + i) * 0.6})), [n, h]);
  return (
    <g opacity={o}>
      {cl.map((c, i) => {
        const x = ((c.x + frame * c.s * speed * 0.8) % (W + 900)) - 450;
        return (
          <g key={i} transform={`translate(${x},${y + c.y})`} fill={color} opacity={c.o}>
            <ellipse rx={c.rx} ry={c.ry} />
            <ellipse cx={c.rx * 0.4} cy={-c.ry * 0.5} rx={c.rx * 0.6} ry={c.ry * 0.9} />
            <ellipse cx={-c.rx * 0.5} cy={c.ry * 0.2} rx={c.rx * 0.55} ry={c.ry * 0.8} />
          </g>
        );
      })}
    </g>
  );
};

/* Bintang berkedip lambat (bukan strobo: periode ~9 dtk) */
export const StarsSlow: React.FC<{frame: number; o?: number; n?: number; h?: number}> = ({frame, o = 1, n = 70, h = 800}) => {
  const s = useMemo(() => Array.from({length: n}, (_, i) => ({x: random('ssx' + i) * W, y: random('ssy' + i) * h, r: 0.8 + random('ssr' + i) * 1.6, p: random('ssp' + i) * 6})), [n, h]);
  return (
    <g>
      {s.map((a, i) => <circle key={i} cx={a.x} cy={a.y} r={a.r} fill="#d6e4ff" opacity={o * (0.3 + 0.35 * (0.5 + 0.5 * Math.sin(frame / 43 + a.p)))} />)}
    </g>
  );
};

/* Lampu kota jauh */
export const TownLights: React.FC<{frame: number; y: number; w?: number; n?: number; o?: number; cx?: number}> = ({frame, y, w = 900, n = 46, o = 1, cx = 540}) => {
  const id = useUid();
  const pts = useMemo(() => Array.from({length: n}, (_, i) => ({x: (random('tx' + i) - 0.5) * w, y: (random('ty' + i) - 0.3) * 50, r: 1.4 + random('tr' + i) * 2.2, p: random('tp' + i) * 6})), [n, w]);
  return (
    <g opacity={o}>
      <defs>
        <radialGradient id={id}><stop offset="0" stopColor="#ffcf8a" stopOpacity=".3" /><stop offset="1" stopColor="#ffcf8a" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx={cx} cy={y} rx={w * 0.55} ry={46} fill={`url(#${id})`} />
      {pts.map((p, i) => <circle key={i} cx={cx + p.x} cy={y + p.y} r={p.r} fill="#ffd9a0" opacity={0.4 + 0.35 * Math.sin(frame / 37 + p.p)} />)}
    </g>
  );
};

/* Ngengat mengitari lampu (<=16 partikel) */
export const Moths: React.FC<{frame: number; cx: number; cy: number; n?: number; R?: number; o?: number}> = ({frame, cx, cy, n = 12, R = 150, o = 1}) => {
  const m = useMemo(() => Array.from({length: n}, (_, i) => ({r: 40 + random('mr' + i) * R, ph: random('mp' + i) * 6.28, sp: 0.04 + random('ms' + i) * 0.05, sz: 3 + random('mz' + i) * 3})), [n, R]);
  return (
    <g opacity={o} fill="#f6e8cc">
      {m.map((a, i) => {
        const x = cx + Math.cos(frame * a.sp + a.ph) * a.r * (1 + 0.2 * Math.sin(frame / 17 + a.ph));
        const y = cy + Math.sin(frame * a.sp * 1.3 + a.ph) * a.r * 0.6;
        return <ellipse key={i} cx={x} cy={y} rx={a.sz * (0.5 + 0.5 * Math.abs(Math.sin(frame / 2 + a.ph)))} ry={a.sz * 0.6} opacity={0.75} />;
      })}
    </g>
  );
};

/* Riak konsentris deterministik */
export const Ripples: React.FC<{frame: number; x: number; y: number; rx: number; ry: number; period?: number; o?: number}> = ({frame, x, y, rx, ry, period = 40, o = 0.7}) => {
  const src = [[0, 0], [0.55, 0.3], [-0.45, 0.5]];
  return (
    <g fill="none" stroke="rgba(195,215,235,.55)" strokeWidth={2} opacity={o}>
      {src.map(([sx, sy], i) => [0, 1, 2].map((k) => {
        const p = (frame / period + k / 3 + i * 0.31) % 1;
        return <ellipse key={i + '-' + k} cx={x + sx * rx * 0.6} cy={y + sy * ry * 0.6} rx={rx * 0.05 + rx * 0.4 * p} ry={ry * 0.05 + ry * 0.4 * p} opacity={(1 - p) * 0.9} />;
      }))}
    </g>
  );
};

/* Siluet pria berjalan (tampak samping, tanpa wajah) */
export const Walker: React.FC<{x: number; y: number; h: number; frame: number; opacity?: number}> = ({x, y, h, frame, opacity = 1}) => {
  const u = h / 400, sw = Math.sin(frame / 7) * 24;
  const fill = '#05070a', rim = 'rgba(255,205,150,.35)';
  return (
    <g opacity={opacity} transform={`translate(${x},${y}) scale(${u})`}>
      <ellipse cx={0} cy={2} rx={110} ry={12} fill="#000" opacity={0.45} />
      <g transform={`translate(0,-190) rotate(${sw})`}><rect x={-15} y={0} width={30} height={190} rx={13} fill={fill} /></g>
      <g transform={`translate(0,-190) rotate(${-sw})`}><rect x={-15} y={0} width={30} height={190} rx={13} fill={fill} stroke={rim} strokeWidth={2} vectorEffect="non-scaling-stroke" /></g>
      <g transform={`translate(0,-318) rotate(${-sw * 0.8})`}><rect x={-10} y={0} width={20} height={130} rx={10} fill={fill} /></g>
      <rect x={-36} y={-340} width={72} height={160} rx={28} fill={fill} stroke={rim} strokeWidth={2} vectorEffect="non-scaling-stroke" />
      <g transform={`translate(0,-318) rotate(${sw * 0.8})`}><rect x={-10} y={0} width={20} height={130} rx={10} fill={fill} /></g>
      <circle cx={6} cy={-372} r={27} fill={fill} stroke={rim} strokeWidth={2} vectorEffect="non-scaling-stroke" />
    </g>
  );
};

/* Garis hujan terang di dalam kerucut lampu */
export const ConeRain: React.FC<{frame: number; points: string; o?: number}> = ({frame, points, o = 0.6}) => {
  const id = useUid();
  const d = useMemo(() => Array.from({length: 60}, (_, i) => ({x: random('cax' + i) * W, y: random('cay' + i) * H, l: 40 + random('cal' + i) * 40, s: 26 + random('cas' + i) * 18})), []);
  return (
    <g>
      <defs><clipPath id={id}><polygon points={points} /></clipPath></defs>
      <g clipPath={`url(#${id})`} stroke="rgba(255,236,200,.7)" strokeWidth={2} opacity={o}>
        {d.map((a, i) => { const y = (a.y + frame * a.s) % (H + 80) - 40; return <line key={i} x1={a.x - y * 0.14} y1={y} x2={a.x - y * 0.14 - a.l * 0.14} y2={y + a.l} />; })}
      </g>
    </g>
  );
};
void clamp;

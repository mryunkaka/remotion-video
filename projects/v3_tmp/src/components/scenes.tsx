import React, {useMemo} from 'react';
import {random} from 'remotion';
import {H, W} from '../lib/layout';
import {clamp, ease, easeOut, lerp} from '../lib/util';
import {Bridge, Fog, Hand, Hills, Puddle, Rain, Shoes, Sky, Streetlight, Trees, Woman, WetRoad, ridgeAt, useUid} from './art';
import type {Pose} from './art';
import {CloudsDrift, ConeRain, Moths, Ripples, StarsSlow, TownLights, Walker} from './art2';
import type {Cfg, Shot} from '../data/beats';

export type Ctx = {f: number; dur: number; p: number; abs: number; dt?: number; shot: Shot};
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>{children}</svg>
);
const rv = (v: unknown, p: number, d = 0): number => (Array.isArray(v) ? lerp(v[0], v[1], ease(p)) : typeof v === 'number' ? v : d);
const live = (c: Ctx) => !!c.shot.insert && c.dt !== undefined && c.dt >= 0 && c.dt < c.shot.insert.dur;
const fadeOut = (c: Ctx) => (live(c) ? clamp((c.shot.insert!.dur - c.dt!) / 0.3) : 0);
const Dark: React.FC<{o: number}> = ({o}) => (o > 0 ? <rect width={W} height={H} fill="#000" opacity={o} /> : null);
const figGeom = (d: number) => ({y: 900 + d * 500, h: 150 + d * 520});

/* Baris pohon/semak yang bergulir (parallax) */
const Row: React.FC<{frame: number; speed: number; y: number; scale: number; seed: string; color: string; n?: number}> = ({frame, speed, y, scale, seed, color, n = 9}) => {
  const it = useMemo(() => Array.from({length: n}, (_, i) => ({x: (i + random(seed + i) * 0.7) * (W / n), h: (180 + random(seed + 'h' + i) * 220) * scale, w: (70 + random(seed + 'w' + i) * 60) * scale})), [n, scale, seed]);
  const off = -((frame * speed) % W);
  return (
    <g fill={color}>
      {[0, W].map((b) => (
        <g key={b} transform={`translate(${off + b},${y})`}>
          {it.map((t, i) => <g key={i} transform={`translate(${t.x},0)`}><rect x={-4} y={-t.h} width={8} height={t.h} /><ellipse cx={0} cy={-t.h} rx={t.w * 1.3} ry={t.w * 0.85} /><ellipse cx={t.w * 0.7} cy={-t.h * 0.8} rx={t.w} ry={t.w * 0.7} /></g>)}
        </g>
      ))}
    </g>
  );
};

/* ================= bukit / langit ================= */
const HillView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p, shot} = ctx, c = shot.cfg;
  const ph = lerp(shot.phase![0], shot.phase![1], ease(p));
  const br = rv(c.bright, p, 1);
  return (
    <Svg>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={f} phase={ph} moon={!!c.moon} moonX={c.moonX ?? 820} moonY={rv(c.moonY, p, 400)} />
      {c.clouds ? <CloudsDrift frame={f} y={c.cloudY ?? 240} h={420} o={c.clouds} n={7} color="#101a28" /> : null}
      <Hills frame={f} peakX={c.peakX ?? 540} baseY={960} fog={rv(c.fog, p, 0.4)} />
      <rect x={0} y={1010} width={W} height={H - 1010} fill="#04080c" />
      <Trees side="l" seed="hl" baseY={1500} scale={1.1} count={4} frame={f} />
      <Trees side="r" seed="hr" baseY={1500} scale={1.1} count={4} frame={f} />
      {c.town ? <TownLights frame={f} y={1040} w={800} n={34} o={0.7} /> : null}
      <Fog frame={f} y={880} h={360} o={rv(c.fog, p, 0.4) * 0.8} speed={0.9} />
      <Rain frame={f} o={rv(c.rain, p, 0)} />
      <Dark o={1 - br} />
    </Svg>
  );
};

const SkyView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p, shot} = ctx, c = shot.cfg;
  return (
    <Svg>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={f} phase={shot.phase![1]} moon moonX={c.moonX ?? 700} moonY={rv(c.moonY, p, 480)} glow={0.5} />
      <StarsSlow frame={f} o={0.9} />
      <CloudsDrift frame={f} y={200} h={500} o={0.55} speed={0.6} n={6} color="#0e1824" />
      <CloudsDrift frame={f} y={620} h={500} o={0.7} speed={1.3} n={6} color="#070d15" />
      <Hills frame={f} peakX={-500} baseY={1380} fog={0.5} layers={2} />
      <rect x={0} y={1420} width={W} height={H - 1420} fill="#030609" />
      <Fog frame={f} y={1250} h={300} o={rv(c.fog, p, 0.5)} />
      <Dark o={1 - rv(c.bright, p, 1)} />
    </Svg>
  );
};

const RidgeView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p, dt, shot} = ctx, c = shot.cfg;
  const base = c.baseY ?? 1120, px = c.peakX ?? 640, ph = c.peakH ?? 520;
  const sl = shot.insert?.kind === 'slope' && live(ctx);
  return (
    <Svg>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={f} phase={shot.phase![1]} moon={!!c.moon} moonX={c.moonX ?? 300} moonY={rv(c.moonY, p, 420)} glow={0.3} />
      <StarsSlow frame={f} o={0.8} n={50} />
      <Hills frame={f} peakX={px} baseY={base} peakH={ph} peakW={240} fog={rv(c.fog, p, 0.5)} rim={0.35} />
      <rect x={0} y={base + 50} width={W} height={H - base - 50} fill="#03070a" />
      {c.town ? <TownLights frame={f} y={base + 20} w={900} n={40} o={0.8} /> : null}
      {sl ? <Woman x={px - 70} y={ridgeAt(px - 70, px, base, ph, 240) + 6} h={96} pose="down" frame={f} ghost opacity={fadeOut(ctx)} /> : null}
      <Fog frame={f} y={base - 160} h={300} o={rv(c.fog, p, 0.5)} speed={0.8} />
      <Fog frame={f} y={base + 60} h={300} o={0.4} speed={1.2} />
      <Rain frame={f} o={rv(c.rain, p, 0)} n={60} />
      <Dark o={1 - rv(c.bright, p, 1)} />
      {void dt}
    </Svg>
  );
};

const TownView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p, shot} = ctx, c = shot.cfg;
  return (
    <Svg>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={f} phase={shot.phase![1]} moon={false} />
      <StarsSlow frame={f} o={0.7} n={50} />
      <Hills frame={f} peakX={80} baseY={1000} peakH={220} peakW={200} fog={0.5} layers={2} />
      <rect x={0} y={1030} width={W} height={H - 1030} fill="#03070a" />
      <TownLights frame={f} y={1070} w={1000} n={60} o={0.95} />
      <TownLights frame={f} y={1160} w={900} n={40} o={0.8} cx={480} />
      <TownLights frame={f} y={1270} w={760} n={26} o={0.6} cx={640} />
      <Fog frame={f} y={980} h={360} o={rv(c.fog, p, 0.5)} speed={1.1} />
      <Fog frame={f} y={1180} h={360} o={rv(c.fog, p, 0.5) * 0.8} speed={0.7} />
      <Rain frame={f} o={0.3} n={50} />
    </Svg>
  );
};

/* ================= peta yang berevolusi ================= */
const MapView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p, abs, shot} = ctx, R = shot.cfg.reveal as Record<string, number>;
  const g = (t: number, d = 0.9) => clamp((abs - t) / d);
  const rings = useMemo(() => [0, 1, 2, 3, 4].map((k) => {
    let d = '';
    for (let a = 0; a <= 360; a += 12) {
      const r = (170 + k * 120) * (1 + 0.1 * Math.sin(a * 0.05 + k * 2) + 0.06 * Math.sin(a * 0.13 + k));
      d += `${a === 0 ? 'M' : 'L'}${(540 + Math.cos((a * Math.PI) / 180) * r).toFixed(1)},${(820 + Math.sin((a * Math.PI) / 180) * r * 0.9).toFixed(1)} `;
    }
    return d + 'Z';
  }), []);
  const nodes = [{x: 250, y: 560, n: 'TANJUNG DEWA', t: R.td}, {x: 590, y: 850, n: 'GUNUNG JULAHIT', t: R.gj}, {x: 840, y: 1170, n: 'SARANJANA', t: R.sj}];
  const L1 = clamp((abs - R.line) / 0.9), L2 = clamp((abs - R.line - 0.8) / 0.9);
  const sc = 0.9 + 0.2 * ease(p);
  const scan = (f / 110) % 1;
  const FF = '"Segoe UI","Helvetica Neue",Arial,sans-serif';
  const seg = (x1: number, y1: number, x2: number, y2: number, k: number) => (k > 0 ? (
    <g strokeLinecap="round">
      <line x1={x1} y1={y1} x2={lerp(x1, x2, k)} y2={lerp(y1, y2, k)} stroke="rgba(255,225,160,.28)" strokeWidth={12} />
      <line x1={x1} y1={y1} x2={lerp(x1, x2, k)} y2={lerp(y1, y2, k)} stroke="rgba(245,228,180,.9)" strokeWidth={3} strokeDasharray="14 12" strokeDashoffset={-f * 0.7} />
    </g>
  ) : null);
  return (
    <Svg>
      <rect width={W} height={H} fill="#05100f" />
      {Array.from({length: 13}, (_, i) => <line key={'v' + i} x1={i * 90} y1={0} x2={i * 90} y2={H} stroke="rgba(120,170,180,.07)" />)}
      {Array.from({length: 22}, (_, i) => <line key={'h' + i} x1={0} y1={i * 90} x2={W} y2={i * 90} stroke="rgba(120,170,180,.07)" />)}
      <g transform={`translate(540 820) scale(${sc}) translate(-540 -820)`}>
        {rings.map((d, i) => <path key={i} d={d} fill="none" stroke="rgba(130,190,200,.14)" strokeWidth={1.6} opacity={g(shot.start + i * 0.5, 1.5)} />)}
      </g>
      <ellipse cx={540} cy={820} rx={scan * 720} ry={scan * 650} fill="none" stroke="rgba(150,210,210,.5)" strokeWidth={2} opacity={(1 - scan) * 0.35} />
      <g opacity={g(shot.start + 0.4, 1.2) * (abs > R.td ? 0.55 : 1)} textAnchor="middle" fontFamily={FF} fill="#f2ead2">
        <text x={540} y={430} fontSize={50} fontWeight={700} letterSpacing={4}>KOTABARU</text>
        <text x={540} y={480} fontSize={26} letterSpacing={5} fill="#b8c9c6">KALIMANTAN SELATAN</text>
      </g>
      {seg(250, 560, 590, 850, L1)}
      {seg(590, 850, 840, 1170, L2)}
      {nodes.map((n, i) => {
        const o = g(n.t), pulse = 0.5 + 0.5 * Math.sin(f / 12 + i);
        return o > 0 ? (
          <g key={i} opacity={o}>
            <circle cx={n.x} cy={n.y} r={22 + pulse * 6} fill="none" stroke="rgba(240,220,170,.5)" strokeWidth={2} />
            <circle cx={n.x} cy={n.y} r={10} fill="#f0dca8" />
            <text x={n.x} y={n.y - 44} textAnchor="middle" fontFamily={FF} fontWeight={700} fontSize={34} letterSpacing={3} fill="#f2ead2">{n.n}</text>
          </g>
        ) : null;
      })}
      <text x={540} y={1360} textAnchor="middle" fontFamily={FF} fontSize={26} letterSpacing={5} fill="rgba(200,220,215,.6)" opacity={g(shot.start + 3)}>PETA KONSEPTUAL · TIDAK BERSKALA</text>
    </Svg>
  );
};

/* ================= jembatan ================= */
const BridgeView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p, shot} = ctx, c = shot.cfg;
  return (
    <Svg>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={f} phase={1} moon moonX={780} moonY={420} glow={0.25} />
      <CloudsDrift frame={f} y={260} h={300} o={0.4} speed={0.7} n={5} />
      <Hills frame={f} peakX={380} baseY={800} fog={0.6} layers={2} />
      <Bridge frame={f} fog={rv(c.fog, p, 0.5)} />
      {shot.insert?.kind === 'bridgeFig' && live(ctx) ? <Woman x={540} y={836} h={98} pose="down" frame={f} ghost opacity={fadeOut(ctx)} /> : null}
      <Rain frame={f} o={0.15} n={40} />
    </Svg>
  );
};

/* ================= lorong pohon ================= */
const TrailView: React.FC<{ctx: Ctx; cfg: Cfg; shadow?: boolean}> = ({ctx, cfg, shadow}) => {
  const {f, p} = ctx;
  const id = useUid();
  const t = f / 30, sp = cfg.speed ?? 0.5;
  const tr = Array.from({length: 14}, (_, i) => { const z = ((i + t * sp) % 14) / 14; return {k: Math.pow(z, 1.7), s: i % 2 ? 1 : -1, i}; }).sort((a, b) => a.k - b.k);
  const sway = Math.sin(f / 40) * 6;
  return (
    <Svg>
      <defs><radialGradient id={id}><stop offset="0" stopColor="#9db4d6" stopOpacity=".5" /><stop offset="1" stopColor="#9db4d6" stopOpacity="0" /></radialGradient></defs>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={f} phase={1} moon moonX={540} moonY={420} glow={0.3} />
      <Hills frame={f} peakX={cfg.peakX ?? 800} baseY={880} fog={0.6} layers={2} />
      <circle cx={540} cy={900} r={260} fill={`url(#${id})`} opacity={rv(cfg.glow, p, 0.6)} />
      <rect x={0} y={880} width={W} height={H - 880} fill="#05090c" />
      <polygon points={`${540 - 30},880 ${540 + 30},880 ${540 + 520},${H} ${540 - 520},${H}`} fill="#10171a" />
      <polygon points={`${540 - 10},880 ${540 + 10},880 ${540 + 120},${H} ${540 - 120},${H}`} fill="#1a2429" opacity={0.6} />
      {tr.map(({k, s, i}) => {
        const x = 540 + s * (90 + k * 820), h = 120 + k * 1700, w = 8 + k * 110, by = 880 + k * 1000;
        return (
          <g key={i} fill="#030507">
            <rect x={x - w / 2} y={by - h} width={w} height={h} />
            <ellipse cx={x + sway * k} cy={by - h} rx={w * 3} ry={w * 1.8} />
          </g>
        );
      })}
      <Fog frame={f} y={760} h={320} o={rv(cfg.fog, p, 0.5)} speed={0.9} />
      <Fog frame={f} y={1100} h={380} o={0.35} speed={1.3} />
      {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={i < 2 ? 40 + i * 90 : W - 40 - (i - 2) * 90} cy={1620 + (i % 2) * 90} rx={170} ry={36} fill="#010203" transform={`rotate(${(i < 2 ? -1 : 1) * (24 + Math.sin(f / 30 + i) * 6)} ${i < 2 ? 40 : W - 40} 1700)`} />)}
      {shadow ? <Woman x={lerp(450, 640, clamp(ctx.dt ?? 0, 0, 1))} y={985} h={130} pose="down" frame={f} ghost opacity={0.9} /> : null}
      <Rain frame={f} o={rv(cfg.rain, p, 0.3)} n={60} />
    </Svg>
  );
};

/* ================= lampu dekat + ngengat ================= */
const LampView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p, shot} = ctx, c = shot.cfg;
  const glow = rv(c.glow, p, 1);
  const hx = 610, hy = 430;
  const cone = `${hx - 50},${hy + 14} ${hx + 50},${hy + 14} ${hx + 440},1500 ${hx - 440},1500`;
  const id = useUid();
  const fig = shot.insert?.kind === 'lampFig' && live(ctx);
  return (
    <Svg>
      <defs>
        <radialGradient id={id}><stop offset="0" stopColor="#ffe3b0" stopOpacity=".9" /><stop offset=".3" stopColor="#ffbf70" stopOpacity=".35" /><stop offset="1" stopColor="#ffbf70" stopOpacity="0" /></radialGradient>
        <linearGradient id={id + 'c'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd9a0" stopOpacity=".42" /><stop offset="1" stopColor="#ffd9a0" stopOpacity="0" /></linearGradient>
      </defs>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={f} phase={1} moon={false} />
      <CloudsDrift frame={f} y={200} h={300} o={0.35} n={5} />
      <Hills frame={f} peakX={-400} baseY={920} fog={0.4} layers={2} />
      <WetRoad frame={f} hz={920} scroll={0} lampX={hx + 40} lampGlow={glow * 0.8} />
      <Streetlight x={780} y={990} h={170} glow={0.7} dir={-1} />
      {fig ? <Woman x={700} y={996} h={120} pose="down" frame={f} opacity={fadeOut(ctx)} /> : null}
      <polygon points={cone} fill={`url(#${id}c)`} opacity={glow} />
      <circle cx={hx} cy={hy} r={620} fill={`url(#${id})`} opacity={glow * 0.8} />
      <Puddle x={hx} y={1500} rx={380} ry={62} frame={f} warm={0.35 * glow} ripples={3} />
      <path d={`M207,${H} L207,560 Q207,430 380,${hy + 10} L${hx - 40},${hy + 4}`} stroke="#04070a" strokeWidth={30} fill="none" strokeLinecap="round" />
      <ellipse cx={hx} cy={hy + 6} rx={78} ry={26} fill="#04070a" />
      <ellipse cx={hx} cy={hy + 14} rx={56} ry={9} fill="#fff1d4" opacity={0.3 + 0.65 * glow} />
      <ConeRain frame={f} points={cone} o={0.55 * glow} />
      <Moths frame={f} cx={hx} cy={hy + 10} n={14} R={170} o={0.9} />
      <Fog frame={f} y={1000} h={340} o={0.35} speed={1.1} />
      <Rain frame={f} o={0.45} n={70} />
    </Svg>
  );
};

/* ================= jalan (lebar / medium / sebaliknya) ================= */
const RoadView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p, dt, shot} = ctx, c = shot.cfg;
  const hz = 860, lamp = c.lamp as {x: number; d: number; glow: number} | undefined;
  const glow = lamp ? lamp.glow : 0;
  const lg = lamp ? figGeom(lamp.d) : null;
  const mountX: number = c.mount ?? -600;
  const kind = shot.insert?.kind;
  const lv = live(ctx);
  const fig = c.fig as {d: number; d2?: number; x?: number; pose: Pose; dir?: 1 | -1; turn?: boolean; jumpD?: number} | undefined;
  let figOn = !!fig, d = fig?.d ?? 0, pose: Pose = fig?.pose ?? 'down';
  if (fig) {
    if (fig.d2 !== undefined) d = lerp(fig.d, fig.d2, ease(p));
    if (c.waveUntil !== undefined) pose = p < c.waveUntil ? 'wave' : 'down';
    if (c.poseSeq) pose = p < c.poseSeq[0] ? 'down' : p < c.poseSeq[1] ? 'raise' : 'point';
    if (kind === 'vanish' && dt !== undefined && dt >= 0) figOn = false;
    if (kind === 'closer' && dt !== undefined && dt >= 0 && fig.jumpD !== undefined) d = fig.jumpD;
  }
  const g = figGeom(d);
  const ghost = c.ghost as {d: number; x: number} | undefined;
  const hand = kind === 'hand' && lv;
  const slide = hand ? easeOut(dt! / 0.22) : 0;
  return (
    <Svg>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={f} phase={1} moon={false} />
      <StarsSlow frame={f} o={0.6} n={40} />
      <Hills frame={f} peakX={mountX} baseY={880} fog={0.5} layers={c.mount ? 3 : 2} />
      {c.town ? <TownLights frame={f} y={870} w={900} n={44} o={0.9} /> : null}
      <Fog frame={f} y={hz - 150} h={320} o={rv(c.fog, p, 0.35)} speed={0.9} />
      <Trees side="l" seed="rl" baseY={940} scale={0.75} count={6} frame={f} />
      <Trees side="r" seed="rr" baseY={940} scale={0.75} count={6} frame={f} />
      <WetRoad frame={f} hz={hz} scroll={c.scroll ?? 0} lampX={lamp ? lamp.x + 60 : undefined} lampGlow={glow} />
      {lamp && lg ? <Streetlight x={lamp.x} y={lg.y} h={lg.h * 1.55} glow={glow} dir={lamp.x < 540 ? 1 : -1} /> : null}
      {c.puddle ? <g><Puddle x={500} y={1210} rx={210} ry={34} frame={f} warm={lamp ? 0.3 : 0.08} /><Puddle x={720} y={1580} rx={320} ry={52} frame={f} warm={lamp ? 0.22 : 0.06} ripples={3} /></g> : null}
      {fig && figOn ? <Woman x={(fig.x ?? 540) + (c.drift ? ease(p) * c.drift : 0)} y={g.y} h={g.h} pose={pose} dir={fig.dir} turn={fig.turn} frame={f} reflect rim={0.4} /> : null}
      {ghost && kind === 'ghost' && lv ? <Woman x={ghost.x} y={figGeom(ghost.d).y} h={figGeom(ghost.d).h} pose="down" frame={f} ghost opacity={fadeOut(ctx)} /> : null}
      <Fog frame={f} y={1100} h={380} o={rv(c.fog, p, 0.35) * 0.6} speed={1.3} />
      {c.ots ? (
        <g transform={`translate(0,${Math.sin(f / 40) * 5})`}>
          <path d="M-80,1920 L-80,1340 C0,1250 110,1230 190,1290 C250,1340 270,1440 250,1560 C235,1680 300,1800 370,1920 Z" fill="#020304" stroke="rgba(190,205,225,.28)" strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
          <ellipse cx={120} cy={1235} rx={100} ry={122} fill="#020304" stroke="rgba(190,205,225,.28)" strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
        </g>
      ) : null}
      {c.rack ? <g opacity={1 - ease(clamp(p * 1.3))}><Trees side="l" seed="fl" baseY={1500} scale={2.1} count={2} color="#010203" frame={f} /><Trees side="r" seed="fr" baseY={1500} scale={2.1} count={2} color="#010203" frame={f} /></g> : null}
      <Rain frame={f} o={rv(c.rain, p, 0.6)} />
      {hand ? <g opacity={fadeOut(ctx)}><Hand x={880} y={1900 - slide * 560} s={1.15} rot={-18} frame={f} /></g> : null}
    </Svg>
  );
};

/* ================= side-view (berjalan paralel) ================= */
const SideView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p, shot} = ctx, c = shot.cfg;
  const id = useUid();
  const lampX = ((600 - f * 3.2) % 1500 + 1500) % 1500 - 200;
  return (
    <Svg>
      <defs><radialGradient id={id}><stop offset="0" stopColor="#ffcf8a" stopOpacity=".55" /><stop offset="1" stopColor="#ffcf8a" stopOpacity="0" /></radialGradient></defs>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={f} phase={1} moon={false} />
      <TownLights frame={f} y={930} w={900} n={36} o={0.6} />
      <Row frame={f} speed={0.5} y={1060} scale={1.2} seed="sv1" color="#05090d" />
      <Row frame={f} speed={1.1} y={1150} scale={1.5} seed="sv2" color="#03060a" n={7} />
      <rect x={0} y={1180} width={W} height={H - 1180} fill="#070c10" />
      {Array.from({length: 22}, (_, i) => { const x = (((i * 70 - f * 6) % 1540) + 1540) % 1540 - 100; return <rect key={i} x={x} y={1060} width={6} height={130} fill="#020304" />; })}
      <rect x={0} y={1100} width={W} height={6} fill="#020304" />
      <rect x={0} y={1160} width={W} height={6} fill="#020304" />
      <circle cx={lampX} cy={600} r={420} fill={`url(#${id})`} opacity={0.8} />
      <rect x={lampX - 8} y={600} width={16} height={620} fill="#020304" />
      <ellipse cx={lampX} cy={1330} rx={380} ry={50} fill="#ffcf8a" opacity={0.14} />
      <Walker x={540} y={1450} h={560} frame={f} />
      <Row frame={f} speed={3.2} y={1990} scale={1.1} seed="sv3" color="#010203" n={5} />
      <Fog frame={f} y={1000} h={340} o={rv(c.fog, p, 0.4)} speed={1.2} />
      <Rain frame={f} o={rv(c.rain, p, 0.7)} />
    </Svg>
  );
};

/* ================= taman kota generik ================= */
const ParkView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p, shot} = ctx, c = shot.cfg;
  const id = useUid();
  return (
    <Svg>
      <defs><radialGradient id={id}><stop offset="0" stopColor="#ffcf8a" stopOpacity=".5" /><stop offset="1" stopColor="#ffcf8a" stopOpacity="0" /></radialGradient></defs>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={f} phase={1} moon moonX={300} moonY={420} glow={0.2} />
      <CloudsDrift frame={f} y={240} h={300} o={0.35} n={5} />
      <TownLights frame={f} y={960} w={900} n={30} o={0.5} />
      <Row frame={f} speed={0.35} y={1050} scale={1.3} seed="pk1" color="#04080c" />
      <circle cx={760} cy={820} r={300} fill={`url(#${id})`} opacity={rv(c.glow, p, 0.9)} />
      <rect x={752} y={820} width={16} height={380} fill="#020304" />
      <rect x={0} y={1140} width={W} height={H - 1140} fill="#060a0e" />
      {Array.from({length: 26}, (_, i) => { const x = (((i * 64 - f * 1.6) % 1664) + 1664) % 1664 - 100; return <rect key={i} x={x} y={1040} width={9} height={220} fill="#010203" />; })}
      <rect x={0} y={1060} width={W} height={8} fill="#010203" />
      <rect x={0} y={1230} width={W} height={8} fill="#010203" />
      <g fill="#010203" transform={`translate(${((420 - f * 1.6) % 1664)},1260)`}><rect x={0} y={-60} width={260} height={14} /><rect x={10} y={-46} width={10} height={46} /><rect x={240} y={-46} width={10} height={46} /><rect x={0} y={-110} width={260} height={10} /></g>
      <Row frame={f} speed={2.6} y={1990} scale={1.1} seed="pk3" color="#010203" n={5} />
      <Fog frame={f} y={1000} h={380} o={rv(c.fog, p, 0.4)} speed={1} />
      <Rain frame={f} o={0.55} n={70} />
    </Svg>
  );
};

/* ================= genangan + riak + sepatu ================= */
const PuddleView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p} = ctx;
  const sy = lerp(1900, 1250, easeOut(clamp((p - 0.12) / 0.3)));
  return (
    <Svg>
      <rect width={W} height={H} fill="#05080b" />
      <WetRoad frame={f} hz={520} scroll={0} lampX={540} lampGlow={0.55} sheen={1} />
      <Puddle x={540} y={1190} rx={480} ry={160} frame={f} warm={0.38} ripples={0} />
      <Ripples frame={f} x={540} y={1190} rx={480} ry={160} />
      <Shoes x={540} y={sy} s={1.05} frame={p > 0.4 ? f : 0} />
      <Fog frame={f} y={560} h={300} o={0.35} />
      <Rain frame={f} o={0.7} n={90} />
    </Svg>
  );
};

/* ================= jalan dari atas ================= */
const TopDownView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p, shot} = ctx, c = shot.cfg;
  const id = useUid();
  const t = f / 30, glow = rv(c.glow, p, 1);
  const pools = Array.from({length: 4}, (_, i) => ({y: ((i * 560 + t * 70) % 2240) - 160, x: i % 2 ? 190 : 890}));
  const pud = Array.from({length: 4}, (_, i) => ({y: ((i * 600 + 200 + t * 70) % 2400) - 200, x: 360 + ((i * 173) % 360)}));
  return (
    <Svg>
      <defs><radialGradient id={id}><stop offset="0" stopColor="#ffd9a0" stopOpacity=".6" /><stop offset="1" stopColor="#ffd9a0" stopOpacity="0" /></radialGradient></defs>
      <rect width={W} height={H} fill="#04070a" />
      <g transform="rotate(7 540 960) translate(-60 -60) scale(1.14)">
        <rect x={250} y={-200} width={580} height={H + 400} fill="#0f171d" />
        <rect x={244} y={-200} width={8} height={H + 400} fill="rgba(200,210,220,.25)" />
        <rect x={828} y={-200} width={8} height={H + 400} fill="rgba(200,210,220,.25)" />
        {Array.from({length: 9}, (_, i) => <rect key={i} x={536} y={((i * 260 + t * 70) % 2340) - 200} width={8} height={120} fill="#e8dcb8" opacity={0.4} />)}
        {pools.map((a, i) => <circle key={i} cx={a.x} cy={a.y} r={330} fill={`url(#${id})`} opacity={glow * 0.8} />)}
        {pud.map((a, i) => <g key={i}><Puddle x={a.x} y={a.y} rx={120} ry={80} frame={f} warm={0.25} ripples={2} /></g>)}
      </g>
      <Rain frame={f} o={rv(c.rain, p, 0.6)} n={100} />
    </Svg>
  );
};

/* ================= lengan menunjuk (foreground) ================= */
const PointView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {f, p, shot} = ctx, c = shot.cfg;
  const pose: Pose = p < 0.22 ? 'down' : p < 0.5 ? 'raise' : 'point';
  return (
    <Svg>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={f} phase={1} moon moonX={300} moonY={400} glow={0.25} />
      <StarsSlow frame={f} o={0.7} n={50} />
      <Hills frame={f} peakX={c.peakX ?? 800} baseY={1000} fog={0.5} rim={0.35} />
      <TownLights frame={f} y={1030} w={700} n={30} o={0.6} cx={640} />
      <rect x={0} y={1040} width={W} height={H - 1040} fill="#03070a" />
      <Fog frame={f} y={900} h={320} o={0.5} speed={0.8} />
      <Woman x={300} y={1950} h={1320} pose={pose} dir={1} frame={f} rim={0.45} />
      <Rain frame={f} o={0.5} n={80} />
    </Svg>
  );
};

/* ================= renderer ================= */
export const SceneView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const {shot} = ctx;
  let base: React.ReactNode;
  switch (shot.kind) {
    case 'hill': base = <HillView ctx={ctx} />; break;
    case 'sky': base = <SkyView ctx={ctx} />; break;
    case 'ridge': base = <RidgeView ctx={ctx} />; break;
    case 'town': base = <TownView ctx={ctx} />; break;
    case 'map': base = <MapView ctx={ctx} />; break;
    case 'bridge': base = <BridgeView ctx={ctx} />; break;
    case 'trail': base = <TrailView ctx={ctx} cfg={shot.cfg} />; break;
    case 'lamp': base = <LampView ctx={ctx} />; break;
    case 'road': case 'ots': base = <RoadView ctx={ctx} />; break;
    case 'side': base = <SideView ctx={ctx} />; break;
    case 'park': base = <ParkView ctx={ctx} />; break;
    case 'puddle': base = <PuddleView ctx={ctx} />; break;
    case 'topdown': base = <TopDownView ctx={ctx} />; break;
    case 'point': base = <PointView ctx={ctx} />; break;
    default: base = null;
  }
  const cut = shot.insert?.kind === 'cutaway' && live(ctx);
  return (
    <>
      {base}
      {cut ? <div style={{position: 'absolute', inset: 0}}><TrailView ctx={{...ctx, f: ctx.f}} cfg={{speed: 0.9, glow: 0.7, rain: 0.35, fog: 0.5}} shadow /></div> : null}
    </>
  );
};
void useUid;

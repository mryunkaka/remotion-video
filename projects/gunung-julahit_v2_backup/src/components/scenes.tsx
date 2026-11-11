import React from 'react';
import {FONT_HEAD, FONT_SANS, H, W, Z} from '../lib/layout';
import {clamp, ease, easeOut, lerp} from '../lib/util';
import {Bridge, Fog, Hand, Hills, MapConcept, Puddle, Rain, Shoes, Sky, Streetlight, Trees, Woman, WetRoad, julahitRidgeY, useUid} from './art';
import type {Fig, RoadCfg, SceneCfg} from '../data/beats';
import {timeline} from '../data/beats';

export type Ctx = {f: number; dur: number; p: number; dt?: number; abs: number};
const svgStyle: React.CSSProperties = {position: 'absolute', inset: 0};
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={svgStyle}>{children}</svg>
);

/* ---------- gunung / bukit ---------- */
const HillView: React.FC<{cfg: Extract<SceneCfg, {k: 'hill'}>; ctx: Ctx}> = ({cfg, ctx}) => {
  const phase = cfg.phase2 !== undefined ? lerp(cfg.phase, cfg.phase2, ease(ctx.p)) : cfg.phase;
  return (
    <Svg>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={ctx.f} phase={phase} moon={cfg.moon} moonX={820} moonY={400} />
      <Hills frame={ctx.f} peakX={cfg.peakX ?? 540} baseY={960} fog={cfg.fog ?? 0.4} />
      <rect x={0} y={1010} width={W} height={H - 1010} fill="#04080c" />
      <Trees side="l" seed="hl" baseY={1500} scale={1.1} count={4} frame={ctx.f} />
      <Trees side="r" seed="hr" baseY={1500} scale={1.1} count={4} frame={ctx.f} />
      <Fog frame={ctx.f} y={880} h={360} o={(cfg.fog ?? 0.4) * 0.8} speed={0.9} />
      <Rain frame={ctx.f} o={cfg.rain ?? 0} />
      {cfg.dim ? <rect width={W} height={H} fill="#000" opacity={cfg.dim} /> : null}
    </Svg>
  );
};

/* ---------- jalan ---------- */
const figGeom = (d: number) => ({y: 900 + d * 500, h: 150 + d * 520});

const FigView: React.FC<{fig: Fig; ctx: Ctx}> = ({fig, ctx}) => {
  const {p, dt, f} = ctx;
  let d = fig.d, vis = true, op = 1;
  if (fig.d2 !== undefined) d = lerp(fig.d, fig.d2, ease(p));
  if (fig.show === 'untilJs') vis = dt === undefined || dt < 0;
  if (fig.show === 'afterJs') {
    vis = dt !== undefined && dt >= 0 && (fig.flash === undefined || dt < fig.flash);
    if (fig.flash !== undefined && dt !== undefined) op = clamp((fig.flash - dt) / 0.3);
  }
  if (fig.jumpD !== undefined && dt !== undefined && dt >= 0) d = fig.jumpD;
  if (!vis) return null;
  const g = figGeom(d);
  return <Woman x={fig.x ?? 540} y={g.y} h={g.h * (fig.scale ?? 1)} pose={fig.pose} dir={fig.dir} ghost={fig.ghost} turn={fig.turn} frame={f} opacity={op} reflect rim={0.4} />;
};

const RoadView: React.FC<{cfg: RoadCfg; ctx: Ctx}> = ({cfg, ctx}) => {
  const {f, p, dt} = ctx;
  const hz = 860;
  const lamp = cfg.lamp;
  let glow = lamp ? lamp.glow : 0;
  if (cfg.lampDim && lamp && dt !== undefined) glow = lamp.glow * (1 - 0.55 * Math.exp(-Math.pow((dt - 0.1) / 0.8, 2)));
  const lg = lamp ? figGeom(lamp.d) : null;
  const mountX = cfg.mount ?? -600;
  const hand = cfg.hand && dt !== undefined && dt >= 0;
  const slide = hand ? easeOut(dt! / 0.22) : 0;
  const handOp = hand ? clamp((1.5 - dt!) / 0.4) : 0;
  const slopeOn = cfg.slope && dt !== undefined && dt >= 0 && dt < 1.2;
  const ridgeY = julahitRidgeY(mountX - 40, mountX) - 80;

  if (cfg.shoes) {
    return (
      <Svg>
        <rect width={W} height={H} fill="#05080b" />
        <WetRoad frame={f} hz={520} scroll={0.5} lampX={540} lampGlow={0.5} sheen={1} />
        <Puddle x={540} y={1190} rx={470} ry={150} frame={f} warm={0.35} ripples={3} />
        <Shoes x={540} y={1250} s={1.05} frame={f} />
        <Fog frame={f} y={560} h={300} o={0.35} />
        <Rain frame={f} o={cfg.rain ?? 0.7} />
      </Svg>
    );
  }
  return (
    <Svg>
      <rect width={W} height={H} fill="#020407" />
      <Sky frame={f} phase={1} moon={false} />
      <Hills frame={f} peakX={mountX} baseY={880} fog={0.5} layers={cfg.mount ? 3 : 2} />
      <Fog frame={f} y={hz - 150} h={320} o={cfg.fog ?? 0.35} speed={0.9} />
      <Trees side="l" seed="rl" baseY={940} scale={0.75} count={6} frame={f} />
      <Trees side="r" seed="rr" baseY={940} scale={0.75} count={6} frame={f} />
      <WetRoad frame={f} hz={hz} scroll={cfg.scroll ?? 0} lampX={lamp ? lamp.x + 60 : undefined} lampGlow={glow} />
      {lamp && lg && <Streetlight x={lamp.x} y={lg.y} h={lg.h * 1.55} glow={glow} dir={lamp.x < 540 ? 1 : -1} />}
      {cfg.puddle && (
        <g>
          <Puddle x={500} y={1210} rx={210} ry={34} frame={f} warm={lamp ? 0.3 : 0.08} />
          <Puddle x={720} y={1580} rx={320} ry={52} frame={f} warm={lamp ? 0.22 : 0.06} ripples={3} />
        </g>
      )}
      {cfg.fig && <FigView fig={cfg.fig} ctx={ctx} />}
      {slopeOn && <Woman x={mountX - 40} y={ridgeY + 8} h={64} pose="down" frame={f} ghost opacity={clamp((1.2 - dt!) / 0.3)} />}
      <Fog frame={f} y={1100} h={380} o={(cfg.fog ?? 0.35) * 0.6} speed={1.3} />
      {cfg.ots && (
        <g transform={`translate(0,${Math.sin(f / 40) * 5})`}>
          <path d="M-80,1920 L-80,1340 C0,1250 110,1230 190,1290 C250,1340 270,1440 250,1560 C235,1680 300,1800 370,1920 Z" fill="#020304" stroke="rgba(190,205,225,.28)" strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
          <ellipse cx={120} cy={1235} rx={100} ry={122} fill="#020304" stroke="rgba(190,205,225,.28)" strokeWidth={2.5} vectorEffect="non-scaling-stroke" />
        </g>
      )}
      {cfg.rack && (
        <g opacity={1 - ease(clamp(p * 1.3))}>
          <Trees side="l" seed="fl" baseY={1500} scale={2.1} count={2} color="#010203" frame={f} />
          <Trees side="r" seed="fr" baseY={1500} scale={2.1} count={2} color="#010203" frame={f} />
        </g>
      )}
      <Rain frame={f} o={cfg.rain ?? 0.6} />
      {hand && <g opacity={handOp}><Hand x={880} y={1900 - slide * 560} s={1.15} rot={-18} frame={f} /></g>}
    </Svg>
  );
};

const BridgeView: React.FC<{cfg: Extract<SceneCfg, {k: 'bridge'}>; ctx: Ctx}> = ({cfg, ctx}) => (
  <Svg>
    <rect width={W} height={H} fill="#020407" />
    <Sky frame={ctx.f} phase={1} moon moonX={780} moonY={420} glow={0.25} />
    <Hills frame={ctx.f} peakX={380} baseY={800} fog={0.6} layers={2} />
    <Bridge frame={ctx.f} fog={cfg.fog ?? 0.5} />
    {cfg.fig && <FigView fig={{...cfg.fig, d: 0}} ctx={ctx} />}
    <Rain frame={ctx.f} o={0.15} n={40} />
  </Svg>
);

/* ---------- kartu fakta & end card ---------- */
const TextCard: React.FC<{lines: {t: string; s: number; c?: string; head?: boolean}[]; ctx: Ctx; top?: number}> = ({lines, ctx, top = 560}) => {
  const o = clamp(ctx.f / 14);
  return (
    <div style={{position: 'absolute', left: 70, right: 70, top, textAlign: 'center', opacity: o, transform: `translateY(${(1 - o) * 14}px)`}}>
      {lines.map((l, i) => (
        <div key={i} style={{fontFamily: l.head ? FONT_HEAD : FONT_SANS, fontWeight: l.head ? 900 : 600, fontSize: l.s, lineHeight: 1.22, letterSpacing: l.head ? 1 : 3, color: l.c ?? '#f1e8d0', margin: '14px 0', textShadow: '0 4px 22px rgba(0,0,0,.85)'}}>{l.t}</div>
      ))}
    </div>
  );
};
const CardBg: React.FC<{ctx: Ctx; phase?: number}> = ({ctx}) => (
  <Svg>
    <rect width={W} height={H} fill="#03080b" />
    <Sky frame={ctx.f} phase={1} moon moonX={540} moonY={300} glow={0.12} />
    <Hills frame={ctx.f} peakX={540} baseY={1100} fog={0.6} />
    <rect x={0} y={1150} width={W} height={H - 1150} fill="#04080c" />
    <rect width={W} height={H} fill="#000" opacity={0.55} />
    <Fog frame={ctx.f} y={1000} h={380} o={0.5} />
  </Svg>
);
const CardView: React.FC<{ctx: Ctx}> = ({ctx}) => (
  <>
    <CardBg ctx={ctx} />
    <TextCard ctx={ctx} top={520} lines={[
      {t: 'KESAKSIAN YANG DIBERITAKAN', s: 54, head: true},
      {t: '—', s: 44, c: '#c9a56a'},
      {t: 'BELUM MEMBUKTIKAN', s: 54, head: true, c: '#f0d9a0'},
      {t: 'PERISTIWA GAIB', s: 54, head: true, c: '#f0d9a0'},
    ]} />
  </>
);
const EndView: React.FC<{ctx: Ctx}> = ({ctx}) => {
  const afterCta = ctx.abs >= timeline.ctaStart;
  const g = Math.max(0, ctx.abs - timeline.ctaStart);
  const o2 = clamp(g / 0.5);
  return (
    <>
      <CardBg ctx={ctx} />
      {!afterCta && <TextCard ctx={ctx} top={560} lines={[{t: 'MENURUT KALIAN?', s: 76, head: true}, {t: 'Apa yang sebenarnya terjadi malam itu?', s: 40, c: '#d8d2c0'}]} />}
      {afterCta && (
        <div style={{position: 'absolute', left: 70, right: 70, top: 500, textAlign: 'center', opacity: o2}}>
          {['FOLLOW', 'LIKE', 'KOMEN', 'REPOST'].map((t, i) => {
            const k = clamp((g - i * 0.35) / 0.4);
            return (
              <div key={t} style={{margin: '18px auto', width: 560, padding: '14px 0', borderRadius: 60, border: '2px solid rgba(240,220,170,.6)', background: 'rgba(0,0,0,.35)', fontFamily: FONT_HEAD, fontWeight: 900, fontSize: 50, letterSpacing: 6, color: '#f3e8cc', opacity: k, transform: `translateY(${(1 - k) * 20}px)`}}>{t}</div>
            );
          })}
          <div style={{marginTop: 44, fontFamily: FONT_SANS, fontWeight: 600, fontSize: 38, letterSpacing: 2, color: '#d9d2bf', opacity: clamp((g - 1.6) / 0.6)}}>Punya cerita? DM atau tulis di komentar</div>
        </div>
      )}
    </>
  );
};

/* ---------- renderer ---------- */
export const SceneView: React.FC<{cfg: SceneCfg; ctx: Ctx}> = ({cfg, ctx}) => {
  switch (cfg.k) {
    case 'hill': return <HillView cfg={cfg} ctx={ctx} />;
    case 'road': return <RoadView cfg={cfg} ctx={ctx} />;
    case 'bridge': return <BridgeView cfg={cfg} ctx={ctx} />;
    case 'map': return <Svg><MapConcept frame={ctx.f} mode={cfg.mode} p={ctx.p} /></Svg>;
    case 'card': return <CardView ctx={ctx} />;
    case 'end': return <EndView ctx={ctx} />;
    case 'montage': {
      const n = cfg.parts.length;
      const seg = ctx.dur / n;
      const i = Math.min(n - 1, Math.floor(ctx.f / seg));
      const lf = ctx.f - i * seg;
      const sub: Ctx = {...ctx, f: lf, dur: seg, p: clamp(lf / seg), dt: undefined};
      const prev = i > 0 ? cfg.parts[i - 1] : null;
      const fade = clamp(lf / 6);
      return (
        <>
          {prev && <div style={{position: 'absolute', inset: 0, opacity: 1 - fade}}><SceneView cfg={prev} ctx={{...sub, f: seg + lf, p: 1}} /></div>}
          <div style={{position: 'absolute', inset: 0, opacity: prev ? fade : 1}}><SceneView cfg={cfg.parts[i]} ctx={sub} /></div>
        </>
      );
    }
  }
};
void useUid; void Z;

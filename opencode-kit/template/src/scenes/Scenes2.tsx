import React from 'react';
import {W, H, C, useT, prog, lerp, ease, easeOut, clamp, rnd, shake} from '../lib';
import {F} from '../fonts';
import AN from '../data/anchors.json';
import {Sky, Sea, Fog, Rays, Deep, Vignette, Grade, Rings, Splash} from '../components/Layers';
import {Wrap, Cam, Abs, Center, Rock, Island, Bubbles} from '../components/Common';
import {Seated, Standing, Portrait, Hand} from '../components/Datu';
import {Swordfish} from '../components/Creatures';
import {Kinetic, Fade, Rule} from '../components/UI';

type KF = [number, number, number, number][]; // t, x, y, rot
const kf = (t: number, a: KF) => {
  if (t <= a[0][0]) return {x: a[0][1], y: a[0][2], r: a[0][3]};
  for (let i = 0; i < a.length - 1; i++) {
    if (t <= a[i + 1][0]) { const u = ease(prog(t, a[i][0], a[i + 1][0])); return {x: lerp(a[i][1], a[i + 1][1], u), y: lerp(a[i][2], a[i + 1][2], u), r: lerp(a[i][3], a[i + 1][3], u)}; }
  }
  const l = a[a.length - 1]; return {x: l[1], y: l[2], r: l[3]};
};
const SurfaceWindow: React.FC<{t: number; o?: number; y?: number}> = ({t, o = 1, y = 0}) => (
  <div style={{position: 'absolute', left: 0, top: y, width: W, height: 640, opacity: o}}>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(235,252,255,0.98) 0%, rgba(150,225,235,0.7) 38%, rgba(30,120,140,0) 100%)'}} />
    <svg width={W} height={140} style={{position: 'absolute', left: 0, top: 378}}>{[0, 1, 2].map((i) => (<path key={i} d={`M0,${30 + i * 26} ${Array.from({length: 30}).map((_, k) => `L${k * 40},${30 + i * 26 + Math.sin(k * 0.9 + t * 1.6 + i) * 7}`).join(' ')}`} stroke="rgba(255,255,255,0.35)" strokeWidth="3" fill="none" />))}</svg>
    <div style={{position: 'absolute', left: 540, top: 410, transform: `translate(-50%,-100%) skewX(${Math.sin(t * 1.7) * 3}deg) scaleY(${1 + Math.sin(t * 2.3) * 0.03})`, filter: 'brightness(0.02)'}}><Seated t={t} w={250} /></div>
    <div style={{position: 'absolute', left: 540, top: 408, transform: 'translate(-50%,0) scaleY(-1)', filter: 'brightness(0.05)'}}><Rock w={430} /></div>
  </div>
);

export const Swordfish_: React.FC = () => {
  const t = useT(); const T0 = AN.tibatiba;
  const f = kf(t, [[54.9, 1700, 1750, 22], [56.3, 700, 1000, 8], [57.0, 620, 950, 2], [58.3, 480, 930, -2], [60.0, 330, 1010, 4], [61.2, 560, 1130, -6], [62.2, 760, 1100, 0], [63.0, 700, 860, 50], [64.0, 560, 320, 64]]);
  const vis = prog(t, T0 - 0.05, T0 + 0.1);
  const shadow = (1 - prog(t, T0 - 0.2, T0 + 0.2)) * prog(t, 53.2, 54.2);
  const sx = lerp(-500, 560, prog(t, 53.2, T0)); const camY = lerp(0, 30, prog(t, 53, 64)) - (t > 62.4 ? (t - 62.4) * 70 : 0);
  const flash = Math.max(0, 1 - (t - T0) * 5) * (t >= T0 ? 1 : 0);
  return (
    <Wrap>
      <Cam y={camY} s={1.06} oy={900}>
        <Deep t={t} top="#188a97" mid="#0a3a54" bottom="#020a12" rays={0.4} caustic={0.28} snow={70} light={1} />
        <SurfaceWindow t={t} />
        <div style={{position: 'absolute', left: sx - 700, top: 920, width: 1400, height: 200, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(1,8,14,0.78), rgba(1,8,14,0) 70%)', opacity: shadow}} />
        <Bubbles t={t} y0={1900} n={34} spread={1100} seed={3} o={0.5} />
        {vis > 0 && <Center x={f.x} y={f.y} r={f.r} o={vis} s={1}><Swordfish id="s1" w={1300} t={t} /></Center>}
        {vis > 0 && <Bubbles t={t} x0={f.x + 380} y0={f.y + 160} n={14} spread={260} seed={7} o={0.7 * vis} />}
      </Cam>
      <div style={{position: 'absolute', inset: 0, background: `rgba(220,250,255,${flash * 0.55})`}} />
      <Vignette o={0.75} /><Grade c="rgba(0,60,80,1)" o={0.22} />
    </Wrap>
  );
};

const jump = (t: number, t0: number, t1: number, a: [number, number], b: [number, number], h: number) => {
  if (t < t0 || t > t1) return null;
  const u = prog(t, t0, t1); const x = lerp(a[0], b[0], u); const y = lerp(a[1], b[1], u) - 4 * h * u * (1 - u);
  const vx = b[0] - a[0]; const vy = (b[1] - a[1]) - 4 * h * (1 - 2 * u);
  const flip = vx > 0; const r = flip ? Math.atan2(vy, vx) * 57.3 : Math.atan2(-vy, -vx) * 57.3;
  return {x, y, r, flip, u};
};
const camAt = (t: number) => {
  const S: [number, number, number, number, number][] = [[64, 1.05, 540, 1200, 0.01], [65.05, 1.38, 760, 900, 0.03], [66.05, 1.0, 540, 1200, 0], [66.65, 1.55, 480, 1150, 0.06], [68.4, 1.1, 700, 1300, 0], [68.95, 1.4, 760, 900, 0.02], [70.4, 1.0, 540, 1200, 0]];
  let c = S[0]; for (const s of S) if (t >= s[0]) c = s; return {s: c[1] + c[4] * (t - c[0]), ox: c[2], oy: c[3]};
};
export const Battle: React.FC = () => {
  const t = useT(); const cam = camAt(t); const sh = shake(t, 5 + (t > 66.6 && t < 68.4 ? 3 : 0), 2);
  const J1 = jump(t, 64.95, 66.45, [1250, 1650], [120, 1650], 900);
  const J2 = jump(t, 66.65, 68.05, [-250, 1500], [560, 1240], 650);
  const J3 = jump(t, 68.7, 70.6, [1300, 1650], [700, 1620], 1050);
  const hit = t - 68.05; const lean = hit > 0 ? -7 * Math.exp(-hit * 3) * Math.cos(hit * 9) : Math.sin(t * 6) * 0.8;
  const wave = t > 70.5 ? Math.exp(-Math.pow((t - 71.4) / 0.9, 2)) : 0;
  const fishes = [J1, J2, J3].filter(Boolean) as any[];
  const splashes: [number, number, number, number][] = [[65.0, 960, 1600, 1.2], [66.0, 430, 1510, 1.0], [66.45, 140, 1650, 1.1], [66.77, 640, 1510, 1.0], [68.05, 560, 1260, 1.6], [69.2, 900, 1600, 1.2], [70.6, 700, 1640, 2.4]];
  const flash = Math.max(0, 1 - (t - 68.05) * 6) * (t >= 68.05 ? 1 : 0) * 0.5 + Math.max(0, 1 - (t - 65.1) * 6) * (t >= 65.1 ? 1 : 0) * 0.35;
  return (
    <Wrap>
      <Cam s={cam.s} ox={cam.ox} oy={cam.oy} x={sh.x} y={sh.y} r={sh.r}>
        <Sky t={t} top="#03070d" mid="#142a38" bottom="#506a74" sunX={540} sunY={860} sunR={620} sun="rgba(255,200,140,0.3)" clouds={0.95} cloudY={100} horizon={1180} cloudSpeed={34} />
        <Fog t={t} y={1040} h={260} o={0.45} speed={16} />
        <Sea t={t} horizon={1180} far="#2b4854" near="#020d15" amp={2.4} speed={2} sunX={540} glint={0.2} id="bt" />
        <Abs x={430} y={1580} s={1.05}><Rock w={780} /></Abs>
        <Abs x={430} y={1395} r={lean} ox="50% 100%"><Standing t={t * 1.6} w={270} /></Abs>
        {fishes.map((f, i) => (<Center key={i} x={f.x} y={f.y} r={f.r}><div style={{transform: f.flip ? 'scaleX(-1)' : undefined}}><Swordfish id={'b' + i} w={920} t={t * 1.8} /></div></Center>))}
        {splashes.map((s, i) => (<Splash key={i} t={t} t0={s[0]} x={s[1]} y={s[2]} scale={s[3]} n={44} seed={i + 2} slow={i === 4 ? 0.6 : 1} />))}
        <Rings t={t} x={430} y={1570} w={520} n={3} />
        {wave > 0 && (<svg width={W} height={H} style={{position: 'absolute', inset: 0}}><defs><linearGradient id="bw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#eaf7fa" stopOpacity="0.9" /><stop offset="1" stopColor="#7fb6c4" stopOpacity="0.25" /></linearGradient></defs><path d={`M0,${H} L0,${1500 - 360 * wave} ${Array.from({length: 37}).map((_, k) => `L${k * 30},${1500 - 360 * wave + Math.sin(k * 0.5 + t * 4) * 36 * wave - Math.abs(k - 22) * 3 * wave}`).join(' ')} L${W},${H} Z`} fill="url(#bw)" /></svg>)}
      </Cam>
      <Rays t={t} x={540} y={700} n={5} o={0.1} len={900} spread={700} />
      <div style={{position: 'absolute', inset: 0, background: `rgba(235,250,255,${flash})`}} />
      <Vignette o={0.85} /><Grade o={0.22} />
    </Wrap>
  );
};

export const Kindness: React.FC = () => {
  const t = useT(); const ten = 1 - ease(prog(t, 71.9, AN.tidakmembunuh + 0.4)); const cut = prog(t, 76.95, 77.3);
  const hand = easeOut(prog(t, 77.1, 78.2));
  return (
    <Wrap>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - cut}}>
        <Cam s={lerp(1.0, 1.09, prog(t, 71.6, 77))} oy={760}>
          <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${ten > 0.5 ? '#0a1822' : '#16384a'}, #03090f)`, opacity: 1}} />
          <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 60% 36%, rgba(255,200,140,${0.1 + (1 - ten) * 0.38}), rgba(0,0,0,0) 60%)`}} />
          <Deep t={t} top="rgba(0,0,0,0)" mid="rgba(0,0,0,0)" bottom="rgba(0,0,0,0)" rays={0.0 + (1 - ten) * 0.25} caustic={0} snow={26} />
          <Center x={540} y={800} style={{WebkitMaskImage: 'linear-gradient(180deg,#000 74%,transparent)'}}><Portrait t={t} w={800} eyes="open" tension={ten} light={0.85 + (1 - ten) * 0.15} glow="rgba(255,214,150,0.65)" /></Center>
        </Cam>
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: cut}}>
        <Deep t={t} top="#1d8794" mid="#0a3a54" bottom="#02080e" rays={0.4} caustic={0.2} snow={40} />
        <Cam s={lerp(1.0, 1.08, prog(t, 77, 78.4))} ox={540} oy={800}>
          <div style={{position: 'absolute', left: 540 - 292 * 3.4, top: 800 - 130 * 3.4}}><Swordfish id="k1" w={3400} t={t * 0.4} wound={0.8} /></div>
          <div style={{position: 'absolute', left: lerp(-520, -120, hand), top: 900}}><Hand w={720} glow={0.0 + hand * 0.4} /></div>
        </Cam>
      </div>
      <Vignette o={0.8} /><Grade c="rgba(0,60,80,1)" o={0.15} />
    </Wrap>
  );
};

export const Healing: React.FC = () => {
  const t = useT(); const heal = prog(t, AN.mengobati, AN.melepaskan); const away = ease(prog(t, AN.melepaskan, 82.4));
  const fx = lerp(560, 1000, away), fy = lerp(1000, 1320, away);
  return (
    <Wrap>
      <Cam y={-away * 260} s={1.04} oy={900}>
        <Deep t={t} top={away > 0 ? '#1d8794' : '#25a0ad'} mid="#0c4660" bottom="#020a12" rays={0.55} caustic={0.3} snow={60} light={1} />
        <SurfaceWindow t={t} o={1 - away * 0.2} />
        <Center x={fx} y={fy} s={lerp(1.0, 0.62, away)} o={1 - away * 0.5} r={lerp(-3, 4, away)}>
          <div style={{transform: away > 0.02 ? 'scaleX(-1)' : undefined}}><Swordfish id="h1" w={1200} t={t * (1 - away * 0.3)} wound={1 - heal} glow={Math.sin(prog(t, AN.mengobati, AN.melepaskan + 0.3) * Math.PI) * 0.8} /></div>
        </Center>
        <div style={{position: 'absolute', left: lerp(-300, 20, easeOut(prog(t, 78.4, 78.9))) - away * 400, top: 980}}><Hand w={560} glow={Math.sin(heal * Math.PI) * 0.7} /></div>
        <Bubbles t={t} y0={1900} n={20} spread={900} seed={5} o={0.4} />
      </Cam>
      <Rays t={t} x={600} y={-60} n={9} o={0.3} len={1900} spread={1500} color="190,240,245" />
      <Vignette o={0.7} /><Grade c="rgba(40,70,60,1)" o={0.14} />
    </Wrap>
  );
};

export const Offer: React.FC = () => {
  const t = useT(); const A = t < 84.5; const B = t >= 84.5 && t < 85.9; const Cc = t >= 85.9 && t < 86.9; const D = t >= 86.9;
  const approach = ease(prog(t, 82.2, 84.4));
  const orb = easeOut(prog(t, 86.7, 87.6)); const pulse = 1 + Math.sin(t * 5) * 0.06;
  return (
    <Wrap>
      <Deep t={t} top="#1a7f8f" mid="#0a3a54" bottom="#020a12" rays={0.45} caustic={0.25} snow={60} />
      {(A || D) && (<Cam s={D ? lerp(1.0, 1.06, prog(t, 86.9, 88.2)) : 1} oy={900}>
        <SurfaceWindow t={t} />
        <Center x={lerp(1350, 760, approach)} y={1010} r={lerp(8, 0, approach)}><Swordfish id="o1" w={1250} t={t} /></Center>
        <Bubbles t={t} y0={1900} n={24} spread={1000} seed={9} o={0.45} />
        {D && (<><Center x={470} y={940} s={orb * pulse}><div style={{width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,245,210,1) 0, rgba(255,214,150,0.85) 18%, rgba(255,200,120,0.25) 45%, rgba(255,200,120,0) 70%)', mixBlendMode: 'screen'}} /></Center>
          {Array.from({length: 30}).map((_, i) => { const a = t * (0.8 + rnd(i, 1) * 1.2) + i; const r = 120 + rnd(i, 2) * 200; return <div key={i} style={{position: 'absolute', left: 470 + Math.cos(a) * r, top: 940 + Math.sin(a) * r * 0.55, width: 6, height: 6, borderRadius: '50%', background: '#ffe7b0', opacity: orb * (0.3 + 0.7 * rnd(i, 3)), boxShadow: '0 0 12px #ffd9a0'}} />; })}</>)}
      </Cam>)}
      {B && (<Cam s={lerp(1.0, 1.1, prog(t, 84.5, 85.9))} ox={540} oy={800}><div style={{position: 'absolute', left: 540 - 292 * 3.6, top: 800 - 130 * 3.6}}><Swordfish id="o2" w={3600} t={t * 0.5} /></div>
        <div style={{position: 'absolute', left: 120, top: 560, width: 600, height: 480, opacity: 0.22, background: 'radial-gradient(circle at 30% 40%, rgba(255,230,180,0.6), rgba(0,0,0,0) 60%)', mixBlendMode: 'screen'}} /></Cam>)}
      {Cc && (<Cam s={lerp(1.0, 1.06, prog(t, 85.9, 86.9))} oy={760}><div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(255,205,140,0.35), rgba(0,0,0,0) 60%)'}} /><Center x={540} y={800} style={{WebkitMaskImage: 'linear-gradient(180deg,#000 74%,transparent)'}}><Portrait t={t} w={800} eyes="open" tension={0.15} glow="rgba(180,235,245,0.6)" light={0.9} /></Center></Cam>)}
      <Vignette o={0.75} /><Grade c="rgba(0,60,80,1)" o={0.15} />
    </Wrap>
  );
};

export const Request: React.FC = () => {
  const t = useT(); const p = prog(t, 88.2, 93.35); const cut = prog(t, 93.1, 93.7); const land = prog(t, 93.5, 95.5);
  return (
    <Wrap>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - cut}}>
        <Cam s={lerp(1.0, 1.2, ease(p))} ox={540} oy={560}>
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#0a2230,#02070c)'}} />
          <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 56% 34%, rgba(255,200,140,${lerp(0.18, 0.06, prog(t, 88.2, 91.4))}), rgba(0,0,0,0) 58%)`}} />
          <Center x={540} y={800} style={{WebkitMaskImage: 'linear-gradient(180deg,#000 72%,transparent)'}}><Portrait t={t} w={800} eyes="open" tension={0.05} light={lerp(0.9, 0.55, prog(t, 88.2, 91.4))} glow="rgba(255,214,150,0.55)" /></Center>
        </Cam>
        <Vignette o={0.95} />
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: cut}}>
        <Cam s={lerp(1.0, 1.08, land)} oy={1000}>
          <Sky t={t} top="#071626" mid="#33586a" bottom="#e0c49a" sunX={600} sunY={700} sunR={640} sun={`rgba(255,226,175,${0.3 + land * 0.4})`} clouds={0.7} cloudY={100} horizon={1000} cloudSpeed={6} />
          <div style={{position: 'absolute', left: 360, top: 690, opacity: 0.25 + land * 0.35, filter: 'saturate(0.8)'}}><Island w={640} c1="#79979f" c2="#79979f" c3="#79979f" lit="rgba(255,235,200,0.55)" /></div>
          <Fog t={t} y={860} h={300} o={0.8} speed={3} />
          <Sea t={t} horizon={1000} far="#d3bd98" near="#06202e" amp={0.5} sunX={600} glint={0.5} id="rq" />
        </Cam>
        <Rays t={t} x={620} y={160} n={8} o={0.18 + land * 0.35} len={1300} spread={600} />
        <Vignette o={0.6} />
      </div>
      <Grade o={0.14} />
    </Wrap>
  );
};

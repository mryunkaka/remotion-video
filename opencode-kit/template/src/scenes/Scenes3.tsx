import React from 'react';
import {W, H, C, useT, prog, lerp, ease, easeOut, clamp, rnd, mix, rgb} from '../lib';
import {F} from '../fonts';
import AN from '../data/anchors.json';
import {Sky, Sea, Fog, Rays, Deep, Vignette, Grade, Rings, Splash} from '../components/Layers';
import {Wrap, Cam, Abs, Center, Rock, Island, Boat, Moon, Stars, Tag, Bubbles} from '../components/Common';
import {Swordfish, SmallFish, Jelly, Manta} from '../components/Creatures';
import {Kinetic, Fade, Rule, Crescent, Heart, Follow, Share, Comment} from '../components/UI';

export const Gather: React.FC = () => {
  const t = useT(); const a = 95.5, b = AN.muncullah + 0.3; const p = prog(t, a, b); const sh = ease(p) * 1500;
  const top = mix([10, 58, 82], [60, 190, 200], p), mid = mix([6, 36, 52], [20, 120, 140], p);
  return (
    <Wrap>
      <Deep t={t} top={rgb(top)} mid={rgb(mid)} bottom="#020a12" rays={0.15 + p * 0.6} caustic={p * 0.4} snow={60} light={0.5 + p * 0.5} rayX={540} />
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${sh}px)`}}>
        {/* seabed */}
        <svg width={W} height={500} style={{position: 'absolute', left: 0, top: 1560}}><path d={`M0,120 C180,40 340,110 520,60 C720,10 880,100 1080,50 L1080,500 L0,500 Z`} fill="#0c1a22" /><path d="M0,120 C180,40 340,110 520,60 C720,10 880,100 1080,50" stroke="rgba(120,190,200,0.3)" strokeWidth="3" fill="none" /></svg>
        <Abs x={180} y={1660} s={0.6}><Rock w={500} /></Abs><Abs x={900} y={1690} s={0.5}><Rock w={500} /></Abs>
        {Array.from({length: 90}).map((_, i) => {
          const sx = rnd(i, 1) * W, sy = 200 + rnd(i, 2) * 1500; const k = easeOut(prog(t, a, a + 3 + rnd(i, 3) * 3)); const x = lerp(sx, 540 + (rnd(i, 4) - 0.5) * 620, k * 0.7) + Math.sin(t * 1.4 + i) * 22; const y = sy - k * 220 - (t - a) * (20 + rnd(i, 5) * 40);
          return <Center key={i} x={x} y={y} r={-20 + rnd(i, 6) * 6 + Math.sin(t * 2 + i) * 4}><SmallFish s={0.7 + rnd(i, 7) * 1.1} t={t + i} o={0.5 + rnd(i, 8) * 0.4} flip={x > sx} color={i % 3 ? '#a9c7d1' : '#d8c07a'} /></Center>;
        })}
        {[0, 1, 2, 3].map((i) => <Center key={'j' + i} x={160 + i * 270 + Math.sin(t + i) * 30} y={500 + i * 330 - (t - a) * 30} o={0.8}><Jelly t={t} s={0.9 + i * 0.12} seed={i + 1} hue={i % 2 ? '170,235,245' : '240,190,230'} /></Center>)}
        {[0, 1].map((i) => <Center key={'m' + i} x={lerp(i ? 1300 : -300, i ? 760 : 320, easeOut(prog(t, a, b)))} y={800 + i * 520 - (t - a) * 24} r={i ? 8 : -6}><Manta t={t + i} s={1.0 - i * 0.2} /></Center>)}
      </div>
      <Center x={lerp(500, 540, p)} y={lerp(1000, 820, p)} r={58 + Math.sin(t * 2) * 2}><Swordfish id="g1" w={1250} t={t} /></Center>
      <Bubbles t={t} y0={1950} n={30} spread={1100} seed={11} o={0.45} />
      <Rays t={t} x={540} y={-100} n={9} o={0.2 + p * 0.5} len={2100} spread={1500} color="190,240,245" />
      <Vignette o={0.7} /><Grade c="rgba(0,70,90,1)" o={0.18} />
    </Wrap>
  );
};

export const Birth: React.FC = () => {
  const t = useT(); const H0 = AN.muncullah; const rise = easeOut(prog(t, H0 + 0.15, H0 + 4.3)); const sur = prog(t, H0 - 0.25, H0 + 0.25); const surge = Math.exp(-Math.max(0, t - H0) * 0.55) * (t >= H0 ? 1 : 0);
  const flash = Math.max(0, 1 - Math.abs(t - H0 - 0.05) * 3.5);
  const sunB = prog(t, H0 + 3.5, H0 + 6);
  return (
    <Wrap>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - sur}}><Deep t={t} top="#5ed0d6" mid="#1d8a9c" bottom="#0a3a54" rays={0.8} caustic={0.4} snow={80} /></div>
      <div style={{position: 'absolute', inset: 0, opacity: sur}}>
        <Cam s={lerp(1.0, 1.12, ease(prog(t, H0, H0 + 5.6)))} y={lerp(0, 230, ease(prog(t, H0 + 0.2, H0 + 5)))} oy={1100}>
          <Sky t={t} top="#12304c" mid="#d9966a" bottom="#ffe6b8" sunX={540} sunY={700} sunR={820} sun={`rgba(255,228,170,${0.6 + sunB * 0.35})`} clouds={0.8} cloudY={60} horizon={1120} cloudSpeed={20} />
          <div style={{position: 'absolute', left: 540, top: 1120 + (1 - rise) * 760, transform: 'translate(-50%,-100%)'}}><Island w={1240} c1="#4a7a78" c2="#245a58" c3="#0f3a3a" lit="rgba(255,225,170,0.7)" /></div>
          {/* waterfalls streaming off the rising land */}
          {[330, 470, 620, 780].map((x, i) => (<div key={i} style={{position: 'absolute', left: x, top: 1120 - 330 + (1 - rise) * 760, width: 7 + i % 2 * 4, height: 330 * (1 - rise * 0.6), background: 'linear-gradient(180deg, rgba(240,252,255,0.9), rgba(240,252,255,0))', opacity: (1 - prog(t, H0 + 4.2, H0 + 5.6)) * rise * 0.9}} />))}
          <Fog t={t} y={1000} h={260} o={0.45} speed={14} />
          <Sea t={t} horizon={1120} far="#e0a874" near="#06222f" amp={1.2 + surge * 2.4} speed={1.5 + surge} sunX={540} glint={0.6} id="bi" />
          <Rings t={t} x={540} y={1180} w={820} n={4} period={2.6} o={0.6} />
          <Splash t={t} t0={H0 + 0.05} x={260} y={1230} scale={2} n={60} seed={4} /><Splash t={t} t0={H0 + 0.3} x={540} y={1180} scale={2.4} n={70} seed={5} /><Splash t={t} t0={H0 + 0.6} x={830} y={1230} scale={2} n={60} seed={6} />
        </Cam>
        <Rays t={t} x={540} y={420} n={10} o={0.25 + sunB * 0.35} len={1500} spread={1400} />
        <Vignette o={0.6} /><Grade c="rgba(255,150,60,1)" o={0.08} />
      </div>
      <div style={{position: 'absolute', inset: 0, background: `rgba(255,250,235,${flash * 0.9})`}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center'}}>
        <Kinetic text="PULAU HALIMUN" t={t} t0={AN.pulauhalimun - 0.1} size={92} spacing={0.08} per={0.05} fadeOut={[AN.dikaitkan + 1.6, AN.dikaitkan + 2.1]} />
        <div style={{marginTop: 14}}><Rule t={t} t0={AN.pulauhalimun + 0.5} w={460} /></div>
        <div style={{marginTop: 18, opacity: easeOut(prog(t, AN.dikaitkan, AN.dikaitkan + 0.7)) * (1 - prog(t, AN.dikaitkan + 1.6, AN.dikaitkan + 2.1)), fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 48, color: C.goldLight, textShadow: '0 3px 16px #000'}}>dikaitkan dengan Pulau Laut, Kotabaru</div>
      </div>
    </Wrap>
  );
};

const Golden: React.FC<{t: number; sunY?: number; amp?: number; id: string; sunSize?: number; palette?: 'gold' | 'sunset' | 'blue'}> = ({t, sunY = 880, amp = 0.8, id, palette = 'gold', sunSize = 560}) => {
  const P: any = {gold: ['#1d3a55', '#d98a5c', '#ffd9a0', '#f0b878', '#072430'], sunset: ['#2a2a50', '#d2605a', '#ffb878', '#f09a64', '#0a1e2c'], blue: ['#050f22', '#1a3a64', '#7a98b8', '#6f8fb0', '#04121e']}[palette];
  return (<>
    <Sky t={t} top={P[0]} mid={P[1]} bottom={P[2]} sunX={540} sunY={sunY} sunR={sunSize} sun={palette === 'blue' ? 'rgba(160,190,230,0.35)' : 'rgba(255,214,150,0.7)'} clouds={0.65} cloudY={120} horizon={1040} cloudSpeed={7} />
    {palette !== 'blue' && <div style={{position: 'absolute', left: 540 - 110, top: sunY - 110, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, #fff6dc 0, #ffe2a8 55%, rgba(255,210,140,0) 72%)'}} />}
    <Fog t={t} y={930} h={240} o={0.4} speed={6} />
    <Sea t={t} horizon={1040} far={P[3]} near={P[4]} amp={amp} sunX={540} glint={0.7} id={id} />
  </>);
};
export const Saijaan: React.FC = () => {
  const t = useT(); const p = prog(t, 108.2, 116);
  return (
    <Wrap>
      <Cam s={lerp(1.0, 1.1, p)} oy={1000} x={lerp(30, -30, p)}>
        <Golden t={t} id="sj" sunY={860} />
        <div style={{position: 'absolute', left: 580, top: 560}}><Island w={640} c1="#4f6f6a" c2="#2d514f" c3="#17393a" lit="rgba(255,225,170,0.65)" /></div>
        <Fog t={t} y={1000} h={150} o={0.5} speed={-5} />
        {[0, 1, 2].map((i) => <Center key={i} x={lerp(100 + i * 330, 260 + i * 330, p) + Math.sin(t * 0.5 + i) * 6} y={1110 + i * 120} s={0.55 + i * 0.28}><Boat t={t} s={1} seed={i} /></Center>)}
        <Rays t={t} x={540} y={700} n={7} o={0.2} len={1000} spread={900} />
      </Cam>
      <Vignette o={0.6} /><Grade c="rgba(255,150,60,1)" o={0.08} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center'}}>
        <Kinetic text="Kebersamaan" t={t} t0={108.5} size={96} spacing={0.04} font={F.serif} weight={600} italic color={C.white} fadeOut={[111.0, 111.6]} per={0.07} />
        <Kinetic text="SAIJAAN" t={t} t0={AN.saijaan - 0.2} size={130} spacing={0.12} style={{position: 'absolute', left: 0, right: 0, top: 0}} per={0.08} color={C.goldLight} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 170, opacity: easeOut(prog(t, AN.saijaan + 0.7, AN.saijaan + 1.5)), fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 62, color: C.white, textShadow: '0 3px 18px #000'}}>seiya sekata</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 262, opacity: easeOut(prog(t, AN.semboyan - 0.2, AN.semboyan + 0.6)), fontFamily: F.sans, fontWeight: 500, fontSize: 26, letterSpacing: '0.3em', color: C.goldLight, textShadow: '0 2px 10px #000'}}>SEMBOYAN KABUPATEN KOTABARU</div>
      </div>
      <Tag text="ILUSTRASI SUASANA PESISIR" />
    </Wrap>
  );
};

export const Meaning: React.FC = () => {
  const t = useT(); const p = prog(t, 116, 129.3);
  return (
    <Wrap>
      <Cam s={lerp(1.02, 1.12, ease(p))} oy={1040}>
        <Golden t={t} id="mn" palette="sunset" sunY={lerp(880, 990, p)} amp={0.55} sunSize={640} />
        <Rays t={t} x={540} y={lerp(880, 990, p)} n={6} o={0.12} len={800} spread={900} />
      </Cam>
      <Vignette o={0.65} /><Grade c="rgba(255,120,60,1)" o={0.07} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center'}}>
        <div style={{opacity: easeOut(prog(t, 116.2, 117)) * (1 - prog(t, 120.2, 120.7)), fontFamily: F.title, fontWeight: 500, fontSize: 40, letterSpacing: '0.3em', color: C.goldLight, textShadow: '0 2px 12px #000', lineHeight: 1.7}}><div style={{border: `2px solid ${C.gold}`, display: 'inline-block', padding: '14px 36px', background: 'rgba(3,12,20,0.35)'}}>LEGENDA<br /><span style={{fontSize: 28, color: C.white}}>BUKAN BUKTI ILMIAH</span></div></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, opacity: easeOut(prog(t, AN.renungkan + 0.5, AN.renungkan + 1.3)) * (1 - prog(t, 123.2, 123.7)), fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 64, color: C.white, textShadow: '0 3px 18px #000', lineHeight: 1.2, padding: '0 90px'}}>Satu pertanyaan<br />untuk direnungkan…</div>
        <Kinetic text="Apakah kita masih menjaga semangat itu?" t={t} t0={126.35} size={76} spacing={0.01} font={F.serif} weight={600} color={C.white} per={0.06} style={{padding: '0 80px', lineHeight: 1.2, whiteSpace: 'normal'}} />
      </div>
    </Wrap>
  );
};

export const Cta1: React.FC = () => {
  const t = useT(); const p = prog(t, 129.3, 137.4); const pop = easeOut(prog(t, AN.komentar - 0.5, AN.komentar + 0.3));
  return (
    <Wrap>
      <Cam s={lerp(1.04, 1.12, p)} oy={1040}><Golden t={t} id="c1" palette="blue" sunY={820} amp={0.7} /><Stars t={t} n={50} h={700} /></Cam>
      <Vignette o={0.7} /><Grade c="rgba(10,30,70,1)" o={0.14} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center'}}>
        <div style={{opacity: 1 - prog(t, 132.7, 133.2)}}>
          <Kinetic text="Bagaimana menurut kalian?" t={t} t0={AN.bagaimana} size={84} spacing={0.01} font={F.serif} weight={600} per={0.04} style={{padding: '0 70px', lineHeight: 1.15, whiteSpace: 'normal'}} />
          <div style={{marginTop: 50, transform: `scale(${0.6 + 0.4 * pop})`, opacity: pop}}><Comment s={1.3} /></div>
          <div style={{marginTop: 6, opacity: pop, fontFamily: F.sans, fontWeight: 600, fontSize: 34, letterSpacing: '0.22em', color: C.goldLight, textShadow: '0 2px 10px #000'}}>TULIS DI KOLOM KOMENTAR</div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, opacity: easeOut(prog(t, 133.2, 134.1)) * (1 - prog(t, 137.0, 137.4))}}>
          <div style={{fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 70, color: C.white, textShadow: '0 3px 18px #000', lineHeight: 1.2, padding: '0 70px'}}>Punya cerita misteri<br />atau legenda dari<br />daerahmu?</div>
          <div style={{marginTop: 34, fontFamily: F.sans, fontWeight: 600, fontSize: 32, letterSpacing: '0.25em', color: C.goldLight, textShadow: '0 2px 10px #000'}}>BAGIKAN DI KOMENTAR</div>
        </div>
      </div>
    </Wrap>
  );
};

const IconPop: React.FC<{t: number; t0: number; icon: React.ReactNode; label: string}> = ({t, t0, icon, label}) => {
  const p = easeOut(prog(t, t0, t0 + 0.5)); const bounce = 1 + Math.sin(prog(t, t0, t0 + 0.6) * Math.PI) * 0.18;
  return (<div style={{width: 260, textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 40}px) scale(${bounce})`}}>
    <div style={{width: 168, height: 168, margin: '0 auto', borderRadius: '50%', border: `2px solid ${C.gold}`, background: 'rgba(3,12,20,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(201,164,92,0.35)'}}>{icon}</div>
    <div style={{marginTop: 20, fontFamily: F.title, fontWeight: 700, fontSize: 38, letterSpacing: '0.2em', color: C.white, textShadow: '0 2px 10px #000'}}>{label}</div></div>);
};
const Night: React.FC<{t: number; id: string; moonY?: number}> = ({t, id, moonY = 520}) => (<>
  <Sky t={t} top="#02060d" mid="#0b1d33" bottom="#1d3f5e" sunX={540} sunY={moonY} sunR={500} sun="rgba(150,185,225,0.25)" clouds={0.35} cloudY={200} horizon={1040} cloudSpeed={4} />
  <Stars t={t} n={110} h={800} /><Moon x={540} y={moonY} r={92} />
  <Fog t={t} y={960} h={200} o={0.3} speed={4} />
  <Sea t={t} horizon={1040} far="#3a5878" near="#02080e" amp={0.6} sunX={540} glint={0.7} glintColor="rgba(230,240,255,0.9)" id={id} />
</>);
export const Cta2: React.FC = () => {
  const t = useT(); const p = prog(t, 137.4, 143);
  return (
    <Wrap>
      <Cam s={lerp(1.02, 1.08, p)} oy={1040}><Night t={t} id="c2" /></Cam>
      <Vignette o={0.7} /><Grade c="rgba(10,30,70,1)" o={0.1} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center', gap: 36}}>
        <IconPop t={t} t0={AN.like - 0.05} icon={<Heart s={1.05} />} label="LIKE" />
        <IconPop t={t} t0={AN.like + 0.55} icon={<Follow s={1.05} />} label="FOLLOW" />
        <IconPop t={t} t0={AN.share - 0.05} icon={<Share s={1.05} />} label="SHARE" />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 930, textAlign: 'center', opacity: easeOut(prog(t, AN.like + 0.5, AN.like + 1.2)), fontFamily: F.sans, fontWeight: 600, fontSize: 46, letterSpacing: '0.06em', color: C.goldLight, textShadow: '0 2px 14px #000'}}>@terangbulan.media</div>
    </Wrap>
  );
};

export const Outro: React.FC = () => {
  const t = useT(); const logo = easeOut(prog(t, AN.terang - 0.1, AN.terang + 1.0)); const out = prog(t, 149.4, 150);
  return (
    <Wrap>
      <Cam s={lerp(1.0, 1.06, prog(t, 143, 150))} oy={1040}><Night t={t} id="ou" moonY={lerp(520, 470, prog(t, 143, 150))} /></Cam>
      <Vignette o={0.8} /><Grade c="rgba(10,30,70,1)" o={0.1} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center'}}>
        <div style={{opacity: easeOut(prog(t, AN.karena - 0.1, AN.karena + 0.6)) * (1 - prog(t, 144.0, 144.3)), fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 76, color: C.white, textShadow: '0 3px 18px #000'}}>Karena siapa tahu…</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, opacity: easeOut(prog(t, AN.legendaberikut - 0.1, AN.legendaberikut + 0.7)) * (1 - prog(t, 146.4, 146.8)), fontFamily: F.serif, fontStyle: 'italic', fontWeight: 600, fontSize: 70, color: C.white, textShadow: '0 3px 18px #000', lineHeight: 1.22, padding: '0 80px'}}>legenda berikutnya<br />justru berasal dari<br /><span style={{color: C.goldLight}}>daerah kalian.</span></div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center', opacity: logo, transform: `scale(${0.88 + 0.12 * logo})`}}>
        <Crescent s={1.9} glow={0.55} />
        <div style={{marginTop: 30, fontFamily: F.title, fontWeight: 700, fontSize: 84, letterSpacing: '0.16em', color: C.white, textShadow: '0 4px 24px #000'}}>TERANG BULAN</div>
        <div style={{marginTop: 6}}><Rule t={t} t0={AN.terang + 0.6} w={440} /></div>
        <div style={{marginTop: 22, opacity: easeOut(prog(t, AN.mengungkap - 0.1, AN.mengungkap + 0.8)), fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 50, color: C.goldLight, textShadow: '0 3px 14px #000', padding: '0 60px', lineHeight: 1.2}}>Mengungkap Cerita,<br />Menerangi Makna.</div>
      </div>
      <div style={{position: 'absolute', inset: 0, background: '#000', opacity: out}} />
    </Wrap>
  );
};

import React from 'react';
import {W, H, C, useT, prog, lerp, ease, easeOut, clamp, rnd, mix} from '../lib';
import {F} from '../fonts';
import AN from '../data/anchors.json';
import {Sky, Sea, Fog, Rays, Deep, Vignette, Grade, Rings, Splash} from '../components/Layers';
import {Wrap, Cam, Abs, Center, Rock, Island, Boat, Tag} from '../components/Common';
import {Seated, Standing, Portrait} from '../components/Datu';
import {Kinetic, Fade, Rule, Pin} from '../components/UI';

const IslandFar = ({x, y, w, o = 0.8, c = '#26404a'}: any) => (<div style={{position: 'absolute', left: x, top: y, opacity: o}}><Island w={w} c1={c} c2={c} c3={c} lit="rgba(255,225,170,0.25)" /></div>);

export const Hook: React.FC = () => {
  const t = useT(); const p = prog(t, 0, 14);
  return (
    <Wrap>
      <Cam s={lerp(1.0, 1.24, ease(p))} oy={1000} y={lerp(0, 30, p)}>
        <Sky t={t} top="#0a1620" mid="#2b4553" bottom="#8da3a8" sunX={700} sunY={640} sunR={620} sun="rgba(255,226,175,0.5)" clouds={0.8} cloudY={60} horizon={1000} />
        <IslandFar x={520} y={640} w={560} o={0.75} />
        <Fog t={t} y={880} h={280} o={0.7} speed={6} />
        <Sea t={t} horizon={1000} far="#53727c" near="#061a28" amp={0.5 + p * 0.9} sunX={700} glint={0.3} id="hk" />
        <Fog t={t} y={950} h={220} o={0.3} speed={-8} />
        <Rays t={t} x={700} y={420} n={6} o={0.16} len={1100} spread={700} />
      </Cam>
      <Vignette o={0.75} /><Grade o={0.2} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 400}}>
        <Kinetic text="MISTERI" t={t} t0={0.3} size={58} spacing={0.5} weight={500} color={C.goldLight} fadeOut={[7, 8]} per={0.07} />
        <div style={{height: 14}} />
        <Kinetic text="PULAU HALIMUN" t={t} t0={0.5} size={92} spacing={0.08} fadeOut={[7, 8]} per={0.06} />
        <div style={{marginTop: 22}}><Rule t={t} t0={1.6} w={420} /></div>
        <div style={{marginTop: 30, opacity: easeOut(prog(t, 2.7, 3.6)) * (1 - prog(t, 7, 8)), fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 52, textAlign: 'center', color: C.white, textShadow: '0 3px 20px #000', padding: '0 80px', lineHeight: 1.2}}>Benarkah Sebuah Pulau Lahir<br />dari Janji Penguasa Lautan?</div>
      </div>
    </Wrap>
  );
};

export const Promise_: React.FC = () => {
  const t = useT(); const p = prog(t, 14, 22.2); const deep = prog(t, 19.9, 21.6);
  return (
    <Wrap>
      <Cam s={lerp(1.0, 1.1, ease(p))} oy={1300} y={lerp(0, -30, p)}>
        <Sky t={t} top="#04090f" mid="#1b3342" bottom="#6b868f" sunX={540} sunY={820} sunR={560} sun="rgba(255,214,150,0.5)" clouds={0.85} cloudY={140} horizon={1290} cloudSpeed={22} />
        <Fog t={t} y={1130} h={280} o={0.55} speed={10} />
        <Sea t={t} horizon={1290} far="#304c58" near="#03101a" amp={1.5} speed={1.3} sunX={540} glint={0.35} id="pm" />
        <Rays t={t} x={540} y={300} n={7} o={0.16} len={1000} spread={900} />
        <Abs x={540} y={1470} s={1.0}><Rock w={760} /></Abs>
        <Abs x={540} y={1340} s={1} r={Math.sin(t * 1.2) * 0.6}><Standing t={t} w={300} /></Abs>
        <Rings t={t} x={540} y={1480} w={480} n={3} />
      </Cam>
      <div style={{position: 'absolute', inset: 0, opacity: deep}}><Deep t={t} top="#0b3a4a" mid="#041a2a" bottom="#010509" rays={0.25} caustic={0.1} snow={50} /></div>
      <Vignette o={0.8} /><Grade o={0.2} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 520}}><Kinetic text="PENGUASA LAUTAN" t={t} t0={AN.penguasa - 0.1} size={78} spacing={0.1} color={C.goldLight} per={0.05} fadeOut={[21.7, 22.2]} /></div>
    </Wrap>
  );
};

export const Legend: React.FC = () => {
  const t = useT(); const p = prog(t, 22.2, 31.4); const pin = easeOut(prog(t, AN.kotabaru - 0.2, AN.kotabaru + 0.5));
  return (
    <Wrap>
      <Cam s={1.14} x={lerp(50, -60, ease(p))} y={lerp(-20, 10, p)}>
        <Sky t={t} top="#071a2c" mid="#2c5668" bottom="#e2b680" sunX={300} sunY={820} sunR={600} sun="rgba(255,205,140,0.6)" clouds={0.6} cloudY={150} horizon={800} cloudSpeed={9} />
        <Fog t={t} y={680} h={260} o={0.5} speed={5} />
        <div style={{position: 'absolute', left: 430, top: 380}}><Island w={760} c1="#2f5560" c2="#1a3f48" c3="#0c262c" lit="rgba(255,215,150,0.6)" /></div>
        <Fog t={t} y={760} h={160} o={0.55} speed={-7} />
        <Sea t={t} horizon={800} far="#c7a173" near="#052030" amp={0.8} sunX={300} glint={0.55} id="lg" />
      </Cam>
      <Vignette /><Grade />
      <div style={{position: 'absolute', left: 560, top: 640, opacity: pin, transform: `translateY(${(1 - pin) * -40}px)`}}><Pin t={t} /></div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center'}}>
        <div style={{opacity: easeOut(prog(t, 24.9, 25.8)) * (1 - prog(t, 28.4, 29.1)), fontFamily: F.sans, fontWeight: 500, fontSize: 30, letterSpacing: '0.45em', color: C.goldLight, textShadow: '0 2px 12px #000'}}>LEGENDA TURUN-TEMURUN</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 880, textAlign: 'center', opacity: pin}}>
        <div style={{fontFamily: F.title, fontWeight: 700, fontSize: 86, letterSpacing: '0.12em', color: C.white, textShadow: '0 4px 24px #000'}}>KOTABARU</div>
        <div style={{fontFamily: F.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 46, color: C.goldLight, textShadow: '0 2px 14px #000'}}>Kalimantan Selatan</div>
      </div>
      <Tag text="ILUSTRASI ARTISTIK  ·  BUKAN FOOTAGE LOKASI" />
    </Wrap>
  );
};

export const DatuReveal: React.FC = () => {
  const t = useT(); const p = prog(t, 31.4, 36);
  return (
    <Wrap>
      <Cam s={lerp(1.0, 1.1, ease(p))} ox={540} oy={800}>
        <Sky t={t} top="#071624" mid="#1f4252" bottom="#b7926a" sunX={800} sunY={900} sunR={600} sun="rgba(255,205,140,0.5)" clouds={0.5} cloudY={120} horizon={1000} cloudSpeed={6} />
        <Sea t={t} horizon={1000} far="#8a7a62" near="#04141f" amp={0.7} sunX={800} glint={0.3} id="dr" />
        <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 56% 45%, rgba(0,0,0,0), rgba(2,8,14,0.82) 75%)'}} />
        <Center x={540} y={820} o={easeOut(prog(t, 31.5, 32.8))} style={{WebkitMaskImage: 'linear-gradient(180deg,#000 72%,transparent)'}}><Portrait t={t} w={780} eyes="open" light={1} /></Center>
      </Cam>
      <Vignette o={0.7} /><Grade o={0.15} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1190, textAlign: 'center', opacity: easeOut(prog(t, AN.datu - 0.3, AN.datu + 0.6))}}>
        <div style={{fontFamily: F.title, fontWeight: 700, fontSize: 70, letterSpacing: '0.14em', color: C.white, textShadow: '0 4px 24px #000'}}>DATU MABRUR</div>
        <div style={{marginTop: 8}}><Rule t={t} t0={AN.datu} w={380} /></div>
        <div style={{marginTop: 12, fontFamily: F.sans, fontWeight: 500, fontSize: 22, letterSpacing: '0.26em', color: C.goldLight, textShadow: '0 2px 8px #000'}}>TOKOH LEGENDA  ·  REKONSTRUKSI ARTISTIK</div>
      </div>
    </Wrap>
  );
};

export const Meditation: React.FC = () => {
  const t = useT(); const p = prog(t, 36, 45); const o = (p - 0.5) * 2;
  return (
    <Wrap>
      <Cam s={1.12}>
        <div style={{position: 'absolute', inset: 0, transform: `translateX(${-o * 55}px)`}}>
          <Sky t={t} top="#061321" mid="#1f4152" bottom="#d9ad7c" sunX={540} sunY={1000} sunR={640} sun="rgba(255,200,130,0.6)" clouds={0.55} cloudY={140} horizon={1080} cloudSpeed={5} />
        </div>
        <div style={{position: 'absolute', inset: 0, transform: `translateX(${-o * 22}px)`}}>
          <Fog t={t} y={950} h={260} o={0.5} speed={12} />
          <Sea t={t} horizon={1080} far="#b99468" near="#04141f" amp={0.9} sunX={540} glint={0.5} id="md" />
        </div>
        <div style={{position: 'absolute', inset: 0, transform: `translateX(${o * 34}px) rotate(${o * 0.8}deg)`}}>
          <Abs x={540} y={1560} s={1.1}><Rock w={800} /></Abs>
          <Abs x={540} y={1388} s={1}><Seated t={t} w={360} /></Abs>
          <Rings t={t} x={540} y={1550} w={560} n={3} o={0.5} />
        </div>
        <Fog t={t} y={1240} h={260} o={0.28} speed={-18} />
      </Cam>
      <Vignette o={0.7} /><Grade o={0.15} />
    </Wrap>
  );
};

export const Wish: React.FC = () => {
  const t = useT(); const p = prog(t, 45, 53); const a = 1 - prog(t, 48.0, 48.9);
  const land = prog(t, 49.2, 53);
  return (
    <Wrap>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - prog(t, 48.0, 48.9)}}>
        <Cam s={lerp(1.0, 1.12, p / 0.4 > 1 ? 1 : p / 0.4)} oy={760}>
          <Deep t={t} top="#12404f" mid="#082533" bottom="#02080e" rays={0.2} caustic={0.0} snow={34} />
          <div style={{position: 'absolute', left: 140, top: 180, width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,205,140,0.55), rgba(255,205,140,0) 65%)'}} />
          <Center x={540} y={800} style={{WebkitMaskImage: 'linear-gradient(180deg,#000 74%,transparent)'}}><Portrait t={t} w={800} eyes="closed" light={0.95} glow="rgba(255,214,150,0.7)" /></Center>
        </Cam>
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: prog(t, 47.9, 49)}}>
        <Cam s={lerp(1.0, 1.08, land)} oy={1000}>
          <Sky t={t} top="#0a1a2a" mid="#3a6070" bottom="#d8c2a0" sunX={600} sunY={780} sunR={560} sun="rgba(255,225,180,0.55)" clouds={0.55} cloudY={170} horizon={1000} cloudSpeed={5} />
          <div style={{position: 'absolute', left: 400, top: 700, opacity: land * 0.7, filter: 'saturate(0.7)'}}><Island w={560} c1="#6f8e96" c2="#6f8e96" c3="#6f8e96" lit="rgba(255,235,200,0.5)" /></div>
          <Fog t={t} y={860} h={300} o={0.85} speed={3} />
          <Sea t={t} horizon={1000} far="#cdb994" near="#06202e" amp={0.5} sunX={600} glint={0.4} id="ws" />
          <Fog t={t} y={940} h={240} o={0.4} speed={-6} />
        </Cam>
        <Rays t={t} x={620} y={300} n={7} o={0.3 * land} len={1200} spread={500} />
        <Vignette o={0.65} />
      </div>
      <Grade o={0.14} />
    </Wrap>
  );
};

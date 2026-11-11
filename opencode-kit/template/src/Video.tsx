import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {FPS, TimeCtx, useT, W, H, shake, prog, easeOut} from './lib';
import AN from './data/anchors.json';
import {loadFonts} from './fonts';
import {Header, Subtitle} from './components/UI';
import {Grain} from './components/Layers';
import {useCurrentFrame} from 'remotion';
import {Hook, Promise_, Legend, DatuReveal, Meditation, Wish} from './scenes/Scenes1';
import {Swordfish_, Battle, Kindness, Healing, Offer, Request} from './scenes/Scenes2';
import {Gather, Birth, Saijaan, Meaning, Cta1, Cta2, Outro} from './scenes/Scenes3';

loadFonts();
const SCENES: [string, number, number, React.FC][] = [
  ['hook', 0, 14.0, Hook], ['promise', 14.0, 22.2, Promise_], ['legend', 22.2, 31.4, Legend], ['datu', 31.4, 36.0, DatuReveal],
  ['meditation', 36.0, 45.0, Meditation], ['wish', 45.0, 53.0, Wish], ['swordfish', 53.0, 64.0, Swordfish_], ['battle', 64.0, 71.6, Battle],
  ['kindness', 71.6, 78.3, Kindness], ['healing', 78.3, 82.2, Healing], ['offer', 82.2, 88.2, Offer], ['request', 88.2, 95.5, Request],
  ['gather', 95.5, 101.8, Gather], ['birth', 101.8, 108.2, Birth], ['saijaan', 108.2, 116.0, Saijaan], ['meaning', 116.0, 129.3, Meaning],
  ['cta1', 129.3, 137.4, Cta1], ['cta2', 137.4, 143.0, Cta2], ['outro', 143.0, 150.0, Outro],
];
const IMPACTS: [number, number][] = [[AN.tibatiba, 1.0], [AN.pecah, 1.0], [AN.seranganB, 0.7], [68.05, 0.9], [AN.dikalahkan, 1.2], [AN.muncullah, 1.5]];
const Shaker: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame(); const t = f / FPS; let amp = 0;
  for (const [te, a] of IMPACTS) if (t >= te) amp += a * Math.exp(-(t - te) * 5);
  const s = shake(t, amp * 9, 4);
  return <div style={{position: 'absolute', inset: 0, transform: `translate(${s.x}px,${s.y}px) rotate(${s.r}deg) scale(${1 + Math.min(0.03, amp * 0.02)})`}}>{children}</div>;
};
const Overlays: React.FC = () => { const f = useCurrentFrame(); const t = f / FPS; return (<><Header t={t} /><Subtitle t={t} /><Grain f={f} o={0.06} /></>); };

export const Video: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <Shaker>
      {SCENES.map(([id, a, b, Comp], i) => {
        const pre = i === 0 ? 0 : 0.5; const from = Math.round((a - pre) * FPS); const dur = Math.round(b * FPS) - from;
        return (
          <Sequence key={id} from={from} durationInFrames={dur} layout="none">
            <TimeCtx.Provider value={from / FPS}>
              <FadeIn pre={pre}><Comp /></FadeIn>
            </TimeCtx.Provider>
          </Sequence>
        );
      })}
    </Shaker>
    <Overlays />
    <Audio src={staticFile('audio/mix/final-mix.wav')} />
  </AbsoluteFill>
);
const FadeIn: React.FC<{pre: number; children: React.ReactNode}> = ({pre, children}) => {
  const f = useCurrentFrame(); const o = pre ? Math.min(1, f / (pre * FPS)) : 1;
  return <div style={{position: 'absolute', inset: 0, opacity: o}}>{children}</div>;
};

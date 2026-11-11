import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FPS} from './lib/layout';
import {clamp} from './lib/util';
import {Shot, TOTAL_FRAMES, shots} from './data/beats';
import {CardLayer, Frame, LabelLayer} from './components/Frame';
import {Overlay} from './components/Overlay';
import {SceneView} from './components/scenes';

const ShotView: React.FC<{shot: Shot}> = ({shot}) => {
  const f = useCurrentFrame();
  const p = Math.min(1, f / shot.df);
  const abs = (shot.sf + f) / FPS;
  const dt = shot.insert ? abs - shot.insert.t : undefined;
  return (
    <Frame shot={shot} f={f} dur={shot.df} dt={dt} abs={abs}>
      <SceneView ctx={{f, dur: shot.df, p, abs, dt, shot}} />
    </Frame>
  );
};

const EndFade: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: '#000', opacity: clamp((f - (TOTAL_FRAMES - 40)) / 40), pointerEvents: 'none'}} />;
};
const Layers: React.FC = () => {
  const f = useCurrentFrame();
  return <><LabelLayer frame={f} /><CardLayer frame={f} /></>;
};

export const GunungJulahit: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <Audio src={staticFile('audio/mix-master.wav')} />
    {shots.map((s) => (
      <Sequence key={s.id} from={s.sf} durationInFrames={s.df + s.tail}>
        <ShotView shot={s} />
      </Sequence>
    ))}
    <Layers />
    <EndFade />
    <Overlay />
  </AbsoluteFill>
);

import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FPS} from './lib/layout';
import {Beat, beats} from './data/beats';
import {Frame} from './components/Frame';
import {Overlay} from './components/Overlay';
import {SceneView} from './components/scenes';

const BeatView: React.FC<{beat: Beat}> = ({beat}) => {
  const f = useCurrentFrame();
  const p = Math.min(1, f / beat.df);
  const dt = beat.jsT !== undefined ? f / FPS - (beat.jsT - beat.start) : undefined;
  const ctx = {f, dur: beat.df, p, dt, abs: beat.sf / FPS + f / FPS};
  return (
    <Frame beat={beat} f={f} dur={beat.df} dt={dt}>
      <SceneView cfg={beat.scene} ctx={ctx} />
    </Frame>
  );
};

export const GunungJulahit: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <Audio src={staticFile('audio/mix-master.wav')} />
    {beats.map((b) => (
      <Sequence key={b.id} from={b.sf} durationInFrames={b.df + b.tail}>
        <BeatView beat={b} />
      </Sequence>
    ))}
    <Overlay />
  </AbsoluteFill>
);

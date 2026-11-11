import React from 'react';
import {Composition} from 'remotion';
import {PulauHalimunFilm} from './Film';

export const RemotionRoot: React.FC = () => <Composition
  id="PulauLautHalimun"
  component={PulauHalimunFilm}
  durationInFrames={3600}
  fps={30}
  width={1080}
  height={1920}
/>;

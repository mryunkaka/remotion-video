import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {W, H, FPS, TOTAL_FRAMES} from './lib';
export const RemotionRoot: React.FC = () => (
  <Composition id="Halimun" component={Video} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
);

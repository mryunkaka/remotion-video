import React from 'react';
import {Composition, Still} from 'remotion';
import {GunungJulahit} from './GunungJulahit';
import {Thumbnail} from './Thumbnail';
import {TOTAL_FRAMES} from './data/beats';
import {FPS, H, W} from './lib/layout';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="GunungJulahit" component={GunungJulahit} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
    <Still id="Thumbnail" component={Thumbnail} width={W} height={H} />
  </>
);

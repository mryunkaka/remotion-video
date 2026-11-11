import React from "react";
import {Composition} from "remotion";
import {BetweenSleepAndSky} from "./video/BetweenSleepAndSky";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="BetweenSleepAndSky"
    component={BetweenSleepAndSky}
    durationInFrames={1800}
    fps={30}
    width={1080}
    height={1920}
  />
);

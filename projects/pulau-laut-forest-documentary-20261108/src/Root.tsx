import React from "react";
import { Composition } from "remotion";
import { PulauLautFilm } from "./Film";

export const RemotionRoot: React.FC = () => (
  <Composition id="PulauLautForest" component={PulauLautFilm}
    durationInFrames={4245} fps={30} width={1080} height={1920} />
);


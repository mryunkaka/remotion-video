import { Composition } from "remotion";
import { Video } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="PulauHalimun" component={Video} durationInFrames={4476} fps={30} width={1080} height={1920} />
    </>
  );
};

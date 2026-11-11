import {Config} from '@remotion/cli/config';
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
Config.setCrf(18);
// Windows: Remotion downloads its own Chrome. Only set CHROME_PATH if you really need a custom browser.
if (process.env.CHROME_PATH) Config.setBrowserExecutable(process.env.CHROME_PATH);

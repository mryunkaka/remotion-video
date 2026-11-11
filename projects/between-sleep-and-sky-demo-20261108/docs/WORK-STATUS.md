# Work status

Status: COMPLETE - MP4 rendered and technical/visual QC recorded.

- Title: Between Sleep and Sky
- Type: Wordless cinematic motion-graphics demo with original instrumental audio
- Ratio: 9:16 (1080 x 1920)
- Duration: 60.0 seconds at 30 fps
- Voiceover: None; the supplied sample voiceover was longer than one minute and was not used or altered.
- Browser/render path: Existing local Chrome rendered Remotion frames; system FFmpeg assembled the MP4 and mixed the separate WAV stems.
- Lightpanda: Not installed. The project README documents no native Windows build (WSL2 required), and its browser does not perform the visual layout/rasterization Remotion needs to render frames.

## Production checklist

- [x] Validate voiceover/transcript/timing: no narration supplied or needed; fixed runtime is 60 seconds.
- [x] Complete story beats, storyboard, and visual style guide.
- [x] Create original vector/CSS visuals inside this production; no external visual assets.
- [x] Create separate procedural BGM/SFX stems locally and mix them into the deliverable.
- [x] Build the Remotion composition and scene animations.
- [x] Render representative frames and inspect the opening, cloud sea, silver path, mirror sea, and ending in a contact sheet.
- [x] Render the 1,800-frame sequence and encode the final MP4.
- [x] Complete technical and visual QC; see `QC-REPORT.md`.

## Creative brief

A one-minute dream journey: a quiet night meadow opens into a moonlit threshold, an ocean of clouds, a rising silver path, a mirror sea, and soft dawn. The visual language is layered night-sky vector art with subtle drifting lights, changing environments, portal motion, and slow camera-like movement. No external assets or factual claims.

## Reproducible render notes

The final render was assembled from Remotion's 1,800 JPEG frames with `app/scripts/assemble-video.ps1`. This avoids the bundled Remotion FFmpeg/ffprobe executables, which crashed in this host; the installed system FFmpeg completed the render successfully.

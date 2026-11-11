# Pulau Laut Forest Scenario Video

A standalone 9:16 Remotion production based on the supplied Indonesian narration about the hypothetical scenario of Pulau Laut's natural forest remaining intact.

## Output

- Final MP4: out/HUTAN_PULAU_LAUT_FINAL.mp4
- Indonesian captions: out/HUTAN_PULAU_LAUT.srt
- Thumbnail: out/HUTAN_PULAU_LAUT_THUMBNAIL.jpg
- Source narration is retained unchanged at assets/audio/narration/.
- Original music and effects are separate at assets/audio/music/ and assets/audio/sfx/.

## Rebuild

Run from this project folder:

- pnpm captions — regenerate caption timing against the recorded silence anchors and supplied script.
- pnpm mix — synthesize and measure the final 48 kHz stereo mix.
- pnpm render — render the Remotion visuals and mux the final audio.
- pnpm studio — open Remotion Studio for visual review.

The render helper uses the installed Chrome/Edge and FFmpeg discovered on the computer. It uses Node 24 when available, as required by the installed Remotion workspace.

## Editorial notes

Generated image plates are illustrative reconstructions, not documentary photographs from Pulau Laut. The video labels them accordingly. Caption sentence boundaries are aligned to detected pauses; exact speech transcription could not be verified because local ASR model weights are unavailable.


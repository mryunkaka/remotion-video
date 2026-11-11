# Work status

Status: COMPLETE WITH LIMITATIONS

- Title: Jika Hutan Alami Pulau Laut Tidak Pernah Ditebang
- Type: cinematic nature documentary, hypothetical alternative scenario
- Ratio: 9:16 (1080 × 1920)
- Frame rate: 30 fps
- Voiceover duration: 141.490958 s; final video has all 4,245 frames and a 141.5 s container duration
- Style: generated photographic-style reconstructions, layered forest depth, restrained camera movement
- Language: Indonesian
- Source audio SHA-256: 7FBB290D9AC1AA5ADE9104D48C478B9B15FE951D3118A292742172F83F0E9411

## Production checklist

- [x] Inspect and preserve supplied voiceover
- [x] Capture supplied script; record unavailable offline ASR and transcript confidence
- [x] Finish story beats, storyboard, and visual style guide
- [x] Create visual plates and record provenance
- [x] Create original BGM/SFX stems and mix around voiceover
- [x] Build animated Remotion scenes
- [x] Render representative previews and revise
- [x] Render and mux MP4; confirm codec, dimensions, frame rate, full runtime, audio, and decode
- [x] Confirm subtitle text matches provided script and timing is ordered
- [x] Inspect contact sheet and record QC results
- [ ] Human listening review of the complete mix and spoken-word transcription

## Limitations and workarounds

- ASR model weights were incomplete; subtitle wording is verbatim from the supplied script and time anchors use WAV silences, but spoken-word exactness is not verified.
- The 9Router OpenCode designer call could not write its user-profile log; local project workflow and assets were completed instead.
- Lightpanda has no native Windows binary, WSL is absent, and it is an automation browser without graphical rendering. Remotion export used the existing Chrome renderer.
- Remotion's bundled FFmpeg/ffprobe crashed in this sandbox; the render script uses the locally installed FFmpeg binary directory and muxes the verified 48 kHz mix after visual rendering.

## Resumed audit — 2026-11-08

- Rechecked the delivered MP4 with the installed FFprobe: H.264, 1080 x 1920, 30 fps; AAC stereo, 48 kHz; 141.500 s; 354,348,973 bytes.
- Reopened the six-frame QA contact sheet and confirmed representative opening, forest, stream, community, reflective beat, and ending frames are present with readable captions and the illustrative-scenario disclosure.
- The final render remains available at `out/HUTAN_PULAU_LAUT_FINAL.mp4`; no replacement render was needed.
- The full mix still needs a human listening pass. Offline ASR weights remain unavailable, so spoken-word transcription is not independently verified.
- A minimal OpenCode agent call could not start because the sandbox denied writing OpenCode's user-profile log. No agent review is claimed; the local QA evidence above was checked directly.

See README.md, docs/CREATIVE-BRIEF.md, docs/STORYBOARD.md, docs/VISUAL-STYLE-GUIDE.md, docs/AUDIO-CUE-SHEET.md, and docs/QC-REPORT.md.


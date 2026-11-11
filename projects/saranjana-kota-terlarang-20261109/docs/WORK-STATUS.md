# Work status

Status: DELIVERED — final MP4 valid; QC documented.

- [x] Intake/audio: WAV `(4)` audit via ffprobe: PCM s16le, 24 kHz, mono, 149.170958 s. WAV `(9)` also audited, not selected. Narration is Pulau Halimun, not Saranjana script; unchanged source recording wins.
- [x] Local ASR: faster-whisper-small, Indonesian, cached model; 42 segments. Transcript checked; timing segment-based, not precise word alignment.
- [x] Storyboard/style: 14 beats, 30 fps, 4476 frames, story follows supplied audio; mismatch documented.
- [x] Asset plan: custom deterministic SVG visuals; no external images. Procedural local BGM/SFX stems.
- [x] Remotion app: Blank scaffold in `app/`; lint passed. Composition `PulauHalimun`, 1080×1920, 30 fps.
- [x] Preview and visual QA: opening/middle/ending previews, keyframes/contact sheet, caption/end-card revisions, independent visual critique recorded.
- [x] Final render: `out/SARANJANA_FINAL.mp4`, 17,875,904 bytes. Watchdog completed render and ffprobe validation; H.264, 1080×1920, 30 fps, 4476 frames, 149.205 s container, AAC stereo 48 kHz.
- [x] Technical/audio QC: `docs/QC-REPORT.md`. Mean audio −20.1 dBFS, peak −3.2 dBFS, no clipping detected. Independent reviewer corroborated streams and levels.
- [x] Thumbnail: `out/SARANJANA_THUMBNAIL.jpg`. SRT: `out/SARANJANA.srt`, segment timing remains approximate.

## Caveats

- Requested Saranjana narrative does not match source WAV. Delivered story follows Pulau Halimun voiceover to avoid invented dialogue/facts.
- Video metadata reports `yuvj420p`, full-range, `bt470bg`; nonstandard for common SDR playback. Flagged in QC, left unchanged to preserve validated final.
- Independent review sampled middle frame and did not inspect every frame or perceptually review full audio.
- No cloud audio use; no Windows Security exclusion or protection setting changed. Root cause was FFmpeg binary compatibility, not verified security blocking.

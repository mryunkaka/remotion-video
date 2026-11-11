# Final QC report

## Media validation

- Final file: `out/SARANJANA_PULAU_LAUT_FINAL.mp4` — 20,769,941 bytes.
- Duration: 120.000 seconds; 1080×1920 (9:16); 30 fps.
- Video: H.264 High; audio: AAC stereo, 48 kHz.
- Full-file FFmpeg decode completed without reported errors.
- `blackdetect` (0.5 s minimum, 0.03 pixel threshold): no detected black segments.
- `freezedetect` (−60 dB threshold, 8 s minimum): no detected frozen segments.
- Mixed audio: approximately −17.0 LUFS integrated, 5.0 LU LRA, −3.3 dBTP true peak. No clipping detected.

## Story, captions, and visual review

- Reviewed a 15-frame contact sheet sampled one second into each of the 15 eight-second visual beats.
- Visual language uses dark cartographic graphics, restrained gold type, an archival-page insert, a royal-hall silhouette, two animated figures, distinct mountain profiles, a dissolving ink/map beat, a stylized city reconstruction, a source card, and a night-valley question ending.
- Repeated mountain silhouettes identified in the first contact sheet were replaced with beat-specific visual motifs before the final render.
- Story text is split into 30 on-screen passages, four seconds each. The SRT mirrors these displayed passages; it is not an ASR transcript.
- The words “legenda”, “satu versi”, “skema”, and “rekonstruksi” mark folklore and dramatized images. The video does not claim that a supernatural city has been verified.

## Audio and production limit

- Separate original stems: procedural score, filtered wind ambience, and transition effects; all are 48 kHz stereo and exactly 120 seconds. The wind ambience was raised after QA measured it nearly subliminal; it now measures about −39.4 LUFS integrated and remains well below the score. The final mux trims all stems to exactly 120 seconds.
- No matching voiceover for this story was supplied. The unrelated forest-documentary recording was excluded, and no speech was synthesized. The story is delivered through on-screen text and subtitles over music/ambience/effects.
- The connected visual QA agent could not access this workspace. The primary agent inspected the preview and complete contact sheet directly; the audio QA agent measured the independent stems and final level data.

## Source boundary

The 2017 ULM-indexed study documents variants of the Pulau Halimun legend and connects Sambu Ranjana/Sambu Batung to Saranjana/Sebatung in its abstract. Badan Bahasa's 2016 Kotabaru folklore catalogue explicitly notes multiple versions. The short retells one version as folklore; its city, light, hall, and character imagery are original reconstruction, not archival footage or evidence.

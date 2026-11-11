# Quality-control report

Status: COMPLETE WITH TRANSCRIPT/PLAYBACK LIMITATIONS

## Intake and transcript
- Voice file: PCM s16le mono, 24 kHz, 141.490958 s.
- SHA-256: 7FBB290D9AC1AA5ADE9104D48C478B9B15FE951D3118A292742172F83F0E9411. Original source remains byte-identical.
- SRT contains 59 captions. Automated check confirms all caption words match the supplied script verbatim; 24 sentence ends were mapped to likely local silence anchors and chunks paced within them.
- No local ASR weights were available. The SRT verifies against the supplied script, not independently against every spoken word; exact word-level synchronization is not claimed.

## Visual
- MP4: 1080 × 1920, 9:16, H.264, 30 fps, 4,245 frames.
- Full runtime: 141.500 s; source narration track remains 141.490958 s. The final mux keeps all video frames and the entire narration.
- Six representative frames were manually reviewed as a contact sheet: opening, morning canopy, stream detail, community, climax, and ending. Cropping and captions stay within frame; generated visual disclosure is visible; sampled imagery follows the narrative.
- Backgrounds are four project-generated photographic-style reconstructions, not real Pulau Laut footage. Motion is frame-driven camera drift/zoom, crossfades, and restrained leaf movement.
- FFmpeg decode check exited 0. Black/frozen-frame scan at blackdetect d=0.1 s and freezedetect d=2 s returned no events.

## Audio
- Final MP4 audio: AAC stereo, 48 kHz, 141.490958 s.
- PCM mix measured −14.8 LUFS, LRA 3.0 LU, true peak −4.5 dBTP; final AAC track measured −14.8 LUFS, LRA 3.0 LU, true peak −4.4 dBTP.
- Original voice had a measured +2.6 dBTP; the delivery mix limits its peaks while retaining the unchanged original in the project.
- BGM and SFX are locally synthesized and retained as separate stems. No clipping was measured in the final file.

## Remaining limitation
An actual subjective listening pass was not available in this session, and no offline ASR model was present. The final sound is technically measured and the written captions are exact to the supplied script, but a human listening check should confirm the spoken words and subjective BGM/SFX balance before treating the captions as an independently verified transcript.

## Resumed delivery audit — 2026-11-08
- Rechecked the existing MP4 using the installed FFprobe: H.264 1080 x 1920 at 30 fps; AAC stereo at 48 kHz; duration 141.500 s; file size 354,348,973 bytes.
- Reopened the six-frame QA contact sheet. The sampled opening, forest canopy, stream, village, reflective climax, and ending shots are present; sampled captions are legible and the generated-illustration disclosure is visible.
- The render and output were already complete, so no media files were overwritten. The limitation above still applies: this audit did not include full-length human audio playback or independent ASR.
- A minimal OpenCode agent request was attempted once, but OpenCode could not write its profile log under the sandbox permissions. No independent agent review is claimed.


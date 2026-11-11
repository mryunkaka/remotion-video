# QC report

Status: TECHNICAL AND SAMPLED VISUAL QA COMPLETE. Subjective audio listening and full human transcript proofread remain unverified.

## Final file

D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\PULAU_HALIMUN_PERAHU_TAK_KEMBALI_FINAL.mp4

- ffprobe: {"duration":"166.210958","size":"17329700"}
- Streams: [{"codec_name":"h264","width":720,"height":1280,"r_frame_rate":"30/1","side_data_list":[{}]},{"codec_name":"aac","sample_rate":"48000","channels":2,"r_frame_rate":"0/0"}]
- Video target: H.264, 720×1280, 30 fps; actual stream values above.
- Full MP4 decode completed. FFmpeg scan of 4,986 frames found no black interval longer than 0.6 s or frozen interval longer than 2 s at the configured thresholds.
- Voice: source WAV preserved; final mix uses stereo 48 kHz with original voice plus ducked BGM and original SFX stems.
- Audio analysis log: docs/RUN-LOG.md (ffmpeg volumedetect; see final output lines).
- Preview/contact sheet: out/contact-sheet/overview.jpg and 12 representative stills in out/frames. Reviewed composition, legibility, radio framing, and scene transitions; corrected the radio crop and replaced repeated fades to black with short overlaps.
- Subtitle: out/captions.srt; timed by local faster-whisper-small output. Capitalization of Ardan/Raka was corrected from the narrative context. The transcript was not fully proof-listened against the recording.
- Audio levels from FFmpeg volumedetect on the stereo mix: mean -20.6 dBFS, sample peak -3.5 dBFS. An independent audio review found the cue positions consistent and no clipping indication; LUFS/true-peak and subjective listening were not measured.
- The supplied narration is 166.211 seconds (2:46), so the complete original voiceover determines the final runtime instead of a two-minute target.
- Visual direction is intentionally illustrated and 720×1280; no location footage was provided. It is not photorealistic documentary imagery.
- Narrative verification: framed as legend/reconstruction; the supplied audio itself does not establish the disappearance as a documented fact.
- Limitation: audio stems are procedural synthesis. Their subjective musical quality has not been auditioned here; do not describe the mix as perfect or fully fact-checked.

## Continuation verification — 2026-11-08

- Re-ran ffprobe on final MP4: video H.264, 720×1280 (9:16), 30/1 fps, 166.200 s video stream; audio AAC LC, 48 kHz, stereo, 166.210958 s container duration.
- Full decode test: `ffmpeg -v error -i <final.mp4> -f null -` exit code 0. No decode errors reported.
- Blackdetect scan (`d=0.2`, `pix_th=0.08`) completed with no reported intervals. Frozen-frame threshold scan and fresh contact sheet review were not rerun in this continuation; prior QC report records prior checks.
- Preview: `out/PULAU_HALIMUN_EP01_PREVIEW.mp4`, 12 s video-only excerpt beginning at source 82 s. Thumbnail: `out/PULAU_HALIMUN_EP01_THUMBNAIL.jpg`, source frame at 148 s.
- Captions: local faster-whisper-small transcript, 41 segments per existing project record; human proofread, complete subjective listening, exact word verification and word-level synchronization remain unknown.
- Art style is vector/illustrated, not photorealistic. Output 720×1280, not requested 1080×1920; remains a known delivery limitation.

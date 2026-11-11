# QC report

Status: COMPLETE - final MP4 exists and has been inspected.

## Technical checks

- File: `out/BETWEEN-SLEEP-AND-SKY.mp4` (9,292,115 bytes)
- Container: MP4; video: H.264, 1080 x 1920, 30/1 fps; audio: AAC-LC, 48 kHz, stereo.
- Duration: 60.000 seconds; 1,800 video frames.
- Pixel format: yuv420p; aspect ratio: 9:16.
- Audio loudness: -19.1 LUFS integrated; true peak -5.1 dBFS. No clipping observed.
- FFmpeg black-frame detection: no black interval was reported.
- Freeze detection at -60 dB: two low-motion holds were flagged around 17.8-19.9 seconds and 53.8-55.8 seconds. These are visually intentional quiet holds; the surrounding shots have ongoing motion.
- Subtitle and speech synchronization: not applicable; this is a wordless instrumental demo.

## Visual check

Inspected a contact sheet at 6, 18, 30, 42, and 54 seconds. It shows five distinct environments and a consistent 9:16 composition: moonlit meadow/portal, cloud sea, silver stepping path, mirror sea, and rose-gold dawn. The transitions follow the planned story beats. A single still preview was also inspected at full resolution. No external assets were used.

## Audio checks

- BGM and SFX stems are each 60.000 seconds, PCM s16le, 48 kHz, stereo.
- The stems remain separate in `app/public/audio/` and were mixed into the deliverable with a limiter. Final mix: -19.1 LUFS integrated and -5.1 dBFS true peak.
- No voiceover was supplied for this demo. The user's previously mentioned 149-second sample was not used or trimmed.

## Environment note

Remotion's bundled FFmpeg/ffprobe executables terminated with Windows access-violation exit code `3221225477` in this host. Local Chrome successfully rendered all frames, and the installed system FFmpeg encoded the MP4. The final output was verified with system ffprobe and decoded during black/freeze detection.

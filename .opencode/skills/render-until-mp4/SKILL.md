---
name: render-until-mp4
description: Make the Remotion render phase persistent and resumable until a valid MP4 exists.
---

# Resumable MP4 render

Use this after the director has completed the brief, composition, voiceover, and final audio mix.

- Never report production complete while the requested MP4 is missing or invalid.
- Launch the repository's Node watchdog from the repository root:
  `node tools/render-until-mp4.mjs --project <production-slug> --entry src/index.tsx --composition <composition-id> --output out/<final-name>.mp4`
- Keep the process running and stream its progress. If the command returns a session ID, poll that session; do not treat an intermediate timeout as completion.
- The watchdog checks the output with ffprobe. On a failed render it waits, retries with increasing delay, and keeps logging until a valid video stream exists.
- If the render repeatedly fails for a deterministic source/build error, stop retrying only to repair that error. Then launch the watchdog again. Do not create an empty placeholder MP4.
- After a valid output appears, perform technical and visual/audio QC, record real results in the production status and QC report, and only then report completion.
- If an execution layer rejects PowerShell structure, use Node's `child_process.spawn`/the watchdog; do not end the task at the blocked shell call.


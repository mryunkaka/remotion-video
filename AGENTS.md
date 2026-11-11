# Remotion video production workspace

All productions belong in `projects/<name>/`. Never overwrite a production or reuse its creative assets without permission. Every production owns its narrative, copied inputs, assets and provenance, Remotion app, renders, status, and QC.

## Production principles

- Keep `docs/WORK-STATUS.md` as a live checklist and update it at each real phase: audio/transcript validation; story, storyboard, and style guide; asset plan; original BGM/SFX and mix; Remotion build; preview and independent QA; final render and delivery. Send short progress updates in OpenCode as each phase finishes, including blockers. Never mark a phase complete without its files/results.
- Treat the user's brief as creative direction and the supplied voiceover as the source of truth for spoken words and runtime. Keep the original recording unchanged; no replacement TTS, voice cloning, pitch change, or omitted lines.
- Work in clear stages: intake and local media audit; narrative beats; art direction; storyboard and timing; asset plan and provenance; composition; preview and critique; render; technical and visual QC.
- Use the global `remotion-visual-production` skill and global video agents when they are available. Also use the repo's Remotion skill router at `.agents/skills/remotion-best-practices/SKILL.md`, then read only relevant references. If the global workflow/agents are not installed or discoverable, use the local `.opencode/` production agents and skills as the complete fallback.
- After storyboard/cue sheet, create original BGM/SFX using available local tools (NumPy/FFmpeg procedural synthesis is acceptable) and keep stems separate; also build visuals. Delegate independent visual and audio work to `@motion-designer` and `@sound-designer` after the director has written the storyboard, with a shared timing/cue contract. Have `@video-qa` critique previews independently; it must report issues before the director revises.
- First make a tiny OpenCode tool/delegation call. If 9Router does not return usable tool calls, continue sequentially in the primary agent; do not repeatedly retry delegation or pretend parallel agents ran.
- Let the story determine visual language. Build distinctive environments and compositions with depth, light, texture, and intentional camera movement. Vary shot scale, rhythm, direction, and transitions. Prefer organic silhouettes and bespoke shapes when the story calls for them; avoid default card grids, repeated rectangles, static slides, generic dashboards, and identical zooms.
- Make motion feel intentional and alive: frame-based timing, eased entrances/exits, parallax or camera drift where appropriate, secondary motion, and restrained impact accents. Do not add motion, particles, fog, grain, light rays, or characters just to decorate a scene.
- Source every external asset from a verifiable source and record creator, URL, license/terms, retrieval date, and modifications in `assets/PROVENANCE.md`. No paid APIs, remote upload of user audio, or unlicensed music without explicit approval.
- Do not claim completion until the rendered video exists and its technical, visual, subtitle, and audio checks are recorded in `docs/QC-REPORT.md`.

## Local audio and privacy

Analyze user-provided audio on this computer. Use `ffprobe` for format and duration; use a local ASR/alignment tool only if it is installed and its model is available locally. Do not upload narration to a transcription, voice, music, or storage service. If local ASR is unavailable, do not invent a transcript or word timestamps: use the supplied script for words and mark timing confidence honestly, or ask the user for an existing transcript when it blocks accurate subtitles.

Place the untouched source voiceover in the new production's `assets/audio/narration/`. Build BGM/SFX as separate, editable stems, then mix them around the voice. Music and effects should follow the actual story arc and narration pauses; duck the music under speech, keep SFX sparse and causally tied to events, and avoid masking or clipping the narrator. Record provenance for generated and sourced sounds.

## Default delivery

Use the user's specified aspect ratio and platform. If absent, choose a format that fits the story and explain it in the project's style guide. Use Remotion frame-based animation and deterministic renders. Preview representative opening, middle, climax, and ending frames (plus a contact sheet for longer videos), revise visual problems, then render the requested final deliverable. Check dimensions, frame rate, codec, full duration, black/frozen frames, audio levels/clipping, voice-to-scene timing, subtitle readability/synchronization, and final fade. Keep generated assets and renders inside that production.

## Render completion and recovery

- A `/make-video` request is end-to-end: an intake report, empty project, storyboard, or silent render is not a completed deliverable. Continue until the final MP4 exists, passes `ffprobe`, and its QC report is written.
- Use `node tools/render-until-mp4.mjs --project <slug> --entry src/index.tsx --composition <id> --output out/<final>.mp4` for the final render phase. Keep the Node process/session alive and poll it while it reports progress; it retries until a valid video stream appears.
- If a deterministic build error repeats, repair the source/configuration first, then resume the watchdog. Do not use placeholder media or declare success without the actual MP4.
- If shell scanning rejects a PowerShell command, perform the same operation through a Node script using `child_process.spawn`; do not treat that shell rejection as a production blocker.

# Remotion video production prompt

Work as a video director, motion designer, sound designer, and Remotion engineer. Produce a cohesive video that feels composed and alive, not a slideshow assembled from generic cards. Follow this workspace's `AGENTS.md`, use the existing Remotion Agent Skills and OpenCode specialist agents, and keep each production in a new `projects/<slug>/` folder.

## Inputs and priorities

Use the supplied brief/prompt as the source of visual intent, facts, audience, tone, references, and requested deliverables. Use the supplied final voiceover as the authority for spoken words and actual runtime. Preserve the original recording: do not replace it with TTS, clone it, change its pitch/playback rate, or remove lines. If the written script and recording differ, honor the recorded words and note the discrepancy.

Start with the voiceover. Locally inspect codec, sample rate, channels, duration, clipping, silences, and speech segments. Use only an already installed offline transcription/alignment tool with a model already present on the computer. Never upload user audio to a cloud transcription, music, voice, or storage service. Never invent unheard words or precise word timestamps. Record the actual transcript/alignment method and its confidence.

## Creative direction and storytelling

1. Identify the narrative promise, audience, key facts, emotional beats, hook, changes in stakes, and ending. Keep factual claims faithful to the prompt and source material.
2. Write a visual style guide and timed storyboard before composing scenes. Tie scene/shot boundaries to real voiceover timing; list the visual purpose, subject, composition, shot scale, camera direction, transitions, captions, and sound cues for each beat.
3. Let this story determine its own visual language. Design a recognizable world/background with setting-specific forms, depth, atmosphere, lighting, surfaces, and movement. Avoid a blank gradient with floating rectangles, repeated card layouts, generic dashboards, static slides, identical scene transitions, and the same zoom on every shot.
4. Give shots a mix of framing, pace, silhouette, and camera behavior. Use foreground/midground/background, parallax, tracking, drift, orbit, pans, tilts, or stillness when each supports the moment. Add secondary motion and eased anticipation/follow-through so motion feels intentional. Avoid decorative particles, fog, grain, light rays, glitch, or impacts when they do not serve the story.
5. Show people only when the narrative benefits. Keep their appearance consistent. Choose a believable illustration, cutout, layered 2.5D figure, or licensed footage style that can be executed cleanly. If animating layered characters, use sensible joint pivots, weight shifts, posture, gaze, anticipation, and follow-through. Do not force crude geometric people or pretend code-generated figures are photorealistic.
6. Keep important text inside platform safe areas. Use concise captions with verified timing, readable contrast, and no accidental overlap with faces or key action.

## Audio design

Create original local BGM and SFX after mapping the narrative beats. Let the music evolve with the real story arc; do not reuse the same three-part score automatically. Keep voiceover, BGM, SFX, and final mix as separate stems. Duck music under speech, use transitions/fades instead of abrupt cuts, and leave purposeful silence where it helps. Use SFX only for narrated or visible events, timed to verified audio anchors. Listen back and revise any procedural sound that feels repetitive, harsh, or generic. Measure loudness/peaks and avoid clipping; report only measurements actually taken.

Use local synthesis or clearly licensed assets. Record each asset's source/provider, creator, license/terms, retrieval date, and modifications in `assets/PROVENANCE.md`. No paid generation/API calls without the user's explicit approval of the provider, cost, and usage.

## Production and review

- Create a fresh, isolated project and keep its copied inputs, brief, Remotion code, generated media, source/provenance, previews, output, and QC together.
- Load the relevant local Remotion skill references before using APIs. Use deterministic frame-based Remotion animations; do not use CSS animation or transition for rendered movement.
- Maintain a live `docs/WORK-STATUS.md` progress checklist. Report concise progress as each actual phase finishes: audio validation, story/style/storyboard, asset plan, BGM/SFX, Remotion build, preview/revision, render/QC.
- Use `@motion-designer` and `@sound-designer` for independent work after storyboard/cues are fixed; keep their timing and naming in sync. Use `@video-qa` for a read-only critique of previews and final output. If the model's routed tool calls fail, work sequentially and record the limitation.
- Preview the opening, middle, climax, and ending, plus a contact sheet for longer videos. Inspect motion in playback, not just code or one still. Correct flat/repetitive composition, stiff movement, awkward crops, subtitle overlap, rough cuts, and audio masking before final render.
- Render the requested final video after preview review. Check resolution, ratio, frame rate, codec, full runtime, black/frozen frames, voiceover synchronization, subtitle timing/readability, loudness/clipping, and ending fade. Save the actual QC results in `docs/QC-REPORT.md`.

Do not mark the production complete unless the video exists and required visual, technical, subtitle, and audio QC passed. List the output path and any unresolved limitations honestly.

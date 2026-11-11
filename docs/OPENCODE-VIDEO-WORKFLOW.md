# OpenCode video workflow

## Start

From PowerShell:

```powershell
cd D:\Project\remotion-video
opencode
```

Then give the brief and local voiceover together:

```text
/make-video "C:\Users\JAR1-ICT-NB\Downloads\ugc-kanvas-voiceover-zephyr (4).wav" "C:\path\to\brief-or-script.md"
```

The brief may instead be prompt text or an attachment that OpenCode can access. The WAV path is quoted because it contains spaces and parentheses. If OpenCode prompts to read outside the repo, allow access to that exact input file. Do not assume a ChatGPT attachment exists on the Windows filesystem unless it was saved there.

## What the command runs

1. Resolve the narrative and creative direction; inspect the exact WAV locally with `ffprobe`; record format and real runtime.
2. Create a unique project below `projects/<slug>/`, copy the untouched WAV into `assets/audio/narration/`, and record what was measured. Never reuse or overwrite another production.
3. Transcribe and align only with an already available local ASR model. If unavailable, do not silently upload audio, fabricate words, or claim precise timestamps; use the user-provided script and record timing limits.
4. Build narrative beats, a distinct visual direction, storyboard, and audio cue sheet before writing scenes.
5. Scaffold the Remotion composition inside the project. Use the existing official Remotion skill bundle in `.agents/skills/` plus project-specific skills in `.opencode/skills/`.
6. Delegate scene/motion and audio work to `@motion-designer` and `@sound-designer` after the shared storyboard/timing is ready. Use `@video-qa` as an independent visual/audio reviewer.
7. Preview opening, middle, climax, and ending; inspect the moving video and a contact sheet where useful. Fix visible composition, typography, rhythm, and synchronization problems before the full render.
8. Render the final video requested by `/make-video`; inspect MP4 metadata, frame integrity, narration, music/SFX balance, subtitles, and ending. Save the QC report, subtitle file when timing is reliable, and thumbnail inside that project's folder.

## Visual quality rules

Use a visual style that belongs to this story rather than a generic template. Give environments shape, depth, lighting, and slow secondary motion where it helps. Vary the shot size and camera movement; use organic forms and character movement only when they fit. Avoid static slides, card-after-card layouts, box-shaped placeholder people, repeated zooms, and decorative effects with no story purpose. Inspect actual previews: syntactically correct Remotion code is not proof of good visual design.

## Sound rules

Keep the original voiceover untouched and dominant. Make BGM follow the actual emotional arc, duck under speech, and leave moments of quiet. Place SFX only when a narrated event justifies them. Keep narration, music, effects, and final mix as separate stems. Prefer local/procedural sounds or clearly licensed assets; no paid generation or remote upload without approval. Record what was actually generated and measured.

## Current machine status

In the managed workspace on 2026-11-08: Node v26.13.0 and FFmpeg 9.0.2 are available. The supplied example WAV is readable and measures 149.171 seconds. The repo `.venv` has Python 3.12.10 and `faster-whisper`, but `scipy` is absent; local ASR model availability was not established. `py` is unavailable on PATH. Running `opencode --version` was blocked because the host denied access to its user log, so OpenCode runtime/model calls remain unverified here.

## Evidence behind the setup

Remotion's official AI guide explicitly supports OpenCode, recommends a coding agent plus Remotion Agent Skills, and documents `npx remotion skills add`. OpenCode documents project-local agents under `.opencode/agents` and discovers skills under `.opencode/skills` and `.agents/skills`. Community examples show authors share better outcomes when they supply a storyboard/reference frames and refine previews; other posts say the skill alone still needs a good prompt. These are individual workflow reports, not controlled quality benchmarks. No independent review located here establishes that the particular 9Router + `cx/gpt-6-luna` combination reliably produces professional Remotion motion design; the runtime must be smoke-tested against the live model catalog and the output judged by preview/QC.

Sources checked on 2026-11-08:

- [Remotion: prompting videos with coding agents](https://www.remotion.dev/docs/ai/coding-agents)
- [Remotion: Agent Skills](https://www.remotion.dev/docs/ai/skills)
- [OpenCode: agents](https://opencode.ai/docs/agents/)
- [OpenCode: agent skills](https://opencode.ai/docs/skills/)
- [9Router OpenCode setup guide](https://9router.wiki/guides/opencode/) — independent guide; emphasizes testing the exact routed model and a harmless tool call separately.
- [Community report: making a Remotion launch video](https://www.reddit.com/r/SideProject/comments/1t75gj8/i_made_a_launch_video_with_remotion_heres_what_i/) — anecdotal workflow sharing storyboard timings and using editable motion controls.
- [Community discussion: Remotion video skill and prompt quality](https://www.reddit.com/r/ClaudeCode/comments/1qkmh4z/remotionvideo_skill_very_interesting_skill_but/) — individual feedback; not evidence that any one agent setup will produce the same quality for every prompt.

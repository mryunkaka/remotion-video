# Project handoff: Remotion video production workspace

**Snapshot date:** 2026-11-11  
**Repository:** `D:\Project\remotion-video`  
**Purpose:** Single-file handoff combining workspace instructions, context, plan, tracker, decisions, changelog, test report, and security policy.  
**Status:** Workspace configuration and production assets exist; OpenCode/9Router runtime remains unverified. Multiple productions exist in varying states; do not assume any is complete without its render and QC evidence.

## 1. AGENTS.md — workspace instructions

### Production boundaries
- Place each production in `projects/<name>/`. Never overwrite a production or reuse its creative assets without permission.
- Each production owns its narrative, copied inputs, assets and provenance, Remotion app, renders, status, and QC.
- Keep `docs/WORK-STATUS.md` in each production as a live checklist. Update after real phases: audio/transcript validation; story, storyboard, and style guide; asset plan; original BGM/SFX and mix; Remotion build; preview and independent QA; final render and delivery. Never mark a phase complete without evidence files/results.

### Creative and production workflow
- Treat user brief as creative direction and supplied voiceover as source of truth for spoken words/runtime. Keep original recording unchanged. No replacement TTS, voice cloning, pitch change, or omitted lines.
- Work in stages: intake/local media audit; narrative beats; art direction; storyboard/timing; asset plan/provenance; composition; preview/critique; render; technical/visual QC.
- Use global `remotion-visual-production` skill and global video agents when available. Also use `.agents/skills/remotion-best-practices/SKILL.md`, then relevant references. If global resources unavailable, use local `.opencode/` agents/skills.
- After storyboard/cue sheet, build original BGM/SFX with local tools (NumPy/FFmpeg synthesis acceptable), keep stems separate, and build visuals. Delegate visual/audio work to `@motion-designer` and `@sound-designer` after storyboard, with shared timing/cue contract. Have `@video-qa` independently critique previews before director revisions.
- First make a tiny OpenCode tool/delegation call. If 9Router does not return usable tool calls, continue sequentially; do not repeatedly retry delegation or claim parallel agents ran when they did not.
- Let story determine visual language. Use distinctive environments, depth, light, texture, intentional camera movement, varied shot scale/rhythm/direction/transitions. Avoid generic card grids, repeated rectangles, static slides, dashboards, identical zooms, and decorative motion/effects without story purpose.
- Source each external asset from a verifiable source. Record creator, URL, license/terms, retrieval date, modifications in `assets/PROVENANCE.md`. No paid APIs, remote audio upload, or unlicensed music without explicit approval.
- Do not claim completion until rendered video exists and technical, visual, subtitle, and audio checks are recorded in `docs/QC-REPORT.md`.

### Local audio and privacy
- Analyze user audio locally. Use `ffprobe` for format/duration; use local ASR/alignment only when installed with model available locally. Never upload narration to transcription, voice, music, or storage service.
- If local ASR unavailable, do not invent transcript or word timestamps. Use supplied script and report timing confidence honestly, or request transcript if needed for accurate subtitles.
- Copy untouched source voiceover to new production's `assets/audio/narration/`. Build editable separate BGM/SFX stems and mix around voice. Follow story arc and pauses; duck music under speech; keep SFX sparse and causal; avoid masking/clipping narrator. Record generated/sourced sound provenance.

### Delivery and rendering
- Use requested aspect ratio/platform; absent direction, choose and explain format in style guide. Use frame-based Remotion animation and deterministic renders.
- Preview opening, middle, climax, ending; contact sheet for longer videos. Check dimensions, frame rate, codec, full duration, black/frozen frames, audio/clipping, voice-scene timing, subtitle readability/synchronization, final fade. Keep outputs inside production.
- `/make-video` is end-to-end. Intake report, empty project, storyboard, or silent render is not completion. Final MP4 must exist, pass `ffprobe`, and have QC report.
- Final render command: `node tools/render-until-mp4.mjs --project <slug> --entry src/index.tsx --composition <id> --output out/<final>.mp4`. Keep process/session alive and poll while progressing; retry until valid video stream appears.
- Repair deterministic build errors before resuming watchdog. Do not use placeholder media or claim success without actual MP4.
- If shell scanning rejects PowerShell command, run equivalent via Node `child_process.spawn`; do not treat rejection as production blocker.

## 2. PROJECT-CONTEXT.md — workspace snapshot

### Workspace and stack
- OpenCode + 9Router + Remotion reusable video-production workspace. Per repo README: isolated productions live under `projects/<slug>/`; project-local director/motion/sound/QA agents and official Remotion Agent Skills are configured.
- Workspace package: private `remotion-studio-scaffold`, Remotion/CLI `4.0.541`, React `19.3.1`, TypeScript `5.9.3`. Scripts: `npm run dev`, `npm run build`, `npm run lint` (`eslint src && tsc`). Node engine `^20.19.0 || ^22.13.0 || >=24`.
- OpenCode config selects `9router/cx/gpt-6-luna` using `https://9router.saijaan.my.id/v1`; API key read from `NINEROUTER_API_KEY` environment variable. Do not expose key.
- Workspace includes `AGENTS.md`, `opencode.json`, `.opencode/`, `.agents/skills/`, `tools/`, `shared/`, `templates/`, `scripts/`, `productions/`, `docs/`, root `src/`, and `projects/`.
- Useful docs: `README.md`, `docs/INSTALLATION.md`, `docs/USAGE.md`, `docs/OPENCODE-VIDEO-WORKFLOW.md`, `docs/GLOBAL-ARCHITECTURE.md`, `docs/VALIDATION-REPORT.md`.

### Existing production directories
Observed under `projects/`: `between-sleep-and-sky-demo-20261108`, `gunung-julahit`, `gunung-julahit_v2_backup`, `jejak-sejarah-megasari`, `megasari`, `megasari_audio_mix`, `megasari_audio_stems`, `megasari_code_docs`, `pulau-halimun-perahu-tak-kembali-20261108`, `pulau-laut-forest-documentary-20261108`, `pulau-laut-saranjana-horror-20261108`, `saranjana-kota-terlarang-20261109`, `sebelimbingan-project`, `synthetic-one`, `synthetic-two`, `v3_tmp`, plus ZIP archives. Project statuses differ; directory existence does not establish delivery completion. Inspect project-specific `docs/WORK-STATUS.md` and `docs/QC-REPORT.md` plus actual render before reporting status.

### Known runtime evidence and gaps
- `docs/VALIDATION-REPORT.md` reports Node `v26.13.0`, FFmpeg `9.0.2`, a configured example WAV runtime `149.170958` seconds, Python `3.12.10`, NumPy and `faster-whisper` in `.venv`; local ASR model availability not established.
- Validation report states `NINEROUTER_API_KEY` absent in checked process, 9Router model/tool call unverified, and `opencode --version` blocked by managed-process access to user log. Its machine observations are dated 2026-11-08; recheck on target Windows session.
- Do not assume example WAV path or previous workspace notes refer to current request/input.

## 3. IMPLEMENTATION-PLAN.md — next steps

1. **Confirm target.** Determine whether user means reusable workspace or a specific production. This report covers workspace; each production needs separate status/QC audit.
2. **Runtime smoke test.** On user's Windows session, verify OpenCode command, agent/skill/`/make-video` discovery, `NINEROUTER_API_KEY`, model reply, and harmless structured tool call. Never print secret.
3. **Select/create production.** Confirm brief and local narration path; create unique project; copy untouched audio; measure with `ffprobe`; confirm transcript/ASR model availability locally.
4. **Preproduction.** Prepare story beats, style guide, timed storyboard, cue sheet, asset/provenance plan; update project `docs/WORK-STATUS.md` with evidence.
5. **Build.** Create visuals and separate original audio stems; implement production-local Remotion composition; preserve source narration; follow privacy and licensing rules.
6. **Review and delivery.** Render representative preview; obtain independent QA; revise; render final MP4 with watchdog; verify stream/dimensions/fps/codec/duration/frame integrity/audio/subtitles/fade; save `docs/QC-REPORT.md` and update tracker.
7. **Workspace hygiene.** Resolve or scope existing TypeScript/lint errors before treating workspace-wide lint as pass. Avoid changing unrelated production files without permission.

## 4. TASK-TRACKER.md — current status

| Area | Status | Evidence / next action |
|---|---|---|
| Workspace configuration | Configured; runtime unverified | `opencode.json`, `docs/VALIDATION-REPORT.md`; smoke-test OpenCode/9Router on target session |
| Production inventory | Partial | 17 named production directories observed; audit per-project status and renders only for selected target |
| Audio/transcript | Not validated for current request | No narration identified in this request; inspect exact supplied local input when provided |
| Story/storyboard/style | Not started for current request | Requires target production brief and voiceover |
| Asset plan/provenance | Not started for current request | Create project-local `assets/PROVENANCE.md` for selected production |
| Original BGM/SFX/mix | Not started for current request | Generate stems after cue sheet; keep local and editable |
| Remotion build | Existing projects; current target unknown | Choose isolated production before editing |
| Preview/independent QA | Not verified for current request | Preview and obtain QA evidence after build |
| Final render/delivery | Not verified for current request | Require valid MP4 and project QC report |
| Workspace lint/typecheck | Failed | `npm run lint`: ESLint stage completed; TypeScript stage reports unused imports/variables across `opencode-kit/template`, `projects/gunung-julahit`, `projects/gunung-julahit_v2_backup`, `projects/jejak-sejarah-megasari`, `projects/megasari_code_docs`, and `projects/v3_tmp`; also type errors for missing `segments`/`frames` in `projects/megasari_code_docs/jejak-sejarah-megasari`. See TEST-REPORT below. |

## 5. DECISIONS.md — established decisions

- Isolate productions in `projects/<slug>/`; no overwrites or asset reuse without user permission.
- Preserve supplied voiceover exactly; source audio, not model-generated text/audio, determines spoken words/runtime.
- Local-only audio analysis; no narration uploads. No fabricated transcript/timing when ASR unavailable.
- Keep narration, BGM, SFX, and final mix separate where applicable; music ducked under voice.
- External assets require verifiable provenance and license/terms; no unapproved paid services or unlicensed music.
- Prefer story-specific environments, compositions, and motion over generic slide/card templates.
- Completion requires real MP4, `ffprobe` validation, and written QC. A configured project or source code alone is not delivery.
- This handoff describes workspace, not an inferred choice among existing productions.

## 6. CHANGELOG.md — handoff snapshot

- **2026-11-11:** Consolidated workspace instructions, configuration/context, production workflow, validation limitations, lint results, security rules, and next steps into this handoff file. No production code, source audio, credentials, or render changed for this report.
- **Earlier setup (per existing docs; dates noted there):** Workspace configured for OpenCode/9Router/Remotion; project-local production agents/skills, official Remotion skills, project creation/contact sheet utilities documented. `docs/VALIDATION-REPORT.md` records setup validation and unresolved live runtime checks as of 2026-11-08.

## 7. TEST-REPORT.md — checks run

- **Command:** `npm run lint` on 2026-11-11.
- **Result:** Failed, exit code 1. Script runs `eslint src && tsc`; TypeScript emitted TS6133/TS6192 unused declarations/imports in `opencode-kit/template` and several production trees. TS2339 reports missing `segments` and `frames` properties in `projects/megasari_code_docs/jejak-sejarah-megasari` types/data use. Full diagnostics were printed in session output; rerun command for complete current output.
- **Scope caution:** `tsconfig` includes files in project/template directories, so workspace-wide lint catches existing out-of-root source. Failures do not establish which production can render; do not silently alter unrelated projects to make global lint pass.
- **Prior checks (per `docs/VALIDATION-REPORT.md`, 2026-11-08):** `opencode.json` parsed; `node --check tools/create-video-project.mjs` succeeded; example WAV readable by `ffprobe`; Node/FFmpeg available. These are historical setup checks, not proof of current production build/render.
- **Not verified:** OpenCode runtime/model/tool call; local ASR model; Remotion final render; final MP4 technical/visual/audio/subtitle QC for target production.

## 8. SECURITY-POLICY.md — handling rules

- **Credentials:** Keep `NINEROUTER_API_KEY` in environment/approved secret store. Never commit, paste into reports, print in logs, or send to other model. `opencode.json` references environment variable; preserve pattern.
- **User media:** Keep narration on local machine. Do not upload to ASR, voice, music, storage, or other external services. Copy untouched source only into authorized production folder; do not alter original.
- **External services/cost:** No paid APIs, remote generation, or paid asset services without explicit user approval. Do not make network calls with private media.
- **Assets/licensing:** Use verifiable sources and record creator, URL, license/terms, retrieval date, and modifications in production provenance. No unlicensed music absent explicit approval.
- **Project isolation:** Treat existing user productions and uncommitted workspace files as user work. Inspect before editing; do not overwrite, delete, reset, or reuse their assets without permission.
- **Disclosure:** Handoff must state unverified runtime/build/render status honestly. Do not claim a video is complete without actual validated MP4 and QC report.

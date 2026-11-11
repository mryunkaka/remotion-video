# Remotion video production workspace

This workspace is set up for OpenCode + 9Router + Remotion, with isolated production folders under `projects/<slug>/`, project-local director/motion/sound/QA agents, and Remotion's official Agent Skills.

## Start OpenCode

```powershell
cd D:\Project\remotion-video
opencode
```

Then run `/make-video "C:\Users\JAR1-ICT-NB\Downloads\ugc-kanvas-voiceover-zephyr (4).wav" "C:\path\to\brief.md"` (or include the creative brief in the same OpenCode conversation). The model is configured as `9router/cx/gpt-6-luna` through `https://9router.saijaan.my.id/v1`; `NINEROUTER_API_KEY` must be set in the environment.

The workflow analyzes the voiceover locally, writes a visual style guide and storyboard, builds the Remotion app and sound stems in a new production folder, previews and refines it, and records render QC. See [installation](docs/INSTALLATION.md), [workflow](docs/OPENCODE-VIDEO-WORKFLOW.md), and [usage](docs/USAGE.md).

## Manual project and media utilities

Create an isolated production directory with `node tools/create-video-project.mjs` and required metadata options. Use `--audio "<local WAV path>"` to copy and measure a source voiceover. `tools/contact-sheet.mjs` builds a labeled image overview from extracted frames (requires FFmpeg).

No external audio or asset provider is enabled by default. Paid services require approval; record asset sources and licenses in the production's `assets/PROVENANCE.md`.

Remotion is a trademark of Remotion, Inc. See [Remotion's license terms](https://www.remotion.dev/license).

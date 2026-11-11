# Usage

OpenCode video workflow and configuration:

```powershell
cd D:\Project\remotion-video
opencode
```

Then create a new isolated production from a local voiceover and brief:

```text
/make-video "C:\Users\JAR1-ICT-NB\Downloads\ugc-kanvas-voiceover-zephyr (4).wav" "C:\path\to\brief.md"
```

See [OPENCODE-VIDEO-WORKFLOW.md](OPENCODE-VIDEO-WORKFLOW.md) for the full steps, local-audio handling, and QC gates.

Create a project directory manually:

```powershell
node tools/create-video-project.mjs --title "Title" --name "folder-name" --type documentary --ratio 16:9 --duration "5 minutes" --style "describe style" --language Indonesian --narrative "path/to/narrative.md" --assets "optional references"
```

Use `--source "narrative text"` instead of `--narrative`. Name must be unique and contain only letters, digits, `_` or `-`. Extract timestamp-named keyframes to a project-local directory, then run `node tools/contact-sheet.mjs <frames-dir> [output-prefix]`; ffmpeg must be on PATH. Keep overview plus individual detail sheets; critique each sheet, not only overview. Record comparison sources and critique in project QC report.

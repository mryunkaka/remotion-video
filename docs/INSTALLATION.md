# OpenCode setup (Windows)

This repository now contains a project-local OpenCode setup. Start it from this folder so OpenCode discovers `opencode.json`, `.opencode/`, `.agents/skills/`, and `AGENTS.md`:

```powershell
cd D:\Project\remotion-video
opencode
```

The configured default is `9router/cx/gpt-6-luna`, routed to `https://9router.saijaan.my.id/v1`. The config reads `NINEROUTER_API_KEY` from the process environment; it does not contain the secret. Set the key in Windows Environment Variables or in your PowerShell profile, then open a new terminal. Do not put the key in the repository.

Before using the video command:

1. Start 9Router and confirm its dashboard/provider login is ready.
2. Confirm its model list includes `cx/gpt-6-luna` and its API key is available as `NINEROUTER_API_KEY`.
3. Run `opencode` in the repository. In the TUI, run `/models` and select the configured model if it is not already selected.
4. In a scratch project, confirm a short text reply, then ask the model to read a small harmless file. This checks the text route and structured tool calls separately before a long production.
5. Start a new production with `/make-video "C:\Users\JAR1-ICT-NB\Downloads\ugc-kanvas-voiceover-zephyr (4).wav" "C:\path\to\brief.md"` or give the brief in the same prompt/accessible attachment.

The OpenCode executable, 9Router server, API key, and model catalog are user-machine services. They must be checked on that Windows machine. The current managed workspace could not launch OpenCode because it was denied access to OpenCode's per-user log; Node and FFmpeg are present, but the `py` launcher is not on PATH. The repo virtual environment has Python 3.12 and `faster-whisper`; whether its local model cache is ready still needs checking on the Windows session.

The original Remotion agent skills are already installed in `.agents/skills/`; OpenCode officially discovers this path. New workflow instructions and production agents live in `.opencode/`. See [OPENCODE-VIDEO-WORKFLOW.md](OPENCODE-VIDEO-WORKFLOW.md) for what the pipeline does and how it protects local audio.

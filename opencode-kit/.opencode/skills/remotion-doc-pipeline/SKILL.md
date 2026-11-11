---
name: remotion-doc-pipeline
description: Pipeline end-to-end video dokumenter Remotion dari narasi WAV — alignment audio, scene, render sekali, QA. Pakai saat membuat video naratif 9:16.
---
# Pipeline dokumenter Remotion

## Struktur (salin dari `template/`)
`src/lib.ts` (W,H,FPS,palet,easing,shake) · `src/Video.tsx` (daftar SCENES [id,start,end,Comp], Shaker untuk impact, Audio mix) ·
`src/components/{Common,Layers,UI,Creatures,Datu}.tsx` · `src/scenes/Scenes*.tsx` · `src/data/{anchors,subtitles,audio-cues}.json` ·
`scripts/*` · `public/{fonts,images/textures,audio}`.

## Langkah
1. `python scripts/audio-audit.py <wav>` → sample rate, peak, clipping, segmen bicara → `docs/segments-raw.json`.
2. `python scripts/align.py` lalu `align2.py` → `docs/alignment.json` (frasa↔interval ucapan via DP; kata dihitung proporsional di dalam frasa).
   Tidak ada ASR/Whisper? Ini cukup akurat untuk narasi dengan jeda alami. Bila ada faster-whisper + model, pakai untuk word-level asli.
3. Isi `src/data/anchors.json` = detik kata pemicu (mis. "tiba-tiba", "pecah", "muncullah"). Semua SFX/impact/scene merujuk ke anchor ini.
4. Scene = `[id, start, end]` dari batas frasa; beri `pre=0.5s` crossfade masuk. Total durasi = durasi WAV + ±1s ekor.
5. Subtitle: `scripts/generate-subtitles.py` → `src/data/subtitles.json` + `out/*.srt` (maks 2 baris, kata kunci disorot).
6. Still check → perbaiki → render sekali di background → `ffprobe` → preview (`ffmpeg -ss -t`) → thumbnail (`-frames:v 1`).

## Jebakan yang sudah ditemui
- Jangan menimpa stem audio dengan sample rate berbeda (mix mengasumsikan 48 kHz).
- `mix-audio.py` lambat (gaussian filter) — jalankan di background.
- 2 core CPU ≈ 25 menit untuk 150 dtk @1080x1920. File CRF18+grain bisa ±350 MB; buat salinan 1300k untuk unggah.

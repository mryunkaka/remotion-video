---
description: Buat video dokumenter Remotion 9:16 dari naskah + audio narasi. Pemakaian — /make-video "<path.wav>" "<file-naskah.md>"
agent: director
model: 9router/cx/gpt-6-luna
---
Argumen: $ARGUMENTS  (argumen 1 = path WAV narasi, argumen 2 = file brief/naskah)

Kerjakan end-to-end sesuai AGENTS.md:
1. Baca brief & naskah. Tentukan slug judul, buat folder baru `<slug>/` dari `template/` (salin, jangan timpa), `npm install` di dalamnya.
2. Salin WAV ke `<slug>/public/audio/narration/voiceover-final.wav`; audit + alignment (jangan kirim audio ke layanan luar).
3. Tulis storyboard, buat scene, BGM/SFX/mix, subtitle + SRT, header brand.
4. Prototype still → perbaiki → satu kali render penuh → QA → preview + thumbnail + SRT + salinan ringan.
5. Laporan akhir: path file, hasil QA, hal yang tidak bisa diverifikasi.

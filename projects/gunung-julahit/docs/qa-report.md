# QA report — GUNUNG JULAHIT

**STATUS: SIAP RENDER LOKAL.** Video MP4 belum dirender oleh Claude.

## Hasil
- `npx tsc --noEmit`: lulus tanpa error.
- 6 still diperiksa (skala 0.4, Chrome sandbox): pembuka/peta/jalan+tangan/layar gelap/menghilang/end card. Zona layout bagian 4 terjaga (handle 100, label 188, subtitle 1500–1680, referensi 1760; area animasi bebas teks besar).
- Durasi komposisi: 190.301 dtk = 5709 frame @30 fps, 1080x1920. 40 beat, 8 jumpscare.
- Mix: -15.9 LUFS, true peak -2.3 dBTP, LRA 7.6 LU (target ~-16 LUFS, TP <= -1 dBTP).

## Audio (urutan VO1 -> VO2)
- VO1 asli 131.49 dtk, suara berakhir di 67.59 dtk; sisanya 63.45 dtk adalah hening + dengung frekuensi rendah (bukan suara) -> dibuang di versi gabungan.
- VO1 punya 2 jeda hening internal (7,97 dtk @14,26 dan 7,28 dtk @52,23) -> dipendekkan jadi 3,0 dtk. Ubah `MAX_GAP` di `scripts/prepare-audio.py` (None = biarkan apa adanya) lalu jalankan ulang bila ingin jeda asli.
- VO2 128.01 dtk, utuh. Jeda VO1->VO2 = 0,3 dtk. Gabungan suara berakhir 187.101 dtk + end card 3,2 dtk.
- Suara tidak di-regenerate/dipercepat/diubah karakternya; hanya gain/limiter master. File asli di `public/audio/narration/input/` identik dengan unggahan.
- Ducking: musik -12 dB (~20 dB di bawah narasi), ambience -6 dB, SFX -3 dB saat narasi aktif. Semua suara buatan sendiri (lihat `asset-licenses.md`).

## Jumpscare (waktu hentakan)
- JS1 (beat 6): 0:17.90
- JS2 (beat 10): 0:27.08
- JS3 (beat 15): 0:43.56
- JS4 (beat 17): 0:50.16
- JS5 (beat 25): 1:30.75
- JS6 (beat 30): 1:50.92
- JS7 (beat 34): 2:06.38
- JS8 (beat 36): 2:14.25
Satu hentakan per momen, tanpa jeritan/bisikan. JS7: musik+ambience hening 0,6 dtk lalu satu impact. Visual hanya menggelap singkat (tanpa flash putih/strobo).

## Subtitle
`out/GUNUNG_JULAHIT_PEREMPUAN_MISTERIUS.srt` — **alignment tingkat segmen, BUKAN ASR**: teks naskah dicocokkan ke segmen bicara dari deteksi energi suara; kemungkinan meleset sampai ±1 dtk. Maks 2 baris, tidak memotong kata. Naskah di brief dipakai apa adanya; bila audio menyimpang dari naskah, subtitle ikut menyimpang.

## Batasan jujur
- Peta konseptual, tidak berskala, bukan geografi nyata. Semua visual = ilustrasi prosedural (SVG), bukan rekaman.
- Beat 2 pendek (~0,9 dtk) karena VO "Namanya... Gunung Julahit." jatuh tepat setelah kalimat sebelumnya; judul dilanjutkan ke beat 3. Beat VO1 rata-rata ±3 dtk (narasi VO1 memang padat), VO2 ±6 dtk.
- Sumber Correcto/Yupa tidak bisa dibuka di sesi ini (lihat factual-notes).
- Font memakai tumpukan sistem Windows (Segoe UI / Arial Black); di Linux jatuh ke Liberation Sans.

## Render
`.\render-local.ps1` (di folder project) — atau:
`npx remotion render src/index.ts GunungJulahit out/GUNUNG_JULAHIT_PEREMPUAN_MISTERIUS_FINAL.mp4 --browser-executable "C:\Program Files\Google\Chrome\Application\chrome.exe" --codec h264 --concurrency 1`


## Revisi V3 (ritme & variasi visual)
- Audio, `timeline.json`, SRT, label fakta, dan `layout.ts` tidak diubah. Hanya visual.
- Angka audit sebelum -> sesudah: shot 40 -> 28; median 3,88 -> 6,41 dtk; road 59,3% -> 22,1%; A-B-A (jenis scene) 24 -> 0; fade label+referensi 70 -> 8; kartu statis 33,5 -> 0 dtk; cut keras 13 -> 3; jenis scene 7 -> 15.
- File berubah: `src/data/beats.ts` (ditulis ulang), `src/data/shots.json` (baru), `src/components/scenes.tsx` (ditulis ulang), `src/components/art2.tsx` (baru), `src/components/art.tsx` (Hills: peakH/peakW, ridgeAt), `src/components/Frame.tsx` (kamera 6-10%, LabelLayer, CardLayer), `src/GunungJulahit.tsx`, `src/Thumbnail.tsx`, `scripts/audit-beats.mjs`, `package.json` (`npm run audit`), `docs/audit-*.md`, `docs/shotlist-v3.md`, `docs/v2-shots.json`.
- Jumpscare = insert mikro 1,0-1,4 dtk dalam shot panjang pada waktu persis `timeline.jumpscares`; JS1 berupa cutaway ke lorong pohon, lainnya overlay di dalam shot. Tetap tanpa strobo/flash putih.
- Verifikasi: `npm run audit` lulus; `tsc` bersih; contact sheet 12 still (skala 0,25) diperiksa sekali.
- Batasan: ritme VO1 tetap padat (shot 4,5-6 dtk) karena VO1 hanya 59 dtk; pembagian shot memakai tebakan celah antar-cue (alignment segmen, bukan ASR); tidak ada render penuh sehingga kehalusan gerak dan performa `--concurrency 1` belum diuji; sosok "Walker" (pria) adalah siluet generik tanpa wajah; seluruh visual tetap ilustrasi.

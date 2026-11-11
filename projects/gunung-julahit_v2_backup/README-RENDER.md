# GUNUNG JULAHIT — render lokal

Project Remotion 1080×1920 (9:16), 30 fps, ±190 detik. Audio (narasi + BGM + SFX) sudah dimix di `public/audio/mix-master.wav`.

## Syarat
- Windows, **Node 18+** (`node -v`), **Google Chrome** (atau Edge) terpasang
- (opsional) `ffprobe` untuk memeriksa hasil

## Cara
1. Salin folder project ini ke `D:\Project\remotion-video\projects\gunung-julahit` (atau ubah `$proj` di `render-local.ps1`).
2. Buka PowerShell di folder itu, lalu jalankan:
   ```powershell
   .\render-local.ps1
   ```
   (bila diblokir: `Set-ExecutionPolicy -Scope Process Bypass`)
3. Hasil di folder `out\`:
   - `GUNUNG_JULAHIT_PEREMPUAN_MISTERIUS_FINAL.mp4`
   - `GUNUNG_JULAHIT_PEREMPUAN_MISTERIUS_THUMBNAIL.jpg`
   - `GUNUNG_JULAHIT_PEREMPUAN_MISTERIUS.srt` (subtitle terpisah, sudah di-burn juga ke video)

## Perkiraan waktu
~5.700 frame. Dengan `--concurrency 1` kira-kira 40–90 menit tergantung PC. Menaikkan `--concurrency` (mis. 4) mempercepat bila RAM cukup.

## Pratinjau / cek cepat
- `npm run studio` untuk membuka Remotion Studio.
- `npx tsc --noEmit` harus bersih.
- Satu frame: `npx remotion still src/index.ts GunungJulahit out/cek.png --frame=1510 --scale=0.4`

## Memeriksa hasil
`ffprobe` harus menunjukkan `width=1080`, `height=1920`, `r_frame_rate=30/1`, ada stream audio (aac).

## Membuat ulang audio
Bila file VO diganti: taruh di `public/audio/narration/input/` (`01_vo1_original.wav`, `02_vo2_original.wav`) lalu `python scripts/prepare-audio.py` (butuh Python 3, numpy, scipy, ffmpeg). Skrip ini menulis ulang `src/data/timeline.json`, jadi durasi/beat/subtitle ikut menyesuaikan.

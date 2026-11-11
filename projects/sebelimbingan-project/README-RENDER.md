# Render lokal (Windows)

Prasyarat: Node.js 18+ dan FFmpeg/ffprobe di PATH. Remotion mengunduh browsernya sendiri saat render pertama.

1. Ekstrak zip.
2. Klik dua kali `render-lokal.bat` (atau jalankan dari terminal).
   Skrip menjalankan `npm install`, lalu `npx remotion render` (composition `Sebelimbingan`, 1080x1920, 30 fps, H.264 + AAC, `--concurrency=50%`), lalu `ffprobe`.
3. Hasil: `out/SEBELIMBINGAN_KOTA_YANG_HILANG_FINAL.mp4`. Audio `public/audio/mix-master.wav` ikut ter-mux lewat komponen `<Audio>`.
4. Periksa: 1080x1920, 30 fps, h264, ada stream aac, durasi sekitar 146,7 detik.

Catatan: subtitle sudah tampil di dalam video; berkas `out/SEBELIMBINGAN_KOTA_YANG_HILANG.srt` disertakan terpisah. Penyelarasan subtitle berbasis jeda audio, bukan ASR. Thumbnail belum dibuat. Dokumen sumber ada di `docs/`.

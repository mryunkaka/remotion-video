# QC Report — Pulau Halimun

Status: FINAL MP4 valid; QC teknis dan reviewer independen selesai.

## Output

- Final: `out/SARANJANA_FINAL.mp4` (17,875,904 byte)
- Thumbnail: `out/SARANJANA_THUMBNAIL.jpg` (still pada 74.6 s)
- Subtitle: `out/SARANJANA.srt`

## Technical QC (ffprobe / FFmpeg)

- Container MP4, H.264 video + AAC-LC audio; dua stream terbaca.
- Video: 1080×1920, 30 fps, 4,476 frame; durasi stream 149.200 s.
- Audio: stereo, 48 kHz; durasi/container 149.205 s.
- Audio loudness scan: mean −20.1 dBFS, peak −3.2 dBFS; tidak clipping.
- Render watchdog menerima MP4 setelah ffprobe menemukan video stream dan durasi >1 s.
- Catatan kompatibilitas: `yuvj420p`, `color_range=pc`, `color_space=bt470bg`. Bukan metadata warna SDR yang lazim; periksa playback lintas platform. Tidak ditranscode karena file valid dan transcode akan mengubah deliverable.

## Visual / subtitle

- Preview opening, middle, ending, keyframe set/contact sheet, dan revisi caption/end-card ditinjau sebelumnya.
- Reviewer independen memeriksa frame tengah: teks/subtitle terbaca; komposisi cenderung gelap dan bergaya ilustrasi sederhana. Cakupan review bukan seluruh frame.
- SRT berasal dari segmen ASR Whisper lokal. Teks diverifikasi terhadap transkripsi; timestamp segmen merupakan machine alignment, bukan word-level. Sinkronisasi kata tidak dijamin presisi.
- Narasi WAV berkisah Pulau Halimun, bukan Saranjana. Visual mengikuti audio asli; tidak mengganti narasi atau menambahkan ucapan.

## Audio / batas pemeriksaan

- BGM, SFX, dan VO tersedia sebagai stem lokal terpisah; final mencampur audio sesuai output composition.
- Peak scan tidak menemukan clipping. Review perseptual penuh seluruh durasi dan pemeriksaan frame menyeluruh tidak dilakukan dalam QC ini.

## Independent reviewer

`@render-watchdog` mengonfirmasi dua stream, metadata di atas, dan mean/peak audio. Reviewer juga menandai metadata warna non-umum. Temuan dicatat; render ulang/transcode tidak dijalankan.

---
description: Produksi video Remotion dari brief dan voiceover lokal ke folder produksi baru.
agent: remotion-director
---

Input pengguna: $ARGUMENTS

Jalankan pipeline end-to-end sesuai `AGENTS.md` dan prompt reusable `VIDEO-PRODUCTION-PROMPT.md`. Jangan berhenti pada intake, folder kosong, storyboard, atau laporan status; command ini selesai hanya sesudah MP4 final valid sudah ada dan QC-nya dicatat.

`/make-video "C:\Users\JAR1-ICT-NB\Downloads\ugc-kanvas-voiceover-zephyr (4).wav" "C:\path\ke\brief.md"`

Brief/naskah boleh berupa lampiran yang bisa dibaca OpenCode atau teks dalam pesan yang sama. Path audio Windows harus diperlakukan sebagai satu argumen utuh, termasuk spasi dan tanda kurung. Jika brief sudah ada di percakapan/lampiran dan tidak ada file brief, jangan meminta berkas duplikat.

Jangan mengarang isi lampiran yang tidak dapat diakses. Buat produksi baru di `projects/<slug>/`; jangan menulis ke root produksi atau menggunakan ulang output lain. Jika shell menolak struktur perintah, jalankan langkah melalui Node.js `child_process.spawn`, bukan berhenti. Setelah komposisi siap, jalankan `tools/render-until-mp4.mjs` dan tetap pantau prosesnya sampai file MP4 lolos ffprobe. Bila render gagal, baca log, perbaiki penyebab deterministik (browser, FFmpeg, aset, kode), lalu jalankan lagi watchdog. Jika ASR atau 9Router tidak tersedia, gunakan fallback lokal/berurutan dan lanjutkan; dokumentasikan batasan, bukan menjadikan itu alasan menghentikan produksi.

Pembuatan MP4 adalah syarat selesai. Jangan mengirim status “belum dibuat” sebagai jawaban akhir setelah tugas produksi dimulai; lanjutkan sampai MP4 tersedia, lalu audit video/audio/subtitle dan laporkan bukti nyata.

---
name: narration-audio-workflow
description: Analisis voiceover lokal, sinkronisasi storyboard dan subtitle, perancangan stem BGM/SFX, mixing dan QC tanpa mengunggah audio.
---

# Alur voiceover dan musik

## Voiceover dan timing

- Pertahankan file asli. Gunakan `ffprobe` untuk durasi, sample rate, channel, dan codec.
- Pilih transkripsi/alignment offline yang memang terpasang dan memiliki model lokal. Jangan mengunduh model diam-diam, mengirim rekaman ke layanan cloud, meniru suara, atau menyatakan transkrip diverifikasi tanpa mendengarkannya.
- Simpan transkrip final dan data timing terpisah. Tandai tingkat keyakinan; bila belum ada word timing yang benar, selaraskan shot berdasarkan frasa, jeda, waveform, dan review dengar.
- Durasi video mengikuti rekaman final kecuali pengguna menyatakan target lain. Jangan mempercepat atau memotong voiceover demi durasi.

## Skor dan sound effects

- Buat cue sheet sebelum membuat BGM/SFX: beat cerita, mood, rentang waktu, intensitas, dan ruang bicara. BGM boleh berubah tekstur/tempo/orkestrasi bersama cerita, bukan harus tiga fase yang sama pada setiap produksi.
- Voiceover adalah elemen audio utama. Beri ducking pada musik saat bicara, crossfade yang halus, intro/outro yang wajar, dan jeda yang memberi ruang.
- SFX hanya muncul saat ada kejadian/gerak yang relevan. Jangan memenuhi setiap transisi dengan whoosh atau impact. Set waktu dari alignment yang tersedia; jangan mengklaim milidetik presisi bila datanya hanya perkiraan frasa.
- Simpan voiceover, BGM, SFX, dan mix sebagai file terpisah. Catat apakah audio procedural, buatan lokal, atau bersumber eksternal berikut lisensinya.

## Pemeriksaan mix

Bandingkan loudness dan peak dengan tool yang tersedia. Cari clipping, perubahan level mendadak, ambience yang terus-menerus tanpa tujuan, serta bagian ketika narasi sulit dipahami. Terapkan target loudness sesuai platform/brief; bila tidak ada, pilih target wajar dan catat di QC. Jangan menuliskan angka pengukuran sebelum benar-benar mengukurnya.

---
name: procedural-cinematic-visuals
description: Teknik visual sinematik berlapis di Remotion tanpa aset AI — langit, laut, god-rays, kabut, partikel, kamera, shake, tipografi elegan. Pakai saat mendesain scene agar tidak terlihat seperti slideshow.
---
# Visual sinematik prosedural (React/SVG/CSS + Remotion)

## Resep lapisan (belakang → depan)
1. Gradient langit/dasar laut (3–4 stop, palet tema).  2. Awan/kabut tekstur (`public/images/textures/*.png`, drift lambat, blend screen).
3. God-rays (conic/linear gradient miring, opacity berdenyut halus).  4. Siluet jauh (gunung/pulau) dengan haze.
5. Subjek (SVG berlapis: tubuh, kain tertiup angin, ikan dengan sirip bergerak).  6. Air: gelombang sinus berlapis + caustics + riak.
7. Partikel (gelembung, debu, percik) deterministik via `rnd(i)`.  8. Vignette + film grain (`grain.png` digeser per frame).

## Gerak
- Kamera: push-in, pan, slow orbit (parallax beda kecepatan per lapisan), low-angle, tracking. Variasikan per scene.
- Easing: `ease/easeOut` kubik; `spring` untuk muncul. Impact: `shake()` meluruh `exp(-(t-te)*5)` + scale kecil + flash.
- Slow-motion: remap waktu lokal `t' = lerp` selama 0.4–0.8 dtk pada momen hit.
- Transisi: crossfade 0.5 dtk, whip/flash pada klimaks, fade ke hitam sebelum outro.

## Tipografi
Judul serif (Cinzel/Cormorant) berjarak huruf lebar, garis emas tipis, reveal bertahap (opacity+translate+blur). Subtitle sans (Inter) di pill gelap
semi-transparan, kata kunci emas. Safe-zone TikTok: hindari 160px atas & 380px bawah untuk teks penting selain header/subtitle.

## QA visual
Tidak ada objek melayang tanpa alasan, tangan/wajah rapi, proporsi benar, tidak ada teks acak, tidak ada elemen bertabrakan dengan header.
Anatomi hewan/manusia sederhana tapi konsisten antar scene (satu komponen karakter dipakai ulang).

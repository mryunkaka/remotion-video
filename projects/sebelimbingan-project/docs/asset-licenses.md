# Asset licenses
- Visuals: all original, procedurally drawn SVG/React illustrations (src/art.tsx, src/scenes.tsx). No photos, no archival images, no third-party footage. Every scene carries a label (REKONSTRUKSI VISUAL / ILUSTRASI SEJARAH / PETA KONSEPTUAL).
- Map: stylized conceptual drawing; island outline and marker positions are indicative, NOT survey data.
- Audio: BGM, ambience and SFX synthesized in scripts/make_audio.py (original, no samples). Not archival recordings.
- Narration: user-supplied file.
- Fonts: Inter, Bitstream Charter / DejaVu Serif (system fonts, open licenses).

## Peta (diperbarui)
- Garis pantai Pulau Laut, Pulau Sebuku dan daratan Kalimantan: Natural Earth 1:10m land (domain publik) via paket npm `world-atlas`, disimpan di `src/data/geo.json`. Resolusi kasar: bentuk pantai tidak presisi.
- Titik Sebelimbingan dan Stagen: titik koordinat batas desa (UTM zona 50S) dari Peraturan Bupati Kotabaru No. 105/2019 (batas Stagen–Gunung Sari–Sebelimbingan, X=408328 Y=9632859) dan No. 39/2020 (batas desa Stagen, X=409843 Y=9635439 dan X=410414 Y=9637143 dengan desa lain), dikonversi ke lintang/bujur memakai pyproj. Titik Sebelimbingan adalah pertigaan batas desa, bukan lokasi bangunan tambang. Titik Stagen adalah rata-rata titik batas desa, bukan lokasi dermaga.
- Titik Kotabaru: dekat batas Kelurahan Kotabaru Hulu (Perbup Kotabaru No. 14/2019), digeser sedikit ke daratan pada garis pantai kasar. Indikatif.
- Tidak ada rute rel/jalan, letak dermaga, atau tambang yang digambar di peta. Label "SELAT LAUT" (barat) dan "ke arah Selat Makassar" (timur) bersifat umum.

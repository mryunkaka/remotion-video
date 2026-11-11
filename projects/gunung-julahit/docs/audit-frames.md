# Audit frame — GUNUNG JULAHIT

## Lima temuan teratas (dari angka skrip, baseline V2)
1. **Scene `road` mendominasi**: 59,3% durasi; 17 shot road berurutan (87,3 dtk). Akar: `beats.ts` hanya mengganti pose/lampu pada satu komponen `RoadView`.
2. **Shot terlalu pendek**: median 3,88 dtk, 28 dari 40 shot < 4,5 dtk (min 1,55). Akar: beat dibuat 1:1 dengan potongan cue VO1 yang padat.
3. **Label/referensi berkedip**: 70 kali fade (label+referensi di setiap beat). Akar: `labelO` per beat di `Frame.tsx`.
4. **Kartu statis 33,5 dtk (17,6%)**: beat 39-40 hanya teks di latar diam. Akar: `CardView`/`EndView` tanpa gerak dan tanpa sinkron per kalimat.
5. **Pola bolak-balik & cut keras**: 24 pola A-B-A tingkat jenis scene, 13 cut keras, 10 batas shot jatuh di tengah cue, dissolve hanya 9 frame. Akar: urutan hill/road/map diulang dan transisi tetap.

## Konfirmasi / bantahan tabel brief
- Road 62% beat / 46% durasi: **dikoreksi** — 25 dari 40 beat (62,5%), tetapi 59,3% durasi.
- Beat < 3 dtk di VO1 dan beat terlalu pendek: **dikonfirmasi** (28 shot < 4,5 dtk; setelah perbaikan kecil sebelumnya min 1,55 dtk).
- Pola A-B-A: signature ketat (jenis+variasi+kamera) = **0**, tetapi tingkat jenis scene = **24** — bolak-balik terjadi pada jenis scene, bukan signature yang identik.
- Dissolve 9 frame, 23 dissolve/4 dip/13 cut: **dikonfirmasi** (13 cut keras).
- Fade label 40 kali: **dikoreksi** menjadi 70 (label + referensi dihitung terpisah).
- Kartu 33 dtk: **dikonfirmasi** (33,5 dtk). Zoom kamera kecil 2-6%: **dikonfirmasi** (diganti 6-10%).

## Sesudah V3 (ringkas)
shot 40 -> 28; median 3,88 -> 6,41 dtk; road 59,3% -> 22,1%; A-B-A tingkat jenis 24 -> 0; fade label+ref 70 -> 8; kartu statis 33,5 -> 0 dtk; cut keras 13 -> 3; jenis scene 7 -> 15. `npm run audit` LULUS.

---

# SEBELUM (V2)

## Metrik audit — v2-shots.json (V2 / baseline)

| metrik | nilai |
|---|---|
| jumlah shot | 40 |
| durasi min / median / rata-rata / maks (dtk) | 1.55 / 3.88 / 4.76 / 19.20 |
| shot < 4,5 dtk | 28 |
| jenis scene berbeda | 7 |
| % durasi per jenis | road 59.34%, hill 13.57%, end 10.09%, card 7.53%, map 4.80%, bridge 2.48%, montage 2.19% |
| scene road | 59.34% |
| run terpanjang jenis sama | 17 shot (road, 87.25 dtk) |
| pola A-B-A (signature ketat / tingkat jenis) | 0 / 24 |
| signature kembar dalam 30 dtk | 2 |
| kemunculan fade label+referensi | 70 |
| total durasi kartu statis (dtk) | 33.53 |
| cut keras | 13 |
| judul besar | 8 |
| batas shot di tengah cue | 10 |

**Hasil aturan:** baseline, tidak ditegakkan

| id | waktu | dtk | scene | signature | transisi | label |
|---|---|---|---|---|---|---|
| 1 | 0.00–4.41 | 4.41 | hill | hill|p0.95|push | dip 12f |  |
| 2 | 4.41–6.01 | 1.60 | hill | hill|p0.3m|push | dissolve 9f |  |
| 3 | 6.01–8.69 | 2.68 | road | road|M|track | dissolve 9f | ILUSTRASI SUASANA |
| 4 | 8.69–12.56 | 3.87 | map | map|kotabaru|push | dissolve 9f | ILUSTRASI LEGENDA |
| 5 | 12.56–16.56 | 4.00 | hill | hill|p0.9m|panR | dissolve 9f | ILUSTRASI SUASANA |
| 6 | 16.56–19.00 | 2.44 | road | road|M|locked | cut | ILUSTRASI LEGENDA |
| 7 | 19.00–20.80 | 1.80 | map | map|tanjung|push | dissolve 9f | ILUSTRASI LEGENDA |
| 8 | 20.80–22.66 | 1.86 | map | map|three|locked | dissolve 9f | ILUSTRASI LEGENDA |
| 9 | 22.66–25.73 | 3.07 | bridge | bridge||push | dissolve 9f | ILUSTRASI LEGENDA |
| 10 | 25.73–27.38 | 1.65 | bridge | bridge|fig|push | cut | ILUSTRASI LEGENDA |
| 11 | 27.38–28.98 | 1.60 | map | map|saranjana|push | dissolve 9f | ILUSTRASI LEGENDA |
| 12 | 28.98–33.15 | 4.17 | montage | montage||pull | dissolve 9f | ILUSTRASI LEGENDA |
| 13 | 33.15–37.47 | 4.32 | road | road|P|track | dip 12f | REKONSTRUKSI VISUAL |
| 14 | 37.47–41.68 | 4.21 | road | road|LP|push | dissolve 9f | REKONSTRUKSI VISUAL |
| 15 | 41.68–45.45 | 3.77 | road | road|LFdown0.12P|locked | cut | REKONSTRUKSI VISUAL |
| 16 | 45.45–49.34 | 3.89 | road | road|LFdown0.12P|rack | dissolve 9f | REKONSTRUKSI VISUAL |
| 17 | 49.34–50.94 | 1.60 | road | road|LFwave0.38HP|push | cut | REKONSTRUKSI VISUAL |
| 18 | 50.94–53.71 | 2.77 | road | road|LFdown0.46P|push | dissolve 9f | SEBUAH KESAKSIAN YANG DIBERITA |
| 19 | 53.71–55.31 | 1.60 | hill | hill|p1|push | cut | ILUSTRASI SUASANA |
| 20 | 55.31–58.68 | 3.37 | hill | hill|p1|push | dissolve 9f |  |
| 21 | 58.68–68.95 | 10.27 | road | road|MP|track | dip 12f | DRAMATISASI BERDASARKAN KESAKS |
| 22 | 68.95–73.81 | 4.86 | road | road|LMP|panL | dissolve 9f | REKONSTRUKSI VISUAL |
| 23 | 73.81–83.33 | 9.52 | road | road|LFdown0.36MP|locked | dissolve 9f | REKONSTRUKSI VISUAL |
| 24 | 83.33–88.27 | 4.94 | road | road|LFraise0.36MP|push | dissolve 9f | REKONSTRUKSI VISUAL |
| 25 | 88.27–92.41 | 4.14 | road | road|LFdown0.3MP|push | cut | REKONSTRUKSI VISUAL |
| 26 | 92.41–96.25 | 3.84 | road | road|LFdown0.55MOP|locked | cut | REKONSTRUKSI VISUAL |
| 27 | 96.25–100.62 | 4.37 | road | road|SP|tiltDown | dissolve 9f | REKONSTRUKSI VISUAL |
| 28 | 100.62–105.40 | 4.78 | road | road|LFdown0.55MP|push | dissolve 9f | REKONSTRUKSI VISUAL |
| 29 | 105.40–107.29 | 1.89 | road | road|LFpoint0.55MP|push | cut | REKONSTRUKSI VISUAL |
| 30 | 107.29–113.90 | 6.61 | road | road|LFpoint0.55M|tiltUp | cut | REKONSTRUKSI VISUAL |
| 31 | 113.90–121.63 | 7.73 | road | road|LFdown0.55MP|locked | cut | REKONSTRUKSI VISUAL |
| 32 | 121.63–123.62 | 1.99 | road | road|LFstop0.55MP|push | dissolve 9f | REKONSTRUKSI VISUAL |
| 33 | 123.62–125.17 | 1.55 | road | road|LFdown0.4MP|locked | cut | REKONSTRUKSI VISUAL |
| 34 | 125.17–127.86 | 2.69 | road | road|LFdown0.4MP|locked | cut | REKONSTRUKSI VISUAL |
| 35 | 127.86–131.25 | 3.39 | road | road|LMP|tiltDown | dissolve 9f | REKONSTRUKSI VISUAL |
| 36 | 131.25–137.26 | 6.01 | road | road|LFdown0.5MOP|locked | cut | ILUSTRASI HOROR |
| 37 | 137.26–145.93 | 8.67 | road | road|MP|pull | dissolve 9f | REKONSTRUKSI VISUAL |
| 38 | 145.93–156.77 | 10.84 | hill | hill|p1m|push | dip 12f | ILUSTRASI SUASANA |
| 39 | 156.77–171.10 | 14.33 | card | card||locked | dissolve 9f |  |
| 40 | 171.10–190.30 | 19.20 | end | end||locked | dissolve 9f |  |

---

# SESUDAH (V3)

## Metrik audit — shots.json (V3)

| metrik | nilai |
|---|---|
| jumlah shot | 28 |
| durasi min / median / rata-rata / maks (dtk) | 4.50 / 6.41 / 6.80 / 11.80 |
| shot < 4,5 dtk | 0 |
| jenis scene berbeda | 15 |
| % durasi per jenis | road 22.22%, ridge 14.64%, hill 11.70%, lamp 7.25%, sky 7.09%, map 6.20%, bridge 5.15%, town 4.26%, puddle 3.99%, park 3.36%, topdown 3.34%, ots 3.15%, side 2.84%, point 2.44%, trail 2.36% |
| scene road | 22.22% |
| run terpanjang jenis sama | 2 shot (road, 15.90 dtk) |
| pola A-B-A (signature ketat / tingkat jenis) | 0 / 0 |
| signature kembar dalam 30 dtk | 0 |
| kemunculan fade label+referensi | 8 |
| total durasi kartu statis (dtk) | 0.00 |
| cut keras | 3 |
| judul besar | 7 |
| batas shot di tengah cue | 0 |

**Hasil aturan:** LULUS semua

| id | waktu | dtk | scene | signature | transisi | label |
|---|---|---|---|---|---|---|
| 1 | 0.00–4.98 | 4.98 | hill | hill|rain-black|push | start |  |
| 2 | 4.98–11.40 | 6.42 | hill | hill|dusk-night|panR | dissolve 20f |  |
| 3 | 11.40–23.20 | 11.80 | map | map|evolve|push | dissolve 20f |  |
| 4 | 23.20–33.00 | 9.80 | bridge | bridge|long-fog|push | dissolve 20f |  |
| 5 | 33.00–39.07 | 6.07 | hill | hill|rain-rise|pull | dip 18f |  |
| 6 | 39.07–47.26 | 8.19 | lamp | lamp|moths-dim|push | dissolve 20f |  |
| 7 | 47.26–54.24 | 6.98 | road | road|far-to-medium|push | dissolve 20f |  |
| 8 | 54.24–58.90 | 4.66 | ridge | ridge|dark-mountain|tiltUp | dissolve 20f |  |
| 9 | 58.90–63.40 | 4.50 | trail | trail|path-mist|push | dip 18f |  |
| 10 | 63.40–68.90 | 5.50 | road | road|pov-drizzle|track | dissolve 20f |  |
| 11 | 68.90–74.30 | 5.40 | side | side|walker|track | dissolve 20f |  |
| 12 | 74.30–80.70 | 6.40 | park | park|fence|panL | dissolve 20f |  |
| 13 | 80.70–88.50 | 7.80 | road | road|far-wave|push | dissolve 20f |  |
| 14 | 88.50–94.60 | 6.10 | road | road|medium-back|pull | dissolve 20f |  |
| 15 | 94.60–100.60 | 6.00 | ots | ots|question|push | dissolve 20f |  |
| 16 | 100.60–105.25 | 4.65 | point | point|arm-right|tiltUp | dissolve 20f |  |
| 17 | 105.25–114.20 | 8.95 | ridge | ridge|slope-calm|push | dissolve 20f |  |
| 18 | 114.20–121.80 | 7.60 | puddle | puddle|ripple-shoes|tiltDown | dissolve 20f |  |
| 19 | 121.80–131.00 | 9.20 | road | road|wide-hold|pull | dissolve 20f |  |
| 20 | 131.00–137.70 | 6.70 | road | road|reverse-town|push | cut |  |
| 21 | 137.70–143.30 | 5.60 | lamp | lamp|dazed|panR | dissolve 20f |  |
| 22 | 143.30–149.65 | 6.35 | topdown | topdown|road-above|push | dissolve 20f |  |
| 23 | 149.65–157.00 | 7.35 | ridge | ridge|night-fog|pull | dissolve 20f |  |
| 24 | 157.00–163.20 | 6.20 | sky | sky|clouds-moon|push | dissolve 20f |  |
| 25 | 163.20–171.30 | 8.10 | town | town|valley-lights|panR | dissolve 20f |  |
| 26 | 171.30–176.10 | 4.80 | hill | hill|end-night|pull | dissolve 20f |  |
| 27 | 176.10–183.40 | 7.30 | sky | sky|cta-stars|pull | dissolve 20f |  |
| 28 | 183.40–190.30 | 6.90 | ridge | ridge|end-ridge|push | dissolve 20f |  |

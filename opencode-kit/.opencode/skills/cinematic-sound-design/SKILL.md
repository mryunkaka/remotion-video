---
name: cinematic-sound-design
description: Desain suara sinematik — BGM berfase, SFX tersinkron kejadian narasi, ducking, mastering. Pakai saat membuat/mengubah audio video naratif.
---
# Sound design sinematik

## Tiga fase BGM (crossfade, tidak pernah potong kasar)
1. Mystery: drone rendah + ambience laut. 2. Conflict/Wonder: tension strings + perkusi + build-up epik ke klimaks.
3. Emotional: piano hangat + pad strings hingga outro.

## SFX sinkron (letakkan 50–150 ms SEBELUM kata pemicu)
| Kejadian | SFX |
|---|---|
| Hook/laut | ombak, angin laut |
| Sesuatu muncul tiba-tiba | riser 7 dtk berakhir tepat di kata + impact + bubbles |
| Pertarungan | water-impact, giant-splash, perkusi rendah |
| Reda/belas kasih | musik turun bertahap, bubbles lembut |
| Keajaiban/janji | magical-resonance, rumble dalam |
| Klimaks | rumble naik → impact → surge splash besar |
Jangan menumpuk semua suara; SFX hanya untuk hal yang diceritakan.

## Mix
- Voice -3 dB dari normalisasi, musik -13…-7 dB RMS relatif stem ter-normalisasi, naikkan +7 dB di jeda bicara (ducking dari speech-activity).
- SFX bus dikurangi ±3 dB saat narator bicara.
- Master: `loudnorm=I=-16:TP=-1.5:LRA=11, alimiter=limit=0.84`, fade in 0.4s / out 2.2s.
- Ukur: `ffmpeg -i mix.wav -af ebur128=peak=true -f null -`. Target -16…-14 LUFS, TP ≤ -1.
- Prosedural (numpy/scipy) = bebas lisensi. Bila memakai library, catat sumber+lisensi di `docs/asset-licenses.md`.

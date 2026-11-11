# Cek lingkungan

Sesi ini = **remote/sandbox Linux** (bukan PC Windows pengguna). Folder PC pengguna tidak dapat diakses; project dibuat di folder kerja sesi dan **perlu disalin** ke `D:\Project\remotion-video\projects\gunung-julahit`.

| Komponen | Status | Versi | Tindakan bila kurang |
|---|---|---|---|
| Node.js | ada | v22.23.4 (butuh 18+) | — |
| npm | ada | 10.9.9 | — |
| ffmpeg / ffprobe | ada | 6.1.1 | Windows: `winget install Gyan.FFmpeg` |
| Python (untuk `prepare-audio.py`) | ada | 3.13 + numpy + scipy | `pip install numpy scipy` |
| Chrome | ada di sandbox (`/usr/bin/google-chrome`); di PC pengguna belum dicek | — | Path Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe` (skrip render otomatis jatuh ke Edge bila tidak ada) |
| Remotion | terpasang di project | 4.0.250 (`remotion`, `@remotion/cli`, `media-utils`, `transitions`, `shapes`, `noise`) | `npm install` |
| ASR (faster-whisper) | tidak ada | — | Tidak dipasang; subtitle memakai alignment tingkat segmen (lihat qa-report) |
| Skill/plugin Claude Code | `/skills` & `/plugin` tidak tersedia di sesi ini | — | Opsional, jalankan sendiri bila mau: `npx skills add remotion-dev/skills` (periksa sumber/lisensi dulu). Tidak dipasang diam-diam. |

Tidak ada audio yang dikirim ke layanan eksternal.

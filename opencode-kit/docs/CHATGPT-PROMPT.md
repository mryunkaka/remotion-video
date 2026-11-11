# LEGACY — do not use for installing the current project

This prompt belongs to a historical snapshot of the setup and has old instructions to copy the `opencode-kit` into the repository root. Do not run those steps. The active project has already been configured; use `docs/INSTALLATION.md` and `docs/OPENCODE-VIDEO-WORKFLOW.md` instead.

---

# PROMPT UNTUK CHATGPT (arsip)

Kamu adalah engineer yang menyetel OpenCode di Windows saya. Kerjakan langsung (jangan hanya menjelaskan), jujur, dan verifikasi tiap langkah.

## Konteks
- Project: `D:\Project\remotion-video` (PowerShell). Saya menjalankan `opencode` dari folder ini.
- Model target: provider **9Router** (lokal, OpenAI-compatible) → model **`cx/gpt-6-luna`** dengan reasoning effort **medium**.
- Tujuan: OpenCode bekerja seperti Claude Code untuk membuat video dokumenter Remotion 9:16 berkualitas (animasi, background berlapis, BGM, SFX, subtitle, tidak kaku).
- Folder `D:\Project\remotion-video\opencode-kit\` berisi hasil rancangan: `opencode.json`, `AGENTS.md`, `.opencode\agents\*`, `.opencode\skills\*`, `.opencode\commands\make-video.md`, `template\` (project referensi), `docs\SETUP.md`.

## Tugas (urut)
1. **Prasyarat** — cek/instal: Node 20+ (`node -v`), Python 3.10+ dengan `numpy scipy pillow` (`py -m pip install numpy scipy pillow`), FFmpeg (`winget install Gyan.FFmpeg`), Git, OpenCode (`npm i -g opencode-ai` atau cara resmi terbaru), 9Router (`npm i -g 9router`). Tampilkan versi semuanya.
2. **9Router** — jalankan `9router`, dashboard `http://localhost:20128` (login awal `123456` bila belum diubah → minta saya mengganti). Pastikan provider Codex (prefix `cx/`) sudah terhubung/login di dashboard (bagian ini butuh saya; beri tahu langkah persisnya). Buat API key di dashboard dan simpan ke environment user: `setx NINEROUTER_API_KEY "<key>"` (JANGAN menulis key ke file yang masuk git; minta saya menempelkannya).
3. **Verifikasi model** — `curl http://localhost:20128/v1/models -H "Authorization: Bearer %NINEROUTER_API_KEY%"` dan cari ID persis model "gpt-6 luna". Bila ID bukan `cx/gpt-6-luna`, sesuaikan di `opencode.json` (key model, `model`, `small_model`, dan frontmatter agent di `.opencode\agents\*.md`). Tes satu chat completion singkat langsung ke 9Router.
4. **Pasang config** — salin dari `opencode-kit\` ke `D:\Project\remotion-video\`: `opencode.json`, `AGENTS.md`, folder `.opencode\`, dan `template\`. Jangan menimpa file saya yang sudah ada tanpa backup (`*.bak`).
5. **Validasi format config dengan versi OpenCode yang terpasang** — jalankan `opencode --version`, baca skema `https://opencode.ai/config.json` dan dokumentasi provider resmi. Format yang saya tulis: kunci `provider`, `npm: "@ai-sdk/openai-compatible"`, `options.baseURL`, `options.apiKey: "{env:NINEROUTER_API_KEY}"`. Bila versi terbaru memakai format lain (mis. `providers`/`package`/`settings`), ubah `opencode.json` ke format yang valid. Lalu `opencode models` harus menampilkan `9router/cx/gpt-6-luna`. Cek juga apakah `reasoningEffort: "medium"` benar-benar diteruskan (kalau tidak, cari opsi yang benar atau buat combo medium di 9Router).
6. **Skill Remotion resmi** — di folder project jalankan satu cara saja: `npx remotion skills add` (atau `npx skills add remotion-dev/skills`), lalu `npx skills list` dan pastikan OpenCode menemukannya (OpenCode membaca `.opencode\skills`, `.claude\skills`, `.agents\skills`; bila skill terpasang di tempat lain, salin ke `.opencode\skills`). Skill lokal di kit (`remotion-doc-pipeline`, `cinematic-sound-design`, `procedural-cinematic-visuals`) harus ikut terbaca.
7. **MCP** — `context7` sudah ada di config (dokumentasi library terbaru). Pastikan terhubung (`opencode mcp list`). Jangan menambah MCP lain tanpa alasan.
8. **Windows fix** — pastikan tidak ada path Chrome Linux di `remotion.config.ts` (template sudah dibersihkan). Jalankan di `template\`: `npm install`, `npx tsc --noEmit`, lalu `node scripts\stills.mjs out\stills 5,40,100 0.5` untuk membuktikan Remotion + Chrome jalan. Perbaiki bila gagal (mis. `npx remotion browser ensure`).
9. **Smoke test end-to-end kecil** — jalankan `opencode`, ketik `/make-video "C:\Users\JAR1-ICT-NB\Downloads\ugc-kanvas-voiceover-zephyr (4).wav" "<path brief>"` hanya setelah saya menyediakan brief; untuk sekarang cukup uji `opencode run "balas OK dan sebutkan model yang kamu pakai"` dan pastikan model = 9router/cx/gpt-6-luna.
10. **Laporan** — tabel: komponen | versi | status (OK/butuh aksi saya) | catatan. Daftar hal yang harus saya lakukan manual. Tidak ada klaim "berhasil" tanpa bukti output perintah.

## Aturan
- Jangan menyimpan/menampilkan API key. Jangan mengirim file audio saya ke layanan luar.
- Bila ada kebingungan antara dokumentasi dan perilaku nyata, percayakan perilaku nyata (hasil perintah) dan beri tahu saya.
- Jangan menghapus file saya; backup dulu.

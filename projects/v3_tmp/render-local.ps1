# Render lokal GUNUNG JULAHIT — jalankan di PowerShell: .\render-local.ps1
$ErrorActionPreference = "Stop"
$proj = "D:\Project\remotion-video\projects\gunung-julahit"
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" }

Set-Location $proj
npm install
npx remotion render src/index.ts GunungJulahit out/GUNUNG_JULAHIT_PEREMPUAN_MISTERIUS_FINAL.mp4 --browser-executable $chrome --codec h264 --concurrency 1
npx remotion still src/index.ts Thumbnail out/GUNUNG_JULAHIT_PEREMPUAN_MISTERIUS_THUMBNAIL.jpg --browser-executable $chrome
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,duration -of default=nw=1 out\GUNUNG_JULAHIT_PEREMPUAN_MISTERIUS_FINAL.mp4
explorer .\out

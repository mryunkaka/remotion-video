@echo off
setlocal
cd /d "%~dp0"
echo === 1/3 npm install ===
call npm install
if errorlevel 1 goto :err
if not exist out mkdir out
echo === 2/3 Render (composition: Sebelimbingan, 1080x1920, 30 fps, h264+aac) ===
call npx remotion render src/index.ts Sebelimbingan out/SEBELIMBINGAN_KOTA_YANG_HILANG_FINAL.mp4 --codec=h264 --audio-codec=aac --crf=20 --concurrency=50%%
if errorlevel 1 goto :err
echo === 3/3 Verifikasi ffprobe ===
ffprobe -v error -show_entries stream=codec_name,codec_type,width,height,r_frame_rate,duration -of default=nw=1 out\SEBELIMBINGAN_KOTA_YANG_HILANG_FINAL.mp4
echo Selesai: out\SEBELIMBINGAN_KOTA_YANG_HILANG_FINAL.mp4
pause
exit /b 0
:err
echo GAGAL. Lihat pesan error di atas.
pause
exit /b 1

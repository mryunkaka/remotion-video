#!/bin/bash
cd /home/claude/sebelimbingan
exec npx remotion render src/index.ts Sebelimbingan out/SEBELIMBINGAN_KOTA_YANG_HILANG_FINAL.mp4 --browser-executable=/tmp/chromium --gl=swangle --concurrency=1 --timeout=180000 --codec=h264 --audio-codec=aac --crf=20

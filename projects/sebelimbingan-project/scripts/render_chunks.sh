#!/bin/bash
cd /home/claude/sebelimbingan
[ -x /tmp/chromium ] || node scripts/get-chromium.mjs >/dev/null
TOTAL=4401; STEP=300
for ((a=0; a<TOTAL; a+=STEP)); do
  b=$((a+STEP-1)); [ $b -ge $TOTAL ] && b=$((TOTAL-1))
  f=$(printf "out/chunks/c%05d.mp4" $a)
  [ -s "$f" ] && continue
  npx remotion render src/index.ts Sebelimbingan "$f" --frames=$a-$b --muted --browser-executable=/tmp/chromium --gl=swangle --concurrency=1 --timeout=180000 --codec=h264 --crf=20 >> /tmp/render_chunks.log 2>&1
done
echo ALLDONE >> /tmp/render_chunks.log

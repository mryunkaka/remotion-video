$ErrorActionPreference = "Stop"
$Project = (Resolve-Path (Join-Path $PSScriptRoot "../..")).Path
$Narration = Join-Path $Project "assets/audio/narration/ugc-kanvas-voiceover-zephyr (5).wav"
$Music = Join-Path $Project "assets/audio/music/pulau-laut-original-bgm.wav"
$Effects = Join-Path $Project "assets/audio/sfx/pulau-laut-forest-texture.wav"
$AssetMix = Join-Path $Project "assets/audio/mix/final-mix.wav"
$PublicMix = Join-Path $Project "public/audio/final-mix.wav"
New-Item -ItemType Directory -Force (Split-Path $AssetMix) | Out-Null
New-Item -ItemType Directory -Force (Split-Path $PublicMix) | Out-Null
$Filter = "[0:a]aresample=48000,alimiter=limit=0.78:level=disabled,pan=stereo|c0=c0|c1=c0,aformat=channel_layouts=stereo[voice];[1:a]aresample=48000,aformat=channel_layouts=stereo[bgm];[2:a]aresample=48000,aformat=channel_layouts=stereo[sfx];[bgm][voice]sidechaincompress=threshold=0.035:ratio=3:attack=400:release=1400[duck];[voice][duck][sfx]amix=inputs=3:duration=first:weights=1 1 1:normalize=0,alimiter=limit=0.82:level=disabled,loudnorm=I=-16:TP=-1.5:LRA=11[out]"
& ffmpeg -y -hide_banner -i $Narration -i $Music -i $Effects -filter_complex $Filter -map "[out]" -ar 48000 -ac 2 -c:a pcm_s16le $AssetMix
if ($LASTEXITCODE -ne 0) { throw "FFmpeg audio mix failed with exit code $LASTEXITCODE" }
Copy-Item -LiteralPath $AssetMix -Destination $PublicMix -Force
& ffprobe -v error -show_entries stream=codec_name,sample_rate,channels:format=duration -of default=nw=1 $PublicMix
if ($LASTEXITCODE -ne 0) { throw "Audio metadata verification failed" }


$ErrorActionPreference = 'Stop'

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$frameDir = Join-Path $projectRoot 'previews\frames'
$audioDir = Join-Path $PSScriptRoot '..\public\audio'
$output = Join-Path $projectRoot 'out\BETWEEN-SLEEP-AND-SKY.mp4'

if ((Get-ChildItem -LiteralPath $frameDir -Filter 'element-*.jpeg' -File).Count -ne 1800) {
  throw 'Expected 1,800 rendered frames in previews\frames.'
}
foreach ($file in @('bgm.wav', 'sfx.wav')) {
  if (-not (Test-Path -LiteralPath (Join-Path $audioDir $file))) {
    throw "Missing audio stem: $file"
  }
}

$filter = '[1:a]volume=0.8[bgm];[2:a]volume=0.8[sfx];[bgm][sfx]amix=inputs=2:duration=shortest:normalize=0,alimiter=limit=0.95[aout]'
$ffmpegArgs = @(
  '-hide_banner', '-y', '-framerate', '30', '-start_number', '0',
  '-i', (Join-Path $frameDir 'element-%04d.jpeg'),
  '-i', (Join-Path $audioDir 'bgm.wav'),
  '-i', (Join-Path $audioDir 'sfx.wav'),
  '-filter_complex', $filter,
  '-map', '0:v:0', '-map', '[aout]', '-frames:v', '1800', '-r', '30',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-shortest', $output
)

& ffmpeg @ffmpegArgs
if ($LASTEXITCODE -ne 0) { throw "FFmpeg failed with exit code $LASTEXITCODE" }
Write-Output "Created $output"

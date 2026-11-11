$ErrorActionPreference = "Stop"
$Project = (Resolve-Path (Join-Path $PSScriptRoot "../..")).Path
$Node24 = "C:\Server\node-v24.22.1-win-x64"
$ChromeCandidates = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
)
$Chrome = $ChromeCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $Chrome) { throw "Chrome or Edge not found for Remotion rendering." }
if (Test-Path (Join-Path $Node24 "node.exe")) { $env:PATH = $Node24 + ";" + $env:PATH }
$Remotion = Join-Path $Project "../../node_modules/.bin/remotion.cmd"
$Remotion = [System.IO.Path]::GetFullPath($Remotion)
$FfmpegSource = (Get-Command ffmpeg -ErrorAction Stop).Source
$FfmpegResolved = (Resolve-Path $FfmpegSource).Path
$BinaryDirectory = Split-Path $FfmpegResolved -Parent
$SilentVideo = Join-Path $Project "out/video-no-audio.mp4"
$FinalVideo = Join-Path $Project "out/HUTAN_PULAU_LAUT_FINAL.mp4"
$Mix = Join-Path $Project "assets/audio/mix/final-mix.wav"
Push-Location $Project
try {
  & $Remotion render src/index.ts PulauLautForest $SilentVideo --codec=h264 --crf=17 --pixel-format=yuv420p --concurrency=2 --browser-executable=$Chrome --binaries-directory=$BinaryDirectory
  if ($LASTEXITCODE -ne 0) { throw "Remotion render failed with exit code $LASTEXITCODE" }
  & ffmpeg -y -hide_banner -i $SilentVideo -i $Mix -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 256k -ar 48000 -ac 2 -movflags +faststart -metadata title="Jika Hutan Alami Pulau Laut Tidak Pernah Ditebang" -metadata comment="Ilustrasi skenario alternatif" $FinalVideo
  if ($LASTEXITCODE -ne 0) { throw "Final audio/video mux failed with exit code $LASTEXITCODE" }
  Remove-Item -LiteralPath $SilentVideo -Force -ErrorAction SilentlyContinue
}
finally {
  Pop-Location
}
Write-Output "Created $FinalVideo"


$ErrorActionPreference = 'Stop'
$Project = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$Repo = (Resolve-Path (Join-Path $Project '../..')).Path
$Node24 = 'C:\Server\node-v24.22.1-win-x64'
$FfmpegDir = 'C:\Users\JAR1-ICT-NB\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin'
$Chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
if (-not (Test-Path (Join-Path $FfmpegDir 'ffmpeg.exe'))) { throw 'Compatible FFmpeg 9 was not found.' }
if (-not (Test-Path $Chrome)) { throw 'Chrome executable was not found.' }
if (Test-Path (Join-Path $Node24 'node.exe')) { $env:PATH = $Node24 + ';' + $env:PATH }
$Remotion = Join-Path $Repo 'node_modules\.bin\remotion.cmd'
$ScoreSrc = Join-Path $Project 'public\audio\score.wav'
$FxSrc = Join-Path $Project 'public\audio\effects.wav'
$WindSrc = Join-Path $Project 'assets\audio\ambience\saranjana-night-wind.wav'
$SilentVideo = Join-Path $Project 'out\video-no-audio.mp4'
$Final = Join-Path $Project 'out\SARANJANA_PULAU_LAUT_FINAL.mp4'
try {
  Push-Location $Repo
  & $Remotion render 'projects/pulau-laut-saranjana-horror-20261108/src/index.ts' PulauLautHalimun $SilentVideo --codec=h264 --crf=18 --pixel-format=yuv420p --concurrency=2 --browser-executable=$Chrome --binaries-directory=$FfmpegDir
  if ($LASTEXITCODE -ne 0) { throw "Remotion render failed with exit code $LASTEXITCODE" }
  & (Join-Path $FfmpegDir 'ffmpeg.exe') -hide_banner -y -i $SilentVideo -i $ScoreSrc -i $FxSrc -i $WindSrc -filter_complex '[1:a]volume=0.82[bg];[2:a]atrim=duration=120,asetpts=PTS-STARTPTS,volume=0.88[fx];[3:a]atrim=duration=120,asetpts=PTS-STARTPTS,volume=0.52[air];[fx][air]amix=inputs=2:duration=longest:normalize=0[fxmix];[bg][fxmix]amix=inputs=2:duration=longest:normalize=0,loudnorm=I=-17:TP=-1.5:LRA=11,atrim=duration=120,afade=t=out:st=118:d=2[a]' -map 0:v:0 -map '[a]' -c:v copy -c:a aac -b:a 256k -ar 48000 -ac 2 -movflags +faststart -metadata title='Saranjana — Jejak Kerajaan Pulau Halimun' -metadata comment='Retelling legenda lokal; ilustrasi, bukan kesaksian gaib' $Final
  if ($LASTEXITCODE -ne 0) { throw "Audio mix and mux failed with exit code $LASTEXITCODE" }
}
finally {
  if ((Get-Location).Path -eq $Repo) { Pop-Location }
  Remove-Item -LiteralPath $SilentVideo -Force -ErrorAction SilentlyContinue
}
& (Join-Path $FfmpegDir 'ffmpeg.exe') -hide_banner -y -ss 00:00:02 -i $Final -frames:v 1 -q:v 2 (Join-Path $Project 'out\SARANJANA_PULAU_LAUT_THUMBNAIL.jpg')
if ($LASTEXITCODE -ne 0) { throw 'Thumbnail export failed.' }
Write-Output "Created $Final"

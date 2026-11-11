from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public' / 'audio'
MUSIC = ROOT / 'assets' / 'audio' / 'music'
SFX = ROOT / 'assets' / 'audio' / 'sfx'
AMBIENCE = ROOT / 'assets' / 'audio' / 'ambience'
FFMPEG = shutil.which('ffmpeg')
if not FFMPEG:
    raise SystemExit('ffmpeg was not found on PATH')

PUBLIC.mkdir(parents=True, exist_ok=True)
MUSIC.mkdir(parents=True, exist_ok=True)
SFX.mkdir(parents=True, exist_ok=True)
AMBIENCE.mkdir(parents=True, exist_ok=True)
DURATION = 120
RATE = 48000

def run(command: list[str]) -> None:
    try:
        subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as exc:
        print(exc.stderr.decode(errors='replace')[-2500:])
        raise

# Original, restrained ambient score: low moving harmony, slow tremolo, and a sparse
# bell-like note. This is a procedural composition, not a library music recording.
left = (
    '0.105*sin(2*PI*43*t+0.22*sin(2*PI*0.035*t))'
    '+0.074*sin(2*PI*64.5*t+0.19*sin(2*PI*0.035*t))'
    '+0.035*sin(2*PI*129*t+0.14*sin(2*PI*0.035*t))'
    '+0.018*sin(2*PI*174.6*t)*sin(2*PI*0.085*t)'
    '+0.012*sin(2*PI*261.6*t)*sin(2*PI*0.061*t)'
    '+0.025*sin(2*PI*55*t)*pow((sin(2*PI*0.125*t)+abs(sin(2*PI*0.125*t)))/2,12)'
)
right = left.replace('43*t', '43.08*t').replace('64.5*t', '64.42*t').replace('0.22*sin', '0.22*sin')
score_src = f'aevalsrc=exprs={left}|{right}:s={RATE}:d={DURATION}'.replace(',', r'\,')
climax = '((sin(2*PI*(t-64)/64)+abs(sin(2*PI*(t-64)/64)))/2)'
run([
    FFMPEG, '-hide_banner', '-y', '-f', 'lavfi', '-i', score_src,
    '-af', f"lowpass=f=2800,volume='0.55+0.25*(1+sin(2*PI*t/34))/2+0.30*{climax}*{climax}*{climax}*{climax}':eval=frame,afade=t=in:st=0:d=4,afade=t=out:st=116:d=4,alimiter=limit=0.82",
    '-ar', str(RATE), '-ac', '2', '-c:a', 'pcm_s24le', str(MUSIC / 'saranjana-original-score.wav')
])

# Original synthetic transition hits keyed to the storyboard's act changes. Their
# attack and pitch are short and low, so they add punctuation without masking text.
cues = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112]
hits = []
for i, cue in enumerate(cues):
    amp = 0.24 if cue in (0, 64, 72, 112) else 0.14
    freq = 67 + (i % 4) * 9
    dt = f'(t-{cue})'
    hits.append(f'{amp}*exp(-pow({dt},2)*11)*sin(2*PI*({freq}-19*((abs({dt})+{dt})/2))*{dt})')
fx_l = '+'.join(hits) + '+0.012*sin(2*PI*390*t)*pow((sin(2*PI*0.5*t)+abs(sin(2*PI*0.5*t)))/2,20)'
fx_r = fx_l.replace('390*t', '394*t')
fx_src = f'aevalsrc=exprs={fx_l}|{fx_r}:s={RATE}:d={DURATION}'.replace(',', r'\,')
run([
    FFMPEG, '-hide_banner', '-y', '-f', 'lavfi', '-i', fx_src,
    '-af', 'aecho=0.8:0.42:70|125:0.22|0.12,atrim=duration=120,asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.05,afade=t=out:st=118:d=2,alimiter=limit=0.65',
    '-ar', str(RATE), '-ac', '2', '-c:a', 'pcm_s24le', str(SFX / 'saranjana-transition-effects.wav')
])

# A separately editable, filtered noise bed supplies a soft island-night wind texture.
air_pulse = '(sin(2*PI*t/8)+abs(sin(2*PI*t/8)))/2'
run([
    FFMPEG, '-hide_banner', '-y', '-f', 'lavfi', '-i',
    f'anoisesrc=color=pink:amplitude=0.18:sample_rate={RATE}:duration={DURATION}',
    '-af', f"highpass=f=130,lowpass=f=1500,volume='0.64+2.24*{air_pulse}*{air_pulse}*{air_pulse}*{air_pulse}*{air_pulse}*{air_pulse}*{air_pulse}*{air_pulse}*{air_pulse}*{air_pulse}':eval=frame,aecho=0.75:0.35:90|170:0.16|0.10,atrim=duration=120,afade=t=out:st=118:d=2,alimiter=limit=0.48",
    '-ar', str(RATE), '-ac', '2', '-c:a', 'pcm_s24le', str(AMBIENCE / 'saranjana-night-wind.wav')
])

shutil.copy2(MUSIC / 'saranjana-original-score.wav', PUBLIC / 'score.wav')
shutil.copy2(AMBIENCE / 'saranjana-night-wind.wav', PUBLIC / 'wind.wav')
shutil.copy2(SFX / 'saranjana-transition-effects.wav', PUBLIC / 'effects.wav')
print('Created 120-second original score, night-wind ambience, and synchronized transition effects (48 kHz stereo PCM).')

"""Generate original, editable horror ambience and event SFX locally."""
from pathlib import Path
import math, sys, wave
import numpy as np
out = Path(sys.argv[1]).resolve()
seconds = float(sys.argv[2])
rate = 48000
n = int(math.ceil(seconds * rate))
t = np.arange(n, dtype=np.float32) / rate
rng = np.random.default_rng(24061108)
def write(path, mono):
    mono = np.clip(mono, -0.98, 0.98)
    stereo = np.column_stack((mono, mono)).astype(np.float32)
    pcm = (stereo * 32767).astype('<i2')
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(rate); w.writeframes(pcm.tobytes())
bgm = np.zeros(n, dtype=np.float32)
for hz, amp, phase in [(43.65,.045,0),(65.41,.024,.8),(87.31,.017,1.7),(130.81,.010,2.5)]:
    mod = .74 + .26 * np.sin(2*np.pi*(.018 + hz/12000)*t + phase)
    bgm += amp * mod * np.sin(2*np.pi*hz*t + .12*np.sin(2*np.pi*.035*t+phase))
for start, end, notes in [(0,39,[174.61,220.0,261.63]),(39,73,[164.81,207.65,246.94]),(73,117,[155.56,196.0,233.08]),(117,133,[146.83,185.0,220.0]),(133,seconds,[164.81,207.65,246.94])]:
    mask = (t >= start) & (t < end)
    local = t[mask] - start
    env = np.minimum(1, local/5) * np.minimum(1, (end-start-local)/7)
    for i, hz in enumerate(notes):
        bgm[mask] += (.009/(i+1)) * env * np.sin(2*np.pi*hz*local + i*.6)
noise = rng.normal(0, 1, n).astype(np.float32)
for i in range(1,n):
    noise[i] = .992*noise[i-1] + .008*noise[i]
bgm += noise * (.010 + .004*np.sin(2*np.pi*.027*t))
write(out/'bgm-original.wav', bgm)
sfx = np.zeros(n, dtype=np.float32)
def add_tone(at, dur, hz, gain=.16, decay=2.0, harmonics=(1,2.01,3.98)):
    a = int(at*rate); b = min(n, a+int(dur*rate)); x = np.arange(b-a,dtype=np.float32)/rate
    env = np.exp(-decay*x) * np.minimum(1, x*35)
    sig = np.zeros(b-a,dtype=np.float32)
    for i,h in enumerate(harmonics): sig += np.sin(2*np.pi*hz*h*x + i*.13)/(i+1)**1.5
    sfx[a:b] += gain * env * sig
def add_static(at, dur, gain=.10):
    a=int(at*rate); b=min(n,a+int(dur*rate)); x=np.arange(b-a,dtype=np.float32)/rate
    raw=rng.normal(0,1,b-a).astype(np.float32)
    pulse=(np.sin(2*np.pi*17*x)**8)*.55 + .15
    sfx[a:b] += gain*raw*pulse*np.minimum(1,x*80)*np.exp(-.7*x)
def add_swell(at, dur, gain=.10):
    a=int(at*rate); b=min(n,a+int(dur*rate)); x=np.arange(b-a,dtype=np.float32)/rate
    sfx[a:b] += gain*np.sin(2*np.pi*(38+3*np.sin(2*np.pi*.2*x))*x)*np.sin(np.pi*x/dur)**2
add_swell(0,8,.055); add_swell(33,7,.045); add_swell(121,9,.065); add_swell(134,8,.035)
for at in [41.4,43.3,45.5]: add_tone(at,4.8,392,.12,1.05,(1,2.76,4.18))
for at in [56.8,58.6,60.5]: add_tone(at,3.5,523.25,.08,1.5,(1,2.01,3.0))
add_static(82.7,2.6,.17); add_static(86.2,3.0,.13); add_static(90.2,1.8,.09)
add_tone(91.0,2.4,196,.055,2.5,(1,1.5,2.02))
add_static(103.5,1.8,.12); add_tone(110,3.0,110,.055,1.8,(1,2.02,3.02))
add_static(117.5,1.0,.2); add_tone(124.0,2.8,146.83,.05,2.0,(1,2.0,3.0))
for at in [128.1,130.0,131.2]: add_tone(at,4.0,466.16,.085,1.15,(1,2.0,3.02))
add_static(154.4,2.8,.15); add_tone(159.2,3.2,130.81,.06,2.0,(1,1.5,2.5))
add_tone(162.5,4.0,55,.16,1.2,(1,2,3.01)); add_static(163.0,2.4,.08)
write(out/'sfx-original.wav', sfx)
print(f'Created BGM/SFX stems: {seconds:.3f}s at {rate} Hz')

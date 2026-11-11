from pathlib import Path
import math
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets" / "audio"
MUSIC = OUT / "music" / "pulau-laut-original-bgm.wav"
SFX = OUT / "sfx" / "pulau-laut-forest-texture.wav"
RATE = 24000
DURATION = 141.490958
N = int(RATE * DURATION)
t = np.arange(N, dtype=np.float64) / RATE

# Evolving, slow ambient bed. Chords move with the narrative rather than looping a beat.
chords = [
    (0, 15, [146.83, 220.00, 293.66, 369.99]),     # D/A, open dawn
    (15, 35, [196.00, 246.94, 293.66, 392.00]),    # G colors
    (35, 57, [146.83, 220.00, 246.94, 369.99]),    # D suspended
    (57, 78, [164.81, 220.00, 246.94, 329.63]),    # Em
    (78, 100, [146.83, 196.00, 246.94, 293.66]),   # gentle D/G
    (100, 121, [123.47, 185.00, 220.00, 293.66]),  # B minor reflection
    (121, 133, [146.83, 220.00, 293.66, 369.99]),  # return to open D
    (133, 142, [146.83, 220.00, 293.66, 369.99]),
]
music = np.zeros(N, dtype=np.float64)
for idx, (start, end, notes) in enumerate(chords):
    mask = (t >= start) & (t < end)
    local = t[mask] - start
    dur = end - start
    attack = np.clip(local / 3.8, 0, 1)
    release = np.clip((dur - local) / 3.0, 0, 1)
    env = np.minimum(attack, release)
    section = np.zeros(mask.sum(), dtype=np.float64)
    for j, f in enumerate(notes):
        phase = idx * .41 + j * .7
        slow = .84 + .16 * np.sin(2 * np.pi * (0.035 + j*.003) * local + phase)
        fundamental = np.sin(2*np.pi*f*local + phase)
        overtone = .28 * np.sin(2*np.pi*(f*2.003)*local + phase*1.3)
        section += (fundamental + overtone) * slow / (j + 1.4)
    music[mask] += section * env * 0.012

# A quiet, slowly shifting broadband air bed, softened with a moving average.
rng = np.random.default_rng(281108)
noise = rng.normal(0, 1, N)
window = 180
soft = np.convolve(noise, np.ones(window)/window, mode="same")
soft /= max(np.max(np.abs(soft)), 1e-9)
music += soft * (0.0016 + 0.0008*np.sin(2*np.pi*0.018*t))
fade = np.minimum(np.clip(t/4, 0, 1), np.clip((DURATION-t)/5, 0, 1))
music *= fade

# Gentle stereo width by tiny decorrelated phase variation; keep mono-compatible center.
left = music + .0008*np.sin(2*np.pi*.07*t)
right = music + .0008*np.sin(2*np.pi*.073*t + .7)

# SFX stem: soft filtered wind/leaf and flowing-water-like texture, no loud impacts.
raw = rng.normal(0, 1, N)
smooth1 = np.convolve(raw, np.ones(420)/420, mode="same")
smooth1 /= max(np.max(np.abs(smooth1)), 1e-9)
raw2 = rng.normal(0, 1, N)
smooth2 = np.convolve(raw2, np.ones(90)/90, mode="same")
smooth2 /= max(np.max(np.abs(smooth2)), 1e-9)
# The stream appears during the roots/water and stewardship beats; air texture remains subtle.
water_env = np.zeros(N)
for a,b in [(40,68),(119,138)]:
    m=(t>=a)&(t<b)
    water_env[m]=np.minimum(np.clip((t[m]-a)/2,0,1), np.clip((b-t[m])/3,0,1))
air_env=.18 + .22*np.sin(2*np.pi*.009*t + .3)**2
sfx = smooth1*0.002*air_env + smooth2*0.004*water_env
sfx *= fade
sfxL=sfx
sfxR=np.roll(sfx, 11)*.94
sfxR[:11]=sfx[:11]*.94

def write_stereo(path, l, r):
    data=np.stack([l,r],axis=1)
    data=np.clip(data,-.94,.94)
    pcm=(data*32767).astype("<i2")
    with wave.open(str(path),"wb") as wf:
        wf.setnchannels(2); wf.setsampwidth(2); wf.setframerate(RATE); wf.writeframes(pcm.tobytes())
    peak=float(np.max(np.abs(data)))
    rms=float(np.sqrt(np.mean(data**2)))
    print(f"{path.name}: {len(data)/RATE:.3f}s peak={peak:.6f} rms={rms:.6f}")
write_stereo(MUSIC,left*6,right*6)
write_stereo(SFX,sfxL*6,sfxR*6)


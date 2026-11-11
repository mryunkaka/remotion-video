"""Generate original, self-contained ambient score and transition effects with NumPy only."""
from pathlib import Path
import wave
import numpy as np

SR = 48_000
SECONDS = 60
SAMPLES = SR * SECONDS
OUT = Path(__file__).resolve().parents[1] / "public" / "audio"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(20261108)


def midi(note: int) -> float:
    return 440.0 * 2.0 ** ((note - 69) / 12.0)


def add_stereo(track: np.ndarray, sound: np.ndarray, start: float, pan: float = 0.0, gain: float = 1.0) -> None:
    offset = int(start * SR)
    if offset >= len(track) or offset < 0:
        return
    count = min(len(sound), len(track) - offset)
    left = np.sqrt((1.0 - pan) * 0.5)
    right = np.sqrt((1.0 + pan) * 0.5)
    track[offset:offset + count, 0] += sound[:count] * gain * left
    track[offset:offset + count, 1] += sound[:count] * gain * right


def piano(note: int, seconds: float, velocity: float = 1.0) -> np.ndarray:
    count = int(seconds * SR)
    t = np.arange(count, dtype=np.float32) / SR
    f = midi(note)
    signal = np.zeros(count, dtype=np.float32)
    partials = ((1, 1.0, 2.1), (2, 0.39, 1.15), (3, 0.19, 0.76), (4, 0.095, 0.48), (5, 0.05, 0.31), (6, 0.026, 0.22))
    for harmonic, level, decay in partials:
        detune = 1.0 + (harmonic * harmonic) * 0.000013
        signal += level * np.sin(2 * np.pi * f * harmonic * detune * t + harmonic * 0.21) * np.exp(-t / decay)
    attack = np.minimum(1.0, t / 0.009)
    release = np.minimum(1.0, np.maximum(0.0, (seconds - t) / 0.24))
    return (signal * attack * release * velocity * 0.15).astype(np.float32)


def bell(note: int, seconds: float = 2.6) -> np.ndarray:
    count = int(seconds * SR)
    t = np.arange(count, dtype=np.float32) / SR
    f = midi(note)
    signal = (
        np.sin(2 * np.pi * f * t) * np.exp(-t / 1.25)
        + 0.38 * np.sin(2 * np.pi * f * 2.01 * t + 0.3) * np.exp(-t / 0.58)
        + 0.16 * np.sin(2 * np.pi * f * 3.96 * t + 0.8) * np.exp(-t / 0.32)
    )
    attack = np.minimum(1.0, t / 0.004)
    return (signal * attack * 0.10).astype(np.float32)


def pad(note: int, seconds: float = 4.75) -> np.ndarray:
    count = int(seconds * SR)
    t = np.arange(count, dtype=np.float32) / SR
    f = midi(note)
    slow = 1.0 + 0.003 * np.sin(2 * np.pi * 0.11 * t + note)
    signal = (
        np.sin(2 * np.pi * f * t * slow)
        + 0.32 * np.sin(2 * np.pi * f * 2.003 * t + 0.6)
        + 0.11 * np.sin(2 * np.pi * f * 3.01 * t + 1.2)
    )
    attack = np.minimum(1.0, t / 1.35)
    release = np.minimum(1.0, np.maximum(0.0, (seconds - t) / 1.45))
    return (signal * attack * release * 0.036).astype(np.float32)


def add_echo(track: np.ndarray, seconds: float, gain: float, cross: bool = False) -> None:
    delay = int(seconds * SR)
    if delay <= 0:
        return
    if cross:
        track[delay:, 0] += track[:-delay, 1] * gain
        track[delay:, 1] += track[:-delay, 0] * gain
    else:
        track[delay:] += track[:-delay] * gain


# Dm9, Bbmaj7, Fmaj7, Cadd9: a slow, suspended progression with a soft resolving tail.
progression = [
    (50, [62, 65, 69, 72]),
    (46, [62, 65, 69, 74]),
    (53, [60, 64, 69, 72]),
    (48, [60, 62, 67, 72]),
]
music = np.zeros((SAMPLES, 2), dtype=np.float32)
for bar in range(15):
    start = bar * 4.0
    root, tones = progression[bar % len(progression)]
    intensity = float(np.interp(start, [0, 7, 17, 28, 36, 44, 53, 59], [0.26, 0.42, 0.62, 0.82, 0.94, 0.67, 0.58, 0.34]))
    for voice, note in enumerate((root, root + 12, tones[1])):
        add_stereo(music, pad(note, 4.6), start, pan=(-0.36, 0.24, 0.48)[voice], gain=intensity)
    order = [0, 2, 1, 3] if bar % 2 == 0 else [2, 1, 3, 0]
    beat_offsets = (0.38, 1.28, 2.34, 3.22)
    for j, (degree, beat) in enumerate(zip(order, beat_offsets)):
        if (bar + j) % 7 == 5:
            continue
        note = tones[degree] + (12 if bar % 4 in (1, 2) and j == 3 else 0)
        velocity = (0.74 + 0.13 * ((bar + j) % 3)) * intensity
        add_stereo(music, piano(note, 2.2, velocity), start + beat, pan=(-0.42, -0.12, 0.24, 0.48)[j], gain=1.0)
    if bar >= 2 and bar % 2 == 0:
        lead = tones[(bar // 2 + 1) % 4] + 12
        add_stereo(music, bell(lead, 3.5), start + 2.72, pan=0.1 if bar % 4 else -0.12, gain=0.42 * intensity)

# A slow breath-like pulse and long reflections widen the score without adding a beat.
t = np.arange(SAMPLES, dtype=np.float32) / SR
breath = (0.5 + 0.5 * np.sin(2 * np.pi * 0.075 * t - 0.9)) ** 2
drone = (np.sin(2 * np.pi * midi(38) * t) + 0.34 * np.sin(2 * np.pi * midi(50) * t + 0.5)) * breath * 0.015
music[:, 0] += drone
music[:, 1] += drone * 0.92
for delay, gain, cross in ((0.17, 0.20, True), (0.34, 0.12, False), (0.58, 0.075, True)):
    add_echo(music, delay, gain, cross)
fade_out = np.ones(SAMPLES, dtype=np.float32)
fade_out[-int(3.0 * SR):] = np.linspace(1.0, 0.0, int(3.0 * SR), dtype=np.float32)
fade_in = np.minimum(1.0, t / 2.4)
music *= (fade_in * fade_out)[:, None]


def whoosh(seconds: float = 1.2) -> np.ndarray:
    count = int(seconds * SR)
    white = rng.normal(0, 1, count).astype(np.float32)
    low = np.convolve(white, np.ones(90, dtype=np.float32) / 90, mode="same")
    airy = white - low
    x = np.arange(count, dtype=np.float32) / SR
    envelope = np.sin(np.pi * x / seconds) ** 1.75
    shimmer = np.sin(2 * np.pi * (240 + 460 * x / seconds) * x) * 0.16
    return ((airy * 0.24 + shimmer) * envelope).astype(np.float32)


effects = np.zeros((SAMPLES, 2), dtype=np.float32)
for start, pan in ((9.6, -0.34), (21.6, 0.3), (33.6, -0.18), (45.6, 0.28)):
    add_stereo(effects, whoosh(1.15), start, pan=pan, gain=0.12)
for start, note, pan in ((3.4, 74, -0.28), (15.2, 77, 0.24), (27.2, 81, -0.12), (39.1, 72, 0.2), (50.1, 76, -0.18), (56.4, 69, 0.1)):
    add_stereo(effects, bell(note, 3.0), start, pan=pan, gain=0.62)
for start in (23.5, 35.2):
    count = int(1.8 * SR)
    x = np.arange(count, dtype=np.float32) / SR
    f = 58 + 35 * np.exp(-x * 4.0)
    pulse = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-x * 2.5)
    add_stereo(effects, pulse.astype(np.float32), start, pan=0.0, gain=0.12)
for delay, gain, cross in ((0.13, 0.24, True), (0.29, 0.14, False), (0.51, 0.08, True)):
    add_echo(effects, delay, gain, cross)
effects *= np.minimum(1.0, np.maximum(0.0, (60.0 - t) / 1.6))[:, None]


def write_wav(path: Path, data: np.ndarray, peak: float) -> None:
    maximum = float(np.max(np.abs(data)))
    if maximum > 0:
        data = data * (peak / maximum)
    pcm = np.clip(data * 32767.0, -32768, 32767).astype("<i2", copy=False)
    with wave.open(str(path), "wb") as handle:
        handle.setnchannels(2)
        handle.setsampwidth(2)
        handle.setframerate(SR)
        handle.writeframes(pcm.tobytes())


write_wav(OUT / "bgm.wav", music, 0.52)
write_wav(OUT / "sfx.wav", effects, 0.27)
print(f"Wrote original 48 kHz, 60 s stems: {OUT / 'bgm.wav'} and {OUT / 'sfx.wav'}")

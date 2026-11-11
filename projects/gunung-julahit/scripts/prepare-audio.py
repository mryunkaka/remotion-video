#!/usr/bin/env python3
"""
prepare-audio.py — GUNUNG JULAHIT
Jalankan SEKALI:  python scripts/prepare-audio.py   (butuh: python 3, numpy, scipy, ffmpeg/ffprobe)

Menghasilkan:
  public/audio/narration/voiceover-combined.wav   (VO1 + jeda 0,3 dtk + VO2, 48 kHz mono)
  public/audio/mix-master.wav                     (48 kHz stereo, ~-16 LUFS, TP <= -1 dBTP)
  src/data/timeline.json                          (dibaca Remotion: beat, cue subtitle, jumpscare)
  docs/audio-order.json, docs/audio-timeline.json, docs/jumpscare-cues.json,
  docs/transcript-combined.txt, docs/audio-report.json, docs/asset-licenses.md
  out/GUNUNG_JULAHIT_PEREMPUAN_MISTERIUS.srt

Suara narasi TIDAK di-regenerate, TIDAK dipercepat, TIDAK diubah karakternya.
Satu-satunya penyuntingan: (a) membuang dead-air di akhir tiap file dan (b) memendekkan jeda
senyap internal yang lebih panjang dari MAX_GAP detik menjadi MAX_GAP. File asli tidak disentuh.
Set MAX_GAP = None untuk mematikan (b).
"""
import hashlib, json, os, subprocess, tempfile, textwrap, math, shutil
import numpy as np
from scipy import signal
from scipy.io import wavfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(ROOT, *a)
SR = 48000
FPS = 30
MAX_GAP = 3.0       # detik; jeda senyap internal yang lebih panjang dipendekkan ke nilai ini
VO_GAP = 0.3        # jeda VO1 -> VO2
END_TAIL = 3.2      # detik setelah suara terakhir (end card)
IN1 = P('public/audio/narration/input/01_vo1_original.wav')
IN2 = P('public/audio/narration/input/02_vo2_original.wav')
rng = np.random.default_rng(20201627)

for d in ['docs', 'out', 'src/data', 'public/audio/narration']:
    os.makedirs(P(d), exist_ok=True)

# ----------------------------------------------------------------------------- util
def sh(cmd):
    return subprocess.run(cmd, capture_output=True, check=True, text=True).stdout

def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64).copy()

def sha256(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for c in iter(lambda: f.read(1 << 20), b''):
            h.update(c)
    return h.hexdigest()

def probe(path, role, original_name):
    j = json.loads(sh(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', path]))
    s = j['streams'][0]
    return dict(role=role, original_name=original_name, stored_as=os.path.relpath(path, ROOT).replace('\\', '/'),
                codec=s['codec_name'], sample_rate=int(s['sample_rate']), channels=s['channels'],
                duration_sec=round(float(j['format']['duration']), 3), size_bytes=int(j['format']['size']),
                sha256=sha256(path))

def sos_f(kind, f, order=4):
    return signal.butter(order, f, kind, fs=SR, output='sos')

def lp(x, f, o=2): return signal.sosfilt(sos_f('low', f, o), x, axis=-1)
def hp(x, f, o=2): return signal.sosfilt(sos_f('high', f, o), x, axis=-1)
def bp(x, lo, hi, o=2): return signal.sosfilt(sos_f('band', [lo, hi], o), x, axis=-1)
def rms(x): return float(np.sqrt(np.mean(np.square(x)) + 1e-18))
def db(x): return 20 * np.log10(x + 1e-12)
def gain_db(g): return 10 ** (g / 20)

def voiced_intervals(x):
    """Interval bersuara pada pita ucapan (>150 Hz agar dengung rendah tidak dianggap suara)."""
    y = signal.sosfilt(sos_f('high', 150, 4), x)
    n = int(SR * 0.01)
    m = len(y) // n
    e = 20 * np.log10(np.sqrt((y[:m * n].reshape(m, n) ** 2).mean(1)) + 1e-9)
    mask = e > -50
    iv, s = [], None
    for i, v in enumerate(mask):
        if v and s is None: s = i
        if not v and s is not None: iv.append([s * 0.01, i * 0.01]); s = None
    if s is not None: iv.append([s * 0.01, m * 0.01])
    merged = []
    for a, b in iv:                       # gabung jeda < 0,12 dtk (konsonan/antar-kata)
        if merged and a - merged[-1][1] < 0.12: merged[-1][1] = b
        else: merged.append([a, b])
    return [(a, b) for a, b in merged if b - a >= 0.08]

def edit_vo(x, label, report):
    """Buang dead-air akhir + pendekkan jeda internal > MAX_GAP. Kembalikan array hasil sunting."""
    vs = voiced_intervals(x)
    t_end = min(len(x) / SR, vs[-1][1] + 0.45)
    keep, cut = [], []
    pos = 0.0
    for (a, b), nxt in zip(vs, vs[1:] + [None]):
        if nxt is None: break
        gap = nxt[0] - b
        if MAX_GAP is not None and gap > MAX_GAP:
            keep.append((pos, b + MAX_GAP / 2)); pos = nxt[0] - MAX_GAP / 2
            cut.append(dict(at_sec=round(b, 2), original_gap=round(gap, 2), new_gap=MAX_GAP))
    keep.append((pos, t_end))
    segs = []
    for i, (a, b) in enumerate(keep):
        s = x[int(a * SR):int(b * SR)].copy()
        f = int(0.008 * SR)
        if i > 0: s[:f] *= np.linspace(0, 1, f)
        if i < len(keep) - 1: s[-f:] *= np.linspace(1, 0, f)
        segs.append(s)
    out = np.concatenate(segs)
    f = int(0.03 * SR); out[-f:] *= np.linspace(1, 0, f)
    report[label] = dict(original_sec=round(len(x) / SR, 2), last_speech_end_sec=round(vs[-1][1], 2),
                         trimmed_tail_sec=round(len(x) / SR - t_end, 2), shortened_gaps=cut,
                         edited_sec=round(len(out) / SR, 2))
    return out

# ----------------------------------------------------------------------------- naskah -> cue + beat
# (vo, beat_mulai, teks, opsi)  opsi: 'prev:N' = beat N mulai tepat setelah cue sebelumnya selesai; 'cta' = penanda CTA
S = [
 (1, 1, "Pernahkah kalian mendengar tentang sebuah gunung di Kotabaru...", ''),
 (1, 0, "yang konon menyimpan jalan menuju dunia lain?", ''),
 (1, 2, "Namanya... Gunung Julahit.", ''),
 (1, 3, "Bagi sebagian orang, mungkin ini hanya sebuah bukit biasa.", ''),
 (1, 4, "Namun, ada cerita lama yang sampai sekarang", ''),
 (1, 0, "masih menarik untuk dipertanyakan.", ''),
 (1, 5, "Menurut penuturan seorang tokoh masyarakat bernama Yusran,", ''),
 (1, 6, "konon terdapat semacam jalur atau jembatan", ''),
 (1, 7, "yang menghubungkan Tanjung Dewa,", ''),
 (1, 8, "Gunung Julahit, dan Saranjana.", ''),
 (1, 9, "Bahkan, ada cerita tentang sebuah... jembatan gaib.", ''),
 (1, 10, "Konon, jalurnya menghubungkan Tanjung Dewa...", ''),
 (1, 0, "menuju Gunung Julahit...", ''),
 (1, 11, "dan berakhir di Saranjana.", ''),
 (1, 12, "Tiga lokasi.", ''),
 (1, 0, "Satu jalur yang katanya tidak bisa dilihat oleh manusia biasa.", ''),
 (1, 13, "Tapi tunggu dulu.", ''),
 (1, 0, "Di balik cerita jembatan misterius itu,", ''),
 (1, 0, "ternyata ada kisah lain yang jauh lebih menyeramkan.", ''),
 (1, 14, "Kisah tentang seseorang yang mengaku pernah bertemu", ''),
 (1, 0, "seorang perempuan di sekitar Gunung Julahit.", ''),
 (1, 15, "Kejadiannya berlangsung pada malam Jumat.", ''),
 (1, 0, "Hujan gerimis. Jalanan sepi.", ''),
 (1, 16, "Dan seorang perempuan tiba-tiba melambaikan tangan", ''),
 (1, 17, "meminta pertolongan.", ''),
 (1, 18, "Awalnya, semuanya terlihat biasa saja.", ''),
 (1, 0, "Sampai perempuan itu menunjukkan ke mana ia ingin pulang.", ''),
 (1, 19, "Ke sebuah tempat... Di atas Gunung Julahit.", ''),
 (1, 20, "Dan apa yang terjadi setelahnya...", ''),
 (1, 0, "membuat orang tersebut tidak bisa melupakan malam itu.", ''),
 (2, 21, "Menurut pemberitaan, seorang warga bernama Taufik Dani", ''),
 (2, 0, "pernah mengalami kejadian aneh di sekitar Gunung Julahit.", ''),
 (2, 22, "Malam itu, ia sedang pulang.", ''),
 (2, 0, "Gerimis turun. Jalanan mulai sepi.", ''),
 (2, 23, "Di depan SMEA, yang disebut dalam pemberitaan", ''),
 (2, 0, "kini menjadi taman kota,", ''),
 (2, 24, "seorang perempuan tiba-tiba melambaikan tangan.", ''),
 (2, 25, "Perempuan itu meminta ditemani pulang.", ''),
 (2, 26, "Taufik mendekat.", ''),
 (2, 27, "Ia bertanya, “Rumah pian di mana?”", ''),
 (2, 28, "Namun, perempuan itu hanya menunjuk...", ''),
 (2, 29, "ke arah Gunung Julahit.", ''),
 (2, 30, "Taufik merasa heran.", ''),
 (2, 0, "Baginya, tidak ada rumah di atas sana.", ''),
 (2, 31, "Ia pun berkata, “Saya antar sampai di bawah sini saja.”", ''),
 (2, 33, "Setelah itu...", 'prev:32'),
 (2, 34, "perempuan tersebut tiba-tiba menghilang.", ''),
 (2, 35, "Tidak ada langkah menjauh. Tidak ada suara.", ''),
 (2, 36, "Hanya jalan yang kembali kosong.", ''),
 (2, 37, "Taufik mengaku saat itu merasa", ''),
 (2, 0, "seperti setengah tidak sadar.", ''),
 (2, 0, "Lalu, siapa perempuan itu?", ''),
 (2, 38, "Mengapa ia menunjuk Gunung Julahit?", ''),
 (2, 0, "Dan apa hubungannya dengan cerita jembatan menuju Saranjana?", ''),
 (2, 39, "Belum ada bukti yang memastikan bahwa peristiwa itu bersifat gaib.", ''),
 (2, 0, "Yang ada adalah kesaksian yang pernah diberitakan,", ''),
 (2, 0, "dan pertanyaan yang belum terjawab.", ''),
 (2, 40, "Menurut kalian, apa yang sebenarnya terjadi malam itu?", ''),
 (2, 0, "Jangan lupa follow, like, komen, dan repost.", 'cta'),
 (2, 0, "Punya cerita misteri Kotabaru?", ''),
 (2, 0, "Kirim DM atau ceritakan di kolom komentar.", ''),
 (2, 0, "Siapa tahu, kisah kalian jadi cerita berikutnya.", ''),
]
# jumpscare: nomor -> (beat, fraksi posisi di dalam beat, kekuatan)
JS = {1: (6, .55, .75), 2: (10, .60, .8), 3: (15, .50, .85), 4: (17, .40, .9),
      5: (25, .60, .9), 6: (30, .55, .85), 7: (34, .45, 1.0), 8: (36, .50, .95)}

# ----------------------------------------------------------------------------- 1. suara
vo1_raw, vo2_raw = load(IN1), load(IN2)
audio_order = dict(order=[
    probe(IN1, 'VO1', 'GUNUNG JULAHIT - vo 1.wav'),
    probe(IN2, 'VO2', 'GUNUNG JULAHIT - vo 2.wav')],
    note='Urutan final VO1 -> VO2. File di input/ adalah salinan byte-identik dari file pengguna.')
json.dump(audio_order, open(P('docs/audio-order.json'), 'w'), indent=2, ensure_ascii=False)

edit_report = {}
vo1 = edit_vo(vo1_raw, 'VO1', edit_report)
vo2 = edit_vo(vo2_raw, 'VO2', edit_report)
off2 = len(vo1) / SR + VO_GAP
voice = np.concatenate([vo1, np.zeros(int(VO_GAP * SR)), vo2])
voice_end = len(voice) / SR
wavfile.write(P('public/audio/narration/voiceover-combined.wav'), SR, (np.clip(voice, -1, 1) * 32767).astype(np.int16))

T = voice_end + END_TAIL
N = int(math.ceil(T * SR))
t = np.arange(N) / SR
voice_full = np.zeros(N); voice_full[:len(voice)] = voice

# ----------------------------------------------------------------------------- 2. alignment cue
vs_all = voiced_intervals(voice)
vs1 = [(a, b) for a, b in vs_all if b <= off2 - 0.05]
vs2 = [(a, b) for a, b in vs_all if a >= off2 - 0.05]

def align(weights, vs, force_long=()):
    """Cocokkan cue ke segmen bicara: tiap cue ~ proporsional jumlah huruf (durasi suara, tanpa jeda),
    batas cue lebih disukai jatuh di jeda senyap. DP (Viterbi) -> batas monoton."""
    d = [e - s for s, e in vs]; cum = np.concatenate([[0], np.cumsum(d)]); L = cum[-1]
    def real(u):
        k = int(np.searchsorted(cum, u, side='right') - 1); k = min(max(k, 0), len(vs) - 1)
        return vs[k][0] + min(u - cum[k], d[k])
    cands = []
    for k in range(len(vs) - 1):
        gap = vs[k + 1][0] - vs[k][1]
        if gap >= 0.28:
            cands.append((cum[k + 1], vs[k][1], vs[k + 1][0], -0.5 * min(gap, 1.5) - (1.0 if gap >= 1.2 else 0), gap))
    for u in np.arange(0.25, L - 0.25, 0.25):
        tt = real(u); cands.append((u, tt, tt, 1.5, 0.0))
    cands.sort(key=lambda c: c[0])
    U = np.array([c[0] for c in cands]); PEN = np.array([c[3] for c in cands]); GAP = np.array([c[4] for c in cands])
    K = len(cands); m = len(weights); INF = 1e9
    e = [w * L / sum(weights) for w in weights]
    def cc(dd, ei):
        c = ((dd - ei) / (0.25 * ei + 0.25)) ** 2
        return np.where(dd < 0.25, INF, c)
    best = np.full((m - 1, K), INF); back = np.zeros((m - 1, K), int)
    best[0] = cc(U, e[0]) + PEN
    for i in range(m - 1):
        if i > 0:
            tot = best[i - 1][:, None] + cc(U[None, :] - U[:, None], e[i])
            back[i] = np.argmin(tot, axis=0); best[i] = tot[back[i], np.arange(K)] + PEN
        if i in force_long:
            best[i] = np.where(GAP >= 2.0, best[i] - 3, INF)
    j = int(np.argmin(best[-1] + cc(L - U, e[-1]))); ch = [j]
    for i in range(m - 2, 0, -1):
        j = int(back[i][j]); ch.append(j)
    ch = ch[::-1]
    out = []
    for i in range(m):
        s0 = vs[0][0] if i == 0 else cands[ch[i - 1]][2]
        e0 = vs[-1][1] if i == m - 1 else cands[ch[i]][1]
        out.append((s0, e0))
    return out

cues = []
for vo, vsx in ((1, vs1), (2, vs2)):
    items = [s for s in S if s[0] == vo]
    w = [max(1, sum(ch.isalpha() for ch in s[2])) for s in items]
    force = tuple(k - 1 for k, s_ in enumerate(items) if s_[3].startswith('prev:'))
    for s, (a, e) in zip(items, align(w, vsx, force)):
        wrapped = textwrap.wrap(s[2], width=34)
        assert len(wrapped) <= 2, s[2]
        cues.append(dict(i=len(cues), vo=vo, beat=s[1], opt=s[3], text=s[2], lines="\n".join(wrapped),
                         start=round(a, 3), end=round(e, 3)))

# ----------------------------------------------------------------------------- 3. beat & jumpscare
starts = {}
for k, c in enumerate(cues):
    prev_end = cues[k - 1]['end'] if k else 0
    if c['beat']:
        starts[c['beat']] = 0.0 if c['beat'] == 1 else max(prev_end + 0.15, c['start'] - 0.7)
    if c['opt'].startswith('prev:'):
        hb = int(c['opt'][5:]); starts[hb] = prev_end + 0.15
        starts[c['beat']] = max(starts[hb] + 1.2, c['start'] - 0.5)
cta_t = next(c['start'] for c in cues if c['opt'] == 'cta')
nb = max(starts)
MIN_BEAT = 1.6   # beat < 1.5 dtk ditarik lebih awal ke dalam beat sebelumnya (audio tidak berubah)
for n in range(nb - 1, 1, -1):
    if starts[n + 1] - starts[n] < 1.5 and (starts[n + 1] - MIN_BEAT) - starts[n - 1] >= 1.5:
        starts[n] = starts[n + 1] - MIN_BEAT
assert sorted(starts) == list(range(1, nb + 1)) and all(starts[i] < starts[i + 1] for i in range(1, nb)), starts
beats = [dict(id=n, start=round(starts[n], 3), end=round(starts[n + 1] if n < nb else T, 3)) for n in range(1, nb + 1)]
B = {b['id']: (b['start'], b['end']) for b in beats}
jumpscares = []
for n, (bt, fr, pw) in JS.items():
    s, e = B[bt]
    jumpscares.append(dict(n=n, beat=bt, t=round(s + max(0.6, fr * (e - s)), 3), power=pw))
JT = {j['n']: j['t'] for j in jumpscares}

timeline = dict(fps=FPS, durationSec=round(T, 3), voiceEnd=round(voice_end, 3), vo2Offset=round(off2, 3),
                ctaStart=round(cta_t, 3), beats=beats,
                cues=[dict(i=c['i'], vo=c['vo'], beat=c['beat'] or None, text=c['text'], lines=c['lines'],
                           start=c['start'], end=c['end']) for c in cues], jumpscares=jumpscares)
json.dump(timeline, open(P('src/data/timeline.json'), 'w'), indent=1, ensure_ascii=False)
json.dump(timeline, open(P('docs/audio-timeline.json'), 'w'), indent=1, ensure_ascii=False)
json.dump(jumpscares, open(P('docs/jumpscare-cues.json'), 'w'), indent=1)

def tc(x, srt=True):
    ms = int(round(x * 1000)); h, r = divmod(ms, 3600000); m, r = divmod(r, 60000); s, ms = divmod(r, 1000)
    return f"{h:02d}:{m:02d}:{s:02d}{',' if srt else '.'}{ms:03d}"
with open(P('out/GUNUNG_JULAHIT_PEREMPUAN_MISTERIUS.srt'), 'w', encoding='utf-8') as f:
    for k, c in enumerate(cues, 1):
        f.write(f"{k}\n{tc(c['start'])} --> {tc(max(c['end'], c['start'] + .5))}\n{c['lines']}\n\n")
with open(P('docs/transcript-combined.txt'), 'w', encoding='utf-8') as f:
    f.write("# Alignment tingkat SEGMEN (bukan ASR): teks naskah dicocokkan ke segmen bicara hasil deteksi energi suara.\n")
    f.write("# Perkiraan meleset sampai +-1 dtk. Audio pengguna adalah sumber final.\n\n")
    for c in cues:
        f.write(f"[{tc(c['start'], False)} - {tc(c['end'], False)}] VO{c['vo']}  {c['text']}\n")

# ----------------------------------------------------------------------------- 4. sound design (semua buatan sendiri)
def interp(pts):
    xs, ys = zip(*sorted(pts)); return np.interp(t, xs, ys)

def stereo_noise(): return np.stack([rng.standard_normal(N), rng.standard_normal(N)])
def unit(x): return x / (rms(x) + 1e-12)
def smooth_env(x, f=3.0): return lp(np.abs(x), f, 2)

# --- envelope narasi untuk ducking
ve = np.abs(signal.sosfilt(sos_f('high', 150, 2), voice_full))
ve = lp(ve, 8, 2); ve = ve / (np.percentile(ve, 99) + 1e-9)
act = np.clip((ve - 0.02) / 0.06, 0, 1)
act = lp(act, 2.5, 1)                                    # lembut (attack ~60 ms, release ~400 ms)
act = np.clip(act * 1.4, 0, 1)

# --- intensitas ketegangan bertahap
I_pts = [(0, .30), (B[2][0], .45), (B[5][0], .50), (B[9][0], .55), (B[13][0], .65), (B[16][0], .78),
         (B[19][0], 1.0), (B[20][0], .75), (off2 - 2.5, .0), (off2, .0), (B[21][0] + 2, .40), (B[25][0], .65),
         (B[30][0], .78), (B[33][0], .90), (B[35][0], .50), (B[36][0], .85), (B[37][0], .50), (B[38][0], .60),
         (B[39][0], .45), (B[40][0], .50), (cta_t, .35), (T - 2.5, .30), (T, 0)]
inten = interp(I_pts)
for n, tt in JT.items():                                 # swell sebelum, jeda tenang sesudah
    inten = inten * (1 + .35 * np.clip((t - (tt - 3.5)) / 3.5, 0, 1) * (t <= tt)) \
                  * (1 - .45 * np.exp(-np.clip(t - tt, 0, None) / 1.6) * (t > tt))
# --- jeda hening di JS7: musik/ambience turun ke nol 0,6 dtk sebelum impact
hush = np.ones(N)
t7 = JT[7]
hush = np.where((t >= t7 - 0.6) & (t < t7 - 0.02), 0.0, 1.0)
hush = lp(hush, 14, 1)

# --- MUSIK: drone gelap + pad disonan lembut + nada metalik halus
def drone():
    out = np.zeros((2, N))
    for ch, det in ((0, 1.0), (1, 1.004)):
        lfo = 0.5 + 0.5 * np.sin(2 * np.pi * 0.05 * t + ch)
        ph = lambda f: 2 * np.pi * np.cumsum(np.full(N, f * det)) / SR
        x = (np.sin(ph(55.0)) * .55 + np.sin(ph(55.4)) * .4 + np.sin(ph(82.4) + 0.4 * np.sin(2 * np.pi * .03 * t)) * .22 * lfo
             + np.sin(ph(110.0)) * .14 + np.sin(ph(116.5)) * .10 * (1 - lfo) + np.sin(ph(164.8)) * .05 * lfo)
        x += lp(rng.standard_normal(N), 180, 2) * 1.6 * (0.6 + 0.4 * lfo)
        out[ch] = x
    return out
music = unit(drone()) * gain_db(-22) * inten * hush
ping_times = [B[10][0] + 1.0, B[19][0] + .3, B[25][0] + .2, B[36][0] + .1] + [JT[n] for n in JT]

def ping(tt, f0=1170., amp=.1, dur=3.0):
    y = np.zeros(N); i0 = int(tt * SR); L = int(dur * SR); i1 = min(N, i0 + L)
    if i0 >= N: return y
    k = np.arange(i1 - i0) / SR
    s = sum(a * np.sin(2 * np.pi * f0 * r * k) * np.exp(-k * d) for r, a, d in ((1, 1, 1.2), (2.76, .5, 1.8), (5.40, .25, 2.6)))
    y[i0:i1] = amp * s * np.minimum(1, k / .004)
    return y
pings = sum(ping(x, amp=.06) for x in ping_times)
music_bus = np.stack([music[0] + pings * hush, music[1] + np.roll(pings, 240) * hush])

# --- AMBIENCE: hujan, angin, serangga malam
rain_pts = [(0, .45), (B[2][0], .45), (B[2][0] + 2.5, 0), (B[13][0] - .5, 0), (B[13][0] + 2, .75), (B[20][1], .70),
            (B[21][0] + 1, .65), (B[38][1], .60), (B[40][0], .35), (T - 1.5, .25), (T, 0)]
rain = hp(bp(stereo_noise(), 1500, 9000), 1200)
rain = rain * (0.65 + 0.35 * unit(lp(stereo_noise(), 30, 1)))
rain = unit(rain) * gain_db(-31) * interp(rain_pts) * hush * (1 - .6 * np.exp(-np.clip(t - t7, 0, None) / 2) * (t > t7))
wind = unit(bp(stereo_noise(), 180, 700) * (0.5 + 0.5 * unit(lp(stereo_noise(), 0.4, 1)) ** 2)) * gain_db(-35) * hush
wind *= interp([(0, .5), (B[3][0], 1), (B[12][1], 1), (B[13][0], .4), (B[40][0], .4), (T, 0)])

ins_env = interp([(0, 0), (B[2][0], 0), (B[2][0] + 1.5, .5), (B[12][1], .5), (B[13][0], .25), (B[18][0], .12), (B[19][0], 0),
                  (B[21][0], 0), (B[21][0] + 2, .3), (B[23][1], .3), (B[25][0], .0), (T, 0)]) * hush
crick = np.zeros((2, N))
for ci, base in enumerate((4100., 4500., 3800., 4900.)):
    per = .30 + .05 * ci; phase0 = rng.uniform(0, per); pulse_t = np.arange(phase0, T, per)
    for pt in pulse_t:
        if ins_env[min(N - 1, int(pt * SR))] < .02: continue
        for p in range(3):
            i0 = int((pt + p * .035 + rng.uniform(0, .004)) * SR); L = int(.022 * SR)
            if i0 + L >= N: continue
            k = np.arange(L) / SR
            crick[ci % 2, i0:i0 + L] += np.sin(2 * np.pi * base * k) * np.hanning(L) * .5
crick = unit(crick) * gain_db(-37) * ins_env

# --- SFX: langkah di genangan, impact + reverse swell, hush
def step(tt, amp=1., pan=0.):
    y = np.zeros((2, N)); i0 = int(tt * SR); L = int(.28 * SR)
    if i0 + L >= N: return y
    k = np.arange(L) / SR
    splash = bp(rng.standard_normal(L), 350, 3200) * np.exp(-k / .07) * .8
    thump = np.sin(2 * np.pi * (110 - 40 * k * 5) * k) * np.exp(-k / .035) * .9
    s = (splash + thump) * amp * gain_db(-26)
    y[0, i0:i0 + L] += s * (1 - pan) / 2 + s * .5; y[1, i0:i0 + L] += s * (1 + pan) / 2 + s * .5
    return y
steps = np.zeros((2, N))
def walk(a, b, every, amp):
    x = a; k = 0
    while x < b:
        steps[:] += step(x + rng.uniform(-.03, .03), amp * rng.uniform(.8, 1.1), (-1) ** k * .3); x += every * rng.uniform(.95, 1.05); k += 1
walk(B[16][0], B[17][0] - .2, .72, .8)
walk(B[21][0] + .5, B[23][0], .66, .55)
walk(B[26][0], B[28][0] - .3, .78, .95)

def impact(tt, power):
    y = np.zeros((2, N)); i0 = int(tt * SR); L = int(3.2 * SR)
    if i0 + L >= N: L = N - i0 - 1
    k = np.arange(L) / SR
    f = 32 + 58 * np.exp(-k / .09)
    sweep = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-k / .55)
    sub = np.sin(2 * np.pi * 41 * k) * np.exp(-k / 1.1) * .6
    body = lp(rng.standard_normal(L), 700, 2) * np.exp(-k / .22) * .5
    s = (sweep + sub + body) * np.minimum(1, k / .002)
    s = s / np.max(np.abs(s)) * power * gain_db(-4)
    y[0, i0:i0 + L] = s; y[1, i0:i0 + L] = s
    return y

def swell(tt, dur=1.7, amp=.5):
    y = np.zeros((2, N)); L = int(dur * SR); i1 = int(tt * SR); i0 = i1 - L
    if i0 < 0: return y
    k = np.linspace(0, 1, L)
    n = rng.standard_normal((2, L))
    n = bp(n, 400, 3800)
    n = n * (k ** 3)
    n = n / (np.max(np.abs(n)) + 1e-9) * amp * gain_db(-13)
    y[:, i0:i1] = n
    return y

sfx = steps.copy()
for n, (bt, fr, pw) in JS.items():
    tt = JT[n]
    sfx += impact(tt, pw)
    if n != 7: sfx += swell(tt, 1.7, .45 + .35 * pw)
    sfx += np.stack([ping(tt + .02, 2100., .05, 2.0), ping(tt + .03, 2100., .05, 2.0)])

# --- ducking & mix
duck_music = 1 - act * (1 - gain_db(-12))                # -12 dB: musik berada ~20 dB di bawah narasi
duck_amb = 1 - act * (1 - gain_db(-6))
duck_sfx = 1 - act * (1 - gain_db(-3))
mix = np.zeros((2, N))
mix += music_bus * duck_music
mix += (rain + wind + crick) * duck_amb
mix += sfx * duck_sfx
mix += np.stack([voice_full, voice_full]) * gain_db(0)
fade = np.minimum(1, (T - t) / 2.0)
mix *= fade

tmp = tempfile.mkdtemp()
raw_p = os.path.join(tmp, 'raw.wav'); wavfile.write(raw_p, SR, mix.T.astype(np.float32))
# --- master: loudnorm 2-pass ke -16 LUFS, TP -1 dBTP
meas = subprocess.run(['ffmpeg', '-hide_banner', '-i', raw_p, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json',
                       '-f', 'null', '-'], capture_output=True, text=True).stderr
j = json.loads(meas[meas.rindex('{'):meas.rindex('}') + 1])
af = (f"loudnorm=I=-16:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:"
      f"measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,"
      f"aresample={SR},alimiter=limit=0.891:level=disabled")
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', raw_p, '-af', af, '-ar', str(SR), '-ac', '2', '-c:a', 'pcm_s16le',
                P('public/audio/mix-master.wav')], check=True)
chk = subprocess.run(['ffmpeg', '-hide_banner', '-i', P('public/audio/mix-master.wav'), '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                     capture_output=True, text=True).stderr
summ = chk[chk.rindex('Summary:'):]
def grab(key):
    for ln in summ.splitlines():
        if ln.strip().startswith(key): return float(ln.split()[1])
final = dict(integrated_lufs=grab('I:'), true_peak_dbtp=grab('Peak:'), loudness_range_lu=grab('LRA:'))
shutil.rmtree(tmp, ignore_errors=True)

json.dump(dict(edits=edit_report, final_mix=final, sample_rate=SR, channels=2, duration_sec=round(T, 2),
               alignment='segment-level (bukan ASR), perkiraan meleset +-1 dtk',
               ducking='musik -12 dB (ke ~20 dB di bawah narasi), ambience -6 dB, sfx -3 dB saat narasi aktif'),
          open(P('docs/audio-report.json'), 'w'), indent=2, ensure_ascii=False)
open(P('docs/asset-licenses.md'), 'w', encoding='utf-8').write(
    "# Lisensi aset\n\nSeluruh audio (drone, pad, hujan, angin, serangga, langkah, impact, swell, nada metalik, dropout hening) "
    "dibuat sendiri secara prosedural oleh `scripts/prepare-audio.py` (numpy/scipy/ffmpeg). Tidak ada sampel, musik, atau aset berlisensi pihak ketiga.\n"
    "Narasi = VO1 & VO2 buatan pengguna.\nSemua visual dibuat prosedural (SVG/CSS) di Remotion; tidak ada gambar/footage pihak ketiga.\n")
print(json.dumps(dict(duration=round(T, 2), voice_end=round(voice_end, 2), beats=len(beats), cues=len(cues), final=final,
                      edits=edit_report), indent=1, ensure_ascii=False))

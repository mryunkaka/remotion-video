from faster_whisper import WhisperModel
from pathlib import Path
import json
import sys

audio = Path(sys.argv[1]).resolve()
output = Path(sys.argv[2]).resolve()
output.mkdir(parents=True, exist_ok=True)
cache = Path.home() / ".cache" / "huggingface" / "hub" / "models--Systran--faster-whisper-small" / "snapshots"
snapshots = sorted(cache.glob("*"))
if not snapshots:
    raise SystemExit(f"Model small tidak tersedia lokal: {cache}")
model = WhisperModel(str(snapshots[-1]), device="cpu", compute_type="int8", cpu_threads=6, num_workers=1)
segments, info = model.transcribe(
    str(audio), language="id", beam_size=5, vad_filter=True,
    word_timestamps=True, condition_on_previous_text=True,
    initial_prompt="Narasi horor maritim Pulau Halimun, Pulau Laut, Kotabaru, Kalimantan Selatan.",
)
rows = []
for seg in segments:
    rows.append({
        "start": seg.start, "end": seg.end, "text": seg.text.strip(),
        "words": [{"start": w.start, "end": w.end, "word": w.word} for w in (seg.words or [])],
    })
def ts(sec):
    ms = round(sec * 1000)
    h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
srt = []
for i, row in enumerate(rows, 1):
    srt += [str(i), f"{ts(row['start'])} --> {ts(row['end'])}", row["text"], ""]
(output / "transcript.json").write_text(json.dumps({"model":"faster-whisper-small","language":info.language,"language_probability":info.language_probability,"duration":info.duration,"segments":rows}, ensure_ascii=False, indent=2), encoding="utf-8")
(output / "narration.srt").write_text("\n".join(srt), encoding="utf-8")
print(json.dumps({"language":info.language,"language_probability":info.language_probability,"duration":info.duration,"segments":len(rows),"text":" ".join(r['text'] for r in rows)}, ensure_ascii=False))

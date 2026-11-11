
from faster_whisper import WhisperModel
from pathlib import Path
import sys
import json
import time

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "productions" / "test-whisper-large-v3"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

if len(sys.argv) < 2:
    print('Penggunaan: python .\\scripts\\test-whisper-large-v3.py "D:\\path\\audio.wav"')
    sys.exit(1)

audio_path = Path(sys.argv[1])

if not audio_path.is_file():
    print(f"File audio tidak ditemukan: {audio_path}")
    sys.exit(1)

print("=" * 55)
print("WHISPER LARGE-V3 | CPU INT8")
print("=" * 55)
print(f"Audio : {audio_path}")
print("Model : large-v3")
print("Device: CPU")
print("Mode  : INT8")
print("\nMemuat model. Pengunduhan pertama bisa cukup besar...")

start_time = time.time()

MODEL_DIR = Path(r"D:\Project\CutAwan\whisper-large-v3")

model = WhisperModel(
    str(MODEL_DIR),
    device="cpu",
    compute_type="int8",
    cpu_threads=6,
    num_workers=1
)

load_time = time.time() - start_time

print(f"Model siap dalam {load_time:.1f} detik.")
print("\nMemulai transkripsi bahasa Indonesia...")

transcription_start = time.time()

segments, info = model.transcribe(
    str(audio_path),
    language="id",
    beam_size=5,
    best_of=5,
    patience=1.0,
    vad_filter=True,
    word_timestamps=True,
    condition_on_previous_text=True,
    initial_prompt=(
        "Narasi dokumenter sejarah dan legenda Kalimantan Selatan. "
        "Nama dan istilah: Kotabaru, Pulau Laut, Pulau Halimun, "
        "Bumi Saijaan, Saijaan, Datumabrur, ikan todak, "
        "Kalimantan Selatan."
    )
)

segments = list(segments)
transcription_time = time.time() - transcription_start

result = {
    "model": "large-v3",
    "device": "cpu",
    "compute_type": "int8",
    "language": info.language,
    "language_probability": info.language_probability,
    "duration": info.duration,
    "model_load_seconds": round(load_time, 2),
    "transcription_seconds": round(transcription_time, 2),
    "segments": []
}

def timestamp(seconds):
    milliseconds = round(seconds * 1000)
    hours, remainder = divmod(milliseconds, 3600000)
    minutes, remainder = divmod(remainder, 60000)
    seconds_part, milliseconds = divmod(remainder, 1000)
    return (
        f"{hours:02}:{minutes:02}:"
        f"{seconds_part:02},{milliseconds:03}"
    )

srt_lines = []

for index, segment in enumerate(segments, start=1):
    result["segments"].append({
        "start": segment.start,
        "end": segment.end,
        "text": segment.text,
        "words": [
            {
                "start": word.start,
                "end": word.end,
                "word": word.word
            }
            for word in (segment.words or [])
        ]
    })

    srt_lines.extend([
        str(index),
        f"{timestamp(segment.start)} --> {timestamp(segment.end)}",
        segment.text.strip(),
        ""
    ])

json_path = OUTPUT_DIR / "transcript.json"
srt_path = OUTPUT_DIR / "subtitles.srt"

json_path.write_text(
    json.dumps(result, ensure_ascii=False, indent=2),
    encoding="utf-8"
)

srt_path.write_text(
    "\n".join(srt_lines),
    encoding="utf-8"
)

print("\n" + "=" * 55)
print("HASIL TRANSKRIPSI")
print("=" * 55)
print(f"Bahasa              : {info.language}")
print(f"Probabilitas        : {info.language_probability:.2%}")
print(f"Durasi audio        : {info.duration:.2f} detik")
print(f"Jumlah segmen       : {len(segments)}")
print(f"Waktu memuat model  : {load_time:.1f} detik")
print(f"Waktu transkripsi   : {transcription_time / 60:.1f} menit")
print(f"\nJSON: {json_path}")
print(f"SRT : {srt_path}")
print("\nTranskripsi selesai.")

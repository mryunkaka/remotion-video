
from faster_whisper import WhisperModel
from pathlib import Path
import sys
import json

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "productions" / "test-whisper"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

if len(sys.argv) < 2:
    print("Penggunaan:")
    print('python .\\scripts\\test-whisper.py "D:\\path\\audio.mp3"')
    sys.exit(1)

audio_path = Path(sys.argv[1])

if not audio_path.is_file():
    print(f"File audio tidak ditemukan: {audio_path}")
    sys.exit(1)

print("Memuat model Whisper small...")
model = WhisperModel(
    "small",
    device="cpu",
    compute_type="int8"
)

print("Memulai transkripsi bahasa Indonesia...")

segments, info = model.transcribe(
    str(audio_path),
    language="id",
    beam_size=5,
    vad_filter=True,
    word_timestamps=True
)

segments = list(segments)

result = {
    "language": info.language,
    "language_probability": info.language_probability,
    "duration": info.duration,
    "segments": []
}

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

    def timestamp(seconds):
        milliseconds = round(seconds * 1000)
        hours, remainder = divmod(milliseconds, 3600000)
        minutes, remainder = divmod(remainder, 60000)
        seconds_part, milliseconds = divmod(remainder, 1000)
        return (
            f"{hours:02}:{minutes:02}:"
            f"{seconds_part:02},{milliseconds:03}"
        )

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

print("\n=== HASIL TRANSKRIPSI ===")
print(f"Bahasa       : {info.language}")
print(f"Probabilitas : {info.language_probability:.2%}")
print(f"Durasi audio : {info.duration:.2f} detik")
print(f"Jumlah segmen: {len(segments)}")
print(f"\nJSON: {json_path}")
print(f"SRT : {srt_path}")
print("\nTranskripsi selesai.")

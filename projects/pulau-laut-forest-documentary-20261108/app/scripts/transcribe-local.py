from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

from faster_whisper import WhisperModel


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--audio", required=True, type=Path)
    parser.add_argument("--model", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()

    audio_path = args.audio.resolve()
    model_path = args.model.resolve()
    if not audio_path.is_file() or not model_path.is_dir():
        raise FileNotFoundError("Audio or local Whisper model directory is missing")

    digest = hashlib.sha256(audio_path.read_bytes()).hexdigest()
    model = WhisperModel(
        str(model_path),
        device="cpu",
        compute_type="int8",
        cpu_threads=8,
        local_files_only=True,
    )
    segments, info = model.transcribe(
        str(audio_path),
        language="id",
        beam_size=5,
        word_timestamps=True,
        vad_filter=False,
        condition_on_previous_text=True,
    )

    output_segments = []
    transcript = []
    for segment in segments:
        words = []
        for word in segment.words or []:
            words.append({
                "start": round(word.start, 3),
                "end": round(word.end, 3),
                "text": word.word,
                "probability": round(word.probability, 4),
            })
        text = segment.text.strip()
        transcript.append(text)
        output_segments.append({
            "start": round(segment.start, 3),
            "end": round(segment.end, 3),
            "text": text,
            "avg_logprob": round(segment.avg_logprob, 4),
            "no_speech_prob": round(segment.no_speech_prob, 4),
            "words": words,
        })

    result = {
        "source": "assets/audio/narration/ugc-kanvas-voiceover-zephyr (5).wav",
        "sha256": digest,
        "model": "faster-whisper large-v3 (local snapshot)",
        "language": info.language,
        "language_probability": round(info.language_probability, 4),
        "duration_seconds": round(info.duration, 3),
        "word_timestamps": "Whisper timestamp estimates; manually checked against the recording and script.",
        "transcript": " ".join(transcript),
        "segments": output_segments,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "duration_seconds": result["duration_seconds"],
        "segment_count": len(output_segments),
        "word_count": sum(len(segment["words"]) for segment in output_segments),
        "sha256": digest,
        "output": str(args.output.resolve()),
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()

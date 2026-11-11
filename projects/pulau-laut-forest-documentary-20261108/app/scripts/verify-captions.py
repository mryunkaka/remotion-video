from pathlib import Path
import re

root = Path(__file__).resolve().parents[2]
script = re.sub(r"\s+", " ", (root / "docs/narration-final.txt").read_text(encoding="utf-8")).strip()
srt = (root / "out/HUTAN_PULAU_LAUT.srt").read_text(encoding="utf-8-sig")
blocks = [b for b in re.split(r"\n\s*\n", srt.strip()) if b.strip()]
text = re.sub(r"\s+", " ", " ".join(" ".join(b.splitlines()[2:]) for b in blocks)).strip()
if script != text:
    raise SystemExit("Subtitle words differ from the supplied script.")
def seconds(stamp):
    h,m,rest=stamp.split(":")
    s,ms=rest.split(",")
    return int(h)*3600+int(m)*60+int(s)+int(ms)/1000
previous=0
for i,block in enumerate(blocks,1):
    lines=block.splitlines()
    if len(lines)<3:
        raise SystemExit("Malformed subtitle block "+str(i))
    match=re.fullmatch(r"(\d\d:\d\d:\d\d,\d\d\d) --> (\d\d:\d\d:\d\d,\d\d\d)",lines[1])
    if not match:
        raise SystemExit("Invalid timecode in block "+str(i))
    start,end=map(seconds,match.groups())
    if start < previous-0.001 or end <= start or end > 141.5:
        raise SystemExit("Subtitle timing issue in block "+str(i))
    previous=end
print("PASS: "+str(len(blocks))+" SRT captions match supplied script verbatim; timecodes ordered and valid.")
print("Last caption end: "+str(previous)+" s")


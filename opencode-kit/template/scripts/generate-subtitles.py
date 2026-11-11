import json,re
al=json.load(open("docs/alignment.json"))
chunks=[]
for ui,u in enumerate(al):
    ws=u["words"]; cur=[]
    def flush():
        global cur
        if cur: chunks.append(dict(words=cur,unit=ui)); cur=[]
    for wi,w in enumerate(ws):
        L=len(" ".join(x["w"] for x in cur+[w]))
        rem=len(ws)-wi-1
        if cur and L>(80 if rem<=0 else 68): flush()
        cur.append(w)
        if re.search(r"[.!?…]$",w["w"]) : flush()
        elif w["w"].endswith(",") and len(" ".join(x["w"] for x in cur))>26: flush()
    flush()
out=[]
for i,c in enumerate(chunks):
    ws=c["words"]; s=ws[0]["s"]; e=ws[-1]["e"]
    text=" ".join(w["w"] for w in ws)
    if len(text)>30:
        best=None
        for k in range(1,len(ws)):
            a=" ".join(w["w"] for w in ws[:k]); b=" ".join(w["w"] for w in ws[k:])
            sc=abs(len(a)-len(b))
            if best is None or sc<best[0]: best=(sc,a,b)
        lines=[best[1],best[2]]
    else: lines=[text]
    out.append(dict(start=round(s,3),end=e,text=text,lines=lines,unit=c["unit"]))
for c in out: c["start"]=round(c["start"]-0.04,3)
for i,c in enumerate(out):
    nxt=out[i+1]["start"] if i+1<len(out) else 150
    c["end"]=round(min(c["end"]+0.22,nxt-0.03),3)
    if c["end"]-c["start"]<0.6: c["end"]=round(min(c["start"]+0.6,nxt-0.03),3)
    c["hide"]= c["unit"] in (0,1,len(al)-1,len(al)-2)   # shown as title/tagline graphics instead
json.dump(out,open("src/data/subtitles.json","w"),ensure_ascii=False,indent=1)
def ts(x):
    h=int(x//3600);m=int(x%3600//60);s=x%60; return f"{h:02d}:{m:02d}:{int(s):02d},{int(round((s-int(s))*1000)):03d}"
srt=[]
for i,c in enumerate(out,1):
    srt.append(f"{i}\n{ts(max(0,c['start']))} --> {ts(c['end'])}\n"+"\n".join(c["lines"])+"\n")
open("out/MISTERI_PULAU_HALIMUN.srt","w",encoding="utf8").write("\n".join(srt))
print(len(out),"cues; max line len",max(len(l) for c in out for l in c["lines"]))

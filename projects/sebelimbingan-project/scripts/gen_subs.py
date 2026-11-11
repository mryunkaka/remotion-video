import json,re,textwrap
d=json.load(open('docs/alignment.json'))['segments']
subs=[]
for s in d:
    words=s['text'].split(); 
    # chunks of <=2 lines x 26 chars
    chunks=[];cur=[]
    for w in words:
        if len(' '.join(cur+[w]))>52 and cur: chunks.append(cur);cur=[w]
        else: cur.append(w)
    if cur: chunks.append(cur)
    # merge tiny trailing chunk
    if len(chunks)>1 and len(' '.join(chunks[-1]))<14:
        last=chunks.pop(); chunks[-1]=chunks[-1]+last
    tot=sum(len(' '.join(c)) for c in chunks); t=s['start']; dur=s['end']-s['start']
    for c in chunks:
        tx=' '.join(c); d_=dur*len(tx)/tot
        lines=textwrap.wrap(tx,28) if len(tx)>28 else [tx]
        if len(lines)>2: lines=textwrap.wrap(tx,len(tx)//2+4)
        subs.append({'start':round(t,2),'end':round(t+d_,2),'lines':lines}); t+=d_
json.dump(subs,open('src/data/subtitles.json','w'),ensure_ascii=False)
def ts(x):
    h=int(x//3600);m=int(x%3600//60);s=x%60;return f'{h:02d}:{m:02d}:{int(s):02d},{int(round((s-int(s))*1000)):03d}'
with open('out/SEBELIMBINGAN_KOTA_YANG_HILANG.srt','w') as f:
    for i,s in enumerate(subs,1): f.write(f"{i}\n{ts(s['start'])} --> {ts(s['end'])}\n"+'\n'.join(s['lines'])+'\n\n')
print(len(subs))

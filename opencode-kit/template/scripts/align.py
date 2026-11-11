import numpy as np, scipy.io.wavfile as w, re, json
sr,x=w.read('public/audio/narration/voiceover-final.wav'); x=x.astype(float)/32768
hop=int(sr*0.01); n=len(x)//hop
env=20*np.log10(np.sqrt((x[:n*hop].reshape(n,hop)**2).mean(1))+1e-9)
sp=env>-42
# fill short gaps <0.14s, drop blips <0.08s
iv=[];s=None
for i,v in enumerate(sp):
    if v and s is None:s=i
    if not v and s is not None:iv.append([s,i]);s=None
if s is not None: iv.append([s,n])
m=[iv[0]]
for a in iv[1:]:
    if a[0]-m[-1][1]<14:m[-1][1]=a[1]
    else:m.append(a)
iv=[(a/100,b/100) for a,b in m if b-a>=8]
text=open('docs/narration-final.txt').read()
lines=[l.strip() for l in text.split('\n') if l.strip()]
# phrases: split at sentence enders and ellipsis; keep punctuation
phr=[]
for l in lines:
    for p in re.findall(r'[^.?!…]+(?:\.\.\.|[.?!])?\s*',l):
        p=p.strip()
        if p: phr.append(p)
# words
words=[];
for pi,p in enumerate(phr):
    for wd in p.split(): words.append((wd,pi))
def wl(wd): return len(re.sub(r'\W','',wd))+2
tot=sum(wl(a) for a,_ in words)
speech=sum(b-a for a,b in iv)
cum=[0];
for a,b in iv:cum.append(cum[-1]+b-a)
def real(t):
    for k,(a,b) in enumerate(iv):
        if t<=cum[k+1]: return a+(t-cum[k])
    return iv[-1][1]
out=[];c=0
for wd,pi in words:
    l=wl(wd);s0=real(c/tot*speech);e0=real(min((c+l)/tot*speech,speech));c+=l
    out.append({'w':wd,'p':pi,'s':round(s0,3),'e':round(e0,3)})
json.dump({'intervals':iv,'phrases':phr,'words':out,'duration':len(x)/sr},open('docs/alignment.json','w'),ensure_ascii=False)
print(len(iv),'intervals',len(phr),'phrases',round(speech,1),'speech s')
for pi,p in enumerate(phr):
    ws=[o for o in out if o['p']==pi]; print(pi,round(ws[0]['s'],2),round(ws[-1]['e'],2),p[:60])
print([ (round(a,1),round(b,1)) for a,b in iv])

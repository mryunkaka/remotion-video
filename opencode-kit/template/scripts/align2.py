import json,re,numpy as np
d=json.load(open('docs/alignment.json'));iv=d['intervals'];phr=d['phrases']
def wl(wd): return len(re.sub(r'\W','',wd))+2
pl=[sum(wl(w) for w in p.split()) for p in phr]
rate=sum(b-a for a,b in iv)/sum(pl)
P,I=len(phr),len(iv);INF=1e18
dur=lambda i,j:sum(b-a for a,b in iv[i:j])
exp=[l*rate for l in pl]
D=np.full((P+1,I+1),INF);B={}
D[0][0]=0
for p in range(1,P+1):
    for j in range(p,I+1):
        for i in range(max(p-1,j-4),j):
            if D[p-1][i]<INF:
                c=D[p-1][i]+((dur(i,j)-exp[p-1])/max(exp[p-1],.5))**2
                if c<D[p][j]:D[p][j]=c;B[(p,j)]=i
j=I;asg=[]
for p in range(P,0,-1):
    i=B[(p,j)];asg.append((i,j));j=i
asg=asg[::-1]
words=[]
for pi,(i,j) in enumerate(asg):
    segs=iv[i:j];tot=sum(b-a for a,b in segs);ws=phr[pi].split();L=sum(wl(w) for w in ws);c=0
    cum=[0]
    for a,b in segs:cum.append(cum[-1]+b-a)
    def real(t):
        for k,(a,b) in enumerate(segs):
            if t<=cum[k+1]+1e-9:return a+(t-cum[k])
        return segs[-1][1]
    for w in ws:
        l=wl(w);words.append({'w':w,'p':pi,'s':round(real(c/L*tot),3),'e':round(real((c+l)/L*tot),3)});c+=l
d['words']=words;d['assign']=asg
json.dump(d,open('docs/alignment.json','w'),ensure_ascii=False)
for pi,(i,j) in enumerate(asg):print(pi,round(iv[i][0],2),round(iv[j-1][1],2),phr[pi][:50])

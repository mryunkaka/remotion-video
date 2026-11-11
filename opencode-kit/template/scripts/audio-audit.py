import numpy as np, scipy.io.wavfile as w, json, sys
sr,x=w.read(sys.argv[1]); x=x.astype(np.float64)/32768
if x.ndim>1:x=x.mean(1)
peak=np.abs(x).max(); print("sr",sr,"dur",len(x)/sr,"peak dBFS",20*np.log10(peak),"clip samples",int((np.abs(x)>=0.999).sum()))
hop=int(sr*0.01); n=len(x)//hop
rms=np.sqrt((x[:n*hop].reshape(n,hop)**2).mean(1))+1e-9
db=20*np.log10(rms); thr=-42
sp=db>thr
# segments with min silence 0.22s
segs=[];i=0
while i<n:
    if sp[i]:
        j=i
        while j<n and sp[j]: j+=1
        segs.append([i,j]); i=j
    else:i+=1
merged=[]
for s in segs:
    if merged and (s[0]-merged[-1][1])*0.01<0.22: merged[-1][1]=s[1]
    else: merged.append(s)
out=[(a*0.01,b*0.01) for a,b in merged if (b-a)*0.01>0.15]
print(len(out),"speech segments; noise floor dB",np.percentile(db,5))
for k,(a,b) in enumerate(out): print(k,round(a,2),round(b,2),round(b-a,2))
json.dump(out,open("docs/segments-raw.json","w"))

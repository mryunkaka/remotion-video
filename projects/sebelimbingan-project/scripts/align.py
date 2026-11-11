import re, json, itertools
# speech segments from silencedetect (-38dB, d>=0.3s) on the actual voiceover
seg = [(0.00,0.96),(1.69,3.92),(4.24,7.27),(7.76,12.25),(13.01,14.90),(15.53,19.64),(20.90,22.48),(22.85,28.33),(29.03,32.21),(33.06,36.78),(37.25,39.37),(39.76,43.54),(44.35,45.40),(46.13,49.44),(49.83,54.39),(55.06,57.61),(58.11,62.93),(63.69,69.48),(70.29,76.61),(77.27,79.82),(80.59,82.18),(82.50,88.24),(89.00,91.71),(92.44,101.26),(101.84,106.09),(106.72,109.32),(109.99,114.41),(114.71,117.53),(118.12,122.17),(122.77,123.78),(124.12,125.50),(126.22,134.76),(135.37,140.28),(140.96,144.0)]
text = open('docs/narration-final.txt').read()
# clauses: split after sentence/clause punctuation
parts = re.findall(r'[^,.;]+[,.;]*(?:\.\.)?', text.replace('\n',' '))
clauses=[p.strip() for p in re.split(r'(?<=[,.])\s+', text.replace('\n',' ')) if p.strip()]
n=len(clauses); m=len(seg)
print('clauses',n,'segments',m)
L=[len(c) for c in clauses]
D=[b-a for a,b in seg]
rate=sum(L)/sum(D)
import functools
@functools.lru_cache(None)
def f(i,j):  # place clauses[i:] into segments[j:]
    if j==m: return (0,()) if i==n else (1e18,())
    if i>=n: return (1e18,())
    best=(1e18,())
    acc=0
    for k in range(i+1, n-(m-j-1)+1):
        acc=sum(L[i:k])
        cost=(acc/rate-D[j])**2
        c,s=f(k,j+1)
        if cost+c<best[0]: best=(cost+c,(k,)+s)
    return best
cost,cuts=f(0,0)
out=[];i=0
for j,k in enumerate(cuts):
    out.append({'start':seg[j][0],'end':seg[j][1],'text':' '.join(clauses[i:k])}); i=k
out[-1]['end']=144.0
json.dump({'method':'segment-level: silence-anchored (ffmpeg silencedetect -38dB/0.3s) + length-proportional clause assignment; NOT ASR / NOT word-level','segments':out},open('docs/alignment.json','w'),ensure_ascii=False,indent=1)
for o in out: print(f"{o['start']:7.2f}-{o['end']:7.2f} {o['text']}")

import math, random, struct, wave
from pathlib import Path

root=Path(__file__).resolve().parents[1]
rate=24000; duration=149.171; count=round(rate*duration); random.seed(42)
music=root/'assets/audio/music'; sfx=root/'assets/audio/sfx'
music.mkdir(parents=True,exist_ok=True); sfx.mkdir(parents=True,exist_ok=True)

def write(path, samples):
    with wave.open(str(path),'wb') as f:
        f.setnchannels(2); f.setsampwidth(2); f.setframerate(rate)
        data=bytearray()
        for x in samples:
            v=max(-.88,min(.88,x)); q=int(v*32767); data.extend(struct.pack('<hh',q,q))
        f.writeframes(data)

def bgm():
    out=[]
    for n in range(count):
        t=n/rate
        env=min(1,t/3,(duration-t)/3)
        fade=1 if t<146 else max(0,(duration-t)/(duration-146))
        # Arc follows transcript beats; slow harmonics shift from mystery to warmth.
        arc=min(1,t/104); level=(.12-.035*arc) if 53<t<76 else (.105 if t<108 else .065)
        if 108<t<121: level=.043
        if 121<t<146: level=.075
        duck=.56 if any(a<=t<=b for a,b in [(0,53),(53,75),(76,120),(120,149)]) else .7
        f0=46+8*arc
        v=(math.sin(2*math.pi*f0*t)*.36+math.sin(2*math.pi*(f0*1.504)*t)*.20+math.sin(2*math.pi*(f0*2.01)*t)*.11+math.sin(2*math.pi*(f0*3.01)*t)*.05)
        v+=math.sin(2*math.pi*(220+33*arc)*t+math.sin(t*.12))*0.035
        out.append(v*level*duck*env*fade)
    write(music/'bgm.wav',out)

def fx():
    out=[0.0]*count
    for at,kind in [(53.2,'swell'),(64.2,'hit'),(70.5,'hit'),(79.0,'water'),(99.8,'rise'),(104.8,'hit')]:
        start=round(at*rate); length=round(rate*(2.8 if kind in ('swell','rise') else 1.5))
        phase=random.random()*6.28
        for j in range(min(length,count-start)):
            t=j/rate; d=j/length
            noise=(random.random()*2-1)
            tone=math.sin(2*math.pi*(39 if kind!='water' else 115)*t+phase)
            env=math.sin(math.pi*d)**2
            out[start+j]+=(noise*.16+tone*.35)*env*(.2 if kind=='water' else .24)
    write(sfx/'sfx.wav',out)

bgm(); fx()
print('Generated original stereo 24 kHz BGM/SFX stems, deterministic seed 42.')

import numpy as np, json, subprocess, os, sys
sys.path.insert(0,"scripts")
from importlib import import_module
mk=import_module("make-audio".replace("-","_")) if False else None
import scipy.io.wavfile as wf
from scipy.signal import resample_poly
from scipy.ndimage import gaussian_filter1d
SR=48000; DUR=151.0; N=int(SR*DUR)
AN=json.load(open("src/data/anchors.json"))
def load(p):
    sr,x=wf.read(p); x=x.astype(np.float32)/32768
    if x.ndim==1: x=np.stack([x,x]) 
    else: x=x.T
    assert sr==SR,(p,sr); return x
def norm_rms(x,db=-20):
    m=np.abs(x).max(); mask=np.abs(x).max(0)>0.002*m
    r=np.sqrt((x[:,mask]**2).mean()); return x*(10**(db/20)/r)
def pts(points):
    t=np.array([p[0] for p in points]);g=np.array([p[1] for p in points])
    return (10**(np.interp(np.arange(N)/SR,t,g)/20)).astype(np.float32)
def place(buf,snd,t0,g=1.0):
    i=int(t0*SR)
    if i>=N or i<0: return
    e=min(N,i+snd.shape[1]); buf[:,i:e]+=g*snd[:,:e-i]
# ---- voice ----
sr,v=wf.read("public/audio/narration/voiceover-final.wav"); v=v.astype(np.float32)/32768
v=resample_poly(v,SR//sr,1).astype(np.float32); voice=np.zeros((2,N),np.float32); voice[:,:len(v)]=v[:N]*10**(-3/20)
# speech activity -> ducking envelope
segs=json.load(open("docs/segments-raw.json")); mask=np.zeros(N,np.float32)
for a,b in segs: mask[int((a-0.12)*SR):int((b+0.1)*SR)]=1
duck=np.clip(gaussian_filter1d(mask,0.16*SR),0,1)          # 1 while narrator speaks
# ---- music ----
LIFT=7.0   # dB raise of music in narrator pauses
def music(name,base_points):
    x=norm_rms(load(f"public/audio/music/{name}.wav"))
    g=pts(base_points)*10**(LIFT/20*(1-duck))  # lift in gaps
    return x*g
H=AN['muncullah']
mus=np.zeros((2,N),np.float32)
mus+=music("mystery-ambient",[(0,-8),(14,-14),(50,-14),(86,-14),(98,-14),(103,-10),(108,-14)])
mus+=music("suspense-tension",[(0,-13),(64,-13),(66,-9),(71,-9),(72,-13),(151,-13)])
mus+=music("epic-orchestral",[(0,-12),(AN['memanggil'],-13),(H-0.3,-9),(H+0.5,-7),(108,-8),(112,-13),(151,-13)])
mus+=music("emotional-piano",[(0,-13),(120,-13),(143,-12),(151,-12)])
# ---- sfx ambience (target RMS dBFS) ----
def amb(name,points):
    x=norm_rms(load(f"public/audio/sfx/{name}.wav"))
    return x*pts([(t,d+20) for t,d in points])
sfx=np.zeros((2,N),np.float32)
sfx+=amb("ocean-waves",[(0,-40),(1.5,-31),(14,-29),(22,-30),(31,-31),(36,-33),(45,-36),(52,-38),(56,-47),(63,-50),(64.3,-34),(70.2,-26),(71.5,-27),(75,-36),(78,-38),(82,-41),(95,-46),(101.5,-44),(H,-27),(108,-30),(110,-35),(116,-35),(129,-36),(137,-40),(143,-42),(149,-45),(151,-60)])
sfx+=amb("sea-wind",[(0,-60),(2,-37),(14,-36),(21,-33),(31,-60),(33,-38),(45,-36),(52,-45),(56,-80),(116,-80),(118,-44),(129,-46),(134,-80)])
# ---- sfx events (peak dBFS) ----
cues=[]
def ev(name,t,peak,dur=None,fi=0.02,fo=0.4,off=0.0,duckamt=3):
    x=load(f"public/audio/sfx/{name}.wav"); x=x/np.abs(x).max()*10**(peak/20)
    x=x[:,int(off*SR):]
    if dur: x=x[:,:int(dur*SR)]
    n=x.shape[1]; g=np.ones(n,np.float32); a=int(fi*SR); b=int(fo*SR)
    if a: g[:min(a,n)]=np.linspace(0,1,min(a,n))
    if b: g[-b:]*=np.linspace(1,0,min(b,n))[-len(g[-b:]):]
    x=x*g; place(sfx,x,max(0,t))
    cues.append(dict(file=name,t=round(t,3),peak=peak,dur=round(n/SR,2)))
ev("water-impact",0.35,-22)
ev("suspense-riser",AN['janji']-2.2,-27,fi=0.01,fo=0.1)
ev("underwater-rumble",AN['penguasa']-1.4,-27,dur=7,fi=1.5,fo=2.5)
ev("underwater-rumble",AN['namun']-1.0,-30,dur=18,fi=3.5,fo=3)
ev("suspense-riser",AN['tibatiba']-7.0,-25,fi=0.01,fo=0.05)
ev("underwater-bubbles",AN['tibatiba']-0.3,-23,dur=10,fi=0.05,fo=2)
ev("water-impact",AN['tibatiba']-0.05,-10)
ev("giant-splash",AN['tibatiba']+0.45,-17)
ev("underwater-bubbles",AN['menyerang']-1.3,-26,dur=5,fi=0.5,fo=1.5,off=3)
ev("water-impact",AN['pecah']-0.15,-9)
ev("giant-splash",AN['seranganA']-0.05,-15,dur=3.5)
ev("giant-splash",AN['seranganB']-0.05,-14,dur=3.5)
for t in (68.0,69.2): ev("water-impact",t,-17,dur=1.8)
ev("giant-splash",AN['dikalahkan']-0.1,-10,fo=1.5)
ev("underwater-bubbles",AN['mengobati']-0.2,-33,dur=4,fi=0.3,fo=1.2)
ev("underwater-bubbles",AN['melepaskan']-0.2,-32,dur=4,fi=0.3,fo=1.5,off=5)
ev("underwater-rumble",AN['raja']-0.3,-35,dur=7,fi=1.5,fo=2)
ev("magical-resonance",AN['hadiah']-0.9,-22)
ev("underwater-rumble",AN['tahukah']-0.4,-32,dur=4,fi=1,fo=1.5,off=6)
ev("magical-resonance",AN['sebuahpulau']-0.15,-20,off=0.0)
ev("underwater-bubbles",AN['memanggil']-1.8,-23,dur=9,fi=1,fo=1.5,off=1)
ev("underwater-rumble",AN['memanggil']-1.8,-26,dur=10,fi=5,fo=0.3)
ev("suspense-riser",H-7.0,-23,fi=0.01,fo=0.05)
ev("water-impact",H-0.1,-8)
ev("giant-splash",H+0.05,-9,fo=1.5)
ev("underwater-rumble",H-0.4,-20,dur=9,fi=0.1,fo=3.5)
ev("magical-resonance",H+1.0,-24)
ev("soft-transition",AN['jangan']-0.9,-27)
ev("soft-transition",AN['karena']-1.4,-27)
ev("soft-transition",AN['mengungkap']-0.9,-28)
sfx_ev_mask=1-0.3*duck  # -3dB under speech approx (applied to all sfx stems)
sfx*=sfx_ev_mask
# ---- master ----
bus=voice+mus+sfx
os.makedirs("public/audio/mix",exist_ok=True)
import tempfile; tmp=os.path.join(tempfile.gettempdir(),"premix.wav")
wf.write(tmp,SR,(np.clip(bus,-1,1).T*32767).astype(np.int16))
out="public/audio/mix/final-mix.wav"
subprocess.run(["ffmpeg","-y","-v","error","-i",tmp,"-af","loudnorm=I=-16:TP=-1.5:LRA=11:print_format=none,alimiter=limit=0.84:level=disabled,afade=t=in:d=0.4,afade=t=out:st=148.8:d=2.2","-ar","48000",out],check=True)
json.dump(cues,open("src/data/audio-cues.json","w"),indent=1)
print("done")

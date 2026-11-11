import numpy as np, json, wave
from scipy.signal import butter, sosfilt, lfilter
SR=48000; DUR=146.7; N=int(SR*DUR)
rng=np.random.default_rng(7)
t=np.arange(N)/SR
def bp(x,lo,hi,o=2):
    return sosfilt(butter(o,[lo,hi],btype='band',fs=SR,output='sos'),x)
def lp(x,f,o=2): return sosfilt(butter(o,f,btype='low',fs=SR,output='sos'),x)
def hp(x,f,o=2): return sosfilt(butter(o,f,btype='high',fs=SR,output='sos'),x)
def env(tt,pts):  # piecewise-linear gain from [(t,g),...]
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]; return np.interp(tt,xs,ys)
def stereo(x,pan=0.0): return np.stack([x*(1-max(pan,0)),x*(1+min(pan,0))])
def place(buf,sig,at,gain=1.0,pan=0.0):
    i=int(at*SR); j=min(buf.shape[1],i+len(sig))
    if i>=buf.shape[1]: return
    s=sig[:j-i]*gain
    buf[0,i:j]+=s*(1-max(pan,0)); buf[1,i:j]+=s*(1+min(pan,0))

# ---------- voice envelope (for ducking) ----------
w=wave.open('public/audio/narration/voiceover-final.wav'); v=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16)/32768.0
v48=np.interp(np.arange(int(len(v)*SR/24000))/SR*24000,np.arange(len(v)),v)
rms=np.sqrt(lp(v48**2,6,1)).clip(0)
venv=np.zeros(N); venv[:len(rms)]=rms[:N]
speech=np.clip(venv/0.05,0,1)
# smooth attack/release
def smooth(x,att,rel):
    a=np.exp(-1/(att*SR)); r=np.exp(-1/(rel*SR)); y=np.zeros_like(x); c=0
    # vectorised via block loop (fast enough at 1ms hop)
    hop=48; xs=x[::hop]; ys=np.zeros_like(xs); c=0
    ah=np.exp(-hop/(att*SR)); rh=np.exp(-hop/(rel*SR))
    for k,s in enumerate(xs):
        c = s+(c-s)*(ah if s>c else rh); ys[k]=c
    return np.interp(np.arange(len(x)),np.arange(len(xs))*hop,ys)
duck=smooth(speech,0.08,0.7)

# ---------- BGM ----------
def midi(m): return 440*2**((m-69)/12)
def pad(freqs,start,end,gain,att=3,rel=3):
    out=np.zeros(N); 
    tt=t[int(start*SR):int(end*SR)]
    sig=np.zeros(len(tt))
    for f in freqs:
        for det in (-0.12,0.0,0.15):
            ff=f*(1+det/100*3)
            sig+=np.sin(2*np.pi*ff*tt+rng.uniform(0,6.28))+0.35*np.sin(4*np.pi*ff*tt)+0.12*np.sin(6*np.pi*ff*tt)
    e=np.minimum(1,(tt-start)/att)*np.minimum(1,(end-tt)/rel)
    sig=lp(sig,1800)*e*gain/ (len(freqs)*3)
    out[int(start*SR):int(start*SR)+len(sig)]=sig
    return out
# progression (D minor / Bb / F / C...) slow, ~16s per chord
chords=[[50,57,62,65],[46,53,58,62],[53,60,65,69],[48,55,60,64],[50,57,62,65],[43,50,55,58],[46,53,58,62],[45,52,57,61],[50,57,62,65]]
bgm=np.zeros(N)
ci=0; tcur=0
while tcur<DUR-4:
    ch=chords[ci%len(chords)]; L=16.0
    bgm+=pad([midi(m) for m in ch],tcur,min(DUR,tcur+L+4),1.0,att=4,rel=4)
    ci+=1; tcur+=L
# drone
drone=(np.sin(2*np.pi*midi(38)*t)+0.5*np.sin(2*np.pi*midi(38)*2*t+1)+0.2*np.sin(2*np.pi*midi(38)*3*t))
drone=lp(drone,400)*(0.55+0.25*np.sin(2*np.pi*t/23))
bgm=bgm*0.9+drone*0.35
# soft piano-ish plucks (arpeggio), sparse
def pluck(f,dur=2.8):
    tt=np.arange(int(dur*SR))/SR
    s=(np.sin(2*np.pi*f*tt)+0.4*np.sin(4*np.pi*f*tt)*np.exp(-tt*3)+0.15*np.sin(6*np.pi*f*tt)*np.exp(-tt*5))*np.exp(-tt*1.6)
    s*=np.minimum(1,tt/0.004); return lp(s,3500)
pl=np.zeros((2,N))
arp_notes=[[62,65,69,74],[58,62,65,70],[65,69,72,77],[60,64,67,72]]
bar=0; tt0=2.0
while tt0<DUR-6:
    notes=arp_notes[bar%4]
    for k,m in enumerate(notes):
        place(pl,pluck(midi(m)),tt0+k*0.9,0.5,pan=(-0.3+0.2*k))
    bar+=1; tt0+=8.0
# soft percussion: low frame-drum pulse in industrial part, and soft shaker
perc=np.zeros((2,N))
def thump(f=60,dur=0.7):
    tt=np.arange(int(dur*SR))/SR; return np.sin(2*np.pi*(f+40*np.exp(-tt*25))*tt)*np.exp(-tt*7)
for a,b,step,g in [(29,44,1.5,0.5),(44,56,2.0,0.35),(100,118,2.0,0.4)]:
    x=a
    while x<b:
        place(perc,thump(),x,g*np.sin(np.pi*(x-a)/(b-a))**0.5); x+=step
# music dynamics (before ducking): reflective low at 76-89, up at 101-118, warm end
mdyn=env(t,[(0,0.55),(8,0.8),(20,0.85),(44,0.55),(46,0.8),(63,0.8),(70,0.65),(89,0.6),(101,0.65),(118,0.7),(122,0.5),(138,0.7),(DUR-3,0.9),(DUR,0)])
musicL=(bgm+pl[0]+perc[0]); musicR=(bgm+pl[1]+perc[1])
music=np.stack([musicL,musicR])
music_gain_duck = 1 - 0.90*duck   # ~14 dB down while voice
# extra duck on numbers/CTA
music_gain_duck *= env(t,[(0,1),(44,1),(44.4,0.65),(55,0.65),(55.5,1),(122,1),(122.5,0.7),(141,0.7),(141.5,1),(DUR,1)])
music=music*mdyn*music_gain_duck

# ---------- AMBIENCE ----------
wind=lp(bp(rng.standard_normal(N),150,900),700)*(0.5+0.5*np.sin(2*np.pi*t/9+1)**2)
leaves=hp(rng.standard_normal(N),3500)*(0.3+0.7*np.abs(np.sin(2*np.pi*t/5.3)))*0.15
# insects: modulated high tone
ins=np.zeros(N)
for f0,rate in [(4300,38),(5200,27),(3600,45)]:
    car=np.sin(2*np.pi*f0*t+4*np.sin(2*np.pi*3*t)); am=(np.sin(2*np.pi*rate*t)>0.2)*(0.5+0.5*np.sin(2*np.pi*t/(7+f0/1000)))
    ins+=car*am*0.035
present=wind*0.5+leaves+ins
present_g=env(t,[(0,0),(0.3,0.9),(13,0.8),(20,0.2),(88,0.15),(89,0.9),(100,0.9),(118,0.7),(140,0.8),(DUR-2,0.3),(DUR,0)])
amb=np.stack([present*present_g,np.roll(present,3000)*present_g])
# industrial bed: machinery rumble + clinks + steps
mach=lp(rng.standard_normal(N),180)*(0.6+0.4*np.sin(2*np.pi*t*1.7))
mach_g=env(t,[(14,0),(24,0.35),(30,0.5),(44,0.4),(56,0.25),(63,0.2),(76,0.05),(80,0),(103,0.12),(116,0.0)])
amb+=stereo(mach*mach_g*0.45)
# steam train chuff 30-44
def chuff():
    n=int(0.28*SR); x=hp(rng.standard_normal(n),600)*np.exp(-np.arange(n)/SR*14); return x
tr=np.zeros((2,N))
x=30.0; cyc=0
while x<46.5:
    p=min(1,(x-30)/5)*np.minimum(1,(46.5-x)/3)
    place(tr,chuff(),x,0.35*p,0.2); place(tr,chuff(),x+0.17,0.2*p,0.2)
    x+=0.42 if x<38 else 0.34
# rail clack
def clack():
    n=int(0.08*SR); tt=np.arange(n)/SR; return bp(rng.standard_normal(n),900,3000)*np.exp(-tt*60)
x=34.0
while x<46:
    place(tr,clack(),x,0.12,-0.2); x+=0.21
# whistle (distant)
def whistle(dur=1.6):
    tt=np.arange(int(dur*SR))/SR; f=520+30*np.sin(2*np.pi*5*tt); s=np.sin(2*np.pi*np.cumsum(f)/SR)+0.5*np.sin(4*np.pi*np.cumsum(f)/SR)
    return lp(s,2500)*np.minimum(1,tt/0.1)*np.exp(-tt*1.4)
place(tr,whistle(),38.0,0.10,0.3)
# metal clinks / hammering scattered 24-44
def clink(f):
    n=int(0.5*SR); tt=np.arange(n)/SR; return (np.sin(2*np.pi*f*tt)+0.5*np.sin(2*np.pi*f*2.76*tt))*np.exp(-tt*18)
for xx in np.arange(24.5,43,rng.uniform(1.1,1.9)): pass
x=24.5
while x<43: place(tr,clink(rng.choice([1320,1760,2090,980])),x,0.05,rng.uniform(-.6,.6)); x+=rng.uniform(0.8,1.9)
# footsteps (gravel)
def step():
    n=int(0.12*SR); return lp(rng.standard_normal(n),1800)*np.exp(-np.arange(n)/SR*35)
x=31.0
while x<43: place(tr,step(),x,0.05,rng.uniform(-.5,.5)); x+=rng.uniform(0.5,0.7)
# port: water + ropes + ship engine 55-63 and light 63-70
water=lp(rng.standard_normal(N),900)*(0.5+0.5*np.sin(2*np.pi*t/4.2))**1.5
water_g=env(t,[(54,0),(56,0.5),(62,0.5),(66,0.1),(67,0)])
hull=lp(rng.standard_normal(N),120)*(0.5+0.5*np.sin(2*np.pi*t*3.2))
amb+=stereo(water*water_g*0.25)+stereo(hull*water_g*0.3,0.2)
x=57.0
while x<63: place(tr,clink(rng.choice([420,560])),x,0.04,0.5); x+=rng.uniform(1.2,2.2)
amb+=tr
# ---------- SFX ----------
sfx=np.zeros((2,N))
def whoosh(dur=1.2,f0=300,f1=3000):
    n=int(dur*SR); tt=np.arange(n)/SR; x=rng.standard_normal(n)
    f=np.geomspace(f0,f1,n); # time-varying bandpass approx via modulated filtered noise blocks
    out=np.zeros(n); blk=2048
    for i in range(0,n-blk,blk):
        fc=f[i]; out[i:i+blk]=bp(x[i:i+blk],max(60,fc*0.6),min(SR/2-100,fc*1.4),2)
    e=np.sin(np.pi*tt/dur)**2; return out*e*4
def impact(dur=1.8):
    tt=np.arange(int(dur*SR))/SR
    s=np.sin(2*np.pi*(48+60*np.exp(-tt*18))*tt)*np.exp(-tt*3.0)+0.3*lp(rng.standard_normal(len(tt)),400)*np.exp(-tt*8)
    return s*np.minimum(1,tt/0.003)
def riser(dur=3.0):
    n=int(dur*SR); tt=np.arange(n)/SR; x=hp(rng.standard_normal(n),800)*(tt/dur)**2
    return lp(x,6000)*0.6
# transitions in gaps (not over speech): gaps at 3.9-4.2? use gap centers
for at,g in [(7.0,0.35),(20.0,0.4),(43.7,0.3),(63.2,0.3),(88.5,0.3),(117.8,0.35),(123.0,0.2)]:
    place(sfx,whoosh(1.0),at,g)
place(sfx,impact(),20.80,0.55)        # 1903 (before voice 'Tahun 1903' = 20.90)
place(sfx,impact(1.2),49.6,0.22)      # 1.500 appears
place(sfx,impact(1.2),53.9,0.30)      # 2.300 appears
place(sfx,impact(),80.2,0.0)
place(sfx,riser(2.5),18.0,0.18)
place(sfx,riser(1.5),61.5,0.12)
# soft impact accents for facility list
for at in [62.6,64.2,66.0,68.0,70.0]: place(sfx,pluck(midi(81),1.5),at,0.12,0.4)
# CTA pops (soft ticks) at LIKE / KOMENTAR / REPOST / FOLLOW  (approx; also quiet)
def tick():
    n=int(0.15*SR); tt=np.arange(n)/SR; return np.sin(2*np.pi*1500*tt)*np.exp(-tt*35)
for at in [128.3,130.5,131.8,132.6,135.6]: place(sfx,tick(),at,0.10)
# ---------- master stems ----------
def norm_peak(x,p): m=np.abs(x).max(); return x*(p/m) if m>0 else x
bg=music+amb*env(t,[(0,1),(DUR,1)])*(1-0.75*duck)+sfx*(1-0.6*duck)
out_stem=bg
# write wav 48k stereo float -> int16
def wr(path,x):
    x=np.clip(x,-1,1); i=(x.T*32767).astype(np.int16)
    with wave.open(path,'wb') as f: f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes(i.tobytes())
wr("/tmp/bg_raw.wav",out_stem*0.55)
v_st=np.zeros((2,N)); v_st[0,:len(v48)]=v48[:N]; v_st[1,:len(v48)]=v48[:N]
wr('/tmp/voice48.wav',v_st)
print('done')

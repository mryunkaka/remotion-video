"""Original procedural BGM + SFX for Misteri Pulau Halimun (no external samples, no licensing issues)."""
import numpy as np, json, os, sys
from scipy.signal import butter, sosfilt, fftconvolve, resample_poly
from scipy.ndimage import gaussian_filter1d
import scipy.io.wavfile as wf
SR=48000; DUR=151.0; N=int(SR*DUR)
rng=np.random.default_rng(11)
AN=json.load(open("src/data/anchors.json"))
M="public/audio/music/"; S="public/audio/sfx/"
def noise(n): return rng.standard_normal(n).astype(np.float32)
def _f(x,kind,f,order=2):
    sos=butter(order,f,btype=kind,fs=SR,output='sos'); return sosfilt(sos,x).astype(np.float32)
def bp(x,lo,hi,o=2): return _f(x,'band',[lo,hi],o)
def lp(x,f,o=2): return _f(x,'low',f,o)
def hp(x,f,o=2): return _f(x,'high',f,o)
def slow(n,rate_hz,sigma=1.0,seed=None):
    m=int(n/SR*rate_hz)+3; r=rng.standard_normal(m); r=gaussian_filter1d(r,sigma); r=(r-r.min())/(r.max()-r.min()+1e-9)
    return np.interp(np.arange(n)/SR*rate_hz,np.arange(m),r).astype(np.float32)
def autom(points,n=N):
    t=np.array([p[0] for p in points]);g=np.array([p[1] for p in points])
    return (10**(np.interp(np.arange(n)/SR,t,g)/20)).astype(np.float32)
def lin(points,n=N):
    t=np.array([p[0] for p in points]);g=np.array([p[1] for p in points])
    return np.interp(np.arange(n)/SR,t,g).astype(np.float32)
def st(l,r=None): return np.stack([l,l if r is None else r])
def place(buf,snd,t0,g=1.0):
    i=int(t0*SR); 
    if i>=buf.shape[1]: return
    s=snd if snd.ndim==2 else st(snd)
    e=min(buf.shape[1],i+s.shape[1]); 
    if e>i: buf[:,i:e]+=g*s[:,:e-i]
def reverb(x,sec=2.4,wet=0.35,seed=5):
    r=np.random.default_rng(seed); n=int(SR*sec); t=np.arange(n)/SR
    out=np.zeros_like(x)
    for c in range(2):
        ir=r.standard_normal(n)*np.exp(-t*6.5/sec); ir=lp(ir.astype(np.float32),5000)*(1-np.exp(-t*60))
        ir/=np.sqrt((ir**2).sum())+1e-9
        y=fftconvolve(x[c],ir)[:x.shape[1]]; out[c]=y
    return ((1-wet)*x+wet*out*1.8).astype(np.float32)
def fade(x,fi=0.02,fo=0.05):
    n=x.shape[-1]; g=np.ones(n,np.float32); a=int(fi*SR); b=int(fo*SR)
    if a: g[:a]=np.linspace(0,1,a)
    if b: g[-b:]=np.linspace(1,0,b)
    return x*g
def norm_rms(x,db=-20):
    m=np.abs(x).max(); mask=np.abs(x).max(0)>0.002*m
    r=np.sqrt((x[:,mask]**2).mean()); return x*(10**(db/20)/r)
def save(path,x,peak=0.95):
    x=x/ max(1e-9,np.abs(x).max())*peak
    wf.write(path,SR,(x.T*32767).astype(np.int16))
def midi(m): return 440*2**((m-69)/12)
def tone(f,dur,harm=(1,),amps=(1,),vib=0.0,att=0.01,rel=0.1,t0ph=None):
    n=int(SR*dur);t=np.arange(n)/SR;y=np.zeros(n,np.float32)
    ph=2*np.pi*f*t+ (vib*np.sin(2*np.pi*5.2*t)*0.01*f*0 if False else 0)
    for h,a in zip(harm,amps):
        y+=a*np.sin(h*2*np.pi*f*t*(1+vib*np.sin(2*np.pi*5.1*t)*0.004)+rng.uniform(0,6.28))
    g=np.minimum(1,t/max(att,1e-4))*np.minimum(1,(dur-t)/max(rel,1e-4)); return y*g
def piano(f,dur,vel=1.0):
    n=int(SR*dur);t=np.arange(n)/SR;y=np.zeros(n,np.float32)
    tau=2.4*(261/f)**0.35
    for k,a in enumerate([1,.5,.33,.2,.13,.08,.05],1):
        y+=a*np.sin(2*np.pi*f*k*(1+0.0004*k*k)*t+rng.uniform(0,6.28))*np.exp(-t/(tau/(1+0.4*(k-1))))
    y*=np.minimum(1,t/0.005); h=int(.025*SR); y[:h]+=0.06*noise(h)*np.exp(-np.arange(h)/(.006*SR))
    y*=np.minimum(1,(dur-t)/0.25); return vel*y
def strings(freqs,dur,att=1.6,rel=2.2,bright=1500):
    n=int(SR*dur);t=np.arange(n)/SR;y=np.zeros(n,np.float32)
    for f in freqs:
        for det in (-0.13,0.0,0.11):
            ff=f*(1+det*0.01)
            v=1+0.003*np.sin(2*np.pi*(4.6+det*3)*t+rng.uniform(0,6))
            for k in range(1,9): y+=np.sin(2*np.pi*ff*k*t*v+rng.uniform(0,6.28))/k
    y=lp(y,bright)*np.minimum(1,t/att)*np.minimum(1,(dur-t)/rel); return y/ (len(freqs)*3)
def taiko(vel=1.0,dur=1.6):
    n=int(SR*dur);t=np.arange(n)/SR
    f=48+60*np.exp(-t*9); ph=2*np.pi*np.cumsum(f)/SR
    y=np.sin(ph)*np.exp(-t*3.2)+0.5*np.sin(2*ph)*np.exp(-t*6)
    y+=0.35*lp(noise(n),900)*np.exp(-t*14)
    return (vel*y).astype(np.float32)
def crash(dur=4.0):
    n=int(SR*dur);t=np.arange(n)/SR
    return (hp(noise(n),2500)*np.exp(-t*1.1)*np.minimum(1,t/0.01)).astype(np.float32)

# ---------------- SFX ----------------
def sfx_ocean(n=N):
    out=[]
    for c in range(2):
        sw=slow(n,0.25,2.2)**1.6; sw2=slow(n,0.6,3)
        body=bp(noise(n),180,1800)*(0.25+0.75*sw)*(0.7+0.3*sw2)
        low=lp(noise(n),160)*(0.2+0.8*sw)*1.3
        hiss=hp(noise(n),3000)*0.12*sw**2
        out.append(body+low+hiss)
    return np.stack(out)
def sfx_wind(n=N):
    out=[]
    for c in range(2):
        g=slow(n,0.18,2)**1.3
        w=bp(noise(n),220,1100)*(0.2+g)
        t=np.arange(n)/SR; fc=700+250*np.sin(2*np.pi*0.07*t+c)
        # narrow whistle via ringing resonators
        wh=bp(noise(n),620,700,3)*(g**2)*1.6
        out.append(w+wh)
    return np.stack(out)
def sfx_bubbles(dur=14):
    n=int(SR*dur); y=np.zeros((2,n),np.float32); t=0.1
    while t<dur-0.4:
        burst=rng.random()<0.35
        for _ in range(rng.integers(3,9) if burst else 1):
            f0=rng.uniform(280,950);d=rng.uniform(.05,.16);m=int(d*SR);tt=np.arange(m)/SR
            f=f0*(1+2.2*tt/d*0.4);b=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt/(d*0.35))*rng.uniform(.3,1)
            p=rng.uniform(0.2,0.8);i=int((t+rng.uniform(0,.35))*SR)
            if i+m<n: y[0,i:i+m]+=b*p;y[1,i:i+m]+=b*(1-p)
        t+=rng.exponential(0.45)
    return reverb(y,1.2,0.25)
def sfx_impact(dur=3.2):
    n=int(SR*dur);t=np.arange(n)/SR
    th=np.sin(2*np.pi*np.cumsum(55+90*np.exp(-t*12))/SR)*np.exp(-t*4)
    w=lp(noise(n),1800)*np.exp(-t*9)+0.5*bp(noise(n),300,3000)*np.exp(-t*18)
    return fade(reverb(st(th+0.8*w),1.0,0.25),0.001,0.4)
def sfx_splash(dur=6.0):
    n=int(SR*dur);t=np.arange(n)/SR
    ch=[]
    for c in range(2):
        a=bp(noise(n),300,9000)*(1-np.exp(-t*60))*np.exp(-t*1.3)
        b=hp(noise(n),4000)*np.exp(-t*3)*0.7
        low=lp(noise(n),250)*np.exp(-t*1.0)*1.6
        drops=np.zeros(n,np.float32)
        for _ in range(60):
            i=int(rng.uniform(.2,2.8)*SR);m=int(.05*SR);drops[i:i+m]+=hp(noise(m),2000)*np.exp(-np.arange(m)/(.012*SR))*rng.uniform(.1,.5)
        ch.append(a+b+low+drops)
    return fade(np.stack(ch),0.001,0.8)
def sfx_rumble(dur=24):
    n=int(SR*dur);ch=[]
    for c in range(2):
        g=slow(n,0.3,2)
        ch.append(lp(noise(n),110,3)*(0.4+g)*2+np.sin(2*np.pi*(38+3*g)*np.arange(n)/SR)*0.5*(0.3+g))
    return fade(np.stack(ch),1.5,2.5)
def sfx_magic(dur=11):
    n=int(SR*dur);t=np.arange(n)/SR;y=np.zeros((2,n),np.float32)
    base=[(293.66,1),(440,.6),(587.33,.7),(880,.4),(1174.7,.3),(1318.5,.25)]
    for k,(f,a) in enumerate(base):
        for c in range(2):
            ff=f*(1+rng.uniform(-.002,.002)); y[c]+=a*np.sin(2*np.pi*ff*t+rng.uniform(0,6))*(1-np.exp(-t*3))*np.exp(-t/(3.5-k*.3))*(0.8+0.2*np.sin(2*np.pi*(0.3+k*.11)*t))
    y+=0.25*bp(noise(n),2500,7000)[None]*np.exp(-t/2.5)[None]*np.sin(2*np.pi*3*t)[None]**2
    return fade(reverb(y,3.5,0.5),0.01,1.5)
def sfx_riser(dur=7):
    n=int(SR*dur);t=np.arange(n)/SR;p=(t/dur)**2
    nz=noise(n); ch=[]
    for c in range(2):
        fc=300*(1+p*9);  # sweep via time-varying mix of bands
        y=bp(nz if c==0 else noise(n),200,900)*(1-p)+bp(noise(n),1500,6000)*p
        tn=np.sin(2*np.pi*np.cumsum(90+330*p**1.5)/SR)*0.35
        ch.append((y*1.2+tn)*p**1.3)
    return fade(np.stack(ch),0.01,0.04)
def sfx_soft_transition(dur=4):
    n=int(SR*dur);t=np.arange(n)/SR;e=np.sin(np.pi*np.clip(t/dur,0,1))**2
    return st(bp(noise(n),700,4000)*e*0.5,bp(noise(n),700,4000)*e*0.5)

# ---------------- MUSIC ----------------
def music_mystery():
    y=np.zeros((2,N),np.float32); t=np.arange(N)/SR
    prog=[(0,[36.71,73.42,110.0,146.83]),(24,[34.65,69.3,103.83,138.59]),(40,[36.71,73.42,110.0,164.81]),(84,[36.71,73.42,110.0,146.83]),(96,[34.65,69.3,103.83,138.59])]
    def chord_at(tt):
        c=prog[0][1]
        for s,ch in prog:
            if tt>=s:c=ch
        return c
    for c in range(2):
        d=np.zeros(N,np.float32)
        for i,f in enumerate([36.71,73.42,110.0,146.83,220.0]):
            lfo=0.6+0.4*np.sin(2*np.pi*(0.04+0.017*i)*t+i+c)
            d+= (np.sin(2*np.pi*(f+0.15*c)*t)+0.4*np.sin(4*np.pi*f*t))*lfo*(1.0/(1+i*0.5))
        air=bp(noise(N),500,2200,2)*(0.25*slow(N,0.1,3))
        y[c]=lp(d,700)*1.0+air
    # distant shimmer notes
    pent=[587.33,698.46,880,1046.5,1174.7]; tt=3.0
    sh=np.zeros((2,N),np.float32)
    while tt<DUR-6:
        f=rng.choice(pent);nn=tone(f,6.0,(1,2.01,3.02),(1,.3,.1),att=0.8,rel=3)*np.exp(-np.arange(int(6*SR))/(SR*1.6))
        place(sh,st(nn*0.5,nn*0.4),tt,rng.uniform(.4,1)); tt+=rng.uniform(5,9)
    y+=reverb(sh,3.5,0.7)*0.8
    win=autom([(0,-60),(0.3,-60),(4,0),(46,0),(54,-14),(57,-60),(83,-60),(86,-3),(98,0),(103,-6),(108,-60),(151,-60)])
    return norm_rms(reverb(y*win,2.8,0.3))
def music_suspense():
    y=np.zeros((2,N),np.float32)
    # string cluster tremolo, rising semitone
    seg=lambda a,b:(int(a*SR),int(b*SR))
    a,b=47.0,73.0; n=int((b-a)*SR); t=np.arange(n)/SR
    glis=lin([(0,0),(b-a,1.2)],n)  # semitones up
    clus=np.zeros(n,np.float32)
    for f in (146.83,155.56,220.0,233.08,293.66):
        ph=2*np.pi*np.cumsum(f*2**(glis/12))/SR
        s=sum(np.sin(k*ph+rng.uniform(0,6))/k for k in (1,2,3,4))
        clus+=s*(0.6+0.4*np.sin(2*np.pi*(7+rng.uniform(-.5,.5))*t))
    clus=lp(clus,2200)
    envs=lin([(0,0),(6,.5),(7,1),(16,1),(23.5,1),(25,.3),(26,0)],n)
    sub=np.sin(2*np.pi*np.cumsum(41.2*(1+0.02*glis))/SR)*0.8
    # heartbeat pulse
    hb=np.zeros(n,np.float32); tt=0.0; bpm=lin([(0,56),(10,66),(19,84),(26,60)],n)
    while tt<(b-a):
        i=int(tt*SR); 
        for off,vel in ((0,1),(0.22,0.6)):
            j=i+int(off*SR);m=int(.4*SR)
            if j+m<n:
                tm=np.arange(m)/SR; hb[j:j+m]+=np.sin(2*np.pi*np.cumsum(70*np.exp(-tm*7)+40)/SR)*np.exp(-tm*8)*vel
        tt+=60/bpm[min(n-1,i)]
    mix=(clus*envs*0.7+sub*envs*0.7+hb*0.9*lin([(0,0),(4,0.5),(8,1),(23,1),(26,0)],n))
    y[0,int(a*SR):int(a*SR)+n]=mix; y[1,int(a*SR):int(a*SR)+n]=np.roll(mix,37)
    # battle percussion
    hits=[(AN['pecah']-0.15,1.0),(AN['pecah']+0.55,.55),(66.0,.8),(66.55,.6),(AN['seranganB']-0.05,.95),(67.5,.55),(68.0,.7),(68.45,.6),(68.95,.75),(69.45,.65),(69.95,.8),(70.3,.7),(AN['dikalahkan']-0.05,1.0)]
    for h,v in hits: place(y,st(taiko(v*0.9)),h)
    # stinger when swordfish appears
    place(y,st(taiko(1.0,2.4)),AN['tibatiba']-0.1); place(y,st(taiko(.7)),AN['raksasa']-0.2)
    # release swell
    rl=lp(noise(int(3*SR)),600)*np.sin(np.pi*np.linspace(0,1,int(3*SR)))**1.5*0.35; place(y,st(rl,rl[::-1]),AN['dikalahkan']+0.3)
    return norm_rms(reverb(y,2.2,0.28))
def music_epic():
    y=np.zeros((2,N),np.float32)
    # build 94 -> hit at muncullah
    hitT=AN['muncullah']; t0=AN['memanggil']-1.2
    # timpani roll crescendo
    tt=t0
    while tt<hitT-0.1:
        pr=(tt-t0)/(hitT-t0); place(y,st(taiko(0.2+0.65*pr,0.9)),tt); tt+=0.34-0.2*pr
    # strings crescendo (Dm -> D major at hit)
    L=hitT-t0+0.2; s1=strings([73.42,146.83,174.61,220.0,293.66],L,att=L*0.7,rel=0.1,bright=2200); place(y,st(s1*0.9),t0)
    br=strings([36.71,73.42,110.0],L,att=L*0.8,rel=0.1,bright=700); place(y,st(br*1.2),t0)
    # climax chord D major with bold harmonic stack
    cl=strings([73.42,146.83,220.0,293.66,369.99,440.0,587.33],7.0,att=0.12,rel=3.5,bright=3200)
    place(y,st(cl*1.7),hitT-0.05)
    place(y,st(taiko(1.0,2.5)*1.2),hitT-0.05); place(y,st(taiko(0.8,2.0)),hitT+0.5)
    place(y,st(crash(4.5)*0.55),hitT-0.02)
    # sustained heroic motif after hit: bass + horns-ish
    for k,(dt,m) in enumerate([(0,62),(1.6,66),(3.2,69),(4.8,74)]):
        f=midi(m); n=tone(f,2.0,(1,2,3,4,5),(1,.7,.5,.35,.2),vib=1,att=0.2,rel=0.9); n=lp(n,2600)
        place(y,st(n*0.5),hitT+0.4+dt)
    win=autom([(0,-80),(t0-1,-80),(t0+2,0),(108,0),(113,-30),(116,-80),(151,-80)])
    return norm_rms(reverb(y*win,3.0,0.32))
def music_piano():
    y=np.zeros((2,N),np.float32)
    def play(chords,t0,t1,step,dir_=0):
        t=t0;k=0
        while t<t1-1:
            ch=chords[k%len(chords)];root,third,fifth=ch
            notes=[root,fifth,root+12,third+12,root+12,fifth]
            for i,m in enumerate(notes):
                tn=t+i*step
                if tn<t1: 
                    v=0.55+0.35*(1 if i in(0,3) else 0.0)
                    place(y,st(piano(midi(m),3.2,v*0.9),piano(midi(m),3.2,v*0.8)),tn)
            # string pad
            pad=strings([midi(root-12),midi(root),midi(third),midi(fifth)],4.8,att=1.4,rel=1.8,bright=1400)
            place(y,st(pad*0.75),t)
            t+=step*6;k+=1
    # healing: D minor family (Dm Bb Gm A)   
    minor=[(50,53,57),(46,50,53),(43,46,50),(45,49,52)]
    play(minor,AN['tetapi']+0.0,AN['hadiah']+0.5,0.62)
    major=[(50,54,57),(45,49,52),(47,50,54),(43,47,50),(50,54,57),(45,49,52),(43,47,50),(45,49,52)]
    play(major,AN['saijaan']-3.0,AN['karena']+0.2,0.66)
    # final resolution chord
    fin=strings([midi(38),midi(50),midi(57),midi(62),midi(66),midi(69)],8.0,att=1.2,rel=4.2,bright=1800)
    place(y,st(fin*1.2),AN['karena']-0.3)
    for k,m in enumerate([62,66,69,74]): place(y,st(piano(midi(m),5.0,0.8)),AN['terang']-0.1+k*0.35)
    win=autom([(0,-90),(70.5,-90),(74,0),(87,0),(89.2,-24),(90,-90),(107,-90),(110.5,-3),(113,0),(143,0),(150,-6),(151,-20)])
    return norm_rms(reverb(y*win,2.6,0.33))

if __name__=="__main__":
    os.makedirs(M,exist_ok=True);os.makedirs(S,exist_ok=True)
    for name,fn in [("ocean-waves",sfx_ocean),("sea-wind",sfx_wind),("underwater-bubbles",sfx_bubbles),("water-impact",sfx_impact),("giant-splash",sfx_splash),("underwater-rumble",sfx_rumble),("magical-resonance",sfx_magic),("suspense-riser",sfx_riser),("soft-transition",sfx_soft_transition)]:
        x=fn(); save(S+name+".wav",x); print("sfx",name,x.shape[1]/SR,"s",flush=True)
    for name,fn in [("mystery-ambient",music_mystery),("suspense-tension",music_suspense),("epic-orchestral",music_epic),("emotional-piano",music_piano)]:
        x=fn(); save(M+name+".wav",x); print("music",name,flush=True)

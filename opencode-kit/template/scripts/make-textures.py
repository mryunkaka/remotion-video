import numpy as np
from PIL import Image
rng=np.random.default_rng(3)
def pnoise(h,w,beta=2.2,seed=0):
    r=np.random.default_rng(seed); f=np.fft.fft2(r.standard_normal((h,w)))
    fy=np.fft.fftfreq(h)[:,None]; fx=np.fft.fftfreq(w)[None,:]; k=np.sqrt(fx**2+fy**2); k[0,0]=1
    n=np.real(np.fft.ifft2(f/k**(beta/1.0))); n=(n-n.min())/(n.max()-n.min()); return n
def sm(x,a,b): x=np.clip((x-a)/(b-a),0,1); return x*x*(3-2*x)
# clouds / fog (tileable, white w/ alpha)
n=0.6*pnoise(512,2048,1.9,1)+0.4*pnoise(512,2048,1.2,2); n=(n-n.min())/(n.max()-n.min())
a=sm(n,0.45,0.85); 
img=np.zeros((512,2048,4),np.uint8); img[...,:3]=255; img[...,3]=(a*235).astype(np.uint8)
Image.fromarray(img).save("public/images/textures/clouds.png")
n=0.7*pnoise(256,2048,2.4,5)+0.3*pnoise(256,2048,1.4,6); n=(n-n.min())/(n.max()-n.min()); a=sm(n,0.3,0.9)
img=np.zeros((256,2048,4),np.uint8); img[...,:3]=255; img[...,3]=(a*150).astype(np.uint8); Image.fromarray(img).save("public/images/textures/fog.png")
# caustics
c=np.zeros((1024,1024))
for s,w in ((11,1),(12,.6)):
    c+=w*(1-np.abs(pnoise(1024,1024,2.0,s)-0.5)*2)
c=(c-c.min())/(c.max()-c.min()); a=sm(c,0.72,0.97)**1.5
img=np.zeros((1024,1024,4),np.uint8); img[...,0]=200;img[...,1]=240;img[...,2]=255; img[...,3]=(a*255).astype(np.uint8); Image.fromarray(img).save("public/images/textures/caustics.png")
# grain
g=rng.normal(128,60,(512,512)).clip(0,255).astype(np.uint8); img=np.stack([g,g,g,np.full_like(g,255)],-1); Image.fromarray(img).save("public/images/textures/grain.png")

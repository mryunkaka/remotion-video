import React from "react";
import { captions } from "./captions-data";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";


const scenes = [
  {start:0,end:11,image:"rainforest-dawn.png",chapter:"BAGAIMANA JIKA HUTAN PULAU LAUT TETAP UTUH?",kind:"wide"},
  {start:11,end:25,image:"rainforest-dawn.png",chapter:"SEBUAH PULAU YANG DIPENUHI HUTAN",kind:"wide"},
  {start:25,end:38,image:"canopy.png",chapter:"PAGI YANG LEBIH TEDUH",kind:"canopy"},
  {start:38,end:48,image:"stream.png",chapter:"HUTAN BUKAN SEKADAR POHON",kind:"detail"},
  {start:48,end:64,image:"stream.png",chapter:"KEHIDUPAN YANG SALING TERHUBUNG",kind:"detail"},
  {start:64,end:78,image:"canopy.png",chapter:"KEKAYAAN ALAM YANG TERCATAT",kind:"canopy"},
  {start:78,end:95,image:"village.png",chapter:"MASYARAKAT DAN ALAM",kind:"people"},
  {start:95,end:108,image:"village.png",chapter:"HIDUP BERDAMPINGAN",kind:"people"},
  {start:108,end:121,image:"canopy.png",chapter:"BERAPA BANYAK KEHIDUPAN YANG BERUBAH?",kind:"dark"},
  {start:121,end:133,image:"rainforest-dawn.png",chapter:"SELAMA MASIH ADA, KITA BISA MENJAGA",kind:"wide"},
  {start:133,end:141.5,image:"rainforest-dawn.png",chapter:"PULAU LAUT — RAWAT HUTAN YANG TERSISA",kind:"wide"},
];

const leafShapes = [
  "M0 0 C30 -42 82 -36 106 2 C73 35 24 42 0 0Z",
  "M0 0 C-26 -40 -71 -44 -98 -7 C-65 30 -22 37 0 0Z",
  "M0 0 C36 -30 78 -18 91 14 C55 39 19 31 0 0Z",
];

const leafPositions = [
  {x:88,y:66,s:1.35,delay:0,opacity:.17},
  {x:930,y:340,s:.78,delay:40,opacity:.12},
  {x:45,y:1190,s:.92,delay:85,opacity:.12},
];
const ease = Easing.bezier(0.22,0.74,0.24,1);

const FloatingLeaf:React.FC<{x:number;y:number;s:number;delay:number;opacity:number}> = ({x,y,s,delay,opacity}) => {
 const f=useCurrentFrame();
 const drift=interpolate(f+delay,[0,150,300,450],[0,26,-10,8],{extrapolateRight:"extend"});
 const sway=interpolate(f+delay,[0,110,220,330],[0,10,-8,0],{extrapolateRight:"extend"});
 return <svg width="150" height="100" viewBox="-110 -50 220 100" style={{position:"absolute",left:x,top:y,overflow:"visible",opacity,translate:`0px ${drift}px`,rotate:`${sway}deg`}}>
  <path d={leafShapes[(delay/40|0)%leafShapes.length]} fill="#abc58a" stroke="#d4e5b6" strokeOpacity=".35" strokeWidth="1.5"/>
  <path d="M-54 0 Q0 1 55 0" fill="none" stroke="#e4efce" strokeOpacity=".35" strokeWidth="1"/>
 </svg>
};

const SceneBackground:React.FC<{scene:typeof scenes[number];index:number}> = ({scene,index}) => {
 const frame=useCurrentFrame();
 const {fps}=useVideoConfig();
 const t=frame/fps-scene.start;
 const scale=interpolate(t,[0,scene.end-scene.start],[1.04,1.14],{extrapolateRight:"clamp",easing:ease});
 const x=interpolate(t,[0,scene.end-scene.start],index%2===0?["0%","-2.2%"]:["-2%","1.6%"],{extrapolateRight:"clamp"});
 const y=interpolate(t,[0,scene.end-scene.start],index%3===0?["0%","-1.5%"]:["-1%","1%"],{extrapolateRight:"clamp"});
 const dark=scene.kind==="dark";
 return <AbsoluteFill style={{overflow:"hidden",backgroundColor:"#091b17"}}>
  <Img src={staticFile(scene.image)} style={{width:"100%",height:"100%",objectFit:"cover",scale,translate:`${x} ${y}`,filter:dark?"brightness(0.54) saturate(.82) contrast(1.12)":scene.kind==="people"?"brightness(.82) saturate(.9)":"brightness(.82) saturate(.93) contrast(1.04)"}} />
  <AbsoluteFill style={{background:"linear-gradient(180deg, rgba(5,17,16,.12) 0%, rgba(6,19,17,.04) 37%, rgba(5,15,14,.35) 65%, rgba(3,13,12,.82) 100%)"}} />
  <AbsoluteFill style={{background:"radial-gradient(ellipse at 52% 40%, transparent 30%, rgba(2,12,10,.34) 100%)"}} />
  {scene.kind!=="dark" && leafPositions.map((p,i)=><FloatingLeaf key={i} {...p}/>)}
 </AbsoluteFill>;
};

const SceneTitle:React.FC<{text:string;sceneStart:number;dark:boolean}> = ({text,sceneStart,dark})=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig(); const local=f-sceneStart*fps;
 const opacity=interpolate(local,[0,18,100,145],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:ease});
 const lift=interpolate(local,[0,22],[22,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:ease});
 return <div style={{position:"absolute",top:292,left:86,right:86,color:"#f4f0df",opacity,translate:`0px ${lift}px`,fontFamily:"Arial, sans-serif",textShadow:"0 4px 25px rgba(0,0,0,.55)"}}>
   <div style={{width:72,height:3,background:"#d8bd79",marginBottom:25,opacity:.9}}/>
   <div style={{fontSize:21,letterSpacing:4,fontWeight:600,color:"#e5d7aa",marginBottom:17}}>PULAU LAUT · CERITA ALAM</div>
   <div style={{fontSize:text.length>31?45:54,fontWeight:700,lineHeight:1.12,letterSpacing:-1.2,maxWidth:880}}>{text}</div>
   <div style={{marginTop:20,fontSize:18,letterSpacing:3,color:"rgba(248,245,226,.75)"}}>ILUSTRASI SKENARIO ALTERNATIF</div>
 </div>;
};

const CaptionTrack:React.FC=()=>{
 const f=useCurrentFrame(); const seconds=f/30;
 const current=captions.find(c=>seconds>=c.start && seconds<c.end);
 if(!current)return null;
 const fadeIn=interpolate(seconds,[current.start,current.start+.12],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <div style={{position:"absolute",left:78,right:78,bottom:238,display:"flex",justifyContent:"center",opacity:fadeIn}}>
  <div style={{maxWidth:920,padding:"14px 22px 17px",background:"rgba(3,12,11,.61)",borderRadius:12,borderLeft:"3px solid rgba(223,201,142,.9)",color:"#fffdf3",fontFamily:"Arial,sans-serif",fontSize:34,fontWeight:600,lineHeight:1.25,textAlign:"center",textShadow:"0 2px 5px rgba(0,0,0,.8)"}}>{current.text}</div>
 </div>;
};

const Timeline:React.FC=()=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig();
 const sceneIndex=scenes.findIndex((s,i)=>f>=s.start*fps && (f<(s.end*fps)||i===scenes.length-1));
 const scene=scenes[Math.max(0,sceneIndex)];
 const previous=sceneIndex>0?scenes[sceneIndex-1]:null;
 const transition=interpolate(f-scene.start*fps,[0,18],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:ease});
 const endFade=interpolate(f,[4180,4244],[1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <AbsoluteFill style={{backgroundColor:"#06110f",opacity:endFade}}>
   <SceneBackground scene={previous??scene} index={Math.max(sceneIndex-1,0)}/>
   <AbsoluteFill style={{opacity:previous?transition:1}}>
     <SceneBackground scene={scene} index={Math.max(sceneIndex,0)}/>
     <SceneTitle text={scene.chapter} sceneStart={scene.start} dark={scene.kind==="dark"}/>
   </AbsoluteFill>
   <div style={{position:"absolute",top:72,right:72,fontFamily:"Arial,sans-serif",fontSize:15,letterSpacing:1.5,color:"rgba(248,245,226,.78)",textShadow:"0 2px 8px rgba(0,0,0,.8)"}}>REKONSTRUKSI VISUAL · BUKAN FOOTAGE</div>
   <CaptionTrack/>
   <div style={{position:"absolute",left:84,right:84,bottom:112,height:2,background:"rgba(245,238,214,.24)"}}>
    <div style={{height:"100%",width:`${f/4245*100}%`,background:"#d7c18a"}}/>
   </div>
   <div style={{position:"absolute",bottom:73,left:84,fontFamily:"Arial,sans-serif",fontSize:17,letterSpacing:2,color:"rgba(250,246,226,.7)"}}>PULAU LAUT · JAGA YANG TERSISA</div>
 </AbsoluteFill>;
};

export const PulauLautFilm:React.FC=()=>{
 return <AbsoluteFill style={{background:"#06110f"}}>
   <Timeline />
 </AbsoluteFill>;
};


import React from "react";
import {AbsoluteFill, Composition, Sequence, interpolate, useCurrentFrame} from "remotion";
import transcript from "../docs/transcript.json";
const FPS=30, DURATION=166.211, DURATION_FRAMES=Math.ceil(DURATION*FPS);
type SceneDef={id:string;start:number;end:number;kind:string;label:string};
const scenes:SceneDef[]=[
 {id:"hook",start:0,end:14,kind:"sea",label:"LEGENDA MARITIM • PULAU HALIMUN"},
 {id:"ardan",start:14,end:30.7,kind:"boat",label:"ARDAN • NELAYAN YANG MENGHILANG"},
 {id:"bell",start:30.7,end:43.7,kind:"bell",label:"SUARA DARI TENGAH LAUT"},
 {id:"warning",start:43.7,end:73.7,kind:"home",label:"JANGAN DEKATI TIGA CAHAYA"},
 {id:"depart",start:73.7,end:82.8,kind:"depart",label:"MALAM ITU"},
 {id:"radio",start:82.8,end:120.7,kind:"radioBoat",label:"FREKUENSI YANG SEHARUSNYA KOSONG"},
 {id:"lights",start:120.7,end:133,kind:"lights",label:"TIGA CAHAYA DI BALIK KABUT"},
 {id:"morning",start:133,end:146.1,kind:"empty",label:"PAGI BERIKUTNYA"},
 {id:"homeRadio",start:146.1,end:162.8,kind:"radioHome",label:"RADIO DI RUMAH MENYALA"},
 {id:"last",start:162.8,end:DURATION,kind:"last",label:"PULAU HALIMUN"},
];
const captions=transcript.segments as {start:number;end:number;text:string}[];
const Wave:React.FC<{y:number;speed:number;color:string}> = ({y,speed,color})=>{
 const f=useCurrentFrame(), x=(f*speed)%720;
 const d=`M0 ${y} Q90 ${y-14} 180 ${y} T360 ${y} T540 ${y} T720 ${y} T900 ${y} T1080 ${y} T1260 ${y} T1440 ${y}`;
 return <g fill="none" stroke={color} strokeWidth="3" opacity=".48"><path d={d} transform={`translate(${-x} 0)`}/><path d={d} transform={`translate(${720-x} 0)`}/></g>;
};
const Boat:React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1})=>{
 const f=useCurrentFrame();
 return <g transform={`translate(${x} ${y+Math.sin(f/13)*7}) scale(${scale})`}>
  <path d="M-225 0 Q-155 36 30 34 Q165 32 230 0 L195 70 Q5 96 -185 64Z" fill="#101c25" stroke="#54727c" strokeWidth="5"/>
  <path d="M-70 -8 L-54 -76 L90 -76 L114 -4Z" fill="#17272f" stroke="#667f83" strokeWidth="4"/>
  <path d="M-31 -61 L9 -61 L9 -28 L-31 -28Z M28 -61 L72 -61 L72 -28 L28 -28Z" fill="#ce965a" opacity=".62"/>
 </g>;
};
const Person:React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1})=><g transform={`translate(${x} ${y}) scale(${scale})`}>
 <ellipse cy="0" rx="43" ry="10" fill="#071118" opacity=".5"/><path d="M-27 -150 Q-45 -112 -51 -50 L-70 -8 Q-30 4 0 -4 Q39 5 70 -8 L47 -60 Q42 -116 23 -150Z" fill="#151b20"/>
 <circle cy="-180" r="27" fill="#202329"/><path d="M-24 -194 Q0 -228 25 -194 L22 -178 Q0 -188 -24 -178Z" fill="#10171b"/>
 </g>;
const Radio:React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1})=>{
 const f=useCurrentFrame(),on=Math.sin(f*1.7)>.7;
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
 <rect x="-126" y="-85" width="252" height="170" rx="20" fill="#17252c" stroke="#779096" strokeWidth="8"/>
 <rect x="-96" y="-55" width="142" height="72" rx="8" fill="#071116" stroke="#53686d" strokeWidth="4"/>
 <path d="M-78 -19 q18 -27 34 0 t34 0 t34 0" fill="none" stroke={on?"#f2c36e":"#85a5a0"} strokeWidth="4"/>
  <circle cx="78" cy="-36" r="18" fill="#34464b" stroke="#a2b2a5" strokeWidth="5"/><circle cx="78" cy="27" r="10" fill={on?"#ef9b5e":"#6b4f40"}/>
 <path d="M-174 -85 L-158 -172 L-150 -174 L-153 -80 M-78 49 H50 M-78 64 H50" fill="none" stroke="#829393" strokeWidth="5"/>
 </g>;
};
const Art:React.FC<{kind:string}>=({kind})=>{
 const f=useCurrentFrame(),drift=Math.sin(f/87)*18;
 const dark=["radioBoat","lights","empty","radioHome","last"].indexOf(kind)>=0;
 const horizon=kind==="home"||kind==="radioHome"?760:650;
 const isBoat=["boat","bell","depart","radioBoat","lights","empty"].indexOf(kind)>=0;
 return <AbsoluteFill style={{overflow:"hidden",background:dark?"#07121a":"#15272f"}}>
 <svg width="100%" height="100%" viewBox="0 0 720 1280" preserveAspectRatio="xMidYMid slice" style={{position:"absolute"}}>
  <defs>
   <linearGradient id="sky" x2="0" y2="1"><stop stopColor={dark?"#080f1b":"#35464a"}/><stop offset=".6" stopColor={dark?"#182b32":"#a27756"}/><stop offset="1" stopColor="#56483d"/></linearGradient>
   <linearGradient id="sea" x2="0" y2="1"><stop stopColor="#24414a"/><stop offset="1" stopColor="#091720"/></linearGradient>
   <radialGradient id="halo"><stop stopColor="#eed69c" stopOpacity=".7"/><stop offset="1" stopColor="#e1b769" stopOpacity="0"/></radialGradient>
  </defs>
  <rect width="720" height="810" fill="url(#sky)"/><circle cx="555" cy="250" r="185" fill="url(#halo)"/><circle cx="555" cy="250" r="36" fill="#eadbb5" opacity=".76"/>
  <path d="M0 540 Q150 475 285 528 T540 510 T780 520 V800 H0Z" fill="#18272a" opacity=".7"/>
  <rect y={horizon} width="720" height="500" fill="url(#sea)"/>
  <Wave y={horizon+80} speed={1.2} color="#82a6a1"/><Wave y={horizon+170} speed={-1.7} color="#51777b"/><Wave y={horizon+280} speed={2.3} color="#294c55"/>
  {kind==="bell"&&<g transform={`translate(${360+drift} 800)`}>
   <path d="M0 0 C-18 -60 -42 -89 -21 -111 Q0 -135 21 -111 C42 -89 18 -60 0 0Z" fill="#9b906d" opacity=".65"/>
   {[0,1,2].map(i=><ellipse key={i} rx={55+i*55+Math.sin(f/16)*6} ry={13+i*18} fill="none" stroke="#b8c4a0" strokeWidth="2" opacity={.38-i*.08}/>)}
  </g>}
  {kind==="home"&&<g transform={`translate(${360+drift} 805)`}>
   <path d="M-215 -180 L0 -320 L215 -180 V95 H-215Z" fill="#182327" stroke="#927c63" strokeWidth="6"/>
   <path d="M-246 -180 L0 -354 L248 -180" fill="none" stroke="#bd9e74" strokeWidth="13"/>
   <rect x="-158" y="-131" width="97" height="132" fill="#e5ad67" opacity=".45"/><rect x="59" y="-131" width="97" height="132" fill="#d28c48" opacity=".38"/>
   <path d="M-18 94 V-86 Q0 -127 20 -86 V94" fill="#0a1418"/>
   <Person x={-74} y={34} scale={.77}/><Person x={75} y={34} scale={.76}/>
  </g>}
  {isBoat&&<g transform={`translate(${kind==="empty"?404:360+drift} 0)`}>
   {kind==="empty"?<Boat x={0} y={horizon+54} scale={.45}/>:<Boat x={0} y={horizon+38} scale={kind==="lights"?.78:1}/>}
   {kind==="boat"&&<Person x={0} y={horizon+8} scale={.76}/>}
   {kind==="depart"&&<Person x={-250-drift} y={horizon+8} scale={.48}/>}
   {kind==="radioBoat"&&<><rect x="-84" y={horizon-52} width="168" height="56" rx="8" fill="#111d22" stroke="#667d7d" strokeWidth="4"/><Radio x={0} y={horizon-24} scale={.69}/></>}
  </g>}
  {(kind==="lights"||kind==="last")&&[0,1,2].map((i)=><g key={i} transform={`translate(${170+i*184+Math.sin(f/24+i)*12} ${kind==="last"?640:590+Math.sin(f/18+i*2)*10})`}>
   <circle r={88+Math.sin(f/12+i)*7} fill="url(#halo)" opacity=".88"/><circle r="10" fill="#f5d997"/><path d="M0 32 Q-6 90 0 140 Q7 84 0 32Z" fill="#f0d69a" opacity=".24"/>
  </g>)}
  {kind==="radioHome"&&<g transform="translate(360 1060)"><rect x="-236" y="-110" width="472" height="220" rx="25" fill="#17252a" stroke="#8d9284" strokeWidth="6"/><Radio x={0} y={0} scale={.78}/></g>}
 </svg>
 <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(3,8,12,.18),transparent 26%,transparent 61%,rgba(2,8,12,.55))",boxShadow:"inset 0 0 125px rgba(0,0,0,.38)"}}/>
 </AbsoluteFill>;
};
const Shot:React.FC<{s:SceneDef}>=({s})=>{
 const f=useCurrentFrame(),len=(s.end-s.start)*FPS;
 const alpha=interpolate(f,[0,18,len-18,len],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <AbsoluteFill style={{opacity:alpha,transform:`scale(${1.03+Math.sin(f/170)*.012}) translateX(${Math.sin(f/90)*8}px)`}}>
  <Art kind={s.kind}/>
  <div style={{position:"absolute",top:80,left:42,right:42,display:"flex",justifyContent:"space-between",color:"rgba(238,226,204,.8)",fontFamily:"Arial",fontSize:16,letterSpacing:3}}><span>{s.label}</span><span style={{opacity:.55}}>KOTABARU</span></div>
  {s.id==="hook"&&<div style={{position:"absolute",top:290,left:48,color:"#f2e9d7",fontFamily:"Georgia",textShadow:"0 4px 20px #07121a"}}>
   <div style={{fontSize:59,lineHeight:1.03}}>TIGA CAHAYA<br/>DI TENGAH LAUT</div><div style={{marginTop:20,fontFamily:"Arial",fontSize:19,letterSpacing:2,color:"#e3bc82"}}>SUARA SIAPA YANG MEMANGGIL?</div>
  </div>}
  {s.id==="last"&&<div style={{position:"absolute",top:340,left:40,right:40,textAlign:"center",fontFamily:"Georgia",fontSize:39,color:"#f0d8a7",textShadow:"0 3px 18px #000"}}>JANGAN CARI<br/>BAPAKMU.</div>}
 </AbsoluteFill>;
};
const Subtitle:React.FC=()=>{
 const f=useCurrentFrame(),sec=f/FPS,item=captions.find(x=>sec>=x.start&&sec<x.end);
 if(!item)return null;
 const alpha=interpolate(sec,[item.start,item.start+.1,item.end-.08,item.end],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <div style={{position:"absolute",left:28,right:28,bottom:66,minHeight:132,display:"flex",alignItems:"center",justifyContent:"center",opacity:alpha,background:"linear-gradient(180deg,transparent,rgba(4,9,12,.76) 18%,rgba(4,9,12,.76) 82%,transparent)",padding:"18px 24px",boxSizing:"border-box"}}>
  <div style={{maxWidth:650,textAlign:"center",fontFamily:"Arial",fontWeight:700,fontSize:30,lineHeight:1.27,color:"#fff8e9",textShadow:"0 2px 8px #000"}}>{item.text}</div>
 </div>;
};
const Video:React.FC=()=> <AbsoluteFill style={{background:"#07121a"}}>
 {scenes.map((s,i)=>{const from=Math.round(s.start*FPS)-(i===0?0:12),to=Math.ceil(s.end*FPS);return <Sequence key={s.id} from={from} durationInFrames={to-from} layout="none"><Shot s={s}/></Sequence>})}
 <Subtitle/>
 </AbsoluteFill>;
export const HalimunComposition:React.FC=()=> <Composition id="PulauHalimunHoror" component={Video} durationInFrames={DURATION_FRAMES} fps={FPS} width={720} height={1280}/>;


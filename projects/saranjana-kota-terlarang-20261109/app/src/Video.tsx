import React from 'react';
import {Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import captions from './captions.json';

const beats = [
  [0,419,'MISTERI PULAU HALIMUN','Lautan menyimpan kisah yang tak seluruhnya tampak.'],
  [419,943,'SEBUAH JANJI','Bukan janji raja, bukan hasil peperangan.'],
  [943,1218,'DATUMABRUR','Seorang diri di atas karang, di tengah lautan.'],
  [1218,1596,'PERMINTAAN SEDERHANA','Sebuah pulau untuk anak cucunya.'],
  [1596,1925,'PENGUASA LAUTAN','Bayangan ikan todak membelah air gelap.'],
  [1925,2273,'PERTARUNGAN','Gelombang menyimpan benturan tanpa darah.'],
  [2273,2539,'BELAS KASIH','Ia merawat, lalu melepaskan sang todak.'],
  [2539,2851,'HADIAH','Permintaan itu tetap sama.'],
  [2851,3251,'DARATAN TERANGKAT','Dalam hikayat: Pulau Halimun, dikaitkan dengan Pulau Laut.'],
  [3251,3482,'SAIJAAN','Seia sekata — semangat kebersamaan.'],
  [3482,3618,'SEBUAH LEGENDA','Bukan bukti ilmiah terbentuknya Pulau Laut.'],
  [3618,3928,'RENUNGKAN','Apakah semangat itu masih kita jaga?'],
  [3928,4292,'CERITA NUSANTARA','Bagikan legenda dari daerahmu.'],
  [4292,4476,'@terangbulan.media','Mengungkap cerita, menerangi makna.'],
] as const;

const SceneArt: React.FC<{index:number; progress:number}> = ({index,progress}) => {
  const city = index === 8 || index === 13;
  const wave = interpolate(progress,[0,1],[0,44]);
  return <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
    <defs>
      <linearGradient id="sky" x2="0" y2="1"><stop stopColor={city?'#152325':'#07141c'}/><stop offset=".62" stopColor="#10242a"/><stop offset="1" stopColor="#030a0e"/></linearGradient>
      <radialGradient id="moon"><stop stopColor="#d4ad77" stopOpacity=".48"/><stop offset="1" stopColor="#d4ad77" stopOpacity="0"/></radialGradient>
      <linearGradient id="fog" x2="1"><stop stopColor="#bdc7bd" stopOpacity="0"/><stop offset=".5" stopColor="#a7b0a8" stopOpacity=".17"/><stop offset="1" stopColor="#bdc7bd" stopOpacity="0"/></linearGradient>
    </defs>
    <rect width="1080" height="1920" fill="url(#sky)"/><ellipse cx="690" cy="640" rx="520" ry="460" fill="url(#moon)"/>
    {index!==0&&Array.from({length:7},(_,i)=><path key={i} d={`M0 ${1030+i*100+Math.sin(progress*6+i)*15} Q240 ${970+i*110+wave*.15} 540 ${1050+i*95} T1080 ${1000+i*100}`} fill="none" stroke={i%2?'#81948f':'#c5a779'} strokeOpacity={.07+i*.008} strokeWidth={i===0?4:2}/>) }
    {(city||index===9)&&Array.from({length:13},(_,i)=>{const x=i*100-50,h=240+(i*173%440);return <g key={i}><path d={`M${x} 1110 V${1110-h} l42 -48 42 48 V1110Z`} fill="#101b1b" stroke="#b39468" strokeOpacity=".22"/><path d={`M${x+24} ${1110-h+80}h10v20h-10m28 32h9v18h-9`} fill="#d1aa68" opacity=".52"/></g>})}
    {!city&&<g transform={`translate(${index>=4&&index<=6?0:0} 0)`}><path d="M0 1310 Q180 1220 360 1310 Q540 1400 720 1300 Q900 1200 1080 1320 V1920 H0Z" fill="#050b0e"/>{(index===2||index===3)&&<g><path d="M425 1310l118-150 120 150z" fill="#172020"/><circle cx="535" cy="1050" r="21" fill="#a79372"/><path d="M536 1074v106m0-65-45 40m45-40 44 32" stroke="#a79372" strokeWidth="16" strokeLinecap="round"/></g>}{index===4&&<path d="M160 1250 Q390 900 800 1210 Q610 1270 500 1335 Q340 1290 160 1250Z" fill="#05090b" stroke="#9e8a69" strokeOpacity=".26"/>}</g>}
    {(city||index===9||index===13)&&Array.from({length:13},(_,i)=>{const x=i*100-50,h=240+(i*173%440);return <g key={i}><path d={`M${x} 1110 V${1110-h} l42 -48 42 48 V1110Z`} fill="#101b1b" stroke="#b39468" strokeOpacity=".22"/><path d={`M${x+24} ${1110-h+80}h10v20h-10m28 32h9v18h-9`} fill="#d1aa68" opacity=".52"/></g>})}
    {index===5&&<path d="M100 1200 Q300 1080 510 1170 Q700 1190 800 1210 Q650 1270 500 1305 Q300 1260 100 1200Z" fill="#03080a" stroke="#9e8a69" strokeOpacity=".32"/>}
    {(index===5||index===6)&&<g opacity={index===5?.8:.42}><path d="M-60 1175 Q300 1070 560 1190 Q760 1280 1150 1120" fill="none" stroke="#a98c62" strokeOpacity=".55" strokeWidth="12"/><path d="M-60 1330 Q300 1215 560 1340 Q760 1420 1150 1260" fill="none" stroke="#9db0a7" strokeOpacity=".25" strokeWidth="8"/></g>}
    {index===6&&<path d="M435 1210q90-60 160 0m-136 20 110 25m-80-65v120" fill="none" stroke="#d1aa68" strokeWidth="10" strokeOpacity=".65"/>}
    {index===7&&<g><circle cx="480" cy="1160" r="130" fill="none" stroke="#d1aa68" strokeOpacity=".5" strokeWidth="4"/><circle cx="610" cy="1160" r="130" fill="none" stroke="#aab8b0" strokeOpacity=".5" strokeWidth="4"/></g>}
    {index===9&&Array.from({length:9},(_,i)=><path key={i} d={`M${i*140} 1510 Q540 1310 540 1190`} fill="none" stroke="#d1aa68" strokeOpacity=".28" strokeWidth="5"/>)}
    <path d={`M0 ${1210+Math.sin(progress*4)*22} Q500 1140 1080 ${1210-Math.sin(progress*4)*20} L1080 1320 Q540 1250 0 1330Z`} fill="url(#fog)" opacity=".88"/>
    {Array.from({length:5},(_,i)=><path key={'f'+i} d={`M${-150+i*260+Math.sin(progress*3+i)*50} ${1140+i*43} q160 -46 320 0`} stroke="url(#fog)" strokeWidth="50" fill="none" opacity=".72"/>)}
  </svg>;
};

export const Video: React.FC = () => {
  const frame=useCurrentFrame();
  const idx=Math.max(0,beats.findIndex((b,i)=>frame>=b[0]&&frame<(beats[i+1]?.[0]??4476)));
  const [start,end,title,sub]=beats[idx]; const local=frame-start, duration=end-start;
  const p=interpolate(local,[0,duration],[0,1],{extrapolateRight:'clamp',easing:Easing.inOut(Easing.quad)});
  const enter=interpolate(local,[0,24],[0,1],{extrapolateRight:'clamp',extrapolateLeft:'clamp'});
  const exit=interpolate(local,[duration-18,duration],[1,0],{extrapolateRight:'clamp',extrapolateLeft:'clamp'});
  const scale=interpolate(p,[0,1],[1.02,1.085]);
  return <div style={{position:'absolute',inset:0,overflow:'hidden',background:'#07141c',fontFamily:'Georgia,serif',color:'#eee6d4'}}>
    <Audio src={staticFile('audio/voice.wav')} volume={1}/>
    <Audio src={staticFile('audio/bgm.wav')} volume={0.8}/>
    <Audio src={staticFile('audio/sfx.wav')} volume={0.7}/>
    <div style={{position:'absolute',inset:-45,scale,transformOrigin:'center',opacity:.98}}><SceneArt index={idx} progress={p}/></div>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(2,7,9,.88),transparent 48%,rgba(2,7,9,.22))'}}/>
    {idx!==13&&(captions as {start:number;end:number;text:string}[]).filter(c=>frame>=c.start&&frame<c.end).map((c,i)=><div key={i} style={{position:'absolute',left:72,right:72,bottom:500,textAlign:'center',fontFamily:'Arial,sans-serif',fontSize:29,lineHeight:1.18,fontWeight:700,color:'#fff',textShadow:'0 2px 14px #000,0 0 22px #000',background:'#010608',padding:'12px 18px',border:'1px solid #a98c62'}}>{c.text}</div>)}
    <div style={{position:'absolute',top:145,left:74,right:74,display:'flex',justifyContent:'space-between',fontFamily:'Arial,sans-serif',fontSize:26,letterSpacing:6,color:'#d9bd8c',opacity:.78}}><span>TERANG BULAN</span><span>FOLKLOR NUSANTARA</span></div>
    {idx!==13&&<div style={{position:'absolute',left:82,right:82,bottom:170,opacity:enter*exit,translate:`0 ${interpolate(enter,[0,1],[24,0])}px`,textAlign:'left'}}>
      <div style={{fontSize:idx===13?54:62,lineHeight:1.08,letterSpacing:2,textShadow:'0 3px 28px #000',maxWidth:900,margin:idx===13?'auto':undefined,background:'#02080a',width:'fit-content',padding:'10px 14px'}}>{title}</div>
      <div style={{fontFamily:'Arial,sans-serif',fontSize:idx===13?21:28,lineHeight:1.2,margin:'18px auto 0',color:'#fff',textShadow:'0 2px 14px #000',background:'#02080a',width:'fit-content',maxWidth:'100%',padding:'10px 14px'}}>{sub}</div>
      <div style={{height:2,background:'#d1aa68',width:interpolate(local,[0,duration],[24,240]),marginTop:28,opacity:.8}}/>
    </div>}
    {idx===13&&<div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',gap:28,background:'linear-gradient(0deg,rgba(1,7,9,.88),transparent 75%)'}}><div style={{fontFamily:'Arial,sans-serif',fontSize:28,letterSpacing:6,color:'#d9bd8c'}}>KISAH PULAU HALIMUN</div><div style={{fontSize:54,lineHeight:1.08,background:'#02080a',padding:'14px 18px'}}>@terangbulan.media</div><div style={{fontFamily:'Arial,sans-serif',fontSize:25,color:'#fff',background:'#02080a',padding:'10px 14px'}}>Mengungkap cerita, menerangi makna.</div></div>}
    {idx!==13&&<div style={{position:'absolute',bottom:88,left:0,right:0,textAlign:'center',fontFamily:'Arial,sans-serif',fontSize:21,letterSpacing:4,color:'#d1aa68',opacity:.62}}>@terangbulan.media</div>}
    <div style={{position:'absolute',inset:0,background:'#000',opacity:interpolate(frame,[0,18,4470,4476],[0,0,0,1],{extrapolateRight:'clamp',extrapolateLeft:'clamp'})}}/>
  </div>;
};

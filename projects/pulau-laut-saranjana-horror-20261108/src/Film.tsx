import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const beats = [
  {chapter:'LEGENDA PULAU LAUT', text:'Dua gunung. Dua pangeran. Satu kota yang katanya tak terlihat.', mode:'hook', note:'REKONSTRUKSI LEGENDA'},
  {chapter:'BUKAN LAPORAN PENAMPAKAN', text:'Ini bukan laporan penampakan. Ini legenda lama dari Pulau Laut.', mode:'paper', note:'CERITA RAKYAT · BUKAN FAKTA GAIB'},
  {chapter:'NAMA YANG TERUS MEMANCING', text:'Di Kotabaru, nama Saranjana terus memancing satu pertanyaan…', mode:'map', note:'KOTABARU · KALIMANTAN SELATAN'},
  {chapter:'KERAJAAN PULAU HALIMUN', text:'Apa yang sebenarnya diceritakan tentang Kerajaan Pulau Halimun?', mode:'ridge', note:'SATU VERSI LEGENDA'},
  {chapter:'DUA PUTRA RAJA', text:'Dalam satu versi, Raja Pakurindang memiliki dua putra: Sambu Batung dan Sambu Ranjana.', mode:'siblings', note:'NAMA DAN DETAIL DAPAT BERBEDA ANTARVERSI'},
  {chapter:'DUA JALAN', text:'Keduanya memilih jalan yang berbeda.', mode:'split', note:'PILIHAN MEMECAH PETA'},
  {chapter:'GUNUNG SEBATUNG', text:'Sambu Batung dikaitkan dengan Gunung Sebatung…', mode:'mountain', note:'REKONSTRUKSI VISUAL · BUKAN FOOTAGE'},
  {chapter:'GUNUNG SARANJANA', text:'…sementara Sambu Ranjana dihubungkan dengan Gunung Saranjana.', mode:'mountain2', note:'REKONSTRUKSI VISUAL · BUKAN FOOTAGE'},
  {chapter:'JEJAKNYA MENGHILANG', text:'Lalu cerita itu mengambil belokan yang membuat orang merinding.', mode:'vanish', note:'DENGARKAN BAIK-BAIK'},
  {chapter:'KOTA YANG TAK TERLIHAT', text:'Sang pangeran, kata legenda, memilih membangun kota di alam yang tak terlihat.', mode:'city', note:'ILUSTRASI MITOS · BUKAN KESAKSIAN'},
  {chapter:'TAPI DI MANA?', text:'Bukan kota yang bisa kita tunjuk di peta hari ini.', mode:'search', note:'PETA INI BERSIFAT SKEMATIS'},
  {chapter:'KENAPA CERITANYA BERTAHAN?', text:'Justru jarak antara nama, gunung, dan cerita itulah yang membuatnya bertahan.', mode:'orbit', note:'MITOS · INGATAN · TEMPAT'},
  {chapter:'BEDAKAN CERITA DAN BUKTI', text:'Tapi jangan tertukar: mitos yang hidup bukan bukti kota gaib benar-benar ada.', mode:'source', note:'LEGENDA TIDAK MEMBUKTIKAN PERISTIWA GAIB'},
  {chapter:'YANG TERCATAT', text:'Yang tercatat adalah kisahnya—dan gunung-gunung yang namanya melekat padanya.', mode:'markers', note:'SUMBER: KAJIAN LEGENDA PULAU HALIMUN (2017)'},
  {chapter:'KAMU PILIH YANG MANA?', text:'Kalau malam ini kau melihat cahaya di balik punggung gunung… kau mendekat, atau pulang?', mode:'ending', note:'CERITAKAN PILIHANMU'},
] as const;
const followUp = [
  'Pulau Laut menyimpan dua pangeran dan satu nama.',
  'Kisah lisan, bukan laporan penampakan.',
  'Di balik nama itu, ada cerita kerajaan.',
  'Kisahnya berpusat pada dua saudara dan pilihan.',
  'Versinya beragam; ini salah satu penceritaan.',
  'Jalan mereka, kata legenda, terbelah dua.',
  'Nama Sambu Batung dikaitkan dengan Sebatung.',
  'Sambu Ranjana dikaitkan dengan Gunung Saranjana.',
  'Dari sini, cerita beralih ke alam tak terlihat.',
  'Kota di gambar ini hanya ilustrasi legenda.',
  'Peta skematis ini bukan bukti kota gaib.',
  'Nama tempat dan cerita lisan saling bertaut.',
  'Kajian mencatat mitos; bukan bukti gaib.',
  'Yang tercatat nyata: legenda yang terus diwariskan.',
  'Mendekat atau pulang? Kamu pilih yang mana?',
] as const;
type Mode = (typeof beats)[number]['mode'];
const gold='#e5bd69';
const ink='#07151b';
const ease=Easing.bezier(.18,.78,.22,1);

const Topography:React.FC<{frame:number;index:number;muted?:boolean}> = ({frame,index,muted=false}) => {
  if(![0,2,10,11,13].includes(index)) return null;
  const drift=(frame%900)/900;
  return <svg viewBox="0 0 1080 1920" width="100%" height="100%" style={{position:'absolute',inset:0,opacity:muted?.22:.5}}>
    <defs><linearGradient id="coast" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#89a6a2" stopOpacity=".32"/><stop offset="1" stopColor="#243b40" stopOpacity=".08"/></linearGradient></defs>
    <g fill="none" stroke="#9bb4aa" strokeOpacity=".24" strokeWidth="2">
      {Array.from({length:8},(_,i)=><path key={i} d={`M ${-180+i*60} ${480+i*95} C ${120+i*30} ${300+i*110}, ${300+i*110} ${830+i*50}, ${680+i*26} ${650+i*110} S ${930-i*4} ${500+i*90}, 1240 ${640+i*85}`} transform={`translate(${Math.sin(drift*6.28+i)*10} ${Math.cos(drift*6.28+i)*9})`} />)}
      <path fill="url(#coast)" stroke="#d3c5a1" strokeOpacity=".45" d={index%2===0?'M560 340 C650 285 740 332 766 425 L735 560 778 670 704 800 736 935 650 1065 604 1010 588 870 524 805 548 650 502 548Z':'M280 430 Q390 325 454 410 L476 542 430 645 461 760 390 850 335 790 350 655 310 554Z'} />
    </g>
    <circle cx={index%2===0?650:400} cy="785" r="10" fill={gold} opacity=".9" />
  </svg>;
};

const Person:React.FC<{x:number;f:number;side:1|-1;golden?:boolean}> = ({x,f,side,golden=false}) => {
  const sway=Math.sin(f/21+x/130)*3;const gesture=Math.sin(f/19+x/170)*10;
  return <svg width="230" height="470" viewBox="0 0 230 470" style={{position:'absolute',left:x,top:610,overflow:'visible',transform:`translateY(${sway}px) scaleX(${side})`,filter:golden?'drop-shadow(0 10px 20px #bd8f3a55)':'drop-shadow(0 12px 28px #0009)'}}>
    <circle cx="116" cy="92" r="48" fill={golden?'#c7a767':'#111b20'} stroke={golden?'#e8cf92':'#8c9991'} strokeOpacity=".55" strokeWidth="3"/>
    <path d={`M76 183 Q42 ${210+gesture} 46 272`} fill="none" stroke={golden?'#b49a63':'#172329'} strokeWidth="25" strokeLinecap="round"/>
    <path d={`M155 183 Q192 ${218-gesture} 185 266`} fill="none" stroke={golden?'#b49a63':'#172329'} strokeWidth="25" strokeLinecap="round"/>
    <path d="M67 161 Q115 135 164 161 C194 206 177 291 216 374 Q170 420 115 415 Q61 422 14 374 C54 291 36 207 67 161Z" fill={golden?'#4a4132':'#101a1f'} stroke={golden?'#dfbd70':'#74807a'} strokeOpacity=".65" strokeWidth="3"/>
    <path d="M89 158 Q102 195 116 244 Q131 195 144 158 M116 244 Q106 304 115 412" fill="none" stroke="#d7c8a0" strokeOpacity=".42" strokeWidth="3"/>
  </svg>;
};

const SceneArt:React.FC<{mode:Mode;frame:number;index:number}> = ({mode,frame,index}) => {
  const pulse=.6+Math.sin(frame/8)*.15;
  const lift=interpolate(frame,[0,240],[48,-22],{extrapolateRight:'clamp',easing:ease});
  const ridge=<svg viewBox="0 0 1080 900" width="100%" height="100%" style={{position:'absolute',left:0,bottom:210,overflow:'visible'}}>
    <defs><linearGradient id="mount" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#50625d"/><stop offset="1" stopColor="#12232a"/></linearGradient></defs>
    <path d={mode==='mountain'?'M-80 820 Q40 700 145 735 L270 580 344 655 482 330 535 430 585 420 696 630 Q820 580 950 720 L1160 610 1160 940 -80 940Z':mode==='mountain2'?'M-80 820 L72 730 180 645 270 700 395 480 515 590 630 390 730 500 820 265 914 430 1012 380 1160 590 1160 940 -80 940Z':mode==='ending'?'M-80 760 Q70 650 200 710 Q330 770 450 675 Q590 570 720 690 Q860 790 1015 675 Q1110 620 1160 650 L1160 940 -80 940Z':mode==='city'?'M-80 830 Q60 650 190 750 Q300 835 430 690 Q550 570 680 675 Q800 800 950 650 L1160 720 1160 940 -80 940Z':'M-80 820 L105 695 225 550 315 640 450 405 550 525 695 320 820 460 940 360 1160 650 1160 940 -80 940Z'} fill="url(#mount)" stroke="#a7a17c" strokeOpacity=".48" strokeWidth="3" transform={`translate(0 ${lift})`}/>
    <path d={mode==='mountain2'?'M-50 785 Q200 740 370 770 T720 730 T1140 780':'M-50 785 Q220 700 410 770 T850 710 T1140 780'} fill="none" stroke="#d7b96d" strokeOpacity=".32" strokeWidth="3" />
  </svg>;
  if(mode==='ridge') return <svg viewBox="0 0 1080 920" width="100%" height="100%" style={{position:'absolute',inset:0}}>
    <defs><radialGradient id="throneglow"><stop stopColor="#d5ad57" stopOpacity=".35"/><stop offset="1" stopColor="#d5ad57" stopOpacity="0"/></radialGradient></defs>
    <ellipse cx="540" cy="480" rx="360" ry="380" fill="url(#throneglow)" opacity={pulse}/>
    <path d="M90 880V340 Q90 110 540 100 Q990 110 990 340 V880 M160 880V360 Q160 200 540 188 Q920 200 920 360 V880" fill="none" stroke="#897852" strokeOpacity=".52" strokeWidth="6"/>
    {[0,1,2,3,4,5].map(i=><path key={i} d={`M${205+i*134} 850V${340+Math.sin(i)*24} Q${205+i*67} 245 ${272+i*134} ${340+Math.sin(i)*24}V850`} fill="#101d20" stroke="#aa9667" strokeOpacity=".35" strokeWidth="3"/>)}
    <path d="M-20 880 Q540 780 1100 880" fill="none" stroke={gold} strokeOpacity=".5" strokeWidth="3"/><path d="M480 690V520 L540 455 600 520V690Z M465 690H615" fill="#172326" stroke="#c4a564" strokeWidth="4"/>
    <path d="M506 475 L514 438 540 459 567 438 575 475" fill="none" stroke="#e0bd71" strokeWidth="4" opacity={pulse}/>
  </svg>;
  if(mode==='siblings') return <><Person x={125} f={frame} side={1}/><Person x={710} f={frame+12} side={-1} golden/><div style={{position:'absolute',top:530,left:104,right:104,height:2,background:`linear-gradient(90deg,transparent,${gold},transparent)`,opacity:pulse}}/></>;
  if(mode==='split') return <><svg viewBox="0 0 1080 900" width="100%" height="100%" style={{position:'absolute',inset:0}}><path d={`M540 520 Q420 720 235 900 M540 520 Q690 720 870 900`} fill="none" stroke={gold} strokeWidth="4" strokeDasharray="14 18" strokeDashoffset={-frame*2}/><circle cx="540" cy="520" r="18" fill="#f3dfa6" opacity={pulse}/></svg><Person x={420} f={frame} side={1}/></>;
  if(mode==='mountain'||mode==='mountain2') return <>{ridge}<div style={{position:'absolute',bottom:590,left:125,right:125,textAlign:'center',fontSize:17,letterSpacing:4,color:'#e8cf91',opacity:.85}}>{mode==='mountain'?'SEBATUNG · DUNIA MANUSIA':'SARANJANA · KOTA DALAM LEGENDA'}</div></>;
  if(mode==='city') return <>{ridge}<div style={{position:'absolute',left:245,top:655,width:590,height:410,opacity:interpolate(frame,[0,75,220,240],[0,.85,.85,.35],{extrapolateRight:'clamp'}),filter:'drop-shadow(0 0 30px #ffd87888)',transform:`translateY(${Math.sin(frame/23)*8}px)`}}><svg viewBox="0 0 590 410" width="100%" height="100%"><path d="M0 365 Q140 350 285 365 T590 365" fill="none" stroke="#d8b96e" strokeOpacity=".6"/>{Array.from({length:6},(_,i)=>{const x=20+i*92;const h=175+(i%3)*32;return <g key={i} transform={`translate(${x} ${340-h})`}><path d={`M0 ${h}V${Math.round(h*.45)} Q2 ${Math.round(h*.34)} 18 ${Math.round(h*.34)} Q42 ${Math.round(h*.34)} 46 ${Math.round(h*.18)} Q53 0 66 ${Math.round(h*.18)} Q71 ${Math.round(h*.34)} 94 ${Math.round(h*.34)} Q${Math.round(h*1.16)} ${Math.round(h*.34)} ${Math.round(h*1.16)} ${Math.round(h*.48)}V${h}Z`} fill="#26383b" stroke="#e7cc83" strokeWidth="2"/><path d={`M${Math.round(h*.39)} ${Math.round(h*.72)} Q${Math.round(h*.58)} ${Math.round(h*.49)} ${Math.round(h*.78)} ${Math.round(h*.72)}V${h}H${Math.round(h*.39)}Z`} fill="#f1d38a" opacity={pulse*.42}/></g>})}</svg></div></>;
  if(mode==='source') return <div style={{position:'absolute',left:118,right:118,top:640,bottom:470,background:'linear-gradient(130deg,#d9cba8,#eee3c5)',boxShadow:'0 28px 70px #0009'}}><div style={{position:'absolute',left:32,right:32,top:32,borderBottom:'1px solid #706750',paddingBottom:18,fontSize:14,letterSpacing:4,color:'#655b46'}}>CATATAN SUMBER · LEGENDA LOKAL</div><div style={{position:'absolute',left:60,right:60,top:145,fontFamily:'Georgia,serif',fontSize:31,lineHeight:1.3,color:'#29271f'}}>Mitos dalam Legenda Kerajaan Pulau Halimun di Kabupaten Kotabaru</div><div style={{position:'absolute',left:60,right:60,top:340,fontSize:17,lineHeight:1.5,color:'#524a3a'}}>Normasunah · Jurnal Bahasa, Sastra dan Pembelajarannya · 2017</div><div style={{position:'absolute',left:60,right:60,bottom:58,fontSize:14,letterSpacing:1.1,color:'#675d49'}}>Kajian legenda dan mitos — bukan bukti peristiwa gaib.</div></div>;
  if(mode==='paper') return <div style={{position:'absolute',left:115,right:115,top:650,bottom:490,transform:`rotate(${Math.sin(frame/50)*.8}deg)`,background:'linear-gradient(125deg,#d7cba7,#a99b7a)',boxShadow:'0 30px 70px #0009',border:'1px solid #f0e1bc',opacity:.94}}><div style={{position:'absolute',inset:26,border:'1px solid #71684f88'}}/><div style={{position:'absolute',top:'45%',left:0,right:0,textAlign:'center',fontFamily:'Georgia,serif',color:'#332f27',fontSize:27,letterSpacing:4}}>{'ARSIP - PULAU LAUT'}</div><div style={{position:'absolute',top:'57%',left:100,right:100,height:1,background:'#58503d66'}}/></div>;
  if(mode==='search') return <><Topography frame={frame} index={index} muted/><div style={{position:'absolute',top:660,left:160,width:760,height:480,border:'2px solid #d9c28d66',background:'#08161acc',boxShadow:'0 0 100px #000'}}/><div style={{position:'absolute',top:710,left:210,color:gold,fontSize:17,letterSpacing:5}}>PETA · SKEMA LOKASI</div><div style={{position:'absolute',left:225,top:835,color:'#eee6d2',fontSize:35,fontFamily:'Georgia,serif'}}>SARANJANA</div><div style={{position:'absolute',left:225,top:940,color:'#9ca8a0',fontSize:16,letterSpacing:2}}>LABEL PADA PETA ≠ BUKTI KOTA GAIB</div><div style={{position:'absolute',left:180+Math.sin(frame/18)*270,top:825,width:18,height:100,borderLeft:`2px solid ${gold}`,opacity:.8}}/></>;
  if(mode==='vanish') return <><svg viewBox="0 0 1080 900" width="100%" height="100%" style={{position:'absolute',inset:0}}><path d={`M0 690 Q170 560 320 650 T590 670 T820 590 T1080 700`} fill="none" stroke="#bc9c57" strokeOpacity=".4" strokeWidth="3" strokeDasharray="8 15" strokeDashoffset={-frame*1.5}/><path d={`M0 760 Q190 650 345 730 T650 740 T900 660 T1080 735`} fill="none" stroke="#859691" strokeOpacity=".32" strokeWidth="2"/><ellipse cx={520+Math.sin(frame/20)*28} cy="570" rx="260" ry="132" fill="#d4b66e" opacity={.13+pulse*.12} filter="blur(55px)"/></svg><div style={{position:'absolute',left:150,right:150,top:650,height:360,borderTop:`1px solid ${gold}55`,borderBottom:'1px solid #abb2a633',transform:`skewY(${Math.sin(frame/30)*2}deg)`,opacity:.45}}/></>;
  if(mode==='markers') return <div style={{position:'absolute',left:160,right:110,top:710,height:530,borderLeft:'2px solid #e5bd69',display:'flex',flexDirection:'column',justifyContent:'space-around',paddingLeft:40,color:'#efe7d4',fontSize:20,letterSpacing:2}}><span>LEGENDA PULAU HALIMUN</span><span>GUNUNG SEBATUNG</span><span>GUNUNG SARANJANA</span></div>;
  if(mode==='orbit') return <><Topography frame={frame} index={index}/>{['PULAU LAUT','SEBATUNG','SARANJANA'].map((label,i)=><div key={label} style={{position:'absolute',left:[165,585,300][i],top:[710,920,1150][i],padding:'14px 22px',border:`1px solid ${gold}88`,background:'#091920df',color:i===2?'#eee7d5':gold,fontSize:19,letterSpacing:2,transform:`translateY(${Math.sin(frame/16+i)*12}px) rotate(${(i-1)*4}deg)`}}>{label}</div>)}</>;
  if(mode==='ending') return <><div style={{position:'absolute',left:0,right:0,bottom:155,height:930,overflow:'hidden'}}><svg viewBox="0 0 1080 930" width="100%" height="100%"><circle cx="810" cy="185" r="52" fill="#dfc98d" opacity=".8"/><circle cx="810" cy="185" r="115" fill="#dfc98d" opacity=".12"/><path d="M-40 785 Q120 620 250 710 Q390 805 530 650 Q680 490 815 670 Q950 795 1120 625 V960 H-40Z" fill="#1c3033" stroke="#9ca694" strokeOpacity=".35" strokeWidth="3"/><path d="M-40 850 Q140 710 305 800 Q465 880 640 735 Q790 610 930 785 Q1010 875 1120 740 V960 H-40Z" fill="#101f25"/><path d="M-40 890H1120" stroke={gold} strokeOpacity=".55" strokeWidth="2"/></svg></div><div style={{position:'absolute',left:0,right:0,top:665,textAlign:'center',fontFamily:'Georgia,serif',fontSize:31,color:'#f0e8d8',letterSpacing:2}}>MENDEKAT <span style={{color:gold}}>ATAU</span> PULANG?</div><div style={{position:'absolute',left:766,top:990,width:15,height:15,borderRadius:50,background:'#ffe79e',boxShadow:'0 0 36px 18px #e7be6c99',opacity:.25+.75*Math.max(0,Math.sin(frame/18))}}/></>;
  if(mode==='hook') return <>{ridge}<Topography frame={frame} index={index}/><div style={{position:'absolute',top:640,left:0,right:0,textAlign:'center',color:'#e9c879',fontSize:16,letterSpacing:6}}>PULAU LAUT · KOTABARU</div></>;
  return <><Topography frame={frame} index={index}/>{mode==='map'&&<><div style={{position:'absolute',left:160,top:660,color:'#d8d0bc',fontSize:18,letterSpacing:4}}>KALIMANTAN SELATAN</div><div style={{position:'absolute',left:580,top:900,color:gold,fontSize:18,letterSpacing:3}}>PULAU LAUT</div><svg style={{position:'absolute',inset:0}} viewBox="0 0 1080 1920"><path d={`M260 675 Q500 730 650 920`} fill="none" stroke={gold} strokeWidth="3" strokeDasharray="9 12" strokeDashoffset={-frame}/></svg></>}</>;
};

const BeatVisual:React.FC<{index:number}> = ({index}) => {
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const b=beats[index];const local=frame-index*8*fps;const reveal=interpolate(local,[0,24],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});const textPhase=local%(fps*4);const displayText=local<fps*4?b.text:followUp[index];const textOpacity=interpolate(textPhase,[0,12,102,120],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const zoom=interpolate(local,[0,240],[1.02,1.065],{extrapolateRight:'clamp'});const chapter=(index+1).toString().padStart(2,'0');
  const wash:Record<Mode,string>={hook:'#13272d',paper:'#3a3428',map:'#132e31',ridge:'#30241d',siblings:'#24302a',split:'#18272e',mountain:'#273431',mountain2:'#222a3b',vanish:'#17131d',city:'#2b211c',search:'#142934',orbit:'#1b2b2b',source:'#3b3326',markers:'#26332a',ending:'#102330'};
  const last=index===beats.length-1;
  return <AbsoluteFill style={{background:ink,opacity:reveal,overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,transform:`scale(${zoom})`,background:`radial-gradient(ellipse at 50% 44%,${wash[b.mode]} 0%,#0b1c23 50%,#061219 100%)`}}/>
    <div style={{position:'absolute',inset:'0 0 42%',background:'linear-gradient(180deg,#08141ac9,transparent)'}}/>
    <SceneArt mode={b.mode} frame={local} index={index}/>
    <div style={{position:'absolute',left:76,right:76,top:100,display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'Arial,sans-serif'}}>
      <div style={{display:'flex',gap:13,alignItems:'center'}}><div style={{width:34,height:2,background:gold}}/><div style={{fontSize:15,fontWeight:700,letterSpacing:4,color:'#d8c28f'}}>JEJAK PULAU HALIMUN</div></div>
      <div style={{fontSize:14,letterSpacing:2,color:'#83969a'}}>{chapter} / 15</div>
    </div>
    <div style={{position:'absolute',top:244,left:80,right:80,opacity:interpolate(local,[0,15],[0,1],{extrapolateRight:'clamp'}),transform:`translateY(${interpolate(local,[0,20],[25,0],{extrapolateRight:'clamp',easing:ease})}px)`}}>
      <div style={{fontFamily:'Arial,sans-serif',fontSize:15,fontWeight:700,letterSpacing:5,color:gold,marginBottom:22}}>{b.chapter}</div>
      <div style={{height:2,width:interpolate(local,[0,36],[0,190],{extrapolateRight:'clamp',easing:ease}),background:gold,marginBottom:26}}/>
    </div>
    <div style={{position:'absolute',left:76,right:76,bottom:335,minHeight:350,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{position:'absolute',inset:'0 0 0',background:'linear-gradient(180deg,#06121900,#061219e8 21%,#061219ee 100%)'}}/>
      <div style={{position:'relative',width:'100%',maxWidth:930,opacity:textOpacity,transform:`translateY(${interpolate(textPhase,[0,24],[24,0],{extrapolateRight:'clamp',easing:ease})}px)`}}>
        <div style={{fontFamily:'Georgia,serif',fontSize:displayText.length>100?44:displayText.length>72?48:55,fontWeight:600,lineHeight:1.24,color:'#f2eee3',textShadow:'0 5px 28px #000',letterSpacing:-.5}}>{displayText}</div>
        <div style={{display:'flex',alignItems:'center',gap:12,marginTop:28}}><div style={{width:5,height:5,borderRadius:10,background:gold}}/><div style={{fontFamily:'Arial,sans-serif',fontSize:12,letterSpacing:2.1,color:'#b5b3a9'}}>{b.note}</div></div>
      </div>
    </div>
    <div style={{position:'absolute',left:78,right:78,bottom:145,height:2,background:'#8d9da044'}}><div style={{height:'100%',width:`${(index+local/(fps*8))/beats.length*100}%`,background:gold}}/></div>
    <div style={{position:'absolute',left:80,right:80,bottom:88,display:'flex',justifyContent:'space-between',fontFamily:'Arial,sans-serif',fontSize:13,letterSpacing:2,color:'#a0a9a3'}}><span>LEGENDA · KOTABARU</span><span>{last?'TULIS PILIHANMU':'CERITA LISAN · REKONSTRUKSI'}</span></div>
  </AbsoluteFill>;
};

export const PulauHalimunFilm:React.FC = () => {
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const index=Math.min(beats.length-1,Math.floor(frame/(fps*8)));const previous=Math.max(0,index-1);const local=frame-index*8*fps;const cut=interpolate(local,[0,14],[0,1],{extrapolateRight:'clamp',easing:ease});
  return <AbsoluteFill style={{background:ink}}>
    {index>0&&<BeatVisual index={previous}/>}
    <AbsoluteFill style={{opacity:index===0?1:cut}}><BeatVisual index={index}/></AbsoluteFill>
  </AbsoluteFill>;
};






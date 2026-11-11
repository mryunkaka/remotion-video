import React from 'react';
import {rnd} from '../lib';
const skin = ['#b98458', '#8a5a38', '#4a2c1c'];

// Rekonstruksi artistik Datu Mabrur: pria dewasa, ikat kepala (laung), baju sederhana, kain bermotif sasirangan. Konsisten di semua pose.
export const Portrait: React.FC<{t: number; eyes?: 'open' | 'closed'; tension?: number; light?: number; w?: number; glow?: string}> = ({t, eyes = 'open', tension = 0, light = 1, w = 800, glow = 'rgba(255,200,130,0.55)'}) => {
  const bl = (Math.sin(t * 0.9) > 0.985 ? 0 : 1); const breathe = Math.sin(t * 1.3) * 3;
  const bi = 12 * tension; // inner brow lowering when tense
  return (
    <svg width={w} height={w * 1.25} viewBox="0 0 800 1000" style={{overflow: 'visible'}}>
      <defs>
        <radialGradient id="pk" cx="0.62" cy="0.4" r="0.75"><stop offset="0" stopColor="#c99565" /><stop offset="0.6" stopColor="#8a5a38" /><stop offset="1" stopColor="#3a2216" /></radialGradient>
        <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5c4630" /><stop offset="1" stopColor="#1f170f" /></linearGradient>
        <linearGradient id="pc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1d2a52" /><stop offset="1" stopColor="#0e1530" /></linearGradient>
        <linearGradient id="ps" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000" stopOpacity={0.82 * light + 0.1} /><stop offset="0.5" stopColor="#000" stopOpacity={0.3} /><stop offset="1" stopColor="#000" stopOpacity="0" /></linearGradient>
        <linearGradient id="pr" x1="0" y1="0" x2="1" y2="0"><stop offset="0.7" stopColor={glow} stopOpacity="0" /><stop offset="1" stopColor={glow} stopOpacity={0.9 * light} /></linearGradient>
        <clipPath id="hc"><path d="M400,170 C300,170 250,260 250,380 C250,500 280,600 340,650 C370,675 430,675 460,650 C520,600 550,500 550,380 C550,260 500,170 400,170 Z" /></clipPath>
        <clipPath id="bc"><path d="M0,1000 L40,860 C90,800 220,770 300,750 L500,750 C580,770 710,800 760,860 L800,1000 Z" /></clipPath>
      </defs>
      <g transform={`translate(0,${breathe})`}>
        <path d="M0,1000 L40,860 C90,800 220,770 300,750 L500,750 C580,770 710,800 760,860 L800,1000 Z" fill="url(#pg)" />
        <g clipPath="url(#bc)"><path d="M120,1000 L330,760 L400,800 L240,1000 Z" fill="#7a2f2a" opacity="0.55" /><path d="M300,750 L400,890 L500,750" fill="none" stroke="#a88a58" strokeOpacity="0.35" strokeWidth="5" /></g>
        <path d="M335,630 L335,770 Q400,830 465,770 L465,630 Z" fill="#6f4529" />
        <ellipse cx="248" cy="410" rx="20" ry="42" fill="#7b4f33" /><ellipse cx="552" cy="410" rx="20" ry="42" fill="#7b4f33" />
        <path d="M400,170 C300,170 250,260 250,380 C250,500 280,600 340,650 C370,675 430,675 460,650 C520,600 550,500 550,380 C550,260 500,170 400,170 Z" fill="url(#pk)" />
        <g clipPath="url(#hc)">
          <path d="M335,560 Q370,546 400,557 Q430,546 465,560 Q430,586 400,575 Q370,586 335,560 Z" fill="#2f2a27" />
          <path d="M300,590 Q318,700 400,712 Q482,700 500,590 Q460,636 400,640 Q340,636 300,590 Z" fill="#403a35" />
          <path d="M330,630 q30,26 70,24 M470,630 q-30,26 -70,24" stroke="#8d8680" strokeWidth="2" opacity="0.5" fill="none" />
        </g>
        <path d="M365,592 Q400,602 435,592" stroke="#5a2a22" strokeWidth="5" strokeLinecap="round" fill="none" opacity={0.85} />
        {/* nose */}
        <path d="M388,440 Q380,500 368,524 Q400,544 432,524 Q420,500 412,440" fill="none" stroke="#3a2216" strokeOpacity="0.45" strokeWidth="5" strokeLinejoin="round" />
        <ellipse cx="383" cy="526" rx="9" ry="5" fill="#2a170e" opacity="0.6" /><ellipse cx="417" cy="526" rx="9" ry="5" fill="#2a170e" opacity="0.6" />
        {/* brows */}
        <path d={`M296,${392 + bi * 0.2} Q340,${366} 388,${392 + bi}`} stroke="#241810" strokeWidth="13" strokeLinecap="round" fill="none" />
        <path d={`M504,${392 + bi * 0.2} Q460,${366} 412,${392 + bi}`} stroke="#241810" strokeWidth="13" strokeLinecap="round" fill="none" />
        {/* eyes */}
        {eyes === 'closed' || !bl ? (
          <g stroke="#1c1008" strokeWidth="6" strokeLinecap="round" fill="none"><path d="M306,428 Q345,448 384,428" /><path d="M416,428 Q455,448 494,428" /></g>
        ) : (
          <g>
            {[345, 455].map((cx, i) => (<g key={i}><path d={`M${cx - 40},428 Q${cx},${404 + tension * 6} ${cx + 40},428 Q${cx},${446} ${cx - 40},428 Z`} fill="#e4d6c0" /><circle cx={cx + (i ? -2 : 2)} cy="427" r="12.5" fill="#2a170c" /><circle cx={cx + (i ? 1 : 5)} cy="423" r="3.2" fill="#fff" opacity="0.8" /><path d={`M${cx - 42},427 Q${cx},${400 + tension * 6} ${cx + 42},427`} stroke="#1c1008" strokeWidth="5" fill="none" strokeLinecap="round" /></g>))}
          </g>
        )}
        {/* forehead creases */}
        <path d="M320,340 q80,-14 160,0 M326,318 q74,-12 148,0" stroke="#3a2216" strokeWidth="2.4" opacity="0.28" fill="none" />
        <path d="M300,470 q-8,40 6,80 M500,470 q8,40 -6,80" stroke="#3a2216" strokeWidth="2.4" opacity="0.2" fill="none" />
        {/* headcloth (laung) */}
        <path d="M243,372 C236,232 318,126 400,122 C490,126 568,232 557,372 C548,306 500,252 400,248 C300,252 252,306 243,372 Z" fill="url(#pc)" />
        <path d="M262,300 C300,200 360,172 430,172 M300,270 C330,215 380,190 450,192 M245,350 C250,300 280,260 330,236" stroke="#c9a45c" strokeWidth="3" fill="none" opacity="0.5" />
        <path d="M512,170 C580,120 650,140 654,205 C606,190 566,204 530,240 Z" fill="url(#pc)" /><path d="M520,190 C570,150 620,160 640,195" stroke="#c9a45c" strokeWidth="2.5" fill="none" opacity="0.5" />
        {/* lighting */}
        <rect x="0" y="0" width="800" height="1000" fill="url(#ps)" />
        <g clipPath="url(#hc)"><rect x="0" y="0" width="800" height="1000" fill="url(#pr)" /></g>
      </g>
    </svg>
  );
};

const Cloth: React.FC<{x: number; y: number; t: number; len?: number; color?: string; dir?: number}> = ({x, y, t, len = 90, color = '#1d2a52', dir = 1}) => {
  const a = Math.sin(t * 2.6) * 10, b = Math.sin(t * 3.1 + 1) * 14;
  return <path d={`M${x},${y} q${dir * len * 0.4},${a} ${dir * len * 0.7},${b - 6} t${dir * len * 0.5},${a + 10} l-6,18 q${-dir * len * 0.5},${-a - 6} ${-dir * len},${-b + 2} Z`} fill={color} />;
};
export const Seated: React.FC<{t: number; w?: number; rim?: string; dark?: number}> = ({t, w = 600, rim = 'rgba(255,196,120,0.9)', dark = 0.55}) => (
  <svg width={w} height={w * 1.17} viewBox="0 0 600 700" style={{overflow: 'visible'}}>
    <defs>
      <linearGradient id="sg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0b0f16" /><stop offset="1" stopColor="#2b2218" /></linearGradient>
      <linearGradient id="sr" x1="0" y1="0" x2="1" y2="0"><stop offset="0.6" stopColor={rim} stopOpacity="0" /><stop offset="1" stopColor={rim} stopOpacity="0.9" /></linearGradient>
      <pattern id="sas" width="40" height="22" patternUnits="userSpaceOnUse"><path d="M0,11 Q10,0 20,11 T40,11" stroke="#c9a45c" strokeWidth="2" fill="none" opacity="0.4" /></pattern>
      <clipPath id="sc"><path id="seat" d="M60,640 C60,560 160,520 300,520 C440,520 540,560 540,640 C540,670 480,690 300,690 C120,690 60,670 60,640 Z" /></clipPath>
    </defs>
    <g>
      <path d="M60,640 C60,560 160,520 300,520 C440,520 540,560 540,640 C540,670 480,690 300,690 C120,690 60,670 60,640 Z" fill="#101b2e" />
      <g clipPath="url(#sc)"><rect width="600" height="700" fill="url(#sas)" /><rect width="600" height="700" fill="url(#sr)" /></g>
      <path d="M200,545 C190,420 215,330 260,290 L340,290 C385,330 410,420 400,545 Z" fill="#3a2d20" />
      <path d="M215,335 C168,405 148,485 172,552 L214,552 C210,478 226,408 252,356 Z" fill="#33281c" /><path d="M385,335 C432,405 452,485 428,552 L386,552 C390,478 374,408 348,356 Z" fill="#33281c" />
      <ellipse cx="192" cy="556" rx="22" ry="14" fill="#7c4e30" /><ellipse cx="408" cy="556" rx="22" ry="14" fill="#7c4e30" />
      <rect x="282" y="262" width="36" height="36" fill="#6f4529" />
      <ellipse cx="300" cy="232" rx="42" ry="52" fill="#8a5a38" />
      <path d="M257,230 C254,170 290,148 300,148 C312,148 346,170 343,230 C336,196 318,184 300,184 C282,184 264,196 257,230 Z" fill="#1d2a52" />
      <path d="M262,214 C276,180 300,172 330,180" stroke="#c9a45c" strokeWidth="2" fill="none" opacity="0.5" />
      <Cloth x={338} y={168} t={t} color="#1d2a52" len={80} />
      <rect x="0" y="0" width="600" height="700" fill="#000" opacity={dark * 0.0} />
      <path d="M340,290 C385,330 410,420 400,545" stroke={rim} strokeWidth="5" fill="none" opacity="0.7" />
      <path d="M343,200 C346,215 345,232 340,250" stroke={rim} strokeWidth="4" fill="none" opacity="0.8" />
      <path d="M512,586 C520,610 520,630 512,650" stroke={rim} strokeWidth="4" fill="none" opacity="0.6" />
    </g>
  </svg>
);
export const Standing: React.FC<{t: number; w?: number; rim?: string}> = ({t, w = 360, rim = 'rgba(255,205,140,0.9)'}) => (
  <svg width={w} height={w * 2.35} viewBox="0 0 360 846" style={{overflow: 'visible'}}>
    <path d="M130,470 L108,830 L252,830 L230,470 Z" fill="#0d1523" />
    <path d="M130,470 L108,830 L146,830 L150,470 Z" fill="#162033" opacity="0.7" />
    <path d="M150,300 C140,250 160,214 180,214 C200,214 220,250 210,300 Z" fill="#14100c" />
    <path d="M112,250 C84,320 80,420 98,520 L134,516 C128,430 134,340 160,276 Z" fill="#1c150f" /><path d="M248,250 C276,320 280,420 262,520 L226,516 C232,430 226,340 200,276 Z" fill="#1c150f" />
    <path d="M120,236 C140,208 220,208 240,236 L252,480 L108,480 Z" fill="#1a130d" />
    <ellipse cx="180" cy="180" rx="30" ry="38" fill="#1a110b" />
    <path d="M150,170 C148,126 172,112 180,112 C190,112 214,126 210,170 C204,148 192,140 180,140 C168,140 156,148 150,170 Z" fill="#0f1730" />
    <Cloth x={206} y={126} t={t} color="#0f1730" len={110} />
    <Cloth x={236} y={392} t={t + 1} color="#1b2640" len={120} />
    <path d="M210,250 C236,290 242,380 234,470" stroke={rim} strokeWidth="4" fill="none" opacity="0.75" />
    <path d="M208,126 C214,150 212,170 206,190" stroke={rim} strokeWidth="3.5" fill="none" opacity="0.85" />
  </svg>
);
export const Hand: React.FC<{w?: number; glow?: number}> = ({w = 420, glow = 0}) => (
  <svg width={w} height={w * 0.6} viewBox="0 0 420 252" style={{overflow: 'visible'}}>
    <defs><radialGradient id="hg"><stop offset="0" stopColor="#ffe2a8" stopOpacity={glow} /><stop offset="1" stopColor="#ffe2a8" stopOpacity="0" /></radialGradient><linearGradient id="hk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#a56f46" /><stop offset="1" stopColor="#5a3721" /></linearGradient></defs>
    <path d="M0,40 C60,30 140,50 200,92 L292,120 C322,124 336,140 322,152 L300,152 C316,160 316,174 300,178 L282,176 C292,186 288,200 272,200 L226,190 C170,200 80,170 0,150 Z" fill="url(#hk)" />
    <path d="M200,92 L292,120" stroke="#e8b080" strokeWidth="3" opacity="0.5" fill="none" />
    <path d="M0,40 C60,30 140,50 200,92" stroke="#ffcf94" strokeWidth="4" opacity="0.6" fill="none" />
    <ellipse cx="300" cy="150" rx="150" ry="100" fill="url(#hg)" />
  </svg>
);

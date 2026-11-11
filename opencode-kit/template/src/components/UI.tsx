import React from 'react';
import {W, H, C, clamp, prog, easeOut, ease, useT} from '../lib';
import {F} from '../fonts';
import subs from '../data/subtitles.json';

export const Crescent: React.FC<{s?: number; glow?: number}> = ({s = 1, glow = 0.5}) => (
  <svg width={120 * s} height={120 * s} viewBox="0 0 120 120" style={{overflow: 'visible'}}>
    <defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6e2b0" /><stop offset="1" stopColor="#b98f45" /></linearGradient><radialGradient id="cgl"><stop offset="0" stopColor="#ffe9b8" stopOpacity={glow} /><stop offset="1" stopColor="#ffe9b8" stopOpacity="0" /></radialGradient></defs>
    <circle cx="60" cy="58" r="78" fill="url(#cgl)" />
    <mask id="cm"><rect width="120" height="120" fill="#000" /><circle cx="58" cy="56" r="46" fill="#fff" /><circle cx="78" cy="46" r="40" fill="#000" /></mask><rect width="120" height="120" fill="url(#cg)" mask="url(#cm)" />
    <path d="M26,104 q17,-9 34,0 t34,0" stroke="#e9cf94" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.9" />
    <path d="M36,114 q12,-6 24,0 t24,0" stroke="#e9cf94" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
  </svg>
);
export const Header: React.FC<{t: number}> = ({t}) => {
  const o = clamp(t / 0.8);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 112, display: 'flex', justifyContent: 'center', opacity: o, transform: `translateY(${(1 - easeOut(o)) * -14}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '12px 28px 12px 20px', borderRadius: 60, background: 'rgba(3,12,20,0.38)', border: '1px solid rgba(201,164,92,0.45)', boxShadow: '0 4px 24px rgba(0,0,0,0.35)'}}>
        <Crescent s={0.36} glow={0.0} />
        <span style={{fontFamily: F.sans, fontWeight: 600, fontSize: 30, letterSpacing: '0.1em', color: C.white, textShadow: '0 2px 10px rgba(0,0,0,0.6)'}}>terangbulan.media</span>
      </div>
    </div>
  );
};
const KEY = /(Datu Mabrur|Pulau Halimun|Raja Ikan Todak|Saijaan|Kotabaru|Pulau Laut|janji|penguasa lautan|ikan todak raksasa|LIKE|FOLLOW|SHARE|@terangbulan\.media)/g;
const hl = (s: string) => s.split(KEY).map((p, i) => (i % 2 ? <span key={i} style={{color: C.goldLight}}>{p}</span> : <React.Fragment key={i}>{p}</React.Fragment>));
export const Subtitle: React.FC<{t: number}> = ({t}) => {
  const c: any = (subs as any[]).find((x) => !x.hide && t >= x.start && t < x.end);
  if (!c) return null;
  const a = Math.min(prog(t, c.start, c.start + 0.14), prog(c.end - t, 0, 0.14));
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top: 1368, display: 'flex', justifyContent: 'center', opacity: a, transform: `translateY(${(1 - a) * 10}px)`}}>
      <div style={{padding: '16px 34px', borderRadius: 22, background: 'rgba(2,10,18,0.5)', textAlign: 'center', fontFamily: F.sans, fontWeight: 600, fontSize: 45, lineHeight: 1.28, color: C.white, textShadow: '0 2px 10px rgba(0,0,0,0.8)', letterSpacing: '0.005em', maxWidth: 980}}>
        {c.lines.map((l: string, i: number) => <div key={i}>{hl(l)}</div>)}
      </div>
    </div>
  );
};
export const Kinetic: React.FC<{text: string; t: number; t0: number; size?: number; spacing?: number; font?: string; weight?: number; color?: string; per?: number; style?: React.CSSProperties; fadeOut?: [number, number]; italic?: boolean}> = ({text, t, t0, size = 96, spacing = 0.16, font = F.title, weight = 700, color = C.white, per = 0.045, style, fadeOut, italic}) => {
  const fo = fadeOut ? 1 - prog(t, fadeOut[0], fadeOut[1]) : 1;
  const words = text.split(' '); let idx = 0;
  return (
    <div style={{textAlign: 'center', fontFamily: font, fontWeight: weight, fontSize: size, letterSpacing: `${spacing}em`, color, opacity: fo, fontStyle: italic ? 'italic' : 'normal', textShadow: '0 4px 28px rgba(0,0,0,0.75)', ...style}}>
      {words.map((w, wi) => (
        <span key={wi} style={{display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.32em'}}>
          {w.split('').map((ch, ci) => { const k = idx++; const p = easeOut(prog(t, t0 + k * per, t0 + k * per + 0.7)); return <span key={ci} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 26}px)`, filter: p < 1 ? `blur(${(1 - p) * 6}px)` : undefined}}>{ch}</span>; })}
        </span>
      ))}
    </div>
  );
};
export const Fade: React.FC<{t: number; a: number; b: number; out?: [number, number]; children: React.ReactNode; style?: React.CSSProperties}> = ({t, a, b, out, children, style}) => {
  const o = easeOut(prog(t, a, b)) * (out ? 1 - prog(t, out[0], out[1]) : 1);
  return <div style={{position: 'absolute', inset: 0, opacity: o, ...style}}>{children}</div>;
};
export const Rule: React.FC<{t: number; t0: number; w?: number}> = ({t, t0, w = 220}) => (<div style={{height: 2, width: w * easeOut(prog(t, t0, t0 + 0.9)), background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: '0 auto'}} />);
export const Heart = ({s = 1}: any) => (<svg width={90 * s} height={90 * s} viewBox="0 0 24 24" fill="none" stroke="#f3efe6" strokeWidth="1.6" strokeLinejoin="round"><path d="M12 20.5s-7.5-4.6-9-9.2C2 8 4 5.5 7 5.5c1.8 0 3.3 1 5 3 1.7-2 3.2-3 5-3 3 0 5 2.5 4 5.8-1.5 4.6-9 9.2-9 9.2z" fill="rgba(201,164,92,0.25)" /></svg>);
export const Follow = ({s = 1}: any) => (<svg width={90 * s} height={90 * s} viewBox="0 0 24 24" fill="none" stroke="#f3efe6" strokeWidth="1.6" strokeLinecap="round"><circle cx="10" cy="8" r="3.6" fill="rgba(201,164,92,0.25)" /><path d="M3.5 20c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5" /><path d="M19 7v6M16 10h6" /></svg>);
export const Share = ({s = 1}: any) => (<svg width={90 * s} height={90 * s} viewBox="0 0 24 24" fill="none" stroke="#f3efe6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 13v5a2 2 0 002 2h12a2 2 0 002-2v-5" /><path d="M12 15V3M7.5 7.5L12 3l4.5 4.5" /></svg>);
export const Comment = ({s = 1}: any) => (<svg width={90 * s} height={90 * s} viewBox="0 0 24 24" fill="none" stroke="#f3efe6" strokeWidth="1.6" strokeLinejoin="round"><path d="M4 5h16v11H10l-5 4v-4H4z" fill="rgba(201,164,92,0.25)" /><path d="M8 9.5h8M8 12.5h5" strokeLinecap="round" /></svg>);
export const Pin: React.FC<{t: number}> = ({t}) => (
  <svg width="120" height="160" viewBox="0 0 120 160" style={{overflow: 'visible'}}>
    {[0, 1].map((i) => { const p = ((t * 0.7 + i * 0.5) % 1); return <ellipse key={i} cx="60" cy="140" rx={20 + p * 90} ry={(20 + p * 90) * 0.28} fill="none" stroke={C.goldLight} strokeWidth="2.5" opacity={(1 - p) * 0.8} />; })}
    <path d="M60,148 C30,100 20,84 20,60 a40,40 0 1 1 80,0 c0,24 -10,40 -40,88 Z" fill={C.gold} stroke="#fff3d0" strokeWidth="3" /><circle cx="60" cy="58" r="15" fill="#0b2233" />
  </svg>
);

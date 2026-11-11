import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FONT_HEAD, FONT_SANS, FPS, W, Z} from '../lib/layout';
import {clamp, ease} from '../lib/util';
import {Block, CardStep, Cam, Shot, cards, labelBlocks, refBlocks} from '../data/beats';
import {GrainSoft, Vignette} from './art';

export const camTransform = (cam: Cam, p: number, f: number, dt?: number) => {
  const a = cam.a, e = ease(p);
  let s = 1, tx = 0, ty = 0;
  switch (cam.k) {
    case 'push': s = 1 + a * e; break;
    case 'pull': s = 1 + a * (1 - e); break;
    case 'panL': s = 1 + a * 1.2; tx = (e - 0.5) * a * W; break;
    case 'panR': s = 1 + a * 1.2; tx = (0.5 - e) * a * W; break;
    case 'tiltUp': s = 1 + a * 1.2; ty = (e - 0.5) * a * 1920; break;
    case 'tiltDown': s = 1 + a * 1.2; ty = (0.5 - e) * a * 1920; break;
    default: s = 1 + a * p; tx = Math.sin(f / 45) * 7; ty = Math.sin(f / 31) * 5; // track
  }
  if (dt !== undefined && dt >= 0 && dt < 0.3) { // satu hentakan singkat, bukan getar terus-menerus
    const k = Math.exp(-dt * 14);
    tx += Math.sin(dt * 90) * 9 * k; ty += Math.cos(dt * 70) * 6 * k;
  }
  return `translate(${tx}px,${ty}px) scale(${s})`;
};

const TITLE_SIZE = {lg: 84, md: 52, sm: 34} as const;

/** Satu komponen layout untuk SEMUA scene: kamera, judul shot, vignette, grain, transisi. */
export const Frame: React.FC<{shot: Shot; f: number; dur: number; dt?: number; abs: number; children: React.ReactNode}> = ({shot, f, dur, dt, abs, children}) => {
  const p = clamp(f / dur);
  const opIn = shot.tr.k === 'dissolve' ? clamp(f / shot.tr.f) : 1;
  const dipIn = shot.tr.k === 'dip' ? 1 - clamp(f / shot.tr.f) : 0;
  const dipOut = shot.dipOut ? clamp((f - (dur - shot.dipOut)) / shot.dipOut) : 0;
  const jsDark = dt !== undefined && dt >= 0 && dt < 0.3 ? 0.35 * (1 - dt / 0.3) : 0; // menggelap, bukan flash putih
  const t = shot.title;
  const to = t ? clamp((abs - t.from) / 0.45) * clamp((t.to - abs) / 0.45) : 0;
  const ts = t ? TITLE_SIZE[t.size] : 0;
  const letter = t && t.size === 'lg' ? 3 + (1 - clamp((abs - t.from) / 1.6)) * 10 : 2;
  return (
    <AbsoluteFill style={{opacity: opIn, overflow: 'hidden', background: '#000'}}>
      <div style={{position: 'absolute', inset: 0, transform: camTransform(shot.cam, p, f, dt), transformOrigin: '540px 960px'}}>{children}</div>
      <Vignette />
      <GrainSoft frame={f} />
      {t && (
        <div style={{position: 'absolute', top: Z.titleTop, left: 40, right: 40, textAlign: 'center', fontFamily: FONT_HEAD, fontWeight: 900, fontSize: ts, lineHeight: 1.1, letterSpacing: letter, color: '#f4ead2', textShadow: '0 4px 26px rgba(0,0,0,.9)', opacity: to, transform: `translateY(${(1 - to) * 10}px)`}}>{t.text}</div>
      )}
      <AbsoluteFill style={{background: '#000', opacity: Math.max(jsDark, dipIn, dipOut), pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};

/* ---------- label & referensi PERSISTEN per blok: fade hanya saat teks berganti ---------- */
const blockOpacity = (b: Block, t: number) => clamp((t - b.from) / 0.4) * clamp((b.to - t) / 0.4);
export const LabelLayer: React.FC<{frame: number}> = ({frame}) => {
  const t = frame / FPS;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {labelBlocks.map((b, i) => blockOpacity(b, t) > 0 && (
        <div key={'l' + i} style={{position: 'absolute', top: Z.labelTop, left: 40, right: 40, textAlign: 'center', fontFamily: FONT_SANS, fontWeight: 600, fontSize: 26, letterSpacing: 4, color: 'rgba(238,228,205,.86)', textShadow: '0 2px 10px rgba(0,0,0,.9)', opacity: blockOpacity(b, t)}}>{b.text}</div>
      ))}
      {refBlocks.map((b, i) => blockOpacity(b, t) > 0 && (
        <div key={'r' + i} style={{position: 'absolute', top: Z.refTop, left: 40, right: 40, textAlign: 'center', fontFamily: FONT_SANS, fontSize: 24, color: 'rgba(222,228,234,.55)', whiteSpace: 'nowrap', opacity: blockOpacity(b, t)}}>{b.text}</div>
      ))}
    </AbsoluteFill>
  );
};

/* ---------- kartu fakta / pertanyaan / CTA: teks muncul bertahap sinkron cue, di atas latar hidup ---------- */
const CardBlock: React.FC<{c: CardStep; t: number}> = ({c, t}) => {
  if (t < c.t - 0.05 || t > c.to + 0.6) return null;
  const out = clamp((c.to + 0.5 - t) / 0.5);
  return (
    <div style={{position: 'absolute', left: 70, right: 70, top: c.top, textAlign: 'center', opacity: out}}>
      {c.lines.map((l, i) => {
        const k = clamp((t - c.t - (l.delay ?? 0)) / 0.5);
        const style: React.CSSProperties = l.pill
          ? {margin: '18px auto', width: 560, padding: '14px 0', borderRadius: 60, border: '2px solid rgba(240,220,170,.6)', background: 'rgba(0,0,0,.35)'}
          : {margin: '14px 0'};
        return (
          <div key={i} style={{...style, fontFamily: l.head || l.pill ? FONT_HEAD : FONT_SANS, fontWeight: l.head || l.pill ? 900 : 600, fontSize: l.size, lineHeight: 1.22, letterSpacing: l.pill ? 6 : l.head ? 1 : 3, color: l.color ?? '#f1e8d0', textShadow: '0 4px 22px rgba(0,0,0,.85)', opacity: k, transform: `translateY(${(1 - k) * 18}px)`}}>{l.text}</div>
        );
      })}
    </div>
  );
};
export const CardLayer: React.FC<{frame: number}> = ({frame}) => {
  const t = frame / FPS;
  return <AbsoluteFill style={{pointerEvents: 'none'}}>{cards.map((c, i) => <CardBlock key={i} c={c} t={t} />)}</AbsoluteFill>;
};

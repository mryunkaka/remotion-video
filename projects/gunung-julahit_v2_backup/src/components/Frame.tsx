import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FONT_HEAD, FONT_SANS, W, Z} from '../lib/layout';
import {clamp, ease} from '../lib/util';
import {Beat, Cam, REF_TEXT} from '../data/beats';
import {GrainSoft, Vignette} from './art';

export const camTransform = (cam: Cam, p: number, f: number, dt?: number) => {
  const a = cam.a ?? 0.04;
  const e = ease(p);
  let s = 1, tx = 0, ty = 0;
  switch (cam.k) {
    case 'push': case 'rack': s = 1 + a * e; break;
    case 'pull': s = 1 + a * (1 - e); break;
    case 'panL': s = 1.1; tx = (e - 0.5) * 2 * a * W; break;
    case 'panR': s = 1.1; tx = (0.5 - e) * 2 * a * W; break;
    case 'tiltUp': s = 1.1; ty = (e - 0.5) * 2 * a * 1920; break;
    case 'tiltDown': s = 1.1; ty = (0.5 - e) * 2 * a * 1920; break;
    case 'track': s = 1 + a * p; tx = Math.sin(f / 45) * 7; ty = Math.sin(f / 31) * 5; break;
    default: s = 1.01; tx = Math.sin(f / 90) * 2; ty = Math.cos(f / 70) * 2;
  }
  if (dt !== undefined && dt >= 0 && dt < 0.3) { // satu hentakan singkat saat jumpscare, bukan getar terus-menerus
    const k = Math.exp(-dt * 14);
    tx += Math.sin(dt * 90) * 9 * k; ty += Math.cos(dt * 70) * 6 * k;
  }
  return `translate(${tx}px,${ty}px) scale(${s})`;
};

const TITLE_SIZE = {lg: 84, md: 52, sm: 34} as const;

/** Satu komponen layout untuk SEMUA scene: label, judul beat, referensi, vignette, grain, transisi. */
export const Frame: React.FC<{beat: Beat; f: number; dur: number; dt?: number; children: React.ReactNode}> = ({beat, f, dur, dt, children}) => {
  const p = clamp(f / dur);
  const dipLen = beat.id === 1 ? 45 : 12;
  const opIn = beat.tr === 'dissolve' ? clamp(f / 9) : 1;
  const dipIn = beat.tr === 'dip' ? 1 - clamp(f / dipLen) : 0;
  const dipOut = beat.dipOut ? clamp((f - (dur - 8)) / 8) : 0;
  const jsDark = dt !== undefined && dt >= 0 && dt < 0.3 ? 0.35 * (1 - dt / 0.3) : 0; // menggelap, bukan flash putih
  const labelO = clamp((f - 4) / 10) * (1 - clamp((f - (dur - 8)) / 8));
  const titleStart = beat.titleHold ? 0 : 6;
  let titleO = clamp((f - titleStart) / 10);
  if (beat.titleAfterJs) titleO = dt !== undefined && dt >= 0.25 ? clamp((dt - 0.25) / 0.3) : 0;
  if (dur > 150 && !beat.titleAfterJs) titleO *= 1 - clamp((f - 100) / 15);
  const ts = TITLE_SIZE[beat.titleSize ?? 'md'];
  const letter = beat.titleSize === 'lg' ? 3 + (1 - clamp((f - 6) / 40)) * 10 : 2;
  return (
    <AbsoluteFill style={{opacity: opIn, overflow: 'hidden', background: '#000'}}>
      <div style={{position: 'absolute', inset: 0, transform: camTransform(beat.cam, p, f, dt), transformOrigin: '540px 960px'}}>{children}</div>
      <Vignette />
      <GrainSoft frame={f} />
      {beat.label && (
        <div style={{position: 'absolute', top: Z.labelTop, left: 40, right: 40, textAlign: 'center', fontFamily: FONT_SANS, fontWeight: 600, fontSize: 26, letterSpacing: 4, color: 'rgba(238,228,205,.86)', textShadow: '0 2px 10px rgba(0,0,0,.9)', opacity: labelO}}>{beat.label}</div>
      )}
      {beat.title && (
        <div style={{position: 'absolute', top: Z.titleTop, left: 40, right: 40, textAlign: 'center', fontFamily: FONT_HEAD, fontWeight: 900, fontSize: ts, lineHeight: 1.1, letterSpacing: letter, color: '#f4ead2', textShadow: '0 4px 26px rgba(0,0,0,.9)', opacity: titleO, transform: `translateY(${(1 - titleO) * 10}px)`}}>{beat.title}</div>
      )}
      {beat.ref && (
        <div style={{position: 'absolute', top: Z.refTop, left: 40, right: 40, textAlign: 'center', fontFamily: FONT_SANS, fontSize: 24, color: 'rgba(222,228,234,.55)', whiteSpace: 'nowrap', opacity: labelO}}>{REF_TEXT[beat.ref]}</div>
      )}
      <AbsoluteFill style={{background: '#000', opacity: Math.max(jsDark, dipIn, dipOut), pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};

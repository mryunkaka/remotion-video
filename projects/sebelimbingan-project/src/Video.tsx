import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, interpolate, useCurrentFrame} from 'remotion';
import subs from './data/subtitles.json';
import {S1, S2, S3, S4, S5, S6, S6p, S6b, S7, S8, S9, S10, S11, SANS} from './scenes';
import {Vignette} from './art';

export const FPS = 30;
export const DURATION_S = 146.7;
export const TOTAL_FRAMES = Math.round(DURATION_S * FPS);
const f = (s: number) => Math.round(s * FPS);

// scene boundaries (seconds) anchored to the actual voiceover timeline (see docs/alignment.json)
type Sc = {a: number; b: number; C: React.FC; label: string};
const SC: Sc[] = [
  {a: 0, b: 7.6, C: S1, label: 'ILUSTRASI SEJARAH · REKONSTRUKSI LANSKAP'},
  {a: 7.6, b: 20.8, C: S2, label: 'PETA KONSEPTUAL · POSISI INDIKATIF'},
  {a: 20.8, b: 29.4, C: S3, label: 'REKONSTRUKSI VISUAL'},
  {a: 29.4, b: 44.4, C: S4, label: 'REKONSTRUKSI VISUAL'},
  {a: 44.4, b: 55.0, C: S5, label: 'REKONSTRUKSI VISUAL'},
  {a: 55.0, b: 63.3, C: S6, label: 'REKONSTRUKSI VISUAL'},
  {a: 63.3, b: 67.3, C: S6p, label: 'REKONSTRUKSI VISUAL'},
  {a: 67.3, b: 69.8, C: S6b, label: 'PETA KONSEPTUAL · POSISI INDIKATIF'},
  {a: 69.8, b: 76.8, C: S7, label: 'REKONSTRUKSI VISUAL'},
  {a: 76.8, b: 88.8, C: S8, label: 'REKONSTRUKSI VISUAL'},
  {a: 88.8, b: 101.3, C: S9, label: 'ILUSTRASI SEJARAH'},
  {a: 101.3, b: 118.0, C: S10, label: 'ILUSTRASI SEJARAH · REKONSTRUKSI VISUAL'},
  {a: 118.0, b: DURATION_S, C: S11, label: 'ILUSTRASI SEJARAH'},
];
const XF = 0.5; // crossfade seconds

const Fade: React.FC<{dur: number; first: boolean; last: boolean; children: React.ReactNode}> = ({dur, first, last, children}) => {
  const fr = useCurrentFrame();
  const c = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
  const i = first ? 1 : interpolate(fr, [0, XF * FPS], [0, 1], c);
  const o = last ? 1 : interpolate(fr, [dur - XF * FPS, dur], [1, 0], c);
  const op = Math.min(i, o);
  return <AbsoluteFill style={{opacity: op}}>{children}</AbsoluteFill>;
};

const Subtitles: React.FC = () => {
  const fr = useCurrentFrame();
  const t = fr / FPS;
  const cur = (subs as {start: number; end: number; lines: string[]}[]).find((s) => t >= s.start - 0.02 && t < s.end + 0.12);
  if (!cur) return null;
  const k = interpolate(t, [cur.start, cur.start + 0.15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: 50, right: 50, bottom: 300, display: 'flex', justifyContent: 'center', opacity: k}}>
      <div style={{background: 'rgba(8,10,12,.62)', padding: '14px 30px', borderRadius: 20, textAlign: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 50, lineHeight: 1.26, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,.8)'}}>
        {cur.lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
};

const Handle: React.FC = () => (
  <div style={{position: 'absolute', top: 150, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(10,12,14,.62)', padding: '12px 30px', borderRadius: 40, border: '2px solid rgba(246,217,160,.55)', fontFamily: SANS, fontWeight: 700, fontSize: 38, color: '#fbeccb', letterSpacing: 1.5}}>
      <svg width="34" height="34" viewBox="0 0 34 34"><circle cx="17" cy="17" r="12" fill="#f6d9a0" /><circle cx="22" cy="14" r="11" fill="#1a1d22" /></svg>
      @terangbulan.media
    </div>
  </div>
);

const Badge: React.FC<{label: string}> = ({label}) => (
  <div style={{position: 'absolute', top: 252, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
    <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: 4, color: '#f6d9a0', background: 'rgba(10,12,14,.5)', padding: '6px 18px', borderRadius: 8}}>{label}</div>
  </div>
);

export const Video: React.FC = () => {
  const fr = useCurrentFrame();
  const t = fr / FPS;
  const idx = Math.max(0, SC.findIndex((s) => t >= s.a && t < s.b));
  const label = SC[idx].label;
  return (
    <AbsoluteFill style={{background: '#0b0d10'}}>
      <Audio src={staticFile('audio/mix-master.wav')} />
      {SC.map((s, i) => {
        const last = i === SC.length - 1;
        const dur = f(s.b - s.a + (last ? 0 : XF));
        return (
          <Sequence key={i} from={f(s.a)} durationInFrames={dur} layout="none">
            <Fade dur={dur} first={i === 0} last={last}><s.C /></Fade>
          </Sequence>
        );
      })}
      <Vignette strength={0.5} />
      <Badge label={label} />
      <Handle />
      <Subtitles />
    </AbsoluteFill>
  );
};

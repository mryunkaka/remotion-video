import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {FONT_SANS, FPS, W, Z} from '../lib/layout';
import {clamp} from '../lib/util';
import {timeline} from '../data/beats';

export const HANDLE = '@terangbulan.media';

/** Handle di atas (zona 90–170) + subtitle (zona 1480–1680). Global, selalu di atas semua scene. */
export const Overlay: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const cue = timeline.cues.find((c) => t >= c.start - 0.04 && t <= Math.max(c.end, c.start + 0.5) + 0.08);
  const so = cue ? clamp((t - cue.start + 0.04) / 0.12) * clamp((Math.max(cue.end, cue.start + 0.5) + 0.08 - t) / 0.14) : 0;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', top: Z.handleTop, left: 0, width: W, display: 'flex', justifyContent: 'center', opacity: clamp(t / 1.2)}}>
        <div style={{padding: '10px 30px', borderRadius: 44, background: 'rgba(0,0,0,.38)', border: '1px solid rgba(255,255,255,.2)', fontFamily: FONT_SANS, fontWeight: 600, fontSize: 34, letterSpacing: 1, color: '#f3eee2', textShadow: '0 2px 8px rgba(0,0,0,.7)'}}>{HANDLE}</div>
      </div>
      {cue && (
        <div style={{position: 'absolute', top: Z.subTop, left: 80, width: W - 160, height: Z.subBottom - Z.subTop, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', opacity: so}}>
          <div style={{padding: '12px 28px', borderRadius: 18, background: 'rgba(0,0,0,.45)', fontFamily: FONT_SANS, fontWeight: 600, fontSize: 46, lineHeight: 1.28, textAlign: 'center', whiteSpace: 'pre-line', color: '#f6f1e4', textShadow: '0 2px 10px rgba(0,0,0,.85)'}}>{cue.lines}</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

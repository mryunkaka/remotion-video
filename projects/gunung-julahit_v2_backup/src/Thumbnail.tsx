import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FONT_HEAD, FONT_SANS, W, Z} from './lib/layout';
import {Vignette} from './components/art';
import {SceneView} from './components/scenes';
import {HANDLE} from './components/Overlay';

export const Thumbnail: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <SceneView
      cfg={{k: 'road', mount: 760, lamp: {x: 400, d: 0.3, glow: 1}, rain: 0.7, fog: 0.4, puddle: true, fig: {d: 0.34, x: 470, pose: 'down'}}}
      ctx={{f: 40, dur: 100, p: 0.4, abs: 0}}
    />
    <Vignette o={0.85} />
    <div style={{position: 'absolute', top: Z.handleTop, width: W, display: 'flex', justifyContent: 'center'}}>
      <div style={{padding: '10px 30px', borderRadius: 44, background: 'rgba(0,0,0,.4)', border: '1px solid rgba(255,255,255,.2)', fontFamily: FONT_SANS, fontWeight: 600, fontSize: 34, color: '#f3eee2'}}>{HANDLE}</div>
    </div>
    <div style={{position: 'absolute', top: 290, width: W, textAlign: 'center', fontFamily: FONT_HEAD, fontWeight: 900, fontSize: 86, letterSpacing: 3, color: '#f6ecd4', textShadow: '0 6px 34px rgba(0,0,0,.95)'}}>GUNUNG JULAHIT</div>
    <div style={{position: 'absolute', top: 1470, width: W, textAlign: 'center', fontFamily: FONT_HEAD, fontWeight: 900, fontSize: 64, lineHeight: 1.15, color: '#f2c77a', textShadow: '0 6px 30px rgba(0,0,0,.95)'}}>
      PEREMPUAN ITU<br />MENGAJAK PULANG...
    </div>
    <div style={{position: 'absolute', top: 1760, width: W, textAlign: 'center', fontFamily: FONT_SANS, fontSize: 24, color: 'rgba(222,228,234,.6)'}}>Ilustrasi · Dramatisasi, bukan rekaman asli</div>
  </AbsoluteFill>
);

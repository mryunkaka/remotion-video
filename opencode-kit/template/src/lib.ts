import React, {useContext} from 'react';
import {useCurrentFrame} from 'remotion';
export const W = 1080, H = 1920, FPS = 30, TOTAL_SEC = 150, TOTAL_FRAMES = TOTAL_SEC * FPS;
export const C = {deep: '#06223a', abyss: '#030d18', teal: '#0b4a52', tealLight: '#2a8f9a', gold: '#c9a45c', goldLight: '#f1d49a', storm: '#5b6b75', warm: '#ffd9a0', white: '#f3efe6'};
export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
export const easeIn = (x: number) => x * x * x;
export const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
export const rnd = (i: number, s = 1) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };
export const TimeCtx = React.createContext(0);
export const useT = () => { const f = useCurrentFrame(); const t0 = useContext(TimeCtx); return t0 + f / FPS; };
export const mix = (a: number[], b: number[], p: number) => a.map((v, i) => Math.round(lerp(v, b[i], p)));
export const rgb = (c: number[], a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
// handheld camera shake, amplitude decays
export const shake = (t: number, amp: number, seed = 1) => ({
  x: amp * (Math.sin(t * 23.1 + seed) + 0.6 * Math.sin(t * 41.7 + seed * 2)),
  y: amp * (Math.sin(t * 19.3 + seed * 3) + 0.6 * Math.sin(t * 37.9 + seed)),
  r: amp * 0.05 * Math.sin(t * 13.7 + seed),
});

import tl from './timeline.json';
import type {Pose} from '../components/art';
import {FPS} from '../lib/layout';

export type Fig = {
  d: number; d2?: number; x?: number; pose: Pose; dir?: 1 | -1; ghost?: boolean; turn?: boolean;
  show?: 'always' | 'untilJs' | 'afterJs'; flash?: number; jumpD?: number; scale?: number;
};
export type RoadCfg = {
  k: 'road'; lamp?: {x: number; d: number; glow: number}; lampDim?: boolean; fig?: Fig; mount?: number; scroll?: number;
  puddle?: boolean; shoes?: boolean; ots?: boolean; rain?: number; fog?: number; hand?: boolean; rack?: boolean; slope?: boolean;
};
export type SceneCfg =
  | {k: 'hill'; phase: number; phase2?: number; moon?: boolean; fog?: number; rain?: number; dim?: number; peakX?: number}
  | RoadCfg
  | {k: 'bridge'; fog?: number; fig?: Fig}
  | {k: 'map'; mode: 'kotabaru' | 'tanjung' | 'three' | 'saranjana'}
  | {k: 'montage'; parts: SceneCfg[]}
  | {k: 'card'}
  | {k: 'end'};
export type Cam = {k: 'push' | 'pull' | 'panL' | 'panR' | 'tiltUp' | 'tiltDown' | 'track' | 'locked' | 'rack'; a?: number};
export type Beat = {
  id: number; start: number; end: number; sf: number; df: number; tail: number;
  scene: SceneCfg; cam: Cam; label?: string; title?: string; titleSize?: 'lg' | 'md' | 'sm'; titleHold?: boolean; titleAfterJs?: boolean;
  ref?: 'L' | 'D'; js?: number; jsT?: number; tr: 'cut' | 'dissolve' | 'dip'; dipOut?: boolean;
};
type Def = Omit<Beat, 'id' | 'start' | 'end' | 'sf' | 'df' | 'tail' | 'jsT' | 'dipOut'>;

const M = 760; // posisi puncak Gunung Julahit pada adegan jalan (konsisten: selalu di kanan)
const REC = 'REKONSTRUKSI VISUAL';
const LEG = 'ILUSTRASI LEGENDA';
const SUASANA = 'ILUSTRASI SUASANA';
const DRAM = 'DRAMATISASI BERDASARKAN KESAKSIAN YANG DIBERITAKAN';
const lampA = {x: 430, d: 0.12, glow: 1};
const lampB = {x: 360, d: 0.34, glow: 1};

const defs: Def[] = [
  /* 1 */ {scene: {k: 'hill', phase: 0.95, rain: 0.5, fog: 0.35, dim: 0.1, peakX: 540}, cam: {k: 'push', a: 0.04}, title: 'KOTABARU, KALIMANTAN SELATAN', titleSize: 'sm', tr: 'dip'},
  /* 2 */ {scene: {k: 'hill', phase: 0.3, phase2: 0.95, moon: true, fog: 0.4, peakX: 540}, cam: {k: 'push', a: 0.06}, title: 'GUNUNG JULAHIT', titleSize: 'lg', tr: 'dissolve'},
  /* 3 */ {scene: {k: 'road', mount: M, scroll: 1.2, fog: 0.35}, cam: {k: 'track', a: 0.04}, label: SUASANA, title: 'GUNUNG JULAHIT', titleSize: 'lg', titleHold: true, tr: 'dissolve'},
  /* 4 */ {scene: {k: 'map', mode: 'kotabaru'}, cam: {k: 'push', a: 0.04}, label: LEG, ref: 'L', tr: 'dissolve'},
  /* 5 */ {scene: {k: 'hill', phase: 0.9, moon: true, fog: 0.65, peakX: 540}, cam: {k: 'panR', a: 0.04}, label: SUASANA, ref: 'L', tr: 'dissolve'},
  /* 6 */ {scene: {k: 'road', mount: M, fog: 0.45}, cam: {k: 'locked'}, label: LEG, ref: 'L', js: 1, tr: 'cut'},
  /* 7 */ {scene: {k: 'map', mode: 'tanjung'}, cam: {k: 'push', a: 0.04}, label: LEG, ref: 'L', tr: 'dissolve'},
  /* 8 */ {scene: {k: 'map', mode: 'three'}, cam: {k: 'locked'}, label: LEG, ref: 'L', tr: 'dissolve'},
  /* 9 */ {scene: {k: 'bridge', fog: 0.7}, cam: {k: 'push', a: 0.05}, label: LEG, ref: 'L', tr: 'dissolve'},
  /* 10 */ {scene: {k: 'bridge', fog: 0.7, fig: {d: 0, pose: 'down', ghost: true, show: 'afterJs', flash: 1.3}}, cam: {k: 'push', a: 0.03}, label: LEG, ref: 'L', js: 2, tr: 'cut'},
  /* 11 */ {scene: {k: 'map', mode: 'saranjana'}, cam: {k: 'push', a: 0.04}, label: LEG, ref: 'L', tr: 'dissolve'},
  /* 12 */ {scene: {k: 'montage', parts: [{k: 'bridge', fog: 0.6}, {k: 'map', mode: 'three'}, {k: 'hill', phase: 0.9, moon: true, fog: 0.5, peakX: 540}, {k: 'road', mount: M, fog: 0.4}]}, cam: {k: 'pull', a: 0.04}, label: LEG, ref: 'L', tr: 'dissolve'},
  /* 13 */ {scene: {k: 'road', scroll: 1.4, rain: 0.85, fog: 0.4, puddle: true}, cam: {k: 'track', a: 0.05}, label: REC, ref: 'D', tr: 'dip'},
  /* 14 */ {scene: {k: 'road', lamp: lampA, rain: 0.8, fog: 0.35, puddle: true}, cam: {k: 'push', a: 0.03}, label: REC, ref: 'D', tr: 'dissolve'},
  /* 15 */ {scene: {k: 'road', lamp: lampA, lampDim: true, rain: 0.8, fog: 0.35, puddle: true, fig: {d: 0.12, x: 478, pose: 'down', show: 'afterJs'}}, cam: {k: 'locked'}, label: REC, title: 'MALAM JUMAT', titleSize: 'md', ref: 'D', js: 3, tr: 'cut'},
  /* 16 */ {scene: {k: 'road', lamp: lampA, rain: 0.8, fog: 0.3, puddle: true, rack: true, fig: {d: 0.12, d2: 0.36, x: 500, pose: 'down'}}, cam: {k: 'rack', a: 0.06}, label: REC, ref: 'D', tr: 'dissolve'},
  /* 17 */ {scene: {k: 'road', lamp: lampB, rain: 0.8, fog: 0.3, puddle: true, hand: true, fig: {d: 0.38, x: 470, pose: 'wave'}}, cam: {k: 'push', a: 0.03}, label: REC, ref: 'D', js: 4, tr: 'cut'},
  /* 18 */ {scene: {k: 'road', lamp: lampB, rain: 0.8, fog: 0.3, puddle: true, fig: {d: 0.46, x: 520, pose: 'down'}}, cam: {k: 'push', a: 0.03}, label: 'SEBUAH KESAKSIAN YANG DIBERITAKAN', ref: 'D', tr: 'dissolve'},
  /* 19 */ {scene: {k: 'hill', phase: 1, fog: 0.55, dim: 0.35, rain: 0.4, peakX: 540}, cam: {k: 'push', a: 0.05}, label: SUASANA, title: 'DI ATAS GUNUNG JULAHIT?', titleSize: 'md', ref: 'D', tr: 'cut'},
  /* 20 */ {scene: {k: 'hill', phase: 1, fog: 0.5, dim: 0.82, peakX: 540}, cam: {k: 'push', a: 0.02}, tr: 'dissolve'},
  /* 21 */ {scene: {k: 'road', mount: M, scroll: 0.7, rain: 0.85, fog: 0.4, puddle: true}, cam: {k: 'track', a: 0.04}, label: DRAM, ref: 'D', tr: 'dip'},
  /* 22 */ {scene: {k: 'road', mount: M, lamp: lampA, rain: 0.8, fog: 0.4, puddle: true}, cam: {k: 'panL', a: 0.035}, label: REC, ref: 'D', tr: 'dissolve'},
  /* 23 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.8, fog: 0.35, puddle: true, fig: {d: 0.36, x: 450, pose: 'down'}}, cam: {k: 'locked'}, label: REC, ref: 'D', tr: 'dissolve'},
  /* 24 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.8, fog: 0.35, puddle: true, fig: {d: 0.36, x: 450, pose: 'raise'}}, cam: {k: 'push', a: 0.03}, label: REC, ref: 'D', tr: 'dissolve'},
  /* 25 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.8, fog: 0.35, puddle: true, fig: {d: 0.3, x: 470, pose: 'down', jumpD: 0.64, show: 'always'}}, cam: {k: 'push', a: 0.02}, label: REC, ref: 'D', js: 5, tr: 'cut'},
  /* 26 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.8, fog: 0.35, puddle: true, ots: true, fig: {d: 0.55, x: 560, pose: 'down'}}, cam: {k: 'locked'}, label: REC, ref: 'D', tr: 'cut'},
  /* 27 */ {scene: {k: 'road', shoes: true, rain: 0.8, puddle: true}, cam: {k: 'tiltDown', a: 0.04}, label: REC, ref: 'D', tr: 'dissolve'},
  /* 28 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.8, fog: 0.35, puddle: true, fig: {d: 0.55, x: 530, pose: 'down', turn: true}}, cam: {k: 'push', a: 0.03}, label: REC, ref: 'D', tr: 'dissolve'},
  /* 29 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.8, fog: 0.35, puddle: true, fig: {d: 0.55, x: 530, pose: 'point', dir: 1}}, cam: {k: 'push', a: 0.03}, label: REC, title: 'KE ARAH GUNUNG JULAHIT', titleSize: 'md', ref: 'D', tr: 'cut'},
  /* 30 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.7, fog: 0.4, slope: true, fig: {d: 0.55, x: 530, pose: 'point', dir: 1}}, cam: {k: 'tiltUp', a: 0.045}, label: REC, ref: 'D', js: 6, tr: 'cut'},
  /* 31 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.8, fog: 0.35, puddle: true, fig: {d: 0.55, x: 530, pose: 'down'}}, cam: {k: 'locked'}, label: REC, ref: 'D', tr: 'cut'},
  /* 32 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.6, fog: 0.55, puddle: true, fig: {d: 0.55, x: 530, pose: 'stop'}}, cam: {k: 'push', a: 0.02}, label: REC, ref: 'D', tr: 'dissolve'},
  /* 33 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.55, fog: 0.5, puddle: true, fig: {d: 0.4, x: 500, pose: 'down'}}, cam: {k: 'locked'}, label: REC, ref: 'D', tr: 'cut'},
  /* 34 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.55, fog: 0.5, puddle: true, fig: {d: 0.4, x: 500, pose: 'down', show: 'untilJs'}}, cam: {k: 'locked'}, label: REC, title: 'LALU... MENGHILANG', titleSize: 'md', titleAfterJs: true, ref: 'D', js: 7, tr: 'cut'},
  /* 35 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.6, fog: 0.5, puddle: true}, cam: {k: 'tiltDown', a: 0.04}, label: REC, ref: 'D', tr: 'dissolve'},
  /* 36 */ {scene: {k: 'road', mount: M, lamp: lampB, rain: 0.6, fog: 0.5, puddle: true, ots: true, fig: {d: 0.5, x: 600, pose: 'down', ghost: true, show: 'afterJs', flash: 1.4}}, cam: {k: 'locked'}, label: 'ILUSTRASI HOROR', ref: 'D', js: 8, tr: 'cut'},
  /* 37 */ {scene: {k: 'road', mount: M, rain: 0.6, fog: 0.55, scroll: -0.5, puddle: true}, cam: {k: 'pull', a: 0.05}, label: REC, ref: 'D', tr: 'dissolve'},
  /* 38 */ {scene: {k: 'hill', phase: 1, moon: true, fog: 0.7, rain: 0.35, peakX: 540}, cam: {k: 'push', a: 0.04}, title: 'APA YANG SEBENARNYA TERJADI?', titleSize: 'md', label: SUASANA, ref: 'D', tr: 'dip'},
  /* 39 */ {scene: {k: 'card'}, cam: {k: 'locked'}, ref: 'D', tr: 'dissolve'},
  /* 40 */ {scene: {k: 'end'}, cam: {k: 'locked'}, tr: 'dissolve'},
];

const jsMap = new Map(tl.jumpscares.map((j) => [j.beat, j.t]));
const DIS = 9;
export const beats: Beat[] = defs.map((d, i) => {
  const b = tl.beats[i];
  const sf = Math.round(b.start * FPS);
  const nextStart = i < tl.beats.length - 1 ? Math.round(tl.beats[i + 1].start * FPS) : Math.ceil(tl.durationSec * FPS);
  const nextTr = i < defs.length - 1 ? defs[i + 1].tr : 'cut';
  return {...d, id: b.id, start: b.start, end: b.end, sf, df: nextStart - sf, tail: nextTr === 'dissolve' ? DIS : 0,
    jsT: d.js ? jsMap.get(b.id) : undefined, dipOut: nextTr === 'dip'};
});
export const TOTAL_FRAMES = Math.ceil(tl.durationSec * FPS);
export const timeline = tl;
export const REF_TEXT = {
  L: 'Sumber: Correcto, 27 Juni 2020 · Cerita lisan, belum diverifikasi',
  D: 'Sumber: Correcto, 27 Juni 2020 · Dramatisasi, bukan rekaman asli',
};

import data from './shots.json';
import tl from './timeline.json';
import {FPS} from '../lib/layout';

export type Cam = {k: 'push' | 'pull' | 'panL' | 'panR' | 'tiltUp' | 'tiltDown' | 'track'; a: number};
export type Insert = {n: number; kind: string; t: number; dur: number};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Cfg = Record<string, any>;
export type Shot = {
  id: number; start: number; end: number; sf: number; df: number; tail: number;
  kind: string; var: string; cam: Cam; tr: {k: 'dissolve' | 'dip' | 'cut' | 'start'; f: number}; dipOut: number;
  title?: {text: string; size: 'lg' | 'md' | 'sm'; from: number; to: number};
  phase?: [number, number]; cfg: Cfg; insert?: Insert; motion: string[]; change: string; cutReason?: string;
};
export type Block = {from: number; to: number; text: string};
export type CardStep = {t: number; to: number; lines: {text: string; size: number; head?: boolean; color?: string; delay?: number; pill?: boolean}[]; top: number};

const raw = (data as unknown as {shots: Omit<Shot, 'sf' | 'df' | 'tail' | 'dipOut'>[]}).shots;
export const TOTAL_FRAMES = Math.ceil(tl.durationSec * FPS);
export const shots: Shot[] = raw.map((s, i) => {
  const sf = Math.round(s.start * FPS);
  const next = raw[i + 1];
  const nextSf = next ? Math.round(next.start * FPS) : TOTAL_FRAMES;
  return {...s, sf, df: nextSf - sf, tail: next && next.tr.k === 'dissolve' ? next.tr.f : 0, dipOut: next && next.tr.k === 'dip' ? next.tr.f : 0};
});
export const labelBlocks = (data as unknown as {labelBlocks: Block[]}).labelBlocks;
export const refBlocks = (data as unknown as {refBlocks: Block[]}).refBlocks;
export const cards = (data as unknown as {cards: CardStep[]}).cards;
export const timeline = tl;

import {staticFile, continueRender, delayRender} from 'remotion';
const faces: [string, string, string, string][] = [
  ['Cinzel', 'cinzel-latin-500-normal.woff2', '500', 'normal'],
  ['Cinzel', 'cinzel-latin-700-normal.woff2', '700', 'normal'],
  ['Cormorant', 'cormorant-garamond-latin-500-italic.woff2', '500', 'italic'],
  ['Cormorant', 'cormorant-garamond-latin-600-normal.woff2', '600', 'normal'],
  ['InterX', 'inter-latin-500-normal.woff2', '500', 'normal'],
  ['InterX', 'inter-latin-600-normal.woff2', '600', 'normal'],
];
let started = false;
export const loadFonts = () => {
  if (started) return; started = true;
  const h = delayRender('fonts');
  Promise.all(faces.map(([fam, file, w, st]) => {
    const f = new FontFace(fam, `url(${staticFile('fonts/' + file)})`, {weight: w, style: st});
    return f.load().then((l) => { (document as any).fonts.add(l); });
  })).then(() => continueRender(h)).catch(() => continueRender(h));
};
export const F = {title: "'Cinzel', serif", serif: "'Cormorant', serif", sans: "'InterX', 'Inter', sans-serif"};

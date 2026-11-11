import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path'; import fs from 'fs';
const times = process.argv[3].split(',').map(Number); const outDir = process.argv[2]; const scale = Number(process.argv[4] || 0.5);
fs.mkdirSync(outDir, {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), onProgress: () => {}});
const browserExecutable = process.env.CHROME_PATH || undefined;
const comp = await selectComposition({serveUrl, id: 'Halimun', browserExecutable});
for (const t of times) {
  const t0 = Date.now();
  await renderStill({composition: comp, serveUrl, output: path.join(outDir, `t${String(t).replace('.', '_')}.jpg`), frame: Math.round(t * 30), browserExecutable, imageFormat: 'jpeg', jpegQuality: 85, scale, chromiumOptions: process.env.CHROME_PATH ? {gl: 'swangle'} : {}});
  console.log(t, ((Date.now() - t0) / 1000).toFixed(1) + 's');
}

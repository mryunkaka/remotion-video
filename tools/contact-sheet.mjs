import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const [input, output = 'contact-sheet'] = process.argv.slice(2);
if (!input) throw new Error('Usage: node tools/contact-sheet.mjs <frames-dir> [output-dir]');
const files = (await readdir(input)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
if (!files.length) throw new Error('No image frames found');
const dir = path.resolve(output);
await mkdir(dir, { recursive: true });
const run = (args) => {
  const result = spawnSync('ffmpeg', args, { stdio: 'inherit' });
  if (result.error) throw new Error('ffmpeg is required');
  if (result.status !== 0) throw new Error(`ffmpeg failed: ${args.at(-1)}`);
};
const label = (name) => `drawtext=fontfile=C\\\\:/Windows/Fonts/arial.ttf:text='${name.replaceAll("'", "\\'")}':x=12:y=12:fontsize=24:fontcolor=white:box=1:boxcolor=black@0.7`;
if (files.length === 1) {
  run(['-y', '-i', path.resolve(input, files[0]), '-vf', `scale=480:-2,${label(files[0])}`, '-frames:v', '1', path.join(dir, 'overview.jpg')]);
} else {
  const overview = files.map((file, i) => `[${i}:v]scale=480:-2,${label(file)}[v${i}]`).join(';');
  run(['-y', ...files.flatMap((f) => ['-i', path.resolve(input, f)]), '-filter_complex', `${overview};${files.map((_, i) => `[v${i}]`).join('')}xstack=inputs=${files.length}:grid=4x${Math.ceil(files.length / 4)}:fill=black[out]`, '-map', '[out]', '-frames:v', '1', path.join(dir, 'overview.jpg')]);
}
for (let i = 0; i < files.length; i++) {
  const name = files[i];
  run(['-y', '-i', path.resolve(input, name), '-vf', `scale=1600:-2,${label(name)}`, '-frames:v', '1', path.join(dir, `${String(i + 1).padStart(3, '0')}-${path.parse(name).name}.jpg`)]);
}
console.log(`Generated scene overview and ${files.length} high-resolution labeled keyframes in ${dir}`);

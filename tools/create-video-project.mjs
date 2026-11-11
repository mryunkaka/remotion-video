import { copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const options = Object.fromEntries(args.map((arg, index) => arg.startsWith('--') ? [arg.slice(2), args[index + 1]] : null).filter(Boolean));
const required = ['title', 'name', 'type', 'ratio', 'duration', 'style', 'language'];
for (const key of required) if (!options[key]) throw new Error(`Missing --${key}`);
if (!/^[\w-]+$/.test(options.name)) throw new Error('--name must contain only letters, numbers, _ or -');

const destination = path.join(root, 'projects', options.name);
try {
  await stat(destination);
  throw new Error(`Project already exists: ${destination}`);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const narrative = options.narrative ? await readFile(path.resolve(options.narrative), 'utf8') : options.source ?? 'Narrative not supplied; add source in docs/WORK-STATUS.md.';
let audioSource;
let audioDurationSeconds;
if (options.audio) {
  audioSource = path.resolve(options.audio);
  if (!(await stat(audioSource)).isFile()) throw new Error(`--audio must point to a file: ${audioSource}`);
  const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', audioSource], { encoding: 'utf8' });
  if (!probe.error && probe.status === 0 && Number.isFinite(Number(probe.stdout.trim()))) audioDurationSeconds = Number(probe.stdout.trim());
}

const files = {
  'AGENTS.md': '# Project rules\n\nFollow the workspace-level `AGENTS.md`. This production owns its narrative, copied inputs, assets, Remotion code, renders, and QC. Never overwrite or reuse assets from another production.\n',
  'docs/WORK-STATUS.md': `# Work status\n\nStatus: INTAKE\n\n- Title: ${options.title}\n- Type: ${options.type}\n- Ratio: ${options.ratio}\n- Target duration: ${options.duration}\n- Voiceover duration: ${audioDurationSeconds === undefined ? 'Not measured' : `${audioDurationSeconds.toFixed(3)} seconds (ffprobe)`}\n- Style: ${options.style}\n- Language: ${options.language}\n- Asset references: ${options.assets ?? 'None supplied'}\n- Source voiceover: ${options.audio ? path.basename(audioSource) : 'Not supplied'}\n\n## Live production progress\n\n- [ ] Validate voiceover, transcript, and timing confidence\n- [ ] Finish story beats, storyboard, and visual style guide\n- [ ] Source or create visual assets and record provenance\n- [ ] Create original BGM/SFX stems and mix around voiceover\n- [ ] Build the Remotion composition and scene animations\n- [ ] Preview scenes, get independent QA, and revise\n- [ ] Render final, run QC, and package deliverables\n\nUpdate this checklist only after each phase has real evidence/files.\n\n## Narrative/source\n\n${narrative}\n`,
  'docs/STORYBOARD.md': '# Storyboard\n\nPending narrative analysis. Create scene and shot timings from supplied narrative; do not invent source facts.\n',
  'docs/VISUAL-STYLE-GUIDE.md': `# Visual style guide\n\n- Video type: ${options.type}\n- Target style: ${options.style}\n- Frame ratio: ${options.ratio}\n- Language: ${options.language}\n\nDefine palette, lighting, composition, typography, motion, and accessibility after narrative analysis. Make the visual language fit the story; do not default to cards, repeated boxes, or a static slideshow.\n`,
  'docs/AUDIO-CUE-SHEET.md': '# Audio cue sheet\n\nPending local audio inspection and storyboard. Keep voiceover, BGM, SFX, and final mix as separate tracks.\n',
  'docs/QC-REPORT.md': '# QC report\n\nStatus: NOT STARTED - no render exists. Record actual ffprobe data, visual inspection, subtitle synchronization, audio loudness/peak, and independent critique before marking complete.\n',
  'src/.gitkeep': '',
  'public/.gitkeep': '',
  'assets/PROVENANCE.md': '# Asset provenance\n\nRecord source/provider, creator, URL, license/terms, retrieval date, and modifications for every sourced asset. Record local generation method for generated media. No asset imported yet.\n',
  'assets/audio/narration/.gitkeep': '',
  'assets/audio/music/.gitkeep': '',
  'assets/audio/sfx/.gitkeep': '',
  'out/.gitkeep': '',
};

await mkdir(destination, { recursive: true });
for (const [name, content] of Object.entries(files)) {
  const target = path.join(destination, name);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, { flag: 'wx' });
}

if (audioSource) {
  const target = path.join(destination, 'assets', 'audio', 'narration', path.basename(audioSource));
  await copyFile(audioSource, target);
  await writeFile(path.join(destination, 'docs', 'AUDIO-INPUT.json'), `${JSON.stringify({ sourceFileName: path.basename(audioSource), copiedTo: path.relative(destination, target).split(path.sep).join('/'), durationSeconds: audioDurationSeconds ?? null, durationTool: audioDurationSeconds === undefined ? null : 'ffprobe', sourcePreserved: true }, null, 2)}\n`, { flag: 'wx' });
}

console.log(destination);

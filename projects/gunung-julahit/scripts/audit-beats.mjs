#!/usr/bin/env node
// Audit ritme & variasi shot. Node murni, tanpa dependensi.
// Pakai:  node scripts/audit-beats.mjs [file.json] [--out docs/x.md] [--no-fail]
//   default input: src/data/shots.json (skema v3) ; docs/v2-shots.json = hasil ekspor V2 (skema v2, hanya laporan)
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const input = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--out') ?? 'src/data/shots.json';
const out = opt('--out', 'docs/audit-metrics.md');
const data = JSON.parse(fs.readFileSync(input, 'utf8'));
const tl = JSON.parse(fs.readFileSync('src/data/timeline.json', 'utf8'));
const shots = data.shots;
const v3 = data.schema === 'v3';
const f2 = (x) => (Math.round(x * 100) / 100).toFixed(2);
const dur = (s) => s.end - s.start;
const sig = (s) => `${s.kind}|${s.var ?? ''}|${s.cam?.k ?? ''}`;
const median = (a) => { const b = [...a].sort((x, y) => x - y); const m = b.length >> 1; return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; };

const durs = shots.map(dur);
const total = durs.reduce((a, b) => a + b, 0);
const byKind = {};
shots.forEach((s) => { byKind[s.kind] = (byKind[s.kind] ?? 0) + dur(s); });
let run = 1, runMax = 1, runKind = shots[0].kind, runSec = dur(shots[0]), runMaxSec = runSec;
for (let i = 1; i < shots.length; i++) {
  if (shots[i].kind === shots[i - 1].kind) { run++; runSec += dur(shots[i]); } else { run = 1; runSec = dur(shots[i]); }
  if (runSec > runMaxSec + 1e-9) { runMaxSec = runSec; runKind = shots[i].kind; }
  runMax = Math.max(runMax, run);
}
const abaCount = (key) => { let c = 0; for (let i = 2; i < shots.length; i++) { const w = [i - 2, i - 3].filter((j) => j >= 0); if (w.some((j) => key(shots[j]) === key(shots[i]))) c++; } return c; };
const abaStrict = abaCount(sig);
let abaLoose = 0; for (let i = 2; i < shots.length; i++) if (shots[i].kind === shots[i - 2].kind && shots[i].kind !== shots[i - 1].kind) abaLoose++;
const twins = []; // signature sama dalam 30 dtk (akhir shot lama -> awal shot baru)
for (let i = 0; i < shots.length; i++) for (let j = i + 1; j < shots.length; j++) if (sig(shots[i]) === sig(shots[j]) && shots[j].start - shots[i].end < 30) twins.push([shots[i].id, shots[j].id]);
const sigDup = []; for (let i = 0; i < shots.length; i++) for (let j = i + 1; j < shots.length; j++) if (sig(shots[i]) === sig(shots[j])) sigDup.push([shots[i].id, shots[j].id]);
const labelFades = v3 ? data.labelBlocks.length + data.refBlocks.length : shots.filter((s) => s.label).length + shots.filter((s) => s.ref).length;
const staticCards = shots.filter((s) => s.kind === 'card' || s.kind === 'end');
const staticSec = staticCards.reduce((a, s) => a + dur(s), 0);
const cutShots = shots.filter((s, i) => i > 0 && s.tr?.k === 'cut');
const cutaways = v3 ? shots.filter((s) => s.insert?.kind === 'cutaway').length : 0;
const hardCuts = cutShots.length + cutaways * 2;
const titles = shots.filter((s) => s.title).length;
const midCue = [];
shots.slice(1).forEach((s) => tl.cues.forEach((c) => { if (s.start > c.start + 0.05 && s.start < c.end - 0.05) midCue.push(`${s.id}@${f2(s.start)} dalam cue ${c.i}`); }));
const shortN = durs.filter((d) => d < 4.5).length;
const m = {
  jumlahShot: shots.length, min: Math.min(...durs), median: median(durs), mean: total / shots.length, max: Math.max(...durs),
  shotKurang45: shortN, jenisScene: Object.keys(byKind).length, roadPct: ((byKind.road ?? 0) / total) * 100,
  runTerpanjang: runMax, runTerpanjangDetik: runMaxSec, runKind, abaStrict, abaLoose, kembar30: twins.length, signatureDuplikat: sigDup.length,
  fadeLabelRef: labelFades, kartuStatisDetik: staticSec, cutKeras: hardCuts, judulBesar: titles, batasTengahCue: midCue.length,
};

const fails = [];
const rule = (id, ok, msg) => { if (!ok) fails.push(`${id}: ${msg}`); };
if (v3) {
  rule('R0', Math.abs(tl.durationSec - 190.301) < 1e-6 && Math.abs(shots.at(-1).end - 190.301) < 0.01 && shots[0].start === 0, 'timeline/durasi tidak cocok');
  const body = shots.filter((s) => !s.isInsert);
  rule('R1', m.min >= 4.5 - 1e-9, `shot terpendek ${f2(m.min)} dtk < 4,5`);
  rule('R1', m.median >= 6, `median ${f2(m.median)} < 6`);
  rule('R1', m.max <= 12 + 1e-9, `shot terpanjang ${f2(m.max)} > 12`);
  rule('R1', body.length >= 28 && body.length <= 34, `jumlah shot ${body.length} di luar 28-34`);
  rule('R1', midCue.length === 0, `batas shot di tengah cue: ${midCue.join('; ')}`);
  for (let i = 1; i < shots.length; i++) if (Math.abs(shots[i].start - shots[i - 1].end) > 1e-6) rule('R1', false, `celah antar shot ${shots[i].id}`);
  rule('R2', m.jenisScene >= 9, `hanya ${m.jenisScene} jenis scene`);
  rule('R2', m.roadPct <= 35, `road ${f2(m.roadPct)}% > 35%`);
  rule('R2', m.runTerpanjang <= 2, `${m.runTerpanjang} shot berurutan jenis sama`);
  for (let i = 1; i < shots.length; i++) if (shots[i].kind === shots[i - 1].kind && (shots[i].var === shots[i - 1].var || shots[i].cam.k === shots[i - 1].cam.k)) rule('R2', false, `shot ${shots[i - 1].id}-${shots[i].id} sama jenis tapi var/kamera sama`);
  rule('R2', twins.length === 0, `signature kembar <30 dtk: ${JSON.stringify(twins)}`);
  rule('R2', abaStrict === 0, `${abaStrict} pola A-B-A`);
  rule('R6', sigDup.length === 0, `signature kembali muncul: ${JSON.stringify(sigDup)}`);
  rule('R6', m.abaLoose === 0, `${m.abaLoose} pola A-B-A tingkat jenis scene`);
  let prevB = -1;
  shots.forEach((s) => { if (s.phase) { rule('R6', s.phase[0] >= prevB - 1e-6 && s.phase[1] >= s.phase[0] - 1e-6, `langit tidak monoton di shot ${s.id}`); prevB = s.phase[1]; } });
  shots.forEach((s, i) => {
    if (i === 0) return;
    if (s.tr.k === 'dissolve') rule('R3', s.tr.f >= 18 && s.tr.f <= 24, `dissolve shot ${s.id} = ${s.tr.f} frame`);
    else if (s.tr.k === 'dip') rule('R3', s.tr.f >= 15 && s.tr.f <= 20, `dip shot ${s.id} = ${s.tr.f} frame`);
    else if (s.tr.k === 'cut') rule('R3', ['jumpscare', 'vanish'].includes(s.cutReason), `cut shot ${s.id} tanpa alasan jumpscare/vanish`);
    else rule('R3', false, `transisi tak dikenal shot ${s.id}`);
  });
  rule('R3', hardCuts <= 6, `${hardCuts} cut keras > 6`);
  const rng = { push: [0.06, 0.09], pull: [0.06, 0.09], track: [0.06, 0.09], panL: [0.06, 0.1], panR: [0.06, 0.1], tiltUp: [0.06, 0.1], tiltDown: [0.06, 0.1] };
  shots.forEach((s) => {
    rule('R4', (s.motion?.length ?? 0) >= 2, `shot ${s.id} < 2 lapisan gerak`);
    rule('R4', !!s.change, `shot ${s.id} tanpa perubahan keadaan`);
    const r = rng[s.cam.k]; rule('R4', !!r && s.cam.a >= r[0] - 1e-9 && s.cam.a <= r[1] + 1e-9, `kamera shot ${s.id} (${s.cam.k} ${s.cam.a}) di luar rentang`);
  });
  rule('R5', data.labelMode === 'persistent', 'label tidak persisten');
  rule('R5', titles <= 8, `${titles} judul besar > 8`);
  rule('R5', data.refBlocks.length <= 2, `${data.refBlocks.length} blok referensi > 2`);
  rule('R7', staticCards.every((s) => dur(s) <= 6), 'ada kartu statis > 6 dtk');
  const cueStarts = tl.cues.map((c) => c.start);
  data.cards.forEach((c) => rule('R7', cueStarts.some((x) => Math.abs(x - c.t) < 0.12), `teks kartu @${c.t} tidak sinkron cue`));
  rule('R7', data.cards.some((c) => Math.abs(c.t - tl.ctaStart) < 0.12), 'CTA tidak sinkron 176,53');
  rule('R7', data.cards.some((c) => c.t >= 157.4 && c.t < 157.6), 'teks kartu fakta tidak mulai di 157,47');
  const ins = shots.filter((s) => s.insert).map((s) => ({ s, i: s.insert }));
  rule('R8', ins.length === 8 && tl.jumpscares.every((j) => ins.some((x) => x.i.n === j.n && Math.abs(x.i.t - j.t) < 1e-3)), 'jumpscare tidak persis timeline');
  ins.forEach(({ s, i }) => {
    rule('R8', i.dur >= 0.8 && i.dur <= 1.5, `insert ${i.n} durasi ${i.dur}`);
    rule('R8', s.start <= i.t - 2 + 1e-6, `insert ${i.n}: setup tenang < 2 dtk (${f2(i.t - s.start)})`);
    rule('R8', s.end >= i.t + i.dur + 2 - 1e-6, `insert ${i.n}: jeda tenang < 2 dtk (${f2(s.end - i.t - i.dur)})`);
    rule('R8', dur(s) > i.dur + 4, `insert ${i.n} bukan di dalam shot panjang`);
  });
}

const row = (s) => `| ${s.id} | ${f2(s.start)}–${f2(s.end)} | ${f2(dur(s))} | ${s.kind} | ${sig(s)} | ${s.tr ? `${s.tr.k}${s.tr.f ? ' ' + s.tr.f + 'f' : ''}` : ''} | ${(s.label ?? '').slice(0, 30)} |`;
const md = [
  `# Metrik audit — ${path.basename(input)} (${v3 ? 'V3' : 'V2 / baseline'})`, '',
  '| metrik | nilai |', '|---|---|',
  `| jumlah shot | ${m.jumlahShot} |`,
  `| durasi min / median / rata-rata / maks (dtk) | ${f2(m.min)} / ${f2(m.median)} / ${f2(m.mean)} / ${f2(m.max)} |`,
  `| shot < 4,5 dtk | ${m.shotKurang45} |`,
  `| jenis scene berbeda | ${m.jenisScene} |`,
  `| % durasi per jenis | ${Object.entries(byKind).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${f2((v / total) * 100)}%`).join(', ')} |`,
  `| scene road | ${f2(m.roadPct)}% |`,
  `| run terpanjang jenis sama | ${m.runTerpanjang} shot (${m.runKind}, ${f2(m.runTerpanjangDetik)} dtk) |`,
  `| pola A-B-A (signature ketat / tingkat jenis) | ${m.abaStrict} / ${m.abaLoose} |`,
  `| signature kembar dalam 30 dtk | ${m.kembar30} |`,
  `| kemunculan fade label+referensi | ${m.fadeLabelRef} |`,
  `| total durasi kartu statis (dtk) | ${f2(m.kartuStatisDetik)} |`,
  `| cut keras | ${m.cutKeras} |`,
  `| judul besar | ${m.judulBesar} |`,
  `| batas shot di tengah cue | ${m.batasTengahCue} |`, '',
  `**Hasil aturan:** ${v3 ? (fails.length ? `GAGAL (${fails.length})` : 'LULUS semua') : 'baseline, tidak ditegakkan'}`,
  ...(fails.length ? ['', ...fails.map((f) => `- ${f}`)] : []), '',
  '| id | waktu | dtk | scene | signature | transisi | label |', '|---|---|---|---|---|---|---|', ...shots.map(row), '',
].join('\n');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(md.split('\n').slice(0, 24).join('\n'));
if (v3 && fails.length) { console.error('\nGAGAL:\n' + fails.join('\n')); if (!flag('--no-fail')) process.exit(1); }
else if (v3) console.log('\nAUDIT LULUS');

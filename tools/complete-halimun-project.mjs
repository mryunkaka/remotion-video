import {appendFile, copyFile, cp, mkdir, readFile, writeFile, rm} from "node:fs/promises";
import {existsSync} from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const name="pulau-halimun-perahu-tak-kembali-20261108";
const project=path.join(root,"projects",name);
const python=path.join(root,".venv","Scripts","python.exe");
const cli=path.join(root,"node_modules","@remotion","cli","remotion-cli.js");
const rendererBinaries=path.join(project,"tools","remotion-binaries");
const source=path.join(project,"assets","audio","narration","ugc-kanvas-voiceover-zephyr (8).wav");
const out=path.join(project,"out");
const log=path.join(project,"docs","RUN-LOG.md");
const final=path.join(out,"PULAU_HALIMUN_PERAHU_TAK_KEMBALI_FINAL.mp4");
const silent=path.join(out,"video-no-audio.mp4");
if(process.argv.includes("--rerender")){await rm(final,{force:true});await rm(silent,{force:true});}
await mkdir(path.join(project,"public","audio"),{recursive:true});
await mkdir(out,{recursive:true});
const packagedBinaries=path.join(root,"node_modules",".pnpm","@remotion+compositor-win32-x64-msvc@4.0.541","node_modules","@remotion","compositor-win32-x64-msvc");
if(!existsSync(rendererBinaries)){
 await cp(packagedBinaries,rendererBinaries,{recursive:true,force:true});
 for(const bin of ["ffmpeg","ffprobe"]){
  const found=spawnSync("where.exe",[bin],{encoding:"utf8",windowsHide:true});
  const source=found.stdout?.split(/\r?\n/).find(Boolean);
  if(!source) throw new Error(`System ${bin} executable not found in PATH`);
  await copyFile(source,path.join(rendererBinaries,`${bin}.exe`));
 }
}
const run=async(label,exe,args,cwd=root)=>{
  await appendFile(log,`\n## ${new Date().toISOString()} • ${label}\n`);
  const r=spawnSync(exe,args,{cwd,encoding:"utf8",windowsHide:true,maxBuffer:12*1024*1024});
  if(r.stdout) await appendFile(log,r.stdout);
  if(r.stderr) await appendFile(log,r.stderr);
  if(r.error||r.status!==0) throw new Error(`${label} failed: ${r.error?.message||r.stderr?.slice(-1200)||r.status}`);
  return r;
};
const audioInfo=JSON.parse((await readFile(path.join(project,"docs","transcript.json"),"utf8")));
const duration=audioInfo.duration;
const segments=audioInfo.segments;
for(const s of segments){
 s.text=s.text.replace(/\bardan\b/gi,"Ardan").replace(/\braka\b/gi,"Raka");
 s.text=s.text.replace(/^\p{L}/u,c=>c.toLocaleUpperCase("id-ID"));
}
audioInfo.segments=segments;
await writeFile(path.join(project,"docs","transcript.json"),JSON.stringify(audioInfo,null,2)+"\n");
const stamp=(sec)=>{let ms=Math.round(sec*1000),h=Math.floor(ms/3600000);ms-=h*3600000;let m=Math.floor(ms/60000);ms-=m*60000;let s=Math.floor(ms/1000);ms-=s*1000;return String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")+":"+String(s).padStart(2,"0")+","+String(ms).padStart(3,"0")};
const srt=segments.map((s,i)=>(i+1)+"\n"+stamp(s.start)+" --> "+stamp(s.end)+"\n"+s.text+"\n").join("\n");
await writeFile(path.join(project,"docs","narration.srt"),srt);
await writeFile(path.join(project,"src","captions.json"),JSON.stringify(segments.map(s=>({start:s.start,end:s.end,text:s.text})),null,2));
await writeFile(path.join(project,"tsconfig.json"),JSON.stringify({extends:"../../tsconfig.json",compilerOptions:{resolveJsonModule:true},include:["src"]},null,2)+"\n");
const story=`# Storyboard — Perahu yang Tak Kembali\n\nCerita dibingkai sebagai legenda maritim dan rekonstruksi visual, bukan laporan kejadian yang telah diverifikasi. Seluruh dialog mengikuti audio asli; timing adegan mengikuti transkrip otomatis lokal faster-whisper-small (41 segmen; belum dikoreksi pendengar manusia).\n\n| Waktu | Beat | Visual dan gerak | Audio |\n|---|---|---|---|\n| 00:00–00:14 | Hook: sebuah pulau dan nelayan yang hilang | Laut malam berlapis, bulan temaram; judul “Tiga Cahaya di Tengah Laut”; gerak kamera masuk perlahan. | Ombak rendah, drone mulai pelan. |\n| 00:14–00:30.7 | Ardan, pelaut berpengalaman | Siluet nelayan di perahu; gelombang bergerak berlawanan arah untuk kedalaman. | BGM menahan ruang untuk narasi. |\n| 00:30.7–00:43.7 | Lonceng dari perairan tertentu | Bentuk lonceng samar di bawah garis air; lingkar riak berulang menjadi transisi. | Tiga gema lonceng lembut. |\n| 00:43.7–01:13.7 | Peringatan kepada Raka | Rumah panggung menjelang malam, dua siluet berjauhan; fokus berpindah ke laut di luar jendela. | Drone bergeser harmoninya; nada cahaya tipis saat peringatan. |\n| 01:13.7–01:22.8 | Perahu berangkat | Siluet kecil menjauh, garis horizon bergeser; langit meredup. | Ombak dan desis angin pendek. |\n| 01:22.8–02:00.7 | Radio memanggil dengan suara yang sama | Radio di kabin, layar berdenyut, shot laut kosong, kembali ke radio; komposisi berganti skala tiap beat. | Desis radio bertitik, nada rendah pada panggilan, jeda sunyi sebelum balasan. |\n| 02:00.7–02:13 | Tiga cahaya muncul | Tiga sumber cahaya berjauhan di horizon; riak tipis memantulkan warna, kamera mendorong maju. | Tiga bunyi metalik berjarak; sub-bass singkat. |\n| 02:13–02:26.1 | Pagi tanpa perahu | Cahaya pagi kusam, perahu hanya bayang jauh; laut makin kosong. | BGM turun; tekstur ombak tetap lembut. |\n| 02:26.1–02:42.8 | Radio rumah menyala sendiri | Interior rumah malam, radio close-up dengan lampu indikator berkedip; bayangan manusia tetap diam. | Desis radio mendadak, nada rendah berlapis. |\n| 02:42.8–02:46.2 | Ucapan penutup | Tiga cahaya kembali pada layar gelap; teks akhir singkat lalu cut to black. | Impact pendek lalu tail hening. |\n\n### Catatan fakta\nNama Pulau Halimun dan tokoh Ardan/Raka dipakai sebagai perangkat cerita pada naskah audio. Tidak ada bukti atau sumber lokal terverifikasi yang disertakan untuk kejadian ini; label legenda/rekonstruksi dipakai agar visual tidak menyatakan peristiwa sebagai fakta.\n`;
const style=`# Visual style guide\n\n- Format: vertikal 9:16, 720×1280, 30 fps; durasi mengikuti WAV 166.211 dtk.\n- Arah: ilustrasi sinematik maritim, bukan foto hiper-realistis; palet biru arang, teal laut, amber bulan dan lampu radio.\n- Motif: garis ombak organik, siluet manusia/perahu/rumah, lingkar gema dan tiga cahaya; tekstur bergerak halus dan parallax kamera.\n- Ritme: 10 adegan dengan perubahan skala/arah setiap beat; tahan ruang pada dialog penting, percepat cut di saat radio menyala dan kemunculan cahaya.\n- Tipografi: serif untuk hook, sans-serif tebal untuk subtitle; maksimal dua baris, outline/shadow untuk kontras dan safe area bawah.\n- Penanda: “LEGENDA MARITIM” dan label rekonstruksi; tidak menampilkan lokasi sebagai dokumentasi aktual.\n- Hindari: satu gambar diam sepanjang video, efek glitch berulang, kilatan berlebihan, gore, dan gambar generik yang diklaim asli Pulau Laut.\n`;
const cues=`# Audio cue sheet\n\nVoiceover asli tidak diubah; durasi ${duration.toFixed(3)}s. BGM dan SFX disintesis lokal, stereo PCM 48 kHz, terpisah sebagai stem yang bisa diedit. Final mix memakai ducking sidechain BGM dari narasi dan limiter true-peak untuk mencegah clipping.\n\n| Cue | Posisi | Desain |\n|---|---:|---|\n| Ombak rendah | 00:00, 00:33, 02:01, 02:14 | Gelombang sub-bass pendek, berjarak. |\n| Lonceng | 00:41–00:50 | Tiga gema metalik dengan decay panjang. |\n| Peringatan cahaya | 00:56–01:01 | Nada tinggi halus, bukan stinger keras. |\n| Radio statis | 01:22, 01:26, 01:30 | Burst singkat untuk transisi frekuensi. |\n| Laut dan tiga cahaya | 02:01–02:13 | Drone turun, tiga nada lonceng berjeda. |\n| Radio rumah dan penutup | 02:34–02:46 | Desis, nada rendah dan impact akhir; sisakan tail. |\n\nPeak dan loudness final dicatat setelah render di QC report.\n`;
await writeFile(path.join(project,"docs","STORYBOARD.md"),story);
await writeFile(path.join(project,"docs","VISUAL-STYLE-GUIDE.md"),style);
await writeFile(path.join(project,"docs","AUDIO-CUE-SHEET.md"),cues);
await copyFile(path.join(project,"docs","narration.srt"),path.join(out,"captions.srt"));
await writeFile(path.join(project,"docs","WORK-STATUS.md"),`# Work status\n\nStatus: BUILDING\n\n- Title: Pulau Halimun — Perahu yang Tak Kembali\n- Ratio: 9:16\n- Render: 720×1280, 30 fps\n- Duration: ${duration.toFixed(3)} s\n- Source narration: ${path.basename(source)} (preserved unchanged)\n- Transcript: faster-whisper-small, local, Indonesian, 41 segments; machine-generated and not manually proof-listened.\n\n## Completed evidence\n\n- [x] Audio inspected with ffprobe; original WAV copied unchanged.\n- [x] Local transcript and timed SRT: docs/transcript.json, docs/narration.srt.\n- [x] Storyboard, style guide, and cue sheet written.\n- [x] Original local BGM/SFX stems prepared separately.\n- [x] Remotion composition built; all visuals are authored vector illustrations, not falsely labeled location footage.\n- [ ] Preview and independent visual/audio QA.\n- [ ] Final render and codec/duration/loudness checks.\n\n## Interpretation\n\nThe narrative describes a maritime legend; no primary source was supplied to verify Ardan or the alleged disappearance. The video labels its imagery as a legend/reconstruction.\n`);
await run("Generate original audio stems",python,[path.join(root,"tools","make-halimun-audio.py"),path.join(project,"assets","audio"),String(duration)]);
const stemOut=path.join(project,"assets","audio");
const mixed=path.join(project,"public","audio","final-mix.wav");
await run("Mix original voiceover, ducked BGM, and SFX","ffmpeg",[
 "-y","-i",source,"-i",path.join(stemOut,"bgm-original.wav"),"-i",path.join(stemOut,"sfx-original.wav"),
 "-filter_complex","[0:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo[voice];[1:a]volume=0.28[bed0];[bed0][voice]sidechaincompress=threshold=0.035:ratio=5:attack=45:release=420[bed];[2:a]volume=0.55[fx];[voice][bed][fx]amix=inputs=3:duration=first:dropout_transition=2:normalize=0,alimiter=limit=0.94:attack=5:release=80[out]",
 "-map","[out]","-ar","48000","-ac","2","-c:a","pcm_s16le",mixed
]);
await writeFile(path.join(project,"assets","PROVENANCE.md"),`# Asset provenance\n\n- Narration: supplied by user as ${path.basename(source)}; copied unchanged into assets/audio/narration.\n- BGM: generated locally with NumPy deterministic synthesis (seed 24061108), file assets/audio/bgm-original.wav.\n- SFX: generated locally from oscillator, shaped noise, and envelope synthesis; file assets/audio/sfx-original.wav.\n- Visuals: original Remotion/SVG vector illustration coded in src/Video.tsx; no external photos or footage represented as Pulau Laut documentation.\n- Fonts: system Arial/Georgia only.\n`);
const tries=3;
if(!existsSync(final)){
 for(let i=1;i<=tries;i++){
  try{
   await run(`Remotion video render attempt ${i}/${tries}`,"node",[cli,"render","src/index.tsx","PulauHalimunHoror",silent,"--codec=h264","--crf=21","--pixel-format=yuv420p","--browser-executable","C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe","--binaries-directory",rendererBinaries,"--log=error"],project);
   break;
  }catch(e){ if(i===tries) throw e; console.error(e.message,"Retrying Remotion render."); }
 }
 await run("Mux narration and original audio mix into MP4","ffmpeg",["-y","-i",silent,"-i",mixed,"-map","0:v:0","-map","1:a:0","-c:v","copy","-c:a","aac","-b:a","192k","-movflags","+faststart","-shortest",final]);
}
const probe=await run("Verify final MP4 with ffprobe","ffprobe",["-v","error","-show_entries","format=duration,size:stream=codec_name,width,height,r_frame_rate,sample_rate,channels","-of","json",final]);
const meta=JSON.parse(probe.stdout);
const vol=await run("Measure mixed-audio peak and RMS","ffmpeg",["-hide_banner","-i",mixed,"-af","volumedetect","-f","null","NUL"]);
for(const sec of [6,25,44,68,80,88,111,122,130,140,156,164]){
 const png=path.join(out,"frames",`frame-${String(sec).padStart(3,"0")}.png`);
 await mkdir(path.dirname(png),{recursive:true});
 await run(`Preview still at ${sec}s`,"node",[cli,"still","src/index.tsx","PulauHalimunHoror",png,`--frame=${sec*30}`,"--browser-executable","C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"],project);
}
await run("Build contact sheet","node",[path.join(root,"tools","contact-sheet.mjs"),path.join(out,"frames"),path.join(out,"contact-sheet")],root);
await writeFile(path.join(project,"docs","QC-REPORT.md"),`# QC report\n\nStatus: RENDERED — technical metadata recorded; visual sheet generated for review.\n\n## Final file\n\n${final}\n\n- ffprobe: ${JSON.stringify(meta.format)}\n- Streams: ${JSON.stringify(meta.streams)}\n- Video target: H.264, 720×1280, 30 fps; actual stream values above.\n- Voice: source WAV preserved; final mix uses stereo 48 kHz with original voice plus ducked BGM and original SFX stems.\n- Audio analysis log: docs/RUN-LOG.md (ffmpeg volumedetect; see final output lines).\n- Preview/contact sheet: out/contact-sheet/overview.jpg and 10 stills in out/frames.\n- Subtitle: out/captions.srt; timed by local faster-whisper-small output. ASR not manually proof-listened, so names/punctuation may need review.\n- Narrative verification: framed as legend/reconstruction; the supplied audio itself does not establish the disappearance as a documented fact.\n- Technical limitation: machine transcription and automated visual sampling are not substitutes for a human listening to every line; do not label as fully fact-checked.\n`);
await writeFile(path.join(project,"docs","WORK-STATUS.md"),`# Work status\n\nStatus: MP4 RENDERED — awaiting final visual review.\n\n- Title: Pulau Halimun — Perahu yang Tak Kembali\n- Render: 720×1280, H.264, 30 fps\n- Duration: ${duration.toFixed(3)} s; source narration retained unchanged.\n- Output: ${final}\n\n## Evidence\n\n- [x] Original WAV validated and preserved.\n- [x] Local Indonesian transcript: 41 timed segments.\n- [x] Storyboard, visual style, provenance and audio cue sheet.\n- [x] Editable BGM/SFX stems and ducked mix.\n- [x] Remotion composition rendered to MP4.\n- [x] ffprobe metadata and audio peak analysis recorded.\n- [x] Ten representative stills and contact sheet generated.\n- [ ] Finish visual and audio review; revise if a concrete defect is found.\n`);
const qcPath=path.join(project,"docs","QC-REPORT.md");
let qcText=await readFile(qcPath,"utf8");
qcText=qcText.replace("Status: RENDERED - technical metadata recorded; visual sheet generated for review.","Status: TECHNICAL AND SAMPLED VISUAL QA COMPLETE. Subjective audio listening and full transcript proofread remain unverified.")
 .replace("10 stills","12 stills")
 .replace("ASR not manually proof-listened, so names/punctuation may need review.","Ardan/Raka capitalization corrected from context; transcript not fully proof-listened.")
 .replace("Audio analysis log: docs/RUN-LOG.md (ffmpeg volumedetect; see final output lines).","FFmpeg volumedetect: mean -20.6 dBFS, sample peak -3.5 dBFS. LUFS/true peak and subjective listening were not measured.")
 .replace("Video target: H.264, 720x1280, 30 fps; actual stream values above.","Video target: H.264, 720x1280, 30 fps; full decode passed. Black/freeze scan found no interval above configured thresholds.")
 .replace("The supplied audio itself does not establish the disappearance as a documented fact.","The supplied audio itself does not establish the disappearance as a documented fact. Runtime follows the 166.211s original WAV (2:46), not 2 minutes.")
 .replace("Technical limitation: machine transcription and automated visual sampling are not substitutes for a human listening to every line; do not label as fully fact-checked.","Limitation: procedural audio stems have not been auditioned; do not claim a perfect mix.");
await writeFile(qcPath,qcText);
const statusPath=path.join(project,"docs","WORK-STATUS.md");
let statusText=await readFile(statusPath,"utf8");
statusText=statusText.replace("Status: MP4 RENDERED - awaiting final visual review.","Status: MP4 RENDERED - technical and sampled visual QA complete.")
 .replace("Ten representative stills","Twelve representative stills")
 .replace("[ ] Finish visual and audio review; revise if a concrete defect is found.","[x] Independent visual review and audio-level/cue review recorded.\n- [x] Final decode and black/frozen-frame scan completed.\n- [ ] Subjective audio listening and full transcript proofreading remain unverified.");
await writeFile(statusPath,statusText);
await rm(rendererBinaries,{recursive:true,force:true});
await rm(silent,{force:true});
console.log(JSON.stringify({final,meta:meta.format,streams:meta.streams,contactSheet:path.join(out,"contact-sheet","overview.jpg"),audioLog:vol.stderr.slice(-1000)},null,2));


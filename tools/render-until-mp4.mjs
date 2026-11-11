import {appendFile, cp, mkdir, rm} from "node:fs/promises";
import {existsSync} from "node:fs";
import {spawn, spawnSync} from "node:child_process";
import os from "node:os";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const args=process.argv.slice(2);
const get=(key,fallback)=>{const i=args.indexOf(key);return i<0?fallback:args[i+1]};
const projectName=get("--project",null),entry=get("--entry","src/index.tsx"),comp=get("--composition",null),outputArg=get("--output",null);
if(!projectName||!comp||!outputArg) throw new Error("Usage: node tools/render-until-mp4.mjs --project <slug> --entry <entry> --composition <id> --output <mp4>");
const project=path.join(root,"projects",projectName),output=path.resolve(project,outputArg),outputDir=path.dirname(output);
const publicDir=existsSync(path.join(project,"app","public"))?path.join(project,"app","public"):path.join(project,"public");
const log=path.join(project,"docs","RENDER-WATCHDOG.log");
const cli=path.join(root,"node_modules","@remotion","cli","remotion-cli.js");
const browser=["C:/Program Files/Google/Chrome/Application/chrome.exe","C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe","C:/Program Files/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
if(!browser) throw new Error("Install Google Chrome or Microsoft Edge for Remotion rendering.");
const binCache=path.join(os.tmpdir(),"remotion-video-binaries-v4.0.541-r1");
const packageBins=path.join(root,"node_modules",".pnpm","@remotion+compositor-win32-x64-msvc@4.0.541","node_modules","@remotion","compositor-win32-x64-msvc");
await mkdir(outputDir,{recursive:true}); await mkdir(path.join(project,"docs"),{recursive:true});
const line=async(text)=>{const stamp=new Date().toISOString();const msg="["+stamp+"] "+text;console.log(msg);await appendFile(log,msg+"\n")};
const validate=()=>{
 if(!existsSync(output)) return false;
 const p=spawnSync("ffprobe",["-v","error","-show_entries","format=duration:stream=codec_type,codec_name,width,height","-of","json",output],{encoding:"utf8",windowsHide:true});
 if(p.status!==0) return false;
 try{const m=JSON.parse(p.stdout);return Number(m.format?.duration)>1&&m.streams?.some(s=>s.codec_type==="video")}catch{return false}
};
if(validate()){console.log("Valid MP4 already exists: "+output);process.exit(0)}
if(!existsSync(path.join(binCache,"ffmpeg.exe"))||!existsSync(path.join(binCache,"ffprobe.exe"))){
  await rm(binCache,{recursive:true,force:true});
  await cp(packageBins,binCache,{recursive:true});
 }
let attempt=0,waitMs=30000;
while(!validate()){
 attempt++;
 await line("MP4 belum valid; memulai render attempt "+attempt+". Target: "+output);
 const r=await new Promise(resolve=>{
   const child=spawn(process.execPath,[cli,"render",entry,comp,output,"--codec=h264","--crf=21","--pixel-format=yuv420p","--browser-executable",browser,"--binaries-directory",binCache,"--public-dir",publicDir,"--log=info"],{cwd:project,windowsHide:true,stdio:["ignore","pipe","pipe"]});
  let pending=Promise.resolve();
  const record=(stream,label)=>stream.on("data",chunk=>{
   const s=chunk.toString();process.stdout.write(s);pending=pending.then(()=>appendFile(log,"["+label+"] "+s));
  });
  record(child.stdout,"stdout");record(child.stderr,"stderr");
  const heartbeat=setInterval(()=>{line("Render masih berjalan (attempt "+attempt+"); menunggu MP4 tervalidasi.").catch(()=>{})},30000);
  child.on("error",error=>{clearInterval(heartbeat);resolve({code:1,error:error.message,flush:pending})});
  child.on("close",code=>{clearInterval(heartbeat);resolve({code:code??1,flush:pending})});
 }).then(async x=>{await x.flush;return x});
 if(validate()){await line("MP4 tervalidasi: "+output);break}
 if(existsSync(output)) await rm(output,{force:true});
 await line("Render attempt "+attempt+" selesai tanpa MP4 valid (exit "+r.code+(r.error?", "+r.error:"")+"); mencoba lagi dalam "+Math.round(waitMs/1000)+" detik.");
 await new Promise(resolve=>setTimeout(resolve,waitMs));
 waitMs=Math.min(waitMs*1.5,5*60*1000);
}
await line("Selesai: "+output);

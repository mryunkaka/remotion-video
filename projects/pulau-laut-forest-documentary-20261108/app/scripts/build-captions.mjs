import {readFile, writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const narration = await readFile(path.join(root, "docs/narration-final.txt"), "utf8");
const sentences = narration.replace(/\s+/g, " ").match(/[^.!?]+[.!?]+|[^.!?]+$/g).map((s) => s.trim()).filter(Boolean);
const silenceStarts = [1.701542,4.233208,7.792917,9.047625,14.126167,17.510958,20.82475,24.405083,25.581417,28.326167,33.184625,38.003625,41.451625,44.724083,50.319542,56.982,65.900875,73.336875,76.220667,80.771792,85.512333,92.372875,97.087292,103.81075,108.322875,113.414833,117.091708,122.1865,129.456292,135.015583];
const silenceEnds = [2.091833,4.663333,8.428542,9.411542,14.746583,18.004708,21.295333,25.101125,25.944208,28.893125,33.601417,38.590125,41.996,45.199542,50.72325,57.637458,66.485542,74.006375,76.825083,81.316375,86.002375,92.978292,97.561292,104.416333,108.731375,114.062333,117.528875,122.675375,130.033125,135.609833];
const endIndexes = [0,2,4,7,9,11,12,13,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,-1];
if (sentences.length !== endIndexes.length) throw new Error("Expected 24 script sentences, found "+sentences.length);
let sentenceStart = 0;
const captions = [];
for (let i=0; i<sentences.length; i++) {
  const sentenceEnd = endIndexes[i] < 0 ? 141.490958 : silenceStarts[endIndexes[i]];
  const chunks=[];
  let current="";
  for (const word of sentences[i].split(/\s+/)) {
    if (current && (current+" "+word).length > 48) { chunks.push(current); current=word; }
    else current=current ? current+" "+word : word;
  }
  if (current) chunks.push(current);
  const weights=chunks.map((text)=>text.length+(/[.!?]$/.test(text)?3:0));
  const weightSum=weights.reduce((sum,w)=>sum+w,0);
  let done=0;
  for (let j=0;j<chunks.length;j++) {
    const start=sentenceStart+(sentenceEnd-sentenceStart)*done/weightSum;
    done+=weights[j];
    const end=sentenceStart+(sentenceEnd-sentenceStart)*done/weightSum;
    captions.push({start:+start.toFixed(3),end:+end.toFixed(3),text:chunks[j]});
  }
  sentenceStart=endIndexes[i] < 0 ? sentenceEnd : silenceEnds[endIndexes[i]];
}
const source="export const captions = "+JSON.stringify(captions)+" as const;\n";
const filmPath=path.join(root,"src/Film.tsx");
let film=await readFile(filmPath,"utf8");
film=film.replace(/type Caption = \{start:number; end:number;\s*text:string\};\r?\n/,"");
film=film.replace(/^const captions = \[.*\];\r?\n/m,"");
film=film.replace('import React from "react";\n','import React from "react";\nimport { captions } from "./captions-data";\n');
await writeFile(path.join(root,"src/captions-data.ts"),source);
await writeFile(filmPath,film);
const stamp=(seconds)=>{const ms=Math.round(seconds*1000);return String(Math.floor(ms/3600000)).padStart(2,"0")+":"+String(Math.floor(ms/60000)%60).padStart(2,"0")+":"+String(Math.floor(ms/1000)%60).padStart(2,"0")+","+String(ms%1000).padStart(3,"0");};
const srt=captions.map((c,i)=>(i+1)+"\n"+stamp(c.start)+" --> "+stamp(c.end)+"\n"+c.text).join("\n\n")+"\n";
await writeFile(path.join(root,"out/HUTAN_PULAU_LAUT.srt"),srt);
console.log("Wrote "+captions.length+" captions using detected silences and supplied script text.");



## 2026-11-08T12:15:31.815Z • Generate original audio stems
Created BGM/SFX stems: 166.211s at 48000 Hz

## 2026-11-08T12:15:37.567Z • Mix original voiceover, ducked BGM, and SFX
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
[aist#0:0/pcm_s16le @ 000002011f1681c0] Guessed Channel Layout: mono
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\narration\ugc-kanvas-voiceover-zephyr (8).wav':
  Duration: 00:02:46.21, bitrate: 384 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 24000 Hz, mono, s16, 384 kb/s
[aist#1:0/pcm_s16le @ 0000020120fec540] Guessed Channel Layout: stereo
Input #1, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\bgm-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #1:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[aist#2:0/pcm_s16le @ 000002011f15d8c0] Guessed Channel Layout: stereo
Input #2, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\sfx-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #2:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
Stream mapping:
  Stream #0:0 (pcm_s16le) -> aresample:default
  Stream #0:0 (pcm_s16le) -> amix
  Stream #1:0 (pcm_s16le) -> volume:default
  Stream #2:0 (pcm_s16le) -> volume:default
  alimiter:default -> Stream #0:0 (pcm_s16le)
Press [q] to stop, [?] for help
Output #0, wav, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    ISFT            : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
size=   27392KiB time=00:02:26.60 bitrate=1530.6kbits/s speed= 285x elapsed=0:00:00.51    [out#0/wav @ 000002011f139280] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.000244%
size=   31165KiB time=00:02:46.21 bitrate=1536.0kbits/s speed= 283x elapsed=0:00:00.58    

## 2026-11-08T12:15:38.320Z • Remotion MP4 render attempt 1/3
node:https:408
      const err = new ERR_PROXY_TUNNEL(`Connection to establish proxy tunnel timed out after ${proxyTunnelTimeout}ms`);
                  ^

Error [ERR_PROXY_TUNNEL]: Connection to establish proxy tunnel timed out after 5000ms
    at Socket.onTimeout (node:https:408:19)
    at Socket.wrapper (node:events:639:12)
    at Socket.emit (node:events:526:24)
    at Socket._onTimeout (node:net:886:8)
    at Timeout.onStreamTimeout (node:internal/stream_base_commons:242:10)
    at listOnTimeout (node:internal/timers:687:11)
    at process.processTimers (node:internal/timers:618:7) {
  code: 'ERR_PROXY_TUNNEL',
  proxyTunnelTimeout: 5000
}

Node.js v26.13.0

## 2026-11-08T12:15:47.049Z • Remotion MP4 render attempt 2/3
node:internal/process/promises:324
    triggerUncaughtException(err, true /* fromPromise */);
    ^

Error: self-signed certificate in certificate chain
    at TLSSocket.onConnectSecure (node:internal/tls/wrap:1787:34)
    at TLSSocket.emit (node:events:514:20)
    at TLSSocket._finishInit (node:internal/tls/wrap:1215:8)
    at ssl.onhandshakedone (node:internal/tls/wrap:996:12) {
  code: 'SELF_SIGNED_CERT_IN_CHAIN'
}

Node.js v26.13.0

## 2026-11-08T12:15:51.948Z • Remotion MP4 render attempt 3/3
node:https:408
      const err = new ERR_PROXY_TUNNEL(`Connection to establish proxy tunnel timed out after ${proxyTunnelTimeout}ms`);
                  ^

Error [ERR_PROXY_TUNNEL]: Connection to establish proxy tunnel timed out after 5000ms
    at Socket.onTimeout (node:https:408:19)
    at Socket.wrapper (node:events:639:12)
    at Socket.emit (node:events:526:24)
    at Socket._onTimeout (node:net:886:8)
    at Timeout.onStreamTimeout (node:internal/stream_base_commons:242:10)
    at listOnTimeout (node:internal/timers:687:11)
    at process.processTimers (node:internal/timers:618:7) {
  code: 'ERR_PROXY_TUNNEL',
  proxyTunnelTimeout: 5000
}

Node.js v26.13.0

## 2026-11-08T12:16:49.624Z • Generate original audio stems
Created BGM/SFX stems: 166.211s at 48000 Hz

## 2026-11-08T12:16:54.534Z • Mix original voiceover, ducked BGM, and SFX
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
[aist#0:0/pcm_s16le @ 00000212c3fc9cc0] Guessed Channel Layout: mono
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\narration\ugc-kanvas-voiceover-zephyr (8).wav':
  Duration: 00:02:46.21, bitrate: 384 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 24000 Hz, mono, s16, 384 kb/s
[aist#1:0/pcm_s16le @ 00000212c458be00] Guessed Channel Layout: stereo
Input #1, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\bgm-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #1:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[aist#2:0/pcm_s16le @ 00000212c44ff1c0] Guessed Channel Layout: stereo
Input #2, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\sfx-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #2:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
Stream mapping:
  Stream #0:0 (pcm_s16le) -> aresample:default
  Stream #0:0 (pcm_s16le) -> amix
  Stream #1:0 (pcm_s16le) -> volume:default
  Stream #2:0 (pcm_s16le) -> volume:default
  alimiter:default -> Stream #0:0 (pcm_s16le)
Press [q] to stop, [?] for help
Output #0, wav, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    ISFT            : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
size=   24576KiB time=00:02:11.75 bitrate=1528.0kbits/s speed= 261x elapsed=0:00:00.50    [out#0/wav @ 00000212c44cb900] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.000244%
size=   31165KiB time=00:02:46.21 bitrate=1536.0kbits/s speed= 261x elapsed=0:00:00.63    

## 2026-11-08T12:16:55.314Z • Remotion MP4 render attempt 1/3
Error:   × Module build failed (from builtin:swc-loader):
  ╰─▶   × Syntax Error: Unterminated template
           ╭─[19:0]
        19 │     const Wave:React.FC<{y:number;speed:number;color:string}> = ({y,speed,color})=>{
        20 │      const f=useCurrentFrame(), x=(f*speed)%720;
        21 │ ╭─▶  const d=\`M0 \${y} Q90 \${y-14} 180 \${y} T360 \${y} T540 \${y} T720 \${y} T900 \${y} T1080 \${y} T1260 \${y} T1440 \${y}\`;
        22 │ │    return <g fill="none" stroke={color} strokeWidth="3" opacity=".48"><path d={d} transform={\`translate(\${-x} 0)\`}/><path d={d} transform={\`translate(\${720-x} 0)\`}/></g>;
        23 │ │   };
        24 │ │   const Boat:React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1})=>{
        25 │ │    const f=useCurrentFrame();
        26 │ │    return <g transform={\`translate(\${x} \${y+Math.sin(f/13)*7}) scale(\${scale})\`}>
        27 │ │     <path d="M-225 0 Q-155 36 30 34 Q165 32 230 0 L195 70 Q5 96 -185 64Z" fill="#101c25" stroke="#54727c" strokeWidth="5"/>
        28 │ │     <path d="M-70 -8 L-54 -76 L90 -76 L114 -4Z" fill="#17272f" stroke="#667f83" strokeWidth="4"/>
        29 │ │     <path d="M-31 -61 L9 -61 L9 -28 L-31 -28Z M28 -61 L72 -61 L72 -28 L28 -28Z" fill="#ce965a" opacity=".62"/>
        30 │ │    </g>;
        31 │ │   };
        32 │ │   const Person:React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1})=><g transform={\`translate(\${x} \${y}) scale(\${scale})\`}>
        33 │ │    <ellipse cy="0" rx="43" ry="10" fill="#071118" opacity=".5"/><path d="M-27 -150 Q-45 -112 -51 -50 L-70 -8 Q-30 4 0 -4 Q39 5 70 -8 L47 -60 Q42 -116 23 -150Z" fill="#151b20"/>
        34 │ │    <circle cy="-180" r="27" fill="#202329"/><path d="M-24 -194 Q0 -228 25 -194 L22 -178 Q0 -188 -24 -178Z" fill="#10171b"/>
        35 │ │    </g>;
        36 │ │   const Radio:React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1})=>{
        37 │ │    const f=useCurrentFrame(),on=Math.sin(f*1.7)>.7;
        38 │ │    return <g transform={\`translate(\${x} \${y}) scale(\${scale})\`}>
        39 │ │    <rect x="-126" y="-85" width="252" height="170" rx="20" fill="#17252c" stroke="#779096" strokeWidth="8"/>
        40 │ │    <rect x="-96" y="-55" width="142" height="72" rx="8" fill="#071116" stroke="#53686d" strokeWidth="4"/>
        41 │ │    <path d="M-78 -19 q18 -27 34 0 t34 0 t34 0" fill="none" stroke={on?"#f2c36e":"#85a5a0"} strokeWidth="4"/>
        42 │ │    <circle cx="78" cy="-36" r="18" fill="#34464b" stroke="#a2b2a5" strokeWidth="5"/><circle cx="78" cy="27" r="10" fill={on?"#ef9b5e":"#6b4f40"/>
        43 │ │    <path d="M-174 -85 L-158 -172 L-150 -174 L-153 -80 M-78 49 H50 M-78 64 H50" fill="none" stroke="#829393" strokeWidth="5"/>
        44 │ │    </g>;
        45 │ │   };
        46 │ │   const Art:React.FC<{kind:string}>=({kind})=>{
        47 │ │    const f=useCurrentFrame(),drift=Math.sin(f/87)*18;
        48 │ │    const dark=["radioBoat","lights","empty","radioHome","last"].includes(kind);
        49 │ │    const horizon=kind==="home"||kind==="radioHome"?760:650;
        50 │ │    const isBoat=["boat","bell","depart","radioBoat","lights","empty"].includes(kind);
        51 │ │    return <AbsoluteFill style={{overflow:"hidden",background:dark?"#07121a":"#15272f"}}>
        52 │ │    <svg width="100%" height="100%" viewBox="0 0 720 1280" preserveAspectRatio="xMidYMid slice" style={{position:"absolute"}}>
        53 │ │     <defs>
        54 │ │      <linearGradient id="sky" x2="0" y2="1"><stop stopColor={dark?"#080f1b":"#35464a"}/><stop offset=".6" stopColor={dark?"#182b32":"#a27756"}/><stop offset="1" stopColor="#56483d"/></linearGradient>
        55 │ │      <linearGradient id="sea" x2="0" y2="1"><stop stopColor="#24414a"/><stop offset="1" stopColor="#091720"/></linearGradient>
        56 │ │      <radialGradient id="halo"><stop stopColor="#eed69c" stopOpacity=".7"/><stop offset="1" stopColor="#e1b769" stopOpacity="0"/></radialGradient>
        57 │ │     </defs>
        58 │ │     <rect width="720" height="810" fill="url(#sky)"/><circle cx="555" cy="250" r="185" fill="url(#halo)"/><circle cx="555" cy="250" r="36" fill="#eadbb5" opacity=".76"/>
        59 │ │     <path d="M0 540 Q150 475 285 528 T540 510 T780 520 V800 H0Z" fill="#18272a" opacity=".7"/>
        60 │ │     <rect y={horizon} width="720" height="500" fill="url(#sea)"/>
        61 │ │     <Wave y={horizon+80} speed={1.2} color="#82a6a1"/><Wave y={horizon+170} speed={-1.7} color="#51777b"/><Wave y={horizon+280} speed={2.3} color="#294c55"/>
        62 │ │     {kind==="bell"&&<g transform={\`translate(\${360+drift} 800)\`}>
        63 │ │      <path d="M0 0 C-18 -60 -42 -89 -21 -111 Q0 -135 21 -111 C42 -89 18 -60 0 0Z" fill="#9b906d" opacity=".65"/>
        64 │ │      {[0,1,2].map(i=><ellipse key={i} rx={55+i*55+Math.sin(f/16)*6} ry={13+i*18} fill="none" stroke="#b8c4a0" strokeWidth="2" opacity={.38-i*.08}/>)}
        65 │ │     </g>}
        66 │ │     {kind==="home"&&<g transform={\`translate(\${360+drift} 805)\`}>
        67 │ │      <path d="M-215 -180 L0 -320 L215 -180 V95 H-215Z" fill="#182327" stroke="#927c63" strokeWidth="6"/>
        68 │ │      <path d="M-246 -180 L0 -354 L248 -180" fill="none" stroke="#bd9e74" strokeWidth="13"/>
        69 │ │      <rect x="-158" y="-131" width="97" height="132" fill="#e5ad67" opacity=".45"/><rect x="59" y="-131" width="97" height="132" fill="#d28c48" opacity=".38"/>
        70 │ │      <path d="M-18 94 V-86 Q0 -127 20 -86 V94" fill="#0a1418"/>
        71 │ │      <Person x={-74} y={34} scale={.77}/><Person x={75} y={34} scale={.76}/>
        72 │ │     </g>}
        73 │ │     {isBoat&&<g transform={\`translate(\${kind==="empty"?404:360+drift} 0)\`}>
        74 │ │      {kind==="empty"?<Boat x={0} y={horizon+54} scale={.45}/>:<Boat x={0} y={horizon+38} scale={kind==="lights"?.78:1}/>}
        75 │ │      {kind==="boat"&&<Person x={0} y={horizon+8} scale={.76}/>}
        76 │ │      {kind==="depart"&&<Person x={-250-drift} y={horizon+8} scale={.48}/>}
        77 │ │      {kind==="radioBoat"&&<><rect x="276" y={horizon-52} width="168" height="56" rx="8" fill="#111d22" stroke="#667d7d" strokeWidth="4"/><Radio x={360} y={horizon-24} scale={.69}/></>}
        78 │ │     </g>}
        79 │ │     {(kind==="lights"||kind==="last")&&[0,1,2].map((i)=><g key={i} transform={\`translate(\${170+i*184+Math.sin(f/24+i)*12} \${kind==="last"?640:590+Math.sin(f/18+i*2)*10})\`}>
        80 │ │      <circle r={88+Math.sin(f/12+i)*7} fill="url(#halo)" opacity=".88"/><circle r="10" fill="#f5d997"/><path d="M0 32 Q-6 90 0 140 Q7 84 0 32Z" fill="#f0d69a" opacity=".24"/>
        81 │ │     </g>)}
        82 │ │     {kind==="radioHome"&&<g transform="translate(360 1060)"><rect x="-236" y="-110" width="472" height="220" rx="25" fill="#17252a" stroke="#8d9284" strokeWidth="6"/><Radio x={0} y={0} scale={.78}/></g>}
        83 │ │    </svg>
        84 │ │    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(3,8,12,.18),transparent 26%,transparent 61%,rgba(2,8,12,.55))",boxShadow:"inset 0 0 125px rgba(0,0,0,.38)"}}/>
        85 │ │    </AbsoluteFill>;
        86 │ │   };
        87 │ │   const Shot:React.FC<{s:SceneDef}>=({s})=>{
        88 │ │    const f=useCurrentFrame(),len=(s.end-s.start)*FPS;
        89 │ │    const alpha=interpolate(f,[0,18,len-18,len],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
        90 │ │    return <AbsoluteFill style={{opacity:alpha,transform:\`scale(\${1.03+Math.sin(f/170)*.012}) translateX(\${Math.sin(f/90)*8}px)\`}}>
        91 │ │     <Art kind={s.kind}/>
        92 │ │     <div style={{position:"absolute",top:80,left:42,right:42,display:"flex",justifyContent:"space-between",color:"rgba(238,226,204,.8)",fontFamily:"Arial",fontSize:16,letterSpacing:3}}><span>{s.label}</span><span style={{opacity:.55}}>KOTABARU</span></div>
        93 │ │     {s.id==="hook"&&<div style={{position:"absolute",top:290,left:48,color:"#f2e9d7",fontFamily:"Georgia",textShadow:"0 4px 20px #07121a"}}>
        94 │ │      <div style={{fontSize:59,lineHeight:1.03}}>TIGA CAHAYA<br/>DI TENGAH LAUT</div><div style={{marginTop:20,fontFamily:"Arial",fontSize:19,letterSpacing:2,color:"#e3bc82"}}>SUARA SIAPA YANG MEMANGGIL?</div>
        95 │ │     </div>}
        96 │ │     {s.id==="last"&&<div style={{position:"absolute",top:340,left:40,right:40,textAlign:"center",fontFamily:"Georgia",fontSize:39,color:"#f0d8a7",textShadow:"0 3px 18px #000"}}>JANGAN CARI<br/>BAPAKMU.</div>}
        97 │ │    </AbsoluteFill>;
        98 │ │   };
        99 │ │   const Subtitle:React.FC=()=>{
       100 │ │    const f=useCurrentFrame(),sec=f/FPS,item=captions.find(x=>sec>=x.start&&sec<x.end);
       101 │ │    if(!item)return null;
       102 │ │    const alpha=interpolate(sec,[item.start,item.start+.1,item.end-.08,item.end],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
       103 │ │    return <div style={{position:"absolute",left:28,right:28,bottom:66,minHeight:132,display:"flex",alignItems:"center",justifyContent:"center",opacity:alpha,background:"linear-gradient(180deg,transparent,rgba(4,9,12,.76) 18%,rgba(4,9,12,.76) 82%,transparent)",padding:"18px 24px",boxSizing:"border-box"}}>
       104 │ │     <div style={{maxWidth:650,textAlign:"center",fontFamily:"Arial",fontWeight:700,fontSize:30,lineHeight:1.27,color:"#fff8e9",textShadow:"0 2px 8px #000"}}>{item.text}</div>
       105 │ │    </div>;
       106 │ │   };
       107 │ │   const Video:React.FC=()=> <AbsoluteFill style={{background:"#07121a"}}>
       108 │ │    {scenes.map(s=><Sequence key={s.id} from={Math.round(s.start*FPS)} durationInFrames={Math.ceil(s.end*FPS)-Math.round(s.start*FPS)} layout="none"><Shot s={s}/></Sequence>)}
       109 │ │    <Subtitle/><Audio src={staticFile("audio/final-mix.wav")}/>
       110 │ │    </AbsoluteFill>;
       111 │ │   export const HalimunComposition:React.FC=()=> <Composition id="PulauHalimunHoror" component={Video} durationInFrames={DURATION_FRAMES} fps={FPS} width={720} height={1280}/>;
       112 │ ╰─▶
           ╰────
      

undefined
    at Object.internalBundle (D:\Project\remotion-video\node_modules\.pnpm\@remotion+bundler@4.0.541_p_32c001b6a7b0ae8eda9f04bac5484779\node_modules\@remotion\bundler\dist\bundle.js:225:19)
    at async bundleOnCli (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\setup-cache.js:153:21)
    at async bundleOnCliOrTakeServeUrl (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\setup-cache.js:35:21)
    at async renderVideoFlow (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\render-flows\render.js:182:53)
    at async render (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\render.js:170:5)
    at async cli (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\index.js:122:13)

## 2026-11-08T12:17:01.959Z • Remotion MP4 render attempt 2/3
Error:   × Module build failed (from builtin:swc-loader):
  ╰─▶   × Syntax Error: Unterminated template
           ╭─[19:0]
        19 │     const Wave:React.FC<{y:number;speed:number;color:string}> = ({y,speed,color})=>{
        20 │      const f=useCurrentFrame(), x=(f*speed)%720;
        21 │ ╭─▶  const d=\`M0 \${y} Q90 \${y-14} 180 \${y} T360 \${y} T540 \${y} T720 \${y} T900 \${y} T1080 \${y} T1260 \${y} T1440 \${y}\`;
        22 │ │    return <g fill="none" stroke={color} strokeWidth="3" opacity=".48"><path d={d} transform={\`translate(\${-x} 0)\`}/><path d={d} transform={\`translate(\${720-x} 0)\`}/></g>;
        23 │ │   };
        24 │ │   const Boat:React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1})=>{
        25 │ │    const f=useCurrentFrame();
        26 │ │    return <g transform={\`translate(\${x} \${y+Math.sin(f/13)*7}) scale(\${scale})\`}>
        27 │ │     <path d="M-225 0 Q-155 36 30 34 Q165 32 230 0 L195 70 Q5 96 -185 64Z" fill="#101c25" stroke="#54727c" strokeWidth="5"/>
        28 │ │     <path d="M-70 -8 L-54 -76 L90 -76 L114 -4Z" fill="#17272f" stroke="#667f83" strokeWidth="4"/>
        29 │ │     <path d="M-31 -61 L9 -61 L9 -28 L-31 -28Z M28 -61 L72 -61 L72 -28 L28 -28Z" fill="#ce965a" opacity=".62"/>
        30 │ │    </g>;
        31 │ │   };
        32 │ │   const Person:React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1})=><g transform={\`translate(\${x} \${y}) scale(\${scale})\`}>
        33 │ │    <ellipse cy="0" rx="43" ry="10" fill="#071118" opacity=".5"/><path d="M-27 -150 Q-45 -112 -51 -50 L-70 -8 Q-30 4 0 -4 Q39 5 70 -8 L47 -60 Q42 -116 23 -150Z" fill="#151b20"/>
        34 │ │    <circle cy="-180" r="27" fill="#202329"/><path d="M-24 -194 Q0 -228 25 -194 L22 -178 Q0 -188 -24 -178Z" fill="#10171b"/>
        35 │ │    </g>;
        36 │ │   const Radio:React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1})=>{
        37 │ │    const f=useCurrentFrame(),on=Math.sin(f*1.7)>.7;
        38 │ │    return <g transform={\`translate(\${x} \${y}) scale(\${scale})\`}>
        39 │ │    <rect x="-126" y="-85" width="252" height="170" rx="20" fill="#17252c" stroke="#779096" strokeWidth="8"/>
        40 │ │    <rect x="-96" y="-55" width="142" height="72" rx="8" fill="#071116" stroke="#53686d" strokeWidth="4"/>
        41 │ │    <path d="M-78 -19 q18 -27 34 0 t34 0 t34 0" fill="none" stroke={on?"#f2c36e":"#85a5a0"} strokeWidth="4"/>
        42 │ │    <circle cx="78" cy="-36" r="18" fill="#34464b" stroke="#a2b2a5" strokeWidth="5"/><circle cx="78" cy="27" r="10" fill={on?"#ef9b5e":"#6b4f40"/>
        43 │ │    <path d="M-174 -85 L-158 -172 L-150 -174 L-153 -80 M-78 49 H50 M-78 64 H50" fill="none" stroke="#829393" strokeWidth="5"/>
        44 │ │    </g>;
        45 │ │   };
        46 │ │   const Art:React.FC<{kind:string}>=({kind})=>{
        47 │ │    const f=useCurrentFrame(),drift=Math.sin(f/87)*18;
        48 │ │    const dark=["radioBoat","lights","empty","radioHome","last"].includes(kind);
        49 │ │    const horizon=kind==="home"||kind==="radioHome"?760:650;
        50 │ │    const isBoat=["boat","bell","depart","radioBoat","lights","empty"].includes(kind);
        51 │ │    return <AbsoluteFill style={{overflow:"hidden",background:dark?"#07121a":"#15272f"}}>
        52 │ │    <svg width="100%" height="100%" viewBox="0 0 720 1280" preserveAspectRatio="xMidYMid slice" style={{position:"absolute"}}>
        53 │ │     <defs>
        54 │ │      <linearGradient id="sky" x2="0" y2="1"><stop stopColor={dark?"#080f1b":"#35464a"}/><stop offset=".6" stopColor={dark?"#182b32":"#a27756"}/><stop offset="1" stopColor="#56483d"/></linearGradient>
        55 │ │      <linearGradient id="sea" x2="0" y2="1"><stop stopColor="#24414a"/><stop offset="1" stopColor="#091720"/></linearGradient>
        56 │ │      <radialGradient id="halo"><stop stopColor="#eed69c" stopOpacity=".7"/><stop offset="1" stopColor="#e1b769" stopOpacity="0"/></radialGradient>
        57 │ │     </defs>
        58 │ │     <rect width="720" height="810" fill="url(#sky)"/><circle cx="555" cy="250" r="185" fill="url(#halo)"/><circle cx="555" cy="250" r="36" fill="#eadbb5" opacity=".76"/>
        59 │ │     <path d="M0 540 Q150 475 285 528 T540 510 T780 520 V800 H0Z" fill="#18272a" opacity=".7"/>
        60 │ │     <rect y={horizon} width="720" height="500" fill="url(#sea)"/>
        61 │ │     <Wave y={horizon+80} speed={1.2} color="#82a6a1"/><Wave y={horizon+170} speed={-1.7} color="#51777b"/><Wave y={horizon+280} speed={2.3} color="#294c55"/>
        62 │ │     {kind==="bell"&&<g transform={\`translate(\${360+drift} 800)\`}>
        63 │ │      <path d="M0 0 C-18 -60 -42 -89 -21 -111 Q0 -135 21 -111 C42 -89 18 -60 0 0Z" fill="#9b906d" opacity=".65"/>
        64 │ │      {[0,1,2].map(i=><ellipse key={i} rx={55+i*55+Math.sin(f/16)*6} ry={13+i*18} fill="none" stroke="#b8c4a0" strokeWidth="2" opacity={.38-i*.08}/>)}
        65 │ │     </g>}
        66 │ │     {kind==="home"&&<g transform={\`translate(\${360+drift} 805)\`}>
        67 │ │      <path d="M-215 -180 L0 -320 L215 -180 V95 H-215Z" fill="#182327" stroke="#927c63" strokeWidth="6"/>
        68 │ │      <path d="M-246 -180 L0 -354 L248 -180" fill="none" stroke="#bd9e74" strokeWidth="13"/>
        69 │ │      <rect x="-158" y="-131" width="97" height="132" fill="#e5ad67" opacity=".45"/><rect x="59" y="-131" width="97" height="132" fill="#d28c48" opacity=".38"/>
        70 │ │      <path d="M-18 94 V-86 Q0 -127 20 -86 V94" fill="#0a1418"/>
        71 │ │      <Person x={-74} y={34} scale={.77}/><Person x={75} y={34} scale={.76}/>
        72 │ │     </g>}
        73 │ │     {isBoat&&<g transform={\`translate(\${kind==="empty"?404:360+drift} 0)\`}>
        74 │ │      {kind==="empty"?<Boat x={0} y={horizon+54} scale={.45}/>:<Boat x={0} y={horizon+38} scale={kind==="lights"?.78:1}/>}
        75 │ │      {kind==="boat"&&<Person x={0} y={horizon+8} scale={.76}/>}
        76 │ │      {kind==="depart"&&<Person x={-250-drift} y={horizon+8} scale={.48}/>}
        77 │ │      {kind==="radioBoat"&&<><rect x="276" y={horizon-52} width="168" height="56" rx="8" fill="#111d22" stroke="#667d7d" strokeWidth="4"/><Radio x={360} y={horizon-24} scale={.69}/></>}
        78 │ │     </g>}
        79 │ │     {(kind==="lights"||kind==="last")&&[0,1,2].map((i)=><g key={i} transform={\`translate(\${170+i*184+Math.sin(f/24+i)*12} \${kind==="last"?640:590+Math.sin(f/18+i*2)*10})\`}>
        80 │ │      <circle r={88+Math.sin(f/12+i)*7} fill="url(#halo)" opacity=".88"/><circle r="10" fill="#f5d997"/><path d="M0 32 Q-6 90 0 140 Q7 84 0 32Z" fill="#f0d69a" opacity=".24"/>
        81 │ │     </g>)}
        82 │ │     {kind==="radioHome"&&<g transform="translate(360 1060)"><rect x="-236" y="-110" width="472" height="220" rx="25" fill="#17252a" stroke="#8d9284" strokeWidth="6"/><Radio x={0} y={0} scale={.78}/></g>}
        83 │ │    </svg>
        84 │ │    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(3,8,12,.18),transparent 26%,transparent 61%,rgba(2,8,12,.55))",boxShadow:"inset 0 0 125px rgba(0,0,0,.38)"}}/>
        85 │ │    </AbsoluteFill>;
        86 │ │   };
        87 │ │   const Shot:React.FC<{s:SceneDef}>=({s})=>{
        88 │ │    const f=useCurrentFrame(),len=(s.end-s.start)*FPS;
        89 │ │    const alpha=interpolate(f,[0,18,len-18,len],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
        90 │ │    return <AbsoluteFill style={{opacity:alpha,transform:\`scale(\${1.03+Math.sin(f/170)*.012}) translateX(\${Math.sin(f/90)*8}px)\`}}>
        91 │ │     <Art kind={s.kind}/>
        92 │ │     <div style={{position:"absolute",top:80,left:42,right:42,display:"flex",justifyContent:"space-between",color:"rgba(238,226,204,.8)",fontFamily:"Arial",fontSize:16,letterSpacing:3}}><span>{s.label}</span><span style={{opacity:.55}}>KOTABARU</span></div>
        93 │ │     {s.id==="hook"&&<div style={{position:"absolute",top:290,left:48,color:"#f2e9d7",fontFamily:"Georgia",textShadow:"0 4px 20px #07121a"}}>
        94 │ │      <div style={{fontSize:59,lineHeight:1.03}}>TIGA CAHAYA<br/>DI TENGAH LAUT</div><div style={{marginTop:20,fontFamily:"Arial",fontSize:19,letterSpacing:2,color:"#e3bc82"}}>SUARA SIAPA YANG MEMANGGIL?</div>
        95 │ │     </div>}
        96 │ │     {s.id==="last"&&<div style={{position:"absolute",top:340,left:40,right:40,textAlign:"center",fontFamily:"Georgia",fontSize:39,color:"#f0d8a7",textShadow:"0 3px 18px #000"}}>JANGAN CARI<br/>BAPAKMU.</div>}
        97 │ │    </AbsoluteFill>;
        98 │ │   };
        99 │ │   const Subtitle:React.FC=()=>{
       100 │ │    const f=useCurrentFrame(),sec=f/FPS,item=captions.find(x=>sec>=x.start&&sec<x.end);
       101 │ │    if(!item)return null;
       102 │ │    const alpha=interpolate(sec,[item.start,item.start+.1,item.end-.08,item.end],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
       103 │ │    return <div style={{position:"absolute",left:28,right:28,bottom:66,minHeight:132,display:"flex",alignItems:"center",justifyContent:"center",opacity:alpha,background:"linear-gradient(180deg,transparent,rgba(4,9,12,.76) 18%,rgba(4,9,12,.76) 82%,transparent)",padding:"18px 24px",boxSizing:"border-box"}}>
       104 │ │     <div style={{maxWidth:650,textAlign:"center",fontFamily:"Arial",fontWeight:700,fontSize:30,lineHeight:1.27,color:"#fff8e9",textShadow:"0 2px 8px #000"}}>{item.text}</div>
       105 │ │    </div>;
       106 │ │   };
       107 │ │   const Video:React.FC=()=> <AbsoluteFill style={{background:"#07121a"}}>
       108 │ │    {scenes.map(s=><Sequence key={s.id} from={Math.round(s.start*FPS)} durationInFrames={Math.ceil(s.end*FPS)-Math.round(s.start*FPS)} layout="none"><Shot s={s}/></Sequence>)}
       109 │ │    <Subtitle/><Audio src={staticFile("audio/final-mix.wav")}/>
       110 │ │    </AbsoluteFill>;
       111 │ │   export const HalimunComposition:React.FC=()=> <Composition id="PulauHalimunHoror" component={Video} durationInFrames={DURATION_FRAMES} fps={FPS} width={720} height={1280}/>;
       112 │ ╰─▶
           ╰────
      

undefined
    at Object.internalBundle (D:\Project\remotion-video\node_modules\.pnpm\@remotion+bundler@4.0.541_p_32c001b6a7b0ae8eda9f04bac5484779\node_modules\@remotion\bundler\dist\bundle.js:225:19)
    at async bundleOnCli (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\setup-cache.js:153:21)
    at async bundleOnCliOrTakeServeUrl (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\setup-cache.js:35:21)
    at async renderVideoFlow (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\render-flows\render.js:182:53)
    at async render (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\render.js:170:5)
    at async cli (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\index.js:122:13)

## 2026-11-08T12:17:06.990Z • Remotion MP4 render attempt 3/3
Error:   × Module build failed (from builtin:swc-loader):
  ╰─▶   × Syntax Error: Unterminated template
           ╭─[19:0]
        19 │     const Wave:React.FC<{y:number;speed:number;color:string}> = ({y,speed,color})=>{
        20 │      const f=useCurrentFrame(), x=(f*speed)%720;
        21 │ ╭─▶  const d=\`M0 \${y} Q90 \${y-14} 180 \${y} T360 \${y} T540 \${y} T720 \${y} T900 \${y} T1080 \${y} T1260 \${y} T1440 \${y}\`;
        22 │ │    return <g fill="none" stroke={color} strokeWidth="3" opacity=".48"><path d={d} transform={\`translate(\${-x} 0)\`}/><path d={d} transform={\`translate(\${720-x} 0)\`}/></g>;
        23 │ │   };
        24 │ │   const Boat:React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1})=>{
        25 │ │    const f=useCurrentFrame();
        26 │ │    return <g transform={\`translate(\${x} \${y+Math.sin(f/13)*7}) scale(\${scale})\`}>
        27 │ │     <path d="M-225 0 Q-155 36 30 34 Q165 32 230 0 L195 70 Q5 96 -185 64Z" fill="#101c25" stroke="#54727c" strokeWidth="5"/>
        28 │ │     <path d="M-70 -8 L-54 -76 L90 -76 L114 -4Z" fill="#17272f" stroke="#667f83" strokeWidth="4"/>
        29 │ │     <path d="M-31 -61 L9 -61 L9 -28 L-31 -28Z M28 -61 L72 -61 L72 -28 L28 -28Z" fill="#ce965a" opacity=".62"/>
        30 │ │    </g>;
        31 │ │   };
        32 │ │   const Person:React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1})=><g transform={\`translate(\${x} \${y}) scale(\${scale})\`}>
        33 │ │    <ellipse cy="0" rx="43" ry="10" fill="#071118" opacity=".5"/><path d="M-27 -150 Q-45 -112 -51 -50 L-70 -8 Q-30 4 0 -4 Q39 5 70 -8 L47 -60 Q42 -116 23 -150Z" fill="#151b20"/>
        34 │ │    <circle cy="-180" r="27" fill="#202329"/><path d="M-24 -194 Q0 -228 25 -194 L22 -178 Q0 -188 -24 -178Z" fill="#10171b"/>
        35 │ │    </g>;
        36 │ │   const Radio:React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1})=>{
        37 │ │    const f=useCurrentFrame(),on=Math.sin(f*1.7)>.7;
        38 │ │    return <g transform={\`translate(\${x} \${y}) scale(\${scale})\`}>
        39 │ │    <rect x="-126" y="-85" width="252" height="170" rx="20" fill="#17252c" stroke="#779096" strokeWidth="8"/>
        40 │ │    <rect x="-96" y="-55" width="142" height="72" rx="8" fill="#071116" stroke="#53686d" strokeWidth="4"/>
        41 │ │    <path d="M-78 -19 q18 -27 34 0 t34 0 t34 0" fill="none" stroke={on?"#f2c36e":"#85a5a0"} strokeWidth="4"/>
        42 │ │    <circle cx="78" cy="-36" r="18" fill="#34464b" stroke="#a2b2a5" strokeWidth="5"/><circle cx="78" cy="27" r="10" fill={on?"#ef9b5e":"#6b4f40"/>
        43 │ │    <path d="M-174 -85 L-158 -172 L-150 -174 L-153 -80 M-78 49 H50 M-78 64 H50" fill="none" stroke="#829393" strokeWidth="5"/>
        44 │ │    </g>;
        45 │ │   };
        46 │ │   const Art:React.FC<{kind:string}>=({kind})=>{
        47 │ │    const f=useCurrentFrame(),drift=Math.sin(f/87)*18;
        48 │ │    const dark=["radioBoat","lights","empty","radioHome","last"].includes(kind);
        49 │ │    const horizon=kind==="home"||kind==="radioHome"?760:650;
        50 │ │    const isBoat=["boat","bell","depart","radioBoat","lights","empty"].includes(kind);
        51 │ │    return <AbsoluteFill style={{overflow:"hidden",background:dark?"#07121a":"#15272f"}}>
        52 │ │    <svg width="100%" height="100%" viewBox="0 0 720 1280" preserveAspectRatio="xMidYMid slice" style={{position:"absolute"}}>
        53 │ │     <defs>
        54 │ │      <linearGradient id="sky" x2="0" y2="1"><stop stopColor={dark?"#080f1b":"#35464a"}/><stop offset=".6" stopColor={dark?"#182b32":"#a27756"}/><stop offset="1" stopColor="#56483d"/></linearGradient>
        55 │ │      <linearGradient id="sea" x2="0" y2="1"><stop stopColor="#24414a"/><stop offset="1" stopColor="#091720"/></linearGradient>
        56 │ │      <radialGradient id="halo"><stop stopColor="#eed69c" stopOpacity=".7"/><stop offset="1" stopColor="#e1b769" stopOpacity="0"/></radialGradient>
        57 │ │     </defs>
        58 │ │     <rect width="720" height="810" fill="url(#sky)"/><circle cx="555" cy="250" r="185" fill="url(#halo)"/><circle cx="555" cy="250" r="36" fill="#eadbb5" opacity=".76"/>
        59 │ │     <path d="M0 540 Q150 475 285 528 T540 510 T780 520 V800 H0Z" fill="#18272a" opacity=".7"/>
        60 │ │     <rect y={horizon} width="720" height="500" fill="url(#sea)"/>
        61 │ │     <Wave y={horizon+80} speed={1.2} color="#82a6a1"/><Wave y={horizon+170} speed={-1.7} color="#51777b"/><Wave y={horizon+280} speed={2.3} color="#294c55"/>
        62 │ │     {kind==="bell"&&<g transform={\`translate(\${360+drift} 800)\`}>
        63 │ │      <path d="M0 0 C-18 -60 -42 -89 -21 -111 Q0 -135 21 -111 C42 -89 18 -60 0 0Z" fill="#9b906d" opacity=".65"/>
        64 │ │      {[0,1,2].map(i=><ellipse key={i} rx={55+i*55+Math.sin(f/16)*6} ry={13+i*18} fill="none" stroke="#b8c4a0" strokeWidth="2" opacity={.38-i*.08}/>)}
        65 │ │     </g>}
        66 │ │     {kind==="home"&&<g transform={\`translate(\${360+drift} 805)\`}>
        67 │ │      <path d="M-215 -180 L0 -320 L215 -180 V95 H-215Z" fill="#182327" stroke="#927c63" strokeWidth="6"/>
        68 │ │      <path d="M-246 -180 L0 -354 L248 -180" fill="none" stroke="#bd9e74" strokeWidth="13"/>
        69 │ │      <rect x="-158" y="-131" width="97" height="132" fill="#e5ad67" opacity=".45"/><rect x="59" y="-131" width="97" height="132" fill="#d28c48" opacity=".38"/>
        70 │ │      <path d="M-18 94 V-86 Q0 -127 20 -86 V94" fill="#0a1418"/>
        71 │ │      <Person x={-74} y={34} scale={.77}/><Person x={75} y={34} scale={.76}/>
        72 │ │     </g>}
        73 │ │     {isBoat&&<g transform={\`translate(\${kind==="empty"?404:360+drift} 0)\`}>
        74 │ │      {kind==="empty"?<Boat x={0} y={horizon+54} scale={.45}/>:<Boat x={0} y={horizon+38} scale={kind==="lights"?.78:1}/>}
        75 │ │      {kind==="boat"&&<Person x={0} y={horizon+8} scale={.76}/>}
        76 │ │      {kind==="depart"&&<Person x={-250-drift} y={horizon+8} scale={.48}/>}
        77 │ │      {kind==="radioBoat"&&<><rect x="276" y={horizon-52} width="168" height="56" rx="8" fill="#111d22" stroke="#667d7d" strokeWidth="4"/><Radio x={360} y={horizon-24} scale={.69}/></>}
        78 │ │     </g>}
        79 │ │     {(kind==="lights"||kind==="last")&&[0,1,2].map((i)=><g key={i} transform={\`translate(\${170+i*184+Math.sin(f/24+i)*12} \${kind==="last"?640:590+Math.sin(f/18+i*2)*10})\`}>
        80 │ │      <circle r={88+Math.sin(f/12+i)*7} fill="url(#halo)" opacity=".88"/><circle r="10" fill="#f5d997"/><path d="M0 32 Q-6 90 0 140 Q7 84 0 32Z" fill="#f0d69a" opacity=".24"/>
        81 │ │     </g>)}
        82 │ │     {kind==="radioHome"&&<g transform="translate(360 1060)"><rect x="-236" y="-110" width="472" height="220" rx="25" fill="#17252a" stroke="#8d9284" strokeWidth="6"/><Radio x={0} y={0} scale={.78}/></g>}
        83 │ │    </svg>
        84 │ │    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(3,8,12,.18),transparent 26%,transparent 61%,rgba(2,8,12,.55))",boxShadow:"inset 0 0 125px rgba(0,0,0,.38)"}}/>
        85 │ │    </AbsoluteFill>;
        86 │ │   };
        87 │ │   const Shot:React.FC<{s:SceneDef}>=({s})=>{
        88 │ │    const f=useCurrentFrame(),len=(s.end-s.start)*FPS;
        89 │ │    const alpha=interpolate(f,[0,18,len-18,len],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
        90 │ │    return <AbsoluteFill style={{opacity:alpha,transform:\`scale(\${1.03+Math.sin(f/170)*.012}) translateX(\${Math.sin(f/90)*8}px)\`}}>
        91 │ │     <Art kind={s.kind}/>
        92 │ │     <div style={{position:"absolute",top:80,left:42,right:42,display:"flex",justifyContent:"space-between",color:"rgba(238,226,204,.8)",fontFamily:"Arial",fontSize:16,letterSpacing:3}}><span>{s.label}</span><span style={{opacity:.55}}>KOTABARU</span></div>
        93 │ │     {s.id==="hook"&&<div style={{position:"absolute",top:290,left:48,color:"#f2e9d7",fontFamily:"Georgia",textShadow:"0 4px 20px #07121a"}}>
        94 │ │      <div style={{fontSize:59,lineHeight:1.03}}>TIGA CAHAYA<br/>DI TENGAH LAUT</div><div style={{marginTop:20,fontFamily:"Arial",fontSize:19,letterSpacing:2,color:"#e3bc82"}}>SUARA SIAPA YANG MEMANGGIL?</div>
        95 │ │     </div>}
        96 │ │     {s.id==="last"&&<div style={{position:"absolute",top:340,left:40,right:40,textAlign:"center",fontFamily:"Georgia",fontSize:39,color:"#f0d8a7",textShadow:"0 3px 18px #000"}}>JANGAN CARI<br/>BAPAKMU.</div>}
        97 │ │    </AbsoluteFill>;
        98 │ │   };
        99 │ │   const Subtitle:React.FC=()=>{
       100 │ │    const f=useCurrentFrame(),sec=f/FPS,item=captions.find(x=>sec>=x.start&&sec<x.end);
       101 │ │    if(!item)return null;
       102 │ │    const alpha=interpolate(sec,[item.start,item.start+.1,item.end-.08,item.end],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
       103 │ │    return <div style={{position:"absolute",left:28,right:28,bottom:66,minHeight:132,display:"flex",alignItems:"center",justifyContent:"center",opacity:alpha,background:"linear-gradient(180deg,transparent,rgba(4,9,12,.76) 18%,rgba(4,9,12,.76) 82%,transparent)",padding:"18px 24px",boxSizing:"border-box"}}>
       104 │ │     <div style={{maxWidth:650,textAlign:"center",fontFamily:"Arial",fontWeight:700,fontSize:30,lineHeight:1.27,color:"#fff8e9",textShadow:"0 2px 8px #000"}}>{item.text}</div>
       105 │ │    </div>;
       106 │ │   };
       107 │ │   const Video:React.FC=()=> <AbsoluteFill style={{background:"#07121a"}}>
       108 │ │    {scenes.map(s=><Sequence key={s.id} from={Math.round(s.start*FPS)} durationInFrames={Math.ceil(s.end*FPS)-Math.round(s.start*FPS)} layout="none"><Shot s={s}/></Sequence>)}
       109 │ │    <Subtitle/><Audio src={staticFile("audio/final-mix.wav")}/>
       110 │ │    </AbsoluteFill>;
       111 │ │   export const HalimunComposition:React.FC=()=> <Composition id="PulauHalimunHoror" component={Video} durationInFrames={DURATION_FRAMES} fps={FPS} width={720} height={1280}/>;
       112 │ ╰─▶
           ╰────
      

undefined
    at Object.internalBundle (D:\Project\remotion-video\node_modules\.pnpm\@remotion+bundler@4.0.541_p_32c001b6a7b0ae8eda9f04bac5484779\node_modules\@remotion\bundler\dist\bundle.js:225:19)
    at async bundleOnCli (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\setup-cache.js:153:21)
    at async bundleOnCliOrTakeServeUrl (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\setup-cache.js:35:21)
    at async renderVideoFlow (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\render-flows\render.js:182:53)
    at async render (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\render.js:170:5)
    at async cli (D:\Project\remotion-video\node_modules\.pnpm\@remotion+cli@4.0.541_postc_d1e9b09c61a4fe06ba888a91671cc102\node_modules\@remotion\cli\dist\index.js:122:13)

## 2026-11-08T12:18:03.520Z • Generate original audio stems
Created BGM/SFX stems: 166.211s at 48000 Hz

## 2026-11-08T12:18:08.200Z • Mix original voiceover, ducked BGM, and SFX
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
[aist#0:0/pcm_s16le @ 000001709700b9c0] Guessed Channel Layout: mono
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\narration\ugc-kanvas-voiceover-zephyr (8).wav':
  Duration: 00:02:46.21, bitrate: 384 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 24000 Hz, mono, s16, 384 kb/s
[aist#1:0/pcm_s16le @ 0000017097019540] Guessed Channel Layout: stereo
Input #1, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\bgm-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #1:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[aist#2:0/pcm_s16le @ 000001709702a380] Guessed Channel Layout: stereo
Input #2, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\sfx-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #2:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
Stream mapping:
  Stream #0:0 (pcm_s16le) -> aresample:default
  Stream #0:0 (pcm_s16le) -> amix
  Stream #1:0 (pcm_s16le) -> volume:default
  Stream #2:0 (pcm_s16le) -> volume:default
  alimiter:default -> Stream #0:0 (pcm_s16le)
Press [q] to stop, [?] for help
Output #0, wav, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    ISFT            : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
size=   25600KiB time=00:02:17.04 bitrate=1530.3kbits/s speed= 264x elapsed=0:00:00.51    [out#0/wav @ 0000017098ae67c0] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.000244%
size=   31165KiB time=00:02:46.21 bitrate=1536.0kbits/s speed= 266x elapsed=0:00:00.62    

## 2026-11-08T12:18:08.974Z • Remotion MP4 render attempt 1/3
node:internal/process/promises:324
    triggerUncaughtException(err, true /* fromPromise */);
    ^

Error: write EPIPE
    at afterWriteDispatched (node:internal/stream_base_commons:147:8)
    at writeGeneric (node:internal/stream_base_commons:126:10)
    at Socket._writeGeneric (node:net:1324:11)
    at Socket._write (node:net:1336:8)
    at doWrite (node:internal/streams/writable:637:12)
    at clearBuffer (node:internal/streams/writable:822:7)
    at onwrite (node:internal/streams/writable:692:7)
    at WritableState.onwrite [as callback] (node:internal/streams/writable:351:26)
    at WriteWrap.onWriteComplete [as oncomplete] (node:internal/stream_base_commons:69:10) {
  errno: -4047,
  code: 'EPIPE',
  syscall: 'write'
}

Node.js v26.13.0

## 2026-11-08T12:18:18.643Z • Remotion MP4 render attempt 2/3
Error: Error while downloading http://localhost:3002/public/audio/final-mix.wav: Error: Received a status code of 404 while downloading file http://localhost:3002/public/audio/final-mix.wav.
The response body was:
---
{"statusCode":404,"message":"The requested path (C:\\Users\\JAR1-ICT-NB\\AppData\\Local\\Packages\\openai.codex_2p2nqsd0c76g0\\AC\\#!sandbox.{1568bb94-cd9e-4be3-859f-6e7ec5859f55}\\Temp\\remotion-webpack-bundle-J5D2q6\\public\\audio\\final-mix.wav) could not be found"}
---
    at readFile (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\assets\read-file.js:59:15)
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
    at D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\render-frame-with-option-to-reject.js:223:25
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)

## 2026-11-08T12:18:26.775Z • Remotion MP4 render attempt 3/3
Error: Error while downloading http://localhost:3002/public/audio/final-mix.wav: Error: Received a status code of 404 while downloading file http://localhost:3002/public/audio/final-mix.wav.
The response body was:
---
{"statusCode":404,"message":"The requested path (C:\\Users\\JAR1-ICT-NB\\AppData\\Local\\Packages\\openai.codex_2p2nqsd0c76g0\\AC\\#!sandbox.{1568bb94-cd9e-4be3-859f-6e7ec5859f55}\\Temp\\remotion-webpack-bundle-NEx8rz\\public\\audio\\final-mix.wav) could not be found"}
---
    at readFile (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\assets\read-file.js:59:15)
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
    at D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\render-frame-with-option-to-reject.js:223:25
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)

## 2026-11-08T12:19:00.894Z • Generate original audio stems
Created BGM/SFX stems: 166.211s at 48000 Hz

## 2026-11-08T12:19:05.655Z • Mix original voiceover, ducked BGM, and SFX
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
[aist#0:0/pcm_s16le @ 0000024638277f80] Guessed Channel Layout: mono
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\narration\ugc-kanvas-voiceover-zephyr (8).wav':
  Duration: 00:02:46.21, bitrate: 384 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 24000 Hz, mono, s16, 384 kb/s
[aist#1:0/pcm_s16le @ 00000246382a99c0] Guessed Channel Layout: stereo
Input #1, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\bgm-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #1:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[aist#2:0/pcm_s16le @ 000002463a14ee00] Guessed Channel Layout: stereo
Input #2, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\sfx-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #2:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
Stream mapping:
  Stream #0:0 (pcm_s16le) -> aresample:default
  Stream #0:0 (pcm_s16le) -> amix
  Stream #1:0 (pcm_s16le) -> volume:default
  Stream #2:0 (pcm_s16le) -> volume:default
  alimiter:default -> Stream #0:0 (pcm_s16le)
Press [q] to stop, [?] for help
Output #0, wav, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    ISFT            : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
size=   25344KiB time=00:02:16.19 bitrate=1524.5kbits/s speed= 262x elapsed=0:00:00.51    [out#0/wav @ 000002463825e3c0] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.000244%
size=   31165KiB time=00:02:46.21 bitrate=1536.0kbits/s speed= 264x elapsed=0:00:00.63    

## 2026-11-08T12:19:06.428Z • Remotion MP4 render attempt 1/3
node:internal/process/promises:324
    triggerUncaughtException(err, true /* fromPromise */);
    ^

Error: write EPIPE
    at afterWriteDispatched (node:internal/stream_base_commons:147:8)
    at writeGeneric (node:internal/stream_base_commons:126:10)
    at Socket._writeGeneric (node:net:1324:11)
    at Socket._write (node:net:1336:8)
    at writeOrBuffer (node:internal/streams/writable:574:12)
    at _write (node:internal/streams/writable:503:10)
    at Writable.write (node:internal/streams/writable:512:10)
    at writeWithBackpressure (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\write-with-backpressure.js:5:18)
    at Object.writeFrame (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\prespawn-ffmpeg.js:243:71)
    at renderFramesProc.onFrame (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\render-media.js:449:126) {
  errno: -4047,
  code: 'EPIPE',
  syscall: 'write'
}

Node.js v26.13.0

## 2026-11-08T12:19:15.002Z • Remotion MP4 render attempt 2/3
node:internal/process/promises:324
    triggerUncaughtException(err, true /* fromPromise */);
    ^

Error: write EPIPE
    at afterWriteDispatched (node:internal/stream_base_commons:147:8)
    at writeGeneric (node:internal/stream_base_commons:126:10)
    at Socket._writeGeneric (node:net:1324:11)
    at Socket._write (node:net:1336:8)
    at writeOrBuffer (node:internal/streams/writable:574:12)
    at _write (node:internal/streams/writable:503:10)
    at Writable.write (node:internal/streams/writable:512:10)
    at writeWithBackpressure (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\write-with-backpressure.js:5:18)
    at Object.writeFrame (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\prespawn-ffmpeg.js:243:71)
    at renderFramesProc.onFrame (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\render-media.js:449:126) {
  errno: -4047,
  code: 'EPIPE',
  syscall: 'write'
}

Node.js v26.13.0

## 2026-11-08T12:19:23.568Z • Remotion MP4 render attempt 3/3
node:internal/process/promises:324
    triggerUncaughtException(err, true /* fromPromise */);
    ^

Error: write EPIPE
    at afterWriteDispatched (node:internal/stream_base_commons:147:8)
    at writeGeneric (node:internal/stream_base_commons:126:10)
    at Socket._writeGeneric (node:net:1324:11)
    at Socket._write (node:net:1336:8)
    at writeOrBuffer (node:internal/streams/writable:574:12)
    at _write (node:internal/streams/writable:503:10)
    at Writable.write (node:internal/streams/writable:512:10)
    at writeWithBackpressure (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\write-with-backpressure.js:5:18)
    at Object.writeFrame (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\prespawn-ffmpeg.js:243:71)
    at renderFramesProc.onFrame (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\render-media.js:449:126) {
  errno: -4047,
  code: 'EPIPE',
  syscall: 'write'
}

Node.js v26.13.0

## 2026-11-08T12:21:25.404Z • Generate original audio stems
Created BGM/SFX stems: 166.211s at 48000 Hz

## 2026-11-08T12:21:30.156Z • Mix original voiceover, ducked BGM, and SFX
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
[aist#0:0/pcm_s16le @ 0000025ea2bba040] Guessed Channel Layout: mono
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\narration\ugc-kanvas-voiceover-zephyr (8).wav':
  Duration: 00:02:46.21, bitrate: 384 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 24000 Hz, mono, s16, 384 kb/s
[aist#1:0/pcm_s16le @ 0000025ea2bc8000] Guessed Channel Layout: stereo
Input #1, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\bgm-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #1:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[aist#2:0/pcm_s16le @ 0000025ea2bcddc0] Guessed Channel Layout: stereo
Input #2, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\sfx-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #2:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
Stream mapping:
  Stream #0:0 (pcm_s16le) -> aresample:default
  Stream #0:0 (pcm_s16le) -> amix
  Stream #1:0 (pcm_s16le) -> volume:default
  Stream #2:0 (pcm_s16le) -> volume:default
  alimiter:default -> Stream #0:0 (pcm_s16le)
Press [q] to stop, [?] for help
Output #0, wav, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    ISFT            : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
size=   27136KiB time=00:02:25.74 bitrate=1525.2kbits/s speed= 280x elapsed=0:00:00.52    [out#0/wav @ 0000025ea46dcc40] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.000244%
size=   31165KiB time=00:02:46.21 bitrate=1536.0kbits/s speed= 279x elapsed=0:00:00.59    

## 2026-11-08T12:21:30.888Z • Remotion video render attempt 1/3
node:internal/process/promises:324
    triggerUncaughtException(err, true /* fromPromise */);
    ^

Error: write EPIPE
    at afterWriteDispatched (node:internal/stream_base_commons:147:8)
    at writeGeneric (node:internal/stream_base_commons:126:10)
    at Socket._writeGeneric (node:net:1324:11)
    at Socket._write (node:net:1336:8)
    at writeOrBuffer (node:internal/streams/writable:574:12)
    at _write (node:internal/streams/writable:503:10)
    at Writable.write (node:internal/streams/writable:512:10)
    at writeWithBackpressure (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\write-with-backpressure.js:5:18)
    at Object.writeFrame (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\prespawn-ffmpeg.js:243:71)
    at renderFramesProc.onFrame (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\render-media.js:449:126) {
  errno: -4047,
  code: 'EPIPE',
  syscall: 'write'
}

Node.js v26.13.0

## 2026-11-08T12:21:39.489Z • Remotion video render attempt 2/3
node:internal/process/promises:324
    triggerUncaughtException(err, true /* fromPromise */);
    ^

Error: write EPIPE
    at afterWriteDispatched (node:internal/stream_base_commons:147:8)
    at writeGeneric (node:internal/stream_base_commons:126:10)
    at Socket._writeGeneric (node:net:1324:11)
    at Socket._write (node:net:1336:8)
    at writeOrBuffer (node:internal/streams/writable:574:12)
    at _write (node:internal/streams/writable:503:10)
    at Writable.write (node:internal/streams/writable:512:10)
    at writeWithBackpressure (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\write-with-backpressure.js:5:18)
    at Object.writeFrame (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\prespawn-ffmpeg.js:243:71)
    at renderFramesProc.onFrame (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\render-media.js:449:126) {
  errno: -4047,
  code: 'EPIPE',
  syscall: 'write'
}

Node.js v26.13.0

## 2026-11-08T12:21:48.042Z • Remotion video render attempt 3/3
node:internal/process/promises:324
    triggerUncaughtException(err, true /* fromPromise */);
    ^

Error: write EPIPE
    at afterWriteDispatched (node:internal/stream_base_commons:147:8)
    at writeGeneric (node:internal/stream_base_commons:126:10)
    at Socket._writeGeneric (node:net:1324:11)
    at Socket._write (node:net:1336:8)
    at writeOrBuffer (node:internal/streams/writable:574:12)
    at _write (node:internal/streams/writable:503:10)
    at Writable.write (node:internal/streams/writable:512:10)
    at writeWithBackpressure (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\write-with-backpressure.js:5:18)
    at Object.writeFrame (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\prespawn-ffmpeg.js:243:71)
    at renderFramesProc.onFrame (D:\Project\remotion-video\node_modules\.pnpm\@remotion+renderer@4.0.541__f5b0a6b36a172e7687c381568a509bb6\node_modules\@remotion\renderer\dist\render-media.js:449:126) {
  errno: -4047,
  code: 'EPIPE',
  syscall: 'write'
}

Node.js v26.13.0

## 2026-11-08T12:24:09.706Z • Generate original audio stems
Created BGM/SFX stems: 166.211s at 48000 Hz

## 2026-11-08T12:24:14.856Z • Mix original voiceover, ducked BGM, and SFX
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
[aist#0:0/pcm_s16le @ 000001f6b06ce640] Guessed Channel Layout: mono
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\narration\ugc-kanvas-voiceover-zephyr (8).wav':
  Duration: 00:02:46.21, bitrate: 384 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 24000 Hz, mono, s16, 384 kb/s
[aist#1:0/pcm_s16le @ 000001f6b257d380] Guessed Channel Layout: stereo
Input #1, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\bgm-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #1:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[aist#2:0/pcm_s16le @ 000001f6b2626ec0] Guessed Channel Layout: stereo
Input #2, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\sfx-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #2:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
Stream mapping:
  Stream #0:0 (pcm_s16le) -> aresample:default
  Stream #0:0 (pcm_s16le) -> amix
  Stream #1:0 (pcm_s16le) -> volume:default
  Stream #2:0 (pcm_s16le) -> volume:default
  alimiter:default -> Stream #0:0 (pcm_s16le)
Press [q] to stop, [?] for help
Output #0, wav, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    ISFT            : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
size=   27392KiB time=00:02:27.11 bitrate=1525.3kbits/s speed= 285x elapsed=0:00:00.51    [out#0/wav @ 000001f6b06bea00] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.000244%
size=   31165KiB time=00:02:46.21 bitrate=1536.0kbits/s speed= 282x elapsed=0:00:00.58    

## 2026-11-08T12:24:15.581Z • Remotion video render attempt 1/3

## 2026-11-08T12:32:38.675Z • Mux narration and original audio mix into MP4
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\video-no-audio.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf63.1.102
    comment         : Made with Remotion 4.0.541
  Duration: 00:02:46.23, start: 0.000000, bitrate: 631 kb/s
  Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuvj420p(pc, bt470bg/unknown/unknown, progressive), 720x1280 [SAR 1:1 DAR 9:16], 628 kb/s, 30 fps, 30 tbr, 90k tbn (default)
    Metadata:
      handler_name    : VideoHandler
    Side data:
      ICC Profile: (456 bytes)
[aist#1:0/pcm_s16le @ 00000182bd73b740] Guessed Channel Layout: stereo
Input #1, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    encoder         : Lavf63.1.102
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #1:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (copy)
  Stream #1:0 -> #0:1 (pcm_s16le (native) -> aac (native))
Press [q] to stop, [?] for help
Output #0, mp4, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\PULAU_HALIMUN_PERAHU_TAK_KEMBALI_FINAL.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    comment         : Made with Remotion 4.0.541
    encoder         : Lavf63.1.102
  Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuvj420p(pc, bt470bg/unknown/unknown, progressive), 720x1280 [SAR 1:1 DAR 9:16], q=2-31, 628 kb/s, 30 fps, 30 tbr, 90k tbn (default)
    Metadata:
      handler_name    : VideoHandler
    Side data:
      ICC Profile: (456 bytes)
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 192 kb/s
    Metadata:
      encoder         : Lavc63.1.102 aac
frame=  558 fps=0.0 q=-1.0 size=    2048KiB time=00:00:18.83 bitrate= 890.8kbits/s speed=37.3x elapsed=0:00:00.50    frame= 1404 fps=1365 q=-1.0 size=    5120KiB time=00:00:46.96 bitrate= 893.0kbits/s speed=45.7x elapsed=0:00:01.02    frame= 2229 fps=1451 q=-1.0 size=    7936KiB time=00:01:14.43 bitrate= 873.4kbits/s speed=48.4x elapsed=0:00:01.53    frame= 3137 fps=1522 q=-1.0 size=   10752KiB time=00:01:44.73 bitrate= 841.0kbits/s speed=50.8x elapsed=0:00:02.06    frame= 4053 fps=1577 q=-1.0 size=   13824KiB time=00:02:15.26 bitrate= 837.2kbits/s speed=52.6x elapsed=0:00:02.56    [mp4 @ 00000182bd73b900] Starting second pass: moving the moov atom to the beginning of the file
[out#0/mp4 @ 00000182bd683b80] video:12753KiB audio:3888KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 1.083202%
frame= 4986 fps=1609 q=-1.0 Lsize=   16821KiB time=00:02:46.21 bitrate= 829.0kbits/s speed=53.6x elapsed=0:00:03.09    
[aac @ 00000182bd708140] Qavg: 793.315

## 2026-11-08T12:32:41.901Z • Verify final MP4 with ffprobe
{
    "programs": [

    ],
    "stream_groups": [

    ],
    "streams": [
        {
            "codec_name": "h264",
            "width": 720,
            "height": 1280,
            "r_frame_rate": "30/1",
            "side_data_list": [
                {

                }
            ]
        },
        {
            "codec_name": "aac",
            "sample_rate": "48000",
            "channels": 2,
            "r_frame_rate": "0/0"
        }
    ],
    "format": {
        "duration": "166.210958",
        "size": "17224421"
    }
}

## 2026-11-08T12:32:42.035Z • Measure mixed-audio peak and RMS
[aist#0:0/pcm_s16le @ 00000259ef34f7c0] Guessed Channel Layout: stereo
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    encoder         : Lavf63.1.102
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[Parsed_volumedetect_0 @ 00000259ef34f980] n_samples: 0
Stream mapping:
  Stream #0:0 -> #0:0 (pcm_s16le (native) -> pcm_s16le (native))
Press [q] to stop, [?] for help
Output #0, null, to 'NUL':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le, 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
[Parsed_volumedetect_0 @ 00000259ef381480] n_samples: 15956252
[Parsed_volumedetect_0 @ 00000259ef381480] mean_volume: -20.6 dB
[Parsed_volumedetect_0 @ 00000259ef381480] max_volume: -3.5 dB
[Parsed_volumedetect_0 @ 00000259ef381480] histogram_3db: 164
[Parsed_volumedetect_0 @ 00000259ef381480] histogram_4db: 4850
[Parsed_volumedetect_0 @ 00000259ef381480] histogram_5db: 11654
[out#0/null @ 00000259ef2d4100] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
size=N/A time=00:02:46.21 bitrate=N/A speed=7.08e+03x elapsed=0:00:00.02    

## 2026-11-08T12:32:42.150Z • Preview still at 6s
Downloading Chrome Headless Shell https://www.remotion.dev/chrome-headless-shell
Downloading from: https://remotion.media/chromium-headless-shell-win-x64-158.0.8127.2.zip?clear
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.
node:https:408
      const err = new ERR_PROXY_TUNNEL(`Connection to establish proxy tunnel timed out after ${proxyTunnelTimeout}ms`);
                  ^

Error [ERR_PROXY_TUNNEL]: Connection to establish proxy tunnel timed out after 5000ms
    at Socket.onTimeout (node:https:408:19)
    at Socket.wrapper (node:events:639:12)
    at Socket.emit (node:events:526:24)
    at Socket._onTimeout (node:net:886:8)
    at Timeout.onStreamTimeout (node:internal/stream_base_commons:242:10)
    at listOnTimeout (node:internal/timers:687:11)
    at process.processTimers (node:internal/timers:618:7) {
  code: 'ERR_PROXY_TUNNEL',
  proxyTunnelTimeout: 5000
}

Node.js v26.13.0

## 2026-11-08T12:33:47.896Z • Generate original audio stems
Created BGM/SFX stems: 166.211s at 48000 Hz

## 2026-11-08T12:33:52.629Z • Mix original voiceover, ducked BGM, and SFX
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
[aist#0:0/pcm_s16le @ 000001d64092b280] Guessed Channel Layout: mono
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\narration\ugc-kanvas-voiceover-zephyr (8).wav':
  Duration: 00:02:46.21, bitrate: 384 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 24000 Hz, mono, s16, 384 kb/s
[aist#1:0/pcm_s16le @ 000001d640965d40] Guessed Channel Layout: stereo
Input #1, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\bgm-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #1:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[aist#2:0/pcm_s16le @ 000001d640947f80] Guessed Channel Layout: stereo
Input #2, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\sfx-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #2:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
Stream mapping:
  Stream #0:0 (pcm_s16le) -> aresample:default
  Stream #0:0 (pcm_s16le) -> amix
  Stream #1:0 (pcm_s16le) -> volume:default
  Stream #2:0 (pcm_s16le) -> volume:default
  alimiter:default -> Stream #0:0 (pcm_s16le)
Press [q] to stop, [?] for help
Output #0, wav, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    ISFT            : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
size=   26624KiB time=00:02:22.59 bitrate=1529.6kbits/s speed= 283x elapsed=0:00:00.50    [out#0/wav @ 000001d64091b180] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.000244%
size=   31165KiB time=00:02:46.21 bitrate=1536.0kbits/s speed= 277x elapsed=0:00:00.60    

## 2026-11-08T12:33:53.359Z • Verify final MP4 with ffprobe
{
    "programs": [

    ],
    "stream_groups": [

    ],
    "streams": [
        {
            "codec_name": "h264",
            "width": 720,
            "height": 1280,
            "r_frame_rate": "30/1",
            "side_data_list": [
                {

                }
            ]
        },
        {
            "codec_name": "aac",
            "sample_rate": "48000",
            "channels": 2,
            "r_frame_rate": "0/0"
        }
    ],
    "format": {
        "duration": "166.210958",
        "size": "17224421"
    }
}

## 2026-11-08T12:33:53.462Z • Measure mixed-audio peak and RMS
[aist#0:0/pcm_s16le @ 000002c2557ded00] Guessed Channel Layout: stereo
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    encoder         : Lavf63.1.102
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[Parsed_volumedetect_0 @ 000002c25390b900] n_samples: 0
Stream mapping:
  Stream #0:0 -> #0:0 (pcm_s16le (native) -> pcm_s16le (native))
Press [q] to stop, [?] for help
Output #0, null, to 'NUL':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le, 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
[Parsed_volumedetect_0 @ 000002c253943cc0] n_samples: 15956252
[Parsed_volumedetect_0 @ 000002c253943cc0] mean_volume: -20.6 dB
[Parsed_volumedetect_0 @ 000002c253943cc0] max_volume: -3.5 dB
[Parsed_volumedetect_0 @ 000002c253943cc0] histogram_3db: 164
[Parsed_volumedetect_0 @ 000002c253943cc0] histogram_4db: 4850
[Parsed_volumedetect_0 @ 000002c253943cc0] histogram_5db: 11654
[out#0/null @ 000002c253873980] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
size=N/A time=00:02:46.21 bitrate=N/A speed=5.09e+03x elapsed=0:00:00.03    

## 2026-11-08T12:33:53.606Z • Preview still at 6s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-006.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
+                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-006.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:34:00.955Z • Preview still at 25s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-025.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
+                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-025.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:34:08.332Z • Preview still at 44s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-044.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
+                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-044.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:34:15.532Z • Preview still at 68s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-068.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
+                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-068.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:34:22.749Z • Preview still at 88s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-088.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
+                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-088.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:34:30.005Z • Preview still at 111s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-111.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
+                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-111.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:34:37.355Z • Preview still at 130s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-130.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
+                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-130.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:34:44.566Z • Preview still at 140s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-140.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
+                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-140.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:34:51.793Z • Preview still at 156s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-156.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
+                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-156.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:34:59.024Z • Preview still at 164s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-164.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
+                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-164.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:35:06.253Z • Build contact sheet
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-006.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #1, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-025.png':
  Duration: N/A, bitrate: N/A
  Stream #1:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #2, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-044.png':
  Duration: N/A, bitrate: N/A
  Stream #2:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #3, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-068.png':
  Duration: N/A, bitrate: N/A
  Stream #3:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #4, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-088.png':
  Duration: N/A, bitrate: N/A
  Stream #4:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #5, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-111.png':
  Duration: N/A, bitrate: N/A
  Stream #5:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #6, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-130.png':
  Duration: N/A, bitrate: N/A
  Stream #6:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #7, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-140.png':
  Duration: N/A, bitrate: N/A
  Stream #7:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #8, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-156.png':
  Duration: N/A, bitrate: N/A
  Stream #8:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #9, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-164.png':
  Duration: N/A, bitrate: N/A
  Stream #9:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
[fc#0 @ 000002617021f140] Cannot find an unused video input stream to feed the unlabeled input pad xstack.
Error binding filtergraph inputs/outputs: Invalid argument
file:///D:/Project/remotion-video/tools/contact-sheet.mjs:14
  if (result.status !== 0) throw new Error(`ffmpeg failed: ${args.at(-1)}`);
                                 ^

Error: ffmpeg failed: D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\overview.jpg
    at run (file:///D:/Project/remotion-video/tools/contact-sheet.mjs:14:34)
    at file:///D:/Project/remotion-video/tools/contact-sheet.mjs:21:3

Node.js v26.13.0

## 2026-11-08T12:36:46.699Z • Generate original audio stems
Created BGM/SFX stems: 166.211s at 48000 Hz

## 2026-11-08T12:36:51.536Z • Mix original voiceover, ducked BGM, and SFX
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
[aist#0:0/pcm_s16le @ 00000248efd2ab80] Guessed Channel Layout: mono
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\narration\ugc-kanvas-voiceover-zephyr (8).wav':
  Duration: 00:02:46.21, bitrate: 384 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 24000 Hz, mono, s16, 384 kb/s
[aist#1:0/pcm_s16le @ 00000248efd33d00] Guessed Channel Layout: stereo
Input #1, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\bgm-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #1:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[aist#2:0/pcm_s16le @ 00000248f18ae4c0] Guessed Channel Layout: stereo
Input #2, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\sfx-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #2:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
Stream mapping:
  Stream #0:0 (pcm_s16le) -> aresample:default
  Stream #0:0 (pcm_s16le) -> amix
  Stream #1:0 (pcm_s16le) -> volume:default
  Stream #2:0 (pcm_s16le) -> volume:default
  alimiter:default -> Stream #0:0 (pcm_s16le)
Press [q] to stop, [?] for help
Output #0, wav, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    ISFT            : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
size=   28160KiB time=00:02:30.52 bitrate=1532.5kbits/s speed= 290x elapsed=0:00:00.51    [out#0/wav @ 00000248f18ada40] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.000244%
size=   31165KiB time=00:02:46.21 bitrate=1536.0kbits/s speed= 290x elapsed=0:00:00.57    

## 2026-11-08T12:36:52.241Z • Remotion video render attempt 1/3

## 2026-11-08T12:45:14.448Z • Mux narration and original audio mix into MP4
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\video-no-audio.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf63.1.102
    comment         : Made with Remotion 4.0.541
  Duration: 00:02:46.23, start: 0.000000, bitrate: 635 kb/s
  Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuvj420p(pc, bt470bg/unknown/unknown, progressive), 720x1280 [SAR 1:1 DAR 9:16], 633 kb/s, 30 fps, 30 tbr, 90k tbn (default)
    Metadata:
      handler_name    : VideoHandler
    Side data:
      ICC Profile: (456 bytes)
[aist#1:0/pcm_s16le @ 0000028c5bc6adc0] Guessed Channel Layout: stereo
Input #1, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    encoder         : Lavf63.1.102
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #1:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (copy)
  Stream #1:0 -> #0:1 (pcm_s16le (native) -> aac (native))
Press [q] to stop, [?] for help
Output #0, mp4, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\PULAU_HALIMUN_PERAHU_TAK_KEMBALI_FINAL.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    comment         : Made with Remotion 4.0.541
    encoder         : Lavf63.1.102
  Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuvj420p(pc, bt470bg/unknown/unknown, progressive), 720x1280 [SAR 1:1 DAR 9:16], q=2-31, 633 kb/s, 30 fps, 30 tbr, 90k tbn (default)
    Metadata:
      handler_name    : VideoHandler
    Side data:
      ICC Profile: (456 bytes)
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 192 kb/s
    Metadata:
      encoder         : Lavc63.1.102 aac
frame=  619 fps=0.0 q=-1.0 size=    2304KiB time=00:00:20.86 bitrate= 904.5kbits/s speed=40.2x elapsed=0:00:00.51    frame= 1445 fps=1401 q=-1.0 size=    5120KiB time=00:00:48.30 bitrate= 868.4kbits/s speed=46.8x elapsed=0:00:01.03    frame= 2270 fps=1471 q=-1.0 size=    7936KiB time=00:01:15.83 bitrate= 857.3kbits/s speed=49.1x elapsed=0:00:01.54    frame= 3191 fps=1552 q=-1.0 size=   11008KiB time=00:01:46.53 bitrate= 846.5kbits/s speed=51.8x elapsed=0:00:02.05    frame= 4123 fps=1596 q=-1.0 size=   14080KiB time=00:02:17.60 bitrate= 838.3kbits/s speed=53.3x elapsed=0:00:02.58    [mp4 @ 0000028c5dacb300] Starting second pass: moving the moov atom to the beginning of the file
[out#0/mp4 @ 0000028c5bc691c0] video:12845KiB audio:3888KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 1.077123%
frame= 4986 fps=1616 q=-1.0 Lsize=   16913KiB time=00:02:46.21 bitrate= 833.6kbits/s speed=53.9x elapsed=0:00:03.08    
[aac @ 0000028c5db80580] Qavg: 793.310

## 2026-11-08T12:45:17.649Z • Verify final MP4 with ffprobe
{
    "programs": [

    ],
    "stream_groups": [

    ],
    "streams": [
        {
            "codec_name": "h264",
            "width": 720,
            "height": 1280,
            "r_frame_rate": "30/1",
            "side_data_list": [
                {

                }
            ]
        },
        {
            "codec_name": "aac",
            "sample_rate": "48000",
            "channels": 2,
            "r_frame_rate": "0/0"
        }
    ],
    "format": {
        "duration": "166.210958",
        "size": "17319099"
    }
}

## 2026-11-08T12:45:17.737Z • Measure mixed-audio peak and RMS
[aist#0:0/pcm_s16le @ 0000027391cced00] Guessed Channel Layout: stereo
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    encoder         : Lavf63.1.102
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[Parsed_volumedetect_0 @ 000002738fdf7e40] n_samples: 0
Stream mapping:
  Stream #0:0 -> #0:0 (pcm_s16le (native) -> pcm_s16le (native))
Press [q] to stop, [?] for help
Output #0, null, to 'NUL':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le, 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
[Parsed_volumedetect_0 @ 000002738fe08740] n_samples: 15956252
[Parsed_volumedetect_0 @ 000002738fe08740] mean_volume: -20.6 dB
[Parsed_volumedetect_0 @ 000002738fe08740] max_volume: -3.5 dB
[Parsed_volumedetect_0 @ 000002738fe08740] histogram_3db: 164
[Parsed_volumedetect_0 @ 000002738fe08740] histogram_4db: 4850
[Parsed_volumedetect_0 @ 000002738fe08740] histogram_5db: 11654
[out#0/null @ 000002738fd71f40] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
size=N/A time=00:02:46.21 bitrate=N/A speed=6.46e+03x elapsed=0:00:00.02    

## 2026-11-08T12:45:17.856Z • Preview still at 6s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-006.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-006.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:45:25.283Z • Preview still at 25s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-025.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-025.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:45:32.599Z • Preview still at 44s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-044.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-044.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:45:39.833Z • Preview still at 68s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-068.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-068.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:45:46.971Z • Preview still at 80s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-080.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
+                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-080.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:45:54.186Z • Preview still at 88s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-088.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-088.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:46:01.669Z • Preview still at 111s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-111.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-111.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:46:08.949Z • Preview still at 122s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-122.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
+                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-122.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:46:16.167Z • Preview still at 130s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-130.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-130.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:46:23.382Z • Preview still at 140s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-140.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-140.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:46:30.641Z • Preview still at 156s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-156.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-156.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:46:37.813Z • Preview still at 164s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-164.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-164.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:46:45.014Z • Build contact sheet
Generated scene overview and 12 high-resolution labeled keyframes in D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-006.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #1, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-025.png':
  Duration: N/A, bitrate: N/A
  Stream #1:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #2, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-044.png':
  Duration: N/A, bitrate: N/A
  Stream #2:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #3, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-068.png':
  Duration: N/A, bitrate: N/A
  Stream #3:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #4, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-080.png':
  Duration: N/A, bitrate: N/A
  Stream #4:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #5, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-088.png':
  Duration: N/A, bitrate: N/A
  Stream #5:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #6, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-111.png':
  Duration: N/A, bitrate: N/A
  Stream #6:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #7, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-122.png':
  Duration: N/A, bitrate: N/A
  Stream #7:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #8, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-130.png':
  Duration: N/A, bitrate: N/A
  Stream #8:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #9, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-140.png':
  Duration: N/A, bitrate: N/A
  Stream #9:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #10, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-156.png':
  Duration: N/A, bitrate: N/A
  Stream #10:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #11, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-164.png':
  Duration: N/A, bitrate: N/A
  Stream #11:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 (png) -> scale:default
  Stream #1:0 (png) -> scale:default
  Stream #2:0 (png) -> scale:default
  Stream #3:0 (png) -> scale:default
  Stream #4:0 (png) -> scale:default
  Stream #5:0 (png) -> scale:default
  Stream #6:0 (png) -> scale:default
  Stream #7:0 (png) -> scale:default
  Stream #8:0 (png) -> scale:default
  Stream #9:0 (png) -> scale:default
  Stream #10:0 (png) -> scale:default
  Stream #11:0 (png) -> scale:default
  xstack:default -> Stream #0:0 (mjpeg)
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\overview.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1920x2562, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 000001cc7800b580] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\overview.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 000001cc7800b580] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 000001cc77e277c0] video:236KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=10.5 Lsize=N/A time=00:00:00.04 bitrate=N/A speed=0.194x elapsed=0:00:00.20    
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-006.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 -> #0:0 (png (native) -> mjpeg (native))
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\001-frame-006.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1600x2844, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 000001feea3cec80] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\001-frame-006.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 000001feea3cec80] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 000001fee82d42c0] video:143KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=10.4 Lsize=N/A time=00:00:00.04 bitrate=N/A speed= 0.9x elapsed=0:00:00.04    
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-025.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 -> #0:0 (png (native) -> mjpeg (native))
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\002-frame-025.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1600x2844, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 0000018c8c2ac200] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\002-frame-025.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 0000018c8c2ac200] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 0000018c8c233300] video:125KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=9.7 Lsize=N/A time=00:00:00.04 bitrate=N/A speed=0.898x elapsed=0:00:00.04    
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-044.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 -> #0:0 (png (native) -> mjpeg (native))
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\003-frame-044.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1600x2844, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 000001ce28f62dc0] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\003-frame-044.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 000001ce28f62dc0] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 000001ce28ee2f40] video:107KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=8.6 Lsize=N/A time=00:00:00.04 bitrate=N/A speed=0.914x elapsed=0:00:00.04    
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-068.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 -> #0:0 (png (native) -> mjpeg (native))
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\004-frame-068.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1600x2844, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 000001f050924800] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\004-frame-068.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 000001f050924800] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 000001f0508a4880] video:132KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=9.8 Lsize=N/A time=00:00:00.04 bitrate=N/A speed=0.913x elapsed=0:00:00.04    
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-080.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 -> #0:0 (png (native) -> mjpeg (native))
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\005-frame-080.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1600x2844, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 00000232adcc4380] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\005-frame-080.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 00000232adcc4380] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 00000232adc45880] video:110KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=8.5 Lsize=N/A time=00:00:00.04 bitrate=N/A speed=0.829x elapsed=0:00:00.04    
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-088.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 -> #0:0 (png (native) -> mjpeg (native))
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\006-frame-088.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1600x2844, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 0000024c86fa3b80] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\006-frame-088.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 0000024c86fa3b80] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 0000024c86f23d80] video:115KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=8.8 Lsize=N/A time=00:00:00.04 bitrate=N/A speed=0.839x elapsed=0:00:00.04    
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-111.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 -> #0:0 (png (native) -> mjpeg (native))
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\007-frame-111.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1600x2844, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 0000018170cd3600] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\007-frame-111.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 0000018170cd3600] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 0000018170c52880] video:111KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=8.7 Lsize=N/A time=00:00:00.04 bitrate=N/A speed=0.784x elapsed=0:00:00.05    
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-122.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 -> #0:0 (png (native) -> mjpeg (native))
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\008-frame-122.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1600x2844, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 000001cc737b3c80] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\008-frame-122.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 000001cc737b3c80] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 000001cc73734300] video:103KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=7.7 Lsize=N/A time=00:00:00.04 bitrate=N/A speed=0.839x elapsed=0:00:00.04    
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-130.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 -> #0:0 (png (native) -> mjpeg (native))
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\009-frame-130.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1600x2844, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 000001dc2b3c2ac0] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\009-frame-130.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 000001dc2b3c2ac0] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 000001dc2b342680] video:114KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=8.7 Lsize=N/A time=00:00:00.04 bitrate=N/A speed=0.893x elapsed=0:00:00.04    
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-140.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 -> #0:0 (png (native) -> mjpeg (native))
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\010-frame-140.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1600x2844, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 000001e16e5ad080] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\010-frame-140.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 000001e16e5ad080] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 000001e16e534700] video:97KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=7.9 Lsize=N/A time=00:00:00.04 bitrate=N/A speed=0.894x elapsed=0:00:00.04    
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-156.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 -> #0:0 (png (native) -> mjpeg (native))
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\011-frame-156.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1600x2844, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 000001c9648c42c0] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\011-frame-156.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 000001c9648c42c0] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 000001c964843100] video:107KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=8.4 Lsize=N/A time=00:00:00.04 bitrate=N/A speed=0.919x elapsed=0:00:00.04    
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-164.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Stream mapping:
  Stream #0:0 -> #0:0 (png (native) -> mjpeg (native))
Press [q] to stop, [?] for help
Output #0, image2, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\012-frame-164.jpg':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Video: mjpeg, yuv444p(pc, progressive), 1600x2844, q=2-31, 200 kb/s, 25 fps, 25 tbn
    Metadata:
      encoder         : Lavc63.1.102 mjpeg
    Side data:
      CPB properties: bitrate max/min/avg: 0/0/200000 buffer size: 0 vbv_delay: N/A
[image2 @ 0000027b7b73aac0] The specified filename 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\012-frame-164.jpg' does not contain an image sequence pattern or a pattern is invalid.
[image2 @ 0000027b7b73aac0] Use a pattern such as %03d for an image sequence or use the -update option (with -frames:v 1 if needed) to write a single image.
[out#0/image2 @ 0000027b7b6b3780] video:112KiB audio:0KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
frame=    1 fps=0.0 q=8.4 Lsize=N/A time=00:00:00.04 bitrate=N/A speed=0.909x elapsed=0:00:00.04    

## 2026-11-08T12:50:16.747Z • Generate original audio stems
Created BGM/SFX stems: 166.211s at 48000 Hz

## 2026-11-08T12:50:21.722Z • Mix original voiceover, ducked BGM, and SFX
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
[aist#0:0/pcm_s16le @ 000001a7d0ff0340] Guessed Channel Layout: mono
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\narration\ugc-kanvas-voiceover-zephyr (8).wav':
  Duration: 00:02:46.21, bitrate: 384 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 24000 Hz, mono, s16, 384 kb/s
[aist#1:0/pcm_s16le @ 000001a7d0fefbc0] Guessed Channel Layout: stereo
Input #1, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\bgm-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #1:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[aist#2:0/pcm_s16le @ 000001a7d0ff92c0] Guessed Channel Layout: stereo
Input #2, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\assets\audio\sfx-original.wav':
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #2:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
Stream mapping:
  Stream #0:0 (pcm_s16le) -> aresample:default
  Stream #0:0 (pcm_s16le) -> amix
  Stream #1:0 (pcm_s16le) -> volume:default
  Stream #2:0 (pcm_s16le) -> volume:default
  alimiter:default -> Stream #0:0 (pcm_s16le)
Press [q] to stop, [?] for help
Output #0, wav, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    ISFT            : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
size=   27648KiB time=00:02:28.13 bitrate=1528.9kbits/s speed= 291x elapsed=0:00:00.50    [out#0/wav @ 000001a7d2e9e000] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.000244%
size=   31165KiB time=00:02:46.21 bitrate=1536.0kbits/s speed= 291x elapsed=0:00:00.57    

## 2026-11-08T12:50:22.419Z • Remotion video render attempt 1/3

## 2026-11-08T12:58:45.282Z • Mux narration and original audio mix into MP4
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\video-no-audio.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf63.1.102
    comment         : Made with Remotion 4.0.541
  Duration: 00:02:46.23, start: 0.000000, bitrate: 636 kb/s
  Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuvj420p(pc, bt470bg/unknown/unknown, progressive), 720x1280 [SAR 1:1 DAR 9:16], 633 kb/s, 30 fps, 30 tbr, 90k tbn (default)
    Metadata:
      handler_name    : VideoHandler
    Side data:
      ICC Profile: (456 bytes)
[aist#1:0/pcm_s16le @ 000001b3171dee00] Guessed Channel Layout: stereo
Input #1, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    encoder         : Lavf63.1.102
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #1:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (copy)
  Stream #1:0 -> #0:1 (pcm_s16le (native) -> aac (native))
Press [q] to stop, [?] for help
Output #0, mp4, to 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\PULAU_HALIMUN_PERAHU_TAK_KEMBALI_FINAL.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    comment         : Made with Remotion 4.0.541
    encoder         : Lavf63.1.102
  Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuvj420p(pc, bt470bg/unknown/unknown, progressive), 720x1280 [SAR 1:1 DAR 9:16], q=2-31, 633 kb/s, 30 fps, 30 tbr, 90k tbn (default)
    Metadata:
      handler_name    : VideoHandler
    Side data:
      ICC Profile: (456 bytes)
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 192 kb/s
    Metadata:
      encoder         : Lavc63.1.102 aac
frame=  620 fps=0.0 q=-1.0 size=    2304KiB time=00:00:20.83 bitrate= 906.0kbits/s speed=40.6x elapsed=0:00:00.51    frame= 1429 fps=1378 q=-1.0 size=    5120KiB time=00:00:47.76 bitrate= 878.1kbits/s speed=46.1x elapsed=0:00:01.03    frame= 2238 fps=1445 q=-1.0 size=    7936KiB time=00:01:14.83 bitrate= 868.8kbits/s speed=48.3x elapsed=0:00:01.54    frame= 3038 fps=1472 q=-1.0 size=   10496KiB time=00:01:41.50 bitrate= 847.1kbits/s speed=49.2x elapsed=0:00:02.06    frame= 3946 fps=1530 q=-1.0 size=   13568KiB time=00:02:11.73 bitrate= 843.7kbits/s speed=51.1x elapsed=0:00:02.57    frame= 4796 fps=1552 q=-1.0 size=   15872KiB time=00:02:40.00 bitrate= 812.6kbits/s speed=51.8x elapsed=0:00:03.09    [mp4 @ 000001b31921fd00] Starting second pass: moving the moov atom to the beginning of the file
[out#0/mp4 @ 000001b31718dc80] video:12855KiB audio:3888KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 1.076763%
frame= 4986 fps=1558 q=-1.0 Lsize=   16924KiB time=00:02:46.21 bitrate= 834.1kbits/s speed=51.9x elapsed=0:00:03.20    
[aac @ 000001b319211100] Qavg: 793.315

## 2026-11-08T12:58:48.605Z • Verify final MP4 with ffprobe
{
    "programs": [

    ],
    "stream_groups": [

    ],
    "streams": [
        {
            "codec_name": "h264",
            "width": 720,
            "height": 1280,
            "r_frame_rate": "30/1",
            "side_data_list": [
                {

                }
            ]
        },
        {
            "codec_name": "aac",
            "sample_rate": "48000",
            "channels": 2,
            "r_frame_rate": "0/0"
        }
    ],
    "format": {
        "duration": "166.210958",
        "size": "17329700"
    }
}

## 2026-11-08T12:58:48.694Z • Measure mixed-audio peak and RMS
[aist#0:0/pcm_s16le @ 000001a5b16400c0] Guessed Channel Layout: stereo
Input #0, wav, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\public\audio\final-mix.wav':
  Metadata:
    encoder         : Lavf63.1.102
  Duration: 00:02:46.21, bitrate: 1536 kb/s
  Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 48000 Hz, stereo, s16, 1536 kb/s
[Parsed_volumedetect_0 @ 000001a5b15af400] n_samples: 0
Stream mapping:
  Stream #0:0 -> #0:0 (pcm_s16le (native) -> pcm_s16le (native))
Press [q] to stop, [?] for help
Output #0, null, to 'NUL':
  Metadata:
    encoder         : Lavf63.1.102
  Stream #0:0: Audio: pcm_s16le, 48000 Hz, stereo, s16, 1536 kb/s
    Metadata:
      encoder         : Lavc63.1.102 pcm_s16le
[Parsed_volumedetect_0 @ 000001a5af7da5c0] n_samples: 15956252
[Parsed_volumedetect_0 @ 000001a5af7da5c0] mean_volume: -20.6 dB
[Parsed_volumedetect_0 @ 000001a5af7da5c0] max_volume: -3.5 dB
[Parsed_volumedetect_0 @ 000001a5af7da5c0] histogram_3db: 164
[Parsed_volumedetect_0 @ 000001a5af7da5c0] histogram_4db: 4850
[Parsed_volumedetect_0 @ 000001a5af7da5c0] histogram_5db: 11654
[out#0/null @ 000001a5af7c7340] video:0KiB audio:31165KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: unknown
size=N/A time=00:02:46.21 bitrate=N/A speed=3.94e+03x elapsed=0:00:00.04    

## 2026-11-08T12:58:48.847Z • Preview still at 6s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-006.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-006.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:58:56.846Z • Preview still at 25s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-025.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-025.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:59:04.125Z • Preview still at 44s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-044.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-044.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:59:11.469Z • Preview still at 68s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-068.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-068.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:59:18.694Z • Preview still at 80s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-080.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-080.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:59:25.953Z • Preview still at 88s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-088.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-088.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:59:33.206Z • Preview still at 111s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-111.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-111.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:59:40.446Z • Preview still at 122s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-122.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-122.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:59:47.676Z • Preview still at 130s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-130.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-130.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T12:59:55.242Z • Preview still at 140s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-140.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-140.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T13:00:02.547Z • Preview still at 156s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-156.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-156.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T13:00:09.752Z • Preview still at 164s
Bundling 8%
Bundling 69%
Bundling 75%
Bundling 81%
Bundling 87%
Bundling 93%
Bundling 100%
Getting composition
Composition          PulauHalimunHoror
Format               png
Output               D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-164.png
Rendered 0/1
Rendered 0/1
Rendered 1/1
○                    D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-164.png
Warning: The root directory of your project is D:\Project\remotion-video, but you are executing this command from D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108. The recommendation is to execute commands from the root directory.

## 2026-11-08T13:00:16.961Z • Build contact sheet
Generated scene overview and 12 high-resolution labeled keyframes in D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-006.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #1, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-025.png':
  Duration: N/A, bitrate: N/A
  Stream #1:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #2, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-044.png':
  Duration: N/A, bitrate: N/A
  Stream #2:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #3, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-068.png':
  Duration: N/A, bitrate: N/A
  Stream #3:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #4, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-080.png':
  Duration: N/A, bitrate: N/A
  Stream #4:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #5, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-088.png':
  Duration: N/A, bitrate: N/A
  Stream #5:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #6, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-111.png':
  Duration: N/A, bitrate: N/A
  Stream #6:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #7, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-122.png':
  Duration: N/A, bitrate: N/A
  Stream #7:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #8, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-130.png':
  Duration: N/A, bitrate: N/A
  Stream #8:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #9, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-140.png':
  Duration: N/A, bitrate: N/A
  Stream #9:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #10, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-156.png':
  Duration: N/A, bitrate: N/A
  Stream #10:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
Input #11, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-164.png':
  Duration: N/A, bitrate: N/A
  Stream #11:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\overview.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\overview.jpg.
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-006.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\001-frame-006.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\001-frame-006.jpg.
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-025.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\002-frame-025.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\002-frame-025.jpg.
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-044.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\003-frame-044.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\003-frame-044.jpg.
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-068.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\004-frame-068.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\004-frame-068.jpg.
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-080.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\005-frame-080.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\005-frame-080.jpg.
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-088.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\006-frame-088.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\006-frame-088.jpg.
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-111.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\007-frame-111.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\007-frame-111.jpg.
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-122.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\008-frame-122.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\008-frame-122.jpg.
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-130.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\009-frame-130.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\009-frame-130.jpg.
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-140.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\010-frame-140.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\010-frame-140.jpg.
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-156.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\011-frame-156.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\011-frame-156.jpg.
ffmpeg version 9.0.2-full_build-www.gyan.dev Copyright (c) 2000-2026 the FFmpeg developers
  built with gcc 16.2.0 (Rev3, Built by MSYS2 project)
  configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-cairo --enable-fontconfig --enable-iconv --enable-gnutls --enable-lcms2 --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-liboapv --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libsvtjpegxs --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-openal --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint --enable-whisper
  libavutil      61.  1.102 / 61.  1.102
  libavcodec     63.  1.102 / 63.  1.102
  libavformat    63.  1.102 / 63.  1.102
  libavdevice    63.  1.102 / 63.  1.102
  libavfilter    12.  1.102 / 12.  1.102
  libswscale     10.  1.102 / 10.  1.102
  libswresample   7.  1.102 /  7.  1.102
Input #0, png_pipe, from 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\frames\frame-164.png':
  Duration: N/A, bitrate: N/A
  Stream #0:0: Video: png, rgb24(pc, gbr/unknown/unknown), 720x1280, 25 fps, 25 tbr, 25 tbn
File 'D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\012-frame-164.jpg' already exists. Overwrite? [y/N] Not overwriting - exiting
Error opening output file D:\Project\remotion-video\projects\pulau-halimun-perahu-tak-kembali-20261108\out\contact-sheet\012-frame-164.jpg.

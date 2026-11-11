import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const W = 1080;
const H = 1920;
const SCENE_STARTS = [0, 360, 720, 1080, 1440];
const SCENE_DURATIONS = [390, 390, 390, 390, 360];
const ease = Easing.bezier(0.22, 0.78, 0.18, 1);

const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};

const sceneFade = (frame: number, duration: number, last: boolean) => {
  const fadeIn = interpolate(frame, [0, 32], [0, 1], {...clamp, easing: ease});
  if (last) return fadeIn;
  const fadeOut = interpolate(frame, [duration - 30, duration], [1, 0], {...clamp, easing: ease});
  return Math.min(fadeIn, fadeOut);
};

const Orb = ({x, y, size, hue = "pearl", frame = 0}: {x: number; y: number; size: number; hue?: string; frame?: number}) => {
  const palette = hue === "rose"
    ? ["#fff2dc", "#f3c9c8", "#927aa2"]
    : hue === "blue"
      ? ["#e8f4f6", "#b7d9e1", "#667da5"]
      : ["#fff7e7", "#e1d7d1", "#8584aa"];
  const bob = Math.sin(frame / 52 + x * 0.01) * 13;
  return (
    <div style={{
      position: "absolute", left: x, top: y + bob, width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle at 32% 25%, ${palette[0]} 0%, ${palette[1]} 24%, ${palette[2]} 73%, rgba(22,21,48,.9) 100%)`,
      boxShadow: `0 0 ${size * 0.13}px rgba(231,218,239,.24), 0 0 ${size * 0.38}px rgba(164,151,223,.16)`,
      opacity: 0.92,
    }} />
  );
};

const Portal = ({frame, x = 540, y = 1020, scale = 1, warm = false}: {frame: number; x?: number; y?: number; scale?: number; warm?: boolean}) => {
  const rotation = Math.sin(frame / 110) * 2.2;
  const glow = warm ? "rgba(255,211,165,.7)" : "rgba(202,201,255,.68)";
  const inner = warm ? "rgba(246,190,159,.44)" : "rgba(165,188,230,.34)";
  const id = `${warm ? "warm" : "cool"}-${Math.round(y)}-${Math.round(scale * 100)}`;
  return (
    <svg
      width={560 * scale}
      height={850 * scale}
      viewBox="0 0 560 850"
      style={{position: "absolute", left: x - 280 * scale, top: y - 425 * scale, overflow: "visible", transform: `rotate(${rotation}deg)`}}
    >
      <defs>
        <linearGradient id={`portal-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={warm ? "#fff2cb" : "#f5f3ff"} stopOpacity=".95" />
          <stop offset=".48" stopColor={warm ? "#efb8a9" : "#bfc8f3"} stopOpacity=".72" />
          <stop offset="1" stopColor={warm ? "#b582a7" : "#8282b1"} stopOpacity=".28" />
        </linearGradient>
        <filter id={`portal-glow-${id}`} x="-60%" y="-40%" width="220%" height="190%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>
      <path d="M82 835V333C82 145 172 54 280 54s198 91 198 279v502" fill="none" stroke={glow} strokeWidth="25" opacity=".27" filter={`url(#portal-glow-${id})`} />
      <path d="M96 835V344C96 167 178 81 280 81s184 86 184 263v491" fill="none" stroke={`url(#portal-${id})`} strokeWidth="4" opacity=".92" />
      <path d="M124 835V358C124 202 190 117 280 117s156 85 156 241v477" fill={inner} opacity=".26" />
      <path d="M150 835V374C150 228 205 148 280 148s130 80 130 226v461" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="2" />
      <ellipse cx="280" cy="804" rx="230" ry="24" fill={glow} opacity=".24" />
    </svg>
  );
};

const ParticleField = ({frame, count = 34, tint = "#e7dff2"}: {frame: number; count?: number; tint?: string}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: "absolute", inset: 0, pointerEvents: "none"}}>
    {Array.from({length: count}, (_, i) => {
      const seed = i * 83.7 + 19;
      const x = (Math.sin(seed * 1.77) * 0.5 + 0.5) * W;
      const baseY = (Math.sin(seed * 2.39) * 0.5 + 0.5) * H;
      const speed = 0.18 + (i % 6) * 0.055;
      const y = (baseY - frame * speed + H * 2) % H;
      const alpha = 0.16 + (Math.sin(frame / (18 + i % 17) + i) * 0.5 + 0.5) * 0.5;
      const radius = 1.3 + (i % 4) * 0.7;
      return <circle key={i} cx={x} cy={y} r={radius} fill={tint} opacity={alpha} />;
    })}
  </svg>
);

const ChapterTitle = ({frame, first, second, accent = "#e8d8cb", enterAt = 36}: {frame: number; first: string; second: string; accent?: string; enterAt?: number}) => {
  const {fps} = useVideoConfig();
  const local = frame - enterAt;
  const pop = spring({frame: local, fps, config: {damping: 22, stiffness: 78, mass: 1.2}});
  const opacity = interpolate(local, [0, 22, 205, 244], [0, 1, 1, 0], {...clamp, easing: ease});
  const y = interpolate(pop, [0, 1], [34, 0]);
  return (
    <div style={{position: "absolute", left: 84, right: 84, top: 470, textAlign: "center", opacity, transform: `translateY(${y}px)`, pointerEvents: "none"}}>
      <div style={{fontFamily: "Arial, sans-serif", fontSize: 19, letterSpacing: 8, fontWeight: 500, color: "rgba(235,228,237,.66)", textTransform: "uppercase", marginBottom: 36}}>
        A WORDLESS DREAM JOURNEY
      </div>
      <div style={{fontFamily: "Georgia, 'Times New Roman', serif", color: "#f4edf0", fontSize: 91, lineHeight: 1.02, fontWeight: 400, letterSpacing: -2, textShadow: "0 8px 50px rgba(8,8,24,.36)"}}>
        {first}
      </div>
      <div style={{fontFamily: "Georgia, 'Times New Roman', serif", color: accent, fontSize: 78, lineHeight: 1.12, fontWeight: 400, fontStyle: "italic", letterSpacing: -1, textShadow: "0 8px 42px rgba(8,8,24,.42)"}}>
        {second}
      </div>
      <div style={{margin: "36px auto 0", width: 74, height: 1, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, opacity: 0.8}} />
    </div>
  );
};

const Meadow = ({frame}: {frame: number}) => {
  const drift = Math.sin(frame / 90) * 18;
  return (
    <>
      <AbsoluteFill style={{background: "radial-gradient(ellipse 70% 34% at 52% 61%, rgba(100,91,132,.55), transparent 72%), linear-gradient(180deg,#090b1d 0%,#15172f 43%,#4a4565 70%,#171a31 100%)"}} />
      <div style={{position: "absolute", inset: 0, transform: `translateX(${drift}px)`}}>
        <Orb x={610} y={270} size={330} hue="pearl" frame={frame} />
        <div style={{position: "absolute", left: 672, top: 316, width: 470, height: 145, border: "1px solid rgba(240,227,240,.23)", borderRadius: "50%", transform: `rotate(-19deg) scale(${1 + Math.sin(frame / 72) * 0.012})`}} />
        <div style={{position: "absolute", left: 165, top: 1010, width: 750, height: 610, background: "radial-gradient(ellipse,rgba(205,184,229,.13),transparent 68%)", filter: "blur(24px)"}} />
        <Portal frame={frame} x={540} y={1230} scale={0.82} />
      </div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: "absolute", inset: 0}}>
        <path d="M0 1320 C180 1260 332 1300 510 1268S850 1280 1080 1235V1920H0Z" fill="#35334e" opacity=".75" />
        <path d="M0 1435 C180 1370 330 1410 535 1375S870 1408 1080 1350V1920H0Z" fill="#242842" />
        <path d="M0 1565 C210 1485 380 1535 575 1500S865 1530 1080 1485V1920H0Z" fill="#161c34" />
        {Array.from({length: 34}, (_, i) => {
          const x = i * 34 - 40;
          const base = 1620 + (i % 5) * 37;
          const sway = Math.sin(frame / 19 + i * 0.8) * 15;
          const height = 72 + (i * 17) % 95;
          return <path key={i} d={`M${x} ${base} Q${x + sway} ${base - height * 0.55} ${x + sway * 0.65} ${base - height}`} fill="none" stroke={i % 3 === 0 ? "#c5b7ce" : "#9da2b9"} strokeOpacity={0.18 + (i % 4) * 0.025} strokeWidth={i % 4 === 0 ? 3 : 1.6} strokeLinecap="round" />;
        })}
      </svg>
      <ParticleField frame={frame} count={36} tint="#f3e3ed" />
      <ChapterTitle frame={frame} first="BETWEEN" second="SKY & SLEEP" enterAt={30} />
    </>
  );
};

const CloudSea = ({frame}: {frame: number}) => {
  const drift = Math.sin(frame / 80) * 26;
  return (
    <>
      <AbsoluteFill style={{background: "radial-gradient(ellipse 55% 34% at 50% 54%,rgba(164,171,205,.42),transparent 72%),linear-gradient(180deg,#111326 0%,#22243b 40%,#65627c 72%,#22273d 100%)"}} />
      <Orb x={90} y={470} size={180} hue="blue" frame={frame} />
      <div style={{position: "absolute", left: -150 + drift, top: 920, width: 1380, height: 580, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(221,222,232,.28),rgba(153,162,189,.13) 46%,transparent 73%)", filter: "blur(26px)"}} />
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: "absolute", inset: 0}}>
        <path d="M-80 1280 C80 1170 140 1200 270 1260 C390 1130 475 1158 600 1240 C730 1100 855 1140 970 1220 C1120 1130 1190 1210 1240 1285V1920H-80Z" fill="#b8b8cb" opacity=".28" />
        <path d="M-100 1390 C40 1300 170 1300 300 1375 C440 1240 560 1280 690 1370 C800 1250 940 1295 1050 1385 C1160 1315 1220 1360 1240 1410V1920H-100Z" fill="#e1dfe6" opacity=".31" />
        <path d="M-100 1530 C80 1455 175 1480 315 1550 C455 1430 585 1460 710 1550 C840 1425 960 1470 1080 1555 C1160 1510 1220 1530 1240 1585V1920H-100Z" fill="#aeb4c9" opacity=".25" />
        <path d="M190 1175 C295 1085 380 1095 474 1158" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2" />
        <path d="M735 1120 C824 1050 911 1066 985 1132" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="2" />
      </svg>
      <Portal frame={frame} x={540} y={1080} scale={0.88} />
      <ParticleField frame={frame} count={46} tint="#f0e9f0" />
      <ChapterTitle frame={frame} first="THE WORLD" second="GROWS QUIET" accent="#e5d8dd" enterAt={34} />
    </>
  );
};

const SilverPath = ({frame}: {frame: number}) => {
  const bob = Math.sin(frame / 23) * 12;
  const stepColors = ["#e8d8d2", "#d6cdd9", "#c5c5d7", "#b2bfd2", "#a9b8ca", "#c7c0d4", "#ded0cf", "#f0dfd1", "#f5ebdb"];
  return (
    <>
      <AbsoluteFill style={{background: "radial-gradient(ellipse 64% 42% at 50% 54%,rgba(139,145,183,.48),transparent 72%),linear-gradient(180deg,#101326 0%,#20223c 43%,#51526e 72%,#161b31 100%)"}} />
      <div style={{position: "absolute", width: 550, height: 550, left: 265, top: 100, borderRadius: "50%", background: "radial-gradient(circle,rgba(226,221,230,.16),transparent 69%)"}} />
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: "absolute", inset: 0}}>
        <path d="M-80 1350 C160 1245 255 1325 410 1375 C610 1230 760 1260 920 1375 C1050 1310 1170 1350 1220 1390V1920H-80Z" fill="#74778d" opacity=".43" />
        <path d="M-80 1540 C90 1440 230 1485 390 1560 C575 1420 770 1460 900 1570 C1050 1495 1160 1525 1220 1580V1920H-80Z" fill="#30344f" opacity=".8" />
        {Array.from({length: 11}, (_, i) => {
          const p = i / 10;
          const x = 540 + Math.sin(frame / 110 + p * 2.7) * 90 - p * 20;
          const y = 1480 - i * 99 + bob * (1 - p);
          const w = 310 - i * 19;
          const rx = 22 + i * 1.8;
          return <g key={i} opacity={0.84 - p * 0.28}>
            <ellipse cx={x} cy={y} rx={w / 2 + 22} ry={rx + 18} fill="#e7d9e8" opacity=".07" />
            <ellipse cx={x} cy={y} rx={w / 2} ry={rx} fill={stepColors[i]} opacity=".8" />
            <path d={`M${x - w / 2 + 30} ${y - 4} Q${x} ${y - rx - 13} ${x + w / 2 - 30} ${y - 4}`} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2" />
          </g>;
        })}
        <path d="M535 1510 C465 1290 625 1130 514 930 C438 793 504 645 557 540" fill="none" stroke="rgba(229,220,230,.26)" strokeWidth="4" strokeDasharray="1 18" strokeLinecap="round" />
      </svg>
      <Orb x={414} y={260} size={250} hue="rose" frame={frame} />
      <ParticleField frame={frame} count={42} tint="#f4e1d7" />
      <ChapterTitle frame={frame} first="FOLLOW THE" second="SILVER CURRENT" accent="#e6d3c5" enterAt={28} />
    </>
  );
};

const MirrorSea = ({frame}: {frame: number}) => {
  const shimmer = 0.8 + Math.sin(frame / 16) * 0.08;
  return (
    <>
      <AbsoluteFill style={{background: "radial-gradient(ellipse 54% 28% at 51% 56%,rgba(171,170,194,.38),transparent 72%),linear-gradient(180deg,#0b1022 0%,#1d2239 45%,#66647b 67%,#181d34 100%)"}} />
      <Orb x={379} y={545} size={322} hue="pearl" frame={frame} />
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: "absolute", inset: 0}}>
        <path d="M0 1080 C175 1055 340 1098 540 1075 C755 1053 920 1094 1080 1073V1920H0Z" fill="#454861" opacity=".75" />
        <path d="M0 1160 C160 1140 350 1170 540 1155 C740 1140 920 1175 1080 1156" fill="none" stroke="rgba(236,222,232,.42)" strokeWidth="3" />
        {Array.from({length: 16}, (_, i) => {
          const y = 1188 + i * 42;
          const width = 70 + i * 37;
          const pulse = 1 + Math.sin(frame / 21 + i * 0.48) * 0.035;
          return <ellipse key={i} cx={540 + Math.sin(frame / 46 + i) * 11} cy={y} rx={width * pulse} ry={6 + i * 0.45} fill="none" stroke={i < 5 ? "rgba(241,225,233,.26)" : "rgba(204,203,221,.12)"} strokeWidth="2" />;
        })}
        <path d="M480 1140 C505 1220 470 1290 520 1360 C551 1410 530 1460 540 1525" fill="none" stroke={`rgba(237,220,228,${shimmer * 0.38})`} strokeWidth="32" />
        <path d="M500 1140 C522 1230 500 1290 540 1370 C563 1416 548 1472 553 1530" fill="none" stroke="rgba(255,243,229,.24)" strokeWidth="3" />
        <path d="M0 1650 C180 1610 355 1665 535 1630 C736 1590 900 1655 1080 1615V1920H0Z" fill="#171d34" opacity=".75" />
      </svg>
      <ParticleField frame={frame} count={30} tint="#f5e8e2" />
      <ChapterTitle frame={frame} first="WHERE THE" second="MOON REMEMBERS" accent="#e2ccd0" enterAt={26} />
    </>
  );
};

const DawnGate = ({frame}: {frame: number}) => {
  const warmup = interpolate(frame, [0, 150, 360], [0, 1, 1], {...clamp, easing: ease});
  const rise = interpolate(frame, [0, 360], [54, -18], {...clamp, easing: ease});
  return (
    <>
      <AbsoluteFill style={{background: `radial-gradient(ellipse 55% 35% at 51% 63%,rgba(255,197,164,${0.3 + warmup * 0.18}),transparent 72%),linear-gradient(180deg,#101326 0%,#282640 42%,#8b6e7d 72%,#24213b 100%)`}} />
      <div style={{position: "absolute", left: 250, top: 680 + rise, width: 580, height: 580, borderRadius: "50%", background: "radial-gradient(circle at 42% 38%,#fff0d8 0%,#f0c8b6 24%,rgba(199,143,164,.66) 52%,rgba(255,201,178,0) 74%)", filter: "blur(1px)"}} />
      <div style={{position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 45% at 50% 68%,rgba(241,182,168,.2),transparent 76%)"}} />
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: "absolute", inset: 0}}>
        <path d="M-50 1300 C120 1200 260 1245 420 1325 C600 1190 740 1210 885 1320 C1020 1250 1150 1300 1160 1340V1920H-50Z" fill="#a17c8a" opacity=".34" />
        <path d="M-60 1460 C160 1365 290 1415 430 1480 C600 1370 755 1400 900 1488 C1030 1415 1150 1445 1170 1510V1920H-60Z" fill="#46384f" opacity=".82" />
        <path d="M-70 1620 C100 1530 285 1570 430 1640 C610 1530 770 1575 920 1648 C1045 1580 1150 1604 1180 1660V1920H-70Z" fill="#201e38" />
        <path d="M80 1550 C230 1520 310 1540 430 1570 M650 1560 C790 1525 900 1535 1020 1570" fill="none" stroke="rgba(247,219,208,.21)" strokeWidth="2" />
        {Array.from({length: 7}, (_, i) => {
          const x = 110 + i * 142;
          const y = 1160 + Math.sin(frame / 28 + i * 1.2) * 13;
          return <path key={i} d={`M${x} ${y} q24 -27 48 0 q-24 23 -48 0`} fill="none" stroke="rgba(39,35,58,.42)" strokeWidth="3" strokeLinecap="round" />;
        })}
      </svg>
      <Portal frame={frame} x={540} y={1050} scale={0.93} warm />
      <ParticleField frame={frame} count={38} tint="#ffe6d4" />
      <div style={{position: "absolute", left: 0, right: 0, top: 520, textAlign: "center", opacity: interpolate(frame, [24, 52, 314, 360], [0, 1, 1, 0], {...clamp, easing: ease})}}>
        <div style={{fontFamily: "Arial, sans-serif", color: "rgba(251,231,222,.67)", letterSpacing: 9, fontSize: 18, marginBottom: 30}}>TAKE THE LONG WAY HOME</div>
        <div style={{fontFamily: "Georgia, serif", color: "#fff0e6", fontSize: 116, fontWeight: 400, lineHeight: 0.98, textShadow: "0 8px 54px rgba(22,14,32,.32)"}}>DREAM</div>
        <div style={{fontFamily: "Georgia, serif", color: "#f1d0c7", fontSize: 86, fontStyle: "italic", lineHeight: 1.08}}>again</div>
        <div style={{marginTop: 50, color: "rgba(250,231,222,.56)", fontFamily: "Arial, sans-serif", fontSize: 15, letterSpacing: 5}}>A ONE-MINUTE MOTION STUDY</div>
      </div>
    </>
  );
};

const Scene = ({index, duration, last}: {index: number; duration: number; last: boolean}) => {
  const frame = useCurrentFrame();
  const opacity = sceneFade(frame, duration, last);
  const Component = [Meadow, CloudSea, SilverPath, MirrorSea, DawnGate][index];
  return (
    <AbsoluteFill style={{opacity, overflow: "hidden"}}>
      <Component frame={frame} />
    </AbsoluteFill>
  );
};

export const BetweenSleepAndSky: React.FC = () => (
  <AbsoluteFill style={{background: "#090b1d", overflow: "hidden"}}>
    {SCENE_STARTS.map((from, index) => (
      <Sequence key={index} from={from} durationInFrames={SCENE_DURATIONS[index]}>
        <Scene index={index} duration={SCENE_DURATIONS[index]} last={index === SCENE_STARTS.length - 1} />
      </Sequence>
    ))}
    <AbsoluteFill style={{pointerEvents: "none", background: "radial-gradient(ellipse 90% 88% at 50% 48%,transparent 51%,rgba(5,7,20,.42) 100%)"}} />
    <Audio src={staticFile("audio/bgm.wav")} volume={0.8} />
    <Audio src={staticFile("audio/sfx.wav")} volume={0.8} />
  </AbsoluteFill>
);

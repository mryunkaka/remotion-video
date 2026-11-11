import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import geo from './data/geo.json';
import {W, H, PAL, Sky, Clouds, Hills, Canopy, Ground, Smoke, Worker, Shed, Chimney, Adit, Rails, Loco, Ship, Waves, prng} from './art';

export const DISPLAY = "'Bitstream Charter','DejaVu Serif',Georgia,serif";
export const SANS = "'Inter','DejaVu Sans',Arial,sans-serif";
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = Easing.out(Easing.cubic);

export const useSec = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return f / fps;
};
const rise = (sec: number, at: number, dur = 0.7) => interpolate(sec, [at, at + dur], [0, 1], {...clamp, easing: ease});

export const Svg: React.FC<{children: React.ReactNode; zoom?: [number, number]; sec: number; dur: number; origin?: string}> = ({children, zoom = [1.0, 1.08], sec, dur, origin = '50% 60%'}) => {
  const z = interpolate(sec, [0, dur], zoom, clamp);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{transform: `scale(${z})`, transformOrigin: origin}}>
        {children}
      </svg>
    </AbsoluteFill>
  );
};

/* Reusable text bits */
export const Kicker: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{fontFamily: SANS, fontWeight: 700, letterSpacing: 8, fontSize: 30, color: '#f5e6c8', textShadow: '0 2px 14px rgba(0,0,0,.7)', ...style}}>{children}</div>
);
export const Note: React.FC<{children: React.ReactNode; op?: number; style?: React.CSSProperties}> = ({children, op = 1, style}) => (
  <div style={{fontFamily: SANS, fontWeight: 500, fontSize: 27, lineHeight: 1.35, color: 'rgba(245,236,220,.92)', background: 'rgba(12,14,16,.5)', padding: '10px 18px', borderRadius: 12, opacity: op, ...style}}>{children}</div>
);
const Chip: React.FC<{sec: number; at: number; children: React.ReactNode; accent?: string; icon?: string}> = ({sec, at, children, accent = '#e6b36a', icon}) => {
  const p = rise(sec, at, 0.6);
  return (
    <div style={{opacity: p, transform: `translateX(${(1 - p) * -60}px)`, display: 'flex', alignItems: 'center', gap: 18, background: 'rgba(14,16,18,.72)', borderLeft: `8px solid ${accent}`, padding: '16px 26px', borderRadius: 14, fontFamily: SANS, fontWeight: 700, fontSize: 38, color: '#fbf1dc', letterSpacing: 1}}>
      {icon && <span style={{fontSize: 40}}>{icon}</span>}
      {children}
    </div>
  );
};

/* ---------- Scene backdrops ---------- */
const PresentLandscape: React.FC<{sec: number; dur: number; ghost?: number}> = ({sec, dur, ghost = 0}) => {
  const pal = PAL.dusk;
  return (
    <Svg sec={sec} dur={dur} zoom={[1.0, 1.12]}>
      <Sky pal={pal} id="pl" sunX={700} sunY={820} />
      <Clouds sec={sec} y={380} />
      <Hills y={1010} amp={110} color={pal.far} seed={4} opacity={0.9} />
      <Canopy y={1090} h={80} color="#33463a" seed={11} sec={sec} palms={3} />
      {ghost > 0 && (
        <g opacity={ghost * 0.4}>
          <Chimney x={300} y={1120} h={330} color="#1b1511" />
          <Smoke x={300} y={790} sec={sec} amount={0.8} seed={2} />
          <Shed x={440} y={1130} w={210} h={90} />
          <Shed x={680} y={1130} w={150} h={70} />
        </g>
      )}
      <Canopy y={1180} h={110} color={pal.mid2} seed={23} sec={sec} palms={2} step={54} />
      <Ground y={1250} pal={pal} />
      <path d="M400 1920 L480 1250 L630 1250 L880 1920 Z" fill="#7a6849" opacity={0.9} />
      <path d="M560 1920 L552 1250 L558 1250 L600 1920 Z" fill="#9a8662" opacity={0.4} />
      <Canopy y={1300} h={60} color={pal.near} seed={31} sec={sec} palms={0} step={50} solid={false} />
    </Svg>
  );
};

const MineScene: React.FC<{sec: number; dur: number; activity?: number; pal?: typeof PAL.gold; lights?: number}> = ({sec, dur, activity = 1, pal = PAL.gold, lights = 1}) => (
  <Svg sec={sec} dur={dur} zoom={[1.0, 1.1]}>
    <Sky pal={pal} id={`mn${Math.round(activity * 10)}`} sunX={260} sunY={880} />
    <Clouds sec={sec} y={360} />
    <Hills y={1020} amp={120} color={pal.far} seed={8} opacity={0.9} />
    <Canopy y={1090} h={80} color="#3c5442" seed={9} sec={sec} palms={2} />
    <Ground y={1180} pal={pal} />
    <Chimney x={800} y={1220} h={420} color="#2a2018" />
    <Smoke x={800} y={810} sec={sec} amount={activity} seed={1} color="#4a4540" />
    <Shed x={420} y={1230} w={260} h={110} light={lights} />
    <Shed x={90} y={1250} w={180} h={90} light={lights} />
    <Shed x={900} y={1240} w={170} h={80} light={lights} />
    {/* incline conveyor */}
    <path d="M120 1250 L520 1010 M150 1250 L550 1010" stroke="#1a130d" strokeWidth={8} />
    <path d="M520 1010 L540 1000 L560 1010 L560 1130 L520 1130 Z" fill="#241b14" />
    <Adit x={250} y={1330} s={1.3} />
    {/* coal piles */}
    <path d="M520 1330 Q620 1210 760 1330 Z" fill="#0c0b0a" />
    <path d="M700 1340 Q810 1250 940 1340 Z" fill="#0f0d0c" />
    <Rails y={1400} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <Worker key={i} x={((i * 230 + sec * 36 * (i % 2 ? 1 : -1) * activity) % 1300 + 1300) % 1300 - 100} y={1470 + (i % 3) * 36} s={1.0 + (i % 3) * 0.14} sec={sec * Math.max(activity, 0.2)} ph={i} carry={i % 2 === 0} dir={i % 2 ? 1 : -1} />
    ))}
    <Canopy y={1960} h={20} color={pal.near} seed={5} />
  </Svg>
);

const RailScene: React.FC<{sec: number; dur: number}> = ({sec, dur}) => {
  const pal = PAL.gold;
  const locoX = interpolate(sec, [0, dur], [-1500, 1500], clamp);
  return (
    <Svg sec={sec} dur={dur} zoom={[1.0, 1.06]}>
      <Sky pal={pal} id="rl" sunX={820} sunY={900} />
      <Clouds sec={sec} y={400} />
      <Hills y={1040} amp={100} color={pal.far} seed={6} opacity={0.9} />
      <Canopy y={1120} h={90} color="#3a5240" seed={14} sec={sec} palms={3} />
      <Ground y={1250} pal={pal} />
      <Canopy y={1260} h={50} color="#22342a" seed={15} step={40} />
      <Rails y={1440} offset={sec * 40} />
      <Smoke x={locoX + 365} y={1290} sec={sec * 2} amount={0.9} color="#6b6660" seed={3} />
      <Loco x={locoX} y={1445} sec={sec} wagons={3} />
      <Rect y={1470} />
      <Canopy y={1960} h={20} color={pal.near} seed={5} />
    </Svg>
  );
};
const Rect: React.FC<{y: number}> = ({y}) => <rect x={0} y={y + 20} width={W} height={H - y} fill="#1d150f" opacity={0.85} />;

const PortScene: React.FC<{sec: number; dur: number}> = ({sec, dur}) => {
  const pal = PAL.sea;
  return (
    <Svg sec={sec} dur={dur} zoom={[1.0, 1.1]}>
      <Sky pal={pal} id="pt" sunX={300} sunY={800} />
      <Clouds sec={sec} y={380} />
      <Hills y={980} amp={60} color="#6b8794" seed={2} opacity={0.8} />
      <rect x={0} y={1000} width={W} height={H - 1000} fill="#2a4252" />
      <rect x={0} y={1000} width={W} height={240} fill="#d9a572" opacity={0.25} />
      <Waves y={1030} sec={sec} color="#9fc2cf" opacity={0.35} />
      <Ship x={interpolate(sec, [0, dur], [330, 270], clamp)} y={1260} sec={sec} />
      <Smoke x={interpolate(sec, [0, dur], [330, 270], clamp) + 220} y={1030} sec={sec} amount={0.6} color="#55504b" seed={4} />
      {/* pier */}
      <rect x={-20} y={1330} width={W + 40} height={22} fill="#1d150f" />
      {Array.from({length: 11}).map((_, i) => <rect key={i} x={i * 110 + 10} y={1350} width={16} height={220} fill="#150f0b" />)}
      <path d="M720 1330 L760 1090 L800 1330 M740 1210 L780 1210" stroke="#150f0b" strokeWidth={10} fill="none" />
      <path d="M760 1090 L960 1150" stroke="#150f0b" strokeWidth={6} />
      <Waves y={1360} sec={sec + 3} color="#cfe2e8" opacity={0.22} />
      {[0, 1, 2].map((i) => <Worker key={i} x={140 + i * 140 + Math.sin(sec + i) * 8} y={1330} s={0.95} sec={sec} ph={i} carry={i === 1} />)}
      <rect x={0} y={1560} width={W} height={400} fill="#0f171c" opacity={0.9} />
    </Svg>
  );
};

const RuinsScene: React.FC<{sec: number; dur: number}> = ({sec, dur}) => {
  const pal = PAL.grey;
  const r = prng(77);
  const wall = (x: number, w: number, h: number, k: number) => {
    let d = `M${x} 1330 L${x} ${1330 - h}`;
    const n = Math.round(w / 26);
    for (let i = 1; i <= n; i++) d += ` L${x + (i * w) / n} ${1330 - h + (r() - 0.3) * 120}`;
    d += ` L${x + w} 1330 Z`;
    return <path key={k} d={d} fill="#3a342b" stroke="#25201a" strokeWidth={3} />;
  };
  return (
    <Svg sec={sec} dur={dur} zoom={[1.0, 1.1]}>
      <Sky pal={pal} id="rn" sunX={500} sunY={800} sunR={80} />
      <Clouds sec={sec} y={360} opacity={0.22} />
      <Hills y={1020} amp={90} color={pal.far} seed={5} opacity={0.9} />
      <Canopy y={1100} h={90} color="#3a4a3b" seed={20} sec={sec} palms={2} />
      <Ground y={1230} pal={pal} />
      <Chimney x={860} y={1330} h={300} broken color="#3a3128" />
      {wall(120, 260, 230, 1)}
      {wall(430, 330, 170, 2)}
      {wall(60, 110, 120, 3)}
      <rect x={230} y={1200} width={70} height={130} fill="#0f0d0b" />
      <path d="M215 1200 Q265 1140 315 1200" fill="#0f0d0b" />
      {/* vegetation */}
      {Array.from({length: 18}).map((_, i) => {
        const vx = 90 + r() * 800, vy = 1330 - r() * 150;
        return <path key={i} d={`M${vx} ${vy} q${(r() - 0.5) * 60} -60 ${(r() - 0.5) * 80} ${-30 - r() * 60}`} stroke="#2e5a34" strokeWidth={6} fill="none" strokeLinecap="round" />;
      })}
      <Canopy y={1420} h={120} color={pal.near} seed={33} sec={sec} palms={1} step={60} />
      <rect x={0} y={1430} width={W} height={H} fill="#141912" />
      <rect x={0} y={1250} width={W} height={200} fill="#cfd8d0" opacity={0.07} />
    </Svg>
  );
};

/* ---------- Map (real coastline: Natural Earth 1:10m; points from official village-boundary coordinates) ---------- */
const K = 1250; // px per degree at zoom 1
const CX = 116.17, CY = -3.66; // map centre (lon, lat)
const proj = (lon: number, lat: number): [number, number] => [540 + (lon - CX) * K, 900 - (lat - CY) * K];
const pathOf = (pts: number[][], close = true) => pts.map((p, i) => `${i ? 'L' : 'M'}${proj(p[0], p[1]).map((v) => v.toFixed(1)).join(' ')}`).join(' ') + (close ? ' Z' : '');
const MAINLAND = (() => {
  const run = (geo.borneo as number[][]);
  const first = run[0], last = run[run.length - 1];
  const [fx, fy] = proj(first[0], first[1]); const [lx, ly] = proj(last[0], last[1]);
  return pathOf(run, false) + ` L${lx.toFixed(1)} ${ly + 2200} L${-3000} ${ly + 2200} L${-3000} ${fy - 2200} L${fx.toFixed(1)} ${fy - 2200} Z`;
})();
const PT = {
  kb: {ll: [116.228, -3.246], label: 'Kotabaru (kota)'},
  sb: {ll: geo.points.sebelimbingan, label: 'SEBELIMBINGAN (area desa)'},
  st: {ll: geo.points.stagen, label: 'STAGEN (area desa)'},
};
const MapScene: React.FC<{sec: number; dur: number; mode: 'loc' | 'stagen'}> = ({sec, dur, mode}) => {
  const Z0 = mode === 'loc' ? 1.0 : 4.6;
  const Z = mode === 'loc' ? interpolate(sec, [1.5, dur - 1], [1.0, 4.6], {...clamp, easing: Easing.inOut(Easing.cubic)}) : interpolate(sec, [0, dur], [4.5, 4.8], clamp);
  void Z0;
  const focus = proj(116.19, -3.285); // northern tip: Kotabaru - Stagen - Sebelimbingan
  const pr = Math.min(1, (Z - 1) / 3.6);
  const tx = (540 - focus[0]) * pr, ty = (830 - focus[1]) * pr;
  const mk = (key: 'kb' | 'sb' | 'st', col: string, at: number, big = false, side: 'l' | 'r' = 'r') => {
    const [x, y] = proj(PT[key].ll[0], PT[key].ll[1]);
    const o = rise(sec, at, 0.5), pulse = 1 + 0.2 * Math.sin(sec * 4), inv = 1 / Z;
    return (
      <g opacity={o}>
        <circle cx={x} cy={y} r={(big ? 22 : 13) * pulse * inv} fill={col} opacity={0.3} />
        <circle cx={x} cy={y} r={(big ? 11 : 8) * inv} fill={col} stroke="#fff" strokeWidth={2.5 * inv} />
        <text x={x + (side === 'r' ? 20 : -20) * inv} y={y + 8 * inv} textAnchor={side === 'r' ? 'start' : 'end'} fontFamily={SANS} fontWeight={700} fontSize={(big ? 27 : 23) * inv} fill="#fbf1dc" stroke="#0b1620" strokeWidth={5 * inv} paintOrder="stroke">{PT[key].label}</text>
      </g>
    );
  };
  const kmPx = (5 / 111.32) * K * Z; // 5 km in screen px
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #1f4256 0%, #0d2230 70%, #08141c 100%)', overflow: 'hidden'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{transform: `translate(${tx}px, ${ty}px) scale(${Z})`, transformOrigin: `${focus[0]}px ${focus[1]}px`}}>
        <path d={MAINLAND} fill="#1f3d3a" stroke="#8fb8a0" strokeWidth={2.5 / Z} strokeOpacity={0.7} />
        <path d={pathOf(geo.sebuku as number[][])} fill="#2f5b4a" stroke="#cfe3c8" strokeWidth={2 / Z} strokeOpacity={0.6} />
        <path d={pathOf(geo.laut as number[][])} fill="#2f5b4a" stroke="#cfe3c8" strokeWidth={3 / Z} strokeOpacity={0.85} strokeLinejoin="round" />
        <text x={proj(115.85, -3.6)[0]} y={proj(115.85, -3.6)[1]} fontFamily={SANS} fontSize={26 / Z} fontWeight={600} fill="#9ccbe0" opacity={0.8} letterSpacing={4 / Z} textAnchor="middle">SELAT LAUT</text>
        <text x={proj(116.12, -3.62)[0]} y={proj(116.12, -3.62)[1]} fontFamily={SANS} fontSize={20 / Z} fontWeight={600} fill="#8fb8a0" opacity={0.7} textAnchor="middle">DARATAN KALIMANTAN</text>
        <text x={proj(116.17, -3.66)[0]} y={proj(116.17, -3.66)[1]} textAnchor="middle" fontFamily={DISPLAY} fontSize={40 / Z} fontWeight={700} fill="#e9f1df" opacity={interpolate(Z, [1, 2], [0.9, 0], clamp)} letterSpacing={6 / Z}>PULAU LAUT</text>
        <text x={proj(116.4, -3.85)[0]} y={proj(116.4, -3.85)[1]} fontFamily={SANS} fontSize={22 / Z} fontWeight={600} fill="#8fc2d6" opacity={0.7} textAnchor="middle">ke arah Selat Makassar →</text>
        {mk('kb', '#e9d27a', mode === 'loc' ? 1.5 : 0.1, false, 'r')}
        {mk('sb', '#ff7a4a', mode === 'loc' ? 3.2 : 0.2, true, 'r')}
        {mode === 'stagen' && mk('st', '#5ac8e8', 0.4, true, 'r')}
      </svg>
      {/* scale bar + north arrow (screen space) */}
      <div style={{position: 'absolute', right: 70, top: 380, textAlign: 'center', fontFamily: SANS, color: '#dfeaf0', fontWeight: 700, fontSize: 26, opacity: 0.9}}>
        <div style={{fontSize: 34}}>▲</div>U
      </div>
      <div style={{position: 'absolute', left: 70, bottom: 700, fontFamily: SANS, color: '#dfeaf0', fontWeight: 600, fontSize: 24}}>
        <div style={{width: Math.min(kmPx, 400), height: 8, borderLeft: '3px solid #dfeaf0', borderRight: '3px solid #dfeaf0', borderBottom: '3px solid #dfeaf0'}} />
        <div>{kmPx > 400 ? `±${Math.round((5 * 400) / kmPx * 10) / 10} km` : '±5 km'}</div>
      </div>
      <div style={{position: 'absolute', left: 50, right: 50, bottom: 540, display: 'flex', flexDirection: 'column', gap: 8}}>
        <Note op={rise(sec, 0.3, 0.8)} style={{fontSize: 22}}>PETA KONSEPTUAL — posisi desa indikatif. Garis pantai: Natural Earth 1:10m. Titik berdasar koordinat batas desa (Perbup Kotabaru No. 105/2019 &amp; No. 39/2020). Letak dermaga tidak ditandai.</Note>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Scenes with overlays ---------- */
export const S1: React.FC = () => {
  const sec = useSec();
  return (
    <AbsoluteFill>
      <PresentLandscape sec={sec} dur={8} />
      <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: 345}}>
        <div style={{opacity: rise(sec, 1.8, 1.2), transform: `translateY(${(1 - rise(sec, 1.8, 1.2)) * 30}px)`, textAlign: 'center'}}>
          <Kicker style={{marginBottom: 20}}>PULAU LAUT · KOTABARU</Kicker>
          <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 96, lineHeight: 1.0, color: '#fff3dc', textShadow: '0 6px 30px rgba(0,0,0,.65)', letterSpacing: 0}}>SEBELIMBINGAN</div>
          <div style={{marginTop: 26, fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 44, color: '#f6d9a0', textShadow: '0 3px 16px rgba(0,0,0,.7)', opacity: rise(sec, 3.4, 1)}}>Kota yang Hilang di Kotabaru</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const S2: React.FC = () => {
  const sec = useSec();
  return <MapScene sec={sec} dur={13.4} mode="loc" />;
};

export const S3: React.FC = () => {
  const sec = useSec();
  return (
    <AbsoluteFill>
      <MineScene sec={sec} dur={8.6} activity={1} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(8,8,10,${0.55 * rise(sec, 0, 0.8)}) 0%, rgba(8,8,10,0) 55%)`}} />
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 335}}>
        <div style={{opacity: rise(sec, 0.1, 0.6), fontFamily: SANS, fontWeight: 700, fontSize: 34, letterSpacing: 10, color: '#f6d9a0'}}>DIDIRIKAN</div>
        <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 260, lineHeight: 1, color: '#fff3dc', textShadow: '0 8px 40px rgba(0,0,0,.7)', opacity: rise(sec, 0.2, 0.5), transform: `scale(${1.2 - 0.2 * rise(sec, 0.2, 0.6)})`}}>1903</div>
        <div style={{marginTop: 14, textAlign: 'center', opacity: rise(sec, 1.8, 0.9), fontFamily: DISPLAY, fontWeight: 700, fontSize: 52, lineHeight: 1.15, color: '#f6d9a0', letterSpacing: 3, textShadow: '0 3px 16px rgba(0,0,0,.8)'}}>
          STEENKOLEN-<br />MAATSCHAPPIJ<br />POELOE LAOET
        </div>
        <Note op={rise(sec, 3, 0.8)} style={{marginTop: 24, fontSize: 24}}>VISUALISASI NAMA PERUSAHAAN</Note>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const S4: React.FC = () => {
  const sec = useSec();
  return (
    <AbsoluteFill>
      <RailScene sec={sec} dur={15.0} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,8,10,.55) 0%, rgba(8,8,10,0) 40%)'}} />
      <div style={{position: 'absolute', left: 60, top: 300, display: 'flex', flexDirection: 'column', gap: 20}}>
        <Chip sec={sec} at={4.0} icon="🚂">Jalur kereta api → pantai</Chip>
        <Chip sec={sec} at={8.2} icon="🛣️">Jalan ke Kotabaru</Chip>
        <Chip sec={sec} at={10.6} icon="🏚️">Bangsal pekerja</Chip>
        <Chip sec={sec} at={12.4} icon="⚕️">Balai pengobatan</Chip>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, bottom: 540}}>
        <Note op={rise(sec, 1, 0.8)}>ILUSTRASI SEJARAH — bukan rute atau lokomotif asli Sebelimbingan</Note>
      </div>
    </AbsoluteFill>
  );
};

export const S5: React.FC = () => {
  const sec = useSec();
  const n = Math.round(interpolate(sec, [5.4, 10.0], [1500, 2300], {...clamp, easing: Easing.inOut(Easing.quad)}));
  const fmt = (x: number) => x.toLocaleString('id-ID');
  const rows = 6, cols = 14;
  const shown = Math.round(interpolate(n, [1500, 2300], [rows * cols * 0.65, rows * cols], clamp));
  return (
    <AbsoluteFill>
      <MineScene sec={sec} dur={11.2} activity={1} />
      <AbsoluteFill style={{background: 'rgba(8,10,12,.62)'}} />
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 335}}>
        <Kicker style={{opacity: rise(sec, 0.3, 0.6)}}>JUMLAH TENAGA KERJA TAMBANG PULAU LAUT</Kicker>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 40, opacity: rise(sec, 4.9, 0.5)}}>
          <span style={{fontFamily: SANS, fontWeight: 700, fontSize: 40, color: '#f6d9a0'}}>±</span>
          <span style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 190, color: '#fff3dc', textShadow: '0 6px 30px rgba(0,0,0,.7)'}}>{fmt(n)}</span>
        </div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 38, letterSpacing: 6, color: '#f6d9a0', marginTop: 6}}>PEKERJA</div>
        <div style={{display: 'flex', gap: 80, marginTop: 52, fontFamily: DISPLAY, fontSize: 56, fontWeight: 700}}>
          <span style={{color: '#fff3dc', opacity: rise(sec, 1.2, 0.6)}}>1905<div style={{fontFamily: SANS, fontSize: 28, color: '#f6d9a0'}}>±1.500</div></span>
          <span style={{color: '#f6d9a0', opacity: rise(sec, 1.2, 0.6)}}>→</span>
          <span style={{color: '#fff3dc', opacity: rise(sec, 1.8, 0.6)}}>1910<div style={{fontFamily: SANS, fontSize: 28, color: '#f6d9a0'}}>±2.300</div></span>
        </div>
        <svg width={W} height={330} viewBox={`0 0 ${W} 330`} style={{marginTop: 20}}>
          {Array.from({length: rows * cols}).map((_, i) => {
            const c = i % cols, r = Math.floor(i / cols);
            const on = i < shown;
            return <g key={i} opacity={on ? 0.95 : 0.12} transform={`translate(${70 + c * 68} ${50 + r * 50})`}><circle cx={0} cy={-18} r={7} fill="#fbe6bd" /><path d="M-9 -9 L9 -9 L6 14 L-6 14 Z" fill="#fbe6bd" /></g>;
          })}
        </svg>
        <Note op={rise(sec, 2.4, 0.8)} style={{marginTop: 10, textAlign: 'center'}}>Angka dalam penelitian arkeologi (N. M. E. Fajari, 2016).<br />Bukan hitungan yang diverifikasi ulang oleh produksi video ini.</Note>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const S6: React.FC = () => {
  // 55.0-63.3: "bukan sekadar tempat menggali batu bara" + facilities (pembangkit, rumah sakit, makam, permukiman)
  const sec = useSec();
  const items = [
    ['RUMAH DIESEL', 'kompleks 8 struktur · dikaitkan dengan pembangkit listrik', '⚙️', 3.3],
    ['RUMAH SAKIT', 'jejak bangunan; jenis dan masa pakai belum terdokumentasi', '🏥', 5.0],
    ['MAKAM', 'kompleks pemakaman', '🪦', 6.3],
    ['HUNIAN', 'sisa rumah tinggal / permukiman', '🏠', 7.2],
  ] as const;
  return (
    <AbsoluteFill>
      <MineScene sec={sec} dur={8.3} activity={1} lights={1} />
      <AbsoluteFill style={{background: 'rgba(8,10,10,.55)'}} />
      <div style={{position: 'absolute', left: 54, right: 54, top: 345}}>
        <Kicker style={{marginBottom: 14, opacity: rise(sec, 0.2, 0.6)}}>BUKAN SEKADAR TEMPAT MENGGALI BATU BARA</Kicker>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18, marginTop: 30}}>
          {items.map((it, i) => {
            const p = rise(sec, it[3], 0.6);
            return (
              <div key={i} style={{opacity: p, transform: `translateX(${(1 - p) * -70}px)`, background: 'rgba(16,16,14,.78)', borderLeft: '8px solid #e6b36a', padding: '16px 24px', borderRadius: 14, display: 'flex', gap: 22, alignItems: 'center'}}>
                <span style={{fontSize: 46}}>{it[2]}</span>
                <div><div style={{fontFamily: SANS, fontWeight: 800, fontSize: 38, color: '#fbf1dc'}}>{it[0]}</div><div style={{fontFamily: SANS, fontSize: 25, color: '#d9c9ab', marginTop: 3}}>{it[1]}</div></div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{position: 'absolute', left: 54, right: 54, bottom: 540}}>
        <Note op={rise(sec, 1, 0.8)}>REKONSTRUKSI VISUAL — bukan foto atau denah asli. Sumber: N. M. E. Fajari, 2016.</Note>
      </div>
    </AbsoluteFill>
  );
};

export const S6p: React.FC = () => {
  // 63.3-66.8: pelabuhan Stagen illustration
  const sec = useSec();
  return (
    <AbsoluteFill>
      <PortScene sec={sec} dur={4} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(6,10,14,.6) 0%, rgba(6,10,14,0) 45%)'}} />
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 345}}>
        <Kicker style={{opacity: rise(sec, 0.3, 0.6)}}>PENGAPALAN BATU BARA</Kicker>
        <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 150, color: '#fff3dc', textShadow: '0 8px 36px rgba(0,0,0,.7)', opacity: rise(sec, 0.6, 0.8), letterSpacing: 6}}>STAGEN</div>
        <Note op={rise(sec, 1.2, 0.8)} style={{position: 'absolute', bottom: 540, left: 54, right: 54}}>REKONSTRUKSI VISUAL — bentuk dermaga dan kapal ilustratif; tidak menunjukkan posisi atau rupa asli</Note>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const S6b: React.FC = () => {
  const sec = useSec();
  return <MapScene sec={sec} dur={6.5} mode="stagen" />;
};

export const S7: React.FC = () => {
  // 69.8-76.8: puncak aktivitas
  const sec = useSec();
  return (
    <AbsoluteFill>
      <MineScene sec={sec} dur={7} activity={1} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,8,10,.55) 0%, rgba(8,8,10,0) 50%)'}} />
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 345}}>
        <Kicker style={{opacity: rise(sec, 0.3, 0.6)}}>TAMBANG BATU BARA PULAU LAUT</Kicker>
        <div style={{fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 54, color: '#f6d9a0', textShadow: '0 4px 20px rgba(0,0,0,.8)', marginTop: 30, opacity: rise(sec, 1.0, 0.9), textAlign: 'center', padding: '0 70px'}}>penelitian sejarah mencatat masa puncak aktivitasnya</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const S8: React.FC = () => {
  // 76.8-88.8
  const sec = useSec();
  const activity = interpolate(sec, [0, 10], [1, 0.05], clamp);
  const sat = interpolate(sec, [0, 12], [1, 0.25], clamp);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, filter: `saturate(${sat}) brightness(${interpolate(sec, [0, 12], [1, 0.8], clamp)})`}}>
        <MineScene sec={sec} dur={12} activity={activity} lights={activity} pal={PAL.smoke} />
      </div>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,8,10,.6) 0%, rgba(8,8,10,0) 50%)'}} />
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 345}}>
        <Kicker style={{opacity: rise(sec, 0.3, 0.6)}}>KEJAYAAN YANG TIDAK BERTAHAN LAMA</Kicker>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18, marginTop: 36, alignItems: 'center'}}>
          <Chip sec={sec} at={3.8} accent="#c9795a">Produktivitas menurun</Chip>
          <Chip sec={sec} at={5.7} accent="#c9795a">Perusahaan mengalami kerugian</Chip>
        </div>
        <div style={{marginTop: 46, opacity: rise(sec, 9.0, 0.8)}}>
          <span style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 110, color: '#fff3dc'}}>1930-an</span>
        </div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 34, letterSpacing: 5, color: '#f6d9a0', opacity: rise(sec, 9.2, 0.8)}}>AKTIVITAS TAMBANG BERAKHIR</div>
        <Note op={rise(sec, 9.8, 0.8)} style={{marginTop: 22, textAlign: 'center', maxWidth: 900}}>Menurut rujukan sejarah yang dikutip penelitian. Jejak aktivitas situs: 1903 – 1930-an.</Note>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const S9: React.FC = () => {
  // 88.8-101.3
  const sec = useSec();
  const items = [['Bekas rumah sakit (diduga)', 5.6], ['8 struktur kompleks rumah diesel', 7.3], ['Lorong tambang', 9.0], ['Makam', 10.3], ['Bekas kawasan permukiman', 11.2]] as const;
  return (
    <AbsoluteFill>
      <RuinsScene sec={sec} dur={12.5} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,10,10,.6) 0%, rgba(8,10,10,.1) 55%)'}} />
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 345}}>
        <Kicker style={{opacity: rise(sec, 0.3, 0.6)}}>KINI</Kicker>
        <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 70, lineHeight: 1.12, textAlign: 'center', color: '#fff3dc', textShadow: '0 5px 26px rgba(0,0,0,.8)', marginTop: 22, padding: '0 60px', opacity: rise(sec, 0.6, 0.9)}}>Sebagian besar peninggalan<br />telah runtuh atau hilang</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 30, alignItems: 'flex-start'}}>
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: '#f6d9a0', opacity: rise(sec, 3.6, 0.6)}}>PENELITIAN ARKEOLOGI MENCATAT SISA</div>
          {items.map(([t, at]) => <Chip key={t} sec={sec} at={at} accent="#9aa88f">{t}</Chip>)}
        </div>
      </AbsoluteFill>
      <div style={{position: 'absolute', left: 60, right: 60, bottom: 540}}>
        <Note op={rise(sec, 1, 0.8)}>ILUSTRASI SEJARAH — bukan dokumentasi kondisi aktual</Note>
      </div>
    </AbsoluteFill>
  );
};

export const S10: React.FC = () => {
  // 101.3-118.0
  const sec = useSec();
  const ghost = interpolate(sec, [8, 11, 15, 16.7], [0, 1, 1, 0.6], clamp);
  const words = ['RIBUAN PEKERJA', 'JALUR KERETA API', 'PEMBANGKIT LISTRIK', 'PELABUHAN'];
  const at = [10.4, 13.4, 14.6, 15.6];
  return (
    <AbsoluteFill>
      <PresentLandscape sec={sec} dur={16.7} ghost={ghost} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,8,10,.5) 0%, rgba(8,8,10,0) 50%)'}} />
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 345}}>
        <Chip sec={sec} at={0.5} accent="#9aa88f">Sebagian peninggalan rusak akibat pembukaan jalan dan pembangunan kawasan</Chip>
        <Kicker style={{marginTop: 70, opacity: rise(sec, 5.0, 0.6)}}>KAWASAN YANG KINI TENANG</Kicker>
        <div style={{marginTop: 30, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center'}}>
          {words.map((w, i) => (
            <div key={i} style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 56, color: '#fff3dc', textShadow: '0 4px 20px rgba(0,0,0,.8)', opacity: rise(sec, at[i], 0.8) * 0.95, letterSpacing: 2}}>{w}</div>
          ))}
        </div>
      </AbsoluteFill>
      <div style={{position: 'absolute', left: 60, right: 60, bottom: 540}}>
        <Note op={ghost}>REKONSTRUKSI VISUAL — siluet kawasan industri lama bersifat ilustratif</Note>
      </div>
    </AbsoluteFill>
  );
};

export const S11: React.FC = () => {
  const sec = useSec(); // starts at 118.0s
  const cta = [['LIKE', 10.3, '👍'], ['KOMENTAR', 12.5, '💬'], ['REPOST', 13.8, '🔁'], ['SHARE', 14.6, '📤'], ['FOLLOW', 17.6, '➕']] as const;
  return (
    <AbsoluteFill>
      <PresentLandscape sec={sec + 20} dur={40} ghost={0} />
      <AbsoluteFill style={{background: 'rgba(8,8,10,.55)'}} />
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 345}}>
        <div style={{fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 52, color: '#f6d9a0', textAlign: 'center', padding: '0 60px', textShadow: '0 4px 20px rgba(0,0,0,.8)', opacity: rise(sec, 0.4, 0.8) * (1 - rise(sec, 4.2, 0.6))}}>pusat industri yang pernah ramai,<br />lalu perlahan hilang dari ingatan</div>
        <div style={{position: 'absolute', top: 345, alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
          <Kicker style={{opacity: rise(sec, 4.8, 0.6)}}>INILAH SEBELIMBINGAN</Kicker>
          <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 118, lineHeight: 1.02, textAlign: 'center', color: '#fff3dc', textShadow: '0 6px 30px rgba(0,0,0,.8)', marginTop: 26, opacity: rise(sec, 6.0, 1.0)}}>KOTA YANG<br />HILANG</div>
          <div style={{fontFamily: DISPLAY, fontWeight: 700, fontSize: 52, letterSpacing: 6, color: '#f6d9a0', marginTop: 10, opacity: rise(sec, 6.6, 1.0)}}>DI KOTABARU</div>
        </div>
        <div style={{position: 'absolute', top: 960, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, padding: '0 50px', maxWidth: 1000}}>
          {cta.map(([w, a, ic]) => {
            const p = rise(sec, a, 0.45);
            return <div key={w} style={{opacity: p, transform: `scale(${0.7 + 0.3 * p})`, background: 'linear-gradient(135deg,#e6b36a,#b4673f)', color: '#1b1209', fontFamily: SANS, fontWeight: 800, fontSize: 52, padding: '14px 34px', borderRadius: 60, letterSpacing: 2, boxShadow: '0 8px 28px rgba(0,0,0,.45)'}}>{ic} {w}</div>;
          })}
        </div>
        <div style={{position: 'absolute', top: 1180, fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 44, textAlign: 'center', color: '#fbf1dc', padding: '0 80px', textShadow: '0 3px 14px rgba(0,0,0,.8)', opacity: rise(sec, 23.0, 0.9)}}>Jangan sampai sejarah daerah kita<br />hilang ditelan zaman.</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

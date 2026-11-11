import fs from 'fs';
import * as topo from 'topojson-client';
const w = JSON.parse(fs.readFileSync('node_modules/world-atlas/land-10m.json'));
const land = topo.feature(w, w.objects.land);
const [x0,y0,x1,y1] = [115.2,-4.3,117.0,-2.7];
const out = [];
for (const f of land.features) {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  for (const p of polys) {
    const ring = p[0];
    if (ring.some(([x,y]) => x>=x0&&x<=x1&&y>=y0&&y<=y1)) out.push(ring.map(([x,y])=>[+x.toFixed(4),+y.toFixed(4)]));
  }
}
console.log(out.length, out.map(r=>r.length));
fs.writeFileSync('/tmp/coast_raw.json', JSON.stringify(out));

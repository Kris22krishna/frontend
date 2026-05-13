const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const qM = (q, c, d, e, svg='') => {
  const u=Array.from(new Set(d)).filter(x=>x!==c);
  const opts=shuf([c,...u]);
  return { question:q, options:opts, correct:opts.indexOf(c), explanation:e, svg };
};

// ─── SVG HELPERS ────────────────────────────────────────────────────────────
const arrowDefs = `<defs>
  <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
    <path d="M1,1 L5,3 L1,5" fill="none" stroke="#f59e0b" stroke-width="1"/>
  </marker>
</defs>`;

const dimArrow = (x1,y1,x2,y2,label,color='#f59e0b') => {
  const mx=(x1+x2)/2, my=(y1+y2)/2;
  const dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy);
  const nx=-dy/len*12, ny=dx/len*12;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.5" marker-start="url(#arr)" marker-end="url(#arr)"/>
  <text x="${mx+nx}" y="${my+ny}" text-anchor="middle" dominant-baseline="central" font-size="11" fill="${color}" font-weight="700">${label}</text>`;
};

const tick = (x1,y1,x2,y2,n=1,color='#10b981') => {
  const mx=(x1+x2)/2, my=(y1+y2)/2, dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy);
  const nx=-dy/len*6, ny=dx/len*6; let s='';
  for(let i=0;i<n;i++){const o=(i-(n-1)/2)*5; s+=`<line x1="${mx+nx+dx/len*o}" y1="${my+ny+dy/len*o}" x2="${mx-nx+dx/len*o}" y2="${my-ny+dy/len*o}" stroke="${color}" stroke-width="2"/>`;}
  return s;
};

const rightAngleBox = (cx,cy,size=8,color='#64748b') =>
  `<rect x="${cx}" y="${cy}" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="1.5"/>`;

const svgWrap = (content) =>
  `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">${arrowDefs}${content}</svg>`;

// ─── RECTANGLE SVG ──────────────────────────────────────────────────────────
const rectSVG = (l, w) => {
  const x0=40, y0=30, rw=160, rh=110;
  return svgWrap(`
    <rect x="${x0}" y="${y0}" width="${rw}" height="${rh}" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2"/>
    <text x="${x0-6}" y="${y0-5}" font-size="11" fill="#334155" font-weight="700">A</text>
    <text x="${x0+rw+2}" y="${y0-5}" font-size="11" fill="#334155" font-weight="700">B</text>
    <text x="${x0+rw+2}" y="${y0+rh+12}" font-size="11" fill="#334155" font-weight="700">C</text>
    <text x="${x0-6}" y="${y0+rh+12}" font-size="11" fill="#334155" font-weight="700">D</text>
    ${dimArrow(x0, y0+rh+28, x0+rw, y0+rh+28, `l = ${l} cm`)}
    ${dimArrow(x0-28, y0+rh, x0-28, y0, `w = ${w} cm`)}
  `);
};

// ─── SQUARE SVG ─────────────────────────────────────────────────────────────
const squareSVG = (s) => {
  const x0=50, y0=30, sz=130;
  return svgWrap(`
    <rect x="${x0}" y="${y0}" width="${sz}" height="${sz}" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2"/>
    <text x="${x0-6}" y="${y0-5}" font-size="11" fill="#334155" font-weight="700">A</text>
    <text x="${x0+sz+2}" y="${y0-5}" font-size="11" fill="#334155" font-weight="700">B</text>
    <text x="${x0+sz+2}" y="${y0+sz+12}" font-size="11" fill="#334155" font-weight="700">C</text>
    <text x="${x0-6}" y="${y0+sz+12}" font-size="11" fill="#334155" font-weight="700">D</text>
    ${tick(x0, y0, x0+sz, y0, 1)}
    ${tick(x0+sz, y0, x0+sz, y0+sz, 1)}
    ${tick(x0, y0+sz, x0+sz, y0+sz, 1)}
    ${tick(x0, y0, x0, y0+sz, 1)}
    ${dimArrow(x0, y0+sz+25, x0+sz, y0+sz+25, `s = ${s} cm`)}
  `);
};

// ─── PARALLELOGRAM SVG ──────────────────────────────────────────────────────
const parallelogramSVG = (_b, h, showHeight=false, sideLabel='', baseLabel='') => {
  const off=30;
  const Ax=off+10, Ay=30;
  const Bx=Ax+140, By=Ay;
  const Cx=Bx+off, Cy=Ay+100;
  const Dx=Ax+off, Dy=Cy;
  const pts=`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy} ${Dx},${Dy}`;
  let extra='';
  if(showHeight){
    const hx=Bx, hy1=By, hy2=Cy;
    extra += `<line x1="${hx}" y1="${hy1}" x2="${hx}" y2="${hy2}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,3"/>`;
    extra += rightAngleBox(hx-8, hy1, 8);
    extra += `<text x="${hx+6}" y="${(hy1+hy2)/2}" font-size="11" fill="#f59e0b" font-weight="700">h=${h}</text>`;
  }
  return svgWrap(`
    <polygon points="${pts}" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2"/>
    <text x="${Ax-14}" y="${Ay+4}" font-size="11" fill="#334155" font-weight="700">A</text>
    <text x="${Bx+4}" y="${By+4}" font-size="11" fill="#334155" font-weight="700">B</text>
    <text x="${Cx+4}" y="${Cy+12}" font-size="11" fill="#334155" font-weight="700">C</text>
    <text x="${Dx-14}" y="${Dy+12}" font-size="11" fill="#334155" font-weight="700">D</text>
    ${tick(Ax, Ay, Bx, By, 1)}
    ${tick(Dx, Dy, Cx, Cy, 1)}
    ${tick(Bx, By, Cx, Cy, 2)}
    ${tick(Ax, Ay, Dx, Dy, 2)}
    ${baseLabel ? dimArrow(Dx, Dy+22, Cx, Cy+22, baseLabel) : ''}
    ${sideLabel ? dimArrow(Cx+20, Cy, Bx+20, By, sideLabel) : ''}
    ${extra}
  `);
};

// ─── RHOMBUS SVG ────────────────────────────────────────────────────────────
const rhombusSVG = (d1, d2) => {
  const cx=120, cy=105;
  const hw=75, hh=60;
  const top=`${cx},${cy-hh}`, right=`${cx+hw},${cy}`, bottom=`${cx},${cy+hh}`, left=`${cx-hw},${cy}`;
  return svgWrap(`
    <polygon points="${top} ${right} ${bottom} ${left}" fill="#fef9c3" stroke="#0ea5e9" stroke-width="2"/>
    ${tick(cx-hw, cy, cx, cy-hh, 1)}
    ${tick(cx, cy-hh, cx+hw, cy, 1)}
    ${tick(cx+hw, cy, cx, cy+hh, 1)}
    ${tick(cx, cy+hh, cx-hw, cy, 1)}
    <line x1="${cx-hw}" y1="${cy}" x2="${cx+hw}" y2="${cy}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,3"/>
    <line x1="${cx}" y1="${cy-hh}" x2="${cx}" y2="${cy+hh}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,3"/>
    ${rightAngleBox(cx, cy, 8)}
    <text x="${cx}" y="${cy-hh-8}" text-anchor="middle" font-size="11" fill="#334155" font-weight="700">A</text>
    <text x="${cx+hw+6}" y="${cy+4}" font-size="11" fill="#334155" font-weight="700">B</text>
    <text x="${cx}" y="${cy+hh+14}" text-anchor="middle" font-size="11" fill="#334155" font-weight="700">C</text>
    <text x="${cx-hw-14}" y="${cy+4}" font-size="11" fill="#334155" font-weight="700">D</text>
    <text x="${cx}" y="${cy+8}" text-anchor="middle" font-size="9" fill="#f59e0b" font-weight="700">d₁=${d1}</text>
    <text x="${cx+hw/2+8}" y="${cy-14}" font-size="9" fill="#f59e0b" font-weight="700">d₂=${d2}</text>
  `);
};

// ─── KITE SVG ───────────────────────────────────────────────────────────────
const kiteSVG = (d1, d2) => {
  const cx=120, top_y=20, mid_y=100, bot_y=195;
  const half_w=65;
  const Ax=cx, Ay=top_y;
  const Bx=cx+half_w, By=mid_y;
  const Cx=cx, Cy=bot_y;
  const Dx=cx-half_w, Dy=mid_y;
  return svgWrap(`
    <polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy} ${Dx},${Dy}" fill="#fef9c3" stroke="#0ea5e9" stroke-width="2"/>
    ${tick(Ax, Ay, Bx, By, 1)}
    ${tick(Ax, Ay, Dx, Dy, 1)}
    ${tick(Bx, By, Cx, Cy, 2)}
    ${tick(Dx, Dy, Cx, Cy, 2)}
    <line x1="${Ax}" y1="${Ay}" x2="${Cx}" y2="${Cy}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,3"/>
    <line x1="${Dx}" y1="${Dy}" x2="${Bx}" y2="${By}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,3"/>
    ${rightAngleBox(cx, mid_y, 8)}
    <text x="${Ax}" y="${Ay-8}" text-anchor="middle" font-size="11" fill="#334155" font-weight="700">A</text>
    <text x="${Bx+6}" y="${By+4}" font-size="11" fill="#334155" font-weight="700">B</text>
    <text x="${Cx}" y="${Cy+13}" text-anchor="middle" font-size="11" fill="#334155" font-weight="700">C</text>
    <text x="${Dx-14}" y="${Dy+4}" font-size="11" fill="#334155" font-weight="700">D</text>
    <text x="${cx+6}" y="${(Ay+Cy)/2}" font-size="9" fill="#f59e0b" font-weight="700">d₁=${d1}</text>
    <text x="${cx}" y="${mid_y+20}" text-anchor="middle" font-size="9" fill="#f59e0b" font-weight="700">d₂=${d2}</text>
  `);
};

// ─── TRAPEZIUM SVG ──────────────────────────────────────────────────────────
const trapeziumSVG = (a, b, h) => {
  const bot_y=165, top_y=bot_y-90;
  const bot_x0=25, bot_x1=215;
  const top_x0=bot_x0+45, top_x1=bot_x1-45;
  return svgWrap(`
    <polygon points="${top_x0},${top_y} ${top_x1},${top_y} ${bot_x1},${bot_y} ${bot_x0},${bot_y}" fill="#fce7f3" stroke="#0ea5e9" stroke-width="2"/>
    <text x="${top_x0-12}" y="${top_y-5}" font-size="11" fill="#334155" font-weight="700">A</text>
    <text x="${top_x1+4}" y="${top_y-5}" font-size="11" fill="#334155" font-weight="700">B</text>
    <text x="${bot_x1+4}" y="${bot_y+12}" font-size="11" fill="#334155" font-weight="700">C</text>
    <text x="${bot_x0-12}" y="${bot_y+12}" font-size="11" fill="#334155" font-weight="700">D</text>
    <text x="${(top_x0+top_x1)/2}" y="${top_y-7}" text-anchor="middle" font-size="10" fill="#f59e0b" font-weight="700">a = ${a} cm</text>
    <text x="${(bot_x0+bot_x1)/2}" y="${bot_y+22}" text-anchor="middle" font-size="10" fill="#f59e0b" font-weight="700">b = ${b} cm</text>
    <line x1="${top_x1+15}" y1="${top_y}" x2="${top_x1+15}" y2="${bot_y}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,3"/>
    ${rightAngleBox(top_x1+15, bot_y-8, 8)}
    <text x="${top_x1+28}" y="${(top_y+bot_y)/2}" font-size="10" fill="#f59e0b" font-weight="700">h=${h}</text>
    <text x="${(top_x0+top_x1)/2-6}" y="${top_y+10}" font-size="13" fill="#0ea5e9" font-weight="700">»</text>
    <text x="${(bot_x0+bot_x1)/2-6}" y="${bot_y-2}" font-size="13" fill="#0ea5e9" font-weight="700">»</text>
  `);
};

// ─── QUAD ANGLE SVG ─────────────────────────────────────────────────────────
const quadAngleSVG = (a1, a2, a3, a4) => {
  return svgWrap(`
    <polygon points="50,30 190,50 200,170 30,160" fill="#fce7f3" stroke="#0ea5e9" stroke-width="2"/>
    <text x="34" y="24" font-size="10" fill="#334155" font-weight="700">A</text>
    <text x="193" y="45" font-size="10" fill="#334155" font-weight="700">B</text>
    <text x="203" y="176" font-size="10" fill="#334155" font-weight="700">C</text>
    <text x="16" y="168" font-size="10" fill="#334155" font-weight="700">D</text>
    <text x="58" y="46" font-size="10" fill="#f59e0b" font-weight="700">${a1}°</text>
    <text x="175" y="66" font-size="10" fill="#f59e0b" font-weight="700">${a2}°</text>
    <text x="178" y="162" font-size="10" fill="#f59e0b" font-weight="700">${a3}°</text>
    <text x="38" y="154" font-size="10" fill="#f59e0b" font-weight="700">${a4 === '?' ? '?°' : a4+'°'}</text>
    <path d="M 60,35 A 20,20 0 0,1 75,42" fill="none" stroke="#10b981" stroke-width="1.5"/>
    <path d="M 182,56 A 20,20 0 0,1 185,72" fill="none" stroke="#10b981" stroke-width="1.5"/>
    <path d="M 185,158 A 20,20 0 0,0 170,162" fill="none" stroke="#10b981" stroke-width="1.5"/>
    <path d="M 50,152 A 20,20 0 0,0 42,140" fill="none" stroke="#10b981" stroke-width="1.5"/>
  `);
};

// ════════════════════════════════════════════════════════════════════════════
// genRectSquareP  — 20 questions on Rect/Square Perimeter & Area
// ════════════════════════════════════════════════════════════════════════════
export const genRectSquareP = () => {
  const qs = [];
  for (let i = 0; i < 20; i++) {
    if (i % 4 === 0) {
      // Rectangle area
      const l = R(3, 15), w = R(2, 10);
      const a = l * w;
      const svg = rectSVG(l, w);
      qs.push(qM(
        `Find the area of a rectangle with length ${l} cm and width ${w} cm.`,
        `${a} cm²`,
        [`${2*(l+w)} cm²`, `${a+l} cm²`, `${l+w} cm²`],
        `Area = l × w = ${l} × ${w} = ${a} cm².`,
        svg
      ));
    } else if (i % 4 === 1) {
      // Rectangle perimeter
      const l = R(3, 15), w = R(2, 10);
      const p = 2 * (l + w);
      const svg = rectSVG(l, w);
      qs.push(qM(
        `Find the perimeter of a rectangle with length ${l} cm and width ${w} cm.`,
        `${p} cm`,
        [`${l * w} cm`, `${p + 2} cm`, `${l + w} cm`],
        `Perimeter = 2(l + w) = 2(${l} + ${w}) = ${p} cm.`,
        svg
      ));
    } else if (i % 4 === 2) {
      // Square area
      const s = R(3, 14);
      const a = s * s;
      const svg = squareSVG(s);
      qs.push(qM(
        `Find the area of a square with side ${s} cm.`,
        `${a} cm²`,
        [`${4 * s} cm²`, `${a + s} cm²`, `${2 * s * s} cm²`],
        `Area = s² = ${s}² = ${a} cm².`,
        svg
      ));
    } else {
      // Square perimeter
      const s = R(3, 14);
      const p = 4 * s;
      const svg = squareSVG(s);
      qs.push(qM(
        `Find the perimeter of a square with side ${s} cm.`,
        `${p} cm`,
        [`${s * s} cm`, `${p + 4} cm`, `${2 * s} cm`],
        `Perimeter = 4s = 4 × ${s} = ${p} cm.`,
        svg
      ));
    }
  }
  return qs;
};
export const genRectSquareA = () => genRectSquareP().slice(0, 15);

// ════════════════════════════════════════════════════════════════════════════
// genParallelogramP  — 20 questions on Parallelogram Perimeter & Area
// ════════════════════════════════════════════════════════════════════════════
export const genParallelogramP = () => {
  const qs = [];
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      // Area
      const b = R(4, 14), h = R(3, 12);
      const a = b * h;
      const svg = parallelogramSVG(b, h, true, '', `b = ${b} cm`);
      qs.push(qM(
        `Find the area of a parallelogram with base ${b} cm and perpendicular height ${h} cm.`,
        `${a} cm²`,
        [`${2*(b+h)} cm²`, `${a + b} cm²`, `${b * h / 2} cm²`],
        `Area = base × height = ${b} × ${h} = ${a} cm².`,
        svg
      ));
    } else {
      // Perimeter
      const a = R(4, 12), b = R(3, 10);
      const p = 2 * (a + b);
      const svg = parallelogramSVG(a, b, false, `s = ${b} cm`, `b = ${a} cm`);
      qs.push(qM(
        `Find the perimeter of a parallelogram with sides ${a} cm and ${b} cm.`,
        `${p} cm`,
        [`${a * b} cm`, `${p + 2} cm`, `${a + b} cm`],
        `Perimeter = 2(a + b) = 2(${a} + ${b}) = ${p} cm.`,
        svg
      ));
    }
  }
  return qs;
};
export const genParallelogramA = () => genParallelogramP().slice(0, 15);

// ════════════════════════════════════════════════════════════════════════════
// genRhombusKiteP  — 20 questions on Rhombus & Kite Perimeter & Area
// ════════════════════════════════════════════════════════════════════════════
export const genRhombusKiteP = () => {
  const qs = [];
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      // Area question
      const d1 = R(4, 14), d2 = R(3, 12);
      const a = (d1 * d2) / 2;
      const isRhombus = i % 4 === 0;
      const shape = isRhombus ? 'rhombus' : 'kite';
      const svg = isRhombus ? rhombusSVG(d1, d2) : kiteSVG(d1, d2);
      qs.push(qM(
        `Find the area of a ${shape} with diagonals ${d1} cm and ${d2} cm.`,
        `${a} cm²`,
        [`${d1 * d2} cm²`, `${a + d1} cm²`, `${d1 + d2} cm²`],
        `Area = (d₁ × d₂) / 2 = (${d1} × ${d2}) / 2 = ${a} cm².`,
        svg
      ));
    } else {
      // Perimeter of rhombus
      const s = R(3, 12);
      const p = 4 * s;
      const d1 = R(4, 14), d2 = R(3, 12);
      const svg = rhombusSVG(d1, d2);
      qs.push(qM(
        `Find the perimeter of a rhombus with each side ${s} cm.`,
        `${p} cm`,
        [`${s * s} cm`, `${p + 4} cm`, `${2 * s} cm`],
        `Perimeter = 4s = 4 × ${s} = ${p} cm (all sides equal).`,
        svg
      ));
    }
  }
  return qs;
};
export const genRhombusKiteA = () => genRhombusKiteP().slice(0, 15);

// ════════════════════════════════════════════════════════════════════════════
// genTrapeziumP  — 20 questions on Trapezium Area & Quad Angle Sum
// ════════════════════════════════════════════════════════════════════════════
export const genTrapeziumP = () => {
  const qs = [];
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      // Trapezium area
      const a = R(4, 14), b = R(2, a - 1), h = R(3, 10);
      const area = parseFloat(((a + b) / 2 * h).toFixed(2));
      const svg = trapeziumSVG(a, b, h);
      qs.push(qM(
        `Find the area of a trapezium with parallel sides ${a} cm and ${b} cm, and height ${h} cm.`,
        `${area} cm²`,
        [`${(a + b) * h} cm²`, `${area + h} cm²`, `${parseFloat(((a - b) / 2 * h).toFixed(2))} cm²`],
        `Area = ½(a + b)h = ½(${a} + ${b}) × ${h} = ${area} cm².`,
        svg
      ));
    } else {
      // Quadrilateral angle sum
      const a1 = R(60, 80), a2 = R(100, 120);
      const a3 = 85;
      const a4 = 360 - a1 - a2 - a3;
      const svg = quadAngleSVG(a1, a2, a3, '?');
      qs.push(qM(
        `Three angles of a quadrilateral are ${a1}°, ${a2}°, and ${a3}°. Find the fourth angle.`,
        `${a4}°`,
        [`${360 - a1 - a2}°`, `${180 - a1}°`, `${360 - a1 - a3}°`],
        `Sum of quadrilateral angles = 360°. Fourth = 360 − ${a1} − ${a2} − ${a3} = ${a4}°.`,
        svg
      ));
    }
  }
  return qs;
};
export const genTrapeziumA = () => genTrapeziumP().slice(0, 15);

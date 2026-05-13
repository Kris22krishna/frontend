const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const qM = (q, c, d, e, svg) => {
  const u = Array.from(new Set(d)).filter(x => x !== c);
  const opts = shuf([c, ...u]);
  return { question: q, options: opts, correct: opts.indexOf(c), explanation: e, svg: svg || '' };
};

/* ─── SVG HELPERS ─────────────────────────────────────────────── */

const rectSVG = (l_val, w_val, mode) => {
  // mode: 'perimeter' | 'area' | 'findW'
  const fill = mode === 'area' ? 'rgba(14,165,233,0.08)' : 'none';
  const strokeW = mode === 'perimeter' ? 3 : 2;
  const dash = mode === 'perimeter' ? '' : '';
  const rx = 40, ry = 50, rw = 140, rh = 90;
  const cx = rx + rw / 2, cy = ry + rh / 2;
  const wLabel = mode === 'findW' ? '?' : `${w_val} cm`;
  return `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="${fill}" stroke="#0ea5e9" stroke-width="${strokeW}" ${dash}/>
    <!-- bottom arrow -->
    <line x1="${rx+6}" y1="${ry+rh+22}" x2="${rx+rw-6}" y2="${ry+rh+22}" stroke="#f59e0b" stroke-width="1.5" marker-start="url(#arr)" marker-end="url(#arr)"/>
    <text x="${cx}" y="${ry+rh+38}" text-anchor="middle" font-size="13" fill="#f59e0b" font-weight="700">l = ${l_val} cm</text>
    <!-- left arrow -->
    <line x1="${rx-22}" y1="${ry+6}" x2="${rx-22}" y2="${ry+rh-6}" stroke="#f59e0b" stroke-width="1.5" marker-start="url(#arr)" marker-end="url(#arr)"/>
    <text x="${rx-36}" y="${cy+5}" text-anchor="middle" font-size="13" fill="#f59e0b" font-weight="700" transform="rotate(-90,${rx-36},${cy})">${wLabel}</text>
    ${mode === 'area' ? `<text x="${cx}" y="${cy+5}" text-anchor="middle" font-size="11" fill="#10b981" font-weight="600">Area</text>` : ''}
    <defs>
      <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#f59e0b"/>
      </marker>
    </defs>
  </svg>`;
};

const triSVG = (b_val, h_val, findHeight) => {
  const ax = 120, ay = 30;
  const bx = 40,  by = 170;
  const cx = 200, cy = 170;
  const footX = ax, footY = by; // height foot on base (directly below apex)
  const hLabel = findHeight ? '?' : `${h_val} cm`;
  return `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">
    <!-- triangle -->
    <polygon points="${ax},${ay} ${bx},${by} ${cx},${cy}" fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" stroke-width="2"/>
    <!-- height dashed line -->
    <line x1="${footX}" y1="${ay}" x2="${footX}" y2="${footY}" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="5,3"/>
    <!-- right-angle box -->
    <rect x="${footX}" y="${footY-10}" width="10" height="10" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
    <!-- base label -->
    <text x="${(bx+cx)/2}" y="${by+18}" text-anchor="middle" font-size="13" fill="#f59e0b" font-weight="700">b = ${b_val} cm</text>
    <!-- height label -->
    <text x="${footX+14}" y="${(ay+footY)/2+5}" text-anchor="start" font-size="13" fill="#f59e0b" font-weight="700">h = ${hLabel}</text>
    <!-- vertex labels -->
    <text x="${ax}" y="${ay-6}" text-anchor="middle" font-size="11" fill="#0ea5e9" font-weight="600">A</text>
    <text x="${bx-10}" y="${by+4}" text-anchor="middle" font-size="11" fill="#0ea5e9" font-weight="600">B</text>
    <text x="${cx+10}" y="${cy+4}" text-anchor="middle" font-size="11" fill="#0ea5e9" font-weight="600">C</text>
  </svg>`;
};

const circleSVG = (r_val, mode) => {
  // mode: 'area' | 'circumference'
  const fill = mode === 'area' ? 'rgba(14,165,233,0.08)' : 'none';
  const ocx = 120, ocy = 105, cr = 75;
  return `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${ocx}" cy="${ocy}" r="${cr}" fill="${fill}" stroke="#0ea5e9" stroke-width="2"/>
    <!-- radius line -->
    <line x1="${ocx}" y1="${ocy}" x2="${ocx+cr}" y2="${ocy}" stroke="#f59e0b" stroke-width="2"/>
    <!-- center dot -->
    <circle cx="${ocx}" cy="${ocy}" r="3" fill="#0ea5e9"/>
    <text x="${ocx+4}" y="${ocy-6}" text-anchor="start" font-size="11" fill="#0ea5e9" font-weight="600">O</text>
    <!-- radius label -->
    <text x="${ocx+cr/2}" y="${ocy-8}" text-anchor="middle" font-size="13" fill="#f59e0b" font-weight="700">r = ${r_val} cm</text>
    ${mode === 'area'
      ? `<text x="${ocx}" y="${ocy+16}" text-anchor="middle" font-size="11" fill="#10b981" font-weight="600">Area</text>`
      : `<path d="M ${ocx+cr} ${ocy} A ${cr} ${cr} 0 0 0 ${ocx} ${ocy-cr}" fill="none" stroke="#10b981" stroke-width="2.5" stroke-dasharray="6,3"/>`
    }
  </svg>`;
};

const cuboidSVG = (l_val, w_val, h_val) => {
  const fx=60, fy=80, fw=100, fh=80, skew=40;
  return `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">
    <!-- front face -->
    <rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" stroke-width="2"/>
    <!-- top face -->
    <polygon points="${fx},${fy} ${fx+skew},${fy-skew/2} ${fx+fw+skew},${fy-skew/2} ${fx+fw},${fy}" fill="rgba(14,165,233,0.14)" stroke="#0ea5e9" stroke-width="2"/>
    <!-- right face -->
    <polygon points="${fx+fw},${fy} ${fx+fw+skew},${fy-skew/2} ${fx+fw+skew},${fy+fh-skew/2} ${fx+fw},${fy+fh}" fill="rgba(14,165,233,0.05)" stroke="#0ea5e9" stroke-width="2"/>
    <!-- labels -->
    <text x="${fx+fw/2}" y="${fy+fh+16}" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">l = ${l_val} cm</text>
    <text x="${fx-14}" y="${fy+fh/2}" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700" transform="rotate(-90,${fx-14},${fy+fh/2})">h = ${h_val} cm</text>
    <text x="${fx+fw+skew/2+16}" y="${fy-skew/4}" text-anchor="start" font-size="12" fill="#f59e0b" font-weight="700">w = ${w_val} cm</text>
  </svg>`;
};

/* ─── GENERATORS ──────────────────────────────────────────────── */

export const genRectangleP = () => {
  const qs = [];
  for (let i = 0; i < 20; i++) {
    const l = R(4, 20), w = R(2, 12), type = i % 3;
    if (type === 0) {
      const p = 2 * (l + w);
      const svg = rectSVG(l, w, 'perimeter');
      qs.push(qM(
        `Find the perimeter of a rectangle with length ${l} cm and width ${w} cm.`,
        `${p} cm`,
        [`${l + w} cm`, `${p + 4} cm`, `${l * w} cm`],
        `P = 2(l+w) = 2(${l}+${w}) = ${p} cm.`,
        svg
      ));
    } else if (type === 1) {
      const a = l * w;
      const svg = rectSVG(l, w, 'area');
      qs.push(qM(
        `Find the area of a rectangle with length ${l} cm and width ${w} cm.`,
        `${a} cm²`,
        [`${2 * (l + w)} cm²`, `${a + l} cm²`, `${a - w} cm²`],
        `A = l × w = ${l} × ${w} = ${a} cm².`,
        svg
      ));
    } else {
      const a = l * w;
      const svg = rectSVG(l, w, 'findW');
      qs.push(qM(
        `A rectangle has area ${a} cm² and length ${l} cm. Find its width.`,
        `${w} cm`,
        [`${w + 3} cm`, `${l} cm`, `${a - l} cm`],
        `w = A/l = ${a}/${l} = ${w} cm.`,
        svg
      ));
    }
  }
  return qs;
};
export const genRectangleA = () => genRectangleP().slice(0, 15);

export const genTriAreaP = () => {
  const qs = [];
  for (let i = 0; i < 20; i++) {
    const b = R(4, 20) * 2, h = R(3, 15) * 2, area = (b * h) / 2, type = i % 2;
    if (type === 0) {
      const svg = triSVG(b, h, false);
      qs.push(qM(
        `Find the area of a triangle with base ${b} cm and height ${h} cm.`,
        `${area} cm²`,
        [`${b * h} cm²`, `${area + 8} cm²`, `${b + h} cm²`],
        `A = ½ × b × h = ½ × ${b} × ${h} = ${area} cm².`,
        svg
      ));
    } else {
      const svg = triSVG(b, h, true);
      qs.push(qM(
        `A triangle has area ${area} cm² and base ${b} cm. Find its height.`,
        `${h} cm`,
        [`${h + 4} cm`, `${h - 2} cm`, `${b} cm`],
        `h = 2A/b = 2×${area}/${b} = ${h} cm.`,
        svg
      ));
    }
  }
  return qs;
};
export const genTriAreaA = () => genTriAreaP().slice(0, 15);

export const genCircleP = () => {
  const qs = [];
  for (let i = 0; i < 20; i++) {
    const r = R(2, 14), pi = 3.14, type = i % 2;
    if (type === 0) {
      const a = parseFloat((pi * r * r).toFixed(2));
      const svg = circleSVG(r, 'area');
      qs.push(qM(
        `Find the area of a circle with radius ${r} cm. (π=3.14)`,
        `${a} cm²`,
        [`${(2 * pi * r).toFixed(2)} cm²`, `${(a + 10).toFixed(2)} cm²`, `${(pi * r).toFixed(2)} cm²`],
        `A = πr² = 3.14 × ${r * r} = ${a} cm².`,
        svg
      ));
    } else {
      const c = parseFloat((2 * pi * r).toFixed(2));
      const svg = circleSVG(r, 'circumference');
      qs.push(qM(
        `Find the circumference of a circle with radius ${r} cm. (π=3.14)`,
        `${c} cm`,
        [`${(pi * r * r).toFixed(2)} cm`, `${(c + pi).toFixed(2)} cm`, `${(pi * r).toFixed(2)} cm`],
        `C = 2πr = 2×3.14×${r} = ${c} cm.`,
        svg
      ));
    }
  }
  return qs;
};
export const genCircleA = () => genCircleP().slice(0, 15);

export const genCuboidP = () => {
  const qs = [];
  for (let i = 0; i < 20; i++) {
    const l = R(3, 10), w = R(2, 8), h = R(2, 8), type = i % 2;
    if (type === 0) {
      const v = l * w * h;
      const svg = cuboidSVG(l, w, h);
      qs.push(qM(
        `Find the volume of a cuboid with l=${l} cm, w=${w} cm, h=${h} cm.`,
        `${v} cm³`,
        [`${2 * (l * w + l * h + w * h)} cm³`, `${v + l} cm³`, `${l + w + h} cm³`],
        `V = l×w×h = ${l}×${w}×${h} = ${v} cm³.`,
        svg
      ));
    } else {
      const sa = 2 * (l * w + l * h + w * h);
      const svg = cuboidSVG(l, w, h);
      qs.push(qM(
        `Find the surface area of a cuboid with l=${l} cm, w=${w} cm, h=${h} cm.`,
        `${sa} cm²`,
        [`${l * w * h} cm²`, `${sa + 10} cm²`, `${2 * (l + w + h)} cm²`],
        `SA = 2(lw+lh+wh) = 2(${l * w}+${l * h}+${w * h}) = ${sa} cm².`,
        svg
      ));
    }
  }
  return qs;
};
export const genCuboidA = () => genCuboidP().slice(0, 15);

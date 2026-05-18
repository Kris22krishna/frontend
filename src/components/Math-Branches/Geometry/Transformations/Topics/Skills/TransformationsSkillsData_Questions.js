const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const qM = (q, c, d, e, svg) => {
  const u = Array.from(new Set(d)).filter(x => x !== c);
  const opts = shuf([c, ...u]);
  return { question: q, options: opts, correct: opts.indexOf(c), explanation: e, svg: svg || '' };
};

// ─── SVG helpers ─────────────────────────────────────────────────────────────
const SCALE = 20;
const OX = 120;
const OY = 110;

const grid = () => {
  let s = '';
  for (let i = -6; i <= 6; i++) {
    s += `<line x1="${OX + i * SCALE}" y1="10" x2="${OX + i * SCALE}" y2="210" stroke="#e2e8f0" stroke-width="0.8"/>`;
    s += `<line x1="10" y1="${OY + i * SCALE}" x2="230" y2="${OY + i * SCALE}" stroke="#e2e8f0" stroke-width="0.8"/>`;
  }
  s += `<line x1="10" y1="${OY}" x2="230" y2="${OY}" stroke="#94a3b8" stroke-width="1.5"/>`;
  s += `<line x1="${OX}" y1="10" x2="${OX}" y2="210" stroke="#94a3b8" stroke-width="1.5"/>`;
  s += `<text x="228" y="${OY - 4}" font-size="11" fill="#94a3b8" font-weight="700">x</text>`;
  s += `<text x="${OX + 4}" y="14" font-size="11" fill="#94a3b8" font-weight="700">y</text>`;
  return s;
};

const toSVG = (x, y) => [OX + x * SCALE, OY - y * SCALE];

const dot = (cx, cy, label, color = '#0ea5e9', size = 5) =>
  `<circle cx="${cx}" cy="${cy}" r="${size}" fill="${color}"/>` +
  `<text x="${cx + 7}" y="${cy - 5}" font-size="11" fill="${color}" font-weight="700">${label}</text>`;

const arrowMarker = (id, color) =>
  `<defs><marker id="${id}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">` +
  `<path d="M0,0 L0,6 L8,3 z" fill="${color}"/>` +
  `</marker></defs>`;

const svgWrap = (inner) =>
  `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// Clamp SVG coordinate to visible range (10–230 for x, 10–210 for y)
const clamp = (val, lo, hi) => Math.max(lo, Math.min(hi, val));

// ─── Translation SVG ─────────────────────────────────────────────────────────
const translationSVG = (x, y, a, b) => {
  const [ax, ay] = toSVG(x, y);
  const [bx, by] = toSVG(x + a, y + b);
  const cax = clamp(ax, 14, 226);
  const cay = clamp(ay, 14, 206);
  const cbx = clamp(bx, 14, 226);
  const cby = clamp(by, 14, 206);
  const inner =
    arrowMarker('arr-t', '#94a3b8') +
    grid() +
    // arrow from A to A'
    `<line x1="${cax}" y1="${cay}" x2="${cbx}" y2="${cby}" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#arr-t)"/>` +
    // vector label near midpoint
    `<text x="${(cax + cbx) / 2 + 4}" y="${(cay + cby) / 2 - 5}" font-size="10" fill="#94a3b8">(${a}, ${b})</text>` +
    dot(cax, cay, `A(${x},${y})`, '#0ea5e9') +
    dot(cbx, cby, `A'(${x + a},${y + b})`, '#f59e0b');
  return svgWrap(inner);
};

// ─── Reflection SVG ──────────────────────────────────────────────────────────
const reflectionSVG = (x, y, axisLabel, nx, ny) => {
  const [px, py] = toSVG(x, y);
  const [qx, qy] = toSVG(nx, ny);
  const cpx = clamp(px, 14, 226);
  const cpy = clamp(py, 14, 206);
  const cqx = clamp(qx, 14, 226);
  const cqy = clamp(qy, 14, 206);

  let mirrorLine = '';
  if (axisLabel === 'x-axis') {
    mirrorLine = `<line x1="10" y1="${OY}" x2="230" y2="${OY}" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.6"/>`;
  } else if (axisLabel === 'y-axis') {
    mirrorLine = `<line x1="${OX}" y1="10" x2="${OX}" y2="210" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.6"/>`;
  } else if (axisLabel === 'y = x') {
    mirrorLine = `<line x1="10" y1="${OY + (OX - 10)}" x2="230" y2="${OY - (230 - OX)}" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.6"/>`;
  } else if (axisLabel === 'y = −x') {
    mirrorLine = `<line x1="10" y1="${OY - (OX - 10)}" x2="230" y2="${OY + (230 - OX)}" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.6"/>`;
  }

  const inner =
    grid() +
    mirrorLine +
    // dashed perpendicular connecting P and P'
    `<line x1="${cpx}" y1="${cpy}" x2="${cqx}" y2="${cqy}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 2"/>` +
    dot(cpx, cpy, `P(${x},${y})`, '#0ea5e9') +
    dot(cqx, cqy, `P'(${nx},${ny})`, '#f59e0b');
  return svgWrap(inner);
};

// ─── Rotation SVG ────────────────────────────────────────────────────────────
const rotationSVG = (x, y, nx, ny, angleLabel) => {
  const [px, py] = toSVG(x, y);
  const [qx, qy] = toSVG(nx, ny);
  const cpx = clamp(px, 14, 226);
  const cpy = clamp(py, 14, 206);
  const cqx = clamp(qx, 14, 226);
  const cqy = clamp(qy, 14, 206);

  // radius of arc (distance from origin to point in SVG units)
  const rx = Math.hypot(cpx - OX, cpy - OY);
  const ry = Math.hypot(cqx - OX, cqy - OY);
  const r = Math.max((rx + ry) / 2, 18);

  const startAngle = Math.atan2(cpy - OY, cpx - OX);
  const endAngle = Math.atan2(cqy - OY, cqx - OX);

  // arc path
  const startX = OX + r * Math.cos(startAngle);
  const startY = OY + r * Math.sin(startAngle);
  const endX = OX + r * Math.cos(endAngle);
  const endY = OY + r * Math.sin(endAngle);

  // Choose sweep to match rotation direction
  let sweep = 1;
  if (angleLabel.includes('anticlockwise')) sweep = 0;

  const arcPath =
    `<path d="M ${startX.toFixed(1)} ${startY.toFixed(1)} A ${r.toFixed(1)} ${r.toFixed(1)} 0 0 ${sweep} ${endX.toFixed(1)} ${endY.toFixed(1)}" ` +
    `fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3"/>`;

  // label near arc midpoint
  const midAngle = (startAngle + endAngle) / 2;
  const lx = (OX + (r + 12) * Math.cos(midAngle)).toFixed(1);
  const ly = (OY + (r + 12) * Math.sin(midAngle)).toFixed(1);

  const inner =
    grid() +
    arcPath +
    `<text x="${lx}" y="${ly}" font-size="10" fill="#94a3b8" text-anchor="middle">${angleLabel}</text>` +
    dot(cpx, cpy, `(${x},${y})`, '#0ea5e9') +
    dot(cqx, cqy, `(${nx},${ny})`, '#f59e0b');
  return svgWrap(inner);
};

// ─── Dilation SVG ────────────────────────────────────────────────────────────
const dilationSVG = (x, y, k, nx, ny) => {
  const [ox, oy] = toSVG(0, 0);
  const [px, py] = toSVG(x, y);
  const [qx, qy] = toSVG(nx, ny);
  const cpx = clamp(px, 14, 226);
  const cpy = clamp(py, 14, 206);
  const cqx = clamp(qx, 14, 226);
  const cqy = clamp(qy, 14, 206);

  const inner =
    arrowMarker('arr-d', '#94a3b8') +
    grid() +
    // line from origin through point to image
    `<line x1="${ox}" y1="${oy}" x2="${cqx}" y2="${cqy}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" marker-end="url(#arr-d)"/>` +
    // k label near midpoint of origin→image
    `<text x="${(ox + cqx) / 2 + 4}" y="${(oy + cqy) / 2 - 5}" font-size="10" fill="#94a3b8">k=${k}</text>` +
    // origin dot
    `<circle cx="${ox}" cy="${oy}" r="4" fill="#64748b"/>` +
    `<text x="${ox + 5}" y="${oy - 5}" font-size="10" fill="#64748b" font-weight="700">O</text>` +
    dot(cpx, cpy, `(${x},${y})`, '#0ea5e9') +
    dot(cqx, cqy, `(${nx},${ny})`, '#f59e0b');
  return svgWrap(inner);
};

// ─── Exports ──────────────────────────────────────────────────────────────────

export const genTranslationP = () => {
  const qs = [];
  for (let i = 0; i < 20; i++) {
    const x = R(-5, 5), y = R(-5, 5), a = R(-5, 5) || 1, b = R(-5, 5) || 1;
    const nx = x + a, ny = y + b;
    const ans = `(${nx}, ${ny})`;
    const svg = translationSVG(x, y, a, b);
    qs.push(qM(
      `Translate point A(${x}, ${y}) by vector (${a}, ${b}). What are the coordinates of the image A'?`,
      ans,
      [`(${x - a}, ${y - b})`, `(${x + b}, ${y + a})`, `(${nx + 1}, ${ny})`, `(${nx}, ${ny - 1})`],
      `Add vector components to each coordinate: (${x}+${a}, ${y}+${b}) = (${nx}, ${ny}).`,
      svg
    ));
  }
  return qs;
};

export const genTranslationA = () => genTranslationP().slice(0, 15);

export const genReflectionP = () => {
  const qs = [];
  const axes = [
    { label: 'x-axis',  rule: (x, y) => [x, -y],  desc: 'Reflect in x-axis: (x, y) → (x, −y)' },
    { label: 'y-axis',  rule: (x, y) => [-x, y],  desc: 'Reflect in y-axis: (x, y) → (−x, y)' },
    { label: 'y = x',   rule: (x, y) => [y, x],   desc: 'Reflect in y = x: (x, y) → (y, x)' },
    { label: 'y = −x',  rule: (x, y) => [-y, -x], desc: 'Reflect in y = −x: (x, y) → (−y, −x)' },
  ];
  for (let i = 0; i < 20; i++) {
    const x = R(-5, 5) || 1, y = R(-5, 5) || 2;
    const ax = axes[i % axes.length];
    const [nx, ny] = ax.rule(x, y);
    const ans = `(${nx}, ${ny})`;
    const svg = reflectionSVG(x, y, ax.label, nx, ny);
    qs.push(qM(
      `Reflect point P(${x}, ${y}) in the ${ax.label}. What are the coordinates of image P'?`,
      ans,
      [`(${-nx}, ${-ny})`, `(${ny}, ${nx})`, `(${nx + 1}, ${ny})`, `(${nx}, ${ny + 1})`],
      `${ax.desc}. So P(${x}, ${y}) → P'(${nx}, ${ny}).`,
      svg
    ));
  }
  return qs;
};

export const genReflectionA = () => genReflectionP().slice(0, 15);

export const genRotationP = () => {
  const qs = [];
  const rots = [
    { angle: '90° anticlockwise', rule: (x, y) => [-y, x],  desc: '90° anticlockwise: (x, y) → (−y, x)' },
    { angle: '180°',              rule: (x, y) => [-x, -y], desc: '180°: (x, y) → (−x, −y)' },
    { angle: '90° clockwise',     rule: (x, y) => [y, -x],  desc: '90° clockwise: (x, y) → (y, −x)' },
  ];
  for (let i = 0; i < 20; i++) {
    const x = R(-5, 5) || 1, y = R(-5, 5) || 2;
    const rot = rots[i % rots.length];
    const [nx, ny] = rot.rule(x, y);
    const ans = `(${nx}, ${ny})`;
    const svg = rotationSVG(x, y, nx, ny, rot.angle);
    qs.push(qM(
      `Rotate point (${x}, ${y}) by ${rot.angle} about the origin. What are the coordinates of the image?`,
      ans,
      [`(${-nx}, ${ny})`, `(${nx}, ${-ny})`, `(${-ny}, ${-nx})`, `(${ny}, ${nx})`],
      `${rot.desc}. So (${x}, ${y}) → (${nx}, ${ny}).`,
      svg
    ));
  }
  return qs;
};

export const genRotationA = () => genRotationP().slice(0, 15);

export const genDilationP = () => {
  const qs = [];
  const factors = [2, 3, 0.5, 4];
  for (let i = 0; i < 20; i++) {
    const x = R(1, 5), y = R(1, 5);
    const k = factors[i % factors.length];
    const nx = k * x, ny = k * y;
    const ans = `(${nx}, ${ny})`;
    const type = i % 2 === 0 ? 'coordinates' : 'scale';
    if (type === 'coordinates') {
      const svg = dilationSVG(x, y, k, nx, ny);
      qs.push(qM(
        `Dilate point (${x}, ${y}) by scale factor ${k} from the origin. What are the coordinates of the image?`,
        ans,
        [`(${x + k}, ${y + k})`, `(${nx + 1}, ${ny})`, `(${ny}, ${nx})`, `(${nx - 1}, ${ny})`],
        `Multiply each coordinate by k = ${k}: (${k} × ${x}, ${k} × ${y}) = (${nx}, ${ny}).`,
        svg
      ));
    } else {
      const d1 = Math.sqrt(x * x + y * y).toFixed(2);
      const d2 = (k * Math.sqrt(x * x + y * y)).toFixed(2);
      const svg = dilationSVG(x, y, k, nx, ny);
      qs.push(qM(
        `A point is at distance ${d1} units from the origin. After dilation by scale factor ${k}, its distance from the origin is:`,
        `${d2} units`,
        [`${d1} units`, `${(parseFloat(d1) + k).toFixed(2)} units`, `${(parseFloat(d1) * k + 1).toFixed(2)} units`, `${(parseFloat(d1) / k).toFixed(2)} units`],
        `Dilation multiplies all distances from the centre by k = ${k}. New distance = ${k} × ${d1} = ${d2}.`,
        svg
      ));
    }
  }
  return qs;
};

export const genDilationA = () => genDilationP().slice(0, 15);

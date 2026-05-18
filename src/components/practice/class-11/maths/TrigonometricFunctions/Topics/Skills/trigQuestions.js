// TrigonometricFunctions — Dynamic Question Generators
// 6 Skills × (20 practice + 20 assessment) = 240 questions

const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[R(0, arr.length - 1)];

function makeQ(question, correctVal, distractors, explanation, svg = '') {
  const opts = [String(correctVal)];
  for (const d of distractors) {
    const s = String(d);
    if (!opts.includes(s)) opts.push(s);
  }
  let fc = 1;
  while (opts.length < 4) {
    const fb = `Option ${String.fromCharCode(64 + opts.length + 1)}`;
    if (!opts.includes(fb)) opts.push(fb);
    fc++;
  }
  const final = opts.slice(0, 4);
  const shuffled = [...final];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return { question, options: shuffled, correct: shuffled.indexOf(final[0]), explanation, svg };
}

// ─── SVG HELPERS ─────────────────────────────────────────────────────────────
function unitCircleSVG(angleDeg, extraLabel = '') {
  const rad = (angleDeg * Math.PI) / 180;
  const px = (90 * Math.cos(rad)).toFixed(1);
  const py = (-90 * Math.sin(rad)).toFixed(1);
  const lx = parseFloat(px) > 0 ? parseFloat(px) + 8 : parseFloat(px) - 65;
  const ly = parseFloat(py) > 0 ? parseFloat(py) + 14 : parseFloat(py) - 6;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-115 -115 230 230" width="200" height="200" style="max-width:200px;display:block;margin:8px auto;border-radius:12px;background:#f8fafc;">
    <circle cx="0" cy="0" r="90" stroke="#cbd5e1" fill="#fff" stroke-width="1.5"/>
    <line x1="-105" y1="0" x2="105" y2="0" stroke="#94a3b8" stroke-width="1"/>
    <line x1="0" y1="-105" x2="0" y2="105" stroke="#94a3b8" stroke-width="1"/>
    <line x1="${px}" y1="0" x2="${px}" y2="${py}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4,3"/>
    <line x1="0" y1="${py}" x2="${px}" y2="${py}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4,3"/>
    <line x1="0" y1="0" x2="${px}" y2="${py}" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="${px}" cy="${py}" r="5" fill="#6366f1"/>
    <text x="97" y="5" font-size="11" fill="#64748b" font-family="sans-serif">x</text>
    <text x="-7" y="-98" font-size="11" fill="#64748b" font-family="sans-serif">y</text>
    <text x="5" y="-4" font-size="10" fill="#475569" font-family="sans-serif">O</text>
    <text x="22" y="-7" font-size="12" fill="#ef4444" font-family="sans-serif" font-weight="bold">${angleDeg}°</text>
    ${extraLabel ? `<text x="${lx}" y="${ly}" font-size="11" fill="#6366f1" font-family="sans-serif" font-weight="bold">${extraLabel}</text>` : ''}
  </svg>`;
}

function rightTriangleSVG(opp, adj, hyp, theta = 'θ') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180" width="260" height="180" style="max-width:260px;display:block;margin:8px auto;border-radius:12px;background:#f8fafc;">
    <polygon points="20,150 220,150 220,30" fill="#f0f9ff" stroke="#6366f1" stroke-width="2"/>
    <rect x="207" y="137" width="13" height="13" fill="none" stroke="#6366f1" stroke-width="1.5"/>
    <text x="118" y="170" text-anchor="middle" font-size="13" fill="#0f172a" font-family="sans-serif" font-weight="600">adj = ${adj}</text>
    <text x="235" y="97" font-size="13" fill="#0f172a" font-family="sans-serif" font-weight="600">opp = ${opp}</text>
    <text x="90" y="82" text-anchor="middle" font-size="13" fill="#7c3aed" font-family="sans-serif" font-weight="600">hyp = ${hyp}</text>
    <text x="42" y="145" font-size="15" fill="#6366f1" font-family="sans-serif" font-weight="bold">${theta}</text>
  </svg>`;
}

const astcSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="220" height="220" style="max-width:220px;display:block;margin:8px auto;border-radius:12px;background:#f8fafc;">
  <line x1="120" y1="10" x2="120" y2="230" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="10" y1="120" x2="230" y2="120" stroke="#94a3b8" stroke-width="1.5"/>
  <rect x="120" y="10" width="110" height="110" fill="rgba(16,185,129,0.07)" rx="4"/>
  <rect x="10" y="10" width="110" height="110" fill="rgba(99,102,241,0.07)" rx="4"/>
  <rect x="10" y="120" width="110" height="110" fill="rgba(245,158,11,0.07)" rx="4"/>
  <rect x="120" y="120" width="110" height="110" fill="rgba(239,68,68,0.07)" rx="4"/>
  <text x="175" y="62" text-anchor="middle" font-size="15" fill="#10b981" font-weight="bold" font-family="sans-serif">ALL +</text>
  <text x="175" y="78" text-anchor="middle" font-size="10" fill="#10b981" font-family="sans-serif">(I Quadrant)</text>
  <text x="62" y="62" text-anchor="middle" font-size="13" fill="#6366f1" font-weight="bold" font-family="sans-serif">SIN +</text>
  <text x="62" y="78" text-anchor="middle" font-size="10" fill="#6366f1" font-family="sans-serif">(II Quadrant)</text>
  <text x="62" y="172" text-anchor="middle" font-size="13" fill="#f59e0b" font-weight="bold" font-family="sans-serif">TAN +</text>
  <text x="62" y="188" text-anchor="middle" font-size="10" fill="#f59e0b" font-family="sans-serif">(III Quadrant)</text>
  <text x="175" y="172" text-anchor="middle" font-size="13" fill="#ef4444" font-weight="bold" font-family="sans-serif">COS +</text>
  <text x="175" y="188" text-anchor="middle" font-size="10" fill="#ef4444" font-family="sans-serif">(IV Quadrant)</text>
  <text x="225" y="117" font-size="11" fill="#64748b" font-family="sans-serif">x</text>
  <text x="122" y="15" font-size="11" fill="#64748b" font-family="sans-serif">y</text>
</svg>`;

function sineWaveSVG(highlightX = null) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160" width="300" height="150" style="max-width:300px;display:block;margin:8px auto;border-radius:12px;background:#f8fafc;">
    <line x1="20" y1="80" x2="305" y2="80" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="20" y1="15" x2="20" y2="145" stroke="#94a3b8" stroke-width="1.5"/>
    <path d="M20,80 C40,80 47,15 70,15 C93,15 100,80 120,80 C140,80 147,145 170,145 C193,145 200,80 220,80 C240,80 247,15 270,15 C293,15 300,80 305,80" fill="none" stroke="#6366f1" stroke-width="2.5"/>
    <text x="22" y="14" font-size="10" fill="#64748b" font-family="sans-serif">1</text>
    <text x="22" y="144" font-size="10" fill="#64748b" font-family="sans-serif">-1</text>
    <text x="298" y="77" font-size="11" fill="#64748b" font-family="sans-serif">x</text>
    <text x="70" y="97" font-size="9" fill="#94a3b8" font-family="sans-serif">π</text>
    <text x="120" y="97" font-size="9" fill="#94a3b8" font-family="sans-serif">2π</text>
    <text x="170" y="97" font-size="9" fill="#94a3b8" font-family="sans-serif">3π</text>
    <text x="220" y="97" font-size="9" fill="#94a3b8" font-family="sans-serif">4π</text>
    <text x="60" y="27" font-size="11" fill="#6366f1" font-family="sans-serif">y = sin x</text>
  </svg>`;
}

function cosWaveSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160" width="300" height="150" style="max-width:300px;display:block;margin:8px auto;border-radius:12px;background:#f8fafc;">
    <line x1="20" y1="80" x2="305" y2="80" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="20" y1="15" x2="20" y2="145" stroke="#94a3b8" stroke-width="1.5"/>
    <path d="M20,15 C40,15 47,80 70,80 C93,80 100,145 120,145 C140,145 147,80 170,80 C190,80 197,15 220,15 C240,15 247,80 270,80 C290,80 297,145 305,145" fill="none" stroke="#0891b2" stroke-width="2.5"/>
    <text x="22" y="14" font-size="10" fill="#64748b" font-family="sans-serif">1</text>
    <text x="22" y="144" font-size="10" fill="#64748b" font-family="sans-serif">-1</text>
    <text x="298" y="77" font-size="11" fill="#64748b" font-family="sans-serif">x</text>
    <text x="60" y="27" font-size="11" fill="#0891b2" font-family="sans-serif">y = cos x</text>
  </svg>`;
}

function sectorSVG(r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  const ex = (80 * Math.cos(rad)).toFixed(1);
  const ey = (-80 * Math.sin(rad)).toFixed(1);
  const la = angleDeg > 180 ? 1 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200" width="200" height="200" style="max-width:200px;display:block;margin:8px auto;border-radius:12px;background:#f8fafc;">
    <path d="M0,0 L80,0 A80,80 0 ${la},0 ${ex},${ey} Z" fill="rgba(99,102,241,0.12)" stroke="#6366f1" stroke-width="2"/>
    <text x="40" y="-12" font-size="11" fill="#6366f1" font-family="sans-serif" font-weight="bold">θ = ${angleDeg}°</text>
    <text x="30" y="16" font-size="11" fill="#0f172a" font-family="sans-serif">r = ${r}</text>
    <circle cx="0" cy="0" r="3" fill="#6366f1"/>
  </svg>`;
}

// ─── SKILL 1: ANGLES & RADIAN MEASURE ────────────────────────────────────────
const STD_ANGLES = {
  30: '\\frac{\\pi}{6}', 45: '\\frac{\\pi}{4}', 60: '\\frac{\\pi}{3}',
  90: '\\frac{\\pi}{2}', 120: '\\frac{2\\pi}{3}', 150: '\\frac{5\\pi}{6}',
  180: '\\pi', 210: '\\frac{7\\pi}{6}', 240: '\\frac{4\\pi}{3}',
  270: '\\frac{3\\pi}{2}', 300: '\\frac{5\\pi}{3}', 360: '2\\pi'
};
const DEG_LIST = [30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 360];

function degToRadQ() {
  const d = pick(DEG_LIST);
  const rad = STD_ANGLES[d];
  const wrong = [STD_ANGLES[DEG_LIST[(DEG_LIST.indexOf(d) + 1) % 12]], STD_ANGLES[DEG_LIST[(DEG_LIST.indexOf(d) + 3) % 12]], STD_ANGLES[DEG_LIST[(DEG_LIST.indexOf(d) + 5) % 12]]];
  return makeQ(`Convert $${d}°$ to radians.`, `$${rad}$`, wrong.map(w => `$${w}$`), `Use $\\frac{\\pi}{180} \\times ${d}° = ${rad}$ radians.`, unitCircleSVG(d));
}

function radToDegQ() {
  const d = pick(DEG_LIST);
  const rad = STD_ANGLES[d];
  const w1 = DEG_LIST[(DEG_LIST.indexOf(d) + 2) % 12];
  const w2 = DEG_LIST[(DEG_LIST.indexOf(d) + 4) % 12];
  const w3 = DEG_LIST[(DEG_LIST.indexOf(d) + 6) % 12];
  return makeQ(`Convert $${rad}$ radians to degrees.`, `$${d}°$`, [`$${w1}°$`, `$${w2}°$`, `$${w3}°$`], `Use $\\frac{180}{\\pi} \\times ${rad} = ${d}°$.`);
}

function arcLengthQ() {
  const r = R(3, 12);
  const angleDeg = pick([30, 45, 60, 90, 120]);
  const angleRad = STD_ANGLES[angleDeg];
  const parts = { 30: 'π/6', 45: 'π/4', 60: 'π/3', 90: 'π/2', 120: '2π/3' };
  const numericRad = { 30: 1, 45: 1, 60: 1, 90: 1, 120: 2 };
  const den = { 30: 6, 45: 4, 60: 3, 90: 2, 120: 3 };
  const num = numericRad[angleDeg];
  const d = den[angleDeg];
  const arc = `$\\frac{${r * num}\\pi}{${d}}$`;
  return makeQ(
    `Find the length of arc of a circle with radius $r = ${r}$ cm and central angle $\\theta = ${angleRad}$ radians. (Use $l = r\\theta$)`,
    arc,
    [`$\\frac{${r * num + 1}\\pi}{${d}}$`, `$\\frac{${r}\\pi}{${d + 1}}$`, `$${r}\\pi$`],
    `$l = r\\theta = ${r} \\times ${parts[angleDeg]} = \\frac{${r * num}\\pi}{${d}}$ cm.`,
    sectorSVG(r, angleDeg)
  );
}

function sectorAreaQ() {
  const r = R(2, 10);
  const angleDeg = pick([60, 90, 120]);
  const angRad = STD_ANGLES[angleDeg];
  const vals = { 60: { num: 1, den: 3, label: 'π/3' }, 90: { num: 1, den: 2, label: 'π/2' }, 120: { num: 2, den: 3, label: '2π/3' } };
  const { num, den } = vals[angleDeg];
  const area = `$\\frac{${r * r * num}\\pi}{${den * 2}}$`;
  return makeQ(
    `Area of a sector with radius $${r}$ cm and angle $${angRad}$ rad is: (Use $A = \\frac{1}{2}r^2\\theta$)`,
    area,
    [`$\\frac{${r * r}\\pi}{${den}}$`, `$\\frac{${r * r * num + 1}\\pi}{${den * 2}}$`, `$${r * r}\\pi$`],
    `$A = \\frac{1}{2} \\times ${r}^2 \\times \\frac{${num}\\pi}{${den}} = \\frac{${r * r * num}\\pi}{${den * 2}}$ cm².`,
    sectorSVG(r, angleDeg)
  );
}

export function generateAnglesQuestions() {
  const qs = [];
  const dToR = [degToRadQ, degToRadQ, degToRadQ, degToRadQ, degToRadQ];
  const rToD = [radToDegQ, radToDegQ, radToDegQ, radToDegQ];
  const arcs = [arcLengthQ, arcLengthQ, arcLengthQ];
  const sectors = [sectorAreaQ, sectorAreaQ, sectorAreaQ];
  const extras = [
    () => makeQ('$1$ radian equals approximately:', '$57.3°$', ['$90°$', '$45°$', '$180°$'], '$1 \\text{ rad} = \\frac{180°}{\\pi} \\approx 57.3°$.'),
    () => makeQ('$\\pi$ radians equals:', '$180°$', ['$360°$', '$90°$', '$270°$'], '$\\pi \\text{ rad} = 180°$ — the fundamental conversion.'),
    () => { const r = R(3, 8); const l = R(4, 14); const theta = `$\\frac{${l}}{${r}}$ rad`; return makeQ(`If arc length $l = ${l}$ and radius $r = ${r}$, angle $\\theta = l/r =$`, theta, [`$\\frac{${l - 1}}{${r}}$ rad`, `$\\frac{${l}}{${r + 1}}$ rad`, `$${r + l}$ rad`], `$\\theta = \\frac{l}{r} = \\frac{${l}}{${r}}$ rad.`); },
    () => makeQ('Full circle in radians is:', '$2\\pi$', ['$\\pi$', '$4\\pi$', '$\\frac{\\pi}{2}$'], 'A full rotation = $360° = 2\\pi$ radians.'),
    () => makeQ('Which is larger: $1$ radian or $60°$?', '$60°$ (since $1$ rad $\\approx 57.3°$)', ['$1$ radian', 'They are equal', 'Cannot compare'], '$1\\text{ rad} \\approx 57.3°$, which is less than $60°$.'),
  ];
  const pool = [...dToR, ...rToD, ...arcs, ...sectors, ...extras];
  const used = new Set();
  while (qs.length < 20) {
    const idx = R(0, pool.length - 1);
    qs.push(pool[idx]());
  }
  return qs;
}

export function generateAnglesAssessment() {
  const qs = [];
  const pool = [
    degToRadQ, degToRadQ, degToRadQ,
    radToDegQ, radToDegQ, radToDegQ,
    arcLengthQ, arcLengthQ, arcLengthQ,
    sectorAreaQ, sectorAreaQ, sectorAreaQ,
    () => makeQ('How many radians in a straight angle ($180°$)?', '$\\pi$', ['$2\\pi$', '$\\frac{\\pi}{2}$', '$3\\pi$'], '$180° = \\pi$ radians by definition.'),
    () => makeQ('How many radians in a right angle ($90°$)?', '$\\frac{\\pi}{2}$', ['$\\pi$', '$\\frac{\\pi}{4}$', '$\\frac{\\pi}{3}$'], '$90° = \\frac{\\pi}{2}$ radians.'),
    () => { const deg = pick([15, 18, 36, 72]); const map = { 15: '\\frac{\\pi}{12}', 18: '\\frac{\\pi}{10}', 36: '\\frac{\\pi}{5}', 72: '\\frac{2\\pi}{5}' }; return makeQ(`$${deg}°$ in radians is:`, `$${map[deg]}$`, [`$\\frac{\\pi}{8}$`, `$\\frac{\\pi}{9}$`, `$\\frac{2\\pi}{9}$`], `$${deg}° \\times \\frac{\\pi}{180} = ${map[deg]}$ rad.`); },
    () => { const r = R(4, 12); const arc = R(3, r - 1); return makeQ(`A circle has radius $${r}$ m and arc length $${arc}$ m. Find the central angle.`, `$\\frac{${arc}}{${r}}$ rad`, [`$\\frac{${arc + 1}}{${r}}$ rad`, `$${arc * r}$ rad`, `$\\frac{${r}}{${arc}}$ rad`], `$\\theta = l/r = ${arc}/${r}$ rad.`); },
    () => makeQ('The minute hand of a clock turns through angle in 30 min:', '$\\pi$ radians', ['$\\frac{\\pi}{2}$', '$\\frac{3\\pi}{2}$', '$2\\pi$'], 'In 30 min, minute hand completes half rotation = $\\pi$ rad.'),
    () => { const d = pick([30, 45, 60]); const rad = STD_ANGLES[d]; const r = R(3, 10); const arcVal = { 30: `${r}\\pi/6`, 45: `${r}\\pi/4`, 60: `${r}\\pi/3` }; return makeQ(`Arc length for $r = ${r}$ m, $\\theta = ${d}°$:`, `$${arcVal[d]}$ m`, [`$${r + 1}\\pi/6$ m`, `$${r}\\pi/5$ m`, `$${r - 1}\\pi/3$ m`], `$l = r \\times \\frac{${STD_ANGLES[d].replace('\\frac','').replace('{','').replace('}','/').replace('{','').replace('}','')} } = ${arcVal[d]}$ m.`); },
    () => makeQ('If the radius of a circle is doubled, the arc length for the same angle:', 'Doubles', ['Halves', 'Stays the same', 'Quadruples'], '$l = r\\theta$; if $r \\to 2r$, then $l \\to 2l$.'),
    () => makeQ('Angle subtended by an arc equal to the radius at the centre is:', '$1$ radian', ['$\\pi$ radians', '$90°$', '$2$ radians'], 'By definition: $\\theta = l/r = r/r = 1$ radian.'),
  ];
  while (qs.length < 20) {
    qs.push(pool[R(0, pool.length - 1)]());
  }
  return qs;
}

// ─── SKILL 2: TRIGONOMETRIC VALUES AT STANDARD ANGLES ────────────────────────
const TRIG_TABLE = {
  '0':   { sin: '0', cos: '1', tan: '0', cosec: '\\text{undefined}', sec: '1', cot: '\\text{undefined}' },
  '30':  { sin: '\\frac{1}{2}', cos: '\\frac{\\sqrt{3}}{2}', tan: '\\frac{1}{\\sqrt{3}}', cosec: '2', sec: '\\frac{2}{\\sqrt{3}}', cot: '\\sqrt{3}' },
  '45':  { sin: '\\frac{1}{\\sqrt{2}}', cos: '\\frac{1}{\\sqrt{2}}', tan: '1', cosec: '\\sqrt{2}', sec: '\\sqrt{2}', cot: '1' },
  '60':  { sin: '\\frac{\\sqrt{3}}{2}', cos: '\\frac{1}{2}', tan: '\\sqrt{3}', cosec: '\\frac{2}{\\sqrt{3}}', sec: '2', cot: '\\frac{1}{\\sqrt{3}}' },
  '90':  { sin: '1', cos: '0', tan: '\\text{undefined}', cosec: '1', sec: '\\text{undefined}', cot: '0' },
};

function trigValueQ() {
  const angles = ['0', '30', '45', '60', '90'];
  const fns = ['sin', 'cos', 'tan'];
  const a = pick(angles);
  const f = pick(fns);
  const val = TRIG_TABLE[a][f];
  const others = angles.filter(x => x !== a).map(x => TRIG_TABLE[x][f]);
  const svg = (a !== '0' && a !== '90') ? unitCircleSVG(parseInt(a), `P`) : '';
  if (val === '\\text{undefined}') {
    return makeQ(`$\\${f}(${a}°)$ is:`, 'Undefined (not defined)', [`$0$`, `$1$`, `$-1$`], `$\\${f}(${a}°)$ is not defined.`, svg);
  }
  return makeQ(`Find $\\${f}(${a}°)$.`, `$${val}$`, others.filter(x => x !== val && x !== '\\text{undefined}').slice(0, 3).map(x => `$${x}$`), `From the standard trig table, $\\${f}(${a}°) = ${val}$.`, svg);
}

function reciprocalTrigQ() {
  const a = pick(['30', '45', '60']);
  const f = pick(['cosec', 'sec', 'cot']);
  const val = TRIG_TABLE[a][f];
  return makeQ(
    `Find $\\${f}(${a}°)$.`,
    `$${val}$`,
    ['30', '45', '60'].filter(x => x !== a).map(x => `$${TRIG_TABLE[x][f]}$`),
    `$\\${f}(${a}°) = ${val}$ from the reciprocal identity.`,
    unitCircleSVG(parseInt(a))
  );
}

function pythIdentityQ() {
  const a = pick([30, 45, 60]);
  const sinA = { 30: '1/2', 45: '1/√2', 60: '√3/2' };
  const cosA = { 30: '√3/2', 45: '1/√2', 60: '1/2' };
  return makeQ(
    `Verify: $\\sin^2(${a}°) + \\cos^2(${a}°) = ?$`,
    '$1$',
    ['$0$', '$2$', '$\\frac{1}{2}$'],
    `$\\sin^2(${a}°) + \\cos^2(${a}°) = 1$ by the Pythagorean identity — always true!`
  );
}

function evalExprQ() {
  const a = pick([30, 45, 60]);
  const exprs = {
    30: [
      { expr: '\\sin 30° + \\cos 60°', val: '1', exp: '$\\frac{1}{2} + \\frac{1}{2} = 1$.' },
      { expr: '\\sin 60° \\cdot \\cos 30°', val: '\\frac{3}{4}', exp: '$\\frac{\\sqrt{3}}{2} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{3}{4}$.' },
      { expr: '\\tan 30° \\cdot \\cot 30°', val: '1', exp: '$\\tan\\theta \\cdot \\cot\\theta = 1$ always.' },
    ],
    45: [
      { expr: '\\sin^2 45° + \\tan^2 45°', val: '\\frac{3}{2}', exp: '$\\frac{1}{2} + 1 = \\frac{3}{2}$.' },
      { expr: '\\cos 45° \\cdot \\sec 45°', val: '1', exp: '$\\cos\\theta \\cdot \\sec\\theta = 1$ always.' },
      { expr: '2\\sin 45° \\cos 45°', val: '1', exp: '$2 \\cdot \\frac{1}{\\sqrt{2}} \\cdot \\frac{1}{\\sqrt{2}} = 2 \\cdot \\frac{1}{2} = 1 = \\sin 90°$.' },
    ],
    60: [
      { expr: '\\cos 60° + \\sin 30°', val: '1', exp: '$\\frac{1}{2} + \\frac{1}{2} = 1$.' },
      { expr: '\\tan 60° \\cdot \\cot 60°', val: '1', exp: '$\\tan\\theta \\cdot \\cot\\theta = 1$.' },
      { expr: '\\sec^2 60° - \\tan^2 60°', val: '1', exp: '$4 - 3 = 1$. Uses identity $\\sec^2\\theta - \\tan^2\\theta = 1$.' },
    ]
  };
  const e = pick(exprs[a]);
  return makeQ(`Evaluate $${e.expr}$.`, `$${e.val}$`, ['$0$', '$2$', '$\\frac{1}{4}$'].filter(x => x !== `$${e.val}$`).slice(0, 3), e.exp);
}

export function generateTrigValuesQuestions() {
  const qs = [];
  const pool = [trigValueQ, trigValueQ, trigValueQ, trigValueQ, trigValueQ, trigValueQ,
    reciprocalTrigQ, reciprocalTrigQ, reciprocalTrigQ,
    pythIdentityQ, pythIdentityQ,
    evalExprQ, evalExprQ, evalExprQ,
    () => makeQ('$\\tan 45°$ equals:', '$1$', ['$0$', '$\\sqrt{3}$', '$\\frac{1}{\\sqrt{3}}$'], '$\\tan 45° = \\frac{\\sin 45°}{\\cos 45°} = \\frac{1/\\sqrt{2}}{1/\\sqrt{2}} = 1$.'),
    () => makeQ('$\\sin 0° + \\cos 90°$ equals:', '$0$', ['$1$', '$2$', '$\\sqrt{2}$'], '$\\sin 0° = 0$ and $\\cos 90° = 0$, so sum $= 0$.'),
    () => makeQ('$\\cos 0° - \\sin 90°$ equals:', '$0$', ['$1$', '$-1$', '$2$'], '$\\cos 0° = 1$ and $\\sin 90° = 1$. Difference $= 0$.'),
    () => makeQ('$\\sin 30° \\times \\cos 60°$ equals:', '$\\frac{1}{4}$', ['$\\frac{1}{2}$', '$\\frac{3}{4}$', '$\\frac{\\sqrt{3}}{4}$'], '$\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$.'),
    () => makeQ('Which is the greatest? $\\sin 30°$, $\\sin 45°$, $\\sin 60°$', '$\\sin 60° = \\frac{\\sqrt{3}}{2} \\approx 0.866$', ['$\\sin 30° = \\frac{1}{2}$', '$\\sin 45° = \\frac{1}{\\sqrt{2}}$', 'They are equal'], 'Since $\\sin$ is increasing in $[0°, 90°]$, $\\sin 60° > \\sin 45° > \\sin 30°$.'),
    () => makeQ('$\\cosec 90°$ equals:', '$1$', ['$0$', 'Undefined', '$\\sqrt{2}$'], '$\\cosec 90° = \\frac{1}{\\sin 90°} = \\frac{1}{1} = 1$.'),
  ];
  while (qs.length < 20) qs.push(pool[R(0, pool.length - 1)]());
  return qs;
}

export function generateTrigValuesAssessment() {
  const qs = [];
  const pool = [
    trigValueQ, trigValueQ, trigValueQ, trigValueQ,
    reciprocalTrigQ, reciprocalTrigQ,
    pythIdentityQ, pythIdentityQ,
    evalExprQ, evalExprQ,
    () => makeQ('$\\sin^2 60° - \\cos^2 30°$ equals:', '$0$', ['$1$', '$\\frac{1}{2}$', '$\\frac{\\sqrt{3}}{2}$'], '$\\sin 60° = \\cos 30° = \\frac{\\sqrt{3}}{2}$, so $\\frac{3}{4} - \\frac{3}{4} = 0$.'),
    () => makeQ('$\\text{sec}^2(45°) - 1$ equals:', '$1$', ['$0$', '$2$', '$\\frac{1}{2}$'], '$\\sec 45° = \\sqrt{2}$, so $\\sec^2 45° = 2$. $2 - 1 = 1$. Also from $\\sec^2\\theta - 1 = \\tan^2\\theta = \\tan^2 45° = 1$.'),
    () => makeQ('$\\frac{\\sin 60°}{\\cos 60°}$ equals:', '$\\sqrt{3}$', ['$\\frac{1}{\\sqrt{3}}$', '$1$', '$\\frac{\\sqrt{3}}{2}$'], '$\\frac{\\sqrt{3}/2}{1/2} = \\sqrt{3} = \\tan 60°$.'),
    () => makeQ('$\\cot 30° + \\tan 30°$ equals:', '$\\frac{4}{\\sqrt{3}}$', ['$2\\sqrt{3}$', '$\\sqrt{3} + \\frac{1}{\\sqrt{3}}$', '$2$'], '$\\sqrt{3} + \\frac{1}{\\sqrt{3}} = \\frac{3 + 1}{\\sqrt{3}} = \\frac{4}{\\sqrt{3}}$.'),
    () => makeQ('Value of $\\sin 90° + \\cos 0°$ is:', '$2$', ['$0$', '$1$', '$\\sqrt{2}$'], '$1 + 1 = 2$.'),
    () => makeQ('$\\tan 0° + \\cot 90°$:', '$0$', ['$1$', 'Undefined', '$2$'], '$\\tan 0° = 0$; $\\cot 90° = \\frac{\\cos 90°}{\\sin 90°} = \\frac{0}{1} = 0$. Sum $= 0$.'),
    () => makeQ('$4\\sin^2 30° + \\cos^2 60°$:', '$\\frac{5}{4}$', ['$1$', '$2$', '$\\frac{3}{4}$'], '$4 \\cdot \\frac{1}{4} + \\frac{1}{4} = 1 + \\frac{1}{4} = \\frac{5}{4}$.'),
    () => makeQ('$2\\cos^2 45° - 1$ equals:', '$0$', ['$1$', '$-1$', '$\\frac{1}{2}$'], '$2 \\cdot \\frac{1}{2} - 1 = 1 - 1 = 0$. This is $\\cos 2 \\times 45° = \\cos 90° = 0$.'),
    () => makeQ('$\\sin 30° + \\sin 60° + \\sin 90°$ equals:', '$\\frac{1 + \\sqrt{3} + 2}{2} = \\frac{3 + \\sqrt{3}}{2}$', ['$3$', '$2$', '$\\frac{1 + \\sqrt{3}}{2}$'], '$\\frac{1}{2} + \\frac{\\sqrt{3}}{2} + 1 = \\frac{3 + \\sqrt{3}}{2}$.'),
  ];
  while (qs.length < 20) qs.push(pool[R(0, pool.length - 1)]());
  return qs;
}

// ─── SKILL 3: SIGNS & QUADRANT ANALYSIS ──────────────────────────────────────
const QUADRANT_INFO = {
  1: { name: 'I', sin: '+', cos: '+', tan: '+', angle: '0° to 90°' },
  2: { name: 'II', sin: '+', cos: '−', tan: '−', angle: '90° to 180°' },
  3: { name: 'III', sin: '−', cos: '−', tan: '+', angle: '180° to 270°' },
  4: { name: 'IV', sin: '−', cos: '+', tan: '−', angle: '270° to 360°' },
};

function quadrantOfAngleQ() {
  const q = R(1, 4);
  const ranges = { 1: [20, 80], 2: [100, 170], 3: [200, 260], 4: [280, 350] };
  const [lo, hi] = ranges[q];
  const angle = R(lo, hi);
  const svg = unitCircleSVG(angle);
  return makeQ(
    `In which quadrant does the angle $${angle}°$ lie?`,
    `Quadrant ${QUADRANT_INFO[q].name}`,
    [1, 2, 3, 4].filter(x => x !== q).map(x => `Quadrant ${QUADRANT_INFO[x].name}`),
    `$${angle}°$ lies in the range ${QUADRANT_INFO[q].angle} → Quadrant ${QUADRANT_INFO[q].name}.`,
    svg
  );
}

function signOfTrigQ() {
  const q = R(1, 4);
  const fn = pick(['sin', 'cos', 'tan']);
  const sign = QUADRANT_INFO[q][fn];
  const plus = sign === '+' ? 'Positive' : 'Negative';
  const minus = sign === '+' ? 'Negative' : 'Positive';
  return makeQ(
    `What is the sign of $\\${fn}\\,\\theta$ in Quadrant ${QUADRANT_INFO[q].name}?`,
    plus,
    [minus, 'Zero', 'Depends on θ'],
    `In Quadrant ${QUADRANT_INFO[q].name} (${QUADRANT_INFO[q].angle}), $\\${fn}$ is ${plus.toLowerCase()} (ASTC rule).`,
    astcSVG
  );
}

function findQuadrantFromSignsQ() {
  const qs_data = [
    { cond: 'sin > 0, cos > 0', ans: 'I', exp: 'Both positive → Quadrant I (All positive).' },
    { cond: 'sin > 0, cos < 0', ans: 'II', exp: 'sin positive, cos negative → Quadrant II.' },
    { cond: 'sin < 0, tan > 0', ans: 'III', exp: 'sin negative, tan positive → Quadrant III.' },
    { cond: 'cos > 0, sin < 0', ans: 'IV', exp: 'cos positive, sin negative → Quadrant IV.' },
    { cond: 'sin < 0, cos < 0', ans: 'III', exp: 'Both negative → Quadrant III.' },
    { cond: 'tan < 0, cos > 0', ans: 'IV', exp: 'tan negative, cos positive → Quadrant IV.' },
    { cond: 'tan > 0, sin < 0', ans: 'III', exp: 'tan positive, sin negative → Quadrant III.' },
    { cond: 'sin > 0, tan < 0', ans: 'II', exp: 'sin positive, tan negative → Quadrant II.' },
  ];
  const d = pick(qs_data);
  return makeQ(
    `If $${d.cond}$, the angle lies in Quadrant:`,
    d.ans,
    ['I', 'II', 'III', 'IV'].filter(x => x !== d.ans),
    d.exp,
    astcSVG
  );
}

export function generateSignsQuestions() {
  const qs = [];
  const pool = [
    quadrantOfAngleQ, quadrantOfAngleQ, quadrantOfAngleQ, quadrantOfAngleQ,
    signOfTrigQ, signOfTrigQ, signOfTrigQ, signOfTrigQ,
    findQuadrantFromSignsQ, findQuadrantFromSignsQ, findQuadrantFromSignsQ,
    () => makeQ('In which quadrant are both $\\sin$ and $\\tan$ positive but $\\cos$ negative?', 'No such quadrant exists', ['I', 'II', 'III'], 'If $\\sin > 0$ and $\\cos < 0$ (Quadrant II), then $\\tan = \\sin/\\cos < 0$. Contradiction!'),
    () => makeQ('$\\sin 150°$ has the same sign as $\\sin 30°$ because:', 'Both are in quadrants where sin is positive (I and II)', ['They are equal', 'Both use the same formula', 'cos is the same'], '$150°$ is in QII (sin+), $30°$ is in QI (sin+). Both positive.', unitCircleSVG(150)),
    () => makeQ('In which quadrant is $\\cos$ positive and $\\sin$ negative?', 'IV (270° to 360°)', ['I', 'II', 'III'], 'ASTC: Cos positive in Q-I and Q-IV. Sin negative in Q-III and Q-IV. Overlap → Q-IV.', astcSVG),
    () => makeQ('Sign of $\\tan 200°$:', 'Positive (Quadrant III)', ['Negative', 'Zero', 'Undefined'], '$200°$ is in Q-III where $\\tan$ is positive (ASTC rule).', unitCircleSVG(200)),
    () => makeQ('Sign of $\\cos 300°$:', 'Positive (Quadrant IV)', ['Negative', 'Zero', 'Undefined'], '$300°$ is in Q-IV where cos is positive.', unitCircleSVG(300)),
    () => makeQ('The ASTC rule helps determine:', 'Signs of trig functions in each quadrant', ['Values of standard angles', 'Exact trig values', 'Quadrant of any angle'], 'ASTC tells you which functions are positive in each quadrant.', astcSVG),
    () => makeQ('$\\cos$ is negative in which quadrants?', 'II and III', ['I and IV', 'I and II', 'III and IV'], 'cos is positive in Q-I and Q-IV (ASTC). So cos is negative in Q-II and Q-III.', astcSVG),
  ];
  while (qs.length < 20) qs.push(pool[R(0, pool.length - 1)]());
  return qs;
}

export function generateSignsAssessment() {
  const qs = [];
  const pool = [
    quadrantOfAngleQ, quadrantOfAngleQ, quadrantOfAngleQ,
    signOfTrigQ, signOfTrigQ, signOfTrigQ,
    findQuadrantFromSignsQ, findQuadrantFromSignsQ,
    () => makeQ('$\\sin 250°$ is:', 'Negative (Q-III)', ['Positive', 'Zero', 'Undefined'], '$250°$ is in Q-III (180° to 270°). sin is negative in Q-III.', unitCircleSVG(250)),
    () => makeQ('$\\tan 135°$ is:', 'Negative (Q-II)', ['Positive', 'Zero', 'Undefined'], '$135°$ is in Q-II. sin+ and cos−, so tan = sin/cos is negative.', unitCircleSVG(135)),
    () => makeQ('$\\sec\\theta$ is positive when:', 'cos θ is positive (Q-I and Q-IV)', ['cos θ is negative', 'sin θ is positive', 'tan θ is positive'], 'sec θ = 1/cos θ. Same sign as cos θ.'),
    () => makeQ('$\\text{cosec}\\,\\theta$ is negative in:', 'Q-III and Q-IV', ['Q-I and Q-II', 'Only Q-III', 'Only Q-IV'], 'cosec θ = 1/sin θ. Same sign as sin. Sin is negative in Q-III and Q-IV.'),
    () => makeQ('$\\cot 315°$ is:', 'Negative (Q-IV)', ['Positive', 'Zero', 'Undefined'], '$315°$ is in Q-IV. sin−, cos+, so cot = cos/sin is negative.', unitCircleSVG(315)),
    () => makeQ('If $\\sin\\theta > 0$ and $\\sec\\theta < 0$, then $\\theta$ is in:', 'Q-II', ['Q-I', 'Q-III', 'Q-IV'], 'sin > 0 → Q-I or Q-II. sec < 0 → cos < 0 → Q-II or Q-III. Intersection → Q-II.'),
    () => makeQ('$\\cos 120°$ is:', 'Negative ($-\\frac{1}{2}$)', ['Positive', '$\\frac{1}{2}$', '$\\frac{\\sqrt{3}}{2}$'], '$120°$ is in Q-II where cos is negative. $\\cos 120° = -\\cos 60° = -\\frac{1}{2}$.', unitCircleSVG(120)),
    () => makeQ('$\\sin 330°$ is:', 'Negative ($-\\frac{1}{2}$)', ['Positive', '$\\frac{1}{2}$', '$\\frac{\\sqrt{3}}{2}$'], '$330° = 360° - 30°$. In Q-IV, sin is negative. $\\sin 330° = -\\sin 30° = -\\frac{1}{2}$.', unitCircleSVG(330)),
    () => makeQ('Which functions are positive ONLY in Q-I?', 'All six trig functions are positive in Q-I', ['Only sin and cosec', 'Only cos and sec', 'Only tan and cot'], 'In Q-I, all functions are positive — that is what "All" means in ASTC.', astcSVG),
    () => makeQ('$\\sin\\theta < 0$ and $\\tan\\theta > 0$ together imply:', 'Q-III ($180°$ to $270°$)', ['Q-I', 'Q-II', 'Q-IV'], 'sin < 0 (Q-III or Q-IV) AND tan > 0 (Q-I or Q-III). Intersection → Q-III.', astcSVG),
  ];
  while (qs.length < 20) qs.push(pool[R(0, pool.length - 1)]());
  return qs;
}

// ─── SKILL 4: ALLIED ANGLES ───────────────────────────────────────────────────
const ALLIED_RULES = [
  { pattern: '\\frac{\\pi}{2} - \\theta', sin: 'cos\\,\\theta', cos: 'sin\\,\\theta', tan: 'cot\\,\\theta' },
  { pattern: '\\frac{\\pi}{2} + \\theta', sin: 'cos\\,\\theta', cos: '-sin\\,\\theta', tan: '-cot\\,\\theta' },
  { pattern: '\\pi - \\theta', sin: 'sin\\,\\theta', cos: '-cos\\,\\theta', tan: '-tan\\,\\theta' },
  { pattern: '\\pi + \\theta', sin: '-sin\\,\\theta', cos: '-cos\\,\\theta', tan: 'tan\\,\\theta' },
  { pattern: '\\frac{3\\pi}{2} - \\theta', sin: '-cos\\,\\theta', cos: '-sin\\,\\theta', tan: 'cot\\,\\theta' },
  { pattern: '\\frac{3\\pi}{2} + \\theta', sin: '-cos\\,\\theta', cos: 'sin\\,\\theta', tan: '-cot\\,\\theta' },
  { pattern: '2\\pi - \\theta', sin: '-sin\\,\\theta', cos: 'cos\\,\\theta', tan: '-tan\\,\\theta' },
];

function alliedAngleQ() {
  const rule = pick(ALLIED_RULES);
  const fn = pick(['sin', 'cos', 'tan']);
  const ans = rule[fn];
  const others = ALLIED_RULES.filter(r => r !== rule).slice(0, 3).map(r => r[fn]);
  return makeQ(
    `$\\${fn}\\left(${rule.pattern}\\right)$ equals:`,
    `$${ans}$`,
    others.map(x => `$${x}$`),
    `Allied angle rule: $\\${fn}(${rule.pattern}) = ${ans}$.`
  );
}

function alliedAngleNumericQ() {
  const stdAngles = ['30', '45', '60'];
  const a = pick(stdAngles);
  const numVal = { '30': { sin: '\\frac{1}{2}', cos: '\\frac{\\sqrt{3}}{2}', tan: '\\frac{1}{\\sqrt{3}}' }, '45': { sin: '\\frac{1}{\\sqrt{2}}', cos: '\\frac{1}{\\sqrt{2}}', tan: '1' }, '60': { sin: '\\frac{\\sqrt{3}}{2}', cos: '\\frac{1}{2}', tan: '\\sqrt{3}' } };
  const transforms = [
    { expr: `\\sin(180° - ${a}°)`, val: numVal[a].sin, exp: `$\\sin(\\pi - \\theta) = \\sin\\theta$. So $\\sin(180°-${a}°) = \\sin${a}° = ${numVal[a].sin}$.` },
    { expr: `\\cos(180° + ${a}°)`, val: `-${numVal[a].cos}`, exp: `$\\cos(\\pi + \\theta) = -\\cos\\theta$. So $\\cos(180°+${a}°) = -${numVal[a].cos}$.` },
    { expr: `\\sin(90° - ${a}°)`, val: numVal[a].cos, exp: `$\\sin(90°-\\theta) = \\cos\\theta$. So $\\sin(90°-${a}°) = \\cos${a}° = ${numVal[a].cos}$.` },
    { expr: `\\cos(90° + ${a}°)`, val: `-${numVal[a].sin}`, exp: `$\\cos(90°+\\theta) = -\\sin\\theta$. So $\\cos(90°+${a}°) = -${numVal[a].sin}$.` },
    { expr: `\\tan(180° - ${a}°)`, val: `-${numVal[a].tan}`, exp: `$\\tan(\\pi - \\theta) = -\\tan\\theta$. So $-${numVal[a].tan}$.` },
  ];
  const t = pick(transforms);
  return makeQ(
    `Find $${t.expr}$.`,
    `$${t.val}$`,
    ['$0$', '$1$', '$-1$'].filter(x => x !== `$${t.val}$`).slice(0, 3),
    t.exp
  );
}

export function generateAlliedAnglesQuestions() {
  const qs = [];
  const pool = [
    alliedAngleQ, alliedAngleQ, alliedAngleQ, alliedAngleQ, alliedAngleQ, alliedAngleQ,
    alliedAngleNumericQ, alliedAngleNumericQ, alliedAngleNumericQ, alliedAngleNumericQ, alliedAngleNumericQ,
    () => makeQ('$\\sin(\\pi - \\theta) = ?$', '$\\sin\\theta$', ['$-\\sin\\theta$', '$\\cos\\theta$', '$-\\cos\\theta$'], 'Key allied angle rule: $\\sin(\\pi - \\theta) = \\sin\\theta$.'),
    () => makeQ('$\\cos(\\pi + \\theta) = ?$', '$-\\cos\\theta$', ['$\\cos\\theta$', '$-\\sin\\theta$', '$\\sin\\theta$'], '$\\cos(\\pi + \\theta) = -\\cos\\theta$ (angle in Q-III, cos is negative).'),
    () => makeQ('$\\tan(2\\pi - \\theta) = ?$', '$-\\tan\\theta$', ['$\\tan\\theta$', '$\\cot\\theta$', '$-\\cot\\theta$'], '$\\tan(2\\pi - \\theta) = -\\tan\\theta$ (same as $\\tan(-\\theta)$).'),
    () => makeQ('The reference angle for $240°$ is:', '$60°$', ['$30°$', '$45°$', '$120°$'], '$240° = 180° + 60°$, so reference angle is $60°$.'),
    () => makeQ('$\\sin(-\\theta)$ equals:', '$-\\sin\\theta$', ['$\\sin\\theta$', '$\\cos\\theta$', '$0$'], 'Sine is an ODD function: $\\sin(-\\theta) = -\\sin\\theta$.'),
    () => makeQ('$\\cos(-\\theta)$ equals:', '$\\cos\\theta$', ['$-\\cos\\theta$', '$\\sin\\theta$', '$0$'], 'Cosine is an EVEN function: $\\cos(-\\theta) = \\cos\\theta$.'),
    () => makeQ('$\\sin(90° + 45°)$ equals:', '$\\cos 45° = \\frac{1}{\\sqrt{2}}$', ['$\\sin 45°$', '$-\\cos 45°$', '$\\tan 45°$'], '$\\sin(90° + \\theta) = \\cos\\theta$. So $\\sin 135° = \\cos 45° = \\frac{1}{\\sqrt{2}}$.'),
    () => makeQ('$\\cos(270° - \\theta)$ equals:', '$-\\sin\\theta$', ['$\\sin\\theta$', '$-\\cos\\theta$', '$\\cos\\theta$'], '$\\cos(270° - \\theta) = \\cos(\\frac{3\\pi}{2} - \\theta) = -\\sin\\theta$.'),
  ];
  while (qs.length < 20) qs.push(pool[R(0, pool.length - 1)]());
  return qs;
}

export function generateAlliedAnglesAssessment() {
  const qs = [];
  const pool = [
    alliedAngleQ, alliedAngleQ, alliedAngleQ, alliedAngleQ,
    alliedAngleNumericQ, alliedAngleNumericQ, alliedAngleNumericQ,
    () => makeQ('$\\sin(270° + \\theta)$ equals:', '$-\\cos\\theta$', ['$\\cos\\theta$', '$\\sin\\theta$', '$-\\sin\\theta$'], '$\\sin(\\frac{3\\pi}{2} + \\theta) = -\\cos\\theta$.'),
    () => makeQ('$\\cos(270° + \\theta)$ equals:', '$\\sin\\theta$', ['$-\\sin\\theta$', '$\\cos\\theta$', '$-\\cos\\theta$'], '$\\cos(\\frac{3\\pi}{2} + \\theta) = \\sin\\theta$.'),
    () => makeQ('$\\tan(\\pi + \\theta)$ equals:', '$\\tan\\theta$', ['$-\\tan\\theta$', '$\\cot\\theta$', '$-\\cot\\theta$'], '$\\tan(\\pi + \\theta) = \\tan\\theta$ (period of tan is $\\pi$).'),
    () => makeQ('$\\sin 120°$ expressed using allied angle is:', '$\\sin(180° - 60°) = \\sin 60° = \\frac{\\sqrt{3}}{2}$', ['$-\\frac{\\sqrt{3}}{2}$', '$\\frac{1}{2}$', '$-\\frac{1}{2}$'], '$120° = 180° - 60°$. $\\sin(\\pi - \\theta) = \\sin\\theta$. So $\\sin 120° = \\sin 60° = \\frac{\\sqrt{3}}{2}$.', unitCircleSVG(120)),
    () => makeQ('$\\cos 150°$ equals:', '$-\\frac{\\sqrt{3}}{2}$', ['$\\frac{\\sqrt{3}}{2}$', '$-\\frac{1}{2}$', '$\\frac{1}{2}$'], '$150° = 180° - 30°$. $\\cos(\\pi - \\theta) = -\\cos\\theta$. So $\\cos 150° = -\\cos 30° = -\\frac{\\sqrt{3}}{2}$.', unitCircleSVG(150)),
    () => makeQ('$\\tan 210°$ equals:', '$\\frac{1}{\\sqrt{3}}$', ['$-\\frac{1}{\\sqrt{3}}$', '$\\sqrt{3}$', '$-\\sqrt{3}$'], '$210° = 180° + 30°$. $\\tan(\\pi + \\theta) = \\tan\\theta$. So $\\tan 210° = \\tan 30° = \\frac{1}{\\sqrt{3}}$.', unitCircleSVG(210)),
    () => makeQ('$\\sin 330°$ equals:', '$-\\frac{1}{2}$', ['$\\frac{1}{2}$', '$-\\frac{\\sqrt{3}}{2}$', '$\\frac{\\sqrt{3}}{2}$'], '$330° = 360° - 30°$. $\\sin(2\\pi - \\theta) = -\\sin\\theta$. So $-\\sin 30° = -\\frac{1}{2}$.', unitCircleSVG(330)),
    () => makeQ('$\\cos 300°$ equals:', '$\\frac{1}{2}$', ['$-\\frac{1}{2}$', '$\\frac{\\sqrt{3}}{2}$', '$-\\frac{\\sqrt{3}}{2}$'], '$300° = 360° - 60°$. $\\cos(2\\pi - \\theta) = \\cos\\theta$. So $\\cos 60° = \\frac{1}{2}$.', unitCircleSVG(300)),
    () => makeQ('$\\sin(-30°)$ equals:', '$-\\frac{1}{2}$', ['$\\frac{1}{2}$', '$-\\frac{\\sqrt{3}}{2}$', '$0$'], '$\\sin(-30°) = -\\sin 30° = -\\frac{1}{2}$ (sin is odd).'),
    () => makeQ('The allied angle rule changes function name when angle is a multiple of:', '$\\frac{\\pi}{2}$ (odd multiples)', ['$\\pi$ (any multiple)', '$2\\pi$', 'Never'], 'For odd multiples of $\\pi/2$, sin↔cos and tan↔cot. For even multiples (π, 2π), function names stay the same.'),
  ];
  while (qs.length < 20) qs.push(pool[R(0, pool.length - 1)]());
  return qs;
}

// ─── SKILL 5: SUM & DIFFERENCE FORMULAS ──────────────────────────────────────
function sumDiffQ() {
  const formulas = [
    { q: '$\\sin(A + B)$ equals:', a: '$\\sin A \\cos B + \\cos A \\sin B$', w: ['$\\sin A \\cos B - \\cos A \\sin B$', '$\\cos A \\cos B - \\sin A \\sin B$', '$\\sin A \\sin B + \\cos A \\cos B$'], e: 'Standard addition formula for sine.' },
    { q: '$\\cos(A - B)$ equals:', a: '$\\cos A \\cos B + \\sin A \\sin B$', w: ['$\\cos A \\cos B - \\sin A \\sin B$', '$\\sin A \\cos B - \\cos A \\sin B$', '$\\sin A \\sin B - \\cos A \\cos B$'], e: 'Standard subtraction formula for cosine.' },
    { q: '$\\tan(A + B)$ equals:', a: '$\\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B}$', w: ['$\\frac{\\tan A + \\tan B}{1 + \\tan A \\tan B}$', '$\\frac{\\tan A - \\tan B}{1 + \\tan A \\tan B}$', '$\\tan A + \\tan B$'], e: 'The tangent addition formula.' },
    { q: '$\\sin 2A$ equals:', a: '$2\\sin A \\cos A$', w: ['$\\sin^2 A - \\cos^2 A$', '$2\\cos^2 A - 1$', '$1 - 2\\sin^2 A$'], e: '$\\sin 2A = \\sin(A + A) = 2\\sin A \\cos A$.' },
    { q: '$\\cos 2A$ equals:', a: '$\\cos^2 A - \\sin^2 A$', w: ['$2\\sin A \\cos A$', '$\\sin^2 A - \\cos^2 A$', '$\\tan^2 A - 1$'], e: '$\\cos 2A = \\cos^2 A - \\sin^2 A$. Also equals $1-2\\sin^2 A$ or $2\\cos^2 A-1$.' },
    { q: '$\\tan 2A$ equals:', a: '$\\frac{2\\tan A}{1 - \\tan^2 A}$', w: ['$\\frac{2\\tan A}{1 + \\tan^2 A}$', '$2\\tan A$', '$\\frac{\\tan^2 A}{1 - \\tan A}$'], e: '$\\tan 2A = \\frac{2\\tan A}{1 - \\tan^2 A}$.' },
    { q: '$\\sin(A - B)$ equals:', a: '$\\sin A \\cos B - \\cos A \\sin B$', w: ['$\\sin A \\cos B + \\cos A \\sin B$', '$\\cos A \\cos B + \\sin A \\sin B$', '$\\cos A \\cos B - \\sin A \\sin B$'], e: 'Standard subtraction formula for sine.' },
    { q: '$\\cos(A + B)$ equals:', a: '$\\cos A \\cos B - \\sin A \\sin B$', w: ['$\\cos A \\cos B + \\sin A \\sin B$', '$\\sin A \\cos B + \\cos A \\sin B$', '$-\\sin A \\sin B + \\cos A \\cos B$'], e: 'Standard addition formula for cosine.' },
  ];
  const f = pick(formulas);
  return makeQ(f.q, f.a, f.w, f.e);
}

function sumDiffApplicationQ() {
  const apps = [
    { q: '$\\sin 75° = \\sin(45° + 30°)$ equals:', a: '$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$', w: ['$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$', '$\\frac{\\sqrt{3} + 1}{2}$', '$\\frac{\\sqrt{2}}{2}$'], e: '$\\sin 45°\\cos 30° + \\cos 45°\\sin 30° = \\frac{1}{\\sqrt{2}}\\cdot\\frac{\\sqrt{3}}{2} + \\frac{1}{\\sqrt{2}}\\cdot\\frac{1}{2} = \\frac{\\sqrt{6}+\\sqrt{2}}{4}$.' },
    { q: '$\\cos 75° = \\cos(45° + 30°)$ equals:', a: '$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$', w: ['$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$', '$\\frac{1}{2}$', '$\\frac{\\sqrt{3}}{2}$'], e: '$\\cos 45°\\cos 30° - \\sin 45°\\sin 30° = \\frac{\\sqrt{3}}{2\\sqrt{2}} - \\frac{1}{2\\sqrt{2}} = \\frac{\\sqrt{6}-\\sqrt{2}}{4}$.' },
    { q: '$\\sin 15° = \\sin(45° - 30°)$ equals:', a: '$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$', w: ['$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$', '$\\frac{\\sqrt{3} - 1}{4}$', '$\\frac{1}{2}$'], e: '$\\sin 45°\\cos 30° - \\cos 45°\\sin 30° = \\frac{\\sqrt{3}}{2\\sqrt{2}} - \\frac{1}{2\\sqrt{2}} = \\frac{\\sqrt{6}-\\sqrt{2}}{4}$.' },
    { q: '$\\cos 15°$ equals:', a: '$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$', w: ['$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$', '$\\frac{\\sqrt{3}}{2}$', '$\\frac{1}{2}$'], e: '$\\cos 15° = \\cos(45° - 30°) = \\cos 45°\\cos 30° + \\sin 45°\\sin 30° = \\frac{\\sqrt{6}+\\sqrt{2}}{4}$.' },
    { q: '$\\sin 2 \\times 30°$ using double angle formula:', a: '$\\frac{\\sqrt{3}}{2}$', w: ['$\\frac{1}{2}$', '$1$', '$\\frac{\\sqrt{3}}{4}$'], e: '$\\sin 60° = 2\\sin 30°\\cos 30° = 2 \\cdot \\frac{1}{2} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{\\sqrt{3}}{2}$.' },
    { q: '$\\cos 2 \\times 45°$ using double angle formula:', a: '$0$', w: ['$1$', '$-1$', '$\\frac{1}{2}$'], e: '$\\cos 90° = \\cos^2 45° - \\sin^2 45° = \\frac{1}{2} - \\frac{1}{2} = 0$.' },
  ];
  return pick(apps);
}

function doubleAngleFromGivenQ() {
  const pool = [
    () => makeQ('If $\\sin A = \\frac{3}{5}$ (A in Q-I), find $\\sin 2A$.', '$\\frac{24}{25}$', ['$\\frac{12}{25}$', '$\\frac{6}{25}$', '$\\frac{9}{25}$'], 'cos A = 4/5. sin 2A = 2(3/5)(4/5) = 24/25.', rightTriangleSVG(3, 4, 5)),
    () => makeQ('If $\\cos A = \\frac{4}{5}$ (A in Q-I), find $\\cos 2A$.', '$\\frac{7}{25}$', ['$\\frac{-7}{25}$', '$\\frac{24}{25}$', '$\\frac{1}{5}$'], 'sin A = 3/5. cos 2A = cos²A - sin²A = 16/25 - 9/25 = 7/25.', rightTriangleSVG(3, 4, 5)),
    () => makeQ('If $\\tan A = 1$ (A in Q-I), find $\\tan 2A$.', 'Undefined', ['$1$', '$2$', '$0$'], 'tan 2A = 2tan A/(1-tan²A) = 2/(1-1) = 2/0 → undefined. (A = 45°, 2A = 90°).'),
  ];
  return pick(pool)();
}

export function generateSumDiffQuestions() {
  const qs = [];
  const pool = [
    sumDiffQ, sumDiffQ, sumDiffQ, sumDiffQ, sumDiffQ, sumDiffQ,
    () => { const r = sumDiffApplicationQ(); return makeQ(r.q, r.a, r.w, r.e); },
    () => { const r = sumDiffApplicationQ(); return makeQ(r.q, r.a, r.w, r.e); },
    () => { const r = sumDiffApplicationQ(); return makeQ(r.q, r.a, r.w, r.e); },
    doubleAngleFromGivenQ, doubleAngleFromGivenQ,
    () => makeQ('$\\sin^2 A - \\sin^2 B$ equals:', '$\\sin(A+B)\\sin(A-B)$', ['$\\sin^2(A+B)$', '$\\cos(A+B)\\cos(A-B)$', '$\\sin(2A) - \\sin(2B)$'], 'Factorization identity: $\\sin^2 A - \\sin^2 B = \\sin(A+B)\\sin(A-B)$.'),
    () => makeQ('$\\cos^2 A - \\sin^2 B$ equals:', '$\\cos(A+B)\\cos(A-B)$', ['$\\sin(A+B)\\sin(A-B)$', '$\\cos(A+B) + \\sin(A-B)$', '$\\cos^2(A-B)$'], 'Identity: $\\cos^2 A - \\sin^2 B = \\cos(A+B)\\cos(A-B)$.'),
    () => makeQ('$1 - \\cos 2A$ equals:', '$2\\sin^2 A$', ['$2\\cos^2 A$', '$\\sin 2A$', '$1 + \\cos 2A$'], '$\\cos 2A = 1 - 2\\sin^2 A$, so $1 - \\cos 2A = 2\\sin^2 A$.'),
    () => makeQ('$1 + \\cos 2A$ equals:', '$2\\cos^2 A$', ['$2\\sin^2 A$', '$\\sin 2A$', '$2$'], '$\\cos 2A = 2\\cos^2 A - 1$, so $1 + \\cos 2A = 2\\cos^2 A$.'),
    () => makeQ('The formula $\\sin A + \\sin B$ equals:', '$2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}$', ['$2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}$', '$\\sin(A+B)$', '$2\\sin\\frac{A-B}{2}\\cos\\frac{A+B}{2}$'], 'Sum-to-product formula for sine.'),
    () => makeQ('$\\tan(45° + \\theta)$ equals:', '$\\frac{1 + \\tan\\theta}{1 - \\tan\\theta}$', ['$\\frac{1 - \\tan\\theta}{1 + \\tan\\theta}$', '$1 + \\tan\\theta$', '$\\tan\\theta$'], 'Use $\\tan(A+B)$ with $A = 45°$, $\\tan 45° = 1$.'),
  ];
  while (qs.length < 20) qs.push(pool[R(0, pool.length - 1)]());
  return qs;
}

export function generateSumDiffAssessment() {
  const qs = [];
  const pool = [
    sumDiffQ, sumDiffQ, sumDiffQ,
    () => { const r = sumDiffApplicationQ(); return makeQ(r.q, r.a, r.w, r.e); },
    () => { const r = sumDiffApplicationQ(); return makeQ(r.q, r.a, r.w, r.e); },
    doubleAngleFromGivenQ, doubleAngleFromGivenQ,
    () => makeQ('$\\sin A \\cos B$ expressed as sum/difference:', '$\\frac{1}{2}[\\sin(A+B) + \\sin(A-B)]$', ['$\\frac{1}{2}[\\cos(A-B) - \\cos(A+B)]$', '$\\sin(A+B) + \\sin(A-B)$', '$\\cos A \\sin B$'], 'Product-to-sum formula: $\\sin A\\cos B = \\frac{1}{2}[\\sin(A+B)+\\sin(A-B)]$.'),
    () => makeQ('$\\cos A \\cos B$ equals:', '$\\frac{1}{2}[\\cos(A-B) + \\cos(A+B)]$', ['$\\frac{1}{2}[\\cos(A-B) - \\cos(A+B)]$', '$\\cos(A+B)$', '$\\frac{1}{2}[\\sin(A+B) + \\sin(A-B)]$'], 'Product-to-sum formula.'),
    () => makeQ('$\\sin 3A$ in terms of $\\sin A$:', '$3\\sin A - 4\\sin^3 A$', ['$4\\sin^3 A - 3\\sin A$', '$3\\cos A - 4\\cos^3 A$', '$3\\sin A \\cos^2 A$'], 'Triple angle formula: $\\sin 3A = 3\\sin A - 4\\sin^3 A$.'),
    () => makeQ('$\\cos 3A$ in terms of $\\cos A$:', '$4\\cos^3 A - 3\\cos A$', ['$3\\cos A - 4\\cos^3 A$', '$4\\sin^3 A - 3\\sin A$', '$3\\cos A \\sin^2 A$'], 'Triple angle formula: $\\cos 3A = 4\\cos^3 A - 3\\cos A$.'),
    () => makeQ('$\\sin 75° - \\sin 15°$ equals:', '$\\frac{\\sqrt{6} - \\sqrt{2}}{2} + \\frac{\\sqrt{6} + \\sqrt{2}}{4}$... simplifies to $\\frac{\\sqrt{6}}{2}$', ['$\\frac{\\sqrt{2}}{2}$', '$\\frac{1}{2}$', '$1$'], 'Use sum-to-product: $2\\cos 45°\\sin 30° = 2 \\cdot \\frac{1}{\\sqrt{2}} \\cdot \\frac{1}{2} = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$.'),
    () => makeQ('$\\cos A - \\cos B$ equals:', '$-2\\sin\\frac{A+B}{2}\\sin\\frac{A-B}{2}$', ['$2\\sin\\frac{A+B}{2}\\sin\\frac{A-B}{2}$', '$-2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}$', '$2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}$'], 'Sum-to-product: $\\cos A - \\cos B = -2\\sin\\frac{A+B}{2}\\sin\\frac{A-B}{2}$.'),
    () => makeQ('Value of $\\sin 105°$ using $\\sin(60° + 45°)$:', '$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$', ['$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$', '$\\frac{\\sqrt{3} + 1}{4}$', '$\\frac{\\sqrt{2}}{2}$'], '$\\sin 60°\\cos 45° + \\cos 60°\\sin 45° = \\frac{\\sqrt{3}}{2} \\cdot \\frac{1}{\\sqrt{2}} + \\frac{1}{2} \\cdot \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{6}+\\sqrt{2}}{4}$.'),
    () => makeQ('$\\frac{\\sin 2A}{1 + \\cos 2A}$ simplifies to:', '$\\tan A$', ['$\\cot A$', '$\\sin A$', '$2\\sin A$'], '$\\frac{2\\sin A\\cos A}{2\\cos^2 A} = \\frac{\\sin A}{\\cos A} = \\tan A$.'),
    () => makeQ('$2\\cos^2 30° - 1$ equals:', '$\\frac{1}{2}$', ['$\\frac{\\sqrt{3}}{2}$', '$0$', '$1$'], '$\\cos 2 \\times 30° = \\cos 60° = \\frac{1}{2}$.'),
    () => makeQ('If $\\tan A = \\frac{1}{2}$, $\\tan B = \\frac{1}{3}$, then $\\tan(A+B)$:', '$1$', ['$\\frac{5}{6}$', '$0$', '$\\frac{1}{5}$'], '$\\frac{\\frac{1}{2}+\\frac{1}{3}}{1-\\frac{1}{6}} = \\frac{5/6}{5/6} = 1$. So $A + B = 45°$.'),
  ];
  while (qs.length < 20) qs.push(pool[R(0, pool.length - 1)]());
  return qs;
}

// ─── SKILL 6: TRIGONOMETRIC EQUATIONS ────────────────────────────────────────
const GEN_SOL = [
  { q: '$\\sin x = 0$, general solution:', a: '$x = n\\pi, \\; n \\in \\mathbb{Z}$', w: ['$x = 2n\\pi$', '$x = \\frac{n\\pi}{2}$', '$x = (2n+1)\\frac{\\pi}{2}$'], e: '$\\sin x = 0$ at $x = 0, \\pm\\pi, \\pm 2\\pi, \\ldots = n\\pi$.', svg: sineWaveSVG() },
  { q: '$\\cos x = 0$, general solution:', a: '$x = (2n+1)\\frac{\\pi}{2}, \\; n \\in \\mathbb{Z}$', w: ['$x = n\\pi$', '$x = 2n\\pi$', '$x = n\\frac{\\pi}{2}$'], e: '$\\cos x = 0$ at $x = \\pm\\frac{\\pi}{2}, \\pm\\frac{3\\pi}{2}, \\ldots$', svg: cosWaveSVG() },
  { q: '$\\tan x = 0$, general solution:', a: '$x = n\\pi, \\; n \\in \\mathbb{Z}$', w: ['$x = 2n\\pi$', '$x = (2n+1)\\frac{\\pi}{2}$', '$x = \\frac{n\\pi}{2}$'], e: '$\\tan x = 0$ when $\\sin x = 0$, i.e., at $x = n\\pi$.' },
  { q: '$\\sin x = \\sin \\alpha$, general solution:', a: '$x = n\\pi + (-1)^n \\alpha, \\; n \\in \\mathbb{Z}$', w: ['$x = 2n\\pi \\pm \\alpha$', '$x = n\\pi \\pm \\alpha$', '$x = 2n\\pi + \\alpha$'], e: 'The general solution of $\\sin x = \\sin \\alpha$ is $x = n\\pi + (-1)^n \\alpha$.' },
  { q: '$\\cos x = \\cos \\alpha$, general solution:', a: '$x = 2n\\pi \\pm \\alpha, \\; n \\in \\mathbb{Z}$', w: ['$x = n\\pi + (-1)^n \\alpha$', '$x = n\\pi \\pm \\alpha$', '$x = 2n\\pi + \\alpha$'], e: 'The general solution of $\\cos x = \\cos \\alpha$ is $x = 2n\\pi \\pm \\alpha$.', svg: cosWaveSVG() },
  { q: '$\\tan x = \\tan \\alpha$, general solution:', a: '$x = n\\pi + \\alpha, \\; n \\in \\mathbb{Z}$', w: ['$x = 2n\\pi \\pm \\alpha$', '$x = n\\pi + (-1)^n \\alpha$', '$x = 2n\\pi + \\alpha$'], e: 'The general solution of $\\tan x = \\tan \\alpha$ is $x = n\\pi + \\alpha$.' },
  { q: '$\\sin x = 1$, general solution:', a: '$x = (4n+1)\\frac{\\pi}{2}, \\; n \\in \\mathbb{Z}$', w: ['$x = 2n\\pi$', '$x = n\\pi$', '$x = (2n+1)\\pi$'], e: '$\\sin x = 1$ at $x = \\frac{\\pi}{2}, \\frac{5\\pi}{2}, \\ldots = \\frac{\\pi}{2} + 2n\\pi = (4n+1)\\frac{\\pi}{2}$.', svg: sineWaveSVG() },
  { q: '$\\cos x = 1$, general solution:', a: '$x = 2n\\pi, \\; n \\in \\mathbb{Z}$', w: ['$x = n\\pi$', '$x = (2n+1)\\frac{\\pi}{2}$', '$x = n\\pi + \\frac{\\pi}{2}$'], e: '$\\cos x = 1$ only at $x = 0, \\pm 2\\pi, \\pm 4\\pi, \\ldots$', svg: cosWaveSVG() },
];

function trigEqQ() {
  const d = pick(GEN_SOL);
  return makeQ(d.q, d.a, d.w, d.e, d.svg || '');
}

function specificEqQ() {
  const vals = [
    { q: '$\\sin x = \\frac{1}{2}$, principal value:', a: '$x = \\frac{\\pi}{6}$', w: ['$x = \\frac{\\pi}{3}$', '$x = \\frac{\\pi}{4}$', '$x = \\frac{\\pi}{2}$'], e: '$\\sin\\frac{\\pi}{6} = \\frac{1}{2}$. Principal value is $\\frac{\\pi}{6}$.', svg: sineWaveSVG() },
    { q: '$\\cos x = \\frac{\\sqrt{3}}{2}$, principal value:', a: '$x = \\frac{\\pi}{6}$', w: ['$x = \\frac{\\pi}{3}$', '$x = \\frac{\\pi}{4}$', '$x = \\frac{5\\pi}{6}$'], e: '$\\cos\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{2}$. Principal value is $\\frac{\\pi}{6}$.', svg: cosWaveSVG() },
    { q: '$\\tan x = 1$, general solution:', a: '$x = n\\pi + \\frac{\\pi}{4}$', w: ['$x = 2n\\pi + \\frac{\\pi}{4}$', '$x = n\\pi - \\frac{\\pi}{4}$', '$x = \\frac{\\pi}{4}$'], e: '$\\tan\\frac{\\pi}{4} = 1 = \\tan \\alpha$ where $\\alpha = \\frac{\\pi}{4}$. General solution: $n\\pi + \\frac{\\pi}{4}$.' },
    { q: '$\\sin x = -1$, general solution:', a: '$x = (4n-1)\\frac{\\pi}{2}, \\; n \\in \\mathbb{Z}$', w: ['$x = 2n\\pi$', '$x = n\\pi$', '$x = -\\frac{\\pi}{2}$'], e: '$\\sin x = -1$ at $x = -\\frac{\\pi}{2} + 2n\\pi = (4n-1)\\frac{\\pi}{2}$.', svg: sineWaveSVG() },
    { q: '$2\\cos^2 x - 1 = 0$, solve for $x$:', a: '$x = 2n\\pi \\pm \\frac{\\pi}{4}$', w: ['$x = n\\pi \\pm \\frac{\\pi}{4}$', '$x = n\\pi$', '$x = 2n\\pi \\pm \\frac{\\pi}{3}$'], e: '$\\cos^2 x = \\frac{1}{2}$, so $\\cos x = \\pm\\frac{1}{\\sqrt{2}}$. $x = 2n\\pi \\pm \\frac{\\pi}{4}$.' },
    { q: '$2\\sin^2 x - 3\\sin x + 1 = 0$ — first factor:', a: '$(2\\sin x - 1)(\\sin x - 1) = 0$', w: ['$(\\sin x + 1)(2\\sin x + 1) = 0$', '$(\\sin x - 1)^2 = 0$', '$(2\\sin x + 1)^2 = 0$'], e: 'Factor the quadratic: $(2\\sin x - 1)(\\sin x - 1) = 0$ gives $\\sin x = \\frac{1}{2}$ or $\\sin x = 1$.' },
  ];
  const d = pick(vals);
  return makeQ(d.q, d.a, d.w, d.e, d.svg || '');
}

export function generateTrigEquationsQuestions() {
  const qs = [];
  const pool = [
    trigEqQ, trigEqQ, trigEqQ, trigEqQ, trigEqQ, trigEqQ,
    specificEqQ, specificEqQ, specificEqQ, specificEqQ, specificEqQ,
    () => makeQ('The period of $\\sin x$ is:', '$2\\pi$', ['$\\pi$', '$\\frac{\\pi}{2}$', '$4\\pi$'], '$\\sin(x + 2\\pi) = \\sin x$ for all $x$. Period $= 2\\pi$.', sineWaveSVG()),
    () => makeQ('The period of $\\tan x$ is:', '$\\pi$', ['$2\\pi$', '$\\frac{\\pi}{2}$', '$3\\pi$'], '$\\tan(x + \\pi) = \\tan x$. Period $= \\pi$.'),
    () => makeQ('Number of solutions of $\\sin x = 2$ in $\\mathbb{R}$:', 'No solution (range of sin is $[-1, 1]$)', ['$1$ solution', '$2$ solutions', 'Infinite solutions'], '$|\\sin x| \\leq 1$ always. $\\sin x = 2$ has no real solution.'),
    () => makeQ('General solution of $\\sin x = \\sin x$ is:', 'All real numbers ($x \\in \\mathbb{R}$)', ['$x = n\\pi$', '$x = 2n\\pi$', 'No solution'], '$\\sin x = \\sin x$ is always true for any real $x$.'),
    () => makeQ('$\\sin^2 x + \\cos^2 x = 1$ is:', 'An identity (true for all $x$)', ['An equation with specific solutions', 'True only for $x = 0$', 'False'], 'Pythagorean identity: true for all real $x$, not a conditional equation.'),
    () => makeQ('Solve: $\\cos 2x = 0$.', '$x = \\frac{(2n+1)\\pi}{4}, \\; n \\in \\mathbb{Z}$', ['$x = (2n+1)\\frac{\\pi}{2}$', '$x = n\\pi$', '$x = \\frac{n\\pi}{2}$'], '$\\cos 2x = 0 \\Rightarrow 2x = (2n+1)\\frac{\\pi}{2} \\Rightarrow x = \\frac{(2n+1)\\pi}{4}$.'),
    () => makeQ('Solve: $\\tan 2x = \\tan x$.', '$x = n\\pi, \\; n \\in \\mathbb{Z}$', ['$x = \\frac{n\\pi}{2}$', '$x = 2n\\pi$', '$x = \\frac{n\\pi}{3}$'], '$\\tan 2x - \\tan x = 0$; using subtraction formula... leads to $\\sin x = 0$, so $x = n\\pi$.'),
  ];
  while (qs.length < 20) qs.push(pool[R(0, pool.length - 1)]());
  return qs;
}

export function generateTrigEquationsAssessment() {
  const qs = [];
  const pool = [
    trigEqQ, trigEqQ, trigEqQ, trigEqQ,
    specificEqQ, specificEqQ, specificEqQ, specificEqQ,
    () => makeQ('General solution of $2\\sin x - \\sqrt{3} = 0$:', '$x = n\\pi + (-1)^n \\frac{\\pi}{3}$', ['$x = 2n\\pi \\pm \\frac{\\pi}{3}$', '$x = n\\pi$', '$x = n\\pi + \\frac{\\pi}{6}$'], '$\\sin x = \\frac{\\sqrt{3}}{2} = \\sin\\frac{\\pi}{3}$. General: $n\\pi + (-1)^n \\frac{\\pi}{3}$.', sineWaveSVG()),
    () => makeQ('Solve: $\\cos^2 x = \\frac{3}{4}$.', '$x = n\\pi \\pm \\frac{\\pi}{6}$', ['$x = 2n\\pi \\pm \\frac{\\pi}{6}$', '$x = n\\pi$', '$x = 2n\\pi \\pm \\frac{\\pi}{3}$'], '$\\cos x = \\pm\\frac{\\sqrt{3}}{2}$. $x = 2n\\pi \\pm \\frac{\\pi}{6}$ OR $2n\\pi \\pm \\frac{5\\pi}{6}$, combined: $n\\pi \\pm \\frac{\\pi}{6}$.'),
    () => makeQ('$\\sin 2x = \\cos x$ implies:', '$x = (2n+1)\\frac{\\pi}{2}$ or $x = n\\pi + \\frac{\\pi}{6}$ or $x = n\\pi - \\frac{\\pi}{6}$', ['$x = n\\pi$', '$x = 2n\\pi$', '$x = \\frac{n\\pi}{2}$'], '$2\\sin x\\cos x = \\cos x \\Rightarrow \\cos x(2\\sin x - 1) = 0 \\Rightarrow \\cos x = 0$ or $\\sin x = \\frac{1}{2}$.', sineWaveSVG()),
    () => makeQ('The equation $\\sin x = k$ has solutions only when:', '$-1 \\leq k \\leq 1$', ['$k > 0$', '$k \\geq 0$', '$k$ is any real number'], 'Range of sine is $[-1, 1]$, so solutions exist iff $|k| \\leq 1$.'),
    () => makeQ('Number of solutions of $2\\tan x - \\sec^2 x = 0$ in $[0, 2\\pi]$:', '$2$', ['$1$', '$3$', '$4$'], '$2\\tan x = \\sec^2 x = 1 + \\tan^2 x \\Rightarrow \\tan^2 x - 2\\tan x + 1 = 0 \\Rightarrow (\\tan x - 1)^2 = 0 \\Rightarrow \\tan x = 1$. Solutions: $x = \\frac{\\pi}{4}, \\frac{5\\pi}{4}$.'),
    () => makeQ('General solution of $\\sin x + \\sin 3x + \\sin 5x = 0$:', '$x = \\frac{n\\pi}{3}$', ['$x = n\\pi$', '$x = \\frac{n\\pi}{6}$', '$x = \\frac{n\\pi}{2}$'], '$\\sin 5x + \\sin x = 2\\sin 3x\\cos 2x$. So $\\sin 3x(2\\cos 2x + 1) = 0$. $\\sin 3x = 0$ or $\\cos 2x = -\\frac{1}{2}$.'),
    () => makeQ('Solve $\\sin x = \\cos x$ for $x \\in [0°, 360°]$:', '$x = 45°$ and $x = 225°$', ['Only $x = 45°$', '$x = 0°$ and $x = 180°$', '$x = 90°$ and $x = 270°$'], '$\\tan x = 1$. $x = 45°$ (Q-I) and $x = 225°$ (Q-III).'),
    () => makeQ('If $\\cos(x + \\alpha) = 0$, the smallest positive solution is:', '$x = \\frac{\\pi}{2} - \\alpha$', ['$x = \\pi - \\alpha$', '$x = \\frac{\\pi}{2} + \\alpha$', '$x = \\alpha$'], '$\\cos\\theta = 0 \\Rightarrow \\theta = \\frac{\\pi}{2}$. So $x + \\alpha = \\frac{\\pi}{2} \\Rightarrow x = \\frac{\\pi}{2} - \\alpha$.'),
  ];
  while (qs.length < 20) qs.push(pool[R(0, pool.length - 1)]());
  return qs;
}

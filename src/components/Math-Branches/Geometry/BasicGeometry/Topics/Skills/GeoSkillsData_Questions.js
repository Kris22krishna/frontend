/* ══════════════════════════════════════════════════════
   GEOMETRY SKILLS — Dynamic Question Generators
   SVG-based picture questions, 20 per call, no repeats
   ══════════════════════════════════════════════════════ */

const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const qM = (question, correctAnswer, distractors, explanation, svg) => {
    const unique = Array.from(new Set(distractors)).filter(d => d !== correctAnswer);
    const opts = shuf([correctAnswer, ...unique]);
    return { question, options: opts, correct: opts.indexOf(correctAnswer), explanation, svg };
};

/* ── SVG helpers ──────────────────────────────────── */
const angleSVG = (a, b, label, color = '#0ea5e9') => {
    const r = 60, cx = 120, cy = 120;
    const toRad = d => d * Math.PI / 180;
    const x1 = cx + r * Math.cos(toRad(a)), y1 = cy - r * Math.sin(toRad(a));
    const x2 = cx + r * Math.cos(toRad(b)), y2 = cy - r * Math.sin(toRad(b));
    const sweep = (b - a) <= 180 ? 0 : 1;
    const lx = cx + 40 * Math.cos(toRad((a + b) / 2)), ly = cy - 40 * Math.sin(toRad((a + b) / 2));
    const rx = cx + 90 * Math.cos(toRad(a)), ry = cy - 90 * Math.sin(toRad(a));
    const rx2 = cx + 90 * Math.cos(toRad(b)), ry2 = cy - 90 * Math.sin(toRad(b));
    return `<svg viewBox="0 0 240 240" width="200" height="200" xmlns="http://www.w3.org/2000/svg"><line x1="${cx}" y1="${cy}" x2="${rx}" y2="${ry}" stroke="${color}" stroke-width="2.5"/><line x1="${cx}" y1="${cy}" x2="${rx2}" y2="${ry2}" stroke="${color}" stroke-width="2.5"/><path d="M ${x1} ${y1} A ${r} ${r} 0 ${sweep} 1 ${x2} ${y2}" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,3"/><text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="700" fill="#f59e0b">${label}</text><circle cx="${cx}" cy="${cy}" r="3" fill="${color}"/></svg>`;
};

const triangleSVG = (A, B, C, labels) => {
    return `<svg viewBox="0 0 240 200" width="220" height="180" xmlns="http://www.w3.org/2000/svg"><polygon points="120,20 30,170 210,170" fill="rgba(14,165,233,0.06)" stroke="#0ea5e9" stroke-width="2.5" stroke-linejoin="round"/><text x="120" y="15" text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">${labels[0]}=${A}°</text><text x="20" y="185" text-anchor="middle" font-size="13" font-weight="700" fill="#06b6d4">${labels[1]}=${B}°</text><text x="220" y="185" text-anchor="middle" font-size="13" font-weight="700" fill="#0891b2">${labels[2]}=${C}°</text></svg>`;
};

const polygonSVG = (n, label) => {
    const cx = 110, cy = 110, r = 80;
    let pts = '';
    for (let i = 0; i < n; i++) {
        const ang = (2 * Math.PI * i / n) - Math.PI / 2;
        pts += `${cx + r * Math.cos(ang)},${cy + r * Math.sin(ang)} `;
    }
    return `<svg viewBox="0 0 220 220" width="200" height="200" xmlns="http://www.w3.org/2000/svg"><polygon points="${pts.trim()}" fill="rgba(14,165,233,0.06)" stroke="#0ea5e9" stroke-width="2.5" stroke-linejoin="round"/><text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="700" fill="#0891b2">${label}</text></svg>`;
};

/* ══════════════════════════════════════════════════════
   SKILL 1 — ANGLE RELATIONSHIPS (Practice + Assess)
   ══════════════════════════════════════════════════════ */
export const genAngleRelP = () => {
    const qs = [];
    // Complementary angles
    for (let i = 0; i < 6; i++) {
        const a = R(10, 75);
        const ans = 90 - a;
        qs.push(qM(
            `Two angles are complementary. One angle is ${a}°. Find the other angle.`,
            `${ans}°`, [`${180 - a}°`, `${a}°`, `${ans + 10}°`],
            `Complementary angles sum to 90°. So the other angle = 90° − ${a}° = ${ans}°.`,
            angleSVG(0, a, `${a}°`)
        ));
    }
    // Supplementary angles
    for (let i = 0; i < 6; i++) {
        const a = R(20, 150);
        const ans = 180 - a;
        qs.push(qM(
            `Two angles are supplementary. One angle is ${a}°. Find the other angle.`,
            `${ans}°`, [`${90 - a > 0 ? 90 - a : a}°`, `${a}°`, `${ans + 5}°`],
            `Supplementary angles sum to 180°. So the other angle = 180° − ${a}° = ${ans}°.`,
            angleSVG(0, a, `${a}°`, '#8b5cf6')
        ));
    }
    // Vertically opposite
    for (let i = 0; i < 5; i++) {
        const a = R(25, 155);
        qs.push(qM(
            `Two straight lines intersect. One angle formed is ${a}°. What is the vertically opposite angle?`,
            `${a}°`, [`${180 - a}°`, `${90}°`, `${360 - a}°`],
            `Vertically opposite angles are equal. So the answer is ${a}°.`,
            angleSVG(0, a, `${a}°`, '#f43f5e')
        ));
    }
    // Linear pair
    for (let i = 0; i < 5; i++) {
        const a = R(30, 150);
        const ans = 180 - a;
        qs.push(qM(
            `Angles on a straight line: one angle is ${a}°. Find the adjacent angle.`,
            `${ans}°`, [`${a}°`, `${360 - a}°`, `${90}°`],
            `Angles on a straight line (linear pair) sum to 180°. Answer = 180° − ${a}° = ${ans}°.`,
            angleSVG(0, a, `${a}°`, '#10b981')
        ));
    }
    // Angle at a point
    for (let i = 0; i < 4; i++) {
        const a = R(40, 160);
        const b = R(40, 200 - a);
        const ans = 360 - a - b;
        qs.push(qM(
            `Three angles meet at a point. Two of them are ${a}° and ${b}°. Find the third.`,
            `${ans}°`, [`${180 - a}°`, `${a + b}°`, `${ans + 10}°`],
            `Angles at a point sum to 360°. Third = 360° − ${a}° − ${b}° = ${ans}°.`,
            null
        ));
    }
    return shuf(qs).slice(0, 20);
};

export const genAngleRelA = () => {
    const qs = [];
    for (let i = 0; i < 7; i++) {
        const a = R(12, 78);
        const ans = 90 - a;
        qs.push(qM(`If ∠A = ${a}° and ∠A + ∠B = 90°, find ∠B.`, `${ans}°`, [`${180 - a}°`, `${a}°`, `${ans + 5}°`], `∠B = 90° − ${a}° = ${ans}°.`, angleSVG(0, a, `${a}°`)));
    }
    for (let i = 0; i < 7; i++) {
        const a = R(25, 155);
        const ans = 180 - a;
        qs.push(qM(`∠P and ∠Q form a linear pair. If ∠P = ${a}°, find ∠Q.`, `${ans}°`, [`${a}°`, `${90}°`, `${360 - a}°`], `Linear pair sums to 180°. ∠Q = 180° − ${a}° = ${ans}°.`, angleSVG(0, a, `${a}°`, '#8b5cf6')));
    }
    for (let i = 0; i < 6; i++) {
        const a = R(30, 150);
        qs.push(qM(`Two lines intersect. If one angle is ${a}°, find ALL four angles formed.`, `${a}°, ${180 - a}°, ${a}°, ${180 - a}°`, [`${a}°, ${a}°, ${a}°, ${a}°`, `${90}°, ${90}°, ${90}°, ${90}°`, `${a}°, ${180 - a}°, ${90}°, ${90}°`], `Vertically opposite angles are equal. Adjacent angles are supplementary.`, angleSVG(0, a, `${a}°`, '#f43f5e')));
    }
    for (let i = 0; i < 5; i++) {
        const a = R(30, 120); const b = R(30, 170 - a);
        const ans = 360 - a - b;
        qs.push(qM(`Three angles around a point: ${a}°, ${b}°, and x°. Find x.`, `${ans}°`, [`${180 - a}°`, `${a + b}°`, `${ans - 10}°`], `Sum = 360°. x = 360° − ${a}° − ${b}° = ${ans}°.`, null));
    }
    return shuf(qs).slice(0, 20);
};

/* ══════════════════════════════════════════════════════
   SKILL 2 — TRIANGLE PROPERTIES (Practice + Assess)
   ══════════════════════════════════════════════════════ */
export const genTriangleP = () => {
    const qs = [];
    // Angle sum
    for (let i = 0; i < 7; i++) {
        const a = R(20, 80), b = R(20, 140 - a);
        const c = 180 - a - b;
        qs.push(qM(
            `In △ABC, ∠A = ${a}° and ∠B = ${b}°. Find ∠C.`,
            `${c}°`, [`${a + b}°`, `${180 - a}°`, `${c + 10}°`],
            `Angle sum property: ∠C = 180° − ${a}° − ${b}° = ${c}°.`,
            triangleSVG(a, b, '?', ['∠A', '∠B', '∠C'])
        ));
    }
    // Exterior angle
    for (let i = 0; i < 6; i++) {
        const a = R(30, 80), b = R(30, 80);
        const ext = a + b;
        qs.push(qM(
            `In △PQR, ∠P = ${a}° and ∠Q = ${b}°. Find the exterior angle at R.`,
            `${ext}°`, [`${180 - ext}°`, `${a}°`, `${b}°`],
            `Exterior angle = sum of remote interior angles = ${a}° + ${b}° = ${ext}°.`,
            triangleSVG(a, b, 180 - a - b, ['∠P', '∠Q', '∠R'])
        ));
    }
    // Isosceles
    for (let i = 0; i < 4; i++) {
        const base = R(30, 100);
        const equal = (180 - base) / 2;
        if (equal !== Math.floor(equal)) continue;
        qs.push(qM(
            `An isosceles triangle has a vertex angle of ${base}°. Find each base angle.`,
            `${equal}°`, [`${180 - base}°`, `${base}°`, `${equal + 10}°`],
            `Base angles = (180° − ${base}°) / 2 = ${equal}°.`,
            triangleSVG(base, equal, equal, ['vertex', 'base', 'base'])
        ));
    }
    // Equilateral
    for (let i = 0; i < 3; i++) {
        qs.push(qM(
            `What is each angle of an equilateral triangle?`,
            `60°`, [`90°`, `45°`, `120°`],
            `All three angles are equal: 180° / 3 = 60°.`,
            triangleSVG(60, 60, 60, ['60°', '60°', '60°'])
        ));
    }
    // Right triangle
    for (let i = 0; i < 5; i++) {
        const a = R(10, 79);
        const b = 90 - a;
        qs.push(qM(
            `In a right triangle, one acute angle is ${a}°. Find the other acute angle.`,
            `${b}°`, [`${180 - a}°`, `${90}°`, `${a}°`],
            `Other acute angle = 90° − ${a}° = ${b}°.`,
            triangleSVG(90, a, b, ['90°', `${a}°`, '?'])
        ));
    }
    return shuf(qs).slice(0, 20);
};

export const genTriangleA = () => {
    const qs = [];
    for (let i = 0; i < 8; i++) {
        const a = R(25, 75), b = R(25, 130 - a);
        const c = 180 - a - b;
        qs.push(qM(`△XYZ: ∠X = ${a}°, ∠Y = ${b}°. Find ∠Z.`, `${c}°`, [`${a + b}°`, `${c + 5}°`, `${180 - a}°`], `∠Z = 180° − ${a}° − ${b}° = ${c}°.`, triangleSVG(a, b, '?', ['∠X', '∠Y', '∠Z'])));
    }
    for (let i = 0; i < 6; i++) {
        const a = R(25, 70), b = R(25, 70);
        const ext = a + b;
        qs.push(qM(`Exterior angle at vertex C of △ABC = x°. If ∠A = ${a}° and ∠B = ${b}°, find x.`, `${ext}°`, [`${180 - ext}°`, `${a}°`, `${180}°`], `x = ∠A + ∠B = ${a}° + ${b}° = ${ext}°.`, triangleSVG(a, b, 180 - a - b, ['∠A', '∠B', '∠C'])));
    }
    for (let i = 0; i < 6; i++) {
        const s = R(3, 15);
        const area = (Math.sqrt(3) / 4) * s * s;
        const areaRound = Math.round(area * 100) / 100;
        qs.push(qM(
            `An equilateral triangle has side ${s} cm. Its area = (√3/4) × s². Calculate.`,
            `${areaRound} cm²`, [`${s * s} cm²`, `${(s * 3)} cm²`, `${Math.round(area + 5)} cm²`],
            `Area = (√3/4) × ${s}² = (√3/4) × ${s * s} ≈ ${areaRound} cm².`, null
        ));
    }
    return shuf(qs).slice(0, 20);
};

/* ══════════════════════════════════════════════════════
   SKILL 3 — POLYGON PROPERTIES (Practice + Assess)
   ══════════════════════════════════════════════════════ */
const polyNames = { 3: 'triangle', 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon' };

export const genPolygonP = () => {
    const qs = [];
    // Interior angle sum
    for (let i = 0; i < 6; i++) {
        const n = R(4, 10);
        const sum = (n - 2) * 180;
        qs.push(qM(
            `Find the sum of interior angles of a ${polyNames[n]} (${n} sides).`,
            `${sum}°`, [`${n * 180}°`, `${sum + 180}°`, `${360}°`],
            `Sum = (n − 2) × 180° = (${n} − 2) × 180° = ${sum}°.`,
            polygonSVG(n, `${n} sides`)
        ));
    }
    // Each interior angle of regular polygon
    for (let i = 0; i < 6; i++) {
        const n = R(3, 10);
        const each = ((n - 2) * 180) / n;
        const eachR = Math.round(each * 100) / 100;
        qs.push(qM(
            `Each interior angle of a regular ${polyNames[n] || n + '-gon'} = ?`,
            `${eachR}°`, [`${180}°`, `${360 / n}°`, `${eachR + 10}°`],
            `Each = (n − 2) × 180° / n = ${(n - 2) * 180}° / ${n} = ${eachR}°.`,
            polygonSVG(n, `regular`)
        ));
    }
    // Exterior angle of regular polygon
    for (let i = 0; i < 5; i++) {
        const n = R(3, 12);
        const ext = 360 / n;
        const extR = Math.round(ext * 100) / 100;
        qs.push(qM(
            `Each exterior angle of a regular ${n}-sided polygon = ?`,
            `${extR}°`, [`${(n - 2) * 180 / n}°`, `${180}°`, `${extR + 10}°`],
            `Each exterior angle = 360° / n = 360° / ${n} = ${extR}°.`,
            polygonSVG(n, `ext∠?`)
        ));
    }
    // Number of diagonals
    for (let i = 0; i < 5; i++) {
        const n = R(4, 10);
        const d = n * (n - 3) / 2;
        qs.push(qM(
            `How many diagonals does a ${polyNames[n] || n + '-gon'} have?`,
            `${d}`, [`${n}`, `${n - 1}`, `${d + 2}`],
            `Diagonals = n(n − 3)/2 = ${n}(${n - 3})/2 = ${d}.`,
            polygonSVG(n, `diag?`)
        ));
    }
    // Find n from exterior angle
    for (let i = 0; i < 4; i++) {
        const n = R(3, 12);
        const ext = 360 / n;
        if (ext !== Math.floor(ext)) continue;
        qs.push(qM(
            `Each exterior angle of a regular polygon is ${ext}°. How many sides does it have?`,
            `${n}`, [`${ext}`, `${360 - ext}`, `${n + 2}`],
            `n = 360° / ${ext}° = ${n}.`,
            null
        ));
    }
    return shuf(qs).slice(0, 20);
};

export const genPolygonA = () => {
    const qs = [];
    for (let i = 0; i < 7; i++) {
        const n = R(4, 10);
        const sum = (n - 2) * 180;
        qs.push(qM(`Sum of interior angles of a ${n}-sided polygon?`, `${sum}°`, [`${n * 180}°`, `${sum - 180}°`, `${360}°`], `(${n} − 2) × 180° = ${sum}°.`, polygonSVG(n, `${n}-gon`)));
    }
    for (let i = 0; i < 7; i++) {
        const n = R(3, 10);
        const each = Math.round(((n - 2) * 180) / n * 100) / 100;
        qs.push(qM(`Interior angle of a regular ${n}-gon?`, `${each}°`, [`${360 / n}°`, `${180}°`, `${each + 15}°`], `(${n} − 2) × 180° / ${n} = ${each}°.`, polygonSVG(n, `regular`)));
    }
    for (let i = 0; i < 6; i++) {
        const n = R(3, 12);
        const ext = Math.round(360 / n * 100) / 100;
        qs.push(qM(`Exterior angle of a regular ${n}-sided polygon?`, `${ext}°`, [`${(n - 2) * 180 / n}°`, `${180}°`, `${ext + 5}°`], `360° / ${n} = ${ext}°.`, polygonSVG(n, `ext∠?`)));
    }
    for (let i = 0; i < 5; i++) {
        const n = R(4, 10);
        const d = n * (n - 3) / 2;
        qs.push(qM(`Diagonals of a ${n}-gon?`, `${d}`, [`${n}`, `${n * 2}`, `${d + 3}`], `n(n−3)/2 = ${n}(${n - 3})/2 = ${d}.`, polygonSVG(n, `${n}-gon`)));
    }
    return shuf(qs).slice(0, 20);
};

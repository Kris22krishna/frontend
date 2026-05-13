const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const qM = (question, correctAnswer, distractors, explanation, svg = '') => {
    const unique = Array.from(new Set(distractors)).filter(d => String(d) !== String(correctAnswer));
    const opts = shuf([correctAnswer, ...unique]);
    return { question, options: opts, correct: opts.indexOf(correctAnswer), explanation, svg };
};

/* ── SVG HELPERS ── */
const toR = d => d * Math.PI / 180;
const angleArc = (cx, cy, r, startDeg, endDeg, color = '#f59e0b', label = '') => {
    const x1 = cx + r * Math.cos(toR(startDeg)), y1 = cy - r * Math.sin(toR(startDeg));
    const x2 = cx + r * Math.cos(toR(endDeg)), y2 = cy - r * Math.sin(toR(endDeg));
    // CCW span handles wrap-around (e.g. 330°→55° = 85°, not 275°)
    const ccwSpan = ((endDeg - startDeg) % 360 + 360) % 360;
    const large = ccwSpan > 180 ? 1 : 0;
    const midDeg = startDeg + ccwSpan / 2;
    const lx = cx + (r + 14) * Math.cos(toR(midDeg));
    const ly = cy - (r + 14) * Math.sin(toR(midDeg));
    return `<path d="M${x1},${y1} A${r},${r} 0 ${large},0 ${x2},${y2}" fill="none" stroke="${color}" stroke-width="1.8"/>${label ? `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="central" font-size="11" fill="${color}" font-weight="700">${label}</text>` : ''}`;
};
const tick = (x1, y1, x2, y2, n = 1, color = '#10b981') => {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / len * 6, ny = dx / len * 6; let s = '';
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 4; s += `<line x1="${mx + nx + dx / len * o}" y1="${my + ny + dy / len * o}" x2="${mx - nx + dx / len * o}" y2="${my - ny + dy / len * o}" stroke="${color}" stroke-width="2"/>`; }
    return s;
};
const rightBox = (vx, vy, ax, ay, bx, by, size = 10) => {
    // place a right-angle square at vertex (vx,vy), oriented along the two legs toward (ax,ay) and (bx,by)
    const dax = ax - vx, day = ay - vy, dab = Math.sqrt(dax * dax + day * day);
    const dbx = bx - vx, dby = by - vy, dbb = Math.sqrt(dbx * dbx + dby * dby);
    const ux = dax / dab * size, uy = day / dab * size;
    const wx = dbx / dbb * size, wy = dby / dbb * size;
    return `<polyline points="${vx + ux},${vy + uy} ${vx + ux + wx},${vy + uy + wy} ${vx + wx},${vy + wy}" fill="none" stroke="#f59e0b" stroke-width="1.5"/>`;
};
const svgWrap = (inner) => `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a;border-radius:8px">${inner}</svg>`;

/* ── SKILL 1: Pythagorean Theorem ── */

// SVG: right triangle with legs labeled; mode: 'hyp' | 'leg' | 'check'
const pythSvg = (A, B, C, mode) => {
    // Fixed layout: right angle at bottom-left (30,170), base goes right to (200,170), apex up-left
    const rx = 30, ry = 170;   // right-angle vertex
    const bx = 200, by = 170;  // end of base (leg A along bottom)
    // Place apex so leg B is vertical-ish
    const ax = 30, ay = 50;    // apex (leg B along left side)

    const legALabel = mode === 'hyp' ? `${A}` : mode === 'leg' ? `${A}` : `${A}`;
    const legBLabel = mode === 'hyp' ? `${B}` : mode === 'leg' ? `${B}` : `${B}`;
    const hypLabel  = mode === 'hyp' ? '?' : mode === 'leg' ? `${C}` : `${C}`;

    const midBase = { x: (rx + bx) / 2, y: ry + 16 };
    const midLeft = { x: (rx + ax) / 2 - 16, y: (ry + ay) / 2 };
    const midHyp  = { x: (ax + bx) / 2 + 10, y: (ay + by) / 2 - 8 };

    return svgWrap(
        `<polygon points="${ax},${ay} ${rx},${ry} ${bx},${by}" fill="none" stroke="#0ea5e9" stroke-width="2.2"/>` +
        rightBox(rx, ry, ax, ay, bx, by) +
        `<text x="${midBase.x}" y="${midBase.y}" text-anchor="middle" font-size="13" fill="#f59e0b" font-weight="700">${legALabel}</text>` +
        `<text x="${midLeft.x}" y="${midLeft.y}" text-anchor="middle" font-size="13" fill="#f59e0b" font-weight="700">${legBLabel}</text>` +
        `<text x="${midHyp.x}" y="${midHyp.y}" text-anchor="middle" font-size="13" fill="${mode === 'hyp' ? '#ef4444' : '#f59e0b'}" font-weight="700">${hypLabel}</text>` +
        `<text x="${ax - 8}" y="${ay}" text-anchor="end" font-size="11" fill="#94a3b8">A</text>` +
        `<text x="${rx - 8}" y="${ry + 4}" text-anchor="end" font-size="11" fill="#94a3b8">B</text>` +
        `<text x="${bx + 6}" y="${by + 4}" font-size="11" fill="#94a3b8">C</text>`
    );
};

// SVG for "find missing leg": hyp labeled, one leg labeled, other with '?'
const pythLegSvg = (A, _B, C) => {
    const rx = 30, ry = 170, bx = 200, by = 170, ax = 30, ay = 50;
    const midBase = { x: (rx + bx) / 2, y: ry + 16 };
    const midLeft = { x: (rx + ax) / 2 - 16, y: (ry + ay) / 2 };
    const midHyp  = { x: (ax + bx) / 2 + 10, y: (ay + by) / 2 - 8 };
    return svgWrap(
        `<polygon points="${ax},${ay} ${rx},${ry} ${bx},${by}" fill="none" stroke="#0ea5e9" stroke-width="2.2"/>` +
        rightBox(rx, ry, ax, ay, bx, by) +
        `<text x="${midBase.x}" y="${midBase.y}" text-anchor="middle" font-size="13" fill="#f59e0b" font-weight="700">${A}</text>` +
        `<text x="${midLeft.x}" y="${midLeft.y}" text-anchor="middle" font-size="13" fill="#ef4444" font-weight="700">?</text>` +
        `<text x="${midHyp.x}" y="${midHyp.y}" text-anchor="middle" font-size="13" fill="#f59e0b" font-weight="700">${C}</text>` +
        `<text x="${ax - 8}" y="${ay}" text-anchor="end" font-size="11" fill="#94a3b8">A</text>` +
        `<text x="${rx - 8}" y="${ry + 4}" text-anchor="end" font-size="11" fill="#94a3b8">B</text>` +
        `<text x="${bx + 6}" y="${by + 4}" font-size="11" fill="#94a3b8">C</text>`
    );
};

export const genPythagorasP = () => {
    const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41], [6, 8, 10], [9, 12, 15], [12, 16, 20]];
    const qs = [];
    for (let i = 0; i < 20; i++) {
        const [a, b, c] = triples[i % triples.length];
        const k = R(1, 3);
        const [A, B, C] = [a * k, b * k, c * k];
        const type = i % 3;
        if (type === 0) {
            const svg = pythSvg(A, B, C, 'hyp');
            qs.push(qM(
                `A right triangle has legs ${A} and ${B}. Find the hypotenuse.`,
                `${C}`,
                [`${C + 2}`, `${C - 1}`, `${A + B}`],
                `Use $$a^2+b^2=c^2$$: $$${A}^2+${B}^2=${A * A + B * B}=c^2$$, so $$c=${C}$$.`,
                svg
            ));
        } else if (type === 1) {
            const svg = pythLegSvg(A, B, C);
            qs.push(qM(
                `A right triangle has hypotenuse ${C} and one leg ${A}. Find the other leg.`,
                `${B}`,
                [`${B + 3}`, `${B - 2}`, `${C - A}`],
                `$$b^2=c^2-a^2=${C * C}-${A * A}=${B * B}$$, so $$b=${B}$$.`,
                svg
            ));
        } else {
            const svg = pythSvg(A, B, C, 'check');
            qs.push(qM(
                `Is a triangle with sides ${A}, ${B}, ${C} a right triangle?`,
                'Yes',
                ['No', 'Cannot be determined', 'Only if angles are given'],
                `$$${A}^2+${B}^2=${A * A + B * B}=${C * C}=${C}^2$$ ✓ Right triangle.`,
                svg
            ));
        }
    }
    return qs;
};

export const genPythagorasA = () => genPythagorasP().slice(0, 15);

/* ── SKILL 2: Triangle Area ── */

const triAreaSvg = (base, height, findHeight = false) => {
    // Generic triangle: A at top-center, B at bottom-left, C at bottom-right
    const Bx = 30, By = 175, Cx = 210, Cy = 175;
    const Ax = (Bx + Cx) / 2, Ay = 175 - height * 4; // scale height for display
    const displayAy = Math.max(30, Math.min(130, Ay));
    // foot of altitude from A to BC
    const Fx = Ax, Fy = By;

    const baseLabel = `${base}`;
    const heightLabel = findHeight ? '?' : `${height}`;

    return svgWrap(
        `<polygon points="${Ax},${displayAy} ${Bx},${By} ${Cx},${Cy}" fill="none" stroke="#0ea5e9" stroke-width="2.2"/>` +
        `<line x1="${Ax}" y1="${displayAy}" x2="${Fx}" y2="${Fy}" stroke="#10b981" stroke-width="1.8" stroke-dasharray="5,3"/>` +
        rightBox(Fx, Fy, Ax, displayAy, Cx, Cy) +
        `<text x="${(Bx + Cx) / 2}" y="${By + 16}" text-anchor="middle" font-size="13" fill="#f59e0b" font-weight="700">${baseLabel}</text>` +
        `<text x="${Ax + 12}" y="${(displayAy + Fy) / 2}" text-anchor="start" font-size="13" fill="${findHeight ? '#ef4444' : '#f59e0b'}" font-weight="700">${heightLabel}</text>` +
        `<text x="${Ax}" y="${displayAy - 8}" text-anchor="middle" font-size="11" fill="#94a3b8">A</text>` +
        `<text x="${Bx - 8}" y="${By + 4}" text-anchor="end" font-size="11" fill="#94a3b8">B</text>` +
        `<text x="${Cx + 6}" y="${Cy + 4}" font-size="11" fill="#94a3b8">C</text>` +
        `<text x="${Ax - 12}" y="${(displayAy + Fy) / 2 + 4}" text-anchor="end" font-size="10" fill="#10b981">h</text>`
    );
};

export const genTriAreaP = () => {
    const qs = [];
    for (let i = 0; i < 20; i++) {
        const b = R(4, 20) * 2;
        const h = R(3, 15) * 2;
        const area = (b * h) / 2;
        const type = i % 2;
        if (type === 0) {
            const svg = triAreaSvg(b, h, false);
            qs.push(qM(
                `Find the area of a triangle with base ${b} cm and height ${h} cm.`,
                `${area} cm²`,
                [`${b * h} cm²`, `${area + 10} cm²`, `${area - 5} cm²`],
                `Area = ½ × base × height = ½ × ${b} × ${h} = ${area} cm².`,
                svg
            ));
        } else {
            const svg = triAreaSvg(b, h, true);
            qs.push(qM(
                `A triangle has area ${area} cm² and base ${b} cm. Find its height.`,
                `${h} cm`,
                [`${h + 4} cm`, `${h - 2} cm`, `${b} cm`],
                `h = 2 × Area ÷ base = 2 × ${area} ÷ ${b} = ${h} cm.`,
                svg
            ));
        }
    }
    return qs;
};

export const genTriAreaA = () => genTriAreaP().slice(0, 15);

/* ── SKILL 3: Angle Sum Property ── */

// Generic triangle with three angle labels at each vertex
const angleSvg = (angA, angB, angC, opts = {}) => {
    // Vertices: A at top, B at bottom-left, C at bottom-right
    const Ax = 115, Ay = 28;
    const Bx = 22, By = 182;
    const Cx = 208, Cy = 182;

    const {
        isoTicks = false,       // show equality ticks on AB and AC
        extAngle = false,       // draw exterior angle at C
        extLabel = '',
        labelA = `${angA}°`,
        labelB = `${angB}°`,
        labelC = `${angC}°`,
    } = opts;

    // Angle arcs — ranges derived from actual vertex directions for this triangle layout
    // A(115,28): sides go to B(22,182)≈238.8° and C(208,182)≈301.2°
    const arcA = angleArc(Ax, Ay, 18, 239, 301, '#f59e0b', labelA);
    // B(22,182): sides go to C(208,182)=0° and A(115,28)≈59°
    const arcB = angleArc(Bx, By, 20, 0, 59, '#f59e0b', labelB);
    // C(208,182): sides go to A(115,28)≈122° and B(22,182)=180°
    const arcC = angleArc(Cx, Cy, 20, 122, 180, '#f59e0b', labelC);

    let extras = '';
    if (isoTicks) {
        extras += tick(Ax, Ay, Bx, By, 1, '#10b981');
        extras += tick(Ax, Ay, Cx, Cy, 1, '#10b981');
    }

    let extPart = '';
    if (extAngle) {
        // Extend only from C rightward (not the full B→C side)
        const Ex = Cx + 50, Ey = Cy;
        extPart =
            `<line x1="${Cx}" y1="${Cy}" x2="${Ex}" y2="${Ey}" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="4,3"/>` +
            // Exterior arc from extension direction (0°) to direction C→A (≈122°)
            angleArc(Cx, Cy, 26, 0, 122, '#ef4444', extLabel);
    }

    return svgWrap(
        `<polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" fill="none" stroke="#0ea5e9" stroke-width="2.2"/>` +
        arcA + arcB + arcC + extras + extPart +
        `<text x="${Ax}" y="${Ay - 10}" text-anchor="middle" font-size="11" fill="#94a3b8">A</text>` +
        `<text x="${Bx - 10}" y="${By + 5}" text-anchor="end" font-size="11" fill="#94a3b8">B</text>` +
        `<text x="${Cx + 8}" y="${Cy + 5}" font-size="11" fill="#94a3b8">C</text>`
    );
};

export const genAngleSumP = () => {
    const qs = [];
    for (let i = 0; i < 20; i++) {
        const a = R(20, 80);
        const b = R(20, 80);
        const c = 180 - a - b;
        if (c <= 0 || c >= 180) {
            const svg = angleSvg(60, 60, 60, { labelA: '60°', labelB: '60°', labelC: '60°' });
            qs.push(qM(
                `What is the sum of interior angles of any triangle?`,
                `180°`,
                ['90°', '270°', '360°'],
                `The angle sum property states all three interior angles sum to 180°.`,
                svg
            ));
            continue;
        }
        const type = i % 3;
        if (type === 0) {
            const svg = angleSvg(a, b, c, { labelA: `${a}°`, labelB: `${b}°`, labelC: '?' });
            qs.push(qM(
                `A triangle has angles ${a}° and ${b}°. Find the third angle.`,
                `${c}°`,
                [`${c + 10}°`, `${c - 5}°`, `${180 - a}°`],
                `Third angle = 180° − ${a}° − ${b}° = ${c}°.`,
                svg
            ));
        } else if (type === 1) {
            const base = Math.round((180 - a) / 2);
            const svg = angleSvg(a, base, base, {
                isoTicks: true,
                labelA: `${a}°`,
                labelB: '?',
                labelC: '?',
            });
            qs.push(qM(
                `An isosceles triangle has a vertex angle of ${a}°. Find each base angle.`,
                `${base}°`,
                [`${a}°`, `${180 - a}°`, `${base + 5}°`],
                `Base angles = (180° − ${a}°) ÷ 2 = ${base}°.`,
                svg
            ));
        } else {
            const ext = a + b;
            const svg = angleSvg(a, b, c, {
                extAngle: true,
                extLabel: `${ext}°`,
                labelA: `${a}°`,
                labelB: `${b}°`,
                labelC: `${c}°`,
            });
            qs.push(qM(
                `The exterior angle of a triangle is ${ext}°. One remote interior angle is ${a}°. Find the other.`,
                `${b}°`,
                [`${ext}°`, `${180 - ext}°`, `${b + 10}°`],
                `Other remote interior angle = exterior − ${a}° = ${ext}° − ${a}° = ${b}°.`,
                svg
            ));
        }
    }
    return qs;
};

export const genAngleSumA = () => genAngleSumP().slice(0, 15);

/* ── SKILL 4: Congruence & Similarity ── */

// Two triangles side by side with tick/arc marks
const congrSvg = (rule) => {
    // Left triangle: A(40,30) B(15,170) C(130,170)
    const L = { A: [40, 30], B: [15, 170], C: [130, 170] };
    // Right triangle: P(160,30) Q(140,170) R(220,170)
    const T = { P: [160, 30], Q: [140, 170], R: [220, 170] };

    const tri1 = `<polygon points="${L.A} ${L.B} ${L.C}" fill="none" stroke="#0ea5e9" stroke-width="2"/>`;
    const tri2 = `<polygon points="${T.P} ${T.Q} ${T.R}" fill="none" stroke="#0ea5e9" stroke-width="2"/>`;

    const labels1 = `<text x="${L.A[0]}" y="${L.A[1] - 8}" text-anchor="middle" font-size="10" fill="#94a3b8">A</text>` +
        `<text x="${L.B[0] - 8}" y="${L.B[1] + 4}" text-anchor="end" font-size="10" fill="#94a3b8">B</text>` +
        `<text x="${L.C[0] + 6}" y="${L.C[1] + 4}" font-size="10" fill="#94a3b8">C</text>`;
    const labels2 = `<text x="${T.P[0]}" y="${T.P[1] - 8}" text-anchor="middle" font-size="10" fill="#94a3b8">P</text>` +
        `<text x="${T.Q[0] - 8}" y="${T.Q[1] + 4}" text-anchor="end" font-size="10" fill="#94a3b8">Q</text>` +
        `<text x="${T.R[0] + 6}" y="${T.R[1] + 4}" font-size="10" fill="#94a3b8">R</text>`;

    let marks = '';
    if (rule === 'SSS') {
        marks += tick(...L.A, ...L.B, 1) + tick(...T.P, ...T.Q, 1);
        marks += tick(...L.A, ...L.C, 2) + tick(...T.P, ...T.R, 2);
        marks += tick(...L.B, ...L.C, 3) + tick(...T.Q, ...T.R, 3);
    } else if (rule === 'SAS') {
        marks += tick(...L.A, ...L.B, 1) + tick(...T.P, ...T.Q, 1);
        marks += tick(...L.B, ...L.C, 2) + tick(...T.Q, ...T.R, 2);
        marks += angleArc(L.B[0], L.B[1], 18, 5, 55, '#f59e0b');
        marks += angleArc(T.Q[0], T.Q[1], 18, 5, 55, '#f59e0b');
    } else if (rule === 'ASA') {
        marks += tick(...L.A, ...L.C, 1) + tick(...T.P, ...T.R, 1);
        marks += angleArc(L.A[0], L.A[1], 18, 220, 310, '#f59e0b');
        marks += angleArc(T.P[0], T.P[1], 18, 220, 310, '#f59e0b');
        marks += angleArc(L.C[0], L.C[1], 18, 100, 170, '#f59e0b');
        marks += angleArc(T.R[0], T.R[1], 18, 100, 170, '#f59e0b');
    } else if (rule === 'AAS') {
        marks += tick(...L.B, ...L.C, 1) + tick(...T.Q, ...T.R, 1);
        marks += angleArc(L.A[0], L.A[1], 18, 220, 310, '#f59e0b');
        marks += angleArc(T.P[0], T.P[1], 18, 220, 310, '#f59e0b');
        marks += angleArc(L.B[0], L.B[1], 18, 5, 55, '#f59e0b');
        marks += angleArc(T.Q[0], T.Q[1], 18, 5, 55, '#f59e0b');
    } else if (rule === 'RHS') {
        marks += tick(...L.A, ...L.B, 2) + tick(...T.P, ...T.Q, 2);
        marks += tick(...L.B, ...L.C, 1) + tick(...T.Q, ...T.R, 1);
        marks += rightBox(L.B[0], L.B[1], L.A[0], L.A[1], L.C[0], L.C[1]);
        marks += rightBox(T.Q[0], T.Q[1], T.P[0], T.P[1], T.R[0], T.R[1]);
    }

    return svgWrap(tri1 + tri2 + labels1 + labels2 + marks);
};

// Two similar triangles of different sizes with side labels
const simSvg = (p, q, side, _corresponding) => {
    // Smaller triangle (ratio p)
    const SAx = 70, SAy = 45, SBx = 22, SBy = 170, SCx = 118, SCy = 170;
    // Larger triangle (ratio q), scaled
    const scale = q / p;
    const LAx = 170, LAy = 45;
    const LBx = Math.round(170 + (SBx - SAx) * scale * 0.65);
    const LBy = 170;
    const LCx = Math.round(170 + (SCx - SAx) * scale * 0.65);
    const LCy = 170;

    return svgWrap(
        `<polygon points="${SAx},${SAy} ${SBx},${SBy} ${SCx},${SCy}" fill="none" stroke="#0ea5e9" stroke-width="2"/>` +
        `<polygon points="${LAx},${LAy} ${LBx},${LBy} ${LCx},${LCy}" fill="none" stroke="#0ea5e9" stroke-width="2"/>` +
        `<text x="${(SBx + SCx) / 2}" y="${SBy + 14}" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="700">${side}</text>` +
        `<text x="${(LBx + LCx) / 2}" y="${LBy + 14}" text-anchor="middle" font-size="11" fill="#ef4444" font-weight="700">?</text>` +
        `<text x="${SAx}" y="${SAy - 8}" text-anchor="middle" font-size="10" fill="#94a3b8">A</text>` +
        `<text x="${SBx - 6}" y="${SBy + 4}" text-anchor="end" font-size="10" fill="#94a3b8">B</text>` +
        `<text x="${SCx + 6}" y="${SCy + 4}" font-size="10" fill="#94a3b8">C</text>` +
        `<text x="${LAx}" y="${LAy - 8}" text-anchor="middle" font-size="10" fill="#94a3b8">P</text>` +
        `<text x="${LBx - 6}" y="${LBy + 4}" text-anchor="end" font-size="10" fill="#94a3b8">Q</text>` +
        `<text x="${LCx + 6}" y="${LCy + 4}" font-size="10" fill="#94a3b8">R</text>` +
        `<text x="120" y="105" text-anchor="middle" font-size="10" fill="#10b981">${p}:${q}</text>`
    );
};

// Single labeled triangle for perimeter/area questions
const singleTriSvg = (label1, label2, label3) => {
    const Ax = 115, Ay = 28, Bx = 22, By = 182, Cx = 208, Cy = 182;
    return svgWrap(
        `<polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" fill="none" stroke="#0ea5e9" stroke-width="2.2"/>` +
        `<text x="${(Ax + Bx) / 2 - 14}" y="${(Ay + By) / 2}" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">${label1}</text>` +
        `<text x="${(Bx + Cx) / 2}" y="${By + 15}" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">${label2}</text>` +
        `<text x="${(Ax + Cx) / 2 + 14}" y="${(Ay + Cy) / 2}" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">${label3}</text>` +
        `<text x="${Ax}" y="${Ay - 8}" text-anchor="middle" font-size="11" fill="#94a3b8">A</text>` +
        `<text x="${Bx - 8}" y="${By + 4}" text-anchor="end" font-size="11" fill="#94a3b8">B</text>` +
        `<text x="${Cx + 6}" y="${Cy + 4}" font-size="11" fill="#94a3b8">C</text>`
    );
};

export const genCongruenceP = () => {
    const simRatios = [[1, 2], [2, 3], [3, 4], [1, 3], [2, 5]];
    const qs = [];
    for (let i = 0; i < 20; i++) {
        const type = i % 4;
        if (type === 0) {
            const svg = congrSvg('SAS');
            qs.push(qM(
                `Which congruence rule uses two sides and the included angle?`,
                'SAS',
                ['SSS', 'ASA', 'AAS'],
                `SAS = Side–Angle–Side. The angle must be between the two given sides.`,
                svg
            ));
        } else if (type === 1) {
            const [p, q] = simRatios[i % simRatios.length];
            const side = R(4, 12) * p;
            const corresponding = side * q / p;
            const svg = simSvg(p, q, side, corresponding);
            qs.push(qM(
                `Two similar triangles have a ratio of ${p}:${q}. A side in the smaller triangle is ${side}. Find the corresponding side.`,
                `${corresponding}`,
                [`${side + q}`, `${side * p}`, `${corresponding + p}`],
                `Corresponding side = ${side} × (${q}/${p}) = ${corresponding}.`,
                svg
            ));
        } else if (type === 2) {
            const perim = R(6, 18) * 3;
            const s1 = R(5, 12), s2 = R(5, 12), s3 = perim - s1 - s2;
            const svg = singleTriSvg(`${s1}`, `${s2}`, s3 > 0 ? `${s3}` : '?');
            qs.push(qM(
                `Two triangles are congruent. One has perimeter ${perim} cm. What is the perimeter of the other?`,
                `${perim} cm`,
                ['18 cm', `${perim * 2} cm`, 'Cannot be determined'],
                `Congruent triangles are identical in every measurement, including perimeter.`,
                svg
            ));
        } else {
            const [p, q] = simRatios[i % simRatios.length];
            const area1 = R(4, 9) * p * p;
            const area2 = area1 * q * q / (p * p);
            const svg = simSvg(p, q, p * 4, q * 4);
            qs.push(qM(
                `Two similar triangles have sides in ratio ${p}:${q}. The smaller has area ${area1} cm². Find the larger area.`,
                `${area2} cm²`,
                [`${area1 * q / p} cm²`, `${area1 + area2} cm²`, `${area2 + 10} cm²`],
                `Area ratio = (side ratio)² = (${q}/${p})² = ${q * q}/${p * p}. Area₂ = ${area1} × ${q * q}/${p * p} = ${area2} cm².`,
                svg
            ));
        }
    }
    return qs;
};

export const genCongruenceA = () => genCongruenceP().slice(0, 15);

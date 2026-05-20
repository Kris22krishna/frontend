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

/** Small dashed arc near a vertex to mark an angle */
const angleArc = (cx, cy, r, startDeg, endDeg, color = '#f59e0b') => {
    const toR = d => d * Math.PI / 180;
    const x1 = cx + r * Math.cos(toR(startDeg));
    const y1 = cy - r * Math.sin(toR(startDeg));
    const x2 = cx + r * Math.cos(toR(endDeg));
    const y2 = cy - r * Math.sin(toR(endDeg));
    const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    return `<path d="M${x1},${y1} A${r},${r} 0 ${large},0 ${x2},${y2}" fill="none" stroke="${color}" stroke-width="1.8" stroke-dasharray="3,2"/>`;
};

/** Perpendicular tick marks at midpoint of a side (n ticks = equality order) */
const tick = (x1, y1, x2, y2, n = 1, color = '#10b981') => {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / len * 7, ny = dx / len * 7;
    let s = '';
    for (let i = 0; i < n; i++) {
        const off = (i - (n - 1) / 2) * 5;
        s += `<line x1="${mx + nx + (dx / len) * off}" y1="${my + ny + (dy / len) * off}" x2="${mx - nx + (dx / len) * off}" y2="${my - ny - (dy / len) * off}" stroke="${color}" stroke-width="2"/>`;
    }
    return s;
};

/** Right-angle box at a vertex between two directions (deg1, deg2 from that vertex) */
const rightAngleBox = (cx, cy, s, dir1Deg, dir2Deg) => {
    const toR = d => d * Math.PI / 180;
    const r1x = Math.cos(toR(dir1Deg)), r1y = -Math.sin(toR(dir1Deg));
    const r2x = Math.cos(toR(dir2Deg)), r2y = -Math.sin(toR(dir2Deg));
    const p1x = cx + r1x * s, p1y = cy + r1y * s;
    const p2x = cx + r2x * s, p2y = cy + r2y * s;
    const px = p1x + r2x * s, py = p1y + r2y * s;
    return `<polyline points="${p1x},${p1y} ${px},${py} ${p2x},${p2y}" fill="none" stroke="#f59e0b" stroke-width="1.8"/>`;
};

const wrap = (inner) =>
    `<svg viewBox="0 0 240 220" width="220" height="200" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// Shared toDeg: converts a direction vector (dx, dy) to a math-convention angle in degrees.
// Guards dy===0 to prevent -0 from making atan2(-0, negative) return -180° instead of +180°.
const toDeg = (dx, dy) => Math.atan2(dy === 0 ? 0 : -dy, dx) * 180 / Math.PI;

/* ══════════════════════════════════════════════════════
   ANGLE RELATIONSHIP SVG BUILDERS
   ══════════════════════════════════════════════════════ */

/** Complementary: right-angle corner with two rays, label each sub-angle */
const complementarySVG = (a, b) => {
    // vertex at bottom-left corner; one ray goes right (0°), one goes up (90°)
    const vx = 80, vy = 160;
    const rayLen = 120;
    // ray 1: horizontal right
    const r1x = vx + rayLen, r1y = vy;
    // ray 2: vertical up
    const r2x = vx, r2y = vy - rayLen;
    // ray 3: at angle a from horizontal
    const midRad = (a * Math.PI) / 180;
    const mx = vx + rayLen * Math.cos(midRad), my = vy - rayLen * Math.sin(midRad);
    // angle arc for a (between 0° and a°)
    const arcA = angleArc(vx, vy, 28, 0, a, '#f59e0b');
    // angle arc for b (between a° and 90°)
    const arcB = angleArc(vx, vy, 40, a, 90, '#0ea5e9');
    // label positions
    const lax = vx + 52 * Math.cos((a / 2) * Math.PI / 180);
    const lay = vy - 52 * Math.sin((a / 2) * Math.PI / 180);
    const lbx = vx + 58 * Math.cos(((a + 90) / 2) * Math.PI / 180);
    const lby = vy - 58 * Math.sin(((a + 90) / 2) * Math.PI / 180);
    const box = rightAngleBox(vx, vy, 14, 0, 90);
    return wrap(
        `<line x1="${vx}" y1="${vy}" x2="${r1x}" y2="${r1y}" stroke="#0ea5e9" stroke-width="2.5"/>` +
        `<line x1="${vx}" y1="${vy}" x2="${r2x}" y2="${r2y}" stroke="#0ea5e9" stroke-width="2.5"/>` +
        `<line x1="${vx}" y1="${vy}" x2="${mx}" y2="${my}" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="5,3"/>` +
        arcA + arcB + box +
        `<text x="${lax}" y="${lay}" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="700" fill="#f59e0b">${a}°</text>` +
        `<text x="${lbx}" y="${lby}" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="700" fill="#0ea5e9">${b}°</text>` +
        `<circle cx="${vx}" cy="${vy}" r="3" fill="#0ea5e9"/>`
    );
};

/** Supplementary: straight horizontal line with a ray from a point, two angles labeled */
const supplementarySVG = (a, b) => {
    const px = 120, py = 150;
    const lineLen = 100;
    // straight line left-right
    const lx1 = px - lineLen, ly1 = py;
    const lx2 = px + lineLen, ly2 = py;
    // ray upward at angle a from the right direction
    const rayRad = (a * Math.PI) / 180;
    const rx = px + 110 * Math.cos(Math.PI - rayRad);
    const ry = py - 110 * Math.sin(Math.PI - rayRad);
    // arcs: angle a on left of ray (between 180° and 180°-a° going down = just above line on left)
    const arcA = angleArc(px, py, 30, 180 - a, 180, '#f59e0b');
    const arcB = angleArc(px, py, 44, 0, 180 - a, '#0ea5e9');
    // label positions
    const lax = px + 52 * Math.cos(((180 - a / 2)) * Math.PI / 180);
    const lay = py - 52 * Math.sin(((180 - a / 2)) * Math.PI / 180);
    const lbx = px + 62 * Math.cos(((180 - a) / 2) * Math.PI / 180);
    const lby = py - 62 * Math.sin(((180 - a) / 2) * Math.PI / 180);
    return wrap(
        `<line x1="${lx1}" y1="${ly1}" x2="${lx2}" y2="${ly2}" stroke="#0ea5e9" stroke-width="2.5"/>` +
        `<line x1="${px}" y1="${py}" x2="${rx}" y2="${ry}" stroke="#8b5cf6" stroke-width="2.5"/>` +
        arcA + arcB +
        `<text x="${lax}" y="${lay}" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="700" fill="#f59e0b">${a}°</text>` +
        `<text x="${lbx}" y="${lby}" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="700" fill="#0ea5e9">${b}°</text>` +
        `<circle cx="${px}" cy="${py}" r="3" fill="#0ea5e9"/>`
    );
};

/** Vertically opposite: two intersecting lines (X), label all 4 angles, highlight opposite pair */
const vertOppSVG = (a) => {
    const b = 180 - a;
    const cx = 120, cy = 110;
    const len = 90;
    // Two lines through center
    const ang1 = 30; // degrees, tilt of first line
    const r1 = (ang1 * Math.PI) / 180;
    const r2 = ((ang1 + a) * Math.PI) / 180;
    // endpoints of line 1
    const l1x1 = cx + len * Math.cos(r1), l1y1 = cy - len * Math.sin(r1);
    const l1x2 = cx - len * Math.cos(r1), l1y2 = cy + len * Math.sin(r1);
    // endpoints of line 2 (at angle a from line 1 direction)
    const l2x1 = cx + len * Math.cos(r2), l2y1 = cy - len * Math.sin(r2);
    const l2x2 = cx - len * Math.cos(r2), l2y2 = cy + len * Math.sin(r2);
    // arcs at all 4 sectors
    const arcTop = angleArc(cx, cy, 24, ang1, ang1 + a, '#f59e0b');
    const arcBottom = angleArc(cx, cy, 24, ang1 + 180, ang1 + a + 180, '#f59e0b');
    const arcLeft = angleArc(cx, cy, 22, ang1 + a, ang1 + 180, '#0ea5e9');
    const arcRight = angleArc(cx, cy, 22, ang1 + a + 180, ang1 + 360, '#0ea5e9');
    // label positions
    const lmid1 = ang1 + a / 2;
    const lmid2 = ang1 + a / 2 + 180;
    const lmid3 = ang1 + a + b / 2;
    const lmid4 = ang1 + a + b / 2 + 180;
    const labelAt = (deg, txt, col) => {
        const d = deg * Math.PI / 180;
        const lx = cx + 45 * Math.cos(d), ly = cy - 45 * Math.sin(d);
        return `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="700" fill="${col}">${txt}</text>`;
    };
    return wrap(
        `<line x1="${l1x1}" y1="${l1y1}" x2="${l1x2}" y2="${l1y2}" stroke="#0ea5e9" stroke-width="2.5"/>` +
        `<line x1="${l2x1}" y1="${l2y1}" x2="${l2x2}" y2="${l2y2}" stroke="#0ea5e9" stroke-width="2.5"/>` +
        arcTop + arcBottom + arcLeft + arcRight +
        labelAt(lmid1, `${a}°`, '#f59e0b') +
        labelAt(lmid2, `${a}°`, '#f59e0b') +
        labelAt(lmid3, `${b}°`, '#0ea5e9') +
        labelAt(lmid4, `${b}°`, '#0ea5e9') +
        `<circle cx="${cx}" cy="${cy}" r="3" fill="#0ea5e9"/>` +
        `<text x="120" y="210" text-anchor="middle" font-size="10" fill="#888">Vert. opp. angles equal</text>`
    );
};

/** Linear pair: straight line with one ray above it, two angle arcs labeled */
const linearPairSVG = (a, b) => {
    const px = 120, py = 150;
    const lineLen = 100;
    const arcA = angleArc(px, py, 30, 0, a, '#f59e0b');
    const arcB = angleArc(px, py, 44, a, 180, '#0ea5e9');
    const lax = px + 52 * Math.cos((a / 2) * Math.PI / 180);
    const lay = py - 52 * Math.sin((a / 2) * Math.PI / 180);
    const lbx = px + 62 * Math.cos(((a + 180) / 2) * Math.PI / 180);
    const lby = py - 62 * Math.sin(((a + 180) / 2) * Math.PI / 180);
    return wrap(
        `<line x1="${px - lineLen}" y1="${py}" x2="${px + lineLen}" y2="${py}" stroke="#0ea5e9" stroke-width="2.5"/>` +
        `<line x1="${px}" y1="${py}" x2="${px + 110 * Math.cos((a * Math.PI) / 180)}" y2="${py - 110 * Math.sin((a * Math.PI) / 180)}" stroke="#8b5cf6" stroke-width="2.5"/>` +
        arcA + arcB +
        `<text x="${lax}" y="${lay}" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="700" fill="#f59e0b">${a}°</text>` +
        `<text x="${lbx}" y="${lby}" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="700" fill="#0ea5e9">${b}°</text>` +
        `<circle cx="${px}" cy="${py}" r="3" fill="#0ea5e9"/>`
    );
};

/** Angles at a point: 3 rays from center, all sectors labeled */
const anglesAtPointSVG = (a, b, c) => {
    const cx = 120, cy = 120;
    const len = 90;
    // three rays starting from 0°, then a°, then a+b°
    const angles = [0, a, a + b];
    const rays = angles.map(deg => {
        const r = (deg * Math.PI) / 180;
        return { x: cx + len * Math.cos(r), y: cy - len * Math.sin(r) };
    });
    const labels = [a, b, c];
    const labelAngles = [a / 2, a + b / 2, a + b + c / 2];
    let svgContent = '';
    rays.forEach(pt => {
        svgContent += `<line x1="${cx}" y1="${cy}" x2="${pt.x}" y2="${pt.y}" stroke="#0ea5e9" stroke-width="2.5"/>`;
    });
    labelAngles.forEach((midDeg, idx) => {
        svgContent += angleArc(cx, cy, 22 + idx * 6, midDeg - labels[idx] / 2 + midDeg - (labelAngles[idx] - labels[idx] / 2), midDeg + labels[idx] / 2, '#f59e0b');
        const lrad = (midDeg * Math.PI) / 180;
        const lx = cx + 55 * Math.cos(lrad);
        const ly = cy - 55 * Math.sin(lrad);
        svgContent += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="700" fill="#f59e0b">${labels[idx]}°</text>`;
    });
    // simpler arc approach: arc between consecutive rays
    let arcContent = '';
    arcContent += angleArc(cx, cy, 24, 0, a, '#f59e0b');
    arcContent += angleArc(cx, cy, 32, a, a + b, '#0ea5e9');
    arcContent += angleArc(cx, cy, 28, a + b, a + b + c, '#10b981');
    // label positions
    const la = (a / 2) * Math.PI / 180;
    const lb = (a + b / 2) * Math.PI / 180;
    const lc = (a + b + c / 2) * Math.PI / 180;
    return wrap(
        rays.map(pt => `<line x1="${cx}" y1="${cy}" x2="${pt.x}" y2="${pt.y}" stroke="#0ea5e9" stroke-width="2.5"/>`).join('') +
        arcContent +
        `<text x="${cx + 46 * Math.cos(la)}" y="${cy - 46 * Math.sin(la)}" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="700" fill="#f59e0b">${a}°</text>` +
        `<text x="${cx + 52 * Math.cos(lb)}" y="${cy - 52 * Math.sin(lb)}" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="700" fill="#0ea5e9">${b}°</text>` +
        `<text x="${cx + 48 * Math.cos(lc)}" y="${cy - 48 * Math.sin(lc)}" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="700" fill="#10b981">${c}°</text>` +
        `<circle cx="${cx}" cy="${cy}" r="3" fill="#0ea5e9"/>` +
        `<text x="120" y="212" text-anchor="middle" font-size="10" fill="#888">Angles at a point = 360°</text>`
    );
};

/* ══════════════════════════════════════════════════════
   TRIANGLE SVG BUILDERS
   ══════════════════════════════════════════════════════ */

/**
 * Build a triangle SVG with exact vertex labels, angle arcs, optional tick marks.
 * @param {string} vL  - top vertex label (e.g. 'A')
 * @param {string} vBL - bottom-left vertex label
 * @param {string} vBR - bottom-right vertex label
 * @param {string|number} angTop    - angle at top vertex (number) or '?'
 * @param {string|number} angBL    - angle at bottom-left
 * @param {string|number} angBR    - angle at bottom-right
 * @param {number} tickAB  - tick marks on left side (0=none)
 * @param {number} tickAC  - tick marks on right side
 * @param {number} tickBC  - tick marks on bottom side
 */
const triangleSVG = (vL, vBL, vBR, angTop, angBL, angBR, tickAB = 0, tickAC = 0, tickBC = 0) => {
    // Triangle vertices
    const Ax = 120, Ay = 22;   // top
    const Bx = 30,  By = 180;  // bottom-left
    const Cx = 210, Cy = 180;  // bottom-right

    const fmt = v => v === null || v === undefined || v === '' ? '' : `${v}°`;
    const angTopStr = (angTop === '?') ? '?' : fmt(angTop);
    const angBLStr  = (angBL  === '?') ? '?' : fmt(angBL);
    const angBRStr  = (angBR  === '?') ? '?' : fmt(angBR);

    // Angle arcs
    // Top vertex: between left-side direction and right-side direction
    // Left side direction from A: toward B → deg = atan2(-(By-Ay), Bx-Ax) in screen coords
    const toDeg = (dx, dy) => Math.atan2(-dy, dx) * 180 / Math.PI;
    const topL = toDeg(Bx - Ax, By - Ay); // direction A→B
    const topR = toDeg(Cx - Ax, Cy - Ay); // direction A→C
    const blL  = toDeg(Cx - Bx, Cy - By); // direction B→C
    const blR  = toDeg(Ax - Bx, Ay - By); // direction B→A
    const brL  = toDeg(Ax - Cx, Ay - Cy); // direction C→A
    const brR  = toDeg(Bx - Cx, By - Cy); // direction C→B

    let arcs = '';
    if (angTop !== '') arcs += angleArc(Ax, Ay, 18, Math.min(topL, topR), Math.max(topL, topR), angTop === '?' ? '#ef4444' : '#f59e0b');
    if (angBL  !== '') arcs += angleArc(Bx, By, 18, Math.min(blL, blR),   Math.max(blL, blR),   angBL  === '?' ? '#ef4444' : '#f59e0b');
    if (angBR !== '') {
        const brSt = Math.min(brL, brR), brEn = Math.max(brL, brR);
        const brCol = angBR === '?' ? '#ef4444' : '#f59e0b';
        const r2 = 18;
        const brX1 = Cx + r2 * Math.cos(brSt * Math.PI / 180), brY1 = Cy - r2 * Math.sin(brSt * Math.PI / 180);
        const brX2 = Cx + r2 * Math.cos(brEn * Math.PI / 180), brY2 = Cy - r2 * Math.sin(brEn * Math.PI / 180);
        // sweep=1 (CW in SVG) keeps the arc inside the triangle at bottom-right vertex
        arcs += `<path d="M${brX1},${brY1} A${r2},${r2} 0 0,1 ${brX2},${brY2}" fill="none" stroke="${brCol}" stroke-width="1.8"${angBR === '?' ? ' stroke-dasharray="5,3"' : ''}/>`;
    }

    let ticks = '';
    if (tickAB > 0) ticks += tick(Ax, Ay, Bx, By, tickAB);
    if (tickAC > 0) ticks += tick(Ax, Ay, Cx, Cy, tickAC);
    if (tickBC > 0) ticks += tick(Bx, By, Cx, Cy, tickBC);

    const shape = `<polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" fill="rgba(14,165,233,0.06)" stroke="#0ea5e9" stroke-width="2.5" stroke-linejoin="round"/>`;

    // Vertex label positions (offset away from triangle)
    const vTopX = Ax, vTopY = Ay - 14;
    const vBLX  = Bx - 14, vBLY = By + 8;
    const vBRX  = Cx + 14, vBRY = Cy + 8;

    // Angle value labels (inside, near vertices)
    const angLabelTop = angTopStr ? `<text x="${Ax}" y="${Ay + 26}" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">${angTopStr}</text>` : '';
    const angLabelBL  = angBLStr  ? `<text x="${Bx + 24}" y="${By - 4}" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">${angBLStr}</text>` : '';
    const angLabelBR  = angBRStr  ? `<text x="${Cx - 24}" y="${Cy - 4}" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">${angBRStr}</text>` : '';

    return wrap(
        shape + arcs + ticks +
        `<text x="${vTopX}" y="${vTopY}" text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">${vL}</text>` +
        `<text x="${vBLX}"  y="${vBLY}"  text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">${vBL}</text>` +
        `<text x="${vBRX}"  y="${vBRY}"  text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">${vBR}</text>` +
        angLabelTop + angLabelBL + angLabelBR
    );
};

/** Triangle with exterior angle shown: one side extended past C with exterior arc */
const exteriorAngleSVG = (vL, vBL, vBR, angA, angB, _ext) => {
    // Triangle shifted left so there is room for the extension + label inside the viewBox
    const Ax = 105, Ay = 22;
    const Bx = 20,  By = 185;
    const Cx = 180, Cy = 185;
    // Extension point stays inside viewBox (240 wide)
    const Ex = 228, Ey = Cy;

    const toDeg = (dx, dy) => Math.atan2(-dy, dx) * 180 / Math.PI;
    const topL   = toDeg(Bx - Ax, By - Ay);
    const topR   = toDeg(Cx - Ax, Cy - Ay);
    const blL    = toDeg(Cx - Bx, Cy - By);
    const blR    = toDeg(Ax - Bx, Ay - By);
    const brIntL = toDeg(Ax - Cx, Ay - Cy);
    const brIntR = toDeg(Bx - Cx, By - Cy);

    // Exterior arc: from direction of the extension (→) to direction toward apex A
    const extArcStart = toDeg(Ex - Cx, Ey - Cy); // ≈ 0°
    const extArcEnd   = toDeg(Ax - Cx, Ay - Cy); // upper-left direction

    return wrap(
        `<polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" fill="rgba(14,165,233,0.06)" stroke="#0ea5e9" stroke-width="2.5" stroke-linejoin="round"/>` +
        // Extension line: only from C beyond, not the full B→C side
        `<line x1="${Cx}" y1="${Cy}" x2="${Ex}" y2="${Ey}" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="6,3"/>` +
        angleArc(Ax, Ay, 18, Math.min(topL, topR), Math.max(topL, topR), '#f59e0b') +
        angleArc(Bx, By, 18, Math.min(blL, blR), Math.max(blL, blR), '#f59e0b') +
        (() => {
            const s = Math.min(brIntL, brIntR), e = Math.max(brIntL, brIntR), r2 = 18;
            const x1 = Cx + r2 * Math.cos(s * Math.PI / 180), y1 = Cy - r2 * Math.sin(s * Math.PI / 180);
            const x2 = Cx + r2 * Math.cos(e * Math.PI / 180), y2 = Cy - r2 * Math.sin(e * Math.PI / 180);
            return `<path d="M${x1},${y1} A${r2},${r2} 0 0,1 ${x2},${y2}" fill="none" stroke="#0ea5e9" stroke-width="1.8"/>`;
        })() +
        angleArc(Cx, Cy, 30, Math.min(extArcStart, extArcEnd), Math.max(extArcStart, extArcEnd), '#f43f5e') +
        // Vertex labels
        `<text x="${Ax}" y="${Ay - 12}" text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">${vL}</text>` +
        `<text x="${Bx - 12}" y="${By + 8}" text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">${vBL}</text>` +
        `<text x="${Cx}" y="${Cy + 16}" text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">${vBR}</text>` +
        // Angle value labels (given info at P and Q)
        `<text x="${Ax + 16}" y="${Ay + 24}" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">${angA}°</text>` +
        `<text x="${Bx + 22}" y="${By - 6}" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">${angB}°</text>` +
        // Exterior angle label: show ? since this is what the student must find
        `<text x="${Cx + 26}" y="${Cy - 34}" text-anchor="middle" font-size="12" font-weight="700" fill="#f43f5e">?</text>`
    );
};

/** Equilateral triangle: all sides ticked, all angles 60° */
const equilateralSVG = () => {
    const Ax = 120, Ay = 22;
    const Bx = 30,  By = 180;
    const Cx = 210, Cy = 180;
    const toDeg = (dx, dy) => Math.atan2(-dy, dx) * 180 / Math.PI;
    const topL = toDeg(Bx - Ax, By - Ay), topR = toDeg(Cx - Ax, Cy - Ay);
    const blL  = toDeg(Cx - Bx, Cy - By), blR  = toDeg(Ax - Bx, Ay - By);
    const brL  = toDeg(Ax - Cx, Ay - Cy), brR  = toDeg(Bx - Cx, By - Cy);
    return wrap(
        `<polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" fill="rgba(14,165,233,0.06)" stroke="#0ea5e9" stroke-width="2.5" stroke-linejoin="round"/>` +
        tick(Ax, Ay, Bx, By, 1) + tick(Ax, Ay, Cx, Cy, 1) + tick(Bx, By, Cx, Cy, 1) +
        angleArc(Ax, Ay, 18, Math.min(topL, topR), Math.max(topL, topR), '#f59e0b') +
        angleArc(Bx, By, 18, Math.min(blL, blR), Math.max(blL, blR), '#f59e0b') +
        angleArc(Cx, Cy, 18, Math.min(brL, brR), Math.max(brL, brR), '#f59e0b') +
        `<text x="${Ax}" y="${Ay - 14}" text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">A</text>` +
        `<text x="${Bx - 14}" y="${By + 8}" text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">B</text>` +
        `<text x="${Cx + 14}" y="${Cy + 8}" text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">C</text>` +
        `<text x="${Ax}" y="${Ay + 26}" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">60°</text>` +
        `<text x="${Bx + 24}" y="${By - 4}" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">60°</text>` +
        `<text x="${Cx - 24}" y="${Cy - 4}" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">60°</text>`
    );
};

/** Right triangle SVG with right-angle box at bottom-left, vertex labels and angle display */
const rightTriangleSVG = (vL, vBL, vBR, knownAcute, unknownLabel) => {
    // Right angle at bottom-left
    const Ax = 30,  Ay = 180;  // right angle vertex (bottom-left)
    const Bx = 30,  By = 30;   // top
    const Cx = 210, Cy = 180;  // bottom-right
    const toDeg = (dx, dy) => Math.atan2(-dy, dx) * 180 / Math.PI;
    const topL = toDeg(Ax - Bx, Ay - By), topR = toDeg(Cx - Bx, Cy - By);
    const brL  = toDeg(Ax - Cx, Ay - Cy), brR  = toDeg(Bx - Cx, By - Cy);
    const brS = Math.min(brL, brR), brE = Math.max(brL, brR);
    // Arc at C must use sweep=1 (CW in SVG) to render inside the triangle
    const r = 18;
    const cCol = unknownLabel === '?' ? '#ef4444' : '#f59e0b';
    const px1 = Cx + r * Math.cos(brS * Math.PI / 180), py1 = Cy - r * Math.sin(brS * Math.PI / 180);
    const px2 = Cx + r * Math.cos(brE * Math.PI / 180), py2 = Cy - r * Math.sin(brE * Math.PI / 180);
    const midBR = (brS + brE) / 2;
    const lxC = Cx + (r + 14) * Math.cos(midBR * Math.PI / 180);
    const lyC = Cy - (r + 14) * Math.sin(midBR * Math.PI / 180);
    const cArc =
        `<path d="M${px1},${py1} A${r},${r} 0 0,1 ${px2},${py2}" fill="none" stroke="${cCol}" stroke-width="1.8"${unknownLabel === '?' ? ' stroke-dasharray="5,3"' : ''}/>` +
        `<text x="${lxC}" y="${lyC}" text-anchor="middle" dominant-baseline="central" font-size="13" fill="${cCol}" font-weight="700">${unknownLabel}</text>`;
    return wrap(
        `<polygon points="${Bx},${By} ${Ax},${Ay} ${Cx},${Cy}" fill="rgba(14,165,233,0.06)" stroke="#0ea5e9" stroke-width="2.5" stroke-linejoin="round"/>` +
        rightAngleBox(Ax, Ay, 14, 0, 90) +
        angleArc(Bx, By, 18, Math.min(topL, topR), Math.max(topL, topR), '#f59e0b') +
        cArc +
        `<text x="${Bx}" y="${By - 12}" text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">${vL}</text>` +
        `<text x="${Ax - 16}" y="${Ay + 8}" text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">${vBL}</text>` +
        `<text x="${Cx + 14}" y="${Cy + 8}" text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">${vBR}</text>` +
        `<text x="${Bx + 14}" y="${By + 22}" text-anchor="middle" font-size="13" font-weight="700" fill="#f59e0b">${knownAcute}°</text>` +
        `<text x="${Ax + 28}" y="${Ay - 8}" text-anchor="middle" font-size="13" font-weight="700" fill="#0ea5e9">90°</text>`
    );
};

/* ══════════════════════════════════════════════════════
   POLYGON SVG BUILDERS
   ══════════════════════════════════════════════════════ */

/** Regular polygon with interior angle arc at one vertex and label */
const regularPolygonSVG = (n, label) => {
    const cx = 120, cy = 108, r = 78;
    let pts = '';
    const verts = [];
    for (let i = 0; i < n; i++) {
        const ang = (2 * Math.PI * i / n) - Math.PI / 2;
        const x = cx + r * Math.cos(ang), y = cy + r * Math.sin(ang);
        pts += `${x},${y} `;
        verts.push({ x, y });
    }
    // angle arc at vertex 0 (top)
    const v0 = verts[0], v1 = verts[1], vn = verts[n - 1];
    const toDeg = (dx, dy) => Math.atan2(-dy, dx) * 180 / Math.PI;
    const dir1 = toDeg(vn.x - v0.x, vn.y - v0.y);
    const dir2 = toDeg(v1.x - v0.x, v1.y - v0.y);
    const dMin = Math.min(dir1, dir2), dMax = Math.max(dir1, dir2);
    return wrap(
        `<polygon points="${pts.trim()}" fill="rgba(14,165,233,0.06)" stroke="#0ea5e9" stroke-width="2.5" stroke-linejoin="round"/>` +
        angleArc(v0.x, v0.y, 20, dMin, dMax, '#f59e0b') +
        `<text x="${v0.x}" y="${v0.y - 16}" text-anchor="middle" font-size="10" fill="#f59e0b">${label}</text>` +
        `<text x="${cx}" y="${cy + r + 20}" text-anchor="middle" font-size="11" font-weight="600" fill="#0891b2">${n} sides</text>`
    );
};

/** Regular polygon with exterior angle: one side extended, exterior arc labeled */
const extAnglePolygonSVG = (n, extAngle) => {
    const cx = 120, cy = 108, r = 78;
    const verts = [];
    for (let i = 0; i < n; i++) {
        const ang = (2 * Math.PI * i / n) - Math.PI / 2;
        verts.push({ x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) });
    }
    let pts = verts.map(v => `${v.x},${v.y}`).join(' ');
    const v0 = verts[0], v1 = verts[1], vLast = verts[n - 1];
    // Extend side from vLast to v0 beyond v0
    const dx = v0.x - vLast.x, dy = v0.y - vLast.y;
    const dlen = Math.sqrt(dx * dx + dy * dy);
    const ext = { x: v0.x + (dx / dlen) * 50, y: v0.y + (dy / dlen) * 50 };
    const toDeg = (ddx, ddy) => Math.atan2(-ddy, ddx) * 180 / Math.PI;
    const dirInt = toDeg(v1.x - v0.x, v1.y - v0.y);
    const dirExt = toDeg(ext.x - v0.x, ext.y - v0.y);
    return wrap(
        `<polygon points="${pts}" fill="rgba(14,165,233,0.06)" stroke="#0ea5e9" stroke-width="2.5" stroke-linejoin="round"/>` +
        `<line x1="${vLast.x}" y1="${vLast.y}" x2="${ext.x}" y2="${ext.y}" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,3"/>` +
        angleArc(v0.x, v0.y, 22, Math.min(dirInt, dirExt), Math.max(dirInt, dirExt), '#f43f5e') +
        `<text x="${v0.x + 30}" y="${v0.y - 20}" text-anchor="middle" font-size="11" font-weight="700" fill="#f43f5e">${extAngle === '?' ? '?' : extAngle + '°'}</text>` +
        `<text x="${cx}" y="${cy + r + 20}" text-anchor="middle" font-size="11" font-weight="600" fill="#0891b2">${n} sides</text>`
    );
};

/** Polygon with diagonals drawn as dashed lines */
const diagonalPolygonSVG = (n) => {
    const cx = 120, cy = 108, r = 78;
    const verts = [];
    for (let i = 0; i < n; i++) {
        const ang = (2 * Math.PI * i / n) - Math.PI / 2;
        verts.push({ x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) });
    }
    const pts = verts.map(v => `${v.x},${v.y}`).join(' ');
    // draw up to 3 diagonals from vertex 0 for visual clarity (illustrative only)
    let diags = '';
    const diagCount = Math.min(n - 3, 3);
    for (let i = 2; i <= diagCount + 1; i++) {
        diags += `<line x1="${verts[0].x}" y1="${verts[0].y}" x2="${verts[i].x}" y2="${verts[i].y}" stroke="#10b981" stroke-width="1.8" stroke-dasharray="5,3"/>`;
    }
    return wrap(
        `<polygon points="${pts}" fill="rgba(14,165,233,0.06)" stroke="#0ea5e9" stroke-width="2.5" stroke-linejoin="round"/>` +
        diags +
        `<text x="${cx}" y="${cy + r + 20}" text-anchor="middle" font-size="11" font-weight="600" fill="#0891b2">${n} sides</text>`
    );
};

/** Polygon with unknown n — show it and label exterior angle */
const nFromExtPolygonSVG = (ext, n) => {
    return extAnglePolygonSVG(n, ext);
};

/* ══════════════════════════════════════════════════════
   SKILL 1 — ANGLE RELATIONSHIPS (Practice + Assess)
   ══════════════════════════════════════════════════════ */
export const genAngleRelP = () => {
    const qs = [];

    // Complementary angles — 6 questions
    for (let i = 0; i < 6; i++) {
        const a = R(10, 75);
        const ans = 90 - a;
        qs.push(qM(
            `Two angles are complementary. One angle is ${a}°. Find the other angle.`,
            `${ans}°`,
            [`${180 - a}°`, `${a + 5}°`, `${ans + 10}°`],
            `Complementary angles sum to 90°. So the other angle = 90° − ${a}° = ${ans}°.`,
            complementarySVG(a, ans)
        ));
    }

    // Supplementary angles — 6 questions
    for (let i = 0; i < 6; i++) {
        const a = R(20, 150);
        const ans = 180 - a;
        const d1 = ans + 10 <= 179 ? ans + 10 : ans - 10;
        const d2 = a !== 90 ? 90 : 85;
        qs.push(qM(
            `Two angles are supplementary. One angle is ${a}°. Find the other angle.`,
            `${ans}°`,
            [`${d2}°`, `${a}°`, `${d1}°`],
            `Supplementary angles sum to 180°. So the other angle = 180° − ${a}° = ${ans}°.`,
            supplementarySVG(a, ans)
        ));
    }

    // Vertically opposite — 5 questions
    for (let i = 0; i < 5; i++) {
        const a = R(25, 155);
        const b = 180 - a;
        qs.push(qM(
            `Two straight lines intersect. One angle formed is ${a}°. What is the vertically opposite angle?`,
            `${a}°`,
            [`${b}°`, `${90}°`, `${360 - 2 * a}°`],
            `Vertically opposite angles are equal. So the answer is ${a}°.`,
            vertOppSVG(a)
        ));
    }

    // Linear pair — 5 questions
    for (let i = 0; i < 5; i++) {
        const a = R(30, 150);
        const ans = 180 - a;
        const d1 = ans + 15 <= 179 ? ans + 15 : ans - 15;
        qs.push(qM(
            `Angles on a straight line: one angle is ${a}°. Find the adjacent angle.`,
            `${ans}°`,
            [`${a}°`, `${360 - a}°`, `${d1}°`],
            `Angles on a straight line (linear pair) sum to 180°. Answer = 180° − ${a}° = ${ans}°.`,
            linearPairSVG(a, ans)
        ));
    }

    // Angles at a point — 4 questions
    for (let i = 0; i < 4; i++) {
        const a = R(40, 140);
        const b = R(40, 200 - a);
        const ans = 360 - a - b;
        if (ans <= 0 || ans >= 360) continue;
        const d1 = ans + 10 < 360 ? ans + 10 : ans - 10;
        qs.push(qM(
            `Three angles meet at a point. Two of them are ${a}° and ${b}°. Find the third.`,
            `${ans}°`,
            [`${180 - a}°`, `${a + b}°`, `${d1}°`],
            `Angles at a point sum to 360°. Third = 360° − ${a}° − ${b}° = ${ans}°.`,
            anglesAtPointSVG(a, b, ans)
        ));
    }

    return shuf(qs).slice(0, 20);
};

export const genAngleRelA = () => {
    const qs = [];

    // Complementary (∠A + ∠B = 90°) — 7 questions
    for (let i = 0; i < 7; i++) {
        const a = R(12, 78);
        const ans = 90 - a;
        const d1 = ans + 5 < 90 ? ans + 5 : ans - 5;
        qs.push(qM(
            `If ∠A = ${a}° and ∠A + ∠B = 90°, find ∠B.`,
            `${ans}°`,
            [`${180 - a}°`, `${a}°`, `${d1}°`],
            `∠B = 90° − ${a}° = ${ans}°.`,
            complementarySVG(a, ans)
        ));
    }

    // Linear pair (∠P + ∠Q = 180°) — 7 questions
    for (let i = 0; i < 7; i++) {
        const a = R(25, 155);
        const ans = 180 - a;
        const d1 = ans + 8 <= 179 ? ans + 8 : ans - 8;
        qs.push(qM(
            `∠P and ∠Q form a linear pair. If ∠P = ${a}°, find ∠Q.`,
            `${ans}°`,
            [`${a}°`, `${90}°`, `${d1}°`],
            `Linear pair sums to 180°. ∠Q = 180° − ${a}° = ${ans}°.`,
            linearPairSVG(a, ans)
        ));
    }

    // Vertically opposite — all four angles — 6 questions
    for (let i = 0; i < 6; i++) {
        const a = R(30, 150);
        const b = 180 - a;
        const correct = `${a}°, ${b}°, ${a}°, ${b}°`;
        qs.push(qM(
            `Two lines intersect. If one angle is ${a}°, find ALL four angles formed.`,
            correct,
            [
                `${a}°, ${a}°, ${a}°, ${a}°`,
                `${90}°, ${90}°, ${90}°, ${90}°`,
                `${a}°, ${b}°, ${90}°, ${90}°`
            ],
            `Vertically opposite angles are equal. Adjacent angles are supplementary. Angles: ${a}°, ${b}°, ${a}°, ${b}°.`,
            vertOppSVG(a)
        ));
    }

    // Angles at a point — 5 questions
    for (let i = 0; i < 5; i++) {
        const a = R(30, 120);
        const b = R(30, 170 - a);
        const ans = 360 - a - b;
        if (ans <= 0 || ans >= 360) continue;
        const d1 = ans - 10 > 0 ? ans - 10 : ans + 10;
        qs.push(qM(
            `Three angles around a point: ${a}°, ${b}°, and x°. Find x.`,
            `${ans}°`,
            [`${180 - a}°`, `${a + b}°`, `${d1}°`],
            `Sum = 360°. x = 360° − ${a}° − ${b}° = ${ans}°.`,
            anglesAtPointSVG(a, b, ans)
        ));
    }

    return shuf(qs).slice(0, 20);
};

/* ══════════════════════════════════════════════════════
   SKILL 2 — TRIANGLE PROPERTIES (Practice + Assess)
   ══════════════════════════════════════════════════════ */
export const genTriangleP = () => {
    const qs = [];

    // Angle sum in △ABC — 7 questions
    for (let i = 0; i < 7; i++) {
        const a = R(20, 80), b = R(20, 140 - a);
        const c = 180 - a - b;
        const d1 = c + 10 <= 179 ? c + 10 : c - 10;
        qs.push(qM(
            `In △ABC, ∠A = ${a}° and ∠B = ${b}°. Find ∠C.`,
            `${c}°`,
            [`${a + b}°`, `${180 - a}°`, `${d1}°`],
            `Angle sum property: ∠C = 180° − ${a}° − ${b}° = ${c}°.`,
            triangleSVG('A', 'B', 'C', a, b, '?')
        ));
    }

    // Exterior angle at R in △PQR — 6 questions
    for (let i = 0; i < 6; i++) {
        const p = R(30, 80), q = R(30, 80);
        const ext = p + q;
        qs.push(qM(
            `In △PQR, ∠P = ${p}° and ∠Q = ${q}°. Find the exterior angle at R.`,
            `${ext}°`,
            [`${180 - ext}°`, `${p}°`, `${q}°`],
            `Exterior angle = sum of remote interior angles = ${p}° + ${q}° = ${ext}°.`,
            exteriorAngleSVG('P', 'Q', 'R', p, q, ext)
        ));
    }

    // Isosceles triangle — 4 questions (ensure integer base angles)
    let isoCount = 0;
    for (let attempt = 0; attempt < 20 && isoCount < 4; attempt++) {
        const base = R(20, 100);
        const rem = 180 - base;
        if (rem % 2 !== 0) continue;
        const equal = rem / 2;
        const d1 = equal + 10 <= 89 ? equal + 10 : equal - 10;
        qs.push(qM(
            `An isosceles triangle has a vertex angle of ${base}°. Find each base angle.`,
            `${equal}°`,
            [`${180 - base}°`, `${base}°`, `${d1}°`],
            `Base angles = (180° − ${base}°) / 2 = ${equal}°.`,
            triangleSVG('A', 'B', 'C', base, '?', '?', 1, 1, 0)
        ));
        isoCount++;
    }

    // Equilateral triangle — 3 questions
    for (let i = 0; i < 3; i++) {
        qs.push(qM(
            `What is each interior angle of an equilateral triangle?`,
            `60°`,
            [`90°`, `45°`, `120°`],
            `All three angles are equal: 180° ÷ 3 = 60°.`,
            equilateralSVG()
        ));
    }

    // Right triangle — 5 questions
    for (let i = 0; i < 5; i++) {
        const a = R(10, 79);
        const b = 90 - a;
        qs.push(qM(
            `In a right triangle △ABC, ∠A = 90° and ∠B = ${a}°. Find ∠C.`,
            `${b}°`,
            [`${180 - a}°`, `${90}°`, `${a}°`],
            `∠C = 180° − 90° − ${a}° = ${b}°.`,
            rightTriangleSVG('B', 'A', 'C', a, '?')
        ));
    }

    return shuf(qs).slice(0, 20);
};

export const genTriangleA = () => {
    const qs = [];

    // Angle sum in △XYZ — 8 questions
    for (let i = 0; i < 8; i++) {
        const x = R(25, 75), y = R(25, 130 - x);
        const z = 180 - x - y;
        const d1 = z + 5 <= 179 ? z + 5 : z - 5;
        qs.push(qM(
            `△XYZ: ∠X = ${x}°, ∠Y = ${y}°. Find ∠Z.`,
            `${z}°`,
            [`${x + y}°`, `${d1}°`, `${180 - x}°`],
            `∠Z = 180° − ${x}° − ${y}° = ${z}°.`,
            triangleSVG('X', 'Y', 'Z', x, y, '?')
        ));
    }

    // Exterior angle at C of △ABC — 6 questions
    for (let i = 0; i < 6; i++) {
        const a = R(25, 70), b = R(25, 70);
        const ext = a + b;
        qs.push(qM(
            `Exterior angle at vertex C of △ABC = x°. If ∠A = ${a}° and ∠B = ${b}°, find x.`,
            `${ext}°`,
            [`${180 - ext}°`, `${a}°`, `${180}°`],
            `x = ∠A + ∠B = ${a}° + ${b}° = ${ext}°.`,
            exteriorAngleSVG('A', 'B', 'C', a, b, ext)
        ));
    }

    // Equilateral triangle area — 6 questions
    for (let i = 0; i < 6; i++) {
        const s = R(3, 15);
        const area = (Math.sqrt(3) / 4) * s * s;
        const areaRound = Math.round(area * 100) / 100;
        const d1 = Math.round(area + 5);
        qs.push(qM(
            `An equilateral triangle has side ${s} cm. Its area = (√3/4) × s². Calculate.`,
            `${areaRound} cm²`,
            [`${s * s} cm²`, `${s * 3} cm²`, `${d1} cm²`],
            `Area = (√3/4) × ${s}² = (√3/4) × ${s * s} ≈ ${areaRound} cm².`,
            equilateralSVG()
        ));
    }

    return shuf(qs).slice(0, 20);
};

/* ══════════════════════════════════════════════════════
   SKILL 3 — POLYGON PROPERTIES (Practice + Assess)
   ══════════════════════════════════════════════════════ */
const polyNames = {
    3: 'triangle', 4: 'quadrilateral', 5: 'pentagon',
    6: 'hexagon', 7: 'heptagon', 8: 'octagon',
    9: 'nonagon', 10: 'decagon'
};

export const genPolygonP = () => {
    const qs = [];

    // Interior angle sum — 6 questions
    for (let i = 0; i < 6; i++) {
        const n = R(4, 10);
        const sum = (n - 2) * 180;
        const d1 = sum + 180;
        qs.push(qM(
            `Find the sum of interior angles of a ${polyNames[n]} (${n} sides).`,
            `${sum}°`,
            [`${n * 180}°`, `${d1}°`, `${360}°`],
            `Sum = (n − 2) × 180° = (${n} − 2) × 180° = ${sum}°.`,
            regularPolygonSVG(n, '?')
        ));
    }

    // Each interior angle of regular polygon — 6 questions
    for (let i = 0; i < 6; i++) {
        const n = R(3, 10);
        const each = ((n - 2) * 180) / n;
        const eachR = Math.round(each * 100) / 100;
        const d1 = Math.round((eachR + 10) * 100) / 100;
        qs.push(qM(
            `Each interior angle of a regular ${polyNames[n] || n + '-gon'} = ?`,
            `${eachR}°`,
            [`${180}°`, `${Math.round(360 / n * 100) / 100}°`, `${d1}°`],
            `Each = (n − 2) × 180° / n = ${(n - 2) * 180}° / ${n} = ${eachR}°.`,
            regularPolygonSVG(n, '?')
        ));
    }

    // Exterior angle of regular polygon — 5 questions
    for (let i = 0; i < 5; i++) {
        const n = R(3, 12);
        const ext = 360 / n;
        const extR = Math.round(ext * 100) / 100;
        const intR = Math.round(((n - 2) * 180 / n) * 100) / 100;
        const d1 = Math.round((extR + 10) * 100) / 100;
        qs.push(qM(
            `Each exterior angle of a regular ${n}-sided polygon = ?`,
            `${extR}°`,
            [`${intR}°`, `${180}°`, `${d1}°`],
            `Each exterior angle = 360° / n = 360° / ${n} = ${extR}°.`,
            extAnglePolygonSVG(n, '?')
        ));
    }

    // Number of diagonals — 5 questions
    for (let i = 0; i < 5; i++) {
        const n = R(4, 10);
        const d = n * (n - 3) / 2;
        qs.push(qM(
            `How many diagonals does a ${polyNames[n] || n + '-gon'} have?`,
            `${d}`,
            [`${n}`, `${n - 1}`, `${d + 2}`],
            `Diagonals = n(n − 3)/2 = ${n}(${n - 3})/2 = ${d}.`,
            diagonalPolygonSVG(n)
        ));
    }

    // Find n from exterior angle — up to 4 questions (skip non-integers)
    let nFromExtCount = 0;
    for (let attempt = 0; attempt < 20 && nFromExtCount < 4; attempt++) {
        const n = R(3, 12);
        const ext = 360 / n;
        if (ext !== Math.floor(ext)) continue;
        qs.push(qM(
            `Each exterior angle of a regular polygon is ${ext}°. How many sides does it have?`,
            `${n}`,
            [`${ext}`, `${n + 2}`, `${n - 1 > 2 ? n - 1 : n + 3}`],
            `n = 360° / ${ext}° = ${n}.`,
            nFromExtPolygonSVG(ext, n)
        ));
        nFromExtCount++;
    }

    return shuf(qs).slice(0, 20);
};

export const genPolygonA = () => {
    const qs = [];

    // Interior angle sum — 7 questions
    for (let i = 0; i < 7; i++) {
        const n = R(4, 10);
        const sum = (n - 2) * 180;
        qs.push(qM(
            `Sum of interior angles of a ${n}-sided polygon?`,
            `${sum}°`,
            [`${n * 180}°`, `${sum - 180}°`, `${360}°`],
            `(${n} − 2) × 180° = ${sum}°.`,
            regularPolygonSVG(n, `${n}-gon`)
        ));
    }

    // Each interior angle of regular n-gon — 7 questions
    for (let i = 0; i < 7; i++) {
        const n = R(3, 10);
        const each = Math.round(((n - 2) * 180) / n * 100) / 100;
        const d1 = Math.round((each + 15) * 100) / 100;
        qs.push(qM(
            `Interior angle of a regular ${n}-gon?`,
            `${each}°`,
            [`${Math.round(360 / n * 100) / 100}°`, `${180}°`, `${d1}°`],
            `(${n} − 2) × 180° / ${n} = ${each}°.`,
            regularPolygonSVG(n, '?')
        ));
    }

    // Exterior angle — 6 questions
    for (let i = 0; i < 6; i++) {
        const n = R(3, 12);
        const ext = Math.round(360 / n * 100) / 100;
        const intAng = Math.round(((n - 2) * 180 / n) * 100) / 100;
        const d1 = Math.round((ext + 5) * 100) / 100;
        qs.push(qM(
            `Exterior angle of a regular ${n}-sided polygon?`,
            `${ext}°`,
            [`${intAng}°`, `${180}°`, `${d1}°`],
            `360° / ${n} = ${ext}°.`,
            extAnglePolygonSVG(n, '?')
        ));
    }

    // Diagonals — 5 questions
    for (let i = 0; i < 5; i++) {
        const n = R(4, 10);
        const d = n * (n - 3) / 2;
        qs.push(qM(
            `Diagonals of a ${n}-gon?`,
            `${d}`,
            [`${n}`, `${n * 2}`, `${d + 3}`],
            `n(n−3)/2 = ${n}(${n - 3})/2 = ${d}.`,
            diagonalPolygonSVG(n)
        ));
    }

    return shuf(qs).slice(0, 20);
};

// Utilities to generate dynamic, varied questions for Triangles (NCERT Ch 7).
// Each skill generates diverse question types — not just "identify the criterion".

import React from 'react';

// ─── SVG DIAGRAM FACTORY ────────────────────────────────────────────────────

const svgStyle = { maxWidth: '100%', height: 'auto', display: 'block' };

const TwoTriangleDiagram = ({ t1, t2, color1 = '#2b6cb0', color2 = '#2f855a', highlightSides = [], highlightAngles = [], rightAngleAt = null }) => {
    const t1Top = [120, 30], t1BL = [40, 150], t1BR = [200, 150];
    const t2Top = [420, 30], t2BL = [340, 150], t2BR = [500, 150];

    const tickMark = (x1, y1, x2, y2, color, count = 1) => {
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        const dx = x2 - x1, dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        const px = -dy / len * 8, py = dx / len * 8;
        const marks = [];
        for (let i = 0; i < count; i++) {
            const offset = (i - (count - 1) / 2) * 6;
            const cx = mx + (dx / len) * offset, cy = my + (dy / len) * offset;
            marks.push(<line key={i} x1={cx - px} y1={cy - py} x2={cx + px} y2={cy + py} stroke={color} strokeWidth="2.5" strokeLinecap="round" />);
        }
        return marks;
    };

    const angleArc = (cx, cy, x1, y1, x2, y2, color, count = 1) => {
        const a1 = Math.atan2(y1 - cy, x1 - cx), a2 = Math.atan2(y2 - cy, x2 - cx);
        const arcs = [];
        for (let i = 0; i < count; i++) {
            const r = 18 + i * 5;
            const sx = cx + r * Math.cos(a1), sy = cy + r * Math.sin(a1);
            const ex = cx + r * Math.cos(a2), ey = cy + r * Math.sin(a2);
            arcs.push(<path key={i} d={`M ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey}`} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />);
        }
        return arcs;
    };

    const rightAngleBox = (cx, cy, x1, y1, x2, y2, color) => {
        const d1x = x1 - cx, d1y = y1 - cy, d2x = x2 - cx, d2y = y2 - cy;
        const len1 = Math.sqrt(d1x * d1x + d1y * d1y), len2 = Math.sqrt(d2x * d2x + d2y * d2y);
        const s = 12;
        const ux1 = d1x / len1 * s, uy1 = d1y / len1 * s, ux2 = d2x / len2 * s, uy2 = d2y / len2 * s;
        return <path d={`M ${cx + ux1} ${cy + uy1} L ${cx + ux1 + ux2} ${cy + uy1 + uy2} L ${cx + ux2} ${cy + uy2}`} fill="none" stroke={color} strokeWidth="2" />;
    };

    const sideTickMap = {};
    let tc = 1;
    if (highlightSides.includes('left')) sideTickMap['left'] = tc++;
    if (highlightSides.includes('right')) sideTickMap['right'] = tc++;
    if (highlightSides.includes('bottom')) sideTickMap['bottom'] = tc++;

    const angleTickMap = {};
    let ac = 1;
    if (highlightAngles.includes('bl')) angleTickMap['bl'] = ac++;
    if (highlightAngles.includes('top')) angleTickMap['top'] = ac++;
    if (highlightAngles.includes('br')) angleTickMap['br'] = ac++;

    const renderTri = (top, bl, br, t, color, isRight, rightAt) => (
        <>
            <polygon points={`${top[0]},${top[1]} ${bl[0]},${bl[1]} ${br[0]},${br[1]}`} fill={`${color}12`} stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
            {t.v[0] && <text x={top[0]} y={top[1] - 10} textAnchor="middle" fill={color} fontSize="14" fontWeight="bold" fontFamily="Outfit, sans-serif">{t.v[0]}</text>}
            {t.v[1] && <text x={bl[0] - 12} y={bl[1] + 16} textAnchor="middle" fill={color} fontSize="14" fontWeight="bold" fontFamily="Outfit, sans-serif">{t.v[1]}</text>}
            {t.v[2] && <text x={br[0] + 12} y={br[1] + 16} textAnchor="middle" fill={color} fontSize="14" fontWeight="bold" fontFamily="Outfit, sans-serif">{t.v[2]}</text>}
            {t.sides?.left && <text x={(top[0] + bl[0]) / 2 - 22} y={(top[1] + bl[1]) / 2} textAnchor="middle" fill={color} fontSize="11" fontWeight="700" fontFamily="Outfit, sans-serif">{t.sides.left}</text>}
            {t.sides?.right && <text x={(top[0] + br[0]) / 2 + 22} y={(top[1] + br[1]) / 2} textAnchor="middle" fill={color} fontSize="11" fontWeight="700" fontFamily="Outfit, sans-serif">{t.sides.right}</text>}
            {t.sides?.bottom && <text x={(bl[0] + br[0]) / 2} y={bl[1] + 18} textAnchor="middle" fill={color} fontSize="11" fontWeight="700" fontFamily="Outfit, sans-serif">{t.sides.bottom}</text>}
            {t.angles?.top && <text x={top[0] + 22} y={top[1] + 22} textAnchor="start" fill={color} fontSize="10" fontWeight="700" fontFamily="Outfit, sans-serif">{t.angles.top}</text>}
            {t.angles?.bl && <text x={bl[0] + 24} y={bl[1] - 8} textAnchor="start" fill={color} fontSize="10" fontWeight="700" fontFamily="Outfit, sans-serif">{t.angles.bl}</text>}
            {t.angles?.br && <text x={br[0] - 24} y={br[1] - 8} textAnchor="end" fill={color} fontSize="10" fontWeight="700" fontFamily="Outfit, sans-serif">{t.angles.br}</text>}
            {sideTickMap['left'] && tickMark(top[0], top[1], bl[0], bl[1], color, sideTickMap['left'])}
            {sideTickMap['right'] && tickMark(top[0], top[1], br[0], br[1], color, sideTickMap['right'])}
            {sideTickMap['bottom'] && tickMark(bl[0], bl[1], br[0], br[1], color, sideTickMap['bottom'])}
            {angleTickMap['top'] && angleArc(top[0], top[1], bl[0], bl[1], br[0], br[1], color, angleTickMap['top'])}
            {angleTickMap['bl'] && angleArc(bl[0], bl[1], br[0], br[1], top[0], top[1], color, angleTickMap['bl'])}
            {angleTickMap['br'] && angleArc(br[0], br[1], top[0], top[1], bl[0], bl[1], color, angleTickMap['br'])}
            {isRight && rightAt === 'bl' && rightAngleBox(bl[0], bl[1], br[0], br[1], top[0], top[1], color)}
            {isRight && rightAt === 'br' && rightAngleBox(br[0], br[1], top[0], top[1], bl[0], bl[1], color)}
        </>
    );

    const isRight = rightAngleAt !== null;
    return (
        <svg viewBox="0 0 540 175" width="460" style={svgStyle}>
            {renderTri(t1Top, t1BL, t1BR, t1, color1, isRight, rightAngleAt)}
            <text x="270" y="100" textAnchor="middle" fill="#64748b" fontSize="22" fontWeight="bold" fontFamily="Outfit, sans-serif">≅</text>
            {renderTri(t2Top, t2BL, t2BR, t2, color2, isRight, rightAngleAt)}
        </svg>
    );
};

// ─── SHUFFLE HELPER ─────────────────────────────────────────────────────────

const shuffleOpts = (qStr, optsArr, correctIdx, expl, chartComp = null) => {
    const raw = optsArr.map((opt, i) => ({ opt, isCorrect: i === correctIdx }));
    for (let i = raw.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [raw[i], raw[j]] = [raw[j], raw[i]];
    }
    return {
        type: 'mcq',
        q: qStr,
        opts: raw.map(r => r.opt),
        ans: raw.findIndex(r => r.isCorrect),
        expl,
        chart: chartComp
    };
};

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ─── SAS QUESTIONS ──────────────────────────────────────────────────────────

export const generateSASScenarios = () => {
    const questions = [];
    for (let i = 0; i < 30; i++) {
        const s1 = randInt(5, 14), s2 = randInt(s1 + 2, s1 + 12), angle = randInt(30, 90);
        const otherAngle1 = randInt(20, 70);
        const otherAngle2 = 180 - angle - otherAngle1;
        const type = i % 5;

        if (type === 0) {
            // Find a missing side using CPCT
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['A', 'B', 'C'], sides: { left: `${s1} cm`, right: `${s2} cm` }, angles: { bl: `${angle}°` } }}
                    t2={{ v: ['P', 'Q', 'R'], sides: { left: `${s1} cm`, right: '?' }, angles: { bl: `${angle}°` } }}
                    highlightSides={['left']} highlightAngles={['bl']}
                />
            );
            questions.push(shuffleOpts(
                `$\\triangle ABC \\cong \\triangle PQR$ by SAS, with $AB = PQ = ${s1}$ cm, $\\angle B = \\angle Q = ${angle}^{\\circ}$, and $BC = ${s2}$ cm. What is the length of $QR$?`,
                [`${s2} cm`, `${s1} cm`, `${s1 + s2} cm`, `Cannot be determined`],
                0,
                `Since $\\triangle ABC \\cong \\triangle PQR$, by CPCT the corresponding side $QR = BC = ${s2}$ cm.`,
                chart
            ));
        } else if (type === 1) {
            // Find a missing angle using CPCT
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['A', 'B', 'C'], sides: { left: `${s1}`, right: `${s2}` }, angles: { bl: `${angle}°`, top: `${otherAngle1}°`, br: `${otherAngle2}°` } }}
                    t2={{ v: ['D', 'E', 'F'], sides: { left: `${s1}`, right: `${s2}` }, angles: { bl: `${angle}°`, top: '?' } }}
                    highlightSides={['left', 'right']} highlightAngles={['bl']}
                />
            );
            questions.push(shuffleOpts(
                `$\\triangle ABC \\cong \\triangle DEF$ by SAS. If $\\angle A = ${otherAngle1}^{\\circ}$, $\\angle B = ${angle}^{\\circ}$, and $\\angle C = ${otherAngle2}^{\\circ}$, what is $\\angle D$?`,
                [`$${otherAngle1}^{\\circ}$`, `$${otherAngle2}^{\\circ}$`, `$${angle}^{\\circ}$`, `$${180 - angle}^{\\circ}$`],
                0,
                `By CPCT, corresponding angles are equal. $\\angle D$ corresponds to $\\angle A = ${otherAngle1}^{\\circ}$.`,
                chart
            ));
        } else if (type === 2) {
            // Identify which side must be included
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['L', 'M', 'N'], sides: { left: `${s1}` }, angles: { bl: `${angle}°` } }}
                    t2={{ v: ['X', 'Y', 'Z'], sides: { left: `${s1}` }, angles: { bl: `${angle}°` } }}
                    highlightSides={['left']} highlightAngles={['bl']}
                />
            );
            questions.push(shuffleOpts(
                `In $\\triangle LMN$ and $\\triangle XYZ$, $LM = XY = ${s1}$ cm and $\\angle M = \\angle Y = ${angle}^{\\circ}$. For SAS congruence, which additional pair must be equal?`,
                ['$MN = YZ$', '$LN = XZ$', '$\\angle L = \\angle X$', '$\\angle N = \\angle Z$'],
                0,
                `For SAS, the angle $\\angle M$ must be *included* between sides $LM$ and $MN$. So $MN = YZ$ is required.`,
                chart
            ));
        } else if (type === 3) {
            // Perimeter after proving congruence
            const s3 = randInt(s1, s2);
            const peri = s1 + s2 + s3;
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['A', 'B', 'C'], sides: { left: `${s1}`, right: `${s2}`, bottom: `${s3}` }, angles: { bl: `${angle}°` } }}
                    t2={{ v: ['P', 'Q', 'R'], sides: { left: `${s1}`, right: `${s2}`, bottom: '?' }, angles: { bl: `${angle}°` } }}
                    highlightSides={['left', 'right']} highlightAngles={['bl']}
                />
            );
            questions.push(shuffleOpts(
                `$\\triangle ABC \\cong \\triangle PQR$ by SAS. If $AB = ${s1}$ cm, $BC = ${s2}$ cm, and $AC = ${s3}$ cm, what is the perimeter of $\\triangle PQR$?`,
                [`${peri} cm`, `${peri + s1} cm`, `${s1 + s2} cm`, `Cannot be determined`],
                0,
                `By CPCT all sides are equal, so the perimeter of $\\triangle PQR$ is $${s1} + ${s2} + ${s3} = ${peri}$ cm.`,
                chart
            ));
        } else {
            // True/false conceptual
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['P', 'Q', 'R'], sides: { left: `${s1}`, bottom: `${s2}` }, angles: { br: `${angle}°` } }}
                    t2={{ v: ['X', 'Y', 'Z'], sides: { left: `${s1}`, bottom: `${s2}` }, angles: { br: `${angle}°` } }}
                    highlightSides={['left', 'bottom']} highlightAngles={['br']}
                />
            );
            questions.push(shuffleOpts(
                `In $\\triangle PQR$ and $\\triangle XYZ$, $PQ = XY = ${s1}$ cm, $QR = YZ = ${s2}$ cm, and $\\angle R = \\angle Z = ${angle}^{\\circ}$. Can we conclude congruence by SAS?`,
                ['No, because $\\angle R$ is not included between $PQ$ and $QR$', 'Yes, SAS applies directly', 'Yes, because two sides are equal', 'No, we need all three sides'],
                0,
                `SAS requires the angle to be *included* between the two known equal sides. $\\angle R$ is not between $PQ$ and $QR$ — it is between $QR$ and $PR$. So SAS does not apply here.`,
                chart
            ));
        }
    }
    return questions;
};

// ─── ASA QUESTIONS ──────────────────────────────────────────────────────────

export const generateASAScenarios = () => {
    const questions = [];
    for (let i = 0; i < 30; i++) {
        const a1 = randInt(30, 70), a2 = randInt(40, 80);
        const a3 = 180 - a1 - a2;
        if (a3 <= 0) continue; // skip invalid
        const side = randInt(5, 18);
        const type = i % 5;

        if (type === 0) {
            // Find the third angle
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['A', 'B', 'C'], sides: { bottom: `${side} cm` }, angles: { bl: `${a1}°`, br: `${a2}°`, top: '?' } }}
                    t2={{ v: ['P', 'Q', 'R'], sides: { bottom: `${side} cm` }, angles: { bl: `${a1}°`, br: `${a2}°`, top: '?' } }}
                    highlightSides={['bottom']} highlightAngles={['bl', 'br']}
                />
            );
            questions.push(shuffleOpts(
                `$\\triangle ABC \\cong \\triangle PQR$ by ASA. If $\\angle B = ${a1}^{\\circ}$ and $\\angle C = ${a2}^{\\circ}$, what is the value of $\\angle P$?`,
                [`$${a3}^{\\circ}$`, `$${a1}^{\\circ}$`, `$${a2}^{\\circ}$`, `$${a1 + a2}^{\\circ}$`],
                0,
                `$\\angle A = 180 - ${a1} - ${a2} = ${a3}^{\\circ}$. By CPCT, $\\angle P = \\angle A = ${a3}^{\\circ}$.`,
                chart
            ));
        } else if (type === 1) {
            // Find a missing side by CPCT
            const s2 = randInt(4, 15);
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['D', 'E', 'F'], sides: { bottom: `${side}`, right: `${s2} cm` }, angles: { bl: `${a1}°`, br: `${a2}°` } }}
                    t2={{ v: ['M', 'N', 'O'], sides: { bottom: `${side}`, right: '?' }, angles: { bl: `${a1}°`, br: `${a2}°` } }}
                    highlightSides={['bottom']} highlightAngles={['bl', 'br']}
                />
            );
            questions.push(shuffleOpts(
                `$\\triangle DEF \\cong \\triangle MNO$ by ASA. If $DF = ${s2}$ cm, what is $MO$?`,
                [`${s2} cm`, `${side} cm`, `${s2 + side} cm`, `Cannot be determined`],
                0,
                `By CPCT, $MO$ corresponds to $DF$. Since the triangles are congruent, $MO = DF = ${s2}$ cm.`,
                chart
            ));
        } else if (type === 2) {
            // Identify included side
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['A', 'B', 'C'], sides: {}, angles: { bl: `${a1}°`, br: `${a2}°` } }}
                    t2={{ v: ['P', 'Q', 'R'], sides: {}, angles: { bl: `${a1}°`, br: `${a2}°` } }}
                    highlightAngles={['bl', 'br']}
                />
            );
            questions.push(shuffleOpts(
                `In $\\triangle ABC$ and $\\triangle PQR$, $\\angle B = \\angle Q = ${a1}^{\\circ}$ and $\\angle C = \\angle R = ${a2}^{\\circ}$. Which side pair must be equal for ASA congruence?`,
                ['$BC = QR$ (the included side)', '$AB = PQ$', '$AC = PR$', 'Any side pair will work'],
                0,
                `For ASA, the side must be *included* between the two equal angles. $BC$ lies between $\\angle B$ and $\\angle C$, so $BC = QR$ is needed.`,
                chart
            ));
        } else if (type === 3) {
            // AAS corollary
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['X', 'Y', 'Z'], sides: { left: `${side} cm` }, angles: { bl: `${a1}°`, top: `${a3}°` } }}
                    t2={{ v: ['L', 'M', 'N'], sides: { left: `${side} cm` }, angles: { bl: `${a1}°`, top: `${a3}°` } }}
                    highlightSides={['left']} highlightAngles={['bl', 'top']}
                />
            );
            questions.push(shuffleOpts(
                `In $\\triangle XYZ$ and $\\triangle LMN$, $\\angle X = \\angle L = ${a3}^{\\circ}$, $\\angle Y = \\angle M = ${a1}^{\\circ}$, and $XY = LM = ${side}$ cm. The side $XY$ is NOT between $\\angle X$ and $\\angle Y$... wait, is it? Are they congruent?`,
                ['Yes — $XY$ IS between $\\angle X$ and $\\angle Y$, so ASA applies', 'No, ASA requires the side between the angles', 'Yes, but only by SSS', 'No, we need more information'],
                0,
                `$XY$ connects vertices $X$ and $Y$, so it is indeed included between $\\angle X$ and $\\angle Y$. ASA applies perfectly.`,
                chart
            ));
        } else {
            // Compute using angle sum
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['A', 'B', 'C'], sides: { bottom: `${side}` }, angles: { bl: `${a1}°`, top: `${a3}°` } }}
                    t2={{ v: ['D', 'E', 'F'], sides: { bottom: `${side}` }, angles: { bl: `${a1}°`, top: '?' } }}
                    highlightSides={['bottom']} highlightAngles={['bl']}
                />
            );
            questions.push(shuffleOpts(
                `If $\\triangle ABC \\cong \\triangle DEF$ and $\\angle A = ${a3}^{\\circ}$, $\\angle B = ${a1}^{\\circ}$, what is $\\angle F$?`,
                [`$${a2}^{\\circ}$`, `$${a3}^{\\circ}$`, `$${a1}^{\\circ}$`, `$${180 - a1}^{\\circ}$`],
                0,
                `$\\angle C = 180 - ${a3} - ${a1} = ${a2}^{\\circ}$. By CPCT, $\\angle F = \\angle C = ${a2}^{\\circ}$.`,
                chart
            ));
        }
    }
    return questions;
};

// ─── SSS QUESTIONS ──────────────────────────────────────────────────────────

export const generateSSSScenarios = () => {
    const questions = [];
    for (let i = 0; i < 30; i++) {
        const s1 = randInt(4, 10), s2 = randInt(s1 + 1, s1 + 6), s3 = randInt(s2, s2 + 3);
        const peri = s1 + s2 + s3;
        const type = i % 5;

        if (type === 0) {
            // Find corresponding side
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['A', 'B', 'C'], sides: { left: `${s1}`, right: `${s2}`, bottom: `${s3}` }, angles: {} }}
                    t2={{ v: ['P', 'Q', 'R'], sides: { left: `${s1}`, right: '?', bottom: `${s3}` }, angles: {} }}
                    highlightSides={['left', 'right', 'bottom']}
                />
            );
            questions.push(shuffleOpts(
                `$\\triangle ABC \\cong \\triangle PQR$ by SSS. If $AB = ${s1}$ cm, $BC = ${s2}$ cm, and $CA = ${s3}$ cm, what is $QR$?`,
                [`${s2} cm`, `${s1} cm`, `${s3} cm`, `${peri} cm`],
                0,
                `$QR$ corresponds to $BC$. By CPCT, $QR = BC = ${s2}$ cm.`,
                chart
            ));
        } else if (type === 1) {
            // Perimeter
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['X', 'Y', 'Z'], sides: { left: `${s1}`, right: `${s2}`, bottom: `${s3}` }, angles: {} }}
                    t2={{ v: ['E', 'F', 'G'], sides: { left: '?', right: '?', bottom: '?' }, angles: {} }}
                    highlightSides={['left', 'right', 'bottom']}
                />
            );
            questions.push(shuffleOpts(
                `$\\triangle XYZ \\cong \\triangle EFG$ by SSS. If the perimeter of $\\triangle XYZ$ is $${peri}$ cm, what is the perimeter of $\\triangle EFG$?`,
                [`${peri} cm`, `${peri * 2} cm`, `${Math.round(peri / 2)} cm`, `Cannot be determined`],
                0,
                `Congruent triangles have identical side lengths, so their perimeters are exactly the same: $${peri}$ cm.`,
                chart
            ));
        } else if (type === 2) {
            // Find angle by CPCT
            const ang = randInt(35, 80);
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['A', 'B', 'C'], sides: { left: `${s1}`, right: `${s2}`, bottom: `${s3}` }, angles: { bl: `${ang}°` } }}
                    t2={{ v: ['D', 'E', 'F'], sides: { left: `${s1}`, right: `${s2}`, bottom: `${s3}` }, angles: { bl: '?' } }}
                    highlightSides={['left', 'right', 'bottom']}
                />
            );
            questions.push(shuffleOpts(
                `$\\triangle ABC \\cong \\triangle DEF$ by SSS. If $\\angle B = ${ang}^{\\circ}$, what is $\\angle E$?`,
                [`$${ang}^{\\circ}$`, `$${180 - ang}^{\\circ}$`, `$${90 - ang}^{\\circ}$`, `Cannot be determined`],
                0,
                `By CPCT, corresponding angles are equal. $\\angle E$ corresponds to $\\angle B = ${ang}^{\\circ}$.`,
                chart
            ));
        } else if (type === 3) {
            // Can these form congruent triangles?
            const fakeS3 = s3 + randInt(1, 3);
            questions.push(shuffleOpts(
                `$\\triangle ABC$ has sides $${s1}$ cm, $${s2}$ cm, $${s3}$ cm. $\\triangle DEF$ has sides $${s1}$ cm, $${s2}$ cm, $${fakeS3}$ cm. Are they congruent by SSS?`,
                [`No, because $${s3} \\neq ${fakeS3}$`, 'Yes, two sides match', 'Yes, the angles will adjust', 'Cannot be determined'],
                0,
                `For SSS, ALL three pairs of sides must be equal. Since $${s3} \\neq ${fakeS3}$, they are NOT congruent.`
            ));
        } else {
            // Identify the third side
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['P', 'Q', 'R'], sides: { left: `${s1}`, right: `${s2}` }, angles: {} }}
                    t2={{ v: ['S', 'T', 'U'], sides: { left: `${s1}`, right: `${s2}` }, angles: {} }}
                    highlightSides={['left', 'right']}
                />
            );
            questions.push(shuffleOpts(
                `In $\\triangle PQR$ and $\\triangle STU$, $PQ = ST = ${s1}$ cm and $QR = TU = ${s2}$ cm. What additional information is needed for SSS congruence?`,
                [`$PR = SU$`, `$\\angle Q = \\angle T$`, `$\\angle P = \\angle S$`, `$PQ = QR$`],
                0,
                `SSS requires all three sides equal. We already have two pairs; the third pair $PR = SU$ completes SSS.`,
                chart
            ));
        }
    }
    return questions;
};

// ─── RHS QUESTIONS ──────────────────────────────────────────────────────────

export const generateRHSScenarios = () => {
    const questions = [];
    // Pythagorean triples for clean numbers
    const triples = [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[7,24,25],[9,12,15]];

    for (let i = 0; i < 30; i++) {
        const [a, b, c] = triples[i % triples.length];
        const scale = randInt(1, 3);
        const leg1 = a * scale, leg2 = b * scale, hyp = c * scale;
        const type = i % 5;

        if (type === 0) {
            // Find the missing leg using Pythagoras
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['A', 'B', 'C'], sides: { left: `${leg1}`, right: `${hyp}`, bottom: '?' }, angles: { bl: '90°' } }}
                    t2={{ v: ['D', 'E', 'F'], sides: { left: `${leg1}`, right: `${hyp}` }, angles: { bl: '90°' } }}
                    highlightSides={['left', 'right']} rightAngleAt="bl"
                />
            );
            questions.push(shuffleOpts(
                `In right $\\triangle ABC$ ($\\angle B = 90^{\\circ}$), $AB = ${leg1}$ cm and hypotenuse $AC = ${hyp}$ cm. Find $BC$.`,
                [`${leg2} cm`, `${hyp - leg1} cm`, `${leg1 + hyp} cm`, `${Math.round(Math.sqrt(hyp))} cm`],
                0,
                `By Pythagoras: $BC = \\sqrt{AC^2 - AB^2} = \\sqrt{${hyp}^2 - ${leg1}^2} = \\sqrt{${hyp*hyp - leg1*leg1}} = ${leg2}$ cm.`,
                chart
            ));
        } else if (type === 1) {
            // Find a missing side after RHS congruence
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['A', 'B', 'C'], sides: { left: `${leg1}`, right: `${hyp}`, bottom: `${leg2}` }, angles: { bl: '90°' } }}
                    t2={{ v: ['D', 'E', 'F'], sides: { left: `${leg1}`, right: `${hyp}`, bottom: '?' }, angles: { bl: '90°' } }}
                    highlightSides={['left', 'right']} rightAngleAt="bl"
                />
            );
            questions.push(shuffleOpts(
                `$\\triangle ABC \\cong \\triangle DEF$ by RHS. If $AB = ${leg1}$ cm, $AC = ${hyp}$ cm, and $BC = ${leg2}$ cm, what is $EF$?`,
                [`${leg2} cm`, `${leg1} cm`, `${hyp} cm`, `${hyp - leg1} cm`],
                0,
                `By CPCT, $EF$ corresponds to $BC = ${leg2}$ cm.`,
                chart
            ));
        } else if (type === 2) {
            // Find an angle
            const otherAngle = randInt(25, 65);
            const lastAngle = 90 - otherAngle;
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['P', 'Q', 'R'], sides: { right: `${hyp}` }, angles: { bl: '90°', top: `${otherAngle}°`, br: `${lastAngle}°` } }}
                    t2={{ v: ['X', 'Y', 'Z'], sides: { right: `${hyp}` }, angles: { bl: '90°', top: '?' } }}
                    highlightSides={['right']} rightAngleAt="bl"
                />
            );
            questions.push(shuffleOpts(
                `$\\triangle PQR \\cong \\triangle XYZ$ by RHS ($\\angle Q = \\angle Y = 90^{\\circ}$). If $\\angle P = ${otherAngle}^{\\circ}$, what is $\\angle X$?`,
                [`$${otherAngle}^{\\circ}$`, `$${lastAngle}^{\\circ}$`, `$90^{\\circ}$`, `$${180 - otherAngle}^{\\circ}$`],
                0,
                `By CPCT, $\\angle X = \\angle P = ${otherAngle}^{\\circ}$.`,
                chart
            ));
        } else if (type === 3) {
            // Area of right triangle
            const area = (leg1 * leg2) / 2;
            const chart = () => (
                <TwoTriangleDiagram
                    t1={{ v: ['A', 'B', 'C'], sides: { left: `${leg1}`, bottom: `${leg2}` }, angles: { bl: '90°' } }}
                    t2={{ v: ['D', 'E', 'F'], sides: { left: `${leg1}`, bottom: `${leg2}` }, angles: { bl: '90°' } }}
                    highlightSides={['left', 'bottom']} rightAngleAt="bl"
                />
            );
            questions.push(shuffleOpts(
                `Two right triangles are congruent by RHS with legs $${leg1}$ cm and $${leg2}$ cm. What is the area of each triangle?`,
                [`$${area}$ cm²`, `$${area * 2}$ cm²`, `$${leg1 * leg2}$ cm²`, `$${leg1 + leg2}$ cm²`],
                0,
                `Area of a right triangle $= \\frac{1}{2} \\times base \\times height = \\frac{1}{2} \\times ${leg1} \\times ${leg2} = ${area}$ cm².`,
                chart
            ));
        } else {
            // Conceptual: why can't we use RHS here?
            const fakeAngle = randInt(50, 80);
            questions.push(shuffleOpts(
                `$\\triangle ABC$ has $\\angle B = ${fakeAngle}^{\\circ}$, $AB = ${leg1}$ cm, and $AC = ${hyp}$ cm. Can we use RHS to prove congruence with another matching triangle?`,
                [`No, because $\\angle B \\neq 90^{\\circ}$`, 'Yes, the hypotenuse and side are given', 'Yes, any two matching parts suffice', 'Only if $\\angle A = 90^{\\circ}$'],
                0,
                `RHS *exclusively* requires a right angle ($90^{\\circ}$). Since $\\angle B = ${fakeAngle}^{\\circ}$, this is not a right triangle, and RHS cannot be used.`
            ));
        }
    }
    return questions;
};

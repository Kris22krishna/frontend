import React from 'react';

// Random integer between min and max (inclusive)
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Shuffle an array
const shuffle = (array) => {
    let oldElement;
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        oldElement = array[i];
        array[i] = array[rand];
        array[rand] = oldElement;
    }
    return array;
};

// Generate options containing the right answer and 3 tricky wrong answers
const generateOptions = (correctAngle, rangeMin = 10, rangeMax = 170) => {
    let opts = new Set([correctAngle]);
    // Common mistakes: 180 - x, 90 - x, 360 - x, completely random
    const mistakes = [
        180 - correctAngle,
        90 - correctAngle,
        correctAngle + 10,
        correctAngle - 10,
        180 - (correctAngle + 10),
        randInt(rangeMin, rangeMax)
    ].filter(x => x > 0 && x < 360 && x !== correctAngle);

    for (let m of mistakes) {
        if (opts.size < 4) opts.add(m);
    }
    while (opts.size < 4) {
        let filler = correctAngle + randInt(-20, 20);
        if (filler > 0 && filler !== correctAngle) opts.add(filler);
    }

    const optsArr = Array.from(opts);
    shuffle(optsArr);
    return {
        options: optsArr.map(o => `$${o}^{\\circ}$`),
        ansIndex: optsArr.indexOf(correctAngle)
    };
};

// ──────────────────── SKILL 1: LINEAR PAIR ────────────────────
export const generateLinearPairScenarios = () => {
    const scenarios = [];
    const templates = [
        'basic',        // basic: find x on a straight line
        'protractor',   // interactive protractor
        'ratio',        // Ex.1 style: given ratio of two angles on a line
        'bisector',     // Ex.2 style: ray bisects one angle, find angle between bisectors
        'three-ray',    // three rays on a line, two known, find third
        'supplement',   // supplementary check: which angle is supplementary?
        'expr-x',       // algebraic: (2x + 10) + (3x - 5) = 180
        'multi-split',  // 3 angles on a straight line, find missing
    ];

    for (let i = 0; i < 20; i++) {
        const tpl = templates[i % templates.length];

        if (tpl === 'protractor') {
            const angle = randInt(30, 150);
            scenarios.push({
                q: "Use the interactive protractor to measure the angle shown.",
                type: "protractor",
                ans: angle,
                expl: `The angle drawn measures exactly $${angle}^{\\circ}$.`,
                svg: { type: "protractor-measure", data: { angle } }
            });
        } else if (tpl === 'basic') {
            const a1 = randInt(25, 155);
            const a2 = 180 - a1;
            const unknown = Math.random() > 0.5 ? 1 : 2;
            const qAngle = unknown === 1 ? a1 : a2;
            const knownAngle = unknown === 1 ? a2 : a1;
            const { options, ansIndex } = generateOptions(qAngle);
            scenarios.push({
                q: `In the figure, $POQ$ is a straight line. Find the value of $x$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `By the Linear Pair Axiom, $x = 180^{\\circ} - ${knownAngle}^{\\circ} = ${qAngle}^{\\circ}$.`,
                svg: {
                    type: "linear-pair",
                    data: { a1: unknown === 1 ? "x" : `${a1}°`, a2: unknown === 2 ? "x" : `${a2}°`, splitAngle: a1, pointLabels: ['P', 'O', 'Q', ''] }
                }
            });
        } else if (tpl === 'ratio') {
            // Inspired by Ex.1: angles in ratio on a straight line
            const m = randInt(2, 5);
            const n = randInt(m + 1, 9);
            const total = m + n;
            const a1 = Math.round((m / total) * 180);
            const a2 = 180 - a1;
            const { options, ansIndex } = generateOptions(a1);
            scenarios.push({
                q: `A ray $OC$ stands on line $AB$. If $\\angle AOC : \\angle BOC = ${m} : ${n}$, find $\\angle AOC$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `Since $\\angle AOC + \\angle BOC = 180^{\\circ}$ (linear pair), and they are in the ratio $${m}:${n}$, $\\angle AOC = \\frac{${m}}{${total}} \\times 180^{\\circ} = ${a1}^{\\circ}$.`,
                svg: {
                    type: "linear-pair-labelled",
                    data: { labelLeft: `${m}k`, labelRight: `${n}k`, splitAngle: 180 - a1, pointLabels: ['A', 'O', 'B', 'C'] }
                }
            });
        } else if (tpl === 'bisector') {
            // Inspired by Ex.2: bisectors of a linear pair → always 90°
            const pos = randInt(40, 140);
            const { options, ansIndex } = generateOptions(90);
            scenarios.push({
                q: `Ray $OS$ stands on line $PQ$. Ray $OR$ bisects $\\angle POS$ and ray $OT$ bisects $\\angle SOQ$. Find $\\angle ROT$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `Let $\\angle POS = x$. Then $\\angle SOQ = 180^{\\circ} - x$. Since $OR$ bisects $\\angle POS$, $\\angle ROS = \\frac{x}{2}$. Since $OT$ bisects $\\angle SOQ$, $\\angle SOT = \\frac{180 - x}{2}$. So $\\angle ROT = \\frac{x}{2} + \\frac{180-x}{2} = 90^{\\circ}$.`,
                svg: {
                    type: "bisector-on-line",
                    data: { mainAngle: pos, pointLabels: ['P', 'O', 'Q', 'S', 'R', 'T'] }
                }
            });
        } else if (tpl === 'three-ray') {
            // Three rays on one side of a straight line
            const a1 = randInt(20, 70);
            const a2 = randInt(20, 70);
            const a3 = 180 - a1 - a2;
            if (a3 <= 5) { // skip degenerate
                const fallbackA1 = randInt(30, 60);
                const fallbackA2 = randInt(30, 60);
                const fallbackA3 = 180 - fallbackA1 - fallbackA2;
                const { options, ansIndex } = generateOptions(fallbackA3);
                scenarios.push({
                    q: `Three rays $OA$, $OB$, $OC$ emanate from point $O$ on one side of line $PQ$. If $\\angle POA = ${fallbackA1}^{\\circ}$ and $\\angle AOB = ${fallbackA2}^{\\circ}$, find $\\angle BOQ$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `All angles on one side of line $PQ$ sum to $180^{\\circ}$. So $\\angle BOQ = 180 - ${fallbackA1} - ${fallbackA2} = ${fallbackA3}^{\\circ}$.`,
                    svg: { type: "three-rays-on-line", data: { angles: [fallbackA1, fallbackA2, 'x'], pointLabels: ['P', 'O', 'Q', 'A', 'B'] } }
                });
            } else {
                const { options, ansIndex } = generateOptions(a3);
                scenarios.push({
                    q: `Three rays $OA$, $OB$, $OC$ emanate from point $O$ on one side of line $PQ$. If $\\angle POA = ${a1}^{\\circ}$ and $\\angle AOB = ${a2}^{\\circ}$, find $\\angle BOQ$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `All angles on one side of line $PQ$ sum to $180^{\\circ}$. So $\\angle BOQ = 180 - ${a1} - ${a2} = ${a3}^{\\circ}$.`,
                    svg: { type: "three-rays-on-line", data: { angles: [a1, a2, 'x'], pointLabels: ['P', 'O', 'Q', 'A', 'B'] } }
                });
            }
        } else if (tpl === 'supplement') {
            // Which pair is supplementary?
            const a = randInt(30, 150);
            const supp = 180 - a;
            const wrong1 = 90 - a > 0 ? 90 - a : randInt(10, 170);
            const wrong2 = randInt(10, 170);
            const wrong3 = randInt(10, 170);
            const allOpts = shuffle([supp, wrong1, wrong2, wrong3].filter((v, idx, arr) => arr.indexOf(v) === idx));
            while (allOpts.length < 4) allOpts.push(randInt(10, 170));
            const ansIdx = allOpts.indexOf(supp);
            scenarios.push({
                q: `An angle measures $${a}^{\\circ}$. Which of the following is its supplement?`,
                type: "mcq",
                opts: allOpts.map(o => `$${o}^{\\circ}$`),
                ans: ansIdx,
                expl: `Supplementary angles sum to $180^{\\circ}$. So the supplement of $${a}^{\\circ}$ is $180 - ${a} = ${supp}^{\\circ}$.`,
                svg: {
                    type: "linear-pair",
                    data: { a1: `${a}°`, a2: '?', splitAngle: a, pointLabels: ['', '', '', ''] }
                }
            });
        } else if (tpl === 'expr-x') {
            // Algebraic: (ax + b) + (cx + d) = 180
            const x = randInt(10, 40);
            const aCoeff = randInt(2, 4);
            const bConst = randInt(-10, 20);
            const angle1 = aCoeff * x + bConst;
            const angle2 = 180 - angle1;
            const { options, ansIndex } = generateOptions(x, 5, 60);
            const expr1 = bConst >= 0 ? `(${aCoeff}x + ${bConst})^{\\circ}` : `(${aCoeff}x - ${Math.abs(bConst)})^{\\circ}`;
            scenarios.push({
                q: `In the figure, $AOB$ is a straight line. If $\\angle AOC = ${expr1}$ and $\\angle BOC = ${angle2}^{\\circ}$, find the value of $x$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `Since $AOB$ is a straight line, $\\angle AOC + \\angle BOC = 180^{\\circ}$. So ${aCoeff}x ${bConst >= 0 ? '+' : '-'} ${Math.abs(bConst)} + ${angle2} = 180$, which gives $${aCoeff}x = ${180 - angle2 - bConst}$, so $x = ${x}$.`,
                svg: {
                    type: "linear-pair-labelled",
                    data: { labelLeft: bConst >= 0 ? `(${aCoeff}x+${bConst})°` : `(${aCoeff}x-${Math.abs(bConst)})°`, labelRight: `${angle2}°`, splitAngle: angle2, pointLabels: ['A', 'O', 'B', 'C'] }
                }
            });
        } else if (tpl === 'multi-split') {
            // 3 angles on a straight line
            const a1 = randInt(30, 60);
            const a2 = randInt(30, 60);
            const a3 = 180 - a1 - a2;
            const hidden = randInt(0, 2);
            const ans = [a1, a2, a3][hidden];
            const { options, ansIndex } = generateOptions(ans);
            const labels = [`${a1}°`, `${a2}°`, `${a3}°`];
            labels[hidden] = 'x';
            scenarios.push({
                q: `Three rays from point $O$ divide the upper half of a straight line into three angles. If the angles are $${labels[0]}$, $${labels[1]}$ and $${labels[2]}$, find $x$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `All angles on one side of a straight line sum to $180^{\\circ}$. So $x = 180 - ${[a1, a2, a3].filter((_, idx) => idx !== hidden).join(' - ')} = ${ans}^{\\circ}$.`,
                svg: { type: "three-rays-on-line", data: { angles: labels, pointLabels: ['P', 'O', 'Q', 'A', 'B'] } }
            });
        }
    }
    return scenarios;
};

// ──────────────────── SKILL 2: VERTICALLY OPPOSITE ANGLES ────────────────────
export const generateVOAScenarios = () => {
    const scenarios = [];
    const templates = [
        'basic-vo',         // find vertically opposite angle
        'adjacent-lp',      // find adjacent angle via linear pair
        'ratio-intersect',  // Ex.1 style: ratio of VOA pair
        'all-four',         // given one angle, find all four
        'three-lines',      // 3 lines through a point
        'voa-plus-ray',     // Ex.6.1-Q1 style: extra ray + VOA
        'expr-voa',         // algebraic: (3x+5) = (5x-25)
        'reflex',           // find the reflex angle
    ];

    for (let i = 0; i < 20; i++) {
        const tpl = templates[i % templates.length];

        if (tpl === 'basic-vo') {
            const baseAngle = randInt(30, 80);
            const { options, ansIndex } = generateOptions(baseAngle);
            scenarios.push({
                q: `Two straight lines intersect at point $O$. If one of the angles is $${baseAngle}^{\\circ}$, find the vertically opposite angle $x$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `Vertically opposite angles are always equal. Therefore, $x = ${baseAngle}^{\\circ}$.`,
                svg: { type: "intersecting", data: { top: '', right: `${baseAngle}°`, bottom: '', left: `x`, angle: baseAngle } }
            });
        } else if (tpl === 'adjacent-lp') {
            const baseAngle = randInt(30, 80);
            const obtuseAngle = 180 - baseAngle;
            const { options, ansIndex } = generateOptions(obtuseAngle);
            scenarios.push({
                q: `Two straight lines intersect at point $O$. If the acute angle is $${baseAngle}^{\\circ}$, what is the measure of the adjacent obtuse angle $x$?`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `Adjacent angles on intersecting lines form a linear pair: $x = 180^{\\circ} - ${baseAngle}^{\\circ} = ${obtuseAngle}^{\\circ}$.`,
                svg: { type: "intersecting", data: { top: 'x', right: `${baseAngle}°`, bottom: '', left: '', angle: baseAngle } }
            });
        } else if (tpl === 'ratio-intersect') {
            // Inspired by Ex.1: ∠POR : ∠ROQ = m : n
            const n = randInt(2, 7);
            const m = randInt(n + 1, 11);
            const total = m + n;
            const a1 = Math.round((n / total) * 180); // acute
            const a2 = 180 - a1; // obtuse
            const { options, ansIndex } = generateOptions(a1);
            scenarios.push({
                q: `Lines $PQ$ and $RS$ intersect at $O$. If $\\angle POR : \\angle ROQ = ${m} : ${n}$, find $\\angle ROQ$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `$\\angle POR$ and $\\angle ROQ$ form a linear pair, so they sum to $180^{\\circ}$. $\\angle ROQ = \\frac{${n}}{${total}} \\times 180 = ${a1}^{\\circ}$.`,
                svg: { type: "intersecting-labelled", data: { labels: [`${m}k`, `${n}k`, `${m}k`, `${n}k`], angle: a1, pointLabels: ['P', 'Q', 'R', 'S', 'O'] } }
            });
        } else if (tpl === 'all-four') {
            const a = randInt(35, 75);
            const b = 180 - a;
            // ask for the obtuse angle
            const { options, ansIndex } = generateOptions(b);
            scenarios.push({
                q: `Two lines cross at point $O$ forming four angles. One angle is $${a}^{\\circ}$. What is the measure of each obtuse angle formed?`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `The four angles are $${a}^{\\circ}, ${b}^{\\circ}, ${a}^{\\circ}, ${b}^{\\circ}$. The obtuse angle = $180 - ${a} = ${b}^{\\circ}$.`,
                svg: { type: "intersecting-four", data: { a, b, angle: a } }
            });
        } else if (tpl === 'three-lines') {
            // 3 lines through a point → 6 angles
            const a1 = randInt(25, 55);
            const a2 = randInt(25, 55);
            const a3 = 180 - a1 - a2;
            const { options, ansIndex } = generateOptions(a3);
            scenarios.push({
                q: `Three lines pass through point $O$. Two of the six angles formed are $${a1}^{\\circ}$ and $${a2}^{\\circ}$ (as adjacent angles). Find the third angle $x$ that completes the semicircle.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `The three angles on one side of the line sum to $180^{\\circ}$. So $x = 180 - ${a1} - ${a2} = ${a3}^{\\circ}$.`,
                svg: { type: "three-lines-point", data: { angles: [a1, a2, a3], pointLabels: ['O'] } }
            });
        } else if (tpl === 'voa-plus-ray') {
            // Inspired by Ex.6.1 Q1: lines AB and CD intersect at O, extra ray OE
            const bod = randInt(30, 60);
            const boe = randInt(15, 35);
            const aoc = bod; // vertically opposite
            const coe = 180 - aoc - boe; // since AOC + COE + BOE = 180 (on line AB side? No, recalculate)
            // Actually: ∠AOC = ∠BOD (VOA). ∠AOC + ∠BOE = given. ∠BOD = given. Find ∠BOE.
            // Better setup: ∠AOC + ∠COE = known, ∠BOD = known
            const angleAOC = randInt(40, 70);
            const angleBOD = angleAOC; // VOA
            const angleBOE = randInt(15, 40);
            const angleCOE = 180 - angleAOC - angleBOE; // angles on straight line AB... no
            // Let's simplify: lines AB & CD at O. Ray OE between OB and OD such that ∠BOE = e.
            // ∠AOC = ∠BOD (VOA), and ∠AOC + ∠BOE is given.
            const vocAngle = randInt(40, 70);
            const boeAngle = randInt(20, 40);
            const reflexCOE = 360 - vocAngle - (180 - vocAngle) - boeAngle; // not straightforward enough
            
            // Simpler: If ∠AOC + ∠BOE = 70° and ∠BOD = 40°, find ∠BOE and reflex ∠COE
            const angleBOD2 = randInt(30, 60);
            const sumAocBoe = randInt(60, 100);
            const angleAOC2 = angleBOD2; // VOA
            const angleBOE2 = sumAocBoe - angleAOC2;
            if (angleBOE2 > 0 && angleBOE2 < 90) {
                const { options, ansIndex } = generateOptions(angleBOE2);
                scenarios.push({
                    q: `Lines $AB$ and $CD$ intersect at $O$. Ray $OE$ is between $OB$ and $OD$. If $\\angle AOC + \\angle BOE = ${sumAocBoe}^{\\circ}$ and $\\angle BOD = ${angleBOD2}^{\\circ}$, find $\\angle BOE$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `$\\angle AOC = \\angle BOD = ${angleBOD2}^{\\circ}$ (VOA). So $\\angle BOE = ${sumAocBoe} - ${angleBOD2} = ${angleBOE2}^{\\circ}$.`,
                    svg: { type: "intersecting-extra-ray", data: { angleBOD: angleBOD2, angleBOE: angleBOE2, pointLabels: ['A', 'B', 'C', 'D', 'O', 'E'] } }
                });
            } else {
                // Fallback to basic
                const fb = randInt(35, 75);
                const { options, ansIndex } = generateOptions(fb);
                scenarios.push({
                    q: `Two straight lines cross at $O$. One angle is $${fb}^{\\circ}$. Find its vertically opposite angle.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `VOA are equal. $x = ${fb}^{\\circ}$.`,
                    svg: { type: "intersecting", data: { top: '', right: `${fb}°`, bottom: '', left: `x`, angle: fb } }
                });
            }
        } else if (tpl === 'expr-voa') {
            // Algebraic VOA: (3x + 5)° = (5x - 25)°
            const x = randInt(5, 25);
            const a = randInt(2, 4);
            const b = randInt(1, 20);
            const c = a + randInt(1, 3);
            const d = c * x - (a * x + b); // so that a*x + b = c*x - d
            const angleVal = a * x + b;
            if (d > 0 && angleVal > 10 && angleVal < 170) {
                const { options, ansIndex } = generateOptions(x, 2, 40);
                scenarios.push({
                    q: `Two lines intersect. The vertically opposite angles are $(${a}x + ${b})^{\\circ}$ and $(${c}x - ${d})^{\\circ}$. Find $x$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `VOA are equal: $${a}x + ${b} = ${c}x - ${d}$. Solving: $${b} + ${d} = ${c - a}x$, so $x = ${x}$.`,
                    svg: { type: "intersecting", data: { top: '', right: `(${a}x+${b})°`, bottom: '', left: `(${c}x-${d})°`, angle: angleVal } }
                });
            } else {
                const fb = randInt(30, 75);
                const fbOpp = 180 - fb;
                const { options, ansIndex } = generateOptions(fbOpp);
                scenarios.push({
                    q: `Two lines cross. One angle is $${fb}^{\\circ}$. What is the adjacent angle?`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `Adjacent angles form a linear pair: $x = 180 - ${fb} = ${fbOpp}^{\\circ}$.`,
                    svg: { type: "intersecting", data: { top: 'x', right: `${fb}°`, bottom: '', left: '', angle: fb } }
                });
            }
        } else if (tpl === 'reflex') {
            const a = randInt(30, 80);
            const reflex = 360 - a;
            const { options, ansIndex } = generateOptions(reflex, 200, 340);
            scenarios.push({
                q: `Two lines intersect at $O$. One angle is $${a}^{\\circ}$. Find the reflex angle at $O$ on the same side.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `The reflex angle is the larger angle going around: $360 - ${a} = ${reflex}^{\\circ}$.`,
                svg: { type: "intersecting-reflex", data: { a, reflex, angle: a } }
            });
        }
    }
    return scenarios;
};

// ──────────────────── SKILL 3: PARALLEL LINES & TRANSVERSALS ────────────────────
export const generateParallelLinesScenarios = () => {
    const scenarios = [];
    const templates = [
        'alt-int',          // basic alternate interior
        'corr',             // basic corresponding
        'co-int',           // co-interior (same-side interior)
        'aux-line',         // Ex.4 style: draw auxiliary line between parallel lines
        'perp-parallel',    // Ex.6 style: perpendicular + parallel combo
        'ratio-parallel',   // Ex.6.2 Q1 style: y:z given ratio, AB||CD||EF
        'alt-ext',          // alternate exterior angles
        'find-x-y',        // find two unknowns x and y on parallel lines
    ];

    for (let i = 0; i < 20; i++) {
        const tpl = templates[i % templates.length];
        const acute = randInt(40, 80);
        const obtuse = 180 - acute;

        if (tpl === 'alt-int') {
            const { options, ansIndex } = generateOptions(acute);
            scenarios.push({
                q: `Lines $l$ and $m$ are parallel. A transversal cuts them forming the angle shown. Find the alternate interior angle $x$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `Alternate interior angles are equal when lines are parallel. $x = ${acute}^{\\circ}$.`,
                svg: { type: "parallel", data: { knownLoc: "t-bl", unknownLoc: "b-tr", knownVal: acute, tilt: acute } }
            });
        } else if (tpl === 'corr') {
            const { options, ansIndex } = generateOptions(obtuse);
            scenarios.push({
                q: `Lines $l$ and $m$ are parallel. A transversal cuts them. Find the corresponding angle $x$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `Corresponding angles are equal. $x = ${obtuse}^{\\circ}$.`,
                svg: { type: "parallel", data: { knownLoc: "t-tl", unknownLoc: "b-tl", knownVal: obtuse, tilt: acute } }
            });
        } else if (tpl === 'co-int') {
            const { options, ansIndex } = generateOptions(obtuse);
            scenarios.push({
                q: `Lines $l$ and $m$ are parallel. Find the co-interior angle $x$ on the same side of the transversal.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `Co-interior angles sum to $180^{\\circ}$. $x = 180 - ${acute} = ${obtuse}^{\\circ}$.`,
                svg: { type: "parallel", data: { knownLoc: "b-tr", unknownLoc: "t-br", knownVal: acute, tilt: acute } }
            });
        } else if (tpl === 'aux-line') {
            // Ex.4 style: PQ || RS, find ∠XMY using auxiliary line
            const mxq = randInt(115, 155);
            const myr = randInt(25, 55);
            const xmb = 180 - mxq;
            const bmy = myr;
            const xmy = xmb + bmy;
            const { options, ansIndex } = generateOptions(xmy);
            scenarios.push({
                q: `$PQ \\parallel RS$. If $\\angle MXQ = ${mxq}^{\\circ}$ and $\\angle MYR = ${myr}^{\\circ}$, find $\\angle XMY$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `Draw line $AB$ through $M$ parallel to $PQ$. Then $\\angle XMB = 180 - ${mxq} = ${xmb}^{\\circ}$ (co-interior) and $\\angle BMY = ${myr}^{\\circ}$ (alternate). So $\\angle XMY = ${xmb} + ${myr} = ${xmy}^{\\circ}$.`,
                svg: { type: "parallel-aux-line", data: { mxq, myr, xmy, pointLabels: ['P', 'Q', 'R', 'S', 'M', 'X', 'Y'] } }
            });
        } else if (tpl === 'perp-parallel') {
            // Ex.6 style: AB||CD||EF, EA⊥AB, ∠BEF given
            const bef = randInt(25, 65);
            const z = 90 - bef; // since ∠EAB + ∠FEA = 180, and ∠EAB = 90
            const y = 180 - bef; // co-interior with EF
            const x = y; // AB||CD, corresponding
            // Ask for z
            const { options, ansIndex } = generateOptions(z);
            scenarios.push({
                q: `$AB \\parallel CD$ and $CD \\parallel EF$. Also $EA \\perp AB$. If $\\angle BEF = ${bef}^{\\circ}$, find the value of $z$ where $\\angle FEA = z + ${bef}^{\\circ}$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `Since $AB \\parallel EF$, $\\angle EAB + \\angle FEA = 180^{\\circ}$. So $90 + z + ${bef} = 180$, giving $z = ${z}^{\\circ}$.`,
                svg: { type: "parallel-perp", data: { bef, z, x, y, pointLabels: ['A', 'B', 'C', 'D', 'E', 'F'] } }
            });
        } else if (tpl === 'ratio-parallel') {
            // Ex.6.2 Q1: AB||CD||EF, y:z ratio given, find x
            const rm = randInt(2, 4);
            const rn = randInt(rm + 1, 8);
            const total = rm + rn;
            const y = Math.round((rm / total) * 180);
            const z = 180 - y;
            const x = 180 - y; // since AB || CD, co-interior
            const { options, ansIndex } = generateOptions(x);
            scenarios.push({
                q: `$AB \\parallel CD \\parallel EF$. If $y : z = ${rm} : ${rn}$, find $x$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `$y + z = 180^{\\circ}$ (co-interior). So $y = \\frac{${rm}}{${total}} \\times 180 = ${y}^{\\circ}$. Since $AB \\parallel CD$, $x + y = 180^{\\circ}$, so $x = ${x}^{\\circ}$.`,
                svg: { type: "triple-parallel", data: { y, z, x, rm, rn, pointLabels: ['A', 'B', 'C', 'D', 'E', 'F'] } }
            });
        } else if (tpl === 'alt-ext') {
            // Alternate exterior angles
            const { options, ansIndex } = generateOptions(acute);
            scenarios.push({
                q: `Lines $l \\parallel m$. A transversal cuts them. If the exterior angle on one side is $${acute}^{\\circ}$, find the alternate exterior angle $x$ on the other side.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `Alternate exterior angles are equal when lines are parallel. $x = ${acute}^{\\circ}$.`,
                svg: { type: "parallel-ext", data: { knownVal: acute, tilt: acute } }
            });
        } else if (tpl === 'find-x-y') {
            // Find x: ∠APQ = 50° and ∠PRD = 127°, AB||CD
            const apq = randInt(40, 70);
            const prd = randInt(110, 150);
            const pqr = apq; // alternate interior (AB||CD)
            const qpr = prd - pqr; // nah... let me redo
            // Better: AB||CD, ∠APQ = apq, ∠PRD = prd. Find y = ∠QPR
            // ∠PQR (interior) = apq (alternate). ∠QPR + ∠PQR = ∠PRD (exterior angle theorem... no)
            // Actually: ∠APQ = ∠PQR (alternate interior, AB||CD). x = ∠PQR = apq.
            // ∠PRD = ∠APR (what?) Hmm.
            // Simpler: if AB||CD, transversal PQ, ∠APQ = 50, find ∠PQD
            const apqAngle = randInt(40, 70);
            const pqdAngle = 180 - apqAngle; // co-interior
            const { options, ansIndex } = generateOptions(pqdAngle);
            scenarios.push({
                q: `$AB \\parallel CD$. A transversal $PQ$ cuts $AB$ at $P$ and $CD$ at $Q$. If $\\angle APQ = ${apqAngle}^{\\circ}$, find $\\angle PQD$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `$\\angle APQ$ and $\\angle PQD$ are co-interior angles. $\\angle PQD = 180 - ${apqAngle} = ${pqdAngle}^{\\circ}$.`,
                svg: { type: "parallel-transversal-labelled", data: { apq: apqAngle, pqd: pqdAngle, pointLabels: ['A', 'B', 'C', 'D', 'P', 'Q'] } }
            });
        }
    }
    return scenarios;
};

// ──────────────────── SKILL 4: ANGLE SUM & COMPLEX PROVING ────────────────────
export const generateAngleSumScenarios = () => {
    const scenarios = [];
    const templates = [
        'four-rays',        // Ex.3 style: 4 rays from a point → 360°
        'three-known',      // 3 known angles around a point, find 4th
        'five-rays',        // 5 rays from a point, 4 known
        'supplement-check', // which set of angles can lie around a point?
        'lp-plus-voa',      // combined: intersecting lines + extra ray
        'triangle-ext',     // exterior angle of a triangle = sum of remote interior
        'straight-plus-point', // angles on one side of line + angles around point
        'mixed-diagram',    // complex: parallel lines + VOA + linear pair in one
    ];

    for (let i = 0; i < 20; i++) {
        const tpl = templates[i % templates.length];

        if (tpl === 'four-rays') {
            // Ex.3 inspired: 4 rays from O, prove/find sum = 360
            const a1 = randInt(40, 100);
            const a2 = randInt(40, 100);
            const a3 = randInt(40, 100);
            const a4 = 360 - (a1 + a2 + a3);
            if (a4 <= 10 || a4 >= 200) {
                // fallback
                const fb = [90, 80, 100, 90];
                const { options, ansIndex } = generateOptions(fb[3]);
                scenarios.push({
                    q: `Four rays $OP$, $OQ$, $OR$, $OS$ meet at point $O$. If $\\angle POQ = ${fb[0]}^{\\circ}$, $\\angle QOR = ${fb[1]}^{\\circ}$ and $\\angle ROS = ${fb[2]}^{\\circ}$, find $\\angle SOP$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `Angles around a point sum to $360^{\\circ}$. $\\angle SOP = 360 - ${fb[0]} - ${fb[1]} - ${fb[2]} = ${fb[3]}^{\\circ}$.`,
                    svg: { type: "angles-around-point", data: { angles: [fb[0], fb[1], fb[2], "x"] } }
                });
            } else {
                const { options, ansIndex } = generateOptions(a4);
                scenarios.push({
                    q: `Four rays $OP$, $OQ$, $OR$, $OS$ meet at point $O$. If $\\angle POQ = ${a1}^{\\circ}$, $\\angle QOR = ${a2}^{\\circ}$ and $\\angle ROS = ${a3}^{\\circ}$, find $\\angle SOP$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `Angles around a point sum to $360^{\\circ}$. $\\angle SOP = 360 - ${a1} - ${a2} - ${a3} = ${a4}^{\\circ}$.`,
                    svg: { type: "angles-around-point", data: { angles: [a1, a2, a3, "x"] } }
                });
            }
        } else if (tpl === 'three-known') {
            const a1 = randInt(50, 120);
            const a2 = randInt(50, 120);
            const a3 = randInt(50, 120);
            let a4 = 360 - a1 - a2 - a3;
            if (a4 <= 5 || a4 >= 200) {
                a4 = 90;
                const adjustedA3 = 360 - a1 - a2 - a4;
                const { options, ansIndex } = generateOptions(a4);
                scenarios.push({
                    q: `Angles around a point: $${a1}^{\\circ}$, $${a2}^{\\circ}$, $${adjustedA3}^{\\circ}$ and $x$. Find $x$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `$x = 360 - ${a1} - ${a2} - ${adjustedA3} = ${a4}^{\\circ}$.`,
                    svg: { type: "angles-around-point", data: { angles: [a1, a2, adjustedA3, 'x'] } }
                });
            } else {
                const { options, ansIndex } = generateOptions(a4);
                scenarios.push({
                    q: `Angles around point $O$ are $${a1}^{\\circ}$, $${a2}^{\\circ}$, $${a3}^{\\circ}$ and $x$. Find $x$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `$x = 360 - ${a1} - ${a2} - ${a3} = ${a4}^{\\circ}$.`,
                    svg: { type: "angles-around-point", data: { angles: [a1, a2, a3, "x"] } }
                });
            }
        } else if (tpl === 'five-rays') {
            const a1 = randInt(40, 80);
            const a2 = randInt(40, 80);
            const a3 = randInt(40, 80);
            const a4 = randInt(40, 80);
            const a5 = 360 - a1 - a2 - a3 - a4;
            if (a5 > 10 && a5 < 180) {
                const { options, ansIndex } = generateOptions(a5);
                scenarios.push({
                    q: `Five rays from point $O$. Four angles are $${a1}^{\\circ}$, $${a2}^{\\circ}$, $${a3}^{\\circ}$, $${a4}^{\\circ}$. Find the fifth angle $x$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `$x = 360 - (${a1} + ${a2} + ${a3} + ${a4}) = ${a5}^{\\circ}$.`,
                    svg: { type: "five-rays-point", data: { angles: [a1, a2, a3, a4, 'x'] } }
                });
            } else {
                const fba = [60, 70, 80, 50, 100];
                const { options, ansIndex } = generateOptions(100);
                scenarios.push({
                    q: `Five rays from point $O$. Four angles are $60^{\\circ}$, $70^{\\circ}$, $80^{\\circ}$, $50^{\\circ}$. Find the fifth angle $x$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `$x = 360 - 260 = 100^{\\circ}$.`,
                    svg: { type: "five-rays-point", data: { angles: [60, 70, 80, 50, 'x'] } }
                });
            }
        } else if (tpl === 'supplement-check') {
            // Can these angles exist around a point?
            const a1 = randInt(50, 100);
            const a2 = randInt(50, 100);
            const a3 = 360 - a1 - a2;
            const { options, ansIndex } = generateOptions(a3);
            scenarios.push({
                q: `Three angles around a point are $${a1}^{\\circ}$, $${a2}^{\\circ}$ and $x$. Find $x$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `$x = 360 - ${a1} - ${a2} = ${a3}^{\\circ}$.`,
                svg: { type: "three-rays-around-point", data: { angles: [a1, a2, 'x'] } }
            });
        } else if (tpl === 'lp-plus-voa') {
            // Two intersecting lines + extra ray
            const acute = randInt(30, 70);
            const extraRay = randInt(15, acute - 5 > 15 ? acute - 5 : 15);
            const ans = acute - extraRay;
            if (ans > 5) {
                const { options, ansIndex } = generateOptions(ans);
                scenarios.push({
                    q: `Lines $AB$ and $CD$ cross at $O$. Ray $OE$ lies between $OA$ and $OC$. If $\\angle BOD = ${acute}^{\\circ}$ and $\\angle AOE = ${extraRay}^{\\circ}$, find $\\angle EOC$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `$\\angle AOC = \\angle BOD = ${acute}^{\\circ}$ (VOA). $\\angle EOC = \\angle AOC - \\angle AOE = ${acute} - ${extraRay} = ${ans}^{\\circ}$.`,
                    svg: { type: "intersecting-extra-ray", data: { angleBOD: acute, angleAOE: extraRay, pointLabels: ['A', 'B', 'C', 'D', 'O', 'E'] } }
                });
            } else {
                const fb = randInt(40, 100);
                const fb2 = randInt(40, 100);
                const fb3 = randInt(40, 100);
                const fb4 = 360 - fb - fb2 - fb3;
                const { options, ansIndex } = generateOptions(fb4 > 0 ? fb4 : 80);
                scenarios.push({
                    q: `Four rays from $O$: $${fb}^{\\circ}$, $${fb2}^{\\circ}$, $${fb3}^{\\circ}$ and $x$. Find $x$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `$x = 360 - ${fb} - ${fb2} - ${fb3} = ${fb4 > 0 ? fb4 : 80}^{\\circ}$.`,
                    svg: { type: "angles-around-point", data: { angles: [fb, fb2, fb3, 'x'] } }
                });
            }
        } else if (tpl === 'triangle-ext') {
            // Exterior angle = sum of remote interior angles
            const intA = randInt(30, 70);
            const intB = randInt(30, 70);
            const extC = intA + intB;
            const { options, ansIndex } = generateOptions(extC);
            scenarios.push({
                q: `In $\\triangle PQR$, side $QR$ is extended to $S$. If $\\angle P = ${intA}^{\\circ}$ and $\\angle Q = ${intB}^{\\circ}$, find the exterior angle $\\angle PRS$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `The exterior angle of a triangle equals the sum of the two non-adjacent interior angles. $\\angle PRS = ${intA} + ${intB} = ${extC}^{\\circ}$.`,
                svg: { type: "triangle-exterior", data: { intA, intB, extC, pointLabels: ['P', 'Q', 'R', 'S'] } }
            });
        } else if (tpl === 'straight-plus-point') {
            // Mixed: angles on a line + angles around a point
            const a = randInt(40, 80);
            const b = randInt(40, 80);
            const c = 180 - a - b;
            if (c > 10) {
                const { options, ansIndex } = generateOptions(c);
                scenarios.push({
                    q: `Ray $OA$ stands on line $BC$. Rays $OD$ and $OE$ are between $OB$ and $OA$, and $OA$ and $OC$ respectively. If $\\angle BOD = ${a}^{\\circ}$ and $\\angle DOA = ${b}^{\\circ}$, find $\\angle AOC$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `$\\angle BOD + \\angle DOA + \\angle AOC = 180^{\\circ}$ (linear). $\\angle AOC = 180 - ${a} - ${b} = ${c}^{\\circ}$.`,
                    svg: { type: "three-rays-on-line", data: { angles: [`${a}°`, `${b}°`, 'x'], pointLabels: ['B', 'O', 'C', 'D', 'A'] } }
                });
            } else {
                const fa = randInt(50, 80);
                const fb = 180 - fa;
                const { options, ansIndex } = generateOptions(fb);
                scenarios.push({
                    q: `Ray $OC$ stands on line $AB$. If $\\angle AOC = ${fa}^{\\circ}$, find $\\angle BOC$.`,
                    type: "mcq", opts: options, ans: ansIndex,
                    expl: `$\\angle AOC + \\angle BOC = 180^{\\circ}$. $\\angle BOC = 180 - ${fa} = ${fb}^{\\circ}$.`,
                    svg: { type: "linear-pair", data: { a1: `${fa}°`, a2: 'x', splitAngle: fa } }
                });
            }
        } else if (tpl === 'mixed-diagram') {
            // Complex: parallel lines with intersecting lines
            const baseAngle = randInt(40, 70);
            const voaAngle = baseAngle; // vertically opposite
            const coInt = 180 - baseAngle;
            const { options, ansIndex } = generateOptions(coInt);
            scenarios.push({
                q: `$AB \\parallel CD$. Lines $EF$ and $GH$ intersect at point $P$ on line $AB$. If $\\angle EPB = ${baseAngle}^{\\circ}$, find the co-interior angle $x$ at the point where $EF$ meets $CD$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `$\\angle EPA = 180 - ${baseAngle} = ${coInt}^{\\circ}$ (linear pair). Since $AB \\parallel CD$, co-interior angles sum to $180^{\\circ}$. But $\\angle EPB = ${baseAngle}^{\\circ}$ is the corresponding angle on the same side, so $x = 180 - ${baseAngle} = ${coInt}^{\\circ}$.`,
                svg: { type: "parallel-intersect-complex", data: { baseAngle, coInt, pointLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'P'] } }
            });
        }
    }
    return scenarios;
};

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
    // Common mistakes: 180 - x, 90 - x, 360 - x, half, double
    const mistakes = [
        180 - correctAngle,
        90 - correctAngle,
        correctAngle * 2,
        Math.floor(correctAngle / 2),
        correctAngle + 10,
        correctAngle - 10,
        360 - correctAngle
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

// Length options generator
const generateLengthOptions = (correctLen) => {
    let opts = new Set([correctLen]);
    const mistakes = [
        correctLen * 2,
        Math.floor(correctLen / 2),
        correctLen + 2,
        correctLen - 2,
        Math.floor(Math.sqrt(correctLen))
    ].filter(x => x > 0 && x !== correctLen);

    for (let m of mistakes) {
        if (opts.size < 4) opts.add(m);
    }
    while (opts.size < 4) {
        let filler = correctLen + randInt(1, 5);
        if (filler > 0 && filler !== correctLen) opts.add(filler);
    }

    const optsArr = Array.from(opts);
    shuffle(optsArr);
    return {
        options: optsArr.map(o => `$${o}\\text{ cm}$`),
        ansIndex: optsArr.indexOf(correctLen)
    };
};

// ──────────────────── SKILL 1: CHORDS & PERPENDICULARS ────────────────────
export const generateChordScenarios = () => {
    const scenarios = [];
    const templates = [
        'equal-chords',       // Thm 9.1: Equal chords subtend equal angles at centre
        'perp-bisect',        // Thm 9.3: Perpendicular bisects chord
        'find-radius',        // Pythagoras with chord and perpendicular
        'find-chord-len',     // Pythagoras reverse
        'equidistant-chords'  // Thm 9.6: Equidistant chords are equal
    ];

    for (let i = 0; i < 20; i++) {
        const tpl = templates[i % templates.length];

        if (tpl === 'equal-chords') {
            const angle = randInt(40, 110);
            const { options, ansIndex } = generateOptions(angle);
            scenarios.push({
                q: `Chords $AB$ and $CD$ of a circle are equal in length. If $\\angle AOB = ${angle}^{\\circ}$ (where $O$ is the centre), find $\\angle COD$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `By Theorem 9.1, equal chords of a circle subtend equal angles at the centre. Therefore, $\\angle COD = \\angle AOB = ${angle}^{\\circ}$.`,
                svg: { type: "equal-chords", data: { angle } }
            });
        } else if (tpl === 'perp-bisect') {
            const halfChord = randInt(3, 10);
            const fullChord = halfChord * 2;
            const { options, ansIndex } = generateLengthOptions(halfChord);
            scenarios.push({
                q: `A perpendicular $OM$ is drawn from the centre $O$ to a chord $AB$ of length $${fullChord}\\text{ cm}$. Find the length of $AM$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `By Theorem 9.3, the perpendicular from the centre to a chord bisects the chord. So $AM = \\frac{1}{2} AB = \\frac{${fullChord}}{2} = ${halfChord}\\text{ cm}$.`,
                svg: { type: "perp-bisect", data: { fullChord, halfChord } }
            });
        } else if (tpl === 'find-radius') {
            // Pythagorean triples
            const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [9, 12, 15], [8, 15, 17]];
            const [perp, halfChord, radius] = triples[randInt(0, triples.length - 1)];
            const fullChord = halfChord * 2;
            const { options, ansIndex } = generateLengthOptions(radius);
            scenarios.push({
                q: `The distance from the centre of a circle to a chord of length $${fullChord}\\text{ cm}$ is $${perp}\\text{ cm}$. Find the radius of the circle.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `The perpendicular bisects the chord, so half the chord is $${halfChord}\\text{ cm}$. By Pythagoras theorem, $r^2 = ${perp}^2 + ${halfChord}^2 = ${perp * perp} + ${halfChord * halfChord} = ${radius * radius}$. So radius = $${radius}\\text{ cm}$.`,
                svg: { type: "pythagoras-radius", data: { perp, halfChord, radius, fullChord } }
            });
        } else if (tpl === 'find-chord-len') {
            const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]];
            const [perp, halfChord, radius] = triples[randInt(0, triples.length - 1)];
            const fullChord = halfChord * 2;
            const { options, ansIndex } = generateLengthOptions(fullChord);
            scenarios.push({
                q: `A circle has a radius of $${radius}\\text{ cm}$. Find the length of a chord situated at a distance of $${perp}\\text{ cm}$ from the centre.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `By Pythagoras theorem in the right triangle formed by the radius, perpendicular, and half-chord: $(\\text{half-chord})^2 = ${radius}^2 - ${perp}^2 = ${radius * radius} - ${perp * perp} = ${halfChord * halfChord}$. So half-chord = $${halfChord}\\text{ cm}$. The full chord is $2 \\times ${halfChord} = ${fullChord}\\text{ cm}$.`,
                svg: { type: "pythagoras-chord", data: { perp, radius, fullChord } }
            });
        } else if (tpl === 'equidistant-chords') {
            const chordLen = randInt(10, 30);
            const dist = randInt(4, 12);
            const { options, ansIndex } = generateLengthOptions(chordLen);
            scenarios.push({
                q: `Chords $AB$ and $CD$ are situated at an equal distance of $${dist}\\text{ cm}$ from the centre of a circle. If $AB = ${chordLen}\\text{ cm}$, find the length of $CD$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `By Theorem 9.6, chords equidistant from the centre are perfectly equal in length. Therefore, $CD = AB = ${chordLen}\\text{ cm}$.`,
                svg: { type: "equidistant-chords", data: { dist, chordLen } }
            });
        }
    }
    return scenarios;
};

// ──────────────────── SKILL 2: ANGLES SUBTENDED BY ARCS ────────────────────
export const generateArcAngleScenarios = () => {
    const scenarios = [];
    const templates = [
        'angle-at-centre',     // Thm 9.7: Angle at centre = 2 * angle at remaining part
        'angle-at-boundary',   // Thm 9.7 reverse
        'same-segment',        // Thm 9.8: Angles in same segment
        'semicircle'           // Angle in a semicircle = 90
    ];

    for (let i = 0; i < 20; i++) {
        const tpl = templates[i % templates.length];

        if (tpl === 'angle-at-centre') {
            const boundAngle = randInt(25, 75);
            const centreAngle = boundAngle * 2;
            const { options, ansIndex } = generateOptions(centreAngle);
            scenarios.push({
                q: `An arc subtends an angle of $${boundAngle}^{\\circ}$ at a point on the remaining part of the circle. Find the angle it subtends at the centre $O$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `By Theorem 9.7, the angle subtended by an arc at the centre is double the angle subtended by it at any remaining part of the circle. $2 \\times ${boundAngle}^{\\circ} = ${centreAngle}^{\\circ}$.`,
                svg: { type: "centre-angle", data: { boundAngle, centreAngle, unknown: 'centre' } }
            });
        } else if (tpl === 'angle-at-boundary') {
            const centreAngle = randInt(60, 160, 2); // even number
            const boundAngle = centreAngle / 2;
            const { options, ansIndex } = generateOptions(boundAngle);
            scenarios.push({
                q: `If the angle subtended by an arc at the centre is $${centreAngle}^{\\circ}$, find the angle subtended by it at any point on the remaining part of the circle.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `The angle at the remaining part of the circle is exactly half of the angle at the centre. $\\frac{${centreAngle}}{2} = ${boundAngle}^{\\circ}$.`,
                svg: { type: "centre-angle", data: { boundAngle, centreAngle, unknown: 'boundary' } }
            });
        } else if (tpl === 'same-segment') {
            const angle = randInt(30, 80);
            const { options, ansIndex } = generateOptions(angle);
            scenarios.push({
                q: `Angles $$\\angle ACB$$ and $$\\angle ADB$$ are in the same segment of a circle. If $\\angle ACB = ${angle}^{\\circ}$, find $\\angle ADB$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `By Theorem 9.8, angles in the same segment of a circle are equal. Therefore, $\\angle ADB = ${angle}^{\\circ}$.`,
                svg: { type: "same-segment", data: { angle } }
            });
        } else if (tpl === 'semicircle') {
            const { options, ansIndex } = generateOptions(90);
            scenarios.push({
                q: `$AB$ is a diameter of a circle. Point $C$ lies on the circumference. Find the measure of $\\angle ACB$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `The angle in a semicircle is always a right angle. Therefore, $\\angle ACB = 90^{\\circ}$.`,
                svg: { type: "semicircle", data: {} }
            });
        }
    }
    return scenarios;
};

// ──────────────────── SKILL 3: CYCLIC QUADRILATERALS ────────────────────
export const generateCyclicQuadScenarios = () => {
    const scenarios = [];
    const templates = [
        'opposite-angles',     // Thm 9.10: Sum is 180
        'ratio-opposite',      // ratio of opposite angles
        'composite-1',         // Triangle + cyclic quad
        'composite-2'          // Exterior angle of cyclic quad
    ];

    for (let i = 0; i < 20; i++) {
        const tpl = templates[i % templates.length];

        if (tpl === 'opposite-angles') {
            const known = randInt(60, 130);
            const unknown = 180 - known;
            const { options, ansIndex } = generateOptions(unknown);
            scenarios.push({
                q: `$ABCD$ is a cyclic quadrilateral. If $\\angle A = ${known}^{\\circ}$, find $\\angle C$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `The sum of either pair of opposite angles of a cyclic quadrilateral is $180^{\\circ}$. $\\angle C = 180^{\\circ} - ${known}^{\\circ} = ${unknown}^{\\circ}$.`,
                svg: { type: "cyclic-quad", data: { knownA: known, unknownC: unknown } }
            });
        } else if (tpl === 'ratio-opposite') {
            // Ratio m : n
            const m = randInt(2, 5);
            const n = randInt(m + 1, 7);
            const total = m + n;
            const single = 180 / total;
            const ans = Math.round(n * single);
            const angleA = Math.round(m * single);
            const { options, ansIndex } = generateOptions(ans);
            scenarios.push({
                q: `$ABCD$ is a cyclic quadrilateral. If $\\angle B$ and $\\angle D$ are in the ratio $${m} : ${n}$, find the measure of the larger angle $\\angle D$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `Opposite angles sum to $180^{\\circ}$. $\\angle B + \\angle D = 180^{\\circ}$. The larger angle $\\angle D = \\frac{${n}}{${total}} \\times 180^{\\circ} = ${ans}^{\\circ}$.`,
                svg: { type: "cyclic-quad-ratio", data: { m, n, ans, angleA } }
            });
        } else if (tpl === 'composite-1') {
             // In cyclic quad ABCD, diagonal AC is drawn. Find angle.
             const angleB = randInt(70, 110);
             const angleD = 180 - angleB;
             const { options, ansIndex } = generateOptions(angleD);
             scenarios.push({
                 q: `In a circle, $ABCD$ is a cyclic quadrilateral. If $\\angle ABC = ${angleB}^{\\circ}$, find $\\angle ADC$.`,
                 type: "mcq", opts: options, ans: ansIndex,
                 expl: `$\\angle ADC$ and $\\angle ABC$ are opposite angles in a cyclic quadrilateral, so they sum to $180^{\\circ}$. $\\angle ADC = 180^{\\circ} - ${angleB}^{\\circ} = ${angleD}^{\\circ}$.`,
                 svg: { type: "cyclic-quad", data: { knownA: angleB, unknownC: angleD, labels: ['B', 'D'] } }
             });
        } else if (tpl === 'composite-2') {
            // Exterior angle of a cyclic quadrilateral equals the interior opposite angle
            const interiorOpp = randInt(75, 125);
            const { options, ansIndex } = generateOptions(interiorOpp);
            scenarios.push({
                q: `If one side of a cyclic quadrilateral is produced, the exterior angle so formed is $x$. If the interior opposite angle is $${interiorOpp}^{\\circ}$, find $x$.`,
                type: "mcq", opts: options, ans: ansIndex,
                expl: `The exterior angle of a cyclic quadrilateral is exactly equal to its interior opposite angle. So $x = ${interiorOpp}^{\\circ}$. (Since exterior + adjacent = 180, and interior opposite + adjacent = 180).`,
                svg: { type: "cyclic-quad-ext", data: { interiorOpp } }
            });
        }
    }
    return scenarios;
};

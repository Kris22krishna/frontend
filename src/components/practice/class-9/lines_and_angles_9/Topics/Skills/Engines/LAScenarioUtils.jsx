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

export const generateLinearPairScenarios = () => {
    const scenarios = [];
    for (let i = 0; i < 20; i++) {
        const isProtractor = i % 2 === 0;

        if (isProtractor) {
            const angle = randInt(30, 150);
            scenarios.push({
                q: "Use the interactive protractor to measure the angle shown.",
                type: "protractor",
                ans: angle,
                expl: `The angle drawn measures exactly $${angle}^{\\circ}$.`,
                svg: {
                    type: "protractor-measure",
                    data: { angle }
                }
            });
        } else {
            const a1 = randInt(20, 160);
            const a2 = 180 - a1;
            const unknown = Math.random() > 0.5 ? 1 : 2;

            const qAngle = unknown === 1 ? a1 : a2;
            const knownAngle = unknown === 1 ? a2 : a1;
            
            const { options, ansIndex } = generateOptions(qAngle);

            scenarios.push({
                q: `Given that the bottom line is straight, find the value of $x$.`,
                type: "mcq",
                opts: options,
                ans: ansIndex,
                expl: `By the Linear Pair Axiom, the sum of adjacent angles on a straight line is $180^{\\circ}$. Thus, $x = 180^{\\circ} - ${knownAngle}^{\\circ} = ${qAngle}^{\\circ}$.`,
                svg: {
                    type: "linear-pair",
                    data: { 
                        a1: unknown === 1 ? "x" : `${a1}°`, 
                        a2: unknown === 2 ? "x" : `${a2}°`,
                        splitAngle: a1
                    }
                }
            });
        }
    }
    return scenarios;
};

export const generateVOAScenarios = () => {
    const scenarios = [];
    for (let i = 0; i < 20; i++) {
        // Angles around a point sum to 360
        const baseAngle = randInt(30, 80); 
        const obtuseAngle = 180 - baseAngle;
        
        const isOptVO = i % 2 === 1;

        if (isOptVO) {
            const { options, ansIndex } = generateOptions(baseAngle);
            scenarios.push({
                q: `Two straight lines intersect. If the given angle is $${baseAngle}^{\\circ}$, what is the measure of the vertically opposite angle $x$?`,
                type: "mcq",
                opts: options,
                ans: ansIndex,
                expl: `Vertically opposite angles are always equal. Therefore, $x = ${baseAngle}^{\\circ}$.`,
                svg: {
                    type: "intersecting",
                    data: { top: `${baseAngle}°`, right: '', bottom: `x`, left: '', angle: baseAngle }
                }
            });
        } else {
            const { options, ansIndex } = generateOptions(obtuseAngle);
            scenarios.push({
                q: `Two straight lines intersect. If the acute angle is $${baseAngle}^{\\circ}$, what is the measure of the adjacent obtuse angle $x$?`,
                type: "mcq",
                opts: options,
                ans: ansIndex,
                expl: `Adjacent angles on intersecting straight lines form a linear pair and sum to $180^{\\circ}$. $x = 180^{\\circ} - ${baseAngle}^{\\circ} = ${obtuseAngle}^{\\circ}$.`,
                svg: {
                    type: "intersecting",
                    data: { top: 'x', right: `${baseAngle}°`, bottom: '', left: '', angle: baseAngle }
                }
            });
        }
    }
    return scenarios;
};

export const generateParallelLinesScenarios = () => {
    const scenarios = [];
    for (let i = 0; i < 20; i++) {
        const acute = randInt(40, 80);
        const obtuse = 180 - acute;
        
        const qTypes = ["alt-int", "corr", "co-int"];
        const qType = qTypes[i % 3];

        let q, ansVal, expl, svgData;

        if (qType === "alt-int") {
            ansVal = acute;
            q = `The two horizontal lines are parallel. Find the alternate interior angle $x$.`;
            expl = `Alternate interior angles are equal. Thus $x = ${acute}^{\\circ}$.`;
            svgData = { knownLoc: "top-right", unknownLoc: "bottom-left", knownVal: acute };
        } else if (qType === "corr") {
            ansVal = obtuse;
            q = `The two horizontal lines are parallel. Find the corresponding angle $x$.`;
            expl = `Corresponding angles are equal. Thus $x = ${obtuse}^{\\circ}$.`;
            svgData = { knownLoc: "top-left", unknownLoc: "bottom-left-out", knownVal: obtuse };
        } else {
            ansVal = obtuse;
            q = `The two horizontal lines are parallel. Find the co-interior angle $x$.`;
            expl = `Co-interior angles on the same side of the transversal sum to $180^{\\circ}$. $x = 180^{\\circ} - ${acute}^{\\circ} = ${obtuse}^{\\circ}$.`;
            svgData = { knownLoc: "top-right", unknownLoc: "bottom-right", knownVal: acute };
        }

        const { options, ansIndex } = generateOptions(ansVal);

        scenarios.push({
            q, type: "mcq", opts: options, ans: ansIndex, expl,
            svg: {
                type: "parallel",
                data: { ...svgData, tilt: acute }
            }
        });
    }
    return scenarios;
};

export const generateAngleSumScenarios = () => {
    const scenarios = [];
    for (let i = 0; i < 20; i++) {
        const a1 = randInt(40, 100);
        const a2 = randInt(40, 100);
        const a3 = randInt(40, 100);
        const a4 = 360 - (a1 + a2 + a3);

        const { options, ansIndex } = generateOptions(a4);

        scenarios.push({
            q: `The given angles meet at a single point. Find $x$.`,
            type: "mcq",
            opts: options,
            ans: ansIndex,
            expl: `Angles around a central point always sum to $360^{\\circ}$. $x = 360^{\\circ} - (${a1}^{\\circ} + ${a2}^{\\circ} + ${a3}^{\\circ}) = ${a4}^{\\circ}$.`,
            svg: {
                type: "angles-around-point",
                data: { angles: [a1, a2, a3, "x"] }
            }
        });
    }
    return scenarios;
};

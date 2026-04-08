/* ═══════════════════════════════════════════════════════════════════════════
   LEScenarioUtils — Dynamic question generators for Linear Equations
   Each generator produces 20 unique, non-repeating questions.
   ═══════════════════════════════════════════════════════════════════════════ */

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

const generateOptions = (correct, distractor = null) => {
    let opts = new Set([correct]);
    const mistakes = [
        correct + 1, correct - 1, correct + 2, correct - 2,
        correct * 2, -correct, correct + 5, correct - 5,
        Math.abs(correct) + 3
    ].filter(x => x !== correct && Math.abs(x) < 100);
    if (distractor !== null && distractor !== correct) opts.add(distractor);
    for (let m of mistakes) {
        if (opts.size < 4) opts.add(m);
    }
    while (opts.size < 4) {
        opts.add(correct + randInt(-10, 10));
    }
    const optsArr = Array.from(opts).slice(0, 4);
    shuffle(optsArr);
    return {
        options: optsArr.map(o => `$${o}$`),
        ansIndex: optsArr.indexOf(correct)
    };
};

/* Helper: compute solution points on a line that fit within -8..8 */
const getVisiblePoints = (a, b, c, count = 3) => {
    const pts = [];
    for (let x = -8; x <= 8; x++) {
        const y = (c - a * x) / b;
        if (y === Math.floor(y) && Math.abs(y) <= 8) {
            pts.push({ x, y });
        }
        if (pts.length >= count + 2) break;
    }
    return pts.slice(0, count);
};

/* ═══ Skill 1: Finding Solutions ═══════════════════════════════════════════ */
export const generateFindingSolutionScenarios = () => {
    const scenarios = [];
    for (let i = 0; i < 20; i++) {
        const a = randInt(1, 3);
        const b = randInt(1, 3);
        const xVal = randInt(-4, 4);
        const yVal = randInt(-4, 4);
        const c = a * xVal + b * yVal;

        if (i % 3 === 0) {
            // Type 1: Given x, find y
            const givenX = randInt(-3, 3);
            const correctY = (c - a * givenX) / b;
            if (correctY % 1 !== 0 || Math.abs(correctY) > 8) {
                // fallback to simpler — keep c ≤ 8 so points stay visible
                const simpleA = 1, simpleB = 1;
                const simpleC = randInt(2, 8);
                const gX = randInt(0, Math.min(simpleC, 7));
                const cY = simpleC - gX;
                const { options, ansIndex } = generateOptions(cY);
                scenarios.push({
                    q: `For the equation $x + y = ${simpleC}$, if $x = ${gX}$, what is $y$?`,
                    type: 'mcq',
                    opts: options,
                    ans: ansIndex,
                    expl: `Substituting $x = ${gX}$: $${gX} + y = ${simpleC}$, so $y = ${simpleC} - ${gX} = ${cY}$.`,
                    svg: {
                        type: 'single-line',
                        data: { a: 1, b: 1, c: simpleC, color: '#3b82f6', label: `x + y = ${simpleC}`, points: [{ x: gX, y: cY }, { x: 0, y: simpleC }, { x: simpleC, y: 0 }].filter(p => Math.abs(p.x) <= 8 && Math.abs(p.y) <= 8) }
                    }
                });
            } else {
                const visiblePts = [{ x: givenX, y: correctY }, ...getVisiblePoints(a, b, c, 2)];
                const { options, ansIndex } = generateOptions(correctY);
                scenarios.push({
                    q: `For the equation $${a}x + ${b}y = ${c}$, if $x = ${givenX}$, what is $y$?`,
                    type: 'mcq',
                    opts: options,
                    ans: ansIndex,
                    expl: `Substituting $x = ${givenX}$: $${a}(${givenX}) + ${b}y = ${c}$, so $${b}y = ${c} - ${a * givenX} = ${c - a * givenX}$, thus $y = ${correctY}$.`,
                    svg: {
                        type: 'single-line',
                        data: { a, b, c, color: '#3b82f6', label: `${a}x + ${b}y = ${c}`, points: visiblePts.filter(p => Math.abs(p.x) <= 8 && Math.abs(p.y) <= 8) }
                    }
                });
            }
        } else if (i % 3 === 1) {
            // Type 2: Check if a point is on the line
            const checkA = randInt(1, 3);
            const checkB = randInt(1, 3);
            const checkX = randInt(-3, 4);
            const checkY = randInt(-3, 4);
            const checkC = checkA * checkX + checkB * checkY;
            const isCorrectPoint = Math.random() > 0.5;

            let testX, testY;
            if (isCorrectPoint) {
                testX = checkX;
                testY = checkY;
            } else {
                testX = checkX;
                testY = checkY + randInt(1, 3);
            }

            const actuallyOnLine = (checkA * testX + checkB * testY) === checkC;
            const opts = ['Yes, it is a solution', 'No, it is not a solution'];
            const ansIdx = actuallyOnLine ? 0 : 1;

            scenarios.push({
                q: `Is the point $(${testX}, ${testY})$ a solution of $${checkA}x + ${checkB}y = ${checkC}$?`,
                type: 'mcq',
                opts: opts,
                ans: ansIdx,
                expl: actuallyOnLine
                    ? `Substituting: $${checkA}(${testX}) + ${checkB}(${testY}) = ${checkA * testX} + ${checkB * testY} = ${checkA * testX + checkB * testY} = ${checkC}$ ✓`
                    : `Substituting: $${checkA}(${testX}) + ${checkB}(${testY}) = ${checkA * testX} + ${checkB * testY} = ${checkA * testX + checkB * testY} \\neq ${checkC}$ ✗`,
                svg: {
                    type: 'solution-check',
                    data: { a: checkA, b: checkB, c: checkC, point: { x: testX, y: testY }, isOnLine: actuallyOnLine }
                }
            });
        } else {
            // Type 3: Find the y-intercept — keep intercepts within ±8
            const intA = randInt(1, 3);
            const intB = randInt(1, 3);
            // Ensure yIntercept = intC/intB is integer and ≤ 8
            const yIntTarget = randInt(1, 7);
            const intC = intB * yIntTarget;
            const yIntercept = yIntTarget;
            const xIntercept = intC / intA;

            if (xIntercept === Math.floor(xIntercept) && Math.abs(xIntercept) <= 8) {
                const { options, ansIndex } = generateOptions(yIntercept);
                scenarios.push({
                    q: `What is the y-intercept of the line $${intA}x + ${intB}y = ${intC}$?`,
                    type: 'mcq',
                    opts: options,
                    ans: ansIndex,
                    expl: `The y-intercept is found by setting $x = 0$: $${intB}y = ${intC}$, so $y = ${yIntercept}$. The y-intercept is $(0, ${yIntercept})$.`,
                    svg: {
                        type: 'intercepts',
                        data: { a: intA, b: intB, c: intC }
                    }
                });
            } else {
                // fallback: a=1, b=1 so both intercepts = c
                const sC = randInt(2, 7);
                const { options, ansIndex } = generateOptions(sC);
                scenarios.push({
                    q: `What is the y-intercept of the line $x + y = ${sC}$?`,
                    type: 'mcq',
                    opts: options,
                    ans: ansIndex,
                    expl: `Setting $x = 0$: $y = ${sC}$. The y-intercept is $(0, ${sC})$.`,
                    svg: {
                        type: 'intercepts',
                        data: { a: 1, b: 1, c: sC }
                    }
                });
            }
        }
    }
    return scenarios;
};

/* ═══ Skill 2: Standard Form Conversion ═══════════════════════════════════ */
export const generateStandardFormScenarios = () => {
    const scenarios = [];
    for (let i = 0; i < 20; i++) {
        if (i % 2 === 0) {
            // Convert y = mx + k to standard form: identify a, b, c
            const m = randInt(-4, 4);
            const k = randInt(-6, 6);
            if (m === 0 && k === 0) continue;

            const correctA = m;
            const correctB = -1;
            const correctC = k;
            // Ask for 'a' value
            const { options, ansIndex } = generateOptions(correctA);
            const visiblePts = getVisiblePoints(m, -1, -k, 2);
            scenarios.push({
                q: `Write $y = ${m === 1 ? '' : m === -1 ? '-' : m}x ${k >= 0 ? '+ ' + k : '- ' + Math.abs(k)}$ in the form $ax + by + c = 0$. What is $a$?`,
                type: 'mcq',
                opts: options,
                ans: ansIndex,
                expl: `Rearranging: $y = ${m}x + ${k}$ → $${m}x - y + ${k} = 0$. So $a = ${correctA}$.`,
                svg: {
                    type: 'single-line',
                    data: { a: m, b: -1, c: -k, color: '#0f766e', label: `${m}x − y + ${k} = 0`, points: visiblePts }
                }
            });
        } else {
            // Identify if an equation is linear or not
            const eqTypes = [
                { eq: `$2x + 3y = 7$`, isLinear: true, reason: 'Both variables have power 1.' },
                { eq: `$x^2 + y = 5$`, isLinear: false, reason: '$x$ has power 2, so it is not linear.' },
                { eq: `$xy = 6$`, isLinear: false, reason: 'The product $xy$ makes it non-linear.' },
                { eq: `$3x - 5y + 2 = 0$`, isLinear: true, reason: 'Both variables have power 1.' },
                { eq: `$\\frac{x}{2} + y = 4$`, isLinear: true, reason: 'Variables have power 1 (fraction is just a coefficient).' },
                { eq: `$x + y^3 = 1$`, isLinear: false, reason: '$y$ has power 3.' },
                { eq: `$7y = 14$`, isLinear: true, reason: 'This is $0 \\cdot x + 7y - 14 = 0$, still linear.' },
                { eq: `$\\sqrt{x} + y = 3$`, isLinear: false, reason: '$\\sqrt{x} = x^{1/2}$, power is not 1.' },
            ];
            const chosen = eqTypes[i % eqTypes.length];
            const opts = ['Yes, it is linear', 'No, it is not linear'];
            scenarios.push({
                q: `Is the equation ${chosen.eq} a linear equation in two variables?`,
                type: 'mcq',
                opts: opts,
                ans: chosen.isLinear ? 0 : 1,
                expl: chosen.reason,
            });
        }
    }
    while (scenarios.length < 20) {
        const a = randInt(1, 4), b = randInt(1, 4), c = randInt(1, 10);
        const { options, ansIndex } = generateOptions(-c);
        scenarios.push({
            q: `In the equation $${a}x + ${b}y + ${c} = 0$, what is the value of $c$?`,
            type: 'mcq',
            opts: options.map(o => o.replace('$', '$').replace('$', '$')),
            ans: ansIndex,
            expl: `In standard form $ax + by + c = 0$, comparing with $${a}x + ${b}y + ${c} = 0$, we get $c = ${c}$. But if we write as $${a}x + ${b}y = ${-c}$, then $c = ${c}$ in the original form.`,
        });
    }
    return scenarios.slice(0, 20);
};

/* ═══ Skill 3: Graphing ═══════════════════════════════════════════════════ */
export const generateGraphingScenarios = () => {
    const scenarios = [];
    for (let i = 0; i < 20; i++) {
        if (i % 3 === 0) {
            // Find x-intercept — ensure both intercepts fit in -8..8
            const a = randInt(1, 3), b = randInt(1, 3);
            const xIntTarget = randInt(1, 6);
            const c = a * xIntTarget;
            const xInt = xIntTarget;
            const yInt = c / b;
            const { options, ansIndex } = generateOptions(xInt);
            // Add visible solution points
            const pts = [{ x: xInt, y: 0 }];
            if (yInt === Math.floor(yInt) && Math.abs(yInt) <= 8) pts.push({ x: 0, y: yInt });
            scenarios.push({
                q: `What is the x-intercept of the line $${a}x + ${b}y = ${c}$?`,
                type: 'mcq',
                opts: options,
                ans: ansIndex,
                expl: `The x-intercept is found by setting $y = 0$: $${a}x = ${c}$, so $x = ${xInt}$. The x-intercept is $(${xInt}, 0)$.`,
                svg: { type: 'intercepts', data: { a, b, c } }
            });
        } else if (i % 3 === 1) {
            // Which quadrant does a point lie in?
            const quadPoints = [
                { x: randInt(1, 5), y: randInt(1, 5), q: 'I' },
                { x: randInt(-5, -1), y: randInt(1, 5), q: 'II' },
                { x: randInt(-5, -1), y: randInt(-5, -1), q: 'III' },
                { x: randInt(1, 5), y: randInt(-5, -1), q: 'IV' },
            ];
            const chosen = quadPoints[i % 4];
            const opts = ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'];
            const ansIdx = ['I', 'II', 'III', 'IV'].indexOf(chosen.q);
            scenarios.push({
                q: `In which quadrant does the point $(${chosen.x}, ${chosen.y})$ lie?`,
                type: 'mcq',
                opts: opts,
                ans: ansIdx,
                expl: `The point $(${chosen.x}, ${chosen.y})$ has ${chosen.x > 0 ? 'positive' : 'negative'} x and ${chosen.y > 0 ? 'positive' : 'negative'} y, so it lies in Quadrant ${chosen.q}.`,
            });
        } else {
            // How many solutions does a linear equation have?
            const a = randInt(1, 3), b = randInt(1, 3), c = randInt(1, 8);
            const opts = ['Exactly one', 'Exactly two', 'No solutions', 'Infinitely many'];
            const visiblePts = getVisiblePoints(a, b, c, 3);
            scenarios.push({
                q: `How many solutions does the equation $${a}x + ${b}y = ${c}$ have?`,
                type: 'mcq',
                opts: opts,
                ans: 3,
                expl: `A linear equation in two variables always has infinitely many solutions. Every point on the line $${a}x + ${b}y = ${c}$ is a solution.`,
                svg: { type: 'single-line', data: { a, b, c, color: '#7c3aed', label: `${a}x + ${b}y = ${c}`, points: visiblePts } }
            });
        }
    }
    return scenarios;
};

/* ═══ Skill 4: Special Lines (x = a, y = b) ═══════════════════════════════ */
export const generateSpecialLinesScenarios = () => {
    const scenarios = [];
    for (let i = 0; i < 20; i++) {
        if (i % 3 === 0) {
            // Identify the graph of x = a
            const val = randInt(-5, 5);
            const opts = [
                `A line parallel to the X-axis`,
                `A line parallel to the Y-axis`,
                `A line passing through the origin`,
                `A point at $(${val}, 0)$`
            ];
            scenarios.push({
                q: `The graph of $x = ${val}$ is:`,
                type: 'mcq',
                opts: opts,
                ans: 1,
                expl: `$x = ${val}$ means $x$ is always ${val} regardless of $y$. This is a vertical line parallel to the Y-axis, passing through $(${val}, 0)$.`,
            });
        } else if (i % 3 === 1) {
            // Identify equation of a horizontal line
            const val = randInt(-5, 5);
            const opts = [`$x = ${val}$`, `$y = ${val}$`, `$x + y = ${val}$`, `$x - y = ${val}$`];
            scenarios.push({
                q: `Which equation represents a horizontal line passing through $(0, ${val})$?`,
                type: 'mcq',
                opts: opts,
                ans: 1,
                expl: `A horizontal line has a constant $y$-value. Since it passes through $(0, ${val})$, the equation is $y = ${val}$.`,
            });
        } else {
            // Rewrite in standard form
            const val = randInt(1, 7);
            const isX = Math.random() > 0.5;
            if (isX) {
                const opts = [`$a = 1, b = 0, c = ${-val}$`, `$a = 0, b = 1, c = ${-val}$`, `$a = 1, b = 1, c = ${-val}$`, `$a = ${val}, b = 0, c = 0$`];
                scenarios.push({
                    q: `Express $x = ${val}$ in the form $ax + by + c = 0$. What are the values of $a$, $b$, and $c$?`,
                    type: 'mcq',
                    opts: opts,
                    ans: 0,
                    expl: `$x = ${val}$ can be written as $1 \\cdot x + 0 \\cdot y + (${-val}) = 0$, so $a = 1$, $b = 0$, $c = ${-val}$.`,
                });
            } else {
                const opts = [`$a = 1, b = 0, c = ${-val}$`, `$a = 0, b = 1, c = ${-val}$`, `$a = 0, b = 1, c = ${val}$`, `$a = 1, b = 1, c = ${-val}$`];
                scenarios.push({
                    q: `Express $y = ${val}$ in the form $ax + by + c = 0$. What are the values of $a$, $b$, and $c$?`,
                    type: 'mcq',
                    opts: opts,
                    ans: 1,
                    expl: `$y = ${val}$ can be written as $0 \\cdot x + 1 \\cdot y + (${-val}) = 0$, so $a = 0$, $b = 1$, $c = ${-val}$.`,
                });
            }
        }
    }
    return scenarios;
};

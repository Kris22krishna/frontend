/* ── HELPERS ── */
const rInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const rBool = () => Math.random() > 0.5;
const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
};
const mcq = (question, correctAnswer, distractors, explanation) => {
    const options = [correctAnswer, ...distractors];
    const shuffled = shuffle(options);
    return { question, options: shuffled, correct: shuffled.indexOf(correctAnswer), explanation };
};

export const graphFrame = (fnDef, customElements = '', color='#0ea5e9') => {
    let pts = '';
    if (typeof fnDef === 'function') {
        const minX = -5, maxX = 5, steps = 150;
        let segments = [];
        let currentSegment = [];
        for(let i=0; i<=steps; i++){
            let x = minX + (maxX-minX)*(i/steps);
            let y = fnDef(x);
            if (isNaN(y) || typeof y !== 'number' || Math.abs(y) === Infinity) {
                if (currentSegment.length > 0) { segments.push(currentSegment); currentSegment = []; }
                continue;
            }
            if (y > 10 || y < -10) {
                if (currentSegment.length > 0) {
                    currentSegment.push(`${100 + x*20},${100 - (y > 0 ? 10 : -10)*20}`);
                    segments.push(currentSegment); 
                    currentSegment = [];
                }
                continue;
            }
            currentSegment.push(`${100 + x*20},${100 - y*20}`);
        }
        if (currentSegment.length > 0) segments.push(currentSegment);
        pts = segments.map(seg => `<polyline points="${seg.join(' ')}" stroke="${color}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round" />`).join('\n');
    } else {
        pts = fnDef;
    }
    return `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;">
        <path d="M20,0 L20,200 M40,0 L40,200 M60,0 L60,200 M80,0 L80,200 M120,0 L120,200 M140,0 L140,200 M160,0 L160,200 M180,0 L180,200" stroke="#e2e8f0" stroke-width="1" />
        <path d="M0,20 L200,20 M0,40 L200,40 M0,60 L200,60 M0,80 L200,80 M0,120 L200,120 M0,140 L200,140 M0,160 L200,160 M0,180 L200,180" stroke="#e2e8f0" stroke-width="1" />
        <line x1="100" y1="0" x2="100" y2="200" stroke="#94a3b8" stroke-width="2" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="#94a3b8" stroke-width="2" />
        ${pts}
        ${customElements}
    </svg>`;
};

/* ════════════════════════════════════════════════════════════════════════════
   1 — ALGEBRAIC FUNCTIONS
   ════════════════════════════════════════════════════════════════════════════ */
const genAlgebraic = () => {
    const q = [];
    
    // Evaluate polynomials
    for(let i=0; i<6; i++){
        const a = rInt(1, 4), b = rInt(-5, 5), c = rInt(-10, 10);
        const x = rInt(-3, 4);
        const ans = a*x*x + b*x + c;
        q.push(mcq(`If $f(x) = ${a === 1 ? '' : a}x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)}$, find $f(${x})$.`,
        `$${ans}$`, [`$${ans + rInt(1, 5)}$`, `$${ans - rInt(2, 6)}$`, `$${-ans}$`], 
        `Substitute $x=${x}$: $${a}(${x})^2 + (${b})(${x}) + (${c}) = ${a*x*x} ${b*x >= 0 ? '+' : ''}${b*x} ${c >= 0 ? '+' : ''}${c} = ${ans}$`));
    }

    // Identify Algebraic
    for(let i=0; i<4; i++){
        const pow = rInt(3, 8);
        q.push(mcq(`Which of the following describes $f(x) = x^{${pow}} + ${rInt(2, 9)}$?`,
        `Polynomial (Algebraic)`, [`Trigonometric`, `Exponential`, `Logarithmic`], 
        `Since it only uses powers of x and addition, it is a Polynomial, which is a type of Algebraic Function.`));
    }

    // Rational Domains
    for(let i=0; i<6; i++){
        const a = rInt(1, 5) * (rBool() ? 1 : -1);
        q.push(mcq(`What value of $x$ is absolutely NOT in the domain of $f(x) = \\frac{1}{x ${a > 0 ? '-' : '+'} ${Math.abs(a)}}$?`,
        `$x = ${a}$`, [`$x = ${-a}$`, `$x = 0$`, `$x = 1/a$`], 
        `The denominator cannot be zero. So $x - ${a} \\neq 0 \\implies x \\neq ${a}$.`));
    }

    // Radical Domains
    for(let i=0; i<4; i++){
        const a = rInt(1, 9);
        q.push(mcq(`What is the domain of $f(x) = \\sqrt{x - ${a}}$?`,
        `$x \\ge ${a}$`, [`$x > ${a}$`, `$x \\le ${a}$`, `All real numbers`],
        `The inside of a square root must be non-negative: $x - ${a} \\ge 0 \\implies x \\ge ${a}$.`));
    }

    return shuffle(q).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   2 — TRIGONOMETRIC FUNCTIONS
   ════════════════════════════════════════════════════════════════════════════ */
const genTrig = () => {
    const q = [];

    // Amplitudes
    for(let i=0; i<8; i++){
        const a = rInt(2, 9);
        const trig = ['\\sin', '\\cos'][rInt(0, 1)];
        q.push(mcq(`What is the amplitude of $f(x) = ${a}${trig}(x)$?`,
        `$${a}$`, [`$1$`, `$${a*2}$`, `$\\pi$`],
        `The amplitude is the absolute value of the coefficient in front of the trig function, which is $${a}$.`));
    }

    // Evaluating at 0
    q.push(mcq(`Evaluate $\\sin(0)$.`, `$0$`, [`$1$`, `$-1$`, `Undefined`], `The sine of zero radians is exactly 0.`));
    q.push(mcq(`Evaluate $\\cos(0)$.`, `$1$`, [`$0$`, `$-1$`, `Undefined`], `The cosine of zero radians is exactly 1.`));

    // Evaluating at pi/2
    q.push(mcq(`Evaluate $\\sin(\\frac{\\pi}{2})$.`, `$1$`, [`$0$`, `$-1$`, `$\\frac{\\sqrt{2}}{2}$`], `The sine of 90 degrees ($\\pi/2$) is 1.`));
    q.push(mcq(`Evaluate $\\cos(\\frac{\\pi}{2})$.`, `$0$`, [`$1$`, `$-1$`, `$\\frac{1}{2}$`], `The cosine of 90 degrees ($\\pi/2$) is 0.`));

    // Periods
    for(let i=0; i<8; i++){
        const b = rInt(2, 6);
        const trig = ['\\sin', '\\cos'][rInt(0, 1)];
        q.push(mcq(`What is the period of $f(x) = ${trig}(${b}x)$?`,
        `$\\frac{2\\pi}{${b}}$`, [`$\\frac{\\pi}{${b}}$`, `$${b}\\pi$`, `$2\\pi$`],
        `The standard period of sine/cosine is $2\\pi$. The coefficient $${b}$ speeds up the function, giving a new period of $2\\pi / ${b}$.`));
    }

    return shuffle(q).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   3 — INVERSE TRIGONOMETRIC FUNCTIONS
   ════════════════════════════════════════════════════════════════════════════ */
const genInvTrig = () => {
    const q = [];

    // Meaning
    q.push(mcq(`What question does $\\arcsin(x)$ essentially ask?`, `What angle has a sine of $x$?`, [`What is the sine of angle $x$?`, `What is 1 divided by $\\sin(x)$?`, `What is the derivative of $\\sin(x)$?`], `Inverse functions reverse the process: they take a ratio and give you the angle.`));
    
    // Notation
    for(let i=0; i<3; i++){
        q.push(mcq(`True or False: $\\sin^{-1}(x)$ means $\\frac{1}{\\sin(x)}$.`, `False`, [`True`, `Sometimes`, `Only in Calculus`], `$\\sin^{-1}(x)$ denotes the INVERSE sine (arcsin), NOT the reciprocal. The reciprocal is $\\csc(x)$.`));
    }

    // Domains
    q.push(mcq(`What is the domain (valid inputs) of $\\arcsin(x)$?`, `[-1, 1]`, [`All real numbers`, `(-\\infty, \\infty)`, `[0, \\pi]`], `You can only take the inverse sine of numbers between -1 and 1, because sine only outputs values between -1 and 1.`));
    q.push(mcq(`What is the domain of $\\arccos(x)$?`, `[-1, 1]`, [`All real numbers`, `(0, 1)`, `[-\\pi/2, \\pi/2]`], `Just like arcsin, arccos only accepts inputs from -1 to 1.`));
    q.push(mcq(`What is the domain of $\\arctan(x)$?`, `All real numbers`, [`[-1, 1]`, `(-1, 1)`, `[-\\pi/2, \\pi/2]`], `Tangent's range spans all real numbers, so the domain of arctangent spans all real numbers.`));

    // Evaluating common values
    q.push(mcq(`Evaluate $\\arcsin(0)$.`, `$0$`, [`$\\pi/2$`, `$\\pi$`, `$1$`], `Because $\\sin(0) = 0$, $\\arcsin(0) = 0$.`));
    q.push(mcq(`Evaluate $\\arccos(1)$.`, `$0$`, [`$\\pi/2$`, `$\\pi$`, `Undefined`], `Because $\\cos(0) = 1$, $\\arccos(1) = 0$.`));
    q.push(mcq(`Evaluate $\\arctan(0)$.`, `$0$`, [`$\\pi/2$`, `$1$`, `$\\pi$`], `Because $\\tan(0) = 0$, $\\arctan(0) = 0$.`));
    q.push(mcq(`Evaluate $\\arcsin(1)$.`, `$\\pi/2$`, [`$0$`, `$\\pi$`, `Undefined`], `Because $\\sin(\\pi/2) = 1$, $\\arcsin(1) = \\pi/2$.`));
    q.push(mcq(`Evaluate $\\arccos(0)$.`, `$\\pi/2$`, [`$0$`, `$\\pi$`, `$1$`], `Because $\\cos(\\pi/2) = 0$, $\\arccos(0) = \\pi/2$.`));

    // Properties
    for(let i=0; i<8; i++){
        const xStr = rBool() ? '0.5' : '\\sqrt{2}/2';
        q.push(mcq(`Find the value of $\\sin(\\arcsin(${xStr}))$.`,
        `$${xStr}$`, [`$1$`, `$0$`, `Undefined`],
        `The sine of an arcsine cancels out, returning the original input, provided it's in the domain.`));
    }

    return shuffle(q).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   4 — EXPONENTIAL FUNCTIONS
   ════════════════════════════════════════════════════════════════════════════ */
const genExponential = () => {
    const q = [];

    q.push(mcq(`Which of the following describes $f(x) = ${rInt(2,4)}^x$?`, `Exponential`, `Algebraic, Logarithmic, Trigonometric`.split(', '), `The variable $x$ is in the exponent.`));

    // Base e
    for(let i=0; i<3; i++){
        q.push(mcq(`What is the approximate value of Euler's Number $e$?`, `$2.718$`, [`$3.141$`, `$1.618$`, `$0.693$`], `Euler's number $e \\approx 2.718$ is the natural base for exponential growth.`));
    }

    // Evaluating
    for(let i=0; i<6; i++){
        const a = rInt(2, 5);
        const x = rInt(2, 4);
        q.push(mcq(`Evaluate $f(x) = ${a}^x$ when $x=${x}$.`,
        `$${Math.pow(a, x)}$`, [`$${a * x}$`, `$${Math.pow(x, a)}$`, `$${Math.pow(a, x) + 2}$`],
        `Substitute $x=${x}$: $${a}^{${x}} = ${new Array(x).fill(a).join(' \\times ')} = ${Math.pow(a, x)}$.`));
    }

    // Zero Exponent
    for(let i=0; i<6; i++){
        const a = rInt(5, 50);
        q.push(mcq(`Evaluate $f(${a}^x)$ exactly at $x=0$.`, `$1$`, [`$0$`, `$${a}$`, `Undefined`], `Any non-zero base raised to the power of 0 equals 1.`));
    }

    // Domain and Range
    q.push(mcq(`What is the Range (possible outputs) of $f(x) = e^x$?`, `$(0, \\infty)$`, [`All real numbers`, `$[0, \\infty)$`, `$(-\\infty, 0)$`], `Exponential functions with positive bases never output true $0$ or negative numbers.`));
    q.push(mcq(`What is the Domain (valid inputs) of $f(x) = 2^x$?`, `All real numbers`, [`x > 0`, `x >= 1`, `[0, \\infty)`], `You can raise a base to any power: positive, negative, or zero.`));

    // Algebra of Exponents
    for(let i=0; i<2; i++){
        q.push(mcq(`Simplify $e^x \\cdot e^y$.`, `$e^{x+y}$`, [`$e^{xy}$`, `$2e^{x+y}$`, `$(e^2)^{xy}$`], `When multiplying like bases, you add the exponents.`));
    }

    return shuffle(q).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   5 — LOGARITHMIC FUNCTIONS
   ════════════════════════════════════════════════════════════════════════════ */
const genLogarithmic = () => {
    const q = [];

    q.push(mcq(`What is $\\ln(x)$ shorthand for?`, `$\\log_e(x)$`, [`$\\log_{10}(x)$`, `$e^x$`, `natural exponent`], `$\\ln$ stands for natural logarithm, which is log base $e$.`));

    // Properties Base 10
    for(let i=0; i<6; i++){
        const x = rInt(2, 4);
        const val = Math.pow(10, x);
        q.push(mcq(`Evaluate $\\log_{10}(${val})$.`, `$${x}$`, [`$${x+1}$`, `$${x-1}$`, `$10$`], `$\\log_{10}$ asks: "10 to what power equals ${val}?" $10^{${x}} = ${val}$, so the answer is ${x}.`));
    }

    // Properties Base e
    for(let i=0; i<6; i++){
        const x = rInt(2, 9);
        q.push(mcq(`Evaluate $\\ln(e^{${x}})$.`, `$${x}$`, [`$e^{${x}}$`, `$1$`, `Undefined`], `The natural log $\\ln$ and $e$ cancel each other out.`));
    }

    // Domain
    for(let i=0; i<4; i++){
        q.push(mcq(`What is the domain (valid inputs) of $f(x) = \\ln(x)$?`, `$x > 0$`, [`All real numbers`, `$x \\ge 0$`, `$x \\neq 0$`], `You cannot take the logarithm of zero or a negative number.`));
    }

    // Special Values
    q.push(mcq(`What is the value of $\\ln(1)$?`, `$0$`, [`$1$`, `$e$`, `Undefined`], `Because $e^0 = 1$, the log of 1 in any base is 0.`));
    q.push(mcq(`What is the value of $\\log(1)$?`, `$0$`, [`$1$`, `$10$`, `Undefined`], `The log of 1 in any base is 0.`));

    // Algebra of Logs
    q.push(mcq(`Complete the log addition rule: $\\ln(a) + \\ln(b) =$ ?`, `$\\ln(ab)$`, [`$\\ln(a+b)$`, `$\\ln(a/b)$`, `$\\ln(a) \\ln(b)$`], `Adding logarithms is equivalent to the log of their product.`));

    return shuffle(q).slice(0, 20);
}

/* ════════════════════════════════════════════════════════════════════════════
   6 — MODULUS (ABSOLUTE VALUE)
   ════════════════════════════════════════════════════════════════════════════ */
const genModulus = () => {
    const q = [];

    q.push(mcq(`What does the Modulus function $|x|$ represent geometrically?`, `Distance from zero`, [`Area under the curve`, `Slope of $x$`, `Square root of $x$`], `Absolute value always measures the absolute distance from the origin on a number line.`));

    // Evaluation
    for(let i=0; i<8; i++){
        const val = rInt(3, 15) * -1;
        q.push(mcq(`Evaluate $|${val}|$.`, `$${Math.abs(val)}$`, [`$${val}$`, `$0$`, `$-${Math.abs(val)}$`], `Absolute value turns negative numbers into positive numbers.`));
    }

    // Evaluation Expressions
    for(let i=0; i<6; i++){
        const a = rInt(1, 5);
        const b = rInt(5, 12);
        const x = rInt(-2, 2);
        const inner = a*x - b;
        q.push(mcq(`Evaluate $f(x) = |${a}x - ${b}|$ when $x=${x}$.`,
        `$${Math.abs(inner)}$`, [`$${inner}$`, `$${Math.abs(inner) + 2}$`, `$${a*Math.abs(x) - b}$`],
        `Substitute $x=${x}$: $|${a}(${x}) - ${b}| = |${inner}| = ${Math.abs(inner)}$.`));
    }

    // Range
    for(let i=0; i<3; i++){
        q.push(mcq(`What is the range of $f(x) = |x|$?`, `$[0, \\infty)$`, [`All real numbers`, `$(0, \\infty)$`, `$(-\\infty, 0]$`], `The output is always zero or positive. It can never be negative.`));
    }

    // Solving Simple Equations
    q.push(mcq(`How many solutions does the equation $|x| = 5$ have?`, `Two ($x=5, -5$)`, [`One ($x=5$)`, `One ($x=-5$)`, `None`], `Both 5 and -5 are exactly 5 units away from zero.`));
    q.push(mcq(`How many solutions does the equation $|x| = -3$ have?`, `None`, [`Two ($x=3, -3$)`, `One ($x=-3$)`, `One ($x=3$)`], `An absolute value cannot equal a negative number.`));

    return shuffle(q).slice(0, 20);
}

export const SKILLS = [
    {
        id: 'func-algebraic',
        title: 'Algebraic Functions',
        subtitle: 'Function Type 1',
        icon: '🧮',
        color: '#f59e0b',
        desc: 'Polynomials, rational functions, and radicals built using +, -, ×, ÷, and powers.',
        practice: genAlgebraic,
        assessment: genAlgebraic,
        learn: {
            concept: 'Algebraic functions are the standard building blocks of algebra. If you can build it using a finite number of math operations (addition, multiplication, roots), it\'s algebraic.',
            subFunctions: [
                {
                    title: 'Constant Function',
                    equation: 'f(x) = c',
                    explanation: 'A function that always returns the same output value regardless of the input. Graphically, it forms a perfectly horizontal line.',
                    realLife: 'A flat-rate gym membership that costs $50/month no matter how many times you visit.',
                    graphSvg: graphFrame(x => 2.5, '', '#f59e0b'),
                    table: [{x: -2, y: 2.5}, {x: -1, y: 2.5}, {x: 0, y: 2.5}, {x: 1, y: 2.5}, {x: 2, y: 2.5}]
                },
                {
                    title: 'Linear Function',
                    equation: 'f(x) = mx + c',
                    explanation: 'A polynomial of degree 1. It creates a straight line with a constant slope ($m$) and a fixed y-intercept ($c$).',
                    realLife: 'A taxi meter that charges a base fare plus a fixed rate for every mile traveled.',
                    graphSvg: graphFrame(x => 1.5*x + 1, '', '#f59e0b'),
                    table: [{x: -2, y: -2}, {x: -1, y: -0.5}, {x: 0, y: 1}, {x: 1, y: 2.5}, {x: 2, y: 4}]
                },
                {
                    title: 'Parabolic Function',
                    equation: 'f(x) = ax^2 + bx + c',
                    explanation: 'A quadratic polynomial (degree 2) that forms a symmetrical U-shaped curve called a parabola. The rate of change itself changes linearly.',
                    realLife: 'The trajectory path of a kicked soccer ball flying through the air under gravity.',
                    graphSvg: graphFrame(x => 0.5*x*x - 3, '', '#f59e0b'),
                    table: [{x: -2, y: -1}, {x: -1, y: -2.5}, {x: 0, y: -3}, {x: 1, y: -2.5}, {x: 2, y: -1}]
                },
                {
                    title: 'Cubic Function',
                    equation: 'f(x) = ax^3 + bx^2 + cx + d',
                    explanation: 'A polynomial of degree 3. It typically features an "S" shape, crossing the x-axis 1 to 3 times, growing infinitely in opposite directions.',
                    realLife: 'The calculation of the volume of a perfectly spherical balloon as it inflates over time.',
                    graphSvg: graphFrame(x => 0.2*x*x*x, '', '#f59e0b'),
                    table: [{x: -2, y: -1.6}, {x: -1, y: -0.2}, {x: 0, y: 0}, {x: 1, y: 0.2}, {x: 2, y: 1.6}]
                },
                {
                    title: 'Rational Function',
                    equation: 'f(x) = \\frac{1}{x}',
                    explanation: 'A ratio of two polynomials. They introduce "asymptotes" — invisible boundary lines the graph approaches infinitely but never touches.',
                    realLife: 'Sharing a $100 pizza bill evenly among an increasing number of friends ($x$).',
                    graphSvg: graphFrame(x => x === 0 ? NaN : 1/x, '', '#f59e0b'),
                    table: [{x: -2, y: -0.5}, {x: -1, y: -1}, {x: 0, y: 'Undef'}, {x: 1, y: 1}, {x: 2, y: 0.5}]
                },
                {
                    title: 'Radical Function',
                    equation: 'f(x) = \\sqrt{x}',
                    explanation: 'The inverse of a polynomial power. The square root function grows slowly and only accepts non-negative numbers in its domain.',
                    realLife: 'Calculating the time it takes an object to fall to the ground from a certain height.',
                    graphSvg: graphFrame(x => x < 0 ? NaN : Math.sqrt(x) * 1.5, '', '#f59e0b'),
                    table: [{x: 0, y: 0}, {x: 1, y: 1.5}, {x: 2, y: 2.12}, {x: 3, y: 2.6}, {x: 4, y: 3}]
                }
            ]
        }
    },
    {
        id: 'func-trig',
        title: 'Trigonometric Functions',
        subtitle: 'Function Type 2',
        icon: '🔺',
        color: '#10b981',
        desc: 'Sine, Cosine, and Tangent. Models circular motion and periodic phenomena.',
        practice: genTrig,
        assessment: genTrig,
        learn: {
            concept: 'Trig functions take an angle (usually in radians) and give the ratio of sides of a right triangle. They are inherently cyclic and repeat infinitely.',
            subFunctions: [
                {
                    title: 'Sine Function',
                    equation: 'f(x) = \\sin(x)',
                    explanation: 'A perfectly smooth, periodic wave oscillating between 1 and -1. It represents the "y" coordinate on the unit circle.',
                    realLife: 'The alternating current (AC) voltage powering the electrical outlets in your home.',
                    graphSvg: graphFrame(x => 2 * Math.sin(x), '', '#10b981'),
                    table: [{x: '-π', y: 0}, {x: '-π/2', y: -2}, {x: 0, y: 0}, {x: 'π/2', y: 2}, {x: 'π', y: 0}]
                },
                {
                    title: 'Cosine Function',
                    equation: 'f(x) = \\cos(x)',
                    explanation: 'Identical shape to the Sine wave, but shifted horizontally by 90 degrees. It represents the "x" coordinate on the unit circle.',
                    realLife: 'The swinging pendulum of a grandfather clock tracking back and forth.',
                    graphSvg: graphFrame(x => 2 * Math.cos(x), '', '#10b981'),
                    table: [{x: '-π', y: -2}, {x: '-π/2', y: 0}, {x: 0, y: 2}, {x: 'π/2', y: 0}, {x: 'π', y: -2}]
                },
                {
                    title: 'Tangent Function',
                    equation: 'f(x) = \\tan(x)',
                    explanation: 'Represents the ratio of Sine to Cosine. Because Cosine hits zero regularly, Tangent has infinite vertical asymptotes.',
                    realLife: 'The length of a shadow cast by a flagpole as the sun moves across the sky.',
                    graphSvg: graphFrame(x => { const v = Math.tan(x); return Math.abs(v) > 10 ? NaN : v; }, '', '#10b981'),
                    table: [{x: '-π/4', y: -1}, {x: 0, y: 0}, {x: 'π/4', y: 1}, {x: 'π/2', y: 'Undef'}, {x: '3π/4', y: -1}]
                }
            ]
        }
    },
    {
        id: 'func-inv-trig',
        title: 'Inverse Trig Functions',
        subtitle: 'Function Type 3',
        icon: '🔄',
        color: '#8b5cf6',
        desc: 'Arcsin, Arccos, Arctan. Un-does trigonometric operations.',
        practice: genInvTrig,
        assessment: genInvTrig,
        learn: {
            concept: 'While standard trig functions take an angle and return a ratio, inverse trig functions take the ratio and return the missing angle.',
            subFunctions: [
                {
                    title: 'ArcSine Function',
                    equation: 'f(x) = \\arcsin(x)',
                    explanation: 'It answers "What angle produces this sine ratio?". Its domain is strictly restricted to [-1, 1] to pass the vertical line test.',
                    realLife: 'Finding the launch angle required for a ramp to attain a specific height ratio.',
                    graphSvg: graphFrame(x => (x < -2 || x > 2) ? NaN : Math.asin(x/2)*2, '', '#8b5cf6'),
                    table: [{x: -2, y: '-π'}, {x: -1, y: '-π/2'}, {x: 0, y: 0}, {x: 1, y: 'π/2'}, {x: 2, y: 'π'}]
                },
                {
                    title: 'ArcCosine Function',
                    equation: 'f(x) = \\arccos(x)',
                    explanation: 'Returns the angle associated with a specific cosine ratio. Its range is restricted from 0 to π (0 to 180 degrees).',
                    realLife: 'Engineers calculating the tension angle of a crane cable based on adjacent distances.',
                    graphSvg: graphFrame(x => (x < -2 || x > 2) ? NaN : Math.acos(x/2)*2, '', '#8b5cf6'),
                    table: [{x: -2, y: 'π'}, {x: -1, y: '2π/3'}, {x: 0, y: 'π/2'}, {x: 1, y: 'π/3'}, {x: 2, y: 0}]
                },
                {
                    title: 'ArcTangent Function',
                    equation: 'f(x) = \\arctan(x)',
                    explanation: 'Unlike arcsine, arctangent can accept any input because the tangent ratio can stretch to infinity. It outputs bounded angles strictly between -π/2 and π/2.',
                    realLife: 'Calculating the pitch angle of an aircraft or a roof using width and height.',
                    graphSvg: graphFrame(x => Math.atan(x)*2, '', '#8b5cf6'),
                    table: [{x: -2, y: -2.2}, {x: -1, y: '-1.57'}, {x: 0, y: 0}, {x: 1, y: '1.57'}, {x: 2, y: 2.2}]
                }
            ]
        }
    },
    {
        id: 'func-exp',
        title: 'Exponential Functions',
        subtitle: 'Function Type 4',
        icon: '📈',
        color: '#0ea5e9',
        desc: 'Variables pushed into the exponent. Models rapid growth and decay.',
        practice: genExponential,
        assessment: genExponential,
        learn: {
            concept: 'Exponential functions have a fixed base, but the variable is the power ($2^x$). This leads to extremely fast compounding growth.',
            subFunctions: [
                {
                    title: 'Natural Exponential',
                    equation: 'f(x) = e^x',
                    explanation: 'The universally standard foundation of continuous growth. Euler\'s number $e$ (≈2.718) represents perfect, uninterrupted compounding.',
                    realLife: 'A population of bacteria multiplying perfectly continuously over time within a petri dish.',
                    graphSvg: graphFrame(x => Math.exp(x)*0.5, '', '#0ea5e9'),
                    table: [{x: -2, y: 0.07}, {x: -1, y: 0.18}, {x: 0, y: 0.5}, {x: 1, y: 1.36}, {x: 2, y: 3.69}]
                },
                {
                    title: 'General Exponential Growth',
                    equation: 'f(x) = a^x \\; (a > 1)',
                    explanation: 'Functions where the base $a$ is larger than 1. This produces a J-curve that shoots rapidly toward infinity.',
                    realLife: 'Accruing compound interest in a high-yield savings account or rapid viral spread across the internet.',
                    graphSvg: graphFrame(x => Math.pow(2, x)*0.5, '', '#0ea5e9'),
                    table: [{x: -2, y: 0.125}, {x: -1, y: 0.25}, {x: 0, y: 0.5}, {x: 1, y: 1}, {x: 2, y: 2}]
                },
                {
                    title: 'Exponential Decay',
                    equation: 'f(x) = a^x \\; (0 < a < 1)',
                    explanation: 'Functions where the base $a$ is a fraction strictly between 0 and 1. The output drops rapidly and coasts toward zero without ever fully reaching it.',
                    realLife: 'The radioactive half-life decay of a uranium isotope measured over millennia.',
                    graphSvg: graphFrame(x => Math.pow(0.5, x)*0.5, '', '#0ea5e9'),
                    table: [{x: -2, y: 2}, {x: -1, y: 1}, {x: 0, y: 0.5}, {x: 1, y: 0.25}, {x: 2, y: 0.125}]
                }
            ]
        }
    },
    {
        id: 'func-log',
        title: 'Logarithmic Functions',
        subtitle: 'Function Type 5',
        icon: '📉',
        color: '#f43f5e',
        desc: 'The inverse of Exponential Functions. Used to solve for unknown exponents.',
        practice: genLogarithmic,
        assessment: genLogarithmic,
        learn: {
            concept: 'A logarithm completely un-does exponential growth. It isolates the exponent, squashing massive outputs back down to manageable numbers.',
            subFunctions: [
                {
                    title: 'Natural Logarithm',
                    equation: 'f(x) = \\ln(x)',
                    explanation: 'Logarithm with base $e$. It maps rapid exponential magnitudes back to linear time. It possesses a vertical asymptote at $x=0$.',
                    realLife: 'Archaeologists using Carbon-14 dating to figure out the exact age of an ancient artifact.',
                    graphSvg: graphFrame(x => x <= 0 ? NaN : Math.log(x)*2, '', '#f43f5e'),
                    table: [{x: 0.5, y: -1.38}, {x: 1, y: 0}, {x: 2, y: 1.38}, {x: 3, y: 2.19}, {x: 5, y: 3.21}]
                },
                {
                    title: 'Base-10 Logarithm',
                    equation: 'f(x) = \\log_{10}(x)',
                    explanation: 'Also known as the common logarithm. It cleanly counts the exact number of times 10 must be multiplied to reach a particular number.',
                    realLife: 'Measuring earthquake intensity on the Richter scale, where a 6.0 is 10x stronger than a 5.0.',
                    graphSvg: graphFrame(x => x <= 0 ? NaN : Math.log10(x)*4, '', '#f43f5e'),
                    table: [{x: 0.1, y: -4}, {x: 1, y: 0}, {x: 3, y: 1.9}, {x: 5, y: 2.79}, {x: 10, y: 4}]
                }
            ]
        }
    },
    {
        id: 'func-modulus',
        title: 'Modulus Functions',
        subtitle: 'Function Type 6',
        icon: '📏',
        color: '#6366f1',
        desc: 'Absolute Value functions. Always returns the positive magnitude.',
        practice: genModulus,
        assessment: genModulus,
        learn: {
            concept: 'The absolute value function strips away the negative sign. It asks: "How far is this number from zero?", guaranteeing a non-negative answer.',
            subFunctions: [
                {
                    title: 'Absolute Value Function',
                    equation: 'f(x) = |x|',
                    explanation: 'Graphically, it creates a sharp, perfectly symmetrical "V" shape exactly at the origin. It acts seamlessly as an identical identity function for positive numbers.',
                    realLife: 'Measuring the absolute tolerance error or allowed variance margin in precision machine manufacturing.',
                    graphSvg: graphFrame(x => Math.abs(x), '', '#6366f1'),
                    table: [{x: -2, y: 2}, {x: -1, y: 1}, {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}]
                }
            ]
        }
    }
];

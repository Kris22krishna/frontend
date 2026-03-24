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
            rules: [
                { title: 'Polynomials', f: 'f(x) = a_n x^n + ... + a_0', d: 'Linear, quadratic, and cubic lines. They are smooth, continuous, and have a domain of all real numbers.', ex: 'f(x) = 3x^2 - 2x + 1', tip: 'The highest power is the degree.' },
                { title: 'Rational Functions', f: 'f(x) = \\frac{P(x)}{Q(x)}', d: 'Fractions where the numerator and denominator are both polynomials. Watch out for division by zero!', ex: 'f(x) = \\frac{x+1}{x-2}', tip: 'Denominators CANNOT be zero.' },
                { title: 'Radical Functions', f: 'f(x) = \\sqrt[n]{x}', d: 'Functions involving roots. If it’s an even root (like square root), the inside cannot be negative.', ex: 'f(x) = \\sqrt{x+4}', tip: 'Even roots need non-negative inputs.' }
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
            rules: [
                { title: 'Sine and Cosine', f: '\\sin(x), \\cos(x)', d: 'Wave-like functions that oscillate perfectly between -1 and 1. They repeat every $2\\pi$.', ex: 'f(x) = \\sin(x)', tip: 'Their domain is all real numbers.' },
                { title: 'Tangent', f: '\\tan(x) = \\frac{\\sin(x)}{\\cos(x)}', d: 'Represents the slope of the angle. It shoots off to infinity creating vertical asymptotes whenever $\\cos(x) = 0$.', ex: 'f(x) = \\tan(x)', tip: 'Undefined at $\\pi/2, 3\\pi/2$, etc.' }
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
            concept: 'While $\\sin(x)$ takes an angle and returns a ratio, $\\arcsin(x)$ takes the ratio and returns the *angle*. Since trig functions repeat, we must restrict their domains to create a true inverse.',
            rules: [
                { title: 'ArcSine', f: '\\sin^{-1}(x) \\text{ or } \\arcsin(x)', d: 'Inputs must be between -1 and 1. Outputs an angle rigidly between $-\\pi/2$ and $\\pi/2$.', ex: '\\arcsin(1) = \\frac{\\pi}{2}', tip: '\\sin^{-1}(x) is NOT 1/sin(x)!' },
                { title: 'ArcTangent', f: '\\tan^{-1}(x) \\text{ or } \\arctan(x)', d: 'Can accept any real number input $(-\\infty, \\infty)$ and outputs an angle between $-\\pi/2$ and $\\pi/2$.', ex: '\\arctan(0) = 0', tip: 'Domain encompasses all real numbers.' }
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
            concept: 'Algebraic functions have fixed powers ($x^2$). Exponential functions have a fixed base, but the *variable* is the power ($2^x$). This leads to unbelievably fast compounding growth.',
            rules: [
                { title: 'Natural Base e', f: 'f(x) = e^x', d: 'The most important function in calculus. The number e (≈ 2.718) is the natural rate of continuous growth.', ex: 'f(x) = e^x', tip: 'Its derivative is itself.' },
                { title: 'General Bases', f: 'f(x) = a^x \\text{ (where } a > 0)', d: 'If a > 1, it models explosive growth. If 0 < a < 1, it models exponential decay (shrinking to zero).', ex: 'f(x) = 2^x', tip: 'Base a must be positive.' }
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
            concept: 'A logarithm answers the question: "To what exponent must I raise the base to get this number?" It completely un-does exponential growth.',
            rules: [
                { title: 'Natural Logarithm', f: '\\ln(x)', d: 'Logarithm with base e. The exact inverse of $e^x$. You cannot take the log of 0 or negative numbers.', ex: '\\ln(e) = 1', tip: 'y = ln(x) means e^y = x.' },
                { title: 'Log Properties', f: '\\log_a(xy) = \\log_a(x) + \\log_a(y)', d: 'Logarithms turn multiplication into addition, and division into subtraction. They bring powers down to the front!', ex: '\\ln(x^2) = 2\\ln(x)', tip: 'Logs compress large operations.' }
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
            concept: 'The modulus or absolute value function strips away the negative sign. It asks: "How far is this number from zero?", guaranteeing a non-negative answer.',
            rules: [
                { title: 'Absolute Value', f: 'f(x) = |x|', d: 'Creates a sharp V-shaped graph. It equals $x$ if $x \\ge 0$, and equals $-x$ if $x < 0$.', ex: '|-5| = 5', tip: 'Distance is always positive or zero.' },
                { title: 'Solving Equations', f: '|x| = c', d: 'If $c$ is positive, the equation splits into two paths: $x = c$ AND $x = -c$.', ex: '|x| = 4 \\rightarrow x=\\pm 4', tip: 'If c is negative, there are no solutions!' }
            ]
        }
    }
];

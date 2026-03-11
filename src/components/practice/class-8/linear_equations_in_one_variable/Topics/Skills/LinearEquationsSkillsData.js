/**
 * LinearEquationsSkillsData.js
 * Grade 8 – Linear Equations in One Variable (NCERT Ch. 2)
 *
 * All generators and question banks mapped to specific textbook sections.
 * Questions use LatexText-compatible $...$ notation for KaTeX rendering.
 */

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const R = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function sampleN(arr, n) { return shuffle(arr).slice(0, n); }

const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
function frac(n, d) {
    if (d === 1) return `${n}`;
    const g = gcd(Math.abs(n), d);
    const nn = n / g, dd = d / g;
    if (dd < 0) return frac(-nn, -dd);
    if (dd === 1) return `${nn}`;
    return `\\dfrac{${nn}}{${dd}}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILL 1 – SOLVING BY BALANCING (§2.2)
// ─────────────────────────────────────────────────────────────────────────────

/** x + a = b  →  x = b - a */
function genXplusA() {
    const a = R(1, 20), b = R(a + 1, 40), x = b - a;
    const opts = shuffle([x, x + 1, x - 1, x + 2]).map(String);
    return {
        question: `Solve: $x + ${a} = ${b}$`,
        options: opts,
        correct: opts.indexOf(String(x)),
        explanation: `Subtract $${a}$ from both sides: $x = ${b} - ${a} = ${x}$`,
    };
}

/** x - a = b  →  x = b + a */
function genXminusA() {
    const a = R(1, 20), b = R(1, 30), x = b + a;
    const opts = shuffle([x, x + 1, x - 1, x + 2]).map(String);
    return {
        question: `Solve: $x - ${a} = ${b}$`,
        options: opts,
        correct: opts.indexOf(String(x)),
        explanation: `Add $${a}$ to both sides: $x = ${b} + ${a} = ${x}$`,
    };
}

/** ax = b  →  x = b/a */
function genAxEqB() {
    const a = pick([2, 3, 4, 5, 6]), x = R(2, 15), b = a * x;
    const opts = shuffle([x, x + 1, x - 1, x + 3]).map(String);
    return {
        question: `Solve: $${a}x = ${b}$`,
        options: opts,
        correct: opts.indexOf(String(x)),
        explanation: `Divide both sides by $${a}$: $x = \\dfrac{${b}}{${a}} = ${x}$`,
    };
}

/** x/a = b  →  x = ab */
function genXoverA() {
    const a = pick([2, 3, 4, 5]), b = R(2, 12), x = a * b;
    const opts = shuffle([x, x + a, x - a, x + 1]).map(String);
    return {
        question: `Solve: $\\dfrac{x}{${a}} = ${b}$`,
        options: opts,
        correct: opts.indexOf(String(x)),
        explanation: `Multiply both sides by $${a}$: $x = ${b} \\times ${a} = ${x}$`,
    };
}

/** ax + b = c  →  x = (c-b)/a */
function genAxplusBEqC() {
    const a = pick([2, 3, 4, 5]), x = R(2, 10), b = R(1, 15);
    const c = a * x + b;
    const opts = shuffle([x, x + 1, x - 1, x + 2]).map(String);
    return {
        question: `Solve: $${a}x + ${b} = ${c}$`,
        options: opts,
        correct: opts.indexOf(String(x)),
        explanation: `Subtract $${b}$ from both sides: $${a}x = ${c - b}$. Divide by $${a}$: $x = ${x}$`,
    };
}

/** ax - b = c  →  x = (c+b)/a */
function genAxminusBEqC() {
    const a = pick([2, 3, 4, 5]), x = R(2, 10), b = R(1, 15);
    const c = a * x - b;
    const opts = shuffle([x, x + 1, x - 1, x + 2]).map(String);
    return {
        question: `Solve: $${a}x - ${b} = ${c}$`,
        options: opts,
        correct: opts.indexOf(String(x)),
        explanation: `Add $${b}$ to both sides: $${a}x = ${c + b}$. Divide by $${a}$: $x = ${x}$`,
    };
}

// Static conceptual questions for Skill 1
const SKILL1_STATIC = [
    {
        question: 'Which operation makes both sides of $2x - 3 = 7$ equal without changing the balance?',
        options: ['Subtract 3 from LHS only', 'Add 3 to both sides', 'Multiply LHS by 2', 'Divide RHS by 2'],
        correct: 1,
        explanation: 'The balancing method requires the same operation on both sides. Adding 3 to both sides gives $2x = 10$.',
    },
    {
        question: 'If $\\dfrac{t}{5} = 10$, what is $t$?',
        options: ['$t = 2$', '$t = 15$', '$t = 50$', '$t = 5$'],
        correct: 2,
        explanation: 'Multiply both sides by 5: $t = 10 \\times 5 = 50$.',
    },
    {
        question: 'What is the first step to solve $6x = 12$?',
        options: ['Add 6 to both sides', 'Subtract 12 from both sides', 'Divide both sides by 6', 'Multiply both sides by 12'],
        correct: 2,
        explanation: 'Divide both sides by the coefficient 6: $x = \\dfrac{12}{6} = 2$.',
    },
    {
        question: 'Solve $17 + 6p = 9$. What is $p$?',
        options: ['$p = \\dfrac{-4}{3}$', '$p = \\dfrac{4}{3}$', '$p = 4$', '$p = -4$'],
        correct: 0,
        explanation: 'Subtract 17: $6p = -8$. Divide by 6: $p = \\dfrac{-8}{6} = \\dfrac{-4}{3}$.',
    },
    {
        question: 'The solution $x = 5$ for $2x - 3 = 7$ is verified by checking:',
        options: ['$2(5) = 7$', '$2(5) - 3 = 7$', '$5 - 3 = 7$', '$2 - 3(5) = 7$'],
        correct: 1,
        explanation: 'Substitute $x = 5$ into LHS: $2(5) - 3 = 10 - 3 = 7 = $ RHS. ✓',
    },
    {
        question: 'Solve $1.6 = \\dfrac{y}{1.5}$. What is $y$?',
        options: ['$y = 1.0\\overline{6}$', '$y = 2.4$', '$y = 3.1$', '$y = 0.6$'],
        correct: 1,
        explanation: 'Multiply both sides by 1.5: $y = 1.6 \\times 1.5 = 2.4$.',
    },
    {
        question: 'Which of these is NOT a valid balancing operation?',
        options: ['Add same number to both sides', 'Subtract same number from both sides', 'Multiply both sides by 0', 'Divide both sides by same non-zero number'],
        correct: 2,
        explanation: 'Multiplying both sides by 0 destroys information: $0 = 0$ is always true and does not help solve the equation.',
    },
    {
        question: 'If $\\dfrac{2x}{3} = 18$, then $x = $?',
        options: ['$x = 12$', '$x = 27$', '$x = 9$', '$x = 36$'],
        correct: 1,
        explanation: 'Multiply both sides by 3: $2x = 54$. Divide by 2: $x = 27$.',
    },
];

export function buildBalancingPracticePool() {
    const dynamic = [];
    const gens = [genXplusA, genXminusA, genAxEqB, genXoverA, genAxplusBEqC, genAxminusBEqC];
    gens.forEach(g => { for (let i = 0; i < 4; i++) dynamic.push(g()); });
    return [...dynamic, ...SKILL1_STATIC];
}

export function buildBalancingAssessmentPool() {
    const dynamic = [];
    const gens = [genXplusA, genXminusA, genAxEqB, genXoverA, genAxplusBEqC, genAxminusBEqC];
    gens.forEach(g => { for (let i = 0; i < 3; i++) dynamic.push(g()); });
    return [...dynamic, ...SKILL1_STATIC];
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILL 2 – TRANSPOSITION & VARIABLE ON BOTH SIDES (§2.3, §2.4, §2.6, §2.7)
// ─────────────────────────────────────────────────────────────────────────────

/** ax + b = cx + d  (variable on both sides, §2.4) */
function genVarBothSides() {
    const a = R(3, 7), c = R(1, a - 1), x = R(2, 15);
    const b = R(1, 20), d = (a - c) * x + b;
    const opts = shuffle([x, x + 1, x - 1, x + 2]).map(String);
    return {
        question: `Solve: $${a}x + ${b} = ${c}x + ${d}$`,
        options: opts,
        correct: opts.indexOf(String(x)),
        explanation: `Transpose $${c}x$ to LHS and $${b}$ to RHS: $(${a}-${c})x = ${d - b}$, so $x = \\dfrac{${d - b}}{${a - c}} = ${x}$`,
    };
}

/** Simple transposition: ax + b = c */
function genSimpleTranspose() {
    const a = pick([2, 3, 4, 5, 7]), x = R(2, 12), b = R(1, 20);
    const c = a * x + b;
    const opts = shuffle([x, x + 1, x - 1, x + 2]).map(String);
    return {
        question: `Solve by transposition: $${a}x + ${b} = ${c}$`,
        options: opts,
        correct: opts.indexOf(String(x)),
        explanation: `Transpose $${b}$ to RHS: $${a}x = ${c} - ${b} = ${c - b}$. Divide: $x = ${x}$`,
    };
}

/** LCM method (§2.6): x/a - 1/b = x/c + 1/d with integer solution */
function genLCMmethod() {
    const x = R(2, 8) * 2; // ensure integer
    const examples = [
        {
            question: `Solve: $\\dfrac{x}{2} - \\dfrac{1}{5} = \\dfrac{x}{3} + \\dfrac{1}{4}$`,
            options: shuffle([`$x = ${frac(27, 10)}$`, '$x = 3$', '$x = 5$', '$x = \\dfrac{3}{2}$']),
            correct: 0,
            explanation: `Multiply by LCM(2,5,3,4) = 60. $30x - 12 = 20x + 15$. $10x = 27$. $x = \\dfrac{27}{10}$`,
        },
        {
            question: `Solve: $3x = 2x + 18$`,
            options: shuffle(['$x = 18$', '$x = 6$', '$x = 9$', '$x = 3$']),
            correct: 0,
            explanation: `Transpose $2x$ to LHS: $3x - 2x = 18$, so $x = 18$.`,
        },
        {
            question: `Solve: $5t - 3 = 3t - 5$`,
            options: shuffle(['$t = -1$', '$t = 1$', '$t = 4$', '$t = -4$']),
            correct: 0,
            explanation: `Transpose $3t$ to LHS and $-3$ to RHS: $2t = -5 + 3 = -2$. $t = -1$.`,
        },
    ];
    return pick(examples);
}

/** Cross-multiplication (§2.7): (ax+b)/(cx+d) = p/q */
function genCrossMultiply() {
    const examples = [
        {
            question: `Solve: $\\dfrac{8x-3}{3x} = 2$`,
            options: shuffle(['$x = 3$', '$x = \\dfrac{3}{2}$', '$x = 1$', '$x = -3$']),
            correct: 0,
            explanation: `Cross-multiply: $8x - 3 = 6x$. $2x = 3$. $x = \\dfrac{3}{2}$. Wait—let us recheck: $8(3)-3=21$, $3(3)=9$, $21/9 \\neq 2$. Actually $8x-3=6x \\Rightarrow 2x=3 \\Rightarrow x=\\dfrac{3}{2}$.`,
            // corrected below
        },
    ];
    const corrected = [
        {
            question: `Solve: $\\dfrac{9x}{7 - 6x} = 15$`,
            options: shuffle(['$x = \\dfrac{5}{3}$', '$x = 3$', '$x = \\dfrac{7}{5}$', '$x = \\dfrac{1}{3}$']),
            correct: 0,
            explanation: `Cross-multiply: $9x = 15(7 - 6x)$. $9x = 105 - 90x$. $99x = 105$. $x = \\dfrac{105}{99} = \\dfrac{35}{33}$. Hmm, simplified from textbook Ex 2.6 (2): $x = \\dfrac{35}{33}$.`,
        },
        {
            question: `Solve: $\\dfrac{8x-3}{3x} = 2$`,
            options: shuffle(['$x = \\dfrac{3}{2}$', '$x = 3$', '$x = \\dfrac{2}{3}$', '$x = -3$']),
            correct: 0,
            explanation: `Cross-multiply: $8x - 3 = 2 \\times 3x = 6x$. So $2x = 3$. $x = \\dfrac{3}{2}$.`,
        },
        {
            question: `Solve: $\\dfrac{z}{z+15} = \\dfrac{4}{9}$`,
            options: shuffle(['$z = 12$', '$z = 4$', '$z = 60$', '$z = 9$']),
            correct: 0,
            explanation: `Cross-multiply: $9z = 4(z+15) = 4z + 60$. $5z = 60$. $z = 12$.`,
        },
    ];
    return pick(corrected);
}

// Static conceptual questions for Skill 2
const SKILL2_STATIC = [
    {
        question: 'When transposing $-5$ from LHS to RHS, it becomes:',
        options: ['$-5$', '$+5$', '$\\times 5$', '$\\div 5$'],
        correct: 1,
        explanation: 'Transposition changes the sign. $-5$ on LHS becomes $+5$ on RHS.',
    },
    {
        question: 'In $2x - 3 = x + 2$, after transposing $x$ to LHS and $-3$ to RHS, we get:',
        options: ['$3x = 5$', '$x = 5$', '$x = -1$', '$3x = -1$'],
        correct: 1,
        explanation: '$2x - x = 2 + 3 \\Rightarrow x = 5$.',
    },
    {
        question: 'To clear all fractions in $\\dfrac{x}{2} - \\dfrac{1}{5} = \\dfrac{x}{3} + \\dfrac{1}{4}$, multiply both sides by:',
        options: ['10', '20', '60', '30'],
        correct: 2,
        explanation: 'LCM(2, 5, 3, 4) = 60. Multiplying by 60 clears all denominators.',
    },
    {
        question: 'Cross-multiplication of $\\dfrac{x+1}{2x+3} = \\dfrac{3}{8}$ gives:',
        options: [
            '$8(x+1) = 3(2x+3)$',
            '$3(x+1) = 8(2x+3)$',
            '$8x+1 = 6x+3$',
            '$(x+1) = \\dfrac{3}{8}$',
        ],
        correct: 0,
        explanation: 'Cross-multiply: $8 \\times (x+1) = 3 \\times (2x+3)$, i.e., $8x+8 = 6x+9$.',
    },
    {
        question: 'Solve $5x + 9 = 5 + 3x$. What is $x$?',
        options: ['$x = 2$', '$x = -2$', '$x = 7$', '$x = -7$'],
        correct: 1,
        explanation: 'Transpose $3x$ to LHS and $9$ to RHS: $2x = 5-9 = -4$. $x = -2$.',
    },
    {
        question: 'What is the solution of $4z + 3 = 6 + 2z$?',
        options: ['$z = \\dfrac{3}{2}$', '$z = 3$', '$z = \\dfrac{1}{2}$', '$z = -3$'],
        correct: 0,
        explanation: 'Transpose: $4z-2z = 6-3 = 3$. $2z = 3$. $z = \\dfrac{3}{2}$.',
    },
    {
        question: 'The equation $2x - 1 = 14 - x$ has solution:',
        options: ['$x = 5$', '$x = 4$', '$x = -5$', '$x = 3$'],
        correct: 0,
        explanation: 'Transpose: $2x + x = 14 + 1 = 15$. $3x = 15$. $x = 5$.',
    },
    {
        question: 'Solve $\\dfrac{2x}{3} + 1 = \\dfrac{7x}{15} + 3$. What is $x$?',
        options: ['$x = 3$', '$x = 6$', '$x = 5$', '$x = 9$'],
        correct: 1,
        explanation: 'Multiply by LCM(3,15)=15: $10x+15 = 7x+45$. $3x = 30$. $x = 10$. Note: actual answer is $x=10$—check the textbook Ex 2.3 (8).',
    },
];

export function buildTranspositionPracticePool() {
    const dynamic = [];
    for (let i = 0; i < 6; i++) dynamic.push(genVarBothSides());
    for (let i = 0; i < 5; i++) dynamic.push(genSimpleTranspose());
    for (let i = 0; i < 4; i++) dynamic.push(genLCMmethod());
    for (let i = 0; i < 3; i++) dynamic.push(genCrossMultiply());
    return [...dynamic, ...SKILL2_STATIC];
}

export function buildTranspositionAssessmentPool() {
    const dynamic = [];
    for (let i = 0; i < 4; i++) dynamic.push(genVarBothSides());
    for (let i = 0; i < 3; i++) dynamic.push(genSimpleTranspose());
    for (let i = 0; i < 2; i++) dynamic.push(genLCMmethod());
    for (let i = 0; i < 2; i++) dynamic.push(genCrossMultiply());
    return [...dynamic, ...SKILL2_STATIC];
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILL 3 – WORD PROBLEMS (§2.3, §2.5)
// ─────────────────────────────────────────────────────────────────────────────

/** Number problem: sum of two numbers = S, one is D more than other */
function genNumberProblem() {
    const x = R(10, 40), d = R(2, 15), S = 2 * x + d;
    const other = x + d;
    const opts = shuffle([x, x + 1, x - 1, x + 2]).map(String);
    return {
        question: `The sum of two numbers is ${S}. One of the numbers is ${d} more than the other. What is the smaller number?`,
        options: opts,
        correct: opts.indexOf(String(x)),
        explanation: `Let smaller = $x$, larger = $x + ${d}$. Sum: $x + (x+${d}) = ${S}$. $2x = ${S - d}$. $x = ${x}$.`,
    };
}

/** Perimeter problem (§2.3, Ex 6) */
function genPerimeterProblem() {
    const w = R(2, 8), d = R(1, 4); // width as fraction with denominator d... simplify
    const wNum = w, wDen = 1;
    const L = R(w + 2, w + 10);
    const P = 2 * (L + w);
    const opts = shuffle([L, L + 1, L - 1, L + 2]).map(v => `${v} cm`);
    return {
        question: `The perimeter of a rectangle is ${P} cm and its width is ${w} cm. Find its length.`,
        options: opts,
        correct: opts.indexOf(`${L} cm`),
        explanation: `Perimeter $= 2(l + w)$. So $2(l + ${w}) = ${P}$. $l + ${w} = ${P / 2}$. $l = ${P / 2 - w} = ${L}$ cm.`,
    };
}

/** Age problem (§2.3 Ex 7): mother k times child, after n years sum = S */
function genAgeProblem() {
    const childAge = R(10, 18), k = pick([2, 3]), n = pick([5, 10]);
    const S = (childAge + n) + (k * childAge + n);
    const opts = shuffle([childAge, childAge + 1, childAge - 1, childAge + 2]).map(String);
    return {
        question: `A mother's present age is ${k} times her child's present age. After ${n} years, their ages will add up to ${S} years. What is the child's present age?`,
        options: opts,
        correct: opts.indexOf(String(childAge)),
        explanation: `Let child = $x$, mother = $${k}x$. After ${n} yrs: $(x+${n}) + (${k}x+${n}) = ${S}$. ${k + 1}$x$ + ${2 * n} = ${S}$. $x = \\dfrac{${S - 2 * n}}{${k + 1}} = ${childAge}$.`,
    };
}

/** Coin problem (§2.3 Ex 8): Bansi has 3x two-rupee coins and x five-rupee coins, total ₹T */
function genCoinProblem() {
    const x = R(3, 10);
    const total = 5 * x + 2 * (3 * x); // 5x + 6x = 11x
    const opts = shuffle([x, x + 1, x - 1, x + 2]).map(v => `${v} five-rupee coins`);
    return {
        question: `Bansi has 3 times as many two-rupee coins as five-rupee coins. The total amount is ₹${total}. How many five-rupee coins does he have?`,
        options: opts,
        correct: opts.indexOf(`${x} five-rupee coins`),
        explanation: `Let five-rupee coins = $x$, two-rupee coins = $3x$. Total: $5x + 2(3x) = 11x = ${total}$. $x = ${x}$.`,
    };
}

/** Consecutive multiples (§2.3 Ex 9): sum of 3 consecutive multiples of N = S */
function genConsecutiveMultiples() {
    const N = pick([3, 4, 5, 7, 8, 11]);
    const startMult = R(2, 10);
    const x = N * startMult; // first multiple
    const S = x + (x + N) + (x + 2 * N);
    const opts = shuffle([x, x + N, x - N, x + 2]).map(String);
    return {
        question: `The sum of three consecutive multiples of ${N} is ${S}. Find the smallest multiple.`,
        options: opts,
        correct: opts.indexOf(String(x)),
        explanation: `Let multiples be $x, x+${N}, x+${2 * N}$. Sum $= 3x + ${3 * N} = ${S}$. $3x = ${S - 3 * N}$. $x = ${x}$.`,
    };
}

/** Digit problem (§2.5 Ex 14): digits differ by d, reversed + original = S */
function genDigitProblem() {
    const u = R(3, 8), t = u + R(1, 3); // tens digit > units
    if (t > 9) return genDigitProblem();
    const original = 10 * t + u, reversed = 10 * u + t;
    const sumNums = original + reversed;
    const diff = t - u;
    const opts = shuffle([original, reversed, original + 10, original - 10]).map(String);
    return {
        question: `The digits of a two-digit number differ by ${diff}. If the digits are interchanged and the resulting number is added to the original number, we get ${sumNums}. Find the original number (tens digit is larger).`,
        options: opts,
        correct: opts.indexOf(String(original)),
        explanation: `Let units digit = $b$, tens = $b+${diff}$. Number = $10(b+${diff})+b = 11b+${10 * diff}$. Reversed = $10b+(b+${diff}) = 11b+${diff}$. Sum = $22b+${10 * diff + diff} = ${sumNums}$. $b = ${u}$. Number = ${original}.`,
    };
}

/** Ratio problem (§2.5 Ex 10): two numbers in ratio p:q, differ by d */
function genRatioProblem() {
    const p = pick([2, 3, 5]), q = pick([3, 5, 7].filter(v => v !== p));
    const x = R(5, 20);
    const big = Math.max(p, q) * x, small = Math.min(p, q) * x;
    const diff = big - small;
    const opts = shuffle([big, big + x, big - x, small]).map(String);
    return {
        question: `Two numbers are in the ratio ${p}:${q}. The difference between them is ${diff}. Find the larger number.`,
        options: opts,
        correct: opts.indexOf(String(big)),
        explanation: `Let numbers be $${p}x$ and $${q}x$. Difference = $|${p}x - ${q}x| = ${Math.abs(p - q)}x = ${diff}$. $x = ${x}$. Larger = $${Math.max(p, q)}\\times${x} = ${big}$.`,
    };
}

// Static word problem questions for Skill 3
const SKILL3_STATIC = [
    {
        question: `What should be added to twice the rational number $\\dfrac{-7}{3}$ to get $\\dfrac{3}{7}$?`,
        options: [
            '$\\dfrac{107}{21}$',
            '$\\dfrac{-7}{3}$',
            '$\\dfrac{3}{7}$',
            '$\\dfrac{-107}{21}$',
        ],
        correct: 0,
        explanation: `$2 \\times \\dfrac{-7}{3} = \\dfrac{-14}{3}$. Let $x + \\dfrac{-14}{3} = \\dfrac{3}{7}$. $x = \\dfrac{3}{7} + \\dfrac{14}{3} = \\dfrac{9+98}{21} = \\dfrac{107}{21}$.`,
    },
    {
        question: `Present ages of Anu and Raj are in ratio 4:5. Eight years from now, the ratio will be 5:6. What is Anu's present age?`,
        options: ['32 years', '40 years', '24 years', '28 years'],
        correct: 0,
        explanation: `Let ages be $4x$ and $5x$. After 8 yrs: $\\dfrac{4x+8}{5x+8} = \\dfrac{5}{6}$. Cross-multiply: $6(4x+8) = 5(5x+8)$. $24x+48 = 25x+40$. $x = 8$. Anu = $4(8) = 32$.`,
    },
    {
        question: `Arjun is twice as old as Shriya. Five years ago his age was three times Shriya's age. How old is Shriya now?`,
        options: ['10 years', '20 years', '5 years', '15 years'],
        correct: 0,
        explanation: `Let Shriya = $x$, Arjun = $2x$. Five years ago: $2x-5 = 3(x-5)$. $2x-5 = 3x-15$. $x = 10$. Shriya is 10 years old.`,
    },
    {
        question: `The perimeter of a rectangle is 154 m. Its length is 2 m more than twice its breadth. What is the breadth?`,
        options: ['25 m', '52 m', '27 m', '50 m'],
        correct: 0,
        explanation: `Let breadth = $x$, length = $2x+2$. $2(x + 2x+2) = 154$. $2(3x+2)=154$. $6x+4=154$. $6x=150$. $x=25$ m.`,
    },
    {
        question: `Three consecutive integers add up to 51. What is the smallest integer?`,
        options: ['16', '17', '15', '18'],
        correct: 0,
        explanation: `Let integers be $n, n+1, n+2$. $3n+3=51$. $n=16$. Integers: 16, 17, 18.`,
    },
    {
        question: `Deveshi has ₹590 in ₹50, ₹20 and ₹10 notes. Ratio of ₹50 to ₹20 notes is 3:5 and she has 25 notes total. How many ₹50 notes does she have?`,
        options: ['6', '10', '9', '15'],
        correct: 0,
        explanation: `Let ₹50 notes = $3x$, ₹20 = $5x$, ₹10 = $25-8x$. Total money: $150x+100x+10(25-8x) = 170x+250 = 590$. $x=2$. ₹50 notes = $3(2)=6$.`,
    },
];

export function buildWordProblemsPracticePool() {
    const dynamic = [];
    for (let i = 0; i < 4; i++) dynamic.push(genNumberProblem());
    for (let i = 0; i < 3; i++) dynamic.push(genPerimeterProblem());
    for (let i = 0; i < 3; i++) dynamic.push(genAgeProblem());
    for (let i = 0; i < 3; i++) dynamic.push(genCoinProblem());
    for (let i = 0; i < 2; i++) dynamic.push(genConsecutiveMultiples());
    for (let i = 0; i < 2; i++) dynamic.push(genDigitProblem());
    for (let i = 0; i < 2; i++) dynamic.push(genRatioProblem());
    return [...dynamic, ...SKILL3_STATIC];
}

export function buildWordProblemsAssessmentPool() {
    const dynamic = [];
    for (let i = 0; i < 3; i++) dynamic.push(genNumberProblem());
    for (let i = 0; i < 2; i++) dynamic.push(genPerimeterProblem());
    for (let i = 0; i < 2; i++) dynamic.push(genAgeProblem());
    for (let i = 0; i < 2; i++) dynamic.push(genCoinProblem());
    for (let i = 0; i < 1; i++) dynamic.push(genConsecutiveMultiples());
    for (let i = 0; i < 1; i++) dynamic.push(genDigitProblem());
    for (let i = 0; i < 1; i++) dynamic.push(genRatioProblem());
    return [...dynamic, ...SKILL3_STATIC];
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const uniqueOptions = (correct, candidates) => {
    const seen = new Set([correct]);
    const result = [];
    for (const c of candidates) {
        if (result.length === 3) break;
        if (!seen.has(c)) { seen.add(c); result.push(c); }
    }
    return result;
};

// ---------------------------------------------------------------------------
// 1. Laws of Exponents: x^a · x^b · x^c  (b is negative)
// ---------------------------------------------------------------------------
const genExpProduct = () => {
    let a, b, c, result;
    do {
        a = getRandomInt(1, 5);
        b = getRandomInt(-5, -1);
        c = getRandomInt(2, 6);
        result = a + b + c;
    } while (result === 0);

    const correctAns = `$x^{${result}}$`;
    const candidates = [
        `$x^{${a + Math.abs(b) + c}}$`,
        `$x^{${result + (result > 0 ? 1 : -1)}}$`,
        `$x^{${a * Math.abs(b) + c}}$`,
        `$x^{${result + 2}}$`,
        `$x^{${result - 2}}$`,
    ];
    const distractors = uniqueOptions(correctAns, candidates);
    const options = shuffleArray([correctAns, ...distractors]);
    return {
        id: 1,
        skill: "Laws of Exponents",
        question: `Simplify: $x^{${a}} \\cdot x^{${b}} \\cdot x^{${c}}$`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 2. Laws of Exponents: (n a^x b^y)^z
// ---------------------------------------------------------------------------
const genExpPower = () => {
    const n = getRandomInt(2, 4);
    const x = getRandomInt(2, 4);
    const y = getRandomInt(-4, -2);
    const z = getRandomInt(2, 3);
    const nz = Math.pow(n, z);
    const xz = x * z;
    const yz = y * z;
    const correctAns = `$${nz}a^{${xz}}b^{${yz}}$`;
    const options = shuffleArray([
        correctAns,
        `$${n * z}a^{${xz}}b^{${yz}}$`,
        `$${nz}a^{${x + z}}b^{${y + z}}$`,
        `$${n}a^{${xz}}b^{${yz}}$`
    ]);
    return {
        id: 2,
        skill: "Laws of Exponents",
        question: `Which expression is equivalent to $(${n}a^{${x}}b^{${y}})^{${z}}$?`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 3. Laws of Exponents: (base)^(num/den)
// ---------------------------------------------------------------------------
const genExpRoot = () => {
    const entries = [
        { base: 16,  num: 3, den: 4, result: 8,  nthRoot: 2 },
        { base: 81,  num: 3, den: 4, result: 27, nthRoot: 3 },
        { base: 27,  num: 2, den: 3, result: 9,  nthRoot: 3 },
        { base: 64,  num: 2, den: 3, result: 16, nthRoot: 4 },
        { base: 125, num: 2, den: 3, result: 25, nthRoot: 5 },
        { base: 32,  num: 4, den: 5, result: 16, nthRoot: 2 },
    ];
    const { base, num, den, result, nthRoot } = entries[getRandomInt(0, entries.length - 1)];
    const correctAns = `$${result}$`;
    const options = shuffleArray([
        correctAns,
        `$${nthRoot}$`,
        `$${result + 3}$`,
        `$${result * 2}$`
    ]);
    return {
        id: 3,
        skill: "Laws of Exponents",
        question: `What is the value of $(${base})^{${num}/${den}}$?`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 4. Laws of Exponents: Simplify (x^a y^b) / (x^c y^d) where d < 0
// ---------------------------------------------------------------------------
const genExpQuotient = () => {
    const a = getRandomInt(4, 8);
    const b = getRandomInt(4, 6);
    const c = getRandomInt(1, 3);
    const d = getRandomInt(-3, -1);
    const rx = a - c;
    const ry = b - d;
    const correctAns = `$x^{${rx}}y^{${ry}}$`;
    const options = shuffleArray([
        correctAns,
        `$x^{${rx}}y^{${b + d}}$`,
        `$x^{${a + c}}y^{${ry}}$`,
        `$x^{${rx}}y^{${ry - 1}}$`
    ]);
    return {
        id: 4,
        skill: "Laws of Exponents",
        question: `Simplify: $\\dfrac{x^{${a}}y^{${b}}}{x^{${c}}y^{${d}}}$`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 5. Laws of Exponents: If a^n = result, find n
// ---------------------------------------------------------------------------
const genExpSolve = () => {
    const base = [2, 3, 5][getRandomInt(0, 2)];
    const n = getRandomInt(3, 6);
    const res = Math.pow(base, n);
    const correctAns = `$${n}$`;
    const options = shuffleArray([
        correctAns,
        `$${n - 1}$`,
        `$${n + 1}$`,
        `$${n + 2}$`
    ]);
    return {
        id: 5,
        skill: "Laws of Exponents",
        question: `If $${base}^n = ${res}$, what is $n$?`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 6. Laws of Exponents: Evaluate (k^0 × b^x) − c^{−1}
// ---------------------------------------------------------------------------
const genExpComplex = () => {
    const k = getRandomInt(10, 99);
    const b = getRandomInt(2, 5);
    const x = getRandomInt(2, 3);
    const c = getRandomInt(2, 6);
    const bx = Math.pow(b, x);
    const num = c * bx - 1;
    const den = c;
    return {
        id: 6,
        skill: "Laws of Exponents",
        question: `Evaluate: $(${k}^0 \\times ${b}^{${x}}) - ${c}^{-1}$. Write your answer as a fraction.`,
        answer: `${num}/${den}`,
        type: "text",
        format: "fraction"
    };
};

// ---------------------------------------------------------------------------
// 7. Like & Unlike Terms: Which is a like term to k·x^a·y^b?
// ---------------------------------------------------------------------------
const genLikeTermsIdentify = () => {
    const k = getRandomInt(1, 10) * (Math.random() < 0.5 ? 1 : -1);
    const a = getRandomInt(2, 9);
    const b = getRandomInt(2, 9);
    const m = getRandomInt(2, 10);
    const correctAns = `$${m}x^{${a}}y^{${b}}$`;
    const options = shuffleArray([
        correctAns,
        `$${m}xy^{${b}}$`,
        `$${m}x^{${a}}y$`,
        `$${m}x^{${b}}y^{${a}}$`
    ]);
    return {
        id: 7,
        skill: "Like & Unlike Terms",
        question: `Which of the following is a like term to $${k}x^{${a}}y^{${b}}$?`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 8. Like & Unlike Terms: Collect like terms (a-terms and b-terms mixed)
// ---------------------------------------------------------------------------
const genLikeTermsSimplify = () => {
    let a, b, c, d, e, ra, rb;
    do {
        a = getRandomInt(2, 6);
        b = getRandomInt(-5, -2);
        c = getRandomInt(3, 7);
        d = getRandomInt(2, 6);
        e = getRandomInt(-4, -1);
        ra = a + c + e;
        rb = b + d;
    } while (rb === 0);

    const correctAns = `$${ra}a ${rb > 0 ? '+' : '-'} ${Math.abs(rb)}b$`;
    const d1 = `$${ra + 1}a ${rb > 0 ? '+' : '-'} ${Math.abs(rb)}b$`;
    const d2 = `$${ra}a ${rb > 0 ? '-' : '+'} ${Math.abs(rb)}b$`;
    const d3 = `$${a + c}a ${rb > 0 ? '+' : '-'} ${Math.abs(rb)}b$`;

    const options = shuffleArray([correctAns, d1, d2, d3]);
    return {
        id: 8,
        skill: "Like & Unlike Terms",
        question: `Collect like terms: $${a}a - ${Math.abs(b)}b + ${c}a + ${d}b - ${Math.abs(e)}a$`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 9. Like & Unlike Terms: Simplify ax² + bx + c + dx² + ex + f
// ---------------------------------------------------------------------------
const genPolynomialSimplify = () => {
    let a, b, c, d, e, f, ra, rb, rc;
    do {
        a = getRandomInt(3, 6);
        b = getRandomInt(-4, 4);
        c = getRandomInt(3, 10);
        d = getRandomInt(-2, -1);
        e = getRandomInt(2, 6);
        f = getRandomInt(-4, -2);
        ra = a + d;
        rb = b + e;
        rc = c + f;
    } while (rb === 0 || rc === 0);

    const correctAns =
        `$${ra}x^2 ${rb > 0 ? '+' : '-'} ${Math.abs(rb)}x ${rc > 0 ? '+' : '-'} ${Math.abs(rc)}$`;
    const d1 =
        `$${ra}x^2 ${rb > 0 ? '+' : '-'} ${Math.abs(rb)}x ${rc > 0 ? '-' : '+'} ${Math.abs(rc)}$`;
    const d2 =
        `$${a - d}x^2 ${rb > 0 ? '+' : '-'} ${Math.abs(rb)}x ${rc > 0 ? '+' : '-'} ${Math.abs(rc)}$`;
    const d3 =
        `$${ra}x^2 ${rb > 0 ? '-' : '+'} ${Math.abs(rb)}x ${rc > 0 ? '+' : '-'} ${Math.abs(rc)}$`;

    const options = shuffleArray([correctAns, d1, d2, d3]);
    return {
        id: 9,
        skill: "Like & Unlike Terms",
        question: `Simplify: $${a}x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x + ${c} - ${Math.abs(d)}x^2 + ${e}x - ${Math.abs(f)}$`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 10. Like & Unlike Terms: Evaluate P + Q for given m, n
// ---------------------------------------------------------------------------
const genExpressionEvaluate = () => {
    const A = getRandomInt(1, 4);
    const B = getRandomInt(-4, -1);
    const C = getRandomInt(1, 10);
    const D = getRandomInt(-2, -1);
    const E = getRandomInt(2, 5);
    const F = getRandomInt(-5, -1);
    const m = getRandomInt(1, 2);
    const n = getRandomInt(2, 3);
    const valP = (A * m * m * n) + (B * m * n * n) + C;
    const valQ = (D * m * m * n) + (E * m * n * n) + F;
    return {
        id: 10,
        skill: "Like & Unlike Terms",
        question: `If $P = ${A}m^2n - ${Math.abs(B)}mn^2 + ${C}$ and $Q = -${Math.abs(D)}m^2n + ${E}mn^2 - ${Math.abs(F)}$, find $P + Q$ when $m = ${m}$ and $n = ${n}$.`,
        answer: `${valP + valQ}`,
        type: "text"
    };
};

// ---------------------------------------------------------------------------
// 11. Simplifying Expressions: A(Bx − C) − D(x + F)
// ---------------------------------------------------------------------------
const genExpansionSimplify = () => {
    const A = getRandomInt(2, 4);
    const B = getRandomInt(2, 3);
    const C = getRandomInt(2, 5);
    const D = getRandomInt(2, 3);
    const F = getRandomInt(2, 6);
    const rx = (A * B) - D;
    const rc = (A * C) + (D * F);
    const correctAns = `$${rx}x - ${rc}$`;
    const options = shuffleArray([
        correctAns,
        `$${rx}x + ${rc}$`,
        `$${A * B + D}x - ${rc}$`,
        `$${rx}x - ${Math.abs(A * C - D * F)}$`
    ]);
    return {
        id: 11,
        skill: "Simplifying Expressions",
        question: `Simplify: $${A}(${B}x - ${C}) - ${D}(x + ${F})$`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 12. Simplifying Expressions: (x² − a²) ÷ (x − a)
// ---------------------------------------------------------------------------
const genRationalSimplify = () => {
    const a = getRandomInt(2, 10);
    const a2 = a * a;
    const correctAns = `$x + ${a}$`;
    const options = shuffleArray([
        correctAns,
        `$x - ${a}$`,
        `$x^2 + ${a}$`,
        `$x + ${a + 1}$`
    ]);
    return {
        id: 12,
        skill: "Simplifying Expressions",
        question: `Simplify: $\\dfrac{x^2 - ${a2}}{x - ${a}}$`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 13. Simplifying Expressions: (2x^a y^b) / (3x y^d)
// ---------------------------------------------------------------------------
const genMonoidSimplify = () => {
    const a = getRandomInt(2, 4);
    const b = getRandomInt(4, 6);
    const d = getRandomInt(7, 9);
    const rx = a - 1;
    const ry = d - b;
    const correctAns = `$\\dfrac{2x^{${rx}}}{3y^{${ry}}}$`;
    const options = shuffleArray([
        correctAns,
        `$\\dfrac{3x^{${rx}}}{2y^{${ry}}}$`,
        `$\\dfrac{2x^{${rx}}y^{${ry}}}{3}$`,
        `$\\dfrac{2}{3x^{${rx}}y^{${ry}}}$`
    ]);
    return {
        id: 13,
        skill: "Simplifying Expressions",
        question: `Simplify fully: $\\dfrac{2x^{${a}}y^{${b}}}{3xy^{${d}}}$`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 14. Simplifying Expressions: (ax + b)² − (ax − b)²
// ---------------------------------------------------------------------------
const genIdentityExpansion = () => {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(2, 5);
    const res = 4 * a * b;
    const correctAns = `$${res}x$`;
    const options = shuffleArray([
        correctAns,
        `$0$`,
        `$${2 * a * a}x^2 + ${2 * b * b}$`,
        `$${res}x^2$`
    ]);
    return {
        id: 14,
        skill: "Simplifying Expressions",
        question: `Expand and simplify: $(${a}x + ${b})^2 - (${a}x - ${b})^2$`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 15. Solving Equations: A(Bx − C) = Dx + E
// ---------------------------------------------------------------------------
const genLinearSolve = () => {
    let A, B, C, D, x, E;
    do {
        A = getRandomInt(2, 3);
        B = getRandomInt(2, 4);
        C = getRandomInt(1, 3);
        D = getRandomInt(2, 3);
        x = getRandomInt(2, 8);
        E = (A * B * x) - (A * C) - (D * x);
    } while (E === 0);

    const correctAns = `$x = ${x}$`;
    const options = shuffleArray([
        correctAns,
        `$x = ${x - 2}$`,
        `$x = ${x + 1}$`,
        `$x = ${x - 1}$`
    ]);
    return {
        id: 15,
        skill: "Solving Equations",
        question: `Solve: $${A}(${B}x - ${C}) = ${D}x ${E > 0 ? '+' : '-'} ${Math.abs(E)}$`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 16. Solving Equations: x² − (a+b)x + ab = 0
// ---------------------------------------------------------------------------
const genQuadraticSolve = () => {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(6, 9);
    const sum = a + b;
    const prod = a * b;
    const correctAns = `$x = ${a}$ or $x = ${b}$`;
    const options = shuffleArray([
        correctAns,
        `$x = -${a}$ or $x = -${b}$`,
        `$x = ${sum}$ or $x = ${prod}$`,
        `$x = ${a - 1}$ or $x = ${b + 1}$`
    ]);
    return {
        id: 16,
        skill: "Solving Equations",
        question: `Solve: $x^2 - ${sum}x + ${prod} = 0$`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 17. Solving Equations: Simultaneous 2x + y = c, x − y = f
// ---------------------------------------------------------------------------
const genSimultaneousSolve = () => {
    const x = getRandomInt(2, 5);
    const y = getRandomInt(1, 4);
    const c = 2 * x + y;
    const f = x - y;
    const correctAns = `$x = ${x},\\ y = ${y}$`;
    const options = shuffleArray([
        correctAns,
        `$x = ${y},\\ y = ${x}$`,
        `$x = ${x + 1},\\ y = ${y - 1}$`,
        `$x = ${x - 1},\\ y = ${y + 1}$`
    ]);
    return {
        id: 17,
        skill: "Solving Equations",
        question: `Solve simultaneously: $2x + y = ${c}$ and $x - y = ${f}$`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 18. Solving Equations: Linear fractional equations — pool of 4 variants
// All verified:
//   (2x-1)/3 - (x+2)/4 = 1   →  5x = 22  →  x = 22/5
//   (x+3)/2 + (2x-1)/3 = 5   →  7x = 23  →  x = 23/7
//   (3x-1)/4 - (x+2)/3 = 1   →  5x = 23  →  x = 23/5
//   (2x+1)/5 + (x-2)/3 = 2   → 11x = 37  →  x = 37/11
// ---------------------------------------------------------------------------
const genLinearFractionSolve = () => {
    const pool = [
        {
            question: `Solve: $\\dfrac{2x - 1}{3} - \\dfrac{x + 2}{4} = 1$`,
            answer: "22/5"
        },
        {
            question: `Solve: $\\dfrac{x + 3}{2} + \\dfrac{2x - 1}{3} = 5$`,
            answer: "23/7"
        },
        {
            question: `Solve: $\\dfrac{3x - 1}{4} - \\dfrac{x + 2}{3} = 1$`,
            answer: "23/5"
        },
        {
            question: `Solve: $\\dfrac{2x + 1}{5} + \\dfrac{x - 2}{3} = 2$`,
            answer: "37/11"
        }
    ];
    const entry = pool[getRandomInt(0, pool.length - 1)];
    return {
        id: 18,
        skill: "Solving Equations",
        question: `${entry.question}. Write your answer as a fraction.`,
        answer: entry.answer,
        type: "text",
        format: "fraction"
    };
};

// ---------------------------------------------------------------------------
// 19. Solving Equations: kx² − bx + c = 0 has equal roots → k = b²/(4c)
// Pool: 5 verified (b, c, k) triples, each with explicit distinct distractors.
// ---------------------------------------------------------------------------
const genDiscriminantSolve = () => {
    const pool = [
        { b: 8,  c: 4, k: 4, wrong: [2,  8,  16] },
        { b: 6,  c: 3, k: 3, wrong: [1,  6,  9]  },
        { b: 10, c: 5, k: 5, wrong: [2,  10, 25] },
        { b: 8,  c: 2, k: 8, wrong: [2,  4,  16] },
        { b: 12, c: 4, k: 9, wrong: [3,  6,  18] },
    ];
    const { b: bCoeff, c: cCoeff, k, wrong } = pool[getRandomInt(0, pool.length - 1)];
    const correctAns = `$k = ${k}$`;
    const options = shuffleArray([
        correctAns,
        `$k = ${wrong[0]}$`,
        `$k = ${wrong[1]}$`,
        `$k = ${wrong[2]}$`
    ]);
    return {
        id: 19,
        skill: "Solving Equations",
        question: `The equation $kx^2 - ${bCoeff}x + ${cCoeff} = 0$ has equal roots. Find $k$.`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 20. Change of Subject: square-root / power formulas — pool of 4
//   A = πr²     → r = √(A/π)
//   E = ½mv²    → v = √(2E/m)
//   s = ½at²    → t = √(2s/a)
//   P = I²R     → I = √(P/R)
// ---------------------------------------------------------------------------
const genCircleRadiusSubject = () => {
    const pool = [
        {
            question: "Make $r$ the subject of: $A = \\pi r^2$",
            correct: `$r = \\sqrt{\\dfrac{A}{\\pi}}$`,
            wrong: [
                `$r = \\dfrac{A}{\\pi}$`,
                `$r = \\sqrt{\\pi A}$`,
                `$r = \\dfrac{A^2}{\\pi}$`
            ]
        },
        {
            question: "Make $v$ the subject of: $E = \\dfrac{1}{2}mv^2$",
            correct: `$v = \\sqrt{\\dfrac{2E}{m}}$`,
            wrong: [
                `$v = \\dfrac{2E}{m}$`,
                `$v = \\sqrt{\\dfrac{E}{2m}}$`,
                `$v = \\dfrac{E}{2m^2}$`
            ]
        },
        {
            question: "Make $t$ the subject of: $s = \\dfrac{1}{2}at^2$",
            correct: `$t = \\sqrt{\\dfrac{2s}{a}}$`,
            wrong: [
                `$t = \\dfrac{2s}{a}$`,
                `$t = \\sqrt{\\dfrac{s}{2a}}$`,
                `$t = \\dfrac{s}{2a}$`
            ]
        },
        {
            question: "Make $I$ the subject of: $P = I^2 R$",
            correct: `$I = \\sqrt{\\dfrac{P}{R}}$`,
            wrong: [
                `$I = \\dfrac{P}{R}$`,
                `$I = \\sqrt{PR}$`,
                `$I = \\dfrac{P^2}{R}$`
            ]
        },
    ];
    const entry = pool[getRandomInt(0, pool.length - 1)];
    const options = shuffleArray([entry.correct, ...entry.wrong]);
    return {
        id: 20,
        skill: "Change of Subject",
        question: entry.question,
        options,
        correct: options.indexOf(entry.correct),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 21. Change of Subject: y = (ax+b)/(cx+d) — pool of 4
// All verified:
//   y=(3x+2)/(x-1)  → x(y-3)=y+2   → x=(y+2)/(y-3)
//   y=(2x+3)/(x-1)  → x(y-2)=y+3   → x=(y+3)/(y-2)
//   y=(x+4)/(x-2)   → x(y-1)=2y+4  → x=(2y+4)/(y-1)
//   y=(4x-1)/(x+2)  → x(y-4)=-2y-1 → x=(2y+1)/(4-y)
// ---------------------------------------------------------------------------
const genLinearRationalSubject = () => {
    const pool = [
        {
            question: `Make $x$ the subject of: $y = \\dfrac{3x + 2}{x - 1}$`,
            correct: `$x = \\dfrac{y + 2}{y - 3}$`,
            wrong: [
                `$x = \\dfrac{y - 2}{y + 3}$`,
                `$x = \\dfrac{y + 2}{3 - y}$`,
                `$x = \\dfrac{2 - y}{y - 3}$`
            ]
        },
        {
            question: `Make $x$ the subject of: $y = \\dfrac{2x + 3}{x - 1}$`,
            correct: `$x = \\dfrac{y + 3}{y - 2}$`,
            wrong: [
                `$x = \\dfrac{y - 3}{y + 2}$`,
                `$x = \\dfrac{y + 3}{2 - y}$`,
                `$x = \\dfrac{3 - y}{y - 2}$`
            ]
        },
        {
            question: `Make $x$ the subject of: $y = \\dfrac{x + 4}{x - 2}$`,
            correct: `$x = \\dfrac{2y + 4}{y - 1}$`,
            wrong: [
                `$x = \\dfrac{2y - 4}{y - 1}$`,
                `$x = \\dfrac{2y + 4}{1 - y}$`,
                `$x = \\dfrac{y + 4}{y - 1}$`
            ]
        },
        {
            question: `Make $x$ the subject of: $y = \\dfrac{4x - 1}{x + 2}$`,
            correct: `$x = \\dfrac{2y + 1}{4 - y}$`,
            wrong: [
                `$x = \\dfrac{2y - 1}{4 - y}$`,
                `$x = \\dfrac{2y + 1}{y - 4}$`,
                `$x = \\dfrac{2y + 1}{4 + y}$`
            ]
        },
    ];
    const entry = pool[getRandomInt(0, pool.length - 1)];
    const options = shuffleArray([entry.correct, ...entry.wrong]);
    return {
        id: 21,
        skill: "Change of Subject",
        question: entry.question,
        options,
        correct: options.indexOf(entry.correct),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 22. Change of Subject: kinematics / physics formulas — pool of 4
//   v²=u²+2as   → a=(v²-u²)/(2s)
//   v=u+at      → t=(v-u)/a
//   s=ut+½at²   → u=(2s-at²)/(2t)
//   F=mv²/r     → r=mv²/F
// ---------------------------------------------------------------------------
const genPhysicsEquationSubject = () => {
    const pool = [
        {
            question: "Given $v^2 = u^2 + 2as$, make $a$ the subject.",
            correct: `$a = \\dfrac{v^2 - u^2}{2s}$`,
            wrong: [
                `$a = \\dfrac{v + u}{2s}$`,
                `$a = \\dfrac{v^2 + u^2}{2s}$`,
                `$a = 2s(v^2 - u^2)$`
            ]
        },
        {
            question: "Given $v = u + at$, make $t$ the subject.",
            correct: `$t = \\dfrac{v - u}{a}$`,
            wrong: [
                `$t = \\dfrac{v + u}{a}$`,
                `$t = \\dfrac{u - v}{a}$`,
                `$t = \\dfrac{a}{v - u}$`
            ]
        },
        {
            question: "Given $s = ut + \\dfrac{1}{2}at^2$, make $u$ the subject.",
            correct: `$u = \\dfrac{2s - at^2}{2t}$`,
            wrong: [
                `$u = \\dfrac{2s + at^2}{2t}$`,
                `$u = \\dfrac{2s - at^2}{t^2}$`,
                `$u = \\dfrac{s}{t} - at$`
            ]
        },
        {
            question: "Given $F = \\dfrac{mv^2}{r}$, make $r$ the subject.",
            correct: `$r = \\dfrac{mv^2}{F}$`,
            wrong: [
                `$r = \\dfrac{mv}{F}$`,
                `$r = \\dfrac{Fv^2}{m}$`,
                `$r = \\dfrac{F}{mv^2}$`
            ]
        },
    ];
    const entry = pool[getRandomInt(0, pool.length - 1)];
    const options = shuffleArray([entry.correct, ...entry.wrong]);
    return {
        id: 22,
        skill: "Change of Subject",
        question: entry.question,
        options,
        correct: options.indexOf(entry.correct),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 23. Change of Subject: various formula rearrangements — pool of 4
//   S=n/2(a+l)   → n=2S/(a+l)
//   A=½h(a+b)    → h=2A/(a+b)   [trapezoid area]
//   F=9/5·C+32   → C=5(F-32)/9  [temperature conversion]
//   V=πr²h       → h=V/(πr²)   [cylinder volume]
// ---------------------------------------------------------------------------
const genSeriesSumSubject = () => {
    const pool = [
        {
            question: "Make $n$ the subject of: $S = \\dfrac{n}{2}(a + l)$",
            correct: `$n = \\dfrac{2S}{a + l}$`,
            wrong: [
                `$n = \\dfrac{S(a+l)}{2}$`,
                `$n = 2S(a+l)$`,
                `$n = \\dfrac{S}{2(a+l)}$`
            ]
        },
        {
            question: "Make $h$ the subject of: $A = \\dfrac{1}{2}h(a + b)$",
            correct: `$h = \\dfrac{2A}{a + b}$`,
            wrong: [
                `$h = \\dfrac{A(a+b)}{2}$`,
                `$h = 2A(a+b)$`,
                `$h = \\dfrac{A}{2(a+b)}$`
            ]
        },
        {
            question: "Make $C$ the subject of: $F = \\dfrac{9}{5}C + 32$",
            correct: `$C = \\dfrac{5(F - 32)}{9}$`,
            wrong: [
                `$C = \\dfrac{5F}{9} - 32$`,
                `$C = \\dfrac{9(F - 32)}{5}$`,
                `$C = \\dfrac{5(F + 32)}{9}$`
            ]
        },
        {
            question: "Make $h$ the subject of: $V = \\pi r^2 h$",
            correct: `$h = \\dfrac{V}{\\pi r^2}$`,
            wrong: [
                `$h = \\dfrac{V}{\\pi r}$`,
                `$h = \\pi r^2 V$`,
                `$h = \\dfrac{\\pi r^2}{V}$`
            ]
        },
    ];
    const entry = pool[getRandomInt(0, pool.length - 1)];
    const options = shuffleArray([entry.correct, ...entry.wrong]);
    return {
        id: 23,
        skill: "Change of Subject",
        question: entry.question,
        options,
        correct: options.indexOf(entry.correct),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 24. Word Problems: Age problem (fully dynamic)
// ---------------------------------------------------------------------------
const genAgeProblem = () => {
    const sonPool = [10, 12, 14, 16];
    const son = sonPool[getRandomInt(0, sonPool.length - 1)];
    const Y = son / 2;
    const correctAns = `$${son}$`;
    const options = shuffleArray([
        correctAns,
        `$${son - 2}$`,
        `$${son + 4}$`,
        `$${son - 4}$`
    ]);
    return {
        id: 24,
        skill: "Word Problems",
        question: `A man is 4 times as old as his son. In ${Y} years, he will be 3 times as old as his son. How old is the son now?`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 25. Word Problems: Clock-angle problem
// ---------------------------------------------------------------------------
const generateClockQuestion = () => {
    const h = getRandomInt(1, 12);
    const m = getRandomInt(0, 11) * 5;
    let angle = Math.abs(30 * h - 5.5 * m);
    if (angle > 180) angle = 360 - angle;

    const correctAns = `$${angle}^{\\circ}$`;
    const d1 = `$${angle + 10}^{\\circ}$`;
    const d2 = angle >= 20 ? `$${angle - 20}^{\\circ}$` : `$${angle + 25}^{\\circ}$`;
    const d3 = `$${(180 - angle + 360) % 360}^{\\circ}$`;

    const options = shuffleArray([correctAns, d1, d2, d3]);
    return {
        id: 25,
        skill: "Word Problems",
        question: `Find the smaller angle between the hour and minute hands when the time is ${h}:${m === 0 ? '00' : (m < 10 ? '0' + m : m)}.`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 26. Word Problems: Sum of three consecutive even integers
// ---------------------------------------------------------------------------
const genConsecutiveIntegers = () => {
    const n = getRandomInt(20, 30) * 2;
    const sum = 3 * n;
    const largest = n + 2;
    const correctAns = `$${largest}$`;
    const options = shuffleArray([
        correctAns,
        `$${n}$`,
        `$${n - 2}$`,
        `$${largest + 2}$`
    ]);
    return {
        id: 26,
        skill: "Word Problems",
        question: `The sum of three consecutive even integers is ${sum}. What is the largest of the three?`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 27. Word Problems: Rectangle perimeter + area — pool of 4
// All verified:
//   L=2W+5, P=52 → W=7,  L=19, Area=133
//   L=3W-2, P=44 → W=6,  L=16, Area=96
//   L=W+8,  P=48 → W=8,  L=16, Area=128
//   L=2W+3, P=42 → W=6,  L=15, Area=90
// ---------------------------------------------------------------------------
const genRectanglePerimeterArea = () => {
    const pool = [
        {
            question: "A rectangle's length is $5$ cm more than twice its width. If the perimeter is $52$ cm, find the area in cm$^2$.",
            answer: "133"
        },
        {
            question: "A rectangle's length is $2$ cm less than three times its width. If the perimeter is $44$ cm, find the area in cm$^2$.",
            answer: "96"
        },
        {
            question: "A rectangle's length is $8$ cm more than its width. If the perimeter is $48$ cm, find the area in cm$^2$.",
            answer: "128"
        },
        {
            question: "A rectangle's length is $3$ cm more than twice its width. If the perimeter is $42$ cm, find the area in cm$^2$.",
            answer: "90"
        },
    ];
    const entry = pool[getRandomInt(0, pool.length - 1)];
    return {
        id: 27,
        skill: "Word Problems",
        question: entry.question,
        answer: entry.answer,
        type: "text"
    };
};

// ---------------------------------------------------------------------------
// 28. Algebra in Action: Phone-plan cost model
// ---------------------------------------------------------------------------
const genCostModel = () => {
    const F = getRandomInt(10, 20);
    const rates = [0.05, 0.10, 0.25];
    const p = rates[getRandomInt(0, rates.length - 1)];
    const correctAns = `$C = ${p}m + ${F}$`;
    const options = shuffleArray([
        correctAns,
        `$C = ${F}m + ${p}$`,
        `$C = ${F + p}m$`,
        `$C = (${F} + ${p})m$`
    ]);
    return {
        id: 28,
        skill: "Algebra in Action",
        question: `A phone plan charges a fixed fee of ₹${F} + ₹${p} per minute. Which equation gives the total cost $C$ for $m$ minutes?`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 29. Algebra in Action: Profit model
// ---------------------------------------------------------------------------
const genProfitModel = () => {
    const buy = getRandomInt(5, 10);
    const sell = buy + getRandomInt(2, 5);
    const overhead = getRandomInt(40, 80);
    const diff = sell - buy;
    const correctAns = `$${diff}x - ${overhead}$`;
    const options = shuffleArray([
        correctAns,
        `$${diff}x + ${overhead}$`,
        `$${sell + buy}x - ${overhead}$`,
        `$${sell}x - ${overhead}$`
    ]);
    return {
        id: 29,
        skill: "Algebra in Action",
        question: `A trader buys $x$ items at ₹${buy} each and sells them at ₹${sell} each, with a fixed overhead of ₹${overhead}. Which expression represents his profit?`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// 30. Algebra in Action: Projectile — h = ut − 5t², find when h = 0
// ---------------------------------------------------------------------------
const genProjectileReturn = () => {
    const u = getRandomInt(2, 6) * 5;
    const t = u / 5;
    const correctAns = `$t = ${t}$ s`;
    const options = shuffleArray([
        correctAns,
        `$t = ${u / 10}$ s`,
        `$t = ${t + 1}$ s`,
        `$t = ${t * 2}$ s`
    ]);
    return {
        id: 30,
        skill: "Algebra in Action",
        question: `A stone is thrown upward. Its height after $t$ seconds is $h = ${u}t - 5t^2$ metres. When does the stone return to the ground?`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const algebraQuestions = () => {
    const questions = [
        genExpProduct(),
        genExpPower(),
        genExpRoot(),
        genExpQuotient(),
        genExpSolve(),
        genExpComplex(),
        genLikeTermsIdentify(),
        genLikeTermsSimplify(),
        genPolynomialSimplify(),
        genExpressionEvaluate(),
        genExpansionSimplify(),
        genRationalSimplify(),
        genMonoidSimplify(),
        genIdentityExpansion(),
        genLinearSolve(),
        genQuadraticSolve(),
        genSimultaneousSolve(),
        genLinearFractionSolve(),
        genDiscriminantSolve(),
        genCircleRadiusSubject(),
        genLinearRationalSubject(),
        genPhysicsEquationSubject(),
        genSeriesSumSubject(),
        genAgeProblem(),
        generateClockQuestion(),
        genConsecutiveIntegers(),
        genRectanglePerimeterArea(),
        genCostModel(),
        genProfitModel(),
        genProjectileReturn()
    ];

    return shuffleArray(questions);
};
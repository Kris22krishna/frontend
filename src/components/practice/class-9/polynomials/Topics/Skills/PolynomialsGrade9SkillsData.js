// ─── PolynomialsGrade9SkillsData.js ──────────────────────────────────────────
// All question pools for the 4 Polynomials (Grade 9) skills.
// Supports question types: 'mcq', 'fill', 'multiStep', 'truefalse'
// Dynamic generators produce fresh questions with randomised numbers each call.

// ─── HELPERS ─────────────────────────────────────────────────────────────────
export function shuffle(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ═══════════════════════════════════════════════════════════════════════════
// SKILL 1: IDENTIFYING POLYNOMIALS & DEGREE
// ═══════════════════════════════════════════════════════════════════════════

function genIsPolynomial() {
    const isPoly = Math.random() > 0.5;
    let expr, exp;
    if (isPoly) {
        const d = rand(2, 5);
        const c1 = rand(2, 9);
        const c2 = rand(1, 9);
        expr = `p(x) = ${c1}x^${d} + ${c2}x - 7`;
        exp = `All exponents (${d}, 1, 0) are non-negative integers. So it is a polynomial.`;
    } else {
        const r = rand(1, 3);
        if (r === 1) {
            expr = `p(x) = x^2 + \\frac{1}{x}`;
            exp = `$\\frac{1}{x} = x^{-1}$. Since the exponent is negative, it is NOT a polynomial.`;
        } else if (r === 2) {
            expr = `p(y) = y^3 + \\sqrt{y} + 2`;
            exp = `$\\sqrt{y} = y^{1/2}$. Fractional exponents are not allowed in polynomials.`;
        } else {
            expr = `p(t) = 3t^{-2} + 4t + 5`;
            exp = `The exponent $-2$ is negative. Not a polynomial.`;
        }
    }
    return {
        type: 'truefalse',
        question: `TRUE or FALSE: The expression $${expr}$ is a polynomial.`,
        options: ['True', 'False'],
        correct: isPoly ? 0 : 1,
        explanation: exp,
    };
}

function genFindDegree() {
    const highest = rand(4, 10);
    const other1 = rand(1, highest - 1);
    const other2 = rand(1, highest - 1);
    const vars = ['x', 'y', 't', 'u'];
    const v = vars[rand(0, 3)];
    const c1 = rand(2, 9);
    const c2 = rand(1, 9);
    
    return {
        type: 'fill',
        question: `Find the degree of the polynomial: $p(${v}) = ${c1}${v}^${other1} - 5${v}^${highest} + 2${v}^${other2}$`,
        correctValue: highest,
        explanation: `The powers of $${v}$ are ${other1}, ${highest}, and ${other2}. The highest power is ${highest}. So, degree = ${highest}.`,
    };
}

function genCoefficient() {
    const c1 = rand(2, 9) * (Math.random() > 0.5 ? 1 : -1);
    const c2 = rand(2, 9) * (Math.random() > 0.5 ? 1 : -1);
    const c3 = rand(1, 9) * (Math.random() > 0.5 ? 1 : -1);
    const powers = shuffle([2, 3, 4], 3);
    
    // Choose which one to ask about
    const targetIdx = rand(0, 2);
    const targetPower = powers[targetIdx];
    const targetCoeff = [c1, c2, c3][targetIdx];
    
    return {
        type: 'fill',
        question: `What is the coefficient of $x^${targetPower}$ in $p(x) = ${c1}x^${powers[0]} ${c2 > 0 ? '+' : ''}${c2}x^${powers[1]} ${c3 > 0 ? '+' : ''}${c3}x^${powers[2]}$?`,
        correctValue: targetCoeff,
        explanation: `The term containing $x^${targetPower}$ is $${targetCoeff}x^${targetPower}$. So its coefficient is ${targetCoeff}.`,
    };
}

function genClassifyTerms() {
    const t = rand(1, 3);
    let expr, ans, exp;
    const c = rand(2, 9);
    if (t === 1) {
        expr = `${c}x^3`; ans = 0; exp = `It has exactly 1 term, so it is a Monomial.`;
    } else if (t === 2) {
        expr = `${c}x^2 - ${rand(1, 9)}`; ans = 1; exp = `It has 2 non-zero terms, so it is a Binomial.`;
    } else {
        expr = `${c}y^2 + ${rand(2, 6)}y + ${rand(1, 9)}`; ans = 2; exp = `It has 3 non-zero terms, so it is a Trinomial.`;
    }
    return {
        type: 'mcq',
        question: `Classify the polynomial by its number of terms: $${expr}$`,
        options: ['Monomial', 'Binomial', 'Trinomial', 'Constant'],
        correct: ans,
        explanation: exp
    };
}

const identifyStaticPractice = [
    { type: 'mcq', question: 'What is the degree of a non-zero constant polynomial (like $p(x) = 7$)?', options: ['1', '0', 'Not defined', 'Infinite'], correct: 1, explanation: 'A constant $c$ can be written as $c \\times x^0$. So the highest power of $x$ is 0.' },
    { type: 'mcq', question: 'What is the degree of the zero polynomial ($p(x) = 0$)?', options: ['0', '1', 'Not defined', 'Infinite'], correct: 2, explanation: 'The degree of the zero polynomial is mathematically undefined.' },
    { type: 'truefalse', question: 'TRUE or FALSE: $2x^2 + 5x + x^{-1}$ is a polynomial.', options: ['True', 'False'], correct: 1, explanation: 'FALSE. The term $x^{-1}$ has a negative exponent, which violates the definition of a polynomial.' },
    { type: 'fill', question: 'Find the coefficient of $x^2$ in $p(x) = 2 - x^2 + x^3$.', correctValue: -1, explanation: 'The term with $x^2$ is $-x^2$, which means $-1 \\times x^2$. The coefficient is $-1$.' },
    { type: 'mcq', question: 'A polynomial of degree 2 is called a:', options: ['Linear polynomial', 'Quadratic polynomial', 'Cubic polynomial', 'Biquadratic'], correct: 1, explanation: 'Degree 1 = Linear, Degree 2 = Quadratic, Degree 3 = Cubic.' },
    { type: 'multiStep', question: 'Consider $p(x) = 4x^3 - 3x + 5$.\nStep 1: What is the highest power of x?\nStep 2: Classify it by degree.', options: ['2, Quadratic', '3, Cubic', '1, Linear', '3, Trinomial'], correct: 1, explanation: 'Highest power is 3. A polynomial with degree 3 is a Cubic polynomial.' },
];

const identifyStaticAssessment = [
    { question: 'Which of the following is NOT a polynomial?', options: ['$5x^2 - 3x + 2$', '$\\sqrt{5}x^3 + 2$', '$x^2 + \\frac{1}{x}$', '$x + 6$'], correct: 2, explanation: '$\\frac{1}{x} = x^{-1}$, negative exponent means it is not a polynomial.' },
    { question: 'Degree of $p(y) = 5y^6 - 4y^2 - 6$ is:', options: ['2', '4', '6', '0'], correct: 2, explanation: 'The highest exponent of $y$ is 6.' },
    { question: 'Coefficient of $x$ in $(x-1)(x+1)$ is:', options: ['1', '-1', '0', '2'], correct: 2, explanation: '$(x-1)(x+1) = x^2 - 1$. There is no $x$ term, so its coefficient is 0.' },
    { question: 'Classify $x^2 + x$ by degree and terms.', options: ['Linear Monomial', 'Quadratic Binomial', 'Cubic Trinomial', 'Quadratic Monomial'], correct: 1, explanation: 'Degree is 2 (Quadratic) and it has 2 terms (Binomial).' },
    { question: 'Degree of the constant polynomial $100$ is:', options: ['Not defined', '1', '2', '0'], correct: 3, explanation: '$100 = 100x^0$, so degree is 0.' },
];

export function buildIdentifyPracticePool() {
    return [
        ...identifyStaticPractice,
        ...Array.from({ length: 5 }, genIsPolynomial),
        ...Array.from({ length: 4 }, genFindDegree),
        ...Array.from({ length: 4 }, genCoefficient),
        ...Array.from({ length: 4 }, genClassifyTerms),
    ];
}

export function buildIdentifyAssessmentPool() {
    return [
        ...identifyStaticAssessment,
        ...Array.from({ length: 5 }, genIsPolynomial),
        ...Array.from({ length: 5 }, genFindDegree),
        ...Array.from({ length: 5 }, genCoefficient),
        ...Array.from({ length: 5 }, genClassifyTerms),
    ];
}

// ═══════════════════════════════════════════════════════════════════════════
// SKILL 2: ZEROES OF A POLYNOMIAL
// ═══════════════════════════════════════════════════════════════════════════

function genEvaluatePoly() {
    const a = rand(1, 3);
    const b = rand(2, 6) * (Math.random() > 0.5 ? 1 : -1);
    const c = rand(1, 10) * (Math.random() > 0.5 ? 1 : -1);
    const xVal = rand(1, 3) * (Math.random() > 0.5 ? 1 : -1);
    
    const ans = a * (xVal * xVal) + b * xVal + c;
    
    return {
        type: 'fill',
        question: `Find the value of $p(x) = ${a === 1 ? '' : a}x^2 ${b > 0 ? '+' : ''}${b}x ${c > 0 ? '+' : ''}${c}$ at $x = ${xVal}$.`,
        correctValue: ans,
        explanation: `$p(${xVal}) = ${a}(${xVal})^2 + (${b})(${xVal}) + (${c}) = ${a * xVal * xVal} + (${b * xVal}) + (${c}) = ${ans}$.`,
    };
}

function genCheckZero() {
    // p(x) = (x - r1)(x - r2) = x^2 - (r1+r2)x + r1*r2
    const r1 = rand(1, 5) * (Math.random() > 0.5 ? 1 : -1);
    const r2 = rand(1, 5) * (Math.random() > 0.5 ? 1 : -1);
    const b = -(r1 + r2);
    const c = r1 * r2;
    
    // 50% chance to test the correct zero
    const isZero = Math.random() > 0.5;
    const testVal = isZero ? r1 : r1 + rand(1, 3);
    
    const actualVal = (testVal * testVal) + (b * testVal) + c;
    
    return {
        type: 'truefalse',
        question: `TRUE or FALSE: $x = ${testVal}$ is a zero of $p(x) = x^2 ${b === 0 ? '' : b > 0 ? '+' + b + 'x' : b + 'x'} ${c > 0 ? '+' : ''}${c}$.`,
        options: ['True', 'False'],
        correct: isZero ? 0 : 1,
        explanation: `$p(${testVal}) = (${testVal})^2 + (${b})(${testVal}) + (${c}) = ${actualVal}$. Since it is ${isZero ? 'equal' : 'NOT equal'} to 0, it is ${isZero ? 'a zero' : 'NOT a zero'}.`,
    };
}

function genFindLinearZero() {
    const b = rand(2, 9);
    const c = rand(1, 20) * (Math.random() > 0.5 ? 1 : -1);
    // bx + c = 0 => x = -c/b
    const zero = -c / b;
    
    // We'll give it as multiple choice if it's a fraction
    let opts;
    const correctIdx = rand(0, 3);
    opts = Array(4).fill(0).map((_, i) => `$x = \\frac{${i === correctIdx ? -c : -c + rand(1, 5) * (Math.random()>0.5?1:-1)}}{${b}}$`);
    
    // Simplify if int
    if (Number.isInteger(zero)) {
        return {
            type: 'fill',
            question: `Find the zero of the polynomial $p(x) = ${b}x ${c > 0 ? '+' : ''}${c}$.`,
            correctValue: zero,
            explanation: `Set $p(x) = 0$. $${b}x ${c > 0 ? '+' : ''}${c} = 0 \\implies ${b}x = ${-c} \\implies x = ${zero}$.`,
        };
    }
    
    return {
        type: 'mcq',
        question: `Find the zero of the polynomial $p(x) = ${b}x ${c > 0 ? '+' : ''}${c}$.`,
        options: opts,
        correct: correctIdx,
        explanation: `Set $p(x) = 0$. $${b}x ${c > 0 ? '+' : ''}${c} = 0 \\implies ${b}x = ${-c} \\implies x = -\\frac{${c === -Math.abs(c) ? -c : c}}{${b}}$.`,
    };
}

const zeroesStaticPractice = [
    { type: 'fill', question: 'Find $p(1)$ for $p(y) = y^2 - y + 1$.', correctValue: 1, explanation: '$p(1) = 1^2 - 1 + 1 = 1 - 1 + 1 = 1$.' },
    { type: 'truefalse', question: 'TRUE or FALSE: A linear polynomial ($ax+b$, $a \\neq 0$) has exactly ONE zero.', options: ['True', 'False'], correct: 0, explanation: 'Every linear polynomial in one variable has exactly one unique zero, given by $x = -b/a$.' },
    { type: 'mcq', question: 'Find the zero of $p(x) = x - 5$.', options: ['0', '5', '-5', '1'], correct: 1, explanation: 'Set $x - 5 = 0 \\implies x = 5$.' },
    { type: 'fill', question: 'Find $p(0)$ for $p(t) = 2 + t + 2t^2 - t^3$.', correctValue: 2, explanation: 'Substitute $t = 0$. All terms with $t$ become 0. Result is 2.' },
    { type: 'multiStep', question: 'Check if $-2$ and $2$ are zeroes of $p(x) = x - 2$.\nStep 1: Find p(-2).\nStep 2: Find p(2).', options: ['Both are zeroes', 'Only -2 is a zero', 'Only 2 is a zero', 'Neither is a zero'], correct: 2, explanation: '$p(-2) = -2 - 2 = -4 \\neq 0$. $p(2) = 2 - 2 = 0$. So only 2 is a zero.' },
    { type: 'mcq', question: 'Zero of the zero polynomial is:', options: ['0', '1', 'Any real number', 'Not defined'], correct: 2, explanation: 'For $p(x) = 0$, substituting ANY real number $c$ gives $0$. So any real number is a zero.' },
];

const zeroesStaticAssessment = [
    { question: 'Find $p(-1)$ for $p(x) = x^3 - 3x^2 + 4x + 12$.', options: ['4', '-4', '12', '8'], correct: 0, explanation: '$p(-1) = (-1)^3 - 3(-1)^2 + 4(-1) + 12 = -1 - 3 - 4 + 12 = 4$.' },
    { question: 'If $p(x) = x^2 - 2\\sqrt{2}x + 1$, find $p(2\\sqrt{2})$.', options: ['1', '0', '8', '-1'], correct: 0, explanation: '$p(2\\sqrt{2}) = (2\\sqrt{2})^2 - 2\\sqrt{2}(2\\sqrt{2}) + 1 = 8 - 8 + 1 = 1$.' },
    { question: 'The zero of the polynomial $p(x) = cx + d$ ($c \\neq 0$) is:', options: ['$-d/c$', '$d/c$', '$-c/d$', '$c/d$'], correct: 0, explanation: '$cx + d = 0 \\implies cx = -d \\implies x = -d/c$.' },
    { question: 'If $2$ is a zero of $p(x) = x^2 - kx + 4$, find $k$.', options: ['2', '4', '8', '-4'], correct: 1, explanation: 'Since 2 is a zero, $p(2) = 0$. $2^2 - k(2) + 4 = 0 \\implies 4 - 2k + 4 = 0 \\implies 2k = 8 \\implies k = 4$.' },
];

export function buildZeroesPracticePool() {
    return [
        ...zeroesStaticPractice,
        ...Array.from({ length: 6 }, genEvaluatePoly),
        ...Array.from({ length: 5 }, genCheckZero),
        ...Array.from({ length: 6 }, genFindLinearZero),
    ];
}

export function buildZeroesAssessmentPool() {
    return [
        ...zeroesStaticAssessment,
        ...Array.from({ length: 6 }, genEvaluatePoly),
        ...Array.from({ length: 6 }, genCheckZero),
        ...Array.from({ length: 6 }, genFindLinearZero),
    ];
}

// ═══════════════════════════════════════════════════════════════════════════
// SKILL 3: FACTORISATION & FACTOR THEOREM
// ═══════════════════════════════════════════════════════════════════════════

function genFactorTheoremCheck() {
    const a = rand(1, 3);
    const r1 = rand(1, 5) * (Math.random() > 0.5 ? 1 : -1);
    const r2 = rand(1, 4) * (Math.random() > 0.5 ? 1 : -1);
    
    // Poly: a(x - r1)(x - r2) = ax^2 - a(r1+r2)x + a*r1*r2
    const b = -a * (r1 + r2);
    const c = a * r1 * r2;
    
    const isFactor = Math.random() > 0.5;
    const testA = isFactor ? r1 : r1 + (Math.random() > 0.5 ? 1 : -1);
    // test factor: (x - testA)
    const factorStr = testA < 0 ? `(x + ${-testA})` : `(x - ${testA})`;
    
    const pOfA = a * testA * testA + b * testA + c;
    
    return {
        type: 'truefalse',
        question: `By Factor Theorem, TRUE or FALSE: $${factorStr}$ is a factor of $p(x) = ${a===1?'':a}x^2 ${b>0?'+'+b:b}x ${c>0?'+'+c:c}$.`,
        options: ['True', 'False'],
        correct: isFactor ? 0 : 1,
        explanation: `By Factor Theorem, test $p(${testA})$. $p(${testA}) = ${a}(${testA})^2 + (${b})(${testA}) + (${c}) = ${pOfA}$. Since it is ${isFactor ? '= 0' : '\\neq 0'}, it is ${isFactor ? 'a factor' : 'NOT a factor'}.`,
    };
}

function genSplitMiddleTerm() {
    // (x + p)(x + q) = x^2 + (p+q)x + pq
    const p = rand(1, 7) * (Math.random() > 0.5 ? 1 : -1);
    const q = rand(1, 7) * (Math.random() > 0.5 ? 1 : -1);
    
    const b = p + q;
    const c = p * q;
    
    // Let's generate options
    let opts = [
        `$(x ${p>0?'+':''}${p})(x ${q>0?'+':''}${q})$`,
        `$(x ${-p>0?'+':''}${-p})(x ${-q>0?'+':''}${-q})$`, // Opposite signs
        `$(x ${p+2>0?'+':''}${p+2})(x ${q-2>0?'+':''}${q-2})$`,
        `$(x ${p-1>0?'+':''}${p-1})(x ${q>0?'+':''}${q})$`
    ];
    
    // Ensure uniqueness, if not unique, just fallback
    if (new Set(opts).size < 4) {
        opts = [ `$(x ${p>0?'+':''}${p})(x ${q>0?'+':''}${q})$`, `$(x - 9)(x + 2)$`, `$(x + 8)(x - 1)$`, `$(x + p)(x - q)$` ];
    }
    
    // Find correct index and shuffle
    const correctOpt = opts[0];
    opts = shuffle(opts, 4);
    const correctIdx = opts.indexOf(correctOpt);
    
    return {
        type: 'mcq',
        question: `Factorise the following by splitting the middle term: $x^2 ${b===0?'':b>0?'+'+b:b}x ${c>0?'+'+c:c}$`,
        options: opts,
        correct: correctIdx,
        explanation: `We need two numbers that add to $${b}$ and multiply to $${c}$. The numbers are $${p}$ and $${q}$. Thus, it factorises to $(x ${p>0?'+':''}${p})(x ${q>0?'+':''}${q})$.`,
    };
}

function genCommonFactor() {
    // ax^3 + bx^2 = x^2(ax + b)
    const factorNum = rand(2, 6);
    const varPower = rand(1, 2);
    const a = rand(1, 5) * (Math.random() > 0.5 ? 1 : -1);
    const b = rand(2, 9) * (Math.random() > 0.5 ? 1 : -1);
    
    const t1Num = factorNum * a;
    const t2Num = factorNum * b;
    
    return {
        type: 'mcq',
        question: `Factorise by taking out the greatest common factor: $${t1Num}x^${varPower+1} ${t2Num>0?'+'+t2Num:t2Num}x^${varPower}$`,
        options: [
            `$${factorNum}x^${varPower}(${a===1?'':a}x ${b>0?'+'+b:b})$`,
            `$${factorNum}(${a}x^${varPower+1} + ${b}x^${varPower})$`,
            `$x^${varPower}(${t1Num}x + ${t2Num})$`,
            `$${factorNum}x(${a}x^${varPower} + ${b}x^${varPower-1})$`
        ],
        correct: 0,
        explanation: `The greatest common number is $${factorNum}$. The greatest common variable power is $x^${varPower}$. Factoring out $${factorNum}x^${varPower}$ leaves $(${a===1?'':a}x ${b>0?'+'+b:b})$.`,
    };
}

const factorsStaticPractice = [
    { type: 'mcq', question: 'Determine if $(x+1)$ is a factor of $x^3+x^2+x+1$.', options: ['Yes', 'No', 'Cannot determine', 'Only if x > 0'], correct: 0, explanation: 'Test $p(-1): (-1)^3+(-1)^2+(-1)+1 = -1+1-1+1 = 0$. Since remainder is 0, YES it is a factor.' },
    { type: 'truefalse', question: 'TRUE or FALSE: To check if $(x - a)$ is a factor of $p(x)$, you calculate $p(a)$ and see if it equals 0.', options: ['True', 'False'], correct: 0, explanation: 'TRUE. This is the exact definition of the Factor Theorem.' },
    { type: 'multiStep', question: 'Find $k$ if $(x-1)$ is a factor of $4x^3+3x^2-4x+k$.\nStep 1: Set p(1) = 0.\nStep 2: Solve for k.', options: ['k = -3', 'k = 3', 'k = 1', 'k = -1'], correct: 0, explanation: '$p(1) = 4(1)^3 + 3(1)^2 - 4(1) + k = 0 \\implies 4 + 3 - 4 + k = 0 \\implies 3 + k = 0 \\implies k = -3$.' },
];

const factorsStaticAssessment = [
    { question: 'Factorise $y^2 - 5y + 6$.', options: ['$(y-2)(y-3)$', '$(y+2)(y+3)$', '$(y-1)(y-6)$', '$(y-2)(y+3)$'], correct: 0, explanation: 'Need numbers multiplying to 6 and adding to -5. They are -2, -3. So $(y-2)(y-3)$.' },
    { question: 'Factorise $2x^2 + 7x + 3$', options: ['$(2x+1)(x+3)$', '$(2x+3)(x+1)$', '$(x+3)(x+1)$', '$(2x+1)(2x+3)$'], correct: 0, explanation: 'Multiply to $2 \\times 3 = 6$, add to $7$. Numbers are $6, 1$. $2x^2+6x+x+3 = 2x(x+3)+1(x+3) = (2x+1)(x+3)$.' },
    { question: 'If $(x-a)$ is a factor of $x^3 - ax^2 + 2x + a - 1$, then $a$ is:', options: ['1', '-1', '0', '2'], correct: 0, explanation: '$p(a) = a^3 - a(a^2) + 2a + a - 1 = 0 \\implies a^3 - a^3 + 3a - 1 = 0 \\implies 3a = 1 \\implies a = 1/3$. Wait, static question options mismatch? Let\'s fix $x^3 - ax^2 + x + 2$. If $a=1$: $1-1+1+2=3\\neq 0$. Let\'s use $p(x) = x^2 - ax + 2$. No, let\'s change question to: Find $k$ if $(x-2)$ is factor of $x^2 - kx + 4$. Options: 1, 2, 4, -4. Correct: 4.' },
];
// Fixing the flawed Assessment static question 2:
factorsStaticAssessment[2] = { question: 'Find $k$ if $(x-2)$ is a factor of $x^2 + kx - 6$.', options: ['1', '-1', '3', '-3'], correct: 0, explanation: '$p(2) = 2^2 + 2k - 6 = 0 \\implies 4 + 2k - 6 = 0 \\implies 2k = 2 \\implies k = 1$.' };


export function buildFactorisationPracticePool() {
    return [
        ...factorsStaticPractice,
        ...Array.from({ length: 6 }, genFactorTheoremCheck),
        ...Array.from({ length: 8 }, genSplitMiddleTerm),
        ...Array.from({ length: 6 }, genCommonFactor),
    ];
}

export function buildFactorisationAssessmentPool() {
    return [
        ...factorsStaticAssessment,
        ...Array.from({ length: 6 }, genFactorTheoremCheck),
        ...Array.from({ length: 8 }, genSplitMiddleTerm),
        ...Array.from({ length: 6 }, genCommonFactor),
    ];
}

// ═══════════════════════════════════════════════════════════════════════════
// SKILL 4: ALGEBRAIC IDENTITIES
// ═══════════════════════════════════════════════════════════════════════════

function genSquareSum() {
    const a = rand(2, 5);
    const b = rand(2, 5);
    const v1 = 'x';
    const v2 = 'y';
    
    const b1 = `${a*a}`;
    const b2 = `${2*a*b}`;
    const b3 = `${b*b}`;
    
    return {
        type: 'mcq',
        question: `Expand using identity $(x+y)^2$: $(${a}${v1} + ${b}${v2})^2$`,
        options: [
            `$${b1}${v1}^2 + ${b2}${v1}${v2} + ${b3}${v2}^2$`,
            `$${b1}${v1}^2 + ${b3}${v2}^2$`,
            `$${b1}${v1}^2 - ${b2}${v1}${v2} + ${b3}${v2}^2$`,
            `$${a}${v1}^2 + ${2*a*b}${v1}${v2} + ${b}${v2}^2$`
        ],
        correct: 0,
        explanation: `$(A+B)^2 = A^2 + 2AB + B^2$.\nHere $A = ${a}${v1}$ and $B = ${b}${v2}$.\n$= (${a}${v1})^2 + 2(${a}${v1})(${b}${v2}) + (${b}${v2})^2 = ${b1}${v1}^2 + ${b2}${v1}${v2} + ${b3}${v2}^2$.`,
    };
}

function genDiffSquares() {
    const a = rand(2, 6);
    const b = rand(2, 6);
    if(a===b) return genDiffSquares(); // Prevent duplicate simple expressions
    
    // a^2 x^2 - b^2 y^2
    const a2 = a * a;
    const b2 = b * b;
    
    return {
        type: 'mcq',
        question: `Factorise using difference of squares: $${a2}x^2 - ${b2}y^2$`,
        options: [
            `$(${a}x - ${b}y)(${a}x + ${b}y)$`,
            `$(${a2}x - ${b2}y)(${a2}x + ${b2}y)$`,
            `$(${a}x - ${b}y)^2$`,
            `$(${a}x + ${b}y)^2$`
        ],
        correct: 0,
        explanation: `$A^2 - B^2 = (A-B)(A+B)$. Here $A = ${a}x$ and $B = ${b}y$. Thus $(${a}x - ${b}y)(${a}x + ${b}y)$.`,
    };
}

function genEvaluateIdentity() {
    const base = rand(9, 11) * 10; // 90, 100, 110
    const offset = rand(1, 4);     // 1 to 4
    
    const isAdd = Math.random() > 0.5;
    const num = isAdd ? base + offset : base - offset;
    
    return {
        type: 'fill',
        question: `Evaluate WITHOUT direct multiplication, using identities: $${num}^2$`,
        correctValue: num * num,
        explanation: `$${num}^2 = (${base} ${isAdd ? '+' : '-'} ${offset})^2 = ${base}^2 ${isAdd ? '+' : '-'} 2(${base})(${offset}) + ${offset}^2 = ${base*base} ${isAdd ? '+' : '-'} ${2*base*offset} + ${offset*offset} = ${num*num}$.`,
    };
}

const identitiesStaticPractice = [
    { type: 'mcq', question: 'Which identity is $x^2 - y^2$?', options: ['$(x-y)(x+y)$', '$(x-y)^2$', '$(x+y)^2$', '$(x-y)(x^2+xy+y^2)$'], correct: 0, explanation: 'This is the Difference of Squares identity.' },
    { type: 'mcq', question: 'Expand $(x+3)(x+4)$ using $(x+a)(x+b) = x^2 + (a+b)x + ab$.', options: ['$x^2 + 7x + 12$', '$x^2 + 1x + 12$', '$x^2 + 7x + 7$', '$x^2 + 12x + 7$'], correct: 0, explanation: '$(x+3)(x+4) = x^2 + (3+4)x + (3)(4) = x^2 + 7x + 12$.' },
    { type: 'fill', question: 'Evaluate $105 \\times 95$ using identities.', correctValue: 9975, explanation: '$(100+5)(100-5) = 100^2 - 5^2 = 10000 - 25 = 9975$.' },
    { type: 'truefalse', question: 'TRUE or FALSE: $(x+y)^3 = x^3 + y^3$.', options: ['True', 'False'], correct: 1, explanation: 'FALSE. $(x+y)^3 = x^3 + y^3 + 3xy(x+y)$. Do not forget the middle terms!' },
    { type: 'mcq', question: 'Factorise $x^3 - 8$ using sum/diff of cubes.', options: ['$(x-2)(x^2+2x+4)$', '$(x-2)(x^2-2x+4)$', '$(x+2)(x^2-2x+4)$', '$(x-2)^3$'], correct: 0, explanation: '$x^3 - 2^3 = (x-2)(x^2 + x(2) + 2^2) = (x-2)(x^2+2x+4)$.' },
];

const identitiesStaticAssessment = [
    { question: 'Expand $(2x - y)^2$.', options: ['$4x^2 - 4xy + y^2$', '$4x^2 + 4xy + y^2$', '$4x^2 - y^2$', '$2x^2 - 2xy + y^2$'], correct: 0, explanation: '$(2x)^2 - 2(2x)(y) + y^2 = 4x^2 - 4xy + y^2$.' },
    { question: 'Evaluate $99^2$ using an identity.', options: ['9801', '9901', '9999', '9899'], correct: 0, explanation: '$(100-1)^2 = 10000 - 200 + 1 = 9801$.' },
    { question: 'Factorise $25a^2 - 9b^2$.', options: ['$(5a-3b)(5a+3b)$', '$(25a-9b)(25a+9b)$', '$(5a-3b)^2$', '$(5a+3b)^2$'], correct: 0, explanation: '$(5a)^2 - (3b)^2 = (5a-3b)(5a+3b)$.' },
    { question: 'Expand $(x+8)(x-10)$.', options: ['$x^2 - 2x - 80$', '$x^2 + 2x - 80$', '$x^2 - 18x - 80$', '$x^2 + 18x - 80$'], correct: 0, explanation: '$x^2 + (8 - 10)x + (8)(-10) = x^2 - 2x - 80$.' },
];

export function buildIdentitiesPracticePool() {
    return [
        ...identitiesStaticPractice,
        ...Array.from({ length: 6 }, genSquareSum),
        ...Array.from({ length: 6 }, genDiffSquares),
        ...Array.from({ length: 6 }, genEvaluateIdentity),
    ];
}

export function buildIdentitiesAssessmentPool() {
    return [
        ...identitiesStaticAssessment,
        ...Array.from({ length: 6 }, genSquareSum),
        ...Array.from({ length: 6 }, genDiffSquares),
        ...Array.from({ length: 6 }, genEvaluateIdentity),
    ];
}

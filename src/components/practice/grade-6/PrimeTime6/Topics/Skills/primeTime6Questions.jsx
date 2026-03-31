import React from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   DYNAMIC QUESTION GENERATORS  — Prime Time (Grade 6)
   Every call generates 20 unique, non-repeating, randomised questions.
   ═══════════════════════════════════════════════════════════════════════ */

// ── Utility helpers ──────────────────────────────────────────────────
const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

const getFactors = (n) => {
    const res = [];
    for (let i = 1; i <= n; i++) if (n % i === 0) res.push(i);
    return res;
};

const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
    return true;
};

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);

const primeFactorization = (n) => {
    const factors = {};
    let d = 2;
    while (d * d <= n) {
        while (n % d === 0) { factors[d] = (factors[d] || 0) + 1; n /= d; }
        d++;
    }
    if (n > 1) factors[n] = (factors[n] || 0) + 1;
    return factors;
};

const formatPF = (pf) => {
    const expr = Object.entries(pf)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([p, e]) => e > 1 ? `${p}^{${e}}` : `${p}`)
        .join(' \\times ');
    return `$${expr}$`;
};

// ── Number line jump SVG for multiples ──────────────────────────────
const jumpSVG = (base, steps) => {
    const vals = Array.from({ length: steps + 1 }, (_, i) => i * base);
    const w = 40 + steps * 50;
    return `<svg viewBox="0 0 ${w} 80" width="100%" height="80" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="55" x2="${w - 20}" y2="55" stroke="#7c3aed" stroke-width="2.5"/>
        ${vals.map((v, i) => `<circle cx="${20 + i * 50}" cy="55" r="4" fill="#7c3aed"/>
        <text x="${20 + i * 50}" y="75" font-family="sans-serif" font-size="12" fill="#7c3aed" text-anchor="middle" font-weight="bold">${v}</text>`).join('')}
        ${Array.from({ length: steps }, (_, i) => `<path d="M ${20 + i * 50} 55 Q ${45 + i * 50} 25 ${70 + i * 50} 55" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="4 2"/>`).join('')}
        <text x="${20 + 2 * 50}" y="15" font-family="sans-serif" font-weight="bold" font-size="11" fill="#059669">🐸 Jumping by ${base}</text>
    </svg>`;
};

// ── Factor tree SVG ────────────────────────────────────────────────
const factorTreeSVG = (n) => {
    const pf = primeFactorization(n);
    const primes = [];
    Object.entries(pf).forEach(([p, e]) => { for (let i = 0; i < e; i++) primes.push(Number(p)); });
    const w = Math.max(200, primes.length * 50 + 60);
    return `<svg viewBox="0 0 ${w} 100" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
        <text x="${w / 2}" y="20" font-family="sans-serif" font-weight="bold" font-size="18" fill="#2563eb" text-anchor="middle">${n}</text>
        ${primes.map((p, i) => {
        const x = 30 + i * 45;
        return `<line x1="${w / 2}" y1="25" x2="${x}" y2="55" stroke="#3b82f6" stroke-width="1.5"/>
            <circle cx="${x}" cy="65" r="14" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
            <text x="${x}" y="70" font-family="sans-serif" font-weight="bold" font-size="13" fill="#1e40af" text-anchor="middle">${p}</text>`;
    }).join('')}
        <text x="${w / 2}" y="98" font-family="sans-serif" font-weight="bold" font-size="11" fill="#64748b" text-anchor="middle">${n} = ${primes.join(' × ')}</text>
    </svg>`;
};

// ═══════════════════════════════════════════════════
// SKILL 1 — Factors & Multiples
// ═══════════════════════════════════════════════════
export function generateFactorsMultiplesQuestions() {
    const questions = [];
    const used = new Set();

    // Type A: List all factors (5 questions)
    while (questions.length < 5) {
        const n = randInt(10, 80);
        if (used.has(`fa-${n}`)) continue;
        used.add(`fa-${n}`);
        const factors = getFactors(n);
        const correct = factors.join(', ');
        const wrongs = [
            factors.filter((_, i) => i !== factors.length - 2).join(', '),
            [...factors, n + 1].join(', '),
            factors.slice(1).join(', ')
        ];
        const options = shuffle([correct, ...wrongs]);
        questions.push({
            question: `List ALL factors of ${n}.`,
            options,
            correct: options.indexOf(correct),
            explanation: `The factors of ${n} are numbers that divide ${n} exactly: ${correct}.`
        });
    }

    // Type B: Is X a factor of Y? (4 questions)
    while (questions.length < 9) {
        const y = randInt(12, 100);
        const x = randInt(2, 12);
        const key = `fb-${x}-${y}`;
        if (used.has(key)) continue;
        used.add(key);
        const isFactor = y % x === 0;
        questions.push({
            question: `Is ${x} a factor of ${y}?`,
            options: ['Yes', 'No'],
            correct: isFactor ? 0 : 1,
            explanation: isFactor ? `${y} ÷ ${x} = ${y / x} with no remainder, so yes!` : `${y} ÷ ${x} leaves a remainder, so ${x} is NOT a factor of ${y}.`
        });
    }

    // Type C: Multiples on number line with jump visual (5 questions)
    while (questions.length < 14) {
        const base = randInt(2, 9);
        const pos = randInt(3, 8);
        const key = `mc-${base}-${pos}`;
        if (used.has(key)) continue;
        used.add(key);
        const answer = base * pos;
        const wrongs = shuffle([answer + base, answer - 1, answer + randInt(1, 5)]).slice(0, 3);
        const options = shuffle([String(answer), ...wrongs.map(String)]);
        questions.push({
            question: `A frog 🐸 starts at 0 and jumps ${base} steps at a time. What number will it land on at jump #${pos}?`,
            options,
            correct: options.indexOf(String(answer)),
            explanation: `${base} × ${pos} = ${answer}. The frog lands on ${answer}!`,
            svg: jumpSVG(base, Math.min(pos, 6))
        });
    }

    // Type D: Common multiples (3 questions)
    while (questions.length < 17) {
        const a = randInt(2, 6);
        let b = randInt(3, 8);
        while (b === a) b = randInt(3, 8);
        const key = `cm-${a}-${b}`;
        if (used.has(key)) continue;
        used.add(key);
        const lcmVal = lcm(a, b);
        const options = shuffle([String(lcmVal), String(a * b), String(lcmVal + a), String(Math.max(a, b))]);
        questions.push({
            question: `What is the smallest number that is a common multiple of both ${a} and ${b}?`,
            options,
            correct: options.indexOf(String(lcmVal)),
            explanation: `The LCM of ${a} and ${b} is ${lcmVal}. This is the smallest number in both lists of multiples.`
        });
    }

    // Type E: Factor count (3 questions)
    while (questions.length < 20) {
        const n = randInt(12, 60);
        const key = `fc-${n}`;
        if (used.has(key)) continue;
        used.add(key);
        const count = getFactors(n).length;
        const wrongs = shuffle([count + 1, count - 1, count + 2]).slice(0, 3);
        const options = shuffle([String(count), ...wrongs.map(String)]);
        questions.push({
            question: `How many factors does ${n} have?`,
            options,
            correct: options.indexOf(String(count)),
            explanation: `Factors of ${n}: ${getFactors(n).join(', ')} → Total = ${count}.`
        });
    }

    return shuffle(questions);
}

// ═══════════════════════════════════════════════════
// SKILL 2 — Prime vs Composite
// ═══════════════════════════════════════════════════
export function generatePrimeCompositeQuestions() {
    const questions = [];
    const used = new Set();

    // Type A: Is this prime or composite? (6 questions)
    while (questions.length < 6) {
        const n = randInt(4, 97);
        if (used.has(`pc-${n}`) || n === 1) continue;
        used.add(`pc-${n}`);
        const prime = isPrime(n);
        questions.push({
            question: `Is ${n} a Prime number or a Composite number?`,
            options: ['Prime', 'Composite'],
            correct: prime ? 0 : 1,
            explanation: prime
                ? `${n} has exactly two factors (1 and ${n}), so it is Prime.`
                : `${n} has more than two factors: ${getFactors(n).join(', ')}. So it is Composite.`
        });
    }

    // Type B: Which is prime in the list? (4 questions)
    while (questions.length < 10) {
        const primeNum = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47][randInt(0, 14)];
        const composites = [];
        while (composites.length < 3) {
            const c = randInt(4, 50);
            if (!isPrime(c) && !composites.includes(c) && c !== primeNum) composites.push(c);
        }
        const key = `pb-${primeNum}`;
        if (used.has(key)) continue;
        used.add(key);
        const options = shuffle([String(primeNum), ...composites.map(String)]);
        questions.push({
            question: `Which of the following is a PRIME number?`,
            options,
            correct: options.indexOf(String(primeNum)),
            explanation: `${primeNum} is prime because its only factors are 1 and ${primeNum}.`
        });
    }

    // Type C: Sieve question (3 questions)
    while (questions.length < 13) {
        const limit = randInt(20, 50);
        const key = `sv-${limit}`;
        if (used.has(key)) continue;
        used.add(key);
        const primesBelow = [];
        for (let i = 2; i <= limit; i++) if (isPrime(i)) primesBelow.push(i);
        const count = primesBelow.length;
        const wrongs = shuffle([count + 2, count - 1, count + 4]).slice(0, 3);
        const options = shuffle([String(count), ...wrongs.map(String)]);
        questions.push({
            question: `Using the Sieve of Eratosthenes, how many prime numbers are there from 1 to ${limit}?`,
            options,
            correct: options.indexOf(String(count)),
            explanation: `The primes up to ${limit} are: ${primesBelow.join(', ')}. Total count = ${count}.`
        });
    }

    // Type D: Special property questions (4 questions)
    const specials = [
        { q: 'What is the smallest prime number?', a: '2', w: ['1', '3', '0'], e: '2 is the smallest (and only even) prime number. 1 is NOT prime.' },
        { q: 'Which is the only even prime number?', a: '2', w: ['4', '6', '8'], e: '2 is the only even prime. All other even numbers are divisible by 2.' },
        { q: 'Is 1 a prime number?', a: 'No', w: ['Yes'], e: '1 has only one factor (itself), but primes need exactly TWO factors.' },
        { q: 'How many prime numbers are even?', a: '1', w: ['0', '2', 'Infinite'], e: 'Only 2 is even and prime. Every other even number has 2 as a factor.' }
    ];
    shuffle(specials).slice(0, 4).forEach(s => {
        const options = shuffle([s.a, ...s.w]);
        questions.push({
            question: s.q,
            options,
            correct: options.indexOf(s.a),
            explanation: s.e
        });
    });

    // Type E: Co-prime identification (3 questions)
    while (questions.length < 20) {
        const a = randInt(3, 20);
        let b = randInt(3, 20);
        while (b === a) b = randInt(3, 20);
        const key = `cp-${Math.min(a, b)}-${Math.max(a, b)}`;
        if (used.has(key)) continue;
        used.add(key);
        const areCoprime = gcd(a, b) === 1;
        questions.push({
            question: `Are ${a} and ${b} co-prime numbers?`,
            options: ['Yes — HCF is 1', 'No — HCF is greater than 1'],
            correct: areCoprime ? 0 : 1,
            explanation: areCoprime
                ? `HCF(${a}, ${b}) = 1, so they are co-prime!`
                : `HCF(${a}, ${b}) = ${gcd(a, b)}, which is greater than 1. Not co-prime.`
        });
    }

    return shuffle(questions).slice(0, 20);
}

// ═══════════════════════════════════════════════════
// SKILL 3 — Divisibility Rules
// ═══════════════════════════════════════════════════
export function generateDivisibilityQuestions() {
    const questions = [];
    const used = new Set();

    const divisors = [2, 3, 5, 9, 10];

    // Type A: Is N divisible by D? (8 questions)
    while (questions.length < 8) {
        const d = divisors[randInt(0, divisors.length - 1)];
        const n = randInt(100, 9999);
        const key = `da-${n}-${d}`;
        if (used.has(key)) continue;
        used.add(key);
        const isDivisible = n % d === 0;
        let ruleExplain = '';
        if (d === 2) ruleExplain = `Last digit is ${n % 10}, which is ${n % 2 === 0 ? 'even' : 'odd'}.`;
        else if (d === 3) { const s = String(n).split('').reduce((a, c) => a + Number(c), 0); ruleExplain = `Sum of digits = ${s}, which is ${s % 3 === 0 ? '' : 'NOT '}divisible by 3.`; }
        else if (d === 5) ruleExplain = `Last digit is ${n % 10}, which is ${[0, 5].includes(n % 10) ? '0 or 5' : 'not 0 or 5'}.`;
        else if (d === 9) { const s = String(n).split('').reduce((a, c) => a + Number(c), 0); ruleExplain = `Sum of digits = ${s}, which is ${s % 9 === 0 ? '' : 'NOT '}divisible by 9.`; }
        else if (d === 10) ruleExplain = `Last digit is ${n % 10}, which is ${n % 10 === 0 ? '0' : 'not 0'}.`;
        questions.push({
            question: `Is ${n.toLocaleString()} divisible by ${d}?`,
            options: ['Yes', 'No'],
            correct: isDivisible ? 0 : 1,
            explanation: `${ruleExplain} So ${n.toLocaleString()} is ${isDivisible ? '' : 'NOT '}divisible by ${d}.`
        });
    }

    // Type B: Which rule applies? (4 questions)
    while (questions.length < 12) {
        const n = randInt(100, 9999);
        const key = `db-${n}`;
        if (used.has(key)) continue;
        used.add(key);
        const divisibleBy = divisors.filter(d => n % d === 0);
        if (divisibleBy.length === 0) continue;
        const target = divisibleBy[randInt(0, divisibleBy.length - 1)];
        const wrongs = divisors.filter(d => n % d !== 0).slice(0, 3);
        if (wrongs.length < 3) continue;
        const options = shuffle([String(target), ...wrongs.map(String)]);
        questions.push({
            question: `${n.toLocaleString()} is divisible by which of the following?`,
            options,
            correct: options.indexOf(String(target)),
            explanation: `${n.toLocaleString()} ÷ ${target} = ${n / target}. It divides exactly!`
        });
    }

    // Type C: Sum of digits (4 questions)
    while (questions.length < 16) {
        const n = randInt(100, 9999);
        const key = `dc-${n}`;
        if (used.has(key)) continue;
        used.add(key);
        const digitSum = String(n).split('').reduce((a, c) => a + Number(c), 0);
        const wrongs = shuffle([digitSum + 1, digitSum - 1, digitSum + 3]).slice(0, 3);
        const options = shuffle([String(digitSum), ...wrongs.map(String)]);
        questions.push({
            question: `What is the sum of the digits of ${n.toLocaleString()}? (Used to test divisibility by 3 or 9)`,
            options,
            correct: options.indexOf(String(digitSum)),
            explanation: `${String(n).split('').join(' + ')} = ${digitSum}.`
        });
    }

    // Type D: Find the missing digit (4 questions)
    while (questions.length < 20) {
        const d = [3, 9][randInt(0, 1)];
        const base = randInt(10, 99);
        const digits = String(base).split('').map(Number);
        const currentSum = digits.reduce((a, b) => a + b, 0);
        const needed = d - (currentSum % d);
        const missing = needed === d ? 0 : needed;
        if (missing > 9) continue;
        const key = `dd-${base}-${d}`;
        if (used.has(key)) continue;
        used.add(key);
        const wrongs = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(x => x !== missing)).slice(0, 3);
        const options = shuffle([String(missing), ...wrongs.map(String)]);
        questions.push({
            question: `What digit should replace ▢ in ${base}▢ to make it divisible by ${d}?`,
            options,
            correct: options.indexOf(String(missing)),
            explanation: `Current digit sum = ${currentSum}. Adding ${missing} makes it ${currentSum + missing}, which is divisible by ${d}.`
        });
    }

    return shuffle(questions).slice(0, 20);
}

// ═══════════════════════════════════════════════════
// SKILL 4 — Prime Factorization
// ═══════════════════════════════════════════════════
export function generatePrimeFactorizationQuestions() {
    const questions = [];
    const used = new Set();

    // Type A: Find prime factorization with factor tree visual (7 questions)
    while (questions.length < 7) {
        const n = randInt(12, 120);
        if (isPrime(n) || used.has(`pf-${n}`)) continue;
        used.add(`pf-${n}`);
        const pf = primeFactorization(n);
        const correct = formatPF(pf);
        // Generate plausible wrongs
        const wrongs = [];
        const entries = Object.entries(pf);
        if (entries.length > 0) {
            const mod1 = { ...pf };
            const firstKey = entries[0][0];
            mod1[firstKey] = (mod1[firstKey] || 1) + 1;
            wrongs.push(formatPF(mod1));
        }
        wrongs.push(`${n / 2} × 2`);
        wrongs.push(getFactors(n).filter(f => f !== 1 && f !== n).slice(0, 2).join(' × ') || `${n}`);
        const options = shuffle([correct, ...wrongs.slice(0, 3)]).slice(0, 4);
        if (!options.includes(correct)) options[0] = correct;
        questions.push({
            type: 'factor-tree',
            number: n,
            question: `Find the prime factorization of ${n} using a factor tree.`,
            correctAnswer: formatPF(pf),
            explanation: `${n} = ${formatPF(pf)}. Each factor is a prime number.`
        });
        // No need to fix index for interactive question
    }

    // Type B: Express as product of primes (text-based) (5 questions)
    while (questions.length < 12) {
        const n = randInt(8, 80);
        if (isPrime(n) || used.has(`pfb-${n}`)) continue;
        used.add(`pfb-${n}`);
        const pf = primeFactorization(n);
        const primesList = [];
        Object.entries(pf).forEach(([p, e]) => { for (let i = 0; i < e; i++) primesList.push(Number(p)); });
        const correct = primesList.join(' × ');
        const wr1 = [...primesList]; wr1[0] = wr1[0] + 1;
        const wr2 = [...primesList]; wr2.pop();
        const wr3 = [...primesList, primesList[0]];
        const options = shuffle([correct, wr1.join(' × '), wr2.join(' × ') || String(n), wr3.join(' × ')]);
        questions.push({
            question: `Express ${n} as a product of its prime factors.`,
            options,
            correct: options.indexOf(correct),
            explanation: `${n} = ${correct}.`
        });
    }

    // Type C: How many times does P appear? (4 questions)
    while (questions.length < 16) {
        const n = randInt(12, 100);
        if (isPrime(n) || used.has(`pfc-${n}`)) continue;
        used.add(`pfc-${n}`);
        const pf = primeFactorization(n);
        const primeKeys = Object.keys(pf).map(Number);
        const target = primeKeys[randInt(0, primeKeys.length - 1)];
        const count = pf[target];
        const wrongs = shuffle([0, 1, 2, 3, 4].filter(x => x !== count)).slice(0, 3);
        const options = shuffle([String(count), ...wrongs.map(String)]);
        questions.push({
            question: `In the prime factorization of ${n}, how many times does ${target} appear?`,
            options,
            correct: options.indexOf(String(count)),
            explanation: `${n} = ${formatPF(pf)}. The prime ${target} appears ${count} time(s).`
        });
    }

    // Type D: Identify the factor tree (4 questions)
    while (questions.length < 20) {
        const n = randInt(18, 72);
        if (isPrime(n) || used.has(`pfd-${n}`)) continue;
        used.add(`pfd-${n}`);
        const pf = primeFactorization(n);
        const correct = formatPF(pf);
        const options = shuffle([correct, formatPF(primeFactorization(n + 2)), formatPF(primeFactorization(n - 2 > 1 ? n - 2 : n + 4)), `${n}`]);
        questions.push({
            question: `The factor tree below represents which prime factorization?`,
            options,
            correct: options.indexOf(correct),
            explanation: `The tree shows ${n} = ${correct}.`,
            svg: factorTreeSVG(n)
        });
    }

    return shuffle(questions).slice(0, 20);
}

// ═══════════════════════════════════════════════════
// SKILL 5 — HCF & LCM
// ═══════════════════════════════════════════════════
export function generateHCFLCMQuestions() {
    const questions = [];
    const used = new Set();

    // Type A: Find HCF (5 questions)
    while (questions.length < 5) {
        const a = randInt(6, 48);
        const b = randInt(6, 48);
        if (a === b) continue;
        const key = `ha-${Math.min(a, b)}-${Math.max(a, b)}`;
        if (used.has(key)) continue;
        used.add(key);
        const hcf = gcd(a, b);
        const wrongs = shuffle([hcf + 1, hcf * 2, Math.min(a, b), 1].filter(x => x !== hcf)).slice(0, 3);
        const options = shuffle([String(hcf), ...wrongs.map(String)]);
        questions.push({
            type: 'division-table',
            mode: 'HCF',
            numbers: [a, b],
            question: `Find the HCF (Highest Common Factor) of ${a} and ${b} using the division method.`,
            correctAnswer: String(hcf),
            explanation: `Factors of ${a}: ${getFactors(a).join(', ')}. Factors of ${b}: ${getFactors(b).join(', ')}. HCF = ${hcf}.`
        });
    }

    // Type B: Find LCM (5 questions)
    while (questions.length < 10) {
        const a = randInt(2, 15);
        const b = randInt(2, 15);
        if (a === b) continue;
        const key = `lb-${Math.min(a, b)}-${Math.max(a, b)}`;
        if (used.has(key)) continue;
        used.add(key);
        const lcmVal = lcm(a, b);
        const wrongs = shuffle([a * b, lcmVal + a, lcmVal - b, gcd(a, b)].filter(x => x !== lcmVal && x > 0)).slice(0, 3);
        const options = shuffle([String(lcmVal), ...wrongs.map(String)]);
        questions.push({
            type: 'division-table',
            mode: 'LCM',
            numbers: [a, b],
            question: `Find the LCM (Lowest Common Multiple) of ${a} and ${b} using the division method.`,
            correctAnswer: String(lcmVal),
            explanation: `LCM(${a}, ${b}) = ${lcmVal}. This is the smallest positive number divisible by both.`
        });
    }

    // Type C: Word problems with HCF (3 questions)
    while (questions.length < 13) {
        const a = randInt(12, 48);
        const b = randInt(12, 48);
        if (a === b) continue;
        const key = `hc-${Math.min(a, b)}-${Math.max(a, b)}`;
        if (used.has(key)) continue;
        used.add(key);
        const hcf = gcd(a, b);
        if (hcf < 2) continue;
        const wrongs = shuffle([hcf + 2, hcf - 1, Math.min(a, b)].filter(x => x !== hcf && x > 0)).slice(0, 3);
        const options = shuffle([String(hcf), ...wrongs.map(String)]);
        questions.push({
            question: `A farmer has ${a} apples and ${b} oranges. He wants to make the BIGGEST possible equal groups with no fruit left over. How many items in each group?`,
            options,
            correct: options.indexOf(String(hcf)),
            explanation: `HCF(${a}, ${b}) = ${hcf}. Each group will have ${hcf} fruits.`
        });
    }

    // Type D: Word problems with LCM (4 questions)
    while (questions.length < 17) {
        const a = randInt(2, 12);
        const b = randInt(3, 12);
        if (a === b) continue;
        const key = `ld-${Math.min(a, b)}-${Math.max(a, b)}`;
        if (used.has(key)) continue;
        used.add(key);
        const lcmVal = lcm(a, b);
        const wrongs = shuffle([a * b, lcmVal + a, gcd(a, b), lcmVal + b].filter(x => x !== lcmVal)).slice(0, 3);
        const options = shuffle([String(lcmVal), ...wrongs.map(String)]);
        questions.push({
            question: `Two bells ring every ${a} and ${b} minutes. If they ring together now, after how many minutes will they ring together again?`,
            options,
            correct: options.indexOf(String(lcmVal)),
            explanation: `LCM(${a}, ${b}) = ${lcmVal} minutes. They'll ring together after ${lcmVal} minutes.`
        });
    }

    // Type E: HCF × LCM = product (3 questions)
    while (questions.length < 20) {
        const a = randInt(4, 20);
        const b = randInt(4, 20);
        if (a === b) continue;
        const key = `hl-${Math.min(a, b)}-${Math.max(a, b)}`;
        if (used.has(key)) continue;
        used.add(key);
        const hcf = gcd(a, b);
        const lcmVal = lcm(a, b);
        const product = a * b;
        const check = hcf * lcmVal;
        questions.push({
            question: `HCF(${a}, ${b}) = ${hcf} and LCM(${a}, ${b}) = ${lcmVal}. What is HCF × LCM?`,
            options: shuffle([String(check), String(check + hcf), String(check - lcmVal > 0 ? check - lcmVal : check + 5), String(product + 1)]),
            correct: 0, // Will fix below
            explanation: `HCF × LCM = ${hcf} × ${lcmVal} = ${check}. This always equals ${a} × ${b} = ${product}.`
        });
        const opts = questions[questions.length - 1].options;
        questions[questions.length - 1].correct = opts.indexOf(String(check));
    }

    return shuffle(questions).slice(0, 20);
}

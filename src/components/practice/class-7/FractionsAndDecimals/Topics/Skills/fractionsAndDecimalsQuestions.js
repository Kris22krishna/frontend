// FractionsAndDecimalsSkills — Dynamic Question Generators

const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const NZ = (min, max) => { let n = 0; while (n === 0) n = R(min, max); return n; };

function makeQ(question, correctVal, distractors, explanation) {
    const opts = [String(correctVal)];
    for (const d of distractors) {
        const s = String(d);
        if (!opts.includes(s)) opts.push(s);
    }
    // Fill remaining if needed, though we usually provide 3 distractors
    while (opts.length < 4) {
        opts.push(String(Number(correctVal) + opts.length * 3 + 1));
    }
    const final = opts.slice(0, 4);
    const shuffled = [...final].sort(() => Math.random() - 0.5);
    return { question, options: shuffled, correct: shuffled.indexOf(final[0]), explanation };
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

// ─── SKILL 1: TYPES OF FRACTIONS ──────────────────────────────────────────
export function generateTypesQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            const num = R(1, 9);
            const den = R(num + 1, 15);
            qs.push(makeQ(
                `Is $\\frac{${num}}{${den}}$ a proper or improper fraction?`,
                `Proper`, [`Improper`, `Mixed`, `Whole number`],
                `Because ${num} < ${den}, it is a proper fraction.`
            ));
        } else if (i < 6) {
            const num = R(6, 15);
            const den = R(2, num - 1);
            qs.push(makeQ(
                `Is $\\frac{${num}}{${den}}$ a proper or improper fraction?`,
                `Improper`, [`Proper`, `Mixed`, `Unit fraction`],
                `Because ${num} > ${den}, it is an improper fraction.`
            ));
        } else {
            const whole = R(1, 5);
            const num = R(1, 5);
            const den = R(num + 1, 9);
            qs.push(makeQ(
                `Convert $${whole}\\frac{${num}}{${den}}$ into an improper fraction.`,
                `$\\frac{${whole * den + num}}{${den}}$`,
                [`$\\frac{${whole * den}}{${den}}$`, `$\\frac{${whole + num}}{${den}}$`, `$\\frac{${whole * num + den}}{${den}}$`],
                `$(${whole} \\times ${den}) + ${num} = ${whole * den + num}$, so it is $\\frac{${whole * den + num}}{${den}}$.`
            ));
        }
    }
    return qs;
}

export function generateTypesAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            const num = R(11, 29);
            const den = R(2, 9);
            if (num % den === 0) {
                // Whole number
                qs.push(makeQ(
                    `Convert $\\frac{${num}}{${den}}$ to a mixed fraction.`,
                    `${num / den}`, [`$${num / den}\\frac{1}{${den}}$`, `$${(num / den) - 1}\\frac{${den}}{${den}}$`, `Improper`],
                    `$${num} \\div ${den} = ${num / den}$ exactly.`
                ));
            } else {
                const w = Math.floor(num / den);
                const rem = num % den;
                qs.push(makeQ(
                    `Convert $\\frac{${num}}{${den}}$ to a mixed fraction.`,
                    `$${w}\\frac{${rem}}{${den}}$`,
                    [`$${w}\\frac{${rem + 1}}{${den}}$`, `$${w + 1}\\frac{${rem}}{${den}}$`, `$${rem}\\frac{${w}}{${den}}$`],
                    `$${num} \\div ${den} = ${w}$ with remainder ${rem}.`
                ));
            }
        } else {
            const concepts = [
                makeQ('A fraction equivalent to $\\frac{1}{2}$ is:', '$\\frac{4}{8}$', ['$\\frac{1}{4}$', '$\\frac{3}{5}$', '$\\frac{2}{3}$'], '$\\frac{4}{8}$ simplifies to $\\frac{1}{2}$.'),
                makeQ('Which of these is a unit fraction?', '$\\frac{1}{7}$', ['$\\frac{7}{1}$', '$\\frac{2}{7}$', '$1\\frac{1}{7}$'], 'A unit fraction has 1 as the numerator.'),
                makeQ('Are $\\frac{2}{4}$ and $\\frac{3}{6}$ equivalent?', 'Yes', ['No', 'Only $\\frac{2}{4}$ is proper', 'They are improper'], 'Both simplify to $\\frac{1}{2}$.'),
                makeQ('If the numerator equals the denominator (e.g., $\\frac{5}{5}$), its value is:', '1', ['0', '5', 'Undefined'], 'Any non-zero number divided by itself is 1.'),
                makeQ('An improper fraction is always:', '$\\geq 1$', ['$< 1$', '$= 0$', 'Negative'], 'Since numerator $\\geq$ denominator, the value is at least 1.')
            ];
            qs.push(concepts[i - 5]);
        }
    }
    return qs;
}

// ─── SKILL 2: FRACTION ADD/SUB ─────────────────────────────────────────────
export function generateAddSubQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            // Like fractions
            const den = R(4, 12);
            const n1 = R(1, den - 1);
            const n2 = R(1, den - 1);
            const sum = n1 + n2;
            const g = gcd(sum, den);
            const ansNum = sum / g;
            const ansDen = den / g;
            const ansText = ansDen === 1 ? `${ansNum}` : `$\\frac{${ansNum}}{${ansDen}}$`;
            qs.push(makeQ(
                `Solve: $\\frac{${n1}}{${den}} + \\frac{${n2}}{${den}}$`,
                ansText,
                [`$\\frac{${n1 + n2}}{${den * 2}}$`, `$\\frac{${sum + 1}}{${den}}$`, `$\\frac{${Math.abs(n1 - n2)}}{${den}}$`],
                `Keep denominator ${den}, add top: ${n1}+${n2} = ${sum}. Simplify to ${ansText}.`
            ));
        } else {
            // Unlike fractions (simple)
            const d1 = R(2, 5);
            const d2 = R(2, 5);
            const n1 = 1;
            const n2 = 1;
            const ansNum = d2 + d1;
            const ansDen = d1 * d2;
            const g = gcd(ansNum, ansDen);
            qs.push(makeQ(
                `Solve: $\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}$`,
                `$\\frac{${ansNum / g}}{${ansDen / g}}$`,
                [`$\\frac{2}{${d1 + d2}}$`, `$\\frac{1}{${Math.abs(d1 - d2) || 1}}$`, `$\\frac{${ansNum + 1}}{${ansDen}}$`],
                `Common denominator is ${ansDen}. $\\frac{${d2}}{${ansDen}} + \\frac{${d1}}{${ansDen}} = \\frac{${ansNum}}{${ansDen}}$.`
            ));
        }
    }
    return qs;
}

export function generateAddSubAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            // Subtraction like
            const den = R(5, 15);
            const n1 = R(4, den + 5);
            const n2 = R(1, 3);
            const diff = n1 - n2;
            const g = gcd(Math.abs(diff), den);
            const ansNum = diff / g;
            const ansDen = den / g;
            const ansText = ansDen === 1 ? `${ansNum}` : `$\\frac{${ansNum}}{${ansDen}}$`;
            qs.push(makeQ(
                `Solve: $\\frac{${n1}}{${den}} - \\frac{${n2}}{${den}}$`,
                ansText,
                [`$\\frac{${n1 + n2}}{${den}}$`, `$\\frac{${diff}}{0}$`, `$\\frac{${diff + 1}}{${den}}$`],
                `Keep denominator ${den}, subtract top: ${n1}-${n2} = ${diff}. Simplify to ${ansText}.`
            ));
        } else {
            // Subtraction unlike
            const d1 = 2; // half
            const d2 = R(3, 8);
            const n1 = 1;
            const n2 = 1;
            const num = (d2 * n1) - (d1 * n2);
            const den = d1 * d2;
            const g = gcd(Math.abs(num), den);
            qs.push(makeQ(
                `Solve: $\\frac{${n1}}{${d1}} - \\frac{${n2}}{${d2}}$`,
                `$\\frac{${num / g}}{${den / g}}$`,
                [`$\\frac{0}{${Math.abs(d1 - d2)}}$`, `$\\frac{1}{${d1 + d2}}$`, `$\\frac{2}{${den}}$`],
                `Common denominator ${den}. $\\frac{${d2}}{${den}} - \\frac{${d1}}{${den}} = \\frac{${num}}{${den}}$.`
            ));
        }
    }
    return qs;
}

// ─── SKILL 3: FRACTION MULTIPLY/DIV ────────────────────────────────────────
export function generateMultiplyQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            // "of" questions
            const whole = R(2, 6) * R(2, 4);
            const den = [2, 3, 4, 5, 6][R(0, 4)];
            if (whole % den === 0) {
                const num = R(1, den - 1);
                qs.push(makeQ(
                    `Find $\\frac{${num}}{${den}}$ of ${whole}.`,
                    `${(whole / den) * num}`,
                    [`${(whole / den) * num + 1}`, `${whole * num}`, `${whole / den}`],
                    `'Of' means multiply. ${whole} / ${den} = ${whole / den}. Then $\\times ${num} = ${(whole / den) * num}$.`
                ));
            } else {
                qs.push(makeQ(
                    `Find $\\frac{1}{2}$ of ${whole * 2}.`,
                    `${whole}`, [`${whole * 2}`, `${whole + 1}`, `${whole - 1}`],
                    `$\\frac{1}{2} \\times ${whole * 2} = ${whole}$.`
                ));
            }
        } else {
            // Fraction x Fraction
            const n1 = R(1, 4), d1 = R(2, 5);
            const n2 = R(1, 4), d2 = R(2, 5);
            const g = gcd(n1 * n2, d1 * d2);
            qs.push(makeQ(
                `Multiply: $\\frac{${n1}}{${d1}} \\times \\frac{${n2}}{${d2}}$`,
                `$\\frac{${(n1 * n2) / g}}{${(d1 * d2) / g}}$`,
                [`$\\frac{${n1 + n2}}{${d1 + d2}}$`, `$\\frac{${n1 * d2}}{${d1 * n2}}$`, `$\\frac{${n1 * n2}}{${d1 + d2}}$`],
                `Top $\\times$ top = ${n1 * n2}. Bottom $\\times$ bottom = ${d1 * d2}. Simplify if needed.`
            ));
        }
    }
    return qs;
}

export function generateMultiplyAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            // Division
            const n1 = R(1, 5), d1 = R(2, 5);
            const n2 = R(1, 5), d2 = R(2, 5);
            const finalNum = n1 * d2;
            const finalDen = d1 * n2;
            const g = gcd(finalNum, finalDen);
            const aNum = finalNum / g;
            const aDen = finalDen / g;
            const ansText = aDen === 1 ? `${aNum}` : `$\\frac{${aNum}}{${aDen}}$`;
            qs.push(makeQ(
                `Divide: $\\frac{${n1}}{${d1}} \\div \\frac{${n2}}{${d2}}$`,
                ansText,
                [`$\\frac{${n1 * n2}}{${d1 * d2}}$`, `$\\frac{${d1 * n2}}{${n1 * d2}}$`, `$\\frac{${n1 + n2}}{${d1 + d2}}$`],
                `Keep-Change-Flip: $\\frac{${n1}}{${d1}} \\times \\frac{${d2}}{${n2}} = \\frac{${finalNum}}{${finalDen}}$.`
            ));
        } else {
            const concepts = [
                makeQ('What is the reciprocal of $\\frac{3}{7}$?', '$\\frac{7}{3}$', ['$\\frac{-3}{7}$', '$1$', '$\\frac{3}{7}$'], 'Flip numerator and denominator.'),
                makeQ('What is the reciprocal of $5$?', '$\\frac{1}{5}$', ['$-5$', '$1$', '$5$'], 'Treat $5$ as $\\frac{5}{1}$, then flip to $\\frac{1}{5}$.'),
                makeQ('To divide by $\\frac{2}{3}$, you should multiply by:', '$\\frac{3}{2}$', ['$\\frac{2}{3}$', '$2$', '$\\frac{-2}{3}$'], 'Division is multiplication by the reciprocal.'),
                makeQ('$\\frac{1}{2} \\div 2 = ?$', '$\\frac{1}{4}$', ['$1$', '$\\frac{1}{2}$', '$4$'], '$\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$.'),
                makeQ('Which operation requires a common denominator?', 'Addition & Subtraction', ['Multiplication', 'Division', 'All of them'], 'You only need common denominators to add or subtract.'),
            ];
            qs.push(concepts[i - 5]);
        }
    }
    return qs;
}

// ─── SKILL 4: DECIMAL SHIFT ────────────────────────────────────────────────
export function generateDecimalShiftQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const powers = [10, 100, 1000];
        const p = powers[R(0, 2)];
        const num = (R(1, 999) / 100).toFixed(2); // e.g. 3.45

        if (i < 5) {
            // Multiply
            const ans = (Number(num) * p).toFixed(Math.max(0, 2 - Math.log10(p)));
            qs.push(makeQ(
                `$${num} \\times ${p} = ?$`,
                ans.replace(/\.0+$/, ''),
                [
                    (Number(num) * (p * 10)).toFixed(1).replace(/\.0+$/, ''),
                    (Number(num) * (p / 10)).toFixed(3).replace(/\.0+$/, ''),
                    num
                ],
                `Multiplying by ${p} shifts the decimal point ${Math.log10(p)} place(s) right.`
            ));
        } else {
            // Divide
            const ans = (Number(num) / p).toFixed(2 + Math.log10(p));
            qs.push(makeQ(
                `$${num} \\div ${p} = ?$`,
                ans.replace(/\.?0+$/, ''),
                [
                    (Number(num) / (p / 10)).toFixed(2 + Math.log10(p / 10)).replace(/\.?0+$/, ''),
                    (Number(num) / (p * 10)).toFixed(2 + Math.log10(p * 10)).replace(/\.?0+$/, ''),
                    num
                ],
                `Dividing by ${p} shifts the decimal point ${Math.log10(p)} place(s) left.`
            ));
        }
    }
    return qs;
}

export function generateDecimalShiftAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 6) {
            const p = [10, 100, 1000][R(0, 2)];
            const isMul = R(0, 1) === 0;
            const num = (R(1, 99) / 10).toFixed(1);
            if (isMul) {
                const ans = (Number(num) * p).toFixed(0);
                qs.push(makeQ(
                    `$${num} \\times ${p} = ?$`, ans, [`${ans}0`, `${ans / 100}`, `${num}`],
                    `Shift right ${Math.log10(p)} times.`
                ));
            } else {
                const ans = (Number(num) / p).toFixed(1 + Math.log10(p));
                qs.push(makeQ(
                    `$${num} \\div ${p} = ?$`, ans, [`${ans * 10}`, `${(Number(num) / (p * 10)).toFixed(2 + Math.log10(p))}`, `${num}`],
                    `Shift left ${Math.log10(p)} times.`
                ));
            }
        } else {
            const concepts = [
                makeQ('Multiplying by 100 moves the decimal:', '2 places right', ['2 places left', '1 place right', '3 places right'], '100 has 2 zeros $\\rightarrow$ 2 places right.'),
                makeQ('Dividing by 10 moves the decimal:', '1 place left', ['1 place right', '2 places left', 'Does not move'], '10 has 1 zero $\\rightarrow$ 1 place left.'),
                makeQ('$0.05 \\times 100 = ?$', '5', ['0.5', '50', '0.005'], 'Shift 2 places right.'),
                makeQ('To convert 4.5 to 450, you must multiply by:', '100', ['10', '1000', '1'], '4.5 $\\rightarrow$ 45 $\\rightarrow$ 450 (2 shifts right).'),
            ];
            qs.push(concepts[i - 6]);
        }
    }
    return qs;
}

// ─── SKILL 5: DECIMAL MULTIPLICATION ───────────────────────────────────────
export function generateDecimalMultiplyQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 6) {
            const d1 = R(2, 9); // e.g. 0.d1
            const d2 = R(2, 9); // e.g. 0.d2
            const ans = ((d1 / 10) * (d2 / 10)).toFixed(2);
            qs.push(makeQ(
                `$0.${d1} \\times 0.${d2} = ?$`,
                `${ans}`, [`${(d1 * d2 / 10).toFixed(1)}`, `${d1 * d2}`, `0.00${d1 * d2}`],
                `$${d1} \\times ${d2} = ${d1 * d2}$. Total decimal places: 1 + 1 = 2. So, ${ans}.`
            ));
        } else {
            const d1 = Number(`1.${R(1, 9)}`);
            const d2 = R(2, 9);
            const ans = (d1 * d2).toFixed(1);
            qs.push(makeQ(
                `$${d1.toFixed(1)} \\times ${d2} = ?$`,
                ans, [((d1 * d2) * 10).toFixed(0), ((d1 * d2) / 10).toFixed(2), (d1 + d2).toFixed(1)],
                `Ignore decimal: $${d1 * 10} \\times ${d2} = ${d1 * 10 * d2}$. 1 decimal place total $\\rightarrow {ans}$.`
            ));
        }
    }
    return qs;
}

export function generateDecimalMultiplyAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            const dp1 = R(1, 2);
            const dp2 = R(1, 2);
            qs.push(makeQ(
                `If you multiply a number with ${dp1} decimal place(s) by a number with ${dp2} decimal place(s), how many decimal places will the product usually have?`,
                `${dp1 + dp2}`, [`${dp1}`, `${dp2}`, `${dp1 * dp2}`],
                `Add the decimal places: ${dp1} + ${dp2} = ${dp1 + dp2}.`
            ));
        } else {
            const n1 = R(1, 9) / 100; // 0.0x
            const n2 = R(1, 9) / 10;  // 0.x
            // JavaScript float issues, handle explicitly:
            const numans = (n1 * 100) * (n2 * 10);
            const ansStr = (numans / 1000).toFixed(3);
            qs.push(makeQ(
                `$${n1.toFixed(2)} \\times ${n2.toFixed(1)} = ?$`,
                ansStr, [`${(numans / 100).toFixed(2)}`, `${(numans / 10).toFixed(1)}`, `${numans}`],
                `$${n1 * 100} \\times ${n2 * 10} = ${numans}$. 2 + 1 = 3 decimal places $\\rightarrow ${ansStr}$.`
            ));
        }
    }
    return qs;
}

// ─── ALGEBRA SKILLS DATA ──────────────────────────────────────────────────

// ─── EXPONENT GENERATORS ──────────────────────────────────────────────────
const generateExponentQuestions = () => {
    const questions = [];
    const getNum = () => Math.floor(Math.random() * 9) + 2;
    const getLetter = () => String.fromCharCode(97 + Math.floor(Math.random() * 26));
    const getLetter2 = (exclude) => {
        let l = getLetter();
        while (l === exclude) l = getLetter();
        return l;
    };

    // 1. Product Law (2 variants)
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        let a = getNum(), b = getNum();
        questions.push({
            question: `Simplify: $${base}^{${a}} \\cdot ${base}^{${b}}$`,
            options: [`$${base}^{${a + b}}$`, `$${base}^{${a * b}}$`, `$${base}^{${Math.abs(a - b)}}$`, `$${base}$`],
            correct: 0,
            explanation: `Product Law: When multiplying same bases, add exponents: $${a} + ${b} = ${a + b}$.`
        });
    }

    // 2. Quotient Law (2 variants)
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        let a = getNum() + 5, b = getNum();
        questions.push({
            question: `Simplify: $\\frac{${base}^{${a}}}{${base}^{${b}}}$`,
            options: [`$${base}^{${a - b}}$`, `$${base}^{${a + b}}$`, `$${base}^{${a * b}}$`, `$${base}^{${b - a}}$`],
            correct: 0,
            explanation: `Quotient Law: Subtract the bottom exponent from the top: $${a} - ${b} = ${a - b}$.`
        });
    }

    // 3. Power Law (2 variants)
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        let a = getNum(), b = getNum();
        questions.push({
            question: `Simplify: $(${base}^{${a}})^{${b}}$`,
            options: [`$${base}^{${a * b}}$`, `$${base}^{${a + b}}$`, `$${base}^{${Math.pow(a, b)}}$`, `$${base}^{${a}}$`],
            correct: 0,
            explanation: `Power of a Power: Multiply the exponents: $${a} \\times ${b} = ${a * b}$.`
        });
    }

    // 4. Power of Product (2 variants)
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base1 = isLetter ? getLetter() : getNum();
        let base2 = isLetter ? getLetter2(base1) : getNum();
        if (!isLetter && base1 === base2) base2++;
        let a = getNum();
        questions.push({
            question: `Simplify: $(${base1} \\cdot ${base2})^{${a}}$`,
            options: [`$${base1}^{${a}} \\cdot ${base2}^{${a}}$`, `$${base1} \\cdot ${base2}^{${a}}$`, `$${base1}^{${a}} \\cdot ${base2}$`, `$(${base1} + ${base2})^{${a}}$`],
            correct: 0,
            explanation: `Power of Product: Distribute the exponent to each factor.`
        });
    }

    // 5. Power of Quotient (2 variants)
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base1 = isLetter ? getLetter() : getNum();
        let base2 = isLetter ? getLetter2(base1) : getNum();
        if (!isLetter && base1 === base2) base2++;
        let a = getNum();
        questions.push({
            question: `Simplify: $\\left(\\frac{${base1}}{${base2}}\\right)^{${a}}$`,
            options: [`$\\frac{${base1}^{${a}}}{${base2}^{${a}}}$`, `$\\frac{${base1}^{${a}}}{${base2}}$`, `$\\frac{${base1}}{${base2}^{${a}}}$`, `$\\frac{${base1}^{${a}}}{${base2}^{-${a}}}$`],
            correct: 0,
            explanation: `Power of Quotient: The exponent applies to both numerator and denominator.`
        });
    }

    // 6. Zero Law (2 variants)
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        questions.push({
            question: `What is $${base}^0$?`,
            options: [`$1$`, `$0$`, `$${base}$`, `$\\text{undefined}$`],
            correct: 0,
            explanation: `Zero Law: Any non-zero base raised to power 0 is always 1.`
        });
    }

    // 7. Identity Law (2 variants)
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        questions.push({
            question: `What is $${base}^1$?`,
            options: [`$${base}$`, `$1$`, `$0$`, `$${base}^2$`],
            correct: 0,
            explanation: `Identity Law: Any base raised to power 1 remains unchanged.`
        });
    }

    // 8. Negative Law (2 variants)
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        let a = getNum();
        questions.push({
            question: `Simplify: $${base}^{-${a}}$`,
            options: [`$\\frac{1}{${base}^{${a}}}$`, `$-${base}^{${a}}$`, `$${base}^{${a}}$`, `$\\frac{-1}{${base}^{${a}}}$`],
            correct: 0,
            explanation: `Negative Exponents: Flip the base to the denominator with a positive exponent.`
        });
    }

    // 9. Fractional Law (2 variants)
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        let a = getNum(), b = getNum() + 1;
        questions.push({
            question: `Write as a radical: $${base}^{\\frac{${a}}{${b}}}$`,
            options: [`$\\sqrt[${b}]{${base}^{${a}}}$`, `$\\sqrt[${a}]{${base}^{${b}}}$`, `$\\frac{${a}}{${b}} \\sqrt{${base}}$`, `$\\frac{1}{\\sqrt[${b}]{${base}^{${a}}}}$`],
            correct: 0,
            explanation: `Fractional Exponents: The denominator is the root index, the numerator is the power.`
        });
    }

    // Tricky 1 (19)
    let tb1 = getNum(), tb2 = tb1 + 1, ta1 = getNum();
    questions.push({
        question: `Simplify: $${tb1}^{${ta1}} \\cdot ${tb2}^{${ta1}}$`,
        options: [`$${tb1 * tb2}^{${ta1}}$`, `$${tb1 + tb2}^{${ta1}}$`, `$${tb1 * tb2}^{${ta1 + ta1}}$`, `$${tb1}^{${ta1}} \\cdot ${tb2}^{${ta1}}$`],
        correct: 0,
        explanation: `Same exponent, different bases: Multiply the bases.`
    });

    // Tricky 2 (20)
    let tl1 = getLetter(), tl2 = getLetter2(tl1), tpa = getNum();
    questions.push({
        question: `Simplify: $${tl1}^{${tpa}} \\cdot ${tl2}^{${tpa}}$`,
        options: [`$(${tl1}${tl2})^{${tpa}}$`, `$(${tl1}+${tl2})^{${tpa}}$`, `$(${tl1}${tl2})^{${tpa * 2}}$`, `$${tl1}${tl2}^{${tpa}}$`],
        correct: 0,
        explanation: `Grouping different bases with a common exponent.`
    });

    // Tricky 3 (21)
    let addBase = getLetter(), addP1 = getNum(), addP2 = addP1 + 1;
    questions.push({
        question: `Simplify: $${addBase}^{${addP1}} + ${addBase}^{${addP2}}$`,
        options: [`$\\text{Cannot be simplified}$`, `$${addBase}^{${addP1 + addP2}}$`, `$${addBase}^{${addP1 * addP2}}$`, `$2${addBase}^{${addP1 + addP2}}$`],
        correct: 0,
        explanation: `Addition: Unlike powers cannot be combined into a single power.`
    });

    // Tricky 4 (22)
    let trNum = getNum(), tryP = getNum();
    questions.push({
        question: `Simplify: $${trNum}^{${tryP}} + ${trNum}^{${tryP}}$`,
        options: [`$2 \\cdot ${trNum}^{${tryP}}$`, `$${trNum}^{${tryP + tryP}}$`, `$${trNum + trNum}^{${tryP}}$`, `$${trNum}^{${tryP * 2}}$`],
        correct: 0,
        explanation: `Addition: $x + x = 2x$. Do not add the exponents!`
    });

    // Tricky 5 (23)
    let bDif1 = getLetter(), bDif2 = getLetter2(bDif1), pDif1 = getNum(), pDif2 = pDif1 + 1;
    questions.push({
        question: `Simplify: $${bDif1}^{${pDif1}} \\cdot ${bDif2}^{${pDif2}}$`,
        options: [`$\\text{Cannot be further simplified}$`, `$(${bDif1}${bDif2})^{${pDif1 + pDif2}}$`, `$(${bDif1}${bDif2})^{${pDif1 * pDif2}}$`, `$${bDif1}${bDif2}^{${pDif1 + pDif2}}$`],
        correct: 0,
        explanation: `Different bases AND different exponents means no law applies.`
    });

    // Tricky 6 (24)
    let fA = getNum(), fB = getNum() + 1, fP = getNum();
    questions.push({
        question: `Simplify: $\\left(\\frac{${fA}}{${fB}}\\right)^{-${fP}}$`,
        options: [`$\\left(\\frac{${fB}}{${fA}}\\right)^{${fP}}$`, `$-\\left(\\frac{${fA}}{${fB}}\\right)^{${fP}}$`, `$\\left(\\frac{-${fA}}{${fB}}\\right)^{${fP}}$`, `$\\frac{${fA}^{-${fP}}}{${fB}}$`],
        correct: 0,
        explanation: `Negative power on a fraction flips the fraction numerator and denominator.`
    });

    // Tricky 7 (25)
    let dV = getLetter(), dP = getNum();
    questions.push({
        question: `Evaluate: $\\frac{${dV}^{${dP}} - ${dV}^{${dP}}}{${dV}^{${dP}}}$`,
        options: [`$0$`, `$1$`, `$${dV}$`, `$\\text{undefined}$`],
        correct: 0,
        explanation: `Numerator calculation first: $x - x = 0$.`
    });

    // Tricky 8 (26)
    let c1 = getNum(), c2 = getNum() + 1, cV = getLetter(), cp1 = getNum(), cp2 = getNum();
    questions.push({
        question: `Simplify: $(${c1}${cV}^{${cp1}}) \\cdot (${c2}${cV}^{${cp2}})$`,
        options: [`$${c1 * c2}${cV}^{${cp1 + cp2}}$`, `$${c1 + c2}${cV}^{${cp1 + cp2}}$`, `$${c1 * c2}${cV}^{${cp1 * cp2}}$`, `$${c1}${c2}${cV}^{${cp1 + cp2}}$`],
        correct: 0,
        explanation: `Multiply coefficients AND add the exponents.`
    });

    // Tricky 9 (27)
    let opP = Math.floor(Math.random() * 900) + 100;
    questions.push({
        question: `What is $1^{${opP}}$?`,
        options: [`$1$`, `$${opP}$`, `$0$`, `$100$`],
        correct: 0,
        explanation: `The base 1 raised to any power is always 1.`
    });

    // Tricky 10 (28)
    let cBase = getNum(), tcP = getNum(), outP = getNum();
    questions.push({
        question: `Simplify: $(${cBase}x^{${tcP}})^{${outP}}$`,
        options: [`$${Math.pow(cBase, outP)}x^{${tcP * outP}}$`, `$${cBase}x^{${tcP * outP}}$`, `$${cBase * outP}x^{${tcP * outP}}$`, `$${Math.pow(cBase, outP)}x^{${tcP + outP}}$`],
        correct: 0,
        explanation: `Power applies to both the coefficient and the variable.`
    });

    // Tricky 11 (29)
    let nNum = getNum() * 2;
    questions.push({
        question: `Are $(-x)^{${nNum}}$ and $-x^{${nNum}}$ equal?`,
        options: [`No`, `Yes`, `Only if $x=0$`, `Cannot determine`],
        correct: 0,
        explanation: `Even power on negative parentheses makes it positive, but the second term is always negative.`
    });

    // Tricky 12 (30)
    let tn5 = getLetter(), tp5a = getNum(), tp5b = getNum() + 1;
    questions.push({
        question: `Which is typically greater: $(${tn5}^{${tp5a}})^{${tp5b}}$ or $${tn5}^{${tp5a}} \\cdot ${tn5}^{${tp5b}}$? (Assume $${tn5} > 1$)`,
        options: [`$(${tn5}^{${tp5a}})^{${tp5b}}$`, `$${tn5}^{${tp5a}} \\cdot ${tn5}^{${tp5b}}$`, `They are equal`, `Depends on $${tn5}$`],
        correct: 0,
        explanation: `Multiplying exponents vs Adding them: $${tp5a * tp5b}$ vs $${tp5a + tp5b}$. Products are larger than sums for $n > 1$.`
    });

    return questions.map(q => {
        const correctOpt = q.options[q.correct];
        const shuffled = [...q.options].sort(() => Math.random() - 0.5);
        return { ...q, options: shuffled, correct: shuffled.indexOf(correctOpt) };
    });
};

const exponentQuestions = generateExponentQuestions;

const generateExponentAssessment = () => {
    const pool = generateExponentQuestions();
    const assessment = [];
    for (let i = 0; i < 9; i++) {
        const takeIdx = (i * 2) + Math.floor(Math.random() * 2);
        if (pool[takeIdx]) {
            assessment.push(pool[takeIdx]);
            pool[takeIdx] = null;
        }
    }
    const remaining = pool.filter(q => q !== null);
    const shuffled = [...remaining].sort(() => Math.random() - 0.5);
    assessment.push(...shuffled.slice(0, 16));
    return assessment.sort(() => Math.random() - 0.5);
};

const exponentAssessment = generateExponentAssessment;

// ─── STATIC QUESTION ARRAYS ───────────────────────────────────────────────
const likeTermsQuestions = [
    { question: 'Which pair are LIKE terms?', options: ['3x and 3y', '5x^2 and 5x', '4ab and -ab', '7 and 7y'], correct: 2, explanation: 'Same variables and powers.' },
    { question: 'Which pair are UNLIKE terms?', options: ['6m and -2m', '3x^2 and 7x^2', '5ab and 2ab', '4p and 3q'], correct: 3, explanation: 'Different variables (p vs q).' },
    { question: 'Identify the like terms in: 3x, 5y, -2x, 7z', options: ['3x and 5y', '3x and -2x', '5y and 7z', 'All are like'], correct: 1, explanation: 'Both involve 1x.' },
    { question: 'Are 5x^2 and 5x like terms?', options: ['Yes', 'No - different powers', 'Yes - same coefficient', 'Depends on x'], correct: 1, explanation: 'Powers must match.' },
    { question: 'Simplify: $3x + 5x$', options: ['15x', '8x', '8x^2', '35x'], correct: 1, explanation: 'Add coefficients.' },
    { question: 'Simplify: $7y^2 - 3y^2$', options: ['4', '4y', '4y^2', '4y^4'], correct: 2, explanation: 'Subtract coefficients.' },
    { question: 'Simplify: $6m - 4m + 2m$', options: ['4m', '12m', '0m', '8m'], correct: 0, explanation: 'Combine coefficients.' },
    { question: 'Is $x$ and $1x$ the same?', options: ['Yes', 'No', 'Only for 0', 'Only for 1'], correct: 0, explanation: 'The 1 is invisible.' },
    { question: 'Group contains only like terms?', options: ['3x, 3y', '2ab, 5ab', 'x, x^2', '1, x'], correct: 1, explanation: 'ab matches ab.' },
    { question: 'Simplify: $10k - k$', options: ['9k', '10', '9', 'k'], correct: 0, explanation: '10 - 1 = 9.' }
];

const likeTermsAssessment = [...likeTermsQuestions];

const expressionQuestions = [
    { question: 'Add: $(3x + 5) + (2x - 3)$', options: ['5x + 2', '5x + 8', '5x - 2', '5x + 3'], correct: 0, explanation: 'Sum of like terms.' },
    { question: 'Subtract: $(7x + 4) - (3x + 1)$', options: ['4x + 3', '4x + 5', '10x + 5', '4x - 3'], correct: 0, explanation: 'Distribute minus: 7x + 4 - 3x - 1.' },
    { question: 'Multiply: $3x(2x + 5)$', options: ['6x + 15', '6x^2 + 15x', '6x^2 + 15', '5x^2 + 15x'], correct: 1, explanation: 'Distribute 3x to both terms.' },
    { question: 'Divide: $6x^2 / 2x$', options: ['3x', '3x^2', '6x', '12x'], correct: 0, explanation: 'Divide standardly.' },
    { question: 'Expand: $(x+3)(x+2)$', options: ['x^2+5x+6', 'x^2+6x+5', 'x^2+5', '2x+5'], correct: 0, explanation: 'F.O.I.L method.' },
    { question: 'Simplify: $2(a+3) + 4$', options: ['2a+10', '2a+6', '2a+7', '6a+6'], correct: 0, explanation: '2a+6+4.' },
    { question: 'Subtract: $10 - (x+3)$', options: ['7-x', '13-x', '7+x', '13+x'], correct: 0, explanation: '10-x-3.' },
    { question: 'Multiply: $-2y(3y - 4)$', options: ['-6y^2 + 8y', '-6y^2 - 8y', '6y^2 - 8y', '-6y + 8y'], correct: 0, explanation: 'Sign change on second term.' },
    { question: 'Simplify: $5x + 3(x-2)$', options: ['8x-6', '8x-2', '15x-6', '5x+3x+6'], correct: 0, explanation: '5x+3x-6.' },
    { question: 'Divide: $9x^3 / 3x^2$', options: ['3x', '3', '6x', '3x^2'], correct: 0, explanation: '3x^{3-2}$.' }
];

const expressionAssessment = [...expressionQuestions];

const equationQuestions = [
    { question: 'Solve: $x + 7 = 15$', options: ['x = 8', 'x = 22', 'x = 7', 'x = 105'], correct: 0, explanation: 'Subtract 7.' },
    { question: 'Solve: $3x = 21$', options: ['x = 7', 'x = 63', 'x = 18', 'x = 8'], correct: 0, explanation: 'Divide by 3.' },
    { question: 'Solve: $2x - 5 = 11$', options: ['x = 8', 'x = 3', 'x = 6', 'x = 16'], correct: 0, explanation: '2x=16.' },
    { question: 'Solve: $x/4 = 5$', options: ['x = 20', 'x = 1.25', 'x = 9', 'x = 5'], correct: 0, explanation: 'Multiply by 4.' },
    { question: 'Solve: $4x + 2 = 18$', options: ['x = 4', 'x = 5', 'x = 3', 'x = 6'], correct: 0, explanation: '4x=16.' },
    { question: 'Solve: $x+y=10, x-y=2$. Find x.', options: ['6', '4', '5', '8'], correct: 0, explanation: '2x=12.' },
    { question: 'Solve: $x^2 = 9$', options: ['x = +/-3', 'x = 3 only', 'x = 9', 'x = +/-9'], correct: 0, explanation: 'Roots of 9.' },
    { question: 'Solve: $x^2 - 5x + 6 = 0$', options: ['x = 2, 3', 'x = -2, -3', 'x = 1, 5', 'x = 0, 6'], correct: 0, explanation: 'Factorise.' },
    { question: 'Solve: $n - 13 = 5$', options: ['18', '8', '-8', '65'], correct: 0, explanation: 'Add 13.' },
    { question: 'Solve: $5y = 45$', options: ['9', '225', '40', '5'], correct: 0, explanation: 'Divide.' }
];

const equationAssessment = [...equationQuestions];

const subjectQuestions = [
    { question: 'Make x the subject: $y = x + 5$', options: ['x = y - 5', 'x = y + 5', 'x = 5 - y', 'x = y/5'], correct: 0, explanation: 'Subtract 5.' },
    { question: 'Make x the subject: $y = 3x$', options: ['x = y/3', 'x = y + 3', 'x = y - 3', 'x = 3y'], correct: 0, explanation: 'Divide by 3.' },
    { question: 'Make r the subject: $A = \\pi r^2$', options: ['r = sqrt(A/\\pi)', 'r = A/\\pi', 'r = sqrt(A\\pi)', 'r = A^2/\\pi'], correct: 0, explanation: 'Divide then root.' },
    { question: 'Make b the subject: $P = 2(l+b)$', options: ['b = P/2 - l', 'b = P - 2l', 'b = 2P - l', 'b = P + l'], correct: 0, explanation: 'Divide, then subtract.' },
    { question: 'Make m the subject: $E = mc^2$', options: ['m = E/c^2', 'm = Ec^2', 'm = E - c^2', 'm = E/c'], correct: 0, explanation: 'Divide by c^2.' },
    { question: 'Make h the subject: $V = lbh$', options: ['h = V/lb', 'h = V - lb', 'h = lb/V', 'h = V + lb'], correct: 0, explanation: 'Divide by lb.' },
    { question: 'Make a the subject: $v = u + at$', options: ['a = (v-u)/t', 'a = (v-u)t', 'a = v-u', 'a = vt-u'], correct: 0, explanation: 'Subtract u, divide by t.' },
    { question: 'Make x subject: $y = sqrt(x+4)$', options: ['x = y^2 - 4', 'x = y^2 + 4', 'x = sqrt(y) - 4', 'x = y + 4'], correct: 0, explanation: 'Square, then subtract 4.' },
    { question: 'Make r the subject: $C = 2\\pi r$', options: ['r = C/2\\pi', 'r = 2\\pi C', 'r = C - 2\\pi', 'r = C^2'], correct: 0, explanation: 'Divide by 2\\pi.' },
    { question: 'Make y subject: $ax+by=c$', options: ['y = (c-ax)/b', 'y = c-ax', 'y = (c+ax)/b', 'y = c/b-a'], correct: 0, explanation: 'Subtract ax, divide by b.' }
];

const subjectAssessment = [...subjectQuestions];

// ─── DYNAMIC GENERATORS ───────────────────────────────────────────────────
const generateEquationQuestionsLinear1 = () => {
    const questions = [];
    const rnd = (min = 1, max = 12) => Math.floor(Math.random() * (max - min + 1)) + min;
    for (let i = 0; i < 10; i++) {
        let a = rnd(2, 6), x = rnd(), b = rnd(), c = a * x + b;
        questions.push({
            question: `Solve for x: $${a}x + ${b} = ${c}$`,
            options: [`x = ${x}`, `x = ${x + 1}`, `x = ${x - 2}`, `x = ${x + 5}`].sort(() => Math.random() - 0.5),
            correct: 0, // Simplified for brevity in rewrite
            explanation: `Subtract ${b}, divide by ${a}.`
        });
        // Fixing index
        questions[i].correct = questions[i].options.indexOf(`x = ${x}`);
    }
    return questions;
};

const generateEquationQuestionsLinear2 = () => {
    const questions = [];
    const getVal = (min = 1, max = 8) => Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < 10; i++) {
        let x = getVal(), y = getVal(1, x); 
        const type = i % 3;
        let q, options, explanation;

        if (type === 0) {
            let a = x + y, b = x - y;
            q = `Solve: $x + y = ${a}$ and $x - y = ${b}$`;
            options = [`$x=${x}, y=${y}$`, `$x=${x + 1}, y=${y + 1}$`, `$x=${y}, y=${x}$`, `$x=${x + 2}, y=${y - 1}$`].sort(() => Math.random() - 0.5);
            explanation = `Add equations: $2x = ${a + b} \\rightarrow x = ${x}$. Then $y = ${a} - ${x} = ${y}$.`;
        } else if (type === 1) {
            let c = getVal(2, 4), ny = c * x, a = x + ny;
            q = `Solve: $y = ${c}x$ and $x + y = ${a}$`;
            options = [`$x=${x}, y=${ny}$`, `$x=${ny}, y=${x}$`, `$x=${x + 1}, y=${ny + 1}$`, `$x=${x + 2}, y=${ny + 2}$`].sort(() => Math.random() - 0.5);
            explanation = `Substitute $y$: $x + ${c}x = ${a} \\rightarrow ${c + 1}x = ${a} \\rightarrow x = ${x}$.`;
        } else {
            let c = getVal(2, 4), d = getVal(2, 3), a = c * x + y, b = d * x - y;
            q = `Solve: $${c}x + y = ${a}$ and $${d}x - y = ${b}$`;
            options = [`$x=${x}, y=${y}$`, `$x=${x+1}, y=${y}$`, `$x=${y}, y=${x}$`, `$x=${x+2}, y=${y+1}$`].sort(() => Math.random() - 0.5);
            explanation = `Eliminate $y$: $(${c}+${d})x = ${a+b} \\rightarrow x=${x}$.`;
        }
        questions.push({ question: q, options, correct: options.findIndex(o => o.includes(`x=${x}`) && (o.includes(`y=${y}`) || o.includes(`y=${ny}`))), explanation });
    }
    return questions;
};

const generateEquationQuestionsQuadratic = () => {
    const questions = [];
    const getVal = (min = 1, max = 9) => Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < 10; i++) {
        const type = i < 3 ? 'root' : 'factor';
        let q, options, explanation;

        if (type === 'root') {
            let c = getVal(3, 10), c2 = c * c;
            q = `Solve: $x^2 = ${c2}$`;
            options = [`$x = \\pm${c}$`, `$x = ${c}$`, `$x = ${c2}$`, `$x = \\pm${c+1}$`].sort(() => Math.random() - 0.5);
            explanation = `Taking square root of both sides gives $x = \\pm${c}$.`;
        } else {
            let a = getVal(1, 5), b = getVal(1, 5);
            if (Math.random() > 0.5) a = -a;
            if (Math.random() > 0.5) b = -b;
            let s = a + b, p = a * b;
            let sStr = s === 0 ? "" : s > 0 ? `+ ${s}x` : `- ${Math.abs(s)}x`;
            let pStr = p === 0 ? "" : p > 0 ? `+ ${p}` : `- ${Math.abs(p)}`;
            q = `Solve: $x^2 ${sStr} ${pStr} = 0$`;
            let r1 = -a, r2 = -b;
            options = [`$x=${r1}$ or $x=${r2}$`, `$x=${-r1}$ or $x=${-r2}$`, `$x=${r1+1}$`, `$x=${r2-1}$`].sort(() => Math.random() - 0.5);
            explanation = `Factorise to $(x${a>=0?'+':''}${a})(x${b>=0?'+':''}${b})=0$. Roots are $x=${r1}, ${r2}$.`;
        }
        const correctStr = type === 'root' ? `$x = \\pm${Math.sqrt(Math.pow(getVal(1,1),1))}` : ""; // Logical placeholder for index finding
        // Correct index finding
        let correctIdx = 0;
        if (type === 'root') {
             let c_val = Math.sqrt(eval(q.split('=')[1].replace('$','')));
             correctIdx = options.findIndex(o => o.includes(`\\pm${c_val}`));
        } else {
             let parts = q.match(/x^2\s*([+-]\s*\d*x)?\s*([+-]\s*\d+)?\s*=\s*0/);
             // Instead of complex parsing, just use the roots we generated
             correctIdx = options.findIndex(o => o.includes(`x=${-a}`) && o.includes(`x=${-b}`));
        }
        questions.push({ question: q, options, correct: correctIdx, explanation });
    }
    return questions;
};


const generateRealLifeQuestions = () => {
    const questions = [];
    const rnd = (min = 5, max = 15) => Math.floor(Math.random() * (max - min + 1)) + min;
    for (let i = 0; i < 10; i++) {
        let x = rnd();
        questions.push({
            question: `A pizza costs $${x} and a drink is $2. If the total is $${x + 2}, how much is the pizza?`,
            options: [`$${x}`, `$${x + 1}`, `$2`, `$${x - 2}`].sort(() => Math.random() - 0.5),
            correct: 0,
            explanation: `Simple subtraction.`
        });
        questions[i].correct = questions[i].options.indexOf(`$${x}`);
    }
    return questions;
};

const generateRealLifeAssessment = () => generateRealLifeQuestions();

const wordProblemQuestions = [
    { question: 'Translate: "Nine more than three times a number is 24".', options: ['$3n + 9 = 24$', '$3n - 9 = 24$', '$9n + 3 = 24$', '$12n = 24$'], correct: 0, explanation: '3n + 9.' }
];
const wordProblemAssessment = [...wordProblemQuestions];

// ─── SKILLS EXPORT ────────────────────────────────────────────────────────
export const SKILLS = [
    {
        id: 'exponents',
        title: 'Laws of Exponents',
        subtitle: 'Skill 1',
        icon: '⚡',
        color: '#6366f1',
        desc: 'Product, power, and zero laws to simplify expressions.',
        practice: generateExponentQuestions,
        assessment: generateExponentAssessment,
        learn: {
            concept: 'Master the rules of powers.',
            rules: [
                { title: 'Product Law', f: 'x^a \\cdot x^b = x^{a+b}', d: 'Add exponents.', ex: 'x^2 \\cdot x^3 = x^5', tip: 'Multiplication turns into addition.' }
            ]
        }
    },
    {
        id: 'liketerms',
        title: 'Like & Unlike Terms',
        subtitle: 'Skill 2',
        icon: '🤝',
        color: '#0891b2',
        desc: 'Identify and combine matching terms.',
        practice: likeTermsQuestions,
        assessment: likeTermsAssessment,
        learn: { concept: 'Only siblings play together.', rules: [{ title: 'Variables', f: '3x + 2x = 5x', d: 'Match letters.', ex: 'x + x = 2x', tip: 'Count them!' }] }
    },
    {
        id: 'expressions',
        title: 'Simplifying Expressions',
        subtitle: 'Skill 3',
        icon: '📝',
        color: '#f59e0b',
        desc: 'Multi-step algebraic cleanup.',
        practice: expressionQuestions,
        assessment: expressionAssessment,
        learn: { concept: 'Clean up the mess.', rules: [{ title: 'PEMDAS', f: '2(x+1)', d: 'Order matters.', ex: '2x+2', tip: 'Distribute first.' }] }
    },
    {
        id: 'solving',
        title: 'Solving Equations',
        subtitle: 'Skill 4',
        icon: '⚖️',
        color: '#8b5cf6',
        desc: 'Find the hidden value.',
        assessment: equationAssessment,
        practiceCategories: [
            { id: 'linear1', title: 'Linear 1-Var', questions: generateEquationQuestionsLinear1 },
            { id: 'linear2', title: 'Linear 2-Var', questions: generateEquationQuestionsLinear2 },
            { id: 'quadratic', title: 'Quadratic', questions: generateEquationQuestionsQuadratic }
        ],
        learn: { concept: 'Balance the scale.', rules: [{ title: 'Balance', f: 'x+2=5', d: 'Do same to both sides.', ex: 'x=3', tip: 'Inverse ops!' }] }
    },
    {
        id: 'subject',
        title: 'Change of Subject',
        subtitle: 'Skill 5',
        icon: '🔄',
        color: '#ec4899',
        desc: 'Rearrange formulas.',
        practice: subjectQuestions,
        assessment: subjectAssessment,
        learn: { concept: 'Rearrange the furniture.', rules: [{ title: 'Isolate', f: 'y=mx+c', d: 'Get x alone.', ex: 'x=(y-c)/m', tip: 'Backwards PEMDAS.' }] }
    },
    {
        id: 'wordproblems',
        title: 'Word Problems',
        subtitle: 'Skill 6',
        icon: '🌍',
        color: '#10b981',
        desc: 'Words to Math.',
        practice: wordProblemQuestions,
        assessment: wordProblemAssessment,
        learn: { concept: 'Translate the story.', rules: [{ title: 'Code Words', f: '"sum" = +', d: 'Keywords.', ex: '3n+1', tip: 'Read carefully.' }] }
    },
    {
        id: 'reallife',
        title: 'Algebra in Action',
        subtitle: 'Skill 7',
        icon: '🌟',
        color: '#f43f5e',
        desc: 'Realistic challenges.',
        practice: generateRealLifeQuestions,
        assessment: generateRealLifeAssessment,
        learn: { concept: 'Real world math.', rules: [{ title: 'Stories', f: '...', d: 'Real life.', ex: '...', tip: 'Check context.' }] }
    }
];

// ─── QUESTIONS & DATA ──────────────────────────────────────────────────────
const generateExponentQuestions = () => {
    const questions = [];
    const getNum = () => Math.floor(Math.random() * 9) + 2; // 2 to 10
    const getLetter = () => String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z
    const getLetter2 = (exclude) => {
        let l = getLetter();
        while (l === exclude) l = getLetter();
        return l;
    };

    for (let i = 0; i < 10; i++) {
        const type = i % 5;
        let q, options, explanation;

        if (type === 0) {
            // Product Law: x^a * x^b = x^{a+b}
            let a = getNum(), b = getNum(), l = getLetter();
            q = `Simplify: $${l}^{${a}} \\cdot ${l}^{${b}}$`;
            options = [`$${l}^{${a + b}}$`, `$${l}^{${a * b}}$`, `$${l}^{${Math.abs(a - b)}}$`, `$2${l}^{${a + b}}$`];
            explanation = `Product Law says to add exponents: $${a} + ${b} = ${a + b}$. Answer: $${l}^{${a + b}}$.`;
        } else if (type === 1) {
            // Power of Power: (x^a)^b = x^{ab}
            let a = getNum(), b = getNum(), l = getLetter();
            q = `Simplify: $(${l}^{${a}})^{${b}}$`;
            options = [`$${l}^{${a * b}}$`, `$${l}^{${a + b}}$`, `$${l}^{${a}^{${b}}}$`, `$${b}${l}^{${a}}$`];
            explanation = `Power Law says to multiply exponents: $${a} \\times ${b} = ${a * b}$. Answer: $${l}^{${a * b}}$.`;
        } else if (type === 2) {
            // Power of Product: (xy)^a = x^a y^a
            let a = getNum(), l1 = getLetter(), l2 = getLetter2(l1);
            q = `Simplify: $(${l1}${l2})^{${a}}$`;
            options = [`$${l1}^{${a}}${l2}^{${a}}$`, `$${l1}${l2}^{${a}}$`, `$${a}${l1}${l2}$`, `$${l1}^{${a}} + ${l2}^{${a}}$`];
            explanation = `Distribute the power to each term: $${l1}^{${a}} \\cdot ${l2}^{${a}}$.`;
        } else if (type === 3) {
            // Quotient Law: x^a / x^b = x^{a-b} (Assume a > b for simplicity)
            let b = getNum(), a = b + getNum(), l = getLetter();
            q = `Simplify: $\\frac{${l}^{${a}}}{${l}^{${b}}}$`;
            options = [`$${l}^{${a - b}}$`, `$${l}^{${a / b}}$`, `$${l}^{${a + b}}$`, `$1^{${a - b}}$`];
            explanation = `Quotient Law says to subtract bottom exponent from top: $${a} - ${b} = ${a - b}$. Answer: $${l}^{${a - b}}$.`;
        } else {
            // Zero Law and Identity
            if (i === 4) {
                let n = Math.floor(Math.random() * 500) + 2;
                q = `Simplify: $${n}^{0}$`;
                options = [`$1$`, `$0$`, `$${n}$`, `$-1$ Rose`];
                explanation = `Zero Law: Any non-zero number to power 0 is always 1.`;
            } else {
                let n = Math.floor(Math.random() * 100) + 2;
                q = `Simplify: $${n}^{1}$`;
                options = [`$${n}$`, `$1$`, `$0$`, `$2${n}$`];
                explanation = `Identity Law: Any number to power 1 is just itself.`;
            }
        }
        // Shuffle options
        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q, math: '', options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const exponentQuestions = generateExponentQuestions;

const generateExponentAssessment = () => {
    const qs = generateExponentQuestions();
    // Add couple fixed tricky ones
    qs.push({
        question: 'Solve for x: $2^x \\cdot 2^3 = 2^7$', options: ['$x = 4$', '$x = 10$', '$x = 21$', '$x = 3.5$'], correct: 0, explanation: '$x + 3 = 7 \\rightarrow x = 4$.'
    });
    qs.push({
        question: 'Simplify: $(2^3)^2$', options: ['$64$', '$32$', '$12$', '$16$'], correct: 0, explanation: '$2^6 = 64$.'
    });
    return qs;
};
const exponentAssessment = generateExponentAssessment;

const likeTermsQuestions = [
    { question: 'Which of these is a "like term" to 3x?', options: ['5x', '3y', 'x²', '3'], correct: 0, explanation: 'Like terms must have the exact same variable (x) and power (1).' },
    { question: 'Simplify: 4a + 3a + 2b', math: '4a + 3a + 2b = ?', options: ['7a + 2b', '9ab', '7a² + 2b', '12a + 2b'], correct: 0, explanation: 'Combine 4a and 3a to get 7a. 2b is an "unlike" term and stays separate.' },
    { question: 'Can you combine x and x²?', options: ['No, different powers', 'Yes, they are both x', 'Only if x is 1', 'Yes, it becomes 2x'], correct: 0, explanation: 'Even if the letter matches, the powers (1 vs 2) must also match to be "like terms".' },
    { question: 'Simplify: 10y − y', math: '10y − y = ?', options: ['9y', '10', 'y', '11y'], correct: 0, explanation: 'Remember that -y is secretaries -1y. 10 − 1 = 9. Result: 9y.' },
    { question: 'Which pair are "Unlike Terms"?', options: ['5x and 5y', 'x and 10x', '3ab and ab', '4 and 9'], correct: 0, explanation: '5x and 5y have different variables, so they cannot be combined.' },
    { question: 'Simplify: 2m + 5 + 3m − 2', math: '2m + 5 + 3m − 2 = ?', options: ['5m + 3', '5m + 7', '10m − 10', '5m − 3'], correct: 0, explanation: 'Group terms: (2m + 3m) + (5 − 2) = 5m + 3.' },
    { question: 'True or False: 3ab and 4ba are like terms.', options: ['True', 'False'], correct: 0, explanation: 'True! The order of multiplication doesn\'t matter ($a \\times b = b \\times a$).' },
    { question: 'Simplify: x + x + x', options: ['3x', 'x³', '3', 'x + 3'], correct: 0, explanation: 'You are adding 1x + 1x + 1x = 3x.' },
];
const likeTermsAssessment = [
    { question: 'Simplify the expression: 5x + 2y − 3x + y', options: ['2x + 3y', '8x + 3y', '2x + y', '5xy'], correct: 0, explanation: '(5x − 3x) + (2y + y) = 2x + 3y.' },
    { question: 'Which term is "like" to 7xy²?', options: ['2xy²', '7x²y', '7x', '14y²'], correct: 0, explanation: 'Must have exact same variable part: xy².' },
    { question: 'Simplify: 4 + 3p − 4', options: ['3p', '7p − 4', '0', '3p + 8'], correct: 0, explanation: '4 − 4 = 0, leaving only 3p.' },
    { question: 'True or False: Like terms must have the same coefficients.', options: ['False', 'True'], correct: 0, explanation: 'False. Only variables and powers must match; coefficients (the numbers) can be anything!' },
    { question: 'Add: a² + a²', options: ['2a²', 'a⁴', '2a', 'a²'], correct: 0, explanation: '1a² + 1a² = 2a².' },
    { question: 'Simplify: 6k − (2k + 1)', options: ['4k − 1', '4k + 1', '8k + 1', '3k'], correct: 0, explanation: '6k − 2k − 1 = 4k − 1.' },
];

const expressionQuestions = [
    { question: 'Expand: 3(x + 4)', math: '3(x + 4) = ?', options: ['3x + 12', '3x + 4', 'x + 12', '3x + 7'], correct: 0, explanation: 'Multiply 3 by both x and 4. 3 \\times x = 3x; 3 \\times 4 = 12.' },
    { question: 'Simplify: 2(a + 3) + 4', math: '2(a + 3) + 4', options: ['2a + 10', '2a + 6', '2a + 7', '6a + 6'], correct: 0, explanation: 'Expand: 2a + 6. Then add 4: 2a + 6 + 4 = 2a + 10.' },
    { question: 'Simplify: 5x + 3(x - 2)', math: '5x + 3(x - 2)', options: ['8x - 6', '8x - 2', '15x - 6', '5x + 3x + 6'], correct: 0, explanation: 'Expand: 5x + 3x - 6. Combine like terms: 8x - 6.' },
    { question: 'Subtract: (4a² + 3a + 5) − (2a² + a − 2)', math: '(4a² + 3a + 5) − (2a² + a − 2)', options: ['2a² + 2a + 7', '2a² + 4a + 7', '6a² + 4a + 3', '2a² + 2a + 3'], correct: 0, explanation: 'Subtract each term: (4−2)a² + (3−1)a + (5−(−2)) = 2a² + 2a + 7.' },
    { question: 'Multiply: −2y(3y − 4)', math: '−2y(3y − 4)', options: ['−6y² + 8y', '−6y² − 8y', '6y² − 8y', '−6y + 8y'], correct: 0, explanation: '−2y × 3y = −6y² and −2y × (−4) = +8y. Result: −6y² + 8y.' },
    { question: 'Divide: 12a³b² ÷ 4ab', math: '12a³b² ÷ 4ab', options: ['3a²b', '8a²b', '3a²b²', '3ab'], correct: 0, explanation: '12÷4=3, a³÷a=a², b²÷b=b. Result: 3a²b.' },
    { question: 'Add: (5x² − 3x + 1) + (−2x² + 4x − 6)', math: '(5x² − 3x + 1) + (−2x² + 4x − 6)', options: ['3x² + x − 5', '3x² − x − 5', '7x² − x + 7', '3x² + x + 5'], correct: 0, explanation: '(5−2)x² + (−3+4)x + (1−6) = 3x² + x − 5.' },
];

const expressionAssessment = [
    { question: 'Simplify: (6y + 4) + (−2y + 3)', math: '(6y + 4) + (−2y + 3)', options: ['4y + 7', '8y + 7', '4y + 1', '4y − 7'], correct: 0, explanation: '(6y − 2y) + (4 + 3) = 4y + 7.' },
    { question: 'Multiply: 4a(a − 3)', math: '4a(a − 3)', options: ['4a² − 12a', '4a² − 12', '4a − 12a', '4a² + 12a'], correct: 0, explanation: '4a × a = 4a² and 4a × (−3) = −12a. Result: 4a² − 12a.' },
    { question: 'Divide: 15x²y ÷ 5xy', math: '15x²y ÷ 5xy', options: ['3x', '3xy', '3y', '10x'], correct: 0, explanation: '15÷5=3, x²÷x=x, y÷y=1. Result: 3x.' },
    { question: 'Subtract: (8n² − n) − (3n² + 4n)', math: '8n² − n) − (3n² + 4n)', options: ['5n² − 5n', '5n² + 5n', '5n² − 3n', '11n² − 5n'], correct: 0, explanation: '(8−3)n² + (−1−4)n = 5n² − 5n.' },
    { question: 'Expand: (x + 3)(x + 5)', math: '(x + 3)(x + 5)', options: ['x² + 15', 'x² + 8x + 15', 'x² + 8x + 8', 'x² + 15x + 8'], correct: 1, explanation: 'FOIL: x² + 5x + 3x + 15 = x² + 8x + 15.' },
    { question: 'Simplify: 3(2x + 1) − 2(x − 4)', math: '3(2x + 1) − 2(x − 4)', options: ['4x + 11', '4x − 11', '8x + 11', '4x + 3'], correct: 0, explanation: '6x + 3 − 2x + 8 = 4x + 11.' },
    { question: 'Expand: 2x(x + 3) + 3(x − 2)', math: '2x(x + 3) + 3(x − 2)', options: ['2x² + 9x − 6', '2x² + 3x − 6', '2x² + 6x + 3', '5x(x+1)−6'], correct: 0, explanation: '2x² + 6x + 3x − 6 = 2x² + 9x − 6.' },
    { question: 'Divide: 9x³ ÷ 3x²', math: '9x³ ÷ 3x²', options: ['3x', '6x', '3x²', '3'], correct: 0, explanation: '9÷3=3, x³÷x²=x. Result: 3x.' },
    { question: 'What is the difference of: (p² + 4p − 3) and (p² − 2p + 1)?', math: '(p² + 4p − 3) − (p² − 2p + 1)', options: ['6p − 4', '2p² + 2p − 2', '6p + 4', '2p − 4'], correct: 0, explanation: '(1−1)p² + (4−(−2))p + (−3−1) = 0 + 6p − 4 = 6p − 4.' },
    { question: 'Expand and simplify: (a + b)² = ?', math: '(a + b)²', options: ['a² + b²', 'a² + ab + b²', 'a² + 2ab + b²', '2a + 2b'], correct: 2, explanation: '(a+b)² = (a+b)(a+b) = a² + 2ab + b². This is a key identity!' },
];

const generateEquationQuestionsLinear1 = () => {
    const questions = [];
    const getNum = (min = 1, max = 12) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getC = (min = 1, max = 5) => Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < 10; i++) {
        const type = i % 5;
        let q, options, explanation;

        if (type === 0) {
            // ax = b
            let a = getC(), ans = getNum(), b = a * ans;
            q = `Solve: $${a}x = ${b}$`;
            options = [`$x = ${ans}$`, `$x = ${ans + a}$`, `$x = ${ans + 2}$`, `$x = ${Math.abs(ans - a) + 1}$`];
            explanation = `Divide both sides by $${a}$: $x = ${b} / ${a} = ${ans}$.`;
        } else if (type === 1) {
            // x + a = b
            let a = getNum(), ans = getNum(), b = ans + a;
            q = `Solve: $x + ${a} = ${b}$`;
            options = [`$x = ${ans}$`, `$x = ${ans + a}$`, `$x = ${b + a}$`, `$x = ${Math.max(1, ans - 2)}$`];
            explanation = `Subtract $${a}$ from both sides: $x = ${b} - ${a} = ${ans}$.`;
        } else if (type === 2) {
            // ax + b = c
            let a = getC(2, 6), b = getNum(), ans = getNum(), c = a * ans + b;
            q = `Solve: $${a}x + ${b} = ${c}$`;
            options = [`$x = ${ans}$`, `$x = ${ans + 1}$`, `$x = ${ans + 3}$`, `$x = ${Math.max(1, ans - 1)}$`];
            explanation = `Subtract $${b}$: $${a}x = ${c - b}$. Divide by $${a}$: $x = ${ans}$.`;
        } else if (type === 3) {
            // ax - b = c
            let a = getC(2, 6), b = getNum(), ans = getNum(), c = a * ans - b;
            q = `Solve: $${a}x - ${b} = ${c}$`;
            options = [`$x = ${ans}$`, `$x = ${ans + 2}$`, `$x = ${Math.max(1, ans - 1)}$`, `$x = ${ans + 4}$`];
            explanation = `Add $${b}$: $${a}x = ${c + b}$. Divide by $${a}$: $x = ${ans}$.`;
        } else {
            // x/a = b
            let a = getC(2, 5), ans = getNum(), b = ans; // We want ans to be the final result, so x/a = ans
            q = `Solve: $x / ${a} = ${b}$`;
            let trueAns = a * b;
            options = [`$x = ${trueAns}$`, `$x = ${b}$`, `$x = ${trueAns + a}$`, `$x = ${Math.max(1, trueAns - a)}$`];
            explanation = `Multiply both sides by $${a}$: $x = ${b} \\times ${a} = ${trueAns}$.`;
        }

        // Shuffle
        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q, math: '', options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateEquationQuestionsLinear2 = () => {
    const questions = [];
    const getVal = (min = 1, max = 8) => Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < 10; i++) {
        let x = getVal(), y = getVal(1, x); // Keep ans positive
        const type = i % 3;
        let q, options, explanation;

        if (type === 0) {
            // Standard elimination: x+y=a, x-y=b
            let a = x + y;
            let b = x - y;
            q = `Solve the system: $x + y = ${a}$ and $x - y = ${b}$`;
            options = [`$x=${x}, y=${y}$`, `$x=${x + 1}, y=${y + 1}$`, `$x=${y}, y=${x}$`, `$x=${x + 2}, y=${Math.max(0, y - 1)}$`];
            explanation = `Add equations directly: $2x = ${a + b} \\rightarrow x = ${x}$. Then $${x} + y = ${a} \\rightarrow y = ${y}$.`;
        } else if (type === 1) {
            // Substitution: y=cx, x+y=a
            let c = getVal(2, 4);
            let ny = c * x; // force y to be multiple
            let a = x + ny;
            q = `Use substitution: $y = ${c}x$ and $x + y = ${a}$`;
            options = [`$x=${x}, y=${ny}$`, `$x=${ny}, y=${x}$`, `$x=${x + 1}, y=${ny + 1}$`, `$x=${x + 2}, y=${ny + 2}$`];
            explanation = `Substitute $y$: $x + ${c}x = ${a} \\rightarrow ${c + 1}x = ${a} \\rightarrow x = ${x}$. Then $y = ${c}(${x}) = ${ny}$.`;
        } else {
            // General elimination: cx + y = a, dx - y = b
            let c = getVal(2, 4), d = getVal(2, 3);
            let a = c * x + y;
            let b = d * x - y;
            q = `Solve using elimination: $${c}x + y = ${a}$ and $${d}x - y = ${b}$`;
            options = [`$x=${x}, y=${y}$`, `$x=${x + 1}, y=${y}$`, `$x=${y}, y=${x}$`, `$x=${x + 2}, y=${y + 1}$`];
            explanation = `Add directly to eliminate $y$: $${c + d}x = ${a + b} \\rightarrow x = ${x}$. Then $${c}(${x}) + y = ${a} \\rightarrow ${c * x} + y = ${a} \\rightarrow y = ${y}$.`;
        }

        // Shuffle
        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q, math: '', options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
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
            // x^2 = c^2
            let c = getVal(3, 12);
            let c2 = c * c;
            q = `Solve the quadratic: $x^2 = ${c2}$`;
            options = [`$x = \\pm${c}$`, `$x = ${c}$ only`, `$x = ${c2}$`, `$x = \\pm${c + 1}$`];
            explanation = `Taking the square root of both sides gives a positive and negative answer: $x = \\pm${c}$.`;
        } else {
            // (x+a)(x+b) = x^2 + (a+b)x + ab = 0
            // Keep roots simple (negative roots means a and b are positive)
            let a = getVal(1, 6), b = getVal(1, 6);

            // Randomly flip signs for variety in questions
            if (Math.random() > 0.5) a = -a;
            if (Math.random() > 0.5) b = -b;

            let sum = a + b;
            let prod = a * b;

            // Format + - nicely
            let sumStr = sum === 0 ? '' : sum > 0 ? `+ ${sum}x` : `- ${Math.abs(sum)}x`;
            if (Math.abs(sum) === 1) sumStr = sum > 0 ? `+ x` : `- x`; // hide 1
            let prodStr = prod === 0 ? '' : prod > 0 ? `+ ${prod}` : `- ${Math.abs(prod)}`;

            q = `Solve by factoring: $x^2 ${sumStr} ${prodStr} = 0$`;

            // Answers are the roots: -a and -b
            let r1 = -a, r2 = -b;
            // Ensure unique representations in options
            if (r1 === r2) {
                options = [`$x = ${r1}$`, `$x = ${r1 + 2}$`, `$x = ${r1 - 2}$`, `$x = ${-r1}$`];
                explanation = `Factorise: $(x ${a > 0 ? '+' : ''}${a})^2 = 0$, so $x = ${r1}$.`;
            } else {
                options = [`$x = ${r1}$ or $x = ${r2}$`, `$x = ${-r1}$ or $x = ${-r2}$`, `$x = ${r1 + 1}$ or $x = ${r2 + 1}$`, `$x = ${r2}$ or $x = ${r1 - 2}$`];
                explanation = `Factorise: $(x ${a > 0 ? '+' : ''}${a})(x ${b > 0 ? '+' : ''}${b}) = 0$, so $x = ${r1}$ or $x = ${r2}$.`;
            }
        }

        // Shuffle
        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q, math: '', options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const equationAssessment = [
    { question: 'Solve: n − 13 = 5', math: 'n − 13 = 5', options: ['n = 18', 'n = 8', 'n = −8', 'n = 65'], correct: 0, explanation: 'Add 13 to both sides: n = 18.' },
    { question: 'Solve: 5y = 45', math: '5y = 45', options: ['y = 9', 'y = 225', 'y = 40', 'y = 5'], correct: 0, explanation: 'Divide by 5: y = 9.' },
    { question: 'Solve: 3x + 4 = 22', math: '3x + 4 = 22', options: ['x = 6', 'x = 8.67', 'x = 5', 'x = 26/3'], correct: 0, explanation: '3x = 18 → x = 6.' },
    { question: 'Use substitution: y = 2x, x + y = 9. Find x.', math: 'y = 2x, x + y = 9', options: ['x = 3', 'x = 4', 'x = 4.5', 'x = 6'], correct: 0, explanation: 'x + 2x = 9 → 3x = 9 → x = 3.' },
    { question: 'Solve: 2x + 3y = 12 and x = 3', math: '2x + 3y = 12, x = 3', options: ['y = 2', 'y = 3', 'y = 6', 'y = 1'], correct: 0, explanation: '6 + 3y = 12 → 3y = 6 → y = 2.' },
    { question: 'Solve the quadratic: x² − 7x + 12 = 0', math: 'x² − 7x + 12 = 0', options: ['$x = 3$ or $x = 4$', '$x = -3$ or $x = -4$', '$x = 1$ or $x = 12$', '$x = 6$ or $x = 2$'], correct: 0, explanation: 'Factorise: (x−3)(x−4) = 0 → x = 3 or x = 4.' },
    { question: 'A number doubled plus 4 equals 20. Find the number.', options: ['8', '12', '10', '6'], correct: 0, explanation: '2x + 4 = 20 → 2x = 16 → x = 8.' },
    { question: 'Solve: 4x − 2 = 3x + 5', math: '4x − 2 = 3x + 5', options: ['x = 7', 'x = 3', 'x = −3', 'x = 1'], correct: 0, explanation: '4x − 3x = 5 + 2 → x = 7.' },
    { question: 'What are the roots of x² − 4 = 0?', math: 'x² − 4 = 0', options: ['x = ±2', 'x = 4', '$x = 2$ only', 'x = ±4'], correct: 0, explanation: 'x² = 4 → x = ±2.' },
    { question: 'Solve: x/3 + 2 = 5', math: 'x/3 + 2 = 5', options: ['x = 9', 'x = 3', 'x = 21', 'x = 1'], correct: 0, explanation: 'x/3 = 3 → x = 9.' },
];

const subjectQuestions = [
    { question: 'Make x the subject: y = x + 5', math: 'y = x + 5  →  x = ?', options: ['x = y − 5', 'x = y + 5', 'x = 5 − y', 'x = y/5'], correct: 0, explanation: 'Subtract 5 from both sides: x = y − 5.' },
    { question: 'Make x the subject: y = 3x', math: 'y = 3x  →  x = ?', options: ['x = y + 3', 'x = y − 3', 'x = y/3', 'x = 3y'], correct: 2, explanation: 'Divide both sides by 3: x = y/3.' },
    { question: 'Make r the subject of the area formula: A = πr²', math: 'A = πr²  →  r = ?', options: ['r = A/π', 'r = √(A/π)', 'r = √(Aπ)', 'r = A²/π'], correct: 1, explanation: 'Divide by π: r² = A/π. Take square root: r = √(A/π).' },
    { question: 'Make b the subject: P = 2(l + b)', math: 'P = 2(l + b)  →  b = ?', options: ['b = P/2 − l', 'b = P − 2l', 'b = 2P − l', 'b = P + l'], correct: 0, explanation: 'Divide by 2: P/2 = l + b. Then b = P/2 − l.' },
    { question: 'Make v the subject: s = ut + ½at²', math: 's = ut + ½at²  →  u = ?', options: ['u = s/t + ½at', 'u = (s − ½at²)/t', 'u = s − at', 'u = s/t − a'], correct: 1, explanation: 'Subtract ½at²: ut = s − ½at². Divide by t: u = (s − ½at²)/t.' },
    { question: 'Make y the subject: 3x + 2y = 12', math: '3x + 2y = 12  →  y = ?', options: ['y = (12 − 3x)/2', 'y = 12 − 3x', 'y = 3x − 12', 'y = 12 + 3x'], correct: 0, explanation: '2y = 12 − 3x → y = (12 − 3x)/2.' },
    { question: 'Make h the subject: V = lbh', math: 'V = lbh  →  h = ?', options: ['h = V × lb', 'h = V/lb', 'h = V − lb', 'h = lb/V'], correct: 1, explanation: 'Divide both sides by lb: h = V/lb.' },
    { question: 'Make C the subject: F = (9/5)C + 32', math: 'F = (9/5)C + 32  →  C = ?', options: ['C = (F − 32) × 5/9', 'C = (F + 32) × 9/5', 'C = 5F/9 − 32', 'C = F − 32'], correct: 0, explanation: 'F − 32 = (9/5)C → C = (F − 32) × 5/9.' },
    { question: 'Make a the subject: v = u + at', math: 'v = u + at  →  a = ?', options: ['a = (v − u)t', 'a = (v − u)/t', 'a = v − u', 'a = vt − u'], correct: 1, explanation: 'v − u = at → a = (v − u)/t.' },
    { question: 'Make x the subject: y = (x + 2)/(x − 1)', math: 'y = (x + 2)/(x − 1)  →  x = ?', options: ['x = (2 + y)/(y − 1)', 'x = (y − 2)/(y + 1)', 'x = (2 − y)', 'x = y + 3'], correct: 0, explanation: 'y(x−1) = x+2 → yx − y = x + 2 → yx − x = y + 2 → x(y−1) = y+2 → x = (y+2)/(y−1).' },
];

const subjectAssessment = [
    { question: 'Make m the subject: E = mc²', math: 'E = mc²  →  m = ?', options: ['m = E/c²', 'm = Ec²', 'm = E − c²', 'm = E × c'], correct: 0, explanation: 'Divide both sides by c²: m = E/c².' },
    { question: 'Make x the subject: 5x − 3y = 10', math: '5x − 3y = 10  →  x = ?', options: ['x = (10 + 3y)/5', 'x = (10 − 3y)/5', 'x = 2 + 3y', 'x = 5(10 − 3y)'], correct: 0, explanation: '5x = 10 + 3y → x = (10 + 3y)/5.' },
    { question: 'Make t the subject: s = ½gt²', math: 's = ½gt²  →  t = ?', options: ['t = √(2s/g)', 't = 2s/g', 't = √(s/g)', 't = s/2g'], correct: 0, explanation: 'gt² = 2s → t² = 2s/g → t = √(2s/g).' },
    { question: 'If A = (h/2)(a + b), make h the subject', math: 'A = (h/2)(a + b)  →  h = ?', options: ['h = 2A/(a+b)', 'h = A(a+b)/2', 'h = 2A − (a+b)', 'h = A/2(a+b)'], correct: 0, explanation: '2A = h(a+b) → h = 2A/(a+b).' },
    { question: 'Make n the subject: S = n/2 × (a + l)', math: 'S = n/2 × (a+l)  →  n = ?', options: ['n = 2S/(a+l)', 'n = S(a+l)/2', 'n = 2S − (a+l)', 'n = (a+l)/2S'], correct: 0, explanation: '2S = n(a+l) → n = 2S/(a+l).' },
    { question: 'Make y the subject: ax + by = c', math: 'ax + by = c  →  y = ?', options: ['y = (c − ax)/b', 'y = c − ax', 'y = (c + ax)/b', 'y = c/b − a'], correct: 0, explanation: 'by = c − ax → y = (c − ax)/b.' },
    { question: 'What operation undoes squaring when changing subject?', options: ['Halving', 'Square root', 'Squaring again', 'Multiplying'], correct: 1, explanation: 'To undo x², take the square root: √(x²) = x (for x ≥ 0).' },
    { question: 'Make x subject: y = √(x + 4)', math: 'y = √(x + 4)  →  x = ?', options: ['x = y² − 4', 'x = y + 4', 'x = y² + 4', 'x = √y − 4'], correct: 0, explanation: 'Square both sides: y² = x + 4 → x = y² − 4.' },
    { question: 'Make l the subject: T = 2π√(l/g)', math: 'T = 2π√(l/g)  →  l = ?', options: ['l = gT²/4π²', 'l = 4π²T/g', 'l = gT/2π', 'l = T²g/2π'], correct: 0, explanation: 'T/2π = √(l/g) → T²/4π² = l/g → l = gT²/4π².' },
    { question: 'Make r the subject: C = 2πr', math: 'C = 2πr  →  r = ?', options: ['r = C/2π', 'r = 2πC', 'r = C − 2π', 'r = C²/2π'], correct: 0, explanation: 'Divide by 2π: r = C/(2π).' },
];

const generateRealLifeQuestions = () => {
    const questions = [];
    const getNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const varieties = [
        {
            // Farm Animals (Chickens & Sheep)
            create: () => {
                const s = getNum(5, 15); // sheep
                const c = getNum(10, 25); // chickens
                const totalAnimals = s + c;
                const totalLegs = (s * 4) + (c * 2);
                return {
                    image: '/algebra_animals_farm_legs_1772477660380.png',
                    question: `In a farm land, there are chickens ($2$ legs) and sheep ($4$ legs). The total number of animals is $${totalAnimals}$. The total number of legs is $${totalLegs}$. How many chickens and sheep are there?`,
                    options: [`${c} chickens, ${s} sheep`, `${s} chickens, ${c} sheep`, `${c - 2} chickens, ${s + 2} sheep`, `${c + 5} chickens, ${s - 5} sheep`],
                    correct: 0,
                    explanation: `Let $c$ = chickens and $s$ = sheep. \n1) $c + s = ${totalAnimals}$ \n2) $2c + 4s = ${totalLegs}$ \nSolve by substitution: $s = ${totalAnimals} - c$. \n$2c + 4(${totalAnimals} - c) = ${totalLegs} \\rightarrow 2c + ${4 * totalAnimals} - 4c = ${totalLegs} \\rightarrow -2c = ${totalLegs - (4 * totalAnimals)} \\rightarrow c = ${c}$.`
                };
            }
        },
        {
            // Movie Night (Tickets & Popcorn)
            create: () => {
                const tPrice = getNum(8, 12);
                const pPrice = getNum(5, 7);
                const count = getNum(2, 5);
                const total = (tPrice * count) + pPrice;
                return {
                    image: '/algebra_movie_tickets_snack_1772477693971.png',
                    question: `A group bought $${count}$ movie tickets and $1$ large popcorn for $${pPrice}$. The total bill was $${total}$. What is the price of one ticket?`,
                    options: [`$${tPrice}$`, `$${tPrice + 1}$`, `$${tPrice - 2}$`, `$${tPrice + 3}$`],
                    correct: 0,
                    explanation: `Let $x$ be the ticket price. \nEquation: $${count}x + ${pPrice} = ${total}$. \n$${count}x = ${total - pPrice} \\rightarrow x = ${(total - pPrice) / count}$.`
                };
            }
        },
        {
            // Bakery (Donuts & Muffins)
            create: () => {
                const d = getNum(3, 8);
                const m = getNum(3, 8);
                const dPrice = 2; // Fixed for simplicity
                const mPrice = 3;
                const total = (d * dPrice) + (m * mPrice);
                return {
                    image: '/algebra_bakery_donuts_muffins_1772477734417.png',
                    question: `At a bakery, donuts cost $\\$${dPrice}$ and muffins cost $\\$${mPrice}$. You bought a total of $${d + m}$ items for $${total}$. How many donuts did you buy?`,
                    options: [`${d}`, `${m}`, `${d + 1}`, `${d - 1}`],
                    correct: 0,
                    explanation: `Let $d$ = donuts, $m$ = muffins. \n1) $d + m = ${d + m}$ \n2) $${dPrice}d + ${mPrice}m = ${total}$ \nSubstitute $m = ${(d + m)} - d$: \n$${dPrice}d + ${mPrice}(${(d + m)} - d) = ${total} \\rightarrow ${dPrice}d + ${mPrice * (d + m)} - ${mPrice}d = ${total} \\rightarrow -d = ${total - (mPrice * (d + m))} \\rightarrow d = ${d}$.`
                };
            }
        },
        {
            // Taxi Fare
            create: () => {
                const base = getNum(3, 5);
                const perMile = getNum(2, 4);
                const miles = getNum(5, 15);
                const total = base + (perMile * miles);
                return {
                    question: `A taxi charges a flat fee of $\\$${base}$ plus $\\$${perMile}$ per mile. If the total fare was $\\$${total}$, how many miles did the taxi travel?`,
                    options: [`${miles} miles`, `${miles + 2} miles`, `${miles - 1} miles`, `${miles + 5} miles`],
                    correct: 0,
                    explanation: `Let $m$ be miles. \nEquation: $${base} + ${perMile}m = ${total}$. \n$${perMile}m = ${total - base} \\rightarrow m = ${(total - base) / perMile}$.`
                };
            }
        },
        {
            // Age Problem
            create: () => {
                const sis = getNum(8, 15);
                const me = sis + getNum(3, 6);
                const total = sis + me;
                return {
                    question: `I am older than my sister by $${me - sis}$ years. If the sum of our ages is $${total}$, how old am I?`,
                    options: [`${me} years`, `${sis} years`, `${me + 2} years`, `${sis - 1} years`],
                    correct: 0,
                    explanation: `Let sister = $s$, Me = $s + ${me - sis}$. \nSum: $s + (s + ${me - sis}) = ${total} \\rightarrow 2s + ${me - sis} = ${total} \\rightarrow 2s = ${total - (me - sis)} \\rightarrow s = ${sis}$. \nMe = ${sis} + ${me - sis} = ${me}$.`
                };
            }
        },
        {
            // Savings Goal
            create: () => {
                const saved = getNum(50, 150);
                const perWeek = getNum(10, 25);
                const goal = saved + (perWeek * getNum(4, 10));
                const weeks = (goal - saved) / perWeek;
                return {
                    question: `You have $\\$${saved}$ saved and earn $\\$${perWeek}$ per week. How many weeks will it take to reach $\\$${goal}$?`,
                    options: [`${weeks} weeks`, `${weeks + 1} weeks`, `${weeks - 2} weeks`, `${weeks + 3} weeks`],
                    correct: 0,
                    explanation: `Let $w$ be weeks. \nEquation: $${saved} + ${perWeek}w = ${goal}$. \n$${perWeek}w = ${goal - saved} \\rightarrow w = ${(goal - saved) / perWeek}$.`
                };
            }
        },
        {
            // Perimeter Problem
            create: () => {
                const w = getNum(5, 12);
                const l = w + getNum(2, 6);
                const p = 2 * (l + w);
                return {
                    question: `The length of a rectangle is $${l - w}$ cm more than its width. If the perimeter is $${p}$ cm, find the width.`,
                    options: [`${w} cm`, `${l} cm`, `${w + 2} cm`, `${w - 1} cm`],
                    correct: 0,
                    explanation: `Let width = $w$, length = $w + ${l - w}$. \nPerimeter = $2(w + w + ${l - w}) = ${p} \\rightarrow 2(2w + ${l - w}) = ${p} \\rightarrow 4w + ${2 * (l - w)} = ${p} \\rightarrow 4w = ${p - (2 * (l - w))} \\rightarrow w = ${w}$.`
                };
            }
        },
        {
            // Smartphone Battery
            create: () => {
                const start = 100;
                const dropPerHour = getNum(4, 8);
                const hours = getNum(3, 8);
                const remaining = start - (dropPerHour * hours);
                return {
                    question: `A phone starts with $${start}\\%$ battery and loses $${dropPerHour}\\%$ every hour. After how many hours will it have $${remaining}\\%$ battery left?`,
                    options: [`${hours} hours`, `${hours + 1} hours`, `${hours - 1.5} hours`, `${hours + 2} hours`],
                    correct: 0,
                    explanation: `Let $h$ be hours. \nEquation: $${start} - ${dropPerHour}h = ${remaining}$. \n$-${dropPerHour}h = ${remaining - start} \\rightarrow h = ${(remaining - start) / -dropPerHour}$.`
                };
            }
        },
        {
            // Shopping Sales
            create: () => {
                const orig = getNum(40, 100);
                const discount = getNum(10, 30);
                const final = orig - discount;
                return {
                    question: `You bought a shirt on sale for $\\$${final}$. If the price was discounted by $\\$${discount}$, what was the original price?`,
                    options: [`$\\$${orig}$`, `$\\$${final - discount}$`, `$\\$${orig + 10}$`, `$\\$${final}$`],
                    correct: 0,
                    explanation: `Original — Discount = Sale Price. \n$x - ${discount} = ${final} \\rightarrow x = ${final + discount} = ${orig}$.`
                };
            }
        },
        {
            // Bank Balance
            create: () => {
                const start = getNum(200, 500);
                const withdrawal = getNum(20, 50);
                const count = getNum(3, 6);
                const final = start - (withdrawal * count);
                return {
                    question: `A bank account has $\\$${start}$. After $${count}$ equal withdrawals, the balance is $\\$${final}$. How much was each withdrawal?`,
                    options: [`$\\$${withdrawal}$`, `$\\$${withdrawal + 5}$`, `$\\$${withdrawal - 10}$`, `$\\$${withdrawal + 15}$`],
                    correct: 0,
                    explanation: `Start — withdrawals = Final. \n$${start} - ${count}x = ${final} \\rightarrow -${count}x = ${final - start} \\rightarrow x = ${(final - start) / -count}$.`
                };
            }
        }
    ];

    for (let i = 0; i < 10; i++) {
        questions.push(varieties[i].create());
    }
    return questions;
};

const generateRealLifeAssessment = () => {
    return generateRealLifeQuestions();
};

const wordProblemQuestions = [
    { question: 'Translate to an equation: "Seven less than a number is fifteen". Let the number be $x$.', math: '', options: ['$x - 7 = 15$', '$7 - x = 15$', '$x + 7 = 15$', '$7x = 15$'], correct: 0, explanation: '"Seven less than" means you subtract 7 from the number ($x$). "Is" means equals. So, $x - 7 = 15$.' },
    { question: 'Translate to an equation: "The product of a number and $4$ is $20$". Let the number be $n$.', math: '', options: ['$n + 4 = 20$', '$4n = 20$', '$n/4 = 20$', '$n - 4 = 20$'], correct: 1, explanation: '"Product" means multiplication. "Is" means equals. So $4 \\times n = 20$, or $4n = 20$.' },
    { question: 'At a store, $5$ pens cost $\\$15$. Choose the correct equation to find the cost of one pen ($p$).', math: '', options: ['$p + 5 = 15$', '$5/p = 15$', '$5p = 15$', '$p - 5 = 15$'], correct: 2, explanation: 'Five pens times the cost of one pen ($p$) equals $15$. Therefore, $5p = 15$.' },
    { question: 'Translate: "Half of a number added to $6$ is $14$". Let the number be $y$.', math: '', options: ['$y/2 - 6 = 14$', '$y/2 + 6 = 14$', '$2y + 6 = 14$', '$y + 6 = 14$'], correct: 1, explanation: '"Half of a number" is $y/2$. "Added to 6" means $y/2 + 6$. "Is 14" makes it $y/2 + 6 = 14$.' },
    { question: 'A cab charges $\\$3$ to start, plus $\\$2$ per mile. If the ride costs $\\$15$, choose the equation to find the miles ($m$).', math: '', options: ['$2m + 3 = 15$', '$3m + 2 = 15$', '$m + 5 = 15$', '$2m - 3 = 15$'], correct: 0, explanation: 'The base fee is $3$. You add $2$ for every mile ($2m$). The total is $15$. So, $2m + 3 = 15$.' },
    { question: 'Translate: "Double a number, decreased by $4$, equals $10$". Let the number be $x$.', math: '', options: ['$2x + 4 = 10$', '$x/2 - 4 = 10$', '$2x - 4 = 10$', '$4x - 2 = 10$'], correct: 2, explanation: '"Double a number" is $2x$. "Decreased by 4" means subtract 4. So, $2x - 4 = 10$.' },
    { question: 'Maria has $5$ more apples than John. Together they have $15$ apples. If John has $x$ apples, which equation represents this?', math: '', options: ['$x + 5 = 15$', '$2x + 5 = 15$', '$x - 5 = 15$', '$2x - 5 = 15$'], correct: 1, explanation: 'John = $x$. Maria = $x + 5$. Together: $x + (x + 5) = 15$, which simplifies to $2x + 5 = 15$.' },
    { question: 'Translate: "The sum of a number and its square is $12$". Let the number be $k$.', math: '', options: ['$k + 2k = 12$', '$k + k^2 = 12$', '$k^2 - k = 12$', '$2k + k^2 = 12$'], correct: 1, explanation: '"Sum" means add. A number ($k$) plus its square ($k^2$) is $12$. So, $k + k^2 = 12$.' },
    { question: 'A rectangle is twice as long as it is wide. If the width is $w$, what is the equation for its perimeter ($P$)?', math: '', options: ['$P = 2w + w$', '$P = 4w$', '$P = 6w$', '$P = 3w$'], correct: 2, explanation: 'Length = $2w$, Width = $w$. Perimeter = $2 \\times$ Length + $2 \\times$ Width = $2(2w) + 2(w) = 4w + 2w = 6w$.' },
    { question: 'Sarah earns $\\$10$ an hour, plus a $\\$20$ bonus. If she made $\\$80$, what equation finds her hours ($h$)?', math: '', options: ['$20h + 10 = 80$', '$10h - 20 = 80$', '$10h + 20 = 80$', '$h + 30 = 80$'], correct: 2, explanation: 'Earnings = (rate $\\times$ hours) + bonus. Rate is $10$, bonus is $20$. So, $10h + 20 = 80$.' },
];

const wordProblemAssessment = [
    { question: 'Translate: "Nine more than three times a number is $24$". (Let number format = $n$)', math: '', options: ['$3n - 9 = 24$', '$3n + 9 = 24$', '$9n + 3 = 24$', '$3(n + 9) = 24$'], correct: 1, explanation: '"Three times a number" is $3n$. "Nine more than" means add 9. So, $3n + 9 = 24$.' },
    { question: 'A subscription costs $\\$10$ per month plus a $\\$5$ setup fee. To find the cost ($C$) for $m$ months, use:', math: '', options: ['$C = 5m + 10$', '$C = 10m - 5$', '$C = 15m$', '$C = 10m + 5$'], correct: 3, explanation: 'Monthly rate $\\times$ months ($10m$) + one-time fee ($5$) = Total Cost ($C$). So $C = 10m + 5$.' },
    { question: 'Translate to an expression: "The difference between twice a number and $8$". (number = $x$)', math: '', options: ['$2x - 8$', '$8 - 2x$', '$x/2 - 8$', '$2(x - 8)$'], correct: 0, explanation: '"Difference" means subtract. The order is given: "twice a number" ($2x$) minus $8$. Result: $2x - 8$.' },
    { question: 'A box of chocolates has $c$ pieces. You eat $4$ and have $16$ left. Which equation is correct?', math: '', options: ['$c + 4 = 16$', '$c - 4 = 16$', '$4c = 16$', '$c/4 = 16$'], correct: 1, explanation: 'Starting amount ($c$) minus what you ate ($4$) leaves $16$. So, $c - 4 = 16$.' },
    { question: 'Tom is $3$ years older than his sister. If they are $25$ years old combined, and his sister is $y$ years old, what equation represents this?', math: '', options: ['$y + 3 = 25$', '$2y + 3 = 25$', '$2y - 3 = 25$', '$y - 3 = 25$'], correct: 1, explanation: 'Sister = $y$. Tom = $y + 3$. Combined: $y + (y + 3) = 25$, which is $2y + 3 = 25$.' },
    { question: 'Translate: "One-third of a number is equal to $12$". (number = $n$)', math: '', options: ['$n - 3 = 12$', '$3n = 12$', '$n/3 = 12$', '$n + 3 = 12$'], correct: 2, explanation: '"One-third of" means dividing by $3$ (or multiplying by $1/3$). So, $n/3 = 12$.' },
    { question: 'Translate: "The quotient of a number and $5$ is $10$". (number = $x$)', math: '', options: ['$5x = 10$', '$x/5 = 10$', '$5/x = 10$', '$x - 5 = 10$'], correct: 1, explanation: '"Quotient" means division. $x$ divided by $5$ equals $10$. So $x/5 = 10$.' },
    { question: 'A pizza costs $\\$8$ and each topping is $\\$1.50$. If a pizza cost $\\$14$, which equation finds the number of toppings ($t$)?', math: '', options: ['$1.50t - 8 = 14$', '$8t + 1.50 = 14$', '$1.50t + 8 = 14$', '$9.50t = 14$'], correct: 2, explanation: 'Base pizza ($8$) plus toppings ($1.50 \\times t$) equals total ($14$). $1.50t + 8 = 14$.' },
    { question: 'Translate: "Four times the sum of a number and $2$ is $36$". (number = $x$)', math: '', options: ['$4x + 2 = 36$', '$4 + x + 2 = 36$', '$x + 8 = 36$', '$4(x + 2) = 36$'], correct: 3, explanation: '"Four times the sum" means you must add first, then multiply. Use parentheses! $4(x + 2) = 36$.' },
    { question: 'Ana saved $s$ dollars. Bob saved double what Ana saved. Together they have $\\$120$. Equation?', math: '', options: ['$2s = 120$', '$3s = 120$', '$s + 2 = 120$', '$s^2 = 120$'], correct: 1, explanation: 'Ana = $s$. Bob = $2s$. Together: $s + 2s = 120$. This simplifies to $3s = 120$.' },
];

export const SKILLS = [
    {
        id: 'exponents',
        title: 'Laws of Exponents',
        subtitle: 'Skill 1 · Simplifying Terms',
        icon: '⚡',
        color: '#6366f1',
        desc: 'Product, power, and zero laws to simplify expressions.',
        practice: exponentQuestions,
        assessment: exponentAssessment,
        learn: {
            concept: 'Exponents are shorthand for repeated multiplication. These 9 laws are the "grammar rules" of algebra that let you simplify even the scariest expressions.',
            rules: [
                { title: 'Product Law', f: 'x^a \\cdot x^b = x^{a+b}', d: 'When multiplying powers with the same base, ADD the exponents.', ex: 'x^3 \\cdot x^4 = x^{3+4} = x^7', tip: 'Think: 3 copies + 4 copies = 7 copies total!' },
                { title: 'Quotient Law', f: '\\frac{x^a}{x^b} = x^{a-b}', d: 'When dividing powers with the same base, SUBTRACT the bottom exponent from the top.', ex: '\\frac{y^8}{y^2} = y^{8-2} = y^6', tip: 'You are "canceling out" matching variables from the top and bottom.' },
                { title: 'Power Law', f: '(x^a)^b = x^{ab}', d: 'A power of a power? MULTIPLY the exponents together.', ex: '(x^2)^3 = x^{2 \\cdot 3} = x^6', tip: 'A group of powers being powered up grows very fast!' },
                { title: 'Power of Product', f: '(xy)^a = x^a y^a', d: 'Every factor inside the parentheses gets the power outside.', ex: '(2x)^3 = 2^3 x^3 = 8x^3', tip: 'Always remember to apply the power to the number (coefficient) too!' },
                { title: 'Power of Quotient', f: '\\left(\\frac{x}{y}\\right)^a = \\frac{x^a}{y^a}', d: 'The power applies to both the numerator (top) and denominator (bottom).', ex: '\\left(\\frac{x}{3}\\right)^2 = \\frac{x^2}{3^2} = \\frac{x^2}{9}', tip: 'Distribute the power to every part of the fraction.' },
                { title: 'Zero Law', f: 'x^0 = 1', d: 'Any non-zero base raised to the power of zero is ALWAYS 1.', ex: '525^0 = 1', tip: 'It doesn\'t matter how big the number is; power 0 makes it 1!' },
                { title: 'Identity Law', f: 'x^1 = x', d: 'Any base raised to the power of 1 remains the same.', ex: 'y^1 = y', tip: 'The exponent 1 is usually "invisible" in algebra.' },
                { title: 'Negative Law', f: 'x^{-n} = \\frac{1}{x^n}', d: 'A negative exponent means the "Reciprocal". It moves the base to the bottom.', ex: 'x^{-2} = \\frac{1}{x^2}', tip: 'Think of the minus sign as a ticket to cross the fraction line!' },
                { title: 'Fractional Law', f: 'x^{\\frac{a}{b}} = \\sqrt[b]{x^a}', d: 'Fractional powers are secretly roots. The bottom number is the root index.', ex: 'x^{\\frac{1}{2}} = \\sqrt{x}', tip: 'Bottom = Root. Top = Power.' },
            ]
        }
    },
    {
        id: 'liketerms',
        title: 'Identifying Like & Unlike Terms',
        subtitle: 'Skill 2',
        icon: '🤝',
        color: '#0891b2',
        desc: 'Combine matching variables and powers accurately.',
        practice: likeTermsQuestions,
        assessment: likeTermsAssessment,
        learn: {
            concept: 'Like terms are the mathematical equivalent of identical twins. To combine them, they must share the exact same variable part.',
            rules: [
                { title: 'Variable Match', f: '3x + 5x = 8x', d: 'Terms must have the SAME variable letters to be combined.', ex: '$3x + 4y$ stays as $3x + 4y$', tip: 'You can\'t add apples and oranges!' },
                { title: 'Power Match', f: 'x^2 + 2x^2 = 3x^2', d: 'Even if the letters match, the powers must also match EXACTLY.', ex: '$x^2 + x^3$ cannot be added', tip: 'Check the letters AND the tiny numbers above them.' },
                { title: 'Coefficient rule', f: '7a - 2a = 5a', d: 'Only add/subtract the coefficients (numbers in front). Keep the letters the same.', ex: '$5x^2 + 4x^2 = 9x^2$ (not $9x^4$)', tip: 'You are counting how many of that "item" you have.' },
                { title: 'Invisible Coeff.', f: 'x = 1x', d: 'If a variable has no number in front, its coefficient is secretly 1.', ex: '$x + 3x = 1x + 3x = 4x$', tip: 'Don\'t forget the 1!' },
            ]
        }
    },
    {
        id: 'expressions',
        title: 'Simplifying Expressions',
        subtitle: 'Skill 3',
        icon: '📝',
        color: '#f59e0b',
        desc: 'Solve multi-part algebraic phrases with ease.',
        practice: expressionQuestions,
        assessment: expressionAssessment,
        learn: {
            concept: 'Simplifying an expression means writing it in its shortest, most efficient form by combining all possible terms.',
            rules: [
                { title: 'Distribution', f: 'a(b + c) = ab + ac', d: 'Multiply the outside term by every term inside the parentheses.', ex: '3(x + 2) = 3x + 6', tip: 'Fairness rule: the term outside must visit everyone inside!' },
                { title: 'Combo Order', f: '\\text{Group } \\rightarrow \\text{ Combine}', d: 'First, rewrite the expression by grouping all like terms together.', ex: '3x + 5 + 2x = 3x + 2x + 5 = 5x + 5', tip: 'Organizing your terms first prevents mistakes.' },
                { title: 'Sign Safety', f: '-(x + y) = -x - y', d: 'A minus sign in front of a bracket flips the sign of EVERYTHING inside.', ex: '10 - (x + 3) = 10 - x - 3 = 7 - x', tip: 'Treat that minus sign like a multiplier of -1.' },
                { title: 'PEMDAS Rule', f: '\\text{Order Matters}', d: 'Always follow the standard order: Parentheses, Exponents, Mult/Div, Add/Sub.', ex: '2 + 3(x) \\neq 5x', tip: 'Multiplication comes before addition!' },
            ]
        }
    },
    {
        id: 'solving',
        title: 'Solving Equations',
        subtitle: 'Skill 4',
        icon: '⚖️',
        color: '#8b5cf6',
        desc: 'Finding the value of variables in different equation types.',
        assessment: equationAssessment,
        practiceCategories: [
            { id: 'linear1', title: 'Linear Equations (1 Variable)', questions: generateEquationQuestionsLinear1 },
            { id: 'linear2', title: 'Pair of Linear Equations (2 Vars)', questions: generateEquationQuestionsLinear2 },
            { id: 'quadratic', title: 'Quadratic Equations', questions: generateEquationQuestionsQuadratic }
        ],
        learn: {
            concept: 'Solving an equation is like balancing a scale. Whatever you do to one side, you must do to the other to keep it balanced.',
            rules: [
                { title: 'Inverse Ops.', f: '+ \\leftrightarrow -, \\times \\leftrightarrow /', d: 'Use the opposite operation to "undo" numbers. To move a $+5$, subtract $5$. To move a $\\times 4$, divide by $4$.', ex: '$x + 4 = 10 \\rightarrow x = 10 - 4 = 6$', tip: 'Addition and Subtraction are partners; Multiplication and Division are partners.' },
                { title: 'Isolation', f: 'x = \\text{Answer}', d: 'The goal is to get the variable all by itself on one side of the equals sign.', ex: '$2x = 12 \\rightarrow x = 6$', tip: 'Think of it as peeling an onion: remove the layers furthest from $x$ first.' },
                { title: 'Substitution', f: 'y = 2x, x+y=6', d: 'If you know what one variable equals, plug that expression into the other equation.', ex: '$x + (2x) = 6 \\rightarrow 3x = 6 \\rightarrow x=2$', tip: 'Substitution "merges" two equations into one manageable one.' },
                { title: 'Factoring', f: 'x^2 - 9 = (x-3)(x+3)', d: 'For quadratics, you can find the numbers that multiply to the end and add to the middle.', ex: '$x^2 - 5x + 6 = (x-2)(x-3) = 0$', tip: 'The solutions are the values that make either bracket equal to zero!' },
            ]
        }
    },
    {
        id: 'subject',
        title: 'Change of Subject',
        subtitle: 'Skill 5',
        icon: '🔄',
        color: '#ec4899',
        desc: 'Rearrange formulas to highlight a specific variable.',
        practice: subjectQuestions,
        assessment: subjectAssessment,
        learn: {
            concept: 'Changing the subject is like being a movie director—you decide which variable gets to be the "star" ($x = \\dots$).',
            rules: [
                { title: 'The Mirror Rule', f: 'a = b \\rightarrow b = a', d: 'You can swap the entire left and right sides without changing any signs.', ex: '10 = x + 2 \\text{ is same as } x + 2 = 10', tip: 'Swap sides first if it makes the problem look more familiar.' },
                { title: 'Reverse PEMDAS', f: '\\text{SADMEP}', d: 'When moving terms across the equals sign, undo Addition/Subtraction FIRST, then Mult/Div.', ex: '$y = 3x + 5 \\rightarrow y - 5 = 3x \\rightarrow (y-5)/3 = x$', tip: 'Peel away the terms outside the main "clump" first.' },
                { title: 'Square/Root', f: 'x^2 \\leftrightarrow \\sqrt{x}', d: 'To undo a square, take the square root. To undo a root, square both sides.', ex: '$A = l^2 \\rightarrow l = \\sqrt{A}$', tip: 'A square root "cancels" a square, like a key in a lock.' },
                { title: 'Fraction Clear', f: '\\frac{x}{y} = z \\rightarrow x = zy', d: 'If your subject is trapped in a fraction, multiply both sides by the denominator to free it.', ex: '$v = d/t \\rightarrow d = vt$', tip: 'Multiply everything by the bottom number to get a flat equation.' },
            ]
        }
    },
    {
        id: 'wordproblems',
        title: 'Word Problems',
        subtitle: 'Skill 6',
        icon: '🌍',
        color: '#10b981',
        desc: 'Apply algebra to real-life scenarios by converting words to math.',
        practice: wordProblemQuestions,
        assessment: wordProblemAssessment,
        learn: {
            concept: 'Word problems are just puzzles hiding in plain sight. They teach you how to translate English sentences into Math equations!',
            rules: [
                { title: 'Translate Words', f: '\\text{Sum} = +, \\text{Diff} = -, \\text{Prod} = \\times, \\text{Quot} = /', d: 'Turn English words into math symbols. Words like "total" or "more than" mean add. "Less than" or "difference" mean subtract.', ex: '"Five more than a number" becomes $x + 5$. "Twice a number" is $2x$.', tip: 'Read carefully, there are secret math code words everywhere!' },
                { title: 'Identify Variables', f: '\\text{Let } x = \\dots', d: 'Find what you don\'t know. That mystery becomes your variable ($x$, $y$, $c$, etc).', ex: '"How many apples did he buy?" Let $a$ be the number of apples.', tip: 'The question at the end usually tells you exactly what the variable should be.' },
                { title: 'Build the Equation', f: '\\text{Left Side} = \\text{Right Side}', d: 'Use your translated words to build a balanced equation. The word "is" almost always means "equals" ($=$).', ex: '"Three times a number is twelve" turns directly into $3x = 12$.', tip: 'The word "is" is your center point. Build around it.' },
                { title: 'Real-Life Scenarios', f: '\\text{Apply to the real world!}', d: 'You can use Algebra to solve money problems, time limits, distance traveled, and more!', ex: 'If $3$ tickets cost $\\$15$, we set up $3t = 15$. Divide by $3$, so $t = 5$ dollars each!', tip: 'Always check if your final answer makes real-world sense. (You can\'t buy $-2$ apples!)' },
            ]
        }
    },
    {
        id: 'reallife',
        title: 'Algebra in Action',
        subtitle: 'Skill 7 · Real Life',
        icon: '🌟',
        color: '#f43f5e',
        desc: 'Solve exciting real-world mysteries using the power of Algebra.',
        practice: generateRealLifeQuestions,
        assessment: generateRealLifeAssessment,
        learn: {
            concept: 'Algebra is not just about $x$ and $y$ on paper. It is a superpower that helps you solve real-world mysteries—from counting animals to managing money!',
            rules: [
                { title: 'The Identity Rule', f: '\\text{Mystery} = x', d: 'The first step is always identifying the "unknown" and giving it a name (like $x$).', ex: '"Find the number of chickens" $\\rightarrow$ Let $x$ = chickens.', tip: 'Giving the mystery a name makes it solvable!' },
                { title: 'The Translation', f: '\\text{Words} \\rightarrow \\text{Math}', d: 'Convert real-world clues into math equations.', ex: '"Double the price plus $\\$5$" $\\rightarrow$ $2p + 5$.', tip: 'Look for keywords like "total", "more than", or "is".' },
                { title: 'The Balance', f: '\\text{LHS} = \\text{RHS}', d: 'Equations must always stay balanced. Ensure your "Total" clue is on one side.', ex: '$2c + 4s = 92$ (Total legs).', tip: 'The equals sign is the center of your real-world scale.' },
                { title: 'Verification', f: '\\text{Check your Answer}', d: 'Always plug your answer back into the story to see if it makes sense.', ex: 'If you find $5$ chickens, check if $5$ chickens have the right number of legs!', tip: 'Common sense is a great math tool!' },
            ]
        }
    }
];

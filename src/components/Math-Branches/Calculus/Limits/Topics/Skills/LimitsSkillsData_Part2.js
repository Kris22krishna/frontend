const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuf = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; }
    return a;
};
const qMaker = (question, correctAnswer, distractors, explanation) => {
    const options = [correctAnswer, ...distractors];
    const shuffled = shuf(options);
    return { question, options: shuffled, correct: shuffled.indexOf(correctAnswer), explanation };
};

/* ==============================================================================
   SKILL 3 — TRIGONOMETRIC & EXPONENTIAL LIMITS
   ============================================================================== */
export const genSkill3Q = () => {
    const questions = [];

    // sin(ax)/bx
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 7);
        const b = randInt(2, 7);
        questions.push(qMaker(
            `Find $\\lim_{x \\to 0} \\frac{\\sin(${a}x)}{${b}x}$`,
            `$\\frac{${a}}{${b}}$`,
            [`$\\frac{${b}}{${a}}$`, `$0$`, `$1$`],
            `Using the standard limit $\\lim_{x \\to 0} \\frac{\\sin(kx)}{kx} = 1$, the limit is $\\frac{${a}}{${b}}$.`
        ));
    }

    // tan(ax)/bx
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 5);
        const b = randInt(3, 8);
        questions.push(qMaker(
            `Find $\\lim_{x \\to 0} \\frac{\\tan(${a}x)}{${b}x}$`,
            `$\\frac{${a}}{${b}}$`,
            [`$\\frac{${b}}{${a}}$`, `$0$`, `$\\infty$`],
            `Since $\\tan x \\approx x$ near 0, the limit $\\lim_{x \\to 0} \\frac{\\tan(ax)}{bx} = \\frac{a}{b}$. Answer is $\\frac{${a}}{${b}}$.`
        ));
    }

    // (1-cos(x))/x^2
    for (let i = 0; i < 6; i++) {
        const a = randInt(2, 6);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to 0} \\frac{1 - \\cos(${a}x)}{x^2}$`,
            `$\\frac{${a*a}}{2}$`,
            [`$${a*a}$`, `$0$`, `$\\frac{${a}}{2}$`],
            `Multiply by conjugate to get $\\frac{\\sin^2(${a}x)}{x^2(1+\\cos(${a}x))}$. Uses standard lim $\\sin^2(${a}x)/x^2 \\to ${a}^2$ and $1/2$. So $\\frac{${a*a}}{2}$.`
        ));
    }

    // e^(kx) - 1 / x
    for (let i = 0; i < 8; i++) {
        const k = randInt(2, 9);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to 0} \\frac{e^{${k}x} - 1}{x}$`,
            `$${k}$`,
            [`$\\frac{1}{${k}}$`, `$1$`, `$e^{${k}}$`],
            `Using the standard exponential limit $\\lim_{x \\to 0} \\frac{e^{kx} - 1}{x} = k$.`
        ));
    }

    // ln(1+kx)/x
    for (let i = 0; i < 6; i++) {
        const k = randInt(2, 6);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to 0} \\frac{\\ln(1 + ${k}x)}{x}$`,
            `$${k}$`,
            [`$\\ln(${k})$`, `$1$`, `$0$`],
            `Standard logarithmic limit $\\lim_{x \\to 0} \\frac{\\ln(1+kx)}{x} = k$.`
        ));
    }

    // 1^\infty form: (1 + ax)^(1/x)
    for (let i = 0; i < 6; i++) {
        const a = randInt(2, 5);
        questions.push(qMaker(
            `Find $\\lim_{x \\to 0} (1 + ${a}x)^{\\frac{1}{x}}$`,
            `$e^{${a}}$`,
            [`$e$`, `$1$`, `$\\frac{1}{e^{${a}}}$`],
            `For $1^{\\infty}$ limits of form $(1 + ax)^{1/x}$, the result is $e^a$.`
        ));
    }

    return shuf(questions).slice(0, 20);
};

export const genSkill3A = () => {
    const questions = [];

    // sin(ax)/x
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 9);
        questions.push(qMaker(
            `Find $\\lim_{x \\to 0} \\frac{\\sin(${a}x)}{x}$`,
            `$${a}$`,
            [`$\\frac{1}{${a}}$`, `$0$`, `$1$`],
            `By standard limits, this evaluates to ${a}.`
        ));
    }

    // e^x - 1 / kx
    for (let i = 0; i < 8; i++) {
        const k = randInt(2, 8);
        questions.push(qMaker(
            `Find $\\lim_{x \\to 0} \\frac{e^x - 1}{${k}x}$`,
            `$\\frac{1}{${k}}$`,
            [`$${k}$`, `$1$`, `$0$`],
            `We can pull out $\\frac{1}{${k}}$, leaving the standard limit which is $1$. So $\\frac{1}{${k}}$.`
        ));
    }

    // 1^\infty 
    for (let i = 0; i < 8; i++) {
        const k = randInt(2, 6);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to \\infty} \\left(1 + \\frac{${k}}{x}\\right)^x$`,
            `$e^{${k}}$`,
            [`$1$`, `$e$`, `$\\infty$`],
            `Standard limit definition of $e$: $\\lim_{x \\to \\infty} (1 + k/x)^x = e^k$.`
        ));
    }

    // tan/sin
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 5);
        const b = randInt(6, 9);
        questions.push(qMaker(
            `Find $\\lim_{x \\to 0} \\frac{\\tan(${a}x)}{\\sin(${b}x)}$`,
            `$\\frac{${a}}{${b}}$`,
            [`$\\frac{${b}}{${a}}$`, `$0$`, `$1$`],
            `Divide numerator and denominator by $x$. This gives limit $\\frac{a}{b}$.`
        ));
    }

    return shuf(questions).slice(0, 20);
};

/* ==============================================================================
   SKILL 4 — LIMITS AT INFINITY
   ============================================================================== */
export const genSkill4Q = () => {
    const questions = [];

    // Lim_{x->inf} 1/x^n = 0
    for (let i = 0; i < 8; i++) {
        const k = randInt(2, 20);
        questions.push(qMaker(
            `Find $\\lim_{x \\to \\infty} \\frac{${k}}{x^2}$`,
            `$0$`,
            [`$${k}$`, `$\\infty$`, `$1$`],
            `As $x$ grows infinitely large, $\\frac{${k}}{x^2}$ shrinks to $0$.`
        ));
    }

    // Ratio of leading terms: equal degree
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 7);
        const b = randInt(2, 6);
        const c = randInt(1, 9);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to \\infty} \\frac{${a}x^2 - ${c}}{${b}x^2 + x}$`,
            `$\\frac{${a}}{${b}}$`,
            [`$0$`, `$\\infty$`, `$\\frac{-${c}}{1}$`],
            `Degrees match ($x^2$). The limit is the ratio of their leading coefficients: $\\frac{${a}}{${b}}$.`
        ));
    }

    // Ratio: bottom heavy
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 6);
        const b = randInt(3, 9);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to \\infty} \\frac{${a}x^2 + 5}{${b}x^3 - x}$`,
            `$0$`,
            [`$\\infty$`, `$\\frac{${a}}{${b}}$`, `$1$`],
            `Denominator degree (3) is larger than numerator degree (2). The fraction approaches $0$.`
        ));
    }

    // Ratio: top heavy
    for (let i = 0; i < 6; i++) {
        const a = randInt(2, 5);
        questions.push(qMaker(
            `Find $\\lim_{x \\to \\infty} \\frac{${a}x^4 - x^2}{2x^2 + 1}$`,
            `$\\infty$`,
            [`$0$`, `$\\frac{${a}}{2}$`, `$-1$`],
            `Numerator degree (4) > denominator degree (2). The expression grows unbounded, so $\\infty$.`
        ));
    }

    // sqrt(x^2 + ax) - x
    for (let i = 0; i < 6; i++) {
        const a = randInt(2, 8);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to \\infty} (\\sqrt{x^2 + ${a}x} - x)$`,
            `$\\frac{${a}}{2}$`,
            [`$${a}$`, `$0$`, `$\\infty$`],
            `Multiply and divide by the conjugate: $\\frac{x^2+${a}x - x^2}{\\sqrt{x^2+${a}x} + x} = \\frac{${a}x}{\\sqrt{x^2} + x} = \\frac{${a}}{2}$.`
        ));
    }

    return shuf(questions).slice(0, 20);
};

export const genSkill4A = () => {
    const questions = [];

    // equal degree rational
    for (let i = 0; i < 8; i++) {
        const a = randInt(3, 9);
        const b = randInt(2, 5);
        questions.push(qMaker(
            `Find $\\lim_{x \\to \\infty} \\frac{${a}x^3 - 4x}{${b}x^3 + 7}$`,
            `$\\frac{${a}}{${b}}$`,
            [`$0$`, `$\\infty$`, `$-\\frac{4}{7}$`],
            `Same degree. Ratio of leading terms $${a}x^3 / ${b}x^3 = \\frac{${a}}{${b}}$.`
        ));
    }

    // bottom heavy
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 8);
        questions.push(qMaker(
            `Find $\\lim_{x \\to -\\infty} \\frac{${a}x}{x^2 + 1}$`,
            `$0$`,
            [`$-\\infty$`, `$\\frac{${a}}{1}$`, `$\\infty$`],
            `Denominator grows much faster than numerator. Approaches $0$.`
        ));
    }

    // sqrt over x
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 8);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to \\infty} \\frac{\\sqrt{${a * a}x^2 + 1}}{x}$`,
            `$${a}$`,
            [`$-${a}$`, `$0$`, `$\\infty$`],
            `For large positive $x$, $\\sqrt{x^2} = x$. Ratio of leading terms is $\\frac{${a}x}{x} = ${a}$.`
        ));
    }

    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 7);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to -\\infty} \\frac{\\sqrt{${a * a}x^2 + 1}}{x}$`,
            `$-${a}$`,
            [`$${a}$`, `$0$`, `$-\\infty$`],
            `As $x \\to -\\infty$, $\\sqrt{x^2} = -x$. Leading term ratio is $\\frac{${a}(-x)}{x} = -${a}$.`
        ));
    }

    return shuf(questions).slice(0, 20);
};

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
   SKILL 5 — ADVANCED LIMIT TECHNIQUES
   ============================================================================== */
export const genSkill5Q = () => {
    const questions = [];

    // L'Hopital's Rule
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 5);
        const ans = 2 * a;
        questions.push(qMaker(
            `Use L'Hôpital's rule on $\\lim_{x \\to ${a}} \\frac{x^2 - ${a*a}}{x - ${a}}$`,
            `$${ans}$`,
            [`$${a}$`, `$${a*a}$`, `$1$`],
            `Indeterminate form 0/0. Take derivative: $\\frac{2x}{1}$. Substitute $x = ${a}$ to get ${ans}.`
        ));
    }

    for (let i = 0; i < 8; i++) {
        const k = randInt(2, 6);
        questions.push(qMaker(
            `Use L'Hôpital's rule on $\\lim_{x \\to 0} \\frac{\\sin(${k}x)}{x}$`,
            `$${k}$`,
            [`$\\frac{1}{${k}}$`, `$0$`, `$1$`],
            `Form 0/0. Derivative is $\\frac{${k}\\cos(${k}x)}{1}$. At $x=0$, it is ${k}.`
        ));
    }

    // Substitution method x = a + h
    for (let i = 0; i < 6; i++) {
        const a = randInt(1, 5);
        questions.push(qMaker(
            `If we substitute $x = ${a} + h$, what does the limit $\\lim_{x \\to ${a}}$ become?`,
            `$\\lim_{h \\to 0}$`,
            [`$\\lim_{h \\to ${a}}$`, `$\\lim_{h \\to \\infty}$`, `$\\lim_{h \\to 1}$`],
            `As $x \\to ${a}$, the difference $h = x - ${a}$ approaches $0$.`
        ));
    }

    for (let i = 0; i < 8; i++) {
        const a = randInt(1, 4);
        questions.push(qMaker(
            `Using $x = ${a} + h$, evaluate $\\lim_{x \\to ${a}} (${a}x)$`,
            `$${a*a}$`,
            [`$${2*a}$`, `$0$`, `$h$`],
            `Replace $x$: $\\lim_{h \\to 0} ${a}(${a} + h)$. As $h \\to 0$, we get ${a*a}.`
        ));
    }

    // Squeeze Theorem
    for (let i = 0; i < 8; i++) {
        const k = randInt(2, 7);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to 0} x^2 \\sin\\left(\\frac{${k}}{x}\\right)$`,
            `$0$`,
            [`$${k}$`, `$\\infty$`, `Does Not Exist`],
            `By Squeeze Theorem, $-x^2 \\le x^2 \\sin(k/x) \\le x^2$. Since both $-x^2$ and $x^2 \\to 0$ as $x \\to 0$, the limit is $0$.`
        ));
    }

    return shuf(questions).slice(0, 20);
};

export const genSkill5A = () => {
    const questions = [];

    // L'Hopital
    for (let i = 0; i < 10; i++) {
        const k = randInt(2, 6);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to 0} \\frac{e^{${k}x} - 1}{x}$ using L'Hôpital's rule.`,
            `$${k}$`,
            [`$\\frac{1}{${k}}$`, `$1$`, `$e^{${k}}$`],
            `Form 0/0. Differentiate to get $\\frac{${k}e^{${k}x}}{1}$. At $x=0$, it evaluates to ${k}.`
        ));
    }

    // Squeeze Theorem conceptual
    for (let i = 0; i < 10; i++) {
        const L = randInt(3, 9);
        questions.push(qMaker(
            `If $f(x) \\le g(x) \\le h(x)$ and $\\lim_{x \\to a} f(x) = ${L}$ and $\\lim_{x \\to a} h(x) = ${L}$, what is $\\lim_{x \\to a} g(x)$?`,
            `$${L}$`,
            [`$0$`, `$\\infty$`, `Cannot be determined`],
            `By the Squeeze Theorem, if a function is bounded by two functions that have the same limit, it must share that limit.`
        ));
    }

    // Squeeze Theorem applied
    for (let i = 0; i < 6; i++) {
        const a = randInt(2, 5);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to 0} |x|^{${a}} \\cos\\left(\\frac{1}{x}\\right)$`,
            `$0$`,
            [`$${a}$`, `$1$`, `Does Not Exist`],
            `Cosine oscillates between -1 and 1. The $|x|^${a}$ term converges to 0, "squeezing" the whole expression to 0.`
        ));
    }

    return shuf(questions).slice(0, 20);
};

/* ==============================================================================
   SKILL 6 — ONE-SIDED LIMITS
   ============================================================================== */
export const genSkill6Q = () => {
    const questions = [];

    // Limit exists condition
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 8);
        questions.push(qMaker(
            `For $\\lim_{x \\to ${a}} f(x)$ to exist, what must be true?`,
            `$\\lim_{x \\to ${a}^-} f(x) = \\lim_{x \\to ${a}^+} f(x)$`,
            [`$\\lim_{x \\to ${a}^-} f(x) < \\lim_{x \\to ${a}^+} f(x)$`, `$f(${a}) = 0$`, `The function must be continuous everywhere`],
            `A unified limit exists if and only if both the Left-Hand Limit (LHL) and Right-Hand Limit (RHL) exist and are equal.`
        ));
    }

    // LHL vs RHL values
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 5);
        const lhl = randInt(3, 7);
        const rhl = lhl + randInt(1, 4); // disjoint
        questions.push(qMaker(
            `If $\\lim_{x \\to ${a}^-} f(x) = ${lhl}$ and $\\lim_{x \\to ${a}^+} f(x) = ${rhl}$, what is $\\lim_{x \\to ${a}} f(x)$?`,
            `Does Not Exist`,
            [`$${lhl}$`, `$${rhl}$`, `$${lhl + rhl}$`],
            `Since LHL (${lhl}) $\\neq$ RHL (${rhl}), the overall limit does not exist.`
        ));
    }

    // Absolute value jumps
    for (let i = 0; i < 8; i++) {
        const a = randInt(1, 6);
        questions.push(qMaker(
            `Evaluate the right-hand limit $\\lim_{x \\to ${a}^+} \\frac{|x - ${a}|}{x - ${a}}$`,
            `$1$`,
            [`$-1$`, `$0$`, `Does Not Exist`],
            `For $x > ${a}$, $|x - ${a}| = (x - ${a})$. So the ratio is exactly 1.`
        ));
    }

    for (let i = 0; i < 6; i++) {
        const a = randInt(1, 6);
        questions.push(qMaker(
            `Evaluate the left-hand limit $\\lim_{x \\to ${a}^-} \\frac{|x - ${a}|}{x - ${a}}$`,
            `$-1$`,
            [`$1$`, `$0$`, `Does Not Exist`],
            `For $x < ${a}$, $|x - ${a}| = -(x - ${a})$. So the ratio is exactly -1.`
        ));
    }

    return shuf(questions).slice(0, 20);
};

export const genSkill6A = () => {
    const questions = [];

    // Piecewise function
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 4);
        const topAns = a * a; // from x^2
        const botAns = a + 2; // from x + 2
        questions.push(qMaker(
            `Let $f(x) = \\begin{cases} x^2 & x < ${a} \\\\ x+2 & x \\ge ${a} \\end{cases}$. Find $\\lim_{x \\to ${a}^-} f(x)$.`,
            `$${topAns}$`,
            [`$${botAns}$`, `Does Not Exist`, `$0$`],
            `For $x \\to ${a}^-$, use $x < ${a}$ rule: $x^2 = ${a}^2 = ${topAns}$.`
        ));
    }

    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 4);
        const botAns = a * 3; // from 3x
        questions.push(qMaker(
            `Let $f(x) = \\begin{cases} x^2 & x < ${a} \\\\ 3x & x \\ge ${a} \\end{cases}$. Find $\\lim_{x \\to ${a}^+} f(x)$.`,
            `$${botAns}$`,
            [`$${a * a}$`, `Does Not Exist`, `$1$`],
            `For $x \\to ${a}^+$, use $x \\ge ${a}$ rule: $3x = 3(${a}) = ${botAns}$.`
        ));
    }

    // Absolute value overall limit
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 9);
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to ${a}} \\frac{|x - ${a}|}{x - ${a}}$`,
            `Does Not Exist`,
            [`$1$`, `$-1$`, `$0$`],
            `LHL is -1, RHL is 1. Since LHL $\\neq$ RHL, the overall limit DNE.`
        ));
    }

    // Bracket/Integer limit conceptually
    for (let i = 0; i < 6; i++) {
        const a = randInt(2, 6);
        questions.push(qMaker(
            `Let $f(x) = \\lfloor x \\rfloor$ be the greatest integer function. Find $\\lim_{x \\to ${a}^+} \\lfloor x \\rfloor$.`,
            `$${a}$`,
            [`$${a - 1}$`, `$0$`, `Does Not Exist`],
            `If you approach $${a}$ from the right (e.g., ${a}.0001), the floor is $${a}$.`
        ));
    }

    for (let i = 0; i < 6; i++) {
        const a = randInt(2, 6);
        questions.push(qMaker(
            `Let $f(x) = \\lfloor x \\rfloor$ be the greatest integer function. Find $\\lim_{x \\to ${a}^-} \\lfloor x \\rfloor$.`,
            `$${a - 1}$`,
            [`$${a}$`, `$0$`, `Does Not Exist`],
            `If you approach $${a}$ from the left (e.g., ${a - 1}.9999), the floor drops down to $${a - 1}$.`
        ));
    }

    return shuf(questions).slice(0, 20);
};

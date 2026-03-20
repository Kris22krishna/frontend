

// Helper function to generate mathUtils if it doesn't exist, although we already have them implemented.
// Reverting to inline helpers to avoid import issues if mathUtils isn't fully set up for limits yet.

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
   SKILL 1 — SUBSTITUTION & SIMPLIFICATION 
   ============================================================================== */
export const genSkill1Q = () => {
    const questions = [];

    // Direct substitution lim_{x→a} (bx + c)
    for (let i = 0; i < 8; i++) {
        const a = randInt(1, 8);
        const b = randInt(2, 7);
        const c = randInt(-5, 10);
        const ans = b * a + c;
        questions.push(qMaker(
            `Find $\\lim_{x \\to ${a}} (${b}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)})$`,
            `$${ans}$`,
            [`$${ans + b}$`, `$${ans - c}$`, `$${b * (a + 1) + c}$`],
            `Substitute $x = ${a}$: $${b}(${a}) ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = ${ans}$.`
        ));
    }

    // Direct substitution lim_{x→a} x^2
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 6);
        const ans = a * a;
        questions.push(qMaker(
            `Find $\\lim_{x \\to ${a}} x^2$`,
            `$${ans}$`,
            [`$${2 * a}$`, `$${ans + a}$`, `$${a}$`],
            `Substitute $x = ${a}$: $${a}^2 = ${ans}$.`
        ));
    }

    // Direct substitution lim_{x→a} (cx^2 + dx)
    for (let i = 0; i < 8; i++) {
        const a = randInt(1, 5);
        const b = randInt(2, 6);
        const ans = a * a + b * a;
        questions.push(qMaker(
            `Find $\\lim_{x \\to ${a}} (x^2 + ${b}x)$`,
            `$${ans}$`,
            [`$${a * a}$`, `$${b * a}$`, `$${ans + b}$`],
            `Substitute $x = ${a}$: $${a}^2 + ${b}(${a}) = ${a * a} + ${b * a} = ${ans}$.`
        ));
    }

    // Constant rules
    for (let i = 0; i < 8; i++) {
        const a = randInt(3, 15);
        const k = randInt(2, 9);
        questions.push(qMaker(
            `Find $\\lim_{x \\to ${a}} ${k}$`,
            `$${k}$`,
            [`$${a}$`, `$0$`, `$${a * k}$`],
            `The limit of a constant is the constant itself. Therefore, the answer is ${k}.`
        ));
    }

    return shuf(questions).slice(0, 20);
};

export const genSkill1A = () => {
    const questions = [];

    for (let i = 0; i < 10; i++) {
        const a = randInt(1, 6);
        const b = randInt(2, 8);
        const c = randInt(-4, 8);
        const ans = b * a + c;
        questions.push(qMaker(
            `Evaluate: $\\lim_{x \\to ${a}} (${b}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)})$`,
            `$${ans}$`,
            [`$${ans + 2}$`, `$${b + a}$`, `$${ans - b}$`],
            `Direct substitution: $${b}(${a}) ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = ${ans}$.`
        ));
    }

    for (let i = 0; i < 10; i++) {
        const a = randInt(1, 5);
        const ans = a * a + a;
        questions.push(qMaker(
            `Evaluate: $\\lim_{x \\to ${a}} (x^2 + x)$`,
            `$${ans}$`,
            [`$${a * a}$`, `$${2 * a}$`, `$${ans + a}$`],
            `Substitute $x = ${a}$: $${a}^2 + ${a} = ${ans}$.`
        ));
    }

    for (let i = 0; i < 8; i++) {
        const a = randInt(1, 4);
        const k = randInt(2, 5);
        const ans = k * a * a * a;
        questions.push(qMaker(
            `Evaluate: $\\lim_{x \\to ${a}} ${k}x^3$`,
            `$${ans}$`,
            [`$${k * 3 * a * a}$`, `$${ans + k}$`, `$${k * a}$`],
            `Substitute $x = ${a}$: $${k}(${a})^3 = ${k}(${a*a*a}) = ${ans}$.`
        ));
    }

    return shuf(questions).slice(0, 20);
};

/* ==============================================================================
   SKILL 2 — INDETERMINATE FORMS (0/0)
   ============================================================================== */
export const genSkill2Q = () => {
    const questions = [];

    // Factoring diff of squares: lim_{x->a} (x^2 - a^2)/(x - a)
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 8);
        const ans = 2 * a;
        questions.push(qMaker(
            `Find $\\lim_{x \\to ${a}} \\frac{x^2 - ${a * a}}{x - ${a}}$`,
            `$${ans}$`,
            [`$${a}$`, `$${a * a}$`, `Does Not Exist`],
            `Substitute $x = ${a}$ gives $\\frac{0}{0}$. Factor numerator: $\\frac{(x-${a})(x+${a})}{x-${a}} = x + ${a}$. Substitute $x = ${a}$ to get ${ans}.`
        ));
    }

    // Factoring quadratic trinomial: lim_{x->a} (x^2 + (b-a)x - ab)/(x - a)
    for (let i = 0; i < 8; i++) {
        const a = randInt(1, 5); // root in denominator
        const b = randInt(1, 6); // other root is -b
        const mid = b - a;
        const last = -(a * b);
        const ans = a + b;
        const midTerm = mid === 0 ? '' : mid === 1 ? '+ x' : mid === -1 ? '- x' : mid > 0 ? `+ ${mid}x` : `- ${Math.abs(mid)}x`;
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to ${a}} \\frac{x^2 ${midTerm} - ${Math.abs(last)}}{x - ${a}}$`,
            `$${ans}$`,
            [`$${a}$`, `$${b}$`, `Does Not Exist`],
            `Numerator factors as $(x-${a})(x+${b})$. Cancel $(x-${a})$ to get $\\lim_{x \\to ${a}} (x+${b}) = ${ans}$.`
        ));
    }

    // Rationalization: lim_{x->a} (sqrt(x) - sqrt(a)) / (x - a)
    for (let i = 0; i < 8; i++) {
        const a = randInt(4, 9); // perfect square not required since we just leave it in sqrt
        questions.push(qMaker(
            `Find $\\lim_{x \\to ${a}} \\frac{\\sqrt{x} - \\sqrt{${a}}}{x - ${a}}$`,
            `$\\frac{1}{2\\sqrt{${a}}}$`,
            [`$0$`, `$\\frac{1}{\\sqrt{${a}}}$`, `Does Not Exist`],
            `Multiply by conjugate $\\frac{\\sqrt{x} + \\sqrt{${a}}}{\\sqrt{x} + \\sqrt{${a}}}$. Numerator becomes $(x - ${a})$, which cancels with the denominator. Leaves $\\frac{1}{\\sqrt{x} + \\sqrt{${a}}} = \\frac{1}{2\\sqrt{${a}}}$.`
        ));
    }

    // Factor x^3 - a^3
    for (let i = 0; i < 6; i++) {
        const a = randInt(2, 4);
        const a3 = a*a*a;
        const ans = 3*a*a;
        questions.push(qMaker(
            `Find $\\lim_{x \\to ${a}} \\frac{x^3 - ${a3}}{x - ${a}}$`,
            `$${ans}$`,
            [`$${a*a}$`, `$${2*a}$`, `Does Not Exist`],
            `Factor difference of cubes: $(x-${a})(x^2+${a}x+${a*a})$. Canceling $(x-${a})$ leaves $x^2+${a}x+${a*a}$. At $x=${a}$, it equals $3(${a}^2) = ${ans}$.`
        ));
    }

    return shuf(questions).slice(0, 20);
};

export const genSkill2A = () => {
    const questions = [];

    // Factoring quadratic trinomial
    for (let i = 0; i < 8; i++) {
        const a = randInt(2, 6); 
        const b = randInt(2, 7); 
        const mid = b - a;
        const last = -(a * b);
        const ans = a + b;
        const midTerm = mid === 0 ? '' : mid === 1 ? '+ x' : mid === -1 ? '- x' : mid > 0 ? `+ ${mid}x` : `- ${Math.abs(mid)}x`;
        questions.push(qMaker(
            `Evaluate $\\lim_{x \\to ${a}} \\frac{x^2 ${midTerm} - ${Math.abs(last)}}{x - ${a}}$`,
            `$${ans}$`,
            [`$${ans + 2}$`, `$${a}$`, `$\\infty$`],
            `Numerator factors as $(x-${a})(x+${b})$. Cancel $(x-${a})$ to get $x+${b}$, so $x=${a} \\implies ${a}+${b}=${ans}$.`
        ));
    }

    // Factoring diff of squares
    for (let i = 0; i < 8; i++) {
        const a = randInt(5, 12);
        const ans = 2 * a;
        questions.push(qMaker(
            `Evaluate: $\\lim_{x \\to ${a}} \\frac{x^2 - ${a * a}}{x - ${a}}$`,
            `$${ans}$`,
            [`$${a}$`, `$0$`, `$${a * a}$`],
            `Factor: $\\frac{(x-${a})(x+${a})}{x-${a}} = x+${a}$. Evaluate at $x=${a}$ to get ${ans}.`
        ));
    }

    // Rationalizing sqrt(x+h) - sqrt(x) over h
    for (let i = 0; i < 8; i++) {
        const a = randInt(1, 9);
        questions.push(qMaker(
            `Find $\\lim_{h \\to 0} \\frac{\\sqrt{${a}+h} - \\sqrt{${a}}}{h}$`,
            `$\\frac{1}{2\\sqrt{${a}}}$`,
            [`$0$`, `$\\frac{1}{\\sqrt{${a}}}$`, `Does Not Exist`],
            `Multiply numerator and denominator by the conjugate $\\sqrt{${a}+h} + \\sqrt{${a}}$. The $h$ cancels out, leaving $\\frac{1}{2\\sqrt{${a}}}$.`
        ));
    }

    // Basic conceptually
    questions.push(qMaker(
        `If substituting $x = c$ into $\\frac{f(x)}{g(x)}$ yields $\\frac{0}{0}$, what does this indicate?`,
        `The limit is in an indeterminate form and might exist if we simplify.`,
        [`The limit definitely does not exist.`, `The limit is exactly 0.`, `The function is undefined everywhere.`],
        `0/0 means we must use algebraic tricks (factoring, conjugate) to find the limit's true value.`
    ));

    return shuf(questions).slice(0, 20);
};

// ─── DIFFERENTIATION SKILLS PART 2 (Skills 4-6) ──────────────────────

/* ── HELPERS ── */
const rInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; }
    return a;
};
const mcq = (question, correctAnswer, distractors, explanation) => {
    const options = [correctAnswer, ...distractors];
    const shuffled = shuffle(options);
    return { question, options: shuffled, correct: shuffled.indexOf(correctAnswer), explanation };
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 4 — QUOTIENT RULE
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill4Q = () => {
    const questions = [];

    questions.push(mcq(`What is the Quotient Rule for $\\frac{u}{v}$?`, `$\\frac{v u' - u v'}{v^2}$`, [`$\\frac{u v' - v u'}{v^2}$`, `$\\frac{u'}{v'}$`, `$\\frac{v u' + u v'}{v^2}$`], `Low D-High minus High D-Low, over Low squared.`));

    // Algebraic / Algebraic
    for(let i=0; i<8; i++){
        const k = rInt(2, 5);
        questions.push(mcq(`Find $\\frac{d}{dx}\\left(\\frac{x}{x+${k}}\\right)$`, `$\\frac{${k}}{(x+${k})^2}$`, [`$\\frac{x}{(x+${k})^2}$`, `$\\frac{-${k}}{(x+${k})^2}$`, `$\\frac{1}{(x+${k})^2}$`], `(x+${k})(1) - (x)(1) = ${k} over (x+${k})^2.`));
    }

    // Trig / Algebraic OR Algebraic / Trig
    questions.push(mcq(`Find $\\frac{d}{dx}\\left(\\frac{\\sin x}{x}\\right)$`, `$\\frac{x \\cos x - \\sin x}{x^2}$`, [`$\\frac{\\cos x}{x^2}$`, `$\\frac{\\sin x - x \\cos x}{x^2}$`, `$\\frac{x \\sin x - \\cos x}{x^2}$`], `Low(x) D-High(cosx) - High(sinx) D-Low(1) over x^2.`));
    questions.push(mcq(`Find $\\frac{d}{dx}\\left(\\frac{x}{\\sin x}\\right)$`, `$\\frac{\\sin x - x \\cos x}{\\sin^2 x}$`, [`$\\frac{x \\cos x - \\sin x}{\\sin^2 x}$`, `$\\frac{1}{\\cos x}$`, `$\\frac{\\cos x - x \\sin x}{\\sin^2 x}$`], `Low(sinx) D-High(1) - High(x) D-Low(cosx) over sin^2 x.`));

    // Trig / Trig
    questions.push(mcq(`Find $\\frac{d}{dx}\\left(\\frac{\\sin x}{\\cos x}\\right)$ using quotient rule.`, `$\\sec^2 x$`, [`$\\tan^2 x$`, `$-\\csc^2 x$`, `$\\frac{1}{\\cos^2 x} - 1$`], `[cos(cos) - sin(-sin)] / cos^2 = 1 / cos^2 = sec^2 x.`));

    // Exp / Algebraic
    questions.push(mcq(`Find $\\frac{d}{dx}\\left(\\frac{e^x}{x^2}\\right)$`, `$\\frac{e^x(x - 2)}{x^3}$`, [`$\\frac{e^x(x + 2)}{x^3}$`, `$\\frac{e^x(2x - 1)}{x^4}$`, `$\\frac{e^x}{2x}$`], `[x^2(e^x) - e^x(2x)] / x^4 = e^x(x^2 - 2x) / x^4 = e^x(x - 2) / x^3.`));
    
    // Log / Algebraic
    questions.push(mcq(`Find $\\frac{d}{dx}\\left(\\frac{\\ln x}{x}\\right)$`, `$\\frac{1 - \\ln x}{x^2}$`, [`$\\frac{\\ln x - 1}{x^2}$`, `$\\frac{1}{x^2}$`, `$\\frac{1 + \\ln x}{x^2}$`], `[x(1/x) - ln x(1)] / x^2 = (1 - ln x) / x^2.`));

    // Pad
    for(let i=0; i<8; i++){
        questions.push(mcq(`Why shouldn't you use the Quotient Rule for $\\frac{\\sin x}{5}$?`, `It's easier to use the constant multiple rule $1/5 \\cdot \\sin x$.`, [`Because 5 is not a function`, `Quotient rule only works for polynomials`, `The denominator is not squared`], `Constants should just be factored out. No need for complex quotient rule.`));
    }

    return shuffle(questions).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 5 — CHAIN RULE
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill5Q = () => {
    const questions = [];

    questions.push(mcq(`What is the Chain Rule?`, `$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$`, [`$\\frac{dy}{dx} = \\frac{dy}{dx} \\cdot \\frac{du}{dx}$`, `$\\frac{dy}{dx} = \\frac{dy}{du} + \\frac{du}{dx}$`, `$\\frac{dy}{dx} = u'v + uv'$`], `Used for composite functions $f(g(x))$. Derivative of the outside times derivative of the inside.`));

    // (ax+b)^n
    for(let i=0; i<10; i++){
        const a = rInt(2, 5); const b = rInt(1, 4); const n = rInt(3, 7);
        questions.push(mcq(`Find $\\frac{d}{dx}(${a}x + ${b})^{${n}}$`, `$${a*n}(${a}x + ${b})^{${n-1}}$`, [`$${n}(${a}x + ${b})^{${n-1}}$`, `$${a}(${a}x + ${b})^{${n}}$`, `$${a*n}(${a}x + ${b})^{${n}}$`], `Outside: ${n}(...)^{${n-1}}. Inside: ${a}. Multiply them.`));
    }

    // Trig with complex angle: sin(kx^2)
    for(let i=0; i<4; i++){
        const k = rInt(2, 5);
        questions.push(mcq(`Find $\\frac{d}{dx}(\\sin(${k}x^2))$`, `$${2*k}x \\cos(${k}x^2)$`, [`$\\cos(${k}x^2)$`, `$${2*k}x \\sin(${k}x^2)$`, `$${k} \\cos(${k}x^2)$`], `Outside derivative is cos. Inside derivative is ${2*k}x.`));
    }

    // Power of Trig: sin^n(x)
    for(let i=0; i<3; i++){
        const n = rInt(3, 5);
        questions.push(mcq(`Find $\\frac{d}{dx}(\\cos^{${n}} x)$`, `$-${n} \\cos^{${n-1}} x \\sin x$`, [`$${n} \\cos^{${n-1}} x \\sin x$`, `$-${n} \\sin^{${n-1}} x \\cos x$`, `$${n} \\cos^{${n-1}} x$` ], `Outside: ${n}cos^{${n-1}}x. Inside: (-sin).`));
    }

    // e^(kx^2)
    for(let i=0; i<8; i++){
        const k = rInt(2, 4);
        questions.push(mcq(`Find $\\frac{d}{dx}(e^{${k}x^2})$`, `$${2*k}x e^{${k}x^2}$`, [`$e^{${k}x^2}$`, `$${k}x^2 e^{${k}x^2-1}$`, `$${2*k} e^{${k}x^2}$`], `Outside is $e^u$. Inside is ${2*k}x.`));
    }

    // ln(poly)
    for(let i=0; i<8; i++){
        const a = rInt(2, 5);
        questions.push(mcq(`Find $\\frac{d}{dx}(\\ln(${a}x^2+1))$`, `$\\frac{${2*a}x}{${a}x^2+1}$`, [`$\\frac{1}{${a}x^2+1}$`, `$\\frac{${2*a}x}{\\ln(${a}x^2+1)}$`, `$\\frac{x}{${a}x^2+1}$`], `Outside is $1/u$. Inside is ${2*a}x.`));
    }

    // Double chain
    questions.push(mcq(`Find $\\frac{d}{dx}(\\sin^2(3x))$`, `$6 \\sin(3x)\\cos(3x)$`, [`$2 \\sin(3x)$`, `$3 \\cos^2(3x)$`, `$6 \\cos(3x)$`], `3 layers! 2(sin(3x))^1 * cos(3x) * 3 = 6 sin(3x) cos(3x).`));

    return shuffle(questions).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 6 — IMPLICIT DIFFERENTIATION
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill6Q = () => {
    const questions = [];

    questions.push(mcq(`When dealing with $y$ implicitly, what is $\\frac{d}{dx}(y^3)$?`, `$3y^2 \\frac{dy}{dx}$`, [`$3y^2$`, `$3y^3$`, `$\\frac{dy}{dx}$`], `Because $y$ is a function of $x$, you must apply the chain rule when differentiating terms with $y$.`));

    // Circle x^2 + y^2 = r^2
    for(let i=0; i<8; i++){
        const r2 = rInt(4, 25);
        questions.push(mcq(`Find $\\frac{dy}{dx}$ for $x^2 + y^2 = ${r2}$`, `$-\\frac{x}{y}$`, [`$\\frac{x}{y}$`, `$-\\frac{y}{x}$`, `$-x$`], `$2x + 2y y' = 0$, so $y' = -2x / 2y = -x/y$.`));
    }

    // Ellipse ax^2 + by^2 = c
    for(let i=0; i<4; i++){
        const a = rInt(2, 5); const b = rInt(2, 5);
        questions.push(mcq(`Find $\\frac{dy}{dx}$ for ${a}$x^2$ + ${b}$y^2 = 10$`, `$-\\frac{${a}x}{${b}y}$`, [`$\\frac{${a}x}{${b}y}$`, `$-\\frac{${b}x}{${a}y}$`, `$-\\frac{${a}y}{${b}x}$`], `$${2*a}x + ${2*b}y y' = 0 \\implies y' = -${2*a}x / ${2*b}y$.`));
    }

    // Product of xy
    questions.push(mcq(`How do you differentiate the term '$xy$' with respect to $x$?`, `$x \\frac{dy}{dx} + y$`, [`$x + y$`, `$xy'$`, `$\\frac{dy}{dx}$`], `Use the product rule! $x(y') + y(1)$.`));

    // Find y' for xy = c
    for(let i=0; i<3; i++){
        const c = rInt(1, 9);
        questions.push(mcq(`Find $\\frac{dy}{dx}$ for $xy = ${c}$`, `$-\\frac{y}{x}$`, [`$\\frac{y}{x}$`, `$-\\frac{x}{y}$`, `$0$`], `$xy' + y = 0$. So $y' = -y/x$.`));
    }

    // Implicit with trig
    questions.push(mcq(`Find $\\frac{dy}{dx}$ for $\\sin(y) = x$`, `$\\frac{1}{\\cos y}$`, [`$-\\frac{1}{\\cos y}$`, `$\\cos y$`, `$\\frac{1}{\\sin y}$`], `$\\cos(y) \\cdot y' = 1$. So $y' = 1 / \\cos y$.`));
    questions.push(mcq(`Find $\\frac{dy}{dx}$ for $e^y = x^2$`, `$\\frac{2x}{e^y}$`, [`$2x e^y$`, `$\\frac{e^y}{2x}$`, `$\\frac{1}{2x}$`], `$e^y \\cdot y' = 2x$.`));

    // general
    for(let i=0; i<5; i++){
        questions.push(mcq(`What makes a function "implicit"?`, `When $y$ is mixed with $x$ and cannot be easily isolated.`, [`When it involves inverse trig functions`, `When it has fractions`, `When the exact value is unknown`], `Explicit is $y = f(x)$. Implicit is $f(x,y) = 0$.`));
    }

    return shuffle(questions).slice(0, 20);
};

export const diffSkillsPart2 = [
    {
        id: 'diff-quotient',
        title: 'Quotient Rule',
        subtitle: 'Skill 4',
        icon: '➗',
        color: '#f43f5e',
        desc: 'How to differentiate when one function is divided by another.',
        practice: genSkill4Q,
        assessment: genSkill4Q,
        learn: {
            concept: 'Just like the product rule, division creates complex interacting derivatives. The quotient rule allows us to differentiate rational expressions, or a mix of trig/algebraic/logarithmic over each other.',
            rules: [
                { title: 'The Quotient Rule', f: '\\left(\\frac{u}{v}\\right)\' = \\frac{vu\' - uv\'}{v^2}', d: 'The bottom times the derivative of the top, MINUS the top times the derivative of the bottom, all over the bottom squared. Mnemonic: Low D-High minus High D-Low.', ex: '\\frac{d}{dx}\\frac{\\sin x}{x} = \\frac{x\\cos x - \\sin x}{x^2}', tip: 'Order matters because of the minus sign!' },
                { title: 'Constants in Denominator', f: '\\frac{d}{dx}\\left(\\frac{\\sin x}{5}\\right) = \\frac{\\cos x}{5}', d: 'Do NOT use the quotient rule if the denominator is a constant. Treat it as a constant multiple $1/5$ instead to save time.', ex: '\\frac{\\sin x}{5} = \\frac{1}{5} \\sin x', tip: 'Pull constants out front first.' }
            ]
        }
    },
    {
        id: 'diff-chain',
        title: 'Chain Rule',
        subtitle: 'Skill 5',
        icon: '🔗',
        color: '#8b5cf6',
        desc: 'Peel the onion: derivative of the outside times derivative of the inside.',
        practice: genSkill5Q,
        assessment: genSkill5Q,
        learn: {
            concept: 'The Chain Rule is used for composite functions—functions inside other functions (like $\\sin(x^2)$). You differentiate from the outside in.',
            rules: [
                { title: 'The Chain Rule', f: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)', d: 'Differentiate the outer function, LEAVING the inner function alone. Then multiply by the derivative of the inner function.', ex: '\\frac{d}{dx}(\\sin(x^3)) = \\cos(x^3) \\cdot 3x^2', tip: 'Outside first, then inside.' },
                { title: 'Leibniz Notation', f: '\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}', d: 'If $y$ depends on $u$, and $u$ depends on $x$, you can multiply their rates of change together.', ex: '\\text{Just like fraction multiplication.}', tip: 'The du terms cancel out visually.' }
            ]
        }
    },
    {
        id: 'diff-implicit',
        title: 'Implicit Differentiation',
        subtitle: 'Skill 6',
        icon: '🕵️',
        color: '#06b6d4',
        desc: 'Find dy/dx when y is hopelessly tangled up with x equations.',
        practice: genSkill6Q,
        assessment: genSkill6Q,
        learn: {
            concept: 'Sometimes an equation is not solved for $y$ (e.g., $x^2 + y^2 = 25$). You don\'t need to isolate $y$ to find its derivative! Just differentiate both sides with respect to $x$.',
            rules: [
                { title: 'The y-prime tag', f: '\\frac{d}{dx}(y^3) = 3y^2 \\frac{dy}{dx}', d: 'Because $y$ is secretly a function of $x$, every time you differentiate a $y$ term, the chain rule forces you to multiply by $\\frac{dy}{dx}$ (or $y\'$).', ex: '\\frac{d}{dx}(\\sin y) = \\cos y \\cdot y\'', tip: "Don't forget the dy/dx attached!" },
                { title: 'Product Rule Warning', f: '\\frac{d}{dx}(xy) = x y\' + y', d: 'When $x$ and $y$ are multiplied, you MUST use the product rule. This is the #1 most common mistake.', ex: '\\text{First } d(\\text{second}) + \\dots', tip: 'xy requires the product rule.' }
            ]
        }
    }
];

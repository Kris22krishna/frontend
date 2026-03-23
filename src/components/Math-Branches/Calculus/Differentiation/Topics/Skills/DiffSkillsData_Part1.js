// ─── DIFFERENTIATION SKILLS PART 1 (Skills 1-3) ──────────────────────

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
   SKILL 1 — STANDARD DERIVATIVES (Algebraic, Trig, Exp, Log)
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill1Q = () => {
    const questions = [];

    // CONSTANTS & BASIC POWER
    questions.push(mcq(`What is $\\frac{d}{dx}(5)$?`, `$0$`, [`$5$`, `$1$`, `$5x$`], `The derivative of any constant is $0$.`));
    questions.push(mcq(`What is $\\frac{d}{dx}(x)$?`, `$1$`, [`$x$`, `$0$`, `$2x$`], `$\\frac{d}{dx}(x^1) = 1 \\cdot x^0 = 1$.`));
    
    // x^n
    for(let i=0; i<8; i++){
        const n = rInt(3, 9);
        questions.push(mcq(`Find $\\frac{d}{dx}(x^{${n}})$`, `$${n}x^{${n-1}}$`, [`$x^{${n-1}}$`, `$${n+1}x^{${n-1}}$`, `$${n}x^{${n}}$`], `Power rule: bring down the ${n}, subtract 1 from the power.`));
    }

    // e^x, a^x, ln(x)
    questions.push(mcq(`What is $\\frac{d}{dx}(e^x)$?`, `$e^x$`, [`$xe^{x-1}$`, `$x e^x$`, `$\\frac{1}{x}e^x$`], `The derivative of $e^x$ is itself.`));
    for(let i=0; i<8; i++){
        const a = rInt(2, 7);
        questions.push(mcq(`Find $\\frac{d}{dx}(${a}^x)$`, `$${a}^x \\ln(${a})$`, [`$x \\cdot ${a}^{x-1}$`, `$${a}^x$`, `$\\frac{${a}^x}{\\ln(${a})}$`], `Derivative of $a^x$ is $a^x \\ln(a)$.`));
    }
    questions.push(mcq(`What is $\\frac{d}{dx}(\\ln x)$?`, `$\\frac{1}{x}$`, [`$\\frac{1}{x^2}$`, `$\\ln(x)$`, `$e^x$`], `Standard derivative of the natural log.`));

    // TRIG FUNCTIONS
    questions.push(mcq(`What is $\\frac{d}{dx}(\\sin x)$?`, `$\\cos x$`, [`$-\\cos x$`, `$\\sin x$`, `$-\\sin x$`], `Standard derivative of sine.`));
    questions.push(mcq(`What is $\\frac{d}{dx}(\\cos x)$?`, `$-\\sin x$`, [`$\\sin x$`, `$-\\cos x$`, `$\\sec^2 x$`], `Standard derivative of cosine. Co-functions have negative derivatives.`));
    questions.push(mcq(`What is $\\frac{d}{dx}(\\tan x)$?`, `$\\sec^2 x$`, [`$\\sec x \\tan x$`, `$\\cot x$`, `$-\\sec^2 x$`], `Standard derivative of tangent.`));
    questions.push(mcq(`What is $\\frac{d}{dx}(\\sec x)$?`, `$\\sec x \\tan x$`, [`$\\sec^2 x$`, `$-\\sec x \\tan x$`, `$\\tan^2 x$`], `Standard derivative of secant.`));
    questions.push(mcq(`What is $\\frac{d}{dx}(\\csc x)$?`, `$-\\csc x \\cot x$`, [`$-\\csc^2 x$`, `$\\csc x \\cot x$`, `$\\sec x \\tan x$`], `Standard derivative of cosecant. Starts with 'c' so it's negative.`));
    questions.push(mcq(`What is $\\frac{d}{dx}(\\cot x)$?`, `$-\\csc^2 x$`, [`$\\sec^2 x$`, `$\\csc^2 x$`, `$-\\cot^2 x$`], `Standard derivative of cotangent.`));

    return shuffle(questions).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 2 — SUM & DIFFERENCE RULE
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill2Q = () => {
    const questions = [];

    questions.push(mcq(`What does the Sum Rule state?`, `$\\frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x)$`, [`$\\frac{d}{dx}[f(x) + g(x)] = f'(x)g(x) + f(x)g'(x)$`, `$\\frac{d}{dx}[f(x) + g(x)] = f'(g(x))$`, `Only multiply the derivatives together.`], `Derivatives distribute over addition.`));
    
    // Polynomials
    for(let i=0; i<8; i++){
        const a = rInt(2, 5); const b = rInt(2, 6);
        questions.push(mcq(`Find $\\frac{d}{dx}(${a}x^2 + ${b}x)$`, `$${2*a}x + ${b}$`, [`$${a}x + ${b}$`, `$${2*a}x^2 + ${b}$`, `$${a}x^3/3 + ${b}x^2/2$`], `Differentiate each term independently: ${a}x^2 -> ${2*a}x, and ${b}x -> ${b}.`));
    }
    for(let i=0; i<8; i++){
        const k = rInt(2, 7); const c = rInt(10, 50);
        questions.push(mcq(`Find $\\frac{d}{dx}(x^{${k}} - ${c})$`, `$${k}x^{${k-1}}$`, [`$${k}x^{${k-1}} - ${c}$`, `$x^{${k-1}}$`, `$k x^{${k}}$`], `Differentiate $x^{${k}}$ using power rule. The constant ${c} becomes 0.`));
    }

    // Mixed Algebraic and Trig
    questions.push(mcq(`Find $\\frac{d}{dx}(x^3 + \\sin x)$`, `$3x^2 + \\cos x$`, [`$3x^2 - \\cos x$`, `$x^3 \\cos x + 3x^2 \\sin x$`, `$3x^2 \\sin x$`], `Sum rule applies to all function types. $\\frac{d}{dx}(x^3) = 3x^2$, $\\frac{d}{dx}(\\sin x) = \\cos x$.`));
    questions.push(mcq(`Find $\\frac{d}{dx}(e^x - \\cos x)$`, `$e^x + \\sin x$`, [`$e^x - \\sin x$`, `$xe^{x-1} + \\sin x$`, `$e^x \\cos x$`], `$\\frac{d}{dx}(\\cos x) = -\\sin x$, so $- (-\\sin x) = + \\sin x$.`));
    
    for(let i=0; i<8; i++){
        const a = rInt(2, 6);
        questions.push(mcq(`Find $\\frac{d}{dx}(${a}\\tan x - \\ln x)$`, `$${a}\\sec^2 x - \\frac{1}{x}$`, [`$${a}\\sec^2 x + \\frac{1}{x^2}$`, `$\\sec^2 x - \\frac{1}{x}$`, `$${a}\\cot x - \\frac{1}{x}$`], `Constant multiple ${a} stays. $\\tan x \\to \\sec^2 x$. $\\ln x \\to 1/x$.`));
    }
    
    for(let i=0; i<3; i++){
        const p = rInt(4, 8);
        questions.push(mcq(`Find $\\frac{d}{dx}(x^{${p}} + e^x - 5)$`, `$${p}x^{${p-1}} + e^x$`, [`$${p}x^{${p-1}} + e^x - 5$`, `$\\frac{x^{${p+1}}}{${p+1}} + e^x$`, `$${p}x^{${p-1}} + xe^{x-1}$`], `Sum of three independent terms.`));
    }

    return shuffle(questions).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 3 — PRODUCT RULE
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill3Q = () => {
    const questions = [];

    questions.push(mcq(`What is the Product Rule?`, `$(uv)' = u'v + uv'$`, [`$(uv)' = u'v'$`, `$(uv)' = u'v - uv'$`, `$(uv)' = u' + v'$`], `First d(Second) + Second d(First).`));

    // Algebraic * Algebraic (but avoiding trivial ones)
    questions.push(mcq(`Why shouldn't we use the product rule for $x^5 \\cdot x^7$?`, `It is easier to simplify to $x^{12}$ and use the power rule.`, [`Because power rule only works for addition`, `Because $x^5$ is constant`, `Because we can't derive polynomials`], `Simplification is always the first step. $x^5 \\cdot x^7 = x^{12}$.`));

    // Algebraic * Trig
    for(let i=0; i<8; i++){
        const p = rInt(2, 5);
        questions.push(mcq(`Use Product Rule to find $\\frac{d}{dx}(x^{${p}} \\sin x)$`, `$x^{${p}} \\cos x + ${p}x^{${p-1}} \\sin x$`, [`$${p}x^{${p-1}} \\cos x$`, `$x^{${p}} \\sin x + ${p}x^{${p-1}} \\cos x$`, `$x^{${p}} \\cos x - ${p}x^{${p-1}} \\sin x$`], `$u=x^{${p}}, v=\\sin x$. $uv' + u'v = x^{${p}}\\cos x + ${p}x^{${p-1}}\\sin x$.`));
    }
    
    // Algebraic * Exp
    for(let i=0; i<8; i++){
        const p = rInt(2, 5);
        questions.push(mcq(`Use Product Rule to find $\\frac{d}{dx}(x^{${p}} e^x)$`, `$x^{${p}} e^x + ${p}x^{${p-1}} e^x$`, [`$${p}x^{${p-1}} e^x$`, `$x^{${p}} e^x - ${p}x^{${p-1}} e^x$`, `$x^{${p+1}} e^x$`], `$u=x^{${p}}, v=e^x$. $uv' + u'v = x^{${p}} e^x + ${p}x^{${p-1}} e^x$.`));
    }

    // Algebraic * Log
    questions.push(mcq(`Find $\\frac{d}{dx}(x \\ln x)$`, `$\\ln x + 1$`, [`$\\frac{1}{x} + 1$`, `$\\frac{1}{x}$`, `$x \\ln x + 1$`], `$u=x, v=\\ln x$. $x(1/x) + (1)\\ln x = 1 + \\ln x$.`));
    questions.push(mcq(`Find $\\frac{d}{dx}(x^2 \\ln x)$`, `$x(2\\ln x + 1)$`, [`$x(2\\ln x - 1)$`, `$2x \\ln x$`, `$2x + x^2 \\ln x$`], `$x^2(1/x) + 2x\\ln x = x + 2x\\ln x = x(1 + 2\\ln x)$.`));

    // Exp * Trig
    questions.push(mcq(`Find $\\frac{d}{dx}(e^x \\cos x)$`, `$e^x(\\cos x - \\sin x)$`, [`$e^x(\\sin x + \\cos x)$`, `$-e^x \\sin x$`, `$e^x \\cos x - e^x \\sin x$` ], `$u=e^x, v=\\cos x$. $u'v + uv' = e^x\\cos x + e^x(-\\sin x)$.`));

    return shuffle(questions).slice(0, 20);
};

export const diffSkillsPart1 = [
    {
        id: 'diff-basic-standard',
        title: 'Standard Derivatives',
        subtitle: 'Skill 1',
        icon: '🧮',
        color: '#f59e0b',
        desc: 'Memorize the core toolkit: Power rule, Constants, Trigonometric, and Exponentials.',
        practice: genSkill1Q,
        assessment: genSkill1Q,
        learn: {
            concept: 'To calculate complex rates of change, we first need to memorize the building blocks. The derivatives of $x^n$, $\\sin x$, and $e^x$ form the foundation of calculus.',
            rules: [
                { title: 'The Power & Constant Rules', f: '\\frac{d}{dx}(x^n) = nx^{n-1}', d: 'Bring the exponent to the front, and subtract 1 from the power. The derivative of any standalone constant $k$ is always $0$.', ex: '\\frac{d}{dx}(x^5) = 5x^4', tip: 'Constant multiples stay. d/dx(3x^2) = 6x.' },
                { title: 'Trigonometric Derivatives', f: '\\frac{d}{dx}(\\sin x) = \\cos x', d: 'Notice completely that all "co-" functions ($\\cos$, $\\csc$, $\\cot$) have NEGATIVE derivatives.', ex: '\\frac{d}{dx}(\\tan x) = \\sec^2 x', tip: 'Co-functions are negative!' },
                { title: 'Exponential & Logarithmic', f: '\\frac{d}{dx}(e^x) = e^x', d: 'The magical number $e$ produces a function that is its own derivative! The natural log $\\ln x$ becomes $1/x$.', ex: '\\frac{d}{dx}(\\ln x) = \\frac{1}{x}', tip: 'e^x is invincible.' }
            ]
        }
    },
    {
        id: 'diff-sum-diff',
        title: 'Sum & Difference Rule',
        subtitle: 'Skill 2',
        icon: '➕',
        color: '#10b981',
        desc: 'Derivatives distribute perfectly over addition and subtraction.',
        practice: genSkill2Q,
        assessment: genSkill2Q,
        learn: {
            concept: 'If a function is made of multiple terms added or subtracted together, you simply differentiate each term completely independently. They do not interact.',
            rules: [
                { title: 'The Sum Rule', f: '\\frac{d}{dx}[f(x) \\pm g(x)] = f\'(x) \\pm g\'(x)', d: 'You can break large polynomials or mixed functions into bite-sized pieces.', ex: '\\frac{d}{dx}[x^2 + \\sin x] = 2x + \\cos x', tip: 'Just derive them one-by-one.' },
                { title: 'Combination', f: '\\frac{d}{dx}[c \\cdot f(x)] = c \\cdot f\'(x)', d: 'Constants attached to functions survive the derivative process perfectly intact.', ex: '\\frac{d}{dx}[5x^3 - 2e^x] = 15x^2 - 2e^x', tip: 'Attached constants live, standalone constants die.' }
            ]
        }
    },
    {
        id: 'diff-product',
        title: 'Product Rule',
        subtitle: 'Skill 3',
        icon: '✖️',
        color: '#3b82f6',
        desc: 'How to differentiate when two functions of x are multiplied together.',
        practice: genSkill3Q,
        assessment: genSkill3Q,
        learn: {
            concept: 'When two functions are multiplied (like $x^2 \\sin x$), you CANNOT just multiply their derivatives. They interact and expand into two pieces.',
            rules: [
                { title: 'The Product Rule', f: '(uv)\' = u\'v + uv\'', d: 'Differentiate the first and leave the second. Then leave the first, differentiate the second. Add them together.', ex: '\\frac{d}{dx}(x^2 e^x) = 2x e^x + x^2 e^x', tip: "First d(Second) + Second d(First)." },
                { title: 'When NOT to use it', f: 'x^5 \\cdot x^7 = x^{12}', d: 'Do not use the Product Rule if you can simply combine the algebra first. Only use it when the function types are fundamentally different (Algebraic * Trig).', ex: '\\frac{d}{dx}[x^5 x^7] = 12x^{11}', tip: 'Simplify before deriving.' }
            ]
        }
    }
];

// ─── INTEGRATION SKILLS PART 1 (Skills 1-3) ──────────────────────────

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
   SKILL 1 — PROPERTIES & BASIC FORMS (Algebraic, Trig, Exp)
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill1Q = () => {
    const questions = [];
    questions.push(mcq(`$\\int dx$`, `$x + C$`, [`$1 + C$`, `$0$`, `$C$`], `$\\int 1 \\,dx = x + C$.`));

    // Algebraic
    for(let i=0; i<8; i++){
        const n = rInt(2, 8); const np1 = n+1;
        questions.push(mcq(`Find $\\int x^{${n}} \\,dx$`, `$\\frac{x^{${np1}}}{${np1}} + C$`, [`$${n}x^{${n-1}} + C$`, `$x^{${np1}} + C$`, `$\\frac{x^{${n}}}{${n}} + C$`], `Power rule for integration: bump it up and divide by the new power.`));
    }
    
    // Algebraic Sums
    for(let i=0; i<8; i++){
        const a = rInt(2,5); const b = rInt(1,6);
        questions.push(mcq(`Find $\\int (${a}x^2 + ${b}x) \\,dx$`, `$\\frac{${a}x^3}{3} + \\frac{${b}x^2}{2} + C$`, [`$\\frac{${a}x^3}{3} + ${b}x + C$`, `$${2*a}x + ${b} + C$`, `$${a}x^3 + \\frac{${b}x^2}{2} + C$`], `Sum rule: integrate each term independently.`));
    }

    // Single Trig Forms
    questions.push(mcq(`Find $\\int \\cos x \\,dx$`, `$\\sin x + C$`, [`$-\\sin x + C$`, `$\\cos x + C$`, `$-\\cos x + C$`], `Derivative of $\\sin$ is $\\cos$. So integral of $\\cos$ is $\\sin$.`));
    questions.push(mcq(`Find $\\int \\sin x \\,dx$`, `$-\\cos x + C$`, [`$\\cos x + C$`, `\\sin x + C`, `$-\\sin x + C$`], `Derivative of $\\cos$ is $-\\sin$, so integral of $\\sin$ must be $-\\cos$.`));
    questions.push(mcq(`Find $\\int \\sec^2 x \\,dx$`, `$\\tan x + C$`, [`\\sec x + C`, `\\frac{\\sec^3 x}{3} + C`, `-\\tan x + C`], `Derivative of $\\tan x$ is $\\sec^2 x$.`));

    // Exponential/Log Mix
    questions.push(mcq(`Find $\\int e^x \\,dx$`, `$e^x + C$`, [`$xe^{x-1} + C$`, `$x e^x + C$`, `$\\frac{1}{x}e^x + C$`], `The integral of $e^x$ is itself.`));
    questions.push(mcq(`Find $\\int \\frac{1}{x} \\,dx$`, `$\\ln|x| + C$`, [`$\\frac{1}{x^2} + C$`, `$\\ln(x) + C$`, `$-\\frac{1}{x^2} + C$`], `The derivative of natural log is $1/x$.`));

    // Sum Mix: Algebraic + Trig
    for(let i=0; i<8; i++){
        const k = rInt(2, 6);
        questions.push(mcq(`Evaluate $\\int (x^${k} + \\sin x) \\,dx$`, `$\\frac{x^{${k+1}}}{${k+1}} - \\cos x + C$`, [`$\\frac{x^{${k+1}}}{${k+1}} + \\cos x + C$`, `$${k}x^{${k-1}} - \\cos x + C$`, `$x^{${k+1}} - \\cos x + C$`], `Sum rule applies beautifully across polynomials and trig.`));
    }

    questions.push(mcq(`Why do we add $+ C$?`, `To represent the family of all anti-derivatives.`, [`Because limits go to infinity`, `To account for measurement error`, `C stands for Calculus`], `Since derivatives destroy constants, integration must account for any lost constant.`));
    
    return shuffle(questions).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 2 — INTEGRATION BY SUBSTITUTION
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill2Q = () => {
    const questions = [];
    questions.push(mcq(`What is the goal of Integration by Substitution?`, `To reverse the Chain Rule.`, [`To reverse the Product Rule`, `To eliminate fractions entirely`, `To bypass the power rule`], `Substitution (or U-substitution) is the direct inverse of the chain rule.`));

    // ∫ 2x (x^2+1)^3 dx -> u=x^2+1, du=2x dx -> ∫ u^3 du = u^4/4
    for(let i=0; i<8; i++){
        const n = rInt(2, 5); const np1 = n+1; const c = rInt(1, 9);
        questions.push(mcq(`Evaluate $\\int 2x(x^2+${c})^{${n}} \\,dx$`, `$\\frac{(x^2+${c})^{${np1}}}{${np1}} + C$`, [`$(x^2+${c})^{${np1}} + C$`, `$${n}(x^2+${c})^{${n-1}} + C$`, `$\\frac{x^2(x^2+${c})^{${np1}}}{${np1}} + C$`], `Let $u = x^2+${c}$, $du = 2x\\,dx$. Reduces to $\\int u^{${n}} \\,du$.`));
    }
    
    // ∫ cos(x)sin^3(x) dx
    for(let i=0; i<8; i++){
        const n = rInt(2, 5); const np1 = n+1;
        questions.push(mcq(`Evaluate $\\int \\cos x \\sin^${n} x \\,dx$`, `$\\frac{\\sin^{${np1}} x}{${np1}} + C$`, [`$\\frac{\\cos^{${np1}} x}{${np1}} + C$`, `$-\\frac{\\sin^{${np1}} x}{${np1}} + C$`, `$${n}\\sin^{${n-1}}x \\cos x + C$`], `Let $u = \\sin x$, $du = \\cos x \\,dx$. Reduces to $\\int u^{${n}} \\,du$.`));
    }

    // ∫ e^(kx) dx -> u=kx, du=k dx -> 1/k ∫ e^u du -> 1/k e^(kx)
    for(let i=0; i<8; i++){
        const k = rInt(2, 6);
        questions.push(mcq(`Evaluate $\\int e^{${k}x} \\,dx$`, `$\\frac{1}{${k}}e^{${k}x} + C$`, [`$e^{${k}x} + C$`, `$${k}e^{${k}x} + C$`, `$\\frac{e^{${k}x}}{${k+1}} + C$`], `Let $u=${k}x$, $du=${k}\\,dx$. The $1/${k}$ compensates for the missing $k$.`));
    }
    
    // ∫ (1/(ax+b)) dx -> (1/a) ln|ax+b|
    for(let i=0; i<8; i++){
        const a = rInt(2, 5); const b = rInt(1, 7);
        questions.push(mcq(`Evaluate $\\int \\frac{1}{${a}x+${b}} \\,dx$`, `$\\frac{1}{${a}}\\ln|${a}x+${b}| + C$`, [`$\\ln|${a}x+${b}| + C$`, `$\\frac{1}{(a+b)}\\ln|x| + C$`, `$-${a}(${a}x+${b})^{-2} + C$`], `Let $u=${a}x+${b}, du=${a}\\,dx$. Integrates to $\\frac{1}{${a}}\\ln|u|$.`));
    }
    
    // ∫ x cos(x^2) dx
    questions.push(mcq(`Evaluate $\\int x \\cos(x^2) \\,dx$`, `$\\frac{1}{2}\\sin(x^2) + C$`, [`$-\\frac{1}{2}\\sin(x^2) + C$`, `$\\sin(x^2) + C$`, `$x^2\\sin(x^2) + C$`], `Let $u=x^2, du=2x\\,dx$. Gives $1/2 \\int \\cos u \\,du$.`));

    return shuffle(questions).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 3 — INTEGRATION BY PARTS
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill3Q = () => {
    const questions = [];
    questions.push(mcq(`What is the Integration by Parts formula?`, `$\\int u dv = uv - \\int v du$`, [`$\\int u dv = u'v + uv'$`, `$\\int u dv = u\\int v - v\\int u$`, `$\\int u dv = \\frac{u}{v} - \\int u v$`], `Derived from the Product Rule of differentiation. It handles multiplied functions.`));
    questions.push(mcq(`What does the acronym ILATE stand for?`, `Inverse Trig, Logarithmic, Algebraic, Trig, Exponential.`, [`Inverse Trig, Linear, Arithmetic, Trig, Exponential`, `Integer, Log, Area, Trig, Exact`, `Implicit, Logarithmic, Algebraic, Trig, Equations`], `Used for deciding which function becomes $u$.`));
    
    // Choose u for x e^x
    for(let i=0; i<8; i++){
        const k = rInt(2, 5);
        questions.push(mcq(`In $\\int x^{${k}} e^x \\,dx$, what should $u$ be?`, `$x^{${k}}$`, [`$e^x$`, `$dx$`, `$x^{${k}} e^x$`], `Algebraic ($x^{${k}}$) comes before Exponential ($e^x$) in ILATE.`));
    }
    // Choose u for x ln x
    for(let i=0; i<8; i++){
        const k = rInt(2, 5);
        questions.push(mcq(`In $\\int x^{${k}} \\ln x \\,dx$, what should $u$ be?`, `$\\ln x$`, [`$x^{${k}}$`, `$1$`, `$x^{${k}} \\ln x$`], `Logarithmic ($\\ln x$) comes before Algebraic ($x^{${k}}$) in ILATE.`));
    }
    // Evaluate x e^x
    questions.push(mcq(`Evaluate $\\int x e^x \\,dx$`, `$x e^x - e^x + C$`, [`$x e^x + e^x + C$`, `$\\frac{x^2}{2} e^x + C$`, `$e^x + C$`], `$u=x, dv=e^x dx \\implies uv - \\int v du = x e^x - \\int e^x dx$.`));
    
    // Evaluate x sin x
    questions.push(mcq(`Evaluate $\\int x \\sin x \\,dx$`, `$-x \\cos x + \\sin x + C$`, [`$x \\cos x - \\sin x + C$`, `$-x \\cos x - \\sin x + C$`, `$\\frac{x^2}{2} \\sin x + C$`], `$u=x, dv=\\sin x$. $uv - \\int v du = x(-\\cos x) - \\int(-\\cos x)dx$.`));

    // Evaluate ln x
    questions.push(mcq(`Evaluate $\\int \\ln x \\,dx$`, `$x \\ln x - x + C$`, [`$\\frac{1}{x} + C$`, `$x \\ln x + x + C$`, `$\\ln x - x + C$`], `$u=\\ln x, dv=1 dx$. $uv - \\int v du = x\\ln x - \\int x(1/x)dx = x\\ln x - x$.`));

    // Conceptual
    for(let i=0; i<5; i++){
        questions.push(mcq(`With ILATE, why do we pick $u$ from left-to-right?`, `Because functions on the left are easier to differentiate, right is easier to integrate.`, [`Because functions on the left are easier to integrate`, `Because they are sorted alphabetically`, `There is no reason, it is just tradition`], `Logs and Inverse trigs are very hard to integrate but easy to differentiate.`));
    }
    return shuffle(questions).slice(0, 20);
};

export const intSkillsPart1 = [
    {
        id: 'int-basic',
        title: 'Properties & Basic Forms',
        subtitle: 'Skill 1',
        icon: '🧱',
        color: '#d946ef',
        desc: 'Master the power rule, trig forms, and fundamental properties.',
        practice: genSkill1Q,
        assessment: genSkill1Q,
        learn: {
            concept: 'Integration is the process of finding the antiderivative. The Power Rule reverses polynomials, while memorized trigonometric facts allow immediate conversion of cosines back into sines.',
            rules: [
                { title: 'Power Rule for Integration', f: '\\int x^n dx = \\frac{x^{n+1}}{n+1} + C', d: 'Add 1 to the power, then divide by that new power. Valid for all $n$ except $-1$.', ex: '\\int (x^3 + \\sin x) dx = \\frac{x^4}{4} - \\cos x + C', tip: 'Bump it up, divide!' },
                { title: 'The Exception: ln(x)', f: '\\int x^{-1} dx = \\ln|x| + C', d: 'When $n=-1$, the power rule fails (division by zero). Instead, the integral is the natural log.', ex: '\\int \\frac{1}{x} dx = \\ln|x| + C', tip: '1/x is always ln|x|.' },
                { title: 'Trig Definites', f: '\\int \\cos x dx = \\sin x + C', d: 'Remember that differentiating $\\cos$ gives a negative, which means integrating $\\sin$ MUST give a negative $\\cos$.', ex: '\\int \\sin x dx = -\\cos x + C', tip: 'If it starts with C, its derivative is negative.' }
            ]
        }
    },
    {
        id: 'int-sub',
        title: 'Integration by Substitution',
        subtitle: 'Skill 2',
        icon: '🕵️',
        color: '#8b5cf6',
        desc: 'Reverse the Chain Rule using U-Substitution.',
        practice: genSkill2Q,
        assessment: genSkill2Q,
        learn: {
            concept: 'U-substitution is the "Chain Rule" in reverse. It simplifies complex integrals by substituting an inner function $u$ and its derivative $du$ into the integral.',
            rules: [
                { title: 'The Form', f: '\\int f(g(x))g\'(x)dx', d: 'Look for a function $g(x)$ whose derivative $g\'(x)$ is multiplying the result. Works across trig and algebraic!', ex: '\\text{Let } u = g(x)', tip: 'Pick u so that du is in the equation.' },
                { title: 'The Process for Trig', f: '\\int \\sin^4(x)\\cos(x)dx', d: 'Let $u = \\sin(x)$. Then $du = \\cos(x)dx$. The whole integral collapses cleanly into $\\int u^4 du$.', ex: '= \\frac{\\sin^5(x)}{5} + C', tip: 'Always sub x back in at the end.' }
            ]
        }
    },
    {
        id: 'int-parts',
        title: 'Integration by Parts',
        subtitle: 'Skill 3',
        icon: '✂️',
        color: '#3b82f6',
        desc: 'Differentiate one part, integrate the other. The reverse product rule.',
        practice: genSkill3Q,
        assessment: genSkill3Q,
        learn: {
            concept: 'When an integrand is a product of two completely different types of functions (like an algebraic and a trigonometric function, e.g., $x \\sin x$), substitution fails. By Parts is the answer.',
            rules: [
                { title: 'The Formula', f: '\\int u \\,dv = uv - \\int v \\,du', d: 'Break the integral into two pieces: $u$ (which you will differentiate to get $du$) and $dv$ (which you will integrate to get $v$).', ex: '\\int x e^x dx', tip: 'Pick a "u" that gets simpler when derived.' },
                { title: 'The ILATE Rule', f: '\\text{Inv. Trig, Log, Alg, Trig, Exp}', d: 'A mnemonic to help you choose $u$. Pick the function type that appears highest on this list to be $u$.', ex: '\\text{In } \\int x \\ln x \\,dx \\text{, pick } u = \\ln x \\text{ (L > A)}', tip: 'ILATE chooses u!' }
            ]
        }
    }
];

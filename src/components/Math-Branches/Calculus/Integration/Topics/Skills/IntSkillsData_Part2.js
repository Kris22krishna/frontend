// ─── INTEGRATION SKILLS PART 2 (Skills 4-6) ──────────────────────────

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
   SKILL 4 — INTEGRATION BY PARTIAL FRACTIONS
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill4Q = () => {
    const questions = [];
    questions.push(mcq(`When should you use partial fractions?`, `When integrating a rational function whose denominator can be factored.`, [`When integrating trigs`, `When the numerator has a higher degree than denominator`, `When integrating products of logs`], `Partial fractions breaks a complex rational denominator into simple summable fractions.`));
    questions.push(mcq(`What is the partial fraction form for $\\frac{1}{(x-a)(x-b)}$?`, `$\\frac{A}{x-a} + \\frac{B}{x-b}$`, [`$\\frac{Ax+B}{(x-a)(x-b)}$`, `$\\frac{A}{(x-a)^2} + \\frac{B}{x-b}$`, `$A(x-a) + B(x-b)$`], `Distinct linear factors get distinct constant numerators.`));
    
    // basic decomposition
    for(let i=0; i<6; i++){
        const a = rInt(1, 4); const b = rInt(5, 9);
        questions.push(mcq(`Decompose $\\frac{1}{(x-${a})(x+${b})}$ into partial fraction form.`, `$\\frac{A}{x-${a}} + \\frac{B}{x+${b}}$`, [`$\\frac{A}{x-${a}} - \\frac{B}{x+${b}}$`, `$\\frac{Ax}{x-${a}} + \\frac{B}{x+${b}}$`, `$\\frac{A}{(x-${a})^2} + \\frac{B}{(x+${b})^2}$`], `Just $A$ over first factor, $B$ over second.`));
    }
    // dx/((x-1)(x-2)) integration
    questions.push(mcq(`Evaluate $\\int \\frac{dx}{(x-1)(x-2)}$`, `$\\ln|x-2| - \\ln|x-1| + C$`, [`$\\ln|x-1| - \\ln|x-2| + C$`, `$\\ln|x-1| + \\ln|x-2| + C$`, `$\\frac{1}{(x-1)^2} + C$`], `Decomposes to $1/(x-2) - 1/(x-1)$.`));
    
    // form for repeating roots
    for(let i=0; i<5; i++){
        const k = rInt(2, 5);
        questions.push(mcq(`What is the partial fraction form for $\\frac{1}{x(x+${k})^2}$?`, `$\\frac{A}{x} + \\frac{B}{x+${k}} + \\frac{C}{(x+${k})^2}$`, [`$\\frac{A}{x} + \\frac{Bx+C}{(x+${k})^2}$`, `$\\frac{A}{x} + \\frac{B}{x+${k}}$`, `$\\frac{A}{x} + \\frac{B}{(x+${k})^2}$`], `Repeated linear factor gets ascending powers in denominators.`));
    }
    // form for irreducible quadratic
    for(let i=0; i<6; i++){
        const a = rInt(1,4); const b = rInt(1,5);
        questions.push(mcq(`What is the partial fraction form for $\\frac{x}{(x-${a})(x^2+${b})}$?`, `$\\frac{A}{x-${a}} + \\frac{Bx+C}{x^2+${b}}$`, [`$\\frac{A}{x-${a}} + \\frac{B}{x^2+${b}}$`, `$\\frac{A}{x-${a}} + \\frac{Bx}{x^2+${b}}$`, `$\\frac{Ax+B}{x-${a}} + \\frac{Cx+D}{x^2+${b}}$`], `Irreducible quadratic $x^2+${b}$ gets linear numerator $Bx+C$.`));
    }
    return shuffle(questions).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 5 — INTEGRALS OF SOME PARTICULAR FUNCTIONS
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill5Q = () => {
    const questions = [];
    questions.push(mcq(`$\\int \\frac{dx}{x^2 - a^2}$`, `$\\frac{1}{2a}\\ln|\\frac{x-a}{x+a}| + C$`, [`$\\frac{1}{2a}\\ln|\\frac{x+a}{x-a}| + C$`, `$\\frac{1}{a}\\ln|x-a| + C$`, `$\\frac{1}{x^2 - a^2}$`], `Standard formula derived from partial fractions.`));
    questions.push(mcq(`$\\int \\frac{dx}{a^2 - x^2}$`, `$\\frac{1}{2a}\\ln|\\frac{a+x}{a-x}| + C$`, [`$\\frac{1}{2a}\\ln|\\frac{a-x}{a+x}| + C$`, `$\\frac{1}{a}\\ln|a-x| + C$`, `$-\\frac{1}{2a}\\ln|x^2-a^2| + C$`], `Standard formula.`));
    questions.push(mcq(`$\\int \\frac{dx}{x^2 + a^2}$`, `$\\frac{1}{a}\\tan^{-1}(\\frac{x}{a}) + C$`, [`$\\sin^{-1}(\\frac{x}{a}) + C$`, `$\\tan^{-1}(a) + C$`, `$\\frac{-1}{a^2 + x^2} + C$`], `Standard inverse tangent formula.`));

    // dx/(x^2 + r^2)
    for(let i=0; i<4; i++){
        const a = rInt(2, 6); const a2 = a*a;
        questions.push(mcq(`Evaluate $\\int \\frac{dx}{x^2 + ${a2}}$`, `$\\frac{1}{${a}}\\tan^{-1}(\\frac{x}{${a}}) + C$`, [`$\\frac{1}{${a2}}\\tan^{-1}(\\frac{x}{${a2}}) + C$`, `$\\frac{1}{${a}}\\ln|x^2+${a2}| + C$`, `$\\tan^{-1}(${a}x) + C$`], `Here $a=${a}$, so it's $\\frac{1}{a}\\tan^{-1}(x/a)$.`));
    }
    // dx/sqrt(a^2 - x^2)
    for(let i=0; i<4; i++){
        const a = rInt(2, 5); const a2 = a*a;
        questions.push(mcq(`Evaluate $\\int \\frac{dx}{\\sqrt{${a2} - x^2}}$`, `$\\sin^{-1}(\\frac{x}{${a}}) + C$`, [`$\\frac{1}{${a}}\\sin^{-1}(\\frac{x}{${a}}) + C$`, `$\\cos^{-1}(\\frac{x}{${a}}) + C$`, `$\\sin^{-1}(${a}x) + C$`], `Note there is NO $1/a$ coefficient for arcsin! Here $a=${a}$.`));
    }
    // dx/sqrt(x^2 + a^2)
    for(let i=0; i<4; i++){
        const a = rInt(2, 4); const a2 = a*a;
        questions.push(mcq(`Evaluate $\\int \\frac{dx}{\\sqrt{x^2 + ${a2}}}$`, `$\\ln|x + \\sqrt{x^2 + ${a2}}| + C$`, [`$\\sin^{-1}(\\frac{x}{${a}}) + C$`, `$\\frac{1}{${a}}\\ln(x+\\sqrt{x^2+${a2}}) + C$`, `$\\frac{1}{2}\\ln|x^2 + ${a2}| + C$`], `Standard format for $\\int dx/\\sqrt{x^2+a^2}$.`));
    }
    // dx/sqrt(x^2 - a^2)
    for(let i=0; i<5; i++){
        const a = rInt(2, 5); const a2 = a*a;
        questions.push(mcq(`Evaluate $\\int \\frac{dx}{\\sqrt{x^2 - ${a2}}}$`, `$\\ln|x + \\sqrt{x^2 - ${a2}}| + C$`, [`$\\cos^{-1}(\\frac{x}{${a}}) + C$`, `$\\frac{1}{x}\\sqrt{x^2 - ${a2}} + C$`, `$\\frac{1}{${a}}\\ln|x - \\sqrt{x^2-${a2}}| + C$`], `Standard format for $\\int dx/\\sqrt{x^2-a^2}$.`));
    }

    return shuffle(questions).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 6 — IRRATIONAL SPECIAL INTEGRALS
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill6Q = () => {
    const questions = [];
    questions.push(mcq(`$\\int \\sqrt{x^2 + a^2} \\,dx$`, `$\\frac{x}{2}\\sqrt{x^2+a^2} + \\frac{a^2}{2}\\ln|x+\\sqrt{x^2+a^2}| + C$`, [`$\\frac{1}{2}\\ln|x+\\sqrt{x^2+a^2}| + C$`, `$\\frac{1}{a}\\tan^{-1}(\\frac{x}{a}) + C$`, `$\\frac{2}{3}(x^2+a^2)^{3/2} + C$`], `Standard large integration formula derived using Integration by Parts.`));
    questions.push(mcq(`$\\int \\sqrt{a^2 - x^2} \\,dx$`, `$\\frac{x}{2}\\sqrt{a^2-x^2} + \\frac{a^2}{2}\\sin^{-1}\\left(\\frac{x}{a}\\right) + C$`, [`$\\frac{x}{2}\\sqrt{a^2-x^2} - \\frac{a^2}{2}\\sin^{-1}\\left(\\frac{x}{a}\\right) + C$`, `$\\frac{1}{a}\\sin^{-1}(\\frac{x}{a}) + C$`, `$\\frac{x}{2}\\sqrt{x^2-a^2} + \\frac{a^2}{2}\\ln|x+\\sqrt{x^2-a^2}| + C$`], `Standard formula. It outputs the area of a circle.`));
    questions.push(mcq(`$\\int \\sqrt{x^2 - a^2} \\,dx$`, `$\\frac{x}{2}\\sqrt{x^2-a^2} - \\frac{a^2}{2}\\ln|x+\\sqrt{x^2-a^2}| + C$`, [`$\\frac{x}{2}\\sqrt{x^2-a^2} + \\frac{a^2}{2}\\ln|x+\\sqrt{x^2-a^2}| + C$`, `$\\frac{1}{2a}\\ln|\\frac{x-a}{x+a}| + C$`, `$\\frac{x}{2}\\sqrt{a^2-x^2} + \\frac{a^2}{2}\\cos^{-1}(\\frac{x}{a}) + C$`], `Standard formula. Notice the minus sign!`));

    // sqrt(x^2 + a^2)
    for(let i=0; i<4; i++){
        const a = rInt(2, 5); const a2 = a*a;
        questions.push(mcq(`Evaluate $\\int \\sqrt{x^2 + ${a2}} \\,dx$`, `$\\frac{x}{2}\\sqrt{x^2+${a2}} + \\frac{${a2}}{2}\\ln|x+\\sqrt{x^2+${a2}}| + C$`, [`$\\frac{x}{2}\\sqrt{x^2+${a2}} - \\frac{${a2}}{2}\\ln|x+\\sqrt{x^2+${a2}}| + C$`, `$\\frac{x}{3}\\sqrt{x^2+${a2}} + \\frac{${a2}}{2}\\ln(x+\\sqrt{x^2+${a2}}) + C$`, `$\\frac{2}{3}(x^2+${a2})^{3/2} + C$`], `Here $a^2=${a2}$. Apply standard formula.`));
    }
    // sqrt(a^2 - x^2)
    for(let i=0; i<4; i++){
        const a = rInt(2, 6); const a2 = a*a;
        questions.push(mcq(`Evaluate $\\int \\sqrt{${a2} - x^2} \\,dx$`, `$\\frac{x}{2}\\sqrt{${a2}-x^2} + \\frac{${a2}}{2}\\sin^{-1}\\left(\\frac{x}{${a}}\\right) + C$`, [`$\\frac{x}{2}\\sqrt{${a2}-x^2} - \\frac{${a2}}{2}\\sin^{-1}\\left(\\frac{x}{${a}}\\right) + C$`, `$\\frac{1}{2}\\sqrt{${a2}-x^2} + \\frac{1}{2}\\sin^{-1}(\\frac{x}{${a}}) + C$`, `$\\sin^{-1}(\\frac{x}{${a}}) + C$`], `Here $a^2=${a2}, a=${a}$. Apply standard formula.`));
    }
    // generic practice
    for(let i=0; i<9; i++){
        const k = rInt(11, 20);
        questions.push(mcq(`Evaluate $\\int \\sqrt{x^2 - ${k}} \\,dx$`, `$\\frac{x}{2}\\sqrt{x^2-${k}} - \\frac{${k}}{2}\\ln|x+\\sqrt{x^2-${k}}| + C$`, [`$\\frac{x}{2}\\sqrt{x^2-${k}} + \\frac{${k}}{2}\\ln|x+\\sqrt{x^2-${k}}| + C$`, `$\\frac{1}{${k}}\\ln|x+\\sqrt{x^2-${k}}| + C$`, `$\\frac{x}{3}\\sqrt{x^2-${k}} + C$`], `Standard formula with $a^2 = ${k}$.`));
    }

    return shuffle(questions).slice(0, 20);
};

export const intSkillsPart2 = [
    {
        id: 'int-partial',
        title: 'Integration by Partial Fractions',
        subtitle: 'Skill 4',
        icon: '🍰',
        color: '#10b981',
        desc: 'Split impossible rational denominators into bite-sized summable pieces.',
        practice: genSkill4Q,
        assessment: genSkill4Q,
        learn: {
            concept: 'When the integrand is an algebraic fraction where the degree of the numerator is less than the denominator, we can factor the denominator and split the fraction into simpler terms that integrate via $\\ln|x|$.',
            rules: [
                { title: 'Distinct Linear Factors', f: '\\frac{1}{(x-a)(x-b)} = \\frac{A}{x-a} + \\frac{B}{x-b}', d: 'For every unique linear factor in the denominator, assign a constant ($A$, $B$, etc.) to its numerator.', ex: '1/(x(x-1)) = A/x + B/(x-1)', tip: 'Find A and B by equating numerators.' },
                { title: 'Repeated Linear Factors', f: '\\frac{1}{(x-a)^2} = \\frac{A}{x-a} + \\frac{B}{(x-a)^2}', d: 'If a factor repeats, you must include a fraction for every ascending power of that factor.', ex: '1/(x-1)^3 = A/(x-1) + B/(x-1)^2 + C/(x-1)^3', tip: 'Ascend the powers!' },
                { title: 'Quadratic Factors', f: '\\frac{1}{x^2+a} = \\frac{Ax+B}{x^2+a}', d: 'Irreducible quadratics ($x^2+a$) require a full linear term ($Ax+B$) in the numerator.', ex: 'x/((x-1)(x^2+1)) = A/(x-1) + (Bx+C)/(x^2+1)', tip: 'Quadratic bottom gets a linear top.' }
            ]
        }
    },
    {
        id: 'int-particular',
        title: 'Integrals of Particular Functions',
        subtitle: 'Skill 5',
        icon: '🔑',
        color: '#f59e0b',
        desc: 'Memorize the exact formulas for 6 special rational and irrational forms.',
        practice: genSkill5Q,
        assessment: genSkill5Q,
        learn: {
            concept: 'There are 6 standard integrals involving $x^2 \\pm a^2$ in the denominator, with and without square roots. These formulas are the keys to unlocking many larger problems.',
            rules: [
                { title: 'Without Roots', f: '\\int \\frac{dx}{x^2+a^2} = \\frac{1}{a}\\tan^{-1}(\\left(\\frac{x}{a}\\right))', d: 'The sum of squares in the denominator leads to the inverse tangent. The subtraction variations lead to $\\frac{1}{2a}\\ln$.', ex: '\\int \\frac{dx}{x^2+9} = \\frac{1}{3}\\tan^{-1}(\\frac{x}{3})', tip: 'x^2+a^2 -> arctan!' },
                { title: 'With Roots (arcsin)', f: '\\int \\frac{dx}{\\sqrt{a^2-x^2}} = \\sin^{-1}(\\left(\\frac{x}{a}\\right))', d: 'The difference of squares, constant first, under a root, leads to inverse sine. Notice there is no $1/a$ in front.', ex: '\\int \\frac{dx}{\\sqrt{25-x^2}} = \\sin^{-1}(\\frac{x}{5})', tip: 'Constant minus x^2 -> arcsin!' },
                { title: 'With Roots (ln)', f: '\\int \\frac{dx}{\\sqrt{x^2 \\pm a^2}} = \\ln|x + \\sqrt{x^2 \\pm a^2}|', d: 'When $x^2$ is first under the root, use a natural log.', ex: '\\text{Follow the exact formula pattern.}', tip: 'Just ln(x + the root)!' }
            ]
        }
    },
    {
        id: 'int-sqrt-particular',
        title: 'Irrational Special Integrals',
        subtitle: 'Skill 6',
        icon: '🪓',
        color: '#14b8a6',
        desc: 'Memorize the heavy-duty formulas with square roots in the numerator.',
        practice: genSkill6Q,
        assessment: genSkill6Q,
        learn: {
            concept: 'When differentiating, things get messier. When integrating by parts recursively, we encounter expressions that loop back on themselves, creating these three massive standard formulas.',
            rules: [
                { title: 'The Circle Area Formula', f: '\\int \\sqrt{a^2-x^2} dx = \\frac{x}{2}\\sqrt{a^2-x^2} + \\frac{a^2}{2}\\sin^{-1}(\\frac{x}{a})', d: 'This is the integral that calculates the area of a circle. Uses an inverse sine.', ex: '\\text{Common in geometry problems.}', tip: 'Constant minus x squared -> arcsin.' },
                { title: 'The Hyperbolic Formulas', f: '\\int \\sqrt{x^2 \\pm a^2} dx', d: 'These two follow an almost identical pattern to the circle formula, but finish with $\\ln|x + \\sqrt{\\dots}|$ instead of $\\sin^{-1}$.', ex: '\\text{Notice that all 3 start with } \\frac{x}{2}\\text{Root}.', tip: 'x squared first -> ln.' },
                { title: 'The Minus Sign Trap', f: '\\int \\sqrt{x^2-a^2} dx', d: 'The only formula of the three that uses a subtraction sign before the second heavy term!', ex: '\\frac{x}{2}\\sqrt{x^2-a^2} \\bold{-} \\frac{a^2}{2}\\ln|\\dots|', tip: 'Watch that minus sign!' }
            ]
        }
    }
];

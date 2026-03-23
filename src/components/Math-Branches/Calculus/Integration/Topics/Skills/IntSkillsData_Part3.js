// ─── INTEGRATION SKILLS PART 3 (Skills 7-9) ──────────────────────────

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
   SKILL 7 — DEFINITE INTEGRALS & FUNDAMENTAL THEOREM
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill7Q = () => {
    const questions = [];
    questions.push(mcq(`What is the first fundamental theorem of calculus?`, `$\\int_{a}^{b} f(x)dx = F(b) - F(a)$ where $F'(x)=f(x)$`, [`$\\frac{d}{dx} \\int f(x)dx = f'(x)$`, `The derivative of a constant is zero`, `All continuous functions are differentiable`], `The cornerstone of calculus linking the integral and derivative.`));
    
    // ∫cx dx from 0 to a
    for(let i=0; i<8; i++){
        const c = rInt(2, 6); const a = rInt(2, 5);
        const ans = (c/2) * (a*a);
        questions.push(mcq(`Evaluate $\\int_{0}^{${a}} ${c}x \\,dx$`, `$${ans}$`, [`$${ans + c}$`, `$${ans - c}$`, `$${c*a}$`], `Anti-der is $\\frac{${c}x^2}{2}$. Evaluate at $${a}$ gives $\\frac{${c}(${a*a})}{2} = ${ans}$.`));
    }

    // ∫ x^2 dx from 0 to 3 => 3^3 / 3 = 9
    for(let i=0; i<8; i++){
        const a = rInt(2, 4);
        const ans = (a*a*a)/3;
        questions.push(mcq(`Evaluate $\\int_{0}^{${a}} x^2 \\,dx$`, `$${ans}$`, [`$${ans*3}$`, `$${a*a}$`, `$${ans/2}$`], `Anti-der is $x^3/3$. $( ${a} )^3 / 3 = ${ans}$.`));
    }

    // ∫ cos x dx from 0 to pi/2
    questions.push(mcq(`Evaluate $\\int_{0}^{\\pi/2} \\cos x \\,dx$`, `$1$`, [`$0$`, `$-1$`, `$\\pi/2$`], `Anti-der is $\\sin x$. $\\sin(\\pi/2) - \\sin(0) = 1 - 0 = 1$.`));
    
    // ∫ sin x dx from 0 to pi
    questions.push(mcq(`Evaluate $\\int_{0}^{\\pi} \\sin x \\,dx$`, `$2$`, [`$0$`, `$1$`, `$-2$`], `Anti-der is $-\\cos x$. $(-\\cos \\pi) - (-\\cos 0) = -(-1) - (-1) = 2$.`));

    // ∫ dx from a to b
    for(let i=0; i<8; i++){
        const a = rInt(1, 10); const b = rInt(15, 30);
        questions.push(mcq(`Evaluate $\\int_{${a}}^{${b}} dx$`, `$${b-a}$`, [`$${b+a}$`, `$1$`, `$${b}$`], `Integral is $x$. $x|_{${a}}^{${b}} = ${b} - ${a} = ${b-a}$.`));
    }
    
    // basic understanding
    for(let i=0; i<4; i++){
        questions.push(mcq(`Does a definite integral have a $+ C$?`, `No, the $C$ terms subtract out when you do $F(b) - F(a)$.`, [`Yes, but we just ignore it`, `Yes, it evaluates to 0`, `Only if $a$ or $b$ contains 0`], `$(F(b)+C) - (F(a)+C) = F(b) - F(a)$.`));
    }
    return shuffle(questions).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 8 — PROPERTIES OF DEFINITE INTEGRALS
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill8Q = () => {
    const questions = [];
    questions.push(mcq(`What happens if you reverse the limits of a definite integral?`, `$\\int_{a}^{b} f(x)dx = -\\int_{b}^{a} f(x)dx$`, [`The integral becomes zero`, `The integral remains the same`, `The integral becomes $1/ \\int$`], `Reversing limits negates the area.`));
    questions.push(mcq(`What is $\\int_{a}^{a} f(x)dx$?`, `$0$`, [`$f(a)$`, `$F(a)$`, `$2a$`], `Area of a line is zero.`));
    questions.push(mcq(`If $f(-x) = f(x)$ (even function), what is $\\int_{-a}^{a} f(x)dx$?`, `$2\\int_{0}^{a} f(x)dx$`, [`$0$`, `$\\int_{0}^{2a} f(x)dx$`, `$-2\\int_{0}^{a} f(x)dx$`], `Symmetric across the y-axis, so the areas exist on both sides equally.`));
    questions.push(mcq(`If $f(-x) = -f(x)$ (odd function), what is $\\int_{-a}^{a} f(x)dx$?`, `$0$`, [`$2\\int_{0}^{a} f(x)dx$`, `$\\int_{0}^{a} f(x)dx$`, `$-2\\int_{0}^{a} f(x)dx$`], `An odd function has opposite signed areas that completely cancel out.`));
    
    // applying property ∫_a^b f(x)dx = ∫_a^c + ∫_c^b
    for(let i=0; i<8; i++){
        const c = rInt(5, 10);
        questions.push(mcq(`If $\\int_{0}^{${c}} f(x)dx = 8$ and $\\int_{${c}}^{15} f(x)dx = 3$, what is $\\int_{0}^{15} f(x)dx$?`, `$11$`, [`$5$`, `$24$`, `$8/3$`], `Areas are additive over intervals.`));
    }
    // applying odd property
    for(let i=0; i<8; i++){
        const k = rInt(3, 9);
        questions.push(mcq(`Evaluate $\\int_{-${k}}^{${k}} \\sin^3(x) dx$`, `$0$`, [`$2\\sin(${k})$`, `$1$`, `$\\cos^4(${k})$`], `Since $sin^3(-x) = -sin^3(x)$, it is an odd function over a symmetric interval. Integral is 0.`));
    }
    // another property ∫_0^a f(x) = ∫_0^a f(a-x)
    for(let i=0; i<8; i++){
        questions.push(mcq(`Which property shows shifting and reflecting over an interval $[0, a]$?`, `$\\int_{0}^{a} f(x)dx = \\int_{0}^{a} f(a-x)dx$`, [`$\\int_{a}^{b} f(x) = \\int_{a}^{b} f(-x)$`, `$\\int_{-a}^{a} f(x) = 0$`, `$\\int f(x+a) = \\int f(x)$`], `This is a very powerful property that often simplifies integrals magically.`));
    }
    return shuffle(questions).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 9 — AREA UNDER CURVE
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill9Q = () => {
    const questions = [];
    questions.push(mcq(`How do you find the geometric area bounded by $y = f(x)$, x-axis, $x=a$ and $x=b$?`, `$\\int_{a}^{b} |f(x)|dx$`, [`$\\int_{a}^{b} f(x)dx$`, `$\\pi \\int (f(x))^2 dx$`, `$f(b) - f(a)$`], `Absolute value ensures parts below the x-axis are counted as positive area.`));
    questions.push(mcq(`How do you find the area bounded between two curves $f(x)$ and $g(x)$ where $f(x) \\geq g(x)$?`, `$\\int_{a}^{b} [f(x) - g(x)]dx$`, [`$\\int_{a}^{b} [g(x) - f(x)]dx$`, `$\\int_{a}^{b} f(x)dx \\cdot \\int_{a}^{b} g(x)dx$`, `$\\int [f(x)+g(x)]dx$`], `Top curve minus bottom curve.`));
    
    // Area of y=x from 0 to 4
    questions.push(mcq(`Find the area bounded by $y=x$, the x-axis, and $x=4$.`, `$8$`, [`$16$`, `$4$`, `$12$`], `$\\int_0^4 x\\,dx = 16/2 = 8$. (This is a triangle with base 4, height 4).`));
    
    // Area of y=x^2 from 0 to 3
    questions.push(mcq(`Find the area bounded by $y=x^2$, x-axis, from $x=0$ to $x=3$.`, `$9$`, [`$27$`, `$6$`, `$18$`], `$\\int_0^3 x^2\\,dx = 27/3 = 9$.`));

    // Area of half sine wave
    questions.push(mcq(`Find the area bounded by $y=\\sin x$ from $0$ to $\\pi$.`, `$2$`, [`$0$`, `$1$`, `$\\pi$`], `$\\int_0^\\pi \\sin x\\,dx = 2$.`));

    // Area between y=x^2 and y=x. Intersection at x=0 and x=1. Top curve is x.
    questions.push(mcq(`Find the area bounded between $y=x$ and $y=x^2$.`, `$1/6$`, [`$1/3$`, `$1/2$`, `$5/6$`], `$\\int_0^1 (x - x^2)dx = 1/2 - 1/3 = 1/6$.`));

    // basic concept of area below axis
    for(let i=0; i<8; i++){
        questions.push(mcq(`If a curve dips below the x-axis, integrating directly will give a negative number. How do we find its geometric area?`, `Take the absolute value of the integral for that region.`, [`Square the integral`, `It's impossible to find`, `Add the y-intercept`], `Geometric area is strictly positive.`));
    }
    for(let i=0; i<8; i++){
        questions.push(mcq(`Where do the integration limits come from when finding the area between two closed curves?`, `The x-coordinates of their points of intersection.`, [`$0$ and $1$`, `The y-intercepts of the curves`, `The vertex of the parabola`], `Set $f(x) = g(x)$ to find boundaries $a$ and $b$.`));
    }

    return shuffle(questions).slice(0, 20);
};

export const intSkillsPart3 = [
    {
        id: 'int-definite',
        title: 'Definite Integrals',
        subtitle: 'Skill 7',
        icon: '🔲',
        color: '#f97316',
        desc: 'Escape the +C and calculate exact areas with the Fundamental Theorem.',
        practice: genSkill7Q,
        assessment: genSkill7Q,
        learn: {
            concept: 'The Fundamental Theorem of Calculus states that taking the difference of an anti-derivative evaluated at two endpoints gives you the exact net area under the original curve.',
            rules: [
                { title: 'The Fundamental Theorem', f: '\\int_a^b f(x)dx = F(b) - F(a)', d: 'Evaluate the integral at the top boundary $b$, evaluate at the bottom boundary $a$, and subtract.', ex: '\\int_0^2 x^2 dx = \\frac{2^3}{3} - \\frac{0^3}{3} = \\frac{8}{3}', tip: 'Top minus bottom.' },
                { title: 'No +C Needed', f: '\\text{Why the C vanishes}', d: 'When evaluating definite integrals: $(F(b) + C) - (F(a) + C) = F(b) - F(a)$. The $C$ cancels itself out perfectly every time.', ex: '\\text{Forget the C}.', tip: 'Definite integrals equal numbers, not functions.' }
            ]
        }
    },
    {
        id: 'int-properties',
        title: 'Properties of Definite Integrals',
        subtitle: 'Skill 8',
        icon: '🧬',
        color: '#6366f1',
        desc: 'Use symmetry and interval slicing to shortcut integrations.',
        practice: genSkill8Q,
        assessment: genSkill8Q,
        learn: {
            concept: 'Definite integrals possess unique geometric properties that can radically simplify or entirely bypass the need to find an anti-derivative.',
            rules: [
                { title: 'Even & Odd Symmetry', f: '\\int_{-a}^a f(x)dx', d: 'If the interval is symmetric around the y-axis ($-a$ to $a$): odd functions integrate to 0 because the areas cancel. Even functions can be doubled from $0$ to $a$.', ex: '\\int_{-2}^2 x^3 dx = 0', tip: 'Check if it is odd first!' },
                { title: 'Reflection Property', f: '\\int_0^a f(x)dx = \\int_0^a f(a-x)dx', d: 'Flipping and shifting the function doesn\'t change the total area. Often used to transform terrifying trig fractions into 1.', ex: '\\text{The "King" Property of Integration.}', tip: 'Swap x for (lower+upper - x).' },
                { title: 'Reversing Bounds', f: '\\int_a^b = -\\int_b^a', d: 'Integrating backwards gives you negative area.', ex: '\\int_2^0 = -\\int_0^2', tip: 'Swap limits, flip sign.' }
            ]
        }
    },
    {
        id: 'int-area',
        title: 'Area Under curves',
        subtitle: 'Skill 9',
        icon: '📐',
        color: '#ec4899',
        desc: 'Calculate the physical geometric area between curves and axes.',
        practice: genSkill9Q,
        assessment: genSkill9Q,
        learn: {
            concept: 'While definite integrals calculate "net signed area", the real geometric area is always positive. You must identify where a curve crosses the axis or another curve to calculate it properly.',
            rules: [
                { title: 'Geometric Area', f: 'Area = \\int_a^b |f(x)| dx', d: 'If a curve dips below the x-axis, its integral is negative. To find the geometric area, you must split the integral at the x-intercepts and make the negative part positive.', ex: '\\int_0^{2\\pi} \\sin x dx = 0 \\text{, but its geometric area is } 4', tip: 'Split at the roots!' },
                { title: 'Area Between Curves', f: '\\int_a^b [f(x) - g(x)] dx', d: 'Area between a top curve $f(x)$ and a bottom curve $g(x)$. You integrate the difference. Be sure $f(x)$ stays physically above $g(x)$!', ex: '\\text{Top curve minus bottom curve.}', tip: 'Ceiling minus Floor.' },
                { title: 'Finding Boundaries', f: 'f(x) = g(x)', d: 'To find the limits of integration $a$ and $b$, set the two curve equations equal to each other and solve for $x$.', ex: 'x^2 = x \\implies x=0, x=1', tip: 'Where do they intersect?' }
            ]
        }
    }
];

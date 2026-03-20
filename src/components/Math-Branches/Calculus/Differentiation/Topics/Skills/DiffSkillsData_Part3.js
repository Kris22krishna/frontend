// ─── DIFFERENTIATION SKILLS PART 3 (Skills 7-9) ──────────────────────

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
   SKILL 7 — LOGARITHMIC DIFFERENTIATION
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill7Q = () => {
    const questions = [];

    questions.push(mcq(`When is Logarithmic Differentiation strictly necessary?`, `When a variable base is raised to a variable power, like $y = x^x$.`, [`When differentiating any exponential function`, `When dealing with $\\ln x$`, `When differentiating products of logs`], `You cannot use power or exponential rules for $x^x$. You must take the natural log of both sides.`));
    questions.push(mcq(`What is the first step in differentiating $y = x^{\\sin x}$?`, `Take the natural log of both sides: $\\ln y = \\sin x \\cdot \\ln x$.`, [`Use the chain rule on $x^{\\sin x}$`, `Apply product rule to $x$ and $\\sin x$`, `Set $y=0$`], `By taking $\\ln()$, the power $\\sin x$ comes down to become a manageable product.`));

    for(let i=0; i<8; i++){
        questions.push(mcq(`Find $\\frac{dy}{dx}$ for $y = x^x$.`, `$x^x (1 + \\ln x)$`, [`$x^x \\ln x$`, `$x \\cdot x^{x-1}$`, `$x^x (1 - \\ln x)$`], `$\\ln y = x \\ln x \\implies \\frac{y'}{y} = x(1/x) + \\ln x \\implies y' = y(1 + \\ln x)$.`));
    }

    // y = x^(kx)
    for(let i=0; i<3; i++){
        const k = rInt(2, 5);
        questions.push(mcq(`Find $\\frac{dy}{dx}$ for $y = x^{${k}x}$.`, `$x^{${k}x} (${k} + ${k}\\ln x)$`, [`$${k}x^{${k}x} (1 + \\ln x)$`, `$x^{${k}x-1}$`, `$${k} x^{${k}x} \\ln x$`], `$\\ln y = ${k}x \\ln x$. $y'/y = ${k}x(1/x) + ${k}\\ln x = ${k} + ${k}\\ln x$.`));
    }

    // general properties useful for logs
    questions.push(mcq(`Why is taking $\\ln()$ useful for taking the derivative of a massive fraction like $y = \\frac{u v}{w}$?`, `$\\ln y = \\ln u + \\ln v - \\ln w$, turning complex quotients into simple addition.`, [`Because logs cancel out fractions`, `Because $1/y$ is easier to compute`, `It isn't useful for fractions.`], `Log properties dissolve multiplication and division into addition and subtraction.`));

    // derivative of ln(y)
    for(let i=0; i<5; i++){
        questions.push(mcq(`When you implicitly differentiate $\\ln y$ with respect to $x$, what do you get?`, `$\\frac{1}{y} \\frac{dy}{dx}$`, [`$\\frac{1}{x} \\frac{dy}{dx}$`, `$\\frac{1}{y}$`, `$\\frac{dy}{dx}$`], `The chain rule forces the $y'$ attached to the derivative of the log.`));
    }

    return shuffle(questions).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 8 — PARAMETRIC DIFFERENTIATION
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill8Q = () => {
    const questions = [];

    questions.push(mcq(`How do you find $\\frac{dy}{dx}$ when $x$ and $y$ are both functions of a parameter $t$?`, `$\\frac{dy/dt}{dx/dt}$`, [`$\\frac{dx/dt}{dy/dt}$`, `$\\frac{dy}{dt} \\cdot \\frac{dx}{dt}$`, `$\\frac{d}{dt}(xy)$`], `Divide the rate of change of y by the rate of change of x.`));

    // basic algebraic
    for(let i=0; i<8; i++){
        const k = rInt(2, 5);
        questions.push(mcq(`If $x = ${k}t^2$ and $y = ${k}t^3$, find $\\frac{dy}{dx}$.`, `$\\frac{3t}{2}$`, [`$\\frac{2}{3t}$`, `$3t^2$`, `$\\frac{3}{2t}$`], `$dx/dt = ${2*k}t$, $dy/dt = ${3*k}t^2$. $dy/dx = (${3*k}t^2) / (${2*k}t) = 3t/2$.`));
    }

    // circle: x = r cos t, y = r sin t
    for(let i=0; i<8; i++){
        const r = rInt(2, 8);
        questions.push(mcq(`If $x = ${r}\\cos t$ and $y = ${r}\\sin t$, find $\\frac{dy}{dx}$.`, `$-\\cot t$`, [`$\\tan t$`, `$-\\tan t$`, `$\\cot t$`], `$dy/dt = ${r}\\cos t$, $dx/dt = -${r}\\sin t$. Ratio is $-\\cot t$.`));
    }

    // general
    for(let i=0; i<4; i++){
        questions.push(mcq(`What does the parameter '$t$' usually represent in physics problems involving parametric curves?`, `Time`, [`Temperature`, `Total Area`, `The tangent line`], `Parametric equations often describe a particle's separate X and Y motion over time T.`));
    }

    questions.push(mcq(`If $x = e^t$ and $y = e^{2t}$, what is $\\frac{dy}{dx}$?`, `$2e^t$`, [`$e^t$`, `$2e^{2t}$`, `$2t$`], `$dx/dt = e^t, dy/dt = 2e^{2t}$. Ratio is $2e^{2t}/e^t = 2e^t$.`));

    return shuffle(questions).slice(0, 20);
};

/* ════════════════════════════════════════════════════════════════════════════
   SKILL 9 — HIGHER ORDER DERIVATIVES
   ════════════════════════════════════════════════════════════════════════════ */
const genSkill9Q = () => {
    const questions = [];

    questions.push(mcq(`What is the notation for the second derivative of $y$ with respect to $x$?`, `$\\frac{d^2y}{dx^2}$`, [`$\\left(\\frac{dy}{dx}\\right)^2$`, `$\\frac{dy^2}{d^2x}$`, `$\\frac{d_2y}{dx_2}$`], `The standard Leibniz notation for the second derivative.`));

    // polynomial
    for(let i=0; i<8; i++){
        const a = rInt(2, 5);
        questions.push(mcq(`Find the second derivative of $y = ${a}x^3$`, `$${6*a}x$`, [`$${3*a}x^2$`, `$${6*a}x^2$`, `$${a}x$`], `1st: ${3*a}x^2. 2nd: ${6*a}x.`));
    }
    
    // cyclic
    questions.push(mcq(`What is the 4th derivative of $\\sin x$?`, `$\\sin x$`, [`$\\cos x$`, `$-\\sin x$`, `$-\\cos x$`], `sin $\\to$ cos $\\to$ -sin $\\to$ -cos $\\to$ sin.`));
    questions.push(mcq(`Find $y''$ if $y = e^{2x}$`, `$4e^{2x}$`, [`$2e^{2x}$`, `$e^{2x}$`, `$8e^{2x}$`], `1st: $2e^{2x}$. 2nd: $4e^{2x}$.`));
    
    for(let i=0; i<8; i++){
        const k = rInt(3, 7);
        questions.push(mcq(`What is the ${k}th derivative of $e^x$?`, `$e^x$`, [`$x e^x$`, `$0$`, `$ke^x$`], `The derivative of $e^x$ is always $e^x$ infinitely.`));
    }

    // ln x
    questions.push(mcq(`Find the second derivative of $\\ln x$`, `$-\\frac{1}{x^2}$`, [`$\\frac{1}{x}$`, `$\\frac{1}{x^2}$`, `$-\\frac{2}{x^3}$`], `1st is $x^{-1}$, so 2nd is $-x^{-2}$.`));

    // geometric meaning
    questions.push(mcq(`If the first derivative represents velocity, what does the second derivative represent?`, `Acceleration`, [`Jerk`, `Position`, `Total Distance`], `Acceleration is the rate of change of velocity.`));
    questions.push(mcq(`What does the second derivative tell you about the shape of a graph?`, `Its concavity (whether it curves upward or downward).`, [`Its exact y-intercept`, `Its slope at $x=0$`, `Whether it is a function or not`], `Positive $y''$ means concave up (like a cup). Negative means concave down (like a frown).`));

    return shuffle(questions).slice(0, 20);
};

export const diffSkillsPart3 = [
    {
        id: 'diff-logarithmic',
        title: 'Logarithmic Differentiation',
        subtitle: 'Skill 7',
        icon: '🪵',
        color: '#f97316',
        desc: 'Take the natural log of both sides to dissolve terrifying powers and fractions.',
        practice: genSkill7Q,
        assessment: genSkill7Q,
        learn: {
            concept: 'When dealing with functions where BOTH the base and exponent have variables (like $y = x^{\\sin x}$), standard rules literally break and cannot be used. We must use logs.',
            rules: [
                { title: 'The Power Drop', f: '\\ln(x^x) = x \\ln x', d: 'Taking the natural log of both sides allows you to bring the difficult exponent down to the front as a simple multiple.', ex: '\\text{Then use implicit diff.}', tip: 'Logs destroy powers.' },
                { title: 'The Smash', f: '\\ln\\left(\\frac{uv}{w}\\right) = \\ln u + \\ln v - \\ln w', d: 'Logarithmic differentiation is also incredibly useful for giant messy fractions. It turns multiplication into addition, and division into subtraction.', ex: '\\text{Easier than quotient rule!}', tip: 'Use logs to avoid quotient rule.' }
            ]
        }
    },
    {
        id: 'diff-parametric',
        title: 'Parametric Differentiation',
        subtitle: 'Skill 8',
        icon: '⏱️',
        color: '#6366f1',
        desc: 'Find the slope when X and Y are both moving independently over time.',
        practice: genSkill8Q,
        assessment: genSkill8Q,
        learn: {
            concept: 'Often in physics, we don\'t track $Y$ relative to $X$. We track both relative to a completely invisible third parameter, $t$ (time). $x = f(t)$ and $y = g(t)$.',
            rules: [
                { title: 'The Ratio', f: '\\frac{dy}{dx} = \\frac{\\frac{dy}{dt}}{\\frac{dx}{dt}}', d: 'To find the actual slope $dy/dx$, just differentiate $y$ with respect to $t$, and divide it by the derivative of $x$ with respect to $t$.', ex: '\\text{Given } x=3t, y=5t', tip: 'Derive them both, divide y by x.' },
                { title: 'Visualizing it', f: '\\text{The dt cancels}', d: 'Think of it like fractions: if you divide a rate $dy/dt$ by $dx/dt$, the $dt$\'s "cancel out", leaving you with the pure spatial slope $dy/dx$.', ex: '\\frac{dy}{dt} \\div \\frac{dx}{dt} = \\frac{dy}{dx}', tip: 'Fractions are your friend.' }
            ]
        }
    },
    {
        id: 'diff-higher-order',
        title: 'Higher Order Derivatives',
        subtitle: 'Skill 9',
        icon: '🎢',
        color: '#ec4899',
        desc: 'Velocity, acceleration, jerk. Differentiating the derivatives.',
        practice: genSkill9Q,
        assessment: genSkill9Q,
        learn: {
            concept: 'The derivative of a function is just a new function. Therefore, you can take its derivative again! And again, and again...',
            rules: [
                { title: 'Notation', f: 'y\'\' = \\frac{d^2y}{dx^2} = f\'\'(x)', d: 'The second derivative is the rate of change of the rate of change. It tells you if the slope is getting steeper or flatter.', ex: 'y=x^3 \\implies y\'\' = 6x', tip: 'Just derive it twice.' },
                { title: 'Physics Meaning', f: '\\text{Pos } \\to \\text{Vel } \\to \\text{Accel}', d: 'If $s(t)$ is position, taking one derivative $s\'(t)$ gives velocity (speed). Taking a second derivative $s\'\'(t)$ gives acceleration.', ex: 'v(t) = s\'(t), a(t) = v\'(t) = s\'\'(t)', tip: 'Derive position twice for acceleration.' }
            ]
        }
    }
];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ── SKILL 1: Domain, Range & Principal Values ────────────────────────────────
export function genSkill1Practice() {
    const questions = [
        {
            id: 0,
            question: 'What is the principal value of $\\sin^{-1}(-\\frac{1}{2})$?',
            options: ['$-\\frac{\\pi}{6}$', '$\\frac{5\\pi}{6}$', '$\\frac{11\\pi}{6}$', '$\\frac{7\\pi}{6}$'],
            answer: 0,
            solution: 'The range of $\\sin^{-1}$ is $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$. Since $\\sin(-\\frac{\\pi}{6}) = -1/2$, the principal value is $-\\pi/6$.'
        },
        {
            id: 1,
            question: 'Evaluate $\\cos^{-1}(-\\frac{\\sqrt{3}}{2})$.',
            options: ['$\\frac{5\\pi}{6}$', '$-\\frac{\\pi}{6}$', '$\\frac{7\\pi}{6}$', '$\\frac{2\\pi}{3}$'],
            answer: 0,
            solution: 'Range of $\\cos^{-1}$ is $[0, \\pi]$. $\\cos(\\frac{5\\pi}{6}) = -\\sqrt{3}/2$, which is in the range.'
        },
        {
            id: 2,
            question: 'Find the principal value of $\\tan^{-1}(-1)$.',
            options: ['$-\\frac{\\pi}{4}$', '$\\frac{3\\pi}{4}$', '$\\frac{7\\pi}{4}$', '$\\frac{5\\pi}{4}$'],
            answer: 0,
            solution: 'Range of $\\tan^{-1}$ is $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$. $\\tan(-\\pi/4) = -1$.'
        },
        {
            id: 3,
            question: 'Which of the following functions has a range of $[0, \\pi]$?',
            options: ['$\\cos^{-1}(x)$', '$\\sin^{-1}(x)$', '$\\tan^{-1}(x)$', '$\\csc^{-1}(x)$'],
            answer: 0,
            solution: '$\\cos^{-1}(x)$ and $\\sec^{-1}(x)$ have ranges based on $[0, \\pi]$.'
        },
        {
            id: 4,
            question: 'Evaluate $\\sec^{-1}(-2)$.',
            options: ['$\\frac{2\\pi}{3}$', '$-\\frac{\\pi}{3}$', '$\\frac{4\\pi}{3}$', '$\\frac{5\\pi}{6}$'],
            answer: 0,
            solution: '$\\sec^{-1}(-2) = \\cos^{-1}(-1/2) = 2\\pi/3$.'
        }
    ];
    return shuffle(questions).slice(0, 5);
}
export function genSkill1Assessment() { return genSkill1Practice(); }

// ── SKILL 2: Evaluating Compositions ─────────────────────────────────────────
export function genSkill2Practice() {
    const questions = [
        {
            id: 0,
            question: 'Evaluate $\\sin(\\sin^{-1}(\\frac{1}{3}))$.',
            options: ['$\\frac{1}{3}$', '$\\frac{2\\sqrt{2}}{3}$', '$\\frac{\\pi}{3}$', 'Undefined'],
            answer: 0,
            solution: 'Since $1/3$ is in the domain $[-1, 1]$, $\\sin(\\sin^{-1} x) = x$.'
        },
        {
            id: 1,
            question: 'Evaluate $\\sin^{-1}(\\sin(\\frac{2\\pi}{3}))$.',
            options: ['$\\frac{\\pi}{3}$', '$\\frac{2\\pi}{3}$', '$-\\frac{\\pi}{3}$', '$\\frac{4\\pi}{3}$'],
            answer: 0,
            solution: '$\\frac{2\\pi}{3}$ is NOT in $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$. First, evaluate $\\sin(\\frac{2\\pi}{3}) = \\frac{\\sqrt{3}}{2}$. Then $\\sin^{-1}(\\frac{\\sqrt{3}}{2}) = \\frac{\\pi}{3}$.'
        },
        {
            id: 2,
            question: 'Evaluate $\\cos^{-1}(\\cos(\\frac{7\\pi}{6}))$.',
            options: ['$\\frac{5\\pi}{6}$', '$\\frac{7\\pi}{6}$', '$-\\frac{\\pi}{6}$', '$\\frac{\\pi}{6}$'],
            answer: 0,
            solution: '$\\cos(\\frac{7\\pi}{6}) = -\\frac{\\sqrt{3}}{2}$. The principal value $\\cos^{-1}(-\\frac{\\sqrt{3}}{2})$ is in Q2, which is $\\frac{5\\pi}{6}$.'
        },
        {
            id: 3,
            question: 'Find the value of $\\tan(\\cos^{-1}(\\frac{4}{5}))$.',
            options: ['$\\frac{3}{4}$', '$\\frac{4}{3}$', '$\\frac{3}{5}$', '$\\frac{5}{4}$'],
            answer: 0,
            solution: 'Let $\\theta = \\cos^{-1}(4/5)$. Then $\\cos \\theta = 4/5$. This is a 3-4-5 right triangle with adjacent 4 and hypotenuse 5. The opposite is 3. So $\\tan \\theta = 3/4$.'
        },
        {
            id: 4,
            question: 'Evaluate $\\sin(\\frac{\\pi}{2} - \\sin^{-1}(\\frac{1}{2}))$.',
            options: ['$\\frac{\\sqrt{3}}{2}$', '$\\frac{1}{2}$', '$\\frac{1}{\\sqrt{3}}$', '$\\sqrt{3}$'],
            answer: 0,
            solution: '$\\sin^{-1}(1/2) = \\pi/6$. So $\\sin(\\pi/2 - \\pi/6) = \\sin(\\pi/3) = \\sqrt{3}/2$.'
        }
    ];
    return shuffle(questions).slice(0, 5);
}
export function genSkill2Assessment() { return genSkill2Practice(); }

// ── SKILL 3: Advanced Identities ─────────────────────────────────────────────
export function genSkill3Practice() {
    const questions = [
        {
            id: 0,
            question: 'Simplify $\\tan^{-1}(x) + \\cot^{-1}(x)$ for $x > 0$.',
            options: ['$\\frac{\\pi}{2}$', '$\\pi$', '$0$', '$2\\tan^{-1}(x)$'],
            answer: 0,
            solution: 'This is a standard identity: the sum of inverse co-functions is always $\\pi/2$.'
        },
        {
            id: 1,
            question: 'Find the value of $\\sin(2 \\sin^{-1}(\\frac{3}{5}))$.',
            options: ['$\\frac{24}{25}$', '$\\frac{6}{5}$', '$\\frac{12}{25}$', '$\\frac{7}{25}$'],
            answer: 0,
            solution: 'Let $\\theta = \\sin^{-1}(3/5)$. We want $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$. $\\sin\\theta = 3/5$, $\\cos\\theta = 4/5$. $2(3/5)(4/5) = 24/25$.'
        },
        {
            id: 2,
            question: 'Which of the following is equivalent to $\\sin^{-1}(-x)$?',
            options: ['$-\\sin^{-1}(x)$', '$\\pi - \\sin^{-1}(x)$', '$\\frac{1}{\\sin^{-1}(x)}$', '$\\cos^{-1}(x)$'],
            answer: 0,
            solution: '$\\arcsin$ is an odd function, so the negative sign can be pulled out.'
        },
        {
            id: 3,
            question: 'Which of the following is equivalent to $\\cos^{-1}(-x)$?',
            options: ['$\\pi - \\cos^{-1}(x)$', '$-\\cos^{-1}(x)$', '$\\pi + \\cos^{-1}(x)$', '$\\sin^{-1}(x)$'],
            answer: 0,
            solution: 'Because the range is $[0, \\pi]$, negative inputs reflect across the y-axis into Q2, hence $\\pi - \\cos^{-1}(x)$.'
        },
        {
            id: 4,
            question: 'Evaluate $\\cos(\\sin^{-1}(\\frac{5}{13}) + \\cos^{-1}(\\frac{4}{5}))$.',
            options: ['$-\\frac{33}{65}$', '$\\frac{16}{65}$', '$\\frac{56}{65}$', '$\\frac{33}{65}$'],
            answer: 0,
            solution: 'Let $A = \\sin^{-1}(5/13)$, $B = \\cos^{-1}(4/5)$. We need $\\cos(A+B) = \\cos A \\cos B - \\sin A \\sin B = (12/13)(4/5) - (5/13)(3/5) = 48/65 - 15/65 = 33/65$. Wait, no, $\\cos(A+B) = (12/13)(4/5) - (5/13)(3/5) = 33/65$. Wait, my options... ah, option D is 33/65.'
        }
    ];
    // Fix the last option for Q4 to ensure it maps correctly
    questions[4].options[3] = '$\\frac{33}{65}$';
    questions[4].answer = 3;

    return shuffle(questions).slice(0, 5);
}
export function genSkill3Assessment() { return genSkill3Practice(); }

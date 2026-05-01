function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ── SKILL 1: Radian & Degree Conversion ──────────────────────────────────────
export function genSkill1Practice() {
    const questions = [];

    // Deg to Rad
    const degs = [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
    const rads = ['\\pi/6', '\\pi/4', '\\pi/3', '\\pi/2', '2\\pi/3', '3\\pi/4', '5\\pi/6', '\\pi', '7\\pi/6', '5\\pi/4', '4\\pi/3', '3\\pi/2', '5\\pi/3', '7\\pi/4', '11\\pi/6', '2\\pi'];

    for (let i = 0; i < 3; i++) {
        const idx = Math.floor(Math.random() * degs.length);
        const d = degs[idx];
        const r = rads[idx];
        const wrongOpts = shuffle(rads.filter(x => x !== r)).slice(0, 3);
        const opts = shuffle([r, ...wrongOpts]);
        questions.push({
            id: i,
            question: `Convert $${d}°$ to radians.`,
            options: opts.map(o => `$${o}$`),
            answer: opts.indexOf(r),
            solution: `$${d}° \\times \\frac{\\pi}{180°} = ${r}$.`
        });
    }

    // Rad to Deg
    for (let i = 0; i < 2; i++) {
        const idx = Math.floor(Math.random() * degs.length);
        const d = degs[idx];
        const r = rads[idx];
        const wrongOpts = shuffle(degs.filter(x => x !== d)).slice(0, 3);
        const opts = shuffle([d, ...wrongOpts]);
        questions.push({
            id: 3 + i,
            question: `Convert $${r}$ radians to degrees.`,
            options: opts.map(o => `$${o}°$`),
            answer: opts.indexOf(d),
            solution: `$${r} \\times \\frac{180°}{\\pi} = ${d}°$.`
        });
    }

    return questions;
}
export function genSkill1Assessment() { return genSkill1Practice(); }

// ── SKILL 2: Graphs of sin & cos ─────────────────────────────────────────────
export function genSkill2Practice() {
    const questions = [
        {
            id: 0,
            question: 'What is the amplitude and period of $y = 3 \\sin(2x)$?',
            options: ['Amp: $3$, Period: $\\pi$', 'Amp: $3$, Period: $2\\pi$', 'Amp: $2$, Period: $3\\pi$', 'Amp: $3/2$, Period: $\\pi$'],
            answer: 0,
            solution: 'For $y = A \\sin(Bx)$, amplitude is $|A| = 3$. Period is $2\\pi/B = 2\\pi/2 = \\pi$.'
        },
        {
            id: 1,
            question: 'What is the minimum value of $y = 5 \\cos(x) - 2$?',
            options: ['$-7$', '$-3$', '$-5$', '$3$'],
            answer: 0,
            solution: 'The minimum value of $\\cos(x)$ is $-1$. Minimum $y = 5(-1) - 2 = -7$.'
        },
        {
            id: 2,
            question: 'Which function has a period of $4\\pi$?',
            options: ['$y = \\sin(x/2)$', '$y = \\sin(2x)$', '$y = \\sin(4x)$', '$y = 2\\sin(x)$'],
            answer: 0,
            solution: 'Period $= 2\\pi/B$. If $B = 1/2$, period $= 2\\pi / (1/2) = 4\\pi$.'
        },
        {
            id: 3,
            question: 'What is the phase shift of $y = \\cos(x - \\pi/3)$?',
            options: ['$\\pi/3$ to the right', '$\\pi/3$ to the left', '$3\\pi$ to the right', '$\\pi/3$ upwards'],
            answer: 0,
            solution: 'For $y = \\cos(x - c)$, the phase shift is $c$ to the right. So, $\\pi/3$ to the right.'
        },
        {
            id: 4,
            question: 'Find the maximum value of $y = 4 \\sin(3x) + 1$.',
            options: ['$5$', '$4$', '$13$', '$3$'],
            answer: 0,
            solution: 'Max of $\\sin(3x)$ is $1$. Max $y = 4(1) + 1 = 5$.'
        }
    ];
    return shuffle(questions).slice(0, 5);
}
export function genSkill2Assessment() { return genSkill2Practice(); }

// ── SKILL 3: Trigonometric Equations ─────────────────────────────────────────
export function genSkill3Practice() {
    const questions = [
        {
            id: 0,
            question: 'Find the principal solutions of $\\sin x = \\frac{\\sqrt{3}}{2}$.',
            options: ['$\\frac{\\pi}{3}, \\frac{2\\pi}{3}$', '$\\frac{\\pi}{6}, \\frac{5\\pi}{6}$', '$\\frac{\\pi}{3}, \\frac{4\\pi}{3}$', '$\\frac{\\pi}{3}, \\frac{5\\pi}{3}$'],
            answer: 0,
            solution: '$\\sin x$ is positive in Q1 and Q2. Base angle is $\\pi/3$. Q2 angle is $\\pi - \\pi/3 = 2\\pi/3$.'
        },
        {
            id: 1,
            question: 'Find the general solution of $\\cos x = \\frac{1}{2}$.',
            options: ['$x = 2n\\pi \\pm \\frac{\\pi}{3}$', '$x = n\\pi \\pm \\frac{\\pi}{3}$', '$x = 2n\\pi + \\frac{\\pi}{3}$', '$x = 2n\\pi \\pm \\frac{\\pi}{6}$'],
            answer: 0,
            solution: 'Principal value is $\\alpha = \\pi/3$. General solution for cosine is $x = 2n\\pi \\pm \\alpha$.'
        },
        {
            id: 2,
            question: 'Find the principal solutions of $\\tan x = -1$.',
            options: ['$\\frac{3\\pi}{4}, \\frac{7\\pi}{4}$', '$\\frac{\\pi}{4}, \\frac{5\\pi}{4}$', '$\\frac{3\\pi}{4}, \\frac{5\\pi}{4}$', '$-\\frac{\\pi}{4}, \\frac{\\pi}{4}$'],
            answer: 0,
            solution: '$\\tan x$ is negative in Q2 and Q4. Base angle is $\\pi/4$. Q2: $\\pi - \\pi/4 = 3\\pi/4$. Q4: $2\\pi - \\pi/4 = 7\\pi/4$.'
        },
        {
            id: 3,
            question: 'Solve for principal values: $2\\sin^2 x - 1 = 0$.',
            options: ['$\\frac{\\pi}{4}, \\frac{3\\pi}{4}, \\frac{5\\pi}{4}, \\frac{7\\pi}{4}$', '$\\frac{\\pi}{4}, \\frac{3\\pi}{4}$', '$\\frac{\\pi}{2}, \\frac{3\\pi}{2}$', '$\\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{7\\pi}{6}, \\frac{11\\pi}{6}$'],
            answer: 0,
            solution: '$\\sin^2 x = 1/2 \\implies \\sin x = \\pm 1/\\sqrt{2}$. This gives solutions in all four quadrants with base angle $\\pi/4$.'
        },
        {
            id: 4,
            question: 'What is the general solution for $\\tan 2x = 0$?',
            options: ['$x = \\frac{n\\pi}{2}$', '$x = n\\pi$', '$x = 2n\\pi$', '$x = \\frac{n\\pi}{4}$'],
            answer: 0,
            solution: '$\\tan \\theta = 0 \\implies \\theta = n\\pi$. Here $\\theta = 2x$, so $2x = n\\pi \\implies x = n\\pi/2$.'
        }
    ];
    return shuffle(questions).slice(0, 5);
}
export function genSkill3Assessment() { return genSkill3Practice(); }

// ── SKILL 4: Sine Rule & Cosine Rule ─────────────────────────────────────────
export function genSkill4Practice() {
    const questions = [
        {
            id: 0,
            question: 'In $\\triangle ABC$, $a = 5$, $b = 7$, and $\\angle C = 60°$. Find $c$ using the Cosine Rule.',
            options: ['$\\sqrt{39}$', '$39$', '$\\sqrt{109}$', '$74$'],
            answer: 0,
            solution: '$c^2 = a^2 + b^2 - 2ab \\cos C = 25 + 49 - 2(5)(7)(1/2) = 74 - 35 = 39$. So $c = \\sqrt{39}$.'
        },
        {
            id: 1,
            question: 'In $\\triangle ABC$, $\\angle A = 30°$, $\\angle B = 45°$, and $a = 10$. Find $b$ using the Sine Rule.',
            options: ['$10\\sqrt{2}$', '$10\\sqrt{3}$', '$20$', '$5\\sqrt{2}$'],
            answer: 0,
            solution: '$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} \\implies \\frac{10}{\\sin 30°} = \\frac{b}{\\sin 45°} \\implies \\frac{10}{1/2} = \\frac{b}{1/\\sqrt{2}} \\implies 20 = b\\sqrt{2} \\implies b = \\frac{20}{\\sqrt{2}} = 10\\sqrt{2}$.'
        },
        {
            id: 2,
            question: 'If the sides of a triangle are $3, 5, 7$, find the largest angle (opposite the side $7$).',
            options: ['$120°$', '$90°$', '$60°$', '$150°$'],
            answer: 0,
            solution: 'Using Cosine Rule: $7^2 = 3^2 + 5^2 - 2(3)(5)\\cos C \\implies 49 = 9 + 25 - 30\\cos C \\implies 49 = 34 - 30\\cos C \\implies 15 = -30\\cos C \\implies \\cos C = -1/2$. So $C = 120°$.'
        },
        {
            id: 3,
            question: 'In $\\triangle ABC$, if $\\frac{a}{\\sin A} = 20$, what is the radius of the circumcircle ($R$)?',
            options: ['$10$', '$20$', '$5$', '$40$'],
            answer: 0,
            solution: 'By the extended Sine Rule, $\\frac{a}{\\sin A} = 2R$. So $2R = 20 \\implies R = 10$.'
        },
        {
            id: 4,
            question: 'Find the area of $\\triangle ABC$ if $a=4$, $b=6$, and $\\angle C = 30°$.',
            options: ['$6$', '$12$', '$6\\sqrt{3}$', '$24$'],
            answer: 0,
            solution: 'Area $= \\frac{1}{2}ab\\sin C = \\frac{1}{2}(4)(6)\\sin 30° = 12 \\times \\frac{1}{2} = 6$.'
        }
    ];
    return shuffle(questions).slice(0, 5);
}
export function genSkill4Assessment() { return genSkill4Practice(); }

// Grade 10: Introduction to Trigonometry — Skills Data
// Dynamically generates questions per session for variety.

const TRIG_VALUES = {
    30: { sin: '\\frac{1}{2}', cos: '\\frac{\\sqrt{3}}{2}', tan: '\\frac{1}{\\sqrt{3}}' },
    45: { sin: '\\frac{1}{\\sqrt{2}}', cos: '\\frac{1}{\\sqrt{2}}', tan: '1' },
    60: { sin: '\\frac{\\sqrt{3}}{2}', cos: '\\frac{1}{2}', tan: '\\sqrt{3}' },
    0:  { sin: '0', cos: '1', tan: '0' },
    90: { sin: '1', cos: '0', tan: '\\text{undefined}' },
};

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ── SKILL 1: Trig Ratios & Standard Values ────────────────────────────────────
export function genSkill1Practice() {
    const questions = [];
    const angles = [30, 45, 60, 0, 90];
    const funcs = ['sin', 'cos', 'tan'];

    // Q1-Q5: "What is f(angle)?" MCQ
    for (let i = 0; i < 5; i++) {
        const angle = angles[i];
        const fn = pick(funcs);
        const correct = TRIG_VALUES[angle][fn];
        const distractors = shuffle(
            Object.values(TRIG_VALUES)
                .map(v => v[fn])
                .filter(v => v !== correct)
        ).slice(0, 3);
        const options = shuffle([correct, ...distractors]);
        questions.push({
            id: i,
            question: `What is $\\${fn}\\,${angle}°$?`,
            options: options.map(o => `$${o}$`),
            answer: options.indexOf(correct),
            solution: `Using the standard angle table, $\\${fn}\\,${angle}° = ${correct}$.`,
        });
    }

    // Q6-Q10: Identify which angle satisfies a given ratio
    const pairs = [
        { fn: 'sin', val: '1/2', angle: 30, latex: '\\frac{1}{2}' },
        { fn: 'cos', val: '1/2', angle: 60, latex: '\\frac{1}{2}' },
        { fn: 'tan', val: '1', angle: 45, latex: '1' },
        { fn: 'sin', val: '√3/2', angle: 60, latex: '\\frac{\\sqrt{3}}{2}' },
        { fn: 'cos', val: '√3/2', angle: 30, latex: '\\frac{\\sqrt{3}}{2}' },
    ];
    for (let i = 0; i < 5; i++) {
        const p = pairs[i];
        const wrongAngles = [0, 30, 45, 60, 90].filter(a => a !== p.angle);
        const opts = shuffle([p.angle, ...shuffle(wrongAngles).slice(0, 3)]);
        questions.push({
            id: 5 + i,
            question: `For which angle $\\theta$ is $\\${p.fn}\\,\\theta = ${p.latex}$?`,
            options: opts.map(a => `$${a}°$`),
            answer: opts.indexOf(p.angle),
            solution: `$\\${p.fn}\\,${p.angle}° = ${p.latex}$. This is a standard table value.`,
        });
    }
    return questions;
}

export function genSkill1Assessment() {
    return genSkill1Practice();
}

// ── SKILL 2: Identities & Complementary Angles ───────────────────────────────
export function genSkill2Practice() {
    const questions = [];

    // Q1-Q5: Pythagorean identity simplifications
    const pyth = [
        { q: 'If $\\sin\\theta = \\frac{3}{5}$, find $\\cos^2\\theta$.', ans: '$\\frac{16}{25}$', sol: 'Using $\\sin^2\\theta + \\cos^2\\theta = 1$: $\\cos^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25}$.' },
        { q: 'Simplify: $\\sin^2 50° + \\cos^2 50°$.', ans: '$1$', sol: 'By the Pythagorean identity, $\\sin^2\\theta + \\cos^2\\theta = 1$ for all $\\theta$.' },
        { q: 'If $\\cos\\theta = \\frac{4}{5}$, find $\\sin^2\\theta$.', ans: '$\\frac{9}{25}$', sol: '$\\sin^2\\theta = 1 - \\cos^2\\theta = 1 - \\frac{16}{25} = \\frac{9}{25}$.' },
        { q: 'If $\\sin^2 A = 0.36$, what is $\\cos^2 A$?', ans: '$0.64$', sol: '$\\cos^2 A = 1 - \\sin^2 A = 1 - 0.36 = 0.64$.' },
        { q: 'Simplify: $(\\sin^2 30° + \\cos^2 30°)^{10}$.', ans: '$1$', sol: 'Since $\\sin^2\\theta + \\cos^2\\theta = 1$, any power of 1 is still $1$.' },
    ];

    pyth.forEach((item, i) => {
        const wrong = ['$0$', '$\\frac{1}{2}$', '$\\frac{25}{16}$', '$2$', '$\\frac{7}{25}$'].filter(w => w !== item.ans);
        const opts = shuffle([item.ans, ...shuffle(wrong).slice(0, 3)]);
        questions.push({ id: i, question: item.q, options: opts, answer: opts.indexOf(item.ans), solution: item.sol });
    });

    // Q6-Q10: Complementary angle relations
    const comp = [
        { q: 'Express $\\sin 70°$ in terms of cosine.', ans: '$\\cos 20°$', sol: '$\\sin 70° = \\cos(90° - 70°) = \\cos 20°$.' },
        { q: 'Express $\\cos 35°$ in terms of sine.', ans: '$\\sin 55°$', sol: '$\\cos 35° = \\sin(90° - 35°) = \\sin 55°$.' },
        { q: 'Evaluate: $\\frac{\\sin 40°}{\\cos 50°}$.', ans: '$1$', sol: '$\\cos 50° = \\sin(90°-50°) = \\sin 40°$, so the ratio $= 1$.' },
        { q: 'If $\\tan A = \\cot B$ and $A + B = 90°$, what is $A + B$?', ans: '$90°$', sol: '$\\tan A = \\cot(90° - A)$, confirming $A + B = 90°$.' },
        { q: 'Simplify: $\\sin 20°\\cos 70° + \\cos 20°\\sin 70°$.', ans: '$1$', sol: 'This is the sin addition formula: $\\sin(20°+70°) = \\sin 90° = 1$.' },
    ];

    comp.forEach((item, i) => {
        const wrong = ['$0$', '$\\sqrt{3}$', '$\\sin 20°$', '$\\cos 70°$', '$\\frac{1}{2}$'].filter(w => w !== item.ans);
        const opts = shuffle([item.ans, ...shuffle(wrong).slice(0, 3)]);
        questions.push({ id: 5 + i, question: item.q, options: opts, answer: opts.indexOf(item.ans), solution: item.sol });
    });

    return questions;
}

export function genSkill2Assessment() {
    return genSkill2Practice();
}

// ── SKILL 3: Word Problems — Heights & Distances ──────────────────────────────
export function genSkill3Practice() {
    const questions = [
        {
            id: 0,
            question: 'A ladder $10$ m long leans against a wall. The ladder makes an angle of $60°$ with the ground. How high up the wall does the ladder reach?',
            options: ['$5$ m', '$5\\sqrt{3}$ m', '$10\\sqrt{3}$ m', '$5\\sqrt{2}$ m'],
            answer: 1,
            solution: 'Height $= 10 \\sin 60° = 10 \\times \\frac{\\sqrt{3}}{2} = 5\\sqrt{3}$ m.'
        },
        {
            id: 1,
            question: 'From a point $30$ m away from the base of a tower, the angle of elevation of the top is $30°$. Find the height of the tower.',
            options: ['$10\\sqrt{3}$ m', '$30\\sqrt{3}$ m', '$10$ m', '$15\\sqrt{3}$ m'],
            answer: 0,
            solution: '$\\tan 30° = \\frac{h}{30}$, so $h = 30 \\times \\frac{1}{\\sqrt{3}} = \\frac{30}{\\sqrt{3}} = 10\\sqrt{3}$ m.'
        },
        {
            id: 2,
            question: 'The angle of elevation of the top of a building from a point $20$ m away is $45°$. Find the height of the building.',
            options: ['$10$ m', '$10\\sqrt{2}$ m', '$20$ m', '$20\\sqrt{2}$ m'],
            answer: 2,
            solution: '$\\tan 45° = \\frac{h}{20}$, so $h = 20 \\times 1 = 20$ m.'
        },
        {
            id: 3,
            question: 'From the top of a cliff $100$ m high, the angle of depression of a boat is $30°$. How far is the boat from the base of the cliff?',
            options: ['$100\\sqrt{3}$ m', '$\\frac{100}{\\sqrt{3}}$ m', '$50\\sqrt{3}$ m', '$200$ m'],
            answer: 0,
            solution: 'Angle of depression $= 30°$, so $\\tan 30° = \\frac{100}{d}$, giving $d = \\frac{100}{\\tan 30°} = 100\\sqrt{3}$ m.'
        },
        {
            id: 4,
            question: 'A kite is flying at a height of $60$ m above the ground. The string is taut and makes an angle of $60°$ with the ground. Find the length of the string.',
            options: ['$30\\sqrt{3}$ m', '$60\\sqrt{3}$ m', '$40\\sqrt{3}$ m', '$120$ m'],
            answer: 2,
            solution: '$\\sin 60° = \\frac{60}{L}$, so $L = \\frac{60}{\\sin 60°} = \\frac{60}{\\frac{\\sqrt{3}}{2}} = \\frac{120}{\\sqrt{3}} = 40\\sqrt{3}$ m.'
        },
        {
            id: 5,
            question: 'Two poles of heights $6$ m and $11$ m stand on a plane. If the distance between their feet is $12$ m, find the distance between their tops.',
            options: ['$11$ m', '$13$ m', '$15$ m', '$17$ m'],
            answer: 1,
            solution: 'The vertical difference $= 11-6 = 5$ m, horizontal $= 12$ m. Distance $= \\sqrt{5^2 + 12^2} = \\sqrt{25+144} = \\sqrt{169} = 13$ m.'
        },
        {
            id: 6,
            question: 'The shadow of a tower is $\\sqrt{3}$ times its height when the sun\'s altitude is $30°$. If the shadow is $30\\sqrt{3}$ m, find the height.',
            options: ['$10$ m', '$30$ m', '$15$ m', '$10\\sqrt{3}$ m'],
            answer: 1,
            solution: 'Height $= \\frac{\\text{shadow}}{\\sqrt{3}} = \\frac{30\\sqrt{3}}{\\sqrt{3}} = 30$ m.'
        },
        {
            id: 7,
            question: 'A boy standing on the ground sees the top of a tree at an angle of $60°$. He is $20$ m from the tree. The height of the tree is:',
            options: ['$10\\sqrt{3}$ m', '$20\\sqrt{3}$ m', '$\\frac{20}{\\sqrt{3}}$ m', '$40$ m'],
            answer: 1,
            solution: '$\\tan 60° = \\frac{h}{20}$, so $h = 20\\sqrt{3}$ m.'
        },
        {
            id: 8,
            question: 'From the top of a $7$ m high building, the angle of elevation of a cable tower is $60°$ and the angle of depression of its foot is $45°$. Find the height of the tower.',
            options: ['$7(1 + \\sqrt{3})$ m', '$7\\sqrt{3}$ m', '$14$ m', '$21$ m'],
            answer: 0,
            solution: 'Foot is at distance $d = 7/\\tan 45° = 7$ m. Height above eye level $= 7\\tan 60° = 7\\sqrt{3}$. Total height $= 7 + 7\\sqrt{3} = 7(1+\\sqrt{3})$ m.'
        },
        {
            id: 9,
            question: 'A vertical pole $AB$ is broken at a point $P$ on it. The broken part $PB$ touches the ground at $Q$ such that $\\angle AQP = 30°$ and $AQ = 27$ m. Find the total length of the pole.',
            options: ['$27\\sqrt{3}$ m', '$27$ m', '$54$ m', '$9\\sqrt{3}$ m'],
            answer: 0,
            solution: '$AP = AQ \\cdot \\tan 30° = 27/\\sqrt{3} = 9\\sqrt{3}$. $PQ = AQ/\\cos 30° = 27/(\\sqrt{3}/2) = 18\\sqrt{3}$. Total $= AP + PQ = 9\\sqrt{3}+18\\sqrt{3} = 27\\sqrt{3}$ m.'
        },
    ];
    return shuffle(questions).slice(0, 10);
}

export function genSkill3Assessment() {
    return genSkill3Practice();
}

// linesAndAnglesQuestions.jsx

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
    let copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function getDistinctLets(n) {
    const pool = 'ABCDEFGHJKLMNPQRSTUVWXY'; // no I/O to avoid confusion
    let res = new Set();
    while (res.size < n) res.add(pool[rnd(0, pool.length - 1)]);
    return Array.from(res);
}

// ─────────────────────────────────────────────────────────────
// SKILL 1: Points, Lines, Segments & Rays (exactly 15)
// ─────────────────────────────────────────────────────────────
export function generateLinesAndSegmentsQuestions() {
    const TEAL = '#0891b2';
    const VIOLET = '#7c3aed';
    const CORAL = '#ef4444';
    const AMBER = '#f59e0b';
    const GREEN = '#10b981';

    const allOpts = ["Point", "Line Segment", "Line", "Ray", "Intersecting Lines", "Parallel Lines"];

    // ── 6 structured visual MCQs, one per geometry type, each with own unique question wording ──
    const [a, b] = getDistinctLets(2);
    const [c, d] = getDistinctLets(2);
    const [e, f] = getDistinctLets(2);
    const [g, h] = getDistinctLets(2);

    const rot1 = rnd(10, 60);
    const rot2 = rnd(100, 160);
    const rot3 = rnd(200, 260);
    const rot4 = rnd(300, 359);

    const visualMCQs = [
        {
            question: `Point ${a} is shown below. This geometric figure has no length, width, or height. What is it called?`,
            svg: `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><circle cx="75" cy="75" r="6" fill="${TEAL}"/><text x="75" y="55" text-anchor="middle" font-size="20" font-weight="900" fill="${TEAL}">${a}</text></svg>`,
            correct: 'Point'
        },
        {
            question: `Two arrows point in opposite directions along the same path through ${a} and ${b}. This figure has no endpoints. Identify it.`,
            svg: `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${rot1}, 75, 75)"><line x1="15" y1="75" x2="135" y2="75" stroke="${VIOLET}" stroke-width="4"/><polygon points="10,75 25,68 25,82" fill="${VIOLET}"/><polygon points="140,75 125,68 125,82" fill="${VIOLET}"/><circle cx="50" cy="75" r="4" fill="${VIOLET}"/><circle cx="100" cy="75" r="4" fill="${VIOLET}"/><text x="50" y="60" text-anchor="middle" font-size="16" font-weight="900" fill="${VIOLET}">${a}</text><text x="100" y="60" text-anchor="middle" font-size="16" font-weight="900" fill="${VIOLET}">${b}</text></g></svg>`,
            correct: 'Line'
        },
        {
            question: `The figure shows a path that starts at ${c}, ends at ${d}, and has a fixed measurable length. What is it?`,
            svg: `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${rot2}, 75, 75)"><line x1="25" y1="75" x2="125" y2="75" stroke="${CORAL}" stroke-width="4"/><circle cx="25" cy="75" r="6" fill="${CORAL}"/><circle cx="125" cy="75" r="6" fill="${CORAL}"/><text x="25" y="60" text-anchor="middle" font-size="16" font-weight="900" fill="${CORAL}">${c}</text><text x="125" y="60" text-anchor="middle" font-size="16" font-weight="900" fill="${CORAL}">${d}</text></g></svg>`,
            correct: 'Line Segment'
        },
        {
            question: `This figure starts at endpoint ${e} and travels forever through point ${f} without end. What kind of figure is it?`,
            svg: `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${rot3}, 75, 75)"><line x1="35" y1="75" x2="130" y2="75" stroke="${AMBER}" stroke-width="4"/><circle cx="35" cy="75" r="6" fill="${AMBER}"/><polygon points="140,75 125,68 125,82" fill="${AMBER}"/><circle cx="85" cy="75" r="4" fill="${AMBER}"/><text x="35" y="58" text-anchor="middle" font-size="16" font-weight="900" fill="${AMBER}">${e}</text><text x="85" y="58" text-anchor="middle" font-size="16" font-weight="900" fill="${AMBER}">${f}</text></g></svg>`,
            correct: 'Ray'
        },
        {
            question: `Two straight lines cross at a single shared point ${g}. They are not running side by side. What type of lines are these?`,
            svg: `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${rot4}, 75, 75)"><line x1="25" y1="25" x2="125" y2="125" stroke="${GREEN}" stroke-width="4"/><line x1="125" y1="25" x2="25" y2="125" stroke="${GREEN}" stroke-width="4"/><circle cx="75" cy="75" r="5" fill="#0f172a"/><text x="90" y="68" text-anchor="middle" font-size="15" font-weight="900" fill="${GREEN}">${g}</text></g></svg>`,
            correct: 'Intersecting Lines'
        },
        {
            question: `Two lines run alongside each other and never meet, no matter how far they extend. Identify this relationship.`,
            svg: `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(${rot1}, 75, 75)"><line x1="20" y1="58" x2="130" y2="58" stroke="${TEAL}" stroke-width="4"/><line x1="20" y1="92" x2="130" y2="92" stroke="${TEAL}" stroke-width="4"/></g></svg>`,
            correct: 'Parallel Lines'
        }
    ].map(q => ({
        type: 'mcq',
        question: q.question,
        svg: q.svg,
        options: allOpts,
        correct: allOpts.indexOf(q.correct),
        explanation: `The figure shows **${q.correct}**.`
    }));

    // ── 3 text input questions with different dynamic content ──
    const [t1, t2] = getDistinctLets(2);
    const [t3, t4] = getDistinctLets(2);
    const textQs = [
        {
            type: 'text',
            question: `A ray starts at point ${t1} and passes through point ${t2}. It is written as Ray ${t1}${t2}. How many endpoints does this ray have? (Type a number)`,
            answer: '1',
            explanation: `Every ray has exactly 1 endpoint — its starting point. The other end extends infinitely.`
        },
        {
            type: 'text',
            question: `Line segment ${t3}${t4} has two endpoints. If you extend both ends of it infinitely in both directions, what geometric figure does it become? (One word)`,
            answer: 'Line',
            explanation: `Extending both ends of a segment infinitely in each direction turns it into a Line.`
        },
        {
            type: 'text',
            question: `How many endpoints does a complete Line have? (Type a number)`,
            answer: '0',
            explanation: `A line extends forever in both directions and therefore has zero endpoints.`
        }
    ];

    // ── 3 conceptual MCQs (all different questions) ──
    const conceptMCQs = [
        {
            type: 'mcq',
            question: `Which geometric figure has a definite, measurable length with exactly two endpoints?`,
            options: ['Line', 'Ray', 'Line Segment', 'Plane'],
            correct: 2,
            explanation: `A Line Segment is bounded by two endpoints, giving it a finite, measurable length.`
        },
        {
            type: 'mcq',
            question: `Two streets in a city run perfectly side-by-side and never cross each other. This best represents:`,
            options: ['Intersecting Lines', 'Parallel Lines', 'A Ray', 'A Line Segment'],
            correct: 1,
            explanation: `Streets that never meet, no matter how far extended, model Parallel Lines.`
        },
        {
            type: 'mcq',
            question: `A laser beam starts at a point and travels infinitely in one direction. This best represents a:`,
            options: ['Line Segment', 'Line', 'Ray', 'Point'],
            correct: 2,
            explanation: `A ray has one fixed starting point and continues infinitely in a single direction.`
        }
    ];

    // ── 3 interactive geometry-draw tasks ──
    const pointsSet = [
        { id: 'A', x: 80,  y: 200 },
        { id: 'B', x: 310, y: 80  },
        { id: 'C', x: 200, y: 240 },
        { id: 'D', x: 140, y: 55  }
    ];

    const drawQs = [
        {
            type: 'geometry-draw',
            tool: 'segment',
            question: `Click on point **A**, then point **B** to draw Line Segment AB — a bounded path with two endpoints.`,
            points: pointsSet,
            answer: { format: 'segment', p1: 'A', p2: 'B' },
            explanation: `A line segment connects A and B with a fixed, measurable length.`
        },
        {
            type: 'geometry-draw',
            tool: 'ray',
            question: `Construct **Ray CA** — a ray that originates at C and travels infinitely through A. Click C first, then A.`,
            points: pointsSet,
            answer: { format: 'ray', p1: 'C', p2: 'A' },
            explanation: `Ray CA starts from C and extends infinitely through A, so order matters — C is the endpoint.`
        },
        {
            type: 'geometry-draw',
            tool: 'line',
            question: `Draw **Line BD** — an infinite straight path through both B and D extending forever in both directions.`,
            points: pointsSet,
            answer: { format: 'line', p1: 'B', p2: 'D' },
            explanation: `A line has no endpoints. It passes through B and D and continues infinitely in both directions.`
        }
    ];

    // Combine all: 6 visual + 3 text + 3 concept + 3 draw = 15
    const all = shuffle([...visualMCQs, ...textQs, ...conceptMCQs, ...drawQs]);
    return all.slice(0, 15);
}

// ─────────────────────────────────────────────────────────────
// SKILL 2: Classifying Angles (exactly 15)
// ─────────────────────────────────────────────────────────────
export function generateClassifyingAnglesQuestions() {
    const opts = ['Acute', 'Right', 'Obtuse', 'Straight', 'Reflex'];

    const getAngleName = (deg) => {
        if (deg === 90)  return 'Right';
        if (deg === 180) return 'Straight';
        if (deg < 90)   return 'Acute';
        if (deg < 180)  return 'Obtuse';
        return 'Reflex';
    };

    const classColors = { Acute: '#10b981', Right: '#0891b2', Obtuse: '#f59e0b', Straight: '#7c3aed', Reflex: '#ef4444' };

    const drawAngleSVG = (deg, color, rotOverride) => {
        const rad = (Math.PI / 180) * deg;
        const x2 = 75 - 40 * Math.cos(rad);
        const y2 = 75 - 40 * Math.sin(rad);
        const rot = rotOverride !== undefined ? rotOverride : rnd(0, 359);

        let arc = '';
        if (deg === 90) {
            arc = `<polyline points="75,55 55,55 55,75" fill="none" stroke="${color}" stroke-width="2.5"/>`;
        } else if (deg === 180) {
            arc = `<path d="M 35 75 A 40 40 0 0 1 115 75" fill="none" stroke="${color}" stroke-width="2.5"/>`;
        } else if (deg > 180) {
            arc = `<path d="M 115 75 A 40 40 0 1 0 ${75-40*Math.cos(rad)} ${75-40*Math.sin(rad)}" fill="none" stroke="${color}" stroke-width="2.5"/>`;
        } else {
            arc = `<path d="M 100 75 A 25 25 0 0 0 ${75-25*Math.cos(rad)} ${75-25*Math.sin(rad)}" fill="none" stroke="${color}" stroke-width="2.5"/>`;
        }

        return `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(${rot}, 75, 75)">
                <line x1="75" y1="75" x2="125" y2="75" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
                <line x1="75" y1="75" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
                ${arc}
                <circle cx="75" cy="75" r="3" fill="#0f172a"/>
                <text x="75" y="68" font-size="13" font-weight="900" fill="${color}" text-anchor="middle" transform="rotate(${-rot}, 75, 75)">${deg}°</text>
            </g>
        </svg>`;
    };

    // ── 5 distinct angle-type MCQs, one per category ──
    // Pick one unique degree per category
    const acuteDeg  = rnd(15, 85);
    const obtuseDeg = rnd(95, 175);
    const reflexDeg = rnd(185, 350);

    const perTypeMCQs = [
        {
            deg: acuteDeg,
            question: `The angle below measures $${acuteDeg}^\\circ$. The vertex is at the center. Which category does it belong to?`,
            color: classColors.Acute,
            rot: rnd(0, 90)
        },
        {
            deg: 90,
            question: `The figure below shows a perfect corner angle (like the corner of a square). What is this specific type called?`,
            color: classColors.Right,
            rot: rnd(0, 60)
        },
        {
            deg: obtuseDeg,
            question: `An angle of $${obtuseDeg}^\\circ$ is shown — it is wider than a right angle but does not form a straight line. Classify it.`,
            color: classColors.Obtuse,
            rot: rnd(0, 180)
        },
        {
            deg: 180,
            question: `The two rays in the figure extend in exactly opposite directions from the same vertex, forming a completely flat line. What angle type is this?`,
            color: classColors.Straight,
            rot: rnd(0, 90)
        },
        {
            deg: reflexDeg,
            question: `The highlighted angle ($${reflexDeg}^\\circ$) is greater than a straight angle. It wraps around more than halfway. What is it called?`,
            color: classColors.Reflex,
            rot: rnd(0, 45)
        }
    ].map(item => ({
        type: 'mcq',
        question: item.question,
        svg:  drawAngleSVG(item.deg, item.color, item.rot),
        options: opts,
        correct: opts.indexOf(getAngleName(item.deg)),
        explanation: `An angle of $${item.deg}^\\circ$ is a **${getAngleName(item.deg)}** angle.`
    }));

    // ── 4 text-input classification questions (all different prompts) ──
    const randAcute  = rnd(10, 89);
    const randObtuse = rnd(91, 179);
    const textQs = [
        {
            type: 'text',
            question: `An angle measures exactly $90^\\circ$. Type the one-word classification for this angle.`,
            answer: 'Right',
            explanation: `Exactly $90^\\circ$ is a Right angle.`
        },
        {
            type: 'text',
            question: `An angle measures $${randAcute}^\\circ$. It is less than $90^\\circ$. What is its classification? (One word)`,
            answer: 'Acute',
            explanation: `Any angle strictly less than $90^\\circ$ is Acute.`
        },
        {
            type: 'text',
            question: `An angle measures $${randObtuse}^\\circ$. It is between $90^\\circ$ and $180^\\circ$. Name this angle type. (One word)`,
            answer: 'Obtuse',
            explanation: `Angles strictly between $90^\\circ$ and $180^\\circ$ are Obtuse.`
        },
        {
            type: 'text',
            question: `An angle forms a perfectly flat, straight line. Its measure is $180^\\circ$. What is it called? (One word)`,
            answer: 'Straight',
            explanation: `$180^\\circ$ is the definition of a Straight angle.`
        }
    ];

    // ── 3 word-problem MCQs (totally different from visual MCQs) ──
    const wordMCQs = [
        {
            type: 'mcq',
            question: `The hour and minute hands of a clock overlap completely at 12:00. The angle between them is zero. At 3:00, the angle between the hands is exactly $90^\\circ$. What type of angle is that?`,
            options: ['Acute', 'Right', 'Obtuse', 'Reflex'],
            correct: 1,
            explanation: `The angle at 3 o'clock is exactly $90^\\circ$, making it a Right angle.`
        },
        {
            type: 'mcq',
            question: `You open a book. The two covers form an angle larger than $90^\\circ$ but smaller than $180^\\circ$. What type of angle is formed?`,
            options: ['Acute', 'Right', 'Obtuse', 'Straight'],
            correct: 2,
            explanation: `Between $90^\\circ$ and $180^\\circ$ is the definition of an Obtuse angle.`
        },
        {
            type: 'mcq',
            question: `A partially opened door makes a small, sharp angle of about $25^\\circ$ with the wall. What category does this angle fall in?`,
            options: ['Obtuse', 'Right', 'Straight', 'Acute'],
            correct: 3,
            explanation: `$25^\\circ$ is less than $90^\\circ$, so it is an Acute angle.`
        }
    ];

    // ── 3 interactive protractor tasks ──
    const protractorQs = [
        {
            type: 'protractor',
            question: `Use the protractor to construct **any Acute angle** (between $0^\\circ$ and $90^\\circ$, not including $90^\\circ$).`,
            range: [1, 89],
            explanation: `Acute angles are strictly greater than $0^\\circ$ and less than $90^\\circ$.`
        },
        {
            type: 'protractor',
            question: `Use the protractor to construct **any Obtuse angle** (between $90^\\circ$ and $180^\\circ$, not including either).`,
            range: [91, 179],
            explanation: `Obtuse angles are strictly greater than $90^\\circ$ and less than $180^\\circ$.`
        },
        {
            type: 'protractor',
            question: `Use the protractor to construct a **Right angle** — lock the ray at exactly $90^\\circ$.`,
            answer: 90,
            tolerance: 5,
            explanation: `A Right angle is exactly $90^\\circ$.`
        }
    ];

    // 5 visual MCQ + 4 text + 3 word MCQ + 3 protractor = 15
    const all = shuffle([...perTypeMCQs, ...textQs, ...wordMCQs, ...protractorQs]);
    return all.slice(0, 15);
}

// ─────────────────────────────────────────────────────────────
// SKILL 3: Measuring Rotations (exactly 15)
// ─────────────────────────────────────────────────────────────
export function generateMeasuringAnglesQuestions() {
    let questions = [];

    // ── 3 interactive protractor tasks with distinct target angles ──
    const targets = new Set();
    while (targets.size < 3) targets.add(rnd(2, 34) * 5); // e.g. 30, 75, 130

    Array.from(targets).forEach(deg => {
        questions.push({
            type: 'protractor',
            question: `Use the interactive protractor to construct an angle of exactly $${deg}^\\circ$. Drag the colored ray to the correct position.`,
            answer: deg,
            tolerance: 5,
            explanation: `The target was $${deg}^\\circ$. Each small tick on the protractor equals $5^\\circ$.`
        });
    });

    // ── 3 unique text-input facts ──
    const pA = rnd(25, 75);
    const pB = rnd(15, 65);
    const pC = rnd(20, 80);
    const pD = rnd(10, 50);

    questions.push({
        type: 'text',
        question: `A complete rotation around a fixed point equals how many degrees? (Type a number)`,
        answer: '360',
        explanation: `A full circular turn is always $360^\\circ$.`
    });
    questions.push({
        type: 'text',
        question: `A clock hand starts at 12 and rotates to 3. That is a quarter-turn. How many degrees is a quarter-turn? (Type a number)`,
        answer: '90',
        explanation: `A quarter of $360^\\circ$ is $\\frac{360}{4} = 90^\\circ$.`
    });
    questions.push({
        type: 'text',
        question: `A dancer spins $${pA}^\\circ$ clockwise, then $${pB}^\\circ$ more clockwise. What is the total rotation in degrees? (Type a number)`,
        answer: `${pA + pB}`,
        explanation: `$${pA}^\\circ + ${pB}^\\circ = ${pA + pB}^\\circ$.`
    });

    // ── 4 unique angle-addition/subtraction MCQs ──
    const addSub = [
        (() => {
            let base = rnd(60, 170); let part = rnd(15, base - 15);
            let rem = base - part;
            let opts = shuffle([rem, rem + 15, rem - 10, rnd(10, 170)]).slice(0, 4);
            if (!opts.includes(rem)) opts[0] = rem;
            opts = shuffle(opts);
            return {
                type: 'mcq',
                question: `An angle of $${base}^\\circ$ is cut into two pieces. One piece is $${part}^\\circ$. What is the other piece?`,
                options: opts.map(x => `$${x}^\\circ$`),
                correct: opts.indexOf(rem),
                explanation: `$${base} - ${part} = ${rem}^\\circ$.`
            };
        })(),
        (() => {
            let a = rnd(20, 90); let b = rnd(20, 90);
            let sum = a + b;
            let opts = shuffle([sum, sum + 10, sum - 5, rnd(30, 200)]).slice(0, 4);
            if (!opts.includes(sum)) opts[0] = sum;
            opts = shuffle(opts);
            return {
                type: 'mcq',
                question: `A robot arm rotates $${a}^\\circ$, then rotates an additional $${b}^\\circ$ in the same direction. What is the total rotation?`,
                options: opts.map(x => `$${x}^\\circ$`),
                correct: opts.indexOf(sum),
                explanation: `$${a} + ${b} = ${sum}^\\circ$.`
            };
        })(),
        (() => {
            let base = rnd(90, 250); let part = rnd(20, base - 20);
            let rem = base - part;
            let opts = shuffle([rem, rem + 20, part, rnd(10, 200)]).slice(0, 4);
            if (!opts.includes(rem)) opts[0] = rem;
            opts = shuffle(opts);
            return {
                type: 'mcq',
                question: `A sprinkler has a total sweep of $${base}^\\circ$. It has already swept $${part}^\\circ$. How many more degrees does it need to complete its sweep?`,
                options: opts.map(x => `$${x}^\\circ$`),
                correct: opts.indexOf(rem),
                explanation: `$${base} - ${part} = ${rem}^\\circ$ remaining.`
            };
        })(),
        (() => {
            let a = rnd(10, 50); let b = rnd(10, 50); let c = rnd(10, 50);
            let sum = a + b + c;
            let opts = shuffle([sum, sum + 10, a + b, rnd(40, 200)]).slice(0, 4);
            if (!opts.includes(sum)) opts[0] = sum;
            opts = shuffle(opts);
            return {
                type: 'mcq',
                question: `Three angles — $${a}^\\circ$, $${b}^\\circ$, and $${c}^\\circ$ — share a common vertex and lie side by side. What is the total combined angle?`,
                options: opts.map(x => `$${x}^\\circ$`),
                correct: opts.indexOf(sum),
                explanation: `$${a} + ${b} + ${c} = ${sum}^\\circ$.`
            };
        })()
    ];

    questions.push(...addSub);

    // ── 5 rotation-fact MCQs ──
    const factMCQs = [
        {
            type: 'mcq',
            question: `How many degrees is a half-turn (facing the exact opposite direction)?`,
            options: ['$45^\\circ$', '$90^\\circ$', '$180^\\circ$', '$360^\\circ$'],
            correct: 2,
            explanation: `A half-turn is exactly $180^\\circ$ — the same as a Straight angle.`
        },
        {
            type: 'mcq',
            question: `Which of these represents three-quarters of a full revolution?`,
            options: ['$90^\\circ$', '$270^\\circ$', '$180^\\circ$', '$360^\\circ$'],
            correct: 1,
            explanation: `$\\frac{3}{4} \\times 360 = 270^\\circ$.`
        },
        {
            type: 'mcq',
            question: `An angle of $360^\\circ$ brings an object back to its original position. This is called a:`,
            options: ['Half turn', 'Quarter turn', 'Full rotation', 'Reflex turn'],
            correct: 2,
            explanation: `$360^\\circ$ is a complete, full rotation — returning to the starting orientation.`
        },
        {
            type: 'mcq',
            question: `Which of these angle combinations adds up to exactly $180^\\circ$?`,
            options: ['$100^\\circ + 70^\\circ$', '$150^\\circ + 30^\\circ$', '$80^\\circ + 80^\\circ$', '$90^\\circ + 60^\\circ$'],
            correct: 1,
            explanation: `$150 + 30 = 180^\\circ$.`
        },
        {
            type: 'mcq',
            question: `Which combination of angles forms a perfect right angle?`,
            options: ['$50^\\circ + 50^\\circ$', '$45^\\circ + 35^\\circ$', '$60^\\circ + 30^\\circ$', '$40^\\circ + 40^\\circ$'],
            correct: 2,
            explanation: `$60^\\circ + 30^\\circ = 90^\\circ$, a Right angle.`
        }
    ];

    questions.push(...factMCQs);

    // Total: 3 protractor + 3 text + 4 add/sub MCQ + 5 fact MCQ = 15
    return shuffle(questions).slice(0, 15);
}

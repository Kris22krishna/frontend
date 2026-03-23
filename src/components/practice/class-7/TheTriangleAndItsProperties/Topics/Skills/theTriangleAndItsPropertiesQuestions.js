const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const generateUniqueOptions = (correctAnswer, generateWrongFn, numOptions = 4) => {
    const options = new Set([String(correctAnswer)]);
    let attempts = 0;
    while (options.size < numOptions && attempts < 50) {
        options.add(String(generateWrongFn()));
        attempts++;
    }
    return shuffle(Array.from(options));
};

// 1. Elements of a Triangle — expanded with more question templates
export const generateElementsQuestions = () => {
    const qs = [];
    const vertexSets = ['A, B, C', 'P, Q, R', 'X, Y, Z', 'L, M, N', 'D, E, F', 'J, K, L'];

    const templates = [
        (name, verts) => ({ question: `What are the vertices of $${name}$?`, correct: verts, wrong: () => pickRandom(vertexSets), exp: `The vertices of $${name}$ are its 3 corner points: ${verts}.` }),
        (name) => ({ question: `How many sides does $${name}$ have?`, correct: '3', wrong: () => String(getRandomInt(2, 6)), exp: `Every triangle has exactly 3 sides.` }),
        (name) => ({ question: `How many angles does $${name}$ have?`, correct: '3', wrong: () => String(getRandomInt(2, 6)), exp: `Every triangle has exactly 3 angles.` }),
        (name) => ({ question: `How many vertices does $${name}$ have?`, correct: '3', wrong: () => String(getRandomInt(2, 6)), exp: `Every triangle has exactly 3 vertices (corners).` }),
        (name, verts) => {
            const v = verts.split(', ');
            const side = `${v[0]}${v[1]}`;
            return { question: `In $${name}$, the side joining vertices ${v[0]} and ${v[1]} is called:`, correct: side, wrong: () => `${pickRandom(v)}${pickRandom(v)}`, exp: `A side is named by the two vertices it connects.` };
        },
        (name) => ({ question: `The simplest polygon in geometry is a:`, correct: 'Triangle', wrong: () => pickRandom(['Square', 'Pentagon', 'Hexagon', 'Line']), exp: `A triangle is the simplest polygon — it has the fewest sides possible (3).` }),
    ];

    for (let i = 0; i < 10; i++) {
        const chosen = pickRandom(vertexSets);
        const name = `\\triangle ${chosen.replace(/, /g, '')}`;
        const template = templates[i % templates.length];
        const p = template(name, chosen);
        const options = generateUniqueOptions(p.correct, p.wrong);
        qs.push({ question: p.question, options, correct: options.indexOf(String(p.correct)), explanation: p.exp });
    }
    return qs;
};

// 2. Classify by Sides — dynamic random generation
export const generateSideClassifyQuestions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        let a, b, c, ans;
        const type = i % 3;
        if (type === 0) { // Equilateral
            const s = getRandomInt(3, 15);
            a = s; b = s; c = s;
            ans = 'Equilateral';
        } else if (type === 1) { // Isosceles
            const eq = getRandomInt(4, 12);
            const third = getRandomInt(2, eq * 2 - 2); // ensure valid triangle
            a = eq; b = eq; c = third;
            ans = 'Isosceles';
        } else { // Scalene
            a = getRandomInt(3, 8);
            b = a + getRandomInt(1, 4);
            c = getRandomInt(Math.abs(a - b) + 1, a + b - 1);
            while (c === a || c === b) c = getRandomInt(Math.abs(a - b) + 1, a + b - 1);
            ans = 'Scalene';
        }
        const options = shuffle(['Scalene', 'Isosceles', 'Equilateral', 'Right-angled']);
        qs.push({
            question: `A triangle has side lengths of $${a}$ cm, $${b}$ cm, and $${c}$ cm. Classify it by its sides.`,
            options, correct: options.indexOf(ans),
            explanation: `Lengths: $${a}$, $${b}$, $${c}$. ` + (ans === 'Equilateral' ? 'All sides are equal → Equilateral.' : ans === 'Isosceles' ? 'Two sides are equal → Isosceles.' : 'All sides are different → Scalene.')
        });
    }
    return qs;
};

// 3. Classify by Angles — dynamic random generation
export const generateAngleClassifyQuestions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        let a, b, c, ans;
        const type = i % 3;
        if (type === 0) { // Acute
            a = getRandomInt(50, 70);
            b = getRandomInt(50, 70);
            c = 180 - a - b;
            while (c >= 90 || c <= 0) { a = getRandomInt(50, 70); b = getRandomInt(50, 70); c = 180 - a - b; }
            ans = 'Acute-angled';
        } else if (type === 1) { // Right
            a = 90;
            b = getRandomInt(20, 60);
            c = 90 - b;
            ans = 'Right-angled';
        } else { // Obtuse
            a = getRandomInt(91, 140);
            b = getRandomInt(10, 180 - a - 10);
            c = 180 - a - b;
            while (c <= 0) { b = getRandomInt(10, 180 - a - 10); c = 180 - a - b; }
            ans = 'Obtuse-angled';
        }
        const options = shuffle(['Acute-angled', 'Right-angled', 'Obtuse-angled', 'Equilateral']);
        qs.push({
            question: `A triangle has interior angles $${a}°$, $${b}°$, and $${c}°$. What type is it?`,
            options, correct: options.indexOf(ans),
            explanation: `Angles: $${a}°$, $${b}°$, $${c}°$. ` + (ans === 'Right-angled' ? 'One angle is $90°$ → Right-angled.' : ans === 'Obtuse-angled' ? `$${a}° > 90°$ → Obtuse-angled.` : 'All angles $< 90°$ → Acute-angled.')
        });
    }
    return qs;
};

// 4. Medians and Altitudes — expanded with more scenarios
export const generateMediansAltitudesQuestions = () => {
    const qs = [];
    const pool = [
        { q: "How many medians can a triangle have?", a: "3", w: () => String(getRandomInt(1, 4)) },
        { q: "How many altitudes can a triangle have?", a: "3", w: () => String(getRandomInt(1, 4)) },
        { q: "The median of a triangle connects a vertex to the _____ of the opposite side.", a: "midpoint", opts: ['midpoint', 'vertex', 'quarter-point', 'endpoint'] },
        { q: "An altitude of a triangle is a line segment that is _____ to the opposite side.", a: "perpendicular", opts: ['perpendicular', 'parallel', 'equal', 'bisecting'] },
        { q: "The point where all three medians of a triangle meet is called the:", a: "centroid", opts: ['centroid', 'orthocentre', 'incentre', 'circumcentre'] },
        { q: "The point where all three altitudes of a triangle meet is called the:", a: "orthocentre", opts: ['orthocentre', 'centroid', 'incentre', 'circumcentre'] },
        { q: "In a right-angled triangle, how many altitudes lie along the sides?", a: "2", opts: ['2', '0', '1', '3'] },
        { q: "The centroid divides each median in the ratio:", a: "2:1", opts: ['2:1', '1:1', '3:1', '1:2'] },
        { q: "In which triangle do all altitudes lie inside?", a: "Acute triangle", opts: ['Acute triangle', 'Obtuse triangle', 'Right triangle', 'Scalene triangle'] },
        { q: "In an obtuse triangle, the altitudes from the acute-angled vertices fall:", a: "Outside the triangle", opts: ['Outside the triangle', 'Inside the triangle', 'On the sides', 'At the centroid'] },
    ];

    for (let i = 0; i < 10; i++) {
        const p = pool[i % pool.length];
        const options = p.opts ? shuffle([...p.opts]) : generateUniqueOptions(p.a, p.w);
        qs.push({
            question: p.q,
            options,
            correct: options.indexOf(p.a),
            explanation: p.q.includes('median') || p.q.includes('centroid')
                ? 'A median connects a vertex to the midpoint of the opposite side. All 3 medians meet at the centroid.'
                : 'An altitude is perpendicular from a vertex to the opposite side. All 3 altitudes meet at the orthocentre.'
        });
    }
    return qs;
};

// 5. Exterior Angle Property — with LaTeX formatting
export const generateExteriorAngleQuestions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(25, 85);
        const b = getRandomInt(25, 85);
        const ext = a + b;
        const options = generateUniqueOptions(ext, () => getRandomInt(60, 170));
        qs.push({
            question: `In $\\triangle ABC$, the two interior opposite angles are $${a}°$ and $${b}°$. Find the exterior angle.`,
            options: options.map(o => `$${o}°$`),
            correct: options.indexOf(String(ext)),
            explanation: `Exterior Angle Property: $${a}° + ${b}° = ${ext}°$.`
        });
    }
    return qs;
};

// 6. Angle Sum Property — with LaTeX formatting
export const generateAngleSumQuestions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(25, 85);
        const b = getRandomInt(25, 85);
        const c = 180 - (a + b);
        if (c <= 0) { i--; continue; }
        const options = generateUniqueOptions(c, () => getRandomInt(15, 100));
        qs.push({
            question: `Two angles of a triangle are $${a}°$ and $${b}°$. Find the third angle.`,
            options: options.map(o => `$${o}°$`),
            correct: options.indexOf(String(c)),
            explanation: `$${a}° + ${b}° + ? = 180°$, so the third angle $= 180° - ${a + b}° = ${c}°$.`
        });
    }
    return qs;
};

// 7. Find Unknown X — already good, keeping with LaTeX improvements
export const generateFindUnknownXQuestions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(35, 75);
        const b = getRandomInt(35, 75);
        const x = 180 - a - b;
        if (x <= 0) { i--; continue; }
        const options = generateUniqueOptions(x, () => getRandomInt(15, 95));
        qs.push({
            question: `The angles of a triangle are $${a}°$, $${b}°$, and $x$. Find $x$.`,
            options: options.map(o => `$${o}°$`),
            correct: options.indexOf(String(x)),
            explanation: `$${a} + ${b} + x = 180 \\implies x = ${x}°$`
        });
    }
    return qs;
};

// 8. Triangle Inequality — dynamic side generation
export const generateTriangleInequalityQuestions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        let a, b, c, isValid;

        if (i % 2 === 0) {
            // Generate valid triangle
            a = getRandomInt(3, 10);
            b = getRandomInt(3, 10);
            c = getRandomInt(Math.abs(a - b) + 1, a + b - 1);
            isValid = true;
        } else {
            // Generate invalid triangle
            a = getRandomInt(2, 5);
            b = getRandomInt(2, 5);
            c = a + b + getRandomInt(0, 3); // ensure a + b <= c
            isValid = false;
        }

        const options = ['Yes', 'No'];
        const ans = isValid ? 'Yes' : 'No';
        const sorted = [a, b, c].sort((x, y) => x - y);
        qs.push({
            question: `Can a triangle have sides of length $${a}$ cm, $${b}$ cm, and $${c}$ cm?`,
            options,
            correct: options.indexOf(ans),
            explanation: `Sum of two smaller sides: $${sorted[0]} + ${sorted[1]} = ${sorted[0] + sorted[1]}$. Longest: $${sorted[2]}$. ` +
                (isValid ? `$${sorted[0] + sorted[1]} > ${sorted[2]}$, so YES — the triangle is valid.` : `$${sorted[0] + sorted[1]}$ is NOT $> ${sorted[2]}$, so NO — the triangle cannot exist.`)
        });
    }
    return qs;
};

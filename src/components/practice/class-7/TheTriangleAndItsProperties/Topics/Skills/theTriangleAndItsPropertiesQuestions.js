const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const pickDifferent = (arr, value) => {
    const filtered = arr.filter((item) => item !== value);
    return pickRandom(filtered.length ? filtered : arr);
};

const generateUniqueOptions = (correctAnswer, generateWrongFn, numOptions = 4) => {
    const options = new Set([String(correctAnswer)]);
    let attempts = 0;
    while (options.size < numOptions && attempts < 50) {
        options.add(String(generateWrongFn()));
        attempts++;
    }
    return shuffle(Array.from(options));
};

export const generateElementsQuestions = () => {
    const qs = [];
    const vertexSets = ['A, B, C', 'P, Q, R', 'X, Y, Z', 'L, M, N', 'D, E, F', 'J, K, L'];

    const templates = [
        (name, verts) => ({
            question: `Which set names the vertices of $${name}$?`,
            correct: verts,
            wrong: () => pickDifferent(vertexSets, verts),
            exp: `The vertices are the corner points of the figure, so $${name}$ is named by ${verts}.`
        }),
        (name) => ({
            question: `How many sides make up $${name}$?`,
            correct: '3',
            wrong: () => String(pickRandom([2, 4, 5, 6])),
            exp: 'A triangle is formed by three line segments, so it has 3 sides.'
        }),
        (name) => ({
            question: `How many interior angles are there in $${name}$?`,
            correct: '3',
            wrong: () => String(pickRandom([2, 4, 5, 6])),
            exp: 'Each corner contributes one interior angle, giving a total of 3 angles.'
        }),
        (name) => ({
            question: `How many vertices does $${name}$ have?`,
            correct: '3',
            wrong: () => String(pickRandom([2, 4, 5, 6])),
            exp: 'A triangle has 3 vertices because it has 3 corners.'
        }),
        (name, verts) => {
            const v = verts.split(', ');
            const side = `${v[0]}${v[1]}`;
            const wrongSides = [`${v[1]}${v[2]}`, `${v[2]}${v[0]}`, `${v[1]}${v[0]}`, `${v[0]}${v[2]}`]
                .filter((item) => item !== side);
            return {
                question: `In $${name}$, what is the name of the side joining ${v[0]} and ${v[1]}?`,
                correct: side,
                wrong: () => pickRandom(wrongSides),
                exp: `A side is named using the endpoints it connects, so the segment from ${v[0]} to ${v[1]} is ${side}.`
            };
        },
        () => ({
            question: 'Which shape is the simplest polygon?',
            correct: 'Triangle',
            wrong: () => pickRandom(['Square', 'Pentagon', 'Hexagon', 'Line segment']),
            exp: 'A triangle is the simplest polygon because it is the smallest closed figure made of straight sides.'
        }),
        (name, verts) => {
            const v = verts.split(', ');
            const angle = `\\angle ${v[1]}`;
            const wrongAngles = [`\\angle ${v[0]}${v[1]}`, `\\angle ${v[0]}`, `\\angle ${v[2]}${v[1]}`];
            return {
                question: `Which angle is formed at vertex ${v[1]} in $${name}$?`,
                correct: angle,
                wrong: () => pickRandom(wrongAngles),
                exp: `The angle at a vertex is named by that vertex, so the angle at ${v[1]} is written as $${angle}$.`
            };
        },
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

export const generateSideClassifyQuestions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        let a;
        let b;
        let c;
        let ans;
        const type = i % 3;
        if (type === 0) {
            const s = getRandomInt(3, 15);
            a = s; b = s; c = s;
            ans = 'Equilateral';
        } else if (type === 1) {
            const eq = getRandomInt(4, 12);
            const third = getRandomInt(2, eq * 2 - 2);
            a = eq; b = eq; c = third;
            ans = 'Isosceles';
        } else {
            a = getRandomInt(3, 8);
            b = a + getRandomInt(1, 4);
            c = getRandomInt(Math.abs(a - b) + 1, a + b - 1);
            while (c === a || c === b) c = getRandomInt(Math.abs(a - b) + 1, a + b - 1);
            ans = 'Scalene';
        }
        const options = shuffle(['Scalene', 'Isosceles', 'Equilateral', 'Right-angled']);
        qs.push({
            question: `A triangle has side lengths $${a}$ cm, $${b}$ cm, and $${c}$ cm. How should it be classified by its sides?`,
            options,
            correct: options.indexOf(ans),
            explanation: `The side lengths are $${a}$, $${b}$, and $${c}$. ` + (
                ans === 'Equilateral'
                    ? 'All three sides are equal, so it is an equilateral triangle.'
                    : ans === 'Isosceles'
                        ? 'Exactly two sides are equal, so it is an isosceles triangle.'
                        : 'All three side lengths are different, so it is a scalene triangle.'
            )
        });
    }
    return qs;
};

export const generateAngleClassifyQuestions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        let a;
        let b;
        let c;
        let ans;
        const type = i % 3;
        if (type === 0) {
            a = getRandomInt(50, 70);
            b = getRandomInt(50, 70);
            c = 180 - a - b;
            while (c >= 90 || c <= 0) {
                a = getRandomInt(50, 70);
                b = getRandomInt(50, 70);
                c = 180 - a - b;
            }
            ans = 'Acute-angled';
        } else if (type === 1) {
            a = 90;
            b = getRandomInt(20, 60);
            c = 90 - b;
            ans = 'Right-angled';
        } else {
            a = getRandomInt(91, 140);
            b = getRandomInt(10, 180 - a - 10);
            c = 180 - a - b;
            while (c <= 0) {
                b = getRandomInt(10, 180 - a - 10);
                c = 180 - a - b;
            }
            ans = 'Obtuse-angled';
        }
        const largest = Math.max(a, b, c);
        const options = shuffle(['Acute-angled', 'Right-angled', 'Obtuse-angled', 'Equilateral']);
        qs.push({
            question: `A triangle has interior angles $${a}°$, $${b}°$, and $${c}°$. What type of triangle is it?`,
            options,
            correct: options.indexOf(ans),
            explanation: `The largest angle is $${largest}°$. ` + (
                ans === 'Right-angled'
                    ? 'A triangle with one $90°$ angle is right-angled.'
                    : ans === 'Obtuse-angled'
                        ? 'If one angle is greater than $90°$, the triangle is obtuse-angled.'
                        : 'When all angles are less than $90°$, the triangle is acute-angled.'
            )
        });
    }
    return qs;
};

export const generateMediansAltitudesQuestions = () => {
    const qs = [];
    const pool = [
        {
            q: 'How many medians can be drawn in one triangle?',
            a: '3',
            w: () => String(pickRandom([1, 2, 4])),
            exp: 'Each vertex gives one median to the midpoint of the opposite side, so there are 3 medians in total.'
        },
        {
            q: 'How many altitudes does a triangle have?',
            a: '3',
            w: () => String(pickRandom([1, 2, 4])),
            exp: 'An altitude can be drawn from each vertex, so every triangle has 3 altitudes.'
        },
        {
            q: 'A median joins a vertex to the _____ of the opposite side.',
            a: 'midpoint',
            opts: ['midpoint', 'vertex', 'quarter-point', 'endpoint'],
            exp: 'A median always reaches the midpoint of the opposite side.'
        },
        {
            q: 'An altitude is drawn from a vertex _____ to the opposite side.',
            a: 'perpendicular',
            opts: ['perpendicular', 'parallel', 'equal', 'bisecting'],
            exp: 'An altitude represents height, so it meets the opposite side at a right angle.'
        },
        {
            q: 'What is the meeting point of the three medians called?',
            a: 'centroid',
            opts: ['centroid', 'orthocentre', 'incentre', 'circumcentre'],
            exp: 'The three medians intersect at the centroid, which is the balance point of the triangle.'
        },
        {
            q: 'What is the meeting point of the three altitudes called?',
            a: 'orthocentre',
            opts: ['orthocentre', 'centroid', 'incentre', 'circumcentre'],
            exp: 'The common point of the three altitudes is called the orthocentre.'
        },
        {
            q: 'In a right triangle, how many altitudes lie along the sides of the triangle?',
            a: '2',
            opts: ['2', '0', '1', '3'],
            exp: 'The two legs already form a right angle, so each of them acts as an altitude.'
        },
        {
            q: 'The centroid divides each median in which ratio?',
            a: '2:1',
            opts: ['2:1', '1:1', '3:1', '1:2'],
            exp: 'Measured from the vertex, the centroid divides every median in the ratio 2:1.'
        },
        {
            q: 'For which type of triangle do all the altitudes stay inside the figure?',
            a: 'Acute triangle',
            opts: ['Acute triangle', 'Obtuse triangle', 'Right triangle', 'Scalene triangle'],
            exp: 'In an acute triangle, all angles are less than $90°$, so every altitude lies inside the triangle.'
        },
        {
            q: 'In an obtuse triangle, where do the altitudes from the acute vertices meet the opposite sides?',
            a: 'Outside the triangle',
            opts: ['Outside the triangle', 'Inside the triangle', 'On the sides', 'At the centroid'],
            exp: 'In an obtuse triangle, those altitudes meet the extensions of the opposite sides, so they fall outside the triangle.'
        },
    ];

    for (let i = 0; i < 10; i++) {
        const p = pool[i % pool.length];
        const options = p.opts ? shuffle([...p.opts]) : generateUniqueOptions(p.a, p.w);
        qs.push({
            question: p.q,
            options,
            correct: options.indexOf(p.a),
            explanation: p.exp
        });
    }
    return qs;
};

export const generateExteriorAngleQuestions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(25, 85);
        const b = getRandomInt(25, 85);
        const ext = a + b;
        const options = generateUniqueOptions(ext, () => getRandomInt(60, 170));
        qs.push({
            question: `In $\\triangle ABC$, two remote interior angles measure $${a}°$ and $${b}°$. What is the exterior angle at the third vertex?`,
            options: options.map((o) => `$${o}°$`),
            correct: options.indexOf(String(ext)),
            explanation: `By the Exterior Angle Property, add the two remote interior angles: $${a}° + ${b}° = ${ext}°$.`
        });
    }
    return qs;
};

export const generateAngleSumQuestions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(25, 85);
        const b = getRandomInt(25, 85);
        const c = 180 - (a + b);
        if (c <= 0) {
            i--;
            continue;
        }
        const options = generateUniqueOptions(c, () => getRandomInt(15, 100));
        qs.push({
            question: `Two interior angles of a triangle are $${a}°$ and $${b}°$. Find the remaining angle.`,
            options: options.map((o) => `$${o}°$`),
            correct: options.indexOf(String(c)),
            explanation: `The angles of a triangle add up to $180°$. So the missing angle is $180° - (${a}° + ${b}°) = ${c}°$.`
        });
    }
    return qs;
};

export const generateFindUnknownXQuestions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(35, 75);
        const b = getRandomInt(35, 75);
        const x = 180 - a - b;
        if (x <= 0) {
            i--;
            continue;
        }
        const options = generateUniqueOptions(x, () => getRandomInt(15, 95));
        qs.push({
            question: `A triangle has angles $${a}°$, $${b}°$, and $x$. Find the value of $x$.`,
            options: options.map((o) => `$${o}°$`),
            correct: options.indexOf(String(x)),
            explanation: `Use the angle-sum property: $${a}° + ${b}° + x = 180°$. Therefore, $x = ${x}°$.`
        });
    }
    return qs;
};

export const generateTriangleInequalityQuestions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        let a;
        let b;
        let c;
        let isValid;

        if (i % 2 === 0) {
            a = getRandomInt(3, 10);
            b = getRandomInt(3, 10);
            c = getRandomInt(Math.abs(a - b) + 1, a + b - 1);
            isValid = true;
        } else {
            a = getRandomInt(2, 5);
            b = getRandomInt(2, 5);
            c = a + b + getRandomInt(0, 3);
            isValid = false;
        }

        const options = ['Yes', 'No'];
        const ans = isValid ? 'Yes' : 'No';
        const sorted = [a, b, c].sort((x, y) => x - y);
        qs.push({
            question: `Can side lengths $${a}$ cm, $${b}$ cm, and $${c}$ cm form a triangle?`,
            options,
            correct: options.indexOf(ans),
            explanation: `Check the two shorter sides: $${sorted[0]} + ${sorted[1]} = ${sorted[0] + sorted[1]}$. Compare this with the longest side, $${sorted[2]}$. ` +
                (isValid
                    ? `Since $${sorted[0] + sorted[1]} > ${sorted[2]}$, these lengths can form a triangle.`
                    : `Since $${sorted[0] + sorted[1]}$ is not greater than $${sorted[2]}$, these lengths cannot form a triangle.`)
        });
    }
    return qs;
};

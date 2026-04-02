export const generateShapesSkillsData = () => {
    const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Helper to shuffle an array
    const shuffle = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = rnd(0, i);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const shapes3D = [
        { name: 'Cube', text: 'A cube', faces: 6, edges: 12, vertices: 8, image: '<svg width="1em" height="1em" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,15 85,32 50,50 15,32" fill="#dbeafe" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/><polygon points="15,32 50,50 50,85 15,68" fill="#60a5fa" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/><polygon points="50,50 85,32 85,68 50,85" fill="#93c5fd" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/></svg>', flatFaces: 6, curvedFaces: 0 },
        { name: 'Cuboid', text: 'A cuboid', faces: 6, edges: 12, vertices: 8, image: '<svg width="1.2em" height="0.9em" viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><polygon points="60,15 105,30 60,45 15,30" fill="#dbeafe" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/><polygon points="15,30 60,45 60,75 15,60" fill="#60a5fa" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/><polygon points="60,45 105,30 105,60 60,75" fill="#93c5fd" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/></svg>', flatFaces: 6, curvedFaces: 0 },
        { name: 'Sphere', text: 'A sphere', faces: 1, edges: 0, vertices: 0, image: '⚽', flatFaces: 0, curvedFaces: 1 },
        { name: 'Cylinder', text: 'A cylinder', faces: 3, edges: 2, vertices: 0, image: '🥫', flatFaces: 2, curvedFaces: 1 },
        { name: 'Cone', text: 'A cone', faces: 2, edges: 1, vertices: 1, image: '🍦', flatFaces: 1, curvedFaces: 1 },
        { name: 'Square Pyramid', text: 'A square pyramid', faces: 5, edges: 8, vertices: 5, image: '<svg width="1em" height="1em" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,15 20,75 50,90" fill="#60a5fa" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/><polygon points="50,15 50,90 80,75" fill="#93c5fd" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/></svg>', flatFaces: 5, curvedFaces: 0 },
        { name: 'Triangular Prism', text: 'A triangular prism', faces: 5, edges: 9, vertices: 6, image: '<svg width="1.1em" height="0.9em" viewBox="0 0 110 90" xmlns="http://www.w3.org/2000/svg"><polygon points="35,25 55,85 95,75 75,15" fill="#93c5fd" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/><polygon points="35,25 15,75 55,85" fill="#60a5fa" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/></svg>', flatFaces: 5, curvedFaces: 0 },
    ];

    /* ─────────────────────────────────────────────
       3D SHAPES  (7 shapes × 4 props = many unique)
    ───────────────────────────────────────────── */
    const generate3DShapesQs = (count) => {
        const questions = [];
        const seen = new Set();
        let attempts = 0;

        while (questions.length < count) {
            attempts++;
            if (attempts > 2000) break; // safety escape

            const shape = shapes3D[rnd(0, shapes3D.length - 1)];
            const templates = [
                () => {
                    const prop = ['faces', 'edges', 'vertices'][rnd(0, 2)];
                    const ans = shape[prop];
                    const diffOpts = new Set([ans]);
                    while (diffOpts.size < 4) diffOpts.add(rnd(0, 12));
                    const options = shuffle(Array.from(diffOpts)).map(String);
                    return {
                        text: `How many ${prop} does ${shape.text.toLowerCase()} have?`,
                        options, answer: options.indexOf(String(ans)),
                        explanation: `${shape.name} has ${shape.faces} faces, ${shape.edges} edges, and ${shape.vertices} vertices.`,
                        image: shape.image
                    };
                },
                () => {
                    const prop = ['flatFaces', 'curvedFaces'][rnd(0, 1)];
                    const ans = shape[prop];
                    const label = prop === 'flatFaces' ? 'flat faces' : 'curved faces';
                    const diffOpts = new Set([ans]);
                    while (diffOpts.size < 4) diffOpts.add(rnd(0, 6));
                    const options = shuffle(Array.from(diffOpts)).map(String);
                    return {
                        text: `How many ${label} does ${shape.text.toLowerCase()} have?`,
                        options, answer: options.indexOf(String(ans)),
                        explanation: `${shape.name} has ${shape.flatFaces} flat faces and ${shape.curvedFaces} curved faces.`,
                        image: shape.image
                    };
                },
                () => {
                    const others = shuffle(shapes3D.filter(s => s.name !== shape.name)).slice(0, 3);
                    const options = shuffle([shape.name, ...others.map(o => o.name)]);
                    return {
                        text: `I have ${shape.faces} total faces, ${shape.edges} edges, and ${shape.vertices} corners. What am I?`,
                        options, answer: options.indexOf(shape.name),
                        explanation: `The shape with exactly ${shape.faces} faces, ${shape.edges} edges, and ${shape.vertices} vertices is a ${shape.name}.`,
                        image: '🤔'
                    };
                },
                () => {
                    const type = ['roll', 'slide'][rnd(0, 1)];
                    let pool, target;
                    if (type === 'roll') {
                        pool = shapes3D.filter(s => s.curvedFaces > 0);
                        target = pool[rnd(0, pool.length - 1)] || shapes3D[2];
                    } else {
                        pool = shapes3D.filter(s => s.flatFaces > 0);
                        target = pool[rnd(0, pool.length - 1)] || shapes3D[0];
                    }
                    const others = shuffle(shapes3D.filter(s => s.name !== target.name)).slice(0, 3);
                    const options = shuffle([target.name, ...others.map(o => o.name)]);
                    return {
                        text: `Which of these shapes can ${type} easily across a flat floor?`,
                        options, answer: options.indexOf(target.name),
                        explanation: `Shapes with ${type === 'roll' ? 'curved' : 'flat'} faces can ${type}. ${target.name} is one example.`,
                        image: target.image
                    };
                },
                () => {
                    // True/false style presented as MCQ
                    const prop = ['faces', 'edges', 'vertices'][rnd(0, 2)];
                    const correct = shape[prop];
                    const wrong = correct + rnd(1, 4);
                    const opts = shuffle(['True', 'False']);
                    const statement = `A ${shape.name} has exactly ${wrong} ${prop}.`;
                    const ans = 'False';
                    return {
                        text: `True or False: ${statement}`,
                        options: opts, answer: opts.indexOf(ans),
                        explanation: `False — a ${shape.name} actually has ${correct} ${prop}, not ${wrong}.`,
                        image: shape.image
                    };
                },
                () => {
                    // Compare two shapes
                    const other = shapes3D.filter(s => s.name !== shape.name)[rnd(0, shapes3D.length - 2)];
                    const prop = ['faces', 'edges', 'vertices'][rnd(0, 2)];
                    const options = [`${shape.name}`, `${other.name}`, 'They are equal', 'Cannot be determined'];
                    let ans;
                    if (shape[prop] > other[prop]) ans = shape.name;
                    else if (shape[prop] < other[prop]) ans = other.name;
                    else ans = 'They are equal';
                    return {
                        text: `Which shape has more ${prop}: a ${shape.name} or a ${other.name}?`,
                        options, answer: options.indexOf(ans),
                        explanation: `A ${shape.name} has ${shape[prop]} ${prop} and a ${other.name} has ${other[prop]} ${prop}.`,
                        image: '🔍'
                    };
                }
            ];

            const qObj = templates[rnd(0, templates.length - 1)]();
            const key = qObj.text;
            if (!seen.has(key)) {
                seen.add(key);
                questions.push({
                    type: 'multiple-choice',
                    question: qObj.text,
                    options: qObj.options,
                    correctAnswer: qObj.answer,
                    explanation: qObj.explanation,
                    image: qObj.image
                });
            }
        }
        return questions;
    };

    /* ─────────────────────────────────────────────
       NETS  — expanded with more varied templates
    ───────────────────────────────────────────── */
    const generateNetsQs = (count) => {
        const questions = [];
        const seen = new Set();
        let attempts = 0;

        // Cube net — vary the distractors so text differs each time
        const cubeNetVariants = [
            `How many squares does a valid net of a cube consist of?`,
            `A net of a cube is laid flat. How many square faces does it contain?`,
            `If you unfold a cube completely, how many squares make up its net?`,
            `How many equal squares are needed to form a cube's net?`,
        ];

        const shapes = ['Cylinder', 'Cone', 'Rectangular Prism', 'Triangular Prism', 'Square Pyramid'];
        const descriptions = {
            'Cylinder': '1 rectangle and 2 circles',
            'Cone': '1 circle and 1 curved fan/pie shape',
            'Rectangular Prism': '6 rectangles (3 pairs)',
            'Triangular Prism': '2 triangles and 3 rectangles',
            'Square Pyramid': '1 square and 4 triangles'
        };

        const extendedParts = [
            { shape: 'Triangular Pyramid', desc: '4 identical triangles' },
            { shape: 'Pentagonal Prism', desc: '2 pentagons and 5 rectangles' },
            { shape: 'Hexagonal Prism', desc: '2 hexagons and 6 rectangles' },
            { shape: 'Square Pyramid', desc: '1 square base and 4 triangular sides' },
            { shape: 'Triangular Prism', desc: '2 triangular ends and 3 rectangular sides' },
            { shape: 'Cylinder', desc: '2 circular ends and 1 curved rectangular surface' },
        ];

        const cannotFoldShapes = [
            { fake: 'Sphere', explanation: 'A sphere is curved in every direction — you cannot fold flat paper into a perfect sphere.' },
            { fake: 'Torus', explanation: 'A torus (donut shape) has continuous curvature and cannot be formed from a flat net.' },
        ];

        const facesData = [
            { shape: 'Cube', faces: 6, question: 'How many faces does a cube have, meaning how many squares must its net contain?' },
            { shape: 'Square Pyramid', faces: 5, question: 'A square pyramid has how many faces total, and therefore how many polygons in its net?' },
            { shape: 'Triangular Prism', faces: 5, question: 'How many polygons appear in the net of a triangular prism?' },
            { shape: 'Cylinder', faces: 3, question: 'How many separate pieces (2 circles + 1 rectangle) make up a cylinder net?' },
            { shape: 'Cone', faces: 2, question: 'How many shapes are in a cone\'s net (1 circle + 1 fan)?' },
        ];

        const templates = [
            // Template 0: cube net question — varied text
            () => {
                const textVariant = cubeNetVariants[rnd(0, cubeNetVariants.length - 1)];
                const sqs = rnd(4, 8);
                const opts = shuffle(Array.from(new Set([6, sqs, sqs + 1, sqs > 6 ? sqs - 1 : sqs + 2]))).map(String);
                return {
                    text: textVariant,
                    options: opts, answer: opts.indexOf('6'),
                    explanation: 'A cube has 6 faces, so its net must have exactly 6 squares.',
                    image: '⬜⬜⬜⬜⬜⬜'
                };
            },
            // Template 1: net description → shape name
            () => {
                const target = shapes[rnd(0, shapes.length - 1)];
                const others = shuffle(shapes.filter(s => s !== target)).slice(0, 3);
                const options = shuffle([target, ...others]);
                return {
                    text: `A net consisting of ${descriptions[target]} folds into a...`,
                    options, answer: options.indexOf(target),
                    explanation: `A ${target} is formed by folding the net with ${descriptions[target]}.`,
                    image: '<svg width="1em" height="1em" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,15 85,32 50,50 15,32" fill="#dbeafe" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/><polygon points="15,32 50,50 50,85 15,68" fill="#60a5fa" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/><polygon points="50,50 85,32 85,68 50,85" fill="#93c5fd" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/></svg>'
                };
            },
            // Template 2: cannot be formed from a net
            () => {
                const item = cannotFoldShapes[rnd(0, cannotFoldShapes.length - 1)];
                const opts = shuffle([item.fake, 'Cube', 'Cylinder', 'Cone']);
                return {
                    text: `Which of these 3D shapes CANNOT be formed by folding a flat paper net?`,
                    options: opts, answer: opts.indexOf(item.fake),
                    explanation: item.explanation,
                    image: '🚫'
                };
            },
            // Template 3: extended parts → shape
            () => {
                const target = extendedParts[rnd(0, extendedParts.length - 1)];
                const otherNames = shuffle(['Cube', 'Cylinder', 'Cone', 'Square Pyramid', 'Triangular Prism'].filter(n => n !== target.shape)).slice(0, 3);
                const options = shuffle([target.shape, ...otherNames]);
                return {
                    text: `A net made of exactly ${target.desc} folds into a...`,
                    options, answer: options.indexOf(target.shape),
                    explanation: `Counting the faces based on the polygon names gives you the exact 3D shape — ${target.shape}.`,
                    image: '📏'
                };
            },
            // Template 4: how many faces / polygons in a net
            () => {
                const item = facesData[rnd(0, facesData.length - 1)];
                const wrong1 = item.faces + 1;
                const wrong2 = item.faces - 1 > 0 ? item.faces - 1 : item.faces + 2;
                const wrong3 = item.faces + 2;
                const opts = shuffle([item.faces, wrong1, wrong2, wrong3].map(String));
                return {
                    text: item.question,
                    options: opts, answer: opts.indexOf(String(item.faces)),
                    explanation: `A ${item.shape} has ${item.faces} faces, so its net contains ${item.faces} polygons.`,
                    image: '🔢'
                };
            },
            // Template 5: true/false about nets
            () => {
                const statements = [
                    { text: 'A net is a 3D object that has been inflated.', ans: 'False', explanation: 'False — a net is a flat 2D shape that folds into a 3D object.' },
                    { text: 'A cube can have more than one valid net layout.', ans: 'True', explanation: 'True — there are 11 different nets that can fold into a cube.' },
                    { text: 'Every 3D shape has exactly one possible net.', ans: 'False', explanation: 'False — many shapes (like the cube) have multiple valid nets.' },
                    { text: 'The net of a cylinder includes at least one circle.', ans: 'True', explanation: 'True — a cylinder net has 2 circles (top and bottom) and 1 rectangle.' },
                ];
                const item = statements[rnd(0, statements.length - 1)];
                const opts = shuffle(['True', 'False']);
                return {
                    text: `True or False: ${item.text}`,
                    options: opts, answer: opts.indexOf(item.ans),
                    explanation: item.explanation,
                    image: '🤔'
                };
            },
        ];

        while (questions.length < count) {
            attempts++;
            if (attempts > 2000) break; // safety escape

            const qObj = templates[rnd(0, templates.length - 1)]();
            const key = qObj.text;
            if (!seen.has(key)) {
                seen.add(key);
                questions.push({
                    type: 'multiple-choice',
                    question: qObj.text,
                    options: qObj.options,
                    correctAnswer: qObj.answer,
                    explanation: qObj.explanation,
                    image: qObj.image
                });
            }
        }
        return questions;
    };

    /* ─────────────────────────────────────────────
       ANGLES
    ───────────────────────────────────────────── */
    const generateAnglesQs = (count) => {
        const questions = [];
        const seen = new Set();
        let attempts = 0;

        const getAngleType = (deg) => {
            if (deg < 90) return 'Acute';
            if (deg === 90) return 'Right';
            if (deg < 180) return 'Obtuse';
            return 'Straight';
        };

        const templates = [
            // Template 0: classify angle by degree
            () => {
                const deg = rnd(10, 175);
                const ans = getAngleType(deg);
                const opts = shuffle(['Acute', 'Right', 'Obtuse', 'Straight']);
                return {
                    text: `An angle of exactly ${deg}° is classified as a(n)...`,
                    options: opts, answer: opts.indexOf(ans),
                    explanation: `${deg}° is ${deg < 90 ? 'less than 90° → Acute' : deg === 90 ? 'exactly 90° → Right' : deg < 180 ? 'between 90° and 180° → Obtuse' : 'exactly 180° → Straight'}.`
                };
            },
            // Template 1: clock hands
            () => {
                const hours = [3, 6, 4, 1, 9, 2, 5, 8, 10];
                const hr = hours[rnd(0, hours.length - 1)];
                const deg = hr <= 6 ? hr * 30 : (12 - hr) * 30;
                const ans = getAngleType(deg);
                const opts = shuffle(['Acute', 'Right', 'Obtuse', 'Straight']);
                return {
                    text: `What kind of angle do the clock hands form at ${hr}:00?`,
                    options: opts, answer: opts.indexOf(ans),
                    explanation: `At ${hr}:00, the angle is ${deg}°, which is a(n) ${ans.toLowerCase()} angle.`,
                    image: '🕒'
                };
            },
            // Template 2: real-world items
            () => {
                const items = [
                    { item: 'a perfect square corner', ans: 'Right' },
                    { item: 'a sharp pizza slice', ans: 'Acute' },
                    { item: 'a wide open book lying almost flat', ans: 'Obtuse' },
                    { item: 'a door opened exactly to 90°', ans: 'Right' },
                    { item: 'a sharp needle tip', ans: 'Acute' },
                    { item: 'the hands of a clock at 2:00', ans: 'Acute' },
                    { item: 'a fully opened flat scissors', ans: 'Straight' },
                ];
                const target = items[rnd(0, items.length - 1)];
                const opts = shuffle(['Acute', 'Right', 'Obtuse', 'Straight']);
                return {
                    text: `What type of angle best describes ${target.item}?`,
                    options: opts, answer: opts.indexOf(target.ans),
                    explanation: `${target.item} best represents a(n) ${target.ans.toLowerCase()} angle.`
                };
            },
            // Template 3: letters
            () => {
                const letters = [
                    { L: 'V', ans: 'Acute', desc: 'inner bottom tip' },
                    { L: 'L', ans: 'Right', desc: 'inner corner' },
                    { L: 'T', ans: 'Right', desc: 'junction point' },
                    { L: 'A', ans: 'Acute', desc: 'top peak' },
                    { L: 'W', ans: 'Acute', desc: 'inner peaks' },
                ];
                const target = letters[rnd(0, letters.length - 1)];
                const opts = shuffle(['Acute', 'Right', 'Obtuse', 'Straight']);
                return {
                    text: `The ${target.desc} of the letter '${target.L}' forms what kind of angle?`,
                    options: opts, answer: opts.indexOf(target.ans),
                    explanation: `The letter ${target.L} (at its ${target.desc}) forms an ${target.ans.toLowerCase()} angle.`
                };
            },
            // Template 4: range definition
            () => {
                const defs = [
                    { type: 'Acute', rule: 'less than 90°', example: '45°' },
                    { type: 'Right', rule: 'exactly 90°', example: '90°' },
                    { type: 'Obtuse', rule: 'greater than 90° but less than 180°', example: '120°' },
                    { type: 'Straight', rule: 'exactly 180°', example: '180°' },
                ];
                const target = defs[rnd(0, defs.length - 1)];
                const opts = shuffle(defs.map(d => d.type));
                return {
                    text: `An angle that is ${target.rule} (e.g. ${target.example}) is called a...`,
                    options: opts, answer: opts.indexOf(target.type),
                    explanation: `By definition, an angle ${target.rule} is called a ${target.type} angle.`
                };
            },
            // Template 5: which is bigger/smaller comparison
            () => {
                const pairs = [
                    { q: 'Which angle type is LARGER than a right angle but less than a straight line?', ans: 'Obtuse' },
                    { q: 'Which angle type is SMALLER than a right angle?', ans: 'Acute' },
                    { q: 'Which angle type is exactly half of a full rotation (360°)?', ans: 'Straight' },
                    { q: 'Which angle type measures exactly a quarter turn?', ans: 'Right' },
                ];
                const target = pairs[rnd(0, pairs.length - 1)];
                const opts = shuffle(['Acute', 'Right', 'Obtuse', 'Straight']);
                return {
                    text: target.q,
                    options: opts, answer: opts.indexOf(target.ans),
                    explanation: `The answer is ${target.ans}. ${target.q}`
                };
            },
            // Template 6: true/false about angles
            () => {
                const statements = [
                    { text: 'An obtuse angle is always smaller than a right angle.', ans: 'False', explanation: 'False — an obtuse angle is LARGER than a right angle (between 90° and 180°).' },
                    { text: 'A right angle measures exactly 90°.', ans: 'True', explanation: 'True — a right angle is always exactly 90°.' },
                    { text: 'An acute angle can be 95°.', ans: 'False', explanation: 'False — 95° is obtuse. Acute angles must be less than 90°.' },
                    { text: 'A straight angle measures 180°.', ans: 'True', explanation: 'True — a straight angle forms a straight line at exactly 180°.' },
                ];
                const item = statements[rnd(0, statements.length - 1)];
                const opts = shuffle(['True', 'False']);
                return {
                    text: `True or False: ${item.text}`,
                    options: opts, answer: opts.indexOf(item.ans),
                    explanation: item.explanation,
                    image: '📐'
                };
            },
        ];

        while (questions.length < count) {
            attempts++;
            if (attempts > 2000) break; // safety escape

            const qObj = templates[rnd(0, templates.length - 1)]();
            const key = qObj.text;
            if (!seen.has(key)) {
                seen.add(key);
                questions.push({
                    type: 'multiple-choice',
                    question: qObj.text,
                    options: qObj.options,
                    correctAnswer: qObj.answer,
                    explanation: qObj.explanation,
                    image: qObj.image
                });
            }
        }
        return questions;
    };

    /* ─────────────────────────────────────────────
       CIRCLES  — fixed const→let + ans recalc
    ───────────────────────────────────────────── */
    const generateCirclesQs = (count) => {
        const questions = [];
        const seen = new Set();
        let attempts = 0;

        const templates = [
            // Template 0: radius ↔ diameter calculation (FIXED)
            () => {
                const isRadius = rnd(0, 1) === 0;
                let val = rnd(10, 50);

                // Ensure even number when converting diameter → radius
                if (!isRadius && val % 2 !== 0) val++;

                let ans = isRadius ? val * 2 : val / 2;
                const text = isRadius
                    ? `If the Radius of a circle is ${val} cm, what is the Diameter?`
                    : `If the Diameter of a circle is ${val} cm, what is the Radius?`;

                const fake1 = isRadius ? val * 3 : val * 2;
                const fake2 = val + rnd(1, 5);
                const fake3 = Math.max(1, ans - rnd(1, 5));
                const opts = shuffle(Array.from(new Set([ans, fake1, fake2, fake3])).map(String));
                return {
                    text, options: opts, answer: opts.indexOf(String(ans)),
                    explanation: isRadius
                        ? `Diameter = 2 × Radius → 2 × ${val} = ${ans} cm.`
                        : `Radius = Diameter ÷ 2 → ${val} ÷ 2 = ${ans} cm.`,
                    image: '⭕'
                };
            },
            // Template 1: definitions
            () => {
                const defs = [
                    { word: 'Radius', desc: 'the distance from the center straight out to the edge' },
                    { word: 'Diameter', desc: 'a straight line cutting all the way across the circle through the center' },
                    { word: 'Center', desc: 'the exact middle point of the circle' },
                    { word: 'Circumference', desc: 'the outer distance around the boundary of the circle' },
                    { word: 'Chord', desc: 'a line segment connecting two points on the circle\'s edge' },
                    { word: 'Arc', desc: 'a curved portion of the circumference of a circle' },
                ];
                const target = defs[rnd(0, defs.length - 1)];
                const others = defs.filter(d => d.word !== target.word).map(d => d.word);
                const opts = shuffle([target.word, ...shuffle(others).slice(0, 3)]);
                return {
                    text: `What do we call ${target.desc}?`,
                    options: opts, answer: opts.indexOf(target.word),
                    explanation: `By definition, ${target.desc} is called the ${target.word}.`
                };
            },
            // Template 2: properties
            () => {
                const questionsList = [
                    { text: 'Which measurement is ALWAYS longer in any given circle?', ans: 'Diameter', opts: ['Radius', 'Diameter', 'They are equal', 'Chord'] },
                    { text: 'How many diameters can you draw in a single circle?', ans: 'Infinite', opts: ['1', '2', '4', 'Infinite'] },
                    { text: 'How many straight edges does a perfect circle have?', ans: '0', opts: ['0', '1', '2', 'Infinite'] },
                    { text: 'The diameter of a circle is how many times the radius?', ans: '2', opts: ['2', '3', '4', 'Half'] },
                    { text: 'What is the center of a circle also known as?', ans: 'The midpoint', opts: ['The midpoint', 'The vertex', 'The edge', 'The arc'] },
                ];
                const target = questionsList[rnd(0, questionsList.length - 1)];
                return {
                    text: target.text, options: target.opts, answer: target.opts.indexOf(target.ans),
                    explanation: `The correct answer is "${target.ans}". This is a standard property of circles.`,
                    image: '⚽'
                };
            },
            // Template 3: real-world radius/diameter
            () => {
                const val = rnd(5, 30) * 2; // always even
                const contexts = [
                    { ctx: 'pizza', part: 'radius', ans: val / 2, q: `A circular ${['pizza', 'cake', 'wheel'][rnd(0,2)]} has a diameter of ${val} cm. What is its radius?` },
                    { ctx: 'wheel', part: 'diameter', ans: val * 2, q: `A circular clock has a radius of ${val} cm. What is its full diameter?` },
                ];
                const item = contexts[rnd(0, contexts.length - 1)];
                const fake1 = item.ans + rnd(2, 8);
                const fake2 = item.ans - rnd(1, 4) || 1;
                const fake3 = item.ans * 3;
                const opts = shuffle(Array.from(new Set([item.ans, fake1, fake2, fake3])).map(String));
                return {
                    text: item.q,
                    options: opts, answer: opts.indexOf(String(item.ans)),
                    explanation: item.part === 'radius'
                        ? `Radius = Diameter ÷ 2 → ${val} ÷ 2 = ${item.ans} cm.`
                        : `Diameter = 2 × Radius → 2 × ${val} = ${item.ans} cm.`,
                    image: '🎯'
                };
            },
            // Template 4: true/false about circles
            () => {
                const statements = [
                    { text: 'The radius is always half the diameter.', ans: 'True', explanation: 'True — by definition, Radius = Diameter ÷ 2.' },
                    { text: 'A chord must pass through the center of the circle.', ans: 'False', explanation: 'False — only a diameter passes through the center. A chord connects any two points on the circle.' },
                    { text: 'The circumference is the area inside the circle.', ans: 'False', explanation: 'False — circumference is the perimeter (outer boundary), not the area.' },
                    { text: 'You can draw more than one diameter in a circle.', ans: 'True', explanation: 'True — you can draw infinitely many diameters through the center.' },
                    { text: 'All radii of a circle are equal in length.', ans: 'True', explanation: 'True — every radius of the same circle has the same length.' },
                ];
                const item = statements[rnd(0, statements.length - 1)];
                const opts = shuffle(['True', 'False']);
                return {
                    text: `True or False: ${item.text}`,
                    options: opts, answer: opts.indexOf(item.ans),
                    explanation: item.explanation,
                    image: '⭕'
                };
            },
        ];

        while (questions.length < count) {
            attempts++;
            if (attempts > 2000) break; // safety escape

            const qObj = templates[rnd(0, templates.length - 1)]();
            const key = qObj.text;
            if (!seen.has(key)) {
                seen.add(key);
                questions.push({
                    type: 'multiple-choice',
                    question: qObj.text,
                    options: qObj.options,
                    correctAnswer: qObj.answer,
                    explanation: qObj.explanation,
                    image: qObj.image
                });
            }
        }
        return questions;
    };

    /* ─────────────────────────────────────────────
       SKILL DATA EXPORT
    ───────────────────────────────────────────── */
    return [
        {
            id: 'identifying-3d-shapes',
            title: 'Identifying 3D Shapes',
            desc: 'Learn about faces, edges, and corners of 3D solids.',
            color: '#d97706',
            icon: '<svg width="1em" height="1em" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,15 85,32 50,50 15,32" fill="#dbeafe" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/><polygon points="15,32 50,50 50,85 15,68" fill="#60a5fa" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/><polygon points="50,50 85,32 85,68 50,85" fill="#93c5fd" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/></svg>',
            learnSections: [
                {
                    heading: 'Faces, Edges, and Vertices',
                    content: '3D objects are made of flat surfaces (faces), the lines where faces meet (edges), and the sharp points where edges meet (vertices/corners).',
                    example: 'A cube has 6 flat faces, 12 edges, and 8 vertices.'
                },
                {
                    heading: 'Curved vs Flat',
                    content: 'Some objects only have flat faces (like a box). Some only have curved faces (like a ball/sphere). And some have both (like a cylinder/can).',
                    example: 'A sphere has 1 curved face, 0 edges, and 0 vertices.'
                }
            ],
            practice: generate3DShapesQs(20),
            assessment: generate3DShapesQs(20)
        },
        {
            id: 'nets-of-shapes',
            title: 'Nets of Solids',
            desc: 'Understand how flat 2D shapes fold into 3D objects.',
            color: '#059669',
            icon: '<svg width="1em" height="1em" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,15 85,32 50,50 15,32" fill="#dbeafe" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/><polygon points="15,32 50,50 50,85 15,68" fill="#60a5fa" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/><polygon points="50,50 85,32 85,68 50,85" fill="#93c5fd" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="miter"/></svg>',
            learnSections: [
                {
                    heading: 'What is a Net?',
                    content: 'A net is a 2D flat shape that can be folded along its edges to form a 3D object. Imagine unfolding a cardboard box and laying it completely flat.',
                    example: 'The net of a cube is made of 6 connected squares. If you cut it out and fold the lines, it makes a perfect box.'
                },
                {
                    heading: 'Visualizing Prisms and Pyramids',
                    content: 'You can identify a shape from its net. If the net has a square in the middle with 4 triangles attached, it folds into a square pyramid!',
                    example: 'A cylinder net looks like a large rectangle with two circles attached to opposite edges.'
                }
            ],
            practice: generateNetsQs(20),
            assessment: generateNetsQs(20)
        },
        {
            id: 'types-of-angles',
            title: 'Types of Angles',
            desc: 'Learn to distinguish between Acute, Right, and Obtuse angles.',
            color: '#dc2626',
            icon: '📐',
            learnSections: [
                {
                    heading: 'Right Angles',
                    content: 'A right angle is exactly 90 degrees. It looks like the perfect corner of a square, the letter L, or the corner of your screen.',
                    example: 'A square or rectangle has exactly 4 right angles.'
                },
                {
                    heading: 'Acute and Obtuse Angles',
                    content: 'An Acute angle is smaller/sharper than a right angle (less than 90°). An Obtuse angle is wider/larger than a right angle (more than 90°).',
                    example: 'Acute = sharp pizza slice. Obtuse = a wide open book lying almost flat.'
                }
            ],
            practice: generateAnglesQs(20),
            assessment: generateAnglesQs(20)
        },
        {
            id: 'exploring-circles',
            title: 'Exploring Circles',
            desc: 'Understand circle properties like radius, diameter, and center.',
            color: '#be185d',
            icon: '⭕',
            learnSections: [
                {
                    heading: 'Center and Radius',
                    content: 'The "Center" is the exact middle point of a circle. The "Radius" is the distance from the center straight out to the edge.',
                    example: 'Think of a bicycle wheel: the axle is the center, and the metal spokes are the radius lines.'
                },
                {
                    heading: 'Diameter',
                    content: 'The "Diameter" is a straight line cutting all the way across the entire circle, passing directly through the center point.',
                    example: 'Because it goes all the way across, the Diameter is exactly DOUBLE the length of the Radius! (D = 2 × R)'
                }
            ],
            practice: generateCirclesQs(20),
            assessment: generateCirclesQs(20)
        }
    ];
};
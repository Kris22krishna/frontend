/* ═══════════════════════════════════════════════════════════════════════════
   EGScenarioUtils — Dynamic question generators for Euclid's Geometry
   Each generator produces 10 unique, non-repeating questions.
   ═══════════════════════════════════════════════════════════════════════════ */

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
};

const pick = (arr) => arr[randInt(0, arr.length - 1)];

/* ═══ Skill 1: Definitions & Axioms ═══════════════════════════════════════════ */
export const generateDefinitionsScenarios = () => {
    const scenarios = [];

    // Q1: Point dimension
    scenarios.push({
        q: `According to Euclid, a point has:`,
        opts: shuffle(['No part (0 dimensions)', 'Length only (1 dimension)', 'Length and breadth (2 dimensions)', 'Shape, size, and position (3 dimensions)']),
        correctText: 'No part (0 dimensions)',
        expl: `Euclid's Definition 1: A point is that which has no part — it has zero dimensions.`,
    });

    // Q2: Line dimension
    scenarios.push({
        q: `Euclid defined a "line" as having:`,
        opts: shuffle(['Breadthless length', 'Length and breadth', 'No dimensions at all', 'Three dimensions']),
        correctText: 'Breadthless length',
        expl: `Euclid's Definition 2: A line is breadthless length — it has exactly one dimension.`,
    });

    // Q3: Surface dimension
    scenarios.push({
        q: `What characterizes a "surface" in Euclid's definitions?`,
        opts: shuffle(['It has length and breadth only', 'It has no part', 'It has breadthless length', 'It has length, breadth, and depth']),
        correctText: 'It has length and breadth only',
        expl: `Euclid's Definition 5: A surface is that which has length and breadth only — two dimensions.`,
    });

    // Q4: Ends of a line
    scenarios.push({
        q: `According to Euclid, the ends (extremities) of a line are:`,
        opts: shuffle(['Points', 'Lines', 'Surfaces', 'Angles']),
        correctText: 'Points',
        expl: `Euclid's Definition 3: The ends of a line are points.`,
    });

    // Q5: Axiom 1 — Transitivity
    const val1 = randInt(10, 50);
    scenarios.push({
        q: `If the weight of Box A equals the weight of Box B, and the weight of Box B is exactly ${val1} kg, what is the weight of Box A?`,
        opts: shuffle([`${val1} kg`, `${val1 + 5} kg`, `Cannot be determined`, `0 kg`]),
        correctText: `${val1} kg`,
        expl: `By Axiom 1: "Things which are equal to the same thing are equal to one another." Since A = B and B = ${val1}, then A = ${val1}.`,
    });

    // Q6: Axiom 2 — Adding equals
    const val2 = randInt(5, 20);
    const val3 = randInt(3, 10);
    scenarios.push({
        q: `If $a = b$ and you add ${val3} to both sides, what can you conclude?`,
        opts: shuffle([`$a + ${val3} = b + ${val3}$`, `$a + ${val3} > b + ${val3}$`, `$a + ${val3} < b + ${val3}$`, `Nothing can be concluded`]),
        correctText: `$a + ${val3} = b + ${val3}$`,
        expl: `Axiom 2: "If equals be added to equals, the wholes are equal."`,
    });

    // Q7: Axiom 4 — Coincidence
    const shapeType = pick(['rectangle', 'triangle', 'circle']);
    scenarios.push({
        q: `If ${shapeType} A perfectly coincides with ${shapeType} B (covering exactly the same space), what does Axiom 4 tell us?`,
        opts: shuffle([`${shapeType} A equals ${shapeType} B`, `${shapeType} A is greater than ${shapeType} B`, `${shapeType} B is greater than ${shapeType} A`, `They are parallel`]),
        correctText: `${shapeType} A equals ${shapeType} B`,
        expl: `Axiom 4: "Things which coincide with one another are equal to one another."`,
        svg: { type: 'axiom-overlap', data: { shape: shapeType === 'circle' ? 'circle' : 'rect', offset: 0 } }
    });

    // Q8: Axiom 5 — Whole > Part
    const wholeObj = pick(['pizza', 'rope', 'angle', 'line segment']);
    scenarios.push({
        q: `If you cut a piece from a ${wholeObj}, which statement is always true according to Euclid's Axiom 5?`,
        opts: shuffle([`The whole ${wholeObj} is greater than the cut piece`, `The cut piece is greater than the whole`, `They are equal`, `Cannot be determined`]),
        correctText: `The whole ${wholeObj} is greater than the cut piece`,
        expl: `Axiom 5: "The whole is greater than the part."`,
    });

    // Q9: Axiom 3 — Subtracting equals
    const val4 = randInt(10, 30);
    const val5 = randInt(2, 9);
    scenarios.push({
        q: `If two rods each measure ${val4} cm, and you cut ${val5} cm from each, are the remaining pieces equal?`,
        opts: shuffle([`Yes, by Axiom 3`, `No, they may differ`, `Only if they are made of the same material`, `Cannot be determined`]),
        correctText: `Yes, by Axiom 3`,
        expl: `Axiom 3: "If equals be subtracted from equals, the remainders are equal." Both rods started equal (${val4} cm) and had the same amount (${val5} cm) removed.`,
    });

    // Q10: Axiom 6 & 7 — Doubles and Halves
    const val6 = randInt(5, 25);
    scenarios.push({
        q: `If $x = y$ and both are doubled, Euclid's Axiom 6 tells us that $2x$ and $2y$ are:`,
        opts: shuffle(['Equal to each other', 'Not necessarily equal', '$2x$ is always greater', 'Undefined']),
        correctText: 'Equal to each other',
        expl: `Axiom 6: "Things which are double of the same things are equal to one another."`,
    });

    return shuffle(scenarios).map(s => {
        const ansIdx = s.opts.indexOf(s.correctText);
        return { ...s, type: 'mcq', ans: ansIdx };
    });
};

/* ═══ Skill 2: The Five Postulates ════════════════════════════════════════ */
export const generatePostulatesScenarios = () => {
    const scenarios = [];

    // Q1: Postulate 1 — Unique line through 2 points
    const pts1 = shuffle(['P', 'Q', 'R', 'S', 'A', 'B']);
    scenarios.push({
        q: `How many distinct straight lines can pass through both points $${pts1[0]}$ and $${pts1[1]}$?`,
        opts: shuffle(['Exactly one', 'Two', 'Zero', 'Infinitely many']),
        correctText: 'Exactly one',
        expl: `Postulate 1: Given two distinct points, there is a unique straight line that passes through both.`,
        svg: { type: 'points-line', data: { pts: 2 } }
    });

    // Q2: Postulate 1 — Reverse phrasing
    scenarios.push({
        q: `If two straight lines pass through the exact same pair of distinct points, what must be true?`,
        opts: shuffle(['They must be the same line', 'They are parallel', 'They intersect at a third point', 'One is longer than the other']),
        correctText: 'They must be the same line',
        expl: `Postulate 1 guarantees uniqueness — only one straight line can connect two given distinct points.`,
    });

    // Q3: Postulate 2 — Line extension
    scenarios.push({
        q: `A terminated line (line segment) can be:`,
        opts: shuffle(['Extended indefinitely in both directions', 'Extended only to a fixed length', 'Only extended in one direction', 'Not extended at all']),
        correctText: 'Extended indefinitely in both directions',
        expl: `Postulate 2: A terminated line can be produced indefinitely — it can be extended in both directions without limit.`,
    });

    // Q4: Postulate 3 — Circle with any radius
    const radius = randInt(3, 25);
    scenarios.push({
        q: `Can a circle be drawn with centre at any point O and radius exactly ${radius} cm?`,
        opts: shuffle([`Yes, Postulate 3 guarantees this`, `No, the radius is too ${radius > 15 ? 'long' : 'short'}`, `Only if the centre is at the origin`, `Only for certain radii`]),
        correctText: `Yes, Postulate 3 guarantees this`,
        expl: `Postulate 3: "A circle can be drawn with any centre and any radius." No restrictions exist.`,
    });

    // Q5: Postulate 3 — Any centre
    const place = pick(['the North Pole', 'the middle of the ocean', 'the surface of the Moon', 'any point in space']);
    scenarios.push({
        q: `According to Postulate 3, can a circle be drawn with its centre at ${place}?`,
        opts: shuffle(['Yes, with any centre and any radius', 'No, it must be on flat paper', 'Only on a Euclidean plane', 'Only at special points']),
        correctText: 'Yes, with any centre and any radius',
        expl: `Postulate 3 places no restriction on where the centre is — any centre, any radius.`,
    });

    // Q6: Postulate 4 — Right angles equality
    const shape1 = pick(['tiny triangle', 'small notebook', 'stamp']);
    const shape2 = pick(['massive building', 'football field', 'billboard']);
    scenarios.push({
        q: `A right angle drawn inside a ${shape1} and another inside a ${shape2} — how do they compare?`,
        opts: shuffle(['They are exactly equal', `The one in the ${shape2} is larger`, `The one in the ${shape1} is larger`, 'Cannot be compared']),
        correctText: 'They are exactly equal',
        expl: `Postulate 4: "All right angles are equal to one another" — regardless of context or size.`,
    });

    // Q7: Postulate 4 — Rotated right angle
    scenarios.push({
        q: `If a right angle is rotated 45 degrees, does its measure change?`,
        opts: shuffle(['No, it remains exactly 90°', 'Yes, it becomes 45°', 'Yes, it becomes 135°', 'It depends on direction']),
        correctText: 'No, it remains exactly 90°',
        expl: `Postulate 4 confirms all right angles are equal. Rotation does not change the angle's measure.`,
    });

    // Q8: Postulate 5 — Interior angles < 180°
    const a1 = randInt(50, 85);
    const a2 = randInt(50, 85);
    const sum = a1 + a2;
    scenarios.push({
        q: `A transversal crosses two lines, making interior angles of $${a1}^\\circ$ and $${a2}^\\circ$ on the right. Their sum is $${sum}^\\circ$. What happens?`,
        opts: shuffle(['Lines meet on the right side', 'Lines meet on the left side', 'Lines are parallel', 'Lines diverge']),
        correctText: 'Lines meet on the right side',
        expl: `Since $${a1}^\\circ + ${a2}^\\circ = ${sum}^\\circ < 180^\\circ$, the Fifth Postulate says the lines will intersect on that (right) side.`,
        svg: { type: 'transversal', data: { willMeet: true } }
    });

    // Q9: Postulate 5 — Sum = 180° (parallel case)
    scenarios.push({
        q: `If a transversal crosses two lines and the co-interior angles on one side sum to exactly $180^\\circ$, what does this tell us?`,
        opts: shuffle(['The lines are parallel and will never meet', 'The lines will meet on that side', 'The lines will meet on the opposite side', 'The angles are wrong']),
        correctText: 'The lines are parallel and will never meet',
        expl: `When co-interior angles sum to exactly $180^\\circ$, neither side has a sum less than $180^\\circ$, so the lines are parallel.`,
    });

    // Q10: Postulate 5 — Identifying the intersection side
    const a3 = randInt(60, 80);
    const a4 = 180 - a3 - randInt(5, 20);
    scenarios.push({
        q: `Interior angles on the LEFT of a transversal sum to $${a3 + a4}^\\circ$. On which side will the two lines meet?`,
        opts: shuffle(['On the left side', 'On the right side', 'They will never meet', 'On both sides']),
        correctText: 'On the left side',
        expl: `Since the sum on the left ($${a3 + a4}^\\circ$) is less than $180^\\circ$, the lines meet on the left side (Fifth Postulate).`,
    });

    return shuffle(scenarios).map(s => {
        const ansIdx = s.opts.indexOf(s.correctText);
        return { ...s, type: 'mcq', ans: ansIdx };
    });
};

/* ═══ Skill 3: Equivalent Versions ════════════════════════════════════════ */
export const generateEquivalentsScenarios = () => {
    const scenarios = [];

    // Q1: Playfair's Axiom — Basic
    const ln1 = 'L' + randInt(1, 9);
    const pt1 = 'P' + randInt(1, 9);
    scenarios.push({
        q: `Given line $${ln1}$ and point $${pt1}$ not on $${ln1}$, how many lines through $${pt1}$ are parallel to $${ln1}$?`,
        opts: shuffle(['Exactly one', 'Two', 'None', 'Infinitely many']),
        correctText: 'Exactly one',
        expl: `Playfair's Axiom: Through a point not on a line, there exists exactly one parallel line.`,
    });

    // Q2: Playfair's Axiom — Rephrased
    scenarios.push({
        q: `Can two different lines both pass through the same point and both be parallel to a given line?`,
        opts: shuffle(['No, only one such line exists', 'Yes, two can exist', 'Yes, infinitely many can exist', 'It depends on the angle']),
        correctText: 'No, only one such line exists',
        expl: `Playfair's Axiom guarantees uniqueness — only one parallel through a given external point.`,
    });

    // Q3: Intersecting lines cannot both be parallel
    scenarios.push({
        q: `Lines A and B intersect at point X. Can both A and B be parallel to a third line C?`,
        opts: shuffle(['No, two intersecting lines cannot both be parallel to the same line', 'Yes, if they meet at 90°', 'Yes, always', 'Only if C is perpendicular']),
        correctText: 'No, two intersecting lines cannot both be parallel to the same line',
        expl: `This is a direct consequence of the Fifth Postulate. If A ∥ C, then B (which crosses A) must eventually cross C.`,
    });

    // Q4: Recognizing the equivalent
    scenarios.push({
        q: `Which of the following is an equivalent statement of Euclid's Fifth Postulate?`,
        opts: shuffle(["Playfair's Axiom", 'The whole is greater than the part', 'A circle can be drawn with any radius', 'All right angles are equal']),
        correctText: "Playfair's Axiom",
        expl: `Playfair's Axiom is the most well-known equivalent restatement of Euclid's Fifth Postulate.`,
    });

    // Q5: Why is the 5th Postulate special?
    scenarios.push({
        q: `Why is the Fifth Postulate considered unique compared to the other four?`,
        opts: shuffle(['It is more complex and was debated for centuries', 'It is about circles', 'It is simpler than the others', 'It was added much later by another mathematician']),
        correctText: 'It is more complex and was debated for centuries',
        expl: `Mathematicians tried for over 2000 years to prove it from the other four postulates, leading to the discovery of non-Euclidean geometries.`,
    });

    // Q6: Parallel line through external point
    const ln2 = 'M' + randInt(1, 5);
    const pt2 = 'Q' + randInt(1, 5);
    scenarios.push({
        q: `Point $${pt2}$ is NOT on line $${ln2}$. You draw line $N$ through $${pt2}$ parallel to $${ln2}$. If someone claims line $R$ (also through $${pt2}$) is parallel to $${ln2}$ too, what must be true?`,
        opts: shuffle(['$R$ must be the same line as $N$', '$R$ is perpendicular to $N$', '$R$ and $N$ are both valid parallels', '$R$ must intersect $N$']),
        correctText: '$R$ must be the same line as $N$',
        expl: `By Playfair's Axiom, there is exactly ONE parallel through a given external point. So R = N.`,
    });

    // Q7: Non-Euclidean hint
    scenarios.push({
        q: `If Euclid's Fifth Postulate is replaced with "no parallel lines exist," what type of geometry results?`,
        opts: shuffle(['Spherical (Elliptic) Geometry', 'Euclidean Geometry', 'Coordinate Geometry', 'Fractal Geometry']),
        correctText: 'Spherical (Elliptic) Geometry',
        expl: `Denying the parallel postulate (No parallel through an external point) gives Elliptic/Spherical geometry, where all lines eventually meet.`,
    });

    // Q8: Practical parallel
    scenarios.push({
        q: `Train tracks run along line $L$. At station $S$ (not on $L$), engineers want to build a track parallel to $L$. How many options do they have?`,
        opts: shuffle(['Exactly one direction', 'Two directions', 'Infinitely many', 'None — impossible']),
        correctText: 'Exactly one direction',
        expl: `By Playfair's Axiom, there is exactly one line through station S that is parallel to the existing track L.`,
    });

    // Q9: Logical deduction
    scenarios.push({
        q: `If line $P \\parallel Q$ and line $R \\parallel Q$, and P ≠ R, do P and R intersect?`,
        opts: shuffle(['No, P and R are also parallel to each other', 'Yes, they must intersect', 'Only if Q is horizontal', 'Cannot be determined']),
        correctText: 'No, P and R are also parallel to each other',
        expl: `Lines parallel to the same line are parallel to each other. If P and R both differ and are ∥ Q, then P ∥ R.`,
    });

    // Q10: Intersecting = not both parallel
    const ln3 = pick(['X', 'Y', 'Z']);
    scenarios.push({
        q: `Lines $A$ and $B$ cross each other. Line $A \\parallel ${ln3}$. Is line $B$ also parallel to $${ln3}$?`,
        opts: shuffle(['No, B must intersect ' + ln3, 'Yes, B is also parallel', 'Only if B is perpendicular to A', 'Cannot be determined']),
        correctText: 'No, B must intersect ' + ln3,
        expl: `Two distinct intersecting lines cannot both be parallel to the same line. Since A ∥ ${ln3} and B crosses A, B must cross ${ln3} too.`,
    });

    return shuffle(scenarios).map(s => {
        const ansIdx = s.opts.indexOf(s.correctText);
        return { ...s, type: 'mcq', ans: ansIdx };
    });
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const generateUniqueQuestions = (generatorFunc, count) => {
    const questions = [];
    const signatures = new Set();
    let attempts = 0;
    while (questions.length < count && attempts < count * 10) {
        attempts++;
        const q = generatorFunc();
        const signature = `${q.question}_${q.options[q.correct]}`;
        if (!signatures.has(signature)) {
            signatures.add(signature);
            questions.push(q);
        }
    }
    return questions;
};

// ─── TOPIC 1: Basic Concepts ─────────────────────────────────────
const _generateBasicConceptsQuestion = () => {
    const type = getRandomInt(1, 3);
    if (type === 1) {
        // Line, Ray, Segment
        const concept = pickRandom([
            { t: 'Line', d: 'extends infinitely in both directions without endpoints' },
            { t: 'Ray', d: 'starts at one endpoint and extends infinitely in one direction' },
            { t: 'Line Segment', d: 'is a part of a line bounded by two distinct endpoints' }
        ]);
        const q = `Which geometric figure ${concept.d}?`;
        const options = ['Line', 'Ray', 'Line Segment', 'Point'];
        return {
            question: q,
            options,
            correct: options.indexOf(concept.t),
            explanation: `A ${concept.t.toLowerCase()} ${concept.d}.`
        };
    } else if (type === 2) {
        // Examples
        const scenario = pickRandom([
            { q: 'the beam of light from a flashlight', ans: 'Ray' },
            { q: 'the edge of a ruler', ans: 'Line Segment' },
            { q: 'a straight highway stretching endlessly in both directions', ans: 'Line' }
        ]);
        const options = ['Line', 'Ray', 'Line Segment', 'Angle'];
        return {
            question: `Which geometric figure is best represented by ${scenario.q}?`,
            options,
            correct: options.indexOf(scenario.ans),
            explanation: `Since ${scenario.q} acts like a ${scenario.ans.toLowerCase()}, it is the best real-life representation.`
        };
    } else {
        // Angle Classification
        const a = getRandomInt(10, 175);
        let ans;
        if (a < 90) ans = 'Acute';
        else if (a === 90) ans = 'Right';
        else if (a < 180) ans = 'Obtuse';
        const q = `Classify an angle measuring $${a}°$.`;
        const options = ['Acute', 'Right', 'Obtuse', 'Reflex'];
        return {
            question: q,
            options,
            correct: options.indexOf(ans),
            explanation: `An angle of $${a}°$ is ${ans.toLowerCase()} because it is ${a < 90 ? 'less than $90°$' : a === 90 ? 'exactly $90°$' : 'greater than $90°$ and less than $180°$'}.`
        };
    }
};

export const generateBasicConceptsQuestions = () => generateUniqueQuestions(_generateBasicConceptsQuestion, 10);

// ─── TOPIC 2: Related Angles ─────────────────────────────────────
const _generateRelatedAnglesQuestion = () => {
    const type = getRandomInt(1, 4);
    if (type === 1) {
        // Complementary angle finding
        const a = getRandomInt(10, 80);
        const comp = 90 - a;
        const ans = `$${comp}°$`;
        const wrongs = [`$${comp + 10}°$`, `$${comp - 10}°$`, `$${180 - a}°$`];
        const options = [ans, ...wrongs];
        shuffle(options);
        return {
            question: `Find the complement of $${a}°$.`,
            options,
            correct: options.indexOf(ans),
            explanation: `Complementary angles add up to $90°$. Therefore, complement = $90° - ${a}° = ${comp}°$.`
        };
    } else if (type === 2) {
        // Supplementary angle finding
        const a = getRandomInt(40, 140);
        const supp = 180 - a;
        const ans = `$${supp}°$`;
        const wrongs = [`$${supp + 10}°$`, `$${supp - 10}°$`, `$${90 - a > 0 ? 90 - a : 210 - a}°$`];
        const options = [ans, ...wrongs];
        shuffle(options);
        return {
            question: `Find the supplement of $${a}°$.`,
            options,
            correct: options.indexOf(ans),
            explanation: `Supplementary angles add up to $180°$. Therefore, supplement = $180° - ${a}° = ${supp}°$.`
        };
    } else if (type === 3) {
        // Identification
        const isComp = Math.random() > 0.5;
        const a = getRandomInt(20, 70);
        const b = isComp ? 90 - a : Number(180 - a);
        const ans = isComp ? 'Complementary' : 'Supplementary';
        const q = `Identify the relationship between the angles $${a}°$ and $${b}°$.`;
        const options = ['Complementary', 'Supplementary', 'Equal', 'Vertically Opposite'];
        return {
            question: q,
            options,
            correct: options.indexOf(ans),
            explanation: `The sum of $${a}°$ and $${b}°$ is $${a + b}°$, so they are ${ans.toLowerCase()} angles.`
        };
    } else {
        // Word Problems
        const isComp = Math.random() > 0.5;
        const diff = getRandomInt(1, 4) * 10; // 10, 20, 30, 40
        const total = isComp ? 90 : 180;
        // x + y = total, x - y = diff => 2x = total + diff => x = (total + diff)/2
        const larger = (total + diff) / 2;
        const smaller = total - larger;
        
        const ans = `$${larger}°$ and $${smaller}°$`;
        const options = [
            ans,
            `$${larger + 10}°$ and $${smaller - 10}°$`,
            `$${larger - 5}°$ and $${smaller + 5}°$`,
            `$${smaller}°$ and $${larger + 20}°$`
        ];
        shuffle(options);
        return {
            question: `The difference in the measures of two ${isComp ? 'complementary' : 'supplementary'} angles is $${diff}°$. Find the measures of the angles.`,
            options,
            correct: options.indexOf(ans),
            explanation: `Let the angles be $x$ and $y$. Sum = $${total}°$, Difference = $${diff}°$. Adding equations gives $2x = ${total + diff}°$, so $x = ${larger}°$ and $y = ${smaller}°$.`
        };
    }
};

export const generateRelatedAnglesQuestions = () => generateUniqueQuestions(_generateRelatedAnglesQuestion, 10);

// ─── TOPIC 3: Pairs of Lines ─────────────────────────────────────
const _generatePairsOfLinesQuestion = () => {
    const type = getRandomInt(1, 3);
    if (type === 1) {
        const p = pickRandom([
            { q: 'intersecting lines', ans: 'Two lines that cross at exactly one common point' },
            { q: 'transversal', ans: 'A line that intersects two or more other lines at distinct points' },
            { q: 'parallel lines', ans: 'Lines in the same plane that never intersect, no matter how far they are extended' }
        ]);
        const options = [
            'Two lines that cross at exactly one common point',
            'A line that intersects two or more other lines at distinct points',
            'Lines in the same plane that never intersect, no matter how far they are extended',
            'Lines that form a $90°$ angle at their intersection'
        ];
        return {
            question: `What is the correct definition of ${p.q}?`,
            options,
            correct: options.indexOf(p.ans),
            explanation: `By definition, ${p.q} fit the description: "${p.ans}".`
        };
    } else if (type === 2) {
        const q = `Can a single line intersect two other lines and NOT be a transversal?`;
        const options = ['Yes, if it intersects them both at the exact same point', 'No, any line crossing two others is a transversal', 'Yes, but only if the two lines are parallel', 'Yes, but only if all lines are perpendicular'];
        return {
            question: q,
            options,
            correct: 0,
            explanation: `By definition, a transversal must intersect the lines at **distinct** (different) points. If it passes through the exact intersection of the other two lines, it is not a transversal.`
        };
    } else {
        const angle = getRandomInt(30, 150);
        const ans = `$${angle}°$`;
        const wrongs = [`$${180 - angle}°$`, `$${90 - angle > 0 ? 90 - angle : 180 + angle}°$`, `$${angle / 2}°$`];
        const options = [ans, ...wrongs];
        shuffle(options);
        return {
            question: `Two intersecting lines form an angle of $${angle}°$. What is the measure of the vertically opposite angle?`,
            options,
            correct: options.indexOf(ans),
            explanation: `Vertically opposite angles are always equal when two lines intersect. So the opposite angle is also $${angle}°$.`
        };
    }
};

export const generatePairsOfLinesQuestions = () => generateUniqueQuestions(_generatePairsOfLinesQuestion, 10);

// ─── TOPIC 4: Transversal and Parallel Lines (Properties) ────────────────
const _generateTransversalPropertiesQuestion = () => {
    const type = getRandomInt(1, 3);
    const angle = getRandomInt(40, 140);
    const supp = 180 - angle;
    
    if (type === 1) {
        // Corresponding
        const ans = `$${angle}°$`;
        const options = [`$${angle}°$`, `$${supp}°$`, `$${angle * 2}°$`, `$${angle / 2}°$`];
        shuffle(options);
        return {
            question: `If two parallel lines are cut by a transversal and one angle is $${angle}°$, what is the measure of its corresponding angle?`,
            options,
            correct: options.indexOf(ans),
            explanation: `If lines are parallel, corresponding angles are equal. So it is also $${angle}°$.`
        };
    } else if (type === 2) {
        // Alternate Interior
        const ans = `$${angle}°$`;
        const options = [`$${angle}°$`, `$${supp}°$`, `$90°$`, `$180°$`];
        shuffle(options);
        return {
            question: `Two parallel lines are intersected by a transversal. If an interior angle is $${angle}°$, what is the measure of its alternate interior angle?`,
            options,
            correct: options.indexOf(ans),
            explanation: `Alternate interior angles are equal when lines are parallel. It must measure $${angle}°$.`
        };
    } else {
        // Interior on Same Side (Consecutive Interior)
        const ans = `$${supp}°$`;
        const options = [`$${supp}°$`, `$${angle}°$`, `$${180 + angle}°$`, `$90°$`];
        shuffle(options);
        return {
            question: `A transversal intersects two parallel lines. If one interior angle is $${angle}°$, what is the measure of the interior angle on the same side of the transversal?`,
            options,
            correct: options.indexOf(ans),
            explanation: `Interior angles on the same side of a transversal are supplementary (sum to $180°$) when lines are parallel. $180° - ${angle}° = ${supp}°$.`
        };
    }
};

export const generateTransversalPropertiesQuestions = () => generateUniqueQuestions(_generateTransversalPropertiesQuestion, 10);

// ─── TOPIC 5: Checking for Parallel Lines ────────────────────────────────
const _generateCheckingParallelQuestion = () => {
    const type = Math.random();
    if (type < 0.33) {
        const isParallel = Math.random() > 0.5;
        const a1 = getRandomInt(50, 130);
        const a2 = isParallel ? a1 : a1 + getRandomInt(5, 15);
        const ans = isParallel ? 'They are parallel' : 'They are NOT parallel';
        const options = ['They are parallel', 'They are NOT parallel', 'They are perpendicular', 'Cannot be determined'];
        return {
            question: `Two lines are cut by a transversal. If a pair of corresponding angles measures $${a1}°$ and $${a2}°$, what can you conclude about the two lines?`,
            options,
            correct: options.indexOf(ans),
            explanation: `Corresponding angles must be perfectly equal for lines to be parallel. Here, $${a1}° ${isParallel ? '=' : '\\neq'} ${a2}°$, so the lines are ${isParallel ? 'parallel' : 'NOT parallel'}.`
        };
    } else if (type < 0.66) {
        const isParallel = Math.random() > 0.5;
        const a1 = getRandomInt(50, 130);
        const a2 = isParallel ? a1 : a1 + getRandomInt(-15, -5);
        const ans = isParallel ? 'Parallel' : 'Not Parallel';
        const options = ['Parallel', 'Not Parallel'];
        return {
            question: `Alternate interior angles measure $${a1}°$ and $${a2}°$. Are the intersected lines parallel or not?`,
            options,
            correct: options.indexOf(ans),
            explanation: `Alternate interior angles must be equal for lines to be parallel. Because $${a1}° ${isParallel ? '==' : '\\neq'} ${a2}°$, they are ${isParallel ? 'parallel' : 'not parallel'}.`
        };
    } else {
        const isParallel = Math.random() > 0.5;
        const a1 = getRandomInt(60, 120);
        const a2 = isParallel ? 180 - a1 : 180 - a1 + getRandomInt(5, 10);
        const sum = a1 + a2;
        const ans = isParallel ? 'Parallel' : 'Intersecting';
        const options = ['Parallel', 'Intersecting', 'Perpendicular', 'Coincident'];
        return {
            question: `Interior angles on the exact same side of a transversal are $${a1}°$ and $${a2}°$. What type of lines are these?`,
            options,
            correct: options.indexOf(ans),
            explanation: `Interior angles on the same side must sum to exactly $180°$ for lines to be parallel. Here, $${a1}° + ${a2}° = ${sum}°$. Since the sum is ${isParallel ? '180' : 'NOT 180'}, the lines will eventually ${isParallel ? 'never intersect (Parallel)' : 'intersect'}.`
        };
    }
};

export const generateCheckingParallelQuestions = () => generateUniqueQuestions(_generateCheckingParallelQuestion, 10);

// ─── TOPIC 6: Applications & Problem Solving ─────────────────────────────
const _generateApplicationsQuestion = () => {
    const isAlgebraic = Math.random() > 0.5;
    
    if (isAlgebraic) {
        // Solve for x in parallel lines algebra
        // E.g. Corresponding angles: 2x + 10 = 3x - 20 => x = 30
        const m1 = getRandomInt(2, 4);
        const m2 = m1 + 1; // so diff is 1 for easy solving
        const a1 = getRandomInt(10, 30);
        const a2 = getRandomInt(10, 30);
        const x = a1 + a2; // m1(x) + a1 = m2(x) - a2 => x = a1 + a2
        const total = m1 * x + a1; // to ensure it's a valid angle < 180
        
        const q = `Two parallel lines are cut by a transversal. A pair of alternate interior angles are $( ${m1}x + ${a1} )°$ and $( ${m2}x - ${a2} )°$. Find the value of $x$.`;
        const ans = `$${x}$`;
        const options = [`$${x}$`, `$${x + 5}$`, `$${x - 10}$`, `$${x + 10}$`];
        shuffle(options);
        return {
            question: q,
            options,
            correct: options.indexOf(ans),
            explanation: `Alternate interior angles are equal. So, $${m1}x + ${a1} = ${m2}x - ${a2}$. Solving for $x$, we get $x = ${a1} + ${a2} = ${x}$.`
        };
    } else {
        // Multi-angle finding
        // Given one angle, find another remotely.
        const a = getRandomInt(50, 130);
        const supp = 180 - a;
        const q = `In a given figure, a transversal cuts two parallel lines. If angle 1 is $${a}°$, what is the measure of the angle vertically opposite to its corresponding angle?`;
        // Angle 1's corresponding angle is a. Vertically opposite to that is also a.
        const ans = `$${a}°$`;
        const options = [`$${a}°$`, `$${supp}°$`, `$${a / 2}°$`, `$90°$`];
        shuffle(options);
        return {
            question: q,
            options,
            correct: options.indexOf(ans),
            explanation: `The corresponding angle to $${a}°$ is $${a}°$. The vertically opposite angle to that corresponding angle is also $${a}°$.`
        };
    }
};

export const generateApplicationsQuestions = () => generateUniqueQuestions(_generateApplicationsQuestion, 10);

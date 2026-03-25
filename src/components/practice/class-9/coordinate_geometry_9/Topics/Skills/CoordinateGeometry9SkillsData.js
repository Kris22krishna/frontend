/**
 * CoordinateGeometry9SkillsData.js
 * Generators for 4 distinct Coordinate Geometry skills:
 * 1. Identifying Quadrants & Axes
 * 2. Reading Coordinates
 * 3. Plotting Points
 * 4. Distance & Reflections
 */

function R(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Ensure non-zero random
function nonZeroR(min, max) {
    let val = 0;
    while (val === 0) {
        val = R(min, max);
    }
    return val;
}

// ─── 1. Identifying Quadrants & Axes ─────────────────────────────────────────
export function generateIdentifyQuestion() {
    const type = R(1, 3); // 1: Pure quadrant, 2: On Axes, 3: Reverse (Given quadrant, find signs)
    
    if (type === 1) {
        // Pure Quadrant
        const x = nonZeroR(-9, 9);
        const y = nonZeroR(-9, 9);
        const q = (x > 0 && y > 0) ? 0 : (x < 0 && y > 0) ? 1 : (x < 0 && y < 0) ? 2 : 3;
        return {
            type: 'mcq',
            question: `In which quadrant does the point $(${x}, ${y})$ lie?`,
            options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
            correct: q,
            explanation: `The x-coordinate is ${x > 0 ? 'positive' : 'negative'} and the y-coordinate is ${y > 0 ? 'positive' : 'negative'}. This corresponds to Quadrant ${['I', 'II', 'III', 'IV'][q]}.`
        };
    } else if (type === 2) {
        // On Axes
        const isXAxis = Math.random() < 0.5;
        const val = nonZeroR(-9, 9);
        const x = isXAxis ? val : 0;
        const y = isXAxis ? 0 : val;
        
        let correct;
        if (isXAxis) correct = val > 0 ? 0 : 1; // Pos X, Neg X
        else correct = val > 0 ? 2 : 3;         // Pos Y, Neg Y

        return {
            type: 'mcq',
            question: `Where does the point $(${x}, ${y})$ lie?`,
            options: ['Positive X-axis', 'Negative X-axis', 'Positive Y-axis', 'Negative Y-axis'],
            correct: correct,
            explanation: `Since ${isXAxis ? `y = 0` : `x = 0`}, the point lies on the ${isXAxis ? 'X-axis' : 'Y-axis'}. Since the non-zero value is ${val}, it is on the ${val > 0 ? 'positive' : 'negative'} side.`
        };
    } else {
        // Reverse
        const q = R(0, 3);
        const labels = ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'];
        const signs = [
            ['$(-, +)$', '$(+, -)$', '$(+, +)$', '$(-, -)$'], // Q1 correct is 2
            ['$(+, +)$', '$(-, +)$', '$(-, -)$', '$(+, -)$'], // Q2 correct is 1
            ['$(+, -)$', '$(-, +)$', '$(-, -)$', '$(+, +)$'], // Q3 correct is 2
            ['$(-, -)$', '$(+, -)$', '$(+, +)$', '$(-, +)$'], // Q4 correct is 1
        ];
        const correctIdxs = [2, 1, 2, 1];

        return {
            type: 'mcq',
            question: `Which of the following describes the signs of the coordinates for a point in ${labels[q]}?`,
            options: signs[q],
            correct: correctIdxs[q],
            explanation: `${labels[q]} is defined by ${
                q === 0 ? 'positive $x$ and positive $y$' :
                q === 1 ? 'negative $x$ and positive $y$' :
                q === 2 ? 'negative $x$ and negative $y$' :
                          'positive $x$ and negative $y$'
            }.`
        };
    }
}

// ─── 2. Reading Coordinates ──────────────────────────────────────────────────
export function generateReadingQuestion() {
    const x = R(-9, 9);
    const y = R(-9, 9);
    
    // Generate 3 wrong options that look plausible
    const wrong1 = { x: y, y: x }; // swapped
    const wrong2 = { x: -x, y: y }; // x flipped
    const wrong3 = { x: x, y: -y }; // y flipped
    // Fallbacks if x=y or x=0
    if (x === y) wrong1.x += 1;
    if (x === 0) wrong2.x = 2;
    if (y === 0) wrong3.y = 2;

    const allOpts = [
        { x, y }, wrong1, wrong2, wrong3
    ];
    // Shuffle options
    const shuffled = allOpts.map(value => ({ value, sort: Math.random() }))
                            .sort((a, b) => a.sort - b.sort)
                            .map(({ value }) => value);
    
    const correctIdx = shuffled.findIndex(opt => opt.x === x && opt.y === y);

    return {
        type: 'mcq_graph',
        question: `What are the correct coordinates of point P shown on the graph?`,
        graphPoint: { x, y, label: `P`, color: '#3b82f6' },
        options: shuffled.map(opt => `$(${opt.x}, ${opt.y})$`),
        correct: correctIdx,
        explanation: `To find the coordinates, look straight down/up to the X-axis to find $x = ${x}$, and look straight across to the Y-axis to find $y = ${y}$. Thus, $(${x}, ${y})$.`
    };
}

// ─── 3. Plotting Points ──────────────────────────────────────────────────────
export function generatePlottingQuestion() {
    const x = R(-9, 9);
    const y = R(-9, 9);
    
    return {
        type: 'plot',
        question: `Plot the point $P(${x}, ${y})$ on the coordinate plane.`,
        correctPoint: { x, y },
        explanation: `Start at $(0,0)$. Move ${Math.abs(x)} units ${x < 0 ? 'left' : 'right'} along the X-axis, then move ${Math.abs(y)} units ${y < 0 ? 'down' : 'up'} parallel to the Y-axis.`
    };
}

// ─── 4. Distance & Reflections ───────────────────────────────────────────────
export function generateDistanceQuestion() {
    const type = R(1, 3); // 1: Dist from X, 2: Dist from Y, 3: Reflection
    
    const x = nonZeroR(-9, 9);
    const y = nonZeroR(-9, 9);

    if (type === 1) {
        // Distance from X-axis
        const dist = Math.abs(y);
        const options = [
            `$${Math.abs(x)}$ units`, 
            `$${x}$ units`, 
            `$${Math.abs(y)}$ units`, 
            `$${y}$ units`
        ];
        // Ensure unique options
        const uniqueOpts = Array.from(new Set(options));
        while (uniqueOpts.length < 4) {
            const r = R(1, 15);
            if (!uniqueOpts.includes(`$${r}$ units`)) uniqueOpts.push(`$${r}$ units`);
        }
        
        // Shuffle
        const shuffled = uniqueOpts.slice(0, 4).sort(() => Math.random() - 0.5);
        const correctIdx = shuffled.indexOf(`$${dist}$ units`);

        return {
            type: 'mcq',
            question: `What is the perpendicular distance of the point $(${x}, ${y})$ from the X-axis?`,
            options: shuffled,
            correct: correctIdx,
            explanation: `The perpendicular distance from the X-axis is simply the absolute value of the y-coordinate. $|${y}| = ${dist}$ units.`
        };
    } else if (type === 2) {
        // Distance from Y-axis
        const dist = Math.abs(x);
        const options = [
            `$${Math.abs(y)}$ units`, 
            `$${y}$ units`, 
            `$${Math.abs(x)}$ units`, 
            `$${x}$ units`
        ];
        const uniqueOpts = Array.from(new Set(options));
        while (uniqueOpts.length < 4) {
            const r = R(1, 15);
            if (!uniqueOpts.includes(`$${r}$ units`)) uniqueOpts.push(`$${r}$ units`);
        }
        const shuffled = uniqueOpts.slice(0, 4).sort(() => Math.random() - 0.5);
        const correctIdx = shuffled.indexOf(`$${dist}$ units`);

        return {
            type: 'mcq',
            question: `What is the perpendicular distance of the point $(${x}, ${y})$ from the Y-axis?`,
            options: shuffled,
            correct: correctIdx,
            explanation: `The perpendicular distance from the Y-axis is simply the absolute value of the x-coordinate. $|${x}| = ${dist}$ units.`
        };
    } else {
        // Reflection
        const axis = Math.random() < 0.5 ? 'X-axis' : 'Y-axis';
        const newX = axis === 'Y-axis' ? -x : x;
        const newY = axis === 'X-axis' ? -y : y;

        const allOpts = [
            { x: newX, y: newY },
            { x: -x, y: -y }, // Origin reflection
            { x: x, y: y }, // No reflection
            { x: y, y: x }  // y=x reflection
        ];
        
        // Ensure unique
        const uniqueStr = Array.from(new Set(allOpts.map(p => `$(${p.x}, ${p.y})$`)));
        while (uniqueStr.length < 4) {
            const rx = R(-9, 9);
            const ry = R(-9, 9);
            const str = `$(${rx}, ${ry})$`;
            if (!uniqueStr.includes(str)) uniqueStr.push(str);
        }

        const shuffled = uniqueStr.slice(0, 4).sort(() => Math.random() - 0.5);
        const correctStr = `$(${newX}, ${newY})$`;
        const correctIdx = shuffled.indexOf(correctStr);

        return {
            type: 'mcq',
            question: `What are the coordinates of the point $(${x}, ${y})$ when reflected across the ${axis}?`,
            options: shuffled,
            correct: correctIdx,
            explanation: `When reflecting across the ${axis}, the ${axis === 'X-axis' ? 'y-coordinate' : 'x-coordinate'} changes sign. Thus $(${x}, ${y}) \\to ${correctStr}$.`
        };
    }
}

// ─── POOL EXPORTERS ──────────────────────────────────────────────────────────
function poolBuilder(generatorFn, size = 60) {
    return () => {
        const pool = [];
        for (let i = 0; i < size; i++) {
            pool.push(generatorFn());
        }
        return pool;
    };
}

export const buildIdentifyPracticePool = poolBuilder(generateIdentifyQuestion, 50);
export const buildIdentifyAssessmentPool = poolBuilder(generateIdentifyQuestion, 50);

export const buildReadingPracticePool = poolBuilder(generateReadingQuestion, 50);
export const buildReadingAssessmentPool = poolBuilder(generateReadingQuestion, 50);

export const buildPlottingPracticePool = poolBuilder(generatePlottingQuestion, 50);
export const buildPlottingAssessmentPool = poolBuilder(generatePlottingQuestion, 50);

export const buildDistancePracticePool = poolBuilder(generateDistanceQuestion, 50);
export const buildDistanceAssessmentPool = poolBuilder(generateDistanceQuestion, 50);

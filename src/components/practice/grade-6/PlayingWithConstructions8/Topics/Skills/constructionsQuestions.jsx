// Dynamic generation logic for Playing With Constructions Practice & Assessment
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleOptions = (optionsArr) => {
    const withIndices = optionsArr.map((v, i) => ({ v: String(v), isCorrect: i === 0 }));
    for (let i = withIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [withIndices[i], withIndices[j]] = [withIndices[j], withIndices[i]];
    }
    const rightIndex = withIndices.findIndex(x => x.isCorrect);
    return { options: withIndices.map(x => x.v), correctIndex: rightIndex };
};

// Generate a dynamic SVG circle diagram
const circleWithRadius = (r, cx = 100, cy = 100) => {
    return `<svg viewBox="0 0 200 200" width="200" height="200" style="max-width:200px;display:block;margin:0 auto;">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
        <circle cx="${cx}" cy="${cy}" r="3" fill="#0ea5e9"/>
        <line x1="${cx}" y1="${cy}" x2="${cx+r}" y2="${cy}" stroke="#ef4444" stroke-width="2"/>
        <text x="${cx+r/2}" y="${cy-6}" text-anchor="middle" font-size="13" fill="#ef4444" font-weight="800">${r} units</text>
        <text x="${cx+6}" y="${cy+14}" font-size="11" fill="#0ea5e9" font-weight="700">P</text>
    </svg>`;
};

// Generate rectangle SVG
const rectSVG = (w, h, ox = 20, oy = 20) => {
    return `<svg viewBox="0 0 ${w+40} ${h+50}" width="${Math.min(280, w+40)}" height="${Math.min(180, h+50)}" style="max-width:${Math.min(280, w+40)}px;display:block;margin:0 auto;">
        <rect x="${ox}" y="${oy}" width="${w}" height="${h}" fill="#ecfdf5" stroke="#10b981" stroke-width="2" rx="2"/>
        <text x="${ox+w/2}" y="${oy-5}" text-anchor="middle" font-size="12" fill="#10b981" font-weight="700">${w/10} cm</text>
        <text x="${ox+w/2}" y="${oy+h+15}" text-anchor="middle" font-size="12" fill="#10b981" font-weight="700">${w/10} cm</text>
        <text x="${ox-5}" y="${oy+h/2+4}" text-anchor="end" font-size="12" fill="#10b981" font-weight="700">${h/10} cm</text>
        <rect x="${ox+2}" y="${oy+2}" width="8" height="8" fill="none" stroke="#10b981" stroke-width="1.5"/>
        <rect x="${ox+w-10}" y="${oy+2}" width="8" height="8" fill="none" stroke="#10b981" stroke-width="1.5"/>
        <rect x="${ox+w-10}" y="${oy+h-10}" width="8" height="8" fill="none" stroke="#10b981" stroke-width="1.5"/>
        <rect x="${ox+2}" y="${oy+h-10}" width="8" height="8" fill="none" stroke="#10b981" stroke-width="1.5"/>
    </svg>`;
};

export const generateConstructionQuestions = (skillId, count = 20) => {
    const questions = [];

    for (let i = 0; i < count; i++) {
        let q = { id: `skill-${skillId}-${Date.now()}-${i}`, skill: skillId };

        if (skillId === 'circles-compass') {
            const subType = randInt(0, 3);

            if (subType === 0) {
                // Radius identification
                const r = randInt(2, 12);
                q.question = `A compass is opened to ${r} cm and a circle is drawn. What is the radius of the circle?`;
                q.svg = circleWithRadius(r * 5);
                const { options, correctIndex } = shuffleOptions([
                    `${r} cm`,
                    `${r * 2} cm`,
                    `${r + 1} cm`,
                    `${r - 1 < 1 ? r + 2 : r - 1} cm`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `The compass opening equals the radius. So the radius is **${r} cm**.`;
            } else if (subType === 1) {
                // Distance from center
                const r = randInt(3, 10);
                q.question = `A circle has a radius of ${r} cm. What is the distance from the centre to ANY point on the circle?`;
                q.svg = circleWithRadius(r * 5);
                const { options, correctIndex } = shuffleOptions([
                    `${r} cm`,
                    `${r * 2} cm`,
                    `${r / 2} cm`,
                    `${r + 3} cm`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Every point on a circle is at a distance equal to the **radius (${r} cm)** from the centre.`;
            } else if (subType === 2) {
                // Mark all points at distance d
                const d = randInt(3, 8);
                q.question = `If you mark ALL points that are exactly ${d} cm away from a fixed point P, what shape do you get?`;
                q.svg = '';
                const { options, correctIndex } = shuffleOptions([
                    'A circle',
                    'A square',
                    'A straight line',
                    'A triangle'
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `All points at the same distance from a fixed point form a **circle** with that point as the centre.`;
            } else {
                // Wavy wave question
                const totalLen = randInt(6, 12);
                const numWaves = randInt(2, 6);
                q.question = `A wavy wave is drawn on a line segment of length ${totalLen} cm using ${numWaves} identical semicircles. What is the radius of each semicircle?`;
                q.svg = '';
                const waveLen = totalLen / numWaves;
                const radius = waveLen / 2;
                const { options, correctIndex } = shuffleOptions([
                    `${radius} cm`,
                    `${waveLen} cm`,
                    `${totalLen / 2} cm`,
                    `${radius + 1} cm`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Each semicircle spans ${waveLen} cm of the line. The diameter = ${waveLen} cm, so the radius = **${radius} cm**.`;
            }
        }
        else if (skillId === 'squares-rectangles') {
            const subType = randInt(0, 3);

            if (subType === 0) {
                // Identify square vs rectangle
                const isSquare = Math.random() > 0.5;
                const side = randInt(3, 10);
                const w = isSquare ? side : side + randInt(2, 5);
                q.question = `A 4-sided figure has all angles = 90°. Its sides measure ${side} cm, ${w} cm, ${side} cm, and ${w} cm. Is it a square or a rectangle?`;
                q.svg = rectSVG(w * 10, side * 10);
                const correct = isSquare ? 'Square (all sides equal)' : 'Rectangle (opposite sides equal)';
                const wrong = isSquare ? 'Rectangle (opposite sides equal)' : 'Square (all sides equal)';
                const { options, correctIndex } = shuffleOptions([
                    correct, wrong, 'Parallelogram', 'Rhombus'
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = isSquare
                    ? `Since all four sides are **${side} cm** and all angles are 90°, this is a **square**.`
                    : `Since opposite sides are equal (${side} cm and ${w} cm) and all angles are 90°, this is a **rectangle**.`;
            } else if (subType === 1) {
                // Naming convention
                const names = [['PQRS', true], ['PRQS', false], ['SRQP', true], ['PQSR', false]];
                const pick = names[randInt(0, 3)];
                q.question = `Is "${pick[0]}" a valid name for a rectangle whose corners, going around, are P, Q, R, S?`;
                q.svg = '';
                const { options, correctIndex } = shuffleOptions([
                    pick[1] ? 'Yes, it follows the traversal order' : 'No, corners must follow traversal order',
                    pick[1] ? 'No, the order is wrong' : 'Yes, it is valid',
                    'Only if it is a square',
                    'Names don\'t matter'
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = pick[1]
                    ? `"${pick[0]}" is valid because the corners appear in a **continuous traversal order** around the rectangle.`
                    : `"${pick[0]}" is NOT valid because the corners do NOT follow a **continuous traversal order** around the rectangle.`;
            } else if (subType === 2) {
                // Rotated square
                q.question = 'If a square is rotated by 45°, does it remain a square?';
                q.svg = `<svg viewBox="0 0 160 160" width="160" height="160" style="max-width:160px;display:block;margin:0 auto;">
                    <rect x="40" y="40" width="80" height="80" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" transform="rotate(45,80,80)"/>
                    <circle cx="80" cy="80" r="2" fill="#3b82f6"/>
                </svg>`;
                const { options, correctIndex } = shuffleOptions([
                    'Yes — rotation does not change side lengths or angles',
                    'No — the angles change',
                    'No — the sides become unequal',
                    'It becomes a diamond'
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Rotating a square doesn't change its properties. All sides remain equal and all angles remain **90°**, so it is still a **square**.`;
            } else {
                // Rectangle divided into squares
                const n = randInt(2, 5);
                const side = randInt(3, 6);
                const length = side * n;
                q.question = `A rectangle has length ${length} cm and breadth ${side} cm. How many identical squares of side ${side} cm can it be divided into?`;
                q.svg = rectSVG(length * 10, side * 10);
                const { options, correctIndex } = shuffleOptions([
                    `${n}`, `${n + 1}`, `${n - 1 < 1 ? n + 2 : n - 1}`, `${n * 2}`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Length ÷ Breadth = ${length} ÷ ${side} = **${n}** identical squares.`;
            }
        }
        else if (skillId === 'construction-steps') {
            const subType = randInt(0, 3);

            if (subType === 0) {
                // Construction order: rectangle
                q.question = 'What is the FIRST step when constructing a rectangle with given side lengths?';
                q.svg = '';
                const { options, correctIndex } = shuffleOptions([
                    'Draw the base line with the given length',
                    'Draw the diagonals',
                    'Draw a circle',
                    'Mark the centre point'
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `The first step is to draw the **base line (e.g., PQ)** with the given measurement using a ruler.`;
            } else if (subType === 1) {
                // Side + diagonal construction
                const side = randInt(3, 7);
                const diag = side + randInt(2, 5);
                q.question = `You need to construct a rectangle with one side = ${side} cm and diagonal = ${diag} cm. After drawing the base and a perpendicular, how do you locate the next corner?`;
                q.svg = '';
                const { options, correctIndex } = shuffleOptions([
                    `Draw an arc of radius ${diag} cm from the base corner to intersect the perpendicular`,
                    `Measure ${diag} cm along the base`,
                    `Draw a full circle of radius ${side} cm`,
                    `Guess the position`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Draw an arc of radius **${diag} cm** (the diagonal length) from one base corner. Where it crosses the perpendicular line is the next corner!`;
            } else if (subType === 2) {
                // 4-sided figure all angles 90 but opposite sides not equal — possible?
                q.question = 'Is it possible to construct a 4-sided figure where all angles are 90° but opposite sides are NOT equal?';
                q.svg = '';
                const { options, correctIndex } = shuffleOptions([
                    'No, it is impossible',
                    'Yes, it is always possible',
                    'Only if it has 5 sides',
                    'Only with a compass'
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `It is **impossible**. If all four angles are 90°, the opposite sides MUST be equal — the figure will always be a rectangle.`;
            } else {
                // Square construction from side length
                const s = randInt(4, 9);
                q.question = `To construct a square PQRS of side ${s} cm, after drawing PQ = ${s} cm and a perpendicular at P, what length should PS be?`;
                q.svg = '';
                const { options, correctIndex } = shuffleOptions([
                    `${s} cm`,
                    `${s * 2} cm`,
                    `${s / 2} cm`,
                    `${s + 2} cm`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `In a square, all sides are equal. So PS must also be **${s} cm**.`;
            }
        }
        else if (skillId === 'diagonals-arcs') {
            const subType = randInt(0, 3);

            if (subType === 0) {
                // Diagonals of rectangle
                q.question = 'In a rectangle, the two diagonals are always:';
                q.svg = '';
                const { options, correctIndex } = shuffleOptions([
                    'Equal in length',
                    'Perpendicular to each other',
                    'Of different lengths',
                    'Parallel'
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `The diagonals of a rectangle are always **equal in length**. They bisect each other but are NOT perpendicular (unless it is a square).`;
            } else if (subType === 1) {
                // When diagonal splits angles equally
                q.question = 'For which special rectangle does a diagonal divide the opposite angles into TWO equal parts?';
                q.svg = '';
                const { options, correctIndex } = shuffleOptions([
                    'When the rectangle is a square',
                    'When the length is double the breadth',
                    'When the diagonal equals a side',
                    'Never'
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Only when the rectangle becomes a **square** (all sides equal) does the diagonal divide each corner angle into two equal 45° angles.`;
            } else if (subType === 2) {
                // Diagonal angle split
                const angle1 = randInt(20, 45);
                const angle2 = 90 - angle1;
                q.question = `In rectangle ABCD, the diagonal divides angle A into ${angle1}° and ${angle2}°. What does each angle of the rectangle measure?`;
                q.svg = '';
                const { options, correctIndex } = shuffleOptions([
                    `90°`,
                    `${angle1 + angle2 + 10}°`,
                    `${angle1}°`,
                    `${angle2}°`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Each angle of a rectangle is always **90°**. The diagonal simply splits this 90° into ${angle1}° and ${angle2}° parts.`;
            } else {
                // Equidistant point via arcs (House)
                const dist = randInt(4, 8);
                q.question = `To find point A that is ${dist} cm from both B and C, you draw arcs of radius ${dist} cm centred at B and C. Where is point A?`;
                q.svg = '';
                const { options, correctIndex } = shuffleOptions([
                    'At the intersection of the two arcs',
                    'At the midpoint of BC',
                    'At the centre of the base',
                    'There is no such point'
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Point A lies at the **intersection** of the two arcs, because that intersection point is exactly ${dist} cm from both B and C.`;
            }
        }

        questions.push(q);
    }

    return questions;
};

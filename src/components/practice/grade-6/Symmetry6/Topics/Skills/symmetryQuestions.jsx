// Dynamic question generation for Symmetry Practice & Assessment
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const shuffleOptions = (optionsArr) => {
    const withIndices = optionsArr.map((v, i) => ({ v: String(v), isCorrect: i === 0 }));
    for (let i = withIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [withIndices[i], withIndices[j]] = [withIndices[j], withIndices[i]];
    }
    const rightIndex = withIndices.findIndex(x => x.isCorrect);
    return { options: withIndices.map(x => x.v), correctIndex: rightIndex };
};

// SVG generators
const polygonSVG = (sides, name, color = '#3b82f6') => {
    const cx = 150, cy = 100, r = 70;
    const pts = Array.from({ length: sides }, (_, i) => {
        const a = (i * 360 / sides - 90) * Math.PI / 180;
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(' ');
    return `<svg viewBox="0 0 300 200" width="100%" style="height:auto;max-width:300px;display:block;margin:0 auto;background:#f0f9ff;border-radius:16px;">
        <polygon points="${pts}" fill="${color}20" stroke="${color}" stroke-width="2.5" />
        <text x="150" y="190" text-anchor="middle" font-size="13" fill="${color}" font-weight="800">${name}</text>
    </svg>`;
};

const shapeSVG = (type) => {
    if (type === 'square') return polygonSVG(4, 'Square', '#3b82f6');
    if (type === 'triangle') return polygonSVG(3, 'Equilateral Triangle', '#10b981');
    if (type === 'hexagon') return polygonSVG(6, 'Regular Hexagon', '#f59e0b');
    if (type === 'pentagon') return polygonSVG(5, 'Regular Pentagon', '#8b5cf6');
    if (type === 'octagon') return polygonSVG(8, 'Regular Octagon', '#ec4899');
    return '';
};

// ═══════════════════════════════════════════
// LINE SYMMETRY generators
// ═══════════════════════════════════════════
const lineSymmetryGenerators = [
    // Lines of symmetry of regular polygon
    () => {
        const shapes = [
            { name: 'equilateral triangle', sides: 3, lines: 3, type: 'triangle' },
            { name: 'square', sides: 4, lines: 4, type: 'square' },
            { name: 'regular pentagon', sides: 5, lines: 5, type: 'pentagon' },
            { name: 'regular hexagon', sides: 6, lines: 6, type: 'hexagon' },
            { name: 'regular octagon', sides: 8, lines: 8, type: 'octagon' },
        ];
        const s = pick(shapes);
        const { options, correctIndex } = shuffleOptions([`${s.lines}`, `${s.lines + 1}`, `${s.lines - 1}`, `${s.lines * 2}`]);
        return { question: `How many lines of symmetry does a **${s.name}** have?`, svg: shapeSVG(s.type), options, correct: correctIndex, explanation: `A ${s.name} has **${s.lines}** lines of symmetry — equal to the number of its sides.` };
    },
    // Rectangle diagonal NOT a line of symmetry
    () => {
        const { options, correctIndex } = shuffleOptions(['No, the halves do not overlap', 'Yes, it divides it equally', 'Only if it is a square', 'Only the longer diagonal']);
        return { question: `Is the diagonal of a rectangle (that is NOT a square) a line of symmetry?`, svg: `<svg viewBox="0 0 300 180" width="100%" style="height:auto;max-width:300px;display:block;margin:0 auto;background:#fef2f2;border-radius:16px;"><rect x="50" y="30" width="200" height="120" fill="#fee2e2" stroke="#ef4444" stroke-width="2" rx="3"/><line x1="50" y1="30" x2="250" y2="150" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4"/><text x="150" y="175" text-anchor="middle" font-size="12" fill="#ef4444" font-weight="700">Diagonal ≠ Line of Symmetry</text></svg>`, options, correct: correctIndex, explanation: `**No.** When you fold a rectangle along its diagonal, the two halves do NOT overlap. Only vertical and horizontal center lines are lines of symmetry for a rectangle.` };
    },
    // Circle lines of symmetry
    () => {
        const { options, correctIndex } = shuffleOptions(['Infinitely many', '4', '8', '360']);
        return { question: `How many lines of symmetry does a **circle** have?`, svg: `<svg viewBox="0 0 240 240" width="100%" style="height:auto;max-width:220px;display:block;margin:0 auto;background:#ede9fe;border-radius:16px;"><circle cx="120" cy="120" r="80" fill="#ddd6fe" stroke="#6366f1" stroke-width="2.5" fill-opacity="0.4"/><line x1="120" y1="40" x2="120" y2="200" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,3"/><line x1="40" y1="120" x2="200" y2="120" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,3"/><line x1="63" y1="63" x2="177" y2="177" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3"/><circle cx="120" cy="120" r="4" fill="#6366f1"/></svg>`, options, correct: correctIndex, explanation: `A circle has **infinitely many** lines of symmetry — every diameter is a line of symmetry!` };
    },
    // Identify which figure has NO line of symmetry
    () => {
        const { options, correctIndex } = shuffleOptions(['Parallelogram (not rectangle)', 'Square', 'Equilateral Triangle', 'Circle']);
        return { question: `Which of these figures has **NO** line of symmetry?`, svg: '', options, correct: correctIndex, explanation: `A **parallelogram** (that is not a rectangle or rhombus) has no line of symmetry. It has rotational symmetry but no reflection symmetry.` };
    },
    // How many lines for a specific letter
    () => {
        const letters = [
            { l: 'A', lines: 1 }, { l: 'H', lines: 2 }, { l: 'O', lines: 2 }, { l: 'X', lines: 4 }, { l: 'B', lines: 1 },
        ];
        const lt = pick(letters);
        const { options, correctIndex } = shuffleOptions([`${lt.lines}`, `${lt.lines + 1}`, `0`, `${lt.lines + 2}`]);
        return { question: `How many lines of symmetry does the letter **"${lt.l}"** have?`, svg: `<svg viewBox="0 0 200 150" width="100%" style="height:auto;max-width:200px;display:block;margin:0 auto;background:#fef3c7;border-radius:16px;"><text x="100" y="105" text-anchor="middle" font-size="80" fill="#f59e0b" font-weight="900" font-family="Arial">${lt.l}</text></svg>`, options, correct: correctIndex, explanation: `The letter **"${lt.l}"** has **${lt.lines}** line(s) of symmetry.` };
    },
    // Isosceles triangle
    () => {
        const { options, correctIndex } = shuffleOptions(['1', '2', '3', '0']);
        return { question: `How many lines of symmetry does an **isosceles triangle** have?`, svg: `<svg viewBox="0 0 240 180" width="100%" style="height:auto;max-width:240px;display:block;margin:0 auto;background:#f0fdf4;border-radius:16px;"><polygon points="120,25 60,155 180,155" fill="#dcfce7" stroke="#10b981" stroke-width="2.5"/><line x1="120" y1="20" x2="120" y2="160" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,3"/></svg>`, options, correct: correctIndex, explanation: `An isosceles triangle has exactly **1** line of symmetry — the vertical line through the apex to the midpoint of the base.` };
    },
    // Interactive: Isosceles Triangle
    () => {
        return {
            type: 'interactive-draw',
            subType: 'draw-lines-of-symmetry',
            question: `Use the grid to draw ALL lines of symmetry for this **isosceles triangle**.\nHint: There may be more than one line of symmetry!`,
            polygonData: [{x:10, y:2}, {x:4, y:16}, {x:16, y:16}],
            targetLines: [ { p1: {x:10, y:2}, p2: {x:10, y:16} } ],
            explanation: `An isosceles triangle only has **1** line of symmetry splitting it strictly down the middle vertically.`
        };
    },
    // Interactive: Rectangle
    () => {
        return {
            type: 'interactive-draw',
            subType: 'draw-lines-of-symmetry',
            question: `Use the grid to draw ALL lines of symmetry for this **rectangle**.\nHint: There may be more than one line of symmetry!`,
            polygonData: [{x:4,y:4}, {x:16,y:4}, {x:16,y:12}, {x:4,y:12}],
            targetLines: [ 
                { p1: {x:10, y:4}, p2: {x:10, y:12} }, // vertical
                { p1: {x:4, y:8}, p2: {x:16, y:8} }    // horizontal
            ],
            explanation: `A rectangle has **2** lines of symmetry — one vertical and one horizontal bisector.`
        };
    },
    // Interactive: Kite
    () => {
        return {
            type: 'interactive-draw',
            subType: 'draw-lines-of-symmetry',
            question: `Use the grid to draw ALL lines of symmetry for this **kite** shape.\nHint: There may be more than one line of symmetry!`,
            polygonData: [{x:10,y:2}, {x:16,y:8}, {x:10,y:18}, {x:4,y:8}],
            targetLines: [ { p1: {x:10, y:2}, p2: {x:10, y:18} } ],
            explanation: `A kite has only **1** line of symmetry passing through its longer diagonal axis.`
        };
    },
    // Interactive: Cross
    () => {
        return {
            type: 'interactive-draw',
            subType: 'draw-lines-of-symmetry',
            question: `Use the grid to draw ALL lines of symmetry for this **cross** (plus sign).\nHint: There may be more than one line of symmetry!`,
            polygonData: [
                {x:8,y:2}, {x:12,y:2}, {x:12,y:8}, {x:18,y:8}, 
                {x:18,y:12}, {x:12,y:12}, {x:12,y:18}, {x:8,y:18}, 
                {x:8,y:12}, {x:2,y:12}, {x:2,y:8}, {x:8,y:8}
            ],
            targetLines: [ 
                { p1: {x:10,y:2}, p2: {x:10,y:18} }, // vertical
                { p1: {x:2,y:10}, p2: {x:18,y:10} }, // horizontal
                { p1: {x:2,y:2}, p2: {x:18,y:18} },  // diagonal \
                { p1: {x:2,y:18}, p2: {x:18,y:2} }   // diagonal /
            ],
            explanation: `A symmetrical cross shape (like a plus sign) has **4** lines of symmetry: vertical, horizontal, AND two diagonals!`
        };
    },
];

// ═══════════════════════════════════════════
// ROTATIONAL SYMMETRY generators
// ═══════════════════════════════════════════
const rotationalSymmetryGenerators = [
    // Order of rotational symmetry
    () => {
        const shapes = [
            { name: 'equilateral triangle', order: 3 },
            { name: 'square', order: 4 },
            { name: 'regular pentagon', order: 5 },
            { name: 'regular hexagon', order: 6 },
        ];
        const s = pick(shapes);
        const { options, correctIndex } = shuffleOptions([`${s.order}`, `${s.order + 1}`, `${s.order - 1}`, `${s.order * 2}`]);
        return { question: `What is the **order of rotational symmetry** of a ${s.name}?`, svg: shapeSVG(s.name.includes('tri') ? 'triangle' : s.name.includes('sq') ? 'square' : s.name.includes('pent') ? 'pentagon' : 'hexagon'), options, correct: correctIndex, explanation: `A ${s.name} has order **${s.order}** — it maps onto itself ${s.order} times in a full 360° rotation.` };
    },
    // Smallest angle of symmetry
    () => {
        const n = pick([3, 4, 5, 6, 8]);
        const angle = 360 / n;
        const { options, correctIndex } = shuffleOptions([`${angle}°`, `${angle + 10}°`, `${angle - 10}°`, `180°`]);
        return { question: `A figure has **${n}** angles of symmetry. What is its smallest angle of symmetry?`, svg: '', options, correct: correctIndex, explanation: `Smallest angle = 360° ÷ ${n} = **${angle}°**. All other angles are multiples of this.` };
    },
    // List all angles given smallest
    () => {
        const smallest = pick([60, 72, 90, 120]);
        const count = 360 / smallest;
        const allAngles = Array.from({ length: count }, (_, i) => `${smallest * (i + 1)}°`).join(', ');
        const { options, correctIndex } = shuffleOptions([allAngles, `${smallest}°, 360°`, `${smallest}°, ${smallest * 3}°, 360°`, `180°, 360°`]);
        return { question: `The smallest angle of symmetry is **${smallest}°**. List ALL angles of symmetry.`, svg: '', options, correct: correctIndex, explanation: `All angles are multiples of ${smallest}°: **${allAngles}**.` };
    },
    // Windmill angles
    () => {
        const blades = pick([3, 4, 5, 6]);
        const angle = 360 / blades;
        const { options, correctIndex } = shuffleOptions([`${angle}°`, `${angle * 2}°`, `90°`, `60°`]);
        return { question: `A windmill has **${blades}** identical blades equally spaced. What is its smallest angle of symmetry?`, svg: '', options, correct: correctIndex, explanation: `Smallest angle = 360° ÷ ${blades} = **${angle}°**.` };
    },
    // True/False: angles are always multiples
    () => {
        const { options, correctIndex } = shuffleOptions(['True', 'False']);
        return { question: `True or False: The angles of symmetry of any figure are always **multiples** of the smallest angle.`, svg: '', options, correct: correctIndex, explanation: `**True!** The angles of symmetry always form a sequence of multiples of the smallest angle.` };
    },
    // Can 17° be smallest angle?
    () => {
        const testAngle = pick([17, 25, 45, 15]);
        const isValid = 360 % testAngle === 0;
        const { options, correctIndex } = shuffleOptions([isValid ? 'Yes' : 'No', isValid ? 'No' : 'Yes']);
        return { question: `Can a figure have rotational symmetry with a smallest angle of **${testAngle}°**?`, svg: '', options, correct: correctIndex, explanation: isValid ? `**Yes**, because 360 is divisible by ${testAngle} (360 ÷ ${testAngle} = ${360 / testAngle}).` : `**No**, because 360 is NOT divisible by ${testAngle}. The smallest angle must be a factor of 360.` };
    },
];

// ═══════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════
export const generateSymmetryQuestions = (skillId, count = 20) => {
    const generators = skillId === 'line-symmetry' ? lineSymmetryGenerators : rotationalSymmetryGenerators;
    const questions = [];
    const usedTypes = new Set();

    for (let i = 0; i < count; i++) {
        if (usedTypes.size >= generators.length) usedTypes.clear();
        let genIdx;
        do { genIdx = randInt(0, generators.length - 1); } while (usedTypes.has(genIdx));
        usedTypes.add(genIdx);
        const generated = generators[genIdx]();
        questions.push({
            id: `${skillId}-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
            skill: skillId,
            ...generated
        });
    }
    return questions;
};

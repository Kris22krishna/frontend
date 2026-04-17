// Dynamic generation logic for Playing With Constructions Practice & Assessment
// FULLY randomized — zero repetition across sessions

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

// ═══════════════════════════════════════════
// LARGE, CLEAR SVG GENERATORS (NO ANSWER LEAKS)
// ═══════════════════════════════════════════

const circleSVG = (r, label = 'P', hideLabels = false) => {
    const pr = Math.min(r * 20, 120); // Dynamic responsive pixel radius
    const size = pr * 2 + 80;
    const cx = size / 2, cy = size / 2;
    return `<svg viewBox="0 0 ${size} ${size}" width="100%" style="height:auto;max-width:${Math.max(size, 250)}px; display:block;margin:0 auto;background:#f0f9ff;border-radius:16px;">
        <circle cx="${cx}" cy="${cy}" r="${pr}" fill="#dbeafe" stroke="#3b82f6" stroke-width="2.5" fill-opacity="0.4"/>
        <circle cx="${cx}" cy="${cy}" r="5" fill="#0ea5e9"/>
        <line x1="${cx}" y1="${cy}" x2="${cx + pr}" y2="${cy}" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6,3"/>
        ${!hideLabels ? `<text x="${cx + pr / 2}" y="${cy - 10}" text-anchor="middle" font-size="16" fill="#ef4444" font-weight="800" font-family="Outfit">${r} cm</text>` : `<text x="${cx + pr / 2}" y="${cy - 10}" text-anchor="middle" font-size="20" fill="#ef4444" font-weight="800" font-family="Outfit">?</text>`}
        <text x="${cx + 10}" y="${cy + 18}" font-size="15" fill="#0ea5e9" font-weight="900" font-family="Outfit">${label}</text>
    </svg>`;
};

const rectSVG = (w, h, labels = ['A', 'B', 'C', 'D'], hideLabels = false) => {
    const pw = Math.min(w * 20, 220), ph = Math.min(h * 20, 140);
    const ox = 50, oy = 30;
    const svgW = pw + 100, svgH = ph + 80;
    return `<svg viewBox="0 0 ${svgW} ${svgH}" width="100%" style="height:auto;max-width:340px; display:block;margin:0 auto;background:#f0fdf4;border-radius:16px;">
        <rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="#dcfce7" stroke="#10b981" stroke-width="2.5" rx="3" fill-opacity="0.5"/>
        <text x="${ox - 6}" y="${oy - 6}" font-size="15" fill="#10b981" font-weight="900">${labels[0]}</text>
        <text x="${ox + pw + 6}" y="${oy - 6}" font-size="15" fill="#10b981" font-weight="900">${labels[1]}</text>
        <text x="${ox + pw + 6}" y="${oy + ph + 18}" font-size="15" fill="#10b981" font-weight="900">${labels[2]}</text>
        <text x="${ox - 6}" y="${oy + ph + 18}" font-size="15" fill="#10b981" font-weight="900">${labels[3]}</text>
        ${!hideLabels ? `
            <text x="${ox + pw / 2}" y="${oy - 10}" text-anchor="middle" font-size="14" fill="#ec4899" font-weight="800">${w} cm</text>
            <text x="${ox + pw / 2}" y="${oy + ph + 20}" text-anchor="middle" font-size="14" fill="#ec4899" font-weight="800">${w} cm</text>
            <text x="${ox - 12}" y="${oy + ph / 2 + 5}" font-size="14" fill="#3b82f6" font-weight="800" transform="rotate(-90,${ox - 12},${oy + ph / 2 + 5})">${h} cm</text>
        ` : `
            <text x="${ox + pw / 2}" y="${oy - 10}" text-anchor="middle" font-size="18" fill="#ec4899" font-weight="800">?</text>
            <text x="${ox - 12}" y="${oy + ph / 2 + 5}" font-size="18" fill="#3b82f6" font-weight="800" transform="rotate(-90,${ox - 12},${oy + ph / 2 + 5})">?</text>
        `}
        <rect x="${ox + 3}" y="${oy + 3}" width="10" height="10" fill="none" stroke="#64748b" stroke-width="1.5"/>
        <rect x="${ox + pw - 13}" y="${oy + 3}" width="10" height="10" fill="none" stroke="#64748b" stroke-width="1.5"/>
        <rect x="${ox + pw - 13}" y="${oy + ph - 13}" width="10" height="10" fill="none" stroke="#64748b" stroke-width="1.5"/>
        <rect x="${ox + 3}" y="${oy + ph - 13}" width="10" height="10" fill="none" stroke="#64748b" stroke-width="1.5"/>
    </svg>`;
};

const squareSVG = (s, labels = ['P', 'Q', 'R', 'S'], hideLabels = false) => {
    const ps = Math.min(s * 22, 180);
    const ox = 60, oy = 30;
    return `<svg viewBox="0 0 ${ps + 120} ${ps + 80}" width="100%" style="height:auto;max-width:300px; display:block;margin:0 auto;background:#eff6ff;border-radius:16px;">
        <rect x="${ox}" y="${oy}" width="${ps}" height="${ps}" fill="#dbeafe" stroke="#3b82f6" stroke-width="2.5" rx="3" fill-opacity="0.4"/>
        <text x="${ox - 6}" y="${oy - 6}" font-size="15" fill="#3b82f6" font-weight="900">${labels[0]}</text>
        <text x="${ox + ps + 6}" y="${oy - 6}" font-size="15" fill="#3b82f6" font-weight="900">${labels[1]}</text>
        <text x="${ox + ps + 6}" y="${oy + ps + 18}" font-size="15" fill="#3b82f6" font-weight="900">${labels[2]}</text>
        <text x="${ox - 6}" y="${oy + ps + 18}" font-size="15" fill="#3b82f6" font-weight="900">${labels[3]}</text>
        ${!hideLabels ? `
            <text x="${ox + ps / 2}" y="${oy - 10}" text-anchor="middle" font-size="14" fill="#3b82f6" font-weight="800">${s} cm</text>
            <text x="${ox + ps + 16}" y="${oy + ps / 2 + 5}" font-size="14" fill="#3b82f6" font-weight="800">${s} cm</text>
        ` : `
            <text x="${ox + ps / 2}" y="${oy - 10}" text-anchor="middle" font-size="18" fill="#3b82f6" font-weight="800">?</text>
        `}
        <rect x="${ox + 3}" y="${oy + 3}" width="10" height="10" fill="none" stroke="#64748b" stroke-width="1.5"/>
        <rect x="${ox + ps - 13}" y="${oy + 3}" width="10" height="10" fill="none" stroke="#64748b" stroke-width="1.5"/>
    </svg>`;
};

const wavySVG = (numW, totalLen, hideLabels = false) => {
    const w = 300, h = 100, lineY = 50;
    const waveW = (w - 20) / numW;
    const r = waveW / 2;
    let arcs = '';
    for (let i = 0; i < numW; i++) {
        const sx = 10 + i * waveW;
        const ex = sx + waveW;
        const sweep = i % 2 === 0 ? 1 : 0;
        arcs += `<path d="M ${sx} ${lineY} A ${r} ${r} 0 0 ${sweep} ${ex} ${lineY}" fill="none" stroke="#8b5cf6" stroke-width="2.5" stroke-linecap="round"/>`;
    }
    return `<svg viewBox="0 0 320 ${h + 30}" width="100%" style="height:auto;max-width:320px; display:block;margin:0 auto;background:#faf5ff;border-radius:16px;">
        <line x1="10" y1="${lineY}" x2="${w - 10}" y2="${lineY}" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="5,4"/>
        ${arcs}
        <circle cx="10" cy="${lineY}" r="5" fill="#8b5cf6"/>
        <circle cx="${w - 10}" cy="${lineY}" r="5" fill="#8b5cf6"/>
        <text x="10" y="${lineY + 22}" font-size="14" fill="#8b5cf6" font-weight="800">A</text>
        <text x="${w - 16}" y="${lineY + 22}" font-size="14" fill="#8b5cf6" font-weight="800">B</text>
        ${!hideLabels ? `<text x="${w / 2}" y="${h + 18}" text-anchor="middle" font-size="13" fill="#64748b" font-weight="600">AB = ${totalLen} cm, ${numW} semicircles</text>` : ''}
    </svg>`;
};

const diagonalSVG = (w, h, labels = ['P', 'Q', 'R', 'S'], showDiags = true) => {
    const pw = Math.min(w * 20, 200), ph = Math.min(h * 20, 130);
    const ox = 50, oy = 30;
    let diagLines = '';
    if (showDiags) {
        diagLines = `
        <line x1="${ox}" y1="${oy}" x2="${ox + pw}" y2="${oy + ph}" stroke="#ef4444" stroke-width="2"/>
        <line x1="${ox + pw}" y1="${oy}" x2="${ox}" y2="${oy + ph}" stroke="#3b82f6" stroke-width="2"/>
        <circle cx="${ox + pw / 2}" cy="${oy + ph / 2}" r="5" fill="#f59e0b" stroke="#fff" stroke-width="2"/>
        <text x="${ox + pw / 2 + 10}" y="${oy + ph / 2 - 6}" font-size="13" fill="#f59e0b" font-weight="800">O</text>`;
    }
    return `<svg viewBox="0 0 ${pw + 100} ${ph + 70}" width="100%" style="height:auto;max-width:340px; display:block;margin:0 auto;background:#fef2f2;border-radius:16px;">
        <rect x="${ox}" y="${oy}" width="${pw}" height="${ph}" fill="#fee2e2" stroke="#ef4444" stroke-width="2" fill-opacity="0.3" rx="2"/>
        <text x="${ox - 6}" y="${oy - 6}" font-size="15" fill="#ef4444" font-weight="900">${labels[0]}</text>
        <text x="${ox + pw + 6}" y="${oy - 6}" font-size="15" fill="#ef4444" font-weight="900">${labels[1]}</text>
        <text x="${ox + pw + 6}" y="${oy + ph + 18}" font-size="15" fill="#ef4444" font-weight="900">${labels[2]}</text>
        <text x="${ox - 6}" y="${oy + ph + 18}" font-size="15" fill="#ef4444" font-weight="900">${labels[3]}</text>
        ${diagLines}
    </svg>`;
};

// ═══════════════════════════════════════════
// QUESTION GENERATORS PER SKILL
// ═══════════════════════════════════════════

const circleGenerators = [
    // Type 0: Radius from compass opening (Hide label so we don't leak answer!)
    () => {
        const r = randInt(2, 15);
        const { options, correctIndex } = shuffleOptions([`${r} cm`, `${r * 2} cm`, `${r + randInt(1, 3)} cm`, `${Math.max(1, r - randInt(1, 3))} cm`]);
        return { question: `A compass is opened to **${r} cm** and a full circle is drawn. What is the radius of the circle?`, svg: circleSVG(r, 'P', true), options, correct: correctIndex, explanation: `The compass opening equals the radius. The radius is **${r} cm**.` };
    },
    // Type 1: Diameter from radius
    () => {
        const r = randInt(2, 12);
        const d = r * 2;
        const { options, correctIndex } = shuffleOptions([`${d} cm`, `${r} cm`, `${d + 2} cm`, `${d - 1} cm`]);
        return { question: `A circle has radius **${r} cm**. What is the diameter (the distance across the full circle through the centre)?`, svg: circleSVG(r, 'P', true), options, correct: correctIndex, explanation: `Diameter = 2 × radius = 2 × ${r} = **${d} cm**.` };
    },
    // Type 2: Interactive Draw Circle
    () => {
        const r = randInt(3, 7);
        return { 
            type: 'interactive-draw', 
            subType: 'draw-circle', 
            targetDimensions: { radius: r },
            question: `Use the interactive compass tool below to construct a circle with radius **${r} cm**.`, 
            svg: '',
            explanation: `You must open the compass width exactly to **${r} cm** and then click 'Draw Circle' to create the correct circle.` 
        };
    },
    // Type 3: Distance from centre
    () => {
        const r = randInt(3, 14);
        const ptName = pick(['X', 'Y', 'Z', 'M', 'N']);
        const { options, correctIndex } = shuffleOptions([`${r} cm`, `${r * 2} cm`, `${r + 2} cm`, `${Math.max(1, r - 2)} cm`]);
        return { question: `Point **${ptName}** lies on a circle of radius **${r} cm** with centre O. What is the distance from O to ${ptName}?`, svg: circleSVG(r, 'O', true), options, correct: correctIndex, explanation: `Every point on the circle is at distance = radius = **${r} cm** from the centre.` };
    },
    // Type 4: Wavy wave radius
    () => {
        const numW = randInt(2, 8);
        const segLen = randInt(2, 6);
        const totalLen = numW * segLen;
        const radius = segLen / 2;
        const { options, correctIndex } = shuffleOptions([`${radius} cm`, `${segLen} cm`, `${totalLen / 2} cm`, `${radius + 1} cm`]);
        return { question: `A wavy wave is drawn on segment AB = **${totalLen} cm** using **${numW}** identical semicircles. What is the radius of each semicircle?`, svg: wavySVG(numW, totalLen, true), options, correct: correctIndex, explanation: `Each semicircle covers ${totalLen}÷${numW} = ${segLen} cm (diameter). So radius = ${segLen}÷2 = **${radius} cm**.` };
    },
];

const squareRectGenerators = [
    // Type 0: Identify square or rectangle
    () => {
        const isSquare = Math.random() > 0.5;
        const s = randInt(3, 12);
        const w = isSquare ? s : s + randInt(2, 6);
        const names = pick([['A','B','C','D'], ['P','Q','R','S'], ['W','X','Y','Z']]);
        const correct = isSquare ? 'Square (all sides equal)' : 'Rectangle (only opposite sides equal)';
        const wrong = isSquare ? 'Rectangle (only opposite sides equal)' : 'Square (all sides equal)';
        const { options, correctIndex } = shuffleOptions([correct, wrong, 'Rhombus', 'Parallelogram']);
        return { question: `A figure has all angles = 90°. Its sides are **${s} cm, ${w} cm, ${s} cm, ${w} cm**. What is it?`, svg: isSquare ? squareSVG(s, names) : rectSVG(w, s, names), options, correct: correctIndex, explanation: isSquare ? `All four sides are **${s} cm** → it's a **square**.` : `Opposite sides are equal (${s} and ${w}) but not all four → it's a **rectangle**.` };
    },
    // Type 1: Perimeter of rectangle (Hide labels so no leaks)
    () => {
        const l = randInt(4, 15);
        const b = randInt(2, l - 1);
        const P = 2 * (l + b);
        const names = pick([['A','B','C','D'], ['P','Q','R','S']]);
        const { options, correctIndex } = shuffleOptions([`${P} cm`, `${l * b} cm`, `${l + b} cm`, `${P + 2} cm`]);
        return { question: `Rectangle ${names.join('')} has length **${l} cm** and breadth **${b} cm**. What is its perimeter?`, svg: rectSVG(l, b, names, true), options, correct: correctIndex, explanation: `Perimeter = 2 × (length + breadth) = 2 × (${l} + ${b}) = **${P} cm**.` };
    },
    // Type 2: Divide rectangle into squares
    () => {
        const n = randInt(2, 6);
        const side = randInt(2, 7);
        const length = side * n;
        const names = pick([['A','B','C','D'], ['P','Q','R','S']]);
        const { options, correctIndex } = shuffleOptions([`${n}`, `${n + 1}`, `${n * 2}`, `${Math.max(1, n - 1)}`]);
        return { question: `A rectangle is **${length} cm × ${side} cm**. How many identical squares of side **${side} cm** can it be divided into?`, svg: rectSVG(length, side, names, true), options, correct: correctIndex, explanation: `${length} ÷ ${side} = **${n}** identical squares.` };
    },
    // Type 3: Interactive Draw Square
    () => {
        const s = randInt(3, 12);
        return { 
            type: 'interactive-draw', 
            subType: 'draw-square', 
            targetDimensions: { side: s },
            question: `Use the interactive drawing tool to construct a square with a side length of **${s} cm**.`, 
            svg: '',
            explanation: `You must adjust the side length slider exactly to **${s} cm** and then construct the shape.` 
        };
    },
];

const constructionGenerators = [
    // Type 0: Interactive draw rectangle
    () => {
        const l = randInt(5, 12);
        const b = randInt(2, l - 1);
        return { 
            type: 'interactive-draw', 
            subType: 'draw-rectangle', 
            targetDimensions: { length: l, breadth: b },
            question: `Use the interactive drawing tool to construct a rectangle with length **${l} cm** and breadth **${b} cm**.`, 
            svg: '',
            explanation: `You must adjust the length to **${l} cm** and the breadth to **${b} cm**, then draw the rectangle.` 
        };
    },
    // Type 1: Tool used to copy length
    () => {
        const s = randInt(4, 9);
        const { options, correctIndex } = shuffleOptions(['A compass', 'A protractor', 'A set-square only', 'Your fingers']);
        return { question: `You've drawn PQ = **${s} cm**. Which tool helps you "copy" this length exactly to mark PS = ${s} cm on the perpendicular?`, svg: '', options, correct: correctIndex, explanation: `Open the **compass** to match PQ, then swing an arc to mark PS = PQ = ${s} cm.` };
    },
    // Type 2: What angle is at each corner of square?
    () => {
        const s = randInt(3, 12);
        const { options, correctIndex } = shuffleOptions(['90°', '60°', '45°', '120°']);
        return { question: `In the constructed square with side **${s} cm**, what is the measure of each interior angle?`, svg: squareSVG(s, ['P','Q','R','S'], true), options, correct: correctIndex, explanation: `Every corner of a square is a **right angle = 90°**.` };
    },
];

const diagonalArcGenerators = [
    // Type 0: Diagonals equal
    () => {
        const l = randInt(5, 12);
        const b = randInt(3, l - 1);
        const names = pick([['P','Q','R','S'], ['A','B','C','D'], ['W','X','Y','Z']]);
        const { options, correctIndex } = shuffleOptions(['They are always equal in length', 'One is always longer', 'They are perpendicular', 'They are parallel']);
        return { question: `In rectangle **${names.join('')}** (${l} cm × ${b} cm), what is TRUE about diagonals ${names[0]}${names[2]} and ${names[1]}${names[3]}?`, svg: diagonalSVG(l, b, names), options, correct: correctIndex, explanation: `The diagonals of a rectangle are always **equal in length**. They bisect each other but are NOT perpendicular (unless it's a square).` };
    },
    // Type 1: When diagonals split angles equally
    () => {
        const { options, correctIndex } = shuffleOptions(['When the rectangle is a square', 'When the length is twice the breadth', 'Always', 'Never']);
        return { question: `For which type of rectangle does a diagonal divide the opposite angles into **two equal parts**?`, svg: '', options, correct: correctIndex, explanation: `Only when it's a **square** (all sides equal) do the diagonals split each 90° angle into two equal 45° parts.` };
    },
    // Type 2: Angle split by diagonal
    () => {
        const a1 = randInt(15, 44);
        const a2 = 90 - a1;
        const names = pick([['A','B','C','D'], ['P','Q','R','S']]);
        const { options, correctIndex } = shuffleOptions([`90°`, `${a1 + a2 + 10}°`, `${a1}°`, `${a2}°`]);
        return { question: `In rectangle ${names.join('')}, the diagonal splits ∠${names[0]} into **${a1}°** and **${a2}°**. What is the full measure of ∠${names[0]}?`, svg: diagonalSVG(8, 5, names), options, correct: correctIndex, explanation: `Each angle = ${a1}° + ${a2}° = **90°** (always 90° in a rectangle).` };
    },
    // Type 3: Equidistant point via arcs
    () => {
        const d = randInt(4, 12);
        const names = pick([['A','B','C'], ['P','Q','R'], ['X','Y','Z']]);
        const { options, correctIndex } = shuffleOptions(['At the intersection of the two arcs', 'At the midpoint of the base', 'At the centre of the base line', 'Such a point does not exist']);
        return { question: `To find point **${names[0]}** that is exactly **${d} cm** from both **${names[1]}** and **${names[2]}**, you draw arcs of radius ${d} cm from each. Where is ${names[0]}?`, svg: '', options, correct: correctIndex, explanation: `Point ${names[0]} lies at the **intersection** of the two arcs, since that point is exactly ${d} cm from both ${names[1]} and ${names[2]}.` };
    },
];

// ═══════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════

export const generateConstructionQuestions = (skillId, count = 20) => {
    const generators =
        skillId === 'circles-compass' ? circleGenerators :
        skillId === 'squares-rectangles' ? squareRectGenerators :
        skillId === 'construction-steps' ? constructionGenerators :
        diagonalArcGenerators;

    const questions = [];
    const usedTypes = new Set();

    for (let i = 0; i < count; i++) {
        // Cycle through all generator types to avoid repetition
        let genIdx;
        if (usedTypes.size >= generators.length) usedTypes.clear();
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

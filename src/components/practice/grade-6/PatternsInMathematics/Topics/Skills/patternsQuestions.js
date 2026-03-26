// utils
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function buildQ(question, correctAnswer, wrongAnswers, explanation, svg) {
    const options = [correctAnswer, ...wrongAnswers.filter(w => w !== correctAnswer).slice(0, 3)];
    while (options.length < 4) options.push(correctAnswer + '_alt');
    const shuffled = shuffle(options);
    const q = { question, options: shuffled, correct: shuffled.indexOf(correctAnswer), explanation };
    if (svg) q.svg = svg;
    return q;
}

// ─── SVG Helpers ──────────────────────────────────────────
const COLORS = ['#6366f1', '#0891b2', '#f59e0b', '#ef4444', '#10b981', '#ec4899', '#8b5cf6', '#0369a1'];

function drawDotGrid(rows, cols, color = '#6366f1', size = 180) {
    const gap = Math.min(28, size / Math.max(rows, cols));
    const w = cols * gap + 20;
    const h = rows * gap + 20;
    let dots = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            dots += `<circle cx="${10 + c * gap + gap / 2}" cy="${10 + r * gap + gap / 2}" r="6" fill="${color}" opacity="0.85"/>`;
        }
    }
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${dots}</svg>`;
}

function drawTriangularDots(n, color = '#0891b2') {
    const gap = 24;
    const w = n * gap + 20;
    const h = n * gap + 20;
    let dots = '';
    for (let row = 0; row < n; row++) {
        const xOff = ((n - 1 - row) * gap) / 2;
        for (let c = 0; c <= row; c++) {
            dots += `<circle cx="${10 + xOff + c * gap + gap / 2}" cy="${10 + row * gap + gap / 2}" r="6" fill="${color}" opacity="0.85"/>`;
        }
    }
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${dots}</svg>`;
}

function drawNumberLine(numbers, highlight, color = '#6366f1') {
    const pad = 40;
    const step = 50;
    const w = numbers.length * step + pad * 2;
    const h = 70;
    let svg = `<line x1="${pad}" y1="35" x2="${w - pad}" y2="35" stroke="#cbd5e1" stroke-width="2"/>`;
    numbers.forEach((num, i) => {
        const x = pad + i * step;
        const isHighlight = highlight.includes(num);
        svg += `<circle cx="${x}" cy="35" r="${isHighlight ? 10 : 5}" fill="${isHighlight ? color : '#94a3b8'}" />`;
        svg += `<text x="${x}" y="60" text-anchor="middle" font-size="12" font-weight="${isHighlight ? '800' : '500'}" fill="${isHighlight ? color : '#64748b'}">${num}</text>`;
    });
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
}

function drawPolygon(sides, size = 60, color = '#0891b2', label = '') {
    const cx = size, cy = size;
    const r = size * 0.7;
    let points = '';
    for (let i = 0; i < sides; i++) {
        const angle = (2 * Math.PI * i) / sides - Math.PI / 2;
        points += `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)} `;
    }
    return `<svg width="${size * 2}" height="${size * 2 + 20}" viewBox="0 0 ${size * 2} ${size * 2 + 20}" xmlns="http://www.w3.org/2000/svg">
        <polygon points="${points.trim()}" fill="${color}15" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>
        <text x="${cx}" y="${size * 2 + 14}" text-anchor="middle" font-size="11" font-weight="700" fill="${color}">${label || sides + ' sides'}</text>
    </svg>`;
}

function drawShapeSequence(sidesList, colors) {
    const size = 45;
    const totalW = sidesList.length * (size * 2 + 10) + 60;
    let inner = '';
    sidesList.forEach((sides, i) => {
        const ox = i * (size * 2 + 10) + 10;
        const cx = size, cy = size;
        const r = size * 0.65;
        let points = '';
        for (let j = 0; j < sides; j++) {
            const angle = (2 * Math.PI * j) / sides - Math.PI / 2;
            points += `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)} `;
        }
        const c = colors[i % colors.length];
        inner += `<g transform="translate(${ox},0)">
            <polygon points="${points.trim()}" fill="${c}20" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>
            <text x="${cx}" y="${size * 2 + 12}" text-anchor="middle" font-size="10" font-weight="700" fill="${c}">${sides} sides</text>
        </g>`;
    });
    // add question mark
    const lastOx = sidesList.length * (size * 2 + 10) + 10;
    inner += `<g transform="translate(${lastOx},0)">
        <rect x="10" y="10" width="${size * 1.6}" height="${size * 1.6}" rx="12" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6,4"/>
        <text x="${size * 0.8 + 10}" y="${size + 10}" text-anchor="middle" font-size="28" font-weight="900" fill="#94a3b8">?</text>
    </g>`;
    return `<svg width="${totalW + 100}" height="${size * 2 + 20}" viewBox="0 0 ${totalW + 100} ${size * 2 + 20}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

function drawBarChart(values, color = '#6366f1') {
    const barW = 32, gap = 12, h = 120, pad = 30;
    const w = values.length * (barW + gap) + pad * 2;
    const maxVal = Math.max(...values);
    let bars = '';
    values.forEach((v, i) => {
        const barH = (v / maxVal) * 80;
        const x = pad + i * (barW + gap);
        const y = h - barH - 15;
        bars += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="4" fill="${color}" opacity="0.75"/>`;
        bars += `<text x="${x + barW / 2}" y="${y - 4}" text-anchor="middle" font-size="11" font-weight="800" fill="${color}">${v}</text>`;
        bars += `<text x="${x + barW / 2}" y="${h - 2}" text-anchor="middle" font-size="10" font-weight="600" fill="#64748b">T${i + 1}</text>`;
    });
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <line x1="${pad - 5}" y1="${h - 15}" x2="${w - pad + 5}" y2="${h - 15}" stroke="#e2e8f0" stroke-width="1.5"/>
        ${bars}
    </svg>`;
}

function drawStaircase(steps, color = '#f59e0b') {
    const blockSize = 18;
    const w = steps * blockSize + 40;
    const h = steps * blockSize + 40;
    let blocks = '';
    for (let row = 0; row < steps; row++) {
        for (let col = 0; col <= row; col++) {
            const x = 10 + col * blockSize;
            const y = h - 20 - (steps - row) * blockSize;
            blocks += `<rect x="${x}" y="${y}" width="${blockSize - 2}" height="${blockSize - 2}" rx="3" fill="${color}" opacity="${0.5 + (row * 0.05)}"/>`;
        }
    }
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${blocks}</svg>`;
}

// ─── TOPIC 1: Number Sequences & Rules ─────────────
export const generateNumberSequenceQuestions = () => {
    const qs = [];

    // 5 Arithmetic with number line SVG
    for (let i = 0; i < 5; i++) {
        const start = rand(1, 15);
        const d = rand(2, 6) * (Math.random() > 0.3 ? 1 : -1);
        const seq = [start, start + d, start + 2 * d, start + 3 * d];
        const next = start + 4 * d;
        const svg = drawNumberLine([...seq, '?'], seq, COLORS[i % COLORS.length]);

        qs.push(buildQ(
            `Look at the number line. What number comes next in this sequence?\n$${seq.join(', ')}, \\text{ ?}$`,
            `${next}`, [`${next + d}`, `${next - d}`, `${next + 2}`],
            `Each number changes by $${d > 0 ? '+' : ''}${d}$. So $${seq[3]} ${d > 0 ? '+' : ''} ${d} = ${next}$.`,
            svg
        ));
    }

    // 4 Arithmetic with bar chart SVG
    for (let i = 0; i < 4; i++) {
        const start = rand(3, 10);
        const d = rand(2, 5);
        const seq = [start, start + d, start + 2 * d, start + 3 * d];
        const next = start + 4 * d;
        const svg = drawBarChart(seq, COLORS[(i + 3) % COLORS.length]);

        qs.push(buildQ(
            `The bar chart shows a growing pattern. What will be the height of the 5th bar (T5)?`,
            `${next}`, [`${next + d}`, `${next - 1}`, `${seq[3]}`],
            `The values grow by $+${d}$ each time: ${seq.join(', ')}. The 5th term is $${seq[3]} + ${d} = ${next}$.`,
            svg
        ));
    }

    // 5 Geometric with staircase SVG
    for (let i = 0; i < 5; i++) {
        const start = rand(2, 5);
        const r = rand(2, 3);
        const seq = [start, start * r, start * r * r, start * r * r * r];
        const next = start * r * r * r * r;
        const svg = drawBarChart(seq, COLORS[(i + 1) % COLORS.length]);

        qs.push(buildQ(
            `Study the chart carefully. Each bar multiplies by a constant factor. What is the next value?`,
            `${next}`, [`${next * r}`, `${next + r}`, `${seq[3] + seq[2]}`],
            `This is a geometric sequence (×${r}). Next = $${seq[3]} \\times ${r} = ${next}$.`,
            svg
        ));
    }

    // 6 Alternating with visual emojis
    for (let i = 0; i < 6; i++) {
        const st1 = rand(1, 10);
        const d1 = rand(2, 5);
        const st2 = rand(20, 30);
        const d2 = -(rand(2, 5));
        const next = st2 + 2 * d2;
        const terms = [st1, st2, st1 + d1, st2 + d2, st1 + 2 * d1];
        const svg = drawNumberLine(terms.concat(['?']), [st2, st2 + d2, '?'], '#ec4899');

        qs.push(buildQ(
            `This is an alternating sequence with two interleaved patterns. What comes at position 6?\n$${terms.join(', ')}, \\text{ ?}$`,
            `${next}`, [`${st1 + 3 * d1}`, `${next + 1}`, `${next - 1}`],
            `Even positions follow the rule $${d2}$. So the 6th term = $${st2 + d2} + (${d2}) = ${next}$.`,
            svg
        ));
    }

    // 3 Text-input interactive: type the next number
    for (let i = 0; i < 3; i++) {
        const start = rand(2, 12);
        const d = rand(2, 7);
        const seq = [start, start + d, start + 2 * d, start + 3 * d, start + 4 * d];
        const next = start + 5 * d;
        const svg = drawBarChart(seq, COLORS[(i + 5) % COLORS.length]);

        qs.push({
            question: `Study the bar chart. Type the value of the 6th term.\n$${seq.join(', ')}, \\text{ ?}$`,
            type: 'text',
            answer: `${next}`,
            explanation: `The pattern increases by $+${d}$ each time. $${seq[4]} + ${d} = ${next}$.`,
            svg
        });
    }

    return shuffle(qs).slice(0, 20);
};

// ─── TOPIC 2: Shape Patterns & Geometry ─────────────
export const generateShapeSequenceQuestions = () => {
    const qs = [];
    const polys = ["Triangle", "Square", "Pentagon", "Hexagon", "Heptagon", "Octagon", "Nonagon", "Decagon"];
    const polySides = [3, 4, 5, 6, 7, 8, 9, 10];

    // 6 Growing Polygon with shape SVG
    for (let i = 0; i < 6; i++) {
        let startIdx = rand(0, 3);
        let ans = polys[startIdx + 3];
        let sidesList = [polySides[startIdx], polySides[startIdx + 1], polySides[startIdx + 2]];
        let svg = drawShapeSequence(sidesList, [COLORS[0], COLORS[1], COLORS[4]]);
        let wrongs = polys.filter(p => p !== ans && !polys.slice(startIdx, startIdx + 3).includes(p));

        qs.push(buildQ(
            `Look at the shapes below. Each shape has one more side than the previous. What is the next shape?`,
            ans, [wrongs[0], wrongs[1], wrongs[2]],
            `The sides increase: ${sidesList.join(', ')}... Next has ${sidesList[2] + 1} sides = ${ans}.`,
            svg
        ));
    }

    // 4 Single polygon identification
    for (let i = 0; i < 4; i++) {
        let sIdx = rand(2, 6);
        let svg = drawPolygon(polySides[sIdx], 55, COLORS[sIdx % COLORS.length]);

        qs.push(buildQ(
            `How many sides does this regular polygon have?`,
            `${polySides[sIdx]}`, [`${polySides[sIdx] + 1}`, `${polySides[sIdx] - 1}`, `${polySides[sIdx] + 2}`],
            `Count the edges carefully — this is a ${polys[sIdx]} with ${polySides[sIdx]} sides.`,
            svg
        ));
    }

    // 5 Repeating Visual Patterns
    const visuals = [
        ['🔴', '🔵', '🟢'], ['⭐', '🌙', '☀️', '⭐'],
        ['🔺', '🔻', '🔸', '🔹'], ['🍎', '🍌', '🍇', '🍉'],
        ['⬆️', '➡️', '⬇️', '⬅️']
    ];
    for (let i = 0; i < 5; i++) {
        let pat = visuals[i];
        let len = pat.length;
        let targetPos = rand(12, 21);
        let display = pat.concat(pat).concat(pat).slice(0, 8).join('  ');
        let ansIdx = (targetPos - 1) % len;
        let ans = pat[ansIdx];
        let wrongs = pat.filter(p => p !== ans);
        while (wrongs.length < 3) wrongs.push('❓');

        // Build visual SVG with emojis
        const emojiSize = 32;
        const svgW = 8 * (emojiSize + 8) + 20;
        let emojiSvg = '';
        for (let j = 0; j < 8; j++) {
            const emoji = pat[j % len];
            emojiSvg += `<text x="${10 + j * (emojiSize + 8) + emojiSize / 2}" y="30" text-anchor="middle" font-size="24">${emoji}</text>`;
        }
        emojiSvg += `<text x="${svgW - 10}" y="30" text-anchor="end" font-size="16" fill="#94a3b8" font-weight="700">...</text>`;
        const svg = `<svg width="${svgW}" height="45" viewBox="0 0 ${svgW} 45" xmlns="http://www.w3.org/2000/svg">${emojiSvg}</svg>`;

        qs.push(buildQ(
            `The pattern below repeats every ${len} items. What will be at position ${targetPos}?`,
            ans, [wrongs[0], wrongs[1], wrongs[2]],
            `The core pattern repeats every ${len} shapes. Since ${targetPos} mod ${len} = ${ansIdx + 1}, the answer is ${ans}.`,
            svg
        ));
    }

    // 5 Fractal/Block Growth with staircase
    for (let i = 0; i < 5; i++) {
        const startDots = rand(1, 3);
        const multiplier = rand(2, 4);
        const vals = [startDots, startDots * multiplier, startDots * multiplier * multiplier];
        let next = startDots * Math.pow(multiplier, 3);
        const svg = drawBarChart(vals, COLORS[(i + 2) % COLORS.length]);

        qs.push(buildQ(
            `The chart shows a fractal growth pattern. Each step multiplies by ${multiplier}. How many elements at Step 4?`,
            `${next}`, [`${next + multiplier}`, `${next * multiplier}`, `${next - startDots}`],
            `Growth = ×${multiplier} each step. Step 4 = $${vals[2]} \\times ${multiplier} = ${next}$.`,
            svg
        ));
    }

    // 3 Text-input interactive: type the polygon sides
    for (let i = 0; i < 3; i++) {
        const startIdx = rand(0, 3);
        const nextSides = polySides[startIdx + 3];
        const sidesList = [polySides[startIdx], polySides[startIdx + 1], polySides[startIdx + 2]];
        const svg = drawShapeSequence(sidesList, [COLORS[0], COLORS[1], COLORS[4]]);

        qs.push({
            question: `Look at the shape sequence below. How many sides does the next shape have? Type the number.`,
            type: 'text',
            answer: `${nextSides}`,
            explanation: `The pattern adds 1 side each time: ${sidesList.join(', ')}. Next = ${nextSides} sides.`,
            svg
        });
    }

    return shuffle(qs).slice(0, 20);
};

// ─── TOPIC 3: Special Numbers: Squares & Triangles ──
export const generateSpecialPatternQuestions = () => {
    const qs = [];

    // 5 Square Number with dot grid SVG
    for (let i = 0; i < 5; i++) {
        let root = rand(3, 7);
        let sq = root * root;
        let svg = drawDotGrid(root, root, '#6366f1');

        qs.push(buildQ(
            `The dot grid below shows a perfect square arrangement. How many dots are there in total?`,
            `${sq}`, [`${sq + root}`, `${sq - root}`, `${sq + 1}`],
            `This is a $${root} \\times ${root}$ grid. Total dots = $${root}^2 = ${sq}$.`,
            svg
        ));
    }

    // 4 Sum of consecutive odds with visual
    for (let i = 0; i < 4; i++) {
        let root = rand(3, 8);
        let sq = root * root;
        // Build L-shaped layers visual
        const blockSize = 14;
        const svgSz = root * blockSize + 20;
        let blocks = '';
        const layerColors = ['#6366f1', '#0891b2', '#f59e0b', '#ef4444', '#10b981', '#ec4899', '#8b5cf6', '#0369a1'];
        for (let layer = 0; layer < root; layer++) {
            const c = layerColors[layer % layerColors.length];
            // bottom row of L
            for (let col = 0; col <= layer; col++) {
                blocks += `<rect x="${10 + col * blockSize}" y="${10 + layer * blockSize}" width="${blockSize - 2}" height="${blockSize - 2}" rx="2" fill="${c}" opacity="0.8"/>`;
            }
            // right col of L (excluding corner)
            for (let row = 0; row < layer; row++) {
                blocks += `<rect x="${10 + layer * blockSize}" y="${10 + row * blockSize}" width="${blockSize - 2}" height="${blockSize - 2}" rx="2" fill="${c}" opacity="0.8"/>`;
            }
        }
        const svg = `<svg width="${svgSz}" height="${svgSz}" viewBox="0 0 ${svgSz} ${svgSz}" xmlns="http://www.w3.org/2000/svg">${blocks}</svg>`;

        qs.push(buildQ(
            `Each colored L-shape layer adds the next odd number. What is the sum of the first ${root} odd numbers?\n$1 + 3 + 5 + ...$`,
            `${sq}`, [`${sq + root}`, `${sq - root}`, `${sq + 1}`],
            `The sum of the first $n$ odd numbers is $n^2$. Here $n = ${root}$, so $${root}^2 = ${sq}$.`,
            svg
        ));
    }

    // 5 Triangular Numbers with dot triangle SVG
    for (let i = 0; i < 5; i++) {
        let n = rand(3, 7);
        let tn = (n * (n + 1)) / 2;
        let svg = drawTriangularDots(n, '#0891b2');

        qs.push(buildQ(
            `Count the dots in this triangular arrangement. What is the ${n}th triangular number?`,
            `${tn}`, [`${tn + n}`, `${tn - 1}`, `${tn + 1}`],
            `Row 1 has 1 dot, Row 2 has 2, ... Row ${n} has ${n}. Total = $1+2+...+${n} = ${tn}$.`,
            svg
        ));
    }

    // 3 Consecutive triangulars sum to square
    for (let i = 0; i < 3; i++) {
        let n = rand(3, 7);
        let t1 = (n * (n + 1)) / 2;
        let t2 = ((n + 1) * (n + 2)) / 2;
        let sumTri = t1 + t2;

        // Side-by-side triangle + square visual
        const svg1 = drawTriangularDots(n, '#0891b2');
        const svg2 = drawTriangularDots(n + 1, '#f59e0b');

        const combinedSvg = `<div style="display:flex;align-items:center;gap:16px;justify-content:center">
            <div style="text-align:center"><div style="font-size:11px;font-weight:700;color:#0891b2;margin-bottom:4px">T${n} = ${t1}</div>${svg1}</div>
            <div style="font-size:24px;font-weight:900;color:#64748b">+</div>
            <div style="text-align:center"><div style="font-size:11px;font-weight:700;color:#f59e0b;margin-bottom:4px">T${n + 1} = ${t2}</div>${svg2}</div>
            <div style="font-size:24px;font-weight:900;color:#64748b">=</div>
            <div style="font-size:24px;font-weight:900;color:#6366f1">?</div>
        </div>`;

        qs.push(buildQ(
            `Add these two consecutive triangular numbers.\n$T_{${n}} + T_{${n + 1}} = ${t1} + ${t2} = ?$`,
            `${sumTri}`, [`${sumTri + n}`, `${sumTri - 1}`, `${t2 * 2}`],
            `Adding consecutive triangular numbers gives a perfect square! $${t1} + ${t2} = ${sumTri} = ${n + 1}^2$.`,
            combinedSvg
        ));
    }

    // 3 Staircase pattern
    for (let i = 0; i < 3; i++) {
        let n = rand(4, 7);
        let tn = (n * (n + 1)) / 2;
        let svg = drawStaircase(n, COLORS[(i + 3) % COLORS.length]);

        qs.push(buildQ(
            `Count the total blocks in this staircase pattern (1 + 2 + 3 + ... + ${n}).`,
            `${tn}`, [`${tn + 1}`, `${n * n}`, `${tn - n}`],
            `A staircase of ${n} rows forms the ${n}th triangular number: $\\frac{${n} \\times ${n + 1}}{2} = ${tn}$.`,
            svg
        ));
    }

    // 3 Text-input: type the square/triangular number
    for (let i = 0; i < 3; i++) {
        let n = rand(4, 8);
        let sq = n * n;
        let svg = drawDotGrid(n, n, '#8b5cf6');

        qs.push({
            question: `Count the dots in this square grid and type the total number.`,
            type: 'text',
            answer: `${sq}`,
            explanation: `This is a $${n} \\times ${n}$ grid. Total = $${n}^2 = ${sq}$.`,
            svg
        });
    }

    return shuffle(qs).slice(0, 20);
};

// ─── SVG Helpers for Terminology Illustrations ─────────────────────

function drawDotGrid(rows, cols, color) {
    const gap = 18;
    const w = cols * gap + 20;
    const h = rows * gap + 20;
    let dots = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            dots += `<circle cx="${10 + c * gap + gap / 2}" cy="${10 + r * gap + gap / 2}" r="5" fill="${color}" opacity="0.85"/>`;
        }
    }
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${dots}</svg>`;
}

function drawTriangleDots(n, color) {
    const gap = 18;
    const w = n * gap + 20;
    const h = n * gap + 20;
    let dots = '';
    for (let row = 0; row < n; row++) {
        const xOff = ((n - 1 - row) * gap) / 2;
        for (let c = 0; c <= row; c++) {
            dots += `<circle cx="${10 + xOff + c * gap + gap / 2}" cy="${10 + row * gap + gap / 2}" r="5" fill="${color}" opacity="0.85"/>`;
        }
    }
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${dots}</svg>`;
}

function drawCube3D(n, color) {
    const s = 16;
    const dx = 8, dy = -5;
    const w = n * s + n * dx + 30;
    const h = n * s + n * Math.abs(dy) + 30;
    let cubes = '';
    // Draw front face grid
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            const x = 10 + c * s;
            const y = h - 15 - (n - r) * s;
            cubes += `<rect x="${x}" y="${y}" width="${s - 1}" height="${s - 1}" fill="${color}" opacity="${0.6 + r * 0.1}" stroke="${color}" stroke-width="0.5"/>`;
        }
    }
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${cubes}</svg>`;
}

function drawPolygon(sides, size, color, label) {
    const cx = size, cy = size;
    const r = size * 0.7;
    let pts = '';
    for (let i = 0; i < sides; i++) {
        const angle = (2 * Math.PI * i) / sides - Math.PI / 2;
        pts += `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)} `;
    }
    return `<svg width="${size * 2}" height="${size * 2 + 16}" viewBox="0 0 ${size * 2} ${size * 2 + 16}" xmlns="http://www.w3.org/2000/svg">
        <polygon points="${pts.trim()}" fill="${color}18" stroke="${color}" stroke-width="2" stroke-linejoin="round"/>
        <text x="${cx}" y="${size * 2 + 12}" text-anchor="middle" font-size="10" font-weight="700" fill="${color}">${label}</text>
    </svg>`;
}

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

export const TERMS = [
    {
        name: 'Number Sequence',
        color: '#6366f1',
        icon: '🔢',
        def: 'A list of numbers arranged in a specific order that follows a mathematical rule.',
        examples: ['$1, 2, 3...$', '$2, 4, 6...$', '$1, 4, 9...$'],
        inUse: 'The odd numbers $1, 3, 5, 7, 9$ form a beautiful number sequence.',
        memory: 'Think of a line of uniquely ordered numbers just waiting to be cracked!',
        svg: `<svg width="260" height="50" viewBox="0 0 260 50" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="25" x2="250" y2="25" stroke="#e2e8f0" stroke-width="2"/>
            ${[1,3,5,7,9,11].map((n, i) => `<circle cx="${20 + i * 44}" cy="25" r="8" fill="#6366f1" opacity="0.8"/><text x="${20 + i * 44}" y="29" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">${n}</text>`).join('')}
            <text x="130" y="48" text-anchor="middle" font-size="10" fill="#64748b" font-weight="600">Odd numbers: +2 each time</text>
        </svg>`
    },
    {
        name: 'Square Number',
        color: '#10b981',
        icon: '⏹️',
        def: 'A number formed by multiplying an integer by itself, visually represented as dots in a perfect square.',
        examples: ['$1$', '$4$', '$9$', '$16$', '$25$'],
        inUse: '$16$ is a square number because it can be arranged in a $4 \\times 4$ grid.',
        memory: 'Square = Equal rows and columns!',
        svg: drawDotGrid(4, 4, '#10b981')
    },
    {
        name: 'Triangular Number',
        color: '#ef4444',
        icon: '🔺',
        def: 'Numbers that can be visually arranged in the shape of an equilateral triangle.',
        examples: ['$1$', '$3$', '$6$', '$10$', '$15$'],
        inUse: 'Adding consecutive counting numbers ($1 + 2 + 3$) gives the triangular number $6$.',
        memory: 'Triangle = Stacking dots like a pyramid!',
        svg: drawTriangleDots(5, '#ef4444')
    },
    {
        name: 'Cube Number',
        color: '#0891b2',
        icon: '🧊',
        def: 'A number formed by multiplying an integer by itself twice ($n \\times n \\times n$), forming a 3D block.',
        examples: ['$1$', '$8$', '$27$', '$64$'],
        inUse: 'A $3 \\times 3 \\times 3$ Rubiks cube is made of $27$ smaller blocks.',
        memory: 'Cube = 3 Dimensions (Length, Width, Height)!',
        svg: drawCube3D(3, '#0891b2')
    },
    {
        name: 'Shape Sequence',
        color: '#f59e0b',
        icon: '💠',
        def: 'A pattern formed by a growing or evolving series of geometric shapes.',
        examples: ['Stacked Triangles', 'Koch Snowflake', 'Regular Polygons'],
        inUse: 'The transition from triangle to square to pentagon is a shape sequence.',
        memory: 'Shapes that change and grow based on a rule!',
        svg: (() => {
            const shapes = [[3,'#f59e0b'],[4,'#ef4444'],[5,'#6366f1'],[6,'#0891b2']];
            const sz = 30;
            let inner = '';
            shapes.forEach(([sides, c], i) => {
                const ox = i * (sz * 2 + 8);
                const cx = sz, cy = sz;
                const r = sz * 0.7;
                let pts = '';
                for (let j = 0; j < sides; j++) {
                    const angle = (2 * Math.PI * j) / sides - Math.PI / 2;
                    pts += `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)} `;
                }
                inner += `<g transform="translate(${ox},0)"><polygon points="${pts.trim()}" fill="${c}20" stroke="${c}" stroke-width="2" stroke-linejoin="round"/></g>`;
            });
            return `<svg width="280" height="${sz * 2 + 4}" viewBox="0 0 280 ${sz * 2 + 4}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
        })()
    },
    {
        name: 'Regular Polygon',
        color: '#8b5cf6',
        icon: '🛑',
        def: 'A flat shape with straight sides where all sides have equal length and all interior angles are equal.',
        examples: ['Equilateral Triangle', 'Square', 'Regular Hexagon'],
        inUse: 'A stop sign is shaped like a regular octagon, with $8$ perfect sides.',
        memory: 'Regular = Perfect equality everywhere.',
        svg: drawPolygon(8, 40, '#8b5cf6', 'Octagon — 8 sides')
    },
    {
        name: 'Powers of 2',
        color: '#ec4899',
        icon: '🚀',
        def: 'A sequence where each number is exactly double the previous number.',
        examples: ['$1, 2, 4, 8, 16, 32$'],
        inUse: 'Cell division in biology perfectly follows the powers of 2 sequence.',
        memory: 'Keep doubling! It grows incredibly fast!',
        svg: (() => {
            const vals = [1, 2, 4, 8, 16, 32];
            const barW = 28, gap = 8, h = 70, pad = 15;
            let bars = '';
            vals.forEach((v, i) => {
                const barH = (v / 32) * 50;
                const x = pad + i * (barW + gap);
                bars += `<rect x="${x}" y="${h - barH - 12}" width="${barW}" height="${barH}" rx="3" fill="#ec4899" opacity="0.75"/>`;
                bars += `<text x="${x + barW / 2}" y="${h - barH - 15}" text-anchor="middle" font-size="9" font-weight="800" fill="#ec4899">${v}</text>`;
            });
            return `<svg width="260" height="${h}" viewBox="0 0 260 ${h}" xmlns="http://www.w3.org/2000/svg">${bars}</svg>`;
        })()
    },
    {
        name: 'Koch Snowflake',
        color: '#06b6d4',
        icon: '❄️',
        def: 'A famous fractal shape sequence formed by repeatedly adding "speed bumps" to the straight edges of a triangle.',
        examples: ['Iteration 1', 'Iteration 2', 'Fractals'],
        inUse: 'The Koch Snowflake has an infinitely long perimeter but encloses finite space!',
        memory: 'Snowflake = Tiny jagged triangles added infinitely.',
        svg: (() => {
            // Simple triangle iterations
            const sz = 35;
            let inner = '';
            // Iter 1 — simple triangle
            const tri1 = `<polygon points="${sz},5 ${5},${sz * 1.5} ${sz * 2 - 5},${sz * 1.5}" fill="#06b6d420" stroke="#06b6d4" stroke-width="2"/>`;
            // Iter 2 — Star of David shape
            const tri2a = `<polygon points="${sz + 70},5 ${75},${sz * 1.5} ${sz * 2 + 65},${sz * 1.5}" fill="#06b6d420" stroke="#06b6d4" stroke-width="1.5"/>`;
            const tri2b = `<polygon points="${sz + 70},${sz * 1.3} ${85},${sz * 0.3} ${sz * 2 + 55},${sz * 0.3}" fill="#06b6d410" stroke="#06b6d4" stroke-width="1" stroke-dasharray="3,2"/>`;
            inner = `<g>${tri1}<text x="${sz}" y="${sz * 1.5 + 14}" text-anchor="middle" font-size="9" fill="#64748b" font-weight="700">Step 1</text></g>`;
            inner += `<g>${tri2a}${tri2b}<text x="${sz + 70}" y="${sz * 1.5 + 14}" text-anchor="middle" font-size="9" fill="#64748b" font-weight="700">Step 2</text></g>`;
            return `<svg width="220" height="${sz * 1.5 + 20}" viewBox="0 0 220 ${sz * 1.5 + 20}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
        })()
    }
];

export const FOUR_RULES = [
    {
        num: 1,
        title: 'Sum of Odd Numbers',
        rule: 'The sum of consecutive odd numbers starting from $1$ always yields a Square Number.',
        emoji: '➕',
        color: '#10b981',
        detail: 'When you take dots arranged as an "L" shape (an odd number amount) and wrap them over a previous square, forming a bigger square.',
        examples: ['$1 + 3 = 4$', '$1 + 3 + 5 + 7 = 16$'],
        tip: 'Odd Sums = Squares!',
        svg: (() => {
            const sz = 12, n = 4;
            let blocks = '';
            const colors = ['#10b981', '#0891b2', '#f59e0b', '#ef4444'];
            for (let layer = 0; layer < n; layer++) {
                const c = colors[layer];
                for (let col = 0; col <= layer; col++) {
                    blocks += `<rect x="${5 + col * sz}" y="${5 + layer * sz}" width="${sz - 2}" height="${sz - 2}" rx="2" fill="${c}" opacity="0.85"/>`;
                }
                for (let row = 0; row < layer; row++) {
                    blocks += `<rect x="${5 + layer * sz}" y="${5 + row * sz}" width="${sz - 2}" height="${sz - 2}" rx="2" fill="${c}" opacity="0.85"/>`;
                }
            }
            return `<svg width="80" height="60" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">${blocks}</svg>`;
        })()
    },
    {
        num: 2,
        title: 'Adding Up and Down',
        rule: 'Adding counting numbers up to a peak and then back down also gives a Square Number.',
        emoji: '⛰️',
        color: '#ef4444',
        detail: 'This forms a symmetrical pattern. Counting up to a number ($n$) and back down equals $n \\times n$.',
        examples: ['$1 + 2 + 1 = 4$', '$1 + 2 + 3 + 2 + 1 = 9$'],
        tip: 'The Peak Number squared is the Total Sum!',
        svg: (() => {
            const vals = [1, 2, 3, 4, 3, 2, 1];
            const barW = 14, h = 60;
            let bars = '';
            vals.forEach((v, i) => {
                const barH = v * 10;
                bars += `<rect x="${5 + i * (barW + 2)}" y="${h - barH - 8}" width="${barW}" height="${barH}" rx="2" fill="${v === 4 ? '#ef4444' : '#fca5a5'}" opacity="0.85"/>`;
                bars += `<text x="${5 + i * (barW + 2) + barW / 2}" y="${h - barH - 10}" text-anchor="middle" font-size="9" font-weight="800" fill="#ef4444">${v}</text>`;
            });
            return `<svg width="130" height="${h}" viewBox="0 0 130 ${h}" xmlns="http://www.w3.org/2000/svg">${bars}</svg>`;
        })()
    },
    {
        num: 3,
        title: 'Polygon Side Counting',
        rule: 'Counting the sides of regular polygons in sequence yields the counting numbers starting from $3$.',
        emoji: '📏',
        color: '#3b82f6',
        detail: 'Triangle ($3$), Square ($4$), Pentagon ($5$), Hexagon ($6$). It is a direct relationship between a 2D shape and a 1D number.',
        examples: ['$3, 4, 5, 6, 7...$'],
        tip: 'Polygons simply trace counting numbers from $3$ onwards.',
        svg: (() => {
            const shapes = [[3, '3'], [4, '4'], [5, '5'], [6, '6']];
            const sz = 20;
            let inner = '';
            shapes.forEach(([sides, label], i) => {
                const ox = i * (sz * 2 + 4) + 5;
                const cx = sz, cy = sz, r = sz * 0.7;
                let pts = '';
                for (let j = 0; j < sides; j++) {
                    const angle = (2 * Math.PI * j) / sides - Math.PI / 2;
                    pts += `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)} `;
                }
                inner += `<g transform="translate(${ox},0)"><polygon points="${pts.trim()}" fill="#3b82f620" stroke="#3b82f6" stroke-width="1.5" stroke-linejoin="round"/><text x="${cx}" y="${sz * 2 + 10}" text-anchor="middle" font-size="9" font-weight="800" fill="#3b82f6">${label}</text></g>`;
            });
            return `<svg width="200" height="${sz * 2 + 14}" viewBox="0 0 200 ${sz * 2 + 14}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
        })()
    },
    {
        num: 4,
        title: 'Consecutive Triangular Numbers',
        rule: 'Adding any two consecutive Triangular Numbers will ALWAYS give you a Square Number.',
        emoji: '🧩',
        color: '#f59e0b',
        detail: 'If you take two dot-triangles (like $3$ and $6$) and flip one upside down, they interlock to form a perfect square grid ($9$).',
        examples: ['$1 + 3 = 4$', '$3 + 6 = 9$', '$6 + 10 = 16$'],
        tip: 'Triangle + Next Triangle = Square!',
        svg: (() => {
            // Two triangles side by side
            const t1 = drawTriangleDots(3, '#f59e0b');
            const t2 = drawTriangleDots(3, '#10b981');
            return `<div style="display:flex;align-items:center;gap:8px"><div style="text-align:center"><div style="font-size:10px;font-weight:700;color:#f59e0b">T₃=6</div>${t1}</div><div style="font-size:16px;font-weight:900;color:#94a3b8">+</div><div style="text-align:center"><div style="font-size:10px;font-weight:700;color:#10b981">T₂=3</div>${t2}</div><div style="font-size:14px;font-weight:900;color:#6366f1">= 9 = 3²</div></div>`;
        })()
    }
];

export const VOCAB_QUIZ = [
    {
        question: "What type of number sequence is $1, 3, 6, 10, 15...$?",
        options: ["Square Numbers", "Even Numbers", "Triangular Numbers", "Cubes"],
        correct: 2,
        explanation: "These are Triangular numbers, formed by stacking layers of dots like a pyramid.",
        svg: drawTriangleDots(4, '#ef4444')
    },
    {
        question: "If you add the first three odd numbers ($1 + 3 + 5$), the sum is $9$. $9$ is a:",
        options: ["Triangular Number", "Square Number", "Cube Number", "Prime Number"],
        correct: 1,
        explanation: "The sum of consecutive odd numbers starting from 1 is always a perfect Square Number.",
        svg: drawDotGrid(3, 3, '#10b981')
    },
    {
        question: "What is the next number in the square number sequence: $1, 4, 9, 16...$?",
        options: ["20", "24", "25", "30"],
        correct: 2,
        explanation: "$16$ is $4^2$. The next number is $5^2$, which is $25$."
    },
    {
        question: "A shape sequence where each side is replaced by a 'speed bump' to form smaller triangles is called:",
        options: ["A Regular Polygon", "Stacked Squares", "Powers of 2", "Koch Snowflake"],
        correct: 3,
        explanation: "The Koch Snowflake is exactly formed by adding 'speed bump' triangles to straight edges sequentially."
    },
    {
        question: "Adding $1 + 2 + 3 + 4 + 3 + 2 + 1$ produces $16$. What pattern rule is this?",
        options: ["Polygonal Extension", "Adding Up and Down", "Consecutive Triangles", "Powers of 2"],
        correct: 1,
        explanation: "Adding counting numbers up to a peak and back down perfectly generates a square number!"
    },
    {
        question: "A polygon with all sides and interior angles fully equal is known as a:",
        options: ["Complete Graph", "Recursive Shape", "Regular Polygon", "Triangle Stack"],
        correct: 2,
        explanation: "Regular Polygons include shapes like equilateral triangles, squares, and regular pentagons.",
        svg: drawPolygon(6, 35, '#8b5cf6', 'Regular Hexagon')
    },
    {
        question: "If you add two consecutive triangular numbers, such as $6$ and $10$, what do you get?",
        options: ["$16$, a Square Number", "$16$, a Cube Number", "$16$, a Hexagonal Number", "$16$, a Triangular Number"],
        correct: 0,
        explanation: "$6 + 10 = 16$. Adding consecutive triangular numbers always gives a Square Number!"
    },
    {
        question: "What sequence starts: $1, 2, 4, 8, 16, 32...$?",
        options: ["Koch Sequence", "Triangular Numbers", "Counting Numbers", "Powers of 2"],
        correct: 3,
        explanation: "Each number in this sequence is strictly double the previous number."
    },
    {
        question: "What mathematical property explains why counting the sides of sequential regular polygons yields $3, 4, 5, 6...$?",
        options: ["Relation between Shapes and Numbers", "The Commutative Property", "Multiplicative Inverse", "The Snowflake Rule"],
        correct: 0,
        explanation: "It demonstrates how shape sequences are intrinsically linked to number sequences."
    },
    {
        question: "Why is $27$ called a Cube Number?",
        options: ["It can be divided by 3.", "It forms a $3 \\times 3$ square.", "It can be arranged in a 3D block like $3 \\times 3 \\times 3$.", "It represents an odd sum."],
        correct: 2,
        explanation: "Cube numbers represent the volume of a 3D block with equal length, width, and height ($3 \\times 3 \\times 3 = 27$).",
        svg: drawCube3D(3, '#0891b2')
    }
];

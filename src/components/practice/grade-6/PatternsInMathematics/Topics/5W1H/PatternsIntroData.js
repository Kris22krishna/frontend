// ─── SVG Illustrations for each card ─────────────────────────
const svgWhat = `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="50" font-size="32" font-weight="800" fill="#0891b2" font-family="monospace">1, 1, 2, 3, 5, 8, 13...</text>
  <text x="10" y="72" font-size="12" font-weight="600" fill="#64748b">The Fibonacci Sequence — each number is the sum of the two before it</text>
</svg>`;

const svgWhy = (() => {
    let stars = '';
    const positions = [[40,20],[90,35],[140,15],[190,40],[240,25],[60,55],[130,60],[200,55]];
    positions.forEach(([x,y], i) => {
        stars += `<circle cx="${x}" cy="${y}" r="4" fill="#10b981" opacity="${0.5 + i*0.06}"/>`;
    });
    // connect them
    for (let i = 0; i < positions.length - 1; i++) {
        stars += `<line x1="${positions[i][0]}" y1="${positions[i][1]}" x2="${positions[i+1][0]}" y2="${positions[i+1][1]}" stroke="#10b981" stroke-width="1" opacity="0.3" stroke-dasharray="3,3"/>`;
    }
    return `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">${stars}<text x="140" y="75" text-anchor="middle" font-size="11" fill="#64748b" font-weight="600">Patterns in star positions led to the theory of gravitation</text></svg>`;
})();

const svgWho = (() => {
    // Virahānka's staircase sequence
    const vals = [1, 1, 2, 3, 5, 8];
    const barW = 30, gap = 10, h = 70;
    let bars = '';
    vals.forEach((v, i) => {
        const barH = (v / 8) * 50;
        const x = 20 + i * (barW + gap);
        bars += `<rect x="${x}" y="${h - barH - 10}" width="${barW}" height="${barH}" rx="4" fill="#f59e0b" opacity="0.8"/>`;
        bars += `<text x="${x + barW/2}" y="${h - barH - 14}" text-anchor="middle" font-size="11" font-weight="800" fill="#f59e0b">${v}</text>`;
    });
    return `<svg width="280" height="${h}" viewBox="0 0 280 ${h}" xmlns="http://www.w3.org/2000/svg">${bars}<text x="140" y="${h - 1}" text-anchor="middle" font-size="11" fill="#64748b" font-weight="600">Virahānka's number sequence</text></svg>`;
})();

const svgWhere = (() => {
    // Honeycomb pattern
    let hexes = '';
    const colors = ['#ec4899', '#f472b6', '#fb7185', '#fda4af'];
    const r = 16;
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 6; col++) {
            const cx = 30 + col * (r * 1.8) + (row % 2 ? r * 0.9 : 0);
            const cy = 25 + row * (r * 1.6);
            let pts = '';
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i - Math.PI / 6;
                pts += `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)} `;
            }
            hexes += `<polygon points="${pts.trim()}" fill="${colors[(row + col) % 4]}20" stroke="${colors[(row + col) % 4]}" stroke-width="1.5"/>`;
        }
    }
    return `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">${hexes}<text x="140" y="75" text-anchor="middle" font-size="11" fill="#64748b" font-weight="600">Hexagonal patterns in nature — honeycombs, snowflakes</text></svg>`;
})();

const svgWhen = (() => {
    // Powers of 2 doubling visual
    let circles = '';
    const counts = [1, 2, 4, 8];
    let xOff = 10;
    counts.forEach((n, gi) => {
        const cols = Math.min(n, 4);
        const rows = Math.ceil(n / cols);
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols && r * cols + c < n; c++) {
                circles += `<circle cx="${xOff + c * 14 + 7}" cy="${20 + r * 14 + 7}" r="5" fill="#a855f7" opacity="0.8"/>`;
            }
        }
        circles += `<text x="${xOff + (cols * 14) / 2}" y="65" text-anchor="middle" font-size="13" font-weight="800" fill="#7c3aed">${n}</text>`;
        xOff += cols * 14 + 20;
        if (gi < 3) circles += `<text x="${xOff - 12}" y="35" font-size="16" fill="#94a3b8" font-weight="700">×2</text>`;
    });
    return `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">${circles}</svg>`;
})();

const svgHow = (() => {
    // L-shapes forming a square
    const sz = 12;
    const n = 4;
    const svgSz = n * sz + 20;
    let blocks = '';
    const colors = ['#3b82f6', '#0891b2', '#10b981', '#f59e0b'];
    for (let layer = 0; layer < n; layer++) {
        const c = colors[layer];
        for (let col = 0; col <= layer; col++) {
            blocks += `<rect x="${10 + col * sz}" y="${10 + layer * sz}" width="${sz - 2}" height="${sz - 2}" rx="2" fill="${c}" opacity="0.85"/>`;
        }
        for (let row = 0; row < layer; row++) {
            blocks += `<rect x="${10 + layer * sz}" y="${10 + row * sz}" width="${sz - 2}" height="${sz - 2}" rx="2" fill="${c}" opacity="0.85"/>`;
        }
    }
    return `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
        ${blocks}
        <text x="90" y="25" font-size="13" font-weight="700" fill="#0369a1">1 + 3 + 5 + 7 = 16</text>
        <text x="90" y="42" font-size="11" fill="#64748b" font-weight="600">Each colored L-shape is an odd number</text>
        <text x="90" y="56" font-size="11" fill="#64748b" font-weight="600">Together they form 4² = 16</text>
    </svg>`;
})();

export const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What are Mathematical Patterns?',
        icon: '🌀',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.35)',
        svg: svgWhat,
        content: `Mathematics is, in large part, the search for patterns and for the explanations as to why those patterns exist. The most basic patterns are **number sequences** (like odd numbers or square numbers) and **shape sequences** (like regular polygons).`,
        fact: '💡 Patterns exist all around us — in nature, in the motion of the sun, and in everything we do and see!',
    },
    {
        q: 'WHY',
        label: 'Why do we study patterns?',
        icon: '🚀',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        svg: svgWhy,
        content: `Understanding patterns helps propel humanity forward. Recognising patterns in the motion of stars led to the theory of gravitation, allowing us to send rockets to the Moon and Mars. Understanding patterns in genomes helps in curing diseases.`,
        fact: '💡 Mathematics aims not just to find out what patterns exist, but also to explain *why* they exist!',
    },
    {
        q: 'WHO',
        label: 'Who studies these patterns?',
        icon: '👩‍🔬',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        svg: svgWho,
        content: `Mathematicians study these patterns as both an art and a science. The branch of Mathematics that studies patterns in whole numbers is called **number theory**, while the branch that studies patterns in shapes is called **geometry**.`,
        fact: '💡 Famous mathematicians throughout history, like Virahānka, discovered uniquely beautiful number sequences!',
    },
    {
        q: 'WHERE',
        label: 'Where are patterns found?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        svg: svgWhere,
        content: `Patterns are found seamlessly blending into our everyday lives! You see them in shopping, cooking, throwing a ball, playing games, and understanding weather patterns. Even technology and bridge constructions rely heavily on mathematical patterns.`,
        fact: '💡 Many seemingly unrelated patterns are surprisingly connected, like how adding odd numbers perfectly forms square numbers!',
    },
    {
        q: 'WHEN',
        label: 'When do numbers form a pattern?',
        icon: '📐',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        svg: svgWhen,
        content: `Numbers form a pattern when they follow a specific, predictable rule. For example, the powers of 2 sequence ($1, 2, 4, 8, 16...$) doubles every time. Triangular numbers ($1, 3, 6, 10...$) are formed by adding consecutive counting numbers.`,
        fact: '💡 Whenever you arrange dots into perfect geometric triangles or squares, you are creating a number sequence pattern!',
    },
    {
        q: 'HOW',
        label: 'How do we visualize them?',
        icon: '🖼️',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.35)',
        svg: svgHow,
        content: `Visualising mathematical objects through pictures or diagrams is a very fruitful way to understand mathematical patterns. Drawing a square grid makes it evident why $1 + 3 + 5 + 7 = 16$. A picture can perfectly explain complex number relationships!`,
        fact: '💡 Shape sequences can even relate to number sequences, like how counting the sides of Regular Polygons gives $3, 4, 5, 6...$!',
    },
];

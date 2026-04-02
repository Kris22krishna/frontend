const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to get boundary edges of a set of cells
const getBoundaryEdges = (cells, cols) => {
    const set = new Set(cells);
    const edges = [];
    for (let c of cells) {
        const x = c % cols;
        const y = Math.floor(c / cols);
        if (!set.has(c - cols)) edges.push(`h_${x}_${y}`); // top
        if (!set.has(c + cols)) edges.push(`h_${x}_${y + 1}`); // bottom
        if (!set.has(c - 1) || x === 0) edges.push(`v_${x}_${y}`); // left
        if (!set.has(c + 1) || x === cols - 1) edges.push(`v_${x + 1}_${y}`); // right
    }
    return edges;
};

// 1. Perimeter Questions
export function generatePerimeterQuestions() {
    const qs = [];
    const cols = 10;
    const rows = 8;
    for (let i = 0; i < 20; i++) {
        const w = r(2, 6);
        const h = r(2, 5);
        const sx = r(1, cols - w - 1);
        const sy = r(1, rows - h - 1);
        
        let cells = [];
        const isL = Math.random() > 0.5;
        if (!isL) {
            for(let y=sy; y<sy+h; y++) {
                for(let x=sx; x<sx+w; x++) {
                    cells.push(y*cols + x);
                }
            }
        } else {
            const w1 = r(1, w-1);
            const h1 = h;
            const w2 = w;
            const h2 = r(1, h-1);
            for(let y=sy; y<sy+h1; y++) {
                for(let x=sx; x<sx+w1; x++) cells.push(y*cols + x);
            }
            for(let y=sy+h1-h2; y<sy+h1; y++) {
                for(let x=sx+w1; x<sx+w2; x++) cells.push(y*cols + x);
            }
        }
        
        const boundary = getBoundaryEdges(cells, cols);
        qs.push({
            id: `perim-${i}`,
            type: 'perimeter-draw',
            question: isL ? "Trace the complete outer perimeter of this irregular shape." : "Trace the complete perimeter of this rectangle.",
            gridCols: cols,
            gridRows: rows,
            fill: cells,
            targetAnswer: boundary,
            explanation: `The perimeter is the outer boundary. You must click exactly all ${boundary.length} outer line segments.`
        });
    }
    return qs;
}

// 2. Area Questions
export function generateAreaQuestions() {
    const qs = [];
    const cols = 10;
    const rows = 8;
    for (let i=0; i<20; i++) {
        const w = r(2, 6);
        const h = r(2, 5);
        const sx = r(1, cols - w - 1);
        const sy = r(1, rows - h - 1);
        const isL = Math.random() > 0.5;
        
        let path = '';
        let cells = [];
        let targetArea = 0;
        
        if (!isL) {
            targetArea = w * h;
            path = `M ${sx*40} ${sy*40} h ${w*40} v ${h*40} h -${w*40} Z`;
            for(let y=sy; y<sy+h; y++) {
                for(let x=sx; x<sx+w; x++) cells.push(y*cols + x);
            }
        } else {
            const w1 = r(1, w-1);
            const h1 = h;
            const w2 = w;
            const h2 = r(1, h-1);
            targetArea = (w1 * h1) + ((w2 - w1) * h2);
            path = `M ${sx*40} ${sy*40} h ${w1*40} v ${(h1-h2)*40} h ${(w2-w1)*40} v ${h2*40} h -${w2*40} Z`;
            for(let y=sy; y<sy+h1; y++) {
                for(let x=sx; x<sx+w1; x++) cells.push(y*cols + x);
            }
            for(let y=sy+h1-h2; y<sy+h1; y++) {
                for(let x=sx+w1; x<sx+w2; x++) cells.push(y*cols + x);
            }
        }
        
        qs.push({
            id: `area-${i}`,
            type: 'area-draw',
            question: `Shade exactly the area inside the green boundary.`,
            gridCols: cols,
            gridRows: rows,
            boundaryPath: path,
            targetAnswer: [...new Set(cells)],
            explanation: `The shape occupies ${targetArea} square units in total. You needed to click and shade all ${targetArea} unit squares inside the boundary.`
        });
    }
    return qs;
}

// 3. Composite Questions
export function generateCompositeQuestions() {
    const qs = [];
    const cols = 10;
    const rows = 8;
    for (let i=0; i<20; i++) {
        const w = r(3, 7);
        const h = r(3, 6);
        const sx = r(1, cols - w - 1);
        const sy = r(1, rows - h - 1);
        
        const w1 = r(1, w-2);
        const h1 = h;
        const w2 = w;
        const h2 = r(1, h-2);
        
        let cells = [];
        for(let y=sy; y<sy+h1; y++) {
            for(let x=sx; x<sx+w1; x++) cells.push(y*cols + x);
        }
        for(let y=sy+h1-h2; y<sy+h1; y++) {
            for(let x=sx+w1; x<sx+w2; x++) cells.push(y*cols + x);
        }
        
        // Vertical split extending the right edge of w1
        const splitV = [];
        for(let y=sy+h1-h2; y<sy+h1; y++) splitV.push(`v_${sx+w1}_${y}`);
        
        // Horizontal split extending the top edge of h2
        const splitH = [];
        for(let x=sx; x<sx+w1; x++) splitH.push(`h_${x}_${sy+h1-h2}`);
        
        qs.push({
            id: `comp-${i}`,
            type: 'composite-draw',
            question: "Draw ONE straight line (or set of lines) to split this complex shape into two simple rectangles.",
            gridCols: cols,
            gridRows: rows,
            fill: [...new Set(cells)],
            targetAnswers: [splitV, splitH],
            explanation: `You can split an L-shape either horizontally or vertically to form two regular rectangles. Both ways are correct.`
        });
    }
    return qs;
}

// 4. Triangle Area Questions
export function generateTriangleQuestions() {
    const qs = [];
    for (let i = 0; i < 20; i++) {
        const cols = 10;
        const rows = 8;
        const w = r(2, 6);
        const h = r(2, 6);
        const targetArea = (w * h) / 2;
        
        const sx = r(1, cols - w - 1);
        const sy = r(1, rows - h - 1);
        
        const isRight = Math.random() > 0.5;
        let points = '';
        if (isRight) {
            points = `${sx*40},${sy*40} ${sx*40},${(sy+h)*40} ${(sx+w)*40},${(sy+h)*40}`;
        } else {
            const topX = sx + r(1, w-1);
            points = `${topX*40},${sy*40} ${sx*40},${(sy+h)*40} ${(sx+w)*40},${(sy+h)*40}`;
        }
        
        let bgGrid = '';
        for(let x=sx; x<=sx+w; x++) {
            bgGrid += `<line x1="${x*40}" y1="${sy*40}" x2="${x*40}" y2="${(sy+h)*40}" stroke="#e2e8f0" stroke-width="2"/>`;
        }
        for(let y=sy; y<=sy+h; y++) {
            bgGrid += `<line x1="${sx*40}" y1="${y*40}" x2="${(sx+w)*40}" y2="${y*40}" stroke="#e2e8f0" stroke-width="2"/>`;
        }

        const svg = `<svg width="100%" height="auto" viewBox="0 0 ${cols*40} ${rows*40}" style="max-width: 400px; margin: 0 auto; display: block;">
            ${bgGrid}
            <rect x="${sx*40}" y="${sy*40}" width="${w*40}" height="${h*40}" fill="none" stroke="#94a3b8" stroke-width="4" stroke-dasharray="8 8"/>
            <polygon points="${points}" fill="#bfdbfe" fill-opacity="0.6" stroke="#3b82f6" stroke-width="4" stroke-linejoin="round"/>
        </svg>`;

        qs.push({
            id: `tri-${i}`,
            type: 'text',
            question: "Calculate the exact area of the blue triangle (in sq units).",
            svg: svg,
            answer: targetArea.toString(),
            explanation: `The bounding dotted rectangle has an area of ${w} × ${h} = ${w*h} sq units. The blue triangle occupies exactly half of this rectangle. So, ${w*h} ÷ 2 = ${targetArea} sq units.`
        });
    }
    return qs;
}

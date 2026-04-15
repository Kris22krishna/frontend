import React from 'react';

// DYNAMIC DIAGRAM FACTORY FOR QUADRILATERALS
function QuadrilateralDiagram({
    kind = 'parallelogram',
    labelNames = ['A', 'B', 'C', 'D'],
    showDiagonalAC = false,
    showDiagonalBD = false,
    tickMarks = [], // [{ side: 'AB', marks: 1 }]
    angleMarks = [], // [{ vertex: 'A', text: '70°', arcs: 1 }]
    sideLabels = [], // [{ side: 'AB', text: '5cm' }]
    rightAngles = [], // ['A', 'C']
    parallelMarks = [], // [{ side: 'AB', type: 'single' }]
    midpoints = [] // [{ side: 'AB', label: 'E' }]
}) {
    // Basic scaling and positioning logic similar to TwoTriangleDiagram
    const getCoordinates = (k) => {
        switch (k) {
            case 'parallelogram': return { A: [50, 150], B: [210, 150], C: [250, 50], D: [90, 50] };
            case 'rectangle': return { A: [60, 150], B: [240, 150], C: [240, 60], D: [60, 60] };
            case 'square': return { A: [100, 150], B: [200, 150], C: [200, 50], D: [100, 50] };
            case 'rhombus': return { A: [150, 180], B: [230, 115], C: [150, 50], D: [70, 115] }; // diamond shape
            case 'trapezium': return { A: [40, 150], B: [260, 150], C: [200, 50], D: [80, 50] };
            case 'kite': return { A: [150, 200], B: [220, 100], C: [150, 20], D: [80, 100] };
            case 'triangle_midpoint': return { X: [50, 160], Y: [230, 160], Z: [120, 40] }; // Special for midpoint theorem
            default: return { A: [50, 150], B: [210, 150], C: [250, 50], D: [90, 50] };
        }
    };

    const pts = getCoordinates(kind);
    const m = (p1, p2) => [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
    
    // Line builder based on mapped vertex labels to internal coordinates
    const getPt = (lbl) => {
        const vMap = {};
        if (kind === 'triangle_midpoint') {
            vMap[labelNames[0]] = pts.X; vMap[labelNames[1]] = pts.Y; vMap[labelNames[2]] = pts.Z;
            // E and F midpoints
            if (labelNames[3]) vMap[labelNames[3]] = m(vMap[labelNames[0]], vMap[labelNames[2]]); // mid of X,Z
            if (labelNames[4]) vMap[labelNames[4]] = m(vMap[labelNames[1]], vMap[labelNames[2]]); // mid of Y,Z
        } else {
            vMap[labelNames[0]] = pts.A; vMap[labelNames[1]] = pts.B; vMap[labelNames[2]] = pts.C; vMap[labelNames[3]] = pts.D;
        }
        return vMap[lbl];
    };

    const drawSide = (pt1, pt2) => <line x1={pt1[0]} y1={pt1[1]} x2={pt2[0]} y2={pt2[1]} stroke="#1e293b" strokeWidth="2.5" />;
    
    // Ticks marking equal sides
    const renderTick = (sideObj) => {
        const [v1, v2] = sideObj.side;
        const p1 = getPt(v1), p2 = getPt(v2);
        if (!p1 || !p2) return null;
        const mid = m(p1, p2);
        const dx = p2[0] - p1[0];
        const dy = p2[1] - p1[1];
        const len = Math.sqrt(dx * dx + dy * dy);
        const uxx = -dy / len, uyy = dx / len; // Normal vector
        const tickLen = 6;
        
        return Array.from({ length: sideObj.marks }).map((_, i) => {
            const offset = (i - (sideObj.marks - 1) / 2) * 5;
            const txx = mid[0] + (dx / len) * offset;
            const tyy = mid[1] + (dy / len) * offset;
            return <line key={`${sideObj.side}-${i}`} x1={txx - uxx * tickLen} y1={tyy - uyy * tickLen} x2={txx + uxx * tickLen} y2={tyy + uyy * tickLen} stroke="#059669" strokeWidth="2" />;
        });
    };

    // Parallel arrows
    const renderParallel = (pmark) => {
        const [v1, v2] = pmark.side;
        const p1 = getPt(v1), p2 = getPt(v2);
        if(!p1 || !p2) return null;
        const mid = m(p1, p2);
        const dx = p2[0] - p1[0], dy = p2[1] - p1[1];
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx/len, uy = dy/len;

        const arrowPath = `M ${-8} ${-5} L 0 0 L ${-8} ${5}`;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        return (
            <g transform={`translate(${mid[0]}, ${mid[1]}) rotate(${angle})`}>
                <path d={arrowPath} fill="none" stroke="#ef4444" strokeWidth="2" />
                {pmark.type === 'double' && <path d={arrowPath} fill="none" stroke="#ef4444" strokeWidth="2" transform="translate(-6, 0)" />}
            </g>
        );
    };

    const renderText = (sideObj) => {
        const [v1, v2] = sideObj.side;
        const p1 = getPt(v1), p2 = getPt(v2);
        if (!p1 || !p2) return null;
        const mid = m(p1, p2);
        // nudge text away
        const dx = p2[0] - p1[0], dy = p2[1] - p1[1];
        const len = Math.sqrt(dx*dx + dy*dy);
        const nx = -dy/len, ny = dx/len;
        // if nx/ny points up/left, keep it, else flip if we want it outside consistently
        let sign = (nx + ny > 0) ? -1 : 1; 
        if (kind === 'rhombus') sign = -1; // tweak for diamond
        return (
            <text x={mid[0] + nx*sign*16} y={mid[1] + ny*sign*16 + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f4c81" fontFamily="sans-serif">
                {sideObj.text}
            </text>
        );
    };

    const renderVertexName = (pt, label, index) => {
        // Just simple offsets based on index assuming standard ABCD traversal bottom-left, bottom-right, top-right, top-left
        let dx, dy;
        if (kind === 'triangle_midpoint') {
            if (index === 0) { dx = -10; dy = 15; }
            else if (index === 1) { dx = 10; dy = 15; }
            else if (index === 2) { dx = 0; dy = -10; }
            else if (index === 3) { dx = -18; dy = 0; }
            else if (index === 4) { dx = 18; dy = 0; }
        } else {
            if (index === 0) { dx = -15; dy = 15; }
            else if (index === 1) { dx = 15; dy = 15; }
            else if (index === 2) { dx = 15; dy = -10; }
            else if (index === 3) { dx = -15; dy = -10; }
        }
        return <text key={label} x={pt[0] + dx} y={pt[1] + dy} textAnchor="middle" alignmentBaseline="middle" fontSize="16" fontWeight="900" fill="#0f172a" fontFamily="sans-serif">{label}</text>
    };

    const renderAngleArc = (am) => {
        // simplified arc drawing, mostly just a dot + text for quad
        const pt = getPt(am.vertex);
        if (!pt) return null;
        let dx=0, dy=0;
        // basic inner push
        if (am.vertex === labelNames[0]) { dx = 15; dy = -15; }
        else if (am.vertex === labelNames[1]) { dx = -18; dy = -15; }
        else if (am.vertex === labelNames[2]) { dx = -15; dy = 18; }
        else if (am.vertex === labelNames[3]) { dx = 18; dy = 18; }

        if (kind === 'triangle_midpoint') {
             if (am.vertex === labelNames[0]) { dx = 25; dy = -10; }
             if (am.vertex === labelNames[1]) { dx = -25; dy = -10; }
             if (am.vertex === labelNames[2]) { dx = 0; dy = 30; }
        }

        return (
            <g key={am.vertex}>
                <text x={pt[0] + dx} y={pt[1] + dy} textAnchor="middle" alignmentBaseline="middle" fontSize="13" fontWeight="800" fill="#db2777">{am.text}</text>
            </g>
        )
    };

    if (kind === 'triangle_midpoint') {
        const X = pts.X, Y = pts.Y, Z = pts.Z;
        const M1 = m(X, Z);
        const M2 = m(Y, Z);
        return (
            <svg width="300" height="220" viewBox="0 0 300 220" style={{ maxWidth: '100%', height: 'auto', overflow: 'visible' }}>
                <polygon points={`${X[0]},${X[1]} ${Y[0]},${Y[1]} ${Z[0]},${Z[1]}`} fill="#eff6ff" stroke="#e2e8f0" strokeWidth="1" />
                {drawSide(X, Y)} {drawSide(Y, Z)} {drawSide(Z, X)}
                {drawSide(M1, M2)}
                
                {renderVertexName(X, labelNames[0], 0)}
                {renderVertexName(Y, labelNames[1], 1)}
                {renderVertexName(Z, labelNames[2], 2)}
                {labelNames[3] && renderVertexName(M1, labelNames[3], 3)}
                {labelNames[4] && renderVertexName(M2, labelNames[4], 4)}
                
                {labelNames[3] && <circle cx={M1[0]} cy={M1[1]} r="4" fill="#0f172a" />}
                {labelNames[4] && <circle cx={M2[0]} cy={M2[1]} r="4" fill="#0f172a" />}

                {tickMarks.map((tm, i) => <g key={`tm-${i}`}>{renderTick(tm)}</g>)}
                {parallelMarks.map((pm, i) => <g key={`pm-${i}`}>{renderParallel(pm)}</g>)}
                {sideLabels.map((sl, i) => <g key={`sl-${i}`}>{renderText(sl)}</g>)}
                {angleMarks.map((am, i) => <g key={`am-${i}`}>{renderAngleArc(am)}</g>)}
            </svg>
        );
    }

    const A = pts.A, B = pts.B, C = pts.C, D = pts.D;
    return (
        <svg width="300" height="220" viewBox="0 0 300 220" style={{ maxWidth: '100%', height: 'auto', overflow: 'visible' }}>
            {/* Base Fill */}
            <polygon points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${C[0]},${C[1]} ${D[0]},${D[1]}`} fill="#eff6ff" stroke="#e2e8f0" strokeWidth="1" />
            
            {/* Diagonals */}
            {showDiagonalAC && <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,5" />}
            {showDiagonalBD && <line x1={B[0]} y1={B[1]} x2={D[0]} y2={D[1]} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,5" />}
            
            {/* Edges */}
            {drawSide(A, B)} {drawSide(B, C)} {drawSide(C, D)} {drawSide(D, A)}

            {/* Vertices */}
            {renderVertexName(A, labelNames[0], 0)}
            {renderVertexName(B, labelNames[1], 1)}
            {renderVertexName(C, labelNames[2], 2)}
            {renderVertexName(D, labelNames[3], 3)}

            {/* Midpoints */}
            {midpoints.map(mp => {
                const p1 = getPt(mp.side[0]), p2 = getPt(mp.side[1]);
                if (!p1 || !p2) return null;
                const mid = m(p1, p2);
                let dx = 0, dy = 0;
                if (mp.side.includes('A') && mp.side.includes('D')) { dx = -15; dy = 0; }
                if (mp.side.includes('B') && mp.side.includes('C')) { dx = 15; dy = 0; }
                if (mp.side.includes('A') && mp.side.includes('B')) { dx = 0; dy = 15; }
                if (mp.side.includes('D') && mp.side.includes('C')) { dx = 0; dy = -15; }
                return (
                    <g key={mp.label}>
                        <circle cx={mid[0]} cy={mid[1]} r="4" fill="#0f172a" />
                        <text x={mid[0]+dx} y={mid[1]+dy} textAnchor="middle" alignmentBaseline="middle" fontSize="14" fontWeight="800" fill="#ef4444">{mp.label}</text>
                    </g>
                )
            })}

            {tickMarks.map((tm, i) => <g key={`tm-${i}`}>{renderTick(tm)}</g>)}
            {parallelMarks.map((pm, i) => <g key={`pm-${i}`}>{renderParallel(pm)}</g>)}
            {sideLabels.map((sl, i) => <g key={`sl-${i}`}>{renderText(sl)}</g>)}
            {angleMarks.map((am, i) => <g key={`am-${i}`}>{renderAngleArc(am)}</g>)}
            
            {/* Right angles */}
            {rightAngles.map(v => {
                const pt = getPt(v);
                let t = "none";
                if (v === labelNames[0]) t = "0,-15 15,-15 15,0";
                if (v === labelNames[1]) t = "0,-15 -15,-15 -15,0";
                if (v === labelNames[2]) t = "0,15 -15,15 -15,0";
                if (v === labelNames[3]) t = "0,15 15,15 15,0";
                
                // If the rightAngle is for midpoint 'O', assuming diagonals align to axis
                if (v === 'O') {
                    if (kind === 'rhombus') {
                        return <path key={v} d="M 150,105 L 160,105 L 160,115" fill="none" stroke="#ef4444" strokeWidth="2" />;
                    } else if (kind === 'square') {
                        return <path key={v} d="M 150,90 L 160,90 L 160,100" fill="none" stroke="#ef4444" strokeWidth="2" transform="rotate(45 150 100)" />;
                    }
                }

                return pt && t !== "none" ? (
                    <polyline key={v} points={t.split(' ').map(s => {const c=s.split(','); return `${pt[0]+parseFloat(c[0])},${pt[1]+parseFloat(c[1])}`}).join(' ')} fill="none" stroke="#ef4444" strokeWidth="2" />
                ) : null;
            })}
        </svg>
    )
}

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffle(arr) {
    const r = [...arr];
    for (let i = r.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
}

// ─── SKILL 1: Parallelogram Properties ───────────────────────────────────────
export function getParallelogramPropertiesPool() {
    const qType1 = () => { // missing angle calc
        const A = randInt(50, 85);
        const B = 180 - A; // adjacent
        return {
            type: 'mcq',
            q: `In a parallelogram $ABCD$, if $\\angle A = ${A}^{\\circ}$, what is the measure of $\\angle C$?`,
            opts: [`$${A}^{\\circ}$`, `$${B}^{\\circ}$`, `$${A + 10}^{\\circ}$`, `$${B - 20}^{\\circ}$`],
            ans: 0,
            expl: `Opposite angles of a parallelogram are equal. Therefore, $\\angle C = \\angle A = ${A}^{\\circ}$.`,
            chart: () => <QuadrilateralDiagram kind="parallelogram" labelNames={['A','B','C','D']} angleMarks={[{vertex: 'A', text: `${A}°`}]} />
        };
    };
    
    const qType2 = () => { // adjacent angle calc
        const A = randInt(60, 110);
        const B = 180 - A;
        const opts = shuffle([`$${B}^{\\circ}$`, `$${A}^{\\circ}$`, `$${Math.abs(A-20)}^{\\circ}$`, `$${180 - B + 10}^{\\circ}$`]);
        return {
            type: 'mcq',
            q: `In a parallelogram $PQRS$, if $\\angle P = ${A}^{\\circ}$, what is the measure of the adjacent angle $\\angle Q$?`,
            opts: opts,
            ans: opts.indexOf(`$${B}^{\\circ}$`),
            expl: `Adjacent angles of a parallelogram are supplementary (sum to $180^{\\circ}$). Therefore, $\\angle Q = 180^{\\circ} - ${A}^{\\circ} = ${B}^{\\circ}$.`,
            chart: () => <QuadrilateralDiagram kind="parallelogram" labelNames={['P','Q','R','S']} angleMarks={[{vertex: 'P', text: `${A}°`}]} />
        };
    };

    const qType3 = () => { // opposite sides equal
        const side1 = randInt(5, 15);
        const side2 = randInt(3, 9);
        const opts = shuffle([`$${side1}\\text{ cm}$`, `$${side2}\\text{ cm}$`, `$${side1 + side2}\\text{ cm}$`, `$${side1 * 2}\\text{ cm}$`]);
        return {
            type: 'mcq',
            q: `In parallelogram $ABCD$, side $AB = ${side1}\\text{ cm}$ and $BC = ${side2}\\text{ cm}$. What is the length of side $DC$?`,
            opts: opts,
            ans: opts.indexOf(`$${side1}\\text{ cm}$`),
            expl: `Opposite sides of a parallelogram are equal in length. Because $AB$ is opposite to $DC$, $DC = AB = ${side1}\\text{ cm}$.`,
            chart: () => <QuadrilateralDiagram kind="parallelogram" labelNames={['A','B','C','D']} sideLabels={[{side:'AB', text:`${side1}m`}, {side:'BC', text:`${side2}m`}]} />
        };
    };

    const qType4 = () => { // perimeter
        const side1 = randInt(12, 25);
        const side2 = randInt(8, 16);
        const perim = 2 * (side1 + side2);
        const opts = shuffle([`$${perim}\\text{ cm}$`, `$${side1 + side2}\\text{ cm}$`, `$${perim - 4}\\text{ cm}$`, `$${perim + 10}\\text{ cm}$`]);
        return {
            type: 'mcq',
            q: `The adjacent sides of a parallelogram are $${side1}\\text{ cm}$ and $${side2}\\text{ cm}$. What is its perimeter?`,
            opts: opts,
            ans: opts.indexOf(`$${perim}\\text{ cm}$`),
            expl: `Perimeter $= 2 \\times (\\text{sum of adjacent sides}) = 2 \\times (${side1} + ${side2}) = 2 \\times ${side1 + side2} = ${perim}\\text{ cm}$.`,
            chart: () => <QuadrilateralDiagram kind="parallelogram" labelNames={['W','X','Y','Z']} sideLabels={[{side:'WX', text:side1}, {side:'XY', text:side2}]} />
        };
    };

    const qType5 = () => { // diagonals bisect
        const ac = randInt(10, 20) * 2; // even number
        const bd = randInt(6, 12) * 2;
        const ao = ac / 2;
        const opts = shuffle([`$${ao}\\text{ cm}$`, `$${ac}\\text{ cm}$`, `$${bd/2}\\text{ cm}$`, `$${ao + 2}\\text{ cm}$`]);
        return {
            type: 'mcq',
            q: `The diagonals $AC$ and $BD$ of a parallelogram intersect at $O$. If $AC = ${ac}\\text{ cm}$ and $BD = ${bd}\\text{ cm}$, find the length of $OA$.`,
            opts: opts,
            ans: opts.indexOf(`$${ao}\\text{ cm}$`),
            expl: `The diagonals of a parallelogram bisect each other. Therefore, $OA$ is half of $AC$. $OA = ${ac} \\div 2 = ${ao}\\text{ cm}$.`,
            chart: () => <QuadrilateralDiagram kind="parallelogram" labelNames={['A','B','C','D']} showDiagonalAC showDiagonalBD midpoints={[{side:['A','C'], label:'O'}]} />
        };
    };

    return [qType1, qType2, qType3, qType4, qType5];
}

// ─── SKILL 2: Special Quadrilaterals ─────────────────────────────────────────
export function getSpecialQuadrilateralsPool() {
    const qType1 = () => { // Rectangle diagonals
        const rLen = randInt(12, 30);
        const opts = shuffle([`$${rLen}\\text{ cm}$`, `$${rLen/2}\\text{ cm}$`, `$${rLen*2}\\text{ cm}$`, `$${rLen-4}\\text{ cm}$`]);
        return {
            type: 'mcq',
            q: `In a rectangle $PQRS$, the diagonal $PR = ${rLen}\\text{ cm}$. What is the length of the diagonal $QS$?`,
            opts: opts,
            ans: opts.indexOf(`$${rLen}\\text{ cm}$`),
            expl: `The diagonals of a rectangle are always equal in length. Thus, $QS = PR = ${rLen}\\text{ cm}$.`,
            chart: () => <QuadrilateralDiagram kind="rectangle" labelNames={['P','Q','R','S']} showDiagonalAC showDiagonalBD sideLabels={[{side:'PR', text:`${rLen}cm`}]} />
        }
    };
    
    const qType2 = () => { // Rhombus diagonals angle
        const opts = shuffle(['$90^{\\circ}$', '$60^{\\circ}$', '$45^{\\circ}$', '$180^{\\circ}$']);
        return {
            type: 'mcq',
            q: `At what angle do the diagonals of a rhombus bisect each other?`,
            opts: opts,
            ans: opts.indexOf('$90^{\\circ}$'),
            expl: `A defining unique property of a rhombus is that its diagonals bisect each other exactly at right angles ($90^{\\circ}$).`,
            chart: () => <QuadrilateralDiagram kind="rhombus" labelNames={['A','B','C','D']} showDiagonalAC showDiagonalBD midpoints={[{side:['A','C'], label:'O'}]} rightAngles={['O']} />
        }
    };

    const qType3 = () => { // Square angles
        const opts = shuffle(['It must be a square', 'It must be a kite', 'It must be a trapezium', 'It must be a general parallelogram']);
        return {
            type: 'mcq',
            q: `If a rhombus has one angle equal to $90^{\\circ}$, what specific shape does it become?`,
            opts: opts,
            ans: opts.indexOf('It must be a square'),
            expl: `A rhombus already has all equal sides. If you make one angle $90^{\\circ}$ (which forces all angles to be $90^{\\circ}$ because opposite/adjacent angles must balance), it perfectly satisfies the definition of a square (equal sides + right angles).`,
            chart: () => <QuadrilateralDiagram kind="square" labelNames={['W','X','Y','Z']} rightAngles={['W', 'X', 'Y', 'Z']} tickMarks={[{side:'WX', marks:1},{side:'XY',marks:1},{side:'YZ',marks:1},{side:'ZW',marks:1}]} />
        }
    };

    const qType4 = () => { // Trapezium
        const opts = shuffle(['Exactly one pair', 'Two pairs', 'Zero pairs', 'Cannot be determined']);
        return {
            type: 'mcq',
            q: `How many pairs of parallel sides are there in a trapezium?`,
            opts: opts,
            ans: opts.indexOf('Exactly one pair'),
            expl: `By definition, a trapezium is a quadrilateral that has exactly ONE pair of parallel sides (often called bases).`,
            chart: () => <QuadrilateralDiagram kind="trapezium" labelNames={['A','B','C','D']} parallelMarks={[{side:'DC', type:'single'}, {side:'AB', type:'single'}]} />
        }
    };

    const qType5 = () => { // Kite
        const s1 = randInt(4, 9);
        const s2 = randInt(12, 20);
        const opts = shuffle([`$${s1}\\text{ cm and }${s2}\\text{ cm}$`, `$${s1}\\text{ cm and }${s1}\\text{ cm}$`, `$${s2}\\text{ cm and }${s2}\\text{ cm}$`, `None of these`]);
        return {
            type: 'mcq',
            q: `In a kite $ABCD$ where $AB=AD$ and $BC=CD$, if $AB = ${s1}\\text{ cm}$ and $CD = ${s2}\\text{ cm}$, what are the lengths of $AD$ and $BC$?`,
            opts: opts,
            ans: opts.indexOf(`$${s1}\\text{ cm and }${s2}\\text{ cm}$`),
            expl: `A kite has two pairs of equal adjacent sides. Since $AB=AD$, $AD = ${s1}\\text{ cm}$. Since $BC=CD$, $BC = ${s2}\\text{ cm}$.`,
            chart: () => <QuadrilateralDiagram kind="kite" labelNames={['A','B','C','D']} sideLabels={[{side:'AB', text:s1}, {side:'DC', text:s2}]} tickMarks={[{side:'AB', marks:1},{side:'AD', marks:1},{side:'BC',marks:2},{side:'DC',marks:2}]} />
        }
    };

    return [qType1, qType2, qType3, qType4, qType5];
}

// ─── SKILL 3: Mid-point Theorem ──────────────────────────────────────────────
export function getMidpointTheoremPool() {
    const qType1 = () => { // Parallel identification
        const opts = shuffle(['It is parallel to $YZ$', 'It is perpendicular to $YZ$', 'It is equal to $XY$', 'It bisects $\\angle X$']);
        return {
            type: 'mcq',
            q: `In $\\triangle XYZ$, $M$ is the mid-point of $XY$ and $N$ is the mid-point of $XZ$. According to the Mid-point theorem, what is the relationship between the line segment $MN$ and side $YZ$?`,
            opts: opts,
            ans: opts.indexOf('It is parallel to $YZ$'),
            expl: `Theorem 8.8 (Mid-point Theorem): The line segment joining the mid-points of two sides of a triangle is parallel to the third side and half its length. Hence, $MN \\parallel YZ$.`,
            chart: () => <QuadrilateralDiagram kind="triangle_midpoint" labelNames={['Y','Z','X','M','N']} parallelMarks={[{side:'MN', type:'single'}, {side:'YZ', type:'single'}]} />
        };
    };

    const qType2 = () => { // Calculate length base -> mid
        const base = randInt(6, 18) * 2;
        const mid = base / 2;
        const opts = shuffle([`$${mid}\\text{ cm}$`, `$${base}\\text{ cm}$`, `$${base * 2}\\text{ cm}$`, `$${mid + 2}\\text{ cm}$`]);
        return {
            type: 'mcq',
            q: `In $\\triangle ABC$, $D$ and $E$ are mid-points of sides $AB$ and $AC$ respectively. If $BC = ${base}\\text{ cm}$, find the length of $DE$.`,
            opts: opts,
            ans: opts.indexOf(`$${mid}\\text{ cm}$`),
            expl: `By the Mid-point theorem, $DE = \\frac{1}{2} BC$. So $DE = \\frac{${base}}{2} = ${mid}\\text{ cm}$.`,
            chart: () => <QuadrilateralDiagram kind="triangle_midpoint" labelNames={['B','C','A','D','E']} sideLabels={[{side:'BC', text:`${base}cm`}]} />
        };
    };

    const qType3 = () => { // Calculate length mid -> base
        const mid = randInt(5, 12) * 2;
        const base = mid * 2;
        const opts = shuffle([`$${base}\\text{ cm}$`, `$${mid}\\text{ cm}$`, `$${mid / 2}\\text{ cm}$`, `$${base + 2}\\text{ cm}$`]);
        return {
            type: 'mcq',
            q: `In $\\triangle PQR$, $S$ and $T$ are mid-points of $PQ$ and $PR$ respectively. If $ST = ${mid}\\text{ cm}$, what is the length of $QR$?`,
            opts: opts,
            ans: opts.indexOf(`$${base}\\text{ cm}$`),
            expl: `By the Mid-point theorem, $ST$ is half of $QR$. Therefore, $QR = 2 \\times ST = 2 \\times ${mid} = ${base}\\text{ cm}$.`,
            chart: () => <QuadrilateralDiagram kind="triangle_midpoint" labelNames={['Q','R','P','S','T']} sideLabels={[{side:'ST', text:`${mid}cm`}]} />
        };
    };

    const qType4 = () => { // Converse scenario
        const opts = shuffle(['$E$ must be the mid-point of $AC$', '$E$ is the centroid of $\\triangle ABC$', '$AE$ must be double $EC$', 'The line is perpendicular to $AC$']);
        return {
            type: 'mcq',
            q: `In $\\triangle ABC$, a line is drawn through $D$ (the mid-point of $AB$) parallel to $BC$. It intersects $AC$ at point $E$. According to Theorem 8.9 (Converse of Mid-point theorem), what can we say about point $E$?`,
            opts: opts,
            ans: opts.indexOf('$E$ must be the mid-point of $AC$'),
            expl: `The converse of the Mid-point Theorem states that a line drawn through the mid-point of one side of a triangle, parallel to another side, specifically bisects the third side. Therefore $E$ is the mid-point of $AC$.`,
            chart: () => <QuadrilateralDiagram kind="triangle_midpoint" labelNames={['B','C','A','D','E']} parallelMarks={[{side:'DE', type:'single'}, {side:'BC', type:'single'}]} tickMarks={[{side:'AD', marks:1},{side:'DB', marks:1}]} />
        };
    };

    const qType5 = () => { // Quad midpoints to parallelogram
        const opts = shuffle(['Parallelogram', 'Square', 'Trapezium', 'Kite']);
        return {
            type: 'mcq',
            q: `If you perfectly join the mid-points of all four non-overlapping sides of ANY quadrilateral consecutively, the resulting inner shape is always a:`,
            opts: opts,
            ans: opts.indexOf('Parallelogram'),
            expl: `By drawing the diagonals of the larger quadrilateral and applying the Mid-point theorem to the resulting triangles, you can prove that opposite sides of the inner shape are parallel and equal. This guarantees it is a parallelogram.`,
            chart: () => <QuadrilateralDiagram kind="rhombus" labelNames={['K','L','M','N']} midpoints={[{side:['K','M'], label:''}]} /> // Just a generic quad look
        };
    };

    return [qType1, qType2, qType3, qType4, qType5];
}

export function generateQuadrilateralsScenarios(skillId, count = 20) {
    let poolFuncs = [];
    if (skillId === 'quad-properties') poolFuncs = getParallelogramPropertiesPool();
    else if (skillId === 'special-quads') poolFuncs = getSpecialQuadrilateralsPool();
    else if (skillId === 'midpoint-theorem') poolFuncs = getMidpointTheoremPool();
    else poolFuncs = [...getParallelogramPropertiesPool(), ...getSpecialQuadrilateralsPool(), ...getMidpointTheoremPool()];

    const scenarios = [];
    for (let i = 0; i < count; i++) {
        const pf = poolFuncs[Math.floor(Math.random() * poolFuncs.length)];
        scenarios.push(pf());
    }
    return scenarios;
}

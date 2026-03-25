/**
 * CGScenarioUtils.jsx
 * Scenario-based question generator for Coordinate Geometry.
 * Each skill generates 5 scenarios × (1 plot + 3 MCQ) = 20 questions.
 */
import React from 'react';

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function R(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function nzR(min, max) { let v = 0; while (v === 0) v = R(min, max); return v; }
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = R(0, i); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
}
function shuffleWithAns(opts, ansIdx) {
    const items = opts.map((o, i) => ({ o, isAns: i === ansIdx }));
    const sh = shuffle(items);
    return { opts: sh.map(x => x.o), ans: sh.findIndex(x => x.isAns) };
}

function makeUnique(firstCorrect, fallbacks) {
    const set = new Set([String(firstCorrect)]);
    for (const f of fallbacks) {
        if (set.size >= 4) break;
        set.add(String(f));
    }
    let i = 1;
    while(set.size < 4) {
        const num = Number(firstCorrect);
        if (!isNaN(num)) set.add(String(num + i));
        else set.add(String(firstCorrect) + " (Alt " + i + ")");
        i++;
    }
    return Array.from(set);
}

// Quadrant label from signs
function quadOf(x, y) {
    if (x > 0 && y > 0) return 'I';
    if (x < 0 && y > 0) return 'II';
    if (x < 0 && y < 0) return 'III';
    if (x > 0 && y < 0) return 'IV';
    return null; // on axis
}

// ═════════════════════════════════════════════════════════════════════════════
// ── SKILL 1: Identifying Quadrants & Axes ────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════
export function generateQuadrantScenarios() {
    const scenarios = [];
    for (let s = 0; s < 5; s++) {
        // Generate 5 distinct points spread across quadrants + axes
        const pts = [];
        const labels = ['A', 'B', 'C', 'D', 'E'];
        const regions = shuffle([
            () => ({ x: R(1, 8), y: R(1, 8) }),       // Q I
            () => ({ x: R(-8, -1), y: R(1, 8) }),     // Q II
            () => ({ x: R(-8, -1), y: R(-8, -1) }),   // Q III
            () => ({ x: R(1, 8), y: R(-8, -1) }),     // Q IV
            () => Math.random() < 0.5 ? { x: R(-8, 8), y: 0 } : { x: 0, y: R(-8, 8) }, // on axis
        ]);
        regions.forEach((gen, i) => {
            const p = gen();
            if (p.x === 0 && p.y === 0) p.x = R(1, 5); // avoid origin
            pts.push({ ...p, label: labels[i], color: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][i] });
        });

        // 3 MCQ questions about these points
        const mcqs = [];

        // Q1: Which quadrant is point X in?
        const qPt = pts.find(p => quadOf(p.x, p.y));
        if (qPt) {
            const q = quadOf(qPt.x, qPt.y);
            const opts = makeUnique(`Quadrant ${q}`, ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV']);
            const s1 = shuffleWithAns(opts, 0);
            mcqs.push({ q: `From the graph, in which quadrant does point ${qPt.label}(${qPt.x}, ${qPt.y}) lie?`, opts: s1.opts, ans: s1.ans, exp: `x = ${qPt.x} (${qPt.x > 0 ? '+' : '−'}), y = ${qPt.y} (${qPt.y > 0 ? '+' : '−'}) → Quadrant ${q}.` });
        } else {
            mcqs.push({ q: 'How many quadrants does the Cartesian plane have?', opts: ['2', '3', '4', '6'], ans: 2, exp: 'The two axes divide the plane into exactly 4 quadrants.' });
        }

        // Q2: Which point lies on an axis?
        const axisPt = pts.find(p => p.x === 0 || p.y === 0);
        if (axisPt) {
            const axName = axisPt.x === 0 ? 'Y-axis' : 'X-axis';
            const opts = makeUnique(axisPt.label, pts.map(p => p.label));
            const s2 = shuffleWithAns(opts, 0);
            mcqs.push({ q: `Which plotted point lies on the ${axName}?`, opts: s2.opts, ans: s2.ans, exp: `Point ${axisPt.label}(${axisPt.x}, ${axisPt.y}) has ${axisPt.x === 0 ? 'x = 0' : 'y = 0'}, so it lies on the ${axName}.` });
        } else {
            const countQ1 = pts.filter(p => quadOf(p.x, p.y) === 'I').length;
            const opts = makeUnique(countQ1, [countQ1 + 1, Math.max(0, countQ1 - 1), 0, 1, 2, 3, 4, 5]);
            const s2 = shuffleWithAns(opts, 0);
            mcqs.push({ q: 'How many of the plotted points are in Quadrant I?', opts: s2.opts, ans: s2.ans, exp: `Points with both positive x and y are in Q I. Count = ${countQ1}.` });
        }

        // Q3: How many points are in Quadrant III?
        const countQ3 = pts.filter(p => quadOf(p.x, p.y) === 'III').length;
        const opts = makeUnique(countQ3, [countQ3 === 0 ? 1 : 0, countQ3 + 2, countQ3 + 1, 0, 1, 2, 3, 4]);
        const s3 = shuffleWithAns(opts, 0);
        mcqs.push({ q: 'How many of the plotted points lie in Quadrant III (both coordinates negative)?', opts: s3.opts, ans: s3.ans, exp: `Points with both x < 0 and y < 0 are in Q III. Count = ${countQ3}.` });

        // Add Target Regions for interactive testing instead of point plotting
        const allRegions = shuffle(['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV', 'X-axis', 'Y-axis']);
        const targetRegions = allRegions.slice(0, 3); // 3 targets to click on graph

        scenarios.push({ 
            title: `Quadrant Mapping — Set ${s + 1}`, 
            points: pts, 
            mcqs, 
            interactionType: 'click_region',
            targetRegions 
        });
    }
    return scenarios;
}

// ═════════════════════════════════════════════════════════════════════════════
// ── SKILL 2: Reading Coordinates ─────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════
export function generateReadingScenarios() {
    const scenarios = [];
    for (let s = 0; s < 5; s++) {
        const labels = ['P', 'Q', 'R', 'S', 'T'];
        const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
        const pts = [];
        const used = new Set();
        for (let i = 0; i < 5; i++) {
            let x, y;
            do { x = R(-8, 8); y = R(-8, 8); } while (used.has(`${x},${y}`));
            used.add(`${x},${y}`);
            pts.push({ x, y, label: labels[i], color: colors[i] });
        }

        const mcqs = [];

        // Q1: What are the coordinates of point P?
        const p1 = pts[0];
        const opts1 = makeUnique(`(${p1.x}, ${p1.y})`, [`(${p1.y}, ${p1.x})`, `(${-p1.x}, ${p1.y})`, `(${p1.x}, ${-p1.y})`, `(${-p1.x}, ${-p1.y})`, `(${p1.x + 1}, ${p1.y})`]);
        const sh1 = shuffleWithAns(opts1, 0);
        mcqs.push({ q: `What are the coordinates of point ${p1.label} on the graph?`, opts: sh1.opts, ans: sh1.ans, exp: `Read horizontally → x = ${p1.x}, vertically → y = ${p1.y}. So ${p1.label} = (${p1.x}, ${p1.y}).` });

        // Q2: Which point is at a specific location?
        const p2 = pts[R(1, 4)];
        const opts2 = makeUnique(p2.label, pts.map(p => p.label));
        const sh2 = shuffleWithAns(opts2, 0);
        mcqs.push({ q: `Which point is located at (${p2.x}, ${p2.y})?`, opts: sh2.opts, ans: sh2.ans, exp: `Looking at the graph, (${p2.x}, ${p2.y}) corresponds to point ${p2.label}.` });

        // Q3: What is the abscissa of point R?
        const p3 = pts[2];
        const opts3 = makeUnique(p3.x, [p3.y, -p3.x, p3.x + R(1, 3), p3.x - 1, p3.x + 2]);
        const sh3 = shuffleWithAns(opts3, 0);
        mcqs.push({ q: `What is the abscissa (x-coordinate) of point ${p3.label}?`, opts: sh3.opts, ans: sh3.ans, exp: `The abscissa is the x-coordinate. For ${p3.label}(${p3.x}, ${p3.y}), the abscissa is ${p3.x}.` });

        scenarios.push({ title: `Coordinate Reading — Set ${s + 1}`, points: pts, mcqs, readOnly: true });
    }
    return scenarios;
}

// ═════════════════════════════════════════════════════════════════════════════
// ── SKILL 3: Plotting Points ─────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════
export function generatePlottingScenarios() {
    const scenarios = [];
    for (let s = 0; s < 5; s++) {
        const labels = ['A', 'B', 'C', 'D'];
        const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];
        const pts = [];
        const used = new Set();
        for (let i = 0; i < 4; i++) {
            let x, y;
            do { x = R(-8, 8); y = R(-8, 8); } while (used.has(`${x},${y}`) || (x === 0 && y === 0));
            used.add(`${x},${y}`);
            pts.push({ x, y, label: labels[i], color: colors[i] });
        }

        const mcqs = [];

        // Q1: Which quadrant did your last plotted point land in?
        const lastPt = pts[pts.length - 1];
        const q = quadOf(lastPt.x, lastPt.y);
        if (q) {
            const opts = makeUnique(`Quadrant ${q}`, ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV']);
            const sh1 = shuffleWithAns(opts, 0);
            mcqs.push({ q: `In which quadrant is the last point ${lastPt.label}(${lastPt.x}, ${lastPt.y}) that you plotted?`, opts: sh1.opts, ans: sh1.ans, exp: `(${lastPt.x}, ${lastPt.y}) → x is ${lastPt.x > 0 ? 'positive' : 'negative'}, y is ${lastPt.y > 0 ? 'positive' : 'negative'} → Quadrant ${q}.` });
        } else {
            const axis = lastPt.x === 0 ? 'Y-axis' : 'X-axis';
            const opts = makeUnique(axis, ['X-axis', 'Y-axis', 'Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV']);
            const sh1 = shuffleWithAns(opts, 0);
            mcqs.push({ q: `Point ${lastPt.label}(${lastPt.x}, ${lastPt.y}) lies on which line?`, opts: sh1.opts, ans: sh1.ans, exp: `Since ${lastPt.x === 0 ? 'x = 0' : 'y = 0'}, it lies on the ${axis}.` });
        }

        // Q2: Reflect point B over X-axis
        const rPt = pts[1];
        const reflected = `(${rPt.x}, ${-rPt.y})`;
        const opts2 = makeUnique(reflected, [`(${-rPt.x}, ${rPt.y})`, `(${-rPt.x}, ${-rPt.y})`, `(${rPt.y}, ${rPt.x})`, `(${rPt.x}, ${-rPt.y})`]);
        const sh2 = shuffleWithAns(opts2, 0);
        mcqs.push({ q: `If you reflect point ${rPt.label}(${rPt.x}, ${rPt.y}) over the X-axis, what are the new coordinates?`, opts: sh2.opts, ans: sh2.ans, exp: `Reflecting over the X-axis flips the y-coordinate sign: (${rPt.x}, ${rPt.y}) → ${reflected}.` });

        // Q3: Distance from Y-axis
        const dPt = pts[0];
        const dist = Math.abs(dPt.x);
        const opts3 = makeUnique(`${dist} units`, [`${Math.abs(dPt.y)} units`, `${dist + 2} units`, `${Math.abs(dPt.y) + 1} units`, `${dist + 1} units`]);
        const sh3 = shuffleWithAns(opts3, 0);
        mcqs.push({ q: `What is the distance of point ${dPt.label}(${dPt.x}, ${dPt.y}) from the Y-axis?`, opts: sh3.opts, ans: sh3.ans, exp: `Distance from the Y-axis = |x| = |${dPt.x}| = ${dist} units.` });

        scenarios.push({ title: `Point Plotting — Set ${s + 1}`, points: pts, mcqs });
    }
    return scenarios;
}

// ═════════════════════════════════════════════════════════════════════════════
// ── SKILL 4: Distance & Reflections ──────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════
export function generateDistanceScenarios() {
    const scenarios = [];
    for (let s = 0; s < 5; s++) {
        const labels = ['P', 'Q', 'R', 'S'];
        const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];
        const pts = [];
        const used = new Set();
        for (let i = 0; i < 4; i++) {
            let x, y;
            do { x = nzR(-8, 8); y = nzR(-8, 8); } while (used.has(`${x},${y}`));
            used.add(`${x},${y}`);
            pts.push({ x, y, label: labels[i], color: colors[i] });
        }

        const mcqs = [];

        // Q1: Distance of P from X-axis
        const p1 = pts[0];
        const distX = Math.abs(p1.y);
        const opts1 = makeUnique(`${distX} units`, [`${Math.abs(p1.x)} units`, `${distX + 2} units`, `${Math.abs(p1.x) + 1} units`, `${distX + 1} units`]);
        const sh1 = shuffleWithAns(opts1, 0);
        mcqs.push({ q: `What is the perpendicular distance of ${p1.label}(${p1.x}, ${p1.y}) from the X-axis?`, opts: sh1.opts, ans: sh1.ans, exp: `Distance from X-axis = |y| = |${p1.y}| = ${distX} units.` });

        // Q2: Reflect Q over Y-axis
        const p2 = pts[1];
        const refStr = `(${-p2.x}, ${p2.y})`;
        const opts2 = makeUnique(refStr, [`(${p2.x}, ${-p2.y})`, `(${-p2.x}, ${-p2.y})`, `(${p2.y}, ${-p2.x})`, `(${p2.y}, ${p2.x})`]);
        const sh2 = shuffleWithAns(opts2, 0);
        mcqs.push({ q: `Reflect point ${p2.label}(${p2.x}, ${p2.y}) over the Y-axis. What are the new coordinates?`, opts: sh2.opts, ans: sh2.ans, exp: `Reflecting over the Y-axis flips the x-coordinate sign: (${p2.x}, ${p2.y}) → ${refStr}.` });

        // Q3: Which point is farthest from the origin?
        const dists = pts.map(p => ({ ...p, d: Math.abs(p.x) + Math.abs(p.y) }));
        dists.sort((a, b) => b.d - a.d);
        const farthest = dists[0];
        const opts3 = makeUnique(`${farthest.label}(${farthest.x}, ${farthest.y})`, pts.map(p => `${p.label}(${p.x}, ${p.y})`));
        const sh3 = shuffleWithAns(opts3, 0);
        mcqs.push({ q: 'Which plotted point is farthest from the origin (by Manhattan distance |x| + |y|)?', opts: sh3.opts, ans: sh3.ans, exp: `|${farthest.x}| + |${farthest.y}| = ${farthest.d} is the largest sum among all four points.` });

        scenarios.push({ title: `Distance & Reflections — Set ${s + 1}`, points: pts, mcqs });
    }
    return scenarios;
}

// ═════════════════════════════════════════════════════════════════════════════
// ── CGGraphMini — small graph used in MCQ phase to show context ──────────────
// ═════════════════════════════════════════════════════════════════════════════
export function CGGraphMini({ points = [], size = 260, userPoints = null }) {
    const min = -10, max = 10, range = max - min;
    const toPx = (x, y) => ({ px: ((x - min) / range) * size, py: (1 - (y - min) / range) * size });
    const mid = size / 2;

    const grid = [];
    for (let i = min; i <= max; i++) {
        const { px } = toPx(i, 0);
        const { py } = toPx(0, i);
        grid.push(<line key={`v${i}`} x1={px} y1={0} x2={px} y2={size} stroke={i === 0 ? '#1e293b' : '#f1f5f9'} strokeWidth={i === 0 ? 1.5 : 0.5} />);
        grid.push(<line key={`h${i}`} x1={0} y1={py} x2={size} y2={py} stroke={i === 0 ? '#1e293b' : '#f1f5f9'} strokeWidth={i === 0 ? 1.5 : 0.5} />);
    }

    const labels = [];
    for (let i = -10; i <= 10; i += 2) {
        if (i === 0) continue;
        const { px } = toPx(i, 0);
        const { py } = toPx(0, i);
        labels.push(<text key={`lx${i}`} x={px} y={mid + 12} textAnchor="middle" fontSize={7} fill="#94a3b8">{i}</text>);
        labels.push(<text key={`ly${i}`} x={mid - 5} y={py + 3} textAnchor="end" fontSize={7} fill="#94a3b8">{i}</text>);
    }

    // Add Axis Arrows to grid
    const arrSize = 5;
    grid.push(
        <polygon key="arr-t" points={`${mid},0 ${mid-arrSize},${arrSize} ${mid+arrSize},${arrSize}`} fill="#1e293b" />,
        <polygon key="arr-b" points={`${mid},${size} ${mid-arrSize},${size-arrSize} ${mid+arrSize},${size-arrSize}`} fill="#1e293b" />,
        <polygon key="arr-l" points={`0,${mid} ${arrSize},${mid-arrSize} ${arrSize},${mid+arrSize}`} fill="#1e293b" />,
        <polygon key="arr-r" points={`${size},${mid} ${size-arrSize},${mid-arrSize} ${size-arrSize},${mid+arrSize}`} fill="#1e293b" />
    );

    const displayPts = userPoints || points;

    const highlights = [];
    const validPts = [];
    displayPts.forEach((pt, i) => {
        if (typeof pt === 'string') {
            const num = i + 1;
            let bx, by;

            if (pt === 'Quadrant I') { highlights.push(<rect key={`h${i}`} x={mid} y={0} width={mid} height={mid} fill="#3b82f630" />); bx = mid + mid/2; by = mid/2; }
            if (pt === 'Quadrant II') { highlights.push(<rect key={`h${i}`} x={0} y={0} width={mid} height={mid} fill="#3b82f630" />); bx = mid/2; by = mid/2; }
            if (pt === 'Quadrant III') { highlights.push(<rect key={`h${i}`} x={0} y={mid} width={mid} height={mid} fill="#3b82f630" />); bx = mid/2; by = mid + mid/2; }
            if (pt === 'Quadrant IV') { highlights.push(<rect key={`h${i}`} x={mid} y={mid} width={mid} height={mid} fill="#3b82f630" />); bx = mid + mid/2; by = mid + mid/2; }
            if (pt === 'X-axis') { highlights.push(<line key={`h${i}`} x1={0} y1={mid} x2={size} y2={mid} stroke="#3b82f6" strokeWidth={4} strokeOpacity={0.6} />); bx = size - 20; by = mid - 10; }
            if (pt === 'Y-axis') { highlights.push(<line key={`h${i}`} x1={mid} y1={0} x2={mid} y2={size} stroke="#3b82f6" strokeWidth={4} strokeOpacity={0.6} />); bx = mid + 10; by = 20; }

            if (bx && by) {
                highlights.push(
                    <g key={`hb${i}`} style={{ pointerEvents: 'none' }}>
                        <circle cx={bx} cy={by} r={9} fill="#3b82f6" stroke="#fff" strokeWidth={1.5} />
                        <text x={bx} y={by + 3} textAnchor="middle" fontSize={9} fill="#fff" fontWeight="800">{num}</text>
                    </g>
                );
            }
        } else {
            validPts.push(pt);
        }
    });

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', maxWidth: '100%', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff' }}>
            {highlights}{grid}{labels}
            <text x={size - 8} y={mid - 8} textAnchor="end" fontSize={9} fill="#0f172a" fontWeight="800">X</text>
            <text x={mid + 8} y={14} fontSize={9} fill="#0f172a" fontWeight="800">Y</text>
            {validPts.map((pt, i) => {
                const { px, py } = toPx(pt.x, pt.y);
                return (
                    <g key={i}>
                        <circle cx={px} cy={py} r={4.5} fill={pt.color || '#ef4444'} stroke="#fff" strokeWidth={1.5} />
                        {pt.label && <text x={px + 7} y={py - 7} fontSize={10} fill={pt.color || '#ef4444'} fontWeight="800">{pt.label}</text>}
                    </g>
                );
            })}
        </svg>
    );
}

import React from 'react';

// ─── Helpers ───────────────────────────────────────────────────────────────
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (arr) => { const b = [...arr]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

function makeQ(q, correct, wrongs, exp, dia = null, diff = 'easy') {
    const items = shuffle([{ t: correct, c: true }, ...wrongs.map(t => ({ t, c: false }))]);
    return { question: q, options: items.map(x => x.t), correct: items.findIndex(x => x.c), explanation: exp, diagram: dia, difficulty: diff };
}

// ─── Generate a random frequency table ─────────────────────────────────────
function genTable(numClasses = 5, startVal = 0, h = 10, freqRange = [2, 12]) {
    const classes = [];
    for (let i = 0; i < numClasses; i++) {
        const lower = startVal + i * h;
        const upper = lower + h;
        const fi = randInt(freqRange[0], freqRange[1]);
        const xi = (lower + upper) / 2;
        classes.push({ lower, upper, fi, xi, label: `${lower}–${upper}` });
    }
    const totalF = classes.reduce((s, c) => s + c.fi, 0);
    const totalFX = classes.reduce((s, c) => s + c.fi * c.xi, 0);
    // cumulative frequency
    let cf = 0;
    classes.forEach(c => { cf += c.fi; c.cf = cf; });
    return { classes, totalF, totalFX, h };
}

// ─── SVG: Mini Frequency Table ─────────────────────────────────────────────
function TableSVG({ classes, showXi = false, showFiXi = false, showCf = false, color = '#3b82f6' }) {
    const cols = 2 + (showXi ? 1 : 0) + (showFiXi ? 1 : 0) + (showCf ? 1 : 0);
    const colW = Math.min(70, 300 / cols);
    const rowH = 20;
    const headerH = 24;
    const totalH = headerH + classes.length * rowH + 4;
    const totalW = cols * colW + 10;

    return (
        <svg viewBox={`0 0 ${totalW} ${totalH}`} style={{ width: '100%', maxHeight: Math.min(totalH, 180) }}>
            {/* Header */}
            {['Class', 'fi', ...(showXi ? ['xi'] : []), ...(showFiXi ? ['fi·xi'] : []), ...(showCf ? ['cf'] : [])].map((h, i) => (
                <React.Fragment key={i}>
                    <rect x={5 + i * colW} y={0} width={colW - 2} height={headerH - 2} fill={color} rx={4} />
                    <text x={5 + i * colW + colW / 2 - 1} y={15} textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">{h}</text>
                </React.Fragment>
            ))}
            {/* Rows */}
            {classes.map((c, ri) => {
                const vals = [c.label, `${c.fi}`, ...(showXi ? [`${c.xi}`] : []), ...(showFiXi ? [`${c.fi * c.xi}`] : []), ...(showCf ? [`${c.cf}`] : [])];
                return vals.map((v, ci) => (
                    <React.Fragment key={`${ri}-${ci}`}>
                        <rect x={5 + ci * colW} y={headerH + ri * rowH} width={colW - 2} height={rowH - 2} fill={ri % 2 === 0 ? '#f8fafc' : '#fff'} stroke="#e2e8f0" strokeWidth="0.5" rx={2} />
                        <text x={5 + ci * colW + colW / 2 - 1} y={headerH + ri * rowH + 13} textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b">{v}</text>
                    </React.Fragment>
                ));
            })}
        </svg>
    );
}

// ─── SVG: Mini Histogram ───────────────────────────────────────────────────
function HistogramSVG({ classes, highlightIdx = -1, color = '#3b82f6' }) {
    const maxF = Math.max(...classes.map(c => c.fi));
    const barW = Math.min(45, 260 / classes.length);
    const chartH = 90;
    const totalW = classes.length * (barW + 6) + 40;

    return (
        <svg viewBox={`0 0 ${totalW} ${chartH + 35}`} style={{ width: '100%', maxHeight: 120 }}>
            <line x1="25" y1={chartH + 5} x2={totalW - 5} y2={chartH + 5} stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="25" y1="5" x2="25" y2={chartH + 5} stroke="#94a3b8" strokeWidth="1.5" />
            {classes.map((c, i) => {
                const barH = (c.fi / maxF) * (chartH - 10);
                const x = 30 + i * (barW + 6);
                const isHL = i === highlightIdx;
                return (
                    <React.Fragment key={i}>
                        <rect x={x} y={chartH + 5 - barH} width={barW} height={barH} fill={isHL ? '#f59e0b' : `${color}40`} stroke={isHL ? '#d97706' : color} strokeWidth={isHL ? 2.5 : 1.5} rx={3} />
                        <text x={x + barW / 2} y={chartH - barH} textAnchor="middle" fontSize="9" fontWeight="800" fill={isHL ? '#d97706' : color}>{c.fi}</text>
                        <text x={x + barW / 2} y={chartH + 18} textAnchor="middle" fontSize="7" fontWeight="600" fill="#64748b">{c.label}</text>
                    </React.Fragment>
                );
            })}
            {highlightIdx >= 0 && (
                <text x={totalW / 2} y={chartH + 30} textAnchor="middle" fontSize="9" fontWeight="800" fill="#d97706">↑ Modal Class</text>
            )}
        </svg>
    );
}

// ─── SVG: Ogive Curve ──────────────────────────────────────────────────────
function OgiveSVG({ classes, color = '#3b82f6' }) {
    const totalF = classes[classes.length - 1].cf;
    const n = classes.length;
    const chartW = 260, chartH = 100, oX = 35, oY = chartH + 10;

    const points = classes.map((c, i) => {
        const x = oX + ((i + 1) / n) * chartW;
        const y = oY - (c.cf / totalF) * chartH;
        return `${x},${y}`;
    });
    const pathD = `M ${oX},${oY} L ${points.join(' L ')}`;

    return (
        <svg viewBox={`0 0 ${chartW + 50} ${chartH + 35}`} style={{ width: '100%', maxHeight: 130 }}>
            <line x1={oX} y1={oY} x2={oX + chartW} y2={oY} stroke="#94a3b8" strokeWidth="1.5" />
            <line x1={oX} y1="5" x2={oX} y2={oY} stroke="#94a3b8" strokeWidth="1.5" />
            <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" />
            {classes.map((c, i) => {
                const x = oX + ((i + 1) / n) * chartW;
                const y = oY - (c.cf / totalF) * chartH;
                return <circle key={i} cx={x} cy={y} r="3.5" fill={color} />;
            })}
            {/* n/2 line */}
            <line x1={oX} y1={oY - 0.5 * chartH} x2={oX + chartW} y2={oY - 0.5 * chartH} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x={oX + chartW + 3} y={oY - 0.5 * chartH + 4} fontSize="8" fontWeight="800" fill="#ef4444">n/2</text>
            <text x={oX + chartW / 2} y={oY + 15} textAnchor="middle" fontSize="8" fill="#64748b">Upper class boundaries →</text>
            <text x={oX - 5} y={oY / 2 + 10} fontSize="8" fill="#64748b" transform={`rotate(-90,${oX - 8},${oY / 2 + 10})`}>cf →</text>
        </svg>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// SKILL 1: Grouped Data Setup
// ════════════════════════════════════════════════════════════════════════════
export function generateGroupedDataQuestions(mode) {
    const questions = [];
    // Q1: Find class mark
    (() => {
        const l = pick([10, 20, 30, 40, 50]);
        const h = pick([10, 15, 20]);
        const u = l + h;
        const xi = (l + u) / 2;
        questions.push(makeQ(
            `The class mark of the interval ${l}–${u} is:`,
            `$${xi}$`, [`$${l}$`, `$${u}$`, `$${h}$`],
            `Class mark $= \\frac{${l} + ${u}}{2} = ${xi}$.`, null, 'easy'
        ));
    })();
    // Q2: Find class width
    (() => {
        const l = pick([0, 10, 100, 200]);
        const h = pick([10, 15, 20, 25]);
        const u = l + h;
        questions.push(makeQ(
            `The class width of the interval ${l}–${u} is:`,
            `$${h}$`, [`$${u}$`, `$${l}$`, `$${(l + u) / 2}$`],
            `Class width $= ${u} - ${l} = ${h}$.`, null, 'easy'
        ));
    })();
    // Q3: Find Σfi
    (() => {
        const t = genTable(5, 0, 10, [3, 10]);
        questions.push(makeQ(
            `Find $\\Sigma f_i$ from the table below:`,
            `$${t.totalF}$`, [`$${t.totalF + 5}$`, `$${t.totalF - 3}$`, `$${t.classes.length}$`],
            `Sum of all frequencies = $${t.classes.map(c => c.fi).join(' + ')} = ${t.totalF}$.`,
            () => <TableSVG classes={t.classes} color="#3b82f6" />, 'easy'
        ));
    })();
    // Q4: Find class mark for a class in a table
    (() => {
        const t = genTable(5, 10, 10, [2, 8]);
        const idx = pick([0, 1, 2, 3, 4]);
        const c = t.classes[idx];
        questions.push(makeQ(
            `From the table, find the class mark ($x_i$) of the interval ${c.label}:`,
            `$${c.xi}$`, [`$${c.lower}$`, `$${c.upper}$`, `$${c.fi}$`],
            `$x_i = \\frac{${c.lower} + ${c.upper}}{2} = ${c.xi}$.`,
            () => <TableSVG classes={t.classes} color="#0891b2" />, 'easy'
        ));
    })();
    // Q5: Which class has highest frequency
    (() => {
        const t = genTable(5, 0, 10, [2, 15]);
        const maxF = Math.max(...t.classes.map(c => c.fi));
        const modalClass = t.classes.find(c => c.fi === maxF);
        const modalIdx = t.classes.indexOf(modalClass);
        questions.push(makeQ(
            `Which class interval has the highest frequency?`,
            modalClass.label,
            t.classes.filter(c => c !== modalClass).slice(0, 3).map(c => c.label),
            `Highest frequency = ${maxF}, which belongs to class ${modalClass.label}.`,
            () => <HistogramSVG classes={t.classes} highlightIdx={modalIdx} color="#059669" />, 'medium'
        ));
    })();
    // Q6: Lower limit of modal class
    (() => {
        const t = genTable(5, pick([0, 10, 20]), 10, [3, 14]);
        const maxF = Math.max(...t.classes.map(c => c.fi));
        const mc = t.classes.find(c => c.fi === maxF);
        questions.push(makeQ(
            `The lower limit of the modal class is:`,
            `$${mc.lower}$`, [`$${mc.upper}$`, `$${mc.xi}$`, `$${mc.fi}$`],
            `Modal class = ${mc.label} (highest f = ${maxF}). Lower limit = ${mc.lower}.`,
            () => <HistogramSVG classes={t.classes} highlightIdx={t.classes.indexOf(mc)} color="#7c3aed" />, 'medium'
        ));
    })();
    // Q7: Cumulative frequency
    (() => {
        const t = genTable(5, 0, 10, [3, 10]);
        const idx = pick([2, 3, 4]);
        questions.push(makeQ(
            `The cumulative frequency up to class ${t.classes[idx].label} is:`,
            `$${t.classes[idx].cf}$`,
            [`$${t.classes[idx].fi}$`, `$${t.classes[idx].cf + 5}$`, `$${t.classes[idx].cf - 2}$`],
            `cf = $${t.classes.slice(0, idx + 1).map(c => c.fi).join(' + ')} = ${t.classes[idx].cf}$.`,
            () => <TableSVG classes={t.classes} showCf={true} color="#0369a1" />, 'medium'
        ));
    })();
    // Q8: n/2 value
    (() => {
        const t = genTable(5, 0, 10, [4, 12]);
        const nHalf = t.totalF / 2;
        questions.push(makeQ(
            `If $\\Sigma f_i = ${t.totalF}$, then $n/2 =$`,
            `$${nHalf}$`, [`$${t.totalF}$`, `$${Math.floor(nHalf) + 1}$`, `$${t.totalF * 2}$`],
            `$n/2 = ${t.totalF}/2 = ${nHalf}$.`, null, 'medium'
        ));
    })();
    // Q9: Identify median class
    (() => {
        const t = genTable(5, 0, 10, [5, 12]);
        const nHalf = t.totalF / 2;
        const medianClass = t.classes.find(c => c.cf >= nHalf);
        questions.push(makeQ(
            `$\\Sigma f_i = ${t.totalF}$, $n/2 = ${nHalf}$. The median class is:`,
            medianClass.label,
            t.classes.filter(c => c !== medianClass).slice(0, 3).map(c => c.label),
            `The first cf ≥ ${nHalf} is ${medianClass.cf} in class ${medianClass.label}.`,
            () => <TableSVG classes={t.classes} showCf={true} color="#dc2626" />, 'hard'
        ));
    })();
    // Q10: Upper class boundary
    (() => {
        const h = pick([10, 15, 20]);
        const start = pick([0, 5, 10]);
        const t = genTable(5, start, h, [3, 10]);
        const idx = pick([1, 2, 3]);
        questions.push(makeQ(
            `The upper class boundary of ${t.classes[idx].label} is:`,
            `$${t.classes[idx].upper}$`, [`$${t.classes[idx].lower}$`, `$${t.classes[idx].xi}$`, `$${t.classes[idx].upper + h}$`],
            `Upper class boundary = upper limit = ${t.classes[idx].upper}.`, null, 'hard'
        ));
    })();

    if (mode === 'assessment') return questions.slice(0, 10);
    return questions;
}

// ════════════════════════════════════════════════════════════════════════════
// SKILL 2: Mean — Direct Method
// ════════════════════════════════════════════════════════════════════════════
export function generateDirectMeanQuestions(mode) {
    const questions = [];
    for (let q = 0; q < 10; q++) {
        const h = pick([10, 20]);
        const start = pick([0, 10, 100]);
        const nc = pick([4, 5, 6]);
        const t = genTable(nc, start, h, [2, 10]);
        const mean = Math.round((t.totalFX / t.totalF) * 100) / 100;
        const wrongMeans = [
            `$${Math.round(mean + pick([2, 3, 5]))}$`,
            `$${Math.round(mean - pick([2, 3, 4]))}$`,
            `$${Math.round(t.totalFX / nc)}$`
        ];
        const diff = q < 3 ? 'easy' : q < 7 ? 'medium' : 'hard';
        const context = pick(['marks scored by students', 'daily wages of workers', 'weights of apples (kg)', 'ages of patients', 'heights (cm) of plants']);

        questions.push(makeQ(
            `Find the mean of the following data (${context}) using the Direct Method:`,
            `$${mean}$`, wrongMeans,
            `$\\bar{x} = \\frac{\\Sigma f_i x_i}{\\Sigma f_i} = \\frac{${t.totalFX}}{${t.totalF}} = ${mean}$.`,
            () => <TableSVG classes={t.classes} showXi={true} showFiXi={true} color="#059669" />, diff
        ));
    }
    return mode === 'assessment' ? questions.slice(0, 10) : questions;
}

// ════════════════════════════════════════════════════════════════════════════
// SKILL 3: Mean — Assumed Mean Method
// ════════════════════════════════════════════════════════════════════════════
export function generateAssumedMeanQuestions(mode) {
    const questions = [];
    for (let q = 0; q < 10; q++) {
        const h = pick([10, 15, 20]);
        const start = pick([100, 200, 500]);
        const nc = pick([5, 6]);
        const t = genTable(nc, start, h, [3, 12]);
        // Pick assumed mean as middle class mark
        const midIdx = Math.floor(nc / 2);
        const a = t.classes[midIdx].xi;
        // Compute Σfidi
        let sumFD = 0;
        t.classes.forEach(c => { c.di = c.xi - a; c.fidi = c.fi * c.di; sumFD += c.fidi; });
        const mean = Math.round((a + sumFD / t.totalF) * 100) / 100;
        const wrongMeans = [
            `$${Math.round(mean + pick([3, 5, 8]))}$`,
            `$${Math.round(mean - pick([3, 5, 7]))}$`,
            `$${a}$`
        ];
        const diff = q < 3 ? 'easy' : q < 7 ? 'medium' : 'hard';

        questions.push(makeQ(
            `Using the Assumed Mean Method with $a = ${a}$, find the mean:`,
            `$${mean}$`, wrongMeans,
            `$\\Sigma f_i d_i = ${sumFD}$, $\\Sigma f_i = ${t.totalF}$. Mean $= ${a} + \\frac{${sumFD}}{${t.totalF}} = ${mean}$.`,
            () => <TableSVG classes={t.classes} showXi={true} color="#7c3aed" />, diff
        ));
    }
    return mode === 'assessment' ? questions.slice(0, 10) : questions;
}

// ════════════════════════════════════════════════════════════════════════════
// SKILL 4: Mean — Step-Deviation Method
// ════════════════════════════════════════════════════════════════════════════
export function generateStepDeviationQuestions(mode) {
    const questions = [];
    for (let q = 0; q < 10; q++) {
        const h = pick([10, 15, 20, 25]);
        const start = pick([100, 200, 500, 1000]);
        const nc = pick([5, 6]);
        const t = genTable(nc, start, h, [3, 12]);
        const midIdx = Math.floor(nc / 2);
        const a = t.classes[midIdx].xi;
        let sumFU = 0;
        t.classes.forEach(c => { c.di = c.xi - a; c.ui = c.di / h; c.fiui = c.fi * c.ui; sumFU += c.fiui; });
        const mean = Math.round((a + h * (sumFU / t.totalF)) * 100) / 100;
        const wrongMeans = [
            `$${Math.round(mean + pick([5, 10, 15]))}$`,
            `$${Math.round(mean - pick([5, 10, 12]))}$`,
            `$${a}$`
        ];
        const diff = q < 3 ? 'easy' : q < 7 ? 'medium' : 'hard';

        questions.push(makeQ(
            `Using Step-Deviation Method ($a = ${a}$, $h = ${h}$), find the mean:`,
            `$${mean}$`, wrongMeans,
            `$\\Sigma f_i u_i = ${sumFU}$, $\\Sigma f_i = ${t.totalF}$. Mean $= ${a} + ${h} \\times \\frac{${sumFU}}{${t.totalF}} = ${mean}$.`,
            () => <TableSVG classes={t.classes} showXi={true} color="#0369a1" />, diff
        ));
    }
    return mode === 'assessment' ? questions.slice(0, 10) : questions;
}

// ════════════════════════════════════════════════════════════════════════════
// SKILL 5: Mode
// ════════════════════════════════════════════════════════════════════════════
export function generateModeQuestions(mode) {
    const questions = [];
    for (let q = 0; q < 10; q++) {
        const h = pick([10, 15, 20]);
        const start = pick([0, 10, 20, 100]);
        const nc = pick([5, 6]);
        const t = genTable(nc, start, h, [3, 15]);
        // Ensure a clear modal class (make one frequency distinctly highest)
        const boostIdx = randInt(1, nc - 2); // not first or last
        t.classes[boostIdx].fi = Math.max(...t.classes.map(c => c.fi)) + randInt(2, 5);

        const f1 = t.classes[boostIdx].fi;
        const f0 = t.classes[boostIdx - 1].fi;
        const f2 = t.classes[boostIdx + 1].fi;
        const l = t.classes[boostIdx].lower;
        const modeVal = Math.round((l + ((f1 - f0) / (2 * f1 - f0 - f2)) * h) * 100) / 100;

        const wrongModes = [
            `$${Math.round(modeVal + pick([3, 5, 8]))}$`,
            `$${Math.round(modeVal - pick([3, 5, 7]))}$`,
            `$${t.classes[boostIdx].xi}$`
        ];
        const diff = q < 3 ? 'easy' : q < 7 ? 'medium' : 'hard';

        questions.push(makeQ(
            `Find the mode of the following frequency distribution:`,
            `$${modeVal}$`, wrongModes,
            `Modal class = ${t.classes[boostIdx].label} ($f_1=${f1}$). $f_0=${f0}$, $f_2=${f2}$, $l=${l}$, $h=${h}$. Mode $= ${l} + \\frac{${f1}-${f0}}{2(${f1})-${f0}-${f2}} \\times ${h} = ${modeVal}$.`,
            () => <HistogramSVG classes={t.classes} highlightIdx={boostIdx} color="#d97706" />, diff
        ));
    }
    return mode === 'assessment' ? questions.slice(0, 10) : questions;
}

// ════════════════════════════════════════════════════════════════════════════
// SKILL 6: Median
// ════════════════════════════════════════════════════════════════════════════
export function generateMedianQuestions(mode) {
    const questions = [];
    for (let q = 0; q < 10; q++) {
        const h = pick([10, 15, 20]);
        const start = pick([0, 10, 20, 100]);
        const nc = pick([5, 6]);
        const t = genTable(nc, start, h, [4, 14]);
        // Recompute cf
        let cf = 0;
        t.classes.forEach(c => { cf += c.fi; c.cf = cf; });
        const totalF = t.classes[nc - 1].cf;
        const nHalf = totalF / 2;
        const medIdx = t.classes.findIndex(c => c.cf >= nHalf);
        const mc = t.classes[medIdx];
        const cfPrev = medIdx > 0 ? t.classes[medIdx - 1].cf : 0;
        const medianVal = Math.round((mc.lower + ((nHalf - cfPrev) / mc.fi) * h) * 100) / 100;

        const wrongMedians = [
            `$${Math.round(medianVal + pick([3, 5, 8]))}$`,
            `$${Math.round(medianVal - pick([3, 5, 7]))}$`,
            `$${mc.xi}$`
        ];
        const diff = q < 3 ? 'easy' : q < 7 ? 'medium' : 'hard';

        questions.push(makeQ(
            `Find the median of the following grouped data:`,
            `$${medianVal}$`, wrongMedians,
            `$n = ${totalF}$, $n/2 = ${nHalf}$. Median class = ${mc.label}. $l=${mc.lower}$, $cf=${cfPrev}$, $f=${mc.fi}$, $h=${h}$. Median $= ${mc.lower} + \\frac{${nHalf}-${cfPrev}}{${mc.fi}} \\times ${h} = ${medianVal}$.`,
            () => <TableSVG classes={t.classes} showCf={true} color="#dc2626" />, diff
        ));
    }
    return mode === 'assessment' ? questions.slice(0, 10) : questions;
}

// ════════════════════════════════════════════════════════════════════════════
// SKILL 7: Ogive & Graphical Median
// ════════════════════════════════════════════════════════════════════════════
export function generateOgiveQuestions(mode) {
    const questions = [];

    // Conceptual questions about ogives
    questions.push(makeQ(
        `In a "less than" ogive, the x-axis represents:`,
        `Upper class boundaries`, [`Lower class boundaries`, `Frequencies`, `Class marks`],
        `Less than ogive plots cumulative frequency against upper class boundaries.`, null, 'easy'
    ));
    questions.push(makeQ(
        `In a "more than" ogive, the x-axis represents:`,
        `Lower class boundaries`, [`Upper class boundaries`, `Frequencies`, `Class marks`],
        `More than ogive plots cumulative frequency against lower class boundaries.`, null, 'easy'
    ));
    questions.push(makeQ(
        `The intersection of "less than" and "more than" ogives gives:`,
        `Median`, [`Mean`, `Mode`, `Range`],
        `The x-coordinate of the intersection point of both ogives equals the median.`, null, 'easy'
    ));

    // Computation questions
    for (let q = 0; q < 4; q++) {
        const h = pick([10, 20]);
        const start = pick([0, 10, 100]);
        const nc = pick([5, 6]);
        const t = genTable(nc, start, h, [4, 12]);
        let cf = 0;
        t.classes.forEach(c => { cf += c.fi; c.cf = cf; });
        const totalF = t.classes[nc - 1].cf;
        const idx = pick([2, 3, Math.min(4, nc - 1)]);
        const diff = q < 2 ? 'medium' : 'hard';

        questions.push(makeQ(
            `From the ogive below, the cumulative frequency at class boundary ${t.classes[idx].upper} is:`,
            `$${t.classes[idx].cf}$`,
            [`$${t.classes[idx].fi}$`, `$${t.classes[idx].cf + 5}$`, `$${totalF}$`],
            `Reading from the ogive at x = ${t.classes[idx].upper}, cf = ${t.classes[idx].cf}.`,
            () => <OgiveSVG classes={t.classes} color="#6d28d9" />, diff
        ));
    }

    // Find median from ogive
    for (let q = 0; q < 3; q++) {
        const h = pick([10, 20]);
        const start = pick([0, 10]);
        const nc = 5;
        const t = genTable(nc, start, h, [5, 14]);
        let cf = 0;
        t.classes.forEach(c => { cf += c.fi; c.cf = cf; });
        const totalF = t.classes[nc - 1].cf;
        const nHalf = totalF / 2;
        const medIdx = t.classes.findIndex(c => c.cf >= nHalf);
        const mc = t.classes[medIdx];
        const cfPrev = medIdx > 0 ? t.classes[medIdx - 1].cf : 0;
        const medianVal = Math.round((mc.lower + ((nHalf - cfPrev) / mc.fi) * h) * 100) / 100;

        questions.push(makeQ(
            `From the ogive, find the median ($n/2 = ${nHalf}$):`,
            `$${medianVal}$`,
            [`$${Math.round(medianVal + 5)}$`, `$${Math.round(medianVal - 4)}$`, `$${mc.xi}$`],
            `At cf = ${nHalf}, the ogive meets at approximately x = ${medianVal} (median class = ${mc.label}).`,
            () => <OgiveSVG classes={t.classes} color="#0891b2" />, 'hard'
        ));
    }

    return mode === 'assessment' ? questions.slice(0, 10) : questions;
}

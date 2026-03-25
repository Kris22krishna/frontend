// DataHandling — Dynamic Question Generators with SVG Visuals
// Skills: Mean, Range, Mode, Median, Bar Graphs, Double Bar Graphs

const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { let t = b; b = a % b; a = t; } return a; }

function makeQ(question, correctVal, distractors, explanation, svg) {
    const opts = [String(correctVal)];
    for (const d of distractors) {
        const s = String(d);
        if (!opts.includes(s)) opts.push(s);
    }
    while (opts.length < 4) opts.push(String(Number(correctVal) + opts.length * 3 + 1));
    const final = opts.slice(0, 4);
    const shuffled = [...final].sort(() => Math.random() - 0.5);
    return { question, options: shuffled, correct: shuffled.indexOf(final[0]), explanation, svg: svg || null };
}

// ────────────────────────────────────────────────────────────────────────────
// SVG GENERATORS
// ────────────────────────────────────────────────────────────────────────────

const BAR_COLORS = ['#6366f1', '#0891b2', '#f59e0b', '#ec4899', '#10b981', '#8b5cf6', '#ef4444', '#0369a1'];

function generateBarGraphSVG(labels, values, title, xLabel, yLabel) {
    const w = 460, h = 300;
    const padL = 55, padR = 20, padT = 35, padB = 55;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;
    const maxVal = Math.max(...values);
    const niceMax = Math.ceil(maxVal / 5) * 5 + 5;
    const barW = Math.min(40, chartW / labels.length - 12);
    const gap = (chartW - barW * labels.length) / (labels.length + 1);

    let gridLines = '';
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
        const y = padT + chartH - (chartH * i / steps);
        const val = Math.round(niceMax * i / steps);
        gridLines += `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="#e2e8f0" stroke-width="1"/>`;
        gridLines += `<text x="${padL - 8}" y="${y + 4}" text-anchor="end" fill="#64748b" font-size="11" font-family="Inter, sans-serif">${val}</text>`;
    }

    let bars = '';
    labels.forEach((label, i) => {
        const x = padL + gap + i * (barW + gap);
        const barH = (values[i] / niceMax) * chartH;
        const y = padT + chartH - barH;
        const color = BAR_COLORS[i % BAR_COLORS.length];
        bars += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="4" fill="${color}" opacity="0.85"/>`;
        bars += `<text x="${x + barW / 2}" y="${y - 5}" text-anchor="middle" fill="${color}" font-size="11" font-weight="700" font-family="Inter, sans-serif">${values[i]}</text>`;
        bars += `<text x="${x + barW / 2}" y="${h - padB + 16}" text-anchor="middle" fill="#334155" font-size="10" font-weight="600" font-family="Inter, sans-serif">${label}</text>`;
    });

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="max-width:100%;height:auto;background:#fafbfc;border-radius:16px;border:1px solid #e2e8f0">
        <rect width="${w}" height="${h}" rx="16" fill="#fafbfc"/>
        <text x="${w / 2}" y="20" text-anchor="middle" fill="#1e293b" font-size="14" font-weight="800" font-family="Outfit, sans-serif">${title}</text>
        ${gridLines}
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="${padL}" y1="${padT + chartH}" x2="${w - padR}" y2="${padT + chartH}" stroke="#cbd5e1" stroke-width="2"/>
        ${bars}
        <text x="${w / 2}" y="${h - 5}" text-anchor="middle" fill="#64748b" font-size="11" font-weight="600" font-family="Inter, sans-serif">${xLabel}</text>
        <text x="14" y="${h / 2}" text-anchor="middle" fill="#64748b" font-size="11" font-weight="600" font-family="Inter, sans-serif" transform="rotate(-90 14 ${h / 2})">${yLabel}</text>
    </svg>`;
}

function generateDoubleBarGraphSVG(labels, valuesA, valuesB, title, legendA, legendB, xLabel, yLabel) {
    const w = 500, h = 320;
    const padL = 55, padR = 20, padT = 35, padB = 55;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;
    const allVals = [...valuesA, ...valuesB];
    const maxVal = Math.max(...allVals);
    const niceMax = Math.ceil(maxVal / 5) * 5 + 5;
    const pairW = Math.min(60, chartW / labels.length - 16);
    const singleBarW = pairW / 2 - 2;
    const gap = (chartW - pairW * labels.length) / (labels.length + 1);

    let gridLines = '';
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
        const y = padT + chartH - (chartH * i / steps);
        const val = Math.round(niceMax * i / steps);
        gridLines += `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="#e2e8f0" stroke-width="1"/>`;
        gridLines += `<text x="${padL - 8}" y="${y + 4}" text-anchor="end" fill="#64748b" font-size="11" font-family="Inter, sans-serif">${val}</text>`;
    }

    const colA = '#6366f1', colB = '#f59e0b';
    let bars = '';
    labels.forEach((label, i) => {
        const x = padL + gap + i * (pairW + gap);
        const hA = (valuesA[i] / niceMax) * chartH;
        const yA = padT + chartH - hA;
        bars += `<rect x="${x}" y="${yA}" width="${singleBarW}" height="${hA}" rx="3" fill="${colA}" opacity="0.8"/>`;
        bars += `<text x="${x + singleBarW / 2}" y="${yA - 4}" text-anchor="middle" fill="${colA}" font-size="9" font-weight="700" font-family="Inter">${valuesA[i]}</text>`;

        const xB = x + singleBarW + 4;
        const hB = (valuesB[i] / niceMax) * chartH;
        const yB = padT + chartH - hB;
        bars += `<rect x="${xB}" y="${yB}" width="${singleBarW}" height="${hB}" rx="3" fill="${colB}" opacity="0.8"/>`;
        bars += `<text x="${xB + singleBarW / 2}" y="${yB - 4}" text-anchor="middle" fill="${colB}" font-size="9" font-weight="700" font-family="Inter">${valuesB[i]}</text>`;

        bars += `<text x="${x + pairW / 2}" y="${h - padB + 16}" text-anchor="middle" fill="#334155" font-size="10" font-weight="600" font-family="Inter, sans-serif">${label}</text>`;
    });

    // Legend
    const legend = `
        <rect x="${w - 170}" y="8" width="155" height="22" rx="6" fill="white" stroke="#e2e8f0"/>
        <rect x="${w - 163}" y="13" width="10" height="10" rx="2" fill="${colA}"/>
        <text x="${w - 150}" y="22" fill="#334155" font-size="10" font-weight="600" font-family="Inter">${legendA}</text>
        <rect x="${w - 95}" y="13" width="10" height="10" rx="2" fill="${colB}"/>
        <text x="${w - 82}" y="22" fill="#334155" font-size="10" font-weight="600" font-family="Inter">${legendB}</text>
    `;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="max-width:100%;height:auto;background:#fafbfc;border-radius:16px;border:1px solid #e2e8f0">
        <rect width="${w}" height="${h}" rx="16" fill="#fafbfc"/>
        <text x="${w / 2}" y="22" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="800" font-family="Outfit, sans-serif">${title}</text>
        ${gridLines}
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="${padL}" y1="${padT + chartH}" x2="${w - padR}" y2="${padT + chartH}" stroke="#cbd5e1" stroke-width="2"/>
        ${bars}
        ${legend}
        <text x="${w / 2}" y="${h - 5}" text-anchor="middle" fill="#64748b" font-size="11" font-weight="600" font-family="Inter, sans-serif">${xLabel}</text>
        <text x="14" y="${h / 2}" text-anchor="middle" fill="#64748b" font-size="11" font-weight="600" font-family="Inter, sans-serif" transform="rotate(-90 14 ${h / 2})">${yLabel}</text>
    </svg>`;
}

// ────────────────────────────────────────────────────────────────────────────
// SKILL 1: ARITHMETIC MEAN
// ────────────────────────────────────────────────────────────────────────────

export function generateMeanQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const n = R(3, 6);
        const vals = Array.from({ length: n }, () => R(5, 40));
        const sum = vals.reduce((a, b) => a + b, 0);
        const mean = sum / n;
        const meanStr = Number.isInteger(mean) ? `${mean}` : `${mean.toFixed(2)}`;
        const contexts = [
            `A student scored $${vals.join(', ')}$ in ${n} tests. Find the mean.`,
            `The temperatures recorded over ${n} days were $${vals.join(', ')}°C$. Find the average temperature.`,
            `Find the mean of: $${vals.join(', ')}$`,
            `${n} friends spent $${vals.join(', ')}$ rupees. What is the average spending?`,
        ];
        qs.push(makeQ(
            contexts[i % contexts.length],
            meanStr,
            [
                `${Math.round(mean + R(2, 5))}`, `${Math.round(mean - R(2, 5))}`, `${sum}`
            ],
            `Sum $= ${vals.join(' + ')} = ${sum}$. Mean $= \\frac{${sum}}{${n}} = ${meanStr}$.`
        ));
    }
    return qs;
}

export function generateMeanAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            // Find missing value given the mean
            const n = R(3, 5);
            const vals = Array.from({ length: n - 1 }, () => R(5, 30));
            const targetMean = R(10, 25);
            const missing = targetMean * n - vals.reduce((a, b) => a + b, 0);
            if (missing > 0) {
                qs.push(makeQ(
                    `The mean of ${n} numbers is $${targetMean}$. If ${n - 1} of them are $${vals.join(', ')}$, find the missing number.`,
                    `${missing}`,
                    [`${missing + R(2, 5)}`, `${missing - R(1, 4)}`, `${targetMean}`],
                    `Total needed $= ${targetMean} \\times ${n} = ${targetMean * n}$. Sum of known $= ${vals.reduce((a, b) => a + b, 0)}$. Missing $= ${targetMean * n} - ${vals.reduce((a, b) => a + b, 0)} = ${missing}$.`
                ));
            } else {
                const nv = Array.from({ length: 4 }, () => R(5, 30));
                const s = nv.reduce((a, b) => a + b, 0);
                const m = s / 4;
                qs.push(makeQ(
                    `Find the mean of $${nv.join(', ')}$.`,
                    Number.isInteger(m) ? `${m}` : `${m.toFixed(2)}`,
                    [`${Math.round(m + 3)}`, `${Math.round(m - 2)}`, `${s}`],
                    `Sum $= ${s}$. Mean $= \\frac{${s}}{4} = ${Number.isInteger(m) ? m : m.toFixed(2)}$.`
                ));
            }
        } else {
            const concepts = [
                makeQ('The mean is also called:', 'Arithmetic Average', ['Mode', 'Median', 'Range'], 'Mean is just another name for the arithmetic average.'),
                makeQ('If all values in a dataset are equal to $k$, the mean is:', '$k$', ['$0$', '$2k$', '$k/n$'], 'When all values are the same, the average is that same value.'),
                makeQ('The mean of the first 5 natural numbers ($1, 2, 3, 4, 5$) is:', '$3$', ['$2.5$', '$5$', '$15$'], 'Sum $= 15$. Mean $= 15/5 = 3$.'),
                makeQ('Adding a value greater than the current mean will:', 'Increase the mean', ['Decrease the mean', 'Keep it the same', 'Double it'], 'A value above the average pulls the mean upward.'),
                makeQ('The mean of $10, 20, 30, 40, 50$ is:', '$30$', ['$25$', '$35$', '$150$'], 'Sum $= 150$, Mean $= 150/5 = 30$.'),
            ];
            qs.push(concepts[i - 5]);
        }
    }
    return qs;
}

// ────────────────────────────────────────────────────────────────────────────
// SKILL 2: RANGE
// ────────────────────────────────────────────────────────────────────────────

export function generateRangeQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const n = R(4, 7);
        const vals = Array.from({ length: n }, () => R(3, 50));
        const mx = Math.max(...vals);
        const mn = Math.min(...vals);
        const range = mx - mn;
        const contexts = [
            `Find the range of: $${vals.join(', ')}$`,
            `The heights (in cm) of ${n} students are $${vals.join(', ')}$. Find the range.`,
            `Marks obtained by ${n} students: $${vals.join(', ')}$. What is the range?`,
        ];
        qs.push(makeQ(
            contexts[i % contexts.length],
            `${range}`,
            [`${range + R(1, 5)}`, `${range - R(1, 3)}`, `${mx}`],
            `Maximum $= ${mx}$, Minimum $= ${mn}$. Range $= ${mx} - ${mn} = ${range}$.`
        ));
    }
    return qs;
}

export function generateRangeAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 6) {
            const n = R(5, 8);
            const vals = Array.from({ length: n }, () => R(10, 80));
            const mx = Math.max(...vals);
            const mn = Math.min(...vals);
            qs.push(makeQ(
                `Ages of ${n} teachers: $${vals.join(', ')}$. What is the range of ages?`,
                `${mx - mn}`,
                [`${mx}`, `${mn}`, `${mx + mn}`],
                `Range $= ${mx} - ${mn} = ${mx - mn}$.`
            ));
        } else {
            const concepts = [
                makeQ('Range measures:', 'The spread of data', ['The average', 'The most frequent value', 'The middle value'], 'Range = Highest − Lowest, indicating how spread out the data is.'),
                makeQ('If the range is 0, it means:', 'All values are equal', ['All values are 0', 'There is no data', 'The mean is 0'], 'Range = 0 implies max = min, so every value is the same.'),
                makeQ('Adding an outlier to a dataset will:', 'Increase the range', ['Decrease the range', 'Keep the range the same', 'Make range negative'], 'An outlier extends the highest or lowest value, increasing the gap.'),
                makeQ('The range of $77, 77, 77, 77$ is:', '$0$', ['$77$', '$308$', '$4$'], 'All values identical → Range = 77 − 77 = 0.'),
            ];
            qs.push(concepts[i - 6]);
        }
    }
    return qs;
}

// ────────────────────────────────────────────────────────────────────────────
// SKILL 3: MODE
// ────────────────────────────────────────────────────────────────────────────

export function generateModeQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const modeVal = R(1, 15);
        const n = R(6, 9);
        const vals = [modeVal, modeVal, modeVal];
        while (vals.length < n) {
            let v = R(1, 20);
            if (v !== modeVal) vals.push(v);
        }
        const shuffled = [...vals].sort(() => Math.random() - 0.5);
        const contexts = [
            `Find the mode of: $${shuffled.join(', ')}$`,
            `Shoe sizes sold today: $${shuffled.join(', ')}$. What is the most popular size?`,
            `Goals scored in ${n} matches: $${shuffled.join(', ')}$. Find the mode.`,
        ];
        qs.push(makeQ(
            contexts[i % contexts.length],
            `${modeVal}`,
            [
                `${modeVal + R(1, 4)}`, `${modeVal - R(1, 3)}`,
                `${shuffled.find(v => v !== modeVal) || modeVal + 5}`
            ],
            `$${modeVal}$ appears 3 times, more than any other value. So mode $= ${modeVal}$.`
        ));
    }
    return qs;
}

export function generateModeAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            const modeVal = R(1, 20);
            const n = R(7, 10);
            const vals = [modeVal, modeVal, modeVal, modeVal];
            while (vals.length < n) {
                let v = R(1, 25);
                if (v !== modeVal) vals.push(v);
            }
            const shuffled = [...vals].sort(() => Math.random() - 0.5);
            qs.push(makeQ(
                `A survey result: $${shuffled.join(', ')}$. Find the mode.`,
                `${modeVal}`,
                [`${modeVal + 2}`, `${Math.round(shuffled.reduce((a, b) => a + b, 0) / n)}`, `${shuffled[0] === modeVal ? shuffled[n - 1] : shuffled[0]}`],
                `$${modeVal}$ appears ${vals.filter(v => v === modeVal).length} times — the highest frequency.`
            ));
        } else {
            const concepts = [
                makeQ('A dataset with two modes is called:', 'Bimodal', ['Unimodal', 'Trimodal', 'Amodal'], 'Bi = two. A bimodal dataset has two values sharing the highest frequency.'),
                makeQ('Which measure works for non-numeric data (e.g., favourite colour)?', 'Mode', ['Mean', 'Median', 'Range'], 'You cannot add or sort colours, but you can count which appears most.'),
                makeQ('The mode of $5, 8, 3, 2, 7$ (all different) is:', 'No mode', ['$5$', '$3$', '$7$'], 'When no value repeats, the dataset has no mode.'),
                makeQ('In $1, 2, 2, 3, 3, 4$, the mode is:', '$2$ and $3$', ['$2$', '$3$', '$4$'], 'Both 2 and 3 appear twice (highest frequency). The data is bimodal.'),
                makeQ('Mode is based on:', 'Frequency', ['Sum', 'Position', 'Difference'], 'Mode is the value with the highest frequency (most occurrences).'),
            ];
            qs.push(concepts[i - 5]);
        }
    }
    return qs;
}

// ────────────────────────────────────────────────────────────────────────────
// SKILL 4: MEDIAN
// ────────────────────────────────────────────────────────────────────────────

export function generateMedianQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            // Odd count
            const n = [3, 5, 7][R(0, 2)];
            const vals = Array.from({ length: n }, () => R(2, 40));
            const sorted = [...vals].sort((a, b) => a - b);
            const median = sorted[Math.floor(n / 2)];
            qs.push(makeQ(
                `Find the median of: $${vals.join(', ')}$`,
                `${median}`,
                [`${sorted[0]}`, `${sorted[n - 1]}`, `${Math.round(vals.reduce((a, b) => a + b, 0) / n)}`],
                `Sorted: $${sorted.join(', ')}$. Middle value (position ${Math.ceil(n / 2)}) $= ${median}$.`
            ));
        } else {
            // Even count
            const n = [4, 6][R(0, 1)];
            const vals = Array.from({ length: n }, () => R(2, 40));
            const sorted = [...vals].sort((a, b) => a - b);
            const mid1 = sorted[n / 2 - 1];
            const mid2 = sorted[n / 2];
            const median = (mid1 + mid2) / 2;
            const medStr = Number.isInteger(median) ? `${median}` : `${median.toFixed(1)}`;
            qs.push(makeQ(
                `Find the median of: $${vals.join(', ')}$`,
                medStr,
                [`${mid1}`, `${mid2}`, `${Math.round(vals.reduce((a, b) => a + b, 0) / n)}`],
                `Sorted: $${sorted.join(', ')}$. Two middle values: $${mid1}$ and $${mid2}$. Median $= \\frac{${mid1} + ${mid2}}{2} = ${medStr}$.`
            ));
        }
    }
    return qs;
}

export function generateMedianAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            const n = R(5, 9);
            const vals = Array.from({ length: n }, () => R(5, 50));
            const sorted = [...vals].sort((a, b) => a - b);
            let median, medStr;
            if (n % 2 === 1) {
                median = sorted[Math.floor(n / 2)];
                medStr = `${median}`;
            } else {
                const m1 = sorted[n / 2 - 1], m2 = sorted[n / 2];
                median = (m1 + m2) / 2;
                medStr = Number.isInteger(median) ? `${median}` : `${median.toFixed(1)}`;
            }
            qs.push(makeQ(
                `Heights of ${n} students (cm): $${vals.join(', ')}$. Find the median height.`,
                medStr,
                [`${sorted[0]}`, `${sorted[n - 1]}`, `${Math.round(vals.reduce((a, b) => a + b, 0) / n)}`],
                `Sorted: $${sorted.join(', ')}$. Median $= ${medStr}$.`
            ));
        } else {
            const concepts = [
                makeQ('To find the median, you must first:', 'Arrange data in order', ['Find the sum', 'Count the mode', 'Draw a graph'], 'Median requires sorted data to identify the middle value.'),
                makeQ('The median of $1, 2, 3, 4$ is:', '$2.5$', ['$2$', '$3$', '$10$'], 'Even count: average of 2nd and 3rd values = $(2+3)/2 = 2.5$.'),
                makeQ('Median is not affected by:', 'Extreme values (outliers)', ['The number of values', 'The order of values', 'Whether data is sorted'], 'Unlike the mean, the median stays the same when outliers change.'),
                makeQ('For 11 observations, the median is the:', '6th value', ['5th value', '7th value', '11th value'], 'Position $= (11+1)/2 = 6$th value in sorted data.'),
                makeQ('The median of $3, 3, 3, 3, 3$ is:', '$3$', ['$0$', '$15$', '$5$'], 'All values are 3, so the middle value is also 3.'),
            ];
            qs.push(concepts[i - 5]);
        }
    }
    return qs;
}

// ────────────────────────────────────────────────────────────────────────────
// SKILL 5: BAR GRAPHS (with SVG)
// ────────────────────────────────────────────────────────────────────────────

const SPORT_NAMES = ['Cricket', 'Football', 'Tennis', 'Hockey', 'Basketball', 'Badminton'];
const FRUIT_NAMES = ['Apple', 'Banana', 'Mango', 'Orange', 'Grapes', 'Cherry'];
const SUBJECT_NAMES = ['Math', 'Science', 'English', 'Hindi', 'History'];
const CITY_NAMES = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Pune'];

export function generateBarGraphQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const categorySet = [SPORT_NAMES, FRUIT_NAMES, SUBJECT_NAMES, CITY_NAMES][R(0, 3)];
        const nCat = R(4, Math.min(6, categorySet.length));
        const labels = categorySet.slice(0, nCat);
        const values = labels.map(() => R(8, 45));
        const maxVal = Math.max(...values);
        const minVal = Math.min(...values);
        const maxLabel = labels[values.indexOf(maxVal)];
        const minLabel = labels[values.indexOf(minVal)];
        const total = values.reduce((s, v) => s + v, 0);

        const titleChoices = ['Favourite Sports', 'Favourite Fruits', 'Students per Subject', 'Population (thousands)'];
        const title = titleChoices[R(0, 3)];
        const svg = generateBarGraphSVG(labels, values, title, 'Category', 'Count');

        const questionTypes = [
            { q: `From the bar graph, which category has the highest value?`, a: maxLabel, d: [minLabel, labels[R(0, nCat - 1)], labels[(values.indexOf(maxVal) + 1) % nCat]], e: `The tallest bar is ${maxLabel} with a value of ${maxVal}.` },
            { q: `From the bar graph, which category has the lowest value?`, a: minLabel, d: [maxLabel, labels[R(0, nCat - 1)], labels[(values.indexOf(minVal) + 1) % nCat]], e: `The shortest bar is ${minLabel} with a value of ${minVal}.` },
            { q: `From the bar graph, what is the value for ${maxLabel}?`, a: `${maxVal}`, d: [`${maxVal + 5}`, `${maxVal - 3}`, `${minVal}`], e: `The bar for ${maxLabel} reaches ${maxVal} on the y-axis.` },
            { q: `From the bar graph, what is the total of all categories?`, a: `${total}`, d: [`${total + R(5, 15)}`, `${total - R(5, 10)}`, `${maxVal}`], e: `Total $= ${values.join(' + ')} = ${total}$.` },
            { q: `From the bar graph, what is the difference between the highest and lowest values?`, a: `${maxVal - minVal}`, d: [`${maxVal}`, `${minVal}`, `${total}`], e: `Difference $= ${maxVal} - ${minVal} = ${maxVal - minVal}$.` },
        ];
        const qt = questionTypes[i % questionTypes.length];
        qs.push(makeQ(qt.q, qt.a, qt.d, qt.e, svg));
    }
    return qs;
}

export function generateBarGraphAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 6) {
            const labels = SUBJECT_NAMES.slice(0, R(4, 5));
            const values = labels.map(() => R(10, 50));
            const maxIdx = values.indexOf(Math.max(...values));
            const minIdx = values.indexOf(Math.min(...values));
            const svg = generateBarGraphSVG(labels, values, 'Marks Scored in Subjects', 'Subject', 'Marks');

            const types = [
                { q: 'Which subject has the highest marks?', a: labels[maxIdx], d: [labels[minIdx], labels[(maxIdx + 1) % labels.length], labels[(maxIdx + 2) % labels.length]], e: `${labels[maxIdx]} has the tallest bar at ${values[maxIdx]} marks.` },
                { q: 'Which subject has the least marks?', a: labels[minIdx], d: [labels[maxIdx], labels[(minIdx + 1) % labels.length], labels[(minIdx + 2) % labels.length]], e: `${labels[minIdx]} has the shortest bar at ${values[minIdx]} marks.` },
                { q: `How many marks were scored in ${labels[0]}?`, a: `${values[0]}`, d: [`${values[0] + 5}`, `${values[1]}`, `${values[0] - 3}`], e: `The bar for ${labels[0]} reaches ${values[0]}.` },
                { q: `What is the difference in marks between ${labels[maxIdx]} and ${labels[minIdx]}?`, a: `${values[maxIdx] - values[minIdx]}`, d: [`${values[maxIdx]}`, `${values[minIdx]}`, `${values[maxIdx] + values[minIdx]}`], e: `Difference $= ${values[maxIdx]} - ${values[minIdx]} = ${values[maxIdx] - values[minIdx]}$.` },
                { q: 'How many subjects are shown in the bar graph?', a: `${labels.length}`, d: [`${labels.length + 1}`, `${labels.length - 1}`, `${Math.max(...values)}`], e: `Count the number of bars: ${labels.length} subjects.` },
                { q: `What is the total marks across all subjects?`, a: `${values.reduce((a, b) => a + b, 0)}`, d: [`${values.reduce((a, b) => a + b, 0) + 10}`, `${Math.max(...values)}`, `${values.reduce((a, b) => a + b, 0) - 8}`], e: `Total $= ${values.join(' + ')} = ${values.reduce((a, b) => a + b, 0)}$.` },
            ];
            qs.push(makeQ(types[i].q, types[i].a, types[i].d, types[i].e, svg));
        } else {
            const concepts = [
                makeQ('In a bar graph, all bars must have:', 'Equal width', ['Equal height', 'Different widths', 'No gaps'], 'Bar graphs require uniform width for fair comparison; height represents the data.'),
                makeQ('The y-axis in a bar graph usually represents:', 'Frequency or Value', ['Category names', 'Bar width', 'Colour of bars'], 'The vertical axis shows the measured quantity (frequency, count, value, etc.).'),
                makeQ('Gaps between bars in a bar graph indicate:', 'The data is categorical (discrete)', ['Missing data', 'The graph is wrong', 'Continuous data'], 'Gaps show that each bar represents a separate, distinct category.'),
                makeQ('A bar graph is best for:', 'Comparing values across categories', ['Showing continuous change over time', 'Calculating mean', 'Finding median'], 'Bar graphs excel at visually comparing discrete categories.'),
            ];
            qs.push(concepts[i - 6]);
        }
    }
    return qs;
}

// ────────────────────────────────────────────────────────────────────────────
// SKILL 6: DOUBLE BAR GRAPHS (with SVG)
// ────────────────────────────────────────────────────────────────────────────

export function generateDoubleBarQuestions() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        const labels = SUBJECT_NAMES.slice(0, R(4, 5));
        const valA = labels.map(() => R(40, 90));
        const valB = labels.map(() => R(40, 90));
        const svg = generateDoubleBarGraphSVG(labels, valA, valB, 'Term 1 vs Term 2 Marks', 'Term 1', 'Term 2', 'Subject', 'Marks');

        const maxAIdx = valA.indexOf(Math.max(...valA));
        const maxBIdx = valB.indexOf(Math.max(...valB));
        const diffSubj = R(0, labels.length - 1);
        const diff = Math.abs(valA[diffSubj] - valB[diffSubj]);

        const types = [
            { q: `In which subject were the Term 1 marks highest?`, a: labels[maxAIdx], d: [labels[(maxAIdx + 1) % labels.length], labels[(maxAIdx + 2) % labels.length], labels[maxBIdx]], e: `${labels[maxAIdx]} has the tallest purple bar (Term 1) at ${valA[maxAIdx]}.` },
            { q: `In which subject were the Term 2 marks highest?`, a: labels[maxBIdx], d: [labels[(maxBIdx + 1) % labels.length], labels[maxAIdx], labels[(maxBIdx + 2) % labels.length]], e: `${labels[maxBIdx]} has the tallest yellow bar (Term 2) at ${valB[maxBIdx]}.` },
            { q: `What is the difference in ${labels[diffSubj]} marks between Term 1 and Term 2?`, a: `${diff}`, d: [`${diff + R(2, 5)}`, `${valA[diffSubj]}`, `${valB[diffSubj]}`], e: `Difference $= |${valA[diffSubj]} - ${valB[diffSubj]}| = ${diff}$.` },
            { q: `In ${labels[0]}, which term had higher marks?`, a: valA[0] >= valB[0] ? 'Term 1' : 'Term 2', d: [valA[0] >= valB[0] ? 'Term 2' : 'Term 1', 'Both equal', 'Cannot determine'], e: `${labels[0]}: Term 1 = ${valA[0]}, Term 2 = ${valB[0]}. ${valA[0] >= valB[0] ? 'Term 1' : 'Term 2'} is higher.` },
            { q: `What are the Term 2 marks in ${labels[labels.length - 1]}?`, a: `${valB[labels.length - 1]}`, d: [`${valA[labels.length - 1]}`, `${valB[labels.length - 1] + 5}`, `${valB[labels.length - 1] - 3}`], e: `The yellow bar (Term 2) for ${labels[labels.length - 1]} shows ${valB[labels.length - 1]}.` },
        ];
        const qt = types[i % types.length];
        qs.push(makeQ(qt.q, qt.a, qt.d, qt.e, svg));
    }
    return qs;
}

export function generateDoubleBarAssessment() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        if (i < 6) {
            const labels = CITY_NAMES.slice(0, R(4, 5));
            const valA = labels.map(() => R(15, 45));
            const valB = labels.map(() => R(15, 45));
            const svg = generateDoubleBarGraphSVG(labels, valA, valB, 'Rainfall: 2024 vs 2025', '2024', '2025', 'City', 'Rainfall (mm)');

            const totalA = valA.reduce((s, v) => s + v, 0);
            const totalB = valB.reduce((s, v) => s + v, 0);
            const randIdx = R(0, labels.length - 1);

            const types = [
                { q: `Which city had the most rainfall in 2024?`, a: labels[valA.indexOf(Math.max(...valA))], d: [labels[(valA.indexOf(Math.max(...valA)) + 1) % labels.length], labels[valB.indexOf(Math.max(...valB))], labels[(valA.indexOf(Math.max(...valA)) + 2) % labels.length]], e: `The tallest purple bar (2024) is for ${labels[valA.indexOf(Math.max(...valA))]}.` },
                { q: `What is the total rainfall across all cities in 2025?`, a: `${totalB}`, d: [`${totalA}`, `${totalB + 10}`, `${totalB - 8}`], e: `Total 2025 $= ${valB.join(' + ')} = ${totalB}$.` },
                { q: `In ${labels[randIdx]}, how much more/less rain fell in 2025 vs 2024?`, a: `${Math.abs(valA[randIdx] - valB[randIdx])}`, d: [`${valA[randIdx]}`, `${valB[randIdx]}`, `${valA[randIdx] + valB[randIdx]}`], e: `Difference $= |${valA[randIdx]} - ${valB[randIdx]}| = ${Math.abs(valA[randIdx] - valB[randIdx])}$.` },
                { q: `Which year had more total rainfall?`, a: totalA >= totalB ? '2024' : '2025', d: [totalA >= totalB ? '2025' : '2024', 'Both equal', 'Cannot tell'], e: `2024 total $= ${totalA}$, 2025 total $= ${totalB}$. ${totalA >= totalB ? '2024' : '2025'} had more.` },
                { q: `How many cities are compared in this graph?`, a: `${labels.length}`, d: [`${labels.length + 1}`, `${labels.length - 1}`, `2`], e: `Count the paired bar groups: ${labels.length} cities.` },
                { q: `In ${labels[0]}, what was the 2024 rainfall?`, a: `${valA[0]}`, d: [`${valB[0]}`, `${valA[0] + 5}`, `${valA[0] - 3}`], e: `The purple bar (2024) for ${labels[0]} shows ${valA[0]} mm.` },
            ];
            qs.push(makeQ(types[i].q, types[i].a, types[i].d, types[i].e, svg));
        } else {
            const concepts = [
                makeQ('A double bar graph needs:', 'A legend', ['Only one colour', 'No labels', 'Overlapping bars'], 'Two datasets require a legend to identify which bar belongs to which set.'),
                makeQ('Double bar graphs are used to:', 'Compare two related datasets', ['Find the mean', 'Show continuous data', 'Calculate the range'], 'They place paired bars side-by-side for visual comparison.'),
                makeQ('In a double bar graph, the two bars for each category should:', 'Be side-by-side', ['Overlap completely', 'Be in different graphs', 'Be stacked on top'], 'Paired bars sit adjacent for easy comparison within each category.'),
                makeQ('The gap between bar-pairs should be:', 'Wider than the gap within a pair', ['The same as within a pair', 'Zero', 'Random'], 'Wider inter-group gaps visually separate the categories from each other.'),
            ];
            qs.push(concepts[i - 6]);
        }
    }
    return qs;
}

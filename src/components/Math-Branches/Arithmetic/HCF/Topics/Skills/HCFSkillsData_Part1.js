function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffle(arr) { let c = arr.length, r; while (c !== 0) { r = Math.floor(Math.random() * c); c--; [arr[c], arr[r]] = [arr[r], arr[c]]; } return arr; }
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

const mcq = (question, correctAnswer, distractors, explanation = "", svg = "") => {
    const options = [correctAnswer, ...distractors];
    const shuffled = shuffle([...options]);
    const q = {
        question,
        options: shuffled,
        correct: shuffled.indexOf(correctAnswer),
        explanation,
        type: "mcq"
    };
    if (svg) q.svg = svg;
    return q;
};

const interactive_division = (question, correctAnswer, a, b, mode, explanation = "") => {
    return {
        question,
        options: [correctAnswer.toString()],
        correct: 0,
        explanation,
        type: "interactive-division",
        a, b, mode
    };
};

// Build L-shape division SVG for HCF using repeated division (Euclidean algorithm visualization)
function buildHCFDivisionSVG(a, b) {
    // Get prime factors of both numbers
    function primeFactors(n) {
        const factors = [];
        let d = 2;
        while (n > 1) {
            while (n % d === 0) {
                factors.push(d);
                n /= d;
            }
            d++;
        }
        return factors;
    }

    const fA = primeFactors(a);
    const fB = primeFactors(b);
    // Find common prime factors
    const countA = {};
    const countB = {};
    fA.forEach(p => countA[p] = (countA[p] || 0) + 1);
    fB.forEach(p => countB[p] = (countB[p] || 0) + 1);

    const commonPrimes = [];
    for (const p in countA) {
        if (countB[p]) {
            const min = Math.min(countA[p], countB[p]);
            for (let i = 0; i < min; i++) commonPrimes.push(parseInt(p));
        }
    }

    // Build rows: each row divides both numbers by a common prime
    const rows = [];
    let curA = a, curB = b;
    for (const p of commonPrimes) {
        rows.push({ divisor: p, numA: curA, numB: curB });
        curA /= p;
        curB /= p;
    }
    rows.push({ divisor: null, numA: curA, numB: curB }); // final row (remainders)

    const rowH = 32;
    const topPad = 10;
    const h = topPad + rows.length * rowH + 10;
    const w = 200;
    const divCol = 40;   // x for divisor column
    const lineX = 65;    // x for the vertical line
    const numAx = 90;    // x for first number
    const numBx = 145;   // x for second number

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" style="max-width:220px;font-family:'Inter',system-ui,sans-serif;">`;
    // Title badge
    svgContent += `<text x="${w/2}" y="${topPad}" text-anchor="middle" font-size="10" font-weight="700" fill="#64748b" letter-spacing="1">DIVISION METHOD</text>`;

    const startY = topPad + 8;

    rows.forEach((row, idx) => {
        const y = startY + idx * rowH;

        if (row.divisor !== null) {
            // Divisor on the left
            svgContent += `<text x="${divCol}" y="${y + 22}" text-anchor="middle" font-size="15" font-weight="800" fill="#7c3aed">${row.divisor}</text>`;
            // Horizontal line under this row
            svgContent += `<line x1="${lineX - 5}" y1="${y + rowH}" x2="${w - 10}" y2="${y + rowH}" stroke="#cbd5e1" stroke-width="1.5"/>`;
        }

        // Numbers
        const numColor = row.divisor === null ? '#059669' : '#1e293b';
        const numWeight = row.divisor === null ? '900' : '700';
        svgContent += `<text x="${numAx}" y="${y + 22}" text-anchor="middle" font-size="15" font-weight="${numWeight}" fill="${numColor}">${row.numA}</text>`;
        svgContent += `<text x="${numBx}" y="${y + 22}" text-anchor="middle" font-size="15" font-weight="${numWeight}" fill="${numColor}">${row.numB}</text>`;
    });

    // Vertical L-shape line
    svgContent += `<line x1="${lineX}" y1="${startY + 4}" x2="${lineX}" y2="${startY + (rows.length - 1) * rowH + 4}" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round"/>`;
    // Horizontal line at top
    svgContent += `<line x1="${lineX}" y1="${startY + 4}" x2="${w - 10}" y2="${startY + 4}" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round"/>`;

    // HCF label at bottom
    const hcfVal = gcd(a, b);
    const labelY = startY + rows.length * rowH + 4;
    svgContent += `<text x="${w/2}" y="${labelY}" text-anchor="middle" font-size="11" font-weight="800" fill="#7c3aed">HCF = ${commonPrimes.length > 0 ? commonPrimes.join(' × ') + ' = ' : ''}${hcfVal}</text>`;

    svgContent += `</svg>`;
    return svgContent;
}

// ------ Skill 1: Find HCF ------
export function genSkill1Q() {
    const questions = [];
    const used = new Set();
    for (let i = 0; i < 10; i++) {
        let a, b, key;
        do {
            a = getRandomInt(6, 48);
            b = getRandomInt(6, 48);
            while (a === b) b = getRandomInt(6, 48);
            key = `${Math.min(a,b)}-${Math.max(a,b)}`;
        } while (used.has(key));
        used.add(key);

        const ans = gcd(a, b);
        const svg = buildHCFDivisionSVG(a, b);
        const expl = `<div style="margin-bottom: 12px; display: flex; justify-content: center;">${svg}</div>The HCF of ${a} and ${b} is ${ans}. Divide both by common prime factors until no common factor remains.`;

        questions.push(interactive_division(
            `Find the HCF of **${a}** and **${b}** using the L-shape division method.`,
            ans.toString(),
            a, b, 'hcf',
            expl
        ));
    }
    return questions;
}

export function genSkill1A() {
    const questions = [];
    const used = new Set();
    for (let i = 0; i < 10; i++) {
        let a, b, key;
        do {
            a = getRandomInt(10, 60);
            b = getRandomInt(10, 60);
            while (a === b) b = getRandomInt(10, 60);
            key = `${Math.min(a,b)}-${Math.max(a,b)}`;
        } while (used.has(key));
        used.add(key);

        const ans = gcd(a, b);
        const svg = buildHCFDivisionSVG(a, b);
        const expl = `<div style="margin-bottom: 12px; display: flex; justify-content: center;">${svg}</div>The HCF of ${a} and ${b} is ${ans}. Multiply the common prime divisors on the left column.`;

        questions.push(interactive_division(
            `Evaluate: $\\text{HCF}(${a}, ${b})$ using the division method.`,
            ans.toString(),
            a, b, 'hcf',
            expl
        ));
    }
    return questions;
}

// ------ Skill 2: Simplify fraction using HCF ------
export function genSkill2Q() {
    const questions = [];
    const used = new Set();
    for (let i = 0; i < 10; i++) {
        let g, m1, m2, key;
        do {
            g = getRandomInt(2, 8);
            m1 = getRandomInt(2, 6);
            m2 = getRandomInt(2, 6);
            while (gcd(m1, m2) !== 1) m2 = getRandomInt(2, 6);
            key = `${g}-${m1}-${m2}`;
        } while (used.has(key));
        used.add(key);

        const a = g * m1;
        const b = g * m2;

        questions.push(mcq(
            `Simplify the fraction $\\frac{${a}}{${b}}$ using HCF.`,
            `$\\frac{${m1}}{${m2}}$`,
            [
                `$\\frac{${a}}{${b}}$`,
                `$\\frac{${m1 + 1}}{${m2}}$`,
                `$\\frac{${m1}}{${m2 + 1}}$`
            ],
            `The HCF of ${a} and ${b} is ${g}. Dividing both by ${g} gives $\\frac{${m1}}{${m2}}$.`
        ));
    }
    return questions;
}

export function genSkill2A() {
    const questions = [];
    const used = new Set();
    for (let i = 0; i < 10; i++) {
        let a, b, key;
        do {
            a = getRandomInt(10, 50);
            b = getRandomInt(10, 50);
            while (a === b) b = getRandomInt(10, 50);
            key = `${Math.min(a,b)}-${Math.max(a,b)}`;
        } while (used.has(key));
        used.add(key);

        const g = gcd(a, b);
        const l = (a / g) * b;
        const svg = buildHCFDivisionSVG(a, b);
        const expl = `<div style="margin-bottom: 12px; display: flex; justify-content: center;">${svg}</div>Rule: $\\text{HCF} = \\text{Product} \\div \\text{LCM} = ${a*b} \\div ${l} = ${g}$. Alternatively, find the HCF directly.`;

        questions.push(interactive_division(
            `If $\\text{LCM}(${a}, ${b}) = ${l}$, what is $\\text{HCF}(${a}, ${b})$?`,
            g.toString(),
            a, b, 'hcf',
            expl
        ));
    }
    return questions;
}

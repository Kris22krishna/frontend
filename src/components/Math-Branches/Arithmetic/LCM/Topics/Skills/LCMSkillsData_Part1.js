function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffle(arr) { let c = arr.length, r; while (c !== 0) { r = Math.floor(Math.random() * c); c--; [arr[c], arr[r]] = [arr[r], arr[c]]; } return arr; }
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function lcmFn(a, b) { return (a / gcd(a, b)) * b; }

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

// Build L-shape division SVG for LCM
// For LCM: divide by primes that divide AT LEAST ONE number; carry forward unchanged numbers
function buildLCMDivisionSVG(a, b) {
    const rows = [];
    let curA = a, curB = b;
    const divisors = [];

    // Keep dividing by smallest prime that divides at least one number
    let safety = 0;
    while ((curA > 1 || curB > 1) && safety < 20) {
        safety++;
        let prime = 2;
        let found = false;
        while (prime <= Math.max(curA, curB)) {
            if (curA % prime === 0 || curB % prime === 0) {
                rows.push({ divisor: prime, numA: curA, numB: curB });
                divisors.push(prime);
                curA = curA % prime === 0 ? curA / prime : curA;
                curB = curB % prime === 0 ? curB / prime : curB;
                found = true;
                break;
            }
            prime++;
        }
        if (!found) break;
    }
    rows.push({ divisor: null, numA: curA, numB: curB }); // final row (should be 1, 1)

    const rowH = 32;
    const topPad = 10;
    const h = topPad + rows.length * rowH + 20;
    const w = 200;
    const divCol = 40;
    const lineX = 65;
    const numAx = 100;
    const numBx = 155;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" style="max-width:220px;font-family:'Inter',system-ui,sans-serif;">`;
    svgContent += `<text x="${w/2}" y="${topPad}" text-anchor="middle" font-size="10" font-weight="700" fill="#64748b" letter-spacing="1">DIVISION METHOD</text>`;

    const startY = topPad + 8;

    rows.forEach((row, idx) => {
        const y = startY + idx * rowH;
        if (row.divisor !== null) {
            svgContent += `<text x="${divCol}" y="${y + 22}" text-anchor="middle" font-size="15" font-weight="800" fill="#0369a1">${row.divisor}</text>`;
            svgContent += `<line x1="${lineX - 5}" y1="${y + rowH}" x2="${w - 10}" y2="${y + rowH}" stroke="#cbd5e1" stroke-width="1.5"/>`;
        }
        const numColor = row.divisor === null ? '#059669' : '#1e293b';
        const numWeight = row.divisor === null ? '900' : '700';
        svgContent += `<text x="${numAx}" y="${y + 22}" text-anchor="middle" font-size="15" font-weight="${numWeight}" fill="${numColor}">${row.numA}</text>`;
        svgContent += `<text x="${numBx}" y="${y + 22}" text-anchor="middle" font-size="15" font-weight="${numWeight}" fill="${numColor}">${row.numB}</text>`;
    });

    svgContent += `<line x1="${lineX}" y1="${startY + 4}" x2="${lineX}" y2="${startY + (rows.length - 1) * rowH + 4}" stroke="#0369a1" stroke-width="2.5" stroke-linecap="round"/>`;
    svgContent += `<line x1="${lineX}" y1="${startY + 4}" x2="${w - 10}" y2="${startY + 4}" stroke="#0369a1" stroke-width="2.5" stroke-linecap="round"/>`;

    const lcmVal = lcmFn(a, b);
    const labelY = startY + rows.length * rowH + 4;
    svgContent += `<text x="${w/2}" y="${labelY}" text-anchor="middle" font-size="11" font-weight="800" fill="#0369a1">LCM = ${divisors.join(' × ')} = ${lcmVal}</text>`;
    svgContent += `</svg>`;
    return svgContent;
}

// ------ Skill 1: Find LCM ------
export function genSkill1Q() {
    const questions = [];
    const used = new Set();
    for (let i = 0; i < 10; i++) {
        let a, b, key;
        do {
            a = getRandomInt(2, 15);
            b = getRandomInt(2, 15);
            while (a === b) b = getRandomInt(2, 15);
            key = `${Math.min(a,b)}-${Math.max(a,b)}`;
        } while (used.has(key));
        used.add(key);

        const ans = lcmFn(a, b);
        const svg = buildLCMDivisionSVG(a, b);
        const explHtml = `<div style="margin-bottom: 12px; display: flex; justify-content: center;">${svg}</div>The LCM of ${a} and ${b} is ${ans}. Multiply all the divisors on the left column.`;

        questions.push(interactive_division(
            `Find the LCM of **${a}** and **${b}** using the L-shape division method.`,
            ans.toString(),
            a, b, 'lcm',
            explHtml
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
            a = getRandomInt(3, 20);
            b = getRandomInt(3, 20);
            while (a === b) b = getRandomInt(3, 20);
            key = `${Math.min(a,b)}-${Math.max(a,b)}`;
        } while (used.has(key));
        used.add(key);

        const ans = lcmFn(a, b);
        const svg = buildLCMDivisionSVG(a, b);
        const explHtml = `<div style="margin-bottom: 12px; display: flex; justify-content: center;">${svg}</div>Multiply all divisors: $(${a} \\times ${b}) \\div \\text{HCF}(${a}, ${b}) = ${ans}$.`;

        questions.push(interactive_division(
            `What is $\\text{LCM}(${a}, ${b})$? Use the division method shown.`,
            ans.toString(),
            a, b, 'lcm',
            explHtml
        ));
    }
    return questions;
}

// ------ Skill 2: Word Problems ------
export function genSkill2Q() {
    const questions = [];
    const used = new Set();
    for (let i = 0; i < 10; i++) {
        let a, b, key;
        do {
            a = getRandomInt(4, 18);
            b = getRandomInt(4, 18);
            while (a === b) b = getRandomInt(4, 18);
            key = `${Math.min(a,b)}-${Math.max(a,b)}`;
        } while (used.has(key));
        used.add(key);

        const l = lcmFn(a, b);
        const prod = a * b;
        const svg = buildLCMDivisionSVG(a, b);
        const explHtml = `<div style="margin-bottom: 12px; display: flex; justify-content: center;">${svg}</div>The events happen together at every common multiple. The first time is the LCM = ${l} minutes.`;

        questions.push(interactive_division(
            `Two events repeat every **${a}** and **${b}** minutes. When is the first time they happen together again?`,
            l.toString() + ' minutes',
            a, b, 'lcm',
            explHtml
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
            a = getRandomInt(2, 12);
            b = getRandomInt(2, 12);
            while (a === b) b = getRandomInt(2, 12);
            key = `${Math.min(a,b)}-${Math.max(a,b)}`;
        } while (used.has(key));
        used.add(key);

        const g = gcd(a, b);
        const l = lcmFn(a, b);
        const svg = buildLCMDivisionSVG(a, b);
        const explHtml = `<div style="margin-bottom: 12px; display: flex; justify-content: center;">${svg}</div>Rule: $\\text{LCM} \\times \\text{HCF} = \\text{Product}$. So $\\text{LCM} = ${a*b} \\div ${g} = ${l}$. Alternatively, find the LCM directly.`;

        questions.push(interactive_division(
            `If $\\text{HCF}(${a}, ${b}) = ${g}$, and the product is $${a * b}$, find $\\text{LCM}(${a}, ${b})$.`,
            l.toString(),
            a, b, 'lcm',
            explHtml
        ));
    }
    return questions;
}

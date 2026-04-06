// HCFSkillsData_Part2.js

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcf(a, b) {
    return b === 0 ? a : gcf(b, a % b);
}

function gcf3(a, b, c) {
    return gcf(a, gcf(b, c));
}

function lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcf(a, b);
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

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

// Build L-shape division SVG for HCF
function buildHCFDivisionSVG(a, b) {
    function primeFactors(n) {
        const factors = [];
        let d = 2;
        while (n > 1) {
            while (n % d === 0) { factors.push(d); n /= d; }
            d++;
        }
        return factors;
    }

    const fA = primeFactors(a);
    const fB = primeFactors(b);
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

    const rows = [];
    let curA = a, curB = b;
    for (const p of commonPrimes) {
        rows.push({ divisor: p, numA: curA, numB: curB });
        curA /= p;
        curB /= p;
    }
    rows.push({ divisor: null, numA: curA, numB: curB });

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
            svgContent += `<text x="${divCol}" y="${y + 22}" text-anchor="middle" font-size="15" font-weight="800" fill="#7c3aed">${row.divisor}</text>`;
            svgContent += `<line x1="${lineX - 5}" y1="${y + rowH}" x2="${w - 10}" y2="${y + rowH}" stroke="#cbd5e1" stroke-width="1.5"/>`;
        }
        const numColor = row.divisor === null ? '#059669' : '#1e293b';
        const numWeight = row.divisor === null ? '900' : '700';
        svgContent += `<text x="${numAx}" y="${y + 22}" text-anchor="middle" font-size="15" font-weight="${numWeight}" fill="${numColor}">${row.numA}</text>`;
        svgContent += `<text x="${numBx}" y="${y + 22}" text-anchor="middle" font-size="15" font-weight="${numWeight}" fill="${numColor}">${row.numB}</text>`;
    });

    svgContent += `<line x1="${lineX}" y1="${startY + 4}" x2="${lineX}" y2="${startY + (rows.length - 1) * rowH + 4}" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round"/>`;
    svgContent += `<line x1="${lineX}" y1="${startY + 4}" x2="${w - 10}" y2="${startY + 4}" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round"/>`;

    const hcfVal = gcf(a, b);
    const labelY = startY + rows.length * rowH + 4;
    svgContent += `<text x="${w/2}" y="${labelY}" text-anchor="middle" font-size="11" font-weight="800" fill="#7c3aed">HCF = ${commonPrimes.length > 0 ? commonPrimes.join(' × ') + ' = ' : ''}${hcfVal}</text>`;
    svgContent += `</svg>`;
    return svgContent;
}

// ----------------------------------------------------
// Skill 3: Fundamental Operations with HCF
// ----------------------------------------------------

export function genSkill3Q() {
    const questions = [];
    const usedSets = new Set();

    for (let i = 0; i < 10; i++) {
        let type = getRandomInt(1, 4);
        let a = 0, b = 0, c = 0, q, ans, expl, svg = "";

        let key;
        do {
            if (type === 1) {
                const common = [2, 3, 4, 5, 6, 8, 10, 12][getRandomInt(0, 7)];
                a = common * getRandomInt(2, 5);
                b = common * getRandomInt(2, 5);
                ans = gcf(a, b);
                q = `What is the Highest Common Factor (HCF) of ${a} and ${b}?`;
                expl = `The HCF of ${a} and ${b} is ${ans}.`;
                svg = buildHCFDivisionSVG(a, b);
            } else if (type === 2) {
                const common = [2, 3, 4, 5, 6][getRandomInt(0, 4)];
                a = common * getRandomInt(1, 4);
                b = common * getRandomInt(2, 5);
                c = common * getRandomInt(3, 6);
                ans = gcf3(a, b, c);
                q = `Find the HCF of ${a}, ${b}, and ${c}.`;
                expl = `The HCF of (${a}, ${b}, ${c}) is ${ans}.`;
            } else if (type === 3) {
                a = getRandomInt(4, 10) * 4;
                b = getRandomInt(4, 10) * 6;
                let l = lcm(a, b);
                let h = gcf(a, b);
                ans = h.toString();
                q = `Two numbers have a product of ${a * b} and an LCM of ${l}. Find their HCF.`;
                expl = `HCF = Product / LCM = ${a * b} / ${l} = ${ans}.`;
                svg = buildHCFDivisionSVG(a, b);
            } else {
                a = [24, 30, 36, 48][getRandomInt(0, 3)];
                b = [36, 42, 60, 72][getRandomInt(0, 3)];
                ans = gcf(a, b);
                q = `A gardener has ${a} roses and ${b} lilies. What is the greatest number of identical bouquets they can make using all the flowers?`;
                expl = `The answer is the HCF of ${a} and ${b}, which is ${ans}.`;
                svg = buildHCFDivisionSVG(a, b);
            }
            key = `${type}-${a}-${b}-${c}`;
        } while (usedSets.has(key));
        usedSets.add(key);

        const distractors = [];
        while (distractors.length < 3) {
            let offset = getRandomInt(-5, 5);
            if (offset === 0) continue;
            let w = (parseInt(ans) + offset).toString();
            if (parseInt(w) > 0 && !distractors.includes(w) && w !== ans.toString()) {
                distractors.push(w);
            }
        }

        if (svg) {
            const explHtml = `<div style="margin-bottom: 12px; display: flex; justify-content: center;">${svg}</div>${expl}`;
            questions.push(interactive_division(q, ans.toString(), a, b, 'hcf', explHtml));
        } else {
            questions.push(mcq(q, ans.toString(), distractors, expl));
        }
    }
    return questions;
}

export function genSkill3A() {
    const questions = [];
    const usedSets = new Set();

    for (let i = 0; i < 10; i++) {
        let type = getRandomInt(1, 4);
        let a = 0, b = 0, c = 0, q, ans, expl, svg = "";

        let key;
        do {
            if (type === 1) {
                a = getRandomInt(20, 100);
                b = getRandomInt(20, 100);
                ans = gcf(a, b);
                q = `Solve: $\\text{HCF}(${a}, ${b})$`;
                expl = `$\\text{HCF}(${a}, ${b}) = ${ans}$.`;
                svg = buildHCFDivisionSVG(a, b);
            } else if (type === 2) {
                a = [12, 18, 24][getRandomInt(0, 2)];
                b = [24, 36, 48][getRandomInt(0, 2)];
                c = [60, 72, 84][getRandomInt(0, 2)];
                ans = gcf3(a, b, c);
                q = `Solve: $\\text{HCF}(${a}, ${b}, ${c})$`;
                expl = `$\\text{HCF}(${a}, ${b}, ${c}) = ${ans}$.`;
            } else if (type === 3) {
                a = getRandomInt(10, 30);
                b = getRandomInt(10, 30);
                let l = lcm(a, b);
                let h = gcf(a, b);
                ans = h.toString();
                q = `What is the HCF of $${a}$ and $${b}$? (Hint: LCM is $${l}$)`;
                expl = `HCF = Product / LCM = (${a} × ${b}) / ${l} = ${ans}.`;
                svg = buildHCFDivisionSVG(a, b);
            } else {
                a = [16, 20, 24][getRandomInt(0, 2)];
                b = [28, 32, 36][getRandomInt(0, 2)];
                ans = gcf(a, b);
                q = `Two ropes of lengths ${a}m and ${b}m are to be cut into equal pieces of maximum possible length. What is the length of each piece?`;
                expl = `The maximum length is the HCF of ${a} and ${b}, which is ${ans}m.`;
                svg = buildHCFDivisionSVG(a, b);
            }
            key = `${type}-${a}-${b}-${c}`;
        } while (usedSets.has(key));
        usedSets.add(key);

        const distractors = [];
        while (distractors.length < 3) {
            let offset = getRandomInt(-10, 10);
            if (offset === 0) continue;
            let w = (parseInt(ans) + offset).toString();
            if (parseInt(w) > 0 && !distractors.includes(w) && w !== ans.toString()) {
                distractors.push(w);
            }
        }

        if (svg) {
            const explHtml = `<div style="margin-bottom: 12px; display: flex; justify-content: center;">${svg}</div>${expl}`;
            questions.push(interactive_division(q, ans.toString(), a, b, 'hcf', explHtml));
        } else {
            questions.push(mcq(q, ans.toString(), distractors, expl));
        }
    }
    return questions;
}

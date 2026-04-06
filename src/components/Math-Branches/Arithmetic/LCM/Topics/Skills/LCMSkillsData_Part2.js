// LCMSkillsData_Part2.js

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcf(a, b) {
    return b === 0 ? a : gcf(b, a % b);
}

function lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcf(a, b);
}

function lcm3(a, b, c) {
    return lcm(a, lcm(b, c));
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

// Build L-shape division SVG for LCM
function buildLCMDivisionSVG(a, b) {
    const rows = [];
    let curA = a, curB = b;
    const divisors = [];

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

    const lcmVal = lcm(a, b);
    const labelY = startY + rows.length * rowH + 4;
    svgContent += `<text x="${w/2}" y="${labelY}" text-anchor="middle" font-size="11" font-weight="800" fill="#0369a1">LCM = ${divisors.join(' × ')} = ${lcmVal}</text>`;
    svgContent += `</svg>`;
    return svgContent;
}

// ----------------------------------------------------
// Skill 3: Fundamental Operations with LCM
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
                a = getRandomInt(4, 15);
                b = getRandomInt(4, 20);
                ans = lcm(a, b);
                q = `Find the Least Common Multiple (LCM) of ${a} and ${b}.`;
                expl = `LCM of ${a} and ${b} is ${ans}.`;
                svg = buildLCMDivisionSVG(a, b);
            } else if (type === 2) {
                a = [2, 3, 4, 5, 6][getRandomInt(0, 4)];
                b = [3, 4, 5, 6, 8, 10][getRandomInt(0, 5)];
                c = [4, 5, 6, 8, 10, 12][getRandomInt(0, 5)];
                ans = lcm3(a, b, c);
                q = `What is the LCM of ${a}, ${b}, and ${c}?`;
                expl = `LCM of (${a}, ${b}, ${c}) is ${ans}.`;
            } else if (type === 3) {
                a = getRandomInt(6, 12) * 2;
                b = getRandomInt(6, 12) * 3;
                let h = gcf(a, b);
                let l = lcm(a, b);
                ans = h.toString();
                q = `If the LCM of two numbers is ${l} and their product is ${a * b}, what is their HCF?`;
                expl = `HCF = Product / LCM = ${a * b} / ${l} = ${ans}.`;
                svg = buildLCMDivisionSVG(a, b);
            } else {
                a = [10, 12, 15, 20, 30][getRandomInt(0, 4)];
                b = [15, 20, 25, 30, 40][getRandomInt(0, 4)];
                ans = lcm(a, b);
                q = `Two bells toll together at 8:00 AM. One tolls every ${a} mins and the other every ${b} mins. After how many minutes will they toll together again?`;
                expl = `They toll together at common multiples. The next time is the LCM: ${ans} minutes.`;
                svg = buildLCMDivisionSVG(a, b);
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
            questions.push(interactive_division(q, ans.toString(), a, b, 'lcm', explHtml));
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
                a = getRandomInt(12, 25);
                b = getRandomInt(12, 25);
                ans = lcm(a, b);
                q = `Evaluate: $\\text{LCM}(${a}, ${b})$`;
                expl = `$\\text{LCM}(${a}, ${b}) = ${ans}$.`;
                svg = buildLCMDivisionSVG(a, b);
            } else if (type === 2) {
                a = getRandomInt(5, 10);
                b = getRandomInt(10, 15);
                c = getRandomInt(15, 20);
                ans = lcm3(a, b, c);
                q = `Find: $\\text{LCM}(${a}, ${b}, ${c})$`;
                expl = `$\\text{LCM}(${a}, ${b}, ${c}) = ${ans}$.`;
            } else if (type === 3) {
                a = getRandomInt(10, 30);
                b = getRandomInt(10, 30);
                let h = gcf(a, b);
                let l = lcm(a, b);
                ans = l.toString();
                q = `Solve: $\\frac{${a} \\times ${b}}{\\text{HCF}(${a}, ${b})} = ?$`;
                expl = `Product / HCF = LCM. $(${a} \\times ${b}) / ${h} = ${ans}$.`;
                svg = buildLCMDivisionSVG(a, b);
            } else {
                a = getRandomInt(5, 9);
                b = getRandomInt(10, 15);
                ans = lcm(a, b);
                q = `The shortest length of a rope that can be cut into exactly ${a} cm and ${b} cm pieces is:`;
                expl = `The shortest length is the LCM of ${a} and ${b}, which is ${ans} cm.`;
                svg = buildLCMDivisionSVG(a, b);
            }
            key = `${type}-${a}-${b}-${c}`;
        } while (usedSets.has(key));
        usedSets.add(key);

        const distractors = [];
        while (distractors.length < 3) {
            let offset = getRandomInt(-20, 20);
            if (offset === 0) continue;
            let w = (parseInt(ans) + offset).toString();
            if (parseInt(w) > 0 && !distractors.includes(w) && w !== ans.toString()) {
                distractors.push(w);
            }
        }

        if (svg) {
            const explHtml = `<div style="margin-bottom: 12px; display: flex; justify-content: center;">${svg}</div>${expl}`;
            questions.push(interactive_division(q, ans.toString(), a, b, 'lcm', explHtml));
        } else {
            questions.push(mcq(q, ans.toString(), distractors, expl));
        }
    }
    return questions;
}

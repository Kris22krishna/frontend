// FractionsSkillsData_Part2.js

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcf(a, b) {
    return b === 0 ? a : gcf(b, a % b);
}

function simplify(n, d) {
    const common = gcf(Math.abs(n), Math.abs(d));
    return [n / common, d / common];
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

const mcq = (question, correctAnswer, distractors, explanation = "") => {
    const options = [correctAnswer, ...distractors];
    const shuffled = shuffle([...options]);
    return {
        question,
        options: shuffled,
        correct: shuffled.indexOf(correctAnswer),
        explanation,
        type: "mcq"
    };
};

// ----------------------------------------------------
// Skill 3: Fundamental Operations with Fractions
// ----------------------------------------------------

export function genSkill3Q() {
    const questions = [];
    const usedSets = new Set();

    for (let i = 0; i < 10; i++) {
        let type = getRandomInt(1, 4); // 1: Add, 2: Sub, 3: Mul, 4: Div
        let n1, d1, n2, d2, q, ansN, ansD, expl;

        let key;
        do {
            n1 = getRandomInt(1, 6);
            d1 = getRandomInt(2, 8);
            n2 = getRandomInt(1, 6);
            d2 = getRandomInt(2, 8);

            if (type === 1) { // Add
                ansN = n1 * d2 + n2 * d1;
                ansD = d1 * d2;
                q = `$\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}} = ?$`;
                expl = `Find common denominator: $\\frac{${n1 * d2}}{${d1 * d2}} + \\frac{${n2 * d1}}{${d1 * d2}} = \\frac{${ansN}}{${ansD}}$.`;
            } else if (type === 2) { // Sub
                if (n1/d1 < n2/d2) [n1, n2, d1, d2] = [n2, n1, d2, d1];
                ansN = n1 * d2 - n2 * d1;
                ansD = d1 * d2;
                if (ansN === 0) ansN = 1; 
                q = `$\\frac{${n1}}{${d1}} - \\frac{${n2}}{${d2}} = ?$`;
                expl = `Find common denominator: $\\frac{${n1 * d2}}{${d1 * d2}} - \\frac{${n2 * d1}}{${d1 * d2}} = \\frac{${ansN}}{${ansD}}$.`;
            } else if (type === 3) { // Mul
                ansN = n1 * n2;
                ansD = d1 * d2;
                q = `$\\frac{${n1}}{${d1}} \\times \\frac{${n2}}{${d2}} = ?$`;
                expl = `Multiply straight across: $\\frac{${n1} \\times ${n2}}{${d1} \\times ${d2}} = \\frac{${ansN}}{${ansD}}$.`;
            } else { // Div
                ansN = n1 * d2;
                ansD = d1 * n2;
                q = `$\\frac{${n1}}{${d1}} \\div \\frac{${n2}}{${d2}} = ?$`;
                expl = `Flip the second and multiply: $\\frac{${n1}}{${d1}} \\times \\frac{${d2}}{${n2}} = \\frac{${ansN}}{${ansD}}$.`;
            }
            const [finalN, finalD] = simplify(ansN, ansD);
            ansN = finalN;
            ansD = finalD;
            key = `${type}-${n1}-${d1}-${n2}-${d2}`;
        } while (usedSets.has(key));
        usedSets.add(key);

        const ansStr = ansD === 1 ? ansN.toString() : `\\frac{${ansN}}{${ansD}}`;
        const distractors = [];

        while (distractors.length < 3) {
            let wn = ansN + getRandomInt(-3, 3);
            let wd = ansD + getRandomInt(-2, 2);
            if (wn <= 0) wn = getRandomInt(1,10);
            if (wd <= 1) wd = getRandomInt(2,10);
            const [swn, swd] = simplify(wn, wd);
            const wStr = swd === 1 ? swn.toString() : `\\frac{${swn}}{${swd}}`;
            if (wStr !== ansStr && !distractors.includes(wStr)) {
                distractors.push(wStr);
            }
        }

        questions.push(mcq(q, `$${ansStr}$`, distractors.map(d => `$${d}$`), expl));
    }
    return questions;
}

export function genSkill3A() {
    const questions = [];
    const usedSets = new Set();

    for (let i = 0; i < 10; i++) {
        let type = getRandomInt(1, 4);
        let n1, d1, n2, d2, q, ansN, ansD, expl;

        let key;
        do {
            n1 = getRandomInt(2, 10);
            d1 = getRandomInt(3, 12);
            n2 = getRandomInt(2, 10);
            d2 = getRandomInt(3, 12);

            if (type === 1) { // Add
                ansN = n1 * d2 + n2 * d1;
                ansD = d1 * d2;
                q = `Find the sum of $\\frac{${n1}}{${d1}}$ and $\\frac{${n2}}{${d2}}$`;
                expl = `${n1}/${d1} + ${n2}/${d2} = ${ansN}/${ansD}.`;
            } else if (type === 2) { // Sub
                if (n1/d1 < n2/d2) [n1, n2, d1, d2] = [n2, n1, d2, d1];
                ansN = n1 * d2 - n2 * d1;
                ansD = d1 * d2;
                q = `Evaluate: $\\frac{${n1}}{${d1}} - \\frac{${n2}}{${d2}}$`;
                expl = `${n1}/${d1} - ${n2}/${d2} = ${ansN}/${ansD}.`;
            } else if (type === 3) { // Mul
                ansN = n1 * n2;
                ansD = d1 * d2;
                q = `Product of $\\frac{${n1}}{${d1}}$ and $\\frac{${n2}}{${d2}}$`;
                expl = `${n1}/${d1} × ${n2}/${d2} = ${ansN}/${ansD}.`;
            } else { // Div
                ansN = n1 * d2;
                ansD = d1 * n2;
                q = `$\\frac{${n1}}{${d1}} \\div \\frac{${n2}}{${d2}}$`;
                expl = `${n1}/${d1} ÷ ${n2}/${d2} = ${ansN}/${ansD}.`;
            }
            const [finalN, finalD] = simplify(ansN, ansD);
            ansN = finalN;
            ansD = finalD;
            key = `${type}-${n1}-${d1}-${n2}-${d2}`;
        } while (usedSets.has(key));
        usedSets.add(key);

        const ansStr = ansD === 1 ? ansN.toString() : `\\frac{${ansN}}{${ansD}}`;
        const distractors = [];

        while (distractors.length < 3) {
            let wn = ansN + getRandomInt(-5, 5);
            let wd = ansD + getRandomInt(-3, 3);
            if (wn <= 0) wn = getRandomInt(1,15);
            if (wd <= 1) wd = getRandomInt(2,15);
            const [swn, swd] = simplify(wn, wd);
            const wStr = swd === 1 ? swn.toString() : `\\frac{${swn}}{${swd}}`;
            if (wStr !== ansStr && !distractors.includes(wStr)) {
                distractors.push(wStr);
            }
        }

        questions.push(mcq(q, `$${ansStr}$`, distractors.map(d => `$${d}$`), expl));
    }
    return questions;
}

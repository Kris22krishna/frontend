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
// Skill 3: Fundamental Operations with LCM
// ----------------------------------------------------

export function genSkill3Q() {
    const questions = [];
    const usedSets = new Set();

    for (let i = 0; i < 20; i++) {
        let type = getRandomInt(1, 4); // 1: LCM of 2, 2: LCM of 3, 3: Relation LCM*HCF=a*b, 4: Contextual sync
        let a = 0, b = 0, c = 0, q, ans, expl;

        let key;
        do {
            if (type === 1) { // Pair
                a = getRandomInt(4, 15);
                b = getRandomInt(4, 20);
                ans = lcm(a, b);
                q = `Find the Least Common Multiple (LCM) of ${a} and ${b}.`;
                expl = `LCM of ${a} and ${b} is ${ans}.`;
            } else if (type === 2) { // Triplet
                a = [2, 3, 4, 5, 6][getRandomInt(0, 4)];
                b = [3, 4, 5, 6, 8, 10][getRandomInt(0, 5)];
                c = [4, 5, 6, 8, 10, 12][getRandomInt(0, 5)];
                ans = lcm3(a, b, c);
                q = `What is the LCM of ${a}, ${b}, and ${c}?`;
                expl = `LCM of (${a}, ${b}, ${c}) is ${ans}.`;
            } else if (type === 3) { // Property
                a = getRandomInt(6, 12) * 2;
                b = getRandomInt(6, 12) * 3;
                let h = gcf(a, b);
                let l = lcm(a, b);
                ans = h.toString();
                q = `If the LCM of two numbers is ${l} and their product is ${a * b}, what is their HCF?`;
                expl = `HCF = Product / LCM = ${a * b} / ${l} = ${ans}.`;
            } else { // Application
                a = [10, 12, 15, 20, 30][getRandomInt(0, 4)];
                b = [15, 20, 25, 30, 40][getRandomInt(0, 4)];
                ans = lcm(a, b);
                q = `Two bells toll together at 8:00 AM. One tolls every ${a} mins and the other every ${b} mins. After how many minutes will they toll together again?`;
                expl = `They toll together at common multiples of ${a} and ${b}. The next time is the LCM: ${ans} minutes.`;
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

        questions.push(mcq(q, ans.toString(), distractors, expl));
    }
    return questions;
}

export function genSkill3A() {
    const questions = [];
    const usedSets = new Set();

    for (let i = 0; i < 20; i++) {
        let type = getRandomInt(1, 4);
        let a = 0, b = 0, c = 0, q, ans, expl;

        let key;
        do {
            if (type === 1) {
                a = getRandomInt(12, 25);
                b = getRandomInt(12, 25);
                ans = lcm(a, b);
                q = `Evaluate: $\\text{LCM}(${a}, ${b})$`;
                expl = `$\\text{LCM}(${a}, ${b}) = ${ans}$.`;
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
            } else {
                a = getRandomInt(5, 9);
                b = getRandomInt(10, 15);
                ans = lcm(a, b);
                q = `The shortest length of a rope that can be cut into exactly ${a} cm and ${b} cm pieces is:`;
                expl = `The shortest length is the LCM of ${a} and ${b}, which is ${ans} cm.`;
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

        questions.push(mcq(q, ans.toString(), distractors, expl));
    }
    return questions;
}

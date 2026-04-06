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
// Skill 3: Fundamental Operations with HCF
// ----------------------------------------------------

export function genSkill3Q() {
    const questions = [];
    const usedSets = new Set();

    for (let i = 0; i < 20; i++) {
        let type = getRandomInt(1, 4); // 1: HCF of 2, 2: HCF of 3, 3: Property check, 4: Contextual (Greatest)
        let a = 0, b = 0, c = 0, q, ans, expl;

        let key;
        do {
            if (type === 1) { // Pair
                const common = [2, 3, 4, 5, 6, 8, 10, 12][getRandomInt(0, 7)];
                a = common * getRandomInt(2, 5);
                b = common * getRandomInt(2, 5);
                ans = gcf(a, b);
                q = `What is the Highest Common Factor (HCF) of ${a} and ${b}?`;
                expl = `The HCF of ${a} and ${b} is ${ans}.`;
            } else if (type === 2) { // Triplet
                const common = [2, 3, 4, 5, 6][getRandomInt(0, 4)];
                a = common * getRandomInt(1, 4);
                b = common * getRandomInt(2, 5);
                c = common * getRandomInt(3, 6);
                ans = gcf3(a, b, c);
                q = `Find the HCF of ${a}, ${b}, and ${c}.`;
                expl = `The HCF of (${a}, ${b}, ${c}) is ${ans}.`;
            } else if (type === 3) { // Property
                a = getRandomInt(4, 10) * 4;
                b = getRandomInt(4, 10) * 6;
                let l = lcm(a, b);
                let h = gcf(a, b);
                ans = h.toString();
                q = `Two numbers have a product of ${a * b} and an LCM of ${l}. Find their HCF.`;
                expl = `HCF = Product / LCM = ${a * b} / ${l} = ${ans}.`;
            } else { // Application
                a = [24, 30, 36, 48][getRandomInt(0, 3)];
                b = [36, 42, 60, 72][getRandomInt(0, 3)];
                ans = gcf(a, b);
                q = `A gardener has ${a} roses and ${b} lilies. What is the greatest number of identical bouquets they can make using all the flowers?`;
                expl = `The answer is the HCF of ${a} and ${b}, which is ${ans}.`;
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
                a = getRandomInt(20, 100);
                b = getRandomInt(20, 100);
                ans = gcf(a, b);
                q = `Solve: $\\text{HCF}(${a}, ${b})$`;
                expl = `$\\text{HCF}(${a}, ${b}) = ${ans}$.`;
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
            } else {
                a = [16, 20, 24][getRandomInt(0, 2)];
                b = [28, 32, 36][getRandomInt(0, 2)];
                ans = gcf(a, b);
                q = `Two ropes of lengths ${a}m and ${b}m are to be cut into equal pieces of maximum possible length. What is the length of each piece?`;
                expl = `The maximum length is the HCF of ${a} and ${b}, which is ${ans}m.`;
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

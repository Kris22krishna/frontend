// IntegersSkillsData_Part2.js

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
// Skill 3: Fundamental Operations with Integers
// ----------------------------------------------------

export function genSkill3Q() {
    const questions = [];
    const usedPairs = new Set();

    for (let i = 0; i < 20; i++) {
        let type = getRandomInt(1, 4); // 1: Add, 2: Sub, 3: Mul, 4: Div
        let a, b, q, ans, expl;

        let key;
        do {
            if (type === 1) { // Add
                a = getRandomInt(-50, 50);
                b = getRandomInt(-50, 50);
                ans = a + b;
                q = `Calculate: ${a} + (${b})`;
                expl = `${a} + (${b}) = ${ans}.`;
            } else if (type === 2) { // Sub
                a = getRandomInt(-50, 50);
                b = getRandomInt(-50, 50);
                ans = a - b;
                q = `Subtract: ${a} - (${b})`;
                expl = `${a} - (${b}) = ${a} + (${-b}) = ${ans}.`;
            } else if (type === 3) { // Mul
                a = getRandomInt(-12, 12);
                if (a === 0) a = 1;
                b = getRandomInt(-12, 12);
                ans = a * b;
                q = `Find the product: ${a} × ${b}`;
                const signMsg = (a > 0 && b > 0) || (a < 0 && b < 0) ? "Same signs result in a positive product." : "Different signs result in a negative product.";
                expl = `${a} × ${b} = ${ans}. ${signMsg}`;
            } else { // Div
                b = getRandomInt(-12, 12);
                if (b === 0) b = 1;
                ans = getRandomInt(-10, 10);
                a = ans * b;
                q = `Divide: ${a} ÷ (${b})`;
                const signMsg = (a > 0 && b > 0) || (a < 0 && b < 0) ? "Same signs result in a positive quotient." : "Different signs result in a negative quotient.";
                expl = `${a} ÷ ${b} = ${ans}. ${signMsg}`;
            }
            key = `${type}-${a}-${b}`;
        } while (usedPairs.has(key));
        usedPairs.add(key);

        const distractors = [];
        if (ans !== 0) distractors.push((-ans).toString());
        
        while (distractors.length < 3) {
            let offset = getRandomInt(-10, 10);
            if (offset === 0) continue;
            let wrongAns = ans + offset;
            if (!distractors.includes(wrongAns.toString()) && wrongAns !== ans) {
                distractors.push(wrongAns.toString());
            }
        }

        questions.push(mcq(q, ans.toString(), distractors.slice(0, 3), expl));
    }
    return questions;
}

export function genSkill3A() {
    const questions = [];
    const usedPairs = new Set();

    for (let i = 0; i < 20; i++) {
        let type = getRandomInt(1, 4);
        let a, b, q, ans, expl;

        let key;
        do {
            if (type === 1) {
                a = getRandomInt(-200, 200);
                b = getRandomInt(-200, 200);
                ans = a + b;
                q = `Evaluate: $${a} + (${b})$`;
                expl = `${a} + (${b}) = ${ans}.`;
            } else if (type === 2) {
                a = getRandomInt(-200, 200);
                b = getRandomInt(-200, 200);
                ans = a - b;
                q = `Evaluate: $${a} - (${b})$`;
                expl = `${a} - (${b}) = ${ans}.`;
            } else if (type === 3) {
                a = getRandomInt(-20, 20);
                if (a === 0) a = 1;
                b = getRandomInt(-15, 15);
                ans = a * b;
                q = `Multiply: $(${a}) \\times (${b})$`;
                expl = `${a} × ${b} = ${ans}.`;
            } else {
                b = getRandomInt(-20, 20);
                if (b === 0) b = 1;
                ans = getRandomInt(-15, 15);
                a = ans * b;
                q = `Solve: $\\frac{${a}}{${b}}$`;
                expl = `${a} ÷ ${b} = ${ans}.`;
            }
            key = `${type}-${a}-${b}`;
        } while (usedPairs.has(key));
        usedPairs.add(key);

        const distractors = [];
        if (ans !== 0) distractors.push((-ans).toString());

        while (distractors.length < 3) {
            let offset = getRandomInt(-15, 15);
            if (offset === 0) continue;
            let wrongAns = ans + offset;
            if (!distractors.includes(wrongAns.toString()) && wrongAns !== ans) {
                distractors.push(wrongAns.toString());
            }
        }

        questions.push(mcq(q, ans.toString(), distractors.slice(0, 3), expl));
    }
    return questions;
}

// NaturalNumbersSkillsData_Part2.js

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
// Skill 3: Fundamental Operations with Natural Numbers
// ----------------------------------------------------

export function genSkill3Q() {
    const questions = [];
    const usedPairs = new Set();

    for (let i = 0; i < 10; i++) {
        let type = getRandomInt(1, 4); // 1: Addition, 2: Subtraction, 3: Multiplication, 4: Division
        let a, b, q, ans, expl;

        // Ensure unique pairs for the session
        let key;
        do {
            if (type === 1) { // Add
                a = getRandomInt(1, 100);
                b = getRandomInt(1, 100);
                ans = a + b;
                q = `What is the sum of ${a} and ${b}?`;
                expl = `${a} + ${b} = ${ans}.`;
            } else if (type === 2) { // Subtract
                a = getRandomInt(50, 200);
                b = getRandomInt(1, 50);
                ans = a - b;
                q = `Find the difference: ${a} - ${b}`;
                expl = `${a} - ${b} = ${ans}.`;
            } else if (type === 3) { // Multiply
                a = getRandomInt(2, 12);
                b = getRandomInt(2, 20);
                ans = a * b;
                q = `Calculate: ${a} × ${b}`;
                expl = `${a} × ${b} = ${ans}.`;
            } else { // Divide
                b = getRandomInt(2, 10);
                ans = getRandomInt(2, 15);
                a = ans * b;
                q = `What is ${a} divided by ${b}?`;
                expl = `${a} ÷ ${b} = ${ans}.`;
            }
            key = `${type}-${a}-${b}`;
        } while (usedPairs.has(key));
        usedPairs.add(key);

        const distractors = [];
        while (distractors.length < 3) {
            let offset = getRandomInt(-10, 10);
            if (offset === 0) continue;
            let wrongAns = ans + offset;
            if (wrongAns > 0 && !distractors.includes(wrongAns.toString()) && wrongAns !== ans) {
                distractors.push(wrongAns.toString());
            }
        }

        questions.push(mcq(q, ans.toString(), distractors, expl));
    }
    return questions;
}

export function genSkill3A() {
    const questions = [];
    const usedPairs = new Set();

    for (let i = 0; i < 10; i++) {
        let type = getRandomInt(1, 4);
        let a, b, q, ans, expl;

        let key;
        do {
            if (type === 1) {
                a = getRandomInt(100, 500);
                b = getRandomInt(100, 500);
                ans = a + b;
                q = `Find the sum: $${a} + ${b}$`;
                expl = `${a} + ${b} = ${ans}.`;
            } else if (type === 2) {
                a = getRandomInt(300, 1000);
                b = getRandomInt(10, 299);
                ans = a - b;
                q = `Solve: $${a} - ${b}$`;
                expl = `${a} - ${b} = ${ans}.`;
            } else if (type === 3) {
                a = getRandomInt(11, 25);
                b = getRandomInt(5, 15);
                ans = a * b;
                q = `Multiply: $${a} \\times ${b}$`;
                expl = `${a} × ${b} = ${ans}.`;
            } else {
                b = getRandomInt(11, 20);
                ans = getRandomInt(5, 25);
                a = ans * b;
                q = `Divide: $${a} \\div ${b}$`;
                expl = `${a} ÷ ${b} = ${ans}.`;
            }
            key = `${type}-${a}-${b}`;
        } while (usedPairs.has(key));
        usedPairs.add(key);

        const distractors = [];
        while (distractors.length < 3) {
            let offset = getRandomInt(-20, 20);
            if (offset === 0) continue;
            let wrongAns = ans + offset;
            if (wrongAns > 0 && !distractors.includes(wrongAns.toString()) && wrongAns !== ans) {
                distractors.push(wrongAns.toString());
            }
        }

        questions.push(mcq(q, ans.toString(), distractors, expl));
    }
    return questions;
}

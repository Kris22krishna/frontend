// RationalNumbersSkillsData_Part2.js

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
// Skill 3: Fundamental Operations with Rational Numbers
// ----------------------------------------------------

export function genSkill3Q() {
    const questions = [];
    const usedSets = new Set();

    for (let i = 0; i < 20; i++) {
        let type = getRandomInt(1, 4); // 1: Decimal Add/Sub, 2: Decimal Mul, 3: Decimal Div, 4: Mixed (Fraction/Decimal)
        let a = '0', b = '0', q, ans, expl;

        let key;
        do {
            if (type === 1) { // Add/Sub
                const isAdd = Math.random() > 0.5;
                a = (getRandomInt(10, 100) / 10).toFixed(1);
                b = (getRandomInt(10, 100) / 10).toFixed(1);
                if (isAdd) {
                    ans = (parseFloat(a) + parseFloat(b)).toFixed(1);
                    q = `Calculate: ${a} + ${b}`;
                    expl = `${a} + ${b} = ${ans}.`;
                } else {
                    if (parseFloat(a) < parseFloat(b)) [a, b] = [b, a];
                    ans = (parseFloat(a) - parseFloat(b)).toFixed(1);
                    q = `Find the difference: ${a} - ${b}`;
                    expl = `${a} - ${b} = ${ans}.`;
                }
            } else if (type === 2) { // Mul
                a = (getRandomInt(1, 5)).toString();
                b = (getRandomInt(11, 50) / 10).toFixed(1);
                ans = (parseFloat(a) * parseFloat(b)).toFixed(1);
                q = `Multiply: ${a} × ${b}`;
                expl = `${a} × ${b} = ${ans}.`;
            } else if (type === 3) { // Div
                b = (getRandomInt(2, 5)).toString();
                ans = (getRandomInt(1, 10) / 2).toFixed(1);
                a = (parseFloat(ans) * parseFloat(b)).toFixed(1);
                q = `Divide: ${a} ÷ ${b}`;
                expl = `${a} ÷ ${b} = ${ans}.`;
            } else { // Mixed
                const fracN = getRandomInt(1, 4);
                const fracD = [2, 4, 5, 10][getRandomInt(0, 3)];
                const dec = (getRandomInt(10, 50) / 10).toFixed(1);
                const fracVal = fracN / fracD;
                ans = (fracVal + parseFloat(dec)).toFixed(2);
                q = `Evaluate: $\\frac{${fracN}}{${fracD}} + ${dec}$`;
                expl = `Convert $\\frac{${fracN}}{${fracD}}$ to $${fracVal}$ and then add $${dec}$: $${fracVal} + ${dec} = ${ans}$.`;
            }
            key = `${type}-${a}-${b}`;
        } while (usedSets.has(key));
        usedSets.add(key);

        const distractors = [];
        while (distractors.length < 3) {
            let offset = (getRandomInt(-10, 10) / 10).toFixed(type === 4 ? 2 : 1);
            let wrongAns = (parseFloat(ans) + parseFloat(offset)).toFixed(type === 4 ? 2 : 1);
            if (parseFloat(offset) !== 0 && !distractors.includes(wrongAns.toString()) && wrongAns !== ans) {
                distractors.push(wrongAns.toString());
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
        let a = '0', b = '0', q, ans, expl;

        let key;
        do {
            if (type === 1) { // Large decimals
                a = (getRandomInt(100, 1000) / 100).toFixed(2);
                b = (getRandomInt(100, 1000) / 100).toFixed(2);
                ans = (parseFloat(a) + parseFloat(b)).toFixed(2);
                q = `Find the sum of $${a}$ and $${b}$`;
                expl = `${a} + ${b} = ${ans}.`;
            } else if (type === 2) {
                a = (getRandomInt(10, 30) / 10).toFixed(1);
                b = (getRandomInt(10, 30) / 10).toFixed(1);
                ans = (parseFloat(a) * parseFloat(b)).toFixed(2);
                q = `Evaluate: $${a} \\times ${b}$`;
                expl = `${a} × ${b} = ${ans}.`;
            } else if (type === 3) {
                b = "0.5";
                a = (getRandomInt(1, 20) / 2).toFixed(1);
                ans = (parseFloat(a) / 0.5).toFixed(1);
                q = `Solve: $${a} \\div 0.5$`;
                expl = `Dividing by 0.5 is the same as multiplying by 2: ${a} × 2 = ${ans}.`;
            } else {
                const per = [10, 20, 25, 50][getRandomInt(0, 3)];
                const val = getRandomInt(10, 200);
                ans = ((per / 100) * val).toFixed(1);
                q = `What is $${per}\\%$ of $${val}$?`;
                expl = `${per}% of ${val} = ( ${per} / 100 ) × ${val} = ${ans}.`;
            }
            key = `${type}-${a}-${b}`;
        } while (usedSets.has(key));
        usedSets.add(key);

        const distractors = [];
        while (distractors.length < 3) {
            let offset = (getRandomInt(-20, 20) / 10).toFixed(type === 3 ? 1 : 2);
            let wrongAns = (parseFloat(ans) + parseFloat(offset)).toFixed(type === 3 ? 1 : 2);
            if (parseFloat(offset) !== 0 && !distractors.includes(wrongAns.toString()) && wrongAns !== ans) {
                distractors.push(wrongAns.toString());
            }
        }

        questions.push(mcq(q, ans.toString(), distractors, expl));
    }
    return questions;
}

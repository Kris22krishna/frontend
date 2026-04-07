// IrrationalNumbersSkillsData_Part2.js

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
// Skill 3: Fundamental Operations with Irrational Numbers
// ----------------------------------------------------

export function genSkill3Q() {
    const questions = [];
    const usedSets = new Set();

    for (let i = 0; i < 10; i++) {
        let type = getRandomInt(1, 4); // 1: Surd Add/Sub, 2: Surd Mul, 3: Surd Div, 4: Pi operations
        let a = 0, b = 0, s = 0, q, ans, expl;

        let key;
        do {
            if (type === 1) { // Like terms
                s = [2, 3, 5, 7, 11][getRandomInt(0, 4)];
                a = getRandomInt(1, 10);
                b = getRandomInt(1, 10);
                const isAdd = Math.random() > 0.5;
                if (isAdd) {
                    ans = `${a + b}\\sqrt{${s}}`;
                    q = `Evaluate: ${a}\\sqrt{${s}} + ${b}\\sqrt{${s}}`;
                    expl = `Like surds can be added by adding their coefficients: $(${a} + ${b})\\sqrt{${s}} = ${a+b}\\sqrt{${s}}$.`;
                } else {
                    if (a < b) [a, b] = [b, a];
                    ans = `${a - b === 0 ? '0' : (a - b === 1 ? '' : a - b) + '\\sqrt{' + s + '}'}`;
                    q = `Subtract: ${a}\\sqrt{${s}} - ${b}\\sqrt{${s}}`;
                    expl = `Like surds can be subtracted: $(${a} - ${b})\\sqrt{${s}}$.`;
                }
            } else if (type === 2) { // Mul
                a = [2, 3, 5, 6, 7][getRandomInt(0, 4)];
                b = [2, 3, 5, 6, 7][getRandomInt(0, 4)];
                ans = `\\sqrt{${a * b}}`;
                q = `Multiply: $\\sqrt{${a}} \\times \\sqrt{${b}}$`;
                expl = `Rule: $\\sqrt{a} \\times \\sqrt{b} = \\sqrt{a \\times b}$. So, $\\sqrt{${a} \\times ${b}} = \\sqrt{${a*b}}$.`;
            } else if (type === 3) { // Div
                b = [2, 3, 5][getRandomInt(0, 2)];
                const res = [2, 3, 5, 6, 7][getRandomInt(0, 4)];
                a = b * res;
                ans = `\\sqrt{${res}}`;
                q = `Calculate: $\\frac{\\sqrt{${a}}}{\\sqrt{${b}}}$`;
                expl = `Rule: $\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}$. $\\sqrt{\\frac{${a}}{${b}}} = \\sqrt{${res}}$.`;
            } else { // Pi
                a = getRandomInt(1, 15);
                b = getRandomInt(1, 15);
                const isAdd = Math.random() > 0.5;
                if (isAdd) {
                    ans = `${a + b}\\pi`;
                    q = `Simplify: ${a}\\pi + ${b}\\pi`;
                    expl = `Treat $\\pi$ like a variable: $(${a} + ${b})\\pi = ${a+b}\\pi$.`;
                } else {
                    if (a < b) [a, b] = [b, a];
                    ans = `${a - b === 0 ? '0' : (a - b === 1 ? '' : a - b) + '\\pi'}`;
                    q = `Evaluate: ${a}\\pi - ${b}\\pi`;
                    expl = `Treat $\\pi$ like a variable: $(${a} - ${b})\\pi = ${a-b}\\pi$.`;
                }
            }
            key = `${type}-${a}-${b}-${s}`;
        } while (usedSets.has(key));
        usedSets.add(key);

        const distractors = [];
        while (distractors.length < 3) {
            let wStr;
            if (type === 1) wStr = `${getRandomInt(1, 30)}\\sqrt{${s}}`;
            else if (type === 2) wStr = `\\sqrt{${getRandomInt(2, 60)}}`;
            else if (type === 3) wStr = `\\sqrt{${getRandomInt(2, 20)}}`;
            else wStr = `${getRandomInt(1, 40)}\\pi`;

            if (wStr !== ans && !distractors.includes(wStr)) {
                distractors.push(wStr);
            }
        }

        questions.push(mcq(q, `$${ans}$`, distractors.map(d => `$${d}$`), expl));
    }
    return questions;
}

export function genSkill3A() {
    const questions = [];
    const usedSets = new Set();

    for (let i = 0; i < 10; i++) {
        let type = getRandomInt(1, 4);
        let a = 0, b = 0, s = 0, q, ans, expl;

        let key;
        do {
            if (type === 1) { // Mixed Rational/Irrational
                a = getRandomInt(2, 10);
                s = [2, 3, 5][getRandomInt(0, 2)];
                ans = "Cannot be simplified further";
                q = `Simplify the expression: $${a} + \\sqrt{${s}}$`;
                expl = `We cannot add a rational number to an irrational square root directly.`;
            } else if (type === 2) { // Square of root
                s = [2, 3, 5, 6, 7, 10, 11][getRandomInt(0, 6)];
                ans = s.toString();
                q = `Calculate: $(\\sqrt{${s}})^2$`;
                expl = `Squaring a square root gives the original number: $(\\sqrt{${s}})^2 = ${s}$.`;
            } else if (type === 3) { // Multiple coefficients
                a = getRandomInt(2, 5);
                b = getRandomInt(2, 5);
                let x = [2, 3, 5][getRandomInt(0, 2)];
                let y = [3, 7, 11][getRandomInt(0, 2)];
                if (x === y) y = 13;
                ans = `${a * b}\\sqrt{${x * y}}`;
                q = `Evaluate: $(${a}\\sqrt{${x}}) \\times (${b}\\sqrt{${y}})$`;
                expl = `Multiply coefficients and surds separately: $(${a} \\times ${b}) \\sqrt{${x} \\times ${y}} = ${a*b}\\sqrt{${x*y}}$.`;
            } else { // Circle Radius
                const r = [2, 3, 4, 5, 6, 10][getRandomInt(0, 5)];
                ans = r.toString();
                q = `If the area of a circle is $${r * r}\\pi$, what is the radius?`;
                expl = `Area $= \\pi r^2$. So $r^2 = ${r*r}$, which means $r = ${r}$.`;
            }
            key = `${type}-${a}-${b}-${s}`;
        } while (usedSets.has(key));
        usedSets.add(key);

        const distractors = [];
        if (type === 1) {
            distractors.push(`$${a}\\sqrt{${s}}$`, `$${a + s}$`, `$${a - s}$`);
        } else {
            while (distractors.length < 3) {
                let w;
                if (type === 2) w = (parseInt(ans) + getRandomInt(-10, 10)).toString();
                else if (type === 3) w = `${getRandomInt(2, 30)}\\sqrt{${getRandomInt(2, 40)}}`;
                else w = (parseInt(ans) + getRandomInt(-5, 5)).toString();
                if (w !== ans && !distractors.includes(w)) distractors.push(w);
            }
        }

        const finalAns = type === 1 ? ans : `$${ans}$`;
        const finalDists = type === 1 ? distractors : distractors.map(d => d.includes('$') ? d : `$${d}$`);

        questions.push(mcq(q, finalAns, finalDists, expl));
    }
    return questions;
}

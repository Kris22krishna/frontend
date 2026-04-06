function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffle(arr) { let c = arr.length, r; while (c !== 0) { r = Math.floor(Math.random() * c); c--; [arr[c], arr[r]] = [arr[r], arr[c]]; } return arr; }
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

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

export function genSkill1Q() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(6, 48);
        let b = getRandomInt(6, 48);
        while (a === b) b = getRandomInt(6, 48);
        const ans = gcd(a, b);
        questions.push(mcq(
            `Find the HCF of **${a}** and **${b}**.`,
            ans.toString(),
            [(ans * 2).toString(), '1', Math.max(a, b).toString()],
            `The Highest Common Factor (HCF) is the largest number that divides both ${a} and ${b} without a remainder.`
        ));
    }
    return questions;
}

export function genSkill1A() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(10, 60);
        let b = getRandomInt(10, 60);
        while (a === b) b = getRandomInt(10, 60);
        const ans = gcd(a, b);
        questions.push(mcq(
            `What is $\\text{HCF}(${a}, ${b})$?`,
            ans.toString(),
            [(ans + getRandomInt(1, 5)).toString(), (a * b).toString(), '1'],
            `The HCF of ${a} and ${b} is ${ans}. You can find it by listing factors or using division.`
        ));
    }
    return questions;
}

export function genSkill2Q() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const g = getRandomInt(2, 8);
        const m1 = getRandomInt(2, 6);
        let m2 = getRandomInt(2, 6);
        while (gcd(m1, m2) !== 1) m2 = getRandomInt(2, 6); 
        const a = g * m1;
        const b = g * m2;

        questions.push(mcq(
            `Simplify the fraction $\\frac{${a}}{${b}}$ using HCF.`,
            `$\\frac{${m1}}{${m2}}$`,
            [
                `$\\frac{${a}}{${b}}$`,
                `$\\frac{${m1 + 1}}{${m2}}$`,
                `$\\frac{${m1}}{${m2 + 1}}$`
            ],
            `The HCF of ${a} and ${b} is ${g}. Dividing both by ${g} gives $\\frac{${m1}}{${m2}}$.`
        ));
    }
    return questions;
}

export function genSkill2A() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(10, 50);
        let b = getRandomInt(10, 50);
        while (a === b) b = getRandomInt(10, 50);
        const g = gcd(a, b);
        const l = (a / g) * b;
        questions.push(mcq(
            `If $\\text{LCM}(${a}, ${b}) = ${l}$, what is $\\text{HCF}(${a}, ${b})$?`,
            g.toString(),
            [l.toString(), (a * b).toString(), (g + 1).toString()],
            `Rule: $\\text{HCF} = \\text{Product} \\div \\text{LCM} = ${a*b} \\div ${l} = ${g}$.`
        ));
    }
    return questions;
}

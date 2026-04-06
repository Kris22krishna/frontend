function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffle(arr) { let c = arr.length, r; while (c !== 0) { r = Math.floor(Math.random() * c); c--; [arr[c], arr[r]] = [arr[r], arr[c]]; } return arr; }
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function lcm(a, b) { return (a / gcd(a, b)) * b; }

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
        const a = getRandomInt(2, 15);
        let b = getRandomInt(2, 15);
        while (a === b) b = getRandomInt(2, 15);
        const ans = lcm(a, b);
        questions.push(mcq(
            `Find the LCM of **${a}** and **${b}**.`,
            ans.toString(),
            [(a * b).toString(), (ans + a).toString(), Math.max(a, b).toString()],
            `The Least Common Multiple (LCM) is the smallest number that both ${a} and ${b} divide into evenly.`
        ));
    }
    return questions;
}

export function genSkill1A() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(3, 20);
        let b = getRandomInt(3, 20);
        while (a === b) b = getRandomInt(3, 20);
        const ans = lcm(a, b);
        questions.push(mcq(
            `What is $\\text{LCM}(${a}, ${b})$?`,
            ans.toString(),
            [(ans + getRandomInt(1, 10)).toString(), (a * b).toString(), gcd(a, b).toString()],
            `Multiplying the numbers and dividing by their HCF gives the LCM: $(${a} \\times ${b}) \\div \\text{HCF}(${a}, ${b}) = ${ans}$.`
        ));
    }
    return questions;
}

export function genSkill2Q() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(4, 18);
        let b = getRandomInt(4, 18);
        while (a === b) b = getRandomInt(4, 18);
        const l = lcm(a, b);
        const prod = a * b;
        questions.push(mcq(
            `Two events repeat every **${a}** and **${b}** minutes. When is the first time they happen together again?`,
            `${l} minutes`,
            [`${prod} minutes`, `${gcd(a, b)} minutes`, `${l + a} minutes`],
            `The events happen together at every common multiple. The first time is the Least Common Multiple (LCM).`
        ));
    }
    return questions;
}

export function genSkill2A() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(2, 12);
        let b = getRandomInt(2, 12);
        while (a === b) b = getRandomInt(2, 12);
        const g = gcd(a, b);
        const l = lcm(a, b);
        questions.push(mcq(
            `If $\\text{HCF}(${a}, ${b}) = ${g}$, and the product is $${a * b}$, find $\\text{LCM}(${a}, ${b})$.`,
            l.toString(),
            [(a * b).toString(), g.toString(), (l + g).toString()],
            `Rule: $\\text{LCM} \\times \\text{HCF} = \\text{Product of numbers}$. So $\\text{LCM} = ${a*b} \\div ${g} = ${l}$.`
        ));
    }
    return questions;
}

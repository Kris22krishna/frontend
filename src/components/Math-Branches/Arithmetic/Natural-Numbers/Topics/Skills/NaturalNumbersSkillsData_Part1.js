// NaturalNumbersSkillsData_Part1.js

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
// Skill 1: Identification & Basic Counting
// ----------------------------------------------------
export function genSkill1Q() {
    const questions = [];
    for (let i = 0; i < 5; i++) {
        const type = getRandomInt(1, 2);
        if (type === 1) { // Identify if natural or not
            const isNatural = Math.random() > 0.5;
            let numStr;
            if (isNatural) {
                numStr = getRandomInt(1, 100).toString();
            } else {
                const falsyTypes = [ "0", "-5", "3.14", "1/2" ];
                numStr = falsyTypes[getRandomInt(0, falsyTypes.length - 1)];
            }

            questions.push(mcq(
                `Is the number ${numStr} a Natural Number?`,
                isNatural ? "Yes" : "No",
                isNatural ? ["No"] : ["Yes"],
                isNatural ? `${numStr} is a counting number.` : `${numStr} is not a counting number.`
            ));
        } else {
            // Counting objects in a sequence
            const start = getRandomInt(1, 10);
            const ans = start + 3;
            questions.push(mcq(
                `Complete the natural number sequence: ${start}, ${start + 1}, ${start + 2}, ___`,
                ans.toString(),
                [(ans + 1).toString(), (ans - 1).toString(), (ans + 2).toString()],
                `In natural numbers, we just add 1: ${start+2} + 1 = ${ans}.`
            ));
        }
    }
    return questions;
}

export function genSkill1A() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const type = getRandomInt(1, 3);
        if (type <= 2) {
            const isNatural = Math.random() > 0.5;
            let numStr;
            if (isNatural) {
                numStr = getRandomInt(10, 500).toString();
            } else {
                numStr = ["0", "-15", "0.75", "\\frac{2}{3}"][getRandomInt(0, 3)];
            }
            questions.push(mcq(
                `True or False: $` + numStr + `$ is a Natural Number.`,
                isNatural ? "True" : "False",
                isNatural ? ["False"] : ["True"],
                isNatural ? `$${numStr}$ is a counting number.` : `$${numStr}$ is not a counting number.`
            ));
        } else {
            const start = getRandomInt(15, 50);
            questions.push(mcq(
                `What is the 5th natural number after ${start}?`,
                (start + 5).toString(),
                [(start + 4).toString(), (start + 6).toString(), (start + 10).toString()],
                `Count 5 forward: ${start} + 5 = ${start+5}.`
            ));
        }
    }
    return questions;
}

// ----------------------------------------------------
// Skill 2: Successors & Predecessors
// ----------------------------------------------------
export function genSkill2Q() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const isSuccessor = Math.random() > 0.5;
        const num = getRandomInt(2, 999);
        if (isSuccessor) {
            const ans = num + 1;
            questions.push(mcq(
                `What is the successor of ${num}?`,
                ans.toString(),
                [(num - 1).toString(), (num + 2).toString(), num.toString()],
                `Successor means "next number": ${num} + 1 = ${ans}.`
            ));
        } else {
            const ans = num - 1;
            questions.push(mcq(
                `What is the predecessor of ${num}?`,
                ans.toString(),
                [(num + 1).toString(), (num - 2).toString(), num.toString()],
                `Predecessor means "previous number": ${num} - 1 = ${ans}.`
            ));
        }
    }
    return questions;
}

export function genSkill2A() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const type = getRandomInt(1, 3);
        const num = getRandomInt(50, 5000);
        
        if (type === 1) { // Successor
            const ans = num + 1;
            questions.push(mcq(
                `Identify the successor of ${num}:`,
                ans.toString(),
                [(num - 1).toString(), (num + 10).toString(), (num * 2).toString()],
                `Successor of ${num} is ${num + 1}.`
            ));
        } else if (type === 2) { // Predecessor
            const ans = num - 1;
            questions.push(mcq(
                `Identify the predecessor of ${num}:`,
                ans.toString(),
                [(num + 1).toString(), (num - 10).toString(), "None"],
                `Predecessor of ${num} is ${num - 1}.`
            ));
        } else { // Edge Case Concept
            questions.push(mcq(
                `Which Natural Number has NO predecessor in the set of Natural Numbers?`,
                "1",
                ["0", "10", "None of the above"],
                `In the set of Natural Numbers (1, 2, 3...), 1 is the first number and has no predecessor.`
            ));
        }
    }
    return questions;
}

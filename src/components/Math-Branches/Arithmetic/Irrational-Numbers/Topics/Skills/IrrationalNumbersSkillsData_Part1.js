// IrrationalNumbersSkillsData_Part1.js

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
// Skill 1: Estimating Radicals
// ----------------------------------------------------
export function genSkill1Q() {
    const questions = [];
    const used = new Set();
    for (let i = 0; i < 10; i++) {
        let root, randVal;
        do {
            root = getRandomInt(1, 12);
            randVal = getRandomInt(root * root + 1, (root + 1) * (root + 1) - 1);
        } while (used.has(randVal));
        used.add(randVal);
        
        questions.push(mcq(
            `Between which two consecutive integers does $\\sqrt{${randVal}}$ lie?`,
            `${root} and ${root + 1}`,
            [
                `${root + 1} and ${root + 2}`,
                `${root - 1} and ${root}`,
                `${root * root} and ${(root + 1) * (root + 1)}`
            ],
            `Since ${root}^2 = ${root * root} and ${(root+1)}^2 = ${(root+1)*(root+1)}, the square root of ${randVal} must be between ${root} and ${root+1}.`
        ));
    }
    return questions;
}

export function genSkill1A() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const root = getRandomInt(2, 12);
        const lowerSquare = root * root;
        const upperSquare = (root + 1) * (root + 1);
        
        const isCloserToLower = Math.random() > 0.5;
        let randVal;
        if (isCloserToLower) {
            randVal = lowerSquare + getRandomInt(1, Math.floor((upperSquare - lowerSquare) / 2) - 1);
        } else {
            randVal = upperSquare - getRandomInt(1, Math.floor((upperSquare - lowerSquare) / 2) - 1);
        }

        const exactRoot = Math.sqrt(randVal);
        const ansStr = exactRoot.toFixed(1);

        questions.push(mcq(
            `Estimate the value of $\\sqrt{${randVal}}$ to one decimal place. (Hint: It is between ${root} and ${root + 1}).`,
            ansStr,
            [
                (exactRoot + 0.5).toFixed(1),
                (exactRoot - 0.4).toFixed(1),
                isCloserToLower ? `${(root + 0.8).toFixed(1)}` : `${(root + 0.2).toFixed(1)}`
            ],
            `$\\sqrt{${randVal}}$ is approximately $${ansStr}$ because $${ansStr}^2 \\approx ${randVal}$.`
        ));
    }
    return questions;
}

// ----------------------------------------------------
// Skill 2: Distinguishing Rational vs Irrational Operations
// ----------------------------------------------------
export function genSkill2Q() {
    const pool = [
        { q: "What is the result of $3 + \\pi$?", a: "Irrational", d: ["Rational", "Integer", "Zero"], e: "Sum of rational and irrational is always irrational." },
        { q: "What is the result of $5 \\times \\sqrt{2}$?", a: "Irrational", d: ["Rational", "Integer", "Fraction"], e: "Product of non-zero rational and irrational is irrational." },
        { q: "What is the result of $\\sqrt{3} \\times \\sqrt{3}$?", a: "Rational", d: ["Irrational", "Fraction", "Negative Number"], e: "$\\sqrt{3} \\times \\sqrt{3} = 3$, which is rational." },
        { q: "What type of number is $0.333...$ (repeating)?", a: "Rational", d: ["Irrational", "Imaginary", "Surd"], e: "Repeating decimals can be written as fractions (1/3)." },
        { q: "Identify $\\sqrt{49}$:", a: "Rational", d: ["Irrational", "Surd", "Imaginary"], e: "$\\sqrt{49} = 7$, which is a whole number." },
        { q: "What is $0.121221222...$?", a: "Irrational", d: ["Rational", "Repeating Decimal", "Integer"], e: "Decimals that neither end nor repeat are irrational." },
        { q: "Is $\\frac{\\pi}{\\pi}$ rational?", a: "Yes", d: ["No", "Undefined", "Infinite"], e: "$\\frac{\\pi}{\\pi} = 1$, which is rational." },
        { q: "Identify $\\sqrt{2}$:", a: "Irrational", d: ["Rational", "Natural Number", "Repeating Decimal"], e: "Square root of a non-perfect square is irrational." },
        { q: "What is $0 + \\sqrt{5}$?", a: "Irrational", d: ["Rational", "Zero", "Integer"], e: "Result is $\\sqrt{5}$, which is irrational." },
        { q: "Evaluate $\\sqrt{11}$ type:", a: "Irrational", d: ["Rational", "Whole Number", "Perfect Square"], e: "11 is not a perfect square." }
    ];

    const shuffledPool = shuffle([...pool]);
    return shuffledPool.slice(0, 10).map(item => mcq(item.q, item.a, item.d, item.e));
}

export function genSkill2A() {
    return genSkill2Q(); 
}

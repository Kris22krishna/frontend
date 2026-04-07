// RationalNumbersSkillsData_Part1.js

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
// Skill 1: Decimals & Percentages
// ----------------------------------------------------
export function genSkill1Q() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const type = getRandomInt(1, 2);
        
        if (type === 1) { // Fraction to Decimal
            const denoms = [2, 4, 5, 10, 20, 25];
            const d = denoms[getRandomInt(0, denoms.length - 1)];
            const n = getRandomInt(1, d - 1);
            
            const ansNum = n / d;
            
            questions.push(mcq(
                `Convert this fraction to a decimal: \n\n $\\frac{${n}}{${d}}$`,
                ansNum.toString(),
                [
                    (ansNum + 0.1).toFixed(2).replace(/\.?0+$/, ''),
                    (ansNum * 2).toString(),
                    (ansNum / 2).toString()
                ],
                `Divide ${n} by ${d} to find the decimal equivalent.`
            ));
        } else { // Decimal to Percent
            const dec = (getRandomInt(1, 99) / 100);
            const ansStr = `${Math.round(dec * 100)}%`;
            questions.push(mcq(
                `Convert this decimal to a percentage: \n\n ${dec}`,
                ansStr,
                [
                    `${Math.round(dec * 10)}%`,
                    `${Math.round(dec * 1000)}%`,
                    `${Math.round(dec)}%`
                ],
                `Multiply the decimal by 100 and add the % sign.`
            ));
        }
    }
    return questions;
}

export function genSkill1A() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const dec = (getRandomInt(1, 150) / 100);
        const ansNum = Math.round(dec * 100);
        questions.push(mcq(
            `Which value is NOT equivalent to ${dec}?`,
            `${ansNum * 10}%`,
            [
                `${ansNum}%`,
                `\\frac{${ansNum}}{100}`,
                `${dec}`
            ],
            `${dec} is equal to ${ansNum/100} or ${ansNum}%. ${ansNum * 10}% is 10 times larger.`
        ));
    }
    return questions;
}

// ----------------------------------------------------
// Skill 2: Evaluating Rational Types
// ----------------------------------------------------
export function genSkill2Q() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const isRational = Math.random() > 0.4;
        
        let displayStr;
        if (isRational) {
            const types = ["0.333...", "1/7", "-4.5", "100"];
            displayStr = types[getRandomInt(0, types.length - 1)];
        } else {
            const types = ["\\pi", "\\sqrt{2}", "3.14159265...", "\\sqrt{3}"];
            displayStr = types[getRandomInt(0, types.length - 1)];
        }

        questions.push(mcq(
            `Is $${displayStr}$ a rational number?`,
            isRational ? "Yes" : "No",
            isRational ? ["No"] : ["Yes"],
            isRational ? `$${displayStr}$ can be written as a simple fraction.` : `$${displayStr}$ cannot be written as a simple fraction.`
        ));
    }
    return questions;
}

export function genSkill2A() {
    return genSkill2Q(); 
}

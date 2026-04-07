// FractionsSkillsData_Part1.js

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

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
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
// Skill 1: Equivalent & Simplification
// ----------------------------------------------------
export function genSkill1Q() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const factor = getRandomInt(2, 6);
        let n = getRandomInt(1, 10);
        let d = getRandomInt(2, 12);
        while (n >= d) { d = getRandomInt(2, 12); } // Ensure proper fraction initially
        const g = gcd(n, d);
        n = n / g; // Simplest form
        d = d / g;
        
        const bigN = n * factor;
        const bigD = d * factor;

        questions.push(mcq(
            `Simplify the fraction to its lowest terms: \n\n $\\frac{${bigN}}{${bigD}}$`,
            `\\frac{${n}}{${d}}`,
            [
                `\\frac{${n+1}}{${d}}`,
                `\\frac{${n}}{${d+1}}`,
                `\\frac{${bigN/2}}{${bigD/2}}`
            ],
            `Divide both numerator and denominator by their greatest common divisor (${factor}).`
        ));
    }
    return questions;
}

export function genSkill1A() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        let n = getRandomInt(1, 9);
        let d = getRandomInt(2, 10);
        while (n >= d) { d = getRandomInt(2, 10); }
        const factor = getRandomInt(2, 5);

        questions.push(mcq(
            `Which fraction is equivalent to $\\frac{${n}}{${d}}$?`,
            `\\frac{${n * factor}}{${d * factor}}`,
            [
                `\\frac{${n + factor}}{${d + factor}}`,
                `\\frac{${n * factor + 1}}{${d * factor}}`,
                `\\frac{${n}}{${d * factor}}`
            ],
            `Equivalent fractions are found by multiplying or dividing the top and bottom by the same number.`
        ));
    }
    return questions;
}

// ----------------------------------------------------
// Skill 2: Addition & Subtraction
// ----------------------------------------------------
export function genSkill2Q() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const isCommonDenom = Math.random() > 0.5;
        const op = Math.random() > 0.5 ? '+' : '-';
        
        let n1, d1, n2, d2;
        if (isCommonDenom) {
            d1 = d2 = getRandomInt(3, 15);
            n1 = getRandomInt(2, d1 - 1);
            n2 = getRandomInt(1, n1); // Ensure no negatives for simple practice initially
        } else {
            d1 = getRandomInt(2, 6);
            d2 = getRandomInt(2, 6);
            while (d1 === d2) d2 = getRandomInt(2, 6);
            n1 = getRandomInt(1, d1 - 1);
            n2 = getRandomInt(1, d2 - 1);
        }

        let num, den;
        if (op === '+') {
            num = (n1 * d2) + (n2 * d1);
            den = d1 * d2;
        } else {
            num = (n1 * d2) - (n2 * d1);
            den = d1 * d2;
        }

        const g = Math.abs(gcd(num, den));
        num /= g;
        den /= g;

        let ansStr = den === 1 ? num.toString() : `\\frac{${num}}{${den}}`;
        let fake3 = op === '+' ? `\\frac{${n1+n2}}{${d1+d2}}` : `\\frac{${n1-n2}}{${Math.abs(d1-d2) || 1}}`;

        questions.push(mcq(
            `Calculate and simplify: \n\n $\\frac{${n1}}{${d1}} ${op} \\frac{${n2}}{${d2}}$`,
            ansStr,
            [`\\frac{${num+1}}{${den}}`, `\\frac{${num}}{${den+1}}`, fake3],
            `To ${op === '+' ? 'add' : 'subtract'} fractions, find a common denominator first, then ${op === '+' ? 'add' : 'subtract'} the numerators.`
        ));
    }
    return questions;
}

export function genSkill2A() {
    return genSkill2Q(); 
}

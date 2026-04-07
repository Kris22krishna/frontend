// IntegersSkillsData_Part1.js

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
// Skill 1: Comparing & Ordering
// ----------------------------------------------------
export function genSkill1Q() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const type = getRandomInt(1, 2);
        const a = getRandomInt(-50, 50);
        let b = getRandomInt(-50, 50);
        while (a === b) b = getRandomInt(-50, 50); // Ensure distinct numbers

        if (type === 1) { // Compare two numbers
            const correctSign = a > b ? ">" : "<";
            questions.push(mcq(
                `Compare the integers: \n\n ${a} ___ ${b}`,
                correctSign,
                [a < b ? ">" : "<", "="],
                `${a} is to the ${a > b ? 'right' : 'left'} of ${b} on the number line.`
            ));
        } else { // Identify the largest/smallest
            const isLargest = Math.random() > 0.5;
            const c = getRandomInt(-50, 50);
            const d = getRandomInt(-50, 50);
            const arr = [a, b, c, d];
            const ans = isLargest ? Math.max(...arr) : Math.min(...arr);
            const distractors = [...new Set(arr)].filter(x => x !== ans).map(String);
            
            questions.push(mcq(
                `Which of these integers is the **${isLargest ? 'Largest' : 'Smallest'}**?\n\n ${arr.join(', ')}`,
                ans.toString(),
                distractors.slice(0, 3),
                isLargest ? `On the number line, the rightmost number is the largest.` : `On the number line, the leftmost number is the smallest.`
            ));
        }
    }
    return questions;
}

export function genSkill1A() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(-200, 200);
        let b = getRandomInt(-200, 200);
        while (a === b) b = getRandomInt(-200, 200);

        questions.push(mcq(
            `Choose the correct statement:`,
            `${a} ${a > b ? ">" : "<"} ${b}`,
            [
                `${a} ${a > b ? "<" : ">"} ${b}`,
                `${a} = ${b}`,
                `${Math.abs(a)} < -${Math.abs(b)}`
            ],
            `Remember: Negative numbers increase in value as they move towards zero (right).`
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
        const isAddition = Math.random() > 0.5;
        const a = getRandomInt(-30, 30);
        const b = getRandomInt(-30, 30);
        
        let ans, text, expl;
        if (isAddition) {
            ans = a + b;
            text = `Calculate: \n\n ${a} + (${b})`;
            expl = `Starting at ${a}, we move ${Math.abs(b)} units to the ${b >= 0 ? "right" : "left"}. Result: ${ans}.`;
        } else {
            ans = a - b;
            text = `Calculate: \n\n ${a} - (${b})`;
            expl = `Subtracting ${b} is the same as adding its opposite ${-b}. ${a} + (${-b}) = ${ans}.`;
        }

        questions.push(mcq(
            text,
            ans.toString(),
            [(ans + 10).toString(), (ans - 5).toString(), (ans + 1).toString()],
            expl
        ));
    }
    return questions;
}

export function genSkill2A() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const a = getRandomInt(-100, 100);
        const b = getRandomInt(-100, 100);
        const isAddition = Math.random() > 0.5;
        
        let ans, text, expl;
        if (isAddition) {
            ans = a + b;
            text = `What is the sum? \n\n$${a} + (${b}) =$ ?`;
            expl = `${a} + (${b}) = ${ans}.`;
        } else {
            ans = a - b;
            text = `What is the difference? \n\n$${a} - (${b}) =$ ?`;
            expl = `${a} - (${b}) = ${ans}.`;
        }

        questions.push(mcq(
            text,
            ans.toString(),
            [(ans + 15).toString(), (-ans).toString(), (a + Math.abs(b)).toString()],
            expl
        ));
    }
    return questions;
}

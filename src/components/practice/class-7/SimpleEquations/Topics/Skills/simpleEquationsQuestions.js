const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const generateUniqueQuestions = (generatorFunc, count) => {
    const questions = [];
    const signatures = new Set();
    let attempts = 0;
    while (questions.length < count && attempts < count * 10) {
        attempts++;
        const q = generatorFunc();
        // create a unique signature based on question text and correct answer
        const signature = `${q.question}_${q.options[q.correct]}`;
        if (!signatures.has(signature)) {
            signatures.add(signature);
            questions.push(q);
        }
    }
    return questions;
};

// ─── TOPIC 1.1: Forming Expressions ─────────────────────────────────────
export const generateFormingExpressions = () => {
    const vars = ['x', 'y', 'z', 'p', 'm', 'n'];
    const v = pickRandom(vars);
    const m = getRandomInt(2, 10);
    const a = getRandomInt(1, 15);
    
    const types = [
        {
            q: `A number $${v}$ is multiplied by $${m}$ and $${a}$ is added. Write the expression.`,
            ans: `$${m}${v} + ${a}$`,
            wrongs: [`$${v} + ${m} + ${a}$`, `$${m} + ${a}${v}$`, `$${m}${v} - ${a}$`]
        },
        {
            q: `A number $${v}$ is multiplied by $${m}$ and $${a}$ is subtracted. Write the expression.`,
            ans: `$${m}${v} - ${a}$`,
            wrongs: [`$${m}${v} + ${a}$`, `$${a} - ${m}${v}$`, `$${m}(${v} - ${a})$`]
        },
        {
            q: `If a number $${v}$ is increased by $${a}$ after multiplying it by $${m}$, write the expression.`,
            ans: `$${m}${v} + ${a}$`,
            wrongs: [`$${m}(${v} + ${a})$`, `$${v} + ${m}${a}$`, `$${m} + ${v} + ${a}$`]
        }
    ];
    
    const t = pickRandom(types);
    const options = [t.ans, ...t.wrongs];
    shuffle(options);
    
    return {
        question: t.q,
        options,
        correct: options.indexOf(t.ans),
        explanation: `Multiplying $${v}$ by $${m}$ gives $${m}${v}$. ${t.q.includes('added') || t.q.includes('increased') ? `Adding $${a}$ makes it $${m}${v} + ${a}$.` : `Subtracting $${a}$ makes it $${m}${v} - ${a}$.`}`
    };
};

// ─── TOPIC 1.2: Setting up Equations ─────────────────────────────────────
export const generateSettingUpEquations = () => {
    const vars = ['x', 'y', 'p', 'n'];
    const v = pickRandom(vars);
    const m = getRandomInt(2, 9);
    const a = getRandomInt(1, 20);
    const c = getRandomInt(30, 90);
    
    const isSub = Math.random() < 0.5;
    const q = isSub 
        ? `$${m}$ times a number $${v}$ minus $${a}$ gives $${c}$. Form the equation.`
        : `A number $${v}$ multiplied by $${m}$ and increased by $${a}$ gives $${c}$. Form the equation.`;
        
    const ans = isSub ? `$${m}${v} - ${a} = ${c}$` : `$${m}${v} + ${a} = ${c}$`;
    const wrongs = [
        `$${m}(${v} ${isSub ? '-' : '+'} ${a}) = ${c}$`,
        `$${m}${v} ${isSub ? '+' : '-'} ${a} = ${c}$`,
        `$${v} ${isSub ? '-' : '+'} ${m}a = ${c}$`
    ];
    
    const options = [ans, ...wrongs];
    shuffle(options);
    
    return {
        question: q,
        options,
        correct: options.indexOf(ans),
        explanation: `"$${m}$ times a number $${v}$" translates to $${m}${v}$. "${isSub ? 'minus' : 'increased by'} $${a}$" makes it $${m}${v} ${isSub ? '-' : '+'} ${a}$, which equals $${c}$.`
    };
};

// ─── TOPIC 2.1: Variables and Expressions ─────────────────────────────────────
export const generateVariablesAndExpressions = () => {
    const vars = ['x', 'y', 'p', 'm'];
    const v = pickRandom(vars);
    const m = getRandomInt(2, 8);
    const a = getRandomInt(2, 10);
    const val = getRandomInt(2, 8);
    
    const isSub = Math.random() < 0.5;
    const sign = isSub ? '-' : '+';
    const ansNum = isSub ? (m * val - a) : (m * val + a);
    
    const ans = `$${ansNum}$`;
    const wrongs = [`$${ansNum + m}$`, `$${isSub ? (m * val + a) : (m * val - a)}$`, `$${m + val + a}$`];
    
    const options = [ans, ...wrongs];
    shuffle(options);
    
    return {
        question: `Find the value of $${m}${v} ${sign} ${a}$ when $${v} = ${val}$.`,
        options,
        correct: options.indexOf(ans),
        explanation: `Substitute $${v} = ${val}$ into the expression: $${m}(${val}) ${sign} ${a} = ${m * val} ${sign} ${a} = ${ansNum}$.`
    };
};

// ─── TOPIC 2.2: Meaning of Equation ─────────────────────────────────────
export const generateMeaningOfEquation = () => {
    const v = pickRandom(['x', 'y', 'n', 'p']);
    const m = getRandomInt(2, 9);
    const a = getRandomInt(2, 15);
    const c = getRandomInt(20, 50);
    
    const type = getRandomInt(1, 2);
    if (type === 1) {
        // LHS/RHS
        const expr = `$${m}${v} + ${a} = ${c}$`;
        const ans = `The LHS is $${m}${v} + ${a}$ and RHS is $${c}$`;
        const wrongs = [
            `The LHS is $${m}${v}$ and RHS is $${a} = ${c}$`,
            `The LHS is $${c}$ and RHS is $${m}${v} + ${a}$`,
            `The LHS is $${m}${v} + ${a} = ${c}$ and RHS is $0$`
        ];
        const options = [ans, ...wrongs];
        shuffle(options);
        return {
            question: `Identify the Left Hand Side (LHS) and Right Hand Side (RHS) of: ${expr}.`,
            options,
            correct: options.indexOf(ans),
            explanation: `The LHS is everything to the left of the '=' sign ($${m}${v} + ${a}$), and the RHS is everything to the right ($${c}$).`
        };
    } else {
        // Identify equation
        const isEq = true;
        const eqStr = `$${m}${v} + ${a} = ${c}$`;
        const wrongs = [`$${m}${v} + ${a} > ${c}$`, `$${m}${v} + ${a}$`, `$${m}${v} + ${a} < ${c}$`];
        const all = [eqStr, ...wrongs];
        shuffle(all);
        
        return {
            question: `Which of the following mathematical statements is an EQUATION?`,
            options: all,
            correct: all.indexOf(eqStr),
            explanation: `An equation MUST contain an '=' (equals) sign. Only ${eqStr} is an equation.`
        };
    }
};

// ─── TOPIC 3: Statements <-> Equations ─────────────────────────────────────
export const generateStatementConversions = () => {
    const type = Math.random();
    const v = pickRandom(['x', 'y', 'n', 'p']);
    const m = getRandomInt(2, 6);
    const a = getRandomInt(2, 12);
    const c = getRandomInt(15, 40);

    if (type < 0.5) {
        // Statement to Eq
        const ans = `$${m}${v} + ${a} = ${c}$`;
        const options = [ans, `$${m}(${v} + ${a}) = ${c}$`, `$${m}${v} - ${a} = ${c}$`, `$${v} + ${m}a = ${c}$`];
        shuffle(options);
        return {
            question: `The sum of $${m}$ times a number $${v}$ and $${a}$ is $${c}$. Form the equation.`,
            options,
            correct: options.indexOf(ans),
            explanation: `"$${m}$ times a number $${v}$" is $${m}${v}$. "Sum of... and $${a}$" means $${m}${v} + ${a}$. "Is $${c}$" means $= ${c}$.`
        };
    } else {
        // Eq to Statement
        const ans = `Three times an unknown number $${v}$ minus 5 equals 10`;
        const options = [ans, `Three times an unknown number $${v}$ equals 10 minus 5`, `Five minus three times an unknown number $${v}$ equals 10`, `The sum of three times $${v}$ and 5 is 10`];
        shuffle(options);
        return {
            question: `Convert the equation $3${v} - 5 = 10$ into a descriptive sentence.`,
            options,
            correct: options.indexOf(ans),
            explanation: `$3${v}$ means "three times a number". $- 5$ means "minus 5". $= 10$ means "equals 10".`
        };
    }
};

// ─── TOPIC 4: Solving Simple Equations ─────────────────────────────────────
export const generateSolvingEquations = () => {
    const v = pickRandom(['x', 'y', 'n', 'm']);
    const type = getRandomInt(1, 4); // 1: add/sub, 2: mult, 3: div, 4: multi-step
    
    let q, ansNum, explanation;
    
    if (type === 1) { // x + a = c
        const a = getRandomInt(2, 15);
        const ansVal = getRandomInt(5, 20);
        const isAdd = Math.random() > 0.5;
        const c = isAdd ? (ansVal + a) : (ansVal - a);
        ansNum = ansVal;
        q = `Solve: $${v} ${isAdd ? '+' : '-'} ${a} = ${c}$`;
        explanation = isAdd 
            ? `Subtract $${a}$ from both sides:\n$${v} = ${c} - ${a} = ${ansVal}$`
            : `Add $${a}$ to both sides:\n$${v} = ${c} + ${a} = ${ansVal}$`;
    } else if (type === 2) { // mx = c
        const m = getRandomInt(2, 9);
        const ansVal = getRandomInt(3, 12);
        const c = m * ansVal;
        ansNum = ansVal;
        q = `Solve: $${m}${v} = ${c}$`;
        explanation = `Divide both sides by $${m}$:\n$${v} = \\frac{${c}}{${m}} = ${ansVal}$`;
    } else if (type === 3) { // x/m = c
        const m = getRandomInt(2, 6);
        const c = getRandomInt(3, 12);
        ansNum = m * c;
        q = `Solve: $\\frac{${v}}{${m}} = ${c}$`;
        explanation = `Multiply both sides by $${m}$:\n$${v} = ${c} \\times ${m} = ${ansNum}$`;
    } else { // multi-step mx + a = c
        const m = getRandomInt(2, 6);
        const ansVal = getRandomInt(3, 10);
        const a = getRandomInt(2, 12);
        const isAdd = Math.random() > 0.5;
        const c = isAdd ? (m * ansVal + a) : (m * ansVal - a);
        ansNum = ansVal;
        q = `Solve: $${m}${v} ${isAdd ? '+' : '-'} ${a} = ${c}$`;
        explanation = `Step 1: ${isAdd ? `Subtract` : `Add`} $${a}$ ${isAdd ? `from` : `to`} both sides. $${m}${v} = ${isAdd ? `${c} - ${a}` : `${c} + ${a}`} = ${isAdd ? c - a : c + a}.\nStep 2: Divide by $${m}$. $${v} = ${ansVal}$.`;
    }
    
    const ans = `$${v} = ${ansNum}$`;
    const wrongs = [`$${v} = ${ansNum + 2}$`, `$${v} = ${ansNum - 1}$`, `$${v} = ${ansNum + getRandomInt(3, 5)}$`];
    const options = [ans, ...wrongs];
    shuffle(options);
    
    return { question: q, options, correct: options.indexOf(ans), explanation };
};

// ─── TOPIC 4.4: Checking Solutions ─────────────────────────────────────
export const generateCheckingSolutions = () => {
    const v = pickRandom(['x', 'y', 'p']);
    const m = getRandomInt(2, 5);
    const a = getRandomInt(1, 10);
    const trueAns = getRandomInt(3, 8);
    const c = m * trueAns + a;
    
    const isCorrect = Math.random() > 0.5;
    const testVal = isCorrect ? trueAns : trueAns + getRandomInt(1, 3);
    
    const q = `Does $${v} = ${testVal}$ satisfy the equation $${m}${v} + ${a} = ${c}$?`;
    const ans = isCorrect ? 'Yes, it is the correct solution.' : 'No, it is not the solution.';
    const options = ['Yes, it is the correct solution.', 'No, it is not the solution.'];
    
    return {
        question: q,
        options,
        correct: options.indexOf(ans),
        explanation: `Substitute $${v} = ${testVal}$ into LHS: $${m}(${testVal}) + ${a} = ${m * testVal} + ${a} = ${m * testVal + a}$.\nRHS is $${c}$. Since LHS ${isCorrect ? '==' : '!='} RHS, it is ${isCorrect ? 'the solution.' : 'NOT the solution.'}`
    };
};

// ─── TOPIC 5: Properties & Transposition & Brackets ──────────────────────
export const generatePropertiesEquations = () => {
    const type = getRandomInt(1, 3);
    const v = pickRandom(['p', 'x', 'm', 'n']);
    
    if (type === 1) { // Transposition
        const m = getRandomInt(2, 7);
        const a = getRandomInt(3, 15);
        const c = getRandomInt(20, 50);
        const isSub = Math.random() > 0.5;
        const q = `If we use transposition to solve $${m}${v} ${isSub ? '-' : '+'} ${a} = ${c}$, what is the first step?`;
        
        const ans = isSub ? `Transpose $-${a}$ to RHS, making it $+${a}$` : `Transpose $+${a}$ to RHS, making it $-${a}$`;
        const wrongs = [
            `Divide both sides by $${m}$`,
            isSub ? `Transpose $-${a}$ to RHS, keeping it $-${a}$` : `Transpose $+${a}$ to RHS, keeping it $+${a}$`,
            `Multiply RHS by $${m}$`
        ];
        const options = [ans, ...wrongs];
        shuffle(options);
        return {
            question: q, options, correct: options.indexOf(ans),
            explanation: `Transposition moves a term exactly as is but reverses its sign. So ${isSub ? `$-${a}$ becomes $+${a}$` : `$+${a}$ becomes $-${a}$`} on the other side.`
        };
    } else { // Brackets
        const m = getRandomInt(2, 6);
        const a = getRandomInt(2, 8);
        const ansVal = getRandomInt(2, 6);
        const isSub = Math.random() > 0.5;
        
        const c = isSub ? m * (ansVal - a) : m * (ansVal + a);
        const q = `Solve the equation with brackets: $${m}(${v} ${isSub ? '-' : '+'} ${a}) = ${c}$`;
        
        const ans = `$${v} = ${ansVal}$`;
        const wrongs = [`$${v} = ${ansVal + 2}$`, `$${v} = ${ansVal - 1}$`, `$${v} = ${ansVal + a}$`];
        const options = [ans, ...wrongs];
        shuffle(options);
        
        return {
            question: q, options, correct: options.indexOf(ans),
            explanation: `Step 1: Expand brackets $\\Rightarrow ${m}${v} ${isSub ? '-' : '+'} ${m * a} = ${c}$.\nStep 2: Transpose $${m * a}$ $\\Rightarrow ${m}${v} = ${c} ${isSub ? '+' : '-'} ${m * a} = ${isSub ? c + m * a : c - m * a}$.\nStep 3: Divide by $${m}$ $\\Rightarrow ${v} = ${ansVal}$.`
        };
    }
};

// ─── TOPIC 6: Applications & Word Problems ─────────────────────────────────────
export const generateWordProblems = () => {
    const type = getRandomInt(1, 3);
    
    if (type === 1) { // Standard word problem
        const m = getRandomInt(3, 7);
        const a = getRandomInt(5, 15);
        const ansVal = getRandomInt(4, 12);
        const isSub = Math.random() > 0.5;
        const c = isSub ? (m * ansVal - a) : (m * ansVal + a);
        
        const q = `A number is multiplied by $${m}$ and ${isSub ? `reduced by $${a}$. The result is $${c}$` : `increased by $${a}$. The result is $${c}$`}. Find the number.`;
        const ans = `$${ansVal}$`;
        const wrongs = [`$${ansVal + 1}$`, `$${ansVal + 2}$`, `$${ansVal - 1}$`];
        const options = [ans, ...wrongs];
        shuffle(options);
        
        return {
            question: q, options, correct: options.indexOf(ans),
            explanation: `Let the number be $x$. Equation: $${m}x ${isSub ? '-' : '+'} ${a} = ${c}$.\n$${m}x = ${c} ${isSub ? '+' : '-'} ${a} = ${isSub ? c + a : c - a}$.\n$x = ${ansVal}$.`
        };
    } else if (type === 2) { // Age Problem
        const name = pickRandom(['Raju', 'Laxmi', 'Sam', 'Sita']);
        const m = getRandomInt(2, 4);
        const a = getRandomInt(2, 8);
        const ansVal = getRandomInt(8, 15); // Child age
        const fAge = m * ansVal + a;
        
        const q = `${name}'s father is $${a}$ years older than $${m}$ times ${name}'s age. If the father is $${fAge}$ years old, find ${name}'s age.`;
        const ans = `$${ansVal}$ years`;
        const wrongs = [`$${ansVal + 2}$ years`, `$${ansVal - 1}$ years`, `$${ansVal + 4}$ years`];
        const options = [ans, ...wrongs];
        shuffle(options);
        
        return {
            question: q, options, correct: options.indexOf(ans),
            explanation: `Let ${name}'s age be $x$. Equation: $${m}x + ${a} = ${fAge}$.\n$${m}x = ${fAge} - ${a} = ${fAge - a}$.\n$x = ${(fAge - a) / m}$.`
        };
    } else { // Fraction word problem
        const m = getRandomInt(2, 5); // denominator
        const a = getRandomInt(2, 10);
        const ansVal = getRandomInt(4, 10) * m;
        const isSub = Math.random() > 0.5;
        const c = isSub ? (ansVal / m - a) : (ansVal / m + a);
        
        const q = `One-${m === 2 ? 'half' : m === 3 ? 'third' : m === 4 ? 'fourth' : 'fifth'} of a number ${isSub ? `minus $${a}$ is $${c}$` : `plus $${a}$ is $${c}$`}. Find the number.`;
        const ans = `$${ansVal}$`;
        const wrongs = [`$${ansVal + m}$`, `$${ansVal - m}$`, `$${ansVal + m * 2}$`];
        const options = [ans, ...wrongs];
        shuffle(options);
        
        return {
            question: q, options, correct: options.indexOf(ans),
            explanation: `Let the number be $x$. Equation: $\\frac{x}{${m}} ${isSub ? '-' : '+'} ${a} = ${c}$.\n$\\frac{x}{${m}} = ${c} ${isSub ? '+' : '-'} ${a} = ${isSub ? c + a : c - a}$.\n$x = ${isSub ? c + a : c - a} \\times ${m} = ${ansVal}$.`
        };
    }
};

export const ALGEBRA_GENERATORS = {
    forming: () => generateUniqueQuestions(generateFormingExpressions, 10),
    settingUp: () => generateUniqueQuestions(generateSettingUpEquations, 10),
    varsExpr: () => generateUniqueQuestions(generateVariablesAndExpressions, 10),
    meaning: () => generateUniqueQuestions(generateMeaningOfEquation, 10),
    statements: () => generateUniqueQuestions(generateStatementConversions, 10),
    solving: () => generateUniqueQuestions(generateSolvingEquations, 10),
    checking: () => generateUniqueQuestions(generateCheckingSolutions, 10),
    properties: () => generateUniqueQuestions(generatePropertiesEquations, 10),
    wordProbs: () => generateUniqueQuestions(generateWordProblems, 10)
};

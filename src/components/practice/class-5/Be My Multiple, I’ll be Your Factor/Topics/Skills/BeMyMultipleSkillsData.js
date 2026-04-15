// ─── QUESTIONS & DATA FOR BE MY MULTIPLE, I'LL BE YOUR FACTOR ─────────────────

const getNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to get factors of a number
const getFactors = (n) => {
    const factors = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) factors.push(i);
    }
    return factors;
};

// Helper to get prime status
const isPrime = (n) => {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
};

// Deterministic single generator for Practice that strictly follows the subtopic order
export const generateQuestions = () => {
    const questions = [];

    // Subtopic 1: Factors of numbers (Q1 - Q2)
    for (let i = 0; i < 2; i++) {
        const n = getNum(10, 50);
        const factors = getFactors(n);
        const correct = factors[getNum(0, factors.length - 1)];
        let wrong;
        do { wrong = getNum(2, 60); } while (factors.includes(wrong));

        questions.push({
            question: `Which of these is a factor of $${n}$?`,
            options: [`$${correct}$`, `$${wrong}$`, `$${wrong + 1}$`, `$${wrong + 2}$`],
            correct: 0,
            explanation: `A factor of $${n}$ is a number that divides $${n}$ completely. $${n} \\div ${correct} = ${n / correct}$. Factors of $${n}$ are: ${factors.join(', ')}.`
        });
    }

    // Subtopic 2: Multiples of numbers (Q3 - Q4)
    for (let i = 2; i < 4; i++) {
        const n = getNum(3, 12);
        const m = getNum(2, 10);
        const correct = n * m;
        let wrong;
        do { wrong = getNum(correct - 5, correct + 15); } while (wrong % n === 0 || wrong <= 0);

        questions.push({
            question: `Which of these is a multiple of $${n}$?`,
            options: [`$${correct}$`, `$${wrong}$`, `$${wrong + 1}$`, `$${wrong + 2}$`],
            correct: 0,
            explanation: `Multiples of $${n}$ are numbers you get by multiplying $${n}$ by $1, 2, 3...$ etc. $${n} \\times ${m} = ${correct}$.`
        });
    }

    // Subtopic 3: Common factors (Q5 - Q6)
    for (let i = 4; i < 6; i++) {
        const n1 = getNum(12, 24);
        const n2 = getNum(12, 24);
        if (n1 === n2) { i--; continue; }
        const f1 = getFactors(n1);
        const f2 = getFactors(n2);
        const common = f1.filter(x => f2.includes(x));
        const correct = common[common.length - 1]; // usually the HCF or a common factor
        
        questions.push({
            question: `What is a common factor of $${n1}$ and $${n2}$?`,
            options: [`$${correct}$`, `$${n1 + n2}$`, `$${n1 * n2}$`, `$${Math.max(n1, n2) + 1}$`],
            correct: 0,
            explanation: `Factors of $${n1}$ are: ${f1.join(', ')}. Factors of $${n2}$ are: ${f2.join(', ')}. Common factors are: ${common.join(', ')}.`
        });
    }

    // Subtopic 4: Common multiples (Q7 - Q8)
    for (let i = 6; i < 8; i++) {
        const n1 = getNum(3, 6);
        const n2 = getNum(3, 6);
        if (n1 === n2) { i--; continue; }
        const correct = (n1 * n2) / (function gcd(a, b) { return b ? gcd(b, a % b) : a })(n1, n2); // LCM
        
        questions.push({
            question: `Find the smallest common multiple of $${n1}$ and $${n2}$.`,
            options: [`$${correct}$`, `$${n1 + n2}$`, `$${correct + 1}$`, `$${correct - 1}$`],
            correct: 0,
            explanation: `Multiples of $${n1}$ are: ${n1}, ${n1*2}, ${n1*3}... Multiples of $${n2}$ are: ${n2}, ${n2*2}, ${n2*3}... The first number that appears in both lists is $${correct}$.`
        });
    }

    // Subtopic 5: Prime and composite numbers (Q9 - Q10)
    for (let i = 8; i < 10; i++) {
        const isPrimeQuestion = i % 2 === 0;
        let n;
        if (isPrimeQuestion) {
            const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
            n = primes[getNum(0, primes.length - 1)];
            questions.push({
                question: `Is $${n}$ a prime number?`,
                options: [`Yes`, `No`, `Only if multiplied by 2`, `Depends on factors`],
                correct: 0,
                explanation: `$${n}$ is a prime number because it has only two factors: $1$ and $${n}$.`
            });
        } else {
            const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20];
            n = composites[getNum(0, composites.length - 1)];
            const f = getFactors(n);
            questions.push({
                question: `How many factors does $${n}$ have?`,
                options: [`$${f.length}$`, `2`, `1`, `0`],
                correct: 0,
                explanation: `Factors of $${n}$ are ${f.join(', ')}. Since it has more than 2 factors ($${f.length}$), it is a composite number.`
            });
        }
    }

    return questions;
};

// Specific Skill Generators
export const generateFactorizationQuestions = () => {
    let q = [];
    for (let i = 0; i < 10; i++) {
        const n = getNum(20, 100);
        const f = getFactors(n);
        q.push({
            question: `Identify all the factors of $${n}$.`,
            options: [`$${f.join(', ')}$`, `$1, ${n}$`, `$${f.slice(0, -1).join(', ')}$`, `$${f.join(', ')}, ${n + 1}$`],
            correct: 0,
            explanation: `The factors of $${n}$ are all the numbers that divide $${n}$ without a remainder: ${f.join(', ')}.`
        });
    }
    return q;
};

export const generateMultiplicationRelationshipQuestions = () => {
    let q = [];
    for (let i = 0; i < 10; i++) {
        const factor = getNum(2, 15);
        const multiple = factor * getNum(2, 10);
        q.push({
            question: `If $${factor}$ is a factor of $x$, then $x$ must be a ________ of $${factor}$.`,
            options: [`Multiple`, `Factor`, `Prime`, `Remainder`],
            correct: 0,
            explanation: `Factors and multiples are related. If $A$ is a factor of $B$, then $B$ is a multiple of $A$.`
        });
    }
    return q;
};

export const generateLogicalReasoningQuestions = () => {
    let q = [];
    for (let i = 0; i < 10; i++) {
        const n1 = getNum(2, 5);
        const n2 = getNum(2, 5);
        if (n1 === n2) { i--; continue; }
        const lcm = (n1 * n2) / (function gcd(a, b) { return b ? gcd(b, a % b) : a })(n1, n2);
        q.push({
            question: `Two bells toll at intervals of $${n1}$ and $${n2}$ minutes. If they toll together now, after how many minutes will they toll together again?`,
            options: [`$${lcm}$`, `$${n1 + n2}$`, `$${n1 * n2 + 1}$`, `$${Math.abs(n1 - n2)}$`],
            correct: 0,
            explanation: `This is a Lowest Common Multiple (LCM) problem. The LCM of $${n1}$ and $${n2}$ is $${lcm}$.`
        });
    }
    return q;
};

// ─── SKILLS CONFIG ──────────────────────────────────────────────────────────

export const SKILLS = [
    {
        id: 'bmf-01',
        nodeId: 'a4051006-0001-0000-0000-000000000000',
        title: 'Factorization',
        subtitle: 'Breaking down numbers',
        icon: '🧶',
        color: '#6366f1',
        desc: 'Learn to find all factors of a number and understand prime factorization.',
        learn: {
            concept: 'Factors',
            rules: [
                {
                    title: 'What is a Factor?',
                    f: '$$n \\div f = \\text{integer}$$',
                    d: 'A factor is a number that divides another number exactly, leaving no remainder.',
                    ex: 'The factors of $12$ are $1, 2, 3, 4, 6,$ and $12$.',
                    tip: '$1$ is a factor of every number!'
                }
            ]
        },
        practice: generateQuestions,
        assessment: generateFactorizationQuestions
    },
    {
        id: 'bmf-02',
        nodeId: 'a4051006-0002-0000-0000-000000000000',
        title: 'Multiples & Relationships',
        subtitle: 'Growth through multiplication',
        icon: '🚀',
        color: '#8b5cf6',
        desc: 'Understand how numbers grow as multiples and the special bond between factors and multiples.',
        learn: {
            concept: 'Multiples',
            rules: [
                {
                    title: 'What is a Multiple?',
                    f: '$$M = n \\times k$$',
                    d: 'A multiple is the result of multiplying a number by any whole number.',
                    ex: 'The first five multiples of $4$ are $4, 8, 12, 16, 20$.',
                    tip: 'Every number is a multiple of itself!'
                }
            ]
        },
        practice: generateMultiplicationRelationshipQuestions,
        assessment: generateMultiplicationRelationshipQuestions
    },
    {
        id: 'bmf-03',
        nodeId: 'a4051006-0003-0000-0000-000000000000',
        title: 'Logical Reasoning',
        subtitle: 'Real-world application',
        icon: '🧩',
        color: '#4f46e5',
        desc: 'Solve puzzles using common factors, common multiples, and prime numbers.',
        learn: {
            concept: 'Common Factors and Multiples',
            rules: [
                {
                    title: 'LCM and HCF',
                    f: '$$\\text{LCM}(a, b)$$',
                    d: 'LCM is the smallest number that is a multiple of both numbers. HCF is the largest number that is a factor of both.',
                    ex: 'LCM of $2$ and $3$ is $6$. HCF of $12$ and $18$ is $6$.',
                    tip: 'LCM helps solve "when will they meet again" problems!'
                }
            ]
        },
        practice: generateLogicalReasoningQuestions,
        assessment: generateLogicalReasoningQuestions
    }
];

export const CHAPTER_TEST_QUESTIONS = [
    {
        question: "Which of these is a prime number?",
        options: ["9", "15", "17", "21"],
        correct: 2,
        explanation: "17 has only two factors: 1 and 17."
    },
    {
        question: "What is the smallest odd composite number?",
        options: ["1", "3", "9", "15"],
        correct: 2,
        explanation: "The composite numbers are 4, 6, 8, 9... The smallest odd one is 9."
    },
    {
        question: "How many factors does the number 1 have?",
        options: ["0", "1", "2", "Many"],
        correct: 1,
        explanation: "The number 1 has only one factor: 1 itself."
    },
    {
        question: "Which number is a factor of every number?",
        options: ["0", "1", "2", "10"],
        correct: 1,
        explanation: "1 divides every number exactly."
    },
    {
        question: "The multiple of a number is always ________ the number itself.",
        options: ["Less than", "Equal to or greater than", "Equal to", "Smaller than"],
        correct: 1,
        explanation: "Multiples start from the number itself ($n \\times 1$) and go up."
    },
    {
        question: "What is the HCF of 8 and 12?",
        options: ["2", "4", "8", "12"],
        correct: 1,
        explanation: "Factors of 8: 1, 2, 4, 8. Factors of 12: 1, 2, 3, 4, 6, 12. Largest common is 4."
    },
    {
        question: "The smallest prime number is:",
        options: ["0", "1", "2", "3"],
        correct: 2,
        explanation: "2 is the only even prime number and the smallest prime."
    },
    {
        question: "Numbers having more than two factors are called:",
        options: ["Prime numbers", "Composite numbers", "Odd numbers", "Even numbers"],
        correct: 1,
        explanation: "Composite numbers have more than two factors."
    },
    {
        question: "A number is divisible by 2 if it ends in:",
        options: ["1, 3, 5, 7, 9", "0, 2, 4, 6, 8", "Any number", "Only 0"],
        correct: 1,
        explanation: "Even numbers are divisible by 2."
    },
    {
        question: "24 is a multiple of:",
        options: ["5", "7", "8", "9"],
        correct: 2,
        explanation: "8 x 3 = 24, so 24 is a multiple of 8."
    }
];

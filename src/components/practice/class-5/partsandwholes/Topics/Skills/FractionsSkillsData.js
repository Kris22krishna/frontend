export const SKILLS = [
    {
        id: 'parts-of-whole',
        title: 'Parts of a Whole',
        subtitle: 'Foundations',
        desc: 'Identifying numerator and denominator in visual models.',
        icon: '🍕',
        color: '#f59e0b',
        learn: {
            rules: [
                {
                    title: 'The Fraction Concept',
                    f: '\\frac{\\text{Shaded Parts}}{\\text{Total Equal Parts}}',
                    d: 'A fraction describes how many parts of a certain size there are.',
                    ex: 'If 3 parts out of 8 are shaded, the fraction is 3/8.'
                }
            ]
        },
        practice: [
            { question: 'What is the denominator in 5/8?', options: ['5', '8', '3', '13'], correct: 1 },
            { question: 'If a whole is divided into 6 equal parts, and 2 are shaded, what is the fraction?', options: ['1/6', '2/6', '6/2', '4/6'], correct: 1 }
        ],
        assessment: () => [
            { question: 'What does the numerator represent?', options: ['Total parts', 'Parts we have/shaded', 'The whole', 'Division sign'], correct: 1 },
            { question: 'Write "three-fourths" as a fraction.', options: ['4/3', '3/4', '3.4', '1/3'], correct: 1 }
        ]
    },
    {
        id: 'equivalent-fractions',
        title: 'Equivalent Fractions',
        subtitle: 'Proportions',
        desc: 'Finding different fractions that represent the same value.',
        icon: '⚖️',
        color: '#d97706',
        learn: {
            rules: [
                {
                    title: 'Finding Equivalents',
                    f: '\\frac{a}{b} = \\frac{a \\times n}{b \\times n}',
                    d: 'Multiply both top and bottom by the same number to find an equivalent fraction.',
                    ex: '1/2 = (1*2)/(2*2) = 2/4'
                }
            ]
        },
        practice: [
            { question: 'Is 1/2 equivalent to 2/4?', options: ['Yes', 'No'], correct: 0 },
            { question: 'What is an equivalent fraction for 1/3?', options: ['2/6', '3/6', '2/3', '1/6'], correct: 0 }
        ],
        assessment: () => [
            { question: 'Which fraction is equivalent to 1/2?', options: ['2/4', '3/6', '4/8', 'All of these'], correct: 3 },
            { question: 'To find an equivalent fraction, you must multiply or divide the numerator and denominator by:', options: ['Same number', 'Different numbers', 'Only 2', 'Only 10'], correct: 0 }
        ]
    }
];

export const CHAPTER_TEST_QUESTIONS = [
    {
        question: "What is the denominator in the fraction $5/12$?",
        options: ["5", "12", "7", "17"],
        correct: 1,
        explanation: "The denominator is the bottom number, which shows the total number of equal parts."
    },
    {
        question: "If a circle is divided into 8 equal parts and 3 parts are shaded, what fraction is shaded?",
        options: ["1/8", "3/8", "5/8", "1/3"],
        correct: 1,
        explanation: "The fraction is $\\frac{\\text{shaded parts}}{\\text{total parts}} = 3/8$."
    },
    {
        question: "Which of these is equivalent to $1/2$?",
        options: ["2/3", "2/4", "1/4", "3/4"],
        correct: 1,
        explanation: "Multiplying numerator and denominator by 2 gives $1 \\times 2 / 2 \\times 2 = 2/4$."
    },
    {
        question: "In the fraction $3/7$, what is the numerator?",
        options: ["3", "7", "10", "4"],
        correct: 0,
        explanation: "The numerator is the top number, which shows how many parts we are considering."
    },
    {
        question: "Compare: $2/5$ and $4/5$. Which is larger?",
        options: ["2/5", "4/5", "They are equal", "Cannot tell"],
        correct: 1,
        explanation: "When denominators are the same, the fraction with the larger numerator is larger."
    },
    {
        question: "What is $1/4 + 2/4$?",
        options: ["3/8", "3/4", "1/2", "4/4"],
        correct: 1,
        explanation: "Add the numerators: $1+2=3$. The denominator remains 4."
    },
    {
        question: "Which fraction represents three-quarters?",
        options: ["3/1", "1/3", "3/4", "4/3"],
        correct: 2,
        explanation: "Three-quarters is written as 3/4."
    },
    {
        question: "If you eat 2 slices of a pizza cut into 6 equal slices, what fraction did you eat?",
        options: ["1/6", "2/6", "4/6", "1/2"],
        correct: 1,
        explanation: "You ate 2 out of 6 parts, which is 2/6."
    },
    {
        question: "Equivalent fraction for $3/5$ with denominator 10 is:",
        options: ["6/10", "5/10", "8/10", "3/10"],
        correct: 0,
        explanation: "$3/5 = (3 \\times 2)/(5 \\times 2) = 6/10$."
    },
    {
        question: "What is $5/9 - 2/9$?",
        options: ["3/0", "7/9", "3/9", "3/18"],
        correct: 2,
        explanation: "Subtract numerators: $5-2=3$. Denominator stays 9."
    },
    {
        question: "Which is an improper fraction?",
        options: ["1/2", "3/4", "5/4", "2/7"],
        correct: 2,
        explanation: "An improper fraction has a numerator greater than or equal to the denominator."
    },
    {
        question: "Write 1 as a fraction with denominator 5.",
        options: ["1/5", "5/1", "5/5", "0/5"],
        correct: 2,
        explanation: "Any number divided by itself is 1. So $5/5 = 1$."
    },
    {
        question: "Half of a half is:",
        options: ["1", "1/2", "1/4", "2/2"],
        correct: 2,
        explanation: "$\\frac{1}{2} \\times \\frac{1}{2} = 1/4$."
    },
    {
        question: "How many quarters make a whole?",
        options: ["2", "3", "4", "5"],
        correct: 2,
        explanation: "A quarter is 1/4. Four 1/4s make 4/4 = 1."
    },
    {
        question: "Which is smaller: $1/10$ or $1/5$?",
        options: ["1/10", "1/5", "Equal", "Cannot say"],
        correct: 0,
        explanation: "When numerators are 1, the fraction with the larger denominator is smaller."
    },
    {
        question: "What is the simplest form of $4/8$?",
        options: ["1/2", "2/4", "4/8", "1/4"],
        correct: 0,
        explanation: "$4/8$ divided by 4/4 gives 1/2."
    },
    {
        question: "If a bag has 10 marbles and 4 are red, what fraction is NOT red?",
        options: ["4/10", "6/10", "10/10", "1/10"],
        correct: 1,
        explanation: "Total marbles (10) - Red (4) = 6 non-red. Fraction = 6/10."
    },
    {
        question: "One-third of 12 is:",
        options: ["3", "4", "6", "36"],
        correct: 1,
        explanation: "$1/3 \\times 12 = 12/3 = 4$."
    },
    {
        question: "Which is a unit fraction?",
        options: ["2/3", "1/5", "5/5", "0/1"],
        correct: 1,
        explanation: "A unit fraction has 1 as its numerator."
    },
    {
        question: "What comes next in the pattern: $1/8, 2/8, 3/8, ...$?",
        options: ["4/16", "4/8", "5/8", "3/7"],
        correct: 1,
        explanation: "The numerator increases by 1 each time."
    },
    {
        question: "If a rectangle is 1/4 shaded, how many more quarters need to be shaded to make it full?",
        options: ["1", "2", "3", "4"],
        correct: 2,
        explanation: "$4/4 - 1/4 = 3/4$, so 3 more quarters."
    },
    {
        question: "Which fraction is equal to 0?",
        options: ["1/1", "0/5", "5/0", "0.1"],
        correct: 1,
        explanation: "Zero divided by any non-zero number is 0."
    },
    {
        question: "A fraction where the numerator is 1 is called a:",
        options: ["Whole number", "Proper fraction", "Unit fraction", "Denominator"],
        correct: 2,
        explanation: "Fractions like 1/2, 1/3, 1/4 are unit fractions."
    },
    {
        question: "If you divide a cake into 10 pieces and give 10 pieces away, what fraction is left?",
        options: ["10/10", "1/10", "0/10", "1/1"],
        correct: 2,
        explanation: "All pieces are gone, so 0 pieces are left."
    },
    {
        question: "Three out of five can be written as:",
        options: ["3.5", "5/3", "3/5", "15"],
        correct: 2,
        explanation: "3 out of 5 is the fraction 3/5."
    }
];

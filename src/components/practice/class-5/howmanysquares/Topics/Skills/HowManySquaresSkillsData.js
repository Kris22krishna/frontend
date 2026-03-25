// ─── QUESTIONS & DATA FOR HOW MANY SQUARES ─────────────────────────────────────

const getNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Deterministic single generator for Practice that strictly follows the subtopic order as required by the workflow
export const generateQuestions = () => {
    const questions = [];

    // Subtopic 1: Identifying squares in grids (Q1 - Q3)
    for (let i = 0; i < 3; i++) {
        const rows = getNum(2, 6);
        const cols = getNum(2, 6);
        const total = rows * cols;
        questions.push({
            question: `In a grid of $${rows} \\times ${cols}$, how many individual $1 \\times 1$ squares are there?`,
            options: [`$${total}$`, `$${total + 1}$`, `$${total - 1}$`, `$${total + 2}$`],
            correct: 0,
            explanation: `A $${rows} \\times ${cols}$ grid has exactly $${rows} \\times ${cols} = ${total}$ unit squares.`
        });
    }

    // Subtopic 2: Counting overlapping squares (Q4 - Q7)
    for (let i = 3; i < 7; i++) {
        const grid = getNum(3, 5); // 3x3, 4x4, or 5x5
        const answer = (grid - 1) * (grid - 1); // overlapping 2x2 squares in an N*N grid is (N-1)*(N-1)
        questions.push({
            question: `In a $${grid} \\times ${grid}$ grid, how many overlapping $2 \\times 2$ squares can you find?`,
            options: [`$${answer}$`, `$${answer + 1}$`, `$${grid * grid}$`, `$${grid * 2}$`],
            correct: 0,
            explanation: `For an $N \\times N$ grid, there are $(N-1) \\times (N-1)$ overlapping $2 \\times 2$ squares. For $${grid} \\times ${grid}$, that is $${grid - 1} \\times ${grid - 1} = ${answer}$.`
        });
    }

    // Subtopic 3: Understanding patterns in shapes (Q8 - Q10)
    for (let i = 7; i < 10; i++) {
        const patternNum = getNum(4, 7);
        const answer = patternNum * patternNum;
        questions.push({
            question: `If a sequence of square shapes grows such that Step 1 has $1^2$ square, Step 2 has $2^2$, what is the total number of squares in Step ${patternNum}?`,
            options: [`$${answer}$`, `$${answer - 1}$`, `$${patternNum * 2}$`, `$${patternNum * 3}$`],
            correct: 0,
            explanation: `The pattern follows square numbers. Step ${patternNum} has $${patternNum}^2 = ${patternNum} \\times ${patternNum} = ${answer}$ squares.`
        });
    }

    return questions;
};

// For individual skills in the Skills Hub, we can route them all to this comprehensive test or split them:
export const generateGridQuestions = () => {
    let q = [];
    for (let i = 0; i < 10; i++) {
        const r = getNum(2, 7), c = getNum(2, 7);
        q.push({
            question: `Find the total number of unit squares in a $${r} \\times ${c}$ grid.`,
            options: [`$${r * c}$`, `$${r * c + 2}$`, `$${r * c + 3}$`, `$${r * c - 1}$`],
            correct: 0,
            explanation: `Area = rows $\\times$ cols = $${r} \\times ${c} = ${r * c}$.`
        });
    }
    return q;
};

export const generateOverlappingQuestions = () => {
    let q = [];
    for (let i = 0; i < 10; i++) {
        const n = getNum(3, 6);
        const ans = (n - 1) * (n - 1);
        q.push({
            question: `How many $2 \\times 2$ squares are in a $${n} \\times ${n}$ grid?`,
            options: [`$${ans}$`, `$${ans + 1}$`, `$${n * 2}$`, `$${ans - 2}$`],
            correct: 0,
            explanation: `Formula for $2 \\times 2$ squares in $N \\times N$ grid is $(N-1)^2$. So $(${n}-1)^2 = ${ans}$.`
        });
    }
    return q;
};

export const generatePatternQuestions = () => {
    let q = [];
    for (let i = 0; i < 10; i++) {
        const curr = getNum(2, 8);
        const next = (curr + 1) * (curr + 1);
        q.push({
            question: `A shape pattern has $${curr * curr}$ squares. How many squares will the next shape in the pattern have?`,
            options: [`$${next}$`, `$${next - 1}$`, `$${curr * curr + curr}$`, `$${next + 1}$`],
            correct: 0,
            explanation: `The current shape has $${curr}^2$ squares. The next shape will have $(${curr}+1)^2 = ${curr + 1}^2 = ${next}$.`
        });
    }
    return q;
};

// ─── SKILLS CONFIG ──────────────────────────────────────────────────────────

export const SKILLS = [
    {
        id: 'hms-01',
        title: 'Identifying Squares',
        subtitle: 'Spatial Reasoning',
        icon: '📊',
        color: '#6366f1',
        desc: 'Identify and count individual squares in various grid sizes.',
        learn: {
            concept: 'Identifying squares in grids',
            rules: [
                {
                    title: 'Grid Counting',
                    f: '$$\\text{Total} = \\text{Rows} \\times \\text{Columns}$$',
                    d: 'In a rectangular grid, you can find the total number of $1 \\times 1$ squares by multiplying the number of rows by the columns.',
                    ex: 'A $3 \\times 4$ grid has $12$ small squares.',
                    tip: 'This is the basic formula for Area!'
                }
            ]
        },
        practice: generateQuestions, // Workaround: Uses the main sequential generator as requested by workflow
        assessment: generateGridQuestions
    },
    {
        id: 'hms-02',
        title: 'Overlapping Squares',
        subtitle: 'Visual Counting Strategies',
        icon: '🔍',
        color: '#8b5cf6',
        desc: 'Count overlapping squares within a larger grid.',
        learn: {
            concept: 'Counting Overlapping Squares',
            rules: [
                {
                    title: '2x2 Squares in a Grid',
                    f: '$$\\text{Count} = (N-1) \\times (N-1)$$',
                    d: 'To find how many overlapping $2 \\times 2$ squares exist in an $N \\times N$ grid, use the formula $(N-1)^2$.',
                    ex: 'In a $3 \\times 3$ grid, there are $(3-1) \\times (3-1) = 2 \\times 2 = 4$ overlapping $2 \\times 2$ squares.',
                    tip: 'Count horizontal slides and vertical slides!'
                }
            ]
        },
        practice: generateOverlappingQuestions,
        assessment: generateOverlappingQuestions
    },
    {
        id: 'hms-03',
        title: 'Shape Patterns',
        subtitle: 'Pattern Recognition',
        icon: '💠',
        color: '#4f46e5',
        desc: 'Understand how shapes grow in patterns.',
        learn: {
            concept: 'Understanding patterns in shapes',
            rules: [
                {
                    title: 'Growth Rules',
                    f: '$$P_n = n^2$$',
                    d: 'Square numbers form patterns. Step 1 has $1^2=1$, Step 2 has $2^2=4$, Step 3 has $3^2=9$, etc.',
                    ex: 'Step 4 will have $4^2 = 16$ squares.',
                    tip: 'Always look for the relationship between the step number and the count!'
                }
            ]
        },
        practice: generatePatternQuestions,
        assessment: generatePatternQuestions
    }
];

export const CHAPTER_TEST_QUESTIONS = [
    // Mixed pool of 25 questions to pick from
    // Subtopic 1
    {
        question: "How many small $1 \\times 1$ squares are in a $4 \\times 4$ grid?",
        options: ["8", "12", "16", "20"],
        correct: 2,
        explanation: "In a $4 \\times 4$ grid, there are $4 \\times 4 = 16$ small squares."
    },
    {
        question: "In a $2 \\times 3$ grid, the total number of unit squares is:",
        options: ["5", "6", "10", "12"],
        correct: 1,
        explanation: "$2 \\times 3 = 6$ units."
    },
    {
        question: "How many $1 \\times 1$ squares are needed to cover a $3 \\times 5$ rectangle?",
        options: ["8", "15", "18", "20"],
        correct: 1,
        explanation: "The area is $3 \\times 5 = 15$ square units."
    },
    {
        question: "A grid has 4 rows and 5 columns. Total squares?",
        options: ["9", "18", "20", "24"],
        correct: 2,
        explanation: "$4 \\times 5 = 20$."
    },
    {
        question: "A $5 \\times 5$ grid has how many $1 \\times 1$ squares?",
        options: ["10", "20", "25", "50"],
        correct: 2,
        explanation: "Total individual squares = $5 \\times 5 = 25$."
    },
    // Subtopic 2
    {
        question: "In a $3 \\times 3$ square grid, besides $1 \\times 1$ squares, how many $2 \\times 2$ squares can you find?",
        options: ["2", "4", "6", "9"],
        correct: 1,
        explanation: "In a $3 \\times 3$ grid, there are 4 overlapping $2 \\times 2$ squares."
    },
    {
        question: "How many vertical lines are shared by 3 squares placed side-by-side?",
        options: ["1", "2", "3", "4"],
        correct: 1,
        explanation: "Square 1 shares a line with Square 2, and Square 2 shares a line with Square 3 (Total 2 shared lines)."
    },
    {
        question: "Can four small squares be arranged to form one larger square?",
        options: ["Yes, always", "No, never", "Only if they overlap", "Only if they are triangles"],
        correct: 0,
        explanation: "A $2 \\times 2$ arrangement of 4 squares forms a larger square."
    },
    {
        question: "If you have a $4 \\times 4$ grid, how many overlapping $3 \\times 3$ squares are there?",
        options: ["1", "2", "4", "6"],
        correct: 2,
        explanation: "A $3 \\times 3$ square can fit 2 positions horizontally and 2 vertically, so $2 \\times 2 = 4$."
    },
    {
        question: "In a $2 \\times 2$ square, how many overlapping $1 \\times 2$ rectangles are there?",
        options: ["2", "4", "6", "8"],
        correct: 1,
        explanation: "2 horizontal and 2 vertical = 4."
    },
    // Subtopic 3
    {
        question: "Patterns in squares: If the first pattern has 1 square, the second has 4, and the third has 9, how many does the fourth have?",
        options: ["12", "16", "20", "25"],
        correct: 1,
        explanation: "The pattern follows square numbers: $1^2, 2^2, 3^2, 4^2 = 16$."
    },
    {
        question: "If we double the side of a $1 \\times 1$ square, its area becomes:",
        options: ["Double", "Triple", "Four times", "Eight times"],
        correct: 2,
        explanation: "If side multiplies by 2, area multiplies by 4 ($2^2$)."
    },
    {
        question: "A shape sequence adds $2n+1$ squares at each step. If Step 1 has 1 square, Step 2 has $1+3=4$, how many in Step 3?",
        options: ["6", "7", "8", "9"],
        correct: 3,
        explanation: "Step 3 is $4 + (2(2)+1) = 4 + 5 = 9$. Also $3^2 = 9$."
    },
    // More mixed
    {
        question: "A $2 \\times 2$ square has how many unit squares?",
        options: ["2", "4", "8", "16"],
        correct: 1,
        explanation: "$2 \\times 2 = 4$."
    },
    {
        question: "In a $1 \\times 10$ strip, how many squares are there?",
        options: ["1", "5", "10", "11"],
        correct: 2,
        explanation: "$1 \\times 10 = 10$ squares."
    },
    {
        question: "Which of these is NOT a property of a square?",
        options: ["All angles are $90^\\circ$", "All sides are equal", "It is a closed shape", "It has 3 vertices"],
        correct: 3,
        explanation: "A square must have 4 vertices."
    },
    {
        question: "What is the area of a square with side $3$ cm?",
        options: ["$6$ sq cm", "$9$ sq cm", "$12$ sq cm", "$15$ sq cm"],
        correct: 1,
        explanation: "Area = $\\text{side} \\times \\text{side} = 3 \\times 3 = 9$ sq cm."
    },
    {
        question: "How many degrees in each angle of a square?",
        options: ["$45^\\circ$", "$90^\\circ$", "$180^\\circ$", "$360^\\circ$"],
        correct: 1,
        explanation: "All angles in a square are right angles ($90^\\circ$)."
    },
    {
        question: "How many lines of symmetry does a square have?",
        options: ["2", "3", "4", "infinite"],
        correct: 2,
        explanation: "A square has 4 lines of symmetry (2 diagonal, 1 horizontal, 1 vertical)."
    },
    {
        question: "If a rectangle is made of 12 unit squares, which of these could be its dimensions?",
        options: ["$2 \\times 5$", "$3 \\times 4$", "$4 \\times 4$", "$5 \\times 5$"],
        correct: 1,
        explanation: "$3 \\times 4 = 12$ squares."
    },
    {
        question: "In a $4 \\times 4$ grid, how many $4 \\times 4$ squares are there?",
        options: ["1", "4", "8", "16"],
        correct: 0,
        explanation: "There is only one largest square that covers the whole $4 \\times 4$ grid."
    },
    {
        question: "A postage stamp is usually what shape?",
        options: ["Square or Rectangle", "Circle", "Triangle", "Hexagon"],
        correct: 0,
        explanation: "Most stamps are square or rectangular to fit on flat surfaces."
    },
    {
        question: "If a square has a side of $5$ cm, what is its perimeter?",
        options: ["$10$ cm", "$20$ cm", "$25$ cm", "$30$ cm"],
        correct: 1,
        explanation: "Perimeter of a square = $4 \\times \\text{side} = 4 \\times 5 = 20$ cm."
    },
    {
        question: "How many vertices (corners) does a square have?",
        options: ["2", "4", "6", "8"],
        correct: 1,
        explanation: "A square has 4 corners where the sides meet."
    },
    {
        question: "Which shape has exactly 4 equal sides and 4 right angles?",
        options: ["Triangle", "Rectangle", "Square", "Circle"],
        correct: 2,
        explanation: "A square is a special type of rectangle where all four sides are equal."
    }
];

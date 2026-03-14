const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const generateClockQuestion = () => {
    const h = Math.floor(Math.random() * 12) + 1;
    const m = Math.floor(Math.random() * 12) * 5; // Multiples of 5

    // Calculate angle: |30h - 5.5m|
    let angle = Math.abs(30 * h - 5.5 * m);
    if (angle > 180) angle = 360 - angle;

    const correctAns = `$${angle}^{\\circ}$`;
    const options = shuffleArray([
        correctAns,
        `$${angle + 10}^{\\circ}$`,
        `$${Math.abs(angle - 15)}^{\\circ}$`,
        `$${180 - angle}^{\\circ}$`
    ]);

    return {
        id: 25,
        skill: "Word Problems",
        question: `Calculate the smaller angle between the hour hand and the minute hand of a clock when the time is ${h}:${m === 0 ? '00' : (m < 10 ? '0' + m : m)}.`,
        options,
        correct: options.indexOf(correctAns),
        type: "mcq"
    };
};

export const algebraQuestions = () => {
    const questions = [
        {
            id: 1,
            skill: "Laws of Exponents",
            question: "Simplify: $x^3 \\cdot x^{-5} \\cdot x^4$",
            options: ["$x^2$", "$x^{12}$", "$x^{-2}$", "$x^6$"],
            correct: 0,
            type: "mcq"
        },
        {
            id: 2,
            skill: "Laws of Exponents",
            question: "Which expression is equivalent to $(2a^2b^{-3})^3$?",
            options: ["$6a^6b^{-9}$", "$8a^6b^{-9}$", "$8a^5b^{-6}$", "$2a^6b^{-9}$"],
            correct: 1,
            type: "mcq"
        },
        {
            id: 3,
            skill: "Laws of Exponents",
            question: "What is the value of $(81)^{3/4}$?",
            options: ["$27$", "$54$", "$9$", "$243$"],
            correct: 0,
            type: "mcq"
        },
        {
            id: 4,
            skill: "Laws of Exponents",
            question: "Simplify: $(x^5y^2) \\div (x^2y^{-1})$",
            options: ["$x^3y^3$", "$x^3y$", "$x^7y^3$", "$x^3y^2$"],
            correct: 0,
            type: "mcq"
        },
        {
            id: 5,
            skill: "Laws of Exponents",
            question: "If $2^n = 128$, what is $n$?",
            options: ["$5$", "$6$", "$7$", "$8$"],
            correct: 2,
            type: "mcq"
        },
        {
            id: 6,
            skill: "Laws of Exponents",
            question: "Evaluate: $(5^0 \\times 3^2) - 4^{-1}$. Write your answer as a fraction.",
            answer: "35/4",
            type: "text",
            format: "fraction"
        },
        {
            id: 7,
            skill: "Like & Unlike Terms",
            question: "Which of the following is a like term to $-7x^2y$?",
            options: ["$4xy^2$", "$3x^2y$", "$7xy$", "$-x^2y^2$"],
            correct: 1,
            type: "mcq"
        },
        {
            id: 8,
            skill: "Like & Unlike Terms",
            question: "Collect like terms: $3a - 2b + 5a + 4b - a$",
            options: ["$7a + 2b$", "$8a - 6b$", "$7a - 2b$", "$7a + 6b$"],
            correct: 0,
            type: "mcq"
        },
        {
            id: 9,
            skill: "Like & Unlike Terms",
            question: "Simplify: $4x^2 - 3x + 7 - x^2 + 5x - 2$",
            options: ["$3x^2 + 2x + 5$", "$3x^2 + 8x + 5$", "$5x^2 - 2x + 5$", "$3x^2 + 2x - 5$"],
            correct: 0,
            type: "mcq"
        },
        {
            id: 10,
            skill: "Like & Unlike Terms",
            question: "If $P = 4m^2n - 3mn^2 + 6$ and $Q = -m^2n + 5mn^2 - 1$, find $P + Q$ when $m = 1$ and $n = 2$.",
            answer: "19",
            type: "text"
        },
        {
            id: 11,
            skill: "Simplifying Expressions",
            question: "Simplify: $3(2x - 4) - 2(x + 5)$",
            options: ["$4x - 22$", "$4x + 22$", "$8x - 22$", "$4x - 2$"],
            correct: 0,
            type: "mcq"
        },
        {
            id: 12,
            skill: "Simplifying Expressions",
            question: "Simplify: $(x^2 - 9) \\div (x - 3)$",
            options: ["$x - 3$", "$x + 3$", "$x^2 + 3$", "$x + 9$"],
            correct: 1,
            type: "mcq"
        },
        {
            id: 13,
            skill: "Simplifying Expressions",
            question: "Which is the fully simplified form of: $\\frac{6x^2y^3}{9xy^5}$?",
            options: ["$2x/(3y^2)$", "$3x/(2y^2)$", "$2xy^2/3$", "$2/(3xy^2)$"],
            correct: 0,
            type: "mcq"
        },
        {
            id: 14,
            skill: "Simplifying Expressions",
            question: "Expand and simplify: $(3x + 2)^2 - (3x - 2)^2$",
            options: ["$0$", "$24x$", "$18x^2 + 8$", "$24x^2$"],
            correct: 1,
            type: "mcq"
        },
        {
            id: 15,
            skill: "Solving Equations",
            question: "Solve: $3(2x - 1) = 4x + 9$",
            options: ["$x = 4$", "$x = 6$", "$x = 3$", "$x = 5$"],
            correct: 1,
            type: "mcq"
        },
        {
            id: 16,
            skill: "Solving Equations",
            question: "Which value satisfies: $x^2 - 7x + 12 = 0$?",
            options: ["$x = 2$ or $x = 6$", "$x = 3$ or $x = 4$", "$x = -3$ or $x = -4$", "$x = 1$ or $x = 12$"],
            correct: 1,
            type: "mcq"
        },
        {
            id: 17,
            skill: "Solving Equations",
            question: "Solve the simultaneous equations: $2x + y = 7$ and $x - y = 2$",
            options: ["$x=2, y=3$", "$x=3, y=1$", "$x=4, y=-1$", "$x=1, y=5$"],
            correct: 1,
            type: "mcq"
        },
        {
            id: 18,
            skill: "Solving Equations",
            question: "Solve: $\\frac{2x - 1}{3} - \\frac{x + 2}{4} = 1$. Write your answer as a fraction.",
            answer: "22/5",
            type: "text",
            format: "fraction"
        },
        {
            id: 19,
            skill: "Solving Equations",
            question: "The equation $kx^2 - 8x + 4 = 0$ has equal roots. What is $k$?",
            options: ["$k = 4$", "$k = 2$", "$k = 16$", "$k = 8$"],
            correct: 0,
            type: "mcq"
        },
        {
            id: 20,
            skill: "Change of Subject",
            question: "Make $r$ the subject of: $A = \\pi r^2$",
            options: ["$r = A/\\pi$", "$r = \\sqrt{A/\\pi}$", "$r = \\sqrt{\\pi A}$", "$r = A^2/\\pi$"],
            correct: 1,
            type: "mcq"
        },
        {
            id: 21,
            skill: "Change of Subject",
            question: "Make $x$ the subject of: $y = \\frac{3x + 2}{x - 1}$",
            options: ["$x = \\frac{y + 2}{y - 3}$", "$x = \\frac{y - 2}{y + 3}$", "$x = \\frac{y + 2}{3 - y}$", "$x = \\frac{2 + y}{y - 3}$"],
            correct: 0,
            type: "mcq"
        },
        {
            id: 22,
            skill: "Change of Subject",
            question: "Given $v^2 = u^2 + 2as$, make $a$ the subject.",
            options: ["$a = (v^2 - u^2)/2s$", "$a = (v + u)/2s$", "$a = (v^2 + u^2)/2s$", "$a = 2s(v^2 - u^2)$"],
            correct: 0,
            type: "mcq"
        },
        {
            id: 23,
            skill: "Change of Subject",
            question: "Make $n$ the subject of: $S = \\frac{n}{2}(a + l)$",
            options: ["$n = \\frac{2S}{a+l}$", "$n = \\frac{S(a+l)}{2}$", "$n = 2S(a+l)$", "$n = \\frac{S}{2(a+l)}$"],
            correct: 0,
            type: "mcq"
        },
        {
            id: 24,
            skill: "Word Problems",
            question: "A man is 3 times as old as his son. In 12 years, he will be twice as old as his son. How old is the son now?",
            options: ["$10$", "$12$", "$8$", "$6$"],
            correct: 1,
            type: "mcq"
        },
        generateClockQuestion(),
        {
            id: 26,
            skill: "Word Problems",
            question: "The sum of three consecutive even integers is 78. What is the largest of the three?",
            options: ["$24$", "$26$", "$28$", "$30$"],
            correct: 2,
            type: "mcq"
        },
        {
            id: 27,
            skill: "Word Problems",
            question: "A rectangle's length is $5$ cm more than twice its width. If the perimeter is $52$ cm, what is the area of the rectangle in cm$^2$?",
            answer: "133",
            type: "text"
        },
        {
            id: 28,
            skill: "Algebra in Action",
            question: "A phone plan charges a fixed fee of $12 plus $0.05 per minute. Which equation gives the total cost $C$ for $m$ minutes?",
            options: ["$C = 12m + 0.05$", "$C = 0.05m + 12$", "$C = 12 + 5m$", "$C = 12(0.05 + m)$"],
            correct: 1,
            type: "mcq"
        },
        {
            id: 29,
            skill: "Algebra in Action",
            question: "A trader buys $x$ items at $8 each and sells them at $11 each. He also pays a fixed overhead of $60. Which expression represents his profit?",
            options: ["$3x - 60$", "$3x + 60$", "$19x - 60$", "$11x - 8$"],
            correct: 0,
            type: "mcq"
        },
        {
            id: 30,
            skill: "Algebra in Action",
            question: "A stone is thrown upward; its height after $t$ seconds is $h = 20t - 5t^2$. When does the stone return to the ground?",
            options: ["$t = 2$ s", "$t = 4$ s", "$t = 5$ s", "$t = 10$ s"],
            correct: 1,
            type: "mcq"
        }
    ];

    return shuffleArray(questions);
};

import {
    generateFormingExpressions,
    generateSettingUpEquations,
    generateVariablesAndExpressions,
    generateMeaningOfEquation,
    generateStatementConversions,
    generateSolvingEquations,
    generateCheckingSolutions,
    generatePropertiesEquations,
    generateWordProblems
} from './simpleEquationsQuestions';

const generateUniqueQuestions = (generatorFunc, count) => {
    const questions = [];
    const signatures = new Set();
    let attempts = 0;
    while (questions.length < count && attempts < count * 10) {
        attempts++;
        const q = generatorFunc();
        const signature = `${q.question}_${q.options[q.correct]}`;
        if (!signatures.has(signature)) {
            signatures.add(signature);
            questions.push(q);
        }
    }
    return questions;
};

export const SKILLS = [
    {
        id: "seq-forming",
        title: "Setting up Equations",
        subtitle: "Main Topic 1",
        desc: "Form expressions and set up simple equations from given conditions.",
        icon: "📝",
        color: "#6366f1",
        practice: () => [
            ...generateUniqueQuestions(generateFormingExpressions, 5),
            ...generateUniqueQuestions(generateSettingUpEquations, 5)
        ],
        assessment: () => [
            ...generateUniqueQuestions(generateFormingExpressions, 5),
            ...generateUniqueQuestions(generateSettingUpEquations, 5)
        ],
        learn: {
            concept: "An expression consists of numbers, variables, and operations. An equation sets two expressions equal.",
            rules: [
                { title: 'Addition / Subtraction', f: '+ \\text{ and } -', d: "Translate 'sum' or 'increased by' to addition, 'difference' to subtraction.", ex: "'x increased by 5' \\Rightarrow x + 5", tip: 'Break down the sentence piece by piece.' },
                { title: 'Multiplication / Equality', f: '\\times \\text{ and } =', d: "Translate 'times' to multiplication, 'gives' or 'is' to the equals sign.", ex: "'3 times n is 25' \\Rightarrow 3n = 25", tip: 'An equation always has an equals sign.' }
            ]
        }
    },
    {
        id: "seq-meaning",
        title: "Algebraic Concepts",
        subtitle: "Main Topic 2",
        desc: "Evaluate expressions and identify equations, LHS, and RHS.",
        icon: "🔍",
        color: "#10b981",
        practice: () => [
            ...generateUniqueQuestions(generateVariablesAndExpressions, 5),
            ...generateUniqueQuestions(generateMeaningOfEquation, 5)
        ],
        assessment: () => [
            ...generateUniqueQuestions(generateVariablesAndExpressions, 5),
            ...generateUniqueQuestions(generateMeaningOfEquation, 5)
        ],
        learn: {
            concept: "Variables represent unknown values. Solving or evaluating means replacing the variable with a number.",
            rules: [
                { title: 'Evaluation', f: 'x = a', d: 'Substitute the given value for the variable.', ex: '4x + 5 \\text{ for } x = 3 \\Rightarrow 17', tip: 'Use parentheses when substituting negative numbers.' },
                { title: 'Equation Parts', f: 'LHS = RHS', d: 'LHS is left of the equals sign, RHS is to the right.', ex: 'LHS of 4x + 5 = 65 \\text{ is } 4x + 5', tip: 'An expression does not have an equals sign.' }
            ]
        }
    },
    {
        id: "seq-statements",
        title: "Converting Statements",
        subtitle: "Main Topic 3",
        desc: "Convert text statements into equations and vice versa.",
        icon: "🔄",
        color: "#f59e0b",
        practice: () => generateUniqueQuestions(generateStatementConversions, 10),
        assessment: () => generateUniqueQuestions(generateStatementConversions, 10),
        learn: {
            concept: "Translating words into math is the bridge between real-life problems and algebra.",
            rules: [
                { title: 'Words to Math', f: '\\frac{x}{4}', d: "Words like 'one-fourth of a number' translate to fractions.", ex: "'One-third of x plus 5 is 8' \\Rightarrow \\frac{x}{3} + 5 = 8", tip: 'Read carefully to identify the variable.' },
                { title: 'Math to Words', f: 'x - 5 = 9', d: 'Translate an equation back into a clear, concise English sentence.', ex: "'Five subtracted from x gives 9'", tip: 'Start with the variable for a clearer sentence.' }
            ]
        }
    },
    {
        id: "seq-solving",
        title: "Solving Equations",
        subtitle: "Main Topic 4",
        desc: "Solve one-step and multi-step equations using balance rules.",
        icon: "⚖️",
        color: "#f43f5e",
        practice: () => [
            ...generateUniqueQuestions(generateSolvingEquations, 5),
            ...generateUniqueQuestions(generateCheckingSolutions, 5)
        ],
        assessment: () => [
            ...generateUniqueQuestions(generateSolvingEquations, 5),
            ...generateUniqueQuestions(generateCheckingSolutions, 5)
        ],
        learn: {
            concept: "Solving an equation means finding the value of the variable that makes LHS equal to RHS.",
            rules: [
                { title: 'Balance Rule', f: '\\text{Do same to both sides}', d: 'Use opposite operations to isolate the variable.', ex: 'x + 3 = 8 \\Rightarrow x = 5', tip: 'If multiplied, divide both sides.' },
                { title: 'Checking Solutions', f: 'LHS = RHS', d: 'Substitute the answer back into the original equation.', ex: '5(7) = 35 \\Rightarrow 35 = 35 \\text{ ✓}', tip: 'Checking your answer guarantees it is correct!' }
            ]
        }
    },
    {
        id: "seq-properties",
        title: "Transposition",
        subtitle: "Main Topic 5",
        desc: "Use transposition and brackets to solve complex equations.",
        icon: "📦",
        color: "#8b5cf6",
        practice: () => generateUniqueQuestions(generatePropertiesEquations, 10),
        assessment: () => generateUniqueQuestions(generatePropertiesEquations, 10),
        learn: {
            concept: "Transposition is a shortcut for the balance method, moving numbers across the equals sign.",
            rules: [
                { title: 'Transposing Signs', f: '+ \\leftrightarrow -', d: 'Moving a number across the equals sign flips its operation.', ex: '12p - 5 = 25 \\Rightarrow 12p = 30', tip: '+ becomes -, and - becomes +.' },
                { title: 'Distributive Property', f: 'a(b + c) = ab + ac', d: 'Multiply the outside term by every term inside the bracket.', ex: '4(m + 3) = 4m + 12', tip: 'Expand brackets before moving terms.' }
            ]
        }
    },
    {
        id: "seq-applications",
        title: "Applications",
        subtitle: "Main Topic 6",
        desc: "Solve word problems, age problems, and real-life situations.",
        icon: "🌍",
        color: "#ec4899",
        practice: () => generateUniqueQuestions(generateWordProblems, 10),
        assessment: () => generateUniqueQuestions(generateWordProblems, 10),
        learn: {
            concept: "Equations solve real-world mysteries where a quantity is unknown.",
            rules: [
                { title: 'Identify Variable', f: 'x', d: 'Identify the unknown quantity and assign it a variable.', ex: "\\text{Let Raju's age be } x", tip: 'Usually, the question tells you what the unknown is.' },
                { title: 'Form and Solve', f: '3x + 5 = 44', d: 'Translate the conditions into an equation and solve for x.', ex: '3x = 39 \\Rightarrow x = 13', tip: 'Read the word problem twice before picking variables.' }
            ]
        }
    }
];

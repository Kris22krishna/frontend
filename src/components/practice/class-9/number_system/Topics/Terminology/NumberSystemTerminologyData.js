// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

export const TERMS = [
    {
        name: 'Natural Numbers',
        color: '#0891b2',
        icon: '🌱',
        def: 'The counting numbers starting from 1. Used for things you can count on your fingers!',
        examples: ['$1$', '$2$', '$3$', '$100$'],
        inUse: '$\\mathbb{N} = \\{1, 2, 3, ...\\}$',
        memory: 'Think of "Natural" — it naturally starts with 1 when we count items.'
    },
    {
        name: 'Whole Numbers',
        color: '#059669',
        icon: '⭕',
        def: 'Natural numbers plus zero. It\'s the "whole" collection of non-negative counting numbers.',
        examples: ['$0$', '$1$', '$5$', '$99$'],
        inUse: '$\\mathbb{W} = \\{0, 1, 2, 3, ...\\}$',
        memory: 'The "O" in Whole reminds you of the zero ($0$) included!'
    },
    {
        name: 'Integers',
        color: '#b45309',
        icon: '↔️',
        def: 'Whole numbers and their negative opposites. No fractions or decimals allowed!',
        examples: ['$-3$', '$-2$', '$-1$', '$0$', '$1$', '$2$'],
        inUse: '$\\mathbb{Z} = \\{..., -2, -1, 0, 1, 2, ...\\}$',
        memory: 'The letter $\\mathbb{Z}$ comes from the German word "Zahlen" meaning numbers.'
    },
    {
        name: 'Rational Numbers',
        color: '#0369a1',
        icon: '🍕',
        def: 'Numbers that can be written as a fraction $p/q$, where $p$ and $q$ are integers and $q \\neq 0$.',
        examples: ['$1/2$', '$-3/4$', '$5$ (as $5/1$)', '$0.25$ (as $1/4$)'],
        inUse: 'A decimal is rational if it terminates or repeats (like $0.333...$).',
        memory: 'Rational contains the word "Ratio" — like a fraction!'
    },
    {
        name: 'Irrational Numbers',
        color: '#be185d',
        icon: '🌀',
        def: 'Numbers that CANNOT be written as a fraction. Their decimals go on forever without repeating.',
        examples: ['$\\sqrt{2}$', '$\\sqrt{3}$', '$\\pi$', '$0.101101110...$'],
        inUse: '$\\sqrt{5}$ is irrational because it never ends and never repeats.',
        memory: 'Irrational = Not Ratio-nal. They just don\'t fit in a fraction!'
    },
    {
        name: 'Real Numbers',
        color: '#7c3aed',
        icon: '🌌',
        def: 'The complete set of all Rational and Irrational numbers combined. Every point on the number line!',
        examples: ['$-5$', '$0$', '$2/3$', '$\\sqrt{7}$', '$3.14$'],
        inUse: 'All numbers we use in Grade 9 (except imaginaries) are Real Numbers ($\\mathbb{R}$).',
        memory: 'They are "Real" because they represent actual distances on a line.'
    },
    {
        name: 'Terminating Decimal',
        color: '#0891b2',
        icon: '🛑',
        def: 'A decimal that comes to an end after a finite number of digits.',
        examples: ['$0.5$', '$0.125$', '$2.75$'],
        inUse: '$1/4 = 0.25$ — it terminates!',
        memory: 'Think of "Terminal" — the bus stops here.'
    },
    {
        name: 'Recurring Decimal',
        color: '#ec4899',
        icon: '🔄',
        def: 'A decimal where a digit or a block of digits repeats infinitely.',
        examples: ['$0.333...$', '$0.121212...$', '$0.1666...$'],
        inUse: '$1/3 = 0.3\\bar{3}$. The bar indicates the repeat.',
        memory: 'Think of "Recurring" — it happens again and again.'
    },
];

export const FIVE_RULES = [
    {
        num: 1,
        title: 'Classification Rule',
        rule: 'A number is Rational if its decimal ends OR repeats. Otherwise, it is Irrational.',
        emoji: '📋',
        color: '#6366f1',
        detail: 'This is the golden rule for classification. $0.333...$ is Rational ($1/3$), but $0.10110111...$ is Irrational.',
        examples: ['$0.25$ (Terminating $\\rightarrow$ Rational)', '$0.3\\bar{3}$ (Repeating $\\rightarrow$ Rational)', '$\\pi$ (Non-ending $\\rightarrow$ Irrational)'],
        tip: 'Look for a pattern or an end. If neither exists, it\'s irrational!'
    },
    {
        num: 2,
        title: 'Rationalizing the Denominator',
        rule: 'To remove a square root from the bottom, multiply top and bottom by that root.',
        emoji: '🪄',
        color: '#0891b2',
        detail: 'Math "etiquette" says we shouldn\'t leave surds in the denominator. To fix $1/\\sqrt{2}$, multiply by $\\sqrt{2}/\\sqrt{2}$ to get $\\sqrt{2}/2$.',
        examples: ['$1/\\sqrt{3} = \\sqrt{3}/3$', '$5/\\sqrt{5} = \\sqrt{5}$'],
        tip: 'Use the conjugate for binomials: simplify $1/(\\sqrt{a}+b)$ using $(\\sqrt{a}-b)$.'
    },
    {
        num: 3,
        title: 'Laws of Exponents: Multiplication',
        rule: 'When multiplying same bases, ADD the powers: $a^m \\cdot a^n = a^{m+n}$.',
        emoji: '➕',
        color: '#f59e0b',
        detail: 'This works for all real number bases and real exponents. $2^3 \\cdot 2^4 = 2^7$.',
        examples: ['$x^2 \\cdot x^3 = x^5$', '$5^2 \\cdot 5^5 = 5^7$'],
        tip: 'The base MUST be the same!'
    },
    {
        num: 4,
        title: 'Laws of Exponents: Division',
        rule: 'When dividing same bases, SUBTRACT the powers: $a^m / a^n = a^{m-n}$.',
        emoji: '➖',
        color: '#10b981',
        detail: 'If you have $x^5$ shared among $x^2$, you are left with $x^3$.',
        examples: ['$5^{10} / 5^2 = 5^8$', '$a^7 / a^3 = a^4$'],
        tip: 'Always subtract top power minus bottom power.'
    },
    {
        num: 5,
        title: 'The Power of Power',
        rule: 'A power of a power multiplies: $(a^m)^n = a^{m \\cdot n}$.',
        emoji: '💥',
        color: '#ec4899',
        detail: 'When an exponent is raised to another exponent, they combine by multiplication. $(2^3)^2 = 2^6$.',
        examples: ['$(x^2)^4 = x^8$', '$(5^3)^5 = 5^{15}$'],
        tip: 'Don\'t add them! Multiply the exponents in this case.'
    }
];

export const VOCAB_QUIZ = [
    {
        question: "Which collection of numbers includes zero but NOT negative numbers?",
        options: ["Natural Numbers", "Whole Numbers", "Integers", "Irrational Numbers"],
        correct: 1,
        explanation: "Whole numbers ($\\mathbb{W}$) start from $0, 1, 2, ...$ Natural numbers start from $1$."
    },
    {
        question: "Is $\\sqrt{2}$ a Rational or Irrational number?",
        options: ["Rational", "Irrational", "Integer", "Whole Number"],
        correct: 1,
        explanation: "$\\sqrt{2}$ is irrational because its decimal expansion is non-terminating and non-recurring."
    },
    {
        question: "A decimal that repeats a pattern infinitely (like $0.121212...$) is...",
        options: ["Irrational", "Terminating", "Rational", "Integer"],
        correct: 2,
        explanation: "Recurring (repeating) decimals are always Rational because they can be written as fractions."
    },
    {
        question: "What is the value of $5^0$?",
        options: ["0", "5", "1", "Undefined"],
        correct: 2,
        explanation: "Any non-zero real number raised to the power of $0$ is always $1$."
    },
    {
        question: "Simplify: $x^5 \\cdot x^3$",
        options: ["$x^8$", "$x^{15}$", "$x^2$", "$2x^8$"],
        correct: 0,
        explanation: "When multiplying same bases, we add the exponents: $5 + 3 = 8$."
    },
    {
        question: "What is the result of rationalizing $1/\\sqrt{3}$?",
        options: ["$\\sqrt{3}$", "$3$", "$\\sqrt{3}/3$", "$1/3$"],
        correct: 2,
        explanation: "Multiply top and bottom by $\\sqrt{3}$ to get $\\sqrt{3}/(\\sqrt{3} \\cdot \\sqrt{3}) = \\sqrt{3}/3$."
    },
    {
        question: "Which of these is NOT a Real Number?",
        options: ["$-5$", "$\\sqrt{2}$", "$0$", "None of the above"],
        correct: 3,
        explanation: "All these numbers (negatives, surds, zero) are part of the Real Number System ($\\mathbb{R}$)."
    },
    {
        question: "A decimal that ends (like $0.75$) is called a...",
        options: ["Recurring decimal", "Terminating decimal", "Infinite decimal", "Irrational decimal"],
        correct: 1,
        explanation: "A terminating decimal is one that 'terminates' or ends after a certain number of digits."
    },
    {
        question: "Simplify: $(a^2)^3$",
        options: ["$a^5$", "$a^6$", "$a^23$", "$3a^2$"],
        correct: 1,
        explanation: "Using the Power of a Power law: $2 \\cdot 3 = 6$."
    },
    {
        question: "Every point on the number line represents...",
        options: ["Only Integers", "Only Rational Numbers", "A unique Real Number", "Only Whole Numbers"],
        correct: 2,
        explanation: "The Real Number line is a continuous line where every single point corresponds to a unique real number."
    }
];

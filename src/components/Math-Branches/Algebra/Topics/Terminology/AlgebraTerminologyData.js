// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

export const TERMS = [
    {
        name: 'Constant',
        color: '#6366f1',
        icon: '🔢',
        def: 'A fixed number that never changes its value. It stands alone — no variable attached!',
        examples: ['$3$', '$-7$', '$100$', '$0$'],
        inUse: 'In $5x + 3$, the number $3$ is a constant.',
        memory: 'Think of it as something constant — like the number of days in a week: always $7$.'
    },
    {
        name: 'Variable',
        color: '#0891b2',
        icon: '❓',
        def: 'A letter that represents an unknown or changing quantity. It\'s the mystery number!',
        examples: ['$x$', '$y$', '$n$', '$a$'],
        inUse: 'In $5x + 3$, the letter $x$ is a variable — its value can change.',
        memory: 'Variable = Variable value — it can vary and change!'
    },
    {
        name: 'Term',
        color: '#f59e0b',
        icon: '🧩',
        def: 'A single piece of an expression — either a constant, a variable, or a combination using multiplication/division.',
        examples: ['$5$', '$x$', '$5x$', '$x/5$', '$5/x$', '$3y^2$', '$7$', '$ab$'],
        inUse: 'In $5x + 3$, we have two terms: $5x$ and $3$.',
        memory: 'Terms are like puzzle pieces that combine to make an expression!'
    },
    {
        name: 'Coefficient',
        color: '#ec4899',
        icon: '✖️',
        def: 'Repeated addition of a variable gives coefficient. For example, $x+x+x+x+x=5x$. The number in front of a variable in a term is called coefficient. It tells you how many times to take the variable.',
        examples: ['$5$ in $5x$', '$-3$ in $-3y$', '$1$ in $x$'],
        inUse: 'In $5x + 3$, the coefficient of $x$ is $5$.',
        memory: 'The "chef" who decides how many variables to use!'
    },
    {
        name: 'Power',
        color: '#7c3aed',
        icon: '⚡',
        def: 'Repeated multiplication of a variable gives power. For example, $a \\times a \\times a = a^3$. The small raised number (exponent) that tells you how many times to multiply the base by itself.',
        examples: ['$x^2 = x \\times x$', '$y^3 = y \\times y \\times y$', '$5^2 = 25$'],
        inUse: 'In $3x^2$, the power is $2$ — so $x$ is multiplied twice.',
        memory: 'Power = tiny number with SUPER strength!'
    },
    {
        name: 'Like Terms',
        color: '#10b981',
        icon: '🤝',
        def: 'Terms with EXACTLY the SAME variable and SAME power. They can be combined.',
        examples: ['$3x$ and $5x$', '$-2y^2$ and $7y^2$'],
        inUse: '$3x + 5x = 8x$. But $3x + 5y \\neq 8xy$!',
        memory: 'apple + apple is 2 apples but apple + banana is still apple + banana. Because apple + apple are like terms but apple + banana are unlike terms.'
    },
    {
        name: 'Unlike Terms',
        color: '#ef4444',
        icon: '❌',
        def: 'Terms with different variables OR different powers. They CANNOT be combined.',
        examples: ['$3x$ and $3y$', '$5x^2$ and $5x$'],
        inUse: '$3x + 5y^2$ — these stay separate.',
        memory: 'Like apples and oranges — can\'t be added!'
    },
    {
        name: 'Expression',
        color: '#06b6d4',
        icon: '📝',
        def: 'A combination of terms joined by + or −. It has NO equals sign — it\'s just a phrase.',
        examples: ['$5x + 3$', '$2a^2 - 4b + 7$'],
        inUse: '$5x + 3$ is an expression — it describes something!',
        memory: 'Like a phrase: "the red ball" (not a full sentence yet)!'
    },
    {
        name: 'Equation',
        color: '#6366f1',
        icon: '⚖️',
        def: 'A statement that two expressions are EQUAL. It MUST have an equals sign (=).',
        examples: ['$2x + 3 = 11$', '$y - 5 = 0$'],
        inUse: '$2x + 3 = 11$ is an equation. Balance it to find $x$!',
        memory: 'Like a balanced weighing scale!'
    },
];

export const FIVE_RULES = [
    {
        num: 1,
        title: 'Building Terms',
        rule: 'Terms are created by sticking constants and variables together through multiplication.',
        emoji: '🏗️',
        color: '#6366f1',
        detail: 'A term is a single "chunk". You can multiply or divide anything inside it, but once you use $+$ or $-$, you have started a new term!',
        examples: ['$5x$', '$-2ab$', '$x/4$', '$9$'],
        tip: 'Terms are the bricks. Expressions are the walls!'
    },
    {
        num: 2,
        title: 'Variable Integrity',
        rule: 'Like terms must have the EXACT same variable AND the exact same power.',
        emoji: '♊',
        color: '#0891b2',
        detail: 'Close is not enough! $x$ and $x^2$ are twins but not identical in power, so they are UNLIKE terms.',
        examples: ['$3x^2$ and $5x^2$ (Like)', '$3x$ and $3y$ (Unlike)', '$x^2$ and $x$ (Unlike)'],
        tip: 'Check the letter AND the power before you combine!'
    },
    {
        num: 3,
        title: 'Expression Flow',
        rule: 'Expressions are just mathematical phrases — they describe a value but don\'t state a fact.',
        emoji: '🌊',
        color: '#f59e0b',
        detail: 'An expression is a collection of terms. Crucially, it has NO equals sign. It\'s like saying "The blue sky" instead of "The sky is blue."',
        examples: ['$x + 5$', '$2a^2 - 4b + 7$'],
        tip: 'Think of an expression as a mathematical phrase.'
    },
    {
        num: 4,
        title: 'The Combine Rule',
        rule: 'You can only add or subtract Like Terms. Unlike terms must stay separate forever.',
        emoji: '🧪',
        color: '#10b981',
        detail: 'It\'s like nature — you can add 2 apples and 3 apples to get 5 apples. But 2 apples and 3 oranges just stay as they are!',
        examples: ['$3x + 2x = 5x$', '$4y + 2z =$ (stays the same)'],
        tip: 'Don\'t force unlike terms together. Let them be!'
    },
    {
        num: 5,
        title: 'Golden Balance',
        rule: 'An Equation is a balanced scale. Whatever you do to one side, you MUST do to the other.',
        emoji: '⚖️',
        color: '#ec4899',
        detail: 'The equals sign ($=$) is the center point. If you add $5$ to the left, the scale tips unless you add $5$ to the right as well.',
        examples: ['$x - 3 = 10 \\rightarrow x = 13$', '$2x = 8 \\rightarrow x = 4$'],
        tip: 'The equals sign is sacred. Keep the balance!'
    }
];

export const VOCAB_QUIZ = [
    {
        question: "What do we call a fixed number that never changes its value?",
        options: ["Variable", "Constant", "Coefficient", "Term"],
        correct: 1,
        explanation: "A constant (like $7$ or $-3$) is a fixed value that stands alone without a variable."
    },
    {
        question: "In the term $5x$, what is the number $5$ called?",
        options: ["Power", "Variable", "Coefficient", "Expression"],
        correct: 2,
        explanation: "The coefficient is the number in front of a variable. It tells you how many times to take that variable."
    },
    {
        question: "A letter like $x$ or $y$ that represents an unknown number is a...",
        options: ["Constant", "Coefficient", "Equation", "Variable"],
        correct: 3,
        explanation: "Variables are letters used to represent values that can change or are currently unknown."
    },
    {
        question: "Which of these are 'Like Terms'?",
        options: ["$3x$ and $3y$", "$5x$ and $5x^2$", "$4ab$ and $-ab$", "$7$ and $7x$"],
        correct: 2,
        explanation: "Like terms must have the EXACT same variable and EXACT same power. $4ab$ and $-ab$ both have '$ab$'."
    },
    {
        question: "What is the main difference between an Expression and an Equation?",
        options: ["Equations have variables", "Expressions have no numbers", "Equations have an Equals Sign (=)", "Expressions are longer"],
        correct: 2,
        explanation: "An equation is a statement that two things are equal (=). An expression is just a mathematical phrase."
    },
    {
        question: "What is the small raised number in $x^3$ called?",
        options: ["Base", "Coefficient", "Power", "Constant"],
        correct: 2,
        explanation: "The raised number is the Power (or Exponent). It tells you how many times to multiply the base by itself."
    },
    {
        question: "Can you simplify $3x + 4y$ into $7xy$?",
        options: ["Yes, always", "No, they are unlike terms", "Only if x = y", "Yes, if you multiply them"],
        correct: 1,
        explanation: "No! You can only add or subtract LIKE terms. $x$ and $y$ are different variables, so they must stay separate."
    },
    {
        question: "How many terms are in the expression: $3x^2 + 5x - 8$?",
        options: ["1", "2", "3", "6"],
        correct: 2,
        explanation: "There are 3 terms: $3x^2$, $5x$, and $-8$. Terms are separated by $+$ or $-$ signs."
    },
    {
        question: "In the term $x$, what is the actual coefficient?",
        options: ["0", "1", "x", "It doesn't have one"],
        correct: 1,
        explanation: "If no number is shown in front of a variable, the coefficient is always $1$ (since $1 \\times x = x$)."
    },
    {
        question: "If you add $5$ to one side of an equation, what must you do to the other side?",
        options: ["Subtract $5$", "Do nothing", "Add $5$", "Multiply by $5$"],
        correct: 2,
        explanation: "The Golden Rule of Equations: Whatever you do to one side, you MUST do to the other to keep it balanced."
    }
];

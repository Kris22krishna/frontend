// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

export const TERMS = [
    {
        name: 'Integer',
        color: '#6366f1',
        icon: '🔢',
        def: 'Whole numbers and their negative counterparts. No fractions or decimals allowed!',
        examples: ['$-3$', '$0$', '$5$', '$-100$'],
        inUse: 'The temperature was $-5 ^\\circ\\text{C}$, which is an integer.',
        memory: 'Think of a complete, unbroken number — it can be positive, negative, or zero.'
    },
    {
        name: 'Positive Integer',
        color: '#10b981',
        icon: '📈',
        def: 'Any integer that is strictly greater than zero.',
        examples: ['$1$', '$8$', '$42$'],
        inUse: 'Gaining $8$ dollars is represented by the positive integer $+8$.',
        memory: 'Positive = Plus = More than nothing!'
    },
    {
        name: 'Negative Integer',
        color: '#ef4444',
        icon: '📉',
        def: 'Any integer that is strictly less than zero. It always has a minus sign.',
        examples: ['$-1$', '$-6$', '$-99$'],
        inUse: 'A debt of $6$ dollars is represented by the negative integer $-6$.',
        memory: 'Negative = Minus = Below zero (like freezing temps)!'
    },
    {
        name: 'Additive Identity',
        color: '#0891b2',
        icon: '🪞',
        def: 'The number that keeps the original value unchanged when added. For integers, it is always $0$.',
        examples: ['$a + 0 = a$', '$-8 + 0 = -8$'],
        inUse: 'Adding $0$ to your score doesn\'t change your score.',
        memory: 'Identity = staying identical. Zero is the magic mirror!'
    },
    {
        name: 'Additive Inverse',
        color: '#f59e0b',
        icon: '☯️',
        def: 'The opposite of a number. When you add a number and its additive inverse, the sum is $0$.',
        examples: ['$5 + (-5) = 0$', '$-12 + 12 = 0$'],
        inUse: 'The additive inverse of $7$ is $-7$.',
        memory: 'Inverse means opposite. They cancel each other out to make zero!'
    },
    {
        name: 'Closure Property',
        color: '#8b5cf6',
        icon: '🔒',
        def: 'When you perform an operation on two integers and the result is ALWAYS another integer.',
        examples: ['$(-10) + 7 = -3$ (Closed!)', '$3 \\times (-4) = -12$ (Closed!)'],
        inUse: 'Integers are closed under addition, subtraction, and multiplication.',
        memory: 'The result stays locked inside the "Integer Family" house!'
    },
    {
        name: 'Commutative Property',
        color: '#ec4899',
        icon: '🔄',
        def: 'The rule that says you can swap the order of the numbers and still get the same result.',
        examples: ['$a + b = b + a$', '$5 + (-6) = (-6) + 5$'],
        inUse: 'Addition and multiplication are commutative. Subtraction is NOT!',
        memory: 'Commute means to travel or move around. The numbers can move around freely!'
    },
    {
        name: 'Associative Property',
        color: '#06b6d4',
        icon: '🫂',
        def: 'The rule that says how you group numbers (which ones you calculate first) doesn\'t matter.',
        examples: ['$(a + b) + c = a + (b + c)$'],
        inUse: '$(-5 + -3) + -2$ is identical to $-5 + (-3 + -2)$.',
        memory: 'Associate means who you hang out with. Grouping doesn\'t change the total!'
    }
];

export const FOUR_RULES = [
    {
        num: 1,
        title: 'Addition: Same Signs',
        rule: 'When adding integers with the SAME sign, ADD their absolute values and KEEP the sign.',
        emoji: '➕',
        color: '#10b981',
        detail: 'If you combine two positive forces, you get a bigger positive. If you combine two debts (negatives), you get a bigger debt!',
        examples: ['$3 + 4 = 7$', '$(-3) + (-4) = -7$'],
        tip: 'Same signs? Add and keep!'
    },
    {
        num: 2,
        title: 'Addition: Different Signs',
        rule: 'When adding integers with DIFFERENT signs, SUBTRACT the smaller from the larger, and keep the sign of the larger.',
        emoji: '⚔️',
        color: '#ef4444',
        detail: 'It\'s a battle! The larger absolute value wins the fight and gives its sign to the answer.',
        examples: ['$7 + (-5) = 2$', '$(-10) + 4 = -6$'],
        tip: 'Different signs? Find the difference. The bigger team wins the sign!'
    },
    {
        num: 3,
        title: 'Multiplication: Same Signs',
        rule: 'The product (or quotient) of two integers with the SAME sign is ALWAYS POSITIVE.',
        emoji: '🤝',
        color: '#3b82f6',
        detail: 'A positive times a positive is positive. Surprisingly, taking away a debt (negative times negative) is also a positive outcome!',
        examples: ['$3 \\times 5 = 15$', '$(-3) \\times (-2) = 6$'],
        tip: 'Same signs agree and make a positive (+).'
    },
    {
        num: 4,
        title: 'Multiplication: Different Signs',
        rule: 'The product (or quotient) of two integers with DIFFERENT signs is ALWAYS NEGATIVE.',
        emoji: '⚠️',
        color: '#f59e0b',
        detail: 'If you lose money (negative) three times (positive), you have an overall loss (negative).',
        examples: ['$4 \\times (-5) = -20$', '$(-8) \\div 2 = -4$'],
        tip: 'Different signs clash and make a negative (-).'
    }
];

export const VOCAB_QUIZ = [
    {
        question: "What do we call the numbers ... $-3, -2, -1, 0, 1, 2, 3$ ... ?",
        options: ["Fractions", "Variables", "Integers", "Decimals"],
        correct: 2,
        explanation: "These are integers — whole numbers that include zero and negative numbers."
    },
    {
        question: "What is the additive identity for integers?",
        options: ["1", "-1", "0", "10"],
        correct: 2,
        explanation: "The additive identity is $0$, because adding $0$ keeps a number identical ($a + 0 = a$)."
    },
    {
        question: "What do you get when you add an integer and its additive inverse?",
        options: ["1", "The same number", "-1", "0"],
        correct: 3,
        explanation: "They cancel each other out to make $0$. Example: $5 + (-5) = 0$."
    },
    {
        question: "Which property states that $a + b = b + a$?",
        options: ["Associative", "Commutative", "Closure", "Identity"],
        correct: 1,
        explanation: "The Commutative Property means the order of numbers doesn't matter when adding or multiplying."
    },
    {
        question: "Which rule describes grouping numbers like $(a + b) + c = a + (b + c)$?",
        options: ["Identity", "Closure", "Associative", "Commutative"],
        correct: 2,
        explanation: "The Associative Property deals with how numbers associate (or group) together."
    },
    {
        question: "What happens when you add two negative integers?",
        options: ["The answer is positive", "The answer is zero", "You keep the negative sign", "They become fractions"],
        correct: 2,
        explanation: "Rule 1: Same signs. You add their absolute values and keep the negative sign!"
    },
    {
        question: "What is the product of two negative integers?",
        options: ["Negative", "Positive", "Zero", "Undefined"],
        correct: 1,
        explanation: "The product of two integers with the SAME sign is ALWAYS positive: $(-a) \\times (-b) = ab$."
    },
    {
        question: "If an integer is strictly less than zero, it is a:",
        options: ["Variable", "Positive Integer", "Negative Integer", "Constant"],
        correct: 2,
        explanation: "Numbers less than zero are negative integers and have a minus sign."
    },
    {
        question: "Which property guarantees that an integer minus another integer is still an integer?",
        options: ["Closure Property", "Additive Inverse", "Commutative Property", "Associativity"],
        correct: 0,
        explanation: "The Closure Property means the result stays within the same set of numbers (Integers)."
    },
    {
        question: "When adding integers with different signs, how do you determine the sign of the answer?",
        options: ["It is always positive", "It is always negative", "Take the sign of the larger absolute value", "Multiply the signs"],
        correct: 2,
        explanation: "It's a battle! You subtract the smaller from the larger absolute value, and the bigger number's sign wins."
    }
];

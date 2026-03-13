export const TERMS = [
    {
        name: 'Real Numbers',
        color: '#6366f1',
        icon: 'ℝ',
        def: 'The set of all rational and irrational numbers. They can be represented as points on the real number line.',
        examples: ['$5$, $-3.2$, $\\frac{1}{3}$, $\\sqrt{2}$, $\\pi$'],
        inUse: 'Real numbers include almost any number you can think of in basic mathematics.',
        memory: 'Real numbers fill up the entire number line without leaving any gaps!'
    },
    {
        name: 'Rational Numbers',
        color: '#0d9488',
        icon: 'ℚ',
        def: 'A number that can be expressed as a ratio $\\frac{p}{q}$ of two integers, where $q \\neq 0$.',
        examples: ['$\\frac{3}{4}$, $-5$ (as $\\frac{-5}{1}$), $0.333...$ (as $\\frac{1}{3}$)'],
        inUse: 'If its decimal expansion terminates or repeats, it is a Rational Number.',
        memory: 'Think "Ratio"-nal! It can be written as a fraction.'
    },
    {
        name: 'Irrational Numbers',
        color: '#f59e0b',
        icon: '𝕀',
        def: 'A real number that cannot be expressed as a simple fraction. Its decimal expansion is non-terminating and non-repeating.',
        examples: ['$\\sqrt{2} \\approx 1.4142...$', '$\\pi \\approx 3.14159...$'],
        inUse: 'They are often roots of prime numbers or special constants.',
        memory: 'Irrational numbers go on forever without ever forming a repeating pattern.'
    },
    {
        name: 'Euclid’s Division Algorithm',
        color: '#ec4899',
        icon: '➗',
        def: 'A technique to compute the Highest Common Factor (HCF) of two given positive integers.',
        examples: ['To find HCF of 455 and 42, we repeatedly apply the lemma until remainder is 0.'],
        inUse: 'Based on Euclid\'s Division Lemma: $a = bq + r$, where $0 \\le r < b$.',
        memory: 'It is simply a formalized version of long division.'
    },
    {
        name: 'Prime Factorisation',
        color: '#7c3aed',
        icon: '🌳',
        def: 'The process of finding which prime numbers multiply together to make the original number.',
        examples: ['$12 = 2 \\times 2 \\times 3 = 2^2 \\times 3$'],
        inUse: 'Used constantly to find HCF and LCM of multiple numbers.',
        memory: 'Breaking down a number into its indivisible "prime" building blocks.'
    },
    {
        name: 'Fundamental Theorem of Arithmetic',
        color: '#3b82f6',
        icon: '🧬',
        def: 'Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique (apart from the order).',
        examples: ['$30$ is always $2 \\times 3 \\times 5$, no matter the order ($5 \\times 2 \\times 3$, etc.)'],
        inUse: 'This theorem is the reason prime factors are so powerful.',
        memory: 'It\'s the "Unique DNA" rule for all numbers.'
    },
    {
        name: 'HCF',
        color: '#ef4444',
        icon: '🔼',
        def: 'Highest Common Factor. The largest positive integer that divides two or more numbers without a remainder.',
        examples: ['$HCF(12, 16) = 4$, because $4$ is the largest number that divides both.'],
        inUse: 'Found by taking the product of the smallest power of each common prime factor.',
        memory: 'Highest Common Factor looks for the biggest shared slice.'
    },
    {
        name: 'LCM',
        color: '#10b981',
        icon: '🔽',
        def: 'Lowest Common Multiple. The smallest positive integer that is uniformly divisible by two or more numbers.',
        examples: ['$LCM(4, 6) = 12$.'],
        inUse: 'Found by taking the product of the greatest power of each prime factor involved.',
        memory: 'Lowest Common Multiple tells you when their multiples will first "meet".'
    },
    {
        name: 'Proof by Contradiction',
        color: '#8b5cf6',
        icon: '🔄',
        def: 'A form of proof that establishes the truth of a proposition by showing that assuming the proposition to be false leads to a contradiction.',
        examples: ['Assume $\\sqrt{2}$ is rational $\\Rightarrow$ leads to a contradiction $\\Rightarrow$ thus $\\sqrt{2}$ is irrational.'],
        inUse: 'A highly common technique for proving the irrationality of roots.',
        memory: 'Assume the opposite is true, then show how it breaks the rules of math!'
    }
];

export const FIVE_RULES = [
    {
        num: 1,
        title: 'The Rational or Irrational Rule',
        rule: 'Every real number is either rational or irrational. It cannot be both!',
        emoji: '⚖️',
        color: '#6366f1',
        detail: 'The set of real numbers is mutually exclusive when split into rationals and irrationals.',
        examples: ['$\\frac{1}{2}$ is rational.', '$\\sqrt{3}$ is irrational.'],
        tip: 'If you can write it as a fraction, it\'s off the irrational list.'
    },
    {
        num: 2,
        title: 'Euclid’s Division Lemma',
        rule: 'Given positive integers $a$ and $b$, there exist unique integers $q$ and $r$ satisfying $a = bq + r$, $0 \\le r < b$.',
        emoji: '📐',
        color: '#0d9488',
        detail: 'This is the basis for computing the HCF. The remainder $r$ must always be strictly less than the divisor $b$.',
        examples: ['For 17 and 5: $17 = 5 \\times 3 + 2$'],
        tip: 'Dividend = Divisor $\\times$ Quotient + Remainder.'
    },
    {
        num: 3,
        title: 'Unique Factorisation',
        rule: 'The prime factorisation of a natural number is unique, except for the order of its factors.',
        emoji: '🧬',
        color: '#f59e0b',
        detail: 'Also known as the Fundamental Theorem of Arithmetic. No two different composite numbers have the exact same group of prime factors.',
        examples: ['$210 = 2 \\times 3 \\times 5 \\times 7$'],
        tip: 'Primes are the atomic elements of mathematics.'
    },
    {
        num: 4,
        title: 'The HCF-LCM Relationship',
        rule: 'For any two positive integers $a$ and $b$, $\\text{HCF}(a,b) \\times \\text{LCM}(a,b) = a \\times b$.',
        emoji: '🔄',
        color: '#10b981',
        detail: 'This rule is extremely useful for finding the LCM quickly if you already know the HCF, or vice-versa.',
        examples: ['If $a=4, b=6$: $\\text{HCF}=2$, $\\text{LCM}=12$. And $2 \\times 12 = 4 \\times 6 = 24$.'],
        tip: 'This only works for TWO numbers, not three!'
    },
    {
        num: 5,
        title: 'Sum & Product of Irrationals',
        rule: 'The sum or product of a non-zero rational and an irrational number is always irrational.',
        emoji: '➕',
        color: '#ec4899',
        detail: 'If you mix a non-zero clean fraction with an endless non-repeating decimal, the result will be an endless non-repeating decimal.',
        examples: ['$2 + \\sqrt{3}$ is irrational.', '$5 \\times \\sqrt{2}$ is irrational.'],
        tip: 'Irrationals are "infectious" to rationals!'
    }
];

export const VOCAB_QUIZ = [
    {
        question: "Which theorem states that every composite number can be expressed as a product of primes uniquely?",
        options: ["Euclid's Division Lemma", "Fundamental Theorem of Arithmetic", "Pythagoras Theorem", "BPT Theorem"],
        correct: 1,
        explanation: "The Fundamental Theorem of Arithmetic is the 'unique DNA' rule for composite numbers."
    },
    {
        question: "If HCF(a,b) is 5 and LCM(a,b) is 20, what is the value of $a \\times b$?",
        options: ["15", "25", "100", "4"],
        correct: 2,
        explanation: "Using the rule: $a \\times b = \\text{HCF} \\times \\text{LCM}$. So, $5 \\times 20 = 100$."
    },
    {
        question: "Which of the following is an irrational number?",
        options: ["$\\frac{22}{7}$", "$3.14$", "$\\sqrt{2}$", "$\\sqrt{4}$"],
        correct: 2,
        explanation: "$\\sqrt{2}$ is irrational. $\\frac{22}{7}$ and $3.14$ are rational approximations, and $\\sqrt{4} = 2$."
    },
    {
        question: "In Euclid's Division Lemma, $a = bq + r$. What is the condition for $r$?",
        options: ["$0 \\le r \\le b$", "$0 < r < b$", "$0 \\le r < b$", "$r > b$"],
        correct: 2,
        explanation: "The remainder $r$ must be greater than or equal to zero, but strictly less than the divisor $b$."
    },
    {
        question: "The method of proving $\\sqrt{2}$ is irrational usually relies on assuming it IS rational first. What is this method called?",
        options: ["Direct Proof", "Proof by Induction", "Proof by Syllogism", "Proof by Contradiction"],
        correct: 3,
        explanation: "By assuming the opposite of what we want to prove and finding a logical breakdown, we perform Proof by Contradiction."
    }
];

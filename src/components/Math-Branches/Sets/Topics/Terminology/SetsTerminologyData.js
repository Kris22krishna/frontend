export const TERMS = [
    {
        name: 'Set',
        color: '#6366f1',
        icon: '📦',
        def: 'A well-defined collection of distinct objects. Every item in it is unique!',
        examples: ['$A = \\{1, 2, 3\\}$', '$V = \\{a, e, i, o, u\\}$'],
        inUse: 'We use uppercase letters like $A, B, C$ to name sets.',
        memory: 'Think of it as a labeled box of special items.'
    },
    {
        name: 'Element',
        color: '#0d9488',
        icon: '🔹',
        def: 'A member or an object that belongs to a set. We use the symbol $\\in$.',
        examples: ['$2 \\in \\{1, 2, 3\\}$', '$b \\notin \\{a, e, i, o, u\\}$'],
        inUse: 'If $x$ is an element of $A$, we write $x \\in A$.',
        memory: 'Elements are the individual "soldiers" in the set "army".'
    },
    {
        name: 'Cardinality',
        color: '#f59e0b',
        icon: '🔢',
        def: 'The number of distinct elements in a set. Denoted by $n(A)$ or $|A|$.',
        examples: ['If $A = \\{2, 4, 6\\}$, then $n(A) = 3$.', 'Empty set cardinality is $0$.'],
        inUse: 'Cardinality tells you how "big" the set is.',
        memory: 'Cardinality = Count!'
    },
    {
        name: 'Subset',
        color: '#ec4899',
        icon: '🖇️',
        def: 'A set $A$ is a subset of $B$ if every element of $A$ is also in $B$. Symbol: $A \\subseteq B$.',
        examples: ['$\\{1, 2\\} \\subseteq \\{1, 2, 3\\}$', 'Every set is a subset of itself.'],
        inUse: 'Like a small folder inside a bigger folder on your computer.',
        memory: 'Subset = Sub-part of the original.'
    },
    {
        name: 'Power Set',
        color: '#7c3aed',
        icon: '⚡',
        def: 'The set containing ALL possible subsets of a given set $A$. Symbol: $P(A)$.',
        examples: ['If $A = \\{1, 2\\}$, then $P(A) = \\{\\emptyset, \\{1\\}, \\{2\\}, \\{1, 2\\}\\}$.'],
        inUse: 'The size of $P(A)$ is always $2^{n(A)}$.',
        memory: 'The Power Set contains all the small combos you can make!'
    },
    {
        name: 'Universal Set',
        color: '#3b82f6',
        icon: '🌌',
        def: 'The set that contains all objects under consideration in a particular context. Symbol: $U$.',
        examples: ['In numbers, $U$ could be the set of Real Numbers.', 'In English, $U$ is the Alphabet.'],
        inUse: 'Venn diagrams show $U$ as a large outer rectangle.',
        memory: 'U = The Universe (it has everything!).'
    },
    {
        name: 'Empty Set',
        color: '#ef4444',
        icon: '⭕',
        def: 'A set that has NO elements at all. Symbol: $\\emptyset$ or $\\{\\}$.',
        examples: ['Set of humans with 10 legs.', 'Set of months with 40 days.'],
        inUse: 'Don\'t write $\\{\\emptyset\\}$ — that\'s a set containing an empty set!',
        memory: 'The Empty Set is the "Zero" of the set world.'
    }
];

export const FIVE_RULES = [
    {
        num: 1,
        title: 'Well-Definedness',
        rule: 'Every set must have a clear rule for membership. No opinions allowed!',
        emoji: '📏',
        color: '#6366f1',
        detail: '"Smart students" is not a set (opinion). "Students scoring above 90%" is a set.',
        examples: ['Correct: Prime numbers < 10', 'Wrong: Best movies of 2024'],
        tip: 'If you can argue about it, it\'s probably not a set!'
    },
    {
        num: 2,
        title: 'Uniqueness (No Repetition)',
        rule: 'Elements in a set should not be repeated. Each item counts once.',
        emoji: '🚫',
        color: '#0d9488',
        detail: 'In a set, $\\{1, 2, 2, 3\\}$ is exactly the same as $\\{1, 2, 3\\}$. We only list distinct items.',
        examples: ['The set of letters in "HELLO" is $\\{H, E, L, O\\}$.'],
        tip: 'Repetition adds no value to a set.'
    },
    {
        num: 3,
        title: 'Disorder Rule (Order Hidden)',
        rule: 'The order of elements doesn\'t matter. A different arrangement is the same set.',
        emoji: '🌀',
        color: '#f59e0b',
        detail: '$\\{1, 2, 3\\}$ and $\\{3, 1, 2\\}$ are the same set. They have the same content.',
        examples: ['$\\{a, b, c\\} = \\{c, a, b\\}$'],
        tip: 'Sets don\'t care about who comes first!'
    },
    {
        num: 4,
        title: 'Bracket Etiquette',
        rule: 'Always use curly braces $\\{\\}$ to denote a set.',
        emoji: '✍️',
        color: '#10b981',
        detail: 'Parentheses $()$ are for coordinates/tuples. Square brackets $[]$ are for intervals (usually). Sets need the magic curls.',
        examples: ['Correct: $\\{x, y\\}$', 'Wrong: $[x, y]$'],
        tip: 'Curly brackets are the uniform of a Set.'
    },
    {
        num: 5,
        title: 'The Ghost Rule',
        rule: 'The Empty Set is a subset of EVERY set.',
        emoji: '👻',
        color: '#ec4899',
        detail: 'For any set $A$, $\\emptyset \\subseteq A$. This is a fundamental axiom in mathematics.',
        examples: ['$\\{ \\} \\subseteq \\{1, 2, 3\\}$'],
        tip: 'Nothingness is part of everything!'
    }
];

export const VOCAB_QUIZ = [
    {
        question: "Which symbol represents that an element belongs to a set?",
        options: ["$\\subset$", "$\\subseteq$", "$\\in$", "$\\emptyset$"],
        correct: 2,
        explanation: "The epsilon symbol $\\in$ means 'is an element of' or 'belongs to'."
    },
    {
        question: "If $A = \\{H, E, L, L, O\\}$, what is $n(A)$?",
        options: ["5", "4", "3", "0"],
        correct: 1,
        explanation: "Cardinality $n(A)$ counts distinct elements. L is repeated, so the distinct elements are H, E, L, O ($n = 4$)."
    },
    {
        question: "What do we call a set that contains all elements under consideration?",
        options: ["Power Set", "Universal Set", "Subset", "Empty Set"],
        correct: 1,
        explanation: "The Universal Set ($U$) is the 'universe' containing every relevant object for the problem."
    },
    {
        question: "What is the cardinality of the Power Set of a set with 3 elements?",
        options: ["3", "6", "8", "9"],
        correct: 2,
        explanation: "Formula for Power Set size is $2^n$. So $2^3 = 8$."
    },
    {
        question: "Which of these is a 'Well-Defined' set?",
        options: ["Expensive cars in India", "Delicious fruits in summer", "First five odd natural numbers", "Popular actors in Hollywood"],
        correct: 2,
        explanation: "Expensive, Delicious, and Popular are subjective. 'First five odd natural numbers' is objective and clear."
    }
];

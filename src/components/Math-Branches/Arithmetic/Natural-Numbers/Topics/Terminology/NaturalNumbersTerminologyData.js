export const TERMS = [
    {
        word: 'Natural Numbers (ℕ)',
        def: 'The set of positive integers used for counting and ordering. They start from 1, and go on endlessly.',
        icon: '🔢',
        example: '$\\mathbb{N} = \\{1, 2, 3, 4, 5, \\dots\\}$',
        realLifeExample: 'Counting the number of students in a classroom — you can have 1, 2, 3... but never 0 or -1 students.',
        visualType: 'NumberLine-NaturalFull'
    },
    {
        word: 'Even Numbers',
        def: 'Any natural number that is exactly divisible by 2 without any remainder.',
        icon: '✌️',
        example: '$2, 4, 6, 8, 10, \\dots$',
        realLifeExample: 'Pairs of shoes — every shoe box always contains an even number of shoes (2, 4, 6...).',
        visualType: 'NumberLine-Even'
    },
    {
        word: 'Odd Numbers',
        def: 'Any natural number that leaves a remainder of 1 when divided by 2.',
        icon: '☝️',
        example: '$1, 3, 5, 7, 9, \\dots$',
        realLifeExample: 'A see-saw with an odd number of children — one child will always be left without a partner!',
        visualType: 'NumberLine-Odd'
    },
    {
        word: 'Prime Numbers',
        def: 'A natural number greater than 1 that has exactly two distinct factors: 1 and itself.',
        icon: '💎',
        example: '$2, 3, 5, 7, 11, 13, \\dots$',
        realLifeExample: 'Prime numbers are used in cryptography to secure online transactions — they are the "atoms" of mathematics!',
        visualType: 'NumberLine-Prime'
    },
    {
        word: 'Composite Numbers',
        def: 'Natural numbers that have more than two distinct positive divisors.',
        icon: '🧱',
        example: '$4, 6, 8, 9, 10, 12, \\dots$',
        realLifeExample: 'A chocolate bar with 12 pieces can be split evenly among 2, 3, 4, or 6 people — it has many factors!',
        visualType: 'NumberLine-Composite'
    },
    {
        word: 'Successor',
        def: 'The number that comes immediately after a particular number. Found by adding 1.',
        icon: '⏭️',
        example: 'The successor of $15$ is $15 + 1 = 16$.',
        realLifeExample: 'Moving to the next floor in an elevator — from floor 15, the next stop going up is floor 16.',
        visualType: 'NumberLine-Successor'
    },
    {
        word: 'Predecessor',
        def: 'The number that comes immediately before a particular number. Found by subtracting 1.',
        icon: '⏮️',
        example: 'The predecessor of $10$ is $10 - 1 = 9$. Note: $1$ has no predecessor in $\\mathbb{N}$.',
        realLifeExample: 'Counting down a rocket launch: 10, 9, 8... each number is the predecessor of the one before it.',
        visualType: 'NumberLine-Predecessor'
    }
];

export const FIVE_RULES = [
    {
        name: 'Closure Property (Addition & Multiplication)',
        desc: 'When you add or multiply any two natural numbers, the result is ALWAYS another natural number.',
        formula: 'If $a, b \\in \\mathbb{N}$, then $(a + b) \\in \\mathbb{N}$ and $(a \\times b) \\in \\mathbb{N}$.'
    },
    {
        name: 'Commutative Property',
        desc: 'Changing the order of the numbers in addition or multiplication does not change the result.',
        formula: '$a + b = b + a$  and  $a \\times b = b \\times a$'
    },
    {
        name: 'Associative Property',
        desc: 'Changing the grouping of the numbers does not change the result in addition and multiplication.',
        formula: '$(a + b) + c = a + (b + c)$'
    },
    {
        name: 'Multiplicative Identity',
        desc: 'When any natural number is multiplied by 1, the number remains unchanged. (1 is the identity).',
        formula: '$a \\times 1 = a$'
    },
    {
        name: 'Distributive Property',
        desc: 'Multiplying a number by a sum is the same as doing each multiplication separately.',
        formula: '$a \\times (b + c) = (a \\times b) + (a \\times c)$'
    }
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: 'What is the successor of 99?',
        options: ['98', '100', '1', '99.1'],
        correct: 1
    },
    {
        id: 2,
        q: 'Which of the following is NOT a Natural Number?',
        options: ['1', '500', '0', '7'],
        correct: 2
    },
    {
        id: 3,
        q: 'Which property tells us that (3 + 4) + 5 = 3 + (4 + 5)?',
        options: ['Commutative', 'Associative', 'Identity', 'Closure'],
        correct: 1
    },
    {
        id: 4,
        q: 'Is the sum of two odd numbers an even number or an odd number?',
        options: ['Even', 'Odd', 'It depends', 'Neither'],
        correct: 0
    }
];

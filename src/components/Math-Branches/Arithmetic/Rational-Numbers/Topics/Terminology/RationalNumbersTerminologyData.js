export const TERMS = [
    {
        word: 'Rational Number (ℚ)',
        def: 'Any number that can be expressed as the quotient or fraction $p/q$ of two integers, a numerator $p$ and a non-zero denominator $q$.',
        icon: '➗',
        example: '$\\mathbb{Q}$ includes $0.5$ (which is $1/2$), $-7$ (which is $-7/1$), and $2.25$ (which is $9/4$).',
        realLifeExample: 'Splitting a bill equally among friends — if 3 people share ₹100, each pays ₹33.33... (repeating), which is still rational.',
        visualType: 'NumberLine-Rational'
    },
    {
        word: 'Quotient',
        def: 'The result or answer of dividing one number by another.',
        icon: '🧮',
        example: 'In $10 \\div 2 = 5$, the quotient is $5$.',
        realLifeExample: 'Distributing 10 candies equally among 2 children — each child gets 5 candies (the quotient).',
        visualType: 'NumberLine-Quotient'
    },
    {
        word: 'Terminating Decimal',
        def: 'A decimal number that ends or stops. It has a finite number of digits after the decimal point. All terminating decimals are rational.',
        icon: '🛑',
        example: '$0.75$, $12.5$, and $-0.1234$',
        realLifeExample: 'Measuring your height as 1.65 meters — the measurement stops at a definite value.',
        visualType: 'NumberLine-Terminating'
    },
    {
        word: 'Repeating Decimal',
        def: 'A decimal number that has a digit (or block of digits) that repeats infinitely. All repeating decimals are rational numbers!',
        icon: '♾️',
        example: '$0.3333\\dots$ (which is $1/3$) or $0.\\overline{142857}$',
        realLifeExample: 'Dividing a cake among 3 people — each gets 0.333... of the cake, a pattern that never ends but always repeats.',
        visualType: 'NumberLine-Repeating'
    },
    {
        word: 'Percentage',
        def: 'A number or ratio expressed as a fraction of 100. It is just another way to write a rational number.',
        icon: '💯',
        example: '$50\\%$ is the same as $50/100$ or $0.5$ or $1/2$.',
        realLifeExample: 'A shop offering a 25% discount means you pay 75 out of every 100 rupees — a direct ratio of 100.',
        visualType: 'NumberLine-Percentage'
    },
    {
        word: 'Reciprocal',
        def: 'The flipped version of a fraction. You swap the numerator and the denominator.',
        icon: '🔄',
        example: 'The reciprocal of $\\frac{2}{3}$ is $\\frac{3}{2}$.',
        realLifeExample: 'If a car travels 2/3 of a km per minute, its reciprocal (3/2) tells you the minutes needed per km.',
        visualType: 'NumberLine-Reciprocal'
    }
];

export const FIVE_RULES = [
    {
        name: 'Fraction to Decimal Conversion',
        desc: 'To convert any fraction straight to a decimal, simply divide the top number by the bottom number.',
        formula: '\\frac{3}{4} \\Rightarrow 3 \\div 4 = 0.75'
    },
    {
        name: 'Decimal to Fraction Conversion',
        desc: 'Write the decimal digits over their place value (10, 100, 1000...) and then simplify.',
        formula: '0.65 = \\frac{65}{100} = \\frac{13}{20}'
    },
    {
        name: 'Percentage to Decimal',
        desc: 'To convert a percent to a decimal, divide by 100 (move the decimal point two places to the left).',
        formula: '42\\% = 42 \\div 100 = 0.42'
    },
    {
        name: 'Decimal to Percentage',
        desc: 'To convert a decimal to a percent, multiply by 100 (move the decimal point two places to the right).',
        formula: '0.125 = 0.125 \\times 100 = 12.5\\%'
    },
    {
        name: 'Irrational Test',
        desc: 'If a decimal goes on forever without EVER repeating a pattern, it is IRRATIONAL (like $\\pi$). Operations spanning these kinds of boundaries are no longer strictly in $\\mathbb{Q}$.',
        formula: '3.14159265... \\notin \\mathbb{Q}'
    }
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: 'Which of the following is NOT a rational number format?',
        options: ['Repeating Decimal', 'Terminating Decimal', 'Infinite Non-repeating Decimal', 'Percentage'],
        correct: 2
    },
    {
        id: 2,
        q: 'How do you turn 3/5 into a decimal?',
        options: ['Divide 5 by 3', 'Divide 3 by 5', 'Multiply 3 and 5', 'Add 3 and 5'],
        correct: 1
    },
    {
        id: 3,
        q: 'What is 0.25 written as a percentage?',
        options: ['2.5%', '250%', '0.25%', '25%'],
        correct: 3
    },
    {
        id: 4,
        q: 'What is the reciprocal of 5?',
        options: ['-5', '0.5', '1/5', '1'],
        correct: 2
    }
];

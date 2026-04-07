export const TERMS = [
    {
        word: 'Integers (ℤ)',
        def: 'The set of all whole numbers, both positive and negative, including zero. They do not have fractional or decimal parts.',
        icon: '🔢',
        example: '$\\mathbb{Z} = \\{\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots\\}$',
        realLifeExample: 'Temperatures on a thermometer, including below-zero freezing days (e.g., -5°C) and warm days (e.g., 25°C).',
        visualType: 'NumberLine-Full'
    },
    {
        word: 'Positive Integers',
        def: 'Integers that are strictly greater than zero.',
        icon: '📈',
        example: '$1, 2, 3, 4, 100, \\dots$',
        realLifeExample: 'Depositing money into your bank account or gaining altitude while climbing a mountain.',
        visualType: 'NumberLine-Positive'
    },
    {
        word: 'Negative Integers',
        def: 'Integers that are strictly less than zero. They always feature a minus sign (−).',
        icon: '📉',
        example: '$-1, -2, -3, -100, \\dots$',
        realLifeExample: 'Oving debt to someone (-$50), or measuring a submarine diving below sea level (-100 meters).',
        visualType: 'NumberLine-Negative'
    },
    {
        word: 'Zero (0)',
        def: 'An integer that represents the absence of quantity or a neutral point on the number line. It is neither positive nor negative.',
        icon: '⚖️',
        example: 'The origin point on a coordinate map: $(0, 0)$',
        realLifeExample: 'Exactly sea level, or having absolutely no debt nor savings.',
        visualType: 'NumberLine-Zero'
    },
    {
        word: 'Absolute Value',
        def: 'The distance of a number from zero on the number line, regardless of its direction. It is always non-negative.',
        icon: '📏',
        example: '$|-5| = 5$  and  $|5| = 5$',
        realLifeExample: 'Walking 5 blocks North or 5 blocks South — regardless of direction, you still physically walked 5 blocks of distance.',
        visualType: 'NumberLine-Absolute'
    },
    {
        word: 'Opposite Numbers',
        def: 'Two numbers that are the same distance from zero but on opposite sides of the number line.',
        icon: '🔄',
        example: '$7$ and $-7$ are opposite numbers.',
        realLifeExample: 'Gaining 10 yards on a football play vs losing 10 yards on the next play.',
        visualType: 'NumberLine-Opposite'
    }
];

export const FIVE_RULES = [
    {
        name: 'Adding Integers with Same Signs',
        desc: 'If the signs are the same, ADD their absolute values and keep the same sign.',
        formula: 'Pos + Pos = Pos \\\n Neg + Neg = Neg'
    },
    {
        name: 'Adding Integers with Different Signs',
        desc: 'If the signs are different, SUBTRACT their absolute values. The answer takes the sign of the number with the larger absolute value.',
        formula: '$-8 + 5 = -3$ \\\n $10 + (-4) = 6$'
    },
    {
        name: 'Subtracting Integers (Add the Opposite)',
        desc: 'To subtract an integer, add its opposite. This is often remembered as "Keep-Change-Change".',
        formula: '$a - b = a + (-b)$ \\\n $5 - (-3) = 5 + 3 = 8$'
    },
    {
        name: 'Multiplying/Dividing Integers (Same Signs)',
        desc: 'When multiplying or dividing two integers with the same sign, the answer is ALWAYS positive.',
        formula: 'Pos × Pos = Pos \\\n Neg × Neg = Pos'
    },
    {
        name: 'Multiplying/Dividing Integers (Different Signs)',
        desc: 'When multiplying or dividing two integers with different signs, the answer is ALWAYS negative.',
        formula: 'Pos × Neg = Neg \\\n Neg ÷ Pos = Neg'
    }
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: 'Which of these is NEITHER positive nor negative?',
        options: ['1', '-1', '0', '0.5'],
        correct: 2
    },
    {
        id: 2,
        q: 'What is the absolute value of -42? (|-42|)',
        options: ['-42', '42', '0', '-1'],
        correct: 1
    },
    {
        id: 3,
        q: 'When you multiply two negative integers, the result is:',
        options: ['Always Negative', 'Always Positive', 'Sometimes Positive', 'Zero'],
        correct: 1
    },
    {
        id: 4,
        q: 'What happens when you subtract a negative number? ($5 - (-3)$)',
        options: ['It remains negative', 'It becomes addition ($5+3$)', 'It equals zero', 'None of the above'],
        correct: 1
    }
];

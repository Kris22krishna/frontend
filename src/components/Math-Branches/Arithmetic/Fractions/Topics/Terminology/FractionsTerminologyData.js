export const TERMS = [
    {
        word: 'Fraction',
        def: 'A number that represents a part of a whole or a proportion. It is written as a numerator over a denominator.',
        icon: '🍕',
        example: '$\\frac{3}{4}$ represents three pieces out of four equal parts.',
        realLifeExample: 'Cutting a pizza into 4 equal slices and eating 3 of them — you ate ¾ of the pizza!',
        visualType: 'Spark-FractionSharing'
    },
    {
        word: 'Numerator',
        def: 'The top number in a fraction. It shows how many parts we have.',
        icon: '⬆️',
        example: 'In $\\frac{5}{8}$, the numerator is $5$.',
        realLifeExample: 'If you colored 5 tiles out of 8 on a wall, the 5 colored tiles represent the numerator.',
        visualType: 'FractionBar-Numerator'
    },
    {
        word: 'Denominator',
        def: 'The bottom number in a fraction. It shows the total number of equal parts the whole is divided into. It cannot be zero!',
        icon: '⬇️',
        example: 'In $\\frac{5}{8}$, the denominator is $8$.',
        realLifeExample: 'A chocolate bar broken into 8 equal pieces — the 8 is your denominator (total pieces).',
        visualType: 'FractionBar-Denominator'
    },
    {
        word: 'Proper Fraction',
        def: 'A fraction where the numerator is strictly less than the denominator. Its value is always less than 1.',
        icon: '✅',
        example: '$\\frac{1}{2}, \\frac{7}{10}, \\frac{99}{100}$',
        realLifeExample: 'Drinking half a glass of water — you consumed ½, which is less than the whole glass.',
        visualType: 'FractionBar-Proper'
    },
    {
        word: 'Improper Fraction',
        def: 'A fraction where the numerator is equal to or strictly greater than the denominator. Its value is 1 or more.',
        icon: '⚠️',
        example: '$\\frac{5}{4}, \\frac{8}{8}, \\frac{10}{3}$',
        realLifeExample: 'Eating 5 slices when the pizza only had 4 — you ate more than one whole pizza (5/4)!',
        visualType: 'FractionBar-Improper'
    },
    {
        word: 'Mixed Number (Mixed Fraction)',
        def: 'A number consisting of a whole integer and a proper fraction together.',
        icon: '🧱',
        example: '$1\\frac{1}{4}$ which is the same as $\\frac{5}{4}$.',
        realLifeExample: 'Running 1 full lap and then ¼ of another lap around a track — that is 1¼ laps total.',
        visualType: 'FractionBar-Mixed'
    },
    {
        word: 'Equivalent Fractions',
        def: 'Different fractions that name the exact same amount or value.',
        icon: '⚖️',
        example: '$\\frac{1}{2} = \\frac{2}{4} = \\frac{5}{10}$',
        realLifeExample: 'Half a cake is the same whether you cut it into 2 pieces (1/2), 4 pieces (2/4), or 10 pieces (5/10).',
        visualType: 'NumberLine-Equivalent'
    }
];

export const FIVE_RULES = [
    {
        name: 'Adding & Subtracting (Same Denominators)',
        desc: 'If the denominators are the same, just add or subtract the numerators. Keep the denominator the exact same.',
        formula: '\\frac{a}{c} + \\frac{b}{c} = \\frac{a+b}{c}'
    },
    {
        name: 'Adding & Subtracting (Different Denominators)',
        desc: 'You CANNOT add or subtract until you find a Common Denominator. Find the Least Common Multiple (LCM) of the denominators first.',
        formula: '\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}'
    },
    {
        name: 'Multiplying Fractions',
        desc: 'Multiply the numerators straight across. Then multiply the denominators straight across.',
        formula: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}'
    },
    {
        name: 'Dividing Fractions (Keep-Change-Flip)',
        desc: 'Keep the first fraction, change division to multiplication, and flip (find the reciprocal of) the second fraction.',
        formula: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}'
    },
    {
        name: 'Simplifying Fractions',
        desc: 'Divide both the top and bottom by their Greatest Common Factor (GCF) to put the fraction in its most basic form.',
        formula: '\\frac{8}{12} = \\frac{8 \\div 4}{12 \\div 4} = \\frac{2}{3}'
    }
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: 'Which part of the fraction tells you how many pieces the whole is cut into?',
        options: ['Numerator', 'Denominator', 'Vinculum', 'Integer'],
        correct: 1
    },
    {
        id: 2,
        q: 'Identify the Improper Fraction:',
        options: ['1/4', '7/8', '9/5', '10/11'],
        correct: 2
    },
    {
        id: 3,
        q: 'What is the first step to multiply two fractions?',
        options: ['Find a common denominator', 'Multiply numerators straight across', 'Flip the second fraction', 'Add the tops'],
        correct: 1
    },
    {
        id: 4,
        q: 'Which fraction is equivalent to 1/3?',
        options: ['2/3', '3/6', '2/6', '4/9'],
        correct: 2
    }
];

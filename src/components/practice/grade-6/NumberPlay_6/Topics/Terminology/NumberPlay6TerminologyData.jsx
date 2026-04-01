export const TERMS = [
    {
        name: 'Palindrome',
        icon: '🔁',
        color: '#7c3aed',
        def: 'A number that reads exactly the same forwards and backwards. Reversing its digits does not change its value.',
        memory: 'Think of words like "RACECAR", but for numbers!',
        examples: ['121', '4554', '12321'],
        inUse: 'Wait until the clock hits 12:21 to see a palindromic time!',
        svg: `<svg width="200" height="60" viewBox="0 0 200 60"><text x="100" y="40" font-size="28" font-weight="900" fill="#7c3aed" text-anchor="middle" letter-spacing="8">34743</text><path d="M 50 50 Q 100 70 150 50" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="4,4"/><path d="M 152 50 L 145 45 L 145 55 Z" fill="#7c3aed"/><path d="M 48 50 L 55 45 L 55 55 Z" fill="#7c3aed"/></svg>`
    },
    {
        name: "Kaprekar's Constant",
        icon: '🔢',
        color: '#0891b2',
        def: 'The mysterious number 6174. Discovered by D.R. Kaprekar, it is the ultimate destination when you repeatedly sort and subtract the digits of almost any 4-digit number.',
        memory: 'The ultimate number sinkhole—all 4-digit paths lead to 6174!',
        examples: ['6174'],
        inUse: 'Sort descending minus sort ascending: 8532 - 2358 = 6174!',
        svg: `<svg width="200" height="60" viewBox="0 0 200 60"><rect x="60" y="10" width="80" height="40" rx="10" fill="none" stroke="#0891b2" stroke-width="3"/><text x="100" y="38" font-size="22" font-weight="900" fill="#0891b2" text-anchor="middle">6174</text></svg>`
    },
    {
        name: 'Magic Square',
        icon: '🟩',
        color: '#dc2626',
        def: 'A square grid of numbers where the sum of every row, every column, and both main diagonals is exactly the same constant value.',
        memory: 'Horizontal, Vertical, Diagonal — They all sum to the same Magic Number!',
        examples: ['Lo Shu Square (3x3)'],
        inUse: 'A 3x3 Magic Square made of numbers 1-9 always sums to 15 in any direction.',
        svg: `<svg width="200" height="60" viewBox="0 0 200 60"><rect x="80" y="10" width="40" height="40" fill="none" stroke="#dc2626" stroke-width="2"/><line x1="80" y1="23" x2="120" y2="23" stroke="#dc2626" stroke-width="1"/><line x1="80" y1="36" x2="120" y2="36" stroke="#dc2626" stroke-width="1"/><line x1="93" y1="10" x2="93" y2="50" stroke="#dc2626" stroke-width="1"/><line x1="106" y1="10" x2="106" y2="50" stroke="#dc2626" stroke-width="1"/><text x="150" y="35" font-size="14" font-weight="bold" fill="#dc2626">= Sum</text></svg>`
    },
    {
        name: 'Digit Sum (Digital Root)',
        icon: '➕',
        color: '#059669',
        def: 'The value obtained by adding all the individual digits of a number together. If the result has multiple digits, you can keep adding them until you get a single digit (Digital Root).',
        memory: 'Just break the number apart and add the pieces!',
        examples: ['Digit sum of 145 = 1 + 4 + 5 = 10'],
        inUse: 'Useful for checking if a number is divisible by 3 or 9.',
        svg: `<svg width="260" height="60" viewBox="0 0 260 60"><text x="60" y="35" font-size="16" font-weight="bold" fill="#059669">456</text><path d="M 90 30 L 110 30" stroke="#059669" stroke-width="2"/><polygon points="110,25 120,30 110,35" fill="#059669"/><text x="130" y="35" font-size="16" font-weight="bold" fill="#059669">4+5+6</text></svg>`
    },
    {
        name: 'Supercell',
        icon: '🧬',
        color: '#ea580c',
        def: 'A specialized grouping of numbers within a larger pattern or grid that interact according to a hidden mathematical rule or operation.',
        memory: 'A mini-puzzle piece inside a bigger puzzle frame.',
        examples: ['KenKen cages', 'Cross-Math blocks'],
        inUse: 'To solve the grid, solve the supercells first.',
        svg: `<svg width="200" height="60" viewBox="0 0 200 60"><path d="M 80 10 L 120 10 L 120 30 L 100 30 L 100 50 L 80 50 Z" fill="rgba(234,88,12,0.2)" stroke="#ea580c" stroke-width="2"/><text x="90" y="25" font-size="12" fill="#ea580c" font-weight="bold">5+</text></svg>`
    },
    {
        name: 'Descending Order',
        icon: '📉',
        color: '#2563eb',
        def: 'Arranging digits or numbers from the largest (highest) value down to the smallest (lowest) value.',
        memory: 'Like walking down a staircase.',
        examples: ['8 5 3 1', '900, 850, 200'],
        inUse: 'Required step 1 of the Kaprekar routine: arrange digits descending.',
        svg: `<svg width="200" height="60" viewBox="0 0 200 60"><rect x="70" y="40" width="10" height="10" fill="#2563eb"/><rect x="90" y="30" width="10" height="20" fill="#2563eb"/><rect x="110" y="20" width="10" height="30" fill="#2563eb"/><rect x="130" y="10" width="10" height="40" fill="#2563eb"/><line x1="60" y1="10" x2="140" y2="50" stroke="#2563eb" stroke-width="2" stroke-dasharray="2,2"/><polygon points="140,50 135,42 145,42" fill="#2563eb" transform="rotate(-26, 140, 50)"/></svg>`
    },
    {
        name: 'Sequence',
        icon: '🛤️',
        color: '#8b5cf6',
        def: 'An ordered list of numbers where each number follows perfectly from the previous one based on a specific, unbroken rule.',
        memory: 'A train where every carriage follows the same track rule.',
        examples: ['2, 4, 6, 8 (add 2)'],
        inUse: 'Fibonacci is a sequence where you add the last two numbers together.',
        svg: `<svg width="200" height="60" viewBox="0 0 200 60"><circle cx="60" cy="30" r="10" fill="#8b5cf6"/><circle cx="100" cy="30" r="10" fill="#8b5cf6"/><circle cx="140" cy="30" r="10" fill="#8b5cf6"/><path d="M 60 15 Q 80 0 100 15" fill="none" stroke="#8b5cf6" stroke-width="2"/><polygon points="100,15 95,8 105,8" fill="#8b5cf6" transform="rotate(20 100 15)"/><path d="M 100 15 Q 120 0 140 15" fill="none" stroke="#8b5cf6" stroke-width="2"/><polygon points="140,15 135,8 145,8" fill="#8b5cf6" transform="rotate(20 140 15)"/></svg>`
    },
    {
        name: 'Cyclic Pattern',
        icon: '🎡',
        color: '#db2777',
        def: 'A mathematical sequence or outcome that eventually repeats itself in the exact same loop forever.',
        memory: 'Like a Ferris wheel passing the same spot over and over.',
        examples: ['Decimals like 0.333...', '4-digit Kaprekar loops'],
        inUse: 'If a puzzle hits a cyclic pattern, you know exactly what comes next infinitely.',
        svg: `<svg width="200" height="60" viewBox="0 0 200 60"><path d="M 100 15 A 15 15 0 1 1 85 30" fill="none" stroke="#db2777" stroke-width="2"/><polygon points="85,30 80,22 90,22" fill="#db2777" transform="rotate(-45 85 30)"/><path d="M 100 45 A 15 15 0 1 1 115 30" fill="none" stroke="#db2777" stroke-width="2"/><polygon points="115,30 110,38 120,38" fill="#db2777" transform="rotate(135 115 30)"/></svg>`
    }
];

export const FOUR_RULES = [
    {
        title: 'The Palindrome Rule',
        num: 'P',
        emoji: '🔁',
        color: '#7c3aed',
        rule: 'To check a palindrome, reverse the digits. If it equals the original number, it is perfectly palindromic.',
        detail: 'Palindromes show up not just in language but as beautiful numerical symmetries. Many numbers can be turned into palindromes through repeated reverse-and-add steps!',
        tip: 'If the first and last digits don\'t match, don\'t bother checking the middle — it\'s not a palindrome.',
        examples: ['Is 1441 a palindrome? Reverse it: 1441. Yes!', 'Is 908 a palindrome? Reverse it: 809. No!'],
        svg: `<svg width="280" height="60" viewBox="0 0 280 60"><text x="140" y="40" text-anchor="middle" font-size="28" font-weight="900" fill="#7c3aed" letter-spacing="10">8118</text></svg>`
    },
    {
        title: 'The Kaprekar Routine',
        num: 'K',
        emoji: '🔢',
        color: '#0891b2',
        rule: 'Sort descending, sort ascending, subtract. REPEAT.',
        detail: 'Take a $4$-digit number (with at least two different digits). Sort its digits from highest to lowest. Sort them from lowest to highest. Subtract the smaller from the larger. Within $7$ tries, you will hit $6174$!',
        tip: 'If your subtraction results in fewer than 4 digits, pad it with leading zeros (e.g. 999 becomes 0999).',
        examples: ['Start with 3141: 4311 - 1134 = 3177', 'Next: 7731 - 1377 = 6354'],
        svg: `<svg width="280" height="60" viewBox="0 0 280 60"><text x="80" y="35" font-size="16" font-weight="bold" fill="#0891b2">4311</text><text x="130" y="35" font-size="16" font-weight="bold" fill="#0891b2">-</text><text x="155" y="35" font-size="16" font-weight="bold" fill="#0891b2">1134</text><path d="M 200 30 L 220 30" stroke="#0891b2" stroke-width="2"/><polygon points="220,25 230,30 220,35" fill="#0891b2"/><text x="250" y="35" font-size="16" font-weight="bold" fill="#0891b2">3177</text></svg>`
    },
    {
        title: 'The Magic Sum Rule',
        num: 'M',
        emoji: '🟩',
        color: '#dc2626',
        rule: 'Every complete row, column, and diagonal must total the identical sum.',
        detail: 'In a Magic Square, no numbers can repeat. The specific sum that everything adds up to is called the "Magic Constant". To solve incomplete squares, look for rows or columns missing only one cell.',
        tip: 'For a $3\\times3$ magic square using digits 1-9, the center cell must always be 5, and the magic sum is always 15.',
        examples: ['Row: 8 + 1 + 6 = 15', 'Diagonal: 8 + 5 + 2 = 15'],
        svg: `<svg width="280" height="60" viewBox="0 0 280 60"><rect x="120" y="10" width="40" height="40" fill="none" stroke="#dc2626" stroke-width="2"/><text x="140" y="35" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">5</text></svg>`
    },
    {
        title: 'The Pattern Rule',
        num: 'S',
        emoji: '🛤️',
        color: '#8b5cf6',
        rule: 'To identify a sequence, find the exact mathematical operation connecting adjacent terms.',
        detail: 'Number patterns can grow by addition (Arithmetic), multiplication (Geometric), or more complex combinations. Find the difference or ratio between the first few terms to decode the rule.',
        tip: 'If $+2$ works for the first step but not the second, try looking for alternating patterns or multiplication!',
        examples: ['Sequence: 3, 6, 12, 24 -> Rule: Multiply by 2', 'Sequence: 10, 7, 4, 1 -> Rule: Subtract 3'],
        svg: `<svg width="280" height="60" viewBox="0 0 280 60"><text x="60" y="35" font-size="16" fill="#8b5cf6" font-weight="bold">3</text><text x="120" y="35" font-size="16" fill="#8b5cf6" font-weight="bold">6</text><text x="180" y="35" font-size="16" fill="#8b5cf6" font-weight="bold">12</text><path d="M 70 25 Q 95 10 115 25" fill="none" stroke="#8b5cf6" stroke-width="1.5"/><text x="92" y="15" font-size="10" fill="#8b5cf6">x2</text><path d="M 130 25 Q 155 10 175 25" fill="none" stroke="#8b5cf6" stroke-width="1.5"/><text x="152" y="15" font-size="10" fill="#8b5cf6">x2</text></svg>`
    },
    {
        title: 'Digit Root Condensation',
        num: 'R',
        emoji: '➕',
        color: '#059669',
        rule: 'Sum all digits repeatedly until a single digit $1-9$ remains.',
        detail: 'The Digital Root is a single-digit condensation of any large number. Interestingly, any number that is divisible by 9 will always have a digital root of exactly 9!',
        tip: 'When calculating a digital root, you can "cast out nines" (ignore any 9s or digits that sum to 9) to calculate much faster!',
        examples: ['Root of 456 -> 4+5+6 = 15 -> 1+5 = 6', 'Root of 912 -> Ignore 9 -> 1+2 = 3'],
        svg: `<svg width="280" height="60" viewBox="0 0 280 60"><text x="140" y="35" font-size="20" font-weight="bold" fill="#059669" text-anchor="middle">456 &rarr; 15 &rarr; 6</text></svg>`
    }
];

export const VOCAB_QUIZ = [
    {
        question: 'Which of these numbers is a perfect **Palindrome**?',
        options: ['1044', '87678', '9989', '1234'],
        correct: 1,
        explanation: '87678 reads exactly the same backwards as it does forwards.'
    },
    {
        question: 'What is the sum of any single row in a standard 3x3 **Magic Square** containing digits 1-9?',
        options: ['12', '15', '18', '21'],
        correct: 1,
        explanation: 'The magic constant for a standard 3x3 Magic Square is always 15.'
    },
    {
        question: 'What famous magic constant is reached by sorting digits descending, then ascending, and subtracting?',
        options: ['6174', '1089', '495', '1331'],
        correct: 0,
        explanation: '6174 is Kaprekar\'s constant for 4-digit numbers.'
    },
    {
        question: 'What is the **Digital Root** of 791?',
        options: ['17', '7', '8', '9'],
        correct: 2,
        explanation: '7 + 9 + 1 = 17. Then 1 + 7 = 8. (Or cast out 9: 7 + 1 = 8).'
    },
    {
        question: 'If you arrange the digits 4, 1, 9, 5 in **descending order**, what number do you get?',
        options: ['1459', '9541', '9415', '9514'],
        correct: 1,
        explanation: 'Descending order means largest to smallest: 9, then 5, then 4, then 1 (9541).'
    },
    {
        question: 'A repeating cycle in a number pattern is called a:',
        options: ['Palindrome', 'Supercell', 'Cyclic Pattern', 'Digital Root'],
        correct: 2,
        explanation: 'A Cyclic Pattern is a sequence that loops and repeats forever.'
    },
    {
        question: 'In a grid puzzle, what do we call a small region with a hidden mathematical rule?',
        options: ['Supercell', 'Magic Square', 'Palindrome', 'Sequence'],
        correct: 0,
        explanation: 'A Supercell is a specialized block inside a grid puzzle containing its own internal rule.'
    },
    {
        question: 'What rule describes the sequence: 5, 10, 20, 40?',
        options: ['Add 5', 'Multiply by 2', 'Add 15', 'Square the number'],
        correct: 1,
        explanation: 'Each term is accurately generated by multiplying the previous term by 2.'
    },
    {
        question: 'What is the FIRST step of the Kaprekar routine?',
        options: ['Reverse the digits', 'Add the digits', 'Sort digits in descending order', 'Square the number'],
        correct: 2,
        explanation: 'The routine strictly begins by sorting the digits from largest to smallest (descending).'
    },
    {
        question: 'Which of the following describes a number whose digits total a specific value when added?',
        options: ['Palindrome', 'Sequence', 'Kaprekar Constant', 'Digit Sum'],
        correct: 3,
        explanation: 'The Digit Sum is the total you get when you add a number\'s individual digits together.'
    }
];

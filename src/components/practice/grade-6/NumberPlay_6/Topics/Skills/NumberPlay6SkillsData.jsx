import {
    generateNumbersDailyLifeQuestions,
    generateNumberLinePatternsQuestions,
    generateSupercellsQuestions,
    generatePalindromicQuestions,
    generateKaprekarQuestions,
    generateNumberGamesQuestions
} from './numberPlayQuestions.jsx';

export const SKILLS = [
    {
        id: 'numbers-daily-life',
        title: 'Numbers in Daily Life',
        subtitle: 'Skill 1',
        icon: '🌍',
        color: '#6366f1',
        desc: 'Spot and analyze numbers in the wild—from bar codes to calendar grid logic.',
        practice: generateNumbersDailyLifeQuestions,
        assessment: generateNumbersDailyLifeQuestions,
        learn: {
            concept: 'Numbers are embedded in everything we do.',
            rules: [
                { title: 'The Base-10 World', f: '10^x', d: 'Our standard number system operates on powers of 10. Every position is worth exactly ten times the spot to its right.', ex: '345 = 300 + 40 + 5', tip: 'Count the zeros!' },
                { title: 'Information Codes', f: '\\text{Digits}', d: 'Numbers are often used not for math, but as unique identifiers—like zip codes, ISBN numbers, or barcodes.', ex: 'PIN: 1234', tip: 'Not all numbers are meant to be added together.' },
            ]
        }
    },
    {
        id: 'patterns-number-line',
        title: 'Patterns on the Number Line',
        subtitle: 'Skill 2',
        icon: '📈',
        color: '#0891b2',
        desc: 'Decode algebraic sequences, skips, leaps, and repeating loops.',
        practice: generateNumberLinePatternsQuestions,
        assessment: generateNumberLinePatternsQuestions,
        learn: {
            concept: 'A sequence is just numbers following a strict law.',
            rules: [
                { title: 'Arithmetic Jumps', f: '+n', d: 'Adding or subtracting the exact same amount every step.', ex: '3, 6, 9, 12... (Rule: +3)', tip: 'Find the uniform gap.' },
                { title: 'Geometric Bounds', f: '\\times n', d: 'Multiplying by the exact same amount each step. These sequences grow extremely fast!', ex: '2, 4, 8, 16... (Rule: x2)', tip: 'Look for rapid, explosive growth.' },
            ]
        }
    },
    {
        id: 'supercells-number-puzzles',
        title: 'Supercells & Puzzles',
        subtitle: 'Skill 3',
        icon: '🧩',
        color: '#f59e0b',
        desc: 'Master Kakuro, KenKen cages, and Magic Square segments.',
        practice: generateSupercellsQuestions,
        assessment: generateSupercellsQuestions,
        learn: {
            concept: 'Grids hold hidden sums and isolated puzzle cells.',
            rules: [
                { title: 'The Magic Constant', f: '\\text{Target}', d: 'In a Magic Square, every full line (row/col/diag) adds up to one constant amount.', ex: 'A $3\\times3$ (1-9) square always sums to 15.', tip: 'Use completed rows to find the secret sum first.' },
                { title: 'Supercell Cages', f: 'A \\circ B', d: 'In cage puzzles (like KenKen), heavily outlined groups specify a target number and an operation (+, -, x, /).', ex: 'A cage labeled "5+" means the cells sum to 5.', tip: 'Rule out impossible number combos!' },
            ]
        }
    },
    {
        id: 'palindromic-numbers',
        title: 'Palindromes & Reversals',
        subtitle: 'Skill 4',
        icon: '🔁',
        color: '#db2777',
        desc: 'Explore symmetrical digits and the mystical "Reverse and Add" algorithm.',
        practice: generatePalindromicQuestions,
        assessment: generatePalindromicQuestions,
        learn: {
            concept: 'Symmetry occurs when a value mirrors itself perfectly.',
            rules: [
                { title: 'The Palindrome Test', f: 'x = \\text{rev}(x)', d: 'To verify a palindrome, flip every digit. If the new value perfectly matches the original, you found one!', ex: '4,554 backwards is 4,554.', tip: 'Check the far ends first.' },
                { title: 'Reverse and Add', f: 'x + \\text{rev}(x)', d: 'Take a non-palindrome. Reverse it. Add them together. You often get a palindrome!', ex: '52 + 25 = 77 (Palindrome!)', tip: 'Sometimes it takes multiple tries, like the number 89.' },
            ]
        }
    },
    {
        id: 'kaprekar-constant',
        title: "Kaprekar's Constant",
        subtitle: 'Skill 5',
        icon: '🔢',
        color: '#10b981',
        desc: 'Execute Kaprekar’s routine to fall into the 6174 gravity well.',
        practice: generateKaprekarQuestions,
        assessment: generateKaprekarQuestions,
        learn: {
            concept: '6174 is a mathematical black hole for 4-digit numbers.',
            rules: [
                { title: 'The Sort & Subtract Routine', f: 'D - A = K', d: 'Take a 4-digit number (digits cannot be all identical). Sort it into Descending, then Ascending order. Subtract. Repeat.', ex: '4321 - 1234 = 3087', tip: 'Keep repeating with the answer!' },
                { title: 'Padding with Zero', f: '0XYZ', d: 'If your subtraction gives you a 3-digit number (like 999), you must treat it as a 4-digit number by adding a leading zero (0999) before sorting again.', ex: '999 \\rightarrow 0999', tip: 'Always maintain 4 digits.' },
            ]
        }
    },
    {
        id: 'number-games-strategies',
        title: 'Number Games & Strategy',
        subtitle: 'Skill 6',
        icon: '🎲',
        color: '#8b5cf6',
        desc: 'Discover Nim, digit roots, parity (odd/even), and winning game logic.',
        practice: generateNumberGamesQuestions,
        assessment: generateNumberGamesQuestions,
        learn: {
            concept: 'Math isn\'t just calculation; it\'s the language of strategy.',
            rules: [
                { title: 'Digit Sum (Root)', f: '\\Sigma(d)', d: 'Keep adding the digits together until only a single digit remains. This reveals hidden properties like divisibility by 9.', ex: '456 \\rightarrow 15 \\rightarrow 6', tip: 'You can ignore (cross out) any 9s to speed this up!' },
                { title: 'Parity Control', f: '\\text{odd/even}', d: 'In games like Nim or coin-taking, controlling whether the remaining pool is Odd or Even guarantees victory.', ex: 'Odd + Odd = Even', tip: 'Always think about your opponent\'s forced move.' },
            ]
        }
    }
];

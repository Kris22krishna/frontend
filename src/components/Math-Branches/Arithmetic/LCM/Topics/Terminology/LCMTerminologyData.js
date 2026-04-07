export const TERMS = [
    { word: 'Multiple', def: 'The result of multiplying a number by any integer. For example, multiples of 5 are 5, 10, 15, 20, 25, ...', icon: '✖️', example: 'Multiples of 3: $3, 6, 9, 12, 15, 18...$', realLifeExample: 'A bus arrives every 3 minutes — 3, 6, 9, 12... those arrival times are multiples of 3.', visualType: 'NumberLine-Multiples' },
    { word: 'Common Multiple', def: 'A number that is a multiple of two or more numbers simultaneously.', icon: '🤝', example: 'Common multiples of 4 and 6: $12, 24, 36...$', realLifeExample: 'Two traffic lights blink every 4 and 6 seconds — they both blink together at 12 seconds (a common multiple).', visualType: 'NumberLine-CommonMultiple' },
    { word: 'Least Common Multiple (LCM)', def: 'The smallest positive common multiple of two or more numbers.', icon: '⭐', example: '$\\text{LCM}(4, 6) = 12$', realLifeExample: 'Two joggers lap a track every 4 and 6 minutes — they meet at the start together after 12 minutes (the LCM).', visualType: 'LShape-LCM' },
    { word: 'Prime Factorization', def: 'Breaking down a number into the product of its prime factors.', icon: '🌳', example: '$60 = 2^2 \\times 3 \\times 5$', realLifeExample: 'Decomposing a 60-piece LEGO set into its basic brick types — each prime is a fundamental "brick size."', visualType: 'FactorTree-LCM' },
    { word: 'Common Denominator', def: 'A shared denominator used when adding or subtracting fractions. It is typically the LCM of the original denominators.', icon: '➕', example: 'To add $\\frac{1}{4} + \\frac{1}{6}$, use 12 as the common denominator.', realLifeExample: 'Combining ¼ litre of milk and ⅙ litre of cream — you need a common measuring cup (12ths) to add them.', visualType: 'NumberLine-CommonDenominator' },
    { word: 'Coprime (Relatively Prime)', def: 'Two numbers that share no common factor other than 1. Their LCM is simply their product.', icon: '🔗', example: '$\\text{LCM}(7, 9) = 63$ because $\\gcd(7,9)=1$.', realLifeExample: 'Two gear wheels with 7 and 9 teeth — they share no common tooth pattern, so they mesh perfectly every 63 teeth.', visualType: 'NumberLine-Coprime' }
];

export const FIVE_RULES = [
    { name: 'Listing Method', desc: 'List multiples of each number until you find the smallest one they have in common.', formula: '\\text{Multiples of 4: } 4, 8, \\mathbf{12}... \\quad \\text{Multiples of 6: } 6, \\mathbf{12}...' },
    { name: 'Prime Factorization Method', desc: 'Find the prime factorization of each number. Take the highest power of every prime that appears.', formula: '12 = 2^2 \\times 3, \\quad 18 = 2 \\times 3^2 \\Rightarrow \\text{LCM} = 2^2 \\times 3^2 = 36' },
    { name: 'Division Method', desc: 'Write numbers side-by-side. Divide by common primes from the top down. Multiply all the divisors.', formula: '\\text{LCM} = \\text{product of all divisors used}' },
    { name: 'LCM × HCF = Product', desc: 'For any two numbers a and b: LCM(a,b) × HCF(a,b) = a × b. Very useful as a shortcut!', formula: '\\text{LCM}(a,b) = \\frac{a \\times b}{\\text{HCF}(a,b)}' },
    { name: 'Coprime Shortcut', desc: 'If two numbers share no common factors (coprime), their LCM is simply their product.', formula: '\\text{LCM}(7, 11) = 7 \\times 11 = 77' }
];

export const VOCAB_QUIZ = [
    { id: 1, q: 'What is the LCM of 3 and 5?', options: ['8', '15', '30', '1'], correct: 1 },
    { id: 2, q: 'Which method breaks a number into prime factors?', options: ['Listing Method', 'Prime Factorization', 'Cross Multiplication', 'Long Division'], correct: 1 },
    { id: 3, q: 'What is a "common multiple"?', options: ['A multiple shared by two or more numbers', 'The largest factor', 'A prime number', 'An odd number'], correct: 0 },
    { id: 4, q: 'If HCF(12, 18) = 6, what is LCM(12, 18)?', options: ['6', '36', '72', '216'], correct: 1 }
];

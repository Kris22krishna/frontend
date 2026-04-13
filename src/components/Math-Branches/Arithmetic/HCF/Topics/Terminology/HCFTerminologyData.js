export const TERMS = [
    { word: 'Factor', def: 'A number that divides another number exactly with no remainder.', icon: '🔨', example: 'Factors of 12: $1, 2, 3, 4, 6, 12$', realLifeExample: 'Arranging 12 chairs into equal rows — you can make rows of 1, 2, 3, 4, 6, or 12 chairs each.', visualType: 'NumberLine-Factors' },
    { word: 'Common Factor', def: 'A factor shared by two or more numbers.', icon: '🤝', example: 'Common factors of 12 and 18: $1, 2, 3, 6$', realLifeExample: 'Two classrooms with 12 and 18 students — you can split both into groups of 1, 2, 3, or 6 with none left over.', visualType: 'NumberLine-CommonFactor' },
    { word: 'HCF (Highest Common Factor)', def: 'The largest of all common factors of two or more numbers. Also called GCD (Greatest Common Divisor).', icon: '⭐', example: '$\\text{HCF}(12, 18) = 6$', realLifeExample: 'Cutting two ribbons of 12 cm and 18 cm into the largest equal pieces — each piece is 6 cm long (the HCF).', visualType: 'LShape-HCF' },
    { word: 'Prime Factor', def: 'A factor that is a prime number. Every number can be expressed as a product of primes.', icon: '🌳', example: '$60 = 2^2 \\times 3 \\times 5$', realLifeExample: 'Breaking down a large recipe serving 60 into its simplest base ingredients — primes are the most basic "ingredients."', visualType: 'FactorTree-HCF' },
    { word: "Euclid's Algorithm", def: 'A method to find the HCF by repeatedly dividing and taking remainders until the remainder is 0.', icon: '🔁', example: "$\\text{HCF}(48, 18)$: $48 = 2(18) + 12$, $18 = 1(12) + 6$, $12 = 2(6) + 0$. HCF = $6$.", realLifeExample: "One of the oldest algorithms in history (over 2,300 years old!), used in computer science for encryption and data compression.", visualType: 'LShape-Euclid' },
    { word: 'Coprime', def: 'Two numbers are coprime when their HCF equals 1 (they share no common factor other than 1).', icon: '🔗', example: '$\\text{HCF}(8, 15) = 1$, so 8 and 15 are coprime.', realLifeExample: 'Two clock hands completing cycles of 8 and 15 hours — they only align at hour 1 (the only shared factor).', visualType: 'NumberLine-CoprimeHCF' }
];

export const FIVE_RULES = [
    { name: 'Factor Listing Method', desc: 'List all factors of each number. Find the largest factor they share.', formula: '\\text{Factors of 12: } 1,2,3,4,6,12 \\quad \\text{Factors of 18: } 1,2,3,6,9,18 \\quad \\text{HCF}=6' },
    { name: 'Prime Factorization Method', desc: 'Decompose each number into prime factors. Take the lowest power of each shared prime.', formula: '12 = 2^2 \\times 3, \\quad 18 = 2 \\times 3^2 \\Rightarrow \\text{HCF} = 2^1 \\times 3^1 = 6' },
    { name: "Euclid's Algorithm", desc: 'Divide the larger by the smaller. Replace the larger with the remainder. Repeat until remainder = 0.', formula: '\\gcd(48, 18): 48 \\mod 18 = 12, \\quad 18 \\mod 12 = 6, \\quad 12 \\mod 6 = 0 \\Rightarrow \\text{HCF}=6' },
    { name: 'HCF × LCM = Product', desc: 'For any two numbers: HCF(a,b) × LCM(a,b) = a × b.', formula: '\\text{HCF}(a,b) = \\frac{a \\times b}{\\text{LCM}(a,b)}' },
    { name: 'HCF for Simplification', desc: 'Divide both numerator and denominator of a fraction by their HCF to simplify.', formula: '\\frac{24}{36} = \\frac{24 \\div 12}{36 \\div 12} = \\frac{2}{3}' }
];

export const VOCAB_QUIZ = [
    { id: 1, q: 'What is the HCF of 20 and 30?', options: ['5', '10', '15', '60'], correct: 1 },
    { id: 2, q: 'Which method repeatedly uses division and remainders?', options: ['Listing Method', 'Prime Factorization', "Euclid's Algorithm", 'Cross Multiply'], correct: 2 },
    { id: 3, q: 'If HCF(a, b) = 1, the numbers are called...', options: ['Prime', 'Coprime', 'Composite', 'Even'], correct: 1 },
    { id: 4, q: 'What is HCF(12, 18) × LCM(12, 18)?', options: ['6', '36', '216', '108'], correct: 2 }
];

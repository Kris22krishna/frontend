// ─── SVG Helpers for Prime Time Terminology Illustrations ─────────────────────

function drawFactorsTree(color) {
    return `<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <text x="80" y="20" font-family="sans-serif" font-weight="bold" font-size="18" fill="${color}" text-anchor="middle">12</text>
        <line x1="60" y1="25" x2="40" y2="50" stroke="${color}" stroke-width="2"/>
        <line x1="100" y1="25" x2="120" y2="50" stroke="${color}" stroke-width="2"/>
        <circle cx="40" cy="60" r="14" fill="none" stroke="${color}" stroke-width="2"/>
        <text x="40" y="65" font-family="sans-serif" font-weight="bold" font-size="14" fill="${color}" text-anchor="middle">1</text>
        <circle cx="80" cy="60" r="14" fill="none" stroke="${color}" stroke-width="2"/>
        <text x="80" y="65" font-family="sans-serif" font-weight="bold" font-size="14" fill="${color}" text-anchor="middle">2</text>
        <circle cx="120" cy="60" r="14" fill="none" stroke="${color}" stroke-width="2"/>
        <text x="120" y="65" font-family="sans-serif" font-weight="bold" font-size="14" fill="${color}" text-anchor="middle">3</text>
        <text x="80" y="95" font-family="sans-serif" font-weight="bold" font-size="12" fill="${color}" text-anchor="middle">Factors: 1, 2, 3, 4, 6, 12</text>
    </svg>`;
}

function drawMultiplesJump(color) {
    return `<svg width="200" height="80" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="55" x2="190" y2="55" stroke="${color}" stroke-width="3"/>
        ${[0,1,2,3,4,5,6].map(i => `<circle cx="${15 + i*28}" cy="55" r="4" fill="${color}"/><text x="${15 + i*28}" y="75" font-family="sans-serif" font-size="11" fill="${color}" text-anchor="middle" font-weight="bold">${i*3}</text>`).join('')}
        ${[0,1,2,3,4,5].map(i => `<path d="M ${15 + i*28} 55 Q ${29 + i*28} 28 ${43 + i*28} 55" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="4 2"/>`).join('')}
        <text x="100" y="16" font-family="sans-serif" font-weight="bold" font-size="12" fill="${color}" text-anchor="middle">Multiples of 3</text>
    </svg>`;
}

function drawPrimeCircle(color) {
    return `<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="50" r="40" fill="none" stroke="${color}" stroke-width="3"/>
        <text x="80" y="45" font-family="sans-serif" font-weight="900" font-size="32" fill="${color}" text-anchor="middle">7</text>
        <text x="80" y="65" font-family="sans-serif" font-size="11" fill="${color}" text-anchor="middle">Only 1 × 7</text>
        <text x="80" y="98" font-family="sans-serif" font-weight="bold" font-size="12" fill="${color}" text-anchor="middle">PRIME</text>
    </svg>`;
}

function drawCompositeCircle(color) {
    return `<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="10" width="100" height="65" rx="12" fill="none" stroke="${color}" stroke-width="3"/>
        <text x="80" y="45" font-family="sans-serif" font-weight="900" font-size="28" fill="${color}" text-anchor="middle">12</text>
        <text x="80" y="62" font-family="sans-serif" font-size="10" fill="${color}" text-anchor="middle">1×12, 2×6, 3×4</text>
        <text x="80" y="95" font-family="sans-serif" font-weight="bold" font-size="12" fill="${color}" text-anchor="middle">COMPOSITE</text>
    </svg>`;
}

function drawSieve(color) {
    return `<svg width="180" height="100" viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg">
        ${[2,3,5,7,11,13,17,19].map((p,i) => {
            const x = 20 + (i % 4) * 40;
            const y = 25 + Math.floor(i / 4) * 35;
            return `<circle cx="${x}" cy="${y}" r="14" fill="${color}" opacity="0.15" stroke="${color}" stroke-width="2"/><text x="${x}" y="${y + 5}" font-family="sans-serif" font-weight="bold" font-size="13" fill="${color}" text-anchor="middle">${p}</text>`;
        }).join('')}
        <text x="90" y="95" font-family="sans-serif" font-weight="bold" font-size="11" fill="${color}" text-anchor="middle">Sieve of Eratosthenes</text>
    </svg>`;
}

function drawHCF(color) {
    return `<svg width="180" height="100" viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="65" cy="50" r="40" fill="${color}" opacity="0.1" stroke="${color}" stroke-width="2"/>
        <circle cx="115" cy="50" r="40" fill="${color}" opacity="0.1" stroke="${color}" stroke-width="2"/>
        <text x="45" y="45" font-family="sans-serif" font-size="11" fill="${color}" text-anchor="middle" font-weight="bold">12</text>
        <text x="90" y="50" font-family="sans-serif" font-weight="900" font-size="18" fill="${color}" text-anchor="middle">4</text>
        <text x="135" y="45" font-family="sans-serif" font-size="11" fill="${color}" text-anchor="middle" font-weight="bold">16</text>
        <text x="90" y="98" font-family="sans-serif" font-weight="bold" font-size="12" fill="${color}" text-anchor="middle">HCF(12,16) = 4</text>
    </svg>`;
}

function drawLCM(color) {
    return `<svg width="180" height="90" viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="30" x2="170" y2="30" stroke="${color}" stroke-width="2" opacity="0.3"/>
        <line x1="10" y1="55" x2="170" y2="55" stroke="${color}" stroke-width="2" opacity="0.3"/>
        ${[4,8,12,16,20,24].map((v,i) => `<circle cx="${20+i*28}" cy="30" r="10" fill="${color}" opacity="0.15"/><text x="${20+i*28}" y="34" font-family="sans-serif" font-size="10" fill="${color}" text-anchor="middle" font-weight="bold">${v}</text>`).join('')}
        ${[6,12,18,24].map((v,i) => `<circle cx="${20+i*42}" cy="55" r="10" fill="${color}" opacity="0.15"/><text x="${20+i*42}" y="59" font-family="sans-serif" font-size="10" fill="${color}" text-anchor="middle" font-weight="bold">${v}</text>`).join('')}
        <text x="90" y="85" font-family="sans-serif" font-weight="bold" font-size="12" fill="${color}" text-anchor="middle">LCM(4,6) = 12</text>
    </svg>`;
}

function drawCoPrime(color) {
    return `<svg width="160" height="80" viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="55" cy="35" r="25" fill="none" stroke="${color}" stroke-width="2.5"/>
        <circle cx="105" cy="35" r="25" fill="none" stroke="${color}" stroke-width="2.5"/>
        <text x="40" y="40" font-family="sans-serif" font-weight="900" font-size="18" fill="${color}" text-anchor="middle">8</text>
        <text x="120" y="40" font-family="sans-serif" font-weight="900" font-size="18" fill="${color}" text-anchor="middle">15</text>
        <text x="80" y="40" font-family="sans-serif" font-weight="bold" font-size="12" fill="${color}" text-anchor="middle">1</text>
        <text x="80" y="75" font-family="sans-serif" font-weight="bold" font-size="11" fill="${color}" text-anchor="middle">HCF = 1 → Co-prime</text>
    </svg>`;
}

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

export const TERMS = [
    {
        name: 'Factor',
        color: '#6366f1',
        icon: '🔢',
        def: 'A factor of a number is an exact divisor of that number. If a divides b exactly (with no remainder), then a is a factor of b.',
        examples: ['Factors of 12: 1, 2, 3, 4, 6, 12', 'Factors of 20: 1, 2, 4, 5, 10, 20'],
        inUse: 'Every number always has 1 and itself as factors.',
        memory: 'Factor = "What fits in perfectly without leftovers!"',
        svg: drawFactorsTree('#6366f1')
    },
    {
        name: 'Multiple',
        color: '#10b981',
        icon: '🐸',
        def: 'A multiple of a number is obtained by multiplying that number by an integer (1, 2, 3, …). Multiples go on infinitely.',
        examples: ['Multiples of 3: 3, 6, 9, 12, 15, …', 'Multiples of 7: 7, 14, 21, 28, …'],
        inUse: 'A number is always a multiple of its own factors.',
        memory: 'Think of a frog jumping in equal steps on a number line!',
        svg: drawMultiplesJump('#10b981')
    },
    {
        name: 'Prime Number',
        color: '#7c3aed',
        icon: '💎',
        def: 'A number greater than 1 that has exactly two factors: 1 and itself. It cannot be divided evenly by any other number.',
        examples: ['2, 3, 5, 7, 11, 13, 17, 19, 23, 29'],
        inUse: '2 is the only even prime number. 1 is NOT a prime number.',
        memory: 'A prime is so special that only 1 and itself can enter.',
        svg: drawPrimeCircle('#7c3aed')
    },
    {
        name: 'Composite Number',
        color: '#ef4444',
        icon: '🧱',
        def: 'A number greater than 1 that has more than two factors. It can be divided evenly by numbers other than 1 and itself.',
        examples: ['4, 6, 8, 9, 10, 12, 14, 15'],
        inUse: 'Every composite number can be expressed as a product of primes.',
        memory: 'Composite = "Composed of many factors."',
        svg: drawCompositeCircle('#ef4444')
    },
    {
        name: 'Sieve of Eratosthenes',
        color: '#0891b2',
        icon: '🏺',
        def: 'An ancient Greek method for finding all prime numbers up to any given limit by systematically crossing out multiples of each prime starting from 2.',
        examples: ['Cross out multiples of 2, then 3, then 5, then 7 — what remains are primes!'],
        inUse: 'Used to find all primes up to 100 or more in seconds!',
        memory: 'Like sieving flour — only the fine primes pass through!',
        svg: drawSieve('#0891b2')
    },
    {
        name: 'Co-prime Numbers',
        color: '#ea580c',
        icon: '🤝',
        def: 'Two numbers are co-prime (or mutually prime) if their only common factor is 1. Their HCF is 1.',
        examples: ['(8, 15) → HCF = 1 ✓', '(4, 9) → HCF = 1 ✓'],
        inUse: 'Co-prime numbers do NOT have to be prime themselves! 8 and 15 are both composite.',
        memory: 'Co-prime = "only share the number 1 as a factor".',
        svg: drawCoPrime('#ea580c')
    },
    {
        name: 'HCF',
        color: '#059669',
        icon: '🔗',
        def: 'Highest Common Factor (HCF) is the largest number that divides two or more numbers exactly. Also known as GCD (Greatest Common Divisor).',
        examples: ['HCF of 12 and 18 = 6', 'HCF of 24, 36, and 48 = 12'],
        inUse: 'HCF is used when we want to split things into largest possible equal groups.',
        memory: 'HCF = The BIGGEST factor they BOTH share.',
        svg: drawHCF('#059669')
    },
    {
        name: 'LCM',
        color: '#2563eb',
        icon: '🔄',
        def: 'Lowest Common Multiple (LCM) is the smallest number that is a multiple of two or more numbers.',
        examples: ['LCM of 4 and 6 = 12', 'LCM of 3 and 5 = 15'],
        inUse: 'LCM is used to find when two events happening at different intervals will coincide.',
        memory: 'LCM = The SMALLEST multiple they BOTH land on.',
        svg: drawLCM('#2563eb')
    }
];

export const CHART_TYPES = [
    {
        num: 1,
        title: 'Divisibility by 2',
        rule: 'A number is divisible by 2 if its last digit is 0, 2, 4, 6, or 8 (even numbers).',
        emoji: '2️⃣',
        color: '#10b981',
        detail: 'Simply check the ones digit. If it is even, the entire number is divisible by 2 regardless of how large it is.',
        examples: ['348 → last digit 8 → ✓ Divisible', '4,571 → last digit 1 → ✗ Not divisible'],
        tip: 'Even last digit = divisible by 2. Odd last digit = not divisible.'
    },
    {
        num: 2,
        title: 'Divisibility by 3',
        rule: 'A number is divisible by 3 if the sum of its digits is divisible by 3.',
        emoji: '3️⃣',
        color: '#7c3aed',
        detail: 'Add up all the digits. If that sum is a multiple of 3, so is the original number. This rule can be applied repeatedly.',
        examples: ['123 → 1+2+3 = 6 → ✓ Divisible', '4,512 → 4+5+1+2 = 12 → ✓ Divisible'],
        tip: 'Keep adding digits until you get a single digit. If it is 3, 6, or 9 → divisible!'
    },
    {
        num: 3,
        title: 'Divisibility by 5',
        rule: 'A number is divisible by 5 if its last digit is 0 or 5.',
        emoji: '5️⃣',
        color: '#3b82f6',
        detail: 'This is one of the easiest rules! Just look at the ones place. If it ends in 0 or 5, you\'re golden.',
        examples: ['735 → last digit 5 → ✓ Divisible', '1,000 → last digit 0 → ✓ Divisible'],
        tip: 'Quick check: ends in 0 or 5? Divisible by 5!'
    },
    {
        num: 4,
        title: 'Divisibility by 9',
        rule: 'A number is divisible by 9 if the sum of its digits is divisible by 9.',
        emoji: '9️⃣',
        color: '#f59e0b',
        detail: 'Same process as the rule for 3, but now the digit sum must be a multiple of 9 instead of 3.',
        examples: ['729 → 7+2+9 = 18 → ✓ Divisible', '1,233 → 1+2+3+3 = 9 → ✓ Divisible'],
        tip: 'If it passes the 9 test, it automatically passes the 3 test too!'
    },
    {
        num: 5,
        title: 'Divisibility by 10',
        rule: 'A number is divisible by 10 if its last digit is 0.',
        emoji: '🔟',
        color: '#ef4444',
        detail: 'The simplest rule of all! Just check if the number ends in zero. If yes, it\'s divisible by 10.',
        examples: ['250 → last digit 0 → ✓ Divisible', '3,001 → last digit 1 → ✗ Not divisible'],
        tip: 'Ends in 0? Divisible by 10! Also automatically divisible by 2 and 5.'
    }
];

export const VOCAB_QUIZ = [
    {
        question: "A number that divides another number exactly (with no remainder) is called a:",
        options: ["Multiple", "Factor", "Prime", "Composite"],
        correct: 1,
        explanation: "A factor divides a number exactly. For example, 3 is a factor of 12 because 12 ÷ 3 = 4 with no remainder."
    },
    {
        question: "Which of the following is the correct list of all factors of 18?",
        options: ["1, 2, 3, 6, 9, 18", "1, 18", "2, 3, 6, 9", "1, 2, 3, 9, 18"],
        correct: 0,
        explanation: "The factors of 18 are all numbers that divide 18 exactly: 1, 2, 3, 6, 9, and 18."
    },
    {
        question: "A number greater than 1 with exactly TWO factors is called a:",
        options: ["Composite number", "Even number", "Prime number", "Co-prime number"],
        correct: 2,
        explanation: "A prime number has exactly two factors: 1 and itself. Examples include 2, 3, 5, 7, and 11."
    },
    {
        question: "Which of the following is the ONLY even prime number?",
        options: ["4", "1", "2", "6"],
        correct: 2,
        explanation: "2 is the only even prime number. Every other even number has at least 2 as an extra factor."
    },
    {
        question: "The ancient method for finding prime numbers by crossing out multiples is called the:",
        options: ["Newton's Method", "Sieve of Eratosthenes", "Fibonacci Sequence", "Archimedes' Rule"],
        correct: 1,
        explanation: "The Sieve of Eratosthenes, invented by the Greek mathematician Eratosthenes, systematically crosses out multiples to reveal primes."
    },
    {
        question: "Two numbers whose only common factor is 1 are called:",
        options: ["Twin primes", "Co-prime numbers", "Composite numbers", "Perfect numbers"],
        correct: 1,
        explanation: "Co-prime (or mutually prime) numbers share no common factor other than 1. They don't need to be prime themselves."
    },
    {
        question: "The HCF of 12 and 18 is:",
        options: ["2", "3", "6", "36"],
        correct: 2,
        explanation: "Factors of 12: {1,2,3,4,6,12}. Factors of 18: {1,2,3,6,9,18}. The highest common factor is 6."
    },
    {
        question: "The LCM of 4 and 6 is:",
        options: ["2", "24", "12", "10"],
        correct: 2,
        explanation: "Multiples of 4: 4,8,12,16… Multiples of 6: 6,12,18… The lowest common multiple is 12."
    },
    {
        question: "A number is divisible by 3 if:",
        options: ["Its last digit is 3", "The sum of its digits is divisible by 3", "It is an odd number", "It ends in 0"],
        correct: 1,
        explanation: "The divisibility rule for 3: add all the digits. If the sum is divisible by 3, the number is too."
    },
    {
        question: "The prime factorization of 36 is:",
        options: ["2 × 18", "4 × 9", "2² × 3²", "6 × 6"],
        correct: 2,
        explanation: "36 = 2 × 2 × 3 × 3 = 2² × 3². Prime factorization uses only prime numbers."
    }
];

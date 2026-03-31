import React from 'react';

export const cards5W1H = [
    {
        id: 'what',
        q: 'What are Factors and Multiples?',
        label: 'The Definition',
        icon: '🔢',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
        content: `A **factor** of a number is an exact divisor of that number. For example, the factors of 12 are 1, 2, 3, 4, 6, and 12.
        
A **multiple** of a number is found by multiplying that number by integers. For example, the multiples of 3 are 3, 6, 9, 12, 15, and so on.`,
        fact: `Every number is both a multiple and a factor of itself!`,
    },
    {
        id: 'why',
        q: 'Why learn Prime Numbers?',
        label: 'The Purpose',
        icon: '🔐',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
        content: `**Prime numbers** are the building blocks of mathematics. Any number greater than 1 that only has two factors (1 and itself) is a prime number.
        
Without prime numbers, we couldn't securely use the internet! Modern cryptography uses huge prime numbers to keep our data safe.`,
        fact: `2 is the ONLY even prime number! Every other even number has at least 2 as a factor.`,
    },
    {
        id: 'who',
        q: 'Who uses LCM and HCF?',
        label: 'The People',
        icon: '👨‍🔧',
        gradFrom: '#ea580c',
        gradTo: '#f97316',
        shadow: 'rgba(249,115,22,0.4)',
        content: `**Engineers, Scientists, and even You!** 
- Planners use **LCM** (Lowest Common Multiple) to figure out when two repeating events will happen at the same time (like flashing lights or intersecting orbits).
- Carpenters use **HCF** (Highest Common Factor) to cut materials into the largest possible equal pieces without wasting anything.`,
        fact: `LCM is heavily used in music! Polyrhythms align where the LCM of the beats overlap.`,
    },
    {
        id: 'when',
        q: 'When do we use Divisibility Rules?',
        label: 'The Timing',
        icon: '⚡',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.4)',
        content: `We use **Divisibility Rules** when we need to check if a large number is exactly divisible by another without actually doing long division. 
        
For example, instead of dividing 4,512 by 3 to see if it works, simply add the digits: 4 + 5 + 1 + 2 = 12. Since 12 is divisible by 3, so is 4,512! This saves a ton of time!`,
        fact: `The divisibility rule for 9 is the same as for 3: if the sum of all digits is a multiple of 9, the whole number is!`,
    },
    {
        id: 'where',
        q: 'Where do we see Number Patterns?',
        label: 'The Location',
        icon: '🌻',
        gradFrom: '#eab308',
        gradTo: '#facc15',
        shadow: 'rgba(250,204,21,0.4)',
        content: `We see multiples, common factors, and primes everywhere in **Nature and Art**.
        
The lifecycle of certain cicadas happens every 13 or 17 years. Why? Because 13 and 17 are prime numbers! This helps them avoid predators whose life cycles might be multiples of non-primes. Nature is full of math!`,
        fact: `The ancient Greeks created the "Sieve of Eratosthenes" over 2000 years ago as a pattern to find prime numbers instantly!`,
    },
    {
        id: 'how',
        q: 'How do we find Prime Factorization?',
        label: 'The Method',
        icon: '🌳',
        gradFrom: '#2563eb',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
        content: `To find the prime factorization, we represent numbers as products of their prime factors. 
        
We often use a **Factor Tree**. We start with the number, split it into two factors, and keep splitting those factors until we are left with only prime numbers at the tips of the branches.`,
        fact: `The Fundamental Theorem of Arithmetic proves that every number has a completely unique prime factorization. It's like a number's DNA!`,
        svg: `<svg viewBox="0 0 120 100" width="100%" height="100">
                <text x="60" y="20" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1e3a8a" text-anchor="middle">24</text>
                <line x1="50" y1="25" x2="35" y2="45" stroke="#3b82f6" stroke-width="2"/>
                <line x1="70" y1="25" x2="85" y2="45" stroke="#3b82f6" stroke-width="2"/>
                
                <text x="30" y="60" font-family="sans-serif" font-weight="bold" font-size="12" fill="#059669" text-anchor="middle">2</text>
                <circle cx="30" cy="56" r="10" stroke="#059669" stroke-width="2" fill="none"/>
                
                <text x="90" y="60" font-family="sans-serif" font-weight="bold" font-size="12" fill="#1e3a8a" text-anchor="middle">12</text>
                
                <line x1="85" y1="65" x2="70" y2="85" stroke="#3b82f6" stroke-width="2"/>
                <line x1="95" y1="65" x2="110" y2="85" stroke="#3b82f6" stroke-width="2"/>
                
                <text x="65" y="98" font-family="sans-serif" font-weight="bold" font-size="12" fill="#059669" text-anchor="middle">3</text>
                <circle cx="65" cy="94" r="10" stroke="#059669" stroke-width="2" fill="none"/>
                
                <text x="115" y="98" font-family="sans-serif" font-weight="bold" font-size="12" fill="#059669" text-anchor="middle">4</text>
              </svg>`
    }
];

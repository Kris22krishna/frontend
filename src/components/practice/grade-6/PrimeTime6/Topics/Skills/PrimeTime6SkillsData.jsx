import React from 'react';
import {
    generateFactorsMultiplesQuestions,
    generatePrimeCompositeQuestions,
    generateDivisibilityQuestions,
    generatePrimeFactorizationQuestions,
    generateHCFLCMQuestions
} from './primeTime6Questions';

export const SKILLS = [
    {
        id: 'factors-multiples',
        nodeId: 'a4061005-0001-0000-0000-000000000000',
        title: 'Factors & Multiples',
        subtitle: 'Skill 1',
        icon: '🐸',
        color: '#6366f1',
        desc: 'Find factors, identify multiples, and explore number jumps on a number line.',
        practice: generateFactorsMultiplesQuestions,
        assessment: generateFactorsMultiplesQuestions,
        learn: {
            concept: 'Factors divide a number exactly. Multiples are what you get when you multiply.',
            rules: [
                {
                    title: 'Factors',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="100" y="30" width="200" height="180" rx="20" fill="#e0e7ff" stroke="#6366f1" strokeWidth="8"/>
                            <text x="200" y="90" fontSize="48" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#6366f1">12</text>
                            <text x="200" y="130" fontSize="20" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#4338ca">Factors:</text>
                            <text x="200" y="170" fontSize="22" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#7c3aed">1, 2, 3, 4, 6, 12</text>
                        </svg>
                    ),
                    f: '\\text{Exact Divisors}',
                    d: 'A **factor** of a number divides it exactly with no remainder. Every number has at least two factors: 1 and itself.',
                    ex: 'Factors of 12: 1, 2, 3, 4, 6, 12',
                    tip: 'Always start from 1 and work your way up to the number.'
                },
                {
                    title: 'Multiples',
                    img: (
                        <svg viewBox="0 0 400 200" width="100%" height="140" xmlns="http://www.w3.org/2000/svg">
                            <line x1="30" y1="100" x2="370" y2="100" stroke="#10b981" strokeWidth="4"/>
                            {[0,1,2,3,4,5,6].map(i => (
                                <g key={i}>
                                    <circle cx={30 + i*55} cy={100} r={8} fill="#10b981"/>
                                    <text x={30 + i*55} y={130} fontSize="16" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#047857">{i*4}</text>
                                </g>
                            ))}
                            {[0,1,2,3,4,5].map(i => (
                                <path key={i} d={`M ${30 + i*55} 100 Q ${57 + i*55} 55 ${85 + i*55} 100`} fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 3"/>
                            ))}
                            <text x="200" y="35" fontSize="20" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#059669">🐸 Multiples of 4</text>
                        </svg>
                    ),
                    f: '\\text{Skip Counting}',
                    d: 'A **multiple** is what you get when you multiply a number by 1, 2, 3, etc. Think of a frog jumping in equal steps!',
                    ex: 'Multiples of 4: 4, 8, 12, 16, 20…',
                    tip: 'Multiples go on FOREVER. Factors are always finite.'
                },
                {
                    title: 'Common Factors & Multiples',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="150" cy="120" r="80" fill="#6366f1" opacity="0.12" stroke="#6366f1" strokeWidth="4"/>
                            <circle cx="250" cy="120" r="80" fill="#10b981" opacity="0.12" stroke="#10b981" strokeWidth="4"/>
                            <text x="110" y="100" fontSize="16" fontWeight="700" fontFamily="sans-serif" fill="#6366f1" textAnchor="middle">12:</text>
                            <text x="110" y="125" fontSize="14" fontFamily="sans-serif" fill="#4338ca" textAnchor="middle">1,2,3,4</text>
                            <text x="200" y="110" fontSize="22" fontWeight="900" fontFamily="sans-serif" fill="#0f172a" textAnchor="middle">6</text>
                            <text x="200" y="140" fontSize="14" fontWeight="700" fontFamily="sans-serif" fill="#64748b" textAnchor="middle">Common</text>
                            <text x="290" y="100" fontSize="16" fontWeight="700" fontFamily="sans-serif" fill="#10b981" textAnchor="middle">18:</text>
                            <text x="290" y="125" fontSize="14" fontFamily="sans-serif" fill="#047857" textAnchor="middle">9,18</text>
                        </svg>
                    ),
                    f: '\\text{Shared Values}',
                    d: 'Common factors appear in the factor lists of both numbers. Common multiples appear in both multiple lists.',
                    ex: 'Common factors of 12 & 18: 1, 2, 3, 6',
                    tip: 'The biggest common factor is the HCF!'
                }
            ]
        }
    },
    {
        id: 'prime-composite',
        nodeId: 'a4061005-0002-0000-0000-000000000000',
        title: 'Prime vs Composite',
        subtitle: 'Skill 2',
        icon: '💎',
        color: '#7c3aed',
        desc: 'Distinguish prime numbers from composite numbers and explore the Sieve of Eratosthenes.',
        practice: generatePrimeCompositeQuestions,
        assessment: generatePrimeCompositeQuestions,
        learn: {
            concept: 'Primes have exactly 2 factors. Composites have more than 2.',
            rules: [
                {
                    title: 'Prime Numbers',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="200" cy="110" r="70" fill="#ede9fe" stroke="#7c3aed" strokeWidth="8"/>
                            <text x="200" y="105" fontSize="60" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#7c3aed">7</text>
                            <text x="200" y="140" fontSize="18" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#6d28d9">Only 1 × 7</text>
                            <text x="200" y="220" fontSize="22" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#5b21b6">PRIME 💎</text>
                        </svg>
                    ),
                    f: '\\text{2 factors only}',
                    d: 'A **prime number** is greater than 1 and has exactly two factors: 1 and itself. It cannot be broken down further.',
                    ex: '2, 3, 5, 7, 11, 13, 17, 19, 23, 29…',
                    tip: '2 is the ONLY even prime. 1 is NOT prime!'
                },
                {
                    title: 'Composite Numbers',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="100" y="30" width="200" height="130" rx="20" fill="#fee2e2" stroke="#ef4444" strokeWidth="8"/>
                            <text x="200" y="90" fontSize="54" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ef4444">12</text>
                            <text x="200" y="140" fontSize="16" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#dc2626">1×12, 2×6, 3×4</text>
                            <text x="200" y="220" fontSize="22" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#b91c1c">COMPOSITE 🧱</text>
                        </svg>
                    ),
                    f: '\\text{More than 2 factors}',
                    d: 'A **composite number** has more than two factors. It can be broken down into smaller factors.',
                    ex: '4, 6, 8, 9, 10, 12, 14, 15…',
                    tip: 'Every composite number can be written as a product of primes!'
                },
                {
                    title: 'Sieve of Eratosthenes',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            {[2,3,5,7,11,13,17,19,23,29,31,37].map((p, i) => {
                                const x = 60 + (i % 6) * 50;
                                const y = 60 + Math.floor(i / 6) * 60;
                                return (
                                    <g key={p}>
                                        <circle cx={x} cy={y} r="20" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="3"/>
                                        <text x={x} y={y + 6} fontSize="16" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#5b21b6">{p}</text>
                                    </g>
                                );
                            })}
                            <text x="200" y="220" fontSize="20" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#7c3aed">Primes revealed by the Sieve! 🏺</text>
                        </svg>
                    ),
                    f: '\\text{Ancient Algorithm}',
                    d: 'Start from 2. Cross out all multiples of 2. Move to 3, cross out its multiples. Continue — the remaining numbers are prime!',
                    ex: 'Start: 2,3,4̶,5,6̶,7,8̶,9̶,10̶,11…',
                    tip: 'You only need to check primes up to the square root of your limit!'
                }
            ]
        }
    },
    {
        id: 'divisibility-rules',
        nodeId: 'a4061005-0003-0000-0000-000000000000',
        title: 'Divisibility Rules',
        subtitle: 'Skill 3',
        icon: '⚡',
        color: '#0891b2',
        desc: 'Master the divisibility tests for 2, 3, 5, 9, and 10 to quickly check divisibility.',
        practice: generateDivisibilityQuestions,
        assessment: generateDivisibilityQuestions,
        learn: {
            concept: 'Divisibility rules are shortcuts to test if a number divides evenly — without actually dividing!',
            rules: [
                {
                    title: 'Rules for 2 & 5',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="40" y="40" width="140" height="160" rx="16" fill="#ecfdf5" stroke="#10b981" strokeWidth="6"/>
                            <text x="110" y="85" fontSize="32" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#059669">÷2</text>
                            <text x="110" y="130" fontSize="16" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#047857">Last digit:</text>
                            <text x="110" y="165" fontSize="20" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#10b981">0,2,4,6,8</text>
                            <rect x="220" y="40" width="140" height="160" rx="16" fill="#eff6ff" stroke="#3b82f6" strokeWidth="6"/>
                            <text x="290" y="85" fontSize="32" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#2563eb">÷5</text>
                            <text x="290" y="130" fontSize="16" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#1d4ed8">Last digit:</text>
                            <text x="290" y="165" fontSize="24" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#3b82f6">0 or 5</text>
                        </svg>
                    ),
                    f: '\\text{Last Digit Check}',
                    d: 'For **2**: check if the last digit is even (0,2,4,6,8). For **5**: check if the last digit is 0 or 5.',
                    ex: '346 → last digit 6 → ÷2 ✓ | 735 → last digit 5 → ÷5 ✓',
                    tip: 'These are the easiest rules — just look at the LAST digit!'
                },
                {
                    title: 'Rules for 3 & 9',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="50" y="40" width="300" height="160" rx="16" fill="#faf5ff" stroke="#7c3aed" strokeWidth="6"/>
                            <text x="200" y="80" fontSize="24" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#6d28d9">4,512</text>
                            <text x="200" y="120" fontSize="20" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#7c3aed">4 + 5 + 1 + 2 = 12</text>
                            <text x="200" y="155" fontSize="18" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#059669">12 ÷ 3 = 4 ✓</text>
                            <text x="200" y="185" fontSize="16" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#dc2626">12 ÷ 9 = 1.3 ✗</text>
                        </svg>
                    ),
                    f: '\\text{Digit Sum Test}',
                    d: 'Add all the digits of the number. If the sum is divisible by **3**, the number is too. Same rule for **9** but the sum must be a multiple of 9.',
                    ex: '729 → 7+2+9 = 18 → ÷3 ✓ and ÷9 ✓',
                    tip: 'If it passes the 9 test, it automatically passes the 3 test!'
                },
                {
                    title: 'Rule for 10',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="200" cy="110" r="70" fill="#fef2f2" stroke="#ef4444" strokeWidth="8"/>
                            <text x="200" y="100" fontSize="28" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ef4444">÷ 10</text>
                            <text x="200" y="140" fontSize="20" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#dc2626">Ends in 0</text>
                            <text x="200" y="220" fontSize="16" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#64748b">250 ✓ | 3001 ✗</text>
                        </svg>
                    ),
                    f: '\\text{Zero Ending}',
                    d: 'A number is divisible by **10** if and only if its last digit is 0. The simplest rule of all!',
                    ex: '5,000 → ends in 0 → ÷10 ✓',
                    tip: 'Divisible by 10 means also divisible by both 2 AND 5.'
                }
            ]
        }
    },
    {
        id: 'prime-factorization',
        nodeId: 'a4061005-0004-0000-0000-000000000000',
        title: 'Prime Factorization',
        subtitle: 'Skill 4',
        icon: '🌳',
        color: '#059669',
        desc: 'Break numbers down into their prime building blocks using factor trees.',
        practice: generatePrimeFactorizationQuestions,
        assessment: generatePrimeFactorizationQuestions,
        learn: {
            concept: 'Every composite number can be uniquely expressed as a product of prime factors.',
            rules: [
                {
                    title: 'Factor Trees',
                    img: (
                        <svg viewBox="0 0 400 280" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
                            <text x="200" y="30" fontSize="28" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#059669">36</text>
                            <line x1="170" y1="40" x2="120" y2="80" stroke="#10b981" strokeWidth="3"/>
                            <line x1="230" y1="40" x2="280" y2="80" stroke="#10b981" strokeWidth="3"/>
                            <circle cx="120" cy="95" r="18" fill="#d1fae5" stroke="#059669" strokeWidth="3"/>
                            <text x="120" y="101" fontSize="18" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#059669">2</text>
                            <text x="280" y="101" fontSize="20" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#0f172a">18</text>
                            <line x1="260" y1="110" x2="220" y2="150" stroke="#10b981" strokeWidth="3"/>
                            <line x1="300" y1="110" x2="340" y2="150" stroke="#10b981" strokeWidth="3"/>
                            <circle cx="220" cy="165" r="18" fill="#d1fae5" stroke="#059669" strokeWidth="3"/>
                            <text x="220" y="171" fontSize="18" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#059669">2</text>
                            <text x="340" y="171" fontSize="20" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#0f172a">9</text>
                            <line x1="325" y1="180" x2="300" y2="220" stroke="#10b981" strokeWidth="3"/>
                            <line x1="355" y1="180" x2="380" y2="220" stroke="#10b981" strokeWidth="3"/>
                            <circle cx="300" cy="235" r="18" fill="#d1fae5" stroke="#059669" strokeWidth="3"/>
                            <text x="300" y="241" fontSize="18" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#059669">3</text>
                            <circle cx="380" cy="235" r="18" fill="#d1fae5" stroke="#059669" strokeWidth="3"/>
                            <text x="380" y="241" fontSize="18" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#059669">3</text>
                            <text x="200" y="275" fontSize="16" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#64748b">36 = 2² × 3²</text>
                        </svg>
                    ),
                    f: '\\text{Branch & Split}',
                    d: 'Start with the number. Split it into any two factors. Keep splitting non-prime factors until every leaf is a prime.',
                    ex: '36 → 2 × 18 → 2 × 2 × 9 → 2 × 2 × 3 × 3',
                    tip: 'The primes are always the "leaves" at the bottom of the tree!'
                },
                {
                    title: 'Fundamental Theorem',
                    img: (
                        <svg viewBox="0 0 400 200" width="100%" height="140" xmlns="http://www.w3.org/2000/svg">
                            <rect x="50" y="40" width="300" height="120" rx="20" fill="#ecfdf5" stroke="#059669" strokeWidth="6"/>
                            <text x="200" y="80" fontSize="20" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#047857">Every number has a</text>
                            <text x="200" y="115" fontSize="28" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#059669">UNIQUE</text>
                            <text x="200" y="145" fontSize="18" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#047857">prime factorization</text>
                        </svg>
                    ),
                    f: '\\text{Unique DNA}',
                    d: 'The Fundamental Theorem of Arithmetic states that every integer greater than 1 has a unique prime factorization (order doesn\'t matter).',
                    ex: '60 = 2² × 3 × 5 — no other primes work!',
                    tip: 'Think of it as a number\'s DNA — unique and unrepeatable.'
                },
                {
                    title: 'Writing in Exponential Form',
                    img: (
                        <svg viewBox="0 0 400 200" width="100%" height="140" xmlns="http://www.w3.org/2000/svg">
                            <text x="200" y="60" fontSize="24" fontFamily="sans-serif" textAnchor="middle" fill="#64748b">2 × 2 × 2 × 3 × 3</text>
                            <line x1="130" y1="80" x2="270" y2="80" stroke="#059669" strokeWidth="3" strokeDasharray="6 4"/>
                            <text x="140" y="75" fontSize="28" textAnchor="middle">↓</text>
                            <text x="200" y="130" fontSize="36" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#059669">2³ × 3²</text>
                            <text x="200" y="175" fontSize="16" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#64748b">= 72</text>
                        </svg>
                    ),
                    f: '\\text{Power Notation}',
                    d: 'Group repeated prime factors using exponents. 2 × 2 × 2 becomes 2³ (2 raised to the power 3).',
                    ex: '72 = 2³ × 3²',
                    tip: 'The exponent tells you how many times that prime appears.'
                }
            ]
        }
    },
    {
        id: 'hcf-lcm',
        nodeId: 'a4061005-0005-0000-0000-000000000000',
        title: 'HCF & LCM',
        subtitle: 'Skill 5',
        icon: '🔗',
        color: '#2563eb',
        desc: 'Calculate the Highest Common Factor and Lowest Common Multiple using multiple methods.',
        practice: generateHCFLCMQuestions,
        assessment: generateHCFLCMQuestions,
        learn: {
            concept: 'HCF finds the biggest shared factor. LCM finds the smallest shared multiple.',
            rules: [
                {
                    title: 'HCF — Listing Method',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="150" cy="120" r="85" fill="#dbeafe" opacity="0.5" stroke="#2563eb" strokeWidth="4"/>
                            <circle cx="250" cy="120" r="85" fill="#dbeafe" opacity="0.5" stroke="#2563eb" strokeWidth="4"/>
                            <text x="100" y="90" fontSize="14" fontWeight="700" fontFamily="sans-serif" fill="#1d4ed8" textAnchor="middle">12</text>
                            <text x="100" y="115" fontSize="12" fontFamily="sans-serif" fill="#3b82f6" textAnchor="middle">4</text>
                            <text x="100" y="140" fontSize="12" fontFamily="sans-serif" fill="#3b82f6" textAnchor="middle">12</text>
                            <text x="200" y="100" fontSize="28" fontWeight="900" fontFamily="sans-serif" fill="#1e40af" textAnchor="middle">1,2,3,6</text>
                            <text x="200" y="135" fontSize="14" fontWeight="700" fontFamily="sans-serif" fill="#64748b" textAnchor="middle">Common</text>
                            <text x="300" y="90" fontSize="14" fontWeight="700" fontFamily="sans-serif" fill="#1d4ed8" textAnchor="middle">18</text>
                            <text x="300" y="115" fontSize="12" fontFamily="sans-serif" fill="#3b82f6" textAnchor="middle">9</text>
                            <text x="300" y="140" fontSize="12" fontFamily="sans-serif" fill="#3b82f6" textAnchor="middle">18</text>
                            <text x="200" y="230" fontSize="20" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#2563eb">HCF(12, 18) = 6</text>
                        </svg>
                    ),
                    f: '\\text{Biggest Common}',
                    d: 'List all factors of both numbers. Find all common factors. The largest one is the HCF.',
                    ex: 'Factors of 12: {1,2,3,4,6,12} & of 18: {1,2,3,6,9,18} → HCF = 6',
                    tip: 'Use a Venn diagram to visualize common factors!'
                },
                {
                    title: 'LCM — Listing Method',
                    img: (
                        <svg viewBox="0 0 400 200" width="100%" height="140" xmlns="http://www.w3.org/2000/svg">
                            <line x1="30" y1="60" x2="370" y2="60" stroke="#2563eb" strokeWidth="3" opacity="0.3"/>
                            <line x1="30" y1="110" x2="370" y2="110" stroke="#059669" strokeWidth="3" opacity="0.3"/>
                            {[4,8,12,16,20,24,28].map((v, i) => (
                                <g key={`a-${i}`}>
                                    <circle cx={40 + i * 46} cy={60} r={14} fill={v === 12 || v === 24 ? '#2563eb' : '#dbeafe'} stroke="#2563eb" strokeWidth="2"/>
                                    <text x={40 + i * 46} y={65} fontSize="13" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill={v === 12 || v === 24 ? '#fff' : '#2563eb'}>{v}</text>
                                </g>
                            ))}
                            {[6,12,18,24,30].map((v, i) => (
                                <g key={`b-${i}`}>
                                    <circle cx={40 + i * 65} cy={110} r={14} fill={v === 12 || v === 24 ? '#059669' : '#d1fae5'} stroke="#059669" strokeWidth="2"/>
                                    <text x={40 + i * 65} y={115} fontSize="13" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill={v === 12 || v === 24 ? '#fff' : '#059669'}>{v}</text>
                                </g>
                            ))}
                            <text x="40" y="45" fontSize="14" fontWeight="800" fontFamily="sans-serif" fill="#2563eb">4:</text>
                            <text x="40" y="140" fontSize="14" fontWeight="800" fontFamily="sans-serif" fill="#059669">6:</text>
                            <text x="200" y="185" fontSize="20" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#2563eb">LCM(4, 6) = 12</text>
                        </svg>
                    ),
                    f: '\\text{Smallest Common}',
                    d: 'List multiples of both numbers. Find common multiples. The smallest one is the LCM.',
                    ex: 'Multiples of 4: 4,8,12,16… & of 6: 6,12,18… → LCM = 12',
                    tip: 'LCM is always ≥ the larger of the two numbers.'
                },
                {
                    title: 'HCF × LCM Property',
                    img: (
                        <svg viewBox="0 0 400 200" width="100%" height="140" xmlns="http://www.w3.org/2000/svg">
                            <rect x="40" y="40" width="320" height="120" rx="20" fill="#eff6ff" stroke="#2563eb" strokeWidth="6"/>
                            <text x="200" y="85" fontSize="22" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#1d4ed8">HCF × LCM = a × b</text>
                            <text x="200" y="120" fontSize="16" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#64748b">For any two numbers a and b</text>
                            <text x="200" y="150" fontSize="16" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" fill="#059669">6 × 12 = 4 × 18 = 72 ✓</text>
                        </svg>
                    ),
                    f: '\\text{Golden Rule}',
                    d: 'For any two numbers a and b: **HCF(a,b) × LCM(a,b) = a × b**. This is a powerful shortcut!',
                    ex: 'HCF(4,6) × LCM(4,6) = 2 × 12 = 24 = 4 × 6 ✓',
                    tip: 'If you know one (HCF or LCM), you can find the other using this formula!'
                }
            ]
        }
    }
];

import { genSkill1Q, genSkill1A, genSkill2Q, genSkill2A } from './HCFSkillsData_Part1';
import { genSkill3Q, genSkill3A } from './HCFSkillsData_Part2';

export const SKILLS = [
    {
        id: 'finding_hcf',
        title: 'Finding the HCF',
        subtitle: 'Core Calculation',
        icon: '🧱',
        color: '#e11d48',
        desc: 'Master factor listing, prime factorization, and Euclid\'s algorithm to find HCFs.',
        practice: genSkill1Q,
        assessment: genSkill1A,
        learn: {
            concept: 'The HCF is the largest number that divides evenly into all given numbers. It is the biggest shared building block.',
            rules: [
                { title: 'Factor Listing', f: '\\text{List factors, pick the largest match}', d: 'Write out every factor of both numbers. The biggest number on both lists is the HCF.', ex: 'Factors of $18$: 1,2,3,6,9,18. Factors of $24$: 1,2,3,4,6,8,12,24. HCF $= 6$.', tip: 'Start from the larger factors and check downward — you can stop as soon as you find a match!' },
                { title: 'Prime Factorization', f: '\\text{HCF} = \\prod \\text{lowest powers}', d: 'Factor both numbers into primes. Take the lowest power of every SHARED prime.', ex: '$18 = 2 \\times 3^2$ and $24 = 2^3 \\times 3$. HCF $= 2^1 \\times 3^1 = 6$.', tip: 'Only primes that appear in BOTH factorizations contribute to the HCF.' }
            ]
        }
    },
    {
        id: 'hcf_applications',
        title: 'HCF Applications',
        subtitle: 'Simplification & Word Problems',
        icon: '✂️',
        color: '#0d9488',
        desc: 'Use HCF to simplify fractions and solve distribution problems.',
        practice: genSkill2Q,
        assessment: genSkill2A,
        learn: {
            concept: 'The most common use of HCF is simplifying fractions. Divide the numerator and denominator by their HCF for the simplest form.',
            rules: [
                { title: 'Simplifying Fractions', f: '\\frac{a}{b} = \\frac{a \\div \\text{HCF}}{b \\div \\text{HCF}}', d: 'Find the HCF of the top and bottom, then divide both by it.', ex: '$\\frac{24}{36}$: HCF is 12, so $\\frac{24 \\div 12}{36 \\div 12} = \\frac{2}{3}$.', tip: 'If you cannot find the HCF in one step, simplify by any common factor and repeat!' },
                { title: 'The LCM Shortcut', f: '\\text{HCF}(a,b) = \\frac{a \\times b}{\\text{LCM}(a,b)}', d: 'If you already know the LCM, you can instantly compute the HCF.', ex: '$\\text{HCF}(12, 18) = \\frac{12 \\times 18}{36} = 6$.', tip: 'This connects HCF and LCM beautifully — they are mathematical twins!' }
            ]
        }
    },
    {
        id: 'fundamental_operations',
        title: 'Fundamental Operations',
        subtitle: 'Multi-set Calculations',
        icon: '🧮',
        color: '#f59e0b',
        desc: 'Master calculating HCF for sets of two or three numbers and solve greatest grouping problems with 20 dynamic challenges.',
        practice: genSkill3Q,
        assessment: genSkill3A,
        learn: {
            concept: 'HCF operations are about finding the largest common divider for multiple numbers. This is essential for dividing resources equally without any leftovers.',
            rules: [
                {
                    title: 'HCF of Three Numbers',
                    f: '\\text{HCF}(a, b, c) = \\text{HCF}(a, \\text{HCF}(b, c))',
                    d: 'Calculate the HCF of any two numbers first, then find the HCF of that result and the third number.',
                    ex: '$\\text{HCF}(12, 18, 24) \\Rightarrow \\text{HCF}(12, 18) = 6 \\Rightarrow \\text{HCF}(6, 24) = 6$.',
                    tip: 'If any two numbers in the set are prime to each other, the HCF of the whole set MUST be 1!'
                },
                {
                    title: 'HCF-LCM Product Law',
                    f: '\\text{HCF}(a,b) = \\frac{a \\times b}{\\text{LCM}(a,b)}',
                    d: 'The HCF is directly related to the product of the numbers and their LCM.',
                    ex: 'If product is 72 and LCM is 12, HCF must be $72 / 12 = 6$.',
                    tip: 'Use this property to cross-check your answers if you have time.'
                },
                {
                    title: 'The Remainder Trick',
                    f: '\\text{HCF}(a-r, b-r)',
                    d: 'To find the largest number that divides a and b leaving a remainder r, find the HCF of (a-r) and (b-r).',
                    ex: 'Largest number dividing 13 and 17 leaving remainder 1 $\\Rightarrow \\text{HCF}(12, 16) = 4$.',
                    tip: 'This is a common "trap" in competitive math exams.'
                },
                {
                    title: 'Maximum Distribution',
                    f: '\\text{Max Size} = \\text{HCF}',
                    d: 'Any problem asking for the "Greatest possible length" or "Largest identical group" is an HCF problem.',
                    ex: 'Dividing two ropes of different lengths into equal maximum pieces.',
                    tip: 'Keywords: Greatest, Maximum, Largest, Equal parts, No leftovers.'
                }
            ]
        }
    }
];

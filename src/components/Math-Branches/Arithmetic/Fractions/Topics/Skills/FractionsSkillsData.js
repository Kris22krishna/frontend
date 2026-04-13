import { genSkill1Q, genSkill1A, genSkill2Q, genSkill2A } from './FractionsSkillsData_Part1';
import { genSkill3Q, genSkill3A } from './FractionsSkillsData_Part2';

export const SKILLS = [
    {
        id: 'equivalency',
        title: 'Equivalency & Simplification',
        subtitle: 'Finding the Base',
        icon: '⚖️',
        color: '#a855f7',
        desc: 'Learn how to simplify fractions and identify equivalent forms.',
        practice: genSkill1Q,
        assessment: genSkill1A,
        learn: {
            spark: 'fractions-sharing',
            concept: 'Equivalent fractions look different but hold the exact same value. Simplifying a fraction means shrinking it to its smallest possible whole numbers.',
            rules: [
                {
                    title: 'Simplifying',
                    f: '\\frac{10}{15} = \\frac{10 \\div 5}{15 \\div 5} = \\frac{2}{3}',
                    d: 'Divide both the top and bottom by their Greatest Common Factor (GCF).',
                    ex: 'To simplify $\\frac{8}{12}$, divide by $4$ to get $\\frac{2}{3}$.',
                    tip: 'If both numbers are even, you can always start by dividing by 2!'
                },
                {
                    title: 'Creating Equivalents',
                    f: '\\frac{1}{2} = \\frac{1 \\times 3}{2 \\times 3} = \\frac{3}{6}',
                    d: 'Multiply both the numerator and denominator by the same number.',
                    ex: '$\\frac{3}{4} = \\frac{30}{40}$ (multiplied by 10)',
                    tip: 'Whatever you do to the bottom, you MUST do to the top.'
                }
            ]
        }
    },
    {
        id: 'addition_subtraction',
        title: 'Addition & Subtraction',
        subtitle: 'Combining Parts',
        icon: '➕',
        color: '#ec4899',
        desc: 'Master the process of adding or subtracting fractions using common denominators.',
        practice: genSkill2Q,
        assessment: genSkill2A,
        learn: {
            concept: 'You cannot add or subtract pieces of different sizes. Therefore, denominators MUST match before you add or subtract the numerators.',
            rules: [
                {
                    title: 'Same Denominator',
                    f: '\\frac{2}{5} + \\frac{1}{5} = \\frac{3}{5}',
                    d: 'Keep the denominator the same and add the numerators.',
                    ex: '$\\frac{7}{8} - \\frac{2}{8} = \\frac{5}{8}$',
                    tip: 'Never add the denominators together! $\\frac{1}{2} + \\frac{1}{2} \\neq \\frac{2}{4}$'
                },
                {
                    title: 'Different Denominators',
                    f: '\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}',
                    d: 'Find a Common Denominator first, convert both fractions, then add.',
                    ex: 'To add halves and thirds, turn them both into sixths.',
                    tip: 'The easiest common denominator is just multiplying the two bottoms together ($a \\times b$).'
                }
            ]
        }
    },
    {
        id: 'fundamental_operations',
        title: 'Fundamental Operations',
        subtitle: 'Fractional Arithmetic',
        icon: '🧮',
        color: '#f59e0b',
        desc: 'Master the four basic operations with fractions (Add, Sub, Mul, Div) with 20 unique dynamic problems.',
        practice: genSkill3Q,
        assessment: genSkill3A,
        learn: {
            concept: 'Arithmetic with fractions is the foundation of higher algebra. Multiplication and division are surprisingly easier than addition and subtraction because they don\'t require common denominators!',
            rules: [
                {
                    title: 'Multiplication (Direct)',
                    f: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}',
                    d: 'Simply multiply the numerators together and the denominators together.',
                    ex: '$\\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15}$',
                    tip: 'You don\'t need common denominators for multiplication!'
                },
                {
                    title: 'Division (KCF Rule)',
                    f: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}',
                    d: 'Keep the first, Change to multiply, Flip the second (Reciprocal).',
                    ex: '$\\frac{1}{2} \\div \\frac{3}{4} = \\frac{1}{2} \\times \\frac{4}{3} = \\frac{4}{6} = \\frac{2}{3}$',
                    tip: 'Never divide the actual numbers; always flip and multiply.'
                },
                {
                    title: 'Mixed Operations',
                    f: '\\text{Priority First}',
                    d: 'BODMAS rules apply to fractions exactly as they do to whole numbers.',
                    ex: '$\\frac{1}{2} + \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}$',
                    tip: 'Handle multiplication/division groups before adding them.'
                },
                {
                    title: 'The "One" Trick',
                    f: '\\frac{a}{a} = 1',
                    d: 'Any fraction where top and bottom are the same is equal to 1.',
                    ex: '$\\frac{7}{7} = 1$ and $1 \\times \\frac{2}{3} = \\frac{2}{3}$',
                    tip: 'Useful for building common denominators!'
                }
            ]
        }
    }
];

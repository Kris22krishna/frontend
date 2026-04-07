import { genSkill1Q, genSkill1A, genSkill2Q, genSkill2A } from './RationalNumbersSkillsData_Part1';
import { genSkill3Q, genSkill3A } from './RationalNumbersSkillsData_Part2';

export const SKILLS = [
    {
        id: 'conversions',
        title: 'Conversions',
        subtitle: 'Decimals & Percentages',
        icon: '🔄',
        color: '#f97316',
        desc: 'Translate rational numbers seamlessly between fractions, decimals, and percentages.',
        practice: genSkill1Q,
        assessment: genSkill1A,
        learn: {
            concept: 'A rational number can wear many masks. It can look like a fraction ($1/2$), a decimal ($0.5$), or a percentage ($50\\%$). All of these represent the exact same value!',
            rules: [
                {
                    title: 'Fraction to Decimal',
                    f: 'Fraction \\Rightarrow Division',
                    d: 'Divide the numerator (top) by the denominator (bottom).',
                    ex: '$\\frac{1}{4} = 1 \\div 4 = 0.25$',
                    tip: 'Think of the fraction line as a division symbol!'
                },
                {
                    title: 'Decimal to Percentage',
                    f: 'Decimal \\times 100 = \\%',
                    d: 'Multiply by 100, which is the same as moving the decimal point two spots to the right.',
                    ex: '$0.72 \\times 100 = 72\\%$',
                    tip: 'Percent literally means "per 100".'
                }
            ]
        }
    },
    {
        id: 'identifying',
        title: 'Identifying Rationals',
        subtitle: 'The Number Types',
        icon: '🔍',
        color: '#14b8a6',
        desc: 'Distinguish between rational numbers and irrational numbers.',
        practice: genSkill2Q,
        assessment: genSkill2A,
        learn: {
            concept: 'If a number can be written as a clean fraction $p/q$, it is rational. If its decimal form goes on forever without ever repeating a pattern, it is IRRATIONAL.',
            rules: [
                {
                    title: 'The Rational Check',
                    f: '\\text{Rational} = \\frac{\\text{Integer}}{\\text{Integer}}',
                    d: 'Integers, terminating decimals, and repeating decimals are ALL rational.',
                    ex: '$4.5 = \\frac{45}{10}$ (Rational!)',
                    tip: 'Even $0.333333...$ is rational because it equals exactly $1/3$.'
                },
                {
                    title: 'The Irrational Check',
                    f: '\\pi \\neq \\frac{p}{q}',
                    d: 'Some numbers simply cannot be written as fractions. These are Irrational.',
                    ex: '$\\sqrt{2} = 1.41421356...$ (never repeats, never ends).',
                    tip: 'Almost all square roots of non-perfect squares are irrational.'
                }
            ]
        }
    },
    {
        id: 'fundamental_operations',
        title: 'Fundamental Operations',
        subtitle: 'Decimal & Mixed Arithmetic',
        icon: '🧮',
        color: '#f59e0b',
        desc: 'Master operations with decimals, percentages, and mixed rational forms using 20 dynamic challenges.',
        practice: genSkill3Q,
        assessment: genSkill3A,
        learn: {
            concept: 'Rational numbers are often encountered as decimals. Mastering the placement of the decimal point during addition and multiplication is key to accuracy.',
            rules: [
                {
                    title: 'Decimal Alignment',
                    f: '1.25 + 0.5 = 1.75',
                    d: 'When adding or subtracting, always line up the decimal points vertically.',
                    ex: '$5.6 + 1.25 = 6.85$ (Treat empty spaces as zeros).',
                    tip: 'Padding with zeros keeps your columns straight!'
                },
                {
                    title: 'The Shift Rule (Mul)',
                    f: '1.2 \\times 0.5 = 0.60',
                    d: 'Multiply the numbers as whole integers, then count the total decimal places and shift the point left.',
                    ex: '$1.2 \\times 0.5 \\Rightarrow 12 \\times 5 = 60 \\Rightarrow 0.60$',
                    tip: 'Count total spots after the dot in both numbers combined!'
                },
                {
                    title: 'Division by Decimal',
                    f: 'a \\div 0.5 = a \\times 2',
                    d: 'Dividing by a decimal smaller than 1 makes the number LARGER.',
                    ex: '$10 \\div 0.1 = 100$',
                    tip: 'If you divide by $0.1$, it’s the same as multiplying by $10$.'
                },
                {
                    title: 'Percentage to Rational',
                    f: 'x\\% = \\frac{x}{100}',
                    d: 'A percentage is just a rational number with a fixed denominator of 100.',
                    ex: '$50\\% = 0.5$ or $1/2$.',
                    tip: '"Percent" comes from Latin "per centum", meaning "by the hundred".'
                }
            ]
        }
    }
];

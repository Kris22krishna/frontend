import { genSkill1Q, genSkill1A, genSkill2Q, genSkill2A } from './IntegersSkillsData_Part1';
import { genSkill3Q, genSkill3A } from './IntegersSkillsData_Part2';

export const SKILLS = [
    {
        id: 'comparing',
        title: 'Comparing & Ordering',
        subtitle: 'The Number Line',
        icon: '⚖️',
        color: '#fbbf24',
        desc: 'Learn to compare negative numbers. Understand that -5 is smaller than -2.',
        practice: genSkill1Q,
        assessment: genSkill1A,
        learn: {
            concept: 'Integers are ordered from left to right on the number line. Numbers further to the right are ALWAYS larger.',
            rules: [
                {
                    title: 'Positives vs Negatives',
                    f: 'P > N',
                    d: 'Any positive number is always greater than any negative number.',
                    ex: '5 > -100',
                    tip: 'Even though 100 looks big, the minus sign makes it less than zero!'
                },
                {
                    title: 'Comparing Two Negatives',
                    f: '-a < -b \\text{ if } a > b',
                    d: 'For negative numbers, the one with the larger absolute value is actually SMALLER.',
                    ex: '-10 < -2',
                    tip: 'Think of debt. Owing $10 (-10) is a worse (smaller) financial state than owing $2 (-2).'
                }
            ]
        }
    },
    {
        id: 'add_sub',
        title: 'Addition & Subtraction',
        subtitle: 'Combining Integers',
        icon: '➕',
        color: '#f43f5e',
        desc: 'Master the rules for adding and subtracting integers with different signs.',
        practice: genSkill2Q,
        assessment: genSkill2A,
        learn: {
            concept: 'When adding or subtracting integers, pay close attention to the signs. Subtraction is exactly the same as adding the opposite.',
            rules: [
                {
                    title: 'Adding Different Signs',
                    f: 'a + (-b)',
                    d: 'Subtract their absolute values. Give the answer the sign of the larger absolute value.',
                    ex: '8 + (-5) = 3 \\text{ and } (-8) + 5 = -3',
                    tip: 'The larger number dominates the sign!'
                },
                {
                    title: 'Double Negatives',
                    f: 'a - (-b) = a + b',
                    d: 'Subtracting a negative is the same as adding a positive.',
                    ex: '10 - (-4) = 10 + 4 = 14',
                    tip: 'Taking away a debt is exactly like receiving money!'
                }
            ]
        }
    },
    {
        id: 'fundamental_operations',
        title: 'Fundamental Operations',
        subtitle: 'Arithmetic Mastery',
        icon: '🎯',
        color: '#8b5cf6',
        desc: 'Master the four basic operations with integers through focused dynamic practice.',
        practice: genSkill3Q,
        assessment: genSkill3A,
        learn: {
            concept: 'Integers are the first branch of math where we deal with both magnitudes and directions (positive and negative signs). Mastery requires quick mental calculation of signs.',
            rules: [
                {
                    title: 'Multiplication (Same Signs)',
                    f: '(+) \\times (+) = (+) \\text{ and } (-) \\times (-) = (+)',
                    d: 'Multiplying two numbers with the SAME sign always gives a POSITIVE result.',
                    ex: '(-5) \\times (-4) = 20',
                    tip: 'Wait for the "even number of minuses" rule: if you multiply an even count of negatives, the result is positive.'
                },
                {
                    title: 'Multiplication (Different Signs)',
                    f: '(+) \\times (-) = (-) \\text{ and } (-) \\times (+) = (-)',
                    d: 'Multiplying numbers with DIFFERENT signs always gives a NEGATIVE result.',
                    ex: '6 \\times (-3) = -18',
                    tip: 'A single negative sign in a product and it dominates!'
                },
                {
                    title: 'Division (Same Rules)',
                    f: 'a / b = \\text{Sign Check}',
                    d: 'Division follows exactly the same sign rules as multiplication.',
                    ex: '(-10) / (-2) = 5 \\text{ while } (-10) / 2 = -5',
                    tip: 'Count your minus signs. If there is 1, the answer is negative. If there are 0 or 2, it is positive.'
                },
                {
                    title: 'Operator Priority (BODMAS)',
                    f: '\\text{B } \\rightarrow \\text{ O } \\rightarrow \\text{ D } \\rightarrow \\text{ M } \\rightarrow \\text{ A } \\rightarrow \\text{ S}',
                    d: 'When multiple operations occur, follow Bracket, Order, Division/Multiplication, then Addition/Subtraction.',
                    ex: '5 + (-2) \\times 3 = 5 + (-6) = -1',
                    tip: 'Always handle multiplication before addition!'
                }
            ]
        }
    }
];

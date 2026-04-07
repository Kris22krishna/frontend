import { genSkill1Q, genSkill1A, genSkill2Q, genSkill2A } from './NaturalNumbersSkillsData_Part1';
import { genSkill3Q, genSkill3A } from './NaturalNumbersSkillsData_Part2';

export const SKILLS = [
    {
        id: 'identification',
        title: 'Identification & Counting',
        subtitle: 'The Basics',
        icon: '🔢',
        color: '#10b981',
        desc: 'Learn to identify natural numbers and sequence them correctly.',
        practice: genSkill1Q,
        assessment: genSkill1A,
        learn: {
            concept: 'Natural numbers are the exact numbers you use when counting objects in real life. They are simple, whole, and positive.',
            rules: [
                {
                    title: 'Start at 1',
                    f: '\\mathbb{N} = \\{1, 2, 3, \\dots\\}',
                    d: 'Counting begins naturally at one object.',
                    ex: 'If you have an apple, you have 1 apple. You cannot naturally have 0.5 apples when counting whole individual items.',
                    tip: 'Zero (0) is NOT a natural number!'
                },
                {
                    title: 'No Fractions or Decimals',
                    f: '1.5 \\notin \\mathbb{N}',
                    d: 'Natural numbers represent whole objects.',
                    ex: '3.14 is a real number, but it is not a natural number.',
                    tip: 'If it has a decimal point or a fractional part (that doesn\'t simplify to a whole number), it\'s not natural.'
                }
            ]
        }
    },
    {
        id: 'successors_predecessors',
        title: 'Successors & Predecessors',
        subtitle: 'Navigating Numbers',
        icon: '🔄',
        color: '#3b82f6',
        desc: 'Understand the numbers that come immediately before or after any given natural number.',
        practice: genSkill2Q,
        assessment: genSkill2A,
        learn: {
            concept: 'Every natural number has a definite sequence. The next number is the successor, and the previous is the predecessor.',
            rules: [
                {
                    title: 'Successor (+1)',
                    f: 'S(n) = n + 1',
                    d: 'To find the successor, simply add one to the number.',
                    ex: 'The successor of $99$ is $99 + 1 = 100$.',
                    tip: 'Every natural number has a successor!'
                },
                {
                    title: 'Predecessor (-1)',
                    f: 'P(n) = n - 1',
                    d: 'To find the predecessor, simply subtract one from the number.',
                    ex: 'The predecessor of $50$ is $50 - 1 = 49$.',
                    tip: 'Important: The number $1$ has NO predecessor in the set of natural numbers!'
                }
            ]
        }
    },
    {
        id: 'fundamental_operations',
        title: 'Fundamental Operations',
        subtitle: 'Arithmetic Basics',
        icon: '🧮',
        color: '#f59e0b',
        desc: 'Master Addition, Subtraction, Multiplication, and Division of Natural Numbers.',
        practice: genSkill3Q,
        assessment: genSkill3A,
        learn: {
            concept: 'Arithmetic operations are the foundational tools of mathematics. They allow us to combine, remove, scale, and distribute numbers effectively.',
            rules: [
                {
                    title: 'Addition & Sum ( + )',
                    f: 'a + b = c',
                    d: 'Combining two or more numbers to find a total sum.',
                    ex: '5 + 3 = 8 (Natural numbers joined together stay natural).',
                    tip: 'The sum of any two natural numbers is always a natural number.'
                },
                {
                    title: 'Subtraction & Difference ( - )',
                    f: 'a - b = d',
                    d: 'Removing one amount from another to find the remaining difference.',
                    ex: '10 - 4 = 6. (Remember: if b > a, the result is not a natural number!).',
                    tip: 'Subtracting a larger natural number from a smaller one results in an Integer, not a Natural number.'
                },
                {
                    title: 'Multiplication & Product ( × )',
                    f: 'a \\times b = p',
                    d: 'Repeated addition of a number a certain amount of times.',
                    ex: '4 \\times 3 = 12. (4 added 3 times).',
                    tip: 'The product of two natural numbers is always a natural number.'
                },
                {
                    title: 'Division & Quotient ( ÷ )',
                    f: 'a \\div b = q',
                    d: 'Splitting an amount into equal groups.',
                    ex: '12 \\div 3 = 4.',
                    tip: 'Not all divisions of natural numbers result in a natural number (e.g., 5 ÷ 2 = 2.5).'
                }
            ]
        }
    }
];

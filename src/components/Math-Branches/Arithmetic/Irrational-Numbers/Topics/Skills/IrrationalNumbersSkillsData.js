import { genSkill1Q, genSkill1A, genSkill2Q, genSkill2A } from './IrrationalNumbersSkillsData_Part1';
import { genSkill3Q, genSkill3A } from './IrrationalNumbersSkillsData_Part2';

export const SKILLS = [
    {
        id: 'estimating',
        title: 'Estimating Roots',
        subtitle: 'Finding the Boundaries',
        icon: '🎯',
        color: '#f43f5e',
        desc: 'Learn how to estimate the value of irrational square roots by pinning them between perfect squares.',
        practice: genSkill1Q,
        assessment: genSkill1A,
        learn: {
            concept: 'Even though we cannot write down the exact decimal form of $\\sqrt{10}$, we can estimate it easily! Since we know perfect squares ($3^2 = 9$ and $4^2 = 16$), $\\sqrt{10}$ MUST live between 3 and 4.',
            rules: [
                {
                    title: 'Finding the Integers',
                    f: '\\sqrt{9} < \\sqrt{10} < \\sqrt{16} \\Rightarrow 3 < \\sqrt{10} < 4',
                    d: 'Find the closest perfect square below the number, and the closest one above it.',
                    ex: '$\\sqrt{20}$ is between $4$ ($\\sqrt{16}$) and $5$ ($\\sqrt{25}$).',
                    tip: 'Memorizing perfect squares up to $12^2 = 144$ is a massive time-saver!'
                },
                {
                    title: 'Estimating Decimals',
                    f: '\\sqrt{10} \\approx 3.1',
                    d: 'Look at how close the number is to the bounding squares. 10 is very close to 9, so $\\sqrt{10}$ is very close to 3.',
                    ex: '$\\sqrt{24}$ is very close to $\\sqrt{25}$, so it must be roughly $4.9$.',
                    tip: 'If it is exactly in the middle between two squares, guess $.5$.'
                }
            ]
        }
    },
    {
        id: 'operations',
        title: 'Irrational Operations',
        subtitle: 'Mixing Number Types',
        icon: '⚡',
        color: '#6366f1',
        desc: 'Predict what happens when you combine rational and irrational numbers together.',
        practice: genSkill2Q,
        assessment: genSkill2A,
        learn: {
            concept: 'Combining different types of numbers (like $3 + \\pi$) usually results in an irrational mess. However, in specific cases, two irrational numbers can combine to form a perfectly clean rational number!',
            rules: [
                {
                    title: 'The Contagion Rule',
                    f: '\\text{Rational} + \\text{Irrational} = \\text{Irrational}',
                    d: 'Adding, subtracting, or multiplying (by a non-zero) a rational number with an irrational number always "infects" the result, making it totally irrational.',
                    ex: '$5 + \\sqrt{2}$ is completely irrational.',
                    tip: 'You can\'t fix an infinite, non-repeating decimal just by adding a solid integer to it!'
                },
                {
                    title: 'The Cancellation Rule',
                    f: '\\sqrt{a} \\times \\sqrt{a} = a',
                    d: 'Multiplying square roots together multiplies the numbers inside the root! If they form a perfect square, they become rational.',
                    ex: '$\\sqrt{2} \\times \\sqrt{8} = \\sqrt{16} = 4$ (Rational!).',
                    tip: 'This is the most common trick in algebra!'
                }
            ]
        }
    },
    {
        id: 'fundamental_operations',
        title: 'Fundamental Operations',
        subtitle: 'Surd & Pi Arithmetic',
        icon: '🧮',
        color: '#f59e0b',
        desc: 'Master basic operations with surds and $\\pi$ using 20 dynamic challenges.',
        practice: genSkill3Q,
        assessment: genSkill3A,
        learn: {
            concept: 'Operating with irrational numbers like $\\sqrt{2}$ or $\\pi$ is very similar to using variables in algebra (like $x$). You can only combine "like terms"!',
            rules: [
                {
                    title: 'Like Terms (Add/Sub)',
                    f: 'a\\sqrt{s} + b\\sqrt{s} = (a+b)\\sqrt{s}',
                    d: 'You can only add or subtract surds if the number inside the root is the SAME.',
                    ex: '$2\\sqrt{3} + 5\\sqrt{3} = 7\\sqrt{3}$ but $2\\sqrt{3} + 5\\sqrt{2}$ cannot be simplified.',
                    tip: 'Treat $\\sqrt{s}$ like a fruit. 2 apples + 5 apples = 7 apples.'
                },
                {
                    title: 'Multiplying Surds',
                    f: '\\sqrt{a} \\times \\sqrt{b} = \\sqrt{a \\times b}',
                    d: 'Unlike addition, you CAN multiply different surds together by multiplying the numbers inside.',
                    ex: '$\\sqrt{2} \\times \\sqrt{3} = \\sqrt{6}$',
                    tip: 'This works for division too: $\\sqrt{a} / \\sqrt{b} = \\sqrt{a/b}$.'
                },
                {
                    title: 'Squaring a Root',
                    f: '(\\sqrt{a})^2 = a',
                    d: 'Squaring a square root cancels it out completely, leaving the original number.',
                    ex: '$(\\sqrt{7})^2 = 7$',
                    tip: 'This is the fastest way to turn an irrational number back into a rational one.'
                },
                {
                    title: 'Operating with Pi',
                    f: 'a\\pi + b\\pi = (a+b)\\pi',
                    d: 'Just like surds, $\\pi$ acts as a label. Combine the coefficients (the numbers in front).',
                    ex: '$10\\pi - 4\\pi = 6\\pi$.',
                    tip: 'Unless asked for a decimal estimate, always leave $\\pi$ in your final answer.'
                }
            ]
        }
    }
];

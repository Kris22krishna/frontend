import { 
    generateNumberSequenceQuestions, 
    generateShapeSequenceQuestions, 
    generateSpecialPatternQuestions 
} from './patternsQuestions';

export const SKILLS = [
    {
        id: 'pat-6-01',
        nodeId: 'a4061001-0004-0000-0000-000000000000',
        title: 'Number Sequences',
        subtitle: 'Arithmetic & Rules',
        icon: '🔢',
        color: '#0891b2',
        desc: 'Master number patterns with addition, subtraction, and multiplication rules.',
        learn: {
            concept: 'Understanding Number Sequences',
            rules: [
                {
                    title: 'Arithmetic Sequences',
                    f: 'a, a+d, a+2d, \\dots',
                    d: 'A sequence where each term is found by adding a constant value to the previous term.',
                    ex: '5, 8, 11, 14 (Rule: +3)',
                    tip: 'Subtract any term from the next one to find the common difference!'
                },
                {
                    title: 'Decreasing Sequences',
                    f: 'a, a-d, a-2d, \\dots',
                    d: 'Patterns where numbers get smaller by a fixed amount at each step.',
                    ex: '100, 95, 90, 85 (Rule: -5)',
                    tip: 'If numbers are dropping, your rule will be subtraction or division.'
                }
            ]
        },
        practice: generateNumberSequenceQuestions,
        assessment: generateNumberSequenceQuestions
    },
    {
        id: 'pat-6-02',
        nodeId: 'a4061001-0005-0000-0000-000000000000',
        title: 'Shape & Geometry',
        subtitle: 'Visual Reasoning',
        icon: '🔺',
        color: '#7c3aed',
        desc: 'Identify and continue geometric patterns using shapes and symmetry.',
        learn: {
            concept: 'Visual Pattern Recognition',
            rules: [
                {
                    title: 'Growing Shape Patterns',
                    f: 'S_1, S_2, S_3, \\dots',
                    d: 'Visual patterns where the number of elements or the complexity of a shape increases regularly.',
                    ex: '1 triangle, 2 triangles, 3 triangles...',
                    tip: 'Count the number of sides or components in each step!'
                }
            ]
        },
        practice: generateShapeSequenceQuestions,
        assessment: generateShapeSequenceQuestions
    },
    {
        id: 'pat-6-03',
        nodeId: 'a4061001-0006-0000-0000-000000000000',
        title: 'Special Patterns',
        subtitle: 'Squares & Triangles',
        icon: '💎',
        color: '#059669',
        desc: 'Explore square numbers, triangular numbers, and their fascinating relationships.',
        learn: {
            concept: 'Square & Triangular Numbers',
            rules: [
                {
                    title: 'Square Numbers',
                    f: 'n^2 = 1, 4, 9, 16, \\dots',
                    d: 'Numbers that can be arranged in a perfect square grid pattern.',
                    ex: '3 × 3 = 9',
                    tip: 'Multiply a number by itself to find its square value!'
                },
                {
                    title: 'Triangular Numbers',
                    f: 'T_n = \\frac{n(n+1)}{2}',
                    d: 'Numbers that can form an equilateral triangle of dots.',
                    ex: '1, 3, 6, 10, 15',
                    tip: 'The next triangular number is found by adding the next consecutive integer!'
                }
            ]
        },
        practice: generateSpecialPatternQuestions,
        assessment: generateSpecialPatternQuestions
    }
];

import {
    generateNumberSequenceQuestions,
    generateShapeSequenceQuestions,
    generateSpecialPatternQuestions,
} from './patternsQuestions';

export const SKILLS = [
    {
        id: 'number-sequences',
        title: 'Number Sequences & Rules',
        subtitle: 'Main Topic 1',
        icon: '🔢',
        color: '#6366f1',
        desc: 'Understand and predict the next numbers in growing/shrinking arithmetic and geometric sequences.',
        practice: generateNumberSequenceQuestions,
        assessment: generateNumberSequenceQuestions,
        learn: {
            concept: 'A number sequence is a list of numbers that follows a specific logical rule.',
            rules: [
                { title: 'Arithmetic Sequences', f: 'a_{n} = a_{n-1} + d', d: 'Sequences that grow or shrink by ADDING or SUBTRACTING a constant amount each time.', ex: '2, 5, 8, 11... (+3)', tip: 'Find the difference between consecutive terms!' },
                { title: 'Geometric Sequences', f: 'a_{n} = a_{n-1} \\times r', d: 'Sequences that grow or shrink by MULTIPLYING or DIVIDING by a constant amount.', ex: '3, 6, 12, 24... (×2)', tip: 'Look for rapid, multiplicative growth!' },
                { title: 'Alternating Sequences', f: '+ / -', d: 'Sequences that mix two rules or flip back and forth between states.', ex: '10, 5, 12, 6, 14... (-5, +7)', tip: 'Test if odd positions and even positions follow different rules!' },
            ]
        }
    },
    {
        id: 'shape-sequences',
        title: 'Shape Patterns & Geometry',
        subtitle: 'Main Topic 2',
        icon: '💠',
        color: '#0891b2',
        desc: 'Analyze visual shape patterns, regular polygons, and translate shapes into numbers.',
        practice: generateShapeSequenceQuestions,
        assessment: generateShapeSequenceQuestions,
        learn: {
            concept: 'Shapes can grow, rotate, and change color following mathematical rules.',
            rules: [
                { title: 'Growing Polygons', f: 'S_{n} = n + 2 \\text{ sides}', d: 'A sequence of shapes where the number of sides increases by 1 each time.', ex: 'Triangle (3), Square (4), Pentagon (5)', tip: 'Count the edges to turn shapes into numbers.' },
                { title: 'Repeating Visuals', f: 'A, B, C, A, B, C...', d: 'A sequence of symbols or colors that repeats in a cyclical pattern.', ex: '🔴 🔵 🟢 🔴 🔵 🟢', tip: 'Find the "core" block that repeats!' },
                { title: 'Fractal Growth', f: '\\text{Recursive}', d: 'Shapes built by repeatedly adding a smaller version of themselves to their edges (like the Koch Snowflake).', ex: '1 triangle \\rightarrow 4 smaller triangles', tip: 'They get infinitely complex but enclose finite space!' },
            ]
        }
    },
    {
        id: 'special-patterns',
        title: 'Special Numbers: Squares & Triangles',
        subtitle: 'Main Topic 3',
        icon: '🔺',
        color: '#f59e0b',
        desc: 'Master the magical properties of Square Numbers and Triangular Numbers.',
        practice: generateSpecialPatternQuestions,
        assessment: generateSpecialPatternQuestions,
        learn: {
            concept: 'Certain numbers form perfect 2D shapes when drawn as dots.',
            rules: [
                { title: 'Square Numbers', f: '1, 4, 9, 16, 25...', d: 'Numbers formed by multiplying an integer by itself. They form perfect grid squares.', ex: '4 \\times 4 = 16', tip: 'Squares are just the sum of odd numbers!' },
                { title: 'Triangular Numbers', f: '1, 3, 6, 10, 15...', d: 'Numbers formed by adding consecutive integers ($1+2+3...$). They form perfect pyramids.', ex: '1+2+3+4 = 10', tip: 'Row 1 has 1 dot, Row 2 has 2, Row 3 has 3!' },
                { title: 'Consecutive Triangles', f: 'T_n + T_{n-1} = n^2', d: 'If you add ANY two consecutive triangular numbers, they interlock perfectly to form a square number.', ex: '6 + 10 = 16', tip: 'Two triangles make a square!' },
            ]
        }
    }
];

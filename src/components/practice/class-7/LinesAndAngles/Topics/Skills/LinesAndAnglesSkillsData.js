import {
    generateBasicConceptsQuestions,
    generateRelatedAnglesQuestions,
    generatePairsOfLinesQuestions,
    generateTransversalPropertiesQuestions,
    generateCheckingParallelQuestions,
    generateApplicationsQuestions
} from './linesAndAnglesQuestions';

export const SKILLS = [
    {
        id: 'basic-concepts',
        title: 'Basic Concepts of Lines and Angles',
        subtitle: 'Main Topic 1',
        icon: '📐',
        color: '#6366f1',
        desc: 'Identify lines, line segments, rays, and classify angles correctly.',
        practice: generateBasicConceptsQuestions(),
        assessment: generateBasicConceptsQuestions(),
        learn: {
            concept: 'Understanding the basic building blocks of geometry helps us analyze more complex shapes.',
            rules: [
                { title: 'Line vs Segment vs Ray', f: '\\text{Definitions}', d: 'A line goes on forever, a segment has two endpoints, and a ray has one endpoint.', ex: '\\text{Ray } OP, \\text{Segment } AB', tip: 'Look at the arrows on the ends of the drawn figure!' },
                { title: 'Types of Angles', f: '\\text{Acute, Right, Obtuse}', d: 'Angles are classified by size. Acute < 90°, Right = 90°, Obtuse is between 90° and 180°.', ex: '90° = \\text{Right Angle}', tip: 'Use the corner of a piece of paper as a 90° reference.' },
            ]
        }
    },
    {
        id: 'related-angles',
        title: 'Related Angles',
        subtitle: 'Main Topic 2',
        icon: '🧩',
        color: '#10b981',
        desc: 'Work with complementary and supplementary angle pairs.',
        practice: generateRelatedAnglesQuestions(),
        assessment: generateRelatedAnglesQuestions(),
        learn: {
            concept: 'Pairs of angles often have a special relationship based on their sum.',
            rules: [
                { title: 'Complementary', f: 'a + b = 90°', d: 'Two angles that add up to exactly 90 degrees.', ex: '40° + 50° = 90°', tip: 'C comes before S, 90 comes before 180.' },
                { title: 'Supplementary', f: 'a + b = 180°', d: 'Two angles that add up to exactly 180 degrees (a straight line).', ex: '60° + 120° = 180°', tip: 'Supplementary angles form a straight line.' },
            ]
        }
    },
    {
        id: 'pairs-of-lines',
        title: 'Pairs of Lines',
        subtitle: 'Main Topic 3',
        icon: '⚔️',
        color: '#f59e0b',
        desc: 'Understand intersecting lines, transversals, and vertically opposite angles.',
        practice: generatePairsOfLinesQuestions(),
        assessment: generatePairsOfLinesQuestions(),
        learn: {
            concept: 'When two or more lines cross each other, specific angle patterns emerge.',
            rules: [
                { title: 'Intersecting Lines', f: '\\text{Form an X}', d: 'Two lines crossing at exactly one point.', ex: '\\text{Road intersections}', tip: 'Vertically opposite angles are always equal.' },
                { title: 'Transversal', f: '\\text{Cuts multiple lines}', d: 'A line that passes through two or more other lines at distinct points.', ex: '\\text{A railway crossing over roads}', tip: 'A transversal creates 8 distinct angles when it cuts 2 lines.' },
            ]
        }
    },
    {
        id: 'transversal-properties',
        title: 'Transversal & Parallel Lines',
        subtitle: 'Main Topic 4',
        icon: '⚡',
        color: '#0891b2',
        desc: 'Identify corresponding, alternate interior, and consecutive interior angles.',
        practice: generateTransversalPropertiesQuestions(),
        assessment: generateTransversalPropertiesQuestions(),
        learn: {
            concept: 'When a transversal intersects PARALLEL lines, special angle equalities exist.',
            rules: [
                { title: 'Corresponding Angles', f: '\\text{F-Shape}', d: 'Angles in the same relative position at each intersection. They are EQUAL.', ex: '\\angle 1 = \\angle 5', tip: 'If you slide one angle down the transversal, it perfectly covers the other.' },
                { title: 'Alternate Interior', f: '\\text{Z-Shape}', d: 'Angles on opposite sides of the transversal, between the parallel lines. They are EQUAL.', ex: '\\angle 3 = \\angle 6', tip: 'Look for the Z shape formed by the lines.' },
                { title: 'Interior on Same Side', f: '\\text{Sum} = 180°', d: 'Also known as consecutive interior angles. They are SUPPLEMENTARY.', ex: '\\angle 4 + \\angle 6 = 180°', tip: 'These form a C or U shape.' },
            ]
        }
    },
    {
        id: 'check-parallel',
        title: 'Checking for Parallel Lines',
        subtitle: 'Main Topic 5',
        icon: '⏸️',
        color: '#f43f5e',
        desc: 'Use angle properties to determine if two lines are truly parallel.',
        practice: generateCheckingParallelQuestions(),
        assessment: generateCheckingParallelQuestions(),
        learn: {
            concept: 'Angle properties work both ways! You can use them to prove lines are parallel.',
            rules: [
                { title: 'Proving Parallel', f: '\\text{Check Equality}', d: 'If corresponding or alternate interior angles are equal, the lines MUST be parallel.', ex: '\\text{If } \\angle_1 = \\angle_2 \\text{, then } l \\parallel m', tip: 'If the measurements are off by even 1 degree, the lines are not parallel.' },
                { title: 'Proving Intersecting', f: '\\text{Sum} \\neq 180°', d: 'If interior angles on the same side do not sum to exactly 180°, the lines will eventually intersect.', ex: '100° + 70° = 170° \\implies \\text{Intersecting}', tip: 'Lines that are not parallel will always intersect at some point on a plane.' },
            ]
        }
    },
    {
        id: 'applications',
        title: 'Applications Problem Solving',
        subtitle: 'Main Topic 6',
        icon: '🧠',
        color: '#8b5cf6',
        desc: 'Apply all rules to solve complex algebraic geometry problems.',
        practice: generateApplicationsQuestions(),
        assessment: generateApplicationsQuestions(),
        learn: {
            concept: 'Combine angle equalities and algebraic equations to find unknown values.',
            rules: [
                { title: 'Setting up Equations', f: 'ax + b = cx + d', d: 'Identify the relationship (Equal or Supplementary), set up the equation, and solve for x.', ex: '2x = 50 \\implies x=25', tip: 'Always ask: Are these angles equal or supplementary?' },
            ]
        }
    }
];

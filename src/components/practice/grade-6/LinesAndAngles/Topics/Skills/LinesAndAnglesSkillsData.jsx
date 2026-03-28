import {
    generateLinesAndSegmentsQuestions,
    generateClassifyingAnglesQuestions,
    generateMeasuringAnglesQuestions,
} from './linesAndAnglesQuestions';

export const SKILLS = [
    {
        id: 'lines-segments-rays',
        title: 'Lines, Segments & Rays',
        subtitle: 'Skill 1',
        icon: '↔️',
        color: '#6366f1',
        desc: 'Master the core building blocks of geometry. Learn to identify and distinguish lines, segments, rays, and intersecting points.',
        practice: generateLinesAndSegmentsQuestions,
        assessment: generateLinesAndSegmentsQuestions,
        learn: {
            concept: 'Geometry begins with simple elements that build up to complex shapes.',
            rules: [
                { title: 'The Point', f: 'P', d: 'A precise location in space with no dimensions. We mark it with a dot and name it with a capital letter.', ex: 'Point A', tip: 'The smallest building block!' },
                { title: 'Line Segment', f: '\\overline{AB}', d: 'The shortest path connecting two points. It has two ends and a fixed, measurable length.', ex: 'Line segment of 5 cm', tip: 'Segments have two fixed endpoints.' },
                { title: 'The Line', f: '\\overleftrightarrow{AB}', d: 'A segment extended infinitely in both directions. It has no endpoints and impossible to measure.', ex: 'Line $l$', tip: 'Lines go on forever!' },
                { title: 'The Ray', f: '\\overrightarrow{AB}', d: 'Starts at one fixed point and goes infinitely in one direction. Like a flashlight beam.', ex: 'Sun rays', tip: 'One starting point, no ending point.' },
            ]
        }
    },
    {
        id: 'classifying-angles',
        title: 'Classifying Angles',
        subtitle: 'Skill 2',
        icon: '📐',
        color: '#0891b2',
        desc: 'Analyze angles and classify them accurately into acute, right, obtuse, straight, and reflex types.',
        practice: generateClassifyingAnglesQuestions,
        assessment: generateClassifyingAnglesQuestions,
        learn: {
            concept: 'Angles are formed by two rays meeting at a common vertex.',
            rules: [
                { title: 'Acute Angle', f: '0^\\circ < \\theta < 90^\\circ', d: 'An angle that is smaller than a square corner. It looks sharp.', ex: '45^\\circ', tip: 'Acute means small and sharp!' },
                { title: 'Right & Straight', f: '90^\\circ, 180^\\circ', d: 'A right angle forms a perfect square corner ($90^\\circ$). A straight angle forms a flat line ($180^\\circ$).', ex: 'Book corner = 90^\\circ', tip: 'Right = Quarter Turn, Straight = Half Turn.' },
                { title: 'Obtuse Angle', f: '90^\\circ < \\theta < 180^\\circ', d: 'An angle larger than a right angle but smaller than a straight line. It looks blunt.', ex: '120^\\circ', tip: 'Obtuse = Wide!' },
                { title: 'Reflex Angle', f: '180^\\circ < \\theta < 360^\\circ', d: 'An angle that curves beyond a straight line. It is the "outside" of acute/obtuse angles.', ex: '270^\\circ', tip: 'Reflex bends backwards!' },
            ]
        }
    },
    {
        id: 'measuring-angles',
        title: 'Measuring Rotations',
        subtitle: 'Skill 3',
        icon: '🔄',
        color: '#f59e0b',
        desc: 'Understand angles as a measure of rotation or turns. Work with degrees and protractor readings.',
        practice: generateMeasuringAnglesQuestions,
        assessment: generateMeasuringAnglesQuestions,
        learn: {
            concept: 'We measure how much an object rotates around a central point.',
            rules: [
                { title: 'Full Turn', f: '360^\\circ', d: 'A complete rotation back to the starting position is divided into exactly $360$ degrees.', ex: 'A clock hand going full circle', tip: '1 Full Revolution = $360^\\circ$' },
                { title: 'Half Turn', f: '180^\\circ', d: 'Rotating exactly halfway around. You end up facing the opposite direction.', ex: 'Facing North \\rightarrow South', tip: 'Half a pie is $180^\\circ$' },
                { title: 'Quarter Turn', f: '90^\\circ', d: 'Rotating a quarter of the way, forming a perfect right angle ($90^\\circ$).', ex: 'Facing North \\rightarrow East', tip: 'Quarter of a circle!' },
            ]
        }
    }
];

import React from 'react';
import { generateConstructionQuestions } from './constructionsQuestions';
import {
    LearnCircleDrawing,
    LearnWavyWave,
    LearnRectangleLabeled,
    LearnSquareRotation,
    LearnSquareConstruction,
    LearnRectDiagonal,
    LearnDiagonals,
    LearnHouseArcs
} from '../components/LearnWidgets';

export const SKILLS = [
    {
        id: 'circles-compass',
        nodeId: 'circles-compass',
        title: 'Circles & Compass Basics',
        subtitle: 'Skill 1',
        desc: 'Understand how a compass draws circles, what radius means, and how to create wavy waves using semicircles.',
        color: '#0ea5e9',
        icon: '⭕',
        learn: {
            rules: [
                {
                    title: 'Drawing a Circle',
                    f: '\\text{All points at distance } r \\text{ from centre } P \\text{ form a circle}',
                    img: <LearnCircleDrawing />,
                    d: 'Fix the pointed end of the compass at point P. Open the compass to the desired radius (e.g., 4 cm). Rotate the pencil end a full 360° around P. The curve you get is a circle!',
                    tip: 'Every single point on the circle is at the SAME distance (the radius) from the centre P.',
                    ex: 'Opening the compass to 4 cm and rotating it gives a circle of radius 4 cm.'
                },
                {
                    title: 'Wavy Waves',
                    f: '\\text{Semicircles alternate above and below a central line}',
                    img: <LearnWavyWave />,
                    d: 'To draw a wavy wave, divide a line segment into equal parts. For each part, draw a semicircle alternating above and below the line. The radius of each semicircle is half the length of each part.',
                    tip: 'If your line is 8 cm and you want 4 waves, each semicircle has diameter 2 cm and radius 1 cm.',
                    ex: 'AB = 8 cm with 4 waves → each semicircle radius = 1 cm'
                }
            ]
        },
        practice: () => generateConstructionQuestions('circles-compass', 20),
        assessment: () => generateConstructionQuestions('circles-compass', 20)
    },
    {
        id: 'squares-rectangles',
        nodeId: 'squares-rectangles',
        title: 'Squares & Rectangles',
        subtitle: 'Skill 2',
        desc: 'Identify and distinguish between squares and rectangles based on their properties. Understand naming and rotation.',
        color: '#8b5cf6',
        icon: '⬜',
        learn: {
            rules: [
                {
                    title: 'Rectangle Properties',
                    f: '\\text{R1: Opposite sides are equal, R2: All angles are } 90^\\circ',
                    img: <LearnRectangleLabeled />,
                    d: 'A rectangle is a 4-sided figure where: (1) opposite sides are equal in length, and (2) every corner angle is exactly 90°. The sides and corners are named in traversal order (e.g., ABCD).',
                    tip: 'A valid name like ABCD means you travel through corners A→B→C→D in order around the shape.',
                    ex: 'ABCD with AB = CD = 8 cm, BC = AD = 4 cm'
                },
                {
                    title: 'Square Properties',
                    f: '\\text{S1: All four sides are equal, S2: All angles are } 90^\\circ',
                    img: <LearnSquareRotation />,
                    d: 'A square is a special rectangle where ALL four sides are equal. It satisfies both rectangle properties AND has equal sides. Rotating it doesn\'t change anything!',
                    tip: 'Every square is a rectangle, but not every rectangle is a square.',
                    ex: 'PQRS with PQ = QR = RS = SP = 6 cm'
                }
            ]
        },
        practice: () => generateConstructionQuestions('squares-rectangles', 20),
        assessment: () => generateConstructionQuestions('squares-rectangles', 20)
    },
    {
        id: 'construction-steps',
        nodeId: 'construction-steps',
        title: 'Construction Techniques',
        subtitle: 'Skill 3',
        desc: 'Learn the step-by-step process of constructing rectangles and squares using ruler and compass.',
        color: '#10b981',
        icon: '📏',
        learn: {
            rules: [
                {
                    title: 'Constructing a Square',
                    f: '\\text{PQ} \\rightarrow \\perp \\text{ at P} \\rightarrow \\text{Mark S} \\rightarrow \\perp \\text{ at Q} \\rightarrow \\text{Mark R}',
                    img: <LearnSquareConstruction />,
                    d: 'Step 1: Draw base PQ with the given length. Step 2: Draw a perpendicular line at P. Step 3: Using the compass, mark point S on the perpendicular so that PS = PQ. Step 4: Draw a perpendicular at Q and mark R so that QR = PQ. Step 5: Join SR.',
                    tip: 'Use the compass to "copy" the length PQ to PS and QR — this ensures all sides are exactly equal!',
                    ex: 'Square PQRS of side 6 cm: PQ = PS = QR = SR = 6 cm'
                },
                {
                    title: 'Rectangle from Side & Diagonal',
                    f: '\\text{Base} + \\perp + \\text{Arc(diagonal)} = \\text{Corner}',
                    img: <LearnRectDiagonal />,
                    d: 'When given a side and a diagonal: Step 1: Draw the base (e.g., CD = 5 cm). Step 2: Draw a perpendicular at C (call it line l). Step 3: Open compass to the diagonal length (e.g., 7 cm). With D as centre, draw an arc to cross line l. The intersection point is corner B!',
                    tip: 'The arc finds the exact point that is the right distance away — no guessing needed!',
                    ex: 'Rectangle with side 5 cm and diagonal 7 cm'
                }
            ]
        },
        practice: () => generateConstructionQuestions('construction-steps', 20),
        assessment: () => generateConstructionQuestions('construction-steps', 20)
    },
    {
        id: 'diagonals-arcs',
        nodeId: 'diagonals-arcs',
        title: 'Diagonals & Arcs',
        subtitle: 'Skill 4',
        desc: 'Explore diagonal properties of rectangles and squares, and use intersecting arcs to find equidistant points.',
        color: '#ef4444',
        icon: '📐',
        learn: {
            rules: [
                {
                    title: 'Diagonals of a Rectangle',
                    f: '\\text{In rectangle PQRS: } PR = QS',
                    img: <LearnDiagonals />,
                    d: 'A diagonal connects two opposite corners of a rectangle. Every rectangle has exactly two diagonals, and they are always equal in length. A diagonal divides each opposite corner angle into two (usually unequal) parts.',
                    tip: 'The diagonals divide opposite angles equally ONLY when the rectangle is actually a square (each angle splits into 45° + 45°).',
                    ex: 'In rectangle PQRS, diagonal PR = diagonal QS.'
                },
                {
                    title: 'Equidistant Points using Arcs',
                    f: '\\text{Arc from B} \\cap \\text{Arc from C} = \\text{Point A}',
                    img: <LearnHouseArcs />,
                    d: 'To find a point A that is exactly the same distance (say 5 cm) from two points B and C: Draw an arc of radius 5 cm centred at B. Draw another arc of radius 5 cm centred at C. Where the arcs cross is where point A is! This is the "House" construction principle.',
                    tip: 'You don\'t need to draw full circles — just the arcs near where you expect the intersection.',
                    ex: 'House roof point A is 5 cm from both B and C, found via two intersecting arcs.'
                }
            ]
        },
        practice: () => generateConstructionQuestions('diagonals-arcs', 20),
        assessment: () => generateConstructionQuestions('diagonals-arcs', 20)
    }
];

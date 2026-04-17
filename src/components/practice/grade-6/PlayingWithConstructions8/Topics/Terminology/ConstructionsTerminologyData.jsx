import React from 'react';
import {
    CompassTermWidget,
    RadiusTermWidget,
    PerpendicularTermWidget,
    DiagonalTermWidget,
    ArcTermWidget,
    RightAngleTermWidget,
    EquidistantTermWidget
} from '../components/TerminologyWidgets';

export const terminologyDocs = [
    {
        id: 'compass',
        name: 'Compass',
        def: 'A drawing tool with a pointed end and a pencil end. When the pointed end is fixed and the pencil end is rotated, it draws a circle. Every point on the circle is at the same distance from the fixed point.',
        ex: '\\text{A compass with opening 4 cm draws a circle of radius 4 cm.}',
        color: '#0ea5e9',
        interactiveWidget: <CompassTermWidget />
    },
    {
        id: 'radius',
        name: 'Radius',
        def: 'The distance between the centre of a circle and any point on the circle. All radii of a circle are equal in length.',
        ex: '\\text{If the compass opening is 5 cm, the radius is 5 cm.}',
        color: '#3b82f6',
        interactiveWidget: <RadiusTermWidget />
    },
    {
        id: 'perpendicular',
        name: 'Perpendicular',
        def: 'A line that meets another line at exactly 90° (a right angle). In constructions, we draw perpendiculars to create the corners of rectangles and squares.',
        ex: '\\text{Each corner of a rectangle has a } 90^\\circ \\text{ angle.}',
        color: '#8b5cf6',
        interactiveWidget: <PerpendicularTermWidget />
    },
    {
        id: 'diagonal',
        name: 'Diagonal',
        def: 'A straight line connecting two non-adjacent corners of a rectangle or square. A rectangle has two diagonals which are always equal in length.',
        ex: '\\text{In rectangle PQRS, diagonals PR and QS are equal.}',
        color: '#10b981',
        interactiveWidget: <DiagonalTermWidget />
    },
    {
        id: 'arc',
        name: 'Arc',
        def: 'A part (portion) of a circle. When you don\'t need the full circle, you can draw just an arc. Arcs are used to locate specific points in constructions.',
        ex: '\\text{An arc is used to mark a point at a known distance from a given point.}',
        color: '#f59e0b',
        interactiveWidget: <ArcTermWidget />
    },
    {
        id: 'right-angle',
        name: 'Right Angle (90°)',
        def: 'An angle that measures exactly 90 degrees. All corners of squares and rectangles are right angles. A right angle is marked with a small square symbol at the corner.',
        ex: '\\angle A = \\angle B = \\angle C = \\angle D = 90^\\circ',
        color: '#ec4899',
        interactiveWidget: <RightAngleTermWidget />
    },
    {
        id: 'equidistant',
        name: 'Equidistant Point',
        def: 'A point that is at the same distance from two or more given points. In the "House" construction, the roof point A is equidistant from points B and C, found using intersecting arcs.',
        ex: '\\text{Point A is 5 cm from both B and C.}',
        color: '#ef4444',
        interactiveWidget: <EquidistantTermWidget />
    }
];

export const terminologyQuiz = [
    {
        question: "What tool is used to draw a perfect circle?",
        options: ["Ruler", "Protractor", "Compass"],
        correct: 2,
        explanation: "A **compass** draws circles by keeping one end fixed and rotating the pencil end around it."
    },
    {
        question: "What is the distance from the centre of a circle to any point on its boundary called?",
        options: ["Diameter", "Radius", "Arc"],
        correct: 1,
        explanation: "The **radius** is the distance from the centre to any point on the circle."
    },
    {
        question: "A line meeting another line at 90° is called a:",
        options: ["Parallel line", "Perpendicular line", "Diagonal"],
        correct: 1,
        explanation: "A **perpendicular** line meets another at exactly 90 degrees."
    },
    {
        question: "In a rectangle, the diagonals are always:",
        options: ["Perpendicular", "Equal in length", "Parallel"],
        correct: 1,
        explanation: "The two diagonals of a rectangle are always **equal in length**."
    },
    {
        question: "An arc is:",
        options: ["A full circle", "A part of a circle", "A straight line"],
        correct: 1,
        explanation: "An **arc** is a portion of a circle's boundary."
    },
    {
        question: "All the angles of a square are:",
        options: ["60°", "90°", "120°"],
        correct: 1,
        explanation: "Every corner of a square is a **right angle (90°)**."
    },
    {
        question: "Which property is TRUE for a square but NOT necessarily for a rectangle?",
        options: ["All angles are 90°", "Opposite sides are equal", "All four sides are equal"],
        correct: 2,
        explanation: "In a square, **all four sides are equal**. In a rectangle, only opposite sides need to be equal."
    },
    {
        question: "In the 'House' construction, how is the roof point A located?",
        options: ["Using a ruler only", "By drawing intersecting arcs from B and C", "By guessing"],
        correct: 1,
        explanation: "Point A is found at the **intersection of two arcs** of equal radius drawn from B and C."
    },
    {
        question: "If you rotate a square, does it stop being a square?",
        options: ["Yes", "No"],
        correct: 1,
        explanation: "**No!** Rotating a square doesn't change its side lengths or angles — it remains a square."
    },
    {
        question: "A 'Wavy Wave' is constructed using repeated:",
        options: ["Straight lines", "Semi-circles (half circles)", "Full circles"],
        correct: 1,
        explanation: "Wavy waves are drawn using **semi-circles** of equal radius alternating above and below a central line."
    }
];

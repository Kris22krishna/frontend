import React from 'react';
import TermLineOfSymmetryInteractive from './Interactives/TermLineOfSymmetryInteractive';
import TermReflectionInteractive from './Interactives/TermReflectionInteractive';
import TermCenterOfRotationInteractive from './Interactives/TermCenterOfRotationInteractive';
import TermAngleOfSymmetryInteractive from './Interactives/TermAngleOfSymmetryInteractive';
import TermOrderOfSymmetryInteractive from './Interactives/TermOrderOfSymmetryInteractive';
import TermAsymmetryInteractive from './Interactives/TermAsymmetryInteractive';

export const terminologyDocs = [
    {
        id: 'line-of-symmetry',
        name: 'Line of Symmetry',
        def: 'A line that divides a figure into two parts that exactly overlap when folded along that line. Also called the Axis of Symmetry.',
        ex: '\\text{A square has 4 lines of symmetry}',
        color: '#0ea5e9',
        interactiveWidget: <TermLineOfSymmetryInteractive />
    },
    {
        id: 'reflection-symmetry',
        name: 'Reflection Symmetry',
        def: 'When one half of a figure is the mirror image of the other half across a line of symmetry. Points on one side reflect to corresponding points on the other side.',
        ex: `\\text{Point A reflects to A\\' across the mirror line}`,
        color: '#a855f7',
        interactiveWidget: <TermReflectionInteractive />
    },
    {
        id: 'center-of-rotation',
        name: 'Center of Rotation',
        def: 'The fixed point about which a figure is rotated. When a figure has rotational symmetry, rotating it about this point makes it look exactly the same.',
        ex: '\\text{The centre of a square is its centre of rotation}',
        color: '#ef4444',
        interactiveWidget: <TermCenterOfRotationInteractive />
    },
    {
        id: 'angle-of-symmetry',
        name: 'Angle of Symmetry',
        def: 'The smallest angle through which a figure can be rotated about its centre to look exactly the same. All other angles of symmetry are multiples of this smallest angle.',
        ex: '\\text{Square: 90°, 180°, 270°, 360°}',
        color: '#f59e0b',
        interactiveWidget: <TermAngleOfSymmetryInteractive />
    },
    {
        id: 'order-of-symmetry',
        name: 'Order of Rotational Symmetry',
        def: 'The number of times a figure maps onto itself during a full 360° rotation. A square has order 4, an equilateral triangle has order 3.',
        ex: '\\text{Order} = \\frac{360°}{\\text{smallest angle of symmetry}}',
        color: '#10b981',
        interactiveWidget: <TermOrderOfSymmetryInteractive />
    },
    {
        id: 'asymmetry',
        name: 'Asymmetrical Figures',
        def: 'A figure that has NO line of symmetry and NO rotational symmetry (other than 360°). It cannot be folded or rotated to overlap itself.',
        ex: '\\text{A random cloud shape is asymmetrical}',
        color: '#ec4899',
        interactiveWidget: <TermAsymmetryInteractive />
    }
];

export const terminologyQuiz = [
    {
        question: "What is a line that divides a figure into two mirror halves called?",
        options: ["Centre of Rotation", "Line of Symmetry", "Angle of Symmetry"],
        correct: 1,
        explanation: "A **Line of Symmetry** (or Axis of Symmetry) divides the figure into two parts that overlap when folded."
    },
    {
        question: "How many lines of symmetry does a square have?",
        options: ["2", "4", "8"],
        correct: 1,
        explanation: "A square has **4** lines of symmetry: vertical, horizontal, and two diagonal lines."
    },
    {
        question: "What is the fixed point about which a figure is rotated called?",
        options: ["Axis of Symmetry", "Centre of Rotation", "Order of Symmetry"],
        correct: 1,
        explanation: "The **Centre of Rotation** is the fixed point about which the figure rotates."
    },
    {
        question: "What are the angles of symmetry of a windmill (4 blades)?",
        options: ["90°, 180°, 270°, 360°", "60°, 120°, 180°, 360°", "45°, 90°, 180°, 360°"],
        correct: 0,
        explanation: "A 4-bladed windmill has angles of symmetry at **90°, 180°, 270°, and 360°**."
    },
    {
        question: "A figure's smallest angle of symmetry is 60°. What are the other angles?",
        options: ["120°, 180°, 240°, 300°, 360°", "90°, 180°, 270°, 360°", "60°, 360°"],
        correct: 0,
        explanation: "All angles of symmetry are **multiples** of the smallest: 60°, 120°, 180°, 240°, 300°, 360°."
    },
    {
        question: "Is the diagonal of a rectangle (that is NOT a square) a line of symmetry?",
        options: ["Yes", "No"],
        correct: 1,
        explanation: "**No!** The diagonal of a rectangle does NOT make the two halves overlap when folded."
    },
    {
        question: "What is the order of rotational symmetry of an equilateral triangle?",
        options: ["2", "3", "6"],
        correct: 1,
        explanation: "An equilateral triangle maps onto itself **3** times in a full rotation (at 120°, 240°, 360°)."
    },
    {
        question: "True or False: Every figure has 360° as an angle of symmetry.",
        options: ["True", "False"],
        correct: 0,
        explanation: "**True!** Every figure returns to its original position after a full 360° rotation."
    },
    {
        question: "Can a figure have rotational symmetry but NO line of symmetry?",
        options: ["Yes", "No"],
        correct: 0,
        explanation: "**Yes!** For example, a parallelogram (that is not a rectangle) has 180° rotational symmetry but no line of symmetry."
    },
    {
        question: "How many lines of symmetry does a circle have?",
        options: ["4", "12", "Infinitely many"],
        correct: 2,
        explanation: "A circle has **infinitely many** lines of symmetry — every diameter is a line of symmetry!"
    }
];

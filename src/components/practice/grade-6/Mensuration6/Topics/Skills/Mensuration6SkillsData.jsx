import React from 'react';
import {
    generatePerimeterQuestions,
    generateAreaQuestions,
    generateCompositeQuestions,
    generateTriangleQuestions
} from './mensuration6Questions';

export const SKILLS = [
    {
        id: 'perimeter-basics',
        title: 'Perimeter Tracing',
        subtitle: 'Skill 1',
        icon: '🔗',
        color: '#6366f1',
        desc: 'Trace the outside edges of geometric shapes and calculate the total boundary length.',
        practice: generatePerimeterQuestions,
        assessment: generatePerimeterQuestions,
        learn: {
            concept: 'The perimeter is the total length of the outside boundary of a closed figure.',
            rules: [
                {
                    title: 'The Boundary',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="100" y="40" width="200" height="120" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="8" strokeDasharray="16 8"/>
                            <text x="200" y="110" fontSize="32" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#6366f1">OUTSIDE</text>
                        </svg>
                    ),
                    f: '\\text{Sum of all sides}',
                    d: 'Imagine walking exactly along the border of a park. The distance you cover is the perimeter.',
                    ex: 'Fencing a garden',
                    tip: 'Only add the outside edges. Ignore inside lines!'
                },
                {
                    title: 'Rectangle Formula',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="80" y="60" width="240" height="100" fill="#e0e7ff" stroke="#6366f1" strokeWidth="6"/>
                            <text x="200" y="50" fontSize="24" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#4f46e5">Length (l)</text>
                            <text x="60" y="115" fontSize="24" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#4f46e5" transform="rotate(-90 60 115)">Breadth</text>
                        </svg>
                    ),
                    f: '2 \\times (L + B)',
                    d: 'Because a rectangle has two equal lengths and two equal breadths, add one length and one breadth, then double it.',
                    ex: '2 × (5 + 3) = 16',
                    tip: 'Remember the brackets—add first, then multiply by 2!'
                },
                {
                    title: 'Square Formula',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="140" y="40" width="120" height="120" fill="#e0e7ff" stroke="#6366f1" strokeWidth="6"/>
                            <text x="200" y="30" fontSize="24" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#4f46e5">Side (a)</text>
                            <text x="120" y="105" fontSize="24" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#4f46e5" transform="rotate(-90 120 105)">Side (a)</text>
                        </svg>
                    ),
                    f: '4 \\times \\text{Side}',
                    d: 'A square has 4 identical sides. Instead of adding the same number four times, just multiply by 4.',
                    ex: '4 × 5 = 20',
                    tip: 'Perimeter of any regular polygon is (Sides × Length).'
                }
            ]
        }
    },
    {
        id: 'area-grids',
        title: 'Area Grid Shading',
        subtitle: 'Skill 2',
        icon: '🟩',
        color: '#10b981',
        desc: 'Calculate the inside space of shapes by counting unit squares or using standard area formulas.',
        practice: generateAreaQuestions,
        assessment: generateAreaQuestions,
        learn: {
            concept: 'Area is the amount of surface enclosed inside a closed figure.',
            rules: [
                {
                    title: 'The Inside Space',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="100" y="40" width="200" height="120" rx="4" fill="#10b981" stroke="#059669" strokeWidth="4"/>
                            <text x="200" y="110" fontSize="32" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#fff">INSIDE</text>
                            <line x1="120" y1="60" x2="280" y2="60" stroke="#059669" strokeWidth="1" strokeDasharray="4"/>
                            <line x1="120" y1="80" x2="280" y2="80" stroke="#059669" strokeWidth="1" strokeDasharray="4"/>
                            <line x1="140" y1="40" x2="140" y2="160" stroke="#059669" strokeWidth="1" strokeDasharray="4"/>
                            <line x1="180" y1="40" x2="180" y2="160" stroke="#059669" strokeWidth="1" strokeDasharray="4"/>
                        </svg>
                    ),
                    f: '\\text{Square Units}',
                    d: 'Area measures flat surfaces. It is measured by how many 1x1 squares fit inside the shape.',
                    ex: 'Painting a wall, buying a carpet',
                    tip: 'Always include the "square" in your unit (e.g. cm²).'
                },
                {
                    title: 'Rectangle Area',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="80" y="60" width="240" height="100" fill="#a7f3d0" stroke="#10b981" strokeWidth="6"/>
                            <text x="200" y="115" fontSize="40" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#047857">L × B</text>
                        </svg>
                    ),
                    f: 'L \\times B',
                    d: 'To find the area of a rectangle, completely multiply its two dimensions (Length and Breadth).',
                    ex: '5cm × 3cm = 15 cm²',
                    tip: 'If you know the Area and Length, divide them to find Breadth!'
                },
                {
                    title: 'Square Area',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="140" y="40" width="120" height="120" fill="#a7f3d0" stroke="#10b981" strokeWidth="6"/>
                            <text x="200" y="110" fontSize="40" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#047857">Side × Side</text>
                        </svg>
                    ),
                    f: '\\text{Side} \\times \\text{Side}',
                    d: 'Since length and breadth are identical in a square, just multiply the side by itself.',
                    ex: '4m × 4m = 16 m²',
                    tip: '(Side × Side) is often written as Side² (Side squared).'
                }
            ]
        }
    },
    {
        id: 'shape-decomposition',
        title: 'Shape Decomposition',
        subtitle: 'Skill 3',
        icon: '🧩',
        color: '#f59e0b',
        desc: 'Split complex composite rectilinear shapes into simple rectangles to easily calculate combined area and perimeter.',
        practice: generateCompositeQuestions,
        assessment: generateCompositeQuestions,
        learn: {
            concept: 'Complex rectilinear shapes can be split into simple rectangles to find their area.',
            rules: [
                {
                    title: 'Splitting Shapes',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="120,40 200,40 200,120 280,120 280,200 120,200" fill="#fde68a" stroke="#d97706" strokeWidth="4"/>
                            <line x1="120" y1="120" x2="200" y2="120" stroke="#ea580c" strokeWidth="4" strokeDasharray="8 6"/>
                            <text x="160" y="90" fontSize="24" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#b45309">A</text>
                            <text x="200" y="170" fontSize="24" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#b45309">B</text>
                        </svg>
                    ),
                    f: '\\text{Area}_A + \\text{Area}_B',
                    d: 'Draw imaginary straight lines to cut an L-shape or T-shape into two or more standard rectangles.',
                    ex: 'Split an L shape into a tall rectangle & a wide one.',
                    tip: 'There is often more than one way to split a shape!'
                },
                {
                    title: 'Finding Missing Sides',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="120,40 200,40 200,120 280,120 280,200 120,200" fill="none" stroke="#d97706" strokeWidth="4"/>
                            <text x="160" y="30" fontSize="20" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#d97706">5</text>
                            <text x="240" y="110" fontSize="20" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#d97706">4</text>
                            <text x="200" y="230" fontSize="20" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ea580c">?</text>
                            <line x1="120" y1="210" x2="280" y2="210" stroke="#ea580c" strokeWidth="2" markerStart="url(#arrow)" markerEnd="url(#arrow)"/>
                            <defs>
                                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#ea580c"/>
                                </marker>
                            </defs>
                        </svg>
                    ),
                    f: '\\text{Deduce Lengths}',
                    d: 'If the total bottom width is unknown, add the top horizontal widths together (e.g., 5 + 4 = 9).',
                    ex: 'Bottom = Top Left + Top Right',
                    tip: 'Opposite parallel sides in rectangles always match.'
                },
                {
                    title: 'Composite Perimeter',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="120,40 200,40 200,120 280,120 280,200 120,200" fill="#fef3c7" stroke="#ea580c" strokeWidth="8"/>
                            <line x1="120" y1="120" x2="200" y2="120" stroke="#94a3b8" strokeWidth="4" strokeDasharray="6 6"/>
                            <text x="200" y="110" fontSize="20" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#94a3b8">DO NOT ADD</text>
                        </svg>
                    ),
                    f: '\\text{Only the Outside}',
                    d: 'When finding perimeter, never include the "split lines" you drew inside. Only count the true outside border.',
                    ex: 'Trace only the physical exterior!',
                    tip: 'Perimeter is ALWAYS the strictly outside boundary.'
                }
            ]
        }
    },
    {
        id: 'triangle-area',
        title: 'Area of a Triangle',
        subtitle: 'Skill 4',
        icon: '📐',
        color: '#3b82f6',
        desc: 'Calculate the accurate area of a triangle by imagining a bounding rectangle around it.',
        practice: generateTriangleQuestions,
        assessment: generateTriangleQuestions,
        learn: {
            concept: 'The area of a triangle is always exactly half of its bounding rectangle.',
            rules: [
                {
                    title: 'Right-Angled Triangle',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="100" y="40" width="200" height="120" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="8 8"/>
                            <polygon points="100,40 100,160 300,160" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="4"/>
                            <text x="200" y="120" fontSize="24" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#1d4ed8">Half Area</text>
                        </svg>
                    ),
                    f: '\\text{Rectangle Area} \\div 2',
                    d: 'A diagonal splits a rectangle perfectly into two equal right-angled triangles. Thus, the area of one triangle is half the area of the rectangle.',
                    ex: 'If Rectangle Area is 12, Triangle is 6.',
                    tip: 'Count the full rectangle\'s grid squares, then just divide by 2!'
                },
                {
                    title: 'Arbitrary Triangle',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="80" y="40" width="240" height="120" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="8 8"/>
                            <line x1="200" y1="40" x2="200" y2="160" stroke="#94a3b8" strokeWidth="4" strokeDasharray="8 8"/>
                            <polygon points="200,40 80,160 320,160" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="4"/>
                        </svg>
                    ),
                    f: '\\frac{A_1}{2} + \\frac{A_2}{2}',
                    d: 'For any triangle, you can draw a vertical line from the top tip. This splits the big bounding rectangle into TWO smaller rectangles. The triangle is made of exactly half of the left rectangle, and half of the right rectangle!',
                    ex: 'Total Triangle Area is always HALF the outer rectangle!',
                    tip: 'Even if the triangle points completely diagonally, its area is precisely half its bounding box.'
                }
            ]
        }
    }
];

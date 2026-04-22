import React from 'react';
import { PolySymmetryLines, CircleSymmetry, RotationalPolygon, OrderTracker } from '../components/SymmetryDynamicCharts';

export const SKILLS = [
    {
        id: 'line-symmetry',
        title: 'Line of Symmetry',
        subtitle: 'Skill 1',
        desc: 'Find lines of symmetry, count them for regular polygons, and identify mirror halves.',
        color: '#0ea5e9',
        icon: '🪞',
        learn: {
            rules: [
                {
                    title: 'Regular Polygons',
                    f: '\\text{Lines of Symmetry} = \\val{Number of Sides}',
                    d: 'For regular polygons (where all sides and angles are equal), the number of lines of symmetry is exactly equal to the number of its sides. A regular pentagon has 5 sides, so it has 5 lines of symmetry.',
                    tip: 'Count the vertices (corners). A regular polygon has one line of symmetry passing through each vertex.',
                    ex: 'A regular pentagon (5 sides) has 5 lines of symmetry.',
                    img: <PolySymmetryLines sides={5} color="#0ea5e9" />
                },
                {
                    title: 'The Infinite Circle',
                    f: '\\text{Lines of Symmetry} = \\infty',
                    d: 'A circle is perfectly symmetrical. You can fold it in half across any line that passes exactly through its centre. Since there are infinite ways to draw a line through the centre, a circle has **infinitely many** lines of symmetry.',
                    tip: 'Any diameter of a circle is a line of symmetry!',
                    ex: 'Every fold passing straight through the middle point splits a circle exactly in half.',
                    img: <CircleSymmetry />
                }
            ]
        },
        practice: () => [],
        assessment: () => []
    },
    {
        id: 'rotational-symmetry',
        title: 'Rotational Symmetry',
        subtitle: 'Skill 2',
        desc: 'Find angles of symmetry, order of rotation, and identify rotational patterns.',
        color: '#6366f1',
        icon: '🔄',
        learn: {
            rules: [
                {
                    title: 'Angle of Symmetry',
                    f: '\\text{Multiples of the smallest angle}',
                    d: 'When you rotate an object and it looks exactly the same, you have found an **angle of symmetry**. The smallest angle where this happens is the base angle. All other angles of symmetry are just multiples of this base angle!',
                    tip: 'Always look for the smallest turn that repeats the shape.',
                    ex: 'If the smallest angle is 90°, the next is 180° ($$90 \\times 2$$).',
                    img: <RotationalPolygon sides={4} color="#6366f1" />
                },
                {
                    title: 'Order of Symmetry',
                    f: '\\text{Order} = \\frac{360°}{\\text{Smallest Angle}}',
                    d: 'The **Order of Rotational Symmetry** is simply how many times the shape maps onto itself during one full 360° rotation. A shape with an order of 3 will look identical at 120°, 240°, and 360°.',
                    tip: 'Every shape has an order of at least 1 (360° full circle). We only say it has "rotational symmetry" if the order is > 1.',
                    ex: 'An equilateral triangle has Order 3. $$\\frac{360}{3} = 120°$$ intervals.',
                    img: <OrderTracker />
                }
            ]
        },
        practice: () => [],
        assessment: () => []
    }
];

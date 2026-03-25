import React from 'react';

export const TERMS = [
    {
        name: 'Circle',
        color: '#2563eb',
        icon: '⭕',
        def: 'A collection of all points in a plane which are at a constant distance (radius) from a fixed point (centre).',
        examples: ['A coin, a wheel, a ring'],
        inUse: 'Circles are the foundation of rotary motion and geometry.',
        memory: 'Round boundary, same distance from the centre.',
        illustration: (
            <svg viewBox="0 0 100 100" width="100%" height="120px" style={{ display: 'block', margin: '10px auto' }}>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#2563eb" strokeWidth="3" />
                <circle cx="50" cy="50" r="3" fill="#2563eb" />
                <line x1="50" y1="50" x2="90" y2="50" stroke="#2563eb" strokeWidth="2" strokeDasharray="4" />
                <text x="65" y="45" fill="#2563eb" fontSize="10">r</text>
            </svg>
        )
    },
    {
        name: 'Secant',
        color: '#0d9488',
        icon: '✂️',
        def: 'A line that intersects a circle at exactly two distinct points.',
        examples: ['A line cutting through a pizza', 'Line $AB$ intersecting curve at $P$ and $Q$'],
        inUse: 'A chord is basically a line segment contained within a secant line.',
        memory: 'Secant cuts through (two points).',
        illustration: (
            <svg viewBox="0 0 100 100" width="100%" height="120px" style={{ display: 'block', margin: '10px auto' }}>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#0d9488" strokeWidth="3" />
                <line x1="10" y1="30" x2="90" y2="30" stroke="#0d9488" strokeWidth="3" />
                <circle cx="26.5" cy="30" r="3" fill="#0d9488" />
                <circle cx="73.5" cy="30" r="3" fill="#0d9488" />
            </svg>
        )
    },
    {
        name: 'Tangent',
        color: '#ec4899',
        icon: '➖',
        def: 'A line that intersects a circle at exactly one single point, grazing the outer edge.',
        examples: ['A road touching a tire', 'Line $XY$ touching circle at point $P$'],
        inUse: 'Tangents are perpendicular to the radius at the point of contact.',
        memory: 'Tangent touches (one point).',
        illustration: (
            <svg viewBox="0 0 100 100" width="100%" height="120px" style={{ display: 'block', margin: '10px auto' }}>
                <circle cx="50" cy="30" r="40" fill="none" stroke="#ec4899" strokeWidth="3" />
                <line x1="10" y1="70" x2="90" y2="70" stroke="#ec4899" strokeWidth="3" />
                <circle cx="50" cy="70" r="3" fill="#ec4899" />
            </svg>
        )
    },
    {
        name: 'Point of Contact',
        color: '#f59e0b',
        icon: '📍',
        def: 'The single common point shared by the tangent and the circle.',
        examples: ['Point $P$ where line $XY$ touches the circle'],
        inUse: 'This is the exact point where the $90^\\circ$ angle with the radius is formed.',
        memory: 'The exact meeting spot.',
        illustration: (
            <svg viewBox="0 0 100 100" width="100%" height="120px" style={{ display: 'block', margin: '10px auto' }}>
                <circle cx="50" cy="40" r="30" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.4" />
                <line x1="10" y1="70" x2="90" y2="70" stroke="#f59e0b" strokeWidth="2" opacity="0.4" />
                <circle cx="50" cy="70" r="4" fill="#f59e0b" />
                <text x="58" y="85" fill="#f59e0b" fontSize="12" fontWeight="bold">Point of Contact</text>
            </svg>
        )
    },
    {
        name: 'Radius',
        color: '#7c3aed',
        icon: '📏',
        def: 'A line segment from the center of the circle to any point on its circumference.',
        examples: ['Line segment $OP$ from centre $O$ to point $P$'],
        inUse: 'To use the tangent theorem, always draw a radius to the point of contact.',
        memory: 'Center to edge.',
        illustration: (
            <svg viewBox="0 0 100 100" width="100%" height="120px" style={{ display: 'block', margin: '10px auto' }}>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#7c3aed" strokeWidth="2" />
                <circle cx="50" cy="50" r="3" fill="#7c3aed" />
                <line x1="50" y1="50" x2="16" y2="70" stroke="#7c3aed" strokeWidth="3" />
            </svg>
        )
    },
    {
        name: 'External Point',
        color: '#3b82f6',
        icon: '🔭',
        def: 'A point located strictly outside the boundary of the circle.',
        examples: ['Point $P$ from which two tangents are drawn to the circle'],
        inUse: 'You can draw exactly two tangents from any external point.',
        memory: 'A point looking in from the outside.'
    },
    {
        name: 'Length of Tangent',
        color: '#10b981',
        icon: '📐',
        def: 'The length of the segment of the tangent from the external point to the point of contact.',
        examples: ['Distance $PT$ from external point $P$ to contact point $T$'],
        inUse: 'Tangents from the same external point always have equal lengths.',
        memory: 'External point to point of contact.'
    }
];

export const FIVE_RULES = [
    {
        num: 1,
        title: 'Tangent Perpendicularity',
        rule: 'The tangent at any point of a circle is perpendicular to the radius through the point of contact.',
        emoji: '📐',
        color: '#2563eb',
        detail: 'This is the most critical theorem. It allows us to use Pythagoras theorem in circle problems.',
        examples: ['If $PT$ is a tangent at $T$ and $OT$ is the radius, then $\\angle OTP = 90^\\circ$.'],
        tip: 'Whenever you see a tangent, immediately draw a radius to the point of contact and mark the right angle.'
    },
    {
        num: 2,
        title: 'Number of Tangents',
        rule: 'There is exactly one tangent passing through a point lying on the circle.',
        emoji: '1️⃣',
        color: '#0d9488',
        detail: 'Inside the circle = 0 tangents. On the circle = 1 tangent. Outside the circle = 2 tangents.',
        examples: ['From an external point $P$, we can draw exactly two tangents $PT_1$ and $PT_2$.'],
        tip: 'A secant line becomes a tangent when its two points of intersection merge into one.'
    },
    {
        num: 3,
        title: 'Equal Tangents Theorem',
        rule: 'The lengths of tangents drawn from an external point to a circle are equal.',
        emoji: '⚖️',
        color: '#f59e0b',
        detail: 'This forms congruent right-angled triangles with the radii and the line joining the center to the external point.',
        examples: ['If $PA$ and $PB$ are tangents from $P$, then $PA = PB$.'],
        tip: 'This is proven using RHS congruence criterion.'
    },
    {
        num: 4,
        title: 'Angle Bisector Property',
        rule: 'The line joining the external point to the center bisects the angle between the two tangents.',
        emoji: '✂️',
        color: '#7c3aed',
        detail: 'The center of the circle lies on the angle bisector of the two tangents.',
        examples: ['$\\angle APO = \\angle BPO$ and $\\angle AOP = \\angle BOP$.'],
        tip: 'The angle between tangents and the angle subtended by radii at the center are supplementary.'
    },
    {
        num: 5,
        title: 'Circumscribed Polygons',
        rule: 'When a polygon circumscribes a circle, the tangent properties apply to all its sides.',
        emoji: '🔳',
        color: '#ec4899',
        detail: 'For a quadrilateral ABCD circumscribing a circle, the sums of opposite sides are equal.',
        examples: ['$AB + CD = AD + BC$ (since tangent segments are equal).'],
        tip: 'Break each side into two tangent segments extending from the polygon vertices.'
    }
];

export const VOCAB_QUIZ = [
    {
        question: 'A line intersecting a circle in two points is called a:',
        options: ['Tangent', 'Secant', 'Chord', 'Radius'],
        correct: 1,
        explanation: 'A secant is an extended line that cuts through the circle at exactly two points.'
    },
    {
        question: 'How many tangents can be drawn to a circle from a point inside it?',
        options: ['0', '1', '2', 'Infinite'],
        correct: 0,
        explanation: 'Any line drawn through a point inside the circle will be a secant, cutting the circle at two points.'
    },
    {
        question: 'The angle between a tangent and the radius at the point of contact is:',
        options: ['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$'],
        correct: 3,
        explanation: 'By theorem, the tangent is always perpendicular to the radius through the point of contact.'
    },
    {
        question: 'If two tangents drawn from an external point P are equally inclined to each other, their lengths are:',
        options: ['Different', 'Equal', 'Cannot be determined', 'Zero'],
        correct: 1,
        explanation: 'The lengths of tangents drawn from an external point to a circle are always equal.'
    },
    {
        question: 'The common point of a tangent and the circle is called:',
        options: ['Origin', 'Centre', 'Point of contact', 'External point'],
        correct: 2,
        explanation: 'The point of contact is the single point where the tangent grazes the circle.'
    }
];

import { genSkill1Practice, genSkill1Assessment, genSkill2Practice, genSkill2Assessment, genSkill3Practice, genSkill3Assessment } from './TrigIntroGr10SkillsData';

export const SKILLS = [
    {
        id: 'trig-ratios',
        title: 'Trig Ratios & Standard Values',
        subtitle: 'SOH-CAH-TOA',
        icon: '📐',
        color: '#7c3aed',
        desc: 'Find sin, cos, tan for standard angles and identify ratios from a right triangle.',
        get practice() { return genSkill1Practice(); },
        get assessment() { return genSkill1Assessment(); },
        learn: {
            concept: 'Every right-angled triangle with the same angle θ has sides in the same ratio. These ratios — sin, cos, and tan — are fixed for each angle and never change regardless of the triangle\'s size.',
            rules: [
                {
                    title: 'SOH — Sine',
                    f: '\\sin\\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}',
                    d: 'The side OPPOSITE to angle θ divided by the longest side (hypotenuse).',
                    ex: 'In a 3-4-5 triangle with $\\theta$ opposite side 3: $\\sin\\theta = \\frac{3}{5}$.',
                    tip: 'The hypotenuse is ALWAYS opposite the right angle, never adjacent to θ!'
                },
                {
                    title: 'CAH — Cosine',
                    f: '\\cos\\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}',
                    d: 'The ADJACENT side (next to θ, not the hypotenuse) divided by the hypotenuse.',
                    ex: 'In the same 3-4-5 triangle: $\\cos\\theta = \\frac{4}{5}$.',
                    tip: 'Adjacent means "next to" — the side that touches angle θ but is NOT the hypotenuse.'
                },
                {
                    title: 'TOA — Tangent',
                    f: '\\tan\\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{\\sin\\theta}{\\cos\\theta}',
                    d: 'The opposite side divided by the adjacent side. Also equals sin/cos.',
                    ex: '$\\tan\\theta = \\frac{3}{4}$ for the 3-4-5 triangle above.',
                    tip: 'tan 45° = 1 because opposite = adjacent when the triangle is isoceles!'
                },
                {
                    title: 'Standard Angle Table',
                    f: '\\sin 30° = \\tfrac{1}{2},\\; \\sin 45° = \\tfrac{1}{\\sqrt{2}},\\; \\sin 60° = \\tfrac{\\sqrt{3}}{2}',
                    d: 'Memorise exact values for 0°, 30°, 45°, 60°, 90°. The sin row = √0, √1, √2, √3, √4 — all divided by 2.',
                    ex: '$\\cos 60° = \\frac{1}{2}$, $\\tan 45° = 1$, $\\tan 60° = \\sqrt{3}$.',
                    tip: 'cos values are the sin values in REVERSE order. cos 60° = sin 30° = ½!'
                }
            ]
        }
    },
    {
        id: 'identities',
        title: 'Complementary Angles & Identities',
        subtitle: 'Pythagorean & Symmetry',
        icon: '⚡',
        color: '#6366f1',
        desc: 'Apply sin²θ + cos²θ = 1 and the complementary angle relations to simplify expressions.',
        get practice() { return genSkill2Practice(); },
        get assessment() { return genSkill2Assessment(); },
        learn: {
            concept: 'Two powerful tools: (1) The Pythagorean Identity which holds for ALL angles, and (2) Complementary angle relations which let you swap sin↔cos, tan↔cot, sec↔cosec when angles add up to 90°.',
            rules: [
                {
                    title: 'Pythagorean Identity',
                    f: '\\sin^2\\theta + \\cos^2\\theta = 1',
                    d: 'This is true for EVERY angle θ. Derived from the Pythagoras theorem applied to a unit right triangle.',
                    ex: 'If $\\sin\\theta = \\frac{3}{5}$, then $\\cos^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25}$, so $\\cos\\theta = \\frac{4}{5}$.',
                    tip: 'Rearranging gives: $\\sin^2\\theta = 1 - \\cos^2\\theta$ and $\\cos^2\\theta = 1 - \\sin^2\\theta$.'
                },
                {
                    title: 'Complementary Angle Rule',
                    f: '\\sin(90°-\\theta) = \\cos\\theta \\quad \\tan(90°-\\theta) = \\cot\\theta',
                    d: 'For two angles that add to 90°, sin of one equals cos of the other. This works for all six trig functions in pairs.',
                    ex: '$\\sin 40° = \\cos 50°$, and $\\frac{\\sin 40°}{\\cos 50°} = 1$.',
                    tip: 'Whenever you see an expression with pairs that add to 90°, look for cancellation!'
                }
            ]
        }
    },
    {
        id: 'word-problems',
        title: 'Heights & Distances',
        subtitle: 'Real-World Applications',
        icon: '🏗️',
        color: '#0ea5e9',
        desc: 'Solve word problems using angles of elevation and depression — towers, kites, shadows, and more.',
        get practice() { return genSkill3Practice(); },
        get assessment() { return genSkill3Assessment(); },
        learn: {
            concept: 'When you can form a right triangle from a real situation, trigonometry gives you the missing side or angle. The key is identifying which ratio to use: sin (O/H), cos (A/H), or tan (O/A).',
            rules: [
                {
                    title: 'Setting Up the Triangle',
                    f: '\\tan(\\text{elevation}) = \\frac{\\text{height}}{\\text{horizontal distance}}',
                    d: 'Draw the triangle. Label the known and unknown sides. Choose sin, cos, or tan based on which two sides are involved.',
                    ex: 'Tower 30 m away at 30° elevation: $\\tan 30° = \\frac{h}{30}$, so $h = 30/\\sqrt{3} = 10\\sqrt{3}$ m.',
                    tip: 'tan is the most common for height-distance problems because it avoids the hypotenuse!'
                },
                {
                    title: 'Angle of Depression = Angle of Elevation',
                    f: '\\angle \\text{depression from A} = \\angle \\text{elevation from B}',
                    d: 'When two points see each other, the angle of depression from the higher point equals the angle of elevation from the lower point (alternate interior angles).',
                    ex: 'If you look down at a boat at 30°, the boat looks up at you at 30°.',
                    tip: 'This symmetry is an alternate interior angles result from parallel horizontal lines!'
                }
            ]
        }
    }
];

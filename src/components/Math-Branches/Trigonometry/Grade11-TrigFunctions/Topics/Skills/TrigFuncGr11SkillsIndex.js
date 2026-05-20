import { genSkill1Practice, genSkill1Assessment, genSkill2Practice, genSkill2Assessment, genSkill3Practice, genSkill3Assessment, genSkill4Practice, genSkill4Assessment } from './TrigFuncGr11SkillsData';

export const SKILLS = [
    {
        id: 'radians',
        title: 'Radian & Degree Conversion',
        subtitle: 'Angle Measures',
        icon: '📏',
        color: '#6366f1',
        desc: 'Convert angles between degrees and radians fluently.',
        get practice() { return genSkill1Practice(); },
        get assessment() { return genSkill1Assessment(); },
        learn: {
            concept: 'Radians are the standard mathematical unit of angle measure. Instead of 360 arbitrary degrees, a full circle is $2\\pi$ radians.',
            rules: [
                {
                    title: 'The Conversion Factor',
                    f: '\\text{Radians} = \\text{Degrees} \\times \\frac{\\pi}{180°}',
                    d: 'To convert degrees to radians, multiply by $\\pi/180$. To convert radians to degrees, multiply by $180/\\pi$.',
                    ex: '$90° \\times \\frac{\\pi}{180°} = \\frac{\\pi}{2}$ radians.',
                    tip: 'Think of $\\pi$ radians as a straight line ($180°$).'
                }
            ]
        }
    },
    {
        id: 'graphs',
        title: 'Graphs of Sine & Cosine',
        subtitle: 'Waves & Periods',
        icon: '🌊',
        color: '#f97316',
        desc: 'Identify amplitude, period, and phase shifts from trigonometric equations.',
        get practice() { return genSkill2Practice(); },
        get assessment() { return genSkill2Assessment(); },
        learn: {
            concept: 'The general form of a sine wave is $y = A \\sin(B(x - C)) + D$. Each letter controls a different geometric transformation of the wave.',
            rules: [
                {
                    title: 'Amplitude',
                    f: '\\text{Amplitude} = |A|',
                    d: 'The vertical stretch. It is half the total height of the wave.',
                    ex: 'For $y = -3 \\cos(x)$, the amplitude is $|-3| = 3$.',
                    tip: 'Amplitude is always positive, even if A is negative (which just flips the wave).'
                },
                {
                    title: 'Period',
                    f: '\\text{Period} = \\frac{2\\pi}{|B|}',
                    d: 'The horizontal length of one complete cycle.',
                    ex: 'For $y = \\sin(4x)$, the period is $2\\pi/4 = \\pi/2$.',
                    tip: 'A larger B means the wave repeats faster (shorter period).'
                }
            ]
        }
    },
    {
        id: 'equations',
        title: 'Trigonometric Equations',
        subtitle: 'Solving for Angles',
        icon: '🔑',
        color: '#0ea5e9',
        desc: 'Find principal and general solutions for equations involving sine, cosine, and tangent.',
        get practice() { return genSkill3Practice(); },
        get assessment() { return genSkill3Assessment(); },
        learn: {
            concept: 'Because trig functions are periodic, equations like $\\sin(x) = 0.5$ have infinitely many solutions. We define "principal" solutions (usually in one full circle) and "general" solutions (a formula for all of them).',
            rules: [
                {
                    title: 'ASTC Rule for Principal Solutions',
                    f: '\\text{All, Sine, Tangent, Cosine}',
                    d: 'First find the reference angle in Quadrant 1. Then use the ASTC rule to find which quadrants the actual angle belongs to based on the sign (+ or -).',
                    ex: '$\\sin x = -1/2$. Reference is $\\pi/6$. Sine is negative in Q3 and Q4. Solutions: $\\pi+\\pi/6 = 7\\pi/6$, $2\\pi-\\pi/6 = 11\\pi/6$.',
                    tip: 'Always find the Q1 reference angle first, ignoring the negative sign!'
                }
            ]
        }
    },
    {
        id: 'rules',
        title: 'Sine Rule & Cosine Rule',
        subtitle: 'Non-Right Triangles',
        icon: '📐',
        color: '#a855f7',
        desc: 'Solve any triangle (find missing sides or angles) using the Sine and Cosine rules.',
        get practice() { return genSkill4Practice(); },
        get assessment() { return genSkill4Assessment(); },
        learn: {
            concept: 'Right triangles use SOH-CAH-TOA. For ANY other triangle, you must use the Sine Rule or the Cosine Rule.',
            rules: [
                {
                    title: 'The Sine Rule',
                    f: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}',
                    d: 'Use this when you know an angle and its OPPOSITE side, plus one other piece of information (AAS or SSA).',
                    ex: 'If $A=30°, a=5, B=45°$, then $b = \\frac{5\\sin 45°}{\\sin 30°}$.',
                    tip: 'If you need to find an angle, flip the rule: $\\frac{\\sin A}{a} = \\frac{\\sin B}{b}$.'
                },
                {
                    title: 'The Cosine Rule',
                    f: 'c^2 = a^2 + b^2 - 2ab \\cos C',
                    d: 'Use this when you know two sides and the angle BETWEEN them (SAS), or when you know all three sides (SSS).',
                    ex: 'If $a=3, b=4, C=90°$, then $c^2 = 9+16 - 0 = 25$ (Pythagoras is a special case!).',
                    tip: 'To find an angle when given 3 sides, rearrange: $\\cos C = \\frac{a^2+b^2-c^2}{2ab}$.'
                }
            ]
        }
    }
];

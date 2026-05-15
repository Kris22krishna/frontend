export const TRIG_EXAM_DATA = {
    cet: {
        label: 'CET',
        icon: '⚡',
        color: '#0891b2',
        gradient: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
        tagline: 'Speed + Direct Facts',
        importantTopics: [
            { text: 'Degree–Radian conversion: π rad = 180°', hot: true },
            { text: 'Standard angle values (0°, 30°, 45°, 60°, 90°)', hot: true },
            { text: 'ASTC sign rule for all four quadrants', hot: true },
            { text: 'Pythagorean identities: sin²θ + cos²θ = 1', hot: false },
            { text: 'Reciprocal identities (cosec, sec, cot)', hot: false },
            { text: 'Allied angle formulas (π/2 ± θ, π ± θ)', hot: true },
            { text: 'Periodicity of trig functions', hot: false },
            { text: 'Domain and range of sin, cos, tan', hot: false }
        ],
        traps: [
            { trap: 'Saying sin(90°) = 0', correction: 'sin(90°) = 1 and cos(90°) = 0. Mix-up is the #1 CET error.' },
            { trap: 'Forgetting tan(90°) is undefined', correction: 'tan(90°) = sin(90°)/cos(90°) = 1/0, which is undefined. Never write tan(90°) = ∞.' },
            { trap: 'Wrong sign in second quadrant', correction: 'In Q2: sin is +, cos is −, tan is −. Memorize ASTC: All, Sin, Tan, Cos.' },
            { trap: 'Confusing sin(π − θ) and sin(π + θ)', correction: 'sin(π − θ) = sin θ (same). sin(π + θ) = −sin θ (opposite sign).' },
            { trap: 'Radians vs degrees in calculation', correction: 'Convert first! π/6 = 30°. Never mix units in the same expression.' }
        ],
        pyqs: [
            {
                question: 'The value of sin 30° + cos 60° is:',
                options: ['0', '1', '√3/2', '2'],
                correct: 1,
                explanation: 'sin 30° = 1/2 and cos 60° = 1/2. Sum = 1/2 + 1/2 = 1.'
            },
            {
                question: 'tan 45° × cosec 30° equals:',
                options: ['1', '√2', '2', '√3'],
                correct: 2,
                explanation: 'tan 45° = 1 and cosec 30° = 1/sin 30° = 1/(1/2) = 2. Product = 1 × 2 = 2.'
            },
            {
                question: 'If an angle is 5π/6 radians, its degree measure is:',
                options: ['120°', '135°', '150°', '160°'],
                correct: 2,
                explanation: '5π/6 × (180°/π) = 5 × 30° = 150°.'
            },
            {
                question: 'In which quadrant is sin θ positive and cos θ negative?',
                options: ['First', 'Second', 'Third', 'Fourth'],
                correct: 1,
                explanation: 'By the ASTC rule: in Q2, sin is positive and cos is negative.'
            },
            {
                question: 'sin(π − θ) equals:',
                options: ['−sin θ', 'cos θ', 'sin θ', '−cos θ'],
                correct: 2,
                explanation: 'π − θ is in Q2 where sine is positive, and complementary to θ across the y-axis. sin(π − θ) = sin θ.'
            }
        ]
    },
    jeeMain: {
        label: 'JEE Mains',
        icon: '🎯',
        color: '#7c3aed',
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
        tagline: 'Concept + Formula MCQs',
        importantTopics: [
            { text: 'General solutions of sin x = k, cos x = k, tan x = k', hot: true },
            { text: 'Sum and difference formulas: sin(A±B), cos(A±B)', hot: true },
            { text: 'Allied angle transformations (all cases)', hot: true },
            { text: 'Compound angle identities', hot: false },
            { text: 'Proving trig identities using Pythagorean family', hot: true },
            { text: 'Range of expressions like a sin θ + b cos θ', hot: true },
            { text: 'Signs across quadrants for all 6 functions', hot: false },
            { text: 'Exact principal values of inverse trig (Class 12 preview)', hot: false }
        ],
        traps: [
            { trap: 'Missing solutions in general solution of sin x = k', correction: 'General solution: x = nπ + (−1)ⁿα. Do not just write x = α; you miss all other solutions.' },
            { trap: 'Wrong general solution for cos x = k', correction: 'cos x = k → x = 2nπ ± α, NOT x = nπ ± α. The period of cos is 2π.' },
            { trap: 'Ignoring domain restriction when simplifying', correction: 'If tan θ appears, domain excludes θ = (2n+1)π/2. Always check before substituting.' },
            { trap: 'Confusing sum formula: sin(A+B) ≠ sin A + sin B', correction: 'sin(A+B) = sin A cos B + cos A sin B. The distribution law DOES NOT apply to trig functions.' },
            { trap: 'Sign error in cos(A−B)', correction: 'cos(A−B) = cos A cos B + sin A sin B (note the + sign, unlike cos(A+B) which has −).' }
        ],
        pyqs: [
            {
                question: 'The general solution of cos x = √3/2 is:',
                options: ['x = 2nπ ± π/3', 'x = nπ ± π/6', 'x = 2nπ ± π/6', 'x = nπ + (−1)ⁿπ/6'],
                correct: 2,
                explanation: 'cos x = √3/2 = cos(π/6). General solution for cosine: x = 2nπ ± π/6, where n ∈ ℤ.'
            },
            {
                question: 'The value of cos 75° (using sum formula) is:',
                options: ['(√6 − √2)/4', '(√6 + √2)/4', '(√3 − 1)/2', '(√3 + 1)/4'],
                correct: 0,
                explanation: 'cos 75° = cos(45° + 30°) = cos45°cos30° − sin45°sin30° = (√2/2)(√3/2) − (√2/2)(1/2) = (√6 − √2)/4.'
            },
            {
                question: 'The maximum value of 3 sin θ + 4 cos θ is:',
                options: ['3', '4', '5', '7'],
                correct: 2,
                explanation: 'The maximum of a sin θ + b cos θ is √(a² + b²) = √(9 + 16) = √25 = 5.'
            },
            {
                question: 'sin(A + B) − sin(A − B) equals:',
                options: ['2 sin A cos B', '2 cos A sin B', '2 sin A sin B', '2 cos A cos B'],
                correct: 1,
                explanation: 'sin(A+B) = sinAcosB + cosAsinB; sin(A−B) = sinAcosB − cosAsinB. Subtracting: 2cosAsinB.'
            },
            {
                question: 'If sin θ + cos θ = √2, then θ equals:',
                options: ['0°', '30°', '45°', '60°'],
                correct: 2,
                explanation: 'sin θ + cos θ = √2 sin(θ + 45°). Maximum value is √2, achieved when θ + 45° = 90°, i.e., θ = 45°.'
            }
        ]
    },
    jeeAdvanced: {
        label: 'JEE Advanced',
        icon: '🏆',
        color: '#ef4444',
        gradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
        tagline: 'Deep Thinking + Multi-Step',
        importantTopics: [
            { text: 'Trig equations with multiple constraints on θ', hot: true },
            { text: 'Identities requiring multi-step proof', hot: true },
            { text: 'Graph behaviour: period, amplitude, phase shift', hot: true },
            { text: 'Compound angle + half-angle combination problems', hot: true },
            { text: 'Conditional trig identities (given A+B+C = π)', hot: true },
            { text: 'Solving a sin θ + b cos θ = c for range of solutions', hot: false },
            { text: 'Linking trig identities with algebraic expressions', hot: true },
            { text: 'Number of solutions of trig equations in [0, 2π]', hot: false }
        ],
        traps: [
            { trap: 'Not considering all valid quadrants when solving trig equations', correction: 'Always map to all quadrants where the function has the given sign and list every solution in the given interval.' },
            { trap: 'Assuming unique solution when multiple branches exist', correction: 'In JEE Advanced, answers require ALL solutions. Check every branch systematically.' },
            { trap: 'Forgetting period when asked for number of solutions in [0, 4π]', correction: 'Count solutions in [0, 2π] first, then double for [0, 4π] since the pattern repeats exactly once more.' },
            { trap: 'Ignoring boundary cases at endpoints of intervals', correction: 'Check whether the endpoints (0, π/2, π, 3π/2, 2π) satisfy the equation — these are often included.' },
            { trap: 'Expanding (sin A + cos A)² without cross term', correction: '(sin A + cos A)² = 1 + 2 sin A cos A = 1 + sin 2A. The cross term is critical.' }
        ],
        pyqs: [
            {
                question: 'How many solutions does sin x = x/10 have in (−∞, ∞)?',
                options: ['3', '5', '7', 'Infinitely many'],
                correct: 2,
                explanation: 'The line y = x/10 intersects y = sin x at 7 points (the origin plus 3 on each side), since sin x is bounded by ±1 and x/10 escapes that range beyond x = ±10.'
            },
            {
                question: 'If A + B + C = π, then sin 2A + sin 2B + sin 2C equals:',
                options: ['sin A sin B sin C', '2 sin A sin B sin C', '4 sin A sin B sin C', '0'],
                correct: 2,
                explanation: 'This is a standard conditional identity: if A+B+C = π, then sin2A + sin2B + sin2C = 4 sinA sinB sinC.'
            },
            {
                question: 'The number of solutions of tan x + sec x = 2 cos x in [0, 2π] is:',
                options: ['0', '1', '2', '3'],
                correct: 2,
                explanation: 'Rewriting: sin x + 1 = 2cos²x = 2(1−sin²x). Solving gives sin x = 1/2 or sin x = −1 (rejected since sec x undefined). sin x = 1/2 gives 2 solutions: π/6 and 5π/6.'
            },
            {
                question: 'The maximum value of sin⁴θ + cos⁴θ is:',
                options: ['1/2', '3/4', '1', '2'],
                correct: 2,
                explanation: 'sin⁴θ + cos⁴θ = (sin²θ + cos²θ)² − 2sin²θcos²θ = 1 − (sin 2θ)²/2. Maximum is 1 (when sin 2θ = 0), minimum is 1/2.'
            },
            {
                question: 'For how many values of θ ∈ [0, 2π] is the equation 2sin²θ − 5sinθ + 2 = 0 satisfied?',
                options: ['1', '2', '3', '4'],
                correct: 1,
                explanation: 'Factoring: (2sinθ − 1)(sinθ − 2) = 0. So sinθ = 1/2 (valid) or sinθ = 2 (impossible). sinθ = 1/2 gives θ = π/6 and θ = 5π/6 — 2 solutions.'
            }
        ]
    }
};

export const FORMULA_SHEET = [
    {
        category: 'Degree ↔ Radian',
        color: '#0891b2',
        formulas: [
            { name: 'Degree to Radian', formula: '\\theta_{\\text{rad}} = \\theta_{\\deg} \\times \\dfrac{\\pi}{180}' },
            { name: 'Radian to Degree', formula: '\\theta_{\\deg} = \\theta_{\\text{rad}} \\times \\dfrac{180}{\\pi}' },
            { name: 'Key Equivalence', formula: '\\pi \\text{ rad} = 180^\\circ' }
        ]
    },
    {
        category: 'Standard Values',
        color: '#059669',
        formulas: [
            { name: 'sin values', formula: '\\sin 0^\\circ = 0,\\ \\sin 30^\\circ = \\tfrac{1}{2},\\ \\sin 45^\\circ = \\tfrac{\\sqrt{2}}{2},\\ \\sin 60^\\circ = \\tfrac{\\sqrt{3}}{2},\\ \\sin 90^\\circ = 1' },
            { name: 'cos values', formula: '\\cos 0^\\circ = 1,\\ \\cos 30^\\circ = \\tfrac{\\sqrt{3}}{2},\\ \\cos 45^\\circ = \\tfrac{\\sqrt{2}}{2},\\ \\cos 60^\\circ = \\tfrac{1}{2},\\ \\cos 90^\\circ = 0' },
            { name: 'tan values', formula: '\\tan 0^\\circ = 0,\\ \\tan 30^\\circ = \\tfrac{1}{\\sqrt{3}},\\ \\tan 45^\\circ = 1,\\ \\tan 60^\\circ = \\sqrt{3},\\ \\tan 90^\\circ = \\text{undefined}' }
        ]
    },
    {
        category: 'Pythagorean Identities',
        color: '#7c3aed',
        formulas: [
            { name: 'Identity 1', formula: '\\sin^2\\theta + \\cos^2\\theta = 1' },
            { name: 'Identity 2', formula: '1 + \\tan^2\\theta = \\sec^2\\theta' },
            { name: 'Identity 3', formula: '1 + \\cot^2\\theta = \\cosec^2\\theta' }
        ]
    },
    {
        category: 'Allied Angle Formulas',
        color: '#d97706',
        formulas: [
            { name: 'π/2 − θ', formula: '\\sin(\\tfrac{\\pi}{2}-\\theta)=\\cos\\theta,\\ \\cos(\\tfrac{\\pi}{2}-\\theta)=\\sin\\theta,\\ \\tan(\\tfrac{\\pi}{2}-\\theta)=\\cot\\theta' },
            { name: 'π/2 + θ', formula: '\\sin(\\tfrac{\\pi}{2}+\\theta)=\\cos\\theta,\\ \\cos(\\tfrac{\\pi}{2}+\\theta)=-\\sin\\theta' },
            { name: 'π − θ', formula: '\\sin(\\pi-\\theta)=\\sin\\theta,\\ \\cos(\\pi-\\theta)=-\\cos\\theta,\\ \\tan(\\pi-\\theta)=-\\tan\\theta' },
            { name: 'π + θ', formula: '\\sin(\\pi+\\theta)=-\\sin\\theta,\\ \\cos(\\pi+\\theta)=-\\cos\\theta,\\ \\tan(\\pi+\\theta)=\\tan\\theta' },
            { name: '2π − θ', formula: '\\sin(2\\pi-\\theta)=-\\sin\\theta,\\ \\cos(2\\pi-\\theta)=\\cos\\theta' }
        ]
    },
    {
        category: 'Sum & Difference',
        color: '#be185d',
        formulas: [
            { name: 'sin(A+B)', formula: '\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B' },
            { name: 'sin(A−B)', formula: '\\sin(A-B) = \\sin A\\cos B - \\cos A\\sin B' },
            { name: 'cos(A+B)', formula: '\\cos(A+B) = \\cos A\\cos B - \\sin A\\sin B' },
            { name: 'cos(A−B)', formula: '\\cos(A-B) = \\cos A\\cos B + \\sin A\\sin B' },
            { name: 'tan(A+B)', formula: '\\tan(A+B) = \\dfrac{\\tan A + \\tan B}{1 - \\tan A\\tan B}' },
            { name: 'tan(A−B)', formula: '\\tan(A-B) = \\dfrac{\\tan A - \\tan B}{1 + \\tan A\\tan B}' }
        ]
    },
    {
        category: 'General Solutions',
        color: '#0369a1',
        formulas: [
            { name: 'sin θ = sin α', formula: '\\theta = n\\pi + (-1)^n \\alpha,\\ n \\in \\mathbb{Z}' },
            { name: 'cos θ = cos α', formula: '\\theta = 2n\\pi \\pm \\alpha,\\ n \\in \\mathbb{Z}' },
            { name: 'tan θ = tan α', formula: '\\theta = n\\pi + \\alpha,\\ n \\in \\mathbb{Z}' }
        ]
    }
];

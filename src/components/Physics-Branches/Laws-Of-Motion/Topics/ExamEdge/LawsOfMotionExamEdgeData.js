export const lawsOfMotionExamEdgeData = [
    {
        id: 'exam-neet',
        exam: 'NEET',
        weightage: '3 - 4',
        marks: '12 - 16',
        difficulty: 'Medium to Hard',
        focus: 'Calculation-intensive. Requires strong understanding of conceptual subtleties, especially with friction, pulley systems, and circular motion.',
        pyqs: [
            {
                year: '2023',
                question: 'A body of mass M at rest explodes into three pieces in the ratio 1:1:2. Two equal pieces fly off perpendicular to each other with speed v. The speed of the heavier piece is:',
                answer: 'Masses: M/4, M/4, M/2. Resultant momentum of light pieces = (M/4)v × √2. By conservation: (M/2)v₃ = (M/4)v√2 → v₃ = v√2/4 = v/(2√2).'
            },
            {
                year: '2022',
                question: 'A block of mass 10 kg on a rough incline (θ=30°, μs=0.7). The frictional force acting on the block is: (g=10)',
                answer: 'mg sin 30° = 50 N. Limiting friction = 0.7 × 100 × 0.866 = 60.6 N. Since 60.6 > 50, block does NOT slide. Friction = mg sin θ = 50 N (self-adjusts).'
            },
            {
                year: '2021',
                question: 'A spring balance reads 49 N when stationary. If lift moves down with a = 5 m/s², the reading is:',
                answer: 'm = 49/9.8 = 5 kg. W_app = m(g−a) = 5(9.8−5) = 5×4.8 = 24 N ≈ 24.5 N.'
            },
            {
                year: '2020',
                question: 'A body initially at rest acted upon by constant force. Rate of change of kinetic energy varies:',
                answer: 'dKE/dt = Fv. F constant, v increases with time → power = Fv increases with time.'
            }
        ],
        color: '#10b981'
    },
    {
        id: 'exam-jee',
        exam: 'JEE Main',
        weightage: '1 - 2',
        marks: '4 - 8',
        difficulty: 'Hard',
        focus: 'Focuses heavily on integration of concepts: Laws of Motion combined with Work Power Energy or Rotational Dynamics. Complex multi-body systems.',
        pyqs: [
            {
                year: '2023',
                question: 'A block of mass m on a surface y = x³/6. If μ = 0.5, max height without slipping:',
                answer: 'dy/dx = x²/2 = tan θ = μ = 0.5 → x = 1. y = 1/6 m.'
            }
        ],
        color: '#3b82f6'
    },
    {
        id: 'exam-kcet',
        exam: 'Karnataka CET',
        weightage: '2 - 3',
        marks: '2 - 3',
        difficulty: 'Easy to Medium',
        focus: 'Formula-based questions and theoretical conceptual questions. High emphasis on defining Newton\'s Laws and simple numericals.',
        pyqs: [
            {
                year: '2020',
                question: 'The working of a rocket is based on the principle of:',
                answer: 'Conservation of linear momentum (or Newton\'s Third Law).'
            }
        ],
        color: '#f59e0b'
    },
    {
        id: 'exam-boards',
        exam: 'PUC / Boards',
        weightage: '7 - 10%',
        marks: '5 - 7',
        difficulty: 'Medium',
        focus: 'Derivations (e.g., banking of roads, law of conservation of momentum). Short definition questions on concepts like angle of friction and angle of repose.',
        pyqs: [
            {
                year: '2019',
                question: 'Derive an expression for the maximum safe speed of a car on a banked circular road with friction.',
                answer: 'v_max = sqrt(Rg * ((mu_s + tan theta) / (1 - mu_s*tan theta)))'
            }
        ],
        color: '#8b5cf6'
    }
];

export const lawsOfMotionFormulaSheet = [
    { quantity: 'Force', formula: 'F = ma = dp/dt', unit: 'N (kg·m/s²)' },
    { quantity: 'Momentum', formula: 'p = mv', unit: 'kg·m/s' },
    { quantity: 'Impulse', formula: 'J = FΔt = Δp', unit: 'N·s = kg·m/s' },
    { quantity: 'Max Static Friction', formula: 'f_s = μ_s N', unit: 'N' },
    { quantity: 'Kinetic Friction', formula: 'f_k = μ_k N', unit: 'N' },
    { quantity: 'Angle of Repose', formula: 'tan θ = μ_s', unit: '—' },
    { quantity: 'Centripetal Acceleration', formula: 'a_c = v²/r = ω²r', unit: 'm/s²' },
    { quantity: 'Centripetal Force', formula: 'F_c = mv²/r = mω²r', unit: 'N' },
    { quantity: 'Max Speed (Level Road)', formula: 'v_max = √(μrg)', unit: 'm/s' },
    { quantity: 'Banking Angle', formula: 'tan θ = v²/(rg)', unit: '—' },
    { quantity: 'Atwood Machine', formula: 'a = (m₂−m₁)g/(m₁+m₂)', unit: 'm/s²' },
    { quantity: 'Apparent Weight (Lift)', formula: 'N = m(g ± a)', unit: 'N' }
];

export const lawsOfMotionQuickRevision = [
    {
        title: "Newton's Laws",
        icon: '📋',
        points: [
            '1st Law: F_net = 0 ⟹ constant velocity (defines inertia)',
            '2nd Law: F = ma = dp/dt (defines force)',
            '3rd Law: F_AB = −F_BA; different bodies; simultaneous',
            'Mass = measure of inertia (kg)'
        ]
    },
    {
        title: 'Momentum & Impulse',
        icon: '⚡',
        points: [
            'p = mv (vector, kg·m/s)',
            'Impulse J = FΔt = Δp',
            'Same impulse → smaller mass gets larger velocity change',
            'Airbag: increases Δt → reduces F'
        ]
    },
    {
        title: 'Conservation of Momentum',
        icon: '🚀',
        points: [
            'If F_ext = 0: p_total = constant',
            'Gun recoil: m_gun v_gun = m_bullet v_bullet',
            'Explosion: Σm_i v_i = 0 (if system was at rest)',
            'Always a vector equation'
        ]
    },
    {
        title: 'Friction Formulae',
        icon: '🔵',
        points: [
            'f_s(max) = μ_s N (limiting friction)',
            'f_k = μ_k N (kinetic, constant)',
            'μ_s > μ_k > μ_rolling',
            'Angle of repose: tan θ_r = μ_s',
            'Friction ≠ depends on area of contact'
        ]
    },
    {
        title: 'Circular Motion',
        icon: '🔄',
        points: [
            'a_c = v²/r = ω²r (toward centre)',
            'F_c = mv²/r (provided by real forces)',
            'Level road: v_max = √(μrg)',
            'Banked road (frictionless): tan θ = v²/rg',
            'Centrifugal force is PSEUDO (not real in inertial frame)'
        ]
    },
    {
        title: 'Inclined Plane',
        icon: '🏋️',
        points: [
            'N = mg cos θ',
            'Component along plane = mg sin θ',
            'Moving up (friction): a = g(sin θ + μ cos θ)',
            'Moving down (friction): a = g(sin θ − μ cos θ)',
            'Stationary: f = mg sin θ (if < limiting)'
        ]
    },
    {
        title: 'Lift Problems',
        icon: '🛗',
        points: [
            'Lift UP (accelerating): N = m(g + a)',
            'Lift DOWN (accelerating): N = m(g − a)',
            'Free fall (a = g): N = 0 (weightlessness)',
            'N = apparent weight shown on scale'
        ]
    },
    {
        title: 'Top NEET Traps',
        icon: '⚠️',
        points: [
            'Static friction adjusts; use f = mg sin θ on incline if block is stationary',
            'Action-reaction on different bodies — never cancel',
            "Centrifugal force: don't use in inertial frame",
            'Friction independent of area (2nd law of friction)',
            'At bottom of vertical circle: T − mg = mv²/r'
        ]
    }
];

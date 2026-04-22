// ECFExamEdgeData.js — Drills data for Electric Charges and Fields

export const ECFFactDrills = [
    { q: 'What is the SI unit of electric charge?', a: 'Coulomb (C)' },
    { q: 'State the quantisation of electric charge.', a: 'q = ne, where n is an integer and e = 1.6 × 10⁻¹⁹ C. Charge always exists in integral multiples of the elementary charge.' },
    { q: 'What is Coulomb\'s constant k?', a: 'k = 9 × 10⁹ N·m²/C² = 1/(4πε₀)' },
    { q: 'What does a positive electric flux through a closed surface indicate?', a: 'Net charge inside the surface is positive (field lines exit the surface).' },
    { q: 'What is the electric field inside a conductor at electrostatic equilibrium?', a: 'Zero. Any free charges redistribute on the surface until the internal field is zero.' },
    { q: 'State the direction of the electric dipole moment vector.', a: 'From the negative charge (−q) to the positive charge (+q). Unit: C·m.' },
    { q: 'What is the relationship between E_axis and E_equatorial for a dipole at distance r (r >> 2l)?', a: 'E_axis = 2kp/r³; E_equatorial = kp/r³. Ratio = 2 : 1.' },
    { q: 'State Gauss\'s Law in words.', a: 'The total electric flux through any closed surface equals the net charge enclosed by that surface divided by ε₀: Φ = q_enc/ε₀.' },
];

export const ECFFormulaDrills = [
    { prompt: 'Electric force between two charges q₁ and q₂ separated by r:', answer: 'F = kq₁q₂/r²' },
    { prompt: 'Electric field at distance r from a point charge q:', answer: 'E = kq/r² (or E = q/(4πε₀r²))' },
    { prompt: 'Electric flux through a surface:', answer: 'Φ = E · A · cosθ' },
    { prompt: "Gauss's Law:", answer: 'Φ_closed = q_enc/ε₀' },
    { prompt: 'Torque on a dipole in uniform field E:', answer: 'τ = pE sinθ  (or τ = p × E)' },
    { prompt: 'Potential energy of dipole in field E:', answer: 'U = −pE cosθ  (or U = −p · E)' },
    { prompt: 'Field due to an infinite line charge (linear density λ) at distance r:', answer: 'E = λ/(2πε₀r)' },
    { prompt: 'Field due to an infinite non-conducting plane (surface charge density σ):', answer: 'E = σ/(2ε₀) on each side' },
];

export const ECFCompareDrills = [
    {
        title: 'Coulomb\'s Law vs Gravitational Law',
        points: [
            'Both follow inverse-square law: F ∝ 1/r²',
            'Gravity: always attractive; Electrostatic: can repel or attract',
            'Gravity: depends on mass; Electrostatic: depends on charge',
            'Electrostatic force ≈ 10³⁶ × stronger than gravity for electrons',
            'Both act along the line joining the two objects',
        ]
    },
    {
        title: 'Electric Field vs Electric Flux',
        points: [
            'E is a vector (direction matters); Φ is a scalar',
            'E has units N/C (or V/m); Φ has units N·m²/C',
            'E exists at every point in space; Φ is defined for a surface',
            'E = kq/r² for a point charge; Φ = q_enc/ε₀ for a closed surface',
            'E⃗ is the "density" of field lines; Φ is the "count" through a surface',
        ]
    },
    {
        title: 'Axial vs Equatorial Field of a Dipole',
        points: [
            'E_axis = 2kp/r³ (along p direction); E_eq = kp/r³ (antiparallel to p)',
            'E_axis : E_eq = 2 : 1 at the same distance r',
            'Axial field is along the dipole moment; Equatorial is perpendicular',
            'Both fall off as 1/r³ (faster than point charge 1/r²)',
            'At equatorial point, field of +q and −q have components cancelling along p',
        ]
    },
    {
        title: 'Conductor vs Insulator in Electrostatics',
        points: [
            'Conductor: free electrons can redistribute; Insulator: electrons are bound',
            'Inside conductor: E = 0; Inside insulator: E can be non-zero',
            'Conductor surface: charges reside on surface only',
            'Conductor surface: E is perpendicular to surface (E = σ/ε₀ just outside)',
            'Both can be polarised, but mechanism differs (free vs bound charges)',
        ]
    },
];

export const ECFNumericalDrills = [
    {
        q: 'Two point charges +4 μC and −9 μC are 30 cm apart. Find: (a) force between them, (b) whether attractive or repulsive.',
        solution: `(a) F = kq₁q₂/r² = 9×10⁹ × (4×10⁻⁶)(9×10⁻⁶) / (0.3)² = 9×10⁹ × 36×10⁻¹² / 0.09 = 3.6 N
(b) Unlike charges → Attractive`,
        answer: '3.6 N, Attractive'
    },
    {
        q: 'A dipole has charges ±5 μC separated by 4 cm. Calculate (a) dipole moment, (b) field on the axial line at 20 cm from centre.',
        solution: `(a) p = q × 2l = 5×10⁻⁶ × 0.04 = 2 × 10⁻⁷ C·m
(b) E_axis = 2kp/r³ = 2 × 9×10⁹ × 2×10⁻⁷ / (0.2)³ = 3.6×10³/(8×10⁻³) = 4.5 × 10⁵ N/C`,
        answer: 'p = 2×10⁻⁷ C·m; E = 4.5×10⁵ N/C'
    },
    {
        q: 'A spherical Gaussian surface of radius 0.5 m encloses a charge of 2 μC. Find the electric flux through the surface.',
        solution: `Φ = q_enc/ε₀ = 2×10⁻⁶ / 8.85×10⁻¹² = 2.26 × 10⁵ N·m²/C
Note: shape and size of Gaussian surface do not matter — only q_enc.`,
        answer: '≈ 2.26 × 10⁵ N·m²/C'
    },
    {
        q: 'An infinite plane sheet has surface charge density σ = 3.54 × 10⁻⁹ C/m². Find electric field at a point 5 cm from the sheet.',
        solution: `E = σ/(2ε₀) = 3.54×10⁻⁹ / (2 × 8.85×10⁻¹²) = 3.54×10⁻⁹ / 1.77×10⁻¹¹ = 200 N/C
Distance doesn't matter for an infinite plane!`,
        answer: '200 N/C (perpendicular to sheet, away from it)'
    },
    {
        q: 'Find the electric field at a distance r = 3 cm inside a uniformly charged solid sphere of radius R = 10 cm carrying total charge Q = 8 μC.',
        solution: `ρ = Q/(4πR³/3) = 8×10⁻⁶/(4π×10⁻³/3)
E_inside = ρr/(3ε₀) = Qr/(4πε₀R³) = kQr/R³
= 9×10⁹ × 8×10⁻⁶ × 0.03 / (0.1)³ = 2.16×10³/10⁻³ = 2.16 × 10⁶ N/C`,
        answer: '≈ 2.16 × 10⁶ N/C (radially outward)'
    },
];

export const ECFPYQs = [
    {
        year: 'NEET 2023',
        q: 'A charge Q is placed at the centre of a cube. The electric flux through one face of the cube is:',
        options: ['Q/ε₀', 'Q/(6ε₀)', 'Q/(4ε₀)', 'Q/(2ε₀)'],
        ans: 1,
        sol: 'By Gauss\'s Law, total flux = Q/ε₀. By symmetry, each of the 6 faces gets equal flux. Flux per face = Q/(6ε₀).'
    },
    {
        year: 'NEET 2022',
        q: 'Two protons in a nucleus are separated by 10⁻¹⁴ m. The electrostatic force between them is:',
        options: ['2.3 N', '23 N', '230 N', '2300 N'],
        ans: 2,
        sol: 'F = kq²/r² = 9×10⁹×(1.6×10⁻¹⁹)²/(10⁻¹⁴)² = 9×10⁹×2.56×10⁻³⁸/10⁻²⁸ = 9×10⁹×2.56×10⁻¹⁰ = 2.304 ≈ 230 N. Wait: = 9×10⁹×2.56×10⁻³⁸/10⁻²⁸ = 23 N. Ans: 23 N.'
    },
    {
        year: 'JEE Main 2020',
        q: 'The electric field at a point on the equatorial line of a dipole (p) at distance r (r >> 2l) is:',
        options: ['2kp/r³, along p', 'kp/r³, opposite to p', '2kp/r³, opposite to p', 'kp/r³, along p'],
        ans: 1,
        sol: 'At the equatorial point, the net field is E = kp/r³, directed antiparallel (opposite) to the dipole moment p.'
    },
    {
        year: 'NEET 2021',
        q: 'If the electric flux entering and leaving a closed surface are Φ₁ and Φ₂ respectively, then the charge inside is:',
        options: ['(Φ₂−Φ₁)ε₀', '(Φ₁−Φ₂)/ε₀', '(Φ₂−Φ₁)/ε₀', '(Φ₁+Φ₂)ε₀'],
        ans: 0,
        sol: 'Net outward flux = Φ₂ − Φ₁ (outward positive). By Gauss\'s Law: q_enc = ε₀ × Φ_net = (Φ₂ − Φ₁)ε₀.'
    },
];

export const ecfExamEdgeData = [
    {
        id: 'jee-mains',
        exam: 'JEE Mains',
        color: '#ef4444',
        weightage: '1-2',
        marks: '4-8',
        difficulty: 'Medium-High',
        focus: 'JEE Main typically checks vector superposition, Coulomb-force comparisons, and symmetric Gauss-law setups. Focus on direction logic first, then formula substitution.',
        pyqs: [
            {
                year: 2020,
                question: 'The electric field at a point on the equatorial line of a dipole (p) at distance r (r >> 2l) is:',
                answer: 'At equatorial point, $E = kp/r^3$ and direction is opposite to dipole moment $p$.',
            },
            {
                year: 2021,
                question: 'Flux entering a closed surface is $\\Phi_1$ and leaving is $\\Phi_2$. Charge enclosed equals:',
                answer: 'Net outward flux is $\\Phi_2 - \\Phi_1$, so by Gauss: $q_{enc} = \\epsilon_0(\\Phi_2 - \\Phi_1)$.',
            },
        ],
    },
    {
        id: 'jee-advanced',
        exam: 'JEE Advanced',
        color: '#6366f1',
        weightage: '1-2',
        marks: '8-12',
        difficulty: 'High',
        focus: 'JEE Advanced mixes electrostatics with geometry and algebraic symmetry. Multi-step setups involving field cancellation, dipole orientation, and non-trivial Gaussian surfaces are common.',
        pyqs: [
            {
                year: 2022,
                question: 'Two charges are arranged such that field at a point becomes zero. Which condition must hold?',
                answer: 'Field cancellation requires vector equality: magnitudes satisfy inverse-square balance and directions must be opposite along the same line.',
            },
            {
                year: 2023,
                question: 'A dipole in uniform electric field is rotated from $\\theta_1$ to $\\theta_2$. Work done by external agent?',
                answer: 'Use potential energy $U = -pE\\cos\\theta$. External work for quasistatic rotation is $\\Delta U = -pE(\\cos\\theta_2 - \\cos\\theta_1)$.',
            },
        ],
    },
    {
        id: 'neet',
        exam: 'NEET',
        color: '#10b981',
        weightage: '2-4',
        marks: '8-16',
        difficulty: 'Easy-Medium',
        focus: 'NEET heavily rewards direct formula recall and standard symmetry results: flux through cube faces, dipole ratios, and electric field in common distributions.',
        pyqs: [
            {
                year: 2023,
                question: 'A charge Q is at the center of a cube. Flux through one face?',
                answer: 'Total flux is $Q/\\epsilon_0$. By six-fold symmetry, each face gets $Q/(6\\epsilon_0)$.',
            },
            {
                year: 2022,
                question: 'Two protons separated by $10^{-14}$ m. Electrostatic force is:',
                answer: 'Apply Coulomb’s law: $F = kq^2/r^2$. Substituting values gives force on the order of $10^1$ N (about 23 N).',
            },
        ],
    },
];

export const ecfFormulaSheet = [
    { quantity: 'Quantisation',                 formula: '$q = ne$',                         unit: 'C' },
    { quantity: "Coulomb's Law",                formula: '$F = k\\dfrac{q_1 q_2}{r^2}$',     unit: 'N' },
    { quantity: 'Electric Field (point charge)',formula: '$E = k\\dfrac{q}{r^2}$',           unit: 'N/C' },
    { quantity: 'Superposition',                formula: '$\\vec{E}_{net} = \\sum \\vec{E_i}$', unit: 'N/C' },
    { quantity: 'Electric Flux',                formula: '$\\Phi = \\vec{E}\\cdot\\vec{A} = EA\\cos\\theta$', unit: 'N·m²/C' },
    { quantity: "Gauss's Law",                  formula: '$\\Phi_{closed} = q_{enc}/\\epsilon_0$', unit: 'N·m²/C' },
    { quantity: 'Dipole Moment',                formula: '$p = q(2l)$',                      unit: 'C·m' },
    { quantity: 'Dipole Torque',                formula: '$\\tau = pE\\sin\\theta$',         unit: 'N·m' },
    { quantity: 'Dipole Potential Energy',      formula: '$U = -pE\\cos\\theta$',            unit: 'J' },
    { quantity: 'Dipole Axial Field',           formula: '$E_{axial} = 2kp/r^3$',            unit: 'N/C' },
    { quantity: 'Dipole Equatorial Field',      formula: '$E_{eq} = kp/r^3$',                unit: 'N/C' },
    { quantity: 'Infinite Wire Field',          formula: '$E = \\lambda/(2\\pi\\epsilon_0 r)$', unit: 'N/C' },
    { quantity: 'Infinite Plane Field',         formula: '$E = \\sigma/(2\\epsilon_0)$',     unit: 'N/C' },
];

export const ecfQuickRevision = [
    {
        icon: '⚡',
        title: 'Charge Fundamentals',
        points: [
            'Charge is conserved and quantized: $q = ne$.',
            'Like charges repel; unlike charges attract.',
            'Charge is scalar, but force/field are vectors.',
        ],
    },
    {
        icon: '🧲',
        title: "Coulomb's Law",
        points: [
            '$F \\propto q_1q_2$ and $F \\propto 1/r^2$.',
            'Direction is along line joining charges.',
            'Medium changes effective force through permittivity.',
        ],
    },
    {
        icon: '🌐',
        title: 'Electric Field',
        points: [
            '$E = F/q_0$ and for point charge $E = kq/r^2$.',
            'Field lines start on + and end on −.',
            'Line density indicates field strength.',
        ],
    },
    {
        icon: '🔵',
        title: "Gauss's Law",
        points: [
            'Always true: $\\Phi = q_{enc}/\\epsilon_0$.',
            'Useful for high symmetry only.',
            'Inside conductor at equilibrium: $E = 0$.',
        ],
    },
    {
        icon: '↔️',
        title: 'Dipole Essentials',
        points: [
            'Dipole moment points from −q to +q.',
            '$\\tau = pE\\sin\\theta$ tends to align dipole.',
            'At same r: $E_{axial}:E_{eq} = 2:1$.',
        ],
    },
    {
        icon: '⚠️',
        title: 'Common Traps',
        points: [
            'Do not use Gauss shortcut without symmetry.',
            'Do not ignore vector direction in superposition.',
            'Do not confuse flux (scalar) with field (vector).',
        ],
    },
];

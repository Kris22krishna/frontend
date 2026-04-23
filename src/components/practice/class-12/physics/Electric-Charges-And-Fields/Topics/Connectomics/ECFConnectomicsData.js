// ECFConnectomicsData.js — Mind Map clusters and chapter bridges

export const ECFClusters = [
    {
        id: 'charge',
        title: 'Electric Charge',
        color: '#4a2c8a',
        icon: '⚡',
        nodes: [
            {
                id: 'charge-types',
                label: 'Types & Properties',
                detail: 'Positive (deficiency of electrons) and negative (excess of electrons). Charge is additive, quantised (q = ne), and conserved. SI unit: Coulomb (C).'
            },
            {
                id: 'charge-transfer',
                label: 'Methods of Charging',
                detail: 'Friction (triboelectric): transfer of electrons. Conduction: direct contact with charged body. Induction: redistribution without contact — object gets opposite charge on near side.'
            },
            {
                id: 'charge-properties',
                label: 'Key Properties',
                detail: '(1) Like charges repel, unlike attract. (2) Charge is a scalar (with sign). (3) Charge of a body cannot change due to motion (relativistic invariance). (4) Ball discharged: q→0, no force.'
            }
        ]
    },
    {
        id: 'coulombs',
        title: "Coulomb's Law",
        color: '#be123c',
        icon: '⚖️',
        nodes: [
            {
                id: 'coulombs-formula',
                label: 'The Formula',
                detail: 'F = kq₁q₂/r². Vector form: F̂ = (kq₁q₂/r²) r̂₁₂. k = 9×10⁹ N·m²/C². Valid for point charges or uniformly charged spheres.'
            },
            {
                id: 'coulombs-vs-gravity',
                label: 'Comparison with Gravity',
                detail: 'Both are inverse-square laws with the same mathematical form (Fg = Gm₁m₂/r²). Key difference: gravity is always attractive; electrostatic force can be repulsive. Electrostatic force is ≈ 10³⁶ times stronger than gravity for electrons.'
            },
            {
                id: 'superposition-rule',
                label: 'Superposition',
                detail: 'Net force = vector sum of all pairwise forces. F_net = F₁₂ + F₁₃ + … (treat each pair independently; the presence of other charges does not alter individual pair forces).'
            }
        ]
    },
    {
        id: 'efield',
        title: 'Electric Field',
        color: '#1d4ed8',
        icon: '🌐',
        nodes: [
            {
                id: 'efield-concept',
                label: 'Field as a Mediator',
                detail: 'A source charge creates an E field in surrounding space. When another charge enters, it feels a force F = qE. The field exists independently of whether a test charge is present.'
            },
            {
                id: 'efield-point',
                label: 'Field Due to Point Charge',
                detail: 'E = kq/r². Direction: radially outward for +q, radially inward for −q. Magnitude decreases with distance squared.'
            },
            {
                id: 'efield-dipole',
                label: 'Field Due to Dipole',
                detail: 'Axial point (along p): E = 2kp/r³. Equatorial point (⊥ to p): E = kp/r³. At equatorial, E is antiparallel to p. Ratio E_axial : E_equatorial = 2 : 1 at same r.'
            }
        ]
    },
    {
        id: 'flux-gauss',
        title: 'Field Lines & Gauss\'s Law',
        color: '#15803d',
        icon: '🔵',
        nodes: [
            {
                id: 'field-lines-rules',
                label: 'Rules for Field Lines',
                detail: 'Start at +q, end at −q. Never cross. Density ∝ field strength. Always perpendicular to conducting surface. No lines inside a conductor at electrostatic equilibrium.'
            },
            {
                id: 'flux-concept',
                label: 'Electric Flux',
                detail: 'Φ = ∮E·dA = q_enc/ε₀. Flux is positive if net field exits the closed surface. Flux through a closed surface not enclosing any charge = 0.'
            },
            {
                id: 'gauss-applications',
                label: 'Gauss Applications',
                detail: '1. Point charge / sphere: Gaussian sphere → E = kq/r². 2. Infinite wire: Gaussian cylinder → E = λ/(2πε₀r). 3. Infinite plane: Gaussian pillbox → E = σ/(2ε₀). 4. Inside conductor: E = 0.'
            }
        ]
    },
    {
        id: 'dipole',
        title: 'Electric Dipole',
        color: '#b45309',
        icon: '↔️',
        nodes: [
            {
                id: 'dipole-moment',
                label: 'Dipole Moment',
                detail: 'p = q × 2l. Vector pointing from −q to +q. Magnitude p = 2ql. SI unit: C·m. Dipole is a permanent feature of polar molecules (H₂O, HCl).'
            },
            {
                id: 'dipole-torque',
                label: 'Torque in Uniform Field',
                detail: 'τ = pE sinθ. Torque tries to align dipole along the field. Stable equilibrium at θ = 0°. PE = −pE cosθ. At θ = 90°, U = 0 (reference). At θ = 180°, U = +pE (unstable).'
            },
            {
                id: 'dipole-in-nonuniform',
                label: 'Force in Non-Uniform Field',
                detail: 'In a non-uniform field, a dipole experiences a net force as well as a torque. The force is F = p · (dE/dx) along the direction of increasing field. Used in dielectrophoresis.'
            }
        ]
    },
    {
        id: 'distributions',
        title: 'Continuous Distributions',
        color: '#0d9488',
        icon: 'ρ',
        nodes: [
            {
                id: 'linear-density',
                label: 'Linear Charge Density (λ)',
                detail: 'λ = dq/dl (C/m). For an infinite wire: E = λ/(2πε₀r) using cylindrical Gaussian surface. Direction: radially outward (for +λ).'
            },
            {
                id: 'surface-density',
                label: 'Surface Charge Density (σ)',
                detail: 'σ = dq/dA (C/m²). For infinite nonconducting plane: E = σ/(2ε₀) on each side. For conductor surface: E = σ/ε₀ just outside. Inside conductor: E = 0.'
            },
            {
                id: 'volume-density',
                label: 'Volume Charge Density (ρ)',
                detail: 'ρ = dq/dV (C/m³). For uniformly charged solid sphere of radius R: Inside (r < R): E = ρr/(3ε₀). Outside (r > R): E = Q/(4πε₀r²). E is maximum at the surface.'
            }
        ]
    },
];

export const ECFBridges = [
    {
        icon: '📡',
        title: 'Chapter 2: Electrostatic Potential',
        color: '#4a2c8a',
        desc: 'Work done per unit charge to bring a test charge from ∞ to a point. V = kq/r. E = −∇V. Potential is the scalar companion to the vector E field studied here.'
    },
    {
        icon: '🔋',
        title: 'Chapter 3: Current Electricity',
        color: '#1d4ed8',
        desc: 'Moving charges constitute current. Ohm\'s Law and circuits are built on the foundation of charge, field, and potential developed in this chapter. Drift velocity concept links to coulomb\'s law.'
    },
    {
        icon: '🧲',
        title: 'Chapter 4: Magnetism',
        color: '#be123c',
        desc: 'A moving electric charge produces a magnetic field. B = μ₀qv × r̂/(4πr²). The electric and magnetic fields are deeply unified (Maxwell\'s Equations).'
    },
    {
        icon: '📡',
        title: 'Chapter 12: Electromagnetic Waves',
        color: '#15803d',
        desc: 'Oscillating E and B fields propagate as EM waves. Gauss\'s Law for electricity is one of Maxwell\'s four equations that predicts electromagnetic radiation.'
    },
    {
        icon: '🌌',
        title: 'Class 11 Gravitation (Analogy)',
        color: '#b45309',
        desc: 'Coulomb\'s Law (F ∝ 1/r²) is mathematically identical to Newton\'s Law of Gravitation. Both are inverse-square laws. All gravitational concepts (potential, field, Gauss) have electrical analogues.'
    },
];

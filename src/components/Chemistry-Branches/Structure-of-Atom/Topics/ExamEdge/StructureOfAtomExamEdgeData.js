export const structureOfAtomExamEdgeData = {
    exams: [
        {
            name: "JEE Mains",
            color: "#f59e0b",
            emoji: "🥇",
            weightage: "2-3 questions",
            freq: "8-12 marks per year",
            topics: ["Bohr Model (Energy, Radius, Velocity)", "Photoelectric Effect", "Quantum Numbers", "Heisenberg Uncertainty Principle"],
            strategy: "Focus on calculations involving Bohr's Model, Rydberg equation, and De Broglie wavelength. Quantum numbers are frequently asked in matching type questions.",
            pitfalls: ["Mixing up nm, cm⁻¹, and Angstroms in Rydberg calculations.", "Forgetting the Z² term in energy and radius formulas for He⁺, Li²⁺.", "Miscalculating radial nodes (n-l-1) vs angular nodes (l)."],
        },
        {
            name: "JEE Advanced",
            color: "#ef4444",
            emoji: "🔬",
            weightage: "1-2 questions",
            freq: "Heavily integrated with other chapters",
            topics: ["Graphs of Radial Probability Distribution", "Schrödinger Wave Equation Interpretation", "Exceptions in Electronic Configuration"],
            strategy: "Expect multi-concept questions. You might need to use atomic structure concepts alongside Thermodynamics or Chemical Kinetics. Deep understanding of radial probability graphs is essential.",
            pitfalls: ["Confusing radial probability function (4πr²R²) with the square of the radial wave function (R²).", "Not recognizing the mathematical form of s, p, d orbital wave functions."],
        },
        {
            name: "NEET",
            color: "#0d9488",
            emoji: "🩺",
            weightage: "2-4 questions",
            freq: "8-16 marks per year",
            topics: ["Quantum Numbers", "Electronic Configuration (Cr, Cu exceptions)", "Isotopes, Isobars, Isoelectronic"],
            strategy: "Questions are usually direct formulas or theory-based. Memorize the rules (Aufbau, Pauli, Hund) and practice rapid calculations for energy transitions.",
            pitfalls: ["Misinterpreting statements about Isobars, Isotones, and Isoelectronic species.", "Silly mistakes in frequency to energy conversions (E = hν = hc/λ)."],
        },
        {
            name: "KCET (Karnataka)",
            color: "#8b5cf6",
            emoji: "🌟",
            weightage: "2 questions",
            freq: "2 marks per year",
            topics: ["Rutherford & Thomson Models", "Fundamental Particles (Charge/Mass ratio)", "Basic Bohr Postulates"],
            strategy: "Very straightforward questions based directly on the NCERT textbook. Focus on basic definitions and simple atomic models.",
            pitfalls: ["Spending too much time on complex quantum mechanics when basic Bohr model is usually sufficient."],
        }
    ],
    proTips: [
        "Always double-check the 'Z' value (atomic number) when using Bohr model formulas for single-electron species.",
        "Quantum numbers (n, l, m, s) are guaranteed marks if you remember that 'l' can only go up to 'n-1'.",
        "Don't memorize complicated Schrödinger equations; focus completely on interpreting their graphs and nodes!"
    ],

    formulaSheet: [
        {
            formula: "rₙ = 0.529 n²/Z Å",
            meaning: "Bohr orbit radius",
            keyValues: "r₁(H) = 0.529 Å"
        },
        {
            formula: "Eₙ = −13.6 Z²/n² eV",
            meaning: "Bohr orbit energy",
            keyValues: "E₁(H) = −13.6 eV"
        },
        {
            formula: "1/λ = R·Z²(1/n₁² − 1/n₂²)",
            meaning: "Rydberg equation",
            keyValues: "R = 1.097×10⁷ m⁻¹"
        },
        {
            formula: "E = hν = hc/λ",
            meaning: "Photon energy",
            keyValues: "h = 6.626×10⁻³⁴ J·s"
        },
        {
            formula: "λ = h/mv = h/p",
            meaning: "de Broglie wavelength",
            keyValues: "λ = h/√(2mKE)"
        },
        {
            formula: "Δx·Δp ≥ h/4π",
            meaning: "Heisenberg principle",
            keyValues: "Δx·Δv ≥ h/4πm"
        },
        {
            formula: "mvr = nh/2π",
            meaning: "Angular momentum (Bohr)",
            keyValues: "n = 1, 2, 3..."
        },
        {
            formula: "Lines = n(n−1)/2",
            meaning: "Spectral lines from n",
            keyValues: "n=5 → 10 lines"
        },
        {
            formula: "Nodes (radial) = n−l−1",
            meaning: "Radial nodes",
            keyValues: "3s: n−l−1 = 2"
        },
        {
            formula: "Max e⁻ in shell = 2n²",
            meaning: "Shell capacity",
            keyValues: "n=3: 18 electrons"
        }
    ],

    quickRevision: [
        {
            title: "⚛️ Sub-atomic Particles",
            bulletPoints: [
                "Electron: J.J. Thomson (1897), cathode rays, e/m = 1.76×10¹¹ C/kg",
                "Proton: Goldstein/canal rays, H⁺ smallest e/m",
                "Neutron: Chadwick (1932), Be+α → neutral particles",
                "Isotopes (same Z), Isobars (same A), Isotones (same n)"
            ]
        },
        {
            title: "🔬 Atomic Models",
            bulletPoints: [
                "Thomson: plum pudding — fails Rutherford",
                "Rutherford: nuclear model — fails stability & line spectrum",
                "Bohr: quantised orbits — fails multi-electron, Heisenberg",
                "Gold foil: ZnS screen, α-particles, 1 in 20,000 bounce back"
            ]
        },
        {
            title: "🔢 Bohr Formulas (H-like only)",
            bulletPoints: [
                "rₙ = 0.529 × n²/Z Å",
                "Eₙ = −13.6 × Z²/n² eV",
                "KE = −Eₙ · PE = 2Eₙ",
                "Angular momentum = nh/2π"
            ]
        },
        {
            title: "🌈 Spectral Series",
            bulletPoints: [
                "Lyman (n₁=1) → UV",
                "Balmer (n₁=2) → Visible",
                "Paschen (n₁=3) → Near IR",
                "Brackett (n₁=4) → Mid IR",
                "Pfund (n₁=5) → Far IR",
                "Lines from nth level = n(n−1)/2"
            ]
        },
        {
            title: "〰️ de Broglie & Heisenberg",
            bulletPoints: [
                "λ = h/mv = h/p = h/√(2mKE)",
                "Δx·Δp ≥ h/4π (NOT h/2π)",
                "Heisenberg invalidates Bohr's definite orbits",
                "Davisson-Germer confirmed electron diffraction"
            ]
        },
        {
            title: "🔑 Quantum Numbers",
            bulletPoints: [
                "n: energy & size (1,2,3...); max e⁻ = 2n²",
                "l: shape (0 to n−1); s,p,d,f",
                "m_l: orientation (−l to +l); orbitals = 2l+1",
                "m_s: spin (±½ only)"
            ]
        },
        {
            title: "🌐 Nodes",
            bulletPoints: [
                "Radial nodes = n − l − 1",
                "Angular nodes = l",
                "Total nodes = n − 1",
                "3d: 0 radial, 2 angular; 2s: 1 radial, 0 angular"
            ]
        },
        {
            title: "⚠️ Top NEET Traps",
            bulletPoints: [
                "Cr: [Ar] 3d⁵ 4s¹ (NOT 3d⁴ 4s²)",
                "Cu: [Ar] 3d¹⁰ 4s¹ (NOT 3d⁹ 4s²)",
                "Remove s electrons before d in cations",
                "\'4th excited state\' = n = 5 level",
                "Balmer = ONLY visible series",
                "Heisenberg uses h/4π not h/2π"
            ]
        }
    ]
};

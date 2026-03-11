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
    ]
};

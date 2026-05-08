export const TERMS = [
    {
        icon: '💧',
        name: 'Solution',
        color: '#3b82f6',
        def: 'A homogeneous mixture of two or more chemically non-reacting substances. The composition can be varied within certain limits.',
        examples: [
            'Sugar dissolved in water',
            'Air (mixture of gases)',
            'Brass (Cu + Zn solid solution)'
        ],
        inUse: '"Seawater is a solution of various salts dissolved in water."',
        memory: 'SOLUTion = SOLUte dissolves in solVENT — always uniform throughout',
    },
    {
        icon: '🫧',
        name: 'Solute',
        color: '#8b5cf6',
        def: 'The substance that is dissolved or present in smaller proportion in a solution. It is the minor component.',
        examples: [
            'Sugar in lemonade',
            'Salt in seawater',
            'CO₂ in carbonated drinks'
        ],
        inUse: '"NaCl is the solute when we dissolve common salt in water."',
        memory: 'soLUTE = the LITTLE one (smaller amount)',
    },
    {
        icon: '🌊',
        name: 'Solvent',
        color: '#0ea5e9',
        def: 'The dissolving medium, usually present in larger proportion. Water is called the "universal solvent".',
        examples: [
            'Water in sugar solution',
            'Acetone in nail polish remover',
            'N₂ in air (78%)'
        ],
        inUse: '"Water acts as the solvent in most biological and chemical reactions."',
        memory: 'solVENT = the VAST one (larger amount)',
    },
    {
        icon: '📊',
        name: 'Molarity (M)',
        color: '#ef4444',
        def: 'Number of moles of solute dissolved per litre of solution. M = n/V (in litres). Changes with temperature since volume changes.',
        examples: [
            '1 M NaCl = 1 mol NaCl in 1 L solution',
            '0.5 M H₂SO₄ = 0.5 mol in 1 L'
        ],
        inUse: '"A 2 M glucose solution contains 2 moles of glucose per litre of solution."',
        memory: 'Molarity has an L for Litres — volume-based, so temperature-dependent',
    },
    {
        icon: '⚖️',
        name: 'Molality (m)',
        color: '#10b981',
        def: 'Number of moles of solute per kilogram of solvent (not solution!). m = n/W (kg). Independent of temperature.',
        examples: [
            '1 m NaCl = 1 mol NaCl in 1 kg water',
            '0.1 m urea = 0.1 mol in 1 kg solvent'
        ],
        inUse: '"Molality is preferred in colligative property calculations because it is temperature-independent."',
        memory: 'molaLity = mass-based (kg) — temperature doesn\'t affect mass!',
    },
    {
        icon: '🔢',
        name: 'Mole Fraction (x)',
        color: '#f59e0b',
        def: 'Ratio of moles of one component to the total moles of all components. x₁ + x₂ = 1 for a binary solution.',
        examples: [
            'x₁ = n₁ / (n₁ + n₂)',
            'If n₁ = 2, n₂ = 3, then x₁ = 2/5 = 0.4'
        ],
        inUse: '"The mole fraction of oxygen in dry air is approximately 0.21."',
        memory: 'Mole FRACTION — it\'s literally a fraction, and all fractions add up to 1',
    },
    {
        icon: '📏',
        name: 'Parts per Million (ppm)',
        color: '#ec4899',
        def: 'Number of parts of a component per million parts of the solution (by mass). Used for very dilute solutions.',
        examples: [
            'Fluoride in water: ~1 ppm',
            'CO₂ in atmosphere: ~420 ppm'
        ],
        inUse: '"The permissible limit of lead in drinking water is 50 ppm."',
        memory: 'PPM = for TINY amounts — think pollution, trace elements',
    },
    {
        icon: '🔬',
        name: 'Henry\'s Law',
        color: '#6366f1',
        def: 'The partial pressure of a gas in vapour phase (p) is proportional to the mole fraction (x) of the gas in solution: p = K_H · x.',
        examples: [
            'CO₂ dissolves more in soda at higher pressure',
            'Scuba divers and "the bends" (N₂ dissolving in blood)'
        ],
        inUse: '"Henry\'s Law explains why carbonated drinks fizz when opened — the pressure drops, releasing dissolved CO₂."',
        memory: 'HENRY says: more Pressure → more gas dissolves (directly proportional)',
    },
    {
        icon: '📈',
        name: 'Raoult\'s Law',
        color: '#7c3aed',
        def: 'For a solution of volatile liquids, the partial vapour pressure of each component is equal to its mole fraction times its pure vapour pressure: p₁ = x₁ · p₁⁰.',
        examples: [
            'p₁ = x₁ · p₁⁰ (for component 1)',
            'p_total = p₁ + p₂ = x₁p₁⁰ + x₂p₂⁰'
        ],
        inUse: '"An ideal solution perfectly obeys Raoult\'s Law at all concentrations."',
        memory: 'RAOULT = Ratio × pure pressure. The mole fraction scales the pure VP down.',
    },
    {
        icon: '🧊',
        name: 'Colligative Properties',
        color: '#0d9488',
        def: 'Properties of solutions that depend only on the NUMBER of solute particles, not on the nature/identity of the solute.',
        examples: [
            'Boiling point elevation (ΔTb = Kb · m)',
            'Freezing point depression (ΔTf = Kf · m)',
            'Osmotic pressure (π = CRT)',
            'Relative lowering of vapour pressure'
        ],
        inUse: '"Adding salt to roads in winter uses the colligative property of freezing point depression."',
        memory: 'COLLI-gative = COLLECT particles. Only the COUNT of particles matters!',
    },
];

export const KEY_LAWS = [
    { num: 1, emoji: '🔬', title: 'Henry\'s Law', rule: 'p = K_H · x', detail: 'The partial pressure of a gas in the vapour phase is directly proportional to the mole fraction of the gas in the solution at a given temperature.', examples: ['Applies to gases dissolving in liquids at moderate pressures'], tip: 'K_H is Henry\'s constant — different for each gas-solvent pair. Higher K_H means lower solubility.', color: '#6366f1' },
    { num: 2, emoji: '📈', title: 'Raoult\'s Law', rule: 'p₁ = x₁ · p₁⁰', detail: 'For a solution of volatile liquids, the partial vapour pressure of each component equals the product of its mole fraction and pure component vapour pressure.', examples: ['Foundation of ideal solution behaviour'], tip: 'Total pressure: p_total = x₁p₁⁰ + x₂p₂⁰. Graph is a straight line for ideal solutions.', color: '#7c3aed' },
    { num: 3, emoji: '🌡️', title: 'Boiling Point Elevation', rule: 'ΔTb = Kb · m', detail: 'Adding a non-volatile solute raises the boiling point. ΔTb is directly proportional to molality.', examples: ['Adding salt to water raises its boiling point above 100°C'], tip: 'Kb is the ebullioscopic constant — unique for each solvent. For water, Kb = 0.52 K·kg/mol.', color: '#ef4444' },
    { num: 4, emoji: '🧊', title: 'Freezing Point Depression', rule: 'ΔTf = Kf · m', detail: 'Adding a solute lowers the freezing point. ΔTf is directly proportional to molality.', examples: ['Antifreeze in car radiators prevents water from freezing'], tip: 'Kf is the cryoscopic constant. For water, Kf = 1.86 K·kg/mol.', color: '#3b82f6' },
    { num: 5, emoji: '🫧', title: 'Osmotic Pressure', rule: 'π = CRT', detail: 'The minimum pressure required to stop the flow of solvent from a dilute to concentrated solution through a semi-permeable membrane.', examples: ['IV fluids must be isotonic with blood'], tip: 'C = molarity, R = gas constant, T = temperature in Kelvin. Best method for molar mass of polymers.', color: '#10b981' },
];

export const VOCAB_QUIZ = [
    {
        question: 'Which concentration unit is independent of temperature?',
        options: [
            'Molarity',
            'Volume percentage',
            'Molality',
            'Mass/Volume percentage'
        ],
        correct: 2,
        explanation: 'Molality (m) is defined as moles of solute per kg of solvent. Since mass doesn\'t change with temperature, molality remains constant.'
    },
    {
        question: 'According to Henry\'s Law, what happens to gas solubility when pressure increases?',
        options: [
            'Solubility decreases',
            'Solubility increases',
            'Solubility remains constant',
            'The gas escapes'
        ],
        correct: 1,
        explanation: 'Henry\'s Law states p = K_H · x. Increasing pressure (p) increases mole fraction (x), meaning more gas dissolves.'
    },
    {
        question: 'Which of the following is NOT a colligative property?',
        options: [
            'Boiling point elevation',
            'Osmotic pressure',
            'Optical rotation',
            'Freezing point depression'
        ],
        correct: 2,
        explanation: 'Optical rotation depends on the nature of the solute, not just the number of particles. Colligative properties depend only on the number of solute particles.'
    },
    {
        question: 'For an ideal solution, which condition is true?',
        options: [
            'ΔH_mix > 0',
            'ΔV_mix < 0',
            'It shows positive deviation from Raoult\'s Law',
            'ΔH_mix = 0 and ΔV_mix = 0'
        ],
        correct: 3,
        explanation: 'An ideal solution obeys Raoult\'s Law perfectly. The enthalpy of mixing (ΔH_mix) and volume of mixing (ΔV_mix) are both zero.'
    },
    {
        question: 'What is the formula for the mole fraction of component A in a binary solution?',
        options: [
            'x_A = n_A × n_B',
            'x_A = n_A / (n_A + n_B)',
            'x_A = n_A / n_B',
            'x_A = (n_A + n_B) / n_A'
        ],
        correct: 1,
        explanation: 'Mole fraction is the ratio of moles of one component to the total moles of all components: x_A = n_A / (n_A + n_B).'
    }
];

export const TERMS = [
    {
        icon: '⚗️',
        name: 'Chemical Reaction',
        color: '#f97316',
        def: 'A process in which reactants are converted into products with entirely different chemical properties.',
        examples: [
            'Fe + CuSO₄ → FeSO₄ + Cu'
        ],
        inUse: '"The chemical reaction between zinc and sulphuric acid releases hydrogen gas."',
        memory: 'CHANGE with new substances = Chemical Reaction',
    },
    {
        icon: '🧪',
        name: 'Reactant',
        color: '#38bdf8',
        def: 'The starting substance(s) that undergo change in a chemical reaction. Found on the LEFT side of the equation.',
        examples: [
            'Mg + O₂ → MgO   (Mg and O₂ are reactants)'
        ],
        inUse: '"Magnesium and oxygen are the reactants in the combustion equation."',
        memory: 'RE-acts = it\'s the one that acts first (left side)',
    },
    {
        icon: '✨',
        name: 'Product',
        color: '#a3e635',
        def: 'New substance(s) formed after a chemical reaction. Found on the RIGHT side of the equation.',
        examples: [
            'Zn + 2HCl → ZnCl₂ + H₂   (ZnCl₂ and H₂ are products)'
        ],
        inUse: '"The product of photosynthesis is glucose and oxygen."',
        memory: 'PROduced = the result; always on the right',
    },
    {
        icon: '⚖️',
        name: 'Balanced Equation',
        color: '#818cf8',
        def: 'A chemical equation where the number of atoms of each element is equal on both sides, following the Law of Conservation of Mass.',
        examples: [
            '2H₂ + O₂ → 2H₂O   (4H, 2O = 4H, 2O)'
        ],
        inUse: '"A balanced equation ensures no atoms are gained or lost in the reaction."',
        memory: 'Balance = both sides of a scale equal',
    },
    {
        icon: '🔥',
        name: 'Exothermic',
        color: '#ef4444',
        def: 'A reaction that releases heat energy to the surroundings. Temperature of surroundings increases.',
        examples: [
            'CH₄ + 2O₂ → CO₂ + 2H₂O + Heat'
        ],
        inUse: '"Respiration is an exothermic reaction — it releases energy to keep us alive."',
        memory: 'EXO = exits; heat exits the system',
    },
    {
        icon: '❄️',
        name: 'Endothermic',
        color: '#22d3ee',
        def: 'A reaction that absorbs heat energy from the surroundings. Temperature of surroundings decreases.',
        examples: [
            'C + H₂O → CO + H₂'
        ],
        inUse: '"Photosynthesis is endothermic — plants absorb sunlight to make food."',
        memory: 'ENDO = enters; heat enters the system',
    },
    {
        icon: '🌊',
        name: 'Precipitate',
        color: '#f59e0b',
        def: 'An insoluble solid formed when two solutions react. It appears as a suspension or settles at the bottom.',
        examples: [
            'Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl'
        ],
        inUse: '"A white precipitate of BaSO₄ formed when barium chloride was added."',
        memory: 'Pre-CIPITATE = drops down (↓)',
    },
    {
        icon: '📉',
        name: 'Oxidation',
        color: '#d946ef',
        def: 'A reaction where a substance gains oxygen or loses hydrogen (or loses electrons in advanced chemistry).',
        examples: [
            '2Mg + O₂ → 2MgO'
        ],
        inUse: '"Iron is oxidised when it rusts — Fe₂O₃ is the rust formed."',
        memory: 'OIL RIG: Oxidation Is Loss (of electrons/hydrogen), Gain (of oxygen)',
    },
    {
        icon: '📈',
        name: 'Reduction',
        color: '#14b8a6',
        def: 'A reaction where a substance loses oxygen or gains hydrogen (or gains electrons). Opposite of oxidation.',
        examples: [
            'CuO + H₂ → Cu + H₂O'
        ],
        inUse: '"In the thermite reaction, iron oxide is reduced to iron."',
        memory: 'OIL RIG: Reduction Is Gain (of electrons/hydrogen)',
    },
    {
        icon: '💧',
        name: 'Corrosion',
        color: '#8b5cf6',
        def: 'Slow deterioration of metals by reaction with moisture, air, or chemicals. Rusting is corrosion of iron.',
        examples: [
            '4Fe + 3O₂ + xH₂O → 2Fe₂O₃·xH₂O'
        ],
        inUse: '"Painting metal prevents corrosion by blocking contact with moisture and air."',
        memory: 'CORROSion = CORROdes the metal surface',
    },
];

export const COOL_REACTIONS = [
    { num: 1, emoji: '🔥', title: 'Burning Magnesium', rule: '2Mg + O₂ → 2MgO', detail: 'Magnesium ribbon burns with a dazzling white flame to form white magnesium oxide powder.', examples: ['Requires heat to start'], tip: 'Always clean the ribbon with sandpaper first!', color: '#ef4444' },
    { num: 2, emoji: '🌿', title: 'Photosynthesis', rule: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', detail: 'Plants convert carbon dioxide and water into glucose and oxygen using sunlight.', examples: ['Endothermic process'], tip: 'Occurs in the presence of sunlight and chlorophyll.', color: '#22c55e' },
    { num: 3, emoji: '💨', title: 'Zinc + Acid', rule: 'Zn + 2HCl → ZnCl₂ + H₂↑', detail: 'Zinc metal reacts with dilute hydrochloric acid to produce hydrogen gas.', examples: ['Displacement reaction'], tip: 'Test for H₂ gas: brings a burning match, it "pops"!', color: '#8b5cf6' },
    { num: 4, emoji: '🫁', title: 'Respiration', rule: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy', detail: 'Glucose breaks down in the presence of oxygen to release energy for the body.', examples: ['Exothermic process'], tip: 'This is the exact reverse reaction of photosynthesis.', color: '#ec4899' },
    { num: 5, emoji: '🟫', title: 'Rusting of Iron', rule: '4Fe + 3O₂ + xH₂O → 2Fe₂O₃·xH₂O', detail: 'Iron metal reacts slowly with oxygen and moisture to form reddish-brown rust.', examples: ['Corrosion'], tip: 'Needs BOTH air and water to happen.', color: '#f59e0b' },
];

export const VOCAB_QUIZ = [
    {
        question: 'Which term describes a substance that is present at the START of a chemical reaction?',
        options: [
            'Product',
            'Precipitate',
            'Reactant',
            'Catalyst'
        ],
        correct: 2,
        explanation: 'Reactants are the starting substances, always found on the left side of the arrow.'
    },
    {
        question: 'What is the name for an insoluble solid that forms and settles out of a liquid mixture?',
        options: [
            'Solute',
            'Precipitate',
            'Reactant',
            'Oxide'
        ],
        correct: 1,
        explanation: 'A precipitate is an insoluble solid that falls out of a solution (represented by ↓ in equations).'
    },
    {
        question: 'In which type of reaction is heat absorbed from the surroundings, causing a drop in temperature?',
        options: [
            'Endothermic',
            'Exothermic',
            'Combustion',
            'Oxidation'
        ],
        correct: 0,
        explanation: 'ENDOthermic reactions take heat IN, making the surroundings feel colder.'
    },
    {
        question: 'According to the Law of Conservation of Mass, what must be true about a balanced chemical equation?',
        options: [
            'There must be more reactants than products',
            'The number of atoms of each element must be equal on both sides',
            'All products must be gases',
            'It must be an exothermic reaction'
        ],
        correct: 1,
        explanation: 'Mass cannot be created or destroyed, so the atom count for each element must be identical on both sides.'
    },
    {
        question: 'If a substance gains oxygen during a reaction, what process has it undergone?',
        options: [
            'Reduction',
            'Oxidation',
            'Precipitation',
            'Corrosion'
        ],
        correct: 1,
        explanation: 'Oxidation is the gain of oxygen (or loss of hydrogen).'
    }
];

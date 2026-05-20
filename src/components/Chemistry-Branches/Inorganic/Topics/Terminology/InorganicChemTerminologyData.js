export const TERMS = [
    {
        name: 'Atom',
        color: '#10b981',
        icon: '⚛️',
        def: 'The smallest particle of an element that retains all the chemical properties of that element. An atom consists of a nucleus (protons + neutrons) surrounded by electrons.',
        examples: ['A single hydrogen (H) atom', 'A single carbon (C) atom', 'A single iron (Fe) atom'],
        inUse: 'Atoms are electrically neutral — the number of protons (positive) equals the number of electrons (negative).',
        memory: 'From Greek "atomos" = uncuttable. Dalton proved all matter is made of atoms in 1808.'
    },
    {
        name: 'Atomic Number (Z)',
        color: '#0d9488',
        icon: '🔢',
        def: 'The number of protons in the nucleus of an atom. It uniquely identifies every element and determines its position in the Periodic Table.',
        examples: ['Hydrogen (H): Z = 1', 'Carbon (C): Z = 6', 'Sodium (Na): Z = 11', 'Iron (Fe): Z = 26'],
        inUse: 'For a neutral atom, Z = number of protons = number of electrons.',
        memory: '"Z" comes from German "Zahl" meaning number. It\'s the element\'s unique identity number in the Periodic Table.'
    },
    {
        name: 'Mass Number (A)',
        color: '#059669',
        icon: '⚖️',
        def: 'The total number of protons and neutrons (collectively called nucleons) in the nucleus of an atom. Written as a superscript before the element symbol.',
        examples: ['Carbon-12: A = 12 (6 protons + 6 neutrons)', 'Sodium-23: A = 23 (11 protons + 12 neutrons)', 'Chlorine-35: A = 35 (17 protons + 18 neutrons)'],
        inUse: 'A = Z + n (neutrons). Mass number is always a whole number; atomic mass may be a decimal due to isotope mixtures.',
        memory: 'A is at the top (superscript in ¹²₆C). Add protons (Z) and neutrons at the top to get A.'
    },
    {
        name: 'Neutron Count (n)',
        color: '#047857',
        icon: '🔵',
        def: 'The number of neutrons in the nucleus of an atom, calculated by subtracting the atomic number from the mass number.',
        examples: ['Chlorine-35 (Z=17): n = 35 − 17 = 18', 'Oxygen-16 (Z=8): n = 16 − 8 = 8', 'Sodium-23 (Z=11): n = 23 − 11 = 12'],
        inUse: 'Neutrons have no electric charge — they stabilise the nucleus by reducing repulsion between the positively charged protons.',
        memory: 'n = A − Z. Neutrons are the "neutral fillers" that hold the nucleus together.'
    },
    {
        name: 'Isotope',
        color: '#10b981',
        icon: '⚖️',
        def: 'Atoms of the same element (same atomic number Z) but with different mass numbers A (i.e., different numbers of neutrons).',
        examples: ['¹H, ²H (deuterium), ³H (tritium) — all hydrogen isotopes', '¹²C and ¹⁴C — carbon isotopes used in radiocarbon dating'],
        inUse: 'Isotopes have identical chemical properties (same Z) but different physical properties (different mass).',
        memory: '"Iso" = same, "tope" = place. Isotopes share the same place in the Periodic Table but have different masses.'
    },
    {
        name: 'Isobar',
        color: '#0891b2',
        icon: '🏋️',
        def: 'Atoms of different elements (different atomic numbers Z) that have the same mass number A.',
        examples: ['¹⁴₆C and ¹⁴₇N — both have A = 14', '⁴⁰₁₈Ar and ⁴⁰₂₀Ca — both have A = 40'],
        inUse: 'Isobars have completely different chemical properties because they are different elements.',
        memory: '"Bar" suggests weight/mass. Isobars share the same mass number but are different elements.'
    },
    {
        name: 'Valency',
        color: '#14b8a6',
        icon: '🤝',
        def: 'The combining capacity of an atom — the number of electrons an atom gains, loses, or shares when bonding with other atoms.',
        examples: ['Hydrogen: valency 1', 'Oxygen: valency 2', 'Nitrogen: valency 3', 'Carbon: valency 4'],
        inUse: 'Valency is determined by the electrons in the outermost shell (valence electrons). Elements bond to complete their outer shell to 8 electrons.',
        memory: 'Valency = "value" of bonding strength. The outermost shell electrons decide how many bonds an atom can make.'
    },
    {
        name: 'Ionic Bond',
        color: '#0ea5e9',
        icon: '⚡',
        def: 'A chemical bond formed by the complete transfer of one or more electrons from a metal atom to a non-metal atom, producing oppositely charged ions that attract each other.',
        examples: ['NaCl: Na gives 1e⁻ to Cl → Na⁺ and Cl⁻', 'MgO: Mg gives 2e⁻ to O → Mg²⁺ and O²⁻', 'KBr: K gives 1e⁻ to Br'],
        inUse: 'Ionic compounds form crystals, have high melting points, and conduct electricity when dissolved in water or melted.',
        memory: 'Ionic = electron transfer. Metals give electrons, non-metals receive them. Think: "I own your electron now!"'
    },
    {
        name: 'Covalent Bond',
        color: '#7c3aed',
        icon: '🔗',
        def: 'A chemical bond formed by the sharing of one or more pairs of electrons between two atoms, usually both non-metals.',
        examples: ['H₂: each H shares 1 electron', 'H₂O: O shares 2 electron pairs with 2 H atoms', 'CO₂: C shares 2 pairs with each O atom'],
        inUse: 'Covalent compounds are usually gases or liquids at room temperature and generally do NOT conduct electricity.',
        memory: 'Covalent = "Co-valent" (sharing valence electrons). Like two friends sharing homework — both benefit!'
    },
];

export const KEY_IDENTITIES = [
    {
        name: 'Neutron Calculation',
        desc: 'The number of neutrons in any atom equals the mass number minus the atomic number. This is the most basic calculation in atomic structure.',
        formula: 'n = A - Z'
    },
    {
        name: 'Shell Electron Capacity',
        desc: 'The maximum number of electrons that can be accommodated in the nth electron shell (orbit) is given by the formula 2n².',
        formula: '\\text{Max electrons in shell }n = 2n^2'
    },
    {
        name: 'Shell Capacities (K to N)',
        desc: 'Applying 2n², the four main electron shells can hold these fixed maximum numbers of electrons.',
        formula: 'K\\text{-shell}=2,\\quad L\\text{-shell}=8,\\quad M\\text{-shell}=18,\\quad N\\text{-shell}=32'
    },
    {
        name: 'Subshell Electron Capacities',
        desc: 'Within shells, electrons are arranged in subshells. Each subshell type holds a fixed maximum number of electrons.',
        formula: 's=2,\\quad p=6,\\quad d=10,\\quad f=14'
    },
    {
        name: 'Octet Rule',
        desc: 'Atoms tend to gain, lose, or share electrons to achieve 8 electrons in their outermost shell — the stable configuration of noble gases. Hydrogen and helium follow the duplet rule (2 electrons).',
        formula: '\\text{Stable outer shell: 8 electrons (octet) or 2 electrons (duplet for H, He)}'
    },
];

export const VOCAB_QUIZ = [
    {
        question: 'An element has atomic number Z = 11 and mass number A = 23. How many neutrons does it have?',
        options: ['11', '12', '23', '34'],
        correct: 1,
        explanation: 'Neutrons = A − Z = 23 − 11 = 12. This is Sodium-23 (Na). Z = 11 gives 11 protons and 11 electrons in the neutral atom.'
    },
    {
        question: 'Which property uniquely identifies every element in the Periodic Table?',
        options: ['Mass Number (A)', 'Neutron Count (n)', 'Atomic Number (Z)', 'Atomic Mass (u)'],
        correct: 2,
        explanation: 'Atomic Number (Z) = number of protons — this is unique for every element. Isotopes of the same element share Z but differ in A.'
    },
    {
        question: 'Sodium transfers one electron to Chlorine to form NaCl. What type of bond is this?',
        options: ['Covalent bond', 'Hydrogen bond', 'Ionic bond', 'Metallic bond'],
        correct: 2,
        explanation: 'Complete electron transfer from a metal (Na) to a non-metal (Cl) forms an ionic bond. Na⁺ and Cl⁻ attract each other electrostatically.'
    },
    {
        question: 'Two hydrogen atoms share one electron pair to form H₂. What type of bond is this?',
        options: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Van der Waals'],
        correct: 1,
        explanation: 'Sharing of electron pairs between atoms forms covalent bonds. H₂, H₂O, and CO₂ are all examples of covalent compounds.'
    },
    {
        question: 'The maximum number of electrons in the M shell (n = 3) is:',
        options: ['8', '18', '32', '2'],
        correct: 1,
        explanation: 'Using 2n² = 2 × 3² = 2 × 9 = 18. The M shell can hold a maximum of 18 electrons (3s, 3p, and 3d subshells combined).'
    },
    {
        question: 'Atoms of the same element with different numbers of neutrons are called:',
        options: ['Isobars', 'Isotopes', 'Ions', 'Isomers'],
        correct: 1,
        explanation: 'Isotopes have the same atomic number (Z) but different mass numbers (A) — meaning different neutron counts. Example: ¹²C and ¹⁴C are both carbon (Z=6).'
    },
    {
        question: '¹⁴C (Z=6) and ¹⁴N (Z=7) both have mass number 14. They are called:',
        options: ['Isotopes', 'Isobars', 'Isotones', 'Allotropes'],
        correct: 1,
        explanation: 'Isobars are atoms of different elements (different Z) with the same mass number (A). ¹⁴C (Z=6) and ¹⁴N (Z=7) are isobars — both A=14 but different elements.'
    },
    {
        question: 'Oxygen (Z=8, K=2, L=6) has a valency of:',
        options: ['6', '4', '2', '8'],
        correct: 2,
        explanation: 'Oxygen has 6 outer electrons. Valency = 8 − 6 = 2 (it gains 2 electrons to complete its octet). This is why water is H₂O (oxygen bonds with 2 hydrogens).'
    },
    {
        question: 'The maximum number of electrons in the K-shell (n=1) is:',
        options: ['8', '18', '2', '32'],
        correct: 2,
        explanation: 'K-shell: n=1. Using 2n² = 2×1² = 2. The K-shell holds a maximum of 2 electrons (filled by hydrogen and helium).'
    },
    {
        question: 'In a covalent bond, electrons are:',
        options: ['Transferred from metal to non-metal', 'Shared between two atoms', 'Gained by the metal atom', 'Destroyed in the reaction'],
        correct: 1,
        explanation: 'Covalent bonds involve sharing of electron pairs between atoms (usually both non-metals). No transfer occurs — both atoms contribute to and benefit from the shared pair.'
    },
    {
        question: 'An atom with 17 protons (Z=17) and mass number 35 has how many neutrons?',
        options: ['17', '35', '18', '52'],
        correct: 2,
        explanation: 'Neutrons = A − Z = 35 − 17 = 18. This is Chlorine-35. Z=17 gives 17 protons; 35 − 17 = 18 neutrons.'
    },
    {
        question: 'Which sub-atomic particle has NO electric charge?',
        options: ['Proton', 'Electron', 'Neutron', 'Ion'],
        correct: 2,
        explanation: 'Neutrons are electrically neutral (charge = 0). Protons have charge +1 and electrons have charge −1. Neutrons stabilise the nucleus by reducing proton-proton repulsion.'
    },
];

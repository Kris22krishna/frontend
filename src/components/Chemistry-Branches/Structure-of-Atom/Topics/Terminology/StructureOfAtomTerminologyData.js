export const TERMS = [
    {
        name: 'Isotope',
        color: '#3b82f6',
        icon: '⚖️',
        def: 'Atoms of the same element having the same atomic number but different mass numbers (different number of neutrons).',
        examples: ['Carbon-12 and Carbon-14', 'Protium (${}^{1}H$), Deuterium (${}^{2}H$), Tritium (${}^{3}H$)'],
        inUse: 'Isotopes of an element share exactly the same chemical properties.',
        memory: 'Iso=Same, Tope=Top (Mass number varies at the top).'
    },
    {
        name: 'Isobar',
        color: '#8b5cf6',
        icon: '🏋️',
        def: 'Atoms of different elements having the same mass number but different atomic numbers.',
        examples: ['Argon-40 (${}^{40}_{18}Ar$) and Calcium-40 (${}^{40}_{20}Ca$)'],
        inUse: 'They have completely different chemical properties.',
        memory: '"Bar" refers to weight/mass. Same mass, different atom.'
    },
    {
        name: 'Orbital',
        color: '#ec4899',
        icon: '☁️',
        def: 'A 3D region in space around the nucleus where the probability of finding an electron is maximum.',
        examples: ['$s$ (spherical), $p$ (dumbbell), $d$ (double dumbbell)'],
        inUse: 'Each orbital can hold a maximum of 2 electrons.',
        memory: 'Not an orbit! An orbit is a path, an orbital is a cloudy region.'
    },
    {
        name: 'Node',
        color: '#ef4444',
        icon: '🚫',
        def: 'A region or point in space where the probability of finding an electron is precisely zero.',
        examples: ['Radial nodes (spherical shells)', 'Angular nodes (planes or cones)'],
        inUse: 'Total number of nodes $= n - 1$.',
        memory: 'No-de = NO electron.'
    },
    {
        name: 'Quantum Number',
        color: '#10b981',
        icon: '🔢',
        def: 'A set of four numbers used to uniquely describe the complete state (energy, shape, orientation, and spin) of an electron in an atom.',
        examples: ['Principal ($n$)', 'Azimuthal ($l$)', 'Magnetic ($m_l$)', 'Spin ($m_s$)'],
        inUse: 'Calculated from the Schrödinger wave equation.',
        memory: 'Think of it as the exact home address of an electron.'
    }
];

export const FIVE_RULES = [
    {
        num: 1,
        title: 'Aufbau Principle',
        rule: 'Orbitals are filled with electrons in order of their increasing energy levels.',
        emoji: '🧱',
        color: '#0ea5e9',
        detail: 'Electrons first occupy the lowest energy orbital available in the ground state. The sequence follows the $(n+l)$ rule.',
        examples: ['Fill $1s$ first, then $2s$, then $2p$, then $3s$...'],
        tip: '"Aufbau" is German for "building up".'
    },
    {
        num: 2,
        title: 'Pauli Exclusion Principle',
        rule: 'No two electrons in the same atom can have the same set of all four quantum numbers.',
        emoji: '🚫',
        color: '#f59e0b',
        detail: 'If two electrons share the same orbital (meaning same $n$, $l$, and $m_l$), they MUST have opposite spins ($+1/2$ and $-1/2$).',
        examples: ['An orbital holds max 2 electrons: $\\uparrow \\downarrow$ (correct) vs $\\uparrow \\uparrow$ (wrong)'],
        tip: 'Each electron needs a unique identity (address).'
    },
    {
        num: 3,
        title: "Hund's Rule",
        rule: 'Electron pairing in degenerate orbitals cannot occur until each orbital contains one electron.',
        emoji: '🚌',
        color: '#14b8a6',
        detail: 'In a given subshell (like $p$, $d$, or $f$), all singly occupied orbitals must have electrons with parallel spins before they pair up.',
        examples: ['Nitrogen $2p^3$: $\\uparrow\\ \\uparrow\\ \\uparrow$ (correct) vs $\\uparrow\\downarrow\\ \\uparrow\\ \\ $ (wrong)'],
        tip: 'Strangers on a bus sit in empty seats first before pairing up.'
    },
    {
        num: 4,
        title: 'Heisenberg Uncertainty Principle',
        rule: 'It is impossible to determine simultaneously both exact position and exact momentum of a microscopic particle.',
        emoji: '🤷',
        color: '#6366f1',
        detail: '$\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}$. Measuring one property accurately disturbs the measurement of the other.',
        examples: ['You can never draw a precise trajectory for an electron.'],
        tip: 'You can never know exactly where an electron is AND how fast it is going.'
    },
    {
        num: 5,
        title: 'Bohr Quantization',
        rule: 'Electrons can only revolve in certain stable orbits where angular momentum is an integral multiple of $h/(2\\pi)$.',
        emoji: '🌀',
        color: '#ec4899',
        detail: '$mvr = \\frac{nh}{2\\pi}$, where $n = 1, 2, 3...$. Energy is only emitted or absorbed when an electron jumps between these fixed orbits.',
        examples: ['Energy of jump: $\\Delta E = E_2 - E_1 = h\\nu$'],
        tip: 'Think of atomic orbits like rungs on a ladder — you can\'t stand between rungs!'
    }
];

export const VOCAB_QUIZ = [
    {
        question: "What term describes distinct atoms having the SAME mass number but DIFFERENT atomic numbers?",
        options: ["Isotopes", "Isobars", "Isotones", "Isoelectronic"],
        correct: 1, // Isobars
        explanation: "Isobars share the same mass number (A) but differ in atomic number (Z), meaning they are different elements with different chemical properties."
    },
    {
        question: "Which principle states that an orbital can hold a maximum of two electrons with opposite spins?",
        options: ["Aufbau Principle", "Hund's Rule", "Pauli Exclusion Principle", "Heisenberg Uncertainty Principle"],
        correct: 2, // Pauli Exclusion
        explanation: "The Pauli Exclusion Principle dictates that no two electrons in an atom can have the exact same set of four quantum numbers. Thus, two electrons in the same orbital must have opposite spins (+1/2 and -1/2)."
    },
    {
        question: "A region in space where the probability of finding an electron is exactly zero is called a:",
        options: ["Orbital", "Node", "Lobe", "Antinode"],
        correct: 1, // Node
        explanation: "A node is either a spherical surface (radial node) or a plane (angular node) where the electron density wave function goes to zero."
    },
    {
        question: "Before pairing up in a p-subshell, electrons will occupy empty p-orbitals individually. This is dictated by:",
        options: ["Hund's Rule", "The (n+l) Rule", "Pauli Exclusion Principle", "Bohr's Postulate"],
        correct: 0, // Hund's
        explanation: "Hund's rule states that degenerate orbitals must be singly occupied with parallel spins before they are doubly occupied."
    }
];

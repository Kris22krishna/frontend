export const TERMS = [
    {
        name: 'Prokaryote',
        color: '#6366f1',
        icon: '🦠',
        def: 'An organism whose cells lack a true membrane-bound nucleus.',
        examples: ['Bacteria', 'Cyanobacteria', 'Mycoplasma'],
        inUse: 'They contain naked, circular DNA located in the nucleoid region.',
        memory: '"Pro" = before, "Karyon" = nucleus. Before the true nucleus evolved!'
    },
    {
        name: 'Eukaryote',
        color: '#0d9488',
        icon: '🧬',
        def: 'An organism whose cells contain a true nucleus and membrane-bound organelles.',
        examples: ['Fungi', 'Plants', 'Animals', 'Protists'],
        inUse: 'They have compartmentalized cytoplasm due to organelles like ER and Golgi.',
        memory: '"Eu" = true, "Karyon" = nucleus. True nucleus!'
    },
    {
        name: 'Mycoplasma',
        color: '#f59e0b',
        icon: '🔬',
        def: 'The smallest cell capable of independent existence (~0.3 µm) and the only prokaryote without a cell wall.',
        examples: ['PPLO (Pleuropneumonia-Like Organism)'],
        inUse: 'Because they lack a cell wall, they are pleomorphic (can change shape) and are resistant to penicillin.',
        memory: 'Smallest, no wall, has sterols (cholesterol) in its membrane!'
    },
    {
        name: 'Peptidoglycan',
        color: '#ec4899',
        icon: '🧱',
        def: 'A polymer (also known as murein) consisting of sugars and amino acids that forms a mesh-like layer forming the bacterial cell wall.',
        examples: ['Gram-positive bacteria have a thick peptidoglycan layer.'],
        inUse: 'Antibiotics like penicillin target its synthesis to kill bacteria.',
        memory: 'Peptido (protein) + Glycan (sugar) forming a strong wall.'
    },
    {
        name: 'Mesosome',
        color: '#7c3aed',
        icon: '〰️',
        def: 'Infoldings of the plasma membrane in prokaryotes functioning in respiration, secretion, and cell wall synthesis.',
        examples: ['They can be in the form of vesicles, tubules, or lamellae.'],
        inUse: 'They also help in DNA replication and distribution to daughter cells.',
        memory: 'Analogous to mitochondria (since prokaryotes don\'t have mitochondria).'
    },
    {
        name: 'Glycocalyx',
        color: '#3b82f6',
        icon: '🧥',
        def: 'A carbohydrate-enriched coating that covers the outside of many eukaryotic and prokaryotic cells.',
        examples: ['Capsule or slime layer in bacteria.', 'Glycoproteins on RBCs.'],
        inUse: 'Important for cell recognition, adhesion, and protection.',
        memory: 'The "sugar coat" of the cell.'
    },
    {
        name: 'Nucleoid',
        color: '#ef4444',
        icon: '🧶',
        def: 'An irregularly shaped, non-membrane-bound region within a prokaryotic cell containing the genetic material.',
        examples: ['Holds the single, circular chromosome of bacteria.'],
        inUse: 'The DNA is naked, lacking association with histone proteins.',
        memory: 'To be a nucleoid means to be "nucleus-like" but definitely not a true nucleus.'
    }
];

export const FIVE_RULES = [
    {
        num: 1,
        title: 'The Universal Unit',
        rule: 'All living organisms are composed of cells and products of cells.',
        emoji: '🌍',
        color: '#6366f1',
        detail: 'Formulated together by Matthias Schleiden (botanist, 1838) and Theodor Schwann (zoologist, 1839).',
        examples: ['Plants are made of plant cells.', 'Animals are made of animal cells.'],
        tip: 'This is the FIRST principle of Cell Theory.'
    },
    {
        num: 2,
        title: 'The Lineage Rule',
        rule: 'Omnis cellula e cellula (Every cell arises from a pre-existing cell).',
        emoji: '🔄',
        color: '#0d9488',
        detail: 'Added by Rudolf Virchow in 1855. This revolutionized biology by rejecting spontaneous generation.',
        examples: ['A new bacterium comes from binary fission of an old one.', 'You came from a zygote.'],
        tip: 'Spontaneous generation is a myth. Life comes from life.'
    },
    {
        num: 3,
        title: 'The Exception Rule',
        rule: 'Not everything biological fits Cell Theory perfectly.',
        emoji: '⚠️',
        color: '#f59e0b',
        detail: 'Viruses are not true cells (they are nucleoproteins) and cannot replicate independently. Mature human RBCs lack a nucleus.',
        examples: ['Viruses', 'Prions', 'Viroids', 'Mature mammalian erythrocytes'],
        tip: 'Always look out for "Which of the following is an exception to Cell Theory?".'
    },
    {
        num: 4,
        title: 'The 70S Trap (Ribosome Rule)',
        rule: 'Eukaryotic cytoplasm has 80S ribosomes, but mitochondrial and chloroplast ribosomes are 70S.',
        emoji: '⚙️',
        color: '#10b981',
        detail: 'Prokaryotes exclusively have 70S ribosomes (made of 50S + 30S subunits). Eukaryotic organelles mimicking this is proof of the endosymbiotic theory.',
        examples: ['Mitochondrial matrix contains 70S ribosomes.', 'Bacterial cytosol contains 70S ribosomes.'],
        tip: 'Never assume all ribosomes in a eukaryote are 80S. The organelles have 70S!'
    },
    {
        num: 5,
        title: 'Membrane Boundaries',
        rule: 'Prokaryotes strictly lack membrane-bound organelles.',
        emoji: '🛑',
        color: '#ec4899',
        detail: 'You will never find mitochondria, chloroplasts, lysosomes, or ER inside a bacterium. The only organelles they have are non-membrane-bound (ribosomes).',
        examples: ['Bacteria lack Golgi bodies.', 'Cyanobacteria photosynthesis occurs on folded lamellae, not chloroplasts.'],
        tip: 'If an organelle has a membrane, it belongs in a eukaryote.'
    }
];

export const VOCAB_QUIZ = [
    {
        question: 'Which scientist formulated the statement "Omnis cellula e cellula"?',
        options: ["Robert Hooke", "Theodor Schwann", "Rudolf Virchow", "Antonie van Leeuwenhoek"],
        correct: 2,
        explanation: 'Rudolf Virchow (1855) added the principle that all living cells arise from pre-existing cells.'
    },
    {
        question: 'Which is the smallest cell capable of independent existence and naturally lacks a cell wall?',
        options: ["E. coli", "Mycoplasma", "Cyanobacteria", "Amoeba"],
        correct: 1,
        explanation: 'Mycoplasma (PPLO) is the smallest known cell and it has no cell wall, making it pleomorphic.'
    },
    {
        question: 'What type of ribosomes are found in the mitochondria of a human cell?',
        options: ["80S", "70S", "60S", "40S"],
        correct: 1,
        explanation: 'While the cytoplasm of human cells contains 80S ribosomes, mitochondria and chloroplasts contain prokaryote-like 70S ribosomes.'
    },
    {
        question: 'The bacterial cell wall is primarily composed of:',
        options: ["Cellulose", "Chitin", "Silica", "Peptidoglycan"],
        correct: 3,
        explanation: 'Peptidoglycan (or murein) forms the structural integrity of most bacterial cell walls.'
    },
    {
        question: 'What is the function of mesosomes in prokaryotes?',
        options: ["Photosynthesis", "Protein synthesis", "Respiration and secretion", "Digestion of waste"],
        correct: 2,
        explanation: 'Mesosomes are infoldings of the plasma membrane that perform functions analogous to mitochondria (respiration) and also help in cell wall synthesis.'
    }
];

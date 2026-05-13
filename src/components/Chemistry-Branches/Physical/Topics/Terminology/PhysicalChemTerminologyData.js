export const TERMS = [
    {
        name: 'Matter',
        color: '#6366f1',
        icon: '⚗️',
        def: 'Anything that has mass and occupies space (volume). Matter is made of atoms and molecules.',
        examples: ['Air (gas)', 'Water (liquid)', 'Iron (solid)', 'All chemical substances'],
        inUse: 'Light and heat are NOT matter — they have no mass and do not occupy space.',
        memory: 'Matter = has Mass and Takes up space. Two M\'s to remember: Mass + More space.'
    },
    {
        name: 'Mass',
        color: '#4f46e5',
        icon: '⚖️',
        def: 'The amount of matter contained in an object. Measured in grams (g) or kilograms (kg). Mass is constant regardless of location.',
        examples: ['A gold bar has the same mass on Earth and on the Moon', '1 mole of carbon = 12 grams (molar mass)'],
        inUse: 'Mass is different from weight! Weight depends on gravity; mass does not.',
        memory: 'Mass = matter amount. Use a balance (weighing scale) to measure mass. Mass never changes with location.'
    },
    {
        name: 'Solid',
        color: '#7c3aed',
        icon: '🧱',
        def: 'A state of matter with a definite shape and definite volume. Particles are tightly packed with very strong interparticle forces and almost no interparticle space.',
        examples: ['Ice (H₂O solid)', 'Iron nail', 'NaCl crystal', 'Diamond'],
        inUse: 'Solids cannot be compressed significantly because particles are already tightly packed. They retain their shape without a container.',
        memory: 'Solid = rigid, can\'t compress, definite shape. Think of a solid brick — it holds its shape!'
    },
    {
        name: 'Liquid',
        color: '#0d9488',
        icon: '💧',
        def: 'A state of matter with definite volume but no definite shape. Particles are close together but can flow past each other. Interparticle forces are weaker than in solids.',
        examples: ['Water (H₂O)', 'Mercury (Hg)', 'Milk', 'Petrol'],
        inUse: 'Liquids take the shape of their container but maintain a fixed volume. They can flow and are slightly compressible.',
        memory: 'Liquid = flow-able. Definite volume, no definite shape. Water fills any container but the amount doesn\'t change.'
    },
    {
        name: 'Gas',
        color: '#0ea5e9',
        icon: '💨',
        def: 'A state of matter with no definite shape and no definite volume. Particles are far apart with very weak interparticle forces and very large interparticle spaces.',
        examples: ['Air (mixture of N₂, O₂, CO₂)', 'Steam (water vapour)', 'LPG (propane/butane)', 'Helium in balloons'],
        inUse: 'Gases are highly compressible and fill any container completely. They exert pressure on container walls.',
        memory: 'Gas = no definite shape, no definite volume. Expand to fill any space. "Gas spreads everywhere!"'
    },
    {
        name: 'Interparticle Force',
        color: '#8b5cf6',
        icon: '🔗',
        def: 'The attractive force between particles (atoms, ions, or molecules) in a substance. Stronger forces = more ordered state (solid). Weaker forces = less ordered state (gas).',
        examples: ['Very strong → solid (ice crystal lattice)', 'Medium → liquid (water molecules)', 'Very weak → gas (N₂ molecules in air)'],
        inUse: 'When you heat a solid, you give energy to overcome interparticle forces → solid melts to liquid, then liquid evaporates to gas.',
        memory: 'Strong force = solid stays together. Weak force = gas flies apart. Force determines the STATE of matter.'
    },
    {
        name: 'Compressibility',
        color: '#6366f1',
        icon: '🗜️',
        def: 'The ability of a substance to be compressed (reduced in volume) when pressure is applied.',
        examples: ['Gases: highly compressible (CNG in cylinders compressed to fit)', 'Liquids: very slightly compressible', 'Solids: almost incompressible'],
        inUse: 'Gases are stored under high pressure in cylinders (LPG, CNG) because they can be compressed into a small volume.',
        memory: 'Gas = squishy (highly compressible). Solid = hard to compress. Compressibility decreases: Gas > Liquid > Solid.'
    },
    {
        name: 'Rigidity',
        color: '#4338ca',
        icon: '🔒',
        def: 'The ability of a substance to maintain its shape without a container. Solids are rigid; liquids and gases are not.',
        examples: ['Iron bar (rigid solid)', 'Water (non-rigid — flows)', 'Air (non-rigid — fills any space)'],
        inUse: 'Rigidity comes from strong interparticle forces that hold particles in fixed positions.',
        memory: 'Rigid = cannot change shape easily. Only solids are rigid. "Rigid as a rock!"'
    },
    {
        name: 'Interparticle Space',
        color: '#7c3aed',
        icon: '↔️',
        def: 'The empty space between particles (atoms, ions, or molecules) in a substance. More space = more compressible state.',
        examples: ['Solid: very small interparticle space (particles touch)', 'Liquid: small space (particles slide)', 'Gas: very large space (particles far apart)'],
        inUse: 'Diffusion happens because of interparticle spaces — one substance can move through the spaces between particles of another.',
        memory: 'Space between particles = "room to move". Gas has most space → can be compressed. Solid has least space → can\'t compress.'
    },
    {
        name: 'Volume',
        color: '#0d9488',
        icon: '📦',
        def: 'The amount of space occupied by a substance. Measured in millilitres (mL), litres (L), or cubic centimetres (cm³). 1 mL = 1 cm³.',
        examples: ['1 L of water = 1000 mL = 1000 cm³', 'Gas volumes measured at Standard Temperature and Pressure (STP)'],
        inUse: 'Solids and liquids have definite volume; gases have variable volume (expand or contract to fill containers).',
        memory: 'Volume = space taken up. 1 L = 1000 mL. Solid: fixed volume. Liquid: fixed volume. Gas: variable volume.'
    },
];

export const KEY_IDENTITIES = [
    {
        name: 'States of Matter — Full Comparison',
        desc: 'The three states of matter differ systematically in 6 key properties: shape, volume, interparticle force, interparticle space, compressibility, and rigidity.',
        formula: '\\text{Solid: definite shape + definite volume + high force + low space + rigid + incompressible}'
    },
    {
        name: 'Order of Properties',
        desc: 'These inequalities always hold across the three states: Solid > Liquid > Gas for interparticle force and rigidity; Gas > Liquid > Solid for compressibility and interparticle space.',
        formula: '\\text{Force: Solid > Liquid > Gas} \\quad \\text{Space: Gas > Liquid > Solid}'
    },
    {
        name: 'Definition of Matter',
        desc: 'Matter is defined by two criteria: it must have mass AND occupy volume (space). Energy (heat, light) is NOT matter.',
        formula: '\\text{Matter} = \\text{has mass} + \\text{occupies volume (space)}'
    },
];

export const VOCAB_QUIZ = [
    {
        question: 'Which state of matter has a definite shape AND a definite volume?',
        options: ['Gas', 'Liquid', 'Plasma', 'Solid'],
        correct: 3,
        explanation: 'Solids have both definite shape (rigid, particles in fixed positions) and definite volume (incompressible). Liquids have definite volume but no definite shape. Gases have neither.'
    },
    {
        question: 'In which state of matter are interparticle forces the WEAKEST?',
        options: ['Solid', 'Liquid', 'Gas', 'All equal'],
        correct: 2,
        explanation: 'In gases, particles are very far apart with very weak interparticle forces. This is why gases expand to fill any container and are easily compressed.'
    },
    {
        question: 'Why are gases highly compressible but solids are not?',
        options: ['Gases are lighter', 'Gases have large interparticle spaces', 'Gases are hotter', 'Gases have no mass'],
        correct: 1,
        explanation: 'Gases have very large interparticle spaces. When compressed, the particles are simply pushed closer together into the available spaces. Solids have almost no interparticle space — particles are already touching.'
    },
    {
        question: 'A liquid takes the shape of its container but does NOT change its volume. This is because:',
        options: ['Particles are touching (incompressible)', 'Particles can flow but are close together', 'Particles are far apart', 'Liquid has no interparticle forces'],
        correct: 1,
        explanation: 'Liquid particles can move past each other (allowing shape change) but are still close together with significant interparticle forces (maintaining fixed volume).'
    },
    {
        question: 'Which property DECREASES in the order Solid → Liquid → Gas?',
        options: ['Compressibility', 'Interparticle space', 'Interparticle force', 'Volume'],
        correct: 2,
        explanation: 'Interparticle force decreases: Solid (very strong) → Liquid (medium) → Gas (very weak). Compressibility and space actually INCREASE from Solid → Gas.'
    },
    {
        question: 'The correct order of compressibility from MOST to LEAST is:',
        options: ['Solid > Liquid > Gas', 'Liquid > Gas > Solid', 'Gas > Liquid > Solid', 'All equal'],
        correct: 2,
        explanation: 'Gas is most compressible (huge interparticle spaces), then liquid (small spaces), then solid (particles already touching — almost incompressible). Gas >> Liquid >> Solid.'
    },
    {
        question: 'Which state of matter is RIGID (maintains its shape without a container)?',
        options: ['Gas', 'Liquid', 'Solid', 'Both Gas and Liquid'],
        correct: 2,
        explanation: 'Only solids are rigid — their strong interparticle forces hold particles in fixed positions. Liquids flow to fill the container (not rigid). Gases expand to fill all space.'
    },
    {
        question: 'In which state is the interparticle space LARGEST?',
        options: ['Solid', 'Liquid', 'Gas', 'All equal'],
        correct: 2,
        explanation: 'Gas particles are very far apart with very large interparticle spaces. This explains both their compressibility and their low density. Space order: Gas > Liquid > Solid.'
    },
    {
        question: 'Which of the following is NOT matter?',
        options: ['Air', 'Water vapour', 'Sound', 'Iron'],
        correct: 2,
        explanation: 'Sound is a wave (vibration of particles) — it has no mass and does not occupy space. Air, water vapour, and iron are all matter (have mass and volume).'
    },
    {
        question: 'CNG (Compressed Natural Gas) is stored in cylinders under high pressure. This is possible because gases are:',
        options: ['Light', 'Rigid', 'Highly compressible', 'Non-reactive'],
        correct: 2,
        explanation: 'Gases are highly compressible because of their large interparticle spaces. When compressed, gas particles are pushed closer together. CNG and LPG cylinders store large amounts of gas in small volumes this way.'
    },
    {
        question: 'A perfume bottle is opened in one corner of a room. The smell reaches the other corner because of:',
        options: ['Gravity pulling the perfume down', 'Diffusion — gas particles spread through large interparticle spaces in air', 'The room is airtight', 'Heat from the bottle'],
        correct: 1,
        explanation: 'Gas particles diffuse (spread) rapidly through large interparticle spaces. Perfume molecules mix with air molecules and spread throughout the room. This is diffusion of gases.'
    },
    {
        question: 'Which two criteria BOTH need to be true for something to be called matter?',
        options: ['Has colour and texture', 'Has mass and occupies space (volume)', 'Has energy and temperature', 'Can be seen and touched'],
        correct: 1,
        explanation: 'Matter is defined as anything that has MASS and occupies SPACE (volume). Light and heat have energy but no mass and no volume — they are not matter.'
    },
];

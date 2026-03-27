export const TERMS = [
    {
        icon: '🔬',
        name: 'Science',
        color: '#f97316',
        def: 'A systematic process of observing, questioning, experimenting, and understanding the natural world. Science is not just a set of facts — it is a way of thinking that welcomes curiosity and is open to the unknown.',
        examples: [
            'Observing how shadows change position during the day',
            'Testing which materials conduct electricity'
        ],
        inUse: '"Science is a process of discovery — it helps us understand everything from tiny cells to distant stars."',
        memory: 'SCIENCE = Systematic Curiosity In Exploring Nature\'s Clues Everyday',
    },
    {
        icon: '❓',
        name: 'Hypothesis',
        color: '#38bdf8',
        def: 'An educated guess or a testable prediction about how something works, based on observation. A hypothesis must be something you can test through an experiment.',
        examples: [
            '"If I add soap to turmeric stain, it will change colour"',
            '"Plants grow faster in sunlight than in shade"'
        ],
        inUse: '"Before starting the experiment, we formed a hypothesis that ice would melt faster in warm water."',
        memory: 'HYPOthesis = YOUR guess BEFORE the test',
    },
    {
        icon: '👁️',
        name: 'Observation',
        color: '#a3e635',
        def: 'The act of carefully watching and noting what happens during an experiment or in nature, using your senses (sight, smell, touch, hearing, taste) or instruments.',
        examples: [
            'Noticing that a torch battery runs out after extended use',
            'Seeing that iron nails develop a reddish-brown coating over time'
        ],
        inUse: '"Our observation showed that the blue copper sulphate solution turned green when an iron nail was dipped in."',
        memory: 'OBSERVation = what you SEE, HEAR, or MEASURE',
    },
    {
        icon: '🧪',
        name: 'Experiment',
        color: '#818cf8',
        def: 'A controlled test designed to investigate a hypothesis. Experiments involve changing one variable while keeping others constant to see what effect it has.',
        examples: [
            'Testing which materials allow electricity to pass through them',
            'Heating different substances to see which changes are reversible'
        ],
        inUse: '"We performed an experiment to test whether metals conduct heat better than non-metals."',
        memory: 'EXPERIMENT = EXPerience + test = hands-on testing',
    },
    {
        icon: '⚗️',
        name: 'Physical Change',
        color: '#ef4444',
        def: 'A change in which no new substance is formed. The original substance can usually be recovered. Only the physical properties (shape, size, state) change.',
        examples: [
            'Ice melting into water → can be frozen back',
            'Breaking a rock into pebbles'
        ],
        inUse: '"Melting ice is a physical change because the water can be frozen back into ice."',
        memory: 'PHYSICAL change = can go BACK (reversible usually)',
    },
    {
        icon: '🔥',
        name: 'Chemical Change',
        color: '#22d3ee',
        def: 'A change in which one or more new substances are formed with different properties. Usually irreversible. Signs include: change in colour, smell, gas production, or heat.',
        examples: [
            'Burning wood → ash, smoke, and gases (cannot get wood back)',
            'Cooking an egg (cannot uncooked it)'
        ],
        inUse: '"Burning a candle is a chemical change — the wax reacts with oxygen to form CO₂ and water."',
        memory: 'CHEMICAL change = can\'t go BACK (new stuff formed)',
    },
    {
        icon: '🔄',
        name: 'Reversible Change',
        color: '#f59e0b',
        def: 'A change that can be undone or reversed to get back the original substance. The substance itself doesn\'t change chemically.',
        examples: [
            'Melting butter → can solidify again on cooling',
            'Dissolving salt in water → can evaporate to get salt back'
        ],
        inUse: '"Freezing and melting of water is a reversible change — you can go back and forth."',
        memory: 'REVERSE = RE-turn to the original',
    },
    {
        icon: '🚫',
        name: 'Irreversible Change',
        color: '#d946ef',
        def: 'A change that cannot be undone. Once it happens, you cannot get back the original substance. Most chemical changes are irreversible.',
        examples: [
            'Baking a cake — cannot get flour, eggs, sugar back',
            'Ripening of fruits — cannot make them unripe'
        ],
        inUse: '"The burning of paper is an irreversible change because the original paper cannot be recovered from the ash."',
        memory: 'IRReversible = can\'t IR-on it back (permanent!)',
    },
    {
        icon: '⚡',
        name: 'Conductor',
        color: '#14b8a6',
        def: 'A material that allows electricity or heat to pass through it easily. Most metals are good conductors of both heat and electricity.',
        examples: [
            'Copper wire (conducts electricity in circuits)',
            'Iron pan (conducts heat while cooking)'
        ],
        inUse: '"We used copper wire as it is a good conductor of electricity to complete the circuit."',
        memory: 'CONDUCTor = CONDUCTs (lets energy pass through)',
    },
    {
        icon: '🛡️',
        name: 'Insulator',
        color: '#8b5cf6',
        def: 'A material that does not allow electricity or heat to pass through it easily. Non-metals like rubber, wood, and plastic are typically good insulators.',
        examples: [
            'Rubber handles on tools (prevents electric shock)',
            'Wooden spoon (doesn\'t get hot when stirring)'
        ],
        inUse: '"We wrapped the wire with rubber because it is an insulator that prevents electric shock."',
        memory: 'INSULATor = INSULATEs you from energy',
    },
];

export const COOL_CONTEXTS = [
    { num: 1, emoji: '🍋', title: 'Sour Fruits', rule: 'Acids in everyday life', detail: 'Have you wondered why some fruits are sour? Fruits like lemons, oranges, and tamarind contain natural acids (citric acid, ascorbic acid) that give them their tangy taste.', examples: ['Citric acid in lemons', 'Ascorbic acid (Vitamin C) in oranges'], tip: 'A haldi (turmeric) stain turns red with soap — that\'s an acid-base indicator at work!', color: '#ef4444' },
    { num: 2, emoji: '💡', title: 'Electric Circuits', rule: 'Making a lamp glow', detail: 'When you connect a battery, wires, and a bulb in a complete path, electricity flows and the lamp glows. This is a simple electric circuit. Only certain materials (conductors) let electricity pass through.', examples: ['Metals conduct electricity', 'Plastic does not'], tip: 'If there\'s a gap in the circuit, the lamp won\'t glow — the circuit must be complete!', color: '#22c55e' },
    { num: 3, emoji: '🌡️', title: 'Heat Flow', rule: 'Heat always flows from hot to cold', detail: 'Whether it\'s the melting of an ice cube in a glass or the melting of a glacier — heat flows from a warmer object to a cooler one until both reach the same temperature.', examples: ['Ice melts in your hand (heat from hand → ice)', 'Hot tea cools down (heat → surroundings)'], tip: 'Metals transfer heat fastest — that\'s why a metal spoon in hot soup gets hot quickly!', color: '#8b5cf6' },
    { num: 4, emoji: '💧', title: 'Water Cycle', rule: 'Evaporation → Condensation → Precipitation', detail: 'The Sun heats water from seas and rivers, causing evaporation. This water vapour rises, cools, condenses into clouds, and falls back as rain — sometimes trickling underground far away.', examples: ['Evaporation from oceans', 'Rain over mountains'], tip: 'Water that seeps underground can emerge as springs or be pumped from wells!', color: '#ec4899' },
    { num: 5, emoji: '🌱', title: 'Life Processes', rule: 'All living things need energy', detail: 'Not just animals — plants also need food to grow! Animals eat and breathe, blood circulates nutrients. Plants make their own food through photosynthesis. Life has evolved beautiful, balanced ways to sustain itself.', examples: ['Photosynthesis in plants', 'Respiration in animals'], tip: 'Over the time life has evolved on Earth, it has figured out how to sustain itself in a carefully balanced way.', color: '#f59e0b' },
];

export const VOCAB_QUIZ = [
    {
        question: 'Which term describes a test designed to investigate a hypothesis by changing one variable?',
        options: [
            'Observation',
            'Experiment',
            'Hypothesis',
            'Theory'
        ],
        correct: 1,
        explanation: 'An experiment is a controlled test where you change one variable to see what effect it has.'
    },
    {
        question: 'A change in which NO new substance is formed and the original substance can usually be recovered is called a:',
        options: [
            'Chemical Change',
            'Irreversible Change',
            'Physical Change',
            'Decomposition'
        ],
        correct: 2,
        explanation: 'Physical changes only alter physical properties (shape, size, state) without forming new substances.'
    },
    {
        question: 'Which of these is an example of an irreversible change?',
        options: [
            'Melting ice',
            'Dissolving salt in water',
            'Burning wood',
            'Folding paper'
        ],
        correct: 2,
        explanation: 'Burning wood produces ash and gases — you cannot get the original wood back, making it irreversible.'
    },
    {
        question: 'A material that allows electricity to pass through it easily is called a:',
        options: [
            'Insulator',
            'Conductor',
            'Resistor',
            'Semiconductor'
        ],
        correct: 1,
        explanation: 'Conductors (like copper and iron) allow electricity to flow freely through them.'
    },
    {
        question: 'What is the FIRST step in scientific inquiry?',
        options: [
            'Performing an experiment',
            'Drawing a conclusion',
            'Making an observation or asking a question',
            'Recording results'
        ],
        correct: 2,
        explanation: 'Science always starts with curiosity — observing something and asking "Why?" or "How?"'
    }
];

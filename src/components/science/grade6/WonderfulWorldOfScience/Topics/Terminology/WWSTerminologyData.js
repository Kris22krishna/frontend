export const TERMS = [
    {
        icon: '👀',
        name: 'Observation',
        color: '#f97316',
        def: 'The act of carefully watching or noticing something using your senses (eyes, ears, nose, etc.).',
        examples: [
            '"I observed that the plant in sunlight grew taller than the one in the dark."'
        ],
        inUse: '"Our first observation was that the ice cube melted faster in warm water."',
        memory: 'OBSERVation = OBSERVE carefully with your senses',
    },
    {
        icon: '❓',
        name: 'Hypothesis',
        color: '#38bdf8',
        def: 'A smart guess or prediction that you can test through an experiment. It is not a random guess — it is based on what you already know.',
        examples: [
            '"If I give more water to a plant, it will grow taller."'
        ],
        inUse: '"My hypothesis is that sugar dissolves faster in hot water than in cold water."',
        memory: 'HYPOthesis = YOUR smart guess (HYPO = under, you dig under the surface)',
    },
    {
        icon: '🧪',
        name: 'Experiment',
        color: '#a3e635',
        def: 'A test or activity done in a planned way to check whether your hypothesis is correct or not.',
        examples: [
            '"We did an experiment by placing one plant in sunlight and another in a dark room."'
        ],
        inUse: '"The experiment proved that seeds need water to germinate."',
        memory: 'EXPERIMENT = EXPerience it by TESTING',
    },
    {
        icon: '✅',
        name: 'Conclusion',
        color: '#818cf8',
        def: 'The final answer or result you get after analysing your experiment. It tells you whether your hypothesis was right or wrong.',
        examples: [
            '"Conclusion: Plants grown in sunlight grew twice as tall as those in the dark."'
        ],
        inUse: '"Our conclusion confirmed that sunlight is essential for plant growth."',
        memory: 'CONCLUSION = the final CONCLUding answer',
    },
    {
        icon: '🔍',
        name: 'Curiosity',
        color: '#ef4444',
        def: 'The strong desire to know or learn something new. Curiosity is what makes you ask "Why?" and "How?".',
        examples: [
            '"Her curiosity about rainbows led her to learn about light and colours."'
        ],
        inUse: '"Curiosity is the starting point of every scientific discovery."',
        memory: 'CURIOSity = being CURIOUS like a cat!',
    },
    {
        icon: '🔬',
        name: 'Scientific Method',
        color: '#22d3ee',
        def: 'A step-by-step process that scientists follow: Observe → Question → Hypothesise → Experiment → Analyse → Conclude.',
        examples: [
            '"Using the scientific method, we figured out why the bulb was not glowing."'
        ],
        inUse: '"The scientific method helped us solve the problem systematically."',
        memory: 'Scientific Method = a RECIPE for finding answers',
    },
    {
        icon: '📊',
        name: 'Data',
        color: '#f59e0b',
        def: 'Facts, numbers, or observations collected during an experiment. Data helps you draw conclusions.',
        examples: [
            '"We recorded the height of the plant every day — that is our data."'
        ],
        inUse: '"The data showed that the temperature increased by 5°C every hour."',
        memory: 'DATA = the DETAILS you collect',
    },
    {
        icon: '🧱',
        name: 'Matter',
        color: '#d946ef',
        def: 'Anything that has weight (mass) and takes up space (volume). Everything around you — air, water, rocks, your body — is matter.',
        examples: [
            '"Water, ice, and steam are all the same matter (H₂O) in different forms."'
        ],
        inUse: '"All objects are made of matter, whether solid, liquid, or gas."',
        memory: 'MATTER = it MATTERs because it takes up space!',
    },
    {
        icon: '🌱',
        name: 'Living Things',
        color: '#14b8a6',
        def: 'Things that grow, breathe, eat, reproduce, and respond to their surroundings. Also called organisms.',
        examples: [
            '"Plants, animals, fungi, and bacteria are all living things."'
        ],
        inUse: '"Living things need food, water, and air to survive."',
        memory: 'LIVING = they are ALIVE — they grow and change',
    },
    {
        icon: '🪨',
        name: 'Non-living Things',
        color: '#8b5cf6',
        def: 'Things that do not grow, breathe, eat, or reproduce. They do not respond to stimuli on their own.',
        examples: [
            '"A rock, a chair, water, and air are non-living things."'
        ],
        inUse: '"Non-living things can be natural (rocks) or man-made (plastic)."',
        memory: 'NON-living = NOT alive — they do NOT grow on their own',
    },
];

export const COOL_FACTS = [
    { num: 1, emoji: '🌈', title: 'Rainbow Formation', rule: 'Sunlight + Rain drops → Rainbow', detail: 'When sunlight passes through tiny water droplets in the air, it splits into 7 beautiful colours — VIBGYOR!', examples: ['Light refraction'], tip: 'You can make a rainbow with a garden hose on a sunny day!', color: '#ef4444' },
    { num: 2, emoji: '🧊', title: 'Ice to Water', rule: 'Ice + Heat → Water (Melting)', detail: 'When ice absorbs heat, its particles start moving faster and it turns into liquid water at 0°C.', examples: ['Change of state'], tip: 'Ice cream melts because it absorbs heat from your warm hands!', color: '#22c55e' },
    { num: 3, emoji: '🌱', title: 'Seed Sprouting', rule: 'Seed + Water + Warmth → Sprout', detail: 'A seed has a baby plant inside it. When it gets water and the right temperature, it breaks open and starts growing.', examples: ['Germination'], tip: 'Try sprouting a bean seed in a wet cotton ball at home!', color: '#8b5cf6' },
    { num: 4, emoji: '🧲', title: 'Magnet Magic', rule: 'Magnet + Iron → Attraction', detail: 'A magnet has an invisible force that pulls iron, nickel, and cobalt objects towards it. It does NOT attract plastic or wood.', examples: ['Magnetic force'], tip: 'Test objects at home — which ones stick to a fridge magnet?', color: '#ec4899' },
    { num: 5, emoji: '💨', title: 'Boiling Water', rule: 'Water + Heat (100°C) → Steam', detail: 'When water is heated to 100°C, it changes into steam (water vapour). The bubbles you see are actually water turning into gas!', examples: ['Evaporation'], tip: 'Never touch steam — it can burn even worse than boiling water!', color: '#f59e0b' },
];

export const VOCAB_QUIZ = [
    {
        question: 'What is a hypothesis?',
        options: [
            'A random guess',
            'A smart guess that can be tested',
            'The final answer of an experiment',
            'A type of science equipment'
        ],
        correct: 1,
        explanation: 'A hypothesis is NOT a random guess. It is a smart, educated guess based on what you know, and it can be tested through experiments.',
    },
    {
        question: 'Which of the following is a living thing?',
        options: [
            'A rock',
            'A plastic toy',
            'A mushroom',
            'A glass of water'
        ],
        correct: 2,
        explanation: 'A mushroom is a living thing (a fungus). It grows, reproduces, and responds to its surroundings.',
    },
    {
        question: 'What is the first step in the scientific method?',
        options: [
            'Making a hypothesis',
            'Doing an experiment',
            'Observation',
            'Writing a conclusion'
        ],
        correct: 2,
        explanation: 'The scientific method starts with OBSERVATION — noticing something interesting that makes you ask a question.',
    },
    {
        question: 'What is matter?',
        options: [
            'Only solid things',
            'Anything that has mass and takes up space',
            'Only things you can see',
            'Only things made by humans'
        ],
        correct: 1,
        explanation: 'Matter is anything that has mass and takes up space. This includes solids, liquids, and gases — even air is matter!',
    },
    {
        question: 'Which word means "facts and numbers collected during an experiment"?',
        options: [
            'Hypothesis',
            'Observation',
            'Data',
            'Conclusion'
        ],
        correct: 2,
        explanation: 'Data refers to the facts, numbers, and observations you record during an experiment.',
    },
];

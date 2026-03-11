export const TERMS = [
    {
        name: 'Inertia',
        color: '#6366f1',
        icon: '🪨',
        def: 'The inherent property of a material body by virtue of which it cannot change by itself, its state of rest or of uniform motion in a straight line.',
        examples: ['A person falls backward when a bus suddenly starts', 'A coin on cardboard stays when the card is flicked'],
        inUse: 'Inertia depends on mass — heavier objects have more inertia.',
        memory: 'Inertia = Laziness of matter. Objects resist change!'
    },
    {
        name: 'Momentum (p)',
        color: '#0d9488',
        icon: '🚀',
        def: 'The quantity of motion possessed by a body. Equal to the product of mass and velocity: p = mv. It is a vector quantity.',
        examples: ['A heavy truck at low speed has large momentum', 'A bullet has large momentum due to high velocity'],
        inUse: 'SI unit of momentum is kg·m/s.',
        memory: 'Momentum = Mass in Motion!'
    },
    {
        name: 'Force',
        color: '#f59e0b',
        icon: '💪',
        def: 'An external push or pull that can change the state of rest, uniform motion, direction, or shape of a body. F = ma.',
        examples: ['Pushing a stalled car to move it', 'Gravity pulling an apple to the ground'],
        inUse: 'SI unit is Newton (N). 1 N = 1 kg·m/s².',
        memory: 'Force = The "boss" that orders objects to move!'
    },
    {
        name: 'Impulse',
        color: '#ec4899',
        icon: '⚡',
        def: 'A large force acting for a very short duration. Equal to the change in momentum: J = F × Δt = Δp.',
        examples: ['Hitting a cricket ball with a bat', 'A hammer striking a nail'],
        inUse: 'Impulse has the same SI unit as momentum (N·s).',
        memory: 'Impulse = A quick, powerful "punch" of force!'
    },
    {
        name: 'Friction',
        color: '#7c3aed',
        icon: '🤚',
        def: 'An opposing force that acts whenever an object moves or tends to move over the surface of another object. f = μN.',
        examples: ['Rubbing hands produces heat (kinetic friction)', 'A heavy box that is hard to push (static friction)'],
        inUse: 'Static friction ≥ Kinetic friction for same surfaces.',
        memory: 'Friction = Nature\'s brake system!'
    },
    {
        name: 'Centripetal Force',
        color: '#3b82f6',
        icon: '🔄',
        def: 'The force directed towards the centre of a circle, required to keep a body moving in a circular path. F = mv²/r.',
        examples: ['Gravitational force keeps Moon in orbit', 'Tension in a string during circular whirling'],
        inUse: 'Without centripetal force, the body would fly off in a straight line (tangent).',
        memory: 'Centripetal = "Centre-seeking" force!'
    },
    {
        name: 'Pseudo Force',
        color: '#ef4444',
        icon: '👻',
        def: 'An apparent force experienced in a non-inertial (accelerating) reference frame. It has no physical origin.',
        examples: ['Being pushed sideways in a turning car', 'Feeling heavier in an accelerating lift'],
        inUse: 'Pseudo force = -m × a (acceleration of the frame).',
        memory: 'Pseudo = Fake! It\'s not a real force, just an illusion.'
    }
];

export const THREE_LAWS = [
    {
        num: 1,
        title: 'Law of Inertia',
        rule: 'Every body continues in its state of rest or uniform motion in a straight line unless acted upon by an external unbalanced force.',
        emoji: '🪨',
        color: '#6366f1',
        detail: 'This law defines inertia. Without an external force, nothing changes. A ball on a frictionless surface would roll forever.',
        examples: ['Passengers jerk forward when a bus brakes suddenly', 'A book on a table stays until you push it'],
        tip: 'First Law = Definition of Force. No force = No change in motion.'
    },
    {
        num: 2,
        title: 'F = ma',
        rule: 'The rate of change of momentum is directly proportional to the applied force and takes place in the direction of the force: F = dp/dt.',
        emoji: '📐',
        color: '#0d9488',
        detail: 'For constant mass, this simplifies to F = ma. This is the most used equation in classical mechanics for solving NEET problems.',
        examples: ['Heavier objects need more force for same acceleration', 'A cricket ball accelerates more than a shot put with the same force'],
        tip: 'Second Law = The calculation power. Always draw a Free Body Diagram first!'
    },
    {
        num: 3,
        title: 'Action-Reaction',
        rule: 'To every action, there is always an equal and opposite reaction. Forces always come in pairs acting on different bodies.',
        emoji: '⚡',
        color: '#f59e0b',
        detail: 'Key: action and reaction act on DIFFERENT bodies, so they don\'t cancel. A rocket pushes gas down, gas pushes rocket up.',
        examples: ['Walking: your foot pushes ground backward, ground pushes you forward', 'Swimming: hands push water backward, water pushes you forward'],
        tip: 'Third Law pairs NEVER cancel because they act on different bodies!'
    }
];

export const VOCAB_QUIZ = [
    {
        question: "Which of Newton's Laws defines inertia?",
        options: ["Second Law", "First Law", "Third Law", "Law of Gravitation"],
        correct: 1,
        explanation: "Newton's First Law is also called the Law of Inertia. It states that a body remains in its state unless acted upon by an external force."
    },
    {
        question: "What is the SI unit of momentum?",
        options: ["kg·m/s²", "N·m", "kg·m/s", "J/s"],
        correct: 2,
        explanation: "Momentum p = mv, so its unit is kg × m/s = kg·m/s."
    },
    {
        question: "A cricket player lowers their hands while catching. Which concept explains this?",
        options: ["Inertia", "Impulse", "Centripetal Force", "Pseudo Force"],
        correct: 1,
        explanation: "By increasing the time of catch, the impulsive force is reduced (J = F × Δt). Same impulse, more time, less force."
    },
    {
        question: "Action and reaction forces act on:",
        options: ["Same body", "Different bodies", "Only heavy bodies", "Only light bodies"],
        correct: 1,
        explanation: "Newton's Third Law states that action and reaction always act on DIFFERENT bodies, which is why they don't cancel each other."
    },
    {
        question: "What type of friction acts on a body that is already in motion?",
        options: ["Static friction", "Rolling friction", "Kinetic friction", "Pseudo friction"],
        correct: 2,
        explanation: "Kinetic (or sliding) friction acts on bodies already in motion. It is usually less than static friction."
    }
];

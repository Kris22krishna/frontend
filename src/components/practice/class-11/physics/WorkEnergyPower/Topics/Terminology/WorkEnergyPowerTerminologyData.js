export const TERMS = [
    {
        name: 'Work',
        color: '#6366f1',
        icon: 'W',
        def: 'The scalar dot product of force vector and displacement vector. It represents the energy transferred by a force acting over a distance.',
        examples: ['$W = \\vec{F} \\cdot \\vec{d} = Fd\\cos\\theta$', 'Pushing a box 5m with 10N force does 50J of work.'],
        inUse: 'Zero work if the force is perpendicular to displacement (like centripetal force).',
        memory: 'No displacement? Zero Work!'
    },
    {
        name: 'Energy',
        color: '#0d9488',
        icon: 'E',
        def: 'The quantitative capacity of a physical system to perform work. Measured in Joules (J).',
        examples: ['Mechanical Energy', 'Thermal Energy', 'Chemical Energy'],
        inUse: 'Energy cannot be created or destroyed, only transferred.',
        memory: 'Energy is the currency of the universe.'
    },
    {
        name: 'Kinetic Energy (KE)',
        color: '#f59e0b',
        icon: 'K',
        def: 'The energy an object possesses due to its motion. It depends on mass and the square of its velocity.',
        examples: ['$KE = \\frac{1}{2}mv^2$'],
        inUse: 'KE is a scalar quantity and is always positive or zero.',
        memory: 'Moving fast? Lots of KE!'
    },
    {
        name: 'Potential Energy (PE)',
        color: '#ec4899',
        icon: 'U',
        def: 'The stored energy of an object due to its position or configuration in a conservative force field.',
        examples: ['Gravitational $PE = mgh$', 'Spring $PE = \\frac{1}{2}kx^2$'],
        inUse: 'PE is relative; you can choose any point as $PE = 0$.',
        memory: 'Potential to do work later.'
    },
    {
        name: 'Work-Energy Theorem',
        color: '#7c3aed',
        icon: 'Δ',
        def: 'The net work done on an object by all forces (conservative and non-conservative) equals its change in kinetic energy.',
        examples: ['$W_{net} = KE_{final} - KE_{initial} = \\Delta KE$'],
        inUse: 'A universal bridge between forces acting over distance and speed changes.',
        memory: 'Net Work = Change in Speed.'
    },
    {
        name: 'Conservative Force',
        color: '#3b82f6',
        icon: '🔒',
        def: 'A force whose work done is independent of the path taken and only depends on the initial and final positions.',
        examples: ['Gravity', 'Electrostatic Force', 'Spring Force'],
        inUse: 'Work done in a closed loop by a conservative force is always zero.',
        memory: 'Path doesn\'t matter, only start and finish.'
    },
    {
        name: 'Non-conservative Force',
        color: '#ef4444',
        icon: '🔥',
        def: 'A force whose work done depends on the path taken. It continuously dissipates or adds mechanical energy to the system.',
        examples: ['Friction', 'Air Resistance', 'Viscous Drag'],
        inUse: 'Work done by friction converts mechanical energy into heat.',
        memory: 'Longer path? More energy lost!'
    },
    {
        name: 'Conservation of Mechanical Energy',
        color: '#10b981',
        icon: '⚖️',
        def: 'If only conservative forces do work on a system, the total mechanical energy (KE + PE) remains constant.',
        examples: ['$KE_initial + PE_initial = KE_final + PE_final$'],
        inUse: 'Used constantly in roller coaster and pendulum problems.',
        memory: 'Loss in PE = Gain in KE.'
    },
    {
        name: 'Power',
        color: '#8b5cf6',
        icon: 'P',
        def: 'The rate at which work is done or energy is transferred. Measured in Watts (W).',
        examples: ['$P = \\frac{W}{t}$', '$P = \\vec{F} \\cdot \\vec{v}$'],
        inUse: '1 Horsepower (HP) = 746 Watts.',
        memory: 'Same work done faster = More Power!'
    }
];

export const FIVE_RULES = [
    {
        num: 1,
        title: 'Work is a Dot Product',
        rule: 'Work is the scalar product of force and displacement vectors: $W = Fd\\cos\\theta$.',
        emoji: '➖',
        color: '#6366f1',
        detail: 'Since it is a dot product, work is a scalar. It can be positive, negative, or zero depending on the angle $\\theta$.',
        examples: ['If $\\theta = 90^\\circ$ (perpendicular), $\\cos 90^\\circ = 0$, so Work = 0.'],
        tip: 'Always check the angle between the force and movement direction!'
    },
    {
        num: 2,
        title: 'Kinetic Energy matches the Square of Speed',
        rule: 'Because $KE = \\frac{1}{2}mv^2$, doubling the speed quadruples the kinetic energy.',
        emoji: '🏎️',
        color: '#0d9488',
        detail: 'This is why car crashes at high speeds are exponentially more destructive. Velocity plays a squared role.',
        examples: ['If speed increases from $10$m/s to $20$m/s, KE becomes $4\\times$ larger.'],
        tip: 'Speed matters more than mass for Kinetic Energy.'
    },
    {
        num: 3,
        title: 'Work-Energy Theorem is Universal',
        rule: '$W_{net} = \\Delta KE$ applies to all forces, conservative or non-conservative, constant or variable.',
        emoji: '🌍',
        color: '#f59e0b',
        detail: 'You do not need to separate forces to use this theorem. The sum of ALL work determines the change in speed.',
        examples: ['If you push a block and friction opposes it, $(W_{push} - W_{friction})$ equals the final KE change.'],
        tip: 'When asked for speed after a distance, always think Work-Energy Theorem first.'
    },
    {
        num: 4,
        title: 'Potential Energy is entirely Relative',
        rule: 'Only changes in Potential Energy ($\\Delta PE$) have physical meaning. You can set $PE = 0$ anywhere.',
        emoji: '📏',
        color: '#10b981',
        detail: 'Unlike Kinetic Energy which has an absolute minimum of 0, Potential Energy can be negative depending on your reference point.',
        examples: ['You can set the floor, a table, or infinity as $PE = 0$. The math still works!'],
        tip: 'Always explicitly state where your $PE = 0$ reference line is located.'
    },
    {
        num: 5,
        title: 'Power is Force multiplied by Velocity',
        rule: 'Instantaneous power can be calculated as the dot product $P = \\vec{F} \\cdot \\vec{v}$.',
        emoji: '⚡',
        color: '#ec4899',
        detail: 'Since $P = W/t$ and $W = Fd\\cos\\theta$, dividing the displacement $d$ by time $t$ gives velocity $v$.',
        examples: ['A car engine pushing with 1000N at 20 m/s generates $20,000$W of power.'],
        tip: 'Use $F \\cdot v$ for instantaneous power, and $Total Work/Total Time$ for average power.'
    }
];

export const VOCAB_QUIZ = [
    {
        question: "Which of the following forces is considered a non-conservative force?",
        options: ["Gravitational force", "Electrostatic force", "Spring force", "Kinetic friction"],
        correct: 3,
        explanation: "Friction is non-conservative because the work done depends on the path taken, dissipating mechanical energy as heat."
    },
    {
        question: "According to the Work-Energy Theorem, the net work done on an object is equal to its:",
        options: ["Change in momentum", "Change in potential energy", "Change in kinetic energy", "Total mechanical energy"],
        correct: 2,
        explanation: "The net work done represents the total energy transferred into or out of motion, equalling the change in Kinetic Energy."
    },
    {
        question: "If the velocity of an object is doubled, what happens to its Kinetic Energy?",
        options: ["It doubles", "It quadruples", "It halves", "It stays the same"],
        correct: 1,
        explanation: "Since $KE \\propto v^2$, doubling the velocity ($2v$) results in $(2)^2 = 4$ times the original KE."
    },
    {
        question: "If a force of 10 N is applied perpendicular to the direction of motion, how much work is done by this force?",
        options: ["10 J", "Zero", "Depends on displacement", "Negative work"],
        correct: 1,
        explanation: "Work is $Fd\\cos\\theta$. If the angle $\\theta = 90^\\circ$ (perpendicular), then $\\cos90^\\circ = 0$, so Work = 0."
    },
    {
        question: "1 Horsepower (HP) is approximately equivalent to how many Watts?",
        options: ["500 W", "746 W", "1000 W", "3.6 \\times 10^6 W"],
        correct: 1,
        explanation: "1 Horsepower is historically defined as 746 Watts, used to measure engines and motors."
    }
];

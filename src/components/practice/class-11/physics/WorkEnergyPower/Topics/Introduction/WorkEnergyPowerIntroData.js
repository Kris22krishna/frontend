export const workEnergyPowerIntroData = {
    prerequisites: [
        { title: 'Vectors', desc: 'Understanding vector magnitude, direction, and resolution.', icon: '↗️' },
        { title: 'Dot Product', desc: 'Scalar product of two vectors ($A \\cdot B = |A||B|\\cos\\theta$).', icon: '⚛️' },
        { title: 'Newton\'s Laws', desc: 'Understanding force, mass, and acceleration ($F=mdv/dt$).', icon: '🍎' }
    ],
    cards5W1H: [
        {
            q: "What",
            label: "$\\mathbf{are\\ Work,\\ Energy,\\ and\\ Power?}$",
            icon: "❓",
            gradFrom: "#6366f1",
            gradTo: "#818cf8",
            shadow: "rgba(99, 102, 241, 0.3)",
            content: "**Work** is done when a force causes displacement. **Energy** is the capacity to do work. **Power** is the rate at which work is done.",
            fact: "In physics, holding a heavy box without moving it does exactly ZERO work!"
        },
        {
            q: "Why",
            label: "$\\mathbf{use\\ energy\\ methods?}$",
            icon: "💡",
            gradFrom: "#0d9488",
            gradTo: "#14b8a6",
            shadow: "rgba(13, 148, 136, 0.3)",
            content: "Energy methods simplify complex motion problems. Instead of tracking changing vector forces over time using Newton\\'s laws, we can evaluate scalar energy states.",
            fact: "Energy is a scalar quantity—it has no direction, making calculations much easier than vector forces!"
        },
        {
            q: "Who",
            label: "$\\mathbf{discovered\\ these\\ laws?}$",
            icon: "👤",
            gradFrom: "#7c3aed",
            gradTo: "#a78bfa",
            shadow: "rgba(124, 58, 237, 0.3)",
            content: "Pioneers like James Prescott Joule established the mechanical equivalent of heat, and Isaac Newton laid the foundational laws of motion that tie into work.",
            fact: "The SI unit of energy, the Joule, is named in honor of James Prescott Joule."
        },
        {
            q: "Where",
            label: "$\\mathbf{do\\ we\\ apply\\ them?}$",
            icon: "📍",
            gradFrom: "#f59e0b",
            gradTo: "#fbbf24",
            shadow: "rgba(245, 158, 11, 0.3)",
            content: "These concepts apply everywhere: from designing roller coasters, car engines, and hydropower dams, to understanding atomic collisions in particle accelerators.",
            fact: "Roller coasters rely almost entirely on the conservation of mechanical energy rather than engines!"
        },
        {
            q: "When",
            label: "$\\mathbf{is\\ work\\ considered\\ done?}$",
            icon: "⏰",
            gradFrom: "#3b82f6",
            gradTo: "#60a5fa",
            shadow: "rgba(59, 130, 246, 0.3)",
            content: "Work is done whenever a force causes a displacement and has a component acting in the direction of that displacement.",
            fact: "Centripetal force does zero work because it always acts perpendicular to the motion!"
        },
        {
            q: "How",
            label: "$\\mathbf{do\\ we\\ calculate\\ it?}$",
            icon: "📐",
            gradFrom: "#ec4899",
            gradTo: "#f472b6",
            shadow: "rgba(236, 72, 153, 0.3)",
            content: "Work is calculated using the dot product of Force and Displacement vectors: $W = \\vec{F} \\cdot \\vec{d} = Fd\\cos\\theta$.",
            fact: "If the force opposes motion (like friction), the work done is negative!"
        }
    ]
};

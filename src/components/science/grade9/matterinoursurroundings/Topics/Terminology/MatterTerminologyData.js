export const MATTER_TERMS = [
    {
        icon: '🧱',
        name: 'Matter',
        color: '#0ea5e9',
        def: 'Anything that occupies space and has mass. It is made up of tiny particles.',
        examples: [
            'Air, Water, Stones, Plants, Stars'
        ],
        inUse: '"The air we breathe is a form of matter because it has mass and fills the volume of a room."',
        memory: 'Mass + Space = Matter',
    },
    {
        icon: '💨',
        name: 'Diffusion',
        color: '#0d9488',
        def: 'The intermixing of particles of two different types of matter on their own.',
        examples: [
            'Smell of perfume spreading in a room',
            'Ink spreading in water'
        ],
        inUse: '"Diffusion happens faster when temperature increases because particles move faster."',
        memory: 'Self-mixing of particles = Diffusion',
    },
    {
        icon: '⚖️',
        name: 'Density',
        color: '#64748b',
        def: 'The mass of a substance per unit volume (Density = Mass / Volume).',
        examples: [
            'Density of ice is less than water (so it floats!)'
        ],
        inUse: '"Iron has a higher density than cotton, making it feel heavier for the same size."',
        memory: 'How "packed" matter is = Density',
    },
    {
        icon: '🌡️',
        name: 'Melting Point',
        color: '#f59e0b',
        def: 'The temperature at which a solid melts to become a liquid at atmospheric pressure.',
        examples: [
            'Melting point of ice is 273.15 K (0°C)'
        ],
        inUse: '"The melting point is an indication of the strength of the force of attraction between particles."',
        memory: 'Solid → Liquid Temp = Melting Point',
    },
    {
        icon: '🔥',
        name: 'Latent Heat',
        color: '#ef4444',
        def: 'The "hidden" heat absorbed by a substance during a change of state that does not raise its temperature.',
        examples: [
            'Latent heat of fusion (Solid to Liquid)',
            'Latent heat of vaporisation (Liquid to Gas)'
        ],
        inUse: '"When ice melts, its temperature stays at 0°C despite constant heating because of latent heat."',
        memory: 'Hidden heat for state change = Latent Heat',
    },
    {
        icon: '💧',
        name: 'Boiling Point',
        color: '#3b82f6',
        def: 'The temperature at which a liquid starts boiling at atmospheric pressure. It is a bulk phenomenon.',
        examples: [
            'Boiling point of water is 373 K (100°C)'
        ],
        inUse: '"Water boils at 100°C, where all particles gain enough energy to escape into the vapor state."',
        memory: 'Liquid → Gas Temp = Boiling Point',
    },
    {
        icon: '☁️',
        name: 'Sublimation',
        color: '#8b5cf6',
        def: 'A change of state directly from solid to gas without changing into liquid state (or vice-versa).',
        examples: [
            'Camphor (Kapoor) burning',
            'Dry Ice (Solid CO₂)'
        ],
        inUse: '"Ammonium chloride undergoes sublimation when heated, turning directly into vapor."',
        memory: 'Solid ↔ Gas (Skip Liquid) = Sublimation',
    },
    {
        icon: '☀️',
        name: 'Evaporation',
        color: '#fbbf24',
        def: 'The phenomenon of change of a liquid into vapour at any temperature below its boiling point.',
        examples: [
            'Wet clothes drying in the sun',
            'Water in an earthen pot (Matka) staying cool'
        ],
        inUse: '"Evaporation is a surface phenomenon that causes cooling of the remaining liquid."',
        memory: 'Surface Vaporisation < BP = Evaporation',
    },
    {
        icon: '🌫️',
        name: 'Humidity',
        color: '#94a3b8',
        def: 'The amount of water vapour present in the air.',
        examples: [
            'Sticky air on a rainy day'
        ],
        inUse: '"Evaporation is slow when humidity is high because air can\'t hold more water vapour."',
        memory: 'Water in Air = Humidity',
    },
    {
        icon: '❄️',
        name: 'Condensation',
        color: '#0ea5e9',
        def: 'The process of change of gas (vapour) into liquid state by cooling.',
        examples: [
            'Water droplets on the outside of a cold glass'
        ],
        inUse: '"Steam loses energy and undergoes condensation to become water droplets."',
        memory: 'Gas → Liquid = Condensation',
    }
];

export const STATE_CHANGES = [
    { num: 1, emoji: '🔥', title: 'Fusion (Melting)', rule: 'Solid → Liquid', detail: 'Particles gain energy, overcome forces of attraction, and start moving freely.', examples: ['Ice melting into water'], tip: 'Temperature remains constant during this process!', color: '#f59e0b' },
    { num: 2, emoji: '💨', title: 'Vaporisation', rule: 'Liquid → Gas', detail: 'Bulk of the liquid gains enough energy to jump into the gaseous state.', examples: ['Water boiling into steam'], tip: 'Steam at 100°C has more energy than water at 100°C.', color: '#3b82f6' },
    { num: 3, emoji: '❄️', title: 'Solidification', rule: 'Liquid → Solid', detail: 'Particles lose energy and get locked into fixed positions.', examples: ['Water freezing into ice'], tip: 'Also known as freezing.', color: '#0ea5e9' },
    { num: 4, emoji: '☁️', title: 'Sublimation', rule: 'Solid ↔ Gas', detail: 'Direct jump between solid and gas states, skipping the liquid phase entirely.', examples: ['Naphthalene balls', 'Dry Ice'], tip: 'Solid CO₂ is called dry ice because it doesn\'t wet the surface.', color: '#8b5cf6' },
    { num: 5, emoji: '🌬️', title: 'Evaporation', rule: 'Liquid → Vapour', detail: 'Surface particles gain enough energy to break away even below boiling point.', examples: ['Drying of sweat'], tip: 'Factors: Surface Area (+), Temp (+), Humidity (-), Wind Speed (+).', color: '#fbbf24' },
];

export const TERMINOLOGY_QUIZ = [
    {
        question: 'What is the SI unit of mass?',
        options: [
            'Gram (g)',
            'Kilogram (kg)',
            'Newton (N)',
            'Metre (m)'
        ],
        correct: 1,
        explanation: 'The International System of Units (SI) unit of mass is the kilogram (kg).'
    },
    {
        question: 'Which process describes the direct change of a solid into gas without becoming a liquid?',
        options: [
            'Fusion',
            'Vaporisation',
            'Sublimation',
            'Condensation'
        ],
        correct: 2,
        explanation: 'Sublimation is the direct conversion of solid to gas (or gas to solid).'
    },
    {
        question: 'How does the rate of diffusion change with an increase in temperature?',
        options: [
            'It decreases',
            'It remains the same',
            'It increases',
            'It stops completely'
        ],
        correct: 2,
        explanation: 'With higher temperature, particles gain more kinetic energy and move faster, increasing diffusion.'
    },
    {
        question: 'What happens to the temperature of a substance during its change of state (e.g., melting)?',
        options: [
            'It increases steadily',
            'It decreases',
            'It remains constant',
            'It fluctuates'
        ],
        correct: 2,
        explanation: 'The temperature remains constant during change of state because heat is used as latent heat.'
    },
    {
        question: 'Which of these factors DECREASES the rate of evaporation?',
        options: [
            'Increase in surface area',
            'Increase in temperature',
            'Increase in humidity',
            'Increase in wind speed'
        ],
        correct: 2,
        explanation: 'Higher humidity means more water vapour in air, which slows down further evaporation.'
    }
];

export const lawsOfMotionConnectomicsData = {
    connections: [
        {
            from: "Laws of Motion (Ch.5)",
            to: "Work, Energy & Power (Ch.6)",
            type: "Direct",
            icon: "⚡",
            color: "#6366f1",
            note: "Force applied over a distance defines work. Without understanding F=ma, you can't derive kinetic energy or the work-energy theorem."
        },
        {
            from: "Laws of Motion (Ch.5)",
            to: "Gravitation (Ch.8)",
            type: "Direct",
            icon: "🌍",
            color: "#0d9488",
            note: "Newton's law of universal gravitation is a direct extension of his Third Law. Gravitational force provides the centripetal force for orbits."
        },
        {
            from: "Laws of Motion (Ch.5)",
            to: "Rotational Motion (Ch.7)",
            type: "Fundamental",
            icon: "🔄",
            color: "#7c3aed",
            note: "Torque is the rotational analogue of force. Newton's Second Law extends to rotation as τ = Iα."
        },
        {
            from: "Laws of Motion (Ch.5)",
            to: "Oscillations (Ch.14)",
            type: "Mirror",
            icon: "🔁",
            color: "#f59e0b",
            note: "Simple Harmonic Motion is derived directly from Newton's Second Law: the restoring force F = -kx gives a = -ω²x."
        },
        {
            from: "Laws of Motion (Ch.5)",
            to: "Waves (Ch.15)",
            type: "Indirect",
            icon: "🌊",
            color: "#ec4899",
            note: "Wave propagation in a medium depends on the forces between particles. The speed of sound itself is derived from Newton's formula."
        }
    ],
    realWorld: [
        {
            title: "Automotive Safety Engineering",
            desc: "Seatbelts and airbags are designed using impulse-momentum theorem — they increase the time of collision to reduce the peak force on the body.",
            impact: "High"
        },
        {
            title: "Space Mission Design",
            desc: "NASA uses Newton's Third Law to calculate exact thrust needed. Every rocket launch is a direct application of action-reaction forces.",
            impact: "Essential"
        },
        {
            title: "Sports Biomechanics",
            desc: "Athletes optimize performance using force analysis: cricketers lower hands while catching to reduce impulsive force, sprinters use spiked shoes for more friction.",
            impact: "Emerging"
        }
    ]
};

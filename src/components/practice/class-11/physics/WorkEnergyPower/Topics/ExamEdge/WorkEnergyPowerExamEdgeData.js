export const workEnergyPowerExamEdgeData = {
    exams: [
        {
            name: "CBSE / School Exams",
            color: "#6366f1",
            emoji: "📝",
            weightage: "7-9 Marks",
            freq: "Compulsory every year",
            topics: ["Work-Energy Theorem derivation", "Conservation of Mechanical Energy proof", "Power calculations", "Elastic collisions in 1D"],
            strategy: "Schools love derivations! Perfect the proof for conservation of mechanical energy for a freely falling body. Write definitions clearly with SI units. Practice standard numericals on pump power.",
            pitfalls: ["Forgetting to write the vector dot product arrows (${\\vec{F} \\cdot \\vec{d}}$).", "Mixing up conservative and non-conservative forces in explanations.", "Ignoring the sign of work down by friction (it must be negative)."],
        },
        {
            name: "JEE Main & Advanced",
            color: "#ef4444",
            emoji: "🏆",
            weightage: "4-8 Marks (1-2 Questions)",
            freq: "High (Integrates with Mechanics)",
            topics: ["Work done by variable forces (Integration)", "Vertical circular motion", "Potential energy curves ($U-x$ graphs)", "Spring-mass systems with friction"],
            strategy: "Master the Work-Energy Theorem—it's your ultimate weapon to bypass complex kinematics. Learn to read $U-x$ graphs to find equilibrium points (where $dU/dx = 0$). Practice breaking vectors into components quickly.",
            pitfalls: ["Applying conservation of mechanical energy when friction is present.", "Forgetting that work done by tension in a pendulum is always zero (since it's perpendicular to velocity)."],
        },
        {
            name: "NEET",
            color: "#0d9488",
            emoji: "⚕️",
            weightage: "8-12 Marks (2-3 Questions)",
            freq: "Very High",
            topics: ["Direct formula applications ($KE=p^2/2m$)", "Percentage changes in momentum and KE", "Heart/Pump power calculations", "Coefficients of restitution"],
            strategy: "Speed is crucial. Memorize the relationship $p = \\sqrt{2mKE}$. If KE changes by a small percentage $x\\%$, $p$ changes by $(x/2)\\$. Practice numericals involving water pumps raising water.",
            pitfalls: ["Calculation errors in percentage change questions.", "Misinterpreting the angle in $W = Fd\\cos\\theta$ (e.g., taking the angle with the vertical instead of the horizontal)."],
        }
    ],
    proTips: [
        "If time is not given, but initial and final speeds are, ALWAYS use the Work-Energy Theorem.",
        "Work done by static friction can be positive, negative, or zero. Kinetic friction is almost always negative.",
        "In a $U-x$ (Potential Energy vs Position) graph, the force is the negative of the slope ($F = -dU/dx$).",
        "Power is a dot product too: $P = \\vec{F} \\cdot \\vec{v}$. Use this for instantaneous power questions."
    ]
};

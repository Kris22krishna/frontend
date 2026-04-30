export const mslConnectomicsData = {
    connections: [
        { 
            from: "Motion in a Straight Line", 
            to: "Projectile Motion", 
            type: "Direct", 
            icon: "🎯", 
            color: "#6366f1",
            note: "A projectile's path is simply two independent 1D motions (horizontal uniform velocity and vertical free fall) combined together." 
        },
        { 
            from: "Motion in a Straight Line", 
            to: "Newton's Laws of Motion", 
            type: "Fundamental", 
            icon: "🍎", 
            color: "#0d9488",
            note: "Kinematics describes HOW things move; Newton's Laws explain WHY they move by introducing the concept of Force." 
        },
        { 
            from: "Motion in a Straight Line", 
            to: "Work, Energy & Power", 
            type: "Essential", 
            icon: "⚡", 
            color: "#7c3aed",
            note: "The kinematic equation $v^2 = u^2 + 2as$ is deeply linked to the Work-Energy Theorem ($W = \\Delta K$)." 
        },
        { 
            from: "Motion in a Straight Line", 
            to: "Calculus", 
            type: "Mathematical", 
            icon: "🧮", 
            color: "#f59e0b",
            note: "Velocity is the first derivative of position ($v = dx/dt$) and acceleration is the second derivative ($a = d^2x/dt^2$)." 
        },
        { 
            from: "Motion in a Straight Line", 
            to: "Simple Harmonic Motion", 
            type: "Indirect", 
            icon: "⏱️", 
            color: "#ec4899",
            note: "An object oscillating on a spring moves in a straight line with an acceleration that is proportional to its displacement." 
        }
    ],
    realWorld: [
        {
            title: "Automotive Braking Systems",
            desc: "Engineers use $v^2 = u^2 + 2as$ combined with reaction times to design ABS systems and calculate safe stopping distances.",
            impact: "Life-Saving"
        },
        {
            title: "Railways & Bullet Trains",
            desc: "Scheduling, platform lengths, and avoiding collisions all rely on precise relative velocity calculations for trains moving on parallel tracks.",
            impact: "Critical"
        },
        {
            title: "Space Launch & Free Fall",
            desc: "Before achieving orbit, rockets must combat gravity. The vertical ascent phase is a massive application of non-uniform rectilinear acceleration.",
            impact: "High"
        }
    ]
};

export const workEnergyPowerConnectomicsData = {
    connections: [
        { 
            from: "Work, Energy & Power", 
            to: "Rotational Motion", 
            type: "Direct", 
            icon: "⚙️", 
            color: "#6366f1",
            note: "The concepts of kinetic energy extend directly to rotating bodies ($K = \\frac{1}{2}I\\omega^2$) and work is done by torque instead of force." 
        },
        { 
            from: "Work, Energy & Power", 
            to: "Thermodynamics", 
            type: "Fundamental", 
            icon: "🔥", 
            color: "#0d9488",
            note: "Mechanical work and heat are two forms of energy transfer. The First Law of Thermodynamics is essentially the conservation of energy." 
        },
        { 
            from: "Work, Energy & Power", 
            to: "Gravitation", 
            type: "Essential", 
            icon: "🌍", 
            color: "#7c3aed",
            note: "Calculating escape velocity and satellite orbits relies entirely on Earth's gravitational potential energy and conservation laws." 
        },
        { 
            from: "Work, Energy & Power", 
            to: "Kinematics", 
            type: "Indirect", 
            icon: "📈", 
            color: "#f59e0b",
            note: "Energy methods often allow us to solve kinematics problems finding speeds without needing to know the time elapsed or exact path taken." 
        },
        { 
            from: "Work, Energy & Power", 
            to: "Fluid Mechanics", 
            type: "Direct", 
            icon: "💧", 
            color: "#ec4899",
            note: "Bernoulli's equation for fluid flow is a special, continuous case of the work-energy theorem applied to moving liquids." 
        }
    ],
    realWorld: [
        {
            title: "Hydropower & Wind Turbines",
            desc: "The gravitational potential energy of water or the kinetic energy of wind is harvested and converted into electrical power using massive generators.",
            impact: "Critical"
        },
        {
            title: "Roller Coasters & Thrill Rides",
            desc: "Coasters operate almost entirely on the conservation of mechanical energy; trading height (PE) for speed (KE) and vice versa through loops and drops.",
            impact: "High"
        },
        {
            title: "Automotive Crumple Zones",
            desc: "Car bodies are designed to deform during a crash, allowing non-conservative work to safely dissipate the car's massive kinetic energy away from passengers.",
            impact: "Life-Saving"
        }
    ]
};

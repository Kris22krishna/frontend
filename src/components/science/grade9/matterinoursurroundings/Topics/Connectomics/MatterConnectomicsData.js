export const matterConnectomicsData = {
    connections: [
        {
            type: "Physics Link",
            from: "Kinetic Energy",
            to: "Temperature",
            icon: "⚡",
            color: "#f59e0b",
            note: "The kinetic energy of particles is directly proportional to the absolute temperature. As T increases, particles move with greater speed."
        },
        {
            type: "Biology Link",
            from: "Diffusion",
            to: "Cell Transport",
            icon: "🧬",
            color: "#10b981",
            note: "Oxygen and CO2 move in and out of cells via diffusion, driven by concentration gradients — a direct application of particle motion."
        },
        {
            type: "Industry Link",
            from: "Compressibility",
            to: "LPG/CNG",
            icon: "🏭",
            color: "#0ea5e9",
            note: "The high compressibility of gases allows us to store huge volumes of fuel in small, portable cylinders for homes and vehicles."
        },
        {
            type: "Meteorology",
            from: "Humidity",
            to: "Evaporation Rate",
            icon: "☁️",
            color: "#6366f1",
            note: "Weather patterns are dictated by the amount of water vapor in the air. High humidity slows down evaporation, making us feel 'sticky' in summer."
        }
    ],
    realWorld: [
        {
            title: "The Magic of Earthen Pots",
            impact: "Ancient Cooling",
            desc: "Water seeps through tiny pores in the clay pot and evaporates from the outer surface, taking latent heat from the remaining water and keeping it cool."
        },
        {
            title: "Dry Ice in Special Effects",
            impact: "Sublimation",
            desc: "Solid Carbon Dioxide (Dry Ice) sublimes directly into gas at room pressure, creating the 'fog' effect seen in stage performances and movies."
        },
        {
            title: "Pressure Cookers",
            impact: "Boiling Point",
            desc: "By increasing pressure inside the vessel, the boiling point of water is raised, allowing food to cook at higher temperatures much faster."
        }
    ]
};

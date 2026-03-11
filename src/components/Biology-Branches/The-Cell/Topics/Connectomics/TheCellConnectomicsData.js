export const cellConnectomicsData = {
    connections: [
        { 
            from: "The Cell (Ch.8)", 
            to: "Cell Cycle & Division (Ch.10)", 
            type: "Direct", 
            icon: "🧬", 
            color: "#6366f1",
            note: "Organelle structure directly feeds into how they duplicate and divide during Mitosis and Meiosis." 
        },
        { 
            from: "The Cell (Ch.8)", 
            to: "Photosynthesis (Ch.13)", 
            type: "Fundamental", 
            icon: "🌿", 
            color: "#0d9488",
            note: "Understanding the structure of the Chloroplast (thylakoids, stroma) is essential before learning the light and dark reactions." 
        },
        { 
            from: "The Cell (Ch.8)", 
            to: "Respiration (Ch.14)", 
            type: "Fundamental", 
            icon: "⚡", 
            color: "#7c3aed",
            note: "Mitochondrial cristae and the matrix are the physical locations for the Electron Transport Chain and Krebs cycle." 
        },
        { 
            from: "The Cell (Ch.8)", 
            to: "Biomolecules (Ch.9)", 
            type: "Mirror", 
            icon: "🧪", 
            color: "#f59e0b",
            note: "The plasma membrane is made of lipids and proteins; the cell wall is made of carbohydrates. Chapter 9 explains these molecules chemically." 
        },
        { 
            from: "The Cell (Ch.8)", 
            to: "Genetics (Class XII)", 
            type: "Long-term", 
            icon: "🧬", 
            color: "#ec4899",
            note: "The nucleus, chromatin structure, and ribosomes (for translation) are the physical basis for inheritance and the Central Dogma." 
        }
    ],
    realWorld: [
        {
            title: "Pharmacology & Antibiotics",
            desc: "Drugs like penicillin target bacterial cell walls (peptidoglycan). Others target the 70S ribosomes, killing bacteria without harming our 80S ribosomes.",
            impact: "High"
        },
        {
            title: "Cancer Research",
            desc: "Cancer is fundamentally a cellular disease where the cell cycle and organelle regulation fail.",
            impact: "Essential"
        },
        {
            title: "Biotechnology",
            desc: "Plasmids (found in prokaryotes) are extracted and used as vectors to transport genes in genetic engineering.",
            impact: "Emerging"
        }
    ]
};

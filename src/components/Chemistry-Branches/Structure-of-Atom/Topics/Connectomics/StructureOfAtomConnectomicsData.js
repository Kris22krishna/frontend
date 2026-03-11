export const structureOfAtomConnectomicsData = {
    connections: [
        { 
            from: "Structure of Atom (Ch.2)", 
            to: "Chemical Bonding (Ch.4)", 
            type: "Fundamental", 
            icon: "🧬", 
            color: "#6366f1",
            note: "The electronic configuration and orbital shapes dictate how atoms bond together to form molecules." 
        },
        { 
            from: "Structure of Atom (Ch.2)", 
            to: "Physics: Quantum Mechanics", 
            type: "Direct", 
            icon: "🌊", 
            color: "#3b82f6",
            note: "De Broglie's wavelength and Heisenberg's uncertainty principle bridge chemistry and quantum physics." 
        },
        { 
            from: "Structure of Atom (Ch.2)", 
            to: "Thermodynamics (Ch.6)", 
            type: "Indirect", 
            icon: "🔥", 
            color: "#f59e0b",
            note: "Energy transitions of electrons between shells relate directly to absorption and emission of heat/light energy." 
        },
        { 
            from: "Structure of Atom (Ch.2)", 
            to: "Nuclear Physics", 
            type: "Fundamental", 
            icon: "☢️", 
            color: "#ec4899",
            note: "The discovery of sub-atomic particles (protons, neutrons) led to the entire field of nuclear reactions and radioactivity." 
        },
        { 
            from: "Structure of Atom (Ch.2)", 
            to: "Astrophysics", 
            type: "Mirror", 
            icon: "🔭", 
            color: "#8b5cf6",
            note: "We analyze the emission and absorption spectra of distant stars to determine their exact elemental composition." 
        }
    ],
    realWorld: [
        {
            title: "Semiconductors & Electronics",
            desc: "Valence electrons and energy bands make silicon chips, computers, LEDs, and modern electronics possible.",
            impact: "High"
        },
        {
            title: "MRI & Diagnostics",
            desc: "Magnetic Resonance Imaging (MRI) relies on the nuclear spin of hydrogen atoms in our bodies to generate images.",
            impact: "Essential"
        },
        {
            title: "Radioisotope Dating",
            desc: "Carbon-14 dating calculates the age of fossils and artifacts by tracking atomic decay over thousands of years.",
            impact: "Emerging"
        }
    ]
};

export const cellExamEdgeData = {
    exams: [
        {
            name: "NEET",
            color: "#0d9488",
            emoji: "🩺",
            weightage: "5-7 questions",
            freq: "20-28 marks per year",
            topics: ["Cell Theory Exceptions", "Prokaryote vs Eukaryote", "Endomembrane System", "Organelles (Plastids / Mitochondria)", "Nucleus (Nucleosome structure)"],
            strategy: "Roughly 75-80% of questions are purely NCERT-direct. Memorise the tables, specially the Master Comparison.",
            pitfalls: ["Ignoring exceptions like Mycoplasma and mature RBCs.", "Confusing 70S and 80S ribosome locations.", "Thinking mitochondria is part of the endomembrane system.", "H1 histone vs histone octamer trap.", "9+0 vs 9+2 arrangement trap."]
        },
        {
            name: "Board Exams (Class 11)",
            color: "#6366f1",
            emoji: "📝",
            weightage: "High",
            freq: "Frequent long answer types",
            topics: ["Fluid Mosaic Model", "Differences between Plant and Animal cells", "Structure of Mitochondria and Chloroplast"],
            strategy: "Practice drawing neat labeled diagrams of Plant Cell, Animal Cell, Mitochondria, and Fluid Mosaic model.",
            pitfalls: ["Missing labels in diagrams.", "Incomplete difference tables."]
        }
    ],
    proTips: [
        "Mycoplasma lacks a cell wall completely; it's the smallest free-living cell.",
        "Endomembrane system only includes: ER, Golgi, Lysosomes, and Vacuoles.",
        "Mitochondria and Chloroplasts are semi-autonomous (have own DNA and 70S ribosomes)."
    ],
    quickRevision: [
        {
            title: "🏛️ Cell Theory",
            content: "• Schleiden (1838): plants = cells\n• Schwann (1839): animals = cells\n• Virchow (1855): \"Omnis cellula e cellula\"\n• Exceptions: viruses, mature RBCs"
        },
        {
            title: "🔬 Prokaryote Specifics",
            content: "• No nuclear envelope (nucleoid)\n• 70S ribosomes (50S + 30S)\n• Mycoplasma: no cell wall\n• Mesosome: respiration site"
        },
        {
            title: "🧬 Ribosome Sizes",
            content: "• Prokaryote: 70S (50S + 30S)\n• Eukaryote cytoplasm: 80S (60S + 40S)\n• Mitochondria/Chloroplasts: 70S\n• Discovered by: George Palade"
        },
        {
            title: "🌿 Plastids",
            content: "• Chloroplasts: photosynthesis\n• Chromoplasts: carotenoids\n• Leucoplasts: colourless (store starch/oil)\n• All: interconvertible, 70S ribosomes"
        },
        {
            title: "⚙️ Cilia vs Centriole",
            content: "• Cilia & Flagella: 9+2 arrangement\n• Centrioles: 9+0 arrangement\n• Protein: tubulin\n• Higher plants: NO centrioles"
        },
        {
            title: "📦 Endomembrane System",
            content: "• Members: ER, Golgi, Lysosomes, Vacuoles\n• NOT: Mitochondria, Chloroplasts, Peroxisomes\n• Golgi: cis (receives) → trans (ships)\n• Lysosome: suicide bags (pH 4.5)"
        },
        {
            title: "🧩 Nucleus",
            content: "• Nucleosome = Octamer + ~200bp DNA\n• H1 is linker histone (not in octamer)\n• Nucleolus: rRNA synthesis\n• Euchromatin (active) vs Heterochromatin"
        },
        {
            title: "⚠️ Top NEET Traps",
            content: "• Mycoplasma lacks cell wall\n• Mitochondria NOT in endomembrane\n• 9+2 (cilia) ≠ 9+0 (centriole)\n• H1 is NOT in octamer"
        }
    ],
    masterComparison: {
        title: "Master Comparison — Three Cell Types",
        headers: ["Feature", "Prokaryote", "Plant Cell", "Animal Cell"],
        rows: [
            ["Cell wall", "Peptidoglycan", "Cellulose + lignin", "Absent"],
            ["Nucleus", "Nucleoid (naked DNA)", "True nucleus", "True nucleus"],
            ["Ribosomes", "70S", "80S (cytoplasm), 70S (organelles)", "80S (cytoplasm), 70S (organelles)"],
            ["Mitochondria", "Absent (mesosome)", "Present", "Present"],
            ["Chloroplasts", "Absent", "Present", "Absent"],
            ["Centrioles", "Absent", "Absent (higher plants)", "Present"],
            ["Lysosomes", "Absent", "Rare", "Present"],
            ["Central vacuole", "Absent", "Large (tonoplast)", "Absent (small temp)"],
            ["Plasmid", "Present", "Absent", "Absent"],
            ["Endomembrane", "Absent", "Present", "Present"],
            ["Plasmodesmata", "Absent", "Present", "Absent (gap junctions)"]
        ]
    }
};

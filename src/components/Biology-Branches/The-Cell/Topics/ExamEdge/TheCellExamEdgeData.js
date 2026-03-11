export const cellExamEdgeData = {
    exams: [
        {
            name: 'NEET UG',
            color: '#0d9488',
            emoji: '🩺',
            weightage: '5-7 Questions (20-28 Marks)',
            freq: 'Highly Recurring',
            topics: [
                'Prokaryote vs Eukaryote',
                'Exceptions (Mycoplasma, Viruses)',
                '70S vs 80S Ribosomes',
                'Endomembrane System Components',
                'Plastids & Mitochondria structure'
            ],
            strategy: 'Focus heavily on the exceptions to the rules. The examiners love asking about Mycoplasma lacking a cell wall, and the fact that mitochondria and chloroplasts contain 70S ribosomes (just like prokaryotes). Make sure you understand the flow of the endomembrane system.',
            pitfalls: [
                'Assuming all ribosomes in a eukaryotic cell are 80S.',
                'Thinking mesosomes are found in eukaryotes.',
                'Confusing the functions of SER (lipid synthesis) and RER (protein synthesis).'
            ]
        },
        {
            name: 'State CETs',
            color: '#6366f1',
            emoji: '🏛️',
            weightage: '3-4 Questions',
            freq: 'Consistent',
            topics: [
                'Cell Theory timelines & scientists',
                'Cell Wall composition',
                'Nucleus structure',
                'Types of Chromosomes (Metacentric, etc.)'
            ],
            strategy: 'Memorize the scientists (Hooke, Leeuwenhoek, Schleiden, Schwann, Virchow) and their specific years. State CETs tend to ask direct factual questions from the NCERT lines. Be very clear on the chemical composition of cell walls across different kingdoms.',
            pitfalls: [
                'Mixing up Schleiden (Botanist) and Schwann (Zoologist).',
                'Forgetting that Fungi cell walls are made of Chitin, not Cellulose.'
            ]
        },
        {
            name: 'Board Exams (Class 11)',
            color: '#f59e0b',
            emoji: '📝',
            weightage: '7-10 Marks',
            freq: 'Core Chapter',
            topics: [
                'Fluid Mosaic Model (Diagram & Explanation)',
                'Plant vs Animal Cell differences',
                'Structure & Function of Mitochondria',
                'Structure & Function of Chloroplast'
            ],
            strategy: 'Practice drawing neatly labeled diagrams, especially the Fluid Mosaic Model of the plasma membrane, mitochondria, and chloroplasts. Be prepared to write 3-5 point differences between plant and animal cells, and prokaryotic vs eukaryotic cells.',
            pitfalls: [
                'Drawing diagrams without proper labels.',
                'Failing to mention the Singer-Nicolson model in the plasma membrane question.'
            ]
        }
    ],
    proTips: [
        "If an organelle has a double membrane (Mitochondria, Chloroplast, Nucleus), it contains DNA.",
        "Endomembrane system includes: ER, Golgi, Lysosomes, Vacuoles. (They work together!). Mitochondria and Chloroplasts are NOT part of it.",
        "Always remember: 'Omnis cellula e cellula' means all cells come from pre-existing cells (Virchow).",
        "Mycoplasma (PPLO) is the smallest cell, has NO cell wall, and is resistant to penicillin.",
        "The nucleolus is non-membrane bound and is the site for active ribosomal RNA (rRNA) synthesis."
    ]
};

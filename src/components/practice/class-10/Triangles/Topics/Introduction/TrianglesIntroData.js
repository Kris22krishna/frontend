export const trianglesIntroData = {
    prerequisites: [
        { title: 'Angle Facts', desc: 'Know the angle sum of a triangle and angle rules with parallel lines.', icon: '📏' },
        { title: 'Ratios', desc: 'Be comfortable comparing quantities using fractions and proportions.', icon: '⚖️' },
        { title: 'Triangle Basics', desc: 'Recognize sides, vertices, corresponding parts, and common triangle diagrams.', icon: '🔺' }
    ],
    cards5W1H: [
        {
            q: 'What',
            label: '$\\mathbf{is\\ triangle\\ similarity?}$',
            icon: '❓',
            gradFrom: '#2563eb',
            gradTo: '#38bdf8',
            shadow: 'rgba(37, 99, 235, 0.28)',
            content: 'Triangle similarity means two triangles have the same shape. Their corresponding angles are equal and their corresponding sides are in the same ratio.',
            fact: 'Similar triangles can be different in size but still match perfectly in shape.'
        },
        {
            q: 'Why',
            label: '$\\mathbf{is\\ it\\ important?}$',
            icon: '💡',
            gradFrom: '#0d9488',
            gradTo: '#22d3ee',
            shadow: 'rgba(13, 148, 136, 0.28)',
            content: 'Similarity helps us prove theorems, find missing lengths, and solve practical measurement problems such as the height of a pole or building.',
            fact: 'Indirect measurement problems become easy once you spot similar triangles.'
        },
        {
            q: 'Who',
            label: '$\\mathbf{uses\\ these\\ ideas?}$',
            icon: '🧑',
            gradFrom: '#7c3aed',
            gradTo: '#a78bfa',
            shadow: 'rgba(124, 58, 237, 0.28)',
            content: 'Architects, engineers, surveyors, photographers, and designers all use scale drawings and similar shapes in their work.',
            fact: 'Surveyors can estimate inaccessible heights without climbing anything.'
        },
        {
            q: 'Where',
            label: '$\\mathbf{do\\ we\\ see\\ it?}$',
            icon: '📍',
            gradFrom: '#f59e0b',
            gradTo: '#fbbf24',
            shadow: 'rgba(245, 158, 11, 0.28)',
            content: 'Similarity appears in maps, blueprints, shadows, photographs, mirrors, enlargements, and geometry diagrams with parallel lines.',
            fact: 'A scale map is really a similarity machine.'
        },
        {
            q: 'When',
            label: '$\\mathbf{do\\ we\\ use\\ BPT?}$',
            icon: '⏰',
            gradFrom: '#3b82f6',
            gradTo: '#60a5fa',
            shadow: 'rgba(59, 130, 246, 0.28)',
            content: 'We use the Basic Proportionality Theorem when a line parallel to one side of a triangle cuts the other two sides and creates proportional segments.',
            fact: 'The converse of BPT lets us prove a line is parallel using only ratios.'
        },
        {
            q: 'How',
            label: '$\\mathbf{do\\ we\\ solve\\ problems?}$',
            icon: '🧠',
            gradFrom: '#ec4899',
            gradTo: '#fb7185',
            shadow: 'rgba(236, 72, 153, 0.28)',
            content: 'First identify the correct criterion such as AAA, SSS, or SAS. Then write corresponding sides in order, apply ratios carefully, and solve for the unknown.',
            fact: 'Most similarity mistakes happen when corresponding sides are matched in the wrong order.'
        }
    ]
};

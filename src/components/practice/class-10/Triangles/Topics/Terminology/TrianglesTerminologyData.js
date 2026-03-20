export const TERMS = [
    {
        name: 'Similar Figures',
        color: '#2563eb',
        icon: '🔷',
        def: 'Figures that have the same shape but may differ in size. Their corresponding angles are equal and corresponding lengths are proportional.',
        examples: ['Two circles with radii $r_1$ and $r_2$', 'Two squares with sides $a$ and $b$'],
        inUse: 'For polygons, both angle equality and side proportionality matter.',
        memory: 'Same shape, maybe different size.'
    },
    {
        name: 'Similar Triangles',
        color: '#0d9488',
        icon: '🔺',
        def: 'Two triangles are similar when their corresponding angles are equal and their corresponding sides are in the same ratio.',
        examples: ['$\\triangle ABC \\sim \\triangle DEF$', '$AB/DE = BC/EF = AC/DF$'],
        inUse: 'Once similarity is proved, many side and angle results follow immediately.',
        memory: 'Match the angles, then compare the sides.'
    },
    {
        name: 'Corresponding Parts',
        color: '#f59e0b',
        icon: '🧩',
        def: 'The sides and angles in two figures that occupy matching positions.',
        examples: ['If $\\triangle ABC \\sim \\triangle DEF$, then $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$'],
        inUse: 'Wrong correspondence is one of the most common student mistakes.',
        memory: 'Write the vertex order correctly before writing ratios.'
    },
    {
        name: 'Basic Proportionality Theorem',
        color: '#ec4899',
        icon: '📏',
        def: 'If a line is drawn parallel to one side of a triangle and cuts the other two sides, then it divides those two sides in the same ratio.',
        examples: ['If $DE \\parallel BC$ in $\\triangle ABC$, then $AD/DB = AE/EC$'],
        inUse: 'This theorem turns parallel lines into ratio equations.',
        memory: 'Parallel line inside a triangle means equal side ratios.'
    },
    {
        name: 'Converse of BPT',
        color: '#7c3aed',
        icon: '↔️',
        def: 'If a line divides two sides of a triangle in the same ratio, then the line is parallel to the third side.',
        examples: ['If $AD/DB = AE/EC$, then $DE \\parallel BC$'],
        inUse: 'Used mainly to prove that two lines are parallel.',
        memory: 'Equal ratios bring back parallel lines.'
    },
    {
        name: 'Scale Factor',
        color: '#3b82f6',
        icon: '📐',
        def: 'The common ratio of corresponding sides in two similar figures.',
        examples: ['If $AB/DE = 3/2$, the scale factor is $3:2$'],
        inUse: 'Lengths change by $k$, while areas change by $k^2$.',
        memory: 'Scale factor tells how much a figure grows or shrinks.'
    },
    {
        name: 'AAA or AA Similarity',
        color: '#10b981',
        icon: '∠',
        def: 'If two angles of one triangle are equal to two angles of another triangle, the triangles are similar.',
        examples: ['If $\\angle A = \\angle D$ and $\\angle B = \\angle E$, then triangles are similar'],
        inUse: 'The third angle is automatically equal because the angle sum is $180^\\circ$.',
        memory: 'Two equal angles are enough for triangle similarity.'
    },
    {
        name: 'SSS Similarity',
        color: '#ef4444',
        icon: '📎',
        def: 'If the three pairs of corresponding sides of two triangles are proportional, then the triangles are similar.',
        examples: ['If $AB/DE = BC/EF = AC/DF$, then triangles are similar'],
        inUse: 'Useful when only side lengths are given.',
        memory: 'All three side ratios must agree.'
    },
    {
        name: 'SAS Similarity',
        color: '#8b5cf6',
        icon: '📌',
        def: 'If two pairs of corresponding sides are proportional and the included angle between them is equal, then the triangles are similar.',
        examples: ['If $AB/DE = AC/DF$ and $\\angle A = \\angle D$, then triangles are similar'],
        inUse: 'The equal angle must lie between the compared sides.',
        memory: 'Two side ratios plus the sandwich angle.'
    }
];

export const FIVE_RULES = [
    {
        num: 1,
        title: 'Similarity Needs Shape Match',
        rule: 'Similar figures have equal corresponding angles and proportional corresponding sides.',
        emoji: '🔍',
        color: '#2563eb',
        detail: 'For general polygons, equal angles alone are not sufficient. The side ratios must also be equal.',
        examples: ['All circles are similar.', 'Two quadrilaterals with unequal side ratios are not similar even if some angles match.'],
        tip: 'For polygons, always test angles and side ratios together.'
    },
    {
        num: 2,
        title: 'AA Is Enough for Triangles',
        rule: 'If two angles of one triangle are equal to two angles of another triangle, the triangles are similar.',
        emoji: '∠',
        color: '#0d9488',
        detail: 'The third angle becomes equal automatically because the sum of angles in a triangle is $180^\\circ$.',
        examples: ['AA and AAA both prove triangle similarity.'],
        tip: 'Angle relations from parallel lines often lead to a quick AA proof.'
    },
    {
        num: 3,
        title: 'Parallel Line Gives Equal Ratios',
        rule: 'If a line is parallel to one side of a triangle, it divides the other two sides in the same ratio.',
        emoji: '📏',
        color: '#f59e0b',
        detail: 'This is the Basic Proportionality Theorem, also known as Thales theorem.',
        examples: ['If $DE \\parallel BC$, then $AD/DB = AE/EC$.'],
        tip: 'Keep the segment order consistent on both sides of the triangle.'
    },
    {
        num: 4,
        title: 'Equal Ratios Give Parallel Lines',
        rule: 'If two sides of a triangle are divided in the same ratio, the joining line is parallel to the third side.',
        emoji: '↔️',
        color: '#7c3aed',
        detail: 'This is the converse of the Basic Proportionality Theorem.',
        examples: ['If $AD/DB = AE/EC$, then $DE \\parallel BC$.'],
        tip: 'When a proof starts with equal ratios, think of the converse.'
    },
    {
        num: 5,
        title: 'Similarity Unlocks Everything',
        rule: 'Once triangles are similar, corresponding angles are equal and corresponding sides are proportional.',
        emoji: '🎯',
        color: '#ec4899',
        detail: 'That is why proving similarity first often solves an entire geometry question.',
        examples: ['If $\\triangle ABC \\sim \\triangle DEF$, then $AB/DE = BC/EF = AC/DF$.'],
        tip: 'Prove similarity first, calculate second.'
    }
];

export const VOCAB_QUIZ = [
    {
        question: 'If all corresponding angles of two triangles are equal, the triangles are:',
        options: ['Congruent', 'Similar', 'Parallel', 'Isosceles'],
        correct: 1,
        explanation: 'Equal corresponding angles imply triangle similarity by AA or AAA.'
    },
    {
        question: 'If $DE \\parallel BC$ in $\\triangle ABC$, then which ratio is correct?',
        options: ['$AD/DB = AE/EC$', '$AB/BC = AC/DE$', '$AD/AE = DB/BC$', '$AB/AD = AC/AE$'],
        correct: 0,
        explanation: 'This is the direct statement of the Basic Proportionality Theorem.'
    },
    {
        question: 'Which similarity criterion uses three side ratios?',
        options: ['AAA', 'SAS', 'SSS', 'BPT'],
        correct: 2,
        explanation: 'SSS similarity compares all three pairs of corresponding sides.'
    },
    {
        question: 'In SAS similarity, the equal angle must be:',
        options: ['Opposite the largest side', 'Between the two proportional sides', 'A right angle', 'Outside the triangle'],
        correct: 1,
        explanation: 'The included angle lies between the two compared sides.'
    },
    {
        question: 'If $AD/DB = AE/EC$, then $DE$ is:',
        options: ['Perpendicular to $BC$', 'Equal to $BC$', 'Parallel to $BC$', 'A median'],
        correct: 2,
        explanation: 'By the converse of BPT, equal ratios imply a parallel line.'
    }
];

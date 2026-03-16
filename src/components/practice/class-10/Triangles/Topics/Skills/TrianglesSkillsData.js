export const SKILLS = [
    {
        id: 'similar-figures',
        title: 'Understanding Similar Figures',
        subtitle: 'Same Shape, New Size',
        desc: 'Decide when figures and polygons are similar using angle equality and proportional sides.',
        icon: '🔷',
        color: '#2563eb',
        learn: {
            title: 'Similarity Starts with Shape',
            content: `Similar figures keep the same shape while their size may change.

For polygons, similarity requires:
1. Equal corresponding angles
2. Proportional corresponding sides

Special cases:
- All circles are similar
- All squares are similar
- Equal angles alone are not enough for general polygons`,
            rules: [
                'For polygons, check both angle equality and side proportionality.',
                'A common scale factor $k$ means every corresponding side changes by the same ratio.',
                'If side ratios differ, the figures are not similar.'
            ],
            examples: [
                { q: 'Are two circles with radii $r_1$ and $r_2$ similar?', a: 'Yes. All circles are similar because they have the same shape.' },
                { q: 'Are two quadrilaterals with equal angles but different side ratios similar?', a: 'No. Polygons also need proportional corresponding sides.' }
            ]
        },
        practice: [
            { question: 'All circles are similar because they have:', options: ['Equal radii', 'Same shape', 'Equal circumference', 'Equal area'], correct: 1, explanation: 'Circle similarity depends on shape, not equal radius.' },
            { question: 'Two squares with sides $a$ and $b$ are:', options: ['Always similar', 'Never similar', 'Similar only if $a=b$', 'Congruent'], correct: 0, explanation: 'All angles are $90^\\circ$ and all side ratios match.' },
            { question: 'For polygons to be similar, one condition is:', options: ['Equal area', 'Equal perimeter', 'Proportional corresponding sides', 'Equal diagonals'], correct: 2, explanation: 'Side proportionality is necessary.' },
            { question: 'If corresponding angles are equal but side ratios are different, the figures are:', options: ['Similar', 'Not similar', 'Congruent', 'Parallel'], correct: 1, explanation: 'General polygon similarity fails without proportional sides.' },
            { question: 'If all corresponding sides of two pentagons are in ratio $k$ and angles match, they are:', options: ['Congruent', 'Similar', 'Equal', 'Not comparable'], correct: 1, explanation: 'Equal angles plus common side ratio means similarity.' }
        ],
        assessment: [
            { question: 'Two photographs of the same object printed in different sizes are usually:', options: ['Similar', 'Congruent', 'Unrelated', 'Equal in area'], correct: 0, explanation: 'Resized photos preserve shape.' },
            { question: 'Which condition is NOT enough for polygon similarity?', options: ['Equal corresponding angles only', 'Equal angles and proportional sides', 'Common scale factor', 'Same shape'], correct: 0, explanation: 'For polygons, angle equality alone is not sufficient.' },
            { question: 'All squares are similar because:', options: ['They have equal areas', 'They have equal diagonals', 'All angles are equal and side ratios match', 'They are all congruent'], correct: 2, explanation: 'Any two squares have equal angles and proportional sides.' },
            { question: 'A scale factor of $3$ means each corresponding length becomes:', options: ['One-third', 'Triple', 'Squared', 'Unchanged'], correct: 1, explanation: 'Lengths are multiplied by 3.' },
            { question: 'If side ratios match but a corresponding angle pair differs, the polygons are:', options: ['Similar', 'Not similar', 'Congruent', 'Mirror images'], correct: 1, explanation: 'Angles must also match.' }
        ]
    },
    {
        id: 'similarity-of-triangles',
        title: 'Similarity of Triangles',
        subtitle: 'Matching Triangle Shapes',
        desc: 'Use triangle-specific conditions to decide whether two triangles are similar.',
        icon: '🔺',
        color: '#0d9488',
        learn: {
            title: 'Triangles Are Special',
            content: `Triangles are special because angle information is very powerful.

If two triangles have two equal corresponding angles, then the third pair is automatically equal. That is why AA or AAA similarity works for triangles.

Once triangles are similar, corresponding sides are proportional and corresponding angles are equal.`,
            rules: [
                'Write corresponding vertices in the same order before comparing sides.',
                'AA is enough to prove triangle similarity.',
                'After proving similarity, use side ratios to find unknown lengths.'
            ],
            examples: [
                { q: 'If $\\angle A = \\angle D$ and $\\angle B = \\angle E$, what can we say?', a: '$\\triangle ABC \\sim \\triangle DEF$ by AA similarity.' },
                { q: 'Can similar triangles have different sizes?', a: 'Yes. Similar means same shape, not same size.' }
            ]
        },
        practice: [
            { question: 'If all three corresponding angles of two triangles are equal, the triangles are:', options: ['Congruent', 'Similar', 'Perpendicular', 'Isosceles'], correct: 1, explanation: 'Equal corresponding angles imply similarity.' },
            { question: 'In similar triangles, corresponding sides are:', options: ['Equal', 'Parallel', 'Proportional', 'Perpendicular'], correct: 2, explanation: 'Similarity gives a common side ratio.' },
            { question: 'AA similarity works because the third angle comes from:', options: ['Perimeter', 'Triangle angle sum', 'Area', 'Longest side'], correct: 1, explanation: 'The angles of a triangle add to $180^\\circ$.' },
            { question: 'If $\\triangle ABC \\sim \\triangle DEF$, then $AB$ corresponds to:', options: ['EF', 'FD', 'DE', 'DF'], correct: 2, explanation: 'The order shows $A \\leftrightarrow D$ and $B \\leftrightarrow E$.' },
            { question: 'Similar triangles always have:', options: ['Equal area', 'Equal sides', 'Equal shape', 'Equal medians'], correct: 2, explanation: 'Size may differ, but shape remains the same.' }
        ],
        assessment: [
            { question: 'If two triangles have equal corresponding angles but one is larger, they are:', options: ['Not related', 'Similar', 'Congruent', 'Parallel'], correct: 1, explanation: 'Different size still allows similarity.' },
            { question: 'If corresponding side ratio is $k$, then each side in one triangle is:', options: ['$k$ times the corresponding side of the other', '$k^2$ times', 'Always equal', 'Half of it'], correct: 0, explanation: 'Scale factor directly multiplies lengths.' },
            { question: 'In similar triangles, areas are in the ratio:', options: ['Side ratio', 'Square of side ratio', 'Cube of side ratio', 'Always 1'], correct: 1, explanation: 'Areas scale as the square of the side scale factor.' },
            { question: 'A common similarity mistake is:', options: ['Using fractions', 'Mixing the corresponding order of sides', 'Drawing a diagram', 'Checking angles'], correct: 1, explanation: 'Wrong correspondence gives wrong ratios.' },
            { question: 'If one corresponding angle is $58^\\circ$, the matching angle in the similar triangle is:', options: ['$32^\\circ$', '$58^\\circ$', '$122^\\circ$', '$90^\\circ$'], correct: 1, explanation: 'Corresponding angles remain equal.' }
        ]
    },
    {
        id: 'bpt-and-converse',
        title: 'Basic Proportionality Theorem',
        subtitle: 'Parallel Lines Inside Triangles',
        desc: 'Use BPT and its converse to prove ratios and parallel lines.',
        icon: '📏',
        color: '#f59e0b',
        learn: {
            title: 'Parallel Means Proportional',
            content: `In $\\triangle ABC$, if $DE \\parallel BC$ and the line cuts $AB$ and $AC$, then:
$$\\frac{AD}{DB} = \\frac{AE}{EC}$$

This is the Basic Proportionality Theorem.

Conversely, if these two ratios are equal, then the joining line is parallel to the third side.`,
            rules: [
                'BPT goes from a parallel line to equal side ratios.',
                'Converse BPT goes from equal side ratios to a parallel line.',
                'Always match segment order carefully.'
            ],
            examples: [
                { q: 'If $DE \\parallel BC$, what is true?', a: '$AD/DB = AE/EC$.' },
                { q: 'If $AD/DB = AE/EC$, what can we conclude?', a: '$DE \\parallel BC$ by the converse of BPT.' }
            ]
        },
        practice: [
            { question: 'If $DE \\parallel BC$ in $\\triangle ABC$, then:', options: ['$AD/DB = AE/EC$', '$AD/AE = DB/BC$', '$AE = EC$', '$AD = DB$'], correct: 0, explanation: 'That is the statement of BPT.' },
            { question: 'The converse of BPT is used to prove:', options: ['Area equality', 'Parallel lines', 'Congruence', 'Perpendicularity'], correct: 1, explanation: 'Equal side ratios imply a parallel line.' },
            { question: 'BPT requires a line parallel to:', options: ['A median', 'One side of the triangle', 'A diagonal', 'An angle bisector'], correct: 1, explanation: 'The theorem begins with a line parallel to one side.' },
            { question: 'If $AD/DB \\ne AE/EC$, then $DE$ is:', options: ['Definitely parallel to $BC$', 'Definitely perpendicular to $BC$', 'Not proved parallel to $BC$', 'Equal to $BC$'], correct: 2, explanation: 'The converse condition is not satisfied.' },
            { question: 'If $AD=4$, $DB=6$, and $AE=8$, then $EC$ equals:', options: ['10', '12', '6', '4'], correct: 1, explanation: '$4/6 = 8/EC$, so $EC = 12$.' }
        ],
        assessment: [
            { question: 'BPT is also called:', options: ['Pythagoras theorem', 'Thales theorem', 'Midpoint theorem', 'Angle bisector theorem'], correct: 1, explanation: 'BPT is commonly referred to as Thales theorem.' },
            { question: 'If $DE \\parallel BC$, then triangles $ADE$ and $ABC$ are:', options: ['Congruent', 'Similar', 'Perpendicular', 'Equal in area'], correct: 1, explanation: 'Parallel lines create equal angle pairs, giving similarity.' },
            { question: 'If a line divides two sides of a triangle in the ratio $3:5$, then to use converse BPT the other side must also be divided in:', options: ['$3:8$', '$5:3$', '$3:5$', '$8:3$'], correct: 2, explanation: 'The same ratio is required.' },
            { question: 'Converse BPT begins with:', options: ['Equal angles', 'Equal ratios on two sides', 'Equal areas', 'Equal medians'], correct: 1, explanation: 'It starts from proportional division of two sides.' },
            { question: 'If $AD/DB = AE/EC$, then the joining line through $D$ and $E$ is justified by:', options: ['BPT', 'Converse of BPT', 'SSS', 'SAS'], correct: 1, explanation: 'Equal side ratios imply parallelism by the converse.' }
        ]
    },
    {
        id: 'applications-of-bpt',
        title: 'Applications of Proportional Segments',
        subtitle: 'Finding Missing Lengths',
        desc: 'Solve ratio-based geometry problems using BPT and similar triangles.',
        icon: '🧮',
        color: '#7c3aed',
        learn: {
            title: 'Turn Ratios into Answers',
            content: `After spotting a parallel line or a pair of similar triangles, convert the geometry into an equation.

Typical flow:
1. State the theorem
2. Write the correct ratio
3. Substitute known values
4. Solve for the unknown length`,
            rules: [
                'Use one clean ratio equation at a time.',
                'Reduce fractions only after matching corresponding segments carefully.',
                'Label the figure neatly before solving.'
            ],
            examples: [
                { q: 'If $AD=3$, $DB=2$, and $AE=9$, find $EC$.', a: 'By BPT, $3/2 = 9/EC$, so $EC = 6$.' },
                { q: 'What is the biggest help in these questions?', a: 'Correct correspondence and careful substitution.' }
            ]
        },
        practice: [
            { question: 'If $AD/DB = 2/3$ and $AE = 8$, then $EC$ is:', options: ['10', '12', '6', '4'], correct: 1, explanation: '$2/3 = 8/EC$, so $EC = 12$.' },
            { question: 'In a BPT problem, the first thing to check is:', options: ['Area', 'Parallel line condition', 'Perimeter', 'Diagonal length'], correct: 1, explanation: 'BPT depends on a parallel line or its converse.' },
            { question: 'If the ratio is $5:7$ and one segment is 15, the matching segment is:', options: ['21', '35', '10.5', '12'], correct: 0, explanation: '$5/7 = 15/x$, so $x=21$.' },
            { question: 'Proportional segment problems often become:', options: ['Quadratic equations', 'Simple linear equations', 'Circular proofs', 'Trigonometric identities'], correct: 1, explanation: 'They usually reduce to one linear equation.' },
            { question: 'If triangles are similar with side ratio $3:4$, then the side corresponding to 12 is:', options: ['9', '16', '15', '8'], correct: 1, explanation: '$3/4 = 12/x$, so $x = 16$.' }
        ],
        assessment: [
            { question: 'If $DE \\parallel BC$, $AD=6$, $DB=4$, and $AE=9$, then $EC$ is:', options: ['6', '4', '9', '15'], correct: 0, explanation: '$6/4 = 9/EC$, so $EC=6$.' },
            { question: 'If $AD:AB = 3:5$ and $AB=20$, then $AD=$', options: ['10', '12', '15', '8'], correct: 1, explanation: '$AD = (3/5)\\times 20 = 12$.' },
            { question: 'In similar triangles, if one side doubles, the corresponding side also:', options: ['Halves', 'Doubles in the same ratio', 'Stays same', 'Becomes zero'], correct: 1, explanation: 'Corresponding sides follow the same scale factor.' },
            { question: 'The most reliable way to avoid BPT mistakes is to:', options: ['Estimate mentally', 'Skip the figure', 'Write side names in matching order', 'Ignore the diagram'], correct: 2, explanation: 'Correct ordering keeps ratios consistent.' },
            { question: 'If $AD/DB = AE/EC$, then the line through $D$ and $E$ is:', options: ['A median', 'Parallel to $BC$', 'Perpendicular to $BC$', 'Equal to $BC$'], correct: 1, explanation: 'That follows from converse BPT.' }
        ]
    },
    {
        id: 'aaa-sss-sas',
        title: 'Criteria for Similarity',
        subtitle: 'AAA, SSS, SAS',
        desc: 'Choose the correct triangle similarity test and justify it clearly.',
        icon: '🎯',
        color: '#ec4899',
        learn: {
            title: 'Three Main Tests',
            content: `The three standard similarity criteria are:

1. AAA or AA: equal corresponding angles
2. SSS: all three corresponding sides proportional
3. SAS: two corresponding sides proportional and included angle equal

The goal is to pick the shortest correct test for the given data.`,
            rules: [
                'Use AA when angle data is easiest to spot.',
                'Use SSS only when all three side ratios match.',
                'Use SAS only when the equal angle is between the proportional sides.'
            ],
            examples: [
                { q: 'If two angles match, which test works?', a: 'AA similarity.' },
                { q: 'If side ratios match but the angle is not included, can you use SAS?', a: 'No. The equal angle must be included between those sides.' }
            ]
        },
        practice: [
            { question: 'Equal corresponding angles suggest:', options: ['SSS', 'SAS', 'AA or AAA', 'BPT only'], correct: 2, explanation: 'Angle equality gives AA or AAA similarity.' },
            { question: 'If $AB/DE = BC/EF = AC/DF$, use:', options: ['AA', 'SAS', 'SSS', 'BPT'], correct: 2, explanation: 'All three side pairs are proportional.' },
            { question: 'If $AB/DE = AC/DF$ and $\\angle A = \\angle D$, use:', options: ['SSS', 'SAS', 'AA', 'Converse BPT'], correct: 1, explanation: 'Two side ratios and the included angle give SAS.' },
            { question: 'Which is NOT a standard similarity criterion?', options: ['AAA', 'SSS', 'SAS', 'ASA'], correct: 3, explanation: 'AA covers triangle similarity; ASA is usually used in congruence language.' },
            { question: 'The included angle in SAS must be:', options: ['Exterior angle', 'Between the two given sides', 'Always acute', 'Equal to $90^\\circ$'], correct: 1, explanation: 'That is the definition of SAS.' }
        ],
        assessment: [
            { question: 'If two sides are proportional but the included angles are unequal, then SAS similarity is:', options: ['Proved', 'Not proved', 'Always true', 'Congruent'], correct: 1, explanation: 'The included angle condition fails.' },
            { question: 'If all angles of two triangles are equal, then the triangles are:', options: ['Similar', 'Congruent', 'Equal in perimeter', 'Isosceles'], correct: 0, explanation: 'That is AAA similarity.' },
            { question: 'Which test can work when no angle is given?', options: ['AA', 'SSS', 'SAS', 'BPT'], correct: 1, explanation: 'SSS uses only side ratios.' },
            { question: 'If $AB/DE = AC/DF$ but $BC/EF$ is different, then SSS similarity is:', options: ['Valid', 'Invalid', 'Always half-valid', 'A theorem'], correct: 1, explanation: 'All three side ratios must match for SSS.' },
            { question: 'When choosing a similarity criterion, you should prefer:', options: ['The longest method', 'The test supported directly by the given information', 'Only AA', 'Only SSS'], correct: 1, explanation: 'Pick the criterion that fits the available data.' }
        ]
    },
    {
        id: 'using-similar-triangles',
        title: 'Using Similar Triangles',
        subtitle: 'Unknown Angles and Lengths',
        desc: 'Apply proven similarity to solve geometry questions involving sides and angles.',
        icon: '🧠',
        color: '#3b82f6',
        learn: {
            title: 'Similarity Unlocks the Figure',
            content: `Once you prove two triangles are similar, you can:
- equate corresponding angles
- compare corresponding sides
- derive unknown lengths
- transfer angle values between triangles

That is why one similarity proof often solves an entire geometry problem.`,
            rules: [
                'State the similarity before jumping to calculations.',
                'Use corresponding angle equality to find unknown angles.',
                'Use side ratios carefully to solve for unknown lengths.'
            ],
            examples: [
                { q: 'What can you do after proving $\\triangle ABC \\sim \\triangle DEF$?', a: 'Use both equal angles and proportional sides.' },
                { q: 'Why is similarity powerful?', a: 'One proof often gives several unknown values at once.' }
            ]
        },
        practice: [
            { question: 'After proving triangles similar, you can compare:', options: ['Only angles', 'Only sides', 'Both corresponding sides and angles', 'Only area'], correct: 2, explanation: 'Similarity gives both angle and side relations.' },
            { question: 'If similar triangles have side ratio $2:5$ and the smaller side is 8, the larger is:', options: ['10', '16', '20', '25'], correct: 2, explanation: '$2/5 = 8/x$, so $x=20$.' },
            { question: 'Corresponding angles in similar triangles are:', options: ['Supplementary', 'Equal', 'Complementary', 'Unrelated'], correct: 1, explanation: 'Angle equality is part of similarity.' },
            { question: 'A triangle enlarged by scale factor 3 has a side 7 become:', options: ['10', '14', '21', '49'], correct: 2, explanation: 'Lengths are multiplied by 3.' },
            { question: 'The best first step in a geometry problem using similarity is:', options: ['Multiply everything', 'Prove the triangles are similar', 'Find perimeter', 'Assume answers'], correct: 1, explanation: 'Similarity must be established before using it.' }
        ],
        assessment: [
            { question: 'If $\\triangle ABC \\sim \\triangle DEF$ and $AB/DE = 4/7$, then a side corresponding to 20 becomes:', options: ['35', '28', '16', '80'], correct: 0, explanation: '$4/7 = 20/x$, so $x = 35$.' },
            { question: 'Enlargement by scale factor $s$ changes lengths by:', options: ['$s$', '$s^2$', '$1/s$', 'No change'], correct: 0, explanation: 'Linear measures scale directly by $s$.' },
            { question: 'If side ratio of two similar triangles is $1:3$, area ratio is:', options: ['$1:3$', '$1:6$', '$1:9$', '$3:1$'], correct: 2, explanation: 'Area ratio is the square of the side ratio.' },
            { question: 'A common use of similar triangles with parallel lines is to find:', options: ['Only medians', 'Unknown lengths', 'Prime factors', 'Decimals'], correct: 1, explanation: 'Similarity is frequently used for missing-length problems.' },
            { question: 'If one corresponding angle is $42^\\circ$, the matching angle in the similar triangle is:', options: ['$42^\\circ$', '$48^\\circ$', '$138^\\circ$', '$90^\\circ$'], correct: 0, explanation: 'Corresponding angles remain equal.' }
        ]
    },
    {
        id: 'real-life-applications',
        title: 'Real-Life Applications',
        subtitle: 'Indirect Measurement',
        desc: 'Use similar triangles to estimate heights, shadows, and distances in the real world.',
        icon: '🌤️',
        color: '#10b981',
        learn: {
            title: 'Measure Without Climbing',
            content: `Similar triangles let us measure inaccessible objects.

Common situations:
- shadow problems
- lamp post and person problems
- height of trees, towers, and buildings
- map and scale drawing questions

The main idea is that equal light angles create similar triangles.`,
            rules: [
                'Use the same units before forming ratios.',
                'Identify the pair of similar triangles clearly.',
                'Match height with height and shadow with shadow.'
            ],
            examples: [
                { q: 'A 2 m pole casts a 3 m shadow and a tower casts a 12 m shadow. Height of tower?', a: '$2/3 = h/12$, so $h = 8$ m.' },
                { q: 'Why do shadow problems work?', a: 'Objects and shadows form similar right triangles under the same sunlight.' }
            ]
        },
        practice: [
            { question: 'A 3 m pole casts a 4 m shadow. A tree casts an 8 m shadow. Tree height is:', options: ['4 m', '5 m', '6 m', '9 m'], correct: 2, explanation: '$3/4 = h/8$, so $h = 6$ m.' },
            { question: 'In shadow problems, heights correspond to:', options: ['Angles', 'Bases', 'Heights', 'Perimeters'], correct: 2, explanation: 'Vertical side is matched with vertical side.' },
            { question: 'Before solving real-life ratio problems, check:', options: ['Prime numbers', 'Units', 'Area formulas', 'Diagonals'], correct: 1, explanation: 'Mixed units lead to wrong answers.' },
            { question: 'A person 1.5 m tall casts a 2 m shadow, while a post casts a 6 m shadow. Post height is:', options: ['3 m', '4.5 m', '6 m', '9 m'], correct: 1, explanation: '$1.5/2 = h/6$, so $h = 4.5$ m.' },
            { question: 'Indirect measurement is useful when the object is:', options: ['Easy to touch', 'Too far or too tall to measure directly', 'Always wooden', 'Always triangular'], correct: 1, explanation: 'Similarity helps when direct measurement is difficult.' }
        ],
        assessment: [
            { question: 'A 5 m pole casts a 10 m shadow. A building casts a 50 m shadow. Building height is:', options: ['20 m', '25 m', '30 m', '40 m'], correct: 1, explanation: '$5/10 = h/50$, so $h = 25$ m.' },
            { question: 'In lamp-post shadow problems, the person, shadow tip, and lamp make:', options: ['A circle', 'Similar triangles', 'A rectangle', 'Parallel lines only'], correct: 1, explanation: 'The geometry is modeled by similar triangles.' },
            { question: 'If the scale factor between two measurement triangles is 4, then every matching length becomes:', options: ['One-fourth', '4 times', '16 times', 'Unchanged'], correct: 1, explanation: 'Lengths scale linearly.' },
            { question: 'The main idea behind indirect measurement in this chapter is:', options: ['Congruence', 'Similarity', 'Statistics', 'Probability'], correct: 1, explanation: 'Indirect measurement depends on similar triangles.' },
            { question: 'If the shadow doubles under the same sun angle, the height also:', options: ['Halves', 'Doubles', 'Becomes zero', 'Stays fixed'], correct: 1, explanation: 'Corresponding lengths remain proportional.' }
        ]
    }
];

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
            { question: 'If all corresponding sides of two pentagons are in ratio $k$ and angles match, they are:', options: ['Congruent', 'Similar', 'Equal', 'Not comparable'], correct: 1, explanation: 'Equal angles plus common side ratio means similarity.' },
            { question: 'Two rectangles have sides $2, 4$ and $3, 6$. They are:', options: ['Similar', 'Not similar', 'Congruent', 'Squares'], correct: 0, explanation: 'The side ratios match: $2/3 = 4/6$ and all angles are right angles.' },
            { question: 'Two rhombuses have all sides proportional but one has angles $60^\\circ,120^\\circ$ and the other $70^\\circ,110^\\circ$. They are:', options: ['Similar', 'Not similar', 'Congruent', 'Squares'], correct: 1, explanation: 'For polygons, equal side ratios alone are not enough; corresponding angles must also be equal.' },
            { question: 'If two polygons are similar with scale factor $2:5$, then their perimeters are in the ratio:', options: ['$2:5$', '$4:25$', '$5:2$', '$7:10$'], correct: 0, explanation: 'Perimeters of similar figures are in the same ratio as corresponding sides.' },
            { question: 'A pair of hexagons has equal corresponding angles and side ratio $3:3$. This means the hexagons are:', options: ['Only similar', 'Congruent and therefore similar', 'Not similar', 'Mirror images only'], correct: 1, explanation: 'A side ratio of $1$ with equal angles makes the figures congruent, and congruent figures are also similar.' },
            { question: 'Which statement is true for all similar figures?', options: ['Their areas are equal', 'Their corresponding sides are proportional', 'Their perimeters are equal', 'All diagonals are equal'], correct: 1, explanation: 'Proportional corresponding sides are a defining feature of similarity.' }
        ],
        assessment: [
            { question: 'Two photographs of the same object printed in different sizes are usually:', options: ['Similar', 'Congruent', 'Unrelated', 'Equal in area'], correct: 0, explanation: 'Resized photos preserve shape.' },
            { question: 'Which condition is NOT enough for polygon similarity?', options: ['Equal corresponding angles only', 'Equal angles and proportional sides', 'Common scale factor', 'Same shape'], correct: 0, explanation: 'For polygons, angle equality alone is not sufficient.' },
            { question: 'All squares are similar because:', options: ['They have equal areas', 'They have equal diagonals', 'All angles are equal and side ratios match', 'They are all congruent'], correct: 2, explanation: 'Any two squares have equal angles and proportional sides.' },
            { question: 'A scale factor of $3$ means each corresponding length becomes:', options: ['One-third', 'Triple', 'Squared', 'Unchanged'], correct: 1, explanation: 'Lengths are multiplied by 3.' },
            { question: 'If side ratios match but a corresponding angle pair differs, the polygons are:', options: ['Similar', 'Not similar', 'Congruent', 'Mirror images'], correct: 1, explanation: 'Angles must also match.' },
            { question: 'Two triangles have side lengths $4,6,8$ and $6,9,12$. They are:', options: ['Similar', 'Congruent', 'Not similar', 'Right triangles'], correct: 0, explanation: 'All three side lengths are in the same ratio $2:3$.' },
            { question: 'If two similar polygons have side ratio $4:7$, then their area ratio is:', options: ['$4:7$', '$16:49$', '$7:4$', '$8:14$'], correct: 1, explanation: 'Areas of similar figures are in the square of the side ratio.' },
            { question: 'A circle of radius $5$ and a circle of radius $12$ are similar with scale factor:', options: ['$5:12$', '$12:5$', '$17:1$', '$1:1$'], correct: 0, explanation: 'Any two circles are similar, and the scale factor is the ratio of corresponding radii.' },
            { question: 'If a figure is enlarged and every angle stays the same while each side is multiplied by the same number, the new figure is:', options: ['Congruent only', 'Similar', 'Not related', 'Symmetrical only'], correct: 1, explanation: 'That is exactly what similarity means.' },
            { question: 'Which pair is definitely similar?', options: ['Any two rectangles', 'Any two circles', 'Any two rhombuses', 'Any two parallelograms'], correct: 1, explanation: 'All circles are always similar, but the others need extra angle conditions.' }
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
            { question: 'Similar triangles always have:', options: ['Equal area', 'Equal sides', 'Equal shape', 'Equal medians'], correct: 2, explanation: 'Size may differ, but shape remains the same.' },
            { question: 'If $\\triangle PQR \\sim \\triangle XYZ$ and $PQ = 6$, $XY = 9$, then the scale factor from the first triangle to the second is:', options: ['$2:3$', '$3:2$', '$6:9$', '$9:6$'], correct: 0, explanation: 'Corresponding side ratio is $6:9 = 2:3$.' },
            { question: 'If two triangles have angles $(50^\\circ, 60^\\circ, 70^\\circ)$ and $(70^\\circ, 50^\\circ, 60^\\circ)$, then they are:', options: ['Not similar', 'Similar', 'Congruent only', 'Right triangles'], correct: 1, explanation: 'The same angle set means the triangles are similar after matching the correct order.' },
            { question: 'If corresponding sides of two similar triangles are in the ratio $3:5$, and one side in the first triangle is $12$, the corresponding side in the second is:', options: ['15', '18', '20', '24'], correct: 2, explanation: '$3/5 = 12/x$ gives $x = 20$.' },
            { question: 'Two triangles have side lengths $5,7,9$ and $10,14,18$. Which statement is true?', options: ['They are congruent', 'They are similar', 'They are not similar', 'They are right triangles'], correct: 1, explanation: 'All corresponding sides are in the ratio $1:2$.' },
            { question: 'If two similar triangles have perimeters $24$ and $36$, then a pair of corresponding sides is in the ratio:', options: ['$2:3$', '$3:2$', '$4:9$', '$24:36^2$'], correct: 0, explanation: 'Perimeters of similar triangles are in the same ratio as corresponding sides.' }
        ],
        assessment: [
            { question: 'If two triangles have equal corresponding angles but one is larger, they are:', options: ['Not related', 'Similar', 'Congruent', 'Parallel'], correct: 1, explanation: 'Different size still allows similarity.' },
            { question: 'If corresponding side ratio is $k$, then each side in one triangle is:', options: ['$k$ times the corresponding side of the other', '$k^2$ times', 'Always equal', 'Half of it'], correct: 0, explanation: 'Scale factor directly multiplies lengths.' },
            { question: 'In similar triangles, areas are in the ratio:', options: ['Side ratio', 'Square of side ratio', 'Cube of side ratio', 'Always 1'], correct: 1, explanation: 'Areas scale as the square of the side scale factor.' },
            { question: 'A common similarity mistake is:', options: ['Using fractions', 'Mixing the corresponding order of sides', 'Drawing a diagram', 'Checking angles'], correct: 1, explanation: 'Wrong correspondence gives wrong ratios.' },
            { question: 'If one corresponding angle is $58^\\circ$, the matching angle in the similar triangle is:', options: ['$32^\\circ$', '$58^\\circ$', '$122^\\circ$', '$90^\\circ$'], correct: 1, explanation: 'Corresponding angles remain equal.' },
            { question: 'If $\\triangle ABC \\sim \\triangle DEF$ and $AB=8$, $DE=12$, $BC=10$, then $EF$ is:', options: ['$12$', '$15$', '$18$', '$20$'], correct: 1, explanation: 'The scale factor is $12/8 = 3/2$, so $EF = 10 \\times 3/2 = 15$.' },
            { question: 'If two similar triangles have side ratio $4:9$, then the ratio of their areas is:', options: ['$4:9$', '$8:18$', '$16:81$', '$2:3$'], correct: 2, explanation: 'Area ratio is the square of the side ratio.' },
            { question: 'If two angles of one triangle are equal to two angles of another triangle, then the third pair of angles is equal because:', options: ['Sides are equal', 'Angle sum is $180^\\circ$', 'Perimeters are equal', 'Areas are equal'], correct: 1, explanation: 'The third angle follows from the triangle angle sum property.' },
            { question: 'Two triangles with sides $3,4,5$ and $6,8,10$ are similar by:', options: ['AA', 'SAS', 'SSS', 'BPT'], correct: 2, explanation: 'All three corresponding sides are proportional.' },
            { question: 'If the scale factor from a smaller triangle to a larger similar triangle is $5$, then a side of length $7$ becomes:', options: ['$12$', '$35$', '$49$', '$70$'], correct: 1, explanation: 'Lengths are multiplied directly by the scale factor.' }
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
            { question: 'If $AD=4$, $DB=6$, and $AE=8$, then $EC$ equals:', options: ['10', '12', '6', '4'], correct: 1, explanation: '$4/6 = 8/EC$, so $EC = 12$.' },
            { question: 'If $DE \\parallel BC$, then $\\triangle ADE$ and $\\triangle ABC$ are similar because of:', options: ['SSS', 'Equal corresponding angles', 'Equal areas', 'Equal medians'], correct: 1, explanation: 'Parallel lines create equal angle pairs, giving AA similarity.' },
            { question: 'If $AD/DB = 5/7$ and $AE = 15$, then $EC$ is:', options: ['18', '20', '21', '24'], correct: 2, explanation: '$5/7 = 15/EC$, so $EC = 21$.' },
            { question: 'Which statement follows from $DE \\parallel BC$?', options: ['$AD/AB = AE/AC$', '$AD = AE$', '$DB = EC$', '$AB = AC$'], correct: 0, explanation: 'The smaller triangle is similar to the whole triangle, giving equal corresponding ratios.' },
            { question: 'If $AD = 3$, $DB = 9$, and $AE = 5$, then $EC$ is:', options: ['10', '12', '15', '18'], correct: 2, explanation: '$3/9 = 5/EC$, so $EC = 15$.' },
            { question: 'If a line cuts two sides of a triangle in equal ratio, the theorem used to prove it is parallel is:', options: ['BPT', 'Converse of BPT', 'Midpoint theorem', 'Pythagoras theorem'], correct: 1, explanation: 'Equal side ratios imply a parallel line by the converse.' }
        ],
        assessment: [
            { question: 'BPT is also called:', options: ['Pythagoras theorem', 'Thales theorem', 'Midpoint theorem', 'Angle bisector theorem'], correct: 1, explanation: 'BPT is commonly referred to as Thales theorem.' },
            { question: 'If $DE \\parallel BC$, then triangles $ADE$ and $ABC$ are:', options: ['Congruent', 'Similar', 'Perpendicular', 'Equal in area'], correct: 1, explanation: 'Parallel lines create equal angle pairs, giving similarity.' },
            { question: 'If a line divides two sides of a triangle in the ratio $3:5$, then to use converse BPT the other side must also be divided in:', options: ['$3:8$', '$5:3$', '$3:5$', '$8:3$'], correct: 2, explanation: 'The same ratio is required.' },
            { question: 'Converse BPT begins with:', options: ['Equal angles', 'Equal ratios on two sides', 'Equal areas', 'Equal medians'], correct: 1, explanation: 'It starts from proportional division of two sides.' },
            { question: 'If $AD/DB = AE/EC$, then the joining line through $D$ and $E$ is justified by:', options: ['BPT', 'Converse of BPT', 'SSS', 'SAS'], correct: 1, explanation: 'Equal side ratios imply parallelism by the converse.' },
            { question: 'If $DE \\parallel BC$ and $AB = 12$, $AD = 4$, then $AE/AC$ equals:', options: ['$1/4$', '$1/3$', '$1/2$', '$2/3$'], correct: 1, explanation: 'Since $AD/AB = AE/AC$, we get $AE/AC = 4/12 = 1/3$.' },
            { question: 'If $AD = 2$, $DB = 3$, and $AE = 4$, then $AC$ is:', options: ['8', '10', '12', '14'], correct: 1, explanation: 'From BPT, $2/3 = 4/EC$, so $EC = 6$ and $AC = 10$.' },
            { question: 'If a line is parallel to one side of a triangle, it divides the other two sides in:', options: ['Equal lengths', 'The same ratio', 'Perpendicular segments', 'Random order'], correct: 1, explanation: 'That is the exact statement of BPT.' },
            { question: 'If $AD/AB = AE/AC$, then this usually suggests:', options: ['Congruence', 'BPT or similarity due to a parallel line', 'A circle theorem', 'Only area comparison'], correct: 1, explanation: 'These equal ratios commonly arise from BPT or the similarity created by a parallel segment.' },
            { question: 'If $AD/DB = 4/5$ and $AE = 12$, then $AC$ is:', options: ['21', '24', '27', '30'], correct: 2, explanation: '$4/5 = 12/EC$ gives $EC = 15$, so $AC = 12 + 15 = 27$.' }
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
            { question: 'If triangles are similar with side ratio $3:4$, then the side corresponding to 12 is:', options: ['9', '16', '15', '8'], correct: 1, explanation: '$3/4 = 12/x$, so $x = 16$.' },
            { question: 'If $AD/DB = 4/9$ and $AE = 12$, then $EC$ is:', options: ['18', '21', '27', '24'], correct: 2, explanation: '$4/9 = 12/EC$, so $EC = 27$.' },
            { question: 'If $DE \\parallel BC$ and $AD = 5$, $AB = 15$, then $AE/AC$ equals:', options: ['$1/2$', '$1/3$', '$2/3$', '$3/5$'], correct: 1, explanation: 'From similarity, $AD/AB = AE/AC = 5/15 = 1/3$.' },
            { question: 'If a smaller triangle inside a larger triangle is similar with scale factor $2:5$, then a corresponding side of the larger triangle measuring 25 gives the smaller side as:', options: ['5', '8', '10', '12.5'], correct: 2, explanation: '$2/5 = x/25$, so $x = 10$.' },
            { question: 'If $AD = 7$, $DB = 5$, and $AE = 14$, then $EC$ is:', options: ['8', '10', '12', '15'], correct: 1, explanation: '$7/5 = 14/EC$, so $EC = 10$.' },
            { question: 'The hardest part of proportional segment questions is usually:', options: ['Drawing a circle', 'Matching the correct corresponding segments', 'Finding prime numbers', 'Using calculus'], correct: 1, explanation: 'Most mistakes come from writing the wrong pair of corresponding ratios.' }
        ],
        assessment: [
            { question: 'If $DE \\parallel BC$, $AD=6$, $DB=4$, and $AE=9$, then $EC$ is:', options: ['6', '4', '9', '15'], correct: 0, explanation: '$6/4 = 9/EC$, so $EC=6$.' },
            { question: 'If $AD:AB = 3:5$ and $AB=20$, then $AD=$', options: ['10', '12', '15', '8'], correct: 1, explanation: '$AD = (3/5)\\times 20 = 12$.' },
            { question: 'In similar triangles, if one side doubles, the corresponding side also:', options: ['Halves', 'Doubles in the same ratio', 'Stays same', 'Becomes zero'], correct: 1, explanation: 'Corresponding sides follow the same scale factor.' },
            { question: 'The most reliable way to avoid BPT mistakes is to:', options: ['Estimate mentally', 'Skip the figure', 'Write side names in matching order', 'Ignore the diagram'], correct: 2, explanation: 'Correct ordering keeps ratios consistent.' },
            { question: 'If $AD/DB = AE/EC$, then the line through $D$ and $E$ is:', options: ['A median', 'Parallel to $BC$', 'Perpendicular to $BC$', 'Equal to $BC$'], correct: 1, explanation: 'That follows from converse BPT.' },
            { question: 'If $AD = 8$, $DB = 12$, and $AE = 10$, then $EC$ is:', options: ['12', '15', '18', '20'], correct: 1, explanation: '$8/12 = 10/EC$, so $EC = 15$.' },
            { question: 'If a segment divides two sides of a triangle in the same ratio, the strongest conclusion is:', options: ['The triangle is equilateral', 'The segment is parallel to the third side', 'The segment is a median', 'The segment is perpendicular'], correct: 1, explanation: 'That is the converse of BPT.' },
            { question: 'If corresponding sides of similar triangles are in ratio $5:8$ and the smaller side is $20$, the larger is:', options: ['24', '28', '32', '36'], correct: 2, explanation: '$5/8 = 20/x$, so $x=32$.' },
            { question: 'If $AD/AB = 2/5$ and $AB = 25$, then $DB$ is:', options: ['10', '12', '15', '20'], correct: 2, explanation: '$AD = 10$, so $DB = 25 - 10 = 15$.' },
            { question: 'A well-solved proportionality proof must show:', options: ['Only the answer', 'The theorem and correct corresponding ratio', 'The perimeter', 'A graph'], correct: 1, explanation: 'The theorem used and the exact ratio setup are the backbone of the solution.' }
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
            { question: 'The included angle in SAS must be:', options: ['Exterior angle', 'Between the two given sides', 'Always acute', 'Equal to $90^\\circ$'], correct: 1, explanation: 'That is the definition of SAS.' },
            { question: 'If two triangles have angles $40^\\circ$ and $65^\\circ$ equal respectively, the triangles are similar by:', options: ['SSS', 'SAS', 'AA', 'BPT'], correct: 2, explanation: 'Two equal corresponding angles are enough for AA similarity.' },
            { question: 'If the sides of one triangle are $3,4,5$ and of another are $9,12,15$, the triangles are similar by:', options: ['AA', 'SSS', 'SAS', 'Converse BPT'], correct: 1, explanation: 'All three corresponding side ratios are equal.' },
            { question: 'For SAS similarity, if $AB/DE = AC/DF$, then which angle must equal $\\angle A$?', options: ['$\\angle E$', '$\\angle F$', '$\\angle D$', '$\\angle EDF$'], correct: 2, explanation: 'The included angle between the compared sides must correspond, so $\\angle A = \\angle D$.' },
            { question: 'If only two side ratios are known but the included angle is not given, then which criterion cannot be used directly?', options: ['AA', 'SSS', 'SAS', 'AAA'], correct: 2, explanation: 'SAS needs the included angle in addition to the two side ratios.' },
            { question: 'Which set of data proves similarity most directly: $\\angle A = \\angle D$, $\\angle B = \\angle E$?', options: ['SSS', 'SAS', 'AA', 'No criterion'], correct: 2, explanation: 'Two equal corresponding angles immediately give AA similarity.' }
        ],
        assessment: [
            { question: 'If two sides are proportional but the included angles are unequal, then SAS similarity is:', options: ['Proved', 'Not proved', 'Always true', 'Congruent'], correct: 1, explanation: 'The included angle condition fails.' },
            { question: 'If all angles of two triangles are equal, then the triangles are:', options: ['Similar', 'Congruent', 'Equal in perimeter', 'Isosceles'], correct: 0, explanation: 'That is AAA similarity.' },
            { question: 'Which test can work when no angle is given?', options: ['AA', 'SSS', 'SAS', 'BPT'], correct: 1, explanation: 'SSS uses only side ratios.' },
            { question: 'If $AB/DE = AC/DF$ but $BC/EF$ is different, then SSS similarity is:', options: ['Valid', 'Invalid', 'Always half-valid', 'A theorem'], correct: 1, explanation: 'All three side ratios must match for SSS.' },
            { question: 'When choosing a similarity criterion, you should prefer:', options: ['The longest method', 'The test supported directly by the given information', 'Only AA', 'Only SSS'], correct: 1, explanation: 'Pick the criterion that fits the available data.' },
            { question: 'If $AB/DE = BC/EF = CA/FD$, then the triangles are similar by:', options: ['AA', 'SSS', 'SAS', 'BPT'], correct: 1, explanation: 'Equal ratios of all three corresponding sides prove SSS similarity.' },
            { question: 'Which condition proves triangles similar by SAS?', options: ['$AB/DE = AC/DF$ and $\\angle A = \\angle D$', '$AB = DE$ and $\\angle B = \\angle E$', '$AB/DE = BC/EF$', '$\\angle A = \\angle D$ only'], correct: 0, explanation: 'SAS requires two proportional sides and the included angle equal.' },
            { question: 'If triangles are proved similar by AA, then their corresponding sides are:', options: ['Equal', 'Perpendicular', 'Proportional', 'Random'], correct: 2, explanation: 'Any valid similarity proof implies proportional corresponding sides.' },
            { question: 'If side ratios are $2:3$, $2:3$, and $3:4$, then SSS similarity is:', options: ['Valid', 'Invalid', 'AA applies', 'SAS applies'], correct: 1, explanation: 'All three side ratios must be equal for SSS.' },
            { question: 'A good way to decide between AA, SSS, and SAS is to check:', options: ['The color of the figure', 'What information is actually given', 'Which theorem is longest', 'Whether the triangle is drawn large'], correct: 1, explanation: 'The right criterion depends on the available data.' }
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
            { question: 'The best first step in a geometry problem using similarity is:', options: ['Multiply everything', 'Prove the triangles are similar', 'Find perimeter', 'Assume answers'], correct: 1, explanation: 'Similarity must be established before using it.' },
            { question: 'If two similar triangles have side ratio $3:7$ and the smaller perimeter is 18, the larger perimeter is:', options: ['24', '36', '42', '54'], correct: 2, explanation: 'Perimeters scale in the same ratio, so $18 \\times 7/3 = 42$.' },
            { question: 'If $\\triangle ABC \\sim \\triangle DEF$ and $BC = 9$, $EF = 15$, then the scale factor from the first to the second is:', options: ['$3:5$', '$5:3$', '$9:15$', '$15:9$'], correct: 0, explanation: '$BC:EF = 9:15 = 3:5$.' },
            { question: 'If the corresponding side of the larger triangle is 28 and the scale factor from smaller to larger is $4$, then the smaller side is:', options: ['6', '7', '8', '14'], correct: 1, explanation: 'The smaller side is $28/4 = 7$.' },
            { question: 'If one pair of corresponding angles is equal and the triangles are already proved similar, then another corresponding angle is found by:', options: ['Guessing', 'Angle equality of similar triangles', 'Pythagoras theorem', 'Area ratio'], correct: 1, explanation: 'All corresponding angles are equal in similar triangles.' },
            { question: 'When solving a similarity problem, the most useful equation after proving similarity is often:', options: ['A ratio of corresponding sides', 'A prime factorization', 'A bar graph', 'A decimal approximation only'], correct: 0, explanation: 'Side-ratio equations are the main tool for finding unknown lengths.' }
        ],
        assessment: [
            { question: 'If $\\triangle ABC \\sim \\triangle DEF$ and $AB/DE = 4/7$, then a side corresponding to 20 becomes:', options: ['35', '28', '16', '80'], correct: 0, explanation: '$4/7 = 20/x$, so $x = 35$.' },
            { question: 'Enlargement by scale factor $s$ changes lengths by:', options: ['$s$', '$s^2$', '$1/s$', 'No change'], correct: 0, explanation: 'Linear measures scale directly by $s$.' },
            { question: 'If side ratio of two similar triangles is $1:3$, area ratio is:', options: ['$1:3$', '$1:6$', '$1:9$', '$3:1$'], correct: 2, explanation: 'Area ratio is the square of the side ratio.' },
            { question: 'A common use of similar triangles with parallel lines is to find:', options: ['Only medians', 'Unknown lengths', 'Prime factors', 'Decimals'], correct: 1, explanation: 'Similarity is frequently used for missing-length problems.' },
            { question: 'If one corresponding angle is $42^\\circ$, the matching angle in the similar triangle is:', options: ['$42^\\circ$', '$48^\\circ$', '$138^\\circ$', '$90^\\circ$'], correct: 0, explanation: 'Corresponding angles remain equal.' },
            { question: 'If two similar triangles have side ratio $5:6$ and the smaller area is $50$, the larger area is:', options: ['$60$', '$72$', '$75$', '$90$'], correct: 1, explanation: 'Area ratio is $25:36$, so larger area is $50 \\times 36/25 = 72$.' },
            { question: 'If a corresponding side increases from 9 to 27, the scale factor is:', options: ['$2$', '$3$', '$9$', '$18$'], correct: 1, explanation: '$27/9 = 3$.' },
            { question: 'After proving similarity, an unknown side is best found by using:', options: ['Area subtraction', 'Corresponding side ratios', 'Prime factors', 'Angle bisectors only'], correct: 1, explanation: 'Corresponding side ratios directly connect known and unknown lengths.' },
            { question: 'If the linear scale factor is $1/2$, then the area scale factor is:', options: ['$1/2$', '$1/4$', '$2$', '$4$'], correct: 1, explanation: 'Area scale factor is the square of the side scale factor.' },
            { question: 'A triangle with sides $6,8,10$ is enlarged by scale factor $1.5$. The longest side becomes:', options: ['$12$', '$15$', '$16$', '$18$'], correct: 1, explanation: '$10 \\times 1.5 = 15$.' }
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
            { question: 'Indirect measurement is useful when the object is:', options: ['Easy to touch', 'Too far or too tall to measure directly', 'Always wooden', 'Always triangular'], correct: 1, explanation: 'Similarity helps when direct measurement is difficult.' },
            { question: 'A 4 m stick casts a 6 m shadow. A building casts a 24 m shadow. Building height is:', options: ['12 m', '14 m', '16 m', '18 m'], correct: 2, explanation: '$4/6 = h/24$, so $h = 16$ m.' },
            { question: 'If a person and a tower cast shadows at the same time, the key reason their triangles are similar is:', options: ['Their shadows are equal', 'Sun rays make equal angles', 'Both are vertical only', 'Both are measured in meters'], correct: 1, explanation: 'The same sun angle produces equal corresponding angles.' },
            { question: 'A 2.5 m object casts a 5 m shadow. Another object casts a 14 m shadow. Its height is:', options: ['5 m', '6 m', '7 m', '8 m'], correct: 2, explanation: '$2.5/5 = h/14$, so $h = 7$ m.' },
            { question: 'If the shadow length triples under the same sun angle, the corresponding height also:', options: ['Triples', 'Halves', 'Stays same', 'Becomes zero'], correct: 0, explanation: 'Corresponding lengths remain proportional in similar triangles.' },
            { question: 'Real-life triangle similarity problems usually begin by identifying:', options: ['Prime numbers', 'The pair of similar triangles', 'Area formulas', 'The longest side only'], correct: 1, explanation: 'Finding the matching pair of triangles is the first essential step.' }
        ],
        assessment: [
            { question: 'A 5 m pole casts a 10 m shadow. A building casts a 50 m shadow. Building height is:', options: ['20 m', '25 m', '30 m', '40 m'], correct: 1, explanation: '$5/10 = h/50$, so $h = 25$ m.' },
            { question: 'In lamp-post shadow problems, the person, shadow tip, and lamp make:', options: ['A circle', 'Similar triangles', 'A rectangle', 'Parallel lines only'], correct: 1, explanation: 'The geometry is modeled by similar triangles.' },
            { question: 'If the scale factor between two measurement triangles is 4, then every matching length becomes:', options: ['One-fourth', '4 times', '16 times', 'Unchanged'], correct: 1, explanation: 'Lengths scale linearly.' },
            { question: 'The main idea behind indirect measurement in this chapter is:', options: ['Congruence', 'Similarity', 'Statistics', 'Probability'], correct: 1, explanation: 'Indirect measurement depends on similar triangles.' },
            { question: 'If the shadow doubles under the same sun angle, the height also:', options: ['Halves', 'Doubles', 'Becomes zero', 'Stays fixed'], correct: 1, explanation: 'Corresponding lengths remain proportional.' },
            { question: 'A 6 m pole casts an 8 m shadow. A tower casts a 24 m shadow. Tower height is:', options: ['12 m', '16 m', '18 m', '20 m'], correct: 2, explanation: '$6/8 = h/24$, so $h = 18$ m.' },
            { question: 'A child 1.2 m tall casts a 0.8 m shadow. A tree casts a 6 m shadow. Tree height is:', options: ['7.2 m', '8.4 m', '9 m', '10.2 m'], correct: 2, explanation: '$1.2/0.8 = h/6$, so $h = 9$ m.' },
            { question: 'The most important matching in a shadow problem is:', options: ['Height with shadow', 'Height with height and shadow with shadow', 'Angle with length', 'Area with perimeter'], correct: 1, explanation: 'Correct correspondence is essential for the ratio to work.' },
            { question: 'If a scale drawing has scale factor $1:200$, then a 3 cm line in the drawing represents:', options: ['300 cm', '600 cm', '900 cm', '1200 cm'], correct: 1, explanation: '$3 \\times 200 = 600$ cm in actual length.' },
            { question: 'Indirect measurement is especially useful because it allows us to:', options: ['Avoid geometry', 'Measure inaccessible distances using proportional reasoning', 'Replace all formulas', 'Ignore units'], correct: 1, explanation: 'That is the practical value of similar triangles in real life.' }
        ]
    }
];

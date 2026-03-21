export const SKILLS = [
    {
        id: 'tangent-basics',
        title: 'Lines and Circles Interaction',
        subtitle: 'Secants and Tangents',
        desc: 'Understand the difference between non-intersecting lines, secants, and tangents.',
        icon: '➖',
        color: '#2563eb',
        learn: {
            title: 'How Lines Meet Circles',
            content: `A line and a circle can interact in three ways:

1. <b>Non-intersecting Line:</b> The line and circle have no common points.
2. <b>Secant:</b> The line intersects the circle at exactly two distinct points.
3. <b>Tangent:</b> The line touches the circle at exactly one point, called the point of contact.

The tangent is a special case of the secant when the two end points of its corresponding chord coincide.`,
            rules: [
                'A tangent touches the circle at exactly ONE point.',
                'A secant cuts the circle at exactly TWO points.',
                'There can be only one tangent at a single point on a circle.'
            ],
            examples: [
                { q: 'Can a line intersect a circle at three points?', a: 'No, a line can intersect a circle at a maximum of two points (as a secant).' },
                { q: 'What is the common point of a tangent and a circle called?', a: 'It is called the point of contact.' }
            ]
        },
        practice: [
            { question: 'A line intersecting a circle in two points is called a:', options: ['Secant', 'Tangent', 'Chord', 'Diameter'], correct: 0, explanation: 'A line that cuts the circle in two distinct points is explicitly defined as a secant.' },
            { question: 'How many common points does a tangent to a circle have with the circle?', options: ['0', '1', '2', 'Infinite'], correct: 1, explanation: 'By definition, a tangent touches a circle at exactly one point, known as the point of contact.' },
            { question: 'A line that does not intersect a circle at all is called:', options: ['Secant', 'Tangent', 'Chord', 'Non-intersecting line'], correct: 3, explanation: 'If there are no common points, the line is simply non-intersecting with respect to the circle.' },
            { question: 'The common point of a tangent to a circle and the circle is called the:', options: ['Center', 'Origin', 'Point of tangency or contact', 'Intersection point'], correct: 2, explanation: 'The unique point where the tangent line and circle meet is the point of contact.' },
            { question: 'A tangent is a special case of a:', options: ['Chord', 'Diameter', 'Secant', 'Radius'], correct: 2, explanation: 'A tangent is a special case of a secant when the two points of intersection move closer and coincide.' },
            { question: 'How many tangents can be drawn to a circle at a single point on it?', options: ['1', '2', '3', 'Infinite'], correct: 0, explanation: 'At any given point on the circumference, exactly one unique tangent line can be drawn.' },
            { question: 'A circle can have parallel tangents at the most:', options: ['1 pair', '2 pairs', '3 pairs', 'Infinite pairs'], correct: 3, explanation: 'Given any direction, you can draw a pair of parallel tangents. So there are infinite pairs overall.' },
            { question: 'If you are given a secant line, how many tangents can be drawn parallel to this secant?', options: ['0', '1', '2', 'Infinite'], correct: 2, explanation: 'For any given line entering the circle, there will be exactly two tangents parallel to it, one on each opposite "side" of the circle.' },
            { question: 'The word "tangent" comes from the Latin word "tangere", which means:', options: ['To cut', 'To touch', 'To divide', 'To parallel'], correct: 1, explanation: 'The Latin root tangere literally translates to "to touch", matching its geographic property.' },
            { question: 'Which of the following is true for a tangent?', options: ['It passes through the center', 'It lies inside the circle', 'It intersects at two points', 'It touches the circle only at one point'], correct: 3, explanation: 'Touching at exactly one point is the primary defining characteristic of a tangent.' }
        ],
        assessment: [
            { question: 'A straight line passing through a point on a circle and containing no other point of the circle is:', options: ['A secant', 'A tangent', 'A chord', 'An arc'], correct: 1, explanation: 'This is the formal definition of a tangent line.' },
            { question: 'The distance between two parallel tangents of a circle of radius $r$ is:', options: ['$r$', '$2r$', '$3r$', '$4r$'], correct: 1, explanation: 'Parallel tangents touch the circle at opposite ends of a diameter, making the distance $2r$.' },
            { question: 'How many secants can be drawn from a point outside the circle?', options: ['1', '2', 'Infinite', 'None'], correct: 2, explanation: 'Any line passing through the circle from an external point (and not tangent) is a secant, and there are infinitely many such lines.' },
            { question: 'If a line is perpendicular to a radius at its outer end, the line is a ___ to the circle.', options: ['Secant', 'Chord', 'Tangent', 'Diameter'], correct: 2, explanation: 'A line perpendicular to the radius at the point on the circle is always a tangent.' },
            { question: 'Can a chord ever be a tangent?', options: ['Yes, always', 'No, never', 'Yes, if it passes through the center', 'Yes, if its length is zero'], correct: 3, explanation: 'A chord length of zero means its two endpoints coincide, which models the point of contact for a tangent.' },
            { question: 'How many tangents can you draw parallel to a given diameter?', options: ['0', '1', '2', 'Infinite'], correct: 2, explanation: 'You can draw exactly two tangents parallel to any given line, including a diameter.' },
            { question: 'A tangent to a circle intersects it in _____ point(s).', options: ['No', 'One', 'Two', 'Many'], correct: 1, explanation: 'A tangent touches the circle exactly once.' },
            { question: 'What do we call a line containing a chord?', options: ['Tangent', 'Diameter', 'Secant', 'Radius'], correct: 2, explanation: 'A chord is a line segment. The extended line that contains the chord is a secant.' },
            { question: 'If the distance of a line from the center is greater than the radius, the line is:', options: ['A Tangent', 'A Secant', 'A Diameter', 'A Non-intersecting line'], correct: 3, explanation: 'Since the distance is greater than the radius, the line completely misses the circle.' },
            { question: 'Which geometric figure bounds a circle perfectly with four tangents?', options: ['Triangle', 'Pentagon', 'Circumscribed Quadrilateral', 'Inscribed Quadrilateral'], correct: 2, explanation: 'A quadrilateral whose 4 sides are tangents circumscribes the circle.' }
        ]
    },
    {
        id: 'tangent-perpendicularity',
        title: 'Tangent Perpendicularity Theorem',
        subtitle: 'Radius Meets Tangent',
        desc: 'Learn the fundamental property that a tangent is perpendicular to the radius at the point of contact.',
        icon: '📐',
        color: '#0d9488',
        learn: {
            title: 'The $90^\\circ$ Rule',
            content: `<b>Theorem 10.1:</b> The tangent at any point of a circle is perpendicular to the radius through the point of contact.

This means if you draw a line from the center of the circle to the point where the tangent touches, the angle formed is exactly $90^\\circ$.

Because the shortest distance from a point to a line is the perpendicular distance, the center is exactly one radius away from the tangent line.`,
            rules: [
                'Radius $\\perp$ Tangent at the point of contact.',
                'This $90^\\circ$ angle makes Pythagoras theorem highly useful.',
                'Any line perpendicular to the radius at its endpoint on the circle is a tangent.'
            ],
            examples: [
                { q: 'In a circle with center O, tangent $XY$ touches at P. What is $\\angle OPX$?', a: '$\\angle OPX = 90^\\circ$ because the radius $OP$ is perpendicular to tangent $XY$.' },
                { q: 'Distance from center to tangent is $5$ cm. What is the radius?', a: 'The perpendicular distance to the tangent IS the radius, so $r = 5$ cm.' }
            ]
        },
        practice: [
            { question: 'The angle between a tangent and the radius at the point of contact is:', options: ['$45^\\circ$', '$60^\\circ$', '$90^\\circ$', '$180^\\circ$'], correct: 2, explanation: 'Theorem 10.1 states that the tangent is perpendicular to the radius.' },
            { question: 'A tangent $PQ$ at a point $P$ of a circle of radius $5$ cm meets a line through the centre $O$ at a point $Q$ so that $OQ = 12$ cm. Length $PQ$ is:', options: ['12 cm', '13 cm', '8.5 cm', '$\\sqrt{119}$ cm'], correct: 3, explanation: '$\\triangle OPQ$ is a right triangle at $P$. So, $PQ^2 = OQ^2 - OP^2 = 144 - 25 = 119$. $PQ = \\sqrt{119}$.' },
            { question: 'If the radius is $3$ cm and the distance from the center to a point $A$ on the tangent is $5$ cm, the length of the tangent segment from $A$ to the point of contact is:', options: ['2 cm', '4 cm', '6 cm', '8 cm'], correct: 1, explanation: 'By Pythagoras theorem, $tangent^2 + 3^2 = 5^2 \Rightarrow tangent^2 = 16 \Rightarrow tangent = 4$ cm.' },
            { question: 'Which theorem is most commonly used right after identifying a tangent and a radius?', options: ['BPT', 'Pythagoras Theorem', 'Area of Circle', 'Midpoint Theorem'], correct: 1, explanation: 'Because the angle is $90^\\circ$, Pythagoras theorem solves for unknown lengths in the resulting right triangle.' },
            { question: 'If a line from the center is not perpendicular to a given line, that given line can NOT be:', options: ['A secant', 'A chord', 'A tangent', 'A diameter'], correct: 2, explanation: 'A line is a tangent ONLY IF it is perpendicular to the radius at the point of intersection.' },
            { question: 'The shortest distance from the center of a circle to a tangent line is equal to:', options: ['The diameter', 'The radius', 'Half the radius', 'Zero'], correct: 1, explanation: 'The perpendicular distance is the shortest distance, which corresponds exactly to the radius.' },
            { question: 'Line $AB$ touches a circle at $C$. Center is $O$. $\\triangle OCB$ is formed. The right angle is at:', options: ['$O$', '$C$', '$B$', 'There is no right angle'], correct: 1, explanation: 'The right angle is formed at the point of contact $C$, so $\\angle OCB = 90^\\circ$.' },
            { question: 'From a point $Q$, the length of the tangent to a circle is $24$ cm and the distance of $Q$ from the centre is $25$ cm. The radius of the circle is:', options: ['7 cm', '12 cm', '15 cm', '24.5 cm'], correct: 0, explanation: '$r^2 + 24^2 = 25^2 \Rightarrow r^2 + 576 = 625 \Rightarrow r^2 = 49 \Rightarrow r = 7$ cm.' },
            { question: 'Why is the radius perpendicular to the tangent? Because:', options: ['The radius is the longest chord', 'The perpendicular distance is the shortest path and touches only once', 'Angles of a triangle add to 180', 'Circles are round'], correct: 1, explanation: 'Any other point on the tangent is outside the circle, meaning the distance is greater than the radius. The shortest distance is perpendicular.' },
            { question: 'If the length of a tangent from a point $A$ at distance $5$ cm from the centre of the circle is $4$ cm, find the radius.', options: ['3 cm', '4 cm', '5 cm', '6 cm'], correct: 0, explanation: 'The radius forms a right triangle. $r^2 + 4^2 = 5^2 \Rightarrow r = 3$ cm.' }
        ],
        assessment: [
            { question: 'A circle has radius $8$ cm. A point $P$ is $17$ cm from the center. Length of tangent from $P$ is:', options: ['9 cm', '15 cm', '16 cm', '25 cm'], correct: 1, explanation: '$8, 15, 17$ form a Pythagorean triplet. $17^2 - 8^2 = 289 - 64 = 225$, so length is 15 cm.' },
            { question: 'If a line makes a $60^\\circ$ angle with the radius at the point of intersection with the circle, the line is:', options: ['A Secant', 'A Tangent', 'A Diameter', 'Not part of the circle'], correct: 0, explanation: 'To be a tangent, the angle MUST be $90^\\circ$. Hence it enters the circle, making it a secant.' },
            { question: 'Two concentric circles have radii $5$ cm and $3$ cm. Find the length of the chord of the larger circle which touches the smaller circle.', options: ['4 cm', '6 cm', '8 cm', '10 cm'], correct: 2, explanation: 'The half-chord is tangent to the inner circle. By Pythagoras, half-chord is $\\sqrt{5^2 - 3^2} = 4$. Total chord = $2 \\times 4 = 8$ cm.' },
            { question: 'What angle is formed by a tangent and the diameter passing through the point of contact?', options: ['$45^\\circ$', '$90^\\circ$', '$180^\\circ$', '$360^\\circ$'], correct: 1, explanation: 'The diameter contains the radius, so it is also perpendicular to the tangent at $90^\\circ$.' },
            { question: 'A tangent $AB$ at a point $A$ of a circle of radius $5$ cm meets a line through the centre $O$ at $B$ such that $OB = 13$ cm. Length $AB$ is:', options: ['12 cm', '13 cm', '14 cm', '15 cm'], correct: 0, explanation: '$AB = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$ cm.' },
            { question: 'The proof of the radius-tangent perpendicularity theorem relies on:', options: ['Triangle congruence', 'Shortest distance property', 'Corresponding angles', 'Areas of circles'], correct: 1, explanation: 'The proof shows every other point on the line is strictly outside the circle, so the point of contact is the shortest distance.' },
            { question: 'If a tangent is drawn, the line connecting the center to any point on the tangent OTHER than the point of contact is:', options: ['Less than the radius', 'Equal to the radius', 'Greater than the radius', 'Half the radius'], correct: 2, explanation: 'Since any other point lies completely outside the circle, the distance is strictly greater than the radius.' },
            { question: 'In right $\\triangle OAB$ formed by radius $OA$, tangent $AB$, and hypotenuse $OB$, the longest side is always:', options: ['$OA$', '$AB$', '$OB$', 'Depends on radius'], correct: 2, explanation: 'The hypotenuse ($OB$) connects the center to the external point and is always the longest side.' },
            { question: 'A tangent drawn at the endpoint of a diameter is parallel to:', options: ['The diameter itself', 'A tangent drawn at the other endpoint of the diameter', 'Any radius', 'The center'], correct: 1, explanation: 'Both tangents are perpendicular to the same diameter, hence they are parallel to each other.' },
            { question: 'If the radius is $r$ and the tangent length from an external point is $t$, the distance $d$ from the center to the point is:', options: ['$d = r + t$', '$d = r^2 + t^2$', '$d = \\sqrt{r^2 + t^2}$', '$d = \\sqrt{t^2 - r^2}$'], correct: 2, explanation: 'Using Pythagoras theorem, $d^2 = r^2 + t^2$ so $d = \\sqrt{r^2 + t^2}$.' }
        ]
    },
    {
        id: 'number-of-tangents',
        title: 'Number of Tangents from a Point',
        subtitle: 'Inside, On, or Outside',
        desc: 'Determine how many tangents can be drawn depending on where a point is located relative to the circle.',
        icon: '📍',
        color: '#f59e0b',
        learn: {
            title: 'Point Locations and Tangents',
            content: `The number of tangents you can draw to a circle from a point depends strictly on its location:

1. <b>Inside the Circle:</b> $0$ tangents. Any line through an internal point will cut the circle at two points (making it a secant).
2. <b>On the Circle:</b> exactly $1$ tangent. The line touches only at that precise point.
3. <b>Outside the Circle:</b> exactly $2$ tangents. You can reach the circle from two different \"sides\".`,
            rules: [
                'Internal point = 0 tangents.',
                'Point on the boundary = 1 tangent.',
                'External point = 2 tangents.'
            ],
            examples: [
                { q: 'How many tangents can pass through the center of a circle?', a: 'Zero. The center is inside the circle, so no tangents can pass through it.' },
                { q: 'Point P is 10 cm from the center of a circle of radius 6 cm. How many tangents can be drawn from P?', a: 'Two. Since $10 > 6$, P is outside the circle.' }
            ]
        },
        practice: [
            { question: 'How many tangents can be drawn from a point inside a circle?', options: ['0', '1', '2', 'Infinite'], correct: 0, explanation: 'Any line through a point inside the circle will eventually cross the boundary twice, making it a secant.' },
            { question: 'How many tangents can be drawn from a point on the circumference of a circle?', options: ['0', '1', '2', 'Infinite'], correct: 1, explanation: 'At a specific point on the circle, there is only one unique direction for a tangent.' },
            { question: 'How many tangents can be drawn from a point outside a circle?', options: ['0', '1', '2', '3'], correct: 2, explanation: 'From an external point, exactly two tangents can be drawn to touch the circle at two distinct points.' },
            { question: 'Point $P$ is at a distance of $5$ cm from the center. Radius is $7$ cm. Number of tangents from $P$?', options: ['0', '1', '2', 'Infinite'], correct: 0, explanation: 'Since $5 < 7$, point $P$ is inside the circle. Hence $0$ tangents.' },
            { question: 'Point $Q$ is exactly on the boundary of a circle of radius $9$ cm. Distance of $Q$ from center = ?', options: ['0 cm', '4.5 cm', '9 cm', '18 cm'], correct: 2, explanation: 'Any point on the boundary is exactly one radius away from the center.' },
            { question: 'Point $R$ is at a distance of $12$ cm from the center. Radius is $10$ cm. Number of tangents from $R$?', options: ['0', '1', '2', 'Infinite'], correct: 2, explanation: 'Since $12 > 10$, $R$ is outside the circle, meaning 2 tangents can be drawn.' },
            { question: 'To draw exactly two tangents from a point to a circle, the point must lie:', options: ['Inside', 'On the boundary', 'Outside', 'At the center'], correct: 2, explanation: 'Only external points allow you to draw exactly two tangents.' },
            { question: 'Can a tangent line cross the inside of the circle?', options: ['Yes', 'No', 'Sometimes', 'If it is a diameter'], correct: 1, explanation: 'By definition, a tangent only touches the boundary. If it goes inside, it becomes a secant.' },
            { question: 'If a point $X$ is the center of the circle, how many tangents can be drawn from it?', options: ['0', '1', '2', 'Infinite'], correct: 0, explanation: 'The center is an internal point, so zero tangents.' },
            { question: 'A student claims they drew $3$ tangents to a circle from a single external point. Are they correct?', options: ['Yes', 'No', 'Only if the circle is large', 'Only if the tangents are parallel'], correct: 1, explanation: 'It is geometrically impossible. Only exactly 2 tangents can be drawn from an external point.' }
        ],
        assessment: [
            { question: 'How many tangents can a circle have in total (not from a single point)?', options: ['1', '2', '4', 'Infinite'], correct: 3, explanation: 'A circle has infinite points on its circumference, and a tangent can be drawn at each point.' },
            { question: 'If a point $P$ is at distance $d$ from the center and radius is $r$, $P$ is outside if:', options: ['$d < r$', '$d = r$', '$d > r$', '$d = 0$'], correct: 2, explanation: 'An external point has a distance greater than the radius.' },
            { question: 'If a point $P$ is at distance $d$ from the center and radius is $r$, $1$ tangent can be drawn if:', options: ['$d < r$', '$d = r$', '$d > r$', '$d = 2r$'], correct: 1, explanation: 'Only points ON the circle ($d=r$) allow exactly 1 tangent.' },
            { question: 'Which combination gives 2 tangents?', options: ['r=5, d=4', 'r=10, d=10', 'r=3, d=8', 'r=7, d=2'], correct: 2, explanation: 'We need $d > r$. Only $8 > 3$ satisfies this.' },
            { question: 'If tangents $PA$ and $PB$ are drawn from external point $P$, the lines $PA$ and $PB$ must:', options: ['Be parallel', 'Intersect at right angles always', 'Intersect at point P', 'Be collinear'], correct: 2, explanation: 'By definition, they are drawn FROM point $P$, so they meet at $P$.' },
            { question: 'Can two tangents from an external point ever be parallel?', options: ['Yes, always', 'No, never', 'Only if distance is infinite', 'Only if radius is zero'], correct: 1, explanation: 'Because they intersect at the external point, they cannot be parallel.' },
            { question: 'A line passes through the center. How many tangents can be parallel to this line?', options: ['0', '1', '2', 'Infinite'], correct: 2, explanation: 'You can draw two parallel tangents on opposite sides of the circle.' },
            { question: 'If point $P$ moves closer to the circle from outside, the angle between the two tangents from $P$:', options: ['Increases', 'Decreases', 'Stays the same', 'Becomes $0^\\circ$'], correct: 0, explanation: 'As the point gets closer, the tangents open up wider, increasing the angle until it reaches $180^\\circ$ on the surface.' },
            { question: 'If point $P$ is infinitely far away, the two tangents from $P$ to the circle are approximately:', options: ['Perpendicular', 'Parallel', 'Collinear', 'Non-intersecting'], correct: 1, explanation: 'As $P$ moves infinitely far, the angle between the tangents approaches $0^\\circ$, making them nearly parallel.' },
            { question: 'Tangents drawn from a point inside the circle:', options: ['Are parallel', 'Do not exist', 'Are perpendicular', 'Intersect at the center'], correct: 1, explanation: 'Tangents from an internal point simply do not exist in Euclidean geometry.' }
        ]
    },
    {
        id: 'lengths-of-tangents',
        title: 'Lengths of Tangents from an External Point',
        title: 'Equal Tangents Theorem',
        subtitle: 'Symmetry in Action',
        desc: 'Master the rule that tangents drawn from the same external point to a circle are equal in length.',
        icon: '⚖️',
        color: '#7c3aed',
        learn: {
            title: 'The Equal Tangents Rule',
            content: `<b>Theorem 10.2:</b> The lengths of tangents drawn from an external point to a circle are equal.

If from an external point $P$, two tangents $PA$ and $PB$ are drawn referencing points of contact $A$ and $B$, then $PA = PB$.

This happens because the two right triangles formed by the center, the external point, and the points of contact are congruent by RHS congruence standard.`,
            rules: [
                'Tangents from the same external point are always equal in length.',
                'The line connecting the external point to the center bisects the angle between the tangents.',
                'This theorem creates isosceles triangles and symmetrical figures.'
            ],
            examples: [
                { q: 'Tangents $PX$ and $PY$ are drawn from $P$. If $PX = 8$ cm, what is $PY$?', a: '$PY = 8$ cm. Tangents from the same point are equal.' },
                { q: 'Why do the tangents have equal length?', a: 'Because triangles $\\triangle OPX$ and $\\triangle OPY$ are congruent (RHS).' }
            ]
        },
        practice: [
            { question: 'The lengths of tangents drawn from an external point to a circle are:', options: ['Unequal', 'Equal', 'Parallel', 'Perpendicular'], correct: 1, explanation: 'Theorem 10.2 states they are always equal.' },
            { question: 'Tangents $TP$ and $TQ$ are drawn from $T$. If $TP = 15$ cm, then $TQ = $', options: ['7.5 cm', '15 cm', '30 cm', '0 cm'], correct: 1, explanation: '$TQ = TP = 15$ cm.' },
            { question: 'Which congruence criterion proves that tangents from an external point are equal?', options: ['SSS', 'SAS', 'ASA', 'RHS'], correct: 3, explanation: 'Right angle (radius $\\perp$ tangent), Hypotenuse (common line to center), Side (equal radii).' },
            { question: 'If $PA$ and $PB$ are tangents from $P$, what kind of triangle is $\\triangle PAB$?', options: ['Equilateral', 'Scalene', 'Isosceles', 'Right-angled'], correct: 2, explanation: 'Since $PA = PB$, the triangle formed by connecting the contact points is isosceles.' },
            { question: 'If tangents $PA$ and $PB$ are drawn and $\\angle PAB = 50^\\circ$, find $\\angle PBA$.', options: ['$40^\\circ$', '$50^\\circ$', '$80^\\circ$', '$90^\\circ$'], correct: 1, explanation: '$\\triangle PAB$ is isosceles with $PA = PB$, so opposite angles are equal: $\\angle PBA = \\angle PAB = 50^\\circ$.' },
            { question: 'Tangents $QA$ and $QB$ are $10$ cm each. A point $P$ on $QA$ is $3$ cm from $A$. Length of $QP$ is:', options: ['3 cm', '7 cm', '10 cm', '13 cm'], correct: 1, explanation: '$QP = QA - PA = 10 - 3 = 7$ cm.' },
            { question: 'If tangents from an external point are equal, it signifies that circles have perfect:', options: ['Rectangularity', 'Linearity', 'Symmetry', 'Parallax'], correct: 2, explanation: 'It shows the radial and reflectional symmetry of a circle.' },
            { question: 'From a point $P$, $10$ cm away from the centre, two tangents are drawn. Radius is $6$ cm. Length of each tangent is:', options: ['6 cm', '8 cm', '10 cm', '14 cm'], correct: 1, explanation: '$Length = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8$ cm.' },
            { question: 'In proving the theorem of equal tangents, the common side for the two right triangles is:', options: ['The radius', 'The tangent', 'The line joining external point to the center', 'The chord spanning contact points'], correct: 2, explanation: 'The line from the center $O$ to external point $P$ serves as the common hypotenuse $OP$.' },
            { question: 'If two tangents form an equilateral triangle with the chord of contact, the angle between the tangents is:', options: ['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$'], correct: 2, explanation: 'In an equilateral triangle, all angles are $60^\\circ$. The angle at the external point is therefore $60^\\circ$.' }
        ],
        assessment: [
            { question: 'A quadrilateral $ABCD$ circumscribes a circle. Which is true?', options: ['$AB+CD=AD+BC$', '$AB+AD=BC+CD$', '$AB=CD$', '$AD=BC$'], correct: 0, explanation: 'Sums of opposite sides are equal because tangents from the four vertices are pairwise equal.' },
            { question: 'If $PA$ and $PB$ are tangents, and $AP=AQ$ where $Q$ is on the circle, then $AQ$ is:', options: ['Equal to PB', 'Half of PB', 'Double of PB', 'Unrelated'], correct: 0, explanation: 'Since $PA = PB$ and $PA = AQ$, then $AQ = PB$.' },
            { question: 'If a polygon circumscribes a circle, its perimeter can be found by summing:', options: ['All the radii', 'Twice the lengths of unique tangents from each vertex', 'The area of the circle', 'The diagonals'], correct: 1, explanation: 'Each vertex provides two equal tangents, so the perimeter is the sum of $2 \\times$ (each unique tangent length).' },
            { question: 'Tangents $DA$ and $DC$ are drawn from $D$. If $DA = 3x - 1$ and $DC = 2x + 4$, find $x$.', options: ['1', '3', '5', '7'], correct: 2, explanation: '$3x - 1 = 2x + 4 \\Rightarrow x = 5$.' },
            { question: 'If $\\triangle ABC$ is an isosceles right triangle and tangents are drawn from its vertices, the tangents from the right angle vertex are:', options: ['Longer than others', 'Equal to each other', 'Zero', 'Undefined'], correct: 1, explanation: 'Regardless of the external shape, tangents from ANY single external point to the same circle are equal to each other.' },
            { question: 'Circle touches all sides of a quadrilateral $PQRS$. $PQ=11, QR=12, RS=8$. Find $PS$.', options: ['5', '6', '7', '8'], correct: 2, explanation: '$PQ + RS = QR + PS \\Rightarrow 11 + 8 = 12 + PS \\Rightarrow 19 = 12 + PS \\Rightarrow PS = 7$.' },
            { question: 'If tangents $PA$ and $PB$ are drawn, the center $O$ lies on the _____ of $\\angle APB$.', options: ['Perpendicular bisector', 'Angle bisector', 'Median', 'Altitude'], correct: 1, explanation: 'The line $OP$ bisects the angle between the two tangents, so $O$ lies on the angle bisector.' },
            { question: 'What is the shape of the quadrilateral $PAOB$ formed by two tangents from $P$ and two radii from $O$?', options: ['Square', 'Rectangle', 'Kite', 'Trapezium'], correct: 2, explanation: 'Adjacent equal sides ($PA=PB$, $OA=OB$) make it a Kite.' },
            { question: 'Is it possible for $PA$ to be $6$ cm and $PB$ to be $5$ cm for tangents to the same circle from $P$?', options: ['Yes', 'No', 'If the circle is an ellipse', 'If $P$ is moving'], correct: 1, explanation: 'No, Theorem 10.2 dictates they MUST be exactly equal.' },
            { question: 'If $TP$ and $TQ$ are the two tangents to a circle with centre $O$ so that $\\angle POQ = 110^\\circ$, then $\\angle PTQ$ is equal to:', options: ['$60^\\circ$', '$70^\\circ$', '$80^\\circ$', '$90^\\circ$'], correct: 1, explanation: 'In quadrilateral $TPOQ$, $\\angle P = \\angle Q = 90^\\circ$. So $\\angle PTQ + \\angle POQ = 180^\\circ \\Rightarrow \\angle PTQ = 180^\\circ - 110^\\circ = 70^\\circ$.' }
        ]
    },
    {
        id: 'angle-properties',
        title: 'Angle Properties of Tangents',
        subtitle: 'The $180^\\circ$ Connection',
        desc: 'Understand the relationship between the angle formed by two tangents and the angle at the center.',
        icon: '📏',
        color: '#ec4899',
        learn: {
            title: 'Supplementary Angles',
            content: `When two tangents are drawn from an external point to a circle, they form a quadrilateral with the two radii drawn to the points of contact.

In this quadrilateral $PAOB$:
1. The angles at the points of contact are always $90^\\circ$.
2. The remaining two angles—the angle between the tangents and the angle between the radii—must sum to $180^\\circ$.

Therefore, <b>the central angle and the external angle are supplementary.</b>`,
            rules: [
                '$\\angle APB + \\angle AOB = 180^\\circ$',
                'The angle between tangents and the central angle are supplementary.',
                'The line $OP$ bisects both $\\angle APB$ and $\\angle AOB$.'
            ],
            examples: [
                { q: 'Angle between tangents is $40^\\circ$. What is the angle between their radii?', a: '$180^\\circ - 40^\\circ = 140^\\circ$.' },
                { q: 'If $\\angle AOB = 120^\\circ$, what is the angle $OPA$?', a: '$\\angle APB = 60^\\circ$. Line $OP$ bisects it, so $\\angle OPA = 30^\\circ$.' }
            ]
        },
        practice: [
            { question: 'The angle between two tangents from an external point and the angle subtended by the line segments joining the points of contact to the center are:', options: ['Complementary', 'Supplementary', 'Equal', 'Reflex'], correct: 1, explanation: 'Because the other two angles are $90^\\circ$ each, these two must add to $180^\\circ$ (Supplementary).' },
            { question: 'If the angle between two tangents is $60^\\circ$, the central angle is:', options: ['$60^\\circ$', '$90^\\circ$', '$120^\\circ$', '$150^\\circ$'], correct: 2, explanation: '$180^\\circ - 60^\\circ = 120^\\circ$.' },
            { question: 'If tangents $PA$ and $PB$ from a point $P$ to a circle with centre $O$ are inclined to each other at angle of $80^\\circ$, then $\\angle POA$ is equal to:', options: ['$50^\\circ$', '$60^\\circ$', '$70^\\circ$', '$80^\\circ$'], correct: 0, explanation: 'Total central angle is $180^\\circ - 80^\\circ = 100^\\circ$. Since $OP$ bisects it, $\\angle POA = 100 / 2 = 50^\\circ$.' },
            { question: 'In quadrilateral $PAOB$ formed by tangents from $P$ and radii from $O$, the sum of all four interior angles is:', options: ['$180^\\circ$', '$270^\\circ$', '$360^\\circ$', '$540^\\circ$'], correct: 2, explanation: 'Like every convex quadrilateral, the sum of interior angles is $360^\\circ$.' },
            { question: 'If the central angle is $90^\\circ$, the angle between the tangents is:', options: ['$45^\\circ$', '$90^\\circ$', '$180^\\circ$', '$0^\\circ$'], correct: 1, explanation: '$180^\\circ - 90^\\circ = 90^\\circ$. The quadrilateral formed is a square.' },
            { question: 'If the tangents from external point $P$ form an equilateral triangle with the chord of contact $AB$, what is $\\angle AOB$?', options: ['$60^\\circ$', '$90^\\circ$', '$120^\\circ$', '$150^\\circ$'], correct: 2, explanation: 'If $\\triangle PAB$ is equilateral, $\\angle P = 60^\\circ$. So $\\angle AOB = 180 - 60 = 120^\\circ$.' },
            { question: 'If $\\angle OPA = 25^\\circ$, what is the total angle between the two tangents?', options: ['$25^\\circ$', '$50^\\circ$', '$90^\\circ$', '$130^\\circ$'], correct: 1, explanation: '$OP$ bisects the angle, so total angle is $25 \\times 2 = 50^\\circ$.' },
            { question: 'Tangents are drawn at the ends of a diameter. What is the angle between them?', options: ['$0^\\circ$ (Parallel)', '$90^\\circ$', '$180^\\circ$', '$360^\\circ$'], correct: 0, explanation: 'The angle is $180 - 180 = 0^\\circ$, which geometrically means the lines are parallel.' },
            { question: 'The line joining the external point to the center of the circle divides the kite $PAOB$ into:', options: ['Two equilateral triangles', 'Two congruent right triangles', 'Four right triangles', 'One rectangle'], correct: 1, explanation: 'The diagonal $OP$ creates two identical right triangles, $\\triangle OAP$ and $\\triangle OBP$.' },
            { question: 'If $\\angle AOB = 180^\\circ$, the tangents at A and B will:', options: ['Meet at 90 degrees', 'Meet at 45 degrees', 'Never meet', 'Meet at the center'], correct: 2, explanation: 'If $\\angle AOB = 180^\\circ$, A and B are ends of a diameter. Tangents at diameter ends are parallel and never meet.' }
        ],
        assessment: [
            { question: 'If $\\angle OAB = 30^\\circ$, where $A$ and $B$ are points of contact, what is the angle between tangents from $P$?', options: ['$30^\\circ$', '$60^\\circ$', '$90^\\circ$', '$120^\\circ$'], correct: 1, explanation: 'In isosceles $\\triangle OAB$, $\\angle AOB = 180 - (30+30) = 120^\\circ$. Top angle is $180 - 120 = 60^\\circ$.' },
            { question: 'The angle between tangents is $180^\\circ$ minus the central angle. This makes them:', options: ['Adjacent', 'Complementary', 'Supplementary', 'Corresponding'], correct: 2, explanation: 'Two angles summing to $180^\\circ$ are supplementary.' },
            { question: 'If two tangents are perpendicular to each other, the shape of quadrilateral $PAOB$ is a:', options: ['Kite', 'Rectangle', 'Rhombus', 'Square'], correct: 3, explanation: 'All angles become $90^\\circ$, and adjacent sides are equal (radii), making it a square.' },
            { question: 'If $\\angle POA = 45^\\circ$, what is the angle between the two tangents?', options: ['$45^\\circ$', '$90^\\circ$', '$135^\\circ$', '$180^\\circ$'], correct: 1, explanation: 'Total central angle = $90^\\circ$. Angle between tangents = $180 - 90 = 90^\\circ$.' },
            { question: 'If tangents $PA$ and $PB$ are drawn to a circle with centre $O$, then $\\angle OPB$ is equal to:', options: ['$\\angle PAB$', '$\\angle OAP$', '$\\angle OPA$', '$\\angle AOB$'], correct: 2, explanation: 'The line $OP$ bisects the angle $APB$, so $\\angle OPB = \\angle OPA$.' },
            { question: 'If $\\triangle PAB$ has angles $40^\\circ, 70^\\circ, 70^\\circ$, what is the central angle $\\angle AOB$?', options: ['$40^\\circ$', '$70^\\circ$', '$110^\\circ$', '$140^\\circ$'], correct: 3, explanation: 'The angle at $P$ is $40^\\circ$. The central angle is $180 - 40 = 140^\\circ$.' },
            { question: 'Which geometric principle proves that $\\angle APB + \\angle AOB = 180^\\circ$?', options: ['Pythagoras Theorem', 'Angle sum property of quadrilaterals', 'BPT', 'Area of a circle'], correct: 1, explanation: 'The sum of angles in quadrilateral $PAOB$ is $360^\\circ$. Two are $90^\\circ$, leaving $180^\\circ$ for the other two.' },
            { question: 'If $\\angle OPA$ is increased, the central angle $\\angle AOB$:', options: ['Increases', 'Decreases', 'Stays the same', 'Becomes $0$'], correct: 1, explanation: 'If the angle at $P$ gets larger, its supplementary angle at $O$ must get smaller.' },
            { question: 'A student says if $\\angle APB = 0^\\circ$, then $\\angle AOB = 180^\\circ$. Is this geometrically valid?', options: ['Yes', 'No', 'Only for small circles', 'Only for large circles'], correct: 0, explanation: 'Yes. An angle of $0^\\circ$ means lines are parallel, which happens when tangents are drawn at the ends of a diameter ($180^\\circ$).' },
            { question: 'What is the sum of angles of $\\triangle PAB$ formed by external point and points of contact?', options: ['$90^\\circ$', '$180^\\circ$', '$360^\\circ$', '$depends$'], correct: 1, explanation: 'It is a triangle, so like all triangles in Euclidean geometry, the internal angles sum to $180^\\circ$.' }
        ]
    },
    {
        id: 'circumscribed-polygons',
        title: 'Circumscribed Polygons',
        subtitle: 'Circles Inside Shapes',
        desc: 'Solve problems where a circle is completely bounded by a polygon whose sides are all tangents.',
        icon: '🛑',
        color: '#3b82f6',
        learn: {
            title: 'Polygons Made of Tangents',
            content: `When a polygon circumscribes a circle, every side of the polygon acts as a tangent to the circle.

Because of the <b>Equal Tangents Theorem</b>, the lengths from each vertex to the two adjacent points of contact are equal.
This creates powerful algebraic relationships, notably for circumscribed quadrilaterals:
<b>Sum of opposite sides are equal!</b>
$AB + CD = AD + BC$`,
            rules: [
                'Every vertex shoots two equal tangents to the circle.',
                'For quadrilaterals: Top + Bottom = Left + Right.',
                'Break sides into two tangent segments to solve complex problems.'
            ],
            examples: [
                { q: 'In circumscribed quad $ABCD$, $AB=5, CD=7, AD=6$. Find $BC$.', a: '$5 + 7 = 6 + BC \\Rightarrow BC = 6$.' },
                { q: 'Why is the sum of opposite sides equal?', a: 'Because they are composed of complementary pairs of equal tangents from the 4 vertices.' }
            ]
        },
        practice: [
            { question: 'If a circle is inscribed in a quadrilateral $ABCD$, then $AB+CD$ equals:', options: ['$AC+BD$', '$AD+BC$', '$AB+BC$', '$CD+DA$'], correct: 1, explanation: 'The property states that sums of opposite sides are equal: $AB + CD = AD + BC$.' },
            { question: 'A circle is inscribed in a triangle $ABC$. $AB, BC, CA$ touch the circle at $P, Q, R$. Does $AP = AR$?', options: ['Yes, always', 'No, never', 'Only if the triangle is equilateral', 'Only if it is a right triangle'], correct: 0, explanation: '$A$ is an external point, so tangents $AP$ and $AR$ are equal.' },
            { question: 'Quadrilateral $PQRS$ circumscribes a circle. $PQ=5, QR=6, RS=7$. Find $PS$.', options: ['4', '5', '6', '8'], correct: 2, explanation: '$PQ+RS = QR+PS \\Rightarrow 5+7 = 6+PS \\Rightarrow 12 = 6+PS \\Rightarrow PS=6$.' },
            { question: 'If a parallelogram circumscribes a circle, what exact shape must it be?', options: ['Rectangle', 'Trapezium', 'Rhombus', 'Kite'], correct: 2, explanation: 'For a parallelogram, $AB=CD$ and $AD=BC$. Since $AB+CD = AD+BC$, $2AB = 2AD \\Rightarrow AB=AD$. All sides are equal, making it a rhombus.' },
            { question: 'If a rectangle circumscribes a circle, it must be a:', options: ['Rhombus', 'Kite', 'Square', 'Trapezium'], correct: 2, explanation: 'A rectangle that is also a rhombus (all sides equal) is a square.' },
            { question: 'The perimeter of $\\triangle ABC$ circumscribing a circle is $30$. If the tangents from $A, B$ are length $5, 6$, find the tangent from $C$.', options: ['2', '4', '6', '8'], correct: 1, explanation: 'Perimeter $= 2(t_a + t_b + t_c) = 30$. $2(5 + 6 + t_c) = 30 \\Rightarrow 22 + 2t_c = 30 \\Rightarrow 2t_c = 8 \\Rightarrow t_c = 4$.' },
            { question: 'A circumscribed regular hexagon has side length $10$. What is the sum of any three alternate sides?', options: ['15', '20', '30', '40'], correct: 2, explanation: 'Since it is regular, all sides are $10$. Three sides $10+10+10 = 30$.' },
            { question: 'The proof that $AB+CD = AD+BC$ relies on breaking the $4$ sides into how many tangent segments?', options: ['4', '6', '8', '10'], correct: 2, explanation: 'Each of the 4 vertices has 2 tangents, making 8 segments in total to rearrange.' },
            { question: 'For a polygon to circumscribe a circle, the circle must:', options: ['Touch exactly one side', 'Pass through all vertices', 'Touch all sides', 'Lie outside the polygon'], correct: 2, explanation: '"Circumscribed" means the polygon encloses the circle and every side is a tangent.' },
            { question: 'If a circle is inscribed in a rhombus of perimeter 40, what is the length of one side?', options: ['5', '10', '20', '40'], correct: 1, explanation: 'All sides of a rhombus are equal. $40 / 4 = 10$.' }
        ],
        assessment: [
            { question: 'Circle touches $BC, CA, AB$ of $\\triangle ABC$ at $D, E, F$. If $AB=10, AC=12, BC=8$. Find $AF$.', options: ['5', '6', '7', '8'], correct: 2, explanation: 'Let $AF=x$. Then $AE=x$. $BF=BD=10-x$. $CE=CD=12-x$. $BC = BD+CD = (10-x)+(12-x) = 8 \\Rightarrow 22-2x = 8 \\Rightarrow 2x=14 \\Rightarrow x=7$.' },
            { question: 'A circumscribed polygon can have an infinite number of sides, which essentially turns it into:', options: ['A line', 'Another circle', 'A square', 'A triangle'], correct: 1, explanation: 'As the number of tangent sides approaches infinity, the shape approximates the circle itself.' },
            { question: 'A quadrilateral $ABCD$ circumscribes a circle. $AB=8, BC=7, CD=6$. Find $AD$.', options: ['5', '6', '7', '8'], correct: 2, explanation: '$AB+CD = AD+BC \\Rightarrow 8+6 = AD+7 \\Rightarrow 14 = AD+7 \\Rightarrow AD=7$.' },
            { question: 'In a triangle $ABC$ circumscribing a circle, the tangents are $x, y, z$. Perimeter equals:', options: ['$x+y+z$', '$2(x+y+z)$', '$xyz$', '$x^2+y^2+z^2$'], correct: 1, explanation: 'Each vertex gives 2 identical tangents, so the perimeter is twice the sum of the three unique tangents.' },
            { question: 'A circumscribed quadrilateral has sides in ratio $1:2:3:4$. Can it be circumscribed?', options: ['Yes', 'No', 'Only if it is a kite', 'Only if it is large'], correct: 1, explanation: 'Opposite sides sum must be equal. $1+3 = 4$, but $2+4 = 6$. So it cannot circumscribe a circle.' },
            { question: 'If opposite sides of a circumscribed quadrilateral are $a$ and $b$, what is the semiperimeter?', options: ['$a+b$', '$2(a+b)$', '$(a+b)/2$', '$a\\times b$'], correct: 0, explanation: 'Perimeter = $(a+b) + (c+d)$. But $a+b = c+d$. So Perimeter = $2(a+b)$. Semiperimeter = $a+b$.' },
            { question: 'If a polygon is circumscribed around a circle, the radius of the circle is perpendicular to:', options: ['The vertices', 'The diagonals', 'All the sides at the points of contact', 'The center'], correct: 2, explanation: 'Because every side is a tangent, the radius to the point of contact is perpendicular to each side.' },
            { question: 'If the semiperimeter of a circumscribed triangle is $s$ and one side is $a$, the tangent segment from the opposite vertex has length:', options: ['$s-a$', '$s$', '$a$', '$s+a$'], correct: 0, explanation: 'By setting up the equations, the tangent length from the angle opposite side $a$ is always $s-a$.' },
            { question: 'Is every rhombus capable of circumscribing a circle?', options: ['Yes', 'No', 'Only squares', 'Only if the angles are $60^\\circ$'], correct: 0, explanation: 'Yes, a circle can always be inscribed in any rhombus since the angle bisectors meet at a single point equidistant from all sides.' },
            { question: 'Quadrilateral $ABCD$ circumscribes a circle with $AB=x, BC=y, CD=z, DA=w$. The fundamental equation is:', options: ['$xy = zw$', '$x+y = z+w$', '$x+z = y+w$', '$x-y = z-w$'], correct: 2, explanation: 'The sums of the opposite sides are equal: $AB+CD = BC+AD$, which means $x+z = y+w$.' }
        ]
    },
    {
        id: 'complex-applications',
        title: 'Applications and Complex Proofs',
        subtitle: 'Putting it all together',
        desc: 'Combine Pythagoras theorem, similar triangles, and tangent rules to solve advanced circle problems.',
        icon: '🔗',
        color: '#10b981',
        learn: {
            title: 'The Master Problem Solver',
            content: `Advanced problems often require combining multiple skills:

1. Draw the radius to the point of contact ($90^\\circ$).
2. Look for external points with equal tangents.
3. Identify right-angled triangles and apply Pythagoras theorem.
4. Check for similar triangles if lengths and ratios are missing.
5. Watch out for supplementary central/external angles.

Drawing a clear diagram is the most important first step.`,
            rules: [
                'Always draw unseen radii to the points of tangency.',
                'Label all equal tangents from external points.',
                'Convert geometry into algebra (using $x$).'
            ],
            examples: [
                { q: 'What is the most common hidden shape in tangent problems?', a: 'Right-angled triangles, allowing the use of Pythagoras.' },
                { q: 'If side lengths are missing, what should you construct?', a: 'Draw radii to contact points to create right angles.' }
            ]
        },
        practice: [
            { question: 'When solving advanced circular geometry, what should usually be drawn first?', options: ['A square', 'Radii to all points of tangency', 'A secant', 'An external circle'], correct: 1, explanation: 'Radii create the crucial $90^\\circ$ angles needed for solving.' },
            { question: 'If a problem involves a radius, a tangent, and a line to the center, which theorem is most likely needed?', options: ['BPT', 'Angle Bisector', 'Pythagoras Theorem', 'Area formula'], correct: 2, explanation: 'These three lines form a right triangle.' },
            { question: 'To prove that tangents from an external point are equal, we use:', options: ['SSS congruence', 'Similarity', 'RHS congruence', 'Volume formulas'], correct: 2, explanation: 'Radii are equal, hypotenuse is common, and there are $90^\\circ$ angles.' },
            { question: 'If two circles touch externally, how many common tangents can be drawn?', options: ['1', '2', '3', '4'], correct: 2, explanation: 'Two direct common tangents on the outside, and one transverse common tangent passing between them.' },
            { question: 'If two circles touch internally, how many common tangents can be drawn?', options: ['1', '2', '3', '0'], correct: 0, explanation: 'They only share one point, so only one tangent line can pass through that shared point of contact.' },
            { question: 'To find the length of a direct common tangent to two circles, you usually construct a:', options: ['Parabola', 'Rectangle and a right triangle', 'Rhombus', 'Equilateral triangle'], correct: 1, explanation: 'Dropping a perpendicular from one center to the other radius creates a rectangle and right triangle.' },
            { question: 'When placing a variable $x$ in circumscribed polygon problems, where is the best place to put it?', options: ['The area', 'The central angle', 'One of the tangent segments from a vertex', 'The diameter'], correct: 2, explanation: 'Setting a tangent segment to $x$ allows you to express the lengths of the rest of the sides algebraically.' },
            { question: 'Two circles intersect at two points. How many common tangents can they have?', options: ['0', '1', '2', '3'], correct: 2, explanation: 'If they intersect, there is no space for a transverse tangent, so only the two outer direct common tangents exist.' },
            { question: 'In complex proofs, the line joining the center to an external point is often used to:', options: ['Calculate area', 'Bisect the angle between tangents', 'Draw a new circle', 'Find the perimeter'], correct: 1, explanation: 'This line serves as the angle bisector and the hypotenuse for the right triangles.' },
            { question: 'If an isosceles triangle circumscribes a circle, the tangent segment from the vertex between the equal sides:', options: ['Is zero', 'Bisects the base', 'Is equal to half the base', 'Cannot be determined'], correct: 1, explanation: 'Due to symmetry, the points of contact on the equal sides mirror each other, inherently bisecting the base.' }
        ],
        assessment: [
            { question: 'If two circles are completely disjoint (do not interact), how many common tangents can be drawn?', options: ['1', '2', '3', '4'], correct: 3, explanation: 'Two direct (outer) and two transverse (crossed) common tangents.' },
            { question: 'Why is Pythagoras theorem so prevalent in circle chapters?', options: ['It was invented for circles', 'Theorem 10.1 establishes fundamental $90^\\circ$ angles', 'Circles have hypotenuses', 'Pi is related to Pythagoras'], correct: 1, explanation: 'The radius being perpendicular to the tangent at the point of contact generates right-angled triangles everywhere.' },
            { question: 'A chord of a larger circle is tangent to a smaller concentric circle. The point of contact:', options: ['Is the end of the chord', 'Trisects the chord', 'Bisects the chord', 'Does not touch the chord'], correct: 2, explanation: 'A perpendicular from the center to a chord bisects the chord. Since it is a tangent to the inner circle, the radius is perpendicular at the contact point.' },
            { question: 'In concentric circles, all chords of the outer circle which touch the inner circle are:', options: ['Unequal', 'Equal in length', 'Parallel to each other', 'Diameters'], correct: 1, explanation: 'Because they are all exactly the same perpendicular distance (inner radius) from the center.' },
            { question: 'If the angle between two tangents is extended to form a triangle bounded by a third tangent, you use:', options: ['Area formulas', 'Perimeter logic with $s-a$', 'Triple integration', 'Only Pythagoras'], correct: 1, explanation: 'This forms a circumscribed triangle where tracking the tangent segments using $x, y, z$ or $s-a$ is essential.' },
            { question: 'In complex diagrams, if you see a kite formed by two radii and two tangents, what is its area?', options: ['Calculated as two triangles ($r \\times t$)', 'Pi $r$ squared', 'Base $\\times$ Height', '$r+t$'], correct: 0, explanation: 'The kite consists of two identical right triangles, each with area $\\frac{1}{2} \\times r \\times t$. Total area = $r \\times t$.' },
            { question: 'If you connect the external point $P$, the center $O$, and the two contact points $A, B$, the points $P, A, O, B$ are:', options: ['Collinear', 'Concyclic', 'Equilateral', 'Parallel'], correct: 1, explanation: 'Since $\\angle A + \\angle B = 90 + 90 = 180^\\circ$, opposite angles sum to $180$, so the quadrilateral is cyclic.' },
            { question: 'If a question specifies "two parallel tangents", the line connecting their points of contact must be:', options: ['A chord', 'A secant', 'A radius', 'A diameter'], correct: 3, explanation: 'Parallel tangents reside perfectly on opposite sides of the circle, connected directly by the diameter.' },
            { question: 'What is the locus of the center of a circle that touches two intersecting lines?', options: ['A parabola', 'A circle', 'The angle bisector of the two lines', 'A perpendicular line'], correct: 2, explanation: 'The center must be equidistant from both tangent lines, placing it squarely on their angle bisector.' },
            { question: 'Success in the Circles chapter mainly requires understanding:', options: ['Complex algebra', 'Only definitions', 'Radius $\\perp$ Tangent & Equal Tangents from external point', 'Graphing on a plane'], correct: 2, explanation: 'These two theorems (10.1 and 10.2) form the absolute foundation for every calculation and proof in this chapter.' }
        ]
    }
];

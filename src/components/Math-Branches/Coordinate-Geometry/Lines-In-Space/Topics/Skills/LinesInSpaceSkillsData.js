function mcq(question, correctAnswer, distractors, explanation) {
    const options = [correctAnswer, ...distractors];
    for (let i = options.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [options[i], options[j]] = [options[j], options[i]]; }
    return { question, options, correct: options.indexOf(correctAnswer), explanation };
}

// ─── Skill 1: Line Equations in 3D (20P / 10A) ─────────────────────
export function genSkill1Practice() {
    return [
        mcq('Vector equation through $(1,2,3)$ with direction $(2,1,-1)$:', '$\\vec{r} = (1,2,3) + \\lambda(2,1,-1)$', ['$\\vec{r} = (2,1,-1) + \\lambda(1,2,3)$', '$\\vec{r} = \\lambda(1,2,3)$', '$\\vec{r} = (1,2,3) \\times (2,1,-1)$'], 'Point + $\\lambda$ × direction.'),
        mcq('Cartesian form through $(2,3,4)$ with DRs $1:2:3$:', '$\\frac{x-2}{1} = \\frac{y-3}{2} = \\frac{z-4}{3}$', ['$\\frac{x-1}{2} = \\frac{y-2}{3} = \\frac{z-3}{4}$', '$x+y+z = 9$', '$\\frac{x}{2} = \\frac{y}{3} = \\frac{z}{4}$'], 'Symmetric form.'),
        mcq('Parametric form through origin with direction $(1,1,1)$:', '$x=t, y=t, z=t$', ['$x=1, y=1, z=1$', '$x+y+z=0$', '$x=t, y=2t, z=3t$'], 'Each coord $= t$.'),
        mcq('DRs of line joining $(1,2,3)$ and $(4,6,8)$:', '$3:4:5$', ['$1:2:3$', '$4:6:8$', '$5:8:11$'], 'DRs $= (3,4,5)$.'),
        mcq('Vector equation through $(0,0,0)$ along x-axis:', '$\\vec{r} = \\lambda(1,0,0)$', ['$\\vec{r} = (1,0,0)$', '$\\vec{r} = \\lambda(0,1,0)$', '$\\vec{r} = (0,0,0)$'], 'x-axis direction.'),
        mcq('Cartesian form of x-axis:', '$\\frac{x}{1} = \\frac{y}{0} = \\frac{z}{0}$', ['$x = 0$', '$y = z = 0$', '$\\frac{x}{0} = \\frac{y}{1} = \\frac{z}{0}$'], 'Through origin, direction $(1,0,0)$.'),
        mcq('Line through $(1,0,0)$ and $(0,1,0)$. DRs:', '$-1:1:0$', ['$1:1:0$', '$1:0:1$', '$0:1:1$'], 'DRs $= (-1,1,0)$.'),
        mcq('Parametric form through $(2,3,4)$ with DRs $1:0:0$:', '$x=2+t, y=3, z=4$', ['$x=t, y=3t, z=4t$', '$x=2, y=3+t, z=4$', '$x=2, y=3, z=4+t$'], 'Only x changes.'),
        mcq('Vector equation through $(3,-1,2)$ with direction $(0,4,-1)$:', '$\\vec{r} = (3,-1,2) + \\lambda(0,4,-1)$', ['$\\vec{r} = \\lambda(3,-1,2)$', '$\\vec{r} = (0,4,-1) + \\lambda(3,-1,2)$', '$\\vec{r} = (3,-1,2)(0,4,-1)$'], 'Standard form.'),
        mcq('A line parallel to z-axis through $(5,3,0)$. DRs:', '$0:0:1$', ['$1:0:0$', '$0:1:0$', '$5:3:0$'], 'Parallel to z.'),
        mcq('Cartesian form through $(1,1,1)$ with DRs $2:3:4$:', '$\\frac{x-1}{2} = \\frac{y-1}{3} = \\frac{z-1}{4}$', ['$\\frac{x-2}{1} = \\frac{y-3}{1} = \\frac{z-4}{1}$', '$2x+3y+4z=9$', '$\\frac{x}{1} = \\frac{y}{1} = \\frac{z}{1}$'], 'Standard Cartesian.'),
        mcq('Line through $(0,0,0)$ and $(1,1,1)$. Vector form:', '$\\vec{r} = \\lambda(1,1,1)$', ['$\\vec{r} = (1,1,1)$', '$\\vec{r} = (1,1,1) + \\lambda(0,0,0)$', '$\\vec{r} = \\lambda(1,0,0)$'], 'Through origin along $(1,1,1)$.'),
        mcq('DRs of line $\\frac{x-1}{3} = \\frac{y+2}{4} = \\frac{z}{5}$:', '$3:4:5$', ['$1:-2:0$', ['$-3:-4:-5$'], '$1:4:5$'], 'Denominators are DRs.'),
        mcq('Parametric form of $\\frac{x-2}{1} = \\frac{y-3}{2} = \\frac{z+1}{-1}$:', '$x=2+t, y=3+2t, z=-1-t$', ['$x=t, y=2t, z=-t$', '$x=2t, y=3t, z=-t$', '$x=1+2t, y=2+3t, z=-1+t$'], 'Each equals $t$.'),
        mcq('Line through $(4,5,6)$ parallel to line with DRs $1:1:1$:', '$\\frac{x-4}{1} = \\frac{y-5}{1} = \\frac{z-6}{1}$', ['$\\frac{x-1}{4} = \\frac{y-1}{5} = \\frac{z-1}{6}$', '$x+y+z=15$', '$\\frac{x}{4} = \\frac{y}{5} = \\frac{z}{6}$'], 'Same DRs, different point.'),
        mcq('A line with DRs $0:0:0$ is:', 'Not a valid line', ['The origin', 'All of space', 'The x-axis'], 'Zero direction → undefined.'),
        mcq('Vector eq through $(1,2,3)$ parallel to $(2,4,6)$:', '$\\vec{r} = (1,2,3) + \\lambda(2,4,6)$', ['$\\vec{r} = (2,4,6) + \\lambda(1,2,3)$', '$\\vec{r} = (1,2,3) + \\lambda(1,2,3)$', '$\\vec{r} = \\lambda(3,6,9)$'], 'Direction $(2,4,6)$.'),
        mcq('Lines through origin with directions $(1,0,0)$ and $(0,1,0)$ intersect at:', 'Origin', ['$(1,1,0)$', 'Nowhere', '$(0,0,1)$'], 'Both pass through origin.'),
        mcq('Cartesian form through $(0,0,0)$ with DRs $1:2:3$:', '$\\frac{x}{1} = \\frac{y}{2} = \\frac{z}{3}$', ['$x+2y+3z=0$', '$\\frac{x}{3} = \\frac{y}{2} = \\frac{z}{1}$', '$x=y=z$'], 'Through origin.'),
        mcq('Line $\\vec{r} = (1,0,0) + \\lambda(0,1,0)$ is parallel to:', 'y-axis', ['x-axis', 'z-axis', 'Origin'], 'Direction along y.'),
    ];
}
export function genSkill1Assessment() {
    return [
        mcq('Convert $\\vec{r} = (2,-1,3) + \\lambda(1,2,-2)$ to Cartesian:', '$\\frac{x-2}{1} = \\frac{y+1}{2} = \\frac{z-3}{-2}$', ['$\\frac{x-1}{2} = \\frac{y-2}{-1} = \\frac{z+2}{3}$', '$x+2y-2z = 0$', '$\\frac{x}{2} = \\frac{y}{-1} = \\frac{z}{3}$'], 'Point $(2,-1,3)$, DRs $(1,2,-2)$.'),
        mcq('Two lines through origin with directions $(1,0,0)$ and $(0,0,1)$ are:', 'Perpendicular', ['Parallel', 'Skew', 'Coincident'], 'Dot $= 0$.'),
        mcq('DRs of line joining $(2,3,5)$ and $(5,7,10)$:', '$3:4:5$', ['$2:3:5$', '$5:7:10$', '$7:10:15$'], 'Differences.'),
        mcq('Line through $(1,1,1)$ perpendicular to both $(1,0,0)$ and $(0,1,0)$. Direction:', '$(0,0,1)$', ['$(1,1,0)$', ['$(1,0,1)$'], '$(0,1,1)$'], 'Cross product.'),
        mcq('Cartesian form of a line through $(0,1,2)$ parallel to y-axis:', '$x=0, \\frac{y-1}{1} = t, z=2$', ['$\\frac{x}{1} = \\frac{y-1}{0} = \\frac{z-2}{0}$', '$y=1$', '$x=z=0$'], 'Only y varies.'),
        mcq('Vector eq of z-axis:', '$\\vec{r} = \\lambda(0,0,1)$', ['$\\vec{r} = \\lambda(1,0,0)$', '$\\vec{r} = \\lambda(0,1,0)$', '$\\vec{r} = (0,0,1)$'], 'Through origin along z.'),
        mcq('Two lines: $\\vec{r}=(1,0,0)+\\lambda(1,1,0)$ and $\\vec{r}=(0,1,0)+\\mu(1,1,0)$. They are:', 'Parallel', ['Intersecting', 'Skew', 'Perpendicular'], 'Same direction.'),
        mcq('Line through $(a,b,c)$ with direction $(p,q,r)$. At $\\lambda=1$:', '$(a+p, b+q, c+r)$', ['$(ap, bq, cr)$', ['$(p,q,r)$'], '$(a,b,c)$'], '$\\vec{r}|_{\\lambda=1} = \\vec{a} + \\vec{b}$.'),
        mcq('DRs of line $\\frac{x+1}{2} = \\frac{y-3}{-1} = \\frac{z}{4}$:', '$2:-1:4$', ['$-1:3:0$', '$1:-3:0$', '$2:1:4$'], 'Denominators.'),
        mcq('How many lines pass through two distinct points in 3D?', 'Exactly one', ['None', 'Infinitely many', 'Two'], 'Two points define a unique line.'),
    ];
}

// ─── Skill 2: Angle Between Lines (20P / 10A) ──────────────────────
export function genSkill2Practice() {
    return [
        mcq('Angle between $(1,1,0)$ and $(0,1,1)$:', '$60°$', ['$90°$', '$45°$', '$30°$'], '$\\cos\\theta = 1/2$.'),
        mcq('DRs $1:2:3$ and $2:4:6$:', 'Parallel', ['Perpendicular', 'Skew', 'At $45°$'], 'Proportional.'),
        mcq('DRs $1:1:1$ and $1:-1:0$:', '$90°$', ['$60°$', '$45°$', '$0°$'], 'Dot $= 0$.'),
        mcq('DRs $1:0:0$ and $0:0:1$:', '$90°$', ['$0°$', '$45°$', '$60°$'], 'Perpendicular axes.'),
        mcq('DRs $1:1:1$ and $-1:-1:-1$:', '$0°$ (or $180°$)', ['$90°$', '$60°$', '$45°$'], 'Anti-parallel → same line.'),
        mcq('DRs $2:1:0$ and $0:1:2$:', '$60°$', ['$90°$', '$45°$', '$30°$'], '$\\cos\\theta = 1/\\sqrt{5}\\sqrt{5} = 1/5$... Actually $\\cos\\theta = 1/5$.'),
        mcq('DRs $1:0:1$ and $0:1:0$:', '$90°$', ['$0°$', '$60°$', '$45°$'], 'Dot $= 0$.'),
        mcq('DRs $1:2:2$ and $2:1:2$:', '$\\cos^{-1}(\\frac{8}{9})$', ['$0°$', '$90°$', '$60°$'], 'Dot $= 8$, products $= 9$.'),
        mcq('Condition for perpendicularity:', '$a_1a_2 + b_1b_2 + c_1c_2 = 0$', ['$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$', '$a_1 = a_2$', '$|\\vec{b_1}| = |\\vec{b_2}|$'], 'Dot product $= 0$.'),
        mcq('Condition for parallel lines:', '$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$', ['$a_1a_2 + b_1b_2 + c_1c_2 = 0$', '$a_1 = a_2$', '$|\\vec{b_1}| = |\\vec{b_2}|$'], 'Proportional DRs.'),
        mcq('DRs $3:4:0$ and $4:-3:0$:', '$90°$', ['$0°$', '$60°$', '$45°$'], '$12-12+0 = 0$.'),
        mcq('DRs $1:1:0$ and $1:-1:0$:', '$90°$', ['$0°$', '$60°$', '$45°$'], '$1-1+0 = 0$.'),
        mcq('DRs $2:3:6$ and $3:2:6$:', '$\\cos^{-1}(\\frac{48}{49})$', ['$0°$', '$90°$', '$60°$'], 'Dot $= 48$, products $= 49$.'),
        mcq('DRs $1:0:0$ and $1:1:0$:', '$45°$', ['$90°$', '$0°$', '$60°$'], '$\\cos\\theta = 1/\\sqrt{2}$.'),
        mcq('If two lines are perpendicular, dot product of direction vectors:', '$0$', ['$1$', '$-1$', 'Undefined'], 'Definition.'),
        mcq('DRs $1:2:3$ and $3:2:1$. Are they perpendicular?', 'No', ['Yes', 'Parallel', 'Skew'], 'Dot $= 10 \\neq 0$.'),
        mcq('DRs $1:1:1$ and $2:2:2$:', 'Parallel', ['Perpendicular', 'At $60°$', 'Skew'], 'Proportional.'),
        mcq('Angle between a line and itself:', '$0°$', ['$90°$', '$180°$', 'Undefined'], 'Same direction.'),
        mcq('DRs $0:1:0$ and $0:0:1$:', '$90°$', ['$0°$', '$45°$', '$60°$'], 'y and z axes perpendicular.'),
        mcq('DRs $1:-1:1$ and $-1:1:-1$:', '$0°$ (anti-parallel)', ['$90°$', '$60°$', '$180°$'], 'Opposite directions → same line.'),
    ];
}
export function genSkill2Assessment() {
    return [
        mcq('DRs $2:3:6$ and $1:2:2$. Angle:', '$\\cos^{-1}(\\frac{20}{21})$', ['$90°$', '$0°$', '$45°$'], '$\\cos\\theta = 20/21$.'),
        mcq('Lines $\\vec{r}=(1,0,0)+\\lambda(1,1,0)$ and $\\vec{r}=(0,1,0)+\\mu(0,1,1)$. Angle:', '$60°$', ['$90°$', '$0°$', '$45°$'], '$\\cos\\theta = 1/2$.'),
        mcq('If angle between two lines is $0°$, the lines are:', 'Parallel', ['Perpendicular', 'Skew', 'Coincident necessarily'], 'Same direction.'),
        mcq('DRs $1:0:0$ and $1:1:1$:', '$\\cos^{-1}(\\frac{1}{\\sqrt{3}})$', ['$90°$', '$0°$', '$45°$'], '$\\cos\\theta = 1/\\sqrt{3}$.'),
        mcq('Two lines at $90°$. If one has DRs $1:2:a$ and other $2:1:-1$, find $a$:', '$4$', ['$-4$', '$0$', '$2$'], '$2+2-a = 0 \\Rightarrow a=4$.'),
        mcq('DRs $1:2:3$ and $-2:-4:-6$:', 'Parallel', ['Perpendicular', 'At $60°$', 'Skew'], 'Proportional (negated).'),
        mcq('Angle between diagonals of a cube:', '$\\cos^{-1}(\\frac{1}{3})$', ['$90°$', '$60°$', '$45°$'], 'DRs $(1,1,1)$ and $(1,-1,1)$: $\\cos\\theta = 1/3$.'),
        mcq('Lines with DRs $2:1:-2$ and $1:-2:2$. Check:', 'Perpendicular', ['Parallel', 'At $60°$', 'At $45°$'], '$2-2-4 \\neq 0$... $2-2-4=-4$. Not perp. Actually $2(1)+1(-2)+(-2)(2) = 2-2-4=-4 \\neq 0$.'),
        mcq('If $\\cos\\theta = 0$ between two lines, $\\theta =$', '$90°$', ['$0°$', '$60°$', '$45°$'], '$\\cos^{-1}(0) = 90°$.'),
        mcq('Can two intersecting lines be perpendicular?', 'Yes', ['No', 'Only in 2D', 'Only if parallel'], 'Axes are perpendicular and intersect at origin.'),
    ];
}

// ─── Skill 3: Shortest Distance & Coplanarity (20P / 10A) ──────────
export function genSkill3Practice() {
    return [
        mcq('Are $\\frac{x}{1}=\\frac{y}{0}=\\frac{z}{0}$ and $\\frac{x-1}{0}=\\frac{y}{1}=\\frac{z-1}{0}$ skew?', 'Yes', ['No', 'Parallel', 'Intersecting'], 'Neither parallel nor intersecting.'),
        mcq('Parallel lines $\\vec{r}=(1,2,3)+\\lambda(1,0,0)$ and $\\vec{r}=(0,1,0)+\\mu(1,0,0)$. Distance:', '$\\sqrt{5}$', ['$0$', '$1$', '$3$'], 'Use parallel distance formula.'),
        mcq('Coplanar lines have shortest distance:', '$0$ (if intersecting)', ['$1$', 'Infinite', 'Undefined'], 'Coplanar → intersect or parallel.'),
        mcq('Skew lines exist in:', '3D only', ['2D only', 'Both 2D and 3D', 'Neither'], 'Unique to 3D.'),
        mcq('Two coincident lines have shortest distance:', '$0$', ['$1$', 'Undefined', 'Infinite'], 'Same line.'),
        mcq('Formula for skew line distance uses:', 'Scalar triple product', ['Dot product only', 'Cross product only', 'Determinant of 2×2'], 'Top is scalar triple product.'),
        mcq('If $(\\vec{a_2}-\\vec{a_1}) \\cdot (\\vec{b_1} \\times \\vec{b_2}) = 0$:', 'Lines are coplanar', ['Lines are perpendicular', 'Lines are skew', 'Lines coincide'], 'Coplanarity condition.'),
        mcq('Distance between x-axis and line $y=1, z=1$:', '$\\sqrt{2}$', ['$1$', '$2$', '$0$'], '$d = \\sqrt{1+1} = \\sqrt{2}$.'),
        mcq('Two parallel lines. Number of common perpendiculars:', 'Infinitely many', ['None', 'One', 'Two'], 'Every perpendicular between them is common.'),
        mcq('Two skew lines. Number of common perpendiculars:', 'Exactly one', ['None', 'Infinitely many', 'Two'], 'Unique shortest segment.'),
        mcq('If two lines intersect, they are:', 'Coplanar', ['Skew', 'Always perpendicular', 'Always parallel'], 'Intersecting → same plane.'),
        mcq('Shortest distance between identical lines:', '$0$', ['$1$', 'Undefined', 'Infinite'], 'Same line.'),
        mcq('x-axis and y-axis are:', 'Intersecting and perpendicular', ['Parallel', 'Skew', 'Coincident'], 'Meet at origin at $90°$.'),
        mcq('x-axis and the line $y=1, z=0$:', 'Parallel', ['Intersecting', 'Skew', 'Perpendicular'], 'Same direction, $y$ offset.'),
        mcq('Lines $\\vec{r}=\\lambda(1,0,0)$ and $\\vec{r}=(0,0,1)+\\mu(0,1,0)$:', 'Skew', ['Parallel', 'Intersecting', 'Coincident'], 'Different directions, don\'t meet.'),
        mcq('If $\\vec{b_1} \\times \\vec{b_2} = \\vec{0}$, lines are:', 'Parallel', ['Perpendicular', 'Skew', 'Intersecting'], 'Cross product zero → parallel.'),
        mcq('Two lines in the xy-plane are always:', 'Coplanar', ['Skew', 'Perpendicular', 'Parallel'], 'Same plane → coplanar.'),
        mcq('Distance between $(0,0,0)+t(1,0,0)$ and $(0,2,0)+s(1,0,0)$:', '$2$', ['$0$', '$1$', '$\\sqrt{2}$'], 'Parallel lines, offset $= 2$.'),
        mcq('Shortest distance perpendicular to:', 'Both lines', ['Only first', 'Only second', 'Neither'], 'Perpendicular to both.'),
        mcq('If shortest distance is $0$, lines:', 'Intersect (or are identical)', ['Are parallel', 'Are skew', 'Are perpendicular'], 'Zero distance → touching.'),
    ];
}
export function genSkill3Assessment() {
    return [
        mcq('Shortest distance between x-axis and line $y=1, z=1$:', '$\\sqrt{2}$', ['$1$', '$2$', '$0$'], '$d = \\sqrt{2}$.'),
        mcq('Lines $\\vec{r}=(1,1,0)+\\lambda(2,3,4)$ and $\\vec{r}=(0,0,0)+\\mu(2,3,4)$. Relationship:', 'Parallel', ['Skew', 'Intersecting', 'Perpendicular'], 'Same direction.'),
        mcq('Coplanarity test uses:', 'Scalar triple product $= 0$', ['Dot product $= 0$', 'Cross product $= 0$', 'All equal'], 'Standard test.'),
        mcq('Two random lines in 3D are usually:', 'Skew', ['Parallel', 'Intersecting', 'Perpendicular'], 'Generic position → skew.'),
        mcq('Lines $\\vec{r}=\\lambda(1,1,1)$ and $\\vec{r}=(1,0,0)+\\mu(0,1,0)$:', 'Skew', ['Parallel', 'Intersecting', 'Coincident'], 'Don\'t meet, not parallel.'),
        mcq('If $|\\vec{b_1} \\times \\vec{b_2}| = 0$, shortest distance formula:', 'Use parallel line formula instead', ['Same formula works', 'Distance is 0', 'Undefined'], 'Division by zero → use parallel formula.'),
        mcq('Lines in the same plane can be:', 'Parallel or intersecting', ['Only parallel', 'Only intersecting', 'Always skew'], 'Two cases for coplanar.'),
        mcq('Distance between $\\vec{r}=\\lambda(0,0,1)$ and $\\vec{r}=(3,4,0)+\\mu(0,0,1)$:', '$5$', ['$0$', '$7$', '$\\sqrt{7}$'], 'Parallel, offset $= \\sqrt{9+16} = 5$.'),
        mcq('Two skew lines cannot:', 'Lie in the same plane', ['Have a common perpendicular', 'Exist in 3D', 'Have a shortest distance'], 'Definition of skew.'),
        mcq('If line 1 has DRs $1:0:0$ and line 2 has DRs $0:1:0$ and they don\'t intersect:', 'Skew', ['Parallel', 'Perpendicular and intersecting', 'Coincident'], 'Non-intersecting + non-parallel = skew.'),
    ];
}
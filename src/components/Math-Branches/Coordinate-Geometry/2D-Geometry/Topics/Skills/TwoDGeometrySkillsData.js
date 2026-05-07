// ─── MCQ Helper ──────────────────────────────────────────────────────
function mcq(question, correctAnswer, distractors, explanation) {
    const options = [correctAnswer, ...distractors];
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return { question, options, correct: options.indexOf(correctAnswer), explanation };
}

// ─── Skill 1: Distance & Midpoint ────────────────────────────────────
export function genSkill1Practice() {
    return [
        mcq('What is the distance between $A(3,4)$ and $B(0,0)$?', '$5$', ['$7$', '$25$', '$\\sqrt{7}$'], '$d = \\sqrt{9+16} = 5$.'),
        mcq('Find the midpoint of $(2, 6)$ and $(8, 2)$.', '$(5, 4)$', ['$(10, 8)$', '$(3, 2)$', '$(6, 4)$'], 'Midpoint $= (5, 4)$.'),
        mcq('The distance between $(1, -2)$ and $(4, 2)$ is:', '$5$', ['$3$', '$7$', '$\\sqrt{7}$'], '$d = \\sqrt{9 + 16} = 5$.'),
        mcq('Which point is equidistant from $(0,0)$ and $(6,0)$?', '$(3, 0)$', ['$(0, 3)$', '$(6, 3)$', '$(2, 0)$'], 'Midpoint $(3,0)$.'),
        mcq('Distance of $(5, 12)$ from the origin:', '$13$', ['$17$', '$7$', '$\\sqrt{17}$'], '$d = \\sqrt{25 + 144} = 13$.'),
        mcq('Midpoint of $(-4, 3)$ and $(6, -1)$:', '$(1, 1)$', ['$(2, 2)$', '$(5, 1)$', '$(-1, 2)$'], 'Midpoint $= (1, 1)$.'),
        mcq('Distance between $(0, 0)$ and $(8, 6)$:', '$10$', ['$14$', '$7$', '$\\sqrt{14}$'], '$d = \\sqrt{64+36} = 10$.'),
        mcq('Midpoint of $(7, 3)$ and $(3, 7)$:', '$(5, 5)$', ['$(4, 4)$', '$(10, 10)$', '$(2, 2)$'], 'Midpoint $= (5, 5)$.'),
        mcq('Distance between $(-1, -1)$ and $(2, 3)$:', '$5$', ['$7$', '$\\sqrt{7}$', '$4$'], '$d = \\sqrt{9+16} = 5$.'),
        mcq('The midpoint of $(0, 0)$ and $(10, 10)$ is:', '$(5, 5)$', ['$(10, 10)$', '$(0, 0)$', '$(10, 5)$'], 'Midpoint $= (5, 5)$.'),
        mcq('Distance of $(-3, -4)$ from origin:', '$5$', ['$7$', '$1$', '$25$'], '$d = \\sqrt{9+16} = 5$.'),
        mcq('Midpoint of $(1, 1)$ and $(5, 9)$:', '$(3, 5)$', ['$(6, 10)$', '$(2, 4)$', '$(4, 8)$'], 'Midpoint $= (3, 5)$.'),
        mcq('Distance between $(2, 3)$ and $(5, 7)$:', '$5$', ['$7$', '$25$', '$\\sqrt{7}$'], '$d = \\sqrt{9+16} = 5$.'),
        mcq('If $A = (1, 2)$ and $B = (7, 10)$, then $AB =$', '$10$', ['$8$', '$6$', '$12$'], '$d = \\sqrt{36+64} = 10$.'),
        mcq('Midpoint of $(-6, 4)$ and $(2, -8)$:', '$(-2, -2)$', ['$(4, 6)$', '$(-4, -4)$', '$(0, 0)$'], 'Midpoint $= (-2, -2)$.'),
        mcq('Distance between $(0, 5)$ and $(12, 0)$:', '$13$', ['$17$', '$7$', '$\\sqrt{7}$'], '$d = \\sqrt{144+25} = 13$.'),
        mcq('Midpoint of $(3, -5)$ and $(-3, 5)$:', '$(0, 0)$', ['$(3, 5)$', '$(-3, -5)$', '$(6, 0)$'], 'Midpoint $= (0, 0)$.'),
        mcq('Distance between $(4, 0)$ and $(0, 3)$:', '$5$', ['$7$', '$4$', '$3$'], '$d = \\sqrt{16+9} = 5$.'),
        mcq('If $P(a,b)$ has distance $5$ from origin and $a=3$, then $b=$', '$\\pm 4$', ['$\\pm 2$', '$\\pm 5$', '$\\pm 3$'], '$9 + b^2 = 25 \\Rightarrow b = \\pm 4$.'),
        mcq('Midpoint of $(10, 0)$ and $(0, 10)$:', '$(5, 5)$', ['$(10, 10)$', '$(0, 0)$', '$(5, 0)$'], 'Midpoint $= (5, 5)$.'),
    ];
}

export function genSkill1Assessment() {
    return [
        mcq('Distance between $(-3, 4)$ and $(5, -2)$:', '$10$', ['$8$', '$\\sqrt{52}$', '$14$'], '$d = \\sqrt{64 + 36} = 10$.'),
        mcq('If $M(2, 3)$ is the midpoint of $A(-1, 1)$ and $B$, find $B$.', '$(5, 5)$', ['$(3, 4)$', '$(1, 2)$', '$(4, 6)$'], '$x=5, y=5$.'),
        mcq('Right angle at origin? $O(0,0)$, $A(3,0)$, $B(0,4)$.', 'Yes, right angle at $O$', ['No', 'At $A$', 'At $B$'], 'Perpendicular axes.'),
        mcq('Distance between $(7, 1)$ and $(-5, -4)$:', '$13$', ['$17$', '$12$', '$\\sqrt{10}$'], '$d = \\sqrt{144+25} = 13$.'),
        mcq('Midpoint of $(-8, 6)$ and $(4, -2)$:', '$(-2, 2)$', ['$(-4, 4)$', '$(2, -2)$', '$(0, 0)$'], 'Midpoint $= (-2, 2)$.'),
        mcq('Point on x-axis equidistant from $(2, 5)$ and $(6, 3)$:', '$(7, 0)$', ['$(4, 0)$', '$(3, 0)$', '$(5, 0)$'], 'Solve $\\sqrt{(x-2)^2+25} = \\sqrt{(x-6)^2+9}$.'),
        mcq('Distance from $(1, 1)$ to $(4, 5)$:', '$5$', ['$7$', '$3$', '$\\sqrt{7}$'], '$d = \\sqrt{9+16} = 5$.'),
        mcq('If midpoint is $(0,0)$ and one end is $(3,-7)$, the other end is:', '$(-3, 7)$', ['$(3, 7)$', '$(-3, -7)$', '$(0, 0)$'], '$x_2 = -3, y_2 = 7$.'),
        mcq('Distance between $(-2, -3)$ and $(4, 5)$:', '$10$', ['$8$', '$6$', '$12$'], '$d = \\sqrt{36+64} = 10$.'),
        mcq('If $d = 5$ between $(1, 2)$ and $(4, k)$, find $k$:', '$6$ or $-2$', ['$3$', '$5$', '$7$'], '$(k-2)^2 = 16 \\Rightarrow k = 6$ or $-2$.'),
    ];
}

// ─── Skill 2: Section Formula & Division ────────────────────────────
export function genSkill2Practice() {
    return [
        mcq('Point dividing $(1, 2)$ and $(4, 5)$ in $2:1$:', '$(3, 4)$', ['$(2, 3)$', '$(5, 6)$', '$(2.5, 3.5)$'], '$P = (3, 4)$.'),
        mcq('Point dividing $(0, 0)$ and $(9, 12)$ in $1:2$:', '$(3, 4)$', ['$(6, 8)$', '$(4.5, 6)$', '$(2, 3)$'], '$P = (3, 4)$.'),
        mcq('$(2, 3)$ divides $(0, 1)$ and $(4, 5)$ in ratio:', '$1:1$', ['$2:1$', '$1:2$', '$3:1$'], 'Midpoint ratio $1:1$.'),
        mcq('Centroid of $(0,0)$, $(6,0)$, $(0,9)$:', '$(2, 3)$', ['$(3, 4.5)$', '$(3, 3)$', '$(2, 4.5)$'], 'Centroid $= (2, 3)$.'),
        mcq('Point dividing $(2, 4)$ and $(8, 10)$ in $1:1$:', '$(5, 7)$', ['$(10, 14)$', '$(3, 5)$', '$(4, 6)$'], 'Midpoint $= (5, 7)$.'),
        mcq('Centroid of $(1, 1)$, $(4, 7)$, $(7, 4)$:', '$(4, 4)$', ['$(12, 12)$', '$(3, 3)$', '$(6, 6)$'], 'Centroid $= (4, 4)$.'),
        mcq('Point dividing $(3, 5)$ and $(9, 11)$ in $2:1$:', '$(7, 9)$', ['$(6, 8)$', '$(5, 7)$', '$(4, 6)$'], '$P = (7, 9)$.'),
        mcq('Centroid of $(-3, 0)$, $(3, 0)$, $(0, 6)$:', '$(0, 2)$', ['$(0, 3)$', '$(1, 2)$', '$(0, 0)$'], 'Centroid $= (0, 2)$.'),
        mcq('Point dividing $(-2, -4)$ and $(6, 8)$ in $3:1$:', '$(4, 5)$', ['$(2, 2)$', '$(3, 4)$', '$(5, 6)$'], '$P = (4, 5)$.'),
        mcq('$(4, 6)$ divides $(0, 0)$ and $(8, 12)$ in ratio:', '$1:1$', ['$2:1$', '$1:2$', '$3:1$'], 'Midpoint ratio.'),
        mcq('Centroid of $(2, 2)$, $(4, 4)$, $(6, 6)$:', '$(4, 4)$', ['$(2, 2)$', '$(6, 6)$', '$(3, 3)$'], 'Centroid $= (4, 4)$.'),
        mcq('Point dividing $(0, 0)$ and $(10, 15)$ in $2:3$:', '$(4, 6)$', ['$(6, 9)$', '$(5, 7.5)$', '$(2, 3)$'], '$P = (4, 6)$.'),
        mcq('What is the ratio if point $(5, 5)$ divides $(0, 0)$ and $(10, 10)$?', '$1:1$', ['$2:1$', '$1:2$', '$3:2$'], 'Midpoint.'),
        mcq('Centroid of $(0, 0)$, $(0, 12)$, $(12, 0)$:', '$(4, 4)$', ['$(6, 6)$', '$(3, 3)$', '$(0, 0)$'], 'Centroid $= (4, 4)$.'),
        mcq('Point dividing $(1, 3)$ and $(7, 9)$ in $1:2$:', '$(3, 5)$', ['$(5, 7)$', '$(4, 6)$', '$(2, 4)$'], '$P = (3, 5)$.'),
        mcq('Centroid of $(-1, -1)$, $(1, 1)$, $(3, 3)$:', '$(1, 1)$', ['$(0, 0)$', '$(2, 2)$', '$(3, 3)$'], 'Centroid $= (1, 1)$.'),
        mcq('External division of $(2, 3)$ and $(5, 9)$ in $2:1$:', '$(8, 15)$', ['$(4, 7)$', '$(3, 5)$', '$(6, 12)$'], 'External $P = (8, 15)$.'),
        mcq('Ratio in which x-axis divides $(1, 2)$ and $(1, -4)$:', '$1:2$', ['$2:1$', '$1:1$', '$3:1$'], 'y-coord: $\\frac{-4k+2}{k+1}=0 \\Rightarrow k=1/2$, ratio $1:2$.'),
        mcq('Centroid of $(5, 0)$, $(0, 5)$, $(0, 0)$:', '$(\\frac{5}{3}, \\frac{5}{3})$', ['$(5, 5)$', '$(2.5, 2.5)$', '$(0, 0)$'], 'Centroid $= (5/3, 5/3)$.'),
        mcq('Point dividing $(0, 0)$ and $(6, 6)$ in $1:5$:', '$(1, 1)$', ['$(3, 3)$', '$(5, 5)$', '$(2, 2)$'], '$P = (1, 1)$.'),
    ];
}

export function genSkill2Assessment() {
    return [
        mcq('y-axis divides $(-2, 5)$ and $(6, -3)$ in ratio:', '$1:3$', ['$3:1$', '$1:1$', '$2:3$'], 'Ratio $= 1:3$.'),
        mcq('Centroid of $(1,1)$, $(2,3)$, $(3,2)$:', '$(2, 2)$', ['$(3, 3)$', '$(1.5, 2)$', '$(2, 3)$'], 'Centroid $= (2, 2)$.'),
        mcq('$P$ divides $A(1,-1)$ and $B(4,5)$ in $2:1$. Find $P$.', '$(3, 3)$', ['$(2, 1)$', '$(3.5, 4)$', '$(2.5, 2)$'], '$P = (3, 3)$.'),
        mcq('Ratio in which $(3, 0)$ divides $(1, -2)$ and $(5, 2)$:', '$1:1$', ['$2:1$', '$1:2$', '$3:1$'], 'Midpoint ratio.'),
        mcq('Centroid of $(0,0)$, $(3, 6)$, $(6, 3)$:', '$(3, 3)$', ['$(9, 9)$', '$(1.5, 1.5)$', '$(4.5, 4.5)$'], 'Centroid $= (3, 3)$.'),
        mcq('Point dividing $(0, 0)$ and $(12, 8)$ in $3:1$:', '$(9, 6)$', ['$(6, 4)$', '$(3, 2)$', '$(4, 3)$'], '$P = (9, 6)$.'),
        mcq('If centroid is $(2, 3)$ and two vertices are $(0, 0)$ and $(3, 6)$, find third:', '$(3, 3)$', ['$(1, 0)$', '$(4, 6)$', '$(6, 9)$'], '$x_3 = 3, y_3 = 3$.'),
        mcq('x-axis divides $(2, -3)$ and $(5, 6)$ in ratio:', '$1:2$', ['$2:1$', '$1:1$', '$3:2$'], '$k = 1/2$, ratio $1:2$.'),
        mcq('Point dividing $(0, 0)$ and $(8, 4)$ in $1:3$:', '$(2, 1)$', ['$(4, 2)$', '$(6, 3)$', '$(1, 0.5)$'], '$P = (2, 1)$.'),
        mcq('$(2, 4)$ divides $(0, 0)$ and $(a, b)$ in $1:2$. Find $(a, b)$.', '$(6, 12)$', ['$(4, 8)$', '$(3, 6)$', '$(1, 2)$'], '$a=6, b=12$.'),
    ];
}

// ─── Skill 3: Area & Collinearity ───────────────────────────────────
export function genSkill3Practice() {
    return [
        mcq('Area of triangle $(0,0)$, $(4,0)$, $(0,3)$:', '$6$', ['$12$', '$7$', '$3.5$'], 'Area $= \\frac{1}{2}|12| = 6$.'),
        mcq('Are $(1, 2)$, $(3, 6)$, $(5, 10)$ collinear?', 'Yes', ['No', 'Cannot determine', 'Only two are'], 'Area $= 0$, collinear.'),
        mcq('Area of $(1,1)$, $(4,1)$, $(4,5)$:', '$6$', ['$12$', '$8$', '$15$'], 'Area $= \\frac{1}{2}(3)(4) = 6$.'),
        mcq('Area is $4$ for $(k, 0)$, $(4, 0)$, $(0, 2)$. Find $k$:', '$0$ or $8$', ['$2$', '$-4$', '$6$'], '$|-2k+8| = 8$.'),
        mcq('Area of $(0,0)$, $(6,0)$, $(3,4)$:', '$12$', ['$24$', '$6$', '$18$'], 'Area $= \\frac{1}{2}|24| = 12$.'),
        mcq('Are $(2, 4)$, $(4, 8)$, $(6, 12)$ collinear?', 'Yes', ['No', 'Cannot determine', 'Only two are'], 'All on $y = 2x$.'),
        mcq('Area of $(-1, -1)$, $(1, 1)$, $(3, -1)$:', '$4$', ['$2$', '$8$', '$6$'], 'Area $= 4$.'),
        mcq('Are $(0, 0)$, $(1, 2)$, $(3, 5)$ collinear?', 'No', ['Yes', 'Cannot determine', 'Only two are'], 'Area $\\neq 0$.'),
        mcq('Area of $(0,0)$, $(5,0)$, $(0,8)$:', '$20$', ['$40$', '$13$', '$10$'], 'Area $= 20$.'),
        mcq('Area of $(1,0)$, $(5,0)$, $(3,6)$:', '$12$', ['$24$', '$6$', '$18$'], 'Base $= 4$, height $= 6$, area $= 12$.'),
        mcq('Are $(1, 1)$, $(2, 3)$, $(4, 7)$ collinear?', 'Yes', ['No', 'Cannot determine', 'Maybe'], 'All on $y = 2x - 1$.'),
        mcq('Area of $(0,0)$, $(3,0)$, $(1.5, 4)$:', '$6$', ['$12$', '$3$', '$8$'], 'Area $= 6$.'),
        mcq('Area of $(2,1)$, $(6,1)$, $(4,5)$:', '$8$', ['$16$', '$4$', '$12$'], 'Base $= 4$, height $= 4$, area $= 8$.'),
        mcq('Are $(0, 0)$, $(2, 2)$, $(5, 5)$ collinear?', 'Yes', ['No', 'Maybe', 'Only two are'], 'All on $y = x$.'),
        mcq('Area of $(0,0)$, $(7,0)$, $(0,6)$:', '$21$', ['$42$', '$13$', '$6.5$'], 'Area $= 21$.'),
        mcq('Area of $(-2, 0)$, $(2, 0)$, $(0, 3)$:', '$6$', ['$12$', '$3$', '$8$'], 'Base $= 4$, height $= 3$, area $= 6$.'),
        mcq('Are $(1, 3)$, $(2, 5)$, $(3, 7)$ collinear?', 'Yes', ['No', 'Maybe', 'Only first two'], 'All on $y = 2x + 1$.'),
        mcq('Area of $(0,0)$, $(10,0)$, $(5,6)$:', '$30$', ['$60$', '$15$', '$20$'], 'Area $= 30$.'),
        mcq('Area of $(1, 2)$, $(3, 4)$, $(5, 2)$:', '$4$', ['$8$', '$2$', '$6$'], 'Area $= 4$.'),
        mcq('Are $(0, 1)$, $(1, 3)$, $(2, 5)$ collinear?', 'Yes', ['No', 'Maybe', 'Cannot determine'], 'All on $y = 2x + 1$.'),
    ];
}

export function genSkill3Assessment() {
    return [
        mcq('Area of quadrilateral $(0,0)$, $(4,0)$, $(4,3)$, $(0,3)$:', '$12$', ['$7$', '$14$', '$24$'], 'Rectangle $4 \\times 3 = 12$.'),
        mcq('For $k$: $(1,1)$, $(k,2)$, $(7,5)$ collinear. Find $k$:', '$3$', ['$5$', '$2$', '$4$'], '$k = 3$.'),
        mcq('Area of $(2, 0)$, $(8, 0)$, $(5, 7)$:', '$21$', ['$42$', '$14$', '$35$'], 'Base $= 6$, height $= 7$, area $= 21$.'),
        mcq('Are $(-1, -2)$, $(1, 0)$, $(3, 2)$ collinear?', 'Yes', ['No', 'Maybe', 'Only two are'], 'All on $y = x - 1$.'),
        mcq('Area of $(-3, 0)$, $(3, 0)$, $(0, 5)$:', '$15$', ['$30$', '$10$', '$8$'], 'Area $= 15$.'),
        mcq('Are $(1, 1)$, $(4, 4)$, $(7, 8)$ collinear?', 'No', ['Yes', 'Maybe', 'Cannot determine'], 'Area $\\neq 0$.'),
        mcq('Area of $(0, 0)$, $(a, 0)$, $(0, b)$ is:', '$\\frac{1}{2}|ab|$', ['$ab$', '$\\frac{ab}{3}$', '$2ab$'], 'Right triangle area $= \\frac{1}{2}ab$.'),
        mcq('For $k$: $(2, 3)$, $(4, k)$, $(6, 7)$ collinear. Find $k$:', '$5$', ['$4$', '$6$', '$3$'], 'Slope consistency: $k = 5$.'),
        mcq('Area of $(1,1)$, $(7,1)$, $(4,9)$:', '$24$', ['$48$', '$12$', '$36$'], 'Base $= 6$, height $= 8$, area $= 24$.'),
        mcq('Area of triangle with all 3 vertices at the same point:', '$0$', ['$1$', 'Undefined', '$\\infty$'], 'Degenerate triangle, area $= 0$.'),
    ];
}
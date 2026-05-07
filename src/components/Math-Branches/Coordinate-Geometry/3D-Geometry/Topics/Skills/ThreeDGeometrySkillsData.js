function mcq(question, correctAnswer, distractors, explanation) {
    const options = [correctAnswer, ...distractors];
    for (let i = options.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [options[i], options[j]] = [options[j], options[i]]; }
    return { question, options, correct: options.indexOf(correctAnswer), explanation };
}

// ─── Skill 1: 3D Distance & Octants (20P / 10A) ─────────────────────
export function genSkill1Practice() {
    return [
        mcq('Distance between $(1,2,3)$ and $(4,6,3)$:', '$5$', ['$7$', '$\\sqrt{29}$', '$3$'], '$d = \\sqrt{9+16+0} = 5$.'),
        mcq('Distance of $(3,4,12)$ from origin:', '$13$', ['$19$', '$\\sqrt{29}$', '$7$'], '$d = \\sqrt{169} = 13$.'),
        mcq('Midpoint of $(2,4,6)$ and $(8,2,10)$:', '$(5, 3, 8)$', ['$(10,6,16)$', '$(3,1,2)$', '$(4,2,5)$'], 'Midpoint $= (5,3,8)$.'),
        mcq('Octant of $(-2, 3, -5)$:', 'Octant VI', ['Octant I', 'Octant III', 'Octant VII'], 'Signs $(-,+,-)$.'),
        mcq('Point on xz-plane has which coordinate zero?', '$y = 0$', ['$x = 0$', '$z = 0$', 'All zero'], 'xz-plane: $y = 0$.'),
        mcq('Distance between $(0,0,0)$ and $(1,2,2)$:', '$3$', ['$5$', '$\\sqrt{5}$', '$2$'], '$d = \\sqrt{1+4+4} = 3$.'),
        mcq('Octant of $(2, -3, 5)$:', 'Octant IV', ['Octant I', 'Octant II', 'Octant V'], 'Signs $(+,-,+)$.'),
        mcq('Distance between $(1,1,1)$ and $(4,5,1)$:', '$5$', ['$3$', '$7$', '$\\sqrt{18}$'], '$d = \\sqrt{9+16+0} = 5$.'),
        mcq('Midpoint of $(0,0,0)$ and $(6,8,10)$:', '$(3,4,5)$', ['$(6,8,10)$', '$(2,3,4)$', '$(1,2,3)$'], 'Midpoint $= (3,4,5)$.'),
        mcq('Distance of $(2,3,6)$ from origin:', '$7$', ['$11$', '$\\sqrt{11}$', '$5$'], '$d = \\sqrt{4+9+36} = 7$.'),
        mcq('Octant of $(-1, -2, -3)$:', 'Octant VII', ['Octant I', 'Octant III', 'Octant V'], 'Signs $(-,-,-)$.'),
        mcq('Point on yz-plane has:', '$x = 0$', ['$y = 0$', '$z = 0$', 'All zero'], 'yz-plane: $x = 0$.'),
        mcq('Distance between $(3,0,0)$ and $(0,4,0)$:', '$5$', ['$7$', '$3$', '$4$'], '$d = \\sqrt{9+16} = 5$.'),
        mcq('Octant of $(1, 1, -1)$:', 'Octant V', ['Octant I', 'Octant III', 'Octant VII'], 'Signs $(+,+,-)$.'),
        mcq('Midpoint of $(-2, 4, 6)$ and $(4, -2, 0)$:', '$(1, 1, 3)$', ['$(-1, 1, 3)$', '$(2, 2, 6)$', '$(3, 1, 3)$'], 'Midpoint $= (1,1,3)$.'),
        mcq('Distance between $(1,0,2)$ and $(3,4,6)$:', '$6$', ['$8$', '$\\sqrt{20}$', '$4$'], '$d = \\sqrt{4+16+16} = 6$.'),
        mcq('Point on xy-plane has:', '$z = 0$', ['$x = 0$', '$y = 0$', 'All zero'], 'xy-plane: $z = 0$.'),
        mcq('Octant of $(-3, -1, 4)$:', 'Octant III', ['Octant I', 'Octant VII', 'Octant V'], 'Signs $(-,-,+)$.'),
        mcq('Distance of $(6,0,8)$ from origin:', '$10$', ['$14$', '$\\sqrt{14}$', '$8$'], '$d = \\sqrt{36+0+64} = 10$.'),
        mcq('Midpoint of $(1,3,5)$ and $(5,7,9)$:', '$(3,5,7)$', ['$(6,10,14)$', '$(2,4,6)$', '$(4,6,8)$'], 'Midpoint $= (3,5,7)$.'),
    ];
}
export function genSkill1Assessment() {
    return [
        mcq('If $P(1,2,3)$, $Q(4,6,z)$ are $\\sqrt{41}$ apart, find $z$:', '$7$ or $-1$', ['$5$', '$3$', '$0$'], '$(z-3)^2 = 16$.'),
        mcq('Centroid of $(0,0,0)$, $(3,6,9)$, $(6,3,0)$:', '$(3, 3, 3)$', ['$(9,9,9)$', '$(1,1,1)$', '$(4.5,4.5,4.5)$'], 'Centroid $= (3,3,3)$.'),
        mcq('Distance between $(2,1,-1)$ and $(5,5,-1)$:', '$5$', ['$7$', '$3$', '$\\sqrt{18}$'], '$d = \\sqrt{9+16+0} = 5$.'),
        mcq('Octant of $(0, -5, 3)$:', 'On boundary (yz-plane)', ['Octant I', 'Octant IV', 'Octant VIII'], '$x=0$ means on yz-plane.'),
        mcq('Distance of $(1, 4, 8)$ from origin:', '$9$', ['$13$', '$\\sqrt{13}$', '$7$'], '$d = \\sqrt{1+16+64} = 9$.'),
        mcq('Midpoint of $(-4,2,8)$ and $(6,-4,2)$:', '$(1,-1,5)$', ['$(2,-2,10)$', '$(1,3,5)$', '$(5,-1,3)$'], 'Midpoint $= (1,-1,5)$.'),
        mcq('Distance between $(0,0,0)$ and $(2,6,9)$:', '$11$', ['$17$', '$\\sqrt{17}$', '$9$'], '$d = \\sqrt{4+36+81} = 11$.'),
        mcq('Octant of $(4, -2, -6)$:', 'Octant VIII', ['Octant I', 'Octant V', 'Octant II'], 'Signs $(+,-,-)$.'),
        mcq('If midpoint is $(2,3,4)$ and one end is $(0,0,0)$, the other is:', '$(4, 6, 8)$', ['$(2,3,4)$', '$(1,1.5,2)$', '$(0,0,0)$'], 'Other end $= (4,6,8)$.'),
        mcq('Distance between $(1,2,3)$ and $(3,2,1)$:', '$2\\sqrt{2}$', ['$4$', '$2$', '$\\sqrt{6}$'], '$d = \\sqrt{4+0+4} = 2\\sqrt{2}$.'),
    ];
}

// ─── Skill 2: Direction Cosines & Ratios (20P / 10A) ────────────────
export function genSkill2Practice() {
    return [
        mcq('DRs $1, 2, 2$. Direction cosines:', '$\\frac{1}{3}, \\frac{2}{3}, \\frac{2}{3}$', ['$1, 2, 2$', '$\\frac{1}{9}, \\frac{4}{9}, \\frac{4}{9}$', '$\\frac{1}{2}, 1, 1$'], 'Magnitude $= 3$.'),
        mcq('$l^2 + m^2 + n^2$ for any line:', '$1$', ['$0$', '$3$', 'Depends'], '$l^2+m^2+n^2 = 1$.'),
        mcq('DRs $1:2:3$ and $2:4:6$ are:', 'Parallel', ['Perpendicular', 'Skew', 'Coincident'], 'Proportional DRs.'),
        mcq('Equal angles with all axes: $l = m = n =$', '$\\frac{1}{\\sqrt{3}}$', ['$\\frac{1}{3}$', '$1$', '$\\frac{1}{2}$'], '$3l^2 = 1$.'),
        mcq('DRs of x-axis:', '$1, 0, 0$', ['$0, 1, 0$', '$0, 0, 1$', '$1, 1, 1$'], 'Along x only.'),
        mcq('DRs $2, 1, 2$. Magnitude:', '$3$', ['$5$', '$\\sqrt{5}$', '$\\sqrt{9}$'], '$\\sqrt{4+1+4} = 3$.'),
        mcq('Lines with DRs $1:1:1$ and $1:-2:1$ are:', 'Perpendicular', ['Parallel', 'Skew', 'At $60°$'], '$1-2+1 = 0$.'),
        mcq('DRs of line joining $(1,2,3)$ and $(3,5,7)$:', '$2:3:4$', ['$1:2:3$', '$3:5:7$', '$4:7:10$'], 'DRs $= (2,3,4)$.'),
        mcq('DRs $3, 4, 0$. Direction cosines $l, m, n$:', '$\\frac{3}{5}, \\frac{4}{5}, 0$', ['$3, 4, 0$', '$\\frac{3}{7}, \\frac{4}{7}, 0$', '$0.6, 0.8, 0.1$'], 'Magnitude $= 5$.'),
        mcq('Two lines with DRs $1:0:1$ and $0:1:0$ are:', 'Perpendicular', ['Parallel', 'At $45°$', 'Skew'], 'Dot product $= 0$.'),
        mcq('DRs of z-axis:', '$0, 0, 1$', ['$1, 0, 0$', '$0, 1, 0$', '$1, 1, 1$'], 'Along z only.'),
        mcq('DRs $1, 1, 0$ give DCs:', '$\\frac{1}{\\sqrt{2}}, \\frac{1}{\\sqrt{2}}, 0$', ['$1, 1, 0$', '$0.5, 0.5, 0$', '$\\frac{1}{2}, \\frac{1}{2}, 0$'], 'Magnitude $= \\sqrt{2}$.'),
        mcq('Line equally inclined to y and z axes, perpendicular to x-axis. DCs:', '$0, \\frac{1}{\\sqrt{2}}, \\frac{1}{\\sqrt{2}}$', ['$1, 0, 0$', '$\\frac{1}{3}, \\frac{1}{3}, \\frac{1}{3}$', '$0, 1, 1$'], '$l=0, m=n=\\frac{1}{\\sqrt{2}}$.'),
        mcq('DRs $6, 2, 3$ have magnitude:', '$7$', ['$11$', '$\\sqrt{11}$', '$5$'], '$\\sqrt{36+4+9} = 7$.'),
        mcq('If DCs are $\\frac{2}{3}, \\frac{1}{3}, \\frac{2}{3}$, then DRs can be:', '$2:1:2$', ['$4:2:4$', '$1:2:1$', '$3:3:3$'], 'Proportional to DCs.'),
        mcq('Lines $1:2:-1$ and $2:-1:1$. Dot product:', '$-1$', ['$0$', '$1$', '$3$'], '$2-2-1 = -1$.'),
        mcq('DRs of y-axis:', '$0, 1, 0$', ['$1, 0, 0$', '$0, 0, 1$', '$1, 1, 1$'], 'Along y only.'),
        mcq('DRs $1, -1, 1$ and $1, 1, -1$. Angle:', '$\\cos^{-1}(-\\frac{1}{3})$', ['$90°$', '$0°$', '$60°$'], 'Dot $= 1-1-1 = -1$, mags $= \\sqrt{3}$.'),
        mcq('If $l = \\frac{1}{2}$ and $m = \\frac{1}{2}$, then $n =$', '$\\pm \\frac{1}{\\sqrt{2}}$', ['$0$', '$\\frac{1}{2}$', '$1$'], '$n^2 = 1 - 1/4 - 1/4 = 1/2$.'),
        mcq('DRs proportional to $4:0:3$. DCs:', '$\\frac{4}{5}, 0, \\frac{3}{5}$', ['$4, 0, 3$', '$0.8, 0.2, 0.6$', '$\\frac{4}{7}, 0, \\frac{3}{7}$'], 'Magnitude $= 5$.'),
    ];
}
export function genSkill2Assessment() {
    return [
        mcq('Angle between DRs $1:0:0$ and $0:1:0$:', '$90°$', ['$0°$', '$45°$', '$60°$'], 'Dot product $= 0$.'),
        mcq('DCs of x-axis:', '$1, 0, 0$', ['$0, 1, 0$', '$0, 0, 1$', '$1, 1, 1$'], '$0°$ with x, $90°$ with y,z.'),
        mcq('DRs $2:3:6$ and $1:2:2$. Angle:', '$\\cos^{-1}(\\frac{20}{21})$', ['$90°$', '$0°$', '$45°$'], 'Dot $= 20$, products $= 21$.'),
        mcq('If DRs are $k:k:k$, the line makes equal angles with:', 'All three axes', ['Only x', 'Only y', 'x and y only'], 'Equal DRs → equal angles.'),
        mcq('DRs $1:1:1$. Direction cosines:', '$\\frac{1}{\\sqrt{3}}, \\frac{1}{\\sqrt{3}}, \\frac{1}{\\sqrt{3}}$', ['$1, 1, 1$', '$\\frac{1}{3}, \\frac{1}{3}, \\frac{1}{3}$', '$0, 0, 0$'], 'Magnitude $= \\sqrt{3}$.'),
        mcq('Lines $1:2:3$ and $3:2:1$. Are they perpendicular?', 'No', ['Yes', 'Parallel', 'Skew'], 'Dot $= 3+4+3 = 10 \\neq 0$.'),
        mcq('If $l = 0$, the line is perpendicular to:', 'x-axis', ['y-axis', 'z-axis', 'Origin'], '$\\cos 90° = 0$.'),
        mcq('DRs $0:1:-1$. Magnitude:', '$\\sqrt{2}$', ['$2$', '$0$', '$1$'], '$\\sqrt{0+1+1} = \\sqrt{2}$.'),
        mcq('Angle between DRs $1:1:0$ and $0:1:1$:', '$60°$', ['$90°$', '$0°$', '$45°$'], '$\\cos\\theta = 1/2$.'),
        mcq('Can $2, 3, 4$ be direction cosines?', 'No', ['Yes', 'Only if normalized', 'Sometimes'], '$4+9+16 = 29 \\neq 1$.'),
    ];
}

// ─── Skill 3: Section Formula & Centroid 3D (20P / 10A) ─────────────
export function genSkill3Practice() {
    return [
        mcq('Divide $(2,4,6)$ and $(8,10,12)$ in $1:2$:', '$(4, 6, 8)$', ['$(5,7,9)$', '$(6,8,10)$', '$(3,5,7)$'], '$P = (4, 6, 8)$.'),
        mcq('yz-plane divides $(2,3,4)$ and $(-6,1,2)$ in:', '$1:3$', ['$3:1$', '$1:1$', '$2:3$'], 'x-coord $= 0$ gives $k = 1/3$.'),
        mcq('Centroid of $(1,2,3)$, $(4,5,6)$, $(7,8,9)$:', '$(4, 5, 6)$', ['$(3,3,3)$', '$(12,15,18)$', '$(6,7,8)$'], 'Centroid $= (4,5,6)$.'),
        mcq('Midpoint of $(0,0,0)$ and $(4,6,8)$:', '$(2, 3, 4)$', ['$(4,6,8)$', '$(1,1.5,2)$', '$(8,12,16)$'], 'Midpoint $= (2,3,4)$.'),
        mcq('Divide $(0,0,0)$ and $(12,9,6)$ in $1:2$:', '$(4, 3, 2)$', ['$(6,4.5,3)$', '$(8,6,4)$', '$(3,2,1)$'], '$P = (4,3,2)$.'),
        mcq('Centroid of $(0,0,0)$, $(6,0,0)$, $(0,6,0)$:', '$(2, 2, 0)$', ['$(3,3,0)$', '$(6,6,0)$', '$(1,1,0)$'], 'Centroid $= (2,2,0)$.'),
        mcq('Divide $(1,1,1)$ and $(7,7,7)$ in $1:1$:', '$(4, 4, 4)$', ['$(8,8,8)$', '$(3,3,3)$', '$(1,1,1)$'], 'Midpoint.'),
        mcq('xy-plane divides $(1,2,3)$ and $(1,2,-9)$ in:', '$1:3$', ['$3:1$', '$1:1$', '$1:9$'], 'z-coord $= 0$ gives $k = 1/3$.'),
        mcq('Centroid of $(3,3,3)$, $(6,6,6)$, $(9,9,9)$:', '$(6, 6, 6)$', ['$(3,3,3)$', '$(9,9,9)$', '$(18,18,18)$'], 'Centroid $= (6,6,6)$.'),
        mcq('Divide $(0,0,0)$ and $(10,0,0)$ in $3:2$:', '$(6, 0, 0)$', ['$(4,0,0)$', '$(5,0,0)$', '$(8,0,0)$'], '$P = (6,0,0)$.'),
        mcq('Centroid of $(1,0,0)$, $(0,1,0)$, $(0,0,1)$:', '$(\\frac{1}{3}, \\frac{1}{3}, \\frac{1}{3})$', ['$(1,1,1)$', '$(0,0,0)$', '$(3,3,3)$'], 'Centroid averages.'),
        mcq('Divide $(2,4,6)$ and $(8,10,12)$ in $2:1$:', '$(6, 8, 10)$', ['$(4,6,8)$', '$(5,7,9)$', '$(3,5,7)$'], '$P = (6,8,10)$.'),
        mcq('xz-plane divides $(3,2,1)$ and $(3,-6,1)$ in:', '$1:3$', ['$3:1$', '$1:1$', '$2:3$'], 'y-coord $= 0$ gives $k = 1/3$.'),
        mcq('Centroid of $(0,0,0)$, $(3,0,0)$, $(0,0,6)$:', '$(1, 0, 2)$', ['$(3,0,6)$', '$(1.5,0,3)$', '$(0,0,0)$'], 'Centroid $= (1,0,2)$.'),
        mcq('Divide $(0,0,0)$ and $(15,10,5)$ in $2:3$:', '$(6, 4, 2)$', ['$(9,6,3)$', '$(3,2,1)$', '$(10,7,3)$'], '$P = (6,4,2)$.'),
        mcq('Centroid of $(-3,-3,-3)$, $(3,3,3)$, $(0,0,0)$:', '$(0, 0, 0)$', ['$(-1,-1,-1)$', '$(1,1,1)$', '$(3,3,3)$'], 'Centroid $= (0,0,0)$.'),
        mcq('Divide $(1,2,3)$ and $(5,6,7)$ in $3:1$:', '$(4, 5, 6)$', ['$(3,4,5)$', '$(2,3,4)$', '$(5,6,7)$'], '$P = (4,5,6)$.'),
        mcq('Centroid of $(2,4,6)$, $(4,6,8)$, $(6,8,10)$:', '$(4, 6, 8)$', ['$(12,18,24)$', '$(2,4,6)$', '$(3,5,7)$'], 'Centroid $= (4,6,8)$.'),
        mcq('Divide $(0,0,0)$ and $(8,8,8)$ in $1:3$:', '$(2, 2, 2)$', ['$(4,4,4)$', '$(6,6,6)$', '$(1,1,1)$'], '$P = (2,2,2)$.'),
        mcq('Centroid of $(10,0,0)$, $(0,10,0)$, $(0,0,10)$:', '$(\\frac{10}{3}, \\frac{10}{3}, \\frac{10}{3})$', ['$(10,10,10)$', '$(5,5,5)$', '$(0,0,0)$'], 'Centroid averages.'),
    ];
}
export function genSkill3Assessment() {
    return [
        mcq('External division $(0,0,0)$ and $(9,12,6)$ in $2:1$:', '$(18, 24, 12)$', ['$(6,8,4)$', '$(3,4,2)$', '$(-9,-12,-6)$'], 'External $P = (18,24,12)$.'),
        mcq('$G(2,4,6)$ is centroid, two vertices $(0,0,0)$ and $(3,6,9)$. Third:', '$(3, 6, 9)$', ['$(1,2,3)$', '$(6,12,18)$', '$(4,8,12)$'], '$x_3=3, y_3=6, z_3=9$.'),
        mcq('Divide $(1,1,1)$ and $(9,9,9)$ in $3:1$:', '$(7, 7, 7)$', ['$(5,5,5)$', '$(3,3,3)$', '$(8,8,8)$'], '$P = (7,7,7)$.'),
        mcq('Centroid of $(0,0,0)$, $(0,0,0)$, $(9,9,9)$:', '$(3, 3, 3)$', ['$(0,0,0)$', '$(9,9,9)$', '$(4.5,4.5,4.5)$'], 'Centroid $= (3,3,3)$.'),
        mcq('yz-plane divides $(4,1,2)$ and $(-8,3,6)$ in:', '$1:2$', ['$2:1$', '$1:1$', '$3:1$'], 'x-coord zero: $k=1/2$.'),
        mcq('Divide $(0,6,0)$ and $(6,0,6)$ in $1:1$:', '$(3, 3, 3)$', ['$(6,6,6)$', '$(0,0,0)$', '$(3,3,0)$'], 'Midpoint.'),
        mcq('If centroid is $(1,1,1)$ and two vertices $(0,0,0)$ and $(0,0,3)$, third vertex:', '$(3, 3, 0)$', ['$(1,1,-1)$', '$(2,2,1)$', '$(0,0,0)$'], '$x_3=3, y_3=3, z_3=0$.'),
        mcq('Divide $(2,0,4)$ and $(8,6,10)$ in $1:2$:', '$(4, 2, 6)$', ['$(6,4,8)$', '$(5,3,7)$', '$(3,1,5)$'], '$P = (4,2,6)$.'),
        mcq('Centroid of $(a,0,0)$, $(0,a,0)$, $(0,0,a)$:', '$(\\frac{a}{3}, \\frac{a}{3}, \\frac{a}{3})$', ['$(a,a,a)$', '$(0,0,0)$', '$(\\frac{a}{2}, \\frac{a}{2}, \\frac{a}{2})$'], 'Centroid averages.'),
        mcq('Divide $(3,6,9)$ and $(9,12,15)$ in $2:1$:', '$(7, 10, 13)$', ['$(6,9,12)$', '$(5,8,11)$', '$(4,7,10)$'], '$P = (7,10,13)$.'),
    ];
}
function mcq(question, correctAnswer, distractors, explanation) {
    const options = [correctAnswer, ...distractors];
    for (let i = options.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [options[i], options[j]] = [options[j], options[i]]; }
    return { question, options, correct: options.indexOf(correctAnswer), explanation };
}

// ─── Skill 1: Straight Lines & Slopes (20P / 10A) ─────────────────────
export function genSkill1Practice() {
    return [
        mcq('Slope of line joining $(1,2)$ and $(5,10)$:', '$2$', ['$4$', '$\\frac{1}{2}$', '$8$'], 'Slope $= \\frac{10-2}{5-1} = 2$.'),
        mcq('Line with slope $3$ and y-intercept $-2$:', '$y = 3x - 2$', ['$y = -2x + 3$', '$y = 3x + 2$', '$3x + y = 2$'], 'Slope-intercept form.'),
        mcq('Two lines have slopes $2$ and $-\\frac{1}{2}$. They are:', 'Perpendicular', ['Parallel', 'Coincident', 'Skew'], 'Product is $-1$.'),
        mcq('Equation through $(2,3)$ with slope $4$:', '$y = 4x - 5$', ['$y = 4x + 3$', '$y = 2x + 3$', '$y = 4x - 11$'], '$y - 3 = 4(x - 2)$.'),
        mcq('x-intercept of $3x + 4y = 12$:', '$(4, 0)$', ['$(0, 3)$', '$(3, 0)$', '$(0, 4)$'], 'Set $y=0$.'),
        mcq('y-intercept of $5x - 2y = 10$:', '$(0, -5)$', ['$(2, 0)$', '$(0, 5)$', '$(0, 2)$'], 'Set $x=0$.'),
        mcq('Slope of $2x + 3y = 6$:', '$-\\frac{2}{3}$', ['$\\frac{2}{3}$', '$\\frac{3}{2}$', '$-\\frac{3}{2}$'], '$3y = -2x + 6$.'),
        mcq('Line parallel to $y = 4x + 1$ passing through $(0,0)$:', '$y = 4x$', ['$y = -\\frac{1}{4}x$', '$y = x + 4$', '$y = -4x$'], 'Same slope.'),
        mcq('Line perpendicular to $y = 2x$ passing through $(0,0)$:', '$y = -\\frac{1}{2}x$', ['$y = 2x$', '$y = \\frac{1}{2}x$', '$y = -2x$'], 'Negative reciprocal slope.'),
        mcq('Slope between $(-1, -1)$ and $(3, 7)$:', '$2$', ['$1$', '$4$', '$\\frac{1}{2}$'], '$\\frac{7-(-1)}{3-(-1)} = \\frac{8}{4} = 2$.'),
        mcq('Line through $(1, 1)$ and $(2, 2)$:', '$y = x$', ['$y = x + 1$', '$y = 2x$', '$y = -x$'], 'Slope $= 1$, y-intercept $= 0$.'),
        mcq('Slope of horizontal line:', '$0$', ['Undefined', '$1$', '$-1$'], 'No vertical change.'),
        mcq('Slope of vertical line:', 'Undefined', ['$0$', '$1$', '$\\infty$'], 'Division by zero.'),
        mcq('y-intercept of $x = 5$:', 'None', ['$(0, 5)$', '$(5, 0)$', '$(0, 0)$'], 'Vertical line does not cross y-axis.'),
        mcq('Line with $m=0$ through $(2, 4)$:', '$y = 4$', ['$x = 2$', '$y = 2$', '$x = 4$'], 'Horizontal line.'),
        mcq('Line through $(0, 5)$ with slope $-1$:', '$y = -x + 5$', ['$y = x + 5$', '$y = 5x - 1$', '$y = -5x + 1$'], 'Slope-intercept.'),
        mcq('Slope of line connecting $(a, b)$ and $(a, c)$:', 'Undefined', ['$0$', '$\\frac{c-b}{a}$', '$1$'], 'Same x-coordinates.'),
        mcq('Line $y = 5x - 3$. What is $m + c$?', '$2$', ['$8$', '$-2$', '$5$'], '$5 + (-3) = 2$.'),
        mcq('Are $y = 3x$ and $6x - 2y = 0$ the same line?', 'Yes', ['No', 'Parallel, not same', 'Perpendicular'], 'Rearrange second to $y=3x$.'),
        mcq('Equation of x-axis:', '$y = 0$', ['$x = 0$', '$y = x$', '$y = 1$'], 'All points on x-axis have $y=0$.'),
    ];
}
export function genSkill1Assessment() {
    return [
        mcq('Lines $y = 2x + 1$ and $y = 2x - 3$ are:', 'Parallel', ['Perpendicular', 'Intersecting', 'Coincident'], 'Same slope.'),
        mcq('Line through $(3, 4)$ parallel to x-axis:', '$y = 4$', ['$x = 3$', '$y = 3$', '$x = 4$'], 'Horizontal line.'),
        mcq('Distance between parallel lines $y = 2x$ and $y = 2x + 5$:', '$\\sqrt{5}$', ['$5$', '$2.5$', '$\\frac{5}{2}$'], '$d = \\frac{|5-0|}{\\sqrt{2^2+1^2}} = \\frac{5}{\\sqrt{5}} = \\sqrt{5}$.'),
        mcq('Find $k$ if $2x + ky = 5$ is parallel to $y = 4x$:', '$k = -\\frac{1}{2}$', ['$k = 4$', '$k = -2$', '$k = \\frac{1}{2}$'], 'Slope $-2/k = 4$.'),
        mcq('Equation of perpendicular bisector of $(0,0)$ and $(4,0)$:', '$x = 2$', ['$y = 2$', '$x = 0$', '$y = 0$'], 'Midpoint $(2,0)$, slope undefined.'),
        mcq('Angle between $y = x$ and x-axis:', '$45°$', ['$90°$', '$30°$', '$60°$'], '$\\tan\\theta = 1$.'),
        mcq('Line making $135°$ with positive x-axis has slope:', '$-1$', ['$1$', '$0$', 'Undefined'], '$\\tan(135°) = -1$.'),
        mcq('Reflection of line $y = x$ across y-axis:', '$y = -x$', ['$y = x$', '$x = 0$', '$y = 0$'], 'Slope negates.'),
        mcq('Intersection of $y = 2x$ and $y = x + 1$:', '$(1, 2)$', ['$(2, 1)$', '$(1, 1)$', '$(0, 0)$'], 'Solve $2x = x+1$.'),
        mcq('Equation of y-axis:', '$x = 0$', ['$y = 0$', '$y = x$', '$x = 1$'], 'All points have $x=0$.'),
    ];
}

// ─── Skill 2: Circles & Curves (20P / 10A) ──────────────────────────
export function genSkill2Practice() {
    return [
        mcq('Does $(3,4)$ lie inside $x^2 + y^2 = 25$?', 'On the circle', ['Inside', 'Outside', 'Cannot determine'], '$3^2 + 4^2 = 25$.'),
        mcq('Centre and radius of $(x-2)^2 + (y+3)^2 = 16$:', 'Centre $(2,-3)$, radius $4$', ['Centre $(-2,3)$, radius $4$', 'Centre $(2,-3)$, radius $16$', 'Centre $(2,3)$, radius $4$'], '$h=2, k=-3, r=4$.'),
        mcq('Common tangents for two non-overlapping external circles:', '$4$', ['$0$', '$1$', '$2$'], '2 direct, 2 transverse.'),
        mcq('Equation of circle with centre $(0,0)$ and radius $5$:', '$x^2 + y^2 = 25$', ['$x^2 + y^2 = 5$', '$(x-5)^2 + y^2 = 0$', '$x+y=25$'], 'Standard form.'),
        mcq('Does $(0,0)$ lie inside $(x-3)^2 + (y-4)^2 = 36$?', 'Inside', ['On the circle', 'Outside', 'Centre'], '$9+16 = 25 < 36$.'),
        mcq('Radius of $x^2 + y^2 - 4x - 6y - 12 = 0$:', '$5$', ['$25$', '$12$', '$\\sqrt{12}$'], 'Complete square: $(x-2)^2 + (y-3)^2 = 12+4+9=25$.'),
        mcq('Centre of $x^2 + y^2 + 8x - 2y = 0$:', '$(-4, 1)$', ['$(4, -1)$', '$(8, -2)$', '$(-8, 2)$'], 'Divide linear coeffs by $-2$.'),
        mcq('Circle with endpoints of diameter at $(0,0)$ and $(6,8)$ has centre:', '$(3, 4)$', ['$(6, 8)$', '$(0, 0)$', '$(1.5, 2)$'], 'Midpoint.'),
        mcq('Radius of circle with diameter ends $(0,0)$, $(6,8)$:', '$5$', ['$10$', '$25$', '$100$'], 'Diameter $= 10$, radius $= 5$.'),
        mcq('Equation of circle centre $(1,1)$, radius $1$:', '$(x-1)^2 + (y-1)^2 = 1$', ['$x^2 + y^2 = 1$', '$(x+1)^2 + (y+1)^2 = 1$', '$(x-1)^2 + (y-1)^2 = 2$'], 'Standard form.'),
        mcq('Tangents from an external point to a circle are:', 'Equal in length', ['Unequal', 'Parallel', 'Perpendicular'], 'Geometry theorem.'),
        mcq('Line $y = x$ intersects $x^2 + y^2 = 2$ at:', '$(1,1)$ and $(-1,-1)$', ['$(1,1)$ only', '$(0,0)$', '$(2,2)$ and $(-2,-2)$'], 'Substitute $y=x$.'),
        mcq('Area of circle $x^2 + y^2 = 9$:', '$9\\pi$', ['$3\\pi$', '$81\\pi$', '$6\\pi$'], 'Radius $= 3$.'),
        mcq('Circumference of $x^2 + y^2 = 16$:', '$8\\pi$', ['$16\\pi$', '$4\\pi$', '$32\\pi$'], 'Radius $= 4$.'),
        mcq('Does $(5,5)$ lie on $x^2 + y^2 = 50$?', 'Yes', ['No', 'Inside', 'Outside'], '$25+25 = 50$.'),
        mcq('If $x^2 + y^2 = 0$, the graph is:', 'A single point $(0,0)$', ['Empty set', 'A line', 'A circle of radius 1'], 'Only $(0,0)$ works.'),
        mcq('Equation of circle tangent to both axes with radius $2$ (Q1):', '$(x-2)^2 + (y-2)^2 = 4$', ['$x^2 + y^2 = 4$', '$(x-2)^2 + (y-2)^2 = 2$', '$(x+2)^2 + (y+2)^2 = 4$'], 'Centre $(2,2)$.'),
        mcq('Circle passing through $(0,0)$, $(4,0)$, $(0,3)$ has diameter:', '$5$', ['$3$', '$4$', '$7$'], 'Right triangle hypotenuse.'),
        mcq('Radius of circle $(x+5)^2 + y^2 = 49$:', '$7$', ['$49$', '$-7$', '$5$'], '$\\sqrt{49} = 7$.'),
        mcq('Number of common tangents if two circles touch externally:', '$3$', ['$2$', '$4$', '$1$'], '2 direct, 1 common at point of contact.'),
    ];
}
export function genSkill2Assessment() {
    return [
        mcq('Find equation of circle centre $(1,1)$ passing through $(4,5)$:', '$(x-1)^2 + (y-1)^2 = 25$', ['$x^2 + y^2 = 25$', '$(x-1)^2 + (y-1)^2 = 5$', '$(x-4)^2 + (y-5)^2 = 25$'], 'Radius $= 5$.'),
        mcq('Length of tangent from $(5,0)$ to $x^2 + y^2 = 9$:', '$4$', ['$5$', '$3$', '$16$'], '$\\sqrt{5^2 - 3^2} = \\sqrt{16} = 4$.'),
        mcq('Circle $x^2 + y^2 - 2x - 4y + k = 0$ touches x-axis. Find $k$:', '$1$', ['$4$', '$0$', '$-1$'], 'Centre $(1,2)$, radius must be 2, so $1^2+2^2-k = 4 \\Rightarrow k=1$.'),
        mcq('Distance between centres of $x^2+y^2=1$ and $(x-3)^2+(y-4)^2=4$:', '$5$', ['$3$', '$4$', '$25$'], 'Centres $(0,0)$ and $(3,4)$.'),
        mcq('Two circles are concentric. How many common tangents?', '$0$', ['$1$', '$2$', '$4$'], 'One is inside the other.'),
        mcq('Equation of tangent to $x^2+y^2=25$ at $(3,4)$:', '$3x + 4y = 25$', ['$4x + 3y = 25$', '$3x - 4y = 25$', '$x + y = 7$'], '$xx_1 + yy_1 = r^2$.'),
        mcq('Are circles $x^2+y^2=1$ and $(x-5)^2+y^2=16$ touching?', 'Yes, externally', ['No, disjoint', 'Yes, internally', 'Intersect at 2 points'], 'Distance $= 5$, $r_1+r_2 = 1+4=5$.'),
        mcq('Area enclosed by $(x-1)^2 + (y+2)^2 = 100$:', '$100\\pi$', ['$10\\pi$', '$20\\pi$', '$1000\\pi$'], '$r^2 = 100$.'),
        mcq('Centre of circle passing through $(0,0)$, $(a,0)$, $(0,b)$:', '$(\\frac{a}{2}, \\frac{b}{2})$', ['$(a,b)$', '$(0,0)$', '$(\\frac{a}{3}, \\frac{b}{3})$'], 'Right triangle.'),
        mcq('Intersection of $x^2+y^2=4$ and $y=3$:', 'Empty', ['$(0,3)$', '$(1,3)$', '$(-1,3)$'], 'Line is above circle (radius 2).'),
    ];
}

// ─── Skill 3: Transformations & Area (20P / 10A) ────────────────────
export function genSkill3Practice() {
    return [
        mcq('Area of triangle $(0,0)$, $(5,0)$, $(0,8)$:', '$20$', ['$13$', '$40$', '$6.5$'], 'Area $= \\frac{1}{2} \\times 5 \\times 8 = 20$.'),
        mcq('Reflect $(4, -2)$ across y-axis:', '$(-4, -2)$', ['$(4, 2)$', '$(-4, 2)$', '$(2, -4)$'], 'x negates.'),
        mcq('Translate $(3,5)$ by $(2,-3)$:', '$(5, 2)$', ['$(1, 8)$', '$(6, 2)$', '$(3, 5)$'], 'Add vectors.'),
        mcq('Perimeter of $(0,0)$, $(3,0)$, $(0,4)$:', '$12$', ['$7$', '$5$', '$24$'], '$3+4+5=12$.'),
        mcq('Reflect $(1, 5)$ across x-axis:', '$(1, -5)$', ['$(-1, 5)$', '$(-1, -5)$', '$(5, 1)$'], 'y negates.'),
        mcq('Rotate $(1,0)$ $90°$ CCW:', '$(0, 1)$', ['$(-1, 0)$', '$(0, -1)$', '$(1, 1)$'], '$(x,y) \\to (-y,x)$.'),
        mcq('Reflect $(3, 2)$ across $y = x$:', '$(2, 3)$', ['$(-3, -2)$', '$(-2, -3)$', '$(3, 2)$'], 'Swap x and y.'),
        mcq('Translate $(0,0)$ by $(a,b)$:', '$(a, b)$', ['$(0, 0)$', '$(-a, -b)$', '$(a+b, 0)$'], 'Origin moves to $(a,b)$.'),
        mcq('Dilate $(2, 3)$ from origin by factor $2$:', '$(4, 6)$', ['$(2, 3)$', '$(1, 1.5)$', '$(4, 3)$'], 'Multiply coords by $2$.'),
        mcq('Area of rectangle $(0,0)$, $(4,0)$, $(4,2)$, $(0,2)$:', '$8$', ['$12$', '$6$', '$4$'], '$4 \\times 2 = 8$.'),
        mcq('Rotate $(0, 2)$ $180°$ around origin:', '$(0, -2)$', ['$(-2, 0)$', '$(2, 0)$', '$(0, 2)$'], '$(x,y) \\to (-x,-y)$.'),
        mcq('Reflect $(-4, -5)$ across origin:', '$(4, 5)$', ['$(-4, 5)$', '$(4, -5)$', '$(-5, -4)$'], '$(x,y) \\to (-x,-y)$.'),
        mcq('Translate $(1,1)$ by $(-1,-1)$:', '$(0, 0)$', ['$(2, 2)$', '$(-1, -1)$', '$(1, 1)$'], 'Add vectors.'),
        mcq('Area of $(0,0)$, $(10,0)$, $(5,5)$:', '$25$', ['$50$', '$15$', '$10$'], '$\\frac{1}{2}(10)(5) = 25$.'),
        mcq('Dilate $(6, 8)$ from origin by $0.5$:', '$(3, 4)$', ['$(12, 16)$', '$(5.5, 7.5)$', '$(6.5, 8.5)$'], 'Multiply by $0.5$.'),
        mcq('Rotate $(3, 4)$ $90°$ CW around origin:', '$(4, -3)$', ['$(-4, 3)$', '$(-3, -4)$', '$(3, -4)$'], '$(x,y) \\to (y,-x)$.'),
        mcq('Area of square with diagonal vertices $(0,0)$ and $(2,2)$:', '$4$', ['$2$', '$8$', '$2\\sqrt{2}$'], 'Side $= 2$, area $= 4$.'),
        mcq('Reflect $(x, y)$ across y-axis, then x-axis:', '$(-x, -y)$', ['$(x, y)$', '$(y, x)$', '$(-y, -x)$'], 'Same as origin reflection.'),
        mcq('Translate $(5, 0)$ to $(0, 5)$. Vector is:', '$(-5, 5)$', ['$(5, 5)$', '$(5, -5)$', '$(0, 0)$'], '$(0-5, 5-0)$.'),
        mcq('Area of triangle $(1,1)$, $(2,1)$, $(1,2)$:', '$0.5$', ['$1$', '$2$', '$1.5$'], '$\\frac{1}{2}(1)(1)$.'),
    ];
}
export function genSkill3Assessment() {
    return [
        mcq('Robot at $(0,0)$ moves to $(3,4)$. Distance traveled:', '$5$', ['$7$', '$12$', '$1$'], '$\\sqrt{9+16}=5$.'),
        mcq('Reflect $(2, 3)$ across $x = 1$:', '$(0, 3)$', ['$(-2, 3)$', '$(4, 3)$', '$(2, -1)$'], 'Distance from $x=1$ is 1. Move 1 left of $1 \\to 0$.'),
        mcq('Area of polygon $(0,0)$, $(4,0)$, $(4,3)$, $(0,5)$:', '$16$', ['$20$', '$12$', '$14$'], 'Trapezoid: $\\frac{1}{2}(3+5) \\times 4 = 16$.'),
        mcq('Rotate $(1, 0)$ $60°$ CCW:', '$(\\frac{1}{2}, \\frac{\\sqrt{3}}{2})$', ['$x=1$', '$(\\frac{\\sqrt{3}}{2}, \\frac{1}{2})$', '$(0, 1)$'], 'Trigonometry.'),
        mcq('Reflect $(3, 4)$ across $y = -x$:', '$(-4, -3)$', ['$(-3, -4)$', '$(4, 3)$', '$(3, -4)$'], '$(x,y) \\to (-y,-x)$.'),
        mcq('Area of rhombus with diagonals $6$ and $8$:', '$24$', ['$48$', '$14$', '$10$'], '$\\frac{1}{2}d_1d_2$.'),
        mcq('Dilate triangle area $10$ by factor $3$. New area:', '$90$', ['$30$', '$60$', '$100$'], 'Area scales by $k^2 = 9$.'),
        mcq('Translate $(x,y)$ by $(2,3)$, reflect across x-axis. Final point:', '$(x+2, -y-3)$', ['$(x+2, y+3)$', '$(x-2, -y+3)$', '$(-x-2, y+3)$'], '$(x+2, y+3) \\to (x+2, -(y+3))$.'),
        mcq('Area of $(1,2)$, $(-4,-3)$, $(4,1)$:', '$10$', ['$20$', '$5$', '$15$'], 'Shoelace formula.'),
        mcq('Point $(2,1)$ rotated $90°$ CCW about $(1,1)$:', '$(1, 2)$', ['$(1, -1)$', '$(2, 2)$', '$(0, 1)$'], 'Relative to $(1,1)$ it is $(1,0) \\to (0,1) \\to (1,2)$.'),
    ];
}
export const TERMS = [
    { word: 'Locus', def: 'The set of all points satisfying a given geometric condition. In coordinate geometry, a locus is expressed as an equation relating $x$ and $y$.', icon: '🔵', example: 'The locus of points equidistant from $(0,0)$ and $(4,0)$ is $x = 2$ (the perpendicular bisector).', realLifeExample: 'A satellite\'s orbit is the locus of points at a fixed distance from Earth\'s centre.' },
    { word: 'Slope-Intercept Form', def: 'The equation of a straight line: $y = mx + c$, where $m$ is the slope and $c$ is the y-intercept.', icon: '📈', example: 'A line with slope $2$ passing through $(0, 3)$: $y = 2x + 3$.', realLifeExample: 'Linear regression in data science uses $y = mx + c$ to model trends in data.' },
    { word: 'Transformation', def: 'A mapping that changes the position, size, or orientation of a geometric figure — including translation, rotation, reflection, and scaling.', icon: '🔄', example: 'Translating $(2,3)$ by $(1,-1)$ gives $(3,2)$.', realLifeExample: 'Every animation frame involves coordinate transformations to move and rotate characters.' },
    { word: 'Slope of a Line', def: 'The tangent of the angle a line makes with the positive x-axis: $m = \\frac{y_2-y_1}{x_2-x_1} = \\tan\\theta$.', icon: '📐', example: 'Slope between $(1,2)$ and $(3,6)$: $m = \\frac{6-2}{3-1} = 2$.', realLifeExample: 'Engineers calculate road gradients (slopes) to ensure safe driving conditions.' },
    { word: 'Equation of a Circle', def: 'A circle with centre $(h,k)$ and radius $r$: $(x-h)^2 + (y-k)^2 = r^2$.', icon: '⭕', example: 'Circle at origin with radius 5: $x^2 + y^2 = 25$.', realLifeExample: 'GPS systems use circles (spheres in 3D) to trilaterate your position from satellite distances.' },
    { word: 'Area of a Polygon', def: 'Using the Shoelace Formula to find the area of any polygon given its vertices\' coordinates.', icon: '📏', example: 'For a triangle with vertices $(x_1,y_1), (x_2,y_2), (x_3,y_3)$: $A = \\frac{1}{2}|x_1(y_2-y_3) + x_2(y_3-y_1) + x_3(y_1-y_2)|$.', realLifeExample: 'Land surveyors use the Shoelace formula to calculate plot areas from GPS coordinates.' },
    { word: 'Reflection', def: 'A transformation that maps each point to its mirror image across a line (axis of reflection).', icon: '🪞', example: 'Reflecting $(3,4)$ in the x-axis gives $(3,-4)$. Reflecting in the y-axis gives $(-3,4)$.', realLifeExample: 'Image editing software uses coordinate reflections for mirror and flip operations.' },
];
export const KEY_IDENTITIES = [
    { name: 'Slope Formula', desc: 'The slope quantifies how steep a line is. A positive slope means the line rises, negative means it falls.', formula: 'm = \\frac{y_2 - y_1}{x_2 - x_1}' },
    { name: 'Equation of a Line (Two-Point)', desc: 'Given two points, the line equation can be constructed using the point-slope form.', formula: 'y - y_1 = \\frac{y_2-y_1}{x_2-x_1}(x - x_1)' },
    { name: 'Circle Equation', desc: 'Every point on a circle is at distance $r$ from its centre $(h,k)$.', formula: '(x-h)^2 + (y-k)^2 = r^2' },
    { name: 'Shoelace Formula', desc: 'Computes the area of any simple polygon from the coordinates of its vertices.', formula: 'A = \\frac{1}{2}|\\sum_{i=1}^{n}(x_iy_{i+1} - x_{i+1}y_i)|' },
];
export const VOCAB_QUIZ = [
    { id: 1, q: 'The locus of points equidistant from two fixed points is a:', options: ['Circle', 'Perpendicular bisector', 'Parabola', 'Hyperbola'], correct: 1 },
    { id: 2, q: 'In $y = mx + c$, what does $m$ represent?', options: ['y-intercept', 'x-intercept', 'Slope', 'Origin'], correct: 2 },
    { id: 3, q: 'Reflecting $(5, −3)$ across the x-axis gives:', options: ['$(5, 3)$', '$(−5, −3)$', '$(−5, 3)$', '$(3, −5)$'], correct: 0 },
    { id: 4, q: 'The equation of a circle with centre $(0,0)$ and radius $7$ is:', options: ['$x + y = 7$', '$x^2 + y^2 = 7$', '$x^2 + y^2 = 49$', '$(x-7)^2 + y^2 = 0$'], correct: 2 },
    { id: 5, q: 'The Shoelace formula calculates the ___ of a polygon.', options: ['Perimeter', 'Area', 'Diagonal', 'Slope'], correct: 1 },
];

export const TERMS = [
    { word: 'Octant', def: 'The eight regions created when the three coordinate planes divide 3D space. Each octant has a unique sign pattern for (x, y, z).', icon: '🧊', example: 'Octant I: $(+,+,+)$, Octant II: $(-,+,+)$, ... Octant VIII: $(+,-,-)$.', realLifeExample: 'Air traffic control divides airspace into sectors similar to octants to track aircraft.' },
    { word: 'Coordinate Planes', def: 'The three planes formed by pairs of axes: xy-plane ($z=0$), yz-plane ($x=0$), and xz-plane ($y=0$).', icon: '📋', example: 'The point $(3, 5, 0)$ lies on the xy-plane because its z-coordinate is zero.', realLifeExample: 'The floor of a room is the xy-plane, the walls are the xz and yz planes.' },
    { word: 'Direction Cosines', def: 'The cosines of the angles that a line makes with the positive x, y, and z axes, denoted $l$, $m$, $n$ where $l^2 + m^2 + n^2 = 1$.', icon: '📐', example: 'A line making $60°$, $45°$, $60°$ with axes has $l = \\cos 60° = \\frac{1}{2}$, $m = \\cos 45° = \\frac{1}{\\sqrt{2}}$, $n = \\cos 60° = \\frac{1}{2}$.', realLifeExample: 'Satellite antenna alignment uses direction cosines to point at a specific satellite in 3D space.' },
    { word: 'Direction Ratios', def: 'Any three numbers $a$, $b$, $c$ proportional to the direction cosines of a line. If $l:m:n = a:b:c$, then $a, b, c$ are direction ratios.', icon: '🔢', example: 'If direction ratios are $2:3:6$, then $l = \\frac{2}{7}$, $m = \\frac{3}{7}$, $n = \\frac{6}{7}$.', realLifeExample: 'CNC machines use direction ratios to determine the cutting tool path in 3D.' },
    { word: '3D Distance Formula', def: 'The distance between two points $(x_1,y_1,z_1)$ and $(x_2,y_2,z_2)$ in 3D space: $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$.', icon: '📏', example: 'Distance between $(1,2,3)$ and $(4,6,3)$: $d = \\sqrt{9+16+0} = 5$.', realLifeExample: 'Drones calculate the 3D distance to their landing pad using this formula.' },
    { word: 'Section Formula (3D)', def: 'Point dividing the join of $(x_1,y_1,z_1)$ and $(x_2,y_2,z_2)$ in ratio $m:n$: $P = \\left(\\frac{mx_2+nx_1}{m+n}, \\frac{my_2+ny_1}{m+n}, \\frac{mz_2+nz_1}{m+n}\\right)$.', icon: '✂️', example: 'Dividing $(0,0,0)$ and $(6,9,12)$ in $1:2$: $P = (2, 3, 4)$.', realLifeExample: 'Structural engineers place support points at specific ratios along 3D beams.' },
    { word: 'Centroid (3D)', def: 'The centroid of a triangle with vertices $(x_1,y_1,z_1)$, $(x_2,y_2,z_2)$, $(x_3,y_3,z_3)$ is $G = \\left(\\frac{x_1+x_2+x_3}{3}, \\frac{y_1+y_2+y_3}{3}, \\frac{z_1+z_2+z_3}{3}\\right)$.', icon: '⚖️', example: 'Centroid of $(0,0,0)$, $(3,0,0)$, $(0,3,0)$: $G = (1, 1, 0)$.', realLifeExample: 'Finding the centre of gravity of a triangular plate in 3D space.' },
];

export const KEY_IDENTITIES = [
    { name: '3D Distance Formula', desc: 'An extension of the 2D distance formula with an additional squared term for the z-coordinates.', formula: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}' },
    { name: 'Direction Cosine Relation', desc: 'The sum of squares of direction cosines of any line always equals 1. This is because direction cosines form a unit vector.', formula: 'l^2 + m^2 + n^2 = 1' },
    { name: 'Direction Ratios to Cosines', desc: 'Convert direction ratios $(a, b, c)$ to direction cosines by dividing each by $\\sqrt{a^2+b^2+c^2}$.', formula: 'l = \\frac{a}{\\sqrt{a^2+b^2+c^2}},\\; m = \\frac{b}{\\sqrt{a^2+b^2+c^2}},\\; n = \\frac{c}{\\sqrt{a^2+b^2+c^2}}' },
    { name: 'Angle Between Two Lines', desc: 'If two lines have direction cosines $(l_1,m_1,n_1)$ and $(l_2,m_2,n_2)$, the angle between them uses the dot product formula.', formula: '\\cos\\theta = |l_1 l_2 + m_1 m_2 + n_1 n_2|' },
];

export const VOCAB_QUIZ = [
    { id: 1, q: 'How many octants does 3D space have?', options: ['4', '6', '8', '12'], correct: 2 },
    { id: 2, q: 'A point on the xy-plane always has which coordinate equal to zero?', options: ['x', 'y', 'z', 'All of them'], correct: 2 },
    { id: 3, q: 'If direction cosines are $l, m, n$, then $l^2 + m^2 + n^2$ equals:', options: ['0', '1', '3', 'Depends on the line'], correct: 1 },
    { id: 4, q: 'The 3D distance formula has how many squared terms under the root?', options: ['1', '2', '3', '4'], correct: 2 },
    { id: 5, q: 'In which octant does the point $(−1, 2, −3)$ lie?', options: ['I', 'II', 'VI', 'III'], correct: 2 },
];

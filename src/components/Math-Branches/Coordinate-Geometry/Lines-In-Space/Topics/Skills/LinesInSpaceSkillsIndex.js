import { genSkill1Practice, genSkill1Assessment, genSkill2Practice, genSkill2Assessment, genSkill3Practice, genSkill3Assessment } from './LinesInSpaceSkillsData';

export const SKILLS = [
    {
        id: 'line-equations', title: 'Line Equations in 3D', subtitle: 'Vector & Cartesian', icon: '➡️', color: '#f43f5e',
        desc: 'Write vector, Cartesian, and parametric equations for lines in 3D space.',
        get practice() { return genSkill1Practice(); }, get assessment() { return genSkill1Assessment(); },
        learn: { concept: 'A line in 3D is defined by a point and a direction. It can be expressed in vector form ($\\vec{r} = \\vec{a} + \\lambda\\vec{b}$), Cartesian form, or parametric form.',
            rules: [
                { title: 'Vector Form', f: '\\vec{r} = \\vec{a} + \\lambda\\vec{b}', d: '$\\vec{a}$ is a fixed point, $\\vec{b}$ is the direction vector, and $\\lambda$ is the parameter.', ex: 'Through $(1,2,3)$ with direction $(2,1,-1)$: $\\vec{r} = (1,2,3) + \\lambda(2,1,-1)$.', tip: 'λ = 0 gives the fixed point. λ = 1 gives the point one "step" along the direction.' },
                { title: 'Cartesian Form', f: '\\frac{x-x_1}{a} = \\frac{y-y_1}{b} = \\frac{z-z_1}{c}', d: 'Eliminate λ from the parametric equations to get this symmetric form.', ex: '$\\frac{x-1}{2} = \\frac{y-2}{1} = \\frac{z-3}{-1}$', tip: 'If a direction ratio is 0, write the corresponding equation as: $x = x_1$.' }
            ]
        }
    },
    {
        id: 'angles-lines', title: 'Angle Between Lines', subtitle: 'Dot Product Application', icon: '📐', color: '#8b5cf6',
        desc: 'Calculate angles between two lines using their direction vectors or ratios.',
        get practice() { return genSkill2Practice(); }, get assessment() { return genSkill2Assessment(); },
        learn: { concept: 'The angle between two lines equals the angle between their direction vectors. The dot product formula gives the cosine of this angle.',
            rules: [
                { title: 'Angle Formula', f: '\\cos\\theta = \\frac{|\\vec{b_1} \\cdot \\vec{b_2}|}{|\\vec{b_1}||\\vec{b_2}|}', d: 'The absolute value ensures we get the acute angle between the lines.', ex: 'Directions $(1,1,0)$ and $(0,1,1)$: $\\cos\\theta = 1/2$, so $\\theta = 60°$.', tip: 'Parallel: $\\cos\\theta = 1$. Perpendicular: $\\cos\\theta = 0$.' },
                { title: 'Parallel & Perpendicular Tests', f: '\\text{Parallel: } \\frac{a_1}{a_2}=\\frac{b_1}{b_2}=\\frac{c_1}{c_2},\\quad \\text{Perp: } a_1a_2+b_1b_2+c_1c_2=0', d: 'Quick tests using direction ratios, without computing the full angle.', ex: 'DRs $(1,2,3)$ and $(2,4,6)$ are proportional → parallel.', tip: 'These are the same as the 2D slope tests, extended to 3D!' }
            ]
        }
    },
    {
        id: 'shortest-distance', title: 'Shortest Distance & Coplanarity', subtitle: 'Skew Line Analysis', icon: '📏', color: '#0ea5e9',
        desc: 'Find the shortest distance between skew lines and test for coplanarity.',
        get practice() { return genSkill3Practice(); }, get assessment() { return genSkill3Assessment(); },
        learn: { concept: 'The shortest distance between skew lines is perpendicular to both. For coplanar lines, the scalar triple product of the connecting vector and both directions is zero.',
            rules: [
                { title: 'Skew Line Distance', f: 'd = \\frac{|(\\vec{a_2}-\\vec{a_1}) \\cdot (\\vec{b_1} \\times \\vec{b_2})|}{|\\vec{b_1} \\times \\vec{b_2}|}', d: 'The numerator is a scalar triple product, the denominator is the magnitude of the cross product.', ex: 'Compute the cross product, then the dot product with $\\vec{a_2}-\\vec{a_1}$, then divide.', tip: 'If this distance is 0, the lines are coplanar (either intersecting or parallel).' },
                { title: 'Coplanarity Condition', f: '(\\vec{a_2}-\\vec{a_1}) \\cdot (\\vec{b_1} \\times \\vec{b_2}) = 0', d: 'When the scalar triple product is zero, the three vectors lie in the same plane.', ex: 'If two lines intersect, they are trivially coplanar.', tip: 'The scalar triple product equals the determinant of the 3×3 matrix formed by the three vectors.' }
            ]
        }
    }
];

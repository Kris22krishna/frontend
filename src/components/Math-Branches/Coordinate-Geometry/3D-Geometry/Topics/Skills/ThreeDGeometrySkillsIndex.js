import { genSkill1Practice, genSkill1Assessment, genSkill2Practice, genSkill2Assessment, genSkill3Practice, genSkill3Assessment } from './ThreeDGeometrySkillsData';

export const SKILLS = [
    {
        id: '3d-distance', title: '3D Distance & Octants', subtitle: 'Extending to 3D', icon: '🧊', color: '#0ea5e9',
        desc: 'Calculate distances in 3D space and classify points into octants.',
        get practice() { return genSkill1Practice(); }, get assessment() { return genSkill1Assessment(); },
        learn: { concept: 'The 3D distance formula adds a z-term to the 2D formula. The 8 octants are defined by the signs of (x,y,z).',
            rules: [
                { title: '3D Distance Formula', f: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}', d: 'Extends the 2D Pythagorean distance by adding the z-component.', ex: 'Distance from $(1,2,3)$ to $(4,6,3)$: $d = \\sqrt{9+16+0} = 5$.', tip: 'When two coordinates are the same, the formula simplifies — look for zeros!' },
                { title: 'Octant Classification', f: '\\text{Octant I: } (+,+,+),\\; \\text{Octant V: } (+,+,-)', d: 'Octants I–IV have $z > 0$ (above xy-plane), V–VIII have $z < 0$ (below).', ex: 'Point $(-2,3,-5)$ has signs $(-,+,-)$ → Octant VI.', tip: 'Octants I–IV mirror the 2D quadrant pattern with positive z, V–VIII with negative z.' },
                { title: 'Distance from Origin', f: 'd = \\sqrt{x^2 + y^2 + z^2}', d: 'Special case when one point is the origin.', ex: 'Distance of $(3,4,12)$ from origin: $\\sqrt{9+16+144} = 13$.', tip: 'Look for 3D Pythagorean triples like (1,2,2)→3, (2,3,6)→7, (3,4,12)→13.' }
            ]
        }
    },
    {
        id: 'direction-cosines', title: 'Direction Cosines & Ratios', subtitle: 'Orientation in 3D', icon: '📐', color: '#6366f1',
        desc: 'Find direction cosines, convert from direction ratios, and determine angles between lines.',
        get practice() { return genSkill2Practice(); }, get assessment() { return genSkill2Assessment(); },
        learn: { concept: 'Direction cosines (l,m,n) are the cosines of angles a line makes with the axes. They always satisfy l²+m²+n²=1. Direction ratios are proportional to DCs.',
            rules: [
                { title: 'Direction Cosines', f: 'l = \\cos\\alpha,\\; m = \\cos\\beta,\\; n = \\cos\\gamma', d: 'Where α, β, γ are angles the line makes with x, y, z axes respectively.', ex: 'Line at $60°, 45°, 60°$: $l = 1/2, m = 1/\\sqrt{2}, n = 1/2$.', tip: 'The identity $l^2 + m^2 + n^2 = 1$ is the 3D analogue of the unit circle!' },
                { title: 'DRs to DCs Conversion', f: 'l = \\frac{a}{\\sqrt{a^2+b^2+c^2}}', d: 'Divide each direction ratio by the magnitude to get the direction cosine.', ex: 'DRs $1:2:2$: magnitude $= 3$, DCs $= 1/3, 2/3, 2/3$.', tip: 'DRs are not unique — $1:2:3$ and $2:4:6$ represent the same direction!' }
            ]
        }
    },
    {
        id: '3d-section', title: 'Section Formula & Centroid (3D)', subtitle: 'Dividing in Space', icon: '✂️', color: '#f59e0b',
        desc: 'Apply the 3D section formula and find centroids of triangles in space.',
        get practice() { return genSkill3Practice(); }, get assessment() { return genSkill3Assessment(); },
        learn: { concept: 'The 3D section formula works identically to 2D but with an additional z-component. The centroid averages all three coordinates.',
            rules: [
                { title: '3D Section Formula', f: 'P = \\left(\\frac{mx_2+nx_1}{m+n}, \\frac{my_2+ny_1}{m+n}, \\frac{mz_2+nz_1}{m+n}\\right)', d: 'Same weighted-average principle as 2D, extended to three coordinates.', ex: 'Divide $(2,4,6)$ and $(8,10,12)$ in $1:2$: $P = (4,6,8)$.', tip: 'For the midpoint, use $m:n = 1:1$ — just average each coordinate.' },
                { title: '3D Centroid', f: 'G = \\left(\\frac{x_1+x_2+x_3}{3}, \\frac{y_1+y_2+y_3}{3}, \\frac{z_1+z_2+z_3}{3}\\right)', d: 'The centroid (centre of mass) of a triangle in 3D space.', ex: 'Centroid of $(1,2,3)$, $(4,5,6)$, $(7,8,9)$: $G = (4,5,6)$.', tip: 'The centroid always lies inside the triangle — in both 2D and 3D!' }
            ]
        }
    }
];

import { genSkill1Practice, genSkill1Assessment, genSkill2Practice, genSkill2Assessment, genSkill3Practice, genSkill3Assessment } from './ApplicationsSkillsData';

export const SKILLS = [
    {
        id: 'straight-lines', title: 'Straight Lines & Slopes', subtitle: 'Linear Applications', icon: '📈', color: '#8b5cf6',
        desc: 'Apply slope, slope-intercept, and point-slope forms to solve real-world line problems.',
        get practice() { return genSkill1Practice(); }, get assessment() { return genSkill1Assessment(); },
        learn: { concept: 'The slope tells you the rate of change. Lines with equal slopes are parallel; lines with slopes whose product is $-1$ are perpendicular.',
            rules: [
                { title: 'Slope-Intercept Form', f: 'y = mx + c', d: '$m$ is the slope (rise/run) and $c$ is the y-intercept (where the line crosses the y-axis).', ex: 'Slope $3$, y-intercept $-2$: $y = 3x - 2$.', tip: 'Parallel lines share the same $m$. Perpendicular lines have $m_1 \\times m_2 = -1$.' },
                { title: 'Point-Slope Form', f: 'y - y_1 = m(x - x_1)', d: 'When you know a point and the slope, plug directly into this form.', ex: 'Through $(2,3)$ with slope $4$: $y - 3 = 4(x - 2) \\Rightarrow y = 4x - 5$.', tip: 'This is the fastest way to write a line equation from a point and a slope.' }
            ]
        }
    },
    {
        id: 'circles', title: 'Circles & Curves', subtitle: 'Beyond Straight Lines', icon: '⭕', color: '#ec4899',
        desc: 'Work with circle equations, tangent lines, and determine point positions relative to circles.',
        get practice() { return genSkill2Practice(); }, get assessment() { return genSkill2Assessment(); },
        learn: { concept: 'A circle is the locus of points equidistant from a fixed centre. Its equation in standard form reveals the centre and radius directly.',
            rules: [
                { title: 'Standard Circle Equation', f: '(x-h)^2 + (y-k)^2 = r^2', d: 'Centre $(h,k)$, radius $r$. Expand to get the general form $x^2 + y^2 + Dx + Ey + F = 0$.', ex: 'Centre $(2,-3)$, radius $4$: $(x-2)^2 + (y+3)^2 = 16$.', tip: 'To find the centre from general form, complete the square for both $x$ and $y$.' },
                { title: 'Point vs. Circle Test', f: '\\text{If } (x_0-h)^2+(y_0-k)^2 \\begin{cases} < r^2 & \\text{inside} \\\\ = r^2 & \\text{on} \\\\ > r^2 & \\text{outside} \\end{cases}', d: 'Substitute the point into the left side and compare with $r^2$.', ex: '$(3,4)$ and $x^2+y^2=25$: $9+16=25 = r^2$, so the point is ON the circle.', tip: 'This works for any circle, not just ones centred at the origin!' }
            ]
        }
    },
    {
        id: 'transformations', title: 'Transformations & Area', subtitle: 'Applied Coordinate Geometry', icon: '🔄', color: '#f59e0b',
        desc: 'Apply translations, reflections, rotations, and area calculations using coordinates.',
        get practice() { return genSkill3Practice(); }, get assessment() { return genSkill3Assessment(); },
        learn: { concept: 'Coordinate transformations change the position or orientation of geometric figures by applying rules to their coordinates.',
            rules: [
                { title: 'Translation', f: '(x, y) \\to (x + a,\\; y + b)', d: 'Shifts every point by the same vector $(a, b)$. Shape and size are unchanged.', ex: 'Translate $(3,5)$ by $(2,-3)$: new point $(5, 2)$.', tip: 'Translation is the simplest transformation — it preserves everything except position.' },
                { title: 'Reflection', f: '\\text{x-axis: } (x,y) \\to (x,-y) \\quad \\text{y-axis: } (x,y) \\to (-x,y)', d: 'Mirror image across the specified axis.', ex: 'Reflect $(4,-2)$ in y-axis: $(-4,-2)$.', tip: 'Reflection in $y = x$: swap coordinates → $(x,y) \\to (y,x)$.' },
                { title: '90° Rotation (CCW)', f: '(x, y) \\to (-y, x)', d: 'Rotates a point $90°$ counter-clockwise about the origin.', ex: '$(1,0) \\to (0,1)$, $(0,1) \\to (-1,0)$.', tip: 'For 180° rotation: $(x,y) \\to (-x,-y)$. For 270° CCW (= 90° CW): $(x,y) \\to (y,-x)$.' }
            ]
        }
    }
];

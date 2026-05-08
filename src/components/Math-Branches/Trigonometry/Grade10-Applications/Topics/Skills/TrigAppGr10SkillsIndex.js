import { genSkill1Practice, genSkill1Assessment, genSkill2Practice, genSkill2Assessment } from './TrigAppGr10SkillsData';

export const SKILLS = [
    {
        id: 'heights-distances',
        title: 'Heights and Distances',
        subtitle: 'Single Triangle Problems',
        icon: '🗼',
        color: '#10b981',
        desc: 'Calculate the height of an object or distance from it using a single right-angled triangle.',
        get practice() { return genSkill1Practice(); },
        get assessment() { return genSkill1Assessment(); },
        learn: {
            concept: 'For problems involving a single object (like a tower or tree) viewed from a point, you form one right-angled triangle. The height is usually the opposite side, the distance is the adjacent side, and the line of sight is the hypotenuse.',
            rules: [
                {
                    title: 'Identifying the Ratio',
                    f: '\\text{Use } \\tan\\theta = \\frac{\\text{Height}}{\\text{Distance}}',
                    d: 'If the hypotenuse (line of sight/ladder length) is not involved, tangent is almost always the right choice.',
                    ex: 'If distance is $15$ m and angle of elevation is $60°$, height $h = 15 \\tan 60° = 15\\sqrt{3}$ m.',
                    tip: 'Always draw a diagram first and label the sides before choosing sin, cos, or tan.'
                }
            ]
        }
    },
    {
        id: 'multi-step',
        title: 'Multi-step Angle Problems',
        subtitle: 'Two Triangles',
        icon: '⛰️',
        color: '#ec4899',
        desc: 'Solve complex problems involving two angles of elevation/depression or two objects.',
        get practice() { return genSkill2Practice(); },
        get assessment() { return genSkill2Assessment(); },
        learn: {
            concept: 'When an object is viewed from two different points, or two objects are viewed from the same point, you get two right-angled triangles. The key is to find the common side (often the height) and set up two equations.',
            rules: [
                {
                    title: 'Common Side Strategy',
                    f: 'x_1 = \\frac{h}{\\tan \\theta_1}, \\quad x_2 = \\frac{h}{\\tan \\theta_2}',
                    d: 'Express the common side (e.g. height $h$) in terms of both triangles, then equate or substitute them to solve for the unknown.',
                    ex: 'Two points $20$ m apart in line with a tower. $\\tan 60° = h/x$ and $\\tan 30° = h/(x+20)$. Solve for $x$ then $h$.',
                    tip: 'Do not evaluate $\\sqrt{3}$ until the very final step of your calculation!'
                }
            ]
        }
    }
];

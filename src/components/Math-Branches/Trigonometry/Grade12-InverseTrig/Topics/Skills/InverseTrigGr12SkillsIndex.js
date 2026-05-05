import { genSkill1Practice, genSkill1Assessment, genSkill2Practice, genSkill2Assessment, genSkill3Practice, genSkill3Assessment } from './InverseTrigGr12SkillsData';

export const SKILLS = [
    {
        id: 'principal-values',
        title: 'Principal Values',
        subtitle: 'Domains & Ranges',
        icon: '⭐',
        color: '#ec4899',
        desc: 'Find the exact principal value of an inverse trigonometric function without a calculator.',
        get practice() { return genSkill1Practice(); },
        get assessment() { return genSkill1Assessment(); },
        learn: {
            concept: 'Because trig functions are periodic, they do not naturally have inverses. We must restrict their domains to a specific "principal branch" to make them one-to-one.',
            rules: [
                {
                    title: 'The Ranges',
                    f: '\\arcsin: [-\\frac{\\pi}{2}, \\frac{\\pi}{2}] \\\\ \\arccos: [0, \\pi] \\\\ \\arctan: (-\\frac{\\pi}{2}, \\frac{\\pi}{2})',
                    d: 'Your final answer MUST fall within these ranges.',
                    ex: '$\\arcsin(-1/2) = -\\pi/6$, NOT $11\\pi/6$, because $11\\pi/6$ is outside the principal range.',
                    tip: 'Arcsin/Arctan live on the right half of the circle (Q1 & Q4). Arccos lives on the top half (Q1 & Q2).'
                }
            ]
        }
    },
    {
        id: 'composition',
        title: 'Compositions',
        subtitle: 'Trig of Inverse Trig',
        icon: '🔄',
        color: '#3b82f6',
        desc: 'Evaluate expressions where a trig function is composed with an inverse trig function.',
        get practice() { return genSkill2Practice(); },
        get assessment() { return genSkill2Assessment(); },
        learn: {
            concept: 'Expressions like $\\sin(\\arccos x)$ can be solved algebraically without knowing the actual angle by drawing a right triangle.',
            rules: [
                {
                    title: 'The Triangle Method',
                    f: '\\tan(\\arccos \\frac{3}{5})',
                    d: '1. Let $\\theta = \\arccos(3/5)$. \n2. Draw a right triangle with adjacent $3$ and hypotenuse $5$. \n3. Find the opposite side ($4$) using Pythagoras. \n4. Find $\\tan \\theta$ ($4/3$).',
                    ex: 'So, $\\tan(\\arccos \\frac{3}{5}) = \\frac{4}{3}$.',
                    tip: 'Watch out for $\\arcsin(\\sin \\theta)$. If $\\theta$ is outside the principal range, you must find a co-terminal or reference angle inside the range first!'
                }
            ]
        }
    },
    {
        id: 'identities',
        title: 'Inverse Identities',
        subtitle: 'Formulas & Transformations',
        icon: '🧩',
        color: '#10b981',
        desc: 'Use inverse identities (like negative arguments or sums) to simplify complex expressions.',
        get practice() { return genSkill3Practice(); },
        get assessment() { return genSkill3Assessment(); },
        learn: {
            concept: 'Inverse trig functions have their own set of identities that mirror the standard identities.',
            rules: [
                {
                    title: 'Negative Arguments',
                    f: '\\arcsin(-x) = -\\arcsin(x) \\\\ \\arccos(-x) = \\pi - \\arccos(x)',
                    d: 'For functions centered around $0$ (arcsin, arctan), you just pull the negative out. For functions centered around $\\pi/2$ (arccos, arccot), you subtract from $\\pi$.',
                    ex: '$\\arccos(-1/2) = \\pi - \\arccos(1/2) = \\pi - \\pi/3 = 2\\pi/3$.',
                    tip: 'Never pull a negative sign out of arccos!'
                }
            ]
        }
    }
];

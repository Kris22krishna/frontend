import { genSkill1Q, genSkill1A, genSkill2Q, genSkill2A } from './LimitsSkillsData_Part1';
import { genSkill3Q, genSkill3A, genSkill4Q, genSkill4A } from './LimitsSkillsData_Part2';
import { genSkill5Q, genSkill5A, genSkill6Q, genSkill6A } from './LimitsSkillsData_Part3';

export const SKILLS = [
    {
        id: 'substitution',
        title: 'Substitution & Simplification',
        subtitle: 'Limits Foundations',
        icon: '🎯',
        color: '#0ea5e9',
        desc: 'Evaluate limits by direct substitution and simplifying polynomials.',
        practice: genSkill1Q,
        assessment: genSkill1A,
        learn: {
            concept: 'A limit describes the value that a function approaches. The easiest approach is simply plugging in the value, known as Direct Substitution.',
            rules: [
                {
                    title: 'Direct Substitution',
                    f: '\\lim_{x \\to a} f(x) = f(a)',
                    d: 'If the function is smooth and continuous near a point, just plug the number in.',
                    ex: '$\\lim_{x \\to 3} (2x + 1) = 2(3) + 1 = 7$',
                    tip: 'Only substitute directly if it doesn’t cause a divide-by-zero or other error.'
                },
                {
                    title: 'Limit of a Constant',
                    f: '\\lim_{x \\to a} k = k',
                    d: 'Constants are unaffected by variables.',
                    ex: '$\\lim_{x \\to 10} 6 = 6$',
                    tip: 'A constant function is just a horizontal line. The height is always the same!'
                }
            ]
        }
    },
    {
        id: 'indeterminate',
        title: 'Indeterminate Forms',
        subtitle: 'The 0/0 Case',
        icon: '⚠️',
        color: '#8b5cf6',
        desc: 'Handle fractions that evaluate to 0/0 using factorization and conjugation.',
        practice: genSkill2Q,
        assessment: genSkill2A,
        learn: {
            concept: 'When direct substitution gives you 0/0, the limit is Indeterminate. This means the limit might still exist, but we have to do more work!',
            rules: [
                {
                    title: 'Factoring',
                    f: '\\frac{x^2 - a^2}{x - a} = x + a',
                    d: 'Factor the numerator and/or denominator to cancel out the troublesome term.',
                    ex: '$\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3} = \\lim_{x \\to 3} (x + 3) = 6$',
                    tip: 'If substitution gives 0/0 at $x=a$, then $(x-a)$ is guaranteed to be a factor of both top and bottom.'
                },
                {
                    title: 'Rationalization',
                    f: '\\frac{\\sqrt{x} - a}{x - a^2}',
                    d: 'If you see an unruly square root causing 0/0, multiply the top and bottom by its conjugate.',
                    ex: 'Multiply by $\\sqrt{x} + a$ to eliminate the roots in the numerator.',
                    tip: 'The conjugate of $a - b$ is $a + b$.'
                }
            ]
        }
    },
    {
        id: 'trig_exp',
        title: 'Trigonometric & Exponential',
        subtitle: 'Standard Limits',
        icon: '📐',
        color: '#f43f5e',
        desc: 'Solve non-algebraic limits using standardized trigonometric and exponential forms.',
        practice: genSkill3Q,
        assessment: genSkill3A,
        learn: {
            concept: 'Certain transcendental functions (like sine, tangent, and $e^x$) have very predictable behavior near zero.',
            rules: [
                {
                    title: 'Sine Limit',
                    f: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',
                    d: 'Near zero, the sine curve is almost indistinguishable from the line $y=x$.',
                    ex: '$\\lim_{x \\to 0} \\frac{\\sin(5x)}{5x} = 1$',
                    tip: 'Make sure the argument inside the sine exactly matches the denominator!'
                },
                {
                    title: 'Exponential Limit',
                    f: '\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1',
                    d: 'The exponential function $e^x$ grows out of $x=0$ with a slope exactly equal to 1.',
                    ex: 'With a coefficient: $\\lim_{x \\to 0} \\frac{e^{kx} - 1}{x} = k$',
                    tip: 'This is the foundation for finding the derivative of $e^x$.'
                },
                {
                    title: 'One to Infinity Form',
                    f: '\\lim_{x \\to 0} (1 + x)^{1/x} = e',
                    d: 'This is the very definition of the number $e$.',
                    ex: '$\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e$',
                    tip: 'Very common in compound interest physics!'
                }
            ]
        }
    },
    {
        id: 'infinity',
        title: 'Limits at Infinity',
        subtitle: 'End Behavior',
        icon: '🚀',
        color: '#3b82f6',
        desc: 'Analyze functions as x grows infinitely large in the positive or negative direction.',
        practice: genSkill4Q,
        assessment: genSkill4A,
        learn: {
            concept: 'Limits at infinity describe the horizontal asymptotes and end behavior of a function.',
            rules: [
                {
                    title: 'Bottom Heavy',
                    f: '\\text{if deg(den) > deg(num)}, \\lim \\to 0',
                    d: 'If the denominator grows faster than the numerator, the fraction crushes down to 0.',
                    ex: '$\\lim_{x \\to \\infty} \\frac{3x^2}{x^3 + 1} = 0$',
                    tip: 'Only the highest powers of $x$ matter when $x$ is huge.'
                },
                {
                    title: 'Equal Degree',
                    f: '\\text{Ratio of Leading Coefficients}',
                    d: 'If both top and bottom grow at the same rate, look at their leading coefficients.',
                    ex: '$\\lim_{x \\to \\infty} \\frac{5x^3}{2x^3} = \\frac{5}{2}$',
                    tip: 'This produces a horizontal asymptote at $y = 5/2$.'
                },
                {
                    title: 'Top Heavy',
                    f: '\\text{if deg(num) > deg(den)}, \\lim \\to \\pm\\infty',
                    d: 'If the numerator outpaces the denominator, the value explodes to infinity.',
                    ex: '$\\lim_{x \\to \\infty} \\frac{x^4}{x^2} = \\infty$',
                    tip: 'Watch the signs to see whether it goes to positive or negative infinity.'
                }
            ]
        }
    },
    {
        id: 'advanced',
        title: 'Advanced Techniques',
        subtitle: 'L\'Hôpital & Squeeze',
        icon: '🧠',
        color: '#10b981',
        desc: 'Apply derivatives and bounding functions to find tricky limits.',
        practice: genSkill5Q,
        assessment: genSkill5A,
        learn: {
            concept: 'When algebra fails, Calculus and Logic can save the day.',
            rules: [
                {
                    title: 'L\'Hôpital\'s Rule',
                    f: '\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f\'(x)}{g\'(x)}',
                    d: 'If a limit yields $0/0$ or $\\infty/\\infty$, simply take the derivative of the top and the derivative of the bottom independently.',
                    ex: '$\\frac{e^x - 1}{x} \\xrightarrow{L\'H} \\frac{e^x}{1} = 1$',
                    tip: 'Never use the Quotient Rule here! Just derive top & bottom separately.'
                },
                {
                    title: 'Squeeze Theorem',
                    f: 'f(x) \\le g(x) \\le h(x)',
                    d: 'If a highly oscillatory function is sandwiched between two tamer functions that converge to the same point, it is forced to converge too.',
                    ex: '$-x^2 \\le x^2 \\sin(1/x) \\le x^2 \\implies \\lim \\to 0$',
                    tip: 'Usually involves sine or cosine being bounded between -1 and 1.'
                }
            ]
        }
    },
    {
        id: 'onesided',
        title: 'One-Sided Limits',
        subtitle: 'LHL & RHL',
        icon: '↔️',
        color: '#f59e0b',
        desc: 'Inspect functions approaching a point from only the left or the right side.',
        practice: genSkill6Q,
        assessment: genSkill6A,
        learn: {
            concept: 'A limit only formally exists if approaching from the left yields the exact same value as approaching from the right.',
            rules: [
                {
                    title: 'Right-Hand Limit (RHL)',
                    f: '\\lim_{x \\to a^+} f(x)',
                    d: 'Approaching $a$ from values slightly larger than $a$.',
                    ex: '$\\lim_{x \\to 0^+} \\frac{|x|}{x} = 1$',
                    tip: 'The little "$+$" sign means coming from the positive side.'
                },
                {
                    title: 'Left-Hand Limit (LHL)',
                    f: '\\lim_{x \\to a^-} f(x)',
                    d: 'Approaching $a$ from values slightly smaller than $a$.',
                    ex: '$\\lim_{x \\to 0^-} \\frac{|x|}{x} = -1$',
                    tip: 'The little "$-$" sign means coming from the negative side.'
                },
                {
                    title: 'Existence',
                    f: '\\text{LHL} = \\text{RHL} = L',
                    d: 'If and only if both one-sided limits match, the general overarching limit exists.',
                    ex: 'Since $1 \\neq -1$, $\\lim_{x \\to 0} \\frac{|x|}{x}$ Does Not Exist!',
                    tip: 'Always check one-sided limits on piecewise functions and absolute values.'
                }
            ]
        }
    }
];

export const inverseTrigCards5W1H = [
    {
        q: 'Who?',
        label: 'Who developed inverse functions?',
        gradFrom: '#ec4899', gradTo: '#f472b6', shadow: 'rgba(236,72,153,0.3)',
        icon: '👨‍🏫',
        content: 'Mathematicians in the 1700s, including **Daniel Bernoulli** and **Leonhard Euler**, began treating inverse trigonometric operations as formal functions, giving them the standard notations we use today.',
        fact: '🎓 John Herschel (1813) introduced the $\\sin^{-1} x$ notation, which is often confused with $1/\\sin x$.'
    },
    {
        q: 'What?',
        label: 'What is an inverse trig function?',
        gradFrom: '#3b82f6', gradTo: '#60a5fa', shadow: 'rgba(59,130,246,0.3)',
        icon: '🔄',
        content: 'It asks the reverse question. Instead of "What is the sine of $30°$?", an inverse function asks "What angle has a sine of $0.5$?" The answer is denoted as $\\sin^{-1}(0.5)$ or $\\arcsin(0.5)$.',
        fact: '🧩 "Arc" refers to the arc length on a unit circle, which equals the angle in radians.'
    },
    {
        q: 'When?',
        label: 'When is a function invertible?',
        gradFrom: '#10b981', gradTo: '#34d399', shadow: 'rgba(16,185,129,0.3)',
        icon: '✂️',
        content: 'A function must be **one-to-one** (passing the horizontal line test) to have an inverse. Because sine waves repeat endlessly, they fail this test! We have to *restrict the domain* (cut off a small piece of the wave) to make them invertible.',
        fact: '✂️ For sine, we only look at the piece from $-\\pi/2$ to $\\pi/2$.'
    },
    {
        q: 'Where?',
        label: 'Where is this used in calculus?',
        gradFrom: '#f59e0b', gradTo: '#fbbf24', shadow: 'rgba(245,158,11,0.3)',
        icon: '📈',
        content: 'Inverse trig functions are essential in **integration**. Many rational expressions (like $1/(1+x^2)$) have inverse trig functions as their anti-derivatives. They bridge algebraic expressions and angles.',
        fact: '∫ The integral of $1/(1+x^2)$ is $\\arctan(x)$!'
    },
    {
        q: 'Why?',
        label: 'Why the confusion with powers?',
        gradFrom: '#8b5cf6', gradTo: '#a78bfa', shadow: 'rgba(139,92,246,0.3)',
        icon: '🤔',
        content: 'The notation $\\sin^{-1}(x)$ means the *inverse function*, NOT the *reciprocal*. $\\sin^{-1}(x) \\neq \\frac{1}{\\sin x}$. The reciprocal is $\\csc x$. This is why many mathematicians prefer the unambiguous name $\\arcsin(x)$.',
        fact: '⚠️ Never confuse $\\sin^{-1}(x)$ with $(\\sin x)^{-1}$.'
    },
    {
        q: 'How?',
        label: 'How do you find a principal value?',
        gradFrom: '#0ea5e9', gradTo: '#38bdf8', shadow: 'rgba(14,165,233,0.3)',
        icon: '🔑',
        content: '1. Identify the ratio given (e.g., $1/2$).\n2. Recall the standard angle for that ratio (e.g., $\\pi/6$).\n3. Check the sign (+ or -). If negative, use the defined restricted range (Principal Value Branch) for that specific function to find the correct quadrant.',
        fact: '🎯 Sine\'s principal values are always in Quadrants 1 or 4.'
    }
];

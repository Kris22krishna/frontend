export const relFuncIntroData = {
    prerequisites: [
        { title: 'Sets & Subsets', desc: 'Understanding of sets, subsets, union, intersection, and Venn diagrams.', icon: '∩' },
        { title: 'Number Systems', desc: 'Familiarity with natural numbers, integers, rationals, and reals.', icon: '🔢' },
        { title: 'Basic Algebra', desc: 'Working with variables, expressions, and simple equations.', icon: '✖️' }
    ],
    cards5W1H: [
        {
            q: "WHAT",
            label: "are Relations & Functions?",
            icon: "🔍",
            gradFrom: "#0891b2",
            gradTo: "#06b6d4",
            shadow: "rgba(6,182,212,0.35)",
            content: `A <strong>relation</strong> is a connection between two sets — it's a subset of the Cartesian product $A \\times B$. A <strong>function</strong> is a special relation where every element of the first set maps to exactly one element of the second set. Think of a function as a machine: you feed it an input, and it gives you exactly one output. For example, $f(x) = x^2$ takes any number and squares it — no ambiguity, no surprises!`,
            fact: 'The modern concept of a function was formalized by Dirichlet in 1837, but the idea of input-output mappings goes back to medieval Islamic mathematicians!',
        },
        {
            q: "WHO",
            label: "uses Relations & Functions?",
            icon: "👥",
            gradFrom: "#059669",
            gradTo: "#10b981",
            shadow: "rgba(16,185,129,0.35)",
            content: `Everyone who works with data! Computer scientists use functions for algorithms and programming. Economists model supply-demand with functions. Biologists use growth functions to model populations. Engineers use transfer functions in circuit design. Even social media platforms use relation graphs to suggest friends. If you've ever used a vending machine — that's a function in action!`,
            fact: "Every algorithm in computer science is essentially a function — it takes input and produces output. The entire internet runs on functions!",
        },
        {
            q: "WHEN",
            label: "did this concept begin?",
            icon: "📅",
            gradFrom: "#b45309",
            gradTo: "#f59e0b",
            shadow: "rgba(245,158,11,0.35)",
            content: `The idea of ordered pairs traces back to René Descartes (1637) who linked algebra and geometry through coordinate pairs. Gottfried Leibniz first used the word "function" in 1694. Leonhard Euler introduced the notation $f(x)$ in 1734. The formal set-theoretic definition of relations came from Georg Cantor's work on set theory in the 1870s. Today, functions are the backbone of all modern mathematics!`,
            fact: "Euler's notation $f(x)$ has been used for nearly 300 years and shows no signs of being replaced — it's one of math's most successful inventions!",
        },
        {
            q: "WHERE",
            label: "do we see them?",
            icon: "🌍",
            gradFrom: "#be185d",
            gradTo: "#ec4899",
            shadow: "rgba(236,72,153,0.35)",
            content: `Relations and functions are everywhere! Temperature as a function of time. Price as a function of demand. Your age is a function of your birth year. GPS coordinates are ordered pairs. Social networks are relation graphs. Even the music streaming algorithm that picks your next song uses complex function compositions. Every spreadsheet formula is a function!`,
            fact: "Google Maps uses millions of functions simultaneously — distance functions, time functions, traffic functions — all composed together to find your optimal route!",
        },
        {
            q: "WHY",
            label: "should I learn this?",
            icon: "🚀",
            gradFrom: "#7c3aed",
            gradTo: "#a855f7",
            shadow: "rgba(168,85,247,0.35)",
            content: `Relations & Functions are the gateway to all higher mathematics. Calculus is entirely built on functions. Linear algebra uses function transformations. Statistics uses probability functions. Without understanding functions, you cannot progress in mathematics, physics, computer science, or engineering. This chapter builds the vocabulary and intuition you'll use for the rest of your mathematical life!`,
            fact: "In competitive programming, understanding function properties (like injectivity) can be the difference between solving a problem in minutes vs. hours!",
        },
        {
            q: "HOW",
            label: "do they work?",
            icon: "🎯",
            gradFrom: "#0369a1",
            gradTo: "#3b82f6",
            shadow: "rgba(59,130,246,0.35)",
            content: `Start with <strong>ordered pairs</strong> $(a, b)$ where order matters. Build the <strong>Cartesian product</strong> $A \\times B$ — all possible pairs. A <strong>relation</strong> picks some of those pairs based on a rule. A <strong>function</strong> is a relation where each input has exactly one output. Then explore special types: identity ($f(x) = x$), constant ($f(x) = c$), modulus ($f(x) = |x|$), and more. Finally, learn to combine functions through addition, subtraction, multiplication, and division!`,
            fact: "The vertical line test is the quickest way to check if a graph represents a function — if any vertical line crosses the graph more than once, it's NOT a function!",
        }
    ]
};

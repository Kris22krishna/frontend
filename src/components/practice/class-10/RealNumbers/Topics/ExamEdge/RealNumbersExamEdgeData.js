export const realNumbersExamEdgeData = {
    exams: [
        {
            name: "CBSE Board",
            color: "#6366f1",
            emoji: "📝",
            weightage: "6 Marks",
            freq: "Compulsory every year",
            topics: ["HCF/LCM Word Problems", "Proof of $\\sqrt{2}, \\sqrt{3}, \\sqrt{5}$ irrationality", "Fundamental Theorem of Arithmetic application", "Euclids Division Algorithm (Step-by-step)"],
            strategy: "The Board loves proofs! Practice 'Proof by Contradiction' perfectly. Show every step in Euclid's algorithm to get full marks. Word problems on LCM (timing) and HCF (grouping) are frequent.",
            pitfalls: ["Writing $\\sqrt{2} = \\frac{a}{b}$ but forgetting to state $a, b$ are co-prime.", "Confusion between when to use HCF vs LCM in word problems.", "Not stating the final non-zero remainder as HCF."],
        },
        {
            name: "NTSE / Olympiad",
            color: "#ef4444",
            emoji: "🏆",
            weightage: "4-8 Marks",
            freq: "3-4 questions in Stage 1",
            topics: ["Number of divisors/zeros", "Identifying non-terminating decimals", "Advanced HCF/LCM patterns", "Units digits and remainders"],
            strategy: "Speed is key. Learn shortcuts for finding HCF of three numbers. Focus on the number of trailing zeros in $n!$ or $a^n \\times b^m$.",
            pitfalls: ["Over-calculating when a simple prime factor check would suffice.", "Forgetting that $0$ is a whole number but not a natural number."],
        },
        {
            name: "KCET / State Board",
            color: "#0d9488",
            emoji: "🌟",
            weightage: "4-6 Marks",
            freq: "2-3 questions per year",
            topics: ["Rational vs Irrational identification", "Simplifying root expressions", "Lowest form of fractions", "Basic Algorithm steps"],
            strategy: "Stick to NCERT Textbook examples; State boards often pick problems directly from the main exercises. Memorize squares up to 30.",
            pitfalls: ["Assuming $\\pi$ is exactly $\\frac{22}{7}$ (it's only an approximation!).", "Calculation errors in long division during Euclid's process."],
        }
    ],
    proTips: [
        "In HCF word problems, look for keywords like 'Maximum', 'Greatest', or 'Largest'.",
        "In LCM word problems, look for 'Minimum', 'Smallest', or 'When will they meet again'.",
        "Fundamental Theorem: Primes are like DNA. Every number has its own unique 'Primal Profile'.",
        "If they ask to prove $5 - \\sqrt{3}$ is irrational, first assume $\\sqrt{3}$ is irrational is given, then use rational properties."
    ]
};

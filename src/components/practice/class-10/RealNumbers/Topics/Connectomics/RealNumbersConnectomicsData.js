export const realNumbersConnectomicsData = {
    connections: [
        { 
            from: "Real Numbers (Ch.1)", 
            to: "Polynomials (Ch.2)", 
            type: "Direct", 
            icon: "📐", 
            color: "#6366f1",
            note: "The roots (zeros) of polynomials can often be irrational numbers like $\\sqrt{2}$ or $\\sqrt{3}$." 
        },
        { 
            from: "Real Numbers (Ch.1)", 
            to: "Trigonometry (Ch.8)", 
            type: "Fundamental", 
            icon: "📉", 
            color: "#0d9488",
            note: "The values of T-ratios like $\\sin 45^\\circ = 1/\\sqrt{2}$ are irrational numbers that you master in this chapter." 
        },
        { 
            from: "Real Numbers (Ch.1)", 
            to: "Circles (Ch.10)", 
            type: "Essential", 
            icon: "⭕", 
            color: "#7c3aed",
            note: "The most famous irrational number, $\\pi$, is the heart of every circle calculation (Perimeter and Area)." 
        },
        { 
            from: "Real Numbers (Ch.1)", 
            to: "Arithmetic Progressions (Ch.5)", 
            type: "Indirect", 
            icon: "🔢", 
            color: "#f59e0b",
            note: "Common differences in a sequence don't have to be integers; they can be any real number, including fractions or roots." 
        },
        { 
            from: "Real Numbers (Ch.1)", 
            to: "Surface Areas & Volumes (Ch.13)", 
            type: "Direct", 
            icon: "📦", 
            color: "#ec4899",
            note: "Exact answers for volumes of cones and spheres often involve $\\pi$ and $\\sqrt{h^2+r^2}$, requiring irrational number handling." 
        }
    ],
    realWorld: [
        {
            title: "Encryption & Cybersecurity",
            desc: "The HCF and Prime Factorisation of massive numbers are the security walls that protect your passwords and bank details.",
            impact: "Critical"
        },
        {
            title: "Music & Sound Waves",
            desc: "The ratios between musical notes are real numbers. Frequencies of notes often involve irrational powers like $2^{\\frac{1}{12}}$.",
            impact: "High"
        },
        {
            title: "Architecture & Scaling",
            desc: "The 'Golden Ratio' ($\\approx 1.618$) is an irrational number found in nature and used for aesthetically pleasing designs.",
            impact: "Aesthetic"
        }
    ]
};

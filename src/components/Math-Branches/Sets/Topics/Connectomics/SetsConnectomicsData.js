export const setsConnectomicsData = {
    connections: [
        { 
            from: "Sets (Ch.1)", 
            to: "Relations & Functions (Ch.2)", 
            type: "Direct", 
            icon: "🧬", 
            color: "#6366f1",
            note: "Sets define domains and codomains of functions. You cannot have a relation without first having two sets to connect!" 
        },
        { 
            from: "Sets (Ch.1)", 
            to: "Probability (Ch.16)", 
            type: "Direct", 
            icon: "🎲", 
            color: "#0d9488",
            note: "Sample spaces and events are defined using sets. Probability theory is essentially Set Theory with a measure of likelihood." 
        },
        { 
            from: "Sets (Ch.1)", 
            to: "Sequences & Series (Ch.9)", 
            type: "Fundamental", 
            icon: "📉", 
            color: "#7c3aed",
            note: "Indexing sets, and understanding the range of a sequence depends on set notation." 
        },
        { 
            from: "Sets (Ch.1)", 
            to: "Mathematical Logic", 
            type: "Mirror", 
            icon: "🧠", 
            color: "#f59e0b",
            note: "Set operations mirror logical connectives. Union (∪) is OR, Intersection (∩) is AND, and Complement (') is NOT." 
        },
        { 
            from: "Sets (Ch.1)", 
            to: "Trigonometry (Ch.3)", 
            type: "Indirect", 
            icon: "📐", 
            color: "#ec4899",
            note: "Domain and Range of trigonometric functions are always expressed using set intervals like $[ -1, 1 ]$." 
        }
    ],
    realWorld: [
        {
            title: "Database Management (SQL)",
            desc: "Every database query you run relies on set theory (JOINs are intersections, UNIONs are unions).",
            impact: "High"
        },
        {
            title: "Search Engines",
            desc: "Google uses set theory to filter billions of pages based on your search keywords.",
            impact: "Essential"
        },
        {
            title: "Genetics",
            desc: "Gene pools and trait analysis model biological inheritance using set interactions.",
            impact: "Emerging"
        }
    ]
};

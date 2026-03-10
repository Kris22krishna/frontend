export const setsExamEdgeData = {
    exams: [
        {
            name: "JEE Mains",
            color: "#f59e0b",
            emoji: "🥇",
            weightage: "4-8 marks",
            freq: "1-2 questions per year",
            topics: ["Inclusion-Exclusion principle", "Venn diagram word problems", "Power set size (2ⁿ)", "Cardinal numbers"],
            strategy: "Focus on formula application. Draw Venn diagram before solving ANY problem. Inclusion-Exclusion is the most tested concept.",
            pitfalls: ["{∅} ≠ ∅", "A ⊂ B does NOT mean B ⊂ A", "n(A - B) = n(A) - n(A ∩ B)"],
        },
        {
            name: "JEE Advanced",
            color: "#ef4444",
            emoji: "🔬",
            weightage: "4-12 marks",
            freq: "Used in Probability and Combinatorics",
            topics: ["De Morgan's Laws proofs", "Set theory logic equivalences", "Countability (finite vs infinite)", "Symmetric difference properties"],
            strategy: "Understand WHY laws work, not just WHAT they say. Connect Set operations to Logical operators for matrix-style MCQs.",
            pitfalls: ["Symmetric difference is associative but not distributive over ∩", "Complement depends on Universal Set U — always define U first"],
        },
        {
            name: "MHT-CET / AIIMS",
            color: "#8b5cf6",
            emoji: "📋",
            weightage: "2-4 marks",
            freq: "1-2 direct formula questions",
            topics: ["Types of sets (empty, finite, infinite)", "Basic operations (∪, ∩, −)", "Simple Venn diagram counting", "Equal vs equivalent sets"],
            strategy: "Direct NCERT questions. Memorize all definitions verbatim. Power set formula 2ⁿ and Inclusion-Exclusion are sure shots.",
            pitfalls: ["Difference between EQUAL sets and EQUIVALENT sets (equal cardinality)"],
        },
        {
            name: "KCET (Karnataka)",
            color: "#0d9488",
            emoji: "🌟",
            weightage: "3-6 marks",
            freq: "2-3 questions per year",
            topics: ["Set builder notation", "Operations and laws", "Venn diagram problems", "Complement and De Morgan's"],
            strategy: "KCET focuses on NCERT examples. Practice all NCERT examples and exercises. Venn diagram problems with 3 sets are common.",
            pitfalls: ["n(A ∪ B ∪ C) formula — students often forget the +n(A ∩ B ∩ C) term at the end"],
        }
    ],
    proTips: [
        "Venn Diagrams prevent 90% of logical errors. Draw them even if you feel confident!",
        "Double-check 'well-defined'. Set of 'Smart students' is NOT a set, but 'Students > 90%' IS a set.",
        "Memorize the 2ⁿ formula for Power Sets — it's a guaranteed scorer in CETs."
    ]
};

export const matterExamEdgeData = {
    exams: [
        {
            name: "CBSE Board",
            emoji: "🏫",
            color: "#0ea5e9",
            weightage: "High (5-8 Marks)",
            freq: "Every Year",
            topics: ["States of Matter Characteristics", "Latent Heat", "Evaporation Factors"],
            strategy: "Focus on definitions and activity-based questions. Always mention 'Kinetic Theory' or 'Force of Attraction' in explanations of physical states.",
            pitfalls: [
                "Mixing up Latent Heat of Fusion with Vaporization.",
                "Forgetting the unit 'Kelvin' in temperature numericals.",
                "Not mentioning 'Surface Phenomenon' when describing evaporation."
            ],
            questions: [
                {
                    q: "Why does our palm feel cold when we put some acetone or petrol on it?",
                    a: "Acetone particles gain energy from your palm or surroundings and evaporate. Evaporation is a cooling process because the particles take the latent heat of vaporization from the surface (palm), leaving it cool."
                },
                {
                    q: "Convert $273^{\\circ}C$ to Kelvin scale.",
                    a: "$T(K) = T(^{\\circ}C) + 273$. So, $273 + 273 = 546 K$."
                }
            ]
        },
        {
            name: "Competitive / Olympiad",
            emoji: "🏆",
            color: "#6366f1",
            weightage: "Medium (3-4 Qs)",
            freq: "Common",
            topics: ["Kelvin-Celsius Conversion", "Effect of Pressure on Gases", "Sublimation Materials"],
            strategy: "Master the relationship between Pressure, Temperature, and Volume. Understand the anomalous behavior of water (density at $4^{\\circ}C$).",
            pitfalls: [
                "Assuming all solids melt at the same temperature.",
                "Ignoring the effect of atmospheric pressure on boiling point."
            ],
            questions: [
                {
                    q: "Which state of matter has the highest compressibility and why?",
                    a: "Gases have the highest compressibility. This is because there are large intermolecular spaces between gas particles, which can be reduced by applying pressure."
                }
            ]
        }
    ],
    proTips: [
        "Use $T(K) = T(^{\\circ}C) + 273$ for all calculations.",
        "Remember: Evaporation is a surface phenomenon, while Boiling is a bulk phenomenon.",
        "Latent heat does NOT increase temperature; it only changes the state."
    ]
};

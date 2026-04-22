export const solutionsExamEdgeData = {
    exams: [
        {
            name: "CBSE Board",
            emoji: "📝",
            color: "#3b82f6",
            weightage: "7 Marks",
            freq: "Very High",
            topics: [
                "Raoult's Law & Henry's Law Numericals",
                "Colligative Properties (ΔTb & ΔTf)",
                "Positive vs Negative Deviations",
                "Vant Hoff Factor (i) - Association/Dissociation",
                "Osmotic Pressure of Isotonic Solutions"
            ],
            strategy: "Focus heavily on numericals for Raoult's law and Colligative properties. Practice using the Van't Hoff factor (i) for electrolytes because boards frequently test whether you realize a solute dissociates (like NaCl) or associates (like Acetic acid in benzene). Theoretical questions usually ask for differences between Ideal and Non-ideal solutions.",
            pitfalls: [
                "Forgetting to multiply by Van't Hoff factor 'i' for electrolytes.",
                "Confusing Molarity (depends on T) with Molality (independent of T).",
                "Making unit errors in R (Gas constant) during Osmotic pressure calculation (use 0.0821 L atm K^-1 mol^-1 if pressure is in atm)."
            ],
            questions: [
                {
                    q: "State Henry's Law and mention its two important applications.",
                    a: "Henry's Law states that at a constant temperature, the solubility of a gas in a liquid is directly proportional to the partial pressure of the gas present above the surface of liquid or solution ($p = K_H x$). \n**Applications:** \n1. To increase the solubility of $CO_2$ in soft drinks, the bottle is sealed under high pressure.\n2. Scuba divers use air diluted with helium to avoid 'the bends' (toxic effects of high concentration of nitrogen in blood)."
                },
                {
                    q: "Differentiate between positive and negative deviations from Raoult's law.",
                    a: "**Positive Deviation:** Interactions between A-B are weaker than A-A or B-B. Vapour pressure is higher than predicted. $\\Delta H_{mix} > 0$, $\\Delta V_{mix} > 0$. Example: Ethanol + Acetone.\n**Negative Deviation:** Interactions between A-B are stronger than A-A or B-B. Vapour pressure is lower than predicted. $\\Delta H_{mix} < 0$, $\\Delta V_{mix} < 0$. Example: Chloroform + Acetone."
                },
                {
                    q: "Why is an increase in temperature observed on mixing chloroform and acetone?",
                    a: "Chloroform and acetone form strong hydrogen bonds with each other. The A-B interactions become stronger than A-A and B-B interactions. This leads to a negative deviation from Raoult's law, and since energy is released when stronger bonds form, the process is exothermic ($\\Delta H_{mix} < 0$), causing the temperature to rise."
                }
            ]
        },
        {
            name: "JEE Main",
            emoji: "🎯",
            color: "#ec4899",
            weightage: "1-2 Questions",
            freq: "Guaranteed",
            topics: [
                "Depression in Freezing Point Numericals",
                "Van't Hoff factor & Degree of Dissociation/Association",
                "Relative Lowering of Vapour Pressure",
                "Azeotropes Phase Diagrams"
            ],
            strategy: "JEE Main loves mixing concepts. Expect a question where a solute is added, and you need to calculate the new freezing point, but you must first calculate 'i' from the degree of dissociation ($\\alpha$). Be extremely careful with units and approximation. Often, for dilute solutions, $(n_1 + n_2) \\approx n_1$ is used in RLVP calculations.",
            pitfalls: [
                "Ignoring the degree of dissociation ($\\alpha$) and assuming 100% dissociation.",
                "Mixing up the formulas for association vs dissociation.",
                "Rounding off too early in calculation-heavy problems."
            ]
        },
        {
            name: "NEET",
            emoji: "🩺",
            color: "#10b981",
            weightage: "2 Questions",
            freq: "Very High",
            topics: [
                "Osmotic Pressure (Isotonic, Hypertonic, Hypotonic)",
                "Henry's Law Conceptuals",
                "Colligative Property vs Number of Particles",
                "Simple Raoult's Law calculations"
            ],
            strategy: "NEET focuses heavily on speed and accuracy. Many questions don't require full calculation—just compare the effective number of particles ($i \\times C$). For osmotic pressure, remember that Isotonic solutions have the same osmotic pressure ($\\pi_1 = \\pi_2$) and thus the same concentration of particles ($C_1 i_1 = C_2 i_2$).",
            pitfalls: [
                "Spending too much time calculating exact values when a ratio or comparison of $i \\times C$ is enough.",
                "Forgetting that non-electrolytes (glucose, urea, sucrose) have $i = 1$."
            ]
        }
    ],
    proTips: [
        "**The 'i' Factor is Everything:** If the solute is NaCl, $i=2$. If $BaCl_2$, $i=3$. If Glucose, $i=1$. Always check the solute before plugging into $\\Delta T_b$, $\\Delta T_f$, or $\\pi$!",
        "**Temperature Dependence:** Only concentration terms with 'Volume' in their formula (Molarity, Formality) change with temperature. Mass-based terms (Molality, Mole fraction, %w/w) are temperature independent.",
        "**Azeotrope Trick:** Positive deviation = Minimum boiling azeotrope. Negative deviation = Maximum boiling azeotrope. Think: 'Positive means it escapes easily, so it boils earlier (minimum).'"
    ]
};

import { SLUG_TO_NODE_ID } from '@/lib/curriculumIds';

export const CORE_CONCEPTS = [
    {
        "id": "1.1",
        "nodeId": SLUG_TO_NODE_ID['g12-chem-solutions-types'],
        "title": "Types of Solutions",
        "subtitle": "Binary Solutions",
        "desc": "Understand how solutions are classified based on the physical state of the solvent and solute.",
        "icon": "🧪",
        "color": "#f59e0b",
        "learn": {
            "concept": "A solution is a homogeneous mixture of two or more non-reacting substances. In a binary solution, there is one solute and one solvent. The physical state of the solvent determines the physical state of the resulting solution.",
            "rules": [
                {
                    "title": "Gaseous Solutions",
                    "f": "\\text{Gas in Gas, Liquid in Gas, Solid in Gas}",
                    "d": "The solvent is a gas. All gaseous mixtures are solutions because gases mix completely.",
                    "tip": "Examples: Air (Gas/Gas), Chloroform mixed with N2 (Liquid/Gas), Camphor in N2 (Solid/Gas).",
                    "ex": "O_2 + N_2 \\rightarrow \\text{Air}",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Liquid Solutions",
                    "f": "\\text{Gas in Liquid, Liquid in Liquid, Solid in Liquid}",
                    "d": "The solvent is a liquid. These are the most common types of solutions studied in chemistry.",
                    "tip": "Examples: CO2 in water (Gas/Liquid), Ethanol in water (Liquid/Liquid), Sugar in water (Solid/Liquid).",
                    "ex": "NaCl(s) + H_2O(l) \\rightarrow NaCl(aq)",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Solid Solutions",
                    "f": "\\text{Gas in Solid, Liquid in Solid, Solid in Solid}",
                    "d": "The solvent is a solid. Alloys are the most common examples of solid solutions.",
                    "tip": "Examples: Solution of H2 in Pd (Gas/Solid), Amalgam of Hg with Na (Liquid/Solid), Copper dissolved in Gold (Solid/Solid).",
                    "ex": "Cu + Au \\rightarrow \\text{Gold Alloy}",
                    "practice": [],
                    "assessment": []
                }
            ]
        },
        "practice": [
            {
                "question": "Q1: In a binary solution, the component present in larger quantity is called?",
                "options": ["Solute", "Solvent", "Precipitate", "Residue"],
                "correct": 1,
                "explanation": "The solvent is the dissolving medium, present in larger amount."
            },
            {
                "question": "Q2: An amalgam of mercury with sodium is an example of which type of solution?",
                "options": ["Solid in Liquid", "Liquid in Solid", "Liquid in Liquid", "Solid in Solid"],
                "correct": 1,
                "explanation": "Mercury (liquid) is dissolved in Sodium (solid)."
            }
        ],
        "assessment": [
            {
                "question": "Q1: Which of the following is an example of a gas in solid solution?",
                "options": ["Air", "Carbonated water", "Hydrogen in Palladium", "Brass"],
                "correct": 2,
                "explanation": "Hydrogen gas dissolved in solid palladium metal is a gas in solid solution."
            }
        ]
    },
    {
        "id": "1.2",
        "nodeId": SLUG_TO_NODE_ID['g12-chem-solutions-concentration'],
        "title": "Expressing Concentration",
        "subtitle": "Quantifying Solutions",
        "desc": "Learn the formulas to express the amount of solute present in a given amount of solvent or solution.",
        "icon": "⚖️",
        "color": "#14b8a6",
        "learn": {
            "concept": "Concentration can be expressed qualitatively (dilute, concentrated) or quantitatively (Molarity, Molality, Mole fraction, Mass percentage).",
            "rules": [
                {
                    "title": "Mass Percentage (w/w)",
                    "f": "\\text{Mass \\%} = \\frac{\\text{Mass of component}}{\\text{Total mass of solution}} \\times 100",
                    "d": "Mass percentage of a component is the mass of the component per 100 parts by mass of the solution.",
                    "tip": "Useful in industrial chemical applications.",
                    "ex": "\\text{10\\% glucose in water means 10g glucose in 90g water.}",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Mole Fraction (x)",
                    "f": "x_A = \\frac{n_A}{n_A + n_B}",
                    "d": "Ratio of number of moles of one component to total number of moles in the solution.",
                    "tip": "The sum of mole fractions of all components is always 1.",
                    "ex": "x_A + x_B = 1",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Molarity (M) & Molality (m)",
                    "f": "M = \\frac{n}{V(L)}, \\quad m = \\frac{n}{W(kg)}",
                    "d": "Molarity is moles of solute per liter of solution. Molality is moles of solute per kg of solvent.",
                    "tip": "Molarity depends on temperature because volume changes with temperature. Molality is temperature independent.",
                    "ex": "1 \\text{ M } NaCl, \\quad 1 \\text{ m } NaCl",
                    "practice": [],
                    "assessment": []
                }
            ]
        },
        "practice": [
            {
                "question": "Q1: Which of the following concentration terms is independent of temperature?",
                "options": ["Molarity", "Normality", "Molality", "Formality"],
                "correct": 2,
                "explanation": "Molality involves masses, which do not change with temperature. Molarity involves volume, which does."
            }
        ],
        "assessment": [
            {
                "question": "Q1: If 2 moles of solute are dissolved in 2 liters of solution, what is the Molarity?",
                "options": ["1 M", "2 M", "4 M", "0.5 M"],
                "correct": 0,
                "explanation": "Molarity = Moles / Volume = 2 / 2 = 1 M."
            }
        ]
    },
    {
        "id": "1.3",
        "nodeId": SLUG_TO_NODE_ID['g12-chem-solutions-solubility'],
        "title": "Solubility",
        "subtitle": "Henry's Law",
        "desc": "Understand how temperature and pressure affect the maximum amount of solute that can be dissolved.",
        "icon": "🌊",
        "color": "#3b82f6",
        "learn": {
            "concept": "Solubility of a substance is its maximum amount that can be dissolved in a specified amount of solvent. It depends on the nature of solute and solvent, temperature, and pressure.",
            "rules": [
                {
                    "title": "Solubility of Solid in Liquid",
                    "f": "\\text{Dynamic Equilibrium: Dissolution } \\rightleftharpoons \\text{ Crystallisation}",
                    "d": "Follows 'like dissolves like'. Endothermic dissolution increases solubility with temperature. Exothermic decreases it.",
                    "tip": "Pressure has no significant effect on solids since they are incompressible.",
                    "ex": "\\text{NaCl dissolves in water (polar in polar)}",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Solubility of Gas in Liquid & Henry's Law",
                    "f": "p = K_H \\cdot x",
                    "d": "The partial pressure of the gas in vapour phase (p) is proportional to the mole fraction of the gas (x) in the solution.",
                    "tip": "Higher KH means lower solubility at a given pressure.",
                    "ex": "\\text{CO}_2 \\text{ in soft drinks at high pressure}",
                    "practice": [],
                    "assessment": []
                }
            ]
        },
        "practice": [
            {
                "question": "Q1: According to Henry's Law, solubility of a gas in a liquid:",
                "options": ["Increases with increase in temperature", "Increases with increase in pressure", "Decreases with increase in pressure", "Is independent of pressure"],
                "correct": 1,
                "explanation": "Henry's Law states partial pressure is proportional to mole fraction (solubility)."
            }
        ],
        "assessment": [
            {
                "question": "Q1: The value of Henry's constant KH is:",
                "options": ["Greater for gases with higher solubility", "Greater for gases with lower solubility", "Constant for all gases", "Independent of temperature"],
                "correct": 1,
                "explanation": "Since p = KH * x, for a given pressure p, a higher KH means a lower mole fraction x (lower solubility)."
            }
        ]
    },
    {
        "id": "1.4",
        "nodeId": SLUG_TO_NODE_ID['g12-chem-solutions-vapour-pressure'],
        "title": "Vapour Pressure",
        "subtitle": "Raoult's Law",
        "desc": "Analyze the pressure exerted by vapours over liquid solutions.",
        "icon": "☁️",
        "color": "#8b5cf6",
        "learn": {
            "concept": "Vapour pressure is the pressure exerted by the vapour in equilibrium with its liquid at a given temperature.",
            "rules": [
                {
                    "title": "Raoult's Law for Volatile Liquids",
                    "f": "p_1 = p_1^0 x_1",
                    "d": "For a solution of volatile liquids, the partial vapour pressure of each component is directly proportional to its mole fraction.",
                    "tip": "The total pressure over the solution phase is p_total = p1 + p2.",
                    "ex": "p_{total} = x_1p_1^0 + x_2p_2^0",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Raoult's Law as a case of Henry's Law",
                    "f": "p = K_H x \\quad \\text{vs} \\quad p_i = p_i^0 x_i",
                    "d": "If we compare both laws, we see they are mathematically identical, just the proportionality constant differs ($K_H$ vs $p_i^0$).",
                    "tip": "Raoult's Law becomes a special case of Henry's Law when $K_H$ becomes equal to $p_i^0$.",
                    "ex": "K_H = p_i^0",
                    "practice": [],
                    "assessment": []
                }
            ]
        },
        "practice": [
            {
                "question": "Q1: According to Raoult's law, relative lowering of vapour pressure is equal to:",
                "options": ["Mole fraction of solvent", "Mole fraction of solute", "Molarity of solution", "Molality of solution"],
                "correct": 1,
                "explanation": "(P0 - P)/P0 = x_solute"
            }
        ],
        "assessment": [
            {
                "question": "Q1: The vapour pressure of a pure liquid A is 100 torr. What is its partial pressure in a solution where its mole fraction is 0.5?",
                "options": ["50 torr", "100 torr", "200 torr", "0 torr"],
                "correct": 0,
                "explanation": "pA = xA * pA0 = 0.5 * 100 = 50 torr."
            }
        ]
    },
    {
        "id": "1.5",
        "nodeId": SLUG_TO_NODE_ID['g12-chem-solutions-ideal'],
        "title": "Ideal & Non-Ideal",
        "subtitle": "Deviations & Azeotropes",
        "desc": "Distinguish between ideal and non-ideal solutions and understand azeotropic mixtures.",
        "icon": "📈",
        "color": "#ec4899",
        "learn": {
            "concept": "Liquid-liquid solutions can be classified into ideal and non-ideal solutions on the basis of Raoult's law.",
            "rules": [
                {
                    "title": "Ideal Solutions",
                    "f": "\\Delta H_{mix} = 0, \\quad \\Delta V_{mix} = 0",
                    "d": "Obey Raoult's law exactly over the entire range of concentration. Intermolecular attractive forces between A-A and B-B are nearly equal to those between A-B.",
                    "tip": "Examples: n-hexane and n-heptane, bromoethane and chloroethane.",
                    "ex": "p_i = p_i^0 x_i \\text{ exactly}",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Non-Ideal Solutions",
                    "f": "p_i \\neq p_i^0 x_i",
                    "d": "Do not obey Raoult's law. Can show positive deviation (VP is higher than expected, A-B interactions weaker) or negative deviation (VP is lower than expected, A-B interactions stronger).",
                    "tip": "Positive: Ethanol+Acetone. Negative: Chloroform+Acetone (due to H-bonding).",
                    "ex": "\\Delta H_{mix} \\neq 0",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Azeotropes",
                    "f": "\\text{Minimum & Maximum Boiling}",
                    "d": "Binary mixtures having the same composition in liquid and vapour phase and boil at a constant temperature. They cannot be separated by fractional distillation.",
                    "tip": "Positive deviation leads to minimum boiling azeotrope (e.g. 95% ethanol). Negative deviation leads to maximum boiling azeotrope (e.g. 68% Nitric acid).",
                    "ex": "\\text{Ethanol-Water Azeotrope}",
                    "practice": [],
                    "assessment": []
                }
            ]
        },
        "practice": [
            {
                "question": "Q1: A mixture showing large positive deviation from Raoult's law forms:",
                "options": ["Minimum boiling azeotrope", "Maximum boiling azeotrope", "Ideal solution", "Colloidal solution"],
                "correct": 0,
                "explanation": "Positive deviation means higher vapour pressure, which means it boils at a lower temperature."
            }
        ],
        "assessment": [
            {
                "question": "Q1: Which condition holds for an ideal solution?",
                "options": ["ΔH_mix > 0", "ΔV_mix < 0", "ΔH_mix = 0, ΔV_mix = 0", "ΔS_mix = 0"],
                "correct": 2,
                "explanation": "For an ideal solution, enthalpy and volume of mixing are both zero."
            }
        ]
    },
    {
        "id": "1.6",
        "nodeId": SLUG_TO_NODE_ID['g12-chem-solutions-colligative'],
        "title": "Colligative Properties",
        "subtitle": "Number over Nature",
        "desc": "Properties depending purely on the count of solute particles.",
        "icon": "🧊",
        "color": "#10b981",
        "learn": {
            "concept": "Properties of dilute solutions containing non-volatile solute which depend only on the number of solute particles and not on their nature.",
            "rules": [
                {
                    "title": "Relative Lowering of Vapour Pressure",
                    "f": "\\frac{p_1^0 - p_1}{p_1^0} = x_2",
                    "d": "When a non-volatile solute is added, the vapour pressure of the solvent decreases. The relative lowering is equal to the mole fraction of the solute.",
                    "tip": "Can be used to determine molar mass of solute.",
                    "ex": "\\frac{\\Delta p}{p_1^0} = x_2",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Elevation of Boiling Point",
                    "f": "\\Delta T_b = K_b \\cdot m",
                    "d": "Boiling point of solution is always higher than that of the pure solvent. The elevation is proportional to molality (m).",
                    "tip": "Kb is the Ebullioscopic constant (K kg / mol).",
                    "ex": "T_b - T_b^0 = K_b \\cdot m",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Depression of Freezing Point",
                    "f": "\\Delta T_f = K_f \\cdot m",
                    "d": "Freezing point of solution is always lower than pure solvent. Proportional to molality.",
                    "tip": "Kf is the Cryoscopic constant.",
                    "ex": "T_f^0 - T_f = K_f \\cdot m",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Osmotic Pressure",
                    "f": "\\pi = CRT",
                    "d": "The extra pressure applied to the solution to just stop the flow of solvent into it through a semipermeable membrane.",
                    "tip": "This property is widely used to determine molar masses of proteins, polymers and other macromolecules.",
                    "ex": "\\pi = \\frac{n_2}{V} RT",
                    "practice": [],
                    "assessment": []
                }
            ]
        },
        "practice": [
            {
                "question": "Q1: Colligative properties depend on:",
                "options": ["Nature of solute", "Nature of solvent", "Number of solute particles", "Physical state of solute"],
                "correct": 2,
                "explanation": "Colligative means 'collected together', depending purely on quantity."
            }
        ],
        "assessment": [
            {
                "question": "Q1: Which colligative property is preferred for determining the molar mass of macromolecules?",
                "options": ["Relative lowering of VP", "Elevation of BP", "Depression of FP", "Osmotic pressure"],
                "correct": 3,
                "explanation": "Osmotic pressure is measured at room temperature and its magnitude is large even for dilute solutions, making it ideal for biomolecules."
            }
        ]
    }
];

const mcq = (question, answer, distractors, explanation) => ({
    question,
    options: [answer, ...distractors],
    correct: 0,
    answer,
    explanation
});

const pickDistractors = (pool, answer, count = 3) =>
    pool.filter((item) => item !== answer).slice(0, count);

const TYPE_LABELS = [
    'Gas in gas',
    'Liquid in gas',
    'Solid in gas',
    'Gas in liquid',
    'Liquid in liquid',
    'Solid in liquid',
    'Gas in solid',
    'Liquid in solid',
    'Solid in solid'
];

const TYPE_EXAMPLES = [
    ['Air', 'Gas in gas', 'Air is mainly nitrogen and oxygen gases mixed uniformly.'],
    ['Oxygen dissolved in nitrogen', 'Gas in gas', 'Both components are gases.'],
    ['Water vapour in air', 'Liquid in gas', 'Water vapour represents a liquid component dispersed in a gas.'],
    ['Chloroform vapour in nitrogen gas', 'Liquid in gas', 'A vapour from a liquid is mixed with gaseous nitrogen.'],
    ['Camphor in nitrogen gas', 'Solid in gas', 'Sublimed camphor particles are dispersed in a gas.'],
    ['Iodine vapour in air', 'Solid in gas', 'Iodine is a solid whose vapour mixes with air.'],
    ['CO2 in water', 'Gas in liquid', 'Carbon dioxide is the gas and water is the liquid solvent.'],
    ['Oxygen in water', 'Gas in liquid', 'Dissolved oxygen in water is a gas in liquid solution.'],
    ['Ethanol in water', 'Liquid in liquid', 'Both ethanol and water are liquids.'],
    ['Acetone in water', 'Liquid in liquid', 'Two miscible liquids form a liquid solution.'],
    ['Sugar in water', 'Solid in liquid', 'Sugar is a solid solute dissolved in liquid water.'],
    ['Salt in water', 'Solid in liquid', 'Sodium chloride dissolves as a solid solute in water.'],
    ['Hydrogen in palladium', 'Gas in solid', 'Hydrogen gas dissolves in solid palladium.'],
    ['Dissolved H2 in platinum', 'Gas in solid', 'A gas absorbed into a metal is gas in solid.'],
    ['Mercury in sodium amalgam', 'Liquid in solid', 'Liquid mercury is dissolved in solid sodium.'],
    ['Mercury in zinc amalgam', 'Liquid in solid', 'The amalgam has a liquid metal component in a solid metal.'],
    ['Brass', 'Solid in solid', 'Brass is an alloy of copper and zinc.'],
    ['Bronze', 'Solid in solid', 'Bronze is an alloy and therefore a solid in solid solution.'],
    ['Copper in gold', 'Solid in solid', 'A metal dissolved in another solid metal forms a solid solution.']
];

const typePractice = [
    mcq('In a binary solution, the component present in larger amount is called what?', 'Solvent', ['Solute', 'Residue', 'Suspension'], 'The solvent is usually present in larger amount and acts as the dissolving medium.'),
    mcq('In a binary solution, the component present in smaller amount is usually called what?', 'Solute', ['Solvent', 'Emulsion', 'Alloy'], 'The solute is the substance dissolved in the solvent.'),
    mcq('The physical state of a solution is decided by the physical state of which component?', 'Solvent', ['Solute', 'Catalyst', 'Indicator'], 'The solvent determines whether the solution is gaseous, liquid, or solid.'),
    mcq('Which term best describes a solution?', 'Homogeneous mixture', ['Heterogeneous mixture', 'Pure compound', 'Suspension only'], 'A solution has uniform composition throughout.'),
    mcq('How many components are present in a binary solution?', 'Two', ['One', 'Three', 'Four'], 'Binary means two components, one solute and one solvent.'),
    mcq('Which type of solution is most commonly represented by alloys?', 'Solid solution', ['Gaseous solution', 'Aqueous solution only', 'Colloidal solution'], 'Alloys are usually solid in solid solutions.'),
    mcq('Which state of solvent gives a gaseous solution?', 'Gas', ['Liquid', 'Solid', 'Plasma'], 'The solvent decides the final state of the solution.'),
    mcq('Which state of solvent gives a liquid solution?', 'Liquid', ['Gas', 'Solid', 'Crystal'], 'Liquid solvent produces a liquid solution.'),
    ...TYPE_EXAMPLES.map(([sample, type, explanation], index) =>
        mcq(`Classify this solution example ${index + 1}: ${sample}.`, type, pickDistractors(TYPE_LABELS, type), explanation)
    )
];

const typeAssessment = [
    ...TYPE_EXAMPLES.slice(0, 15).map(([sample, type, explanation], index) =>
        mcq(`Assessment ${index + 1}: Which solution type is shown by ${sample}?`, type, pickDistractors(TYPE_LABELS.slice().reverse(), type), explanation)
    ),
    mcq('A solution has a solid solvent and a gaseous solute. What is its type?', 'Gas in solid', ['Solid in gas', 'Gas in liquid', 'Liquid in solid'], 'The phrase names solute first and solvent second.'),
    mcq('A solution has a liquid solvent and a solid solute. What is its type?', 'Solid in liquid', ['Liquid in solid', 'Solid in solid', 'Gas in liquid'], 'Salt or sugar in water are solid in liquid solutions.'),
    mcq('Which pair is a solid in solid solution?', 'Copper and zinc in brass', ['CO2 and water', 'Ethanol and water', 'Water vapour and air'], 'Brass is an alloy, so both major components are solids.')
];

const concentrationFacts = [
    ['Which concentration term is independent of temperature?', 'Molality', ['Molarity', 'Normality', 'Volume percent'], 'Molality uses mass of solvent, and mass does not change with temperature.'],
    ['Which concentration term uses moles of solute per litre of solution?', 'Molarity', ['Molality', 'Mole fraction', 'Mass percent'], 'Molarity is n/V in litres of solution.'],
    ['Which concentration term uses moles of solute per kilogram of solvent?', 'Molality', ['Molarity', 'Mole fraction', 'Volume percent'], 'Molality is n divided by mass of solvent in kg.'],
    ['What is the sum of mole fractions of all components in a solution?', '1', ['0', '100', 'Depends on temperature'], 'Mole fractions are parts of the whole mixture, so their sum is 1.'],
    ['Which unit is commonly used for very dilute solutions?', 'ppm', ['kg mol-1', 'atm', 'torr'], 'Parts per million is convenient for trace concentrations.'],
    ['Which concentration term is mass of component per 100 parts by mass of solution?', 'Mass percentage', ['Molarity', 'Mole fraction', 'Henry constant'], 'Mass percent is mass of component divided by total mass times 100.'],
    ['Why can molarity change with temperature?', 'Solution volume changes', ['Moles of solute vanish', 'Mass of solute changes greatly', 'Mole fraction must become zero'], 'Molarity depends on volume, and volume expands or contracts with temperature.'],
    ['Which expression represents mole fraction of A in a binary solution?', 'nA / (nA + nB)', ['nA / volume', 'mass A / total volume', 'nB / nA'], 'Mole fraction is moles of one component divided by total moles.'],
    ['A 10 percent w/w glucose solution means 10 g glucose in how much solution?', '100 g solution', ['100 g solvent', '10 L solution', '90 L solvent'], 'Mass percent is per 100 g of solution.'],
    ['Which term is defined with volume of solution, not mass of solvent?', 'Molarity', ['Molality', 'Mass fraction', 'Mole fraction'], 'Molarity uses litres of solution.'],
    ['Which quantity is present in the denominator of molality?', 'Mass of solvent in kg', ['Volume of solution in L', 'Total pressure', 'Moles of solvent only'], 'Molality is moles solute per kilogram solvent.'],
    ['Which quantity is present in the denominator of molarity?', 'Volume of solution in L', ['Mass of solvent in kg', 'Mass of solute in g', 'Mole fraction of solvent'], 'Molarity is moles solute per litre solution.']
];

const molarityCases = [
    [2, 2, '1 M'], [3, 1, '3 M'], [0.5, 1, '0.5 M'], [4, 2, '2 M'], [1.5, 0.5, '3 M'],
    [0.25, 0.5, '0.5 M'], [5, 2.5, '2 M'], [1, 4, '0.25 M']
];

const molalityCases = [
    [2, 1, '2 m'], [3, 1.5, '2 m'], [0.5, 0.25, '2 m'], [1, 2, '0.5 m'], [4, 2, '2 m'],
    [1.2, 0.6, '2 m']
];

const massPercentCases = [
    ['10 g solute in 100 g solution', '10 percent'], ['5 g solute in 50 g solution', '10 percent'],
    ['20 g solute in 200 g solution', '10 percent'], ['25 g solute in 100 g solution', '25 percent'],
    ['2 g solute in 100 g solution', '2 percent'], ['15 g solute in 150 g solution', '10 percent']
];

const concentrationPractice = [
    ...concentrationFacts.map(([question, answer, distractors, explanation], index) => mcq(`Practice ${index + 1}: ${question}`, answer, distractors, explanation)),
    ...molarityCases.map(([moles, volume, answer], index) =>
        mcq(`Find molarity ${index + 1}: ${moles} mol solute is present in ${volume} L solution.`, answer, ['1 M', '2 M', '4 M'].filter((item) => item !== answer).slice(0, 3), 'Molarity = moles of solute / volume of solution in litres.')
    ),
    ...molalityCases.map(([moles, kg, answer], index) =>
        mcq(`Find molality ${index + 1}: ${moles} mol solute is dissolved in ${kg} kg solvent.`, answer, ['0.5 m', '1 m', '2 m', '4 m'].filter((item) => item !== answer).slice(0, 3), 'Molality = moles of solute / kg of solvent.')
    ),
    ...massPercentCases.map(([given, answer], index) =>
        mcq(`Find mass percent ${index + 1}: ${given}.`, answer, ['5 percent', '10 percent', '20 percent', '25 percent'].filter((item) => item !== answer).slice(0, 3), 'Mass percent = mass of component / total mass of solution x 100.')
    )
];

const concentrationAssessment = [
    ...concentrationFacts.slice(0, 8).map(([question, answer, distractors, explanation], index) => mcq(`Assessment ${index + 1}: ${question}`, answer, distractors, explanation)),
    mcq('A solution contains 4 mol solute in 2 L solution. What is its molarity?', '2 M', ['0.5 M', '1 M', '4 M'], 'M = 4 / 2 = 2 M.'),
    mcq('A solution contains 1 mol solute in 2 kg solvent. What is its molality?', '0.5 m', ['1 m', '2 m', '4 m'], 'm = 1 / 2 = 0.5 m.'),
    mcq('A solution has 20 g solute in 100 g solution. What is the mass percent?', '20 percent', ['10 percent', '25 percent', '80 percent'], 'Mass percent = 20 / 100 x 100 = 20 percent.'),
    mcq('For a binary solution, nA = 2 and nB = 3. What is xA?', '0.4', ['0.2', '0.6', '1.5'], 'xA = 2 / (2 + 3) = 0.4.'),
    mcq('For a binary solution, xA = 0.35. What is xB?', '0.65', ['0.35', '1.35', '0.30'], 'The mole fractions add to 1, so xB = 1 - 0.35.'),
    mcq('Which concentration term should be preferred when temperature may change?', 'Molality', ['Molarity', 'Volume percent', 'Normality only'], 'Molality is based on mass rather than volume.'),
    mcq('Which concentration term is dimensionless?', 'Mole fraction', ['Molarity', 'Molality', 'ppm only'], 'Mole fraction is a ratio of moles to total moles.')
];

const solubilityFacts = [
    ['According to Henry law, gas solubility in a liquid increases when what increases?', 'Pressure of the gas', ['Temperature always', 'Volume of the flask only', 'Mass of solvent only'], 'Henry law connects dissolved gas amount with partial pressure.'],
    ['In p = KH x, what does x represent?', 'Mole fraction of gas in solution', ['Mass percent of solvent', 'Volume of gas', 'Moles of liquid solvent only'], 'x is the mole fraction of the gas in solution.'],
    ['For a fixed pressure, a larger KH means what?', 'Lower gas solubility', ['Higher gas solubility', 'No change in solubility', 'Gas becomes a solid'], 'x = p / KH, so larger KH gives smaller x.'],
    ['Why are soft drink bottles sealed under high pressure?', 'To dissolve more CO2', ['To remove all CO2', 'To freeze the water', 'To decrease vapour pressure only'], 'High CO2 pressure increases dissolved carbon dioxide.'],
    ['Why can divers suffer bends during ascent?', 'Dissolved gases come out as bubbles', ['Water boils in blood', 'Salt crystallises instantly', 'Oxygen becomes a metal'], 'Lower pressure reduces gas solubility, so bubbles can form.'],
    ['What is the effect of pressure on solubility of solids in liquids?', 'Negligible', ['Very large', 'Always decreases to zero', 'Converts solid to gas'], 'Solids and liquids are nearly incompressible.'],
    ['For many gases in liquids, increasing temperature usually does what?', 'Decreases solubility', ['Always increases solubility', 'Makes KH zero', 'Has no effect ever'], 'Gas dissolution is often exothermic, so higher temperature reduces solubility.'],
    ['Like dissolves like mainly refers to what?', 'Similar polarity', ['Similar colour', 'Similar density only', 'Similar boiling point only'], 'Polar solutes dissolve well in polar solvents, and non-polar in non-polar.'],
    ['At saturation, dissolution and crystallisation are in what state?', 'Dynamic equilibrium', ['Static imbalance', 'Complete reaction', 'Combustion'], 'At saturation, opposing rates become equal.'],
    ['Which factor strongly affects gas solubility in liquids?', 'Partial pressure', ['Shape of container only', 'Colour of gas', 'Mass of cork'], 'Gas solubility is pressure dependent.'],
    ['Which gas is intentionally dissolved in soda water?', 'CO2', ['N2 only', 'He', 'Ne'], 'Carbon dioxide gives soda its fizz.'],
    ['The solubility of a solid in liquid depends mainly on nature of solute, solvent, and what?', 'Temperature', ['Atmospheric pressure only', 'Container colour', 'Magnetic field only'], 'Temperature can change the dissolution equilibrium.'],
    ['Which equation is Henry law?', 'p = KH x', ['M = n/V', 'pi = CRT', 'Delta Tb = Kb m'], 'Henry law states pressure is proportional to mole fraction.'],
    ['When a soda bottle is opened, why does fizz appear?', 'Pressure above solution decreases', ['KH becomes zero', 'Water becomes non-polar', 'Sugar crystallises'], 'Lower pressure reduces CO2 solubility.'],
    ['Which statement about KH is correct?', 'It depends on gas, solvent, and temperature', ['It is same for all gases', 'It is always zero', 'It equals molarity'], 'Henry constant is specific to the gas-solvent pair and temperature.']
];

const henryCases = [
    ['p = 2 atm and KH = 1000 atm', '0.002', 'x = p / KH = 2 / 1000.'],
    ['p = 5 atm and KH = 1000 atm', '0.005', 'x = p / KH = 5 / 1000.'],
    ['p = 1 atm and KH = 500 atm', '0.002', 'x = 1 / 500.'],
    ['p = 4 atm and KH = 2000 atm', '0.002', 'x = 4 / 2000.'],
    ['p = 3 atm and KH = 1500 atm', '0.002', 'x = 3 / 1500.'],
    ['p = 10 atm and KH = 2000 atm', '0.005', 'x = 10 / 2000.'],
    ['x = 0.002 and KH = 1000 atm', '2 atm', 'p = KH x = 1000 x 0.002.'],
    ['x = 0.005 and KH = 1000 atm', '5 atm', 'p = KH x = 1000 x 0.005.']
];

const solubilityPractice = [
    ...solubilityFacts.map(([question, answer, distractors, explanation], index) => mcq(`Practice ${index + 1}: ${question}`, answer, distractors, explanation)),
    ...henryCases.map(([given, answer, explanation], index) =>
        mcq(`Henry law calculation ${index + 1}: ${given}. Find the requested value.`, answer, ['0.001', '0.002', '0.005', '2 atm', '5 atm'].filter((item) => item !== answer).slice(0, 3), explanation)
    )
];

const solubilityAssessment = [
    ...solubilityFacts.slice(0, 10).map(([question, answer, distractors, explanation], index) => mcq(`Assessment ${index + 1}: ${question}`, answer, distractors, explanation)),
    mcq('For a gas at the same pressure, gas A has KH = 500 atm and gas B has KH = 1000 atm. Which is more soluble?', 'Gas A', ['Gas B', 'Both exactly zero', 'Cannot compare KH'], 'At fixed pressure, lower KH means higher mole fraction dissolved.'),
    mcq('If pressure over CO2(aq) is doubled at constant temperature, dissolved CO2 approximately does what?', 'Doubles', ['Halves', 'Becomes zero', 'Stays impossible to predict'], 'Henry law gives direct proportionality between pressure and dissolved gas amount.'),
    mcq('In p = KH x, if x = 0.004 and KH = 500 atm, what is p?', '2 atm', ['0.002 atm', '4 atm', '500 atm'], 'p = 500 x 0.004 = 2 atm.'),
    mcq('Which situation best shows Henry law in daily life?', 'Fizz escaping from opened soda', ['Rusting of iron', 'Melting of ice', 'Burning magnesium'], 'Opening soda reduces pressure and dissolved CO2 escapes.')
];

const vapourFacts = [
    ['Raoult law for a volatile component is represented by which equation?', 'p1 = p1^0 x1', ['p = KH x2 only', 'M = n/V', 'Delta Tf = Kf m'], 'Partial vapour pressure is proportional to mole fraction.'],
    ['For a non-volatile solute, relative lowering of vapour pressure equals what?', 'Mole fraction of solute', ['Mole fraction of solvent', 'Molarity', 'Molality always'], 'For dilute ideal solutions, (p1^0 - p1) / p1^0 = x2.'],
    ['Adding a non-volatile solute to a solvent does what to solvent vapour pressure?', 'Lowers it', ['Raises it always', 'Makes it infinite', 'Does not affect it'], 'Fewer solvent molecules are available at the surface.'],
    ['For an ideal solution of volatile liquids, total vapour pressure equals what?', 'Sum of partial vapour pressures', ['Product of mole fractions', 'Only solute pressure', 'Only atmospheric pressure'], 'Dalton law applies to the vapour phase.'],
    ['If x1 increases, p1 for an ideal volatile component does what?', 'Increases', ['Decreases always', 'Becomes zero', 'Becomes independent of x1'], 'p1 = p1^0 x1.'],
    ['Raoult law can be seen as a special case of which law?', 'Henry law', ['Boyle law', 'Charles law', 'Faraday law'], 'Both have pressure proportional to mole fraction.'],
    ['For a pure liquid, the mole fraction of that liquid is what?', '1', ['0', '0.5', '100'], 'A pure component has mole fraction 1.'],
    ['The vapour pressure of a solution with non-volatile solute is lower than pure solvent because of what?', 'Lower escaping tendency of solvent', ['More gas molecules created', 'Solute becomes volatile always', 'Solvent mass disappears'], 'The surface has fewer solvent molecules per unit area.'],
    ['Which component contributes no vapour pressure in a non-volatile solute solution?', 'Non-volatile solute', ['Solvent', 'Volatile solvent', 'Vapour phase'], 'A non-volatile solute does not evaporate appreciably.'],
    ['The unit torr is used to measure what?', 'Pressure', ['Mole fraction', 'Molality', 'Mass percent'], 'Torr is a pressure unit.']
];

const raoultCases = [
    ['p1^0 = 100 torr and x1 = 0.5', '50 torr'], ['p1^0 = 200 torr and x1 = 0.25', '50 torr'],
    ['p1^0 = 120 torr and x1 = 0.5', '60 torr'], ['p1^0 = 80 torr and x1 = 0.75', '60 torr'],
    ['p1^0 = 150 torr and x1 = 0.2', '30 torr'], ['p1^0 = 90 torr and x1 = 0.4', '36 torr'],
    ['p1^0 = 60 torr and x1 = 0.5', '30 torr'], ['p1^0 = 300 torr and x1 = 0.1', '30 torr'],
    ['p1^0 = 100 torr and x2 = 0.2 for non-volatile solute', '20 torr lowering'],
    ['p1^0 = 200 torr and x2 = 0.1 for non-volatile solute', '20 torr lowering']
];

const vapourPractice = [
    ...vapourFacts.map(([question, answer, distractors, explanation], index) => mcq(`Practice ${index + 1}: ${question}`, answer, distractors, explanation)),
    ...raoultCases.map(([given, answer], index) =>
        mcq(`Raoult law calculation ${index + 1}: ${given}.`, answer, ['20 torr', '30 torr', '50 torr', '60 torr', '100 torr', '20 torr lowering'].filter((item) => item !== answer).slice(0, 3), 'Use p1 = p1^0 x1 or lowering = p1^0 x2.')
    )
];

const vapourAssessment = [
    ...vapourFacts.slice(0, 8).map(([question, answer, distractors, explanation], index) => mcq(`Assessment ${index + 1}: ${question}`, answer, distractors, explanation)),
    mcq('A pure liquid has vapour pressure 100 torr. In a solution, x = 0.4. What is its partial pressure?', '40 torr', ['25 torr', '60 torr', '100 torr'], 'p = x p0 = 0.4 x 100.'),
    mcq('If relative lowering of vapour pressure is 0.25, what is the solute mole fraction?', '0.25', ['0.75', '1.25', '0.50'], 'Relative lowering equals mole fraction of non-volatile solute.'),
    mcq('For two volatile liquids, pA = 30 torr and pB = 70 torr. What is total pressure?', '100 torr', ['40 torr', '70 torr', '2100 torr'], 'Total pressure is pA + pB.'),
    mcq('A non-volatile solute has x2 = 0.1 in solvent with p0 = 80 torr. What is lowering?', '8 torr', ['0.8 torr', '72 torr', '88 torr'], 'Lowering = p0 x2 = 80 x 0.1.'),
    mcq('Which law gives partial vapour pressure proportional to liquid-phase mole fraction?', 'Raoult law', ['Hess law', 'Ohm law', 'Avogadro law'], 'This is the statement of Raoult law for ideal solutions.')
];

const idealFacts = [
    ['For an ideal solution, Delta H_mix is what?', '0', ['Positive always', 'Negative always', 'Infinite'], 'Ideal solutions have no enthalpy change on mixing.'],
    ['For an ideal solution, Delta V_mix is what?', '0', ['Positive always', 'Negative always', 'Equal to pressure'], 'Ideal solutions have no volume change on mixing.'],
    ['Ideal solutions obey which law over the whole concentration range?', 'Raoult law', ['Henry law only at infinite dilution', 'Faraday law', 'Ohm law'], 'Ideal liquid solutions obey Raoult law throughout.'],
    ['Positive deviation from Raoult law means observed vapour pressure is what?', 'Higher than expected', ['Lower than expected', 'Exactly zero', 'Independent of composition'], 'Weaker A-B attractions make escape easier.'],
    ['Negative deviation from Raoult law means observed vapour pressure is what?', 'Lower than expected', ['Higher than expected', 'Infinite', 'Always 1 atm'], 'Stronger A-B attractions reduce escaping tendency.'],
    ['Large positive deviation forms which azeotrope?', 'Minimum boiling azeotrope', ['Maximum boiling azeotrope', 'Ideal mixture', 'Suspension'], 'Higher vapour pressure gives lower boiling point.'],
    ['Large negative deviation forms which azeotrope?', 'Maximum boiling azeotrope', ['Minimum boiling azeotrope', 'Emulsion', 'Gas solution'], 'Lower vapour pressure gives higher boiling point.'],
    ['Azeotropes cannot be separated completely by what method?', 'Fractional distillation', ['Filtration', 'Magnetic separation', 'Sublimation always'], 'They boil without change in composition.'],
    ['In an azeotrope, liquid and vapour have what composition?', 'Same composition', ['Always zero solute', 'Opposite composition', 'Unrelated composition'], 'Azeotropes distil at constant composition.'],
    ['In positive deviation, A-B interactions are usually what compared with A-A and B-B?', 'Weaker', ['Stronger', 'Identical always', 'Ionic only'], 'Weaker unlike interactions raise vapour pressure.'],
    ['In negative deviation, A-B interactions are usually what compared with A-A and B-B?', 'Stronger', ['Weaker', 'Absent', 'Only gravitational'], 'Stronger unlike interactions lower vapour pressure.'],
    ['Which pair is a common near-ideal solution example?', 'n-hexane and n-heptane', ['Ethanol and acetone', 'Chloroform and acetone', 'Nitric acid and water'], 'Similar non-polar molecules behave nearly ideally.'],
    ['Which pair shows positive deviation?', 'Ethanol and acetone', ['n-hexane and n-heptane', 'Chloroform and acetone', 'Water and nitric acid'], 'Ethanol-acetone has weaker unlike interactions.'],
    ['Which pair shows negative deviation?', 'Chloroform and acetone', ['Ethanol and acetone', 'n-hexane and n-heptane', 'Oxygen and nitrogen'], 'Chloroform and acetone form stronger interactions.'],
    ['What causes negative deviation in chloroform and acetone?', 'Specific attractive interaction', ['No molecular attraction', 'All molecules become gases', 'Mole fraction becomes 2'], 'Specific attraction lowers vapour pressure.'],
    ['A maximum boiling azeotrope has vapour pressure that is usually what?', 'Lower than expected', ['Higher than expected', 'Exactly equal to pure solvent always', 'Zero composition'], 'Negative deviation lowers vapour pressure and raises boiling point.']
];

const idealPractice = [
    ...idealFacts.map(([question, answer, distractors, explanation], index) => mcq(`Practice ${index + 1}: ${question}`, answer, distractors, explanation)),
    mcq('Which condition best identifies an ideal solution?', 'Delta H_mix = 0 and Delta V_mix = 0', ['Delta H_mix > 0 only', 'Delta V_mix < 0 only', 'Vapour pressure is always zero'], 'Ideal solutions have no heat or volume change on mixing.'),
    mcq('If a mixture has higher vapour pressure than Raoult law predicts, what deviation is it?', 'Positive deviation', ['Negative deviation', 'No deviation', 'Osmotic deviation'], 'Higher vapour pressure is positive deviation.'),
    mcq('If a mixture boils at a minimum constant temperature, what type of azeotrope is it?', 'Minimum boiling azeotrope', ['Maximum boiling azeotrope', 'Ideal solution only', 'Electrolyte solution'], 'Positive deviation can lead to minimum boiling azeotrope.'),
    mcq('If a mixture boils at a maximum constant temperature, what type of azeotrope is it?', 'Maximum boiling azeotrope', ['Minimum boiling azeotrope', 'Ideal solution only', 'Colloid'], 'Negative deviation can lead to maximum boiling azeotrope.'),
    mcq('Which statement is true for non-ideal solutions?', 'They do not obey Raoult law over the whole range', ['They always have Delta H_mix = 0', 'They always have Delta V_mix = 0', 'They contain only gases'], 'Non-ideal solutions show deviations from Raoult law.'),
    mcq('A-B attractions equal to A-A and B-B attractions suggest what behaviour?', 'Ideal behaviour', ['Positive deviation necessarily', 'Negative deviation necessarily', 'Azeotrope necessarily'], 'Similar interactions give nearly ideal behaviour.'),
    mcq('Weaker A-B attractions most directly lead to what?', 'Positive deviation', ['Negative deviation', 'Lower vapour pressure', 'Maximum boiling azeotrope'], 'Weaker attractions increase vapour pressure.'),
    mcq('Stronger A-B attractions most directly lead to what?', 'Negative deviation', ['Positive deviation', 'Minimum boiling azeotrope', 'Higher vapour pressure'], 'Stronger attractions decrease vapour pressure.')
];

const idealAssessment = [
    ...idealFacts.slice(0, 10).map(([question, answer, distractors, explanation], index) => mcq(`Assessment ${index + 1}: ${question}`, answer, distractors, explanation)),
    mcq('A solution has Delta H_mix = 0 and Delta V_mix = 0. What is it closest to?', 'Ideal solution', ['Positive deviation only', 'Negative deviation only', 'A suspension'], 'Those are the defining ideal-solution conditions.'),
    mcq('A mixture has A-B interactions weaker than A-A and B-B. Which deviation is expected?', 'Positive deviation', ['Negative deviation', 'No vapour pressure', 'Osmotic pressure only'], 'Weak A-B attractions increase vapour pressure.'),
    mcq('A mixture has A-B interactions stronger than A-A and B-B. Which deviation is expected?', 'Negative deviation', ['Positive deviation', 'No deviation ever', 'Gas in gas solution'], 'Strong A-B attractions decrease vapour pressure.'),
    mcq('Why does an azeotrope resist separation by fractional distillation?', 'Vapour and liquid compositions are the same', ['It has no boiling point', 'It contains no solvent', 'It is always solid'], 'Distillation cannot enrich one component when both phases have the same composition.')
];

const colligativeFacts = [
    ['Colligative properties depend mainly on what?', 'Number of solute particles', ['Nature of solute particles', 'Colour of solution', 'Shape of container'], 'They depend on particle count, not chemical identity.'],
    ['Which is a colligative property?', 'Osmotic pressure', ['Viscosity', 'Surface tension only', 'Colour intensity'], 'Osmotic pressure is one of the four colligative properties.'],
    ['Which formula gives elevation of boiling point?', 'Delta Tb = Kb m', ['Delta Tf = Kf m', 'pi = CRT', 'p = KH x'], 'Boiling point elevation is proportional to molality.'],
    ['Which formula gives depression of freezing point?', 'Delta Tf = Kf m', ['Delta Tb = Kb m', 'M = n/V', 'p1 = p1^0 x1'], 'Freezing point depression is proportional to molality.'],
    ['Which formula gives osmotic pressure for dilute solution?', 'pi = CRT', ['p = KH x', 'xA = nA / ntotal', 'Delta H_mix = 0'], 'Osmotic pressure follows pi = C R T.'],
    ['Which colligative property is best for molar mass of macromolecules?', 'Osmotic pressure', ['Relative lowering of vapour pressure', 'Elevation of boiling point', 'Depression of freezing point'], 'Osmotic pressure is measurable at room temperature for dilute solutions.'],
    ['Adding a non-volatile solute does what to boiling point?', 'Raises it', ['Lowers it', 'Makes it zero', 'Does not affect it ever'], 'The solution has lower vapour pressure, so it boils at a higher temperature.'],
    ['Adding a non-volatile solute does what to freezing point?', 'Lowers it', ['Raises it', 'Makes it infinite', 'Does not affect it ever'], 'Solute particles disrupt freezing.'],
    ['Relative lowering of vapour pressure equals what for a non-volatile solute?', 'Mole fraction of solute', ['Mole fraction of solvent', 'Molar mass of solvent', 'Temperature in kelvin'], 'Raoult law gives relative lowering equal to x2.'],
    ['What is a semipermeable membrane?', 'Membrane allowing solvent but not solute', ['Membrane allowing only solute', 'Membrane allowing nothing', 'Metal sheet only'], 'Osmosis needs selective passage of solvent.'],
    ['Osmosis is flow of solvent from dilute solution to concentrated solution through what?', 'Semipermeable membrane', ['Filter paper only', 'Open air', 'Copper wire'], 'Solvent passes through a semipermeable membrane.'],
    ['Van Hoff factor accounts for what?', 'Association or dissociation of solute', ['Colour of solvent', 'Shape of flask', 'Density of air'], 'Effective particle count changes when solutes associate or dissociate.'],
    ['For NaCl in ideal complete dissociation, i is approximately what?', '2', ['1', '0.5', '10'], 'NaCl gives Na+ and Cl- ions.'],
    ['For glucose in water, van Hoff factor is approximately what?', '1', ['2', '3', '0'], 'Glucose does not dissociate into ions.']
];

const colligativeCases = [
    ['Kb = 0.5 K kg mol-1 and m = 2 m', '1.0 K', 'Delta Tb = Kb m = 0.5 x 2.'],
    ['Kb = 1.0 K kg mol-1 and m = 0.5 m', '0.5 K', 'Delta Tb = Kb m.'],
    ['Kf = 2.0 K kg mol-1 and m = 0.5 m', '1.0 K', 'Delta Tf = Kf m.'],
    ['Kf = 1.5 K kg mol-1 and m = 2 m', '3.0 K', 'Delta Tf = Kf m.'],
    ['C = 1 mol L-1, R = 0.082, T = 300 K', '24.6 atm', 'pi = C R T = 1 x 0.082 x 300.'],
    ['C = 0.5 mol L-1, R = 0.082, T = 300 K', '12.3 atm', 'pi = C R T.'],
    ['p0 = 100 torr and x2 = 0.1', '10 torr lowering', 'Relative lowering x p0 gives actual lowering.'],
    ['p0 = 200 torr and x2 = 0.05', '10 torr lowering', 'Lowering = 200 x 0.05.'],
    ['i = 2, Kf = 1.0, m = 0.5', '1.0 K', 'Delta Tf = i Kf m.'],
    ['i = 3, Kb = 0.5, m = 2', '3.0 K', 'Delta Tb = i Kb m.']
];

const colligativePractice = [
    ...colligativeFacts.map(([question, answer, distractors, explanation], index) => mcq(`Practice ${index + 1}: ${question}`, answer, distractors, explanation)),
    ...colligativeCases.map(([given, answer, explanation], index) =>
        mcq(`Colligative calculation ${index + 1}: ${given}.`, answer, ['0.5 K', '1.0 K', '3.0 K', '10 torr lowering', '12.3 atm', '24.6 atm'].filter((item) => item !== answer).slice(0, 3), explanation)
    )
];

const colligativeAssessment = [
    ...colligativeFacts.slice(0, 10).map(([question, answer, distractors, explanation], index) => mcq(`Assessment ${index + 1}: ${question}`, answer, distractors, explanation)),
    mcq('For Kb = 0.5 and m = 1, what is Delta Tb?', '0.5 K', ['1.0 K', '2.0 K', '0 K'], 'Delta Tb = Kb m = 0.5 x 1.'),
    mcq('For Kf = 2 and m = 1.5, what is Delta Tf?', '3.0 K', ['0.5 K', '2.0 K', '4.0 K'], 'Delta Tf = Kf m = 2 x 1.5.'),
    mcq('Which solution should show larger osmotic pressure at same T: 0.2 M or 0.1 M non-electrolyte?', '0.2 M solution', ['0.1 M solution', 'Both zero', 'Cannot compare concentration'], 'pi is directly proportional to concentration.'),
    mcq('Which has more effective particles ideally: 0.1 M NaCl or 0.1 M glucose?', '0.1 M NaCl', ['0.1 M glucose', 'Both exactly same effective particles', 'Neither has particles'], 'NaCl dissociates into two ions, while glucose remains molecular.')
];

typePractice.push(
    mcq('Which example is a liquid in liquid solution?', 'Vinegar mixed with water', ['Hydrogen in palladium', 'Brass', 'Salt in water'], 'Vinegar and water are both liquids.'),
    mcq('Which example is a solid in liquid solution?', 'Glucose in water', ['Air', 'Mercury in sodium', 'Hydrogen in palladium'], 'Glucose is a solid solute dissolved in water.'),
    mcq('Which example is a gas in liquid solution?', 'Ammonia in water', ['Bronze', 'Copper in gold', 'Camphor in nitrogen'], 'Ammonia gas dissolves in liquid water.'),
    mcq('Which example is a solid in solid solution?', 'Steel', ['Soda water', 'Oxygen in water', 'Water vapour in air'], 'Steel is an alloy and behaves as a solid solution.'),
    mcq('Which example is a liquid in solid solution?', 'Dental amalgam', ['Air', 'Sugar syrup', 'Oxygen in water'], 'Dental amalgam contains mercury with solid metals.'),
    mcq('A homogeneous mixture of gases is usually classified as what?', 'Gaseous solution', ['Solid solution', 'Heterogeneous mixture', 'Suspension'], 'Gas mixtures are homogeneous and have a gaseous solvent.'),
    mcq('Which choice has a solid solvent?', 'Brass', ['Soda water', 'Air', 'Ethanol in water'], 'Brass is an alloy with a solid solvent.'),
    mcq('Which choice has a liquid solvent?', 'Salt solution', ['Air', 'Bronze', 'Hydrogen in palladium'], 'Water is the liquid solvent in salt solution.')
);

typeAssessment.push(
    mcq('Assessment extra: Which example has a gas as solute and liquid as solvent?', 'Soda water', ['Brass', 'Bronze', 'Copper in gold'], 'CO2 is dissolved in water in soda water.'),
    mcq('Assessment extra: Which example has a solid as solute and solid as solvent?', 'Steel', ['CO2 in water', 'Ethanol in water', 'Water vapour in air'], 'Steel is an alloy, so it is solid in solid.'),
    mcq('Assessment extra: Which example has a liquid as solute and solid as solvent?', 'Amalgam', ['Air', 'Sugar in water', 'Oxygen in water'], 'An amalgam contains mercury in a solid metal.'),
    mcq('Assessment extra: Which example has a liquid as solute and liquid as solvent?', 'Ethanol in water', ['Hydrogen in palladium', 'Brass', 'Camphor in nitrogen'], 'Both ethanol and water are liquids.')
);

concentrationPractice.push(
    mcq('A solution has 8 g solute in 200 g solution. What is mass percent?', '4 percent', ['8 percent', '20 percent', '40 percent'], 'Mass percent = 8 / 200 x 100 = 4 percent.'),
    mcq('A solution has 12 g solute in 300 g solution. What is mass percent?', '4 percent', ['12 percent', '25 percent', '40 percent'], 'Mass percent = 12 / 300 x 100 = 4 percent.'),
    mcq('For nA = 1 and nB = 4, what is xA?', '0.2', ['0.4', '0.8', '1.0'], 'xA = 1 / (1 + 4) = 0.2.'),
    mcq('For nA = 3 and nB = 2, what is xA?', '0.6', ['0.4', '0.5', '1.5'], 'xA = 3 / (3 + 2) = 0.6.'),
    mcq('A solution has 0.2 mol solute in 0.5 L solution. What is molarity?', '0.4 M', ['0.1 M', '0.7 M', '2.5 M'], 'M = 0.2 / 0.5 = 0.4 M.'),
    mcq('A solution has 0.75 mol solute in 0.25 L solution. What is molarity?', '3 M', ['0.5 M', '1 M', '4 M'], 'M = 0.75 / 0.25 = 3 M.'),
    mcq('A solution has 2.5 mol solute in 5 kg solvent. What is molality?', '0.5 m', ['1 m', '2 m', '5 m'], 'm = 2.5 / 5 = 0.5 m.'),
    mcq('A solution has 3 mol solute in 0.5 kg solvent. What is molality?', '6 m', ['1.5 m', '3 m', '5 m'], 'm = 3 / 0.5 = 6 m.')
);

concentrationAssessment.push(
    mcq('Assessment extra: A solution has 6 mol solute in 3 L solution. What is molarity?', '2 M', ['1 M', '3 M', '6 M'], 'M = 6 / 3 = 2 M.'),
    mcq('Assessment extra: A solution has 0.4 mol solute in 0.2 L solution. What is molarity?', '2 M', ['0.2 M', '0.6 M', '4 M'], 'M = 0.4 / 0.2 = 2 M.'),
    mcq('Assessment extra: A solution has 4 mol solute in 8 kg solvent. What is molality?', '0.5 m', ['1 m', '2 m', '4 m'], 'm = 4 / 8 = 0.5 m.'),
    mcq('Assessment extra: A mixture has nA = 4 and nB = 6. What is xA?', '0.4', ['0.6', '1.5', '2.5'], 'xA = 4 / 10 = 0.4.'),
    mcq('Assessment extra: A solution has 3 g solute in 60 g solution. What is mass percent?', '5 percent', ['3 percent', '10 percent', '20 percent'], 'Mass percent = 3 / 60 x 100 = 5 percent.'),
    mcq('Assessment extra: Which term changes if solution volume changes with temperature?', 'Molarity', ['Molality', 'Mass percent', 'Mole fraction'], 'Molarity depends on volume of solution.')
);

solubilityPractice.push(
    mcq('If a gas has low KH at a fixed pressure, what does that show?', 'Higher solubility', ['Lower solubility', 'Zero pressure', 'No dissolution possible'], 'At fixed p, x = p / KH.'),
    mcq('Which gas is less soluble if KH is larger at the same temperature?', 'The gas with larger KH', ['The gas with smaller KH', 'Both impossible to dissolve', 'Neither can be compared'], 'Large KH means lower x for the same p.'),
    mcq('Why does warm soda lose fizz faster than cold soda?', 'Gas solubility decreases at higher temperature', ['Gas solubility becomes infinite', 'CO2 turns into sugar', 'Pressure becomes zero inside sealed bottle'], 'Most gases are less soluble in warmer liquids.'),
    mcq('Which condition helps dissolve more oxygen in water?', 'Higher oxygen pressure', ['Lower gas pressure', 'Removing all gas above water', 'Making KH larger only'], 'Henry law predicts greater gas solubility at higher pressure.'),
    mcq('For p = 6 atm and KH = 3000 atm, what is x?', '0.002', ['0.001', '0.006', '2 atm'], 'x = p / KH = 6 / 3000.'),
    mcq('For p = 8 atm and KH = 4000 atm, what is x?', '0.002', ['0.004', '0.008', '4 atm'], 'x = p / KH = 8 / 4000.'),
    mcq('For x = 0.003 and KH = 1000 atm, what is p?', '3 atm', ['0.003 atm', '1 atm', '30 atm'], 'p = KH x = 1000 x 0.003.'),
    mcq('For x = 0.004 and KH = 2000 atm, what is p?', '8 atm', ['2 atm', '4 atm', '80 atm'], 'p = KH x = 2000 x 0.004.')
);

solubilityAssessment.push(
    mcq('Assessment extra: For p = 9 atm and KH = 3000 atm, find x.', '0.003', ['0.001', '0.009', '3 atm'], 'x = 9 / 3000 = 0.003.'),
    mcq('Assessment extra: For x = 0.002 and KH = 2500 atm, find p.', '5 atm', ['2.5 atm', '0.005 atm', '10 atm'], 'p = KH x = 2500 x 0.002.'),
    mcq('Assessment extra: Which pressure change releases dissolved gas from a liquid?', 'Decrease in pressure', ['Increase in pressure', 'No pressure change', 'Increasing KH to zero'], 'Lower pressure lowers gas solubility.'),
    mcq('Assessment extra: Which statement is safest for solids dissolving in liquids?', 'Pressure has little effect', ['Pressure doubles solubility always', 'Pressure makes all solids insoluble', 'Pressure is the only factor'], 'Solid solubility is not strongly pressure dependent.'),
    mcq('Assessment extra: Which relation correctly rearranges Henry law?', 'x = p / KH', ['x = KH / p', 'x = p + KH', 'x = p KH only'], 'From p = KH x, divide by KH.'),
    mcq('Assessment extra: Which condition makes a gas least soluble in water?', 'Low pressure and high temperature', ['High pressure and low temperature', 'High pressure only', 'Low temperature only'], 'Gas solubility usually increases with pressure and decreases with temperature.'),
    mcq('Assessment extra: Which bottle keeps more CO2 dissolved?', 'A sealed cold soda bottle', ['An open warm soda bottle', 'An open hot soda bottle', 'A bottle with no gas pressure'], 'Cold temperature and high CO2 pressure retain more gas.'),
    mcq('Assessment extra: What does a saturated solution of solid solute contain?', 'Dissolved solute in dynamic equilibrium with undissolved solute', ['Only solvent molecules', 'Only gas bubbles', 'No solute at all'], 'At saturation, dissolution and crystallisation rates are equal.')
);

vapourPractice.push(
    mcq('If x1 = 0.8 and p1^0 = 100 torr, what is p1?', '80 torr', ['20 torr', '50 torr', '100 torr'], 'p1 = x1 p1^0 = 0.8 x 100.'),
    mcq('If x1 = 0.3 and p1^0 = 200 torr, what is p1?', '60 torr', ['30 torr', '100 torr', '200 torr'], 'p1 = 0.3 x 200.'),
    mcq('If x2 = 0.15 and p0 = 100 torr for a non-volatile solute, what is lowering?', '15 torr', ['10 torr', '50 torr', '85 torr'], 'Lowering = p0 x2 = 100 x 0.15.'),
    mcq('If relative lowering is 0.4, what is x2?', '0.4', ['0.6', '1.4', '0.04'], 'Relative lowering equals solute mole fraction.'),
    mcq('For pA = 45 torr and pB = 55 torr, what is total vapour pressure?', '100 torr', ['10 torr', '55 torr', '2475 torr'], 'Total pressure is sum of partial pressures.'),
    mcq('For pA = 20 torr and pB = 30 torr, what is total vapour pressure?', '50 torr', ['10 torr', '30 torr', '600 torr'], 'Total pressure = 20 + 30.'),
    mcq('If x1 of solvent decreases after adding non-volatile solute, what happens to p1?', 'It decreases', ['It increases always', 'It becomes infinite', 'It becomes unrelated to x1'], 'Raoult law gives p1 proportional to x1.'),
    mcq('Which quantity is plotted against mole fraction in Raoult law?', 'Partial vapour pressure', ['Mass percent', 'Osmotic pressure only', 'Molality'], 'Raoult law connects partial vapour pressure and mole fraction.'),
    mcq('For a pure solvent with p0 = 120 torr, what is p when x1 = 1?', '120 torr', ['0 torr', '60 torr', '240 torr'], 'For a pure component, x1 = 1, so p = p0.'),
    mcq('For a solvent with p0 = 150 torr and x1 = 0.6, what is p1?', '90 torr', ['60 torr', '100 torr', '150 torr'], 'p1 = 150 x 0.6.')
);

vapourAssessment.push(
    mcq('Assessment extra: If x1 = 0.25 and p1^0 = 160 torr, what is p1?', '40 torr', ['25 torr', '80 torr', '160 torr'], 'p1 = 0.25 x 160.'),
    mcq('Assessment extra: If p0 = 90 torr and x2 = 0.2, what is vapour pressure lowering?', '18 torr', ['9 torr', '45 torr', '72 torr'], 'Lowering = p0 x2 = 90 x 0.2.'),
    mcq('Assessment extra: If pA = 35 torr and pB = 25 torr, what is total pressure?', '60 torr', ['10 torr', '35 torr', '875 torr'], 'Total pressure = 35 + 25.'),
    mcq('Assessment extra: A non-volatile solute lowers vapour pressure because it reduces what?', 'Mole fraction of solvent', ['Molar mass of solvent to zero', 'Temperature to zero', 'Henry constant only'], 'p1 is proportional to solvent mole fraction.'),
    mcq('Assessment extra: For relative lowering 0.12, what is x2?', '0.12', ['0.88', '1.12', '12'], 'Relative lowering equals x2.'),
    mcq('Assessment extra: If x1 = 0.6 and p1 = 90 torr, what is p1^0?', '150 torr', ['54 torr', '90 torr', '60 torr'], 'p1^0 = p1 / x1 = 90 / 0.6.'),
    mcq('Assessment extra: If p1^0 = 250 torr and x1 = 0.2, what is p1?', '50 torr', ['25 torr', '100 torr', '250 torr'], 'p1 = p1^0 x1 = 250 x 0.2.'),
    mcq('Assessment extra: Which graph is linear for an ideal volatile component?', 'p1 versus x1', ['p1 versus 1/x1 always', 'M versus molality always', 'KH versus x1 always'], 'Raoult law gives direct proportionality.'),
    mcq('Assessment extra: Which component gives vapour pressure above an aqueous sugar solution?', 'Water solvent', ['Sugar solute', 'Both equally volatile', 'Neither component'], 'Sugar is non-volatile, so water contributes the vapour pressure.')
);

idealPractice.push(
    mcq('Which deviation is expected if unlike molecules attract each other less strongly?', 'Positive deviation', ['Negative deviation', 'No vapour pressure', 'Maximum boiling only'], 'Weaker unlike attraction increases vapour pressure.'),
    mcq('Which deviation is expected if unlike molecules attract each other more strongly?', 'Negative deviation', ['Positive deviation', 'Minimum boiling only', 'No mixing'], 'Stronger unlike attraction decreases vapour pressure.'),
    mcq('Which mixture is closest to ideal because components are chemically similar?', 'n-hexane and n-heptane', ['Ethanol and acetone', 'Chloroform and acetone', 'Water and nitric acid'], 'Similar molecules have similar intermolecular forces.'),
    mcq('Which deviation is connected with minimum boiling azeotrope?', 'Positive deviation', ['Negative deviation', 'No deviation', 'Only solid solution'], 'Positive deviation raises vapour pressure and lowers boiling point.'),
    mcq('Which deviation is connected with maximum boiling azeotrope?', 'Negative deviation', ['Positive deviation', 'No deviation', 'Only gas solution'], 'Negative deviation lowers vapour pressure and raises boiling point.'),
    mcq('Which statement describes an azeotropic mixture?', 'It boils at constant composition', ['It has no vapour phase', 'It is always pure water', 'It separates by simple filtering'], 'Liquid and vapour compositions remain the same.'),
    mcq('What is the sign of Delta H_mix for positive deviation usually?', 'Positive', ['Zero always', 'Negative', 'Infinite'], 'Weaker A-B attractions often absorb heat on mixing.'),
    mcq('What is the sign of Delta H_mix for negative deviation usually?', 'Negative', ['Positive', 'Zero always', 'Undefined for all mixtures'], 'Stronger A-B attractions often release heat on mixing.')
);

idealAssessment.push(
    mcq('Assessment extra: Which mixture is most likely to be near ideal?', 'n-hexane and n-heptane', ['Ethanol and acetone', 'Chloroform and acetone', 'Water and nitric acid'], 'Both are similar non-polar hydrocarbons.'),
    mcq('Assessment extra: Which mixture commonly shows positive deviation?', 'Ethanol and acetone', ['n-hexane and n-heptane', 'Chloroform and acetone', 'Benzene and toluene ideally'], 'The unlike interactions are weaker.'),
    mcq('Assessment extra: Which mixture commonly shows negative deviation?', 'Chloroform and acetone', ['Ethanol and acetone', 'n-hexane and n-heptane', 'Air'], 'Specific attractions lower vapour pressure.'),
    mcq('Assessment extra: A mixture with higher than expected vapour pressure may form what?', 'Minimum boiling azeotrope', ['Maximum boiling azeotrope', 'No vapour ever', 'Only solid alloy'], 'Higher vapour pressure lowers boiling point.'),
    mcq('Assessment extra: A mixture with lower than expected vapour pressure may form what?', 'Maximum boiling azeotrope', ['Minimum boiling azeotrope', 'No liquid phase', 'Only gas in gas'], 'Lower vapour pressure raises boiling point.'),
    mcq('Assessment extra: Which pair of conditions best supports ideal behaviour?', 'Similar intermolecular forces and obeys Raoult law', ['Strong heat change and large volume change', 'Always forms azeotrope', 'No vapour pressure'], 'Ideal solutions have similar interactions and obey Raoult law.')
);

colligativePractice.push(
    mcq('For i = 2, Kf = 1.5, and m = 1, what is Delta Tf?', '3.0 K', ['1.5 K', '2.0 K', '4.5 K'], 'Delta Tf = i Kf m = 2 x 1.5 x 1.'),
    mcq('For i = 2, Kb = 0.5, and m = 3, what is Delta Tb?', '3.0 K', ['1.0 K', '1.5 K', '6.0 K'], 'Delta Tb = i Kb m = 2 x 0.5 x 3.'),
    mcq('For C = 0.25 M, R = 0.082, and T = 400 K, what is pi?', '8.2 atm', ['4.1 atm', '16.4 atm', '32.8 atm'], 'pi = C R T = 0.25 x 0.082 x 400.'),
    mcq('For C = 2 M, R = 0.082, and T = 300 K, what is pi?', '49.2 atm', ['24.6 atm', '12.3 atm', '4.92 atm'], 'pi = C R T = 2 x 0.082 x 300.'),
    mcq('Why does CaCl2 show a larger colligative effect than glucose at same molarity?', 'It produces more particles', ['It is sweeter', 'It has lower colour', 'It cannot dissolve'], 'CaCl2 can dissociate into three ions ideally.'),
    mcq('Which solute has i nearly 1 in water?', 'Urea', ['NaCl', 'CaCl2', 'K2SO4'], 'Urea is a non-electrolyte.'),
    mcq('Which solute can have i nearly 3 on complete dissociation?', 'CaCl2', ['Glucose', 'Urea', 'Ethanol'], 'CaCl2 gives one Ca2+ and two Cl- ions.'),
    mcq('Which property is measured by applying pressure to stop osmosis?', 'Osmotic pressure', ['Boiling point elevation', 'Freezing point depression', 'Vapour pressure lowering'], 'Osmotic pressure is the pressure required to stop osmosis.')
);

colligativeAssessment.push(
    mcq('Assessment extra: For i = 2, Kf = 1, and m = 0.25, what is Delta Tf?', '0.5 K', ['0.25 K', '1.0 K', '2.0 K'], 'Delta Tf = i Kf m = 2 x 1 x 0.25.'),
    mcq('Assessment extra: For C = 0.1 M, R = 0.082, and T = 300 K, what is pi?', '2.46 atm', ['24.6 atm', '0.246 atm', '30 atm'], 'pi = C R T = 0.1 x 0.082 x 300.'),
    mcq('Assessment extra: Which solute gives the largest ideal particle count per formula unit?', 'CaCl2', ['Glucose', 'Urea', 'Ethanol'], 'CaCl2 can form three ions.'),
    mcq('Assessment extra: Which colligative effect explains antifreeze lowering freezing point?', 'Depression of freezing point', ['Elevation of freezing point', 'Henry law', 'Ideal mixing only'], 'Solute lowers the freezing point of the solvent.'),
    mcq('Assessment extra: Which property is directly proportional to molarity at constant temperature?', 'Osmotic pressure', ['Molality', 'Mass percent', 'Mole fraction only'], 'pi = C R T.'),
    mcq('Assessment extra: What happens to colligative effect when particle count doubles ideally?', 'It doubles', ['It halves', 'It becomes zero', 'It becomes unrelated'], 'Colligative properties are proportional to number of solute particles.'),
    mcq('Assessment extra: Which solution has greater freezing point depression at same molality ideally?', 'NaCl solution', ['Glucose solution', 'Urea solution', 'Ethanol solution'], 'NaCl gives more particles because it dissociates.')
);

const GENERATED_QUESTION_BANKS = {
    '1.1': { practice: typePractice, assessment: typeAssessment },
    '1.2': { practice: concentrationPractice, assessment: concentrationAssessment },
    '1.3': { practice: solubilityPractice, assessment: solubilityAssessment },
    '1.4': { practice: vapourPractice, assessment: vapourAssessment },
    '1.5': { practice: idealPractice, assessment: idealAssessment },
    '1.6': { practice: colligativePractice, assessment: colligativeAssessment }
};

CORE_CONCEPTS.forEach((concept) => {
    const bank = GENERATED_QUESTION_BANKS[concept.id];
    if (bank) {
        concept.practice = bank.practice;
        concept.assessment = bank.assessment;
    }
});

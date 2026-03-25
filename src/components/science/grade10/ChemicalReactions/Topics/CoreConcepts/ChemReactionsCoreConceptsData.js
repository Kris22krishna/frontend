export const CORE_CONCEPTS = [
    {
        "id": "1.1",
        "title": "Chemical Equations",
        "subtitle": "From Words to Symbols",
        "desc": "Master the art of translating chemical changes into precise, balanced mathematical equations.",
        "icon": "⚖️",
        "color": "#f59e0b",
        "learn": {
            "concept": "A chemical equation is the symbolic representation of a chemical reaction in the form of symbols and formulae. Reactants are written on the LHS and products on the RHS. The Law of Conservation of Mass dictates that atoms are neither created nor destroyed, which is why equations must be balanced.",
            "rules": [
                {
                    "title": "Skeletal Equation",
                    "f": "\\text{Reactants} \\rightarrow \\text{Products}",
                    "d": "Write the unbalanced equation first using correct chemical formulae for reactants on the left-hand side and products on the right-hand side.",
                    "tip": "Never change a compound's formula by altering subscripts. Only add coefficients in front of compounds to balance.",
                    "ex": "Mg + O_2 \\rightarrow MgO",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Count Atoms",
                    "f": "\\text{Mass}_{\\text{reactants}} = \\text{Mass}_{\\text{products}}",
                    "d": "For every element, the total number of atoms on the reactant side must exactly equal the total number of atoms on the product side. This honors the Law of Conservation of Mass.",
                    "tip": "List the elements on both sides and count them before adding coefficients to identify imbalances.",
                    "ex": "\\text{LHS: 1 Mg, 2 O} \\neq \\text{RHS: 1 Mg, 1 O}",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Balance by Coefficients",
                    "f": "2Mg + O_2 \\rightarrow 2MgO",
                    "d": "Use the hit-and-trial method: add integer coefficients to balance the elements one by one, typically starting with the most complex compound.",
                    "tip": "Elements like oxygen and hydrogen often appear in multiple compounds, so balance them last to avoid endless loops.",
                    "ex": "2 \\times \\text{Mg} \\quad \\text{and} \\quad 2 \\times \\text{O} \\text{ on both sides}",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Physical States",
                    "f": "(s), (l), (g), (aq)",
                    "d": "To make an equation fully informative, notation is added indicating the physical state of each substance: (s) for solid, (l) for pure liquid, (g) for gaseous, and (aq) for aqueous solutions.",
                    "tip": "Remember that (aq) specifically means dissolved in water, while (l) means a melted or pure liquid state.",
                    "ex": "3Fe(s) + 4H_2O(g) \\rightarrow Fe_3O_4(s) + 4H_2(g)",
                    "practice": [],
                    "assessment": []
                }
            ]
        },
        "practice": [
            {
                "question": "Q1: What is the coefficient of $O_2$ in the balanced equation: $\\square H_2 + \\square O_2 \\rightarrow \\square H_2O$?",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "correct": 0,
                "explanation": "Balanced: $2H_2 + 1O_2 \\rightarrow 2H_2O$. Oxygen's coefficient is 1."
            },
            {
                "question": "Q2: Calculate the sum of all balanced coefficients for: $\\square N_2 + \\square H_2 \\rightarrow \\square NH_3$.",
                "options": [
                    "4",
                    "5",
                    "6",
                    "7"
                ],
                "correct": 2,
                "explanation": "Balanced: $1N_2 + 3H_2 \\rightarrow 2NH_3$. Sum = 1+3+2 = 6."
            },
            {
                "question": "Q3: In the reaction $\\square CH_4 + \\square O_2 \\rightarrow \\square CO_2 + \\square H_2O$, what is the coefficient for $O_2$?",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "correct": 1,
                "explanation": "Balanced: $CH_4 + 2O_2 \\rightarrow CO_2 + 2H_2O$."
            },
            {
                "question": "Q4: Find the sum of all balancing coefficients for $\\square Fe + \\square H_2O \\rightarrow \\square Fe_3O_4 + \\square H_2$.",
                "options": [
                    "6",
                    "8",
                    "10",
                    "12"
                ],
                "correct": 2,
                "explanation": "Balanced: $3Fe + 4H_2O \\rightarrow 1Fe_3O_4 + 4H_2$. Sum = 12."
            },
            {
                "question": "Q5: What is the coefficient of $KClO_3$ when $\\square KClO_3 \\rightarrow \\square KCl + \\square O_2$ is balanced?",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "correct": 1,
                "explanation": "$2KClO_3 \\rightarrow 2KCl + 3O_2$."
            },
            {
                "question": "Q6: Identify the correct sum of coefficients for: $\\square Al + \\square O_2 \\rightarrow \\square Al_2O_3$.",
                "options": [
                    "5",
                    "7",
                    "9",
                    "11"
                ],
                "correct": 2,
                "explanation": "$4Al + 3O_2 \\rightarrow 2Al_2O_3$. Sum = 9."
            },
            {
                "question": "Q7: What is the coefficient of $HCl$ in $\\square Mg + \\square HCl \\rightarrow \\square MgCl_2 + \\square H_2$?",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "correct": 1,
                "explanation": "$Mg + 2HCl \\rightarrow MgCl_2 + H_2$."
            },
            {
                "question": "Q8: Find the sum of coefficients for: $\\square Na + \\square H_2O \\rightarrow \\square NaOH + \\square H_2$.",
                "options": [
                    "6",
                    "7",
                    "8",
                    "9"
                ],
                "correct": 1,
                "explanation": "$2Na + 2H_2O \\rightarrow 2NaOH + 1H_2$. Sum = 7."
            },
            {
                "question": "Q9: What is the coefficient of $O_2$ in $\\square P_4 + \\square O_2 \\rightarrow \\square P_4O_{10}$?",
                "options": [
                    "2",
                    "4",
                    "5",
                    "10"
                ],
                "correct": 2,
                "explanation": "$P_4 + 5O_2 \\rightarrow P_4O_{10}$."
            },
            {
                "question": "Q10: What is the coefficient of $O_2$ when completely combusting propane: $\\square C_3H_8 + \\square O_2 \\rightarrow \\square CO_2 + \\square H_2O$?",
                "options": [
                    "3",
                    "4",
                    "5",
                    "6"
                ],
                "correct": 2,
                "explanation": "$C_3H_8 + 5O_2 \\rightarrow 3CO_2 + 4H_2O$."
            },
            {
                "question": "Q11: Find sum of coefficients: $\\square Fe + \\square O_2 \\rightarrow \\square Fe_2O_3$.",
                "options": [
                    "5",
                    "7",
                    "9",
                    "11"
                ],
                "correct": 2,
                "explanation": "$4Fe + 3O_2 \\rightarrow 2Fe_2O_3$. Sum = 9."
            },
            {
                "question": "Q12: Identify the coefficient of $AgNO_3$ in $\\square Cu + \\square AgNO_3 \\rightarrow \\square Cu(NO_3)_2 + \\square Ag$.",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "correct": 1,
                "explanation": "$Cu + 2AgNO_3 \\rightarrow Cu(NO_3)_2 + 2Ag$."
            },
            {
                "question": "Q13: What is the coefficient of $HCl$ in $\\square Al + \\square HCl \\rightarrow \\square AlCl_3 + \\square H_2$?",
                "options": [
                    "2",
                    "3",
                    "6",
                    "8"
                ],
                "correct": 2,
                "explanation": "$2Al + 6HCl \\rightarrow 2AlCl_3 + 3H_2$."
            },
            {
                "question": "Q14: What is the coefficient of $O_2$ for $\\square C_2H_6 + \\square O_2 \\rightarrow \\square CO_2 + \\square H_2O$?",
                "options": [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                "correct": 2,
                "explanation": "$2C_2H_6 + 7O_2 \\rightarrow 4CO_2 + 6H_2O$."
            },
            {
                "question": "Q15: Find the sum of coefficients: $\\square NH_3 + \\square O_2 \\rightarrow \\square NO + \\square H_2O$.",
                "options": [
                    "15",
                    "17",
                    "19",
                    "21"
                ],
                "correct": 2,
                "explanation": "$4NH_3 + 5O_2 \\rightarrow 4NO + 6H_2O$. Sum = 19."
            },
            {
                "question": "Q16: What is the coefficient of $O_2$ in $\\square FeS + \\square O_2 \\rightarrow \\square Fe_2O_3 + \\square SO_2$?",
                "options": [
                    "3",
                    "5",
                    "7",
                    "9"
                ],
                "correct": 2,
                "explanation": "$4FeS + 7O_2 \\rightarrow 2Fe_2O_3 + 4SO_2$."
            },
            {
                "question": "Q17: Sum of coefficients for $\\square CO + \\square O_2 \\rightarrow \\square CO_2$.",
                "options": [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                "correct": 0,
                "explanation": "$2CO + 1O_2 \\rightarrow 2CO_2$. Sum = 5."
            },
            {
                "question": "Q18: Coefficient of $NaOH$ in $\\square NaOH + \\square H_2SO_4 \\rightarrow \\square Na_2SO_4 + \\square H_2O$.",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "correct": 1,
                "explanation": "$2NaOH + H_2SO_4 \\rightarrow Na_2SO_4 + 2H_2O$."
            },
            {
                "question": "Q19: Sum of coefficients for $\\square KOH + \\square H_3PO_4 \\rightarrow \\square K_3PO_4 + \\square H_2O$.",
                "options": [
                    "6",
                    "8",
                    "10",
                    "12"
                ],
                "correct": 1,
                "explanation": "$3KOH + 1H_3PO_4 \\rightarrow 1K_3PO_4 + 3H_2O$. Sum = 8."
            },
            {
                "question": "Q20: Coefficient of hydrogen gas in $\\square SnO_2 + \\square H_2 \\rightarrow \\square Sn + \\square H_2O$.",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "correct": 1,
                "explanation": "$SnO_2 + 2H_2 \\rightarrow Sn + 2H_2O$."
            }
        ],
        "assessment": [
            {
                "question": "Q1: Coefficient of $HCl$ in $\\square TiCl_4 + \\square H_2O \\rightarrow \\square TiO_2 + \\square HCl$.",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "correct": 3,
                "explanation": "$TiCl_4 + 2H_2O \\rightarrow TiO_2 + 4HCl$."
            },
            {
                "question": "Q2: Coefficient of $NaOH$ in $\\square Zn + \\square NaOH \\rightarrow \\square Na_2ZnO_2 + \\square H_2$.",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "correct": 1,
                "explanation": "$Zn + 2NaOH \\rightarrow Na_2ZnO_2 + H_2$."
            },
            {
                "question": "Q3: Coefficient of $H_2O$ in $\\square Ca(OH)_2 + \\square H_3PO_4 \\rightarrow \\square Ca_3(PO_4)_2 + \\square H_2O$.",
                "options": [
                    "3",
                    "4",
                    "5",
                    "6"
                ],
                "correct": 3,
                "explanation": "$3Ca(OH)_2 + 2H_3PO_4 \\rightarrow Ca_3(PO_4)_2 + 6H_2O$."
            },
            {
                "question": "Q4: Sum of coefficients for $\\square V_2O_5 + \\square Ca \\rightarrow \\square CaO + \\square V$.",
                "options": [
                    "11",
                    "13",
                    "15",
                    "17"
                ],
                "correct": 1,
                "explanation": "$1V_2O_5 + 5Ca \\rightarrow 5CaO + 2V$. Sum = 13."
            },
            {
                "question": "Q5: Coefficient of $AgI$ in $\\square AgI + \\square Na_2S \\rightarrow \\square Ag_2S + \\square NaI$.",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "correct": 1,
                "explanation": "$2AgI + Na_2S \\rightarrow Ag_2S + 2NaI$."
            },
            {
                "question": "Q6: Sum of coefficients for $\\square Ba_3N_2 + \\square H_2O \\rightarrow \\square Ba(OH)_2 + \\square NH_3$.",
                "options": [
                    "10",
                    "12",
                    "14",
                    "16"
                ],
                "correct": 1,
                "explanation": "$1Ba_3N_2 + 6H_2O \\rightarrow 3Ba(OH)_2 + 2NH_3$. Sum = 12."
            },
            {
                "question": "Q7: Coefficient of $HCl$ in $\\square HCl + \\square O_2 \\rightarrow \\square H_2O + \\square Cl_2$.",
                "options": [
                    "2",
                    "3",
                    "4",
                    "6"
                ],
                "correct": 2,
                "explanation": "$4HCl + 1O_2 \\rightarrow 2H_2O + 2Cl_2$."
            },
            {
                "question": "Q8: Sum of coefficients for $\\square HNO_3 + \\square H_2S \\rightarrow \\square NO + \\square S + \\square H_2O$.",
                "options": [
                    "12",
                    "14",
                    "16",
                    "18"
                ],
                "correct": 1,
                "explanation": "$2HNO_3 + 3H_2S \\rightarrow 2NO + 3S + 4H_2O$. Sum = 14."
            },
            {
                "question": "Q9: Coefficient of $Pb(NO_3)_2$ in $\\square Pb(NO_3)_2 \\rightarrow \\square PbO + \\square NO_2 + \\square O_2$.",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "correct": 1,
                "explanation": "$2Pb(NO_3)_2 \\rightarrow 2PbO + 4NO_2 + 1O_2$."
            },
            {
                "question": "Q10: What does the (aq) symbol represent in a chemical equation?",
                "options": [
                    "Aqueous, dissolved in water",
                    "Aqueous, liquid form",
                    "Alkaline",
                    "Solid State"
                ],
                "correct": 0,
                "explanation": "(aq) means aqueous (dissolved in water)."
            }
        ]
    },
    {
        "id": "1.2",
        "title": "Types of Reactions",
        "subtitle": "Classifying Chemical Change",
        "desc": "Identify the core types of chemical reactions through observation and balanced formulas.",
        "icon": "🔄",
        "color": "#14b8a6",
        "learn": {
            "concept": "Chemical reactions can be broadly classified based on how reactant molecules rearrange themselves. By quickly identifying the reaction type, predicting the products becomes highly logical.",
            "rules": [
                {
                    "title": "Combination & Decomposition",
                    "f": "A + B \\rightarrow AB \\quad \\text{vs} \\quad AB \\rightarrow A + B",
                    "d": "In combination, multiple reactants form one product. In decomposition, a single reactant breaks down into multiple products.",
                    "tip": "Combination is usually exothermic (releases heat), while decomposition is almost always endothermic (requires heat, light, or electricity).",
                    "ex": "\\text{Comb: } C + O_2 \\rightarrow CO_2 \\\\ \\text{Decomp: } 2H_2O \\rightarrow 2H_2 + O_2",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Displacement",
                    "f": "A + BC \\rightarrow AC + B",
                    "d": "A more reactive element (A) displaces a less reactive element (B) from its compound (BC) to form a new compound (AC).",
                    "tip": "Memorize the reactivity series... K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Ag > Au",
                    "ex": "Zn + CuSO_4 \\rightarrow ZnSO_4 + Cu",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Double Displacement",
                    "f": "AB + CD \\rightarrow AD + CB",
                    "d": "Mutual exchange of ions between two aqueous compounds forming two new compounds.",
                    "tip": "This type often involves the formation of a solid precipitate (an insoluble substance) that falls out of the solution.",
                    "ex": "Na_2SO_4 + BaCl_2 \\rightarrow BaSO_4\\downarrow + 2NaCl",
                    "practice": [],
                    "assessment": []
                }
            ]
        },
        "practice": [
            {
                "question": "Q1: What type of reaction is $CaO + H_2O \\rightarrow Ca(OH)_2$?",
                "options": [
                    "Combination",
                    "Decomposition",
                    "Displacement",
                    "Double Displacement"
                ],
                "correct": 0,
                "explanation": "Two substances combine to form a single product."
            },
            {
                "question": "Q2: The heating of Calcium Carbonate ($CaCO_3$) to $CaO$ and $CO_2$ is:",
                "options": [
                    "Combination",
                    "Thermal Decomposition",
                    "Electrolytic Decomposition",
                    "Photolysis"
                ],
                "correct": 1,
                "explanation": "It breaks down due to the application of heat."
            },
            {
                "question": "Q3: In $Fe + CuSO_4 \\rightarrow FeSO_4 + Cu$, the reaction is categorized as:",
                "options": [
                    "Combination",
                    "Decomposition",
                    "Displacement",
                    "Double Displacement"
                ],
                "correct": 2,
                "explanation": "Iron displaces copper from its salt solution."
            },
            {
                "question": "Q4: When aqueous $Na_2SO_4$ and $BaCl_2$ are mixed, $BaSO_4$ precipitate forms. This is a:",
                "options": [
                    "Combination",
                    "Decomposition",
                    "Displacement",
                    "Double Displacement"
                ],
                "correct": 3,
                "explanation": "Exchange of ions forms a precipitate."
            },
            {
                "question": "Q5: Which of the following describes an endothermic reaction?",
                "options": [
                    "Releases heat",
                    "Requires continuous heat/energy input",
                    "Yields a precipitate",
                    "Involves no energy change"
                ],
                "correct": 1,
                "explanation": "Endo means absorbing heat."
            },
            {
                "question": "Q6: Zinc reacting with dilute sulfuric acid to yield hydrogen gas is an example of:",
                "options": [
                    "Displacement",
                    "Decomposition",
                    "Double Displacement",
                    "Combination"
                ],
                "correct": 0,
                "explanation": "Zinc displaces hydrogen from the acid."
            },
            {
                "question": "Q7: Reactions where heat is released along with the formation of products are called ________.",
                "options": [
                    "Exothermic",
                    "Endothermic",
                    "Photochemical",
                    "Reversible"
                ],
                "correct": 0,
                "explanation": "Exo means outside; heat is released."
            },
            {
                "question": "Q8: Electrolysis of water ($2H_2O \\rightarrow 2H_2 + O_2$) is an example of:",
                "options": [
                    "Thermal Decomposition",
                    "Electrolytic Decomposition",
                    "Photochemical Decomposition",
                    "Combination"
                ],
                "correct": 1,
                "explanation": "Electricity causes water to break apart."
            },
            {
                "question": "Q9: Silver chloride turning grey in sunlight due to the formation of silver is:",
                "options": [
                    "Thermal Decomposition",
                    "Electrolytic Decomposition",
                    "Photochemical Decomposition",
                    "Displacement"
                ],
                "correct": 2,
                "explanation": "Light (photo) breaks it down."
            },
            {
                "question": "Q10: A displacement reaction will only occur if the elemental metal is ________ the metal in the compound within the reactivity series.",
                "options": [
                    "below",
                    "above",
                    "equal to",
                    "unrelated to"
                ],
                "correct": 1,
                "explanation": "A more reactive metal displaces a less reactive one."
            },
            {
                "question": "Q11: Which reaction is given by $H_2 + Cl_2 \\rightarrow 2HCl$?",
                "options": [
                    "Combination",
                    "Decomposition",
                    "Displacement",
                    "Double displacement"
                ],
                "correct": 0,
                "explanation": "Hydrogen and chlorine combine."
            },
            {
                "question": "Q12: Which type is $2AgBr \\xrightarrow{light} 2Ag + Br_2$?",
                "options": [
                    "Combination",
                    "Displacement",
                    "Photochemical Decomposition",
                    "Double Displacement"
                ],
                "correct": 2,
                "explanation": "Bromide decomposes in presence of light."
            },
            {
                "question": "Q13: The reaction between strong acid and strong base ($HCl + NaOH \\rightarrow NaCl + H_2O$) is a type of:",
                "options": [
                    "Displacement",
                    "Double Displacement",
                    "Combination",
                    "Decomposition"
                ],
                "correct": 1,
                "explanation": "Exchange of $H^+$ and $Na^+$ ions (Neutralization is double displacement)."
            },
            {
                "question": "Q14: The thermite reaction $Fe_2O_3 + 2Al \\rightarrow 2Fe + Al_2O_3$ is an example of:",
                "options": [
                    "Combination",
                    "Decomposition",
                    "Displacement",
                    "Double Displacement"
                ],
                "correct": 2,
                "explanation": "Aluminum displaces iron from its oxide."
            },
            {
                "question": "Q15: Digestion of food in our body involves the breaking down of complex molecules into simpler ones. This is a ________ reaction.",
                "options": [
                    "Combination",
                    "Decomposition",
                    "Displacement",
                    "Double Displacement"
                ],
                "correct": 1,
                "explanation": "Complex breaks into simpler."
            },
            {
                "question": "Q16: Which reaction type is inherently characterized by an exchange of ions?",
                "options": [
                    "Combination",
                    "Decomposition",
                    "Displacement",
                    "Double Displacement"
                ],
                "correct": 3,
                "explanation": "In double displacement, cations and anions trade partners."
            },
            {
                "question": "Q17: Burning of natural gas ($CH_4 + 2O_2 \\rightarrow CO_2 + 2H_2O$) is highly:",
                "options": [
                    "Endothermic",
                    "Exothermic",
                    "Photochemical",
                    "Non-reactive"
                ],
                "correct": 1,
                "explanation": "Combustion releases large amounts of heat."
            },
            {
                "question": "Q18: Which gas is produced during the thermal decomposition of lead nitrate?",
                "options": [
                    "Nitrogen dioxide ($NO_2$)",
                    "Hydrogen ($H_2$)",
                    "Carbon dioxide ($CO_2$)",
                    "Sulfur dioxide ($SO_2$)"
                ],
                "correct": 0,
                "explanation": "Lead nitrate produces brown fumes of $NO_2$."
            },
            {
                "question": "Q19: What is the defining trait of a precipitation reaction?",
                "options": [
                    "Glows in the dark",
                    "Produces solely gases",
                    "Produces an insoluble solid",
                    "Absorbs heat continuously"
                ],
                "correct": 2,
                "explanation": "A precipitate is an insoluble solid settling out of the solution."
            },
            {
                "question": "Q20: When iron nails are placed in copper sulphate solution, the solution color changes from:",
                "options": [
                    "Blue to Light Green",
                    "Light Green to Blue",
                    "Colorless to Blue",
                    "Blue to Colorless"
                ],
                "correct": 0,
                "explanation": "Copper sulphate (blue) turns into iron sulphate (green)."
            }
        ],
        "assessment": [
            {
                "question": "Q1: Respiration is considered an ________ reaction because energy is released continuously.",
                "options": [
                    "Endothermic",
                    "Exothermic",
                    "Photochemical",
                    "Electrolytic"
                ],
                "correct": 1,
                "explanation": "Glucose breaks down to release energy."
            },
            {
                "question": "Q2: Heating ferrous sulphate crystals ($FeSO_4$) yields an odor of burning sulfur. This is:",
                "options": [
                    "Combination",
                    "Displacement",
                    "Thermal Decomposition",
                    "Double Displacement"
                ],
                "correct": 2,
                "explanation": "It breaks down to $Fe_2O_3, SO_2,$ and $SO_3$."
            },
            {
                "question": "Q3: Which metal from the options cannot displace hydrogen from dilute acids?",
                "options": [
                    "Zinc",
                    "Iron",
                    "Magnesium",
                    "Copper"
                ],
                "correct": 3,
                "explanation": "Copper is below hydrogen in the reactivity series."
            },
            {
                "question": "Q4: A student adds lead to copper chloride solution. What type of reaction will occur?",
                "options": [
                    "Combination",
                    "Displacement",
                    "Decomposition",
                    "Double Displacement"
                ],
                "correct": 1,
                "explanation": "Lead displaces copper since it is more reactive."
            },
            {
                "question": "Q5: The reaction $2Pb(NO_3)_2 \\rightarrow 2PbO + 4NO_2 + O_2$ is categorized as:",
                "options": [
                    "Combination",
                    "Exothermic",
                    "Thermal Decomposition",
                    "Displacement"
                ],
                "correct": 2,
                "explanation": "Heat breaks down a single reactant into three products."
            },
            {
                "question": "Q6: Black and white photography formerly relied on the decomposition of:",
                "options": [
                    "Calcium carbonate",
                    "Iron sulphide",
                    "Silver bromide",
                    "Sodium chloride"
                ],
                "correct": 2,
                "explanation": "Silver bromide decomposes in light."
            },
            {
                "question": "Q7: Which pairs represent a Double Displacement?",
                "options": [
                    "Element + Compound",
                    "Two Elements",
                    "Two Compounds",
                    "One Compound"
                ],
                "correct": 2,
                "explanation": "Two compounds trade ions."
            },
            {
                "question": "Q8: A reaction requires electrical energy to proceed. It is known as:",
                "options": [
                    "Galvanization",
                    "Electrolysis",
                    "Photolysis",
                    "Thermolysis"
                ],
                "correct": 1,
                "explanation": "Electrolysis uses electricity for decomposition."
            },
            {
                "question": "Q9: When quick lime ($CaO$) is added to water, the beaker becomes very hot. The reaction type is:",
                "options": [
                    "Endothermic combination",
                    "Exothermic combination",
                    "Exothermic decomposition",
                    "Endothermic displacement"
                ],
                "correct": 1,
                "explanation": "Slaked lime is formed with massive heat release."
            },
            {
                "question": "Q10: In a combination reaction, the number of products is usually:",
                "options": [
                    "Zero",
                    "One",
                    "Two",
                    "Three"
                ],
                "correct": 1,
                "explanation": "Multiple reactants combine to yield a single product."
            }
        ]
    },
    {
        "id": "1.3",
        "title": "Effects of Oxidation",
        "subtitle": "Corrosion & Rancidity",
        "desc": "Understand real-world implications of metal oxidation and how to prevent molecular degradation.",
        "icon": "🛡️",
        "color": "#ec4899",
        "learn": {
            "concept": "Oxidation and reduction govern everyday phenomena.",
            "rules": [
                {
                    "title": "Oxidation & Reduction",
                    "f": "\\text{Oxidation} = +O, -H \\quad | \\quad \\text{Reduction} = +H, -O",
                    "d": "Gain of oxygen or loss of hydrogen is oxidation. The reverse is reduction.",
                    "tip": "Oxidation and reduction ALWAYS happen simultaneously in a Redox reaction.",
                    "ex": "CuO + H_2 \\rightarrow Cu + H_2O",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Corrosion",
                    "f": "\\text{Metal} + O_2 + H_2O \\rightarrow \\text{Metal Oxide}",
                    "d": "Gradual deterioration of a metal under external air and moisture action.",
                    "tip": "Rust is hydrated Fe(III) oxide. Prevention involves stopping air/moisture from reaching the metal (painting, galvanizing).",
                    "ex": "Fe_2O_3 \\cdot xH_2O \\text{ (Rust)}",
                    "practice": [],
                    "assessment": []
                },
                {
                    "title": "Rancidity",
                    "f": "\\text{Fats/Oils} + O_2 \\rightarrow \\text{Rancid}",
                    "d": "Oxidation of food making it smell and taste foul.",
                    "tip": "Flushing bags with inert N2 gas or adding antioxidants prevents this.",
                    "ex": "Potato chips sealed in $N_2$ barrier packaging",
                    "practice": [],
                    "assessment": []
                }
            ]
        },
        "practice": [
            {
                "question": "Q1: Oxidation is defined as the:",
                "options": [
                    "Gain of electrons",
                    "Loss of oxygen",
                    "Gain of oxygen or loss of hydrogen",
                    "Gain of hydrogen"
                ],
                "correct": 2,
                "explanation": "Addition of oxygen or removal of hydrogen is oxidation."
            },
            {
                "question": "Q2: Reduction can be defined as the:",
                "options": [
                    "Gain of oxygen",
                    "Loss of electrons",
                    "Gain of hydrogen or loss of oxygen",
                    "Loss of hydrogen"
                ],
                "correct": 2,
                "explanation": "Addition of hydrogen or removal of oxygen is reduction."
            },
            {
                "question": "Q3: In the reaction $CuO + H_2 \\rightarrow Cu + H_2O$, identify the substance getting oxidized.",
                "options": [
                    "$CuO$",
                    "$H_2$",
                    "$Cu$",
                    "$H_2O$"
                ],
                "correct": 1,
                "explanation": "$H_2$ gains oxygen to form $H_2O$."
            },
            {
                "question": "Q4: In $CuO + H_2 \\rightarrow Cu + H_2O$, identify the oxidizing agent.",
                "options": [
                    "$CuO$",
                    "$H_2$",
                    "$Cu$",
                    "$H_2O$"
                ],
                "correct": 0,
                "explanation": "$CuO$ provides the oxygen to $H_2$ and it itself gets reduced."
            },
            {
                "question": "Q5: The term \"Rancidity\" refers to the:",
                "options": [
                    "Corrosion of iron",
                    "Oxidation of oils and fats yielding bad smell",
                    "Reduction of metals",
                    "Evaporation of water"
                ],
                "correct": 1,
                "explanation": "Fats and oils oxidize over time, altering taste and smell."
            },
            {
                "question": "Q6: Which gas is commonly flushed into bags of chips to prevent rancidity?",
                "options": [
                    "Oxygen",
                    "Nitrogen",
                    "Carbon dioxide",
                    "Hydrogen"
                ],
                "correct": 1,
                "explanation": "Nitrogen is fairly unreactive and displaces oxygen."
            },
            {
                "question": "Q7: The chemical formula for rust is primarily:",
                "options": [
                    "$FeO$",
                    "$Fe_3O_4$",
                    "$Fe_2O_3\\cdot xH_2O$",
                    "$Fe(OH)_3$"
                ],
                "correct": 2,
                "explanation": "Rust is hydrated iron(III) oxide."
            },
            {
                "question": "Q8: Corrosion is the gradual deterioration of metals caused by the action of:",
                "options": [
                    "Acids only",
                    "Moisture and oxygen in air",
                    "Nitrogen gas",
                    "Alkaline solutions"
                ],
                "correct": 1,
                "explanation": "Both oxygen and water are strictly required for rusting."
            },
            {
                "question": "Q9: Which of these does NOT prevent iron from rusting?",
                "options": [
                    "Painting the surface",
                    "Galvanizing with zinc",
                    "Keeping it exposed to humid air",
                    "Alloying it with chromium"
                ],
                "correct": 2,
                "explanation": "Humid air provides moisture and oxygen, accelerating rust."
            },
            {
                "question": "Q10: Substances that prevent the oxidation of food items are known as:",
                "options": [
                    "Antacids",
                    "Catalysts",
                    "Antioxidants",
                    "Corrosives"
                ],
                "correct": 2,
                "explanation": "Antioxidants delay the oxidation process."
            },
            {
                "question": "Q11: In the reaction $H_2S + Cl_2 \\rightarrow 2HCl + S$, what acts as the oxidizing agent?",
                "options": [
                    "$H_2S$",
                    "$Cl_2$",
                    "$HCl$",
                    "$S$"
                ],
                "correct": 1,
                "explanation": "$Cl_2$ removes hydrogen from $H_2S$, so it is the oxidizing agent."
            },
            {
                "question": "Q12: For a redox reaction to occur, oxidation and reduction must take place:",
                "options": [
                    "Simultaneously",
                    "Sequentially",
                    "Separately",
                    "Never"
                ],
                "correct": 0,
                "explanation": "One substance gets oxidized while the other gets reduced simultaneously."
            },
            {
                "question": "Q13: What happens when copper is heated strongly in air?",
                "options": [
                    "It becomes shiny",
                    "It forms a black coating of Copper(II) Oxide",
                    "It turns into green powder",
                    "It vaporizes"
                ],
                "correct": 1,
                "explanation": "$2Cu + O_2 \\rightarrow 2CuO$ (black)."
            },
            {
                "question": "Q14: The black coating on silver articles over time is chemically:",
                "options": [
                    "$Ag_2O$",
                    "$AgNO_3$",
                    "$Ag_2S$",
                    "$AgCl$"
                ],
                "correct": 2,
                "explanation": "Silver reacts with atmospheric hydrogen sulfide to form silver sulfide."
            },
            {
                "question": "Q15: The green coating on copper vessels exposed to moist air is due to the formation of:",
                "options": [
                    "Copper oxide",
                    "Basic copper carbonate",
                    "Copper sulphate",
                    "Copper chloride"
                ],
                "correct": 1,
                "explanation": "Moisture and $CO_2$ form $CuCO_3\\cdot Cu(OH)_2$ (basic copper carbonate)."
            },
            {
                "question": "Q16: What does the mnemonic \"OIL RIG\" help us remember?",
                "options": [
                    "Oxidation Is Loss (of electrons), Reduction Is Gain",
                    "Oxygen Is Lost, Radical Is Gained",
                    "Oxygen In, Radical In",
                    "Oxidation Involves Liquids"
                ],
                "correct": 0,
                "explanation": "Electrons are lost during oxidation and gained during reduction."
            },
            {
                "question": "Q17: In $ZnO + C \\rightarrow Zn + CO$, which substance is reduced?",
                "options": [
                    "$ZnO$",
                    "$C$",
                    "$Zn$",
                    "$CO$"
                ],
                "correct": 0,
                "explanation": "$ZnO$ loses its oxygen, hence gets reduced."
            },
            {
                "question": "Q18: In the reaction $MnO_2 + 4HCl \\rightarrow MnCl_2 + 2H_2O + Cl_2$, identify the reducing agent.",
                "options": [
                    "$MnO_2$",
                    "$HCl$",
                    "$MnCl_2$",
                    "$Cl_2$"
                ],
                "correct": 1,
                "explanation": "$HCl$ gets oxidized to $Cl_2$, so it is the reducing agent."
            },
            {
                "question": "Q19: Galvanization is the process of coating iron with a thin layer of:",
                "options": [
                    "Copper",
                    "Tin",
                    "Zinc",
                    "Aluminum"
                ],
                "correct": 2,
                "explanation": "Zinc protects iron via sacrificial protection."
            },
            {
                "question": "Q20: Why are food items sometimes kept in airtight containers?",
                "options": [
                    "To keep them warm",
                    "To slow down oxidation",
                    "To prevent drying only",
                    "To increase their mass"
                ],
                "correct": 1,
                "explanation": "Minimal oxygen exposure slows down rancidity."
            }
        ],
        "assessment": [
            {
                "question": "Q1: In a redox reaction, the substance gaining oxygen is the:",
                "options": [
                    "Oxidizing agent",
                    "Reducing agent",
                    "Catalyst",
                    "Precipitate"
                ],
                "correct": 1,
                "explanation": "It gets oxidized. The oxidized substance relies on the oxidizing agent; thus, it is the reducing agent."
            },
            {
                "question": "Q2: When magnesium ribbon burns brightly in air, it undergoes:",
                "options": [
                    "Reduction",
                    "Decomposition",
                    "Oxidation",
                    "Displacement"
                ],
                "correct": 2,
                "explanation": "$Mg$ gains oxygen to form $MgO$."
            },
            {
                "question": "Q3: If a substance loses oxygen during a chemical reaction, it is said to have been:",
                "options": [
                    "Oxidized",
                    "Reduced",
                    "Burned",
                    "Galvanized"
                ],
                "correct": 1,
                "explanation": "Loss of oxygen equals reduction."
            },
            {
                "question": "Q4: Which of these represents a practical application of a redox reaction?",
                "options": [
                    "Extraction of metals from their ores",
                    "Dilution of an acid",
                    "Boiling water",
                    "Melting ice"
                ],
                "correct": 0,
                "explanation": "Ores are often oxides, meaning we reduce them to extract the metal."
            },
            {
                "question": "Q5: Which is NOT a condition required for iron to rust?",
                "options": [
                    "Oxygen",
                    "Water/Moisture",
                    "Light",
                    "Exposed surface"
                ],
                "correct": 2,
                "explanation": "Rusting readily happens in the dark."
            },
            {
                "question": "Q6: The term \"reducing agent\" means the substance:",
                "options": [
                    "Provides oxygen",
                    "Gets oxidized",
                    "Loses mass",
                    "Gains electrons"
                ],
                "correct": 1,
                "explanation": "The reducing agent undergoes oxidation."
            },
            {
                "question": "Q7: Which of these metals is most highly resistant to corrosion?",
                "options": [
                    "Iron",
                    "Sodium",
                    "Gold",
                    "Magnesium"
                ],
                "correct": 2,
                "explanation": "Gold is highly unreactive (at the bottom of the activity series)."
            },
            {
                "question": "Q8: What substance is oxidized in $PbS + 4H_2O_2 \\rightarrow PbSO_4 + 4H_2O$?",
                "options": [
                    "$PbS$",
                    "$H_2O_2$",
                    "$PbSO_4$",
                    "$H_2O$"
                ],
                "correct": 0,
                "explanation": "$PbS$ gains oxygen to become $PbSO_4$."
            },
            {
                "question": "Q9: What is the role of antioxidants in potato chips packaging?",
                "options": [
                    "To provide flavor",
                    "To prevent oxidation of fat/oil",
                    "To act as a preservative against bacteria",
                    "To color the chips"
                ],
                "correct": 1,
                "explanation": "They prevent the fat from turning rancid."
            },
            {
                "question": "Q10: A student notices his bicycle chain rusting. What type of reaction is this predominantly?",
                "options": [
                    "Double Displacement",
                    "Redox",
                    "Endothermic",
                    "Neutralization"
                ],
                "correct": 1,
                "explanation": "Corrosion is fundamentally an electrochemical redox reaction."
            }
        ]
    }
];

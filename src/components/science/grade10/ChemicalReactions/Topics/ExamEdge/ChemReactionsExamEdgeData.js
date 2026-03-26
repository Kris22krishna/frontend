export const chemReactionsExamEdgeData = {
    exams: [
        {
            name: 'State Boards / SSLC',
            emoji: '🏫',
            color: '#0d9488',
            weightage: '4-8 Marks',
            freq: 'Always Tested',
            topics: [
                'Balancing Chemical Equations (2-3M)',
                'Types of Reactions (Diff questions)',
                'Oxidation & Reduction Definitions',
                'Activity: Fe Nail in CuSO₄',
                'Corrosion & Rancidity'
            ],
            strategy: 'Balancing equations is guaranteed to appear — do not skip it and practice at least 25! For 3-mark questions, you must structure your answer: Definition + Balanced Equation + Example. Prepare tabular differences for Combination vs Decomposition.',
            pitfalls: [
                'Changing formula subscripts (H₃) instead of coefficients (3H) when balancing.',
                'Forgetting to verify atom count on both sides after finishing.',
                'Not writing physical state symbols (s, l, g, aq) when explicitly asked.',
                'Writing "rust" as FeO instead of the correct hydrated iron(III) oxide (Fe₂O₃·xH₂O).'
            ],
            questions: [
                {
                    q: "Question 1.\nWhy should a magnesium ribbon be cleaned before burning in air?",
                    a: "Answer:\nMagnesium metal is highly reactive. In stored conditions, it reacts with oxygen to form magnesium oxide over its outer layer. To remove this layer and to expose the underlying metal into air, the magnesium ribbon is cleaned by sandpaper."
                },
                {
                    q: "Question 2.\nWrite the balanced equation for the following chemical reactions.\ni) Hydrogen + Chlorine → Hydrogen Chloride\nii) Barium chloride + Aluminium sulphate → Barium sulphate + Aluminium chloride\niii) Sodium + water → Sodium hydroxide + Hydrogen",
                    a: "Answer:\n$$\\text{H}_2\\text{(g)} + \\text{Cl}_2\\text{(g)} \\rightarrow 2\\text{HCl}\\text{(g)}$$\n$$3\\text{BaCl}_2\\text{(s)} + \\text{Al}_2\\text{(SO}_4\\text{)}_3\\text{(s)} \\rightarrow 3\\text{BaSO}_4\\text{(s)} + 2\\text{AlCl}_3\\text{(s)}$$\n$$2\\text{Na}\\text{(s)} + 2\\text{H}_2\\text{O}\\text{(l)} \\rightarrow 2\\text{NaOH}\\text{(aq)} + \\text{H}_2\\text{(g)}$$"
                },
                {
                    q: "Question 3.\nWrite a balanced chemical equation with state symbols for the following reactions.\nSolutions of barium chloride and sodium sulphate in water react to give insoluble barium sulphate and the solution of sodium chloride.",
                    a: "Answer:\nBalanced chemical equations with state symbols for the required reactions are as follows:\n$$\\text{BaCl}_2\\text{(aq)} + \\text{Na}_2\\text{SO}_4\\text{(aq)} \\rightarrow \\text{BaSO}_4\\text{(s)} + 2\\text{NaCl}\\text{(aq)}$$\n$$\\text{NaOH}\\text{(aq)} + \\text{HCl}\\text{(aq)} \\rightarrow \\text{NaCl}\\text{(aq)} + \\text{H}_2\\text{O}\\text{(l)}$$"
                },
                {
                    q: "Question 4.\nA solution of a substance 'X' is used for whitewashing.\nName the substance 'X' and write its formula.\nWrite the reaction of the substance 'X' named in (i) above with water.",
                    a: "Answer:\nThe substance X is Calcium Oxide (Quicklime). Its formula is CaO.\n$$\\text{CaO}\\text{(s)} + \\text{H}_2\\text{O}\\text{(l)} \\rightarrow \\text{Ca(OH)}_2\\text{(aq)}$$"
                },
                {
                    q: "Question 5.\nIn the Electrolysis of water, why is the amount of gas collected in one of the test tubes twice the gas collected in the other test tube?",
                    a: "Answer:\nWater (H₂O) contains two parts of hydrogen and one part of oxygen. The ratio of water components i.e., hydrogen and oxygen is 2:1. Therefore, the amount of hydrogen and oxygen produced after water electrolysis is in a ratio of 2:1. This is why during electrolysis the amount of gas collected in hydrogen's test tube is double the amount collected in the oxygen's test tube.\n\nThe electrolysis reaction is:\n$$2\\text{H}_2\\text{O}\\text{(l)} \\xrightarrow{\\text{electricity}} 2\\text{H}_2\\text{(g)} + \\text{O}_2\\text{(g)}$$",
                    diagram: 'electrolysis'
                },
                {
                    q: "Question 6.\nWhy does the color of copper sulphate solution change when an iron nail is dipped in it?",
                    a: "Answer:\nIron is more reactive than copper. When an iron nail is dipped in copper sulphate solution, iron displaces copper from copper sulphate, forming iron sulphate (green colour) and depositing copper metal.\n$$\\text{Fe}\\text{(s)} + \\text{CuSO}_4\\text{(aq)} \\rightarrow \\text{FeSO}_4\\text{(aq)} + \\text{Cu}\\text{(s)}$$"
                },
                {
                    q: "Question 7.\nGive an example of a double displacement reaction other than the one given in Activity 1.10.",
                    a: "Answer:\n$$2\\text{KBr}\\text{(aq)} + \\text{BaI}_2\\text{(aq)} \\rightarrow 2\\text{KI}\\text{(aq)} + \\text{BaBr}_2\\text{(aq)}$$"
                },
                {
                    q: "Question 8.\nIdentify the substances that are oxidised and the substances that are reduced in the following reactions.\n$$4\\text{Na}\\text{(s)} + \\text{O}_2\\text{(g)} \\rightarrow 2\\text{Na}_2\\text{O}\\text{(s)}$$\n$$\\text{CuO}\\text{(s)} + \\text{H}_2\\text{(g)} \\rightarrow \\text{Cu}\\text{(s)} + \\text{H}_2\\text{O}\\text{(l)}$$",
                    a: "Answer:\nIn reaction 1: Sodium (Na) is **oxidised** because it gains oxygen to form sodium oxide.\nIn reaction 2: Copper oxide (CuO) is **reduced** to copper (Cu). Hydrogen (H₂) is **oxidised** to water (H₂O)."
                },
                {
                    q: "Question 9.\nWhat is a balanced chemical equation? Why should chemical equations be balanced?",
                    a: "Answer:\nThe total mass of the elements present in the products of a chemical reaction has to be equal to the total mass of the elements present in the reactants. In other words, the number of atoms of each element remains the same, before and after a chemical reaction. This is called a Balanced Chemical Equation.\nWe must balance the chemical equation to satisfy the **Law of Conservation of Mass**, otherwise it remains a skeletal (unbalanced) equation."
                },
                {
                    q: "KSEEB SSLC Class 10 Science Chapter 1 Textbook Exercises\nQuestion 1.\nWhich of the statements about the reaction below are incorrect?\n$$2\\text{PbO}\\text{(s)} + \\text{C}\\text{(s)} \\rightarrow 2\\text{Pb}\\text{(s)} + \\text{CO}_2\\text{(g)}$$\n(a) Lead is getting reduced.\n(b) Carbon dioxide is getting oxidised.\n(c) Carbon is getting oxidised.\n(d) Lead oxide is getting reduced.",
                    a: "Answer:\n**(a) and (b)** are incorrect.\nLead IS getting reduced (gains electrons / loses oxygen ✓), but it is already stated as getting reduced — this is actually correct. Carbon dioxide is NOT getting oxidised; it is a product. Carbon IS getting oxidised (gains oxygen). Lead oxide IS getting reduced."
                },
                {
                    q: "Question 2.\n$$\\text{Fe}_2\\text{O}_3 + 2\\text{Al} \\rightarrow \\text{Al}_2\\text{O}_3 + 2\\text{Fe}$$\nThe above reaction is an example of a:\n(a) Combination reaction\n(b) Double displacement reaction\n(c) Decomposition reaction\n(d) Displacement reaction",
                    a: "Answer:\n(d) The reaction is an example of a **displacement reaction**. Aluminium (more reactive) displaces iron from iron oxide."
                },
                {
                    q: "Question 3.\nWhat happens when dilute hydrochloric acid is added to iron fillings? Tick the correct answer.\n(a) Hydrogen gas and iron chloride are produced.\n(b) Chlorine gas and iron hydroxide are produced.\n(c) No reaction takes place.\n(d) Iron salt and water are produced.",
                    a: "Answer:\n(a) Hydrogen gas and iron chloride are produced.\n$$\\text{Fe}\\text{(s)} + 2\\text{HCl}\\text{(aq)} \\rightarrow \\text{FeCl}_2\\text{(aq)} + \\text{H}_2\\uparrow$$"
                },
                {
                    q: "Question 4.\nTranslate the following statements into chemical equations and then balance them.\n(a) Hydrogen gas combines with nitrogen to form ammonia.\n(b) Hydrogen sulphide gas burns in air to give water and sulphur dioxide.\n(c) Barium chloride reacts with aluminium sulphate to give aluminium chloride and a precipitate of barium sulphate.\n(d) Potassium metal reacts with water to give potassium hydroxide and hydrogen gas.",
                    a: "Answer:\n$$3\\text{H}_2\\text{(g)} + \\text{N}_2\\text{(g)} \\rightarrow 2\\text{NH}_3\\text{(g)}$$\n$$2\\text{H}_2\\text{S}\\text{(g)} + 3\\text{O}_2\\text{(g)} \\rightarrow 2\\text{H}_2\\text{O}\\text{(l)} + 2\\text{SO}_2\\text{(g)}$$\n$$3\\text{BaCl}_2\\text{(aq)} + \\text{Al}_2\\text{(SO}_4\\text{)}_3\\text{(aq)} \\rightarrow 2\\text{AlCl}_3\\text{(aq)} + 3\\text{BaSO}_4\\text{(s)}\\downarrow$$\n$$2\\text{K}\\text{(s)} + 2\\text{H}_2\\text{O}\\text{(l)} \\rightarrow 2\\text{KOH}\\text{(aq)} + \\text{H}_2\\text{(g)}\\uparrow$$"
                },
                {
                    q: "Question 5.\nBalance the following chemical equations.\n(a) $$\\text{HNO}_3 + \\text{Ca(OH)}_2 \\rightarrow \\text{Ca(NO}_3\\text{)}_2 + \\text{H}_2\\text{O}$$\n(b) $$\\text{NaOH} + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{Na}_2\\text{SO}_4 + \\text{H}_2\\text{O}$$\n(c) $$\\text{NaCl} + \\text{AgNO}_3 \\rightarrow \\text{AgCl} + \\text{NaNO}_3$$\n(d) $$\\text{BaCl}_2 + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{BaSO}_4 + \\text{HCl}$$",
                    a: "Answer:\n$$2\\text{HNO}_3 + \\text{Ca(OH)}_2 \\rightarrow \\text{Ca(NO}_3\\text{)}_2 + 2\\text{H}_2\\text{O}$$\n$$2\\text{NaOH} + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{Na}_2\\text{SO}_4 + 2\\text{H}_2\\text{O}$$\n$$\\text{NaCl} + \\text{AgNO}_3 \\rightarrow \\text{AgCl}\\downarrow + \\text{NaNO}_3$$\n$$\\text{BaCl}_2 + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{BaSO}_4\\downarrow + 2\\text{HCl}$$"
                },
                {
                    q: "Question 6.\nWrite the balanced chemical equations for the following reactions.\n(a) Calcium hydroxide + Carbon dioxide → Calcium carbonate + Water\n(b) Zinc + Silver nitrate → Zinc nitrate + Silver\n(c) Aluminium + Copper chloride → Aluminium chloride + Copper\n(d) Barium chloride + Potassium sulphate → Barium sulphate + Potassium chloride",
                    a: "Answer:\n$$\\text{Ca(OH)}_2\\text{(aq)} + \\text{CO}_2\\text{(g)} \\rightarrow \\text{CaCO}_3\\text{(s)}\\downarrow + \\text{H}_2\\text{O}\\text{(l)}$$\n$$\\text{Zn}\\text{(s)} + 2\\text{AgNO}_3\\text{(aq)} \\rightarrow \\text{Zn(NO}_3\\text{)}_2\\text{(aq)} + 2\\text{Ag}\\text{(s)}$$\n$$2\\text{Al}\\text{(s)} + 3\\text{CuCl}_2\\text{(aq)} \\rightarrow 2\\text{AlCl}_3\\text{(aq)} + 3\\text{Cu}\\text{(s)}$$\n$$\\text{BaCl}_2\\text{(aq)} + \\text{K}_2\\text{SO}_4\\text{(aq)} \\rightarrow \\text{BaSO}_4\\text{(s)}\\downarrow + 2\\text{KCl}\\text{(aq)}$$"
                },
                {
                    q: "Question 7.\nWrite the balanced chemical equation for the following and identify the type of reaction in each case.\n(a) Potassium bromide(aq) + Barium iodide(aq) → Potassium iodide(aq) + Barium bromide(s)\n(b) Zinc carbonate(s) → Zinc oxide(s) + Carbon dioxide(g)\n(c) Hydrogen(g) + Chlorine(g) → Hydrogen chloride(g)\n(d) Magnesium(s) + Hydrochloric acid(aq) → Magnesium chloride(aq) + Hydrogen(g)",
                    a: "Answer:\n$$2\\text{KBr}\\text{(aq)} + \\text{BaI}_2\\text{(aq)} \\rightarrow 2\\text{KI}\\text{(aq)} + \\text{BaBr}_2\\text{(s)}\\downarrow$$ → Double displacement reaction\n$$\\text{ZnCO}_3\\text{(s)} \\rightarrow \\text{ZnO}\\text{(s)} + \\text{CO}_2\\text{(g)}$$ → Decomposition reaction\n$$\\text{H}_2\\text{(g)} + \\text{Cl}_2\\text{(g)} \\rightarrow 2\\text{HCl}\\text{(g)}$$ → Combination reaction\n$$\\text{Mg}\\text{(s)} + 2\\text{HCl}\\text{(aq)} \\rightarrow \\text{MgCl}_2\\text{(aq)} + \\text{H}_2\\text{(g)}\\uparrow$$ → Displacement reaction"
                },
                {
                    q: "Question 8.\nWhat does one mean by exothermic and endothermic reactions? Give examples.",
                    a: "Answer:\n**Exothermic reactions**: Reactions in which heat is released along with the formation of products.\n$$\\text{CH}_4\\text{(g)} + 2\\text{O}_2\\text{(g)} \\rightarrow \\text{CO}_2\\text{(g)} + 2\\text{H}_2\\text{O}\\text{(g)} + \\text{Heat}$$\n\n**Endothermic reactions**: Reactions in which energy is absorbed from the surroundings.\n$$6\\text{CO}_2\\text{(g)} + 6\\text{H}_2\\text{O}\\text{(l)} \\xrightarrow{\\text{sunlight}} \\text{C}_6\\text{H}_{12}\\text{O}_6\\text{(aq)} + 6\\text{O}_2\\text{(g)}$$"
                },
                {
                    q: "Question 9.\nWhy is respiration considered an exothermic reaction? Explain.",
                    a: "Answer:\nDuring digestion, complex food molecules are broken into simpler molecules such as glucose. This glucose combines with oxygen in the cells of our body and provides energy. The overall reaction releases heat energy, hence respiration is considered an exothermic reaction.\n$$\\text{C}_6\\text{H}_{12}\\text{O}_6\\text{(aq)} + 6\\text{O}_2\\text{(g)} \\rightarrow 6\\text{CO}_2\\text{(g)} + 6\\text{H}_2\\text{O}\\text{(l)} + \\text{Energy}$$"
                },
                {
                    q: "Question 10.\nWhy are decomposition reactions called the opposite of combination reactions? Write equations for these reactions.",
                    a: "Answer:\nDecomposition reactions involve the breaking down of compounds into two or more simpler substances (require energy input). Combination reactions involve two or more substances combining to give a single new substance (may release energy). They are therefore exact opposites.\n\nDecomposition example:\n$$\\text{ZnCO}_3\\text{(s)} \\xrightarrow{\\text{heat}} \\text{ZnO}\\text{(s)} + \\text{CO}_2\\text{(g)}$$\nCombination example:\n$$\\text{H}_2\\text{(g)} + \\text{Cl}_2\\text{(g)} \\rightarrow 2\\text{HCl}\\text{(g)}$$"
                },
                {
                    q: "Question 11.\nWrite one equation each for decomposition reactions where energy is supplied in the form of heat, light or electricity.",
                    a: "Answer:\n**Thermal decomposition (heat):**\n$$2\\text{Pb(NO}_3\\text{)}_2\\text{(s)} \\xrightarrow{\\Delta} 2\\text{PbO}\\text{(s)} + 4\\text{NO}_2\\text{(g)} + \\text{O}_2\\text{(g)}$$\n**Decomposition by light (photolysis):**\n$$2\\text{AgCl}\\text{(s)} \\xrightarrow{h\\nu} 2\\text{Ag}\\text{(s)} + \\text{Cl}_2\\text{(g)}$$\n**Decomposition by electricity (electrolysis):**\n$$2\\text{H}_2\\text{O}\\text{(l)} \\xrightarrow{\\text{electricity}} 2\\text{H}_2\\text{(g)} + \\text{O}_2\\text{(g)}$$"
                },
                {
                    q: "Question 12.\nWhat is the difference between displacement and double displacement reactions? Write equations for these reactions.",
                    a: "Answer:\nIn a **displacement reaction**, a more reactive element displaces a less reactive element from a compound:\n$$\\text{CuSO}_4\\text{(aq)} + \\text{Zn}\\text{(s)} \\rightarrow \\text{ZnSO}_4\\text{(aq)} + \\text{Cu}\\text{(s)}$$\n\nIn a **double displacement reaction**, ions of two compounds exchange places to form two new compounds:\n$$\\text{Na}_2\\text{SO}_4\\text{(aq)} + \\text{BaCl}_2\\text{(aq)} \\rightarrow \\text{BaSO}_4\\text{(s)}\\downarrow + 2\\text{NaCl}\\text{(aq)}$$"
                },
                {
                    q: "Question 13.\nIn the refining of silver, the recovery of silver from silver nitrate solution involved displacement by copper metal. Write down the reactions involved.",
                    a: "Answer:\n$$\\text{Cu}\\text{(s)} + 2\\text{AgNO}_3\\text{(aq)} \\rightarrow \\text{Cu(NO}_3\\text{)}_2\\text{(aq)} + 2\\text{Ag}\\text{(s)}$$\nCopper (more reactive) displaces silver from silver nitrate solution, depositing silver metal."
                },
                {
                    q: "Question 14.\nWhat do you mean by a precipitation reaction? Explain by giving examples.",
                    a: "Answer:\nA reaction in which an insoluble solid (precipitate) is produced when two solutions are mixed is called a precipitation reaction.\n$$\\text{BaCl}_2\\text{(aq)} + \\text{Na}_2\\text{SO}_4\\text{(aq)} \\rightarrow \\text{BaSO}_4\\text{(s)}\\downarrow + 2\\text{NaCl}\\text{(aq)}$$\nThe white precipitate of BaSO₄ is formed by the reaction of SO₄²⁻ and Ba²⁺ ions. Sodium chloride remains dissolved in solution."
                },
                {
                    q: "Question 15.\nExplain the following in terms of gain or loss of oxygen with two examples each.\n(a) Oxidation (Gain of Oxygen)\n(b) Reduction (Loss of Oxygen)",
                    a: "Answer:\n**Oxidation** (gain of oxygen):\n$$2\\text{Mg}\\text{(s)} + \\text{O}_2\\text{(g)} \\rightarrow 2\\text{MgO}\\text{(s)}$$ (Mg is oxidised)\n$$2\\text{Cu}\\text{(s)} + \\text{O}_2\\text{(g)} \\rightarrow 2\\text{CuO}\\text{(s)}$$ (Cu is oxidised)\n\n**Reduction** (loss of oxygen):\n$$\\text{CuO}\\text{(s)} + \\text{H}_2\\text{(g)} \\rightarrow \\text{Cu}\\text{(s)} + \\text{H}_2\\text{O}\\text{(l)}$$ (CuO is reduced)\n$$\\text{CO}_2\\text{(g)} + \\text{C}\\text{(s)} \\rightarrow 2\\text{CO}\\text{(g)}$$ (CO₂ is reduced)"
                },
                {
                    q: "Question 16.\nA shiny brown coloured element 'X' on heating in air becomes black in colour. Name the element 'X' and the black coloured compound formed.",
                    a: "Answer:\n'X' is **Copper (Cu)**. The black coloured compound formed is **Copper(II) oxide (CuO)**.\n$$2\\text{Cu}\\text{(s)} + \\text{O}_2\\text{(g)} \\xrightarrow{\\Delta} 2\\text{CuO}\\text{(s)}$$"
                },
                {
                    q: "Question 18.\nWhy do we apply paint on iron articles?",
                    a: "Answer:\nIron articles are painted to prevent them from rusting. When painted, the contact of iron articles with atmospheric moisture and air is cut off. Hence, rusting is prevented.\n$$4\\text{Fe}\\text{(s)} + 3\\text{O}_2\\text{(g)} + x\\text{H}_2\\text{O} \\rightarrow 2\\text{Fe}_2\\text{O}_3 \\cdot x\\text{H}_2\\text{O (rust)}$$"
                },
                {
                    q: "Question 19.\nOil and fat containing food items are flushed with nitrogen. Why?",
                    a: "Answer:\nOil and fat containing food items are flushed with nitrogen to prevent them from getting oxidised, which may result in rancidity. When fats and oils are oxidised, they become rancid and their smell and taste change. Nitrogen is an inert gas that displaces oxygen and creates a protective atmosphere."
                },
                {
                    q: "Question 20.\nExplain the following terms with one example each.\n(a) Corrosion\n(b) Rancidity",
                    a: "Answer:\n**Corrosion:**\nWhen a metal is attacked by substances around it such as moisture and acids, it gets corroded. For example, rusting of iron:\n$$4\\text{Fe}\\text{(s)} + 3\\text{O}_2\\text{(g)} + x\\text{H}_2\\text{O}\\text{(l)} \\rightarrow 2\\text{Fe}_2\\text{O}_3 \\cdot x\\text{H}_2\\text{O}\\text{(s)}$$\n\n**Rancidity:**\nThe process by which fats and oils in food get oxidised, resulting in a change of smell and taste. For example, chips kept open become rancid. To prevent rancidity, antioxidants are added and food packets are flushed with nitrogen gas."
                },
                {
                    q: "KSEEB SSLC Class 10 Science Chapter 1 Additional Questions and Answers\nQuestion 1.\nHow do you determine whether a chemical reaction has taken place?",
                    a: "Answer:\nThe following observations help us determine whether a chemical reaction has taken place:\n\n• Change in state\n• Change in colour\n• Evolution of a gas\n• Change in temperature"
                },
                {
                    q: "Question 2.\nWrite the balanced equation for the reaction of iron with steam.",
                    a: "Answer:\n$$3\\text{Fe}\\text{(s)} + 4\\text{H}_2\\text{O}\\text{(g)} \\rightarrow \\text{Fe}_3\\text{O}_4\\text{(s)} + 4\\text{H}_2\\text{(g)}$$"
                },
                {
                    q: "Question 3.\nWhat is quicklime? Write one use of quicklime.",
                    a: "Answer:\nCalcium oxide (CaO) is called lime or quicklime. It is used in the manufacture of cement."
                },
                {
                    q: "Question 4.\nWhat are antioxidants?",
                    a: "Answer:\nThe substances which prevent oxidation (and hence rancidity) are called antioxidants. Examples include BHA (Butylated Hydroxyanisole) and BHT (Butylated Hydroxytoluene)."
                }
            ]
        },
        {
            name: 'NEET & KCET',
            emoji: '⚕️',
            color: '#4f46e5',
            weightage: '2-4 MCQs',
            freq: 'High Yield Link',
            topics: [
                'Oxidation & Reduction (OIL RIG)',
                'Identifying Oxidizing/Reducing Agents',
                'Activity Series & Displacement',
                'Decomposition Options'
            ],
            strategy: 'Master the "OIL RIG" concept (Oxidation Is Loss, Reduction Is Gain) and practice identifying oxidizing and reducing agents. Every NEET/KCET paper tests this continuously. You MUST memorize the complete metal Activity Series (K > Na > Ca...) to predict displacement products accurately.',
            pitfalls: [
                'Incorrectly identifying the oxidizing agent — remember, the oxidizing agent is the substance that gets REDUCED.',
                'Applying "gain of oxygen = reduction" (which is wrong).',
                'Failing to recognize H₂ as a reducing agent in complex redox reactions.'
            ]
        },
        {
            name: 'Olympiad (NSO/NTSE)',
            emoji: '🏅',
            color: '#eab308',
            weightage: '5+ Adv. MCQs',
            freq: 'Application Focus',
            topics: [
                'Predicting Products of Unknown Reactions',
                'Multi-step Balanced Equations',
                'Photochemical vs Thermal Decomp.',
                'Energy Changes (Exo/Endothermic)'
            ],
            strategy: 'Olympiads test deep conceptual understanding beyond the NCERT level. Learn the practical "Why?" — why does silver tarnish black (Ag₂S) while gold does not? Practice predicting the products of equations from scratch, without them being given to you.',
            pitfalls: [
                'Getting stuck on equations involving fractional coefficients (always multiply to convert them to whole numbers).',
                'Confusing displacement with double displacement when precipitates form.',
                'Missing the catalyst requirements (like sunlight or MnO₂) for certain decomposition reactions.'
            ]
        }
    ],
    proTips: [
        'Use the **SALT** method for balancing: **S** = Start with most complex molecule, **A** = check All atoms, **L** = Leave hydrogen and oxygen last, **T** = Tally both sides.',
        '**Golden Rule:** If you can balance any equation in under 2 minutes AND identify all 5 reaction types without hesitation, you will score full marks from this chapter in Boards.',
        'Create a \'reaction types\' cheat sheet: for each of the 5 types, write its general form + 2 examples + its key identifier.',
        '"OIL RIG" is your best friend for Redox reactions. Write it at the top of your rough sheet in competitive exams!'
    ]
};

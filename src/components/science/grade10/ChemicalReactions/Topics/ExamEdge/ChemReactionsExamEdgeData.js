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

export const TERMS = [
    {
        name: 'Organic Compound',
        color: '#f59e0b',
        icon: '🌿',
        def: 'A compound that contains at least one Carbon-Hydrogen (C–H) bond. Examples include all hydrocarbons, alcohols, sugars, proteins, and DNA.',
        examples: ['Methane (CH₄) — simplest organic compound', 'Glucose (C₆H₁₂O₆) — sugar', 'Ethanol (C₂H₅OH) — alcohol'],
        inUse: 'Organic compounds contain C–H bonds. Remember: CO₂, CO, and Na₂CO₃ contain carbon but NO C–H bond — they are inorganic.',
        memory: '"Organic" means carbon + hydrogen bonded together. No C–H bond = not organic!'
    },
    {
        name: 'Inorganic Compound',
        color: '#0d9488',
        icon: '⛏️',
        def: 'A compound that does NOT contain a Carbon-Hydrogen bond. This includes most mineral compounds, salts, acids, bases, and the special carbon exceptions (CO₂, CO, Na₂CO₃).',
        examples: ['NaCl (table salt)', 'CO₂ (carbon dioxide — no C–H bond!)', 'H₂SO₄ (sulfuric acid)', 'Na₂CO₃ (washing soda)'],
        inUse: 'CO₂, CO, Na₂CO₃, NaHCO₃ contain carbon but are classified as inorganic — they have no C–H bond.',
        memory: 'CO₂ looks organic (has carbon) but has no hydrogen — it\'s inorganic. This is the most common classification trap!'
    },
    {
        name: 'Hydrocarbon',
        color: '#d97706',
        icon: '⛽',
        def: 'A compound containing only Carbon (C) and Hydrogen (H) atoms. The simplest class of organic compounds.',
        examples: ['Methane: CH₄ (natural gas)', 'Ethane: C₂H₆', 'Propane: C₃H₈ (LPG cooking gas)', 'Ethylene: C₂H₄ (double bond)'],
        inUse: 'Hydrocarbons are the basis of petroleum products. They burn in oxygen to release energy: CH₄ + 2O₂ → CO₂ + 2H₂O.',
        memory: 'Hydro = Hydrogen, Carbon = Carbon. A hydrocarbon contains ONLY H and C atoms, nothing else!'
    },
    {
        name: 'Tetravalency of Carbon',
        color: '#f59e0b',
        icon: '4️⃣',
        def: 'Carbon always forms exactly 4 covalent bonds with other atoms. Its electronic configuration (K=2, L=4) means it has 4 valence electrons and needs 4 more to complete its octet.',
        examples: ['CH₄: C forms 4 bonds with 4 H atoms', 'CO₂: C forms 2 double bonds with 2 O atoms', 'C₂H₆: each C forms 1 bond with the other C and 3 bonds with H'],
        inUse: 'Carbon\'s tetravalency is why it forms such a huge variety of molecules. It can form single, double, or triple bonds in countless combinations.',
        memory: 'Tetra = 4. Carbon\'s 4 valence electrons (L-shell) mean it ALWAYS makes exactly 4 bonds. Never 3, never 5.'
    },
    {
        name: 'Catenation',
        color: '#b45309',
        icon: '🔗',
        def: 'The unique ability of carbon atoms to bond with each other to form long chains, branched chains, and rings of carbon atoms. No other element can do this to the same extent.',
        examples: ['Straight chain: C–C–C–C–C (pentane)', 'Branched: carbon with side chains', 'Ring: benzene (C₆H₆) — 6 carbons in a ring'],
        inUse: 'Catenation is why over 10 million organic compounds exist! Carbon can form chains of thousands of atoms, making proteins, DNA, and plastics possible.',
        memory: 'Catena = chain in Latin. Carbon catenates = carbon chains with itself. ONLY carbon does this extensively.'
    },
    {
        name: 'Single Bond (C–C)',
        color: '#92400e',
        icon: '—',
        def: 'A covalent bond formed by sharing ONE pair of electrons between two carbon atoms. Single bonds allow free rotation.',
        examples: ['Ethane: H₃C–CH₃ (C–C single bond)', 'Propane: CH₃–CH₂–CH₃', 'All saturated hydrocarbons (alkanes) have only single bonds'],
        inUse: 'Compounds with only single bonds are called "saturated". They have the maximum number of hydrogen atoms.',
        memory: 'One pair shared = one line (–) between atoms. C–C uses 2 electrons (one from each C).'
    },
    {
        name: 'Double Bond (C=C)',
        color: '#f97316',
        icon: '=',
        def: 'A covalent bond formed by sharing TWO pairs of electrons between two carbon atoms. Makes the molecule more reactive than a single bond.',
        examples: ['Ethylene (ethene): H₂C=CH₂', 'Propene: CH₃–CH=CH₂', 'Used in polymerisation to make plastics like polyethylene'],
        inUse: 'Compounds with one or more C=C double bonds are "unsaturated". They react with bromine water (decolorise it).',
        memory: 'Two pairs shared = double line (=) between atoms. C=C uses 4 electrons (2 from each C).'
    },
    {
        name: 'Triple Bond (C≡C)',
        color: '#dc2626',
        icon: '≡',
        def: 'A covalent bond formed by sharing THREE pairs of electrons between two carbon atoms. Most reactive of the three bond types.',
        examples: ['Acetylene (ethyne): HC≡CH — used in welding torches', 'Nitrogen (N≡N) — similar triple bond between nitrogen atoms'],
        inUse: 'Triple bonds make molecules very reactive. Acetylene burns at very high temperatures (~3500°C) — used for metal cutting.',
        memory: 'Three pairs shared = triple line (≡). C≡C = 6 electrons shared. Very reactive due to high electron density.'
    },
];

export const KEY_IDENTITIES = [
    {
        name: 'The C–H Bond Rule',
        desc: 'A compound is classified as organic if and only if it contains at least one Carbon-Hydrogen (C–H) bond.',
        formula: '\\text{Organic compound} \\Leftrightarrow \\text{contains C–H bond}'
    },
    {
        name: 'Important Inorganic Carbon Exceptions',
        desc: 'These compounds contain carbon but NO C–H bond — they are classified as inorganic. This is the most commonly tested classification rule.',
        formula: '\\text{CO}_2,\\ \\text{CO},\\ \\text{Na}_2\\text{CO}_3,\\ \\text{NaHCO}_3,\\ \\text{CaCO}_3 \\rightarrow \\text{Inorganic}'
    },
    {
        name: 'Carbon\'s Electronic Configuration',
        desc: 'Carbon has atomic number Z = 6. Its 4 valence electrons in the L-shell are the reason for its tetravalency and unique bonding ability.',
        formula: '\\text{C (Z=6): K=2, L=4} \\Rightarrow \\text{Valency} = 4'
    },
];

export const VOCAB_QUIZ = [
    {
        question: 'Which of these compounds is ORGANIC?',
        options: ['CO₂', 'Na₂CO₃', 'CH₄', 'NaCl'],
        correct: 2,
        explanation: 'CH₄ (methane) has a C–H bond → organic. CO₂ has no C–H bond (inorganic). Na₂CO₃ has carbon but no C–H bond (inorganic). NaCl has no carbon (inorganic).'
    },
    {
        question: 'CO₂ contains carbon but is classified as INORGANIC because:',
        options: ['It is a gas', 'It has no C–H bond', 'Carbon has no valency', 'It is made in labs'],
        correct: 1,
        explanation: 'The rule is: organic = contains C–H bond. CO₂ has C bonded to O, not H. No C–H bond = inorganic, even if the compound contains carbon.'
    },
    {
        question: 'The unique ability of carbon to bond with itself to form long chains is called:',
        options: ['Tetravalency', 'Catenation', 'Isomerism', 'Polymerisation'],
        correct: 1,
        explanation: 'Catenation is carbon\'s unique ability to bond with other carbon atoms. No other element can form such long stable chains as extensively as carbon.'
    },
    {
        question: 'Carbon (Z=6) always forms exactly how many bonds?',
        options: ['2', '3', '4', '6'],
        correct: 2,
        explanation: 'Carbon has 4 valence electrons (K=2, L=4). It needs 4 more electrons to complete its octet → forms exactly 4 covalent bonds. This is its tetravalency.'
    },
    {
        question: 'Ethylene (H₂C=CH₂) contains a:',
        options: ['Single bond (C–C)', 'Double bond (C=C)', 'Triple bond (C≡C)', 'Ionic bond'],
        correct: 1,
        explanation: 'Ethylene (ethene) has two carbon atoms connected by a double bond (C=C) — 2 shared electron pairs. It is the simplest unsaturated hydrocarbon.'
    },
    {
        question: 'A compound containing ONLY carbon and hydrogen atoms is called a:',
        options: ['Carbohydrate', 'Hydrocarbon', 'Polymer', 'Carbonate'],
        correct: 1,
        explanation: 'A hydrocarbon contains ONLY C and H atoms. Examples: methane (CH₄), ethane (C₂H₆), propane (C₃H₈). Other atoms like O or N would make it a non-hydrocarbon organic compound.'
    },
    {
        question: 'HC≡CH (acetylene) contains a:',
        options: ['Single bond (C–C)', 'Double bond (C=C)', 'Triple bond (C≡C)', 'Ionic bond'],
        correct: 2,
        explanation: 'Acetylene (ethyne, HC≡CH) has a C≡C triple bond — 3 shared electron pairs. It burns at ~3500°C and is used in welding torches.'
    },
    {
        question: 'A saturated hydrocarbon has only:',
        options: ['Double bonds (C=C)', 'Triple bonds (C≡C)', 'Single bonds (C–C)', 'Ionic bonds'],
        correct: 2,
        explanation: 'Saturated hydrocarbons (alkanes) contain ONLY single bonds (C–C). They are "saturated" with hydrogen — no more H can be added. Example: methane (CH₄), ethane (C₂H₆).'
    },
    {
        question: 'Which of these is an INORGANIC carbon compound (contains C but no C–H bond)?',
        options: ['CH₄', 'C₂H₆', 'Na₂CO₃', 'C₆H₁₂O₆'],
        correct: 2,
        explanation: 'Na₂CO₃ (washing soda) contains carbon but the carbon is bonded to oxygen and sodium, not hydrogen. No C–H bond → inorganic. This is one of the classic inorganic carbon exceptions.'
    },
    {
        question: 'Why can silicon (Si) NOT form chains as long as carbon chains?',
        options: ['Silicon has more electrons', 'Silicon has valency 2', 'Si–Si bonds are much weaker than C–C bonds', 'Silicon is a metal'],
        correct: 2,
        explanation: 'Although silicon also has valency 4, Si–Si bonds are weaker and less stable than C–C bonds. This is why carbon\'s catenation is unique — only carbon can form stable chains of millions of atoms.'
    },
    {
        question: 'A compound with a C=C double bond is described as:',
        options: ['Saturated', 'Unsaturated', 'Inorganic', 'Ionic'],
        correct: 1,
        explanation: 'Unsaturated compounds have one or more C=C double bonds (or C≡C triple bonds). They can react with bromine water (decolourise it), unlike saturated compounds.'
    },
    {
        question: 'Carbon\'s electronic configuration is K=2, L=4. Why does it always form 4 bonds?',
        options: ['It has 2 inner electrons', 'It has 4 outer electrons needing 4 more to complete the octet', 'It is a metal', 'It has 6 protons'],
        correct: 1,
        explanation: 'Carbon has 4 valence electrons in the L-shell. It needs 4 more to complete its octet of 8. So it forms exactly 4 covalent bonds — this is tetravalency.'
    },
];

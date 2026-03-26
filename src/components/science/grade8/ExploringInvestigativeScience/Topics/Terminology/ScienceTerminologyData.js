export const SCIENCE_TERMS = [
    {
        icon: '🔬',
        name: 'Scientific Investigation',
        color: '#0e7490',
        def: 'A systematic process of asking a focused question, designing an experiment, collecting observations, and drawing evidence-based conclusions. It transforms curiosity into knowledge.',
        examples: [
            '🍳 Does dough thickness affect whether a puri puffs?',
            '🌱 Does sunlight affect plant growth speed?',
            '🧲 Does distance from a magnet affect its pull?',
        ],
        inUse: '"In this investigation, we changed only the dough thickness and observed whether the puri puffed or not."',
        memory: 'Think of investigation as a detective story: you have a mystery (question), clues (variables), and a conclusion (solution)!'
    },
    {
        icon: '❓',
        name: 'Hypothesis',
        color: '#7c3aed',
        def: 'A scientific statement that predicts the expected outcome of an experiment. It must be testable — you must be able to prove it right or wrong through observation.',
        examples: [
            '"If the dough is thicker, the puri will NOT puff."',
            '"If temperature is higher, the reaction will be faster."',
            '"If more fertiliser is added, the plant will grow taller."',
        ],
        inUse: '"My hypothesis is: if puri dough is rolled thin, it will puff more due to steam expansion."',
        memory: 'A hypothesis is a smart guess with a reason. Format: "If [condition], then [result] because [reason]."'
    },
    {
        icon: '🎛️',
        name: 'Independent Variable',
        color: '#0d9488',
        def: 'The ONE factor that the scientist deliberately changes in an experiment to test its effect. Only ONE variable should be changed at a time for a "fair test".',
        examples: [
            '🍳 Dough thickness (changed between trials)',
            '🌡️ Oil temperature (set to different values)',
            '🌱 Amount of water given to plants',
        ],
        inUse: '"We changed the oil temperature as our independent variable to see how it affects puffing."',
        memory: 'INDEPENDENT = I control it. The experimenter deliberately changes it. It is the "cause".'
    },
    {
        icon: '📊',
        name: 'Dependent Variable',
        color: '#059669',
        def: 'The factor that is measured or observed as a result of changing the independent variable. It changes in response to the independent variable — it is the "effect".',
        examples: [
            '🍳 Whether the puri puffed (Yes/No)',
            '⏱️ Time taken for puri to puff (seconds)',
            '📏 Height of plant after 2 weeks (cm)',
        ],
        inUse: '"We measured the puffing time as our dependent variable."',
        memory: 'DEPENDENT = it DEPENDS on the independent variable. It is the "effect" you measure.'
    },
    {
        icon: '🔒',
        name: 'Controlled Variable',
        color: '#f59e0b',
        def: 'All the factors that are kept the same throughout the experiment to ensure a fair test. If these change, you cannot be sure what caused the result.',
        examples: [
            '🍳 Type of flour used (always atta)',
            '🌡️ Oil temperature stays same across trials',
            '⏱️ Same frying time for each puri',
        ],
        inUse: '"We kept the flour type, amount of water in dough, and oil type constant."',
        memory: 'Think of controlled variables as the "fair test" guarantee. Only ONE thing changes — everything else stays the same!'
    },
    {
        icon: '📋',
        name: 'Observation',
        color: '#ec4899',
        def: 'Information collected using senses (and instruments) during an experiment. Observations must be recorded accurately — they are the raw evidence of science.',
        examples: [
            '👁️ "The puri puffed within 4 seconds."',
            '👁️ "No puffing occurred at 100°C oil temp."',
            '📏 "Plant grew 3 cm in bright sunlight."',
        ],
        inUse: '"We recorded our observations in a table: thickness vs puffed/not puffed."',
        memory: 'Observations are FACTS not opinions. "The puri turned golden" is an observation. "It looked nice" is not science!'
    },
    {
        icon: '📌',
        name: 'Conclusion',
        color: '#2563eb',
        def: 'A statement that summarises what the experiment showed and whether the hypothesis was supported or not. Always based strictly on the data collected.',
        examples: [
            '"Thin puri dough (2mm) puffed in 100% of trials at 180°C."',
            '"Thick dough (6mm) did not puff in any trial."',
            '"Therefore, dough thickness affects puffing."',
        ],
        inUse: '"Conclusion: Thinner dough leads to better puffing because steam can expand the layers quickly."',
        memory: 'Conclusion = Evidence + Pattern + Statement. Always link back to your HYPOTHESIS!'
    },
    {
        icon: '🔁',
        name: 'Inference',
        color: '#14b8a6',
        def: 'An explanation or interpretation based on observations. Unlike an observation (what happened), an inference explains WHY it happened using scientific reasoning.',
        examples: [
            '📌 Obs: "Puri puffed." → Inference: "Steam inside expanded rapidly."',
            '📌 Obs: "Plant leaned toward window." → Inference: "It grew toward light source."',
        ],
        inUse: '"From our observations, we infer that the steam pressure inside the thin dough layers caused rapid expansion."',
        memory: 'Observation = WHAT you see. Inference = WHY you think it happened. Both are needed in science!'
    },
    {
        icon: '🧪',
        name: 'Experiment',
        color: '#8b5cf6',
        def: 'A carefully designed, controlled test performed to answer a scientific question. A good experiment has a clear question, controls variables, and produces measurable data.',
        examples: [
            '🍳 Puri Investigation: vary dough thickness, observe puffing',
            '🌱 Plant Growth: vary sunlight, measure height weekly',
            '🔋 Circuit: vary number of bulbs, measure brightness',
        ],
        inUse: '"We designed an experiment to test whether oil temperature affects the puffing of puris."',
        memory: 'EXPERIMENT = Question + Variables + Method + Observation + Conclusion. Missing any one part makes it incomplete!'
    },
    {
        icon: '⚖️',
        name: 'Fair Test',
        color: '#f97316',
        def: 'An experiment where only ONE variable is changed at a time while all others are kept constant. It ensures that the observed result is caused by the one changed variable.',
        examples: [
            '✅ Change oil temperature → keep dough thickness same',
            '✅ Change dough thickness → keep oil temperature same',
            '❌ Change both at once → unfair! Cannot identify cause.',
        ],
        inUse: '"Our test was fair because we only changed the dough thickness and kept everything else the same."',
        memory: 'ONE change at a time = Fair test. TWO changes = Confusing results. Always keep it fair!'
    },
];

export const SCIENCE_REACTION_CASES = [
    {
        num: 1,
        emoji: '🍳',
        title: 'The Puri Investigation',
        color: '#f59e0b',
        rule: 'Why does a puri puff?',
        detail: 'When thin puri dough is placed in hot oil, the water in the dough rapidly converts to steam. This steam expands between the two layers of dough, inflating it like a balloon. Thicker dough cannot separate as easily, so it does not puff well.',
        examples: [
            '🎯 Independent variable: dough thickness',
            '📊 Dependent variable: puffing (yes/no) and time taken',
            '🔒 Controlled: flour type, oil type, oil temperature',
        ],
        tip: 'The puri case is a GOLD STANDARD investigation example. Memorise its variables because this type of question appears in Grade 8 assessments!'
    },
    {
        num: 2,
        emoji: '🌡️',
        title: 'Heating Effect of Current',
        color: '#ef4444',
        rule: 'Does more current produce more heat?',
        detail: 'When electric current flows through a wire, the wire heats up. More current means more heat. This is the heating effect used in heaters, irons, and toasters. Investigation: change current level, measure wire temperature.',
        examples: [
            '⚡ Independent: amount of current (Amperes)',
            '🌡️ Dependent: temperature of wire (°C)',
            '🔒 Controlled: wire material, length, voltage',
        ],
        tip: 'The heating effect of current is both a physics concept AND an excellent investigation example — showing systematic thinking in electricity!'
    },
    {
        num: 3,
        emoji: '🌱',
        title: 'Microorganism Growth',
        color: '#10b981',
        rule: 'Do microorganisms grow faster in warmth?',
        detail: 'Microorganisms (bacteria) grow faster in warm, moist conditions. Refrigeration slows their growth — this is why we store food in the fridge! Investigation: grow bacteria at different temperatures and count colonies.',
        examples: [
            '🧫 Independent: temperature (4°C, 25°C, 37°C)',
            '🔬 Dependent: colony count after 24 hours',
            '🔒 Controlled: nutrient medium, starting bacteria amount',
        ],
        tip: 'This connects micro-world science to everyday life — food safety, vaccines, and antibiotics all depend on understanding microorganism growth!'
    },
    {
        num: 4,
        emoji: '💡',
        title: 'Light & Reflection',
        color: '#6366f1',
        rule: 'Does angle of incidence = angle of reflection?',
        detail: 'When light hits a flat mirror, the angle at which it hits (angle of incidence) equals the angle at which it bounces back (angle of reflection). Investigation: shine a laser at different angles and measure the reflected ray.',
        examples: [
            '🔆 Independent: angle of incidence',
            '📐 Dependent: angle of reflection',
            '🔒 Controlled: mirror type, laser colour, distance',
        ],
        tip: 'Law of Reflection is one of the most testable investigation setups in Grade 8 science — always know which angle is the incidence and which is the reflection!'
    },
    {
        num: 5,
        emoji: '🌙',
        title: 'Moon Phase Observation',
        color: '#8b5cf6',
        rule: 'Do moon phases follow a predictable pattern?',
        detail: 'By observing the moon every night for a month and recording its shape, you discover it follows a consistent 29.5-day cycle. This is how ancient civilisations created calendars! Investigation: observe and record moon phase nightly.',
        examples: [
            '📅 Independent: day of observation',
            '🌙 Dependent: moon phase (new/crescent/full...)',
            '🔒 Controlled: observation time (same time each night)',
        ],
        tip: 'Moon phase tracking shows that long-term systematic observation IS investigation — you do not always need a lab!'
    },
];

export const SCIENCE_VOCAB_QUIZ = [
    {
        question: 'In the puri investigation, dough thickness is the ___.',
        options: ['Dependent variable', 'Independent variable', 'Controlled variable', 'Hypothesis'],
        correct: 1,
        explanation: 'Dough thickness is the factor the scientist deliberately CHANGES — making it the independent variable (the cause being tested).'
    },
    {
        question: 'Which statement is a valid hypothesis?',
        options: [
            '"The puri will puff or not puff."',
            '"If dough is thin, the puri will puff because steam expands easily."',
            '"Puri tastes good."',
            '"We will fry puri in oil."'
        ],
        correct: 1,
        explanation: 'A hypothesis must be testable and include a prediction with a reason. "If...then...because" is the correct format.'
    },
    {
        question: 'In a fair test, how many variables should be changed at a time?',
        options: ['As many as possible', 'Two — to compare results', 'Only one', 'None — nothing should change'],
        correct: 2,
        explanation: 'A fair test means ONE independent variable is changed at a time. Changing more than one makes it impossible to identify the cause of a result.'
    },
    {
        question: '"The puri puffed in 3 seconds" is an example of a(n) ___.',
        options: ['Hypothesis', 'Conclusion', 'Observation', 'Inference'],
        correct: 2,
        explanation: 'An observation records WHAT happened — a factual, measurable event. "Puffed in 3 seconds" is a direct factual record.'
    },
    {
        question: 'What is the difference between an observation and an inference?',
        options: [
            'Observations are guesses; inferences are facts',
            'Observations record what happened; inferences explain why it happened',
            'Both are the same thing',
            'Inferences are only for lab experiments'
        ],
        correct: 1,
        explanation: 'Observation = WHAT (factual record). Inference = WHY (reasoned explanation). Both are vital parts of investigation.'
    },
];

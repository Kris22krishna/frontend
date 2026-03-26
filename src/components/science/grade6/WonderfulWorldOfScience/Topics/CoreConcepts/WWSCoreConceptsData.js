export const CORE_CONCEPTS = [
    /* ═══════════════════════════════════════════════
       CONCEPT 1.1 — WHAT IS SCIENCE & AREAS OF EXPLORATION
       ═══════════════════════════════════════════════ */
    {
        id: '1.1',
        title: 'What is Science?',
        subtitle: 'Exploring the World Around Us',
        desc: 'Science as exploration, and the 6 great areas of study.',
        icon: '🔬',
        color: '#0891b2',

        learn: {
            concept: 'Science is a way of thinking, observing, and understanding the world around us. It is like a never-ending jigsaw puzzle — every piece you discover reveals something new. Science covers everything from tiny seeds to faraway galaxies. There are six main areas of exploration: Earth & Environment, the Living World, Food & Materials, Materials Around Us, Water, and Beyond Earth.',
            rules: [
                {
                    title: 'Science as Exploration',
                    f: '\\text{Curiosity} + \\text{Observation} \\rightarrow \\text{Discovery}',
                    d: 'Science begins when you notice something and ask, "Why does this happen?" It is not about memorising facts — it is about exploring, questioning, and discovering answers.',
                    tip: 'Every great scientist started by simply being curious!',
                    ex: '\\text{Newton saw an apple fall → asked "Why?" → discovered gravity}'
                },
                {
                    title: 'Earth & Environment',
                    f: '\\text{Earth} = \\text{Our Home Planet}',
                    d: 'Earth is the only planet we know of that supports life. It has air, water, soil, and living beings. We must protect our environment — the air we breathe, the water we drink, and the forests that give us oxygen.',
                    tip: 'Think of Earth as a spaceship — we need to take care of it because there is no backup!',
                    ex: '\\text{Forests produce O}_2 \\text{ and absorb CO}_2'
                },
                {
                    title: 'The Living World & Food',
                    f: '\\text{Living Things} \\rightarrow \\text{Grow, Breathe, Reproduce}',
                    d: 'The living world includes all plants, animals, fungi, and tiny organisms like bacteria. All living things need food, water, and air. The food we eat comes from plants and animals — different cultures cook different cuisines using different ingredients!',
                    tip: 'If it grows, breathes, eats, and reproduces — it is alive!',
                    ex: '\\text{Seed + Water + Sunlight} \\rightarrow \\text{Plant}'
                },
                {
                    title: 'Materials, Water & Beyond Earth',
                    f: '\\text{Matter} = \\text{Solid, Liquid, or Gas}',
                    d: 'Everything around us is made of materials — paper, plastic, metal, rubber, glass. Water is one of the most important substances — it exists as ice (solid), water (liquid), and steam (gas). Beyond our Earth, there are the Sun, Moon, stars, and planets waiting to be explored!',
                    tip: 'Water is the only substance you see in all 3 states every day — ice in your drink, water from the tap, steam from the kitchen!',
                    ex: '\\text{Ice} \\xrightarrow{\\text{heat}} \\text{Water} \\xrightarrow{\\text{heat}} \\text{Steam}'
                }
            ]
        },

        practice: [
            { question: 'What is science?', options: ['A school subject only', 'A way of thinking, observing, and understanding the world', 'Memorising facts from a textbook', 'Something only lab scientists do'], correct: 1, explanation: 'Science is a way of thinking and exploring — it is not limited to textbooks or labs.' },
            { question: 'Science is compared to a _____ in your NCERT textbook.', options: ['Puzzle book', 'Jigsaw puzzle', 'Board game', 'Magic trick'], correct: 1, explanation: 'The textbook compares science to a jigsaw puzzle — every new discovery adds a piece to our understanding.' },
            { question: 'Which of these is NOT an area of exploration in science?', options: ['Earth & Environment', 'The Living World', 'Video Games', 'Water'], correct: 2, explanation: 'Video games are entertainment, not an area of scientific exploration mentioned in the chapter.' },
            { question: 'What makes the Earth special compared to other planets?', options: ['It is the biggest planet', 'It has rings', 'It supports life', 'It is closest to the Sun'], correct: 2, explanation: 'Earth is the only planet we know that supports life — it has air, water, and suitable temperatures.' },
            { question: 'Which of these is a living thing?', options: ['A river', 'A cloud', 'A mushroom', 'A rock'], correct: 2, explanation: 'A mushroom is a fungus — it is alive because it grows, reproduces, and needs food.' },
            { question: 'Water exists in how many states?', options: ['1', '2', '3', '4'], correct: 2, explanation: 'Water exists in 3 states: solid (ice), liquid (water), and gas (steam/water vapour).' },
            { question: 'What happens when ice is heated?', options: ['It becomes harder', 'It melts into water', 'It turns into metal', 'Nothing happens'], correct: 1, explanation: 'When ice absorbs heat, it melts and turns into liquid water.' },
            { question: 'Why do we need to protect the environment?', options: ['Because it is a school rule', 'Because nature provides us air, water, and food', 'Because animals are dangerous', 'Because the government says so'], correct: 1, explanation: 'Our environment provides clean air, water, food, and shelter — we must protect it to survive.' },
            { question: 'What do living things need to survive?', options: ['Only water', 'Only food', 'Food, water, and air', 'Only sunlight'], correct: 2, explanation: 'All living things need food, water, and air to survive.' },
            { question: 'Which of these is made of matter?', options: ['A thought', 'A dream', 'Air', 'A wish'], correct: 2, explanation: 'Air is matter — it has mass and takes up space, even though we cannot see it.' },
            { question: 'What is beyond Earth?', options: ['Nothing', 'Sun, Moon, and stars', 'More Earth', 'Only clouds'], correct: 1, explanation: 'Beyond Earth, there are the Sun, Moon, stars, planets, and the vast universe.' },
            { question: 'Paper is made from which natural material?', options: ['Plastic', 'Metal', 'Wood (trees)', 'Rocks'], correct: 2, explanation: 'Paper is made from wood pulp, which comes from trees.' },
            { question: 'Science knowledge is _____.', options: ['Complete and final', 'Always changing with new discoveries', 'Only found in laboratories', 'Only for adults'], correct: 1, explanation: 'Science is a continuous process — new discoveries keep changing our understanding.' },
            { question: 'Which of these is a non-living thing?', options: ['A tree', 'A butterfly', 'A glass bottle', 'A fish'], correct: 2, explanation: 'A glass bottle does not grow, breathe, eat, or reproduce — it is non-living.' },
            { question: 'Steam is water in which state?', options: ['Solid state', 'Liquid state', 'Gaseous state', 'Plasma state'], correct: 2, explanation: 'Steam (water vapour) is water in the gaseous state.' },
            { question: 'What is the importance of curiosity in science?', options: ['It is not important', 'It helps you ask questions and discover new things', 'It makes you forget things', 'It slows down learning'], correct: 1, explanation: 'Curiosity drives scientists to ask "Why?" and "How?", which leads to new discoveries.' },
            { question: 'Different countries have different _____.', options: ['Sun', 'Moon', 'Cuisines (foods)', 'Gravity'], correct: 2, explanation: 'Different cultures around the world have different foods and cooking styles (cuisines).' },
            { question: 'Which area of exploration deals with the Sun, Moon, and stars?', options: ['Earth & Environment', 'The Living World', 'Food & Materials', 'Beyond Earth'], correct: 3, explanation: 'The "Beyond Earth" area covers space, including the Sun, Moon, stars, and planets.' },
            { question: 'What do plants need to grow?', options: ['Only soil', 'Water, sunlight, and air', 'Only water', 'Only darkness'], correct: 1, explanation: 'Plants need water, sunlight, air, and soil to grow properly.' },
            { question: 'Why is science called a "continuous process"?', options: ['Because it ends after each chapter', 'Because new questions and discoveries never stop', 'Because scientists work continuously without sleeping', 'Because it is very long'], correct: 1, explanation: 'Science is continuous because every answer leads to new questions, and discoveries never stop.' },
        ],

        assessment: [
            { question: 'A student wonders why the Moon changes shape every night. This curiosity is an example of:', options: ['Wasting time', 'The starting point of science', 'Fear of the dark', 'Imagination only'], correct: 1, explanation: 'Scientific inquiry starts with curiosity — wondering about natural phenomena like the phases of the Moon.' },
            { question: 'Which statement best describes science?', options: ['Science is only about chemistry and physics', 'Science is a finished collection of known facts', 'Science is a systematic way of studying nature through observation and experiment', 'Science is only useful for building machines'], correct: 2, explanation: 'Science is a systematic, ongoing process of studying nature through observation, questioning, and experimentation.' },
            { question: 'Ravi notices that his ice cream melts faster on a sunny day than on a cloudy day. Which area of science does this relate to?', options: ['Beyond Earth', 'Materials and their properties', 'Food cuisines', 'None of the above'], correct: 1, explanation: 'Melting of ice cream involves the properties of materials (change of state due to heat), which falls under "Materials Around Us".' },
            { question: 'Which of these correctly shows the 3 states of water in order of increasing energy?', options: ['Steam → Water → Ice', 'Ice → Steam → Water', 'Ice → Water → Steam', 'Water → Ice → Steam'], correct: 2, explanation: 'Ice (solid, least energy) → Water (liquid, more energy) → Steam (gas, most energy). As energy increases, particles move faster.' },
            { question: 'Why do different places on Earth have different types of plants and animals?', options: ['Because God decided', 'Because of different climates, soils, and environments', 'Because animals can choose where to live', 'There is no reason'], correct: 1, explanation: 'Different regions have different climates, temperatures, and resources, which support different types of living organisms.' },
            { question: 'Priya says, "Air is not matter because we cannot see it." Is she correct?', options: ['Yes, air is not matter', 'No, air is matter because it has mass and takes up space', 'Air is sometimes matter and sometimes not', 'Only hot air is matter'], correct: 1, explanation: 'Air IS matter — it has mass and occupies space. We can feel it as wind, and a balloon inflates because air takes up space.' },
            { question: 'New discoveries in science can change what we already believe. This means:', options: ['Older scientists were wrong', 'Science is unreliable', 'Science is a growing body of knowledge that evolves with evidence', 'We should not trust science'], correct: 2, explanation: 'Science evolves — new evidence can update or change existing understanding. This is a strength, not a weakness.' },
            { question: 'A farmer observes that adding manure makes crops grow better. Which step of scientific thinking did the farmer use?', options: ['Conclusion', 'Observation', 'Hypothesis', 'Random guessing'], correct: 1, explanation: 'The farmer used observation — carefully noticing a pattern (manure → better crops) through experience.' },
            { question: 'Which of the following best connects "Food" and "Materials"?', options: ['Both are unrelated areas', 'Food is made from raw materials found in nature', 'Materials can be eaten', 'There is no connection'], correct: 1, explanation: 'Food comes from natural materials — grains, fruits, vegetables are all raw materials from nature that we process into food.' },
            { question: 'A textbook says, "Questions lead to more questions." What does this mean for science?', options: ['Science is confusing', 'Every discovery opens up new mysteries to explore', 'Scientists ask too many questions', 'It means science has failed'], correct: 1, explanation: 'This means science is never "done" — every answer reveals new questions, making science an endless journey of discovery.' },
        ]
    },

    /* ═══════════════════════════════════════════════
       CONCEPT 1.2 — THE SCIENTIFIC METHOD
       ═══════════════════════════════════════════════ */
    {
        id: '1.2',
        title: 'The Scientific Method',
        subtitle: 'The Recipe for Discovery',
        desc: 'Learn the step-by-step process scientists use to solve problems.',
        icon: '🧪',
        color: '#7c3aed',

        learn: {
            concept: 'The scientific method is a step-by-step process that anyone can use to find answers. Think of it as a recipe for solving mysteries! The steps are: (1) Observe something interesting, (2) Ask a question, (3) Make a guess called a hypothesis, (4) Test your guess through an experiment, and (5) Analyse your results to draw a conclusion. Even when an experiment "fails", scientists learn something new!',
            rules: [
                {
                    title: 'Step 1: Observation',
                    f: '\\text{Observe} \\rightarrow \\text{Notice something interesting}',
                    d: 'Observation is the first step. Use your five senses (see, hear, smell, touch, taste) to notice something happening around you. Good observation means paying careful attention to details.',
                    tip: 'Write down what you observe — even small details can be important!',
                    ex: '\\text{I noticed that my bicycle rusts when left in rain}'
                },
                {
                    title: 'Step 2: Asking Questions',
                    f: '\\text{Observation} \\rightarrow \\text{Why? How? What if?}',
                    d: 'After observing something interesting, the next step is to ask a question. Good science questions often start with "Why", "How", or "What happens if". The question helps you focus on what you want to find out.',
                    tip: 'The best questions are specific and testable!',
                    ex: '\\text{"Why does my bicycle rust only when it gets wet?"}'
                },
                {
                    title: 'Step 3: Hypothesis',
                    f: '\\text{Question} \\rightarrow \\text{Hypothesis (educated guess)}',
                    d: 'A hypothesis is your best guess about the answer, based on what you already know. It must be testable — you should be able to design an experiment to check if it is right or wrong.',
                    tip: 'Use "If... then..." format: "If I do X, then Y will happen."',
                    ex: '\\text{"If iron touches water, then it will rust."}'
                },
                {
                    title: 'Step 4: Experiment & Step 5: Analyse',
                    f: '\\text{Hypothesis} \\xrightarrow{\\text{test}} \\text{Results} \\rightarrow \\text{Conclusion}',
                    d: 'An experiment is a test designed to check your hypothesis. You must test fairly — change only one thing at a time. After the experiment, analyse what happened. If the result matches your hypothesis, great! If not, revise your hypothesis and try again. The final answer you draw is called a conclusion.',
                    tip: 'A "failed" experiment is NOT a failure — it means you learned what does NOT work!',
                    ex: '\\text{Left one nail in water, one dry → wet nail rusted → hypothesis confirmed}'
                }
            ]
        },

        practice: [
            { question: 'What is the FIRST step of the scientific method?', options: ['Experiment', 'Hypothesis', 'Observation', 'Conclusion'], correct: 2, explanation: 'The scientific method begins with observation — noticing something interesting.' },
            { question: 'A hypothesis is best described as:', options: ['A confirmed fact', 'A wild guess', 'An educated guess that can be tested', 'The final answer'], correct: 2, explanation: 'A hypothesis is an educated guess based on prior knowledge that can be tested through experiments.' },
            { question: 'Riya notices that plants near the window grow taller. What step is she doing?', options: ['Experimentation', 'Hypothesis', 'Observation', 'Conclusion'], correct: 2, explanation: 'Riya is observing — she is noticing a pattern by looking at the plants.' },
            { question: 'Which is a good hypothesis?', options: ['Plants are green', 'If I give more water, the plant will grow taller', 'Water is wet', 'The sky is blue'], correct: 1, explanation: 'A good hypothesis uses "If...then..." and can be tested. "If I give more water, the plant will grow taller" is testable.' },
            { question: 'In an experiment, you should change:', options: ['Everything at once', 'Nothing', 'Only one thing at a time', 'Random things'], correct: 2, explanation: 'For a fair test, change only one thing (variable) at a time so you know what caused the result.' },
            { question: 'What do you do if your experiment disproves your hypothesis?', options: ['Give up', 'Revise the hypothesis and try again', 'Change the results', 'Ignore the experiment'], correct: 1, explanation: 'In science, you revise your hypothesis based on new evidence and conduct more experiments.' },
            { question: 'A conclusion is:', options: ['The first step', 'A guess', 'The final answer based on experiment results', 'A type of experiment'], correct: 2, explanation: 'A conclusion is the final answer you draw after analysing the results of your experiment.' },
            { question: 'Which question is testable?', options: ['What is the best colour?', 'Is chocolate the best food?', 'Does sugar dissolve faster in hot water or cold water?', 'Is Monday a good day?'], correct: 2, explanation: '"Does sugar dissolve faster in hot or cold water?" can be tested by experiment — the others are opinions.' },
            { question: 'Data collected during an experiment is used to:', options: ['Decorate the notebook', 'Draw a conclusion', 'Impress friends', 'Ignore the results'], correct: 1, explanation: 'Data is analysed to see if the hypothesis was correct, helping you draw a conclusion.' },
            { question: 'Which sense would help you observe that milk has gone bad?', options: ['Sight only', 'Hearing only', 'Smell (and possibly taste)', 'Touch only'], correct: 2, explanation: 'Spoiled milk has a sour smell — your sense of smell is key for this observation.' },
            { question: 'Why is the scientific method important?', options: ['It gives you homework', 'It provides a systematic way to find answers', 'It is only for lab scientists', 'It is not important'], correct: 1, explanation: 'The scientific method gives a systematic, step-by-step way to explore questions and find reliable answers.' },
            { question: 'Aman thinks salt dissolves faster when you stir the water. This is his:', options: ['Conclusion', 'Observation', 'Hypothesis', 'Experiment'], correct: 2, explanation: 'Aman is making a testable prediction — this is a hypothesis.' },
            { question: 'An experiment must be _____ for the results to be trustworthy.', options: ['Expensive', 'Complicated', 'Fair (controlled)', 'Done in a lab only'], correct: 2, explanation: 'A fair or controlled experiment changes only one variable at a time, making results reliable.' },
            { question: 'What happens after you analyse your experiment results?', options: ['You eat lunch', 'You draw a conclusion', 'You forget everything', 'You start a new subject'], correct: 1, explanation: 'After analysis, you draw a conclusion — the final answer based on your evidence.' },
            { question: '"I noticed darker clouds bring heavier rain." This is an example of:', options: ['Hypothesis', 'Observation', 'Experiment', 'Conclusion'], correct: 1, explanation: 'This is an observation — noticing a pattern between cloud colour and rain intensity.' },
            { question: 'In the "If... then..." format, what goes after "If"?', options: ['The conclusion', 'The result', 'The variable you change (cause)', 'The equipment list'], correct: 2, explanation: '"If [cause / variable you change], then [predicted effect]" — the cause goes after "If".' },
            { question: 'Which of the following is NOT a step in the scientific method?', options: ['Observation', 'Memorisation', 'Hypothesis', 'Experiment'], correct: 1, explanation: 'Memorisation is NOT a step in the scientific method. Science is about thinking, not memorising.' },
            { question: 'A student tests whether plants grow better with music. What is the variable being changed?', options: ['Soil type', 'Amount of water', 'Presence or absence of music', 'Type of plant'], correct: 2, explanation: 'The variable being tested is whether music is played or not — that is what changes between the groups.' },
            { question: 'Why should you repeat an experiment?', options: ['Because it is fun', 'To make sure the results are consistent and reliable', 'Because the teacher said so', 'To waste time'], correct: 1, explanation: 'Repeating experiments ensures the results are consistent and not just a one-time coincidence.' },
            { question: 'The scientific method can be used by:', options: ['Only scientists', 'Only adults', 'Anyone, including students', 'Only people in laboratories'], correct: 2, explanation: 'Anyone can use the scientific method — even students solving everyday problems!' },
        ],

        assessment: [
            { question: 'Meena noticed that her iron gate rusts during the monsoon but not during summer. She guesses that water causes rusting. She then places identical nails — one in water and one kept dry — and waits a week. What step is she performing?', options: ['Observation', 'Hypothesis', 'Experiment', 'Conclusion'], correct: 2, explanation: 'By setting up a test with one variable (water) while keeping everything else the same, Meena is conducting an experiment.' },
            { question: 'Why is "If I study more, I will score higher" a good hypothesis?', options: ['Because it is a fact', 'Because it is testable and follows If...then... format', 'Because studying is important', 'Because it sounds smart'], correct: 1, explanation: 'It is testable (study more vs less, compare scores) and follows the "If...then..." format.' },
            { question: 'In an experiment, Arun grows two plants — one with fertilizer and one without. Everything else (water, sunlight, pot size) is the same. Why?', options: ['To save money', 'To make it a fair test — only one variable is changed', 'Because the teacher asked', 'To confuse the plants'], correct: 1, explanation: 'A fair test requires changing only one variable (fertilizer) while keeping everything else constant.' },
            { question: 'After an experiment, Kavya finds that her hypothesis was WRONG. What should she do next?', options: ['Hide the results', 'Change the results to match her hypothesis', 'Revise her hypothesis and design a new experiment', 'Stop doing science'], correct: 2, explanation: 'In science, wrong hypotheses are valuable — they tell you what does NOT work, helping you revise and try again.' },
            { question: 'A student observes that bread left in a moist place grows mould, but bread kept in a dry place does not. She concludes that moisture causes mould. Which steps did she complete?', options: ['Only observation', 'Observation and conclusion', 'Observation, hypothesis, experiment, and conclusion', 'None of the above'], correct: 2, explanation: 'She observed (mouldy vs dry bread), implicitly hypothesised (moisture causes mould), compared conditions (experiment), and drew a conclusion.' },
            { question: 'Why can "Which is the best song?" NOT be answered using the scientific method?', options: ['Because songs are copyrighted', 'Because "best" is a personal opinion, not a measurable fact', 'Because songs are too complicated', 'Because scientists do not listen to music'], correct: 1, explanation: 'The scientific method deals with testable, measurable questions. "Best song" is subjective — different people have different opinions.' },
            { question: 'Two students do the same experiment but get different results. What should they do?', options: ['Fight about who is right', 'Repeat the experiment to check for errors', 'Accept the first result only', 'Give up'], correct: 1, explanation: 'When results differ, scientists repeat the experiment carefully to identify errors and verify findings.' },
            { question: 'Arrange these steps in the correct order: (A) Analyse results, (B) Observe, (C) Make hypothesis, (D) Conduct experiment, (E) Ask question.', options: ['B → E → C → D → A', 'E → B → C → D → A', 'C → D → B → A → E', 'D → A → B → C → E'], correct: 0, explanation: 'Observe → Ask question → Hypothesis → Experiment → Analyse results is the correct order.' },
            { question: 'A cook notices that dal spills over when boiled. She lowers the flame and the spilling stops. Which step of the scientific method did she unknowingly use?', options: ['All five steps', 'Only observation', 'Only hypothesis', 'None — cooking is not science'], correct: 0, explanation: 'She observed (dal spilling), hypothesised (too much heat), experimented (lowered flame), and concluded (lower heat stops spilling) — all 5 steps!' },
            { question: 'Why is "observation" important even at the END of an experiment?', options: ['It is not important at the end', 'Because you need to carefully observe the results to draw a correct conclusion', 'Because the teacher might be watching', 'To fill time'], correct: 1, explanation: 'After the experiment, careful observation of results is essential for accurate analysis and conclusion.' },
        ]
    },

    /* ═══════════════════════════════════════════════
       CONCEPT 1.3 — SCIENCE IN DAILY LIFE
       ═══════════════════════════════════════════════ */
    {
        id: '1.3',
        title: 'Science in Daily Life',
        subtitle: 'Problem-Solvers Every Day',
        desc: 'See how you already use science to solve everyday problems.',
        icon: '🏠',
        color: '#f59e0b',

        learn: {
            concept: 'You don\'t need a lab coat to be a scientist — you use science every single day! When your pen stops writing, when your bicycle tyre goes flat, when dal spills over on the stove, or when a light bulb stops working — you use scientific thinking to fix the problem. Science in daily life means applying observation, questioning, and problem-solving to the challenges you face.',
            rules: [
                {
                    title: 'Fixing a Pen',
                    f: '\\text{Pen not working} \\rightarrow \\text{Observe + Test + Fix}',
                    d: 'When your pen stops writing, you observe the problem (is the ink gone? is the nib jammed?), make a guess (maybe the ink is dry), and test your guess (shake the pen, try on rough paper). This is the scientific method in action!',
                    tip: 'You are a scientist every time you troubleshoot a problem!',
                    ex: '\\text{Pen dried → shake → scribble on rough paper → works again}'
                },
                {
                    title: 'Cooking Science',
                    f: '\\text{Dal on high flame} \\rightarrow \\text{Boils over (spills)}',
                    d: 'When dal is boiled on a high flame, the liquid expands rapidly and spills over. Your parent lowers the flame — this is an experiment! They observed the problem (spilling), guessed the cause (too much heat), tested a solution (lower flame), and got a result (no more spilling).',
                    tip: 'Cooking is full of science — boiling, melting, mixing, dissolving — all are science!',
                    ex: '\\text{High heat → dal spills} \\quad | \\quad \\text{Low heat → no spilling}'
                },
                {
                    title: 'Bicycle Repair',
                    f: '\\text{Flat tyre} \\rightarrow \\text{Find hole} \\rightarrow \\text{Patch it}',
                    d: 'When your bicycle tyre goes flat, you pump air and dip the tube in water to find bubbles (experiment!). The bubbles show where the hole is. You then patch the hole and test again. This is scientific problem-solving!',
                    tip: 'Bubbles in water = air escaping = hole location found!',
                    ex: '\\text{Air pump + water test → bubbles at hole → patch → fixed}'
                },
                {
                    title: 'Electric Bulb Not Working',
                    f: '\\text{Bulb off} \\rightarrow \\text{Check bulb, switch, wiring}',
                    d: 'When a bulb stops working, you check: Is the switch on? Is the bulb fused? Is the wiring loose? You test each possibility one by one until you find the cause. This systematic checking is exactly how scientists diagnose problems!',
                    tip: 'Check one thing at a time — this is called "isolating the variable"!',
                    ex: '\\text{Switch OK → Wiring OK → Bulb fused → Replace bulb → Light!}'
                }
            ]
        },

        practice: [
            { question: 'When your pen stops writing, the first thing you should do is:', options: ['Throw it away', 'Observe what might be wrong', 'Buy a new one immediately', 'Cry'], correct: 1, explanation: 'The first step is always observation — check if the ink is gone, the nib is jammed, or the tip is dry.' },
            { question: 'Why does dal spill when boiled on a high flame?', options: ['The pot is too small', 'The liquid expands rapidly due to high heat', 'The dal is angry', 'Dal always spills'], correct: 1, explanation: 'High heat causes the liquid to expand and bubbles to form rapidly, pushing the dal over the rim.' },
            { question: 'To find a hole in a bicycle tube, you can:', options: ['Guess randomly', 'Pump air and dip in water to look for bubbles', 'Buy a new bicycle', 'Ask the tube where the hole is'], correct: 1, explanation: 'Air escapes through the hole and creates bubbles in water — this is a scientific test!' },
            { question: 'A bulb is not working. What should you check first?', options: ['The weather', 'Whether the switch is on', 'What year it is', 'Whether it is a full moon'], correct: 1, explanation: 'Start with the simplest check — is the switch actually turned on? Then move to other possibilities.' },
            { question: 'Cooking on a stove involves which change of state?', options: ['Freezing', 'Boiling (liquid to gas)', 'Condensation', 'Sublimation'], correct: 1, explanation: 'When cooking, water boils and turns into steam — this is a change from liquid to gaseous state.' },
            { question: 'Which everyday activity uses observation?', options: ['Checking if milk has gone sour by smelling it', 'Sleeping', 'Watching TV without thinking', 'Daydreaming'], correct: 0, explanation: 'Smelling milk to check if it is sour is using your sense of smell for observation — a scientific skill!' },
            { question: 'You turn on the switch but the fan does not work. This is an example of:', options: ['Bad luck', 'An observation that can lead to scientific problem-solving', 'Something that cannot be fixed', 'Nothing important'], correct: 1, explanation: 'Noticing the fan is not working is an observation — you can then apply the scientific method to diagnose and fix it.' },
            { question: 'A student shakes a pen vigorously and it starts writing again. What did the student do?', options: ['Used magic', 'Tested a hypothesis (shaking might redistribute the ink)', 'Nothing scientific', 'Broke the pen'], correct: 1, explanation: 'Shaking was a test (experiment) based on the guess (hypothesis) that the ink might be stuck or dry at the tip.' },
            { question: 'Why is cooking considered a form of daily science?', options: ['Because chefs wear white like scientists', 'Because it involves changes in materials — heating, mixing, dissolving', 'Because kitchens look like labs', 'Cooking is not science'], correct: 1, explanation: 'Cooking involves mixing materials, heating them, dissolving substances, and observing changes — all science!' },
            { question: 'When troubleshooting a problem, you should change _____ at a time.', options: ['Everything', 'Nothing', 'One thing', 'Random things'], correct: 2, explanation: 'Check one thing at a time so you know exactly what caused the problem — this is the experimental approach.' },
            { question: 'Which of these daily activities involves science?', options: ['Riding a bicycle', 'Cooking food', 'Using electricity', 'All of the above'], correct: 3, explanation: 'All of these involve science — physics (cycling), chemistry (cooking), and electrical science (using switches).' },
            { question: 'You notice that your plants grow better when you talk to them. To test this scientifically, you should:', options: ['Tell everyone it is true', 'Set up two groups — one you talk to and one you do not', 'Write a poem about plants', 'Stop talking to plants'], correct: 1, explanation: 'A fair experiment would compare two identical groups of plants — one with talking and one without.' },
            { question: 'The bubbles you see in boiling water are:', options: ['Oxygen', 'Soap', 'Water vapour (steam)', 'Air'], correct: 2, explanation: 'The bubbles in boiling water are water vapour (steam) — water changing from liquid to gas.' },
            { question: 'A student replaces a fused bulb with a new one and the light works. The cause of the problem was:', options: ['The switch', 'The wiring', 'The fused bulb', 'The wall'], correct: 2, explanation: 'Since replacing the bulb fixed the problem, the fused bulb was the cause.' },
            { question: 'Which step are you using when you check if the switch is on?', options: ['Making a hypothesis', 'Drawing a conclusion', 'Testing a possible cause', 'Memorising facts'], correct: 2, explanation: 'You are testing the possibility that the switch might be off — this is the experimentation step.' },
            { question: 'Science in daily life teaches us that:', options: ['Science is only in books', 'Everyone is a scientist in some way', 'Science is boring', 'Only adults use science'], correct: 1, explanation: 'Every time you observe, question, and solve a problem, you are being a scientist!' },
            { question: 'What happens if you leave an iron nail in water for a week?', options: ['It melts', 'It rusts', 'It grows', 'Nothing happens'], correct: 1, explanation: 'Iron reacts with water and air (oxygen) to form rust — this is a chemical change you can observe.' },
            { question: 'To keep food from getting spoiled, people store it in a refrigerator. This is because:', options: ['Cold temperature slows down the growth of bacteria', 'Refrigerators have magic', 'Cold makes food taste better', 'Food likes the dark'], correct: 0, explanation: 'Low temperature slows down bacterial growth, preventing food from spoiling quickly.' },
            { question: 'A torch is not working. You replace the batteries and it works. This shows:', options: ['The torch was broken', 'The switch was faulty', 'The old batteries were dead', 'The bulb was fused'], correct: 2, explanation: 'Since replacing batteries fixed the torch, the dead batteries were the cause of the problem.' },
            { question: 'Why is "asking questions" important in daily life?', options: ['It annoys people', 'It helps you understand and solve problems', 'It is a waste of time', 'Only scientists should ask questions'], correct: 1, explanation: 'Asking questions helps you understand situations better and find solutions — this is the heart of science.' },
        ],

        assessment: [
            { question: 'Your mother fries pakoras in oil. She notices that adding wet batter makes the oil splatter dangerously. From a science perspective, why does this happen?', options: ['The oil is too hot', 'Water in the batter rapidly turns to steam, causing splashing', 'The pakoras are too heavy', 'The pan is too small'], correct: 1, explanation: 'Water in the wet batter rapidly changes to steam (gas) when it hits hot oil, causing violent splattering.' },
            { question: 'You find that your bicycle chain keeps coming off. You observe, hypothesise that it is too loose, and tighten it. It stays on. If it came off again, what would you do?', options: ['Sell the bicycle', 'Revise your hypothesis — maybe the chain is worn out', 'Assume bicycles are supposed to break', 'Ignore it'], correct: 1, explanation: 'If tightening did not permanently fix it, you revise your hypothesis (maybe the chain needs replacement) and test again.' },
            { question: 'Grandma says, "Adding a pinch of salt makes water boil faster." How would you test this?', options: ['Believe her without testing', 'Boil two identical pots — one with salt and one without — and time them', 'Ask the internet', 'It cannot be tested'], correct: 1, explanation: 'Set up a fair experiment: same pots, same water amount, same stove — the only difference is salt vs no salt. Time both.' },
            { question: 'A student notices that the school corridor floor is slippery when mopped but not when dry. She then hypothesises and tests with a shoe on wet vs dry tiles. She has performed:', options: ['Only observation', 'Only experiment', 'The complete scientific method', 'Neither observation nor experiment'], correct: 2, explanation: 'She observed (slippery floor), hypothesised (water causes slipperiness), and experimented (tested shoe on wet vs dry) — the full scientific method.' },
            { question: 'Your friend says, "I use science only in school." Give the best counter-argument:', options: ['Science is everywhere — from cooking to cycling to fixing a bulb', 'You are right, science is only in school', 'Science is only for scientists', 'Science stops after Grade 10'], correct: 0, explanation: 'Science is in every daily activity — cooking, cleaning, travelling, communicating, and even breathing!' },
            { question: 'Why does a wet cloth dry faster in the sun than in the shade?', options: ['The sun is brighter', 'Heat from the sun increases evaporation of water', 'The wind is stronger in the sun', 'Clothes prefer sunlight'], correct: 1, explanation: 'Sunlight provides heat energy, which accelerates evaporation — water turns to vapour faster.' },
            { question: 'Ram replaces the bulb in a lamp, but it still does not work. He then checks the plug and finds it loose. He plugs it properly and the lamp works. What does this tell us about problem-solving?', options: ['Always replace the bulb first', 'A problem can have multiple possible causes — check each one', 'Lamps are unreliable', 'Science cannot help here'], correct: 1, explanation: 'Problems often have multiple possible causes. Systematic checking (one variable at a time) helps find the actual cause.' },
            { question: 'A cook adds too much chilli to a dish. She then adds sugar and cream to reduce the spiciness. This is an example of:', options: ['Giving up', 'Applying scientific thinking — observe the problem, hypothesise a solution, test it', 'Random cooking', 'Following instructions exactly'], correct: 1, explanation: 'She observed (too spicy), hypothesised (sugar/cream might reduce it), and tested — scientific thinking!' },
            { question: 'Why do we say that "failure in an experiment is also a result"?', options: ['To make students feel better', 'Because even negative results tell us what does NOT work, which is valuable knowledge', 'Because all experiments fail', 'It is just a saying with no meaning'], correct: 1, explanation: 'Negative results eliminate wrong hypotheses and guide you toward the correct answer — that IS science.' },
            { question: 'Which of these scenarios shows the BEST use of all steps of the scientific method in daily life?', options: ['Eating chocolate because you like it', 'Watching a cricket match', 'Noticing a tap leaks only at night, guessing the pressure changes, testing by checking the water metre at different times, and finding the answer', 'Sleeping early because your parents told you to'], correct: 2, explanation: 'This scenario includes observation (leak at night), hypothesis (pressure changes), experiment (check metre at different times), and conclusion — the full method!' },
        ]
    }
];

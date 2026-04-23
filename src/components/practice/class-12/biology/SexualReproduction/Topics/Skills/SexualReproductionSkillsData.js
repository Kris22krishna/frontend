export const generateSexualReproductionSkillsData = () => {
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const shuffle = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };
    
    const makeMCQ = (q, correctOpt, distractors, explanation) => {
        const allOpts = shuffle([correctOpt, ...distractors].slice(0, 4));
        const correctIdx = allOpts.indexOf(correctOpt);
        const seen = new Set();
        if (correctIdx !== -1) seen.add(allOpts[correctIdx]);
        
        for (let i = 0; i < allOpts.length; i++) {
            if (i === correctIdx) continue;
            let opt = allOpts[i];
            let attempts = 0;
            while (seen.has(opt) && attempts < 20) {
                opt = `${opt} (Variant ${attempts + 1})`;
                attempts++;
            }
            seen.add(opt);
            allOpts[i] = opt;
        }
        return { type: 'multiple-choice', question: q, options: allOpts, correctAnswer: correctIdx, explanation };
    };

    const s1_flower = [
        () => makeMCQ('Which whorl of the flower consists of sepals?', 'Calyx', ['Corolla', 'Androecium', 'Gynoecium'], 'The calyx is the outermost whorl of sepals.'),
        () => makeMCQ('Which whorls are considered essential for reproduction?', 'Androecium and Gynoecium', ['Calyx and Corolla', 'Calyx and Androecium', 'Corolla and Gynoecium'], 'They directly produce gametes.'),
        () => makeMCQ('A flower having both androecium and gynoecium is called:', 'Bisexual', ['Unisexual', 'Dioecious', 'Staminate'], 'Hermaphrodite or bisexual flower.'),
        () => makeMCQ('In a monoecious plant:', 'Male and female flowers are on the same plant', ['Male and female flowers are on different plants', 'Flowers are always bisexual', 'Only male flowers are produced'], 'Monoecious = one house.'),
        () => makeMCQ('Which part of the flower is the male reproductive organ?', 'Stamen', ['Pistil', 'Sepal', 'Petal'], 'Stamens make up the androecium.'),
        () => makeMCQ('If a flower is cut into two equal halves through any radial plane passing through the centre, it has:', 'Actinomorphic symmetry', ['Zygomorphic symmetry', 'Asymmetric symmetry', 'Bilateral symmetry'], 'Radial or actinomorphic symmetry.'),
        () => makeMCQ('Zygomorphic symmetry means the flower can be divided into two equal halves:', 'Only in one particular vertical plane', ['In any radial plane', 'In multiple planes', 'Not in any plane'], 'Bilateral symmetry.'),
        () => makeMCQ('What is the swollen base of a flower to which all whorls are attached?', 'Thalamus', ['Pedicel', 'Ovary', 'Style'], 'Also called the receptacle.'),
        () => makeMCQ('Which of the following is an example of a dioecious plant?', 'Papaya', ['Maize', 'Coconut', 'Cucumber'], 'Papaya and Date palm are dioecious.'),
        () => makeMCQ('Flowers with only stamens are called:', 'Staminate', ['Pistillate', 'Hermaphrodite', 'Neuter'], 'Unisexual male flowers.'),
        () => makeMCQ('Which part of the flower attracts pollinators?', 'Corolla', ['Calyx', 'Androecium', 'Gynoecium'], 'Petals are bright to attract insects.'),
        () => makeMCQ('In flowers like lily, calyx and corolla are not distinct and are called:', 'Perianth', ['Bracts', 'Epicalyx', 'Tepals'], 'Individual units are tepals.'),
        () => makeMCQ('Which of the following describes a unisexual flower?', 'Lacks either stamens or pistils', ['Has both stamens and pistils', 'Lacks petals', 'Lacks sepals'], 'Only one reproductive whorl.'),
        () => makeMCQ('The term given to the outermost whorl of a typical flower is:', 'Calyx', ['Corolla', 'Androecium', 'Gynoecium'], 'Calyx protects the bud.'),
        () => makeMCQ('A flower is a modified:', 'Shoot', ['Root', 'Leaf', 'Stem branch'], 'Flower is a modified shoot for reproduction.'),
        () => makeMCQ('Actinomorphic flowers are found in:', 'Mustard', ['Pea', 'Gulmohur', 'Bean'], 'Mustard, Datura, Chilli have radial symmetry.'),
        () => makeMCQ('Zygomorphic symmetry is characteristic of:', 'Pea', ['Mustard', 'Datura', 'Chilli'], 'Pea, gulmohur, bean, cassia are zygomorphic.'),
        () => makeMCQ('The stalk of the flower is known as:', 'Pedicel', ['Petiole', 'Thalamus', 'Receptacle'], 'Connects flower to the stem.'),
        () => makeMCQ('An incomplete flower lacks:', 'At least one of the four whorls', ['Only petals', 'Only sepals', 'Both essential whorls'], 'Missing any whorl makes it incomplete.'),
        () => makeMCQ('What is the function of the sepals in a bud condition?', 'Protection', ['Attracting insects', 'Producing pollen', 'Receiving pollen'], 'Sepals cover and protect the young bud.')
    ];

    const s2_prefert = [
        () => makeMCQ('The proximal end of the filament is attached to the:', 'Thalamus or petal', ['Anther', 'Connective', 'Stigma'], 'Attached to the base.'),
        () => makeMCQ('A typical angiosperm anther is bilobed with each lobe having two theca. It is called:', 'Dithecous', ['Monothecous', 'Athecous', 'Tetrathecous'], 'Two theca per lobe.'),
        () => makeMCQ('Which is the innermost layer of the microsporangium wall?', 'Tapetum', ['Epidermis', 'Endothecium', 'Middle layers'], 'It nourishes the developing pollen.'),
        () => makeMCQ('The hard outer layer of a pollen grain is called:', 'Exine', ['Intine', 'Germ pore', 'Tapetum'], 'Made of sporopollenin.'),
        () => makeMCQ('When pollen is mature, it contains two cells. They are:', 'Vegetative cell and Generative cell', ['Two generative cells', 'Two vegetative cells', 'Egg cell and synergid'], 'At the 2-celled stage.'),
        () => makeMCQ('The generative cell divides to form:', 'Two male gametes', ['Two vegetative cells', 'Four microspores', 'A pollen tube'], 'By mitosis.'),
        () => makeMCQ('The gynoecium represents the:', 'Female reproductive part of the flower', ['Male reproductive part', 'Accessory whorl', 'Outermost whorl'], 'Pistils/carpels.'),
        () => makeMCQ('The megasporangium is commonly known as the:', 'Ovule', ['Ovary', 'Embryo sac', 'Nucellus'], 'Arises from placenta.'),
        () => makeMCQ('The typical angiosperm embryo sac at maturity is:', '8-nucleate and 7-celled', ['7-nucleate and 8-celled', '8-nucleate and 8-celled', '7-nucleate and 7-celled'], 'Classic NEET question.'),
        () => makeMCQ('The three cells grouped together at the micropylar end constitute the:', 'Egg apparatus', ['Antipodals', 'Central cell', 'Polar nuclei'], 'Two synergids + one egg cell.'),
        () => makeMCQ('The transfer of pollen grains from the anther to the stigma of the same flower is called:', 'Autogamy', ['Geitonogamy', 'Xenogamy', 'Allogamy'], 'Self-pollination.'),
        () => makeMCQ('Flowers which do not open at all are called:', 'Cleistogamous', ['Chasmogamous', 'Geitonogamous', 'Dioecious'], 'Ensure assured seed set.'),
        () => makeMCQ('Which type of pollination brings genetically different types of pollen to the stigma?', 'Xenogamy', ['Autogamy', 'Geitonogamy', 'Cleistogamy'], 'Cross-pollination.'),
        () => makeMCQ('Geitonogamy involves the transfer of pollen grains to the stigma of:', 'Another flower of the same plant', ['The same flower', 'A flower of a different plant', 'A cleistogamous flower'], 'Functionally cross, genetically self.'),
        () => makeMCQ('Pollination by wind is termed:', 'Anemophily', ['Hydrophily', 'Entomophily', 'Ornithophily'], 'Grasses use this.'),
        () => makeMCQ('Pollination by water is relatively rare and mostly limited to about 30 genera, mostly:', 'Monocotyledons', ['Dicotyledons', 'Gymnosperms', 'Pteridophytes'], 'E.g., Vallisneria, Hydrilla.'),
        () => makeMCQ('A genetic mechanism to prevent self-pollen from fertilising the ovules is:', 'Self-incompatibility', ['Dichogamy', 'Herkogamy', 'Dicliny'], 'Genetically controlled.'),
        () => makeMCQ('What constitutes the pollen-pistil interaction?', 'All events from pollen deposition on stigma until pollen tube enters ovule', ['Only pollen deposition', 'Only syngamy', 'Only formation of zygote'], 'Dynamic dialogue mediated by chemicals.'),
        () => makeMCQ('Artificial hybridisation commonly involves techniques like:', 'Emasculation and bagging', ['Layering and grafting', 'Tissue culture', 'Cleistogamy'], 'To prevent unwanted pollen.'),
        () => makeMCQ('Removal of anthers from the flower bud before dehiscence in a bisexual flower is called:', 'Emasculation', ['Bagging', 'Tagging', 'Topping'], 'Step in artificial hybridisation.')
    ];

    const s3_double = [
        () => makeMCQ('The pollen tube releases its contents into:', 'One of the synergids', ['The central cell', 'The egg cell', 'The antipodals'], 'Through the filiform apparatus.'),
        () => makeMCQ('Syngamy involves the fusion of:', 'One male gamete with the egg cell', ['One male gamete with polar nuclei', 'Two male gametes with egg', 'Male gamete with synergid'], 'Results in diploid zygote.'),
        () => makeMCQ('The product of syngamy is the:', 'Zygote', ['Primary Endosperm Nucleus', 'Endosperm', 'Embryo sac'], 'It is 2n.'),
        () => makeMCQ('Triple fusion involves the fusion of:', 'One male gamete with two polar nuclei', ['One male gamete with the egg cell', 'Two male gametes with one polar nucleus', 'Male gamete with antipodals'], 'Results in Primary Endosperm Nucleus (PEN).'),
        () => makeMCQ('Why is it called double fertilisation?', 'Because two types of fusions, syngamy and triple fusion, occur', ['Because two male gametes fuse with two egg cells', 'Because two pollen tubes enter', 'Because it happens twice'], 'Unique to angiosperms.'),
        () => makeMCQ('The Primary Endosperm Nucleus (PEN) is:', 'Triploid (3n)', ['Diploid (2n)', 'Haploid (n)', 'Tetraploid (4n)'], 'Formed by triple fusion.'),
        () => makeMCQ('Double fertilisation is an event unique to:', 'Angiosperms', ['Gymnosperms', 'Bryophytes', 'Pteridophytes'], 'Only flowering plants do this.'),
        () => makeMCQ('What happens to the synergids after fertilisation?', 'They degenerate', ['They form endosperm', 'They form the embryo', 'They divide rapidly'], 'Antipodals also degenerate.'),
        () => makeMCQ('The PEN develops into the:', 'Endosperm', ['Embryo', 'Seed coat', 'Fruit'], 'Nourishing tissue.'),
        () => makeMCQ('The zygote develops into the:', 'Embryo', ['Endosperm', 'Seed', 'Fruit'], 'The future plant.'),
        () => makeMCQ('In the most common type of endosperm development (Nuclear type), the PEN undergoes:', 'Successive free nuclear divisions', ['Cytokinesis immediately', 'Meiosis', 'Degeneration'], 'Forms free-nuclear endosperm.'),
        () => makeMCQ('The water of a tender coconut represents:', 'Free-nuclear endosperm', ['Cellular endosperm', 'Liquid embryo', 'Mesocarp fluid'], 'Thousands of free nuclei.'),
        () => makeMCQ('The white kernel of the coconut represents:', 'Cellular endosperm', ['Free-nuclear endosperm', 'Zygote', 'Cotyledon'], 'Cell wall formation.'),
        () => makeMCQ('Why does endosperm development precede embryo development?', 'To provide assured nutrition to the developing embryo', ['Because endosperm grows faster', 'It is a random event', 'To protect the seed coat'], 'Embryo needs food.'),
        () => makeMCQ('Seeds in which the endosperm is completely consumed during embryo development are called:', 'Non-albuminous (Ex-albuminous)', ['Albuminous', 'Perispermic', 'Apomictic'], 'E.g. Pea, groundnut, beans.'),
        () => makeMCQ('Seeds which retain a part of the endosperm at maturity are called:', 'Albuminous', ['Non-albuminous', 'Ex-albuminous', 'Perispermic'], 'E.g. Wheat, maize, castor.'),
        () => makeMCQ('In some seeds like black pepper and beet, remnants of nucellus persist. This residual nucellus is called:', 'Perisperm', ['Endosperm', 'Epicotyl', 'Scutellum'], 'It is 2n maternal tissue.'),
        () => makeMCQ('The integuments of the ovule harden to form the:', 'Seed coat', ['Pericarp', 'Endosperm', 'Cotyledons'], 'Testa and tegmen.'),
        () => makeMCQ('The micropyle remains as a small pore in the seed coat to:', 'Facilitate entry of oxygen and water during germination', ['Allow pollen tube entry', 'Release seeds', 'Exchange genetic material'], 'Crucial for germination.'),
        () => makeMCQ('As the seed matures, its water content is reduced to:', '10-15% moisture by mass', ['50-60%', '1-2%', '30-40%'], 'Induces dormancy.')
    ];

    const s4_post = [
        () => makeMCQ('Embryogeny refers to the development of the:', 'Embryo', ['Endosperm', 'Seed coat', 'Ovary wall'], 'From the zygote.'),
        () => makeMCQ('The normal sequence of embryogeny in dicots is:', 'Zygote → Proembryo → Globular → Heart-shaped → Mature embryo', ['Zygote → Heart-shaped → Globular → Mature', 'Zygote → Mature embryo → Proembryo', 'Zygote → Globular → Proembryo → Heart-shaped'], 'Classic sequence.'),
        () => makeMCQ('A typical dicot embryo consists of an embryonal axis and:', 'Two cotyledons', ['One cotyledon', 'No cotyledons', 'Three cotyledons'], 'Dicot = two cotyledons.'),
        () => makeMCQ('The portion of the embryonal axis above the level of cotyledons is the:', 'Epicotyl', ['Hypocotyl', 'Radicle', 'Coleoptile'], 'Terminates with the plumule.'),
        () => makeMCQ('The epicotyl terminates in the:', 'Plumule (stem tip)', ['Radicle (root tip)', 'Scutellum', 'Coleorhiza'], 'Future shoot.'),
        () => makeMCQ('The cylindrical portion below the level of cotyledons is the:', 'Hypocotyl', ['Epicotyl', 'Plumule', 'Scutellum'], 'Terminates at the radicle.'),
        () => makeMCQ('The radicle is covered by a:', 'Root cap', ['Coleorhiza', 'Coleoptile', 'Scutellum'], 'Protects root tip.'),
        () => makeMCQ('Embryos of monocotyledons possess:', 'Only one cotyledon', ['Two cotyledons', 'Three cotyledons', 'No cotyledons'], 'Monocot = single.'),
        () => makeMCQ('In the grass family, the single cotyledon is called the:', 'Scutellum', ['Coleoptile', 'Coleorhiza', 'Epiblast'], 'Situated towards one side of the embryonal axis.'),
        () => makeMCQ('In monocots, the plumule and shoot apex are enclosed in a hollow foliar structure called:', 'Coleoptile', ['Coleorhiza', 'Scutellum', 'Epiblast'], 'Shoot sheath.'),
        () => makeMCQ('In monocots, the radicle and root cap are enclosed in an undifferentiated sheath called:', 'Coleorhiza', ['Coleoptile', 'Scutellum', 'Epiblast'], 'Root sheath.'),
        () => makeMCQ('The ovary develops into the:', 'Fruit', ['Seed', 'Endosperm', 'Embryo'], 'Ripened ovary.'),
        () => makeMCQ('The wall of the ovary develops into the wall of the fruit called:', 'Pericarp', ['Seed coat', 'Testa', 'Tegmen'], 'Can be fleshy or dry.'),
        () => makeMCQ('In most plants, by the time the fruit develops, other floral parts degenerate. Such fruits are called:', 'True fruits', ['False fruits', 'Parthenocarpic fruits', 'Aggregate fruits'], 'Develop only from ovary.'),
        () => makeMCQ('In apple, strawberry, and cashew, which floral part contributes to fruit formation?', 'Thalamus', ['Sepals', 'Petals', 'Bracts'], 'They are false fruits.'),
        () => makeMCQ('Fruits that develop without fertilisation are called:', 'Parthenocarpic fruits', ['True fruits', 'False fruits', 'Apomictic fruits'], 'They are seedless. E.g. Banana.'),
        () => makeMCQ('Parthenocarpy can be induced by the application of:', 'Growth hormones', ['Fertilisers', 'Antibiotics', 'Fungicides'], 'Like auxins/gibberellins.'),
        () => makeMCQ('What is the oldest recorded viable seed, excavated from Arctic Tundra?', 'Lupinus arcticus (Arctic Lupine)', ['Phoenix dactylifera', 'Mango', 'Lotus'], 'Germinated after 10,000 years.'),
        () => makeMCQ('A 2000-year-old viable seed of Date palm (Phoenix dactylifera) was discovered at:', 'King Herod\'s palace near the Dead Sea', ['Arctic Tundra', 'Egyptian Pyramids', 'Indus Valley'], 'Record dormancy.'),
        () => makeMCQ('Which family includes orchids that produce thousands of tiny seeds in a single fruit?', 'Orchidaceae', ['Fabaceae', 'Solanaceae', 'Brassicaceae'], 'Tiny dust-like seeds.')
    ];

    const s5_apo = [
        () => makeMCQ('The phenomenon of producing seeds without fertilisation is called:', 'Apomixis', ['Parthenocarpy', 'Polyembryony', 'Amphimixis'], 'Mimics sexual reproduction.'),
        () => makeMCQ('Apomixis is a form of:', 'Asexual reproduction that mimics sexual reproduction', ['Sexual reproduction that mimics asexual', 'Vegetative propagation', 'Tissue culture'], 'Produces seeds.'),
        () => makeMCQ('In some species of Asteraceae and grasses, seeds are produced without fertilisation by:', 'Apomixis', ['Parthenocarpy', 'Polyembryony', 'Geitonogamy'], 'Common in these families.'),
        () => makeMCQ('If a diploid egg cell is formed without meiosis and develops into an embryo without fertilisation, it is a case of:', 'Apomixis', ['Polyembryony', 'Parthenocarpy', 'Double fertilisation'], 'A method of apomixis.'),
        () => makeMCQ('The occurrence of more than one embryo in a seed is referred to as:', 'Polyembryony', ['Apomixis', 'Parthenocarpy', 'Multiembrony'], 'E.g. Orange seeds.'),
        () => makeMCQ('In Citrus and Mango varieties, polyembryony often occurs because:', 'Nucellar cells protrude into the embryo sac and develop into embryos', ['Multiple pollen tubes enter', 'The zygote cleaves into many pieces', 'Synergids get fertilised'], 'Adventive embryony.'),
        () => makeMCQ('The embryos derived from nucellar cells in a Citrus seed are:', 'Genetically identical to the parent (Clones)', ['Genetically distinct', 'Haploid', 'Triploid'], 'Since nucellus is 2n maternal tissue.'),
        () => makeMCQ('Why is apomixis highly desired in agriculture for hybrid seeds?', 'It prevents the segregation of hybrid characters in the progeny', ['It increases the size of the seeds', 'It makes the plants disease resistant', 'It decreases the cost of harvesting'], 'Farmers can save seeds.'),
        () => makeMCQ('Currently, hybrid seeds have to be produced every year because:', 'Seeds from hybrids segregate, losing hybrid vigour', ['They are sterile', 'They rot easily', 'They do not germinate'], 'Segregation of traits.'),
        () => makeMCQ('Apomictic seeds are genetically identical to:', 'The maternal parent', ['The paternal parent', 'A cross of both parents', 'The endosperm'], 'Since no fertilisation occurred.'),
        () => makeMCQ('Parthenocarpy produces _____ fruits, while apomixis produces _____ seeds.', 'Seedless, Clonal', ['Clonal, Seedless', 'Large, Small', 'Sweet, Bitter'], 'Partheno=fruit, Apo=seed.'),
        () => makeMCQ('Which of the following describes an adventive embryo?', 'Formed from somatic cells of the ovule like nucellus or integuments', ['Formed by fusion of gametes', 'Formed from synergids', 'Formed from the central cell'], 'Bypasses the egg.'),
        () => makeMCQ('The term "clone" is applicable to the offspring formed by:', 'Apomixis', ['Amphimixis', 'Double fertilisation', 'Syngamy'], 'Genetically identical.'),
        () => makeMCQ('If an apomictic plant has 2n=40, what will be the chromosome number in its endosperm (if formed normally)?', '60', ['40', '20', '80'], 'If PEN is 3n = 3 * 20 = 60.'),
        () => makeMCQ('Squeezing an orange seed typically reveals:', 'Multiple embryos of different sizes', ['A single large embryo', 'No embryo', 'Only endosperm'], 'Evidence of polyembryony.'),
        () => makeMCQ('What is a major economic problem with hybrid seeds?', 'They are expensive and must be bought every year', ['They produce toxic fruits', 'They require too much water', 'They grow too slowly'], 'Costly for farmers.'),
        () => makeMCQ('Apomixis genes, if successfully transferred to hybrid varieties, would allow farmers to:', 'Use the harvested seeds year after year', ['Stop watering their crops', 'Grow crops without soil', 'Produce seedless fruits'], 'No loss of hybrid vigour.'),
        () => makeMCQ('Which of the following is an example of an apomictic family?', 'Asteraceae', ['Fabaceae', 'Solanaceae', 'Liliaceae'], 'Asteraceae and grasses.'),
        () => makeMCQ('Polyembryony is very common in:', 'Citrus', ['Pea', 'Beans', 'Mustard'], 'Orange/Lemon.'),
        () => makeMCQ('In polyembryonate seeds of Citrus, the ploidy of the nucellar embryos is:', 'Diploid (2n)', ['Haploid (n)', 'Triploid (3n)', 'Tetraploid (4n)'], 'They develop from 2n nucellus cells.')
    ];

    const generateSet = (generatorArray, count) => {
        let selected = [];
        let attempts = 0;
        const shuffledGens = shuffle(generatorArray);
        while(selected.length < count && attempts < 100) {
            const q = shuffledGens[selected.length % shuffledGens.length]();
            if (!selected.some(existing => existing.question === q.question)) {
                selected.push(q);
            }
            attempts++;
        }
        return selected;
    };

    return [

    {
        id: 'skill-1',
        title: 'The Flower',
        desc: 'Structure of the flower — the site of sexual reproduction in angiosperms. Whorls, sexuality, and symmetry.',
        color: '#e05a47',
        icon: '🌸',
        learnSections: [
            {
                heading: "Morphology — The Flower: A Fascinating Organ",
                icon: "🌺",
                content: "The **flower** is a modified shoot that serves as the site of sexual reproduction in angiosperms.\n\nA typical flower has four whorls attached to the **thalamus** (receptacle):\n• **Calyx** — outermost whorl of **sepals** (usually green, protective)\n• **Corolla** — whorl of **petals** (colourful, attracts pollinators)\n• **Androecium** — whorl of **stamens** (male reproductive organs)\n• **Gynoecium** — whorl of **pistils/carpels** (female reproductive organs)\n\nCalyx and Corolla are **accessory whorls** — they help in reproduction but do not directly produce gametes.\nAndroecium and Gynoecium are **essential whorls** — they directly produce male and female gametes respectively.",
                example: "A flower with all four whorls (sepals, petals, stamens, pistils) is called a **complete flower** (e.g., Hibiscus). If any whorl is missing, it is **incomplete**.",
                keyLabel: "key-fact"
            },
            {
                heading: "Sexuality of Flowers",
                icon: "⚡",
                content: "Flowers can be classified by the presence of reproductive whorls:\n\n• **Bisexual (Hermaphrodite)** — Both androecium and gynoecium present in the same flower. Example: Hibiscus, Mustard, Lily.\n• **Unisexual** — Only one reproductive whorl present.\n  → **Staminate (Male flower)** — has only stamens. Example: Male flower of Cucumber.\n  → **Pistillate (Female flower)** — has only pistils. Example: Female flower of Papaya.\n\nPlant sexuality based on flower distribution:\n• **Monoecious** — Both male and female flowers on the **same plant** (e.g., Maize, Cucumber)\n• **Dioecious** — Male and female flowers on **different plants** (e.g., Papaya, Date palm)",
                example: "Monoecious = 'one house' (both sexes on same plant). Dioecious = 'two houses' (sexes on separate plants). This is a very common NEET question.",
                keyLabel: "neet-note"
            }
        ],
        pyqs: {
            neet: {
                questions: [
                    "Which part of the flower develops into fruit after fertilisation?",
                    "Identify the correct sequence: Sepal → Petal → Stamen → Carpel (outer → inner)",
                    "A bisexual flower contains which of the following?",
                    "Which whorl is directly involved in reproduction?",
                    "Flowers are modified ______."
                ],
                trap: "Confusing accessory vs reproductive whorls. Thinking petals are reproductive."
            },
            cet: {
                questions: [
                    "Name the male reproductive part of a flower.",
                    "What is the function of sepals?",
                    "Define bisexual flower with example.",
                    "Which part protects the flower bud?",
                    "Expand: Androecium."
                ],
                trap: "Simple definitions → easy marks lost due to wording."
            },
            board: {
                questions: [
                    "Draw and label a typical flower.",
                    "Differentiate between androecium and gynoecium.",
                    "Explain the structure of a flower briefly.",
                    "What are accessory whorls?",
                    "Write functions of petals."
                ],
                trap: "Missing diagram labels = marks cut."
            }
        },
        practice: generateSet(s1_flower, 20),
        assess: generateSet(s1_flower, 20)
    },
    {
        id: 'skill-2',
        title: 'Pre-fertilisation',
        desc: 'Stamen, microsporogenesis, pollen grain, pistil, megasporogenesis, embryo sac, pollination & outbreeding.',
        color: '#2563eb',
        icon: '🔬',
        learnSections: [
            {
                heading: "Male Whorl — Stamen, Microsporangium & Anther",
                icon: "🧪",
                content: "The **stamen** (microsporophyll) is the male reproductive organ. It consists of:\n• **Filament** — a long, slender stalk\n• **Anther** — the terminal, bilobed structure that produces pollen\n\nA typical anther is **bilobed**, **dithecous** (two theca), and **tetrasporangiate** (four microsporangia — two per lobe).\n\nAnther Wall Layers (outside → inside):\n1. **Epidermis** — outermost protective layer\n2. **Endothecium** — helps in dehiscence (splitting) of anther\n3. **Middle layers** — 2-3 layers, degenerate as anther matures\n4. **Tapetum** — innermost layer; **nourishes** developing pollen grains\n\nThe centre of each microsporangium contains **sporogenous tissue** — the cells that will undergo meiosis to form pollen.",
                example: "**Tapetum** is the most important anther wall layer for NEET. It is nutritive (provides food to developing microspores). Tapetal cells are usually polyploid and multinucleate. They produce **Ubisch bodies** and **pollenkitt**.",
                keyLabel: "neet-trap"
            },
            {
                heading: "Microsporogenesis",
                icon: "🔄",
                content: "**Microsporogenesis** is the process of formation of **microspores** (pollen) from a **Pollen Mother Cell (PMC)** by meiosis.\n\nSequence:\n• Sporogenous tissue → **Pollen Mother Cells (PMC)** (diploid, 2n)\n• Each PMC undergoes **meiosis** → produces a **tetrad** of four haploid (n) microspores\n• Tetrads separate → individual **microspores**\n• Each microspore matures into a **pollen grain**\n\nDevelopmental sequence (must memorise):\n**Sporogenous tissue → PMC → Meiosis → Microspore tetrad → Microspores → Pollen grains**",
                example: "Do NOT confuse **Microsporogenesis** (PMC → microspores via meiosis) with **Microgametogenesis** (microspore → male gametophyte via mitosis). Sporogenesis = meiosis. Gametogenesis = mitosis.",
                keyLabel: "neet-trap"
            },
            {
                heading: "Pollen Grain Structure",
                icon: "🟡",
                content: "The mature **pollen grain** (male gametophyte) has a two-layered wall:\n\nOuter wall — **Exine**:\n• Made of **sporopollenin** — the most resistant organic material known\n• Can withstand high temperature, strong acids, and alkalis\n• Cannot be degraded by any known enzyme\n• Has openings called **germ pores** where sporopollenin is absent\n\nInner wall — **Intine**:\n• Made of **cellulose** and **pectin**\n• Thin, continuous layer\n\nAt the time of shedding, pollen grain contains:\n• **Vegetative cell** (larger, abundant food reserve, irregular nucleus)\n• **Generative cell** (small, dense cytoplasm, floats in vegetative cell cytoplasm)\n\nThe generative cell later divides by **mitosis** to form **two male gametes**.\nThis division may happen before shedding (3-celled pollen) or after landing on stigma (2-celled pollen).",
                example: "**Sporopollenin** is the toughest organic material. It is absent at germ pores — this is where the pollen tube emerges during germination. Pollen grains are well-preserved as fossils because of sporopollenin.",
                keyLabel: "key-fact"
            },
            {
                heading: "Female Whorl — The Pistil, Ovule & Megasporangium",
                icon: "🌿",
                content: "The **pistil** (megasporophyll) is the female reproductive organ. It has three parts:\n• **Stigma** — landing platform for pollen; often sticky or feathery\n• **Style** — elongated slender part connecting stigma to ovary\n• **Ovary** — basal swollen part containing one or more **ovules**\n\n**Gynoecium types:**\n• **Monocarpellary** — single carpel (e.g., Pea)\n• **Multicarpellary syncarpous** — multiple carpels fused (e.g., Tomato)\n• **Multicarpellary apocarpous** — multiple free carpels (e.g., Lotus)\n\nThe **ovule** (megasporangium) structure:\n• **Funicle** — stalk attaching ovule to placenta\n• **Hilum** — junction of ovule and funicle\n• **Integuments** — 1 or 2 protective envelopes\n• **Micropyle** — small opening in integuments (pollen tube entry)\n• **Chalaza** — basal part, opposite to micropyle\n• **Nucellus** — mass of parenchyma cells with food reserves\n• **Embryo sac** — located within the nucellus",
                example: "The ovule is technically the **megasporangium**. The integuments are NOT part of the sporangium — they are protective coverings. The nucellus is the actual sporangium tissue.",
                keyLabel: "key-fact"
            },
            {
                heading: "Megasporogenesis",
                icon: "✂️",
                content: "**Megasporogenesis** is the formation of megaspores from the **Megaspore Mother Cell (MMC)**.\n\n• A single **MMC** differentiates in the micropylar region of the nucellus\n• MMC is diploid (2n), large, with dense cytoplasm\n• MMC undergoes **meiosis** → produces **4 haploid megaspores** (linear tetrad)\n• **3 megaspores degenerate** (towards micropylar end)\n• **1 functional megaspore** survives (towards chalazal end)\n\nThe functional megaspore develops into the female gametophyte (embryo sac).\n\nThis is called **monosporic development** (Polygonum type) — because the embryo sac develops from a single megaspore.",
                example: "Why does only ONE megaspore survive? This is an economy measure — one is enough. The three that degenerate are always the ones closest to the micropylar end. The functional one is the chalazal-most megaspore.",
                keyLabel: "neet-note"
            },
            {
                heading: "Female Gametophyte (Embryo Sac)",
                icon: "🥚",
                content: "The functional megaspore develops into the **embryo sac** through **three successive mitotic divisions**:\n\n• 1 megaspore → 2-nucleate → 4-nucleate → **8-nucleate** stage\n• These divisions are **free nuclear** (no cell walls form immediately)\n• After 8-nucleate stage, cell walls are laid down\n\nFinal structure — **7-celled, 8-nucleate**:\n\n**Micropylar end:**\n• **Egg apparatus** = 1 **egg cell** + 2 **synergids**\n• Synergids have **filiform apparatus** (finger-like projections) that guide the pollen tube\n\n**Chalazal end:**\n• 3 **antipodal cells** (nutritive role, may degenerate)\n\n**Centre:**\n• 1 large **central cell** containing **2 polar nuclei**\n\nTotal: 6 cells with walls + 1 central cell with 2 nuclei = **7 cells, 8 nuclei**",
                example: "NEET trap: The embryo sac is **7-celled and 8-nucleate**, NOT 8-celled! The two polar nuclei are in the same central cell. This is one of the most frequently tested facts.",
                keyLabel: "neet-trap"
            },
            {
                heading: "Transfer — Pollination",
                icon: "🐝",
                content: "**Pollination** = transfer of pollen grains from anther to stigma.\n\nThree types based on source of pollen:\n\n1. **Autogamy** — pollen transferred within the **same flower**\n   • Requires synchrony of pollen release and stigma receptivity\n   • **Cleistogamous flowers** — never open; guaranteed autogamy (e.g., Viola, Oxalis, Commelina)\n   • **Chasmogamous flowers** — open flowers with exposed anthers/stigma\n\n2. **Geitonogamy** — pollen transferred to stigma of **another flower on the same plant**\n   • Functionally cross-pollination (needs agent)\n   • Genetically equivalent to self-pollination (same plant's genes)\n\n3. **Xenogamy** (Cross-pollination) — pollen from a **different plant**\n   • The only type that brings **genetically different** pollen\n   • Produces variation",
                example: "Geitonogamy is the trickiest concept: it LOOKS like cross-pollination (involves an agent) but IS genetically self-pollination (same plant). NEET loves asking this distinction.",
                keyLabel: "neet-trap"
            },
            {
                heading: "Agents of Pollination",
                icon: "🌬️",
                content: "Plants use **abiotic** and **biotic** agents for pollination:\n\n**Abiotic agents:**\n• **Anemophily** (wind) — light, non-sticky pollen; feathery stigma; no scent/colour. Examples: Maize, Grasses, Cannabis\n• **Hydrophily** (water) — rare; pollen released into water. Examples: Vallisneria (female flowers float), Zostera, Hydrilla\n\n**Biotic agents:**\n• **Entomophily** (insects) — large, colourful petals; fragrance; nectar. Examples: Rose, Sunflower, Orchid\n• **Ornithophily** (birds) — large, bright red flowers; copious nectar. Example: Bombax (silk cotton)\n• **Chiropterophily** (bats) — large, dull-coloured flowers that open at night",
                table: {
                    headers: ["Feature", "Wind-pollinated", "Insect-pollinated"],
                    rows: [
                        ["Pollen", "Light, dry, non-sticky", "Heavy, sticky, spiny"],
                        ["Stigma", "Feathery, exposed", "Sticky"],
                        ["Petals", "Small/absent, dull", "Large, colourful"],
                        ["Nectar/Scent", "Absent", "Present"],
                        ["Pollen quantity", "Enormous", "Moderate"]
                    ]
                },
                example: "Most plants use biotic agents. Only a small proportion use abiotic agents. Wind and water pollination are chance-based, so these plants produce enormous amounts of pollen to compensate.",
                keyLabel: "key-fact"
            },
            {
                heading: "Outbreeding Devices",
                icon: "🚫",
                content: "Many plants have evolved mechanisms to **prevent self-pollination** and encourage cross-pollination:\n\n1. **Dichogamy** — anthers and stigma mature at different times\n   • **Protandry** — anthers mature first (e.g., Sunflower)\n   • **Protogyny** — stigma matures first (e.g., Mirabilis)\n\n2. **Herkogamy** — physical barrier between anther and stigma in the same flower\n\n3. **Self-incompatibility (SI)** — genetic mechanism; pollen of the same plant is rejected by the stigma. Based on S-alleles.\n\n4. **Dioecious plants** — male and female flowers on separate plants (e.g., Papaya) — cross-pollination is obligatory",
                example: "**Cleistogamy** is NOT an outbreeding device — it actually PROMOTES self-pollination (inbreeding). This is a classic NEET trap MCQ: 'Which is NOT an outbreeding device? Answer: Cleistogamy'.",
                keyLabel: "neet-trap"
            },
            {
                heading: "Pollen-Pistil Interaction",
                icon: "🤝",
                content: "After pollen lands on the stigma, a series of events determines if fertilisation can proceed:\n\n• **Compatible pollen** → accepted; germinates on stigma\n• **Incompatible pollen** → rejected (self-incompatibility mechanism)\n\nSteps of compatible pollen-pistil interaction:\n1. Pollen grain lands on stigma\n2. Stigma recognises pollen (protein-protein interaction)\n3. Pollen grain **germinates** — pollen tube emerges through the germ pore\n4. Pollen tube grows through the **style** (using enzymes to digest tissue)\n5. The **generative cell** divides into **two male gametes** inside the pollen tube\n6. Pollen tube enters the ovule through the **micropyle**\n7. Pollen tube enters one of the **synergids** and releases the two male gametes\n\nThe pollen tube is guided by **chemical signals** from the synergids (especially the filiform apparatus).",
                example: "The entire journey from stigma → style → ovary → micropyle → synergid is guided by chemical attractants. The filiform apparatus of the synergids plays a crucial role in guiding the pollen tube.",
                keyLabel: "key-fact"
            }
        ],
        pyqs: {
            neet: {
                questions: [
                    "What is the ploidy of microspore tetrad?",
                    "Tapetum function is:",
                    "Pollen exine is made of ______.",
                    "Functional megaspore develops into:",
                    "Embryo sac is ______ nucleate and ______ celled."
                ],
                trap: "8-nucleate ≠ 8-celled (it’s 7-celled, 8-nucleate). Confusing sporopollenin."
            },
            cet: {
                questions: [
                    "Define microsporogenesis.",
                    "What is MMC?",
                    "Name layers of microsporangium.",
                    "What is pollination?",
                    "Types of pollination."
                ],
                trap: "Mixing autogamy, geitonogamy, xenogamy."
            },
            board: {
                questions: [
                    "Describe structure of microsporangium.",
                    "Explain megasporogenesis with diagram.",
                    "Describe embryo sac structure.",
                    "Types of pollination with examples.",
                    "Explain outbreeding devices."
                ],
                trap: "Not drawing embryo sac properly. Forgetting synergids + filiform apparatus."
            }
        },
        practice: generateSet(s2_prefert, 20),
        assess: generateSet(s2_prefert, 20)
    },
    {
        id: 'skill-3',
        title: 'Double Fertilisation',
        desc: 'The unique hallmark of angiosperms — syngamy and triple fusion occurring simultaneously.',
        color: '#ea580c',
        icon: '✌️',
        learnSections: [
            {
                heading: "Process — Pollen Tube Entry & Gamete Delivery",
                icon: "🚀",
                content: "After the pollen tube enters the embryo sac through the micropyle, it discharges its contents into one of the **synergids**:\n\n• The pollen tube enters through the **micropyle** (most common — called **porogamy**)\n• Rarely through chalaza (**chalazogamy**) or through integuments (**mesogamy**)\n• The tip of the pollen tube enters a **synergid** and bursts\n• Releases **two male gametes** and the **vegetative nucleus** (which degenerates)\n• The synergid also degenerates after discharge",
                example: "Entry through micropyle = **porogamy** (most common). Entry through chalaza = **chalazogamy**. Entry through integuments = **mesogamy**. NEET usually asks about porogamy.",
                keyLabel: "key-fact"
            },
            {
                heading: "Syngamy & Triple Fusion",
                icon: "🔥",
                content: "After release, the two male gametes participate in **two separate fusion events**:\n\n**Event 1 — Syngamy:**\n• One male gamete (n) + Egg cell (n) → **Zygote (2n)**\n• This is true fertilisation\n\n**Event 2 — Triple Fusion:**\n• Other male gamete (n) + 2 Polar nuclei (n + n) → **Primary Endosperm Nucleus (PEN, 3n)**\n• Called triple fusion because three nuclei fuse\n• PEN develops into the **endosperm** (nutritive tissue)\n\nBoth events occurring together = **DOUBLE FERTILISATION**\n\nThis is the **defining feature** of angiosperms — it does NOT occur in gymnosperms or any other plant group.",
                example: "Double fertilisation = Syngamy + Triple Fusion. The product of syngamy is the **zygote (2n)**. The product of triple fusion is the **Primary Endosperm Nucleus (3n)**. Both events happen inside the same embryo sac.",
                keyLabel: "neet-note"
            },
            {
                heading: "Significance of Double Fertilisation",
                icon: "💡",
                content: "Why did angiosperms evolve double fertilisation?\n\n• **Endosperm formation is linked to fertilisation** — the plant does not waste energy producing endosperm unless an embryo is actually forming\n• **Endosperm nourishes** the developing embryo\n• **Triploid endosperm (3n)** has more vigour than diploid tissue — provides better nutrition\n• This is more efficient than gymnosperms where endosperm (female gametophyte) forms BEFORE fertilisation\n\nAfter double fertilisation:\n• Zygote → **Embryo**\n• PEN → **Endosperm**\n• Synergids and antipodals → **degenerate**\n• Ovule → **Seed**\n• Ovary → **Fruit**",
                example: "The endosperm always begins developing BEFORE the embryo. This ensures that the embryo has a ready food supply when it starts growing. The zygote undergoes a period of dormancy before dividing.",
                keyLabel: "key-fact"
            }
        ],
        pyqs: {
            neet: {
                questions: [
                    "Double fertilisation is unique to:",
                    "Triple fusion results in formation of:",
                    "Ploidy of endosperm is:",
                    "Syngamy involves fusion of:",
                    "Number of male gametes involved:"
                ],
                trap: "Endosperm = triploid (3n). Two events: syngamy + triple fusion."
            },
            cet: {
                questions: [
                    "Define double fertilisation.",
                    "What is triple fusion?",
                    "What is zygote?",
                    "What is PEN?",
                    "Where does fertilisation occur?"
                ],
                trap: "Confusing zygote vs endosperm."
            },
            board: {
                questions: [
                    "Explain double fertilisation with diagram.",
                    "What is triple fusion?",
                    "Why is it unique to angiosperms?",
                    "Describe role of pollen tube.",
                    "Explain fusion events stepwise."
                ],
                trap: "Missing 2 male gametes roles."
            }
        },
        practice: generateSet(s3_double, 20),
        assess: generateSet(s3_double, 20)
    },
    {
        id: 'skill-4',
        title: 'Post-fertilisation',
        desc: 'Endosperm development, embryogeny, seed and fruit formation — from zygote to mature seed.',
        color: '#059669',
        icon: '🌱',
        learnSections: [
            {
                heading: "Nourishment — Endosperm Development",
                icon: "🍚",
                content: "The **Primary Endosperm Nucleus (PEN, 3n)** divides repeatedly to form the **endosperm** — the nutritive tissue for the embryo.\n\nThree types of endosperm development:\n\n1. **Nuclear type** — PEN undergoes free nuclear divisions (no cell walls initially); cell walls form later. Most common type. Example: Coconut\n   • Coconut water = free nuclear endosperm (liquid)\n   • Coconut meat = cellular endosperm (solid)\n\n2. **Cellular type** — every nuclear division is followed by cell wall formation. Example: Petunia\n\n3. **Helobial type** — intermediate; first division forms two unequal cells, then nuclear divisions. Example: Monocots\n\nBased on endosperm persistence in mature seed:\n• **Albuminous (Endospermic)** — endosperm persists in mature seed. Examples: Wheat, Maize, Castor, Barley\n• **Non-albuminous (Ex-albuminous)** — endosperm completely consumed during embryo development. Examples: Pea, Groundnut, Beans",
                example: "In Coconut: the liquid is free-nuclear endosperm, the white solid is cellular endosperm. This is a favourite NCERT example for board exams.",
                keyLabel: "neet-note"
            },
            {
                heading: "Development — Embryo Development (Embryogeny)",
                icon: "🌿",
                content: "The **zygote** divides only AFTER some endosperm has formed (ensures nutrition is available).\n\nStages of embryogeny in dicots:\n**Zygote → Proembryo → Globular stage → Heart-shaped stage → Mature embryo**\n\n**Dicot Embryo** structure:\n• **Embryonal axis** with two ends:\n  → **Epicotyl** (above cotyledons) — terminates in **plumule** (future shoot)\n  → **Hypocotyl** (below cotyledons) — terminates in **radicle** (future root)\n• **Two cotyledons** attached to the embryonal axis\n• Radicle is covered by a **root cap**\n\n**Monocot Embryo** (grass family) structure:\n• **Single cotyledon** called **scutellum** (lateral, shield-shaped)\n• **Coleoptile** — hollow sheath covering the plumule\n• **Coleorrhiza** — undifferentiated sheath covering the radicle\n• Epicotyl has shoot apex and leaf primordia",
                table: {
                    headers: ["Feature", "Dicot Embryo", "Monocot Embryo"],
                    rows: [
                        ["Cotyledons", "Two", "One (scutellum)"],
                        ["Plumule covering", "Naked", "Coleoptile"],
                        ["Radicle covering", "Root cap only", "Coleorrhiza + root cap"],
                        ["Cotyledon position", "Terminal", "Lateral"],
                        ["Examples", "Pea, Bean", "Wheat, Maize, Rice"]
                    ]
                },
                example: "**Scutellum** = the single cotyledon of monocots (not a separate structure). **Coleoptile** = covers the shoot. **Coleorrhiza** = covers the root. These three terms are uniquely monocot.",
                keyLabel: "neet-note"
            },
            {
                heading: "Final Product — Seed",
                icon: "🫘",
                content: "The **seed** is a fertilised, matured ovule. It is the final product of sexual reproduction in angiosperms.\n\nSeed components:\n• **Seed coat** — developed from integuments; tough, protective\n  → **Testa** (outer coat) and **Tegmen** (inner coat)\n• **Cotyledon(s)** — may store food (thick in non-albuminous seeds)\n• **Embryonal axis** — with plumule and radicle\n• **Endosperm** — present in albuminous seeds, absent in non-albuminous\n• **Micropyle** persists as a small pore → allows water and oxygen entry during germination\n\nSeed maturation:\n• Water content reduces to **10-15%** moisture\n• Metabolic activity slows down\n• Embryo enters **dormancy** (state of inactivity)\n• Seeds germinate when conditions are favourable (moisture, oxygen, temperature)\n\n**Perisperm** — remnants of nucellus that persist in some seeds (e.g., Black pepper, Beet)",
                example: "**Perisperm** = persistent nucellus (rare). **Endosperm** = product of triple fusion. These are different tissues! Perisperm is diploid maternal tissue; endosperm is triploid.",
                keyLabel: "neet-trap"
            },
            {
                heading: "Fruit Formation",
                icon: "🍎",
                content: "As ovules mature into seeds, the **ovary simultaneously develops into the fruit**.\n\n• **Pericarp** = wall of the fruit, developed from the ovary wall\n• Fruits may be **fleshy** (Mango, Guava) or **dry** (Groundnut, Mustard)\n\nTypes of fruits:\n• **True fruit** — develops only from the ovary. Most fruits are true fruits.\n• **False fruit (Pseudocarp)** — the thalamus or other floral parts also contribute. Examples: Apple (thalamus forms fleshy part), Strawberry, Cashew\n• **Parthenocarpic fruit** — fruit develops WITHOUT fertilisation → **seedless**. Example: Banana. Can be induced by growth hormones.\n\nRelationship: Number of ovules in ovary = Number of seeds in fruit (approximately).",
                example: "In Apple, the fleshy part you eat is the **thalamus**, not the ovary! The true fruit (ovary) is the core with seeds. That's why Apple is a **false fruit**.",
                keyLabel: "neet-note"
            }
        ],
        pyqs: {
            neet: {
                questions: [
                    "Coconut water is:",
                    "Endosperm develops from:",
                    "Non-albuminous seeds lack:",
                    "True fruit develops from:",
                    "Parthenocarpic fruit example:"
                ],
                trap: "Coconut water = free nuclear endosperm. Banana = parthenocarpy."
            },
            cet: {
                questions: [
                    "Define seed.",
                    "What is pericarp?",
                    "Types of seeds.",
                    "What is dormancy?",
                    "What is endosperm?"
                ],
                trap: "Mixing albuminous vs non-albuminous."
            },
            board: {
                questions: [
                    "Describe embryo development.",
                    "Structure of dicot embryo.",
                    "What are seeds? Explain types.",
                    "Explain endosperm formation.",
                    "Define parthenocarpy."
                ],
                trap: "Not labeling embryo parts (plumule, radicle)."
            }
        },
        practice: generateSet(s4_post, 20),
        assess: generateSet(s4_post, 20)
    },
    {
        id: 'skill-5',
        title: 'Apomixis & Polyembryony',
        desc: 'Seed formation without fertilisation, and occurrence of multiple embryos — significance in agriculture.',
        color: '#7c3aed',
        icon: '🧬',
        learnSections: [
            {
                heading: "Special Cases — Apomixis",
                icon: "🔬",
                content: "**Apomixis** = production of seeds WITHOUT fertilisation. It is a form of **asexual reproduction that mimics sexual reproduction**.\n\nDo not confuse:\n• **Apomixis** = seeds without fertilisation\n• **Parthenocarpy** = fruits without fertilisation (seedless)\n\nMechanisms of apomixis:\n\n1. **Diploid egg cell** — formed without meiosis (no reduction division); develops into embryo without fertilisation\n\n2. **Adventive embryony** — cells of the **nucellus** or **integuments** surrounding the embryo sac start dividing, protrude into the embryo sac, and develop into embryos\n   • Common in **Citrus** and **Mango**\n   • These embryos are genetically identical to the parent (clones)\n\nApomictic seeds are essentially **clones** of the parent plant.",
                example: "Apomixis = seeds without fertilisation (has seeds). Parthenocarpy = fruits without fertilisation (no seeds). This distinction is a NEET favourite.",
                keyLabel: "neet-trap"
            },
            {
                heading: "Polyembryony",
                icon: "👥",
                content: "**Polyembryony** = occurrence of **more than one embryo** in a seed.\n\nCauses:\n• **Adventive embryony** — nucellar/integumentary cells form extra embryos alongside the zygotic embryo\n• Multiple embryo sacs in one ovule\n• Cleavage of the zygotic embryo\n\nExamples: **Orange (Citrus)**, Mango\n\nIf you squeeze orange seeds, you can observe multiple embryos of different sizes. The embryos derived from nucellus are **genetically identical** to the parent (maternal clones), while the zygotic embryo is genetically unique.",
                example: "In Citrus, both zygotic embryos and adventive (nucellar) embryos coexist in the same seed. The nucellar embryos are clones of the mother plant.",
                keyLabel: "key-fact"
            },
            {
                heading: "Agricultural Significance",
                icon: "🌾",
                content: "Why is apomixis important in agriculture?\n\n**The Hybrid Seed Problem:**\n• Hybrid crop varieties have tremendously increased productivity\n• But hybrid seeds must be **produced every year** (expensive)\n• If seeds from hybrids are sown, progeny **segregates** (loses hybrid vigour)\n\n**The Apomixis Solution:**\n• If hybrids are made **apomictic**, seeds will produce identical plants\n• No segregation in progeny — hybrid characters are maintained\n• Farmers can reuse seeds year after year\n• No need to buy expensive hybrid seeds annually\n\nActive research is underway worldwide to:\n• Understand the genetics of apomixis\n• Transfer apomictic genes into hybrid crop varieties\n\nThis could revolutionise agriculture by making hybrid seeds affordable and reusable.",
                example: "The dream of agricultural biotechnology: take a high-yielding hybrid → make it apomictic → farmers can save and replant seeds forever while maintaining hybrid vigour. This is still an active area of research.",
                keyLabel: "key-fact"
            }
        ],
        pyqs: {
            neet: {
                questions: [
                    "Apomixis is:",
                    "Polyembryony occurs in:",
                    "Apomictic seeds are genetically:",
                    "Advantage of apomixis:",
                    "Example of polyembryony:"
                ],
                trap: "Apomixis = asexual reproduction mimicking sexual. Seeds are clones."
            },
            cet: {
                questions: [
                    "Define apomixis.",
                    "Define polyembryony.",
                    "Give one example each.",
                    "Importance of apomixis.",
                    "What are hybrid seeds?"
                ],
                trap: "Forgetting examples (Mango, Citrus)."
            },
            board: {
                questions: [
                    "Explain apomixis with significance.",
                    "What is polyembryony? Explain.",
                    "Advantages of apomixis in agriculture.",
                    "Explain hybrid seed problem.",
                    "Write short note on apomixis."
                ],
                trap: "Not linking with agriculture application."
            }
        },
        practice: generateSet(s5_apo, 20),
        assess: generateSet(s5_apo, 20)
    }
    ];
};

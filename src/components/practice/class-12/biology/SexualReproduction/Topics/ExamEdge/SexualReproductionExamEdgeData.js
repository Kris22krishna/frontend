export const EXAM_DATA = {
    neet: {
        label: "NEET",
        icon: "🔬",
        color: "#7c3aed",
        gradient: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
        tagline: "Concept + Tricky MCQs",
        importantTopics: [
            { text: "Structure of flower (especially microsporophyll & megasporophyll)", hot: true },
            { text: "Anther structure (4 microsporangia, wall layers)", hot: true },
            { text: "Microsporogenesis vs Microgametogenesis", hot: false },
            { text: "Pollen grain structure (exine, intine, generative cell)", hot: false },
            { text: "Types of ovules", hot: false },
            { text: "Megasporogenesis (monosporic – Polygonum type)", hot: true },
            { text: "Embryo sac structure (7-celled, 8-nucleate)", hot: true },
            { text: "Double fertilization", hot: true },
            { text: "Pollination types + agents", hot: false },
            { text: "Outbreeding devices", hot: false },
            { text: "Pollen-pistil interaction", hot: false },
            { text: "Apomixis & Polyembryony", hot: false }
        ],
        traps: [
            { trap: "Saying embryo sac is 8-celled", correction: "It's 7-celled, 8-nucleate" },
            { trap: "Confusing microsporogenesis vs microgametogenesis", correction: "Sporogenesis = spore formation (meiosis); Gametogenesis = gamete formation (mitosis)" },
            { trap: "Forgetting tapetum is nutritive", correction: "Tapetum provides nourishment to developing pollen grains" },
            { trap: "Mixing up synergids vs antipodals", correction: "Synergids are at micropylar end; Antipodals at chalazal end" },
            { trap: "Thinking endosperm is always triploid", correction: "Mostly yes (3n), but examiners twist the wording" },
            { trap: "Pollination vs fertilization confusion", correction: "Pollination = pollen transfer; Fertilization = gamete fusion" }
        ],
        pyqs: [
            {
                question: "Double fertilization involves:",
                options: [
                    "Two pollen grains",
                    "One male gamete + egg, one + polar nuclei",
                    "Two eggs",
                    "Only zygote formation"
                ],
                correct: 1,
                explanation: "In double fertilization, one male gamete fuses with the egg (syngamy) and the other fuses with two polar nuclei (triple fusion)."
            },
            {
                question: "Exine of pollen grain is made of:",
                options: ["Cellulose", "Sporopollenin", "Lignin", "Suberin"],
                correct: 1,
                explanation: "Sporopollenin is the most resistant organic material known. It can withstand high temperatures, strong acids, and alkalis."
            },
            {
                question: "Tapetum function:",
                options: ["Protection", "Nutrition", "Reproduction", "Pollination"],
                correct: 1,
                explanation: "The tapetum is the innermost wall layer of the microsporangium. It nourishes the developing pollen grains."
            },
            {
                question: "Embryo sac type in angiosperms:",
                options: ["Bisporic", "Tetrasporic", "Monosporic", "None"],
                correct: 2,
                explanation: "Most angiosperms have the Polygonum type of embryo sac development, which is monosporic (develops from a single megaspore)."
            },
            {
                question: "Which is NOT an outbreeding device?",
                options: ["Dichogamy", "Self-incompatibility", "Cleistogamy", "Herkogamy"],
                correct: 2,
                explanation: "Cleistogamy promotes self-pollination (selfing) because the flowers never open. All others are outbreeding devices that prevent self-pollination."
            }
        ]
    },
    cet: {
        label: "CET",
        icon: "⚡",
        color: "#0891b2",
        gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
        tagline: "Speed + Direct Facts",
        importantTopics: [
            { text: "Definitions (autogamy, geitonogamy, xenogamy)", hot: true },
            { text: "Agents of pollination", hot: false },
            { text: "Parts of stamen & carpel", hot: true },
            { text: "Types of ovule (orthotropous, anatropous)", hot: false },
            { text: "Fertilization steps", hot: true },
            { text: "Endosperm types", hot: false },
            { text: "Seed formation basics", hot: false }
        ],
        traps: [
            { trap: "Similar terms confusion (autogamy vs geitonogamy)", correction: "Autogamy = same flower; Geitonogamy = different flower, same plant" },
            { trap: "Skipping NCERT lines", correction: "CET LOVES direct NCERT lines — read the text carefully" },
            { trap: "Overthinking simple questions", correction: "CET is less deep, more direct — don't overcomplicate" }
        ],
        pyqs: [
            {
                question: "Transfer of pollen within same flower is called:",
                options: ["Xenogamy", "Geitonogamy", "Autogamy", "Allogamy"],
                correct: 2,
                explanation: "Autogamy is the transfer of pollen grains from the anther to the stigma of the same flower."
            },
            {
                question: "Pollination by insects is called:",
                options: ["Anemophily", "Hydrophily", "Entomophily", "Ornithophily"],
                correct: 2,
                explanation: "Entomophily refers to pollination carried out by insects (entomo = insect)."
            },
            {
                question: "Ovule becomes:",
                options: ["Fruit", "Embryo", "Seed", "Pollen"],
                correct: 2,
                explanation: "After fertilization, the ovule develops into a seed."
            },
            {
                question: "Ovary becomes:",
                options: ["Seed", "Embryo sac", "Fruit", "Pollen tube"],
                correct: 2,
                explanation: "After fertilization, the ovary develops into a fruit."
            },
            {
                question: "Male gametes are produced in:",
                options: ["Ovule", "Stigma", "Pollen grain", "Style"],
                correct: 2,
                explanation: "The generative cell of the pollen grain divides to produce two male gametes."
            }
        ]
    },
    boards: {
        label: "Board Exam",
        icon: "📝",
        color: "#ea580c",
        gradient: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
        tagline: "Theory + Diagrams",
        importantTopics: [
            { text: "Structure of anther (diagram compulsory)", hot: true },
            { text: "Structure of ovule (diagram compulsory)", hot: true },
            { text: "Development of male gametophyte", hot: true },
            { text: "Development of female gametophyte", hot: true },
            { text: "Double fertilization (explain step-by-step)", hot: true },
            { text: "Pollination types with examples", hot: false },
            { text: "Outbreeding devices (explain any 3)", hot: false },
            { text: "Apomixis (short note)", hot: false }
        ],
        traps: [
            { trap: "Missing diagrams", correction: "Marks will be cut — always draw labeled diagrams" },
            { trap: "Writing vague answers", correction: "They want NCERT wording — be precise" },
            { trap: "Skipping keywords", correction: "Always include: 'syngamy', 'triple fusion', 'primary endosperm nucleus'" }
        ],
        pyqs: [
            {
                question: "Explain double fertilization with diagram.",
                type: "long",
                keyPoints: ["Define syngamy and triple fusion", "Mention both male gametes", "Draw labeled embryo sac", "Show zygote (2n) and PEN (3n)"]
            },
            {
                question: "Describe structure of anther.",
                type: "long",
                keyPoints: ["4 microsporangia (bilobed)", "Wall layers: epidermis, endothecium, middle layers, tapetum", "Tapetum is nutritive", "Draw T.S. of anther"]
            },
            {
                question: "Explain pollination types.",
                type: "long",
                keyPoints: ["Autogamy — same flower", "Geitonogamy — different flower, same plant", "Xenogamy — different plant", "Give examples for each"]
            },
            {
                question: "Draw and label embryo sac.",
                type: "long",
                keyPoints: ["7-celled, 8-nucleate", "Egg apparatus (egg + 2 synergids)", "Central cell (2 polar nuclei)", "3 antipodals at chalazal end"]
            },
            {
                question: "Write short note on apomixis.",
                type: "long",
                keyPoints: ["Seed formation without fertilization", "Examples: Citrus, mango", "Adventive embryony", "Importance in hybrid seed production"]
            }
        ]
    }
};

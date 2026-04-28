import fig1_1 from '../../../../../../../assets/sexual-reproduction/terminology/fig_1_1.png';
import fig1_2 from '../../../../../../../assets/sexual-reproduction/terminology/fig_1_2.png';
import fig1_3 from '../../../../../../../assets/sexual-reproduction/terminology/fig_1_3.png';
import fig1_5 from '../../../../../../../assets/sexual-reproduction/terminology/fig_1_5.png';
import fig1_7 from '../../../../../../../assets/sexual-reproduction/terminology/fig_1_7.png';
import fig1_8 from '../../../../../../../assets/sexual-reproduction/terminology/fig_1_8.png';
import fig1_12 from '../../../../../../../assets/sexual-reproduction/terminology/fig_1_12.png';
import fig1_13 from '../../../../../../../assets/sexual-reproduction/terminology/fig_1_13.png';
import fig1_15 from '../../../../../../../assets/sexual-reproduction/terminology/fig_1_15.png';

export const TERMS = [
    {
        name: "Sexual Reproduction",
        icon: "🌸",
        color: "#db2777", // pink
        def: "The overarching process in flowering plants involving the formation of male and female gametes, their fusion (syngamy), and subsequent development into a seed (new organism).",
        examples: [
            "A mango tree producing flowers that eventually turn into mangoes with seeds inside."
        ],
        inUse: "Sexual reproduction ensures genetic variation, which is essential for the survival and evolution of angiosperms.",
        memory: "Think of it as nature's genetic lottery—combining two parents to create unique offspring.",
        image: fig1_1
    },
    {
        name: "Angiosperm",
        icon: "🌳",
        color: "#059669", // emerald
        def: "A vast and diverse group of seed-producing plants where the seeds are enclosed within a fruit. All structures like stamens, pistils, and double fertilisation are unique angiosperm features.",
        examples: [
            "Wheat, rice, tomatoes, roses, and mango trees are all angiosperms."
        ],
        inUse: "Angiosperms are the most dominant plant group on Earth today due to their highly evolved reproductive structures (flowers).",
        memory: "Angio = 'vessel/container', Sperm = 'seed'. The seeds are enclosed in a vessel (the fruit).",
        image: fig1_1
    },
    {
        name: "Flower",
        icon: "🌺",
        color: "#f43f5e", // rose
        def: "The fascinating reproductive organ of angiosperms. It is a modified shoot specifically designed to carry out sexual reproduction, containing both androecium (male) and gynoecium (female) parts.",
        examples: [
            "A hibiscus flower showing prominent petals, stamens, and a central pistil."
        ],
        inUse: "Flowers use colours, scents, and nectar to attract pollinators, ensuring the transfer of pollen.",
        memory: "The flower is the 'factory' where sexual reproduction happens.",
        image: fig1_1
    },
    {
        name: "Androecium",
        icon: "♂️",
        color: "#2563eb", // blue
        def: "The collective male reproductive organ of the flower, consisting of a whorl of stamens. Each stamen has a slender stalk (filament) and a terminal pollen-bearing anther.",
        examples: [
            "The yellow, powdery structures you see in the center of a lily are the anthers of the androecium."
        ],
        inUse: "The androecium's primary job is microsporogenesis—producing thousands of pollen grains.",
        memory: "Andro = 'male', oecium = 'house'. The 'house of males'.",
        image: fig1_2
    },
    {
        name: "Gynoecium",
        icon: "♀️",
        color: "#9333ea", // purple
        def: "The collective female reproductive organ of the flower. It consists of one or more pistils (carpels), each containing a stigma, style, and an ovary which houses the ovules.",
        examples: [
            "The central green, swollen base of a flower is the ovary of the gynoecium."
        ],
        inUse: "The gynoecium captures pollen and provides a safe environment for fertilisation and seed development.",
        memory: "Gyno = 'female'. Think of a gynecologist.",
        image: fig1_7
    },
    {
        name: "Male Gametophyte",
        icon: "✨",
        color: "#ca8a04", // yellow
        def: "The mature pollen grain. It is a microscopic, independent structure that carries the male gametes to the female reproductive organs.",
        examples: [
            "The yellow dust that sticks to your fingers when touching a sunflower is millions of male gametophytes."
        ],
        inUse: "Protected by a highly resistant outer wall called the exine (made of sporopollenin), it can survive harsh environments during transport.",
        memory: "Gametophyte literally means 'gamete-bearing plant'. The pollen grain is the tiny 'plant' that carries the male gametes.",
        image: fig1_5
    },
    {
        name: "Female Gametophyte",
        icon: "🥚",
        color: "#c026d3", // fuchsia
        def: "The embryo sac located inside the ovule. It is a 7-celled, 8-nucleate structure at maturity, containing the egg apparatus (with the egg cell), central cell, and antipodals.",
        examples: [
            "This is the microscopic 'safe room' where the egg waits for the male gametes to arrive."
        ],
        inUse: "The synergids in the female gametophyte have a filiform apparatus to guide the pollen tube directly to the egg.",
        memory: "7 cells, 8 nuclei. It's the ultimate destination for the pollen tube.",
        image: fig1_8
    },
    {
        name: "Double Fertilisation",
        icon: "✌️",
        color: "#ea580c", // orange
        def: "The unique defining event of angiosperms where two fusion events occur in the embryo sac: Syngamy (fusion of male gamete with egg to form a zygote) and Triple Fusion (fusion of another male gamete with two polar nuclei to form endosperm).",
        examples: [
            "This process ensures that the plant doesn't waste energy making endosperm (food) unless an egg is actually fertilised."
        ],
        inUse: "The zygote develops into the embryo, while the endosperm provides nourishment for the growing embryo.",
        memory: "Double = Two fusions. Syngamy + Triple Fusion.",
        image: fig1_12
    },
    {
        name: "Meiosis",
        icon: "✂️",
        color: "#0ea5e9", // sky
        def: "A specialised type of cell division that reduces the chromosome number by half. It underpins both microsporogenesis (pollen formation) and megasporogenesis (embryo sac formation).",
        examples: [
            "A diploid (2n) Microspore Mother Cell undergoes meiosis to form four haploid (n) microspores."
        ],
        inUse: "Without meiosis, there would be no haploid gametes, and sexual reproduction would result in doubled chromosomes every generation.",
        memory: "Meiosis = 'to lessen'. It halves the genetic material.",
        image: fig1_3
    },
    {
        name: "Gametes",
        icon: "🧬",
        color: "#14b8a6", // teal
        def: "The specialised haploid (n) sex cells. In angiosperms, two male gametes are delivered by the pollen tube, and one female gamete (the egg cell) resides in the embryo sac.",
        examples: [
            "The pollen tube acts like a delivery truck dropping off two male gametes right at the doorstep of the synergid."
        ],
        inUse: "The fusion of gametes (syngamy) restores the diploid (2n) state in the zygote.",
        memory: "Gametes are the 'halves' that make a 'whole' (zygote).",
        image: fig1_12
    },
    {
        name: "Ovule → Seed",
        icon: "🌱",
        color: "#84cc16", // lime
        def: "The transformation of the ovule (megasporangium) into a mature seed after successful double fertilisation.",
        examples: [
            "The hard pip inside an apple or the almond you eat was once a tiny ovule inside a flower."
        ],
        inUse: "The integuments of the ovule harden into the tough seed coat to protect the dormant embryo inside.",
        memory: "Ovule = Seed. (O.S.)",
        image: fig1_13
    },
    {
        name: "Ovary → Fruit",
        icon: "🍎",
        color: "#ef4444", // red
        def: "The transformation of the entire ovary into a fruit, triggered by fertilisation. The wall of the ovary develops into the pericarp (fruit wall).",
        examples: [
            "A juicy peach is a mature ovary. The fleshy part is the pericarp, and the hard pit contains the seed (mature ovule)."
        ],
        inUse: "Fruits protect the developing seeds and often aid in their dispersal by attracting animals to eat them.",
        memory: "Ovary = Fruit. (O.F.)",
        image: fig1_15
    }
];

export const VOCAB_QUIZ = [
    {
        question: "Which of the following structures represents the mature female gametophyte in angiosperms?",
        options: [
            "Ovule",
            "Embryo sac",
            "Pistil",
            "Endosperm"
        ],
        correct: 1,
        explanation: "The embryo sac is the 7-celled, 8-nucleate structure that functions as the mature female gametophyte."
    },
    {
        question: "What two events make up 'Double Fertilisation'?",
        options: [
            "Mitosis and Meiosis",
            "Syngamy and Triple Fusion",
            "Pollination and Germination",
            "Microsporogenesis and Megasporogenesis"
        ],
        correct: 1,
        explanation: "Double fertilisation consists of Syngamy (forming the zygote) and Triple Fusion (forming the primary endosperm nucleus)."
    },
    {
        question: "After fertilisation, what does the ovary develop into?",
        options: [
            "Seed",
            "Pollen grain",
            "Fruit",
            "Embryo"
        ],
        correct: 2,
        explanation: "The ovary ripens and transforms into the fruit, while the ovules inside become the seeds."
    },
    {
        question: "What is the collective term for the male reproductive whorl of a flower?",
        options: [
            "Gynoecium",
            "Corolla",
            "Calyx",
            "Androecium"
        ],
        correct: 3,
        explanation: "The Androecium consists of a whorl of stamens and represents the male reproductive organ."
    },
    {
        question: "Why is meiosis essential in the sexual reproduction of plants?",
        options: [
            "It produces nectar",
            "It forms the fruit wall",
            "It reduces the chromosome number to form haploid spores/gametes",
            "It helps in pollen tube growth"
        ],
        correct: 2,
        explanation: "Meiosis halves the genetic material to ensure that when gametes fuse, the normal diploid number is restored."
    }
];

import connAgri from '../../../../../../../assets/sexual-reproduction/conn_agri.png';
import connHort from '../../../../../../../assets/sexual-reproduction/conn_hort.png';
import connCons from '../../../../../../../assets/sexual-reproduction/conn_cons.png';
import connClim from '../../../../../../../assets/sexual-reproduction/conn_clim.png';

export const sexualReproductionConnectomicsData = {
    connections: [
        { 
            from: "Sexual Reproduction in Plants", 
            to: "Genetics and Evolution (Unit VII)", 
            type: "Direct", 
            icon: "🧬", 
            color: "#6366f1",
            note: "Meiosis during gametogenesis creates genetic variation, which is the foundational raw material for Mendelian genetics and evolutionary selection." 
        },
        { 
            from: "Sexual Reproduction in Plants", 
            to: "Cell Cycle & Division (Class 11)", 
            type: "Fundamental", 
            icon: "🔬", 
            color: "#0d9488",
            note: "Understanding mitosis (for embryo development) and meiosis (for micro/megasporogenesis) is crucial." 
        },
        { 
            from: "Sexual Reproduction in Plants", 
            to: "Biotechnology (Unit IX)", 
            type: "Essential", 
            icon: "🧪", 
            color: "#7c3aed",
            note: "Techniques like artificial hybridization directly manipulate the natural reproductive cycles learned here to create genetically modified crops." 
        },
        { 
            from: "Sexual Reproduction in Plants", 
            to: "Ecology (Unit X)", 
            type: "Indirect", 
            icon: "🐝", 
            color: "#f59e0b",
            note: "Plant-pollinator mutualism is a classic ecological interaction driven entirely by the plant's need for cross-pollination." 
        },
        { 
            from: "Sexual Reproduction in Plants", 
            to: "Chemistry: Biomolecules", 
            type: "Science Concept", 
            icon: "⚗️", 
            color: "#ec4899",
            note: "Pollen grains are preserved as fossils because of sporopollenin—one of the most resistant organic polymers known to biochemistry." 
        }
    ],
    realWorld: [
        {
            title: "Agriculture & Food Security",
            desc: "Without pollination and double fertilization, there would be no seeds or fruits. Global food security relies completely on understanding plant reproduction.",
            impact: "Critical",
            image: connAgri
        },
        {
            title: "Horticulture & Plant Breeding",
            desc: "Techniques like emasculation and bagging allow breeders to cross-pollinate specific traits, creating high-yield, disease-resistant crop varieties.",
            impact: "High",
            image: connHort
        },
        {
            title: "Conservation Biology",
            desc: "Understanding seed dormancy, viability, and specific pollinator requirements helps ecologists save endangered plant species from extinction.",
            impact: "Vital",
            image: connCons
        },
        {
            title: "Higher-Order Problem Solving",
            desc: "Analyzing how environmental stressors (like climate change) might decouple the timing of flowering from pollinator emergence requires deep synthesis of these mechanisms.",
            impact: "Analytical",
            image: connClim
        }
    ]
};

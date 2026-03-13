export const generateTheCellSkillsData = () => {
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
    
    // Helper to format options and return correct index
    const makeMCQ = (q, correctOpt, distractors, explanation) => {
        const allOpts = shuffle([correctOpt, ...distractors].slice(0, 4));
        const correctIdx = allOpts.indexOf(correctOpt);
        return { type: 'multiple-choice', question: q, options: allOpts, correctAnswer: correctIdx, explanation };
    };

    const s1_theory = [
        () => makeMCQ('Which scientist added the principle "Omnis cellula e cellula" to cell theory?', 'Rudolf Virchow', ['Matthias Schleiden', 'Theodor Schwann', 'Robert Hooke'], 'Virchow (1855) added this principle.'),
        () => makeMCQ('Which of the following is NOT considered an exception to cell theory?', 'Amoeba', ['Viruses', 'Mature red blood cells of humans', 'Mature sieve tube cells'], 'Amoeba is a complete unicellular eukaryote.'),
        () => makeMCQ('Who formulated the first cell theory?', 'Schleiden and Schwann', ['Anton Van Leeuwenhoek', 'Robert Hooke', 'Rudolf Virchow'], 'Matthias (Botanist) and Theodore (Zoologist) formulated it.'),
        () => makeMCQ('Who first saw and described a live cell?', 'Anton Van Leeuwenhoek', ['Robert Hooke', 'Rudolf Virchow', 'Schleiden'], 'He observed living bacteria and protozoa.'),
        () => makeMCQ('Which scientist examined plant cells to form part of the Cell Theory?', 'Schleiden', ['Schwann', 'Virchow', 'Hooke'], 'Matthias Schleiden was a botanist.'),
        () => makeMCQ('Exceptions to cell theory include:', 'Viruses', ['Bacteria', 'Fungi', 'Algae'], 'Viruses lack cellular structure.'),
        () => makeMCQ('Who discovered the nucleus?', 'Robert Brown', ['Robert Hooke', 'Rudolf Virchow', 'Anton Van Leeuwenhoek'], 'Robert Brown discovered it in 1831.'),
        () => makeMCQ('An example of the largest isolated single cell is:', 'Ostrich egg', ['Nerve cell', 'Mycoplasma', 'Human ovum'], 'The ostrich egg is the largest.'),
        () => makeMCQ('"Omnis cellula e cellula" translates to:', 'All cells arise from pre-existing cells', ['All cells have a nucleus', 'Cells are the fundamental unit', 'Cells contain DNA'], 'Proposed by Virchow.'),
        () => {
            const year = pick(['1838', '1839', '1855']);
            if (year === '1838') return makeMCQ('In 1838, who observed that all plants are composed of different kinds of cells?', 'Matthias Schleiden', ['Theodor Schwann', 'Rudolf Virchow', 'Robert Hooke'], 'Schleiden was a German botanist working in 1838.');
            if (year === '1839') return makeMCQ('In 1839, who reported that cells had a thin outer layer, today known as plasma membrane?', 'Theodor Schwann', ['Matthias Schleiden', 'Rudolf Virchow', 'Robert Hooke'], 'Schwann reported this in 1839.');
            return makeMCQ('In 1855, who explained that cells divide and new cells are formed from pre-existing cells?', 'Rudolf Virchow', ['Matthias Schleiden', 'Theodor Schwann', 'Robert Hooke'], 'Virchow proposed this in 1855.');
        },
        () => makeMCQ('Robert Hooke first observed cells in which material?', 'Cork', ['Leaves', 'Onion peel', 'Pond water'], 'He observed dead cork cells.'),
        () => makeMCQ('Which of the following lacks a nucleus at maturity?', 'Both mature mammalian RBCs and sieve tube cells', ['Only mammalian RBCs', 'Only sieve tube cells', 'Companion cells'], 'Both are classical exceptions.'),
        () => makeMCQ('Schleiden and Schwann\'s original theory failed to explain:', 'How new cells are formed', ['The chemical composition of cells', 'The presence of the nucleus', 'The existence of plant cell walls'], 'They could not explain the origin of new cells.'),
        () => makeMCQ('The term "cellulae" used by Robert Hooke refers to:', 'Small rooms or compartments', ['Living organisms', 'Nuclear structures', 'Flowing fluid'], 'He thought they looked like monk cells.'),
        () => makeMCQ('Who concluded that the presence of a cell wall is a unique character of plant cells?', 'Theodor Schwann', ['Matthias Schleiden', 'Rudolf Virchow', 'Robert Brown'], 'Although a zoologist, Schwann made this conclusion about plants.')
    ];

    const s2_proEU = [
        () => makeMCQ('The smallest self-replicating cell capable of independent existence is:', 'Mycoplasma', ['Virus', 'Bacteria', 'Amoeba'], 'Mycoplasma (PPLO) is the smallest known cell.'),
        () => makeMCQ('Which structure is found in prokaryotes but ABSENT in eukaryotes?', 'Mesosome', ['Ribosome', 'Plasma membrane', 'DNA'], 'Mesosomes are invaginations in prokaryotes.'),
        () => makeMCQ('Prokaryotic cells have which type of ribosome?', '70S', ['80S', '90S', '100S'], '70S (50S + 30S).'),
        () => makeMCQ('A specialised differentiated form of cell membrane in prokaryotes is called:', 'Mesosome', ['Lysosome', 'Nucleoid', 'Plasmid'], 'It performs respiration and secretion.'),
        () => makeMCQ('Which of these is NOT a eukaryote?', 'Bacteria', ['Protists', 'Fungi', 'Plants'], 'Bacteria are Monerans.'),
        () => makeMCQ('Which organism does NOT have a cell wall?', 'Mycoplasma', ['Cyanobacteria', 'Fungi', 'Angiosperms'], 'Mycoplasma completely lacks a cell wall.'),
        () => makeMCQ('The genetic material of a prokaryote is called:', 'Nucleoid', ['Nucleolus', 'Nucleus', 'Nucleoplasm'], 'It is naked DNA not enclosed by a membrane.'),
        () => makeMCQ('Gram staining is used to classify:', 'Bacteria', ['Viruses', 'Fungi', 'Plants'], 'Gram positive and negative based on cell envelope.'),
        () => makeMCQ('Plasmids in bacteria carry genes for:', 'Antibiotic resistance', ['Photosynthesis', 'Respiration', 'Protein folding'], 'They are extrachromosomal DNA.'),
        () => makeMCQ('Flagella in prokaryotes differ from eukaryotic flagella in:', 'Lacking a 9+2 arrangement', ['Being absent', 'Having a 9+2 arrangement', 'Being made of tubulin'], 'Prokaryotic flagella lack the 9+2 tubulin structure.'),
        () => {
            const org = pick(['Cyanobacteria', 'Bacteria', 'Archaea']);
            return makeMCQ('Which of the following describes ' + org + '?', 'Prokaryotic', ['Eukaryotic', 'Acellular', 'Multicellular eukaryote'], org + ' belongs to Monera (prokaryotes).');
        },
        () => makeMCQ('The genomic DNA of a prokaryote is typically:', 'Circular and naked', ['Linear and naked', 'Circular with histones', 'Linear with histones'], 'They lack histone proteins.'),
        () => makeMCQ('Many bacteria have a sticky protective coat outside the cell wall called:', 'Capsule or glycocalyx', ['Plasma membrane', 'Pellicle', 'Mesosome'], 'The outermost layer of the cell envelope.'),
        () => makeMCQ('Pili and fimbriae in bacteria are primarily involved in:', 'Attachment to surfaces or host tissues', ['Motility', 'Reproduction', 'Respiration'], 'They do not play a role in motility.'),
        () => makeMCQ('Which of the following is true regarding Mycoplasma? (NEET Trap)', 'They can survive without oxygen', ['They have a rigid cell wall', 'They are larger than typical bacteria', 'They possess 80S ribosomes'], 'They are facultative anaerobes and lack a cell wall.')
    ];

    const s3_membrane = [
        () => makeMCQ('The Fluid Mosaic Model of the plasma membrane was proposed by:', 'Singer and Nicolson', ['Gorter and Grendel', 'Danielli and Davson', 'Robertson'], 'Proposed in 1972.'),
        () => makeMCQ('Which component of the plasma membrane is responsible for cell recognition?', 'Glycoproteins and glycolipids', ['Cholesterol', 'Integral proteins', 'Phospholipid heads'], 'Forming the glycocalyx.'),
        () => makeMCQ('What is the main function of the plasma membrane?', 'Selective permeability', ['Protein synthesis', 'Energy production', 'Lipid synthesis'], 'It controls transport.'),
        () => makeMCQ('The quasi-fluid nature of lipids enables:', 'Lateral movement of proteins', ['Rigidity', 'Active transport', 'Osmosis'], 'Fluidity allows movement.'),
        () => makeMCQ('Active transport across a cell membrane requires:', 'ATP and moves against concentration gradient', ['No energy', 'Only a concentration gradient', 'Osmosis'], 'Active means using energy.'),
        () => makeMCQ('The most abundant lipid in the cell membrane is:', 'Phospholipid', ['Cholesterol', 'Glycolipid', 'Sphingolipid'], 'Forming the bilayer.'),
        () => makeMCQ('In the fluid mosaic model, proteins are arranged:', 'Like icebergs floating in a sea of lipids', ['In a continuous layer', 'As a rigid sheet', 'Only on the inner surface'], 'Asymmetrical and scattered.'),
        () => makeMCQ('Passive transport of water across a selectively permeable membrane is called:', 'Osmosis', ['Diffusion', 'Active transport', 'Exocytosis'], 'Osmosis handles water.'),
        () => makeMCQ('Which of the following can pass freely through the lipid bilayer?', 'Small non-polar molecules', ['Charged ions', 'Large polar molecules', 'Proteins'], 'Lipid-soluble easily cross.'),
        () => makeMCQ('Cholesterol is present in the plasma membrane of:', 'Animal cells', ['Plant cells', 'Bacterial cells', 'Fungal cells'], 'It provides stability in animals.'),
        () => {
            const ratio = pick(['Human RBC', 'Average cell']);
            if (ratio === 'Human RBC') return makeMCQ('In human RBCs, the approximate composition of the membrane is:', '52% protein and 40% lipid', ['40% protein and 52% lipid', '50% protein and 50% lipid', '60% protein and 40% lipid'], 'A classic NEET fact.');
            return makeMCQ('Integral membrane proteins are:', 'Partially or totally buried in the membrane', ['Loosely attached to the surface', 'Found only in the cytoplasm', 'Attached only to carbohydrates'], 'They span the bilayer.');
        },
        () => makeMCQ('Na+/K+ pump is an example of:', 'Active transport', ['Passive transport', 'Osmosis', 'Facilitated diffusion'], 'It requires ATP.'),
        () => makeMCQ('The fluid nature of the membrane is important for functions like:', 'All of the above (cell growth, endocytosis, division)', ['Only cell growth', 'Only endocytosis', 'Only cell division'], 'Fluidity is required for all dynamic processes.'),
        () => makeMCQ('Polar molecules cannot pass through the non-polar lipid bilayer. They require:', 'Carrier proteins', ['Cholesterol', 'Glycolipids', 'To be converted to non-polar'], 'They need facilitated diffusion via proteins.'),
        () => makeMCQ('The tail of the phospholipid molecule is:', 'Hydrophobic and non-polar', ['Hydrophilic and polar', 'Hydrophobic and polar', 'Hydrophilic and non-polar'], 'Made of saturated hydrocarbons protected from aqueous environments.')
    ];

    const s4_wall = [
        () => makeMCQ('The cell wall of bacteria is composed of:', 'Peptidoglycan (Murein)', ['Cellulose', 'Chitin', 'Silica'], 'Unique to bacteria.'),
        () => makeMCQ('Which of the following is correctly matched?', 'Plasmodesmata \u2014 cytoplasmic channels connecting adjacent plant cells', ['Tight junctions \u2014 allow ions to pass', 'Gap junctions \u2014 provide cement', 'Adhering junctions \u2014 allow cytoplasm communication'], 'It connects adjacent plant cells.'),
        () => makeMCQ('The main chemical component of a fungal cell wall is:', 'Chitin', ['Cellulose', 'Peptidoglycan', 'Pectin'], 'Fungal walls are chitin.'),
        () => makeMCQ('Algal cell walls are made of cellulose, galactans, mannans and:', 'Calcium carbonate', ['Silica', 'Magnesium sulfate', 'Iron oxide'], 'A classic NEET fact for algae.'),
        () => makeMCQ('Which structure is unique to plant cells but absent in animal cells?', 'Cell Wall', ['Mitochondria', 'Nucleoplasm', 'Ribosomes'], 'Rigid outer layer.'),
        () => makeMCQ('During ripening of a fruit, what dissolves to make it soft?', 'Middle lamella', ['Primary cell wall', 'Secondary cell wall', 'Plasma membrane'], 'Made of calcium pectate.'),
        () => makeMCQ('Mycoplasma differs from other bacteria in that it:', 'Lacks a cell wall', ['Lacks a nucleus', 'Has 80S ribosomes', 'Is photosynthetic'], 'Unique wall-less prokaryote.'),
        () => makeMCQ('The middle lamella is primarily composed of:', 'Calcium and magnesium pectates', ['Lignin', 'Cellulose', 'Suberin'], 'It acts as glue.'),
        () => makeMCQ('The primary cell wall is capable of growth and:', 'Gradually diminishes as the cell matures', ['Becomes thicker as the cell matures', 'Turns into the middle lamella', 'Is found inside the plasma membrane'], 'Secondary wall forms later.'),
        () => makeMCQ('Secondary cell walls are formed:', 'Inner to the primary wall (towards membrane)', ['Outer to the primary wall', 'Between the middle lamella and primary wall', 'Outside the middle lamella'], 'Added inside.'),
        () => makeMCQ('Which of the following organisms has a cell wall made of silica?', 'Diatoms', ['Fungi', 'Cyanobacteria', 'Dinoflagellates'], 'Diatoms have siliceous frustules.'),
        () => {
            const poly = pick(['Cellulose', 'Hemicellulose', 'Pectin']);
            return makeMCQ(poly + ' is a major component of:', 'Plant cell walls', ['Fungal cell walls', 'Bacterial cell walls', 'Animal membranes'], 'It forms the plant cell matrix.');
        },
        () => makeMCQ('Plasmodesmata are analogous to which animal cell junction?', 'Gap junctions', ['Tight junctions', 'Desmosomes', 'Adherens junctions'], 'Both allow cytoplasmic communication.'),
        () => makeMCQ('Which part of the plant cell wall is the outermost layer, formed first after division?', 'Middle lamella', ['Primary wall', 'Secondary wall', 'Tertiary wall'], 'Shared by adjacent cells.'),
        () => makeMCQ('Lignin is characteristically deposited in:', 'Secondary cell walls of woody tissues', ['Primary cell walls of leaves', 'Algal cell walls', 'Middle lamella of soft fruits'], 'Lignin provides immense rigidity.')
    ];

    const s5_endo = [
        () => makeMCQ('Which of the following is NOT a part of the endomembrane system?', 'Mitochondria', ['Endoplasmic reticulum', 'Golgi apparatus', 'Lysosomes'], 'It functions independently.'),
        () => makeMCQ('The membrane surrounding the central vacuole of a plant cell is called the:', 'Tonoplast', ['Plasma membrane', 'Unit membrane', 'Outer membrane'], 'It maintains turgidity.'),
        () => makeMCQ('Smooth Endoplasmic Reticulum (SER) is primarily involved in:', 'Lipid synthesis and detoxification', ['Protein synthesis', 'ATP production', 'Photosynthesis'], 'It lacks ribosomes.'),
        () => makeMCQ('The Golgi apparatus was discovered by:', 'Camillo Golgi', ['George Palade', 'Christian de Duve', 'Robert Brown'], 'In 1898.'),
        () => makeMCQ('Lysosomes are formed by the packaging process in the:', 'Golgi apparatus', ['Endoplasmic Reticulum', 'Mitochondria', 'Nucleus'], 'They bud off from the trans face.'),
        () => makeMCQ('Lysosomes contain enzymes optimally active at:', 'Acidic pH', ['Basic pH', 'Neutral pH', 'Any pH'], 'pH ~4.5 to 5.'),
        () => makeMCQ('If a cell is actively synthesizing secretory proteins, it will have an abundance of:', 'Rough Endoplasmic Reticulum', ['SER', 'Lysosomes', 'Vacuoles'], 'RER is studded with ribosomes.'),
        () => makeMCQ('What does the tonoplast actively pump INTO the vacuole?', 'Ions and other materials against concentration gradient', ['Water only', 'Proteins', 'Lipids'], 'Maintains high osmotic pressure inside.'),
        () => makeMCQ('Detoxification of drugs in the liver is primarily handled by the:', 'SER', ['RER', 'Golgi', 'Lysosomes'], 'Cytochrome P450 enzymes reside here.'),
        () => makeMCQ('Which face of the Golgi is also known as the convex or forming face?', 'Cis face', ['Trans face', 'Maturing face', 'Lateral face'], 'It receives vesicles from ER.'),
        () => {
            const func = pick(['synthesis of steroid hormones', 'glycosylation of proteins']);
            if (func === 'synthesis of steroid hormones') return makeMCQ('In animal cells, lipid-like steroidal hormones are synthesised in:', 'SER', ['RER', 'Golgi', 'Lysosomes'], 'A key SER function.');
            return makeMCQ('The important site of formation of glycoproteins and glycolipids is:', 'Golgi apparatus', ['RER', 'SER', 'Lysosomes'], 'Glycosylation occurs here.');
        },
        () => makeMCQ('The components of the endomembrane system are coordinated in their:', 'Functions', ['Size', 'Structure', 'Evolutionary origin'], 'They work together in a pathway.'),
        () => makeMCQ('A plant vacuole can occupy up to what percentage of the cell volume?', '90%', ['50%', '10%', '99%'], 'It is huge in mature plant cells.'),
        () => makeMCQ('Amoeba engulfs its food by a process known as phagocytosis. The food vacuole thus formed fuses with:', 'Lysosomes', ['Mitochondria', 'Golgi', 'RER'], 'To digest the food.'),
        () => makeMCQ('The RER is frequently observed in cells actively involved in:', 'Protein synthesis and secretion', ['Lipid synthesis', 'ATP production', 'Cell division'], 'Due to attached ribosomes.')
    ];

    const s6_organelles = [
        () => makeMCQ('Which type of plastid is responsible for storing starch?', 'Amyloplast', ['Chloroplast', 'Chromoplast', 'Elaioplast'], 'Amyloplasts = starch.'),
        () => makeMCQ('The microtubule arrangement in cilia and flagella is:', '9+2', ['9+0', '9+1', '8+2'], '9 peripheral doublets + 2 central singlets.'),
        () => makeMCQ('Which of the following have 70S ribosomes?', 'Mitochondria and Chloroplasts', ['Nucleus and Mitochondria', 'Lysosomes and Chloroplasts', 'Golgi and Mitochondria'], 'Semi-autonomous organelles.'),
        () => makeMCQ('Microtubules are absent in:', 'Microfilaments', ['Cilia', 'Flagella', 'Spindle fibres'], 'Microfilaments are actin, not tubulin.'),
        () => makeMCQ('Which organelle is known as the powerhouse of the cell?', 'Mitochondria', ['Nucleus', 'Chloroplast', 'Golgi'], 'Produces ATP.'),
        () => makeMCQ('Mitochondria are NOT part of the endomembrane system because:', 'Their functions are not coordinated with it', ['They lack a membrane', 'They are found only in animals', 'They divide by binary fission'], 'They operate independently.'),
        () => makeMCQ('Which organelles are correctly classified as semi-autonomous?', 'Mitochondria and Chloroplasts', ['Mitochondria and Golgi', 'Lysosomes and Vacuoles', 'Nucleus and Mitochondria'], 'They have their own DNA & ribosomes.'),
        () => makeMCQ('During ripening of a tomato, which plastid conversion occurs?', 'Chloroplast \u2192 Chromoplast', ['Leucoplast \u2192 Chloroplast', 'Chromoplast \u2192 Chloroplast', 'Chloroplast \u2192 Amyloplast'], 'Green fades, red lycopene accumulates.'),
        () => makeMCQ('Centrioles have a microtubule organization of:', '9+0', ['9+2', '9+1', 'Variable'], '9 triplets, zero in the center.'),
        () => makeMCQ('Aleuroplasts store which type of nutrient?', 'Proteins', ['Starch', 'Oils and fats', 'Water'], 'Aleuro = protein.'),
        () => {
            const structure = pick(['Inner mitochondrial membrane', 'Thylakoids']);
            if (structure === 'Inner mitochondrial membrane') return makeMCQ('Cristae are infoldings of the:', 'Inner mitochondrial membrane', ['Outer mitochondrial membrane', 'Stroma', 'Chloroplast membrane'], 'Increase SA for ATP production.');
            return makeMCQ('Grana are stacks of:', 'Thylakoids', ['Cristae', 'Cisternae', 'Stroma lamellae'], 'Found in chloroplasts.');
        },
        () => makeMCQ('George Palade observed which organelle under the electron microscope in 1953?', 'Ribosomes', ['Mitochondria', 'Golgi', 'Lysosomes'], 'Dense particles of RNA and protein.'),
        () => makeMCQ('The central part of the proximal region of the centriole is proteinaceous and called the:', 'Hub', ['Spoke', 'Axoneme', 'Shaft'], 'Connects to triplets via radial spokes.'),
        () => makeMCQ('The eukaryotic 80S ribosome consists of two subunits:', '60S and 40S', ['50S and 30S', '40S and 40S', '60S and 20S'], 'Math does not add up directly.'),
        () => makeMCQ('Which portion of the cytoskeleton is responsible for muscular contraction and cleavage furrow formation?', 'Microfilaments (Actin)', ['Microtubules', 'Intermediate filaments', 'Keratin'], 'Actin handles dynamic movement.')
    ];

    const s7_nucleus = [
        () => makeMCQ('The unit of chromatin (nucleosome) is composed of approximately:', '~200 bp of DNA with an octamer of histones', ['100 bp of DNA around 8 histones', '50 bp of DNA with H1 histone', '400 bp of DNA wrapped around 4 histones'], 'The standard nucleosome wrap.'),
        () => makeMCQ('The nucleolus is the primary site of synthesis of:', 'rRNA', ['mRNA', 'tRNA', 'DNA'], 'Ribosome factory.'),
        () => makeMCQ('Which histone is NOT part of the histone octamer core?', 'H1', ['H2A', 'H3', 'H4'], 'H1 acts as the sealing/linker histone.'),
        () => makeMCQ('Euchromatin, compared to heterochromatin, is:', 'Loosely packed and transcriptionally active', ['More tightly coiled and inactive', 'Located exclusively outside the nucleus', 'Associated only with RNA'], 'Lightly stained, active DNA.'),
        () => makeMCQ('Every chromosome has a primary constriction called the:', 'Centromere', ['Telomere', 'Kinetochore', 'Satellite'], 'Holds sister chromatids.'),
        () => makeMCQ('Where does active ribosomal RNA (rRNA) synthesis take place?', 'Nucleolus', ['Nuclear pore', 'Nucleoplasm', 'SER'], 'Inside the nucleus.'),
        () => makeMCQ('During cell division, chromatin condenses to form:', 'Chromosomes', ['Nucleoli', 'Centrioles', 'Spindle fibers'], 'Distinct thread-like bodies.'),
        () => makeMCQ('What is the function of the nuclear pores?', 'To allow bidirectional passage of RNA and proteins', ['To let DNA out', 'For lipid synthesis', 'Energy transfer'], 'Nuclear transport.'),
        () => makeMCQ('Which scientist first described the material of the nucleus as chromatin?', 'Walther Flemming', ['Robert Brown', 'George Palade', 'Camillo Golgi'], 'He named it because it took up basic dyes.'),
        () => makeMCQ('A chromosome with a centromere situated close to its end is called:', 'Acrocentric', ['Metacentric', 'Sub-metacentric', 'Telocentric'], 'Almost at the end.'),
        () => {
            const type = pick(['Telocentric', 'Metacentric', 'Sub-metacentric']);
            if (type === 'Telocentric') return makeMCQ('A chromosome with the centromere at the extreme tip is:', 'Telocentric', ['Acrocentric', 'Metacentric', 'Sub-metacentric'], 'Terminal centromere.');
            if (type === 'Metacentric') return makeMCQ('A chromosome with a centromere exactly in the middle is:', 'Metacentric', ['Acrocentric', 'Telocentric', 'Sub-metacentric'], 'Two equal arms.');
            return makeMCQ('A chromosome with a centromere slightly away from the middle is:', 'Sub-metacentric', ['Acrocentric', 'Metacentric', 'Telocentric'], 'One shorter and one longer arm.');
        },
        () => makeMCQ('The space between the two membranes of the nuclear envelope is called the:', 'Perinuclear space', ['Nucleoid region', 'Nucleoplasm', 'Cisterna'], 'Forms a barrier between nucleus and cytoplasm.'),
        () => makeMCQ('Disc-shaped structures present on the sides of the centromere to which spindle fibers attach are:', 'Kinetochores', ['Satellites', 'Centrioles', 'Nucleosomes'], 'Protein anchors for microtubules.'),
        () => makeMCQ('Non-staining secondary constrictions on a chromosome give the appearance of a small fragment called a:', 'Satellite', ['Telomere', 'Centromere', 'Kinetochore'], 'Found at constant locations in specific chromosomes.'),
        () => makeMCQ('The outer membrane of the nucleus is usually continuous with:', 'The Endoplasmic Reticulum', ['The Golgi Apparatus', 'The Plasma Membrane', 'The Mitochondria'], 'Often bears ribosomes.')
    ];

    const s8_compare = [
        () => makeMCQ('Which of the following is found in plant cells but NOT in animal cells?', 'Plastids', ['Mitochondria', 'Ribosomes', 'Golgi apparatus'], 'Chloroplasts, etc.'),
        () => makeMCQ('Dictyosomes are structures found in plant cells equivalent to the _____ in animal cells.', 'Golgi apparatus', ['Lysosomes', 'Centrosome', 'Mitochondria'], 'Unconnected Golgi stacks in plants.'),
        () => makeMCQ('Which features are common to BOTH prokaryotic and eukaryotic cells?', 'Plasma membrane, ribosomes, and DNA', ['Nuclear membrane and mitochondria', 'Golgi apparatus and ER', 'Cytoskeleton and nucleus'], 'Universal features of life.'),
        () => makeMCQ('Read the statements: I. All eukaryotes lack a cell wall. II. Cyanobacteria are prokaryotes. III. Peroxisomes are endomembrane members. Correct?', 'Only II is true', ['I and II', 'II and III', 'I, II, and III'], 'Plants have walls; peroxisomes are independent.'),
        () => makeMCQ('Which cell shape is characteristic of human red blood cells?', 'Round and biconcave', ['Long and narrow', 'Amoeboid', 'Branched'], 'For maximizing surface area.'),
        () => makeMCQ('Which organelle is large and centrally located in a typical plant cell but small/absent in an animal cell?', 'Vacuole', ['Nucleus', 'Mitochondria', 'Golgi apparatus'], 'Central vacuole takes up to 90%.'),
        () => makeMCQ('Which of the following cells typically lack centrioles?', 'Higher plant cells', ['Animal cells', 'Fungal cells', 'Protozoa'], 'Angiosperms lack them.'),
        () => makeMCQ('Cholesterol is a major component of the cell membrane in:', 'Animal cells', ['Plant cells', 'Bacteria', 'Fungi'], 'Plants use other sterols.'),
        () => makeMCQ('In a plant cell, the nucleus is typically located:', 'Peripherally', ['Centrally', 'Inside the vacuole', 'Outside the plasma membrane'], 'Pushed aside by the huge vacuole.'),
        () => makeMCQ('Lysosomes are rare or absent in:', 'Plant cells', ['Animal cells', 'Amoeba', 'Macrophages'], 'Plant vacuoles often take over their role.'),
        () => {
            const org = pick(['Nerve cell', 'Tracheid']);
            if (org === 'Nerve cell') return makeMCQ('Which of these is the longest cell type in animals?', 'Nerve cell', ['Muscle cell', 'RBC', 'WBC'], 'Can be over a meter long.');
            return makeMCQ('In plants, elongated cells with thick lignified walls used for water transport are:', 'Tracheids', ['Mesophyll cells', 'Guard cells', 'Companion cells'], 'Elongated tube-like cells.');
        },
        () => makeMCQ('Plasmodesmata are found exclusively in:', 'Plant cells', ['Animal cells', 'Bacterial cells', 'Mycoplasma'], 'Connecting adjacent plant cell walls.'),
        () => makeMCQ('Gap junctions in animal cells serve a similar functional role to what structure in plant cells?', 'Plasmodesmata', ['Cell wall', 'Middle lamella', 'Desmosomes'], 'Both allow intercellular communication.'),
        () => makeMCQ('A major difference between bacterial and plant cell walls is the presence of:', 'Peptidoglycan in bacteria vs Cellulose in plants', ['Chitin in bacteria vs Cellulose in plants', 'Cellulose in bacteria vs Pectin in plants', 'Lipids in bacteria vs Proteins in plants'], 'Chemical composition differs entirely.'),
        () => makeMCQ('Which of the following organisms represents a complete single eukaryotic cell?', 'Amoeba', ['Mycoplasma', 'Cyanobacteria', 'Virus'], 'It is a unicellular eukaryote (Protist).')
    ];

    const generateSet = (generatorArray, count) => {
        let selected = [];
        let attempts = 0;
        while(selected.length < count && attempts < 100) {
            const q = pick(generatorArray)();
            if (!selected.some(existing => existing.question === q.question)) {
                selected.push(q);
            }
            attempts++;
        }
        return selected;
    };

    return [
        {
            id: 'cell-theory',
            title: 'Cell Theory',
            desc: 'The foundations of life: Hooke, Leeuwenhoek, Schleiden, Schwann, and Virchow.',
            color: '#3b82f6',
            icon: '🏛️',
            learnSections: [
                {
                    heading: 'Discovery Timeline',
                    content: "<strong>1665: Robert Hooke \u2014 First observation of cells</strong>\nObserved <strong>dead cork cells</strong> under a compound microscope. Named them <em>cellulae</em> (Latin for small rooms). He did <strong>not</strong> propose cell theory \u2014 only coined the word \"cell.\"\n\n<strong>~1670s: Antonie van Leeuwenhoek \u2014 First living cells</strong>\nFirst to observe <strong>living, free cells</strong> \u2014 bacteria (he called them \"animalcules\") and protozoa \u2014 using a simple (single-lens) microscope he built himself.\n\n<strong>1838: Matthias Schleiden \u2014 Plant cells</strong>\n<strong>Botanist.</strong> Concluded that all plants are composed of cells and products of cells. First statement of cell theory (plants).\n\n<strong>1839: Theodor Schwann \u2014 Animal cells</strong>\n<strong>Zoologist.</strong> Extended Schleiden's observation to animals. Formulated the original two-principle cell theory: <strong>(1)</strong> all organisms are made of cells; <strong>(2)</strong> the cell is the basic structural unit of life.\n\n<strong>1855: Rudolf Virchow \u2014 Cells from pre-existing cells</strong>\n<strong>Pathologist.</strong> Proposed <em>\"Omnis cellula e cellula\"</em> \u2014 every cell arises from a pre-existing cell. This is the <strong>third and most critical</strong> addition to cell theory.",
                    keyLabel: 'neet-trap',
                    example: "<strong>Exceptions to Cell Theory \u2014 Direct NEET Questions</strong>\n<strong>Viruses</strong> are not made of cells (they are nucleoprotein particles) \u2014 they cannot replicate independently. They are the most cited exception.\n\n<strong>Mature RBCs (human):</strong> no nucleus. <strong>Mature sieve tube cells:</strong> no nucleus at maturity. <strong>Platelets:</strong> cell fragments, not whole cells."
                }
            ],
            practice: generateSet(s1_theory, 15),
            assessment: generateSet(s1_theory, 15)
        },
        {
            id: 'prokaryote-eukaryote',
            title: 'Prokaryotic vs Eukaryotic',
            desc: 'The fundamental classification. Core features and the Mycoplasma trap.',
            color: '#10b981',
            icon: '🦠',
            learnSections: [
                {
                    heading: 'Prokaryotic Cell',
                    content: "Most ancient cells (~3.5 billion years). No membrane-bound nucleus \u2014 genetic material is in an irregular, non-membrane-bound region called the <strong>nucleoid</strong>.\n\n<strong>Examples:</strong> Bacteria (Eubacteria), Archaea, Cyanobacteria (blue-green algae), <em>Mycoplasma</em>",
                    keyLabel: 'neet-trap',
                    example: "<strong>Mycoplasma \u2014 The Smallest Cell</strong>\n<strong>Mycoplasma</strong> (PPLO \u2014 Pleuropneumonia-Like Organism) is the <strong>smallest cell capable of independent existence</strong>. It has <strong>NO cell wall</strong> \u2192 pleomorphic (no fixed shape). Passes through bacteria-retaining filters. Size: ~0.1\u20130.3 \u00b5m."
                },
                {
                    heading: 'Full Comparison Table',
                    content: "Eukaryotes are defined by a membrane-bound nucleus and compartmentalised organelles.",
                    table: {
                        headers: ['Feature', 'Prokaryote', 'Eukaryote'],
                        rows: [
                            ['<strong>Size</strong>', '1\u201310 \u00b5m', '10\u2013100 \u00b5m'],
                            ['<strong>Nuclear envelope</strong>', 'Absent (nucleoid)', 'Present'],
                            ['<strong>DNA type</strong>', 'Circular, naked, no histones', 'Linear, multiple chromosomes, with histones'],
                            ['<strong>Plasmids</strong>', 'Present', 'Absent (except yeast)'],
                            ['<strong>Ribosomes</strong>', '70S (50S + 30S)', '80S cytoplasm; 70S in mitochondria/chloroplast'],
                            ['<strong>Cell wall</strong>', 'Peptidoglycan (bacteria); absent in Mycoplasma', 'Cellulose (plants); chitin (fungi); absent (animals)'],
                            ['<strong>Membrane organelles</strong>', 'Absent', 'Present'],
                            ['<strong>Mesosome</strong>', 'Present', 'Absent'],
                            ['<strong>Division</strong>', 'Binary fission', 'Mitosis / Meiosis']
                        ]
                    },
                    keyLabel: 'misconception',
                    example: "<strong>The 70S Trap</strong>\nMitochondria and chloroplasts have <strong>70S ribosomes</strong> \u2014 same as prokaryotes, NOT 80S. This supports the endosymbiotic theory of organelle evolution."
                }
            ],
            practice: generateSet(s2_proEU, 15),
            assessment: generateSet(s2_proEU, 15)
        },
        {
            id: 'cell-membrane',
            title: 'Cell Membrane',
            desc: 'The selectively permeable boundary. Fluid Mosaic Model and transport.',
            color: '#f59e0b',
            icon: '🚧',
            learnSections: [
                {
                    heading: 'Fluid Mosaic Model (1972)',
                    content: "Proposed by <strong>Singer & Nicolson</strong>. Proteins are embedded like a mosaic in a fluid lipid bilayer.\n\n<strong>Phospholipid Bilayer:</strong> Two sheets of phospholipids. Each has a hydrophilic head and a hydrophobic tail. In animal cells, cholesterol is present between phospholipids.\n\n<strong>Proteins:</strong>\n- <strong>Integral:</strong> span the full lipid bilayer; function as channels.\n- <strong>Peripheral:</strong> loosely attached; involved in structural support.",
                    keyLabel: 'neet-trap',
                    example: "<strong>Cholesterol NEET Trap</strong>\nCholesterol is present in <strong>animal cell membranes</strong>. Absent in <strong>plant cell membranes</strong> and most prokaryotic membranes. Exception: <strong>Mycoplasma</strong> \u2014 a prokaryote that has sterols in its membrane despite lacking a cell wall."
                },
                {
                    heading: 'Membrane Transport',
                    content: "<strong>Passive (no ATP):</strong> Simple diffusion (O\u2082, CO\u2082). Facilitated diffusion (polar molecules move via protein channels).\n\n<strong>Active (requires ATP):</strong> Against concentration gradient. Example: Na\u207a/K\u207a ATPase pump (3 Na\u207a out, 2 K\u207a in).\n\n<strong>Osmosis:</strong> Movement of water through a semipermeable membrane.",
                    keyLabel: 'key-fact',
                    example: "<strong>Glycocalyx:</strong> Carbohydrate chains attached to proteins (glycoproteins) or lipids (glycolipids) exclusively on the extracellular face. Responsible for cell recognition (e.g., ABO blood groups)."
                }
            ],
            practice: generateSet(s3_membrane, 15),
            assessment: generateSet(s3_membrane, 15)
        },
        {
            id: 'cell-wall',
            title: 'Cell Wall',
            desc: 'Provides rigidity and shape. Composition across differing organisms.',
            color: '#0d9488',
            icon: '🧱',
            learnSections: [
                {
                    heading: 'Cell Wall Composition by Organism',
                    content: "Present in plants, fungi, and most bacteria. Absent in animal cells.",
                    table: {
                        headers: ['Organism', 'Composition'],
                        rows: [
                            ['<strong>Bacteria</strong>', 'Peptidoglycan (murein)'],
                            ['<strong>Cyanobacteria</strong>', 'Cellulose, pectin + amino acids'],
                            ['<strong>Fungi</strong>', 'Chitin (N-acetylglucosamine)'],
                            ['<strong>Diatoms (algae)</strong>', 'Silica (SiO\u2082)'],
                            ['<strong>Higher plants</strong>', 'Cellulose, hemicellulose, pectin (primary); + lignin (secondary)'],
                            ['<strong>Mycoplasma</strong>', '<strong>No cell wall</strong>']
                        ]
                    },
                    keyLabel: 'neet-note',
                    example: "<strong>Plasmodesmata:</strong> Cytoplasmic strands that traverse the cell wall, connecting the cytoplasm of adjacent plant cells. They allow direct cell-to-cell communication (analogous to gap junctions in animals)."
                },
                {
                    heading: 'Plant Cell Wall Layers',
                    content: "- <strong>Middle Lamella:</strong> Outermost; shared between adjacent cells. Made of calcium/magnesium pectates (cements cells together).\n- <strong>Primary Wall:</strong> Thin, flexible; allows expansion in young cells.\n- <strong>Secondary Wall:</strong> Innermost layer (when present). Contains lignin; mature cells (waterproof and rigid).",
                    keyLabel: 'key-fact',
                    example: "The middle lamella dissolves during fruit ripening, which makes the fruit soft."
                }
            ],
            practice: generateSet(s4_wall, 15),
            assessment: generateSet(s4_wall, 15)
        },
        {
            id: 'endomembrane-system',
            title: 'Endomembrane System',
            desc: 'The internal transport network: ER, Golgi, Lysosomes, and Vacuoles.',
            color: '#7c3aed',
            icon: '📦',
            learnSections: [
                {
                    heading: 'Members vs Non-Members',
                    content: "A network of interconnected membrane-bound compartments that function together to synthesise, process, package, and transport proteins and lipids.\n\n<strong>Members:</strong>\n- Endoplasmic Reticulum (ER)\n- Golgi Apparatus\n- Lysosomes\n- Vacuoles",
                    keyLabel: 'neet-trap',
                    example: "<strong>NOT members:</strong> Mitochondria, Chloroplasts, and Peroxisomes \u2014 these have independent membrane origins and do not interact with the ER\u2013Golgi secretory pathway."
                },
                {
                    heading: 'System Components',
                    content: "<strong>ER:</strong> RER (with ribosomes) synthesises/folds proteins. SER synthesises lipids and detoxifies drugs.\n\n<strong>Golgi:</strong> Discovered by Camillo Golgi. cis face (receives) and trans face (dispatches). Functions: Glycosylation, packaging, lysosome and acrosome formation.\n\n<strong>Lysosomes:</strong> Formed by Golgi. Contain acid hydrolases (pH ~4.5\u20135).\n\n<strong>Vacuoles:</strong> Plant central vacuole occupies up to 90% volume. Bounded by <strong>tonoplast</strong>, maintaining turgor.",
                    keyLabel: 'key-fact',
                    example: "<strong>Lysosomes = Suicide Bags:</strong> They can autodigest the cell under stress (autolysis) using their hydrolytic enzymes."
                }
            ],
            practice: generateSet(s5_endo, 15),
            assessment: generateSet(s5_endo, 15)
        },
        {
            id: 'organelles',
            title: 'Cell Organelles',
            desc: 'Mitochondria, Plastids, Ribosomes, and the Cytoskeleton.',
            color: '#ec4899',
            icon: '⚙️',
            learnSections: [
                {
                    heading: 'Mitochondria & Plastids',
                    content: "<strong>Mitochondria:</strong> Double membrane. Inner membrane folded into <strong>cristae</strong> (increases surface area for ATP). Matrix contains circular DNA and <strong>70S ribosomes</strong>.\n\n<strong>Plastids (Plants only):</strong>\n- <strong>Chloroplasts (green):</strong> Thylakoids stacked into grana. Has 70S ribosomes.\n- <strong>Chromoplasts (coloured):</strong> Carotenoids (red, yellow, orange).\n- <strong>Leucoplasts (colourless):</strong> Store starch (amyloplast), oil (elaioplast), protein (aleuroplast).",
                    keyLabel: 'misconception',
                    example: "<strong>Semi-Autonomous Organelles:</strong> Mitochondria and chloroplasts are semi-autonomous because they have their own circular DNA and 70S ribosomes, meaning they can synthesise some of their own proteins."
                },
                {
                    heading: 'Ribosomes & Centrosomes',
                    content: "<strong>Ribosomes:</strong> Non-membrane bound. 70S in prokaryotes, 80S in eukaryote cytoplasm.\n\n<strong>Centrosome:</strong> Animal cells only. Contains two <strong>centrioles</strong>. \n\n<strong>Cilia/Flagella:</strong> 9+2 microtubule arrangement. Motor protein: dynein.\n\n<strong>Cytoskeleton:</strong> Microfilaments (actin), Intermediate filaments, Microtubules (tubulin).",
                    keyLabel: 'neet-trap',
                    example: "<strong>9+2 vs 9+0 Trap:</strong>\nCilia and flagella have a <strong>9+2</strong> microtubule arrangement (9 peripheral doublets, 2 central singlets).\nCentrioles and basal bodies have a <strong>9+0</strong> arrangement (9 peripheral triplets, NO central pair)."
                }
            ],
            practice: generateSet(s6_organelles, 15),
            assessment: generateSet(s6_organelles, 15)
        },
        {
            id: 'nucleus',
            title: 'The Nucleus',
            desc: 'The control centre. Chromatin, nucleosomes, and the nucleolus.',
            color: '#8b5cf6',
            icon: '🧩',
            learnSections: [
                {
                    heading: 'Nuclear Structure',
                    content: "<strong>Nuclear Envelope:</strong> Double-membrane barrier with nuclear pores (~10 nm) allowing selective transport.\n\n<strong>Nucleolus:</strong> Not membrane-bound. Site of <strong>rRNA synthesis</strong> (ribosome factory). Disappears during cell division.\n\n<strong>Chromatin:</strong> DNA + histone proteins.\n- <strong>Euchromatin:</strong> loosely packed \u2192 transcriptionally active.\n- <strong>Heterochromatin:</strong> tightly coiled \u2192 transcriptionally inactive (e.g. Barr body).",
                    keyLabel: 'key-fact',
                    example: "<strong>Barr Body:</strong> In mammalian females (XX), one X chromosome is permanently inactivated and exists as a dense heterochromatic Barr body."
                },
                {
                    heading: 'The Nucleosome',
                    content: "The fundamental unit of chromatin. Appears as \"beads on a string\" under electron microscopy.\n\n<strong>Components:</strong>\n- <strong>Histone octamer:</strong> 2\u00d7 H2A + 2\u00d7 H2B + 2\u00d7 H3 + 2\u00d7 H4 = 8 proteins.\n- <strong>DNA:</strong> ~200 bp wrapped around the octamer (1.65\u20132 turns).",
                    keyLabel: 'neet-trap',
                    example: "<strong>The H1 Histone Trap</strong>\n<strong>H1 is NOT part of the octamer.</strong> It is the linker/sealing histone that sits outside the core. Histones are basic proteins (rich in lysine and arginine) that bind negatively charged DNA."
                }
            ],
            practice: generateSet(s7_nucleus, 15),
            assessment: generateSet(s7_nucleus, 15)
        },
        {
            id: 'plant-vs-animal',
            title: 'Plant vs Animal Cell',
            desc: 'The master comparison. Differences in organelle distribution.',
            color: '#14b8a6',
            icon: '🌿',
            learnSections: [
                {
                    heading: 'Master Comparison',
                    content: "One of the most reliably tested comparison tables in NEET Biology.",
                    table: {
                        headers: ['Feature', 'Plant Cell', 'Animal Cell'],
                        rows: [
                            ['<strong>Cell wall</strong>', '✅ Present', '❌ Absent'],
                            ['<strong>Plastids</strong>', '✅ Present', '❌ Absent'],
                            ['<strong>Large central vacuole</strong>', '✅ Present (tonoplast)', '❌ Absent (only small ones)'],
                            ['<strong>Centrioles</strong>', '❌ Absent (in higher plants)', '✅ Present'],
                            ['<strong>Lysosomes</strong>', 'Rare / Absent', '✅ Prominent'],
                            ['<strong>Plasmodesmata</strong>', '✅ Present', '❌ Absent (gap junctions instead)'],
                            ['<strong>Golgi apparatus</strong>', '✅ Individual <strong>dictyosomes</strong>', '✅ Stacked complex'],
                            ['<strong>Nucleus position</strong>', 'Peripheral', 'Central'],
                            ['<strong>Cholesterol in membrane</strong>', 'Absent', 'Present']
                        ]
                    },
                    keyLabel: 'neet-trap',
                    example: "<strong>Classic Traps:</strong>\n<strong>1. Centrioles:</strong> \"Higher plants\" (angiosperms) have NO centrioles, but lower plants (algae, bryophytes) DO.\n<strong>2. Golgi in plants:</strong> Dispersed as individual units called <strong>dictyosomes</strong>."
                }
            ],
            practice: generateSet(s8_compare, 15),
            assessment: generateSet(s8_compare, 15)
        }
    ];
};

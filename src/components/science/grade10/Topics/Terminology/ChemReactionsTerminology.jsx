import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../ChemicalReactionsDashboard.module.css';

const TERMS = [
    {
        icon: '⚗️',
        name: 'Chemical Reaction',
        color: '#f97316',
        def: 'A process in which reactants are converted into products with entirely different chemical properties.',
        examples: 'Fe + CuSO₄ → FeSO₄ + Cu      (Copper displaced by Iron)',
        inUse: '"The chemical reaction between zinc and sulphuric acid releases hydrogen gas."',
        memory: '🧠 Think: CHANGE with new substances = Chemical Reaction',
    },
    {
        icon: '🧪',
        name: 'Reactant',
        color: '#38bdf8',
        def: 'The starting substance(s) that undergo change in a chemical reaction. Found on the LEFT side of the equation.',
        examples: 'Mg + O₂ → MgO   (Mg and O₂ are reactants)',
        inUse: '"Magnesium and oxygen are the reactants in the combustion equation."',
        memory: '🧠 RE-acts = it\'s the one that acts first (left side)',
    },
    {
        icon: '✨',
        name: 'Product',
        color: '#a3e635',
        def: 'New substance(s) formed after a chemical reaction. Found on the RIGHT side of the equation.',
        examples: 'Zn + 2HCl → ZnCl₂ + H₂   (ZnCl₂ and H₂ are products)',
        inUse: '"The product of photosynthesis is glucose and oxygen."',
        memory: '🧠 PROduced = the result; always on the right',
    },
    {
        icon: '⚖️',
        name: 'Balanced Equation',
        color: '#818cf8',
        def: 'A chemical equation where the number of atoms of each element is equal on both sides, following the Law of Conservation of Mass.',
        examples: '2H₂ + O₂ → 2H₂O   (4H, 2O = 4H, 2O ✓)',
        inUse: '"A balanced equation ensures no atoms are gained or lost in the reaction."',
        memory: '🧠 Balance = both sides of a scale equal',
    },
    {
        icon: '🔥',
        name: 'Exothermic',
        color: '#ef4444',
        def: 'A reaction that releases heat energy to the surroundings. Temperature of surroundings increases.',
        examples: 'CH₄ + 2O₂ → CO₂ + 2H₂O + Heat   (burning methane)',
        inUse: '"Respiration is an exothermic reaction — it releases energy to keep us alive."',
        memory: '🧠 EXO = exits; heat exits the system',
    },
    {
        icon: '❄️',
        name: 'Endothermic',
        color: '#22d3ee',
        def: 'A reaction that absorbs heat energy from the surroundings. Temperature of surroundings decreases.',
        examples: 'C + H₂O → CO + H₂   (water gas reaction needs heat)',
        inUse: '"Photosynthesis is endothermic — plants absorb sunlight to make food."',
        memory: '🧠 ENDO = enters; heat enters the system',
    },
    {
        icon: '🌊',
        name: 'Precipitate',
        color: '#f59e0b',
        def: 'An insoluble solid formed when two solutions react. It appears as a suspension or settles at the bottom.',
        examples: 'Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl   (↓ = precipitate)',
        inUse: '"A white precipitate of BaSO₄ formed when barium chloride was added."',
        memory: '🧠 Pre-CIPITATE = drops down (↓)',
    },
    {
        icon: '📉',
        name: 'Oxidation',
        color: '#d946ef',
        def: 'A reaction where a substance gains oxygen or loses hydrogen (or loses electrons in advanced chemistry).',
        examples: '2Mg + O₂ → 2MgO   (Mg gains O₂ → Mg is oxidised)',
        inUse: '"Iron is oxidised when it rusts — Fe₂O₃ is the rust formed."',
        memory: '🧠 OIL RIG: Oxidation Is Loss, Reduction Is Gain',
    },
    {
        icon: '📈',
        name: 'Reduction',
        color: '#14b8a6',
        def: 'A reaction where a substance loses oxygen or gains hydrogen (or gains electrons). Opposite of oxidation.',
        examples: 'CuO + H₂ → Cu + H₂O   (CuO loses O → CuO is reduced)',
        inUse: '"In the thermite reaction, iron oxide is reduced to iron."',
        memory: '🧠 OIL RIG: Reduction Is Gain (of electrons/hydrogen)',
    },
    {
        icon: '💧',
        name: 'Corrosion',
        color: '#8b5cf6',
        def: 'Slow deterioration of metals by reaction with moisture, air, or chemicals. Rusting is corrosion of iron.',
        examples: '4Fe + 3O₂ + xH₂O → 2Fe₂O₃·xH₂O   (rusting)',
        inUse: '"Painting metal prevents corrosion by blocking contact with moisture and air."',
        memory: '🧠 CORROSion = CORROdes the metal surface',
    },
];

const COOL_REACTIONS = [
    { emoji: '🔥', title: 'Burning Magnesium', eq: '2Mg + O₂ → 2MgO', desc: 'Dazzling white flame' },
    { emoji: '🌿', title: 'Photosynthesis', eq: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', desc: 'Plants make food' },
    { emoji: '💨', title: 'Zinc + Acid', eq: 'Zn + 2HCl → ZnCl₂ + H₂↑', desc: 'Hydrogen gas evolves' },
    { emoji: '🫁', title: 'Respiration', eq: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', desc: 'Powers your body' },
    { emoji: '🟫', title: 'Rusting', eq: '4Fe + 3O₂ + xH₂O → 2Fe₂O₃·xH₂O', desc: 'Slow corrosion' },
    { emoji: '🤍', title: 'Precipitation', eq: 'Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl', desc: 'White solid forms' },
    { emoji: '🧱', title: 'Decomposition', eq: 'CaCO₃ → CaO + CO₂', desc: 'Limestone heated' },
    { emoji: '⚡', title: 'Electrolysis', eq: '2H₂O → 2H₂ + O₂', desc: 'Water splits' },
];

export default function ChemReactionsTerminology() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`${styles.chemRoot} ${styles.chemPage}`}>
            <nav className={styles.chemNav}>
                <button className={styles.chemNavBack} onClick={() => navigate('/senior/grade/10/science/chemical-reactions')}>
                    ← Dashboard
                </button>
                <div className={styles.chemNavLinks}>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/introduction')}>🌟 Intro</button>
                    <button className={`${styles.chemNavLink} ${styles.chemNavLinkActive}`}>📖 Terminology</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/skills')}>🧪 Skills</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/connectomics')}>🔗 Connectomics</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/exam-edge')}>🏆 Exam Edge</button>
                </div>
            </nav>

            <div className={styles.chemHero}>
                <h1 className={styles.chemHeroTitle}>
                    The Language of <span className={styles.chemTitleAccent}>Chemistry</span>
                </h1>
                <p className={styles.chemHeroSub}>10 core terms with examples, memory tips, and real usage.</p>
            </div>

            <div className={styles.chemShell}>
                {/* Terminology Grid */}
                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>Key Terminology</div>
                    <div className={styles.chemTermsGrid}>
                        {TERMS.map((t, idx) => (
                            <div key={idx} className={styles.chemTermCard}>
                                <div
                                    className={styles.chemTermHeader}
                                    style={{ borderLeftColor: t.color }}
                                >
                                    <div className={styles.chemTermIcon}>{t.icon}</div>
                                    <div className={styles.chemTermName} style={{ color: t.color }}>
                                        {t.name}
                                    </div>
                                </div>
                                <p className={styles.chemTermDef}>{t.def}</p>
                                <div className={styles.chemTermExamples}>{t.examples}</div>
                                <p className={styles.chemTermInUse}>{t.inUse}</p>
                                <div className={styles.chemTermMemory}>{t.memory}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cool Reactions Showcase */}
                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>Cool Reactions in Action</div>
                    <p className={styles.chemSectionDesc}>
                        Famous reactions you'll encounter throughout this chapter.
                    </p>
                    <div className={styles.chemReactionsGrid}>
                        {COOL_REACTIONS.map((r, idx) => (
                            <div key={idx} className={styles.chemReactionCard}>
                                <div className={styles.chemReactionEmoji}>{r.emoji}</div>
                                <div className={styles.chemReactionTitle}>{r.title}</div>
                                <div className={styles.chemReactionEq}>{r.eq}</div>
                                <div className={styles.chemReactionDesc}>{r.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.chemCta}>
                    <div>
                        <div className={styles.chemCtaTitle}>Ready to experiment?</div>
                        <div className={styles.chemCtaSub}>Next: Virtual Lab with 4 live simulations.</div>
                    </div>
                    <button
                        className={styles.chemCtaBtn}
                        onClick={() => navigate('/senior/grade/10/science/chemical-reactions/skills')}
                    >
                        Skills & Lab →
                    </button>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../ChemicalReactionsDashboard.module.css';

const MIND_MAP_BRANCHES = [
    {
        title: '⚗️ Writing Equations',
        color: '#f97316',
        items: [
            'Word equations → symbolic',
            'Balancing by hit-and-trial',
            'State symbols (s, l, g, aq)',
            'Conditions above arrow',
            'Ionic equations (advanced)',
        ],
    },
    {
        title: '🔥 Types of Reactions',
        color: '#38bdf8',
        items: [
            'Combination (A + B → AB)',
            'Decomposition (AB → A + B)',
            'Displacement (A + BC → AC + B)',
            'Double Displacement',
            'Oxidation-Reduction (Redox)',
        ],
    },
    {
        title: '⚡ Energy & Change',
        color: '#a3e635',
        items: [
            'Exothermic reactions release heat',
            'Endothermic reactions absorb heat',
            'Catalyst speeds up, not consumed',
            'Activation energy concept',
            'Enthalpy change (ΔH)',
        ],
    },
    {
        title: '🌍 Everyday Life',
        color: '#818cf8',
        items: [
            'Respiration (in your body)',
            'Photosynthesis (in plants)',
            'Rusting of iron (harmful)',
            'Refrigerators (endothermic)',
            'Fireworks (multiple reactions)',
        ],
    },
];

const PREREQ_LINKS = [
    {
        icon: '📚',
        from: 'Class 9: Is Matter Around Us Pure?',
        to: 'Types of mixtures & compounds',
        why: 'Understand difference between physical and chemical change',
        color: '#f97316',
    },
    {
        icon: '⚗️',
        from: 'Class 9: Matter in Our Surroundings',
        to: 'States of matter & state symbols',
        why: 'Use (s), (l), (g), (aq) correctly in equations',
        color: '#38bdf8',
    },
    {
        icon: '⚖️',
        from: 'Class 9: Atoms & Molecules',
        to: 'Chemical formulae, valency, formula units',
        why: 'Write correct reactant/product formulae',
        color: '#a3e635',
    },
    {
        icon: '🔗',
        from: 'Class 10, Ch 2: Acids, Bases & Salts',
        to: 'Displacement & double displacement reactions',
        why: 'Extends directly to what happens in Chapter 1',
        color: '#818cf8',
    },
];

const STUDY_TIPS = [
    {
        title: 'OIL RIG',
        detail: 'Oxidation Is Loss of electrons/hydrogen; Reduction Is Gain. Apply to every redox question.',
    },
    {
        title: 'Hit-and-Trial Table',
        detail: 'Draw a 3-column table: Element | LHS count | RHS count. Balance one element at a time.',
    },
    {
        title: 'Visualise Rearrangement',
        detail: 'Picture atoms as coloured balls swapping partners — the total count never changes.',
    },
    {
        title: 'Categorise First',
        detail: 'Before balancing, label the reaction type. It hints at what the products will look like.',
    },
    {
        title: 'State Symbol Checklist',
        detail: 'After balancing, go through each compound and add (s)/(l)/(g)/(aq). Always check precipitates (↓).',
    },
    {
        title: 'Everyday Examples',
        detail: 'Link each type to real life: rusting = corrosion/oxidation, cooking = thermal decomposition, lemon+soda = double displacement.',
    },
];

export default function ChemReactionsConnectomics() {
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
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/terminology')}>📖 Terminology</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/skills')}>🧪 Skills</button>
                    <button className={`${styles.chemNavLink} ${styles.chemNavLinkActive}`}>🔗 Connectomics</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/exam-edge')}>🏆 Exam Edge</button>
                </div>
            </nav>

            <div className={styles.chemHero}>
                <h1 className={styles.chemHeroTitle}>
                    <span className={styles.chemTitleAccent}>Connectomics</span>: The Big Picture
                </h1>
                <p className={styles.chemHeroSub}>
                    See how everything connects — from equations to everyday reactions to prerequisites.
                </p>
            </div>

            <div className={styles.chemShell}>
                {/* Mind Map */}
                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>🧠 Chapter Mind Map</div>
                    <p className={styles.chemSectionDesc}>
                        Every concept in this chapter links back to the central idea of chemical change.
                    </p>
                    <div className={styles.chemMindMap}>
                        <div className={styles.chemMindMapCenter}>
                            <span className={styles.chemCentralNode}>
                                ⚗️ Chemical Reactions &amp; Equations
                            </span>
                        </div>
                        <div className={styles.chemBranches}>
                            {MIND_MAP_BRANCHES.map((b, idx) => (
                                <div
                                    key={idx}
                                    className={styles.chemBranch}
                                    style={{ borderTopColor: b.color }}
                                >
                                    <div className={styles.chemBranchTitle} style={{ color: b.color }}>
                                        {b.title}
                                    </div>
                                    <ul className={styles.chemBranchList}>
                                        {b.items.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className={styles.chemConnectBox}>
                            Connectomics means seeing that these 4 branches are deeply intertwined. A burning
                            magnesium reaction is a <strong>combination</strong> reaction, produces <strong>heat</strong> (exothermic),
                            involves <strong>oxidation</strong> of magnesium, and is directly related to everyday
                            phenomena like <strong>fireworks</strong> and <strong>flares</strong>.
                        </div>
                    </div>
                </div>

                {/* Pre-requisite Links */}
                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>🔗 Prerequisite Connections</div>
                    <p className={styles.chemSectionDesc}>
                        How earlier topics you've learned connect directly to this chapter.
                    </p>
                    <div className={styles.chemSkillGrid}>
                        {PREREQ_LINKS.map((p, idx) => (
                            <div
                                key={idx}
                                className={styles.chemSkillCard}
                                style={{ borderLeft: `4px solid ${p.color}` }}
                            >
                                <div className={styles.chemSkillCardHeader}>
                                    <div
                                        className={styles.chemSkillIconWrap}
                                        style={{ background: `${p.color}20`, fontSize: '1.4rem' }}
                                    >
                                        {p.icon}
                                    </div>
                                    <div className={styles.chemSkillTitle} style={{ color: p.color }}>
                                        {p.from}
                                    </div>
                                </div>
                                <div className={styles.chemSkillHowLabel}>Gives You</div>
                                <div className={styles.chemSkillHowText}>{p.to}</div>
                                <div className={styles.chemSkillExample}>🔗 {p.why}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Study Technology */}
                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>💡 Study Technology</div>
                    <p className={styles.chemSectionDesc}>
                        Power-up techniques to accelerate understanding and exam performance.
                    </p>
                    <div className={styles.chemStudyTipGrid}>
                        {STUDY_TIPS.map((t, idx) => (
                            <div key={idx} className={styles.chemStudyTipCard}>
                                <div className={styles.chemStudyTipCardTitle}>{t.title}</div>
                                {t.detail}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.chemCta}>
                    <div>
                        <div className={styles.chemCtaTitle}>Ready for the final challenge?</div>
                        <div className={styles.chemCtaSub}>Balance equations and ace the vocab quiz.</div>
                    </div>
                    <button
                        className={styles.chemCtaBtn}
                        onClick={() => navigate('/senior/grade/10/science/chemical-reactions/exam-edge')}
                    >
                        Exam Edge →
                    </button>
                </div>
            </div>
        </div>
    );
}

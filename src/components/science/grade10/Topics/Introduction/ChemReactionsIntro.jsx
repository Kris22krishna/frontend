import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../ChemicalReactionsDashboard.module.css';

const PREREQS = [
    {
        icon: '⚗️',
        title: 'Physical vs Chemical Change',
        desc: 'Understand the difference before studying chemical reactions.',
        points: [
            'Physical change: no new substance formed (e.g., ice melting)',
            'Chemical change: new substance formed (e.g., burning wood)',
            'Signs of chemical change: colour, smell, gas, heat',
        ],
    },
    {
        icon: '🔬',
        title: 'Atoms, Molecules & Elements',
        desc: 'The building blocks you\'ll use throughout this chapter.',
        points: [
            'Atom = smallest unit of an element',
            'Molecule = two or more atoms bonded',
            'Element = pure substance, one type of atom',
            'Compound = two or more elements bonded',
        ],
    },
    {
        icon: '📖',
        title: 'Chemical Symbols & Formulae',
        desc: 'Know common symbols to read and write equations.',
        points: [
            'H₂O — water | O₂ — oxygen | CO₂ — carbon dioxide',
            'NaCl — table salt | Fe — iron | Mg — magnesium',
            'Subscript = number of atoms in a molecule',
            'CaO — calcium oxide | H₂SO₄ — sulphuric acid',
        ],
    },
    {
        icon: '⚖️',
        title: 'Law of Conservation of Mass',
        desc: 'The golden rule behind balanced equations.',
        points: [
            'Mass is neither created nor destroyed',
            'Total mass of reactants = total mass of products',
            'Atoms only rearrange, they never disappear',
        ],
    },
    {
        icon: '🧮',
        title: 'Basic Arithmetic for Balancing',
        desc: 'Simple multiplication and counting skills you\'ll need.',
        points: [
            'Counting atoms in formulae (e.g., Fe₃O₄ has 3 Fe, 4 O)',
            'Using coefficients (2H₂O means 2 molecules, 4 H, 2 O)',
            'LHS must equal RHS for each element',
        ],
    },
    {
        icon: '🌡️',
        title: 'Basic Lab Safety',
        desc: 'Essential before any practical activity.',
        points: [
            'Handle acids carefully — they cause burns',
            'Never point boiling tubes at people',
            'Use tongs for hot objects',
            'Waft gases gently, never inhale directly',
        ],
    },
];

const CARDS_5W1H = [
    {
        q: 'WHAT',
        label: 'What are Chemical Reactions?',
        icon: '⚗️',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.35)',
        content: 'Imagine milk suddenly turning sour or an iron nail catching rust — that\'s a CHEMICAL REACTION! Substances change into completely new things with different properties. We write these changes as short, elegant equations.',
        fact: '💡 Magnesium ribbon burns with a dazzling white flame so bright it can temporarily blind you!',
    },
    {
        q: 'WHO',
        label: 'Who cares about these reactions?',
        icon: '🧬',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16,185,129,0.35)',
        content: 'YOU do! Every time you cook food, digest it, or even breathe — chemical reactions are working inside you. Scientists, doctors, and even chefs use them daily.',
        fact: '💡 Respiration is an exothermic reaction — your body literally burns sugar to keep you alive!',
    },
    {
        q: 'WHEN',
        label: 'When do reactions happen?',
        icon: '⏰',
        gradFrom: '#8b5cf6',
        gradTo: '#a78bfa',
        shadow: 'rgba(139,92,246,0.35)',
        content: 'All the time! Grapes turn into wine, food is digested in your stomach, iron rusts, and you exhale CO₂ every second. Even cooking rice is a chemical reaction. Chemistry never sleeps!',
        fact: '💡 Fermentation of grapes is a natural chemical reaction — that\'s how wine is made!',
    },
    {
        q: 'WHERE',
        label: 'Where can you see them?',
        icon: '🌍',
        gradFrom: '#f59e0b',
        gradTo: '#fbbf24',
        shadow: 'rgba(245,158,11,0.35)',
        content: 'In your kitchen, inside your body, in the rusty gate outside, and definitely in the school lab! From whitewashing walls to photography film — reactions are everywhere.',
        fact: '💡 Slaked lime + CO₂ from air makes shiny marble-like walls after whitewashing!',
    },
    {
        q: 'WHY',
        label: 'Why learn this?',
        icon: '❓',
        gradFrom: '#ec4899',
        gradTo: '#f472b6',
        shadow: 'rgba(236,72,153,0.35)',
        content: 'Understanding reactions helps you predict changes, prevent rust on your bike, keep chips fresh, and explain why food digests! Plus, you\'ll ace every chemistry exam.',
        fact: '💡 Chips packets are flushed with nitrogen gas to stop oxidation and keep them crunchy!',
    },
    {
        q: 'HOW',
        label: 'How do we show reactions?',
        icon: '📐',
        gradFrom: '#14b8a6',
        gradTo: '#2dd4bf',
        shadow: 'rgba(20,184,166,0.35)',
        content: 'Start with words → turn into symbols → balance atoms using hit-and-trial. Add state symbols (s), (l), (g), (aq) and you\'ve written a proper chemical equation!',
        fact: '💡 The balanced equation for iron + steam: 3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)',
    },
];

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`${styles.chemIntroCard} ${open ? styles.chemIntroCardOpen : ''}`}
            onClick={() => setOpen(o => !o)}
        >
            <div
                className={styles.chemIntroCardStrip}
                style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
            />
            <div className={styles.chemIntroCardHeader}>
                <div
                    className={styles.chemIntroCardIconWrap}
                    style={{ background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})` }}
                >
                    {card.icon}
                </div>
                <div style={{ flex: 1 }}>
                    <div className={styles.chemIntroCardQ} style={{ color: card.gradFrom }}>
                        {card.q}
                    </div>
                    <div className={styles.chemIntroCardLabel}>{card.label}</div>
                </div>
                <div className={`${styles.chemIntroCardChevron} ${open ? styles.chemIntroCardChevronOpen : ''}`}>
                    ▼
                </div>
            </div>
            {open && (
                <div className={styles.chemIntroCardBody}>
                    <p className={styles.chemIntroCardContent}>{card.content}</p>
                    <div className={styles.chemIntroCardFact}>{card.fact}</div>
                </div>
            )}
        </div>
    );
}

export default function ChemReactionsIntro() {
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
                    <button className={`${styles.chemNavLink} ${styles.chemNavLinkActive}`}>🌟 Intro</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/terminology')}>📖 Terminology</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/skills')}>🧪 Skills</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/connectomics')}>🔗 Connectomics</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/exam-edge')}>🏆 Exam Edge</button>
                </div>
            </nav>

            <div className={styles.chemHero}>
                <h1 className={styles.chemHeroTitle}>
                    Dive into <span className={styles.chemTitleAccent}>Chemical Reactions</span>
                </h1>
                <p className={styles.chemHeroSub}>
                    Start with prerequisites, then explore the 6 big questions that frame this chapter.
                </p>
            </div>

            <div className={styles.chemShell}>
                {/* Prerequisites */}
                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>Prerequisites</div>
                    <p className={styles.chemSectionDesc}>
                        Before diving into Chapter 1, make sure you're comfortable with these foundational ideas.
                    </p>
                    <div className={styles.chemPrereqGrid}>
                        {PREREQS.map((p, idx) => (
                            <div key={idx} className={styles.chemPrereqCard}>
                                <div className={styles.chemPrereqIcon}>{p.icon}</div>
                                <div className={styles.chemPrereqTitle}>{p.title}</div>
                                <p className={styles.chemPrereqDesc}>{p.desc}</p>
                                <ul className={styles.chemPrereqList}>
                                    {p.points.map((pt, i) => <li key={i}>{pt}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5W1H Cards */}
                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>6 Big Questions</div>
                    <p className={styles.chemSectionDesc}>
                        Click each card to expand and explore the questions that frame this chapter.
                    </p>
                    <div className={styles.chemIntroGrid}>
                        {CARDS_5W1H.map((card, idx) => (
                            <W1HCard key={idx} card={card} />
                        ))}
                    </div>
                </div>

                {/* Footer CTA */}
                <div className={styles.chemCta}>
                    <div>
                        <div className={styles.chemCtaTitle}>Ready to learn the language?</div>
                        <div className={styles.chemCtaSub}>Next up: Key terms with memory tricks.</div>
                    </div>
                    <button
                        className={styles.chemCtaBtn}
                        onClick={() => navigate('/senior/grade/10/science/chemical-reactions/terminology')}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}

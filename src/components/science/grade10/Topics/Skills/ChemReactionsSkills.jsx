import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../ChemicalReactionsDashboard.module.css';

const EXPERIMENTS = [
    {
        id: 'mg',
        title: 'Burning Magnesium',
        desc: 'Mg ribbon burns in oxygen to produce a brilliant white light.',
        equation: '2Mg(s) + O₂(g) → 2MgO(s)',
        type: 'Combination Reaction + Exothermic',
        observation: 'Magnesium burns with an intensely bright white flame. White powdery MgO is left behind.',
        svgContent: 'mg',
    },
    {
        id: 'zn',
        title: 'Zinc + Hydrochloric Acid',
        desc: 'Zinc reacts with HCl to release hydrogen gas (bubbles visible).',
        equation: 'Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑',
        type: 'Displacement Reaction',
        observation: 'Bubbles of hydrogen gas rise to the surface. Zinc dissolves slowly. Solution turns colourless.',
        svgContent: 'zn',
    },
    {
        id: 'fe',
        title: 'Iron + Copper Sulphate',
        desc: 'Iron displaces copper from copper sulphate solution.',
        equation: 'Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)',
        type: 'Displacement Reaction',
        observation: 'Blue colour of CuSO₄ fades. Reddish-brown copper deposits on the iron nail.',
        svgContent: 'fe',
    },
    {
        id: 'precip',
        title: 'Lead Nitrate + KI (Precipitation)',
        desc: 'Two colourless solutions react to form a bright yellow precipitate.',
        equation: 'Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)',
        type: 'Double Displacement + Precipitation',
        observation: 'A brilliant yellow precipitate (Lead Iodide) forms instantly upon mixing.',
        svgContent: 'precip',
    },
];

const SKILLS = [
    {
        icon: '⚖️',
        title: 'Identify Reaction Type',
        desc: 'Classify any given equation as combination, decomposition, displacement, double displacement, or redox.',
        how: 'Look at the pattern: A + B → AB (combination), AB → A + B (decomposition), A + BC → AC + B (displacement).',
        example: '2H₂ + O₂ → 2H₂O  →  Combination (Exothermic)',
        color: '#f97316',
    },
    {
        icon: '🔢',
        title: 'Balance Chemical Equations',
        desc: 'Use the hit-and-trial method to balance atoms on both sides of an equation.',
        how: 'Count each atom type on both sides, adjust coefficients (never subscripts) until equal.',
        example: 'Unbalanced: Fe + H₂O → Fe₃O₄ + H₂\nBalanced: 3Fe + 4H₂O → Fe₃O₄ + 4H₂',
        color: '#38bdf8',
    },
    {
        icon: '🏷️',
        title: 'Add State Symbols',
        desc: 'Annotate balanced equations with (s) solid, (l) liquid, (g) gas, (aq) aqueous.',
        how: 'Identify the physical state of each substance under reaction conditions and add in parentheses.',
        example: 'Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)↑',
        color: '#a3e635',
    },
    {
        icon: '☀️',
        title: 'Identify Energy Change',
        desc: 'Determine if a reaction is endothermic (absorbs heat) or exothermic (releases heat).',
        how: 'If products are more stable, heat is released (exo). If heat/light is needed to start/sustain reaction, it is endo.',
        example: 'Combustion: CH₄ + 2O₂ → CO₂ + 2H₂O + Energy  →  Exothermic',
        color: '#ef4444',
    },
    {
        icon: '🔁',
        title: 'Identify Redox Reactions',
        desc: 'Use the OIL RIG rule to identify oxidised and reduced species in a reaction.',
        how: 'OIL RIG: Oxidation Is Loss, Reduction Is Gain. Find what gains/loses O, H, or electrons.',
        example: 'CuO + H₂ → Cu + H₂O\nCuO is REDUCED (loses O), H₂ is OXIDISED (gains O)',
        color: '#8b5cf6',
    },
    {
        icon: '⚗️',
        title: 'Write Word Equations',
        desc: 'Convert observations into word equations, then symbolic equations step by step.',
        how: 'Name reactants → → products. Then replace names with formulae. Then balance.',
        example: 'Words: Zinc + Sulphuric acid → Zinc sulphate + Hydrogen\nSymbols: Zn + H₂SO₄ → ZnSO₄ + H₂↑',
        color: '#14b8a6',
    },
];

const RULES = [
    {
        num: '01',
        title: 'Always Write Reactants on the Left',
        main: 'Reactants → Products is the universal direction.',
        detail: 'Use → (yields) for irreversible reactions and ⇌ for reversible. Never reverse this convention.',
        tip: '⚡ Arrow tip: use ↑ for gases produced, ↓ for precipitates formed.',
        color: '#f97316',
    },
    {
        num: '02',
        title: 'Balance by Changing Coefficients Only',
        main: 'Never change subscripts to balance an equation.',
        detail: 'Changing H₂O to H₃O changes the substance itself! Only add coefficients in front.',
        tip: '⚡ Start with the most complex molecule, balance C, H, O last.',
        color: '#38bdf8',
    },
    {
        num: '03',
        title: 'Conservation of Mass Must Hold',
        main: 'Total mass of reactants = Total mass of products, always.',
        detail: 'This is the Law of Conservation of Mass. Atoms are rearranged, not created or destroyed.',
        tip: '⚡ Verify: count every atom on both sides before writing the balanced equation.',
        color: '#a3e635',
    },
    {
        num: '04',
        title: 'Add State Symbols in NCERT Equations',
        main: '(s), (l), (g), (aq) — know them and use them.',
        detail: 'State symbols make equations more informative and are essential in board exam answers.',
        tip: '⚡ aq = dissolved in water (aqueous). (l) = the pure liquid substance.',
        color: '#818cf8',
    },
    {
        num: '05',
        title: 'Provide Conditions Above the Arrow',
        main: 'Write heat (Δ), light (hv), or catalyst above/below the arrow.',
        detail: 'Example: CaCO₃ →(heat) CaO + CO₂. This shows that heat is required to start the reaction.',
        tip: '⚡ Catalyst is written above the arrow, conditions below.',
        color: '#ef4444',
    },
];

function MgSvg({ running }) {
    return (
        <svg viewBox="0 0 200 200" className={styles.chemLabSvg} xmlns="http://www.w3.org/2000/svg">
            {/* Tongs */}
            <rect x="88" y="60" width="4" height="80" fill="#888" rx="2" />
            <rect x="108" y="60" width="4" height="80" fill="#888" rx="2" />
            {/* Mg ribbon */}
            <rect x="90" y="130" width="20" height="6" fill="#d1d5db" rx="2" className={running ? styles.chemMgGlow : ''} />
            {/* Flame */}
            {running && (
                <>
                    <ellipse cx="100" cy="110" rx="14" ry="22" fill="#fff" opacity="0.95" className={styles.chemFlame} />
                    <ellipse cx="100" cy="115" rx="9" ry="15" fill="#f97316" opacity="0.9" className={styles.chemFlame} />
                    <ellipse cx="100" cy="120" rx="5" ry="10" fill="#fbbf24" opacity="0.8" className={styles.chemFlame} />
                </>
            )}
            {/* Label */}
            <text x="50%" y="185" textAnchor="middle" fill="#7d8590" fontSize="11" fontFamily="IBM Plex Mono">Mg ribbon</text>
        </svg>
    );
}

function ZnSvg({ running }) {
    return (
        <svg viewBox="0 0 200 200" className={styles.chemLabSvg} xmlns="http://www.w3.org/2000/svg">
            {/* Beaker */}
            <path d="M60 60 L60 160 Q60 170 70 170 L130 170 Q140 170 140 160 L140 60 Z" fill="#0a1628" stroke="#30363d" strokeWidth="2" />
            {/* Solution = blue */}
            <path d="M62 100 L62 160 Q62 168 70 168 L130 168 Q138 168 138 160 L138 100 Z" fill="#1e3a5f" />
            {/* Zinc piece */}
            <rect x="87" y="110" width="26" height="10" fill="#9ca3af" rx="3" />
            {/* Bubbles */}
            {running && (
                <>
                    <circle cx="96" cy="100" r="3" fill="#38bdf8" opacity="0.7" className={styles.chemBubble} />
                    <circle cx="105" cy="95" r="2" fill="#38bdf8" opacity="0.6" className={styles.chemBubble} />
                    <circle cx="112" cy="98" r="2.5" fill="#38bdf8" opacity="0.7" className={styles.chemBubble} />
                </>
            )}
            <text x="50%" y="185" textAnchor="middle" fill="#7d8590" fontSize="11" fontFamily="IBM Plex Mono">Zn + HCl(aq)</text>
        </svg>
    );
}

function FeSvg({ running }) {
    return (
        <svg viewBox="0 0 200 200" className={styles.chemLabSvg} xmlns="http://www.w3.org/2000/svg">
            {/* Beaker */}
            <path d="M60 60 L60 160 Q60 170 70 170 L130 170 Q140 170 140 160 L140 60 Z" fill="#0a1628" stroke="#30363d" strokeWidth="2" />
            {/* CuSO4 solution blue → fading */}
            <path d="M62 90 L62 160 Q62 168 70 168 L130 168 Q138 168 138 160 L138 90 Z" fill={running ? '#1a3a4a' : '#1e3a5f'} style={{ transition: 'fill 2s' }} />
            {/* Iron nail */}
            <rect x="95" y="70" width="8" height="90" fill="#6b7280" rx="3" />
            {/* Copper deposit */}
            {running && <rect x="95" y="100" width="8" height="40" fill="#b45309" rx="3" opacity="0.85" />}
            <text x="50%" y="185" textAnchor="middle" fill="#7d8590" fontSize="11" fontFamily="IBM Plex Mono">Fe + CuSO₄(aq)</text>
        </svg>
    );
}

function PrecipSvg({ running }) {
    return (
        <svg viewBox="0 0 200 200" className={styles.chemLabSvg} xmlns="http://www.w3.org/2000/svg">
            {/* Beaker */}
            <path d="M60 60 L60 160 Q60 170 70 170 L130 170 Q140 170 140 160 L140 60 Z" fill="#0a1628" stroke="#30363d" strokeWidth="2" />
            {/* Solution */}
            <path d="M62 90 L62 160 Q62 168 70 168 L130 168 Q138 168 138 160 L138 90 Z" fill="#1a2035" />
            {/* Yellow precipitate */}
            {running && (
                <>
                    <ellipse cx="100" cy="160" rx="30" ry="7" fill="#fbbf24" opacity="0.9" />
                    <ellipse cx="100" cy="153" rx="20" ry="8" fill="#f59e0b" opacity="0.7" />
                </>
            )}
            {/* Droplet being added */}
            <ellipse cx="100" cy="80" rx="5" ry="8" fill="#d1d5db" opacity="0.9" />
            <text x="50%" y="185" textAnchor="middle" fill="#7d8590" fontSize="11" fontFamily="IBM Plex Mono">Pb(NO₃)₂ + KI(aq)</text>
        </svg>
    );
}

const SVG_MAP = { mg: MgSvg, zn: ZnSvg, fe: FeSvg, precip: PrecipSvg };

export default function ChemReactionsSkills() {
    const navigate = useNavigate();
    const [activeExp, setActiveExp] = useState(0);
    const [running, setRunning] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const exp = EXPERIMENTS[activeExp];
    const LabSvg = SVG_MAP[exp.svgContent];

    const handleRun = () => {
        setRunning(true);
        setTimeout(() => setShowResult(true), 800);
    };

    const handleReset = () => {
        setRunning(false);
        setShowResult(false);
    };

    const handleExpChange = (idx) => {
        setActiveExp(idx);
        setRunning(false);
        setShowResult(false);
    };

    return (
        <div className={`${styles.chemRoot} ${styles.chemPage}`}>
            <nav className={styles.chemNav}>
                <button className={styles.chemNavBack} onClick={() => navigate('/senior/grade/10/science/chemical-reactions')}>
                    ← Dashboard
                </button>
                <div className={styles.chemNavLinks}>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/introduction')}>🌟 Intro</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/terminology')}>📖 Terminology</button>
                    <button className={`${styles.chemNavLink} ${styles.chemNavLinkActive}`}>🧪 Skills</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/connectomics')}>🔗 Connectomics</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/exam-edge')}>🏆 Exam Edge</button>
                </div>
            </nav>

            <div className={styles.chemHero}>
                <h1 className={styles.chemHeroTitle}>
                    <span className={styles.chemTitleAccent}>Virtual Lab</span> &amp; Mastery Skills
                </h1>
                <p className={styles.chemHeroSub}>
                    Simulate 4 classic reactions, master 6 core skills, and learn the Golden Rules.
                </p>
            </div>

            <div className={styles.chemShell}>
                {/* Virtual Lab */}
                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>🔬 Virtual Lab</div>
                    <p className={styles.chemSectionDesc}>
                        Select an experiment and click Run to observe the reaction in action.
                    </p>
                    <div className={styles.chemLabWrap}>
                        {/* Sidebar */}
                        <div className={styles.chemLabSidebar}>
                            <div className={styles.chemLabSidebarLabel}>Experiments</div>
                            {EXPERIMENTS.map((e, idx) => (
                                <button
                                    key={e.id}
                                    className={`${styles.chemLabExpBtn} ${activeExp === idx ? styles.chemLabExpBtnActive : ''}`}
                                    onClick={() => handleExpChange(idx)}
                                >
                                    <div className={styles.chemLabExpBtnTitle}>{e.title}</div>
                                    <div className={styles.chemLabExpBtnDesc}>{e.type}</div>
                                </button>
                            ))}
                        </div>

                        {/* Stage */}
                        <div className={styles.chemLabStage}>
                            <div className={styles.chemLabStageTitle}>{exp.title}</div>
                            <div className={styles.chemLabStageDesc}>{exp.desc}</div>
                            <div className={styles.chemLabSvgWrap}>
                                <LabSvg running={running} />
                            </div>
                            <div className={styles.chemLabControls}>
                                {!running ? (
                                    <button className={styles.chemLabBtnRun} onClick={handleRun}>
                                        ▶ Run Experiment
                                    </button>
                                ) : (
                                    <button className={styles.chemLabBtnWait} disabled>
                                        ⏳ Running…
                                    </button>
                                )}
                                <button className={`${styles.chemLabBtnRun} ${styles.chemLabBtnReset}`} onClick={handleReset}>
                                    ↺ Reset
                                </button>
                            </div>
                            {showResult && (
                                <div className={styles.chemLabResult}>
                                    <div className={styles.chemLabResultLabel}>Observation</div>
                                    <p className={styles.chemLabObservation}>{exp.observation}</p>
                                    <div className={styles.chemLabEqDisplay}>{exp.equation}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mastery Skills */}
                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>🎯 Mastery Skills</div>
                    <p className={styles.chemSectionDesc}>6 competencies you must master to ace this chapter.</p>
                    <div className={styles.chemSkillGrid}>
                        {SKILLS.map((s, idx) => (
                            <div key={idx} className={styles.chemSkillCard}>
                                <div className={styles.chemSkillCardHeader}>
                                    <div
                                        className={styles.chemSkillIconWrap}
                                        style={{ background: `${s.color}20`, color: s.color }}
                                    >
                                        {s.icon}
                                    </div>
                                    <div className={styles.chemSkillTitle}>{s.title}</div>
                                </div>
                                <p className={styles.chemSkillDesc}>{s.desc}</p>
                                <div className={styles.chemSkillHowLabel}>How to Execute</div>
                                <div className={styles.chemSkillHowText}>{s.how}</div>
                                <div className={styles.chemSkillExample}>{s.example}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Five Golden Rules */}
                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>📜 The Five Golden Rules</div>
                    <p className={styles.chemSectionDesc}>These rules must never be broken when writing chemical equations.</p>
                    <div className={styles.chemRulesStack}>
                        {RULES.map((r, idx) => (
                            <div
                                key={idx}
                                className={styles.chemRuleCard}
                                style={{ borderLeftColor: r.color }}
                            >
                                <div className={styles.chemRuleNum} style={{ color: r.color }}>{r.num}</div>
                                <div>
                                    <div className={styles.chemRuleTitle}>{r.title}</div>
                                    <div className={styles.chemRuleMain}>{r.main}</div>
                                    <p className={styles.chemRuleDetail}>{r.detail}</p>
                                    <div className={styles.chemRuleTip}>{r.tip}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.chemCta}>
                    <div>
                        <div className={styles.chemCtaTitle}>See the big picture?</div>
                        <div className={styles.chemCtaSub}>Next: Mind map all connections.</div>
                    </div>
                    <button
                        className={styles.chemCtaBtn}
                        onClick={() => navigate('/senior/grade/10/science/chemical-reactions/connectomics')}
                    >
                        Connectomics →
                    </button>
                </div>
            </div>
        </div>
    );
}

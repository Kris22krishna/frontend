import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../euclids_geometry_9.module.css';
import { LatexText } from '../../../../../LatexText';

import EGScenarioPracticeEngine from './Engines/EGScenarioPracticeEngine';
import EGScenarioAssessmentEngine from './Engines/EGScenarioAssessmentEngine';
import {
    generateDefinitionsScenarios,
    generatePostulatesScenarios,
    generateEquivalentsScenarios
} from './Engines/EGScenarioUtils';
import {
    PointLineSurfaceChart,
    CoincideAxiomChart,
    WholePartAxiomChart,
    Postulate3Chart,
    Postulate5Chart,
    EquivVersionsChart
} from '../components/EGDynamicCharts';

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'defs-axioms',
        nodeId: 'eg9-defs-axioms',
        title: 'Definitions & Axioms',
        subtitle: 'Skill 1 · Universal Truths',
        icon: '🌌',
        color: '#0f4c81',
        desc: 'Understand Euclid\'s primary definitions and the 7 Common Notions (Axioms).',
        scenarioGen: generateDefinitionsScenarios,
        learn: {
            concept: 'Axioms are assumptions that are universally true in all branches of mathematics.',
            rules: [
                {
                    title: 'Definitions from Dimensions',
                    f: '\\text{Point (0D)} \\rightarrow \\text{Line (1D)} \\rightarrow \\text{Surface (2D)}',
                    chart: PointLineSurfaceChart,
                    d: 'Euclid laid the foundation by defining physical dimensions logically.\n\n• Point: No part/dimension\n• Line: Breadthless length\n• Surface: Length and breadth only\n• Solid: Length, breadth, and depth',
                    ex: 'The edges of a solid are surfaces. The edges of a surface are lines. The ends of a line are points.',
                    tip: 'Think of taking away one dimension at a time from a 3D block.',
                },
                {
                    title: 'Axioms (Common Notions)',
                    f: 'A = B \\text{ and } B = C \\implies A = C',
                    chart: CoincideAxiomChart,
                    d: 'Axioms are universally true. They allow us to substitute equals, add equals to equals, subtract equals from equals, and overlap shapes to prove they are identical.',
                    ex: 'If you have two identical squares, and you cut half of one off, and half of the other off, the remaining halves are still equal (Axiom 7: Things which are halves of the same things are equal).',
                    tip: 'Axioms apply to numbers, algebra, weights, and geometry. They are universal.',
                },
                {
                    title: 'The Whole is Greater than the Part',
                    f: '\\text{Whole } > \\text{ Part}',
                    chart: WholePartAxiomChart,
                    d: 'Axiom 5 specifically states that any whole magnitude is always strictly larger than any portion you carve out of it.',
                    ex: 'If you take a slice of pizza, the original whole pizza was larger than the slice you took.',
                    tip: 'This axiom is frequently used in geometry to prove one angle or segment is larger than another.',
                },
            ],
        },
    },
    {
        id: 'postulates',
        nodeId: 'eg9-postulates',
        title: 'The Five Postulates',
        subtitle: 'Skill 2 · Geometric Assumptions',
        icon: '📐',
        color: '#6a1b9a',
        desc: 'Apply the 5 geometry-specific postulates, including the famous Fifth Postulate.',
        scenarioGen: generatePostulatesScenarios,
        learn: {
            concept: 'Postulates are assumptions specific only to Geometry.',
            rules: [
                {
                    title: 'The First Four Postulates',
                    f: '\\text{Points, Lines, Circles, and Right Angles}',
                    chart: Postulate3Chart,
                    d: '1. You can draw a straight line from any point to any point.\n2. You can extend a line segment infinitely.\n3. You can draw a circle anywhere with any radius.\n4. All right angles are equal to one another ($90^\\circ = 90^\\circ$).',
                    ex: 'Postulate 3 means that no matter where you are in the universe, you can place a compass down and draw a circle.',
                    tip: 'Postulates 1-4 are incredibly simple and easy to verify visually.',
                },
                {
                    title: 'The Fifth Postulate',
                    f: '\\angle 1 + \\angle 2 < 180^\\circ \\implies \\text{Lines Meet}',
                    chart: Postulate5Chart,
                    d: 'If a straight line intersects two straight lines, creating interior angles on the same side whose sum is LESS than $180^\\circ$, then those two lines will eventually intersect on that side.',
                    ex: 'If the interior angles on the right side sum to $178^\\circ$, the lines lean inwards and will meet on the right side.',
                    tip: 'If they sum to exactly $180^\\circ$, they are perfectly parallel and will never meet.',
                },
            ],
        },
    },
    {
        id: 'equivalents',
        nodeId: 'eg9-equivalents',
        title: 'Equivalents of 5th Postulate',
        subtitle: 'Skill 3 · Parallel Consequences',
        icon: '🚊',
        color: '#b71c1c',
        desc: 'Understand Playfair\'s Axiom and the properties of intersecting and parallel lines.',
        scenarioGen: generateEquivalentsScenarios,
        learn: {
            concept: 'The Fifth Postulate leads to profound consequences about parallel lines.',
            rules: [
                {
                    title: 'Playfair\'s Axiom',
                    f: '\\text{Through } P \\notin L, \\text{ exactly 1 parallel exists}',
                    chart: EquivVersionsChart,
                    d: 'For every line $L$ and for every point $P$ not lying on $L$, there exists a UNIQUE line $M$ passing through $P$ and parallel to $L$.',
                    ex: 'You cannot draw two different parallel lines through the exact same point $P$. They would just be the same line superimposed.',
                    tip: 'Think of train tracks. Given a point beside a track, only one parallel track can be drawn without eventually crashing.',
                },
                {
                    title: 'Intersecting Lines cannot both be Parallel',
                    f: '\\text{Line A } \\cap \\text{ Line B } \\implies \\text{Not both } \\parallel \\text{ C}',
                    chart: EquivVersionsChart,
                    d: 'Two distinct intersecting lines cannot both be parallel to the same line.',
                    ex: 'If Line A and Line B form an X shape, and you have a third Line C, they cannot both run alongside C forever. At least one of them will cross C.',
                    tip: 'This is another direct wording of the Fifth Postulate.',
                },
            ],
        },
    },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function EuclidsGeometry9Skills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // list, learn, practice, assessment
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;
    const goBack = () => { setView('list'); setSelectedLearnIdx(0); };

    if (view !== 'list' && skill) {
        return (
            <div className={styles['page']} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <nav className={styles['nav']} style={view === 'learn' ? { position: 'sticky', top: 0, zIndex: 100 } : {}}>
                    <button className={styles['nav-back']} onClick={goBack}>← Back to Skills</button>
                    <div className={styles['nav-links']}>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/euclids-geometry/intro')}>🌟 Intro</button>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/euclids-geometry/terminology')}>📖 Terminology</button>
                        <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '20px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className={styles['quiz-container']} style={{ maxWidth: 1060 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                                    {skill.icon}
                                </div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                                    Learn: {skill.title}
                                </h1>
                            </div>

                            <div className={styles['learn-grid']}>
                                <aside className={styles['learn-sidebar']}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            className={`${styles['sidebar-btn']} ${selectedLearnIdx === ri ? styles['active'] : ''}`}
                                            style={{ '--skill-color': skill.color }}>
                                            <div className={styles['sidebar-btn-num']}>{ri + 1}</div>
                                            <span className={styles['sidebar-btn-title']}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>
                                <main className={`${styles['details-window']} ${styles['details-window-anim']}`} key={selectedLearnIdx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 28 }}>{skill.icon}</div>
                                    </div>
                                    <div style={{ background: `${skill.color}08`, padding: '18px', borderRadius: 16, border: `2px solid ${skill.color}20`, marginBottom: 22, textAlign: 'center' }}>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: skill.color, letterSpacing: 0.5 }}>
                                            <LatexText text={`$${skill.learn.rules[selectedLearnIdx].f}$`} />
                                        </div>
                                    </div>
                                    
                                    {/* Animated chart illustration */}
                                    {skill.learn.rules[selectedLearnIdx].chart && (
                                        <div style={{ marginBottom: 22, padding: 16, background: '#f8fafc', borderRadius: 16, display: 'flex', justifyContent: 'center' }}>
                                            {React.createElement(skill.learn.rules[selectedLearnIdx].chart)}
                                        </div>
                                    )}

                                    <div className={styles['rule-split']}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>Explanation</h4>
                                            <div style={{ fontSize: 15, lineHeight: 1.65, color: '#0f172a', margin: 0 }}>
                                                <LatexText text={skill.learn.rules[selectedLearnIdx].d} />
                                            </div>
                                            <div style={{ marginTop: 16, background: 'rgba(20,184,166,0.05)', padding: '12px', borderRadius: 12, border: '1px solid rgba(20,184,166,0.12)' }}>
                                                <div style={{ margin: 0, fontSize: 13.5, color: '#64748b' }}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Tip: </span>
                                                    <LatexText text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: skill.color, marginBottom: 8 }}>Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)' }}>
                                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                                                    <LatexText text={skill.learn.rules[selectedLearnIdx].ex} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                        <button className={styles['btn-primary']} onClick={() => setView('practice')} style={{ background: skill.color, border: 'none' }}>Mastered? Try Practice →</button>
                                        <button className={styles['nav-back']} onClick={() => setView('assessment')}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <div style={{ maxWidth: 920, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <EGScenarioPracticeEngine
                                scenarios={skill.scenarioGen()}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={goBack}
                                nodeId={skill.nodeId}
                            />
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <EGScenarioAssessmentEngine
                                scenarios={skill.scenarioGen()}
                                title={skill.title}
                                color={skill.color}
                                onBack={goBack}
                                nodeId={skill.nodeId}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={styles['page']} style={window.innerWidth > 900 ? { height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' } : { display: 'flex', flexDirection: 'column' }}>
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/euclids-geometry')}>← Back to Module</button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/euclids-geometry/intro')}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/euclids-geometry/terminology')}>📖 Terminology</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                </div>
            </nav>
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 40 }}>
                <div style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                            Euclid's Geometry <span style={{ color: '#0f766e' }}>Skills</span>
                        </h1>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Choose a skill · Learn rules · Practice with mixed questions · Take a timed assessment.</div>
                    </div>
                    <div className={styles['skills-list']}>
                        {SKILLS.map((sk, idx) => (
                            <div key={sk.id} className={styles['skill-card']}>
                                <div className={styles['skill-info']}>
                                    <div className={styles['skill-icon']} style={{ background: `${sk.color}15`, fontSize: 28 }}>{sk.icon}</div>
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 800, color: sk.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{sk.subtitle}</div>
                                        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0f172a' }}>{sk.title}</h3>
                                        <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{sk.desc}</p>
                                    </div>
                                </div>
                                <div className={styles['skill-actions']}>
                                    <button
                                        style={{ padding: '8px 16px', background: '#fff', border: `2px solid ${sk.color}`, color: sk.color, borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => { setActiveSkill(idx); setView('learn'); }}>Learn</button>
                                    <button
                                        style={{ padding: '8px 16px', background: '#fff', border: `2px solid ${sk.color}`, color: sk.color, borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => { setActiveSkill(idx); setView('practice'); }}>Practice</button>
                                    <button
                                        style={{ padding: '8px 16px', background: sk.color, border: `2px solid ${sk.color}`, color: '#fff', borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => { setActiveSkill(idx); setView('assessment'); }}>Assess</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

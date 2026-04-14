import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../circles_9.module.css';
import { LatexText } from '../../../../../LatexText';

import CirclesScenarioPracticeEngine from './Engines/CirclesScenarioPracticeEngine';
import CirclesScenarioAssessmentEngine from './Engines/CirclesScenarioAssessmentEngine';
import CirclesGraphMini from './Engines/CirclesGraphMini';
import {
    generateChordScenarios,
    generateArcAngleScenarios,
    generateCyclicQuadScenarios
} from './Engines/CirclesScenarioUtils';

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'chords-and-perpendiculars',
        nodeId: 'cirlces-9-0001',
        title: 'Chords & Perpendiculars',
        subtitle: 'Skill 1 · Theorems 9.1 to 9.6',
        icon: '📐',
        color: '#0f4c81',
        desc: 'Master the relationships between equal chords and perpendicular bisectors from the centre.',
        scenarioGen: generateChordScenarios,
        learn: {
            concept: 'The centre of a circle exerts a symmetrical pull on its chords.',
            rules: [
                {
                    title: 'Equal Chords',
                    f: '$\\text{If } AB = CD \\text{ then } \\angle AOB = \\angle COD$',
                    chart: () => <CirclesGraphMini config={{ type: 'equal-chords', data: { angle: 60 } }} />,
                    d: 'Equal chords subtend perfectly equal angles at the centre of the circle.',
                    ex: 'If two chords both measure 5 cm, their angles from the centre will perfectly match.',
                    tip: 'Think of equal chords as identical rubber bands stretched across the circle.',
                },
                {
                    title: 'Perpendicular from Centre',
                    f: '$OM \\perp AB \\implies AM = MB$',
                    chart: () => <CirclesGraphMini config={{ type: 'perp-bisect', data: { fullChord: 8, halfChord: 4, perp: 3 } }} />,
                    d: 'A line dropped at 90° from the centre to a chord will slice the chord perfectly in half.',
                    ex: 'If the full chord is 8 cm, the perpendicular bisect will hit it at the 4 cm mark.',
                    tip: 'This always creates a right triangle where the radius is the hypotenuse!',
                }
            ],
        },
    },
    {
        id: 'arcs-and-angles',
        nodeId: 'cirlces-9-0002',
        title: 'Arcs & Subtended Angles',
        subtitle: 'Skill 2 · Theorems 9.7 to 9.9',
        icon: '🔄',
        color: '#1a237e',
        desc: 'Deduce unknown angles using the powerful Angle at Centre theorem.',
        scenarioGen: generateArcAngleScenarios,
        learn: {
            concept: 'Arcs bounce angles off the boundary or the centre in highly predictable ratios.',
            rules: [
                {
                    title: 'Angle at Centre Theorem',
                    f: '$\\text{Centre Angle} = 2 \\times \\text{Boundary Angle}$',
                    chart: () => <CirclesGraphMini config={{ type: 'centre-angle', data: { boundAngle: 50, centreAngle: 100, unknown: '' } }} />,
                    d: 'The angle an arc subtends at the centre is exactly DOUBLE the angle it subtends at any other point on the circle.',
                    ex: 'If the boundary angle is $40^{\\circ}$, the angle touching the centre is $80^{\\circ}$.',
                    tip: 'Always trace the lines back to the same arc to confirm the relationship.',
                },
                {
                    title: 'Angles in Same Segment',
                    f: '$\\angle ACB = \\angle ADB$',
                    chart: () => <CirclesGraphMini config={{ type: 'same-segment', data: { angle: 45 } }} />,
                    d: 'Angles created from the same base arc but bouncing to different points in the same segment are absolutely equal.',
                    ex: 'If one person looks at a chord from position C and another from position D, their viewing angles are identical.',
                    tip: 'Look for two triangles sharing the same baseline chord.',
                }
            ],
        },
    },
    {
        id: 'cyclic-quadrilaterals',
        nodeId: 'cirlces-9-0003',
        title: 'Cyclic Quadrilaterals',
        subtitle: 'Skill 3 · Theorems 9.10 to 9.11',
        icon: '🔳',
        color: '#b71c1c',
        desc: 'Solve properties of 4-sided shapes trapped inside a perfect circle.',
        scenarioGen: generateCyclicQuadScenarios,
        learn: {
            concept: 'When all four vertices of a quadrilateral touch the circle boundary, magical sum properties emerge.',
            rules: [
                {
                    title: 'Opposite Angles Sum',
                    f: '$\\angle A + \\angle C = 180^{\\circ}$',
                    chart: () => <CirclesGraphMini config={{ type: 'cyclic-quad', data: { knownA: 80, unknownC: 100, labels: ['A', 'C'] } }} />,
                    d: 'The sum of either pair of opposite angles of a cyclic quadrilateral is always $180^{\\circ}$.',
                    ex: 'If the bottom-left angle is $60^{\\circ}$, the top-right angle MUST be $120^{\\circ}$.',
                    tip: 'They are supplementary, just like a linear pair, but separated by space.',
                },
                {
                    title: 'Exterior Angle',
                    f: '$\\text{Exterior Angle} = \\text{Interior Opposite Angle}$',
                    chart: () => <CirclesGraphMini config={{ type: 'cyclic-quad-ext', data: { interiorOpp: 110 } }} />,
                    d: 'If you extend one side of the quadrilateral outside the circle, that new exterior angle matches the interior angle on the opposite side.',
                    ex: 'If the interior opposite is $100^{\\circ}$, the exterior is $100^{\\circ}$.',
                    tip: 'This works because both relate to $180^{\\circ}$ via different rules.',
                }
            ],
        },
    }
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Circles9Skills() {
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
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/circles/intro')}>🌟 Intro</button>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/circles/terminology')}>📖 Terminology</button>
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
                                            <LatexText text={skill.learn.rules[selectedLearnIdx].f} />
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
                                        <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>Example Logic</h4>
                                            <div style={{ fontSize: 14, color: '#334155', lineHeight: 1.65 }}>
                                                <LatexText text={skill.learn.rules[selectedLearnIdx].ex} />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
                                        {selectedLearnIdx > 0 ? (
                                            <button onClick={() => setSelectedLearnIdx(s => s - 1)} style={{ padding: '8px 16px', background: 'transparent', border: '2px solid #cbd5e1', color: '#64748b', borderRadius: 50, fontWeight: 700, cursor: 'pointer' }}>
                                                ← Prev Rule
                                            </button>
                                        ) : <div />}
                                        {selectedLearnIdx < skill.learn.rules.length - 1 ? (
                                            <button onClick={() => setSelectedLearnIdx(s => s + 1)} style={{ padding: '8px 24px', background: skill.color, border: 'none', color: '#fff', borderRadius: 50, fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 10px ${skill.color}40` }}>
                                                Next Rule →
                                            </button>
                                        ) : (
                                            <button onClick={() => setView('practice')} style={{ padding: '8px 24px', background: '#10b981', border: 'none', color: '#fff', borderRadius: 50, fontWeight: 800, cursor: 'pointer', boxShadow: `0 4px 10px rgba(16,185,129,0.4)` }}>
                                                Start Practice 🎯
                                            </button>
                                        )}
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <CirclesScenarioPracticeEngine 
                            scenarios={skill.scenarioGen()} 
                            title={skill.title} 
                            color={skill.color} 
                            onBack={goBack}
                            nodeId={skill.nodeId}
                        />
                    ) : (
                        <CirclesScenarioAssessmentEngine 
                            scenarios={skill.scenarioGen()} 
                            title={skill.title} 
                            color={skill.color} 
                            onBack={goBack}
                            nodeId={skill.nodeId + '-assess'}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={styles['page']}>
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/circles')}>← Back to Module</button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/circles/intro')}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/circles/terminology')}>📖 Terminology</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                </div>
            </nav>
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 40 }}>
                <div style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                            Circles <span style={{ color: '#0f766e' }}>Skills</span>
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

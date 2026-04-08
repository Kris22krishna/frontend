import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../lines_and_angles_9.module.css';
import { LatexText } from '../../../../../LatexText';

import LAScenarioPracticeEngine from './Engines/LAScenarioPracticeEngine';
import LAScenarioAssessmentEngine from './Engines/LAScenarioAssessmentEngine';
import {
    generateLinearPairScenarios,
    generateVOAScenarios,
    generateParallelLinesScenarios,
    generateAngleSumScenarios,
} from './Engines/LAScenarioUtils';
import {
    LinearPairChart, VOAChart, ParallelLinesChart, AngleTypesChart, CoInteriorAnglesChart
} from '../components/LADynamicCharts';

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'linear-pair',
        nodeId: 'b5091003-0001-0000-0000-000000000000',
        title: 'Linear Pair Axiom',
        subtitle: 'Skill 1 · Supplementary Angles',
        icon: '↔️',
        color: '#0f4c81',
        desc: 'Master the concept that angles on a straight line add up to 180°.',
        scenarioGen: generateLinearPairScenarios,
        learn: {
            concept: 'When a ray stands on a straight line, it splits a straight angle ($180^{\\circ}$) into two adjacent angles.',
            rules: [
                {
                    title: 'The Axiom',
                    f: '$\\angle A + \\angle B = 180^{\\circ}$',
                    chart: LinearPairChart,
                    d: 'If the two outer arms form a straight line, the adjacent angles are supplementary.',
                    ex: 'If one angle is $120^{\\circ}$, the other must be $180^{\\circ} - 120^{\\circ} = 60^{\\circ}$.',
                    tip: 'Think of a straight line as half of a full circle ($360^{\\circ} \\div 2 = 180^{\\circ}$).',
                }
            ],
        },
    },
    {
        id: 'vertically-opposite',
        nodeId: 'b5091003-0002-0000-0000-000000000000',
        title: 'Vertically Opposite Angles',
        subtitle: 'Skill 2 · Intersecting Lines',
        icon: '✂️',
        color: '#1a237e',
        desc: 'Deduce unknown angles when two lines cross, forming an "X".',
        scenarioGen: generateVOAScenarios,
        learn: {
            concept: 'When two straight lines cross, they form 4 angles. The ones opposite each other are always equal.',
            rules: [
                {
                    title: 'Theorem 6.1 (VOA)',
                    f: '$\\text{Top Angle} = \\text{Bottom Angle}$',
                    chart: VOAChart,
                    d: 'If two lines intersect, the vertically opposite angles are equal.',
                    ex: 'If the top angle is $50^{\\circ}$, the bottom angle is strictly $50^{\\circ}$.\nThe adjacent side angle forms a linear pair, so it is $180^{\\circ} - 50^{\\circ} = 130^{\\circ}$.',
                    tip: 'Look for the "X" shape. The angles directly across the vertex are identical twins.',
                }
            ],
        },
    },
    {
        id: 'parallel-transversal',
        nodeId: 'b5091003-0003-0000-0000-000000000000',
        title: 'Parallel Lines & Transversals',
        subtitle: 'Skill 3 · Grids & Intersections',
        icon: '🛤️',
        color: '#b71c1c',
        desc: 'Analyze angles formed when one line cuts across two parallel lines.',
        scenarioGen: generateParallelLinesScenarios,
        learn: {
            concept: 'A transversal cutting parallel lines creates repeating patterns of equal and supplementary angles.',
            rules: [
                {
                    title: 'Alternate & Corresponding',
                    f: '$\\text{Corresponding} = \\text{Equal, } \\text{Alternate Int.} = \\text{Equal}$',
                    chart: ParallelLinesChart,
                    d: 'Corresponding angles sit in the same relative spot. Alternate interior angles are on opposite sides of the transversal between the tracks.',
                    ex: 'If the top-right angle is $60^{\\circ}$, the bottom-right is also $60^{\\circ}$.\nThe alternate interior angle is also $60^{\\circ}$.',
                    tip: 'Trace an F for corresponding, a Z for alternate interior, and a C for co-interior.',
                },
                {
                    title: 'Co-interior Angles',
                    f: '$\\angle x + \\angle y = 180^{\\circ}$',
                    chart: CoInteriorAnglesChart,
                    d: 'Interior angles on the same side of the transversal add up to $180^{\\circ}$.',
                    ex: 'If the top interior is $120^{\\circ}$, the bottom interior is $60^{\\circ}$.',
                    tip: 'Parallel lines keep the transversal trapped; the sum of the trapped angles is 180.',
                }
            ],
        },
    },
    {
        id: 'angle-sum',
        nodeId: 'b5091003-0004-0000-0000-000000000000',
        title: 'Angle Sum & Complex Proving',
        subtitle: 'Skill 4 · Putting it Together',
        icon: '🧠',
        color: '#0f766e',
        desc: 'Combine linear pairs, VOA, and 360° sums to solve complex diagrams.',
        scenarioGen: generateAngleSumScenarios,
        learn: {
            concept: 'Real problems mix multiple rules. You must trace the logic step-by-step.',
            rules: [
                {
                    title: 'Angles Around a Point',
                    f: '$\\sum \\text{Angles} = 360^{\\circ}$',
                    chart: AngleTypesChart,
                    d: 'If you trace a full circle around any vertex, the angles must exactly equal $360^{\\circ}$.',
                    ex: 'If three angles around a point are $100^{\\circ}, 120^{\\circ},\\text{ and } 50^{\\circ}$, the fourth is $360 - 270 = 90^{\\circ}$.',
                    tip: 'Never assume a line is straight unless the problem states it, or unless you can prove the angles sum to 180.',
                }
            ],
        },
    },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function LinesAndAngles9Skills() {
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
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/lines-and-angles/intro')}>🌟 Intro</button>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/lines-and-angles/terminology')}>📖 Terminology</button>
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
                            <LAScenarioPracticeEngine
                                scenarios={skill.scenarioGen()}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={goBack}
                                nodeId={skill.nodeId}
                            />
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <LAScenarioAssessmentEngine
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
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/lines-and-angles')}>← Back to Module</button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/lines-and-angles/intro')}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/lines-and-angles/terminology')}>📖 Terminology</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                </div>
            </nav>
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 40 }}>
                <div style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                            Lines and Angles <span style={{ color: '#0f766e' }}>Skills</span>
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../triangles_9.module.css';
import { LatexText } from '../../../../../LatexText';

import TrianglesScenarioPracticeEngine from './Engines/TrianglesScenarioPracticeEngine';
import TrianglesScenarioAssessmentEngine from './Engines/TrianglesScenarioAssessmentEngine';
import {
    generateSASScenarios,
    generateASAScenarios,
    generateSSSScenarios,
    generateRHSScenarios
} from './Engines/TrianglesScenarioUtils.jsx';
import {
    SASChart, ASAChart, SSSChart, RHSChart
} from '../components/TrianglesDynamicCharts';

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'sas-congruence',
        nodeId: 'triangles9-0001',
        title: 'SAS Congruence Axiom',
        subtitle: 'Skill 1 · Side-Angle-Side',
        icon: '📐',
        color: '#0f4c81',
        desc: 'Master the concept that two sides and the included angle guarantee congruence.',
        scenarioGen: generateSASScenarios,
        learn: {
            concept: 'To guarantee two triangles are identical, ensure two sides match and the angle sandwiched exactly between them is equal.',
            rules: [
                {
                    title: 'The Axiom',
                    f: '$\\text{Side} = \\text{Side}, \\text{Angle} = \\text{Angle}, \\text{Side} = \\text{Side}$',
                    chart: SASChart,
                    d: 'If two sides and the included angle of one triangle equal two sides and the included angle of another, the triangles are congruent.',
                    ex: 'If $AB=PQ$, $\\angle B = \\angle Q$, and $BC=QR$, then $\\triangle ABC \\cong \\triangle PQR$.',
                    tip: 'The angle MUST be sandwiched. If it is not, SAS does not apply (SSA is invalid).',
                }
            ],
        },
    },
    {
        id: 'asa-congruence',
        nodeId: 'triangles9-0002',
        title: 'ASA/AAS Congruence',
        subtitle: 'Skill 2 · Angle-Side-Angle',
        icon: '🔄',
        color: '#1a237e',
        desc: 'Solve congruencies using two angles and a side.',
        scenarioGen: generateASAScenarios,
        learn: {
            concept: 'If you know two angles, you mathematically know the third. Any corresponding side length ensures congruence.',
            rules: [
                {
                    title: 'ASA Theorem',
                    f: '$\\text{Angle} = \\text{Angle}, \\text{Included Side} = \\text{Side}, \\text{Angle} = \\text{Angle}$',
                    chart: ASAChart,
                    d: 'Two triangles are congruent if two angles and the included side match exactly.',
                    ex: 'If $\\angle B=\\angle Q$, $BC=QR$, and $\\angle C=\\angle R$, they are congruent.',
                    tip: 'Because of the 180° property, Angle-Angle-Side (AAS) is an equally valid corollary extension of ASA.',
                }
            ],
        },
    },
    {
        id: 'sss-congruence',
        nodeId: 'triangles9-0003',
        title: 'SSS Congruence',
        subtitle: 'Skill 3 · Side-Side-Side',
        icon: '📏',
        color: '#b71c1c',
        desc: 'When all three side lengths are known and equal.',
        scenarioGen: generateSSSScenarios,
        learn: {
            concept: 'If the boundary walls of a triangle are fixed, the interior angles cannot flex. The shape is strictly rigid.',
            rules: [
                {
                    title: 'SSS Theorem',
                    f: '$\\text{Side } 1 = \\text{Side } 1, \\text{Side } 2 = \\text{Side } 2, \\text{Side } 3 = \\text{Side } 3$',
                    chart: SSSChart,
                    d: 'If three sides of one triangle are matching identically to three sides of another triangle, they are fully congruent.',
                    ex: 'If $AB=ST$, $BC=TU$, and $AC=SU$, the triangles are fundamentally identical.',
                    tip: 'You don\'t need to measure a single angle if you can confirm all three sides.',
                }
            ],
        },
    },
    {
        id: 'rhs-congruence',
        nodeId: 'triangles9-0004',
        title: 'RHS Congruence',
        subtitle: 'Skill 4 · Right angle-Hypotenuse-Side',
        icon: '📐',
        color: '#0f766e',
        desc: 'A special quick rule exclusively for Right-Angled Triangles.',
        scenarioGen: generateRHSScenarios,
        learn: {
            concept: 'In right triangles, the Pythagorean theorem locks the lengths so tightly that just knowing the Hypotenuse and one leg is enough.',
            rules: [
                {
                    title: 'RHS Theorem',
                    f: '$\\angle = 90^{\\circ}, \\text{Hypotenuse} = \\text{Hypotenuse}, \\text{Side} = \\text{Side}$',
                    chart: RHSChart,
                    d: 'In right triangles, if the hypotenuse and one leg equal their counterparts, the triangles are congruent.',
                    ex: 'If both triangles have a $90^{\\circ}$ angle, and their longest side matches, plus one vertical leg matches, they are identical.',
                    tip: 'Do not use this unless the problem explicitly states or proves a 90° angle!',
                }
            ],
        },
    },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Triangles9Skills() {
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
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/triangles/intro')}>🌟 Intro</button>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/triangles/terminology')}>📖 Terminology</button>
                        <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '20px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className={styles['quiz-container']} style={{ maxWidth: 1060 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}05`, border: `2px solid ${skill.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
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
                                        <button className={styles['btn-primary']} onClick={() => setView('practice')} style={{ padding: '14px 32px', fontSize: 16, background: '#4F46E5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Mastered? Try Practice →</button>
                                        <button className={styles['nav-back']} onClick={() => setView('assessment')}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <div style={{ maxWidth: 920, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <TrianglesScenarioPracticeEngine
                                scenarios={skill.scenarioGen()}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={goBack}
                                nodeId={skill.nodeId}
                            />
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <TrianglesScenarioAssessmentEngine
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
        <div className={styles['page']} style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/triangles')}>← Back to Module</button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/triangles/intro')}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/triangles/terminology')}>📖 Terminology</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                </div>
            </nav>
            <div style={{ flex: 1, paddingBottom: 40 }}>
                <div style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                            Triangles <span style={{ color: '#0f766e' }}>Skills</span>
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

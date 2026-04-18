import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../quadrilaterals_9.module.css';
import { LatexText } from '../../../../../LatexText';
import { 
    ParallelogramChart, 
    RectangleChart, 
    RhombusChart, 
    SquareChart, 
    TrapeziumChart, 
    KiteChart, 
    MidPointTheoremChart 
} from '../components/QuadrilateralsDynamicCharts';

import { generateQuadrilateralsScenarios } from './Engines/QuadrilateralsScenarioUtils';
import QuadrilateralsScenarioPracticeEngine from './Engines/QuadrilateralsScenarioPracticeEngine';
import QuadrilateralsScenarioAssessmentEngine from './Engines/QuadrilateralsScenarioAssessmentEngine';

const SKILLS = [
    {
        id: 'quad-properties',
        title: 'Parallelogram Properties',
        icon: '▱',
        color: '#0f4c81',
        desc: 'Master the core rules: opposite sides, opposite angles, and diagonals bisecting each other.',
        learn: {
            concept: 'Parallelograms are the foundation of quadrilateral properties. Master these to solve complex proofs.',
            rules: [
                {
                    title: 'Opposite Sides are Equal',
                    f: '$AB = CD$ and $AD = BC$',
                    chart: ParallelogramChart,
                    d: 'In a parallelogram, opposite sides are always equal in length and parallel to each other.',
                    ex: 'If the top side of a parallelogram is $10$ cm, the bottom side is also $10$ cm.',
                    tip: 'Count the hash marks on the sides—matching marks mean equal lengths.'
                },
                {
                    title: 'Opposite Angles are Equal',
                    f: '$\\angle A = \\angle C$ and $\\angle B = \\angle D$',
                    chart: ParallelogramChart,
                    d: 'Angles diametrically opposite to each other in a parallelogram have the exact same measure.',
                    ex: 'If the bottom-left angle is $60^{\\circ}$, then the top-right angle is also $60^{\\circ}$.',
                    tip: 'Remember that adjacent angles always add up to $180^{\\circ}$ (co-interior angles).'
                },
                {
                    title: 'Diagonals Bisect Each Other',
                    f: '$AO = OC$ and $BO = OD$',
                    chart: ParallelogramChart,
                    d: 'When you draw both diagonals, the point where they cross cuts each diagonal exactly in half.',
                    ex: 'If the total length of diagonal $AC$ is $14$, then distance from the corner to the center $AO$ is $7$.',
                    tip: 'Bisect means "cut into two equal pieces".'
                }
            ]
        }
    },
    {
        id: 'special-quads',
        title: 'Special Quadrilaterals',
        icon: '▭',
        color: '#10b981',
        desc: 'Solve scenarios involving Rectangles, Rhombuses, Squares, Trapezia, and Kites.',
        learn: {
            concept: 'Different quadrilaterals have special rules for diagonals and angles. Spot them quickly.',
            rules: [
                {
                    title: 'Rectangles',
                    f: '$\\angle = 90^{\\circ}$ and Diagonals are Equal',
                    chart: RectangleChart,
                    d: 'A rectangle is a parallelogram where all angles are $90^{\\circ}$ and both diagonals are exactly the same length.',
                    ex: 'If diagonal $AC = 10$, then diagonal $BD$ must also be $10$.',
                    tip: 'A rectangle inherits all parallelogram properties PLUS equal diagonals.'
                },
                {
                    title: 'Rhombuses',
                    f: 'All Sides Equal, Diagonals $\\perp$',
                    chart: RhombusChart,
                    d: 'A rhombus has all 4 sides equal. Additionally, its diagonals intersect at exactly $90^{\\circ}$ (perpendicular).',
                    ex: 'If the diagonals cross, the 4 small triangles formed in the middle are all right-angled triangles.',
                    tip: 'Rhombuses also bisect the interior angles at the vertices.'
                },
                {
                    title: 'Squares',
                    f: 'The Ultimate Quadrilateral',
                    chart: SquareChart,
                    d: 'A square is both a rectangle and a rhombus. All sides equal, all angles $90^{\\circ}$, and diagonals are equal and perpendicular.',
                    ex: 'If it\'s a square, its diagonals cut it into four identical right-angled isosceles triangles.',
                    tip: 'Every square is a rectangle AND a rhombus, but not vice-versa.'
                }
            ]
        }
    },
    {
        id: 'midpoint-theorem',
        title: 'The Mid-point Theorem',
        icon: '🔺',
        color: '#d97706',
        desc: 'Calculate segments inside triangles using the powerful mid-point parallel rules.',
        learn: {
            concept: 'The mid-point theorem connects the properties of triangles to parallel lines and quadrilaterals.',
            rules: [
                {
                    title: 'Mid-point Theorem',
                    f: '$EF \\parallel BC$ and $EF = \\frac{1}{2} BC$',
                    chart: MidPointTheoremChart,
                    d: 'The line segment joining the mid-points of two sides of a triangle is parallel to the third side and is half of its length.',
                    ex: 'If the bottom base $BC$ of the triangle is $12$ cm, the mid-segment $EF$ above it is exactly $6$ cm long.',
                    tip: 'If you see dual hash marks on both legs of a triangle, immediately apply the theorem.'
                },
                {
                    title: 'Converse of Mid-point',
                    f: 'A line through mid-point parallel to base bisects the third side',
                    chart: MidPointTheoremChart,
                    d: 'If you draw a line from the mid-point of one side, parallel to the base, it automatically bisects the other side.',
                    ex: 'If you start at the middle of the left side and draw parallel to the bottom, you will arrive exactly at the middle of the right side.',
                    tip: 'This is extremely useful in proof questions for proving sides are equal.'
                }
            ]
        }
    }
];

export default function Quadrilaterals9Skills() {
    const navigate = useNavigate();
    
    // View state: 'menu', 'practice', 'assess', 'learn'
    const [view, setView] = useState('menu');
    const [activeSkillId, setActiveSkillId] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    // Generated payload
    const [scenarios, setScenarios] = useState([]);
    const [activeSkillTitle, setActiveSkillTitle] = useState('');
    const [activeColor, setActiveColor] = useState('#0f4c81');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    const handleLearn = (skillId) => {
        setActiveSkillId(skillId);
        setSelectedLearnIdx(0);
        setView('learn');
    };

    const handlePractice = (skillId, title, color) => {
        const payload = generateQuadrilateralsScenarios(skillId, 20);
        setScenarios(payload);
        setActiveSkillId(skillId);
        setActiveSkillTitle(title);
        setActiveColor(color);
        setView('practice');
    };

    const handleAssess = (skillId, title, color) => {
        const payload = generateQuadrilateralsScenarios(skillId, 20);
        setScenarios(payload);
        setActiveSkillId(skillId);
        setActiveSkillTitle(title);
        setActiveColor(color);
        setView('assess');
    };

    const handleBackToMenu = () => {
        setView('menu');
        setActiveSkillId(null);
        setScenarios([]);
    };

    const activeSkillObj = activeSkillId ? SKILLS.find(s => s.id === activeSkillId) : null;
    
    if (view !== 'menu' && activeSkillObj) {
        return (
            <div className={styles['page']} style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
                <nav className={styles['nav']} style={view === 'learn' ? { position: 'sticky', top: 0, zIndex: 100 } : {}}>
                    <button className={styles['nav-back']} onClick={handleBackToMenu}>← Back to Skills</button>
                    <div className={styles['nav-links']}>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/quadrilaterals/intro')}>🌟 Intro</button>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/quadrilaterals/terminology')}>📖 Terminology</button>
                        <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '20px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className={styles['quiz-container']} style={{ maxWidth: 1060 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeSkillObj.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                                    {activeSkillObj.icon}
                                </div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                                    Learn: {activeSkillObj.title}
                                </h1>
                            </div>

                            <div className={styles['learn-grid']}>
                                <aside className={styles['learn-sidebar']}>
                                    {activeSkillObj.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            className={`${styles['sidebar-btn']} ${selectedLearnIdx === ri ? styles['active'] : ''}`}
                                            style={{ '--skill-color': activeSkillObj.color }}>
                                            <div className={styles['sidebar-btn-num']}>{ri + 1}</div>
                                            <span className={styles['sidebar-btn-title']}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>
                                <main className={`${styles['details-window']} ${styles['details-window-anim']}`} key={selectedLearnIdx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: activeSkillObj.color }}>{activeSkillObj.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {selectedLearnIdx + 1} OF {activeSkillObj.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 28 }}>{activeSkillObj.icon}</div>
                                    </div>
                                    <div style={{ background: `${activeSkillObj.color}08`, padding: '18px', borderRadius: 16, border: `2px solid ${activeSkillObj.color}20`, marginBottom: 22, textAlign: 'center' }}>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: activeSkillObj.color, letterSpacing: 0.5 }}>
                                            <LatexText text={activeSkillObj.learn.rules[selectedLearnIdx].f} />
                                        </div>
                                    </div>
                                    
                                    {activeSkillObj.learn.rules[selectedLearnIdx].chart && (
                                        <div style={{ marginBottom: 22, padding: 16, background: '#f8fafc', borderRadius: 16, display: 'flex', justifyContent: 'center' }}>
                                            {React.createElement(activeSkillObj.learn.rules[selectedLearnIdx].chart)}
                                        </div>
                                    )}

                                    <div className={styles['rule-split']}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>Explanation</h4>
                                            <div style={{ fontSize: 15, lineHeight: 1.65, color: '#0f172a', margin: 0 }}>
                                                <LatexText text={activeSkillObj.learn.rules[selectedLearnIdx].d} />
                                            </div>
                                            <div style={{ marginTop: 16, background: 'rgba(20,184,166,0.05)', padding: '12px', borderRadius: 12, border: '1px solid rgba(20,184,166,0.12)' }}>
                                                <div style={{ margin: 0, fontSize: 13.5, color: '#64748b' }}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Tip: </span>
                                                    <LatexText text={activeSkillObj.learn.rules[selectedLearnIdx].tip} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: activeSkillObj.color, marginBottom: 8 }}>Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)' }}>
                                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                                                    <LatexText text={activeSkillObj.learn.rules[selectedLearnIdx].ex} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                        <button className={styles['btn-primary']} onClick={() => handlePractice(activeSkillObj.id, activeSkillObj.title, activeSkillObj.color)} style={{ background: activeSkillObj.color, border: 'none' }}>Mastered? Try Practice →</button>
                                        <button className={styles['nav-back']} onClick={() => handleAssess(activeSkillObj.id, activeSkillObj.title, activeSkillObj.color)}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <div style={{ maxWidth: 920, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <QuadrilateralsScenarioPracticeEngine scenarios={scenarios} title={activeSkillTitle} color={activeColor} onBack={handleBackToMenu} nodeId={`quadrilaterals9-skill-${activeSkillId}`} />
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <QuadrilateralsScenarioAssessmentEngine scenarios={scenarios} title={activeSkillTitle} color={activeColor} onBack={handleBackToMenu} nodeId={`quadrilaterals9-assess-${activeSkillId}`} />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // MENU VIEW
    return (
        <div className={styles['page']} style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            {/* ── TOP NAV ──────────────────────────────────── */}
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/quadrilaterals')}>
                    ← Back to Module
                </button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/quadrilaterals/intro')}>🌟 Intro</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/quadrilaterals/terminology')}>📖 Terminology</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ flex: 1, paddingBottom: '40px' }}>
                <div className={styles['module-hero']}>
                    <h1 className={styles['module-title']}>
                        Quadrilaterals{' '}
                        <span className={styles['accent-text']} style={{ background: 'linear-gradient(90deg, #0f4c81, #10b981)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Logic Array</span>
                    </h1>
                    <p className={styles['module-subtitle']}>
                        Select a skill system. Practice infinitely with instant feedback, then switch to Assess to test your absolute competence under exam conditions.
                    </p>
                </div>

                <div className={styles['section']}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Choose a skill · Practice with mixed scenarios · Take a timed assessment.</div>
                    </div>
                    <div className={styles['skills-list']}>
                        {SKILLS.map((skill) => (
                            <div key={skill.id} className={styles['skill-card']} style={{ borderColor: `${skill.color}30` }}>
                                <div className={styles['skill-info']}>
                                    <div className={styles['skill-icon']} style={{ background: `${skill.color}15`, color: skill.color, fontSize: 28 }}>
                                        {skill.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{skill.title}</div>
                                        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0f172a' }}>{skill.title}</h3>
                                        <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{skill.desc}</p>
                                    </div>
                                </div>
                                <div className={styles['skill-actions']}>
                                    <button 
                                        style={{ padding: '8px 16px', background: '#fff', border: `2px solid ${skill.color}`, color: skill.color, borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => handleLearn(skill.id)}>
                                        Learn
                                    </button>
                                    <button 
                                        style={{ padding: '8px 16px', background: '#fff', border: `2px solid ${skill.color}`, color: skill.color, borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => handlePractice(skill.id, skill.title, skill.color)}>
                                        Practice
                                    </button>
                                    <button 
                                        style={{ padding: '8px 16px', background: skill.color, border: 'none', color: '#fff', borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => handleAssess(skill.id, skill.title, skill.color)}>
                                        Assess
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

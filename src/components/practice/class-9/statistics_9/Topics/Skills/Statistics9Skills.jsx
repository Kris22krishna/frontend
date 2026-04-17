import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../statistics_9.module.css';
import { LatexText } from '../../../../../LatexText';

import StatisticsScenarioPracticeEngine from './Engines/StatisticsScenarioPracticeEngine';
import StatisticsScenarioAssessmentEngine from './Engines/StatisticsScenarioAssessmentEngine';
import {
    generateBarGraphScenarios,
    generateHistogramScenarios,
    generateFrequencyPolygonScenarios
} from './Engines/StatisticsScenarioUtils';

import { BarGraphChart, HistogramChart, VaryingHistogramChart, FrequencyPolygonChart } from '../components/StatisticsDynamicCharts';

const SKILLS = [
    {
        id: 'bar-graphs',
        nodeId: 'stat-9-0001',
        title: 'Bar Graphs & Data Visualization',
        subtitle: 'Skill 1 · Reading Metrics',
        icon: '📊',
        color: '#0f4c81',
        desc: 'Understand how to represent and read categorical data using bars of uniform widths.',
        scenarioGen: generateBarGraphScenarios,
        learn: {
            concept: 'A bar graph represents data with categorical variables. The height of the bar is proportional to the value it represents.',
            rules: [
                {
                    title: 'Rule 1: Uniform Widths and Gaps',
                    f: 'All bars must have equal width and equal spacing.',
                    chart: () => <div style={{ display:'flex', justifyContent:'center' }}><BarGraphChart /></div>,
                    d: 'To avoid misleading visual representations, every bar in a bar graph must be of the same width. The gap between consecutive bars must also be uniform.',
                    ex: 'If the first bar is 2cm wide with a 1cm gap, all subsequent bars must be 2cm wide with 1cm gaps.',
                    tip: 'Only the height (or length) of the bar changes based on the data value!'
                }
            ]
        }
    },
    {
        id: 'histograms',
        nodeId: 'stat-9-0002',
        title: 'Histograms: Uniform & Varying Widths',
        subtitle: 'Skill 2 · Continuous Data',
        icon: '📶',
        color: '#059669',
        desc: 'Construct histograms for continuous grouped frequency distributions with or without uniform widths.',
        scenarioGen: generateHistogramScenarios,
        learn: {
            concept: 'Histograms represent grouped continuous data where class limits share boundaries, meaning there are no gaps between bars.',
            rules: [
                {
                    title: 'Rule 1: No Gaps for Continuous Data',
                    f: 'Upper limit of class 1 = Lower limit of class 2',
                    chart: () => <div style={{ display:'flex', justifyContent:'center' }}><HistogramChart /></div>,
                    d: 'Unlike bar graphs, histograms have no gaps between bars because the data is continuous.',
                    ex: 'Notice the classes: 0-10, 10-20, 20-30. The boundary 10 is shared, so the bars touch.',
                    tip: 'If data is not continuous (e.g., 1-10, 11-20), you must convert it to continuous (0.5-10.5, 10.5-20.5) before drawing a histogram.'
                },
                {
                    title: 'Rule 2: Varying Class Widths',
                    f: '$\\text{Adjusted Frequency} = \\frac{\\text{Minimum class size}}{\\text{Class size}} \\times \\text{Frequency}$',
                    chart: () => <div style={{ display:'flex', justifyContent:'center' }}><VaryingHistogramChart /></div>,
                    d: 'When class widths are not uniform, drawing heights proportional to frequencies is misleading because the area becomes disproportionate. We must adjust the heights so the area represents the frequency.',
                    ex: 'If min width is 10, and a class width is 20 with frequency 15. \nAdjusted Height = (10 / 20) × 15 = 7.5.',
                    tip: 'Always check if the class widths are equal before plotting!'
                }
            ]
        }
    },
    {
        id: 'frequency-polygons',
        nodeId: 'stat-9-0003',
        title: 'Frequency Polygons',
        subtitle: 'Skill 3 · Line Representations',
        icon: '📉',
        color: '#b71c1c',
        desc: 'Plot classmarks and frequencies to create frequency polygons without plotting histograms first.',
        scenarioGen: generateFrequencyPolygonScenarios,
        learn: {
            concept: 'A frequency polygon is a line graph created by joining the mid-points of class intervals corresponding to their frequencies.',
            rules: [
                {
                    title: 'Step 1: Finding Class-Marks',
                    f: '$\\text{Class-mark} = \\frac{\\text{Lower limit} + \\text{Upper limit}}{2}$',
                    chart: () => <div style={{ display:'flex', justifyContent:'center' }}><FrequencyPolygonChart /></div>,
                    d: 'Instead of drawing a whole bar, we represent the class by its mid-point, called the class-mark.',
                    ex: 'For class 10-20, class-mark = (10 + 20) / 2 = 15. We plot the point (15, frequency).',
                    tip: 'A frequency polygon must touch the x-axis at both ends! We imagine a class before the first class and a class after the last class with frequency zero to close the polygon.'
                }
            ]
        }
    }
];

export default function Statistics9Skills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;
    const goBack = () => { setView('list'); setSelectedLearnIdx(0); };

    if (view !== 'list' && skill) {
        return (
            <div className={styles['page']}>
                <nav className={styles['nav']} style={view === 'learn' ? { position: 'sticky', top: 0, zIndex: 100 } : {}}>
                    <button className={styles['nav-back']} onClick={goBack}>← Back to Skills</button>
                    <div className={styles['nav-links']}>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/statistics/intro')}>🌟 Introduction</button>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/statistics/terminology')}>📖 Terminology</button>
                        <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '20px 24px 0', paddingBottom: 40, flex: 1, overflowY: 'auto' }}>
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

                            <div className={styles['learn-grid']} style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 280px) 1fr', gap: 24 }}>
                                <aside className={styles['learn-sidebar']} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            style={{
                                                padding: '16px', borderRadius: 16, border: 'none', background: selectedLearnIdx === ri ? `${skill.color}10` : '#f8fafc',
                                                color: selectedLearnIdx === ri ? skill.color : '#64748b', cursor: 'pointer', textAlign: 'left',
                                                transition: 'all 0.2s', borderLeft: `4px solid ${selectedLearnIdx === ri ? skill.color : 'transparent'}`,
                                                fontWeight: selectedLearnIdx === ri ? 800 : 600, fontFamily: 'Open Sans'
                                            }}>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: selectedLearnIdx === ri ? skill.color : '#94a3b8', marginBottom: 4 }}>RULE {ri + 1}</div>
                                            <span style={{ fontSize: 14 }}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>
                                <main className={styles['details-window']} style={{ background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                    </div>
                                    <div style={{ background: `${skill.color}08`, padding: '18px', borderRadius: 16, border: `2px solid ${skill.color}20`, marginBottom: 22, textAlign: 'center' }}>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: skill.color, letterSpacing: 0.5 }}>
                                            <LatexText text={skill.learn.rules[selectedLearnIdx].f} />
                                        </div>
                                    </div>
                                    
                                    {skill.learn.rules[selectedLearnIdx].chart && (
                                        <div style={{ marginBottom: 22, padding: 16, background: '#f8fafc', borderRadius: 16 }}>
                                            {React.createElement(skill.learn.rules[selectedLearnIdx].chart)}
                                        </div>
                                    )}

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>Explanation</h4>
                                            <div style={{ fontSize: 15, lineHeight: 1.65, color: '#0f172a', margin: 0 }}>
                                                <LatexText text={skill.learn.rules[selectedLearnIdx].d} />
                                            </div>
                                            <div style={{ marginTop: 16, background: 'rgba(20,184,166,0.05)', padding: '12px', borderRadius: 12, border: '1px solid rgba(20,184,166,0.12)' }}>
                                                <div style={{ margin: 0, fontSize: 13.5, color: '#64748b' }}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Hint: </span>
                                                    <LatexText text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>Example Logic</h4>
                                            <div style={{ fontSize: 14, color: '#334155', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
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
                        <StatisticsScenarioPracticeEngine 
                            scenarios={skill.scenarioGen()} 
                            title={skill.title} 
                            color={skill.color} 
                            onBack={goBack}
                            nodeId={skill.nodeId}
                        />
                    ) : (
                        <StatisticsScenarioAssessmentEngine 
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
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/statistics')}>← Back to Module</button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/statistics/intro')}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/statistics/terminology')}>📖 Terminology</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                </div>
            </nav>
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 40 }}>
                <div style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                            Statistics <span style={{ color: '#0f4c81' }}>Skills</span>
                        </h1>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Choose a skill · Learn rules · Practice reading charts · Take a timed assessment.</div>
                    </div>
                    <div className={styles['skills-list']} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                        {SKILLS.map((sk, idx) => (
                            <div key={sk.id} className={styles['skill-card']} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: 24, borderRadius: 20, border: '1px solid #e2e8f0' }}>
                                <div className={styles['skill-info']} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                                    <div className={styles['skill-icon']} style={{ background: `${sk.color}15`, fontSize: 32, padding: 16, borderRadius: 16, width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {sk.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: sk.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{sk.subtitle}</div>
                                        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>{sk.title}</h3>
                                        <p style={{ margin: 0, fontSize: 13, color: '#64748b', maxWidth: 450, lineHeight: 1.5 }}>{sk.desc}</p>
                                    </div>
                                </div>
                                <div className={styles['skill-actions']} style={{ display: 'flex', gap: 12 }}>
                                    <button
                                        style={{ padding: '10px 20px', background: '#fff', border: `2px solid ${sk.color}`, color: sk.color, borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => { setActiveSkill(idx); setView('learn'); }}>Learn</button>
                                    <button
                                        style={{ padding: '10px 20px', background: '#fff', border: `2px solid ${sk.color}`, color: sk.color, borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => { setActiveSkill(idx); setView('practice'); }}>Practice</button>
                                    <button
                                        style={{ padding: '10px 20px', background: sk.color, border: `2px solid ${sk.color}`, color: '#fff', borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
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

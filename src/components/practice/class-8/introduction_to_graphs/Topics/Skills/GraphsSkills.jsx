import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../graphs.css';

import {
    PatientTemperatureChart, TrendLinesChart, LinearGraphChart,
    CoordinateGridChart,
} from '../components/DynamicCharts';

import GraphsPracticeEngine from './Engines/GraphsPracticeEngine';
import GraphsAssessmentEngine from './Engines/GraphsAssessmentEngine';
import LinearGraphPracticeEngine from './LinearGraphPracticeEngine';
import LinearGraphAssessmentEngine from './LinearGraphAssessmentEngine';

import {
    buildLineGraphPracticePool,
    buildLineGraphAssessmentPool,
    buildLinearGraphPracticePool,
    buildLinearGraphAssessmentPool,
} from './GraphsSkillsData';

// ─── SKILLS DATA ─────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'linegraph',
        title: 'Line Graphs',
        subtitle: 'Skill 1 · Reading & Drawing',
        icon: '📈',
        color: '#059669',
        desc: 'Read trends, rising/falling lines, and accurately interpret data from line graphs.',
        practicePool: buildLineGraphPracticePool,
        assessmentPool: buildLineGraphAssessmentPool,
        learn: {
            concept: 'A line graph is the go-to tool for showing how a quantity changes over time.',
            rules: [
                { title: 'Reading a Value', f: 'X-axis → Up → Y-axis', chart: PatientTemperatureChart, d: 'To find the Y-value at a given time: locate the time on the X-axis, move straight UP until you hit the line, then read ACROSS to the Y-axis.', ex: 'Temperature at 3 PM: Find 3 PM on X-axis → go up to line → read temperature (38°C) on Y-axis.', tip: 'Always start from the axis label — never guess by eye from the middle of the graph.' },
                { title: 'Rising Line = Increase', f: 'Line ↗ = Increasing value', chart: TrendLinesChart, d: 'A line going UP from left to right shows the quantity is INCREASING.', ex: 'A plant height graph rising from 5 cm to 20 cm over 4 weeks — the line goes upward.', tip: 'Steeper rise = faster increase.' },
                { title: 'Falling Line = Decrease', f: 'Line ↘ = Decreasing value', chart: TrendLinesChart, d: 'A line going DOWN from left to right shows the quantity is DECREASING.', ex: "A patient's fever drops from 40°C to 37°C overnight — the line falls.", tip: 'Steeper fall = faster decrease.' },
                { title: 'Flat Line = No Change', f: 'Horizontal line → = Constant', chart: TrendLinesChart, d: 'A flat horizontal line means the quantity is STAYING THE SAME.', ex: "A car's speed is 60 km/h for 3 hours — speed-time graph is a horizontal line at 60.", tip: 'Flat sections represent periods with zero change.' },
                { title: 'Choosing the Scale', f: 'Data range ÷ Number of intervals', d: 'Choose a scale that fits ALL your data without crowding.', ex: 'Data 20°C to 44°C (range=24). With 6 grid lines → scale of 4°C per division.', tip: 'Always use a uniform scale — each grid box must represent the same amount.' },
            ],
        },
    },
    {
        id: 'lineargraph',
        title: 'Application of Line Graphs',
        subtitle: 'Skill 2 · Plot & Analyse Real-World Data',
        icon: '📐',
        color: '#4f46e5',
        desc: 'Plot straight-line graphs from real-life data. Analyse quantity–cost, simple interest, and distance–time relationships.',
        practicePool: buildLinearGraphPracticePool,
        assessmentPool: buildLinearGraphAssessmentPool,
        learn: {
            concept: 'Linear graphs appear in everyday situations: shopping costs, bank interest, and travel distances all follow straight-line patterns.',
            rules: [
                { title: 'What Makes a Linear Graph?', f: 'y = mx → Straight line', chart: LinearGraphChart, d: 'Any equation where y ∝ x produces a STRAIGHT LINE through the origin.', ex: 'y = 2x gives: (0,0),(1,2),(2,4),(3,6) — plot and join for a straight line.', tip: 'If the highest power of x is 1, the graph is always a straight line.' },
                { title: 'Making a Table of Values', f: 'Choose x → Calculate y → Plot', chart: CoordinateGridChart, d: 'Choose simple x values, substitute into the equation to find y, then plot each (x,y) point and join them.', ex: 'y = 3x: x=0→y=0, x=1→y=3, x=2→y=6, x=3→y=9.', tip: 'Always use at least 3 points to confirm the line is truly straight.' },
                { title: 'Quantity vs Cost', f: 'Cost = Price × Quantity', chart: LinearGraphChart, d: 'When price per unit is fixed, cost and quantity are in direct proportion. Graph of Cost vs. Quantity is a straight line through origin.', ex: 'Apples at ₹5 each: (1,₹5),(2,₹10),(3,₹15),(4,₹20),(5,₹25). Straight line!', tip: 'A steeper Cost graph = higher price per unit.' },
                { title: 'Simple Interest vs Principal', f: 'SI = (P × R × T) ÷ 100', chart: LinearGraphChart, d: 'For fixed rate and time, SI ∝ Principal. Graph of SI vs. Principal is a straight line through origin.', ex: 'At 8% for 1 yr: ₹1000→₹80, ₹2000→₹160, ₹3000→₹240. Straight line!', tip: 'Graph passes through (0,0) — ₹0 deposit earns ₹0 interest.' },
                { title: 'Time and Distance', f: 'Distance = Speed × Time', chart: LinearGraphChart, d: 'At constant speed, distance ∝ time. Graph of Distance vs. Time is a straight line with slope = speed.', ex: 'Car at 40 km/h: (1,40),(2,80),(3,120),(4,160). Slope = 40.', tip: 'Steeper slope = faster speed. Flat line = object has stopped.' },
            ],
        },
    },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function GraphsSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;
    const goBack = () => { setView('list'); setSelectedLearnIdx(0); };

    if (view !== 'list' && skill) {
        return (
            <div className="grph-page">
                <nav className="grph-nav">
                    <button className="grph-nav-back" onClick={goBack}>← Back to Skills</button>
                    <div className="grph-nav-links">
                        <button className="grph-nav-link" onClick={() => navigate('/senior/grade/8/introduction-to-graphs/introduction')}>🌟 Intro</button>
                        <button className="grph-nav-link" onClick={() => navigate('/senior/grade/8/introduction-to-graphs/terminology')}>📖 Terminology</button>
                        <button className="grph-nav-link grph-nav-link--active">🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '20px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className="grph-lexicon-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>
                            <div className="grph-learn-grid">
                                <aside className="grph-learn-sidebar">
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            className={`grph-sidebar-btn${selectedLearnIdx === ri ? ' active' : ''}`}
                                            style={{ '--skill-color': skill.color }}>
                                            <div className="grph-sidebar-btn-num">{ri + 1}</div>
                                            <span className="grph-sidebar-btn-title">{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>
                                <main className="details-window-anim grph-details-window" key={selectedLearnIdx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 28 }}>{skill.icon}</div>
                                    </div>
                                    <div style={{ background: `${skill.color}08`, padding: '20px', borderRadius: 16, border: `2px solid ${skill.color}20`, marginBottom: 24, textAlign: 'center' }}>
                                        <div style={{ fontSize: 28, fontWeight: 800, color: skill.color, letterSpacing: 1 }}>{skill.learn.rules[selectedLearnIdx].f}</div>
                                    </div>
                                    {skill.learn.rules[selectedLearnIdx].chart && (
                                        <div style={{ marginBottom: 20 }}>
                                            {React.createElement(skill.learn.rules[selectedLearnIdx].chart, { height: 200 })}
                                        </div>
                                    )}
                                    <div className="grph-rule-split">
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>Explanation</h4>
                                            <p style={{ fontSize: 16, lineHeight: 1.65, color: '#0f172a', margin: 0 }}>{skill.learn.rules[selectedLearnIdx].d}</p>
                                            {skill.learn.rules[selectedLearnIdx].tip && (
                                                <div style={{ marginTop: 18, background: 'rgba(20,184,166,0.05)', padding: '14px', borderRadius: 14, border: '1px solid rgba(20,184,166,0.12)' }}>
                                                    <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}><span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Tip: </span>{skill.learn.rules[selectedLearnIdx].tip}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: skill.color, marginBottom: 8 }}>Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{skill.learn.rules[selectedLearnIdx].ex}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                        <button className="grph-btn-primary" onClick={() => setView('practice')} style={{ background: skill.color }}>Mastered this? Try Practice →</button>
                                        <button className="grph-btn-secondary" onClick={() => setView('assessment')}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <div style={{ maxWidth: 920, margin: '0 auto' }}>
                            {skill.id === 'lineargraph' ? (
                                <LinearGraphPracticeEngine color={skill.color} onBack={goBack} />
                            ) : (
                                <GraphsPracticeEngine
                                    questionPool={skill.practicePool()}
                                    sampleSize={20}
                                    title={`Practice: ${skill.title}`}
                                    color={skill.color}
                                    onBack={goBack}
                                />
                            )}
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto' }}>
                            {skill.id === 'lineargraph' ? (
                                <LinearGraphAssessmentEngine color={skill.color} onBack={goBack} />
                            ) : (
                                <GraphsAssessmentEngine
                                    questionPool={skill.assessmentPool()}
                                    sampleSize={10}
                                    title={skill.title}
                                    color={skill.color}
                                    onBack={goBack}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="grph-page">
            <nav className="grph-nav">
                <button className="grph-nav-back" onClick={() => navigate('/senior/grade/8/introduction-to-graphs')}>← Back to Graphs</button>
                <div className="grph-nav-links">
                    <button className="grph-nav-link" onClick={() => navigate('/senior/grade/8/introduction-to-graphs/introduction')}>🌟 Introduction</button>
                    <button className="grph-nav-link" onClick={() => navigate('/senior/grade/8/introduction-to-graphs/terminology')}>📖 Terminology</button>
                    <button className="grph-nav-link grph-nav-link--active">🎯 Skills</button>
                </div>
            </nav>
            <div className="grph-lexicon-container" style={{ maxWidth: 1100, margin: '30px auto 40px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 32 }}>
                    <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Line Graphs <span style={{ color: '#00afb9' }}>Skills</span>
                    </h1>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Learn, practice, and assess with 10 timed questions per skill.</div>
                </div>
                <div className="grph-skills-list">
                    {SKILLS.map((sk, idx) => (
                        <div key={sk.id} className="grph-skill-card">
                            <div className="grph-skill-info">
                                <div className="grph-skill-icon" style={{ background: `${sk.color}15` }}>{sk.icon}</div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: sk.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{sk.subtitle}</div>
                                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0f172a' }}>{sk.title}</h3>
                                    <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{sk.desc}</p>
                                </div>
                            </div>
                            <div className="grph-skill-actions">
                                <button className="grph-skill-btn-outline" style={{ '--btn-color': sk.color }} onClick={() => { setActiveSkill(idx); setView('learn'); }}>Learn</button>
                                <button className="grph-skill-btn-outline" style={{ '--btn-color': sk.color }} onClick={() => { setActiveSkill(idx); setView('practice'); }}>Practice</button>
                                <button className="grph-skill-btn-filled" style={{ '--btn-color': sk.color }} onClick={() => { setActiveSkill(idx); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Completed both skills? You're officially a <span style={{ color: '#059669' }}>Line Graph Pro!</span> 📊</p>
                </div>
            </div>
        </div>
    );
}

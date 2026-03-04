import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../graphs.css';

// Chart components
import {
    PatientTemperatureChart, TrendLinesChart, LinearGraphChart,
    CoordinateGridChart, OriginHighlightChart, OrderedPairHighlightChart
} from '../components/DynamicCharts';

// Engines
import GraphsPracticeEngine from './Engines/GraphsPracticeEngine';
import GraphsAssessmentEngine from './Engines/GraphsAssessmentEngine';

// Question pools
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
            concept: 'A line graph is the go-to tool for showing how a quantity changes over time. Mastering how to read and draw them is a fundamental data skill you will use throughout school and life.',
            rules: [
                { title: 'Reading a Value', f: 'X-axis → Up → Y-axis', chart: PatientTemperatureChart, d: 'To find the Y-value at a given time: locate the time on the X-axis, move straight UP until you hit the line, then read ACROSS to the Y-axis.', ex: 'Temperature at 3 PM: Find 3 PM on X-axis → go up to line → read temperature (say 38°C) on Y-axis.', tip: 'Always start from the axis label — never guess by eye from the middle of the graph.' },
                { title: 'Rising Line = Increase', f: 'Line ↗ = Increasing value', chart: TrendLinesChart, d: 'A line that goes UP from left to right shows the quantity is INCREASING over that time period.', ex: 'If a plant height graph rises from 5 cm to 20 cm over 4 weeks, the line goes upward.', tip: 'Steeper rise = faster increase. Gentle rise = slow increase.' },
                { title: 'Falling Line = Decrease', f: 'Line ↘ = Decreasing value', chart: TrendLinesChart, d: 'A line that goes DOWN from left to right shows the quantity is DECREASING over that time period.', ex: 'If a patient\'s fever drops from 40°C to 37°C overnight, the line falls.', tip: 'Steeper fall = faster decrease. A very steep fall means a rapid drop.' },
                { title: 'Flat Line = No Change', f: 'Horizontal line → = Constant', chart: TrendLinesChart, d: 'A perfectly flat horizontal line means the quantity is STAYING THE SAME — no increase or decrease.', ex: 'If a car\'s speed is 60 km/h for 3 hours, the speed-time graph is a horizontal line at 60.', tip: 'Look for flat sections — they represent periods with zero change.' },
                { title: 'Choosing the Scale', f: 'Data range ÷ Number of intervals', d: 'When drawing, choose a scale that fits ALL your data on the grid without crowding. Divide the range of values by the number of available grid lines.', ex: 'Data ranges from 20°C to 44°C (range = 24). With 6 grid lines, use scale of 4°C per division.', tip: 'Always use a uniform scale — each grid box must represent the same amount.' },
            ],
        },
    },
    {
        id: 'lineargraph',
        title: 'Application of Line Graphs',
        subtitle: 'Skill 2 · Linear Graphs & Coordinates',
        icon: '📐',
        color: '#4f46e5',
        desc: 'Plot straight-line graphs from equations. Explore distance-time and perimeter-side relationships.',
        practicePool: buildLinearGraphPracticePool,
        assessmentPool: buildLinearGraphAssessmentPool,
        learn: {
            concept: 'A linear graph is a straight-line graph produced by a linear equation like y = 2x or d = 50t. These graphs directly connect algebra to geometry — and are the foundation of coordinate mathematics in Class 9 and 10.',
            rules: [
                { title: 'What Makes a Linear Graph?', f: 'y = mx → Straight line', chart: LinearGraphChart, d: 'Any equation where y is directly proportional to x (y = mx, or y = mx + c) produces a STRAIGHT LINE graph. The graph never curves.', ex: 'y = 2x gives: (0,0), (1,2), (2,4), (3,6) — plot and join for a straight line through origin.', tip: 'If the highest power of x in the equation is 1, the graph will always be a straight line.' },
                { title: 'Making a Table of Values', f: 'Choose x → Calculate y → Plot', chart: CoordinateGridChart, d: 'To draw the graph of an equation: choose simple values for x (like 0, 1, 2, 3), substitute into the equation to find y, then plot each (x, y) point.', ex: 'y = 3x: x=0 → y=0, x=1 → y=3, x=2 → y=6, x=3 → y=9.', tip: 'Always use at least 3 points to confirm the line is truly straight.' },
                { title: 'Distance-Time Linear Graph', f: 'd = speed × time', chart: LinearGraphChart, d: 'When speed is constant, distance and time are directly proportional. The graph of distance vs. time is a straight line through the origin. The slope of the line equals the speed.', ex: 'Car at 60 km/h: t=1→d=60, t=2→d=120, t=3→d=180. Straight line, slope = 60.', tip: 'A steeper slope = faster speed. A horizontal line = the object has stopped.' },
                { title: 'Perimeter-of-Square Graph', f: 'P = 4 × side', d: 'The perimeter of a square is 4 × side length. This linear relationship produces a straight-line graph. Doubling the side doubles the perimeter.', ex: 'side=1→P=4, side=2→P=8, side=3→P=12, side=4→P=16. Slope of line = 4.', tip: 'The slope of the line EQUALS the multiplying factor in the equation.' },
                { title: 'Comparing Slopes', f: 'Steeper line = Faster rate of change', d: 'If you plot two linear graphs on the same axes, the steeper one has a larger slope — meaning the quantity changes faster per unit on the X-axis.', ex: 'y = 4x is steeper than y = 2x. For every 1 unit increase in x, y = 4x goes up by 4 while y = 2x goes up by only 2.', tip: 'Comparing slopes visually is quick — always note which line climbs faster when comparing two relationships.' },
            ],
        },
    },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function GraphsSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    const goBack = () => { setView('list'); setSelectedLearnIdx(0); };

    // ── SKILL DETAIL VIEW ─────────────────────────────────────────────────────
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
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="grph-learn-grid">
                                {/* Sidebar */}
                                <aside className="grph-learn-sidebar">
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            className={`grph-sidebar-btn${selectedLearnIdx === ri ? ' active' : ''}`}
                                            style={{ '--skill-color': skill.color }}
                                        >
                                            <div className="grph-sidebar-btn-num">{ri + 1}</div>
                                            <span className="grph-sidebar-btn-title">{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detail Window */}
                                <main className="details-window-anim grph-details-window" key={selectedLearnIdx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 28 }}>{skill.icon}</div>
                                    </div>

                                    {/* Formula box */}
                                    <div style={{ background: `${skill.color}08`, padding: '20px', borderRadius: 16, border: `2px solid ${skill.color}20`, marginBottom: 24, textAlign: 'center' }}>
                                        <div style={{ fontSize: 28, fontWeight: 800, color: skill.color, letterSpacing: 1 }}>
                                            {skill.learn.rules[selectedLearnIdx].f}
                                        </div>
                                    </div>

                                    {/* Inline chart */}
                                    {skill.learn.rules[selectedLearnIdx].chart && (
                                        <div style={{ marginBottom: 20 }}>
                                            {React.createElement(skill.learn.rules[selectedLearnIdx].chart, { height: 200 })}
                                        </div>
                                    )}

                                    {/* Explanation + example */}
                                    <div className="grph-rule-split">
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>Explanation</h4>
                                            <p style={{ fontSize: 16, lineHeight: 1.65, color: '#0f172a', margin: 0 }}>{skill.learn.rules[selectedLearnIdx].d}</p>
                                            {skill.learn.rules[selectedLearnIdx].tip && (
                                                <div style={{ marginTop: 18, background: 'rgba(20,184,166,0.05)', padding: '14px', borderRadius: 14, border: '1px solid rgba(20,184,166,0.12)' }}>
                                                    <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>
                                                        <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Tip: </span>
                                                        {skill.learn.rules[selectedLearnIdx].tip}
                                                    </p>
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

                                    {/* Footer buttons */}
                                    <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                        <button className="grph-btn-primary" onClick={() => setView('practice')} style={{ background: skill.color }}>
                                            Mastered this? Try Practice →
                                        </button>
                                        <button className="grph-btn-secondary" onClick={() => setView('assessment')}>
                                            Take Assessment
                                        </button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <div style={{ maxWidth: 900, margin: '0 auto' }}>
                            <GraphsPracticeEngine
                                questionPool={skill.practicePool()}
                                sampleSize={20}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={goBack}
                            />
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto' }}>
                            <GraphsAssessmentEngine
                                questionPool={skill.assessmentPool()}
                                sampleSize={10}
                                title={skill.title}
                                color={skill.color}
                                onBack={goBack}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // ── SKILLS LIST ───────────────────────────────────────────────────────────
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
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Line Graphs <span style={{ color: '#00afb9' }}>Skills</span>
                    </h1>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', letterSpacing: 0.5 }}>
                        Learn, practice 20 dynamic questions, and assess with 10 timed questions per skill.
                    </div>
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
                                <button
                                    className="grph-skill-btn-outline"
                                    style={{ '--btn-color': sk.color }}
                                    onClick={() => { setActiveSkill(idx); setView('learn'); }}
                                >Learn</button>
                                <button
                                    className="grph-skill-btn-outline"
                                    style={{ '--btn-color': sk.color }}
                                    onClick={() => { setActiveSkill(idx); setView('practice'); }}
                                >Practice</button>
                                <button
                                    className="grph-skill-btn-filled"
                                    style={{ '--btn-color': sk.color }}
                                    onClick={() => { setActiveSkill(idx); setView('assessment'); }}
                                >Assess</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                        Completed both skills? You're officially a{' '}
                        <span style={{ color: '#059669' }}>Line Graph Pro!</span> 📊
                    </p>
                </div>
            </div>
        </div>
    );
}

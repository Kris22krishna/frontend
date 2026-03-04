import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../graphs.css';

// Chart components
import { PatientTemperatureChart, CoordinateGridChart, TrendLinesChart, LinearGraphChart, XAxisHighlightChart, YAxisHighlightChart, OriginHighlightChart, OrderedPairHighlightChart, ScaleHighlightChart } from '../components/DynamicCharts';

// ─── TERMINOLOGY DATA ───────────────────────────────────────────────────────
const TERMS = [
    {
        name: 'Line Graph',
        icon: '📈',
        color: '#059669',
        def: 'A graph that uses points connected by line segments to show how data changes over time. Each point represents a value at a specific time or interval.',
        example: 'Daily temperature plotted over a week — connected by lines to show the temperature trend.',
        realWorld: 'Hospital patient temperature charts, weather forecast graphs.',
        chart: PatientTemperatureChart,
    },
    {
        name: 'X-axis',
        icon: '↔️',
        color: '#0891b2',
        def: 'The horizontal axis in a coordinate plane. In a line graph, the X-axis usually represents the independent variable — typically time (hours, days, months).',
        example: 'If plotting temperature over days, the X-axis shows Days: Day 1, Day 2, Day 3...',
        realWorld: 'The timeline on a weather chart — showing hours or days.',
        chart: XAxisHighlightChart,
    },
    {
        name: 'Y-axis',
        icon: '↕️',
        color: '#7c3aed',
        def: 'The vertical axis in a coordinate plane. In a line graph, the Y-axis represents the dependent variable — the quantity being measured.',
        example: 'If plotting temperature over days, Y-axis shows Temperature: 20°C, 25°C, 30°C...',
        realWorld: 'The temperature scale on the side of a weather graph.',
        chart: YAxisHighlightChart,
    },
    {
        name: 'Origin',
        icon: '🎯',
        color: '#d97706',
        def: 'The point where both axes meet, with coordinates (0, 0). It is the starting reference point of the coordinate plane.',
        example: 'On a graph of distance vs. time, origin (0,0) means: at time 0, distance is 0.',
        realWorld: 'The corner of a grid map where both the horizontal and vertical scales begin.',
        chart: OriginHighlightChart,
    },
    {
        name: 'Ordered Pair',
        icon: '📍',
        color: '#dc2626',
        def: 'A set of two numbers written as (x, y) that locates a specific point on the coordinate plane. The first number is the x-coordinate, the second is the y-coordinate.',
        example: '(3, 4) means: move 3 units along X-axis, then 4 units up the Y-axis.',
        realWorld: 'GPS coordinates like (latitude, longitude) that pinpoint a location on a map.',
        chart: OrderedPairHighlightChart,
    },
    {
        name: 'Scale',
        icon: '📏',
        color: '#0f766e',
        def: 'The consistent, uniform spacing between values marked on each axis. A good scale ensures the graph is easy to read and accurately represents the data.',
        example: 'If the Y-axis scale is 5 (meaning each grid line = 5 units), values 5, 10, 15, 20 are marked equally.',
        realWorld: 'The numbered markings on a ruler or measuring tape — uniform spacing matters!',
        chart: ScaleHighlightChart,
    },
];

const KEY_IDEAS = [
    {
        title: 'Reading a Line Graph',
        icon: '👁️',
        color: '#059669',
        rules: [
            { title: 'Find a Value', f: 'Go up from X, across to Y', d: 'To find the y-value at a given x: locate x on the horizontal axis, move straight up until you hit the line, then read across to the Y-axis.', ex: 'Temperature at 3 PM → Find 3 on X-axis, move up to line, read temperature on Y-axis.', tip: 'Always start from the axis label, not the line itself.', chart: PatientTemperatureChart },
            { title: 'Find the Time', f: 'Go across from Y, down to X', d: 'To find when a particular value is reached: find the value on Y-axis, move horizontally until you hit the line, then drop down to the X-axis.', ex: 'When did temperature reach 40°C? Find 40 on Y-axis, trace right to line, drop to X-axis.', tip: 'You may find more than one answer if the line crosses that value multiple times.', chart: PatientTemperatureChart },
            { title: 'Read Rising Trend', f: 'Line going up ↗', d: 'A line that rises from left to right shows an INCREASE — the quantity is growing over time.', ex: 'A rising line on a height-vs-age graph means the child is getting taller.', tip: 'Steeper rise = faster increase.', chart: TrendLinesChart },
            { title: 'Read Falling Trend', f: 'Line going down ↘', d: 'A line that falls from left to right shows a DECREASE — the quantity is getting smaller over time.', ex: 'A falling line on a temperature graph shows the patient is recovering.', tip: 'Steeper fall = faster decrease.', chart: TrendLinesChart },
            { title: 'Flat Line Means No Change', f: 'Horizontal line →', d: 'A flat horizontal line means the quantity is CONSTANT — not increasing or decreasing.', ex: 'A flat line on a speed graph means the car is moving at a constant speed.', tip: 'A perfectly flat line means zero change during that period.', chart: TrendLinesChart },
        ],
    },
    {
        title: 'Linear Graphs (Applications)',
        icon: '📐',
        color: '#4f46e5',
        rules: [
            { title: 'What is a Linear Graph?', f: 'y = mx + c → Straight line', d: 'A linear graph is a straight-line graph. When two quantities are in a linear relationship (like y = 2x or y = x + 3), their graph is always a straight line.', ex: 'y = 3x gives points: (0,0), (1,3), (2,6), (3,9) — connect them to get a straight line.', tip: 'Always plot at least 3 points to confirm the line is straight.', chart: LinearGraphChart },
            { title: 'Plotting from a Table', f: 'Table of values → Graph', d: 'Create a table of (x, y) values from the equation, plot each ordered pair on the grid, and join them with a straight line.', ex: 'For y = 2x: (0,0), (1,2), (2,4), (3,6) — plot and join.', tip: 'Choose simple values for x (like 0, 1, 2, 3) to make calculations easy.', chart: CoordinateGridChart },
            { title: 'Distance–Time Relationship', f: 'Distance ∝ Time (constant speed)', d: 'When an object moves at constant speed, distance and time are directly proportional: d = s × t. This produces a straight-line graph through the origin.', ex: 'Car at 60 km/h: after 1h → 60 km, 2h → 120 km, 3h → 180 km. Straight line!', tip: 'Steeper slope = faster speed. A horizontal line means the object is stopped.', chart: LinearGraphChart },
            { title: 'Perimeter of Squares', f: 'P = 4 × side', d: 'Perimeter of a square grows linearly with its side length. Plotting P vs. side gives a straight line showing the linear relationship.', ex: 'Side 1 → P = 4, Side 2 → P = 8, Side 3 → P = 12. Straight line graph!', tip: 'The slope of the line equals 4 (the multiplying factor).', chart: LinearGraphChart },
            { title: 'Reading the Slope (Steepness)', f: 'Steeper = Faster rate of change', d: 'The steepness (slope) of a linear graph tells you the rate of change. A steeper line means the quantity changes more quickly per unit on the X-axis.', ex: 'y = 4x rises faster than y = 2x — both start at origin but y = 4x climbs more steeply.', tip: 'Compare two linear graphs on the same grid to see which increases faster.', chart: LinearGraphChart },
        ],
    },
];

// ─── 10-QUESTION QUIZ ────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
    { q: 'Which axis typically represents TIME in a line graph?', opts: ['X-axis (Horizontal)', 'Y-axis (Vertical)', 'Both axes equally', 'Neither axis'], ans: 0, exp: 'In a line graph, the X-axis (horizontal axis) usually represents the independent variable — which is often time.' },
    { q: 'What does a RISING line in a line graph indicate?', opts: ['A decrease in the quantity', 'An increase in the quantity', 'No change in the quantity', 'The graph is incorrect'], ans: 1, exp: 'A line that goes up from left to right shows an increase — the value of the quantity is growing over time.' },
    { q: 'What are the coordinates of the ORIGIN of a graph?', opts: ['(1, 1)', '(0, 1)', '(1, 0)', '(0, 0)'], ans: 3, exp: 'The origin is where both axes meet. Its coordinates are (0, 0) — zero on both the X and Y axes.' },
    { q: 'For the ordered pair (4, 9), what does the 4 represent?', opts: ['The Y-coordinate', 'The X-coordinate', 'The scale value', 'The origin'], ans: 1, exp: 'In an ordered pair (x, y), the FIRST number is the x-coordinate (horizontal position). So 4 is the x-coordinate.' },
    { q: 'A FLAT horizontal line on a line graph means:', opts: ['Data is increasing', 'Data is decreasing', 'Data is constant (no change)', 'The scale is wrong'], ans: 2, exp: 'A horizontal (flat) line means the quantity is staying the same — there is no increase or decrease during that period.' },
    { q: 'The scale on a graph axis must be:', opts: ['Increasing rapidly', 'Uniform (equal spacing)', 'Different on X and Y', 'Starting at 10'], ans: 1, exp: 'Scale must be UNIFORM — the spacing between each marked value must be equal throughout the axis for the graph to be accurate.' },
    { q: 'The graph of y = 3x always passes through which point?', opts: ['(1, 3)', '(3, 0)', 'Origin (0, 0)', '(3, 1)'], ans: 2, exp: 'Any equation of the form y = mx (with no constant added) passes through the origin (0, 0), because when x = 0, y = 0.' },
    { q: 'A steeper line on a distance–time graph indicates:', opts: ['Slower speed', 'Stopped motion', 'Faster speed', 'Constant acceleration'], ans: 2, exp: 'A steeper slope on a distance–time graph means more distance is covered per unit of time — which means FASTER speed.' },
    { q: 'To plot (5, 8) on a graph, you should:', opts: ['Go up 5, right 8', 'Go right 5, then up 8', 'Go up 8, right 5', 'Go right 8, then up 5'], ans: 1, exp: 'To plot an ordered pair (x, y): first move RIGHT x units along the X-axis, then move UP y units. So (5, 8) → right 5, up 8.' },
    { q: 'Which of the following produces a STRAIGHT LINE graph?', opts: ['y = x²', 'y = 2x + 1', 'y = x³', '1/x'], ans: 1, exp: 'y = 2x + 1 is a linear equation — the relationship between x and y is linear, so its graph is always a straight line.' },
];

// ─── QUIZ ENGINE ─────────────────────────────────────────────────────────────
function QuizEngine({ onBack }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const q = QUIZ_QUESTIONS[current];
    const color = '#059669';
    const progress = ((current + (finished ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === q.ans) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= QUIZ_QUESTIONS.length) setFinished(true);
        else { setCurrent(c => c + 1); setSelected(null); setAnswered(false); }
    };

    if (finished) {
        const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        return (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                    width: 140, height: 140, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 24px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '8px solid #fff'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>out of {QUIZ_QUESTIONS.length}</div>
                    </div>
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 32px' }}>
                    {pct >= 75 ? 'Excellent understanding of graphs vocabulary!' : 'Review the terms and try again for a higher score.'}
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className="grph-btn-primary" onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); }}>
                        Try Again
                    </button>
                    <button className="grph-btn-secondary" onClick={onBack}>Return to Terminology</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {/* Progress */}
            <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Vocabulary Quiz</div>
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q <span style={{ color }}>{current + 1}</span> / {QUIZ_QUESTIONS.length}</div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${color}, #10b981)`, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            {/* Question */}
            <div style={{ background: '#fff', borderRadius: 20, padding: '32px 36px', marginBottom: 20, boxShadow: '0 12px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
                    QUESTION {current + 1}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 24 }}>{q.q}</div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                    {q.opts.map((opt, oi) => {
                        let borderColor = 'rgba(0,0,0,0.04)', bgColor = '#fff', textColor = '#0f172a', dotColor = '#f1f5f9';
                        if (answered) {
                            if (oi === q.ans) { borderColor = '#059669'; bgColor = 'rgba(5,150,105,0.05)'; textColor = '#059669'; dotColor = '#059669'; }
                            else if (oi === selected) { borderColor = '#ef4444'; bgColor = 'rgba(239,68,68,0.05)'; textColor = '#ef4444'; dotColor = '#ef4444'; }
                        } else if (selected === oi) { borderColor = color; bgColor = `${color}05`; dotColor = color; }

                        return (
                            <button key={oi} onClick={() => handleSelect(oi)} disabled={answered}
                                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2.5px solid ${borderColor}`, background: bgColor, cursor: answered ? 'default' : 'pointer', fontSize: 15, color: textColor, textAlign: 'left', transition: 'all 0.2s', fontWeight: selected === oi ? 700 : 500 }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                                {opt}
                            </button>
                        );
                    })}
                </div>

                {answered && (
                    <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 12, background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.15)', fontSize: 13.5, lineHeight: 1.6, color: '#475569' }}>
                        <strong style={{ color }}>💡 Explanation: </strong>{q.exp}
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleNext} disabled={!answered} className="grph-btn-primary"
                    style={{ padding: '12px 40px', opacity: answered ? 1 : 0.4, cursor: answered ? 'pointer' : 'not-allowed' }}>
                    {current + 1 >= QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function GraphsTerminology() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('terms');           // 'terms' | 'ideas' | 'quiz'
    const [activeTerm, setActiveTerm] = useState(0);
    const [activeIdea, setActiveIdea] = useState(0);
    const [activeRule, setActiveRule] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const TABS = [
        { id: 'terms', label: 'Key Terms', icon: '📚' },
        { id: 'ideas', label: 'Key Ideas', icon: '💡' },
        { id: 'quiz', label: 'Test Prep', icon: '✅' },
    ];

    return (
        <div className="grph-page">
            {/* ── TOP NAV ─────────────────────────────── */}
            <nav className="grph-nav">
                <button className="grph-nav-back" onClick={() => navigate('/senior/grade/8/introduction-to-graphs')}>
                    ← Back to Graphs
                </button>
                <div className="grph-nav-links">
                    <button className="grph-nav-link" onClick={() => navigate('/senior/grade/8/introduction-to-graphs/introduction')}>
                        🌟 Introduction
                    </button>
                    <button className="grph-nav-link grph-nav-link--active">📖 Terminology</button>
                    <button className="grph-nav-link" onClick={() => navigate('/senior/grade/8/introduction-to-graphs/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HEADER ────────────────────────────────── */}
            <div style={{ padding: '10px 12px 10px', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                    Line Graphs <span style={{ color: '#4f46e5' }}>Vocabulary</span>
                </h1>
              
            </div>

            {/* ── TABS ────────────────────────────────── */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', padding: '0 12px 12px' }}>
                {TABS.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`grph-tab${tab === t.id ? ' active' : ''}`}>
                        <span>{t.icon}</span> {t.label}
                    </button>
                ))}
            </div>

            {/* ── TAB: KEY TERMS ──────────────────────── */}
            {tab === 'terms' && (
                <div className="grph-section">
                  
                    <div className="grph-learn-grid">
                        {/* Sidebar */}
                        <aside className="grph-learn-sidebar">
                            {TERMS.map((t, i) => (
                                <button key={i} onClick={() => setActiveTerm(i)}
                                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, border: '1px solid', borderColor: activeTerm === i ? t.color : 'rgba(0,0,0,0.05)', background: activeTerm === i ? t.color : '#fff', color: activeTerm === i ? '#fff' : '#0f172a', transition: 'all 0.2s', cursor: 'pointer', textAlign: 'left' }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: activeTerm === i ? 'rgba(255,255,255,0.2)' : `${t.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{t.icon}</div>
                                    <span style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</span>
                                </button>
                            ))}
                        </aside>

                        {/* Detail window */}
                        <main key={activeTerm} className="grph-details-window details-window-anim" style={{ border: `2px solid ${TERMS[activeTerm].color}15` }}>
                            <div className="grph-learn-header-row">
                                <div>
                                    <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: TERMS[activeTerm].color }}>{TERMS[activeTerm].name}</h3>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>TERM {activeTerm + 1} OF {TERMS.length}</div>
                                </div>
                                <div style={{ fontSize: 36 }}>{TERMS[activeTerm].icon}</div>
                            </div>

                            <div style={{ background: `${TERMS[activeTerm].color}05`, padding: 24, borderRadius: 16, border: `2px solid ${TERMS[activeTerm].color}15`, marginBottom: 24 }}>
                                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#0f172a' }}>{TERMS[activeTerm].def}</p>
                            </div>

                            {/* Chart Illustration (if available) */}
                            {TERMS[activeTerm].chart && (
                                <div style={{ marginBottom: 24, padding: 16, background: '#f8fafc', borderRadius: 16 }}>
                                    {React.createElement(TERMS[activeTerm].chart)}
                                </div>
                            )}

                            <div className="grph-rule-split">
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Example</h4>
                                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#0f172a' }}>{TERMS[activeTerm].example}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: TERMS[activeTerm].color, marginBottom: 10 }}>Real World</h4>
                                    <div style={{ background: `${TERMS[activeTerm].color}05`, padding: 20, borderRadius: 16, border: `1px solid ${TERMS[activeTerm].color}15` }}>
                                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#0f172a' }}>{TERMS[activeTerm].realWorld}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grph-learn-footer">
                                <button className="grph-btn-primary" onClick={() => setTab('quiz')}>Ready for the Quiz? →</button>
                                <button className="grph-btn-secondary" onClick={() => setActiveTerm((activeTerm + 1) % TERMS.length)}>
                                    Next: {TERMS[(activeTerm + 1) % TERMS.length].name}
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            )}

            {/* ── TAB: KEY IDEAS ──────────────────────── */}
            {tab === 'ideas' && (
                <div className="grph-section">
                 
                    {/* Idea selector */}
                    <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                        {KEY_IDEAS.map((idea, idx) => (
                            <button key={idx} onClick={() => { setActiveIdea(idx); setActiveRule(0); }}
                                style={{ padding: '12px 24px', borderRadius: 50, border: '2px solid', borderColor: activeIdea === idx ? idea.color : '#e2e8f0', background: activeIdea === idx ? idea.color : '#fff', color: activeIdea === idx ? '#fff' : '#64748b', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span>{idea.icon}</span> {idea.title}
                            </button>
                        ))}
                    </div>

                    <div className="grph-learn-grid">
                        {/* Rule sidebar */}
                        <aside className="grph-learn-sidebar">
                            {KEY_IDEAS[activeIdea].rules.map((rule, ri) => (
                                <button key={ri} onClick={() => setActiveRule(ri)}
                                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, border: '1px solid', borderColor: activeRule === ri ? KEY_IDEAS[activeIdea].color : 'rgba(0,0,0,0.05)', background: activeRule === ri ? KEY_IDEAS[activeIdea].color : '#fff', color: activeRule === ri ? '#fff' : '#0f172a', transition: 'all 0.2s', cursor: 'pointer', textAlign: 'left' }}>
                                    <div style={{ width: 24, height: 24, borderRadius: 6, background: activeRule === ri ? 'rgba(255,255,255,0.2)' : `${KEY_IDEAS[activeIdea].color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, flexShrink: 0 }}>{ri + 1}</div>
                                    <span style={{ fontWeight: 700, fontSize: 14 }}>{rule.title}</span>
                                </button>
                            ))}
                        </aside>

                        {/* Rule detail */}
                        <main key={`${activeIdea}-${activeRule}`} className="grph-details-window details-window-anim" style={{ border: `2px solid ${KEY_IDEAS[activeIdea].color}15` }}>
                            <div className="grph-learn-header-row">
                                <div>
                                    <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: KEY_IDEAS[activeIdea].color }}>{KEY_IDEAS[activeIdea].rules[activeRule].title}</h3>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {activeRule + 1} OF {KEY_IDEAS[activeIdea].rules.length}</div>
                                </div>
                                <div style={{ fontSize: 32 }}>{KEY_IDEAS[activeIdea].icon}</div>
                            </div>

                            <div style={{ background: `${KEY_IDEAS[activeIdea].color}05`, padding: 24, borderRadius: 20, border: `2px solid ${KEY_IDEAS[activeIdea].color}15`, marginBottom: 28, textAlign: 'center' }}>
                                <div style={{ fontSize: 28, fontWeight: 800, color: KEY_IDEAS[activeIdea].color, letterSpacing: 1 }}>{KEY_IDEAS[activeIdea].rules[activeRule].f}</div>
                            </div>

                            {/* Chart Illustration (if available) */}
                            {KEY_IDEAS[activeIdea].rules[activeRule].chart && (
                                <div style={{ marginBottom: 24, padding: 16, background: '#f8fafc', borderRadius: 16 }}>
                                    {React.createElement(KEY_IDEAS[activeIdea].rules[activeRule].chart)}
                                </div>
                            )}

                            <div className="grph-rule-split">
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Explanation</h4>
                                    <p style={{ fontSize: 16, lineHeight: 1.7, color: '#0f172a', margin: 0 }}>{KEY_IDEAS[activeIdea].rules[activeRule].d}</p>
                                    <div style={{ marginTop: 20, background: 'rgba(5,150,105,0.05)', padding: 16, borderRadius: 14, border: '1px solid rgba(5,150,105,0.1)' }}>
                                        <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                                            <span style={{ fontWeight: 800, color: '#059669' }}>🛡️ Key Tip: </span>
                                            {KEY_IDEAS[activeIdea].rules[activeRule].tip}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: KEY_IDEAS[activeIdea].color, marginBottom: 10 }}>Practical Example</h4>
                                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#0f172a' }}>{KEY_IDEAS[activeIdea].rules[activeRule].ex}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grph-learn-footer">
                                <button className="grph-btn-primary" onClick={() => setTab('quiz')}>Test your Knowledge →</button>
                                <button className="grph-btn-secondary" onClick={() => setActiveRule((activeRule + 1) % KEY_IDEAS[activeIdea].rules.length)}>
                                    Next: {KEY_IDEAS[activeIdea].rules[(activeRule + 1) % KEY_IDEAS[activeIdea].rules.length].title}
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            )}

            {/* ── TAB: QUIZ ───────────────────────────── */}
            {tab === 'quiz' && (
                <div className="grph-section">
                    
                    <QuizEngine onBack={() => setTab('terms')} />
                </div>
            )}
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../graphs.css';

// Chart components
import { PatientTemperatureChart, CoordinateGridChart, StepByStepGraphChart } from '../components/DynamicCharts';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What is a Line Graph?',
        icon: '📈',
        color: '#059669',
        short: 'A graph that uses connected points to show how data changes over time.',
        chart: PatientTemperatureChart,
        imageCaption: 'Patient temperature recorded every hour — a classic line graph.',
        bullets: [
            'A LINE GRAPH shows information that changes continuously over time.',
            'Points are plotted on a grid: X-axis = Time, Y-axis = Quantity measured.',
            'Consecutive points are joined by straight line segments — revealing the trend.',
            '📌 NCERT Example: Temperature of a patient recorded every hour over a day.',
            'The rise and fall in the line instantly tells whether temperature is increasing or decreasing.',
        ],
    },
    {
        q: 'WHO',
        label: 'Who Uses Line Graphs?',
        icon: '👩‍⚕️',
        color: '#0891b2',
        short: 'Doctors, meteorologists, economists, engineers, and scientists.',
        chart: null,
        bullets: [
            '🩺 Doctors — Track patient temperature, blood pressure, or heart rate over time.',
            '🌤️ Meteorologists — Plot daily or monthly rainfall and temperature data.',
            '📊 Economists — Show how prices, GDP, or inflation change across years.',
            '🔬 Scientists — Record experimental observations at regular time intervals.',
            '🚗 Engineers — Monitor speed-vs-time and distance-vs-time relationships.',
            'Any field where data changes continuously over time uses line graphs.',
        ],
    },
    {
        q: 'WHEN',
        label: 'When Do We Use a Line Graph?',
        icon: '⏱️',
        color: '#7c3aed',
        short: 'When data changes continuously over time and you want to show a trend.',
        chart: null,
        bullets: [
            '✅ Data is collected over equal time intervals (hours, days, months, years).',
            '✅ You want to show how a quantity increases, decreases, or stays constant.',
            '✅ You want to compare trends of two quantities across the same time period.',
            '✅ The data is continuous — values exist between measured points.',
            '❌ Do NOT use for categories (use a bar graph for "favourite colour" data).',
            '📌 Example: Height of a plant measured every week → perfect for line graph.',
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See Line Graphs?',
        icon: '🌍',
        color: '#d97706',
        short: 'Hospital charts, weather reports, stock markets, and sports statistics.',
        chart: null,
        bullets: [
            '📋 Hospital Charts — Every bedside chart is a line graph of temperature vs. time.',
            '📱 Weather Apps — The hourly temperature forecast is shown as a line graph.',
            '📉 Stock Markets — Share prices plotted over hours, days, and months.',
            '🏃 Fitness Trackers — Step count or heart rate graphed throughout the day.',
            '⚽ Sports Statistics — A player\'s performance score across a season.',
            '🏫 School Reports — Marks in exams plotted across several terms.',
        ],
    },
    {
        q: 'WHY',
        label: 'Why Learn Line Graphs?',
        icon: '💡',
        color: '#dc2626',
        short: 'To read trends, make predictions, and communicate data visually.',
        chart: null,
        bullets: [
            '📈 Show Trends — At a glance you can see if something is increasing or decreasing.',
            '🔮 Help Predict — Extend the line to estimate future values (interpolation).',
            '⚡ Save Time — A graph shows what a table of 20 numbers takes time to read.',
            '🧠 Aid Understanding — Our brains process graphs faster than raw numbers.',
            '📐 Basis of Algebra — Linear graphs connect to equations like y = 2x + 3 in Class 9.',
        ],
    },
    {
        q: 'HOW',
        label: 'How to Draw a Line Graph?',
        icon: '✏️',
        color: '#0f766e',
        short: 'Label axes → choose scale → plot points → connect with straight lines.',
        chart: StepByStepGraphChart,
        imageCaption: 'A localized line graph showing a trend with labeled axes and clear points.',
        bullets: [
            '1️⃣ Draw two axes at right angles — horizontal X-axis and vertical Y-axis.',
            '2️⃣ Label the axes — X-axis for time, Y-axis for the quantity measured.',
            '3️⃣ Choose a UNIFORM scale — divide both axes into equal intervals.',
            '4️⃣ Plot the points — for each (x, y) pair, mark a dot at the correct position.',
            '5️⃣ Join the dots — connect each consecutive point with a straight line segment.',
            '6️⃣ Give a clear title at the top of your graph.',
            '✅ NCERT Tip: Use a zigzag (//) symbol if axes don\'t start from 0.',
        ],
    },
];

export default function GraphsIntro5W1H() {
    const navigate = useNavigate();
    const [openCard, setOpenCard] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggle = (idx) => setOpenCard(prev => prev === idx ? null : idx);

    return (
        <div className="grph-page">
            {/* ── TOP NAV ───────────────────────────────── */}
            <nav className="grph-nav">
                <button className="grph-nav-back" onClick={() => navigate('/senior/grade/8/introduction-to-graphs')}>
                    ← Back to Graphs
                </button>
                <div className="grph-nav-links">
                    <button className="grph-nav-link grph-nav-link--active">🌟 Introduction</button>
                    <button className="grph-nav-link" onClick={() => navigate('/senior/grade/8/introduction-to-graphs/terminology')}>
                        📖 Terminology
                    </button>
                    <button className="grph-nav-link" onClick={() => navigate('/senior/grade/8/introduction-to-graphs/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ───────────────────────────── */}
            <div style={{
                background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 100%)',
                borderBottom: '1px solid #e2e8f0',
                padding: '96px 24px 36px',
                textAlign: 'center'
            }}>

                <h1 style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    fontWeight: 900, color: '#0f172a', margin: '0 0 10px'
                }}>
                    The 6 Big Questions About{' '}
                    <span style={{
                        background: 'linear-gradient(90deg,#059669,#0891b2)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                    }}>
                        Line Graphs
                    </span>
                </h1>
                <p style={{ color: '#64748b', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
                    Click any card to explore. Build a complete picture of what line graphs are and why they matter.
                </p>
            </div>

            {/* ── CARDS GRID ───────────────────────────── */}
            <div className="grph-section">
                <div className="grph-5w1h-grid">
                    {CARDS.map((card, idx) => {
                        const isOpen = openCard === idx;
                        return (
                            <div key={card.q} className="grph-5w1h-card"
                                style={{ borderColor: isOpen ? card.color : undefined }}>

                                {/* Header — always visible */}
                                <div
                                    className="grph-5w1h-header"
                                    onClick={() => toggle(idx)}
                                    style={{ background: isOpen ? `${card.color}10` : undefined }}
                                >
                                    <div className="grph-5w1h-icon" style={{ background: `${card.color}15` }}>
                                        {card.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className="grph-5w1h-label" style={{ color: card.color }}>{card.q}</div>
                                        <div className="grph-5w1h-q">{card.label}</div>
                                        {!isOpen && (
                                            <p style={{ margin: '5px 0 0', fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
                                                {card.short}
                                            </p>
                                        )}
                                    </div>
                                    <div style={{
                                        fontSize: 20, fontWeight: 900, color: card.color,
                                        transition: 'transform 0.3s ease',
                                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        flexShrink: 0, marginLeft: 8
                                    }}>⌄</div>
                                </div>

                                {/* Expandable body */}
                                {isOpen && (
                                    <div className="grph-5w1h-body" style={{ padding: '0 0 20px' }}>

                                        {/* Chart (if available) */}
                                        {card.chart && (
                                            <div style={{ margin: '0 0 20px' }}>
                                                <card.chart />
                                                <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', margin: '6px 0 0', fontStyle: 'italic' }}>
                                                    {card.imageCaption}
                                                </p>
                                            </div>
                                        )}

                                        {/* Bullet points */}
                                        <ul style={{ margin: 0, padding: '0 24px', listStyle: 'none' }}>
                                            {card.bullets.map((b, bi) => (
                                                <li key={bi} style={{
                                                    padding: '7px 0', fontSize: 14.5,
                                                    color: '#334155', lineHeight: 1.65,
                                                    borderBottom: bi < card.bullets.length - 1 ? '1px solid #f1f5f9' : 'none'
                                                }}>
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div style={{ marginTop: 48, textAlign: 'center' }}>
                    <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>
                        Ready to learn the vocabulary? 📖
                    </p>
                    <button
                        className="grph-btn-primary"
                        onClick={() => navigate('/senior/grade/8/introduction-to-graphs/terminology')}
                        style={{ fontSize: 15, padding: '14px 36px' }}
                    >
                        Next: Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}

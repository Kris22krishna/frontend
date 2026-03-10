import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../proportions.css';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What is a Proportion?',
        icon: '⚖️',
        color: '#059669',
        short: 'When two ratios are equal, they form a proportion. Two types: direct and inverse.',
        bullets: [
            'A PROPORTION is a statement that two ratios are equal: a/b = c/d, written as a : b :: c : d.',
            'DIRECT PROPORTION: When one quantity increases, the other increases in the same ratio. Written as y ∝ x or y/x = k.',
            'INVERSE PROPORTION: When one quantity increases, the other decreases so that their product remains constant. Written as x × y = k.',
            '📌 NCERT Example (Direct): If 6 books cost ₹90, then 10 books cost ₹150. The ratio 6:90 = 10:150.',
            '📌 NCERT Example (Inverse): If 4 workers complete a job in 6 days, 8 workers complete it in 3 days. Workers × Days = 24 (constant).',
            'The constant k is called the CONSTANT OF PROPORTIONALITY.',
        ],
    },
    {
        q: 'WHO',
        label: 'Who Uses Proportions?',
        icon: '👩‍🍳',
        color: '#0891b2',
        short: 'Cooks, engineers, scientists, shopkeepers, pharmacists, and architects.',
        bullets: [
            '🧑‍🍳 Cooks — Scale recipes up or down keeping ingredient ratios constant (direct proportion).',
            '🏗️ Engineers & Architects — Use scale drawings where map distance ∝ actual distance (direct proportion).',
            '⚙️ Mechanics — Gear ratios: more teeth on gear A → fewer rotations (inverse proportion).',
            '💊 Pharmacists — Medicine dosage ∝ body weight (direct proportion).',
            '🏭 Factory Managers — More machines → fewer days to produce same output (inverse proportion).',
            '🛒 Shopkeepers — Total cost ∝ number of items bought at fixed price (direct proportion).',
        ],
    },
    {
        q: 'WHEN',
        label: 'When is it Direct vs Inverse?',
        icon: '🔀',
        color: '#7c3aed',
        short: 'Direct: both quantities change in the same direction. Inverse: opposite directions.',
        bullets: [
            '✅ DIRECT PROPORTION: x increases → y increases. x decreases → y decreases. Ratio x/y stays constant.',
            '✅ Example of Direct: Speed is fixed → more time → more distance (d ∝ t).',
            '✅ INVERSE PROPORTION: x increases → y decreases. x decreases → y increases. Product x × y stays constant.',
            '✅ Example of Inverse: Same distance → more speed → less time (s × t = constant).',
            '❌ NOT a proportion at all if the quantities are unrelated (e.g., shoe size and exam marks).',
            '📌 Quick test: If doubling x DOUBLES y → Direct. If doubling x HALVES y → Inverse.',
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See Proportions?',
        icon: '🌍',
        color: '#d97706',
        short: 'Maps, shadows, pipelines, physics, cooking, and financial planning.',
        bullets: [
            '🗺️ Maps & Scale Drawings — 1 cm on map = 5 km in reality (direct proportion).',
            '🌑 Shadows — Length of shadow ∝ height of object at the same time of day (direct proportion).',
            '💧 Filling a Tank — More pipes open → tank fills in fewer minutes (inverse proportion).',
            '⚡ Electrical Circuits — Ohm\'s law: Current = Voltage ÷ Resistance. Fixed voltage → more resistance → less current (inverse).',
            '📐 Trigonometry — Sine and cosine ratios in similar triangles (direct proportion).',
            '💰 Simple Interest — SI = P × R × T ÷ 100. For fixed R & T, SI ∝ P (direct proportion).',
        ],
    },
    {
        q: 'WHY',
        label: 'Why Learn Proportions?',
        icon: '💡',
        color: '#dc2626',
        short: 'Proportions are the foundation of percentages, similarity, trigonometry, and algebra.',
        bullets: [
            '📐 Foundation of Geometry — Similar triangles, scale drawings, and maps all rely on proportion.',
            '💹 Financial Literacy — Percentage, profit/loss, interest are all applications of proportion.',
            '🔬 Science at Every Level — Physics formulae (F = ma, V = IR), chemistry (mole ratios) use proportions.',
            '🧮 Algebra Connection — y = kx (direct) and y = k/x (inverse) are the simplest algebraic relationships.',
            '🌐 Real-World Problem Solving — Recipes, fuel consumption, speed-distance-time — all proportion problems.',
            '📊 Bridge to Class 10 & Beyond — Trigonometry, probability, and coordinate geometry build on proportions.',
        ],
    },
    {
        q: 'HOW',
        label: 'How to Solve Proportion Problems?',
        icon: '✏️',
        color: '#0f766e',
        short: 'Use the unitary method or cross-multiplication. Identify type first, then apply the rule.',
        bullets: [
            '1️⃣ IDENTIFY TYPE: Ask — "Do both quantities increase together?" → Direct. "Does one go up when the other goes down?" → Inverse.',
            '2️⃣ DIRECT — UNITARY METHOD: Find the value for 1 unit, then multiply for the required amount.',
            '   Example: 5 pens cost ₹30. Cost of 8 pens? Cost of 1 pen = 30/5 = ₹6. Cost of 8 pens = 8 × 6 = ₹48.',
            '3️⃣ DIRECT — RATIO METHOD: x₁/y₁ = x₂/y₂ → cross multiply to find the unknown.',
            '4️⃣ INVERSE — PRODUCT METHOD: x₁ × y₁ = x₂ × y₂. Set up equation and solve.',
            '   Example: 6 workers finish in 10 days. How long for 15 workers? 6 × 10 = 15 × d → d = 4 days.',
        ],
    },
];

export default function ProportionsIntro5W1H() {
    const navigate = useNavigate();
    const [openCard, setOpenCard] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggle = (idx) => setOpenCard(prev => prev === idx ? null : idx);

    return (
        <div className="prop-page">
            {/* ── TOP NAV ──────────────────────────────────── */}
            <nav className="prop-nav">
                <button className="prop-nav-back" onClick={() => navigate('/senior/grade/8/direct-and-inverse-proportions')}>
                    ← Back to Proportions
                </button>
                <div className="prop-nav-links">
                    <button className="prop-nav-link prop-nav-link--active">🌟 Introduction</button>
                    <button className="prop-nav-link" onClick={() => navigate('/senior/grade/8/direct-and-inverse-proportions/terminology')}>
                        📖 Terminology
                    </button>
                    <button className="prop-nav-link" onClick={() => navigate('/senior/grade/8/direct-and-inverse-proportions/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div style={{
                background: 'linear-gradient(90deg, #064e3b 0%, #4f46e5 100%)',
                padding: '16px 24px', textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 900, color: '#ffffff', margin: '0 0 4px' }}>
                    Discover Proportions Through{' '}
                    <span style={{ color: '#fde047' }}>6 Big Questions</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, margin: 0, fontWeight: 500 }}>
                    Tap each card to explore ✨
                </p>
            </div>

            {/* ── ACCORDION CARDS ──────────────────────────── */}
            <div className="prop-section">
                <div className="prop-5w1h-grid">
                    {CARDS.map((card, idx) => {
                        const isOpen = openCard === idx;
                        return (
                            <div
                                key={card.q}
                                className="prop-5w1h-card"
                                style={{ borderColor: isOpen ? card.color : undefined }}
                            >
                                {/* Header */}
                                <div
                                    className="prop-5w1h-header"
                                    onClick={() => toggle(idx)}
                                    style={{ background: isOpen ? `${card.color}10` : undefined }}
                                >
                                    <div className="prop-5w1h-icon" style={{ background: `${card.color}15` }}>
                                        {card.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className="prop-5w1h-label" style={{ color: card.color }}>{card.q}</div>
                                        <div className="prop-5w1h-q">{card.label}</div>
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
                                    <div className="prop-5w1h-body" style={{ padding: '0 0 20px' }}>
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
                        className="prop-btn-primary"
                        onClick={() => navigate('/senior/grade/8/direct-and-inverse-proportions/terminology')}
                        style={{ fontSize: 15, padding: '14px 36px' }}
                    >
                        Next: Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}

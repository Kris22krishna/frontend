import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../comparing_quantities.css';
import { LatexText } from '../../../../../LatexText';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What is Comparing Quantities?',
        icon: '⚖️',
        color: '#0f4c81',
        short: 'Using ratios, percentages, and interest to compare amounts and find changes.',
        bullets: [
            'COMPARING QUANTITIES means finding how two amounts relate to each other — who has more, by how much, and in what percentage.',
            'A RATIO $a : b$ compares two quantities of the same kind. Percentage ($\\&$) is a ratio "out of $100$".',
            '$\\text{PERCENTAGE CHANGE} = (\\frac{\\text{Change}}{\\text{Original}}) \\times 100$. Positive = increase; negative = decrease.',
            '📌 NCERT Example: If a shirt costs ₹$400$ and is sold for ₹$500$, the profit is ₹$100$ and $\\text{profit}\\% = (\\frac{100}{400}) \\times 100 = 25\\%$.',
            '$\\text{SIMPLE INTEREST} = \\frac{\\text{P} \\times \\text{R} \\times \\text{T}}{100}$. $\\text{Amount} = \\text{P} + \\text{SI}$.',
            'COMPOUND INTEREST grows "interest on interest" each period. $\\text{CI} > \\text{SI}$ for the same principal after more than $1$ year.',
        ],
    },
    {
        q: 'WHO',
        label: 'Who Uses These Ideas?',
        icon: '👔',
        color: '#1a237e',
        short: 'Shopkeepers, bankers, tax officials, investors, and everyday consumers.',
        bullets: [
            '🛒 Shopkeepers — Mark prices, offer discounts, calculate profit & loss on every sale.',
            '🏦 Banks & NBFCs — Apply interest rates (SI or CI) to loans and savings accounts.',
            '🏛️ Government — Levies GST (Goods & Services Tax) as a percentage of the selling price.',
            '📈 Investors — Compare returns from fixed deposits (SI) vs mutual funds (CI).',
            '🏠 Home buyers — Calculate EMIs and total interest paid on home loans.',
            '👨‍🎓 Students like you — Score percentages, compare marks, understand scholarships!',
        ],
    },
    {
        q: 'WHEN',
        label: 'When Do We Compare Quantities?',
        icon: '📅',
        color: '#6a1b9a',
        short: 'Whenever we measure change, find increase/decrease, or evaluate financial decisions.',
        bullets: [
            '✅ When prices change — % increase or % decrease tells you the real impact of inflation.',
            '✅ During a sale — $30\\%$ off means the $\\text{discount} = 30\\% \\times \\text{marked price}$.',
            '✅ When comparing exam results — "I scored $80\\%$" tells far more than "I got $160/200$".',
            '✅ After investments — Is your money growing fast enough? Compare SI vs CI.',
            '❌ NOT when quantities have different units without conversion (e.g., kg vs litres).',
            '📌 All percentage problems have a BASE (the original amount we compare against).',
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See This?',
        icon: '🌍',
        color: '#b71c1c',
        short: 'Bills, bank statements, market prices, report cards, news articles, and more.',
        bullets: [
            '🛍️ Shopping bills — GST breakdown shown as % of item price.',
            '🏦 Bank passbooks — SI credited every year at a fixed rate.',
            '📊 Stock markets — Share price change shown as %, e.g., "Sensex up 1.5% today".',
            '🎓 Mark sheets — Aggregate percentage from multiple subjects.',
            '🏡 Property — Home prices appreciate by X% per year (compound growth).',
            '💊 Medicine — Drug dosage sometimes calculated as % of body weight.',
        ],
    },
    {
        q: 'WHY',
        label: 'Why Learn Comparing Quantities?',
        icon: '💡',
        color: '#e65100',
        short: 'Financial literacy, smart decision-making, and the foundation of algebra and commerce.',
        bullets: [
            '💰 Financial Literacy — Understanding profit, loss, tax, and interest protects you from being cheated.',
            '📐 Foundation for Algebra — Percentage equations are linear equations in disguise.',
            '📊 Data Interpretation — News, science, and business rely on % change.',
            '🎓 Higher Classes — Class 9 statistics, Class 10 finance, and commerce all build on this.',
            '🌐 Real-World Problem Solving — Compare loan offers, evaluate deals, spot inflated prices.',
            '🔬 Science — Concentration (%), efficiency (%), and error (%) are all percentage concepts.',
        ],
    },
    {
        q: 'HOW',
        label: 'How Do We Solve These Problems?',
        icon: '✏️',
        color: '#0f766e',
        short: 'Use the % formula, profit/loss rules, SI = PRT/100, and the CI compound formula.',
        bullets: [
            '1️⃣ $\\%$ of a number: $(\\frac{\\text{Percent}}{100}) \\times \\text{Number}$. E.g., $15\\%$ of ₹$800 = 0.15 \\times 800 = ₹120$.',
            '2️⃣ $\\%$ Change: $(\\frac{\\text{Change}}{\\text{Original}}) \\times 100$. Always divide by the ORIGINAL (base) value.',
            '3️⃣ $\\text{Profit}\\%: (\\frac{\\text{Profit}}{\\text{CP}}) \\times 100$. $\\text{Loss}\\%: (\\frac{\\text{Loss}}{\\text{CP}}) \\times 100$. Base = Cost Price.',
            '4️⃣ Discount: $\\text{Discount} = \\text{MP} \\times (\\frac{\\text{Discount}\\%}{100})$. $\\text{SP} = \\text{MP} - \\text{Discount}$.',
            '5️⃣ Simple Interest: $\\text{SI} = \\frac{\\text{P} \\times \\text{R} \\times \\text{T}}{100}$. $\\text{Amount } A = P + \\text{SI}$.',
            '6️⃣ Compound Interest: $A = P \\times (1 + \\frac{R}{100})^n$. $\\text{CI} = A - P$. For half-yearly: rate halves, periods double.',
        ],
    },
];

export default function ComparingQuantitiesIntro5W1H() {
    const navigate = useNavigate();
    const [openCard, setOpenCard] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggle = (idx) => setOpenCard((prev) => (prev === idx ? null : idx));

    return (
        <div className="cq-page">
            {/* ── TOP NAV ──────────────────────────────────── */}
            <nav className="cq-nav">
                <button className="cq-nav-back" onClick={() => navigate('/senior/grade/8/comparing-quantities')}>
                    ← Back to Comparing Quantities
                </button>
                <div className="cq-nav-links">
                    <button className="cq-nav-link cq-nav-link--active">🌟 Introduction</button>
                    <button className="cq-nav-link" onClick={() => navigate('/senior/grade/8/comparing-quantities/terminology')}>
                        📖 Terminology
                    </button>
                    <button className="cq-nav-link" onClick={() => navigate('/senior/grade/8/comparing-quantities/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="cq-module-hero">
                <h1 className="cq-module-title">
                    Discover Comparing Quantities Through{' '}
                    <span className="cq-accent-text">6 Big Questions</span>
                </h1>
                <p className="cq-module-subtitle">
                    Tap each card to explore ✨
                </p>
            </div>

            {/* ── ACCORDION CARDS ──────────────────────────── */}
            <div className="cq-section">
                <div className="cq-5w1h-grid">
                    {CARDS.map((card, idx) => {
                        const isOpen = openCard === idx;
                        return (
                            <div
                                key={card.q}
                                className="cq-5w1h-card"
                                style={{ borderColor: isOpen ? card.color : undefined }}
                            >
                                {/* Header */}
                                <div
                                    className="cq-5w1h-header"
                                    onClick={() => toggle(idx)}
                                    style={{ background: isOpen ? `${card.color}10` : undefined }}
                                >
                                    <div className="cq-5w1h-icon" style={{ background: `${card.color}15` }}>
                                        {card.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className="cq-5w1h-label" style={{ color: card.color }}>{card.q}</div>
                                        <div className="cq-5w1h-q">{card.label}</div>
                                        {!isOpen && (
                                            <p style={{ margin: '5px 0 0', fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
                                                {card.short}
                                            </p>
                                        )}
                                    </div>
                                    <div
                                        className={`cq-5w1h-chevron ${isOpen ? 'cq-5w1h-chevron--open' : ''}`}
                                        style={{ color: card.color }}
                                    >⌄</div>
                                </div>

                                {/* Expandable body */}
                                {isOpen && (
                                    <div className="cq-5w1h-body">
                                        <ul className="cq-5w1h-list">
                                            {card.bullets.map((b, bi) => (
                                                <li key={bi} className="cq-5w1h-item">
                                                    <LatexText text={b} />
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
                <div className="cq-cta-section">
                    <p className="cq-cta-text">
                        Ready to learn the vocabulary? 📖
                    </p>
                    <button
                        className="cq-btn-primary cq-btn-large"
                        onClick={() => navigate('/senior/grade/8/comparing-quantities/terminology')}
                    >
                        Next: Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}

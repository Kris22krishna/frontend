import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../proportions.css';

// ─── TERMS DATA ──────────────────────────────────────────────────────────────
const TERMS = [
    {
        name: 'Ratio',
        icon: '🔢',
        color: '#059669',
        def: 'A ratio is a comparison of two quantities of the same kind by division. It tells us how many times one value is compared to another. Written as a : b or a/b.',
        example: 'If a class has 20 boys and 30 girls, the ratio of boys to girls is 20 : 30 = 2 : 3.',
        realWorld: 'Mixing cordial with water in the ratio 1 : 5 means 1 ml of cordial for every 5 ml of water.',
    },
    {
        name: 'Proportion',
        icon: '⚖️',
        color: '#0891b2',
        def: 'A proportion is a statement that two ratios are equal. If a/b = c/d, then a, b, c, d are said to be in proportion, written as a : b :: c : d. Product of means = product of extremes (b × c = a × d).',
        example: '2 : 3 :: 4 : 6 is a proportion because 2/3 = 4/6. Cross-check: 3 × 4 = 2 × 6 = 12. ✓',
        realWorld: 'Map scales: 1 cm : 5 km :: 3 cm : 15 km — the map distance and actual distance are in proportion.',
    },
    {
        name: 'Direct Proportion',
        icon: '📈',
        color: '#7c3aed',
        def: 'Two quantities x and y are in direct proportion if they increase or decrease together in the same ratio. As x increases, y increases. The ratio y/x = k (constant). Written as y ∝ x.',
        example: 'Cost and quantity of apples at a fixed price. If 1 kg costs ₹80, then 3 kg costs ₹240. The ratio ₹80/1 = ₹240/3 = 80 (constant).',
        realWorld: 'Petrol consumed increases in direct proportion to distance travelled at constant speed.',
    },
    {
        name: 'Inverse Proportion',
        icon: '📉',
        color: '#d97706',
        def: 'Two quantities x and y are in inverse proportion if an increase in x causes a proportional decrease in y, such that their product x × y = k (constant). Written as y ∝ 1/x.',
        example: 'If 4 workers finish a task in 12 days, then 8 workers finish in 6 days. Check: 4 × 12 = 8 × 6 = 48 (constant). ✓',
        realWorld: 'Speed and time for a fixed distance: driving faster means reaching sooner. Speed × Time = Distance (constant).',
    },
    {
        name: 'Constant of Proportionality (k)',
        icon: '🔑',
        color: '#dc2626',
        def: 'The fixed value that links two proportional quantities. In direct proportion: k = y/x (k is the ratio). In inverse proportion: k = x × y (k is the product). Finding k allows you to solve any problem involving those quantities.',
        example: 'If y = 15 when x = 3 (direct proportion): k = 15/3 = 5. So y = 5x. When x = 7, y = 35.',
        realWorld: 'k is like the "price per unit" — it stays the same no matter how much you buy.',
    },
    {
        name: 'Unitary Method',
        icon: '1️⃣',
        color: '#0f766e',
        def: 'A method to solve proportion problems by first finding the value of ONE unit, then using it to find the value of the required number of units. Works for direct proportion problems.',
        example: '8 notebooks cost ₹96. Find the cost of 5 notebooks.\nStep 1: Cost of 1 notebook = 96 ÷ 8 = ₹12.\nStep 2: Cost of 5 notebooks = 12 × 5 = ₹60.',
        realWorld: 'Grocery shopping — unit prices on product labels are the unitary method in action.',
    },
];

// ─── KEY IDEAS ───────────────────────────────────────────────────────────────
const KEY_IDEAS = [
    {
        title: 'Direct Proportion',
        icon: '📈',
        color: '#059669',
        rules: [
            {
                title: 'Identify Direct Proportion',
                f: 'x ↑ → y ↑  |  x ↓ → y ↓  |  y/x = k',
                d: 'Two quantities are in DIRECT proportion when they increase or decrease together in the same ratio. Always check: does doubling x also double y?',
                ex: 'More workers hired → more total wages paid. Double the workers → double the wage bill. ✓ Direct proportion.',
                tip: 'Quick check: If x × 2 also makes y × 2, it\'s direct proportion.',
            },
            {
                title: 'Find Missing Value (Direct)',
                f: 'x₁ / y₁ = x₂ / y₂  →  cross multiply',
                d: 'Set up a ratio equation. Cross-multiply to find the unknown. Or use the unitary method: find the value for 1 unit, then scale.',
                ex: 'If 5 m of cloth costs ₹200, what do 8 m cost?\n5/200 = 8/?\n? = (8 × 200) / 5 = ₹320.',
                tip: 'Always check your answer using the unitary method: cost of 1 m = 200/5 = ₹40. Cost of 8 m = 40 × 8 = ₹320 ✓',
            },
            {
                title: 'Direct Proportion in Miles',
                f: 'y = k × x  (k is constant)',
                d: 'Once you find k = y/x, you can find any y for any x using y = kx. This is the algebraic form of direct proportion.',
                ex: 'A car uses 5 L of petrol for every 40 km. k = 40/5 = 8 km/L. To travel 120 km: petrol = 120/8 = 15 L.',
                tip: 'k is the "rate" — km per litre, cost per unit, wages per hour, etc.',
            },
            {
                title: 'Real-Life Direct Examples',
                f: 'Cost, distance, wages, shadows',
                d: 'Common real-life direct proportion situations from NCERT: price & quantity, distance & time (fixed speed), wages & hours, shadow length & object height at the same time of day.',
                ex: '• 3 kg sugar costs ₹120 → 7 kg costs ₹280 (direct).\n• A 6 m pole casts a 4 m shadow → a 9 m pole casts a 6 m shadow (direct).',
                tip: 'When plotting direct proportion data, the graph is always a straight line through the origin.',
            },
            {
                title: 'Unitary Method (Step by Step)',
                f: 'Step 1: ÷ to get 1 unit  →  Step 2: × to get required',
                d: 'The unitary method is the most reliable approach for direct proportion: divide to get the value for 1, then multiply for the required amount.',
                ex: '12 oranges cost ₹60. Find the cost of 30 oranges.\n• Cost of 1 orange = 60 ÷ 12 = ₹5.\n• Cost of 30 oranges = 5 × 30 = ₹150.',
                tip: 'This method always works for direct proportion. Practice it until it\'s automatic.',
            },
        ],
    },
    {
        title: 'Inverse Proportion',
        icon: '📉',
        color: '#7c3aed',
        rules: [
            {
                title: 'Identify Inverse Proportion',
                f: 'x ↑ → y ↓  |  x × y = k (constant)',
                d: 'Two quantities are in INVERSE proportion when one increases, the other decreases, keeping their PRODUCT constant. If you double x, y becomes half.',
                ex: 'Filling a tank: 2 pipes take 9 hours. 6 pipes take 3 hours. Check: 2×9 = 6×3 = 18. ✓ Inverse proportion.',
                tip: 'Quick check: If x × 2 makes y ÷ 2, it\'s inverse proportion.',
            },
            {
                title: 'Find Missing Value (Inverse)',
                f: 'x₁ × y₁ = x₂ × y₂',
                d: 'For inverse proportion, multiply x × y for one pair and use this product to find the unknown in the other pair.',
                ex: '15 workers can build a wall in 8 days. How long would 6 workers take?\n15 × 8 = 6 × d\n120 = 6d → d = 20 days.',
                tip: 'The product is ALWAYS the same for both pairs. Set up the equation and solve.',
            },
            {
                title: 'Key Property of Inverse Proportion',
                f: 'x₁/x₂ = y₂/y₁ (ratios are INVERTED)',
                d: 'In inverse proportion the ratio of x values equals the INVERSE (flipped) ratio of y values.',
                ex: 'Speed ratio = 60 : 40 = 3 : 2. Time ratio = 2 : 3 (inverted).\nIf Speed 60 km/h takes 2 h, then Speed 40 km/h takes 3 h for the same journey.',
                tip: 'This is why it\'s called INVERSE proportion — the ratios are flipped!',
            },
            {
                title: 'Real-Life Inverse Examples',
                f: 'Workers & days, speed & time, pipes & hours',
                d: 'Common NCERT inverse proportion situations: workers and time, pipes filling a tank, speed and travel time for the same distance, gears in machinery.',
                ex: '• 6 pumps drain a tank in 5 hours → 3 pumps take 10 hours (inverse).\n• Gears: gear with 20 teeth rotates at 30 rpm; gear with 60 teeth rotates at 10 rpm.',
                tip: 'When plotting inverse proportion, the graph is a hyperbola (a curve), not a straight line.',
            },
            {
                title: 'Inverse Proportion vs NOT Inverse',
                f: 'Test: x₁ × y₁ = x₂ × y₂?',
                d: 'Not every situation where one increases and the other decreases is inverse proportion! The key test is that the PRODUCT x × y must remain CONSTANT for ALL pairs.',
                ex: 'Age and pocket money: as you get older, pocket money increases, but there is NO fixed product. This is NOT any standard proportion.\nBut: speed × time = distance (fixed). ✓ Inverse proportion.',
                tip: 'Always verify by computing the product for each pair. If all products are equal → inverse proportion.',
            },
        ],
    },
];

// ─── QUIZ QUESTIONS ───────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
    { q: 'In direct proportion, the ratio y/x is:', opts: ['Always changing', 'Equal to zero', 'A constant (k)', 'Always greater than 1'], ans: 2, exp: 'In direct proportion, y/x = k (constant). This constant ratio is called the constant of proportionality.' },
    { q: 'If x and y are in inverse proportion and x doubles, then y:', opts: ['Doubles', 'Stays the same', 'Halves', 'Triples'], ans: 2, exp: 'In inverse proportion x × y = k. If x doubles, y must halve so that the product stays constant.' },
    { q: 'The product x₁ × y₁ = x₂ × y₂ is the rule for:', opts: ['Direct proportion', 'Inverse proportion', 'Both types', 'Neither type'], ans: 1, exp: 'For inverse proportion, x × y = k (constant). So x₁ × y₁ = x₂ × y₂ = k.' },
    { q: '15 workers build a wall in 8 days. How many days for 10 workers?', opts: ['6 days', '10 days', '12 days', '5 days'], ans: 2, exp: 'Workers × Days = constant: 15 × 8 = 120. 10 × d = 120 → d = 12 days. More workers → fewer days (inverse proportion).' },
    { q: '6 pens cost ₹42. What is the cost of 10 pens?', opts: ['₹60', '₹70', '₹65', '₹72'], ans: 1, exp: 'Cost of 1 pen = 42/6 = ₹7. Cost of 10 pens = 7 × 10 = ₹70. (Unitary method, direct proportion).' },
    { q: 'Which of these is an example of DIRECT proportion?', opts: ['Speed and time for fixed distance', 'Number of workers and days taken', 'Price and quantity bought', 'Number of pipes and time to fill a tank'], ans: 2, exp: 'Price ∝ Quantity — buying more items at a fixed price increases cost directly. The others are inverse proportion examples.' },
    { q: 'The graph of direct proportion between x and y is:', opts: ['A parabola', 'A hyperbola', 'A straight line through the origin', 'A horizontal line'], ans: 2, exp: 'y = kx (direct proportion) → straight line through origin. The slope k = constant of proportionality.' },
    { q: 'In a : b :: c : d, the product of means equals:', opts: ['a × d', 'b × c', 'a × b', 'c × d'], ans: 1, exp: 'Product of means = b × c. Product of extremes = a × d. In a proportion, these are always equal: b × c = a × d.' },
    { q: 'y ∝ x means:', opts: ['y is always greater than x', 'y equals x', 'y is in direct proportion to x', 'y is in inverse proportion to x'], ans: 2, exp: 'The symbol ∝ means "is proportional to". y ∝ x means y is in DIRECT proportion to x, i.e., y = kx.' },
    { q: '4 identical pipes take 6 hours to fill a tank. How long for 3 pipes?', opts: ['4 hours', '8 hours', '9 hours', '12 hours'], ans: 1, exp: 'Inverse proportion: 4 × 6 = 3 × t → t = 24/3 = 8 hours. Fewer pipes → more time.' },
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
                    {pct >= 75 ? 'Excellent understanding of proportions vocabulary!' : 'Review the terms and try again for a higher score.'}
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className="prop-btn-primary" onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); }}>
                        Try Again
                    </button>
                    <button className="prop-btn-secondary" onClick={onBack}>Return to Terminology</button>
                </div>
            </div>
        );
    }

    return (
        <div className="prop-quiz-container">
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
            <div className="prop-quiz-card">
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
                <button onClick={handleNext} disabled={!answered} className="prop-btn-primary"
                    style={{ padding: '12px 40px', opacity: answered ? 1 : 0.4, cursor: answered ? 'pointer' : 'not-allowed' }}>
                    {current + 1 >= QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ProportionsTerminology() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('terms');
    const [activeTerm, setActiveTerm] = useState(0);
    const [activeIdea, setActiveIdea] = useState(0);
    const [activeRule, setActiveRule] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const TABS = [
        { id: 'terms', label: 'Key Terms', icon: '📚' },
        { id: 'ideas', label: 'Key Ideas', icon: '💡' },
        { id: 'quiz', label: 'Test Prep', icon: '✅' },
    ];

    return (
        <div className="prop-page">
            {/* ── TOP NAV ─────────────────────────────────── */}
            <nav className="prop-nav">
                <button className="prop-nav-back" onClick={() => navigate('/senior/grade/8/direct-and-inverse-proportions')}>
                    ← Back to Proportions
                </button>
                <div className="prop-nav-links">
                    <button className="prop-nav-link" onClick={() => navigate('/senior/grade/8/direct-and-inverse-proportions/introduction')}>
                        🌟 Introduction
                    </button>
                    <button className="prop-nav-link prop-nav-link--active">📖 Terminology</button>
                    <button className="prop-nav-link" onClick={() => navigate('/senior/grade/8/direct-and-inverse-proportions/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HEADER ──────────────────────────────────── */}
            <div style={{ padding: '10px 12px 10px', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                    Proportions <span style={{ color: '#4f46e5' }}>Vocabulary</span>
                </h1>
            </div>

            {/* ── TABS ────────────────────────────────────── */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', padding: '0 12px 12px' }}>
                {TABS.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`prop-tab${tab === t.id ? ' active' : ''}`}>
                        <span>{t.icon}</span> {t.label}
                    </button>
                ))}
            </div>

            {/* ── TAB: KEY TERMS ──────────────────────────── */}
            {tab === 'terms' && (
                <div className="prop-section">
                    <div className="prop-learn-grid">
                        {/* Sidebar */}
                        <aside className="prop-learn-sidebar">
                            {TERMS.map((t, i) => (
                                <button key={i} onClick={() => setActiveTerm(i)}
                                    className={`prop-sidebar-btn${activeTerm === i ? ' active' : ''}`}
                                    style={{ '--skill-color': t.color }}>
                                    <div className="prop-sidebar-btn-icon">{t.icon}</div>
                                    <span className="prop-sidebar-btn-title">{t.name}</span>
                                </button>
                            ))}
                        </aside>

                        {/* Detail window */}
                        <main key={activeTerm} className="prop-details-window prop-details-window-anim" style={{ border: `2px solid ${TERMS[activeTerm].color}15` }}>
                            <div className="prop-learn-header-row">
                                <div>
                                    <h3 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 900, color: TERMS[activeTerm].color }}>{TERMS[activeTerm].name}</h3>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>TERM {activeTerm + 1} OF {TERMS.length}</div>
                                </div>
                                <div style={{ fontSize: 36 }}>{TERMS[activeTerm].icon}</div>
                            </div>

                            <div style={{ background: `${TERMS[activeTerm].color}05`, padding: 24, borderRadius: 16, border: `2px solid ${TERMS[activeTerm].color}15`, marginBottom: 24 }}>
                                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: '#0f172a' }}>{TERMS[activeTerm].def}</p>
                            </div>

                            <div className="prop-rule-split">
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Example</h4>
                                    <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#0f172a', whiteSpace: 'pre-line' }}>{TERMS[activeTerm].example}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: TERMS[activeTerm].color, marginBottom: 10 }}>Real World</h4>
                                    <div style={{ background: `${TERMS[activeTerm].color}05`, padding: 20, borderRadius: 16, border: `1px solid ${TERMS[activeTerm].color}15` }}>
                                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#0f172a' }}>{TERMS[activeTerm].realWorld}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="prop-learn-footer">
                                <button className="prop-btn-primary" onClick={() => setTab('quiz')}>Ready for the Quiz? →</button>
                                <button className="prop-btn-secondary" onClick={() => { setActiveTerm((activeTerm + 1) % TERMS.length); }}>
                                    Next: {TERMS[(activeTerm + 1) % TERMS.length].name}
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            )}

            {/* ── TAB: KEY IDEAS ──────────────────────────── */}
            {tab === 'ideas' && (
                <div className="prop-section">
                    {/* Idea selector */}
                    <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                        {KEY_IDEAS.map((idea, idx) => (
                            <button key={idx} onClick={() => { setActiveIdea(idx); setActiveRule(0); }}
                                style={{ padding: '12px 24px', borderRadius: 50, border: '2px solid', borderColor: activeIdea === idx ? idea.color : '#e2e8f0', background: activeIdea === idx ? idea.color : '#fff', color: activeIdea === idx ? '#fff' : '#64748b', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Open Sans, sans-serif' }}>
                                <span>{idea.icon}</span> {idea.title}
                            </button>
                        ))}
                    </div>

                    <div className="prop-learn-grid">
                        {/* Rule sidebar */}
                        <aside className="prop-learn-sidebar">
                            {KEY_IDEAS[activeIdea].rules.map((rule, ri) => (
                                <button key={ri} onClick={() => setActiveRule(ri)}
                                    className={`prop-sidebar-btn${activeRule === ri ? ' active' : ''}`}
                                    style={{ '--skill-color': KEY_IDEAS[activeIdea].color }}>
                                    <div className="prop-sidebar-btn-num">{ri + 1}</div>
                                    <span className="prop-sidebar-btn-title">{rule.title}</span>
                                </button>
                            ))}
                        </aside>

                        {/* Rule detail */}
                        <main key={`${activeIdea}-${activeRule}`} className="prop-details-window prop-details-window-anim" style={{ border: `2px solid ${KEY_IDEAS[activeIdea].color}15` }}>
                            <div className="prop-learn-header-row">
                                <div>
                                    <h3 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 900, color: KEY_IDEAS[activeIdea].color }}>{KEY_IDEAS[activeIdea].rules[activeRule].title}</h3>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {activeRule + 1} OF {KEY_IDEAS[activeIdea].rules.length}</div>
                                </div>
                                <div style={{ fontSize: 32 }}>{KEY_IDEAS[activeIdea].icon}</div>
                            </div>

                            <div style={{ background: `${KEY_IDEAS[activeIdea].color}05`, padding: 24, borderRadius: 20, border: `2px solid ${KEY_IDEAS[activeIdea].color}15`, marginBottom: 28, textAlign: 'center' }}>
                                <div style={{ fontSize: 22, fontWeight: 800, color: KEY_IDEAS[activeIdea].color, letterSpacing: 1 }}>{KEY_IDEAS[activeIdea].rules[activeRule].f}</div>
                            </div>

                            <div className="prop-rule-split">
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Explanation</h4>
                                    <p style={{ fontSize: 15, lineHeight: 1.7, color: '#0f172a', margin: 0 }}>{KEY_IDEAS[activeIdea].rules[activeRule].d}</p>
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
                                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#0f172a', whiteSpace: 'pre-line' }}>{KEY_IDEAS[activeIdea].rules[activeRule].ex}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="prop-learn-footer">
                                <button className="prop-btn-primary" onClick={() => setTab('quiz')}>Test your Knowledge →</button>
                                <button className="prop-btn-secondary" onClick={() => setActiveRule((activeRule + 1) % KEY_IDEAS[activeIdea].rules.length)}>
                                    Next: {KEY_IDEAS[activeIdea].rules[(activeRule + 1) % KEY_IDEAS[activeIdea].rules.length].title}
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            )}

            {/* ── TAB: QUIZ ───────────────────────────────── */}
            {tab === 'quiz' && (
                <div className="prop-section">
                    <QuizEngine onBack={() => setTab('terms')} />
                </div>
            )}
        </div>
    );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../trigonometry.css';
import '../../hide-footer.css';
import MathRenderer from '../../../../../MathRenderer';

const TERMS = [
    {
        name: 'Right Triangle',
        color: '#6366f1',
        icon: '📐',
        visualEmoji: '📐',
        def: 'A triangle with one angle equal to exactly $90^\\circ$. Trigonometric ratios govern the relationship between its acute angles and side lengths.',
        formula: '$\\angle C = 90^\\circ$',
        example: 'Any triangle where one corner is a perfect "L" shape.',
        memory: 'Right = "$90^\\circ$" — the cornerstone of trigonometry!'
    },
    {
        name: 'Hypotenuse',
        color: '#0891b2',
        icon: '📏',
        visualEmoji: '📏',
        def: 'The longest side of a right-angled triangle, always situated directly opposite the $90^\\circ$ angle.',
        formula: '$H = \\sqrt{O^2 + A^2}$',
        example: 'The longest side joining the two shorter perpendicular legs.',
        memory: 'Hypotenuse = "Highest/Longest" — opposite the biggest angle!'
    },
    {
        name: 'Opposite Side',
        color: '#f59e0b',
        icon: '👁️',
        visualEmoji: '👁️',
        def: 'The side across from the specific acute angle ($\\theta$) you are referencing. It does NOT touch the angle $\\theta$.',
        formula: '$\\text{Opposite to } \\angle A$',
        example: 'If looking from angle A, it\'s the wall on the far side.',
        memory: 'Opposite = "Far Side" — the side looking directly back at the angle.'
    },
    {
        name: 'Adjacent Side',
        color: '#10b981',
        icon: '🤝',
        visualEmoji: '🤝',
        def: 'The side next to the referenced acute angle ($\\theta$) that is NOT the hypotenuse. It forms one arm of the angle.',
        formula: '$\\text{Adjacent to } \\angle A$',
        example: 'The ground connected to your feet if you are the angle.',
        memory: 'Adjacent = "Neighbor" — touches the angle!'
    },
    {
        name: 'Sine (sin)',
        color: '#ec4899',
        icon: '𝐒',
        visualEmoji: '𝐒',
        def: 'The ratio of the length of the Opposite side to the length of the Hypotenuse.',
        formula: '$\\sin \\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}$',
        example: '$\\sin 30^\\circ = \\frac{1}{2}$',
        memory: 'SOH: Sine = Opposite / Hypotenuse'
    },
    {
        name: 'Cosine (cos)',
        color: '#8b5cf6',
        icon: '𝐂',
        visualEmoji: '𝐂',
        def: 'The ratio of the length of the Adjacent side to the length of the Hypotenuse.',
        formula: '$\\cos \\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$',
        example: '$\\cos 60^\\circ = \\frac{1}{2}$',
        memory: 'CAH: Cosine = Adjacent / Hypotenuse'
    },
    {
        name: 'Tangent (tan)',
        color: '#f43f5e',
        icon: '𝐓',
        visualEmoji: '𝐓',
        def: 'The ratio of the length of the Opposite side to the length of the Adjacent side.',
        formula: '$\\tan \\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{\\sin \\theta}{\\cos \\theta}$',
        example: '$\\tan 45^\\circ = 1$',
        memory: 'TOA: Tangent = Opposite / Adjacent'
    },
    {
        name: 'Cosecant (cosec)',
        color: '#06b6d4',
        icon: '𝟏',
        visualEmoji: '𝟏',
        def: 'The multiplicative inverse (reciprocal) of the Sine ratio.',
        formula: '$\\operatorname{cosec} \\theta = \\frac{\\text{Hypotenuse}}{\\text{Opposite}} = \\frac{1}{\\sin \\theta}$',
        example: '$\\operatorname{cosec} 30^\\circ = 2$',
        memory: 'Cosec pairs with Sin (starts with C, pairs with S)'
    },
    {
        name: 'Secant (sec)',
        color: '#be185d',
        icon: '𝟐',
        visualEmoji: '𝟐',
        def: 'The multiplicative inverse (reciprocal) of the Cosine ratio.',
        formula: '$\\sec \\theta = \\frac{\\text{Hypotenuse}}{\\text{Adjacent}} = \\frac{1}{\\cos \\theta}$',
        example: '$\\sec 60^\\circ = 2$',
        memory: 'Sec pairs with Cos (starts with S, pairs with C)'
    },
    {
        name: 'Cotangent (cot)',
        color: '#eab308',
        icon: '𝟑',
        visualEmoji: '𝟑',
        def: 'The multiplicative inverse (reciprocal) of the Tangent ratio.',
        formula: '$\\cot \\theta = \\frac{\\text{Adjacent}}{\\text{Opposite}} = \\frac{1}{\\tan \\theta}$',
        example: '$\\cot 45^\\circ = 1$',
        memory: 'Cot is the inverse of Tan (Cotangent/Tangent)'
    },
];

const RULES = [
    {
        num: 1,
        title: 'Fundamental Identity \#1',
        rule: 'The sum of the squares of sine and cosine of the same angle is always 1.',
        emoji: '🥇',
        color: '#6366f1',
        detail: 'This is derived directly from the Pythagorean theorem ($a^2 + b^2 = c^2$) by dividing everything by the hypotenuse squared ($H^2$). It is true for all values of angle $A$ between $0^\\circ$ and $90^\\circ$.',
        examples: ['$\\sin^2 A + \\cos^2 A = 1$', '$\\sin^2 30^\\circ + \\cos^2 30^\\circ = \\left(\\frac{1}{2}\\right)^2 + \\left(\\frac{\\sqrt{3}}{2}\\right)^2 = 1$'],
        tip: 'Anytime you see $\\sin^2$ and $\\cos^2$ added together, it probably equals 1!'
    },
    {
        num: 2,
        title: 'Fundamental Identity \#2',
        rule: 'One plus the square of tangent equals the square of secant.',
        emoji: '🥈',
        color: '#0891b2',
        detail: 'This rule relates $\\tan$ and $\\sec$. It is derived by dividing the Pythagorean theorem by the Adjacent side squared ($A^2$). It is valid for $0^\\circ \\le A < 90^\\circ$.',
        examples: ['$1 + \\tan^2 A = \\sec^2 A$', '$\\sec^2 A - \\tan^2 A = 1$'],
        tip: 'Remember "I tan in a sec" — $1 + \\tan^2 = \\sec^2$'
    },
    {
        num: 3,
        title: 'Fundamental Identity \#3',
        rule: 'One plus the square of cotangent equals the square of cosecant.',
        emoji: '🥉',
        color: '#f59e0b',
        detail: 'This rule relates $\\cot$ and $\\operatorname{cosec}$. It is derived by dividing the Pythagorean theorem by the Opposite side squared ($O^2$). It is valid for $0^\\circ < A \\le 90^\\circ$.',
        examples: ['$1 + \\cot^2 A = \\operatorname{cosec}^2 A$', '$\\operatorname{cosec}^2 A - \\cot^2 A = 1$'],
        tip: 'The "co"s go together: $1 + \\text{co-tangent}^2 = \\text{co-secant}^2$'
    },
    {
        num: 4,
        title: 'Bounds of Sine & Cosine',
        rule: 'The values of $\\sin A$ and $\\cos A$ can NEVER exceed 1 for acute angles.',
        emoji: '📏',
        color: '#10b981',
        detail: 'Because the Hypotenuse is ALWAYS the longest side in a right triangle, the fraction (Opposite / Hypotenuse) or (Adjacent / Hypotenuse) will always be less than or equal to 1.',
        examples: ['$0 \\le \\sin A \\le 1$', '$0 \\le \\cos A \\le 1$'],
        tip: 'If you calculate $\\sin A = 1.5$, you made a mistake!'
    },
    {
        num: 5,
        title: 'Bounds of Secant & Cosecant',
        rule: 'The values of $\\sec A$ and $\\operatorname{cosec} A$ are ALWAYS $\\ge 1$.',
        emoji: '📈',
        color: '#ec4899',
        detail: 'Since secant and cosecant are the reciprocals of cosine and sine respectively, and since $\\cos$ and $\\sin$ are $\\le 1$, their reciprocals must be $\\ge 1$. Hypotenuse divided by a shorter side is always $>1$.',
        examples: ['$\\sec A \\ge 1$', '$\\operatorname{cosec} A \\ge 1$'],
        tip: 'Sec \& Cosec always yield 1 or bigger.'
    }
];

const VALUES_TREND = [
    {
        angle: '$0^\\circ$',
        sin: '$0$',
        cos: '$1$',
        tan: '$0$'
    },
    {
        angle: '$30^\\circ$',
        sin: '$\\frac{1}{2}$',
        cos: '$\\frac{\\sqrt{3}}{2}$',
        tan: '$\\frac{1}{\\sqrt{3}}$'
    },
    {
        angle: '$45^\\circ$',
        sin: '$\\frac{1}{\\sqrt{2}}$',
        cos: '$\\frac{1}{\\sqrt{2}}$',
        tan: '$1$'
    },
    {
        angle: '$60^\\circ$',
        sin: '$\\frac{\\sqrt{3}}{2}$',
        cos: '$\\frac{1}{2}$',
        tan: '$\\sqrt{3}$'
    },
    {
        angle: '$90^\\circ$',
        sin: '$1$',
        cos: '$0$',
        tan: '$\\text{Undefined}$'
    }
];

const QUIZ = [
    { q: "What is the relationship between $\\sin A$ and $\\operatorname{cosec} A$?", opts: ["They are identical", "They are reciprocals", "They add to 1", "$\\sin A > \\operatorname{cosec} A$"], corr: 1, exp: "By definition, $\\operatorname{cosec} A = \\frac{1}{\\sin A}$." },
    { q: "According to the identities, what does $\\sec^2 A - \\tan^2 A$ equal?", opts: ["$0$", "$1$", "$\\sin^2 A$", "$\\cos^2 A$"], corr: 1, exp: "Rule 2 states that $1 + \\tan^2 A = \\sec^2 A$, so rearranging gives $\\sec^2 A - \\tan^2 A = 1$." },
    { q: "Which of the following values can NEVER be the value of $\\cos A$ for an acute angle?", opts: ["$0$", "$0.5$", "$\\frac{\\sqrt{3}}{2}$", "$1.2$"], corr: 3, exp: "Rule 4 states that the value of cosine can never exceed $1$." },
    { q: "What is the value of $\\tan 45^\\circ$?", opts: ["$0$", "$\\frac{1}{\\sqrt{2}}$", "$1$", "$\\sqrt{3}$"], corr: 2, exp: "In an isosceles right triangle, Opposite = Adjacent, so Tangent (Opp/Adj) $= 1$." },
    { q: "As angle $A$ increases from $0^\\circ$ to $90^\\circ$, what happens to $\\sin A$?", opts: ["It decreases from 1 to 0", "It increases from 0 to 1", "It stays constant", "It becomes undefined"], corr: 1, exp: "$\\sin 0^\\circ = 0$ and $\\sin 90^\\circ = 1$. The value always increases as the angle grows." },
    { q: "In a right triangle $ABC$ right angled at $B$, what is $\\sin A$?", opts: ["$\\frac{AB}{AC}$", "$\\frac{BC}{AC}$", "$\\frac{BC}{AB}$", "$\\frac{AC}{BC}$"], corr: 1, exp: "Sine is Opposite / Hypotenuse. Relative to angle $A$, Opposite is $BC$ and Hypotenuse is $AC$." },
    { q: "What is $\\frac{\\sin \\theta}{\\cos \\theta}$ equivalent to?", opts: ["$\\cot \\theta$", "$\\sec \\theta$", "$\\tan \\theta$", "$\\operatorname{cosec} \\theta$"], corr: 2, exp: "$\\frac{\\text{Opp}/\\text{Hyp}}{\\text{Adj}/\\text{Hyp}} = \\frac{\\text{Opp}}{\\text{Adj}}$, which is the definition of $\\tan \\theta$." },
    { q: "What does $1 + \\cot^2 A$ equal?", opts: ["$\\sin^2 A$", "$\\tan^2 A$", "$\\sec^2 A$", "$\\operatorname{cosec}^2 A$"], corr: 3, exp: "This is Fundamental Rule 3: $1 + \\cot^2 A = \\operatorname{cosec}^2 A$." },
    { q: "Is it possible for $\\sin A = \\cos A$?", opts: ["No, never", "Yes, when $A = 0^\\circ$", "Yes, when $A = 45^\\circ$", "Yes, when $A = 90^\\circ$"], corr: 2, exp: "At $45^\\circ$, both sine and cosine equal $\\frac{1}{\\sqrt{2}}$." },
    { q: "The value of $\\sin^2 30^\\circ + \\cos^2 30^\\circ$ is?", opts: ["$0$", "$\\frac{1}{2}$", "$\\frac{3}{4}$", "$1$"], corr: 3, exp: "By Identity \#1, $\\sin^2 \\theta + \\cos^2 \\theta = 1$ for ANY angle $\\theta$." }
];

export default function Terminology() {
    const navigate = useNavigate();
    const [view, setView] = useState('terms'); // 'terms' | 'rules' | 'values' | 'quiz'
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [ansSelected, setAnsSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    React.useEffect(() => {
        document.body.classList.add('hide-main-footer');
        return () => document.body.classList.remove('hide-main-footer');
    }, []);

    const term = TERMS[selectedIdx];
    const activeRule = RULES[selectedRuleIdx];

    const handleAns = (idx) => {
        if (answered) return;
        setAnsSelected(idx);
        setAnswered(true);
        if (idx === QUIZ[quizIdx].corr) setScore(s => s + 1);
    };

    const nextQ = () => {
        if (quizIdx + 1 < QUIZ.length) {
            setQuizIdx(i => i + 1);
            setAnsSelected(null);
            setAnswered(false);
        } else {
            setFinished(true);
        }
    };

    return (
        <div className="terminology-page">
            <nav className="intro-nav">
                <button className="intro-nav-back" onClick={() => navigate('/introduction-to-trigonometry')}>← Back to Hub</button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link" onClick={() => navigate('/introduction-to-trigonometry/introduction')}>🌟 Introduction</button>
                    <button className="intro-nav-link intro-nav-link--active" onClick={() => navigate('/introduction-to-trigonometry/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/introduction-to-trigonometry/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="res-container" style={{ maxWidth: 1000, margin: '5px auto', padding: '0 16px' }}>
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>
                        Trigonometry <span style={{ color: 'var(--trig-secondary)' }}>Vocabulary</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 600, margin: 0 }}>Select any term below to explore details.</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
                    <button className={`trig-tab ${view === 'terms' ? 'active' : ''}`} onClick={() => setView('terms')}>📚 Terminology</button>
                    <button className={`trig-tab ${view === 'rules' ? 'active' : ''}`} onClick={() => setView('rules')}>📏 5 Golden Rules</button>
                    <button className={`trig-tab ${view === 'quiz' ? 'active' : ''}`} onClick={() => setView('quiz')}>🧪 Test Prep</button>
                </div>

                {view === 'terms' && (
                    <div className="res-fade-in trig-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'min(320px, 35%) 1fr', gap: 24, alignItems: 'start' }}>
                        <aside className="selector-container" style={{
                            background: '#fff', padding: '16px', borderRadius: 24, border: '1.5px solid #f1f5f9',
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignContent: 'start',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                        }}>
                            {TERMS.map((t, i) => {
                                const isActive = selectedIdx === i;
                                return (
                                    <button
                                        key={i}
                                        className={`term-btn-mini ${isActive ? 'active' : ''}`}
                                        onClick={() => setSelectedIdx(i)}
                                        style={{
                                            background: isActive ? t.color : '#fff',
                                            borderColor: isActive ? t.color : '#f1f5f9',
                                            gridColumn: i === TERMS.length - 1 && TERMS.length % 2 !== 0 ? 'span 2' : 'span 1'
                                        }}
                                    >
                                        <div className="term-btn-mini-icon" style={{ color: t.color }}>{t.icon}</div>
                                        <div className="term-btn-mini-name">{t.name.split(' (')[0]}</div>
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="details-window-anim" key={selectedIdx} style={{
                            background: '#ffffff', borderRadius: 24, padding: '32px 40px', boxShadow: '0 8px 40px rgba(0,0,0,0.04)',
                            border: '1.5px solid #f1f5f9', display: 'flex', flexDirection: 'column', minHeight: '340px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: term.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: term.color }}>{term.icon}</div>
                                <h2 style={{ fontSize: 32, fontWeight: 900, color: term.color, margin: 0, fontFamily: 'Outfit, sans-serif' }}>{term.name}</h2>
                            </div>

                            <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#1e293b', marginBottom: 28, fontWeight: 500 }}>
                                <MathRenderer text={term.def} />
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 'auto' }}>
                                <div>
                                    <h4 style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>Examples</h4>
                                    <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: 20, border: '1px solid #f1f5f9' }}>
                                        <div style={{ fontSize: 22, fontWeight: 800, color: term.color, marginBottom: 8 }}><MathRenderer text={term.formula} /></div>
                                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}><MathRenderer text={term.example} /></div>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>Master Hint</h4>
                                    <div style={{ background: '#f0f7ff', padding: '16px 20px', borderRadius: 20, border: '1px solid #e0f2fe' }}>
                                        <p style={{ margin: 0, fontSize: 13, color: '#1e40af', lineHeight: 1.6, fontWeight: 600 }}>
                                            <span style={{ marginRight: 8 }}>💡</span><MathRenderer text={term.memory} />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {view === 'rules' && (
                    <div className="res-fade-in trig-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'min(280px, 30%) 1fr', gap: 24, alignItems: 'start' }}>
                        <aside className="selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '8px 10px', borderRadius: 16, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: '1fr', gap: 6, backdropFilter: 'blur(10px)',
                            alignContent: 'start'
                        }}>
                            {RULES.map((rule, i) => {
                                const isActive = selectedRuleIdx === i;
                                return (
                                    <button key={i} className={`term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}
                                        style={{ background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`, borderColor: isActive ? rule.color : `${rule.color}20`, padding: '8px 12px', position: 'relative', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}
                                    >
                                        <div style={{ width: 26, height: 26, borderRadius: 6, background: isActive ? rule.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: isActive ? '#fff' : rule.color, fontWeight: 900, position: 'relative', zIndex: 1 }}>{rule.num}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                                            <span style={{ fontWeight: 800, fontSize: 13, color: isActive ? '#fff' : '#1e293b', lineHeight: 1 }}>Rule {rule.num}</span>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.8)' : '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>
                                                {rule.title}
                                            </span>
                                        </div>
                                        {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)`, zIndex: 0 }} />}
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="details-window-anim" key={selectedRuleIdx} style={{
                            background: '#ffffff', borderRadius: 16, padding: '12px 18px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                            border: `2px solid ${activeRule.color}15`, display: 'flex', flexDirection: 'column', gap: '8px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 30, height: 30, borderRadius: 8, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: activeRule.color, fontWeight: 900 }}>{activeRule.emoji}</div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: {activeRule.title}</h2>
                                </div>
                                <div style={{ fontSize: 24 }}>{activeRule.emoji || '📐'}</div>
                            </div>
                            <div style={{ background: `${activeRule.color}08`, padding: '8px 10px', borderRadius: 8, borderLeft: `3px solid ${activeRule.color}`, marginBottom: 8 }}>
                                <p style={{ fontSize: 13, fontWeight: 700, color: activeRule.color, margin: 0 }}>
                                    <MathRenderer text={activeRule.rule} />
                                </p>
                            </div>
                            <p style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.3, margin: '0 0 10px' }}>
                                <MathRenderer text={activeRule.detail} />
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 9, letterSpacing: 1, color: activeRule.color, marginBottom: 6 }}>Mathematical Notation</h4>
                                    <div style={{ background: '#f8fafc', padding: 10, borderRadius: 10, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            {activeRule.examples.map((ex, j) => (
                                                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: activeRule.color }} />
                                                    <span style={{ fontSize: 12, background: '#fff', padding: '2px 6px', borderRadius: 6, color: '#1e293b', fontWeight: 600 }}>
                                                        <MathRenderer text={ex} />
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 9, letterSpacing: 1, color: '#14b9a6', marginBottom: 6 }}>Survival Tip</h4>
                                    <div style={{ background: 'rgba(20,184,166,0.05)', padding: 10, borderRadius: 10, border: '1px solid rgba(20,184,166,0.1)' }}>
                                        <p style={{ margin: 0, fontSize: 12, color: '#445163', lineHeight: 1.4 }}><span style={{ fontWeight: 800, color: '#14b9a6' }}>🛡️ Pro Tip: </span><MathRenderer text={activeRule.tip} /></p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {view === 'values' && (
                    <div className="res-fade-in details-window-anim" style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '16px 20px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'var(--trig-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#fff', fontWeight: 900 }}>🔢</div>
                            <div>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 900, color: '#0f172a', margin: 0 }}>Trigonometric Values Table</h3>
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: 14 }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--trig-primary)', fontWeight: 800 }}><MathRenderer text="$\\angle A$" /></th>
                                        <th style={{ padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--trig-primary)', fontWeight: 800 }}><MathRenderer text="$\\sin A$" /></th>
                                        <th style={{ padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--trig-primary)', fontWeight: 800 }}><MathRenderer text="$\\cos A$" /></th>
                                        <th style={{ padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--trig-primary)', fontWeight: 800 }}><MathRenderer text="$\\tan A$" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {VALUES_TREND.map((row, idx) => (
                                        <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                                            <td style={{ padding: '8px', border: '1px solid #e2e8f0', fontWeight: 800, color: '#0f172a' }}><MathRenderer text={row.angle} /></td>
                                            <td style={{ padding: '8px', border: '1px solid #e2e8f0' }}><MathRenderer text={row.sin} /></td>
                                            <td style={{ padding: '8px', border: '1px solid #e2e8f0' }}><MathRenderer text={row.cos} /></td>
                                            <td style={{ padding: '8px', border: '1px solid #e2e8f0' }}><MathRenderer text={row.tan} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: 12, borderRadius: 12, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                <h4 style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: 0.5 }}>📈 Sine Trend</h4>
                                <p style={{ margin: 0, fontSize: 13, color: '#064e3b', lineHeight: 1.4 }}>
                                    <MathRenderer text="As angle $A$ increases from $0^\circ$ to $90^\circ$, the value of $\sin A$ increases steadily from $0$ to $1$." />
                                </p>
                            </div>
                            <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: 12, borderRadius: 12, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                <h4 style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 800, color: '#b91c1c', textTransform: 'uppercase', letterSpacing: 0.5 }}>📉 Cosine Trend</h4>
                                <p style={{ margin: 0, fontSize: 13, color: '#7f1d1d', lineHeight: 1.4 }}>
                                    <MathRenderer text="As angle $A$ increases from $0^\circ$ to $90^\circ$, the value of $\cos A$ decreases steadily from $1$ to $0$." />
                                </p>
                            </div>
                        </div>
                    </div>
                )}


                {view === 'quiz' && (
                    <div className="res-fade-in details-window-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '20px 24px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        {!finished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--trig-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of {QUIZ.length}</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>Vocabulary Check</h3>
                                    </div>
                                    <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: 'var(--trig-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: 'var(--trig-secondary)' }}>{quizIdx + 1}/{QUIZ.length}</div>
                                </div>
                                <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.4, marginBottom: 16 }}>
                                    <MathRenderer text={QUIZ[quizIdx].q} />
                                </div>
                                <div className="quiz-options-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                                    {QUIZ[quizIdx].opts.map((opt, i) => {
                                        const isSelected = ansSelected === i;
                                        const isCorrect = i === QUIZ[quizIdx].corr;

                                        let borderColor = 'rgba(0,0,0,0.05)';
                                        let bgColor = '#fff';
                                        let textColor = '#0f172a';

                                        if (answered) {
                                            if (isCorrect) {
                                                borderColor = '#10b981';
                                                bgColor = 'rgba(16, 185, 129, 0.05)';
                                                textColor = '#10b981';
                                            } else if (isSelected) {
                                                borderColor = '#ef4444';
                                                bgColor = 'rgba(239, 68, 68, 0.05)';
                                                textColor = '#ef4444';
                                            }
                                        } else if (isSelected) {
                                            borderColor = 'var(--trig-secondary)';
                                            bgColor = 'rgba(14, 165, 233, 0.05)';
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleAns(i)}
                                                disabled={answered}
                                                style={{
                                                    padding: '12px 16px', borderRadius: '14px', border: `2px solid ${borderColor}`,
                                                    background: bgColor, color: textColor,
                                                    textAlign: 'left', fontWeight: isSelected ? 800 : 600, transition: 'all 0.2s',
                                                    fontSize: '15px', cursor: answered ? 'default' : 'pointer'
                                                }}
                                            >
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>
                                {answered && (
                                    <div style={{
                                        background: 'rgba(14, 165, 233, 0.05)', padding: '10px 14px', borderRadius: '12px', marginBottom: '16px',
                                        border: '1px solid rgba(14, 165, 233, 0.2)'
                                    }}>
                                        <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>
                                            <strong style={{ color: 'var(--trig-secondary)' }}>Solution: </strong>
                                            <MathRenderer text={QUIZ[quizIdx].exp} />
                                        </p>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        className="trig-btn-primary"
                                        onClick={nextQ}
                                        disabled={!answered}
                                        style={{
                                            padding: '10px 32px', background: answered ? 'var(--trig-secondary)' : '#f1f5f9',
                                            color: answered ? '#fff' : '#94a3b8', border: 'none', borderRadius: '100px',
                                            fontWeight: 800, fontSize: '13px', cursor: answered ? 'pointer' : 'not-allowed',
                                            transition: 'all 0.2s', boxShadow: answered ? '0 4px 15px rgba(14, 165, 233, 0.3)' : 'none'
                                        }}
                                    >
                                        {quizIdx + 1 === QUIZ.length ? 'Finish Test' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>{score >= 8 ? '🏆' : score >= 5 ? '🌟' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Test Complete!</h2>
                                <p style={{ color: '#64748b', fontSize: 18, marginBottom: 32 }}>Your Vocabulary Score: <span style={{ color: 'var(--trig-secondary)', fontWeight: 900 }}>{score} / {QUIZ.length}</span></p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button className="trig-btn-primary" style={{ padding: '8px 16px', borderRadius: 10 }} onClick={() => { setFinished(false); setQuizIdx(0); setScore(0); setAnswered(false); setAnsSelected(null); }}>Try Again</button>
                                    <button className="trig-btn-secondary" style={{ padding: '8px 16px', borderRadius: 10 }} onClick={() => navigate('/introduction-to-trigonometry/skills')}>Go to Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginTop: 4, textAlign: 'center' }}>
                    <button className="trig-btn-primary" onClick={() => navigate('/introduction-to-trigonometry/skills')} style={{ padding: '6px 20px', fontSize: 13, borderRadius: 100 }}>Ready to Solve! 🎯</button>
                </div>
            </div>
        </div >
    );
}

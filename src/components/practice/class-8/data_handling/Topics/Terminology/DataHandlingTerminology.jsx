import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '@/components/LatexText';
import styles from '../../data_handling.module.css';

const KEY_TERMS = [
    {
        term: 'Raw Data',
        symbol: '$x_i$',
        definition: 'A collection of numerical facts or observations gathered directly from surveys, experiments, or observation — not yet organised.',
        eg: 'Marks of $10$ students: $45, 52, 60, 45, 70, 80$ (listed as collected).',
        realWorld: 'A shopkeeper\'s daily sales amounts before being sorted or grouped.',
        color: '#0f766e',
    },
    {
        term: 'Frequency',
        symbol: '$f$',
        definition: 'The number of times a particular value or class appears in a dataset.',
        eg: 'In the data $\\{3, 5, 3, 7, 3\\}$, frequency of $3 = 3$.',
        realWorld: 'How many students in a class scored between $70$ and $80$.',
        color: '#1e40af',
    },
    {
        term: 'Class Interval',
        symbol: '$c.i.$',
        definition: 'A range of values used to group data in a grouped frequency distribution. E.g. $0–10, 10–20$.',
        eg: 'Heights $145–150 \\text{ cm}, 150–155 \\text{ cm}, 155–160 \\text{ cm}$ are class intervals.',
        realWorld: 'Temperature ranges like $20–25^\\circ\\text{C}, 25–30^\\circ\\text{C}$ used in weather reports.',
        color: '#7c3aed',
    },
    {
        term: 'Bar Graph',
        symbol: '📊',
        definition: 'A graph using rectangular bars of uniform width to represent the frequency of each category. Bars are separated by gaps.',
        eg: 'Bars showing number of students who like Maths, Science, or English.',
        realWorld: 'A news channel showing election vote counts for each party.',
        color: '#b45309',
    },
    {
        term: 'Pie Chart',
        symbol: '🥧',
        definition: 'A circular diagram divided into sectors. Each sector\'s central angle is: $\\frac{\\text{Frequency}}{\\text{Total}} \\times 360^\\circ$. Represents parts of a whole.',
        eg: 'A pie chart of $120$ students: if $40$ prefer Maths, central angle = $\\frac{40}{120} \\times 360^\\circ = 120^\\circ$.',
        realWorld: 'A household budget pie chart showing rent, food, travel as proportions.',
        color: '#be185d',
    },
    {
        term: 'Probability',
        symbol: '$P(E)$',
        definition: 'A measure of how likely an event is to occur. $\\text{P}(E) = \\frac{\\text{Favourable outcomes}}{\\text{Total equally likely outcomes}}$. Range: $0 \\le \\text{P}(E) \\le 1$.',
        eg: '$\\text{P}(\\text{getting a } 5 \\text{ on a fair die}) = \\frac{1}{6}$.',
        realWorld: 'The chance it will rain tomorrow based on past weather data.',
        color: '#0369a1',
    },
];

const KEY_IDEAS = [
    {
        label: 'Organising & Representing Data',
        color: '#0f766e',
        icon: '📊',
        rules: [
            { icon: '📋', title: 'Build a Frequency Table', body: 'List each distinct value and count (tally) how many times it appears. Sum of all frequencies = total observations.' },
            { icon: '📐', title: 'Group for Large Data', body: 'When data is large or continuous, use a grouped frequency table with equal-width class intervals.' },
            { icon: '📊', title: 'Bar Graphs = Comparison', body: 'Draw equal-width bars with uniform gaps. Height = frequency. Use for comparing discrete categories.' },
            { icon: '🥧', title: 'Pie Charts = Proportions', body: 'Formula: $\\text{Central angle} = \\frac{\\text{frequency}}{\\text{total}} \\times 360^\\circ$. All angles must add to $360^\\circ$. Ideal for showing parts of a whole.' },
        ],
    },
    {
        label: 'Chance and Probability',
        color: '#7c3aed',
        icon: '🎲',
        rules: [
            { icon: '🎯', title: 'P(E) Formula', body: '$\\text{P}(E) = \\frac{\\text{Favourable outcomes}}{\\text{Total equally likely outcomes}}$. Always identify the sample space first.' },
            { icon: '📏', title: 'Range of Probability', body: '$0 \\le \\text{P}(E) \\le 1$. Impossible events have $P = 0$; certain events have $P = 1$.' },
            { icon: '🔄', title: 'Complementary Rule', body: '$\\text{P}(E) + \\text{P}(\\text{not } E) = 1$. If $\\text{P}(\\text{rain}) = 0.3$, then $\\text{P}(\\text{no rain}) = 0.7$.' },
            { icon: '🎲', title: 'Equally Likely Outcomes', body: 'Theoretical probability assumes all outcomes are equally likely (fair coin, unbiased die, well-shuffled deck).' },
        ],
    },
];

const QUIZ_QUESTIONS = [
    { q: 'The number of times a value appears in data is called its:', options: ['Range', 'Mean', 'Frequency', 'Mode'], correct: 2 },
    { q: 'In a pie chart, the full circle represents:', options: ['$50\\%$ of data', 'The mean', '$100\\%$ of data', 'The mode'], correct: 2 },
    { q: 'A bar graph uses bars with:', options: ['Varying widths', 'No gaps', 'Uniform width and gaps', 'Circles'], correct: 2 },
    { q: 'The formula for a pie chart sector angle is:', options: ['$(f \\div \\text{Total}) \\times 180^\\circ$', '$(f \\div \\text{Total}) \\times 360^\\circ$', '$f \\times 360^\\circ$', '$\\text{Total} \\div f \\times 360^\\circ$'], correct: 1 },
    { q: '$P(E) + P(\\text{not } E)$ equals:', options: ['$0$', '$0.5$', '$2$', '$1$'], correct: 3 },
    { q: '$P(\\text{impossible event}) =$', options: ['$1$', '$0.5$', '$0$', '$\\infty$'], correct: 2 },
    { q: 'A "class mark" is:', options: ['The highest value', 'The midpoint of a class interval', 'The class width', 'The lowest value'], correct: 1 },
    { q: 'Which graph is best for comparing two datasets side by side?', options: ['Pie chart', 'Single bar graph', 'Double bar graph', 'Frequency table'], correct: 2 },
    { q: 'On a fair die, $P(\\text{getting an even number}) =$', options: ['$\\frac{1}{6}$', '$\\frac{1}{3}$', '$\\frac{1}{2}$', '$\\frac{2}{3}$'], correct: 2 },
    { q: 'What must all central angles in a pie chart sum to?', options: ['$180^\\circ$', '$270^\\circ$', '$360^\\circ$', '$90^\\circ$'], correct: 2 },
];

export default function DataHandlingTerminology() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('terms');
    const [activeTerm, setActiveTerm] = useState(KEY_TERMS[0]);
    const [activeIdea, setActiveIdea] = useState(0);
    const [activeRule, setActiveRule] = useState(0);
    const [quizIdx, setQuizIdx] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [quizDone, setQuizDone] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleSelect = (idx) => {
        if (selected !== null) return;
        setSelected(idx);
        if (idx === QUIZ_QUESTIONS[quizIdx].correct) setScore((s) => s + 1);
    };

    const nextQ = () => {
        if (quizIdx + 1 >= QUIZ_QUESTIONS.length) setQuizDone(true);
        else { setQuizIdx((i) => i + 1); setSelected(null); }
    };

    const resetQuiz = () => { setQuizIdx(0); setSelected(null); setScore(0); setQuizDone(false); };
    const q = QUIZ_QUESTIONS[quizIdx];

    return (
        <div className={styles['dh-page']}>
            {/* NAV */}
            <nav className={styles['dh-nav']}>
                <button className={styles['dh-nav-back']} onClick={() => navigate('/senior/grade/8/data-handling')}>
                    ← Data Handling
                </button>
                <div className={styles['dh-nav-links']}>
                    <button className={styles['dh-nav-link']} onClick={() => navigate('/senior/grade/8/data-handling/introduction')}>Introduction</button>
                    <button className={`${styles['dh-nav-link']} ${styles['dh-nav-link--active']}`}>Terminology</button>
                    <button className={styles['dh-nav-link']} onClick={() => navigate('/senior/grade/8/data-handling/skills')}>Skills</button>
                </div>
            </nav>

            {/* HERO */}
            <div className={styles['dh-module-hero']}>
                <h1 className={styles['dh-module-title']}>
                    Data Handling <span className={styles['dh-accent-text']}>Terminology</span>
                </h1>
                <p className={styles['dh-module-subtitle']}>6 Key Terms · 2 Key Ideas · 10-Q Quiz</p>
            </div>

            {/* TABS */}
            <div className={styles['dh-lexicon-container']} style={{ maxWidth: 1060, margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                    {[
                        { id: 'terms', label: '📚 Key Terms' },
                        { id: 'ideas', label: '💡 Key Ideas' },
                        { id: 'quiz', label: '🧪 Test Prep' },
                    ].map(({ id, label }) => (
                        <button key={id} className={`${styles['dh-tab']}${tab === id ? ` ${styles['active']}` : ''}`} onClick={() => setTab(id)}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── KEY TERMS ── */}
                {tab === 'terms' && (
                    <div className={styles['dh-learn-grid']}>
                        <aside className={styles['dh-learn-sidebar']}>
                            {KEY_TERMS.map((t, idx) => (
                                <button
                                    key={t.term}
                                    className={`${styles['dh-sidebar-btn']}${t.term === activeTerm.term ? ` ${styles['active']}` : ''}`}
                                    style={{ '--skill-color': t.color }}
                                    onClick={() => setActiveTerm(t)}
                                >
                                    <div className={styles['dh-sidebar-btn-num']}>{idx + 1}</div>
                                    <span className={styles['dh-sidebar-btn-title']}>{t.term}</span>
                                </button>
                            ))}
                        </aside>
                        <main className={`${styles['dh-details-window']} ${styles['dh-details-window-anim']}`} style={{ border: `2px solid ${activeTerm.color}15` }}>
                            <div className={styles['dh-learn-header-row']}>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: activeTerm.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Vocabulary Item</div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, color: '#0f172a', margin: 0 }}>{activeTerm.term}</h2>
                                </div>
                                <div style={{ fontSize: 32 }}>{activeTerm.symbol.includes('$') ? <LatexText text={activeTerm.symbol} /> : activeTerm.symbol}</div>
                            </div>

                            <div style={{ background: `${activeTerm.color}05`, padding: 24, borderRadius: 20, border: `2px solid ${activeTerm.color}15`, marginBottom: 20 }}>
                                <div style={{ fontSize: 16, lineHeight: 1.7, color: '#0f172a', margin: 0 }}>
                                    <LatexText text={activeTerm.definition} />
                                </div>
                            </div>

                            <div className={styles['dh-rule-split']}>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Example Case</h4>
                                    <div style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <div style={{ fontSize: 14, color: '#0f172a', lineHeight: 1.6 }}>
                                            <LatexText text={activeTerm.eg} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: activeTerm.color, marginBottom: 10 }}>Real-World Application</h4>
                                    <div style={{ background: `${activeTerm.color}08`, padding: 16, borderRadius: 14, border: `1px solid ${activeTerm.color}15` }}>
                                        <div style={{ fontSize: 14, color: '#0f172a', lineHeight: 1.6 }}>
                                            <LatexText text={activeTerm.realWorld} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['dh-learn-footer']} style={{ marginTop: 24 }}>
                                <button className={styles['dh-btn-primary']} onClick={() => setTab('ideas')}>Next: Key Ideas →</button>
                            </div>
                        </main>
                    </div>
                )}

                {/* ── KEY IDEAS ── */}
                {tab === 'ideas' && (
                    <div className={styles['dh-section']}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                            {KEY_IDEAS.map((idea, idx) => (
                                <button key={idx} onClick={() => { setActiveIdea(idx); setActiveRule(0); }}
                                    style={{ padding: '12px 24px', borderRadius: 50, border: '2px solid', borderColor: activeIdea === idx ? idea.color : '#e2e8f0', background: activeIdea === idx ? idea.color : '#fff', color: activeIdea === idx ? '#fff' : '#64748b', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Open Sans, sans-serif' }}>
                                    <span>{idea.icon}</span> {idea.label}
                                </button>
                            ))}
                        </div>

                        <div className={styles['dh-learn-grid']}>
                            <aside className={styles['dh-learn-sidebar']}>
                                {KEY_IDEAS[activeIdea].rules.map((rule, ri) => (
                                    <button key={ri} onClick={() => setActiveRule(ri)}
                                        className={`${styles['dh-sidebar-btn']}${activeRule === ri ? ` ${styles['active']}` : ''}`}
                                        style={{ '--skill-color': KEY_IDEAS[activeIdea].color }}>
                                        <div className={styles['dh-sidebar-btn-num']}>{ri + 1}</div>
                                        <span className={styles['dh-sidebar-btn-title']}>{rule.title}</span>
                                    </button>
                                ))}
                            </aside>

                            <main key={`${activeIdea}-${activeRule}`} className={`${styles['dh-details-window']} ${styles['dh-details-window-anim']}`} style={{ border: `2px solid ${KEY_IDEAS[activeIdea].color}15` }}>
                                <div className={styles['dh-learn-header-row']}>
                                    <div>
                                        <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: KEY_IDEAS[activeIdea].color }}>{KEY_IDEAS[activeIdea].rules[activeRule].title}</h3>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {activeRule + 1} OF {KEY_IDEAS[activeIdea].rules.length}</div>
                                    </div>
                                    <div style={{ fontSize: 32 }}>{KEY_IDEAS[activeIdea].rules[activeRule].icon}</div>
                                </div>

                                <div style={{ background: `${KEY_IDEAS[activeIdea].color}05`, padding: 24, borderRadius: 20, border: `2px solid ${KEY_IDEAS[activeIdea].color}15`, marginBottom: 28 }}>
                                    <div style={{ fontSize: 16, lineHeight: 1.7, color: '#0f172a', margin: 0 }}>
                                        <LatexText text={KEY_IDEAS[activeIdea].rules[activeRule].body} />
                                    </div>
                                </div>

                                <div className={styles['dh-learn-footer']}>
                                    <button className={styles['dh-btn-primary']} onClick={() => setTab('quiz')}>Test your Knowledge →</button>
                                    <button className={styles['dh-btn-secondary']} onClick={() => setActiveRule((activeRule + 1) % KEY_IDEAS[activeIdea].rules.length)}>
                                        Next: {KEY_IDEAS[activeIdea].rules[(activeRule + 1) % KEY_IDEAS[activeIdea].rules.length].title}
                                    </button>
                                </div>
                            </main>
                        </div>
                    </div>
                )}

                {/* ── QUIZ ── */}
                {tab === 'quiz' && (
                    <div className={styles['dh-quiz-container']}>
                        {quizDone ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ width: 120, height: 120, borderRadius: '50%', background: `conic-gradient(#0f766e ${(score / QUIZ_QUESTIONS.length) * 360}deg, #f1f5f9 0deg)`, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                                    <div style={{ width: 84, height: 84, background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 30, fontWeight: 900, color: '#0f172a' }}>{score}</div>
                                        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>/ {QUIZ_QUESTIONS.length}</div>
                                    </div>
                                </div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                                    {score >= 8 ? '🌟 Excellent!' : score >= 6 ? '👍 Good job!' : '💪 Keep Reviewing!'}
                                </h2>
                                <p style={{ color: '#64748b', margin: '0 0 28px' }}>You scored {score} out of {QUIZ_QUESTIONS.length}</p>
                                <button className={styles['dh-btn-primary']} onClick={resetQuiz}>🔁 Retry Quiz</button>
                            </div>
                        ) : (
                            <>
                                <div style={{ marginBottom: 20 }}>
                                    <div className={styles['dh-score-header']}>
                                        <div>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', letterSpacing: 1.2 }}>Test Prep</div>
                                            <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Terminology Quiz</div>
                                        </div>
                                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q {quizIdx + 1} / {QUIZ_QUESTIONS.length}</div>
                                    </div>
                                    <div style={{ background: '#f1f5f9', borderRadius: 8, height: 5, overflow: 'hidden', marginTop: 8 }}>
                                        <div style={{ height: '100%', width: `${((quizIdx + (selected !== null ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%`, background: '#0f766e', borderRadius: 8, transition: 'width 0.4s' }} />
                                    </div>
                                </div>
                                <div className={styles['dh-quiz-card']}>
                                    <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 20, lineHeight: 1.6 }}>
                                        <LatexText text={q.q} />
                                    </div>
                                    <div className={styles['dh-quiz-options']}>
                                        {q.options.map((opt, oi) => {
                                            let border = 'rgba(0,0,0,0.07)', bg = '#fff', txt = '#0f172a';
                                            if (selected !== null) {
                                                if (oi === q.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; txt = '#059669'; }
                                                else if (oi === selected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; txt = '#ef4444'; }
                                            } else if (selected === oi) { border = '#0f766e'; }
                                            return (
                                                <button key={oi} onClick={() => handleSelect(oi)} disabled={selected !== null}
                                                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderRadius: 12, border: `2.5px solid ${border}`, background: bg, cursor: selected !== null ? 'default' : 'pointer', fontSize: 14, color: txt, fontWeight: 600, textAlign: 'left', transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}>
                                                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: oi === q.correct && selected !== null ? '#10b981' : '#f1f5f9', flexShrink: 0 }} />
                                                    <LatexText text={opt} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button onClick={nextQ} disabled={selected === null}
                                        style={{ padding: '12px 40px', background: selected !== null ? '#0f766e' : '#f1f5f9', color: selected !== null ? '#fff' : '#94a3b8', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, cursor: selected !== null ? 'pointer' : 'not-allowed', transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}>
                                        {quizIdx + 1 >= QUIZ_QUESTIONS.length ? '🏁 See Score' : 'Next →'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '@/components/LatexText';
import styles from '../../cubes_and_cube_roots.module.css';

const KEY_TERMS = [
    {
        term: 'Perfect Cube',
        symbol: '$x^3$',
        definition: 'A number obtained by multiplying an integer by itself three times. Also called a cube number.',
        eg: '$5 \\times 5 \\times 5 = 125$. So, 125 is a perfect cube.',
        realWorld: 'The volume of a 3D cubic box where all sides are equal length.',
        color: '#0f766e',
    },
    {
        term: 'Cube Root',
        symbol: '$\\sqrt[3]{x}$',
        definition: 'The inverse operation of finding a cube. It answers the question: "What number multiplied by itself three times gives $x$?"',
        eg: '$\\sqrt[3]{64} = 4$, because $4 \\times 4 \\times 4 = 64$.',
        realWorld: 'Finding the length of one side of a cubic water tank when you only know its total volume.',
        color: '#1e40af',
    },
    {
        term: 'Prime Factorisation',
        symbol: '$p_1 \\times p_2$',
        definition: 'Breaking down a composite number into a product of its prime numbers (e.g., 2, 3, 5, 7).',
        eg: 'Prime factorisation of $216$ is $2 \\times 2 \\times 2 \\times 3 \\times 3 \\times 3$.',
        realWorld: 'Used in cryptography and computer algorithms to secure data.',
        color: '#7c3aed',
    },
    {
        term: 'Triplets',
        symbol: '$(a, a, a)$',
        definition: 'A group of three identical prime factors. For a number to be a perfect cube, every prime factor must appear in a triplet.',
        eg: 'In $216 = (2 \\times 2 \\times 2) \\times (3 \\times 3 \\times 3)$, both 2 and 3 are in triplets.',
        realWorld: 'Organizing items into equal 3D grid structures without leftovers.',
        color: '#b45309',
    },
];

const KEY_IDEAS = [
    {
        label: 'Identifying Perfect Cubes',
        color: '#0f766e',
        icon: '🔍',
        rules: [
            { icon: '🧩', title: 'Prime Factor Triplets', body: 'Find the prime factorisation. If every factor forms a group of three (triplet), the number is a perfect cube.' },
            { icon: '⚖️', title: 'Odd vs Even Cubes', body: 'The cube of an even number is always even ($4^3 = 64$). The cube of an odd number is always odd ($3^3 = 27$).' },
            { icon: '🔢', title: 'Unit Digits Rule', body: 'If a number ends in 1, 4, 5, 6, 9 or 0, its cube ends in the same digit. If it ends in 2, the cube ends in 8. If 3, the cube ends in 7.' },
            { icon: '➕', title: 'Missing Multiples', body: 'If prime factors are not in triplets, multiply (or divide) by the missing factors to make it a perfect cube.' },
        ],
    },
    {
        label: 'Finding Cube Roots',
        color: '#7c3aed',
        icon: '🧮',
        rules: [
            { icon: '🌳', title: 'Prime Factor Method', body: 'Group the prime factors into triplets. Take one factor from each triplet and multiply them to get the cube root.' },
            { icon: '👁️', title: 'Estimation (Step 1)', body: 'For large cubes, split the number into groups of 3 digits starting from the right. (e.g., $17576 \\rightarrow 17$ and $576$).' },
            { icon: '🎯', title: 'Estimation (Step 2)', body: 'The unit digit of the rightmost group gives the unit digit of the root. The leftmost group gives the tens digit based on the largest cube smaller than it.' },
            { icon: '⏳', title: 'Repeated Subtraction?', body: 'Unlike square roots (where you subtract successive odd numbers), this method is generally too complex for cube roots.' },
        ],
    },
];

const QUIZ_QUESTIONS = [
    { q: 'What is the cube of $4$?', options: ['$12$', '$16$', '$64$', '$256$'], correct: 2 },
    { q: 'Which of the following is NOT a perfect cube?', options: ['$27$', '$64$', '$100$', '$125$'], correct: 2 },
    { q: 'If a perfect cube ends in 8, its cube root ends in:', options: ['$2$', '$4$', '$6$', '$8$'], correct: 0 },
    { q: 'What is $\\sqrt[3]{1000}$?', options: ['$10$', '$100$', '$33.3$', '$300$'], correct: 0 },
    { q: 'For a number to be a perfect cube, its prime factors must appear in groups of:', options: ['2', '3', '4', '5'], correct: 1 },
    { q: 'The cube of an odd number is always:', options: ['Even', 'Odd', 'Zero', 'Prime'], correct: 1 },
    { q: 'If a number ends with $3$, its cube ends with:', options: ['$3$', '$9$', '$7$', '$1$'], correct: 2 },
    { q: 'What is the smallest Hardy-Ramanujan number?', options: ['$1000$', '$1728$', '$1729$', '$2000$'], correct: 2 },
    { q: 'If $x = 3$, what is the volume of a cube with side $x$?', options: ['$9$', '$18$', '$27$', '$81$'], correct: 2 },
    { q: 'By which smallest number should $24$ be multiplied to make it a perfect cube?', options: ['$2$', '$3$', '$9$', '$8$'], correct: 2 },
];

export default function CubesTerminology() {
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
        <div className={styles['ccr-page']}>
            {/* NAV */}
            <nav className={styles['ccr-nav']}>
                <button className={styles['ccr-nav-back']} onClick={() => navigate('/senior/grade/8/cubes-and-cube-roots')}>
                    ← Cubes & Cube Roots
                </button>
                <div className={styles['ccr-nav-links']}>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/cubes-and-cube-roots/introduction')}>Introduction</button>
                    <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Terminology</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/cubes-and-cube-roots/skills')}>Skills</button>
                </div>
            </nav>

            {/* HERO */}
            <div className={styles['ccr-module-hero']}>
                <h1 className={styles['ccr-module-title']}>
                    Cubes & Cube Roots <span className={styles['ccr-accent-text']}>Terminology</span>
                </h1>
                <p className={styles['ccr-module-subtitle']}>4 Key Terms · 2 Key Ideas · 10-Q Quiz</p>
            </div>

            {/* TABS */}
            <div className={styles['ccr-lexicon-container']} style={{ maxWidth: 1060, margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 24, paddingTop: 24 }}>
                    {[
                        { id: 'terms', label: '📚 Key Terms' },
                        { id: 'ideas', label: '💡 Key Ideas' },
                        { id: 'quiz', label: '🧪 Test Prep' },
                    ].map(({ id, label }) => (
                        <button key={id} className={`${styles['ccr-tab']}${tab === id ? ` ${styles['active']}` : ''}`} onClick={() => setTab(id)}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── KEY TERMS ── */}
                {tab === 'terms' && (
                    <div className={styles['ccr-learn-grid']}>
                        <aside className={styles['ccr-learn-sidebar']}>
                            {KEY_TERMS.map((t, idx) => (
                                <button
                                    key={t.term}
                                    className={`${styles['ccr-sidebar-btn']}${t.term === activeTerm.term ? ` ${styles['active']}` : ''}`}
                                    style={{ '--skill-color': t.color }}
                                    onClick={() => setActiveTerm(t)}
                                >
                                    <div className={styles['ccr-sidebar-btn-num']}>{idx + 1}</div>
                                    <span className={styles['ccr-sidebar-btn-title']}>{t.term}</span>
                                </button>
                            ))}
                        </aside>
                        <main className={`${styles['ccr-details-window']} ${styles['ccr-details-window-anim']}`} style={{ border: `2px solid ${activeTerm.color}15` }}>
                            <div className={styles['ccr-learn-header-row']}>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: activeTerm.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Vocabulary Item</div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, color: '#1e293b', margin: 0 }}>{activeTerm.term}</h2>
                                </div>
                                <div style={{ fontSize: 32 }}>{activeTerm.symbol.includes('$') ? <LatexText text={activeTerm.symbol} /> : activeTerm.symbol}</div>
                            </div>

                            <div style={{ background: `${activeTerm.color}05`, padding: 24, borderRadius: 20, border: `2px solid ${activeTerm.color}15`, marginBottom: 20 }}>
                                <div style={{ fontSize: 16, lineHeight: 1.7, color: '#1e293b', margin: 0 }}>
                                    <LatexText text={activeTerm.definition} />
                                </div>
                            </div>

                            <div className={styles['ccr-rule-split']}>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Example Case</h4>
                                    <div style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6 }}>
                                            <LatexText text={activeTerm.eg} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: activeTerm.color, marginBottom: 10 }}>Real-World Application</h4>
                                    <div style={{ background: `${activeTerm.color}08`, padding: 16, borderRadius: 14, border: `1px solid ${activeTerm.color}15` }}>
                                        <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6 }}>
                                            <LatexText text={activeTerm.realWorld} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['ccr-learn-footer']} style={{ marginTop: 24 }}>
                                {(() => {
                                    const idx = KEY_TERMS.findIndex(t => t.term === activeTerm.term);
                                    if (idx < KEY_TERMS.length - 1) {
                                        return (
                                            <button className={styles['ccr-btn-secondary']} onClick={() => setActiveTerm(KEY_TERMS[idx + 1])}>
                                                Next: {KEY_TERMS[idx + 1].term}
                                            </button>
                                        );
                                    }
                                    return (
                                        <button className={styles['ccr-btn-primary']} onClick={() => setTab('ideas')}>Next: Key Ideas →</button>
                                    );
                                })()}
                            </div>
                        </main>
                    </div>
                )}

                {/* ── KEY IDEAS ── */}
                {tab === 'ideas' && (
                    <div className={styles['ccr-section']}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                            {KEY_IDEAS.map((idea, idx) => (
                                <button key={idx} onClick={() => { setActiveIdea(idx); setActiveRule(0); }}
                                    style={{ padding: '12px 24px', borderRadius: 50, border: '2px solid', borderColor: activeIdea === idx ? idea.color : '#e2e8f0', background: activeIdea === idx ? idea.color : '#fff', color: activeIdea === idx ? '#fff' : '#64748b', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Open Sans, sans-serif' }}>
                                    <span>{idea.icon}</span> {idea.label}
                                </button>
                            ))}
                        </div>

                        <div className={styles['ccr-learn-grid']}>
                            <aside className={styles['ccr-learn-sidebar']}>
                                {KEY_IDEAS[activeIdea].rules.map((rule, ri) => (
                                    <button key={ri} onClick={() => setActiveRule(ri)}
                                        className={`${styles['ccr-sidebar-btn']}${activeRule === ri ? ` ${styles['active']}` : ''}`}
                                        style={{ '--skill-color': KEY_IDEAS[activeIdea].color }}>
                                        <div className={styles['ccr-sidebar-btn-num']}>{ri + 1}</div>
                                        <span className={styles['ccr-sidebar-btn-title']}>{rule.title}</span>
                                    </button>
                                ))}
                            </aside>

                            <main key={`${activeIdea}-${activeRule}`} className={`${styles['ccr-details-window']} ${styles['ccr-details-window-anim']}`} style={{ border: `2px solid ${KEY_IDEAS[activeIdea].color}15` }}>
                                <div className={styles['ccr-learn-header-row']}>
                                    <div>
                                        <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: KEY_IDEAS[activeIdea].color }}>{KEY_IDEAS[activeIdea].rules[activeRule].title}</h3>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {activeRule + 1} OF {KEY_IDEAS[activeIdea].rules.length}</div>
                                    </div>
                                    <div style={{ fontSize: 32 }}>{KEY_IDEAS[activeIdea].rules[activeRule].icon}</div>
                                </div>

                                <div style={{ background: `${KEY_IDEAS[activeIdea].color}05`, padding: 24, borderRadius: 20, border: `2px solid ${KEY_IDEAS[activeIdea].color}15`, marginBottom: 28 }}>
                                    <div style={{ fontSize: 16, lineHeight: 1.7, color: '#1e293b', margin: 0 }}>
                                        <LatexText text={KEY_IDEAS[activeIdea].rules[activeRule].body} />
                                    </div>
                                </div>

                                <div className={styles['ccr-learn-footer']}>
                                    {activeIdea === KEY_IDEAS.length - 1 && activeRule === KEY_IDEAS[activeIdea].rules.length - 1 && (
                                        <button className={styles['ccr-btn-primary']} onClick={() => setTab('quiz')}>Test your Knowledge →</button>
                                    )}
                                    {activeRule < KEY_IDEAS[activeIdea].rules.length - 1 ? (
                                        <button className={styles['ccr-btn-secondary']} onClick={() => setActiveRule(activeRule + 1)}>
                                            Next: {KEY_IDEAS[activeIdea].rules[activeRule + 1].title}
                                        </button>
                                    ) : (
                                        activeIdea < KEY_IDEAS.length - 1 && (
                                            <button className={styles['ccr-btn-secondary']} onClick={() => { setActiveIdea(activeIdea + 1); setActiveRule(0); }}>
                                                Next Idea: {KEY_IDEAS[activeIdea + 1].label}
                                            </button>
                                        )
                                    )}
                                </div>
                            </main>
                        </div>
                    </div>
                )}

                {/* ── QUIZ ── */}
                {tab === 'quiz' && (
                    <div className={styles['ccr-quiz-container']}>
                        {quizDone ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ width: 120, height: 120, borderRadius: '50%', background: `conic-gradient(#0f766e ${(score / QUIZ_QUESTIONS.length) * 360}deg, #f1f5f9 0deg)`, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                                    <div style={{ width: 84, height: 84, background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 30, fontWeight: 900, color: '#1e293b' }}>{score}</div>
                                        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>/ {QUIZ_QUESTIONS.length}</div>
                                    </div>
                                </div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, color: '#1e293b', margin: '0 0 8px' }}>
                                    {score >= 8 ? '🌟 Excellent!' : score >= 6 ? '👍 Good job!' : '💪 Keep Reviewing!'}
                                </h2>
                                <p style={{ color: '#64748b', margin: '0 0 28px' }}>You scored {score} out of {QUIZ_QUESTIONS.length}</p>
                                <button className={styles['ccr-btn-primary']} onClick={resetQuiz}>🔁 Retry Quiz</button>
                            </div>
                        ) : (
                            <>
                                <div style={{ marginBottom: 20 }}>
                                    <div className={styles['ccr-score-header']}>
                                        <div>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', letterSpacing: 1.2 }}>Test Prep</div>
                                            <div style={{ fontSize: 18, fontWeight: 800, color: '#1e293b' }}>Terminology Quiz</div>
                                        </div>
                                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q {quizIdx + 1} / {QUIZ_QUESTIONS.length}</div>
                                    </div>
                                    <div style={{ background: '#f1f5f9', borderRadius: 8, height: 5, overflow: 'hidden', marginTop: 8 }}>
                                        <div style={{ height: '100%', width: `${((quizIdx + (selected !== null ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%`, background: '#0f766e', borderRadius: 8, transition: 'width 0.4s' }} />
                                    </div>
                                </div>
                                <div className={styles['ccr-quiz-card']}>
                                    <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 20, lineHeight: 1.6 }}>
                                        <LatexText text={q.q} />
                                    </div>
                                    <div className={styles['ccr-quiz-options']}>
                                        {q.options.map((opt, oi) => {
                                            let border = 'rgba(0,0,0,0.07)', bg = '#fff', txt = '#1e293b';
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

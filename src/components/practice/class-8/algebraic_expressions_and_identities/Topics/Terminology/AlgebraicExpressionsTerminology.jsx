import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '@/components/LatexText';
import styles from '../../algebraic_expressions.module.css';

const KEY_TERMS = [
    {
        term: 'Algebraic Expression',
        symbol: '$3x + 5$',
        definition: 'A mathematical phrase formed using constants, variables, and operations such as addition, subtraction, and multiplication.',
        eg: 'In $2x + 7$, the variable is $x$ and the expression changes when the value of $x$ changes.',
        realWorld: 'If one notebook costs ₹$x$, then the cost of 3 notebooks and a ₹10 cover is $3x + 10$.',
        color: '#0f766e',
    },
    {
        term: 'Terms, Factors & Coefficient',
        symbol: '$-4x^2y$',
        definition: 'Terms are parts of an expression separated by $+$ or $-$. Factors are the multiplied parts inside a term. The numerical factor is called the coefficient.',
        eg: 'In $-4x^2y$, the factors are $-4$, $x^2$, and $y$. The coefficient is $-4$.',
        realWorld: 'In $25n$, ₹25 is the fixed cost per notebook and $n$ is the number of notebooks.',
        color: '#1e40af',
    },
    {
        term: 'Monomial, Binomial, Polynomial',
        symbol: '$5x$, $x+2$, $x^2+3x+1$',
        definition: 'A monomial has one term, a binomial has two terms, and a polynomial has one or more terms with non-negative integral exponents.',
        eg: '$7ab$ is a monomial, $p-q$ is a binomial, and $x^2 + 4x + 4$ is a polynomial.',
        realWorld: 'A pricing rule may have one charge, two charges, or many charges depending on the number of parts in the model.',
        color: '#7c3aed',
    },
    {
        term: 'Like and Unlike Terms',
        symbol: '$3x^2$ & $-5x^2$',
        definition: 'Like terms have exactly the same variables with the same powers. Terms with different variables or powers are unlike terms.',
        eg: '$3x^2$ and $-5x^2$ are like terms, but $3x^2$ and $3x$ are unlike terms.',
        realWorld: 'We can add 3 mango boxes and 5 mango boxes, but not 3 mango boxes and 5 orange boxes.',
        color: '#b45309',
    },
    {
        term: 'Algebraic Identity',
        symbol: '$(a+b)^2$',
        definition: 'An identity is an equality that remains true for every value of the variables in it.',
        eg: '$(a+b)^2 = a^2 + 2ab + b^2$ is always true, but $a+b = 7$ is true only for some values.',
        realWorld: 'Identities act like trusted formulas that let us compute large products and squares more efficiently.',
        color: '#be185d',
    },
];

const KEY_IDEAS = [
    {
        label: 'Simplifying Expressions',
        color: '#0f766e',
        icon: '🧩',
        rules: [
            { icon: '🔍', title: 'Identify Terms Carefully', body: 'Split an expression where $+$ or $-$ appears. Always keep the sign with the term.' },
            { icon: '📌', title: 'Combine Only Like Terms', body: 'Add or subtract only those terms that have exactly the same variables raised to the same powers.' },
            { icon: '➖', title: 'Subtraction Needs Brackets', body: 'While subtracting expressions, change the signs of all terms inside the bracket before combining.' },
            { icon: '📐', title: 'Standard Form Helps', body: 'Arrange terms in descending powers to make expressions easier to compare and simplify.' },
        ],
    },
    {
        label: 'Multiplication & Identities',
        color: '#7c3aed',
        icon: '🧮',
        rules: [
            { icon: '✖️', title: 'Distributive Law', body: 'Multiply a monomial with every term of the polynomial: $a(b+c+d)=ab+ac+ad$.' },
            { icon: '🔁', title: 'Multiply Every Term', body: 'In a binomial or trinomial product, each term of one factor multiplies each term of the other factor.' },
            { icon: '➕', title: 'Square of a Sum or Difference', body: 'Use $(a+b)^2$ and $(a-b)^2$ patterns to expand quickly without rewriting repeated multiplication.' },
            { icon: '⚡', title: 'Difference of Squares', body: 'Use $(a+b)(a-b)=a^2-b^2$ when two factors differ only by the sign of the second term.' },
        ],
    },
];

const QUIZ_QUESTIONS = [
    { q: 'Which of these is a binomial?', options: ['$7x$', '$x^2 + 3x$', '$a+b+c$', '$5xyz$'], correct: 1 },
    { q: 'The coefficient of $y$ in $4x - 5y + 2$ is:', options: ['$5$', '$-5$', '$y$', '$-y$'], correct: 1 },
    { q: 'Which pair is made of like terms?', options: ['$3x$ and $3y$', '$2ab$ and $-5ba$', '$x^2$ and $x$', '$4m$ and $4n$'], correct: 1 },
    { q: 'How many terms are there in $p^2 - 3p + 7$?', options: ['$1$', '$2$', '$3$', '$4$'], correct: 2 },
    { q: 'What is $(a+b)(a-b)$ equal to?', options: ['$a^2+b^2$', '$a^2-b^2$', '$a^2-2ab+b^2$', '$a^2+2ab+b^2$'], correct: 1 },
    { q: 'Which statement about an identity is true?', options: ['It is true for one value only', 'It is true for all values', 'It never contains variables', 'It is always an equation to solve'], correct: 1 },
    { q: 'Simplify $3x + 4x$.', options: ['$7x$', '$7x^2$', '$12x$', '$x$'], correct: 0 },
    { q: 'Which of these is a monomial?', options: ['$x+1$', '$4xy^2$', '$p-q$', '$a+b+c$'], correct: 1 },
    { q: 'The constant term in $x^2 + 2x + 9$ is:', options: ['$x^2$', '$2$', '$9$', '$x$'], correct: 2 },
    { q: 'Expand $(x+2)^2$.', options: ['$x^2+4$', '$x^2+2x+4$', '$x^2+4x+4$', '$x^2-4x+4$'], correct: 2 },
];

export default function AlgebraicExpressionsTerminology() {
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
            <nav className={styles['ccr-nav']}>
                <button className={styles['ccr-nav-back']} onClick={() => navigate('/senior/grade/8/algebraic-expressions-and-identities')}>
                    ← Expressions & Identities
                </button>
                <div className={styles['ccr-nav-links']}>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/algebraic-expressions-and-identities/introduction')}>Introduction</button>
                    <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Terminology</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/algebraic-expressions-and-identities/skills')}>Skills</button>
                </div>
            </nav>

            <div className={styles['ccr-module-hero']}>
                <h1 className={styles['ccr-module-title']}>
                    Expressions <span className={styles['ccr-accent-text']}>Terminology</span>
                </h1>
                <p className={styles['ccr-module-subtitle']}>5 Key Terms · 2 Key Ideas · 10-Q Quiz</p>
            </div>

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

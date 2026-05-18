import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../../class-12/Matrices/Matrices.css';
import '../../../../../class-12/Matrices/MatricesPages.css';
import { TRIG_EXAM_DATA, FORMULA_SHEET } from './TrigExamEdgeData';
import MathRenderer from '../../../../../../MathRenderer';

const BASE = '/senior/grade/11/maths/trigonometric-functions';

export default function TrigExamEdge() {
    const navigate = useNavigate();
    const [activeExam, setActiveExam] = useState('cet');
    const [activeSection, setActiveSection] = useState('topics');
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [showFormula, setShowFormula] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const exam = TRIG_EXAM_DATA[activeExam];
    const pyqs = exam.pyqs;
    const currentQ = pyqs[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0); setQuizSelected(null); setQuizAnswered(false);
        setQuizScore(0); setQuizFinished(false);
    };

    const switchExam = (key) => {
        setActiveExam(key); setActiveSection('topics'); resetQuiz(); setShowFormula(false);
    };

    const handleSelect = (idx) => {
        if (quizAnswered) return;
        setQuizSelected(idx); setQuizAnswered(true);
        if (idx === currentQ.correct) setQuizScore(s => s + 1);
    };

    const nextQ = () => {
        if (quizIdx + 1 < pyqs.length) { setQuizIdx(i => i + 1); setQuizSelected(null); setQuizAnswered(false); }
        else { setQuizFinished(true); }
    };

    const sidebarSections = [
        { key: 'topics', label: 'Important Topics', icon: '🔥' },
        { key: 'traps',  label: 'Exam Traps',       icon: '⚠️' },
        { key: 'pyqs',   label: 'PYQs',             icon: '📘' }
    ];

    const examKeys = Object.entries(TRIG_EXAM_DATA);

    return (
        <div className="mat-page">
            {/* NAV */}
            <nav className="mat-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <button onClick={() => navigate(BASE)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px', color: '#64748b' }}>← Back to Trigonometric Functions</button>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Introduction</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/skills`)}>🎯 Skills</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', color: '#fff', border: 'none', boxShadow: '0 4px 14px rgba(30,27,75,0.3)' }} onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
                </div>
            </nav>

            {/* HERO */}
            <div className="det-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="det-intro-hero-deco det-intro-hero-deco-a" />
                <div className="det-intro-hero-deco det-intro-hero-deco-b" />
                <div className="det-intro-hero-inner">
                    <h1 className="det-intro-hero-title">Trigonometric Functions <span className="det-intro-hero-highlight">Exam Edge</span></h1>
                    <p className="det-intro-hero-sub">Strategic insights, high-yield topics, and PYQs for CET, JEE Mains &amp; JEE Advanced.</p>
                </div>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

                {/* FORMULA SHEET TOGGLE */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                    <button
                        onClick={() => setShowFormula(f => !f)}
                        style={{
                            padding: '12px 32px', borderRadius: '100px', border: '2px solid',
                            borderColor: showFormula ? '#0369a1' : '#e2e8f0',
                            background: showFormula ? '#0369a110' : '#fff',
                            color: showFormula ? '#0369a1' : '#64748b',
                            fontWeight: 800, cursor: 'pointer', fontSize: '15px',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        📋 {showFormula ? 'Hide Formula Sheet' : 'Show Formula Sheet'}
                    </button>
                </div>

                {/* FORMULA SHEET PANEL */}
                {showFormula && (
                    <div style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '32px', marginBottom: '40px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 900, marginBottom: '28px', color: '#1e1b4b', textAlign: 'center' }}>
                            📋 Trigonometry Formula Sheet
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))', gap: '20px' }}>
                            {FORMULA_SHEET.map((group, gi) => (
                                <div key={gi} style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: `1px solid ${group.color}20` }}>
                                    <div style={{ fontSize: '13px', fontWeight: 900, color: group.color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: group.color }} />
                                        {group.category}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {group.formulas.map((f, fi) => (
                                            <div key={fi} style={{ background: '#fff', borderRadius: '10px', padding: '12px 16px', border: '1px solid #e2e8f0' }}>
                                                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>{f.name}</div>
                                                <div style={{ fontSize: '14px', color: '#1e293b', fontFamily: 'monospace', lineHeight: 1.5 }}>
                                                    <MathRenderer text={`$${f.formula}$`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* EXAM TABS */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {examKeys.map(([key, val]) => (
                        <button
                            key={key}
                            onClick={() => switchExam(key)}
                            style={{
                                padding: '12px 24px', borderRadius: '100px',
                                border: '2px solid', borderColor: activeExam === key ? val.color : '#e2e8f0',
                                background: activeExam === key ? `${val.color}10` : '#fff',
                                color: activeExam === key ? val.color : '#64748b',
                                fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s',
                                display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px'
                            }}
                        >
                            <span>{val.icon}</span> {val.label}
                        </button>
                    ))}
                </div>

                {/* MAIN DETAIL AREA */}
                <div style={{ background: '#fff', borderRadius: '32px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '220px 1fr', overflow: 'hidden' }}>

                    {/* LEFT SIDEBAR */}
                    <div style={{ background: '#f8fafc', padding: '24px 16px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ padding: '12px 16px', marginBottom: '8px' }}>
                            <div style={{ fontSize: '28px', marginBottom: '6px' }}>{exam.icon}</div>
                            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '20px', fontWeight: 900, color: exam.color }}>{exam.label}</div>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginTop: '2px' }}>{exam.tagline}</div>
                        </div>

                        {sidebarSections.map(s => {
                            const isActive = activeSection === s.key;
                            return (
                                <button
                                    key={s.key}
                                    onClick={() => { setActiveSection(s.key); if (s.key === 'pyqs') resetQuiz(); }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '10px',
                                        padding: '12px 16px', borderRadius: '12px', border: 'none',
                                        background: isActive ? `${exam.color}12` : 'transparent',
                                        color: isActive ? exam.color : '#64748b',
                                        fontWeight: isActive ? 800 : 600, fontSize: '14px',
                                        cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
                                        borderLeft: isActive ? `3px solid ${exam.color}` : '3px solid transparent'
                                    }}
                                >
                                    <span style={{ fontSize: '16px' }}>{s.icon}</span> {s.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* RIGHT CONTENT PANEL */}
                    <div style={{ padding: '36px 40px' }}>

                        {/* IMPORTANT TOPICS */}
                        {activeSection === 'topics' && (
                            <>
                                <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    🎯 High-Yield Topics
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
                                    {exam.importantTopics.filter(t => t.hot).map((t, i) => (
                                        <div key={i} style={{ background: `${exam.color}08`, padding: '10px 18px', borderRadius: '12px', border: `1px solid ${exam.color}20`, fontSize: '15px', fontWeight: 700, color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            🔥 {t.text}
                                        </div>
                                    ))}
                                </div>

                                <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                                    All Topics
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {exam.importantTopics.map((t, i) => (
                                        <div key={i} style={{
                                            background: '#f8fafc', padding: '14px 20px', borderRadius: '14px',
                                            border: t.hot ? `1px solid ${exam.color}25` : '1px solid #e2e8f0',
                                            display: 'flex', alignItems: 'center', gap: '14px'
                                        }}>
                                            <div style={{
                                                width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                                                background: '#ede9fe',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '14px', fontWeight: 900, color: '#7c3aed'
                                            }}>
                                                {i + 1}
                                            </div>
                                            <span style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>{t.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* EXAM TRAPS */}
                        {activeSection === 'traps' && (
                            <>
                                <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    ⚠️ Common Pitfalls
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {exam.traps.map((t, i) => (
                                        <div key={i} style={{
                                            background: '#fff', borderRadius: '20px', padding: '24px',
                                            border: '1px solid #fee2e2', boxShadow: '0 4px 16px rgba(239,68,68,0.04)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                                                <div style={{ background: '#fef2f2', padding: '6px 10px', borderRadius: '8px', fontSize: '16px', flexShrink: 0 }}>❌</div>
                                                <div>
                                                    <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#ef4444', marginBottom: '4px' }}>Trap</div>
                                                    <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#991b1b', lineHeight: 1.5 }}>{t.trap}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                <div style={{ background: '#ecfdf5', padding: '6px 10px', borderRadius: '8px', fontSize: '16px', flexShrink: 0 }}>✅</div>
                                                <div>
                                                    <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#059669', marginBottom: '4px' }}>Reality</div>
                                                    <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#065f46', lineHeight: 1.5 }}>{t.correction}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* PYQs */}
                        {activeSection === 'pyqs' && (
                            <>
                                {!quizFinished ? (
                                    <>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                                            <div>
                                                <div style={{ fontSize: '12px', fontWeight: 800, color: exam.color, textTransform: 'uppercase', letterSpacing: '2px' }}>Question {quizIdx + 1} of {pyqs.length}</div>
                                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '22px', fontWeight: 800, color: '#1e293b', margin: '4px 0 0' }}>{exam.label} PYQ</h3>
                                            </div>
                                            <div style={{
                                                width: '52px', height: '52px', borderRadius: '50%',
                                                border: '4px solid #f1f5f9', borderTopColor: exam.color,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '16px', fontWeight: 900, color: exam.color
                                            }}>{quizScore}</div>
                                        </div>

                                        <div style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', lineHeight: 1.6, marginBottom: '24px' }}>
                                            <MathRenderer text={currentQ.question} />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                                            {currentQ.options.map((opt, oi) => {
                                                let bg = '#f8fafc', bdr = '2px solid #e2e8f0', clr = '#334155';
                                                if (quizAnswered) {
                                                    if (oi === currentQ.correct) { bg = '#ecfdf5'; bdr = '2px solid #10b981'; clr = '#065f46'; }
                                                    else if (oi === quizSelected) { bg = '#fef2f2'; bdr = '2px solid #ef4444'; clr = '#991b1b'; }
                                                }
                                                return (
                                                    <button key={oi} onClick={() => handleSelect(oi)} disabled={quizAnswered}
                                                        style={{
                                                            padding: '16px', borderRadius: '14px', fontSize: '14px', fontWeight: 600, textAlign: 'left',
                                                            background: bg, border: bdr, color: clr,
                                                            cursor: quizAnswered ? 'default' : 'pointer', transition: 'all 0.2s'
                                                        }}
                                                    >
                                                        <MathRenderer text={opt} />
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {quizAnswered && (
                                            <div style={{ background: '#f0fdfa', padding: '16px 20px', borderRadius: '14px', border: '1px solid #ccfbf1', marginBottom: '24px' }}>
                                                <p style={{ margin: 0, fontSize: '14px', color: '#0f766e', lineHeight: 1.6 }}>
                                                    <strong style={{ color: '#0d9488' }}>Explanation: </strong>{currentQ.explanation}
                                                </p>
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <button onClick={nextQ} disabled={!quizAnswered}
                                                style={{
                                                    padding: '12px 36px', borderRadius: '100px', border: 'none', fontSize: '15px', fontWeight: 800,
                                                    background: quizAnswered ? exam.color : '#e2e8f0',
                                                    color: quizAnswered ? '#fff' : '#94a3b8',
                                                    cursor: quizAnswered ? 'pointer' : 'not-allowed', transition: 'all 0.2s'
                                                }}
                                            >{quizIdx + 1 === pyqs.length ? 'Finish' : 'Next →'}</button>
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                        <div style={{ fontSize: '56px', marginBottom: '16px' }}>{quizScore >= 4 ? '🏆' : quizScore >= 3 ? '🎯' : '💪'}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '8px', color: '#1e293b' }}>
                                            {quizScore >= 4 ? 'Excellent!' : quizScore >= 3 ? 'Good job!' : 'Keep practicing!'}
                                        </h2>
                                        <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '28px' }}>
                                            You scored <span style={{ color: exam.color, fontWeight: 900 }}>{quizScore} / {pyqs.length}</span>
                                        </p>
                                        <button onClick={resetQuiz} style={{
                                            padding: '12px 32px', borderRadius: '100px', border: `2px solid ${exam.color}`,
                                            background: 'transparent', color: exam.color, fontWeight: 800, cursor: 'pointer', fontSize: '15px'
                                        }}>Try Again</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* FINISH BUTTON */}
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <button onClick={() => navigate(BASE)} style={{
                        padding: '12px 32px', fontSize: 16, background: '#312e81', color: '#fff',
                        border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer',
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        boxShadow: '0 4px 14px rgba(49,46,129,0.4)', transition: 'all 0.2s'
                    }}>
                        Back to Dashboard ✓
                    </button>
                </div>
            </main>
        </div>
    );
}

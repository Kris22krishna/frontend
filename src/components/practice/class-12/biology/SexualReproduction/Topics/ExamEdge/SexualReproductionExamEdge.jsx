import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../SexualReproductionBranch.css';
import { EXAM_DATA } from './SexualReproductionExamEdgeData';

export default function SexualReproductionExamEdge() {
    const navigate = useNavigate();
    const [activeExam, setActiveExam] = useState('neet');
    const [activeSection, setActiveSection] = useState('topics');
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const exam = EXAM_DATA[activeExam];
    const pyqs = exam.pyqs;
    const currentQ = pyqs[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0); setQuizSelected(null); setQuizAnswered(false); setQuizScore(0); setQuizFinished(false);
    };

    const switchExam = (key) => {
        setActiveExam(key); setActiveSection('topics'); resetQuiz();
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

    const examKeys = Object.entries(EXAM_DATA);

    return (
        <div className="sr-page">
            {/* NAV */}
            <nav className="sr-nav">
                <button className="sr-nav-back" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction')}>← Back to Dashboard</button>
                <div className="sr-nav-links">
                    <button className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/introduction')}>Introduction</button>
                    <button className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/terminology')}>Terminology</button>
                    <button className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/skills')}>Skills</button>
                    <button className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/connectomics')}>Connectomics</button>
                    <button className="sr-nav-link active">Exam Edge</button>
                </div>
            </nav>

            {/* HERO */}
            <div className="sr-hero" style={{ background: 'linear-gradient(145deg, #ef4444 0%, #dc2626 100%)' }}>
                <h1 className="sr-hero-title">Sexual Reproduction <span style={{ color: '#fef2f2' }}>Exam Edge</span></h1>
                <p className="sr-hero-sub">Strategic insights and high-weightage topics for competitive exams.</p>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

                {/* EXAM TABS — pill-style like The Cell */}
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
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}
                        >
                            <span>{val.icon}</span> {val.label}
                        </button>
                    ))}
                </div>

                {/* MAIN DETAIL AREA — sidebar left + content right */}
                <div className="sr-details-window" style={{ background: '#fff', borderRadius: '32px', padding: '0', boxShadow: '0 12px 32px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '220px 1fr', overflow: 'hidden' }}>

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

                        {/* ─── IMPORTANT TOPICS ─── */}
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
                                                background: '#f3e8ff',
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

                        {/* ─── EXAM TRAPS ─── */}
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
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', paddingLeft: '4px' }}>
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

                        {/* ─── PYQs ─── */}
                        {activeSection === 'pyqs' && (
                            <>
                                {/* Board exam — long answer style */}
                                {activeExam === 'boards' ? (
                                    <>
                                        <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
                                            📝 Board Exam — Long Answer PYQs
                                        </h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            {pyqs.map((q, qi) => (
                                                <div key={qi} style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                                        <div style={{
                                                            width: '32px', height: '32px', borderRadius: '50%', background: exam.gradient,
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontSize: '14px', fontWeight: 900, color: '#fff', flexShrink: 0
                                                        }}>{qi + 1}</div>
                                                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>{q.question}</h4>
                                                    </div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                        {q.keyPoints.map((kp, ki) => (
                                                            <span key={ki} style={{
                                                                padding: '6px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 600,
                                                                background: `${exam.color}10`, color: exam.color, border: `1px solid ${exam.color}25`
                                                            }}>✓ {kp}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    /* NEET / CET — MCQ style */
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

                                                <div style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', lineHeight: 1.5, marginBottom: '24px' }}>
                                                    {currentQ.question}
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
                                                                    background: bg, border: bdr, color: clr, cursor: quizAnswered ? 'default' : 'pointer', transition: 'all 0.2s'
                                                                }}
                                                            >{opt}</button>
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
                                                            background: quizAnswered ? exam.color : '#e2e8f0', color: quizAnswered ? '#fff' : '#94a3b8',
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
                            </>
                        )}
                    </div>
                </div>

                {/* FINISH BUTTON */}
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <button onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction')} style={{ padding: '12px 32px', fontSize: 16, background: '#10b981', color: '#fff', border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(16,185,129,0.4)', transition: 'all 0.2s' }}>
                        Finish Topic <span style={{ color: '#fff' }}>✓</span>
                    </button>
                </div>
            </main>
        </div>
    );
}

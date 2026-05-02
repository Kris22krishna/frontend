import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../SexualReproductionBranch.css';
import { TERMS, VOCAB_QUIZ } from './SexualReproductionTerminologyData';

export default function SexualReproductionTerminology() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Tabs state
    const [activeTab, setActiveTab] = useState('terms');

    // Selection state for Master-Detail
    const [selectedIdx, setSelectedIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = TERMS[selectedIdx];
    const activeQuiz = VOCAB_QUIZ[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0);
        setQuizSelected(null);
        setQuizAnswered(false);
        setQuizTotalScore(0);
        setQuizFinished(false);
    };

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        if (optIdx === activeQuiz.correct) {
            setQuizTotalScore(s => s + 1);
        }
    };

    const nextQuiz = () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className="sr-page">
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="sr-nav">
                <button className="sr-nav-back" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction')}>
                    ← Back to Dashboard
                </button>
                <div className="sr-nav-links">
                    <button className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/introduction')}>Introduction</button>
                    <button className="sr-nav-link active">Terminology</button>
                    <button className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/skills')}>Skills</button>
                    <button className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/connectomics')}>Connectomics</button>
                    <button className="sr-nav-link" onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/exam-edge')}>Exam Edge</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="sr-topic-shell" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

                {/* Heading Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', fontWeight: 900, color: '#1e293b', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                        Botanical <span style={{ background: 'linear-gradient(135deg, #0d9488, #0f766e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lexicon</span>
                    </h1>
                    <p style={{ fontSize: '18px', fontWeight: 500, color: '#64748b', maxWidth: '650px', lineHeight: 1.6 }}>
                        {activeTab === 'quiz' ? 'Test your botanical vocabulary and knowledge!' : `Explore the foundations with ${TERMS.length} key terms.`}
                    </p>
                </div>

                {/* Sub Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
                    <button 
                        style={{ padding: '10px 24px', borderRadius: '100px', border: 'none', background: activeTab === 'terms' ? '#0d9488' : '#f1f5f9', color: activeTab === 'terms' ? '#fff' : '#64748b', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                        onClick={() => setActiveTab('terms')}
                    >📚 Key Terms</button>
                    <button 
                        style={{ padding: '10px 24px', borderRadius: '100px', border: 'none', background: activeTab === 'quiz' ? '#0d9488' : '#f1f5f9', color: activeTab === 'quiz' ? '#fff' : '#64748b', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                        onClick={() => setActiveTab('quiz')}
                    >🧪 Quiz Time</button>
                </div>

                {activeTab !== 'quiz' ? (
                    /* ── MASTER-DETAIL VIEW (Terms) ── */
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: '32px', alignItems: 'start' }}>
                        <aside style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {TERMS.map((term, i) => {
                                const isActive = selectedIdx === i;
                                return (
                                    <button 
                                        key={i} 
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px',
                                            background: isActive ? `${term.color}15` : '#fff', border: isActive ? `2px solid ${term.color}` : '2px solid transparent',
                                            cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: isActive ? 'none' : '0 2px 8px rgba(0,0,0,0.02)'
                                        }}
                                        onClick={() => setSelectedIdx(i)}
                                    >
                                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: isActive ? '#fff' : `${term.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{term.icon}</div>
                                        <span style={{ fontWeight: 700, fontSize: '14px', color: isActive ? term.color : '#334155' }}>{term.name}</span>
                                    </button>
                                );
                            })}
                        </aside>

                        <main key={selectedIdx} style={{ background: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 12px 40px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>{activeTerm.icon}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '36px', fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                            </div>
                            
                            <p style={{ fontSize: '18px', color: '#334155', lineHeight: 1.6, margin: '0 0 32px' }}>
                                {activeTerm.def}
                            </p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1.5px', color: activeTerm.color, marginBottom: '12px', fontWeight: 800 }}>Real-Life Example</h4>
                                    <div style={{ background: `${activeTerm.color}08`, padding: '20px', borderRadius: '16px', border: `1px solid ${activeTerm.color}20` }}>
                                        {activeTerm.examples.map((ex, j) => (
                                            <p key={j} style={{ margin: 0, fontSize: '15px', color: '#1e293b', fontWeight: 500, lineHeight: 1.5 }}>
                                                {ex}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1.5px', color: '#0d9488', marginBottom: '12px', fontWeight: 800 }}>Memory Hook</h4>
                                    <div style={{ background: '#f0fdfa', padding: '20px', borderRadius: '16px', border: '1px solid #ccfbf1' }}>
                                        <p style={{ margin: 0, fontSize: '15px', color: '#0f766e', lineHeight: 1.5 }}>
                                            <span style={{ fontWeight: 800 }}>💡 Pro-Hint: </span>
                                            {activeTerm.memory}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Textbook Image Section */}
                            {activeTerm.image && (
                                <div style={{ borderTop: '2px dashed #e2e8f0', paddingTop: '32px' }}>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1.5px', color: '#64748b', marginBottom: '16px', fontWeight: 800, textAlign: 'center' }}>Textbook Diagram</h4>
                                    <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
                                        <img 
                                            src={activeTerm.image} 
                                            alt={activeTerm.name} 
                                            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                                        />
                                    </div>
                                    <p style={{ textAlign: 'center', margin: '12px 0 0', fontSize: '14px', color: '#94a3b8', fontStyle: 'italic' }}>
                                        {activeTerm.inUse}
                                    </p>
                                </div>
                            )}
                        </main>
                    </div>
                ) : (
                    /* ── VOCABULARY TEST TAB ── */
                    <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 12px 40px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', maxWidth: '800px', margin: '0 auto' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                    <div>
                                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '2px' }}>Question {quizIdx + 1} of {VOCAB_QUIZ.length}</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '26px', fontWeight: 800, color: '#1e293b', margin: '4px 0 0' }}>Quiz Mode</h3>
                                    </div>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 900, color: '#0d9488' }}>
                                        {quizTotalScore}
                                    </div>
                                </div>

                                <div style={{ fontSize: '22px', fontWeight: 600, color: '#1e293b', lineHeight: 1.5, marginBottom: '32px' }}>
                                    {activeQuiz.question}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                                    {activeQuiz.options.map((opt, oi) => {
                                        let background = '#f8fafc';
                                        let border = '2px solid #e2e8f0';
                                        let color = '#334155';
                                        if (quizAnswered) {
                                            if (oi === activeQuiz.correct) {
                                                background = '#ecfdf5';
                                                border = '2px solid #10b981';
                                                color = '#065f46';
                                            } else if (oi === quizSelected) {
                                                background = '#fef2f2';
                                                border = '2px solid #ef4444';
                                                color = '#991b1b';
                                            }
                                        } else if (quizSelected === oi) {
                                            border = '2px solid #0d9488';
                                            background = '#f0fdfa';
                                        }

                                        return (
                                            <button 
                                                key={oi} 
                                                onClick={() => handleQuizSelect(oi)} 
                                                disabled={quizAnswered} 
                                                style={{ 
                                                    padding: '20px', borderRadius: '16px', fontSize: '16px', fontWeight: 600, textAlign: 'left',
                                                    background, border, color, cursor: quizAnswered ? 'default' : 'pointer', transition: 'all 0.2s'
                                                }}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizAnswered && (
                                    <div style={{ background: '#f0fdfa', padding: '20px', borderRadius: '16px', border: '1px solid #ccfbf1', marginBottom: '32px' }}>
                                        <p style={{ margin: 0, fontSize: '15px', color: '#0f766e', lineHeight: 1.6 }}>
                                            <strong style={{ color: '#0d9488' }}>Explanation: </strong>
                                            {activeQuiz.explanation}
                                        </p>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button 
                                        onClick={nextQuiz} 
                                        disabled={!quizAnswered} 
                                        style={{ 
                                            padding: '14px 44px', borderRadius: '100px', border: 'none', fontSize: '16px', fontWeight: 800,
                                            background: quizAnswered ? '#0d9488' : '#e2e8f0', color: quizAnswered ? '#fff' : '#94a3b8', 
                                            cursor: quizAnswered ? 'pointer' : 'not-allowed', transition: 'all 0.2s' 
                                        }}
                                    >
                                        {quizIdx + 1 === VOCAB_QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ fontSize: '72px', marginBottom: '20px' }}>{quizTotalScore >= 4 ? '🏆' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '36px', fontWeight: 900, marginBottom: '12px', color: '#1e293b' }}>Great effort!</h2>
                                <p style={{ color: '#64748b', fontSize: '20px', marginBottom: '40px' }}>You scored <span style={{ color: '#0d9488', fontWeight: 900 }}>{quizTotalScore} / {VOCAB_QUIZ.length}</span></p>
                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                    <button onClick={resetQuiz} style={{ padding: '14px 32px', borderRadius: '100px', border: '2px solid #0d9488', background: 'transparent', color: '#0d9488', fontWeight: 800, cursor: 'pointer' }}>Try Again</button>
                                    <button onClick={() => navigate('/senior/grade/12/biology/sexual-reproduction/skills')} style={{ padding: '14px 32px', borderRadius: '100px', border: 'none', background: '#0d9488', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>Practical Skills →</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

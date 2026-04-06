import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../TrianglesBranch.css';
import MathRenderer from '../../../../../MathRenderer';
import { TERMS, FIVE_RULES, VOCAB_QUIZ } from './TrianglesTerminologyData';
import { useSessionLogger } from '@/hooks/useSessionLogger';

const TERMINOLOGY_QUIZ_NODE_ID = 'a4101006-0010-0000-0000-000000000000';

export default function TrianglesTerminology() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const quizAnswers = useRef([]);

    useEffect(() => {
        if (activeTab === 'quiz') {
            startSession({ nodeId: TERMINOLOGY_QUIZ_NODE_ID, sessionType: 'quiz' });
            quizAnswers.current = [];
        }
    }, [activeTab]);

    const activeTerm = TERMS[selectedIdx];
    const activeRule = FIVE_RULES[selectedRuleIdx];
    const activeQuiz = VOCAB_QUIZ[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0);
        setQuizSelected(null);
        setQuizAnswered(false);
        setQuizTotalScore(0);
        setQuizFinished(false);
        startSession({ nodeId: TERMINOLOGY_QUIZ_NODE_ID, sessionType: 'quiz' });
        quizAnswers.current = [];
    };

    const handleQuizSelect = async (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        const isCorrect = optIdx === activeQuiz.correct;
        if (isCorrect) setQuizTotalScore((prev) => prev + 1);
        const answerData = { question_index: quizIdx + 1, answer_json: { selected: optIdx }, is_correct: isCorrect ? 1.0 : 0.0, marks_awarded: isCorrect ? 1 : 0, marks_possible: 1, time_taken_ms: 0 };
        quizAnswers.current[quizIdx] = answerData;
        await logAnswer({ questionIndex: answerData.question_index, answerJson: answerData.answer_json, isCorrect: answerData.is_correct });
    };

    const nextQuiz = async () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx((prev) => prev + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        } else {
            setQuizFinished(true);
            const payload = quizAnswers.current.filter(Boolean);
            await finishSession({ totalQuestions: VOCAB_QUIZ.length, questionsAnswered: payload.length, answersPayload: payload });
        }
    };

    return (
        <div className="rn-page">
            <nav className="rn-nav">
                <button className="rn-nav-back" onClick={() => navigate('/senior/grade/10/triangles')}>
                    ← Back to Dashboard
                </button>
                <div className="rn-nav-links">
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/triangles/introduction')}>📐 Intro</button>
                    <button className="rn-nav-link active" onClick={() => navigate('/senior/grade/10/triangles/terminology')}>📘 Terminology</button>
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/triangles/skills')}>🎯 Skills</button>
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/triangles/connectomics')}>🔗 Connectomics</button>
                </div>
            </nav>

            <div className="rn-lexicon-container">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', fontWeight: 900, color: 'var(--rn-text)', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                        Triangles <span style={{ background: 'linear-gradient(135deg, var(--rn-indigo), var(--rn-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lexicon</span>
                    </h1>
                    <p style={{ fontSize: 18, fontWeight: 500, color: 'var(--rn-muted)', maxWidth: '650px', lineHeight: 1.6 }}>
                        {activeTab === 'quiz' ? 'Test your theorem language and ratio instincts.' : `Explore the chapter through ${activeTab === 'terms' ? 'core terms' : '5 golden rules'} of similarity.`}
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
                    <button className={`rn-nav-link ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Key Terms</button>
                    <button className={`rn-nav-link ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 5 Golden Rules</button>
                    <button className={`rn-nav-link ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Quiz Time</button>
                </div>

                {activeTab !== 'quiz' ? (
                    <div className="rn-lexicon-grid">
                        <aside className="rn-selector-container">
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`rn-term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedIdx(i)}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? '#fff' : `${term.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{term.icon}</div>
                                            <span style={{ fontWeight: 800, fontSize: 16 }}><MathRenderer text={term.name} /></span>
                                        </button>
                                    );
                                })
                            ) : (
                                FIVE_RULES.map((rule, i) => {
                                    const isActive = selectedRuleIdx === i;
                                    return (
                                        <button key={i} className={`rn-term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? '#fff' : `${rule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: isActive ? rule.color : 'inherit' }}>{rule.num}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, fontSize: 15 }}>Rule {rule.num}</span>
                                                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{rule.title}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className="rn-details-window" key={activeTab === 'terms' ? selectedIdx : selectedRuleIdx}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 18, color: 'var(--rn-text)', lineHeight: 1.6, margin: '0 0 24px' }}>
                                        <MathRenderer text={activeTerm.def} />
                                    </p>
                                    <div className="rn-responsive-grid-2" style={{ gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: activeTerm.color, marginBottom: 12, fontWeight: 800 }}>Examples</h4>
                                            <div style={{ background: `${activeTerm.color}05`, padding: 20, borderRadius: 16, border: `1px solid ${activeTerm.color}15` }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeTerm.examples.map((example, j) => (
                                                        <div key={j} style={{ background: '#fff', border: `1px solid ${activeTerm.color}20`, padding: '8px 12px', borderRadius: 8, fontSize: 15 }}>
                                                            <MathRenderer text={example} />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: 14, fontSize: 13, color: 'var(--rn-muted)', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                                    <MathRenderer text={activeTerm.inUse} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: 'var(--rn-indigo)', marginBottom: 12, fontWeight: 800 }}>Quick Memory</h4>
                                            <div style={{ background: 'rgba(79, 70, 229, 0.05)', padding: 20, borderRadius: 16, border: '1px solid rgba(79, 70, 229, 0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 16, color: 'var(--rn-muted)', lineHeight: 1.6 }}>
                                                    <span style={{ fontWeight: 800, color: 'var(--rn-indigo)' }}>Pro-Hint: </span>
                                                    <MathRenderer text={activeTerm.memory} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{activeRule.emoji}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: <MathRenderer text={activeRule.title} /></h2>
                                    </div>
                                    <div style={{ background: `${activeRule.color}08`, padding: '20px 24px', borderRadius: 16, borderLeft: `6px solid ${activeRule.color}`, marginBottom: 24 }}>
                                        <p style={{ fontSize: 19, fontWeight: 700, color: activeRule.color, margin: 0 }}>
                                            <MathRenderer text={activeRule.rule} />
                                        </p>
                                    </div>
                                    <p style={{ fontSize: 18, color: 'var(--rn-text)', lineHeight: 1.6, margin: '0 0 24px' }}>
                                        <MathRenderer text={activeRule.detail} />
                                    </p>
                                    <div className="rn-responsive-grid-2" style={{ gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: activeRule.color, marginBottom: 12, fontWeight: 800 }}>Example Application</h4>
                                            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.05)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeRule.examples.map((example, j) => (
                                                        <div key={j} style={{ background: '#fff', padding: '8px 12px', borderRadius: 8, fontSize: 15, fontWeight: 600, border: '1px solid #e2e8f0' }}>
                                                            <MathRenderer text={example} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: 'var(--rn-teal)', marginBottom: 12, fontWeight: 800 }}>Student Tip</h4>
                                            <div style={{ background: 'rgba(13, 148, 136, 0.05)', padding: 20, borderRadius: 16, border: '1px solid rgba(13, 148, 136, 0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 16, color: 'var(--rn-muted)', lineHeight: 1.6 }}>
                                                    <span style={{ fontWeight: 800, color: 'var(--rn-teal)' }}>Survival Tip: </span>
                                                    <MathRenderer text={activeRule.tip} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    <div className="rn-quiz-window">
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--rn-indigo)', textTransform: 'uppercase', letterSpacing: 2 }}>Question {quizIdx + 1} of {VOCAB_QUIZ.length}</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 800, color: 'var(--rn-text)', margin: '4px 0 0' }}>Quiz Mode</h3>
                                    </div>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: 'var(--rn-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: 'var(--rn-indigo)' }}>
                                        {quizTotalScore}
                                    </div>
                                </div>

                                <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--rn-text)', lineHeight: 1.5, marginBottom: 32 }}>
                                    <MathRenderer text={activeQuiz.question} />
                                </div>

                                <div className="rn-responsive-grid-2" style={{ gap: 16, marginBottom: 32 }}>
                                    {activeQuiz.options.map((option, oi) => {
                                        let statusClass = '';
                                        if (quizAnswered) {
                                            if (oi === activeQuiz.correct) statusClass = 'correct';
                                            else if (oi === quizSelected) statusClass = 'wrong';
                                        }
                                        return (
                                            <button
                                                key={oi}
                                                onClick={() => handleQuizSelect(oi)}
                                                disabled={quizAnswered}
                                                className={`rn-quiz-option ${statusClass}`}
                                                style={quizSelected === oi && !quizAnswered ? { borderColor: 'var(--rn-indigo)', background: 'rgba(79,70,229,0.05)' } : {}}
                                            >
                                                <MathRenderer text={option} />
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizAnswered && (
                                    <div style={{ background: 'rgba(79, 70, 229, 0.05)', padding: 18, borderRadius: 14, border: '1px solid rgba(79, 70, 229, 0.15)', marginBottom: 28 }}>
                                        <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.6 }}>
                                            <strong style={{ color: 'var(--rn-indigo)' }}>Explanation: </strong>
                                            <MathRenderer text={activeQuiz.explanation} />
                                        </p>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={nextQuiz}
                                        disabled={!quizAnswered}
                                        className="rn-btn-filled"
                                        style={{ padding: '14px 44px', fontSize: 16, background: quizAnswered ? 'var(--rn-indigo)' : '#e2e8f0', color: quizAnswered ? '#fff' : '#94a3b8', cursor: quizAnswered ? 'pointer' : 'not-allowed', '--skill-color': 'var(--rn-indigo)' }}
                                    >
                                        {quizIdx + 1 === VOCAB_QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                <div style={{ fontSize: 72, marginBottom: 20 }}>{quizTotalScore >= 4 ? '🏆' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, marginBottom: 12, color: 'var(--rn-text)' }}>Great effort!</h2>
                                <p style={{ color: 'var(--rn-muted)', fontSize: 20, marginBottom: 40 }}>You scored <span style={{ color: 'var(--rn-indigo)', fontWeight: 900 }}>{quizTotalScore} / {VOCAB_QUIZ.length}</span></p>
                                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                                    <button className="rn-btn-outline" onClick={resetQuiz} style={{ padding: '14px 32px' }}>Try Again</button>
                                    <button className="rn-btn-filled" onClick={() => navigate('/senior/grade/10/triangles/skills')} style={{ padding: '14px 32px', '--skill-color': 'var(--rn-indigo)' }}>Practical Skills →</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <button className="rn-btn-filled" onClick={() => navigate('/senior/grade/10/triangles/skills')} style={{ padding: '12px 32px', fontSize: 15, '--skill-color': 'var(--rn-indigo)' }}>
                        I've mastered the language! 🎯
                    </button>
                </div>
            </div>
        </div>
    );
}

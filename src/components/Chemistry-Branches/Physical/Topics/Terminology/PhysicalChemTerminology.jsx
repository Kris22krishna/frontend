import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../chemistry.css';
import MathRenderer from '../../../../MathRenderer';
import { TERMS, KEY_IDENTITIES, VOCAB_QUIZ } from './PhysicalChemTerminologyData';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';

const ACCENT = '#6366f1';

const shuffleArray = arr => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

export default function PhysicalChemTerminology() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedIdxB, setSelectedIdxB] = useState(0);
    const [quizQuestions] = useState(() => shuffleArray([...VOCAB_QUIZ]).slice(0, 5));
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const quizPayload = useRef([]);
    const sessionStarted = useRef(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'quiz' && !sessionStarted.current) {
            startSession({ nodeId: NODE_IDS.chemPhysicalTerminologyQuiz, sessionType: 'practice' });
            sessionStarted.current = true;
            quizPayload.current = [];
        }
    };

    const activeTerm = TERMS[selectedIdx];
    const activeIdentity = KEY_IDENTITIES[selectedIdxB];
    const activeQ = quizQuestions[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0); setQuizSelected(null); setQuizAnswered(false);
        setQuizScore(0); setQuizFinished(false);
        sessionStarted.current = false;
    };

    const handleQuizSelect = async (idx) => {
        if (quizAnswered) return;
        setQuizSelected(idx);
        setQuizAnswered(true);
        const correct = idx === activeQ.correct;
        if (correct) setQuizScore(s => s + 1);
        const data = { question_index: quizIdx + 1, answer_json: { selected: idx, text: activeQ.options[idx] }, is_correct: correct ? 1.0 : 0.0, marks_awarded: correct ? 1 : 0, marks_possible: 1, time_taken_ms: 0 };
        quizPayload.current.push(data);
        await logAnswer({ questionIndex: data.question_index, answerJson: data.answer_json, isCorrect: data.is_correct });
    };

    const nextQuiz = async () => {
        if (quizIdx + 1 < quizQuestions.length) {
            setQuizIdx(i => i + 1); setQuizSelected(null); setQuizAnswered(false);
        } else {
            setQuizFinished(true);
            await finishSession({ totalQuestions: quizQuestions.length, questionsAnswered: quizPayload.current.length, answersPayload: quizPayload.current });
        }
    };

    return (
        <div className="chemPage">
            <nav className="chemNav">
                <button className="chemNavBack" onClick={() => navigate('/chemistry/physical')}>← Back to Dashboard</button>
                <div className="chemNavLinks">
                    <button className="chemNavLink" onClick={() => navigate('/chemistry/physical/introduction')}>🌟 Intro</button>
                    <button className="chemNavLink chemNavLinkActive">📖 Terminology</button>
                    <button className="chemNavLink" onClick={() => navigate('/chemistry/physical/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="chemTermContainer">
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                        Physical <span style={{ color: ACCENT }}>Lexicon</span>
                    </h1>
                    <p style={{ fontSize: 16, color: '#64748b', margin: 0 }}>
                        {activeTab === 'quiz' ? 'Test your vocabulary!' : `Explore ${activeTab === 'terms' ? '10 key terms' : '3 key identities'}.`}
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
                    {[['terms', '📚 Key Terms'], ['identities', '🔑 Key Identities'], ['quiz', '🧪 Quiz Time']].map(([tab, label]) => (
                        <button key={tab} onClick={() => handleTabChange(tab)} style={{
                            padding: '10px 20px', borderRadius: 100, fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
                            background: activeTab === tab ? ACCENT : '#f1f5f9',
                            color: activeTab === tab ? '#fff' : '#475569',
                            border: `2px solid ${activeTab === tab ? ACCENT : 'transparent'}`
                        }}>{label}</button>
                    ))}
                </div>

                {activeTab !== 'quiz' ? (
                    <div className="chemTermLayout">
                        <aside className="chemTermPanel">
                            {(activeTab === 'terms' ? TERMS : KEY_IDENTITIES).map((item, i) => {
                                const isActive = activeTab === 'terms' ? selectedIdx === i : selectedIdxB === i;
                                const color = activeTab === 'terms' ? item.color : ACCENT;
                                return (
                                    <button key={i} onClick={() => activeTab === 'terms' ? setSelectedIdx(i) : setSelectedIdxB(i)} style={{
                                        width: '100%', textAlign: 'left', padding: '14px 16px', borderRadius: 12,
                                        border: 'none', cursor: 'pointer', marginBottom: 6,
                                        background: isActive ? color : '#f8fafc',
                                        color: isActive ? '#fff' : '#475569',
                                        fontWeight: isActive ? 800 : 600, fontSize: 14,
                                        display: 'flex', alignItems: 'center', gap: 10,
                                        transition: 'all 0.2s',
                                    }}>
                                        <span style={{ fontSize: 18 }}>{activeTab === 'terms' ? item.icon : '🔑'}</span>
                                        <span>{item.name}</span>
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="chemDetailsWindow" key={activeTab === 'terms' ? selectedIdx : selectedIdxB}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 17, color: '#0f172a', lineHeight: 1.7, marginBottom: 24 }}><MathRenderer text={activeTerm.def} /></p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: activeTerm.color, marginBottom: 10, fontWeight: 800 }}>Examples</h4>
                                            <div style={{ background: `${activeTerm.color}06`, padding: 16, borderRadius: 14, border: `1px solid ${activeTerm.color}15` }}>
                                                {activeTerm.examples.map((ex, j) => (
                                                    <div key={j} style={{ background: '#fff', border: `1px solid ${activeTerm.color}20`, padding: '8px 12px', borderRadius: 8, fontSize: 14, marginBottom: 8 }}>
                                                        <MathRenderer text={ex} />
                                                    </div>
                                                ))}
                                                <div style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 10, marginTop: 6 }}>
                                                    <MathRenderer text={activeTerm.inUse} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: ACCENT, marginBottom: 10, fontWeight: 800 }}>Memory Aid</h4>
                                            <div style={{ background: `${ACCENT}08`, padding: 16, borderRadius: 14, border: `1px solid ${ACCENT}15` }}>
                                                <p style={{ margin: 0, fontSize: 15, color: '#475569', lineHeight: 1.6 }}>
                                                    <span style={{ fontWeight: 800, color: ACCENT }}>💡 Hint: </span>
                                                    {activeTerm.memory}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${ACCENT}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🔑</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, color: ACCENT, margin: 0 }}>{activeIdentity.name}</h2>
                                    </div>
                                    <div style={{ background: `${ACCENT}08`, padding: '18px 22px', borderRadius: 14, borderLeft: `5px solid ${ACCENT}`, marginBottom: 22 }}>
                                        <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: ACCENT }}><MathRenderer text={activeIdentity.desc} /></p>
                                    </div>
                                    <div className="chemFormulaBox">
                                        <div className="chemFormulaLabel">Formula / Rule</div>
                                        <div className="chemFormulaContent">
                                            <MathRenderer text={`$${activeIdentity.formula}$`} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    <div className="chemQuizPanel">
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <div style={{ fontSize: 13, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Q {quizIdx + 1} / {quizQuestions.length}</div>
                                    <div style={{ background: ACCENT, color: '#fff', padding: '4px 14px', borderRadius: 100, fontSize: 13, fontWeight: 800 }}>Score: {quizScore}</div>
                                </div>
                                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', margin: '0 0 28px', lineHeight: 1.5 }}>
                                    <MathRenderer text={activeQ.question} />
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                                    {activeQ.options.map((opt, i) => {
                                        const isSelected = quizSelected === i;
                                        const isCorrect = i === activeQ.correct;
                                        let bg = '#fff', border = '2px solid #e2e8f0';
                                        if (quizAnswered) {
                                            if (isCorrect) { bg = '#eef2ff'; border = '2px solid #6366f1'; }
                                            else if (isSelected) { bg = '#fef2f2'; border = '2px solid #ef4444'; }
                                        } else if (isSelected) { bg = '#eef2ff'; border = `2px solid ${ACCENT}`; }
                                        return (
                                            <button key={i} disabled={quizAnswered} onClick={() => handleQuizSelect(i)} style={{
                                                padding: '14px 20px', borderRadius: 14, border, background: bg,
                                                fontSize: 15, fontWeight: 600, color: '#0f172a', textAlign: 'left',
                                                cursor: quizAnswered ? 'default' : 'pointer', transition: 'all 0.2s',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                            }}>
                                                <MathRenderer text={opt} />
                                                {quizAnswered && isCorrect && <span style={{ color: '#6366f1' }}>✓</span>}
                                                {quizAnswered && isSelected && !isCorrect && <span style={{ color: '#ef4444' }}>✗</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                                {quizAnswered && (
                                    <>
                                        <div style={{ padding: '16px 20px', background: '#f8fafc', borderRadius: 14, borderLeft: `4px solid ${ACCENT}`, marginBottom: 20, fontSize: 14, color: '#334155', lineHeight: 1.6 }}>
                                            <strong style={{ color: ACCENT }}>Explanation: </strong>
                                            <MathRenderer text={activeQ.explanation} />
                                        </div>
                                        <button onClick={nextQuiz} style={{ width: '100%', padding: 14, borderRadius: 14, border: 'none', background: ACCENT, color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
                                            {quizIdx < quizQuestions.length - 1 ? 'Next Question →' : 'See Results 🏆'}
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ fontSize: 72, marginBottom: 20 }}>{quizScore === quizQuestions.length ? '🥇' : quizScore >= quizQuestions.length / 2 ? '🥈' : '📚'}</div>
                                <h3 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>Quiz Complete!</h3>
                                <p style={{ fontSize: 18, color: '#64748b', margin: '0 0 28px' }}>
                                    You scored <strong style={{ color: ACCENT, fontSize: 22 }}>{quizScore}</strong> out of {quizQuestions.length}
                                </p>
                                <button onClick={resetQuiz} style={{ padding: '12px 32px', borderRadius: 100, border: `2px solid ${ACCENT}`, background: '#fff', color: ACCENT, fontWeight: 800, cursor: 'pointer' }}>↻ Retry Quiz</button>
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginTop: 36, textAlign: 'center' }}>
                    <button onClick={() => navigate('/chemistry/physical/skills')} style={{ padding: '12px 32px', fontSize: 15, background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: 100, fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        Next: Skills <span style={{ color: ACCENT }}>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect, useRef } from 'react';
import { LatexText } from '../../../../../../LatexText';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { LEGraphMini } from '../../components/LEGraphMini';

export default function LEScenarioAssessmentEngine({ scenarios = [], title, color = "#0f4c81", onBack, nodeId }) {
    const TOTAL_QUESTIONS = 20;
    const TIME_LIMIT_SEC = 20 * 60;

    const [questions, setQuestions] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState(Array(TOTAL_QUESTIONS).fill(null));
    const [marked, setMarked] = useState(new Set());
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SEC);
    const [finished, setFinished] = useState(false);

    const { startSession, finishSession } = useSessionLogger();
    const isFinishedRef = useRef(false);

    useEffect(() => {
        if (!scenarios || scenarios.length === 0) return;
        const pool = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) pool.push(scenarios[i % scenarios.length]);
        setQuestions(pool);
    }, [scenarios]);

    useEffect(() => {
        startSession({ nodeId: nodeId || 'le9-skill-assessment', sessionType: 'assessment' });
    }, []); // eslint-disable-line

    useEffect(() => {
        if (!finished || isFinishedRef.current || questions.length === 0) return;
        isFinishedRef.current = true;
        const mappedAnswers = questions.map((q, i) => {
            const ans = answers[i];
            const isCorrect = ans !== null && ans === q.ans;
            return { question_index: i, answer_json: { selected: ans, correct_answer: q.ans }, is_correct: isCorrect, marks_awarded: isCorrect ? 1 : 0, marks_possible: 1, time_taken_ms: 0 };
        });
        finishSession({ answers_payload: mappedAnswers });
    }, [finished, questions]); // eslint-disable-line

    useEffect(() => {
        if (finished || questions.length === 0) return;
        const t = setInterval(() => {
            setTimeLeft(s => { if (s <= 1) { setFinished(true); return 0; } return s - 1; });
        }, 1000);
        return () => clearInterval(t);
    }, [finished, questions]);

    const formatTime = (sec) => { const m = Math.floor(sec / 60); const s = sec % 60; return `${m}:${s < 10 ? '0' : ''}${s}`; };

    const handleAnswerUpdate = (val) => { const newAns = [...answers]; newAns[currentStep] = val; setAnswers(newAns); };

    const toggleMark = () => {
        const newMarked = new Set(marked);
        if (newMarked.has(currentStep)) newMarked.delete(currentStep);
        else newMarked.add(currentStep);
        setMarked(newMarked);
    };

    const submitAssessment = () => {
        if (window.confirm("Are you sure you want to submit your assessment?")) setFinished(true);
    };

    let finalScore = 0;
    let scorePerStep = Array(TOTAL_QUESTIONS).fill(0);
    if (finished && questions.length > 0) {
        questions.forEach((q, i) => {
            const userAns = answers[i];
            if (userAns !== null && userAns === q.ans) { finalScore++; scorePerStep[i] = 1; }
        });
    }

    if (questions.length === 0) return null;

    // ═══ FINISHED SCREEN (REPORT) ════════════════════════════════════════════
    if (finished) {
        const pct = Math.round((finalScore / TOTAL_QUESTIONS) * 100);
        return (
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px 0', fontFamily: 'Outfit, sans-serif' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid #e2e8f0' }}>
                    <div style={{ fontSize: 24 }}>📊</div>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0f172a', margin: 0 }}>Assessment Report</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '20px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Total Score</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: '#059669' }}>{finalScore}<span style={{ fontSize: 20, color: '#94a3b8' }}>/{TOTAL_QUESTIONS}</span></div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '20px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Accuracy</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: pct >= 70 ? '#059669' : pct >= 40 ? '#d97706' : '#ef4444' }}>{pct}%</div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '20px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Time Taken</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: '#0f4c81' }}>⏱️ {formatTime(TIME_LIMIT_SEC - timeLeft)}</div>
                    </div>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Question Breakdown</h3>

                <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    {questions.map((q, i) => {
                        const isCorrect = scorePerStep[i] === 1;
                        const userAns = answers[i];
                        return (
                            <div key={i} style={{ padding: '20px', borderBottom: i < TOTAL_QUESTIONS - 1 ? '1px solid #e2e8f0' : 'none', background: isCorrect ? '#f8fafc' : '#fff' }}>
                                <div style={{ display: 'flex', gap: 16 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: isCorrect ? '#10b981' : userAns === null ? '#f59e0b' : '#ef4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, flexShrink: 0 }}>
                                        {i + 1}
                                    </div>
                                    <div style={{ flex: 1, fontFamily: 'Open Sans, sans-serif' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}><LatexText text={q.q} /></div>
                                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 800, color: isCorrect ? '#059669' : userAns === null ? '#b45309' : '#dc2626', background: isCorrect ? '#ecfdf5' : userAns === null ? '#fffbeb' : '#fef2f2', padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
                                                {isCorrect ? '✅ Correct' : userAns === null ? '⏭️ Skipped' : '❌ Incorrect'}
                                            </div>
                                        </div>
                                        {q.svg && (
                                            <div style={{ marginBottom: 12 }}><LEGraphMini config={q.svg} /></div>
                                        )}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
                                            {q.opts.map((opt, oi) => {
                                                const isActualAns = q.ans === oi;
                                                const isUserAns = userAns === oi;
                                                let border = '#e2e8f0', bg = '#f8fafc';
                                                if (isActualAns) { border = '#10b981'; bg = '#ecfdf5'; }
                                                else if (isUserAns && !isCorrect) { border = '#ef4444'; bg = '#fef2f2'; }
                                                return (
                                                    <div key={oi} style={{ padding: '10px 14px', borderRadius: 8, border: `2px solid ${border}`, background: bg, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: isActualAns ? '#10b981' : (isUserAns && !isCorrect) ? '#ef4444' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff' }}>
                                                            {isActualAns ? '✓' : (isUserAns && !isCorrect) ? '✗' : ''}
                                                        </div>
                                                        <LatexText text={opt} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div style={{ marginTop: 12, fontSize: 13, color: '#64748b', background: '#f1f5f9', padding: '10px 14px', borderRadius: 8 }}>
                                            <LatexText text={`💡 **Explanation:** ${q.expl}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: 32 }}>
                    <button onClick={onBack} style={{ padding: '14px 40px', fontSize: 16, fontFamily: 'Outfit, sans-serif', background: '#e2e8f0', border: 'none', borderRadius: 100, color: '#0f172a', fontWeight: 800, cursor: 'pointer' }}>← Return to Skills</button>
                </div>
            </div>
        );
    }

    // ═══ ACTIVE EXAM VIEW ════════════════════════════════════════════
    const cq = questions[currentStep];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 24, minHeight: isMobile ? 'auto' : 'min(800px, 85vh)', fontFamily: 'Outfit, sans-serif' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Assessment</div>
                        <h3 style={{ fontSize: 20, fontWeight: 900, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ fontSize: 16, color: timeLeft < 120 ? '#ef4444' : '#0f172a', fontWeight: 800, background: timeLeft < 120 ? '#fef2f2' : '#fff', border: `2px solid ${timeLeft < 120 ? '#fecaca' : '#e2e8f0'}`, padding: '8px 16px', borderRadius: 50, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span>⏱️</span> {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '32px', fontFamily: 'Open Sans, sans-serif' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f1f5f9', padding: '6px 14px', borderRadius: 50, fontSize: 13, fontWeight: 800, color: '#475569' }}>
                            <span style={{ color }}>● MCQ</span>
                        </div>
                        <button onClick={toggleMark} style={{ padding: '8px 16px', borderRadius: 50, border: `2px solid ${marked.has(currentStep) ? '#f59e0b' : '#e2e8f0'}`, background: marked.has(currentStep) ? '#fffbeb' : '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', color: marked.has(currentStep) ? '#b45309' : '#64748b', transition: 'all 0.2s', display: 'flex', gap: 6 }}>
                            <span>🔖</span> {marked.has(currentStep) ? 'Marked for Review' : 'Mark for Review'}
                        </button>
                    </div>

                    <div style={{ maxWidth: 700, margin: '0 auto' }}>
                        <div style={{ fontSize: 20, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 32 }}>
                            <LatexText text={cq.q} />
                        </div>

                        {cq.svg && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
                                <LEGraphMini config={cq.svg} />
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {cq.opts.map((opt, oi) => {
                                const isSel = answers[currentStep] === oi;
                                return (
                                    <button key={oi} onClick={() => handleAnswerUpdate(oi)}
                                        style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 16, border: `2.5px solid ${isSel ? color : '#e2e8f0'}`, background: isSel ? `${color}08` : '#fff', cursor: 'pointer', fontSize: 16, color: '#0f172a', textAlign: 'left', transition: 'all 0.2s', fontWeight: isSel ? 700 : 500 }}>
                                        <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${isSel ? color : '#cbd5e1'}`, background: isSel ? color : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {isSel && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                                        </div>
                                        <span><LatexText text={opt} /></span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div style={{ padding: '20px 32px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', background: '#f8fafc' }}>
                    <button onClick={() => setCurrentStep(s => Math.max(0, s - 1))} disabled={currentStep === 0}
                        style={{ padding: '12px 24px', borderRadius: 100, border: '2px solid #cbd5e1', background: '#fff', color: currentStep === 0 ? '#94a3b8' : '#475569', fontSize: 15, fontWeight: 700, cursor: currentStep === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
                        ← Previous
                    </button>
                    {currentStep < TOTAL_QUESTIONS - 1 ? (
                        <button onClick={() => setCurrentStep(s => Math.min(TOTAL_QUESTIONS - 1, s + 1))}
                            style={{ padding: '12px 32px', borderRadius: 100, border: 'none', background: color, color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: `0 4px 12px ${color}40`, transition: 'all 0.2s' }}>
                            Next Question →
                        </button>
                    ) : (
                        <button onClick={submitAssessment}
                            style={{ padding: '12px 32px', borderRadius: 100, border: 'none', background: '#10b981', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.4)', transition: 'all 0.2s' }}>
                            Submit Assessment ✓
                        </button>
                    )}
                </div>
            </div>

            {/* RIGHT SIDEBAR — Question Palette */}
            <div style={{ width: isMobile ? '100%' : 300, background: '#fff', borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: isMobile ? 'row' : 'column', flexShrink: 0, overflow: 'hidden', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                <div style={{ padding: isMobile ? '16px' : '24px 24px 20px', borderBottom: isMobile ? 'none' : '1px solid #e2e8f0', background: '#f8fafc', width: '100%' }}>
                    <h3 style={{ fontSize: isMobile ? 15 : 18, fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>Question Palette</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(10, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 6 : 10 }}>
                        {questions.map((_, i) => {
                            const isCurrent = currentStep === i;
                            const isAns = answers[i] !== null;
                            const isMark = marked.has(i);
                            let bg = '#fff', borderColor = '#e2e8f0', textColor = '#64748b';
                            if (isCurrent) { borderColor = color; textColor = color; }
                            if (isAns) { bg = `${color}15`; borderColor = isCurrent ? color : `${color}40`; textColor = color; }
                            if (isMark) { bg = '#fffbeb'; borderColor = '#f59e0b'; textColor = '#d97706'; }
                            if (isAns && isMark) { bg = '#fffbeb'; borderColor = '#f59e0b'; textColor = '#d97706'; }
                            return (
                                <button key={i} onClick={() => setCurrentStep(i)}
                                    style={{ position: 'relative', height: 44, borderRadius: 10, fontSize: 15, fontWeight: isCurrent ? 900 : 700, background: bg, border: `2px solid ${borderColor}`, color: textColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isCurrent ? `0 0 0 2px ${color}30` : 'none', transition: 'all 0.1s' }}>
                                    {i + 1}
                                    {isMark && <div style={{ position: 'absolute', top: -5, right: -5, background: '#f59e0b', width: 14, height: 14, borderRadius: '50%', border: '2px solid #fff' }} />}
                                    {isAns && !isMark && <div style={{ position: 'absolute', top: -4, right: -4, background: color, width: 12, height: 12, borderRadius: '50%', border: '2px solid #fff' }} />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {!isMobile && <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, fontWeight: 600, color: '#475569' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 4, background: `${color}15`, border: `2px solid ${color}40` }} /> Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 4, background: '#fff', border: '2px solid #e2e8f0' }} /> Not Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 4, background: '#fffbeb', border: '2px solid #f59e0b' }} /> Marked for Review
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 4, background: '#fff', border: `2px solid ${color}` }} /> Current Target
                    </div>
                </div>}

                {!isMobile && <div style={{ padding: '24px', marginTop: 'auto', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
                    <button onClick={submitAssessment}
                        style={{ width: '100%', padding: '14px 0', borderRadius: 12, border: 'none', background: '#10b981', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.3)', transition: 'transform 0.2s' }}>
                        Submit Finish
                    </button>
                </div>}
            </div>
        </div>
    );
}

import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '../../../../MathRenderer';
import { useSessionLogger } from '@/hooks/useSessionLogger';

export default function JuniorEvsAssessmentEngine({ 
    questions, 
    title, 
    onBack, 
    onSecondaryBack, 
    color, 
    prefix = 'evstest',
    nodeId,
    sessionType = 'assessment'
}) {
    const getQuestionType = (question) => {
        if (question?.type === 'text') return 'text';
        if (question?.type === 'msq') return 'msq';
        return 'mcq';
    };

    const normalizeTextAnswer = (value) => String(value ?? '').replace(/\s+/g, ' ').trim().toLowerCase();

    const isAnswerComplete = (question, answer) => {
        const type = getQuestionType(question);
        if (type === 'text') return normalizeTextAnswer(answer).length > 0;
        if (type === 'msq') return Array.isArray(answer) && answer.length > 0;
        return answer !== null && answer !== undefined;
    };

    const isAnswerCorrect = (question, answer) => {
        const type = getQuestionType(question);
        if (type === 'text') return normalizeTextAnswer(answer) === normalizeTextAnswer(question.answer);
        if (type === 'msq') {
            const expected = Array.isArray(question.correct) ? [...question.correct].sort((a, b) => a - b) : [];
            const actual = Array.isArray(answer) ? [...answer].sort((a, b) => a - b) : [];
            return expected.length === actual.length && expected.every((value, index) => value === actual[index]);
        }
        return answer === question.correct;
    };

    const formatAnswer = (value) => String(value ?? '');
    const getCorrectAnswerLabel = (question) => {
        const type = getQuestionType(question);
        if (type === 'text') return question.answer ?? 'No answer provided';
        if (type === 'msq') return Array.isArray(question.correct) ? question.correct.map(i => question.options?.[i]).filter(Boolean).join(', ') : 'No answer';
        return question.options?.[question.correct] ?? 'No answer';
    };
    const getUserAnswerLabel = (question, answer) => {
        if (!isAnswerComplete(question, answer)) return 'Not Answered';
        const type = getQuestionType(question);
        if (type === 'text') return answer;
        if (type === 'msq') return Array.isArray(answer) ? answer.map(i => question.options?.[i]).filter(Boolean).join(', ') : 'Not Answered';
        return question.options?.[answer] ?? 'Not Answered';
    };

    const [questionSet, setQuestionSet] = useState(() => typeof questions === 'function' ? questions() : questions);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(questionSet.length).fill(null));
    const [marked, setMarked] = useState(Array(questionSet.length).fill(false));
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(questionSet.length * 60);

    // v4 Logging
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const answersPayload = useRef([]);
    const isFinishedRef = useRef(false);

    useEffect(() => {
        isFinishedRef.current = finished;
    }, [finished]);

    useEffect(() => {
        const newQs = typeof questions === 'function' ? questions() : questions;
        setQuestionSet(newQs);
        setCurrent(0);
        setAnswers(Array(newQs.length).fill(null));
        setMarked(Array(newQs.length).fill(false));
        setTimeLeft(newQs.length * 60);
        setFinished(false);
        window.scrollTo(0, 0);
    }, [questions]);

    // Start session on mount/questions change
    useEffect(() => {
        if (!nodeId) return;
        
        startSession({ nodeId, sessionType });
        answersPayload.current = [];

        return () => {
            if (!isFinishedRef.current && answersPayload.current.length > 0) {
                abandonSession({ 
                    answersPayload: answersPayload.current, 
                    totalQuestions: questionSet.length 
                });
            }
        };
    }, [nodeId, sessionType]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [current]);

    useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) { handleFinalSubmit(); return; }
        const timer = setInterval(() => setTimeLeft(p => p - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, finished]);

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const q = questionSet[current];

    const toggleMsq = (idx) => {
        const curr = Array.isArray(answers[current]) ? answers[current] : [];
        const next = curr.includes(idx) ? curr.filter(i => i !== idx) : [...curr, idx];
        const newAns = [...answers]; newAns[current] = next; setAnswers(newAns);
    };

    const handleFinalSubmit = async () => {
        setFinished(true);
        if (nodeId) {
            // Aggregate all answers into payload if not already there
            // In assessment, we might only log at the end, or log each next.
            // Let's ensure current payload has everything.
            const fullPayload = answers.map((ans, i) => ({
                question_index: i + 1,
                answer_json: { answer: ans, label: getUserAnswerLabel(questionSet[i], ans) },
                is_correct: isAnswerCorrect(questionSet[i], ans) ? 1.0 : 0.0,
                marks_awarded: isAnswerCorrect(questionSet[i], ans) ? 1 : 0,
                marks_possible: 1,
                time_taken_ms: 0
            })).filter(a => a.answer_json.answer !== null);

            await finishSession({
                totalQuestions: questionSet.length,
                questionsAnswered: fullPayload.length,
                answersPayload: fullPayload
            });
        }
    };

    const handleSubmit = () => {
        if (questionSet.some((q, i) => !isAnswerComplete(q, answers[i]))) {
            if (!window.confirm('You have unanswered questions. Submit anyway?')) return;
        }
        handleFinalSubmit();
    };

    const answeredCount = questionSet.reduce((cnt, q, i) => cnt + (isAnswerComplete(q, answers[i]) ? 1 : 0), 0);

    if (finished) {
        let score = 0;
        answers.forEach((ans, i) => { if (isAnswerCorrect(questionSet[i], ans)) score++; });
        const pct = Math.round((score / questionSet.length) * 100);

        return (
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40, background: '#fff', padding: 40, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: 32, fontWeight: 900, color: '#1e293b', margin: '0 0 16px' }}>Assessment Complete</h2>
                    <div style={{ fontSize: 64, fontWeight: 900, color }}>{score} / {questionSet.length}</div>
                    <div style={{ fontSize: 20, color: '#64748b', fontWeight: 700, marginTop: 8 }}>Score: {pct}%</div>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
                        <button onClick={() => {
                            const newQs = typeof questions === 'function' ? questions() : questions;
                            setQuestionSet(newQs); setCurrent(0); setAnswers(Array(newQs.length).fill(null)); setMarked(Array(newQs.length).fill(false)); setTimeLeft(newQs.length * 60); setFinished(false);
                        }} style={{ padding: '12px 24px', background: color, color: '#fff', border: 'none', borderRadius: 100, fontWeight: 700, cursor: 'pointer' }}>Retake Assessment</button>
                        <button onClick={onBack} style={{ padding: '12px 24px', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', borderRadius: 100, fontWeight: 700, cursor: 'pointer' }}>Return to Skills</button>
                    </div>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: '#1e293b' }}>Summary Report</h3>
                <div style={{ display: 'grid', gap: 16 }}>
                    {questionSet.map((q, i) => {
                        const correct = isAnswerCorrect(q, answers[i]);
                        const cLbl = getCorrectAnswerLabel(q);
                        const uLbl = getUserAnswerLabel(q, answers[i]);
                        return (
                            <div key={i} style={{ padding: 24, borderRadius: 16, background: correct ? '#f0fdf4' : '#fef2f2', border: `2px solid ${correct ? '#bbf7d0' : '#fecaca'}` }}>
                                <div style={{ fontWeight: 800, marginBottom: 12, color: correct ? '#166534' : '#991b1b', fontSize: 16 }}>
                                    Question {i + 1} &mdash; {correct ? '✅ Correct' : '❌ Incorrect'}
                                </div>
                                <div style={{ fontSize: 16, marginBottom: 16, color: '#334155', fontWeight: 600 }}>
                                    <MathRenderer text={q.question} />
                                </div>
                                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                                    <div style={{ flex: 1, minWidth: 200, padding: 16, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: '#10b981', textTransform: 'uppercase', marginBottom: 6 }}>Correct Answer</div>
                                        <MathRenderer text={formatAnswer(cLbl).includes('^') || formatAnswer(cLbl).includes('=') ? `$${formatAnswer(cLbl)}$` : formatAnswer(cLbl)} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 200, padding: 16, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: correct ? '#10b981' : '#ef4444', textTransform: 'uppercase', marginBottom: 6 }}>Your Answer</div>
                                        {uLbl === 'Not Answered' ? 'Not Answered' : <MathRenderer text={formatAnswer(uLbl).includes('^') || formatAnswer(uLbl).includes('=') ? `$${formatAnswer(uLbl)}$` : formatAnswer(uLbl)} />}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    const type = getQuestionType(q);

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100%', padding: '0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: '#1e293b' }}>{title}</h3>
                </div>
                <button onClick={() => window.confirm('Exit? Progress will be lost.') && onBack()} style={{ padding: '8px 16px', borderRadius: 100, background: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', fontWeight: 700, cursor: 'pointer' }}>Exit</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 280px', gap: 24, alignItems: 'start' }}>
                {/* Left: Question Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ background: '#fff', borderRadius: 24, padding: 36, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'inline-flex', padding: '6px 14px', background: `${color}15`, color, borderRadius: 100, fontWeight: 800, fontSize: 14, marginBottom: 20 }}>
                            Question {current + 1} of {questionSet.length}
                        </div>
                        <div style={{ fontSize: 20, color: '#1e293b', fontWeight: 600, lineHeight: 1.6, marginBottom: 32 }}>
                            {q.svg && <div style={{ marginBottom: 20 }} dangerouslySetInnerHTML={{ __html: q.svg }} />}
                            <MathRenderer text={q.question} />
                        </div>

                        {type === 'text' ? (
                            <div>
                                <input type="text" value={answers[current] ?? ''} onChange={e => { const n = [...answers]; n[current] = e.target.value; setAnswers(n); }} placeholder="Type your answer here..." style={{ width: '100%', padding: '16px 20px', borderRadius: 16, border: '2px solid #e2e8f0', fontSize: 16, fontWeight: 600, outline: 'none' }} />
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
                                {(q.options ?? []).map((opt, i) => {
                                    const sel = type === 'msq' ? Array.isArray(answers[current]) && answers[current].includes(i) : answers[current] === i;
                                    return (
                                        <button key={i} onClick={() => type === 'msq' ? toggleMsq(i) : (() => { const n=[...answers]; n[current]=i; setAnswers(n); })()} style={{ padding: '16px 20px', borderRadius: 16, border: `3px solid ${sel ? color : '#e2e8f0'}`, background: sel ? `${color}08` : '#fff', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, transition: 'all 0.15s' }}>
                                            <div style={{ width: 20, height: 20, borderRadius: type==='msq' ? 6 : '50%', border: `2px solid ${sel ? color : '#cbd5e1'}`, background: sel ? color : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {sel && <div style={{ width: 8, height: 8, borderRadius: type==='msq'?2:'50%', background: '#fff' }} />}
                                            </div>
                                            <span style={{ fontSize: 16, fontWeight: sel ? 700 : 500, color: '#1e293b', lineHeight: 1.5 }}><MathRenderer text={opt} /></span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
                        <button onClick={() => setCurrent(c => c - 1)} disabled={current === 0} style={{ padding: '14px 28px', borderRadius: 100, border: '2px solid #e2e8f0', background: '#fff', color: '#475569', fontWeight: 700, cursor: current===0?'default':'pointer', opacity: current===0?0.3:1 }}>← Previous</button>
                        <button onClick={() => { const m = [...marked]; m[current] = !m[current]; setMarked(m); }} style={{ padding: '14px 28px', borderRadius: 100, border: `2px solid ${marked[current] ? '#f59e0b' : '#e2e8f0'}`, background: marked[current] ? '#fef3c7' : '#fff', color: marked[current] ? '#d97706' : '#64748b', fontWeight: 700, cursor: 'pointer' }}>{marked[current] ? '★ Marked' : 'Mark for Review'}</button>
                        {current + 1 === questionSet.length ? (
                            <button onClick={handleSubmit} style={{ padding: '14px 28px', borderRadius: 100, border: 'none', background: '#ef4444', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Submit</button>
                        ) : (
                            <button onClick={() => setCurrent(c => c + 1)} style={{ padding: '14px 28px', borderRadius: 100, border: 'none', background: color, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Next →</button>
                        )}
                    </div>
                </div>

                {/* Right: Palette */}
                <div style={{ background: '#fff', borderRadius: 24, padding: 24, position: 'sticky', top: 96, border: '1px solid #e2e8f0', height: 'fit-content', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <div style={{ background: timeLeft < 60 ? '#fef2f2' : '#f8fafc', padding: 16, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 24, fontWeight: 900, fontFamily: 'monospace', color: timeLeft < 60 ? '#ef4444' : '#1e293b', marginBottom: 24, border: `2px solid ${timeLeft < 60 ? '#fecaca' : '#e2e8f0'}` }}>
                        <span style={{ fontSize: 14, fontWeight: 800 }}>Time</span> {formatTime(timeLeft)}
                    </div>

                    <div style={{ fontSize: 13, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', marginBottom: 16, letterSpacing: 1.2 }}>Question Palette</div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 24 }}>
                        {questionSet.map((_, i) => {
                            const isAns = isAnswerComplete(questionSet[i], answers[i]);
                            const isCur = current === i;
                            const isMark = marked[i];
                            return (
                                <button key={i} onClick={() => setCurrent(i)} style={{ width: 40, height: 40, borderRadius: 10, border: `2px solid ${isCur ? '#0f172a' : isMark ? '#f59e0b' : isAns ? color : '#e2e8f0'}`, background: isAns ? color : '#fff', color: isAns ? '#fff' : isMark ? '#d97706' : '#64748b', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 14, height: 14, borderRadius: 4, background: color }} /> Answered</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 14, height: 14, borderRadius: 4, background: '#fff', border: '2px solid #e2e8f0' }} /> Not Answered</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 14, height: 14, borderRadius: 4, background: '#fff', border: '2px solid #f59e0b' }} /> Marked for Review</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 0', borderTop: '2px solid #f1f5f9' }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: '#334155' }}>Completed</span>
                        <span style={{ fontSize: 16, fontWeight: 900, color }}>{answeredCount}/{questionSet.length}</span>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    div[style*="minmax(0,1fr) 280px"] { grid-template-columns: 1fr !important; }
                    div[style*="top: 96px"] { position: relative !important; top: auto !important; margin-bottom: 24px; order: -1; }
                }
            `}</style>
        </div>
    );
}

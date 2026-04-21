import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '../../../MathRenderer';
import PerimeterDrawInteractive from './Topics/Skills/PerimeterDrawInteractive';
import AreaDrawInteractive from './Topics/Skills/AreaDrawInteractive';
import CompositeDrawInteractive from './Topics/Skills/CompositeDrawInteractive';
import styles from './mensuration6.module.css';
import { useSessionLogger } from '@/hooks/useSessionLogger';

export default function AssessmentEngine({ questions, title, onBack, onSecondaryBack, color, prefix = 'men' , nodeId }) {
    const normalizeTextAnswer = (value) => String(value ?? '').replace(/\s+/g, ' ').trim().toLowerCase();

    const getQuestionType = (question) => {
        if (question?.type === 'text') return 'text';
        if (['perimeter-draw', 'area-draw', 'composite-draw'].includes(question?.type)) return question.type;
        return 'mcq';
    };

    const isAnswerComplete = (question, answer) => {
        const type = getQuestionType(question);
        if (type === 'text') return normalizeTextAnswer(answer).length > 0;
        if (['perimeter-draw', 'area-draw', 'composite-draw'].includes(type)) return answer !== null && answer !== undefined;
        return answer !== null && answer !== undefined;
    };

    const isAnswerCorrect = (question, answer) => {
        const type = getQuestionType(question);
        if (type === 'text') return normalizeTextAnswer(answer) === normalizeTextAnswer(question.answer);
        if (type === 'perimeter-draw' || type === 'area-draw' || type === 'composite-draw') {
            const arrStr = JSON.stringify([...(answer || [])].sort());
            if (type === 'area-draw' && question.targetArea) {
                return (answer || []).length === question.targetArea;
            } else if (question.targetAnswers) {
                return question.targetAnswers.some(tgt => JSON.stringify([...tgt].sort()) === arrStr);
            } else {
                return arrStr === JSON.stringify([...(question.targetAnswer || [])].sort());
            }
        }
        return answer === question.correct || (question.options && question.options[answer] !== undefined && String(question.options[answer]) === String(question.correct));
    };

    const getCorrectAnswerLabel = (question) => {
        const type = getQuestionType(question);
        if (type === 'text') return question.answer ?? 'No answer provided';
        if (['perimeter-draw', 'area-draw', 'composite-draw'].includes(type)) return '[Visual Drawing Activity]';
                if (question.options && question.options[question.correct] !== undefined) {
            return question.options[question.correct];
        }
        if (question.correct !== undefined && question.correct !== null) {
            return String(question.correct);
        }
        return 'No answer provided';
    };

    const getUserAnswerLabel = (question, answer) => {
        if (!isAnswerComplete(question, answer)) return 'Not Answered';
        const type = getQuestionType(question);
        if (type === 'text') return answer;
        if (['perimeter-draw', 'area-draw', 'composite-draw'].includes(type)) return '[Visual Drawing Input]';
        return question.options?.[answer] ?? 'Not Answered';
    };

    const [questionSet, setQuestionSet] = useState(() => typeof questions === 'function' ? questions() : questions);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(questionSet.length).fill(null));
    const [markedForReview, setMarkedForReview] = useState(Array(questionSet.length).fill(false));
    const [finished, setFinished] = useState(false);
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const v4IsFinished = useRef(false);


    useEffect(() => {
        if (!nodeId) return;
        v4IsFinished.current = false;
        startSession({ nodeId, sessionType: 'assessment' });
        return () => { if (!v4IsFinished.current) abandonSession(); };
    }, [nodeId]);    const [paletteOpen, setPaletteOpen] = useState(false);
    const topRef = useRef(null);
    const [questionTimes, setQuestionTimes] = useState(Array(questionSet.length).fill(0));
    const questionStartTime = useRef(Date.now());

    useEffect(() => {
        const newQs = typeof questions === 'function' ? questions() : questions;
        setQuestionSet(newQs);
        setCurrent(0);
        setAnswers(Array(newQs.length).fill(null));
        setMarkedForReview(Array(newQs.length).fill(false));
        setQuestionTimes(Array(newQs.length).fill(0));
        questionStartTime.current = Date.now();
        setTimeLeft(newQs.length * 60);
        setFinished(false);
        setPaletteOpen(false);
    }, [questions]);

    useEffect(() => {
        if (topRef.current) {
            const yOffset = -100;
            const element = topRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        setPaletteOpen(false);
        questionStartTime.current = Date.now();
    }, [current]);

    const [timeLeft, setTimeLeft] = useState(questionSet.length * 60);

    useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) { setFinished(true); return; }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, finished]);

    useEffect(() => {
        if (!finished || !nodeId || v4IsFinished.current) return;
        v4IsFinished.current = true;
        const payload = questionSet.map((question, index) => {
            const userAns = answers[index];
            const correct = isAnswerCorrect ? isAnswerCorrect(question, userAns) : false;
            return {
                question_index: index,
                answer_json: JSON.stringify({ answer: userAns }),
                is_correct: correct,
                marks_awarded: correct ? 1 : 0,
                marks_possible: 1,
                time_taken_ms: 0,
            };
        });
        finishSession({ answers_payload: payload });
    }, [finished]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const q = questionSet[current];

    const handleSelect = (optIdx) => {
        if (finished) return;
        const newAns = [...answers];
        newAns[current] = optIdx;
        setAnswers(newAns);
    };

    const handleTextAnswerChange = (value) => {
        if (finished) return;
        const newAns = [...answers];
        newAns[current] = value;
        setAnswers(newAns);
    };

    const recordCurrentQuestionTime = () => {
        const elapsed = Math.round((Date.now() - questionStartTime.current) / 1000);
        setQuestionTimes(prev => {
            const updated = [...prev];
            updated[current] += elapsed;
            return updated;
        });
        questionStartTime.current = Date.now();
    };

    const handleNext = () => { recordCurrentQuestionTime(); if (current + 1 < questionSet.length) setCurrent((i) => i + 1); };
    const handlePrev = () => { recordCurrentQuestionTime(); if (current > 0) setCurrent((i) => i - 1); };

    const toggleMarkForReview = () => {
        if (finished) return;
        setMarkedForReview(prev => { const n = [...prev]; n[current] = !n[current]; return n; });
    };

    const handleSubmit = () => {
        if (questionSet.some((question, index) => !isAnswerComplete(question, answers[index]))) {
            if (!window.confirm('You have unanswered questions. Are you sure you want to submit?')) return;
        }
        recordCurrentQuestionTime();
        setFinished(true);
        setPaletteOpen(false);
    };

    const answeredCount = questionSet.reduce((count, question, index) => (count + (isAnswerComplete(question, answers[index]) ? 1 : 0)), 0);

    if (finished) {
        let score = 0;
        answers.forEach((ans, index) => {
            if (isAnswerCorrect(questionSet[index], ans)) score++;
        });
        const pct = Math.round((score / questionSet.length) * 100);

        return (
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px', fontFamily: "'Inter', system-ui, sans-serif" }}>
                <div style={{ textAlign: 'center', marginBottom: 40, background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a' }}>Assessment Complete</h2>
                    <div style={{ margin: '20px 0', fontSize: 64, fontWeight: 900, color: color, lineHeight: 1 }}>{score} <span style={{ fontSize: 32, color: '#94a3b8' }}>/ {questionSet.length}</span></div>
                    <div style={{ fontSize: 18, color: '#64748b', fontWeight: 700 }}>Final Score: {pct}%</div>
                    <div style={{ fontSize: 15, color: '#94a3b8', fontWeight: 600, marginTop: 8 }}>Total Time Spent: {formatTime(questionTimes.reduce((a, b) => a + b, 0))}</div>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
                        <button
                            onClick={() => {
                                const newQs = typeof questions === 'function' ? questions() : questions;
                                setQuestionSet(newQs);
                                setCurrent(0);
                                setAnswers(Array(newQs.length).fill(null));
                                setQuestionTimes(Array(newQs.length).fill(0));
                                questionStartTime.current = Date.now();
                                setTimeLeft(newQs.length * 60);
                                setFinished(false);
                                setPaletteOpen(false);
                            }}
                            style={{ padding: '14px 28px', background: color, border: 'none', color: '#fff', borderRadius: 100, fontWeight: 800, cursor: 'pointer', fontSize: 16, boxShadow: `0 8px 24px ${color}40`, transition: 'all 0.2s' }}
                        >
                            Retake Assessment
                        </button>
                        <button onClick={onBack} style={{ padding: '14px 28px', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#0f172a', borderRadius: 100, fontWeight: 800, cursor: 'pointer', fontSize: 16, transition: 'all 0.2s' }}>Return to Skills</button>
                    </div>
                </div>

                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, marginBottom: 24, color: '#0f172a' }}>Detailed Review</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {questionSet.map((question, index) => {
                        const isCorrect = isAnswerCorrect(question, answers[index]);
                        const correctOptText = getCorrectAnswerLabel(question);
                        const userOptText = getUserAnswerLabel(question, answers[index]);
                        const isSkipped = userOptText === 'Not Answered';
                        const statusColor = isSkipped ? '#eab308' : isCorrect ? '#10b981' : '#ef4444';
                        const statusBg = isSkipped ? 'rgba(234,179,8,0.05)' : isCorrect ? 'rgba(16,185,129,0.03)' : 'rgba(239,68,68,0.03)';
                        const statusText = isSkipped ? 'Skipped ⚠️' : isCorrect ? 'Correct ✅' : 'Incorrect ❌';

                        return (
                            <div
                                key={index}
                                style={{
                                    padding: 24,
                                    borderRadius: 16,
                                    border: `2px solid ${statusColor}`,
                                    background: statusBg,
                                }}
                            >
                                <div style={{ fontWeight: 800, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: statusColor }}>
                                    <span style={{ fontSize: 18 }}>Question {index + 1} &mdash; {statusText}</span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#64748b', background: '#fff', border: '1px solid #e2e8f0', padding: '4px 12px', borderRadius: 100 }}>⏱️ {formatTime(questionTimes[index])}</span>
                                </div>
                                <div style={{ fontSize: 17, marginBottom: 20, color: '#0f172a', fontWeight: 600, lineHeight: 1.6 }}>
                                    {question.svg && (
                                        <div style={{ marginBottom: 24, textAlign: 'center', background: '#f8fafc', padding: 20, borderRadius: 16 }} dangerouslySetInnerHTML={{ __html: question.svg }} />
                                    )}
                                    <MathRenderer text={question.question} />
                                </div>
                                {['perimeter-draw', 'area-draw', 'composite-draw'].includes(getQuestionType(question)) ? (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16, marginTop: 16 }}>
                                        <div style={{ background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0', pointerEvents: 'none', overflow: 'hidden' }}>
                                            <strong style={{ color: '#10b981', display: 'block', marginBottom: 16, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' }}>Correct Answer</strong>
                                            <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center', display: 'flex', justifyContent: 'center' }}>
                                                {getQuestionType(question) === 'perimeter-draw' && (
                                                    <PerimeterDrawInteractive question={question} answered={true} userAnswer={question.targetAnswer} onChange={() => {}} color="#10b981" prefix={prefix} />
                                                )}
                                                {getQuestionType(question) === 'area-draw' && (
                                                    <AreaDrawInteractive question={question} answered={true} userAnswer={question.targetAnswer} onChange={() => {}} color="#10b981" prefix={prefix} />
                                                )}
                                                {getQuestionType(question) === 'composite-draw' && (
                                                    <CompositeDrawInteractive question={question} answered={true} userAnswer={question.targetAnswers ? question.targetAnswers[0] : question.targetAnswer} onChange={() => {}} color="#10b981" prefix={prefix} />
                                                )}
                                            </div>
                                        </div>
                                        <div style={{ background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0', pointerEvents: 'none', overflow: 'hidden' }}>
                                            <strong style={{ color: statusColor, display: 'block', marginBottom: 16, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' }}>Your Answer</strong>
                                            {userOptText === 'Not Answered' ? (
                                                <div style={{ color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', marginTop: 20 }}>Not Answered</div>
                                            ) : (
                                                <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center', display: 'flex', justifyContent: 'center' }}>
                                                    {getQuestionType(question) === 'perimeter-draw' && (
                                                        <PerimeterDrawInteractive question={question} answered={true} userAnswer={answers[index]} onChange={() => {}} color={statusColor} prefix={prefix} />
                                                    )}
                                                    {getQuestionType(question) === 'area-draw' && (
                                                        <AreaDrawInteractive question={question} answered={true} userAnswer={answers[index]} onChange={() => {}} color={statusColor} prefix={prefix} />
                                                    )}
                                                    {getQuestionType(question) === 'composite-draw' && (
                                                        <CompositeDrawInteractive question={question} answered={true} userAnswer={answers[index]} onChange={() => {}} color={statusColor} prefix={prefix} />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles['men-summary-split']} style={{ display: 'grid', gap: 16, marginTop: 16 }}>
                                        <div style={{ background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                            <strong style={{ color: '#10b981', display: 'block', marginBottom: 8, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Correct Answer</strong>
                                            <div style={{ color: '#0f172a', fontWeight: 600, fontSize: 15 }}>
                                                <MathRenderer text={String(correctOptText)} />
                                            </div>
                                        </div>
                                        <div style={{ background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                            <strong style={{ color: statusColor, display: 'block', marginBottom: 8, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Your Answer</strong>
                                            <div style={{ color: '#0f172a', fontWeight: 600, fontSize: 15 }}>
                                                {userOptText === 'Not Answered'
                                                    ? <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Not Answered</span>
                                                    : <MathRenderer text={String(userOptText)} />}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    const palette = (
        <div className={`${styles[`${prefix}-assessment-palette`]} ${paletteOpen ? styles['is-open'] || 'is-open' : ''}`} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <div className={styles[`${prefix}-assessment-mobile-head`]}>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.72 }}>Overview</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0f172a' }}>Question Palette</div>
                </div>
                <button type="button" className={styles[`${prefix}-palette-close`]} onClick={() => setPaletteOpen(false)}>
                    Close
                </button>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    padding: '16px',
                    background: timeLeft < 60 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(8, 145, 178, 0.05)',
                    color: timeLeft < 60 ? '#ef4444' : '#0369a1',
                    borderRadius: 16,
                    marginBottom: 20,
                    fontWeight: 900,
                    fontSize: 24,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                    border: timeLeft < 60 ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(8,145,178,0.1)'
                }}
            >
                <span style={{ fontSize: 20 }}>Time Remaining</span> {formatTime(timeLeft)}
            </div>

            <div className={styles[`${prefix}-palette-mobile-stats`]}>
                <div>
                    <span>Answered</span>
                    <strong>{answeredCount}/{questionSet.length}</strong>
                </div>
                <div>
                    <span>Current</span>
                    <strong>Q{current + 1}</strong>
                </div>
            </div>

            <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 16, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 1.2, opacity: 0.8 }}>Questions</div>
            <div
                className={styles[`${prefix}-palette-grid`]}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, minmax(0, 42px))',
                    justifyContent: 'space-between',
                    gap: 8
                }}
            >
                {questionSet.map((_, index) => {
                    const isAns = isAnswerComplete(questionSet[index], answers[index]);
                    const isCurrent = current === index;
                    const isMarked = markedForReview[index];
                    
                    let bg = isAns ? color : '#fff';
                    let txt = isAns ? '#fff' : '#64748b';
                    let border = '1px solid rgba(148, 163, 184, 0.2)';
                    
                    if (isMarked) {
                        border = '2px solid #f59e0b';
                        if (!isAns) { txt = '#f59e0b'; }
                    }
                    if (isCurrent) {
                        border = `2px solid #0f172a`;
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => { recordCurrentQuestionTime(); setCurrent(index); }}
                            style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: 8,
                                fontSize: 13,
                                fontWeight: 700,
                                background: bg,
                                color: txt,
                                border: border,
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.1s'
                            }}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>

            <div style={{ marginTop: 24, fontSize: 12, color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 14, height: 14, background: color, borderRadius: 3 }} /> Answered
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 14, height: 14, background: '#fff', border: '1px solid #cbd5e1', borderRadius: 3 }} /> Not Answered
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 14, height: 14, background: '#fff', border: '2px solid #f59e0b', borderRadius: 3 }} /> Marked for Review
                </div>
            </div>

            <button onClick={handleSubmit} style={{ marginTop: 32, width: '100%', padding: '14px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, cursor: 'pointer', fontSize: 16 }}>
                Submit Assessment
            </button>
        </div>
    );

    return (
        <div className={`${styles[`${prefix}-quiz-active`]} ${styles[`${prefix}-assessment-layout`]}`} style={{ fontFamily: "'Inter', system-ui, sans-serif", maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 24, padding: '0 24px' }}>
            <div style={{ flex: 1, minWidth: 0 }} ref={topRef}>
                <div className={styles[`${prefix}-score-header`]} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Formal Assessment</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, margin: '4px 0 0', color: '#0f172a' }}>{title}</h3>
                    </div>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
                                onBack();
                            }
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#fee2e2',
                            color: '#ef4444',
                            border: '1px solid #fca5a5',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            fontSize: '14px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 4px rgba(239,68,68,0.1)'
                        }}
                    >
                        ✕ Exit
                    </button>
                </div>

                <div style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            background: `${color}15`,
                            padding: '6px 16px',
                            borderRadius: 10,
                            fontSize: 12,
                            fontWeight: 800,
                            color,
                            marginBottom: 20
                        }}
                    >
                        <span>QUESTION</span> {current + 1}
                    </div>

                    <div style={{ fontSize: 20, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 32 }}>
                        {q.svg && (
                            <div style={{ marginBottom: 24, textAlign: 'center', background: '#f8fafc', padding: 20, borderRadius: 16 }} dangerouslySetInnerHTML={{ __html: q.svg }} />
                        )}
                        <MathRenderer text={q.question} />
                    </div>

                    {['perimeter-draw', 'area-draw', 'composite-draw'].includes(getQuestionType(q)) ? (
                        <div style={{ marginBottom: 24 }}>
                            {getQuestionType(q) === 'perimeter-draw' && (
                                <PerimeterDrawInteractive question={q} answered={false} userAnswer={answers[current]} onChange={handleTextAnswerChange} color={color} prefix={prefix} />
                            )}
                            {getQuestionType(q) === 'area-draw' && (
                                <AreaDrawInteractive question={q} answered={false} userAnswer={answers[current]} onChange={handleTextAnswerChange} color={color} prefix={prefix} />
                            )}
                            {getQuestionType(q) === 'composite-draw' && (
                                <CompositeDrawInteractive question={q} answered={false} userAnswer={answers[current]} onChange={handleTextAnswerChange} color={color} prefix={prefix} />
                            )}
                        </div>
                    ) : getQuestionType(q) === 'text' ? (
                        <div style={{ display: 'grid', gap: 12 }}>
                            <label style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: '#64748b' }}>
                                Type your answer
                            </label>
                            <input
                                type="text"
                                value={answers[current] ?? ''}
                                onChange={(e) => handleTextAnswerChange(e.target.value)}
                                placeholder="Enter your answer"
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    borderRadius: 12,
                                    border: `2px solid ${isAnswerComplete(q, answers[current]) ? color : '#e2e8f0'}`,
                                    background: isAnswerComplete(q, answers[current]) ? '#f8fafc' : '#fff',
                                    color: '#0f172a',
                                    fontSize: 16,
                                    fontWeight: 600,
                                    outline: 'none',
                                    transition: 'all 0.2s'
                                }}
                            />
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 12 }}>
                            {(q.options ?? []).map((opt, optIndex) => {
                                const isSelected = answers[current] === optIndex;

                                return (
                                    <button
                                        key={optIndex}
                                        onClick={() => handleSelect(optIndex)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 16,
                                            padding: '16px 20px',
                                            borderRadius: 16,
                                            border: `2px solid ${isSelected ? color : '#e2e8f0'}`,
                                            background: isSelected ? `${color}08` : '#fff',
                                            cursor: 'pointer',
                                            fontSize: 16,
                                            textAlign: 'left',
                                            transition: 'all 0.2s',
                                            fontWeight: isSelected ? 700 : 500,
                                            color: '#0f172a',
                                            width: '100%',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                background: isSelected ? color : '#fff',
                                                border: isSelected ? 'none' : '2px solid #cbd5e1',
                                                flexShrink: 0,
                                            }}
                                        />
                                        <span style={{ display: 'block', minWidth: 0, maxWidth: '100%', lineHeight: 1.5, color: 'inherit' }}>
                                            <MathRenderer text={String(opt)} />
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, gap: 16 }}>
                    <button
                        onClick={handlePrev}
                        disabled={current === 0}
                        style={{ visibility: current === 0 ? 'hidden' : 'visible', padding: '14px 28px', fontSize: 16, borderRadius: 100, flex: 1, maxWidth: 200, background: '#fff', border: '1px solid #cbd5e1', color: '#0f172a', fontWeight: 700, cursor: 'pointer' }}
                    >
                        ← Previous
                    </button>
                    
                    <button
                        onClick={toggleMarkForReview}
                        style={{ 
                            padding: '14px 28px', fontSize: 16, borderRadius: 100, flex: 1, maxWidth: 200, margin: '0 auto',
                            background: '#fff',
                            border: `2px solid ${markedForReview[current] ? '#f59e0b' : '#e2e8f0'}`,
                            color: markedForReview[current] ? '#d97706' : '#64748b',
                            fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
                        }}
                    >
                        {markedForReview[current] ? '★ Marked' : '☆ Mark for Review'}
                    </button>

                    {current + 1 === questionSet.length ? (
                        <button
                            onClick={handleSubmit}
                            style={{ background: '#e11d48', border: 'none', color: '#fff', padding: '14px 28px', fontSize: 16, borderRadius: 100, flex: 1, maxWidth: 200, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(225,29,72,0.3)' }}
                        >
                            Submit 🚀
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            style={{ background: color, border: 'none', color: '#fff', padding: '14px 28px', fontSize: 16, borderRadius: 100, flex: 1, maxWidth: 200, fontWeight: 800, cursor: 'pointer', boxShadow: `0 4px 12px ${color}40` }}
                        >
                            Next →
                        </button>
                    )}
                </div>
            </div>

            {/* Desktop Palette */}
            <div style={{ width: 300, flexShrink: 0 }} className={styles[`${prefix}-desktop-palette`]}>
                <div style={{ position: 'sticky', top: 24 }}>
                    {palette}
                </div>
            </div>

            {/* Mobile triggers */}
            <button type="button" className={styles[`${prefix}-palette-trigger`]} onClick={() => setPaletteOpen(true)}>
                <span>Overview</span>
                <strong>{answeredCount}/{questionSet.length}</strong>
            </button>

            <div className={`${styles[`${prefix}-palette-backdrop`]} ${paletteOpen ? styles['is-open'] || 'is-open' : ''}`} onClick={() => setPaletteOpen(false)} />
        </div>
    );
}

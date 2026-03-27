import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '../../../../MathRenderer';
import { useSessionLogger } from '@/hooks/useSessionLogger';

const normalizeQuestionKey = (question = {}) =>
    String(question.question ?? question.q ?? '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();

const getUniqueQuestions = (questions = []) => {
    const seen = new Set();

    return (questions ?? []).filter((question) => {
        const key = normalizeQuestionKey(question);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

const resolveQuestions = (questions) =>
    getUniqueQuestions(typeof questions === 'function' ? questions() : questions);

export default function WWSAssessmentEngine({ questions, title, onBack, onSecondaryBack, color, nodeId, prefix = 'chemtest' }) {
    // v4 Logging
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const isFinishedRef = useRef(false);
    const sessionStartedRef = useRef(false);

    useEffect(() => {
        if (nodeId && !sessionStartedRef.current) {
            startSession({ nodeId, sessionType: 'assessment' });
            sessionStartedRef.current = true;
        }
    }, [nodeId, startSession]);

    useEffect(() => {
        return () => {
            if (sessionStartedRef.current && !isFinishedRef.current) {
                abandonSession({ totalQuestions: questionSet.length });
            }
        };
    }, [abandonSession, questionSet.length]);

    const getQuestionType = (question) => {
        if (question?.type === 'text') return 'text';
        if (question?.type === 'msq') return 'msq';
        return 'mcq';
    };

    const normalizeTextAnswer = (value) => String(value ?? '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

    const isAnswerComplete = (question, answer) => {
        const type = getQuestionType(question);
        if (type === 'text') return normalizeTextAnswer(answer).length > 0;
        if (type === 'msq') return Array.isArray(answer) && answer.length > 0;
        return answer !== null && answer !== undefined;
    };

    const isAnswerCorrect = (question, answer) => {
        const type = getQuestionType(question);
        if (type === 'text') {
            return normalizeTextAnswer(answer) === normalizeTextAnswer(question.answer);
        }
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
        if (type === 'msq') {
            return Array.isArray(question.correct)
                ? question.correct.map((index) => question.options?.[index]).filter(Boolean).join(', ')
                : 'No answer provided';
        }
        return question.options?.[question.correct] ?? 'No answer provided';
    };

    const getUserAnswerLabel = (question, answer) => {
        const type = getQuestionType(question);
        if (!isAnswerComplete(question, answer)) return 'Not Answered';
        if (type === 'text') return answer;
        if (type === 'msq') {
            return Array.isArray(answer)
                ? answer.map((index) => question.options?.[index]).filter(Boolean).join(', ')
                : 'Not Answered';
        }
        return question.options?.[answer] ?? 'Not Answered';
    };

    const [questionSet, setQuestionSet] = useState(() => resolveQuestions(questions));
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(questionSet.length).fill(null));
    const [markedForReview, setMarkedForReview] = useState(Array(questionSet.length).fill(false));
    const [finished, setFinished] = useState(false);
    const [paletteOpen, setPaletteOpen] = useState(false);
    const topRef = useRef(null);

    useEffect(() => {
        const newQs = resolveQuestions(questions);
        setQuestionSet(newQs);
        setCurrent(0);
        setAnswers(Array(newQs.length).fill(null));
        setMarkedForReview(Array(newQs.length).fill(false));
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
    }, [current]);

    const [timeLeft, setTimeLeft] = useState(questionSet.length * 60);

    useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) {
            setFinished(true);
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, finished]);

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

        logAnswer({
            question_index: current + 1,
            answer_json: { selection: optIdx },
            is_correct: isAnswerCorrect(q, optIdx) ? 1.0 : 0.0,
            marks_awarded: isAnswerCorrect(q, optIdx) ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0
        });
    };

    const handleTextAnswerChange = (value) => {
        if (finished) return;
        const newAns = [...answers];
        newAns[current] = value;
        setAnswers(newAns);

        logAnswer({
            question_index: current + 1,
            answer_json: { text: value },
            is_correct: isAnswerCorrect(q, value) ? 1.0 : 0.0,
            marks_awarded: isAnswerCorrect(q, value) ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0
        });
    };

    const handleMsqToggle = (optIdx) => {
        if (finished) return;
        const currentAnswer = Array.isArray(answers[current]) ? answers[current] : [];
        const nextAnswer = currentAnswer.includes(optIdx)
            ? currentAnswer.filter((idx) => idx !== optIdx)
            : [...currentAnswer, optIdx];
        const newAns = [...answers];
        newAns[current] = nextAnswer;
        setAnswers(newAns);

        logAnswer({
            question_index: current + 1,
            answer_json: { selections: nextAnswer },
            is_correct: isAnswerCorrect(q, nextAnswer) ? 1.0 : 0.0,
            marks_awarded: isAnswerCorrect(q, nextAnswer) ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0
        });
    };

    const handleNext = () => {
        if (current + 1 < questionSet.length) setCurrent((index) => index + 1);
    };

    const handlePrev = () => {
        if (current > 0) setCurrent((index) => index - 1);
    };

    const toggleMarkForReview = () => {
        if (finished) return;
        setMarkedForReview(prev => {
            const newMarks = [...prev];
            newMarks[current] = !newMarks[current];
            return newMarks;
        });
    };

    const handleFinalSubmit = async () => {
        if (questionSet.some((question, index) => !isAnswerComplete(question, answers[index]))) {
            if (!window.confirm('You have unanswered questions. Are you sure you want to submit?')) return;
        }

        let finalScore = 0;
        answers.forEach((ans, index) => {
            if (isAnswerCorrect(questionSet[index], ans)) finalScore++;
        });

        await finishSession({
            totalQuestions: questionSet.length,
            questionsAnswered: answeredCount,
            score: finalScore
        });

        isFinishedRef.current = true;
        setFinished(true);
        setPaletteOpen(false);
    };

    const answeredCount = questionSet.reduce((count, question, index) => (
        count + (isAnswerComplete(question, answers[index]) ? 1 : 0)
    ), 0);

    if (finished) {
        let score = 0;
        answers.forEach((ans, index) => {
            if (isAnswerCorrect(questionSet[index], ans)) score++;
        });
        const pct = Math.round((score / questionSet.length) * 100);

        return (
            <div className={`${prefix}-quiz-finished`} style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: `var(--${prefix}-text, #1e293b)` }}>Assessment Complete</h2>
                    <div style={{ fontSize: 48, fontWeight: 900, color }}>{score} / {questionSet.length}</div>
                    <div style={{ fontSize: 18, color: `var(--${prefix}-muted, #64748b)`, fontWeight: 600 }}>Score: {pct}%</div>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
                        <button
                            className={`${prefix}-btn-primary`}
                            onClick={() => {
                                const newQs = resolveQuestions(questions);
                                setQuestionSet(newQs);
                                setCurrent(0);
                                setAnswers(Array(newQs.length).fill(null));
                                setTimeLeft(newQs.length * 60);
                                setFinished(false);
                                setPaletteOpen(false);
                            }}
                            style={{ padding: '10px 20px', background: color, border: 'none', color: '#fff', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                        >
                            Retake Assessment
                        </button>
                        <button className={`${prefix}-btn-secondary`} onClick={onBack} style={{ padding: '10px 20px' }}>Return to Skills</button>
                        {onSecondaryBack && (
                            <button className={`${prefix}-btn-secondary`} onClick={onSecondaryBack} style={{ padding: '10px 20px', background: '#f8fafc' }}>Back to Chapter</button>
                        )}
                    </div>
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: `var(--${prefix}-text, #1e293b)` }}>Summary Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questionSet.map((question, index) => {
                        const isCorrect = isAnswerCorrect(question, answers[index]);
                        const correctOptText = getCorrectAnswerLabel(question);
                        const userOptText = getUserAnswerLabel(question, answers[index]);

                        return (
                            <div
                                key={index}
                                style={{
                                    padding: 20,
                                    borderRadius: 12,
                                    border: `2px solid ${isCorrect ? `var(--${prefix}-teal, #0d9488)` : `var(--${prefix}-red, #ef4444)`}`,
                                    background: isCorrect ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)'
                                }}
                            >
                                <div style={{ fontWeight: 800, marginBottom: 8, color: isCorrect ? `var(--${prefix}-teal, #0d9488)` : `var(--${prefix}-red, #ef4444)` }}>
                                    Question {index + 1} - {isCorrect ? 'Correct' : 'Incorrect'}
                                </div>
                                <div className={`${prefix}-quiz-question-text`} style={{ fontSize: 16, marginBottom: 16, color: `var(--${prefix}-text, #1e293b)`, fontWeight: 600 }}>
                                    <MathRenderer text={question.question} />
                                </div>
                                <div className={`${prefix}-summary-split`}>
                                    <div className={`${prefix}-summary-item`}>
                                        <strong style={{ color: `var(--${prefix}-teal, #0d9488)` }}>Correct Answer:</strong>
                                        <div style={{ marginTop: 6 }}>
                                            <MathRenderer text={formatAnswer(correctOptText).includes('$') || formatAnswer(correctOptText).includes('^') ? (formatAnswer(correctOptText).includes('$') ? formatAnswer(correctOptText) : `$${correctOptText}$`) : formatAnswer(correctOptText)} />
                                        </div>
                                    </div>
                                    <div className={`${prefix}-summary-item user-ans`}>
                                        <strong style={{ color: isCorrect ? `var(--${prefix}-teal, #0d9488)` : `var(--${prefix}-red, #ef4444)` }}>Your Answer:</strong>
                                        <div style={{ marginTop: 6 }}>
                                            {userOptText === 'Not Answered'
                                                ? 'Not Answered'
                                                : <MathRenderer text={formatAnswer(userOptText).includes('$') || formatAnswer(userOptText).includes('^') ? (formatAnswer(userOptText).includes('$') ? formatAnswer(userOptText) : `$${userOptText}$`) : formatAnswer(userOptText)} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    const palette = (
        <div className={`${prefix}-assessment-palette ${paletteOpen ? 'is-open' : ''}`}>
            <div className={`${prefix}-assessment-mobile-head`}>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.72 }}>Quick Nav</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: `var(--${prefix}-text, #1e293b)` }}>Question Palette</div>
                </div>
                <button type="button" className={`${prefix}-palette-close`} onClick={() => setPaletteOpen(false)}>
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
                    color: timeLeft < 60 ? `var(--${prefix}-red, #ef4444)` : 'var(--ft-ocean, #0369a1)',
                    borderRadius: 16,
                    marginBottom: 20,
                    fontWeight: 900,
                    fontSize: 24,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                    border: timeLeft < 60 ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(8,145,178,0.1)'
                }}
            >
                <span style={{ fontSize: 28 }}>Time</span> {formatTime(timeLeft)}
            </div>

            <div className={`${prefix}-palette-mobile-stats`}>
                <div>
                    <span>Answered</span>
                    <strong>{answeredCount}/{questionSet.length}</strong>
                </div>
                <div>
                    <span>Current</span>
                    <strong>Q{current + 1}</strong>
                </div>
            </div>

            <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 16, color: `var(--${prefix}-text, #1e293b)`, textTransform: 'uppercase', letterSpacing: 1.2, opacity: 0.8 }}>Question Palette</div>
            <div
                className={`${prefix}-palette-grid`}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, minmax(0, 42px))',
                    justifyContent: 'space-between',
                    gap: 8
                }}
            >
                {questionSet.map((_, index) => {
                    const isAnswered = isAnswerComplete(questionSet[index], answers[index]);
                    const isCurrent = current === index;
                    const isMarked = markedForReview[index];
                    
                    let bg = isAnswered ? color : '#fff';
                    let txt = isAnswered ? '#fff' : `var(--${prefix}-muted, #64748b)`;
                    let border = '1px solid rgba(148, 163, 184, 0.2)';
                    
                    if (isMarked) {
                        border = '2px solid #f59e0b';
                        if (!isAnswered) {
                            txt = '#f59e0b';
                        }
                    }
                    if (isCurrent) {
                        border = `2px solid var(--${prefix}-text, #0f172a)`;
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`${prefix}-palette-cell`}
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
                                justifyContent: 'center'
                            }}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>

            <div style={{ marginTop: 20, fontSize: 12, color: `var(--${prefix}-muted, #64748b)` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 14, height: 14, background: color, borderRadius: 3 }} /> Answered
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 14, height: 14, background: '#fff', border: '1px solid #cbd5e1', borderRadius: 3 }} /> Not Answered
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 14, height: 14, background: '#fff', border: '2px solid #f59e0b', borderRadius: 3 }} /> Marked for Review
                </div>
            </div>

            <button onClick={handleFinalSubmit} style={{ marginTop: 24, width: '100%', padding: '12px', background: `var(--${prefix}-red, #ef4444)`, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
                Submit Assessment
            </button>
        </div>
    );

    return (
        <div className={`${prefix}-quiz-active ${prefix}-assessment-layout`}>
            <div style={{ flex: 1 }} ref={topRef}>
                <div className={`${prefix}-score-header`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, margin: 0, color: `var(--${prefix}-text, #1e293b)` }}>{title}</h3>
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
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 4px rgba(239,68,68,0.1)'
                        }}
                    >
                        Exit
                    </button>
                </div>

                <div className={`${prefix}-quiz-card`}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            background: `${color}15`,
                            padding: '4px 12px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 800,
                            color,
                            marginBottom: 16
                        }}
                    >
                        <span>Question</span> {current + 1}
                    </div>

                    <div className={`${prefix}-quiz-question-text`} style={{ fontSize: 18, fontWeight: 600, color: `var(--${prefix}-text, #1e293b)`, lineHeight: 1.6, marginBottom: 24 }}>
                        {q.svg && (
                            <div style={{ marginBottom: 16, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: q.svg }} />
                        )}
                        <MathRenderer text={q.question} />
                    </div>

                    {getQuestionType(q) === 'text' ? (
                        <div style={{ display: 'grid', gap: 12 }}>
                            <label style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: `var(--${prefix}-muted, #64748b)` }}>
                                Type your answer
                            </label>
                            <input
                                type="text"
                                value={answers[current] ?? ''}
                                onChange={(e) => handleTextAnswerChange(e.target.value)}
                                placeholder="Enter your answer"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: 12,
                                    border: `2px solid ${isAnswerComplete(q, answers[current]) ? color : 'rgba(0,0,0,0.08)'}`,
                                    background: '#fff',
                                    color: `var(--${prefix}-text, #1e293b)`,
                                    fontSize: 15,
                                    fontWeight: 600,
                                    outline: 'none'
                                }}
                            />
                        </div>
                    ) : (
                        <div className={`${prefix}-quiz-options`}>
                            {(q.options ?? []).map((opt, optIndex) => {
                                const isSelected = getQuestionType(q) === 'msq'
                                    ? Array.isArray(answers[current]) && answers[current].includes(optIndex)
                                    : answers[current] === optIndex;

                                return (
                                    <button
                                        key={optIndex}
                                        onClick={() => getQuestionType(q) === 'msq' ? handleMsqToggle(optIndex) : handleSelect(optIndex)}
                                        className={`${prefix}-quiz-option`}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 12,
                                            padding: '14px 16px',
                                            borderRadius: 16,
                                            border: `2.5px solid ${isSelected ? color : 'rgba(0,0,0,0.04)'}`,
                                            background: isSelected ? `${color}05` : '#fff',
                                            cursor: 'pointer',
                                            fontSize: 14,
                                            textAlign: 'left',
                                            transition: 'all 0.2s',
                                            fontWeight: isSelected ? 700 : 500,
                                            color: `var(--${prefix}-text, #1e293b)`,
                                            width: '100%',
                                            minHeight: 78,
                                            lineHeight: 1.55
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                background: isSelected ? color : '#f1f5f9',
                                                flexShrink: 0,
                                                marginTop: 6
                                            }}
                                        />
                                        <span style={{ display: 'block', minWidth: 0, maxWidth: '100%', lineHeight: 1.55, color: 'inherit' }}>
                                            <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
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
                        className={`${prefix}-btn-secondary`}
                        style={{ visibility: current === 0 ? 'hidden' : 'visible', padding: '12px 28px', fontSize: 15, borderRadius: 100, flex: 1, maxWidth: 200, background: '#fff', border: '1px solid #e2e8f0', color: `var(--${prefix}-text)`, fontWeight: 600 }}
                    >
                        ← Previous
                    </button>
                    
                    <button
                        onClick={toggleMarkForReview}
                        className={`${prefix}-btn-secondary`}
                        style={{ 
                            padding: '12px 28px', fontSize: 15, borderRadius: 100, flex: 1, maxWidth: 200, margin: '0 auto',
                            background: '#fff',
                            border: `1px solid ${markedForReview[current] ? '#f59e0b' : '#e2e8f0'}`,
                            color: markedForReview[current] ? '#d97706' : `var(--${prefix}-text)`,
                            fontWeight: 600
                        }}
                    >
                        {markedForReview[current] ? 'Marked for Review' : 'Mark for Review'}
                    </button>
                    {current + 1 === questionSet.length ? (
                        <button
                            onClick={handleFinalSubmit}
                            className={`${prefix}-btn-primary`}
                            style={{ background: `var(--${prefix}-blue, #2563eb)`, border: 'none', color: '#fff', padding: '12px 28px', fontSize: 15, borderRadius: 100, flex: 1, maxWidth: 200, fontWeight: 600 }}
                        >
                            Submit Assessment
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className={`${prefix}-btn-primary`}
                            style={{ background: `var(--${prefix}-blue, #2563eb)`, border: 'none', color: '#fff', padding: '12px 28px', fontSize: 15, borderRadius: 100, flex: 1, maxWidth: 200, fontWeight: 600 }}
                        >
                            Next →
                        </button>
                    )}
                </div>
            </div>

            <button type="button" className={`${prefix}-palette-trigger`} onClick={() => setPaletteOpen(true)}>
                <span>Palette</span>
                <strong>{answeredCount}/{questionSet.length}</strong>
            </button>

            <div className={`${prefix}-palette-backdrop ${paletteOpen ? 'is-open' : ''}`} onClick={() => setPaletteOpen(false)} />
            {palette}
        </div>
    );
}
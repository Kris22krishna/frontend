import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../algebra.css';
import MathRenderer from '../../../../MathRenderer';

// ─── Shared Quiz Engine ────────────────────────────────────────────────────
function QuizEngine({ questions, title, onBack, color }) {
    const [questionSet, setQuestionSet] = useState(() => typeof questions === 'function' ? questions() : questions);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    React.useEffect(() => {
        setQuestionSet(typeof questions === 'function' ? questions() : questions);
        setCurrent(0);
        setSelected(null);
        setAnswered(false);
        setScore(0);
        setFinished(false);
    }, [questions]);

    // Timer state for Practice: Starts at 0, counts up
    const [timeTaken, setTimeTaken] = useState(0);

    React.useEffect(() => {
        if (finished) return;
        const timer = setInterval(() => {
            setTimeTaken(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [finished]);

    // Format time (MM:SS)
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const q = questionSet[current];
    const progress = ((current + (finished ? 1 : 0)) / questionSet.length) * 100;

    const handleSelect = (optIdx) => {
        if (answered) return;
        setSelected(optIdx);
        setAnswered(true);
        if (optIdx === q.correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= questionSet.length) {
            setFinished(true);
        } else {
            setCurrent(c => c + 1);
            setSelected(null);
            setAnswered(false);
        }
    };

    if (finished) {
        const pct = Math.round((score / questionSet.length) * 100);
        let msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        let msgSub = pct >= 90 ? 'You have excellent control over this topic!' : 'Review the concepts and try again for 100%.';

        return (
            <div className="alg-quiz-finished" style={{ textAlign: 'center', padding: '40px 0' }}>
                <div className="alg-quiz-score-circle" style={{
                    width: 140, height: 140, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    border: '8px solid #fff'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: 'var(--alg-text)', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: 'var(--alg-muted)', fontWeight: 700 }}>out of {questionSet.length}</div>
                    </div>
                </div>

                <div style={{
                    display: 'inline-block', padding: '6px 16px', background: `${color}15`,
                    color: color, borderRadius: 50, fontSize: 14, fontWeight: 800, marginBottom: 16
                }}>
                    ⏱️ Time Taken: {formatTime(timeTaken)}
                </div>

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: 'var(--alg-text)', margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: 'var(--alg-muted)', fontSize: 15, margin: '0 0 32px' }}>{msgSub}</p>
                <div className="alg-quiz-finished-actions" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button
                        className="alg-btn-primary"
                        onClick={() => {
                            if (typeof questions === 'function') { setQuestionSet(questions()); }
                            setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setTimeTaken(0); setFinished(false);
                        }}
                        style={{ padding: '12px 24px', background: color }}
                    >
                        Try Again
                    </button>
                    <button
                        className="alg-btn-secondary"
                        onClick={onBack}
                        style={{ padding: '12px 24px' }}
                    >
                        Return to Skills
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="alg-quiz-active alg-quiz-container">
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
                <div className="alg-score-header">
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Skill Verification</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--alg-text)', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 13, color: color, fontWeight: 800, marginBottom: 4, background: `${color}15`, padding: '4px 10px', borderRadius: 8, display: 'inline-block' }}>
                            ⏱️ {formatTime(timeTaken)}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--alg-muted)', fontWeight: 700 }}>
                            Question <span style={{ color: color }}>{current + 1}</span> / {questionSet.length}
                        </div>
                    </div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            {/* Question Card */}
            <div className="alg-quiz-card">
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: `${color}15`, padding: '4px 12px', borderRadius: 8,
                    fontSize: 12, fontWeight: 800, color: color, marginBottom: 16
                }}>
                    <span>QUESTION</span> {current + 1}
                </div>
                <div className="alg-quiz-question-text" style={{ fontSize: 18, fontWeight: 600, color: 'var(--alg-text)', lineHeight: 1.6, marginBottom: 24 }}>
                    <MathRenderer text={q.question} />
                </div>
                {/* {q.math && (
                    <div style={{
                        background: '#f8fafc', border: `1px solid ${color}20`,
                        borderRadius: 12, padding: '16px', marginBottom: 24,
                        fontSize: 24, color: color, textAlign: 'center', fontWeight: 700
                    }}>
                        <MathRenderer text={q.math.includes('$') ? q.math : `$$${q.math}$$`} />
                    </div>
                )} */}

                {/* Options */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                    {q.options.map((opt, oi) => {
                        let borderColor = 'rgba(0,0,0,0.04)';
                        let bgColor = '#fff';
                        let textColor = 'var(--alg-text)';
                        let dotColor = '#f1f5f9';

                        if (answered) {
                            if (oi === q.correct) {
                                borderColor = 'var(--alg-teal)';
                                bgColor = 'rgba(16,185,129,0.05)';
                                textColor = 'var(--alg-teal)';
                                dotColor = 'var(--alg-teal)';
                            }
                            else if (oi === selected) {
                                borderColor = 'var(--alg-red)';
                                bgColor = 'rgba(239,68,68,0.05)';
                                textColor = 'var(--alg-red)';
                                dotColor = 'var(--alg-red)';
                            }
                        } else if (selected === oi) {
                            borderColor = color;
                            bgColor = `${color}05`;
                            dotColor = color;
                        }

                        return (
                            <button
                                key={oi}
                                onClick={() => handleSelect(oi)}
                                disabled={answered}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '14px 16px', borderRadius: 12,
                                    border: `2.5px solid ${borderColor}`,
                                    background: bgColor, cursor: answered ? 'default' : 'pointer',
                                    fontSize: 15, color: textColor, textAlign: 'left',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    fontWeight: selected === oi ? 700 : 500,
                                    boxShadow: selected === oi && !answered ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                                }}
                            >
                                <div style={{
                                    width: 10, height: 10, borderRadius: '50%', background: dotColor, flexShrink: 0,
                                    transition: 'all 0.2s'
                                }} />
                                <span style={{ fontSize: '1.1rem' }}>
                                    <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {answered && (
                    <div style={{
                        marginTop: 24, padding: '16px 20px', borderRadius: 12,
                        background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)',
                        color: 'var(--alg-muted)', fontSize: 13.5, lineHeight: 1.6
                    }}>
                        <strong style={{ color: 'var(--alg-blue)' }}>💡 Explanation: </strong>
                        <MathRenderer text={q.explanation} />
                    </div>
                )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleNext}
                    disabled={!answered}
                    className="alg-btn-primary"
                    style={{
                        padding: '12px 40px',
                        background: answered ? color : '#f1f5f9',
                        color: answered ? '#fff' : '#94a3b8',
                        cursor: answered ? 'pointer' : 'not-allowed',
                        border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800,
                        boxShadow: answered ? `0 8px 20px ${color}30` : 'none'
                    }}
                >
                    {current + 1 >= questionSet.length ? 'See Final Score' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}

// ─── Shared Assessment Engine ───────────────────────────────────────────────
function AssessmentEngine({ questions, title, onBack, color }) {
    const [questionSet, setQuestionSet] = useState(() => typeof questions === 'function' ? questions() : questions);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(questionSet.length).fill(null));
    const [finished, setFinished] = useState(false);
    const topRef = React.useRef(null);

    React.useEffect(() => {
        const newQs = typeof questions === 'function' ? questions() : questions;
        setQuestionSet(newQs);
        setCurrent(0);
        setAnswers(Array(newQs.length).fill(null));
        setFinished(false);
    }, [questions]);

    // Scroll to top when question changes (for mobile palette)
    React.useEffect(() => {
        if (topRef.current) {
            const yOffset = -100; // Account for sticky nav
            const element = topRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, [current]);

    // Timer state: 1 minute per question
    const [timeLeft, setTimeLeft] = useState(questionSet.length * 60);

    React.useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) {
            setFinished(true); // Auto-submit when time is up
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, finished]);

    // Format time (MM:SS)
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const q = questions[current];

    const handleSelect = (optIdx) => {
        if (finished) return;
        const newAns = [...answers];
        newAns[current] = optIdx;
        setAnswers(newAns);
    };

    const handleNext = () => {
        if (current + 1 < questionSet.length) setCurrent(c => c + 1);
    };

    const handlePrev = () => {
        if (current > 0) setCurrent(c => c - 1);
    };

    const handleSubmit = () => {
        if (answers.includes(null)) {
            if (!window.confirm("You have unanswered questions. Are you sure you want to submit?")) return;
        }
        setFinished(true);
    };

    if (finished) {
        let score = 0;
        answers.forEach((ans, i) => {
            if (ans === questionSet[i].correct) score++;
        });
        const pct = Math.round((score / questionSet.length) * 100);

        return (
            <div className="alg-quiz-finished" style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: 'var(--alg-text)' }}>Assessment Complete</h2>
                    <div style={{ fontSize: 48, fontWeight: 900, color }}>{score} / {questionSet.length}</div>
                    <div style={{ fontSize: 18, color: 'var(--alg-muted)', fontWeight: 600 }}>Score: {pct}%</div>
                    <button className="alg-btn-secondary" onClick={onBack} style={{ marginTop: 20, padding: '10px 20px' }}>Return to Skills</button>
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: 'var(--alg-text)' }}>Summary Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questionSet.map((question, i) => {
                        const isCorrect = answers[i] === question.correct;
                        const correctOptText = question.options[question.correct];
                        const userOptText = answers[i] !== null ? question.options[answers[i]] : 'Not Answered';

                        return (
                            <div key={i} style={{
                                padding: 20, borderRadius: 12,
                                border: `2px solid ${isCorrect ? 'var(--alg-teal)' : 'var(--alg-red)'}`,
                                background: isCorrect ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)'
                            }}>
                                <div style={{ fontWeight: 800, marginBottom: 8, color: isCorrect ? 'var(--alg-teal)' : 'var(--alg-red)' }}>Question {i + 1} - {isCorrect ? 'Correct' : 'Incorrect'}</div>
                                <div className="alg-quiz-question-text" style={{ fontSize: 16, marginBottom: 16, color: 'var(--alg-text)', fontWeight: 600 }}>
                                    <MathRenderer text={question.question} />
                                </div>
                                <div className="alg-summary-split">
                                    <div className="alg-summary-item">
                                        <strong style={{ color: 'var(--alg-teal)' }}>Correct Answer:</strong>
                                        <div style={{ marginTop: 6 }}><MathRenderer text={correctOptText.includes('$') || correctOptText.includes('^') ? (correctOptText.includes('$') ? correctOptText : `$${correctOptText}$`) : correctOptText} /></div>
                                    </div>
                                    <div className="alg-summary-item user-ans">
                                        <strong style={{ color: isCorrect ? 'var(--alg-teal)' : 'var(--alg-red)' }}>Your Answer:</strong>
                                        <div style={{ marginTop: 6 }}>{answers[i] === null ? 'Not Answered' : <MathRenderer text={userOptText.includes('$') || userOptText.includes('^') ? (userOptText.includes('$') ? userOptText : `$${userOptText}$`) : userOptText} />}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="alg-quiz-active alg-assessment-layout">
            {/* Left Main Question Area */}
            <div style={{ flex: 1 }} ref={topRef}>
                <div className="alg-score-header">
                    <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, margin: 0, color: 'var(--alg-text)' }}>{title}</h3>
                </div>

                <div className="alg-quiz-card" style={{
                    background: '#fff', borderRadius: 20, padding: '32px 36px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: `${color}15`, padding: '4px 12px', borderRadius: 8,
                        fontSize: 12, fontWeight: 800, color, marginBottom: 16
                    }}>
                        <span>QUESTION</span> {current + 1}
                    </div>
                    <div className="alg-quiz-question-text" style={{ fontSize: 18, fontWeight: 600, color: 'var(--alg-text)', lineHeight: 1.6, marginBottom: 24 }}>
                        <MathRenderer text={q.question} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                        {q.options.map((opt, oi) => {
                            const isSelected = answers[current] === oi;
                            return (
                                <button
                                    key={oi}
                                    onClick={() => handleSelect(oi)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        padding: '14px 16px', borderRadius: 12,
                                        border: `2.5px solid ${isSelected ? color : 'rgba(0,0,0,0.04)'}`,
                                        background: isSelected ? `${color}05` : '#fff',
                                        cursor: 'pointer', fontSize: 15, textAlign: 'left',
                                        transition: 'all 0.2s', fontWeight: isSelected ? 700 : 500, color: 'var(--alg-text)'
                                    }}
                                >
                                    <div style={{
                                        width: 10, height: 10, borderRadius: '50%',
                                        background: isSelected ? color : '#f1f5f9', flexShrink: 0
                                    }} />
                                    <span>
                                        <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <button onClick={handlePrev} disabled={current === 0} className="alg-btn-secondary" style={{ visibility: current === 0 ? 'hidden' : 'visible' }}>← Previous</button>
                    {current + 1 === questionSet.length ? (
                        <button onClick={handleSubmit} className="alg-btn-primary" style={{ background: 'var(--alg-red)', border: 'none', color: '#fff' }}>Submit Assessment</button>
                    ) : (
                        <button onClick={handleNext} className="alg-btn-primary" style={{ background: color, border: 'none', color: '#fff' }}>Next →</button>
                    )}
                </div>
            </div>

            {/* Right Question Palette */}
            <div className="alg-assessment-palette">
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '12px', background: timeLeft < 60 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(8, 145, 178, 0.05)',
                    color: timeLeft < 60 ? 'var(--alg-red)' : 'var(--alg-text)',
                    borderRadius: 12, marginBottom: 24, fontWeight: 800, fontSize: 20
                }}>
                    ⏱️ {formatTime(timeLeft)}
                </div>

                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, color: 'var(--alg-text)' }}>Question Palette</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                    {questionSet.map((_, i) => {
                        const isAnswered = answers[i] !== null;
                        const isCurrent = current === i;
                        return (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                style={{
                                    aspectRatio: '1/1', borderRadius: 8, fontSize: 14, fontWeight: 700,
                                    background: isAnswered ? color : '#f1f5f9',
                                    color: isAnswered ? '#fff' : 'var(--alg-muted)',
                                    border: isCurrent ? `3px solid var(--alg-text)` : 'none',
                                    cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                {i + 1}
                            </button>
                        );
                    })}
                </div>
                <div style={{ marginTop: 20, fontSize: 12, color: 'var(--alg-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><div style={{ width: 12, height: 12, background: color, borderRadius: 3 }} /> Answered</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><div style={{ width: 12, height: 12, background: '#f1f5f9', borderRadius: 3 }} /> Not Answered</div>
                </div>
                <button onClick={handleSubmit} style={{ marginTop: 24, width: '100%', padding: '12px', background: 'var(--alg-red)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Submit Assessment</button>
            </div>
        </div>
    );
}

// ─── QUESTIONS & DATA ──────────────────────────────────────────────────────
const generateExponentQuestions = () => {
    const questions = [];
    const getNum = () => Math.floor(Math.random() * 9) + 2; // 2 to 10
    const getLetter = () => String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z
    const getLetter2 = (exclude) => {
        let l = getLetter();
        while (l === exclude) l = getLetter();
        return l;
    };

    // 1. Product Law
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        let a = getNum(), b = getNum();
        questions.push({
            question: `Simplify: $${base}^{${a}} \\cdot ${base}^{${b}}$`,
            math: `${base}^{${a}} \\cdot ${base}^{${b}} = ?`,
            options: [`$${base}^{${a + b}}$`, `$${base}^{${a * b}}$`, `$${base}^{${Math.abs(a - b)}}$`, `$${base}$`],
            correct: 0,
            explanation: `When multiplying terms with the same base, ADD the exponents: $${a} + ${b} = ${a + b}$, so the result is $${base}^{${a + b}}$.`
        });
    }

    // 2. Quotient Law
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        let a = getNum() + 5, b = getNum(); // Ensure a > b usually
        questions.push({
            question: `Simplify: $\\frac{${base}^{${a}}}{${base}^{${b}}}$`,
            math: `\\frac{${base}^{${a}}}{${base}^{${b}}} = ?`,
            options: [`$${base}^{${a - b}}$`, `$${base}^{${a + b}}$`, `$${base}^{${a * b}}$`, `$${base}^{${b - a}}$`],
            correct: 0,
            explanation: `When dividing terms with the same base, SUBTRACT the bottom exponent from the top: $${a} - ${b} = ${a - b}$, so the result is $${base}^{${a - b}}$.`
        });
    }

    // 3. Power Law
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        let a = getNum(), b = getNum();
        questions.push({
            question: `Simplify: $(${base}^{${a}})^{${b}}$`,
            math: `(${base}^{${a}})^{${b}} = ?`,
            options: [`$${base}^{${a * b}}$`, `$${base}^{${a + b}}$`, `$${base}^{${Math.pow(a, b)}}$`, `$${base}^{${a}}$`],
            correct: 0,
            explanation: `Power of a power rule: MULTIPLY the exponents: $${a} \\times ${b} = ${a * b}$, so the result is $${base}^{${a * b}}$.`
        });
    }

    // 4. Power of Product
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base1 = isLetter ? getLetter() : getNum();
        let base2 = isLetter ? getLetter2(base1) : getNum();
        if (!isLetter && base1 === base2) base2++;
        let a = getNum();
        questions.push({
            question: `Simplify: $(${base1} \\cdot ${base2})^{${a}}$`,
            math: `(${base1} \\cdot ${base2})^{${a}} = ?`,
            options: [`$${base1}^{${a}} \\cdot ${base2}^{${a}}$`, `$${base1} \\cdot ${base2}^{${a}}$`, `$${base1}^{${a}} \\cdot ${base2}$`, `$(${base1} + ${base2})^{${a}}$`],
            correct: 0,
            explanation: `Every factor inside the parentheses gets the power outside: $${base1}^{${a}} \\cdot ${base2}^{${a}}$.`
        });
    }

    // 5. Power of Quotient
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base1 = isLetter ? getLetter() : getNum();
        let base2 = isLetter ? getLetter2(base1) : getNum();
        if (!isLetter && base1 === base2) base2++;
        let a = getNum();
        questions.push({
            question: `Simplify: $\\left(\\frac{${base1}}{${base2}}\\right)^{${a}}$`,
            math: `\\left(\\frac{${base1}}{${base2}}\\right)^{${a}} = ?`,
            options: [`$\\frac{${base1}^{${a}}}{${base2}^{${a}}}$`, `$\\frac{${base1}^{${a}}}{${base2}}$`, `$\\frac{${base1}}{${base2}^{${a}}}$`, `$\\frac{${base1}^{${a}}}{${base2}^{-${a}}}$`],
            correct: 0,
            explanation: `The power applies to both the numerator and the denominator: $\\frac{${base1}^{${a}}}{${base2}^{${a}}}$.`
        });
    }

    // 6. Zero Law
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        questions.push({
            question: `What is $${base}^0$?`,
            math: `${base}^0 = ?`,
            options: [`$1$`, `$0$`, `$${base}$`, `$\\text{undefined}$`],
            correct: 0,
            explanation: `Any non-zero base raised to the power of zero is ALWAYS $1$. So $${base}^0 = 1$.`
        });
    }

    // 7. Identity Law
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        questions.push({
            question: `What is $${base}^1$?`,
            math: `${base}^1 = ?`,
            options: [`$${base}$`, `$1$`, `$0$`, `$${base}^2$`],
            correct: 0,
            explanation: `Any base raised to the power of 1 remains the same. So $${base}^1 = ${base}$.`
        });
    }

    // 8. Negative Law
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        let a = getNum();
        questions.push({
            question: `Simplify: $${base}^{-${a}}$`,
            math: `${base}^{-${a}} = ?`,
            options: [`$\\frac{1}{${base}^{${a}}}$`, `$-${base}^{${a}}$`, `$${base}^{${a}}$`, `$\\frac{-1}{${base}^{${a}}}$`],
            correct: 0,
            explanation: `A negative exponent means the reciprocal. It moves the base to the bottom: $\\frac{1}{${base}^{${a}}}$.`
        });
    }

    // 9. Fractional Law
    for (let isLetter = 0; isLetter < 2; isLetter++) {
        let base = isLetter ? getLetter() : getNum();
        let a = getNum();
        let b = getNum();
        while (b === a) b = getNum(); // Ensure power and root index are distinct

        questions.push({
            question: `Write as a radical: $${base}^{\\frac{${a}}{${b}}}$`,
            math: `${base}^{\\frac{${a}}{${b}}} = ?`,
            options: [`$\\sqrt[${b}]{${base}^{${a}}}$`, `$\\sqrt[${a}]{${base}^{${b}}}$`, `$\\frac{${a}}{${b}} \\sqrt{${base}}$`, `$\\frac{1}{\\sqrt[${b}]{${base}^{${a}}}}$`],
            correct: 0,
            explanation: `Fractional powers are roots. The bottom number (${b}) is the root index, and the top number (${a}) is the power: $\\sqrt[${b}]{${base}^{${a}}}$.`
        });
    }

    // ─── TRICKY QUESTIONS (12 extra questions testing misconceptions) ───

    // Tricky 1: Different bases, same exponent (Multiplication) - Number base
    let tb1 = getNum(), tb2 = tb1 + 1, ta1 = getNum();
    questions.push({
        question: `Simplify: $${tb1}^{${ta1}} \\cdot ${tb2}^{${ta1}}$`,
        math: `${tb1}^{${ta1}} \\cdot ${tb2}^{${ta1}} = ?`,
        options: [`$${tb1 * tb2}^{${ta1}}$`, `$${tb1 + tb2}^{${ta1}}$`, `$${tb1 * tb2}^{${ta1 + ta1}}$`, `$${tb1}^{${ta1}} \\cdot ${tb2}^{${ta1}}$`],
        correct: 0, // Option 0 is correct, others are traps
        explanation: `Since the bases are different but the exponents are exactly the same, you multiply the bases and keep the exponent: $(${tb1} \\cdot ${tb2})^{${ta1}} = ${tb1 * tb2}^{${ta1}}.$`
    });

    // Tricky 2: Different bases, same exponent (Multiplication) - Letter base
    let tl1 = getLetter(), tl2 = getLetter2(tl1), tpa = getNum();
    questions.push({
        question: `Simplify: $${tl1}^{${tpa}} \\cdot ${tl2}^{${tpa}}$`,
        math: `${tl1}^{${tpa}} \\cdot ${tl2}^{${tpa}} = ?`,
        options: [`$(${tl1}${tl2})^{${tpa}}$`, `$(${tl1}+${tl2})^{${tpa}}$`, `$(${tl1}${tl2})^{${tpa * 2}}$`, `$${tl1}${tl2}^{${tpa}}$`],
        correct: 0,
        explanation: `Power of a Product backwards: Since the exponents are identical, you group the bases: $(${tl1}${tl2})^{${tpa}}$.`
    });

    // Tricky 3: Addition instead of Multiplication (Trap) - Letters
    let addBase = getLetter(), addP1 = getNum(), addP2 = addP1 + 1;
    questions.push({
        question: `Simplify: $${addBase}^{${addP1}} + ${addBase}^{${addP2}}$`,
        math: `${addBase}^{${addP1}} + ${addBase}^{${addP2}} = ?`,
        options: [`$\\text{Cannot be simplified}$`, `$${addBase}^{${addP1 + addP2}}$`, `$${addBase}^{${addP1 * addP2}}$`, `$2${addBase}^{${addP1 + addP2}}$`],
        correct: 0,
        explanation: `TRICK QUESTION! You can only add exponents when MULTIPLYING terms with the same base. You cannot combine terms with addition unless they are exactly Like Terms (same base AND same power).`
    });

    // Tricky 4: Addition instead of Multiplication (Trap) - Numbers
    let trNum = getNum(), tryP = getNum();
    questions.push({
        question: `Simplify: $${trNum}^{${tryP}} + ${trNum}^{${tryP}}$`,
        math: `${trNum}^{${tryP}} + ${trNum}^{${tryP}} = ?`,
        options: [`$2 \\cdot ${trNum}^{${tryP}}$`, `$${trNum}^{${tryP + tryP}}$`, `$${trNum + trNum}^{${tryP}}$`, `$${trNum}^{${tryP * 2}}$`],
        correct: 0,
        explanation: `You are ADDING two identical terms. $x + x = 2x$. Therefore, $${trNum}^{${tryP}} + ${trNum}^{${tryP}} = 2 \\cdot ${trNum}^{${tryP}}$. Do not add the exponents unless you are multiplying!`
    });

    // Tricky 5: Nested powers vs Multiplication of terms 
    let tn5 = getLetter(), tp5a = getNum(), tp5b = getNum() + 1;
    questions.push({
        question: `Which is greater: $(${tn5}^{${tp5a}})^{${tp5b}}$ or $${tn5}^{${tp5a}} \\cdot ${tn5}^{${tp5b}}$? (Assume $${tn5}>1$)`,
        math: ``,
        options: [`$(${tn5}^{${tp5a}})^{${tp5b}}$`, `$${tn5}^{${tp5a}} \\cdot ${tn5}^{${tp5b}}$`, `$\\text{They are equal}$`, `$\\text{Depends on } ${tn5}$`],
        correct: 0,
        explanation: `Power of a power multiples: ${tp5a} $\\times$ ${tp5b} = ${tp5a * tp5b}. Multiplying bases adds: ${tp5a} $+$ ${tp5b} = ${tp5a + tp5b}. Multiplying numbers $>1$ gives a higher result than adding them!`
    });

    // Tricky 6: Different bases, different powers (Cannot simplify)
    let bDif1 = getLetter(), bDif2 = getLetter2(bDif1), pDif1 = getNum(), pDif2 = pDif1 + 1;
    questions.push({
        question: `Simplify: $${bDif1}^{${pDif1}} \\cdot ${bDif2}^{${pDif2}}$`,
        math: `${bDif1}^{${pDif1}} \\cdot ${bDif2}^{${pDif2}} = ?`,
        options: [`$\\text{Cannot be further simplified}$`, `$(${bDif1}${bDif2})^{${pDif1 + pDif2}}$`, `$(${bDif1}${bDif2})^{${pDif1 * pDif2}}$`, `$${bDif1}${bDif2}^{${pDif1 + pDif2}}$`],
        correct: 0,
        explanation: `Because the bases ($${bDif1}, ${bDif2}$) are different AND the exponents ($${pDif1}, ${pDif2}$) are different, NO exponent law applies here. It stays exactly as it is.`
    });

    // Tricky 7: Negative base inside parenthesis vs outside
    let nNum = getNum() * 2; // Even power
    questions.push({
        question: `Are $(-x)^{${nNum}}$ and $-x^{${nNum}}$ equal?`,
        math: ``,
        options: [`$\\text{No}$`, `$\\text{Yes}$`, `$\\text{Only if } x = 0$`, `$\\text{Cannot be determined}$`],
        correct: 0,
        explanation: `$(-x)^{${nNum}}$ means the negative sign is raised to an even power, making it positive ($x^{${nNum}}$). But $-x^{${nNum}}$ means the negative is applied AFTER squaring, so it is negative.`
    });

    // Tricky 8: Fraction raised to negative power
    let fA = getNum(), fB = getNum() + 1, fP = getNum();
    questions.push({
        question: `Simplify: $\\left(\\frac{${fA}}{${fB}}\\right)^{-${fP}}$`,
        math: `\\left(\\frac{${fA}}{${fB}}\\right)^{-${fP}} = ?`,
        options: [`$\\left(\\frac{${fB}}{${fA}}\\right)^{${fP}}$`, `$-\\left(\\frac{${fA}}{${fB}}\\right)^{${fP}}$`, `$\\left(\\frac{-${fA}}{${fB}}\\right)^{${fP}}$`, `$\\frac{${fA}^{-${fP}}}{${fB}}$`],
        correct: 0,
        explanation: `A negative exponent on a fraction flips (reciprocates) the entire fraction first, and then the exponent becomes positive: $\\left(\\frac{${fB}}{${fA}}\\right)^{${fP}}$.`
    });

    // Tricky 9: Division trap with subtraction
    let dV = getLetter(), dP = getNum();
    questions.push({
        question: `Evaluate: $\\frac{${dV}^{${dP}} - ${dV}^{${dP}}}{${dV}^{${dP}}}$`,
        math: ``,
        options: [`$0$`, `$1$`, `$${dV}$`, `$\\text{undefined}$`],
        correct: 0,
        explanation: `Always calculate the numerator first! $${dV}^{${dP}} - ${dV}^{${dP}} = 0$. And $0$ divided by anything (except $0$) is $0$.`
    });

    // Tricky 10: Coefficient Trap multiplication
    let c1 = getNum(), c2 = getNum() + 1, cV = getLetter(), cp1 = getNum(), cp2 = getNum();
    questions.push({
        question: `Simplify: $(${c1}${cV}^{${cp1}}) \\cdot (${c2}${cV}^{${cp2}})$`,
        math: `(${c1}${cV}^{${cp1}}) \\cdot (${c2}${cV}^{${cp2}}) = ?`,
        options: [`$${c1 * c2}${cV}^{${cp1 + cp2}}$`, `$${c1 + c2}${cV}^{${cp1 + cp2}}$`, `$${c1 * c2}${cV}^{${cp1 * cp2}}$`, `$${c1}${c2}${cV}^{${cp1 + cp2}}$`],
        correct: 0,
        explanation: `First multiply the coefficients (normal numbers): $${c1} \\cdot ${c2} = ${c1 * c2}$. Then multiply variables using the Product Law (add exponents): ${cp1} + ${cp2} = ${cp1 + cp2}.`
    });

    // Tricky 11: Base of 1
    let opP = Math.floor(Math.random() * 900) + 100;
    questions.push({
        question: `What is $1^{${opP}}$?`,
        math: `1^{${opP}} = ?`,
        options: [`$1$`, `$${opP}$`, `$0$`, `$100$`],
        correct: 0,
        explanation: `The number $1$ multiplied by itself, no matter how many times ($${opP}$ times here), will always equal just $1$.`
    });

    // Tricky 12: Coefficient Trap powers
    let cBase = getNum(), tcP = getNum(), outP = getNum();
    questions.push({
        question: `Simplify: $(${cBase}x^{${tcP}})^{${outP}}$`,
        math: `(${cBase}x^{${tcP}})^{${outP}} = ?`,
        options: [`$${Math.pow(cBase, outP)}x^{${tcP * outP}}$`, `$${cBase}x^{${tcP * outP}}$`, `$${cBase * outP}x^{${tcP * outP}}$`, `$${Math.pow(cBase, outP)}x^{${tcP + outP}}$`],
        correct: 0,
        explanation: `The power outside applies to BOTH the coefficient AND the variable. $${cBase}^{${outP}} = ${Math.pow(cBase, outP)}$, and $(x^{${tcP}})^{${outP}} = x^{${tcP * outP}}$.`
    });

    // SHUFFLE options so the correct answer is not always [0]!
    return questions.map(q => {
        const correctOpt = q.options[q.correct];
        const shuffled = [...q.options].sort(() => Math.random() - 0.5);
        const newCorrect = shuffled.indexOf(correctOpt);
        return { ...q, options: shuffled, correct: newCorrect };
    });
};

const exponentQuestions = generateExponentQuestions();

const generateExponentAssessment = () => {
    const pool = generateExponentQuestions();
    const assessment = [];

    // Pick 1 from each law guarantees 9 distinct law questions
    for (let i = 0; i < 9; i++) {
        const offset = i * 2;
        const takeIdx = offset + Math.floor(Math.random() * 2);
        assessment.push(pool[takeIdx]);
        pool[takeIdx] = null;
    }

    // Pick 16 more questions from the remaining mixed/tricky pool
    const remaining = pool.filter(q => q !== null);
    const shuffledRemaining = [...remaining].sort(() => Math.random() - 0.5);
    assessment.push(...shuffledRemaining.slice(0, 16));

    return assessment.sort(() => Math.random() - 0.5);
};

const exponentAssessment = generateExponentAssessment();

const likeTermsQuestions = [
    { question: 'Which pair are LIKE terms?', options: ['3x and 3y', '5x² and 5x', '4ab and −ab', '7 and 7y'], correct: 2, explanation: '4ab and −ab have the same variables (a and b) raised to the same powers. They are like terms!' },
    { question: 'Which pair are UNLIKE terms?', options: ['6m and −2m', '3x² and 7x²', '5ab and 2ab', '4p and 3q'], correct: 3, explanation: '4p and 3q have DIFFERENT variables (p vs q), making them unlike terms.' },
    { question: 'Identify the like terms in: 3x, 5y, −2x, 7z', options: ['3x and 5y', '3x and −2x', '5y and 7z', 'All are like'], correct: 1, explanation: '3x and −2x both have variable x with power 1. They are like terms.' },
    { question: 'Are 5x² and 5x like terms?', options: ['Yes — same variable', 'No — different powers', 'Yes — same coefficient', 'Depends on x'], correct: 1, explanation: 'Though both have x, their powers differ (2 vs 1). Like terms need SAME variable AND SAME power.' },
    { question: 'Which group contains only like terms?', options: ['3x, 5x², 7x³', '2ab, −5ab, 8ab', '4x, 4y, 4z', '3, 3x, 3x²'], correct: 1, explanation: '2ab, −5ab, 8ab all have the same variables (a and b) with the same powers — they are all like terms!' },
    { question: 'Simplify: 3x + 5x', math: '3x + 5x = ?', options: ['15x', '8x', '8x²', '35x'], correct: 1, explanation: '3x + 5x = (3+5)x = 8x. Add coefficients, keep variable.' },
    { question: 'Simplify: 7y² − 3y²', math: '7y² − 3y² = ?', options: ['4', '4y', '4y²', '4y⁴'], correct: 2, explanation: '7y² − 3y² = (7−3)y² = 4y². Subtract coefficients, keep variable and power.' },
    { question: 'Can 4x and 4x² be added directly?', options: ['Yes, result is 8x', 'Yes, result is 8x²', 'No, they are unlike terms', 'Yes, result is 8x³'], correct: 2, explanation: 'Different powers (1 and 2) make them unlike terms — they CANNOT be added.' },
    { question: 'How many like terms does 5a² − 3b + 2a² + b have?', options: ['None', '2 sets', '1 set', 'All are like'], correct: 1, explanation: '5a² and 2a² are like, −3b and b are like — two pairs/sets of like terms.' },
    { question: 'Simplify: 6m − 4m + 2m', math: '6m − 4m + 2m = ?', options: ['4m', '12m', '0m', '8m'], correct: 0, explanation: '6 − 4 + 2 = 4, so 6m − 4m + 2m = 4m.' },
];

const likeTermsAssessment = [
    { question: 'Which are like terms?', options: ['x³ and x²', '2xy and 3xy', '4x and 4', '5x and 5y'], correct: 1, explanation: '2xy and 3xy have identical variable parts (xy), so they are like terms.' },
    { question: 'Simplify: 9n − 5n + n', math: '9n − 5n + n = ?', options: ['5n', '4n', '3n', '15n'], correct: 0, explanation: '9 − 5 + 1 = 5, so the result is 5n.' },
    { question: 'Identify all like terms in: 5x², 3x, 7x², 2y, −x', options: ['5x² and 3x', '5x² and 7x²; 3x and −x', '3x and 2y', '5x² and −x'], correct: 1, explanation: '5x² and 7x² share power 2; 3x and −x share power 1. Two sets of like terms.' },
    { question: 'Simplify: 3x + 5x + 2y', math: '3x + 5x + 2y = ?', options: ['3x + 5x + 2y', '8x + 2y', '10xy', '10x + 2y'], correct: 1, explanation: '3x + 5x = 8x (combined), plus 2y (cannot combine). So 8x + 2y is simplest.' },
    { question: 'What is the coefficient of x² in the simplified form of: 5x² − 7 + 2x − 2x²?', options: ['5', '−2', '3', '2'], correct: 2, explanation: 'First simplify: 5x² − 2x² = 3x². So the coefficient of x² is 3.' },
    { question: 'Are 3abc and −2abc like terms?', options: ['No — different signs', 'No — different letters', 'Yes — same variable part', 'Cannot determine'], correct: 2, explanation: 'Sign doesn\'t matter for "like terms" classification. Both have same variables abc.' },
    { question: 'Simplify: a + 2a + 3a + 4a', math: 'a + 2a + 3a + 4a = ?', options: ['24a', '10a', '12a', '9a'], correct: 1, explanation: '1 + 2 + 3 + 4 = 10. Result is 10a.' },
    { question: 'How many unlike-term pairs in: 3x, 7y, 4x, 2z?', options: ['1', '2', '3', '0'], correct: 2, explanation: '3x/7y, 3x/2z, 7y/2z (plus 4x/7y, 4x/2z) — multiple unlike pairs exist.' },
    { question: 'Simplify: 5x² + 3x − 2x² − x', math: '5x² + 3x − 2x² − x = ?', options: ['3x² + 2x', '7x² + 4x', '3x² − 2x', '3x² + 4x'], correct: 0, explanation: '5x² − 2x² = 3x² and 3x − x = 2x. Result: 3x² + 2x.' },
    { question: 'Which statement is FALSE?', options: ['5x and −5x are like terms', '3y² and 3y are unlike terms', 'abc and cba are like terms', '4x and 4y are like terms'], correct: 3, explanation: '4x and 4y have DIFFERENT variables — they are unlike terms. This is false.' },
];

const expressionQuestions = [
    { question: 'Add the expressions: (3x + 5) + (2x − 3)', math: '(3x + 5) + (2x − 3)', options: ['5x + 2', '5x + 8', '5x − 2', '5x + 3'], correct: 0, explanation: 'Add like terms: (3x + 2x) + (5 − 3) = 5x + 2.' },
    { question: 'Subtract: (7x + 4) − (3x + 1)', math: '(7x + 4) − (3x + 1)', options: ['4x + 3', '4x + 5', '10x + 5', '4x + 3'], correct: 0, explanation: 'Distribute the minus: 7x + 4 − 3x − 1 = (7x−3x) + (4−1) = 4x + 3.' },
    { question: 'Multiply: 3x(2x + 5)', math: '3x(2x + 5)', options: ['6x + 15', '6x² + 15x', '6x² + 15', '5x² + 15x'], correct: 1, explanation: 'Distribute: 3x × 2x = 6x² and 3x × 5 = 15x. Result: 6x² + 15x.' },
    { question: 'Simplify: (2x + 3)(x − 4)', math: '(2x + 3)(x − 4)', options: ['2x² − 5x − 12', '2x² + 5x − 12', '2x² − 5x + 12', '2x² − 8x − 12'], correct: 0, explanation: 'FOIL: 2x·x + 2x·(−4) + 3·x + 3·(−4) = 2x² − 8x + 3x − 12 = 2x² − 5x − 12.' },
    { question: 'Divide: 6x² ÷ 2x', math: '6x² ÷ 2x', options: ['3x', '3x²', '6x', '12x'], correct: 0, explanation: '6÷2 = 3, x²÷x = x. Result: 3x.' },
    { question: 'Simplify: (x + 2) + (x + 2) + (x + 2)', math: '(x+2) + (x+2) + (x+2)', options: ['x + 6', '3x + 6', '3x + 2', '3x + 9'], correct: 1, explanation: '3 × (x + 2) = 3x + 6. Multiply each part by 3.' },
    { question: 'Subtract: (4a² + 3a + 5) − (2a² + a − 2)', math: '(4a² + 3a + 5) − (2a² + a − 2)', options: ['2a² + 2a + 7', '2a² + 4a + 7', '6a² + 4a + 3', '2a² + 2a + 3'], correct: 0, explanation: 'Subtract each term: (4−2)a² + (3−1)a + (5−(−2)) = 2a² + 2a + 7.' },
    { question: 'Multiply: −2y(3y − 4)', math: '−2y(3y − 4)', options: ['−6y² + 8y', '−6y² − 8y', '6y² − 8y', '−6y + 8y'], correct: 0, explanation: '−2y × 3y = −6y² and −2y × (−4) = +8y. Result: −6y² + 8y.' },
    { question: 'Divide: 12a³b² ÷ 4ab', math: '12a³b² ÷ 4ab', options: ['3a²b', '8a²b', '3a²b²', '3ab'], correct: 0, explanation: '12÷4=3, a³÷a=a², b²÷b=b. Result: 3a²b.' },
    { question: 'Add: (5x² − 3x + 1) + (−2x² + 4x − 6)', math: '(5x² − 3x + 1) + (−2x² + 4x − 6)', options: ['3x² + x − 5', '3x² − x − 5', '7x² − x + 7', '3x² + x + 5'], correct: 0, explanation: '(5−2)x² + (−3+4)x + (1−6) = 3x² + x − 5.' },
];

const expressionAssessment = [
    { question: 'Simplify: (6y + 4) + (−2y + 3)', math: '(6y + 4) + (−2y + 3)', options: ['4y + 7', '8y + 7', '4y + 1', '4y − 7'], correct: 0, explanation: '(6y − 2y) + (4 + 3) = 4y + 7.' },
    { question: 'Multiply: 4a(a − 3)', math: '4a(a − 3)', options: ['4a² − 12a', '4a² − 12', '4a − 12a', '4a² + 12a'], correct: 0, explanation: '4a × a = 4a² and 4a × (−3) = −12a. Result: 4a² − 12a.' },
    { question: 'Divide: 15x²y ÷ 5xy', math: '15x²y ÷ 5xy', options: ['3x', '3xy', '3y', '10x'], correct: 0, explanation: '15÷5=3, x²÷x=x, y÷y=1. Result: 3x.' },
    { question: 'Subtract: (8n² − n) − (3n² + 4n)', math: '(8n² − n) − (3n² + 4n)', options: ['5n² − 5n', '5n² + 5n', '5n² − 3n', '11n² − 5n'], correct: 0, explanation: '(8−3)n² + (−1−4)n = 5n² − 5n.' },
    { question: 'Expand: (x + 3)(x + 5)', math: '(x + 3)(x + 5)', options: ['x² + 15', 'x² + 8x + 15', 'x² + 8x + 8', 'x² + 15x + 8'], correct: 1, explanation: 'FOIL: x² + 5x + 3x + 15 = x² + 8x + 15.' },
    { question: 'Simplify: 3(2x + 1) − 2(x − 4)', math: '3(2x + 1) − 2(x − 4)', options: ['4x + 11', '4x − 11', '8x + 11', '4x + 3'], correct: 0, explanation: '6x + 3 − 2x + 8 = 4x + 11.' },
    { question: 'Expand: 2x(x + 3) + 3(x − 2)', math: '2x(x + 3) + 3(x − 2)', options: ['2x² + 9x − 6', '2x² + 3x − 6', '2x² + 6x + 3', '5x(x+1)−6'], correct: 0, explanation: '2x² + 6x + 3x − 6 = 2x² + 9x − 6.' },
    { question: 'Divide: 9x³ ÷ 3x²', math: '9x³ ÷ 3x²', options: ['3x', '6x', '3x²', '3'], correct: 0, explanation: '9÷3=3, x³÷x²=x. Result: 3x.' },
    { question: 'What is the difference of: (p² + 4p − 3) and (p² − 2p + 1)?', math: '(p² + 4p − 3) − (p² − 2p + 1)', options: ['6p − 4', '2p² + 2p − 2', '6p + 4', '2p − 4'], correct: 0, explanation: '(1−1)p² + (4−(−2))p + (−3−1) = 0 + 6p − 4 = 6p − 4.' },
    { question: 'Expand and simplify: (a + b)² = ?', math: '(a + b)²', options: ['a² + b²', 'a² + ab + b²', 'a² + 2ab + b²', '2a + 2b'], correct: 2, explanation: '(a+b)² = (a+b)(a+b) = a² + 2ab + b². This is a key identity!' },
];

const generateEquationQuestionsLinear1 = () => {
    const questions = [];
    const getNum = (min = 1, max = 12) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getC = (min = 1, max = 5) => Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < 10; i++) {
        const type = i % 5;
        let q, options, explanation;

        if (type === 0) {
            // ax = b
            let a = getC(), ans = getNum(), b = a * ans;
            q = `Solve: $${a}x = ${b}$`;
            options = [`$x = ${ans}$`, `$x = ${ans + a}$`, `$x = ${ans + 2}$`, `$x = ${Math.abs(ans - a) + 1}$`];
            explanation = `Divide both sides by $${a}$: $x = ${b} / ${a} = ${ans}$.`;
        } else if (type === 1) {
            // x + a = b
            let a = getNum(), ans = getNum(), b = ans + a;
            q = `Solve: $x + ${a} = ${b}$`;
            options = [`$x = ${ans}$`, `$x = ${ans + a}$`, `$x = ${b + a}$`, `$x = ${Math.max(1, ans - 2)}$`];
            explanation = `Subtract $${a}$ from both sides: $x = ${b} - ${a} = ${ans}$.`;
        } else if (type === 2) {
            // ax + b = c
            let a = getC(2, 6), b = getNum(), ans = getNum(), c = a * ans + b;
            q = `Solve: $${a}x + ${b} = ${c}$`;
            options = [`$x = ${ans}$`, `$x = ${ans + 1}$`, `$x = ${ans + 3}$`, `$x = ${Math.max(1, ans - 1)}$`];
            explanation = `Subtract $${b}$: $${a}x = ${c - b}$. Divide by $${a}$: $x = ${ans}$.`;
        } else if (type === 3) {
            // ax - b = c
            let a = getC(2, 6), b = getNum(), ans = getNum(), c = a * ans - b;
            q = `Solve: $${a}x - ${b} = ${c}$`;
            options = [`$x = ${ans}$`, `$x = ${ans + 2}$`, `$x = ${Math.max(1, ans - 1)}$`, `$x = ${ans + 4}$`];
            explanation = `Add $${b}$: $${a}x = ${c + b}$. Divide by $${a}$: $x = ${ans}$.`;
        } else {
            // x/a = b
            let a = getC(2, 5), ans = getNum(), b = ans; // We want ans to be the final result, so x/a = ans
            q = `Solve: $x / ${a} = ${b}$`;
            let trueAns = a * b;
            options = [`$x = ${trueAns}$`, `$x = ${b}$`, `$x = ${trueAns + a}$`, `$x = ${Math.max(1, trueAns - a)}$`];
            explanation = `Multiply both sides by $${a}$: $x = ${b} \\times ${a} = ${trueAns}$.`;
        }

        // Shuffle
        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q, math: '', options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateEquationQuestionsLinear2 = () => {
    const questions = [];
    const getVal = (min = 1, max = 8) => Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < 10; i++) {
        let x = getVal(), y = getVal(1, x); // Keep ans positive
        const type = i % 3;
        let q, options, explanation;

        if (type === 0) {
            // Standard elimination: x+y=a, x-y=b
            let a = x + y;
            let b = x - y;
            q = `Solve the system: $x + y = ${a}$ and $x - y = ${b}$`;
            options = [`$x=${x}, y=${y}$`, `$x=${x + 1}, y=${y + 1}$`, `$x=${y}, y=${x}$`, `$x=${x + 2}, y=${Math.max(0, y - 1)}$`];
            explanation = `Add equations directly: $2x = ${a + b} \\rightarrow x = ${x}$. Then $${x} + y = ${a} \\rightarrow y = ${y}$.`;
        } else if (type === 1) {
            // Substitution: y=cx, x+y=a
            let c = getVal(2, 4);
            let ny = c * x; // force y to be multiple
            let a = x + ny;
            q = `Use substitution: $y = ${c}x$ and $x + y = ${a}$`;
            options = [`$x=${x}, y=${ny}$`, `$x=${ny}, y=${x}$`, `$x=${x + 1}, y=${ny + 1}$`, `$x=${x + 2}, y=${ny + 2}$`];
            explanation = `Substitute $y$: $x + ${c}x = ${a} \\rightarrow ${c + 1}x = ${a} \\rightarrow x = ${x}$. Then $y = ${c}(${x}) = ${ny}$.`;
        } else {
            // General elimination: cx + y = a, dx - y = b
            let c = getVal(2, 4), d = getVal(2, 3);
            let a = c * x + y;
            let b = d * x - y;
            q = `Solve using elimination: $${c}x + y = ${a}$ and $${d}x - y = ${b}$`;
            options = [`$x=${x}, y=${y}$`, `$x=${x + 1}, y=${y}$`, `$x=${y}, y=${x}$`, `$x=${x + 2}, y=${y + 1}$`];
            explanation = `Add directly to eliminate $y$: $${c + d}x = ${a + b} \\rightarrow x = ${x}$. Then $${c}(${x}) + y = ${a} \\rightarrow ${c * x} + y = ${a} \\rightarrow y = ${y}$.`;
        }

        // Shuffle
        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q, math: '', options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateEquationQuestionsQuadratic = () => {
    const questions = [];
    const getVal = (min = 1, max = 9) => Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < 10; i++) {
        const type = i < 3 ? 'root' : 'factor';
        let q, options, explanation;

        if (type === 'root') {
            // x^2 = c^2
            let c = getVal(3, 12);
            let c2 = c * c;
            q = `Solve the quadratic: $x^2 = ${c2}$`;
            options = [`$x = \\pm${c}$`, `$x = ${c}$ only`, `$x = ${c2}$`, `$x = \\pm${c + 1}$`];
            explanation = `Taking the square root of both sides gives a positive and negative answer: $x = \\pm${c}$.`;
        } else {
            // (x+a)(x+b) = x^2 + (a+b)x + ab = 0
            // Keep roots simple (negative roots means a and b are positive)
            let a = getVal(1, 6), b = getVal(1, 6);

            // Randomly flip signs for variety in questions
            if (Math.random() > 0.5) a = -a;
            if (Math.random() > 0.5) b = -b;

            let sum = a + b;
            let prod = a * b;

            // Format + - nicely
            let sumStr = sum === 0 ? '' : sum > 0 ? `+ ${sum}x` : `- ${Math.abs(sum)}x`;
            if (Math.abs(sum) === 1) sumStr = sum > 0 ? `+ x` : `- x`; // hide 1
            let prodStr = prod === 0 ? '' : prod > 0 ? `+ ${prod}` : `- ${Math.abs(prod)}`;

            q = `Solve by factoring: $x^2 ${sumStr} ${prodStr} = 0$`;

            // Answers are the roots: -a and -b
            let r1 = -a, r2 = -b;
            // Ensure unique representations in options
            if (r1 === r2) {
                options = [`$x = ${r1}$`, `$x = ${r1 + 2}$`, `$x = ${r1 - 2}$`, `$x = ${-r1}$`];
                explanation = `Factorise: $(x ${a > 0 ? '+' : ''}${a})^2 = 0$, so $x = ${r1}$.`;
            } else {
                options = [`$x = ${r1}$ or $x = ${r2}$`, `$x = ${-r1}$ or $x = ${-r2}$`, `$x = ${r1 + 1}$ or $x = ${r2 + 1}$`, `$x = ${r2}$ or $x = ${r1 - 2}$`];
                explanation = `Factorise: $(x ${a > 0 ? '+' : ''}${a})(x ${b > 0 ? '+' : ''}${b}) = 0$, so $x = ${r1}$ or $x = ${r2}$.`;
            }
        }

        // Shuffle
        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q, math: '', options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const equationAssessment = [
    { question: 'Solve: n − 13 = 5', math: 'n − 13 = 5', options: ['n = 18', 'n = 8', 'n = −8', 'n = 65'], correct: 0, explanation: 'Add 13 to both sides: n = 18.' },
    { question: 'Solve: 5y = 45', math: '5y = 45', options: ['y = 9', 'y = 225', 'y = 40', 'y = 5'], correct: 0, explanation: 'Divide by 5: y = 9.' },
    { question: 'Solve: 3x + 4 = 22', math: '3x + 4 = 22', options: ['x = 6', 'x = 8.67', 'x = 5', 'x = 26/3'], correct: 0, explanation: '3x = 18 → x = 6.' },
    { question: 'Use substitution: y = 2x, x + y = 9. Find x.', math: 'y = 2x, x + y = 9', options: ['x = 3', 'x = 4', 'x = 4.5', 'x = 6'], correct: 0, explanation: 'x + 2x = 9 → 3x = 9 → x = 3.' },
    { question: 'Solve: 2x + 3y = 12 and x = 3', math: '2x + 3y = 12, x = 3', options: ['y = 2', 'y = 3', 'y = 6', 'y = 1'], correct: 0, explanation: '6 + 3y = 12 → 3y = 6 → y = 2.' },
    { question: 'Solve the quadratic: x² − 7x + 12 = 0', math: 'x² − 7x + 12 = 0', options: ['$x = 3$ or $x = 4$', '$x = -3$ or $x = -4$', '$x = 1$ or $x = 12$', '$x = 6$ or $x = 2$'], correct: 0, explanation: 'Factorise: (x−3)(x−4) = 0 → x = 3 or x = 4.' },
    { question: 'A number doubled plus 4 equals 20. Find the number.', options: ['8', '12', '10', '6'], correct: 0, explanation: '2x + 4 = 20 → 2x = 16 → x = 8.' },
    { question: 'Solve: 4x − 2 = 3x + 5', math: '4x − 2 = 3x + 5', options: ['x = 7', 'x = 3', 'x = −3', 'x = 1'], correct: 0, explanation: '4x − 3x = 5 + 2 → x = 7.' },
    { question: 'What are the roots of x² − 4 = 0?', math: 'x² − 4 = 0', options: ['x = ±2', 'x = 4', '$x = 2$ only', 'x = ±4'], correct: 0, explanation: 'x² = 4 → x = ±2.' },
    { question: 'Solve: x/3 + 2 = 5', math: 'x/3 + 2 = 5', options: ['x = 9', 'x = 3', 'x = 21', 'x = 1'], correct: 0, explanation: 'x/3 = 3 → x = 9.' },
];

const subjectQuestions = [
    { question: 'Make x the subject: y = x + 5', math: 'y = x + 5  →  x = ?', options: ['x = y − 5', 'x = y + 5', 'x = 5 − y', 'x = y/5'], correct: 0, explanation: 'Subtract 5 from both sides: x = y − 5.' },
    { question: 'Make x the subject: y = 3x', math: 'y = 3x  →  x = ?', options: ['x = y + 3', 'x = y − 3', 'x = y/3', 'x = 3y'], correct: 2, explanation: 'Divide both sides by 3: x = y/3.' },
    { question: 'Make r the subject of the area formula: A = πr²', math: 'A = πr²  →  r = ?', options: ['r = A/π', 'r = √(A/π)', 'r = √(Aπ)', 'r = A²/π'], correct: 1, explanation: 'Divide by π: r² = A/π. Take square root: r = √(A/π).' },
    { question: 'Make b the subject: P = 2(l + b)', math: 'P = 2(l + b)  →  b = ?', options: ['b = P/2 − l', 'b = P − 2l', 'b = 2P − l', 'b = P + l'], correct: 0, explanation: 'Divide by 2: P/2 = l + b. Then b = P/2 − l.' },
    { question: 'Make v the subject: s = ut + ½at²', math: 's = ut + ½at²  →  u = ?', options: ['u = s/t + ½at', 'u = (s − ½at²)/t', 'u = s − at', 'u = s/t − a'], correct: 1, explanation: 'Subtract ½at²: ut = s − ½at². Divide by t: u = (s − ½at²)/t.' },
    { question: 'Make y the subject: 3x + 2y = 12', math: '3x + 2y = 12  →  y = ?', options: ['y = (12 − 3x)/2', 'y = 12 − 3x', 'y = 3x − 12', 'y = 12 + 3x'], correct: 0, explanation: '2y = 12 − 3x → y = (12 − 3x)/2.' },
    { question: 'Make h the subject: V = lbh', math: 'V = lbh  →  h = ?', options: ['h = V × lb', 'h = V/lb', 'h = V − lb', 'h = lb/V'], correct: 1, explanation: 'Divide both sides by lb: h = V/lb.' },
    { question: 'Make C the subject: F = (9/5)C + 32', math: 'F = (9/5)C + 32  →  C = ?', options: ['C = (F − 32) × 5/9', 'C = (F + 32) × 9/5', 'C = 5F/9 − 32', 'C = F − 32'], correct: 0, explanation: 'F − 32 = (9/5)C → C = (F − 32) × 5/9.' },
    { question: 'Make a the subject: v = u + at', math: 'v = u + at  →  a = ?', options: ['a = (v − u)t', 'a = (v − u)/t', 'a = v − u', 'a = vt − u'], correct: 1, explanation: 'v − u = at → a = (v − u)/t.' },
    { question: 'Make x the subject: y = (x + 2)/(x − 1)', math: 'y = (x + 2)/(x − 1)  →  x = ?', options: ['x = (2 + y)/(y − 1)', 'x = (y − 2)/(y + 1)', 'x = (2 − y)', 'x = y + 3'], correct: 0, explanation: 'y(x−1) = x+2 → yx − y = x + 2 → yx − x = y + 2 → x(y−1) = y+2 → x = (y+2)/(y−1).' },
];

const subjectAssessment = [
    { question: 'Make m the subject: E = mc²', math: 'E = mc²  →  m = ?', options: ['m = E/c²', 'm = Ec²', 'm = E − c²', 'm = E × c'], correct: 0, explanation: 'Divide both sides by c²: m = E/c².' },
    { question: 'Make x the subject: 5x − 3y = 10', math: '5x − 3y = 10  →  x = ?', options: ['x = (10 + 3y)/5', 'x = (10 − 3y)/5', 'x = 2 + 3y', 'x = 5(10 − 3y)'], correct: 0, explanation: '5x = 10 + 3y → x = (10 + 3y)/5.' },
    { question: 'Make t the subject: s = ½gt²', math: 's = ½gt²  →  t = ?', options: ['t = √(2s/g)', 't = 2s/g', 't = √(s/g)', 't = s/2g'], correct: 0, explanation: 'gt² = 2s → t² = 2s/g → t = √(2s/g).' },
    { question: 'If A = (h/2)(a + b), make h the subject', math: 'A = (h/2)(a + b)  →  h = ?', options: ['h = 2A/(a+b)', 'h = A(a+b)/2', 'h = 2A − (a+b)', 'h = A/2(a+b)'], correct: 0, explanation: '2A = h(a+b) → h = 2A/(a+b).' },
    { question: 'Make n the subject: S = n/2 × (a + l)', math: 'S = n/2 × (a+l)  →  n = ?', options: ['n = 2S/(a+l)', 'n = S(a+l)/2', 'n = 2S − (a+l)', 'n = (a+l)/2S'], correct: 0, explanation: '2S = n(a+l) → n = 2S/(a+l).' },
    { question: 'Make y the subject: ax + by = c', math: 'ax + by = c  →  y = ?', options: ['y = (c − ax)/b', 'y = c − ax', 'y = (c + ax)/b', 'y = c/b − a'], correct: 0, explanation: 'by = c − ax → y = (c − ax)/b.' },
    { question: 'What operation undoes squaring when changing subject?', options: ['Halving', 'Square root', 'Squaring again', 'Multiplying'], correct: 1, explanation: 'To undo x², take the square root: √(x²) = x (for x ≥ 0).' },
    { question: 'Make x subject: y = √(x + 4)', math: 'y = √(x + 4)  →  x = ?', options: ['x = y² − 4', 'x = y + 4', 'x = y² + 4', 'x = √y − 4'], correct: 0, explanation: 'Square both sides: y² = x + 4 → x = y² − 4.' },
    { question: 'Make l the subject: T = 2π√(l/g)', math: 'T = 2π√(l/g)  →  l = ?', options: ['l = gT²/4π²', 'l = 4π²T/g', 'l = gT/2π', 'l = T²g/2π'], correct: 0, explanation: 'T/2π = √(l/g) → T²/4π² = l/g → l = gT²/4π².' },
    { question: 'Make r the subject: C = 2πr', math: 'C = 2πr  →  r = ?', options: ['r = C/2π', 'r = 2πC', 'r = C − 2π', 'r = C²/2π'], correct: 0, explanation: 'Divide by 2π: r = C/(2π).' },
];

const wordProblemQuestions = [
    { question: 'Translate to an equation: "Seven less than a number is fifteen". Let the number be $x$.', math: '', options: ['$x - 7 = 15$', '$7 - x = 15$', '$x + 7 = 15$', '$7x = 15$'], correct: 0, explanation: '"Seven less than" means you subtract 7 from the number ($x$). "Is" means equals. So, $x - 7 = 15$.' },
    { question: 'Translate to an equation: "The product of a number and $4$ is $20$". Let the number be $n$.', math: '', options: ['$n + 4 = 20$', '$4n = 20$', '$n/4 = 20$', '$n - 4 = 20$'], correct: 1, explanation: '"Product" means multiplication. "Is" means equals. So $4 \\times n = 20$, or $4n = 20$.' },
    { question: 'At a store, $5$ pens cost $\\$15$. Choose the correct equation to find the cost of one pen ($p$).', math: '', options: ['$p + 5 = 15$', '$5/p = 15$', '$5p = 15$', '$p - 5 = 15$'], correct: 2, explanation: 'Five pens times the cost of one pen ($p$) equals $15$. Therefore, $5p = 15$.' },
    { question: 'Translate: "Half of a number added to $6$ is $14$". Let the number be $y$.', math: '', options: ['$y/2 - 6 = 14$', '$y/2 + 6 = 14$', '$2y + 6 = 14$', '$y + 6 = 14$'], correct: 1, explanation: '"Half of a number" is $y/2$. "Added to 6" means $y/2 + 6$. "Is 14" makes it $y/2 + 6 = 14$.' },
    { question: 'A cab charges $\\$3$ to start, plus $\\$2$ per mile. If the ride costs $\\$15$, choose the equation to find the miles ($m$).', math: '', options: ['$2m + 3 = 15$', '$3m + 2 = 15$', '$m + 5 = 15$', '$2m - 3 = 15$'], correct: 0, explanation: 'The base fee is $3$. You add $2$ for every mile ($2m$). The total is $15$. So, $2m + 3 = 15$.' },
    { question: 'Translate: "Double a number, decreased by $4$, equals $10$". Let the number be $x$.', math: '', options: ['$2x + 4 = 10$', '$x/2 - 4 = 10$', '$2x - 4 = 10$', '$4x - 2 = 10$'], correct: 2, explanation: '"Double a number" is $2x$. "Decreased by 4" means subtract 4. So, $2x - 4 = 10$.' },
    { question: 'Maria has $5$ more apples than John. Together they have $15$ apples. If John has $x$ apples, which equation represents this?', math: '', options: ['$x + 5 = 15$', '$2x + 5 = 15$', '$x - 5 = 15$', '$2x - 5 = 15$'], correct: 1, explanation: 'John = $x$. Maria = $x + 5$. Together: $x + (x + 5) = 15$, which simplifies to $2x + 5 = 15$.' },
    { question: 'Translate: "The sum of a number and its square is $12$". Let the number be $k$.', math: '', options: ['$k + 2k = 12$', '$k + k^2 = 12$', '$k^2 - k = 12$', '$2k + k^2 = 12$'], correct: 1, explanation: '"Sum" means add. A number ($k$) plus its square ($k^2$) is $12$. So, $k + k^2 = 12$.' },
    { question: 'A rectangle is twice as long as it is wide. If the width is $w$, what is the equation for its perimeter ($P$)?', math: '', options: ['$P = 2w + w$', '$P = 4w$', '$P = 6w$', '$P = 3w$'], correct: 2, explanation: 'Length = $2w$, Width = $w$. Perimeter = $2 \\times$ Length + $2 \\times$ Width = $2(2w) + 2(w) = 4w + 2w = 6w$.' },
    { question: 'Sarah earns $\\$10$ an hour, plus a $\\$20$ bonus. If she made $\\$80$, what equation finds her hours ($h$)?', math: '', options: ['$20h + 10 = 80$', '$10h - 20 = 80$', '$10h + 20 = 80$', '$h + 30 = 80$'], correct: 2, explanation: 'Earnings = (rate $\\times$ hours) + bonus. Rate is $10$, bonus is $20$. So, $10h + 20 = 80$.' },
];

const wordProblemAssessment = [
    { question: 'Translate: "Nine more than three times a number is $24$". (Let number format = $n$)', math: '', options: ['$3n - 9 = 24$', '$3n + 9 = 24$', '$9n + 3 = 24$', '$3(n + 9) = 24$'], correct: 1, explanation: '"Three times a number" is $3n$. "Nine more than" means add 9. So, $3n + 9 = 24$.' },
    { question: 'A subscription costs $\\$10$ per month plus a $\\$5$ setup fee. To find the cost ($C$) for $m$ months, use:', math: '', options: ['$C = 5m + 10$', '$C = 10m - 5$', '$C = 15m$', '$C = 10m + 5$'], correct: 3, explanation: 'Monthly rate $\\times$ months ($10m$) + one-time fee ($5$) = Total Cost ($C$). So $C = 10m + 5$.' },
    { question: 'Translate to an expression: "The difference between twice a number and $8$". (number = $x$)', math: '', options: ['$2x - 8$', '$8 - 2x$', '$x/2 - 8$', '$2(x - 8)$'], correct: 0, explanation: '"Difference" means subtract. The order is given: "twice a number" ($2x$) minus $8$. Result: $2x - 8$.' },
    { question: 'A box of chocolates has $c$ pieces. You eat $4$ and have $16$ left. Which equation is correct?', math: '', options: ['$c + 4 = 16$', '$c - 4 = 16$', '$4c = 16$', '$c/4 = 16$'], correct: 1, explanation: 'Starting amount ($c$) minus what you ate ($4$) leaves $16$. So, $c - 4 = 16$.' },
    { question: 'Tom is $3$ years older than his sister. If they are $25$ years old combined, and his sister is $y$ years old, what equation represents this?', math: '', options: ['$y + 3 = 25$', '$2y + 3 = 25$', '$2y - 3 = 25$', '$y - 3 = 25$'], correct: 1, explanation: 'Sister = $y$. Tom = $y + 3$. Combined: $y + (y + 3) = 25$, which is $2y + 3 = 25$.' },
    { question: 'Translate: "One-third of a number is equal to $12$". (number = $n$)', math: '', options: ['$n - 3 = 12$', '$3n = 12$', '$n/3 = 12$', '$n + 3 = 12$'], correct: 2, explanation: '"One-third of" means dividing by $3$ (or multiplying by $1/3$). So, $n/3 = 12$.' },
    { question: 'Translate: "The quotient of a number and $5$ is $10$". (number = $x$)', math: '', options: ['$5x = 10$', '$x/5 = 10$', '$5/x = 10$', '$x - 5 = 10$'], correct: 1, explanation: '"Quotient" means division. $x$ divided by $5$ equals $10$. So $x/5 = 10$.' },
    { question: 'A pizza costs $\\$8$ and each topping is $\\$1.50$. If a pizza cost $\\$14$, which equation finds the number of toppings ($t$)?', math: '', options: ['$1.50t - 8 = 14$', '$8t + 1.50 = 14$', '$1.50t + 8 = 14$', '$9.50t = 14$'], correct: 2, explanation: 'Base pizza ($8$) plus toppings ($1.50 \\times t$) equals total ($14$). $1.50t + 8 = 14$.' },
    { question: 'Translate: "Four times the sum of a number and $2$ is $36$". (number = $x$)', math: '', options: ['$4x + 2 = 36$', '$4 + x + 2 = 36$', '$x + 8 = 36$', '$4(x + 2) = 36$'], correct: 3, explanation: '"Four times the sum" means you must add first, then multiply. Use parentheses! $4(x + 2) = 36$.' },
    { question: 'Ana saved $s$ dollars. Bob saved double what Ana saved. Together they have $\\$120$. Equation?', math: '', options: ['$2s = 120$', '$3s = 120$', '$s + 2 = 120$', '$s^2 = 120$'], correct: 1, explanation: 'Ana = $s$. Bob = $2s$. Together: $s + 2s = 120$. This simplifies to $3s = 120$.' },
];

// ─── SKILLS DATA ───────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'exponents',
        title: 'Laws of Exponents',
        subtitle: 'Skill 1 · Simplifying Terms',
        icon: '⚡',
        color: '#6366f1',
        desc: 'Product, power, and zero laws to simplify expressions.',
        practice: exponentQuestions,
        assessment: exponentAssessment,
        learn: {
            concept: 'Exponents are shorthand for repeated multiplication. These 9 laws are the "grammar rules" of algebra that let you simplify even the scariest expressions.',
            rules: [
                { title: 'Product Law', f: 'x^a \\cdot x^b = x^{a+b}', d: 'When multiplying powers with the same base, ADD the exponents.', ex: 'x^3 \\cdot x^4 = x^{3+4} = x^7', tip: 'Think: 3 copies + 4 copies = 7 copies total!' },
                { title: 'Quotient Law', f: '\\frac{x^a}{x^b} = x^{a-b}', d: 'When dividing powers with the same base, SUBTRACT the bottom exponent from the top.', ex: '\\frac{y^8}{y^2} = y^{8-2} = y^6', tip: 'You are "canceling out" matching variables from the top and bottom.' },
                { title: 'Power Law', f: '(x^a)^b = x^{ab}', d: 'A power of a power? MULTIPLY the exponents together.', ex: '(x^2)^3 = x^{2 \\cdot 3} = x^6', tip: 'A group of powers being powered up grows very fast!' },
                { title: 'Power of Product', f: '(xy)^a = x^a y^a', d: 'Every factor inside the parentheses gets the power outside.', ex: '(2x)^3 = 2^3 x^3 = 8x^3', tip: 'Always remember to apply the power to the number (coefficient) too!' },
                { title: 'Power of Quotient', f: '\\left(\\frac{x}{y}\\right)^a = \\frac{x^a}{y^a}', d: 'The power applies to both the numerator (top) and denominator (bottom).', ex: '\\left(\\frac{x}{3}\\right)^2 = \\frac{x^2}{3^2} = \\frac{x^2}{9}', tip: 'Distribute the power to every part of the fraction.' },
                { title: 'Zero Law', f: 'x^0 = 1', d: 'Any non-zero base raised to the power of zero is ALWAYS 1.', ex: '525^0 = 1', tip: 'It doesn\'t matter how big the number is; power 0 makes it 1!' },
                { title: 'Identity Law', f: 'x^1 = x', d: 'Any base raised to the power of 1 remains the same.', ex: 'y^1 = y', tip: 'The exponent 1 is usually "invisible" in algebra.' },
                { title: 'Negative Law', f: 'x^{-n} = \\frac{1}{x^n}', d: 'A negative exponent means the "Reciprocal". It moves the base to the bottom.', ex: 'x^{-2} = \\frac{1}{x^2}', tip: 'Think of the minus sign as a ticket to cross the fraction line!' },
                { title: 'Fractional Law', f: 'x^{\\frac{a}{b}} = \\sqrt[b]{x^a}', d: 'Fractional powers are secretly roots. The bottom number is the root index.', ex: 'x^{\\frac{1}{2}} = \\sqrt{x}', tip: 'Bottom = Root. Top = Power.' },
            ]
        }
    },
    {
        id: 'liketerms',
        title: 'Identifying Like & Unlike Terms',
        subtitle: 'Skill 2',
        icon: '🤝',
        color: '#0891b2',
        desc: 'Combine matching variables and powers accurately.',
        practice: likeTermsQuestions,
        assessment: likeTermsAssessment,
        learn: {
            concept: 'Like terms are the mathematical equivalent of identical twins. To combine them, they must share the exact same variable part.',
            rules: [
                { title: 'Variable Match', f: '3x + 5x = 8x', d: 'Terms must have the SAME variable letters to be combined.', ex: '$3x + 4y$ stays as $3x + 4y$', tip: 'You can\'t add apples and oranges!' },
                { title: 'Power Match', f: 'x^2 + 2x^2 = 3x^2', d: 'Even if the letters match, the powers must also match EXACTLY.', ex: '$x^2 + x^3$ cannot be added', tip: 'Check the letters AND the tiny numbers above them.' },
                { title: 'Coefficient rule', f: '7a - 2a = 5a', d: 'Only add/subtract the coefficients (numbers in front). Keep the letters the same.', ex: '$5x^2 + 4x^2 = 9x^2$ (not $9x^4$)', tip: 'You are counting how many of that "item" you have.' },
                { title: 'Invisible Coeff.', f: 'x = 1x', d: 'If a variable has no number in front, its coefficient is secretly 1.', ex: '$x + 3x = 1x + 3x = 4x$', tip: 'Don\'t forget the 1!' },
            ]
        }
    },
    {
        id: 'expressions',
        title: 'Simplifying Expressions',
        subtitle: 'Skill 3',
        icon: '📝',
        color: '#f59e0b',
        desc: 'Solve multi-part algebraic phrases with ease.',
        practice: expressionQuestions,
        assessment: expressionAssessment,
        learn: {
            concept: 'Simplifying an expression means writing it in its shortest, most efficient form by combining all possible terms.',
            rules: [
                { title: 'Distribution', f: 'a(b + c) = ab + ac', d: 'Multiply the outside term by every term inside the parentheses.', ex: '3(x + 2) = 3x + 6', tip: 'Fairness rule: the term outside must visit everyone inside!' },
                { title: 'Combo Order', f: '\\text{Group } \\rightarrow \\text{ Combine}', d: 'First, rewrite the expression by grouping all like terms together.', ex: '3x + 5 + 2x = 3x + 2x + 5 = 5x + 5', tip: 'Organizing your terms first prevents mistakes.' },
                { title: 'Sign Safety', f: '-(x + y) = -x - y', d: 'A minus sign in front of a bracket flips the sign of EVERYTHING inside.', ex: '10 - (x + 3) = 10 - x - 3 = 7 - x', tip: 'Treat that minus sign like a multiplier of -1.' },
                { title: 'PEMDAS Rule', f: '\\text{Order Matters}', d: 'Always follow the standard order: Parentheses, Exponents, Mult/Div, Add/Sub.', ex: '2 + 3(x) \\neq 5x', tip: 'Multiplication comes before addition!' },
            ]
        }
    },
    {
        id: 'equations',
        title: 'Solving Equations',
        subtitle: 'Skill 4',
        icon: '⚖️',
        color: '#ec4899',
        desc: 'Isolate variables in linear and quadratic problems.',
        practiceCategories: [
            { title: 'Linear equation in 1 variable', questions: generateEquationQuestionsLinear1 },
            { title: 'Pair of linear equations in 2 variables', questions: generateEquationQuestionsLinear2 },
            { title: 'Quadratic Equation', questions: generateEquationQuestionsQuadratic }
        ],
        practice: generateEquationQuestionsLinear1, // Default fallback
        assessment: equationAssessment,
        learn: {
            concept: 'To solve an equation, you must find the value of the variable that makes the scale balance perfectly.',
            rules: [
                { title: 'Golden Balance', f: '\\text{LHS} = \\text{RHS}', d: 'Whatever you do to one side, you MUST do to the other side.', ex: 'If you add $5$ to the left, add $5$ to the right.', tip: 'The equals sign is sacred balance point.' },
                { title: 'Inverses', f: '+ \\longleftrightarrow - \\text{ , } \\cdot \\longleftrightarrow /', d: 'Use the opposite operation to "undo" numbers and move them.', ex: 'To move  $+3$, use $-3$. To move a multiplier of $2$, divide by $2$.', tip: 'Do the opposite to cross the bridge.' },
                { title: 'Isolate Target', f: 'x = \\text{Result}', d: 'Keep undoing operations until the variable (target) is all alone on one side.', ex: '2x = 10 \\rightarrow x = 5', tip: 'Goal: Leave x by itself!' },
                { title: 'Two-Step rule', f: '\\text{Move } \\pm \\text{ first}', d: 'Usually, you should move stand-alone numbers (±) before you divide the coefficient.', ex: '2x + 4 = 10 \\\\ 2x = 6 \\\\ x = 3', tip: 'Clean up the additions/subtractions first.' },
                { title: '1-Variable Linear', f: '3x + 2 = 11', d: 'An equation with only ONE mystery letter. Think of it like a seesaw with a mystery box. Move all regular numbers away from the box to see what is exactly inside!', ex: 'Start with $3x + 2 = 11$. Move $+2$ away: $3x = 9$. Then divide by $3$ to find $x = 3$.', tip: 'Get the mystery letter completely alone!' },
                { title: '2-Var: Elimination', f: '\\text{Multiply } \\rightarrow \\text{ Add}', d: 'Multiply one or both equations by a clever number until a letter has exact opposite coefficients (like $+3y$ and $-3y$). Then add the equations straight down to destroy that letter!', ex: 'Solve $2x+3y=13$ and $x-y=4$. Multiply the second by $3$ to get $3x-3y=12$. Add them to the first: $5x = 25$, so $x=5$. Plug $x$ back in to find $y=1$', tip: 'Create opposite twins, then add to destroy them!' },
                { title: '2-Var: Substitution', f: '\\text{Swap it out}', d: 'Use one equation to get a letter completely by itself ($y = \\dots$). Then substitute that entire chunk into the OTHER equation in place of that letter!', ex: 'Solve $2x+y=7$ and $3x-2y=0$. Get $y$ alone in the first: $y=7-2x$. Swap $y$ into the second: $3x-2(7-2x)=0$. This simplifies to $7x=14$, so $x=2$!', tip: 'Use one equation to unlock the other.' },
                { title: 'Quadratic: Roots', f: 'x^2 = 25', d: 'If you just have a letter squared, take the square root of both sides. But remember: squares always have a positive AND a negative twin answer!', ex: 'If $x^2 = 25$, taking the root gives $x = 5$. But wait! $-5 \\times -5 = 25$ too. So $x = 5$ OR $x = -5$.', tip: 'Always check for the negative twin answer.' },
                { title: 'Quadratic: Factoring', f: 'x^2 + 5x + 6 = 0', d: 'Turn it into a puzzle! Find two numbers that multiply to make the last number, AND add up to make the middle number. Then you can find the final answers!', ex: 'For $x^2 + 5x + 6 = 0$: $2$ and $3$ multiply to $6$ and add to $5$. The pieces are $(x+2)(x+3)=0$, so $x=-2$ or $x=-3$.', tip: 'Reverse the multiplication to find the hidden numbers!' },
                { title: 'Quadratic: Formula', f: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', d: 'When a puzzle is too hard to factor, use the magic Quadratic Formula! Find the numbers $a, b,$ and $c$ from $ax^2+bx+c=0$ and plug them into the formula.', ex: 'For $2x^2 - 5x + 3 = 0$: $a=2, b=-5, c=3$. Plugging them into the formula gives the exact answers $x=1.5$ and $x=1$.', tip: 'The magic formula works on EVERY quadratic equation!' },
            ]
        }
    },
    {
        id: 'subject',
        title: 'Changing the Subject',
        subtitle: 'Skill 5',
        icon: '🔄',
        color: '#7c3aed',
        desc: 'Rearrange formulas to solve for any variable.',
        practice: subjectQuestions,
        assessment: subjectAssessment,
        learn: {
            concept: 'Changing the subject is like re-crowning a new king. You move all other terms away so the new variable stands on the throne.',
            rules: [
                { title: 'The Target', f: '\\text{Target} = \\text{Formula}', d: 'Identify the variable you want to isolate. That is your "New Subject".', ex: 'In $v=u+at$, make $a$ the subject.', tip: 'Treat the target like a treasure to be uncovered.' },
                { title: 'Strip away', f: '\\text{Work Outwards}', d: 'Start moving terms that are furthest away from your target variable first.', ex: 'v = u + at \\rightarrow v - u = at \\\\ a = \\frac{(v-u)}{t}', tip: 'Peel the equation like an onion.' },
                { title: 'Undo Roots', f: '\\sqrt{\\phantom{x}} \\longleftrightarrow x^2', d: 'To get rid of a square root, square both sides. To remove a power of 2, take the root.', ex: 'y = \\sqrt{x} \\rightarrow y^2 = x', tip: 'Powers and roots are the ultimate opposites.' },
                { title: 'Denominator', f: '\\text{Multiply Up}', d: 'If your target or part of its expression is in a fraction bottom, multiply it out.', ex: '\\frac{A}{b} = c \\rightarrow A = bc', tip: 'Get your variables onto one line as soon as possible.' },
            ]
        }
    },
    {
        id: 'wordproblems',
        title: 'Word Problems',
        subtitle: 'Skill 6',
        icon: '🌍',
        color: '#10b981',
        desc: 'Apply algebra to real-life scenarios by converting words to math.',
        practice: wordProblemQuestions,
        assessment: wordProblemAssessment,
        learn: {
            concept: 'Word problems are just puzzles hiding in plain sight. They teach you how to translate English sentences into Math equations!',
            rules: [
                { title: 'Translate Words', f: '\\text{Sum} = +, \\text{Diff} = -, \\text{Prod} = \\times, \\text{Quot} = /', d: 'Turn English words into math symbols. Words like "total" or "more than" mean add. "Less than" or "difference" mean subtract.', ex: '"Five more than a number" becomes $x + 5$. "Twice a number" is $2x$.', tip: 'Read carefully, there are secret math code words everywhere!' },
                { title: 'Identify Variables', f: '\\text{Let } x = \\dots', d: 'Find what you don\'t know. That mystery becomes your variable ($x$, $y$, $c$, etc).', ex: '"How many apples did he buy?" Let $a$ be the number of apples.', tip: 'The question at the end usually tells you exactly what the variable should be.' },
                { title: 'Build the Equation', f: '\\text{Left Side} = \\text{Right Side}', d: 'Use your translated words to build a balanced equation. The word "is" almost always means "equals" ($=$).', ex: '"Three times a number is twelve" turns directly into $3x = 12$.', tip: 'The word "is" is your center point. Build around it.' },
                { title: 'Real-Life Scenarios', f: '\\text{Apply to the real world!}', d: 'You can use Algebra to solve money problems, time limits, distance traveled, and more!', ex: 'If $3$ tickets cost $\\$15$, we set up $3t = 15$. Divide by $3$, so $t = 5$ dollars each!', tip: 'Always check if your final answer makes real-world sense. (You can\'t buy $-2$ apples!)' },
            ]
        }
    },
];

export default function AlgebraSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    // Component for handling multi-category practice sections
    const CategorizedPracticeEngine = ({ skill, onBack }) => {
        const [activeCat, setActiveCat] = useState(0);
        const category = skill.practiceCategories[activeCat];

        return (
            <div className="alg-practice-layout">
                <aside className="alg-learn-sidebar">
                    <button onClick={onBack} style={{ marginBottom: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--alg-muted)', textAlign: 'left', fontWeight: 'bold' }}>← Back to Skills</button>
                    <h3 style={{ margin: '0 0 12px 0', fontSize: 16, textTransform: 'uppercase', letterSpacing: 1, color: skill.color }}>Categories</h3>
                    {skill.practiceCategories.map((c, i) => (
                        <button key={i} onClick={() => setActiveCat(i)} className={`alg-sidebar-btn ${activeCat === i ? 'active' : ''}`} style={{
                            '--skill-color': skill.color,
                            '--skill-color-15': `${skill.color}15`,
                            '--skill-color-40': `${skill.color}40`,
                            '--skill-color-05': `${skill.color}05`,
                            textAlign: 'left',
                            fontSize: 14,
                            lineHeight: 1.4,
                        }}>
                            {c.title}
                        </button>
                    ))}
                </aside>
                <main>
                    <QuizEngine
                        key={activeCat} // Force remount to reset state
                        questions={category.questions}
                        title={`Practice: ${category.title}`}
                        onBack={onBack}
                        color={skill.color}
                    />
                </main>
            </div>
        );
    };
    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className="skills-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                <nav className="intro-nav">
                    <button className="intro-nav-back" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    <div className="intro-nav-links">
                        <button className="intro-nav-link" onClick={() => navigate('/algebra/introduction')}>🌟 Intro</button>
                        <button className="intro-nav-link" onClick={() => navigate('/algebra/terminology')}>📖 Terminology</button>
                        <button className="intro-nav-link intro-nav-link--active">🎯 Skills</button>
                    </div>
                </nav>
                <div style={{ padding: '40px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className="alg-lexicon-container">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: 'var(--alg-text)', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="alg-learn-grid">
                                {/* Side Selector */}
                                <aside className="alg-learn-sidebar">
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            className={`alg-sidebar-btn ${selectedLearnIdx === ri ? 'active' : ''}`}
                                            style={{
                                                '--skill-color': skill.color,
                                                '--skill-color-15': `${skill.color}15`,
                                                '--skill-color-40': `${skill.color}40`,
                                                '--skill-color-05': `${skill.color}05`
                                            }}
                                        >
                                            <div className="alg-sidebar-btn-num">{ri + 1}</div>
                                            <span className="alg-sidebar-btn-title">{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detailed Window */}
                                <main className="details-window-anim alg-details-window" key={selectedLearnIdx}>
                                    <div className="alg-learn-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--alg-muted)' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    {/* Core Formula Box */}
                                    <div style={{ background: `${skill.color}05`, padding: '24px', borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 32, textAlign: 'center' }}>
                                        <div className="formula-text" style={{ fontSize: 42, fontWeight: 800, color: skill.color }}>
                                            <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f} $$`} />
                                        </div>
                                    </div>

                                    <div className="alg-rule-split">
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: 'var(--alg-muted)', marginBottom: 10 }}>Explanation</h4>
                                            <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: 'var(--alg-text)' }}>
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].d} />
                                            </p>

                                            <div style={{ marginTop: 24, background: 'rgba(20,184,166,0.05)', padding: '16px', borderRadius: 16, border: '1px solid rgba(20,184,166,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--alg-muted)' }}>
                                                    <span style={{ fontWeight: 800, color: 'var(--alg-teal)' }}>🛡️ Survival Tip: </span>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)' }}>
                                                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--alg-text)' }}>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex.includes('$') ? skill.learn.rules[selectedLearnIdx].ex : `$${skill.learn.rules[selectedLearnIdx].ex}$`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footnotes */}
                                    <div className="alg-learn-footer" style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button className="alg-btn-primary" onClick={() => setView('practice')} style={{ padding: '14px 32px', background: skill.color, fontSize: 15 }}>Mastered this? Try Practice →</button>
                                        <button className="alg-btn-secondary" onClick={() => {
                                            const nextIdx = (selectedLearnIdx + 1) % skill.learn.rules.length;
                                            setSelectedLearnIdx(nextIdx);
                                        }} style={{ padding: '14px 32px', fontSize: 15 }}>Next: {skill.learn.rules[(selectedLearnIdx + 1) % skill.learn.rules.length].title}</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'assessment' ? (
                        <AssessmentEngine
                            questions={skill.assessment}
                            title={`Assessment: ${skill.title} `}
                            onBack={() => setView('list')}
                            color={skill.color}
                        />
                    ) : view === 'practice' ? (
                        skill.practiceCategories ? (
                            <CategorizedPracticeEngine skill={skill} onBack={() => setView('list')} />
                        ) : (
                            <QuizEngine
                                questions={skill.practice}
                                title={`Practice: ${skill.title} `}
                                onBack={() => setView('list')}
                                color={skill.color}
                            />
                        )
                    ) : null}
                </div>
            </div>
        );
    }

    return (
        <div className="skills-page">
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="intro-nav">
                <button
                    className="intro-nav-back"
                    onClick={() => navigate('/algebra')}
                >
                    ← Back to Algebra
                </button>

                <div className="intro-nav-links">
                    <button
                        className="intro-nav-link"
                        onClick={() => navigate('/algebra/introduction')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="intro-nav-link"
                        onClick={() => navigate('/algebra/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="intro-nav-link intro-nav-link--active"
                        onClick={() => navigate('/algebra/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="alg-lexicon-container">

                {/* Compact Heading Line */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: 32
                }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.1rem', fontWeight: 900, color: 'var(--alg-text)', margin: '0 0 6px' }}>
                        Algebra <span style={{ background: 'linear-gradient(135deg, var(--alg-teal), var(--alg-indigo))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
                    </h1>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--alg-muted)', letterSpacing: 0.5 }}>
                        Step up from concepts to mastery with targeted practice.
                    </div>
                </div>

                {/* Vertical Skills List */}
                <div className="alg-skills-list">
                    {SKILLS.map((skill, idx) => (
                        <div key={skill.id} className="alg-skill-card">
                            {/* Skill Info */}
                            <div className="alg-skill-info">
                                <div className="alg-skill-icon" style={{ background: `${skill.color}15` }}>
                                    {skill.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>
                                        {skill.subtitle}
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--alg-text)' }}>{skill.title}</h3>
                                    <p style={{ margin: 0, fontSize: 12, color: 'var(--alg-muted)' }}>{skill.desc}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="alg-skill-actions">
                                <button
                                    onClick={() => { setActiveSkill(idx); setView('learn'); }}
                                    className="alg-btn-secondary"
                                    style={{ padding: '8px 16px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap', border: '1.5px solid rgba(0,0,0,0.1)' }}
                                >
                                    Learn
                                </button>
                                <button
                                    onClick={() => { setActiveSkill(idx); setView('practice'); }}
                                    className="alg-btn-secondary"
                                    style={{ padding: '8px 16px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap' }}
                                >
                                    Practice
                                </button>
                                <button
                                    onClick={() => { setActiveSkill(idx); setView('assessment'); }}
                                    className="alg-btn-primary"
                                    style={{ padding: '8px 16px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap', background: skill.color }}
                                >
                                    Assess
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final Motivation */}
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: 'var(--alg-muted)', fontWeight: 600 }}>
                        Done with all? You're officially an <span style={{ color: 'var(--alg-indigo)' }}>Algebra Pro!</span> 🏅
                    </p>
                </div>
            </div>
        </div>
    );
}

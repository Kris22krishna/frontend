import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '../../MathRenderer';
import { LayoutGrid, X, AlertTriangle, Monitor, CheckCircle, Home } from 'lucide-react';
import { api } from '../../../services/api';
import './AlgebraAssessment.css';

export default function AlgebraAssessmentEngine({ questions, title, onBack, color, prefix = 'alg-mastery' }) {
    const getQuestionType = (question) => {
        if (question?.type === 'text') return 'text';
        return 'mcq';
    };

    const normalizeTextAnswer = (value) => String(value ?? '')
        .replace(/\s+/g, '')
        .trim()
        .toLowerCase();

    const isAnswerComplete = (question, answer) => {
        const type = getQuestionType(question);
        if (type === 'text') return normalizeTextAnswer(answer).length > 0;
        return answer !== null && answer !== undefined;
    };

    const isAnswerCorrect = (question, answer) => {
        const type = getQuestionType(question);
        if (type === 'text') {
            return normalizeTextAnswer(answer) === normalizeTextAnswer(question.answer);
        }
        return answer === question.correct;
    };

    const [questionSet] = useState(() => typeof questions === 'function' ? questions() : questions);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(questionSet.length).fill(null));
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(questionSet.length * 60);
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [violations, setViolations] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showViolationModal, setShowViolationModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const topRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) {
            handleSubmit(true); // Auto-submit on time out
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, finished]);

    useEffect(() => {
        if (finished) return;

        const handleViolation = () => {
            if (finished) return;
            setViolations(prev => {
                const next = prev + 1;
                if (next >= 3) {
                    handleSubmit(true, next); // Auto-submit on violation limit
                    return next;
                }
                setShowViolationModal(true);
                return next;
            });
        };

        const onVisibilityChange = () => {
            if (document.hidden) handleViolation();
        };

        const onBlur = () => {
            handleViolation();
        };

        const onFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener("visibilitychange", onVisibilityChange);
        window.addEventListener("blur", onBlur);
        document.addEventListener("fullscreenchange", onFullScreenChange);

        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.removeEventListener("blur", onBlur);
            document.removeEventListener("fullscreenchange", onFullScreenChange);
        };
    }, [finished]);

    useEffect(() => {
        if (topRef.current) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [current]);

    const enterFullScreen = () => {
        if (containerRef.current?.requestFullscreen) {
            containerRef.current.requestFullscreen();
        } else if (containerRef.current?.webkitRequestFullscreen) {
            containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current?.msRequestFullscreen) {
            containerRef.current.msRequestFullscreen();
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleSelect = (idx) => {
        const newAns = [...answers];
        newAns[current] = idx;
        setAnswers(newAns);
    };

    const handleTextChange = (val) => {
        const newAns = [...answers];
        newAns[current] = val;
        setAnswers(newAns);
    };

    const logScore = async (currentViolations) => {
        try {
            const firstName = sessionStorage.getItem('firstName');
            const userId = sessionStorage.getItem('userId');
            const studentEmail = sessionStorage.getItem('userEmail') || sessionStorage.getItem('email') || 'N/A';
            const studentGrade = sessionStorage.getItem('studentGrade') || 'N/A';

            let scoreCount = 0;
            const detailedLogs = questionSet.map((q, i) => {
                const ans = answers[i];
                const correct = isAnswerCorrect(q, ans);
                if (correct) scoreCount++;
                return {
                    question_id: i + 1,
                    question_text: q.question,
                    student_answer: ans,
                    correct_answer: q.answer || q.correct,
                    is_correct: correct
                };
            });

            const scoreData = {
                username: firstName || 'Anonymous',
                email: studentEmail,
                user_id: userId || 'N/A',
                grade: studentGrade,
                score: `${scoreCount} / ${questionSet.length}`,
                percentage: Math.round((scoreCount / questionSet.length) * 100),
                results: detailedLogs,
                violations: currentViolations !== undefined ? currentViolations : violations,
                time_remaining: formatTime(timeLeft),
                submission_type: (currentViolations || violations) >= 3 ? 'auto_submit_violation' : (timeLeft <= 0 ? 'auto_submit_timer' : 'manual'),
                assessment_type: 'Algebra Mastery'
            };

            await api.saveIDMScore(scoreData);
            console.log("Results logged to Supabase successfully.");
        } catch (error) {
            console.error("Error logging results:", error);
        }
    };

    const handleSubmit = async (isAuto = false, violationCount) => {
        if (isSubmitting || finished) return;

        if (!isAuto && answers.includes(null)) {
            if (!window.confirm("You have unanswered questions. Submit anyway?")) return;
        }

        setIsSubmitting(true);
        try {
            await logScore(violationCount);
            setFinished(true);
        } catch (error) {
            alert("There was an error submitting your test. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    const answeredCount = answers.filter((a, i) => isAnswerComplete(questionSet[i], a)).length;

    if (finished) {
        return (
            <div className="alg-mastery-container" style={{ background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="alg-mastery-card" style={{ maxWidth: '600px', textAlign: 'center', padding: '60px 40px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}>
                    <div style={{ background: '#ecfdf5', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', color: '#10b981' }}>
                        <CheckCircle size={48} />
                    </div>
                    <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#1e293b', marginBottom: '16px' }}>Assessment Completed!</h2>
                    <p style={{ fontSize: '18px', color: '#64748b', lineHeight: '1.6', marginBottom: '40px' }}>
                        Thank you for participating in the International Day of Mathematics (IDM) Algebra Assessment.
                        Your responses have been successfully recorded.
                    </p>
                    <button
                        onClick={() => window.location.href = '/student-dashboard'}
                        className="alg-mastery-btn alg-mastery-btn-primary"
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '56px', fontSize: '18px' }}
                    >
                        <Home size={20} />
                        Return to Dashboard
                    </button>
                    <p style={{ marginTop: '24px', fontSize: '14px', color: '#94a3b8' }}>
                        You will be redirected shortly...
                    </p>
                </div>
            </div>
        );
    }

    const q = questionSet[current];

    const PaletteContent = () => (
        <div className={`alg-mastery-palette-sidebar ${paletteOpen ? 'mobile-open' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem' }}>Question Palette</h4>
                {paletteOpen && <X className="cursor-pointer lg:hidden" onClick={() => setPaletteOpen(false)} />}
            </div>

            <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                Progress: {answeredCount} / {questionSet.length} answered
            </div>

            <div className="alg-mastery-palette-grid">
                {questionSet.map((_, i) => {
                    const isAnswered = isAnswerComplete(questionSet[i], answers[i]);
                    const isCurrent = current === i;
                    return (
                        <button
                            key={i}
                            className={`alg-mastery-palette-item ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}`}
                            onClick={() => {
                                setCurrent(i);
                                setPaletteOpen(false);
                            }}
                        >
                            {i + 1}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={handleSubmit}
                style={{
                    marginTop: '2rem',
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer'
                }}
            >
                Submit Test
            </button>
        </div>
    );

    return (
        <div className="alg-mastery-container" ref={containerRef}>
            {!isFullScreen && !finished && (
                <div className="vs-overlay">
                    <div className="vs-modal">
                        <div className="vs-icon" style={{ background: '#eef2ff', color: '#4f46e5' }}>
                            <Monitor size={40} />
                        </div>
                        <h3 className="vs-title">Fullscreen Required</h3>
                        <p className="vs-text">
                            This assessment must be taken in fullscreen mode to ensure a fair testing environment.
                        </p>
                        <button className="fullscreen-promo" onClick={enterFullScreen}>
                            Enter Fullscreen to Start
                        </button>
                    </div>
                </div>
            )}

            {showViolationModal && !finished && violations < 3 && (
                <div className="vs-overlay">
                    <div className="vs-modal">
                        <div className="vs-icon">
                            <AlertTriangle size={40} />
                        </div>
                        <h3 className="vs-title">Violation Detected!</h3>
                        <p className="vs-text">
                            Switching tabs or windows is not allowed during this test.
                            Your activity has been logged.
                        </p>
                        <div className="vs-count">
                            Violation {violations} of 3
                        </div>
                        <button
                            className="alg-mastery-btn alg-mastery-btn-primary"
                            style={{ width: '100%' }}
                            onClick={() => setShowViolationModal(false)}
                        >
                            Return to Test
                        </button>
                    </div>
                </div>
            )}

            {paletteOpen && <div className="alg-mastery-backdrop" onClick={() => setPaletteOpen(false)} />}

            <div className="alg-mastery-main" ref={topRef}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 }}>{title}</h3>
                        <div className={`timer-display ${timeLeft < 60 ? 'timer-critical' : timeLeft < 300 ? 'timer-warning' : ''}`}>
                            <span style={{ opacity: 0.7 }}>Time Left:</span> {formatTime(timeLeft)}
                        </div>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color }}>Q{current + 1} / {questionSet.length}</div>
                </div>

                <div className="alg-mastery-card">
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#334155', lineHeight: '1.6', marginBottom: '30px' }}>
                        <MathRenderer text={q.question} />
                    </div>

                    {getQuestionType(q) === 'mcq' ? (
                        <div style={{ display: 'grid', gap: '12px' }}>
                            {q.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    style={{
                                        padding: '16px 20px',
                                        borderRadius: '16px',
                                        border: `2px solid ${answers[current] === i ? color : '#f1f5f9'}`,
                                        background: answers[current] === i ? `${color}08` : '#fff',
                                        textAlign: 'left',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <MathRenderer text={opt} />
                                </button>
                            ))}
                        </div>
                    ) : (
                        q.format === 'fraction' ? (
                            <div className="fraction-container">
                                <div className="fraction-input-wrapper">
                                    <input
                                        className="fraction-box"
                                        type="text"
                                        value={answers[current]?.split('/')[0] || ''}
                                        onChange={(e) => {
                                            const parts = (answers[current] || '/').split('/');
                                            handleTextChange(`${e.target.value}/${parts[1] || ''}`);
                                        }}
                                        placeholder="Num"
                                    />
                                    <div className="fraction-line" />
                                    <input
                                        className="fraction-box"
                                        type="text"
                                        value={answers[current]?.split('/')[1] || ''}
                                        onChange={(e) => {
                                            const parts = (answers[current] || '/').split('/');
                                            handleTextChange(`${parts[0] || ''}/${e.target.value}`);
                                        }}
                                        placeholder="Den"
                                    />
                                </div>
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={answers[current] || ''}
                                onChange={(e) => handleTextChange(e.target.value)}
                                placeholder="Type your answer here..."
                                style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: `2px solid ${answers[current] ? color : '#f1f5f9'}`, fontSize: '16px', outline: 'none' }}
                            />
                        )
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <button
                        disabled={current === 0}
                        onClick={() => setCurrent(prev => prev - 1)}
                        className="alg-mastery-btn alg-mastery-btn-back"
                        style={{ opacity: current === 0 ? 0.5 : 1, cursor: current === 0 ? 'not-allowed' : 'pointer', flex: 1 }}
                    >
                        Previous
                    </button>
                    {current === questionSet.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            className="alg-mastery-btn"
                            style={{ background: '#ef4444', color: '#fff', flex: 1 }}
                        >
                            Final Submit
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrent(prev => prev + 1)}
                            className="alg-mastery-btn alg-mastery-btn-primary"
                            style={{ flex: 1 }}
                        >
                            Next Question
                        </button>
                    )}
                </div>
            </div>

            <PaletteContent />

            <button className="alg-mastery-mobile-toggle" onClick={() => setPaletteOpen(true)}>
                <LayoutGrid size={24} />
            </button>
        </div>
    );
}

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

/**
 * QuizEngine — reusable embedded quiz component.
 *
 * Props
 * ─────────────────────────────────────────────────────
 * questions   : Array<{ id, text, options, correctAnswer, solution, hints? }>
 * skillId     : number
 * skillName   : string
 * onComplete  : (score, total) => void
 * embedded    : boolean (true)  — if true, doesn't show header/footer chrome
 * mastery     : number (0.8)    — fraction needed to pass
 */
const QuizEngine = ({
    questions: questionsProp = [],
    skillId,
    skillName = '',
    onComplete,
    embedded = true,
    mastery = 0.8,
}) => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [answers, setAnswers] = useState({});
    const [hintIndex, setHintIndex] = useState(-1);
    const [showResult, setShowResult] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);

    // Session logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const CORRECT_MESSAGES = ['Good job!', 'Excellent!', 'Perfect!', 'Well done!'];

    useEffect(() => {
        if (questionsProp.length > 0) {
            // Shuffle options for each question while keeping correctAnswer reference
            const qs = questionsProp.map((q) => ({
                ...q,
                options: [...q.options].sort(() => Math.random() - 0.5),
            }));
            setQuestions(qs);
        }
    }, [questionsProp]);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId && skillId) {
            api.createPracticeSession(userId, skillId).then((sess) => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(() => { });
        }
        const timer = setInterval(() => setTimeElapsed((p) => p + 1), 1000);
        return () => clearInterval(timer);
    }, [skillId]);

    // Restore state when qIndex changes
    useEffect(() => {
        const savedAnswer = answers[qIndex];
        if (savedAnswer) {
            setSelectedOption(savedAnswer.selectedOption);
            setIsCorrect(savedAnswer.isCorrect);
            setIsSubmitted(true);
        } else {
            setSelectedOption(null);
            setIsCorrect(false);
            setIsSubmitted(false);
        }
        setHintIndex(-1);
    }, [qIndex, answers]);

    // Separate effect for modal
    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCheck = () => {
        if (!selectedOption) return;
        const currentQ = questions[qIndex];
        const isRight = selectedOption === currentQ.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }
        setAnswers((prev) => ({
            ...prev,
            [qIndex]: { selectedOption, isCorrect: isRight },
        }));

        // Log attempt
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && skillId) {
            let t = accumulatedTime.current;
            if (isTabActive.current) t += Date.now() - questionStartTime.current;
            const sec = Math.max(0, Math.round(t / 1000));
            api.recordAttempt({
                user_id: parseInt(userId),
                session_id: sessionId,
                skill_id: skillId,
                template_id: currentQ.template_id || null,
                difficulty_level: currentQ.difficulty || 'Medium',
                question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer,
                student_answer: selectedOption,
                is_correct: isRight,
                solution_text: currentQ.solution || 'No detailed explanation available.',
                time_spent_seconds: sec,
            }).catch(console.error);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex((prev) => prev - 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        }
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex((p) => p + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            // Quiz complete
            const totalCorrect = Object.values(answers).filter((val) => val.isCorrect).length;
            if (sessionId) await api.finishSession(sessionId).catch(console.error);

            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId && skillId) {
                await api.createReport({
                    title: skillName,
                    type: 'practice',
                    score: (totalCorrect / questions.length) * 100,
                    parameters: {
                        skill_id: skillId,
                        skill_name: skillName,
                        total_questions: questions.length,
                        correct_answers: totalCorrect,
                        timestamp: new Date().toISOString(),
                        time_taken_seconds: timeElapsed,
                    },
                    user_id: parseInt(userId, 10),
                }).catch(console.error);
            }

            if (onComplete) {
                onComplete(totalCorrect, questions.length);
            }
            setShowResult(true);
        }
    };

    const showHint = () => {
        const currentQ = questions[qIndex];
        const hints = currentQ.hints || [];
        if (hintIndex < hints.length - 1) {
            setHintIndex((prev) => prev + 1);
        }
    };

    if (questions.length === 0) return <div style={{ padding: 20, textAlign: 'center', color: '#94a3b8' }}>Loading questions...</div>;

    // Result screen
    if (showResult) {
        const totalCorrect = Object.values(answers).filter((val) => val.isCorrect).length;
        const passed = totalCorrect / questions.length >= mastery;
        return (
            <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                maxWidth: 500,
                margin: '0 auto',
            }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>{passed ? '🏆' : '📝'}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#31326F', marginBottom: 8 }}>
                    {passed ? 'Mastery Achieved!' : 'Keep Practicing!'}
                </h3>
                <p style={{ color: '#64748b', marginBottom: 16 }}>
                    You got <strong>{totalCorrect}</strong> out of <strong>{questions.length}</strong> correct
                    ({Math.round((totalCorrect / questions.length) * 100)}%)
                </p>
                <div style={{
                    height: 8,
                    background: '#E2E8F0',
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginBottom: 24,
                }}>
                    <div style={{
                        width: `${(totalCorrect / questions.length) * 100}%`,
                        height: '100%',
                        background: passed ? 'linear-gradient(90deg, #10B981, #059669)' : 'linear-gradient(90deg, #F59E0B, #D97706)',
                        borderRadius: 4,
                        transition: 'width 1s ease',
                    }} />
                </div>
                {!passed && (
                    <button
                        onClick={() => {
                            setAnswers({});
                            setQIndex(0);
                            setShowResult(false);
                        }}
                        style={{
                            padding: '12px 32px',
                            borderRadius: 12,
                            background: '#4F46E5',
                            color: '#fff',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                        }}
                    >
                        Try Again
                    </button>
                )}
                {passed && (
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 20px',
                        borderRadius: 12,
                        background: '#D1FAE5',
                        color: '#065F46',
                        fontWeight: 700,
                    }}>
                        ✓ Checkpoint Complete
                    </div>
                )}
            </div>
        );
    }

    const currentQuestion = questions[qIndex];
    const currentHints = currentQuestion.hints || [];

    return (
        <div style={{ width: '100%' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
                padding: '0 4px',
            }}>
                <div style={{
                    background: '#EEF2FF',
                    padding: '6px 16px',
                    borderRadius: 20,
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: '#4F46E5',
                }}>
                    Question {qIndex + 1} / {questions.length}
                </div>
                <div style={{
                    background: '#F8FAFC',
                    padding: '6px 14px',
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: '#64748b',
                    border: '1.5px solid #E2E8F0',
                }}>
                    {formatTime(timeElapsed)}
                </div>
            </div>

            {/* Question */}
            <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '24px',
                border: '2px solid #E2E8F0',
                marginBottom: 16,
            }}>
                <h3 style={{
                    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                    fontWeight: 500,
                    color: '#2D3748',
                    lineHeight: 1.6,
                    marginBottom: 20,
                }}>
                    <LatexText text={currentQuestion.text} />
                </h3>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {currentQuestion.options.map((option, idx) => {
                        let bg = '#F8FAFC';
                        let border = '#E2E8F0';
                        let color = '#2D3748';
                        if (selectedOption === option && !isSubmitted) {
                            bg = '#EEF2FF';
                            border = '#818CF8';
                        }
                        if (isSubmitted && option === currentQuestion.correctAnswer) {
                            bg = '#D1FAE5';
                            border = '#10B981';
                            color = '#065F46';
                        }
                        if (isSubmitted && selectedOption === option && !isCorrect) {
                            bg = '#FEE2E2';
                            border = '#EF4444';
                            color = '#991B1B';
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => !isSubmitted && setSelectedOption(option)}
                                disabled={isSubmitted}
                                style={{
                                    padding: '14px 18px',
                                    borderRadius: 12,
                                    background: bg,
                                    border: `2px solid ${border}`,
                                    color,
                                    fontWeight: 500,
                                    fontSize: '1rem',
                                    textAlign: 'left',
                                    cursor: isSubmitted ? 'default' : 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <LatexText text={option} />
                            </button>
                        );
                    })}
                </div>

                {/* Correct feedback */}
                {isSubmitted && isCorrect && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            marginTop: 16,
                            padding: '10px 16px',
                            borderRadius: 12,
                            background: '#D1FAE5',
                            color: '#065F46',
                            fontWeight: 700,
                            textAlign: 'center',
                        }}
                    >
                        {feedbackMessage}
                    </motion.div>
                )}

                {/* Hints */}
                {!isSubmitted && currentHints.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                        <button
                            onClick={showHint}
                            disabled={hintIndex >= currentHints.length - 1}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                padding: '8px 16px',
                                borderRadius: 10,
                                background: '#FFFBEB',
                                border: '1.5px solid #FDE68A',
                                color: '#92400E',
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                cursor: hintIndex >= currentHints.length - 1 ? 'default' : 'pointer',
                                opacity: hintIndex >= currentHints.length - 1 ? 0.5 : 1,
                            }}
                        >
                            <Lightbulb size={16} /> Hint ({hintIndex + 1}/{currentHints.length})
                        </button>
                        {hintIndex >= 0 && (
                            <div style={{
                                marginTop: 8,
                                padding: '10px 14px',
                                borderRadius: 10,
                                background: '#FFFBEB',
                                border: '1px solid #FDE68A',
                                fontSize: '0.9rem',
                                color: '#78350F',
                            }}>
                                {currentHints.slice(0, hintIndex + 1).map((hint, i) => (
                                    <div key={i} style={{ marginBottom: i < hintIndex ? 6 : 0 }}>
                                        <LatexText text={hint} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <button
                    onClick={handlePrevious}
                    disabled={qIndex === 0}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '10px 18px',
                        borderRadius: 12,
                        background: qIndex === 0 ? '#F1F5F9' : '#E2E8F0',
                        color: qIndex === 0 ? '#CBD5E1' : '#475569',
                        fontWeight: 700,
                        border: 'none',
                        cursor: qIndex === 0 ? 'default' : 'pointer',
                        fontSize: '0.95rem',
                    }}
                >
                    <ChevronLeft size={20} /> Prev
                </button>

                <div style={{ display: 'flex', gap: 10 }}>
                    {isSubmitted && (
                        <button
                            onClick={() => setShowExplanationModal(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                padding: '10px 18px',
                                borderRadius: 12,
                                background: '#EEF2FF',
                                color: '#4F46E5',
                                fontWeight: 700,
                                border: '2px solid #C7D2FE',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                            }}
                        >
                            <Eye size={18} /> Explain
                        </button>
                    )}

                    {isSubmitted ? (
                        <button
                            onClick={handleNext}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                padding: '10px 24px',
                                borderRadius: 12,
                                background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                                color: '#fff',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                            }}
                        >
                            {qIndex === questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={handleCheck}
                            disabled={!selectedOption}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                padding: '10px 24px',
                                borderRadius: 12,
                                background: selectedOption ? 'linear-gradient(135deg, #6366F1, #4F46E5)' : '#E2E8F0',
                                color: selectedOption ? '#fff' : '#94a3b8',
                                fontWeight: 700,
                                border: 'none',
                                cursor: selectedOption ? 'pointer' : 'default',
                                fontSize: '0.95rem',
                            }}
                        >
                            Submit <Check size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Explanation Modal */}
            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
            />
        </div>
    );
};

export default React.memo(QuizEngine);

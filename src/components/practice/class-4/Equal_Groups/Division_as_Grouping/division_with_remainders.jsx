import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, AlertCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Remainder master! ✨",
    "🌟 Perfect leftovers! 🌟",
    "🎉 Division dynamo! 🎉",
    "✨ Exact calculation! ✨",
    "🚀 Super solving! 🚀",
    "🌿 Excellent! 🌿",
    "🎊 Correct! 🎊",
    "💎 Spot on! 💎"
];

// Visual component showing groups and leftovers
const RemainderVisual = ({ totalItems, groupSize, groups, remainder }) => {
    return (
        <div className="flex flex-col items-center my-6">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
                {Array.from({ length: groups }).map((_, g) => (
                    <div key={g} className="relative w-20 h-20 border-4 border-green-300 rounded-xl flex flex-wrap content-center justify-center p-1 bg-green-50 gap-1">
                        {Array.from({ length: groupSize }).map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-green-500 rounded-full"></div>
                        ))}
                    </div>
                ))}
            </div>

            {remainder > 0 && (
                <div className="flex flex-col items-center p-4 bg-red-50 rounded-xl border-2 border-dashed border-red-300">
                    <span className="text-sm font-bold text-red-400 mb-2">Remainder (Left Over)</span>
                    <div className="flex gap-2">
                        {Array.from({ length: remainder }).map((_, r) => (
                            <div key={r} className="w-6 h-6 bg-red-400 rounded-full animate-pulse"></div>
                        ))}
                    </div>
                    <span className="text-lg font-bold text-red-500 mt-1">{remainder}</span>
                </div>
            )}

            {remainder === 0 && (
                <div className="text-green-600 font-bold bg-green-50 px-4 py-2 rounded-lg">
                    Fits perfectly! No remainder.
                </div>
            )}
        </div>
    );
};

const DivisionWithRemainders = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1154;
    const SKILL_NAME = "Equal Groups - Division with Remainders";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        const questions = [];

        while (questions.length < TOTAL_QUESTIONS) {
            const index = questions.length;
            let q = {};

            // Easy: Visual provided, simple remainders
            if (index < 3) {
                const groupSize = randomInt(2, 4);
                const groups = randomInt(2, 4);
                const remainder = randomInt(1, groupSize - 1);
                const total = groups * groupSize + remainder;

                q = {
                    text: `Divide <strong>${total}</strong> into groups of <strong>${groupSize}</strong>.<br/>How many are left over (remainder)?`,
                    correctAnswer: remainder.toString(),
                    solution: `$${groups}$ groups of $${groupSize}$ makes $${groups * groupSize}$.<br/>$${total} - ${groups * groupSize} = ${remainder}$ left over.`,
                    type: 'find_remainder',
                    visualData: { total, groupSize, groups, remainder }
                };

                const opts = new Set([remainder.toString()]);
                opts.add((remainder + 1).toString());
                opts.add('0');
                opts.add((groupSize - 1).toString());
                opts.add((groupSize).toString()); // Can't be group size
                // Filter impossible remainders (>= group size)
                let validOpts = [...opts].filter(o => parseInt(o) < groupSize || o === remainder.toString());
                if (validOpts.length < 2) validOpts.push('0');

                q.shuffledOptions = validOpts.sort(() => Math.random() - 0.5);

            }
            // Medium: Calculate quotient and remainder
            else if (index < 6) {
                const groupSize = randomInt(3, 6);
                const groups = randomInt(3, 6);
                const remainder = randomInt(1, groupSize - 1);
                const total = groups * groupSize + remainder;

                // Format: "X R Y"
                const correctStr = `${groups} R ${remainder}`;

                q = {
                    text: `Solve: $${total} \\div ${groupSize} = ?$`,
                    correctAnswer: correctStr,
                    solution: `$${groupSize} \\times ${groups} = ${groups * groupSize}$.<br/>$${total} - ${groups * groupSize} = ${remainder}$.<br/>Answer: ${groups} Remainder ${remainder}.`,
                    type: 'quotient_remainder',
                    visualData: { total, groupSize, groups, remainder } // For feedback visual
                };

                const opts = new Set([correctStr]);
                opts.add(`${groups} R ${remainder + 1}`);
                opts.add(`${groups + 1} R ${remainder}`);
                opts.add(`${groups} R 0`);
                q.shuffledOptions = [...opts].sort(() => Math.random() - 0.5);
            }
            // Hard: Word problems or larger numbers
            else {
                const groupSize = randomInt(4, 9);
                const groups = randomInt(4, 8);
                const remainder = randomInt(1, groupSize - 1);
                const total = groups * groupSize + remainder;
                const items = ['cookies', 'balls', 'students', 'chairs'][randomInt(0, 3)];
                const container = ['jars', 'boxes', 'teams', 'rows'][randomInt(0, 3)];

                q = {
                    text: `There are <strong>${total} ${items}</strong>.<br/>We put <strong>${groupSize}</strong> in each ${container}.<br/>How many ${items} are left over?`,
                    correctAnswer: remainder.toString(),
                    solution: `We can fill $${groups}$ ${container}.<br/>$${groups} \\times ${groupSize} = ${groups * groupSize}$.<br/>$${total} - ${groups * groupSize} = ${remainder}$ left over.`,
                    type: 'word_remainder',
                    visualData: { total, groupSize, groups, remainder }
                };

                const opts = new Set([remainder.toString()]);
                opts.add((remainder + 1).toString());
                opts.add('0');
                opts.add((groupSize - 1).toString());
                q.shuffledOptions = [...opts].sort(() => Math.random() - 0.5);
            }

            questions.push(q);
        }

        setSessionQuestions(questions);
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const qData = sessionQuestions[qIndex];
            setCurrentQuestion(qData);
            setShuffledOptions(qData.shuffledOptions);
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setSelectedOption(previousAnswer.selected);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setSelectedOption(null);
                setIsSubmitted(false);
                setIsCorrect(false);
            }
        }
    }, [qIndex, sessionQuestions]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) {
            timeSpent += Date.now() - questionStartTime.current;
        }
        const seconds = Math.round(timeSpent / 1000);

        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                template_id: null,
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
                question_text: String(question.text || ''),
                correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''),
                is_correct: isCorrect,
                solution_text: String(question.solution || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) {
            console.error("Failed to record attempt", e);
        }
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
                try {
                    await api.createReport({
                        title: SKILL_NAME,
                        type: 'practice',
                        score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: {
                            skill_id: SKILL_ID,
                            skill_name: SKILL_NAME,
                            total_questions: TOTAL_QUESTIONS,
                            correct_answers: totalCorrect,
                            timestamp: new Date().toISOString(),
                            time_taken_seconds: timeElapsed
                        },
                        user_id: parseInt(userId, 10)
                    });
                } catch (err) {
                    console.error("Failed to create report", err);
                }
            }
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            setShowResults(true);
        }
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
    };

    const stats = (() => {
        let correct = 0;
        const total = Object.keys(answers).length;
        Object.values(answers).forEach(ans => {
            if (ans.isCorrect) correct++;
        });
        return { correct, total: TOTAL_QUESTIONS };
    })();

    if (!currentQuestion && !showResults) return <div>Loading...</div>;

    if (showResults) {
        const score = stats.correct;
        const total = stats.total;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm"
                    >
                        Back to Topics
                    </button>
                    <div className="sun-timer-container">
                        <div className="sun-timer">
                            <div className="sun-rays"></div>
                            <span className="timer-text">Done!</span>
                        </div>
                    </div>
                    <div className="title-area">
                        <h1 className="results-title">Remainder Master!</h1>
                    </div>
                </header>

                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-2">Adventure Complete! 🎉</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}
                                >
                                    <Star
                                        size={60}
                                        fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"}
                                        color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"}
                                    />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Score</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}/{total}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span>
                                <span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left hidden md:block">
                    {/* Back button */}
                    <button
                        className="bg-white/90 backdrop-blur-md p-3 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] shadow-md hover:bg-gray-50 transition-all"
                        onClick={async () => {
                            if (sessionId) await api.finishSession(sessionId).catch(console.error);
                            navigate(-1);
                        }}
                    >
                        <ChevronLeft size={24} strokeWidth={3} />
                    </button>
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>

                {/* Mobile Top Left Back Button - Static Flex Item to push Timer to Right */}
                <button
                    className="mobile-back-btn p-2 bg-white/90 rounded-xl text-[#31326F] shadow-sm border-2 border-[#4FB7B3]/30 md:hidden mr-auto"
                    onClick={async () => {
                        if (sessionId) await api.finishSession(sessionId).catch(console.error);
                        navigate(-1);
                    }}
                >
                    <ChevronLeft size={24} strokeWidth={3} />
                </button>

                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '900px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '2rem', fontWeight: '600', textAlign: 'center' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>

                                        {/* Visual Aid */}
                                        {currentQuestion.visualData && (
                                            <RemainderVisual
                                                totalItems={currentQuestion.visualData.total}
                                                groupSize={currentQuestion.visualData.groupSize}
                                                groups={currentQuestion.visualData.groups}
                                                remainder={currentQuestion.visualData.remainder}
                                            />
                                        )}
                                    </div>

                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                        } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''
                                                        }`}
                                                    onClick={() => handleOptionSelect(option)}
                                                    disabled={isSubmitted}
                                                >
                                                    <LatexContent html={option} />
                                                </button>
                                            ))}
                                        </div>
                                        {isSubmitted && isCorrect && (
                                            <motion.div
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="feedback-mini correct"
                                                style={{ marginTop: '20px' }}
                                            >
                                                {feedbackMessage}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"></div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Explanation
                            </button>
                        )}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && (
                                <button className="nav-pill-next-btn" onClick={handlePrevious}>
                                    <ChevronLeft size={28} strokeWidth={3} /> Previous
                                </button>
                            )}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Footer Controls */}
                <div className="mobile-footer-controls">
                    {/* Left: Exit Button */}
                    <div className="mobile-footer-left">
                        <button
                            className="nav-pill-next-btn"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                            style={{
                                background: '#FFF5F5',
                                color: '#E53E3E',
                                border: '1px solid #FECACA',
                                padding: '0.5rem 1rem',
                                fontSize: '0.8rem',
                                gap: '6px',
                                boxShadow: 'none'
                            }}
                        >
                            <X size={18} strokeWidth={3} /> Exit
                        </button>
                    </div>

                    {/* Right: Navigation */}
                    <div className="mobile-footer-right">
                        <div className="nav-buttons-group">
                            {/* Previous Button (Text + Icon) */}
                            {qIndex > 0 && (
                                <button
                                    className="nav-pill-next-btn"
                                    onClick={handlePrevious}
                                    style={{
                                        background: '#F1F5F9',
                                        color: '#475569',
                                        boxShadow: 'none',
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.8rem',
                                        gap: '6px'
                                    }}
                                >
                                    <ChevronLeft size={18} strokeWidth={3} /> Previous
                                </button>
                            )}

                            {/* Explain Button */}
                            {isSubmitted && (
                                <button className="footer-icon-btn explain-btn" onClick={() => setShowExplanationModal(true)} style={{ width: 'auto', padding: '0 1rem', fontSize: '0.8rem', gap: '4px' }}>
                                    <Eye size={20} /> Explain
                                </button>
                            )}

                            {/* Next/Submit Button */}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={20} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={20} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={20} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DivisionWithRemainders;

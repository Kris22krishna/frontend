import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ You spotted the pattern! ✨",
    "🌟 Pattern master! 🌟",
    "🎉 Digits detected! 🎉",
    "✨ Great prediction! ✨",
    "🚀 Super! You know the rule! 🚀",
    "🌿 Excellent observation! 🌿",
    "🎊 Correct! 🎊",
    "💎 Spot on! 💎"
];

// Visual Pattern Component
const PatternVisual = ({ baseDigit }) => {
    const examples = [baseDigit, baseDigit + 10, baseDigit + 20];
    const doubles = examples.map(n => n * 2);

    return (
        <div className="flex flex-col items-center gap-2 my-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Pattern Board</h3>
            {examples.map((num, i) => (
                <div key={i} className="flex items-center gap-4 text-lg sm:text-2xl font-medium text-gray-600">
                    <div className="w-16 text-right">
                        <span>{Math.floor(num / 10) > 0 ? Math.floor(num / 10) : ''}</span>
                        <span className="font-bold text-blue-600">{num % 10}</span>
                    </div>
                    <ArrowRight size={20} className="text-gray-400" />
                    <div className="w-16 text-left">
                        <span>{Math.floor(doubles[i] / 10)}</span>
                        <span className="font-bold text-green-600">{doubles[i] % 10}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

const DoublingOnesDigitPatterns = () => {
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
    const SKILL_ID = 1148;
    const SKILL_NAME = "Equal Groups - Doubling Ones Digit Patterns";
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
            const onesDigit = randomInt(0, 9);
            const doubledLastDigit = (onesDigit * 2) % 10;

            // Easy: Show pattern, ask for next in series
            if (index < 3) {
                const base = onesDigit + 30; // 30+ range to force pattern thinking not just mem
                const doubleBase = base * 2.5; // nonsense

                q = {
                    text: `Double of ${onesDigit} is ${onesDigit * 2}.<br/>Double of ${onesDigit + 10} ends in ${doubledLastDigit}.<br/>What does <strong>double of ${onesDigit + 20}</strong> end with?`,
                    correctAnswer: doubledLastDigit.toString(),
                    solution: `The pattern depends only on the ones digit.<br/>Since the number ends in ${onesDigit}, its double will always end in ${doubledLastDigit}.`,
                    type: 'pattern_visual',
                    visualData: { baseDigit: onesDigit }
                };

                const opts = new Set([doubledLastDigit.toString()]);
                opts.add(((doubledLastDigit + 2) % 10).toString());
                opts.add(((doubledLastDigit + 5) % 10).toString());
                opts.add(((doubledLastDigit + 8) % 10).toString());
                q.shuffledOptions = [...opts].sort(() => Math.random() - 0.5);

            }
            // Medium: "If a number ends in X, double ends in..."
            else if (index < 6) {
                q = {
                    text: `If a number ends in <strong>${onesDigit}</strong>,<br/>what is the last digit of its double?`,
                    correctAnswer: doubledLastDigit.toString(),
                    solution: `Think of $${onesDigit} \\times 2 = ${onesDigit * 2}$.<br/>The last digit is ${doubledLastDigit}.`,
                    type: 'rule'
                };

                const opts = new Set([doubledLastDigit.toString()]);
                opts.add(((doubledLastDigit + 1) % 10).toString());
                opts.add(((doubledLastDigit + 9) % 10).toString()); // -1
                opts.add(((doubledLastDigit + 5) % 10).toString());
                q.shuffledOptions = [...opts].sort(() => Math.random() - 0.5);
            }
            // Hard: Reverse prediction or Large number
            else {
                const bigNum = randomInt(50, 99);
                const last = bigNum % 10;
                const dList = (last * 2) % 10;

                const isReverse = Math.random() > 0.5;

                if (isReverse) {
                    // "Double of a number ends in 0. What could the number end with?"
                    // Answers: 0 or 5.
                    // Let's stick to predicting the end digit for now to avoid multiple correct answers complexity in this specific UI layout if we only allow single select.
                    // Or we change question: "Double of 58 ends in...?"
                    q = {
                        text: `Without calculating the whole number,<br/>what is the <strong>ones digit</strong> of double ${bigNum}?`,
                        correctAnswer: dList.toString(),
                        solution: `Focus on the ones digit: ${last}.<br/>Double of ${last} is ${last * 2}.<br/>The ones digit is ${dList}.`,
                        type: 'prediction'
                    };
                } else {
                    q = {
                        text: `Which of these numbers, when doubled, will end in a <strong>${dList}</strong>?`,
                        // We need to find options where only ONE doubles to end in dList.
                        // Wait, doubling is not 1-to-1 mapping for last digits (0->0, 5->0).
                        // If dList is 0, source could be 0 or 5.
                        // Construct options strictly.
                        correctAnswer: bigNum.toString(),
                        solution: `${bigNum} ends in ${last}. Double ${last} is ${last * 2}, which ends in ${dList}.`,
                        type: 'reverse_match'
                    };
                    // Generate distractors that DO NOT double to dList
                    const validLastDigits = [last];
                    if (last < 5) validLastDigits.push(last + 5);
                    else validLastDigits.push(last - 5);
                    // validLastDigits are the endings that produce dList.
                    // We must ensure distractors do NOT end in any validLastDigits.

                    const opts = [bigNum.toString()];
                    while (opts.length < 4) {
                        const r = randomInt(10, 99);
                        const rLast = r % 10;
                        if (!validLastDigits.includes(rLast)) {
                            opts.push(r.toString());
                        }
                    }
                    q.shuffledOptions = opts.sort(() => Math.random() - 0.5);
                }

                if (!q.shuffledOptions) { // Fallback if regular logic used
                    const opts = new Set([dList.toString()]);
                    while (opts.size < 4) opts.add(randomInt(0, 9).toString());
                    q.shuffledOptions = [...opts].sort(() => Math.random() - 0.5);
                }
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
                        <h1 className="results-title">Pattern Power!</h1>
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
                                            <PatternVisual
                                                baseDigit={currentQuestion.visualData.baseDigit}
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

export default DoublingOnesDigitPatterns;

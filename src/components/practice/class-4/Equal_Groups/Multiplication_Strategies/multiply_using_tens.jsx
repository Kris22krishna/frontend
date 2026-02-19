import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Box, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Tens terrific! ✨",
    "🌟 Place value pro! 🌟",
    "🎉 Zero hero! 🎉",
    "✨ Great multiplying! ✨",
    "🚀 Super! You got the tens! 🚀",
    "🌿 Excellent! 🌿",
    "🎊 Correct! 🎊",
    "💎 Spot on! 💎"
];

// Tens Block Component
const TensBlockVisual = ({ groups, tensPerGroup }) => {
    return (
        <div className="flex flex-wrap justify-center gap-8 my-6">
            {Array.from({ length: groups }).map((_, gIdx) => (
                <div key={gIdx} className="flex flex-col items-center p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                    <div className="flex gap-1">
                        {Array.from({ length: tensPerGroup }).map((_, tIdx) => (
                            <motion.div
                                key={`t-${gIdx}-${tIdx}`}
                                initial={{ height: 0 }}
                                animate={{ height: 60 }}
                                transition={{ delay: gIdx * 0.2 + tIdx * 0.1 }}
                                className="w-4 bg-orange-400 border border-orange-600 rounded-sm shadow-sm relative"
                                title="10"
                            >
                                {/* markings on the rod */}
                                {Array.from({ length: 9 }).map((__, k) => (
                                    <div key={k} className="absolute w-full h-px bg-orange-600/30" style={{ top: `${(k + 1) * 10}%` }}></div>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                    <span className="mt-2 text-sm font-bold text-orange-600">{tensPerGroup * 10}</span>
                </div>
            ))}
        </div>
    );
};

const MultiplyUsingTens = () => {
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
    const SKILL_ID = 1149;
    const SKILL_NAME = "Equal Groups - Multiply Using Tens";
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

            // Easy: Visual groups of 10s (e.g., 3 x 20)
            if (index < 3) {
                const groups = randomInt(2, 4);
                const tensPerGroup = randomInt(1, 3); // 10, 20, or 30
                const valPerGroup = tensPerGroup * 10;
                const total = groups * valPerGroup;
                const totalTens = groups * tensPerGroup;

                q = {
                    text: `How much is <strong>${groups} groups of ${valPerGroup}</strong>?`,
                    correctAnswer: total.toString(),
                    solution: `${groups} groups of ${tensPerGroup} tens = ${totalTens} tens.<br/>${totalTens} tens = ${total}.`,
                    type: 'visual_tens',
                    visualData: { groups, tensPerGroup }
                };

                const opts = new Set([total.toString()]);
                opts.add((total + 10).toString());
                opts.add((totalTens).toString()); // Common mistake: just writing the number of tens (e.g. "6") instead of "60"
                opts.add((groups * 10).toString());

                let optArray = [...opts].sort(() => Math.random() - 0.5);
                while (optArray.length < 4) {
                    const filler = parseInt(total) + (optArray.length * 10) + 20;
                    if (!optArray.includes(filler.toString())) {
                        optArray.push(filler.toString());
                    }
                }
                q.shuffledOptions = optArray.slice(0, 4).sort(() => Math.random() - 0.5);
            }
            // Medium: "Multiply the non-zeros and add 0" strategy
            else if (index < 6) {
                const a = randomInt(2, 5);
                const b = randomInt(2, 9);
                const tenMultiple = b * 10;
                const result = a * tenMultiple;

                q = {
                    text: `Solve: $${a} \\times ${tenMultiple} = ?$`,
                    correctAnswer: result.toString(),
                    solution: `First multiply $${a} \\times ${b} = ${a * b}$.<br/>Then add a trailing zero: $${result}$.`,
                    type: 'strategy'
                };

                const opts = new Set([result.toString()]);
                opts.add((a * b).toString()); // Forgot zero
                opts.add((result + 10).toString());
                opts.add((result * 10).toString()); // Too many zeros

                let optArray = [...opts].sort(() => Math.random() - 0.5);
                while (optArray.length < 4) {
                    const filler = parseInt(result) + (optArray.length * 10) + 5;
                    if (!optArray.includes(filler.toString())) {
                        optArray.push(filler.toString());
                    }
                }
                q.shuffledOptions = optArray.slice(0, 4).sort(() => Math.random() - 0.5);
            }
            // Hard: Word problems or larger numbers
            else {
                const scenarios = [
                    { t: "box of pencils", n: 20 },
                    { t: "bundle of sticks", n: 10 },
                    { t: "packet of biscuits", n: 30 },
                    { t: "class of students", n: 40 }
                ];
                const scenario = scenarios[randomInt(0, 3)];
                const qty = randomInt(3, 8);
                const total = qty * scenario.n;

                q = {
                    text: `There are <strong>${scenario.n}</strong> items in a ${scenario.t}.<br/>How many items are there in <strong>${qty}</strong> ${scenario.t}es?`,
                    correctAnswer: total.toString(),
                    solution: `$${qty} \\times ${scenario.n} = ${total}$`,
                    type: 'word_problem'
                };

                const opts = new Set([total.toString()]);
                opts.add((total + 10).toString());
                opts.add((qty * 10).toString());
                opts.add((scenario.n + qty).toString());

                let optArray = [...opts].sort(() => Math.random() - 0.5);
                while (optArray.length < 4) {
                    const filler = parseInt(total) + (optArray.length * 5) + 15;
                    if (!optArray.includes(filler.toString())) {
                        optArray.push(filler.toString());
                    }
                }
                q.shuffledOptions = optArray.slice(0, 4).sort(() => Math.random() - 0.5);
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
                        <h1 className="results-title">Tens Master!</h1>
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

                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>

                {/* Mobile Top Left Back Button - Static Flex Item to push Timer to Right */}
                <button
                    className="mobile-back-btn p-2 bg-white/90 rounded-xl text-[#31326F] shadow-sm border-2 border-[#4FB7B3]/30 md:hidden mr-auto relative z-50 order-first"
                    onClick={async () => {
                        if (sessionId) await api.finishSession(sessionId).catch(console.error);
                        navigate(-1);
                    }}
                    style={{ position: 'absolute', left: '1rem', top: '1rem' }}
                >
                    <ChevronLeft size={24} strokeWidth={3} />
                </button>
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
                                            <TensBlockVisual
                                                groups={currentQuestion.visualData.groups}
                                                tensPerGroup={currentQuestion.visualData.tensPerGroup}
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

export default MultiplyUsingTens;

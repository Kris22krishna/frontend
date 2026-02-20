import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨",
    "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const ComparingQuantitiesTest = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 34; // Placeholder for Chapter Test
    const SKILL_NAME = "Class 7 - Comparing Quantities - Chapter Test";
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const shuffle = (array) => {
                const unique = [...new Set(array)];
                return unique.sort(() => Math.random() - 0.5);
            };

            // Pool of question generator functions
            const generators = [
                // 1. Percentage Basics
                () => {
                    const T = [10, 20, 25, 50, 100][rand(0, 4)];
                    const P = rand(1, T - 1);
                    const pct = (P / T) * 100;
                    return {
                        type: "Percentage",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'><p>What is the percentage of ${P} out of ${T}?</p></div>`,
                        correctAnswer: `$${pct}\\%$`,
                        solution: `$$\\frac{${P}}{${T}} \\times 100\\% = ${pct}\\%$$`,
                        options: shuffle([`$${pct}\\%$`, `$${pct / 2}\\%$`, `$${100 - pct}\\%$`, `$${pct + 10}\\%$`])
                    };
                },
                // 2. Use of Percentages (Finding Whole)
                () => {
                    const pct = [10, 20, 25, 50][rand(0, 3)];
                    const whole = rand(2, 20) * 10;
                    const part = (pct / 100) * whole;
                    return {
                        type: "Use of Percentage",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'><p>If ${pct}% of a number is ${part}, what is the number?</p></div>`,
                        correctAnswer: `${whole}`,
                        solution: `Let the number be $x$.\n$$\\frac{${pct}}{100} \\times x = ${part}$$\n$$x = \\frac{${part} \\times 100}{${pct}} = ${whole}$$`,
                        options: shuffle([`${whole}`, `${whole + 10}`, `${whole * 2}`, `${whole / 2}`])
                    };
                },
                // 3. Profit and Loss
                () => {
                    const cp = rand(10, 50) * 10;
                    const profitPct = [10, 20, 25][rand(0, 2)];
                    const profit = (profitPct / 100) * cp;
                    const sp = cp + profit;
                    return {
                        type: "Profit and Loss",
                        difficulty_level: "Hard",
                        text: `<div class='question-container'><p>A man buys an item for $₹${cp}$ and sells it at a profit of $${profitPct}\\%$. Find the selling price.</p></div>`,
                        correctAnswer: `$₹${sp}$`,
                        solution: `Profit = $${profitPct}\\%$ of $${cp} = ₹${profit}$.\nSP = CP + Profit = $${cp} + ${profit} = ₹${sp}$.`,
                        options: shuffle([`$₹${sp}$`, `$₹${cp - profit}$`, `$₹${sp + 50}$`, `$₹${sp - 20}$`])
                    };
                },
                // 4. Simple Interest
                () => {
                    const p = rand(10, 50) * 100;
                    const r = [5, 10, 12, 15][rand(0, 3)];
                    const t = rand(1, 4);
                    const si = (p * r * t) / 100;
                    return {
                        type: "Simple Interest",
                        difficulty_level: "Hard",
                        text: `<div class='question-container'><p>Find the Simple Interest on $₹${p}$ at $${r}\\%$ per annum for $${t}$ years.</p></div>`,
                        correctAnswer: `$₹${si}$`,
                        solution: `$$SI = \\frac{P \\times R \\times T}{100} = \\frac{${p} \\times ${r} \\times ${t}}{100} = ₹${si}$$`,
                        options: shuffle([`$₹${si}$`, `$₹${si + 100}$`, `$₹${si - 50}$`, `$₹${p + si}$`])
                    };
                }
            ];

            for (let i = 0; i < 20; i++) {
                const generator = generators[rand(0, generators.length - 1)];
                newQuestions.push(generator());
            }
            setQuestions(newQuestions);
        };
        generateQuestions();
    }, []);

    useEffect(() => {
        if (isFinished) return;
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

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

        return () => {
            clearInterval(timer);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [sessionId, isFinished]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect, isSkipped = false) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) {
            timeSpent += Date.now() - questionStartTime.current;
        }
        const seconds = Math.max(0, Math.round(timeSpent / 1000));

        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                template_id: null,
                difficulty_level: question.difficulty_level || 'Medium',
                question_text: String(question.text || ''),
                correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''),
                is_correct: isCorrect,
                solution_text: String(question.solution || ''),
                time_spent_seconds: seconds
            });
        } catch (e) {
            console.error("Failed to record attempt", e);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
        }
    };

    const handleQuestionComplete = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const currentQuestion = questions[qIndex];

        const isRight = selectedOption === currentQuestion.correctAnswer;

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.max(0, Math.round(timeSpent / 1000));

        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: isRight, timeSpent: seconds, isSkipped: false } }));
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
        handleNext();
    };

    const handleSkip = () => {
        const currentQuestion = questions[qIndex];

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.max(0, Math.round(timeSpent / 1000));

        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption: 'Skipped', isCorrect: false, timeSpent: seconds, isSkipped: true } }));
        recordQuestionAttempt(currentQuestion, 'Skipped', false, true);
        handleNext();
    };

    useEffect(() => {
        setSelectedOption(null);
        setIsCorrect(false);
        setIsSubmitted(false);
    }, [qIndex]);

    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) {
                await api.finishSession(sessionId).catch(console.error);
            }

            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;

                try {
                    await api.createReport({
                        title: SKILL_NAME,
                        type: 'practice',
                        score: (totalCorrect / questions.length) * 100,
                        parameters: {
                            skill_id: SKILL_ID,
                            skill_name: SKILL_NAME,
                            total_questions: questions.length,
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
            setIsFinished(true);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (questions.length === 0) return <div>Loading...</div>;

    if (isFinished) {
        const attempted = Object.values(answers).filter(a => !a.isSkipped).length;
        const correct = Object.values(answers).filter(a => a.isCorrect).length;
        const wrong = attempted - correct;
        const skipped = Object.values(answers).filter(a => a.isSkipped).length;

        return (
            <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif', padding: '2rem', paddingBottom: '5rem', backgroundColor: '#F8FAFC', minHeight: '100vh', overflowY: 'auto' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#4FB7B3]/20 mb-8 mt-8">
                        <div className="text-center mb-8">
                            <img src={mascotImg} alt="Mascot" className="w-24 h-24 mx-auto mb-4 object-contain" />
                            <h2 className="text-3xl font-bold text-[#31326F] mb-2">Test Complete!</h2>
                            <p className="text-gray-500">Here's how you performed in {SKILL_NAME}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
                                <div className="text-blue-500 font-bold text-sm mb-1 uppercase tracking-wider">Total Time</div>
                                <div className="text-2xl font-black text-[#31326F]">{formatTime(timeElapsed)}</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-2xl text-center border border-green-100">
                                <div className="text-green-500 font-bold text-sm mb-1 uppercase tracking-wider">Correct</div>
                                <div className="text-2xl font-black text-[#31326F]">{correct}</div>
                            </div>
                            <div className="bg-red-50 p-4 rounded-2xl text-center border border-red-100">
                                <div className="text-red-500 font-bold text-sm mb-1 uppercase tracking-wider">Wrong</div>
                                <div className="text-2xl font-black text-[#31326F]">{wrong}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100">
                                <div className="text-gray-500 font-bold text-sm mb-1 uppercase tracking-wider">Skipped</div>
                                <div className="text-2xl font-black text-[#31326F]">{skipped}</div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-[#31326F] border-b pb-2">Detailed Report</h3>
                            {questions.map((q, idx) => {
                                const ans = answers[idx] || { isSkipped: true, selectedOption: 'Not Attempted', isCorrect: false, timeSpent: 0 };
                                return (
                                    <div key={idx} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-[#4FB7B3]/30 transition-all bg-white shadow-sm">
                                        <div className="flex justify-between items-start gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-full bg-[#31326F] text-white flex items-center justify-center font-bold text-sm">{idx + 1}</span>
                                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                                                    Time: {ans.timeSpent}s
                                                </div>
                                            </div>
                                            {ans.isSkipped ? (
                                                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-xs uppercase">Skipped</span>
                                            ) : ans.isCorrect ? (
                                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 font-bold text-xs uppercase">Correct</span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-bold text-xs uppercase">Incorrect</span>
                                            )}
                                        </div>
                                        <div className="text-[#31326F] mb-4 font-medium"><LatexContent html={q.text} /></div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                                            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                                                <span className="text-gray-400 block mb-1">Your Answer:</span>
                                                <span className={ans.isCorrect ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                                                    <LatexContent html={ans.selectedOption} />
                                                </span>
                                            </div>
                                            <div className="p-3 rounded-xl bg-green-50 border border-green-100">
                                                <span className="text-green-400 block mb-1">Correct Answer:</span>
                                                <span className="text-green-700 font-bold"><LatexContent html={q.correctAnswer} /></span>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 text-[#31326F] text-sm italic">
                                            <span className="font-bold block mb-1 not-italic text-amber-700">Explanation:</span>
                                            <LatexContent html={q.solution} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-10 flex justify-center">
                            <button className="bg-[#31326F] text-white px-12 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl" onClick={() => navigate(-1)}>Done</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Chapter Test: {qIndex + 1} / {questions.length}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}>
                                    <LatexContent html={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`}
                                            style={{ fontWeight: '500' }}
                                            onClick={() => setSelectedOption(option)}
                                        >
                                            <LatexContent html={option} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            Exit Test
                        </button>
                    </div>
                    <div className="bottom-center">
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-500 text-white border-2 border-gray-600" onClick={handleSkip}>
                                Skip <ChevronRight size={28} strokeWidth={3} />
                            </button>
                            <button className="nav-pill-next-btn" onClick={handleQuestionComplete} disabled={!selectedOption}>
                                {qIndex < questions.length - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button
                            className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-500 text-white p-2 border border-gray-600" onClick={handleSkip}>
                                Skip
                            </button>
                            <button className="nav-pill-next-btn" onClick={handleQuestionComplete} disabled={!selectedOption}>
                                {qIndex < questions.length - 1 ? "Next" : "Done"}
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ComparingQuantitiesTest;

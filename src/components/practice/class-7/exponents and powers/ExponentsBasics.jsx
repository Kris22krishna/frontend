import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
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

const ExponentsBasics = () => {
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
    const SKILL_ID = 30; // Placeholder
    const SKILL_NAME = "Class 7 - Exponents - Basics";
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const shuffle = (array) => {
                const unique = [...new Set(array)];
                return unique.sort(() => Math.random() - 0.5);
            };

            for (let i = 0; i < 10; i++) {
                let q = {};

                if (i < 2) {
                    // Subtopic 1: Writing numbers as powers
                    // e.g. 256 as power of 2, 81 as power of 3.
                    const base = rand(2, 5);
                    const exp = rand(2, 5);
                    const val = Math.pow(base, exp);
                    q = {
                        type: "Write as Power",
                        difficulty_level: "Easy",
                        text: `<div class='question-container'>
                                  <p>Express $${val}$ as a power of $${base}$.</p>
                               </div>`,
                        correctAnswer: `$${base}^{${exp}}$`,
                        solution: `$$${val} = ${Array(exp).fill(base).join('\\times ')} = ${base}^${exp}$$`,
                        options: shuffle([`$${base}^{${exp}}$`, `$${base}^{${exp + 1}}$`, `$${exp}^{${base}}$`, `$${base} \\times ${exp}$`])
                    };
                } else if (i < 4) {
                    // Subtopic 2: Base and exponent
                    const b = rand(2, 10);
                    const e = rand(2, 6);
                    const isAskBase = i === 2; // Q3 ask base, Q4 ask exponent
                    q = {
                        type: "Identify Base/Exponent",
                        difficulty_level: "Easy",
                        text: `<div class='question-container'>
                                  <p>In the expression $${b}^{${e}}$, what is the ${isAskBase ? 'base' : 'exponent'}?</p>
                               </div>`,
                        correctAnswer: `$${isAskBase ? b : e}$`,
                        solution: `In $a^n$, $a$ is the base and $n$ is the exponent.\nHere, base = $${b}$ and exponent = $${e}$.`,
                        options: shuffle([`$${b}$`, `$${e}$`, `$${b + e}$`, `$${b * e}$`])
                    };
                } else if (i < 5) {
                    // Subtopic 3: Expanding powers (Q5)
                    const v = ['a', 'b', 'x', 'y', '2', '3', '5'][rand(0, 6)];
                    const e = rand(3, 5);
                    const expanded = Array(e).fill(v).join(' \\times ');
                    q = {
                        type: "Expanding Powers",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'>
                                  <p>Expand $${v}^${e}$.</p>
                               </div>`,
                        correctAnswer: `$${expanded}$`,
                        solution: `$$${v}^${e} = ${expanded}$$`,
                        options: shuffle([`$${expanded}$`, `$${Array(e + 1).fill(v).join(' \\times ')}$`, `$${e} \\times ${v}$`, `$${v} + ${v} + ${v}$`])
                    };
                } else if (i < 6) {
                    // Subtopic 4: Comparing powers (Q6)
                    const b1 = rand(2, 3);
                    const e1 = rand(3, 4);
                    const b2 = rand(2, 3);
                    const e2 = rand(3, 4);
                    // ensure different values
                    if (b1 === b2 && e1 === e2) e2++;

                    const val1 = Math.pow(b1, e1);
                    const val2 = Math.pow(b2, e2);
                    const greater = val1 > val2 ? `$${b1}^{${e1}}$` : `$${b2}^{${e2}}$`;

                    q = {
                        type: "Comparing Powers",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'>
                                  <p>Which is greater: $${b1}^${e1}$ or $${b2}^${e2}$?</p>
                               </div>`,
                        correctAnswer: greater,
                        solution: `$$${b1}^${e1} = ${val1}$$\n$$${b2}^${e2} = ${val2}$$\nSince $${Math.max(val1, val2)} > ${Math.min(val1, val2)}$, $${greater}$ is greater.`,
                        options: shuffle([`$${b1}^{${e1}}$`, `$${b2}^{${e2}}$`, "Equal", "None"])
                    };
                } else if (i < 8) {
                    // Subtopic 5: Prime factor exponential form
                    const primes = [2, 3, 5];
                    const p1 = primes[rand(0, 1)];
                    const p2 = (p1 === 2) ? 3 : 2;
                    const c1 = rand(2, 4);
                    const c2 = rand(1, 2);
                    const num = Math.pow(p1, c1) * Math.pow(p2, c2);
                    // Consistent alphabetical order for answer? Usually small to large base
                    const sorted = (p1 < p2) ? `$${p1}^{${c1}} \\times ${p2}^{${c2}}$` : `$${p2}^{${c2}} \\times ${p1}^{${c1}}$`;

                    q = {
                        type: "Prime Factorization",
                        difficulty_level: "Hard",
                        text: `<div class='question-container'>
                                  <p>Express $${num}$ in prime factor exponential form.</p>
                               </div>`,
                        correctAnswer: sorted,
                        solution: `$$${num} = ${sorted}$$`,
                        options: shuffle([sorted, `$${p1}^{${c2}} \\times ${p2}^{${c1}}$`, `$${p1 * p2}^{${c1 + c2}}$`, `$${num ^ 1}$`])
                    };
                } else {
                    // Subtopic 6: Negative bases (Q9-10)
                    const b = rand(2, 5);
                    const e = rand(2, 5);
                    const val = Math.pow(-b, e);
                    q = {
                        type: "Negative Bases",
                        difficulty_level: "Hard",
                        text: `<div class='question-container'>
                                  <p>Find the value of $(${-b})^${e}$.</p>
                               </div>`,
                        correctAnswer: `$${val}$`,
                        solution: `Base is negative. Exponent is ${e % 2 === 0 ? 'even' : 'odd'}, so result is ${e % 2 === 0 ? 'positive' : 'negative'}.\n$$(${-b})^${e} = ${val}$$`,
                        options: shuffle([`$${val}$`, `$${-val}$`, `$${val + 1}$`, `$${Math.pow(b, e)}$`])
                    };
                }
                newQuestions.push(q);
            }
            setQuestions(newQuestions);
        };
        generateQuestions();
    }, []);

    useEffect(() => {
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
    }, [sessionId]);

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
                difficulty_level: question.difficulty_level || 'Medium',
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

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
        }
    };

    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const currentQuestion = questions[qIndex];

        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: isRight } }));
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

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
    }, [qIndex, answers]);

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
            navigate(-1);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (questions.length === 0) return <div>Loading...</div>;

    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {questions.length}
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
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                            style={{ fontWeight: '500' }}
                                            onClick={() => handleOptionSelect(option)}
                                            disabled={isSubmitted}
                                        >
                                            <LatexContent html={option} />
                                        </button>
                                    ))}
                                    {isSubmitted && isCorrect && (
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="feedback-mini correct"
                                            style={{ marginTop: '20px' }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src={mascotImg} alt="Mascot" className="w-12 h-12 object-contain" />
                                                <span>{feedbackMessage}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => { setShowExplanationModal(false); }}
            />

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
                            Exit Practice
                        </button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Explanation
                            </button>
                        )}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-600" onClick={handlePrevious} disabled={qIndex === 0}>
                                <ChevronLeft size={28} strokeWidth={3} /> Prev
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < questions.length - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
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
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2" onClick={handlePrevious} disabled={qIndex === 0}>
                                <ChevronLeft size={20} />
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < questions.length - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ExponentsBasics;

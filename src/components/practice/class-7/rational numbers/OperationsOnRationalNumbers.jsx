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

const OperationsOnRationalNumbers = () => {
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
    const SKILL_ID = 'local-rn-ops';
    const SKILL_NAME = "Class 7 - Rational Numbers - Operations";
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const shuffle = (array) => {
                const unique = [...new Set(array)];
                return unique.sort(() => Math.random() - 0.5);
            };
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

            for (let i = 0; i < 10; i++) {
                let q = {};
                // Topic 8: Operations on Rational Numbers
                // 8.1 ADDITION (Q0-Q2)
                // 8.2 SUBTRACTION (Q3-Q4)
                // 8.3 MULTIPLICATION (Q5-Q7)
                // 8.4 DIVISION (Q8-Q9)

                if (i < 3) {
                    // 8.1 Addition
                    if (i === 0) {
                        // Same denom
                        const n1 = 7, d = 3;
                        const n2 = -5;
                        q = {
                            type: "Add Same Denom",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Add: $\\frac{7}{3} + (\\frac{-5}{3})$</p>
                                   </div>`,
                            correctAnswer: `$\\frac{2}{3}$`,
                            solution: `$\\frac{7 + (-5)}{3} = \\frac{2}{3}$.`,
                            options: shuffle([`$\\frac{2}{3}$`, `$\\frac{12}{3}$`, `$\\frac{-2}{3}$`, `$\\frac{2}{6}$`])
                        };
                    } else if (i === 1) {
                        // Different denom
                        // Add: -7/5 + (-2/3)
                        q = {
                            type: "Add Diff Denom",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Add: $\\frac{-7}{5} + (\\frac{-2}{3})$</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-31}{15}$`,
                            solution: `LCM of 5 and 3 is 15. $\\frac{-7 \\times 3}{15} + \\frac{-2 \\times 5}{15} = \\frac{-21 - 10}{15} = \\frac{-31}{15}$.`,
                            options: shuffle([
                                `$\\frac{-31}{15}$`,
                                `$\\frac{-9}{8}$`,
                                `$\\frac{-31}{8}$`,
                                `$\\frac{9}{15}$`
                            ])
                        };
                    } else {
                        // Additive inverse
                        const n = rand(2, 5);
                        const d = rand(6, 9);
                        q = {
                            type: "Additive Inverse",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>What is the additive inverse of $\\frac{-${n}}{${d}}$?</p>
                                   </div>`,
                            correctAnswer: `$\\frac{${n}}{${d}}$`,
                            solution: `The additive inverse of a number $x$ is $-x$. So inverse of $\\frac{-${n}}{${d}}$ is $\\frac{${n}}{${d}}$.`,
                            options: shuffle([
                                `$\\frac{${n}}{${d}}$`,
                                `$\\frac{-${d}}{${n}}$`,
                                `$\\frac{${d}}{${n}}$`,
                                `$\\frac{-${n}}{${d}}$`
                            ])
                        };
                    }
                } else if (i < 5) {
                    // 8.2 Subtraction
                    if (i === 3) {
                        // Subtract: 5/7 - 3/8
                        q = {
                            type: "Subtract Diff Denom",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                       <p>Subtract: $\\frac{5}{7} - \\frac{3}{8}$</p>
                                    </div>`,
                            correctAnswer: `$\\frac{19}{56}$`,
                            solution: `LCM is 56. $\\frac{5 \\times 8}{56} - \\frac{3 \\times 7}{56} = \\frac{40 - 21}{56} = \\frac{19}{56}$.`,
                            options: shuffle([
                                `$\\frac{19}{56}$`,
                                `$\\frac{2}{56}$`,
                                `$\\frac{19}{1}$`,
                                `$\\frac{61}{56}$`
                            ])
                        };
                    } else {
                        // 2/7 - (-5/6)
                        q = {
                            type: "Subtract Neg",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                       <p>Evaluate: $\\frac{2}{7} - (\\frac{-5}{6})$</p>
                                    </div>`,
                            correctAnswer: `$\\frac{47}{42}$`,
                            solution: `Subtracting a negative is adding. $\\frac{2}{7} + \\frac{5}{6}$. LCM 42. $\\frac{12 + 35}{42} = \\frac{47}{42}$.`,
                            options: shuffle([
                                `$\\frac{47}{42}$`,
                                `$\\frac{-23}{42}$`,
                                `$\\frac{-3}{1}$`,
                                `$\\frac{7}{13}$`
                            ])
                        };
                    }
                } else if (i < 8) {
                    // 8.3 Multiplication
                    if (i === 5) {
                        // -3/5 * 2
                        q = {
                            type: "Mult Integer",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                       <p>Multiply: $\\frac{-3}{5} \\times 2$</p>
                                    </div>`,
                            correctAnswer: `$\\frac{-6}{5}$`,
                            solution: `$\\frac{-3}{5} \\times \\frac{2}{1} = \\frac{-3 \\times 2}{5 \\times 1} = \\frac{-6}{5}$.`,
                            options: shuffle([
                                `$\\frac{-6}{5}$`,
                                `$\\frac{-6}{10}$`,
                                `$\\frac{-3}{10}$`,
                                `$\\frac{6}{5}$`
                            ])
                        };
                    } else if (i === 6) {
                        // -3/8 * 5/7
                        q = {
                            type: "Mult Fractions",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                       <p>Multiply: $\\frac{-3}{8} \\times \\frac{5}{7}$</p>
                                    </div>`,
                            correctAnswer: `$\\frac{-15}{56}$`,
                            solution: `Num x Num, Den x Den. $\\frac{-3 \\times 5}{8 \\times 7} = \\frac{-15}{56}$.`,
                            options: shuffle([
                                `$\\frac{-15}{56}$`,
                                `$\\frac{15}{56}$`,
                                `$\\frac{-15}{15}$`,
                                `$\\frac{2}{1}$`
                            ])
                        };
                    } else {
                        // Sign rule
                        const a = -2, b = 3;
                        const c = -5, d = 7;
                        q = {
                            type: "Mult Sign",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                       <p>Find the product: $\\frac{-2}{3} \\times \\frac{-5}{7}$</p>
                                    </div>`,
                            correctAnswer: `$\\frac{10}{21}$`,
                            solution: `Negative times Negative is Positive. $\\frac{2 \\times 5}{3 \\times 7} = \\frac{10}{21}$.`,
                            options: shuffle([
                                `$\\frac{10}{21}$`,
                                `$\\frac{-10}{21}$`,
                                `$\\frac{7}{10}$`,
                                `$\\frac{-7}{10}$`
                            ])
                        };
                    }
                } else {
                    // 8.4 Division
                    if (i === 8) {
                        // 4/9 / (-5/7)
                        q = {
                            type: "Divide",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Divide: $\\frac{4}{9} \\div (\\frac{-5}{7})$</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-28}{45}$`,
                            solution: `Multiply by reciprocal: $\\frac{4}{9} \\times \\frac{7}{-5} = \\frac{28}{-45} = \\frac{-28}{45}$.`,
                            options: shuffle([
                                `$\\frac{-28}{45}$`,
                                `$\\frac{28}{45}$`,
                                `$\\frac{-20}{63}$`,
                                `$\\frac{45}{28}$`
                            ])
                        };
                    } else {
                        // Reciprocal
                        q = {
                            type: "Reciprocal",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Find the reciprocal of $\\frac{-2}{7}$.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-7}{2}$`,
                            solution: `Reciprocal flips the fraction. $\\frac{7}{-2}$, which is $\\frac{-7}{2}$.`,
                            options: shuffle([
                                `$\\frac{-7}{2}$`,
                                `$\\frac{2}{7}$`,
                                `$\\frac{7}{2}$`,
                                `$\\frac{2}{-7}$`
                            ])
                        };
                    }
                }

                newQuestions.push(q);
            }
            setQuestions(newQuestions);
        };
        generateQuestions();
    }, []);

    // ... Standard boilerplate methods ...
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
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Operations on Rational Numbers</span>
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

export default OperationsOnRationalNumbers;

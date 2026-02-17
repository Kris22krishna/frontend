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

const RationalNumbersBetween = () => {
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
    const SKILL_ID = 'local-rn-between';
    const SKILL_NAME = "Class 7 - Rational Numbers - Between Numbers";
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
                // Topic 7: Rational Numbers Between Two Numbers
                // Subtopic 1: Finding rational numbers between two rational numbers (Q0-Q8)
                // Subtopic 2: Infinite rational numbers concept (Q9)

                if (i < 9) {
                    // Subtopic 1: Finding rational numbers
                    if (i === 0) {
                        q = {
                            type: "Identify Between",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Which rational number lies between -2 and -1?</p>
                                   </div>`,
                            correctAnswer: `$-1.5$ (or $\\frac{-3}{2}$)`,
                            solution: `$\\frac{-3}{2} = -1.5$, which is between -2 and -1.`,
                            options: shuffle([
                                `$-1.5$ (or $\\frac{-3}{2}$)`,
                                `$-2.5$`,
                                `$-0.5$`,
                                `0`
                            ])
                        };
                    } else if (i === 1) {
                        const n = rand(1, 5);
                        const d = rand(6, 10);
                        // find between 0 and n/d
                        q = {
                            type: "Find Between 0",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Which of the following rational numbers is between 0 and $\\frac{${n}}{${d}}$?</p>
                                   </div>`,
                            correctAnswer: `$\\frac{${n}}{${2 * d}}$`,
                            solution: `$\\frac{${n}}{${2 * d}}$ is half of $\\frac{${n}}{${d}}$, so it lies between 0 and $\\frac{${n}}{${d}}$.`,
                            options: shuffle([
                                `$\\frac{${n}}{${2 * d}}$`,
                                `$\\frac{${n + 1}}{${d}}$`,
                                `$\\frac{-1}{${d}}$`,
                                `$\\frac{${d}}{${n}}$`
                            ])
                        };
                    } else if (i === 2) {
                        q = {
                            type: "Mean Method",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Find a rational number exactly halfway between $\\frac{1}{4}$ and $\\frac{1}{2}$.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{3}{8}$`,
                            solution: `Average = $\\frac{1}{2} (\\frac{1}{4} + \\frac{1}{2}) = \\frac{1}{2} (\\frac{1}{4} + \\frac{2}{4}) = \\frac{1}{2}(\\frac{3}{4}) = \\frac{3}{8}$.`,
                            options: shuffle([`$\\frac{3}{8}$`, `$\\frac{1}{3}$`, `$\\frac{2}{8}$`, `$\\frac{5}{8}$`])
                        };
                    } else if (i === 3) {
                        // Between -1/2 and -1/5?
                        // -0.5 and -0.2
                        // -0.3, -0.4 -> -3/10, -2/5
                        q = {
                            type: "Between Negatives",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Which rational number lies between $\\frac{-1}{2}$ and $\\frac{-1}{5}$?</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-3}{10}$`,
                            solution: `$\\frac{-1}{2} = -0.5$ and $\\frac{-1}{5} = -0.2$. $\\frac{-3}{10} = -0.3$, which lies between them.`,
                            options: shuffle([
                                `$\\frac{-3}{10}$`,
                                `$\\frac{-6}{10}$`,
                                `$\\frac{-1}{10}$`,
                                `$\\frac{-7}{10}$`
                            ])
                        };
                    } else if (i === 4) {
                        // Specific example: 3 raional numbers between -2 and -1
                        q = {
                            type: "Multiple Between",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                       <p>Which set of rational numbers lies between -2 and -1?</p>
                                    </div>`,
                            correctAnswer: `$\\frac{-3}{2}, \\frac{-4}{3}, \\frac{-5}{3}$`, // -1.5, -1.33, -1.66
                            solution: `All numbers in this set are between -1 and -2.`,
                            options: shuffle([
                                `$\\frac{-3}{2}, \\frac{-4}{3}, \\frac{-5}{3}$`,
                                `$\\frac{-1}{2}, \\frac{-1}{3}, \\frac{-1}{4}$`,
                                `$\\frac{-5}{2}, -3, -4$`,
                                `$\\frac{3}{2}, \\frac{4}{3}$`
                            ])
                        };
                    } else {
                        // Method of equivalent fractions
                        const m = rand(2, 4);
                        q = {
                            type: "Equivalent Method",
                            difficulty_level: "Hard",
                            text: `<div class='question-container'>
                                       <p>To find 5 rational numbers between $\\frac{3}{5}$ and $\\frac{4}{5}$, we can write them as equivalent fractions with denominator:</p>
                                    </div>`,
                            correctAnswer: `30 (or any multiple greater than 5)`,
                            solution: `To insert 5 numbers, we typically multiply by $5+1=6$. Denominator becomes $5 \\times 6 = 30$.`,
                            options: shuffle([
                                `30 (or any multiple greater than 5)`,
                                `5`,
                                `1`,
                                `4`
                            ])
                        };
                    }
                } else {
                    // Subtopic 2: Infinite rational numbers concept
                    q = {
                        type: "Concept Infinite",
                        difficulty_level: "Easy",
                        text: `<div class='question-container'>
                                  <p>How many rational numbers are there between any two distinct rational numbers?</p>
                               </div>`,
                        correctAnswer: `Infinitely many`,
                        solution: `There are infinitely many rational numbers between any two given rational numbers.`,
                        options: shuffle([
                            `Infinitely many`,
                            `Finite number`,
                            `Depends on the numbers`,
                            `None`
                        ])
                    };
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
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Rational Numbers Between</span>
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

export default RationalNumbersBetween;

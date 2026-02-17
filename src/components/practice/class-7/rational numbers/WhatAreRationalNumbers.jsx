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

const WhatAreRationalNumbers = () => {
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
    const SKILL_ID = 'local-rn-what';
    const SKILL_NAME = "Class 7 - Rational Numbers - Definition";
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
                // Topic 2: What are Rational Numbers
                // Subtopic 1: Definition of rational numbers (Q0-Q2)
                // Subtopic 2: Numerator and denominator (Q3-Q4)
                // Subtopic 3: Integers as rational numbers (Q5-Q6)
                // Subtopic 4: Equivalent rational numbers (Q7-Q9)

                if (i < 3) {
                    // Subtopic 1: Definition
                    if (i === 0) {
                        q = {
                            type: "Definition Identify",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Which of the following is a rational number?</p>
                                   </div>`,
                            correctAnswer: `$\\frac{3}{5}$`,
                            solution: `A rational number is in the form $p/q$ where $p, q$ are integers and $q \\neq 0$. 
                                       $\\frac{3}{5}$ clearly fits this form.`,
                            options: shuffle([`$\\frac{3}{5}$`, `$\\frac{5}{0}$`, `$\\sqrt{2}$`, `None`])
                        };
                    } else if (i === 1) {
                        const n = rand(1, 9);
                        q = {
                            type: "Definition Check",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Is $${n}$ a rational number?</p>
                                   </div>`,
                            correctAnswer: `Yes`,
                            solution: `Yes, because $${n}$ can be written as $\\frac{${n}}{1}$, which is in the form $p/q$.`,
                            options: shuffle([`Yes`, `No`, `Only if positive`, `Only if even`])
                        };
                    } else {
                        // Example: "Which of the following are rational numbers" logic
                        q = {
                            type: "Definition Group",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Which collection consists ONLY of rational numbers?</p>
                                   </div>`,
                            correctAnswer: `$0.25, -4, \\frac{3}{5}$`,
                            solution: `$0.25 = \\frac{1}{4}$, $-4 = \\frac{-4}{1}$, and $\\frac{3}{5}$ are all rational numbers.`,
                            options: shuffle([
                                `$0.25, -4, \\frac{3}{5}$`,
                                `$\\frac{1}{0}, 2, 3$`,
                                `$\\pi, 2, 4$`,
                                `$\\sqrt{2}, \\sqrt{3}, 1$`
                            ])
                        };
                    }
                } else if (i < 5) {
                    // Subtopic 2: Numerator and denominator
                    if (i === 3) {
                        const num = -rand(2, 9);
                        const den = rand(2, 9);
                        q = {
                            type: "Identify Num/Den",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Identify the numerator in the rational number $\\frac{${num}}{${den}}$.</p>
                                   </div>`,
                            correctAnswer: `$${num}$`,
                            solution: `In $\\frac{p}{q}$, $p$ is the numerator. Here $p = ${num}$.`,
                            options: shuffle([`$${num}$`, `$${den}$`, `$${-num}$`, `$${Math.abs(num)}$`])
                        };
                    } else {
                        const num = -rand(2, 9);
                        const den = rand(2, 9);
                        q = {
                            type: "Construct Rational",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Write a rational number with numerator ${num} and denominator ${den}.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{${num}}{${den}}$`,
                            solution: `Numerator goes on top, denominator on bottom. So $\\frac{${num}}{${den}}$.`,
                            options: shuffle([
                                `$\\frac{${num}}{${den}}$`,
                                `$\\frac{${den}}{${num}}$`,
                                `$\\frac{${-num}}{${-den}}$`,
                                `$\\frac{${den}}{${-num}}$`
                            ])
                        };
                    }
                } else if (i < 7) {
                    // Subtopic 3: Integers as rational numbers
                    if (i === 5) {
                        const intVal = -rand(2, 20);
                        q = {
                            type: "Integer to Rational",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Write the integer ${intVal} as a rational number with denominator 1.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{${intVal}}{1}$`,
                            solution: `Any integer $z$ can be written as $\\frac{z}{1}$.`,
                            options: shuffle([`$\\frac{${intVal}}{1}$`, `$\\frac{1}{${intVal}}$`, `$\\frac{${intVal}}{0}$`, `$\\frac{${Math.abs(intVal)}}{1}$`])
                        };
                    } else {
                        q = {
                            type: "Zero as Rational",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>How can 0 be written as a rational number?</p>
                                   </div>`,
                            correctAnswer: `$\\frac{0}{1}$`,
                            solution: `0 can be written as $0/q$ for any non-zero integer $q$. $\\frac{0}{1}$ is the simplest form.`,
                            options: shuffle([`$\\frac{0}{1}$`, `$\\frac{1}{0}$`, `$\\frac{0}{0}$`, `It cannot`])
                        };
                    }
                } else {
                    // Subtopic 4: Equivalent rational numbers
                    if (i === 7) {
                        const num = -rand(2, 5);
                        const den = rand(2, 5);
                        const mul = rand(2, 4);
                        q = {
                            type: "Find Equivalent",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Which of the following is equivalent to $\\frac{${num}}{${den}}$?</p>
                                   </div>`,
                            correctAnswer: `$\\frac{${num * mul}}{${den * mul}}$`,
                            solution: `Multiplying numerator and denominator by the same non-zero integer gives an equivalent rational number. 
                                       $\\frac{${num} \\times ${mul}}{${den} \\times ${mul}} = \\frac{${num * mul}}{${den * mul}}$.`,
                            options: shuffle([
                                `$\\frac{${num * mul}}{${den * mul}}$`,
                                `$\\frac{${num + mul}}{${den + mul}}$`,
                                `$\\frac{${num}}{${den * mul}}$`,
                                `$\\frac{${num * mul}}{${den}}$`
                            ])
                        };
                    } else if (i === 8) {
                        const num = rand(2, 5);
                        const den = rand(6, 9);
                        const m1 = 2, m2 = 3;
                        const correct1 = `$\\frac{${num * m1}}{${den * m1}}$`;
                        const correct2 = `$\\frac{${num * m2}}{${den * m2}}$`;

                        q = {
                            type: "Equivalent Forms",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Select a rational number equivalent to $\\frac{${num}}{${den}}$.</p>
                                   </div>`,
                            correctAnswer: correct1,
                            solution: `Multiply num and den by 2: $\\frac{${num * 2}}{${den * 2}} = ${correct1}$.`,
                            options: shuffle([
                                correct1,
                                `$\\frac{${num + 1}}{${den + 1}}$`,
                                `$\\frac{${den}}{${num}}$`,
                                `$\\frac{${num * 2}}{${den}}$`
                            ])
                        };
                    } else {
                        // Standardize equivalent check
                        const n1 = -2, d1 = 3;
                        const n2 = -4, d2 = 6;
                        q = {
                            type: "Check Equivalence",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Are $\\frac{${n1}}{${d1}}$ and $\\frac{${n2}}{${d2}}$ equivalent?</p>
                                   </div>`,
                            correctAnswer: `Yes`,
                            solution: `$\\frac{${n1} \\times 2}{${d1} \\times 2} = \\frac{${n2}}{${d2}}$. Yes, they are equivalent.`,
                            options: shuffle([`Yes`, `No`])
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
            // Create report logic
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
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>What are Rational Numbers</span>
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

export default WhatAreRationalNumbers;

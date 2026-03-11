import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/middle/class-7/Class7PracticeLayout.css';

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

const RationalNumbersNumberLine = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [finalTime, setFinalTime] = useState(0);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 'local-rn-numline';
    const SKILL_NAME = "Class 7 - Rational Numbers - Number Line";
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
                // Topic 4: Rational Numbers on a Number Line
                // Subtopic 1: Representation of positive rational numbers (Q0-Q4)
                // Subtopic 2: Representation of negative rational numbers (Q5-Q9)

                if (i < 5) {
                    // Subtopic 1: Positive representation
                    if (i === 0) {
                        const num = 1;
                        const den = 2;
                        q = {
                            type: "Number Line Half",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Between which two consecutive integers does the rational number $\\frac{1}{2}$ lie?</p>
                                   </div>`,
                            correctAnswer: `0 and 1`,
                            solution: `$\\frac{1}{2}$ is 0.5, which is greater than 0 but less than 1.`,
                            options: shuffle([`0 and 1`, `1 and 2`, `-1 and 0`, `0 and -1`])
                        };
                    } else if (i === 1) {
                        const num = rand(3, 5);
                        const den = rand(num + 1, 9);
                        q = {
                            type: "Number Line Range",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>On a number line, on which side of 0 does $\\frac{${num}}{${den}}$ lie?</p>
                                   </div>`,
                            correctAnswer: `Right side`,
                            solution: `$\\frac{${num}}{${den}}$ is a positive rational number, so it lies to the right of 0.`,
                            options: shuffle([`Right side`, `Left side`, `At 0`, `Undefined`])
                        };
                    } else if (i === 2) {
                        // Improper fraction
                        const n = rand(3, 5); // 3
                        const d = 2;
                        q = {
                            type: "Number Line Improper",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Between which two integers does $\\frac{${n}}{${d}}$ lie?</p>
                                   </div>`,
                            correctAnswer: `$${Math.floor(n / d)}$ and $${Math.ceil(n / d)}$`,
                            solution: `$\\frac{${n}}{${d}} = ${n / d}$. It lies between ${Math.floor(n / d)} and ${Math.ceil(n / d)}.`,
                            options: shuffle([
                                `$${Math.floor(n / d)}$ and $${Math.ceil(n / d)}$`,
                                `$${Math.floor(n / d) - 1}$ and $${Math.floor(n / d)}$`,
                                `$${Math.ceil(n / d)}$ and $${Math.ceil(n / d) + 1}$`,
                                `$0$ and $1$`
                            ])
                        };
                        // ensure distinct options
                        if (Math.floor(n / d) === 0) {
                            q.options = shuffle([
                                `0 and 1`, `1 and 2`, `-1 and 0`, `2 and 3`
                            ]);
                            if (n / d > 1) {
                                q.options = shuffle([
                                    `${Math.floor(n / d)} and ${Math.ceil(n / d)}`,
                                    `${Math.floor(n / d) + 1} and ${Math.ceil(n / d) + 1}`,
                                    `0 and 1`,
                                    `-1 and 0`
                                ]);
                            }
                        }
                    } else if (i === 3) {
                        const step = rand(3, 5);
                        q = {
                            type: "Division Segments",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>To represent $\\frac{2}{${step}}$ on a number line, into how many equal parts should the unit distance between 0 and 1 be divided?</p>
                                   </div>`,
                            correctAnswer: `${step} parts`,
                            solution: `The denominator is ${step}, so we divide the unit distance into ${step} equal parts.`,
                            options: shuffle([`${step} parts`, `2 parts`, `${step + 1} parts`, `1 part`])
                        };
                    } else {
                        q = {
                            type: "Comparison Position",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Which is closer to 0 on the number line: $\\frac{1}{10}$ or $\\frac{9}{10}$?</p>
                                   </div>`,
                            correctAnswer: `$\\frac{1}{10}$`,
                            solution: `$\\frac{1}{10}$ is smaller than $\\frac{9}{10}$, so it is closer to 0.`,
                            options: shuffle([`$\\frac{1}{10}$`, `$\\frac{9}{10}$`, `Equidistant`, `Cannot determine`])
                        };
                    }
                } else {
                    // Subtopic 2: Negative representation
                    if (i === 5) {
                        const num = 3;
                        const den = 2;
                        q = {
                            type: "Number Line Negative Half",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Between which two integers does $-\\frac{${num}}{${den}}$ lie?</p>
                                   </div>`,
                            correctAnswer: `-2 and -1`,
                            solution: `$-\\frac{3}{2} = -1.5$. It lies between -2 and -1.`,
                            options: shuffle([`-2 and -1`, `-1 and 0`, `0 and 1`, `-3 and -2`])
                        };
                    } else if (i === 6) {
                        const n = rand(2, 8);
                        q = {
                            type: "Sign Side",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>On a number line, where is the number $-\\frac{${n}}{${n + 1}}$ located relative to 0?</p>
                                   </div>`,
                            correctAnswer: `To the left`,
                            solution: `Negative numbers are located to the left of 0.`,
                            options: shuffle([`To the left`, `To the right`, `At 0`, `Above`])
                        };
                    } else if (i === 7) {
                        const n = rand(1, 4);
                        q = {
                            type: "Identify Point",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Which number represents 2 steps to the left of 0, where each step is $1/${n}$?</p>
                                   </div>`,
                            correctAnswer: `$-\\frac{2}{${n}}$`,
                            solution: `Left implies negative. 2 steps of $\\frac{1}{${n}}$ is $\\frac{2}{${n}}$. So $-\\frac{2}{${n}}$.`,
                            options: shuffle([`$-\\frac{2}{${n}}$`, `$\\frac{2}{${n}}$`, `$-\\frac{1}{${n}}$`, `$-2$`])
                        };
                    } else if (i === 8) {
                        // Order check
                        q = {
                            type: "Order Left",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Which of these numbers is strictly to the left of -1?</p>
                                   </div>`,
                            correctAnswer: `$-\\frac{3}{2}$`,
                            solution: `$-\\frac{3}{2} = -1.5$, which is to the left of -1. 
                                       $-\\frac{1}{2} = -0.5$ is to the right of -1.`,
                            options: shuffle([`$-\\frac{3}{2}$`, `$-\\frac{1}{2}$`, `$0$`, `$\\frac{1}{2}$`])
                        };
                    } else {
                        q = {
                            type: "Equal Dist",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                       <p>Are $\\frac{2}{3}$ and $-\\frac{2}{3}$ at the same distance from 0?</p>
                                    </div>`,
                            correctAnswer: `Yes`,
                            solution: `Yes, they are opposties. Their absolute value is $\\frac{2}{3}$, so they are equidistant from 0.`,
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
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
                try {
                    await api.createReport({
                uid: parseInt(userId, 10),
                category: 'Practice',
                reportData: {
                    skill_id: SKILL_ID,
                            skill_name: SKILL_NAME,
                            total_questions: questions.length,
                            correct_answers: totalCorrect,
                            timestamp: new Date().toISOString(),
                            time_taken_seconds: timeElapsed,
                    score: (totalCorrect / questions.length) * 100,
                    type: 'Practice'
                }
            });
                } catch (err) {
                    console.error("Failed to create report", err);
                }
            }
            setFinalTime(timeElapsed);
            setShowReport(true);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (questions.length === 0) return <div>Loading...</div>;

    const currentQuestion = questions[qIndex];

    
    if (showReport) {
        return (
            <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8f9fa' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#31326F', marginBottom: '1rem', fontWeight: 'bold' }}>Practice Complete! 🎉</h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '2rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#f8f9fa', borderRadius: '16px', fontSize: '1.2rem' }}>
                            <span style={{ color: '#666', fontWeight: '600' }}>Time Taken:</span>
                            <span style={{ color: '#31326F', fontWeight: 'bold', fontSize: '1.4rem' }}>{Math.floor(finalTime / 60)}:{(finalTime % 60).toString().padStart(2, '0')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#f0fdf4', borderRadius: '16px', fontSize: '1.2rem' }}>
                            <span style={{ color: '#16a34a', fontWeight: '600' }}>Correct Answers:</span>
                            <span style={{ color: '#15803d', fontWeight: 'bold', fontSize: '1.4rem' }}>{Object.values(answers).filter((v) => v.isCorrect).length} / {questions.length}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#fef2f2', borderRadius: '16px', fontSize: '1.2rem' }}>
                            <span style={{ color: '#dc2626', fontWeight: '600' }}>Wrong Answers:</span>
                            <span style={{ color: '#b91c1c', fontWeight: 'bold', fontSize: '1.4rem' }}>{questions.length - Object.values(answers).filter((v) => v.isCorrect).length} / {questions.length}</span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} style={{ width: '100%', padding: '1rem', background: '#31326F', color: 'white', border: 'none', borderRadius: '16px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 4px 12px rgba(49, 50, 111, 0.2)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        Continue
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Number Line</span>
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
                        <div className="c7-question-card" style={{ paddingLeft: '2rem' }}>
                            <div className="c7-question-header">
                                <h2 className="c7-question-text" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}>
                                    <LatexContent html={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="c7-interaction-area">
                                <div className="c7-options-grid">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`c7-option-btn ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
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

export default RationalNumbersNumberLine;

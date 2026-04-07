import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { useSessionLogger } from '@/hooks/useSessionLogger';
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

const NeedForRationalNumbers = () => {
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
    const SKILL_ID = 'local-rn-need';
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4AnswersPayload = useRef([]);
    const v4IsFinishedRef = useRef(false);
    const SKILL_NAME = "Class 7 - Rational Numbers - Need";
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
                // Topic 1: Need for Rational Numbers
                // Subtopic 1: Extension of number system (Q0-Q4)
                // Subtopic 2: Negative fractions in real life (Q5-Q9)

                if (i < 5) {
                    // Subtopic 1: Extension of number system
                    // Concept: We need numbers to represent distance below zero, or opposite directions.

                    if (i === 0) {
                        // Example 1: Below sea level
                        const depth = rand(200, 900); // e.g. 750
                        const numerator = -depth;
                        const denominator = 1000;
                        // simplify fraction logic
                        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
                        const common = gcd(Math.abs(numerator), denominator);
                        const simpNum = numerator / common;
                        const simpDen = denominator / common;
                        const correct = `$\\frac{${simpNum}}{${simpDen}}$ km`;

                        q = {
                            type: "Real Life Representation",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Represent ${depth} m below sea level in km using rational numbers.</p>
                                   </div>`,
                            correctAnswer: correct,
                            solution: `Below sea level indicates a negative direction.
                                       $$${depth} \\text{ m} = \\frac{-${depth}}{1000} \\text{ km}$$
                                       Simplifying $\\frac{-${depth}}{1000}$:
                                       Divide by ${common}: $\\frac{-${depth / common}}{${1000 / common}}$
                                        So, it is $\\frac{${simpNum}}{${simpDen}}$ km.`,
                            options: shuffle([
                                correct,
                                `$\\frac{${Math.abs(simpNum)}}{${simpDen}}$ km`,
                                `$\\frac{${simpNum}}{${simpDen * 10}}$ km`,
                                `$\\frac{${simpDen}}{${Math.abs(simpNum)}}$ km`
                            ])
                        };
                    } else if (i === 1) {
                        // Example 2: Opposite of creating profit
                        const val = rand(10, 50);
                        const dist = rand(val + 10, 100);
                        q = {
                            type: "Directional Representation",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>If moving ${dist} km East is represented by $+${dist}$, how is moving ${val} km West represented?</p>
                                   </div>`,
                            correctAnswer: `$-${val}$`,
                            solution: `West is the opposite direction of East. 
                                       If East is positive, West is negative.
                                       So, ${val} km West is represented as $-${val}$.`,
                            options: shuffle([`$-${val}$`, `$${val}$`, `$-${dist}$`, `$${dist - val}$`])
                        };
                    } else if (i === 2) {
                        // Extension needs
                        q = {
                            type: "Number System Concept",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Which set of numbers is needed to represent parts of a whole where the value is less than zero?</p>
                                   </div>`,
                            correctAnswer: `Rational Numbers`,
                            solution: `Integers include negative numbers but not parts of a whole (fractions). 
                                       Fractions are positive. 
                                       To represent negative parts (like negative fractions), we need Rational Numbers.`,
                            options: shuffle([`Rational Numbers`, `Integers`, `Natural Numbers`, `Whole Numbers`])
                        };
                    } else if (i === 3) {
                        // Simple representation
                        const val = rand(2, 9);
                        const den = rand(val + 1, 15);
                        q = {
                            type: "Negative Fraction Meaning",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>What does the number $-\\frac{${val}}{${den}}$ represent on a number line?</p>
                                   </div>`,
                            correctAnswer: `A distance of $\\frac{${val}}{${den}}$ to the left of 0`,
                            solution: `A negative rational number represents a point to the left of 0 on the number line. 
                                       So $-\\frac{${val}}{${den}}$ is at a distance of $\\frac{${val}}{${den}}$ units to the left of 0.`,
                            options: shuffle([
                                `A distance of $\\frac{${val}}{${den}}$ to the left of 0`,
                                `A distance of $\\frac{${val}}{${den}}$ to the right of 0`,
                                `A distance of ${val} to the left of ${den}`,
                                `None of these`
                            ])
                        };
                    } else {
                        // General scenario
                        const profit = rand(100, 500);
                        q = {
                            type: "Integer Scenario",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>If a profit of ₹${profit} is denoted by +${profit}, then a loss of ₹${profit} is denoted by:</p>
                                   </div>`,
                            correctAnswer: `$-${profit}$`,
                            solution: `Loss is opposite to profit. If profit is positive, loss is negative.`,
                            options: shuffle([`$-${profit}$`, `$${profit}$`, `$0$`, `$-1$`])
                        };
                    }
                } else {
                    // Subtopic 2: Negative fractions in real life
                    if (i === 5) {
                        // Example: Loss of X out of Y
                        const loss = rand(2, 9);
                        const total = rand(10, 20);
                        q = {
                            type: "Real Life Fraction",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Write a rational number representing a loss of ₹${loss} out of ₹${total}.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-${loss}}{${total}}$`,
                            solution: `A loss is negative. 
                                       "Out of" implies the denominator.
                                       So, a loss of ₹${loss} out of ₹${total} is represented as $\\frac{-${loss}}{${total}}$.`,
                            options: shuffle([
                                `$\\frac{-${loss}}{${total}}$`,
                                `$\\frac{${loss}}{${total}}$`,
                                `$\\frac{-${total}}{${loss}}$`,
                                `$\\frac{${total}}{${loss}}$`
                            ])
                        };
                    } else if (i === 6) {
                        // Temperature drop
                        const drop = rand(3, 15);
                        const duration = rand(2, 5);
                        // Avg drop per hour
                        q = {
                            type: "Real Life Rate",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>The temperature dropped by ${drop}°C over ${duration} hours. What is the average change per hour represented as a rational number?</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-${drop}}{${duration}}$`,
                            solution: `Temperature drop is negative change: $-${drop}$.
                                       Time duration is ${duration}.
                                       Average change = $\\frac{\\text{Total Change}}{\\text{Total Time}} = \\frac{-${drop}}{${duration}}$.`,
                            options: shuffle([
                                `$\\frac{-${drop}}{${duration}}$`,
                                `$\\frac{${drop}}{${duration}}$`,
                                `$\\frac{-${duration}}{${drop}}$`,
                                `$${drop * duration}$`
                            ])
                        };
                    } else if (i === 7) {
                        // Debt sharing
                        const debt = rand(100, 900);
                        const people = rand(3, 6);
                        q = {
                            type: "Real Life Sharing",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>A debt of ₹${debt} is shared equally among ${people} friends. Represent the share of each person as a rational number.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-${debt}}{${people}}$`,
                            solution: `Debt is considered negative money: $-${debt}$.
                                       Divided by ${people} people.
                                       Each share = $\\frac{-${debt}}{${people}}$.`,
                            options: shuffle([
                                `$\\frac{-${debt}}{${people}}$`,
                                `$\\frac{${debt}}{${people}}$`,
                                `$\\frac{-${people}}{${debt}}$`,
                                `$${debt - people}$`
                            ])
                        };
                    } else if (i === 8) {
                        // Real Life Distance (new question type)
                        const n1 = rand(1, 5);
                        const d1 = rand(n1 + 1, 10);
                        const n2 = rand(1, 5);
                        const d2 = rand(n2 + 1, 10);

                        const num = n1 * d2 + n2 * d1;
                        const den = d1 * d2;

                        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
                        const common = gcd(num, den);
                        const simpNum = num / common;
                        const simpDen = den / common;

                        const correct = `$\\frac{${simpNum}}{${simpDen}}$ km`;
                        q = {
                            type: "Real Life Distance",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Radha walked $\\frac{${n1}}{${d1}}$ km from her home to school and then walked $\\frac{${n2}}{${d2}}$ km to the market. Total distance traveled?</p>
                                   </div>`,
                            correctAnswer: correct,
                            solution: `Total distance = $\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}} = \\frac{${num}}{${den}}$. Simplified: $\\frac{${simpNum}}{${simpDen}}$ km.`,
                            options: shuffle([
                                `$\\frac{${simpNum}}{${simpDen}}$ km`,
                                `$\\frac{${simpNum + 1}}{${simpDen}}$ km`,
                                `$\\frac{${simpNum}}{${simpDen + 1}}$ km`,
                                `$\\frac{${Math.abs(simpNum - 1)}}{${simpDen}}$ km`
                            ])
                        };
                    } else {
                        // Submarine depth e.g. (new question type)
                        const depth = rand(50, 200) * 10;
                        const correct = `$\\frac{-${depth}}{1000}$ km`;
                        q = {
                            type: "Real Life Depth",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>A submarine is ${depth} meters below sea level. Express this as a rational number in km.</p>
                                   </div>`,
                            correctAnswer: correct,
                            solution: `Below sea level is negative. 1 km = 1000 m. So, $${depth} \\text{ m} = \\frac{-${depth}}{1000} \\text{ km}$.`,
                            options: shuffle([
                                `$\\frac{-${depth}}{1000}$ km`,
                                `$\\frac{${depth}}{1000}$ km`,
                                `$${depth}$ km`,
                                `$\\frac{-1000}{${depth}}$ km`
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
        startSession({ nodeId: 'a4071009-0002-0000-0000-000000000000', sessionType: 'practice' });
        v4AnswersPayload.current = [];
        v4IsFinishedRef.current = false;
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
        const _v4t = Date.now() - questionStartTime.current;
        v4AnswersPayload.current.push({
            question_index: qIndex,
            answer_json: JSON.stringify({ selected: selectedOption }),
            is_correct: isRight,
            marks_awarded: isRight ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: _v4t > 0 ? _v4t : 0,
        });
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
                if (!v4IsFinishedRef.current) {
                    v4IsFinishedRef.current = true;
                    finishSession({ answers_payload: v4AnswersPayload.current });
                }
                await api.finishSession(sessionId).catch(console.error);
            }
            // Create report logic
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
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Need for Rational Numbers</span>
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

export default NeedForRationalNumbers;

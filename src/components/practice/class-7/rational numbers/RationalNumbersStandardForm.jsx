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

const RationalNumbersStandardForm = () => {
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
    const SKILL_ID = 'local-rn-standard';
    const SKILL_NAME = "Class 7 - Rational Numbers - Standard Form";
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
                // Topic 5: Rational Numbers in Standard Form
                // Subtopic 1: Meaning of standard form (Q0-Q4)
                // Subtopic 2: Reducing to standard form using HCF (Q5-Q9)

                if (i < 5) {
                    // Subtopic 1: Meaning
                    if (i === 0) {
                        q = {
                            type: "Standard Definition",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Which of the following conditions must a rational number $\\frac{p}{q}$ satisfy to be in standard form?</p>
                                   </div>`,
                            correctAnswer: `$q > 0$ and HCF(p, q) = 1`,
                            solution: `In standard form, the denominator $q$ must be positive, and the numerator $p$ and denominator $q$ must have no common factor other than 1.`,
                            options: shuffle([
                                `$q > 0$ and HCF(p, q) = 1`,
                                `$q < 0$ and HCF(p, q) = 1`,
                                `$p > 0$ and HCF(p, q) = 1`,
                                `HCF(p, q) = 1 only`
                            ])
                        };
                    } else if (i === 1) {
                        const n = rand(2, 5);
                        const d = rand(2, 5);
                        q = {
                            type: "Standard Check Denom",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Is $\\frac{${n}}{-${d}}$ in standard form?</p>
                                   </div>`,
                            correctAnswer: `No`,
                            solution: `No, because the denominator is negative. In standard form, the denominator must be positive.`,
                            options: shuffle([`No`, `Yes`])
                        };
                    } else if (i === 2) {
                        // Common factor check
                        const common = rand(2, 3);
                        const n = rand(2, 4) * common;
                        const d = rand(5, 7) * common;
                        q = {
                            type: "Standard Check HCF",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Is $\\frac{${n}}{${d}}$ in standard form?</p>
                                   </div>`,
                            correctAnswer: `No`,
                            solution: `No, because ${n} and ${d} have a common factor of ${common}.`,
                            options: shuffle([`No`, `Yes`])
                        };
                    } else if (i === 3) {
                        const n = -rand(2, 5);
                        const d = rand(7, 11); // likely prime or coprime
                        // ensure coprime
                        if (gcd(Math.abs(n), d) === 1) {
                            q = {
                                type: "Standard Check Valid",
                                difficulty_level: "Easy",
                                text: `<div class='question-container'>
                                          <p>Is $\\frac{${n}}{${d}}$ in standard form?</p>
                                       </div>`,
                                correctAnswer: `Yes`,
                                solution: `Yes, because the denominator is positive and HCF(${Math.abs(n)}, ${d}) = 1.`,
                                options: shuffle([`Yes`, `No`])
                            };
                        } else {
                            // Fallback if random gen fails coprimality
                            q = {
                                type: "Standard Check Valid",
                                difficulty_level: "Easy",
                                text: `<div class='question-container'>
                                          <p>Is $\\frac{-1}{3}$ in standard form?</p>
                                       </div>`,
                                correctAnswer: `Yes`,
                                solution: `Yes, denominator is positive and HCF(1, 3) = 1.`,
                                options: shuffle([`Yes`, `No`])
                            };
                        }
                    } else {
                        q = {
                            type: "Standardize Sign",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Which step is required to convert $\\frac{7}{-9}$ to standard form?</p>
                                   </div>`,
                            correctAnswer: `Multiply numerator and denominator by -1`,
                            solution: `To make the denominator positive, we multiply both numerator and denominator by -1 to get $\\frac{-7}{9}$.`,
                            options: shuffle([
                                `Multiply numerator and denominator by -1`,
                                `Add 1 to denominator`,
                                `Divide by HCF`,
                                `It is already in standard form`
                            ])
                        };
                    }
                } else {
                    // Subtopic 2: Reducing to standard form using HCF
                    if (i === 5) {
                        const common = rand(5, 15);
                        const n = 3 * common; // base 3/5 or 3/7
                        const d = 5 * common;
                        q = {
                            type: "Reduce Simple",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Reduce $\\frac{${-n}}{${d}}$ to standard form.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-3}{5}$`,
                            solution: `HCF of ${n} and ${d} is ${common}. Dividing both by ${common}, we get $\\frac{-3}{5}$.`,
                            options: shuffle([
                                `$\\frac{-3}{5}$`,
                                `$\\frac{-${n}}{${d}}$`,
                                `$\\frac{3}{-5}$`,
                                `$\\frac{-5}{3}$`
                            ])
                        };
                    } else if (i === 6) {
                        // Example: 36/-24
                        const common = 12;
                        const n = 3 * common;
                        const d = -2 * common;
                        q = {
                            type: "Reduce Negative Denom",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Write $\\frac{${n}}{${d}}$ in standard form.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-3}{2}$`,
                            solution: `First, make denominator positive: $\\frac{-${n}}{${-d}}$. Then divide by HCF ${common}: $\\frac{-3}{2}$.`,
                            options: shuffle([
                                `$\\frac{-3}{2}$`,
                                `$\\frac{3}{-2}$`,
                                `$\\frac{-2}{3}$`,
                                `$\\frac{3}{2}$`
                            ])
                        };
                    } else if (i === 7) {
                        const common = rand(2, 5);
                        const n = -4 * common;
                        const d = -7 * common;
                        q = {
                            type: "Reduce Double Negative",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Reduce $\\frac{${n}}{${d}}$ to standard form.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{4}{7}$`,
                            solution: `Cancel the negative signs: $\\frac{${-n}}{${-d}}$. Divide by HCF ${common}: $\\frac{4}{7}$.`,
                            options: shuffle([
                                `$\\frac{4}{7}$`,
                                `$\\frac{-4}{7}$`,
                                `$\\frac{4}{-7}$`,
                                `$\\frac{-4}{-7}$`
                            ])
                        };
                    } else if (i === 8) {
                        // large numbers
                        const common = 15;
                        const n = -45;
                        const d = 30;
                        q = {
                            type: "Reduce Specific",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Reduce $\\frac{-45}{30}$ to standard form.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-3}{2}$`,
                            solution: `HCF of 45 and 30 is 15. $\\frac{-45 \\div 15}{30 \\div 15} = \\frac{-3}{2}$.`,
                            options: shuffle([
                                `$\\frac{-3}{2}$`,
                                `$\\frac{-9}{6}$`,
                                `$\\frac{3}{2}$`,
                                `$\\frac{-15}{10}$`
                            ])
                        };
                    } else {
                        const n = rand(10, 20);
                        const d = rand(30, 50);
                        const common = gcd(n, d);
                        const sn = n / common;
                        const sd = d / common;
                        q = {
                            type: "Reduce Random",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Reduce $\\frac{${n}}{${d}}$ to its lowest form.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{${sn}}{${sd}}$`,
                            solution: `HCF of ${n} and ${d} is ${common}. Values become $\\frac{${sn}}{${sd}}$.`,
                            options: shuffle([
                                `$\\frac{${sn}}{${sd}}$`,
                                `$\\frac{${sd}}{${sn}}$`,
                                `$\\frac{${sn + 1}}{${sd + 1}}$`,
                                `$\\frac{${sn}}{${sd + 1}}$`
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
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Standard Form</span>
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

export default RationalNumbersStandardForm;

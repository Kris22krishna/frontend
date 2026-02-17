
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, Pencil, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Whiteboard from '../../../Whiteboard';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import { FullScreenScratchpad } from '../../../FullScreenScratchpad';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

const PowersWithNegativeExponents = () => {
    const { grade } = useParams();
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

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const history = useRef({});
    const isTabActive = useRef(true);
    const SKILL_ID = 8001; // Grade 8 - Negative Exponents
    const SKILL_NAME = "Exponents and Powers - Negative Exponents";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({}); // To track for report

    useEffect(() => {
        // Create Session
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

        // Visibility Change logic
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
    }, []);

    useEffect(() => {
        generateQuestion(qIndex);
    }, [qIndex]);

    const generateQuestion = (index) => {
        if (history.current[index]) {
            const stored = history.current[index];
            setCurrentQuestion(stored.qData);
            setShuffledOptions(stored.shuffledOptions);
            setSelectedOption(stored.selectedOption);
            setIsSubmitted(stored.isSubmitted);
            setIsCorrect(stored.isCorrect);
            return;
        }
        let qData;

        // Progressive difficulty
        switch (index) {
            case 0:
                // Basic conversion: 2^-3 = ?
                qData = generateBasicConversion(2, 3);
                break;
            case 1:
                // Basic conversion: 3^-2 = ?
                qData = generateBasicConversion(3, 2);
                break;
            case 2:
                // Basic conversion: 5^-1 = ?
                qData = generateBasicConversion(5, 1);
                break;
            case 3:
                // Evaluation: 2^-4 = ?
                qData = generateEvaluation(2, 4);
                break;
            case 4:
                // Evaluation: 10^-2 = ?
                qData = generateEvaluation(10, 2);
                break;
            case 5:
                // Simplification: (x^-3)
                qData = generateSimplification(randomInt(2, 4), 3);
                break;
            case 6:
                // Simplification with division
                qData = generateDivisionSimplification(3, 2);
                break;
            case 7:
                // Comparison
                qData = generateComparison();
                break;
            case 8:
                // Application - scientific notation
                qData = generateApplication();
                break;
            case 9:
                // Mixed operations
                qData = generateMixedOperation();
                break;
            default:
                qData = generateBasicConversion(2, 2);
        }

        const newShuffledOptions = [...qData.options].sort(() => Math.random() - 0.5);
        history.current[index] = {
            qData,
            shuffledOptions: newShuffledOptions,
            selectedOption: null,
            isSubmitted: false,
            isCorrect: false
        };

        setShuffledOptions(newShuffledOptions);
        setCurrentQuestion(qData);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
    };

    const generateBasicConversion = (base, exp) => {
        const templates = [
            `<div class='question-container'>
                <p>Express $${base}^{-${exp}}$ as a fraction with a positive exponent.</p>
             </div>`,
            `<div class='question-container'>
                <p>What is $${base}^{-${exp}}$ written with a positive exponent?</p>
             </div>`,
            `<div class='question-container'>
                <p>Convert $${base}^{-${exp}}$ to a fraction form.</p>
             </div>`
        ];

        const correctAnswer = `$\\frac{1}{${base}^{${exp}}}$`;
        const wrongOptions = [
            `$${base}^{${exp}}$`,
            `$-${base}^{${exp}}$`,
            `$\\frac{${base}}{${exp}}$`
        ];

        return {
            text: templates[randomInt(0, templates.length - 1)],
            correctAnswer,
            solution: `By the laws of exponents, $a^{-n} = \\frac{1}{a^n}$.<br/><br/>
                       Therefore, $${base}^{-${exp}} = \\frac{1}{${base}^{${exp}}}$.`,
            options: [correctAnswer, ...wrongOptions]
        };
    };

    const generateEvaluation = (base, exp) => {
        const numericalValue = Math.pow(base, exp);
        const answer = numericalValue;
        const correctAnswer = `$\\frac{1}{${numericalValue}}$`;

        const wrongOptions = [
            `$${numericalValue}$`,
            `$-${numericalValue}$`,
            `$\\frac{1}{${base * exp}}$`
        ];

        const templates = [
            `<div class='question-container'>
                <p>Evaluate: $${base}^{-${exp}}$</p>
             </div>`,
            `<div class='question-container'>
                <p>What is the value of $${base}^{-${exp}}$?</p>
             </div>`
        ];

        return {
            text: templates[randomInt(0, templates.length - 1)],
            correctAnswer,
            solution: `First, apply the negative exponent rule: $${base}^{-${exp}} = \\frac{1}{${base}^{${exp}}}$.<br/><br/>
                       Then calculate: $${base}^{${exp}} = ${numericalValue}$.<br/><br/>
                       Therefore, $${base}^{-${exp}} = \\frac{1}{${numericalValue}}$.`,
            options: [correctAnswer, ...wrongOptions]
        };
    };

    const generateSimplification = (base, exp) => {
        const correctAnswer = `$\\frac{1}{${base}^{${exp}}}$`;
        const wrongOptions = [
            `$${base}^{${exp}}$`,
            `$-\\frac{1}{${base}^{${exp}}}$`,
            `$\\frac{${base}}{${exp}}$`
        ];

        return {
            text: `<div class='question-container'>
                      <p>Simplify: $${base}^{-${exp}}$</p>
                   </div>`,
            correctAnswer,
            solution: `Using the negative exponent rule: $a^{-n} = \\frac{1}{a^n}$.<br/><br/>
                       So, $${base}^{-${exp}} = \\frac{1}{${base}^{${exp}}}$.`,
            options: [correctAnswer, ...wrongOptions]
        };
    };

    const generateDivisionSimplification = (base, exp) => {
        const correctAnswer = `$${base}^{${exp}}$`;
        const wrongOptions = [
            `$${base}^{-${exp}}$`,
            `$\\frac{1}{${base}^{${exp}}}$`,
            `$${base}^{${exp * 2}}$`
        ];

        return {
            text: `<div class='question-container'>
                      <p>Simplify: $\\frac{1}{${base}^{-${exp}}}$</p>
                   </div>`,
            correctAnswer,
            solution: `When we have $\\frac{1}{a^{-n}}$, we can rewrite it as $a^n$.<br/><br/>
                       This is because $\\frac{1}{a^{-n}} = \\frac{1}{\\frac{1}{a^n}} = a^n$.<br/><br/>
                       Therefore, $\\frac{1}{${base}^{-${exp}}} = ${base}^{${exp}}$.`,
            options: [correctAnswer, ...wrongOptions]
        };
    };

    const generateComparison = () => {
        const correctAnswer = "$2^{-3}$";

        return {
            text: `<div class='question-container'>
                      <p>Which expression has the smallest value?</p>
                   </div>`,
            correctAnswer,
            solution: `Let's evaluate each:<br/><br/>
                       • $2^{-3} = \\frac{1}{8} = 0.125$<br/>
                       • $2^{-2} = \\frac{1}{4} = 0.25$<br/>
                       • $2^{-1} = \\frac{1}{2} = 0.5$<br/>
                       • $2^{0} = 1$<br/><br/>
                       The smallest value is $2^{-3} = \\frac{1}{8}$.`,
            options: ["$2^{-3}$", "$2^{-2}$", "$2^{-1}$", "$2^{0}$"]
        };
    };

    const generateApplication = () => {
        const correctAnswer = "$10^{-6}$";

        return {
            text: `<div class='question-container'>
                      <p>A micrometer is one-millionth of a meter.</p>
                      <p>Express this as a power of 10 with a negative exponent.</p>
                   </div>`,
            correctAnswer,
            solution: `One-millionth means $\\frac{1}{1,000,000}$.<br/><br/>
                       Since $1,000,000 = 10^6$, we have:<br/><br/>
                       $\\frac{1}{1,000,000} = \\frac{1}{10^6} = 10^{-6}$.`,
            options: ["$10^{-6}$", "$10^{-3}$", "$10^{6}$", "$10^{-9}$"]
        };
    };

    const generateMixedOperation = () => {
        const correctAnswer = "$4^{3}$";
        const wrongOptions = [
            "$4^{-3}$",
            "$\\frac{1}{4^{3}}$",
            "$2^{6}$"
        ];

        return {
            text: `<div class='question-container'>
                      <p>Simplify: $(4^{-3})^{-1}$</p>
                   </div>`,
            correctAnswer,
            solution: `Using the power of a power rule: $(a^m)^n = a^{m \\times n}$.<br/><br/>
                       $(4^{-3})^{-1} = 4^{(-3) \\times (-1)} = 4^{3}$.<br/><br/>
                       Alternatively, $(4^{-3})^{-1} = \\frac{1}{4^{-3}} = 4^{3}$.`,
            options: [correctAnswer, ...wrongOptions]
        };
    };

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
                difficulty_level: 'Medium',
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

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleNext = async () => {
        // Save current state before moving
        if (history.current[qIndex]) {
            history.current[qIndex] = {
                ...history.current[qIndex],
                selectedOption,
                isSubmitted,
                isCorrect
            };
        }

        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            // Reset states for next question
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);

            // Reset question timer
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            // Finish session and create report
            if (sessionId) {
                await api.finishSession(sessionId).catch(console.error);
            }

            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val === true).length;

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
            navigate(-1);
        }
    };

    const handlePrevious = () => {
        // Save current state before moving back
        if (history.current[qIndex]) {
            history.current[qIndex] = {
                ...history.current[qIndex],
                selectedOption,
                isSubmitted,
                isCorrect
            };
        }

        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    {/* Empty or Logo if needed */}
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
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
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
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                        } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''
                                                        }`}
                                                    style={{ fontWeight: '500' }}
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
                {/* Desktop Controls */}
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
                            {qIndex > 0 && (
                                <button className="nav-pill-prev-btn" onClick={handlePrevious} title="Previous">
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

                {/* Mobile Controls */}
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
                            {qIndex > 0 && (
                                <button className="nav-pill-prev-btn" onClick={handlePrevious} title="Previous">
                                    <ChevronLeft size={28} strokeWidth={3} /> Previous
                                </button>
                            )}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
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

export default PowersWithNegativeExponents;

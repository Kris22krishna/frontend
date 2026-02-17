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

const LawsOfExponentsApplication = () => {
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
    const SKILL_ID = 8005; // Grade 8 - Laws of Exponents Application
    const SKILL_NAME = "Exponents and Powers - Application of Laws";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

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
    }, []);

    useEffect(() => {
        generateQuestion(qIndex);
    }, [qIndex]);

    const generateQuestion = (index) => {
        // Randomize question order
        const questionTypes = [
            'product', 'quotient', 'power', 'powerOfProduct',
            'powerOfQuotient', 'zero', 'negative', 'mixed1',
            'mixed2', 'complex'
        ];

        // Shuffle once when component mounts, then use index
        if (!window.shuffledQuestions) {
            window.shuffledQuestions = [...questionTypes].sort(() => Math.random() - 0.5);
        }

        if (history.current[index]) {
            const stored = history.current[index];
            setCurrentQuestion(stored.qData);
            setShuffledOptions(stored.shuffledOptions);
            setSelectedOption(stored.selectedOption);
            setIsSubmitted(stored.isSubmitted);
            setIsCorrect(stored.isCorrect);
            return;
        }

        const questionType = window.shuffledQuestions[index] || 'product';

        let qData;
        switch (questionType) {
            case 'product':
                qData = applyProductRule();
                break;
            case 'quotient':
                qData = applyQuotientRule();
                break;
            case 'power':
                qData = applyPowerRule();
                break;
            case 'powerOfProduct':
                qData = applyPowerOfProduct();
                break;
            case 'powerOfQuotient':
                qData = applyPowerOfQuotient();
                break;
            case 'zero':
                qData = applyZeroExponent();
                break;
            case 'negative':
                qData = applyNegativeExponent();
                break;
            case 'mixed1':
                qData = applyMixedLaws1();
                break;
            case 'mixed2':
                qData = applyMixedLaws2();
                break;
            case 'complex':
                qData = applyComplexLaws();
                break;
            default:
                qData = applyProductRule();
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

    const applyProductRule = () => {
        const base = randomInt(2, 7);
        const exp1 = randomInt(2, 6);
        const exp2 = randomInt(2, 5);
        const correctExp = exp1 + exp2;
        const correctAnswer = `$${base}^{${correctExp}}$`;

        return {
            text: `<div class='question-container'>
                      <p>Simplify: $${base}^{${exp1}} \\times ${base}^{${exp2}}$</p>
                   </div>`,
            correctAnswer,
            solution: `Using the Product Rule: $a^m \\times a^n = a^{m+n}$<br/><br/>
                       $${base}^{${exp1}} \\times ${base}^{${exp2}} = ${base}^{${exp1}+${exp2}} = ${base}^{${correctExp}}$`,
            options: [
                `$${base}^{${correctExp}}$`,
                `$${base}^{${exp1 * exp2}}$`,
                `$${base * 2}^{${correctExp}}$`,
                `$${base}^{${exp1 - exp2}}$`
            ]
        };
    };

    const applyQuotientRule = () => {
        const base = randomInt(2, 7);
        const exp1 = randomInt(5, 10);
        const exp2 = randomInt(2, exp1 - 1);
        const correctExp = exp1 - exp2;
        const correctAnswer = `$${base}^{${correctExp}}$`;

        return {
            text: `<div class='question-container'>
                      <p>Simplify: $\\frac{${base}^{${exp1}}}{${base}^{${exp2}}}$</p>
                   </div>`,
            correctAnswer,
            solution: `Using the Quotient Rule: $\\frac{a^m}{a^n} = a^{m-n}$<br/><br/>
                       $\\frac{${base}^{${exp1}}}{${base}^{${exp2}}} = ${base}^{${exp1}-${exp2}} = ${base}^{${correctExp}}$`,
            options: [
                `$${base}^{${correctExp}}$`,
                `$${base}^{${exp1 + exp2}}$`,
                `$1^{${correctExp}}$`,
                `$${base}^{${Math.floor(exp1 / exp2)}}$`
            ]
        };
    };

    const applyPowerRule = () => {
        const base = randomInt(2, 5);
        const exp1 = randomInt(2, 5);
        const exp2 = randomInt(2, 4);
        const correctExp = exp1 * exp2;
        const correctAnswer = `$${base}^{${correctExp}}$`;

        return {
            text: `<div class='question-container'>
                      <p>Simplify: $(${base}^{${exp1}})^{${exp2}}$</p>
                   </div>`,
            correctAnswer,
            solution: `Using the Power Rule: $(a^m)^n = a^{m \\times n}$<br/><br/>
                       $(${base}^{${exp1}})^{${exp2}} = ${base}^{${exp1} \\times ${exp2}} = ${base}^{${correctExp}}$`,
            options: [
                `$${base}^{${correctExp}}$`,
                `$${base}^{${exp1 + exp2}}$`,
                `$${base * exp1}^{${exp2}}$`,
                `$${base}^{${Math.pow(exp1, exp2)}}$`
            ]
        };
    };

    const applyPowerOfProduct = () => {
        const base1 = randomInt(2, 5);
        const base2 = randomInt(2, 6);
        const exp = randomInt(2, 4);
        const correctAnswer = `$${base1}^{${exp}} \\times ${base2}^{${exp}}$`;

        return {
            text: `<div class='question-container'>
                      <p>Expand: $(${base1} \\times ${base2})^{${exp}}$</p>
                   </div>`,
            correctAnswer,
            solution: `Using the Power of a Product Rule: $(ab)^m = a^m \\times b^m$<br/><br/>
                       $(${base1} \\times ${base2})^{${exp}} = ${base1}^{${exp}} \\times ${base2}^{${exp}}$`,
            options: [
                `$${base1}^{${exp}} \\times ${base2}^{${exp}}$`,
                `$${base1}^{${exp}} + ${base2}^{${exp}}$`,
                `$${base1 * base2} \\times ${exp}$`,
                `$${base1} \\times ${base2}^{${exp}}$`
            ]
        };
    };

    const applyPowerOfQuotient = () => {
        const num1 = randomInt(2, 9);
        const num2 = randomInt(2, 9);
        const exp = randomInt(2, 5);
        const correctAnswer = `$\\frac{${num1}^{${exp}}}{${num2}^{${exp}}}$`;

        return {
            text: `<div class='question-container'>
                      <p>Expand: $(\\frac{${num1}}{${num2}})^{${exp}}$</p>
                   </div>`,
            correctAnswer,
            solution: `Using the Power of a Quotient Rule: $(\\frac{a}{b})^m = \\frac{a^m}{b^m}$<br/><br/>
                       $(\\frac{${num1}}{${num2}})^{${exp}} = \\frac{${num1}^{${exp}}}{${num2}^{${exp}}}$`,
            options: [
                `$\\frac{${num1}^{${exp}}}{${num2}^{${exp}}}$`,
                `$\\frac{${num1}}{${num2}^{${exp}}}$`,
                `$\\frac{${num1}^{${exp}}}{${num2}}$`,
                `$\\frac{${num1 * exp}}{${num2 * exp}}$`
            ]
        };
    };

    const applyZeroExponent = () => {
        const base = randomInt(2, 20);
        const correctAnswer = "$1$";

        return {
            text: `<div class='question-container'>
                      <p>Evaluate: $${base}^0$</p>
                   </div>`,
            correctAnswer,
            solution: `Using the Zero Exponent Rule: $a^0 = 1$ (where $a \\neq 0$)<br/><br/>
                       $${base}^0 = 1$`,
            options: [
                "$1$",
                "$0$",
                `$${base}$`,
                "Undefined"
            ]
        };
    };

    const applyNegativeExponent = () => {
        const base = randomInt(2, 6);
        const exp = randomInt(2, 4);
        const correctAnswer = `$\\frac{1}{${base}^{${exp}}}$`;

        return {
            text: `<div class='question-container'>
                      <p>Rewrite with positive exponent: $${base}^{-${exp}}$</p>
                   </div>`,
            correctAnswer,
            solution: `Using the Negative Exponent Rule: $a^{-n} = \\frac{1}{a^n}$<br/><br/>
                       $${base}^{-${exp}} = \\frac{1}{${base}^{${exp}}}$`,
            options: [
                `$\\frac{1}{${base}^{${exp}}}$`,
                `$-${base}^{${exp}}$`,
                `$${base}^{${exp}}$`,
                `$\\frac{1}{-${base}^{${exp}}}$`
            ]
        };
    };

    const applyMixedLaws1 = () => {
        const base = randomInt(2, 7);
        const exp1 = randomInt(2, 6);
        const exp2 = randomInt(2, 7);
        const correctExp = exp1 + exp2;
        const correctAnswer = `$${base}^{${correctExp}}$`;

        return {
            text: `<div class='question-container'>
                      <p>Simplify: $${base}^{${exp1}} \\times ${base}^{${exp2}}$</p>
                   </div>`,
            correctAnswer,
            solution: `Using the Product Rule: $a^m \\times a^n = a^{m+n}$<br/><br/>
                       $${base}^{${exp1}} \\times ${base}^{${exp2}} = ${base}^{${exp1}+${exp2}} = ${base}^{${correctExp}}$`,
            options: [
                `$${base}^{${correctExp}}$`,
                `$${base}^{${exp1 * exp2}}$`,
                `$${base}^{${Math.abs(exp1 - exp2)}}$`,
                `$${base * 2}^{${correctExp}}$`
            ]
        };
    };

    const applyMixedLaws2 = () => {
        const base = randomInt(2, 5);
        const exp1 = randomInt(2, 5);
        const exp2 = randomInt(2, 4);
        const correctExp = exp1 * exp2;
        const correctAnswer = `$${base}^{${correctExp}}$`;

        return {
            text: `<div class='question-container'>
                      <p>Simplify: $(${base}^{${exp1}})^{${exp2}}$</p>
                   </div>`,
            correctAnswer,
            solution: `Using the Power Rule: $(a^m)^n = a^{m \\times n}$<br/><br/>
                       $(${base}^{${exp1}})^{${exp2}} = ${base}^{${exp1} \\times ${exp2}} = ${base}^{${correctExp}}$`,
            options: [
                `$${base}^{${correctExp}}$`,
                `$${base}^{${exp1 + exp2}}$`,
                `$${base}^{${Math.pow(exp1, exp2)}}$`,
                `$${base * exp2}^{${exp1}}$`
            ]
        };
    };

    const applyComplexLaws = () => {
        const base1 = randomInt(2, 5);
        const base2 = randomInt(2, 6);
        const exp = randomInt(3, 8);
        const correctAnswer = `$${base1}^{${exp}} \\times ${base2}^{${exp}}$`;

        return {
            text: `<div class='question-container'>
                      <p>Simplify: $(${base1} \\times ${base2})^{${exp}}$</p>
                   </div>`,
            correctAnswer,
            solution: `Using the Power of a Product Rule: $(ab)^m = a^m \\times b^m$<br/><br/>
                       $(${base1} \\times ${base2})^{${exp}} = ${base1}^{${exp}} \\times ${base2}^{${exp}}$`,
            options: [
                `$${base1}^{${exp}} \\times ${base2}^{${exp}}$`,
                `$${base1 * base2}^{${exp}}$`,
                `$${base1 + base2}^{${exp}}$`,
                `$${base1}^{${exp * base2}}$`
            ]
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
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);

            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
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
                <div className="header-left"></div>

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

export default LawsOfExponentsApplication;

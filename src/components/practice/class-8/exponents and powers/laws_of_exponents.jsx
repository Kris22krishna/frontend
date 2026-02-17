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

const LawsOfExponentsConceptual = () => {
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
    const SKILL_ID = 8002; // Grade 8 - Laws of Exponents (Conceptual)
    const SKILL_NAME = "Exponents and Powers - Laws of Exponents";

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

        switch (index) {
            case 0:
                qData = questionProductRule();
                break;
            case 1:
                qData = questionQuotientRule();
                break;
            case 2:
                qData = questionPowerRule();
                break;
            case 3:
                qData = questionPowerOfProduct();
                break;
            case 4:
                qData = questionPowerOfQuotient();
                break;
            case 5:
                qData = questionZeroExponent();
                break;
            case 6:
                qData = questionNegativeExponent();
                break;
            case 7:
                qData = questionIdentityExponent();
                break;
            case 8:
                qData = questionProductRuleVariation();
                break;
            case 9:
                qData = questionQuotientRuleVariation();
                break;
            default:
                qData = questionProductRule();
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

    const questionProductRule = () => {
        const correctAnswer = "$a^m \\times a^n = a^{m+n}$";

        return {
            text: `<div class='question-container'>
                      <p>What is the <strong>Product Rule</strong> for exponents?</p>
                   </div>`,
            correctAnswer,
            solution: `The <strong>Product Rule</strong> states that when multiplying powers with the same base, you <strong>add</strong> the exponents.<br/><br/>
                       $a^m \\times a^n = a^{m+n}$<br/><br/>
                       Example: $2^3 \\times 2^4 = 2^{3+4} = 2^7$`,
            options: [
                "$a^m \\times a^n = a^{m+n}$",
                "$a^m + a^n = a^{m+n}$",
                "$a^m \\times a^n = a^{m \\times n}$",
                "$a^m \\times a^n = a^{mn}$"
            ]
        };
    };

    const questionQuotientRule = () => {
        const correctAnswer = "$\\frac{a^m}{a^n} = a^{m-n}$";

        return {
            text: `<div class='question-container'>
                      <p>What is the <strong>Quotient Rule</strong> for exponents?</p>
                   </div>`,
            correctAnswer,
            solution: `The <strong>Quotient Rule</strong> states that when dividing powers with the same base, you <strong>subtract</strong> the exponents.<br/><br/>
                       $\\frac{a^m}{a^n} = a^{m-n}$<br/><br/>
                       Example: $\\frac{5^7}{5^3} = 5^{7-3} = 5^4$`,
            options: [
                "$\\frac{a^m}{a^n} = a^{m-n}$",
                "$\\frac{a^m}{a^n} = a^{m+n}$",
                "$\\frac{a^m}{a^n} = a^{m \\div n}$",
                "$\\frac{a^m}{a^n} = \\frac{m}{n}$"
            ]
        };
    };

    const questionPowerRule = () => {
        const correctAnswer = "$(a^m)^n = a^{m \\times n}$";

        return {
            text: `<div class='question-container'>
                      <p>What is the <strong>Power Rule</strong> for exponents?</p>
                   </div>`,
            correctAnswer,
            solution: `The <strong>Power Rule</strong> states that when raising a power to another power, you <strong>multiply</strong> the exponents.<br/><br/>
                       $(a^m)^n = a^{m \\times n}$<br/><br/>
                       Example: $(3^2)^4 = 3^{2 \\times 4} = 3^8$`,
            options: [
                "$(a^m)^n = a^{m \\times n}$",
                "$(a^m)^n = a^{m+n}$",
                "$(a^m)^n = a^{m-n}$",
                "$(a^m)^n = a^{m^n}$"
            ]
        };
    };

    const questionPowerOfProduct = () => {
        const correctAnswer = "$(ab)^m = a^m \\times b^m$";

        return {
            text: `<div class='question-container'>
                      <p>What is the <strong>Power of a Product Rule</strong>?</p>
                   </div>`,
            correctAnswer,
            solution: `The <strong>Power of a Product Rule</strong> states that when raising a product to a power, you raise each factor to that power.<br/><br/>
                       $(ab)^m = a^m \\times b^m$<br/><br/>
                       Example: $(2 \\times 3)^4 = 2^4 \\times 3^4$`,
            options: [
                "$(ab)^m = a^m \\times b^m$",
                "$(ab)^m = (a \\times b)^m$",
                "$(ab)^m = a^m + b^m$",
                "$(ab)^m = ab^m$"
            ]
        };
    };

    const questionPowerOfQuotient = () => {
        const correctAnswer = "$(\\frac{a}{b})^m = \\frac{a^m}{b^m}$";

        return {
            text: `<div class='question-container'>
                      <p>What is the <strong>Power of a Quotient Rule</strong>?</p>
                   </div>`,
            correctAnswer,
            solution: `The <strong>Power of a Quotient Rule</strong> states that when raising a quotient to a power, you raise both the numerator and denominator to that power.<br/><br/>
                       $(\\frac{a}{b})^m = \\frac{a^m}{b^m}$<br/><br/>
                       Example: $(\\frac{4}{5})^3 = \\frac{4^3}{5^3}$`,
            options: [
                "$(\\frac{a}{b})^m = \\frac{a^m}{b^m}$",
                "$(\\frac{a}{b})^m = \\frac{a}{b^m}$",
                "$(\\frac{a}{b})^m = \\frac{a^m}{b}$",
                "$(\\frac{a}{b})^m = \\frac{a-b}{m}$"
            ]
        };
    };

    const questionZeroExponent = () => {
        const correctAnswer = "$a^0 = 1$ (where $a \\neq 0$)";

        return {
            text: `<div class='question-container'>
                      <p>What is the <strong>Zero Exponent Rule</strong>?</p>
                   </div>`,
            correctAnswer,
            solution: `The <strong>Zero Exponent Rule</strong> states that any non-zero number raised to the power of 0 equals 1.<br/><br/>
                       $a^0 = 1$ (where $a \\neq 0$)<br/><br/>
                       Example: $5^0 = 1$, $100^0 = 1$`,
            options: [
                "$a^0 = 1$ (where $a \\neq 0$)",
                "$a^0 = 0$",
                "$a^0 = a$",
                "$a^0$ is undefined"
            ]
        };
    };

    const questionNegativeExponent = () => {
        const correctAnswer = "$a^{-n} = \\frac{1}{a^n}$";

        return {
            text: `<div class='question-container'>
                      <p>What is the <strong>Negative Exponent Rule</strong>?</p>
                   </div>`,
            correctAnswer,
            solution: `The <strong>Negative Exponent Rule</strong> states that a negative exponent means taking the reciprocal of the base with a positive exponent.<br/><br/>
                       $a^{-n} = \\frac{1}{a^n}$<br/><br/>
                       Example: $2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}$`,
            options: [
                "$a^{-n} = \\frac{1}{a^n}$",
                "$a^{-n} = -a^n$",
                "$a^{-n} = a^n$",
                "$a^{-n} = -(\\frac{1}{a^n})$"
            ]
        };
    };

    const questionIdentityExponent = () => {
        const correctAnswer = "$a^1 = a$";

        return {
            text: `<div class='question-container'>
                      <p>What is the value of any number raised to the power of 1?</p>
                   </div>`,
            correctAnswer,
            solution: `The <strong>Identity Exponent Rule</strong> states that any number raised to the power of 1 equals itself.<br/><br/>
                       $a^1 = a$<br/><br/>
                       Example: $7^1 = 7$, $x^1 = x$`,
            options: [
                "$a^1 = a$",
                "$a^1 = 1$",
                "$a^1 = 0$",
                "$a^1 = a^2$"
            ]
        };
    };

    const questionProductRuleVariation = () => {
        const correctAnswer = "$x^3 \\times x^5 = x^8$";

        return {
            text: `<div class='question-container'>
                      <p>According to the Product Rule, which of these is correct?</p>
                   </div>`,
            correctAnswer,
            solution: `Using the Product Rule: When multiplying powers with the same base, add the exponents.<br/><br/>
                       $x^3 \\times x^5 = x^{3+5} = x^8$`,
            options: [
                "$x^3 \\times x^5 = x^8$",
                "$x^3 \\times x^5 = x^{15}$",
                "$x^3 + x^5 = x^8$",
                "$x^3 \\times x^5 = 2x^8$"
            ]
        };
    };

    const questionQuotientRuleVariation = () => {
        const correctAnswer = "$\\frac{y^9}{y^4} = y^5$";

        return {
            text: `<div class='question-container'>
                      <p>According to the Quotient Rule, which of these is correct?</p>
                   </div>`,
            correctAnswer,
            solution: `Using the Quotient Rule: When dividing powers with the same base, subtract the exponents.<br/><br/>
                       $\\frac{y^9}{y^4} = y^{9-4} = y^5$`,
            options: [
                "$\\frac{y^9}{y^4} = y^5$",
                "$\\frac{y^9}{y^4} = y^{13}$",
                "$\\frac{y^9}{y^4} = y^{\\frac{9}{4}}$",
                "$\\frac{y^9}{y^4} = \\frac{9}{4}y$"
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

export default LawsOfExponentsConceptual;

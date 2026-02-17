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

const StandardFormSmallNumbers = () => {
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
    const SKILL_ID = 8003; // Grade 8 - Standard Form for Small Numbers
    const SKILL_NAME = "Exponents - Standard Form for Small Numbers";

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
                // Basic decimal to standard form
                qData = generateDecimalToStandard(0.5, 1);
                break;
            case 1:
                qData = generateDecimalToStandard(0.03, 2);
                break;
            case 2:
                qData = generateDecimalToStandard(0.007, 3);
                break;
            case 3:
                // Standard form to decimal
                qData = generateStandardToDecimal(4, -2);
                break;
            case 4:
                qData = generateStandardToDecimal(6.5, -3);
                break;
            case 5:
                // Scientific notation identification
                qData = generateIdentifyStandardForm();
                break;
            case 6:
                // Compare exponents
                qData = generateCompareExponents();
                break;
            case 7:
                // Real world application
                qData = generateRealWorldSmall();
                break;
            case 8:
                // Conversion challenge
                qData = generateConversionChallenge();
                break;
            case 9:
                // Mixed operation
                qData = generateMixedStandardForm();
                break;
            default:
                qData = generateDecimalToStandard(0.1, 1);
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

    const generateDecimalToStandard = (decimal, expectedExp) => {
        const coefficient = decimal * Math.pow(10, expectedExp);
        const correctAnswer = `$${coefficient} \\times 10^{-${expectedExp}}$`;

        const wrongOptions = [
            `$${coefficient * 10} \\times 10^{-${expectedExp + 1}}$`,
            `$${coefficient} \\times 10^{${expectedExp}}$`,
            `$${decimal} \\times 10^{0}$`
        ];

        return {
            text: `<div class='question-container'>
                      <p>Express $${decimal}$ in standard form (scientific notation)</p>
                   </div>`,
            correctAnswer,
            solution: `To convert a small decimal to standard form:<br/><br/>
                       1. Move the decimal point to the right until you have a number between 1 and 10<br/>
                       2. Count how many places you moved (this becomes the negative exponent)<br/><br/>
                       $${decimal} = ${coefficient} \\times 10^{-${expectedExp}}$`,
            options: [correctAnswer, ...wrongOptions]
        };
    };

    const generateStandardToDecimal = (coefficient, exponent) => {
        const decimalValue = coefficient * Math.pow(10, exponent);
        const formattedDecimal = decimalValue.toFixed(Math.max(0, -exponent + 2)).replace(/\.?0+$/, '');
        const correctAnswer = `$${formattedDecimal}$`;

        const wrong1 = (coefficient * Math.pow(10, exponent + 1)).toFixed(Math.max(0, -(exponent + 1) + 2)).replace(/\.?0+$/, '');
        const wrong2 = (coefficient * Math.pow(10, -exponent)).toFixed(Math.max(0, exponent + 2)).replace(/\.?0+$/, '');
        const wrongOptions = [
            `$${wrong1}$`,
            `$${wrong2}$`,
            `$${coefficient}$`
        ];

        return {
            text: `<div class='question-container'>
                      <p>Convert $${coefficient} \\times 10^{${exponent}}$ to decimal form</p>
                   </div>`,
            correctAnswer,
            solution: `To convert from standard form to decimal:<br/><br/>
                       Move the decimal point ${Math.abs(exponent)} places to the ${exponent < 0 ? 'left' : 'right'}.<br/><br/>
                       $${coefficient} \\times 10^{${exponent}} = ${formattedDecimal}$`,
            options: [correctAnswer, ...wrongOptions]
        };
    };

    const generateIdentifyStandardForm = () => {
        const correctAnswer = "$3.2 \\times 10^{-4}$";

        return {
            text: `<div class='question-container'>
                      <p>Which of the following is in proper standard form?</p>
                   </div>`,
            correctAnswer,
            solution: `Standard form requires a coefficient between 1 and 10, multiplied by a power of 10.<br/><br/>
                       $3.2 \\times 10^{-4}$ is correct because $1 \\leq 3.2 < 10$.`,
            options: [
                "$3.2 \\times 10^{-4}$",
                "$32 \\times 10^{-5}$",
                "$0.32 \\times 10^{-3}$",
                "$320 \\times 10^{-6}$"
            ]
        };
    };

    const generateCompareExponents = () => {
        const correctAnswer = "$5 \\times 10^{-3} > 2 \\times 10^{-4}$";

        return {
            text: `<div class='question-container'>
                      <p>Which comparison is correct?</p>
                   </div>`,
            correctAnswer,
            solution: `When comparing numbers in standard form with different exponents:<br/><br/>
                       $5 \\times 10^{-3} = 0.005$<br/>
                       $2 \\times 10^{-4} = 0.0002$<br/><br/>
                       Therefore, $5 \\times 10^{-3} > 2 \\times 10^{-4}$`,
            options: [
                "$5 \\times 10^{-3} > 2 \\times 10^{-4}$",
                "$5 \\times 10^{-3} < 2 \\times 10^{-4}$",
                "$5 \\times 10^{-3} = 2 \\times 10^{-4}$",
                "Cannot be compared"
            ]
        };
    };

    const generateRealWorldSmall = () => {
        const correctAnswer = "$6.2 \\times 10^{-7}$ meters";

        return {
            text: `<div class='question-container'>
                      <p>A bacterium measures 0.00000062 meters in length. Express this in standard form.</p>
                   </div>`,
            correctAnswer,
            solution: `Move the decimal point 7 places to the right to get a number between 1 and 10:<br/><br/>
                       $0.00000062 = 6.2 \\times 10^{-7}$ meters`,
            options: [
                "$6.2 \\times 10^{-7}$ meters",
                "$62 \\times 10^{-8}$ meters",
                "$6.2 \\times 10^{7}$ meters",
                "$0.62 \\times 10^{-6}$ meters"
            ]
        };
    };

    const generateConversionChallenge = () => {
        const correctAnswer = "$0.00045$";

        return {
            text: `<div class='question-container'>
                      <p>What is $4.5 \\times 10^{-4}$ in decimal form?</p>
                   </div>`,
            correctAnswer,
            solution: `Move the decimal point 4 places to the left:<br/><br/>
                       $4.5 \\times 10^{-4} = 0.00045$`,
            options: [
                "$0.00045$",
                "$0.000045$",
                "$0.0045$",
                "$4500$"
            ]
        };
    };

    const generateMixedStandardForm = () => {
        const correctAnswer = "$8 \\times 10^{-5}$";

        return {
            text: `<div class='question-container'>
                      <p>Simplify: $(2 \\times 10^{-3}) \\times (4 \\times 10^{-2})$</p>
                   </div>`,
            correctAnswer,
            solution: `Multiply coefficients and add exponents:<br/><br/>
                       $(2 \\times 4) \\times 10^{-3 + (-2)}$<br/>
                       $= 8 \\times 10^{-5}$`,
            options: [
                "$8 \\times 10^{-5}$",
                "$8 \\times 10^{-6}$",
                "$6 \\times 10^{-5}$",
                "$8 \\times 10^{5}$"
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
                <div className="header-left">
                    {/* Empty or Logo */}
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

export default StandardFormSmallNumbers;

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

const AssociativityComponent = () => {
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
    const SKILL_ID = 8007; // Grade 8 - Rational Numbers - Associativity
    const SKILL_NAME = "Rational Numbers - Associativity";

    const TOTAL_QUESTIONS = 5;
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
                qData = questionEasy1();
                break;
            case 1:
                qData = questionEasy2();
                break;
            case 2:
                qData = questionMedium1();
                break;
            case 3:
                qData = questionMedium2();
                break;
            case 4:
                qData = questionHard1();
                break;
            default:
                qData = questionEasy1();
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

    // EASY 1: Basic concept of associative property for addition
    const questionEasy1 = () => {
        const correctAnswer = "$(\\frac{1}{2} + \\frac{1}{3}) + \\frac{1}{4} = \\frac{1}{2} + (\\frac{1}{3} + \\frac{1}{4})$";

        return {
            text: `<div class='question-container'>
                      <p>Which equation demonstrates the <strong>associative property</strong> of addition?</p>
                   </div>`,
            correctAnswer,
            solution: `The <strong>associative property of addition</strong> states that when adding three or more numbers, the grouping doesn't change the sum.<br/><br/>
                       For rational numbers: $(a + b) + c = a + (b + c)$<br/><br/>
                       Example: $(\\frac{1}{2} + \\frac{1}{3}) + \\frac{1}{4} = \\frac{1}{2} + (\\frac{1}{3} + \\frac{1}{4})$`,
            options: [
                "$(\\frac{1}{2} + \\frac{1}{3}) + \\frac{1}{4} = \\frac{1}{2} + (\\frac{1}{3} + \\frac{1}{4})$",
                "$\\frac{1}{2} + \\frac{1}{3} = \\frac{1}{3} + \\frac{1}{2}$",
                "$\\frac{1}{2} + 0 = \\frac{1}{2}$",
                "$\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{3} \\times \\frac{1}{2}$"
            ]
        };
    };

    // EASY 2: Basic concept of associative property for multiplication
    const questionEasy2 = () => {
        const correctAnswer = "$(\\frac{2}{3} \\times \\frac{3}{5}) \\times \\frac{5}{7} = \\frac{2}{3} \\times (\\frac{3}{5} \\times \\frac{5}{7})$";

        return {
            text: `<div class='question-container'>
                      <p>The associative property of <strong>multiplication</strong> for rational numbers is shown by:</p>
                   </div>`,
            correctAnswer,
            solution: `The <strong>associative property of multiplication</strong> states that when multiplying three or more numbers, the grouping doesn't change the product.<br/><br/>
                       For rational numbers: $(a \\times b) \\times c = a \\times (b \\times c)$<br/><br/>
                       Example: $(\\frac{2}{3} \\times \\frac{3}{5}) \\times \\frac{5}{7} = \\frac{2}{3} \\times (\\frac{3}{5} \\times \\frac{5}{7})$`,
            options: [
                "$(\\frac{2}{3} \\times \\frac{3}{5}) \\times \\frac{5}{7} = \\frac{2}{3} \\times (\\frac{3}{5} \\times \\frac{5}{7})$",
                "$\\frac{2}{3} \\times \\frac{3}{5} = \\frac{3}{5} \\times \\frac{2}{3}$",
                "$\\frac{2}{3} \\times 1 = \\frac{2}{3}$",
                "$\\frac{2}{3} \\times (\\frac{3}{5} + \\frac{5}{7}) = \\frac{2}{3} \\times \\frac{3}{5} + \\frac{2}{3} \\times \\frac{5}{7}$"
            ]
        };
    };

    // MEDIUM 1: Verifying associative property with calculation
    const questionMedium1 = () => {
        const correctAnswer = "$\\frac{13}{12}$";

        return {
            text: `<div class='question-container'>
                      <p>Calculate $(\\frac{1}{4} + \\frac{1}{2}) + \\frac{1}{3}$ using the associative property. What is the result?</p>
                   </div>`,
            correctAnswer,
            solution: `Using the associative property, we can group in any order.<br/><br/>
                       First, calculate $(\\frac{1}{4} + \\frac{1}{2})$:<br/>
                       $\\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4}$<br/><br/>
                       Now add $\\frac{1}{3}$:<br/>
                       $\\frac{3}{4} + \\frac{1}{3}$<br/><br/>
                       Finding common denominator (LCM of 4 and 3 is 12):<br/>
                       $\\frac{9}{12} + \\frac{4}{12} = \\frac{13}{12}$`,
            options: [
                "$\\frac{13}{12}$",
                "$\\frac{11}{12}$",
                "$\\frac{7}{12}$",
                "$1$"
            ]
        };
    };

    // MEDIUM 2: Identifying non-associative operation
    const questionMedium2 = () => {
        const correctAnswer = "Subtraction";

        return {
            text: `<div class='question-container'>
                      <p>Which operation on rational numbers is <strong>NOT associative</strong>?</p>
                   </div>`,
            correctAnswer,
            solution: `<strong>Subtraction</strong> is not associative because changing the grouping changes the result.<br/><br/>
                       Example: $(\\frac{5}{6} - \\frac{1}{3}) - \\frac{1}{4} \\neq \\frac{5}{6} - (\\frac{1}{3} - \\frac{1}{4})$<br/><br/>
                       Left side: $(\\frac{5}{6} - \\frac{2}{6}) - \\frac{1}{4} = \\frac{3}{6} - \\frac{1}{4} = \\frac{1}{2} - \\frac{1}{4} = \\frac{1}{4}$<br/><br/>
                       Right side: $\\frac{5}{6} - (\\frac{2}{6} - \\frac{1.5}{6}) = \\frac{5}{6} - \\frac{1}{12} = \\frac{9}{12}$<br/><br/>
                       <em>Division is also not associative.</em>`,
            options: [
                "Subtraction",
                "Addition",
                "Multiplication",
                "Both addition and multiplication"
            ]
        };
    };

    // HARD 1: Complex application
    const questionHard1 = () => {
        const correctAnswer = "$\\frac{2}{5}$";

        return {
            text: `<div class='question-container'>
                      <p>If $(a \\times b) \\times c = a \\times (b \\times c)$ where $a = \\frac{2}{3}$, $b = \\frac{3}{4}$, and $c = \\frac{4}{5}$, what is the value of $a \\times b \\times c$?</p>
                   </div>`,
            correctAnswer,
            solution: `The associative property tells us $(a \\times b) \\times c = a \\times (b \\times c)$, so we can calculate in any order.<br/><br/>
                       Given: $a = \\frac{2}{3}$, $b = \\frac{3}{4}$, $c = \\frac{4}{5}$<br/><br/>
                       Notice we can cancel common factors:<br/>
                       $\\frac{2}{\\cancel{3}} \\times \\frac{\\cancel{3}}{\\cancel{4}} \\times \\frac{\\cancel{4}}{5} = \\frac{2}{5}$<br/><br/>
                       Or calculate step by step:<br/>
                       $\\frac{2 \\times 3 \\times 4}{3 \\times 4 \\times 5} = \\frac{24}{60} = \\frac{2}{5}$`,
            options: [
                "$\\frac{2}{5}$",
                "$\\frac{1}{2}$",
                "$\\frac{3}{5}$",
                "$\\frac{1}{5}$"
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
                difficulty_level: qIndex < 2 ? 'Easy' : qIndex < 4 ? 'Medium' : 'Hard',
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

export default AssociativityComponent;

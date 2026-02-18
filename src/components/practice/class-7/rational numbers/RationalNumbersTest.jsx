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

const RationalNumbersTest = () => {
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
    const SKILL_ID = 'local-rn-test';
    const SKILL_NAME = "Class 7 - Rational Numbers - Chapter Test";
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

            // Generate 16 questions, 2 from each of the 8 topics

            const generators = [
                // Topic 1: Need for Rational Numbers
                // Q1: Concept
                () => ({
                    type: "Review Topic 1",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>Which set of numbers includes integers and fractions?</p></div>`,
                    correctAnswer: `Rational Numbers`,
                    solution: `Rational numbers include integers and fractions.`,
                    options: shuffle([`Rational Numbers`, `Whole Numbers`, `Natural Numbers`, `Irrational Numbers`])
                }),
                // Q2: Application
                () => {
                    const deposit = rand(500, 1000);
                    return {
                        type: "Review Topic 1b",
                        difficulty_level: "Easy",
                        text: `<div class='question-container'><p>If depositing ₹${deposit} is represented by $+\\frac{${deposit}}{1}$, how is withdrawing ₹${Math.floor(deposit / 2)} represented?</p></div>`,
                        correctAnswer: `$-\\frac{${Math.floor(deposit / 2)}}{1}$`,
                        solution: `Withdrawal is the opposite of deposit, so it is negative.`,
                        options: shuffle([`$-\\frac{${Math.floor(deposit / 2)}}{1}$`, `$+\\frac{${Math.floor(deposit / 2)}}{1}$`, `$\\frac{1}{${Math.floor(deposit / 2)}}$`, `None`])
                    };
                },

                // Topic 2: What are Rational Numbers
                // Q3: Definition
                () => ({
                    type: "Review Topic 2",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>A number of the form p/q is rational if p and q are integers and:</p></div>`,
                    correctAnswer: `q ≠ 0`,
                    solution: `The denominator q must not be zero.`,
                    options: shuffle([`q ≠ 0`, `q = 0`, `p ≠ 0`, `p > q`])
                }),
                // Q4: Equivalent
                () => {
                    const n2 = rand(2, 5), d2 = rand(3, 7);
                    const m = rand(2, 4);
                    return {
                        type: "Review Topic 2b",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'><p>Which is equivalent to $\\frac{${n2}}{${d2}}$?</p></div>`,
                        correctAnswer: `$\\frac{${n2 * m}}{${d2 * m}}$`,
                        solution: `Multiplying num and den by ${m} gives $\\frac{${n2 * m}}{${d2 * m}}$.`,
                        options: shuffle([`$\\frac{${n2 * m}}{${d2 * m}}$`, `$\\frac{${n2 + m}}{${d2 + m}}$`, `$\\frac{${n2}}{${d2 + 1}}$`, `$\\frac{${d2}}{${n2}}$`])
                    };
                },

                // Topic 3: Positive and Negative
                // Q5: Positive check
                () => ({
                    type: "Review Topic 3",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>Which of the following is a positive rational number?</p></div>`,
                    correctAnswer: `$\\frac{-3}{-5}$`,
                    solution: `$\\frac{-3}{-5} = \\frac{3}{5}$, which is positive.`,
                    options: shuffle([`$\\frac{-3}{-5}$`, `$\\frac{-3}{5}$`, `$\\frac{3}{-5}$`, `-5`])
                }),
                // Q6: Negative
                () => ({
                    type: "Review Topic 3b",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>Is $\\frac{0}{-5}$ positive or negative?</p></div>`,
                    correctAnswer: `Neither positive nor negative`,
                    solution: `0 is neither positive nor negative.`,
                    options: shuffle([`Neither positive nor negative`, `Positive`, `Negative`, `Both`])
                }),

                // Topic 4: Number Line
                // Q7: Location
                () => ({
                    type: "Review Topic 4",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>On a number line, where does $\\frac{-1}{2}$ lie?</p></div>`,
                    correctAnswer: `To the left of 0`,
                    solution: `Negative numbers are to the left of 0.`,
                    options: shuffle([`To the left of 0`, `To the right of 0`, `At 0`, `Undefined`])
                }),
                // Q8: Between integers
                () => {
                    const num = rand(3, 5), den = 2; // e.g. 3/2 = 1.5
                    return {
                        type: "Review Topic 4b",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'><p>Between which two consecutive integers does $\\frac{${num}}{${den}}$ lie?</p></div>`,
                        correctAnswer: `${Math.floor(num / den)} and ${Math.ceil(num / den)}`,
                        solution: `$\\frac{${num}}{${den}} = ${num / den}$, which is between ${Math.floor(num / den)} and ${Math.ceil(num / den)}.`,
                        options: shuffle([`${Math.floor(num / den)} and ${Math.ceil(num / den)}`, `${Math.floor(num / den) - 1} and ${Math.floor(num / den)}`, `${Math.ceil(num / den)} and ${Math.ceil(num / den) + 1}`, `0 and 1`])
                    };
                },

                // Topic 5: Standard Form
                // Q9: Standard check
                () => ({
                    type: "Review Topic 5",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>Reduce $\\frac{-12}{30}$ to standard form.</p></div>`,
                    correctAnswer: `$\\frac{-2}{5}$`,
                    solution: `Divide by HCF(12,30)=6: $\\frac{-12 \\div 6}{30 \\div 6} = \\frac{-2}{5}$.`,
                    options: shuffle([`$\\frac{-2}{5}$`, `$\\frac{-4}{10}$`, `$\\frac{2}{-5}$`, `$\\frac{-6}{15}$`])
                }),
                // Q10: Condition
                () => ({
                    type: "Review Topic 5b",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>For standard form, the denominator must be:</p></div>`,
                    correctAnswer: `Positive`,
                    solution: `In standard form, the denominator is always positive.`,
                    options: shuffle([`Positive`, `Negative`, `Zero`, `Even`])
                }),

                // Topic 6: Comparison
                // Q11: Compare
                () => ({
                    type: "Review Topic 6",
                    difficulty_level: "Medium",
                    text: `<div class='question-container'><p>Which is greater: $\\frac{-2}{3}$ or $\\frac{-4}{5}$?</p></div>`,
                    correctAnswer: `$\\frac{-2}{3}$`,
                    solution: `$-0.66... > -0.8$. So $\\frac{-2}{3}$ is greater.`,
                    options: shuffle([`$\\frac{-2}{3}$`, `$\\frac{-4}{5}$`, `Equal`, `Undefined`])
                }),
                // Q12: Order
                () => ({
                    type: "Review Topic 6b",
                    difficulty_level: "Medium",
                    text: `<div class='question-container'><p>Ascending order of $\\frac{-1}{2}, \\frac{1}{2}, 0$ is:</p></div>`,
                    correctAnswer: `$\\frac{-1}{2}, 0, \\frac{1}{2}$`,
                    solution: `Negative < Zero < Positive.`,
                    options: shuffle([`$\\frac{-1}{2}, 0, \\frac{1}{2}$`, `$\\frac{1}{2}, 0, \\frac{-1}{2}$`, `$0, \\frac{-1}{2}, \\frac{1}{2}$`, `None`])
                }),

                // Topic 7: Rational numbers between
                // Q13: Count
                () => ({
                    type: "Review Topic 7",
                    difficulty_level: "Easy",
                    text: `<div class='question-container'><p>How many rational numbers are between 0 and 1?</p></div>`,
                    correctAnswer: `Infinite`,
                    solution: `There are infinitely many rational numbers between any two distinct rational numbers.`,
                    options: shuffle([`Infinite`, `Zero`, `One`, `Ten`])
                }),
                // Q14: Find one
                () => ({
                    type: "Review Topic 7b",
                    difficulty_level: "Medium",
                    text: `<div class='question-container'><p>Find a rational number between $\\frac{1}{3}$ and $\\frac{1}{2}$.</p></div>`,
                    correctAnswer: `$\\frac{5}{12}$`,
                    solution: `Average: $\\frac{1}{2}(\\frac{1}{3}+\\frac{1}{2}) = \\frac{1}{2}(\\frac{5}{6}) = \\frac{5}{12}$.`,
                    options: shuffle([`$\\frac{5}{12}$`, `$\\frac{2}{5}$`, `$\\frac{3}{5}$`, `$\\frac{1}{6}$`])
                }),

                // Topic 8: Operations
                // Q15: Add/Sub
                () => {
                    const o1 = rand(1, 5);
                    return {
                        type: "Review Topic 8",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'><p>Solve: $\\frac{2}{3} + (\\frac{-${o1}}{3})$</p></div>`,
                        correctAnswer: `$\\frac{${2 - o1}}{3}$`,
                        solution: `$\\frac{2 + (-${o1})}{3} = \\frac{${2 - o1}}{3}$.`,
                        options: shuffle([`$\\frac{${2 - o1}}{3}$`, `$\\frac{${2 + o1}}{3}$`, `$\\frac{${2 - o1}}{6}$`, `$\\frac{2}{${3 + o1}}$`])
                    };
                },
                // Q16: Mult/Div
                () => ({
                    type: "Review Topic 8b",
                    difficulty_level: "Medium",
                    text: `<div class='question-container'><p>Product of reciprocal of $\\frac{-2}{3}$ and $\\frac{4}{5}$.</p></div>`,
                    correctAnswer: `$\\frac{-6}{5}$`,
                    solution: `Reciprocal of $\\frac{-2}{3}$ is $\\frac{-3}{2}$. Multiply by $\\frac{4}{5}$: $\\frac{-3}{2} \\times \\frac{4}{5} = \\frac{-12}{10} = \\frac{-6}{5}$.`,
                    options: shuffle([`$\\frac{-6}{5}$`, `$\\frac{-8}{15}$`, `$\\frac{6}{5}$`, `$\\frac{-2}{15}$`])
                })
            ];

            // Pick 10 random questions
            const selectedGenerators = shuffle(generators).slice(0, 10);
            selectedGenerators.forEach(gen => newQuestions.push(gen()));

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
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Rational Numbers</span>
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

export default RationalNumbersTest;

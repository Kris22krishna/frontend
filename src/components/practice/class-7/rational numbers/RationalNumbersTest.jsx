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
    const [isFinished, setIsFinished] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [fromReview, setFromReview] = useState(false);

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

            // Pick 25 questions: all 16 generators + 9 more random picks
            generators.forEach(gen => newQuestions.push(gen()));
            const extraGenerators = shuffle(generators).slice(0, 9);
            extraGenerators.forEach(gen => newQuestions.push(gen()));

            setQuestions(newQuestions);
        };
        generateQuestions();
    }, []);

    // ... Standard boilerplate methods ...
    useEffect(() => {
        if (isFinished) return;
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
    }, [sessionId, isFinished]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect, isSkipped = false) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) {
            timeSpent += Date.now() - questionStartTime.current;
        }
        const seconds = Math.max(0, Math.round(timeSpent / 1000));

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
                time_spent_seconds: seconds
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

    const handleQuestionComplete = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const currentQuestion = questions[qIndex];

        const isRight = selectedOption === currentQuestion.correctAnswer;

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.max(0, Math.round(timeSpent / 1000));

        const updatedAnswers = { ...answers, [qIndex]: { selectedOption, isCorrect: isRight, timeSpent: seconds, isSkipped: false } };
        setAnswers(updatedAnswers);
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);

        if (fromReview) {
            setFromReview(false);
            setShowReview(true);
            return;
        }

        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const skippedIndices = questions.map((_, i) => i).filter(i => !updatedAnswers[i] || updatedAnswers[i].isSkipped);
            if (skippedIndices.length > 0) {
                setShowReview(true);
            } else {
                handleFinalSubmit();
            }
        }
    };

    const handleSkip = () => {
        const currentQuestion = questions[qIndex];

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.max(0, Math.round(timeSpent / 1000));

        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption: 'Skipped', isCorrect: false, timeSpent: seconds, isSkipped: true } }));
        recordQuestionAttempt(currentQuestion, 'Skipped', false, true);

        if (fromReview) {
            setFromReview(false);
            setShowReview(true);
            return;
        }
        handleNext();
    };

    useEffect(() => {
        const saved = answers[qIndex];
        if (saved && !saved.isSkipped) {
            setSelectedOption(saved.selectedOption);
        } else {
            setSelectedOption(null);
        }
        setIsCorrect(false);
        setIsSubmitted(false);
    }, [qIndex]);

    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const skippedIndices = questions.map((_, i) => i).filter(i => !answers[i] || answers[i].isSkipped);
            if (skippedIndices.length > 0) {
                setShowReview(true);
            } else {
                await handleFinalSubmit();
            }
        }
    };

    const handleFinalSubmit = async () => {
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
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
            } catch (err) { console.error("Failed to create report", err); }
        }
        setIsFinished(true);
        setShowReview(false);
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (questions.length === 0) return <div>Loading...</div>;

    if (isFinished) {
        const attempted = Object.values(answers).filter(a => !a.isSkipped).length;
        const correct = Object.values(answers).filter(a => a.isCorrect).length;
        const wrong = attempted - correct;
        const skipped = Object.values(answers).filter(a => a.isSkipped).length;

        return (
            <div className="junior-practice-page raksha-theme p-3 sm:p-8 pb-24 sm:pb-32" style={{ fontFamily: '"Open Sans", sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh', overflowY: 'auto' }}>
                <div className="max-w-3xl mx-auto w-full">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-[#4FB7B3]/20 my-4 sm:my-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <img src={mascotImg} alt="Mascot" className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 object-contain" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#31326F] mb-1 sm:mb-2 text-balance">Test Complete!</h2>
                            <p className="text-sm sm:text-base text-gray-500 line-clamp-2">How you performed in<br />{SKILL_NAME}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
                            <div className="bg-blue-50 p-2 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-blue-100">
                                <div className="text-blue-500 font-bold text-[10px] sm:text-sm mb-0.5 sm:mb-1 uppercase tracking-wider">Total Time</div>
                                <div className="text-lg sm:text-2xl font-black text-[#31326F]">{formatTime(timeElapsed)}</div>
                            </div>
                            <div className="bg-green-50 p-2 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-green-100">
                                <div className="text-green-500 font-bold text-[10px] sm:text-sm mb-0.5 sm:mb-1 uppercase tracking-wider">Correct</div>
                                <div className="text-lg sm:text-2xl font-black text-[#31326F]">{correct}</div>
                            </div>
                            <div className="bg-red-50 p-2 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-red-100">
                                <div className="text-red-500 font-bold text-[10px] sm:text-sm mb-0.5 sm:mb-1 uppercase tracking-wider">Wrong</div>
                                <div className="text-lg sm:text-2xl font-black text-[#31326F]">{wrong}</div>
                            </div>
                            <div className="bg-gray-50 p-2 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-gray-100">
                                <div className="text-gray-500 font-bold text-[10px] sm:text-sm mb-0.5 sm:mb-1 uppercase tracking-wider">Skipped</div>
                                <div className="text-lg sm:text-2xl font-black text-[#31326F]">{skipped}</div>
                            </div>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            <h3 className="text-lg sm:text-xl font-bold text-[#31326F] border-b pb-2">Detailed Report</h3>
                            {questions.map((q, idx) => {
                                const ans = answers[idx] || { isSkipped: true, selectedOption: 'Not Attempted', isCorrect: false, timeSpent: 0 };
                                return (
                                    <div key={idx} className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:border-[#4FB7B3]/30 transition-all bg-white shadow-sm">
                                        <div className="flex justify-between items-start gap-2 mb-3 sm:mb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#31326F] text-white flex items-center justify-center font-bold text-xs sm:text-sm">{idx + 1}</span>
                                                <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-semibold text-gray-500">
                                                    Time: {ans.timeSpent}s
                                                </div>
                                            </div>
                                            {ans.isSkipped ? (
                                                <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-[9px] sm:text-xs uppercase">Skipped</span>
                                            ) : ans.isCorrect ? (
                                                <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-green-100 text-green-600 font-bold text-[9px] sm:text-xs uppercase">Correct</span>
                                            ) : (
                                                <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-red-100 text-red-600 font-bold text-[9px] sm:text-xs uppercase">Incorrect</span>
                                            )}
                                        </div>
                                        <div className="text-[#31326F] mb-3 sm:mb-4 font-medium text-sm sm:text-base leading-relaxed"><LatexContent html={q.text} /></div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm">
                                            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-100">
                                                <span className="text-gray-400 block mb-0.5 sm:mb-1 text-[9px] sm:text-xs">Your Answer:</span>
                                                <span className={ans.isCorrect ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                                                    <LatexContent html={ans.selectedOption} />
                                                </span>
                                            </div>
                                            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-green-50 border border-green-100">
                                                <span className="text-green-400 block mb-0.5 sm:mb-1 text-[9px] sm:text-xs">Correct Answer:</span>
                                                <span className="text-green-700 font-bold"><LatexContent html={q.correctAnswer} /></span>
                                            </div>
                                        </div>
                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-amber-50/50 border border-amber-100 text-[#31326F] text-xs sm:text-sm italic">
                                            <span className="font-bold block mb-0.5 sm:mb-1 not-italic text-amber-700">Explanation:</span>
                                            <LatexContent html={q.solution} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 sm:mt-10 flex justify-center">
                            <button className="bg-[#31326F] text-white w-full sm:w-auto px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl hover:scale-105 active:scale-95 transition-all shadow-xl" onClick={() => navigate(-1)}>Done</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Review screen for unanswered questions
    if (showReview) {
        const skippedIndices = questions.map((_, i) => i).filter(i => !answers[i] || answers[i].isSkipped);
        return (
            <div className="junior-practice-page raksha-theme p-3 sm:p-8" style={{ fontFamily: '"Open Sans", sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
                <div className="max-w-3xl mx-auto w-full">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-[#4FB7B3]/20 my-4 sm:my-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <Eye className="text-amber-600" size={36} />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#31326F] mb-2">Review Your Test</h2>
                            <p className="text-gray-500 text-base sm:text-lg">You have <span className="font-bold text-amber-600">{skippedIndices.length}</span> unanswered question{skippedIndices.length > 1 ? 's' : ''}.</p>
                        </div>

                        <div className="mb-6 sm:mb-8">
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tap to answer</p>
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
                                {skippedIndices.map(idx => (
                                    <button
                                        key={idx}
                                        onClick={() => { setQIndex(idx); setShowReview(false); setFromReview(true); }}
                                        className="aspect-square rounded-xl border-2 border-amber-200 bg-amber-50 text-[#31326F] font-bold text-lg sm:text-xl hover:bg-amber-100 hover:border-amber-300 active:scale-95 transition-all flex items-center justify-center shadow-sm"
                                    >
                                        Q{idx + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button
                                onClick={() => { setQIndex(questions.length - 1); setShowReview(false); }}
                                className="px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-[#31326F] text-[#31326F] font-bold text-base sm:text-lg hover:bg-gray-50 transition-all"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={handleFinalSubmit}
                                className="px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#31326F] text-white font-black text-base sm:text-lg hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 justify-center"
                            >
                                Submit Anyway <Check size={22} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

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
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`}
                                            style={{ fontWeight: '500' }}
                                            onClick={() => handleOptionSelect(option)}
                                        >
                                            <LatexContent html={option} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>Exit Test</button>
                    <div className="bottom-center"></div>
                    <div className="nav-buttons-group">
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-700 border-2 border-gray-300"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ opacity: qIndex === 0 ? 0.5 : 1 }}
                        >
                            <ChevronLeft size={28} strokeWidth={3} /> Prev
                        </button>
                        <button className="nav-pill-next-btn bg-gray-500 text-white border-2 border-gray-600" onClick={handleSkip}>
                            Skip <ChevronRight size={28} strokeWidth={3} />
                        </button>
                        <button className="nav-pill-next-btn" onClick={handleQuestionComplete} disabled={!selectedOption}>
                            {qIndex < questions.length - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}
                        </button>
                    </div>
                </div>

                <div className="mobile-footer-controls">
                    <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>
                    <div className="nav-buttons-group">
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-700 p-2 border border-gray-300"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ opacity: qIndex === 0 ? 0.5 : 1, minWidth: 'auto' }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button className="nav-pill-next-btn bg-gray-500 text-white p-2 border border-gray-600" onClick={handleSkip}>Skip</button>
                        <button className="nav-pill-next-btn" onClick={handleQuestionComplete} disabled={!selectedOption}>
                            {qIndex < questions.length - 1 ? "Next" : "Done"}
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default RationalNumbersTest;

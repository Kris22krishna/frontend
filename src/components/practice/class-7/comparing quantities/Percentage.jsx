import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
// Adjust imports as needed based on file location
import Whiteboard from '../../../Whiteboard';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import mascotImg from '../../../../assets/mascot.png';
import { FullScreenScratchpad } from '../../../FullScreenScratchpad';
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

const Percentage = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 26; // TODO: Check correct skill ID
    const SKILL_NAME = "Class 7 - Comparing Quantities - Percentage";
    const [answers, setAnswers] = useState({});

    // Generate random questions
    // Generate random questions
    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const shuffle = (array) => array.sort(() => Math.random() - 0.5);

            for (let i = 0; i < 10; i++) {
                let q = {};

                // Ordered Subtopics (1-7)
                if (i === 0) {
                    // Subtopic 1: Meaning of Percentage
                    const total = 100;
                    const part = rand(10, 90);
                    q = {
                        type: "Meaning of Percentage",
                        difficulty_level: "Easy",
                        text: `<div class='question-container'>
                                  <p>Out of ${total} students in a class, ${part} are boys. What percentage of the students are boys?</p>
                               </div>`,
                        correctAnswer: `$${part}\\%$`,
                        solution: `Percentage means "per 100".\nSince there are ${part} boys out of ${total} students, the percentage is directly ${part}%.\n$$\\frac{${part}}{${total}} \\times 100\\% = ${part}\\%$$`,
                        options: shuffle([`$${part}\\%$`, `$${100 - part}\\%$`, `$${part / 10}\\%$`, `$${part + 10}\\%$`])
                    };
                } else if (i === 1) {
                    // Subtopic 2: Percent when total != 100
                    const niceTotals = [10, 20, 25, 50];
                    const T = niceTotals[rand(0, 3)];
                    const P = rand(1, T - 1);
                    const pct = (P / T) * 100;
                    q = {
                        type: "Total not 100",
                        difficulty_level: "Easy",
                        text: `<div class='question-container'>
                                  <p>Out of ${T} beads, ${P} are red. What is the percentage of red beads?</p>
                               </div>`,
                        correctAnswer: `$${pct}\\%$`,
                        solution: `To find the percentage, divide the part by the whole and multiply by 100.\n$$\\frac{${P}}{${T}} \\times 100\\% = ${P * (100 / T)}\\% = ${pct}\\%$$`,
                        options: shuffle([`$${pct}\\%$`, `$${pct / 2}\\%$`, `$${100 - pct}\\%$`, `$${pct + 10}\\%$`])
                    };
                } else if (i === 2) {
                    // Subtopic 3: Fractions to percentage
                    const den = [4, 5, 10, 20, 25, 50][rand(0, 5)];
                    const num = rand(1, den - 1);
                    const pct = (num / den) * 100;
                    q = {
                        type: "Fraction to Percentage",
                        difficulty_level: "Easy",
                        text: `<div class='question-container'>
                                  <p>Convert the fraction $\\frac{${num}}{${den}}$ into a percentage.</p>
                               </div>`,
                        correctAnswer: `$${pct}\\%$`,
                        solution: `To convert a fraction to a percentage, multiply by 100.\n$$\\frac{${num}}{${den}} \\times 100\\% = ${num} \\times ${100 / den}\\% = ${pct}\\%$$`,
                        options: shuffle([`$${pct}\\%$`, `$${pct * 2}\\%$`, `$${pct / 2}\\%$`, `$${num * 10}\\%$`])
                    };
                } else if (i === 3) {
                    // Subtopic 4: Decimals to percentage
                    const val = (rand(1, 99) / 100).toFixed(2);
                    const pct = Math.round(val * 100);
                    q = {
                        type: "Decimal to Percentage",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'>
                                  <p>Convert the decimal $${val}$ into a percentage.</p>
                               </div>`,
                        correctAnswer: `$${pct}\\%$`,
                        solution: `To convert a decimal to a percentage, multiply by 100:\n$$${val} \\times 100\\% = ${pct}\\%$$`,
                        options: shuffle([`$${pct}\\%$`, `$${(pct / 10).toFixed(1)}\\%$`, `$${pct * 10}\\%$`, `$${100 - pct}\\%$`])
                    };
                } else if (i === 4) {
                    // Subtopic 5: Percentage to fraction/decimal
                    const mode = rand(0, 1) === 0 ? "fraction" : "decimal";
                    const pct = [10, 20, 25, 40, 50, 60, 75, 80][rand(0, 7)];
                    if (mode === "fraction") {
                        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
                        const common = gcd(pct, 100);
                        const num = pct / common;
                        const den = 100 / common;
                        q = {
                            type: "Percentage to Fraction",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Convert $${pct}\\%$ into a fraction in simplest form.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{${num}}{${den}}$`,
                            solution: `Write as a fraction with denominator 100 and simplify:\n$$${pct}\\% = \\frac{${pct}}{100} = \\frac{${pct} \\div ${common}}{100 \\div ${common}} = \\frac{${num}}{${den}}$$`,
                            options: shuffle([`$\\frac{${num}}{${den}}$`, `$\\frac{${den}}{${num}}$`, `$\\frac{${num}}{${den * 2}}$`, `$\\frac{${num * 2}}{${den}}$`])
                        };
                    } else {
                        const dec = pct / 100;
                        q = {
                            type: "Percentage to Decimal",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Convert $${pct}\\%$ into a decimal.</p>
                                   </div>`,
                            correctAnswer: `$${dec}$`,
                            solution: `Divide by 100:\n$$${pct}\\% = \\frac{${pct}}{100} = ${dec}$$`,
                            options: shuffle([`$${dec}$`, `$${dec * 10}$`, `$${dec / 10}$`, `$${100 - pct}$`])
                        };
                    }
                } else if (i === 5) {
                    // Subtopic 6: Parts adding to whole
                    const pct1 = rand(10, 80);
                    const pct2 = 100 - pct1;
                    const item1 = ["boys", "apples", "red"][rand(0, 2)];
                    const item2 = item1 === "boys" ? "girls" : item1 === "apples" ? "oranges" : "blue";
                    q = {
                        type: "Parts adding to whole",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'>
                                  <p>If ${pct1}% of a group are ${item1}, what percentage are ${item2}?</p>
                               </div>`,
                        correctAnswer: `$${pct2}\\%$`,
                        solution: `The total percentage must be 100%.\n$$100\\% - ${pct1}\\% = ${pct2}\\%$$`,
                        options: shuffle([`$${pct2}\\%$`, `$${pct1}\\%$`, `$${pct2 / 2}\\%$`, `$${pct1 + 10}\\%$`])
                    };
                } else if (i === 6) {
                    // Subtopic 7: Estimation
                    const parts = [2, 4, 5, 10][rand(0, 3)];
                    const shaded = rand(1, parts - 1);
                    const pct = (shaded / parts) * 100;
                    q = {
                        type: "Estimation",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'>
                                  <p>Estimate the percentage of the shaded part if ${shaded} part(s) out of ${parts} equal parts are shaded.</p>
                               </div>`,
                        correctAnswer: `$${pct}\\%$`,
                        solution: `Fraction shaded is $\\frac{${shaded}}{${parts}}$.\nPercentage = $\\frac{${shaded}}{${parts}} \\times 100\\% = ${pct}\\%$`,
                        options: shuffle([`$${pct}\\%$`, `$${pct * 2}\\%$`, `$${(parts - shaded) / parts * 100}\\%$`, `$20\\%$`])
                    };
                } else {
                    // Q8-10: Harder Mix (Recap of tougher concepts)
                    let type = rand(1, 3);
                    if (type === 1) {
                        // Applied percentage
                        const total = rand(2, 20) * 10;
                        const pct = rand(1, 9) * 10;
                        const ans = (pct / 100) * total;
                        q = {
                            type: "Applied Percentage",
                            difficulty_level: "Hard",
                            text: `<div class='question-container'>
                                      <p>Find ${pct}% of ${total}.</p>
                                   </div>`,
                            correctAnswer: `$${ans}$`,
                            solution: `$$\\frac{${pct}}{100} \\times ${total} = ${ans}$$`,
                            options: shuffle([`$${ans}$`, `$${ans * 10}$`, `$${ans / 2}$`, `$${total - ans}$`])
                        };
                    } else if (type === 2) {
                        // Improper Percentage to Fraction
                        const pct = rand(11, 20) * 10 + 5; // e.g. 115, 125...
                        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
                        const common = gcd(pct, 100);
                        q = {
                            type: "Improper Percentage",
                            difficulty_level: "Hard",
                            text: `<div class='question-container'>
                                      <p>Convert ${pct}% into a fraction.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{${pct / common}}{${100 / common}}$`,
                            solution: `$$${pct}\\% = \\frac{${pct}}{100} = \\frac{${pct / common}}{${100 / common}}$$`,
                            options: shuffle([`$\\frac{${pct / common}}{${100 / common}}$`, `$\\frac{${100 / common}}{${pct / common}}$`, `$\\frac{${pct / common}}{10}$`, `$\\frac{${pct}}{10}$`])
                        };
                    } else {
                        // Three parts
                        const p1 = rand(20, 30);
                        const p2 = rand(20, 30);
                        const p3 = 100 - p1 - p2;
                        q = {
                            type: "Multiple Parts",
                            difficulty_level: "Hard",
                            text: `<div class='question-container'>
                                      <p>A mixture contains ${p1}% sand, ${p2}% gravel, and the rest is cement. What percentage is cement?</p>
                                   </div>`,
                            correctAnswer: `$${p3}\\%$`,
                            solution: `Total is 100%.\n$$100\\% - (${p1} + ${p2})\\% = ${p3}\\%$$`,
                            options: shuffle([`$${p3}\\%$`, `$${p1 + p2}\\%$`, `$${p3 + 10}\\%$`, `$${Math.abs(p1 - p2)}\\%$`])
                        };
                    }
                }
                newQuestions.push(q);
            }
            setQuestions(newQuestions);
        };
        generateQuestions();
    }, []);

    // ... (rest of the logic same as original file, just adapting to 'questions' state)

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
    }, [sessionId]); // Added sessionId dependency to avoid loop if it changes, though mostly runs once.
    // Actually empty dep array in original is fine for mount.


    // ... helper functions
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
                                                } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''
                                                }`}
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
                onNext={() => {
                    setShowExplanationModal(false);
                }}
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
                                    {qIndex < questions.length - 1 ? (
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

export default Percentage;

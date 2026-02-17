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

const UseOfPercentages = () => {
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
    const SKILL_ID = 27; // Placeholder ID
    const SKILL_NAME = "Class 7 - Comparing Quantities - Use of Percentages";
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
                // 5 Subtopics, 2 questions each

                if (i < 2) {
                    // Subtopic 1: Interpreting percentages
                    if (i === 0) {
                        q = {
                            type: "Interpreting Percentages",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>If 5% of income is saved, what does it mean?</p>
                                   </div>`,
                            correctAnswer: `5 out of every 100 units of income are saved`,
                            solution: `Percentage means "per 100".\n5% saved means for every 100 units earned, 5 are saved.\n$$5\\% = \\frac{5}{100}$$`,
                            options: shuffle([`5 out of every 100 units of income are saved`, `50 out of every 100 units are saved`, `5 units are saved in total`, `Income is 5 times the savings`])
                        };
                    } else {
                        q = {
                            type: "Interpreting Percentages",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>If 20% of dresses in a shop are blue, what fractional part of the dresses are blue?</p>
                                   </div>`,
                            correctAnswer: `$\\frac{1}{5}$`,
                            solution: `$$20\\% = \\frac{20}{100} = \\frac{1}{5}$$`,
                            options: shuffle([`$\\frac{1}{5}$`, `$\\frac{1}{4}$`, `$\\frac{1}{20}$`, `$\\frac{2}{5}$`])
                        };
                    }
                } else if (i < 4) {
                    // Subtopic 2: Finding quantity from percent
                    const total = rand(2, 20) * 10;
                    const pct = [10, 20, 25, 50, 75][rand(0, 4)];
                    const ans = (pct / 100) * total;
                    q = {
                        type: "Quantity from Percent",
                        difficulty_level: "Easy",
                        text: `<div class='question-container'>
                                  <p>Find $${pct}\\%$ of $${total}$.</p>
                               </div>`,
                        correctAnswer: `${ans}`,
                        solution: `$$${pct}\\% \\times ${total} = \\frac{${pct}}{100} \\times ${total} = ${ans}$$`,
                        options: shuffle([`${ans}`, `${ans * 2}`, `${ans / 2}`, `${total - ans}`])
                    };
                } else if (i < 6) {
                    // Subtopic 3: Finding whole from percent
                    const pct = [10, 20, 25, 40, 50][rand(0, 4)];
                    const whole = rand(2, 10) * 50;
                    const part = (pct / 100) * whole;
                    q = {
                        type: "Finding Whole",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'>
                                  <p>$${pct}\\%$ of a number is $${part}$. Find the number.</p>
                               </div>`,
                        correctAnswer: `${whole}`,
                        solution: `Let the number be $x$.\n$$${pct}\\% \\times x = ${part}$$\n$$\\frac{${pct}}{100} \\times x = ${part}$$\n$$x = \\frac{${part} \\times 100}{${pct}} = ${whole}$$`,
                        options: shuffle([`${whole}`, `${whole * 2}`, `${whole / 2}`, `${part * 10}`])
                    };
                } else if (i < 8) {
                    // Subtopic 4: Ratios to percentages
                    // e.g. 2:3 or 3:5
                    const a = rand(1, 5);
                    const b = rand(1, 5);
                    const totalParts = a + b;
                    // Ensure nice percentages if possible, but standard is fine
                    // Let's pick ratios that sum to factors of 100 for cleaner numbers: 1:1(2), 1:3(4), 1:4(5), 2:3(5), 3:7(10), etc.
                    const niceRatios = [[1, 1], [1, 3], [1, 4], [2, 3], [3, 2], [3, 7], [7, 3], [9, 1]];
                    const pair = niceRatios[rand(0, niceRatios.length - 1)];
                    const [r1, r2] = pair;
                    const T = r1 + r2;
                    const p1 = (r1 / T) * 100;
                    const p2 = (r2 / T) * 100;

                    if (i % 2 === 0) {
                        q = {
                            type: "Ratio to Percentage",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Convert the ratio $${r1} : ${r2}$ into percentages.</p>
                                   </div>`,
                            correctAnswer: `${p1}% and ${p2}%`,
                            solution: `Total parts = $${r1} + ${r2} = ${T}$.\nFirst part: $\\frac{${r1}}{${T}} \\times 100\\% = ${p1}\\%$\nSecond part: $\\frac{${r2}}{${T}} \\times 100\\% = ${p2}\\%$`,
                            options: shuffle([`${p1}% and ${p2}%`, `${r1}% and ${r2}%`, `${p2}% and ${p1}%`, `${p1 * 10}% and ${p2 * 10}%`])
                        };
                    } else {
                        // Distribute quantity
                        const amount = rand(2, 10) * 100;
                        const share1 = (r1 / T) * amount;
                        q = {
                            type: "Ratio Distribution",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Divide ₹${amount} in the ratio $${r1} : ${r2}$. What is the first part?</p>
                                   </div>`,
                            correctAnswer: `₹${share1}`,
                            solution: `Total parts = $${T}$.\nFirst share = $\\frac{${r1}}{${T}} \\times ${amount} = ${share1}$`,
                            options: shuffle([`₹${share1}`, `₹${(r2 / T) * amount}`, `₹${share1 / 2}`, `₹${amount - share1 + 10}`])
                        };
                    }
                } else {
                    // Subtopic 5: Increase/Decrease percent
                    // Q9, Q10
                    const original = rand(4, 20) * 10;
                    const isInc = i === 8; // one inc, one dec
                    let changePct = [10, 20, 25, 50][rand(0, 3)];
                    let changeAmount = (changePct / 100) * original;
                    let final = isInc ? original + changeAmount : original - changeAmount;

                    q = {
                        type: isInc ? "Percentage Increase" : "Percentage Decrease",
                        difficulty_level: "Hard",
                        text: `<div class='question-container'>
                                  <p>${isInc ? 'Price' : 'Population'} changed from ${original} to ${final}. Find the percentage ${isInc ? 'increase' : 'decrease'}.</p>
                               </div>`,
                        correctAnswer: `${changePct}%`,
                        solution: `Change = $|${final} - ${original}| = ${changeAmount}$.\nPercentage ${isInc ? 'increase' : 'decrease'} = $\\frac{\\text{Change}}{\\text{Original}} \\times 100 = \\frac{${changeAmount}}{${original}} \\times 100 = ${changePct}\\%$`,
                        options: shuffle([`${changePct}%`, `${changePct * 2}%`, `${changePct / 2}%`, `${100 - changePct}%`])
                    };
                }
                newQuestions.push(q);
            }
            setQuestions(newQuestions);
        };
        generateQuestions();
    }, []);

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
                <div className="header-left"></div>
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

export default UseOfPercentages;

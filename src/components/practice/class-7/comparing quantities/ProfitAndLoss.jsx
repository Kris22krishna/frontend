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

const ProfitAndLoss = () => {
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
    const SKILL_ID = 28; // Placeholder
    const SKILL_NAME = "Class 7 - Comparing Quantities - Profit and Loss";
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const shuffle = (array) => array.sort(() => Math.random() - 0.5);

            for (let i = 0; i < 10; i++) {
                let q = {};

                if (i < 3) {
                    // Subtopic 1: Cost Price and Selling Price (Identify Profit/Loss)
                    const cp = rand(5, 50) * 10;
                    const isProfit = Math.random() > 0.5;
                    const amount = rand(1, 5) * 5;
                    const sp = isProfit ? cp + amount : cp - amount;

                    q = {
                        type: "CP and SP",
                        difficulty_level: "Easy",
                        text: `<div class='question-container'>
                                  <p>Cost Price (CP) = ₹${cp}<br>Selling Price (SP) = ₹${sp}<br>Find the ${isProfit ? 'Profit' : 'Loss'}.</p>
                               </div>`,
                        correctAnswer: `₹${amount}`,
                        solution: isProfit
                            ? `$$SP > CP \\implies \\text{Profit}$$\n$$\\text{Profit} = SP - CP = ${sp} - ${cp} = ${amount}$$`
                            : `$$CP > SP \\implies \\text{Loss}$$\n$$\\text{Loss} = CP - SP = ${cp} - ${sp} = ${amount}$$`,
                        options: shuffle([`₹${amount}`, `₹${amount + 10}`, `₹${amount * 2}`, `₹${Math.abs(cp - sp) + 5}`])
                    };
                } else if (i < 6) {
                    // Subtopic 2: Profit or Loss (Larger numbers / variation)
                    const cp = rand(5, 20) * 50; // 250 to 1000
                    const isProfit = Math.random() > 0.5;
                    const amount = rand(2, 10) * 10;
                    const sp = isProfit ? cp + amount : cp - amount;

                    q = {
                        type: "Profit or Loss Amount",
                        difficulty_level: "Easy",
                        text: `<div class='question-container'>
                                  <p>CP = ₹${cp}, SP = ₹${sp}. Find the ${isProfit ? 'Profit' : 'Loss'}.</p>
                               </div>`,
                        correctAnswer: `₹${amount}`,
                        solution: isProfit
                            ? `$$SP > CP \\implies \\text{Profit}$$\n$$\\text{Profit} = SP - CP = ${sp} - ${cp} = ${amount}$$`
                            : `$$CP > SP \\implies \\text{Loss}$$\n$$\\text{Loss} = CP - SP = ${cp} - ${sp} = ${amount}$$`,
                        options: shuffle([`₹${amount}`, `₹${amount + 50}`, `₹${amount / 2}`, `₹${amount * 10}`])
                    };
                } else if (i < 8) {
                    // Subtopic 3: Profit% / Loss%
                    // CP = 72, profit = 8. Find profit %.
                    const pct = [5, 10, 20, 25, 50][rand(0, 4)];
                    const cp = rand(5, 50) * 10;
                    const amount = (pct / 100) * cp;
                    // Ensure integer amount
                    const isProfit = i === 6; // one profit, one loss

                    q = {
                        type: isProfit ? "Profit %" : "Loss %",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'>
                                  <p>CP = ₹${cp}, ${isProfit ? 'Profit' : 'Loss'} = ₹${amount}. Find the ${isProfit ? 'Profit' : 'Loss'} percentage.</p>
                               </div>`,
                        correctAnswer: `${pct}%`,
                        solution: `$$\\text{Percentage} = \\frac{\\text{${isProfit ? 'Profit' : 'Loss'}}}{\\text{CP}} \\times 100$$\n$$= \\frac{${amount}}{${cp}} \\times 100 = ${pct}\\%$$`,
                        options: shuffle([`${pct}%`, `${pct + 5}%`, `${pct / 2}%`, `${100 - pct}%`])
                    };
                } else {
                    // Subtopic 4: Finding SP or CP using percent
                    // Q9: Find SP, Q10: Find CP
                    if (i === 8) {
                        // Find SP
                        const cp = rand(10, 50) * 10;
                        const pct = [10, 20, 25][rand(0, 2)];
                        const isProfit = Math.random() > 0.5;
                        const amount = (pct / 100) * cp;
                        const sp = isProfit ? cp + amount : cp - amount;
                        q = {
                            type: "Find SP",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>CP = ₹${cp}, ${isProfit ? 'Profit' : 'Loss'} = ${pct}%. Find SP.</p>
                                   </div>`,
                            correctAnswer: `₹${sp}`,
                            solution: `$$${isProfit ? 'Profit' : 'Loss'} = ${pct}\\% \\text{ of } ${cp} = ${amount}$$\n$$SP = CP ${isProfit ? '+' : '-'} ${isProfit ? 'Profit' : 'Loss'} = ${cp} ${isProfit ? '+' : '-'} ${amount} = ${sp}$$`,
                            options: shuffle([`₹${sp}`, `₹${cp}`, `₹${sp + 10}`, `₹${sp - 10}`])
                        };
                    } else {
                        // Find CP
                        const cp = rand(10, 40) * 20;
                        const pct = [10, 20, 25][rand(0, 2)];
                        const isProfit = Math.random() > 0.5;
                        const amount = (pct / 100) * cp;
                        const sp = isProfit ? cp + amount : cp - amount;

                        q = {
                            type: "Find CP",
                            difficulty_level: "Hard",
                            text: `<div class='question-container'>
                                      <p>SP = ₹${sp}, ${isProfit ? 'Profit' : 'Loss'} = ${pct}%. Find CP.</p>
                                   </div>`,
                            correctAnswer: `₹${cp}`,
                            solution: isProfit
                                ? `$$SP = CP \\times (1 + \\frac{R}{100}) \\implies ${sp} = CP \\times ${1 + pct / 100}$$\n$$CP = \\frac{${sp}}{${1 + pct / 100}} = ${cp}$$`
                                : `$$SP = CP \\times (1 - \\frac{R}{100}) \\implies ${sp} = CP \\times ${1 - pct / 100}$$\n$$CP = \\frac{${sp}}{${1 - pct / 100}} = ${cp}$$`,
                            options: shuffle([`₹${cp}`, `₹${sp}`, `₹${cp + 50}`, `₹${Math.abs(cp - 50)}`])
                        };
                    }
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

export default ProfitAndLoss;

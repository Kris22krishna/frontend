import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import Class8PracticeReportModal from '../Class8PracticeReportModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing! Decimal Expert! ✨",
    "🌟 Brilliant! You've got this! 🌟",
    "🎉 Correct! Precision mastered! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const generateQuestionData = () => {
    return [
        {
            text: "To find $\\sqrt{17.64}$, how many decimal places will the root have?",
            options: ["1", "2", "0", "4"],
            correctAnswer: "1",
            solution: "The given number has $2$ decimal places. So, its square root will have $2/2 = 1$ decimal place.",
        },
        {
            text: "Find the square root of $2.25$.",
            options: ["1.5", "0.15", "15", "0.015"],
            correctAnswer: "1.5",
            solution: "We know $\\sqrt{225} = 15$. Since $2.25$ has $2$ decimal places, the root has $1$ decimal place: $1.5$.",
        },
        {
            text: "Find the square root of $0.09$.",
            options: ["0.3", "0.03", "0.003", "3"],
            correctAnswer: "0.3",
            solution: "$\\sqrt{9} = 3$. The number $0.09$ has $2$ decimal places, so the root has $1$ decimal place: $0.3$.",
        },
        {
            text: "Find the square root of $42.25$.",
            options: ["6.5", "6.25", "7.5", "5.5"],
            correctAnswer: "6.5",
            solution: "$\\sqrt{4225} = 65$. The root of $42.25$ is $6.5$.",
        },
        {
            text: "The area of a square is $31.36\\text{ m}^2$. What is the side?",
            options: ["5.6 m", "5.4 m", "5.8 m", "4.6 m"],
            correctAnswer: "5.6 m",
            solution: "Area $= \\text{side}^2$. Side $= \\sqrt{31.36} = 5.6\\text{ m}$.",
        },
        {
            text: "Calculate $\\sqrt{51.84}$.",
            options: ["7.2", "7.4", "7.6", "7.8"],
            correctAnswer: "7.2",
            solution: "$70^2 = 4900$. The number $5184$ ends in $4$, so its root ends in $2$ or $8$. $72^2 = 5184$. Thus $\\sqrt{51.84} = 7.2$.",
        },
        {
            text: "Calculate $\\sqrt{0.0004}$.",
            options: ["0.02", "0.2", "0.002", "0.04"],
            correctAnswer: "0.02",
            solution: "The given number has $4$ decimal places, so the root will have $2$. $\\sqrt{4} = 2$, so $0.02$.",
        },
        {
            text: "Estimate $\\sqrt{90}$ to the nearest whole number.",
            options: ["9", "10", "8", "11"],
            correctAnswer: "9",
            solution: "$9^2 = 81$ and $10^2 = 100$. Since $90$ is closer to $81$ than $100$ ($9$ diff vs $10$ diff), the nearest whole number is $9$.",
        },
        {
            text: "Evaluate $\\sqrt{1.44} + \\sqrt{0.0144}$.",
            options: ["1.32", "1.212", "0.132", "2.4"],
            correctAnswer: "1.32",
            solution: "$\\sqrt{1.44} = 1.2$ and $\\sqrt{0.0144} = 0.12$. Adding them: $1.2 + 0.12 = 1.32$.",
        },
        {
            text: "If the area of a square is $12.25\\text{ m}^2$, find its perimeter.",
            options: ["14 m", "12 m", "3.5 m", "17.5 m"],
            correctAnswer: "14 m",
            solution: "Side $= \\sqrt{12.25} = 3.5\\text{ m}$. Perimeter $= 4 \\times \\text{side} = 4 \\times 3.5 = 14\\text{ m}$.",
        }
    ];
};

const SquareRootOfDecimals = () => {
    const navigate = useNavigate();
    const getSessionData = (key, defaultValue) => {
        const data = sessionStorage.getItem(key);
        return data !== null ? JSON.parse(data) : defaultValue;
    };

    const storageKey = `practice_${window.location.pathname}`;

    const [qIndex, setQIndex] = useState(() => getSessionData(`${storageKey}_qIndex`, 0));
    const [history, setHistory] = useState(() => getSessionData(`${storageKey}_history`, {}));
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(() => getSessionData(`${storageKey}_timeElapsed`, 0));
    const [questions, setQuestions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showReportModal, setShowReportModal] = useState(false);

    // Logging states
    const [sessionId, setSessionId] = useState(() => getSessionData(`${storageKey}_sessionId`, null));
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1254;
    const SKILL_NAME = "Square Root of Decimals";
    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState(() => getSessionData(`${storageKey}_answers`, {}));

    useEffect(() => {
        if (qIndex !== undefined && history && answers) {
            sessionStorage.setItem(`${storageKey}_qIndex`, JSON.stringify(qIndex));
            sessionStorage.setItem(`${storageKey}_history`, JSON.stringify(history));
            sessionStorage.setItem(`${storageKey}_answers`, JSON.stringify(answers));
            sessionStorage.setItem(`${storageKey}_timeElapsed`, JSON.stringify(timeElapsed));
            if (sessionId) sessionStorage.setItem(`${storageKey}_sessionId`, JSON.stringify(sessionId));
        }
    }, [qIndex, history, answers, sessionId]);

    const clearProgress = () => {
        sessionStorage.removeItem(`${storageKey}_qIndex`);
        sessionStorage.removeItem(`${storageKey}_history`);
        sessionStorage.removeItem(`${storageKey}_answers`);
        sessionStorage.removeItem(`${storageKey}_timeElapsed`);
        sessionStorage.removeItem(`${storageKey}_sessionId`);
    };

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
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

        // Pre-shuffling questions once on mount
        const prepared = generateQuestionData().map(q => ({
            ...q,
            options: [...q.options].sort(() => Math.random() - 0.5)
        }));
        setQuestions(prepared);

        return () => {
            clearInterval(timer);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        const isHistory = history[qIndex];
        if (isHistory) {
            setSelectedOption(isHistory.selectedOption);
            setIsSubmitted(isHistory.isSubmitted);
            setIsCorrect(isHistory.isCorrect);
            setFeedbackMessage(isHistory.feedbackMessage || "");
        } else {
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            setFeedbackMessage("");
        }
        questionStartTime.current = Date.now();
        accumulatedTime.current = 0;
    }, [qIndex]);

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
        const currentQ = questions[qIndex];
        if (!selectedOption || !currentQ) return;

        const isRight = selectedOption === currentQ.correctAnswer;

        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));

        const feedbackMsg = isRight ? CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)] : "";

        if (isRight) {
            setFeedbackMessage(feedbackMsg);
        } else {
            setShowExplanationModal(true);
        }

        setHistory(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: selectedOption,
                isSubmitted: true,
                isCorrect: isRight,
                feedbackMessage: feedbackMsg
            }
        }));

        recordQuestionAttempt(currentQ, selectedOption, isRight);
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
    };

    const handleNext = async () => {
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
            setShowReportModal(true);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    const currentQuestion = questions[qIndex];
    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <style>{`
                .junior-practice-page * {
                    font-family: 'Open Sans', sans-serif !important;
                    font-weight: 400 !important;
                }
                .junior-practice-page .skill-name-label,
                .junior-practice-page .timer-text,
                .junior-practice-page .footer-pill-btn,
                .junior-practice-page .nav-pill-submit-btn,
                .junior-practice-page .nav-pill-next-btn,
                .junior-practice-page .nav-pill-prev-btn {
                    font-weight: 400 !important;
                }
            `}</style>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span className="text-[#31326F] font-normal text-lg sm:text-xl">Square Root of Decimals</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{ width: '100%' }}
                            >
                                <div className="question-card-modern flex flex-col w-full bg-white rounded-3xl p-6 sm:p-10 shadow-lg" style={{ height: 'auto', minHeight: '100%', paddingLeft: '2rem', overflow: 'hidden' }}>
                                    <div className="question-header-modern mb-8 w-full" style={{ flexShrink: 0, overflow: 'hidden' }}>
                                        <h2 className="text-xl sm:text-2xl font-normal text-[#31326F] text-center w-full break-words">
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>

                                    {currentQuestion.image ? (
                                        <div className="flex flex-col md:flex-row w-full items-center justify-center gap-6 lg:gap-10 mt-4">
                                            <div className="chart-container flex-1 w-full max-w-xl flex justify-center items-center">
                                                <img
                                                    src={currentQuestion.image}
                                                    alt="Question visual"
                                                    className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-md"
                                                />
                                            </div>
                                            <div className="interaction-area-modern flex-1 w-full max-sm flex flex-col items-center">
                                                <div className="options-grid-modern flex flex-col gap-3 w-full">
                                                    {currentQuestion.options.map((option, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => !isSubmitted && handleOptionSelect(option)}
                                                            disabled={isSubmitted}
                                                            className={`p-3 rounded-xl border-2 text-base font-normal transition-all transform hover:scale-[1.01] flex items-center justify-center min-h-[48px] w-full 
                                                                ${isSubmitted
                                                                    ? option === currentQuestion.correctAnswer
                                                                        ? 'bg-green-100 border-green-500 text-green-700'
                                                                        : selectedOption === option
                                                                            ? 'bg-red-100 border-red-500 text-red-700'
                                                                            : 'bg-gray-50 border-gray-200 text-gray-400'
                                                                    : selectedOption === option
                                                                        ? 'bg-indigo-50 border-[#4FB7B3] text-[#31326F] shadow-md'
                                                                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#4FB7B3] hover:shadow-sm'
                                                                }
                                                            `}
                                                            style={{ fontFamily: '"Open Sans", sans-serif' }}
                                                        >
                                                            <LatexContent html={option} />
                                                        </button>
                                                    ))}
                                                </div>
                                                {isSubmitted && isCorrect && (
                                                    <motion.div
                                                        initial={{ scale: 0.5, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        className="feedback-mini correct mt-6 w-full text-center p-2 rounded-full font-normal bg-[#E8F5E9] border-2 border-[#81C784] text-[#2E7D32] flex items-center justify-center gap-2 shadow-sm"
                                                    >
                                                        ✨ {feedbackMessage} ✨
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col w-full items-center justify-center mt-2 w-full max-w-3xl mx-auto">
                                            <div className="w-full border-t-2 border-dashed border-gray-100 my-6"></div>
                                            <div className="options-grid-modern w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {currentQuestion.options.map((option, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => !isSubmitted && handleOptionSelect(option)}
                                                        disabled={isSubmitted}
                                                        className={`p-4 rounded-2xl border-2 text-base font-normal transition-all transform hover:scale-[1.01] flex items-center justify-center min-h-[60px] w-full 
                                                            ${isSubmitted
                                                                ? option === currentQuestion.correctAnswer
                                                                    ? 'bg-green-100 border-green-500 text-green-700'
                                                                    : selectedOption === option
                                                                        ? 'bg-red-100 border-red-500 text-red-700'
                                                                        : 'bg-gray-50 border-gray-200 text-gray-400'
                                                                : selectedOption === option
                                                                    ? 'bg-indigo-50 border-[#4FB7B3] text-[#31326F] shadow-md'
                                                                    : 'bg-white border-gray-200 text-gray-600 hover:border-[#4FB7B3] hover:shadow-sm'
                                                            }
                                                        `}
                                                        style={{ fontFamily: '"Open Sans", sans-serif' }}
                                                    >
                                                        <LatexContent html={option} />
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="h-16 mt-6 flex items-center justify-center">
                                                {isSubmitted && isCorrect && (
                                                    <motion.div
                                                        initial={{ scale: 0.5, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        className="feedback-mini correct text-center px-6 py-2 rounded-full font-normal bg-[#E8F5E9] border-2 border-[#81C784] text-[#2E7D32] flex items-center justify-center gap-2 shadow-sm"
                                                    >
                                                        ✨ {feedbackMessage} ✨
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    )}
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

            <Class8PracticeReportModal
                isOpen={showReportModal}
                stats={{
                    timeTaken: formatTime(timeElapsed),
                    correctAnswers: Object.values(answers).filter(val => val === true).length,
                    totalQuestions: TOTAL_QUESTIONS
                }}
                onContinue={() => {
                    clearProgress();
                    navigate(-1);
                }}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] px-6 py-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-2 text-lg"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                clearProgress(); navigate(-1);
                            }}
                        >
                            <X size={20} /> Exit
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
                            <button
                                className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ opacity: qIndex === 0 ? 0.5 : 1, marginRight: "10px" }}
                            >
                                <ChevronLeft size={24} strokeWidth={3} /> PREV
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>NEXT <ChevronRight size={24} strokeWidth={3} /></>
                                    ) : (
                                        <>DONE <Check size={24} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={!selectedOption}
                                >
                                    SUBMIT <Check size={24} strokeWidth={3} />
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
                                clearProgress(); navigate(-1);
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
                            <button
                                className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{
                                    opacity: qIndex === 0 ? 0.5 : 1,
                                    padding: '8px 12px',
                                    marginRight: '8px',
                                    backgroundColor: '#eef2ff',
                                    color: '#31326F',
                                    minWidth: 'auto'
                                }}
                            >
                                <ChevronLeft size={24} strokeWidth={3} /> PREV
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "NEXT" : "DONE"}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={!selectedOption}
                                >SUBMIT</button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default SquareRootOfDecimals;

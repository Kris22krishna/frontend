import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { useSessionLogger } from '../../../../hooks/useSessionLogger';
import { NODE_IDS } from '../../../../lib/curriculumIds';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import Class8PracticeReportModal from '../Class8PracticeReportModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/high/class8/SquaresAndSquareRoots.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing! Factoring Pro! ✨",
    "🌟 Brilliant! You've got this! 🌟",
    "🎉 Correct! Prime factorization mastered! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const generateQuestionData = () => {
    return [
        {
            text: "What is the prime factorization of $36$?",
            options: ["2² × 3²", "2 × 3³", "2³ × 3", "2² × 3³"],
            correctAnswer: "2² × 3²",
            solution: "$36 = 2 \\times 18 = 2 \\times 2 \\times 9 = 2 \\times 2 \\times 3 \\times 3 = 2^2 \\times 3^2$.",
        },
        {
            text: "Find the square root of $144$ by prime factorization.",
            options: ["12", "14", "16", "18"],
            correctAnswer: "12",
            solution: "$144 = 2^4 \\times 3^2$. Its square root is $2^2 \\times 3 = 4 \\times 3 = 12$.",
        },
        {
            text: "Find the square root of $400$.",
            options: ["20", "30", "40", "10"],
            correctAnswer: "20",
            solution: "$400 = 4 \\times 100$. $\\sqrt{4} = 2$ and $\\sqrt{100} = 10$. So, $2 \\times 10 = 20$.",
        },
        {
            text: "By what smallest whole number should $48$ be multiplied to make it a perfect square?",
            options: ["2", "3", "4", "6"],
            correctAnswer: "3",
            solution: "$48 = 2 \\times 2 \\times 2 \\times 2 \\times 3$. The prime factor $3$ does not have a pair. Therefore, we must multiply by $3$.",
        },
        {
            text: "By what smallest whole number should $200$ be divided to get a perfect square?",
            options: ["2", "4", "5", "10"],
            correctAnswer: "2",
            solution: "$200 = 2 \\times 100 = 2 \\times 2 \\times 2 \\times 5 \\times 5$. The factor $2$ is unpaired. So we must divide by $2$.",
        },
        {
            text: "Find the square root of $1764$ by prime factorization.",
            options: ["42", "44", "46", "48"],
            correctAnswer: "42",
            solution: "$1764 = 2^2 \\times 3^2 \\times 7^2$. Square root is $2 \\times 3 \\times 7 = 42$.",
        },
        {
            text: "Find the smallest square number that is divisible by $4$, $9$, and $10$.",
            options: ["900", "180", "360", "1600"],
            correctAnswer: "900",
            solution: "LCM of $4, 9, 10$ is $180 = 2^2 \\times 3^2 \\times 5$. To make it a perfect square, multiply by the unpaired factor $5$. $180 \\times 5 = 900$.",
        },
        {
            text: "Find the square root of $5929$.",
            options: ["77", "73", "83", "87"],
            correctAnswer: "77",
            solution: "Prime factorization of $5929 = 7 \\times 7 \\times 11 \\times 11$. Square root is $7 \\times 11 = 77$.",
        },
        {
            text: "By what smallest whole number should $600$ be multiplied to get a perfect square?",
            options: ["6", "2", "3", "10"],
            correctAnswer: "6",
            solution: "$600 = 2^3 \\times 3 \\times 5^2$. Unpaired factors are one $2$ and one $3$. Multiply by $2 \\times 3 = 6$.",
        },
        {
            text: "Find the square root of $7056$.",
            options: ["84", "86", "74", "94"],
            correctAnswer: "84",
            solution: "$7056 = 2^4 \\times 3^2 \\times 7^2$. Square root is $2^2 \\times 3 \\times 7 = 4 \\times 21 = 84$.",
        }
    ];
};

const SquareRootPrimeFactorization = () => {
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
    const SKILL_ID = 1252;
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const answersPayload = useRef([]);
    const isFinishedRef = useRef(false);
    const SKILL_NAME = "Square Root via Prime Factorization";
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
            startSession({ nodeId: NODE_IDS.g8MathSSRPrimeFactorization, sessionType: 'practice' });
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
            if (!isFinishedRef.current) {
                isFinishedRef.current = true;
                await finishSession({ answers_payload: answersPayload.current.filter(Boolean) });
            }
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
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span className="text-[#31326F] font-normal text-lg sm:text-xl">Square Root via Prime Factorization</span>
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
export default SquareRootPrimeFactorization;

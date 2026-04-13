import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '../../../../lib/curriculumIds';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import Class8PracticeReportModal from '../Class8PracticeReportModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/high/class8/SquaresAndSquareRoots.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing! Perfect square spotter! ✨",
    "🌟 Brilliant! You've got this! 🌟",
    "🎉 Correct! Square Genius! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const generateQuestionData = () => {
    return [
        {
            text: "What will be the unit digit of the square of $52698$?",
            options: ["4", "8", "6", "2"],
            correctAnswer: "4",
            solution: "The unit digit of $52698$ is $8$. The square of $8$ is $64$. The unit digit of $64$ is $4$. Therefore, the unit digit of the square of $52698$ is $4$.",
        },
        {
            text: "Which of the following numbers would have digit $1$ at its units place when squared?",
            options: ["73", "161", "255", "146"],
            correctAnswer: "161",
            solution: "If a number ends in $1$ or $9$, its square ends in $1$. Here, $161$ ends in $1$, so its square will end in $1$.",
        },
        {
            text: "Which of the following numbers would have digit $6$ at units place when squared?",
            options: ["19", "24", "25", "13"],
            correctAnswer: "24",
            solution: "A number's square ends in $6$ if the number itself ends in $4$ or $6$. Among the options, $24$ ends in $4$, so its square ends in $6$ ($24^2 = 576$).",
        },
        {
            text: "How many non-square numbers lie between $9^2$ and $10^2$?",
            options: ["17", "18", "19", "20"],
            correctAnswer: "18",
            solution: "There are exactly $2n$ non-perfect square numbers between $n^2$ and $(n+1)^2$. For $n=9$, the number of non-square numbers is $2 \\times 9 = 18$.",
        },
        {
            text: "How many non-square numbers lie between $100^2$ and $101^2$?",
            options: ["199", "200", "201", "202"],
            correctAnswer: "200",
            solution: "Using the property that there are $2n$ non-square numbers between $n^2$ and $(n+1)^2$, for $n=100$, the answer is $2 \\times 100 = 200$.",
        },
        {
            text: "The number $121$ is the sum of the first how many odd natural numbers?",
            options: ["9", "10", "11", "12"],
            correctAnswer: "11",
            solution: "The sum of the first $n$ odd natural numbers is $n^2$. Since $121 = 11^2$, it is the sum of the first $11$ odd natural numbers.",
        },
        {
            text: "If you square an odd number, what kind of number do you get?",
            options: ["Always Even", "Always Odd", "Sometimes Even", "Depends on the number"],
            correctAnswer: "Always Odd",
            solution: "The square of an odd number is always an odd number. Let's take $3$ (odd), $3^2 = 9$ (odd). $5^2 = 25$ (odd).",
        },
        {
            text: "Which of the following squares is an even number?",
            options: ["$431^2$", "$2826^2$", "$7779^2$", "$82005^2$"],
            correctAnswer: "$2826^2$",
            solution: "The square of an even number is even, and the square of an odd number is odd. Since $2826$ is the only even number, its square will be even.",
        },
        {
            text: "Express $6^2$ as a sum of odd numbers.",
            options: ["1 + 3 + 5 + 7 + 9 + 11", "2 + 4 + 6 + 8 + 10 + 12", "1 + 2 + 3 + 4 + 5 + 6", "1 + 5 + 9 + 13 + 17"],
            correctAnswer: "1 + 3 + 5 + 7 + 9 + 11",
            solution: "The sum of first $n$ odd natural numbers is $n^2$. So $6^2$ is the sum of the first $6$ odd natural numbers.",
        },
        {
            text: "Without adding, find the sum: $1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 + 19$.",
            options: ["81", "100", "121", "144"],
            correctAnswer: "100",
            solution: "There are exactly $10$ consecutive odd numbers starting from $1$. The sum of the first $10$ odd numbers is $10^2 = 100$.",
        }
    ];
};

const PropertiesOfSquareNumbers = () => {
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
    const SKILL_ID = 1248;
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const answersPayload = useRef([]);
    const isFinishedRef = useRef(false);
    const SKILL_NAME = "Properties of Square Numbers";
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
            startSession({ nodeId: NODE_IDS.g8MathSSRProperties, sessionType: 'practice' });
        api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
        const prepared = generateQuestionData().map(q => ({
            ...q,
            options: [...q.options].sort(() => Math.random() - 0.5)
        }));
        setQuestions(prepared);

        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);

        const handleVisibility = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => {
            clearInterval(timer);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, []);

    useEffect(() => {
        const currentAnswer = answers[qIndex];
        if (currentAnswer) {
            setSelectedOption(currentAnswer.selectedOption);
            setIsCorrect(currentAnswer.isCorrect);
            setIsSubmitted(true);
            setFeedbackMessage(currentAnswer.isCorrect ? CORRECT_MESSAGES[qIndex % CORRECT_MESSAGES.length] : "");
        } else {
            setSelectedOption(null);
            setIsCorrect(false);
            setIsSubmitted(false);
            setFeedbackMessage("");
        }
    }, [qIndex, answers]);

    useEffect(() => {
        setShowExplanationModal(false);
        accumulatedTime.current = 0;
        questionStartTime.current = Date.now();
    }, [qIndex]);

    const formatTime = (secs) => `${Math.floor(secs / 60)}:${(secs % 60).toString().padStart(2, '0')}`;

    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const currentQ = questions[qIndex];
        const isRight = selectedOption === currentQ.correctAnswer;

        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: isRight } }));
        if (!isRight) setShowExplanationModal(true);

        const userId = sessionStorage.getItem('userId');
        if (userId) {
            let timeSpent = accumulatedTime.current;
            if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;

            api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: qIndex < 3 ? 'Easy' : (qIndex < 6 ? 'Medium' : 'Hard'),
                question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer,
                student_answer: selectedOption,
                is_correct: isRight,
                solution_text: currentQ.solution,
                time_spent_seconds: Math.round(timeSpent / 1000)
            }).catch(console.error);
        }
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(p => p + 1);
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(v => v.isCorrect).length;
                api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                    parameters: {
                        skill_id: SKILL_ID,
                        skill_name: SKILL_NAME,
                        total_questions: TOTAL_QUESTIONS,
                        correct_answers: totalCorrect,
                        time_taken_seconds: timeElapsed
                    },
                    user_id: parseInt(userId, 10)
                }).catch(console.error);
            }
            navigate(-1);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) setQIndex(p => p - 1);
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
                    <span className="text-[#31326F] font-normal text-lg sm:text-xl">Properties of Square Numbers</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-sm sm:text-x l shadow-lg whitespace-nowrap">
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
                                            <div className="interaction-area-modern flex-1 w-full max-w-sm flex flex-col items-center">
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
                    correctAnswers: Object.values(answers).filter(val => val.isCorrect).length,
                    totalQuestions: TOTAL_QUESTIONS
                }}
                onPracticeAgain={() => {
                    clearProgress();
                    setQIndex(0);
                    setAnswers({});
                    setTimeElapsed(0);
                    setSelectedOption(null);
                    setIsSubmitted(false);
                    setIsCorrect(false);
                    setShowReportModal(false);

                    const prepared = generateQuestionData().map(q => ({
                        ...q,
                        options: [...q.options].sort(() => Math.random() - 0.5)
                    }));
                    setQuestions(prepared);
                }}
                onBackToSkills={() => {
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
export default PropertiesOfSquareNumbers;

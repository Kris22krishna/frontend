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
    "✨ Amazing! Pythagorean Master! ✨",
    "🌟 Brilliant! You've got this! 🌟",
    "🎉 Correct! Triplet Genius! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const generateQuestionData = () => {
    return [
        {
            text: "Which of the following describes the general form of a Pythagorean triplet for $m > 1$?",
            options: ["(2m, m² - 1, m² + 1)", "(2m, m, m²)", "(m, 2m, 3m)", "(m², m² - 1, 2m)"],
            correctAnswer: "(2m, m² - 1, m² + 1)",
            solution: "For any integer $m > 1$, $(2m, m^2 - 1, m^2 + 1)$ forms a Pythagorean triplet.",
        },
        {
            text: "Is $(3, 4, 5)$ a Pythagorean triplet?",
            options: ["Yes", "No", "Only if multiplied", "Cannot be determined"],
            correctAnswer: "Yes",
            solution: "$3^2 + 4^2 = 9 + 16 = 25$. $5^2 = 25$. Since $3^2+4^2=5^2$, it is a Pythagorean triplet.",
        },
        {
            text: "Which of the following is a Pythagorean triplet?",
            options: ["(6, 8, 10)", "(5, 9, 12)", "(6, 7, 8)", "(10, 11, 12)"],
            correctAnswer: "(6, 8, 10)",
            solution: "$6^2 + 8^2 = 36 + 64 = 100$. $10^2 = 100$. Thus, $(6, 8, 10)$ is a Pythagorean triplet.",
        },
        {
            text: "Find the Pythagorean triplet containing $14$ as one of its members.",
            options: ["(14, 48, 50)", "(14, 30, 32)", "(14, 25, 29)", "(14, 18, 22)"],
            correctAnswer: "(14, 48, 50)",
            solution: "Let $2m = 14 \\Rightarrow m = 7$. Then $m^2 - 1 = 49 - 1 = 48$ and $m^2 + 1 = 49 + 1 = 50$. The triplet is $(14, 48, 50)$.",
        },
        {
            text: "Find the Pythagorean triplet containing $16$ as one of its members.",
            options: ["(16, 63, 65)", "(16, 30, 34)", "Both", "None"],
            correctAnswer: "Both",
            solution: "Let $2m = 16 \\Rightarrow m = 8$ giving $(16, 63, 65)$. Also $(16, 30, 34)$ is $2 \\times (8, 15, 17)$, which is also a valid triplet since $(8, 15, 17)$ is a primitive triplet.",
        },
        {
            text: "Identify the Pythagorean triplet consisting of $5, 12,$ and $13$.",
            options: ["Yes", "No", "Only 12 and 13", "Only 5 and 12"],
            correctAnswer: "Yes",
            solution: "$5^2 + 12^2 = 25 + 144 = 169$. Since $13^2 = 169$, it is a Pythagorean triplet.",
        },
        {
            text: "Find a Pythagorean triplet whose one member is $18$.",
            options: ["(18, 80, 82)", "(18, 45, 52)", "(18, 25, 30)", "(18, 70, 75)"],
            correctAnswer: "(18, 80, 82)",
            solution: "Let $2m=18 \\Rightarrow m=9$. Then $m^2-1 = 81-1=80$ and $m^2+1=81+1=82$. The triplet is $(18, 80, 82)$.",
        },
        {
            text: "Find a Pythagorean triplet if $m^2 - 1 = 24$.",
            options: ["(10, 24, 26)", "(8, 24, 25)", "(12, 24, 28)", "(7, 24, 25)"],
            correctAnswer: "(10, 24, 26)",
            solution: "If $m^2 - 1 = 24$, then $m^2 = 25$, so $m=5$. The members are $2m = 10$, $m^2-1 = 24$, $m^2+1 = 26$. The triplet is $(10, 24, 26)$.",
        },
        {
            text: "Does there exist a Pythagorean triplet where the longest side (hypotenuse) is $17$?",
            options: ["Yes, (8, 15, 17)", "Yes, (9, 12, 17)", "Yes, (7, 14, 17)", "No"],
            correctAnswer: "Yes, (8, 15, 17)",
            solution: "Let $m^2 + 1 = 17 \\Rightarrow m^2 = 16 \\Rightarrow m=4$. Then $2m=8$ and $m^2-1=15$. The triplet is $(8, 15, 17)$.",
        },
        {
            text: "Can $(6, 8, 11)$ be a Pythagorean triplet?",
            options: ["Yes", "No", "Sometimes", "Depends on the triangle"],
            correctAnswer: "No",
            solution: "$6^2 + 8^2 = 36 + 64 = 100$. However, $11^2 = 121$. Since $100 \\neq 121$, it is NOT a Pythagorean triplet.",
        }
    ];
};

const PythagoreanTriplets = () => {
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
    const SKILL_ID = 1250;
    const SKILL_NAME = "Pythagorean Triplets";
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
                    <span className="text-[#31326F] font-normal text-lg sm:text-xl">Pythagorean Triplets</span>
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
export default PythagoreanTriplets;

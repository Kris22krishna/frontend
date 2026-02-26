
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Whiteboard from '../../../Whiteboard';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import { FullScreenScratchpad } from '../../../FullScreenScratchpad';

import '../../../../pages/juniors/grade3/Raksha-Bandhan.css';

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

const RakshaBandhanFillInTheBlanks = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [history, setHistory] = useState({});
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
    const SKILL_ID = 9001; // Reserved ID for Raksha Bandhan Fill in the Blanks
    const SKILL_NAME = "Raksha Bandhan - Conceptual questions";
    const SHORT_SKILL_NAME = "Concepts";
    const [answers, setAnswers] = useState({}); // Track correct answers { 0: true, 1: false }

    const questions = [
        {
            topic: "multiplication",
            text: "Multiplication means adding the same number again and again. What is Multiplication also called?",
            correctAnswer: "Repeated addition",
            solution: "Multiplication is adding the same number repeatedly. For example, $2 \\times 3$ means adding 2, three times ($2+2+2$). This is why it is called <strong>repeated addition</strong>.",
            options: ["Repeated addition", "Repeated subtraction", "Repeated division", "Fast counting"]
        },
        {
            topic: "division",
            text: "Division means subtracting the same number again and again. Division is also called ______________ .",
            correctAnswer: "Repeated subtraction",
            solution: "Division is subtracting the same number repeatedly. For example, $6 \\div 2$ means subtracting 2 from 6 until you reach 0. This is why it is called <strong>repeated subtraction</strong>.",
            options: ["Repeated addition", "Repeated subtraction", "Repeated multiplication", "Group counting"]
        }
    ];

    // State for shuffled options to avoid reshuffling on every render
    const [shuffledOptions, setShuffledOptions] = useState([]);

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
    }, []);

    useEffect(() => {
        if (history[qIndex]) {
            // Restore from history
            const data = history[qIndex];
            setShuffledOptions(data.options);
            setSelectedOption(data.selectedOption);
            setIsSubmitted(data.isSubmitted);
            setIsCorrect(data.isCorrect);
            setFeedbackMessage(data.feedbackMessage || "");
        } else {
            // New Question Layout
            const options = questions[qIndex].options;
            const newShuffledOptions = [...options].sort(() => Math.random() - 0.5);
            setShuffledOptions(newShuffledOptions);

            // Save initial state
            setHistory(prev => ({
                ...prev,
                [qIndex]: {
                    options: newShuffledOptions, // Save the shuffled order
                    selectedOption: null,
                    isSubmitted: false,
                    isCorrect: false,
                    feedbackMessage: ""
                }
            }));

            // Reset states
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            setFeedbackMessage("");
        }
    }, [qIndex]);

    const currentQuestion = questions[qIndex];

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
        if (!selectedOption || !currentQuestion) return;

        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);

        const feedbackMsg = isRight ? CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)] : "";

        if (isRight) {
            setFeedbackMessage(feedbackMsg);
        } else {
            setShowExplanationModal(true);
        }

        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));

        setHistory(prev => ({
            ...prev,
            [qIndex]: {
                ...prev[qIndex],
                selectedOption: selectedOption,
                isSubmitted: true,
                isCorrect: isRight,
                feedbackMessage: feedbackMsg
            }
        }));

        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);

            // Reset question timer
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            // Finish session and create report
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
            setShowResult(true);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    
    const showRes = typeof showResult !== 'undefined' ? showResult : (typeof showResults !== 'undefined' ? showResults : false);
    if (showRes) {
        const scoreVal = typeof score !== 'undefined' 
            ? score 
            : (typeof stats !== 'undefined' && stats.correct !== undefined 
                ? stats.correct 
                : (typeof answers !== 'undefined' ? Object.values(answers).filter(val => val === true || val?.isCorrect === true).length : 0));
        const totalVal = typeof questions !== 'undefined' 
            ? questions.length 
            : (typeof sessionQuestions !== 'undefined' && sessionQuestions.length > 0 
                ? sessionQuestions.length 
                : (typeof TOTAL_QUESTIONS !== 'undefined' ? TOTAL_QUESTIONS : 10));
        return <GenericReportCard score={scoreVal} totalQuestions={totalVal} onRestart={typeof handleRestart !== 'undefined' ? handleRestart : undefined} />;
    }

    return (
        <div className="junior-practice-page raksha-theme grey-selection-theme raksha-bandhan-practice-page">
            <header className="junior-practice-header raksha-bandhan-header">
                <div className="header-left">
                    {/* Desktop: full skill name */}
                    <span className="raksha-skill-desktop text-[#31326F] font-normal text-xl">{SKILL_NAME}</span>
                    {/* Mobile: short skill name */}
                    <span className="raksha-skill-mobile text-[#31326F] font-semibold text-[0.85rem] leading-tight">{SHORT_SKILL_NAME}</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-center">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] text-sm sm:text-lg lg:text-2xl shadow-lg whitespace-nowrap font-medium">
                        <span className="hidden sm:inline">Question </span>{qIndex + 1} / {questions.length}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-sm sm:text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container raksha-bandhan-board-container">
                    <div className="practice-left-col raksha-bandhan-left-col">
                        <div className="question-card-modern" style={{ paddingTop: '1.5rem', justifyContent: 'flex-start' }}>
                            <div className="question-header-modern" style={{ marginBottom: '0.75rem' }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}>
                                    <LatexContent html={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern" style={{ gap: '0.75rem' }}>
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
                        </div>
                    </div>
                </div>
            </main>

            {/* Explanation Modal */}
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

            {/* Footer similar to JuniorPracticeSession */}
            <footer className="junior-bottom-bar">
                {/* Desktop Controls */}
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] px-6 py-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-2 text-lg" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>Exit</button>
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
                            <button onClick={handlePrevious} disabled={qIndex === 0} className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}><ChevronLeft size={24} strokeWidth={3} /> PREV</button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < questions.length - 1 ? (
                                        <>NEXT <ChevronRight size={24} strokeWidth={3} /></>
                                    ) : (
                                        <>DONE <Check size={24} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>SUBMIT <Check size={24} strokeWidth={3} /></button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>

                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>

                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            <button
                                className="nav-pill-next-btn"
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
                                <ChevronLeft size={20} strokeWidth={3} />
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < questions.length - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>SUBMIT</button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default RakshaBandhanFillInTheBlanks;

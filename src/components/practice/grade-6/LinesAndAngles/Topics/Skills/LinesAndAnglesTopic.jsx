import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, CircleHelp as HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/services/api';
import LatexContent from '@/components/LatexContent';
import ExplanationModal from '@/components/ExplanationModal';
import mascotImg from '@/assets/mascot.png';
import "@/pages/juniors/JuniorPracticeSession.css";
// import "../linesAndAngles.css"; // Removing old css reference, standard template doesn't explicitly mandate this if not used. 
import { generateLinesAndAnglesQuestions } from './linesAndAnglesQuestions';

const PracticeSummaryModal = ({ isOpen, timeTaken, correctCount, wrongCount, skippedCount, totalCount, onContinue }) => {
    if (!isOpen) return null;
    const answeredCount = correctCount + wrongCount;
    const unansweredCount = Math.max(0, totalCount - answeredCount - skippedCount);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
            >
                <h2 className="text-3xl font-black text-[#31326F] mb-4">Practice Complete!</h2>
                <div className="text-5xl mb-6">🎊</div>

                <div className="grid grid-cols-1 gap-3 mb-8 text-left">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border-2 border-gray-100">
                        <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                            <span className="text-lg">🕒</span> Time Taken:
                        </div>
                        <span className="text-lg font-black text-[#31326F]">{timeTaken}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col p-3 bg-green-50 rounded-2xl border-2 border-green-100">
                            <div className="flex items-center gap-2 text-green-600 font-bold text-xs mb-1">
                                <Check className="w-4 h-4" /> Correct
                            </div>
                            <span className="text-xl font-black text-green-600">{correctCount}</span>
                        </div>
                        <div className="flex flex-col p-3 bg-red-50 rounded-2xl border-2 border-red-100">
                            <div className="flex items-center gap-2 text-red-500 font-bold text-xs mb-1">
                                <X className="w-4 h-4" /> Wrong
                            </div>
                            <span className="text-xl font-black text-red-500">{wrongCount}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col p-3 bg-blue-50 rounded-2xl border-2 border-blue-100">
                            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs mb-1">
                                <HelpCircle className="w-4 h-4" /> Skipped
                            </div>
                            <span className="text-xl font-black text-blue-600">{skippedCount}</span>
                        </div>
                        <div className="flex flex-col p-3 bg-gray-50 rounded-2xl border-2 border-gray-200">
                            <div className="flex items-center gap-2 text-gray-500 font-bold text-xs mb-1">
                                <ChevronRight className="w-4 h-4" /> Left
                            </div>
                            <span className="text-xl font-black text-gray-600">{unansweredCount}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onContinue}
                    className="w-full bg-[#31326F] text-white py-4 rounded-2xl font-black text-xl hover:bg-[#31326F]/90 transition-all shadow-lg active:scale-95"
                >
                    Keep Going!
                </button>
            </motion.div>
        </div>
    );
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Great job! You've got this! ✨",
    "🌟 Excellent geometry skills! 🌟",
    "🎉 Correct! You're a pro! 🎉",
    "✨ Amazing work! ✨",
    "🚀 Super! Keep it up! 🚀",
    "🌈 Perfect! Well done! 🌈"
];

const SKILL_MAP = {
    'introduction': 1081,
    'line-segment-ray': 1082,
    'line-types': 1083,
    'angle-types': 1084,
    'adjacent-angles': 1085,
    'linear-pair': 1086,
    'vertically-opposite': 1087,
    'transversal-angles': 1088,
    'angles-at-point': 1089,
    'real-life-examples': 1090
};

const TOPIC_NAMES = {
    'introduction': 'Introduction to Lines and Angles',
    'line-segment-ray': 'Line, Line Segment and Ray',
    'line-types': 'Types of Lines',
    'angle-types': 'Types of Angles',
    'adjacent-angles': 'Adjacent Angles',
    'linear-pair': 'Linear Pair of Angles',
    'vertically-opposite': 'Vertically Opposite Angles',
    'transversal-angles': 'Angles formed by a Transversal',
    'angles-at-point': 'Angles at a Point',
    'real-life-examples': 'Real Life Examples'
};

export default function LinesAndAnglesTopic({ topicId }) {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode') || 'practice';

    const storageKey = `${mode}_lines_angles_${topicId}`;

    const getSessionData = (key, defaultValue) => {
        const data = sessionStorage.getItem(key);
        return data !== null ? JSON.parse(data) : defaultValue;
    };

    const [qIndex, setQIndex] = useState(() => getSessionData(`${storageKey}_qIndex`, 0));
    const [history, setHistory] = useState(() => getSessionData(`${storageKey}_history`, {}));
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(() => getSessionData(`${storageKey}_timeElapsed`, 0));
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [sessionId, setSessionId] = useState(() => getSessionData(`${storageKey}_sessionId`, null));

    const questionStartTime = useRef(Date.now());
    const TOTAL_QUESTIONS = 10;
    const SKILL_ID = SKILL_MAP[topicId] || 1081;
    const SKILL_NAME = TOPIC_NAMES[topicId] || "Lines and Angles";

    const [answers, setAnswers] = useState(() => getSessionData(`${storageKey}_answers`, {}));
    const [skippedQuestions, setSkippedQuestions] = useState(() => new Set(getSessionData(`${storageKey}_skipped`, [])));

    useEffect(() => {
        sessionStorage.setItem(`${storageKey}_qIndex`, JSON.stringify(qIndex));
        sessionStorage.setItem(`${storageKey}_history`, JSON.stringify(history));
        sessionStorage.setItem(`${storageKey}_answers`, JSON.stringify(answers));
        sessionStorage.setItem(`${storageKey}_skipped`, JSON.stringify(Array.from(skippedQuestions)));
        sessionStorage.setItem(`${storageKey}_timeElapsed`, JSON.stringify(timeElapsed));
        if (sessionId) sessionStorage.setItem(`${storageKey}_sessionId`, JSON.stringify(sessionId));
    }, [qIndex, history, answers, skippedQuestions, timeElapsed, sessionId, storageKey]);

    const clearProgress = () => {
        sessionStorage.removeItem(`${storageKey}_qIndex`);
        sessionStorage.removeItem(`${storageKey}_history`);
        sessionStorage.removeItem(`${storageKey}_answers`);
        sessionStorage.removeItem(`${storageKey}_skipped`);
        sessionStorage.removeItem(`${storageKey}_timeElapsed`);
        sessionStorage.removeItem(`${storageKey}_sessionId`);
    };

    useEffect(() => {
        // Force non-scrollable body for practice session
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(console.error);
        }

        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [SKILL_ID, sessionId]);

    useEffect(() => {
        if (history[qIndex]) {
            const data = history[qIndex];
            setCurrentQuestion(data.question);
            setSelectedOption(data.selectedOption);
            setIsSubmitted(data.isSubmitted);
            setIsCorrect(data.isCorrect);
            setFeedbackMessage(data.feedbackMessage || "");
        } else {
            const qSet = generateLinesAndAnglesQuestions(topicId, 1);
            const newQ = qSet[0];
            setCurrentQuestion(newQ);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            setFeedbackMessage("");

            setHistory(prev => ({
                ...prev,
                [qIndex]: {
                    question: newQ,
                    selectedOption: null,
                    isSubmitted: false,
                    isCorrect: false
                }
            }));
        }
    }, [qIndex, topicId]);

    const handleCheck = () => {
        if (!selectedOption || isSubmitted) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));
        const msg = isRight ? CORRECT_MESSAGES[randomInt(0, CORRECT_MESSAGES.length - 1)] : "";
        setFeedbackMessage(msg);

        if (!isRight) setShowExplanationModal(true);

        setHistory(prev => ({
            ...prev,
            [qIndex]: {
                ...prev[qIndex],
                selectedOption: selectedOption,
                isSubmitted: true,
                isCorrect: isRight,
                feedbackMessage: msg
            }
        }));

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && sessionId) {
            api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                question_text: currentQuestion.text,
                correct_answer: currentQuestion.correctAnswer,
                student_answer: selectedOption,
                is_correct: isRight,
                solution_text: currentQuestion.explanation,
                time_spent_seconds: Math.floor((Date.now() - questionStartTime.current) / 1000)
            }).catch(console.error);
        }
    };

    const handleOptionSelect = (option) => {
        if (mode === 'assess') {
            setSelectedOption(option);
            setAnswers(prev => ({ ...prev, [qIndex]: option }));
            setHistory(prev => ({
                ...prev,
                [qIndex]: {
                    ...prev[qIndex],
                    selectedOption: option,
                }
            }));
        } else {
            if (!isSubmitted) setSelectedOption(option);
        }
    };

    const handleJump = (idx) => {
        setQIndex(idx);
    };

    const handleNext = () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            questionStartTime.current = Date.now();
        } else {
            setShowSummaryModal(true);
        }
    };

    const handleSkip = () => {
        if (isSubmitted) return;
        setSkippedQuestions(prev => new Set(prev).add(qIndex));
        handleNext();
    };

    const handleFinalContinue = async () => {
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            const correctCount = Object.values(answers).filter(v => v === true).length;
            await api.createReport({
                title: SKILL_NAME,
                type: 'practice',
                score: (correctCount / TOTAL_QUESTIONS) * 100,
                parameters: {
                    total_questions: TOTAL_QUESTIONS,
                    correct_answers: correctCount,
                    time_taken_seconds: timeElapsed
                },
                user_id: parseInt(userId, 10)
            }).catch(console.error);
        }
        clearProgress();
        navigate('/middle/grade/6/lines-and-angles/skills');
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!currentQuestion) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header">
                <div className="header-left">
                    <span className="chapter-title">{SKILL_NAME}</span>
                </div>
                <div className="header-center">
                    <div className="question-counter">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    {!isSubmitted && (
                        <button
                            className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-xl font-bold hover:bg-gray-200 transition-colors text-sm"
                            onClick={handleSkip}
                        >
                            Skip
                        </button>
                    )}
                    <div className="timer-display">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className={`practice-board-container ${mode === 'assess' ? 'mode-assess' : 'mode-practice'}`}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${topicId}_${qIndex}`}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <div className="question-card-modern">
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern">
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>

                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {currentQuestion.options.map((option, idx) => {
                                                let optionClass = '';
                                                if (mode === 'assess') {
                                                    if (selectedOption === option) optionClass = 'selected';
                                                } else {
                                                    if (isSubmitted) {
                                                        optionClass = option === currentQuestion.correctAnswer ? 'correct' : (selectedOption === option ? 'wrong' : 'disabled');
                                                    } else {
                                                        optionClass = selectedOption === option ? 'selected' : '';
                                                    }
                                                }

                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleOptionSelect(option)}
                                                        disabled={mode === 'practice' && isSubmitted}
                                                        className={`option-btn-modern ${optionClass}`}
                                                    >
                                                        <LatexContent html={option} />
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {mode === 'practice' && isSubmitted && isCorrect && (
                                            <motion.div
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="feedback-mini correct"
                                                style={{ marginTop: '24px' }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img src={mascotImg} alt="Mascot" className="w-12 h-12 object-contain" />
                                                    <span>{feedbackMessage}</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {mode === 'assess' && (
                        <div className="quiz-palette-container" style={{
                            background: '#fff',
                            borderRadius: '24px', padding: '2rem 1.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            position: 'sticky', top: '2rem',
                            display: 'flex', flexDirection: 'column'
                        }}>
                            <div style={{
                                background: '#F8FAFC', borderRadius: '16px', padding: '14px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                fontWeight: 800, fontSize: '1.25rem', color: '#1E293B', marginBottom: '2rem'
                            }}>
                                ⏱ {formatTime(timeElapsed)}
                            </div>

                            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B', marginBottom: '1rem', letterSpacing: 0.5 }}>Question Palette</h4>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 44px)', gap: '8px', marginBottom: '1.75rem' }}>
                                {Array.from({ length: TOTAL_QUESTIONS }).map((_, idx) => {
                                    const isAnswered = !!answers[idx];
                                    const isCurrent = currentQuestion && qIndex === idx;
                                    let statusClass = 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]';

                                    if (isCurrent) {
                                        statusClass = 'bg-white text-[#6366f1] border-2 border-[#6366f1] ring-2 ring-[#6366f1]/20';
                                    } else if (isAnswered) {
                                        statusClass = 'bg-[#6366f1] text-white border-transparent shadow-md shadow-[#6366f1]/30';
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleJump(idx)}
                                            className={`h-11 w-11 rounded-[10px] font-bold text-[15px] flex items-center justify-center transition-all ${statusClass} hover:-translate-y-[1px]`}
                                        >
                                            {idx + 1}
                                        </button>
                                    );
                                })}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#64748B', fontWeight: 600, marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: 16, height: 16, borderRadius: 5, background: '#6366f1' }} /> Answered
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: 16, height: 16, borderRadius: 5, background: '#F8FAFC', border: '1.5px solid #E2E8F0' }} /> Not Answered
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto' }}>
                                <button
                                    onClick={() => setShowSummaryModal(true)}
                                    style={{
                                        width: '100%', padding: '14px',
                                        background: '#EF4444', color: '#fff',
                                        border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                                        cursor: 'pointer', transition: 'all 0.2s',
                                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                                    }}
                                    className="hover:-translate-y-1 hover:shadow-lg"
                                >
                                    Submit Assessment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <PracticeSummaryModal
                isOpen={showSummaryModal}
                timeTaken={formatTime(timeElapsed)}
                correctCount={Object.values(answers).filter(v => v === true).length}
                wrongCount={Object.values(answers).filter(v => v === false).length}
                skippedCount={skippedQuestions.size}
                totalCount={TOTAL_QUESTIONS}
                onContinue={handleFinalContinue}
            />

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.explanation}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] px-6 py-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-2 text-lg font-bold"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                clearProgress();
                                navigate('/middle/grade/6/lines-and-angles/skills');
                            }}
                        >
                            Exit
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
                                onClick={() => qIndex > 0 && handleJump(qIndex - 1)}
                                disabled={qIndex === 0}
                                style={{ opacity: qIndex === 0 ? 0.5 : 1, marginRight: "10px" }}
                            >
                                <ChevronLeft size={24} strokeWidth={3} /> PREV
                            </button>
                            {mode === 'assess' ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>NEXT <ChevronRight size={24} strokeWidth={3} /></>
                                    ) : (
                                        <>FINISH <Check size={24} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                isSubmitted ? (
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
                                )
                            )}
                        </div>
                    </div>
                </div>

                <div className="mobile-footer-controls">
                    <button
                        className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                        onClick={async () => {
                            if (sessionId) await api.finishSession(sessionId).catch(console.error);
                            clearProgress();
                            navigate('/middle/grade/6/lines-and-angles/skills');
                        }}
                    >
                        <X size={20} />
                    </button>

                    <div className="nav-buttons-group ml-auto">
                        <button
                            className={`nav-pill-next-btn bg-gray-200 text-gray-600 p-2 ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => qIndex > 0 && handleJump(qIndex - 1)}
                            disabled={qIndex === 0}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        {mode === 'assess' ? (
                            <button className="nav-pill-next-btn" onClick={handleNext}>
                                {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Finish"}
                            </button>
                        ) : (
                            isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit
                                </button>
                            )
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
}

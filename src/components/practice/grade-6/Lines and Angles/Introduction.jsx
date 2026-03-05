import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, ArrowRight, CircleHelp as HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/services/api';
import LatexContent from '@/components/LatexContent';
import ExplanationModal from '@/components/ExplanationModal';
import mascotImg from '@/assets/mascot.png';
import "@/pages/juniors/JuniorPracticeSession.css";
import "./linesAndAngles.css";

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
    "✨ Brilliant visualization! You're seeing the geometry around you! ✨",
    "🌟 Geometry star! Great job identifying the basics! 🌟",
    "🎉 Correct! You've got the foundation of lines and angles! 🎉",
    "✨ Amazing! You're making shapes make sense! ✨",
    "🚀 Super! You're navigating the world of points and lines! 🚀",
    "🌈 Perfect! Truly sharp thinking! 🌈"
];

const Introduction = () => {
    const navigate = useNavigate();
    const storageKey = `practice_${window.location.pathname}`;

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
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const [sessionId, setSessionId] = useState(() => getSessionData(`${storageKey}_sessionId`, null));
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const TOTAL_QUESTIONS = 10;
    const SKILL_ID = 2001;
    const SKILL_NAME = "Introduction to Lines and Angles";

    const [answers, setAnswers] = useState(() => getSessionData(`${storageKey}_answers`, {}));
    const [skippedQuestions, setSkippedQuestions] = useState(() => new Set(getSessionData(`${storageKey}_skipped`, [])));
    const [usedQuestions, setUsedQuestions] = useState(new Set());

    useEffect(() => {
        sessionStorage.setItem(`${storageKey}_qIndex`, JSON.stringify(qIndex));
        sessionStorage.setItem(`${storageKey}_history`, JSON.stringify(history));
        sessionStorage.setItem(`${storageKey}_answers`, JSON.stringify(answers));
        sessionStorage.setItem(`${storageKey}_skipped`, JSON.stringify(Array.from(skippedQuestions)));
        sessionStorage.setItem(`${storageKey}_timeElapsed`, JSON.stringify(timeElapsed));
        if (sessionId) sessionStorage.setItem(`${storageKey}_sessionId`, JSON.stringify(sessionId));
    }, [qIndex, history, answers, sessionId]);

    const clearProgress = () => {
        sessionStorage.removeItem(`${storageKey}_qIndex`);
        sessionStorage.removeItem(`${storageKey}_history`);
        sessionStorage.removeItem(`${storageKey}_answers`);
        sessionStorage.removeItem(`${storageKey}_timeElapsed`);
        sessionStorage.removeItem(`${storageKey}_sessionId`);
        sessionStorage.removeItem(`${storageKey}_skipped`);
    };

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
            const data = history[qIndex];
            setCurrentQuestion(data.question);
            setShuffledOptions(data.options);
            setSelectedOption(data.selectedOption);
            setIsSubmitted(data.isSubmitted);
            setIsCorrect(data.isCorrect);
            setFeedbackMessage(data.feedbackMessage || "");
        } else {
            generateQuestion(qIndex);
        }
    }, [qIndex]);

    const generateQuestion = (index, retryCount = 0) => {
        const types = ["point_def", "line_def", "angle_intro", "measurement_tool"];
        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];
        let uniqueId = "";

        if (type === "point_def") {
            qText = "What is used to represent a point in geometry?";
            correct = "A fine dot";
            options = ["A fine dot", "A small circle", "A short line", "A square"];
            explanation = "A point has no size, only position. It is usually represented by a small, fine dot marked with a sharp pencil and named with a capital letter.";
            uniqueId = "intro_point_def";
        } else if (type === "line_def") {
            const scenario = randomInt(1, 2);
            if (scenario === 1) {
                qText = "A straight path that extends infinitely in both directions is called a:";
                correct = "Line";
                options = ["Line", "Line Segment", "Ray", "Point"];
                explanation = "A line has no endpoints and can be extended indefinitely on both sides. We mark it with arrows (↔) to show it never ends.";
            } else {
                qText = "If you fold a piece of paper and press it down, the crease formed represents a:";
                correct = "Line Segment";
                options = ["Line Segment", "Ray", "Angle", "Point"];
                explanation = "The crease has two distinct ends on the paper, making it a line segment (a fixed portion of a line).";
            }
            uniqueId = `intro_line_${scenario}`;
        } else if (type === "angle_intro") {
            qText = "Which letter of the alphabet best represents the shape of an angle?";
            correct = "L";
            options = ["L", "O", "I", "S"];
            explanation = "An angle is formed when two lines or rays meet at a common point. The shape 'L' clearly shows two lines meeting at a corner, creating an angle.";
            uniqueId = "intro_angle_alpha";
        } else {
            qText = "Which tool from your geometry box is used to draw or measure the length of a line segment?";
            correct = "Ruler";
            options = ["Ruler", "Compass", "Protractor", "Divider"];
            explanation = "A ruler (or scale) is marked in centimeters and millimeters and is the standard tool for measuring straight lengths.";
            uniqueId = "intro_tool_ruler";
        }

        if (usedQuestions.has(uniqueId) && retryCount < 5) return generateQuestion(index, retryCount + 1);
        setUsedQuestions(prev => new Set(prev).add(uniqueId));

        const shuffled = [...options].sort(() => Math.random() - 0.5);

        const newQuestion = {
            text: qText,
            correctAnswer: correct,
            solution: explanation,
            type: 'mcq',
            options: shuffled
        };

        setCurrentQuestion(newQuestion);
        setShuffledOptions(shuffled);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);

        setHistory(prev => ({
            ...prev,
            [index]: {
                question: newQuestion,
                options: shuffled,
                selectedOption: null,
                isSubmitted: false,
                isCorrect: false
            }
        }));
    };

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
                solution_text: currentQuestion.solution,
                time_spent_seconds: 0
            }).catch(console.error);
        }
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
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
                    <span className="text-[#31326F] font-normal text-lg sm:text-xl">Introduction to Lines and Angles</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max" style={{ zIndex: 110 }}>
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right flex items-center gap-3">
                    {!isSubmitted && (
                        <button
                            className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-xl font-bold hover:bg-gray-200 transition-colors text-sm"
                            onClick={handleSkip}
                        >
                            Skip
                        </button>
                    )}
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
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
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => !isSubmitted && setSelectedOption(option)}
                                                    disabled={isSubmitted}
                                                    className={`option-btn-modern ${isSubmitted
                                                        ? option === currentQuestion.correctAnswer
                                                            ? 'correct'
                                                            : selectedOption === option
                                                                ? 'wrong'
                                                                : 'disabled'
                                                        : selectedOption === option
                                                            ? 'selected'
                                                            : ''
                                                        }`}
                                                >
                                                    <LatexContent html={option} />
                                                </button>
                                            ))}
                                        </div>

                                        {isSubmitted && isCorrect && (
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
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] px-6 py-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-2 text-lg"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                clearProgress(); navigate('/middle/grade/6/lines-and-angles/skills');
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
                                onClick={() => qIndex > 0 && setQIndex(qIndex - 1)}
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
            </footer>
        </div>
    );
};

export default Introduction;

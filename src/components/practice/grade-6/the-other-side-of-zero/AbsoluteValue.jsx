import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, Gem } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import "../../../../pages/juniors/JuniorPracticeSession.css";

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Spot on! Absolute value is always positive! ✨",
    "🌟 Brilliant distance calculation! 🌟",
    "🎉 Correct! You've mastered magnitude! 🎉",
    "✨ Amazing work! ✨",
    "🚀 Super! Zero is its own absolute value! 🚀",
    "🌈 Perfect! Well done! 🌈"
];

const AbsoluteValue = () => {
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
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const [sessionId, setSessionId] = useState(() => getSessionData(`${storageKey}_sessionId`, null));
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 1073;
    const SKILL_NAME = "Absolute Value of Integers";
    const TOTAL_QUESTIONS = 10;

    const [answers, setAnswers] = useState(() => getSessionData(`${storageKey}_answers`, {}));

    useEffect(() => {
        sessionStorage.setItem(`${storageKey}_qIndex`, JSON.stringify(qIndex));
        sessionStorage.setItem(`${storageKey}_history`, JSON.stringify(history));
        sessionStorage.setItem(`${storageKey}_answers`, JSON.stringify(answers));
        sessionStorage.setItem(`${storageKey}_timeElapsed`, JSON.stringify(timeElapsed));
        if (sessionId) sessionStorage.setItem(`${storageKey}_sessionId`, JSON.stringify(sessionId));
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

    const generateQuestion = (index) => {
        const types = ["basic_absolute", "calc_absolute", "distance_zero", "compare_absolute"];
        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];

        if (type === "basic_absolute") {
            const val = randomInt(-50, 50);
            qText = `What is the absolute value of $${val}$? <br/><br/> $|${val}| = \\text{?}$`;
            correct = `$${Math.abs(val)}$`;
            options = [`$${Math.abs(val)}$`, `$${val}$`, `$${-val}$`, `$0$`];
            explanation = `Absolute value $|x|$ is the distance of $x$ from zero. Distance is always positive or zero. $|${val}| = ${Math.abs(val)}$.`;
        } else if (type === "calc_absolute") {
            const a = randomInt(-10, 10);
            const b = randomInt(-10, 10);
            const res = Math.abs(a) + Math.abs(b);
            qText = `Find the value of: <br/><br/> $|${a}| + |${b}|$`;
            correct = `$${res}$`;
            options = [`$${res}$`, `$${a + b}$`, `$${Math.abs(a + b)}$`, `$${Math.abs(a - b)}$`];
            explanation = `$|${a}| = ${Math.abs(a)}$ and $|${b}| = ${Math.abs(b)}$. <br/> $ ${Math.abs(a)} + ${Math.abs(b)} = ${res} $.`;
        } else if (type === "distance_zero") {
            const a = randomInt(-20, 20);
            qText = `How many units away is $${a}$ from zero on the number line?`;
            correct = `${Math.abs(a)} units`;
            options = [`${Math.abs(a)} units`, `${a} units`, `${a + 1} units`, "0 units"];
            explanation = `The distance of a number from zero is its absolute value. Distance is never negative.`;
        } else {
            const a = randomInt(-15, 15);
            const b = randomInt(-15, 15);
            if (Math.abs(a) === Math.abs(b)) return generateQuestion(index);

            qText = `Which is greater? <br/><br/> $|${a}|$ or $|${b}|$`;
            correct = Math.abs(a) > Math.abs(b) ? `$|${a}|$` : `$|${b}|$`;
            options = [`$|${a}|$, because $|${a}| = ${Math.abs(a)}$`, `$|${b}|$, because $|${b}| = ${Math.abs(b)}$`, "Both are equal", "Cannot tell"];
            // Extract core labels for correct match
            correct = Math.abs(a) > Math.abs(b) ? options[0] : options[1];
            explanation = `$|${a}| = ${Math.abs(a)}$ and $|${b}| = ${Math.abs(b)}$. Since $${Math.max(Math.abs(a), Math.abs(b))} > ${Math.min(Math.abs(a), Math.abs(b))}$, the answer is ${Math.abs(a) > Math.abs(b) ? `$|${a}|$` : `$|${b}|$`}.`;
        }

        const shuffled = [...new Set(options)].sort(() => Math.random() - 0.5);

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

        // Record Attempt
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
                time_spent_seconds: 0 // Simplification for now
            }).catch(console.error);
        }
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
        } else {
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
            navigate('/middle/grade/6/the-other-side-of-zero/skills');
        }
    };

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    if (!currentQuestion) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header">
                <div className="header-left">
                    <span className="text-[#31326F] font-normal text-lg sm:text-xl">Absolute Value</span>
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
                                                    className={`option-button-modern ${isSubmitted
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
                                clearProgress(); navigate('/middle/grade/6/the-other-side-of-zero/skills');
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

export default AbsoluteValue;

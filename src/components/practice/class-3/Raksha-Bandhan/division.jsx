
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, Pencil, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Whiteboard from '../../../Whiteboard';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import { FullScreenScratchpad } from '../../../FullScreenScratchpad';
import GenericReportCard from '../GenericReportCard';

import '../../../../pages/juniors/grade3/Raksha-Bandhan.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

const RakshaBandhanDivision = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [history, setHistory] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 800; // Reserved ID for Raksha Bandhan Division
    const SKILL_NAME = "Raksha Bandhan - Division";
    const SHORT_SKILL_NAME = "Division";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});
    const [sessionQuestions, setSessionQuestions] = useState([]);

    useEffect(() => {
        console.log("RakshaBandhanDivision: Component Mounted");
        // Create Session
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            console.log("RakshaBandhanDivision: Creating session for user", userId);
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) {
                    console.log("RakshaBandhanDivision: Session created", sess.session_id);
                    setSessionId(sess.session_id);
                }
            }).catch(err => console.error("Failed to start session", err));
        }

        // Pre-generate unique questions
        const questions = [];
        const storyTypes = ["rakhis", "laddoos", "kaju", "giftBoxes", "cards"];
        const seenCombinations = new Set();
        let loopAttempts = 0;

        console.log("RakshaBandhanDivision: Starting question generation...");
        while (questions.length < TOTAL_QUESTIONS && loopAttempts < 200) {
            loopAttempts++;
            const storyType = storyTypes[questions.length % storyTypes.length];
            const groupSize = randomInt(3, 6);
            const groups = randomInt(4, 8);
            const total = groupSize * groups;
            const comboKey = `${storyType}-${total}-${groupSize}`;

            if (!seenCombinations.has(comboKey)) {
                seenCombinations.add(comboKey);

                let questionText = "";
                let explanation = "";
                const correctAnswer = groups;

                if (storyType === "rakhis") {
                    questionText = `There are ${total} Rakhi threads to be tied. Each brother receives ${groupSize} Rakhis. How many brothers are there?`;
                    explanation = `Total Rakhis = ${total}. Rakhis per brother = ${groupSize}. Number of brothers = ${total} ÷ ${groupSize} = <strong>${correctAnswer}</strong>.`;
                } else if (storyType === "laddoos") {
                    questionText = `There are ${total} delicious laddoos in a box. Each plate can hold ${groupSize} laddoos. How many plates are needed?`;
                    explanation = `Total laddoos = ${total}. Laddoos per plate = ${groupSize}. Number of plates = ${total} ÷ ${groupSize} = <strong>${correctAnswer}</strong>.`;
                } else if (storyType === "kaju") {
                    questionText = `There are ${total} kaju katlis in a tray. ${groupSize} kaju katlis are packed in one small box. How many boxes can be made?`;
                    explanation = `Total kaju katlis = ${total}. Sweets per box = ${groupSize}. Number of boxes = ${total} ÷ ${groupSize} = <strong>${correctAnswer}</strong>.`;
                } else if (storyType === "giftBoxes") {
                    questionText = `There are ${total} small gifts to be wrapped. Each large gift box can hold ${groupSize} gifts. How many gift boxes do we need?`;
                    explanation = `Total gifts = ${total}. Gifts per box = ${groupSize}. Number of boxes = ${total} ÷ ${groupSize} = <strong>${correctAnswer}</strong>.`;
                } else {
                    questionText = `There are ${total} greeting cards for Raksha Bandhan. Each envelope contains ${groupSize} cards. How many envelopes are used?`;
                    explanation = `Total cards = ${total}. Cards per envelope = ${groupSize}. Number of envelopes = ${total} ÷ ${groupSize} = <strong>${correctAnswer}</strong>.`;
                }

                const options = [
                    correctAnswer.toString(),
                    (correctAnswer + 1).toString(),
                    (correctAnswer - 1).toString(),
                    (correctAnswer + 3).toString()
                ];

                // Ensure unique options
                const uniqueOptions = [...new Set(options)];
                while (uniqueOptions.length < 4) {
                    let rand = (correctAnswer + randomInt(4, 10)).toString();
                    if (!uniqueOptions.includes(rand)) uniqueOptions.push(rand);
                }

                questions.push({
                    text: questionText,
                    correctAnswer: correctAnswer.toString(),
                    solution: explanation,
                    shuffledOptions: [...uniqueOptions].sort(() => Math.random() - 0.5)
                });
            }
        }
        console.log(`RakshaBandhanDivision: Generated ${questions.length} questions in ${loopAttempts} attempts.`);

        setSessionQuestions(questions);

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
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const qData = sessionQuestions[qIndex];
            setCurrentQuestion(qData);
            setShuffledOptions(qData.shuffledOptions);
            if (history[qIndex]) {
                setSelectedOption(history[qIndex].selectedOption);
                setIsSubmitted(history[qIndex].isSubmitted);
                setIsCorrect(history[qIndex].isCorrect);
                setFeedbackMessage(history[qIndex].feedbackMessage || '');
            } else {
                setSelectedOption(null);
                setIsSubmitted(false);
                setIsCorrect(false);
                setFeedbackMessage('');
            }
        }
    }, [qIndex, sessionQuestions]);

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
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));

        const feedbackMsg = isRight ? CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)] : "";

        if (isRight) {
            setFeedbackMessage(feedbackMsg);
        } else {
            setShowExplanationModal(true);
        }

        setHistory(prev => ({
            ...prev,
            [qIndex]: {
                ...prev[qIndex],
                text: currentQuestion?.text,
                selected: selectedOption,
                correctAnswer: currentQuestion?.correctAnswer,
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
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
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
            if (sessionId) {
                await api.finishSession(sessionId).catch(console.error);
            }
            setShowResults(true);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    const stats = (() => {
        let correct = 0;
        const total = Object.keys(answers).length;
        Object.values(answers).forEach(ans => {
            if (ans.isCorrect) correct++;
        });
        return { correct, total: TOTAL_QUESTIONS };
    })();

    if (!currentQuestion && !showResults) return <div>Loading...</div>;

    if (showResults) {
        return (
            <GenericReportCard 
                score={Object.values(answers).filter(a => a.isCorrect).length} 
                totalQuestions={TOTAL_QUESTIONS} 
                onRestart={() => window.location.reload()} 
                timeElapsed={timeElapsed} 
                summaryData={Object.values(history)} 
            />
        );
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
                        <span className="hidden sm:inline">Question </span>{qIndex + 1} / {TOTAL_QUESTIONS}
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
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <div className="question-card-modern" style={{}}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', overflow: 'visible' }}>
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
                                        </div>
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
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
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
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
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

export default RakshaBandhanDivision;

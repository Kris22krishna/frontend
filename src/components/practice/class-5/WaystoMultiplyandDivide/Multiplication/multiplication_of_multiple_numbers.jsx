
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Corrected relative paths based on depth (5 levels up from src)
import { api } from '../../../../../services/api';
// Use the shared components that the other junior files use
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
// Import the shared Jr styles
import '../../../../../pages/juniors/JuniorPracticeSession.css';

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

const MultiplicationPracticeMultiple = () => {
    const navigate = useNavigate();

    // Core Game State
    const [qIndex, setQIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    // Feedback State
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Session / Timing State
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [sessionId, setSessionId] = useState(null);
    const [answers, setAnswers] = useState({}); // { 0: true, 1: false ... }

    // Refs for accurate timing (tab visibility handling)
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    // Difficulty State
    const [currentLevel, setCurrentLevel] = useState(0); // 0: Easy, 1: Medium, 2: Hard
    const [consecutiveWrong, setConsecutiveWrong] = useState(0);

    const SKILL_ID = 9005;
    const SKILL_NAME = "Multiply three and four numbers";
    const TOTAL_QUESTIONS = 10;

    // --- Effects ---

    // 1. Session Initialization & Timer
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
    }, []);

    // 2. Question Generation & Progression logic
    useEffect(() => {
        let level = currentLevel;
        // Automatic Progression milestones
        if (qIndex === 3 && currentLevel < 1) {
            level = 1;
            setCurrentLevel(1);
        } else if (qIndex === 6 && currentLevel < 2) {
            level = 2;
            setCurrentLevel(2);
        }

        generateQuestion(level);
    }, [qIndex]);

    // --- Logic ---

    const generateQuestion = (level) => {
        let numbers = [];
        let difficultyLabel;

        if (level === 0) {
            // Easy: 3 different single-digit numbers
            while (numbers.length < 3) {
                const n = randomInt(2, 9);
                if (!numbers.includes(n)) numbers.push(n);
            }
            difficultyLabel = "Easy";
        } else if (level === 1) {
            // Medium: 3 double-digit numbers
            for (let i = 0; i < 3; i++) {
                numbers.push(randomInt(11, 25)); // Slightly smaller range for playability
            }
            difficultyLabel = "Medium";
        } else {
            // Hard: 4 double-digit numbers
            for (let i = 0; i < 4; i++) {
                numbers.push(randomInt(11, 25));
            }
            difficultyLabel = "Hard";
        }

        const product = numbers.reduce((acc, curr) => acc * curr, 1);

        const questionText = `
            <div class='question-container'>
                <p>Multiply the numbers:</p>
                <div style="font-size: 2em; margin: 10px 0;">
                    ${numbers.join(' × ')} = ?
                </div>
            </div>
        `;

        let explanation = `To find the product of ${numbers.join(', ')}:<br/><br/>`;

        // Step-by-step multiplication
        let runningProduct = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
            const nextVal = numbers[i];
            const result = runningProduct * nextVal;
            explanation += `Step ${i}: Multiply ${runningProduct} × ${nextVal} = ${result}<br/>`;
            runningProduct = result;
        }

        explanation += `<br/><strong>Final Answer: ${product}</strong>`;

        const correctAnswer = product.toString();

        // Generate Distractors
        const options = [correctAnswer];

        while (options.length < 4) {
            const offset = randomInt(1, 10) * (level === 0 ? 1 : 10) + randomInt(1, 9);
            const distractor = Math.random() > 0.5
                ? (product + offset).toString()
                : (product - offset).toString();

            if (!options.includes(distractor) && parseInt(distractor) > 0) {
                options.push(distractor);
            }
        }

        // Shuffle
        setShuffledOptions([...options].sort(() => Math.random() - 0.5));

        setCurrentQuestion({
            text: questionText,
            correctAnswer: correctAnswer,
            solution: explanation,
            difficulty: difficultyLabel
        });

        // Reset per-question state
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
    };

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
                difficulty_level: question.difficulty || 'Medium',
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

    // --- Handlers ---

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;

        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
            setConsecutiveWrong(0); // Reset on success
        } else {
            setShowExplanationModal(true);
            const newWrongCount = consecutiveWrong + 1;
            if (newWrongCount >= 2) {
                // Drop level!
                setCurrentLevel(prev => Math.max(0, prev - 1));
                setConsecutiveWrong(0); // Reset after dropping
            } else {
                setConsecutiveWrong(newWrongCount);
            }
        }

        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            // Next Question
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);

            // Reset Timing for next question
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            // Finish Session
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
            navigate(-1);
        }
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            {/* Header */}
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>

                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            {/* Main Content */}
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
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>

                                    {/* Question Text */}
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'center', display: 'block', overflow: 'visible' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>

                                    {/* Options & Interaction */}
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                        } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''
                                                        }`}
                                                    style={{ fontWeight: '500', fontSize: '1.2rem', fontFamily: '"Proxima Nova", sans-serif' }}
                                                    onClick={() => handleOptionSelect(option)}
                                                    disabled={isSubmitted}
                                                >
                                                    <LatexContent html={option} />
                                                </button>
                                            ))}
                                        </div>

                                        {/* Correct Feedback Animation */}
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

            {/* Explanation Modal */}
            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />

            {/* Footer */}
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
                            <X size={20} /> Exit
                        </button>
                    </div>

                    <div className="bottom-center">
                        {isSubmitted ? (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Explanation
                            </button>
                        ) : null}
                    </div>

                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Footer (Simplified) */}
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
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
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

export default MultiplicationPracticeMultiple;

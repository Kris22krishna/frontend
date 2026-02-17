import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, Pencil, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import '../../../../pages/juniors/JuniorPracticeSession.css';

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

const generateGridSVG = (rows, cols, filled) => {
    const size = 40;
    const width = cols * size;
    const height = rows * size;

    let rects = '';

    // Create random simplified pattern or just random cells
    const total = rows * cols;
    const indices = Array.from({ length: total }, (_, i) => i);
    // Shuffle simple for randomness
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const filledIndices = new Set(indices.slice(0, filled));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const isFilled = filledIndices.has(idx);
            // Orange-ish pattern like chikki
            const fill = isFilled ? '#F97316' : '#FFFFFF';
            // Add a texture pattern for filled ones maybe? Simple color for now.
            rects += `<rect x="${c * size}" y="${r * size}" width="${size}" height="${size}" fill="${fill}" stroke="#475569" stroke-width="2" rx="2" />`;
            if (isFilled) {
                // Add some dots for texture
                rects += `<circle cx="${c * size + size / 2}" cy="${r * size + size / 2}" r="${2}" fill="#FFF" opacity="0.5" />`;
                rects += `<circle cx="${c * size + size / 4}" cy="${r * size + size / 4}" r="${1}" fill="#FFF" opacity="0.5" />`;
                rects += `<circle cx="${c * size + 3 * size / 4}" cy="${r * size + 3 * size / 4}" r="${1}" fill="#FFF" opacity="0.5" />`;
            }
        }
    }

    return `<svg viewBox="0 -5 ${width} ${height + 10}" width="${Math.min(width, 300)}" height="${Math.min(height, 200)}" style="display:block; margin:20px auto; filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.1));">${rects}</svg>`;
};

const FairShareHalvesDoubles = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 9006; // Incrementing from cutting.jsx ID
    const SKILL_NAME = "Fair Share - Halves & Doubles";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

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

    useEffect(() => {
        generateQuestion(qIndex);
    }, [qIndex]);

    const generateQuestion = (index) => {
        // Alternate between Text (Halves/Doubles) and Visual (Grid)
        // Or randomly mix. Let's do random but ensure coverage.
        const type = Math.random() < 0.5 ? 'text' : 'visual';

        let questionText, correctAnswer, solution, options;

        if (type === 'text') {
            // "4 marbles are ___ of 8 marbles"
            // "10 marbles are ___ of 5 marbles"
            const styles = ['half', 'double'];
            const chosenStyle = styles[randomInt(0, 1)];

            // Generate base numbers
            // For half: A = small, B = 2*A. "A is half of B"
            // For double: B = 2*A, A = small. "B is double of A"

            const small = randomInt(2, 20);
            const big = small * 2;
            const itemNames = ['marbles', 'chocolates', 'cookies', 'stars', 'coins'];
            const item = itemNames[randomInt(0, itemNames.length - 1)];

            if (chosenStyle === 'half') {
                // "small are ___ of big"
                questionText = `
                    <div class='question-container text-center text-2xl'>
                        <p>${small} ${item} are <span class="annotation-box">_______</span> of ${big} ${item}.</p>
                    </div>
                `;
                correctAnswer = "Half";
                solution = `${small} is exactly half of ${big}, because ${small} + ${small} = ${big}.`;
                options = ["Half", "Double", "Equal", "Quarter"];
            } else {
                // "big are ___ of small"
                questionText = `
                    <div class='question-container text-center text-2xl'>
                        <p>${big} ${item} are <span class="annotation-box">_______</span> of ${small} ${item}.</p>
                    </div>
                `;
                correctAnswer = "Double";
                solution = `${big} is double of ${small}, because ${small} × 2 = ${big}.`;
                options = ["Double", "Half", "Equal", "Triple"];
            }

        } else {
            // Visual Grid Chikki Question
            // "Shabnam has eaten some chikki... Tick how much is left/shaded?"
            const rows = randomInt(2, 4);
            const cols = randomInt(3, 5);
            const total = rows * cols;
            const half = total / 2;

            // Decide target: Less, More, or Equal
            // Ensure half is possible (total must be even for exact half possibility, which it naturally might not be if R*C is odd)
            // If total is odd, exact half is impossible.
            const isTotalEven = total % 2 === 0;
            const targets = ['more', 'less'];
            if (isTotalEven) targets.push('half');

            const target = targets[randomInt(0, targets.length - 1)];

            let filledCount = 0;
            let displayTarget = "";
            let displayAnswer = "";

            if (target === 'half') {
                filledCount = half;
                displayAnswer = "Exactly Half";
                displayTarget = "Equal to half";
            } else if (target === 'less') {
                filledCount = randomInt(1, Math.floor(total / 2) - (isTotalEven && total / 2 === Math.floor(total / 2) ? 1 : 0));
                // Make sure filledCount is at least 1 and strictly less than half
                if (filledCount < 1) filledCount = 1;
                displayAnswer = "Less than Half";
                displayTarget = "Less than half";
            } else {
                // more
                filledCount = randomInt(Math.ceil(total / 2) + (isTotalEven && total / 2 === Math.ceil(total / 2) ? 1 : 0), total - 1);
                displayAnswer = "More than Half";
                displayTarget = "More than half";
            }

            const svg = generateGridSVG(rows, cols, filledCount);

            questionText = `
                <div class='question-container'>
                    <p>Look at the shaded part of the chocolate.</p>
                    ${svg}
                    <p>How much is shaded?</p>
                </div>
            `;
            correctAnswer = displayAnswer;
            const filledStr = `${filledCount} out of ${total}`;
            solution = `There are ${total} blocks total. Half of ${total} is ${total / 2}. <br/>Since ${filledCount} is ${displayTarget.toLowerCase()}, the answer is <strong>${displayAnswer}</strong>.`;

            options = ["Less than Half", "More than Half", "Exactly Half", "Full"];
            // If total is odd, 'Exactly Half' is a valid distractor but impossible.
        }

        const qData = {
            text: questionText,
            correctAnswer: correctAnswer,
            solution: solution,
            options: options
        };

        setShuffledOptions([...qData.options].sort(() => Math.random() - 0.5));
        setCurrentQuestion(qData);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        // Record attempt logic needed? Assuming yes for consistency
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            // simplified recording without full function for brevity if standard
            // but better to keep full logic
            const seconds = Math.round((accumulatedTime.current + (isTabActive.current ? Date.now() - questionStartTime.current : 0)) / 1000);
            api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                template_id: null,
                difficulty_level: 'Easy',
                question_text: "Halves & Doubles",
                correct_answer: String(currentQuestion.correctAnswer),
                student_answer: String(selectedOption),
                is_correct: isRight,
                solution_text: String(currentQuestion.solution),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            }).catch(console.error);
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
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val === true).length;
                api.createReport({
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
                }).catch(console.error);
            }
            navigate(-1);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
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
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'center', justifyContent: 'center', overflow: 'visible', width: '100%' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                        } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''
                                                        }`}
                                                    style={{ fontWeight: '500', fontSize: '1.5rem' }}
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
                        <button
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            <StickerExit size={20} className="hidden" />
                            Exit Practice
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

export default FairShareHalvesDoubles;

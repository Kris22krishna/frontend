import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, Pencil, X, Star } from 'lucide-react';
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
    const [showResults, setShowResults] = useState(false);
    const [sessionQuestions, setSessionQuestions] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        let timer;
        if (!showResults) {
            timer = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }

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
            if (timer) clearInterval(timer);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [showResults]);

    useEffect(() => {
        if (!sessionQuestions[qIndex]) {
            generateQuestion(qIndex);
        } else {
            setCurrentQuestion(sessionQuestions[qIndex]);
            setShuffledOptions(sessionQuestions[qIndex].shuffledOptions);
            const saved = answers[qIndex];
            if (saved) {
                setSelectedOption(saved.selected);
                setIsSubmitted(true);
                setIsCorrect(saved.isCorrect);
            } else {
                setSelectedOption(null);
                setIsSubmitted(false);
                setIsCorrect(false);
            }
        }
    }, [qIndex]);

    const generateQuestion = (index) => {
        let questionText, correctAnswer, solution, options;
        let type;
        let isUnique = false;
        let attempts = 0;

        while (!isUnique && attempts < 100) {
            // Alternate between Text (Halves/Doubles) and Visual (Grid)
            // Or randomly mix. Let's do random but ensure coverage.
            type = Math.random() < 0.5 ? 'text' : 'visual';

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
                solution = `There are ${total} blocks total. Half of ${total} is ${total / 2}. <br/>Since ${filledCount} is ${displayTarget.toLowerCase()}, the answer is <strong>${displayAnswer}</strong>.`;

                options = ["Less than Half", "More than Half", "Exactly Half", "Full"];
                // If total is odd, 'Exactly Half' is a valid distractor but impossible.
            }

            // Check uniqueness against previous questions in the session
            // solution is detailed enough to be a unique identifier
            const isDuplicate = sessionQuestions.slice(0, index).some(q => q.solution === solution);

            if (!isDuplicate) {
                isUnique = true;
            }
            attempts++;
        }

        const qData = {
            text: questionText,
            correctAnswer: correctAnswer,
            solution: solution,
            options: options,
            shuffledOptions: [...options].sort(() => Math.random() - 0.5)
        };

        setSessionQuestions(prev => {
            const next = [...prev];
            next[index] = qData;
            return next;
        });

        setShuffledOptions(qData.shuffledOptions);
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
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));

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
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
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
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    const stats = (() => {
        let correct = 0;
        const total = TOTAL_QUESTIONS;
        Object.values(answers).forEach(ans => {
            if (ans.isCorrect) correct++;
        });
        return { correct, total };
    })();

    if (!currentQuestion && !showResults) return <div>Loading...</div>;

    if (showResults) {
        const score = stats.correct;
        const total = stats.total;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto">
                <header className="junior-practice-header results-header relative">
                    <button
                        onClick={() => navigate('/junior/grade/3/topic/fair-share')}
                        className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm"
                    >
                        Back to Topics
                    </button>
                    <div className="sun-timer-container">
                        <div className="sun-timer">
                            <div className="sun-rays"></div>
                            <span className="timer-text">Done!</span>
                        </div>
                    </div>
                    <div className="title-area">
                        <h1 className="results-title">Adventure Report</h1>
                    </div>
                </header>

                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-2">Adventure Complete! 🎉</h2>

                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}
                                >
                                    <Star
                                        size={60}
                                        fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"}
                                        color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}/{total}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span>
                                <span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Accuracy</span>
                                <span className="text-3xl font-black text-[#31326F]">{percentage}%</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Total Score</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detailed-breakdown w-full mb-12">
                        <h3 className="text-2xl font-black text-[#31326F] mb-6 px-4">Quest Log 📜</h3>
                        <div className="space-y-4">
                            {sessionQuestions.map((q, idx) => {
                                const ans = answers[idx];
                                if (!ans) return null;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className={`p-6 rounded-[2rem] border-4 ${ans.isCorrect ? 'border-[#E0FBEF] bg-white' : 'border-red-50 bg-white'} relative`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white shrink-0 ${ans.isCorrect ? 'bg-[#4FB7B3]' : 'bg-red-400'}`}>
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-lg font-bold text-[#31326F] mb-4 breakdown-question">
                                                    <LatexContent html={q.text} />
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="answer-box p-4 rounded-2xl bg-gray-50 border-2 border-gray-100">
                                                        <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Answer</span>
                                                        <span className={`text-lg font-black ${ans.isCorrect ? 'text-[#4FB7B3]' : 'text-red-500'}`}>
                                                            {ans.selected}
                                                        </span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="answer-box p-4 rounded-2xl bg-[#E0FBEF] border-2 border-[#4FB7B3]/20">
                                                            <span className="block text-[10px] font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct Answer</span>
                                                            <span className="text-lg font-black text-[#31326F]">
                                                                {q.correctAnswer}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="explanation-box p-4 rounded-2xl bg-blue-50/50 border-2 border-blue-100">
                                                    <span className="block text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Explain? 💡</span>
                                                    <div className="text-sm font-medium text-gray-600 leading-relaxed">
                                                        <LatexContent html={q.solution} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="shrink-0 pt-2 text-[#4FB7B3]">
                                                {ans.isCorrect ? <Check size={32} strokeWidth={3} /> : <X size={32} strokeWidth={3} className="text-red-400" />}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="results-actions flex flex-col md:flex-row justify-center gap-4 py-8 border-t-4 border-dashed border-gray-100">
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl shadow-xl hover:-translate-y-1 transition-all" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Practice Again
                        </button>
                        <button className="px-12 py-4 rounded-2xl border-4 border-[#31326F] text-[#31326F] font-black text-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3" onClick={() => navigate('/junior/grade/3/topic/Fair Share')}>
                            Back to Topics
                        </button>
                    </div>
                </main>
            </div>
        );
    }

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
                        <div className="nav-buttons-group flex items-center gap-3">
                            {qIndex > 0 && (
                                <button className="nav-pill-prev-btn px-6 py-3 rounded-2xl border-2 border-[#31326F] text-[#31326F] font-bold flex items-center gap-2 hover:bg-gray-50 transition-all" onClick={handlePrevious}>
                                    <ChevronLeft size={24} /> Previous
                                </button>
                            )}
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

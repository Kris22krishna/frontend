
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const questions = [
    {
        id: 1,
        question: "Jump by 10s: 720, 730, ___",
        patternType: 'linear',
        sequence: [720, 730, null],
        jump: '+10',
        options: ["740", "750", "735", "731"],
        correct: "740",
        solution: "730 + 10 = 740."
    },
    {
        id: 2,
        question: "Jump by 100s: 450, 550, ___",
        patternType: 'vertical', // Represent as stack
        sequence: [450, 550, null],
        jump: '+100',
        options: ["650", "600", "560", "750"],
        correct: "650",
        solution: "550 + 100 = 650."
    },
    {
        id: 3,
        question: "Jump by 20s backwards: 850, 830, ___",
        patternType: 'linear',
        sequence: [850, 830, null],
        jump: '-20',
        options: ["810", "820", "800", "840"],
        correct: "810",
        solution: "830 - 20 = 810."
    },
    {
        id: 4,
        question: "What comes next? 760, ___, 800",
        patternType: 'linear',
        sequence: [760, null, 800],
        jump: '+20', // Implicit
        options: ["780", "770", "790", "750"],
        correct: "780",
        solution: "The pattern is +20. 760 + 20 = 780. Check: 780 + 20 = 800."
    },
    {
        id: 5,
        question: "Add 15 steps: 845, 860, ___",
        patternType: 'zigzag',
        sequence: [845, 860, null],
        jump: '+15',
        options: ["875", "870", "865", "880"],
        correct: "875",
        solution: "860 + 15 = 875."
    },
    {
        id: 6,
        question: "Skip count by 50: 200, 250, 300, ___",
        patternType: 'linear',
        sequence: [200, 250, 300, null],
        jump: '+50',
        options: ["350", "400", "320", "310"],
        correct: "350",
        solution: "300 + 50 = 350."
    },
    {
        id: 7,
        question: "Jump by 25: 880, ___, 930",
        patternType: 'cross',
        sequence: [880, null, 930],
        jump: '+25',
        options: ["905", "900", "910", "890"],
        correct: "905",
        solution: "880 + 25 = 905. 905 + 25 = 930."
    },
    {
        id: 8,
        question: "Climb up by 5s: 105, 110, 115, ___",
        patternType: 'vertical',
        sequence: [105, 110, 115, null],
        jump: '+5',
        options: ["120", "125", "130", "140"],
        correct: "120",
        solution: "115 + 5 = 120."
    },
    {
        id: 9,
        question: "Big jump of 30: 830, 860, 890, ___",
        patternType: 'linear',
        sequence: [830, 860, 890, null],
        jump: '+30',
        options: ["920", "900", "910", "930"],
        correct: "920",
        solution: "890 + 30 = 920."
    },
    {
        id: 10,
        question: "Complete the box chain: 950, 940, ___, 920",
        patternType: 'linear',
        sequence: [950, 940, null, 920],
        jump: '-10',
        options: ["930", "935", "910", "925"],
        correct: "930",
        solution: "940 - 10 = 930. 930 - 10 = 920."
    }
];

const SkipAndSolve = () => {
    const navigate = useNavigate();
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);

    const currentQ = questions[currentQIndex];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (option) => {
        if (!isSubmitted) setSelectedOption(option);
    };

    const handleCheckAnswer = () => {
        if (isSubmitted || !selectedOption) return;

        const isRight = selectedOption === currentQ.correct;
        setIsCorrect(isRight);
        setIsSubmitted(true);

        if (isRight) {
            setFeedback('correct');
            setScore(prev => prev + 1);
        } else {
            setFeedback('wrong');
            setShowExplanationModal(true);
        }
    };

    const handleNext = () => {
        setFeedback(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setSelectedOption(null);
        setShowExplanationModal(false);

        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const handlePrevious = () => {
        if (currentQIndex > 0) {
            setCurrentQIndex(prev => prev - 1);
            setFeedback(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            setSelectedOption(null);
            setShowExplanationModal(false);
        }
    };

    const handleRestart = () => {
        setCurrentQIndex(0);
        setScore(0);
        setShowResult(false);
        setFeedback(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setSelectedOption(null);
        setTimeElapsed(0);
    };

    const renderPattern = () => {
        const { sequence, patternType, jump } = currentQ;

        // Render sequences based on patternType
        // Using flexbox with arrows

        return (
            <div className={`flex items-center justify-center gap-2 my-2 flex-wrap ${patternType === 'vertical' ? 'flex-col gap-1' : 'flex-row'}`}>
                {sequence.map((val, idx) => (
                    <React.Fragment key={idx}>
                        {/* Box */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`
                                w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center text-lg md:text-xl font-bold shadow-md border-b-4
                                ${val === null
                                    ? (isSubmitted && isCorrect
                                        ? 'bg-green-100 text-green-700 border-green-300'
                                        : 'bg-blue-50 border-blue-200 text-blue-300 animate-pulse')
                                    : 'bg-white text-[#31326F] border-slate-200'}
                            `}
                        >
                            {val === null ? (isSubmitted && isCorrect ? currentQ.correct : '?') : val}
                        </motion.div>

                        {/* Arrow (if not last) */}
                        {idx < sequence.length - 1 && (
                            <div className={`flex flex-col items-center justify-center ${patternType === 'vertical' ? 'my-0.5' : 'mx-0.5'}`}>
                                <div className={`text-[9px] md:text-[10px] font-bold text-orange-500 bg-orange-50 px-1 py-0 rounded-full mb-0 leading-none`}>
                                    {jump}
                                </div>
                                {patternType === 'vertical' ? (
                                    <div className="text-orange-400 text-base leading-none">⬇️</div>
                                ) : (
                                    <div className="text-orange-400 text-base leading-none">➡️</div>
                                )}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    }

    if (showResult) {
        return (
            <div className="junior-practice-page results-view">
                <div className="practice-content-wrapper flex-col">
                    <h1 className="text-4xl font-black text-[#31326F] mb-6">Pattern Master! 🧩</h1>
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl border-4 border-white text-center max-w-md w-full">
                        <div className="flex justify-center mb-6">
                            <span className="text-8xl">🐇</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#31326F] mb-2">{score} / {questions.length} Correct</h2>
                        <p className="text-gray-500 mb-8 font-medium">You skipped and solved them all!</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={handleRestart} className="py-3 rounded-xl bg-[#31326F] text-white font-bold text-lg hover:bg-[#25265E] transition-all">Play Again</button>
                            <button onClick={() => navigate(-1)} className="py-3 rounded-xl border-2 border-[#31326F] text-[#31326F] font-bold text-lg hover:bg-blue-50 transition-all">Exit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100vh', overflow: 'hidden' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem', position: 'relative' }}>
                <div className="header-left">
                    <button
                        className="bg-white/50 text-[#31326F] p-2 rounded-full hover:bg-white transition-colors"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={24} />
                    </button>
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {currentQIndex + 1} / {questions.length}
                    </div>
                </div>

                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto', width: '100%', height: 'auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ padding: '2rem', paddingBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1, justifyContent: 'center' }}>
                            <div className="question-header-modern" style={{ marginBottom: '0' }}>
                                <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-bold uppercase tracking-wide text-xs mb-2">
                                    Skip & Solve
                                </div>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: '600', textAlign: 'center', width: '100%', justifyContent: 'center', margin: 0 }}>
                                    {currentQ.question}
                                </h2>
                            </div>

                            {/* Dynamic Pattern Diagram */}
                            {renderPattern()}

                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {currentQ.options.map((opt, i) => {
                                        const isRight = isSubmitted && opt === currentQ.correct;
                                        const isWrong = isSubmitted && selectedOption === opt && opt !== currentQ.correct;

                                        return (
                                            <button
                                                key={i}
                                                className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''}`}
                                                onClick={() => handleOptionSelect(opt)}
                                                disabled={isSubmitted}
                                                style={{
                                                    minHeight: '55px',
                                                    fontWeight: '500',
                                                    fontSize: '1.1rem',
                                                    backgroundColor: isRight ? '#4CAF50' : (isWrong ? '#EF5350' : undefined),
                                                    color: (isRight || isWrong) ? 'white' : undefined,
                                                    borderColor: isRight ? '#2E7D32' : (isWrong ? '#C62828' : undefined),
                                                    transform: isRight ? 'scale(1.02)' : 'none',
                                                    boxShadow: isRight ? '0 4px 12px rgba(76, 175, 80, 0.3)' : undefined
                                                }}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                                {isSubmitted && isCorrect && (
                                    <div className="feedback-mini correct mt-4">
                                        <span className="text-2xl mr-2">🐇</span>
                                        Spot on!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQ.correct}
                explanation={currentQ.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={() => navigate(-1)}
                        >
                            <X size={20} /> Exit
                        </button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Steps
                            </button>
                        )}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button
                                className="nav-pill-next-btn"
                                onClick={handlePrevious}
                                disabled={currentQIndex === 0}
                                style={{ opacity: currentQIndex === 0 ? 0.5 : 1, marginRight: '10px', backgroundColor: '#eef2ff', color: '#31326F' }}
                            >
                                <ChevronLeft size={28} strokeWidth={3} /> Prev
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {currentQIndex < questions.length - 1 ? (
                                        <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheckAnswer} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={() => navigate(-1)}>
                            <X size={20} />
                        </button>
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={18} /> Steps
                            </button>
                        )}
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {currentQIndex < questions.length - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheckAnswer} disabled={!selectedOption}>
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

export default SkipAndSolve;

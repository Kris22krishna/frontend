
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const questions = [
    {
        id: 1,
        question: "Which sum makes 400?",
        centerNumber: 400,
        type: "addition",
        correct: "290 + 110",
        options: ["290 + 110", "250 + 100", "300 + 50", "350 + 20"],
        solution: "290 + 110 = 400. The other options are: 350, 350, 370."
    },
    {
        id: 2,
        question: "Find the subtraction for 400:",
        centerNumber: 400,
        type: "subtraction",
        correct: "500 - 100",
        options: ["500 - 100", "450 - 20", "420 - 10", "600 - 150"],
        solution: "500 - 100 = 400."
    },
    {
        id: 3,
        question: "Which math sentence gives 775?",
        centerNumber: 775,
        type: "mixed",
        correct: "750 + 25",
        options: ["700 + 50", "750 + 25", "800 - 15", "780 - 10"],
        solution: "750 + 25 = 775."
    },
    {
        id: 4,
        question: "Make 775 by adding:",
        centerNumber: 775,
        type: "addition",
        correct: "400 + 375",
        options: ["400 + 300", "400 + 375", "375 + 300", "500 + 200"],
        solution: "400 + 375 = 775."
    },
    {
        id: 5,
        question: "Find a number SMALLER than 400:",
        centerNumber: 400,
        type: "comparison_less",
        correct: "385",
        options: ["419", "405", "385", "425"],
        solution: "385 is smaller than 400."
    },
    {
        id: 6,
        question: "Find a number BIGGER than 400:",
        centerNumber: 400,
        type: "comparison_greater",
        correct: "425",
        options: ["399", "350", "100", "425"],
        solution: "425 is bigger than 400."
    },
    {
        id: 7,
        question: "Which expression is equal to 500?",
        centerNumber: 500,
        type: "mixed",
        correct: "250 + 250",
        options: ["200 + 200", "600 - 50", "250 + 250", "400 + 50"],
        solution: "250 + 250 = 500."
    },
    {
        id: 8,
        question: "Who is hiding 350 + 50?",
        centerNumber: 400, // Answer should be related to this
        type: "reverse", // Given expression, find result
        correct: "400",
        options: ["300", "400", "450", "500"],
        solution: "350 + 50 = 400."
    },
    {
        id: 9,
        question: "Find the missing piece: 200 + ___ = 400",
        centerNumber: 400,
        type: "missing_addend",
        correct: "200",
        options: ["100", "200", "300", "150"],
        solution: "200 + 200 = 400."
    },
    {
        id: 10,
        question: "Fill the blank: ___ < 436",
        centerNumber: 436,
        type: "comparison_less", // Should find number < 436
        correct: "420", // Assuming options provided
        options: ["440", "450", "438", "420"],
        solution: "420 is less than 436 (<)."
    }
];

const NumberInTheCentre = () => {
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

    // --- Dynamic Diagram Rendering ---
    const renderDiagram = () => {
        // Center Circle Style
        const centerCircleStyle = "w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-4 border-dashed border-[#4FB7B3] flex items-center justify-center text-3xl md:text-4xl font-black text-[#31326F] shadow-lg relative z-10";

        // Connector Line Style
        const connectorStyle = "absolute top-1/2 left-1/2 w-32 h-1 bg-[#4FB7B3] -z-0 origin-left";

        // Crocodile Mouth (SVG) for comparisons
        const crocodileMouth = (direction) => (
            <svg width="60" height="40" viewBox="0 0 60 40" className={`absolute ${direction === 'left' ? '-left-16' : '-right-16'} top-1/2 -translate-y-1/2 text-green-600`}>
                {/* Simplified crocodile mouth representation */}
                <path d={direction === 'left' ? "M 50 20 L 10 5 L 10 35 Z" : "M 10 20 L 50 5 L 50 35 Z"} fill="currentColor" stroke="#2E7D32" strokeWidth="2" />
                <circle cx={direction === 'left' ? "15" : "45"} cy="10" r="2" fill="white" />
                <path d={direction === 'left' ? "M 15 5 Q 20 10 15 15" : "M 45 5 Q 40 10 45 15"} stroke="#1B5E20" strokeWidth="1" fill="none" />
            </svg>
        );

        if (currentQ.type.startsWith('comparison')) {
            return (
                <div className="flex items-center justify-center gap-8 relative my-8">
                    {/* Left Box (Placeholder or Value) */}
                    <div className="w-24 h-16 bg-blue-100 rounded-xl border-2 border-blue-300 flex items-center justify-center font-bold text-xl text-blue-800 shadow-sm relative">
                        {currentQ.type === 'comparison_less' ? '?' : '...'}
                        {currentQ.type === 'comparison_less' && crocodileMouth('right')}
                        {/* If looking for smaller than center, Center > Option. Crocodile eats Center. */}
                        {/* Wait, "Find a number SMALLER than 400". 385 < 400. Crocodile eats 400. Mouth opens to right towards 400. */}
                    </div>

                    {/* Center Number */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={centerCircleStyle}
                    >
                        {currentQ.centerNumber}
                    </motion.div>

                    {/* Right Box (Placeholder or Value) */}
                    <div className="w-24 h-16 bg-blue-100 rounded-xl border-2 border-blue-300 flex items-center justify-center font-bold text-xl text-blue-800 shadow-sm relative">
                        {currentQ.type === 'comparison_greater' ? '?' : '...'}
                        {currentQ.type === 'comparison_greater' && crocodileMouth('left')}
                        {/* If looking for bigger than 400. 425 > 400. Crocodile eats 425. Mouth opens to right (towards box). */}
                    </div>
                </div>
            );
        }

        // Default Spider/Sun Diagram for Addition/Subtraction
        return (
            <div className="relative w-full max-w-sm h-64 mx-auto flex items-center justify-center my-4">
                {/* Center Number */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={centerCircleStyle}
                >
                    {currentQ.centerNumber}
                </motion.div>

                {/* Satellite Nodes (Visual only, representing options/slots) */}
                {[0, 90, 180, 270].map((deg, i) => (
                    <div key={i} className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none" style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                            <div className="w-12 h-1 bg-orange-300"></div>
                            <div className="w-24 h-12 bg-yellow-100 rounded-lg border-2 border-yellow-300 flex items-center justify-center text-xs font-bold text-yellow-700 shadow-sm transform -rotate-90 md:text-sm">
                                {i === 0 ? "?" : "..."}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    if (showResult) {
        return (
            <div className="junior-practice-page results-view">
                <div className="practice-content-wrapper flex-col">
                    <h1 className="text-4xl font-black text-[#31326F] mb-6">Number Wizard! 🧙‍♂️</h1>
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl border-4 border-white text-center max-w-md w-full">
                        <div className="flex justify-center mb-6">
                            <span className="text-8xl">🌟</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#31326F] mb-2">{score} / {questions.length} Correct</h2>
                        <p className="text-gray-500 mb-8 font-medium">You solved the number puzzles!</p>
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
                                <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-bold uppercase tracking-wide text-xs mb-2">
                                    Number in Centre
                                </div>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: '600', textAlign: 'center', width: '100%', justifyContent: 'center', margin: 0 }}>
                                    {currentQ.question}
                                </h2>
                            </div>

                            {/* Dynamic Visual Diagram */}
                            {renderDiagram()}

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
                                                    minHeight: '60px',
                                                    fontWeight: '500',
                                                    fontSize: '1.2rem',
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
                                        <span className="text-2xl mr-2">🌟</span>
                                        Perfect match!
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
                                <Eye size={20} /> View Logic
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
                                    Check <Check size={28} strokeWidth={3} />
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
                                <Eye size={18} /> Logic
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
                                    Check
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default NumberInTheCentre;

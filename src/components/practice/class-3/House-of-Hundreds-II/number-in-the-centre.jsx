
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';
import '../../../../pages/juniors/grade3/House-of-Hundreds-II.css';

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
    const SKILL_NAME = "House of Hundreds II - Number in the Centre";
    const SHORT_SKILL_NAME = "Number Centre";
    const navigate = useNavigate();
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [history, setHistory] = useState({});
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
        setHistory(prev => ({ ...prev, [currentQIndex]: { feedback, isSubmitted, isCorrect, selectedOption } }));
        setShowExplanationModal(false);

        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };


    useEffect(() => {
        if (history[currentQIndex]) {
            setFeedback(history[currentQIndex].feedback);
            setIsSubmitted(history[currentQIndex].isSubmitted);
            setIsCorrect(history[currentQIndex].isCorrect);
            setSelectedOption(history[currentQIndex].selectedOption);
        } else {
            setFeedback(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            setSelectedOption(null);
        }
        setShowExplanationModal(false);
    }, [currentQIndex]);

    const handlePrevious = () => {
        if (currentQIndex > 0) {
            setHistory(prev => ({ ...prev, [currentQIndex]: { feedback, isSubmitted, isCorrect, selectedOption } }));
            setCurrentQIndex(prev => prev - 1);
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
                    <div className="w-24 h-16 bg-blue-100 rounded-xl border-2 border-blue-300 flex items-center justify-center font-bold text-2xl text-blue-800 shadow-sm relative">
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
                    <div className="w-24 h-16 bg-blue-100 rounded-xl border-2 border-blue-300 flex items-center justify-center font-bold text-2xl text-blue-800 shadow-sm relative">
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
        <div className="junior-practice-page raksha-theme grey-selection-theme house-of-hundreds-ii-practice-page" style={{ fontFamily: '"Open Sans", sans-serif', height: '100vh', overflow: 'hidden' }}>
            <header className="junior-practice-header house-of-hundreds-ii-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem', position: 'relative' }}>
                <div className="header-left">
                    <span className="skill-name-desktop text-[#31326F] font-normal text-lg sm:text-xl">{SKILL_NAME}</span>
                    <span className="skill-name-mobile text-[#31326F] font-normal text-lg sm:text-xl">{SHORT_SKILL_NAME}</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-center">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] text-sm sm:text-lg lg:text-2xl shadow-lg whitespace-nowrap font-medium">
                        <span className="hidden sm:inline">Question </span>{currentQIndex + 1} / {questions.length}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-sm sm:text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto', width: '100%', height: 'auto' }}>
                    <div className="practice-left-col house-of-hundreds-ii-left-col">
                        <div className="question-card-modern" style={{ padding: '2rem', paddingBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1, justifyContent: 'center' }}>
                            <div className="question-header-modern" style={{ marginBottom: '1rem' }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: '600', textAlign: 'center', width: '100%', justifyContent: 'center', margin: 0 }}>
                                    {currentQ.question}
                                </h2>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full mt-2">
                                {/* Left side: Diagram */}
                                <div className="flex-1 w-full flex justify-center items-center">
                                    {renderDiagram()}
                                </div>

                                {/* Right side: Options */}
                                <div className="flex-1 w-full max-w-xs xl:max-w-sm interaction-area-modern !mt-0">
                                    <div className="flex flex-col gap-3 w-full">
                                        {currentQ.options.map((opt, i) => {
                                            const isRight = isSubmitted && opt === currentQ.correct;
                                            const isWrong = isSubmitted && selectedOption === opt && opt !== currentQ.correct;

                                            return (
                                                <button
                                                    key={i}
                                                    className={`option-btn-modern w-full ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === currentQ.correct ? 'correct' : ''} ${isSubmitted && selectedOption === opt && opt !== currentQ.correct ? 'wrong' : ''}`}
                                                    onClick={() => handleOptionSelect(opt)}
                                                    disabled={isSubmitted}
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
                            <button onClick={handlePrevious} disabled={currentQIndex === 0} className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${currentQIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}><ChevronLeft size={24} strokeWidth={3} /> PREV</button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {currentQIndex < questions.length - 1 ? (
                                        <>NEXT <ChevronRight size={24} strokeWidth={3} /></>
                                    ) : (
                                        <>DONE <Check size={24} strokeWidth={3} /></>
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

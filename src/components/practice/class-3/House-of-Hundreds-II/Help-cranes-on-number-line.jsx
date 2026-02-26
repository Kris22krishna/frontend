
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, ChevronLeft, ChevronRight, Eye, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';
import '../../../../pages/juniors/grade3/House-of-Hundreds-II.css';

const questions = [
    {
        id: 1,
        cranePos: 667,
        targetPos: 650, // Backward
        targetType: 'worm',
        question: "The crane is at 667. It needs to reach the worm at 650. How many steps back must it fly?",
        options: ["17", "10", "20", "5"],
        correct: "17",
        solution: "667 - 650 = 17 steps back."
    },
    {
        id: 2,
        cranePos: 667,
        targetPos: 700, // Forward
        targetType: 'fish',
        question: "The crane is at 667. It needs to reach the fish at 700. How many steps forward must it fly?",
        options: ["33", "30", "40", "23"],
        correct: "33",
        solution: "700 - 667 = 33 steps forward."
    },
    {
        id: 3,
        cranePos: 345,
        targetPos: 350,
        targetType: 'fish',
        question: "Fly from 345 to the fish at 350. What is the distance?",
        options: ["5", "10", "15", "50"],
        correct: "5",
        solution: "350 - 345 = 5 steps."
    },
    {
        id: 4,
        cranePos: 345,
        targetPos: 340,
        targetType: 'worm',
        question: "Fly back from 345 to the worm at 340. How many steps?",
        options: ["5", "15", "10", "45"],
        correct: "5",
        solution: "345 - 340 = 5 steps."
    },
    {
        id: 5,
        cranePos: 892,
        targetPos: 880,
        targetType: 'worm',
        question: "The crane starts at 892. The worm is at 880. Find the number of steps.",
        options: ["12", "22", "8", "20"],
        correct: "12",
        solution: "892 - 880 = 12 steps."
    },
    {
        id: 6,
        cranePos: 892,
        targetPos: 900,
        targetType: 'fish',
        question: "The crane flies from 892 to 900. How many steps does it take?",
        options: ["8", "18", "12", "10"],
        correct: "8",
        solution: "900 - 892 = 8 steps."
    },
    {
        id: 7,
        cranePos: 123,
        targetPos: 100,
        targetType: 'worm',
        question: "Go from 123 back to the worm at 100. How many steps?",
        options: ["23", "32", "13", "30"],
        correct: "23",
        solution: "123 - 100 = 23 steps."
    },
    {
        id: 8,
        cranePos: 555,
        targetPos: 600,
        targetType: 'fish',
        question: "From 555 to reach the fish at 600, how many steps are needed?",
        options: ["45", "55", "50", "35"],
        correct: "45",
        solution: "600 - 555 = 45 steps."
    },
    {
        id: 9,
        cranePos: 450,
        targetPos: 400,
        targetType: 'worm',
        question: "The crane is at 450. The worm is at 400. How far back is the worm?",
        options: ["50", "40", "150", "100"],
        correct: "50",
        solution: "450 - 400 = 50 steps."
    },
    {
        id: 10,
        cranePos: 995,
        targetPos: 1000,
        targetType: 'fish',
        question: "Fly from 995 to the fish at 1000. How many small steps?",
        options: ["5", "15", "10", "50"],
        correct: "5",
        solution: "1000 - 995 = 5 steps."
    }
];

const HelpCranesOnNumberLine = () => {
    const SKILL_NAME = "House of Hundreds II - Help Cranes on Number Line";
    const SHORT_SKILL_NAME = "Help Cranes";
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

    // --- SVG Rendering Logic ---
    const renderNumberLine = () => {
        const { cranePos, targetPos, targetType } = currentQ;
        const minVal = Math.min(cranePos, targetPos) - 10;
        const maxVal = Math.max(cranePos, targetPos) + 10;
        const range = maxVal - minVal;

        // ViewBox width 800, height 150
        // X coord = ((val - minVal) / range) * 700 + 50 (margin 50)

        const getX = (val) => ((val - minVal) / range) * 700 + 50;

        // Ticks - Generate for every integer in range if small range, else every 5
        const step = 1;
        const ticks = [];
        for (let t = Math.floor(minVal); t <= Math.ceil(maxVal); t += step) {
            ticks.push(t);
        }

        return (
            <svg viewBox="0 0 800 250" className="w-full h-full drop-shadow-lg">
                <defs>
                    <linearGradient id="water" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#E0F7FA" />
                        <stop offset="100%" stopColor="#B2EBF2" />
                    </linearGradient>
                </defs>

                {/* Water Background at bottom */}
                <path d="M0,150 Q200,140 400,150 T800,150 V200 H0 Z" fill="url(#water)" opacity="0.6" />
                <path d="M0,160 Q200,150 400,160 T800,160 V200 H0 Z" fill="url(#water)" opacity="0.8" />

                {/* Main Line */}
                <line x1="20" y1="100" x2="780" y2="100" stroke="#8BC34A" strokeWidth="4" strokeLinecap="round" />

                {/* Ticks */}
                {ticks.map(val => {
                    const x = getX(val);
                    const isMajor = val % 5 === 0;
                    const isSpecific = val === cranePos || val === targetPos;

                    const showLabel = isMajor || isSpecific;

                    return (
                        <g key={val}>
                            <line
                                x1={x} y1="150"
                                x2={x} y2={isMajor ? 165 : (isSpecific ? 160 : 158)}
                                stroke={isSpecific ? "#F57C00" : "#558B2F"}
                                strokeWidth={isSpecific ? 3 : (isMajor ? 2 : 1)}
                            />
                            {showLabel && (
                                <text
                                    x={x}
                                    y={isMajor ? 185 : 185}
                                    transform={isSpecific && !isMajor ? `translate(0, ${val % 2 === 0 ? 0 : 15})` : ""}
                                    textAnchor="middle"
                                    fill={isSpecific ? "#E65100" : "#33691E"}
                                    fontSize={isSpecific ? "14" : "12"}
                                    fontWeight={isSpecific ? "bold" : "normal"}
                                >
                                    {val}
                                </text>
                            )}
                        </g>
                    );
                })}

                {/* Crane (Custom SVG) */}
                <g transform={`translate(${getX(cranePos)}, 150)`}>
                    <motion.g
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Custom Crane Drawing centered on line */}
                        <g transform="translate(0, -5) scale(0.8)">
                            {/* Legs */}
                            <line x1="-5" y1="0" x2="-5" y2="-40" stroke="#333" strokeWidth="2" />
                            <line x1="5" y1="0" x2="5" y2="-40" stroke="#333" strokeWidth="2" />

                            {/* Body */}
                            <ellipse cx="0" cy="-55" rx="25" ry="18" fill="white" stroke="#ccc" />
                            <path d="M -15 -55 Q -25 -45 -5 -45 Z" fill="#ccc" opacity="0.2" />

                            {/* Neck */}
                            <path d="M 15 -65 Q 35 -90 25 -110" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />

                            {/* Head */}
                            <circle cx="25" cy="-110" r="8" fill="white" stroke="#ccc" strokeWidth="1" />
                            <circle cx="27" cy="-112" r="1.5" fill="black" />

                            {/* Beak */}
                            <path d="M 32 -108 L 50 -105 L 32 -102 Z" fill="#FF9800" />
                        </g>
                    </motion.g>
                    <text x="0" y="-120" textAnchor="middle" fill="#31326F" fontSize="14" fontWeight="bold">You</text>
                </g>

                {/* Target */}
                <g transform={`translate(${getX(targetPos)}, 150)`}>
                    <motion.g
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <text x="0" y="-10" fontSize="30" textAnchor="middle">
                            {targetType === 'worm' ? '🪱' : '🐟'}
                        </text>
                    </motion.g>
                    <text x="0" y="15" textAnchor="middle" fill="#E65100" fontSize="12" fontWeight="bold">Target</text>
                </g>

                {/* Connection Arc (Optional, shows path) */}
                {isSubmitted && (
                    <motion.path
                        d={`M ${getX(cranePos)} 140 Q ${(getX(cranePos) + getX(targetPos)) / 2} 10 ${getX(targetPos)} 140`}
                        fill="none"
                        stroke="#FF5722"
                        strokeWidth="3"
                        strokeDasharray="10 5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                    />
                )}
            </svg>
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

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '900px', margin: '0 auto' }}>
                    <div className="practice-left-col house-of-hundreds-ii-left-col">
                        <div className="question-card-modern" style={{ paddingRight: '2rem', paddingBottom: '2rem', justifyContent: 'flex-start' }}>
                            {/* Question text — top full width */}
                            <div className="question-header-modern mb-4 w-full">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: '500', textAlign: 'center', width: '100%', justifyContent: 'center' }}>
                                    {currentQ.question}
                                </h2>
                            </div>

                            {/* Number line left + options right */}
                            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6 items-stretch">
                                {/* SVG Number Line — left, with Spot on below it */}
                                <div className="flex-1 flex flex-col gap-1">
                                    <div className="bg-blue-50/50 rounded-xl border-2 border-blue-100 overflow-hidden relative" style={{ minHeight: '110px' }}>
                                        {renderNumberLine()}
                                    </div>
                                    {isSubmitted && isCorrect && (
                                        <div className="feedback-mini correct w-full justify-center" style={{ fontSize: '0.85rem', padding: '0.3rem 0.75rem' }}>
                                            <span className="text-base mr-1">🦢</span>
                                            Spot on!
                                        </div>
                                    )}
                                </div>

                                {/* Options — right */}
                                <div className="interaction-area-modern flex-shrink-0 md:w-36 flex flex-col justify-center">
                                    <div className="options-grid-modern flex flex-col gap-1">
                                        {currentQ.options.map((opt, i) => {
                                            return (
                                                <button
                                                    key={i}
                                                    className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === currentQ.correct ? 'correct' : ''} ${isSubmitted && selectedOption === opt && opt !== currentQ.correct ? 'wrong' : ''}`}
                                                    onClick={() => handleOptionSelect(opt)}
                                                    disabled={isSubmitted}
                                                    style={{ minHeight: '28px', padding: '0.1rem 0.3rem', fontSize: '0.78rem', borderRadius: '0.5rem' }}
                                                >
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>
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
                                <Eye size={20} /> View Explanation
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
                                <Eye size={18} /> Explain
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

export default HelpCranesOnNumberLine;

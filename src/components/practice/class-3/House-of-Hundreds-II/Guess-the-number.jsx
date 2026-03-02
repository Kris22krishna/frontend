import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, ChevronRight, ChevronLeft, Eye, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ExplanationModal from '../../../../components/ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';
import '../../../../pages/juniors/grade3/House-of-Hundreds-II.css';

// Concept Mapping based on "Word Numerals" (Bhutasankhya) simplified for kids
const WORD_NUMERALS = {
    0: { label: "Sky", icon: "🌌", hint: "Nothingness, Void" },
    1: { label: "Moon", icon: "🌙", hint: "There is only one Moon" },
    2: { label: "Eyes", icon: "👀", hint: "We have two eyes" },
    3: { label: "Traffic Light", icon: "🚦", hint: "Red, Yellow, Green" },
    4: { label: "Directions", icon: "🧭", hint: "North, South, East, West" },
    5: { label: "Fingers", icon: "🖐️", hint: "One hand has 5 fingers" },
    6: { label: "Insects", icon: "🐞", hint: "Insects have 6 legs" },
    7: { label: "Rainbow", icon: "🌈", hint: "7 Colors of Rainbow" },
    8: { label: "Octopus", icon: "🐙", hint: "8 Tentacles" },
    9: { label: "Planets", icon: "🪐", hint: "Navagraha (9 Planets)" }
};

// Questions: Combining 2 or 3 cards to form a number
const questions = [
    {
        id: 1,
        type: 'mcq',
        question: "Look at the cards! What number do they make?",
        cards: [1, 2], // Moon, Eyes -> 12
        correct: "12",
        options: ["12", "21", "3", "102"],
        solution: "Moon is 1. Eyes are 2. Together they make 1-2 (12)."
    },
    {
        id: 2,
        type: 'mcq',
        question: "Guess the number!",
        cards: [5, 3], // Fingers, Traffic Light -> 53
        correct: "53",
        options: ["35", "53", "8", "503"],
        solution: "Fingers (5) and Traffic Light (3) make 53."
    },
    {
        id: 3,
        type: 'mcq',
        question: "What is this number?",
        cards: [4, 0], // Directions, Sky -> 40
        correct: "40",
        options: ["4", "40", "44", "04"],
        solution: "Directions (4) and Sky (0) make 40."
    },
    {
        id: 4,
        type: 'mcq',
        question: "Three cards! Decode the number.",
        cards: [1, 0, 0], // Moon, Sky, Sky -> 100
        correct: "100",
        options: ["10", "100", "1", "001"],
        solution: "Moon (1), Sky (0), Sky (0) make 100."
    },
    {
        id: 5,
        type: 'mcq',
        question: "Rainbow and Octopus together make...",
        cards: [7, 8], // Rainbow, Octopus -> 78
        correct: "78",
        options: ["15", "87", "78", "708"],
        solution: "Rainbow is 7. Octopus is 8. Number is 78."
    },
    {
        id: 6,
        type: 'mcq',
        question: "Which cards make number 26?",
        isReverse: true, // Show number, choose cards
        targetNumber: "26",
        correct: "26", // Index of correct option (handled differently for reverse?) No, let's keep consistent structure.
        // Special structure for reverse question
        options: [
            { id: 'opt1', values: [2, 5] }, // Eyes, Fingers (25)
            { id: 'opt2', values: [2, 6] }, // Eyes, Insects (26)
            { id: 'opt3', values: [6, 2] }, // Insects, Eyes (62)
            { id: 'opt4', values: [1, 6] }  // Moon, Insects (16)
        ],
        solution: "26 needs 2 (Eyes) and 6 (Insects)."
    },
    {
        id: 7,
        type: 'mcq',
        question: "The Planets meet the Moon!",
        cards: [9, 1],
        correct: "91",
        options: ["19", "91", "10", "901"],
        solution: "Planets (9) and Moon (1) make 91."
    },
    {
        id: 8,
        type: 'mcq',
        question: "Identify 354 from the pictures.",
        isReverse: true,
        targetNumber: "354",
        options: [
            { id: 'opt1', values: [3, 5, 4] },
            { id: 'opt2', values: [4, 5, 3] },
            { id: 'opt3', values: [3, 4, 5] },
            { id: 'opt4', values: [5, 3, 4] }
        ],
        solution: "3 (Traffic), 5 (Fingers), 4 (Directions)."
    },
    {
        id: 9,
        type: 'mcq',
        question: "Identify the number!",
        cards: [2, 0], // 20
        correct: "20",
        options: ["20", "19", "21", "12"],
        solution: "The cards show 2 (Eyes) and 0 (Sky), indicating the number 20."
    },
    {
        id: 10,
        type: 'mcq',
        question: "Identify the number!",
        cards: [8, 9], // 89
        correct: "89",
        options: ["89", "90", "98", "99"],
        solution: "The cards show 8 (Octopus) and 9 (Planets), indicating the number 89."
    }
];

const GuessTheNumber = () => {
    const SKILL_NAME = "House of Hundreds II - Guess the Number";
    const SHORT_SKILL_NAME = "Guess Number";
    const navigate = useNavigate();
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [history, setHistory] = useState({});
    const [questionResults, setQuestionResults] = useState({}); // Stores { [questionIndex]: isCorrect }
    const score = Object.values(questionResults).filter(Boolean).length;
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const timerRef = useRef(null);

    const currentQ = questions[currentQIndex];

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        if (history[currentQIndex]) {
            setSelectedOption(history[currentQIndex].selectedOption);
            setIsSubmitted(history[currentQIndex].isSubmitted);
            setIsCorrect(history[currentQIndex].isCorrect);
            setShowExplanation(history[currentQIndex].showExplanation);
        } else {
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            setShowExplanation(false);
        }
    }, [currentQIndex]);

    const handleNext = () => {
        setHistory(prev => ({ ...prev, [currentQIndex]: { selectedOption, isSubmitted, isCorrect, showExplanation } }));
        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            setShowResult(true);
            clearInterval(timerRef.current);
        }
    };

    const handlePrevious = () => {
        if (currentQIndex > 0) {
            setHistory(prev => ({ ...prev, [currentQIndex]: { selectedOption, isSubmitted, isCorrect, showExplanation } }));
            setCurrentQIndex(prev => prev - 1);
        }
    };

    const handleCheckAnswer = () => {
        if (isSubmitted) return;

        let correct = false;
        if (currentQ.isReverse) {
            // Option is an object { id, values }
            // Correct answer is finding the option that matches the targetNumber digits
            const targetDigits = currentQ.targetNumber.split('').map(Number);
            // Verify if selectedOption.values matches targetDigits
            if (selectedOption && JSON.stringify(selectedOption.values) === JSON.stringify(targetDigits)) {
                correct = true;
            }
        } else {
            if (selectedOption === currentQ.correct) {
                correct = true;
            }
        }

        setIsCorrect(correct);
        setIsSubmitted(true);
        if (correct) {
            setQuestionResults(prev => ({ ...prev, [currentQIndex]: true }));
        } else {
            setQuestionResults(prev => ({ ...prev, [currentQIndex]: false }));
            setShowExplanation(true);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Render a single card
    const renderCard = (digit) => {
        const data = WORD_NUMERALS[digit];
        return (
            <motion.div
                initial={{ rotateY: 180, scale: 0.8 }}
                animate={{ rotateY: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-32 h-44 bg-white rounded-2xl border-4 border-b-8 border-blue-200 shadow-xl flex flex-col items-center justify-between p-4 m-2 transform hover:-translate-y-2 transition-transform cursor-pointer"
            >
                <div className="text-sm font-bold text-blue-400 uppercase tracking-wide">Word Numeral</div>
                <div className="text-6xl filter drop-shadow-md">{data.icon}</div>
                <div className="text-center">
                    <div className="text-2xl font-black text-slate-700">{data.label}</div>
                </div>
            </motion.div>
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

            <main className="practice-content-wrapper" style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
                {showResult ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="bg-white p-8 rounded-[2rem] shadow-xl border-4 border-white text-center max-w-md w-full animate-up">
                            <div className="text-6xl mb-4">🏆</div>
                            <h2 className="text-3xl font-bold text-[#31326F] mb-2">{score} / {questions.length} Correct</h2>
                            <p className="text-gray-500 mb-6">You are a Master of Word Numerals!</p>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => navigate(0)} className="py-3 rounded-xl bg-[#31326F] text-white font-bold text-lg hover:bg-[#25265E]">Replay</button>
                                <button onClick={() => navigate(-1)} className="py-3 rounded-xl border-2 border-[#31326F] text-[#31326F] font-bold">Exit</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="question-card-modern h-full flex flex-col justify-start items-center max-w-5xl mx-auto w-full bg-white/80 backdrop-blur-sm rounded-3xl sm: sm: sm: px-6 sm:px-10 pt-4 sm:pt-6 pb-6 sm:pb-10 shadow-lg border border-white/50">
                        <div className="text-center mb-4">
                            <h2 className="text-xl md:text-2xl font-semibold text-[#31326F]">{currentQ.question}</h2>
                        </div>

                        {/* VISUAL AREA — show cards only (no big number for reverse) */}
                        <div className="mb-4 w-full flex justify-center flex-wrap gap-4 items-center">
                            {!currentQ.isReverse ? (
                                currentQ.cards.map((digit, i) => (
                                    <React.Fragment key={i}>
                                        {renderCard(digit)}
                                    </React.Fragment>
                                ))
                            ) : (
                                <div className="p-4 bg-blue-50 rounded-2xl border-2 border-blue-200 text-center">
                                    <span className="text-4xl font-black text-[#31326F] tracking-widest">{currentQ.targetNumber}</span>
                                </div>
                            )}
                        </div>

                        {/* INTERACTION AREA */}
                        <div className="w-full flex-grow flex flex-col justify-center max-w-3xl mx-auto">
                            <div className={`options-grid-modern w-full ${currentQ.isReverse ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`} style={{ display: 'grid', gap: '0.75rem' }}>
                                {currentQ.options.map((opt, i) => {
                                    const isSelected = selectedOption === opt;
                                    let isRight = false;
                                    if (isSubmitted) {
                                        if (currentQ.isReverse) {
                                            const targetDigits = currentQ.targetNumber.split('').map(Number);
                                            if (JSON.stringify(opt.values) === JSON.stringify(targetDigits)) isRight = true;
                                        } else {
                                            if (opt === currentQ.correct) isRight = true;
                                        }
                                    }
                                    const isWrong = isSubmitted && isSelected && !isRight;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => !isSubmitted && setSelectedOption(opt)}
                                            className={`option-btn-modern ${isSelected ? 'selected' : ''} ${isRight ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                                            style={{ fontFamily: '"Open Sans", sans-serif', fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: '600' }}
                                        >
                                            {currentQ.isReverse ? (
                                                <div className="flex gap-2 justify-center">
                                                    {opt.values.map((v, k) => (
                                                        <div key={k} className="flex flex-col items-center">
                                                            <span className="text-2xl">{WORD_NUMERALS[v].icon}</span>
                                                            <span className="text-xs font-bold text-slate-500">{WORD_NUMERALS[v].label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span>{opt}</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <ExplanationModal
                isOpen={showExplanation}
                isCorrect={isCorrect}
                correctAnswer={currentQ.correct || currentQ.targetNumber}
                explanation={currentQ.solution}
                onClose={() => setShowExplanation(false)}
                onNext={() => setShowExplanation(false)}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 flex items-center gap-2" onClick={() => navigate(-1)}>
                        <X size={20} /> Exit
                    </button>
                    {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanation(true)}><Eye size={20} /> View Explanation</button>}
                    <div className="nav-buttons-group">
                        <button onClick={handlePrevious} disabled={currentQIndex === 0} className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${currentQIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}><ChevronLeft size={24} strokeWidth={3} /> PREV</button>
                        {isSubmitted ? (
                            <button className="nav-pill-next-btn" onClick={handleNext}>{currentQIndex < questions.length - 1 ? <>NEXT <ChevronRight size={24} strokeWidth={3} /></> : <>DONE <Check size={24} strokeWidth={3} /></>}</button>
                        ) : (
                            <button className="nav-pill-submit-btn" onClick={handleCheckAnswer} disabled={isSubmitted}>Submit <Check size={24} /></button>
                        )}
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={() => navigate(-1)}><X size={20} /></button>
                    {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanation(true)}><Eye size={18} /> Explain</button>}
                    <div className="nav-buttons-group">
                        {isSubmitted ? (
                            <button className="nav-pill-next-btn" onClick={handleNext}>{currentQIndex < questions.length - 1 ? 'Next' : 'Done'}</button>
                        ) : (
                            <button className="nav-pill-submit-btn" onClick={handleCheckAnswer} disabled={isSubmitted}>Submit</button>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default GuessTheNumber;

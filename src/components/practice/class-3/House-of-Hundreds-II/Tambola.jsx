
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, ChevronLeft, ChevronRight, Eye, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const questions = [
    {
        id: 1,
        question: "I am a number between 590 and 600. My ones digit is 7.",
        clues: ["Between 590 and 600", "Ends with 7"],
        options: ["597", "579", "607", "587"],
        correct: "597",
        solution: "The number between 590 and 600 ending in 7 is 597."
    },
    {
        id: 2,
        question: "I have a 4 in my ones place. I am greater than 620 but less than 630.",
        clues: ["Has 4 in ones place", "> 620", "< 630"],
        options: ["624", "642", "614", "634"],
        correct: "624",
        solution: "The number between 620 and 630 with 4 at the end is 624."
    },
    {
        id: 3,
        question: "I am strictly between 595 and 605. My ones digit is 0.",
        clues: ["Between 595 and 605", "Ends with 0"],
        options: ["600", "590", "610", "605"],
        correct: "600",
        solution: "The only number ending in 0 within range is 600."
    },
    {
        id: 4,
        question: "I have 1 as the tens digit. I am between 610 and 620.",
        clues: ["Tens digit is 1", "Between 610 and 620"],
        options: ["613", "621", "631", "516"],
        correct: "613",
        solution: "613 has 1 in the tens place."
    },
    {
        id: 5,
        question: "I am exactly two more than 610.",
        clues: ["610 + 2 = ?"],
        options: ["612", "608", "620", "622"],
        correct: "612",
        solution: "610 + 2 is 612."
    },
    {
        id: 6,
        question: "I am 5 less than 625.",
        clues: ["625 - 5 = ?"],
        options: ["620", "630", "615", "625"],
        correct: "620",
        solution: "625 - 5 is 620."
    },
    {
        id: 7,
        question: "I am made of 3 hundreds, 6 tens, and 8 ones.",
        clues: ["3 Hundreds", "6 Tens", "8 Ones"],
        options: ["368", "386", "638", "863"],
        correct: "368",
        solution: "300 + 60 + 8 = 368."
    },
    {
        id: 8,
        question: "I am 68 more than 300.",
        clues: ["300 + 68 = ?"],
        options: ["368", "386", "3068", "360"],
        correct: "368",
        solution: "300 + 68 is 368."
    },
    {
        id: 9,
        question: "Find the expansion: 300 + 60 + 8",
        clues: ["300 + 60 + 8"],
        options: ["368", "3068", "3608", "386"],
        correct: "368",
        solution: "300 + 60 + 8 adds up to 368."
    },
    {
        id: 10,
        question: "I am 32 less than 400. Who am I?",
        clues: ["400 - 32 = ?"],
        options: ["368", "378", "432", "332"],
        correct: "368",
        solution: "400 - 32 is 368."
    }
];

const Tambola = () => {
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

    if (showResult) {
        return (
            <div className="junior-practice-page results-view">
                <div className="practice-content-wrapper flex-col">
                    <h1 className="text-4xl font-black text-[#31326F] mb-6">Case Closed! 🕵️</h1>
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl border-4 border-white text-center max-w-md w-full">
                        <div className="flex justify-center mb-6">
                            <span className="text-8xl">🔎</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#31326F] mb-2">{score} / {questions.length} Correct</h2>
                        <p className="text-gray-500 mb-8 font-medium">You're a master number detective!</p>
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
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
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

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}>
                            <div className="question-header-modern">
                                <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-bold uppercase tracking-wide text-xs mb-2">
                                    Number Detective
                                </div>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: '500', textAlign: 'center', width: '100%', justifyContent: 'center' }}>
                                    {currentQ.question}
                                </h2>
                            </div>

                            {/* Clues Visualization */}
                            <div className="w-full flex justify-center mb-6">
                                <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-200 relative shadow-inner max-w-md w-full">
                                    <div className="absolute -top-6 -right-6 text-6xl rotate-12 drop-shadow-md">🕵️‍♂️</div>
                                    <h3 className="text-yellow-800 font-bold mb-3 uppercase text-sm tracking-wider border-b border-yellow-200 pb-1">Confidential Clues</h3>
                                    <ul className="space-y-2">
                                        {currentQ.clues.map((clue, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-lg font-medium text-[#31326F]">
                                                <Search size={20} className="text-yellow-600" />
                                                {clue}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

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
                                        <span className="text-2xl mr-2">🔎</span>
                                        Case Solved!
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
                            <X size={20} /> Exit Case
                        </button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Evidence
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
                                        <>Next Case <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Solved All <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheckAnswer} disabled={!selectedOption}>
                                    Identify <Check size={28} strokeWidth={3} />
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
                                <Eye size={18} /> Evidence
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
                                    Identify
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Tambola;

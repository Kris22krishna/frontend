import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, ChevronLeft, ChevronRight, Eye, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const NeighbouringNumbers = () => {
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

    React.useEffect(() => {
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

    const questions = [
        {
            id: 1,
            type: 'hundreds',
            number: 183,
            question: "Between which two Hundreds does 183 lie?",
            options: ["100 and 200", "200 and 300", "0 and 100", "150 and 250"],
            correct: "100 and 200",
            solution: "183 is greater than 100 but less than 200. So, it lies between 100 and 200."
        },
        {
            id: 2,
            type: 'tens',
            number: 693,
            question: "Which neighbouring Tens is 693 between?",
            options: ["680 and 690", "690 and 700", "600 and 700", "690 and 695"],
            correct: "690 and 700",
            solution: "Look at the tens place. 693 is after 690 and before 700."
        },
        {
            id: 3,
            type: 'fifties',
            number: 345,
            question: "Between which two Fifties does 345 lie?",
            options: ["300 and 400", "300 and 350", "350 and 400", "340 and 350"],
            correct: "300 and 350",
            solution: "Fifties are 0, 50, 100, 150, 200, 250, 300, 350... \n345 is greater than 300 and less than 350."
        },
        {
            id: 4,
            type: 'hundreds',
            number: 734,
            question: "My number is 734. My lower hundred neighbour is 700. Who is my upper hundred neighbour?",
            options: ["750", "800", "900", "799"],
            correct: "800",
            solution: "The next hundred after 700 is 800. 734 lies between 700 and 800."
        },
        {
            id: 5,
            type: 'tens',
            number: 68,
            question: "Find the neighbouring Tens for the number 68.",
            options: ["60 and 70", "50 and 60", "60 and 80", "65 and 75"],
            correct: "60 and 70",
            solution: "68 is between 60 and 70."
        },
        {
            id: 6,
            type: 'fifties',
            number: 899,
            question: "899 is very close to 900. Which two fifties is it between?",
            options: ["800 and 850", "850 and 900", "800 and 900", "890 and 900"],
            correct: "850 and 900",
            solution: "899 lies after 850 and before 900."
        },
        {
            id: 7,
            type: 'hundreds',
            number: 468,
            question: "Which of these pairs represents the neighbouring Hundreds for 468?",
            options: ["400 and 500", "450 and 500", "460 and 470", "400 and 600"],
            correct: "400 and 500",
            solution: "Hundreds go 100, 200, 300, 400, 500... 468 is between 400 and 500."
        },
        {
            id: 8,
            type: 'fifties',
            number: 468,
            question: "Now, can you find the neighbouring Fifties for 468?",
            options: ["400 and 450", "450 and 500", "400 and 500", "460 and 470"],
            correct: "450 and 500",
            solution: "The multiples of 50 around 400 are 400, 450, 500. \n468 is bigger than 450 but smaller than 500."
        },
        {
            id: 9,
            type: 'tens',
            number: 468,
            question: "Finally, what are the neighbouring Tens for 468?",
            options: ["460 and 470", "460 and 480", "450 and 470", "400 and 500"],
            correct: "460 and 470",
            solution: "Counting by tens: 460, 470. 468 sits right between them!"
        },
        {
            id: 10,
            type: 'mixed',
            number: 50,
            question: "This one is tricky! 125 lies between...",
            options: ["100 and 150 (Fifties)", "120 and 130 (Tens)", "100 and 200 (Hundreds)", "All of the above"],
            correct: "All of the above",
            solution: "125 is between 100 & 150 (Fifties), 120 & 130 (Tens), and 100 & 200 (Hundreds). All are correct!"
        }
    ];

    const currentQ = questions[currentQIndex];

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
    };

    if (showResult) {
        // ... [Result view unchanged]
        return (
            <div className="junior-practice-page results-view">
                <div className="practice-content-wrapper flex-col">
                    <h1 className="text-4xl font-black text-[#31326F] mb-6">Discovery Complete! 🌟</h1>
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl border-4 border-white text-center max-w-md w-full">
                        <div className="flex justify-center mb-6">
                            <span className="text-8xl">🗺️</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#31326F] mb-2">{score} / {questions.length} Correct</h2>
                        <p className="text-gray-500 mb-8 font-medium">You're a master of numerical neighbourhoods!</p>
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
                    {/* Empty placeholder */}
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
                        <div className="question-card-modern" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                            <div className="question-header-modern">
                                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold uppercase tracking-wide text-xs mb-2">
                                    {currentQ.type.toUpperCase()} NEIGHBOURS
                                </div>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', fontWeight: '500', textAlign: 'center', width: '100%', justifyContent: 'center' }}>
                                    {currentQ.question}
                                </h2>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center my-4">
                                <div className="text-5xl md:text-7xl font-black text-[#31326F] drop-shadow-lg tracking-widest relative inline-block">
                                    {currentQ.number}
                                    <div className="absolute -inset-4 bg-yellow-100 -z-10 rounded-full blur-xl opacity-50"></div>
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
                                    <div className="feedback-mini correct mt-4">Spot on! 🌟</div>
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
                            <X size={20} /> Exit Practice
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
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            <button
                                className="nav-pill-next-btn"
                                onClick={handlePrevious}
                                disabled={currentQIndex === 0}
                                style={{ opacity: currentQIndex === 0 ? 0.5 : 1, padding: '8px 12px', marginRight: '8px', backgroundColor: '#eef2ff', color: '#31326F', minWidth: 'auto' }}
                            >
                                <ChevronLeft size={20} strokeWidth={3} />
                            </button>
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

export default NeighbouringNumbers;

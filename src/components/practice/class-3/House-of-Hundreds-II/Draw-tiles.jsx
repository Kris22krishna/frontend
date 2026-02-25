import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { ArrowLeft, RefreshCw, Check, X, Star, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

// --- Tile Assets (CSS/SVG Shapes) ---
const Tile100 = ({ className, style }) => (
    <div className={`tile-100 ${className}`} style={{
        width: '60px', height: '60px', backgroundColor: '#FFE082', border: '2px solid #FFCA28',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', gap: '1px', padding: '1px',
        boxShadow: '2px 2px 0px rgba(0,0,0,0.1)', flexShrink: 0, ...style
    }}>
        {[...Array(16)].map((_, i) => <div key={i} style={{ backgroundColor: '#FFF8E1', opacity: 0.5 }}></div>)}
    </div>
);

const Tile10 = ({ className, style }) => (
    <div className={`tile-10 ${className}`} style={{
        width: '15px', height: '60px', backgroundColor: '#81D4FA', border: '2px solid #29B6F6',
        display: 'flex', flexDirection: 'column', gap: '1px', padding: '1px',
        boxShadow: '2px 2px 0px rgba(0,0,0,0.1)', flexShrink: 0, ...style
    }}>
        {[...Array(4)].map((_, i) => <div key={i} style={{ flex: 1, backgroundColor: '#E1F5FE', opacity: 0.5 }}></div>)}
    </div>
);

const Tile1 = ({ className, style }) => (
    <div className={`tile-1 ${className}`} style={{
        width: '15px', height: '15px', backgroundColor: '#A5D6A7', border: '2px solid #66BB6A',
        boxShadow: '1px 1px 0px rgba(0,0,0,0.1)', flexShrink: 0, ...style
    }} />
);

// --- Draggable Tile Component ---
const DraggableTile = ({ type, onDrop, constraintsRef }) => {
    const controls = useDragControls();
    const [isDragging, setIsDragging] = useState(false);
    const ref = useRef(null);

    return (
        <motion.div
            ref={ref}
            drag
            dragControls={controls}
            dragConstraints={constraintsRef} // Confine to container
            dragSnapToOrigin={true} // Always snap back
            whileDrag={{ scale: 1.2, zIndex: 100, cursor: 'grabbing' }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(event, info) => {
                setIsDragging(false);
                onDrop(event, info, type);
            }}
            className="cursor-grab touch-none flex items-center justify-center p-2"
            style={{ touchAction: 'none' }}
        >
            {type === 100 && <Tile100 />}
            {type === 10 && <Tile10 />}
            {type === 1 && <Tile1 />}
        </motion.div>
    );
};


// --- Main Component ---
const DrawTiles = () => {
    const navigate = useNavigate();
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
    const [isSubmitted, setIsSubmitted] = useState(false); // Controls if answer is locked
    const [selectedMcqOption, setSelectedMcqOption] = useState(null); // Tracks selected MCQ option
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // State for Drag & Drop questions
    const [droppedTiles, setDroppedTiles] = useState({ 100: 0, 10: 0, 1: 0 });
    const dropZoneRef = useRef(null);
    const containerRef = useRef(null);

    // Questions Data
    const questions = [
        { type: 'drag-drop', target: 832, id: 1, solution: "8 Hundreds, 3 Tens, and 2 Ones make 832." },
        { type: 'drag-drop', target: 504, id: 2, solution: "5 Hundreds, 0 Tens, and 4 Ones make 504." },
        { type: 'drag-drop', target: 620, id: 3, solution: "6 Hundreds, 2 Tens, and 0 Ones make 620." },
        { type: 'drag-drop', target: 947, id: 4, solution: "9 Hundreds, 4 Tens, and 7 Ones make 947." },
        { type: 'drag-drop', target: 726, id: 5, solution: "7 Hundreds, 2 Tens, and 6 Ones make 726." },
        { type: 'mcq', correct: 423, tiles: { 100: 4, 10: 2, 1: 3 }, options: [432, 423, 324, 234], id: 6, solution: "Count the blocks: 4 Hundreds (400) + 2 Tens (20) + 3 Ones (3) = 423." },
        { type: 'mcq', correct: 605, tiles: { 100: 6, 10: 0, 1: 5 }, options: [506, 650, 605, 560], id: 7, solution: "Count the blocks: 6 Hundreds (600) + 0 Tens + 5 Ones (5) = 605." },
        { type: 'mcq', text: "Which number has 5 Hundreds and 2 Tens?", correct: 520, options: [502, 520, 250, 205], id: 8, solution: "5 Hundreds is 500. 2 Tens is 20. So the number is 520." },
        { type: 'drag-drop', target: 700, id: 9, solution: "7 Hundreds, 0 Tens, and 0 Ones make 700." },
        { type: 'mcq', correct: 134, tiles: { 100: 1, 10: 3, 1: 4 }, options: [143, 314, 134, 431], id: 10, solution: "Count the blocks: 1 Hundred (100) + 3 Tens (30) + 4 Ones (4) = 134." },
    ];

    const currentQ = questions[currentQIndex];

    // Helper to handle drops
    const handleDrop = (event, info, type) => {
        if (!dropZoneRef.current || isSubmitted) return;

        // Check collision with drop zone
        const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
        const point = info.point; // { x, y } relative to viewport

        if (
            point.x >= dropZoneRect.left &&
            point.x <= dropZoneRect.right &&
            point.y >= dropZoneRect.top &&
            point.y <= dropZoneRect.bottom
        ) {
            setDroppedTiles(prev => ({ ...prev, [type]: prev[type] + 1 }));
            // Play sound effect ideally
        }
    };

    const removeTile = (type) => {
        if (isSubmitted) return;
        setDroppedTiles(prev => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
    };

    const handleCheckAnswer = (option = null) => {
        if (isSubmitted) return;

        let isRight = false;
        let selected = option;

        if (currentQ.type === 'drag-drop') {
            const currentVal = (droppedTiles[100] * 100) + (droppedTiles[10] * 10) + (droppedTiles[1] * 1);
            isRight = currentVal === currentQ.target;
        } else {
            // If called from footer submit without arg, use state
            if (option === null) selected = selectedMcqOption;
            isRight = selected === currentQ.correct;
            setSelectedMcqOption(selected);
        }

        setIsSubmitted(true);
        setIsCorrect(isRight);

        if (isRight) {
            setFeedback('correct');
            setScore(s => s + 1);
        } else {
            setFeedback('wrong');
        }
    };

    const handlePrevious = () => {
        if (currentQIndex > 0) {
            setCurrentQIndex(prev => prev - 1);
            setFeedback(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            setDroppedTiles({ 100: 0, 10: 0, 1: 0 });
            setSelectedMcqOption(null);
            setShowExplanationModal(false);
        }
    };

    const handleNext = () => {
        setFeedback(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setDroppedTiles({ 100: 0, 10: 0, 1: 0 }); // Reset tiles
        setSelectedMcqOption(null);
        setShowExplanationModal(false);
        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrentQIndex(0);
        setScore(0);
        setShowResult(false);
        setFeedback(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setDroppedTiles({ 100: 0, 10: 0, 1: 0 });
        setSelectedMcqOption(null);
    };

    const handleMcqSelect = (opt) => {
        if (!isSubmitted) setSelectedMcqOption(opt);
    };

    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100);

        return (
            <div className="junior-practice-page results-view">
                <div className="practice-content-wrapper flex-col">
                    <h1 className="text-4xl font-black text-[#31326F] mb-6">Quest Complete! 🎉</h1>

                    <div className="bg-white p-8 rounded-[2rem] shadow-xl border-4 border-white text-center max-w-md w-full">
                        <div className="flex justify-center mb-6">
                            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="Trophy" className="w-32 h-32" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#31326F] mb-2">{score} / {questions.length} Correct</h2>
                        <p className="text-gray-500 mb-8 font-medium">
                            {percentage >= 80 ? "Amazing job! You're a Tile Master!" : "Great practice! Keep going!"}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={handleRestart} className="py-3 rounded-xl bg-[#31326F] text-white font-bold text-lg hover:bg-[#25265E] transition-all">
                                Play Again
                            </button>
                            <button onClick={() => navigate(-1)} className="py-3 rounded-xl border-2 border-[#31326F] text-[#31326F] font-bold text-lg hover:bg-blue-50 transition-all">
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Determine if submit should be disabled
    const isSubmitDisabled = currentQ.type === 'mcq' ? selectedMcqOption === null : false;

    return (
        <div className="junior-practice-page" ref={containerRef}>
            {/* Header */}
            <header className="junior-practice-header flex items-center justify-between px-6 pt-4">
                <div className="flex-1 text-center">
                    <h2 className="text-2xl font-black text-[#31326F] bg-white/50 inline-block px-6 py-2 rounded-full backdrop-blur-sm">
                        Question {currentQIndex + 1} / {questions.length}
                    </h2>
                </div>
            </header>

            {/* Main Content */}
            <main className="practice-content-wrapper relative z-10">
                <div className="w-full max-w-5xl h-[85%] bg-white rounded-[3rem] shadow-2xl border-4 border-white overflow-hidden flex flex-col md:flex-row relative">

                    {/* Feedback Overlay */}
                    {feedback && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animation-fade-in pointer-events-none">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`p-8 rounded-3xl shadow-2xl flex flex-col items-center border-4 ${feedback === 'correct' ? 'bg-[#E8F5E9] border-[#4CAF50]' : 'bg-[#FFEBEE] border-[#EF5350]'}`}
                            >
                                {feedback === 'correct' ? (
                                    <>
                                        <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center mb-4 shadow-lg">
                                            <Check size={40} color="white" strokeWidth={4} />
                                        </div>
                                        <h2 className="text-3xl font-black text-[#1B5E20]">Correct!</h2>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-20 h-20 bg-[#EF5350] rounded-full flex items-center justify-center mb-4 shadow-lg">
                                            <X size={40} color="white" strokeWidth={4} />
                                        </div>
                                        <h2 className="text-3xl font-black text-[#B71C1C]">Try Again!</h2>
                                    </>
                                )}
                            </motion.div>
                        </div>
                    )}

                    {/* Left Side: Question & Visuals */}
                    <div className={`p-8 flex flex-col ${currentQ.type === 'drag-drop' ? 'w-full md:w-2/3 border-b-2 md:border-b-0 md:border-r-2 border-slate-100' : 'w-full h-full items-center justify-center'}`}>

                        {/* Question Text */}
                        <h1 className="text-3xl md:text-4xl font-black text-[#31326F] mb-8 text-center leading-tight">
                            {currentQ.type === 'drag-drop' && (
                                <>Draw tiles to show <span className="text-[#00BFA5] text-5xl inline-block transform translate-y-1 mx-2">{currentQ.target}</span></>
                            )}
                            {currentQ.type === 'mcq' && (
                                currentQ.text ? currentQ.text : "What is represented by these tiles?"
                            )}
                        </h1>

                        {/* Question Area */}
                        <div className="flex-1 flex flex-col items-center justify-center w-full relative">

                            {/* DROP ZONE (For Drag & Drop) */}
                            {currentQ.type === 'drag-drop' && (
                                <div
                                    ref={dropZoneRef}
                                    className="w-full h-full bg-slate-50 rounded-3xl border-4 border-dashed border-slate-300 relative flex flex-wrap content-start p-4 gap-2 transition-colors duration-300"
                                >
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200 font-bold text-4xl pointer-events-none uppercase tracking-widest">
                                        Drop Tiles Here
                                    </span>

                                    {/* Render Dropped Tiles */}
                                    {/* Hundreds */}
                                    {[...Array(droppedTiles[100])].map((_, i) => (
                                        <motion.div key={`100-${i}`} layoutId={`100-${i}`} onClick={() => removeTile(100)} className="cursor-pointer hover:scale-95 transition-transform" title="100 (Click to remove)">
                                            <Tile100 />
                                        </motion.div>
                                    ))}
                                    {/* Tens */}
                                    {[...Array(droppedTiles[10])].map((_, i) => (
                                        <motion.div key={`10-${i}`} layoutId={`10-${i}`} onClick={() => removeTile(10)} className="cursor-pointer hover:scale-95 transition-transform" title="10 (Click to remove)">
                                            <Tile10 />
                                        </motion.div>
                                    ))}
                                    {/* Ones */}
                                    {[...Array(droppedTiles[1])].map((_, i) => (
                                        <motion.div key={`1-${i}`} layoutId={`1-${i}`} onClick={() => removeTile(1)} className="cursor-pointer hover:scale-95 transition-transform" title="1 (Click to remove)">
                                            <Tile1 />
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* MCQ Visuals */}
                            {currentQ.type === 'mcq' && !currentQ.text && currentQ.tiles && (
                                <div className="bg-[#E0F7FA] p-8 rounded-3xl border-4 border-[#B2DFDB] flex flex-wrap gap-4 justify-center shadow-inner max-w-2xl">
                                    {[...Array(currentQ.tiles[100])].map((_, i) => <Tile100 key={`m100-${i}`} />)}
                                    {[...Array(currentQ.tiles[10])].map((_, i) => <Tile10 key={`m10-${i}`} />)}
                                    {[...Array(currentQ.tiles[1])].map((_, i) => <Tile1 key={`m1-${i}`} />)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side / Bottom: Interaction Area */}
                    <div className={`${currentQ.type === 'drag-drop' ? 'w-full md:w-1/3 bg-slate-50' : 'w-full md:w-full absolute bottom-0 left-0 p-8 flex justify-center'}`}>

                        {/* DRAG SOURCES for Drag & Drop */}
                        {currentQ.type === 'drag-drop' && (
                            <div className="h-full flex flex-row md:flex-col items-center justify-around p-4 gap-6">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="font-bold text-slate-400 uppercase tracking-wider text-xs">Hundreds</span>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-yellow-200 rounded-lg transform rotate-6 opacity-50"></div>
                                        <div className="absolute inset-0 bg-yellow-200 rounded-lg transform -rotate-3 opacity-50"></div>
                                        <DraggableTile type={100} onDrop={handleDrop} constraintsRef={containerRef} />
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-sm border-2 border-white">
                                            {droppedTiles[100]}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <span className="font-bold text-slate-400 uppercase tracking-wider text-xs">Tens</span>
                                    <div className="relative group">
                                        <DraggableTile type={10} onDrop={handleDrop} constraintsRef={containerRef} />
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-sm border-2 border-white">
                                            {droppedTiles[10]}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <span className="font-bold text-slate-400 uppercase tracking-wider text-xs">Ones</span>
                                    <div className="relative group">
                                        <DraggableTile type={1} onDrop={handleDrop} constraintsRef={containerRef} />
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-sm border-2 border-white">
                                            {droppedTiles[1]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* OPTIONS for MCQ */}
                        {currentQ.type === 'mcq' && (
                            <div className="grid grid-cols-4 gap-4 w-full max-w-4xl bg-white/90 p-4 rounded-3xl backdrop-blur-md shadow-2xl border-2 border-slate-100">
                                {currentQ.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleMcqSelect(opt)}
                                        className={`py-6 rounded-2xl border-b-4 text-3xl font-black transition-all shadow-lg text-center relative
                                            ${selectedMcqOption === opt
                                                ? 'bg-[#31326F] border-[#1e1f48] text-white scale-[1.02] shadow-xl z-10 ring-4 ring-blue-100'
                                                : 'bg-white border-slate-200 text-[#31326F] hover:bg-blue-50 hover:border-blue-300 hover:text-[#2979FF] hover:-translate-y-1'}
                                            ${isSubmitted && opt === currentQ.correct ? '!bg-green-500 !border-green-700 !text-white !ring-green-200' : ''}
                                            ${isSubmitted && selectedMcqOption === opt && selectedMcqOption !== currentQ.correct ? '!bg-red-500 !border-red-700 !text-white !ring-red-200' : ''}
                                        `}
                                        disabled={isSubmitted}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={
                    currentQ.type === 'mcq'
                        ? currentQ.correct
                        : (
                            <div className="flex flex-wrap gap-2 items-center">
                                <span className="mr-2 text-xl font-black text-[#31326F]">{currentQ.target} =</span>
                                {[...Array(Math.floor(currentQ.target / 100))].map((_, i) =>
                                    <Tile100 key={`h-${i}`} style={{ width: '40px', height: '40px', borderColor: '#FFCA28', borderWidth: '1px' }} />
                                )}
                                {[...Array(Math.floor((currentQ.target % 100) / 10))].map((_, i) =>
                                    <Tile10 key={`t-${i}`} style={{ height: '40px', width: '10px', borderColor: '#29B6F6', borderWidth: '1px' }} />
                                )}
                                {[...Array(currentQ.target % 10)].map((_, i) =>
                                    <Tile1 key={`o-${i}`} style={{ width: '10px', height: '10px', borderColor: '#66BB6A', borderWidth: '1px' }} />
                                )}
                            </div>
                        )
                }
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
                                <button className="nav-pill-submit-btn" onClick={() => handleCheckAnswer(null)} disabled={isSubmitDisabled}>
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
                            onClick={() => navigate(-1)}
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
                                <button className="nav-pill-submit-btn" onClick={() => handleCheckAnswer(null)} disabled={isSubmitDisabled}>
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

export default DrawTiles;

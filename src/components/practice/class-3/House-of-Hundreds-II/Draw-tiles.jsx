import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { RefreshCw, Check, X, Star, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';
import '../../../../pages/juniors/grade3/House-of-Hundreds-II.css';

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
        width: '35px', height: '35px', backgroundColor: '#A5D6A7', border: '2px solid #66BB6A',
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
    const [history, setHistory] = useState({});
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
    const [isSubmitted, setIsSubmitted] = useState(false); // Controls if answer is locked
    const [selectedMcqOption, setSelectedMcqOption] = useState(null); // Tracks selected MCQ option
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

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
            setScore(s => s + 1);
        } else {
            setShowExplanationModal(true);
        }
    };

    useEffect(() => {
        if (history[currentQIndex]) {
            setFeedback(history[currentQIndex].feedback);
            setIsSubmitted(history[currentQIndex].isSubmitted);
            setIsCorrect(history[currentQIndex].isCorrect);
            setDroppedTiles(history[currentQIndex].droppedTiles);
            setSelectedMcqOption(history[currentQIndex].selectedMcqOption);
        } else {
            setFeedback(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            setDroppedTiles({ 100: 0, 10: 0, 1: 0 });
            setSelectedMcqOption(null);
        }
        setShowExplanationModal(false);
    }, [currentQIndex]);

    const handlePrevious = () => {
        if (currentQIndex > 0) {
            setHistory(prev => ({ ...prev, [currentQIndex]: { feedback, isSubmitted, isCorrect, droppedTiles, selectedMcqOption } }));
            setCurrentQIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        setHistory(prev => ({ ...prev, [currentQIndex]: { feedback, isSubmitted, isCorrect, droppedTiles, selectedMcqOption } }));
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

    const SKILL_NAME = "House of Hundreds II - Draw Tiles";
    const SHORT_SKILL_NAME = "Draw Tiles";

    // Determine if submit should be disabled
    const isSubmitDisabled = currentQ.type === 'mcq' ? selectedMcqOption === null : false;

    return (
        <div className="junior-practice-page raksha-theme grey-selection-theme house-of-hundreds-ii-practice-page" ref={containerRef}>
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

            {/* Main Content */}
            <main className="practice-content-wrapper relative z-10" style={{ alignItems: 'stretch', padding: '0.5rem' }}>
                <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden flex flex-col md:flex-row relative" style={{ flex: 1, minHeight: 0 }}>

                    {/* Left Side: Question & Visuals */}
                    <div className={`p-4 md:p-8 flex flex-col ${currentQ.type === 'drag-drop'
                        ? 'flex-1 w-full md:w-2/3 border-b-2 md:border-b-0 md:border-r-2 border-slate-100'
                        : 'flex-1 w-full justify-start gap-6'
                        }`}>

                        {/* Question Text */}
                        <h1 className="text-lg md:text-2xl font-normal text-[#31326F] text-center leading-tight" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                            {currentQ.type === 'drag-drop' && (
                                <>Draw tiles to show <span className="text-[#00BFA5] text-2xl md:text-4xl inline-block transform translate-y-1 mx-2 font-medium">{currentQ.target}</span></>
                            )}
                            {currentQ.type === 'mcq' && (
                                currentQ.text ? currentQ.text : "What is represented by these tiles?"
                            )}
                        </h1>

                        {/* Question Area */}
                        <div className={`flex flex-col items-center w-full relative ${currentQ.type === 'drag-drop' ? 'flex-1 justify-center' : 'gap-6'
                            }`}>

                            {/* DROP ZONE (For Drag & Drop) */}
                            {currentQ.type === 'drag-drop' && (
                                <div
                                    ref={dropZoneRef}
                                    className="w-full bg-slate-50 rounded-3xl border-4 border-dashed border-slate-300 relative flex flex-wrap content-start p-4 gap-2 transition-colors duration-300"
                                    style={{ minHeight: '160px', flex: 1 }}
                                >
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200 font-normal text-xl md:text-3xl pointer-events-none uppercase tracking-widest text-center">
                                        Drop Tiles Here
                                    </span>

                                    {/* Render Dropped Tiles */}
                                    {[...Array(droppedTiles[100])].map((_, i) => (
                                        <motion.div key={`100-${i}`} layoutId={`100-${i}`} onClick={() => removeTile(100)} className="cursor-pointer hover:scale-95 transition-transform" title="100 (Click to remove)">
                                            <Tile100 />
                                        </motion.div>
                                    ))}
                                    {[...Array(droppedTiles[10])].map((_, i) => (
                                        <motion.div key={`10-${i}`} layoutId={`10-${i}`} onClick={() => removeTile(10)} className="cursor-pointer hover:scale-95 transition-transform" title="10 (Click to remove)">
                                            <Tile10 />
                                        </motion.div>
                                    ))}
                                    {[...Array(droppedTiles[1])].map((_, i) => (
                                        <motion.div key={`1-${i}`} layoutId={`1-${i}`} onClick={() => removeTile(1)} className="cursor-pointer hover:scale-95 transition-transform" title="1 (Click to remove)">
                                            <Tile1 />
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* MCQ Visuals */}
                            {currentQ.type === 'mcq' && !currentQ.text && currentQ.tiles && (
                                <div className="bg-[#E0F7FA] p-6 rounded-2xl border-2 border-[#B2DFDB] flex flex-wrap gap-3 justify-center shadow-inner w-full">
                                    {[...Array(currentQ.tiles[100])].map((_, i) => <Tile100 key={`m100-${i}`} />)}
                                    {[...Array(currentQ.tiles[10])].map((_, i) => <Tile10 key={`m10-${i}`} />)}
                                    {[...Array(currentQ.tiles[1])].map((_, i) => <Tile1 key={`m1-${i}`} />)}
                                </div>
                            )}

                            {/* MCQ Options — inline below visual */}
                            {currentQ.type === 'mcq' && (
                                <div className="options-grid-modern w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                                    {currentQ.options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleMcqSelect(opt)}
                                            className={`option-btn-modern ${selectedMcqOption === opt ? 'selected' : ''
                                                } ${isSubmitted && opt === currentQ.correct ? 'correct' : ''
                                                } ${isSubmitted && selectedMcqOption === opt && selectedMcqOption !== currentQ.correct ? 'wrong' : ''
                                                }`}
                                            style={{ fontSize: '1.1rem', fontWeight: '400', fontFamily: '"Open Sans", sans-serif' }}
                                            disabled={isSubmitted}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side (desktop) / Bottom strip (mobile): Tile Sources — drag-drop only */}
                    {currentQ.type === 'drag-drop' && (
                        <div className="w-full md:w-1/3 bg-slate-50 border-t-2 md:border-t-0 md:border-l-0 border-slate-100">
                            <div className="flex flex-row md:flex-col items-center justify-around p-3 md:p-4 gap-4 md:gap-6 h-full">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="font-normal text-slate-400 uppercase tracking-wider text-xs">Hundreds</span>
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
                                    <span className="font-normal text-slate-400 uppercase tracking-wider text-xs">Tens</span>
                                    <div className="relative group">
                                        <DraggableTile type={10} onDrop={handleDrop} constraintsRef={containerRef} />
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-sm border-2 border-white">
                                            {droppedTiles[10]}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <span className="font-normal text-slate-400 uppercase tracking-wider text-xs">Ones</span>
                                    <div className="relative group">
                                        <DraggableTile type={1} onDrop={handleDrop} constraintsRef={containerRef} />
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-sm border-2 border-white">
                                            {droppedTiles[1]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
                                <span className="mr-2 text-2xl font-black text-[#31326F]">{currentQ.target} =</span>
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

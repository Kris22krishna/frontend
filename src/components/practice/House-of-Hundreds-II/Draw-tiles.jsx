import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { ArrowLeft, RefreshCw, Check, X, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../../pages/juniors/JuniorPracticeSession.css';

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

    // State for Drag & Drop questions
    const [droppedTiles, setDroppedTiles] = useState({ 100: 0, 10: 0, 1: 0 });
    const dropZoneRef = useRef(null);
    const containerRef = useRef(null);

    // Questions Data
    const questions = [
        { type: 'drag-drop', target: 832, id: 1 },
        { type: 'drag-drop', target: 504, id: 2 },
        { type: 'drag-drop', target: 620, id: 3 },
        { type: 'drag-drop', target: 947, id: 4 },
        { type: 'drag-drop', target: 726, id: 5 },
        { type: 'mcq', correct: 423, tiles: { 100: 4, 10: 2, 1: 3 }, options: [432, 423, 324, 234], id: 6 },
        { type: 'mcq', correct: 605, tiles: { 100: 6, 10: 0, 1: 5 }, options: [506, 650, 605, 560], id: 7 },
        { type: 'mcq', text: "Which number has 5 Hundreds and 2 Tens?", correct: 520, options: [502, 520, 250, 205], id: 8 },
        { type: 'drag-drop', target: 700, id: 9 },
        { type: 'mcq', correct: 134, tiles: { 100: 1, 10: 3, 1: 4 }, options: [143, 314, 134, 431], id: 10 },
    ];

    const currentQ = questions[currentQIndex];

    // Helper to handle drops
    const handleDrop = (event, info, type) => {
        if (!dropZoneRef.current) return;

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
        setDroppedTiles(prev => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
    };

    const handleCheckAnswer = (selectedOption = null) => {
        let isCorrect = false;

        if (currentQ.type === 'drag-drop') {
            const currentVal = (droppedTiles[100] * 100) + (droppedTiles[10] * 10) + (droppedTiles[1] * 1);
            isCorrect = currentVal === currentQ.target;
        } else {
            isCorrect = selectedOption === currentQ.correct;
        }

        if (isCorrect) {
            setFeedback('correct');
            setScore(s => s + 1);
            setTimeout(() => {
                handleNext();
            }, 1500);
        } else {
            setFeedback('wrong');
        }
    };

    const handleNext = () => {
        setFeedback(null);
        setDroppedTiles({ 100: 0, 10: 0, 1: 0 }); // Reset tiles
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
        setDroppedTiles({ 100: 0, 10: 0, 1: 0 });
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

    return (
        <div className="junior-practice-page" ref={containerRef}>
            {/* Header */}
            <header className="junior-practice-header flex items-center justify-between px-6 pt-4">
                <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex-1 text-center">
                    <h2 className="text-2xl font-black text-[#31326F] bg-white/50 inline-block px-6 py-2 rounded-full backdrop-blur-sm">
                        Question {currentQIndex + 1} / {questions.length}
                    </h2>
                </div>
                <div className="w-12"></div>
            </header>

            {/* Main Content */}
            <main className="practice-content-wrapper relative z-10">
                <div className="w-full max-w-5xl h-[85%] bg-white rounded-[3rem] shadow-2xl border-4 border-white overflow-hidden flex flex-col md:flex-row relative">

                    {/* Feedback Overlay */}
                    {feedback && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animation-fade-in">
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
                                        <button onClick={() => setFeedback(null)} className="mt-4 px-6 py-2 bg-white rounded-full font-bold text-[#B71C1C] hover:bg-[#FFUV00]">
                                            Retry
                                        </button>
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

                                <button
                                    onClick={() => handleCheckAnswer()}
                                    className="mt-auto w-full py-4 rounded-xl bg-[#00C853] text-white font-black text-xl shadow-[0_4px_0_#009624] hover:transform hover:-translate-y-1 hover:bg-[#00E676] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
                                >
                                    <Check strokeWidth={3} /> CHECK
                                </button>
                            </div>
                        )}

                        {/* OPTIONS for MCQ */}
                        {currentQ.type === 'mcq' && (
                            <div className="grid grid-cols-4 gap-4 w-full max-w-4xl bg-white/90 p-4 rounded-3xl backdrop-blur-md shadow-2xl border-2 border-slate-100">
                                {currentQ.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleCheckAnswer(opt)}
                                        className="py-6 rounded-2xl bg-white border-b-4 border-slate-200 text-3xl font-black text-[#31326F] hover:bg-blue-50 hover:border-blue-300 hover:text-[#2979FF] transition-all shadow-lg text-center"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DrawTiles;

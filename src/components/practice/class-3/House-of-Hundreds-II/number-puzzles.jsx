
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

// --- QUESTION DATA ---
const questions = [
    {
        id: 1,
        type: 'drag-sort',
        question: "Arrange these numbers!",
        items: [384, 23, 176, 905],
        correctSequence: [23, 176, 384, 905],
        solution: "Smallest to Largest: 23 < 176 < 384 < 905."
    },
    {
        id: 2,
        type: 'mcq',
        question: "Which number fits the pattern?",
        diagramType: 'circle_cycle',
        items: [100, 200, 300, '?'],
        correct: "400",
        options: ["350", "400", "500", "600"],
        solution: "Add 100: 100, 200, 300, 400."
    },
    {
        id: 3,
        type: 'drag-match',
        question: "Match sums to answers!",
        pairs: [
            { id: 'q1', text: "200 + 50", matchId: 'a1' },
            { id: 'q2', text: "300 + 50", matchId: 'a2' }
        ],
        targets: [
            { id: 'a1', text: "250" },
            { id: 'a2', text: "350" }
        ],
        solution: "200+50=250 and 300+50=350."
    },
    {
        id: 4,
        type: 'mcq',
        question: "Find the odd one out.",
        diagramType: 'circle_grid',
        items: [10, 20, 30, 45],
        correct: "45",
        options: ["10", "20", "30", "45"],
        solution: "Multiples of 10. 45 is not."
    },
    {
        id: 5,
        type: 'drag-sort',
        question: "Order from highest to lowest!",
        items: [850, 600, 450, 100],
        correctSequence: [850, 600, 450, 100],
        solution: "850 > 600 > 450 > 100."
    },
    {
        id: 6,
        type: 'mcq',
        question: "What completes the diamond?",
        diagramType: 'diamond',
        items: [50, 25, '?', 25], // Top, Right, Bottom, Left
        correct: "50",
        options: ["50", "40", "60", "100"],
        solution: "25 + 25 = 50."
    },
    {
        id: 7,
        type: 'mcq',
        question: "Double each number!",
        diagramType: 'circle_cycle',
        items: [2, 4, 8, '?'],
        correct: "16",
        options: ["10", "12", "16", "20"],
        solution: "Double the previous number: 8 + 8 = 16."
    },
    {
        id: 8,
        type: 'mcq',
        question: "Missing puzzle piece?",
        diagramType: 'circle_grid',
        items: [1, 2, 3, '?'],
        correct: "4",
        options: ["4", "5", "3", "2"],
        solution: "1, 2, 3... 4."
    },
    {
        id: 9,
        type: 'drag-match',
        question: "Pair equal values!",
        pairs: [
            { id: 'q3', text: "300 + 10", matchId: 'a3' },
            { id: 'q4', text: "300 - 10", matchId: 'a4' }
        ],
        targets: [
            { id: 'a4', text: "290" },
            { id: 'a3', text: "310" }
        ],
        solution: "300+10=310, 300-10=290."
    },
    {
        id: 10,
        type: 'mcq',
        question: "Solve the cycle: +5",
        diagramType: 'circle_cycle',
        items: [5, 10, 15, '?'],
        correct: "20",
        options: ["18", "20", "25", "30"],
        solution: "5, 10, 15, 20."
    }
];

const NumberPuzzles = () => {
    const navigate = useNavigate();
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [dragItems, setDragItems] = useState([]);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedback, setFeedback] = useState(null);

    // Sort Interaction State
    const [swapSourceIndex, setSwapSourceIndex] = useState(null);

    // Matching State
    const [connections, setConnections] = useState([]); // [{from, to}]
    const [currentLine, setCurrentLine] = useState(null);
    const [shuffledTargets, setShuffledTargets] = useState([]);

    const svgRef = useRef(null);
    const dotRefs = useRef({});
    // Force update for line drawing
    const [tick, setTick] = useState(0);

    const currentQ = questions[currentQIndex];

    // Safety check
    if (!currentQ) {
        return <div className="p-10 text-center">Loading Question...</div>;
    }

    useEffect(() => {
        try {
            // Reset state on question change
            if (currentQ.type === 'drag-sort') {
                if (currentQ.items) {
                    setDragItems([...currentQ.items].sort(() => Math.random() - 0.5));
                    setSwapSourceIndex(null);
                }
            } else if (currentQ.type === 'drag-match') {
                setConnections([]);
                if (currentQ.targets) {
                    setShuffledTargets([...currentQ.targets].sort(() => Math.random() - 0.5));
                }
                setTimeout(() => setTick(t => t + 1), 100);
            } else {
                setShuffledTargets([]);
            }
            setIsSubmitted(false);
            setIsCorrect(false);
            setSelectedOption(null);
            setFeedback(null);
        } catch (e) {
            console.error(e);
        }
    }, [currentQIndex, currentQ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setTick(t => t + 1);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // --- Helper to get Dot Coordinates ---
    const getDotPos = (id) => {
        const el = dotRefs.current[id];
        const svgEl = svgRef.current;
        if (!el || !svgEl) return { x: 0, y: 0 };

        const rect = el.getBoundingClientRect();
        const svgRect = svgEl.getBoundingClientRect();

        return {
            x: rect.left - svgRect.left + rect.width / 2,
            y: rect.top - svgRect.top + rect.height / 2
        };
    };

    const getRelPos = (e) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const rect = svgRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    // --- Interaction Handlers ---
    const handleDragStart = (e, sourceId) => {
        if (isSubmitted) return;
        const startPos = getDotPos(sourceId);
        setCurrentLine({ from: sourceId, x1: startPos.x, y1: startPos.y, x2: startPos.x, y2: startPos.y });
    };

    const handleDragMove = (e) => {
        if (!currentLine) return;
        e.preventDefault();
        const pos = getRelPos(e);
        setCurrentLine(prev => ({ ...prev, x2: pos.x, y2: pos.y }));
    };

    const handleDragEnd = (e) => {
        if (!currentLine) return;

        const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

        const element = document.elementFromPoint(clientX, clientY);
        const targetId = element?.closest('[data-target-id]')?.dataset.targetId;

        if (targetId) {
            setConnections(prev => {
                const filtered = prev.filter(c => c.from !== currentLine.from);
                return [...filtered, { from: currentLine.from, to: targetId }];
            });
        }
        setCurrentLine(null);
    };

    const handleSwapClick = (idx) => {
        if (isSubmitted) return;

        if (swapSourceIndex === null) {
            setSwapSourceIndex(idx);
        } else if (swapSourceIndex === idx) {
            setSwapSourceIndex(null); // Deselect
        } else {
            // Swap
            const newItems = [...dragItems];
            const temp = newItems[swapSourceIndex];
            newItems[swapSourceIndex] = newItems[idx];
            newItems[idx] = temp;
            setDragItems(newItems);
            setSwapSourceIndex(null);
        }
    };

    const handleCheckAnswer = () => {
        if (isSubmitted) return;
        let isRight = false;

        if (currentQ.type === 'mcq') {
            if (!selectedOption) return;
            isRight = selectedOption === currentQ.correct;
        } else if (currentQ.type === 'drag-sort') {
            isRight = JSON.stringify(dragItems) === JSON.stringify(currentQ.correctSequence);
        } else if (currentQ.type === 'drag-match') {
            const correctConnections = connections.filter(c => {
                const pair = currentQ.pairs.find(p => p.id === c.from);
                return pair && pair.matchId === c.to;
            });
            isRight = correctConnections.length === currentQ.pairs.length && connections.length === currentQ.pairs.length;
        }

        setIsCorrect(isRight);
        setIsSubmitted(true);
        if (isRight) {
            setScore(s => s + 1);
            setFeedback('correct');
        } else {
            setFeedback('wrong');
            setShowExplanationModal(true);
        }
    };

    // --- Navigation Handlers ---
    const handleNext = () => {
        // Reset happens in useEffect
        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const handlePrevious = () => {
        if (currentQIndex > 0) setCurrentQIndex(prev => prev - 1);
    };

    const handleRestart = () => {
        setCurrentQIndex(0);
        setScore(0);
        setShowResult(false);
        setTimeElapsed(0);
    };


    // --- Renderers ---
    const renderVisualDiagram = () => {
        // Reduced size for better fit
        const diagramSize = "w-36 h-36 md:w-44 md:h-44";
        const itemSize = "w-10 h-10 md:w-12 md:h-12 text-base md:text-lg"; // Smaller items
        const items = currentQ.items;

        let posStyles = [];
        if (currentQ.diagramType === 'diamond') {
            posStyles = [
                { top: '0%', left: '50%', transform: 'translate(-50%, 0)' },
                { top: '50%', right: '0%', transform: 'translate(50%, -50%)' },
                { bottom: '0%', left: '50%', transform: 'translate(-50%, 0)' },
                { top: '50%', left: '0%', transform: 'translate(-50%, -50%)' },
            ];
        } else if (currentQ.diagramType === 'circle_grid') {
            posStyles = [
                { top: '25%', left: '25%', transform: 'translate(-50%, -50%)' },
                { top: '25%', right: '25%', transform: 'translate(50%, -50%)' },
                { bottom: '25%', left: '25%', transform: 'translate(-50%, 50%)' },
                { bottom: '25%', right: '25%', transform: 'translate(50%, 50%)' },
            ];
        } else {
            posStyles = [
                { top: '10%', left: '50%', transform: 'translate(-50%, 0)' },
                { top: '50%', right: '10%', transform: 'translate(50%, -50%)' },
                { bottom: '10%', left: '50%', transform: 'translate(-50%, 0)' },
                { top: '50%', left: '10%', transform: 'translate(-50%, -50%)' },
            ];
        }

        return (
            <div className={`${diagramSize} relative mx-auto my-2 bg-white rounded-full shadow-inner border-2 border-dashed border-blue-100 flex-shrink-0 transition-all`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="w-3/4 h-3/4 border border-blue-400 rounded-full"></div>
                </div>
                {items.map((val, idx) => (
                    <div
                        key={idx}
                        className={`absolute ${itemSize} bg-white rounded-full shadow-sm border flex items-center justify-center font-bold z-10
                            ${val === '?' ? 'border-orange-400 text-orange-500 animate-pulse' : 'border-blue-100 text-[#31326F]'}
                        `}
                        style={posStyles[idx] || {}}
                    >
                        {val}
                    </div>
                ))}
            </div>
        );
    };

    if (showResult) {
        return (
            <div className="junior-practice-page results-view">
                <div className="practice-content-wrapper flex-col">
                    <h1 className="text-4xl font-black text-[#31326F] mb-6">Puzzle Master! 🧩</h1>
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl border-4 border-white text-center max-w-md w-full">
                        <div className="flex justify-center mb-6">
                            <span className="text-8xl">🏆</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#31326F] mb-2">{score} / {questions.length} Correct</h2>
                        <div className="grid grid-cols-2 gap-4 mt-8">
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
            {/* --- HEADER --- */}
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

            {/* --- MAIN CONTENT --- */}
            <main className="practice-content-wrapper" style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto', width: '100%', height: 'auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ padding: '2rem', paddingBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1, justifyContent: 'center' }}>
                            <div className="question-header-modern" style={{ marginBottom: '0' }}>
                                <div className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-bold uppercase tracking-wide text-xs mb-2">
                                    Number Puzzles
                                </div>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: '600', textAlign: 'center', width: '100%', justifyContent: 'center', margin: 0 }}>
                                    {currentQ.question}
                                </h2>
                            </div>

                            {/* --- DYNAMIC CONTENT AREA --- */}

                            {currentQ.type === 'mcq' && (
                                <div className="flex flex-col items-center w-full h-full justify-center">
                                    {renderVisualDiagram()}
                                    <div className="interaction-area-modern w-full flex flex-col items-center mt-2">
                                        <div className="options-grid-modern w-full grid grid-cols-2 gap-2">
                                            {currentQ.options.map((opt, i) => {
                                                const isRight = isSubmitted && opt === currentQ.correct;
                                                const isWrong = isSubmitted && selectedOption === opt && opt !== currentQ.correct;
                                                return (
                                                    <button
                                                        key={i}
                                                        className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''}`}
                                                        style={{
                                                            fontSize: '1.1rem',
                                                            minHeight: '45px',
                                                            padding: '0.25rem',
                                                            backgroundColor: isRight ? '#4CAF50' : (isWrong ? '#EF5350' : undefined),
                                                            color: (isRight || isWrong) ? 'white' : undefined,
                                                            borderColor: isRight ? '#2E7D32' : (isWrong ? '#C62828' : undefined),
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                        onClick={() => !isSubmitted && setSelectedOption(opt)}
                                                    >
                                                        {opt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    {isSubmitted && isCorrect && (
                                        <div className="mt-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-lg animate-bounce flex items-center gap-2 border border-green-200 shadow-sm mb-1">
                                            <span className="text-xl">🌟</span> Awesome! Correct!
                                        </div>
                                    )}
                                </div>
                            )}


                            {currentQ.type === 'drag-sort' && (
                                <div className="w-full max-w-sm mx-auto flex flex-col gap-2 my-2 items-center justify-center h-full">
                                    <p className="text-center text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-wide">Tap two to swap</p>
                                    <div className="w-full flex flex-col gap-2">
                                        {dragItems.map((item, idx) => (
                                            <motion.div
                                                key={`${item}-${idx}`}
                                                layout
                                                className={`
                                                    p-3 bg-white rounded-xl shadow-sm border flex items-center justify-between cursor-pointer transition-all
                                                    ${swapSourceIndex === idx ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 shadow-md' : 'border-slate-100 hover:border-blue-200'}
                                                    ${isSubmitted && isCorrect ? 'border-green-300 bg-green-50' : ''}
                                                `}
                                                onClick={() => handleSwapClick(idx)}
                                            >
                                                <span className="font-bold text-lg text-[#31326F]">{item}</span>
                                                <span className={`text-lg ${swapSourceIndex === idx ? 'text-blue-500' : 'text-slate-300'}`}>
                                                    {swapSourceIndex === idx ? '🔄' : '≡'}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                    {isSubmitted && isCorrect && (
                                        <div className="mt-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-lg animate-bounce flex items-center gap-2 border border-green-200 shadow-sm">
                                            <span className="text-xl">🎉</span> Correct Sequence!
                                        </div>
                                    )}
                                </div>
                            )}

                            {currentQ.type === 'drag-match' && (
                                <div className="w-full h-full flex flex-col items-center">
                                    <div
                                        className="w-full flex-grow relative touch-none select-none bg-orange-50/30 rounded-xl border border-orange-100 flex flex-col mt-2 min-h-[200px]"
                                        onMouseMove={handleDragMove}
                                        onMouseUp={handleDragEnd}
                                        onTouchMove={handleDragMove}
                                        onTouchEnd={handleDragEnd}
                                    >
                                        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                            {connections.map((conn, i) => {
                                                const start = getDotPos(conn.from);
                                                const end = getDotPos(conn.to);
                                                // Only render if we have valid coordinates
                                                if (!start.x || !end.x) return null;
                                                return (
                                                    <line key={i} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#4FB7B3" strokeWidth="4" strokeLinecap="round" />
                                                );
                                            })}
                                            {currentLine && (
                                                <line x1={currentLine.x1} y1={currentLine.y1} x2={currentLine.x2} y2={currentLine.y2} stroke="#31326F" strokeWidth="3" strokeDasharray="5,5" strokeLinecap="round" />
                                            )}
                                        </svg>

                                        <div className="flex justify-between items-center flex-grow px-2 md:px-6 relative z-10 w-full h-full py-4">
                                            {/* Left Column */}
                                            <div className="flex flex-col gap-4 w-5/12">
                                                {currentQ.pairs.map((item) => (
                                                    <div key={item.id} className="relative">
                                                        <div
                                                            className="bg-white py-3 px-2 rounded-xl border-2 border-orange-200 shadow-sm text-center font-bold text-sm md:text-base cursor-grab active:scale-95 transition-transform"
                                                            onMouseDown={(e) => handleDragStart(e, item.id)}
                                                            onTouchStart={(e) => handleDragStart(e, item.id)}
                                                        >
                                                            {item.text}
                                                        </div>
                                                        <div
                                                            ref={el => dotRefs.current[item.id] = el}
                                                            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-orange-100 rounded-full border-4 border-white shadow-sm flex items-center justify-center p-1"
                                                        >
                                                            <div className="w-full h-full bg-orange-400 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Right Column */}
                                            <div className="flex flex-col gap-4 w-5/12">
                                                {shuffledTargets.map((item) => (
                                                    <div key={item.id} className="relative" data-target-id={item.id}>
                                                        <div className="bg-white py-3 px-2 rounded-xl border-2 border-blue-200 shadow-sm text-center font-bold text-sm md:text-base">
                                                            {item.text}
                                                        </div>
                                                        <div
                                                            ref={el => dotRefs.current[item.id] = el}
                                                            className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-100 rounded-full border-4 border-white shadow-sm flex items-center justify-center p-1"
                                                        >
                                                            <div className="w-full h-full bg-blue-400 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {isSubmitted && isCorrect ? (
                                        <div className="mt-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-lg animate-bounce flex items-center gap-2 border border-green-200 shadow-sm">
                                            <span className="text-xl">✨</span> Perfect Match!
                                        </div>
                                    ) : (
                                        <div className="text-center pt-2 pb-1 text-[10px] text-gray-400 uppercase tracking-widest font-bold">Draw lines to connect</div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQ.correct || 'Check the solution!'}
                explanation={currentQ.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />

            {/* --- FOOTER (Bottom Bar) --- */}
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
                                <Eye size={20} /> Steps
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
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheckAnswer}
                                    disabled={currentQ.type === 'mcq' && !selectedOption}
                                    style={{ opacity: (currentQ.type === 'mcq' && !selectedOption) ? 0.5 : 1 }}
                                >
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
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheckAnswer}
                                    disabled={currentQ.type === 'mcq' && !selectedOption}
                                >
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

export default NumberPuzzles;

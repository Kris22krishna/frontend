import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, ChevronRight, ChevronLeft, Eye, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import ExplanationModal from '../../../../components/ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const questions = [
    {
        id: 1,
        type: 'mcq',
        question: "What number do these 6 slips make?",
        diagramType: 'slips',
        items: [100, 100, 100, 100, 100, 100],
        correct: "600",
        options: ["600", "60", "6", "100"],
        solution: "6 slips of 100 make 600."
    },
    {
        id: 2,
        type: 'mcq',
        question: "What number do these slips make?",
        diagramType: 'slips',
        items: [100, 100, 100, 100, 10, 10],
        correct: "420",
        options: ["402", "420", "204", "240"],
        solution: "4 hundreds (400) + 2 tens (20) = 420."
    },
    {
        id: 3,
        type: 'drag-match',
        question: "Match the Slips to Numbers!",
        pairs: [
            { id: 'q1', text: "Six 100s", matchId: 'a1' },
            { id: 'q2', text: "Six 10s", matchId: 'a2' },
            { id: 'q3', text: "Six 1s", matchId: 'a3' },
            { id: 'q4', text: "Five 100s + One 10", matchId: 'a4' }
        ],
        targets: [
            { id: 'a1', text: "600" },
            { id: 'a2', text: "60" },
            { id: 'a3', text: "6" },
            { id: 'a4', text: "510" }
        ],
        solution: "6x100=600, 6x10=60, 6x1=6, 500+10=510."
    },
    {
        id: 4,
        type: 'mcq',
        question: "Which slips make the number 231?",
        diagramType: 'none', // Options will be visual
        correct: "231", // Matches the value of the correct option
        isVisualOptions: true,
        options: [
            { value: "231", items: [100, 100, 10, 10, 10, 1] },
            { value: "321", items: [100, 100, 100, 10, 10, 1] },
            { value: "123", items: [100, 10, 10, 1, 1, 1] },
            { value: "213", items: [100, 100, 10, 1, 1, 1] }
        ],
        solution: "231 = 2 Hundreds, 3 Tens, 1 One. Need two 100s, three 10s, one 1."
    },
    {
        id: 5,
        type: 'drag-sort',
        question: "Order from Smallest to Largest!",
        items: [420, 600, 150, 51], // 420(4h,2t), 600(6h), 150(1h,5t), 51(5t,1o) - all use 6 slips
        correctSequence: [51, 150, 420, 600],
        solution: "51 < 150 < 420 < 600."
    },
    {
        id: 6,
        type: 'mcq',
        question: "Make 123 with 6 slips. What do you need?",
        diagramType: 'none',
        isVisualOptions: true,
        correct: "123",
        options: [
            { value: "132", items: [100, 1, 1, 1, 10, 10] }, // Mixed order visuals for fun? No keep sorted for clarity
            { value: "123", items: [100, 10, 10, 1, 1, 1] },
            { value: "321", items: [1, 10, 10, 100, 100, 100] },
            { value: "213", items: [100, 100, 10, 1, 1, 1] }
        ],
        solution: "123 = 1 Hundred, 2 Tens, 3 Ones."
    },
    {
        id: 7,
        type: 'mcq',
        question: "I have 5 slips of 100 and 1 slip of 1. What number?",
        diagramType: 'slips',
        items: [100, 100, 100, 100, 100, 1],
        correct: "501",
        options: ["510", "501", "150", "105"],
        solution: "500 + 1 = 501."
    },
    {
        id: 8,
        type: 'drag-match',
        question: "Match Number to Slips!",
        pairs: [
            { id: 'q1', text: "303", matchId: 'a1' },
            { id: 'q2', text: "330", matchId: 'a2' },
            { id: 'q3', text: "33", matchId: 'a3' },
            { id: 'q4', text: "600", matchId: 'a4' }
        ],
        targets: [
            { id: 'a1', text: "Three 100s, Three 1s" },
            { id: 'a2', text: "Three 100s, Three 10s" },
            { id: 'a3', text: "Three 10s, Three 1s" }, // Wait, 33 uses 6 slips? 3+3=6. Yes.
            { id: 'a4', text: "Six 100s" }
        ],
        solution: "Match based on place value counts."
    },
    {
        id: 9,
        type: 'mcq',
        question: "Which number CANNOT be made with exactly 6 slips?",
        diagramType: 'none',
        correct: "500",
        options: ["600", "510", "500", "15"], // 500 needs 5 slips. 15 needs 1+5=6 slips. 510 needs 5+1=6.
        solution: "500 takes 5 slips of 100. All others take 6 slips (600=6, 510=5+1, 15=1+5)."
    },
    {
        id: 10,
        type: 'drag-match',
        question: "Connect sums to 6 Slips!",
        pairs: [
            { id: 'q1', text: "500 + 10", matchId: 'a1' }, // 510 (5h, 1t)
            { id: 'q2', text: "400 + 2", matchId: 'a2' }, // 402 (4h, 2o)
            { id: 'q3', text: "100 + 50", matchId: 'a3' }, // 150 (1h, 5t)
            { id: 'q4', text: "30 + 3", matchId: 'a4' }   // 33 (3t, 3o)
        ],
        targets: [
            { id: 'a1', text: "510" },
            { id: 'a2', text: "402" },
            { id: 'a3', text: "150" },
            { id: 'a4', text: "33" }
        ],
        solution: "All these numbers are formed using exactly 6 slips."
    }
];

const PaperSlips = () => {
    const navigate = useNavigate();
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // Logic States
    const [shuffledTargets, setShuffledTargets] = useState([]);
    const [currentOptions, setCurrentOptions] = useState([]);
    const [dragItems, setDragItems] = useState([]);
    const [connections, setConnections] = useState([]);

    const [currentLine, setCurrentLine] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    // Swap State for Drag Sort
    const [swapSourceIndex, setSwapSourceIndex] = useState(null);

    const svgRef = useRef(null);
    const dotRefs = useRef({});
    const timerRef = useRef(null);

    const currentQ = questions[currentQIndex];

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        resetQuestionState();
    }, [currentQIndex, currentQ]);

    const resetQuestionState = () => {
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setConnections([]);
        setSwapSourceIndex(null);
        setShowExplanation(false);

        if (currentQ.type === 'drag-sort') {
            setDragItems([...currentQ.items].sort(() => Math.random() - 0.5));
        } else if (currentQ.type === 'drag-match') {
            if (currentQ.targets) {
                setShuffledTargets([...currentQ.targets].sort(() => Math.random() - 0.5));
            }
        } else if (currentQ.type === 'mcq') {
            // If visual options, we shuffle the options array of objects
            // If simple strings, shuffle strings
            setCurrentOptions([...currentQ.options].sort(() => Math.random() - 0.5));
        }
    };

    const handleNext = () => {
        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            setShowResult(true);
            clearInterval(timerRef.current);
        }
    };

    const handlePrevious = () => {
        if (currentQIndex > 0) {
            setCurrentQIndex(prev => prev - 1);
        }
    };

    const handleCheckAnswer = () => {
        if (isSubmitted) return;

        let correct = false;
        if (currentQ.type === 'mcq') {
            if (currentQ.isVisualOptions) {
                if (selectedOption === currentQ.correct) correct = true; // Value-based matching
            } else {
                if (selectedOption === currentQ.correct) correct = true;
            }
        } else if (currentQ.type === 'drag-sort') {
            const currentSequence = JSON.stringify(dragItems);
            const correctSequence = JSON.stringify(currentQ.correctSequence);
            if (currentSequence === correctSequence) correct = true;
        } else if (currentQ.type === 'drag-match') {
            if (connections.length === currentQ.pairs.length) {
                const allCorrect = connections.every(conn => {
                    const pair = currentQ.pairs.find(p => p.id === conn.from);
                    return pair && pair.matchId === conn.to;
                });
                if (allCorrect) correct = true;
            }
        }

        setIsCorrect(correct);
        setIsSubmitted(true);
        if (correct) {
            setScore(prev => prev + 1);
        } else {
            setShowExplanation(true);
        }
    };

    // --- Drag Sort Logic ---
    const handleSwapClick = (index) => {
        if (isSubmitted) return;
        if (swapSourceIndex === null) {
            setSwapSourceIndex(index);
        } else {
            if (swapSourceIndex !== index) {
                const newItems = [...dragItems];
                [newItems[swapSourceIndex], newItems[index]] = [newItems[index], newItems[swapSourceIndex]];
                setDragItems(newItems);
            }
            setSwapSourceIndex(null);
        }
    };

    // --- Drag Match Logic ---
    const getDotPos = (id) => {
        const el = dotRefs.current[id];
        if (!el || !svgRef.current) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const svgRect = svgRef.current.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - svgRect.left,
            y: rect.top + rect.height / 2 - svgRect.top
        };
    };

    const handleDragStart = (e, fromId) => {
        if (isSubmitted) return;
        e.preventDefault();
        // Logic for drag start
        const touch = e.touches ? e.touches[0] : e;
        const startPos = getDotPos(fromId);

        setConnections(prev => prev.filter(c => c.from !== fromId));

        const moveHandler = (moveEvent) => {
            const moveTouch = moveEvent.touches ? moveEvent.touches[0] : moveEvent;
            const svgRect = svgRef.current.getBoundingClientRect();
            setCurrentLine({
                x1: startPos.x,
                y1: startPos.y,
                x2: moveTouch.clientX - svgRect.left,
                y2: moveTouch.clientY - svgRect.top
            });
        };

        const upHandler = (upEvent) => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('touchend', upHandler);
            setCurrentLine(null);

            const upTouch = upEvent.changedTouches ? upEvent.changedTouches[0] : upEvent;
            const targetEl = document.elementFromPoint(upTouch.clientX, upTouch.clientY);
            const targetDiv = targetEl?.closest('[data-target-id]');

            if (targetDiv) {
                const targetId = targetDiv.getAttribute('data-target-id');
                setConnections(prev => {
                    const filtered = prev.filter(c => c.to !== targetId);
                    return [...filtered, { from: fromId, to: targetId }];
                });
            }
        };

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);
        document.addEventListener('touchmove', moveHandler, { passive: false });
        document.addEventListener('touchend', upHandler);
    };

    const handleDragMove = () => { };
    const handleDragEnd = () => { };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // --- Visual Renderers ---
    const renderLimit = 6;

    // Renders the slips (coloured rectangles)
    const renderSlips = (values) => {
        return (
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto p-4">
                {values.map((val, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`
                            w-20 h-12 md:w-24 md:h-16 rounded-lg shadow-md border-2 font-bold flex items-center justify-center text-xl md:text-2xl
                            ${val === 100 ? 'bg-indigo-100 border-indigo-300 text-indigo-700' :
                                val === 10 ? 'bg-orange-100 border-orange-300 text-orange-700' :
                                    'bg-green-100 border-green-300 text-green-700'}
                        `}
                    >
                        {val}
                    </motion.div>
                ))}
            </div>
        );
    };

    const renderQuestionVisual = () => {
        if (currentQ.diagramType === 'slips') {
            return renderSlips(currentQ.items);
        }
        return null;
    };

    return (
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100vh', overflow: 'hidden' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem', position: 'relative' }}>
                <div className="header-left">
                    <button className="bg-white/50 text-[#31326F] p-2 rounded-full hover:bg-white transition-colors" onClick={() => navigate(-1)}>
                        <ArrowLeft size={24} />
                    </button>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black shadow-md flex items-center gap-2">
                        <span>📝</span> Question {currentQIndex + 1} / {questions.length}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md">
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
                            <p className="text-gray-500 mb-6">Great calculations with paper slips!</p>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => navigate(0)} className="py-3 rounded-xl bg-[#31326F] text-white font-bold text-lg hover:bg-[#25265E]">Replay</button>
                                <button onClick={() => navigate(-1)} className="py-3 rounded-xl border-2 border-[#31326F] text-[#31326F] font-bold">Exit</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="question-card-modern h-full flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50">
                        <div className="text-center mb-6">
                            <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">Paper Slips</div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#31326F]">{currentQ.question}</h2>
                        </div>

                        {/* VISUAL DIAGRAM AREA */}
                        <div className="mb-6 w-full flex justify-center">
                            {renderQuestionVisual()}
                        </div>

                        {/* INTERACTION AREA */}
                        <div className="w-full flex-grow flex flex-col justify-center">

                            {/* MCQ */}
                            {currentQ.type === 'mcq' && (
                                <div className={`grid gap-3 w-full max-w-2xl mx-auto ${currentQ.isVisualOptions ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2'}`}>
                                    {currentOptions.map((opt, i) => {
                                        // Safeguard against stale state during transition
                                        if (currentQ.isVisualOptions && (!opt || !opt.items)) return null;
                                        if (!currentQ.isVisualOptions && typeof opt === 'object') return null;

                                        const isSelected = selectedOption === (currentQ.isVisualOptions ? opt.value : opt);
                                        const isRight = isSubmitted && (currentQ.isVisualOptions ? opt.value : opt) === currentQ.correct;
                                        const isWrong = isSubmitted && isSelected && !isRight;

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => !isSubmitted && setSelectedOption(currentQ.isVisualOptions ? opt.value : opt)}
                                                className={`
                                                    p-4 rounded-xl border-2 transition-all shadow-sm flex items-center justify-center gap-2
                                                    ${isSelected ? 'border-[#31326F] bg-blue-50 ring-2 ring-blue-100' : 'border-slate-200 bg-white hover:border-blue-300'}
                                                    ${isRight ? '!bg-green-100 !border-green-500 !text-green-800' : ''}
                                                    ${isWrong ? '!bg-red-100 !border-red-500 !text-red-800' : ''}
                                                `}
                                            >
                                                {currentQ.isVisualOptions ? (
                                                    <div className="flex gap-2 flex-wrap justify-center">
                                                        {opt.items.map((v, k) => (
                                                            <span key={k} className={`text-sm md:text-base px-3 py-2 rounded-md border font-bold ${v === 100 ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : v === 10 ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-green-50 border-green-200 text-green-700'}`}>{v}</span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-xl font-bold">{opt}</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* DRAG SORT */}
                            {currentQ.type === 'drag-sort' && (
                                <div className="flex flex-col gap-2 max-w-sm mx-auto w-full">
                                    <p className="text-xs text-center text-gray-400 font-bold uppercase mb-2">Drag to Reorder</p>
                                    <Reorder.Group axis="y" values={dragItems} onReorder={setDragItems} className="flex flex-col gap-3">
                                        {dragItems.map((item) => (
                                            <Reorder.Item key={item} value={item}>
                                                <div
                                                    className={`
                                                        p-4 bg-white rounded-xl border-2 shadow-sm flex justify-between items-center cursor-grab active:cursor-grabbing
                                                        ${isSubmitted && isCorrect ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-slate-300'}
                                                    `}
                                                >
                                                    <span className="text-xl font-bold text-[#31326F]">{item}</span>
                                                </div>
                                            </Reorder.Item>
                                        ))}
                                    </Reorder.Group>
                                </div>
                            )}

                            {/* DRAG MATCH */}
                            {currentQ.type === 'drag-match' && (
                                <div className="w-full flex-grow relative touch-none select-none bg-slate-50 rounded-2xl border-2 border-slate-100 flex flex-col p-4">
                                    <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                        {connections.map((conn, i) => {
                                            const start = getDotPos(conn.from);
                                            const end = getDotPos(conn.to);
                                            if (!start.x || !end.x) return null;
                                            return <line key={i} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#31326F" strokeWidth="3" strokeLinecap="round" />;
                                        })}
                                        {currentLine && <line x1={currentLine.x1} y1={currentLine.y1} x2={currentLine.x2} y2={currentLine.y2} stroke="#31326F" strokeWidth="3" strokeDasharray="5,5" />}
                                    </svg>
                                    <div className="flex justify-between items-center h-full relative z-10 w-full gap-8 md:gap-16 px-4">
                                        <div className="flex flex-col gap-4 w-5/12 max-w-xs">
                                            {currentQ.pairs.map(p => (
                                                <div key={p.id} className="relative">
                                                    <div
                                                        onMouseDown={(e) => handleDragStart(e, p.id)}
                                                        onTouchStart={(e) => handleDragStart(e, p.id)}
                                                        className="bg-white p-3 rounded-xl border-2 border-indigo-100 shadow-sm text-center font-bold text-sm md:text-base cursor-grab active:scale-95"
                                                    >
                                                        {p.text}
                                                    </div>
                                                    <div ref={el => dotRefs.current[p.id] = el} className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full border-2 border-white" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col gap-4 w-5/12 max-w-xs">
                                            {shuffledTargets.map(t => (
                                                <div key={t.id} className="relative" data-target-id={t.id}>
                                                    <div className="bg-white p-3 rounded-xl border-2 border-orange-100 shadow-sm text-center font-bold text-sm md:text-base">
                                                        {t.text}
                                                    </div>
                                                    <div ref={el => dotRefs.current[t.id] = el} className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-2 border-white" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </main>

            <ExplanationModal
                isOpen={showExplanation}
                isCorrect={isCorrect}
                correctAnswer={currentQ.correct || (currentQ.correctSequence ? currentQ.correctSequence.join(' < ') : 'Check connections')}
                explanation={currentQ.solution}
                onClose={() => setShowExplanation(false)}
                onNext={() => setShowExplanation(false)}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 flex items-center gap-2" onClick={() => navigate(-1)}>
                        <X size={20} /> Exit
                    </button>
                    {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanation(true)}><Eye size={20} /> View Steps</button>}
                    <div className="nav-buttons-group">
                        <button className="nav-pill-next-btn" onClick={handlePrevious} disabled={currentQIndex === 0} style={{ opacity: currentQIndex === 0 ? 0.5 : 1, background: '#eef2ff', color: '#31326F' }}><ChevronLeft size={24} /> Prev</button>
                        {isSubmitted ? (
                            <button className="nav-pill-next-btn" onClick={handleNext}>{currentQIndex < questions.length - 1 ? <>Next <ChevronRight size={24} /></> : <>Done <Check size={24} /></>}</button>
                        ) : (
                            <button className="nav-pill-submit-btn" onClick={handleCheckAnswer} disabled={isSubmitted}>Submit <Check size={24} /></button>
                        )}
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={() => navigate(-1)}><X size={20} /></button>
                    {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanation(true)}><Eye size={18} /> Steps</button>}
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

export default PaperSlips;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, ChevronRight, ChevronLeft, Eye, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ExplanationModal from '../../../../components/ExplanationModal'; // Import ExplanationModal
import '../../../../pages/juniors/JuniorPracticeSession.css';

const questions = [
    {
        id: 1,
        type: 'mcq',
        question: "Detective! Find the Palindrome!",
        hint: "A Palindrome reads the same forwards and backwards.",
        diagramType: 'magnifying_glass',
        items: ['?', '?', '?'],
        correct: "121",
        options: ["121", "123", "456", "789"],
        solution: "1-2-1 is the same backwards! It's a Palindrome."
    },
    {
        id: 2,
        type: 'drag-match',
        question: "Match the clues to numbers!",
        pairs: [
            { id: 'q1', text: "Century + Half", matchId: 'a1' },
            { id: 'q2', text: "Close to 99", matchId: 'a2' },
            { id: 'q3', text: "Double Century", matchId: 'a3' },
            { id: 'q4', text: "Century - 1", matchId: 'a4' }
        ],
        targets: [
            { id: 'a1', text: "150" },
            { id: 'a2', text: "100" },
            { id: 'a3', text: "200" },
            { id: 'a4', text: "99" }
        ],
        solution: "Century(100) + Half(50) = 150. 99 + 1 = 100. Double Century = 200. Century - 1 = 99."
    },
    {
        id: 3,
        type: 'mcq',
        question: "Who fits the 'Triplet' pattern?",
        diagramType: 'train',
        items: [111, 222, 333, '?'],
        correct: "444",
        options: ["123", "444", "400", "555"],
        solution: "111, 222, 333... next is 444!"
    },
    {
        id: 4,
        type: 'drag-sort',
        question: "Order the Centuries!",
        items: [500, 200, 800, 100],
        correctSequence: [100, 200, 500, 800],
        solution: "Smallest to largest: 100, 200, 500, 800."
    },
    {
        id: 5,
        type: 'mcq',
        question: "Find the 'Step Up' number!",
        diagramType: 'steps',
        items: [123, 234, 345, '?'],
        correct: "456",
        options: ["456", "543", "444", "567"],
        solution: "1-2-3, 2-3-4, 3-4-5... next is 4-5-6!"
    },
    {
        id: 6,
        type: 'drag-match',
        question: "Decode the place values!",
        pairs: [
            { id: 'q1', text: "3 Hundreds", matchId: 'a1' },
            { id: 'q2', text: "5 Tens", matchId: 'a2' },
            { id: 'q3', text: "9 Ones", matchId: 'a3' },
            { id: 'q4', text: "4 Hundreds 2 Tens", matchId: 'a4' },
            { id: 'q5', text: "8 Hundreds 5 Ones", matchId: 'a5' }
        ],
        targets: [
            { id: 'a1', text: "300" },
            { id: 'a2', text: "50" },
            { id: 'a3', text: "9" },
            { id: 'a4', text: "420" },
            { id: 'a5', text: "805" }
        ],
        solution: "300 = 3 Hundreds. 50 = 5 Tens. 9 = 9 Ones. 420 = 400+20. 805 = 800+5."
    },
    {
        id: 7,
        type: 'mcq',
        question: "Which one has a 'Hole' in the middle?",
        hint: "Look for a zero in the tens place!",
        diagramType: 'target',
        items: ['0'], // Visual hint
        correct: "606",
        options: ["660", "606", "666", "066"],
        solution: "606 has a zero in the middle (tens place)."
    },
    {
        id: 8,
        type: 'drag-sort',
        question: "Sort the Palindromes!",
        items: [404, 101, 909, 202],
        correctSequence: [101, 202, 404, 909],
        solution: "101 < 202 < 404 < 909."
    },
    {
        id: 9,
        type: 'drag-match',
        question: "Solve the Riddles!",
        pairs: [
            { id: 'q1', text: "5 in ones place", matchId: 'a1' },
            { id: 'q2', text: "I am 40 Tens", matchId: 'a2' },
            { id: 'q3', text: "Successor of 199", matchId: 'a3' },
            { id: 'q4', text: "Predecessor of 500", matchId: 'a4' }
        ],
        targets: [
            { id: 'a1', text: "425" },
            { id: 'a2', text: "400" },
            { id: 'a3', text: "200" },
            { id: 'a4', text: "499" }
        ],
        solution: "425 ends in 5. 40 Tens = 400. 199 + 1 = 200. 500 - 1 = 499."
    },
    {
        id: 10,
        type: 'mcq',
        question: "The Final Mystery: Largest 3-Digit!",
        diagramType: 'magnifying_glass',
        items: ['9', '9', '?'],
        correct: "999",
        options: ["100", "900", "990", "999"],
        solution: "999 is the biggest 3-digit number!"
    }
];

const NumberDetective = () => {
    const navigate = useNavigate();
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [shuffledTargets, setShuffledTargets] = useState([]);
    const [currentOptions, setCurrentOptions] = useState([]); // State for shuffled MCQ options
    const [dragItems, setDragItems] = useState([]);
    const [connections, setConnections] = useState([]);
    const [currentLine, setCurrentLine] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
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

    const handleSubmit = () => {
        if (isSubmitted) return;

        let correct = false;
        if (currentQ.type === 'mcq') {
            if (selectedOption === currentQ.correct) correct = true;
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
            setShowExplanation(true); // Show explanation on wrong answer
        }
    };

    // --- Drag-Sort Logic --- //
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

    // --- Drag-Match Logic --- //
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
        const touch = e.touches ? e.touches[0] : e;
        const startPos = getDotPos(fromId);

        // Remove existing connection from this 'fromId'
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

            // Check drop target
            const upTouch = upEvent.changedTouches ? upEvent.changedTouches[0] : upEvent;
            const targetEl = document.elementFromPoint(upTouch.clientX, upTouch.clientY);
            const targetDiv = targetEl?.closest('[data-target-id]');

            if (targetDiv) {
                const targetId = targetDiv.getAttribute('data-target-id');
                // Allow only one connection per target
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

    // Add missing handlers for drag move/end to quiet execution
    const handleDragMove = () => { };
    const handleDragEnd = () => { };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // --- Renderers ---
    const renderVisualDiagram = () => {
        if (!currentQ.diagramType) return null;

        let content = null;
        if (currentQ.diagramType === 'magnifying_glass') {
            content = (
                <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-2 animate-float">
                    <Search className="absolute w-full h-full text-[#31326F] opacity-10" strokeWidth={1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 p-4 rounded-full border-4 border-[#31326F] shadow-lg text-2xl font-black text-[#31326F] tracking-widest flex gap-2">
                            {currentQ.items.map((item, i) => (
                                <span key={i} className={item === '?' ? 'text-orange-500 animate-pulse' : ''}>{item}</span>
                            ))}
                        </div>
                    </div>
                </div>
            );
        } else if (currentQ.diagramType === 'train') {
            content = (
                <div className="flex gap-2 justify-center items-end h-20 mb-2">
                    {currentQ.items.map((val, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl border-4 ${val === '?' ? 'border-orange-400 bg-orange-50 text-orange-500' : 'border-[#31326F] bg-blue-50 text-[#31326F]'} flex items-center justify-center font-bold text-lg shadow-md`}>
                                {val}
                            </div>
                            <div className="w-8 h-1.5 bg-gray-400 mt-1 rounded-full"></div>
                            <div className="flex gap-6 w-full -mt-1.5">
                                <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                                <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else if (currentQ.diagramType === 'steps') {
            content = (
                <div className="flex items-end justify-center gap-1 h-28 mb-2">
                    {currentQ.items.map((val, i) => (
                        <div key={i} className="flex flex-col items-center" style={{ height: `${(i + 1) * 25}%` }}>
                            <div className={`w-12 md:w-16 rounded-t-lg flex-grow flex items-start justify-center pt-2 font-bold text-sm md:text-base border-x-2 border-t-2 ${val === '?' ? 'bg-orange-100 border-orange-400 text-orange-600' : 'bg-blue-100 border-blue-400 text-blue-800'}`}>
                                {val}
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else { // default circle
            content = (
                <div className="flex justify-center gap-4 mb-2">
                    {currentQ.items.map((val, i) => (
                        <div key={i} className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold border-4 shadow-md ${val === '?' ? 'border-orange-400 bg-orange-50 text-orange-500 animate-pulse' : 'border-blue-200 bg-white text-[#31326F]'}`}>
                            {val}
                        </div>
                    ))}
                </div>
            );
        }

        return content;
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
                        <h2 className="text-3xl font-bold text-[#31326F] mb-2">{score} / {questions.length} Solved</h2>
                        <p className="text-gray-500 mb-6 font-medium">Excellent detective work!</p>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <button onClick={() => navigate(0)} className="py-3 rounded-xl bg-[#31326F] text-white font-bold text-lg hover:bg-[#25265E] transition-all">New Case</button>
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
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap flex items-center gap-2">
                        <Search size={18} className="text-[#31326F]" />
                        Case {currentQIndex + 1} / {questions.length}
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
                        <div className="question-card-modern" style={{ padding: '1.5rem', paddingBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1, justifyContent: 'center' }}>
                            <div className="question-header-modern" style={{ marginBottom: '0' }}>
                                <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold uppercase tracking-wide text-xs mb-2 border border-yellow-200">
                                    The Number Detective
                                </div>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '600', textAlign: 'center', width: '100%', justifyContent: 'center', margin: 0 }}>
                                    {currentQ.question}
                                </h2>
                            </div>

                            {/* --- DYNAMIC CONTENT AREA --- */}

                            {currentQ.type === 'mcq' && (
                                <div className="flex flex-col items-center w-full h-full justify-center">
                                    {renderVisualDiagram()}
                                    <div className="interaction-area-modern w-full flex flex-col items-center mt-2">
                                        <div className="options-grid-modern w-full grid grid-cols-2 gap-2">
                                            {currentOptions.map((opt, i) => {
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
                                        {isSubmitted && isCorrect && (
                                            <div className="mt-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-lg animate-bounce flex items-center gap-2 border border-green-200 shadow-sm mb-1">
                                                <span className="text-xl">🌟</span> Good Eye, Detective!
                                            </div>
                                        )}
                                    </div>
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
                                            <span className="text-xl">🎉</span> Order Restored!
                                        </div>
                                    )}
                                </div>
                            )}

                            {currentQ.type === 'drag-match' && (
                                <div className="w-full h-full flex flex-col items-center">
                                    <div
                                        className="w-full flex-grow relative touch-none select-none bg-yellow-50/30 rounded-xl border border-yellow-100 flex flex-col mt-2 min-h-[180px]"
                                        onMouseMove={handleDragMove}
                                        onMouseUp={handleDragEnd}
                                        onTouchMove={handleDragMove}
                                        onTouchEnd={handleDragEnd}
                                    >
                                        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                            {connections.map((conn, i) => {
                                                const start = getDotPos(conn.from);
                                                const end = getDotPos(conn.to);
                                                if (!start.x || !end.x) return null;
                                                return (
                                                    <line key={i} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#FCD34D" strokeWidth="4" strokeLinecap="round" />
                                                );
                                            })}
                                            {currentLine && (
                                                <line x1={currentLine.x1} y1={currentLine.y1} x2={currentLine.x2} y2={currentLine.y2} stroke="#31326F" strokeWidth="3" strokeDasharray="5,5" strokeLinecap="round" />
                                            )}
                                        </svg>

                                        <div className="flex justify-between items-center flex-grow px-2 md:px-6 relative z-10 w-full h-full py-4">
                                            <div className="flex flex-col gap-3 w-5/12">
                                                {currentQ.pairs.map((item) => (
                                                    <div key={item.id} className="relative">
                                                        <div
                                                            className="bg-white py-2 px-2 rounded-xl border-2 border-yellow-200 shadow-sm text-center font-bold text-xs md:text-sm cursor-grab active:scale-95 transition-transform"
                                                            onMouseDown={(e) => handleDragStart(e, item.id)}
                                                            onTouchStart={(e) => handleDragStart(e, item.id)}
                                                        >
                                                            {item.text}
                                                        </div>
                                                        <div
                                                            ref={el => dotRefs.current[item.id] = el}
                                                            className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-yellow-100 rounded-full border-4 border-white shadow-sm flex items-center justify-center p-0.5"
                                                        >
                                                            <div className="w-full h-full bg-yellow-400 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-col gap-3 w-5/12">
                                                {shuffledTargets.map((item) => (
                                                    <div key={item.id} className="relative" data-target-id={item.id}>
                                                        <div className="bg-white py-2 px-2 rounded-xl border-2 border-blue-200 shadow-sm text-center font-bold text-xs md:text-sm">
                                                            {item.text}
                                                        </div>
                                                        <div
                                                            ref={el => dotRefs.current[item.id] = el}
                                                            className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-100 rounded-full border-4 border-white shadow-sm flex items-center justify-center p-0.5"
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
                                            <span className="text-xl">✨</span> Clues Matched!
                                        </div>
                                    ) : (
                                        <div className="text-center pt-2 pb-1 text-[10px] text-gray-400 uppercase tracking-widest font-bold">Connect the clues</div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanation}
                isCorrect={isCorrect}
                correctAnswer={currentQ.correct || (currentQ.correctSequence ? currentQ.correctSequence.join(', ') : 'Check Clues')}
                explanation={currentQ.solution}
                onClose={() => setShowExplanation(false)}
                onNext={() => setShowExplanation(false)}
            />

            {/* --- BOTTOM BAR --- */}
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
                            <button className="view-explanation-btn" onClick={() => setShowExplanation(true)}>
                                <Eye size={20} /> View Steps
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
                                <button className="nav-pill-submit-btn" onClick={handleSubmit} disabled={isSubmitted}>
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
                            <button className="view-explanation-btn" onClick={() => setShowExplanation(true)}>
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
                                <button className="nav-pill-submit-btn" onClick={handleSubmit} disabled={isSubmitted}>
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

export default NumberDetective;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, RotateCcw, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import '../../../../pages/juniors/JuniorPracticeSession.css';
import '../../../../pages/juniors/grade3/fair-share.css';

// --- Configuration ---
// Switch to odd columns so we have a center column for the axis
const GRID_COLS = 11;
const GRID_ROWS = 10;
const CELL_SIZE = 36;
const DOT_RADIUS = 5;
const TOUCH_RADIUS = 18;
const CANVAS_WIDTH = GRID_COLS * CELL_SIZE;
const CANVAS_HEIGHT = GRID_ROWS * CELL_SIZE;
const CENTER_COL = 5; // 0..10, 5 is center

// Helper to get coordinates
const getCoord = (col, row) => ({
    x: col * CELL_SIZE + CELL_SIZE / 2,
    y: row * CELL_SIZE + CELL_SIZE / 2
});

const getGridIndex = (x, y) => {
    // x,y relative to SVG
    // Find nearest dot
    const col = Math.round((x - CELL_SIZE / 2) / CELL_SIZE);
    const row = Math.round((y - CELL_SIZE / 2) / CELL_SIZE);

    // Check bounds
    if (col < 0 || col >= GRID_COLS || row < 0 || row >= GRID_ROWS) return null;

    // Check distance for "snap" feel
    const centerX = col * CELL_SIZE + CELL_SIZE / 2;
    const centerY = row * CELL_SIZE + CELL_SIZE / 2;
    const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

    if (dist > TOUCH_RADIUS) return null; // Only return if close enough

    return { col, row };
};

// Shape Definitions
// Must start and end on CENTER_COL (5) to be closed/symmetrical on axis.
// Defined as sequence of points for the LEFT side. 
// We will convert these to lines.
// Example: [{c:5,r:1}, {c:2,r:5}, {c:5,r:9}] -> Lines: (5,1)-(2,5), (2,5)-(5,9)
const SHAPE_PATHS = [
    // 1. Rectangle
    [{ c: 5, r: 2 }, { c: 2, r: 2 }, { c: 2, r: 8 }, { c: 5, r: 8 }],
    // 2. Steps (Stairs)
    [{ c: 5, r: 2 }, { c: 4, r: 2 }, { c: 4, r: 4 }, { c: 3, r: 4 }, { c: 3, r: 6 }, { c: 2, r: 6 }, { c: 2, r: 8 }, { c: 5, r: 8 }],
    // 3. Thick T-Shape
    [{ c: 5, r: 2 }, { c: 1, r: 2 }, { c: 1, r: 4 }, { c: 4, r: 4 }, { c: 4, r: 8 }, { c: 5, r: 8 }],
    // 4. Inverted T / Pedestal
    [{ c: 5, r: 2 }, { c: 4, r: 2 }, { c: 4, r: 6 }, { c: 1, r: 6 }, { c: 1, r: 8 }, { c: 5, r: 8 }],
    // 5. Spool / I-Beam
    [{ c: 5, r: 2 }, { c: 1, r: 2 }, { c: 1, r: 4 }, { c: 3, r: 4 }, { c: 3, r: 6 }, { c: 1, r: 6 }, { c: 1, r: 8 }, { c: 5, r: 8 }],
    // 6. Stepped Pyramid
    [{ c: 5, r: 1 }, { c: 4, r: 1 }, { c: 4, r: 3 }, { c: 3, r: 3 }, { c: 3, r: 5 }, { c: 2, r: 5 }, { c: 2, r: 9 }, { c: 5, r: 9 }],
    // 7. Notched Rectangle
    [{ c: 5, r: 2 }, { c: 2, r: 2 }, { c: 2, r: 4 }, { c: 3, r: 4 }, { c: 3, r: 6 }, { c: 2, r: 6 }, { c: 2, r: 8 }, { c: 5, r: 8 }],
    // 8. Castle Wall
    [{ c: 5, r: 8 }, { c: 1, r: 8 }, { c: 1, r: 4 }, { c: 2, r: 4 }, { c: 2, r: 5 }, { c: 3, r: 5 }, { c: 3, r: 4 }, { c: 4, r: 4 }, { c: 4, r: 5 }, { c: 5, r: 5 }],
    // 9. Key Shape
    [{ c: 5, r: 3 }, { c: 2, r: 3 }, { c: 2, r: 4 }, { c: 3, r: 4 }, { c: 3, r: 5 }, { c: 2, r: 5 }, { c: 2, r: 7 }, { c: 5, r: 7 }],
    // 10. Pixel Art / Complex Step
    [{ c: 5, r: 2 }, { c: 3, r: 2 }, { c: 3, r: 3 }, { c: 2, r: 3 }, { c: 2, r: 6 }, { c: 4, r: 6 }, { c: 4, r: 7 }, { c: 5, r: 7 }]
];

const mirrorCol = (col) => CENTER_COL + (CENTER_COL - col); // 5 + (5 - c) => 10 - c

const pathToLines = (path) => {
    const lines = [];
    for (let i = 0; i < path.length - 1; i++) {
        lines.push({
            c1: path[i].c, r1: path[i].r,
            c2: path[i + 1].c, r2: path[i + 1].r
        });
    }
    return lines;
};

const FairShareDraw = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [history, setHistory] = useState({}); // qIndex => { userLines, isSubmitted, isCorrect }
    const [userLines, setUserLines] = useState([]); // Array of {c1,r1,c2,r2}

    // Interaction State
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPoint, setDragStartPoint] = useState(null); // The point we are dragging FROM (latched)
    const [currentPointer, setCurrentPointer] = useState(null); // For rubberbanding (visual only)

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const svgRef = useRef(null);
    const [sessionId, setSessionId] = useState(null);

    const SKILL_ID = 9007;
    const SKILL_NAME = "Fair Share - Symmetry Drawing";
    const SHORT_SKILL_NAME = "Symmetry";
    const TOTAL_QUESTIONS = SHAPE_PATHS.length;

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(console.error);
        }
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    // Load state when qIndex changes
    useEffect(() => {
        if (history[qIndex]) {
            setUserLines(history[qIndex].userLines);
            setIsSubmitted(history[qIndex].isSubmitted);
            setIsCorrect(history[qIndex].isCorrect);
        } else {
            setUserLines([]);
            setIsSubmitted(false);
            setIsCorrect(false);
        }
        setShowExplanationModal(false);
    }, [qIndex]);

    // Derived State
    const currentLeftPath = SHAPE_PATHS[qIndex];
    const leftLines = pathToLines(currentLeftPath);

    const expectedLines = leftLines.map(l => ({
        c1: mirrorCol(l.c1), r1: l.r1,
        c2: mirrorCol(l.c2), r2: l.r2
    }));

    // --- Interaction ---

    const getPointerPos = (e) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const rect = svgRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        // Convert screen coords to SVG viewBox coords (accounts for scaling)
        const scaleX = CANVAS_WIDTH / rect.width;
        const scaleY = CANVAS_HEIGHT / rect.height;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    };

    const handlePointerDown = (e) => {
        if (isSubmitted) return;
        const pos = getPointerPos(e);
        const gridPos = getGridIndex(pos.x, pos.y);

        // Only allow drawing on the RIGHT half (columns >= center) so we can connect to axis
        if (gridPos && gridPos.col >= CENTER_COL) {
            setIsDragging(true);
            setDragStartPoint(gridPos);
            setCurrentPointer(pos); // Start rubberband
        }
    };

    const handlePointerMove = (e) => {
        if (!isDragging || isSubmitted) return;
        e.preventDefault();
        const pos = getPointerPos(e);
        setCurrentPointer(pos);

        // Auto-connect check
        const gridPos = getGridIndex(pos.x, pos.y);
        // Only allow connecting to dots on the RIGHT half
        if (gridPos && gridPos.col >= CENTER_COL) {
            // If moved to a DIFFERENT dot than dragStartPoint
            if (gridPos.col !== dragStartPoint.col || gridPos.row !== dragStartPoint.row) {
                // Add Line
                const newLine = {
                    c1: dragStartPoint.col, r1: dragStartPoint.row,
                    c2: gridPos.col, r2: gridPos.row
                };

                setUserLines(prev => [...prev, newLine]);

                // Move start point to this new point (continue drawing chain)
                setDragStartPoint(gridPos);
            }
        }
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        setDragStartPoint(null);
        setCurrentPointer(null);
    };

    // --- Validation ---
    // Helper to break any line into grid-unit segments (length 1)
    // This handles cases where user draws one long line vs multiple short lines, 
    // or expected lines are defined differently than drawn.
    const expandToUnitSegments = (lines) => {
        const segments = new Set();

        lines.forEach(line => {
            const { c1, r1, c2, r2 } = line;

            // Determine direction
            const isHorizontal = r1 === r2;
            const isVertical = c1 === c2;

            if (isHorizontal) {
                const minC = Math.min(c1, c2);
                const maxC = Math.max(c1, c2);
                for (let c = minC; c < maxC; c++) {
                    segments.add(normalizeLine({ c1: c, r1: r1, c2: c + 1, r2: r1 }));
                }
            } else if (isVertical) {
                // strict check: Do not allow lines on the center axis (symmetry line)
                if (c1 === CENTER_COL) return;

                const minR = Math.min(r1, r2);
                const maxR = Math.max(r1, r2);
                for (let r = minR; r < maxR; r++) {
                    segments.add(normalizeLine({ c1: c1, r1: r, c2: c1, r2: r + 1 }));
                }
            }
            // Ignore diagonals as they shouldn't exist in this mode
        });

        return segments;
    };

    const normalizeLine = (l) => {
        // Sort points: smaller (r, then c) first
        const p1 = l.r1 * 100 + l.c1;
        const p2 = l.r2 * 100 + l.c2;
        if (p1 > p2) return `${l.c2},${l.r2}-${l.c1},${l.r1}`;
        return `${l.c1},${l.r1}-${l.c2},${l.r2}`;
    };

    const handlePrev = () => {
        if (qIndex > 0) {
            setHistory(prev => ({ ...prev, [qIndex]: { userLines, isSubmitted, isCorrect } }));
            setQIndex(p => p - 1);
        }
    };

    const checkAnswer = () => {
        // 1. Decompose both sets to atomic unit segments
        const userSegments = expandToUnitSegments(userLines);
        const expectedSegments = expandToUnitSegments(expectedLines);

        // 2. Exact Set Comparison
        const missing = [...expectedSegments].filter(x => !userSegments.has(x));
        const extra = [...userSegments].filter(x => !expectedSegments.has(x));

        const correct = missing.length === 0 && extra.length === 0;

        setIsCorrect(correct);
        setIsSubmitted(true);
        if (correct) {
            setFeedbackMessage("✨ Symmetry Mastered! ✨");
        } else {
            setFeedbackMessage("Not quite! Check your lines.");
        }

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: 'Medium',
                question_text: "Draw Symmetry",
                correct_answer: "right answer",
                student_answer: correct ? "right answer" : "wrong answer",
                is_correct: correct,
                time_spent_seconds: timeElapsed
            }).catch(console.error);
        }
    };

    // --- Render ---

    const renderGrid = () => {
        const dots = [];
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                const { x, y } = getCoord(c, r);
                const isCenter = c === CENTER_COL;
                dots.push(
                    <circle key={`d${c}_${r}`} cx={x} cy={y} r={isCenter ? 3 : 2.5} fill={isCenter ? "#94A3B8" : "#CBD5E1"} />
                );
            }
        }
        return dots;
    };

    const renderLine = (l, color = "black", width = 3, key) => {
        const p1 = getCoord(l.c1, l.r1);
        const p2 = getCoord(l.c2, l.r2);
        return (
            <line key={key} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={color} strokeWidth={width} strokeLinecap="round" />
        );
    };

    const nextQuestion = async () => {
        setHistory(prev => ({ ...prev, [qIndex]: { userLines, isSubmitted, isCorrect } }));
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(p => p + 1);
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            setShowResult(true);
        }
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
        <div className="junior-practice-page fair-share-theme font-sans flex flex-col fixed inset-0 w-full h-[100dvh] overflow-hidden">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                /* Landscape Specific Fixes */
                @media (orientation: landscape) and (max-height: 500px) {
                    .junior-practice-header {
                        height: 48px !important;
                    }
                    .draw-halves-canvas-wrapper {
                        max-width: 260px !important;
                    }
                    .fixed.bottom-6 {
                        bottom: 0.75rem !important;
                    }
                    .fixed.left-6, .fixed.right-6 {
                        transform: scale(0.8);
                        transform-origin: bottom center;
                    }
                    .fixed.left-6 { left: 0.5rem !important; }
                    .fixed.right-6 { right: 0.5rem !important; }
                    
                    .gap-4 { gap: 0.5rem !important; }
                    .md\\:gap-8 { gap: 1.5rem !important; }
                    .pt-4, .pt-8 { padding-top: 0.5rem !important; }
                    .pb-32 { padding-bottom: 4rem !important; }

                    .text-sm.md\\:text-lg {
                        font-size: 0.75rem !important;
                        margin-bottom: 0.2rem !important;
                    }

                    /* Smaller Undo/Clear buttons in landscape */
                    .undo-clear-btn {
                        padding: 0.4rem 0.8rem !important;
                        font-size: 0.75rem !important;
                        border-radius: 0.75rem !important;
                    }
                    .undo-clear-btn svg {
                        width: 14px !important;
                        height: 14px !important;
                    }
                }
            `}</style>

            <header className="junior-practice-header fair-share-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem', position: 'relative' }}>
                <div className="header-left">
                    <span className="skill-name-desktop text-[#31326F] font-normal text-lg sm:text-xl">{SKILL_NAME}</span>
                    <span className="skill-name-mobile text-[#31326F] font-normal text-lg sm:text-xl">{SHORT_SKILL_NAME}</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-center">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] text-sm sm:text-lg lg:text-2xl shadow-lg whitespace-nowrap font-medium">
                        <span className="hidden sm:inline">Question </span>{qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-sm sm:text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-0 overflow-hidden relative w-full">
                <div className="w-full max-w-[500px] md:max-w-[800px] lg:max-w-[950px] flex flex-col h-full max-h-full relative mx-auto">

                    {/* Area containing Card AND Buttons */}
                    <div
                        className="flex-1 overflow-hidden min-h-0 flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-8 pt-4 md:pt-8 pb-32"
                    >
                        {/* Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-3 md:p-6 border-4 border-[#E2E8F0] relative w-full md:w-auto md:flex-none max-w-[500px] my-auto">
                            <div className="text-center mb-2 md:mb-4 text-[#31326F] font-normal text-lg md:text-xl">
                                Complete the picture! The red line is a mirror.
                            </div>

                            {/* Responsive canvas wrapper */}
                            <div
                                className="draw-halves-canvas-wrapper relative bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden touch-none select-none mx-auto"
                                style={{ width: '100%', maxWidth: CANVAS_WIDTH, aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}` }}
                            >
                                <svg
                                    ref={svgRef}
                                    viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
                                    width="100%"
                                    height="100%"
                                    onPointerDown={handlePointerDown}
                                    onPointerMove={handlePointerMove}
                                    onPointerUp={handlePointerUp}
                                    onPointerLeave={handlePointerUp}
                                    style={{ cursor: 'crosshair', touchAction: 'none', display: 'block' }}
                                >
                                    {/* Mirror Axis */}
                                    <line
                                        x1={CANVAS_WIDTH / 2} y1={0}
                                        x2={CANVAS_WIDTH / 2} y2={CANVAS_HEIGHT}
                                        stroke="#EF4444"
                                        strokeWidth="2"
                                        strokeDasharray="6,4"
                                    />

                                    {/* Given Left Side */}
                                    {leftLines.map((l, i) => renderLine(l, "#334155", 4, `left-${i}`))}

                                    {/* User Lines */}
                                    {userLines.map((l, i) => renderLine(l, isSubmitted ? (isCorrect ? "#10B981" : "#EF4444") : "#3B82F6", 4, `user-${i}`))}

                                    {/* Active Rubberband */}
                                    {isDragging && dragStartPoint && currentPointer && (
                                        <line
                                            x1={getCoord(dragStartPoint.col, dragStartPoint.row).x}
                                            y1={getCoord(dragStartPoint.col, dragStartPoint.row).y}
                                            x2={currentPointer.x}
                                            y2={currentPointer.y}
                                            stroke="#60A5FA"
                                            strokeWidth="2"
                                            strokeDasharray="4,4"
                                        />
                                    )}

                                    {/* Grid - Rendered LAST to be on top */}
                                    {renderGrid()}
                                </svg>
                            </div>

                            {/* Feedback Overlay */}
                            <AnimatePresence>
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-3xl pointer-events-none`}
                                    >
                                        <div className={`text-3xl font-black ${isCorrect ? 'text-green-600' : 'text-red-500'} bg-white p-6 rounded-2xl shadow-2xl border-4 ${isCorrect ? 'border-green-100' : 'border-red-100'}`}>
                                            {feedbackMessage}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Toolbar - Right side on Desktop/Landscape, Bottom on Mobile Portrait */}
                        <div className="flex justify-center md:flex-col md:justify-center gap-3 md:gap-4 pt-4 md:pt-0 pb-8 md:pb-0 flex-none w-full md:w-auto my-auto">
                            <button
                                onClick={() => setUserLines(prev => prev.slice(0, -1))}
                                disabled={userLines.length === 0 || isSubmitted}
                                className="undo-clear-btn bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 shadow-sm transition-all hover:scale-105"
                            >
                                <RotateCcw size={20} /> Undo
                            </button>
                            <button
                                onClick={() => setUserLines([])}
                                disabled={userLines.length === 0 || isSubmitted}
                                className="undo-clear-btn bg-red-50 border-2 border-red-100 hover:bg-red-100 text-red-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 shadow-sm transition-all hover:scale-105"
                            >
                                <Trash2 size={20} /> Clear
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Buttons Replacement for Bottom Bar */}
            <div className="fixed bottom-4 left-4 z-50 flex gap-2">
                <button className="bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] p-3 md:px-6 md:py-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-2 text-lg shadow-lg" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>
                    <span className="hidden md:inline">Exit</span>
                    <X className="md:hidden" size={20} />
                </button>
                {isSubmitted && (
                    <button className="shadow-lg bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-full flex items-center gap-2" onClick={() => setShowExplanationModal(true)}>
                        <Eye size={20} /> <span className="hidden md:inline">View Explanation</span><span className="md:hidden">Explain</span>
                    </button>
                )}
            </div>

            <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/80 p-2 rounded-2xl backdrop-blur-sm shadow-lg border border-gray-100">
                <button
                    className={`flex items-center gap-1 transition-all p-2 md:px-4 rounded-xl ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100"}`}
                    onClick={handlePrev}
                    disabled={qIndex === 0}
                    style={{ backgroundColor: qIndex === 0 ? '#f3f4f6' : '#eef2ff', color: '#31326F', fontWeight: 600 }}
                >
                    <ChevronLeft size={20} className="md:w-6 md:h-6" strokeWidth={3} /> <span className="hidden md:inline">PREV</span>
                </button>
                {isSubmitted ? (
                    <button className="shadow-md py-2 px-4 rounded-xl flex items-center gap-1 bg-green-500 text-white font-bold hover:bg-green-600 transition-colors" onClick={nextQuestion}>
                        <span className="hidden md:inline">NEXT </span><ChevronRight size={20} className="md:w-6 md:h-6 md:hidden lg:inline" strokeWidth={3} />
                        <span className="md:hidden">NEXT</span>
                    </button>
                ) : (
                    <button
                        className="shadow-md py-2 px-4 rounded-xl flex items-center gap-1 font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-[#4FB7B3] text-white hover:bg-[#3FA09D] transition-colors"
                        onClick={checkAnswer}
                        disabled={userLines.length === 0}
                    >
                        <span className="hidden md:inline">SUBMIT </span><Check size={20} className="md:hidden lg:inline" strokeWidth={3} />
                        <span className="md:hidden">SUBMIT</span>
                    </button>
                )}
            </div>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer="Symmetry"
                explanation="Make sure the right side looks exactly like the left side mirrored!"
                onClose={() => setShowExplanationModal(false)}
            />
        </div>
    );
};

export default FairShareDraw;

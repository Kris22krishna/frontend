import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Star, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import ExplanationModal from '../../../../ExplanationModal';
import FunWithSymmetryReportModal from '../FunWithSymmetryReportModal';
import '../FunWithSymmetry.css';

import { useSessionLogger } from '../../../../../hooks/useSessionLogger';

const NODE_ID = 'a4041006-0006-0000-0000-000000000000';
const GRID_COLS = 11;
const GRID_ROWS = 11;
const CELL_SIZE = 36;
const TOUCH_RADIUS = 18;
const CANVAS_WIDTH = (GRID_COLS - 1) * CELL_SIZE + 40;
const CANVAS_HEIGHT = (GRID_ROWS - 1) * CELL_SIZE + 40;
const OFFSET = 20; // Padding for dots

const getCoord = (col, row) => ({
    x: col * CELL_SIZE + OFFSET,
    y: row * CELL_SIZE + OFFSET
});

const getGridIndex = (x, y) => {
    const col = Math.round((x - OFFSET) / CELL_SIZE);
    const row = Math.round((y - OFFSET) / CELL_SIZE);

    if (col < 0 || col >= GRID_COLS || row < 0 || row >= GRID_ROWS) return null;

    const centerX = col * CELL_SIZE + OFFSET;
    const centerY = row * CELL_SIZE + OFFSET;
    const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

    if (dist > TOUCH_RADIUS) return null;

    return { col, row };
};

const SymmetryOnDotGrid = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [userLines, setUserLines] = useState([]); // Array of {c1, r1, c2, r2}
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPoint, setDragStartPoint] = useState(null);
    const [currentPointer, setCurrentPointer] = useState(null);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [showSolution, setShowSolution] = useState(false);

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
  const v4AnswersPayload = useRef([]);
  const v4IsFinishedRef = useRef(false);
  const { startSession, finishSession, abandonSession } = useSessionLogger();
  useEffect(() => {
    return () => { if (!v4IsFinishedRef.current) abandonSession(); };
  }, []);


    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1204; // Adjust as needed
    const SKILL_NAME = "Fun with Symmetry - Complete on Dot Grid";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const svgRef = useRef(null);

    // ----------------------------------------------------------------------
    // Coordinate Helpers
    // ----------------------------------------------------------------------
    const reflectPoint = (col, row, mirrorLine) => {
        // mirrorLine is {type: 'vertical'|'horizontal', val: col|row}
        if (mirrorLine.type === 'vertical') {
            const dist = col - mirrorLine.val;
            return { c: mirrorLine.val - dist, r: row };
        } else {
            const dist = row - mirrorLine.val;
            return { c: col, r: mirrorLine.val - dist };
        }
    };

    const isSameLine = (l1, l2) => {
        return (l1.c1 === l2.c1 && l1.r1 === l2.r1 && l1.c2 === l2.c2 && l1.r2 === l2.r2) ||
            (l1.c1 === l2.c2 && l1.r1 === l2.r2 && l1.c2 === l2.c1 && l1.r2 === l2.r1);
    };

    // ----------------------------------------------------------------------
    // Questions Data (10 questions: 3 easy, 3 medium, 4 hard)
    // ----------------------------------------------------------------------
    const QUESTIONS = [
        // 3 Easy (Vertical mirror, simple shapes)
        {
            mirror: { type: 'vertical', val: 5 }, // Middle column (0-10)
            originalLines: [
                { c1: 1, r1: 2, c2: 5, r2: 2 },
                { c1: 1, r1: 2, c2: 3, r2: 5 },
                { c1: 3, r1: 5, c2: 1, r2: 8 },
                { c1: 1, r1: 8, c2: 5, r2: 8 }
            ],
            solution: "Draw matching lines on the right side of the mirror. Start from the mirror and move outwards exactly as much as the left side did."
        },
        {
            mirror: { type: 'vertical', val: 5 },
            originalLines: [
                { c1: 5, r1: 1, c2: 2, r2: 5 },
                { c1: 2, r1: 5, c2: 5, r2: 9 }
            ],
            solution: "Reflect the triangle points across the vertical mirror."
        },
        {
            mirror: { type: 'horizontal', val: 5 }, // Middle row
            originalLines: [
                { c1: 2, r1: 2, c2: 5, r2: 5 },
                { c1: 5, r1: 5, c2: 8, r2: 2 }
            ],
            solution: "The shape goes down to the mirror. The reflection should go from the mirror straight down!"
        },

        // 3 Medium (More lines, distinct corners)
        {
            mirror: { type: 'vertical', val: 5 },
            originalLines: [
                { c1: 5, r1: 2, c2: 2, r2: 2 },
                { c1: 2, r1: 2, c2: 2, r2: 5 },
                { c1: 2, r1: 5, c2: 4, r2: 5 },
                { c1: 4, r1: 5, c2: 4, r2: 8 },
                { c1: 4, r1: 8, c2: 5, r2: 8 }
            ],
            solution: "Carefully reflect each corner. If a point is 3 dots left of the mirror, its reflection is 3 dots right of the mirror."
        },
        {
            mirror: { type: 'vertical', val: 5 },
            originalLines: [
                { c1: 5, r1: 1, c2: 1, r2: 3 },
                { c1: 1, r1: 3, c2: 1, r2: 7 },
                { c1: 1, r1: 7, c2: 5, r2: 9 }
            ],
            solution: "Matching sloped lines exactly. Notice how many dots over and how many dots down the original line goes, and do the opposite horizontally."
        },
        {
            mirror: { type: 'horizontal', val: 5 },
            originalLines: [
                { c1: 1, r1: 5, c2: 1, r2: 2 },
                { c1: 1, r1: 2, c2: 3, r2: 2 },
                { c1: 3, r1: 2, c2: 3, r2: 4 },
                { c1: 3, r1: 4, c2: 5, r2: 4 },
                { c1: 5, r1: 4, c2: 5, r2: 5 }
            ],
            solution: "Reflect across the horizontal line! If it goes UP from the mirror originally, the reflection needs to go DOWN."
        },

        // 4 Hard (Complex polygons, house, etc)
        {
            mirror: { type: 'vertical', val: 5 },
            originalLines: [
                { c1: 5, r1: 1, c2: 2, r2: 4 },
                { c1: 2, r1: 4, c2: 2, r2: 9 },
                { c1: 2, r1: 9, c2: 5, r2: 9 },
                { c1: 5, r1: 5, c2: 3, r2: 5 },
                { c1: 3, r1: 5, c2: 3, r2: 7 },
                { c1: 3, r1: 7, c2: 5, r2: 7 }
            ],
            solution: "This is a half-house with a window! Make sure you draw both the roof/walls AND the window on the right side."
        },
        {
            mirror: { type: 'horizontal', val: 5 },
            originalLines: [
                { c1: 2, r1: 5, c2: 4, r2: 2 },
                { c1: 4, r1: 2, c2: 6, r2: 2 },
                { c1: 6, r1: 2, c2: 8, r2: 5 },
                { c1: 2, r1: 5, c2: 5, r2: 4 },
                { c1: 8, r1: 5, c2: 5, r2: 4 }
            ],
            solution: "A tricky crown shape. Remember to reflect every single point across the horizontal mirror line!"
        },
        {
            mirror: { type: 'vertical', val: 5 },
            originalLines: [
                { c1: 5, r1: 1, c2: 4, r2: 3 },
                { c1: 4, r1: 3, c2: 1, r2: 3 },
                { c1: 1, r1: 3, c2: 3, r2: 5 },
                { c1: 3, r1: 5, c2: 2, r2: 9 },
                { c1: 2, r1: 9, c2: 5, r2: 7 }
            ],
            solution: "This is half of a star! Pay close attention to the coordinates of each point to mirror them perfectly."
        },
        {
            mirror: { type: 'vertical', val: 5 },
            originalLines: [
                { c1: 5, r1: 2, c2: 3, r2: 4 },
                { c1: 3, r1: 4, c2: 3, r2: 6 },
                { c1: 3, r1: 6, c2: 5, r2: 8 },
                { c1: 4, r1: 6, c2: 1, r2: 6 },
                { c1: 1, r1: 6, c2: 1, r2: 8 },
                { c1: 1, r1: 8, c2: 4, r2: 8 }
            ],
            solution: "An abstract shape with a sticking-out arm. Mirror the main body first, then add the arm on the right!"
        }
    ];

    // Helper to calculate target lines for a question
    const getTargetLines = (q) => {
        return q.originalLines.map(line => {
            const p1 = reflectPoint(line.c1, line.r1, q.mirror);
            const p2 = reflectPoint(line.c2, line.r2, q.mirror);
            return { c1: p1.c, r1: p1.r, c2: p2.c, r2: p2.r };
        });
    };

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
            startSession({ nodeId: NODE_ID, sessionType: 'practice' });
            v4AnswersPayload.current = [];
            v4IsFinishedRef.current = false;
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        setSessionQuestions(QUESTIONS);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setUserLines(previousAnswer.userLines);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setUserLines([]);
                setIsSubmitted(false);
                setIsCorrect(false);
                setIsDragging(false);
                setDragStartPoint(null);
                setCurrentPointer(null);
                setShowSolution(false);
            }
        }
    }, [qIndex, sessionQuestions]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getPointerPos = (e) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const rect = svgRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
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

        if (gridPos) {
            setIsDragging(true);
            setDragStartPoint(gridPos);
            setCurrentPointer(pos);
        }
    };

    const handlePointerMove = (e) => {
        if (!isDragging || isSubmitted) return;
        e.preventDefault();
        const pos = getPointerPos(e);
        setCurrentPointer(pos);
    };

    const handlePointerUp = (e) => {
        if (!isDragging || isSubmitted) return;
        const pos = getPointerPos(e);
        const gridPos = getGridIndex(pos.x, pos.y);

        if (gridPos && (gridPos.col !== dragStartPoint.col || gridPos.row !== dragStartPoint.row)) {
            const newLine = {
                c1: dragStartPoint.col, r1: dragStartPoint.row,
                c2: gridPos.col, r2: gridPos.row
            };

            // Check if line already exists, if so remove it (toggle feature)
            const exists = userLines.some(l => isSameLine(l, newLine));
            if (exists) {
                setUserLines(prev => prev.filter(l => !isSameLine(l, newLine)));
            } else {
                setUserLines(prev => [...prev, newLine]);
            }
        }
        setIsDragging(false);
        setDragStartPoint(null);
        setCurrentPointer(null);
    };

    const clearLines = () => {
        setUserLines([]);
    };

    const handleSubmit = () => {
        if (userLines.length === 0) return;
        const currentQuestion = sessionQuestions[qIndex];
        const targetLines = getTargetLines(currentQuestion);

        // Exact match check
        let isRight = true;
        if (userLines.length !== targetLines.length) {
            isRight = false;
        } else {
            for (const tLine of targetLines) {
                if (!userLines.some(uLine => isSameLine(uLine, tLine))) {
                    isRight = false;
                    break;
                }
            }
        }

        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, userLines } }));

        if (isRight) {
            setFeedbackMessage("✨ Beautifully symmetrical! ✨");
        } else {
            setShowExplanationModal(true);
        }

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        api.recordAttempt({
            user_id: parseInt(userId, 10),
            session_id: sessionId,
            skill_id: SKILL_ID,
            difficulty_level: qIndex < 3 ? 'Easy' : (qIndex < 6 ? 'Medium' : 'Hard'),
            question_text: `Complete the symmetric figure on the dot grid.`,
            correct_answer: "Correctly mirrored lines",
            student_answer: isRight ? "Correct" : "Incorrect structure",
            is_correct: isRight,
            solution_text: currentQuestion.solution,
            time_spent_seconds: Math.round(timeSpent / 1000)
        }).catch(console.error);
        v4AnswersPayload.current.push({
          node_id: NODE_ID,
          is_correct: isRight,
          time_spent_ms: Date.now() - questionStartTime.current,
        });
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setIsSubmitted(false);
            setIsCorrect(false);
            setUserLines([]);
            setShowExplanationModal(false);
            setShowSolution(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            try {
                const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
                if (userId && sessionId) {
                    const totalCorrect = Object.values(answers).filter(val => val.isCorrect).length;
                    await api.createReport({
                        title: SKILL_NAME,
                        type: 'practice',
                        score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: { skill_id: SKILL_ID, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed },
                        user_id: parseInt(userId, 10)
                    });
                    if (!v4IsFinishedRef.current) {
                      v4IsFinishedRef.current = true;
                      finishSession({ answers_payload: v4AnswersPayload.current });
                    }
                    await api.finishSession(sessionId);
                }
            } catch (error) {
                console.error("Error finalizing practice session:", error);
            }
            setShowResults(true);
        }
    };

    const handlePrevious = () => { if (qIndex > 0) setQIndex(prev => prev - 1); };

    // Rendering Helpers
    const renderGrid = () => {
        const dots = [];
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                const { x, y } = getCoord(c, r);
                dots.push(<circle key={`d${c}_${r}`} cx={x} cy={y} r={3} fill="#94A3B8" />);
            }
        }
        return dots;
    };

    const renderLines = (lines, color, dasharray = "none", opacity = 1) => {
        return lines.map((line, i) => (
            <line
                key={`l${i}`}
                x1={getCoord(line.c1, line.r1).x}
                y1={getCoord(line.c1, line.r1).y}
                x2={getCoord(line.c2, line.r2).x}
                y2={getCoord(line.c2, line.r2).y}
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={dasharray}
                opacity={opacity}
            />
        ));
    };

    const renderMirrorLine = (mirror) => {
        if (mirror.type === 'vertical') {
            const x = getCoord(mirror.val, 0).x;
            return <line x1={x} y1={0} x2={x} y2={CANVAS_HEIGHT} stroke="#2563EB" strokeWidth="3" strokeDasharray="8,8" />;
        } else {
            const y = getCoord(0, mirror.val).y;
            return <line x1={0} y1={y} x2={CANVAS_WIDTH} y2={y} stroke="#2563EB" strokeWidth="3" strokeDasharray="8,8" />;
        }
    };

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        
        return (
            <div className="junior-practice-page symmetry-theme" style={{ fontFamily: '"Open Sans", sans-serif', minHeight: '100vh' }}>
                <FunWithSymmetryReportModal
                    isOpen={showResults}
                    stats={{
                        timeTaken: formatTime(timeElapsed),
                        correctAnswers: score,
                        totalQuestions: TOTAL_QUESTIONS
                    }}
                    onContinue={() => navigate(-1)}
                />
            </div>
        );
    }

    const currentQuestion = sessionQuestions[qIndex];
    if (!currentQuestion) return <div>Loading...</div>;

    const targetLines = getTargetLines(currentQuestion);

    return (
        <div className="junior-practice-page symmetry-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <h1 className="text-xl font-bold text-[#31326F]">Fun with Symmetry</h1>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-[#0097A7]/30 text-[#31326F] font-bold text-lg shadow-sm whitespace-nowrap">Question {qIndex + 1} of {TOTAL_QUESTIONS}</div>
                </div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#0097A7]/30 text-[#31326F] font-bold text-lg shadow-sm">{formatTime(timeElapsed)}</div></div>
            </header>

            <main className="practice-content-wrapper flex flex-col min-h-[calc(100vh-140px)] py-2 px-4 md:p-4 relative overflow-y-auto overflow-x-hidden">
                <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-xl border-4 border-[#E0F7FA] p-6 lg:p-10 flex flex-col md:flex-row gap-8 items-center justify-center min-h-[500px]">

                    {/* Canvas Area */}
                    <div className="w-full flex flex-col items-center">
                        <div className="w-full flex justify-center text-center pb-4">
                            <h2 className="text-xl md:text-2xl font-normal font-['Open_Sans'] text-[#31326F] px-4">
                                Complete the symmetrical shape!
                            </h2>
                        </div>

                        <div className="bg-[#F8FAFC] border-4 border-slate-200 rounded-3xl overflow-hidden relative touch-none select-none shadow-inner" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
                            <svg
                                ref={svgRef}
                                viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
                                width="100%"
                                height="100%"
                                onPointerDown={handlePointerDown}
                                onPointerMove={handlePointerMove}
                                onPointerUp={handlePointerUp}
                                onPointerLeave={handlePointerUp}
                                style={{ cursor: 'crosshair', touchAction: 'none' }}
                            >
                                {/* Background Mirror Area Highlights */}
                                {currentQuestion.mirror.type === 'vertical' && (
                                    <rect x={getCoord(currentQuestion.mirror.val, 0).x} y="0" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="#E0F2FE" opacity="0.3" pointerEvents="none" />
                                )}
                                {currentQuestion.mirror.type === 'horizontal' && (
                                    <rect x="0" y={getCoord(0, currentQuestion.mirror.val).y} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="#E0F2FE" opacity="0.3" pointerEvents="none" />
                                )}

                                {/* Mirror Line */}
                                {renderMirrorLine(currentQuestion.mirror)}

                                {/* Grid Dots */}
                                {renderGrid()}

                                {/* Original Half */}
                                {renderLines(currentQuestion.originalLines, "#334155")}

                                {/* Target Lines (Solution) - only show if showSolution is true */}
                                {isSubmitted && showSolution && renderLines(targetLines, "#A7F3D0", "8,8", 0.7)}

                                {/* User Lines */}
                                {renderLines(userLines, isSubmitted ? (isCorrect ? "#10B981" : "#EF4444") : "#0097A7")}

                                {/* Dragging Rubberband */}
                                {isDragging && dragStartPoint && currentPointer && (
                                    <line
                                        x1={getCoord(dragStartPoint.col, dragStartPoint.row).x}
                                        y1={getCoord(dragStartPoint.col, dragStartPoint.row).y}
                                        x2={currentPointer.x}
                                        y2={currentPointer.y}
                                        stroke="#4DD0E1"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeDasharray="10,6"
                                    />
                                )}
                            </svg>
                        </div>

                        {isSubmitted && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full mt-6">
                                <div className={`text-xl font-bold px-6 py-3 rounded-full inline-block ${isCorrect ? 'text-green-700 bg-green-100 border-2 border-green-200' : 'text-red-700 bg-red-100 border-2 border-red-200'}`}>
                                    {isCorrect ? feedbackMessage : "Not quite! Check the explanation to see the correct reflection."}
                                </div>
                            </motion.div>
                        )}

                        {!isSubmitted && (
                            <div className="flex flex-col items-center mt-4 text-center">
                                <span className="text-gray-500 font-bold italic text-sm">Drag between dots to draw lines across the blue mirror area.</span>
                                <span className="text-[#0097A7] font-semibold text-xs mt-1">Tap a line you drew to remove it.</span>
                            </div>
                        )}
                    </div>

                    {/* Tools Area */}
                    <div className="flex flex-col gap-4 w-full md:w-auto mt-4 md:mt-0 items-center justify-center bg-white/50 p-6 rounded-3xl border-2 border-gray-100 shadow-sm">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest hidden md:block">Tools</span>
                        <button
                            onClick={clearLines}
                            disabled={userLines.length === 0 || isSubmitted}
                            className={`flex flex-col md:flex-row items-center gap-2 px-6 py-4 rounded-2xl font-bold shadow-sm transition-all
                                ${userLines.length === 0 || isSubmitted ? 'bg-gray-100 text-gray-400 border border-gray-200 opacity-50 cursor-not-allowed' : 'bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] hover:bg-red-50 hover:scale-105 active:scale-95'}`}
                        >
                            <Trash2 size={24} /> <span className="hidden md:inline">Clear Lines</span>
                        </button>

                        {isSubmitted && !isCorrect && (
                            <button className={`flex flex-col md:flex-row items-center gap-2 px-6 py-4 rounded-2xl font-bold shadow-sm border-2 transition-all mt-4
                                ${showSolution ? 'bg-green-100 text-green-700 border-green-200' : 'bg-[#E0F7FA] text-[#0097A7] border-[#B2EBF2] hover:bg-[#B2EBF2] hover:scale-105'}`}
                                onClick={() => {
                                    setShowSolution(true);
                                    setShowExplanationModal(true);
                                }}
                            >
                                <Eye size={24} /> <span className="hidden md:inline">See Solution</span>
                            </button>
                        )}
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={"Symmetrical completion"} explanation={currentQuestion.solution + " (The correct lines are shown in dashed green on the grid!)"} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar flex items-center justify-between px-8 py-4 bg-white border-t-2 border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] rounded-t-[2rem] relative z-20">
                <button className="bg-red-50 text-red-500 px-6 py-3 rounded-2xl border-2 border-red-100 font-bold hover:bg-red-100" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {qIndex > 0 && <button className="px-6 py-3 bg-gray-100 text-[#31326F] font-bold rounded-2xl hover:bg-gray-200" onClick={handlePrevious}>Previous</button>}
                    {isSubmitted ? (
                        <button className="px-8 py-3 bg-[#0097A7] text-white font-bold rounded-2xl flex border-b-4 border-[#006064] active:border-b-0 active:translate-y-1 hover:bg-[#00838F]" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="px-8 py-3 bg-[#00E676] text-white font-bold rounded-2xl flex border-b-4 border-[#00C853] active:border-b-0 active:translate-y-1 hover:bg-[#69F0AE] disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={userLines.length === 0}>Submit</button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default SymmetryOnDotGrid;

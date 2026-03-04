import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, RotateCcw, Trash2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../FunWithSymmetry.css';

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

const SHAPES = [
    // 3 Easy
    {
        id: 'triangle',
        path: [{ c: 5, r: 2 }, { c: 2, r: 8 }, { c: 8, r: 8 }],
        validLines: [
            [{ c: 5, r: 2 }, { c: 5, r: 8 }], [{ c: 5, r: 1 }, { c: 5, r: 9 }], [{ c: 5, r: 0 }, { c: 5, r: 10 }]
        ],
        solution: "A vertical line down the middle cuts the triangle perfectly in half."
    },
    {
        id: 'rectangle',
        path: [{ c: 3, r: 3 }, { c: 7, r: 3 }, { c: 7, r: 7 }, { c: 3, r: 7 }],
        validLines: [
            [{ c: 5, r: 3 }, { c: 5, r: 7 }], [{ c: 5, r: 2 }, { c: 5, r: 8 }], [{ c: 5, r: 1 }, { c: 5, r: 9 }], // vertical
            [{ c: 3, r: 5 }, { c: 7, r: 5 }], [{ c: 2, r: 5 }, { c: 8, r: 5 }], [{ c: 1, r: 5 }, { c: 9, r: 5 }], // horizontal
            [{ c: 5, r: 0 }, { c: 5, r: 10 }], [{ c: 0, r: 5 }, { c: 10, r: 5 }]
        ],
        solution: "A square has 4 lines of symmetry: vertical, horizontal, and two diagonals. Any of them works!"
    },
    {
        id: 'kite',
        path: [{ c: 5, r: 1 }, { c: 8, r: 4 }, { c: 5, r: 9 }, { c: 2, r: 4 }],
        validLines: [
            [{ c: 5, r: 1 }, { c: 5, r: 9 }], [{ c: 5, r: 0 }, { c: 5, r: 10 }]
        ],
        solution: "A line straight down from the top point to the bottom point is the line of symmetry for a kite."
    },

    // 3 Medium
    {
        id: 'T-shape',
        path: [{ c: 2, r: 2 }, { c: 8, r: 2 }, { c: 8, r: 4 }, { c: 6, r: 4 }, { c: 6, r: 8 }, { c: 4, r: 8 }, { c: 4, r: 4 }, { c: 2, r: 4 }],
        validLines: [
            [{ c: 5, r: 2 }, { c: 5, r: 8 }], [{ c: 5, r: 1 }, { c: 5, r: 9 }], [{ c: 5, r: 0 }, { c: 5, r: 10 }]
        ],
        solution: "The 'T' shape is perfectly balanced left-to-right, so a vertical line down the middle works."
    },
    {
        id: 'rhombus',
        path: [{ c: 5, r: 3 }, { c: 8, r: 5 }, { c: 5, r: 7 }, { c: 2, r: 5 }],
        validLines: [
            [{ c: 5, r: 3 }, { c: 5, r: 7 }], [{ c: 5, r: 2 }, { c: 5, r: 8 }], [{ c: 5, r: 1 }, { c: 5, r: 9 }], // vertical
            [{ c: 2, r: 5 }, { c: 8, r: 5 }], [{ c: 1, r: 5 }, { c: 9, r: 5 }], // horizontal
            [{ c: 5, r: 0 }, { c: 5, r: 10 }], [{ c: 0, r: 5 }, { c: 10, r: 5 }]
        ],
        solution: "A rhombus can be cut vertically across its highest/lowest points, or horizontally across its widest points."
    },
    {
        id: 'arrow',
        path: [{ c: 5, r: 1 }, { c: 9, r: 5 }, { c: 7, r: 5 }, { c: 7, r: 9 }, { c: 3, r: 9 }, { c: 3, r: 5 }, { c: 1, r: 5 }],
        validLines: [
            [{ c: 5, r: 1 }, { c: 5, r: 9 }], [{ c: 5, r: 0 }, { c: 5, r: 10 }]
        ],
        solution: "A vertical line from the tip of the arrow straight down cuts the arrow perfectly in half."
    },

    // 4 Hard
    {
        id: 'H-shape',
        path: [{ c: 2, r: 2 }, { c: 4, r: 2 }, { c: 4, r: 4 }, { c: 6, r: 4 }, { c: 6, r: 2 }, { c: 8, r: 2 }, { c: 8, r: 8 }, { c: 6, r: 8 }, { c: 6, r: 6 }, { c: 4, r: 6 }, { c: 4, r: 8 }, { c: 2, r: 8 }],
        validLines: [
            [{ c: 5, r: 2 }, { c: 5, r: 8 }], [{ c: 5, r: 1 }, { c: 5, r: 9 }], [{ c: 5, r: 0 }, { c: 5, r: 10 }], // vertical
            [{ c: 2, r: 5 }, { c: 8, r: 5 }], [{ c: 1, r: 5 }, { c: 9, r: 5 }], [{ c: 0, r: 5 }, { c: 10, r: 5 }]  // horizontal
        ],
        solution: "The letter 'H' can be folded perfectly across a vertical middle line OR a horizontal middle line."
    },
    {
        id: 'cross',
        path: [{ c: 4, r: 2 }, { c: 6, r: 2 }, { c: 6, r: 4 }, { c: 8, r: 4 }, { c: 8, r: 6 }, { c: 6, r: 6 }, { c: 6, r: 8 }, { c: 4, r: 8 }, { c: 4, r: 6 }, { c: 2, r: 6 }, { c: 2, r: 4 }, { c: 4, r: 4 }],
        validLines: [
            [{ c: 5, r: 2 }, { c: 5, r: 8 }], [{ c: 5, r: 0 }, { c: 5, r: 10 }], // vertical
            [{ c: 2, r: 5 }, { c: 8, r: 5 }], [{ c: 0, r: 5 }, { c: 10, r: 5 }], // horizontal
            [{ c: 2, r: 2 }, { c: 8, r: 8 }], [{ c: 0, r: 0 }, { c: 10, r: 10 }], // diag 1
            [{ c: 2, r: 8 }, { c: 8, r: 2 }], [{ c: 0, r: 10 }, { c: 10, r: 0 }]  // diag 2
        ],
        solution: "This cross shape (like a plus sign) has 4 lines of symmetry: vertical, horizontal, AND both diagonals!"
    },
    {
        id: 'shield',
        path: [{ c: 2, r: 2 }, { c: 8, r: 2 }, { c: 8, r: 5 }, { c: 5, r: 9 }, { c: 2, r: 5 }],
        validLines: [
            [{ c: 5, r: 2 }, { c: 5, r: 9 }], [{ c: 5, r: 1 }, { c: 5, r: 10 }], [{ c: 5, r: 0 }, { c: 5, r: 10 }]
        ],
        solution: "A vertical line directly down the middle acts as a perfect mirror for the shield."
    },
    {
        id: 'house',
        path: [{ c: 5, r: 1 }, { c: 8, r: 4 }, { c: 8, r: 8 }, { c: 2, r: 8 }, { c: 2, r: 4 }],
        validLines: [
            [{ c: 5, r: 1 }, { c: 5, r: 8 }], [{ c: 5, r: 0 }, { c: 5, r: 10 }], [{ c: 5, r: 1 }, { c: 5, r: 9 }]
        ],
        solution: "A vertical line from the roof peak straight down the middle of the house is its line of symmetry."
    }
];

const DrawLineOfSymmetry = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [userLine, setUserLine] = useState(null); // {c1, r1, c2, r2}
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPoint, setDragStartPoint] = useState(null);
    const [currentPointer, setCurrentPointer] = useState(null);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1200; // Adjust as needed
    const SKILL_NAME = "Fun with Symmetry - Draw Line of Symmetry";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const svgRef = useRef(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
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
        setSessionQuestions(SHAPES);

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
                setUserLine(previousAnswer.userLine);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setUserLine(null);
                setIsSubmitted(false);
                setIsCorrect(false);
                setIsDragging(false);
                setDragStartPoint(null);
                setCurrentPointer(null);
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
            setUserLine(null); // Reset line on new click
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
            // Valid end point
            setUserLine({
                c1: dragStartPoint.col, r1: dragStartPoint.row,
                c2: gridPos.col, r2: gridPos.row
            });
        }
        setIsDragging(false);
        setDragStartPoint(null);
        setCurrentPointer(null);
    };

    // Calculate line equation A*x + B*y + C = 0
    const getLineEq = (p1, p2) => {
        const A = p2.r - p1.r;
        const B = p1.c - p2.c;
        const C = p2.c * p1.r - p1.c * p2.r;
        // Normalize
        const norm = Math.sqrt(A * A + B * B);
        return { A: A / norm, B: B / norm, C: C / norm };
    };

    const areLinesSame = (eq1, eq2) => {
        // They should be parallel (cross product ~ 0) and same intercept
        // Because of normalization, they could be exact match or inverted
        const matchPos = Math.abs(eq1.A - eq2.A) < 0.05 && Math.abs(eq1.B - eq2.B) < 0.05 && Math.abs(eq1.C - eq2.C) < 0.05;
        const matchNeg = Math.abs(eq1.A + eq2.A) < 0.05 && Math.abs(eq1.B + eq2.B) < 0.05 && Math.abs(eq1.C + eq2.C) < 0.05;
        return matchPos || matchNeg;
    };

    const handleSubmit = () => {
        if (!userLine) return;
        const currentQuestion = sessionQuestions[qIndex];

        const userEq = getLineEq({ c: userLine.c1, r: userLine.r1 }, { c: userLine.c2, r: userLine.r2 });

        let isRight = false;
        // Check if userLine matches ANY of the valid lines
        for (const vline of currentQuestion.validLines) {
            const vEq = getLineEq(vline[0], vline[1]);
            if (areLinesSame(userEq, vEq)) {
                // Check if user line length is at least somewhat long to be meaningful
                const userLen = Math.sqrt(Math.pow(userLine.c2 - userLine.c1, 2) + Math.pow(userLine.r2 - userLine.r1, 2));
                if (userLen >= 2) {
                    isRight = true;
                    break;
                }
            }
        }

        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, userLine } }));

        if (isRight) {
            setFeedbackMessage("✨ Fantastic! That is a perfect line of symmetry! ✨");
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
            question_text: `Draw a line of symmetry for this shape.`,
            correct_answer: "Valid Symmetry Line",
            student_answer: isRight ? "Valid Symmetry Line" : "Invalid Line",
            is_correct: isRight,
            solution_text: currentQuestion.solution,
            time_spent_seconds: Math.round(timeSpent / 1000)
        }).catch(console.error);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setIsSubmitted(false);
            setIsCorrect(false);
            setUserLine(null);
            setShowExplanationModal(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId');
            if (userId && sessionId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect).length;
                await api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                    parameters: { skill_id: SKILL_ID, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed },
                    user_id: parseInt(userId, 10)
                });
                await api.finishSession(sessionId);
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
                dots.push(<circle key={`d${c}_${r}`} cx={x} cy={y} r={3} fill="#CBD5E1" />);
            }
        }
        return dots;
    };

    const renderPath = (pts, className, isDashed = false) => {
        if (!pts || pts.length === 0) return null;
        let d = `M ${getCoord(pts[0].c, pts[0].r).x} ${getCoord(pts[0].c, pts[0].r).y}`;
        for (let i = 1; i < pts.length; i++) {
            d += ` L ${getCoord(pts[i].c, pts[i].r).x} ${getCoord(pts[i].c, pts[i].r).y}`;
        }
        d += " Z";
        return <path d={d} className={className} strokeDasharray={isDashed ? "8,8" : "none"} />;
    };

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const total = TOTAL_QUESTIONS;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative flex justify-center items-center">
                    <button onClick={() => navigate(-1)} className="absolute top-8 right-8 px-6 py-3 bg-white/20 hover:bg-white/30 text-[#31326F] rounded-2xl font-bold text-lg transition-all flex items-center gap-2 z-50 border-2 border-[#31326F]/30 shadow-md backdrop-blur-sm"><X size={24} /> Back</button>
                    <div className="title-area"><h1 className="text-3xl font-bold text-[#31326F] pt-8">Symmetry Result</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 pt-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-normal text-[#31326F] mb-2">Drawing Complete! 🎉</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 gap-4 w-full max-w-lg mb-8">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0F7FA] text-center">
                                <span className="block text-xs font-bold uppercase tracking-widest text-[#0097A7] mb-1">Score</span>
                                <span className="text-4xl font-black text-[#31326F]">{score}/{total}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0F7FA] text-center">
                                <span className="block text-xs font-bold uppercase tracking-widest text-[#0097A7] mb-1">Time</span>
                                <span className="text-4xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                        </div>
                        <button className="px-12 py-4 rounded-2xl bg-[#0097A7] text-white font-bold text-xl shadow-lg hover:bg-[#00838F] transition-all flex border-b-4 border-[#006064] active:border-b-0 active:translate-y-1" onClick={() => navigate(-1)}>Back to Topics</button>
                    </div>
                </main>
            </div>
        );
    }

    const currentQuestion = sessionQuestions[qIndex];
    if (!currentQuestion) return <div>Loading...</div>;

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
                        <div className="w-full flex justify-center text-center pb-6">
                            <h2 className="text-xl md:text-2xl font-normal font-['Open_Sans'] text-[#31326F] px-4">
                                Draw the <span className="text-[#0097A7]">line of symmetry</span> on the shape!
                            </h2>
                        </div>

                        <div className="bg-slate-50 border-4 border-slate-200 rounded-3xl overflow-hidden relative touch-none select-none" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
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
                                {/* Render Shape */}
                                {renderPath(currentQuestion.path, "fill-[#E0F7FA] stroke-[#31326F] stroke-[4px] stroke-linejoin-round")}

                                {/* Render Grid Dots */}
                                {renderGrid()}

                                {/* User Line */}
                                {userLine && (
                                    <line
                                        x1={getCoord(userLine.c1, userLine.r1).x}
                                        y1={getCoord(userLine.c1, userLine.r1).y}
                                        x2={getCoord(userLine.c2, userLine.r2).x}
                                        y2={getCoord(userLine.c2, userLine.r2).y}
                                        stroke={isSubmitted ? (isCorrect ? "#10B981" : "#EF4444") : "#0097A7"}
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeDasharray="10,6"
                                    />
                                )}

                                {/* Dragging Rubberband */}
                                {isDragging && dragStartPoint && currentPointer && !userLine && (
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
                                    {isCorrect ? feedbackMessage : "Not quite! Check the explanation for a hint."}
                                </div>
                            </motion.div>
                        )}

                        {!isSubmitted && <span className="text-gray-400 font-bold italic mt-4 text-sm">Drag from one dot to another to draw a line.</span>}
                    </div>

                    {/* Tools Area */}
                    <div className="flex flex-col gap-4 w-full md:w-auto mt-4 md:mt-0 items-center justify-center bg-white/50 p-6 rounded-3xl border-2 border-gray-100 shadow-sm">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest hidden md:block">Tools</span>
                        <button
                            onClick={() => setUserLine(null)}
                            disabled={!userLine || isSubmitted}
                            className={`flex flex-col md:flex-row items-center gap-2 px-6 py-4 rounded-2xl font-bold shadow-sm transition-all
                                ${!userLine || isSubmitted ? 'bg-gray-100 text-gray-400 border border-gray-200 opacity-50 cursor-not-allowed' : 'bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] hover:bg-red-50 hover:scale-105 active:scale-95'}`}
                        >
                            <Trash2 size={24} /> <span className="hidden md:inline">Clear Line</span>
                        </button>

                        {isSubmitted && (
                            <button className="flex flex-col md:flex-row items-center gap-2 px-6 py-4 rounded-2xl font-bold shadow-sm bg-[#E0F7FA] text-[#0097A7] border-2 border-[#B2EBF2] hover:bg-[#B2EBF2] hover:scale-105 transition-all mt-4" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={24} /> <span className="hidden md:inline">Explanation</span>
                            </button>
                        )}
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={"Symmetry Line"} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar flex items-center justify-between px-8 py-4 bg-white border-t-2 border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] rounded-t-[2rem] relative z-20">
                <button className="bg-red-50 text-red-500 px-6 py-3 rounded-2xl border-2 border-red-100 font-bold hover:bg-red-100" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {qIndex > 0 && <button className="px-6 py-3 bg-gray-100 text-[#31326F] font-bold rounded-2xl hover:bg-gray-200" onClick={handlePrevious}>Previous</button>}
                    {isSubmitted ? (
                        <button className="px-8 py-3 bg-[#0097A7] text-white font-bold rounded-2xl flex border-b-4 border-[#006064] active:border-b-0 active:translate-y-1 hover:bg-[#00838F]" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="px-8 py-3 bg-[#00E676] text-white font-bold rounded-2xl flex border-b-4 border-[#00C853] active:border-b-0 active:translate-y-1 hover:bg-[#69F0AE] disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={!userLine}>Submit</button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default DrawLineOfSymmetry;

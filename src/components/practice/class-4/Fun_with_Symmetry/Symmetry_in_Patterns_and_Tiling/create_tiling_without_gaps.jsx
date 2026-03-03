import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Star, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import ExplanationModal from '../../../../ExplanationModal';
import FunWithSymmetryReportModal from '../FunWithSymmetryReportModal';
import '../FunWithSymmetry.css';

const CORRECT_MESSAGES = [
    "✨ You built the pattern perfectly! ✨",
    "🌟 Amazing tiling skills! 🌟",
    "🎉 Awesome! There are no gaps! 🎉",
    "✨ Fantastic puzzle solving! ✨",
    "🚀 Super! You're a master builder! 🚀"
];

const CreateTilingWithoutGaps = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);

    // Grid State: 4x3 grid of cells. Each cell holds a tile ID or null.
    // cell = { row, col, tileId }
    // tileOptions = { id, type, color, ... }
    const GRID_W = 4;
    const GRID_H = 3;
    const [grid, setGrid] = useState(Array(GRID_H).fill(null).map(() => Array(GRID_W).fill(null)));
    const [selectedTileId, setSelectedTileId] = useState(null); // Which option is active

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [showSolution, setShowSolution] = useState(false);

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1208; // Adjust as needed
    const SKILL_NAME = "Fun with Symmetry - Create Tiling";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // ----------------------------------------------------------------------
    // Tile Renderer
    // ----------------------------------------------------------------------
    const renderTile = (type) => {
        // SVG paths to fill a 100x100 box exactly without gaps, or with obvious gaps if wrong.
        const TILE_SIZE = 100;
        switch (type) {
            case 'square_blue':
                return <rect width={TILE_SIZE} height={TILE_SIZE} fill="#3B82F6" stroke="#2563EB" strokeWidth="2" />;
            case 'square_red':
                return <rect width={TILE_SIZE} height={TILE_SIZE} fill="#EF4444" stroke="#DC2626" strokeWidth="2" />;
            case 'triangle_tl': // Triangle top-left half
                return <polygon points={`0,0 ${TILE_SIZE},0 0,${TILE_SIZE}`} fill="#10B981" stroke="#059669" strokeWidth="2" />;
            case 'triangle_br': // Triangle bottom-right half
                return <polygon points={`0,${TILE_SIZE} ${TILE_SIZE},${TILE_SIZE} ${TILE_SIZE},0`} fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2" />;
            case 'circle_gap': // Circle (leaves gaps)
                return (
                    <g>
                        <rect width={TILE_SIZE} height={TILE_SIZE} fill="#F1F5F9" /> {/* gap bg */}
                        <circle cx={TILE_SIZE / 2} cy={TILE_SIZE / 2} r={TILE_SIZE / 2} fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
                    </g>
                );
            case 'plus_gap': // Plus shape (leaves gaps)
                return (
                    <g>
                        <rect width={TILE_SIZE} height={TILE_SIZE} fill="#F1F5F9" />
                        <path d={`M${TILE_SIZE * 0.3} 0 H${TILE_SIZE * 0.7} V${TILE_SIZE * 0.3} H${TILE_SIZE} V${TILE_SIZE * 0.7} H${TILE_SIZE * 0.7} V${TILE_SIZE} H${TILE_SIZE * 0.3} V${TILE_SIZE * 0.7} H0 V${TILE_SIZE * 0.3} H${TILE_SIZE * 0.3} Z`} fill="#EC4899" stroke="#DB2777" strokeWidth="2" />
                    </g>
                );
            case 'checker': // Base 2x2 checker inside the 100x100
                return (
                    <g>
                        <rect x="0" y="0" width={TILE_SIZE / 2} height={TILE_SIZE / 2} fill="#14B8A6" />
                        <rect x={TILE_SIZE / 2} y={TILE_SIZE / 2} width={TILE_SIZE / 2} height={TILE_SIZE / 2} fill="#14B8A6" />
                        <rect x={TILE_SIZE / 2} y="0" width={TILE_SIZE / 2} height={TILE_SIZE / 2} fill="#FDE047" />
                        <rect x="0" y={TILE_SIZE / 2} width={TILE_SIZE / 2} height={TILE_SIZE / 2} fill="#FDE047" />
                        <rect width={TILE_SIZE} height={TILE_SIZE} fill="none" stroke="#0F766E" strokeWidth="2" />
                    </g>
                );
            case 'stripes_h':
                return (
                    <g>
                        <rect x="0" y="0" width={TILE_SIZE} height={TILE_SIZE / 2} fill="#6366F1" />
                        <rect x="0" y={TILE_SIZE / 2} width={TILE_SIZE} height={TILE_SIZE / 2} fill="#A5B4FC" />
                        <rect width={TILE_SIZE} height={TILE_SIZE} fill="none" stroke="#4338CA" strokeWidth="2" />
                    </g>
                );
            case 'stripes_v':
                return (
                    <g>
                        <rect x="0" y="0" width={TILE_SIZE / 2} height={TILE_SIZE} fill="#F43F5E" />
                        <rect x={TILE_SIZE / 2} y="0" width={TILE_SIZE / 2} height={TILE_SIZE} fill="#FDA4AF" />
                        <rect width={TILE_SIZE} height={TILE_SIZE} fill="none" stroke="#E11D48" strokeWidth="2" />
                    </g>
                );
            case 'diamond_base': // Fills completely using triangles
                return (
                    <g>
                        <polygon points={`${TILE_SIZE / 2},0 ${TILE_SIZE},${TILE_SIZE / 2} ${TILE_SIZE / 2},${TILE_SIZE} 0,${TILE_SIZE / 2}`} fill="#06B6D4" stroke="#0891B2" strokeWidth="2" />
                        {/* Corners to fill grid exactly - making it a square tile with diamond in middle */}
                        <polygon points={`0,0 ${TILE_SIZE / 2},0 0,${TILE_SIZE / 2}`} fill="#0891B2" />
                        <polygon points={`${TILE_SIZE},0 ${TILE_SIZE / 2},0 ${TILE_SIZE},${TILE_SIZE / 2}`} fill="#0891B2" />
                        <polygon points={`0,${TILE_SIZE} 0,${TILE_SIZE / 2} ${TILE_SIZE / 2},${TILE_SIZE}`} fill="#0891B2" />
                        <polygon points={`${TILE_SIZE},${TILE_SIZE} ${TILE_SIZE},${TILE_SIZE / 2} ${TILE_SIZE / 2},${TILE_SIZE}`} fill="#0891B2" />
                    </g>
                );
            case 'none':
                return null;
            default:
                return null;
        }
    };

    // Helper to evaluate if a grid pattern is "valid" tiling
    // We check if it matches the target pattern type roughly.
    const evaluateGrid = (currentGrid, patternType) => {
        // Are any cells empty?
        for (let r = 0; r < GRID_H; r++) {
            for (let c = 0; c < GRID_W; c++) {
                if (!currentGrid[r][c]) return { correct: false, reason: "You missed some spots! Fill the whole grid." };
            }
        }

        switch (patternType) {
            case 'solid':
                // All must be same square
                const first = currentGrid[0][0];
                if (!first.startsWith('square')) return { correct: false, reason: "A solid tiling needs square tiles." };
                for (let r = 0; r < GRID_H; r++) {
                    for (let c = 0; c < GRID_W; c++) {
                        if (currentGrid[r][c] !== first) return { correct: false, reason: "Make sure all tiles are the same for a solid floor." };
                    }
                }
                return { correct: true };

            case 'checker_manual':
                // Alternating squares
                if (!currentGrid[0][0].startsWith('square_')) return { correct: false, reason: "Wait, checkerboards are made of squares!" };
                const t1 = currentGrid[0][0];
                const t2 = currentGrid[0][1];
                if (t1 === t2) return { correct: false, reason: "Checkerboards need alternating colors." };
                for (let r = 0; r < GRID_H; r++) {
                    for (let c = 0; c < GRID_W; c++) {
                        const expected = (r + c) % 2 === 0 ? t1 : t2;
                        if (currentGrid[r][c] !== expected) return { correct: false, reason: "The checkerboard pattern broke! Colors must alternate every step." };
                    }
                }
                return { correct: true };

            case 'diag_triangles':
                // Making squares using two triangles.
                // Every cell MUST be either triangle_tl or triangle_br.
                // Wait, if they place triangle_tl next to triangle_tl, it forms gaps at boundaries IF not careful, but our SVG fills the cell.
                // For this game, let's say a cell must be built using the correct tile.
                // Let's rely on simple repeating logic: they just need to use 'checker', 'stripes_h', etc correctly.
                break;

            case 'stripes_h':
                // All tiles must be stripes_h
                for (let r = 0; r < GRID_H; r++) {
                    for (let c = 0; c < GRID_W; c++) {
                        if (currentGrid[r][c] !== 'stripes_h') return { correct: false, reason: "Use only the horizontal stripe tiles to make a striped wall." };
                    }
                }
                return { correct: true };

            case 'checker_tile':
                for (let r = 0; r < GRID_H; r++) {
                    for (let c = 0; c < GRID_W; c++) {
                        if (currentGrid[r][c] !== 'checker') return { correct: false, reason: "Use only the checker tiles." };
                    }
                }
                return { correct: true };

            case 'diamond_floor':
                for (let r = 0; r < GRID_H; r++) {
                    for (let c = 0; c < GRID_W; c++) {
                        if (currentGrid[r][c] !== 'diamond_base') return { correct: false, reason: "Use the diamond tiles." };
                    }
                }
                return { correct: true };

            case 'vertical_lines':
                for (let r = 0; r < GRID_H; r++) {
                    for (let c = 0; c < GRID_W; c++) {
                        if (currentGrid[r][c] !== 'stripes_v') return { correct: false, reason: "Oops, we needed vertical lines." };
                    }
                }
                return { correct: true };

            case 'gap_fail': // This shouldn't be the target, it's just checking they didn't use gap tiles
                for (let r = 0; r < GRID_H; r++) {
                    for (let c = 0; c < GRID_W; c++) {
                        if (currentGrid[r][c].includes('gap')) return { correct: false, reason: "Oh no! There are gaps in the floor. Tiling must have NO gaps." };
                    }
                }
                break;
        }

        // Generic checks if not caught above
        for (let r = 0; r < GRID_H; r++) {
            for (let c = 0; c < GRID_W; c++) {
                if (currentGrid[r][c].includes('gap')) return { correct: false, reason: "Oh no! There are gaps in the floor between shapes. Tiling must have NO gaps." };
            }
        }

        // If it's a specific simple target pattern
        if (patternType === 'solid') {
            const first = currentGrid[0][0];
            for (let r = 0; r < GRID_H; r++) for (let c = 0; c < GRID_W; c++) if (currentGrid[r][c] !== first) return { correct: false, reason: "Make it solid." };
            return { correct: true };
        }

        return { correct: true };
    };

    const QUESTIONS = [
        // Easy
        {
            instruction: "Fill the floor with ONE solid color without any gaps.",
            targetPattern: "solid",
            tools: ['square_blue', 'square_red', 'circle_gap'],
            solution: "A circle leaves empty white space in the corners! Squares fit together perfectly with no gaps."
        },
        {
            instruction: "Create a wall with perfectly horizontal stripes.",
            targetPattern: "stripes_h",
            tools: ['stripes_v', 'stripes_h', 'plus_gap'],
            solution: "You just needed to repeat the horizontal stripe tile everywhere. The 'plus' shape leaves big gaps!"
        },
        {
            instruction: "Create a checkerboard floor using ONLY the checker tile.",
            targetPattern: "checker_tile",
            tools: ['circle_gap', 'checker', 'stripes_v'],
            solution: "The checker tile repeats itself to create a perfect alternating grid without gaps."
        },

        // Medium
        {
            instruction: "Make a red and blue checkerboard floor manually using the two square tiles.",
            targetPattern: "checker_manual",
            tools: ['square_blue', 'square_red', 'plus_gap'],
            solution: "To make a checkerboard, the colors must alternate on every single step both across and down."
        },
        {
            instruction: "Tile the floor giving it a diamond pattern. No gaps allowed!",
            targetPattern: "diamond_floor",
            tools: ['circle_gap', 'diamond_base', 'square_blue'],
            solution: "The diamond tile has colored corners to ensure that when placed next to each other, they fill the space completely."
        },
        {
            instruction: "Build a fence with vertical lines.",
            targetPattern: "vertical_lines",
            tools: ['stripes_h', 'stripes_v', 'checker'],
            solution: "Repeating the vertical line tile creates long uninterrupted lines up and down the wall."
        },

        // Hard
        {
            instruction: "Try to make a solid red floor. Watch out for gap tiles!",
            targetPattern: "solid",
            tools: ['plus_gap', 'circle_gap', 'square_red'],
            solution: "Only shapes that can interlock perfectly, like squares, can tile a plane without gaps. Circles and pluses always leave holes unless combined with other specific shapes!"
        },
        {
            instruction: "Create a solid blue floor. Don't leave any holes!",
            targetPattern: "solid",
            tools: ['square_blue', 'circle_gap', 'diamond_base'],
            solution: "The solid square is the only one that makes a solid floor here."
        },
        {
            instruction: "Another horizontal stripes challenge!",
            targetPattern: "stripes_h",
            tools: ['stripes_h', 'checker', 'plus_gap'],
            solution: "Just repeat the horizontal tile!"
        },
        {
            instruction: "Make a checkerboard. Remember, alternating colors!",
            targetPattern: "checker_manual",
            tools: ['square_blue', 'square_red'],
            solution: "Red, Blue, Red, Blue on one row... then Blue, Red, Blue, Red on the next row!"
        }
    ];

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
            const qData = sessionQuestions[qIndex];
            setCurrentQuestion(qData);
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setGrid(previousAnswer.userGrid);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setGrid(Array(GRID_H).fill(null).map(() => Array(GRID_W).fill(null)));
                setIsSubmitted(false);
                setIsCorrect(false);
                setSelectedTileId(null);
                setShowSolution(false);
            }
        }
    }, [qIndex, sessionQuestions]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleGridClick = (r, c) => {
        if (isSubmitted || !selectedTileId) return;

        const newGrid = [...grid];
        newGrid[r] = [...newGrid[r]];

        // Toggle removal if clicking with same tool
        if (newGrid[r][c] === selectedTileId) {
            newGrid[r][c] = null;
        } else {
            newGrid[r][c] = selectedTileId;
        }

        setGrid(newGrid);
    };

    const clearGrid = () => {
        setGrid(Array(GRID_H).fill(null).map(() => Array(GRID_W).fill(null)));
    };

    const isGridEmpty = () => {
        return grid.every(row => row.every(cell => cell === null));
    };

    const fillGridAuto = () => {
        if (!selectedTileId) return;
        const newGrid = Array(GRID_H).fill(null).map(() => Array(GRID_W).fill(selectedTileId));
        setGrid(newGrid);
    };

    // Solution generator for the solution modal
    const generateSolutionGrid = (patternType) => {
        const sGrid = Array(GRID_H).fill(null).map(() => Array(GRID_W).fill(null));
        switch (patternType) {
            case 'solid':
                // Use first non gap tool
                const solidTool = currentQuestion.tools.find(t => t.includes('square'));
                for (let r = 0; r < GRID_H; r++) for (let c = 0; c < GRID_W; c++) sGrid[r][c] = solidTool;
                break;
            case 'stripes_h':
                for (let r = 0; r < GRID_H; r++) for (let c = 0; c < GRID_W; c++) sGrid[r][c] = 'stripes_h';
                break;
            case 'checker_tile':
                for (let r = 0; r < GRID_H; r++) for (let c = 0; c < GRID_W; c++) sGrid[r][c] = 'checker';
                break;
            case 'diamond_floor':
                for (let r = 0; r < GRID_H; r++) for (let c = 0; c < GRID_W; c++) sGrid[r][c] = 'diamond_base';
                break;
            case 'vertical_lines':
                for (let r = 0; r < GRID_H; r++) for (let c = 0; c < GRID_W; c++) sGrid[r][c] = 'stripes_v';
                break;
            case 'checker_manual':
                const t1 = currentQuestion.tools[0];
                const t2 = currentQuestion.tools[1];
                for (let r = 0; r < GRID_H; r++) {
                    for (let c = 0; c < GRID_W; c++) {
                        sGrid[r][c] = (r + c) % 2 === 0 ? t1 : t2;
                    }
                }
                break;
        }
        return sGrid;
    }

    const handleSubmit = () => {
        if (!currentQuestion) return;

        const evaluation = evaluateGrid(grid, currentQuestion.targetPattern);
        const isRight = evaluation.correct;

        setIsCorrect(isRight);
        setIsSubmitted(true);
        setGrid([...grid]); // Force update
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, userGrid: grid } }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setFeedbackMessage(evaluation.reason);
            // Don't auto-show modal, let them see the "See Solution" button
        }

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;

        const studentGridStr = grid.map(r => r.map(c => c ? c.split('_')[0] : 'none').join(',')).join(';');

        api.recordAttempt({
            user_id: parseInt(userId, 10),
            session_id: sessionId,
            skill_id: SKILL_ID,
            difficulty_level: qIndex < 3 ? 'Easy' : (qIndex < 6 ? 'Medium' : 'Hard'),
            question_text: currentQuestion.instruction,
            correct_answer: currentQuestion.targetPattern,
            student_answer: studentGridStr,
            is_correct: isRight,
            solution_text: currentQuestion.solution + " | Failure Reason: " + (!isRight ? evaluation.reason : ""),
            time_spent_seconds: Math.round(timeSpent / 1000)
        }).catch(console.error);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setIsSubmitted(false);
            setIsCorrect(false);
            setSelectedTileId(null);
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

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const total = TOTAL_QUESTIONS;

        return (
            <div className="junior-practice-page symmetry-theme" style={{ fontFamily: '"Open Sans", sans-serif', minHeight: '100vh' }}>
                <FunWithSymmetryReportModal
                    isOpen={showResults}
                    stats={{
                        timeTaken: formatTime(timeElapsed),
                        correctAnswers: score,
                        totalQuestions: total
                    }}
                    onContinue={() => navigate(-1)}
                />
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    const solutionGrid = generateSolutionGrid(currentQuestion.targetPattern);

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
                <div className="w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-xl border-4 border-[#E0F7FA] p-6 lg:p-8 flex flex-col xl:flex-row gap-8 items-center xl:items-start justify-center min-h-[500px]">

                    {/* Tools Panel */}
                    <div className="flex flex-col gap-6 w-full xl:w-[280px] shrink-0 bg-[#F8FAFC] p-6 rounded-3xl border-2 border-slate-200">
                        <div className="text-center">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Available Tiles</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-4">
                            {currentQuestion.tools.map((tileId) => {
                                const isSelected = selectedTileId === tileId;
                                return (
                                    <button
                                        key={tileId}
                                        disabled={isSubmitted}
                                        onClick={() => setSelectedTileId(tileId)}
                                        className={`rounded-2xl transition-all aspect-square p-2 bg-white flex items-center justify-center relative overflow-hidden
                                            ${isSelected ? 'ring-4 ring-[#0097A7] shadow-md scale-105' : 'border-2 border-slate-200 hover:border-[#0097A7]/50 hover:bg-[#E0F7FA]'}
                                            ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}
                                        `}
                                    >
                                        <svg viewBox="0 0 100 100" className="w-full h-full">
                                            {renderTile(tileId)}
                                        </svg>
                                    </button>
                                );
                            })}
                        </div>

                        {!isSubmitted && (
                            <div className="flex flex-col gap-3 mt-4">
                                <button className="py-3 px-4 rounded-xl font-bold bg-[#E0F7FA] text-[#0097A7] hover:bg-[#B2EBF2] border-2 border-[#B2EBF2] transition-colors" onClick={fillGridAuto} disabled={!selectedTileId}>Fill All With Selected</button>
                                <button className="py-3 px-4 rounded-xl font-bold bg-[#FFF1F2] text-[#F43F5E] hover:bg-[#FFE4E6] border-2 border-[#FFE4E6] flex items-center justify-center gap-2 transition-colors" onClick={clearGrid} disabled={isGridEmpty()}><RotateCcw size={18} /> Clear Grid</button>
                            </div>
                        )}

                        {isSubmitted && !isCorrect && (
                            <div className="flex flex-col gap-3 mt-4">
                                <button className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${showSolution ? 'bg-green-100 text-green-700 border-2 border-green-200' : 'bg-[#E0F7FA] text-[#0097A7] border-2 border-[#B2EBF2] hover:bg-[#B2EBF2]'}`} onClick={() => setShowSolution(true)}><Eye size={18} /> {showSolution ? "Showing Solution" : "Show Solution"}</button>
                            </div>
                        )}
                    </div>

                    {/* Canvas Area */}
                    <div className="w-full flex flex-col items-center w-full">
                        <div className="w-full flex justify-center text-center pb-6">
                            <h2 className="text-xl md:text-2xl font-normal font-['Open_Sans'] text-[#31326F] max-w-2xl leading-snug px-4">
                                {currentQuestion.instruction}
                            </h2>
                        </div>

                        {/* Grid container */}
                        <div className="bg-slate-100 p-2 md:p-4 border-[4px] md:border-[6px] border-slate-300 rounded-2xl md:rounded-3xl shadow-inner relative overflow-hidden w-full max-w-[600px]">

                            {/* The Grid */}
                            <div
                                className="grid gap-[2px] bg-slate-300 transition-opacity duration-300 w-full"
                                style={{
                                    gridTemplateColumns: `repeat(${GRID_W}, 1fr)`,
                                    gridTemplateRows: `repeat(${GRID_H}, 1fr)`,
                                    aspectRatio: `${GRID_W}/${GRID_H}`,
                                    opacity: showSolution ? 0.2 : 1 // Dim user grid if showing solution overlay
                                }}
                            >
                                {grid.map((row, r) => (
                                    row.map((cellTile, c) => (
                                        <div
                                            key={`${r}-${c}`}
                                            className={`bg-[#F1F5F9] relative flex items-center justify-center cursor-pointer transition-colors duration-200 overflow-hidden
                                                ${!isSubmitted && selectedTileId ? 'hover:bg-[#E0F2FE]' : ''}
                                            `}
                                            onClick={() => handleGridClick(r, c)}
                                            style={{ aspectRatio: '1/1' }}
                                        >
                                            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                                                {/* Draw the "gap" background explicitely if the tile leaves gaps, else just draw the tile */}
                                                {cellTile ? renderTile(cellTile) : (
                                                    // Placeholder dots if empty
                                                    <circle cx="50" cy="50" r="4" fill="#CBD5E1" />
                                                )}
                                            </svg>
                                        </div>
                                    ))
                                ))}
                            </div>

                            {/* Solution Overlay */}
                            {isSubmitted && showSolution && (
                                <div className="absolute inset-4 grid gap-[2px] pointer-events-none z-10" style={{
                                    gridTemplateColumns: `repeat(${GRID_W}, 1fr)`,
                                    gridTemplateRows: `repeat(${GRID_H}, 1fr)`,
                                }}>
                                    {solutionGrid.map((row, r) => (
                                        row.map((cellTile, c) => (
                                            <div key={`sol-${r}-${c}`} className="relative border-2 border-green-400 bg-white shadow-lg overflow-hidden animate-pulse">
                                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                                    {renderTile(cellTile)}
                                                </svg>
                                            </div>
                                        ))
                                    ))}
                                </div>
                            )}

                        </div>

                        {isSubmitted && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full mt-6">
                                <div className={`text-xl font-bold px-8 py-4 rounded-full inline-block ${isCorrect ? 'text-green-700 bg-green-100 border-2 border-green-200 shadow-sm' : 'text-red-700 bg-red-100 border-2 border-red-200 shadow-sm'}`}>
                                    {isCorrect ? feedbackMessage : feedbackMessage}
                                </div>
                            </motion.div>
                        )}
                        {!isSubmitted && !selectedTileId && (
                            <div className="text-[#0097A7] font-bold mt-4 animate-bounce">
                                Select a tile from the left first!
                            </div>
                        )}
                    </div>

                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={"See solution overlay."} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar flex items-center justify-between px-8 py-4 bg-white border-t-2 border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] rounded-t-[2rem] relative z-20">
                <button className="bg-red-50 text-red-500 px-6 py-3 rounded-2xl border-2 border-red-100 font-bold hover:bg-red-100" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {qIndex > 0 && <button className="px-6 py-3 bg-gray-100 text-[#31326F] font-bold rounded-2xl hover:bg-gray-200" onClick={handlePrevious}>Previous</button>}
                    {isSubmitted ? (
                        <button className="px-8 py-3 bg-[#0097A7] text-white font-bold rounded-2xl flex border-b-4 border-[#006064] active:border-b-0 active:translate-y-1 hover:bg-[#00838F]" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="px-8 py-3 bg-[#00E676] text-white font-bold rounded-2xl flex border-b-4 border-[#00C853] active:border-b-0 active:translate-y-1 hover:bg-[#69F0AE] disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={isGridEmpty()}>Submit</button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default CreateTilingWithoutGaps;

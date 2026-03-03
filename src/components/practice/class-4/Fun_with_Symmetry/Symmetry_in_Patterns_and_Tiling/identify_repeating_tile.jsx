import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import ExplanationModal from '../../../../ExplanationModal';
import '../FunWithSymmetry.css';

const CORRECT_MESSAGES = [
    "✨ You found the base tile perfectly! ✨",
    "🌟 Perfect pattern matching! 🌟",
    "🎉 Awesome! That's exactly what repeats! 🎉",
    "✨ Fantastic eye for design! ✨",
    "🚀 Super! You're a tiling expert! 🚀"
];

const IdentifyRepeatingTile = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1207; // Adjust as needed
    const SKILL_NAME = "Fun with Symmetry - Identify Tile";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // ----------------------------------------------------------------------
    // Pattern Generators
    // ----------------------------------------------------------------------
    const renderPattern = (type, colors, scale = 1) => {
        // Tiling patterns. We render a grid of a base tile.
        // Base tiles are 100x100
        const TILE_SIZE = 100 * scale;
        const GRID_W = 4;
        const GRID_H = 3;

        let defs = null;
        let bgPath = null;
        let fgPaths = [];

        switch (type) {
            case 'checkerboard':
                bgPath = <rect width={TILE_SIZE} height={TILE_SIZE} fill={colors[0]} />;
                fgPaths = [
                    <rect x="0" y="0" width={TILE_SIZE / 2} height={TILE_SIZE / 2} fill={colors[1]} key="1" />,
                    <rect x={TILE_SIZE / 2} y={TILE_SIZE / 2} width={TILE_SIZE / 2} height={TILE_SIZE / 2} fill={colors[1]} key="2" />
                ];
                break;
            case 'stripes':
                bgPath = <rect width={TILE_SIZE} height={TILE_SIZE} fill={colors[0]} />;
                fgPaths = [
                    <rect x="0" y={TILE_SIZE / 2} width={TILE_SIZE} height={TILE_SIZE / 2} fill={colors[1]} key="1" />
                ];
                break;
            case 'diamonds':
                bgPath = <rect width={TILE_SIZE} height={TILE_SIZE} fill={colors[0]} />;
                fgPaths = [
                    <polygon points={`${TILE_SIZE / 2},0 ${TILE_SIZE},${TILE_SIZE / 2} ${TILE_SIZE / 2},${TILE_SIZE} 0,${TILE_SIZE / 2}`} fill={colors[1]} key="1" />
                ];
                break;
            case 'circles':
                bgPath = <rect width={TILE_SIZE} height={TILE_SIZE} fill={colors[0]} />;
                fgPaths = [
                    <circle cx={TILE_SIZE / 2} cy={TILE_SIZE / 2} r={TILE_SIZE * 0.4} fill={colors[1]} key="1" />
                ];
                break;
            case 'triangles':
                bgPath = <rect width={TILE_SIZE} height={TILE_SIZE} fill={colors[0]} />;
                fgPaths = [
                    <polygon points={`0,0 ${TILE_SIZE},0 ${TILE_SIZE / 2},${TILE_SIZE / 2}`} fill={colors[1]} key="1" />,
                    <polygon points={`0,${TILE_SIZE} ${TILE_SIZE},${TILE_SIZE} ${TILE_SIZE / 2},${TILE_SIZE / 2}`} fill={colors[1]} key="2" />
                ];
                break;
            case 'stars':
                bgPath = <rect width={TILE_SIZE} height={TILE_SIZE} fill={colors[0]} />;
                // 5-point star path roughly
                fgPaths = [
                    <polygon points={`${TILE_SIZE * 0.5},${TILE_SIZE * 0.1} ${TILE_SIZE * 0.62},${TILE_SIZE * 0.35} ${TILE_SIZE * 0.9},${TILE_SIZE * 0.35} ${TILE_SIZE * 0.68},${TILE_SIZE * 0.55} ${TILE_SIZE * 0.78},${TILE_SIZE * 0.82} ${TILE_SIZE * 0.5},${TILE_SIZE * 0.65} ${TILE_SIZE * 0.22},${TILE_SIZE * 0.82} ${TILE_SIZE * 0.32},${TILE_SIZE * 0.55} ${TILE_SIZE * 0.1},${TILE_SIZE * 0.35} ${TILE_SIZE * 0.38},${TILE_SIZE * 0.35}`} fill={colors[1]} key="1" />
                ];
                break;
            case 'arrows':
                bgPath = <rect width={TILE_SIZE} height={TILE_SIZE} fill={colors[0]} />;
                fgPaths = [
                    <polygon points={`0,${TILE_SIZE * 0.3} ${TILE_SIZE * 0.7},${TILE_SIZE * 0.3} ${TILE_SIZE * 0.7},${TILE_SIZE * 0.1} ${TILE_SIZE},${TILE_SIZE * 0.5} ${TILE_SIZE * 0.7},${TILE_SIZE * 0.9} ${TILE_SIZE * 0.7},${TILE_SIZE * 0.7} 0,${TILE_SIZE * 0.7}`} fill={colors[1]} key="1" />
                ];
                break;
            case 'hexagons':
                bgPath = <rect width={TILE_SIZE} height={TILE_SIZE} fill={colors[0]} />;
                fgPaths = [
                    <polygon points={`${TILE_SIZE * 0.2},${TILE_SIZE * 0.1} ${TILE_SIZE * 0.8},${TILE_SIZE * 0.1} ${TILE_SIZE},${TILE_SIZE * 0.5} ${TILE_SIZE * 0.8},${TILE_SIZE * 0.9} ${TILE_SIZE * 0.2},${TILE_SIZE * 0.9} 0,${TILE_SIZE * 0.5}`} fill={colors[1]} key="1" />
                ];
                break;
            // Mixed tiles for wrong options
            case 'mix1': // circles and squares
                bgPath = <rect width={TILE_SIZE} height={TILE_SIZE} fill={colors[0]} />;
                fgPaths = [
                    <circle cx={TILE_SIZE / 4} cy={TILE_SIZE / 4} r={TILE_SIZE * 0.2} fill={colors[1]} key="1" />,
                    <rect x={TILE_SIZE / 2} y={TILE_SIZE / 2} width={TILE_SIZE / 2} height={TILE_SIZE / 2} fill={colors[1]} key="2" />
                ];
                break;
            case 'mix2': // vertical stripes
                bgPath = <rect width={TILE_SIZE} height={TILE_SIZE} fill={colors[0]} />;
                fgPaths = [
                    <rect x={TILE_SIZE / 2} y="0" width={TILE_SIZE / 2} height={TILE_SIZE} fill={colors[1]} key="1" />
                ];
                break;
        }

        const tileContent = (
            <svg viewBox={`0 0 ${TILE_SIZE} ${TILE_SIZE}`} width="100%" height="100%">
                {bgPath}
                {fgPaths}
            </svg>
        );

        if (scale === 1) {
            // This is rendering the full pattern grid
            const gridItems = [];
            for (let r = 0; r < GRID_H; r++) {
                for (let c = 0; c < GRID_W; c++) {
                    gridItems.push(
                        <g transform={`translate(${c * TILE_SIZE}, ${r * TILE_SIZE})`} key={`${r}-${c}`}>
                            {bgPath}
                            {fgPaths}
                        </g>
                    );
                }
            }
            return (
                <svg viewBox={`0 0 ${TILE_SIZE * GRID_W} ${TILE_SIZE * GRID_H}`} className="w-full h-full drop-shadow-md rounded-2xl overflow-hidden">
                    {gridItems}
                </svg>
            );
        } else {
            // Rendering just a single tile for the options
            return (
                <div className="w-full h-full p-2">
                    <div className="w-full h-full rounded-xl overflow-hidden shadow-inner border-2 border-slate-200">
                        {tileContent}
                    </div>
                </div>
            );
        }
    };

    const generateQuestions = () => {
        const types = ['checkerboard', 'stripes', 'diamonds', 'circles', 'triangles', 'stars', 'arrows', 'hexagons', 'mix1', 'mix2'];
        const palettePairs = [
            ['#FEF08A', '#EF4444'], // Yellow/Red
            ['#BFDBFE', '#3B82F6'], // Light/Dark Blue
            ['#A7F3D0', '#10B981'], // Green
            ['#DDD6FE', '#8B5CF6'], // Purple
            ['#FDE68A', '#F59E0B'], // Orange / Amber
            ['#1E293B', '#FCD34D'], // Night sky stars
            ['#FEE2E2', '#EF4444'], // Red 
            ['#CCFBF1', '#14B8A6'], // Teal
            ['#F3E8FF', '#9333EA'], // Deep Purple
            ['#FFEDD5', '#EA580C'], // Orange/Brown
        ];

        const questions = [];

        // Generate exactly 10 questions
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            // Pick random target type
            const targetType = types[Math.floor(Math.random() * types.length)];
            // Pick random color palette
            const colors = palettePairs[Math.floor(Math.random() * palettePairs.length)];

            // Build options (1 correct, 3 randomly chosen incorrect)
            const wrongOptions = types.filter(t => t !== targetType).sort(() => 0.5 - Math.random()).slice(0, 3);
            const options = [...wrongOptions, targetType].sort(() => 0.5 - Math.random());
            const correctIndex = options.indexOf(targetType);

            // Dynamically construct solution string based on chosen tile
            let solution = "";
            switch (targetType) {
                case 'checkerboard': solution = "The pattern is made of small squares alternating colors, matching the 2x2 grid tile."; break;
                case 'stripes': solution = "The base tile has horizontal stripes splitting the colors."; break;
                case 'diamonds': solution = "The repeating shape is a diamond (rhombus) in the center."; break;
                case 'circles': solution = "The exact repeating tile is one square with one circle inside it."; break;
                case 'triangles': solution = "It has two triangles pointing towards each other from top and bottom."; break;
                case 'stars': solution = "The pattern repeats a 5-pointed star over and over."; break;
                case 'arrows': solution = "The base tile is a single arrow pointing right."; break;
                case 'hexagons': solution = "The repeating shape has 6 sides (a hexagon)."; break;
                case 'mix1': solution = "It repeats a tile that has BOTH a small circle and a small square."; break;
                case 'mix2': solution = "The stripes go vertically, so the base tile must have colors split vertically."; break;
                default: solution = "This tile matches the exact recurring element in the overall grid.";
            }

            questions.push({
                type: targetType,
                colors: colors,
                options: options,
                correctIndex: correctIndex,
                solution: solution
            });
        }

        return questions;
    };

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
        setSessionQuestions(generateQuestions());

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
                setSelectedOption(previousAnswer.selected);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setSelectedOption(null);
                setIsSubmitted(false);
                setIsCorrect(false);
            }
        }
    }, [qIndex, sessionQuestions]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (val) => {
        if (isSubmitted) return;
        setSelectedOption(val);
    };

    const handleSubmit = () => {
        if (selectedOption === null || !currentQuestion) return;

        const isRight = selectedOption === currentQuestion.correctIndex;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
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
            question_text: `Which single tile repeats to make this pattern?`,
            correct_answer: "Option " + (currentQuestion.correctIndex + 1),
            student_answer: "Option " + (selectedOption + 1),
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
            setSelectedOption(null);
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
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative flex justify-center items-center">
                    <button onClick={() => navigate(-1)} className="absolute top-8 right-8 px-6 py-3 bg-white/20 hover:bg-white/30 text-[#31326F] rounded-2xl font-bold text-lg transition-all flex items-center gap-2 z-50 border-2 border-[#31326F]/30 shadow-md backdrop-blur-sm"><X size={24} /> Back</button>
                    <div className="title-area"><h1 className="text-3xl font-bold text-[#31326F] pt-8">Patterns Result</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 pt-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-normal text-[#31326F] mb-2">Practice Complete! 🎉</h2>
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
                <div className="w-full max-w-5xl mx-auto my-4 md:my-8 bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-xl border-4 border-[#E0F7FA] p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-8 items-center justify-start h-auto min-h-[400px]">

                    <div className="w-full flex justify-center text-center pb-2">
                        <h2 className="text-xl md:text-2xl font-normal font-['Open_Sans'] text-[#31326F] px-4">
                            Which <span className="text-[#0097A7]">single tile</span> created this pattern?
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 h-full">

                        {/* Pattern Area (Left Column) */}
                        <div className="w-full md:w-1/2 flex justify-center items-center">
                            <div className="w-full max-w-[10rem] md:max-w-[12rem] bg-slate-50 border-[6px] md:border-[8px] border-slate-300 rounded-2xl md:rounded-3xl p-2 shadow-inner aspect-[4/3] md:aspect-square flex items-center justify-center overflow-hidden relative">
                                {renderPattern(currentQuestion.type, currentQuestion.colors, 1)}
                                {/* Overlay Grid lines to help visualize the tiles if submitted */}
                                {isSubmitted && (
                                    <div className="absolute top-2 left-2 right-2 bottom-2 pointer-events-none" style={{
                                        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.7) 2px, transparent 2px), linear-gradient(to bottom, rgba(255,255,255,0.7) 2px, transparent 2px)',
                                        backgroundSize: '25% 33.333%', // 4 cols, 3 rows
                                        backgroundPosition: '0 0'
                                    }}></div>
                                )}
                            </div>
                        </div>

                        {/* Options & Feedback (Right Column) */}
                        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-4 md:gap-6">
                            <div className="grid grid-cols-2 gap-2 md:gap-4 justify-center items-center w-full max-w-[18rem] md:max-w-[16rem]">
                                {currentQuestion.options.map((optType, i) => {
                                    const isOptSelected = selectedOption === i;
                                    const isCorrectOpt = currentQuestion.correctIndex === i;

                                    let btnStyle = 'border-gray-200 hover:border-[#0097A7] hover:scale-105 hover:bg-[#E0F7FA]';
                                    if (!isSubmitted && isOptSelected) {
                                        btnStyle = 'border-[#0097A7] bg-[#E0F7FA] scale-105 shadow-md shadow-[#0097A7]/20 border-[4px] ring-2 ring-[#E0F7FA]';
                                    } else if (isSubmitted) {
                                        if (isCorrectOpt) {
                                            btnStyle = `border-green-500 bg-green-50 shadow-md shadow-green-500/20 scale-105 border-[4px] ring-2 ring-green-100`;
                                        } else if (isOptSelected && !isCorrectOpt) {
                                            btnStyle = 'border-red-500 bg-red-50 shadow-md shadow-red-500/20 border-[4px] scale-95 opacity-80';
                                        } else {
                                            btnStyle = 'border-gray-100 opacity-50 bg-white grayscale';
                                        }
                                    } else {
                                        btnStyle += ' border-[2px] md:border-[3px] bg-white text-[#31326F]';
                                    }

                                    return (
                                        <button
                                            key={i}
                                            disabled={isSubmitted}
                                            onClick={() => handleAnswer(i)}
                                            className={`rounded-xl md:rounded-2xl transition-all flex justify-center items-center w-full aspect-square ${btnStyle}`}
                                        >
                                            {renderPattern(optType, currentQuestion.colors, 0.5)}
                                        </button>
                                    );
                                })}
                            </div>

                            {isSubmitted && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full mt-2 mb-4 z-20 relative">
                                    <div className={`text-xl md:text-2xl font-bold px-4 py-3 md:px-6 md:py-4 rounded-full inline-block ${isCorrect ? 'text-green-700 bg-green-100 border-2 border-green-200 shadow-sm' : 'text-red-700 bg-red-100 border-2 border-red-200 shadow-sm'}`}>
                                        {isCorrect ? feedbackMessage : "Not quite! Look at the white grid lines to find the base tile."}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={"See exact repeating tile"} explanation={currentQuestion.solution + " (We added white lines to the big pattern to show exactly what the single tile is!)"} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar flex items-center justify-between px-8 py-4 bg-white border-t-2 border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] rounded-t-[2rem] relative z-20">
                <button className="bg-red-50 text-red-500 px-6 py-3 rounded-2xl border-2 border-red-100 font-bold hover:bg-red-100" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {qIndex > 0 && <button className="px-6 py-3 bg-gray-100 text-[#31326F] font-bold rounded-2xl hover:bg-gray-200" onClick={handlePrevious}>Previous</button>}
                    {isSubmitted ? (
                        <button className="px-8 py-3 bg-[#0097A7] text-white font-bold rounded-2xl flex border-b-4 border-[#006064] active:border-b-0 active:translate-y-1 hover:bg-[#00838F]" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="px-8 py-3 bg-[#00E676] text-white font-bold rounded-2xl flex border-b-4 border-[#00C853] active:border-b-0 active:translate-y-1 hover:bg-[#69F0AE] disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={selectedOption === null}>Submit</button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default IdentifyRepeatingTile;

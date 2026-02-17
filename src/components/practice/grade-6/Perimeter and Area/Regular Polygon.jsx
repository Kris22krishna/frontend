
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const RegularPolygonPractice = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [numSides, setNumSides] = useState(5); // Default Pentagon
    const [sideLength, setSideLength] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [timeElapsed, setTimeElapsed] = useState(0);

    const sessionId = useRef(null);
    const questionStartTime = useRef(Date.now());
    const answers = useRef({});

    const TOTAL_QUESTIONS = 10;
    const SKILL_ID = 6004;

    const POLYGONS = {
        5: { name: "Pentagon", color: "#F471B5" },
        6: { name: "Hexagon", color: "#4FB7B3" },
        8: { name: "Octagon", color: "#31326F" }
    };

    const CORRECT_MESSAGES = [
        "✨ Excellent! You're a polygon pro! ✨",
        "🌟 Perfection! Keep it up! 🌟",
        "🎉 Spot on! Great calculation! 🎉",
        "🚀 Fantastic work! 🚀"
    ];

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) sessionId.current = sess.session_id;
            }).catch(err => console.error("Failed to start session", err));
        }

        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        generateQuestion();
    }, [qIndex]);

    const generateQuestion = () => {
        // Randomly choose between Pentagon (5), Hexagon (6), Octagon (8)
        const sidesOptions = [5, 6, 8];
        const n = sidesOptions[Math.floor(Math.random() * sidesOptions.length)];
        const s = Math.floor(Math.random() * 12) + 3;

        setNumSides(n);
        setSideLength(s);
        setUserAnswer('');
        setIsSubmitted(false);
        setIsCorrect(false);
        setShowExplanation(false);
        questionStartTime.current = Date.now();
    };

    const getCorrectAnswer = () => {
        // Only implementing Perimeter for regular polygons as per typical Grade 6/NCERT
        // Area (using apothem) is usually Grade 8+ or specific cases.
        return numSides * sideLength;
    };

    const handleCheck = async () => {
        const correct = getCorrectAnswer();
        const userVal = parseFloat(userAnswer);
        const isRight = Math.abs(userVal - correct) < 0.1;

        setIsCorrect(isRight);
        setIsSubmitted(true);
        answers.current[qIndex] = isRight;

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanation(true);
        }

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && sessionId.current) {
            const timeTaken = (Date.now() - questionStartTime.current) / 1000;
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId.current,
                skill_id: SKILL_ID,
                question_text: `Find the perimeter of a regular ${POLYGONS[numSides].name} with side ${sideLength} cm`,
                correct_answer: String(correct),
                student_answer: String(userVal),
                is_correct: isRight,
                time_spent_seconds: Math.round(timeTaken)
            });
        }
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
        } else {
            if (sessionId.current) {
                await api.finishSession(sessionId.current);
            }
            navigate(-1);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Helper to generate polygon points
    const getPolygonPoints = (sides, radius, cx, cy) => {
        let points = "";
        for (let i = 0; i < sides; i++) {
            // Start from top (-PI/2)
            const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            points += `${x},${y} `;
        }
        return points;
    };

    return (
        <div className="min-h-screen bg-indigo-50 flex flex-col font-sans text-[#31326F]">
            {/* Minimal Header */}
            <header className="p-4 flex justify-between items-center max-w-4xl mx-auto w-full">
                <div className="text-gray-500 font-medium">Question {qIndex + 1}/{TOTAL_QUESTIONS}</div>
                <div className="text-xl font-bold bg-white px-4 py-2 rounded-full shadow-md border border-indigo-100">
                    ⏱️ {formatTime(timeElapsed)}
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-4 w-full">
                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden border border-indigo-100">
                    {/* Progress Bar */}
                    <div className="h-2 bg-indigo-50 w-full">
                        <div
                            className="h-full bg-[#4FB7B3] transition-all duration-500"
                            style={{ width: `${((qIndex) / TOTAL_QUESTIONS) * 100}%` }}
                        />
                    </div>

                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left Column: Question & Visualization */}
                        <div className="flex flex-col items-center gap-6">
                            <div className="text-center space-y-1">
                                <h2 className="text-2xl md:text-3xl font-black text-[#31326F]">
                                    Regular <span style={{ color: POLYGONS[numSides].color }}>{POLYGONS[numSides].name.toUpperCase()}</span>
                                </h2>
                                <p className="text-gray-500 text-base">
                                    Calculate the perimeter
                                </p>
                            </div>

                            <div className="relative w-full aspect-square max-w-[280px] bg-indigo-50/50 rounded-2xl p-4 flex items-center justify-center">
                                <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-lg">
                                    {(() => {
                                        const cx = 150;
                                        const cy = 150;
                                        const radius = 100;
                                        const points = getPolygonPoints(numSides, radius, cx, cy);

                                        // Calculate mid-point of first side for label
                                        // First point is at top (0, -r) relative to center
                                        const angle0 = -Math.PI / 2;
                                        const angle1 = (2 * Math.PI / numSides) - Math.PI / 2;

                                        const x0 = cx + radius * Math.cos(angle0);
                                        const y0 = cy + radius * Math.sin(angle0);
                                        const x1 = cx + radius * Math.cos(angle1);
                                        const y1 = cy + radius * Math.sin(angle1);

                                        const labelX = (x0 + x1) / 2;
                                        const labelY = (y0 + y1) / 2;

                                        // Offset label slightly outward
                                        const midAngle = (angle0 + angle1) / 2;
                                        const offsetX = labelX + 25 * Math.cos(midAngle);
                                        const offsetY = labelY + 25 * Math.sin(midAngle);

                                        return (
                                            <g>
                                                <polygon
                                                    points={points}
                                                    fill={`${POLYGONS[numSides].color}20`}
                                                    stroke={POLYGONS[numSides].color}
                                                    strokeWidth="3"
                                                />

                                                {/* Side Label with Background */}
                                                <g transform={`translate(${offsetX}, ${offsetY})`}>
                                                    <rect x="-30" y="-12" width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                                                    <text textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">
                                                        {sideLength} cm
                                                    </text>
                                                </g>

                                                {/* Mark tick on first side */}
                                                <line
                                                    x1={(x0 + x1) / 2 - 5 * Math.sin(midAngle)}
                                                    y1={(y0 + y1) / 2 + 5 * Math.cos(midAngle)}
                                                    x2={(x0 + x1) / 2 + 5 * Math.sin(midAngle)}
                                                    y2={(y0 + y1) / 2 - 5 * Math.cos(midAngle)}
                                                    stroke={POLYGONS[numSides].color}
                                                    strokeWidth="3"
                                                />

                                                <path d={points + " Z"}
                                                    fill="none"
                                                    stroke={POLYGONS[numSides].color}
                                                    strokeWidth="4"
                                                    strokeDasharray="8,4"
                                                    className="animate-pulse"
                                                    opacity="0.5"
                                                />
                                            </g>
                                        );
                                    })()}
                                </svg>
                            </div>
                            <p className="text-gray-400 font-medium italic text-sm">
                                All {numSides} sides are equal
                            </p>
                        </div>

                        {/* Right Column: Input Section */}
                        <div className="flex flex-col items-center justify-center p-4 bg-indigo-50/30 rounded-3xl h-full mobile-min-h-unset">
                            <div className="w-full max-w-sm space-y-6">
                                {!isSubmitted ? (
                                    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
                                        <div className="text-center">
                                            <label className="text-lg font-bold text-[#31326F] mb-2 block">
                                                Your Answer:
                                            </label>
                                            <div className="relative">
                                                <style>
                                                    {`
                                                        input[type=number]::-webkit-inner-spin-button, 
                                                        input[type=number]::-webkit-outer-spin-button { 
                                                            -webkit-appearance: none; 
                                                            margin: 0; 
                                                        }
                                                        input[type=number] {
                                                            -moz-appearance: textfield;
                                                        }
                                                    `}
                                                </style>
                                                <input
                                                    type="number"
                                                    value={userAnswer}
                                                    onChange={(e) => setUserAnswer(e.target.value)}
                                                    placeholder="?"
                                                    className="w-full text-5xl font-black text-center p-6 border-2 border-indigo-200 rounded-3xl focus:outline-none focus:border-[#F471B5] focus:ring-4 focus:ring-[#F471B5]/10 transition-all text-[#31326F] placeholder:text-indigo-200 bg-white shadow-sm"
                                                    autoFocus
                                                    onKeyDown={(e) => e.key === 'Enter' && userAnswer && handleCheck()}
                                                />
                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl pointer-events-none">
                                                    cm
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleCheck}
                                            disabled={!userAnswer}
                                            className="w-full py-4 bg-[#31326F] text-white rounded-2xl font-bold text-xl hover:bg-[#252655] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 mt-2"
                                        >
                                            Check Answer
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-6 animate-in zoom-in-95 duration-300 w-full">
                                        <div className={`p-8 rounded-3xl text-center border-2 ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                                            <div className={`text-3xl font-black mb-2 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                                {isCorrect ? "Correct! 🎉" : "Not quite"}
                                            </div>
                                            {isCorrect && (
                                                <div className="text-green-700/80 font-medium text-lg">
                                                    {feedbackMessage}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            {!isCorrect && (
                                                <button
                                                    onClick={() => setShowExplanation(true)}
                                                    className="w-full py-4 bg-white border-2 border-indigo-100 text-[#31326F] rounded-2xl font-bold hover:bg-gray-50 transition-colors shadow-sm"
                                                >
                                                    See Steps
                                                </button>
                                            )}
                                            <button
                                                onClick={handleNext}
                                                className="w-full py-4 bg-[#4FB7B3] text-white rounded-2xl font-bold text-xl hover:bg-[#449e9b] active:scale-[0.98] transition-all shadow-lg shadow-teal-100"
                                            >
                                                {qIndex < TOTAL_QUESTIONS - 1 ? "Next Question" : "Finish Practice"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="p-6 text-center">
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-400 hover:text-[#31326F] font-semibold text-lg transition-colors flex items-center justify-center gap-2 mx-auto py-2 px-6 rounded-full hover:bg-white/50"
                >
                    <X size={20} /> Quit Practice
                </button>
            </footer>

            <ExplanationModal
                isOpen={showExplanation}
                onClose={() => setShowExplanation(false)}
                isCorrect={isCorrect}
                correctAnswer={`${getCorrectAnswer()} cm`}
                explanation={`To find the perimeter of a regular ${POLYGONS[numSides].name} (which has ${numSides} equal sides), multiply the number of sides by the side length:<br/><strong>Perimeter = ${numSides} × ${sideLength} = ${getCorrectAnswer()} cm</strong>`}
            />
        </div>
    );
};

export default RegularPolygonPractice;

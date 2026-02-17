import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, X, ChevronLeft } from 'lucide-react';
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
    const [history, setHistory] = useState([]);

    const sessionId = useRef(null);
    const questionStartTime = useRef(Date.now());
    const answers = useRef({});

    const TOTAL_QUESTIONS = 10;
    const SKILL_ID = 6003; // Assign a unique skill ID for this topic

    const CORRECT_MESSAGES = [
        "✨ Excellent! You found the right answer! ✨",
        "🌟 Geometry genius! Great job! 🌟",
        "🎉 Perfect calculation! 🎉",
        "🚀 You're a polygon pro! 🚀"
    ];

    useEffect(() => {
        // Start session
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
        if (history[qIndex]) {
            const data = history[qIndex];
            setNumSides(data.numSides);
            setSideLength(data.sideLength);
            setUserAnswer(data.userAnswer);
            setIsSubmitted(data.isSubmitted);
            setIsCorrect(data.isCorrect);
            setFeedbackMessage(data.feedbackMessage || '');
            setShowExplanation(false);
            questionStartTime.current = Date.now();
        } else {
            // Generate random number of sides (3 to 8)
            const sides = Math.floor(Math.random() * 6) + 3;
            // Generate random side length (1 to 15)
            const length = Math.floor(Math.random() * 15) + 1;

            setNumSides(sides);
            setSideLength(length);
            setUserAnswer('');
            setIsSubmitted(false);
            setIsCorrect(false);
            setShowExplanation(false);
            setFeedbackMessage('');
            questionStartTime.current = Date.now();
        }
    };

    const getPolygonName = (n) => {
        const names = {
            3: "Equilateral Triangle",
            4: "Square",
            5: "Regular Pentagon",
            6: "Regular Hexagon",
            7: "Regular Heptagon",
            8: "Regular Octagon"
        };
        return names[n] || "Regular Polygon";
    };

    const handleCheck = async () => {
        const perimeter = numSides * sideLength;
        const userVal = parseFloat(userAnswer);
        const isRight = Math.abs(userVal - perimeter) < 0.1;

        setIsCorrect(isRight);
        setIsSubmitted(true);
        answers.current[qIndex] = isRight;

        let msg = '';
        if (isRight) {
            msg = CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)];
            setFeedbackMessage(msg);
        } else {
            setShowExplanation(true);
        }

        // Save to history
        const newHistory = [...history];
        newHistory[qIndex] = {
            numSides,
            sideLength,
            userAnswer,
            isSubmitted: true,
            isCorrect: isRight,
            feedbackMessage: msg
        };
        setHistory(newHistory);


        // Record attempt
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && sessionId.current) {
            const timeTaken = (Date.now() - questionStartTime.current) / 1000;
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId.current,
                skill_id: SKILL_ID,
                question_text: `Find the perimeter of a regular polygon with ${numSides} sides of length ${sideLength}`,
                correct_answer: String(perimeter),
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
            // Finish session
            if (sessionId.current) {
                await api.finishSession(sessionId.current);
            }
            navigate(-1);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-[#F0F8FF] flex flex-col font-sans text-[#31326F] pb-24">
            {/* Header */}
            <header className="p-6 flex justify-between items-center max-w-5xl mx-auto w-full">
                <div className="bg-white px-6 py-2 rounded-full shadow-sm text-[#31326F] font-bold border border-indigo-50">
                    Question {qIndex + 1} / {TOTAL_QUESTIONS}
                </div>
                <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-indigo-50 font-bold text-[#31326F]">
                    {formatTime(timeElapsed)}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-start p-4 w-full max-w-2xl mx-auto">
                <div className="bg-white rounded-[32px] shadow-xl w-full overflow-hidden border border-indigo-50 p-8 flex flex-col items-center gap-8 min-h-[500px]">

                    {/* Question Text */}
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-medium text-[#31326F]">
                            Find the <span className="font-bold">Perimeter</span> of this shape.
                        </h2>
                        <p className="text-gray-400 text-lg">
                            {getPolygonName(numSides)}
                        </p>
                    </div>

                    {/* Visualization */}
                    <div className="flex-1 flex items-center justify-center w-full py-4">
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl filter">
                                {(() => {
                                    const cx = 100, cy = 100, r = 80;
                                    const points = [];
                                    for (let i = 0; i < numSides; i++) {
                                        const angle = (Math.PI / 2) + (i * 2 * Math.PI / numSides);
                                        const x = cx + r * Math.cos(angle);
                                        const y = cy - r * Math.sin(angle); // Subtract because SVG y goes down
                                        points.push(`${x},${y}`);
                                    }

                                    // Calculate midpoint of the first side (top right usually) to place label
                                    // Or essentially any side. Let's pick the side between point 0 and 1
                                    const p0 = points[0].split(',').map(Number);
                                    const p1 = points[1].split(',').map(Number);
                                    const mx = (p0[0] + p1[0]) / 2;
                                    const my = (p0[1] + p1[1]) / 2;

                                    // Offset label slightly outward
                                    const angle0 = (Math.PI / 2);
                                    const angle1 = (Math.PI / 2) + (2 * Math.PI / numSides);
                                    const midAngle = (angle0 + angle1) / 2;
                                    const lx = cx + (r + 25) * Math.cos(midAngle);
                                    const ly = cy - (r + 25) * Math.sin(midAngle);


                                    return (
                                        <g>
                                            <polygon
                                                points={points.join(' ')}
                                                fill="rgba(244, 113, 181, 0.05)"
                                                stroke="#31326F"
                                                strokeWidth="3"
                                                strokeLinejoin="round"
                                            />
                                            {/* Side Length Label */}
                                            <g>
                                                <rect
                                                    x={mx - 24}
                                                    y={my - 14}
                                                    width="48"
                                                    height="28"
                                                    rx="6"
                                                    fill="white"
                                                    className="drop-shadow-sm"
                                                />
                                                <text
                                                    x={mx}
                                                    y={my}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    className="text-lg font-bold fill-[#31326F]"
                                                >
                                                    {sideLength}
                                                </text>
                                            </g>
                                        </g>
                                    );
                                })()}
                            </svg>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="w-full max-w-sm">
                        <div className="flex flex-col items-center gap-4">
                            {!isSubmitted ? (
                                <>
                                    <div className="relative w-full">
                                        <input
                                            type="number"
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            placeholder="Enter perimeter"
                                            className="w-full bg-indigo-50/50 text-center text-2xl font-bold py-4 rounded-xl border-2 border-transparent focus:border-[#3B82F6] focus:bg-white focus:outline-none transition-all placeholder:text-gray-300 text-[#31326F]"
                                            autoFocus
                                            onKeyDown={(e) => e.key === 'Enter' && userAnswer && handleCheck()}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                                            cm
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`w-full p-4 rounded-xl text-center border-2 ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                                    <p className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                        {isCorrect ? "Correct!" : "Try Again"}
                                    </p>
                                    {isCorrect && (
                                        <p className="text-sm text-green-700 mt-1">{feedbackMessage}</p>
                                    )}
                                    {!isCorrect && (
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-sm text-red-600 mt-1">
                                                Perimeter = Sides × Length = {numSides} × {sideLength} = {numSides * sideLength}
                                            </p>
                                            <button
                                                onClick={() => setShowExplanation(true)}
                                                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-bold hover:bg-red-200 transition-colors flex items-center gap-2"
                                            >
                                                <Eye size={16} /> View Solution
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-10">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 rounded-full text-red-500 font-bold hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                        Exit Practice
                    </button>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${qIndex === 0
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'bg-[#3B82F6] text-white shadow-lg shadow-blue-200 hover:scale-105 active:scale-95'
                                }`}
                        >
                            <ChevronLeft size={20} />
                            PREV
                        </button>

                        {!isSubmitted ? (
                            <button
                                onClick={handleCheck}
                                disabled={!userAnswer}
                                className="px-8 py-3 rounded-full bg-gray-200 text-gray-500 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 hover:text-gray-700 transition-all flex items-center gap-2"
                            >
                                SUBMIT <Check size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 rounded-full bg-[#3B82F6] text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                            >
                                {qIndex < TOTAL_QUESTIONS - 1 ? "NEXT" : "FINISH"} <ChevronRight size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ExplanationModal
                isOpen={showExplanation}
                onClose={() => setShowExplanation(false)}
                isCorrect={isCorrect}
                correctAnswer={`${numSides * sideLength} cm`}
                explanation={`To find the perimeter of a regular polygon, multiply the number of sides (${numSides}) by the length of one side (${sideLength}).<br/><strong>Perimeter = ${numSides} × ${sideLength} = ${numSides * sideLength}</strong>`}
            />
        </div>
    );
};

export default RegularPolygonPractice;

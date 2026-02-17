
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const RectanglePractice = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [rectLength, setRectLength] = useState(0);
    const [rectWidth, setRectWidth] = useState(0);
    const [mode, setMode] = useState('perimeter'); // 'perimeter' or 'area'
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
    const SKILL_ID = 6001; // Assign a unique skill ID for this topic

    const CORRECT_MESSAGES = [
        "✨ Excellent! You found the right answer! ✨",
        "🌟 Dimensions mastered! Great job! 🌟",
        "🎉 Perfect calculation! 🎉",
        "🚀 You're a geometry star! 🚀"
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
        // Generate random dimensions
        // Length should be greater than width for visual consistency
        const l = Math.floor(Math.random() * 15) + 5;
        const w = Math.floor(Math.random() * (l - 2)) + 2;

        // Randomly choose between perimeter and area questions
        const newMode = Math.random() > 0.5 ? 'area' : 'perimeter';

        setRectLength(l);
        setRectWidth(w);
        setMode(newMode);
        setUserAnswer('');
        setIsSubmitted(false);
        setIsCorrect(false);
        setShowExplanation(false);
        questionStartTime.current = Date.now();
    };

    const getCorrectAnswer = () => {
        if (mode === 'area') return rectLength * rectWidth;
        return 2 * (rectLength + rectWidth);
    };

    const handleCheck = async () => {
        const correct = getCorrectAnswer();
        const userVal = parseFloat(userAnswer);
        const isRight = Math.abs(userVal - correct) < 0.1; // Allow small float differences if any

        setIsCorrect(isRight);
        setIsSubmitted(true);
        answers.current[qIndex] = isRight;

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanation(true);
        }

        // Record attempt
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && sessionId.current) {
            const timeTaken = (Date.now() - questionStartTime.current) / 1000;
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId.current,
                skill_id: SKILL_ID,
                question_text: `Find the ${mode} of a rectangle with length ${rectLength} and width ${rectWidth}`,
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
            // Finish session
            if (sessionId.current) {
                await api.finishSession(sessionId.current);
            }
            // Create report logic could go here similar to the reference file
            navigate(-1);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                                    Find the <span className="text-[#F471B5]">{mode.toUpperCase()}</span>
                                </h2>
                                <p className="text-gray-500 text-base">
                                    of the rectangle below
                                </p>
                            </div>

                            <div className="relative w-full aspect-square max-w-[280px] bg-indigo-50/50 rounded-2xl p-4 flex items-center justify-center">
                                <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-lg">
                                    {/* Dynamic Rectangle Scaling */}
                                    {(() => {
                                        // Scale dimensions to fit in 200x200 box while maintaining aspect ratio
                                        const maxDim = Math.max(rectLength, rectWidth);
                                        const scale = 200 / (maxDim || 1);
                                        const scaledL = rectLength * scale;
                                        const scaledW = rectWidth * scale;
                                        const x = (300 - scaledL) / 2;
                                        const y = (300 - scaledW) / 2;

                                        return (
                                            <g>
                                                <defs>
                                                    <marker id="arrow-start" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                                                        <path d="M9,0 L0,3 L9,6" fill="#31326F" />
                                                    </marker>
                                                    <marker id="arrow-end" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                                                        <path d="M0,0 L10,3 L0,6" fill="#31326F" />
                                                    </marker>
                                                </defs>

                                                <rect
                                                    x={x}
                                                    y={y}
                                                    width={scaledL}
                                                    height={scaledW}
                                                    fill={mode === 'area' ? "rgba(244, 113, 181, 0.1)" : "white"}
                                                    stroke="#31326F"
                                                    strokeWidth="3"
                                                    rx="2"
                                                />

                                                {/* Labels with Backgrounds for Readability */}
                                                {/* Width Label (Left) */}
                                                <g transform={`translate(${x - 25}, ${y + scaledW / 2})`}>
                                                    <rect x="-30" y="-12" width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                                                    <text textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">
                                                        {String(rectWidth)} cm
                                                    </text>
                                                </g>

                                                {/* Length Label (Bottom) */}
                                                <g transform={`translate(${x + scaledL / 2}, ${y + scaledW + 25})`}>
                                                    <rect x="-30" y="-12" width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                                                    <text textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">
                                                        {String(rectLength)} cm
                                                    </text>
                                                </g>

                                                {/* Visual cues based on mode */}
                                                {mode === 'perimeter' && (
                                                    <rect
                                                        x={x} y={y} width={scaledL} height={scaledW}
                                                        fill="none" stroke="#F471B5" strokeWidth="4" strokeDasharray="8,4"
                                                        className="animate-pulse"
                                                        rx="2"
                                                    />
                                                )}
                                            </g>
                                        );
                                    })()}
                                </svg>
                            </div>
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
                                                    {mode === 'area' ? 'cm²' : 'cm'}
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
                correctAnswer={`${getCorrectAnswer()} ${mode === 'area' ? 'sq cm' : 'cm'}`}
                explanation={
                    mode === 'area'
                        ? `To find the area of a rectangle, multiply length by width:<br/><strong>Area = ${rectLength} × ${rectWidth} = ${getCorrectAnswer()}</strong>`
                        : `To find the perimeter, add all sides or use the formula:<br/><strong>Perimeter = 2 × (${rectLength} + ${rectWidth}) = ${getCorrectAnswer()}</strong>`
                }
            />
        </div>
    );
};

export default RectanglePractice;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, X, ChevronLeft, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../services/api';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const MixedBagPractice = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);

    // Initial valid state to prevent render crash on mount
    const [questionType, setQuestionType] = useState('rectangle');
    const [questionData, setQuestionData] = useState({
        l: 5,
        w: 3,
        mode: 'perimeter'
    });

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

    const TOTAL_QUESTIONS = 15;
    const SKILL_ID = 6099;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

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

    // Only generate NEW question if we moved to a NEW index that isn't in history
    useEffect(() => {
        if (!history[qIndex]) {
            generateQuestion();
        } else {
            loadQuestionFromHistory(qIndex);
        }
    }, [qIndex]);

    const loadQuestionFromHistory = (index) => {
        const data = history[index];
        setQuestionType(data.questionType);
        setQuestionData(data.questionData);
        setUserAnswer(data.userAnswer);
        setIsSubmitted(data.isSubmitted);
        setIsCorrect(data.isCorrect);
        setFeedbackMessage(data.feedbackMessage || '');
        setShowExplanation(false);
    };

    const generateQuestion = () => {
        // Randomly select type
        const types = ['rectangle', 'square', 'triangle'];
        const type = types[Math.floor(Math.random() * types.length)];

        let data = {};
        if (type === 'rectangle') {
            const l = Math.floor(Math.random() * 12) + 3;
            const w = Math.floor(Math.random() * (l - 2)) + 2;
            data = {
                l,
                w,
                mode: Math.random() > 0.5 ? 'area' : 'perimeter'
            };
        } else if (type === 'square') {
            data = {
                s: Math.floor(Math.random() * 12) + 2,
                mode: Math.random() > 0.5 ? 'area' : 'perimeter'
            };
        } else if (type === 'triangle') {
            const mode = Math.random() > 0.5 ? 'area' : 'perimeter';
            if (mode === 'area') {
                data = {
                    base: Math.floor(Math.random() * 12) + 4,
                    height: Math.floor(Math.random() * 10) + 3,
                    mode: 'area'
                };
            } else {
                let a, b, c;
                do {
                    a = Math.floor(Math.random() * 8) + 3;
                    b = Math.floor(Math.random() * 8) + 3;
                    c = Math.floor(Math.random() * 8) + 3;
                } while (a + b <= c || a + c <= b || b + c <= a);
                data = {
                    sides: [a, b, c],
                    mode: 'perimeter'
                };
            }
        } else {
            // Regular Polygon
            data = {
                sides: Math.floor(Math.random() * 4) + 5, // 5 to 8
                length: Math.floor(Math.random() * 10) + 2
            };
        }

        setQuestionType(type);
        setQuestionData(data);
        setUserAnswer('');
        setIsSubmitted(false);
        setIsCorrect(false);
        setFeedbackMessage('');
        setShowExplanation(false);

        questionStartTime.current = Date.now();
    };

    const calculateAnswer = () => {
        const { l, w, s, base, height, sides, length, mode } = questionData;
        if (questionType === 'rectangle') {
            // Guard against undefined during initial render if happens
            if (l === undefined || w === undefined) return 0;
            return mode === 'area' ? l * w : 2 * (l + w);
        } else if (questionType === 'square') {
            if (s === undefined) return 0;
            return mode === 'area' ? s * s : 4 * s;
        } else if (questionType === 'triangle') {
            if (mode === 'area') {
                if (base === undefined || height === undefined) return 0;
                return 0.5 * base * height;
            }
            if (!sides) return 0;
            return sides[0] + sides[1] + sides[2];
        } else {
            if (sides === undefined || length === undefined) return 0;
            return sides * length;
        }
    };

    const handleCheck = async () => {
        const correct = calculateAnswer();
        const userVal = parseFloat(userAnswer);
        const isRight = Math.abs(userVal - correct) < 0.1;

        setIsCorrect(isRight);
        setIsSubmitted(true);

        let msg = '';
        if (isRight) {
            const messages = ["Great job!", "Correct!", "Awesome!"];
            msg = messages[Math.floor(Math.random() * messages.length)];
            setFeedbackMessage(msg);
        } else {
            setShowExplanation(true);
        }

        const newHistory = [...history];
        newHistory[qIndex] = {
            questionType,
            questionData,
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
                question_text: getTitleText(),
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

    const handlePrevious = () => {
        if (qIndex > 0) setQIndex(prev => prev - 1);
    };

    // --- Visualization Renderers ---

    const renderRectangle = () => {
        const { l, w, mode } = questionData;
        if (l === undefined || w === undefined) return null;
        const maxDim = Math.max(l, w);
        const scale = 200 / (maxDim || 1);
        const scaledL = l * scale;
        const scaledW = w * scale;
        const x = (300 - scaledL) / 2;
        const y = (300 - scaledW) / 2;

        return (
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-lg">
                <rect
                    x={x} y={y} width={scaledL} height={scaledW}
                    fill={mode === 'area' ? "rgba(244, 113, 181, 0.1)" : "white"}
                    stroke="#31326F" strokeWidth="3" rx="2"
                />
                <g transform={`translate(${x - 25}, ${y + scaledW / 2})`}>
                    <rect x="-30" y="-12" width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                    <text textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">{w} cm</text>
                </g>
                <g transform={`translate(${x + scaledL / 2}, ${y + scaledW + 25})`}>
                    <rect x="-30" y="-12" width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                    <text textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">{l} cm</text>
                </g>
                {mode === 'perimeter' && (
                    <rect
                        x={x} y={y} width={scaledL} height={scaledW}
                        fill="none" stroke="#F471B5" strokeWidth="4" strokeDasharray="8,4"
                        className="animate-pulse" rx="2"
                    />
                )}
            </svg>
        );
    };

    const renderSquare = () => {
        const { s, mode } = questionData;
        if (s === undefined) return null;
        const rectSize = 180;
        const x = (300 - rectSize) / 2;
        const y = (300 - rectSize) / 2;

        return (
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-lg">
                <rect
                    x={x} y={y} width={rectSize} height={rectSize}
                    fill={mode === 'area' ? "rgba(244, 113, 181, 0.1)" : "white"}
                    stroke="#31326F" strokeWidth="3" rx="4"
                />
                <g transform={`translate(${x - 25}, ${y + rectSize / 2})`}>
                    <rect x="-30" y="-12" width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                    <text textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">{s} cm</text>
                </g>
                <g transform={`translate(${x + rectSize / 2}, ${y + rectSize + 25})`}>
                    <rect x="-30" y="-12" width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                    <text textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">{s} cm</text>
                </g>
                {mode === 'perimeter' && (
                    <rect
                        x={x} y={y} width={rectSize} height={rectSize}
                        fill="none" stroke="#F471B5" strokeWidth="4" strokeDasharray="8,4"
                        className="animate-pulse" rx="4"
                    />
                )}
            </svg>
        );
    };

    const renderTriangle = () => {
        const { base, height, sides, mode } = questionData;
        if (mode === 'area' && (base === undefined || height === undefined)) return null;
        if (mode === 'perimeter' && (!sides || sides.length < 3)) return null;

        const p1 = { x: 150, y: 50 };
        const p2 = { x: 50, y: 250 };
        const p3 = { x: 250, y: 250 };

        return (
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-lg">
                <polygon
                    points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
                    fill={mode === 'area' ? "rgba(244, 113, 181, 0.1)" : "white"}
                    stroke="#31326F" strokeWidth="3"
                />
                {mode === 'area' && (
                    <>
                        <line x1={p1.x} y1={p1.y} x2={p1.x} y2={p3.y} stroke="#31326F" strokeWidth="2" strokeDasharray="5,5" />
                        <path d={`M${p1.x},${p3.y} L${p1.x + 10},${p3.y} L${p1.x + 10},${p3.y - 10} L${p1.x},${p3.y - 10}`} fill="none" stroke="#31326F" strokeWidth="2" />
                        <g>
                            <rect x={p1.x + 2} y={(p1.y + p3.y) / 2 - 10} width="80" height="24" rx="4" fill="white" fillOpacity="0.8" />
                            <text x={p1.x + 10} y={(p1.y + p3.y) / 2} dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">h = {height}</text>
                        </g>
                        <g>
                            <rect x={(p2.x + p3.x) / 2 - 40} y={p3.y + 15} width="80" height="24" rx="4" fill="white" fillOpacity="0.8" />
                            <text x={(p2.x + p3.x) / 2} y={p3.y + 25} textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">b = {base}</text>
                        </g>
                    </>
                )}
                {mode === 'perimeter' && sides && (
                    <>
                        <g>
                            <rect x={(p1.x + p2.x) / 2 - 40} y={(p1.y + p2.y) / 2 - 12} width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                            <text x={(p1.x + p2.x) / 2 - 20} y={(p1.y + p2.y) / 2} textAnchor="end" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">{sides[0]}</text>
                        </g>
                        <g>
                            <rect x={(p2.x + p3.x) / 2 - 30} y={p3.y + 15} width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                            <text x={(p2.x + p3.x) / 2} y={p3.y + 25} textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">{sides[1]}</text>
                        </g>
                        <g>
                            <rect x={(p1.x + p3.x) / 2 + 5} y={(p1.y + p3.y) / 2 - 12} width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                            <text x={(p1.x + p3.x) / 2 + 20} y={(p1.y + p3.y) / 2} textAnchor="start" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">{sides[2]}</text>
                        </g>
                        <polygon
                            points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
                            fill="none" stroke="#F471B5" strokeWidth="4" strokeDasharray="10,5"
                            className="animate-pulse"
                        />
                    </>
                )}
            </svg>
        );
    };

    const renderPolygon = () => {
        const { sides: numSides, length: sideLength } = questionData;
        if (!numSides || !sideLength) return null;

        const cx = 100, cy = 100, r = 80;
        const points = [];
        for (let i = 0; i < numSides; i++) {
            const angle = (Math.PI / 2) + (i * 2 * Math.PI / numSides);
            const x = cx + r * Math.cos(angle);
            const y = cy - r * Math.sin(angle);
            points.push(`${x},${y}`);
        }

        if (points.length < 2) return null;

        const p0 = points[0].split(',').map(Number);
        const p1 = points[1].split(',').map(Number);
        const mx = (p0[0] + p1[0]) / 2;
        const my = (p0[1] + p1[1]) / 2;

        return (
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl filter">
                <g>
                    <polygon
                        points={points.join(' ')}
                        fill="rgba(244, 113, 181, 0.05)"
                        stroke="#31326F" strokeWidth="3" strokeLinejoin="round"
                    />
                    <g>
                        <rect x={mx - 24} y={my - 14} width="48" height="28" rx="6" fill="white" className="drop-shadow-sm" />
                        <text x={mx} y={my} textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">
                            {sideLength}
                        </text>
                    </g>
                </g>
            </svg>
        );
    };

    const getTitle = () => {
        const { mode } = questionData;
        const typeDisplay = questionType === 'polygon' ? 'Regular Polygon' : questionType.charAt(0).toUpperCase() + questionType.slice(1);
        const modeDisplay = mode === 'area' ? 'Area' : 'Perimeter';

        if (questionType === 'polygon') {
            return (
                <>
                    Find the <span className="font-bold">Perimeter</span> of this {typeDisplay}.
                </>
            );
        }

        return (
            <>
                Find the <span className="font-bold">{modeDisplay}</span> of this {typeDisplay}.
            </>
        );
    };

    // Helper text for recordAttempt
    const getTitleText = () => {
        const { mode } = questionData;
        const typeDisplay = questionType === 'polygon' ? 'Regular Polygon' : questionType.charAt(0).toUpperCase() + questionType.slice(1);
        const modeDisplay = mode === 'area' ? 'Area' : 'Perimeter';
        if (questionType === 'polygon') return `Find the Perimeter of this ${typeDisplay}`;
        return `Find the ${modeDisplay} of this ${typeDisplay}`;
    };

    return (
        <div className="min-h-screen bg-[#F0F8FF] flex flex-col font-sans text-[#31326F] pb-24">
            <header className="p-6 flex justify-between items-center max-w-5xl mx-auto w-full">
                <div className="bg-white px-6 py-2 rounded-full shadow-sm text-[#31326F] font-bold border border-indigo-50">
                    Mixed Bag: Q{qIndex + 1}/{TOTAL_QUESTIONS}
                </div>
                <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-indigo-50 font-bold text-[#31326F]">
                    {formatTime(timeElapsed)}
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-start p-4 w-full max-w-2xl mx-auto">
                <div className="bg-white rounded-[32px] shadow-xl w-full border border-indigo-50 p-8 flex flex-col items-center gap-8 min-h-[500px]">
                    <h2 className="text-2xl font-medium text-[#31326F] capitalize">
                        {getTitle()}
                    </h2>

                    <div className="flex-1 flex items-center justify-center w-full py-4 max-w-[340px] max-h-[340px]">
                        {questionType === 'rectangle' && renderRectangle()}
                        {questionType === 'square' && renderSquare()}
                        {questionType === 'triangle' && renderTriangle()}
                        {questionType === 'polygon' && renderPolygon()}
                    </div>

                    <div className="w-full max-w-sm">
                        <div className="flex flex-col items-center gap-4">
                            {!isSubmitted ? (
                                <div className="relative w-full">
                                    <input
                                        type="number"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        className="w-full bg-indigo-50/50 text-center text-2xl font-bold py-4 rounded-xl border-2 border-transparent focus:border-[#3B82F6] focus:bg-white focus:outline-none transition-all placeholder:text-gray-300 text-[#31326F]"
                                        placeholder="Answer"
                                        onKeyDown={(e) => e.key === 'Enter' && userAnswer && handleCheck()}
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                                        {questionData.mode === 'area' ? 'cm²' : 'cm'}
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`w-full p-4 rounded-xl text-center border-2 ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                                    <p className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                        {isCorrect ? "Correct!" : "Try Again"}
                                    </p>
                                    <p className="text-sm mt-1 text-gray-600">
                                        {isCorrect ? feedbackMessage : (
                                            <button
                                                onClick={() => setShowExplanation(true)}
                                                className="mt-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-bold hover:bg-red-200 transition-colors flex items-center justify-center gap-2 mx-auto"
                                            >
                                                <Eye size={16} /> View Explanation
                                            </button>
                                        )}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-10">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="px-6 py-3 rounded-full text-red-500 font-bold hover:bg-red-50 transition-colors flex items-center gap-2">
                        Exit Practice
                    </button>
                    <div className="flex items-center gap-3">
                        <button onClick={handlePrevious} disabled={qIndex === 0} className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${qIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'bg-[#3B82F6] text-white shadow-lg shadow-blue-200 hover:scale-105'}`}>
                            <ChevronLeft size={20} /> PREV
                        </button>
                        {!isSubmitted ? (
                            <button onClick={handleCheck} disabled={!userAnswer} className="px-8 py-3 rounded-full bg-gray-200 text-gray-500 font-bold hover:bg-gray-300 hover:text-gray-700 transition-all flex items-center gap-2 disabled:opacity-50">
                                SUBMIT <Check size={20} />
                            </button>
                        ) : (
                            <button onClick={handleNext} className="px-8 py-3 rounded-full bg-[#3B82F6] text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 hover:scale-105 transition-all flex items-center gap-2">
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
                correctAnswer={`${calculateAnswer()} ${questionData.mode === 'area' ? 'cm²' : 'cm'}`}
                explanation={
                    questionType === 'rectangle' ? (
                        questionData.mode === 'area'
                            ? `Area = Length × Width = ${questionData.l} × ${questionData.w} = ${calculateAnswer()}`
                            : `Perimeter = 2 × (Length + Width) = 2 × (${questionData.l} + ${questionData.w}) = ${calculateAnswer()}`
                    ) : questionType === 'square' ? (
                        questionData.mode === 'area'
                            ? `Area = Side × Side = ${questionData.s} × ${questionData.s} = ${calculateAnswer()}`
                            : `Perimeter = 4 × Side = 4 × ${questionData.s} = ${calculateAnswer()}`
                    ) : questionType === 'triangle' ? (
                        questionData.mode === 'area'
                            ? `Area = ½ × Base × Height = ½ × ${questionData.base} × ${questionData.height} = ${calculateAnswer()}`
                            : `Perimeter = Sum of all sides = ${questionData.sides?.[0] || 0} + ${questionData.sides?.[1] || 0} + ${questionData.sides?.[2] || 0} = ${calculateAnswer()}`
                    ) : (
                        `Perimeter = Number of Sides × Length = ${questionData.sides} × ${questionData.length} = ${calculateAnswer()}`
                    )
                }
            />
        </div>
    );
};

export default MixedBagPractice;

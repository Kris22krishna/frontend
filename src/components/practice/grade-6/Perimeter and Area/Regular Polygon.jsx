import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, X, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { useSessionLogger } from '../../../../hooks/useSessionLogger';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import './polynomials.css';

const RegularPolygonPractice = () => {
    const navigate = useNavigate();
    const getSessionData = (key, defaultValue) => {
        const data = sessionStorage.getItem(key);
        return data !== null ? JSON.parse(data) : defaultValue;
    };

    const storageKey = `practice_${window.location.pathname}`;

    const [qIndex, setQIndex] = useState(() => getSessionData(`${storageKey}_qIndex`, 0));
    const [numSides, setNumSides] = useState(5); // Default Pentagon
    const [sideLength, setSideLength] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [timeElapsed, setTimeElapsed] = useState(() => getSessionData(`${storageKey}_timeElapsed`, 0));
    const [history, setHistory] = useState(() => getSessionData(`${storageKey}_history`, []));

    const sessionId = useRef(getSessionData(`${storageKey}_sessionId`, null));
    const questionStartTime = useRef(Date.now());
    const answers = useRef(getSessionData(`${storageKey}_answers`, {}));

    const TOTAL_QUESTIONS = 10;
    const SKILL_ID = 6003;
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4AnswersPayload = useRef([]);
    const v4IsFinishedRef = useRef(false); // Assign a unique skill ID for this topic

    const CORRECT_MESSAGES = [
        "✨ Excellent! You found the right answer! ✨",
        "🌟 Geometry genius! Great job! 🌟",
        "🎉 Perfect calculation! 🎉",
        "🚀 You're a polygon pro! 🚀"
    ];


    const clearProgress = () => {
        sessionStorage.removeItem(`${storageKey}_qIndex`);
        sessionStorage.removeItem(`${storageKey}_history`);
        sessionStorage.removeItem(`${storageKey}_answers`);
        sessionStorage.removeItem(`${storageKey}_timeElapsed`);
        sessionStorage.removeItem(`${storageKey}_sessionId`);
    };

    useEffect(() => {
        // Start session
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) sessionId.current = sess.session_id;
            }).catch(err => console.error("Failed to start session", err));
            startSession({ nodeId: 'a4061006-0004-0000-0000-000000000000', sessionType: 'practice' });
            v4AnswersPayload.current = [];
            v4IsFinishedRef.current = false;
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
            const _v4t = Date.now() - questionStartTime.current;
            v4AnswersPayload.current.push({
                question_index: qIndex,
                answer_json: JSON.stringify({ answer: typeof userAnswer !== 'undefined' ? userAnswer : '' }),
                is_correct: isRight,
                marks_awarded: isRight ? 1 : 0,
                marks_possible: 1,
                time_taken_ms: _v4t > 0 ? _v4t : 0,
            });
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
        } else {
            // Finish session
            if (sessionId.current) {
                if (!v4IsFinishedRef.current) {
                    v4IsFinishedRef.current = true;
                    finishSession({ answers_payload: v4AnswersPayload.current });
                }
                await api.finishSession(sessionId.current);
            }
            clearProgress(); navigate(-1);
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
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            {/* Header */}
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span className="text-[#31326F] text-lg sm:text-xl">Regular Polygon</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ padding: '2rem' }}>
                            <div className="question-header-modern" style={{ marginBottom: '2rem' }}>
                                <div className="text-center space-y-2 w-full">
                                    <h2 className="text-2xl text-[#31326F]">
                                        Find the <span className="font-normal">Perimeter</span> of this shape.
                                    </h2>
                                    <p className="text-gray-400 text-lg">
                                        {getPolygonName(numSides)}
                                    </p>
                                </div>
                            </div>

                            {/* Visualization */}
                            <div className="flex-1 flex items-center justify-center w-full py-2 mb-4 min-h-0">
                                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
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
                                                            className="text-lg fill-[#31326F]"
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
                            <div className="interaction-area-modern w-full max-w-md mx-auto">
                                <div className="flex flex-col items-center gap-4 w-full">
                                    {!isSubmitted ? (
                                        <>
                                            <div className="relative w-full">
                                                <input
                                                    type="number"
                                                    value={userAnswer}
                                                    onChange={(e) => setUserAnswer(e.target.value)}
                                                    placeholder="Enter perimeter"
                                                    className={`w-full text-center text-3xl py-6 rounded-2xl border-2 transition-all placeholder:text-gray-300 ${!isSubmitted ? "bg-indigo-50/50 border-transparent focus:border-[#3B82F6] focus:bg-white text-[#31326F]" : isCorrect ? "bg-green-100 border-green-500 text-green-700" : "bg-red-100 border-red-500 text-red-700"}`}
                                                    autoFocus
                                                    onKeyDown={(e) => e.key === 'Enter' && userAnswer && handleCheck()}
                                                />
                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                                                    cm
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`w-full p-4 rounded-xl text-center border-2 mt-4 ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                                            <p className={`text-xl ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                                {isCorrect ? "Correct! 🎉" : "Not quite right"}
                                            </p>
                                            {isCorrect && (
                                                <p className="text-green-600 mt-1">{feedbackMessage}</p>
                                            )}
                                            {!isCorrect && (
                                                <div className="flex flex-col items-center gap-2 mt-2">
                                                    <p className="text-sm text-red-600">
                                                        Perimeter = Sides × Length = {numSides} × {sideLength} = {numSides * sideLength}
                                                    </p>
                                                    <button
                                                        onClick={() => setShowExplanation(true)}
                                                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition-colors flex items-center gap-2"
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
                    </div>
                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <footer className="junior-bottom-bar relative z-50">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] px-6 py-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-2 text-lg"
                            onClick={async () => {
                                if (sessionId.current) await api.finishSession(sessionId.current).catch(console.error);
                                clearProgress(); navigate(-1);
                            }}
                        >
                            Exit
                        </button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button
                                onClick={() => setShowExplanation(true)}
                                className="view-explanation-btn"
                            >
                                <Eye size={20} /> View Solution
                            </button>
                        )}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <ChevronLeft size={24} strokeWidth={3} /> PREV
                            </button>
                            {!isSubmitted ? (
                                <button
                                    onClick={handleCheck}
                                    disabled={!userAnswer}
                                    className="nav-pill-submit-btn"
                                >
                                    SUBMIT <Check size={24} strokeWidth={3} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="nav-pill-next-btn"
                                >
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>NEXT <ChevronRight size={24} strokeWidth={3} /></>
                                    ) : (
                                        <>DONE <Check size={24} strokeWidth={3} /></>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button
                            className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                            onClick={async () => {
                                if (sessionId.current) await api.finishSession(sessionId.current).catch(console.error);
                                clearProgress(); navigate(-1);
                            }}
                        >
                            <X size={20} />
                        </button>
                        {isSubmitted && (
                            <button
                                onClick={() => setShowExplanation(true)}
                                className="view-explanation-btn"
                            >
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            <button
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <ChevronLeft size={24} strokeWidth={3} /> PREV
                            </button>
                            {!isSubmitted ? (
                                <button
                                    onClick={handleCheck}
                                    disabled={!userAnswer}
                                    className="nav-pill-submit-btn"
                                >SUBMIT</button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="nav-pill-next-btn"
                                >
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "NEXT" : "DONE"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>

            <ExplanationModal
                isOpen={showExplanation}
                onClose={() => setShowExplanation(false)}
                isCorrect={isCorrect}
                correctAnswer={`${numSides * sideLength} cm`}
                explanation={`To find the perimeter of a regular polygon, multiply the number of sides (${numSides}) by the length of one side (${sideLength}).<br/><strong>Perimeter = ${numSides} × ${sideLength} = ${numSides * sideLength} cm</strong>`}
            />
        </div>
    );
};

export default RegularPolygonPractice;

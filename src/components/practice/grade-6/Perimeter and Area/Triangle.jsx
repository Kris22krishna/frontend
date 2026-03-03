import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, X, ChevronLeft, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../services/api';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import "../../../../pages/juniors/JuniorPracticeSession.css";

const TrianglePractice = () => {
    const navigate = useNavigate();
    const getSessionData = (key, defaultValue) => {
        const data = sessionStorage.getItem(key);
        return data !== null ? JSON.parse(data) : defaultValue;
    };

    const storageKey = `practice_${window.location.pathname}`;

    const [qIndex, setQIndex] = useState(() => getSessionData(`${storageKey}_qIndex`, 0));
    const [sides, setSides] = useState([0, 0, 0]);
    const [base, setBase] = useState(0);
    const [height, setHeight] = useState(0);
    const [mode, setMode] = useState('perimeter');
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

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (qIndex !== undefined && history) {
            sessionStorage.setItem(`${storageKey}_qIndex`, JSON.stringify(qIndex));
            sessionStorage.setItem(`${storageKey}_history`, JSON.stringify(history));
            sessionStorage.setItem(`${storageKey}_answers`, JSON.stringify(answers.current || {}));
            sessionStorage.setItem(`${storageKey}_timeElapsed`, JSON.stringify(timeElapsed));
            if (sessionId.current) sessionStorage.setItem(`${storageKey}_sessionId`, JSON.stringify(sessionId.current));
        }
    }, [qIndex, history, timeElapsed]);

    const clearProgress = () => {
        sessionStorage.removeItem(`${storageKey}_qIndex`);
        sessionStorage.removeItem(`${storageKey}_history`);
        sessionStorage.removeItem(`${storageKey}_answers`);
        sessionStorage.removeItem(`${storageKey}_timeElapsed`);
        sessionStorage.removeItem(`${storageKey}_sessionId`);
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

    useEffect(() => {
        generateQuestion();
    }, [qIndex]);

    const generateQuestion = () => {
        if (history[qIndex]) {
            const data = history[qIndex];
            setSides(data.sides);
            setBase(data.base);
            setHeight(data.height);
            setMode(data.mode);
            setUserAnswer(data.userAnswer);
            setIsSubmitted(data.isSubmitted);
            setIsCorrect(data.isCorrect);
            setFeedbackMessage(data.feedbackMessage || '');
            setShowExplanation(false);
        } else {
            const newMode = Math.random() > 0.5 ? 'area' : 'perimeter';
            setMode(newMode);

            let newSides = [0, 0, 0];
            let newBase = 0;
            let newHeight = 0;

            if (newMode === 'area') {
                const b = Math.floor(Math.random() * 10) + 4;
                const h = Math.floor(Math.random() * 10) + 4;
                newBase = b;
                newHeight = h;
                setBase(b);
                setHeight(h);
            } else {
                let a, b, c;
                do {
                    a = Math.floor(Math.random() * 8) + 3;
                    b = Math.floor(Math.random() * 8) + 3;
                    c = Math.floor(Math.random() * 8) + 3;
                } while (a + b <= c || a + c <= b || b + c <= a);
                newSides = [a, b, c];
                setSides(newSides);
            }

            setUserAnswer('');
            setIsSubmitted(false);
            setIsCorrect(false);
            setShowExplanation(false);
            setFeedbackMessage('');
        }
        questionStartTime.current = Date.now();
    };

    const getCorrectAnswer = () => {
        if (mode === 'area') return 0.5 * base * height;
        return sides[0] + sides[1] + sides[2];
    };

    const handleCheck = async () => {
        const correct = getCorrectAnswer();
        const userVal = parseFloat(userAnswer);
        const isRight = Math.abs(userVal - correct) < 0.1;

        setIsCorrect(isRight);
        setIsSubmitted(true);
        answers.current[qIndex] = isRight;

        let msg = '';
        if (isRight) {
            const messages = ["Fantastic!", "Right on!", "Triangle pro!"];
            msg = messages[Math.floor(Math.random() * messages.length)];
            setFeedbackMessage(msg);
        } else {
            setShowExplanation(true);
        }

        const newHistory = [...history];
        newHistory[qIndex] = {
            mode,
            sides,
            base,
            height,
            userAnswer,
            isSubmitted: true,
            isCorrect: isRight,
            feedbackMessage: msg
        };
        setHistory(newHistory);

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && sessionId.current) {
            const timeTaken = (Date.now() - questionStartTime.current) / 1000;
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId.current,
                skill_id: SKILL_ID,
                question_text: mode === 'area'
                    ? `Find the area of a triangle with base ${base} and height ${height}`
                    : `Find the perimeter of a triangle with sides ${sides.join(', ')}`,
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
            clearProgress(); navigate(-1);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) setQIndex(prev => prev - 1);
    };

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header">
                <div className="header-left">
                    <span className="chapter-title">Perimeter and Area: Triangle</span>
                </div>
                <div className="header-center">
                    <div className="question-counter">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="timer-display">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern">
                            <div className="question-header-modern">
                                <h2 className="question-text-modern">
                                    Find the <span className="font-semibold text-[#4FB7B3]">{mode === 'area' ? 'Area' : 'Perimeter'}</span> of the triangle
                                </h2>
                            </div>

                            <div className="flex-1 flex items-center justify-center w-full py-6 min-h-[200px]">
                                <svg viewBox="0 0 300 300" className="w-full h-full max-h-[220px] max-w-[340px] drop-shadow-xl" style={{ objectFit: 'contain' }}>
                                    {(() => {
                                        const p1 = { x: 150, y: 50 };
                                        const p2 = { x: 50, y: 250 };
                                        const p3 = { x: 250, y: 250 };

                                        return (
                                            <g>
                                                <polygon
                                                    points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
                                                    fill={mode === 'area' ? "rgba(79, 183, 179, 0.1)" : "white"}
                                                    stroke="#31326F" strokeWidth="3"
                                                />
                                                {mode === 'area' && (
                                                    <>
                                                        <line x1={p1.x} y1={p1.y} x2={p1.x} y2={p3.y} stroke="#31326F" strokeWidth="2" strokeDasharray="5,5" />
                                                        <path d={`M${p1.x},${p3.y} L${p1.x + 10},${p3.y} L${p1.x + 10},${p3.y - 10} L${p1.x},${p3.y - 10}`} fill="none" stroke="#31326F" strokeWidth="2" />
                                                        <g>
                                                            <rect x={p1.x + 5} y={(p1.y + p3.y) / 2 - 14} width="80" height="28" rx="6" fill="white" fillOpacity="0.9" className="shadow-sm" />
                                                            <text x={p1.x + 12} y={(p1.y + p3.y) / 2} dominantBaseline="middle" className="text-lg font-medium fill-[#31326F]">h = {height}</text>
                                                        </g>
                                                        <g>
                                                            <rect x={(p2.x + p3.x) / 2 - 40} y={p3.y + 15} width="80" height="28" rx="6" fill="white" fillOpacity="0.9" className="shadow-sm" />
                                                            <text x={(p2.x + p3.x) / 2} y={p3.y + 29} textAnchor="middle" dominantBaseline="middle" className="text-lg font-medium fill-[#31326F]">b = {base}</text>
                                                        </g>
                                                    </>
                                                )}
                                                {mode === 'perimeter' && (
                                                    <>
                                                        <g>
                                                            <rect x={(p1.x + p2.x) / 2 - 50} y={(p1.y + p2.y) / 2 - 14} width="60" height="28" rx="6" fill="white" fillOpacity="0.9" className="shadow-sm" />
                                                            <text x={(p1.x + p2.x) / 2 - 20} y={(p1.y + p2.y) / 2} textAnchor="end" dominantBaseline="middle" className="text-lg font-medium fill-[#31326F]">{sides[0]}</text>
                                                        </g>
                                                        <g>
                                                            <rect x={(p2.x + p3.x) / 2 - 30} y={p3.y + 15} width="60" height="28" rx="6" fill="white" fillOpacity="0.9" className="shadow-sm" />
                                                            <text x={(p2.x + p3.x) / 2} y={p3.y + 29} textAnchor="middle" dominantBaseline="middle" className="text-lg font-medium fill-[#31326F]">{sides[1]}</text>
                                                        </g>
                                                        <g>
                                                            <rect x={(p1.x + p3.x) / 2 + 5} y={(p1.y + p3.y) / 2 - 14} width="60" height="28" rx="6" fill="white" fillOpacity="0.9" className="shadow-sm" />
                                                            <text x={(p1.x + p3.x) / 2 + 35} y={(p1.y + p3.y) / 2} textAnchor="start" dominantBaseline="middle" className="text-lg font-medium fill-[#31326F]">{sides[2]}</text>
                                                        </g>
                                                        <polygon
                                                            points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
                                                            fill="none" stroke="#4FB7B3" strokeWidth="4" strokeDasharray="10,5"
                                                            className="animate-pulse"
                                                        />
                                                    </>
                                                )}
                                            </g>
                                        );
                                    })()}
                                </svg>
                            </div>

                            <div className="interaction-area-modern">
                                <div className="input-container-modern max-w-sm mx-auto">
                                    <div className="relative group">
                                        <input
                                            type="number"
                                            value={userAnswer}
                                            onChange={(e) => {
                                                if (!isSubmitted) setUserAnswer(e.target.value);
                                            }}
                                            disabled={isSubmitted}
                                            className={`input-field-modern ${isSubmitted ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                                            placeholder="Enter your answer"
                                            onKeyDown={(e) => e.key === 'Enter' && userAnswer && !isSubmitted && handleCheck()}
                                        />
                                        <div className="unit-label-modern">
                                            {mode === 'area' ? 'cm²' : 'cm'}
                                        </div>
                                    </div>

                                    {isSubmitted && isCorrect && (
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="feedback-mini correct"
                                        >
                                            <img src={mascotImg} alt="Mascot" className="mascot-feedback" />
                                            <div className="feedback-content">
                                                {feedbackMessage}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

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
                            <button className="view-explanation-btn" onClick={() => setShowExplanation(true)}>
                                <Eye size={20} /> View Explanation
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
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>NEXT <ChevronRight size={24} strokeWidth={3} /></>
                                    ) : (
                                        <>DONE <Check size={24} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!userAnswer}>
                                    SUBMIT <Check size={24} strokeWidth={3} />
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
                            <button className="view-explanation-btn" onClick={() => setShowExplanation(true)}>
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
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "NEXT" : "DONE"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!userAnswer}>SUBMIT</button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>

            <ExplanationModal
                isOpen={showExplanation}
                onClose={() => setShowExplanation(false)}
                isCorrect={isCorrect}
                correctAnswer={`${getCorrectAnswer()} ${mode === 'area' ? 'cm²' : 'cm'}`}
                explanation={
                    mode === 'area'
                        ? `To find the area of a triangle, use the formula:<br/><strong>Area = ½ × base × height<br/>= ½ × ${base} × ${height} = ${getCorrectAnswer()} ${mode === 'area' ? 'cm²' : 'cm'}</strong>`
                        : `To find the perimeter, add all 3 sides:<br/><strong>Perimeter = ${sides[0]} + ${sides[1]} + ${sides[2]} = ${getCorrectAnswer()} ${mode === 'area' ? 'cm²' : 'cm'}</strong>`
                }
            />
        </div>
    );
};

export default TrianglePractice;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, X, ChevronLeft, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../services/api';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import ExplanationModal from '../../../ExplanationModal';
import './polynomials.css';

const SquarePractice = () => {
    const navigate = useNavigate();
    const getSessionData = (key, defaultValue) => {
        const data = sessionStorage.getItem(key);
        return data !== null ? JSON.parse(data) : defaultValue;
    };

    const storageKey = `practice_${window.location.pathname}`;

    const [qIndex, setQIndex] = useState(() => getSessionData(`${storageKey}_qIndex`, 0));
    const [side, setSide] = useState(0);
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
    const SKILL_ID = 6002;
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4AnswersPayload = useRef([]);
    const v4IsFinishedRef = useRef(false);

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
            // sessionId is a ref here
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
            startSession({ nodeId: 'a4061006-0002-0000-0000-000000000000', sessionType: 'practice' });
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
            setSide(data.side);
            setMode(data.mode);
            setUserAnswer(data.userAnswer);
            setIsSubmitted(data.isSubmitted);
            setIsCorrect(data.isCorrect);
            setFeedbackMessage(data.feedbackMessage || '');
            setShowExplanation(false);
        } else {
            const s = Math.floor(Math.random() * 15) + 3;
            const newMode = Math.random() > 0.5 ? 'area' : 'perimeter';

            setSide(s);
            setMode(newMode);
            setUserAnswer('');
            setIsSubmitted(false);
            setIsCorrect(false);
            setShowExplanation(false);
            setFeedbackMessage('');
        }
        questionStartTime.current = Date.now();
    };

    const getCorrectAnswer = () => {
        if (mode === 'area') return side * side;
        return 4 * side;
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
            const messages = ["Great work!", "You got it!", "Square master!"];
            msg = messages[Math.floor(Math.random() * messages.length)];
            setFeedbackMessage(msg);
        } else {
            setShowExplanation(true);
        }

        const newHistory = [...history];
        newHistory[qIndex] = {
            side,
            mode,
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
                question_text: `Find the ${mode} of a square with side ${side}`,
                correct_answer: String(correct),
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
        if (qIndex > 0) setQIndex(prev => prev - 1);
    };

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span className="text-[#31326F] text-lg sm:text-xl">Square</span>
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

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ padding: '2rem' }}>
                            <div className="question-header-modern" style={{ marginBottom: '2rem' }}>
                                <div className="text-center space-y-2 w-full">
                                    <h2 className="text-2xl text-[#31326F]">
                                        Find the <span className="font-normal">{mode === 'area' ? 'Area' : 'Perimeter'}</span> of the square
                                    </h2>
                                </div>
                            </div>

                            <div className="flex-1 flex items-center justify-center w-full py-2 mb-4 min-h-0">
                                <svg viewBox="0 0 300 300" className="w-full h-full max-h-[180px] max-w-[340px] drop-shadow-lg" style={{ objectFit: 'contain' }}>
                                    {(() => {
                                        const rectSize = 180;
                                        const x = (300 - rectSize) / 2;
                                        const y = (300 - rectSize) / 2;

                                        return (
                                            <g>
                                                <rect
                                                    x={x} y={y} width={rectSize} height={rectSize}
                                                    fill={mode === 'area' ? "rgba(244, 113, 181, 0.1)" : "white"}
                                                    stroke="#31326F" strokeWidth="3" rx="4"
                                                />
                                                <g transform={`translate(${x - 25}, ${y + rectSize / 2})`}>
                                                    <rect x="-30" y="-12" width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                                                    <text textAnchor="middle" dominantBaseline="middle" className="text-lg fill-[#31326F]">{side} cm</text>
                                                </g>
                                                <g transform={`translate(${x + rectSize / 2}, ${y + rectSize + 25})`}>
                                                    <rect x="-30" y="-12" width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                                                    <text textAnchor="middle" dominantBaseline="middle" className="text-lg fill-[#31326F]">{side} cm</text>
                                                </g>
                                                {mode === 'perimeter' && (
                                                    <rect
                                                        x={x} y={y} width={rectSize} height={rectSize}
                                                        fill="none" stroke="#F471B5" strokeWidth="4" strokeDasharray="8,4"
                                                        className="animate-pulse" rx="4"
                                                    />
                                                )}
                                            </g>
                                        );
                                    })()}
                                </svg>
                            </div>

                            <div className="interaction-area-modern w-full max-w-md mx-auto">
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <div className="relative w-full">
                                        <input
                                            type="number"
                                            value={userAnswer}
                                            onChange={(e) => {
                                                if (!isSubmitted) setUserAnswer(e.target.value);
                                            }}
                                            disabled={isSubmitted}
                                            className={`w-full text-center text-3xl py-6 rounded-2xl border-2 transition-all placeholder:text-gray-300 ${!isSubmitted ? "bg-indigo-50/50 border-transparent focus:border-[#3B82F6] focus:bg-white text-[#31326F]" : isCorrect ? "bg-green-100 border-green-500 text-green-700" : "bg-red-100 border-red-500 text-red-700"}`}
                                            placeholder="?"
                                            onKeyDown={(e) => e.key === 'Enter' && userAnswer && !isSubmitted && handleCheck()}
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                                            {mode === 'area' ? 'cm²' : 'cm'}
                                        </div>
                                    </div>


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
                        ? `To find the area of a square, multiply side by side:<br/><strong>Area = ${side} × ${side} = ${getCorrectAnswer()} ${mode === 'area' ? 'cm²' : 'cm'}</strong>`
                        : `To find the perimeter, add all 4 sides or multiply side by 4:<br/><strong>Perimeter = 4 × ${side} = ${getCorrectAnswer()} ${mode === 'area' ? 'cm²' : 'cm'}</strong>`
                }
            />
        </div>
    );
};

export default SquarePractice;

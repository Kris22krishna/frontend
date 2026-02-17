import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, X, ChevronLeft, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../services/api';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const SquarePractice = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [side, setSide] = useState(0);
    const [mode, setMode] = useState('perimeter');
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
    const SKILL_ID = 6002;

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

    return (
        <div className="min-h-screen bg-[#F0F8FF] flex flex-col font-sans text-[#31326F] pb-24">
            <header className="p-6 flex justify-between items-center max-w-5xl mx-auto w-full">
                <div className="bg-white px-6 py-2 rounded-full shadow-sm text-[#31326F] font-bold border border-indigo-50">
                    Question {qIndex + 1} / {TOTAL_QUESTIONS}
                </div>
                <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-indigo-50 font-bold text-[#31326F]">
                    {formatTime(timeElapsed)}
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-start p-4 w-full max-w-2xl mx-auto">
                <div className="bg-white rounded-[32px] shadow-xl w-full overflow-hidden border border-indigo-50 p-8 flex flex-col items-center gap-8 min-h-[500px]">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-medium text-[#31326F]">
                            Find the <span className="font-bold">{mode === 'area' ? 'Area' : 'Perimeter'}</span>
                        </h2>
                        <p className="text-gray-400 text-lg">of the square</p>
                    </div>

                    <div className="flex-1 flex items-center justify-center w-full py-4 max-w-[340px] max-h-[340px]">
                        <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-lg">
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
                                            <text textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">{side} cm</text>
                                        </g>
                                        <g transform={`translate(${x + rectSize / 2}, ${y + rectSize + 25})`}>
                                            <rect x="-30" y="-12" width="60" height="24" rx="4" fill="white" fillOpacity="0.8" />
                                            <text textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-[#31326F]">{side} cm</text>
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
                                        {mode === 'area' ? 'cm²' : 'cm'}
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
                correctAnswer={`${getCorrectAnswer()} ${mode === 'area' ? 'sq cm' : 'cm'}`}
                explanation={
                    mode === 'area'
                        ? `To find the area of a square, multiply side by side:<br/><strong>Area = ${side} × ${side} = ${getCorrectAnswer()}</strong>`
                        : `To find the perimeter, add all 4 sides or multiply side by 4:<br/><strong>Perimeter = 4 × ${side} = ${getCorrectAnswer()}</strong>`
                }
            />
        </div>
    );
};

export default SquarePractice;

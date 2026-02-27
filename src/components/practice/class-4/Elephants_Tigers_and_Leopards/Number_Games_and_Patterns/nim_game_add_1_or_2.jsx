import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Zap, Trophy, Play, User, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const RulesPopup = ({ isOpen, onStart }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        className="bg-white rounded-[32px] max-w-2xl w-full shadow-2xl flex flex-col overflow-hidden border-4 border-green-200"
                    >
                        <div className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] p-4 flex flex-col items-center border-b-4 border-green-200">
                            <div className="bg-white p-2 rounded-full shadow-lg border-4 border-green-300 mb-2">
                                <Trophy size={48} className="text-green-600 animate-bounce" />
                            </div>
                            <h2 className="text-3xl font-normal text-[#31326F] text-center drop-shadow-sm">How to play? 🏁</h2>
                        </div>

                        <div className="p-6 bg-gradient-to-b from-white to-gray-50 flex-1 flex flex-col justify-between">
                            <div className="grid grid-cols-2 gap-4 text-lg text-[#31326F] font-medium mb-4">
                                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                                    <div className="bg-blue-100 p-2 rounded-full shrink-0"><User size={20} className="text-blue-600" /></div>
                                    <span className="leading-tight"><b>1.</b> Player 1 starts by choosing either <b>1</b> or <b>2</b>.</span>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100 shadow-sm">
                                    <div className="bg-purple-100 p-2 rounded-full shrink-0"><Monitor size={20} className="text-purple-600" /></div>
                                    <span className="leading-tight"><b>2.</b> Player 2 can also choose either <b>1</b> or <b>2</b> and add it to Player 1's number.</span>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100 shadow-sm">
                                    <div className="bg-yellow-100 p-2 rounded-full shrink-0"><RefreshCw size={20} className="text-yellow-600" /></div>
                                    <span className="leading-tight"><b>3.</b> Both continue choosing <b>1</b> or <b>2</b>, adding to the total.</span>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100 shadow-sm">
                                    <div className="bg-green-100 p-2 rounded-full shrink-0"><Trophy size={20} className="text-green-600" /></div>
                                    <span className="leading-tight"><b>4.</b> The player who reaches the <b>Goal</b> exactly is the winner!</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-pink-50 p-3 rounded-xl border border-pink-100 shadow-sm mb-4 justify-center">
                                <div className="bg-pink-100 p-2 rounded-full shrink-0"><Play size={20} className="text-pink-600" /></div>
                                <span className="font-normal text-pink-700 text-lg"><b>5.</b> Try to win as many rounds as you can!</span>
                            </div>

                            <button
                                onClick={onStart}
                                className="w-full py-4 bg-gradient-to-r from-[#4FB7B3] to-[#31326F] text-white rounded-2xl font-normal text-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 border-4 border-white"
                            >
                                Let's Play! 🚀
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const JungleNimGame = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [showRules, setShowRules] = useState(true);

    const userName = sessionStorage.getItem('firstName') || 'You';

    // Game state
    const [currentSum, setCurrentSum] = useState(0);
    const [turn, setTurn] = useState('player'); // 'player' or 'system'
    const [gameLog, setGameLog] = useState([]);

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1188;
    const SKILL_NAME = "Elephants, Tigers, and Leopards - Nim Game Strategy";
    const TOTAL_QUESTIONS = 5;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

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

        const difficulties = ['easy', 'easy', 'medium', 'medium', 'hard'];

        const generated = difficulties.map((diff, i) => {
            let target;
            let start = 0;
            if (diff === 'easy') target = Math.floor(Math.random() * 6) + 10; // 10-15
            else if (diff === 'medium') target = Math.floor(Math.random() * 6) + 16; // 16-21
            else {
                target = Math.floor(Math.random() * 10) + 25; // 25-34
                start = Math.floor(Math.random() * 8) + 3; // Starts at 3 - 10
            }

            return {
                id: i,
                difficulty: diff,
                target: target,
                startSum: start,
                text: `Round ${i + 1}: Reach ${target} first to win!`,
                explanation: `In the game of Nim (adding 1 or 2), the winning strategy is to reach multiples of 3 away from the target. To reach ${target} from ${start}, you want to hit ${target - 3}, ${target - 6}, etc. If you play perfectly, you can force a win!`
            };
        });
        setSessionQuestions(generated);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (showResults || showRules) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults, showRules]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const currentQ = sessionQuestions[qIndex];
            setCurrentSum(currentQ ? currentQ.startSum : 0);
            setGameLog([]);
            setIsSubmitted(false);
            setIsCorrect(false);
            setTurn('player'); // Always let player start for simplicity, or randomize
        }
    }, [qIndex, sessionQuestions]);

    const currentQuestion = sessionQuestions[qIndex];

    const makeSystemMove = (currentTotal) => {
        if (!currentQuestion) return;
        const { target, difficulty } = currentQuestion;
        let move = 1;
        const remaining = target - currentTotal;

        if (remaining <= 2) {
            move = remaining;
        } else {
            const optimalMove = remaining % 3 === 0 ? Math.floor(Math.random() * 2) + 1 : remaining % 3;
            if (difficulty === 'easy') {
                move = Math.floor(Math.random() * 2) + 1; // Random moves
            } else if (difficulty === 'medium') {
                move = Math.random() > 0.5 ? optimalMove : (Math.floor(Math.random() * 2) + 1); // 50% optimal
            } else {
                move = optimalMove; // Always optimal
            }
            if (move > 2) move = 1;
            if (move < 1) move = 1;
        }

        setTimeout(() => {
            const newSum = currentTotal + move;
            setGameLog(prev => [...prev, { player: 'Skill100', move, total: newSum }]);
            setCurrentSum(newSum);

            if (newSum >= target) {
                handleRoundEnd(false); // System won
            } else {
                setTurn('player');
            }
        }, 1000);
    };

    useEffect(() => {
        if (turn === 'system' && !isSubmitted) {
            makeSystemMove(currentSum);
        }
    }, [turn, isSubmitted]);

    const handlePlayerMove = (move) => {
        if (turn !== 'player' || isSubmitted) return;

        const newSum = currentSum + move;
        setGameLog(prev => [...prev, { player: userName, move, total: newSum }]);
        setCurrentSum(newSum);

        if (newSum >= currentQuestion.target) {
            handleRoundEnd(true); // Player won
        } else {
            setTurn('system');
        }
    };

    const handleRoundEnd = (playerWon) => {
        setIsSubmitted(true);
        setIsCorrect(playerWon);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: playerWon, log: gameLog } }));

        if (!playerWon) setShowExplanationModal(true);

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;

        api.recordAttempt({
            user_id: parseInt(userId, 10),
            session_id: sessionId,
            skill_id: SKILL_ID,
            difficulty_level: currentQuestion.difficulty,
            question_text: String(currentQuestion.text),
            correct_answer: playerWon ? 'win' : 'lose',
            student_answer: playerWon ? 'win' : 'lose',
            is_correct: playerWon,
            solution_text: String(currentQuestion.explanation),
            time_spent_seconds: Math.round(timeSpent / 1000)
        }).catch(console.error);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
            setShowExplanationModal(false);
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId && sessionId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect).length;
                try {
                    await api.createReport({
                        title: SKILL_NAME,
                        type: 'practice',
                        score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: { skill_id: SKILL_ID, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed },
                        user_id: parseInt(userId, 10)
                    });
                    await api.finishSession(sessionId);
                } catch (err) {
                    console.error("Failed to create report", err);
                }
            }
            setShowResults(true);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const total = TOTAL_QUESTIONS;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-semibold text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back to Topics</button>
                    <div className="sun-timer-container">
                        <div className="sun-timer">
                            <div className="sun-rays"></div>
                            <span className="timer-text">Done!</span>
                        </div>
                    </div>
                    <div className="title-area"><h1 className="results-title">Game Report</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-semibold text-[#31326F] mb-2">Game Master! 🏆</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-semibold uppercase tracking-widest text-[#4FB7B3] mb-1">Rounds Won</span>
                                <span className="text-3xl font-semibold text-[#31326F]">{score}/{total}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-semibold uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span>
                                <span className="text-3xl font-semibold text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-semibold uppercase tracking-widest text-[#4FB7B3] mb-1">Win Rate</span>
                                <span className="text-3xl font-semibold text-[#31326F]">{percentage}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="results-actions flex justify-center gap-4 py-8">
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-semibold text-xl" onClick={() => window.location.reload()}><RefreshCw size={24} /> Play Again</button>
                        <button className="px-12 py-4 rounded-2xl border-4 border-[#31326F] text-[#31326F] font-semibold text-xl" onClick={() => navigate(-1)}>Back to Topics</button>
                    </div>
                </main>
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif', background: '#E8F5E9' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-semibold text-sm sm:text-xl shadow-lg whitespace-nowrap">Round {qIndex + 1} / {TOTAL_QUESTIONS} - {currentQuestion.difficulty.toUpperCase()}</div>
                </div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-lg shadow-md">{formatTime(timeElapsed)}</div></div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="w-full">
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }} className="h-full w-full">
                                <div className="bg-white rounded-[3rem] shadow-xl border-4 border-green-200 p-6 flex flex-col md:flex-row gap-6 items-stretch">
                                    <div className="flex-1 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-dashed border-gray-200 pb-4 md:pb-0 md:pr-6">
                                        <h2 className="text-[#31326F] font-normal text-3xl mb-1 text-center leading-tight">Goal: Reach {currentQuestion.target}</h2>
                                        <p className="text-gray-500 font-medium mb-4 text-center text-sm">Add 1 or 2 to the current total.</p>

                                        <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                                            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                                            <div className="absolute inset-2 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center shadow-xl">
                                                <span className="text-white font-normal text-5xl drop-shadow-md">{currentSum}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 w-full max-w-sm">
                                            <button
                                                onClick={() => handlePlayerMove(1)}
                                                disabled={turn !== 'player' || isSubmitted}
                                                className={`flex-1 py-4 rounded-[1.5rem] text-2xl font-normal transition-all transform hover:scale-105 active:scale-95 shadow-lg ${turn === 'player' && !isSubmitted ? 'bg-blue-500 text-white hover:bg-blue-600 border-b-8 border-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed border-none shadow-none'}`}
                                            >
                                                +1
                                            </button>
                                            <button
                                                onClick={() => handlePlayerMove(2)}
                                                disabled={turn !== 'player' || isSubmitted}
                                                className={`flex-1 py-4 rounded-[1.5rem] text-2xl font-normal transition-all transform hover:scale-105 active:scale-95 shadow-lg ${turn === 'player' && !isSubmitted ? 'bg-indigo-500 text-white hover:bg-indigo-600 border-b-8 border-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed border-none shadow-none'}`}
                                            >
                                                +2
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col justify-start">
                                        {currentQuestion.difficulty === 'hard' && !isSubmitted && gameLog.length === 0 && (
                                            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-orange-50 border-2 border-orange-200 text-orange-800 px-4 py-3 rounded-2xl mb-4 shadow-sm font-normal flex items-center gap-2 text-sm">
                                                <Zap className="text-orange-500 shrink-0" size={18} />
                                                <span className="leading-tight">Hint: The total starts at {currentQuestion.startSum} this time!</span>
                                            </motion.div>
                                        )}

                                        <div className="flex-none mb-3 text-center min-h-[40px] flex items-center justify-center">
                                            {!isSubmitted ? (
                                                <div className="text-lg font-normal">
                                                    {turn === 'player' ? (
                                                        <span className="text-blue-600 flex items-center gap-2"><User size={20} /> {userName}'s turn</span>
                                                    ) : (
                                                        <span className="text-purple-600 flex items-center gap-2 animate-pulse"><Monitor size={20} /> Skill100 thinking</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-2xl font-normal flex items-center gap-2 justify-center ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                                    {isCorrect ? <><Trophy size={28} /> {userName.toUpperCase()} WINS! 🎉</> : <><X size={28} /> SKILL100 WINS! 😢</>}
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="flex-1 bg-gray-50 rounded-2xl border-2 border-gray-100 p-4 flex flex-col overflow-hidden">
                                            <h3 className="text-gray-500 font-normal mb-3 uppercase tracking-wider text-xs">Game Log</h3>
                                            <div className="space-y-2 overflow-y-auto max-h-[160px] custom-scrollbar pr-2 flex-col-reverse flex">
                                                {gameLog.slice().reverse().map((log, i) => (
                                                    <div key={i} className="flex justify-between items-center text-sm bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                                                        <span className={`font-normal ${log.player === userName ? 'text-blue-600' : 'text-purple-600'}`}>{log.player} added {log.move}</span>
                                                        <span className="text-gray-600 font-semibold ml-2">Total: {log.total}</span>
                                                    </div>
                                                ))}
                                                {gameLog.length === 0 && <p className="text-gray-400 italic text-sm text-center mt-4">No moves yet. Go first!</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={isCorrect ? "Win" : "Win"} explanation={currentQuestion.explanation} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-normal hover:bg-red-100 transition-colors" onClick={() => navigate(-1)}>Exit Practice</button></div>
                    <div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Strategy</button>}</div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {isSubmitted && (
                                <button className="nav-pill-next-btn bg-green-500 hover:bg-green-600 border-green-600 text-white" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? <>{'Next Round '} <ChevronRight size={28} strokeWidth={3} /></> : <>{'Finish Game '} <Check size={28} strokeWidth={3} /></>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>

            <RulesPopup isOpen={showRules} onStart={() => setShowRules(false)} />
        </div>
    );
};

export default JungleNimGame;

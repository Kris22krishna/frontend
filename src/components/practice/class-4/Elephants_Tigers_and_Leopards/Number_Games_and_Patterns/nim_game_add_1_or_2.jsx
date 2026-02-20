import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Zap, Trophy, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const JungleNimGame = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1188;
    const SKILL_NAME = "Elephants, Tigers, and Leopards - Nim Game Strategy";
    const TOTAL_QUESTIONS = 10;
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

        const generatedQuestions = [];
        const difficulties = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'hard', 'hard', 'hard', 'hard'];

        difficulties.forEach((diff, idx) => {
            generatedQuestions.push(generateQuestion(diff, idx));
        });
        setSessionQuestions(generatedQuestions);

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
            setShuffledOptions(qData.options); // Options already shuffled or fixed
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                // setSelectedOption(previousAnswer.selected); 
                // We handle logic differently for game buttons
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
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

    const generateQuestion = (difficulty, index) => {
        // Game Logic: "Race to Target". Max addition = 2.
        // Winning numbers are equal to Target % 3.
        // E.g. Target 20. Winning: 20, 17, 14, 11, 8, 5, 2.

        let currentNum, targetNum, bestMove, otherMove, type;
        let questionText = "";
        let explanation = "";

        if (difficulty === 'easy') {
            // One step to win. Current is Target - 1 or Target - 2.
            targetNum = randomInt(10, 20);
            const dist = randomInt(1, 2);
            currentNum = targetNum - dist;

            questionText = `You are at **${currentNum}**. The goal is **${targetNum}**. You can add **1** or **2**. What should you add to WIN NOW?`;
            bestMove = dist;
            explanation = `Current: ${currentNum}. Goal: ${targetNum}.<br/>If you add **${bestMove}**, you verify ${currentNum} + ${bestMove} = ${targetNum}. You win!`;
        } else if (difficulty === 'medium') {
            // Need to land on a "Safe" number (Target - 3).
            // Current = Target - 3 - (1 or 2).
            targetNum = randomInt(15, 25);
            // Example: Target 20. Safe: 17.
            // Current could be 15 (Add 2 -> 17) or 16 (Add 1 -> 17).
            const safeNum = targetNum - 3;
            const dist = randomInt(1, 2);
            currentNum = safeNum - dist;

            questionText = `You are at **${currentNum}**. The goal is **${targetNum}**. You want to prevent the opponent from winning on their next turn. What number should you land on?`;
            // Rephrasing: "What should you add to control the game?"
            questionText = `Current Number: **${currentNum}**. Target: **${targetNum}**. You can add 1 or 2. What is the **best move** to eventually win?`;

            bestMove = dist;
            otherMove = dist === 1 ? 2 : 1;

            explanation = `To win, you want to land on **${safeNum}**. (Because from ${safeNum}, the opponent must go to ${safeNum + 1} or ${safeNum + 2}, allowing you to reach ${targetNum}).<br/>${currentNum} + **${bestMove}** = ${safeNum}.`;
        } else { // Hard 
            // Identifying the pattern or winning from earlier.
            targetNum = 30;
            // Pattern check
            questionText = `In a "Race to ${targetNum}" game (adding 1 or 2), which of these numbers is a **Winning Position** (a number you want to land on)?`;
            // Winning positions for 30 (divisible by 3): 27, 24, 21... (Wait, if Target 30 is winning, then 30 = 0 mod 3. So 0, 3, 6... are winning land-on spots).
            // If I land on 27. Opponent adds 1->28 or 2->29. I verify 28->30 (Add 2) or 29->30 (Add 1).
            // So multiples of 3 are winning if Target is multiple of 3.

            // Randomize target offset
            const offset = randomInt(0, 2);
            targetNum = 20 + offset;
            // Series: Target, Target-3, Target-6...
            const winningSeries = [];
            for (let i = targetNum; i >= 0; i -= 3) winningSeries.push(i);

            const correctOption = winningSeries[randomInt(1, 3)]; // Pick e.g. 17 if target 20

            // Distractors: adjacent numbers
            const distractors = [correctOption + 1, correctOption - 1, correctOption + 2].filter(n => n < targetNum && n > 0);

            type = 'selection';
            questionText = `We are playing "Race to ${targetNum}" (add 1 or 2). If you can land on one of these numbers, which one guarantees a win?`;
            explanation = `The winning strategy is to land on multiples of 3 away from the target.<br/>Target ${targetNum}.<br/>${targetNum} - 3 = ${targetNum - 3}, etc.<br/>**${correctOption}** is in this pattern.`;

            return {
                id: index,
                text: questionText,
                correctAnswer: correctOption.toString(),
                solution: explanation,
                options: [correctOption, ...distractors].sort(() => Math.random() - 0.5).map(String),
                type: 'mcq'
            };
        }

        return {
            id: index,
            text: questionText,
            correctAnswer: bestMove.toString(),
            solution: explanation,
            options: ["1", "2"],
            type: 'move',
            currentNum: currentNum,
            targetNum: targetNum
        };
    };

    const handleAnswer = (val) => {
        if (isSubmitted) return;

        const isRight = val === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: val } }));

        if (isRight) {
            setFeedbackMessage("You found the winning move! 🐵");
        } else {
            // setShowExplanationModal(true); // Don't auto show on game? Maybe yes.
        }

        // Log it
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;

        api.recordAttempt({
            user_id: parseInt(userId, 10),
            session_id: sessionId,
            skill_id: SKILL_ID,
            difficulty_level: 'Medium',
            question_text: currentQuestion.text,
            correct_answer: currentQuestion.correctAnswer,
            student_answer: val,
            is_correct: isRight,
            solution_text: currentQuestion.solution,
            time_spent_seconds: Math.round(timeSpent / 1000)
        }).catch(console.error);
    };

    // ... Navigation handlers same as other components ...
    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            // Finish
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

    const handlePrevious = () => {
        if (qIndex > 0) setQIndex(prev => prev - 1);
    };

    if (!currentQuestion && !showResults) return <div>Loading...</div>;

    if (showResults) {
        // Reuse Results Template
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        return (
            <div className="junior-practice-page results-view overflow-y-auto">
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back</button>
                    <div className="title-area"><h1 className="results-title">Game Over!</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 text-center">
                    <h2 className="text-4xl font-black text-[#31326F] mb-6">Score: {score}/{TOTAL_QUESTIONS}</h2>
                    <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl" onClick={() => window.location.reload()}>Play Again</button>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page jungle-theme" style={{ fontFamily: '"Open Sans", sans-serif', background: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)' }}>
            <header className="junior-practice-header">
                <div className="bg-white/90 px-4 py-2 rounded-xl text-[#31326F] font-bold">
                    Q {qIndex + 1} / {TOTAL_QUESTIONS}
                </div>
                <div className="bg-white/90 px-4 py-2 rounded-xl text-[#31326F] font-bold">
                    {formatTime(timeElapsed)}
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="max-w-4xl mx-auto w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={qIndex}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-8 shadow-2xl border-4 border-green-200"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-black text-[#2d5a27] mb-4 leading-relaxed">
                                    <LatexContent html={currentQuestion.text} />
                                </h2>

                                {currentQuestion.type === 'move' && (
                                    <div className="flex justify-center gap-4 my-8">
                                        <div className="flex items-center gap-2 text-2xl font-bold bg-green-100 px-6 py-3 rounded-full text-green-800">
                                            Current: {currentQuestion.currentNum}
                                        </div>
                                        <div className="flex items-center gap-2 text-2xl font-bold bg-yellow-100 px-6 py-3 rounded-full text-yellow-800">
                                            Target: {currentQuestion.targetNum}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                                {currentQuestion.options.map((opt, i) => {
                                    const ans = answers[qIndex];
                                    const isSelected = ans?.selected === opt;
                                    const isOptCorrect = opt === currentQuestion.correctAnswer;

                                    let btnClass = "bg-white border-4 border-green-100 text-[#2d5a27] hover:border-green-300 hover:bg-green-50";
                                    if (isSubmitted) {
                                        if (isOptCorrect) btnClass = "bg-green-500 border-green-600 text-white";
                                        else if (isSelected && !isOptCorrect) btnClass = "bg-red-500 border-red-600 text-white";
                                        else btnClass = "bg-gray-100 border-gray-200 text-gray-400 opacity-50";
                                    }

                                    return (
                                        <button
                                            key={i}
                                            disabled={isSubmitted}
                                            onClick={() => handleAnswer(opt)}
                                            className={`
                                                relative p-8 rounded-3xl text-4xl font-black transition-all transform hover:scale-105 active:scale-95 shadow-lg
                                                ${btnClass}
                                            `}
                                        >
                                            {currentQuestion.type === 'move' ? `+${opt}` : opt}
                                            {isSubmitted && isOptCorrect && (
                                                <div className="absolute top-2 right-2 bg-white text-green-500 rounded-full p-1">
                                                    <Check size={20} strokeWidth={4} />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {isSubmitted && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
                                    <div className={`text-2xl font-black mb-4 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                        {isCorrect ? "Correct Move!" : "Oops! Missed the logic!"}
                                    </div>
                                    {!isCorrect && (
                                        <div className="bg-red-50 p-6 rounded-2xl text-left border-2 border-red-100">
                                            <p className="font-bold text-red-800 mb-2">Strategy Tip:</p>
                                            <div className="text-red-700" dangerouslySetInnerHTML={{ __html: currentQuestion.solution }} />
                                        </div>
                                    )}
                                    <button
                                        className="mt-6 px-10 py-4 bg-[#2d5a27] text-white rounded-2xl font-bold text-xl hover:bg-[#1a3817] transition-all flex items-center gap-2 mx-auto shadow-xl hover:shadow-2xl hover:-translate-y-1"
                                        onClick={handleNext}
                                    >
                                        {qIndex < TOTAL_QUESTIONS - 1 ? "Next Challenge" : "Finish Game"} <ChevronRight />
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Standard Footer */}
            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="text-white/80 hover:text-white font-bold flex items-center gap-2" onClick={() => navigate(-1)}>Exit</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default JungleNimGame;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = [
    "✨ Perfectly balanced! As all things should be. ✨",
    "🌟 Excellent estimation skills! 🌟",
    "🎉 Correct! You've mastered the scales! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! Keep striving for excellence! 🚀",
    "🌿 Perfect! Green and clean! 🌿",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const BalanceScaleComparison = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1197;
    const SKILL_NAME = "Elephants, Tigers, and Leopards - Balance Scale Estimation";
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
            setShuffledOptions(qData.shuffledOptions);
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setSelectedOption(previousAnswer.selected);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setSelectedOption(null);
                setIsSubmitted(false);
                setIsCorrect(false);
            }
        }
    }, [qIndex, sessionQuestions]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')} `;
    };

    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const generateQuestion = (difficulty, index) => {
        let leftText = "";
        let rightText = "";
        let leftValue = 0;
        let rightValue = 0;
        let questionText = "";
        let isAskingHeavier = Math.random() > 0.5;

        if (difficulty === 'easy') {
            let n1 = randomInt(50, 90);
            let n2 = randomInt(50, 90);
            leftValue = n1 + n2;
            let target = Math.round(leftValue / 10) * 10;
            if (target === leftValue) target += 10;
            rightValue = target;
            leftText = `${n1} + ${n2}`;
            rightText = `${rightValue}`;
        } else if (difficulty === 'medium') {
            let n1 = randomInt(110, 500);
            let n2 = randomInt(110, 500);
            leftValue = n1 + n2;
            let target = Math.round(leftValue / 100) * 100;
            if (target === leftValue) target += 50;
            rightValue = target;
            leftText = `${n1} + ${n2}`;
            rightText = `${rightValue}`;
        } else { // hard
            let n1 = randomInt(1100, 2200);
            let n2 = randomInt(1100, 2200);
            leftValue = n1 + n2;
            let target = Math.round(leftValue / 100) * 100;
            if (target === leftValue) target += 100;
            rightValue = target;
            leftText = `${n1} + ${n2}`;
            rightText = `${rightValue}`;
        }

        if (Math.random() > 0.5) {
            let tempVal = leftValue; leftValue = rightValue; rightValue = tempVal;
            let tempText = leftText; leftText = rightText; rightText = tempText;
        }

        questionText = isAskingHeavier ? "Click on the **heavier** side" : "Click on the **lighter** side";
        let correctAnswer = isAskingHeavier ? (leftValue > rightValue ? "Left Side" : "Right Side") : (leftValue < rightValue ? "Left Side" : "Right Side");

        let explanation = `The left side is **${leftValue}**.<br/>The right side is **${rightValue}**.<br/>`;
        explanation += isAskingHeavier ? `**${Math.max(leftValue, rightValue)}** is heavier.` : `**${Math.min(leftValue, rightValue)}** is lighter.`;

        return {
            id: index,
            text: questionText,
            correctAnswer: correctAnswer,
            solution: explanation,
            leftText: leftText,
            rightText: rightText,
            leftValue: leftValue,
            rightValue: rightValue,
            shuffledOptions: ["Left Side", "Right Side"]
        };
    };

    const handleAnswer = (val) => {
        if (isSubmitted) return;
        setSelectedOption(val);
    };

    const handleSubmit = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        api.recordAttempt({
            user_id: parseInt(userId, 10),
            session_id: sessionId,
            skill_id: SKILL_ID,
            difficulty_level: 'Medium',
            question_text: String(currentQuestion.text),
            correct_answer: String(currentQuestion.correctAnswer),
            student_answer: String(selectedOption),
            is_correct: isRight,
            solution_text: String(currentQuestion.solution),
            time_spent_seconds: Math.round(timeSpent / 1000)
        }).catch(console.error);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setIsSubmitted(false);
            setIsCorrect(false);
            setSelectedOption(null);
            setShowExplanationModal(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
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

    const handlePrevious = () => { if (qIndex > 0) setQIndex(prev => prev - 1); };

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const total = TOTAL_QUESTIONS;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-normal text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back to Topics</button>
                    <div className="sun-timer-container">
                        <div className="sun-timer">
                            <div className="sun-rays"></div>
                            <span className="timer-text">Done!</span>
                        </div>
                    </div>
                    <div className="title-area"><h1 className="results-title">Village Report</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-normal text-[#31326F] mb-2">Estimation Mission Complete! 🎉</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-normal uppercase tracking-widest text-[#4FB7B3] mb-1">Correct</span>
                                <span className="text-3xl font-normal text-[#31326F]">{score}/{total}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-normal uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span>
                                <span className="text-3xl font-normal text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-normal uppercase tracking-widest text-[#4FB7B3] mb-1">Accuracy</span>
                                <span className="text-3xl font-normal text-[#31326F]">{percentage}%</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-normal uppercase tracking-widest text-[#4FB7B3] mb-1">Success</span>
                                <span className="text-3xl font-normal text-[#31326F]">{score}</span>
                            </div>
                        </div>
                    </div>
                    <div className="detailed-breakdown w-full mb-12">
                        <h3 className="text-2xl font-normal text-[#31326F] mb-6 px-4">Estimation Log 📜</h3>
                        <div className="space-y-4">
                            {sessionQuestions.map((q, idx) => {
                                const ans = answers[idx];
                                if (!ans) return null;
                                return (
                                    <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`p-6 rounded-[2rem] border-4 ${ans.isCorrect ? 'border-[#E0FBEF] bg-white' : 'border-red-50 bg-white'} relative`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-normal text-white shrink-0 ${ans.isCorrect ? 'bg-[#4FB7B3]' : 'bg-red-400'}`}>{idx + 1}</div>
                                            <div className="flex-1">
                                                <div className="text-lg font-normal text-[#31326F] mb-4 breakdown-question"><LatexContent html={q.text} /></div>
                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="answer-box p-4 rounded-2xl bg-gray-50 border-2 border-gray-100">
                                                        <span className="block text-[10px] font-normal uppercase tracking-widest text-gray-400 mb-1">Your Answer</span>
                                                        <span className={`text-lg font-normal ${ans.isCorrect ? 'text-[#4FB7B3]' : 'text-red-500'}`}>{ans.selected}</span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="answer-box p-4 rounded-2xl bg-[#E0FBEF] border-2 border-[#4FB7B3]/20">
                                                            <span className="block text-[10px] font-normal uppercase tracking-widest text-[#4FB7B3] mb-1">Correct Answer</span>
                                                            <span className="text-lg font-normal text-[#31326F]">{q.correctAnswer}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="explanation-box p-4 rounded-2xl bg-blue-50/50 border-2 border-blue-100">
                                                    <span className="block text-[10px] font-normal uppercase tracking-widest text-blue-400 mb-1">Explain? 💡</span>
                                                    <div className="text-sm font-medium text-gray-600 leading-relaxed"><LatexContent html={q.solution} /></div>
                                                </div>
                                            </div>
                                            <div className="shrink-0 pt-2 text-[#4FB7B3]">{ans.isCorrect ? <Check size={32} strokeWidth={3} /> : <X size={32} strokeWidth={3} className="text-red-400" />}</div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="results-actions flex flex-col md:flex-row justify-center gap-4 py-8 border-t-4 border-dashed border-gray-100">
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-normal text-xl shadow-xl" onClick={() => window.location.reload()}><RefreshCw size={24} /> Try Again</button>
                        <button className="px-12 py-4 rounded-2xl border-4 border-[#31326F] text-[#31326F] font-normal text-xl hover:bg-gray-50 transition-all" onClick={() => navigate(-1)}>Back to Topics</button>
                    </div>
                </main>
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                </div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-lg shadow-md">{formatTime(timeElapsed)}</div></div>
            </header>

            <main className="practice-content-wrapper flex flex-col justify-center min-h-[calc(100vh-200px)] p-4 relative top-[-20px]">
                <div className="w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-[3rem] shadow-xl border-4 border-[#E0FBEF] p-4 md:p-6 lg:p-10 flex flex-col items-center">

                    <div className="flex flex-col justify-center items-center w-full max-w-3xl mb-8 border-b-2 border-dashed border-gray-200 pb-6">
                        <div className="flex justify-center mb-6">
                            <div className="bg-purple-100 p-4 rounded-full shadow-md"><Scale size={32} className="text-purple-600" /></div>
                        </div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-[#31326F] text-center leading-relaxed tracking-wider">
                            <LatexContent html={currentQuestion.text} />
                        </h2>
                    </div>

                    <div className="flex justify-center items-center w-full max-w-4xl mb-16 md:mb-24 relative h-80 md:h-[450px]">
                        {/* Interactive Balance Scale Visual */}
                        <div className="absolute bottom-0 w-40 h-4 md:w-56 bg-gray-400 rounded-full z-10" />
                        <div className="absolute top-[25%] bottom-2 w-4 bg-gray-600 z-10" />
                        <div className="absolute top-[25%] left-1/2 w-4 h-4 bg-yellow-400 rounded-full z-30 transform -translate-x-1/2 -translate-y-1/2" />

                        {/* Scale Beam */}
                        <motion.div
                            className="absolute top-[25%] w-[90%] md:w-[85%] max-w-[600px] md:max-w-[800px] h-3 md:h-4 bg-gray-500 rounded-full z-20 origin-center"
                            animate={{ rotate: isSubmitted ? (currentQuestion.leftValue > currentQuestion.rightValue ? -15 : 15) : 0 }}
                            transition={{ type: "spring", stiffness: 60, damping: 12 }}
                        >
                            {/* Left Option Ball */}
                            <motion.div
                                className="absolute left-0 top-0 origin-top z-40"
                                style={{ x: "-50%" }}
                                animate={{
                                    rotate: isSubmitted ? (currentQuestion.leftValue > currentQuestion.rightValue ? 15 : -15) : 0
                                }}
                                transition={{ type: "spring", stiffness: 60, damping: 12 }}
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-1 md:w-1.5 h-10 md:h-16 bg-gray-400" />
                                    <button
                                        onClick={() => handleAnswer("Left Side")}
                                        disabled={isSubmitted}
                                        className={`w-28 h-28 md:w-36 md:h-36 rounded-full flex justify-center items-center shadow-xl transition-all transform hover:scale-105 active:scale-95 z-40 relative ${selectedOption === "Left Side" ? 'bg-[#31326F] border-4 border-[#4FB7B3] scale-110 shadow-2xl' : 'bg-[#4FB7B3] border-4 border-white'
                                            } ${isSubmitted && "Left Side" === currentQuestion.correctAnswer ? 'bg-green-500 border-white' : ''
                                            } ${isSubmitted && selectedOption === "Left Side" && !isCorrect ? 'bg-red-500 border-white' : ''
                                            }`}
                                    >
                                        <span className="text-xl md:text-3xl font-bold text-white text-center px-3 leading-tight drop-shadow-md"><LatexContent html={currentQuestion.leftText} /></span>
                                    </button>
                                </div>
                            </motion.div>

                            {/* Right Option Ball */}
                            <motion.div
                                className="absolute right-0 top-0 origin-top z-40"
                                style={{ x: "50%" }}
                                animate={{
                                    rotate: isSubmitted ? (currentQuestion.leftValue > currentQuestion.rightValue ? 15 : -15) : 0
                                }}
                                transition={{ type: "spring", stiffness: 60, damping: 12 }}
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-1 md:w-1.5 h-10 md:h-16 bg-gray-400" />
                                    <button
                                        onClick={() => handleAnswer("Right Side")}
                                        disabled={isSubmitted}
                                        className={`w-28 h-28 md:w-36 md:h-36 rounded-full flex justify-center items-center shadow-xl transition-all transform hover:scale-105 active:scale-95 z-40 relative ${selectedOption === "Right Side" ? 'bg-[#31326F] border-4 border-[#4FB7B3] scale-110 shadow-2xl' : 'bg-[#4FB7B3] border-4 border-white'
                                            } ${isSubmitted && "Right Side" === currentQuestion.correctAnswer ? 'bg-green-500 border-white' : ''
                                            } ${isSubmitted && selectedOption === "Right Side" && !isCorrect ? 'bg-red-500 border-white' : ''
                                            }`}
                                    >
                                        <span className="text-xl md:text-3xl font-bold text-white text-center px-3 leading-tight drop-shadow-md"><LatexContent html={currentQuestion.rightText} /></span>
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="flex flex-col justify-center items-center w-full">
                        {isSubmitted && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-8 font-normal text-xl md:text-2xl text-center px-6 py-3 rounded-2xl ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {isCorrect ? feedbackMessage : "The scale doesn't balance that way. Try again!"}
                            </motion.div>
                        )}
                        {!isSubmitted && (
                            <div className="mt-6 text-gray-400 text-sm md:text-base font-normal italic">
                                Click on the correct side of the scale to answer!
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-normal" onClick={() => navigate(-1)}>Exit Practice</button></div>
                    <div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}</div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Previous</button>}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}</button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleSubmit} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2"><button className="bg-red-50 text-red-500 p-2 rounded-lg" onClick={() => navigate(-1)}><X size={20} /></button></div>
                    <div className="mobile-footer-right" style={{ flex: 1, maxWidth: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                        <div className="nav-buttons-group" style={{ gap: '6px' }}>
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>Previous</button>}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleSubmit} disabled={!selectedOption} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>Submit</button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BalanceScaleComparison;

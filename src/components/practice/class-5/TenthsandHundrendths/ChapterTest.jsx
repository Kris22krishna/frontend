import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft, Trophy, Target, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨",
    "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const TOTAL_QUESTIONS = 20;
const SKILL_ID = 5001;
const SKILL_NAME = "Grade 5 - Tenths and Hundredths - Chapter Test";

const ChapterTest = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});
    const [sessionId, setSessionId] = useState(null);

    const timerRef = useRef(null);

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

            for (let i = 0; i < TOTAL_QUESTIONS; i++) {
                const type = rand(1, 3);
                let q = {};

                if (type === 1) { // Fraction to Decimal
                    const den = [10, 100][rand(0, 1)];
                    const num = rand(1, den - 1);
                    const dec = (num / den).toFixed(den === 10 ? 1 : 2);
                    q = {
                        text: `<div class='question-container'><p>Write the fraction $\\frac{${num}}{${den}}$ as a decimal.</p></div>`,
                        correctAnswer: `${dec}`,
                        solution: `$\\frac{${num}}{${den}} = ${dec}$. One zero in denominator means one decimal place, two zeros means two.`,
                        options: shuffle([`${dec}`, `${(num / 10).toFixed(1)}`, `${(num / 1000).toFixed(3)}`, `${num}.0`].filter((v, i, a) => a.indexOf(v) === i))
                    };
                } else if (type === 2) { // Place Value
                    const d1 = rand(1, 9);
                    const d2 = rand(1, 9);
                    const n = parseFloat(`${d1}.${d2}`);
                    q = {
                        text: `<div class='question-container'><p>In the number $${n}$, what is the value of the digit $${d2}$?</p></div>`,
                        correctAnswer: `Tenths`,
                        solution: `The first digit after the decimal point is in the Tenths place.`,
                        options: shuffle([`Tenths`, `Hundredths`, `Ones`, `Tens`])
                    };
                } else { // Comparison
                    const v1 = (rand(1, 50) / 100).toFixed(2);
                    const v2 = (rand(1, 50) / 100).toFixed(2);
                    const isGreater = v1 > v2;
                    q = {
                        text: `<div class='question-container'><p>Is $${v1}$ greater than $${v2}$?</p></div>`,
                        correctAnswer: isGreater ? "Yes" : "No",
                        solution: `$${v1}$ is ${isGreater ? "greater" : "smaller"} than $${v2}$. Compare place by place.`,
                        options: shuffle(["Yes", "No"])
                    };
                }
                newQuestions.push(q);
            }
            setQuestions(newQuestions);
        };

        generateQuestions();

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        timerRef.current = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    const handleCheck = () => {
        const currentQ = questions[currentQIndex];
        const correct = selectedOption === currentQ.correctAnswer;
        setIsCorrect(correct);
        setIsSubmitted(true);
        setFeedbackMessage(correct ? CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)] : "Let's see the step-by-step solution.");

        if (correct) setScore(prev => prev + 1);
        setUserAnswers(prev => ({ ...prev, [currentQIndex]: selectedOption }));

        if (sessionId) {
            api.recordAttempt(sessionId, {
                question_text: currentQ.text,
                user_answer: selectedOption,
                correct_answer: currentQ.correctAnswer,
                is_correct: correct,
                time_taken: 0
            }).catch(console.error);
        }
    };

    const handleNext = () => {
        if (currentQIndex < TOTAL_QUESTIONS - 1) {
            setCurrentQIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsSubmitted(false);
            setFeedbackMessage("");
        } else {
            finishTest();
        }
    };

    const finishTest = async () => {
        setIsFinished(true);
        clearInterval(timerRef.current);
        if (sessionId) {
            const finalScore = Math.round((score / TOTAL_QUESTIONS) * 100);
            await api.createReport(sessionId, {
                total_questions: TOTAL_QUESTIONS,
                correct_answers: score,
                score: finalScore,
                time_taken: timeElapsed
            }).catch(console.error);
            await api.finishSession(sessionId).catch(console.error);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (isFinished) {
        return (
            <div className="junior-practice-page result-view">
                <div className="result-container">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="result-card">
                        <Trophy className="mx-auto text-yellow-500 mb-4" size={80} />
                        <h1 className="text-3xl font-black text-[#31326F] mb-2">Test Completed!</h1>
                        <p className="text-gray-500 mb-6 font-bold text-xl">{SKILL_NAME}</p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100 text-center">
                                <Target className="text-indigo-500 mb-2 mx-auto" size={32} />
                                <div className="text-3xl font-black text-indigo-700">{score}/{TOTAL_QUESTIONS}</div>
                                <div className="text-indigo-400 font-bold uppercase text-xs tracking-wider">Score</div>
                            </div>
                            <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100 text-center">
                                <Clock className="text-emerald-500 mb-2 mx-auto" size={32} />
                                <div className="text-3xl font-black text-emerald-700">{formatTime(timeElapsed)}</div>
                                <div className="text-indigo-400 font-bold uppercase text-xs tracking-wider">Time Taken</div>
                            </div>
                        </div>
                        <button onClick={() => navigate(-1)} className="w-full bg-[#4FB7B3] text-white py-4 rounded-2xl font-black text-xl shadow-lg hover:bg-[#3da39f] transition-all flex items-center justify-center gap-3">
                            Back to Syllabus <ArrowRight size={24} />
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (questions.length === 0) return <div className="junior-practice-page flex items-center justify-center">Loading Questions...</div>;

    const currentQuestion = questions[currentQIndex];

    return (
        <div className="junior-practice-page">
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span className="text-[#31326F] font-bold text-lg sm:text-xl">Chapter Test</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {currentQIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        Time: {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="junior-practice-main">
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto items-start">
                    <div className="flex-1 w-full order-2 lg:order-1">
                        <AnimatePresence mode="wait">
                            <motion.div key={currentQIndex} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="junior-question-card">
                                <div className="question-text">
                                    <LatexContent html={currentQuestion.text} />
                                </div>
                                <div className="options-grid-modern">
                                    {currentQuestion.options.map((option, idx) => {
                                        let statusClass = "";
                                        if (isSubmitted) {
                                            if (option === currentQuestion.correctAnswer) statusClass = "correct";
                                            else if (selectedOption === option) statusClass = "wrong";
                                        } else if (selectedOption === option) {
                                            statusClass = "selected";
                                        }
                                        return (
                                            <button key={idx} className={`option-btn-modern ${statusClass}`} onClick={() => handleOptionSelect(option)} disabled={isSubmitted}>
                                                <LatexContent html={option} />
                                            </button>
                                        );
                                    })}
                                </div>
                                {isSubmitted && isCorrect && (
                                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct mt-6">
                                        <div className="flex items-center gap-3">
                                            <img src={mascotImg} alt="Mascot" className="w-12 h-12 object-contain" />
                                            <span className="font-bold text-emerald-700">{feedbackMessage}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={() => navigate(-1)}>
                            <X size={20} /> Quit Test
                        </button>
                    </div>
                    <div className="bottom-center">
                        <div className="flex gap-2">
                            {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
                                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === currentQIndex ? 'bg-[#4FB7B3] scale-125' : userAnswers[i] ? (questions[i].correctAnswer === userAnswers[i] ? 'bg-emerald-400' : 'bg-red-400') : 'bg-gray-200'}`} />
                            )).slice(Math.max(0, currentQIndex - 4), Math.min(TOTAL_QUESTIONS, currentQIndex + 5))}
                        </div>
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {!isSubmitted ? (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Check Answer <Check size={28} strokeWidth={3} />
                                </button>
                            ) : (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {currentQIndex < TOTAL_QUESTIONS - 1 ? "Next Question" : "Finish Test"} <ChevronRight size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChapterTest;

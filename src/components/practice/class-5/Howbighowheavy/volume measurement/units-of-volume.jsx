import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Spot on! You know your units! ✨",
    "🌟 Conversion Master! 🌟",
    "🎉 Brilliant! The village is proud of your precision! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're flowing with knowledge! 🚀",
    "🌿 Perfect! Every drop counts! 🌿",
    "🎊 Great job! Moving on... 🎊",
    "💎 Precision at its best! 💎"
];

const UnitsOfVolume = () => {
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

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1213;
    const SKILL_NAME = "Units of Volume";

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

        const questions = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            let question = {};
            if (i < 3) {
                // Easy: basic conversions
                if (i === 0) {
                    question = {
                        text: "How many <strong>millilitres (ml)</strong> are there in <strong>1 Litre (L)</strong>?",
                        correctAnswer: "1000 ml",
                        options: ["100 ml", "1000 ml", "10 ml", "10000 ml"],
                        solution: "The prefix 'milli-' means one-thousandth. Therefore, there are <strong>1,000 millilitres</strong> in 1 Litre."
                    };
                } else {
                    const litres = randomInt(2, 9);
                    question = {
                        text: `Convert <strong>${litres} Litres</strong> into millilitres (ml).`,
                        correctAnswer: `${litres * 1000} ml`,
                        options: [`${litres * 1000} ml`, `${litres * 100} ml`, `${litres * 10} ml`, `${litres + 1000} ml`],
                        solution: `Since 1 L = 1,000 ml, we multiply the number of litres by 1,000.<br/>
                                   ${litres} L × 1,000 = <strong>${litres * 1000} ml</strong>.`
                    };
                }
            } else if (i < 6) {
                // Medium: mixed units or word problems
                if (i === 3) {
                    const l = randomInt(1, 5);
                    const ml = randomInt(100, 999);
                    question = {
                        text: `Express <strong>${l * 1000 + ml} ml</strong> in Litres and millilitres.`,
                        correctAnswer: `${l} L ${ml} ml`,
                        options: [`${l} L ${ml} ml`, `${l}.${ml} ml`, `${l + ml} L`, `${l * 10} L ${ml} ml`],
                        solution: `Separate the thousands place for Litres:<br/>
                                   ${l * 1000 + ml} ml = ${l * 1000} ml + ${ml} ml = <strong>${l} L ${ml} ml</strong>.`
                    };
                } else {
                    const l = randomInt(1, 3);
                    const glassSize = 200;
                    const totalMl = l * 1000;
                    const glasses = totalMl / glassSize;
                    question = {
                        text: `A jug contains <strong>${l} Litre(s)</strong> of lemonade. How many <strong>${glassSize} ml</strong> glasses can be filled completely from it?`,
                        correctAnswer: `${glasses}`,
                        options: [`${glasses}`, `${glasses - 1}`, `${glasses + 2}`, `${l * 2}`],
                        solution: `1. Convert Litres to ml: ${l} L = ${totalMl} ml.<br/>
                                   2. Divide by glass capacity: ${totalMl} ml ÷ ${glassSize} ml = <strong>${glasses} glasses</strong>.`
                    };
                }
            } else {
                // Hard: Addition/Subtraction of mixed units or capacity reasoning
                if (i === 7) {
                    const cap = 5000;
                    const current = randomInt(1500, 3500);
                    const needed = cap - current;
                    question = {
                        text: `A bucket has a capacity of <strong>5 Litres</strong>. If it already contains <strong>${current} ml</strong> of water, how much more is needed to fill it to the brim?`,
                        correctAnswer: `${needed} ml`,
                        options: [`${needed} ml`, `${needed + 100} ml`, `${500 - current / 10} ml`, `${cap} ml`],
                        solution: `1. Convert capacity to ml: 5 L = 5,000 ml.<br/>
                                   2. Subtract current amount: 5,000 ml - ${current} ml = <strong>${needed} ml</strong>.`
                    };
                } else {
                    const ml1 = 750;
                    const ml2 = 250;
                    const l = 1;
                    question = {
                        text: `Find the total volume: <strong>${ml1} ml + ${l} Litre + ${ml2} ml</strong>. Give the answer in Litres.`,
                        correctAnswer: `2 Litres`,
                        options: [`2 Litres`, `2000 Litres`, `1.5 Litres`, `1 Litre`],
                        solution: `1. Add the millilitres: ${ml1} ml + ${ml2} ml = 1,000 ml.<br/>
                                   2. Convert ml to L: 1,000 ml = 1 L.<br/>
                                   3. Total = 1 L (from ml) + 1 L = <strong>2 Litres</strong>.`
                    };
                }
            }
            questions.push({
                ...question,
                shuffledOptions: [...question.options].sort(() => Math.random() - 0.5)
            });
        }
        setSessionQuestions(questions);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => { setTimeElapsed(prev => prev + 1); }, 1000);
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
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.round(timeSpent / 1000);
        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: qIndex < 3 ? 'Easy' : (qIndex < 6 ? 'Medium' : 'Hard'),
                question_text: String(question.text || ''),
                correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''),
                is_correct: isCorrect,
                solution_text: String(question.solution || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) { console.error("Failed to record attempt", e); }
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
                try {
                    await api.createReport({
                        title: SKILL_NAME,
                        type: 'practice',
                        score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: {
                            skill_id: SKILL_ID,
                            skill_name: SKILL_NAME,
                            total_questions: TOTAL_QUESTIONS,
                            correct_answers: totalCorrect,
                            time_taken_seconds: timeElapsed
                        },
                        user_id: parseInt(userId, 10)
                    });
                } catch (err) { console.error("Failed to create report", err); }
            }
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            setShowResults(true);
        }
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));
        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleOptionSelect = (option) => { if (isSubmitted) return; setSelectedOption(option); };
    const handlePrevious = () => { if (qIndex > 0) { setQIndex(prev => prev - 1); setShowExplanationModal(false); } };

    if (!currentQuestion && !showResults) return <div className="flex justify-center items-center h-screen text-[#31326F] font-bold tracking-widest text-2xl uppercase italic animate-pulse">Measuring Units...</div>;

    if (showResults) {
        const score = Object.values(answers).filter(val => val.isCorrect).length;
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back to Topics</button>
                    <div className="sun-timer-container"><div className="sun-timer"><div className="sun-rays"></div><span className="timer-text">Done!</span></div></div>
                    <div className="title-area"><h1 className="results-title">Conversion Report</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-1">Assessment Complete! ✨</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center"><span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct</span><span className="text-3xl font-black text-[#31326F]">{score}/{TOTAL_QUESTIONS}</span></div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center"><span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span><span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span></div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center"><span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Accuracy</span><span className="text-3xl font-black text-[#31326F]">{percentage}%</span></div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center"><span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Score</span><span className="text-3xl font-black text-[#31326F]">{score * 10} pts</span></div>
                        </div>
                    </div>
                    <div className="detailed-breakdown w-full mb-12">
                        <h3 className="text-2xl font-black text-[#31326F] mb-6 px-4">Answer Log 📜</h3>
                        <div className="space-y-4">
                            {sessionQuestions.map((q, idx) => {
                                const ans = answers[idx];
                                if (!ans) return null;
                                return (
                                    <div key={idx} className={`p-6 rounded-[2rem] border-4 ${ans.isCorrect ? 'border-[#E0FBEF] bg-white' : 'border-red-50 bg-white'} relative`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white shrink-0 ${ans.isCorrect ? 'bg-[#4FB7B3]' : 'bg-red-400'}`}>{idx + 1}</div>
                                            <div className="flex-1">
                                                <div className="text-lg font-bold text-[#31326F] mb-4"><LatexContent html={q.text} /></div>
                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="answer-box p-4 rounded-2xl bg-gray-50 border-2 border-gray-100"><span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Answer</span><span className={`text-lg font-black ${ans.isCorrect ? 'text-[#4FB7B3]' : 'text-red-500'}`}>{ans.selected}</span></div>
                                                    {!ans.isCorrect && (<div className="answer-box p-4 rounded-2xl bg-[#E0FBEF] border-2 border-[#4FB7B3]/20"><span className="block text-[10px] font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct Answer</span><span className="text-lg font-black text-[#31326F]">{q.correctAnswer}</span></div>)}
                                                </div>
                                                <div className="explanation-box p-4 rounded-2xl bg-blue-50/50 border-2 border-blue-100">
                                                    <span className="block text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Explain? 💡</span>
                                                    <div className="text-sm font-medium text-gray-600"><LatexContent html={q.solution} /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Q{qIndex + 1} / {TOTAL_QUESTIONS}</div>
                </div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{formatTime(timeElapsed)}</div></div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '2.5rem', fontWeight: '400', textAlign: 'center' }}>
                                            <span style={{ color: '#4FB7B3', fontWeight: 'bold', marginRight: '0.5rem' }}>{qIndex + 1}.</span>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                                    style={{ fontFamily: '"Open Sans", sans-serif', fontWeight: '400', fontSize: '2.5rem' }}
                                                    onClick={() => handleOptionSelect(option)} disabled={isSubmitted}><LatexContent html={option} /></button>
                                            ))}
                                        </div>
                                        {isSubmitted && isCorrect && <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>{feedbackMessage}</motion.div>}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>Exit</button></div>
                    <div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}</div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>}
                            {isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UnitsOfVolume;

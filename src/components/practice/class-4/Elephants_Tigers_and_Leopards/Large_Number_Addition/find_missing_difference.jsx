import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Search, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = [
    "✨ Brilliant analysis! You found the hidden path! ✨",
    "🌟 Your calculations are spot on! 🌟",
    "🎉 Correct! The village is cleaner thanks to you! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! Keep striving for excellence! 🚀",
    "🌿 Perfect! Path cleared! 🌿",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const HiddenPathDifference = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(null);
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1195;
    const SKILL_NAME = "Elephants, Tigers, and Leopards - Hidden Path Difference";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const generateQuestion = (difficulty, index) => {
        let start, end, diff, ans;
        let questionText = "";
        let explanation = "";

        if (difficulty === 'easy') {
            start = randomInt(50, 200);
            diff = randomInt(10, 50);
            end = start + diff;

            if (Math.random() > 0.5) {
                questionText = `You start at ** ${start}** meters.You want to reach ** ${end}** meters.How many more meters to go ? `;
                explanation = `${end} - ${start} = ${diff}.<br />(Because ${start} + ${diff} = ${end})`;
                ans = diff;
            } else {
                questionText = `You are at ** ${end}**.How much do you need to walk back to reach ** ${start}**? `;
                explanation = `${end} - ${start} = ${diff} `;
                ans = diff;
            }
        } else if (difficulty === 'medium') {
            start = randomInt(1000, 3000);
            diff = randomInt(100, 900);
            end = start + diff;
            questionText = `** ${start}** + <span style="color:#D97706">?</span> = ** ${end}** `;
            explanation = `To find the missing number, subtract the start from the total.< br /> ${end} - ${start} = ${diff} `;
            ans = diff;
        } else {
            end = randomInt(4000, 8000);
            let part1 = randomInt(1000, 3000);
            let part2 = end - part1;
            ans = part2;

            if (Math.random() > 0.5) {
                questionText = `Total journey is ** ${end}** km.We travelled ** ${part1}** km.How much is left ? `;
                explanation = `${end} - ${part1} = ${part2} `;
            } else {
                let removed = randomInt(1000, 2000);
                let remaining = randomInt(2000, 4000);
                let original = removed + remaining;
                ans = original;
                questionText = `After unloading ** ${removed}** kg, the truck still has ** ${remaining}** kg.What was the ** original ** weight ? `;
                explanation = `Original = Unloaded + Remaining < br /> ${removed} + ${remaining} = ${original} `;
            }
        }

        const correctVal = ans.toString();
        const distractors = new Set([correctVal]);
        while (distractors.size < 4) {
            let offset = randomInt(1, 5) * (difficulty === 'hard' ? 50 : 10);
            if (Math.random() > 0.5) offset *= -1;
            const res = parseInt(correctVal) + offset;
            if (res > 0 && res !== parseInt(correctVal)) distractors.add(res.toString());
        }

        let missing = 'sub';
        if (questionText.includes('What was the **original** weight?')) missing = 'min';
        else if (questionText.indexOf('?') === questionText.indexOf('**start**')) missing = 'min';
        else if (ans !== diff) missing = 'min';

        return {
            id: index,
            text: questionText,
            correctAnswer: correctVal,
            solution: explanation,
            start: start || 0,
            diff: diff || ans || 0,
            end: end || 0,
            missing: missing,
            shuffledOptions: [] // No longer used
        };
    };

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
        setTimeout(() => {
            setSessionQuestions(generatedQuestions);
        }, 0);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        setTimeout(() => {
            if (sessionQuestions.length > 0) {
                const qData = sessionQuestions[qIndex];
                setCurrentQuestion(qData);
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
        }, 0);
    }, [qIndex, sessionQuestions, answers]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')} `;
    };

    const handleInputValue = (val) => {
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
                        <h2 className="text-4xl font-normal text-[#31326F] mb-2">Exploration Complete! 🗺️</h2>
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
                        <h3 className="text-2xl font-normal text-[#31326F] mb-6 px-4">Exploration Log 📜</h3>
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

            <main className="practice-content-wrapper flex items-center justify-center min-h-[calc(100vh-200px)] p-4 relative top-[-20px]">
                <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-[3rem] shadow-xl border-4 border-[#E0FBEF] p-6 lg:p-10 flex flex-col md:flex-row gap-8 items-stretch">

                    <div className="flex-1 flex flex-col justify-center items-center border-b-2 md:border-b-0 md:border-r-2 border-dashed border-gray-200 pb-6 md:pb-0 md:pr-8">
                        <div className="bg-orange-100 p-6 rounded-full mb-8 shadow-md border-4 border-orange-200"><Map size={64} className="text-orange-600" /></div>
                        <h2 className="text-2xl md:text-3xl font-normal text-[#31326F] text-center mb-4 leading-relaxed tracking-wider">
                            <LatexContent html={currentQuestion.text} />
                        </h2>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="w-full max-w-lg flex flex-col items-center gap-8 relative">
                            {/* Path Builder Visual */}
                            <div className="flex items-center justify-between w-full relative z-10 px-4">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#31326F] bg-white shadow-xl flex items-center justify-center flex-col z-20">
                                    <span className="text-3xl md:text-4xl font-normal text-[#31326F]">
                                        {currentQuestion.missing === 'min' ? '?' : currentQuestion.min || currentQuestion.start}
                                    </span>
                                    <span className="text-[10px] uppercase text-gray-400 font-semibold mt-1">Start</span>
                                </div>

                                <div className="flex-1 flex justify-center items-center relative z-10">
                                    <div className="absolute w-full h-2 bg-gray-300 rounded-full top-1/2 transform -translate-y-1/2 -z-10" />
                                    <div className={`p-4 md:p-6 w-32 md:w-40 flex flex-col items-center justify-center rounded-3xl transition-all shadow-lg border-4 ${isSubmitted && isCorrect ? 'border-green-500 bg-green-50 shadow-green-200' : isSubmitted && !isCorrect ? 'border-red-500 bg-red-50 shadow-red-200' : 'border-[#4FB7B3] bg-[#E0FBEF] shadow-[#4FB7B3]/20'}`}>
                                        <div className="flex items-center gap-1 mb-2 text-[#4FB7B3]">
                                            <span className="text-2xl font-bold">+</span>
                                        </div>
                                        {currentQuestion.missing === 'sub' ? (
                                            <input
                                                type="text"
                                                inputMode="text"
                                                value={selectedOption || ''}
                                                onChange={(e) => handleInputValue(e.target.value)}
                                                disabled={isSubmitted}
                                                className={`w-full text-center bg-transparent focus:outline-none text-2xl md:text-3xl font-normal border-b-2 border-dashed ${isSubmitted ? 'border-transparent' : 'border-[#4FB7B3]'} ${isSubmitted && isCorrect ? 'text-green-600' : isSubmitted && !isCorrect ? 'text-red-600' : 'text-[#31326F]'}`}
                                                placeholder="?"
                                                autoFocus
                                            />
                                        ) : (
                                            <span className="text-2xl md:text-3xl font-normal text-[#31326F]">{currentQuestion.sub || currentQuestion.diff}</span>
                                        )}
                                        <span className="text-[10px] uppercase text-[#4FB7B3] font-semibold mt-2">Step</span>
                                    </div>
                                </div>

                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#31326F] bg-[#31326F] text-white shadow-xl flex items-center justify-center flex-col z-20">
                                    <span className="text-3xl md:text-4xl font-normal">
                                        {currentQuestion.missing === 'diff' ? '?' : currentQuestion.diff || currentQuestion.end}
                                    </span>
                                    <span className="text-[10px] uppercase text-white/70 font-semibold mt-1">End</span>
                                </div>
                            </div>

                            {(currentQuestion.missing === 'min' || currentQuestion.missing === 'diff') && (
                                <div className={`mt-8 p-4 md:p-6 w-full max-w-sm flex flex-col items-center justify-center rounded-[2rem] transition-all shadow-lg border-4 mx-auto ${isSubmitted && isCorrect ? 'border-green-500 bg-green-50 shadow-green-200' : isSubmitted && !isCorrect ? 'border-red-500 bg-red-50 shadow-red-200' : 'border-[#4FB7B3] bg-[#E0FBEF] shadow-[#4FB7B3]/20'}`}>
                                    <span className="text-sm font-semibold text-[#4FB7B3] uppercase tracking-wider mb-2">
                                        {currentQuestion.missing === 'min' ? 'Find Start Number' : 'Find End Number'}
                                    </span>
                                    <input
                                        type="text"
                                        inputMode="text"
                                        value={selectedOption || ''}
                                        onChange={(e) => handleInputValue(e.target.value)}
                                        disabled={isSubmitted}
                                        className={`w-full text-center bg-transparent focus:outline-none text-3xl md:text-4xl font-normal ${isSubmitted && isCorrect ? 'text-green-600' : isSubmitted && !isCorrect ? 'text-red-600' : 'text-[#31326F]'}`}
                                        placeholder="Type answer here..."
                                        autoFocus
                                    />
                                </div>
                            )}

                        </div>
                        {isSubmitted && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-8 font-normal text-xl md:text-2xl text-center px-6 py-3 rounded-2xl ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {isCorrect ? feedbackMessage : "Check your math!"}
                            </motion.div>
                        )}
                        {!isSubmitted && (
                            <div className="mt-8 text-gray-400 text-lg md:text-xl font-normal italic">
                                Fill in the missing stone to complete the path!
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-normal hover:bg-red-100 transition-colors" onClick={() => navigate(-1)}>Exit Practice</button></div>
                    <div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}</div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Previous</button>}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? <>{'Next '} <ChevronRight size={28} strokeWidth={3} /></> : <>{'Done '} <Check size={28} strokeWidth={3} /></>}</button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleSubmit} disabled={!selectedOption}>{'Submit '} <Check size={28} strokeWidth={3} /></button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2"><button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={() => navigate(-1)}><X size={20} /></button></div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}>Previous</button>}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleSubmit} disabled={!selectedOption}>Submit</button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HiddenPathDifference;

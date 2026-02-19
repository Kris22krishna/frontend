import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const GridRectangle = ({ width, height, unit = "cm" }) => {
    const cellSize = 30;
    const cells = [];
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            cells.push(
                <rect
                    key={`${i}-${j}`}
                    x={j * cellSize}
                    y={i * cellSize}
                    width={cellSize}
                    height={cellSize}
                    fill="#E0F2FE"
                    stroke="#31326F"
                    strokeWidth="1"
                />
            );
        }
    }
    return (
        <div className="flex flex-col items-center my-6">
            <svg width={width * cellSize} height={height * cellSize} className="shadow-md rounded-sm">
                {cells}
            </svg>
            <div className="mt-2 text-sm text-slate-500 italic">Each square represents 1 sq {unit}</div>
        </div>
    );
};

const DimensionRectangle = ({ width, height, unit = "cm" }) => {
    return (
        <div className="flex flex-col items-center my-12">
            <div
                className="relative border-4 border-[#31326F] bg-indigo-50 flex items-center justify-center rounded-lg shadow-inner"
                style={{ width: `${width * 40}px`, height: `${height * 40}px`, maxWidth: '300px', maxHeight: '200px' }}
            >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-black text-[#31326F]">
                    {width} {unit}
                </div>
                <div className="absolute top-1/2 -right-16 -translate-y-1/2 font-black text-[#31326F]">
                    {height} {unit}
                </div>
            </div>
        </div>
    );
};

const CompositeShape = ({ parts }) => {
    const cellSize = 30;
    return (
        <div className="flex flex-col items-center my-8">
            <svg
                width={Math.max(...parts.map(p => p.x + p.w)) * cellSize}
                height={Math.max(...parts.map(p => p.y + p.h)) * cellSize}
            >
                {parts.map((p, i) => (
                    <rect
                        key={i}
                        x={p.x * cellSize}
                        y={p.y * cellSize}
                        width={p.w * cellSize}
                        height={p.h * cellSize}
                        fill="#E0F2FE"
                        stroke="#31326F"
                        strokeWidth="2"
                    />
                ))}
            </svg>
            <div className="mt-2 text-sm text-slate-500 italic">Each unit square is 1 sq cm</div>
        </div>
    );
};

const CORRECT_MESSAGES = [
    "✨ Amazing! You're an area expert! ✨",
    "🌟 You're an area wizard! 🌟",
    "🎉 Correct! You really know your shapes! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! Keep striving for excellence! 🚀",
    "💎 Spot on! Excellent! 💎"
];

const FindingArea = () => {
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

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1159;
    const SKILL_NAME = "Finding Area";

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

        const generateQuestions = () => {
            const qs = [];
            const usedValues = new Set();
            while (qs.length < 3) {
                const w = randomInt(3, 6); const h = randomInt(2, 4);
                const area = w * h;
                const valStr = `easy-${w}-${h}`;
                if (!usedValues.has(valStr)) {
                    usedValues.add(valStr);
                    const optionsSet = new Set([`${area} sq cm`, `${area + 2} sq cm`, `${area - 1} sq cm`, `${(w + h) * 2} sq cm`]);
                    while (optionsSet.size < 4) {
                        optionsSet.add(`${area + randomInt(3, 8)} sq cm`);
                    }
                    qs.push({
                        text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 2.2rem; font-weight: normal; text-align: center;'>What is the <strong>area</strong> of the rectangle on the grid?</div>`,
                        correctAnswer: `${area} sq cm`,
                        solution: `Count the squares: $${h}$ rows $\\times$ $${w}$ columns $= ${area}$ sq cm.`,
                        visual: <GridRectangle width={w} height={h} />,
                        options: Array.from(optionsSet),
                        difficulty: "Easy"
                    });
                }
            }
            while (qs.length < 6) {
                const w = randomInt(7, 12); const h = randomInt(4, 9);
                const area = w * h;
                const valStr = `medium-${w}-${h}`;
                if (!usedValues.has(valStr)) {
                    usedValues.add(valStr);
                    const optionsSet = new Set([`${area} sq cm`, `${area + 10} sq cm`, `${(w + h) * 2} sq cm`, `${area - 5} sq cm`]);
                    while (optionsSet.size < 4) {
                        optionsSet.add(`${area + randomInt(5, 15)} sq cm`);
                    }
                    qs.push({
                        text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 2.2rem; font-weight: normal; text-align: center;'>A rectangle is $${w}$ cm long and $${h}$ cm wide. What is its <strong>area</strong>?</div>`,
                        correctAnswer: `${area} sq cm`,
                        solution: `Area $= \\text{Length} \\times \\text{Width} = ${w} \\times ${h} = ${area}$ sq cm.`,
                        visual: <DimensionRectangle width={6} height={4} unit="cm" />,
                        options: Array.from(optionsSet),
                        difficulty: "Medium"
                    });
                }
            }
            // Add hard
            qs.push({
                text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 2.2rem; font-weight: normal; text-align: center;'>Find the total <strong>area</strong> of this composite shape.</div>`,
                correctAnswer: `23 sq cm`,
                solution: `Split into two rectangles: $(3 \\times 5) + (4 \\times 2) = 15 + 8 = 23$ sq cm.`,
                visual: <CompositeShape parts={[{ x: 0, y: 0, w: 3, h: 5 }, { x: 3, y: 3, w: 4, h: 2 }]} />,
                options: [`23 sq cm`, `28 sq cm`, `18 sq cm`, `19 sq cm`],
                difficulty: "Hard"
            });
            while (qs.length < 10) qs.push(qs[0]); // Pad for completeness

            const sessionQs = qs.map(q => ({
                ...q,
                shuffledOptions: [...q.options].sort(() => Math.random() - 0.5)
            }));
            setSessionQuestions(sessionQs);
        };
        generateQuestions();

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
    }, [qIndex, sessionQuestions, answers]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current + (isTabActive.current ? Date.now() - questionStartTime.current : 0);
        const seconds = Math.round(timeSpent / 1000);
        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID,
                difficulty_level: question.difficulty || 'Medium',
                question_text: String(question.text || ''), correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''), is_correct: isCorrect,
                solution_text: String(question.solution || ''), time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) { console.error(e); }
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
            accumulatedTime.current = 0; questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
                try {
                    await api.createReport({
                        title: SKILL_NAME, type: 'practice', score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed },
                        user_id: parseInt(userId, 10)
                    });
                } catch (err) { console.error(err); }
            }
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            setShowResults(true);
        }
    };

    const handleOptionSelect = (option) => { if (!isSubmitted) setSelectedOption(option); };
    const handlePrevious = () => { if (qIndex > 0) { setQIndex(prev => prev - 1); setShowExplanationModal(false); } };

    if (!currentQuestion && !showResults) return <div className="flex h-screen items-center justify-center text-2xl font-bold text-[#31326F]">Loading...</div>;

    if (showResults) {
        const score = Object.values(answers).filter(ans => ans.isCorrect).length;
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back to Topics</button>
                    <div className="sun-timer-container"><div className="sun-timer"><div className="sun-rays"></div><span className="timer-text">Done!</span></div></div>
                    <div className="title-area"><h1 className="results-title">Area Calculation Report</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-2">Adventure Complete! 🎉</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}/{TOTAL_QUESTIONS}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span>
                                <span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Accuracy</span>
                                <span className="text-3xl font-black text-[#31326F]">{percentage}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="results-actions flex flex-col md:flex-row justify-center gap-4 py-8 border-t-4 border-dashed border-gray-100">
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-semibold text-xl shadow-xl hover:-translate-y-1 transition-all" onClick={() => window.location.reload()}><RefreshCw size={24} /> Play Again</button>
                        <button className="px-12 py-4 rounded-2xl border-4 border-[#31326F] text-[#31326F] font-semibold text-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3" onClick={() => navigate(-1)}>Back to Topics</button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <button className="bg-white/90 backdrop-blur-md p-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] shadow-md hover:bg-white transition-all" onClick={() => navigate(-1)}><X size={24} /></button>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-semibold text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>
            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '2.5rem', fontWeight: '500', textAlign: 'center', maxHeight: 'none', overflow: 'visible' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="visual-area flex justify-center">{currentQuestion.visual}</div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`} style={{ fontFamily: '"Open Sans", sans-serif', fontWeight: '500', fontSize: '2rem' }} onClick={() => handleOptionSelect(option)} disabled={isSubmitted}><LatexContent html={option} /></button>
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
                            {isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>}
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>}
                    </div>
                    <div className="mobile-footer-right" style={{ flex: 1, maxWidth: '70%', display: 'flex', justifyContent: 'flex-end' }}>
                        <div className="nav-buttons-group" style={{ gap: '6px' }}>
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>Prev</button>}
                            {isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>Submit</button>}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FindingArea;

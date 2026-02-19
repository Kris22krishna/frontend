import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const GridPerimeter = ({ points, cellSize = 30 }) => {
    const maxX = Math.max(...points.map(p => p[0])); const maxY = Math.max(...points.map(p => p[1]));
    const w = maxX + 1; const h = maxY + 1;
    return (
        <div className="flex flex-col items-center my-8">
            <div className="relative border-4 border-[#31326F] rounded-lg shadow-lg overflow-hidden bg-white" style={{ width: w * cellSize, height: h * cellSize }}>
                <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${w}, 1fr)`, gridTemplateRows: `repeat(${h}, 1fr)` }}>
                    {[...Array(w * h)].map((_, i) => (
                        <div key={i} className="border border-slate-100 flex items-center justify-center bg-indigo-50/30"></div>
                    ))}
                </div>
            </div>
            <div className="mt-4 text-sm text-slate-500 font-bold italic">Each grid square side = 1 cm</div>
        </div>
    );
};

const DimensionPerimeterObject = ({ w, h, unit = "cm" }) => {
    return (
        <div className="flex flex-col items-center my-12">
            <div
                className="relative border-[6px] border-[#31326F] bg-white rounded-xl shadow-xl flex items-center justify-center transition-all hover:scale-105"
                style={{ width: `${w * 30}px`, height: `${h * 30}px`, maxWidth: '300px', maxHeight: '200px' }}
            >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#31326F] text-white px-3 py-1 rounded-full font-black text-sm">{w} {unit}</div>
                <div className="absolute top-1/2 -right-16 -translate-y-1/2 bg-[#31326F] text-white px-3 py-1 rounded-full font-black text-sm">{h} {unit}</div>
            </div>
        </div>
    );
};

const IrregularPerimeter = ({ path, width, height, cellSize = 30 }) => {
    return (
        <div className="flex flex-col items-center my-8">
            <svg width={width * cellSize + 10} height={height * cellSize + 10} className="bg-white">
                <path d={path} fill="#E0F2FE" stroke="#31326F" strokeWidth="4" strokeLinejoin="round" />
            </svg>
            <div className="mt-4 text-sm text-slate-500 font-bold italic">Calculate the total boundary length</div>
        </div>
    );
}

const CORRECT_MESSAGES = [
    "✨ Amazing! You're a perimeter pro! ✨",
    "🌟 You're a boundary wizard! 🌟",
    "🎉 Correct! You really know your lengths! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! Keep striving for excellence! 🚀",
    "💎 Spot on! Excellent! 💎"
];

const FindingPerimeter = () => {
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
    const SKILL_ID = 1163;
    const SKILL_NAME = "Finding Perimeter";

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
            for (let i = 0; i < 3; i++) {
                const w = randomInt(4, 7); const h = randomInt(3, 5); const p = 2 * (w + h);
                const pts = []; for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) pts.push([x, y]);
                const optionsSet = new Set([`${p} cm`, `${w * h} cm`, `${p + 2} cm`, `${p - 2} cm`]);
                while (optionsSet.size < 4) {
                    optionsSet.add(`${p + randomInt(3, 10)} cm`);
                }
                qs.push({
                    text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 2.2rem; font-weight: normal; text-align: center;'>Find the <strong>perimeter</strong> of the shape on the grid.</div>`,
                    correctAnswer: `${p} cm`,
                    solution: `Boundary length $= ${w} + ${h} + ${w} + ${h} = ${p}$ cm.`,
                    visual: <GridPerimeter points={pts} />,
                    options: Array.from(optionsSet),
                    difficulty: "Easy"
                });
            }
            for (let i = 0; i < 3; i++) {
                const w = randomInt(8, 15); const h = randomInt(5, 10); const p = 2 * (w + h);
                const optionsSet = new Set([`${p} cm`, `${w * h} cm`, `${p + 10} cm`, `${w + h} cm`]);
                while (optionsSet.size < 4) {
                    optionsSet.add(`${p + randomInt(2, 5) * 2} cm`);
                }
                qs.push({
                    text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 2.2rem; font-weight: normal; text-align: center;'>A rectangle has Length = $${w}$ cm and Width = $${h}$ cm. What is its <strong>perimeter</strong>?</div>`,
                    correctAnswer: `${p} cm`,
                    solution: `Perimeter $= 2 \\times (L + W) = 2 \\times (${w} + ${h}) = ${p}$ cm.`,
                    visual: <DimensionPerimeterObject w={6} h={4} />,
                    options: Array.from(optionsSet),
                    difficulty: "Medium"
                });
            }
            for (let i = 0; i < 4; i++) {
                if (i % 2 === 0) {
                    qs.push({
                        text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 2.2rem; font-weight: normal; text-align: center;'>What is the <strong>perimeter</strong> of this L-shape?</div>`,
                        correctAnswer: "24 cm",
                        solution: `Sum of all side lengths $= 24$ cm.`,
                        visual: <IrregularPerimeter path="M 5,5 L 95,5 L 95,95 L 215,95 L 215,155 L 5,155 Z" width={8} height={6} />,
                        options: ["24 cm", "20 cm", "30 cm", "28 cm"],
                        difficulty: "Hard"
                    });
                } else {
                    const p = randomInt(30, 50) * 2; const l = randomInt(10, 20); const w = (p / 2) - l;
                    const optionsSet = new Set([`${w} cm`, `${w + 5} cm`, `${l} cm`, `${p / 2} cm`]);
                    while (optionsSet.size < 4) {
                        optionsSet.add(`${w + randomInt(1, 4) * 2} cm`);
                    }
                    qs.push({
                        text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 2.2rem; font-weight: normal; text-align: center;'>If Perimeter is $${p}$ cm and Length is $${l}$ cm, what is the <strong>width</strong>?</div>`,
                        correctAnswer: `${w} cm`,
                        solution: `Width $= (\\text{Perimeter} \\div 2) - \\text{Length} = (${p} \\div 2) - ${l} = ${w}$ cm.`,
                        visual: <div className="h-24 flex items-center justify-center text-4xl font-black text-indigo-400 opacity-30">P = {p}</div>,
                        options: Array.from(optionsSet),
                        difficulty: "Hard"
                    });
                }
            }
            const sessionQs = qs.slice(0, 10).map(q => ({
                ...q, shuffledOptions: [...q.options].sort(() => Math.random() - 0.5)
            }));
            setSessionQuestions(sessionQs);
        };
        generateQuestions();
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const qData = sessionQuestions[qIndex];
            setCurrentQuestion(qData);
            setShuffledOptions(qData.shuffledOptions);
            const ans = answers[qIndex];
            if (ans) { setSelectedOption(ans.selected); setIsSubmitted(true); setIsCorrect(ans.isCorrect); }
            else { setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); }
        }
    }, [qIndex, sessionQuestions, answers]);

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    const recordQuestionAttempt = async (q, selected, right) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current + (isTabActive.current ? Date.now() - questionStartTime.current : 0);
        const secs = Math.round(timeSpent / 1000);
        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID,
                difficulty_level: q.difficulty || 'Medium',
                question_text: String(q.text || ''), correct_answer: String(q.correctAnswer || ''),
                student_answer: String(selected || ''), is_correct: right,
                solution_text: String(q.solution || ''), time_spent_seconds: secs >= 0 ? secs : 0
            });
        } catch (e) { console.error(e); }
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const right = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(right); setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: right, selected: selectedOption } }));
        if (right) setFeedbackMessage(CORRECT_MESSAGES[randomInt(0, CORRECT_MESSAGES.length - 1)]);
        else setShowExplanationModal(true);
        recordQuestionAttempt(currentQuestion, selectedOption, right);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1); setShowExplanationModal(false);
            setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
            accumulatedTime.current = 0; questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
                try {
                    await api.createReport({
                        title: SKILL_NAME, type: 'practice', score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, time_taken_seconds: timeElapsed },
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
                    <div className="title-area"><h1 className="results-title">Perimeter Report</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 text-center">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-2">Adventure Complete! 🎉</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (<motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}><Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} /></motion.div>))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF]">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}/{TOTAL_QUESTIONS}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF]">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span>
                                <span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF]">
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
                                    <div className="question-header-modern"><h2 className="question-text-modern" style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '2.5rem', fontWeight: '500', textAlign: 'center', maxHeight: 'none', overflow: 'visible' }}><LatexContent html={currentQuestion.text} /></h2></div>
                                    <div className="visual-area flex justify-center py-4">{currentQuestion.visual}</div>
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
                    <div className="bottom-right"><div className="nav-buttons-group">{qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>}{isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>}</div></div>
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

export default FindingPerimeter;

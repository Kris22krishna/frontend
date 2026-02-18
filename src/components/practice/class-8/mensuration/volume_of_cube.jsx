import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, Pencil, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Whiteboard from '../../../Whiteboard';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import { FullScreenScratchpad } from '../../../FullScreenScratchpad';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const CORRECT_MESSAGES = ["✨ Amazing job! You got it! ✨", "🌟 Brilliant! Keep it up! 🌟", "🎉 Correct! You're a math-star! 🎉", "✨ Fantastic work! ✨", "🚀 Super! You're on fire! 🚀", "🌈 Perfect! Well done! 🌈", "🎊 Great job! Moving on... 🎊", "💎 Spot on! Excellent! 💎"];

const VolumeOfCubeComponent = () => {
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
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const history = useRef({});
    const isTabActive = useRef(true);
    const SKILL_ID = 1131;
    const SKILL_NAME = "Mensuration - Volume of Cube";
    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) { api.createPracticeSession(userId, SKILL_ID).then(sess => { if (sess && sess.session_id) setSessionId(sess.session_id); }).catch(err => console.error("Failed to start session", err)); }
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        const handleVisibilityChange = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", handleVisibilityChange); };
    }, []);

    useEffect(() => { generateQuestion(qIndex); }, [qIndex]);

    const generateQuestion = (index) => {
        const questionTypes = ['basicVol', 'basicVol2', 'findSide', 'sideFromVol', 'compareVols', 'waterFill', 'doubledSide', 'volRatio', 'multiStep', 'realWorld'];
        if (!window.shuffledMensQ_1131) { window.shuffledMensQ_1131 = [...questionTypes].sort(() => Math.random() - 0.5); }
        if (history.current[index]) { const stored = history.current[index]; setCurrentQuestion(stored.qData); setShuffledOptions(stored.shuffledOptions); setSelectedOption(stored.selectedOption); setIsSubmitted(stored.isSubmitted); setIsCorrect(stored.isCorrect); return; }
        const questionType = window.shuffledMensQ_1131[index] || 'basicVol';
        let qData;
        switch (questionType) {
            case 'basicVol': qData = basicVol(); break;
            case 'basicVol2': qData = basicVol2(); break;
            case 'findSide': qData = findSide(); break;
            case 'sideFromVol': qData = sideFromVol(); break;
            case 'compareVols': qData = compareVols(); break;
            case 'waterFill': qData = waterFill(); break;
            case 'doubledSide': qData = doubledSide(); break;
            case 'volRatio': qData = volRatio(); break;
            case 'multiStep': qData = multiStep(); break;
            case 'realWorld': qData = realWorld(); break;
            default: qData = basicVol();
        }
        const newShuffledOptions = [...qData.options].sort(() => Math.random() - 0.5);
        history.current[index] = { qData, shuffledOptions: newShuffledOptions, selectedOption: null, isSubmitted: false, isCorrect: false };
        setShuffledOptions(newShuffledOptions); setCurrentQuestion(qData); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
    };

    // EASY 1
    const basicVol = () => {
        const a = randomInt(2, 10);
        const vol = a * a * a;
        const correctAnswer = `$${vol}$ cm³`;
        return {
            text: `<div class='question-container'><p>Find the volume of a cube with side $${a}$ cm.</p></div>`,
            correctAnswer,
            solution: `Volume of cube $= a^3 = ${a}^3 = ${vol}$ cm³`,
            options: [`$${vol}$ cm³`, `$${6 * a * a}$ cm³`, `$${a * a}$ cm³`, `$${vol + a}$ cm³`]
        };
    };

    // EASY 2
    const basicVol2 = () => {
        const a = randomInt(3, 12);
        const vol = a * a * a;
        const correctAnswer = `$${vol}$ m³`;
        return {
            text: `<div class='question-container'><p>A cube has an edge of $${a}$ m. What is its volume?</p></div>`,
            correctAnswer,
            solution: `Volume $= a^3 = ${a}^3 = ${a} \\times ${a} \\times ${a} = ${vol}$ m³`,
            options: [`$${vol}$ m³`, `$${3 * a}$ m³`, `$${a * a}$ m³`, `$${vol - a * a}$ m³`]
        };
    };

    // EASY 3
    const findSide = () => {
        const a = randomInt(2, 8);
        const vol = a * a * a;
        const correctAnswer = `$${a}$ cm`;
        return {
            text: `<div class='question-container'><p>A cube has volume $${vol}$ cm³. Find the length of its edge.</p></div>`,
            correctAnswer,
            solution: `Volume $= a^3$<br/><br/>$${vol} = a^3$<br/><br/>$a = \\sqrt[3]{${vol}} = ${a}$ cm`,
            options: [`$${a}$ cm`, `$${a + 1}$ cm`, `$${a * a}$ cm`, `$${a - 1 > 0 ? a - 1 : a + 2}$ cm`]
        };
    };

    // MEDIUM 1
    const sideFromVol = () => {
        const a = randomInt(3, 9);
        const vol = a * a * a;
        const tsa = 6 * a * a;
        const correctAnswer = `$${tsa}$ cm²`;
        return {
            text: `<div class='question-container'><p>A cube has volume $${vol}$ cm³. Find its total surface area.</p></div>`,
            correctAnswer,
            solution: `$a^3 = ${vol}$, so $a = ${a}$ cm<br/><br/>TSA $= 6a^2 = 6 \\times ${a}^2 = 6 \\times ${a * a} = ${tsa}$ cm²`,
            options: [`$${tsa}$ cm²`, `$${vol}$ cm²`, `$${4 * a * a}$ cm²`, `$${tsa + 6}$ cm²`]
        };
    };

    // MEDIUM 2
    const compareVols = () => {
        const a1 = randomInt(2, 5); const a2 = randomInt(a1 + 1, a1 + 4);
        const v1 = a1 * a1 * a1; const v2 = a2 * a2 * a2;
        const diff = v2 - v1;
        const correctAnswer = `$${diff}$ cm³`;
        return {
            text: `<div class='question-container'><p>Find the difference in volumes of two cubes with sides $${a1}$ cm and $${a2}$ cm.</p></div>`,
            correctAnswer,
            solution: `Volume₁ $= ${a1}^3 = ${v1}$ cm³<br/><br/>Volume₂ $= ${a2}^3 = ${v2}$ cm³<br/><br/>Difference $= ${v2} - ${v1} = ${diff}$ cm³`,
            options: [`$${diff}$ cm³`, `$${v1}$ cm³`, `$${v2}$ cm³`, `$${diff + a1}$ cm³`]
        };
    };

    // MEDIUM 3
    const waterFill = () => {
        const a = randomInt(4, 10);
        const vol = a * a * a;
        const litres = vol / 1000;
        const correctAnswer = `$${vol}$ cm³`;
        return {
            text: `<div class='question-container'><p>A cubical tank has side $${a}$ cm. How much water (in cm³) can it hold?</p></div>`,
            correctAnswer,
            solution: `Volume = capacity of tank<br/><br/>$= a^3 = ${a}^3 = ${vol}$ cm³`,
            options: [`$${vol}$ cm³`, `$${6 * a * a}$ cm³`, `$${a * a}$ cm³`, `$${vol + a}$ cm³`]
        };
    };

    // HARD 1
    const doubledSide = () => {
        const a = randomInt(2, 6);
        const v1 = a * a * a;
        const a2 = a * 2;
        const v2 = a2 * a2 * a2;
        const ratio = v2 / v1;
        const correctAnswer = `$${ratio}$`;
        return {
            text: `<div class='question-container'><p>If the side of a cube is doubled from $${a}$ cm to $${a2}$ cm, how many times does its volume increase?</p></div>`,
            correctAnswer,
            solution: `V₁ $= ${a}^3 = ${v1}$ cm³<br/><br/>V₂ $= ${a2}^3 = ${v2}$ cm³<br/><br/>Ratio $= \\frac{${v2}}{${v1}} = ${ratio}$<br/><br/>When side is doubled, volume becomes $8$ times.`,
            options: [`$${ratio}$`, `$2$`, `$4$`, `$6$`]
        };
    };

    // HARD 2
    const volRatio = () => {
        const a1 = randomInt(2, 5); const a2 = randomInt(a1 + 1, a1 + 3);
        const v1 = a1 * a1 * a1; const v2 = a2 * a2 * a2;
        const correctAnswer = `$${v1} : ${v2}$`;
        return {
            text: `<div class='question-container'><p>Find the ratio of volumes of two cubes with sides $${a1}$ cm and $${a2}$ cm.</p></div>`,
            correctAnswer,
            solution: `V₁ $= ${a1}^3 = ${v1}$ cm³<br/><br/>V₂ $= ${a2}^3 = ${v2}$ cm³<br/><br/>Ratio $= ${v1} : ${v2}$`,
            options: [`$${v1} : ${v2}$`, `$${a1} : ${a2}$`, `$${a1 * a1} : ${a2 * a2}$`, `$${v2} : ${v1}$`]
        };
    };

    // HARD 3
    const multiStep = () => {
        const a = randomInt(3, 8);
        const vol = a * a * a;
        const tsa = 6 * a * a;
        const sum = vol + tsa;
        const correctAnswer = `$${sum}$`;
        return {
            text: `<div class='question-container'><p>For a cube of side $${a}$ cm, find the sum of its volume (in cm³) and total surface area (in cm²).</p></div>`,
            correctAnswer,
            solution: `Volume $= ${a}^3 = ${vol}$ cm³<br/><br/>TSA $= 6 \\times ${a}^2 = ${tsa}$ cm²<br/><br/>Sum $= ${vol} + ${tsa} = ${sum}$`,
            options: [`$${sum}$`, `$${vol}$`, `$${tsa}$`, `$${sum + a}$`]
        };
    };

    // BONUS
    const realWorld = () => {
        const a = randomInt(3, 10);
        const vol = a * a * a;
        const numCubes = randomInt(2, 5);
        const totalVol = vol * numCubes;
        const correctAnswer = `$${totalVol}$ cm³`;
        return {
            text: `<div class='question-container'><p>${numCubes} identical cubes each with side $${a}$ cm are placed together. Find the total volume.</p></div>`,
            correctAnswer,
            solution: `Volume of 1 cube $= ${a}^3 = ${vol}$ cm³<br/><br/>Total volume $= ${numCubes} \\times ${vol} = ${totalVol}$ cm³`,
            options: [`$${totalVol}$ cm³`, `$${vol}$ cm³`, `$${totalVol + a}$ cm³`, `$${numCubes * a}$ cm³`]
        };
    };

    const formatTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins}:${secs.toString().padStart(2, '0')}`; };
    const recordQuestionAttempt = async (question, selected, isCorrect) => { const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (!userId) return; let timeSpent = accumulatedTime.current; if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current; const seconds = Math.round(timeSpent / 1000); try { await api.recordAttempt({ user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard', question_text: String(question.text || ''), correct_answer: String(question.correctAnswer || ''), student_answer: String(selected || ''), is_correct: isCorrect, solution_text: String(question.solution || ''), time_spent_seconds: seconds >= 0 ? seconds : 0 }); } catch (e) { console.error("Failed to record attempt", e); } };
    const handleCheck = () => { if (!selectedOption || !currentQuestion) return; const isRight = selectedOption === currentQuestion.correctAnswer; setIsCorrect(isRight); setIsSubmitted(true); setAnswers(prev => ({ ...prev, [qIndex]: isRight })); if (isRight) { setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]); } else { setShowExplanationModal(true); } recordQuestionAttempt(currentQuestion, selectedOption, isRight); };
    const handleNext = async () => { if (history.current[qIndex]) { history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; } if (qIndex < TOTAL_QUESTIONS - 1) { setQIndex(prev => prev + 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); accumulatedTime.current = 0; questionStartTime.current = Date.now(); } else { if (sessionId) await api.finishSession(sessionId).catch(console.error); const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (userId) { const totalCorrect = Object.values(answers).filter(val => val === true).length; try { await api.createReport({ title: SKILL_NAME, type: 'practice', score: (totalCorrect / TOTAL_QUESTIONS) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(userId, 10) }); } catch (err) { console.error("Failed to create report", err); } } navigate(-1); } };
    const handlePrevious = () => { if (history.current[qIndex]) { history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; } if (qIndex > 0) { setQIndex(prev => prev - 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); } };
    const handleOptionSelect = (option) => { if (isSubmitted) return; setSelectedOption(option); };
    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max"><div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div></div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{formatTime(timeElapsed)}</div></div>
            </header>
            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern"><h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}><LatexContent html={currentQuestion.text} /></h2></div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">{shuffledOptions.map((option, idx) => (<button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: '500' }} onClick={() => handleOptionSelect(option)} disabled={isSubmitted}><LatexContent html={option} /></button>))}</div>
                                        {isSubmitted && isCorrect && (<motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>{feedbackMessage}</motion.div>)}
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
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>Exit Practice</button></div>
                    <div className="bottom-center">{isSubmitted && (<button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>)}</div>
                    <div className="bottom-right"><div className="nav-buttons-group">{qIndex > 0 && (<button className="nav-pill-prev-btn" onClick={handlePrevious} title="Previous"><ChevronLeft size={28} strokeWidth={3} /> Previous</button>)}{isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>)}</div></div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2"><button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>{isSubmitted && (<button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>)}</div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}><div className="nav-buttons-group">{qIndex > 0 && (<button className="nav-pill-prev-btn" onClick={handlePrevious} title="Previous"><ChevronLeft size={28} strokeWidth={3} /> Previous</button>)}{isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>)}</div></div>
                </div>
            </footer>
        </div>
    );
};

export default VolumeOfCubeComponent;

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

const VolumeOfCuboidComponent = () => {
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
    const SKILL_ID = 1132;
    const SKILL_NAME = "Mensuration - Volume of Cuboid";
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
        const questionTypes = ['basicVol', 'basicVol2', 'findHeight', 'missingDim', 'waterCapacity', 'costFill', 'compareVols', 'halfFilled', 'unitConvert', 'realWorld'];
        if (!window.shuffledMensQ_1132) { window.shuffledMensQ_1132 = [...questionTypes].sort(() => Math.random() - 0.5); }
        if (history.current[index]) { const stored = history.current[index]; setCurrentQuestion(stored.qData); setShuffledOptions(stored.shuffledOptions); setSelectedOption(stored.selectedOption); setIsSubmitted(stored.isSubmitted); setIsCorrect(stored.isCorrect); return; }
        const questionType = window.shuffledMensQ_1132[index] || 'basicVol';
        let qData;
        switch (questionType) {
            case 'basicVol': qData = basicVol(); break;
            case 'basicVol2': qData = basicVol2(); break;
            case 'findHeight': qData = findHeight(); break;
            case 'missingDim': qData = missingDim(); break;
            case 'waterCapacity': qData = waterCapacity(); break;
            case 'costFill': qData = costFill(); break;
            case 'compareVols': qData = compareVols(); break;
            case 'halfFilled': qData = halfFilled(); break;
            case 'unitConvert': qData = unitConvert(); break;
            case 'realWorld': qData = realWorld(); break;
            default: qData = basicVol();
        }
        const newShuffledOptions = [...qData.options].sort(() => Math.random() - 0.5);
        history.current[index] = { qData, shuffledOptions: newShuffledOptions, selectedOption: null, isSubmitted: false, isCorrect: false };
        setShuffledOptions(newShuffledOptions); setCurrentQuestion(qData); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
    };

    // EASY 1
    const basicVol = () => {
        const l = randomInt(3, 10); const b = randomInt(2, 8); const h = randomInt(2, 7);
        const vol = l * b * h;
        const correctAnswer = `$${vol}$ cm³`;
        return {
            text: `<div class='question-container'><p>Find the volume of a cuboid with length $${l}$ cm, breadth $${b}$ cm and height $${h}$ cm.</p></div>`,
            correctAnswer,
            solution: `Volume of cuboid $= l \\times b \\times h = ${l} \\times ${b} \\times ${h} = ${vol}$ cm³`,
            options: [`$${vol}$ cm³`, `$${2 * (l * b + b * h + h * l)}$ cm³`, `$${vol + l}$ cm³`, `$${l * b + h}$ cm³`]
        };
    };

    // EASY 2
    const basicVol2 = () => {
        const l = randomInt(5, 12); const b = randomInt(3, 9); const h = randomInt(4, 10);
        const vol = l * b * h;
        const correctAnswer = `$${vol}$ m³`;
        return {
            text: `<div class='question-container'><p>A room is $${l}$ m long, $${b}$ m wide and $${h}$ m high. Find the volume of the room.</p></div>`,
            correctAnswer,
            solution: `Volume $= l \\times b \\times h = ${l} \\times ${b} \\times ${h} = ${vol}$ m³`,
            options: [`$${vol}$ m³`, `$${l + b + h}$ m³`, `$${l * b}$ m³`, `$${vol - l}$ m³`]
        };
    };

    // EASY 3
    const findHeight = () => {
        const l = randomInt(4, 10); const b = randomInt(3, 8); const h = randomInt(2, 6);
        const vol = l * b * h;
        const correctAnswer = `$${h}$ cm`;
        return {
            text: `<div class='question-container'><p>A cuboid has volume $${vol}$ cm³, length $${l}$ cm and breadth $${b}$ cm. Find its height.</p></div>`,
            correctAnswer,
            solution: `Volume $= l \\times b \\times h$<br/><br/>$${vol} = ${l} \\times ${b} \\times h$<br/><br/>$h = \\frac{${vol}}{${l} \\times ${b}} = \\frac{${vol}}{${l * b}} = ${h}$ cm`,
            options: [`$${h}$ cm`, `$${h + 2}$ cm`, `$${l * b}$ cm`, `$${h + 3}$ cm`]
        };
    };

    // MEDIUM 1
    const missingDim = () => {
        const l = randomInt(5, 10); const b = randomInt(3, 7); const h = randomInt(2, 5);
        const vol = l * b * h;
        const correctAnswer = `$${b}$ cm`;
        return {
            text: `<div class='question-container'><p>A cuboid has volume $${vol}$ cm³, length $${l}$ cm and height $${h}$ cm. Find its breadth.</p></div>`,
            correctAnswer,
            solution: `Volume $= l \\times b \\times h$<br/><br/>$${vol} = ${l} \\times b \\times ${h}$<br/><br/>$b = \\frac{${vol}}{${l} \\times ${h}} = \\frac{${vol}}{${l * h}} = ${b}$ cm`,
            options: [`$${b}$ cm`, `$${b + 2}$ cm`, `$${l * h}$ cm`, `$${b - 1 > 0 ? b - 1 : b + 3}$ cm`]
        };
    };

    // MEDIUM 2
    const waterCapacity = () => {
        const l = randomInt(10, 30); const b = randomInt(8, 20); const h = randomInt(5, 15);
        const vol = l * b * h;
        const correctAnswer = `$${vol}$ cm³`;
        return {
            text: `<div class='question-container'><p>A rectangular tank is $${l}$ cm long, $${b}$ cm wide and $${h}$ cm deep. How much water can it hold?</p></div>`,
            correctAnswer,
            solution: `Water capacity = Volume of tank<br/><br/>$= ${l} \\times ${b} \\times ${h} = ${vol}$ cm³`,
            options: [`$${vol}$ cm³`, `$${2 * (l * b + b * h + h * l)}$ cm³`, `$${vol + l * b}$ cm³`, `$${l * b}$ cm³`]
        };
    };

    // MEDIUM 3
    const costFill = () => {
        const l = randomInt(4, 8); const b = randomInt(3, 6); const h = randomInt(2, 5);
        const vol = l * b * h;
        const rate = randomInt(5, 15);
        const cost = vol * rate;
        const correctAnswer = `₹$${cost}$`;
        return {
            text: `<div class='question-container'><p>A cuboidal pit is $${l}$ m long, $${b}$ m wide and $${h}$ m deep. Find the cost of filling it with soil at ₹$${rate}$ per m³.</p></div>`,
            correctAnswer,
            solution: `Volume $= ${l} \\times ${b} \\times ${h} = ${vol}$ m³<br/><br/>Cost $= ${vol} \\times ${rate} =$ ₹$${cost}$`,
            options: [`₹$${cost}$`, `₹$${vol}$`, `₹$${cost + vol}$`, `₹$${2 * (l * b + b * h + h * l) * rate}$`]
        };
    };

    // HARD 1
    const compareVols = () => {
        const l1 = randomInt(3, 6); const b1 = randomInt(2, 5); const h1 = randomInt(2, 4);
        const l2 = l1 + randomInt(1, 3); const b2 = b1 + randomInt(1, 2); const h2 = h1 + randomInt(1, 2);
        const v1 = l1 * b1 * h1; const v2 = l2 * b2 * h2;
        const diff = v2 - v1;
        const correctAnswer = `$${diff}$ cm³`;
        return {
            text: `<div class='question-container'><p>How much more volume does a cuboid ($${l2}$ × $${b2}$ × $${h2}$ cm) have than a cuboid ($${l1}$ × $${b1}$ × $${h1}$ cm)?</p></div>`,
            correctAnswer,
            solution: `V₁ $= ${l1} \\times ${b1} \\times ${h1} = ${v1}$ cm³<br/><br/>V₂ $= ${l2} \\times ${b2} \\times ${h2} = ${v2}$ cm³<br/><br/>Difference $= ${v2} - ${v1} = ${diff}$ cm³`,
            options: [`$${diff}$ cm³`, `$${v1}$ cm³`, `$${v2}$ cm³`, `$${diff + 10}$ cm³`]
        };
    };

    // HARD 2
    const halfFilled = () => {
        const l = randomInt(6, 14); const b = randomInt(4, 10); const h = randomInt(4, 8);
        const vol = l * b * h;
        const halfVol = vol / 2;
        const correctAnswer = `$${halfVol}$ cm³`;
        return {
            text: `<div class='question-container'><p>A cuboidal tank ($${l}$ cm × $${b}$ cm × $${h}$ cm) is half filled with water. Find the volume of water in the tank.</p></div>`,
            correctAnswer,
            solution: `Full volume $= ${l} \\times ${b} \\times ${h} = ${vol}$ cm³<br/><br/>Half filled $= \\frac{${vol}}{2} = ${halfVol}$ cm³`,
            options: [`$${halfVol}$ cm³`, `$${vol}$ cm³`, `$${halfVol + l}$ cm³`, `$${l * b}$ cm³`]
        };
    };

    // HARD 3
    const unitConvert = () => {
        const l = randomInt(2, 5); const b = randomInt(1, 3); const h = randomInt(1, 2);
        const volM = l * b * h;
        const volCm = volM * 1000000;
        const correctAnswer = `$${volCm}$ cm³`;
        return {
            text: `<div class='question-container'><p>A cuboidal room is $${l}$ m × $${b}$ m × $${h}$ m. Express its volume in cm³. (1 m = 100 cm)</p></div>`,
            correctAnswer,
            solution: `Volume in m³ $= ${l} \\times ${b} \\times ${h} = ${volM}$ m³<br/><br/>Since $1$ m³ $= 10^6$ cm³<br/><br/>Volume $= ${volM} \\times 10^6 = ${volCm}$ cm³`,
            options: [`$${volCm}$ cm³`, `$${volM * 1000}$ cm³`, `$${volM * 100}$ cm³`, `$${volM}$ cm³`]
        };
    };

    // BONUS
    const realWorld = () => {
        const l = randomInt(8, 20); const b = randomInt(5, 12); const h = randomInt(3, 8);
        const vol = l * b * h;
        const numBoxes = randomInt(2, 6);
        const total = vol * numBoxes;
        const correctAnswer = `$${total}$ cm³`;
        return {
            text: `<div class='question-container'><p>${numBoxes} identical boxes each $${l}$ cm × $${b}$ cm × $${h}$ cm are stacked. Find the total volume occupied.</p></div>`,
            correctAnswer,
            solution: `Volume of 1 box $= ${l} \\times ${b} \\times ${h} = ${vol}$ cm³<br/><br/>Total volume $= ${numBoxes} \\times ${vol} = ${total}$ cm³`,
            options: [`$${total}$ cm³`, `$${vol}$ cm³`, `$${total + vol}$ cm³`, `$${numBoxes * l}$ cm³`]
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

export default VolumeOfCuboidComponent;

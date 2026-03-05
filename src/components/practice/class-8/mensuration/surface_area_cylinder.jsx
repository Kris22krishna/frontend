import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, Pencil, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Whiteboard from '../../../Whiteboard';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import Class8PracticeReportModal from '../Class8PracticeReportModal';
import StickerExit from '../../../StickerExit';
import { FullScreenScratchpad } from '../../../FullScreenScratchpad';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const CORRECT_MESSAGES = ["✨ Amazing job! You got it! ✨", "🌟 Brilliant! Keep it up! 🌟", "🎉 Correct! You're a math-star! 🎉", "✨ Fantastic work! ✨", "🚀 Super! You're on fire! 🚀", "🌈 Perfect! Well done! 🌈", "🎊 Great job! Moving on... 🎊", "💎 Spot on! Excellent! 💎"];

const SurfaceAreaCylinderComponent = () => {
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
    const [showReportModal, setShowReportModal] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const history = useRef({});
    const isTabActive = useRef(true);
    const SKILL_ID = 1130;
    const SKILL_NAME = "Mensuration - Surface Area of Cylinder";
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
        const questionTypes = ['basicCSA', 'basicTSA', 'findCSA2', 'tsaWithValues', 'costPaint', 'findRadius', 'findHeight', 'hollowCylinder', 'compareCylinders', 'realWorld'];
        if (!window.shuffledMensQ_1130) { window.shuffledMensQ_1130 = [...questionTypes].sort(() => Math.random() - 0.5); }
        if (history.current[index]) { const stored = history.current[index]; setCurrentQuestion(stored.qData); setShuffledOptions(stored.shuffledOptions); setSelectedOption(stored.selectedOption); setIsSubmitted(stored.isSubmitted); setIsCorrect(stored.isCorrect); return; }
        const questionType = window.shuffledMensQ_1130[index] || 'basicCSA';
        let qData;
        switch (questionType) {
            case 'basicCSA': qData = basicCSA(); break;
            case 'basicTSA': qData = basicTSA(); break;
            case 'findCSA2': qData = findCSA2(); break;
            case 'tsaWithValues': qData = tsaWithValues(); break;
            case 'costPaint': qData = costPaint(); break;
            case 'findRadius': qData = findRadius(); break;
            case 'findHeight': qData = findHeight(); break;
            case 'hollowCylinder': qData = hollowCylinder(); break;
            case 'compareCylinders': qData = compareCylinders(); break;
            case 'realWorld': qData = realWorld(); break;
            default: qData = basicCSA();
        }
        const newShuffledOptions = [...qData.options].sort(() => Math.random() - 0.5);
        history.current[index] = { qData, shuffledOptions: newShuffledOptions, selectedOption: null, isSubmitted: false, isCorrect: false };
        setShuffledOptions(newShuffledOptions); setCurrentQuestion(qData); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
    };

    // EASY 1: Basic CSA
    const basicCSA = () => {
        const r = randomInt(3, 10); const h = randomInt(5, 15);
        const csa = 2 * 22 * r * h / 7;
        const csaDisplay = `$\\frac{${2 * 22 * r * h}}{7}$`;
        const csaVal = parseFloat((2 * Math.PI * r * h).toFixed(2));
        const correctAnswer = `$${csaVal}$ cm²`;
        return {
            text: `<div class='question-container'><p>Find the curved surface area of a cylinder with radius $${r}$ cm and height $${h}$ cm. (Use $\\pi = 3.14$)</p></div>`,
            correctAnswer,
            solution: `CSA of cylinder $= 2\\pi rh$<br/><br/>$= 2 \\times 3.14 \\times ${r} \\times ${h}$<br/><br/>$= ${csaVal}$ cm²`,
            options: [`$${csaVal}$ cm²`, `$${parseFloat((Math.PI * r * r * h).toFixed(2))}$ cm²`, `$${parseFloat((2 * Math.PI * r * (r + h)).toFixed(2))}$ cm²`, `$${parseFloat((csaVal + r).toFixed(2))}$ cm²`]
        };
    };

    // EASY 2: Basic TSA
    const basicTSA = () => {
        const r = randomInt(3, 8); const h = randomInt(5, 12);
        const tsa = parseFloat((2 * Math.PI * r * (r + h)).toFixed(2));
        const correctAnswer = `$${tsa}$ cm²`;
        return {
            text: `<div class='question-container'><p>Find the total surface area of a cylinder with radius $${r}$ cm and height $${h}$ cm. (Use $\\pi = 3.14$)</p></div>`,
            correctAnswer,
            solution: `TSA of cylinder $= 2\\pi r(r + h)$<br/><br/>$= 2 \\times 3.14 \\times ${r} \\times (${r} + ${h})$<br/><br/>$= 2 \\times 3.14 \\times ${r} \\times ${r + h}$<br/><br/>$= ${tsa}$ cm²`,
            options: [`$${tsa}$ cm²`, `$${parseFloat((2 * Math.PI * r * h).toFixed(2))}$ cm²`, `$${parseFloat((Math.PI * r * r * h).toFixed(2))}$ cm²`, `$${parseFloat((tsa + r).toFixed(2))}$ cm²`]
        };
    };

    // EASY 3: CSA with different values
    const findCSA2 = () => {
        const d = randomInt(4, 14) * 2; const r = d / 2; const h = randomInt(6, 16);
        const csa = parseFloat((2 * Math.PI * r * h).toFixed(2));
        const correctAnswer = `$${csa}$ cm²`;
        return {
            text: `<div class='question-container'><p>A cylinder has diameter $${d}$ cm and height $${h}$ cm. Find its CSA. (Use $\\pi = 3.14$)</p></div>`,
            correctAnswer,
            solution: `Radius $= \\frac{${d}}{2} = ${r}$ cm<br/><br/>CSA $= 2\\pi rh = 2 \\times 3.14 \\times ${r} \\times ${h} = ${csa}$ cm²`,
            options: [`$${csa}$ cm²`, `$${parseFloat((Math.PI * r * r * h).toFixed(2))}$ cm²`, `$${parseFloat((2 * Math.PI * d * h).toFixed(2))}$ cm²`, `$${parseFloat((csa + d).toFixed(2))}$ cm²`]
        };
    };

    // MEDIUM 1: TSA from given values
    const tsaWithValues = () => {
        const r = randomInt(5, 10); const h = randomInt(8, 18);
        const tsa = parseFloat((2 * Math.PI * r * (r + h)).toFixed(2));
        const csa = parseFloat((2 * Math.PI * r * h).toFixed(2));
        const correctAnswer = `$${tsa}$ cm²`;
        return {
            text: `<div class='question-container'><p>A cylindrical tank has radius $${r}$ m and height $${h}$ m. Find the total outer surface area. (Use $\\pi = 3.14$)</p></div>`,
            correctAnswer,
            solution: `TSA $= 2\\pi r(r + h)$<br/><br/>$= 2 \\times 3.14 \\times ${r} \\times (${r} + ${h})$<br/><br/>$= ${tsa}$ m²`,
            options: [`$${tsa}$ cm²`, `$${csa}$ cm²`, `$${parseFloat((tsa + 10).toFixed(2))}$ cm²`, `$${parseFloat((Math.PI * r * r).toFixed(2))}$ cm²`]
        };
    };

    // MEDIUM 2: Cost of painting
    const costPaint = () => {
        const r = randomInt(3, 7); const h = randomInt(5, 10);
        const csa = parseFloat((2 * Math.PI * r * h).toFixed(2));
        const rate = randomInt(2, 6);
        const cost = parseFloat((csa * rate).toFixed(2));
        const correctAnswer = `₹$${cost}$`;
        return {
            text: `<div class='question-container'><p>A cylindrical pillar has radius $${r}$ m and height $${h}$ m. Find the cost of painting its curved surface at ₹$${rate}$ per m². (Use $\\pi = 3.14$)</p></div>`,
            correctAnswer,
            solution: `CSA $= 2\\pi rh = 2 \\times 3.14 \\times ${r} \\times ${h} = ${csa}$ m²<br/><br/>Cost $= ${csa} \\times ${rate} =$ ₹$${cost}$`,
            options: [`₹$${cost}$`, `₹$${csa}$`, `₹$${parseFloat((cost + rate).toFixed(2))}$`, `₹$${parseFloat((cost * 2).toFixed(2))}$`]
        };
    };

    // MEDIUM 3: Find radius from CSA
    const findRadius = () => {
        const r = randomInt(3, 8); const h = randomInt(5, 12);
        const csa = parseFloat((2 * Math.PI * r * h).toFixed(2));
        const correctAnswer = `$${r}$ cm`;
        return {
            text: `<div class='question-container'><p>A cylinder has height $${h}$ cm and CSA $${csa}$ cm². Find its radius. (Use $\\pi = 3.14$)</p></div>`,
            correctAnswer,
            solution: `CSA $= 2\\pi rh$<br/><br/>$${csa} = 2 \\times 3.14 \\times r \\times ${h}$<br/><br/>$r = \\frac{${csa}}{2 \\times 3.14 \\times ${h}} = ${r}$ cm`,
            options: [`$${r}$ cm`, `$${r + 2}$ cm`, `$${r * 2}$ cm`, `$${r - 1 > 0 ? r - 1 : r + 3}$ cm`]
        };
    };

    // HARD 1: Find height from TSA
    const findHeight = () => {
        const r = randomInt(3, 7); const h = randomInt(5, 12);
        const tsa = parseFloat((2 * Math.PI * r * (r + h)).toFixed(2));
        const correctAnswer = `$${h}$ cm`;
        return {
            text: `<div class='question-container'><p>A cylinder has radius $${r}$ cm and TSA $${tsa}$ cm². Find its height. (Use $\\pi = 3.14$)</p></div>`,
            correctAnswer,
            solution: `TSA $= 2\\pi r(r + h)$<br/><br/>$${tsa} = 2 \\times 3.14 \\times ${r} \\times (${r} + h)$<br/><br/>$${r} + h = \\frac{${tsa}}{${parseFloat((2 * Math.PI * r).toFixed(2))}}$<br/><br/>$h = ${h}$ cm`,
            options: [`$${h}$ cm`, `$${h + 3}$ cm`, `$${r}$ cm`, `$${h - 2 > 0 ? h - 2 : h + 4}$ cm`]
        };
    };

    // HARD 2: Hollow cylinder (CSA = inner + outer)
    const hollowCylinder = () => {
        const R = randomInt(6, 10); const r = randomInt(3, R - 1); const h = randomInt(5, 12);
        const outerCSA = parseFloat((2 * Math.PI * R * h).toFixed(2));
        const innerCSA = parseFloat((2 * Math.PI * r * h).toFixed(2));
        const totalCSA = parseFloat((outerCSA + innerCSA).toFixed(2));
        const correctAnswer = `$${totalCSA}$ cm²`;
        return {
            text: `<div class='question-container'><p>A hollow cylinder has outer radius $${R}$ cm, inner radius $${r}$ cm, and height $${h}$ cm. Find the total CSA (inner + outer). (Use $\\pi = 3.14$)</p></div>`,
            correctAnswer,
            solution: `Outer CSA $= 2\\pi Rh = ${outerCSA}$ cm²<br/><br/>Inner CSA $= 2\\pi rh = ${innerCSA}$ cm²<br/><br/>Total CSA $= ${outerCSA} + ${innerCSA} = ${totalCSA}$ cm²`,
            options: [`$${totalCSA}$ cm²`, `$${outerCSA}$ cm²`, `$${innerCSA}$ cm²`, `$${parseFloat((totalCSA + R).toFixed(2))}$ cm²`]
        };
    };

    // HARD 3: Compare cylinders
    const compareCylinders = () => {
        const r1 = randomInt(3, 6); const h1 = randomInt(5, 10);
        const r2 = randomInt(4, 8); const h2 = randomInt(6, 12);
        const csa1 = parseFloat((2 * Math.PI * r1 * h1).toFixed(2));
        const csa2 = parseFloat((2 * Math.PI * r2 * h2).toFixed(2));
        const diff = parseFloat(Math.abs(csa1 - csa2).toFixed(2));
        const larger = csa1 > csa2 ? 'first' : 'second';
        const correctAnswer = `$${diff}$ cm²`;
        return {
            text: `<div class='question-container'><p>Cylinder A: radius $${r1}$ cm, height $${h1}$ cm. Cylinder B: radius $${r2}$ cm, height $${h2}$ cm. Find the difference in their CSAs. ($\\pi = 3.14$)</p></div>`,
            correctAnswer,
            solution: `CSA of A $= 2\\pi \\times ${r1} \\times ${h1} = ${csa1}$ cm²<br/><br/>CSA of B $= 2\\pi \\times ${r2} \\times ${h2} = ${csa2}$ cm²<br/><br/>Difference $= |${csa1} - ${csa2}| = ${diff}$ cm²`,
            options: [`$${diff}$ cm²`, `$${csa1}$ cm²`, `$${csa2}$ cm²`, `$${parseFloat((diff + 10).toFixed(2))}$ cm²`]
        };
    };

    // BONUS: Real world
    const realWorld = () => {
        const r = randomInt(3, 7); const h = randomInt(8, 20);
        const csa = parseFloat((2 * Math.PI * r * h).toFixed(2));
        const correctAnswer = `$${csa}$ cm²`;
        return {
            text: `<div class='question-container'><p>A label is to be wrapped around a cylindrical can of radius $${r}$ cm and height $${h}$ cm. Find the area of the label needed. (Use $\\pi = 3.14$)</p></div>`,
            correctAnswer,
            solution: `Label area = CSA of cylinder<br/><br/>$= 2\\pi rh = 2 \\times 3.14 \\times ${r} \\times ${h} = ${csa}$ cm²`,
            options: [`$${csa}$ cm²`, `$${parseFloat((2 * Math.PI * r * (r + h)).toFixed(2))}$ cm²`, `$${parseFloat((Math.PI * r * r).toFixed(2))}$ cm²`, `$${parseFloat((csa + r).toFixed(2))}$ cm²`]
        };
    };

    const formatTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins}:${secs.toString().padStart(2, '0')}`; };
    const recordQuestionAttempt = async (question, selected, isCorrect) => { const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (!userId) return; let timeSpent = accumulatedTime.current; if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current; const seconds = Math.round(timeSpent / 1000); try { await api.recordAttempt({ user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard', question_text: String(question.text || ''), correct_answer: String(question.correctAnswer || ''), student_answer: String(selected || ''), is_correct: isCorrect, solution_text: String(question.solution || ''), time_spent_seconds: seconds >= 0 ? seconds : 0 }); } catch (e) { console.error("Failed to record attempt", e); } };
    const handleCheck = () => { if (!selectedOption || !currentQuestion) return; const isRight = selectedOption === currentQuestion.correctAnswer; setIsCorrect(isRight); setIsSubmitted(true); setAnswers(prev => ({ ...prev, [qIndex]: isRight })); if (isRight) { setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]); } else { setShowExplanationModal(true); } recordQuestionAttempt(currentQuestion, selectedOption, isRight); };
    const handleNext = async () => { if (history.current[qIndex]) { history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; } if (qIndex < TOTAL_QUESTIONS - 1) { setQIndex(prev => prev + 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); accumulatedTime.current = 0; questionStartTime.current = Date.now(); } else { if (sessionId) await api.finishSession(sessionId).catch(console.error); const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (userId) { const totalCorrect = Object.values(answers).filter(val => val === true).length; try { await api.createReport({ title: SKILL_NAME, type: 'practice', score: (totalCorrect / TOTAL_QUESTIONS) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(userId, 10) }); } catch (err) { console.error("Failed to create report", err); } } setShowReportModal(true); } };
    const handlePrevious = () => { if (history.current[qIndex]) { history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; } if (qIndex > 0) { setQIndex(prev => prev - 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); } };
    const handleOptionSelect = (option) => { if (isSubmitted) return; setSelectedOption(option); };
    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max"><div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div></div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-lg shadow-md flex items-center gap-2">{formatTime(timeElapsed)}</div></div>
            </header>
            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem', justifyContent: 'flex-start' }}>
                                    <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "1rem" }}><h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: 'normal', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}><LatexContent html={currentQuestion.text} /></h2></div>
                                    <div className="interaction-area-modern" style={{ marginTop: '1rem', flex: "none" }}>
                                        <div className="options-grid-modern">{shuffledOptions.map((option, idx) => (<button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: 'normal' }} onClick={() => handleOptionSelect(option)} disabled={isSubmitted}><LatexContent html={option} /></button>))}</div>
                                        {isSubmitted && isCorrect && (<motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px', gridColumn: '1 / -1', justifySelf: 'center', textAlign: 'center', width: '100%' }}>{feedbackMessage}</motion.div>)}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <Class8PracticeReportModal
                isOpen={showReportModal}
                stats={{
                    timeTaken: formatTime(timeElapsed),
                    correctAnswers: Object.values(answers).filter(val => val === true).length,
                    totalQuestions: TOTAL_QUESTIONS
                }}
                onPracticeAgain={() => {
                    setQIndex(0);
                    setAnswers({});
                    setTimeElapsed(0);
                    setSelectedOption(null);
                    setIsSubmitted(false);
                    setIsCorrect(false);
                    setShowReportModal(false);
                    history.current = {};
                }}
                onBackToSkills={() => navigate(-1)}
            />
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

export default SurfaceAreaCylinderComponent;

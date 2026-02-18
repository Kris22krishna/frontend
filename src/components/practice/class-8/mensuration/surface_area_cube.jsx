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

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨", "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉", "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀", "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊", "💎 Spot on! Excellent! 💎"
];

const SurfaceAreaCubeComponent = () => {
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
    const SKILL_ID = 1104;
    const SKILL_NAME = "Mensuration - Surface Area of Cube";
    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        const handleVisibilityChange = () => {
            if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; }
            else { questionStartTime.current = Date.now(); isTabActive.current = true; }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", handleVisibilityChange); };
    }, []);

    useEffect(() => { generateQuestion(qIndex); }, [qIndex]);

    const generateQuestion = (index) => {
        const questionTypes = ['basicTSA', 'basicLSA', 'findSide', 'costPaint', 'lateralArea',
            'sideFromTSA', 'compareCubes', 'openCube', 'areaRatio', 'realWorld'];
        if (!window.shuffledMensQ_1104) {
            window.shuffledMensQ_1104 = [...questionTypes].sort(() => Math.random() - 0.5);
        }
        if (history.current[index]) {
            const stored = history.current[index];
            setCurrentQuestion(stored.qData); setShuffledOptions(stored.shuffledOptions);
            setSelectedOption(stored.selectedOption); setIsSubmitted(stored.isSubmitted); setIsCorrect(stored.isCorrect);
            return;
        }
        const questionType = window.shuffledMensQ_1104[index] || 'basicTSA';
        let qData;
        switch (questionType) {
            case 'basicTSA': qData = basicTSA(); break;
            case 'basicLSA': qData = basicLSA(); break;
            case 'findSide': qData = findSide(); break;
            case 'costPaint': qData = costPaint(); break;
            case 'lateralArea': qData = lateralArea(); break;
            case 'sideFromTSA': qData = sideFromTSA(); break;
            case 'compareCubes': qData = compareCubes(); break;
            case 'openCube': qData = openCube(); break;
            case 'areaRatio': qData = areaRatio(); break;
            case 'realWorld': qData = realWorld(); break;
            default: qData = basicTSA();
        }
        const newShuffledOptions = [...qData.options].sort(() => Math.random() - 0.5);
        history.current[index] = { qData, shuffledOptions: newShuffledOptions, selectedOption: null, isSubmitted: false, isCorrect: false };
        setShuffledOptions(newShuffledOptions); setCurrentQuestion(qData);
        setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
    };

    // EASY 1
    const basicTSA = () => {
        const a = randomInt(3, 12);
        const tsa = 6 * a * a;
        const correctAnswer = `$${tsa}$ cm²`;
        return {
            text: `<div class='question-container'><p>Find the total surface area of a cube with side $${a}$ cm.</p></div>`,
            correctAnswer,
            solution: `TSA of cube $= 6a^2 = 6 \\times ${a}^2 = 6 \\times ${a * a} = ${tsa}$ cm²`,
            options: [`$${tsa}$ cm²`, `$${a * a}$ cm²`, `$${4 * a * a}$ cm²`, `$${tsa + a}$ cm²`]
        };
    };

    // EASY 2
    const basicLSA = () => {
        const a = randomInt(3, 10);
        const lsa = 4 * a * a;
        const correctAnswer = `$${lsa}$ cm²`;
        return {
            text: `<div class='question-container'><p>Find the lateral surface area of a cube with side $${a}$ cm.</p></div>`,
            correctAnswer,
            solution: `LSA of cube $= 4a^2 = 4 \\times ${a}^2 = 4 \\times ${a * a} = ${lsa}$ cm²`,
            options: [`$${lsa}$ cm²`, `$${6 * a * a}$ cm²`, `$${a * a}$ cm²`, `$${lsa + a}$ cm²`]
        };
    };

    // EASY 3
    const findSide = () => {
        const a = randomInt(2, 8);
        const area = a * a;
        const correctAnswer = `$${a}$ cm`;
        return {
            text: `<div class='question-container'><p>One face of a cube has an area of $${area}$ cm². What is the side of the cube?</p></div>`,
            correctAnswer,
            solution: `Area of one face $= a^2 = ${area}$<br/><br/>$a = \\sqrt{${area}} = ${a}$ cm`,
            options: [`$${a}$ cm`, `$${a + 2}$ cm`, `$${area}$ cm`, `$${a * 2}$ cm`]
        };
    };

    // MEDIUM 1
    const costPaint = () => {
        const a = randomInt(3, 8);
        const tsa = 6 * a * a;
        const rate = randomInt(3, 10);
        const cost = tsa * rate;
        const correctAnswer = `₹$${cost}$`;
        return {
            text: `<div class='question-container'><p>Find the cost of painting a cube of side $${a}$ cm at ₹$${rate}$ per cm².</p></div>`,
            correctAnswer,
            solution: `TSA $= 6 \\times ${a}^2 = ${tsa}$ cm²<br/><br/>Cost $= ${tsa} \\times ${rate} =$ ₹$${cost}$`,
            options: [`₹$${cost}$`, `₹$${tsa}$`, `₹$${cost + a}$`, `₹$${a * a * rate}$`]
        };
    };

    // MEDIUM 2
    const lateralArea = () => {
        const a = randomInt(4, 15);
        const lsa = 4 * a * a;
        const tsa = 6 * a * a;
        const diff = tsa - lsa;
        const correctAnswer = `$${diff}$ cm²`;
        return {
            text: `<div class='question-container'><p>For a cube of side $${a}$ cm, find the difference between its total surface area and lateral surface area.</p></div>`,
            correctAnswer,
            solution: `TSA $= 6a^2 = ${tsa}$ cm²<br/><br/>LSA $= 4a^2 = ${lsa}$ cm²<br/><br/>Difference $= ${tsa} - ${lsa} = ${diff}$ cm²<br/><br/>(This equals $2a^2$, the area of top and bottom faces)`,
            options: [`$${diff}$ cm²`, `$${lsa}$ cm²`, `$${tsa}$ cm²`, `$${a * a}$ cm²`]
        };
    };

    // MEDIUM 3
    const sideFromTSA = () => {
        const a = randomInt(3, 10);
        const tsa = 6 * a * a;
        const correctAnswer = `$${a}$ cm`;
        return {
            text: `<div class='question-container'><p>A cube has a total surface area of $${tsa}$ cm². Find the length of its side.</p></div>`,
            correctAnswer,
            solution: `TSA $= 6a^2$<br/><br/>$${tsa} = 6a^2$<br/><br/>$a^2 = \\frac{${tsa}}{6} = ${a * a}$<br/><br/>$a = \\sqrt{${a * a}} = ${a}$ cm`,
            options: [`$${a}$ cm`, `$${a + 1}$ cm`, `$${a * a}$ cm`, `$${a - 1 > 0 ? a - 1 : a + 2}$ cm`]
        };
    };

    // HARD 1
    const compareCubes = () => {
        const a1 = randomInt(3, 6); const a2 = a1 * 2;
        const tsa1 = 6 * a1 * a1; const tsa2 = 6 * a2 * a2;
        const ratio = tsa2 / tsa1;
        const correctAnswer = `$${ratio}$`;
        return {
            text: `<div class='question-container'><p>If the side of a cube is doubled from $${a1}$ cm to $${a2}$ cm, how many times does the TSA increase?</p></div>`,
            correctAnswer,
            solution: `TSA₁ $= 6 \\times ${a1}^2 = ${tsa1}$ cm²<br/><br/>TSA₂ $= 6 \\times ${a2}^2 = ${tsa2}$ cm²<br/><br/>Ratio $= \\frac{${tsa2}}{${tsa1}} = ${ratio}$<br/><br/>When side is doubled, TSA becomes $4$ times.`,
            options: [`$${ratio}$`, `$2$`, `$8$`, `$6$`]
        };
    };

    // HARD 2
    const openCube = () => {
        const a = randomInt(4, 12);
        const sa = 5 * a * a;
        const correctAnswer = `$${sa}$ cm²`;
        return {
            text: `<div class='question-container'><p>An open cube (without a top face) has side $${a}$ cm. Find its surface area.</p></div>`,
            correctAnswer,
            solution: `Open cube has 5 faces<br/><br/>SA $= 5a^2 = 5 \\times ${a}^2 = 5 \\times ${a * a} = ${sa}$ cm²`,
            options: [`$${sa}$ cm²`, `$${6 * a * a}$ cm²`, `$${4 * a * a}$ cm²`, `$${sa + a * a}$ cm²`]
        };
    };

    // HARD 3
    const areaRatio = () => {
        const a1 = randomInt(2, 5); const a2 = randomInt(a1 + 1, a1 + 4);
        const tsa1 = 6 * a1 * a1; const tsa2 = 6 * a2 * a2;
        const correctAnswer = `$${tsa1} : ${tsa2}$`;
        return {
            text: `<div class='question-container'><p>Find the ratio of TSA of two cubes with sides $${a1}$ cm and $${a2}$ cm.</p></div>`,
            correctAnswer,
            solution: `TSA₁ $= 6 \\times ${a1}^2 = ${tsa1}$ cm²<br/><br/>TSA₂ $= 6 \\times ${a2}^2 = ${tsa2}$ cm²<br/><br/>Ratio $= ${tsa1} : ${tsa2}$`,
            options: [`$${tsa1} : ${tsa2}$`, `$${a1} : ${a2}$`, `$${a1 * a1} : ${a2 * a2}$`, `$${tsa2} : ${tsa1}$`]
        };
    };

    // BONUS
    const realWorld = () => {
        const a = randomInt(5, 15);
        const tsa = 6 * a * a;
        const correctAnswer = `$${tsa}$ cm²`;
        return {
            text: `<div class='question-container'><p>A Rubik's cube has side $${a}$ cm. Find the total area of all its faces.</p></div>`,
            correctAnswer,
            solution: `TSA $= 6a^2 = 6 \\times ${a}^2 = 6 \\times ${a * a} = ${tsa}$ cm²`,
            options: [`$${tsa}$ cm²`, `$${a * a * a}$ cm²`, `$${4 * a * a}$ cm²`, `$${tsa + 6}$ cm²`]
        };
    };

    const formatTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins}:${secs.toString().padStart(2, '0')}`; };
    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (!userId) return;
        let timeSpent = accumulatedTime.current; if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.round(timeSpent / 1000);
        try { await api.recordAttempt({ user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard', question_text: String(question.text || ''), correct_answer: String(question.correctAnswer || ''), student_answer: String(selected || ''), is_correct: isCorrect, solution_text: String(question.solution || ''), time_spent_seconds: seconds >= 0 ? seconds : 0 }); } catch (e) { console.error("Failed to record attempt", e); }
    };
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

export default SurfaceAreaCubeComponent;

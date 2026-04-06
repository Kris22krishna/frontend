import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, Pencil, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { useSessionLogger } from '../../../../hooks/useSessionLogger';
import { NODE_IDS } from '../../../../lib/curriculumIds';
import Whiteboard from '../../../Whiteboard';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import Class8PracticeReportModal from '../Class8PracticeReportModal';
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

const SurfaceAreaCuboidComponent = () => {
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
    const SKILL_ID = 1103;
    const SKILL_NAME = "Mensuration - Surface Area of Cuboid";
    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

    // v4 session logging
    const { startSession, logAnswer, finishSession: finishSessionV4 } = useSessionLogger();
    const answersPayload = useRef([]);
    const isFinishedRef = useRef(false);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }
        startSession({ nodeId: NODE_IDS.g8MathMensSACuboid, sessionType: 'practice' });
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
        const questionTypes = ['basicSA', 'findSA2', 'givenVolFind', 'lateralSA', 'costPaint',
            'missingDim', 'wordProblem', 'compareSA', 'openBox', 'realWorld'];
        if (!window.shuffledMensQ_1103) {
            window.shuffledMensQ_1103 = [...questionTypes].sort(() => Math.random() - 0.5);
        }
        if (history.current[index]) {
            const stored = history.current[index];
            setCurrentQuestion(stored.qData); setShuffledOptions(stored.shuffledOptions);
            setSelectedOption(stored.selectedOption); setIsSubmitted(stored.isSubmitted); setIsCorrect(stored.isCorrect);
            return;
        }
        const questionType = window.shuffledMensQ_1103[index] || 'basicSA';
        let qData;
        switch (questionType) {
            case 'basicSA': qData = basicSA(); break;
            case 'findSA2': qData = findSA2(); break;
            case 'givenVolFind': qData = givenVolFind(); break;
            case 'lateralSA': qData = lateralSA(); break;
            case 'costPaint': qData = costPaint(); break;
            case 'missingDim': qData = missingDim(); break;
            case 'wordProblem': qData = wordProblem(); break;
            case 'compareSA': qData = compareSA(); break;
            case 'openBox': qData = openBox(); break;
            case 'realWorld': qData = realWorld(); break;
            default: qData = basicSA();
        }
        const newShuffledOptions = [...qData.options].sort(() => Math.random() - 0.5);
        history.current[index] = { qData, shuffledOptions: newShuffledOptions, selectedOption: null, isSubmitted: false, isCorrect: false };
        setShuffledOptions(newShuffledOptions); setCurrentQuestion(qData);
        setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
    };

    // EASY 1: Basic TSA
    const basicSA = () => {
        const l = randomInt(3, 10); const b = randomInt(2, 8); const h = randomInt(2, 7);
        const sa = 2 * (l * b + b * h + h * l);
        const correctAnswer = `$${sa}$ cm²`;
        return {
            text: `<div class='question-container'><p>Find the total surface area of a cuboid with length $${l}$ cm, breadth $${b}$ cm and height $${h}$ cm.</p></div>`,
            correctAnswer,
            solution: `TSA of cuboid $= 2(lb + bh + hl)$<br/><br/>$= 2(${l} \\times ${b} + ${b} \\times ${h} + ${h} \\times ${l})$<br/><br/>$= 2(${l * b} + ${b * h} + ${h * l}) = 2 \\times ${l * b + b * h + h * l} = ${sa}$ cm²`,
            options: [`$${sa}$ cm²`, `$${l * b * h}$ cm²`, `$${sa + l}$ cm²`, `$${(l * b + b * h + h * l)}$ cm²`]
        };
    };

    // EASY 2: Basic TSA with different values
    const findSA2 = () => {
        const l = randomInt(5, 12); const b = randomInt(3, 9); const h = randomInt(4, 10);
        const sa = 2 * (l * b + b * h + h * l);
        const correctAnswer = `$${sa}$ cm²`;
        return {
            text: `<div class='question-container'><p>A cuboid has dimensions $${l}$ cm × $${b}$ cm × $${h}$ cm. What is its total surface area?</p></div>`,
            correctAnswer,
            solution: `TSA $= 2(lb + bh + hl)$<br/><br/>$= 2(${l} \\times ${b} + ${b} \\times ${h} + ${h} \\times ${l})$<br/><br/>$= 2(${l * b} + ${b * h} + ${h * l}) = ${sa}$ cm²`,
            options: [`$${sa}$ cm²`, `$${2 * (l + b + h)}$ cm²`, `$${sa - 2 * l}$ cm²`, `$${l * b * h}$ cm²`]
        };
    };

    // EASY 3: Lateral surface area
    const lateralSA = () => {
        const l = randomInt(4, 10); const b = randomInt(3, 8); const h = randomInt(3, 9);
        const lsa = 2 * h * (l + b);
        const correctAnswer = `$${lsa}$ cm²`;
        return {
            text: `<div class='question-container'><p>Find the lateral surface area of a cuboid with length $${l}$ cm, breadth $${b}$ cm and height $${h}$ cm.</p></div>`,
            correctAnswer,
            solution: `Lateral SA $= 2h(l + b)$<br/><br/>$= 2 \\times ${h} \\times (${l} + ${b})$<br/><br/>$= 2 \\times ${h} \\times ${l + b} = ${lsa}$ cm²`,
            options: [`$${lsa}$ cm²`, `$${2 * (l * b + b * h + h * l)}$ cm²`, `$${lsa + l * b}$ cm²`, `$${h * (l + b)}$ cm²`]
        };
    };

    // MEDIUM 1: Find volume given SA info
    const givenVolFind = () => {
        const l = randomInt(4, 8); const b = randomInt(3, 6); const h = randomInt(2, 5);
        const sa = 2 * (l * b + b * h + h * l);
        const vol = l * b * h;
        const correctAnswer = `$${vol}$ cm³`;
        return {
            text: `<div class='question-container'><p>A cuboid has length $${l}$ cm, breadth $${b}$ cm and height $${h}$ cm. Find its volume.</p></div>`,
            correctAnswer,
            solution: `Volume of cuboid $= l \\times b \\times h$<br/><br/>$= ${l} \\times ${b} \\times ${h} = ${vol}$ cm³`,
            options: [`$${vol}$ cm³`, `$${sa}$ cm³`, `$${vol + l}$ cm³`, `$${l * b + h}$ cm³`]
        };
    };

    // MEDIUM 2: Cost of painting
    const costPaint = () => {
        const l = randomInt(5, 10); const b = randomInt(3, 7); const h = randomInt(3, 6);
        const sa = 2 * (l * b + b * h + h * l);
        const rate = randomInt(2, 8);
        const cost = sa * rate;
        const correctAnswer = `₹$${cost}$`;
        return {
            text: `<div class='question-container'><p>Find the cost of painting all faces of a cuboid ($${l}$ cm × $${b}$ cm × $${h}$ cm) at ₹$${rate}$ per cm².</p></div>`,
            correctAnswer,
            solution: `TSA $= 2(lb + bh + hl)$<br/><br/>$= 2(${l * b} + ${b * h} + ${h * l}) = ${sa}$ cm²<br/><br/>Cost $= ${sa} \\times ${rate} =$ ₹$${cost}$`,
            options: [`₹$${cost}$`, `₹$${sa}$`, `₹$${cost + rate}$`, `₹$${l * b * h * rate}$`]
        };
    };

    // MEDIUM 3: Missing dimension from SA
    const missingDim = () => {
        const l = randomInt(4, 10); const b = randomInt(3, 7);
        const h = randomInt(2, 6);
        const sa = 2 * (l * b + b * h + h * l);
        const correctAnswer = `$${h}$ cm`;
        return {
            text: `<div class='question-container'><p>A cuboid has length $${l}$ cm, breadth $${b}$ cm and total surface area $${sa}$ cm². Find its height.</p></div>`,
            correctAnswer,
            solution: `TSA $= 2(lb + bh + hl)$<br/><br/>$${sa} = 2(${l} \\times ${b} + ${b} \\times h + h \\times ${l})$<br/><br/>$${sa / 2} = ${l * b} + h(${b} + ${l})$<br/><br/>$${sa / 2 - l * b} = h \\times ${b + l}$<br/><br/>$h = \\frac{${sa / 2 - l * b}}{${b + l}} = ${h}$ cm`,
            options: [`$${h}$ cm`, `$${h + 2}$ cm`, `$${h - 1 > 0 ? h - 1 : h + 3}$ cm`, `$${h + 4}$ cm`]
        };
    };

    // HARD 1: Word problem
    const wordProblem = () => {
        const l = randomInt(8, 15); const b = randomInt(5, 10); const h = randomInt(3, 8);
        const sa = 2 * (l * b + b * h + h * l);
        const correctAnswer = `$${sa}$ cm²`;
        return {
            text: `<div class='question-container'><p>A rectangular box is $${l}$ cm long, $${b}$ cm wide and $${h}$ cm tall. How much cardboard is needed to make this box (no overlapping)?</p></div>`,
            correctAnswer,
            solution: `Cardboard needed = TSA of cuboid<br/><br/>$= 2(lb + bh + hl)$<br/><br/>$= 2(${l * b} + ${b * h} + ${h * l}) = ${sa}$ cm²`,
            options: [`$${sa}$ cm²`, `$${l * b * h}$ cm²`, `$${sa + 10}$ cm²`, `$${2 * l * b}$ cm²`]
        };
    };

    // HARD 2: Compare SAs
    const compareSA = () => {
        const l1 = randomInt(4, 8); const b1 = randomInt(3, 6); const h1 = randomInt(2, 5);
        const l2 = l1 + randomInt(1, 3); const b2 = b1 + randomInt(1, 2); const h2 = h1 + randomInt(1, 2);
        const sa1 = 2 * (l1 * b1 + b1 * h1 + h1 * l1);
        const sa2 = 2 * (l2 * b2 + b2 * h2 + h2 * l2);
        const diff = sa2 - sa1;
        const correctAnswer = `$${diff}$ cm²`;
        return {
            text: `<div class='question-container'><p>How much more surface area does a cuboid of $${l2}$ cm × $${b2}$ cm × $${h2}$ cm have than a cuboid of $${l1}$ cm × $${b1}$ cm × $${h1}$ cm?</p></div>`,
            correctAnswer,
            solution: `TSA₁ $= 2(${l1}\\times${b1} + ${b1}\\times${h1} + ${h1}\\times${l1}) = ${sa1}$ cm²<br/><br/>TSA₂ $= 2(${l2}\\times${b2} + ${b2}\\times${h2} + ${h2}\\times${l2}) = ${sa2}$ cm²<br/><br/>Difference $= ${sa2} - ${sa1} = ${diff}$ cm²`,
            options: [`$${diff}$ cm²`, `$${sa1}$ cm²`, `$${sa2}$ cm²`, `$${diff + 10}$ cm²`]
        };
    };

    // HARD 3: Open box (no lid)
    const openBox = () => {
        const l = randomInt(6, 12); const b = randomInt(4, 9); const h = randomInt(3, 7);
        const sa = 2 * (b * h + h * l) + l * b;
        const correctAnswer = `$${sa}$ cm²`;
        return {
            text: `<div class='question-container'><p>An open box (without a lid) has dimensions $${l}$ cm × $${b}$ cm × $${h}$ cm. Find its total outer surface area.</p></div>`,
            correctAnswer,
            solution: `Open box SA = TSA − area of top<br/><br/>$= 2(bh + hl) + lb$<br/><br/>$= 2(${b}\\times${h} + ${h}\\times${l}) + ${l}\\times${b}$<br/><br/>$= 2(${b * h} + ${h * l}) + ${l * b}$<br/><br/>$= ${2 * (b * h + h * l)} + ${l * b} = ${sa}$ cm²`,
            options: [`$${sa}$ cm²`, `$${2 * (l * b + b * h + h * l)}$ cm²`, `$${sa + l * b}$ cm²`, `$${sa - b * h}$ cm²`]
        };
    };

    // BONUS: Real world
    const realWorld = () => {
        const l = randomInt(3, 8); const b = randomInt(2, 5); const h = randomInt(2, 4);
        const sa = 2 * (l * b + b * h + h * l);
        const sheets = Math.ceil(sa / 100);
        const correctAnswer = `$${sa}$ cm²`;
        return {
            text: `<div class='question-container'><p>A gift box is $${l}$ cm × $${b}$ cm × $${h}$ cm. How much wrapping paper (in cm²) is needed to cover it completely?</p></div>`,
            correctAnswer,
            solution: `Wrapping paper = TSA of box<br/><br/>$= 2(${l}\\times${b} + ${b}\\times${h} + ${h}\\times${l})$<br/><br/>$= 2(${l * b} + ${b * h} + ${h * l}) = ${sa}$ cm²`,
            options: [`$${sa}$ cm²`, `$${l * b * h}$ cm²`, `$${sa + l}$ cm²`, `$${2 * (l + b + h)}$ cm²`]
        };
    };

    const formatTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins}:${secs.toString().padStart(2, '0')}`; };

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.round(timeSpent / 1000);

        const v4Entry = {
            question_index: qIndex,
            answer_json: { selected },
            is_correct: isCorrect === true,
            marks_awarded: isCorrect === true ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: timeSpent || 0,
        };
        answersPayload.current[qIndex] = v4Entry;
        logAnswer(v4Entry);

        try {
            await api.recordAttempt({ user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard', question_text: String(question.text || ''), correct_answer: String(question.correctAnswer || ''), student_answer: String(selected || ''), is_correct: isCorrect, solution_text: String(question.solution || ''), time_spent_seconds: seconds >= 0 ? seconds : 0 });
        } catch (e) { console.error("Failed to record attempt", e); }
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight); setIsSubmitted(true); setAnswers(prev => ({ ...prev, [qIndex]: isRight }));
        if (isRight) { setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]); }
        else { setShowExplanationModal(true); }
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleNext = async () => {
        if (history.current[qIndex]) { history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; }
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
            accumulatedTime.current = 0; questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            if (!isFinishedRef.current) { isFinishedRef.current = true; await finishSessionV4({ answers_payload: answersPayload.current.filter(Boolean) }); }
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val === true).length;
                try { await api.createReport({ title: SKILL_NAME, type: 'practice', score: (totalCorrect / TOTAL_QUESTIONS) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(userId, 10) }); } catch (err) { console.error("Failed to create report", err); }
            }
            setShowReportModal(true);
        }
    };

    const handlePrevious = () => {
        if (history.current[qIndex]) { history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; }
        if (qIndex > 0) { setQIndex(prev => prev - 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); }
    };

    const handleOptionSelect = (option) => { if (isSubmitted) return; setSelectedOption(option); };
    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                </div>
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
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (<button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: 'normal' }} onClick={() => handleOptionSelect(option)} disabled={isSubmitted}><LatexContent html={option} /></button>))}
                                        </div>
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

export default SurfaceAreaCuboidComponent;

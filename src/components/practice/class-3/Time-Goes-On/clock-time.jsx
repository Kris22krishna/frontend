import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/grade3/time-goes-on.css';

const SKILL_ID = 3019;
const SKILL_NAME = 'Reading & Calculating Time on Clocks';
const SHORT_SKILL_NAME = 'Clock Time';
const TOTAL_QUESTIONS = 10;
const CORRECT_MESSAGES = ['🕐 Perfect clock reading!', '⏰ You got the time right!', '🎉 Excellent!', '✨ Spot on!', '🚀 Clock master!'];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Build an analog clock SVG
const buildClockSVG = (hours, minutes) => {
    const cx = 60, cy = 60, r = 55;
    const minAngle = (minutes / 60) * 360 - 90;
    const hrAngle = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 - 90;
    const toXY = (angle, len) => ({
        x: cx + len * Math.cos(angle * Math.PI / 180),
        y: cy + len * Math.sin(angle * Math.PI / 180)
    });
    const minHand = toXY(minAngle, 40);
    const hrHand = toXY(hrAngle, 28);

    let ticks = '';
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * 360 - 90;
        const outer = toXY(angle, r - 4);
        const inner = toXY(angle, r - 10);
        ticks += `<line x1="${outer.x}" y1="${outer.y}" x2="${inner.x}" y2="${inner.y}" stroke="#E65100" stroke-width="2"/>`;
    }
    let nums = '';
    const numLabels = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * 360 - 90;
        const pos = toXY(angle, r - 18);
        nums += `<text x="${pos.x}" y="${pos.y + 4}" text-anchor="middle" font-size="9" font-weight="bold" fill="#333">${numLabels[i]}</text>`;
    }
    return `<svg viewBox="0 0 120 120" width="120" height="120" style="display:block;margin:auto;">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="white" stroke="#FF9800" stroke-width="3"/>
        <circle cx="${cx}" cy="${cy}" r="${r - 4}" fill="#FFF8F0" stroke="#FFCC80" stroke-width="1"/>
        ${ticks}${nums}
        <line x1="${cx}" y1="${cy}" x2="${hrHand.x}" y2="${hrHand.y}" stroke="#333" stroke-width="4" stroke-linecap="round"/>
        <line x1="${cx}" y1="${cy}" x2="${minHand.x}" y2="${minHand.y}" stroke="#E65100" stroke-width="3" stroke-linecap="round"/>
        <circle cx="${cx}" cy="${cy}" r="4" fill="#E65100"/>
    </svg>`;
};

const formatDigital = (h, m) => `${h}:${m.toString().padStart(2, '0')}`;

const questionGenerators = [
    () => {
        const h = randomInt(1, 12);
        const m = [0, 15, 30, 45][randomInt(0, 3)];
        const clockSVG = buildClockSVG(h, m);
        const answer = formatDigital(h, m);
        const wrong = [formatDigital(h === 12 ? 1 : h + 1, m), formatDigital(h === 1 ? 12 : h - 1, m), formatDigital(h, m === 0 ? 30 : m - 15)].filter(v => v !== answer);
        const options = [answer, ...wrong.slice(0, 3)].sort(() => Math.random() - 0.5);
        return { text: 'What time does the clock show?', visual: clockSVG, options, correctAnswer: answer, solution: `The hour hand points near ${h} and the minute hand points to ${m === 0 ? 12 : m / 5}. The time is ${answer}.` };
    },
    () => {
        const h = randomInt(1, 12);
        const m = 0;
        const clockSVG = buildClockSVG(h, m);
        const answer = '12';
        const wrong = ['3', '6', '9'].sort(() => Math.random() - 0.5);
        const options = [answer, ...wrong].sort(() => Math.random() - 0.5);
        return { text: `The clock shows ${h}:00. Where does the minute hand point?`, visual: clockSVG, options, correctAnswer: answer, solution: 'When the time is at exactly :00 (o\'clock), the minute hand always points to 12.' };
    },
    () => {
        const h = randomInt(1, 11);
        const startM = [0, 15, 30][randomInt(0, 2)];
        const addM = [15, 30, 45][randomInt(0, 2)];
        const totalM = startM + addM;
        const endH = totalM >= 60 ? h + 1 : h;
        const endM = totalM % 60;
        const answer = formatDigital(endH, endM);
        const wrong = [formatDigital(endH + 1, endM), formatDigital(endH, endM === 0 ? 15 : 0), formatDigital(endH, 30)].filter(v => v !== answer);
        const options = [answer, ...wrong.slice(0, 3)].sort(() => Math.random() - 0.5);
        return { text: `The clock shows ${formatDigital(h, startM)}. What time will it be after ${addM} minutes?`, visual: buildClockSVG(h, startM), options, correctAnswer: answer, solution: `${formatDigital(h, startM)} + ${addM} minutes = ${answer}.` };
    },
    () => {
        const h = randomInt(1, 11);
        const startM = [30, 45][randomInt(0, 1)];
        const endM = 0;
        const minsLeft = 60 - startM;
        const answer = `${minsLeft} minutes`;
        const wrong = [`${minsLeft - 15} minutes`, `${minsLeft + 15} minutes`, `${minsLeft + 5} minutes`].filter(v => v !== answer);
        const options = [answer, ...wrong.slice(0, 3)].sort(() => Math.random() - 0.5);
        return { text: `The clock shows ${formatDigital(h, startM)}. How many minutes until ${h + 1}:00?`, visual: buildClockSVG(h, startM), options, correctAnswer: answer, solution: `From ${startM} minutes past, there are ${minsLeft} minutes left to complete the hour.` };
    },
    () => {
        const h = randomInt(1, 12);
        const minsInHour = 60;
        const answer = '60';
        const options = ['30', '45', '60', '90'].sort(() => Math.random() - 0.5);
        return { text: 'How many minutes does the minute hand take to complete one full round of the clock?', visual: buildClockSVG(h, 0), options, correctAnswer: answer, solution: 'The minute hand takes 60 minutes (1 hour) to make one complete revolution around the clock.' };
    },
];

const ClockTime = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [showReport, setShowReport] = useState(false);
    const [finalTime, setFinalTime] = useState(0);
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) { api.createPracticeSession(userId, SKILL_ID).then(sess => { if (sess?.session_id) setSessionId(sess.session_id); }).catch(console.error); }
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const handleVC = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener('visibilitychange', handleVC);
        return () => { clearInterval(timer); document.removeEventListener('visibilitychange', handleVC); };
    }, []);

    useEffect(() => { generateQuestion(qIndex); }, [qIndex]);

    const generateQuestion = (_i) => {
        const gen = questionGenerators[randomInt(0, questionGenerators.length - 1)];
        const qData = gen();
        setShuffledOptions([...qData.options].sort(() => Math.random() - 0.5));
        setCurrentQuestion(qData); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); setFeedbackMessage('');
    };

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    const recordAttempt = async (question, selected, correct) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let t = accumulatedTime.current + (isTabActive.current ? Date.now() - questionStartTime.current : 0);
        try { await api.recordAttempt({ user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: 'Easy', question_text: question.text, correct_answer: String(question.correctAnswer || ''), student_answer: String(selected || ''), is_correct: correct, solution_text: String(question.solution || ''), time_spent_seconds: Math.max(0, Math.round(t / 1000)) }); } catch (e) { console.error(e); }
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight); setIsSubmitted(true); setAnswers(prev => ({ ...prev, [qIndex]: isRight }));
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        recordAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(p => p + 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); accumulatedTime.current = 0; questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) { const tc = Object.values(answers).filter(v => v).length; try { await api.createReport({ title: SKILL_NAME, type: 'practice', score: (tc / TOTAL_QUESTIONS) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: tc, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(userId, 10) }); } catch (e) { console.error(e); } }
            setFinalTime(timeElapsed); setShowReport(true);
        }
    };

    const handlePrev = () => { if (qIndex > 0) { setQIndex(p => p - 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); accumulatedTime.current = 0; questionStartTime.current = Date.now(); } };

    if (!currentQuestion && !showReport) return <div>Loading...</div>;

    if (showReport) {
        const totalCorrect = Object.values(answers).filter(v => v).length;
        const percentage = Math.round((totalCorrect / TOTAL_QUESTIONS) * 100);
        const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
        return (
            <div className="junior-practice-page" style={{ height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FFF8F0, #FFF3E0)' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'white', borderRadius: '2rem', padding: '2.5rem 3rem', maxWidth: '480px', width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(255,152,0,0.2)', border: '3px solid rgba(255,152,0,0.3)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stars === 3 ? '🌟🌟🌟' : stars === 2 ? '⭐⭐' : '⭐'}</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#31326F', marginBottom: '0.25rem' }}>Practice Complete!</h2>
                    <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{SKILL_NAME}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ background: '#f0fdf4', borderRadius: '1rem', padding: '1rem 1.5rem', border: '2px solid #86efac' }}><div style={{ fontSize: '2rem', fontWeight: 900, color: '#16a34a' }}>{totalCorrect}/{TOTAL_QUESTIONS}</div><div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Correct</div></div>
                        <div style={{ background: '#eff6ff', borderRadius: '1rem', padding: '1rem 1.5rem', border: '2px solid #93c5fd' }}><div style={{ fontSize: '2rem', fontWeight: 900, color: '#2563eb' }}>{percentage}%</div><div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Score</div></div>
                        <div style={{ background: '#fef3c7', borderRadius: '1rem', padding: '1rem 1.5rem', border: '2px solid #fcd34d' }}><div style={{ fontSize: '2rem', fontWeight: 900, color: '#d97706' }}>{formatTime(finalTime)}</div><div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Time</div></div>
                    </div>
                    <button onClick={() => navigate(-1)} className="nav-pill-next-btn" style={{ width: '100%', justifyContent: 'center' }}>Go Back <ChevronRight size={22} strokeWidth={3} /></button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page grey-selection-theme font-sans">
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem', position: 'relative', background: 'linear-gradient(135deg, #FFF3E0, #FFCCBC)' }}>
                <div className="header-left"><span className="skill-name-desktop text-[#E65100] font-normal text-lg sm:text-xl">🕐 {SKILL_NAME}</span><span className="skill-name-mobile text-[#E65100] font-normal text-lg sm:text-xl">{SHORT_SKILL_NAME}</span></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-center"><div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#FF9800]/30 text-[#E65100] text-sm sm:text-lg lg:text-2xl shadow-lg whitespace-nowrap font-medium"><span className="hidden sm:inline">Question </span>{qIndex + 1} / {TOTAL_QUESTIONS}</div></div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border-2 border-[#FF9800]/30 text-[#E65100] font-bold text-sm sm:text-lg shadow-md">{formatTime(timeElapsed)}</div></div>
            </header>
            <main className="practice-content-wrapper">
                <div className="practice-board-container mt-2" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }} style={{ width: '100%' }}>
                                <div className="question-card-modern flex flex-col justify-start w-full bg-white rounded-3xl px-6 sm:px-10 pt-8 sm:pt-10 pb-6 sm:pb-10 shadow-lg" style={{ height: 'auto', minHeight: '100%', borderTop: '4px solid #FF9800' }}>
                                    <div className="question-header-modern mb-2 w-full"><h2 className="text-xl sm:text-2xl font-normal text-[#31326F] text-center w-full"><LatexContent html={currentQuestion.text} /></h2></div>
                                    <div className={`flex flex-col ${currentQuestion.visual ? 'md:flex-row' : ''} w-full items-center justify-center gap-3 lg:gap-6 mt-0`}>
                                        {currentQuestion.visual && <div className="chart-container w-full max-w-xs flex flex-col items-center justify-center"><div dangerouslySetInnerHTML={{ __html: currentQuestion.visual }} /></div>}
                                        <div className={`interaction-area-modern flex-1 w-full flex flex-col items-center mx-auto ${currentQuestion.visual ? 'max-w-sm' : 'max-w-3xl mt-6'}`}>
                                            <div className={`options-grid-modern w-full ${currentQuestion.visual ? 'flex flex-col gap-2' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}`}>
                                                {shuffledOptions.map((option, idx) => (
                                                    <button key={idx} onClick={() => !isSubmitted && setSelectedOption(option)} disabled={isSubmitted} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && option !== currentQuestion.correctAnswer ? 'wrong' : ''}`}>
                                                        <LatexContent html={option} />
                                                    </button>
                                                ))}
                                            </div>
                                            {isSubmitted && isCorrect && <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>{feedbackMessage}</motion.div>}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />
            <footer className="junior-bottom-bar" style={{ background: 'linear-gradient(135deg, #FFF3E0, #FFCCBC)' }}>
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] px-6 py-2 rounded-full text-lg" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>Exit</button></div>
                    <div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}</div>
                    <div className="bottom-right"><div className="nav-buttons-group" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button className={`nav-pill-prev-btn flex items-center gap-2 ${qIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handlePrev} disabled={qIndex === 0} style={{ opacity: qIndex === 0 ? 0.5 : 1, marginRight: '10px' }}><ChevronLeft size={24} strokeWidth={3} /> PREV</button>
                        {isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? <><>NEXT <ChevronRight size={24} strokeWidth={3} /></></> : <><>DONE <Check size={24} strokeWidth={3} /></></>}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>SUBMIT <Check size={24} strokeWidth={3} /></button>}
                    </div></div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2"><button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>}</div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}><div className="nav-buttons-group">
                        <button className={`nav-pill-prev-btn flex items-center gap-2 ${qIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handlePrev} disabled={qIndex === 0} style={{ opacity: qIndex === 0 ? 0.5 : 1, padding: '8px 12px', marginRight: '8px', backgroundColor: '#FFF3E0', color: '#E65100', minWidth: 'auto' }}><ChevronLeft size={24} strokeWidth={3} /> PREV</button>
                        {isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? 'NEXT' : 'DONE'}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>SUBMIT</button>}
                    </div></div>
                </div>
            </footer>
        </div>
    );
};

export default ClockTime;

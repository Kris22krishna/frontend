import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, BookOpen, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨", "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉", "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀", "🌈 Perfect! Well done! 🌈",
];

const SKILL_ID = 12301;
const SKILL_NAME = "Determinant of Order 1, 2, 3";
const TOTAL_QUESTIONS = 10;

const DeterminantOrderPractice = () => {
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
    const [answers, setAnswers] = useState({});
    const [showLearnMenu, setShowLearnMenu] = useState(false);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const history = useRef({});
    const isTabActive = useRef(true);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) { api.createPracticeSession(userId, SKILL_ID).then(s => { if (s?.session_id) setSessionId(s.session_id); }).catch(console.error); }
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const handleVis = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener("visibilitychange", handleVis);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", handleVis); };
    }, []);
    useEffect(() => { generateQuestion(qIndex); }, [qIndex]);
    useEffect(() => { setShowExplanationModal(false); }, [qIndex]);

    const generateQuestion = (index) => {
        const types = ['e1', 'e2', 'e3', 'm1', 'm2', 'm3', 'h1', 'h2', 'h3', 'bonus'];
        if (!window._detOrderShuffle) window._detOrderShuffle = [...types].sort(() => Math.random() - 0.5);
        if (history.current[index]) { const s = history.current[index]; setCurrentQuestion(s.qData); setShuffledOptions(s.shuffledOptions); setSelectedOption(s.selectedOption); setIsSubmitted(s.isSubmitted); setIsCorrect(s.isCorrect); return; }
        const t = window._detOrderShuffle[index] || 'e1';
        let q;
        switch (t) { case 'e1': q = e1(); break; case 'e2': q = e2(); break; case 'e3': q = e3(); break; case 'm1': q = m1(); break; case 'm2': q = m2(); break; case 'm3': q = m3(); break; case 'h1': q = h1(); break; case 'h2': q = h2(); break; case 'h3': q = h3(); break; case 'bonus': q = bonus(); break; default: q = e1(); }
        const so = [...q.options].sort(() => Math.random() - 0.5);
        history.current[index] = { qData: q, shuffledOptions: so, selectedOption: null, isSubmitted: false, isCorrect: false };
        setShuffledOptions(so); setCurrentQuestion(q); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
    };

    // EASY: 2x2 determinants
    const e1 = () => { const a = randomInt(1, 9), b = randomInt(1, 9), c = randomInt(1, 9), d = randomInt(1, 9); const det = a * d - b * c; return { text: `<div class='question-container'><p>Evaluate the determinant: $\\begin{vmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{vmatrix}$</p></div>`, correctAnswer: `$${det}$`, solution: `$= ${a} \\times ${d} - ${b} \\times ${c} = ${a * d} - ${b * c} = ${det}$`, options: [`$${det}$`, `$${det + randomInt(1, 5)}$`, `$${det - randomInt(1, 5)}$`, `$${-det}$`] }; };
    const e2 = () => { const a = randomInt(-5, 5), b = randomInt(1, 8), c = randomInt(1, 8), d = randomInt(-5, 5); const det = a * d - b * c; return { text: `<div class='question-container'><p>Evaluate: $\\begin{vmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{vmatrix}$</p></div>`, correctAnswer: `$${det}$`, solution: `$= (${a})(${d}) - (${b})(${c}) = ${a * d} - ${b * c} = ${det}$`, options: [`$${det}$`, `$${det + 3}$`, `$${-det}$`, `$${det - 4}$`] }; };
    const e3 = () => { const x = randomInt(2, 7); const det = x * x - (x + 1) * (x - 1); return { text: `<div class='question-container'><p>Evaluate: $\\begin{vmatrix} x & x+1 \\\\ x-1 & x \\end{vmatrix}$ for $x = ${x}$</p></div>`, correctAnswer: `$${det}$`, solution: `$= x \\cdot x - (x+1)(x-1) = x^2 - (x^2-1) = 1$<br/>For $x=${x}$: answer is $1$.`, options: [`$${det}$`, `$${x}$`, `$0$`, `$${x * x}$`] }; };

    // MEDIUM: 3x3 with some zeros
    const m1 = () => {
        const a = randomInt(1, 5), b = randomInt(1, 4), c = randomInt(1, 4); const det = a * (b * 0 - c * 0) - 0 + 0; const realDet = a * b * c; // Using diagonal for simple case
        const r = [[a, 0, 0], [0, b, 0], [0, 0, c]]; const d = a * b * c;
        return { text: `<div class='question-container'><p>Evaluate: $\\begin{vmatrix} ${a} & 0 & 0 \\\\ 0 & ${b} & 0 \\\\ 0 & 0 & ${c} \\end{vmatrix}$</p></div>`, correctAnswer: `$${d}$`, solution: `Diagonal matrix: determinant $= ${a} \\times ${b} \\times ${c} = ${d}$`, options: [`$${d}$`, `$${a + b + c}$`, `$${d + randomInt(1, 5)}$`, `$0$`] };
    };
    const m2 = () => {
        const a = randomInt(1, 4), b = randomInt(1, 4), c = randomInt(1, 5), d2 = randomInt(1, 4), e = randomInt(-3, 3), f = randomInt(1, 4);
        const det = a * (d2 * 0 - e * f) - b * (0 - 0) + c * (0 - 0); // row with zeros
        const mat = [[a, b, c], [0, d2, e], [0, 0, f]]; const dd = a * d2 * f;
        return { text: `<div class='question-container'><p>Evaluate: $\\begin{vmatrix} ${a} & ${b} & ${c} \\\\ 0 & ${d2} & ${e} \\\\ 0 & 0 & ${f} \\end{vmatrix}$</p></div>`, correctAnswer: `$${dd}$`, solution: `Upper triangular matrix: determinant $= ${a} \\times ${d2} \\times ${f} = ${dd}$`, options: [`$${dd}$`, `$${dd + randomInt(2, 6)}$`, `$${-dd}$`, `$${a * d2 + f}$`] };
    };
    const m3 = () => {
        const a = randomInt(1, 5), b = randomInt(1, 5), c = randomInt(1, 5), d = randomInt(1, 3); const det = 1 * (a * d - b * c) - 2 * (0) + 4 * (0);
        const r1 = [1, 2, 4], r2 = [-1, a, 0], r3 = [0, b, 0]; // expand along C3
        const detVal = 4 * (-1 * b - 0 * a); // but let me compute properly
        const realDet = 1 * (a * 0 - 0 * b) - 2 * (-1 * 0 - 0 * 0) + 4 * (-1 * b - a * 0);
        const answer = -4 * b;
        return { text: `<div class='question-container'><p>Evaluate: $\\begin{vmatrix} 1 & 2 & 4 \\\\ -1 & ${a} & 0 \\\\ 0 & ${b} & 0 \\end{vmatrix}$</p></div>`, correctAnswer: `$${answer}$`, solution: `Expand along C3: $4 \\cdot \\begin{vmatrix} -1 & ${a} \\\\ 0 & ${b} \\end{vmatrix} \\cdot (-1)^{1+3}$<br/>$= 4(-${b}) = ${answer}$`, options: [`$${answer}$`, `$${-answer}$`, `$${answer + b}$`, `$0$`] };
    };

    // HARD: full 3x3
    const h1 = () => {
        const a = randomInt(1, 4), b = randomInt(-3, 3), c = randomInt(1, 3), d = randomInt(-2, 4), e = randomInt(1, 5), f = randomInt(-3, 3), g = randomInt(1, 3), h = randomInt(-2, 3), k = randomInt(1, 4);
        const det = a * (e * k - f * h) - b * (d * k - f * g) + c * (d * h - e * g);
        return { text: `<div class='question-container'><p>Evaluate: $\\begin{vmatrix} ${a} & ${b} & ${c} \\\\ ${d} & ${e} & ${f} \\\\ ${g} & ${h} & ${k} \\end{vmatrix}$</p></div>`, correctAnswer: `$${det}$`, solution: `Expanding along R1:<br/>$= ${a}(${e}\\cdot${k}-${f}\\cdot${h}) - (${b})(${d}\\cdot${k}-${f}\\cdot${g}) + ${c}(${d}\\cdot${h}-${e}\\cdot${g})$<br/>$= ${a}(${e * k - f * h}) - (${b})(${d * k - f * g}) + ${c}(${d * h - e * g})$<br/>$= ${a * (e * k - f * h)} + ${-b * (d * k - f * g)} + ${c * (d * h - e * g)} = ${det}$`, options: [`$${det}$`, `$${det + randomInt(1, 8)}$`, `$${-det}$`, `$${det - randomInt(1, 8)}$`] };
    };
    const h2 = () => {
        const a = randomInt(2, 5), b = randomInt(1, 4), c = randomInt(1, 3), d = randomInt(1, 4), e = randomInt(2, 6), f = randomInt(1, 3), g = randomInt(1, 4), h = randomInt(1, 3), k = randomInt(2, 5);
        const det = a * (e * k - f * h) - b * (d * k - f * g) + c * (d * h - e * g);
        return { text: `<div class='question-container'><p>Find the value of $\\begin{vmatrix} ${a} & ${b} & ${c} \\\\ ${d} & ${e} & ${f} \\\\ ${g} & ${h} & ${k} \\end{vmatrix}$</p></div>`, correctAnswer: `$${det}$`, solution: `Expanding along R1: $= ${det}$`, options: [`$${det}$`, `$${det + 5}$`, `$${det - 3}$`, `$${-det}$`] };
    };
    const h3 = () => { // determinant with trig placeholder — use numeric
        const a = 0, b = randomInt(1, 3), c = randomInt(1, 3); const det = 0 - (b * c * (-1)); // sinα=b, cosα=c type scenario
        const ans = 0;
        return { text: `<div class='question-container'><p>Evaluate: $\\begin{vmatrix} 0 & \\sin\\alpha & -\\cos\\alpha \\\\ -\\sin\\alpha & 0 & \\sin\\beta \\\\ \\cos\\alpha & -\\sin\\beta & 0 \\end{vmatrix}$</p></div>`, correctAnswer: `$0$`, solution: `This is a skew-symmetric matrix of odd order 3.<br/>For any skew-symmetric matrix of odd order, determinant $= 0$.`, options: [`$0$`, `$1$`, `$\\sin\\alpha\\cos\\beta$`, `$-1$`] };
    };

    const bonus = () => {
        const k = randomInt(2, 5); const det = k * k * k * 1; // det(kA) = k^n * det(A) for nxn
        return { text: `<div class='question-container'><p>If $A = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$, find $|${k}A|$.</p></div>`, correctAnswer: `$${k * k}$`, solution: `For an $n \\times n$ matrix, $|kA| = k^n|A|$.<br/>Here $n=2$, $|A|=1$.<br/>$|${k}A| = ${k}^2 \\cdot 1 = ${k * k}$`, options: [`$${k * k}$`, `$${k}$`, `$${2 * k}$`, `$${k * k * k}$`] };
    };

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const recordAttempt = async (question, selected, correct) => { const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (!userId) return; let ts = accumulatedTime.current; if (isTabActive.current) ts += Date.now() - questionStartTime.current; const sec = Math.round(ts / 1000); try { await api.recordAttempt({ user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard', question_text: String(question.text || ''), correct_answer: String(question.correctAnswer || ''), student_answer: String(selected || ''), is_correct: correct, solution_text: String(question.solution || ''), time_spent_seconds: sec >= 0 ? sec : 0 }); } catch (e) { console.error(e); } };
    const handleCheck = () => { if (!selectedOption || !currentQuestion) return; const r = selectedOption === currentQuestion.correctAnswer; setIsCorrect(r); setIsSubmitted(true); setAnswers(p => ({ ...p, [qIndex]: r })); if (r) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]); else setShowExplanationModal(true); recordAttempt(currentQuestion, selectedOption, r); };
    const handleNext = async () => { if (history.current[qIndex]) history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; if (qIndex < TOTAL_QUESTIONS - 1) { setQIndex(p => p + 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); accumulatedTime.current = 0; questionStartTime.current = Date.now(); } else { if (sessionId) await api.finishSession(sessionId).catch(console.error); const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (userId) { const tc = Object.values(answers).filter(v => v === true).length; try { await api.createReport({ title: SKILL_NAME, type: 'practice', score: (tc / TOTAL_QUESTIONS) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: tc, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(userId, 10) }); } catch (e) { console.error(e); } } navigate(-1); } };
    const handlePrevious = () => { if (history.current[qIndex]) history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; if (qIndex > 0) { setQIndex(p => p - 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); } };
    const handleOptionSelect = (o) => { if (isSubmitted) return; setSelectedOption(o); };
    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"><div className="skill-name-label">{SKILL_NAME}</div></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max"><div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div></div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{formatTime(timeElapsed)}</div></div>
            </header>
            <main className="practice-content-wrapper">
                <div className="skill-name-mobile">{SKILL_NAME}</div>
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem', justifyContent: 'flex-start' }}>
                                    <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "1rem" }}><h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem,2vw,1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}><LatexContent html={currentQuestion.text} /></h2></div>
                                    <div className="interaction-area-modern" style={{ marginTop: '1rem', flex: "none" }}>
                                        <div className="options-grid-modern">{shuffledOptions.map((o, i) => (<button key={i} className={`option-btn-modern ${selectedOption === o ? 'selected' : ''} ${isSubmitted && o === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === o && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: '500' }} onClick={() => handleOptionSelect(o)} disabled={isSubmitted}><LatexContent html={o} /></button>))}</div>
                                        {isSubmitted && isCorrect && (<motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px', gridColumn: '1 / -1', justifySelf: 'center', textAlign: 'center', width: '100%' }}>{feedbackMessage}</motion.div>)}
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
                    <div className="bottom-center" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {isSubmitted && (<button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>)}
                        {!isSubmitted ? (
                            <>
                                <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl border-2 border-indigo-100 font-bold hover:bg-indigo-100 transition-colors flex items-center gap-2 text-sm" onClick={() => navigate('/senior/grade/12/determinants/determinant-order/5w1h')}><BookOpen size={16} /> Learn 5W1H</button>
                                <button className="bg-amber-50 text-amber-600 px-4 py-2 rounded-xl border-2 border-amber-100 font-bold hover:bg-amber-100 transition-colors flex items-center gap-2 text-sm" onClick={() => navigate('/senior/grade/12/determinants/determinant-order/examples')}><Lightbulb size={16} /> Learn by Example</button>
                            </>
                        ) : (
                            <div style={{ position: 'relative' }}>
                                <button className="bg-purple-50 text-purple-600 px-4 py-2 rounded-xl border-2 border-purple-100 font-bold hover:bg-purple-100 transition-colors flex items-center gap-2 text-sm" onClick={() => setShowLearnMenu(!showLearnMenu)}><BookOpen size={16} /> Learn More ▾</button>
                                {showLearnMenu && (
                                    <div style={{ position: 'absolute', bottom: '110%', left: 0, background: '#fff', border: '2px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '8px', zIndex: 50, minWidth: '180px' }}>
                                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', width: '100%', fontWeight: 600, fontSize: '0.85rem', color: '#4F46E5' }} onClick={() => { setShowLearnMenu(false); navigate('/senior/grade/12/determinants/determinant-order/5w1h'); }} onMouseOver={e => e.currentTarget.style.background = '#EEF2FF'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}><BookOpen size={16} /> Learn with 5W1H</button>
                                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', width: '100%', fontWeight: 600, fontSize: '0.85rem', color: '#D97706' }} onClick={() => { setShowLearnMenu(false); navigate('/senior/grade/12/determinants/determinant-order/examples'); }} onMouseOver={e => e.currentTarget.style.background = '#FFFBEB'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}><Lightbulb size={16} /> Learn with Example</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="bottom-right"><div className="nav-buttons-group">{qIndex > 0 && (<button className="nav-pill-prev-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Previous</button>)}{isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>)}</div></div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>
                        {isSubmitted && (<button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>)}
                        <div style={{ position: 'relative' }}>
                            <button className="bg-purple-50 text-purple-600 p-2 rounded-lg border border-purple-100" onClick={() => setShowLearnMenu(!showLearnMenu)}><BookOpen size={18} /></button>
                            {showLearnMenu && (
                                <div style={{ position: 'absolute', bottom: '110%', left: 0, background: '#fff', border: '2px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '8px', zIndex: 50, minWidth: '160px' }}>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', width: '100%', fontWeight: 600, fontSize: '0.8rem', color: '#4F46E5' }} onClick={() => { setShowLearnMenu(false); navigate('/senior/grade/12/determinants/determinant-order/5w1h'); }}><BookOpen size={14} /> 5W1H</button>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', width: '100%', fontWeight: 600, fontSize: '0.8rem', color: '#D97706' }} onClick={() => { setShowLearnMenu(false); navigate('/senior/grade/12/determinants/determinant-order/examples'); }}><Lightbulb size={14} /> Examples</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}><div className="nav-buttons-group">{qIndex > 0 && (<button className="nav-pill-prev-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Previous</button>)}{isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>)}</div></div>
                </div>
            </footer>
        </div>
    );
};

export default DeterminantOrderPractice;

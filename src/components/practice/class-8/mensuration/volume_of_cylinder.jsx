import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const CORRECT_MESSAGES = ["✨ Amazing job! ✨", "🌟 Brilliant! 🌟", "🎉 Correct! 🎉", "🚀 Super! 🚀", "🌈 Perfect! 🌈", "💎 Spot on! 💎"];

const VolumeOfCylinderComponent = () => {
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
    const SKILL_ID = 1133;
    const SKILL_NAME = "Mensuration - Volume of Cylinder";
    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) { api.createPracticeSession(userId, SKILL_ID).then(sess => { if (sess && sess.session_id) setSessionId(sess.session_id); }).catch(console.error); }
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        const hvc = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener("visibilitychange", hvc);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", hvc); };
    }, []);

    useEffect(() => { generateQuestion(qIndex); }, [qIndex]);

    const generateQuestion = (index) => {
        const types = ['basicVol', 'volDiam', 'findR', 'findH', 'waterCap', 'costFill', 'compare', 'halfFill', 'hollow', 'real'];
        if (!window.shMQ1133) { window.shMQ1133 = [...types].sort(() => Math.random() - 0.5); }
        if (history.current[index]) { const s = history.current[index]; setCurrentQuestion(s.qData); setShuffledOptions(s.shuffledOptions); setSelectedOption(s.selectedOption); setIsSubmitted(s.isSubmitted); setIsCorrect(s.isCorrect); return; }
        const t = window.shMQ1133[index] || 'basicVol';
        const fns = { basicVol, volDiam, findR, findH, waterCap, costFill, compare, halfFill, hollow, real };
        const qData = (fns[t] || basicVol)();
        const so = [...qData.options].sort(() => Math.random() - 0.5);
        history.current[index] = { qData, shuffledOptions: so, selectedOption: null, isSubmitted: false, isCorrect: false };
        setShuffledOptions(so); setCurrentQuestion(qData); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
    };

    const basicVol = () => { const r = randomInt(3, 10), h = randomInt(5, 15), v = parseFloat((3.14 * r * r * h).toFixed(2)); return { text: `<div class='question-container'><p>Find the volume of a cylinder with radius $${r}$ cm and height $${h}$ cm. ($\\pi=3.14$)</p></div>`, correctAnswer: `$${v}$ cm³`, solution: `Volume $=\\pi r^2 h=3.14\\times${r}^2\\times${h}=${v}$ cm³`, options: [`$${v}$ cm³`, `$${parseFloat((2 * 3.14 * r * h).toFixed(2))}$ cm³`, `$${parseFloat((v + r).toFixed(2))}$ cm³`, `$${parseFloat((3.14 * r * h).toFixed(2))}$ cm³`] }; };
    const volDiam = () => { const d = randomInt(4, 12) * 2, r = d / 2, h = randomInt(5, 15), v = parseFloat((3.14 * r * r * h).toFixed(2)); return { text: `<div class='question-container'><p>A cylinder has diameter $${d}$ cm and height $${h}$ cm. Find its volume. ($\\pi=3.14$)</p></div>`, correctAnswer: `$${v}$ cm³`, solution: `Radius $=${r}$ cm<br/>Volume $=3.14\\times${r}^2\\times${h}=${v}$ cm³`, options: [`$${v}$ cm³`, `$${parseFloat((3.14 * d * d * h).toFixed(2))}$ cm³`, `$${parseFloat((v + d).toFixed(2))}$ cm³`, `$${parseFloat((2 * 3.14 * r * h).toFixed(2))}$ cm³`] }; };
    const findR = () => { const r = randomInt(3, 8), h = randomInt(5, 12), v = parseFloat((3.14 * r * r * h).toFixed(2)); return { text: `<div class='question-container'><p>A cylinder has volume $${v}$ cm³ and height $${h}$ cm. Find radius. ($\\pi=3.14$)</p></div>`, correctAnswer: `$${r}$ cm`, solution: `$r^2=\\frac{${v}}{3.14\\times${h}}=${r * r}$, $r=${r}$ cm`, options: [`$${r}$ cm`, `$${r + 2}$ cm`, `$${r * 2}$ cm`, `$${r + 3}$ cm`] }; };
    const findH = () => { const r = randomInt(3, 7), h = randomInt(5, 12), v = parseFloat((3.14 * r * r * h).toFixed(2)); return { text: `<div class='question-container'><p>A cylinder has volume $${v}$ cm³ and radius $${r}$ cm. Find height. ($\\pi=3.14$)</p></div>`, correctAnswer: `$${h}$ cm`, solution: `$h=\\frac{${v}}{3.14\\times${r * r}}=${h}$ cm`, options: [`$${h}$ cm`, `$${h + 3}$ cm`, `$${r}$ cm`, `$${h + 4}$ cm`] }; };
    const waterCap = () => { const r = randomInt(5, 12), h = randomInt(10, 25), v = parseFloat((3.14 * r * r * h).toFixed(2)); return { text: `<div class='question-container'><p>Cylindrical tank: radius $${r}$ cm, height $${h}$ cm. Water capacity? ($\\pi=3.14$)</p></div>`, correctAnswer: `$${v}$ cm³`, solution: `Volume $=3.14\\times${r}^2\\times${h}=${v}$ cm³`, options: [`$${v}$ cm³`, `$${parseFloat((2 * 3.14 * r * h).toFixed(2))}$ cm³`, `$${parseFloat((v + r).toFixed(2))}$ cm³`, `$${parseFloat((3.14 * r * h).toFixed(2))}$ cm³`] }; };
    const costFill = () => { const r = randomInt(3, 6), h = randomInt(5, 10), v = parseFloat((3.14 * r * r * h).toFixed(2)), rate = randomInt(2, 8), c = parseFloat((v * rate).toFixed(2)); return { text: `<div class='question-container'><p>Cost to fill cylinder (r=$${r}$cm, h=$${h}$cm) at ₹$${rate}$/cm³? ($\\pi=3.14$)</p></div>`, correctAnswer: `₹$${c}$`, solution: `Volume $=${v}$ cm³, Cost $=${v}\\times${rate}=$ ₹$${c}$`, options: [`₹$${c}$`, `₹$${v}$`, `₹$${parseFloat((c + rate).toFixed(2))}$`, `₹$${parseFloat((c * 2).toFixed(2))}$`] }; };
    const compare = () => { const r1 = randomInt(3, 6), h1 = randomInt(5, 10), r2 = randomInt(4, 8), h2 = randomInt(6, 12), v1 = parseFloat((3.14 * r1 * r1 * h1).toFixed(2)), v2 = parseFloat((3.14 * r2 * r2 * h2).toFixed(2)), d = parseFloat(Math.abs(v1 - v2).toFixed(2)); return { text: `<div class='question-container'><p>Cyl A: r=$${r1}$, h=$${h1}$. Cyl B: r=$${r2}$, h=$${h2}$. Difference in volumes? ($\\pi=3.14$)</p></div>`, correctAnswer: `$${d}$ cm³`, solution: `V_A=$${v1}$, V_B=$${v2}$, Diff=$${d}$ cm³`, options: [`$${d}$ cm³`, `$${v1}$ cm³`, `$${v2}$ cm³`, `$${parseFloat((d + 10).toFixed(2))}$ cm³`] }; };
    const halfFill = () => { const r = randomInt(4, 9), h = randomInt(6, 14), v = parseFloat((3.14 * r * r * h).toFixed(2)), hv = parseFloat((v / 2).toFixed(2)); return { text: `<div class='question-container'><p>Cylinder (r=$${r}$, h=$${h}$) half filled. Volume of water? ($\\pi=3.14$)</p></div>`, correctAnswer: `$${hv}$ cm³`, solution: `Full=$${v}$, Half=$${hv}$ cm³`, options: [`$${hv}$ cm³`, `$${v}$ cm³`, `$${parseFloat((hv + r).toFixed(2))}$ cm³`, `$${parseFloat((3.14 * r * r).toFixed(2))}$ cm³`] }; };
    const hollow = () => { const R = randomInt(6, 10), r = randomInt(3, R - 1), h = randomInt(5, 12), v = parseFloat((3.14 * (R * R - r * r) * h).toFixed(2)); return { text: `<div class='question-container'><p>Hollow cylinder: R=$${R}$, r=$${r}$, h=$${h}$. Volume? ($\\pi=3.14$)</p></div>`, correctAnswer: `$${v}$ cm³`, solution: `$V=\\pi(R^2-r^2)h=3.14\\times${R * R - r * r}\\times${h}=${v}$`, options: [`$${v}$ cm³`, `$${parseFloat((3.14 * R * R * h).toFixed(2))}$ cm³`, `$${parseFloat((v + R * R).toFixed(2))}$ cm³`, `$${parseFloat((3.14 * r * r * h).toFixed(2))}$ cm³`] }; };
    const real = () => { const r = randomInt(3, 7), h = randomInt(8, 15), v = parseFloat((3.14 * r * r * h).toFixed(2)); return { text: `<div class='question-container'><p>Glass: r=$${r}$cm, h=$${h}$cm. How much juice? ($\\pi=3.14$)</p></div>`, correctAnswer: `$${v}$ cm³`, solution: `Volume $=3.14\\times${r * r}\\times${h}=${v}$ cm³`, options: [`$${v}$ cm³`, `$${parseFloat((2 * 3.14 * r * h).toFixed(2))}$ cm³`, `$${parseFloat((v + r).toFixed(2))}$ cm³`, `$${parseFloat((3.14 * r * h).toFixed(2))}$ cm³`] }; };

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const recordQuestionAttempt = async (q, sel, ic) => { const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (!uid) return; let ts = accumulatedTime.current; if (isTabActive.current) ts += Date.now() - questionStartTime.current; try { await api.recordAttempt({ user_id: parseInt(uid, 10), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard', question_text: String(q.text || ''), correct_answer: String(q.correctAnswer || ''), student_answer: String(sel || ''), is_correct: ic, solution_text: String(q.solution || ''), time_spent_seconds: Math.max(0, Math.round(ts / 1000)) }); } catch (e) { console.error(e); } };
    const handleCheck = () => { if (!selectedOption || !currentQuestion) return; const ir = selectedOption === currentQuestion.correctAnswer; setIsCorrect(ir); setIsSubmitted(true); setAnswers(p => ({ ...p, [qIndex]: ir })); if (ir) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]); else setShowExplanationModal(true); recordQuestionAttempt(currentQuestion, selectedOption, ir); };
    const handleNext = async () => { if (history.current[qIndex]) history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; if (qIndex < TOTAL_QUESTIONS - 1) { setQIndex(p => p + 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); accumulatedTime.current = 0; questionStartTime.current = Date.now(); } else { if (sessionId) await api.finishSession(sessionId).catch(console.error); const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (uid) { const tc = Object.values(answers).filter(v => v === true).length; try { await api.createReport({ title: SKILL_NAME, type: 'practice', score: (tc / TOTAL_QUESTIONS) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: tc, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(uid, 10) }); } catch (e) { console.error(e); } } navigate(-1); } };
    const handlePrevious = () => { if (history.current[qIndex]) history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; if (qIndex > 0) { setQIndex(p => p - 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); } };
    const handleOptionSelect = (o) => { if (isSubmitted) return; setSelectedOption(o); };
    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme grey-selection-theme" style={{ fontFamily: '"Open Sans",sans-serif' }}>
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
                                    <div className="question-header-modern"><h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem,2vw,1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}><LatexContent html={currentQuestion.text} /></h2></div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">{shuffledOptions.map((o, i) => (<button key={i} className={`option-btn-modern ${selectedOption === o ? 'selected' : ''} ${isSubmitted && o === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === o && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: '500' }} onClick={() => handleOptionSelect(o)} disabled={isSubmitted}><LatexContent html={o} /></button>))}</div>
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
                    <div className="bottom-right"><div className="nav-buttons-group">{qIndex > 0 && (<button className="nav-pill-prev-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Previous</button>)}{isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>)}</div></div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2"><button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>{isSubmitted && (<button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>)}</div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}><div className="nav-buttons-group">{qIndex > 0 && (<button className="nav-pill-prev-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Previous</button>)}{isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>)}</div></div>
                </div>
            </footer>
        </div>
    );
};

export default VolumeOfCylinderComponent;

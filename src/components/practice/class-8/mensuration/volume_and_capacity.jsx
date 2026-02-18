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

const VolumeAndCapacityComponent = () => {
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
    const SKILL_ID = 1134;
    const SKILL_NAME = "Mensuration - Volume and Capacity";
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
        const types = ['cmToL', 'mToL', 'cuboidL', 'cubeL', 'cylL', 'compCap', 'fillTime', 'costFill', 'convert', 'real'];
        if (!window.shMQ1134) { window.shMQ1134 = [...types].sort(() => Math.random() - 0.5); }
        if (history.current[index]) { const s = history.current[index]; setCurrentQuestion(s.qData); setShuffledOptions(s.shuffledOptions); setSelectedOption(s.selectedOption); setIsSubmitted(s.isSubmitted); setIsCorrect(s.isCorrect); return; }
        const t = window.shMQ1134[index] || 'cmToL';
        const fns = { cmToL, mToL, cuboidL, cubeL, cylL, compCap, fillTime, costFill, convert, real };
        const qData = (fns[t] || cmToL)();
        const so = [...qData.options].sort(() => Math.random() - 0.5);
        history.current[index] = { qData, shuffledOptions: so, selectedOption: null, isSubmitted: false, isCorrect: false };
        setShuffledOptions(so); setCurrentQuestion(qData); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
    };

    // EASY 1: cm³ to litres
    const cmToL = () => { const v = randomInt(1, 9) * 1000; const l = v / 1000; return { text: `<div class='question-container'><p>Convert $${v}$ cm³ to litres.</p></div>`, correctAnswer: `$${l}$ L`, solution: `$1$ litre $= 1000$ cm³<br/><br/>$${v}$ cm³ $= \\frac{${v}}{1000} = ${l}$ L`, options: [`$${l}$ L`, `$${l * 10}$ L`, `$${v}$ L`, `$${l / 10}$ L`] }; };

    // EASY 2: m³ to litres
    const mToL = () => { const v = randomInt(1, 5); const l = v * 1000; return { text: `<div class='question-container'><p>Convert $${v}$ m³ to litres.</p></div>`, correctAnswer: `$${l}$ L`, solution: `$1$ m³ $= 1000$ litres<br/><br/>$${v}$ m³ $= ${v} \\times 1000 = ${l}$ L`, options: [`$${l}$ L`, `$${v * 100}$ L`, `$${v * 10}$ L`, `$${v}$ L`] }; };

    // EASY 3: Cuboid capacity in litres
    const cuboidL = () => { const l = randomInt(10, 30), b = randomInt(10, 20), h = randomInt(10, 20); const v = l * b * h; const lit = v / 1000; return { text: `<div class='question-container'><p>A cuboidal tank is $${l}$ cm × $${b}$ cm × $${h}$ cm. Find its capacity in litres.</p></div>`, correctAnswer: `$${lit}$ L`, solution: `Volume $= ${l}\\times${b}\\times${h} = ${v}$ cm³<br/><br/>Capacity $= \\frac{${v}}{1000} = ${lit}$ L`, options: [`$${lit}$ L`, `$${v}$ L`, `$${lit * 10}$ L`, `$${parseFloat((lit + 1).toFixed(1))}$ L`] }; };

    // MEDIUM 1: Cube capacity in litres
    const cubeL = () => { const a = randomInt(10, 20); const v = a * a * a; const lit = v / 1000; return { text: `<div class='question-container'><p>A cubical container has side $${a}$ cm. Find capacity in litres.</p></div>`, correctAnswer: `$${lit}$ L`, solution: `Volume $= ${a}^3 = ${v}$ cm³<br/><br/>Capacity $= \\frac{${v}}{1000} = ${lit}$ L`, options: [`$${lit}$ L`, `$${v}$ L`, `$${6 * a * a}$ L`, `$${parseFloat((lit + 0.5).toFixed(1))}$ L`] }; };

    // MEDIUM 2: Cylinder capacity in litres
    const cylL = () => { const r = randomInt(5, 10), h = randomInt(10, 20); const v = parseFloat((3.14 * r * r * h).toFixed(2)); const lit = parseFloat((v / 1000).toFixed(3)); return { text: `<div class='question-container'><p>Cylindrical vessel: radius $${r}$ cm, height $${h}$ cm. Capacity in litres? ($\\pi=3.14$)</p></div>`, correctAnswer: `$${lit}$ L`, solution: `Volume $= 3.14\\times${r}^2\\times${h} = ${v}$ cm³<br/><br/>Capacity $= \\frac{${v}}{1000} = ${lit}$ L`, options: [`$${lit}$ L`, `$${v}$ L`, `$${parseFloat((lit * 10).toFixed(2))}$ L`, `$${parseFloat((lit + 1).toFixed(3))}$ L`] }; };

    // MEDIUM 3: Compare capacities
    const compCap = () => { const a = randomInt(10, 15); const l = randomInt(10, 20), b = randomInt(8, 15), h = randomInt(8, 12); const vCube = a * a * a; const vCuboid = l * b * h; const larger = vCube > vCuboid ? 'cube' : 'cuboid'; const diff = Math.abs(vCube - vCuboid); return { text: `<div class='question-container'><p>Cube (side $${a}$ cm) vs Cuboid ($${l}$×$${b}$×$${h}$ cm). Which holds more and by how much?</p></div>`, correctAnswer: `${larger}, $${diff}$ cm³ more`, solution: `Cube volume $= ${vCube}$ cm³<br/>Cuboid volume $= ${vCuboid}$ cm³<br/><br/>${larger} holds $${diff}$ cm³ more`, options: [`${larger}, $${diff}$ cm³ more`, `${larger === 'cube' ? 'cuboid' : 'cube'}, $${diff}$ cm³ more`, `${larger}, $${diff + 100}$ cm³ more`, `${larger}, $${Math.abs(diff - 50)}$ cm³ more`] }; };

    // HARD 1: Fill time
    const fillTime = () => { const l = randomInt(10, 20), b = randomInt(8, 15), h = randomInt(10, 20); const v = l * b * h; const rate = randomInt(100, 500); const time = parseFloat((v / rate).toFixed(2)); return { text: `<div class='question-container'><p>A tank ($${l}$×$${b}$×$${h}$ cm) is filled at $${rate}$ cm³/min. Time to fill?</p></div>`, correctAnswer: `$${time}$ min`, solution: `Volume $= ${v}$ cm³<br/>Time $= \\frac{${v}}{${rate}} = ${time}$ min`, options: [`$${time}$ min`, `$${v}$ min`, `$${parseFloat((time + 1).toFixed(2))}$ min`, `$${rate}$ min`] }; };

    // HARD 2: Cost to fill
    const costFill = () => { const l = randomInt(10, 20), b = randomInt(8, 15), h = randomInt(8, 15); const v = l * b * h; const lit = v / 1000; const rate = randomInt(10, 30); const cost = parseFloat((lit * rate).toFixed(2)); return { text: `<div class='question-container'><p>Tank ($${l}$×$${b}$×$${h}$ cm). Cost to fill with milk at ₹$${rate}$/litre?</p></div>`, correctAnswer: `₹$${cost}$`, solution: `Volume $= ${v}$ cm³ $= ${lit}$ L<br/>Cost $= ${lit}\\times${rate} =$ ₹$${cost}$`, options: [`₹$${cost}$`, `₹$${v * rate}$`, `₹$${parseFloat((cost + rate).toFixed(2))}$`, `₹$${lit}$`] }; };

    // HARD 3: Mixed conversions
    const convert = () => { const ml = randomInt(500, 5000); const cm3 = ml; const l = ml / 1000; return { text: `<div class='question-container'><p>Express $${ml}$ mL in (i) cm³ and (ii) litres.</p></div>`, correctAnswer: `$${cm3}$ cm³, $${l}$ L`, solution: `$1$ mL $= 1$ cm³, so $${ml}$ mL $= ${cm3}$ cm³<br/><br/>$${ml}$ mL $= \\frac{${ml}}{1000} = ${l}$ L`, options: [`$${cm3}$ cm³, $${l}$ L`, `$${cm3 * 10}$ cm³, $${l * 10}$ L`, `$${cm3}$ cm³, $${l * 100}$ L`, `$${cm3 / 10}$ cm³, $${l}$ L`] }; };

    // BONUS: Real world
    const real = () => { const n = randomInt(2, 6); const cap = randomInt(200, 500); const total = n * cap; const totalL = total / 1000; return { text: `<div class='question-container'><p>${n} identical glasses each hold $${cap}$ mL. Total capacity in litres?</p></div>`, correctAnswer: `$${totalL}$ L`, solution: `Total $= ${n}\\times${cap} = ${total}$ mL $= ${totalL}$ L`, options: [`$${totalL}$ L`, `$${total}$ L`, `$${parseFloat((totalL + 0.5).toFixed(1))}$ L`, `$${cap / 1000}$ L`] }; };

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const recordAttempt = async (q, sel, ic) => { const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (!uid) return; let ts = accumulatedTime.current; if (isTabActive.current) ts += Date.now() - questionStartTime.current; try { await api.recordAttempt({ user_id: parseInt(uid, 10), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard', question_text: String(q.text || ''), correct_answer: String(q.correctAnswer || ''), student_answer: String(sel || ''), is_correct: ic, solution_text: String(q.solution || ''), time_spent_seconds: Math.max(0, Math.round(ts / 1000)) }); } catch (e) { console.error(e); } };
    const handleCheck = () => { if (!selectedOption || !currentQuestion) return; const ir = selectedOption === currentQuestion.correctAnswer; setIsCorrect(ir); setIsSubmitted(true); setAnswers(p => ({ ...p, [qIndex]: ir })); if (ir) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]); else setShowExplanationModal(true); recordAttempt(currentQuestion, selectedOption, ir); };
    const handleNext = async () => { if (history.current[qIndex]) history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; if (qIndex < TOTAL_QUESTIONS - 1) { setQIndex(p => p + 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); accumulatedTime.current = 0; questionStartTime.current = Date.now(); } else { if (sessionId) await api.finishSession(sessionId).catch(console.error); const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (uid) { const tc = Object.values(answers).filter(v => v === true).length; try { await api.createReport({ title: SKILL_NAME, type: 'practice', score: (tc / TOTAL_QUESTIONS) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: tc, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(uid, 10) }); } catch (e) { console.error(e); } } navigate(-1); } };
    const handlePrevious = () => { if (history.current[qIndex]) history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; if (qIndex > 0) { setQIndex(p => p - 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); } };
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
                                        <div className="options-grid-modern">{shuffledOptions.map((o, i) => (<button key={i} className={`option-btn-modern ${selectedOption === o ? 'selected' : ''} ${isSubmitted && o === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === o && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: '500' }} onClick={() => { if (!isSubmitted) setSelectedOption(o) }} disabled={isSubmitted}><LatexContent html={o} /></button>))}</div>
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

export default VolumeAndCapacityComponent;

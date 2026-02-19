import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = ["✨ Amazing!", "🌟 Brilliant!", "🎉 Correct!", "🚀 Super!", "💎 Excellent!"];

/* ─── Unified Visual Component ─── */
const TestVisual = ({ type, data }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";

    // Parallelogram Dimensions
    if (type === 'para_dim') {
        const { base, height } = data;
        return (
            <svg width="200" height="120" viewBox="0 0 200 120">
                <path d="M50,100 L150,100 L170,20 L70,20 Z" fill={f} stroke={s} strokeWidth="2" />
                <line x1="70" y1="20" x2="70" y2="100" stroke={l} strokeWidth="1.5" strokeDasharray="4" />
                <rect x="70" y="90" width="10" height="10" fill="none" stroke={l} strokeWidth="1" />
                <text x="100" y="115" fontSize="12" fill={s} textAnchor="middle">{base}</text>
                <text x="65" y="60" fontSize="12" fill={l} textAnchor="end">{height}</text>
            </svg>
        );
    }

    // Triangle Dimensions
    if (type === 'tri_dim') {
        const { base, height } = data;
        return (
            <svg width="200" height="120" viewBox="0 0 200 120">
                <path d="M40,100 L160,100 L100,20 Z" fill={f} stroke={s} strokeWidth="2" />
                <line x1="100" y1="20" x2="100" y2="100" stroke={l} strokeWidth="1.5" strokeDasharray="4" />
                <rect x="100" y="90" width="10" height="10" fill="none" stroke={l} strokeWidth="1" />
                <text x="100" y="115" fontSize="12" fill={s} textAnchor="middle">{base}</text>
                <text x="105" y="60" fontSize="12" fill={l} textAnchor="start">{height}</text>
            </svg>
        );
    }

    // Circle Dimensions
    if (type === 'circle_dim') {
        const { r } = data;
        return (
            <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="50" fill={f} stroke={s} strokeWidth="2" />
                <circle cx="70" cy="70" r="2" fill={s} />
                <line x1="70" y1="70" x2="120" y2="70" stroke={l} strokeWidth="2" />
                <text x="95" y="60" fontSize="12" fill={l} textAnchor="middle">r = {r}</text>
            </svg>
        );
    }

    // Wire problem
    if (type === 'wire') {
        return (
            <svg width="200" height="80" viewBox="0 0 200 80">
                <rect x="30" y="15" width="50" height="50" fill="none" stroke={l} strokeWidth="2" />
                <text x="55" y="75" fontSize="10" fill={s} textAnchor="middle">Square</text>

                <path d="M100,40 L120,40" stroke={s} strokeWidth="2" markerEnd="url(#arrow)" />
                <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill={s} /></marker></defs>

                <circle cx="160" cy="40" r="25" fill="none" stroke={s} strokeWidth="2" />
                <text x="160" y="75" fontSize="10" fill={s} textAnchor="middle">Circle</text>
            </svg>
        );
    }

    return null;
};

/* ─── Main Component ─── */
const PerimeterAreaTest = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [answers, setAnswers] = useState({});
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = "1093";
    const SKILL_NAME = "Class 7 - Perimeter and Area - Chapter Test";

    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── TOPIC 1: Parallelograms ──
        const paraPool = [
            () => ({ text: `<p>Find area of parallelogram with Base=7 cm, Height=4 cm.</p>`, visual: { type: 'para_dim', data: { base: '7 cm', height: '4 cm' } }, correctAnswer: "28 cm²", options: shuffle(["28 cm²", "14 cm²", "11 cm²", "22 cm²"]), solution: `<p>Area = \\( b \\times h = 7 \\times 4 = 28 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>If Area = 246 cm² and Base = 20 cm, find Height.</p>`, correctAnswer: "12.3 cm", options: shuffle(["12.3 cm", "123 cm", "12.3 cm²", "10 cm"]), solution: `<p>Height = \\( 246 \\div 20 = 12.3 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>A parallelogram has base 8 cm and height 3.5 cm. What is its area?</p>`, visual: { type: 'para_dim', data: { base: '8 cm', height: '3.5 cm' } }, correctAnswer: "28 cm²", options: shuffle(["28 cm²", "32 cm²", "24 cm²", "14 cm²"]), solution: `<p>Area = \\( 8 \\times 3.5 = 28 \\text{ cm}^2 \\).</p>` })
        ];

        // ── TOPIC 2: Triangles ──
        const triPool = [
            () => ({ text: `<p>Find area of triangle with Base=4 cm, Height=3 cm.</p>`, visual: { type: 'tri_dim', data: { base: '4 cm', height: '3 cm' } }, correctAnswer: "6 cm²", options: shuffle(["6 cm²", "12 cm²", "7 cm²", "10 cm²"]), solution: `<p>Area = \\( \\frac{1}{2} \\times 4 \\times 3 = 6 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>Find height of triangle if Area = 87 cm² and Base = 15 cm.</p>`, correctAnswer: "11.6 cm", options: shuffle(["11.6 cm", "5.8 cm", "116 cm", "12 cm"]), solution: `<p>\\( 87 = \\frac{1}{2} \\times 15 \\times h \\Rightarrow 174 = 15h \\Rightarrow h = 11.6 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>Is the area of a triangle half of a parallelogram of the same base and height?</p>`, correctAnswer: "Yes", options: shuffle(["Yes", "No", "Depends on shape", "Only for right triangles"]), solution: `<p>Yes, two identical triangles form a parallelogram.</p>` })
        ];

        // ── TOPIC 3: Circles ──
        const circPool = [
            () => ({ text: `<p>Circumference of a circle with radius 14 cm (\\( \\pi = \\frac{22}{7} \\)) is:</p>`, visual: { type: 'circle_dim', data: { r: '14 cm' } }, correctAnswer: "88 cm", options: shuffle(["88 cm", "44 cm", "154 cm", "616 cm"]), solution: `<p>\\( C = 2 \\times \\frac{22}{7} \\times 14 = 88 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>Area of circle with radius 10 cm (\\( \\pi = 3.14 \\)) is:</p>`, visual: { type: 'circle_dim', data: { r: '10 cm' } }, correctAnswer: "314 cm²", options: shuffle(["314 cm²", "31.4 cm²", "100 cm²", "628 cm²"]), solution: `<p>Area = \\( 3.14 \\times 10 \\times 10 = 314 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>A wire in shape of square (side 11 cm) is reshaped into a circle. Find radius (\\( \\pi = \\frac{22}{7} \\)).</p>`, visual: { type: 'wire' }, correctAnswer: "7 cm", options: shuffle(["7 cm", "14 cm", "11 cm", "22 cm"]), solution: `<p>Perimeter = 44 cm. \\( 2\\pi r = 44 \\Rightarrow 2 \\times \\frac{22}{7} \\times r = 44 \\Rightarrow r = 7 \\text{ cm} \\).</p>` })
        ];

        // 3 from Para, 3 from Tri, 4 from Circ => 10 Questions
        const selected = [
            ...pickRandom(paraPool, 3).map(fn => fn()),
            ...pickRandom(triPool, 3).map(fn => fn()),
            ...pickRandom(circPool, 4).map(fn => fn())
        ];

        setQuestions(selected);
    }, []);

    // Session Management
    useEffect(() => {
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (uid && !sessionId) api.createPracticeSession(uid, SKILL_ID).then(s => s && setSessionId(s.session_id)).catch(console.error);
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const hv = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener("visibilitychange", hv);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", hv); };
    }, [sessionId]);

    const recordAttempt = async (q, sel, cor) => {
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!uid) return;
        let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current;
        try { await api.recordAttempt({ user_id: parseInt(uid), session_id: sessionId, skill_id: SKILL_ID, difficulty_level: 'Medium', question_text: String(q.text), correct_answer: String(q.correctAnswer), student_answer: String(sel), is_correct: cor, solution_text: String(q.solution), time_spent_seconds: Math.max(0, Math.round(t / 1000)) }); } catch (e) { console.error(e); }
    };

    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const right = selectedOption === questions[qIndex].correctAnswer;
        setIsCorrect(right); setIsSubmitted(true);
        if (right) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: right } }));
        recordAttempt(questions[qIndex], selectedOption, right);
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0; questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (uid) {
                const c = Object.values(answers).filter(v => v.isCorrect).length;
                await api.createReport({ title: SKILL_NAME, type: 'practice', score: (c / questions.length) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: questions.length, correct_answers: c, time_taken_seconds: timeElapsed }, user_id: parseInt(uid) }).catch(console.error);
            }
            navigate(-1);
        }
    };

    useEffect(() => {
        const saved = answers[qIndex];
        if (saved) { setSelectedOption(saved.selectedOption); setIsCorrect(saved.isCorrect); setIsSubmitted(true); }
        else { setSelectedOption(null); setIsCorrect(false); setIsSubmitted(false); }
        setShowExplanationModal(false);
    }, [qIndex]);

    if (questions.length === 0) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#31326F' }}>Loading questions...</div>;
    const cq = questions[qIndex];

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Perimeter and Area - Chapter Test</span></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {questions.length}</div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}><LatexContent html={cq.text} /></h2>
                            </div>
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><TestVisual {...cq.visual} /></div>}
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {cq.options.map((opt, i) => (
                                        <button key={i} className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === cq.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}><LatexContent html={opt} /></button>
                                    ))}
                                </div>
                                <AnimatePresence>{isSubmitted && isCorrect && (
                                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}><div className="flex items-center gap-3 justify-center"><img src={mascotImg} alt="Mascot" className="w-12 h-12 object-contain" /><span>{feedbackMessage}</span></div></motion.div>
                                )}</AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={cq.correctAnswer} explanation={cq.solution} onClose={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar" style={{ position: 'fixed', bottom: 0 }}>
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={() => navigate(-1)}>Exit</button></div>
                    <div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}</div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-600" onClick={() => setQIndex(i => Math.max(0, i - 1))} disabled={qIndex === 0}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}</button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={() => navigate(-1)}><X size={20} /></button>
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>}
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2" onClick={() => setQIndex(i => Math.max(0, i - 1))} disabled={qIndex === 0}><ChevronLeft size={20} /></button>
                            {isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? "Next" : "Done"}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>)}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PerimeterAreaTest;

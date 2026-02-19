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

/* ─── Visual: Clock / Rotation ─── */
const ClockVisual = ({ angle, direction }) => {
    const s = "#31326F", f = "#4FB7B320", a = "#FF6B6B";
    // arrow path based on angle/direction
    return (
        <svg width="140" height="140" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke={s} strokeWidth="2" fill="none" />
            <line x1="50" y1="50" x2="50" y2="15" stroke={s} strokeWidth="2" />
            <circle cx="50" cy="50" r="3" fill={s} />
            {/* 12, 3, 6, 9 markers */}
            <text x="50" y="12" textAnchor="middle" fontSize="10" fill={s}>12</text>
            <text x="90" y="52" textAnchor="middle" fontSize="10" fill={s}>3</text>
            <text x="50" y="92" textAnchor="middle" fontSize="10" fill={s}>6</text>
            <text x="10" y="52" textAnchor="middle" fontSize="10" fill={s}>9</text>

            {/* Rotation Arrow */}
            <path d="M55,20 A30,30 0 0,1 80,50" fill="none" stroke={a} strokeWidth="2" markerEnd="url(#arrowhead)" />
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill={a} />
                </marker>
            </defs>
            <text x="75" y="30" fontSize="8" fill={a}>{direction === 'clockwise' ? 'Clockwise' : 'Anticlockwise'}</text>
        </svg>
    );
};

/* ─── Visual: Windmill (Order of Symmetry) ─── */
const WindmillVisual = () => {
    const s = "#31326F", f = "#4FB7B340";
    return (
        <svg width="140" height="140" viewBox="0 0 100 100">
            <g transform="translate(50,50)">
                {[0, 90, 180, 270].map((rot, i) => (
                    <g key={i} transform={`rotate(${rot})`}>
                        <path d="M0,0 L10,-10 L35,-10 L35,10 L0,0" fill={f} stroke={s} strokeWidth="1" />
                    </g>
                ))}
            </g>
            <circle cx="50" cy="50" r="3" fill="#FF6B6B" />
        </svg>
    );
};

/* ─── Visual: Rotating Square with Center ─── */
const RotatingSquareVisual = ({ angleLabel }) => {
    const s = "#31326F", f = "#4FB7B320", a = "#FF6B6B";
    return (
        <svg width="140" height="140" viewBox="0 0 100 100">
            <rect x="30" y="30" width="40" height="40" fill={f} stroke={s} strokeWidth="2" />
            <circle cx="50" cy="50" r="2" fill={a} />
            <text x="50" y="65" textAnchor="middle" fontSize="8" fill={s}>Centre P</text>
            {/* curved arrow indicating 90 deg */}
            <path d="M50,20 A30,30 0 0,1 80,50" fill="none" stroke={a} strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead2)" />
            <defs>
                <marker id="arrowhead2" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill={a} />
                </marker>
            </defs>
            <text x="75" y="25" fontSize="8" fill={a}>{angleLabel}</text>
        </svg>
    );
};

const RotationalSymmetry = () => {
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

    const SKILL_ID = 1087;
    const SKILL_NAME = "Class 7 - Symmetry - Rotational Symmetry";

    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── Subtopic 3.1 POOL: Concept of Rotation (pick 3) ──
        const conceptPool = [
            () => ({
                text: `<p>Rotation means turning an object around a fixed point. This fixed point is called the:</p>`,
                correctAnswer: "Centre of Rotation",
                options: shuffle(["Centre of Rotation", "Axis of Rotation", "Point of Symmetry", "Vertex"]),
                solution: `<p>The fixed point around which an object rotates is called the <b>Centre of Rotation</b> (e.g., the center of a clock).</p>`
            }),
            () => ({
                text: `<p>The angle through which an object turns during rotation is called the:</p>`,
                correctAnswer: "Angle of Rotation",
                options: shuffle(["Angle of Rotation", "Degree of Turn", "Circular Angle", "Reflex Angle"]),
                solution: `<p>The <b>Angle of Rotation</b> is the angle turned by the object from its original position.</p>`
            }),
            () => ({
                text: `<p>A half-turn corresponds to a rotation of:</p>`,
                visual: <ClockVisual angle={180} direction="clockwise" />,
                correctAnswer: "180°",
                options: ["90°", "180°", "360°", "45°"],
                solution: `<p>A full turn is 360°. A <b>half-turn</b> is half of 360°, which is <b>180°</b>.</p>`
            }),
            () => ({
                text: `<p>A quarter-turn corresponds to a rotation of:</p>`,
                visual: <ClockVisual angle={90} direction="clockwise" />,
                correctAnswer: "90°",
                options: ["90°", "180°", "270°", "360°"],
                solution: `<p>A quarter-turn is one-fourth of a full rotation: 360° ÷ 4 = <b>90°</b>.</p>`
            })
        ];

        // ── Subtopic 3.2 POOL: Order of Symmetry (pick 4) ──
        const orderPool = [
            () => ({
                text: `<p>The number of times a shape looks exactly the same as the original during one full rotation is called its:</p>`,
                correctAnswer: "Order of Rotational Symmetry",
                options: shuffle(["Order of Rotational Symmetry", "Degree of Symmetry", "Angle of Symmetry", "Axis Number"]),
                solution: `<p>The <b>Order of Rotational Symmetry</b> counts how many times the shape fits onto itself in 360°.</p>`
            }),
            () => ({
                text: `<p>What is the order of rotational symmetry for a <b>Square</b>?</p>`,
                visual: <RotatingSquareVisual angleLabel="90°" />,
                correctAnswer: "4",
                options: ["2", "3", "4", "1"],
                solution: `<p>A square looks the same after every 90° turn. In 360°, it matches 4 times (90°, 180°, 270°, 360°). Order = <b>4</b>.</p>`
            }),
            () => ({
                text: `<p>A windmill with 4 blades has rotational symmetry of order:</p>`,
                visual: <WindmillVisual />,
                correctAnswer: "4",
                options: ["2", "4", "8", "Infinite"],
                solution: `<p>The windmill matches its original position after every 90° turn. 360 ÷ 90 = 4.</p>`
            }),
            () => ({
                text: `<p>An <b>Equilateral Triangle</b> has rotational symmetry of order:</p>`,
                correctAnswer: "3",
                options: ["3", "1", "6", "2"],
                solution: `<p>An equilateral triangle matches itself every 120° (360/3). Order = <b>3</b>.</p>`
            }),
            () => ({
                text: `<p>The order of rotational symmetry of a <b>Circle</b> is:</p>`,
                correctAnswer: "Infinite",
                options: shuffle(["Infinite", "0", "1", "360"]),
                solution: `<p>A circle matches itself after rotation by ANY angle. Order is infinite.</p>`
            }),
            () => ({
                text: `<p>If a figure rotates 60° to match itself, what is its order of symmetry?</p>`,
                correctAnswer: "6",
                options: ["6", "4", "5", "3"],
                solution: `<p>Order = 360° ÷ Angle of Rotation = 360 ÷ 60 = <b>6</b>.</p>`
            })
        ];

        // Pick: 3 from Concept, 4 from Order = 7 (increased to 10 total by picking more)
        const selected = [
            ...pickRandom(conceptPool, 4).map(fn => fn()),
            ...pickRandom(orderPool, 6).map(fn => fn()),
        ];

        setQuestions(selected);
    }, []);

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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Rotational Symmetry</span></div>
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
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>{cq.visual}</div>}
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {cq.options.map((opt, i) => (
                                        <button key={i} className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === cq.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}><LatexContent html={opt} /></button>
                                    ))}
                                </div>
                                <AnimatePresence>{isSubmitted && isCorrect && (
                                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}><div className="flex items-center gap-3"><img src={mascotImg} alt="Mascot" className="w-12 h-12 object-contain" /><span>{feedbackMessage}</span></div></motion.div>
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

export default RotationalSymmetry;

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

/* ─── SVG Visuals ─── */
const CircleVisual = ({ type, data }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";
    const r = 50; // default radius

    // Subtopic 3.1.1: Circumference concept (String wrap)
    if (type === 'string_wrap') {
        return (
            <svg width="200" height="140" viewBox="0 0 200 140">
                <circle cx="60" cy="70" r="40" fill={f} stroke={s} strokeWidth="2" />
                <path d="M60,30 A40,40 0 1,1 60,110 A40,40 0 1,1 60,30" fill="none" stroke={l} strokeWidth="3" strokeDasharray="10,5" />

                {/* Unrolled string */}
                <line x1="120" y1="120" x2="120" y2="20" stroke={l} strokeWidth="3" strokeDasharray="10,5" />
                <text x="140" y="70" fontSize="10" fill={s}>Circumference</text>

                <text x="60" y="130" fontSize="10" fill={s} textAnchor="middle">Circle</text>
            </svg>
        );
    }

    // Subtopic 3.1.2: Dimensions
    if (type === 'dimensions') {
        const { label, val, isDiameter } = data || {};
        return (
            <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={r} fill={f} stroke={s} strokeWidth="2" />
                <circle cx="70" cy="70" r="2" fill={s} />

                {isDiameter ? (
                    <>
                        <line x1="20" y1="70" x2="120" y2="70" stroke={l} strokeWidth="2" />
                        <text x="70" y="60" fontSize="12" fill={l} textAnchor="middle">{label} = {val}</text>
                    </>
                ) : (
                    <>
                        <line x1="70" y1="70" x2="120" y2="70" stroke={l} strokeWidth="2" />
                        <text x="95" y="60" fontSize="12" fill={l} textAnchor="middle">{label} = {val}</text>
                    </>
                )}
            </svg>
        );
    }

    // Subtopic 3.1.4: Semicircle Perimeter
    if (type === 'semicircle') {
        const { r_val } = data || {};
        return (
            <svg width="140" height="100" viewBox="0 0 140 80">
                <path d="M20,70 A50,50 0 0,1 120,70" fill={f} stroke={s} strokeWidth="2" />
                <line x1="20" y1="70" x2="120" y2="70" stroke={l} strokeWidth="2" />
                <text x="70" y="60" fontSize="12" fill={s} textAnchor="middle">r = {r_val}</text>
                <text x="70" y="85" fontSize="10" fill={l} textAnchor="middle">Diameter</text>
            </svg>
        );
    }

    // Subtopic 3.2.1: Area Rearrangement
    if (type === 'rearrange') {
        return (
            <svg width="240" height="120" viewBox="0 0 240 120">
                <g transform="translate(40,60)">
                    {/* Pie Slices */}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                        <path key={i} d={`M0,0 L${30 * Math.cos(i * Math.PI / 4)},${30 * Math.sin(i * Math.PI / 4)} A30,30 0 0,1 ${30 * Math.cos((i + 1) * Math.PI / 4)},${30 * Math.sin((i + 1) * Math.PI / 4)} Z`}
                            fill={i % 2 === 0 ? f : l} stroke="none" opacity="0.7" />
                    ))}
                    <text x="0" y="45" fontSize="10" fill={s} textAnchor="middle">Circle</text>
                </g>

                <path d="M80,60 L100,60" stroke={s} strokeWidth="2" markerEnd="url(#arrow)" />

                <g transform="translate(130,40)">
                    {/* Rectangle approximation */}
                    {[0, 1, 2, 3].map(i => (
                        <g key={i} transform={`translate(${i * 20}, 0)`}>
                            <path d="M0,30 L10,0 L20,30 Z" fill={f} /> {/* Up */}
                            <path d="M10,0 L20,30 L30,0 Z" fill={l} /> {/* Down */}
                        </g>
                    ))}
                    <text x="40" y="45" fontSize="10" fill={s} textAnchor="middle">Rectangle</text>
                </g>
            </svg>
        );
    }

    // Subtopic 3.2.3: Concentric Circles
    if (type === 'concentric') {
        const { R, r_in } = data || {};
        return (
            <svg width="140" height="140" viewBox="0 0 140 140">
                {/* Outer */}
                <circle cx="70" cy="70" r="60" fill="#E0F2F1" stroke={s} strokeWidth="1.5" />
                {/* Inner */}
                <circle cx="70" cy="70" r="30" fill="#FFFFFF" stroke={s} strokeWidth="1.5" />

                <line x1="70" y1="70" x2="130" y2="70" stroke={s} strokeWidth="1" />
                <text x="100" y="65" fontSize="10" fill={s}>R={R}</text>

                <line x1="70" y1="70" x2="70" y2="40" stroke={l} strokeWidth="1" />
                <text x="75" y="55" fontSize="10" fill={l}>r={r_in}</text>
            </svg>
        );
    }

    // Subtopic 3.2.5: Wire Geometry
    if (type === 'wire') {
        return (
            <svg width="200" height="100" viewBox="0 0 200 100">
                <rect x="30" y="20" width="50" height="50" fill="none" stroke={l} strokeWidth="3" />
                <text x="55" y="80" fontSize="10" fill={s} textAnchor="middle">Square</text>

                <path d="M90,50 L110,50" stroke={s} strokeWidth="2" markerEnd="url(#arrow)" />

                <circle cx="160" cy="45" r="25" fill="none" stroke={l} strokeWidth="3" />
                <text x="160" y="80" fontSize="10" fill={s} textAnchor="middle">Circle</text>
            </svg>
        );
    }

    return null;
};

/* ─── Main Component ─── */
const Circles = () => {
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

    const SKILL_ID = "1092";
    const SKILL_NAME = "Class 7 - Perimeter and Area - Circles";

    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // 🔹 3.1.1: Concept C/d = pi
        const conceptPool = [
            () => ({
                text: `<p>The ratio of the circumference of a circle to its diameter is:</p>`,
                visual: { type: 'string_wrap' },
                correctAnswer: "Constant (π)",
                options: shuffle(["Constant (π)", "Variable", "Radius", "Area"]),
                solution: `<p>\\( \\frac{C}{d} = \\pi \\). It is always constant regardless of circle size.</p>`
            }),
            () => ({
                text: `<p>Which measurement represents the distance once around a circle?</p>`,
                correctAnswer: "Circumference",
                options: shuffle(["Circumference", "Area", "Diameter", "Radius"]),
                solution: `<p>The perimeter of a circle is called its <b>Circumference</b>.</p>`
            })
        ];

        // 🔹 3.1.2: Formula Problems
        const circPool = [
            () => ({
                text: `<p>Find the circumference if diameter = 10 cm (Take \\( \\pi = 3.14 \\)).</p>`,
                visual: { type: 'dimensions', data: { label: 'd', val: '10 cm', isDiameter: true } },
                correctAnswer: "31.4 cm",
                options: shuffle(["31.4 cm", "15.7 cm", "314 cm", "100 cm"]),
                solution: `<p>\\( C = \\pi d = 3.14 \\times 10 = 31.4 \\text{ cm} \\).</p>`
            }),
            () => ({
                text: `<p>Find circumference if radius = 14 cm (Take \\( \\pi = \\frac{22}{7} \\)).</p>`,
                visual: { type: 'dimensions', data: { label: 'r', val: '14 cm', isDiameter: false } },
                correctAnswer: "88 cm",
                options: shuffle(["88 cm", "44 cm", "154 cm", "616 cm"]),
                solution: `<p>\\( C = 2\\pi r = 2 \\times \\frac{22}{7} \\times 14 = 88 \\text{ cm} \\).</p>`
            }),
            () => ({
                text: `<p>If the circumference is 44 cm, find the radius. (\\( \\pi = \\frac{22}{7} \\))</p>`,
                visual: { type: 'dimensions', data: { label: 'C', val: '44 cm', isDiameter: false } },
                correctAnswer: "7 cm",
                options: shuffle(["7 cm", "14 cm", "22 cm", "3.5 cm"]),
                solution: `<p>\\( 2\\pi r = 44 \\Rightarrow 2 \\times \\frac{22}{7} \\times r = 44 \\Rightarrow r = 7 \\text{ cm} \\).</p>`
            })
        ];

        // 🔹 3.1.4: Semicircle Perimeter
        const semiPool = [
            () => ({
                text: `<p>Find the perimeter of a semicircle including the diameter, if radius = 10 cm. (\\( \\pi = 3.14 \\))</p>`,
                visual: { type: 'semicircle', data: { r_val: '10' } },
                correctAnswer: "51.4 cm",
                options: shuffle(["51.4 cm", "31.4 cm", "20 cm", "41.4 cm"]),
                solution: `<p>Perimeter = Arc + Diameter = \\( \\frac{1}{2}(2\\pi r) + 2r = \\pi r + 2r \\). <br>\\( = 3.14 \\times 10 + 20 = 31.4 + 20 = 51.4 \\text{ cm} \\).</p>`
            })
        ];

        // 🔹 3.2.1/2: Area Formula
        const areaFormulaPool = [
            () => ({
                text: `<p>If a circle is divided into small sectors and rearranged into a rectangle, the length of the rectangle is roughly:</p>`,
                visual: { type: 'rearrange' },
                correctAnswer: "Half circumference (πr)",
                options: shuffle(["Half circumference (πr)", "Diameter", "Radius", "Circumference"]),
                solution: `<p>The rectangle formed has length \\( \\pi r \\) and width \\( r \\), so Area = \\( \\pi r \\times r = \\pi r^2 \\).</p>`
            }),
            () => ({
                text: `<p>Find area of a circle with radius 30 cm (\\( \\pi = 3.14 \\)).</p>`,
                correctAnswer: "2826 cm²",
                options: shuffle(["2826 cm²", "188.4 cm²", "900 cm²", "94.2 cm²"]),
                solution: `<p>Area = \\( \\pi r^2 = 3.14 \\times 30 \\times 30 = 3.14 \\times 900 = 2826 \\text{ cm}^2 \\).</p>`
            })
        ];

        // 🔹 3.2.3: Concentric Circles
        const ringPool = [
            () => ({
                text: `<p>Find the area of the shaded region between two circles of radii 4 cm and 3 cm. (\\( \\pi \\approx 3.14 \\))</p>`,
                visual: { type: 'concentric', data: { R: '4', r_in: '3' } },
                correctAnswer: "21.98 cm²",
                options: shuffle(["21.98 cm²", "7 cm²", "12.56 cm²", "50.24 cm²"]),
                solution: `<p>Area = \\( \\pi (R^2 - r^2) = 3.14(16 - 9) = 3.14 \\times 7 = 21.98 \\text{ cm}^2 \\).</p>`
            })
        ];

        // 🔹 3.2.5: Application
        const appPool = [
            () => ({
                text: `<p>A wire is in the shape of a square of side 10 cm. If the same wire is bent into a circle, what will be its circumference?</p>`,
                visual: { type: 'wire' },
                correctAnswer: "40 cm",
                options: shuffle(["40 cm", "10 cm", "100 cm", "31.4 cm"]),
                solution: `<p>Length of wire remains same. Perimeter of square = \\( 4 \\times 10 = 40 \\text{ cm} \\). So Circumference = 40 cm.</p>`
            })
        ];

        // Selection: 2 Concept, 3 Circ, 1 Semi, 2 Area, 1 Ring, 1 App = 10
        const selected = [
            ...pickRandom(conceptPool, 2).map(fn => fn()),
            ...pickRandom(circPool, 3).map(fn => fn()),
            ...pickRandom(semiPool, 1).map(fn => fn()),
            ...pickRandom(areaFormulaPool, 2).map(fn => fn()),
            ...pickRandom(ringPool, 1).map(fn => fn()),
            ...pickRandom(appPool, 1).map(fn => fn())
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Circles</span></div>
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
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><CircleVisual {...cq.visual} /></div>}
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

export default Circles;

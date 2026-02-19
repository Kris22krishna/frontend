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
const TriangleVisual = ({ type, data }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";

    // Subtopic 2.1: Two triangles form a parallelogram
    if (type === 'para_formation') {
        return (
            <svg width="240" height="120" viewBox="0 0 240 100">
                {/* Triangle 1 */}
                <path d="M20,80 L80,80 L50,20 Z" fill={f} stroke={s} strokeWidth="1.5" />
                <text x="50" y="60" fontSize="10" fill={s} textAnchor="middle">1</text>

                {/* Triangle 2 (Rotated/Placed to form parallelogram) */}
                <path d="M80,80 L110,20 L50,20 Z" fill="#FF6B6B20" stroke={s} strokeWidth="1.5" strokeDasharray="4" />
                <text x="80" y="40" fontSize="10" fill={s} textAnchor="middle">2</text>

                <text x="50" y="95" fontSize="10" fill={s} textAnchor="middle">Base</text>

                <text x="160" y="50" fontSize="10" fill={s} width="80">
                    Two identical triangles = One Parallelogram
                </text>
            </svg>
        );
    }

    // Subtopic 2.2: Same Base Same Parallels
    if (type === 'same_base') {
        return (
            <svg width="220" height="120" viewBox="0 0 220 120">
                <line x1="10" y1="20" x2="210" y2="20" stroke={s} strokeWidth="1" />
                <line x1="10" y1="100" x2="210" y2="100" stroke={s} strokeWidth="1" />

                {/* Base segment */}
                <line x1="60" y1="100" x2="160" y2="100" stroke={l} strokeWidth="3" />
                <text x="110" y="115" fontSize="10" fill={s} textAnchor="middle">Same Base</text>

                {/* Triangle 1 */}
                <path d="M60,100 L160,100 L110,20" fill="none" stroke={s} strokeWidth="1.5" />
                {/* Triangle 2 */}
                <path d="M60,100 L160,100 L80,20" fill="none" stroke={l} strokeWidth="1.5" strokeDasharray="5" />

                <text x="200" y="60" fontSize="10" fill={s}>Same Height</text>
            </svg>
        );
    }

    // Subtopic 2.3: Obtuse Triangle (Height outside)
    if (type === 'obtuse') {
        return (
            <svg width="200" height="140" viewBox="0 0 200 120">
                <path d="M60,100 L140,100 L20,20 Z" fill={f} stroke={s} strokeWidth="2" />

                {/* Extended base */}
                <line x1="60" y1="100" x2="20" y2="100" stroke={s} strokeWidth="1" strokeDasharray="3" />

                {/* Height */}
                <line x1="20" y1="100" x2="20" y2="20" stroke={l} strokeWidth="1.5" strokeDasharray="4" />
                <rect x="20" y="90" width="10" height="10" fill="none" stroke={l} strokeWidth="1" />

                <text x="100" y="115" fontSize="12" fill={s} textAnchor="middle">Base</text>
                <text x="15" y="60" fontSize="12" fill={l} textAnchor="end">Height</text>
            </svg>
        );
    }

    // Subtopic 2.4/2.5: Dimensions
    if (type === 'dimensions') {
        const { base, height, area } = data || {};
        return (
            <svg width="200" height="140" viewBox="0 0 200 120">
                <path d="M40,100 L160,100 L100,20 Z" fill={f} stroke={s} strokeWidth="2" />
                <line x1="100" y1="20" x2="100" y2="100" stroke={l} strokeWidth="1.5" strokeDasharray="4" />
                <rect x="100" y="90" width="10" height="10" fill="none" stroke={l} strokeWidth="1" />

                <text x="100" y="115" fontSize="12" fill={s} textAnchor="middle">{base || 'b'}</text>
                <text x="105" y="60" fontSize="12" fill={l} textAnchor="start">{height || 'h'}</text>
            </svg>
        );
    }

    return null;
};

/* ─── Main Component ─── */
const AreaTriangle = () => {
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

    const SKILL_ID = "1091";
    const SKILL_NAME = "Class 7 - Perimeter and Area - Area of Triangle";

    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // 🔹 Subtopic 2.1: Concept (1/2 b*h)
        const conceptPool = [
            () => ({
                text: `<p>How is the area of a triangle related to a parallelogram with the same base and height?</p>`,
                visual: { type: 'para_formation' },
                correctAnswer: "Half the area",
                options: shuffle(["Half the area", "Double the area", "Same area", "One-third the area"]),
                solution: `<p>Two identical triangles form a parallelogram. So, Area of Triangle = \\( \\frac{1}{2} \\times \\text{Area of Parallelogram} = \\frac{1}{2}bh \\).</p>`
            }),
            () => ({
                text: `<p>Formula for the area of a triangle is:</p>`,
                correctAnswer: "\\( \\frac{1}{2} \\times \\text{base} \\times \\text{height} \\)",
                options: shuffle(["\\( \\frac{1}{2} \\times \\text{base} \\times \\text{height} \\)", "\\( \\text{base} \\times \\text{height} \\)", "\\( 2 \\times \\text{base} \\times \\text{height} \\)", "\\( \\text{side} \\times \\text{side} \\)"]),
                solution: `<p>Area = \\( \\frac{1}{2}bh \\).</p>`
            })
        ];

        // 🔹 Subtopic 2.2: Same Base
        const sameBasePool = [
            () => ({
                text: `<p>Triangles on the same base and between the same parallel lines have ______ area.</p>`,
                visual: { type: 'same_base' },
                correctAnswer: "Equal",
                options: shuffle(["Equal", "Different", "Zero", "Proportional"]),
                solution: `<p>Since base and height are the same, the area (\\( \\frac{1}{2}bh \\)) is equal.</p>`
            }),
            () => ({
                text: `<p>If two triangles have equal areas, are they necessarily congruent?</p>`,
                correctAnswer: "No",
                options: shuffle(["No", "Yes", "Always", "If they are right triangles"]),
                solution: `<p><b>No</b>. They might have different shapes (different perimeters) even if base and height product is same.</p>`
            })
        ];

        // 🔹 Subtopic 2.3: Obtuse Triangle
        const obtusePool = [
            () => ({
                text: `<p>In an obtuse-angled triangle, where does the altitude (height) fall?</p>`,
                visual: { type: 'obtuse' },
                correctAnswer: "Outside the triangle",
                options: shuffle(["Outside the triangle", "Inside the triangle", "On one of the sides", "At the vertex"]),
                solution: `<p>For an obtuse angle, the perpendicular height falls <b>outside</b> the triangle on the extended base.</p>`
            })
        ];

        // 🔹 Subtopic 2.4/2.6: Numerical & Finding Unknown
        const problemPool = [
            () => ({
                text: `<p>Find the Area: Base = 4 cm, Height = 2 cm.</p>`,
                visual: { type: 'dimensions', data: { base: '4 cm', height: '2 cm' } },
                correctAnswer: "4 cm²",
                options: shuffle(["4 cm²", "8 cm²", "2 cm²", "6 cm²"]),
                solution: `<p>Area = \\( \\frac{1}{2} \\times 4 \\times 2 = 4 \\text{ cm}^2 \\).</p>`
            }),
            () => ({
                text: `<p>Find height if Area = 36 cm² and Base = 3 cm.</p>`,
                correctAnswer: "24 cm",
                options: shuffle(["24 cm", "12 cm", "18 cm", "6 cm"]),
                solution: `<p>\\( Area = \\frac{1}{2}bh \\Rightarrow 36 = \\frac{1}{2} \\times 3 \\times h \\Rightarrow h = \\frac{72}{3} = 24 \\text{ cm} \\).</p>`
            }),
            () => ({
                text: `<p>In \\( \\Delta PQR \\), PR = 8 cm, QR = 4 cm, and PL (height on QR) = 5 cm. Find the area.</p>`,
                correctAnswer: "10 cm²",
                options: shuffle(["10 cm²", "20 cm²", "40 cm²", "5 cm²"]),
                solution: `<p>Area = \\( \\frac{1}{2} \\times \\text{base}(QR) \\times \\text{height}(PL) = \\frac{1}{2} \\times 4 \\times 5 = 10 \\text{ cm}^2 \\).</p>`
            }),
            () => ({
                text: `<p>Find the area of a right triangle with legs 3 cm and 4 cm.</p>`,
                correctAnswer: "6 cm²",
                options: shuffle(["6 cm²", "12 cm²", "7 cm²", "5 cm²"]),
                solution: `<p>Area = \\( \\frac{1}{2} \\times 3 \\times 4 = 6 \\text{ cm}^2 \\).</p>`
            })
        ];

        // Selection: 1 Concept, 1 SameBase, 1 Obtuse, 3 Problems
        const selected = [
            ...pickRandom(conceptPool, 1).map(fn => fn()),
            ...pickRandom(sameBasePool, 1).map(fn => fn()),
            ...pickRandom(obtusePool, 1).map(fn => fn()),
            ...pickRandom(problemPool, 3).map(fn => fn())
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Area of Triangle</span></div>
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
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><TriangleVisual {...cq.visual} /></div>}
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

export default AreaTriangle;

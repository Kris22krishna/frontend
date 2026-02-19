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

/* ─── Visual: Dual Symmetry (Line + Rotational) ─── */
const DualSymmetryVisual = ({ shape }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B", r = "#FFD700";

    if (shape === 'Square') {
        return (
            <svg width="140" height="140" viewBox="0 0 100 100">
                <rect x="25" y="25" width="50" height="50" fill={f} stroke={s} strokeWidth="2" />
                {/* Lines of Symmetry */}
                <line x1="50" y1="20" x2="50" y2="80" stroke={l} strokeWidth="1" strokeDasharray="3,3" />
                <line x1="20" y1="50" x2="80" y2="50" stroke={l} strokeWidth="1" strokeDasharray="3,3" />
                <line x1="20" y1="20" x2="80" y2="80" stroke={l} strokeWidth="1" strokeDasharray="3,3" />
                <line x1="80" y1="20" x2="20" y2="80" stroke={l} strokeWidth="1" strokeDasharray="3,3" />
                {/* Rotation Arrow */}
                <path d="M75,25 A25,25 0 0,1 90,50" fill="none" stroke={r} strokeWidth="2" markerEnd="url(#arrowhead3)" />
                <defs>
                    <marker id="arrowhead3" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                        <polygon points="0 0, 6 2, 0 4" fill={r} />
                    </marker>
                </defs>
                <text x="50" y="90" textAnchor="middle" fontSize="6" fill={s}>Line (4) & Rotational (Order 4)</text>
            </svg>
        );
    }
    if (shape === 'Circle') {
        return (
            <svg width="140" height="140" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" fill={f} stroke={s} strokeWidth="2" />
                <line x1="50" y1="15" x2="50" y2="85" stroke={l} strokeWidth="1" strokeDasharray="3,3" />
                <line x1="15" y1="50" x2="85" y2="50" stroke={l} strokeWidth="1" strokeDasharray="3,3" />
                <path d="M75,30 A25,25 0 1,1 25,30" fill="none" stroke={r} strokeWidth="1.5" markerEnd="url(#arrowhead3)" />
                <text x="50" y="90" textAnchor="middle" fontSize="6" fill={s}>Infinite Lines & Order</text>
            </svg>
        );
    }
    return null;
};

/* ─── Visual: Letter Symmetry (H, X, etc) ─── */
const LetterSymmetryVisual = ({ letter }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";
    return (
        <svg width="120" height="120" viewBox="0 0 100 100">
            <text x="50" y="75" textAnchor="middle" fontSize="70" fontFamily="sans-serif" fontWeight="bold" fill={f} stroke={s} strokeWidth="1">{letter}</text>
            {/* Horizontal Line */}
            <line x1="20" y1="50" x2="80" y2="50" stroke={l} strokeWidth="1" strokeDasharray="4,2" />
            {/* Vertical Line */}
            <line x1="50" y1="20" x2="50" y2="80" stroke={l} strokeWidth="1" strokeDasharray="4,2" />
            <text x="50" y="90" textAnchor="middle" fontSize="6" fill={s}>Both Axes</text>
        </svg>
    );
};

const LineRotationalRelationship = () => {
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

    const SKILL_ID = 1088;
    const SKILL_NAME = "Class 7 - Symmetry - Relationship";

    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── Subtopic 4.1 POOL: Figures with Both Symmetries (pick 3) ──
        const bothPool = [
            () => ({
                text: `<p>Which of the following figures has <b>both</b> line symmetry and rotational symmetry of order more than 1?</p>`,
                visual: <DualSymmetryVisual shape="Square" />,
                correctAnswer: "Square",
                options: shuffle(["Square", "Isosceles Triangle", "Trapezium", "Kite"]),
                solution: `<p>A <b>Square</b> has 4 lines of symmetry AND rotational symmetry of order 4. Isosceles triangle has only line symmetry (1 line) and order 1.</p>`
            }),
            () => ({
                text: `<p>Does a <b>Parallelogram</b> have line symmetry?</p>`,
                correctAnswer: "No",
                options: ["No", "Yes (2 lines)", "Yes (4 lines)", "Yes (1 line)"],
                solution: `<p>A generic Parallelogram has <b>NO</b> line of symmetry. However, it has rotational symmetry of order 2.</p>`
            }),
            () => ({
                text: `<p>Which figure has infinite lines of symmetry and infinite order of rotational symmetry?</p>`,
                visual: <DualSymmetryVisual shape="Circle" />,
                correctAnswer: "Circle",
                options: shuffle(["Circle", "Sphere", "Regular Polygon", "Line"]),
                solution: `<p>A <b>Circle</b> has infinite fold lines and looks the same at any angle of rotation.</p>`
            }),
            () => ({
                text: `<p>Does a <b>Rectangle</b> have rotational symmetry of order > 1?</p>`,
                correctAnswer: "Yes",
                options: ["Yes", "No", "Only if it is a square", "Only if it is Golden"],
                solution: `<p>Yes, a Rectangle has rotational symmetry of <b>Order 2</b> (180° rotation matches).</p>`
            })
        ];

        // ── Subtopic 4.2 POOL: Alphabets (pick 3) ──
        const alphabetPool = [
            () => ({
                text: `<p>Which letter has <b>both</b> horizontal and vertical lines of symmetry?</p>`,
                visual: <LetterSymmetryVisual letter="H" />,
                correctAnswer: "H",
                options: shuffle(["H", "K", "A", "M"]),
                solution: `<p>The letter <b>H</b> (also I, O, X) has both horizontal and vertical lines of symmetry. It also has rotational symmetry of order 2.</p>`
            }),
            () => ({
                text: `<p>Which letter has rotational symmetry of order 2 but <b>no</b> line of symmetry?</p>`,
                correctAnswer: "Z",
                options: shuffle(["Z", "H", "O", "X"]),
                solution: `<p>The letter <b>Z</b> (and N, S) has rotational symmetry of order 2 but cannot be folded symmetrically (no line symmetry).</p>`
            }),
            () => ({
                text: `<p>Which letter has only a <b>horizontal</b> line of symmetry?</p>`,
                correctAnswer: "B",
                options: shuffle(["B", "A", "M", "V"]),
                solution: `<p>The letter <b>B</b> (also C, D, E, K) has a horizontal line of symmetry but no vertical one.</p>`
            }),
            () => ({
                text: `<p>Which letter represents a shape with rotational symmetry of order 2?</p>`,
                correctAnswer: "S",
                options: shuffle(["S", "L", "T", "V"]),
                solution: `<p>The letter <b>S</b> looks the same after a 180° turn (half rotation), so it has order 2.</p>`
            })
        ];

        // ── Subtopic 4.3/4.4 POOL: Applications/Higher Thinking (pick 4) ──
        const appPool = [
            () => ({
                text: `<p>If a figure has two or more lines of symmetry, does it <b>always</b> have rotational symmetry of order > 1?</p>`,
                correctAnswer: "Yes",
                options: ["Yes", "No", "Sometimes", "Never"],
                solution: `<p>Yes, if a figure has 2+ lines of symmetry intersecting at a point, it MUST have rotational symmetry of order > 1.</p>`
            }),
            () => ({
                text: `<p>Can a Triangle have rotational symmetry of order 2?</p>`,
                correctAnswer: "No",
                options: ["No", "Yes", "Only if isosceles", "Only if right-angled"],
                solution: `<p>No. An equilateral triangle has order 3. Other triangles have order 1. No triangle has order 2.</p>`
            }),
            () => ({
                text: `<p>The center of rotation for a Regular Polygon is:</p>`,
                correctAnswer: "Intersection of diagonals",
                options: ["Intersection of diagonals", "One of the vertices", "Midpoint of a side", "Outside the figure"],
                solution: `<p>For a regular polygon with even sides, it's the intersection of diagonals/symmetry lines. Generally, it's the geometric center.</p>`
            })
        ];

        // Pick: 3 from Both, 3 from Alphabet, 4 from App = 10 total
        const selected = [
            ...pickRandom(bothPool, 3).map(fn => fn()),
            ...pickRandom(alphabetPool, 3).map(fn => fn()),
            ...pickRandom(appPool, 4).map(fn => fn()),
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Relationship</span></div>
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

export default LineRotationalRelationship;

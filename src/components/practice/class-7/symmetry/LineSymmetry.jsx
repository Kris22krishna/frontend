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

/* ─── Visual: Line Symmetry (Shapes with dotted lines) ─── */
const LineSymmetryVisual = ({ shape, lines }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";

    // Helper to draw dotted line
    const DottedLine = ({ x1, y1, x2, y2 }) => (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={l} strokeWidth="2" strokeDasharray="5,5" />
    );

    if (shape === 'Butterfly') {
        return (
            <svg width="160" height="140" viewBox="0 0 120 100">
                <path d="M60,20 Q90,0 90,30 Q90,50 60,50 Q90,50 90,80 Q90,100 60,90 Q30,100 30,80 Q30,50 60,50 Q30,50 30,30 Q30,0 60,20 Z"
                    fill={f} stroke={s} strokeWidth="2" />
                <line x1="60" y1="20" x2="60" y2="90" stroke={s} strokeWidth="2" />
                {lines === 'vertical' && <DottedLine x1="60" y1="5" x2="60" y2="95" />}
                <text x="60" y="110" textAnchor="middle" fontSize="10" fill={s}>Axis of Symmetry</text>
            </svg>
        );
    }
    if (shape === 'Letter A') {
        return (
            <svg width="140" height="140" viewBox="0 0 100 100">
                <text x="50" y="80" textAnchor="middle" fontSize="80" fontFamily="sans-serif" fontWeight="bold" fill={f} stroke={s} strokeWidth="1">A</text>
                {lines === 'vertical' && <DottedLine x1="50" y1="10" x2="50" y2="90" />}
            </svg>
        );
    }
    if (shape === 'Letter M') {
        return (
            <svg width="140" height="140" viewBox="0 0 100 100">
                <text x="50" y="80" textAnchor="middle" fontSize="80" fontFamily="sans-serif" fontWeight="bold" fill={f} stroke={s} strokeWidth="1">M</text>
                {lines === 'vertical' && <DottedLine x1="50" y1="10" x2="50" y2="90" />}
            </svg>
        );
    }
    return null;
};

/* ─── Visual: Mirror Reflection (Object + Mirror Line + Reflection) ─── */
const MirrorReflectionVisual = ({ object }) => {
    const s = "#31326F", f = "#4FB7B320", m = "#FF6B6B";

    if (object === 'P') {
        return (
            <svg width="200" height="120" viewBox="0 0 160 100">
                {/* Original P */}
                <text x="40" y="70" textAnchor="middle" fontSize="60" fontFamily="sans-serif" fontWeight="bold" fill={s}>P</text>

                {/* Mirror Line */}
                <line x1="80" y1="10" x2="80" y2="90" stroke={m} strokeWidth="2" strokeDasharray="5,3" />
                <text x="80" y="100" textAnchor="middle" fontSize="10" fill={m}>Mirror Line</text>

                {/* Reflected P (flipped horizontally) */}
                <g transform="scale(-1, 1) translate(-160, 0)">
                    <text x="40" y="70" textAnchor="middle" fontSize="60" fontFamily="sans-serif" fontWeight="bold" fill={s} opacity="0.6">P</text>
                </g>
            </svg>
        );
    }
    if (object === 'Triangle') {
        return (
            <svg width="200" height="120" viewBox="0 0 160 100">
                {/* Original Triangle */}
                <polygon points="40,20 20,70 60,70" fill={f} stroke={s} strokeWidth="2" />

                {/* Mirror Line */}
                <line x1="80" y1="10" x2="80" y2="90" stroke={m} strokeWidth="2" strokeDasharray="5,3" />

                {/* Reflected Triangle */}
                <polygon points="120,20 140,70 100,70" fill={f} stroke={s} strokeWidth="2" opacity="0.6" />
            </svg>
        );
    }
    return null;
};

/* ─── Visual: Multiple Lines of Symmetry ─── */
const MultipleLinesVisual = ({ shape }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";
    const DottedLine = ({ x1, y1, x2, y2 }) => (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={l} strokeWidth="2" strokeDasharray="5,5" />
    );

    if (shape === 'Square') {
        return (
            <svg width="140" height="140" viewBox="0 0 100 100">
                <rect x="20" y="20" width="60" height="60" fill={f} stroke={s} strokeWidth="2" />
                {/* Vertical */}
                <DottedLine x1="50" y1="10" x2="50" y2="90" />
                {/* Horizontal */}
                <DottedLine x1="10" y1="50" x2="90" y2="50" />
                {/* Diagonal 1 */}
                <DottedLine x1="15" y1="15" x2="85" y2="85" />
                {/* Diagonal 2 */}
                <DottedLine x1="15" y1="85" x2="85" y2="15" />
                <text x="50" y="98" textAnchor="middle" fontSize="10" fill={s}>4 Lines</text>
            </svg>
        );
    }
    if (shape === 'Rectangle') {
        return (
            <svg width="140" height="120" viewBox="0 0 120 100">
                <rect x="20" y="30" width="80" height="40" fill={f} stroke={s} strokeWidth="2" />
                {/* Vertical */}
                <DottedLine x1="60" y1="20" x2="60" y2="80" />
                {/* Horizontal */}
                <DottedLine x1="10" y1="50" x2="110" y2="50" />
                <text x="60" y="90" textAnchor="middle" fontSize="10" fill={s}>2 Lines</text>
            </svg>
        );
    }
    return null;
};

/* ─── Main Component ─── */
const LineSymmetry = () => {
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

    const SKILL_ID = 1084;
    const SKILL_NAME = "Class 7 - Symmetry - Line Symmetry";

    /* ─── Helper: pick N random items from an array ─── */
    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── Topic 1: Line Symmetry for Regular Polygons & Shapes ──
        const pool1 = [
            () => ({ text: `<p>A figure has <b>line symmetry</b> if:</p>`, correctAnswer: "It can be folded so that the two halves coincide exactly", options: shuffle(["It can be folded so that the two halves coincide exactly", "It can be rotated to look the same", "It has no corners", "It is a circle"]), solution: `<p>A figure has line symmetry if a line can be drawn dividing it into two identical halves that overlap exactly when folded.</p>` }),
            () => ({ text: `<p>Which letter has <b>vertical</b> line symmetry?</p>`, visual: <LineSymmetryVisual shape="Letter A" lines="vertical" />, correctAnswer: "A", options: shuffle(["A", "P", "F", "Q"]), solution: `<p>The letter <b>A</b> can be divided vertically into two mirror images. F, P, Q do not have vertical symmetry.</p>` }),
            () => ({ text: `<p>Which letter has <b>vertical</b> line symmetry?</p>`, visual: <LineSymmetryVisual shape="Letter M" lines="vertical" />, correctAnswer: "M", options: shuffle(["M", "S", "L", "Z"]), solution: `<p>The letter <b>M</b> is symmetric about a vertical line.</p>` }),
            () => ({ text: `<p>The dotted line in the figure is called the:</p>`, visual: <LineSymmetryVisual shape="Butterfly" lines="vertical" />, correctAnswer: "Axis of Symmetry", options: shuffle(["Axis of Symmetry", "Diagonal", "Perpendicular Bisector", "Chord"]), solution: `<p>The line that divides a symmetric figure into two identical halves is called the <b>Axis of Symmetry</b>.</p>` }),
            () => ({ text: `<p>A <b>Regular Pentagon</b> has how many lines of symmetry?</p>`, correctAnswer: "5", options: ["4", "5", "6", "10"], solution: `<p>A regular polygon with <b>n</b> sides has <b>n</b> lines of symmetry. A pentagon has 5 sides.</p>` })
        ];

        // ── Topic 2: Mirror Reflection ──
        const pool2 = [
            () => ({ text: `<p>Mirror reflection leads to <b>lateral inversion</b>. This means:</p>`, correctAnswer: "Left becomes Right and Right becomes Left", options: shuffle(["Left becomes Right and Right becomes Left", "Top becomes Bottom", "The image is smaller", "The image is upside down"]), solution: `<p>In a plane mirror, the left side of the object appears on the right in the image, and vice-versa.</p>` }),
            () => ({ text: `<p>If you look at the letter <b>P</b> in a mirror, how does it distinctively look?</p>`, visual: <MirrorReflectionVisual object="P" />, correctAnswer: "Reversed (q-like shape)", options: shuffle(["Reversed (q-like shape)", "Exactly the same", "Upside down (b-like shape)", "Invisible"]), solution: `<p>Due to lateral inversion, <b>P</b> appears reversed horizontally.</p>` }),
            () => ({ text: `<p>Which figure shows the correct reflection of a triangle across the mirror line?</p>`, visual: <MirrorReflectionVisual object="Triangle" />, correctAnswer: "The image is equidistant and inverted laterally", options: ["The image is equidistant and inverted laterally", "The image is upside down", "The image has different size", "The image is shifted up"], solution: `<p>The reflection is the same distance behind the mirror line and is laterally inverted.</p>` }),
            () => ({ text: `<p>Which of these letters looks the <b>SAME</b> in a mirror?</p>`, correctAnswer: "O", options: shuffle(["O", "P", "S", "L"]), solution: `<p><b>O</b> has vertical symmetry, so its mirror reflection looks identical to the original.</p>` })
        ];

        // ── Topic 3: Multiple Lines of Symmetry ──
        const pool3 = [
            () => ({ text: `<p>A <b>Square</b> has how many lines of symmetry?</p>`, visual: <MultipleLinesVisual shape="Square" />, correctAnswer: "4", options: ["2", "4", "6", "8"], solution: `<p>A square has 4 lines of symmetry: 2 diagonals and 2 lines joining midpoints of opposite sides.</p>` }),
            () => ({ text: `<p>A <b>Rectangle</b> has how many lines of symmetry?</p>`, visual: <MultipleLinesVisual shape="Rectangle" />, correctAnswer: "2", options: ["2", "4", "0", "Infinite"], solution: `<p>A rectangle has <b>2</b> lines of symmetry (joining midpoints of opposite sides). Diagonals are NOT lines of symmetry for a non-square rectangle.</p>` }),
            () => ({ text: `<p>A <b>Scalene Triangle</b> has how many lines of symmetry?</p>`, correctAnswer: "0", options: ["0", "1", "2", "3"], solution: `<p>A Scalene triangle has all sides of different lengths, so it has <b>0</b> lines of symmetry.</p>` }),
            () => ({ text: `<p>An <b>Isosceles Triangle</b> has how many lines of symmetry?</p>`, correctAnswer: "1", options: ["1", "2", "3", "0"], solution: `<p>An Isosceles triangle has <b>1</b> line of symmetry (the median from the vertex between equal sides).</p>` }),
            () => ({ text: `<p>A <b>Circle</b> has how many lines of symmetry?</p>`, correctAnswer: "Infinite", options: ["Infinite", "1", "100", "0"], solution: `<p>A circle is symmetric about any diameter. Since there are infinite diameters, there are <b>infinite</b> lines of symmetry.</p>` })
        ];

        // Pick: 3 from P1, 3 from P2, 4 from P3 = 10 questions
        const selected = [
            ...pickRandom(pool1, 3).map(fn => fn()),
            ...pickRandom(pool2, 3).map(fn => fn()),
            ...pickRandom(pool3, 4).map(fn => fn()),
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Line Symmetry</span></div>
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

export default LineSymmetry;

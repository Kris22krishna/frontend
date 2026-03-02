import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/middle/class-7/Class7PracticeLayout.css';

const CORRECT_MESSAGES = ["✨ Amazing!", "🌟 Brilliant!", "🎉 Correct!", "🚀 Super!", "💎 Excellent!"];

/* ─── Visual: Regular Polygons with Symmetry Lines ─── */
const RegularPolygonVisual = ({ sides, showLines }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";
    const size = 60;
    const cx = 70;
    const cy = 70;

    // Generate points for polygon
    const points = [];
    for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 * i) / sides - Math.PI / 2; // Start from top
        points.push(`${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`);
    }

    // Generate symmetry lines
    const lines = [];
    if (showLines) {
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
            // Draw line from vertex to opposite side/vertex
            const x1 = cx + (size + 10) * Math.cos(angle);
            const y1 = cy + (size + 10) * Math.sin(angle);
            const x2 = cx + (size + 10) * Math.cos(angle + Math.PI);
            const y2 = cy + (size + 10) * Math.sin(angle + Math.PI);
            lines.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={l} strokeWidth="1.5" strokeDasharray="4,4" />);
        }
    }

    const label = sides === 3 ? "Equilateral Triangle" :
        sides === 4 ? "Square" :
            sides === 5 ? "Regular Pentagon" :
                sides === 6 ? "Regular Hexagon" : "Polygon";

    return (
        <svg width="140" height="150" viewBox="0 0 140 150">
            <polygon points={points.join(' ')} fill={f} stroke={s} strokeWidth="2" />
            {showLines && lines}
            {/* Mark equal sides with ticks - simple visual cues */}
            {points.map((p, i) => {
                const next = points[(i + 1) % sides];
                const [x1, y1] = p.split(',').map(Number);
                const [x2, y2] = next.split(',').map(Number);
                const mx = (x1 + x2) / 2;
                const my = (y1 + y2) / 2;
                return <circle key={i} cx={mx} cy={my} r="2" fill={s} />
            })}
            <text x="70" y="145" textAnchor="middle" fontSize="10" fill={s}>{label}</text>
        </svg>
    );
};

/* ─── Main Component ─── */
const RegularPolygonsSymmetry = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [finalTime, setFinalTime] = useState(0);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [answers, setAnswers] = useState({});
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 1085;
    const SKILL_NAME = "Class 7 - Symmetry - Regular Polygons";

    /* ─── Helper: pick N random items from an array ─── */
    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── Subtopic 2.1 POOL: Regular Polygons Concept (pick 5) ──
        const conceptPool = [
            () => ({
                text: `<p>A polygon is said to be <b>regular</b> if:</p>`,
                correctAnswer: "All its sides are equal and all its angles are equal",
                options: shuffle(["All its sides are equal and all its angles are equal", "Only all its sides are equal", "Only all its angles are equal", "It has at least 4 sides"]),
                solution: `<p>A <b>regular polygon</b> is both equilateral (equal sides) and equiangular (equal angles).</p>`
            }),
            () => ({
                text: `<p>Which of the following is a <b>regular polygon</b>?</p>`,
                correctAnswer: "Square",
                options: shuffle(["Square", "Rectangle", "Rhombus", "Isosceles Triangle"]),
                solution: `<p>A <b>Square</b> is a regular polygon because all 4 sides are equal AND all 4 angles are 90°.</p>`
            }),
            () => ({
                text: `<p>Is a Rhombus a regular polygon?</p>`,
                correctAnswer: "No, angles are not necessarily equal",
                options: shuffle(["No, angles are not necessarily equal", "Yes, all sides are equal", "Yes, always", "Only if it's a Kite"]),
                solution: `<p>A Rhombus has equal sides but its angles are not necessarily equal (unless it's a square), so it is <b>not</b> a regular polygon.</p>`
            }),
            () => ({
                text: `<p>How many lines of symmetry does a <b>Regular Hexagon</b> have?</p>`,
                visual: <RegularPolygonVisual sides={6} showLines={true} />,
                correctAnswer: "6",
                options: ["4", "5", "6", "8"],
                solution: `<p>A regular hexagon (6 sides) has exactly <b>6 lines of symmetry</b>. Each line connects opposite vertices or midpoints of opposite sides.</p>`
            }),
            () => ({
                text: `<p>How many lines of symmetry does a <b>Regular Pentagon</b> have?</p>`,
                visual: <RegularPolygonVisual sides={5} showLines={true} />,
                correctAnswer: "5",
                options: ["4", "5", "6", "10"],
                solution: `<p>A regular pentagon (5 sides) has <b>5 lines of symmetry</b>. Each line connects a vertex to the midpoint of the opposite side.</p>`
            }),
            () => ({
                text: `<p>An <b>Equilateral Triangle</b> is a regular polygon with:</p>`,
                correctAnswer: "3 equal sides and 3 equal angles",
                options: shuffle(["3 equal sides and 3 equal angles", "3 equal sides only", "3 equal angles only", "2 equal sides"]),
                solution: `<p>An equilateral triangle is the simplest regular polygon with 3 equal sides and 3 equal 60° angles.</p>`
            })
        ];

        // ── Subtopic 2.2 POOL: Relation Sides vs Symmetry (pick 5) ──
        const relationPool = [
            () => ({
                text: `<p>For a regular polygon of <b>n</b> sides, the number of lines of symmetry is:</p>`,
                correctAnswer: "n",
                options: ["n", "2n", "n/2", "n - 1"],
                solution: `<p>A regular polygon with <b>n</b> sides has exactly <b>n</b> lines of symmetry.</p>`
            }),
            () => ({
                text: `<p>If a regular polygon has <b>8 sides</b> (Octagon), lines of symmetry = ?</p>`,
                correctAnswer: "8",
                options: ["4", "6", "8", "16"],
                solution: `<p>Since it has 8 sides, a Regular Octagon has <b>8</b> lines of symmetry.</p>`
            }),
            () => ({
                text: `<p>How many lines of symmetry does a <b>Regular Decagon</b> (10 sides) have?</p>`,
                correctAnswer: "10",
                options: ["5", "10", "20", "2"],
                solution: `<p>A regular decagon has 10 sides, so it has <b>10</b> lines of symmetry.</p>`
            }),
            () => ({
                text: `<p>Can a regular polygon have 4.5 lines of symmetry?</p>`,
                correctAnswer: "No, it must be a whole number",
                options: shuffle(["No, it must be a whole number", "Yes, if it has 9 sides", "Yes, always", "Only for circles"]),
                solution: `<p>The number of lines of symmetry must be an integer (count), so 4.5 is impossible.</p>`
            }),
            () => ({
                text: `<p>Does an irregular polygon always have <b>n</b> lines of symmetry?</p>`,
                correctAnswer: "No",
                options: ["No", "Yes", "Only if convex", "Only if concave"],
                solution: `<p>No, only <b>regular</b> polygons are guaranteed to have <b>n</b> lines of symmetry. Irregular ones (like a rectangle) may have fewer or none.</p>`
            }),
            () => ({
                text: `<p>How many lines of symmetry does a <b>Square</b> have?</p>`,
                visual: <RegularPolygonVisual sides={4} showLines={true} />,
                correctAnswer: "4",
                options: ["2", "4", "6", "8"],
                solution: `<p>A Square (Regular Quadrilateral) has <b>4</b> lines of symmetry (2 diagonals + 2 mid-side lines).</p>`
            })
        ];

        // Pick: 5 from Concept, 5 from Relation = 10 questions
        const selected = [
            ...pickRandom(conceptPool, 5).map(fn => fn()),
            ...pickRandom(relationPool, 5).map(fn => fn()),
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
                await api.createReport({
                uid: parseInt(uid),
                category: 'Practice',
                reportData: {
                    skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: questions.length, correct_answers: c, time_taken_seconds: timeElapsed,
                    score: (c / questions.length) * 100,
                    type: 'Practice'
                }
            }).catch(console.error);
            }
            setFinalTime(timeElapsed);
            setShowReport(true);
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

    
    if (showReport) {
        return (
            <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8f9fa' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#31326F', marginBottom: '1rem', fontWeight: 'bold' }}>Practice Complete! 🎉</h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '2rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#f8f9fa', borderRadius: '16px', fontSize: '1.2rem' }}>
                            <span style={{ color: '#666', fontWeight: '600' }}>Time Taken:</span>
                            <span style={{ color: '#31326F', fontWeight: 'bold', fontSize: '1.4rem' }}>{Math.floor(finalTime / 60)}:{(finalTime % 60).toString().padStart(2, '0')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#f0fdf4', borderRadius: '16px', fontSize: '1.2rem' }}>
                            <span style={{ color: '#16a34a', fontWeight: '600' }}>Correct Answers:</span>
                            <span style={{ color: '#15803d', fontWeight: 'bold', fontSize: '1.4rem' }}>{Object.values(answers).filter((v) => v.isCorrect).length} / {questions.length}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#fef2f2', borderRadius: '16px', fontSize: '1.2rem' }}>
                            <span style={{ color: '#dc2626', fontWeight: '600' }}>Wrong Answers:</span>
                            <span style={{ color: '#b91c1c', fontWeight: 'bold', fontSize: '1.4rem' }}>{questions.length - Object.values(answers).filter((v) => v.isCorrect).length} / {questions.length}</span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} style={{ width: '100%', padding: '1rem', background: '#31326F', color: 'white', border: 'none', borderRadius: '16px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 4px 12px rgba(49, 50, 111, 0.2)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        Continue
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Regular Polygons</span></div>
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

export default RegularPolygonsSymmetry;

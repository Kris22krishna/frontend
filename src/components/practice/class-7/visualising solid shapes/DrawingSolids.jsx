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

/* ─── Oblique Sketch Visual ─── */
const ObliqueVisual = () => {
    const s = "#31326F", f = "#4FB7B320";
    return (
        <svg width="200" height="160" viewBox="0 0 150 120">
            {/* Grid background */}
            {Array.from({ length: 16 }).map((_, i) => <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="120" stroke="#ddd" strokeWidth="0.5" />)}
            {Array.from({ length: 13 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 10} x2="150" y2={i * 10} stroke="#ddd" strokeWidth="0.5" />)}
            {/* Cuboid — front face true shape, depth at 45° */}
            <rect x="20" y="40" width="50" height="50" stroke={s} strokeWidth="2" fill={f} />
            <line x1="20" y1="40" x2="50" y2="15" stroke={s} strokeWidth="2" />
            <line x1="70" y1="40" x2="100" y2="15" stroke={s} strokeWidth="2" />
            <line x1="50" y1="15" x2="100" y2="15" stroke={s} strokeWidth="2" />
            <line x1="100" y1="15" x2="100" y2="65" stroke={s} strokeWidth="2" />
            <line x1="70" y1="90" x2="100" y2="65" stroke={s} strokeWidth="1" strokeDasharray="4" />
            <line x1="50" y1="15" x2="50" y2="65" stroke={s} strokeWidth="1" strokeDasharray="4" />
            <line x1="50" y1="65" x2="100" y2="65" stroke={s} strokeWidth="1" strokeDasharray="4" />
            <text x="75" y="110" textAnchor="middle" fontSize="9" fill={s} fontWeight="bold">Oblique Sketch</text>
        </svg>
    );
};

/* ─── Isometric Sketch Visual ─── */
const IsometricVisual = () => {
    const s = "#31326F", f = "#4FB7B320";
    return (
        <svg width="200" height="160" viewBox="0 0 150 130">
            {/* Dot grid background */}
            {Array.from({ length: 16 }).map((_, i) =>
                Array.from({ length: 14 }).map((_, j) =>
                    <circle key={`d${i}${j}`} cx={i * 10} cy={j * 10} r="1" fill="#ccc" />
                )
            )}
            {/* Isometric cuboid — 30° angles */}
            <polygon points="60,30 90,15 120,30 90,45" stroke={s} strokeWidth="2" fill={f} />  {/* top */}
            <polygon points="60,30 60,80 90,95 90,45" stroke={s} strokeWidth="2" fill={f} />  {/* left */}
            <polygon points="90,45 90,95 120,80 120,30" stroke={s} strokeWidth="2" fill={f} /> {/* right */}
            <text x="75" y="120" textAnchor="middle" fontSize="9" fill={s} fontWeight="bold">Isometric Sketch</text>
        </svg>
    );
};

/* ─── Block Stack Visual ─── */
const BlockStackVisual = ({ layers }) => {
    const s = "#31326F";
    const colors = ["#4FB7B360", "#4FB7B340", "#4FB7B320"];
    const cubeSize = 25;

    const drawCube = (x, y, size, key) => (
        <g key={key}>
            <polygon points={`${x},${y + size} ${x + size},${y + size} ${x + size},${y} ${x},${y}`} fill={colors[0]} stroke={s} strokeWidth="1" />
            <polygon points={`${x},${y} ${x + size * 0.5},${y - size * 0.4} ${x + size * 1.5},${y - size * 0.4} ${x + size},${y}`} fill={colors[1]} stroke={s} strokeWidth="1" />
            <polygon points={`${x + size},${y} ${x + size * 1.5},${y - size * 0.4} ${x + size * 1.5},${y + size * 0.6} ${x + size},${y + size}`} fill={colors[2]} stroke={s} strokeWidth="1" />
        </g>
    );

    const cubes = [];
    let idx = 0;
    (layers || [3, 2]).forEach((count, layerIdx) => {
        for (let c = 0; c < count; c++) {
            const x = 25 + c * cubeSize;
            const y = 80 - layerIdx * cubeSize;
            cubes.push(drawCube(x, y, cubeSize, idx++));
        }
    });

    return <svg width="180" height="140" viewBox="0 0 160 120">{cubes}</svg>;
};

/* ─── Main Component ─── */
const DrawingSolids = () => {
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

    const SKILL_ID = 1081;
    const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Drawing Solids on a Flat Surface";

    /* ─── Helper: pick N random items from an array ─── */
    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── Subtopic 1 POOL: Oblique Sketches (pick 3) ──
        const obliquePool = [
            () => ({ text: `<p>In an <b>oblique sketch</b>, which part of the solid is drawn in its <b>true shape</b>?</p>`, visualType: 'oblique', correctAnswer: "The front face", options: shuffle(["The front face", "The side face", "All faces equally", "The top face"]), solution: `<p>In an oblique sketch, the <b>front face</b> is drawn in its <b>true shape and size</b>. Depth lines are at 45° and usually half-length.</p>` }),
            () => ({ text: `<p>At what angle are the <b>depth lines</b> drawn in an oblique sketch?</p>`, visualType: 'oblique', correctAnswer: "45°", options: shuffle(["45°", "30°", "60°", "90°"]), solution: `<p>Depth lines in oblique sketches are at <b>45° to the horizontal</b>.</p>` }),
            () => ({ text: `<p>An oblique sketch is drawn on which type of paper?</p>`, visualType: 'oblique', correctAnswer: "Squared paper (grid paper)", options: shuffle(["Squared paper (grid paper)", "Dotted paper (isometric dots)", "Plain white paper only", "Graph paper with triangles"]), solution: `<p>Oblique sketches use <b>squared paper</b> for accurate front faces and 45° depth lines.</p>` }),
            () => ({ text: `<p>In an oblique sketch, depth lines are usually drawn at:</p>`, correctAnswer: "Half the actual length", options: shuffle(["Half the actual length", "Full actual length", "Double the actual length", "Quarter the actual length"]), solution: `<p>Depth lines are drawn at <b>half the actual length</b> to give a realistic 3-D effect.</p>` }),
            () => ({ text: `<p>Hidden edges in an oblique sketch are shown as:</p>`, correctAnswer: "Dashed lines", options: shuffle(["Dashed lines", "Bold lines", "Dotted circles", "Colored lines"]), solution: `<p>Hidden edges (those you can't see from the front) are shown as <b>dashed lines</b>.</p>` }),
            () => ({ text: `<p>Which is true about the front face in an oblique sketch?</p>`, correctAnswer: "It shows the exact shape and size", options: shuffle(["It shows the exact shape and size", "It is distorted", "It is always a square", "It is always smaller"]), solution: `<p>The front face in an oblique sketch is drawn in its <b>exact (true) shape and size</b>.</p>` }),
        ];

        // ── Subtopic 2 POOL: Isometric Sketches (pick 3) ──
        const isometricPool = [
            () => ({ text: `<p>In an <b>isometric sketch</b>, at what angles do the edges go?</p>`, visualType: 'isometric', correctAnswer: "Vertical edges are straight, others at 30°", options: shuffle(["Vertical edges are straight, others at 30°", "All edges at 45°", "Front face is true shape, depth at 45°", "All edges at right angles"]), solution: `<p>Vertical edges are straight; width and depth edges are at <b>30° to the horizontal</b>. All dimensions at same scale.</p>` }),
            () => ({ text: `<p>An isometric sketch is drawn on which type of paper?</p>`, visualType: 'isometric', correctAnswer: "Dotted paper (isometric dot paper)", options: shuffle(["Dotted paper (isometric dot paper)", "Squared paper (grid paper)", "Ruled paper", "Plain paper only"]), solution: `<p>Isometric sketches use <b>isometric dot paper</b> (triangular grid of dots at 30° and 90°).</p>` }),
            () => ({ text: `<p>How many cubes are in this arrangement? (Bottom: 3, Top: 2)</p>`, visualType: 'blocks', visualProps: { layers: [3, 2] }, correctAnswer: "5", options: ["3", "4", "5", "6"], solution: `<p>Bottom layer: 3 cubes. Top layer: 2 cubes. Total: <b>5 cubes</b>.</p>` }),
            () => ({ text: `<p>In an isometric sketch, are any faces shown in their true shape?</p>`, correctAnswer: "No — all faces appear distorted", options: shuffle(["No — all faces appear distorted", "Yes — the front face", "Yes — the top face", "Yes — all faces"]), solution: `<p>In isometric sketches, <b>no face</b> is shown in its true shape. All three dimensions are equally represented.</p>` }),
            () => ({ text: `<p>Isometric dot paper has dots arranged in a:</p>`, correctAnswer: "Triangular grid pattern", options: shuffle(["Triangular grid pattern", "Square grid pattern", "Circular pattern", "Random pattern"]), solution: `<p>The dots form a <b>triangular grid</b>, making it easy to draw lines at 30° and 90°.</p>` }),
            () => ({ text: `<p>How many cubes? (Bottom: 4, Top: 1)</p>`, visualType: 'blocks', visualProps: { layers: [4, 1] }, correctAnswer: "5", options: ["4", "5", "6", "7"], solution: `<p>Bottom: 4 + Top: 1 = <b>5 cubes</b>.</p>` }),
        ];

        // ── Subtopic 3 POOL: Difference Between Oblique and Isometric (pick 2) ──
        const diffPool = [
            () => ({ text: `<p>What is the <b>key difference</b> between oblique and isometric sketches?</p>`, correctAnswer: "Oblique shows front face in true shape; Isometric shows all dimensions equally", options: ["Oblique shows front face in true shape; Isometric shows all dimensions equally", "They are the same thing", "Oblique uses dots; Isometric uses grid lines", "Isometric shows the front face in true shape"], solution: `<p><b>Oblique</b>: front face in true shape, depth at 45°, on grid paper. <b>Isometric</b>: no face in true shape, all at same scale, at 30°/90°, on dot paper.</p>` }),
            () => ({ text: `<p>Which statement about oblique and isometric sketches is <b>TRUE</b>?</p>`, correctAnswer: "In oblique sketches, the front face appears in its true shape", options: shuffle(["In oblique sketches, the front face appears in its true shape", "In isometric sketches, the front face appears in its true shape", "Both types show all faces in their true shapes", "Neither type can represent a cuboid"]), solution: `<p>Only in <b>oblique sketches</b> does the front face appear in its true shape.</p>` }),
            () => ({ text: `<p>Oblique sketches use grid paper while isometric sketches use:</p>`, correctAnswer: "Isometric dot paper", options: shuffle(["Isometric dot paper", "Grid paper too", "Plain paper", "Ruled paper"]), solution: `<p>Oblique → <b>grid paper</b>. Isometric → <b>isometric dot paper</b>.</p>` }),
            () => ({ text: `<p>In which type of sketch are depth lines drawn at 45°?</p>`, correctAnswer: "Oblique sketch", options: shuffle(["Oblique sketch", "Isometric sketch", "Both", "Neither"]), solution: `<p>In <b>oblique sketches</b>, depth lines are at 45°. In isometric sketches, lines are at 30°.</p>` }),
            () => ({ text: `<p>Which type of sketch shows all 3 dimensions at the same scale?</p>`, correctAnswer: "Isometric sketch", options: shuffle(["Isometric sketch", "Oblique sketch", "Both", "Neither"]), solution: `<p><b>Isometric sketches</b> show all three dimensions (length, breadth, height) at the same scale.</p>` }),
        ];

        // ── Subtopic 4 POOL: Visualising Hidden Parts (pick 2) ──
        const hiddenPool = [
            () => ({ text: `<p>How many cubes in an L-shaped stack? (Bottom: 3, 1 on top of first)</p>`, visualType: 'blocks', visualProps: { layers: [3, 1] }, correctAnswer: "4", options: ["3", "4", "5", "6"], solution: `<p>Bottom: 3 + Top: 1 = <b>4 cubes</b> (L-shape).</p>` }),
            () => ({ text: `<p>A staircase: 3 bottom, 2 middle, 1 top. How many cubes total?</p>`, visualType: 'blocks', visualProps: { layers: [3, 2, 1] }, correctAnswer: "6", options: ["4", "5", "6", "7"], solution: `<p>3 + 2 + 1 = <b>6 cubes</b> (staircase pattern).</p>` }),
            () => ({ text: `<p>A stack has 2 cubes at the bottom and 2 on top. How many total?</p>`, visualType: 'blocks', visualProps: { layers: [2, 2] }, correctAnswer: "4", options: ["2", "3", "4", "5"], solution: `<p>Bottom: 2 + Top: 2 = <b>4 cubes</b>.</p>` }),
            () => ({ text: `<p>When counting cubes in a drawing, you should:</p>`, correctAnswer: "Count ALL cubes, including hidden ones", options: shuffle(["Count ALL cubes, including hidden ones", "Only count visible cubes", "Only count the front row", "Ignore the bottom layer"]), solution: `<p>You must count <b>ALL cubes</b>, even those hidden behind or under others.</p>` }),
            () => ({ text: `<p>A 2×2×2 arrangement of cubes has how many cubes?</p>`, visualType: 'blocks', visualProps: { layers: [4, 4] }, correctAnswer: "8", options: ["4", "6", "8", "10"], solution: `<p>2×2×2 = <b>8 cubes</b>. Some may be hidden from view!</p>` }),
        ];

        // Pick: 3 + 3 + 2 + 2 = 10
        const selected = [
            ...pickRandom(obliquePool, 3).map(fn => fn()),
            ...pickRandom(isometricPool, 3).map(fn => fn()),
            ...pickRandom(diffPool, 2).map(fn => fn()),
            ...pickRandom(hiddenPool, 2).map(fn => fn()),
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

    const renderVisual = () => {
        if (!cq.visualType) return null;
        if (cq.visualType === 'oblique') return <ObliqueVisual />;
        if (cq.visualType === 'isometric') return <IsometricVisual />;
        if (cq.visualType === 'blocks') return <BlockStackVisual {...(cq.visualProps || {})} />;
        return null;
    };

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Drawing Solids on a Flat Surface</span></div>
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
                            {cq.visualType && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>{renderVisual()}</div>}
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

            <footer className="junior-bottom-bar">
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

export default DrawingSolids;

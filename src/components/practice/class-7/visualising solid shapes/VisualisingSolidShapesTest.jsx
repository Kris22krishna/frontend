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

/* ─── Simple shape visual for test ─── */
const ShapeVisual = ({ type, name }) => {
    const s = "#31326F", f = "#4FB7B320";
    if (type === '3D') {
        if (name === 'Cube') return (<svg width="120" height="100" viewBox="0 0 100 100"><rect x="15" y="35" width="45" height="45" stroke={s} strokeWidth="2" fill={f} /><polygon points="15,35 35,15 80,15 60,35" stroke={s} strokeWidth="2" fill={f} /><polygon points="60,35 80,15 80,60 60,80" stroke={s} strokeWidth="2" fill={f} /></svg>);
        if (name === 'Cylinder') return (<svg width="120" height="100" viewBox="0 0 100 100"><ellipse cx="50" cy="25" rx="25" ry="8" stroke={s} strokeWidth="2" fill={f} /><line x1="25" y1="25" x2="25" y2="75" stroke={s} strokeWidth="2" /><line x1="75" y1="25" x2="75" y2="75" stroke={s} strokeWidth="2" /><ellipse cx="50" cy="75" rx="25" ry="8" stroke={s} strokeWidth="2" fill={f} /></svg>);
        if (name === 'Cone') return (<svg width="120" height="100" viewBox="0 0 100 100"><line x1="50" y1="10" x2="25" y2="80" stroke={s} strokeWidth="2" /><line x1="50" y1="10" x2="75" y2="80" stroke={s} strokeWidth="2" /><ellipse cx="50" cy="80" rx="25" ry="8" stroke={s} strokeWidth="2" fill={f} /></svg>);
        if (name === 'Sphere') return (<svg width="120" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" stroke={s} strokeWidth="2" fill={f} /><ellipse cx="50" cy="50" rx="35" ry="10" stroke={s} strokeWidth="1" strokeDasharray="3" fill="none" /></svg>);
    }
    return null;
};

/* ─── Main Component ─── */
const VisualisingSolidShapesTest = () => {
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

    const SKILL_ID = 1083;
    const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Chapter Test";

    /* ─── Helper: pick N random items from an array ─── */
    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── Topic 1 POOL: Plane Figures & Solid Shapes (pick 3) ──
        const topic1Pool = [
            () => ({ text: `<p>Which of these is a <b>3-D shape</b> (solid)?</p>`, correctAnswer: "Cube", options: shuffle(["Cube", "Circle", "Triangle", "Rectangle"]), solution: `<p>A <b>Cube</b> is 3-D (length, breadth, height). Circle, Triangle, Rectangle are 2-D (flat).</p>` }),
            () => ({ text: `<p>A ball is shaped like which solid?</p>`, visual: { type: '3D', name: 'Sphere' }, correctAnswer: "Sphere", options: shuffle(["Sphere", "Circle", "Cylinder", "Cone"]), solution: `<p>A ball is a <b>Sphere</b> — round from every direction, no edges or vertices. A circle is 2-D; a sphere is 3-D.</p>` }),
            () => ({ text: `<p>How many <b>dimensions</b> does a solid shape have?</p>`, correctAnswer: "3", options: ["1", "2", "3", "4"], solution: `<p>Solids have <b>3 dimensions</b>: length, breadth, and height. 1-D = line, 2-D = flat shape, 3-D = solid.</p>` }),
            () => ({ text: `<p>Which is a <b>2-D shape</b> (plane figure)?</p>`, correctAnswer: "Circle", options: shuffle(["Circle", "Sphere", "Cube", "Cylinder"]), solution: `<p>A <b>Circle</b> is a 2-D (flat) shape. Sphere, Cube, and Cylinder are 3-D solids.</p>` }),
            () => ({ text: `<p>A dice is an example of which solid?</p>`, correctAnswer: "Cube", options: shuffle(["Cube", "Cuboid", "Sphere", "Cylinder"]), solution: `<p>A dice is a <b>Cube</b> — all 6 faces are equal squares.</p>` }),
            () => ({ text: `<p>A tin can is shaped like which solid?</p>`, correctAnswer: "Cylinder", options: shuffle(["Cylinder", "Cube", "Cone", "Sphere"]), solution: `<p>A tin can is a <b>Cylinder</b> — two circular bases connected by a curved surface.</p>` }),
            () => ({ text: `<p>A 3-D shape has length, breadth, and ______.</p>`, correctAnswer: "Height (depth)", options: shuffle(["Height (depth)", "Color", "Weight", "Temperature"]), solution: `<p>3-D shapes have three dimensions: length, breadth, and <b>height (depth)</b>.</p>` }),
        ];

        // ── Topic 2 POOL: Faces, Edges, & Vertices (pick 3) ──
        const topic2Pool = [
            () => ({ text: `<p>How many <b>faces</b> does a <b>Cube</b> have?</p>`, visual: { type: '3D', name: 'Cube' }, correctAnswer: "6", options: ["4", "6", "8", "12"], solution: `<p>Cube: <b>6 faces</b>, 12 edges, 8 vertices. Euler: 6 + 8 − 12 = 2 ✓</p>` }),
            () => ({ text: `<p>How many <b>vertices</b> does a <b>Cone</b> have?</p>`, visual: { type: '3D', name: 'Cone' }, correctAnswer: "1", options: ["0", "1", "2", "3"], solution: `<p>A Cone has <b>1 vertex</b> (the apex). It also has 1 flat face, 1 curved surface, 1 edge.</p>` }),
            () => ({ text: `<p>Which solid has <b>0 edges</b> and <b>0 vertices</b>?</p>`, correctAnswer: "Sphere", options: shuffle(["Sphere", "Cube", "Cylinder", "Cone"]), solution: `<p>A <b>Sphere</b> has 0 edges, 0 vertices, 0 flat faces — only 1 curved surface.</p>` }),
            () => ({ text: `<p>How many <b>edges</b> does a <b>Cuboid</b> have?</p>`, correctAnswer: "12", options: ["6", "8", "10", "12"], solution: `<p>A cuboid has <b>12 edges</b>, 6 faces, and 8 vertices.</p>` }),
            () => ({ text: `<p>Euler's formula F + V − E = ?</p>`, correctAnswer: "2", options: ["0", "1", "2", "3"], solution: `<p>For any convex polyhedron: F + V − E = <b>2</b>. Example: Cube → 6 + 8 − 12 = 2.</p>` }),
            () => ({ text: `<p>How many <b>faces</b> does a Triangular Prism have?</p>`, correctAnswer: "5", options: ["3", "4", "5", "6"], solution: `<p>Triangular Prism: 2 triangular + 3 rectangular = <b>5 faces</b>.</p>` }),
            () => ({ text: `<p>A <b>Cylinder</b> has how many edges?</p>`, correctAnswer: "2", options: ["0", "1", "2", "3"], solution: `<p>A cylinder has <b>2 circular edges</b> (top and bottom rims), 0 vertices.</p>` }),
        ];

        // ── Topic 3 POOL: Nets (pick 3) ──
        const topic3Pool = [
            () => ({ text: `<p>A net is a:</p>`, correctAnswer: "2-D pattern that folds into a 3-D shape", options: shuffle(["2-D pattern that folds into a 3-D shape", "Shadow of a solid", "Cross-section of a solid", "3-D model of a shape"]), solution: `<p>A <b>net</b> is a flat 2-D pattern that can be cut and folded to form a 3-D solid.</p>` }),
            () => ({ text: `<p>A cylinder's net consists of:</p>`, correctAnswer: "2 circles and 1 rectangle", options: shuffle(["2 circles and 1 rectangle", "2 rectangles and 1 circle", "3 rectangles", "1 circle and 1 triangle"]), solution: `<p>Cylinder net: <b>2 circles</b> (top/bottom) + <b>1 rectangle</b> (curved surface, width = 2πr).</p>` }),
            () => ({ text: `<p>How many squares are in a <b>Cube's</b> net?</p>`, correctAnswer: "6", options: ["4", "5", "6", "8"], solution: `<p>A cube has 6 faces → net has <b>6 squares</b>. There are 11 valid cube net arrangements.</p>` }),
            () => ({ text: `<p>A cone's net consists of:</p>`, correctAnswer: "1 sector and 1 circle", options: shuffle(["1 sector and 1 circle", "1 triangle and 1 circle", "2 circles", "1 rectangle and 1 circle"]), solution: `<p>Cone net: <b>1 sector</b> (curved surface) + <b>1 circle</b> (base). NOT a triangle!</p>` }),
            () => ({ text: `<p>How many different valid nets can a cube have?</p>`, correctAnswer: "11", options: ["6", "8", "11", "14"], solution: `<p>There are exactly <b>11</b> different valid arrangements of 6 squares that fold into a cube.</p>` }),
            () => ({ text: `<p>4 equilateral triangles form the net of a:</p>`, correctAnswer: "Tetrahedron", options: shuffle(["Tetrahedron", "Cube", "Cone", "Square Pyramid"]), solution: `<p>4 equilateral triangles fold into a <b>Tetrahedron</b> (triangular pyramid, 4 faces).</p>` }),
        ];

        // ── Topic 4 POOL: Drawing Solids (pick 3) ──
        const topic4Pool = [
            () => ({ text: `<p>In an <b>oblique sketch</b>, depth lines are drawn at:</p>`, correctAnswer: "45°", options: ["30°", "45°", "60°", "90°"], solution: `<p>Oblique: depth lines at <b>45°</b>, usually half-scale. Front face shown in true shape.</p>` }),
            () => ({ text: `<p>An <b>isometric sketch</b> is drawn on:</p>`, correctAnswer: "Isometric dot paper", options: shuffle(["Isometric dot paper", "Squared grid paper", "Plain paper", "Ruled paper"]), solution: `<p>Isometric sketches use <b>isometric dot paper</b> (triangular grid, angles at 30° and 90°).</p>` }),
            () => ({ text: `<p>In an isometric sketch, the front face is:</p>`, correctAnswer: "NOT shown in its true shape", options: shuffle(["NOT shown in its true shape", "Shown in its true shape", "Always a square", "Always a circle"]), solution: `<p>In isometric sketches, <b>no face</b> is in its true shape. All 3 dimensions are at the same scale.</p>` }),
            () => ({ text: `<p>In an oblique sketch, the front face is drawn in its:</p>`, correctAnswer: "True shape and size", options: shuffle(["True shape and size", "Distorted form", "Half size", "Double size"]), solution: `<p>The front face is drawn in its <b>true shape and size</b> in oblique sketches.</p>` }),
            () => ({ text: `<p>Hidden edges in technical drawings are shown as:</p>`, correctAnswer: "Dashed lines", options: shuffle(["Dashed lines", "Bold lines", "Colored lines", "Wavy lines"]), solution: `<p>Hidden edges (not visible from the viewing angle) are drawn as <b>dashed lines</b>.</p>` }),
            () => ({ text: `<p>An oblique sketch is drawn on which paper?</p>`, correctAnswer: "Squared grid paper", options: shuffle(["Squared grid paper", "Isometric dot paper", "Plain paper", "Lined paper"]), solution: `<p>Oblique sketches use <b>squared (grid) paper</b>. Isometric uses dot paper.</p>` }),
        ];

        // ── Topic 5 POOL: Viewing Sections (pick 3) ──
        const topic5Pool = [
            () => ({ text: `<p>What is the cross-section when a cylinder is cut <b>horizontally</b>?</p>`, visual: { type: '3D', name: 'Cylinder' }, correctAnswer: "Circle", options: shuffle(["Circle", "Rectangle", "Oval", "Triangle"]), solution: `<p>Horizontal cut through a cylinder → <b>Circle</b> (same as base). Vertical cut → Rectangle.</p>` }),
            () => ({ text: `<p>A sphere always casts a ______ shadow.</p>`, visual: { type: '3D', name: 'Sphere' }, correctAnswer: "Circular", options: shuffle(["Circular", "Square", "Triangular", "Irregular"]), solution: `<p>A sphere always casts a <b>circular shadow</b> from any direction due to perfect symmetry.</p>` }),
            () => ({ text: `<p>The <b>top view</b> of a cone is:</p>`, visual: { type: '3D', name: 'Cone' }, correctAnswer: "A circle with a point at the center", options: shuffle(["A circle with a point at the center", "A triangle", "A rectangle", "An ellipse"]), solution: `<p>From above, a cone shows a <b>circular base</b> with the <b>apex</b> as a point in the center.</p>` }),
            () => ({ text: `<p>The <b>front view</b> of a cylinder is:</p>`, correctAnswer: "Rectangle", options: shuffle(["Rectangle", "Circle", "Oval", "Triangle"]), solution: `<p>Front view of a cylinder → <b>Rectangle</b> (width = diameter, height = cylinder height).</p>` }),
            () => ({ text: `<p>The <b>side view</b> of a cone is:</p>`, correctAnswer: "Triangle", options: shuffle(["Triangle", "Circle", "Rectangle", "Semicircle"]), solution: `<p>Side view of a cone → <b>Triangle</b>. Top view → Circle.</p>` }),
            () => ({ text: `<p>What cross-section does a horizontal cut through a cone give?</p>`, correctAnswer: "Circle", options: shuffle(["Circle", "Triangle", "Oval", "Rectangle"]), solution: `<p>Horizontal cut through a cone → <b>Circle</b> (smaller near apex, larger near base).</p>` }),
            () => ({ text: `<p>The shadow of a cylinder from the side is:</p>`, correctAnswer: "Rectangle", options: shuffle(["Rectangle", "Circle", "Square", "Oval"]), solution: `<p>Side shadow of a cylinder → <b>Rectangle</b>. Top shadow → Circle.</p>` }),
        ];

        // Pick: 3 + 3 + 3 + 3 + 3 = 15
        const selected = [
            ...pickRandom(topic1Pool, 3).map(fn => fn()),
            ...pickRandom(topic2Pool, 3).map(fn => fn()),
            ...pickRandom(topic3Pool, 3).map(fn => fn()),
            ...pickRandom(topic4Pool, 3).map(fn => fn()),
            ...pickRandom(topic5Pool, 3).map(fn => fn()),
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Chapter Test — Visualising Solid Shapes</span></div>
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
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><ShapeVisual {...cq.visual} /></div>}
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

export default VisualisingSolidShapesTest;

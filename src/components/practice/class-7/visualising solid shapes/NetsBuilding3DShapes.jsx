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

/* ─── SVG Visual: Net diagrams ─── */
const NetVisual = ({ shape }) => {
    const s = "#31326F", f = "#4FB7B320";
    if (shape === 'Cube') {
        return (
            <svg width="180" height="200" viewBox="0 0 120 140">
                {/* Cross-shaped cube net */}
                <rect x="40" y="5" width="30" height="30" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="10" y="35" width="30" height="30" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="40" y="35" width="30" height="30" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="70" y="35" width="30" height="30" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="40" y="65" width="30" height="30" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="40" y="95" width="30" height="30" stroke={s} strokeWidth="1.5" fill={f} />
                {/* fold dashes */}
                <line x1="40" y1="35" x2="70" y2="35" stroke={s} strokeWidth="1" strokeDasharray="3" />
                <line x1="40" y1="65" x2="70" y2="65" stroke={s} strokeWidth="1" strokeDasharray="3" />
                <line x1="40" y1="95" x2="70" y2="95" stroke={s} strokeWidth="1" strokeDasharray="3" />
                <text x="55" y="135" textAnchor="middle" fontSize="9" fill={s}>Cube Net</text>
            </svg>
        );
    }
    if (shape === 'Cuboid') {
        return (
            <svg width="200" height="180" viewBox="0 0 160 140">
                <rect x="45" y="5" width="40" height="25" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="5" y="30" width="40" height="25" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="45" y="30" width="40" height="25" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="85" y="30" width="40" height="25" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="45" y="55" width="40" height="25" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="45" y="80" width="40" height="25" stroke={s} strokeWidth="1.5" fill={f} />
                <text x="65" y="120" textAnchor="middle" fontSize="9" fill={s}>Cuboid Net</text>
            </svg>
        );
    }
    if (shape === 'Cylinder') {
        return (
            <svg width="180" height="180" viewBox="0 0 120 130">
                <circle cx="30" cy="30" r="18" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="20" y="55" width="80" height="35" stroke={s} strokeWidth="1.5" fill={f} />
                <circle cx="90" cy="110" r="18" stroke={s} strokeWidth="1.5" fill={f} />
                <text x="15" y="30" fontSize="8" fill={s}>Circle</text>
                <text x="45" y="75" fontSize="8" fill={s}>Rectangle</text>
                <text x="75" y="110" fontSize="8" fill={s}>Circle</text>
            </svg>
        );
    }
    if (shape === 'Cone') {
        return (
            <svg width="180" height="180" viewBox="0 0 120 120">
                <path d="M 60 10 A 50 50 0 0 1 95 70 L 60 70 Z" stroke={s} strokeWidth="1.5" fill={f} />
                <circle cx="40" cy="95" r="18" stroke={s} strokeWidth="1.5" fill={f} />
                <text x="70" y="45" fontSize="8" fill={s}>Sector</text>
                <text x="28" y="98" fontSize="8" fill={s}>Circle</text>
            </svg>
        );
    }
    return null;
};

/* ─── Main Component ─── */
const NetsBuilding3DShapes = () => {
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

    const SKILL_ID = 1080;
    const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Nets for Building 3-D Shapes";

    /* ─── Helper: pick N random items from an array ─── */
    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── Subtopic 1 POOL: Meaning of Nets (pick 2) ──
        const meaningPool = [
            () => ({ text: `<p>What is a <b>net</b> of a 3-D shape?</p>`, correctAnswer: "A 2-D pattern that can be folded to form the solid", options: shuffle(["A 2-D pattern that can be folded to form the solid", "The shadow of the solid", "A photograph of the solid", "The top view of the solid"]), solution: `<p>A <b>net</b> is a flat, 2-D pattern that can be cut and <b>folded</b> to form a 3-D solid.</p>` }),
            () => ({ text: `<p>If you unfold a solid and lay it flat, the resulting shape is called its:</p>`, correctAnswer: "Net", options: shuffle(["Net", "Shadow", "Cross-section", "Sketch"]), solution: `<p>When a 3-D solid is <b>unfolded</b> flat, the 2-D pattern is called its <b>net</b>.</p>` }),
            () => ({ text: `<p>A net can be <b>folded</b> to form a:</p>`, correctAnswer: "3-D shape", options: shuffle(["3-D shape", "2-D shape", "Line", "Point"]), solution: `<p>A net is a flat 2-D pattern that folds into a <b>3-D shape</b>.</p>` }),
            () => ({ text: `<p>Which of the following is <b>NOT</b> a net?</p>`, correctAnswer: "A shadow of a cube on a wall", options: shuffle(["A shadow of a cube on a wall", "An unfolded cardboard box", "A cross-shaped pattern of 6 squares", "An unrolled cylinder"]), solution: `<p>A shadow is a projection, not a net. A <b>net</b> can be physically folded into the solid.</p>` }),
            () => ({ text: `<p>How do you get the net of a 3-D shape?</p>`, correctAnswer: "Cut along edges and unfold it flat", options: shuffle(["Cut along edges and unfold it flat", "Shine a light on it", "Slice it in half", "Look at it from the top"]), solution: `<p>You get a net by <b>cutting along edges</b> and unfolding it flat.</p>` }),
        ];

        // ── Subtopic 2 POOL: Cube / Cuboid Nets (pick 3) ──
        const cubeCuboidPool = [
            () => ({ text: `<p>How many <b>square faces</b> does a net of a <b>Cube</b> have?</p>`, visual: { shape: 'Cube' }, correctAnswer: "6", options: ["4", "5", "6", "8"], solution: `<p>A cube has <b>6 faces</b>, all identical squares. Its net has <b>6 squares</b>. There are 11 valid cube nets.</p>` }),
            () => ({ text: `<p>Which solid is formed when a cross-shaped net of 6 equal squares is folded?</p>`, visual: { shape: 'Cube' }, correctAnswer: "Cube", options: shuffle(["Cube", "Cuboid", "Cylinder", "Cone"]), solution: `<p>6 equal squares in a cross pattern fold into a <b>Cube</b>.</p>` }),
            () => ({ text: `<p>How many faces does a <b>cuboid net</b> have?</p>`, visual: { shape: 'Cuboid' }, correctAnswer: "6", options: ["4", "5", "6", "8"], solution: `<p>A cuboid has <b>6 rectangular faces</b> (3 pairs of equal opposite faces).</p>` }),
            () => ({ text: `<p>How many <b>different valid nets</b> can a cube have?</p>`, correctAnswer: "11", options: shuffle(["6", "8", "11", "14"]), solution: `<p>There are exactly <b>11 valid cube nets</b>, all using 6 squares connected edge-to-edge.</p>` }),
            () => ({ text: `<p>A cuboid net differs from a cube net because:</p>`, correctAnswer: "It has rectangles of different sizes", options: shuffle(["It has rectangles of different sizes", "It has more faces", "It uses triangles", "It has fewer squares"]), solution: `<p>A cuboid net has <b>rectangles of different sizes</b> (3 pairs), while a cube net has 6 identical squares.</p>` }),
            () => ({ text: `<p>If a cube net has 4 squares in a row with 1 above and 1 below the 2nd, is it valid?</p>`, correctAnswer: "Yes", options: shuffle(["Yes", "No", "Only if squares are large", "Only for cuboids"]), solution: `<p><b>Yes</b>, this is one of the 11 valid cube nets.</p>` }),
        ];

        // ── Subtopic 3 POOL: Cylinder / Cone Nets (pick 3) ──
        const cylConePool = [
            () => ({ text: `<p>What are the parts of a <b>Cylinder's</b> net?</p>`, visual: { shape: 'Cylinder' }, correctAnswer: "1 Rectangle + 2 Circles", options: shuffle(["1 Rectangle + 2 Circles", "2 Rectangles + 1 Circle", "3 Circles", "1 Square + 2 Circles"]), solution: `<p>A cylinder net: <b>1 Rectangle</b> (curved surface, width = 2πr) + <b>2 Circles</b> (top/bottom).</p>` }),
            () => ({ text: `<p>What are the parts of a <b>Cone's</b> net?</p>`, visual: { shape: 'Cone' }, correctAnswer: "1 Sector + 1 Circle", options: shuffle(["1 Sector + 1 Circle", "2 Triangles", "1 Triangle + 1 Circle", "1 Rectangle + 1 Circle"]), solution: `<p>A cone net: <b>1 Sector</b> (curved surface, radius = slant height) + <b>1 Circle</b> (base). NOT a triangle!</p>` }),
            () => ({ text: `<p>The curved surface of a <b>Cylinder</b>, when unrolled, becomes:</p>`, correctAnswer: "Rectangle", options: shuffle(["Rectangle", "Circle", "Triangle", "Square"]), solution: `<p>Unrolled, it's a <b>Rectangle</b>. Height = cylinder height, width = 2πr.</p>` }),
            () => ({ text: `<p>The curved surface of a <b>Cone</b>, when unrolled, becomes:</p>`, correctAnswer: "A sector of a circle", options: shuffle(["A sector of a circle", "A triangle", "A rectangle", "A semicircle"]), solution: `<p>The lateral surface of a cone unfolds into a <b>sector</b>. Its radius = slant height.</p>` }),
            () => ({ text: `<p>In a cylinder's net, the width of the rectangle equals:</p>`, correctAnswer: "The circumference of the base (2πr)", options: shuffle(["The circumference of the base (2πr)", "The diameter", "The radius", "The height"]), solution: `<p>The rectangle wraps around the circular base, so width = <b>2πr</b>.</p>` }),
            () => ({ text: `<p>Does a cone's net contain a triangle?</p>`, correctAnswer: "No — it contains a sector, not a triangle", options: shuffle(["No — it contains a sector, not a triangle", "Yes — a large triangle", "Yes — two triangles", "Only for right cones"]), solution: `<p><b>No!</b> The net is a <b>sector</b> (pie slice shape), not a triangle.</p>` }),
        ];

        // ── Subtopic 4 POOL: Identifying Correct Nets (pick 2) ──
        const identifyPool = [
            () => ({ text: `<p>Which of these is a valid net of a <b>Cube</b>?</p>`, correctAnswer: "Cross-shaped (6 squares in a + pattern)", options: ["Cross-shaped (6 squares in a + pattern)", "4 squares in a row", "6 squares in a straight line", "5 squares in an L-shape"], solution: `<p>The <b>cross-shaped</b> arrangement is one of 11 valid cube nets.</p>` }),
            () => ({ text: `<p>A net of 4 equilateral triangles forms which solid?</p>`, correctAnswer: "Tetrahedron (Triangular Pyramid)", options: shuffle(["Tetrahedron (Triangular Pyramid)", "Cube", "Cone", "Square Pyramid"]), solution: `<p>4 equilateral triangles form a <b>Tetrahedron</b> (4 faces).</p>` }),
            () => ({ text: `<p>A net with 4 triangles + 1 square forms which solid?</p>`, correctAnswer: "Square Pyramid", options: shuffle(["Square Pyramid", "Tetrahedron", "Cube", "Prism"]), solution: `<p>A <b>Square Pyramid</b> has 1 square base + 4 triangular faces.</p>` }),
            () => ({ text: `<p>Can 6 squares in a straight line fold into a cube?</p>`, correctAnswer: "No — they would overlap", options: shuffle(["No — they would overlap", "Yes — always", "Only if small", "Only for cuboids"]), solution: `<p><b>No!</b> Faces would overlap when folding.</p>` }),
            () => ({ text: `<p>Which solid can be formed from 2 circles and 1 rectangle?</p>`, correctAnswer: "Cylinder", options: shuffle(["Cylinder", "Cone", "Sphere", "Cuboid"]), solution: `<p>2 circles + 1 rectangle = <b>Cylinder</b>.</p>` }),
        ];

        // Pick: 2 + 3 + 3 + 2 = 10
        const selected = [
            ...pickRandom(meaningPool, 2).map(fn => fn()),
            ...pickRandom(cubeCuboidPool, 3).map(fn => fn()),
            ...pickRandom(cylConePool, 3).map(fn => fn()),
            ...pickRandom(identifyPool, 2).map(fn => fn()),
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Nets for Building 3-D Shapes</span></div>
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
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><NetVisual {...cq.visual} /></div>}
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

export default NetsBuilding3DShapes;

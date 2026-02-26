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

/* ─── Cross-Section Visual ─── */
const CrossSectionVisual = ({ solid, cutDir }) => {
    const s = "#31326F", f = "#4FB7B320", h = "#FF6B6B";
    if (solid === 'Cylinder') {
        return (
            <svg width="180" height="160" viewBox="0 0 120 120">
                <ellipse cx="60" cy="20" rx="30" ry="10" stroke={s} strokeWidth="2" fill={f} />
                <rect x="30" y="20" width="60" height="60" stroke="none" fill={f} />
                <line x1="30" y1="20" x2="30" y2="80" stroke={s} strokeWidth="2" />
                <line x1="90" y1="20" x2="90" y2="80" stroke={s} strokeWidth="2" />
                <ellipse cx="60" cy="80" rx="30" ry="10" stroke={s} strokeWidth="2" fill={f} />
                {cutDir === 'horizontal' && <ellipse cx="60" cy="50" rx="30" ry="10" stroke={h} strokeWidth="2.5" fill={h + '25'} strokeDasharray="5" />}
                {cutDir === 'vertical' && <rect x="59" y="20" width="2" height="60" fill={h} opacity="0.5" />}
                <text x="60" y="110" textAnchor="middle" fontSize="9" fill={s}>Cylinder</text>
            </svg>
        );
    }
    if (solid === 'Cube') {
        return (
            <svg width="180" height="160" viewBox="0 0 120 120">
                <rect x="15" y="35" width="50" height="50" stroke={s} strokeWidth="2" fill={f} />
                <polygon points="15,35 35,15 85,15 65,35" stroke={s} strokeWidth="2" fill={f} />
                <polygon points="65,35 85,15 85,65 65,85" stroke={s} strokeWidth="2" fill={f} />
                {cutDir === 'horizontal' && <polygon points="15,60 35,40 85,40 65,60" stroke={h} strokeWidth="2.5" fill={h + '25'} strokeDasharray="5" />}
                {cutDir === 'vertical' && <rect x="40" y="15" width="2" height="70" fill={h} opacity="0.5" />}
                <text x="50" y="110" textAnchor="middle" fontSize="9" fill={s}>Cube</text>
            </svg>
        );
    }
    if (solid === 'Cone') {
        return (
            <svg width="180" height="160" viewBox="0 0 120 120">
                <line x1="60" y1="10" x2="25" y2="85" stroke={s} strokeWidth="2" />
                <line x1="60" y1="10" x2="95" y2="85" stroke={s} strokeWidth="2" />
                <ellipse cx="60" cy="85" rx="35" ry="10" stroke={s} strokeWidth="2" fill={f} />
                {cutDir === 'horizontal' && <ellipse cx="60" cy="55" rx="20" ry="7" stroke={h} strokeWidth="2.5" fill={h + '25'} strokeDasharray="5" />}
                {cutDir === 'vertical' && <line x1="60" y1="10" x2="60" y2="85" stroke={h} strokeWidth="2.5" strokeDasharray="5" />}
                <text x="60" y="110" textAnchor="middle" fontSize="9" fill={s}>Cone</text>
            </svg>
        );
    }
    return null;
};

/* ─── Shadow Visual ─── */
const ShadowVisual = ({ solid }) => {
    const s = "#31326F", f = "#4FB7B320";
    return (
        <svg width="200" height="160" viewBox="0 0 140 120">
            {/* Light source */}
            <circle cx="30" cy="10" r="8" fill="#FFD700" stroke="#FFA500" strokeWidth="1" />
            <line x1="35" y1="18" x2="55" y2="35" stroke="#FFD700" strokeWidth="1" strokeDasharray="3" />
            <line x1="38" y1="15" x2="70" y2="30" stroke="#FFD700" strokeWidth="1" strokeDasharray="3" />

            {/* Solid */}
            {solid === 'Sphere' && <circle cx="70" cy="45" r="20" stroke={s} strokeWidth="2" fill={f} />}
            {solid === 'Cone' && <><line x1="70" y1="20" x2="50" y2="65" stroke={s} strokeWidth="2" /><line x1="70" y1="20" x2="90" y2="65" stroke={s} strokeWidth="2" /><ellipse cx="70" cy="65" rx="20" ry="6" stroke={s} strokeWidth="2" fill={f} /></>}
            {solid === 'Cylinder' && <><ellipse cx="70" cy="30" rx="18" ry="7" stroke={s} strokeWidth="2" fill={f} /><line x1="52" y1="30" x2="52" y2="65" stroke={s} strokeWidth="2" /><line x1="88" y1="30" x2="88" y2="65" stroke={s} strokeWidth="2" /><ellipse cx="70" cy="65" rx="18" ry="7" stroke={s} strokeWidth="2" fill={f} /></>}

            {/* Ground + shadow */}
            <line x1="10" y1="95" x2="130" y2="95" stroke="#999" strokeWidth="1" />
            {solid === 'Sphere' && <ellipse cx="85" cy="95" rx="22" ry="5" fill="#00000020" />}
            {solid === 'Cone' && <ellipse cx="85" cy="95" rx="25" ry="6" fill="#00000020" />}
            {solid === 'Cylinder' && <rect x="60" y="90" width="40" height="10" rx="3" fill="#00000020" />}

            <text x="70" y="115" textAnchor="middle" fontSize="9" fill={s}>Shadow of {solid}</text>
        </svg>
    );
};

/* ─── Views Visual (Top / Front / Side) ─── */
const ViewsVisual = ({ object }) => {
    const s = "#31326F", f = "#4FB7B320";
    if (object === 'Glass Tumbler') {
        return (
            <svg width="180" height="140" viewBox="0 0 120 100">
                <ellipse cx="60" cy="25" rx="22" ry="8" stroke={s} strokeWidth="2" fill="none" />
                <line x1="38" y1="25" x2="42" y2="80" stroke={s} strokeWidth="2" />
                <line x1="82" y1="25" x2="78" y2="80" stroke={s} strokeWidth="2" />
                <ellipse cx="60" cy="80" rx="18" ry="6" stroke={s} strokeWidth="2" fill={f} />
                <text x="60" y="98" textAnchor="middle" fontSize="8" fill={s}>Glass Tumbler</text>
            </svg>
        );
    }
    if (object === 'Building Blocks') {
        return (
            <svg width="180" height="140" viewBox="0 0 140 110">
                {/* 2 cubes side by side, 1 on top */}
                <rect x="20" y="55" width="30" height="30" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="50" y="55" width="30" height="30" stroke={s} strokeWidth="1.5" fill={f} />
                <rect x="20" y="25" width="30" height="30" stroke={s} strokeWidth="1.5" fill="#4FB7B340" />
                <polygon points="20,25 35,15 65,15 50,25" stroke={s} strokeWidth="1.5" fill="#4FB7B320" />
                <polygon points="50,25 65,15 65,45 50,55" stroke={s} strokeWidth="1.5" fill="#4FB7B310" />
                <polygon points="50,55 80,55 95,45 65,45" stroke={s} strokeWidth="1.5" fill="#4FB7B320" />
                <polygon points="80,55 95,45 95,75 80,85" stroke={s} strokeWidth="1.5" fill="#4FB7B310" />
                <text x="60" y="100" textAnchor="middle" fontSize="8" fill={s}>Building Model</text>
            </svg>
        );
    }
    return null;
};

/* ─── Main Component ─── */
const ViewingSections = () => {
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

    const SKILL_ID = 1082;
    const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Viewing Different Sections";

    /* ─── Helper: pick N random items from an array ─── */
    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── Subtopic 1 POOL: Cross-Sections (pick 4) ──
        const crossPool = [
            () => ({ text: `<p>What is the <b>cross-section</b> when a <b>Cylinder</b> is cut <b>horizontally</b>?</p>`, visualType: 'crossSection', visualProps: { solid: 'Cylinder', cutDir: 'horizontal' }, correctAnswer: "Circle", options: shuffle(["Circle", "Rectangle", "Oval", "Square"]), solution: `<p>Horizontal cut through a cylinder → <b>Circle</b> (same as base).</p>` }),
            () => ({ text: `<p>What is the <b>cross-section</b> when a <b>Cylinder</b> is cut <b>vertically</b> through its center?</p>`, visualType: 'crossSection', visualProps: { solid: 'Cylinder', cutDir: 'vertical' }, correctAnswer: "Rectangle", options: shuffle(["Rectangle", "Circle", "Triangle", "Square"]), solution: `<p>Vertical cut through a cylinder → <b>Rectangle</b> (width = diameter, height = cylinder height).</p>` }),
            () => ({ text: `<p>What is the <b>cross-section</b> when a <b>Cube</b> is cut <b>horizontally</b>?</p>`, visualType: 'crossSection', visualProps: { solid: 'Cube', cutDir: 'horizontal' }, correctAnswer: "Square", options: shuffle(["Square", "Rectangle", "Triangle", "Circle"]), solution: `<p>Horizontal cut through a cube (parallel to a face) → <b>Square</b>.</p>` }),
            () => ({ text: `<p>What is the <b>cross-section</b> when a <b>Cone</b> is cut <b>horizontally</b>?</p>`, visualType: 'crossSection', visualProps: { solid: 'Cone', cutDir: 'horizontal' }, correctAnswer: "Circle", options: shuffle(["Circle", "Triangle", "Oval", "Rectangle"]), solution: `<p>Horizontal cut through a cone → <b>Circle</b> (smaller near apex, larger near base).</p>` }),
            () => ({ text: `<p>What is the <b>cross-section</b> when a <b>Cone</b> is cut <b>vertically</b> through its axis?</p>`, correctAnswer: "Triangle", options: shuffle(["Triangle", "Circle", "Rectangle", "Oval"]), solution: `<p>Vertical cut through a cone's axis → <b>Triangle</b>.</p>` }),
            () => ({ text: `<p>What is a <b>cross-section</b> of a solid?</p>`, correctAnswer: "The shape revealed when a solid is cut by a plane", options: shuffle(["The shape revealed when a solid is cut by a plane", "The shadow of the solid", "The bottom face", "The net of the solid"]), solution: `<p>A <b>cross-section</b> is the 2-D shape you see when you slice through a 3-D solid with a flat plane.</p>` }),
            () => ({ text: `<p>What is the cross-section when a <b>Sphere</b> is cut by any plane?</p>`, correctAnswer: "Circle", options: shuffle(["Circle", "Oval", "Square", "Semicircle"]), solution: `<p>Any plane cut through a sphere always gives a <b>Circle</b>. Cutting through the center gives the largest circle (great circle).</p>` }),
            () => ({ text: `<p>What cross-section does a <b>Cube</b> give when cut <b>diagonally</b> across two opposite edges?</p>`, correctAnswer: "Rectangle", options: shuffle(["Rectangle", "Square", "Triangle", "Hexagon"]), solution: `<p>A diagonal cut across two opposite edges of a cube gives a <b>Rectangle</b>.</p>` }),
        ];

        // ── Subtopic 2 POOL: Shadows of Solids (pick 3) ──
        const shadowPool = [
            () => ({ text: `<p>What is the <b>shadow</b> of a <b>Sphere</b> from any direction?</p>`, visualType: 'shadow', visualProps: { solid: 'Sphere' }, correctAnswer: "Circle", options: shuffle(["Circle", "Square", "Oval", "Irregular"]), solution: `<p>A sphere always casts a <b>circular shadow</b> — it looks the same from every angle.</p>` }),
            () => ({ text: `<p>What is the <b>shadow</b> of a <b>Cone</b> from <b>directly above</b>?</p>`, visualType: 'shadow', visualProps: { solid: 'Cone' }, correctAnswer: "Circle", options: shuffle(["Circle", "Triangle", "Point", "Square"]), solution: `<p>Top shadow of a cone → <b>Circle</b> (base outline). Side shadow → Triangle.</p>` }),
            () => ({ text: `<p>What is the <b>shadow</b> of a <b>Cylinder</b> from <b>the side</b>?</p>`, visualType: 'shadow', visualProps: { solid: 'Cylinder' }, correctAnswer: "Rectangle", options: shuffle(["Rectangle", "Circle", "Oval", "Square"]), solution: `<p>Side shadow of a cylinder → <b>Rectangle</b> (width = diameter, height = height). Top shadow → Circle.</p>` }),
            () => ({ text: `<p>What is the shadow of a <b>Cube</b> when light shines from <b>directly above</b>?</p>`, correctAnswer: "Square", options: shuffle(["Square", "Rectangle", "Diamond", "Circle"]), solution: `<p>Top shadow of a cube → <b>Square</b> (outline of the top face).</p>` }),
            () => ({ text: `<p>What is the shadow of a <b>Cone</b> when light shines from <b>the side</b>?</p>`, correctAnswer: "Triangle", options: shuffle(["Triangle", "Circle", "Rectangle", "Oval"]), solution: `<p>Side shadow of a cone → <b>Triangle</b> (the side profile). From above, it's a circle.</p>` }),
            () => ({ text: `<p>What is the shadow of a <b>Cylinder</b> from <b>directly above</b>?</p>`, correctAnswer: "Circle", options: shuffle(["Circle", "Rectangle", "Oval", "Square"]), solution: `<p>Top shadow of a cylinder → <b>Circle</b> (base outline).</p>` }),
            () => ({ text: `<p>The shape of a shadow depends on:</p>`, correctAnswer: "The direction of light and the shape's orientation", options: shuffle(["The direction of light and the shape's orientation", "Only the size of the object", "Only the color of the object", "The weight of the object"]), solution: `<p>A shadow's shape depends on <b>where the light comes from</b> and <b>how the object is positioned</b>.</p>` }),
        ];

        // ── Subtopic 3 POOL: Views — Top, Front, Side (pick 3) ──
        const viewsPool = [
            () => ({ text: `<p>A <b>Glass Tumbler</b> looks like a <b>Circle</b> from which view?</p>`, visualType: 'views', visualProps: { object: 'Glass Tumbler' }, correctAnswer: "Top view", options: shuffle(["Top view", "Front view", "Side view", "Bottom view"]), solution: `<p>Top view of a glass tumbler → <b>Circle</b> (the opening). Front/side → Trapezoid.</p>` }),
            () => ({ text: `<p>The <b>Front View</b> of a Brick (Cuboid) is:</p>`, correctAnswer: "Rectangle", options: shuffle(["Rectangle", "Square", "Circle", "Triangle"]), solution: `<p>Front view of a cuboid → <b>Rectangle</b>. Top and side views are also rectangles with different dimensions.</p>` }),
            () => ({ text: `<p>The <b>Top View</b> of a building model (2 cubes at bottom, 1 on top left):</p>`, visualType: 'views', visualProps: { object: 'Building Blocks' }, correctAnswer: "2 Squares side by side (L-shape from top)", options: ["2 Squares side by side (L-shape from top)", "3 Squares in a row", "1 Large rectangle", "1 Square only"], solution: `<p>From above, the top cube overlaps the left bottom cube. You see <b>2 squares side by side</b> (L-shape pattern).</p>` }),
            () => ({ text: `<p>The <b>Top View</b> of a Cylinder is:</p>`, correctAnswer: "Circle", options: shuffle(["Circle", "Rectangle", "Oval", "Square"]), solution: `<p>Looking at a cylinder from above, you see its circular top → <b>Circle</b>.</p>` }),
            () => ({ text: `<p>The <b>Side View</b> of a Cone is:</p>`, correctAnswer: "Triangle", options: shuffle(["Triangle", "Circle", "Rectangle", "Semicircle"]), solution: `<p>Looking at a cone from the side → <b>Triangle</b> profile. From above → Circle.</p>` }),
            () => ({ text: `<p>The <b>Front View</b> of a Sphere is:</p>`, correctAnswer: "Circle", options: shuffle(["Circle", "Oval", "Square", "Semicircle"]), solution: `<p>A sphere looks like a <b>Circle</b> from every direction — front, side, and top.</p>` }),
            () => ({ text: `<p>Which view shows what you see when looking at a solid from <b>directly above</b>?</p>`, correctAnswer: "Top view", options: shuffle(["Top view", "Front view", "Side view", "Back view"]), solution: `<p>The <b>Top view</b> (also called plan view) shows what you see looking straight down from above.</p>` }),
            () => ({ text: `<p>The <b>Front View</b> of a Cylinder is:</p>`, correctAnswer: "Rectangle", options: shuffle(["Rectangle", "Circle", "Oval", "Triangle"]), solution: `<p>Front view of a cylinder → <b>Rectangle</b> (width = diameter, height = cylinder height).</p>` }),
        ];

        // Pick: 4 + 3 + 3 = 10
        const selected = [
            ...pickRandom(crossPool, 4).map(fn => fn()),
            ...pickRandom(shadowPool, 3).map(fn => fn()),
            ...pickRandom(viewsPool, 3).map(fn => fn()),
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

    const renderVisual = () => {
        if (!cq.visualType) return null;
        if (cq.visualType === 'crossSection') return <CrossSectionVisual {...(cq.visualProps || {})} />;
        if (cq.visualType === 'shadow') return <ShadowVisual {...(cq.visualProps || {})} />;
        if (cq.visualType === 'views') return <ViewsVisual {...(cq.visualProps || {})} />;
        return null;
    };

    
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Viewing Different Sections</span></div>
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

export default ViewingSections;

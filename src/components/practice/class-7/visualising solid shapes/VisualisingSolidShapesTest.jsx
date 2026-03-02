import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import '../../../../pages/middle/class-7/Class7PracticeLayout.css';
import mascotImg from '../../../../assets/mascot.png';

const BLUE_THEME_CSS = `
    .option-btn-modern.selected {
        border-color: #3B82F6 !important;
        background-color: #EFF6FF !important;
        color: #1E40AF !important;
        box-shadow: 0 4px 0 #2563EB !important;
    }
    .option-btn-modern {
        min-height: 65px;
        min-width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem !important;
        text-align: center;
        font-size: 0.95rem;
    }
    .exam-report-container {
        max-width: 900px;
        margin: 0 auto;
        background: white;
        border-radius: 24px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }
    .solution-accordion {
        border: 2px solid #FEF08A;
        border-radius: 16px;
        margin-bottom: 1.5rem;
        overflow: hidden;
        background: white;
    }
    .solution-header {
        padding: 1rem;
        background: #F8FAFC;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    .solution-content {
        padding: 1.5rem;
        background: white;
        border-top: 1px solid #E2E8F0;
    }
    .status-badge { padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; }
    .status-correct { background: #DCFCE7; color: #166534; }
    .status-wrong { background: #FEE2E2; color: #991B1B; }
    .status-skipped { background: #F1F5F9; color: #475569; }
    .nav-pastel-btn {
        background: linear-gradient(135deg, #3B82F6, #2563EB) !important;
        color: white !important; border: none !important;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important;
        transition: all 0.3s ease !important; font-weight: 800 !important;
    }
    .nav-pastel-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6) !important; }
    .nav-pastel-btn:disabled { background: #E2E8F0 !important; color: #94A3B8 !important; box-shadow: none !important; cursor: not-allowed !important; }
    @media (max-width: 1024px) {
        .practice-board-container { grid-template-columns: 1fr !important; justify-items: center !important; }
        .practice-left-col { width: 100% !important; max-width: 600px !important; margin: 0 auto !important; }
        .question-palette-container { width: 100% !important; max-width: 500px !important; margin: 2rem auto 0 auto !important; max-height: none !important; height: auto !important; }
        .options-grid-modern { grid-template-columns: 1fr !important; justify-items: center !important; }
        .practice-content-wrapper { padding-bottom: 80px !important; }
        .option-btn-modern { min-height: 55px; font-size: 0.9rem; min-width: unset !important; width: 100% !important; max-width: 350px !important; margin: 0 auto !important; }
    }
    @media (max-width: 640px) {
        .junior-practice-header { padding: 0 1rem !important; }
        .practice-content-wrapper { padding: 1rem 1rem 80px 1rem !important; }
        .question-card-modern { padding: 1.5rem !important; }
        .question-text-modern { font-size: 1.1rem !important; }
    }
`;

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

const SKILL_ID = 1083;
const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Chapter Test";

const VisualisingSolidShapesTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});
    const questionStartTime = useRef(Date.now());
    const [sessionId, setSessionId] = useState(null);
    const [questions, setQuestions] = useState([]);

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

        // Pick: 5 + 5 + 5 + 5 + 5 = 25
        const selected = [
            ...pickRandom(topic1Pool, 5).map(fn => fn()),
            ...pickRandom(topic2Pool, 5).map(fn => fn()),
            ...pickRandom(topic3Pool, 5).map(fn => fn()),
            ...pickRandom(topic4Pool, 5).map(fn => fn()),
            ...pickRandom(topic5Pool, 5).map(fn => fn()),
        ];

        setQuestions(selected);
    }, []);

    useEffect(() => {
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.createPracticeSession(uid, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
    }, []);

    useEffect(() => {
        if (isTestOver) return;
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [isTestOver]);

    const handleRecordResponse = () => {
        const currentQ = questions[qIndex];
        const isCorrect = selectedOption ? selectedOption === currentQ.correctAnswer : null;
        const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000);
        const isSkipped = !selectedOption;
        setResponses(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect, timeTaken: (prev[qIndex]?.timeTaken || 0) + timeSpent, isSkipped } }));
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.recordAttempt({ user_id: uid, session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: 'Medium',
                question_text: String(currentQ.text || ''), correct_answer: String(currentQ.correctAnswer || ''),
                student_answer: String(isSkipped ? "SKIPPED" : (selectedOption || '')), is_correct: isSkipped ? false : isCorrect,
                solution_text: String(currentQ.solution || ''), time_spent_seconds: timeSpent
            }).catch(console.error);
        }
    };

    const navigateToQuestion = (targetIndex) => {
        handleRecordResponse();
        setQIndex(targetIndex);
        setSelectedOption(responses[targetIndex]?.selectedOption || null);
        questionStartTime.current = Date.now();
    };

    const handleNext = () => { if (qIndex < questions.length - 1) { navigateToQuestion(qIndex + 1); } else { handleRecordResponse(); finalizeTest(); } };
    const handlePrev = () => { if (qIndex > 0) { navigateToQuestion(qIndex - 1); } };

    const finalizeTest = async () => {
        setIsTestOver(true);
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const correctCount = Object.values(responses).filter(r => r.isCorrect === true).length;
            const wrongCount = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
            const skippedCount = questions.length - correctCount - wrongCount;
            await api.createReport({ title: SKILL_NAME, type: 'practice', score: (correctCount / questions.length) * 100,
                parameters: { skill_id: SKILL_ID, total_questions: questions.length, correct_answers: correctCount, skipped_questions: skippedCount, time_taken_seconds: timeElapsed },
                user_id: uid }).catch(console.error);
        }
    };

    const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

    if (questions.length === 0) return <div>Loading...</div>;

    if (isTestOver) {
        const correct = Object.values(responses).filter(r => r.isCorrect === true).length;
        const wrong = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
        const skipped = questions.length - correct - wrong;
        return (
            <div className="junior-practice-page grey-selection-theme p-4 md:p-8" style={{ background: '#F8FAFC', minHeight: '100vh', overflowY: 'auto' }}>
                <style>{BLUE_THEME_CSS}</style>
                <div className="exam-report-container mx-auto p-4 md:p-8 my-4 md:my-8">
                    <div className="flex flex-col items-center mb-8 mt-4 text-center">
                        <img src={mascotImg} alt="Mascot" className="w-32 h-32 md:w-40 md:h-40 mb-2 drop-shadow-lg object-contain" />
                        <h1 className="text-3xl md:text-5xl font-black text-[#31326F] mb-2">Test Report</h1>
                        <p className="text-[#64748B] text-base md:text-xl font-medium mb-8">How you performed in <span className="font-bold">{SKILL_NAME}</span></p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 w-full max-w-5xl">
                            <div className="bg-[#EFF6FF] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#DBEAFE] text-center"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Score</span><span className="text-2xl md:text-4xl font-black text-[#1E3A8A]">{Math.round((correct/questions.length)*100)}%</span></div>
                            <div className="bg-[#F0FDF4] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#DCFCE7] text-center"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1">Correct</span><span className="text-2xl md:text-4xl font-black text-[#14532D]">{correct}</span></div>
                            <div className="bg-[#FEF2F2] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#FEE2E2] text-center"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span><span className="text-2xl md:text-4xl font-black text-[#7F1D1D]">{wrong}</span></div>
                            <div className="bg-[#F8FAFC] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#E2E8F0] text-center"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#64748B] mb-1">Skipped</span><span className="text-2xl md:text-4xl font-black text-[#334155]">{skipped}</span></div>
                            <div className="bg-[#EFF6FF] p-4 md:p-6 rounded-2xl shadow-sm border-2 border-[#DBEAFE] text-center col-span-2 md:col-span-1"><span className="block text-[10px] md:text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Time</span><span className="text-2xl md:text-4xl font-black text-[#1E3A8A]">{formatTime(timeElapsed)}</span></div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-12"><button onClick={() => navigate(-1)} className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase hover:bg-[#31326F] hover:text-white transition-colors" style={{ fontSize: '1.1rem' }}>Back to Topics</button></div>
                    <div style={{ maxWidth: 1000, margin: '0 auto 2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem' }}>Detailed Review & Solutions</h2>
                        {questions.map((q, idx) => {
                            const res = responses[idx] || { isSkipped: true, timeTaken: 0 };
                            return (
                                <details key={idx} className="solution-accordion group">
                                    <summary className="solution-header cursor-pointer hover:bg-slate-50" style={{ listStyle: 'none', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                            <span style={{ fontWeight: 800, minWidth: 32, height: 32, background: '#FBBF24', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.9rem', flexShrink: 0 }}>{idx+1}</span>
                                            <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: 350 }}><LatexContent html={q.text} /></div>
                                            {res.isSkipped ? <span className="status-badge status-skipped">Skipped</span> : res.isCorrect ? <span className="status-badge status-correct">Correct</span> : <span className="status-badge status-wrong">Incorrect</span>}
                                        </div>
                                        <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                            <span className="opacity-0 group-hover:opacity-100 text-blue-600 font-semibold text-sm">Check Solution ↓</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16}/> {res.timeTaken}s</div>
                                        </div>
                                    </summary>
                                    <div className="solution-content">
                                        <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #3B82F6', background: '#F8FAFC' }}><LatexContent html={q.text} /></div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                            {q.options.map((opt, oIdx) => (<div key={oIdx} style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #E2E8F0', background: opt===q.correctAnswer?'#DCFCE7':(opt===res.selectedOption?'#FEE2E2':'white'), color: opt===q.correctAnswer?'#166534':(opt===res.selectedOption?'#991B1B':'#475569') }}><LatexContent html={opt} /></div>))}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Your Answer</h5>
                                                {res.isSkipped ? <span style={{ color: '#F59E0B', fontWeight: 700 }}>Skipped</span> : <span style={{ color: res.isCorrect?'#166534':'#DC2626', fontWeight: 700 }}>{res.selectedOption ? <LatexContent html={res.selectedOption}/> : "Skipped"}</span>}
                                            </div>
                                            <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: 12, border: '1px solid #BBF7D0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Correct Answer</h5>
                                                <span style={{ color: '#166534', fontWeight: 700 }}><LatexContent html={q.correctAnswer}/></span>
                                            </div>
                                        </div>
                                        <div style={{ background: '#F0F9FF', padding: '1.5rem', borderRadius: 12, border: '1px solid #E0F2FE' }}>
                                            <h4 style={{ color: '#0284C7', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>Solution:</h4>
                                            <LatexContent html={q.solution} />
                                        </div>
                                    </div>
                                </details>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <style>{BLUE_THEME_CSS}</style>
            <header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{SKILL_NAME}</div>
                <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-[#3B82F6]/30 text-[#1E40AF] font-black text-xl shadow-lg">{qIndex+1} / {questions.length}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#3B82F6]/30 text-[#1E40AF] font-bold text-lg shadow-md flex items-center gap-2"><Clock size={20}/> {formatTime(timeElapsed)}</div>
                </div>
            </header>
            <main className="practice-content-wrapper" style={{ flex: 1, padding: '1rem 2rem 140px 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '2rem', maxWidth: 1200, margin: '0 auto', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0, marginBottom: 60 }}>
                    <div className="practice-left-col" style={{ width: '100%', minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="question-card-modern" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'visible', justifyContent: 'flex-start' }}>
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: '1rem' }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem,1.8vw,1.35rem)', maxHeight: 'none', fontWeight: 500, textAlign: 'left', color: '#2D3748', lineHeight: 1.5, marginBottom: '1rem' }}>
                                    <LatexContent html={questions[qIndex].text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                                <div className="options-grid-modern" style={{ display: 'grid', gap: '0.75rem', width: '100%', maxWidth: 800, gridTemplateColumns: 'repeat(2,1fr)' }}>
                                    {questions[qIndex].options.map((option, idx) => (
                                        <button key={idx} className={`option-btn-modern ${selectedOption===option?'selected':''}`} onClick={() => setSelectedOption(option)}>
                                            <LatexContent html={option} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="question-palette-container" style={{ width: 300, background: 'white', padding: '1.5rem', borderRadius: 24, boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 220px)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', marginBottom: '1rem', textAlign: 'center' }}>Question Palette</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.4rem', flex: 1, alignContent: 'start' }}>
                            {questions.map((_,idx) => {
                                const isCurrent = qIndex===idx;
                                const hasResponded = responses[idx] && !responses[idx].isSkipped;
                                const isSkipped = responses[idx] && responses[idx].isSkipped;
                                let bg='#F8FAFC',clr='#64748B',bdr='1px solid #E2E8F0';
                                if (isCurrent) { bdr='2px solid #3B82F6'; bg='#EFF6FF'; clr='#1D4ED8'; }
                                else if (hasResponded) { bg='#DCFCE7'; clr='#166534'; bdr='1px solid #BBF7D0'; }
                                else if (isSkipped) { bg='#FFF7ED'; clr='#C2410C'; bdr='1px solid #FFEDD5'; }
                                return (<button key={idx} onClick={() => navigateToQuestion(idx)} style={{ height: 36, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', background: bg, color: clr, border: bdr, padding: 0 }} className="hover:shadow-md hover:-translate-y-0.5">{idx+1}</button>);
                            })}
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0.5rem', columnGap: '1rem', fontSize: '0.8rem', color: '#64748B' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#DCFCE7', border: '1px solid #BBF7D0' }}></div> Answered</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#FFF7ED', border: '1px solid #FFEDD5' }}></div> Skipped</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#F8FAFC', border: '1px solid #E2E8F0' }}></div> Unvisited</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#EFF6FF', border: '2px solid #3B82F6' }}></div> Current</div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit Test</button></div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handlePrev} disabled={qIndex===0}><ChevronLeft size={20}/> Previous</button>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext}>{qIndex===questions.length-1?"Finish Test":"Next Question"} <ChevronRight size={20}/></button>
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <button className="nav-pill-next-btn nav-pastel-btn" style={{ padding: '0.5rem 1rem' }} onClick={handlePrev} disabled={qIndex===0}><ChevronLeft size={24}/></button>
                    <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext} style={{ flex: 1 }}>{qIndex===questions.length-1?"Finish":"Next"} <ChevronRight size={24}/></button>
                </div>
            </footer>
        </div>
    );
};

export default VisualisingSolidShapesTest;

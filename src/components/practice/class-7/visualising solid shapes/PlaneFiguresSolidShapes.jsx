import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨",
    "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "💎 Spot on! Excellent! 💎"
];

/* ─── SVG Visual Component ─── */
const ShapeVisual = ({ type, name }) => {
    const stroke = "#31326F";
    const fill = "#4FB7B320";

    if (type === '2D') {
        switch (name) {
            case 'Circle':
                return (<svg width="150" height="150" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke={stroke} strokeWidth="2" fill={fill} /></svg>);
            case 'Triangle':
                return (<svg width="150" height="150" viewBox="0 0 100 100"><polygon points="50,10 90,85 10,85" stroke={stroke} strokeWidth="2" fill={fill} /></svg>);
            case 'Rectangle':
                return (<svg width="150" height="150" viewBox="0 0 100 100"><rect x="10" y="25" width="80" height="50" stroke={stroke} strokeWidth="2" fill={fill} /></svg>);
            case 'Square':
                return (<svg width="150" height="150" viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" stroke={stroke} strokeWidth="2" fill={fill} /></svg>);
            default: return null;
        }
    }

    if (type === '3D') {
        switch (name) {
            case 'Cube':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <rect x="15" y="35" width="45" height="45" stroke={stroke} strokeWidth="2" fill={fill} />
                        <polygon points="15,35 35,15 80,15 60,35" stroke={stroke} strokeWidth="2" fill={fill} />
                        <polygon points="60,35 80,15 80,60 60,80" stroke={stroke} strokeWidth="2" fill={fill} />
                        <line x1="35" y1="15" x2="35" y2="60" stroke={stroke} strokeWidth="1" strokeDasharray="3" />
                        <line x1="15" y1="80" x2="35" y2="60" stroke={stroke} strokeWidth="1" strokeDasharray="3" />
                        <line x1="35" y1="60" x2="80" y2="60" stroke={stroke} strokeWidth="1" strokeDasharray="3" />
                    </svg>
                );
            case 'Cuboid':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <rect x="10" y="35" width="55" height="40" stroke={stroke} strokeWidth="2" fill={fill} />
                        <polygon points="10,35 30,15 85,15 65,35" stroke={stroke} strokeWidth="2" fill={fill} />
                        <polygon points="65,35 85,15 85,55 65,75" stroke={stroke} strokeWidth="2" fill={fill} />
                    </svg>
                );
            case 'Sphere':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke={stroke} strokeWidth="2" fill={fill} />
                        <ellipse cx="50" cy="50" rx="40" ry="12" stroke={stroke} strokeWidth="1" strokeDasharray="4" fill="none" />
                        <ellipse cx="50" cy="50" rx="12" ry="40" stroke={stroke} strokeWidth="1" strokeDasharray="4" fill="none" />
                    </svg>
                );
            case 'Cylinder':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <ellipse cx="50" cy="25" rx="30" ry="10" stroke={stroke} strokeWidth="2" fill={fill} />
                        <rect x="20" y="25" width="60" height="50" stroke="none" fill={fill} />
                        <line x1="20" y1="25" x2="20" y2="75" stroke={stroke} strokeWidth="2" />
                        <line x1="80" y1="25" x2="80" y2="75" stroke={stroke} strokeWidth="2" />
                        <ellipse cx="50" cy="75" rx="30" ry="10" stroke={stroke} strokeWidth="2" fill={fill} />
                    </svg>
                );
            case 'Cone':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <line x1="50" y1="10" x2="20" y2="80" stroke={stroke} strokeWidth="2" />
                        <line x1="50" y1="10" x2="80" y2="80" stroke={stroke} strokeWidth="2" />
                        <ellipse cx="50" cy="80" rx="30" ry="10" stroke={stroke} strokeWidth="2" fill={fill} />
                    </svg>
                );
            default: return null;
        }
    }
    return null;
};

/* ─── Main Component ─── */
const PlaneFiguresSolidShapes = () => {
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

    const SKILL_ID = 1078;
    const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Plane Figures & Solid Shapes";

    /* ─── Helper: pick N random items from an array ─── */
    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    /* ─── Question Generator ─── */
    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
        const pick = arr => arr[Math.floor(Math.random() * arr.length)];

        const shapes2D = ['Circle', 'Triangle', 'Rectangle', 'Square', 'Pentagon', 'Hexagon'];
        const shapes3D = ['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone', 'Triangular Prism'];

        // ── Subtopic 1 POOL: 2-D and 3-D Shapes ── (pick 4)
        const pool1 = [
            () => { const s = pick(shapes2D); return { text: `<p>Is a <b>${s}</b> a 2-D shape or a 3-D shape?</p>`, visual: { type: '2D', name: s }, correctAnswer: "2-D (Plane Figure)", options: ["2-D (Plane Figure)", "3-D (Solid Shape)"], solution: `<p>A <b>${s}</b> is a <b>plane figure</b>. It lies flat and has only length and breadth — no depth. Therefore it is a <b>2-D shape</b>.</p>` }; },
            () => { const s = pick(shapes3D); return { text: `<p>Is a <b>${s}</b> a 2-D shape or a 3-D shape?</p>`, visual: { type: '3D', name: s }, correctAnswer: "3-D (Solid Shape)", options: ["2-D (Plane Figure)", "3-D (Solid Shape)"], solution: `<p>A <b>${s}</b> is a <b>solid shape</b>. It occupies space and has length, breadth, <b>and</b> height. Therefore it is a <b>3-D shape</b>.</p>` }; },
            () => { const c = pick(shapes3D); const d = shuffle(shapes2D).slice(0, 3); return { text: `<p>Which of the following shapes <b>occupies space</b>?</p>`, correctAnswer: c, options: shuffle([c, ...d]), solution: `<p>3-D shapes occupy space because they have <b>three dimensions</b>. <b>${c}</b> is a 3-D shape. The others (${d.join(', ')}) are flat 2-D figures.</p>` }; },
            () => { const s = pick(shapes2D); return { text: `<p>A <b>${s}</b> belongs to which group?</p>`, visual: { type: '2D', name: s }, correctAnswer: "Plane Figures", options: shuffle(["Plane Figures", "Solid Shapes", "Curved Shapes", "Space Figures"]), solution: `<p>Flat shapes with only two dimensions are called <b>Plane Figures</b>. A <b>${s}</b> is a plane figure.</p>` }; },
            () => { const s = pick(shapes3D); return { text: `<p>A <b>${s}</b> belongs to which group?</p>`, visual: { type: '3D', name: s }, correctAnswer: "Solid Shapes", options: shuffle(["Plane Figures", "Solid Shapes", "Line Segments", "Angles"]), solution: `<p>Shapes that have three dimensions (length, breadth, and height) are called <b>Solid Shapes</b>. A <b>${s}</b> is a solid shape.</p>` }; },
            () => ({ text: `<p>How many dimensions does a <b>plane figure</b> have?</p>`, correctAnswer: "2", options: ["1", "2", "3", "4"], solution: `<p>A plane figure has <b>2 dimensions</b> — length and breadth. It is completely flat. Examples: circle, square, triangle.</p>` }),
            () => ({ text: `<p>How many dimensions does a <b>solid shape</b> have?</p>`, correctAnswer: "3", options: ["1", "2", "3", "4"], solution: `<p>A solid shape has <b>3 dimensions</b> — length, breadth, and height. It occupies space. Examples: cube, cylinder, sphere.</p>` }),
            () => { const c = pick(shapes2D); const d = shuffle(shapes3D).slice(0, 3); return { text: `<p>Which of these is a <b>plane figure</b> (2-D)?</p>`, correctAnswer: c, options: shuffle([c, ...d]), solution: `<p>A <b>${c}</b> is a plane figure because it is flat and has only two dimensions.</p>` }; },
            () => ({ text: `<p>Which statement is <b>true</b> about solid shapes?</p>`, correctAnswer: "They occupy space", options: shuffle(["They occupy space", "They are always flat", "They have only length", "They have no height"]), solution: `<p>Solid shapes <b>occupy space</b> because they have three dimensions — length, breadth, and height.</p>` }),
            () => ({ text: `<p>A flat shape drawn on paper is called a:</p>`, correctAnswer: "Plane Figure", options: shuffle(["Plane Figure", "Solid Shape", "Space Figure", "Volume"]), solution: `<p>A flat shape with only two dimensions drawn on paper is called a <b>Plane Figure</b> (or 2-D shape).</p>` }),
        ];

        // ── Subtopic 2 POOL: Real-Life Solids ── (pick 3)
        const realLifePool = [
            () => ({ text: `<p>A <b>Dice</b> is shaped like which solid?</p>`, correctAnswer: "Cube", options: shuffle(['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone']), solution: `<p>A dice has 6 equal square faces, which is the defining property of a <b>Cube</b>.</p>` }),
            () => ({ text: `<p>A <b>Football</b> is shaped like which solid?</p>`, correctAnswer: "Sphere", options: shuffle(['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone']), solution: `<p>A football is round from every direction with no edges or vertices, just like a <b>Sphere</b>.</p>` }),
            () => ({ text: `<p>An <b>Ice-cream Cone</b> is shaped like which solid?</p>`, correctAnswer: "Cone", options: shuffle(['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone']), solution: `<p>An ice-cream cone has a circular opening and tapers to a point, just like a <b>Cone</b>.</p>` }),
            () => ({ text: `<p>A <b>Water Pipe</b> is shaped like which solid?</p>`, correctAnswer: "Cylinder", options: shuffle(['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone']), solution: `<p>A water pipe has two circular ends and a curved surface, just like a <b>Cylinder</b>.</p>` }),
            () => ({ text: `<p>A <b>Shoe Box</b> is shaped like which solid?</p>`, correctAnswer: "Cuboid", options: shuffle(['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone']), solution: `<p>A shoe box has 6 rectangular faces with opposite faces equal — a <b>Cuboid</b>.</p>` }),
            () => ({ text: `<p>A <b>Cricket Ball</b> is shaped like which solid?</p>`, correctAnswer: "Sphere", options: shuffle(['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone']), solution: `<p>A cricket ball is perfectly round from every angle, matching a <b>Sphere</b>.</p>` }),
            () => ({ text: `<p>A <b>Rubik's Cube</b> is shaped like which solid?</p>`, correctAnswer: "Cube", options: shuffle(['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone']), solution: `<p>A Rubik's Cube has 6 equal square faces — it is a <b>Cube</b>.</p>` }),
            () => ({ text: `<p>A <b>Tin Can</b> is shaped like which solid?</p>`, correctAnswer: "Cylinder", options: shuffle(['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone']), solution: `<p>A tin can has two circular flat ends connected by a curved surface — a <b>Cylinder</b>.</p>` }),
            () => ({ text: `<p>A <b>Party Hat</b> is shaped like which solid?</p>`, correctAnswer: "Cone", options: shuffle(['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone']), solution: `<p>A party hat has a circular base and tapers to a point — a <b>Cone</b>.</p>` }),
            () => ({ text: `<p>A <b>Book</b> is shaped like which solid?</p>`, correctAnswer: "Cuboid", options: shuffle(['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone']), solution: `<p>A book has 6 rectangular faces (length ≠ breadth ≠ height) — a <b>Cuboid</b>.</p>` }),
            () => ({ text: `<p>A <b>Globe</b> is shaped like which solid?</p>`, correctAnswer: "Sphere", options: shuffle(['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone']), solution: `<p>A globe is round from every direction — a <b>Sphere</b>.</p>` }),
            () => ({ text: `<p>A <b>Drum</b> is shaped like which solid?</p>`, correctAnswer: "Cylinder", options: shuffle(['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone']), solution: `<p>A drum has two circular flat ends connected by a curved surface — a <b>Cylinder</b>.</p>` }),
        ];

        // ── Subtopic 3 POOL: Matching / Identifying Shapes ── (pick 3)
        const matchPool = [
            () => { const s = pick(shapes3D.slice(0, 5)); const desc = { Cube: 'All faces are equal squares. 6 faces, 12 edges, 8 vertices.', Cuboid: 'Rectangular faces. Opposite faces equal. 6 faces, 12 edges, 8 vertices.', Cone: 'Circular base and pointed apex. 1 curved surface, 1 flat face, 1 vertex.', Cylinder: 'Two circular flat faces connected by a curved surface.', Sphere: 'Perfectly round. No flat faces, no edges, no vertices.' }; return { text: `<p>Identify the shape shown below:</p>`, visual: { type: '3D', name: s }, correctAnswer: s, options: shuffle(['Cube', 'Cuboid', 'Cone', 'Cylinder', 'Sphere']), solution: `<p>This is a <b>${s}</b>. ${desc[s]}</p>` }; },
            () => ({ text: `<p>Which shape has <b>all faces as equal squares</b>?</p>`, correctAnswer: "Cube", options: shuffle(["Cube", "Cuboid", "Cylinder", "Cone"]), solution: `<p>A <b>Cube</b> has all 6 faces as identical squares.</p>` }),
            () => ({ text: `<p>Which shape has <b>no flat face at all</b>?</p>`, correctAnswer: "Sphere", options: shuffle(["Sphere", "Cylinder", "Cone", "Cuboid"]), solution: `<p>A <b>Sphere</b> has no flat faces — only one curved surface.</p>` }),
            () => ({ text: `<p>Which shape has <b>a circular base and a pointed tip</b>?</p>`, correctAnswer: "Cone", options: shuffle(["Cone", "Cylinder", "Sphere", "Cube"]), solution: `<p>A <b>Cone</b> has a circular base and tapers to a point (apex).</p>` }),
            () => ({ text: `<p>Which shape has <b>two circular flat faces</b> and a <b>curved surface</b>?</p>`, correctAnswer: "Cylinder", options: shuffle(["Cylinder", "Cone", "Sphere", "Cuboid"]), solution: `<p>A <b>Cylinder</b> has two circular flat faces (top and bottom) connected by a curved surface.</p>` }),
            () => ({ text: `<p>Which shape has <b>rectangular faces</b> and <b>opposite faces equal</b>?</p>`, correctAnswer: "Cuboid", options: shuffle(["Cuboid", "Cube", "Cone", "Cylinder"]), solution: `<p>A <b>Cuboid</b> has 6 rectangular faces with opposite faces being equal.</p>` }),
            () => ({ text: `<p>Which shape <b>rolls</b> but does <b>not slide</b>?</p>`, correctAnswer: "Sphere", options: shuffle(["Sphere", "Cube", "Cuboid", "Cylinder"]), solution: `<p>A <b>Sphere</b> can only roll because it has no flat face to slide on.</p>` }),
            () => ({ text: `<p>Which shape can <b>both roll and slide</b>?</p>`, correctAnswer: "Cylinder", options: shuffle(["Cylinder", "Sphere", "Cube", "Cuboid"]), solution: `<p>A <b>Cylinder</b> can roll on its curved surface and slide on its flat circular faces.</p>` }),
            () => ({ text: `<p>Which shape can <b>only slide</b> (not roll)?</p>`, correctAnswer: "Cube", options: shuffle(["Cube", "Sphere", "Cylinder", "Cone"]), solution: `<p>A <b>Cube</b> has only flat faces, so it can only slide — it cannot roll.</p>` }),
        ];

        // Pick questions: 4 from pool1, 3 from pool2, 3 from pool3 = 10
        const selected = [
            ...pickRandom(pool1, 4).map(fn => fn()),
            ...pickRandom(realLifePool, 3).map(fn => fn()),
            ...pickRandom(matchPool, 3).map(fn => fn()),
        ];

        setQuestions(selected);
    }, []);

    /* ─── Session & Timer ─── */
    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(s => s && setSessionId(s.session_id)).catch(console.error);
        }
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const handleVis = () => {
            if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; }
            else { questionStartTime.current = Date.now(); isTabActive.current = true; }
        };
        document.addEventListener("visibilitychange", handleVis);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", handleVis); };
    }, [sessionId]);

    /* ─── Record Attempt ─── */
    const recordAttempt = async (q, selected, correct) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let t = accumulatedTime.current;
        if (isTabActive.current) t += Date.now() - questionStartTime.current;
        try {
            await api.recordAttempt({ user_id: parseInt(userId), session_id: sessionId, skill_id: SKILL_ID, difficulty_level: 'Medium', question_text: String(q.text || ''), correct_answer: String(q.correctAnswer || ''), student_answer: String(selected || ''), is_correct: correct, solution_text: String(q.solution || ''), time_spent_seconds: Math.max(0, Math.round(t / 1000)) });
        } catch (e) { console.error("Record failed", e); }
    };

    /* ─── Check Answer ─── */
    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const right = selectedOption === questions[qIndex].correctAnswer;
        setIsCorrect(right);
        setIsSubmitted(true);
        if (right) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: right } }));
        recordAttempt(questions[qIndex], selectedOption, right);
    };

    /* ─── Next / Finish ─── */
    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const correct = Object.values(answers).filter(v => v.isCorrect).length;
                await api.createReport({
                uid: parseInt(userId),
                category: 'Practice',
                reportData: {
                    skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: questions.length, correct_answers: correct, time_taken_seconds: timeElapsed,
                    score: (correct / questions.length) * 100,
                    type: 'Practice'
                }
            }).catch(console.error);
            }
            setFinalTime(timeElapsed);
            setShowReport(true);
        }
    };

    /* ─── Restore saved answer on nav ─── */
    useEffect(() => {
        const saved = answers[qIndex];
        if (saved) { setSelectedOption(saved.selectedOption); setIsCorrect(saved.isCorrect); setIsSubmitted(true); }
        else { setSelectedOption(null); setIsCorrect(false); setIsSubmitted(false); }
        setShowExplanationModal(false);
    }, [qIndex]);

    if (questions.length === 0) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: '"Open Sans", sans-serif', color: '#31326F' }}>Loading questions...</div>;

    const currentQuestion = questions[qIndex];

    
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
            {/* ─── Header ─── */}
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Plane Figures & Solid Shapes</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {questions.length}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                    </div>
                </div>
            </header>

            {/* ─── Main Content ─── */}
            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}>
                                    <LatexContent html={currentQuestion.text} />
                                </h2>
                            </div>

                            {currentQuestion.visual && (
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                    <ShapeVisual {...currentQuestion.visual} />
                                </div>
                            )}

                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                            onClick={() => !isSubmitted && setSelectedOption(option)}
                                            disabled={isSubmitted}
                                        >
                                            <LatexContent html={option} />
                                        </button>
                                    ))}
                                </div>
                                <AnimatePresence>
                                    {isSubmitted && isCorrect && (
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>
                                            <div className="flex items-center gap-3">
                                                <img src={mascotImg} alt="Mascot" className="w-12 h-12 object-contain" />
                                                <span>{feedbackMessage}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} />

            {/* ─── Footer ─── */}
            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={() => navigate(-1)}>Exit</button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}
                    </div>
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
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? "Next" : "Done"}</button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PlaneFiguresSolidShapes;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/middle/class-7/Class7PracticeLayout.css';

const CORRECT_MESSAGES = ["✨ Amazing!", "🌟 Brilliant!", "🎉 Correct!", "🚀 Super!", "💎 Excellent!"];

/* ─── SVG Visual: 3-D solid with highlighted property ─── */
const SolidVisual = ({ shape, highlight }) => {
    const s = "#31326F", f = "#4FB7B320", h = "#FF6B6B";

    const cubePaths = (
        <g>
            <rect x="15" y="35" width="45" height="45" stroke={s} strokeWidth="2" fill={highlight === 'face' ? h + '40' : f} />
            <polygon points="15,35 35,15 80,15 60,35" stroke={s} strokeWidth="2" fill={f} />
            <polygon points="60,35 80,15 80,60 60,80" stroke={s} strokeWidth="2" fill={f} />
            {highlight === 'edge' && <line x1="15" y1="35" x2="60" y2="35" stroke={h} strokeWidth="4" />}
            {highlight === 'vertex' && <><circle cx="15" cy="35" r="5" fill={h} /><circle cx="60" cy="35" r="5" fill={h} /><circle cx="15" cy="80" r="5" fill={h} /><circle cx="60" cy="80" r="5" fill={h} /><circle cx="35" cy="15" r="5" fill={h} /><circle cx="80" cy="15" r="5" fill={h} /><circle cx="80" cy="60" r="5" fill={h} /></>}
        </g>
    );

    const cuboidPaths = (
        <g>
            <rect x="10" y="35" width="55" height="40" stroke={s} strokeWidth="2" fill={highlight === 'face' ? h + '40' : f} />
            <polygon points="10,35 30,15 85,15 65,35" stroke={s} strokeWidth="2" fill={f} />
            <polygon points="65,35 85,15 85,55 65,75" stroke={s} strokeWidth="2" fill={f} />
            {highlight === 'edge' && <line x1="10" y1="35" x2="65" y2="35" stroke={h} strokeWidth="4" />}
            {highlight === 'vertex' && <><circle cx="10" cy="35" r="4" fill={h} /><circle cx="65" cy="35" r="4" fill={h} /><circle cx="10" cy="75" r="4" fill={h} /><circle cx="65" cy="75" r="4" fill={h} /><circle cx="30" cy="15" r="4" fill={h} /><circle cx="85" cy="15" r="4" fill={h} /><circle cx="85" cy="55" r="4" fill={h} /></>}
        </g>
    );

    const pyramidPaths = (
        <g>
            <polygon points="50,10 15,80 85,80" stroke={s} strokeWidth="2" fill={highlight === 'face' ? h + '40' : f} />
            <line x1="50" y1="10" x2="65" y2="55" stroke={s} strokeWidth="1" strokeDasharray="3" />
            <polygon points="15,80 85,80 65,55" stroke={s} strokeWidth="1" strokeDasharray="3" fill="none" />
            {highlight === 'edge' && <line x1="50" y1="10" x2="85" y2="80" stroke={h} strokeWidth="4" />}
            {highlight === 'vertex' && <><circle cx="50" cy="10" r="5" fill={h} /><circle cx="15" cy="80" r="5" fill={h} /><circle cx="85" cy="80" r="5" fill={h} /><circle cx="65" cy="55" r="5" fill={h} /></>}
        </g>
    );

    const cylinderPaths = (
        <g>
            <ellipse cx="50" cy="25" rx="30" ry="10" stroke={s} strokeWidth="2" fill={highlight === 'face' ? h + '40' : f} />
            <rect x="20" y="25" width="60" height="50" stroke="none" fill={f} />
            <line x1="20" y1="25" x2="20" y2="75" stroke={s} strokeWidth="2" />
            <line x1="80" y1="25" x2="80" y2="75" stroke={s} strokeWidth="2" />
            <ellipse cx="50" cy="75" rx="30" ry="10" stroke={s} strokeWidth="2" fill={f} />
            {highlight === 'edge' && <><ellipse cx="50" cy="25" rx="30" ry="10" stroke={h} strokeWidth="3" fill="none" /><ellipse cx="50" cy="75" rx="30" ry="10" stroke={h} strokeWidth="3" fill="none" /></>}
        </g>
    );

    const conePaths = (
        <g>
            <line x1="50" y1="15" x2="20" y2="80" stroke={s} strokeWidth="2" />
            <line x1="50" y1="15" x2="80" y2="80" stroke={s} strokeWidth="2" />
            <ellipse cx="50" cy="80" rx="30" ry="10" stroke={s} strokeWidth="2" fill={f} />
            {highlight === 'vertex' && <circle cx="50" cy="15" r="5" fill={h} />}
            {highlight === 'edge' && <line x1="50" y1="15" x2="80" y2="80" stroke={h} strokeWidth="4" />}
            {highlight === 'face' && <ellipse cx="50" cy="80" rx="30" ry="10" stroke={h} strokeWidth="3" fill={h + '40'} />}
        </g>
    );

    const spherePaths = (
        <g>
            <circle cx="50" cy="50" r="40" stroke={s} strokeWidth="2" fill={f} />
            <ellipse cx="50" cy="50" rx="40" ry="12" stroke={s} strokeWidth="1" strokeDasharray="4" fill="none" />
        </g>
    );

    const lookup = { Cube: cubePaths, Cuboid: cuboidPaths, 'Triangular Pyramid': pyramidPaths, Cylinder: cylinderPaths, Cone: conePaths, Sphere: spherePaths };

    return <svg width="160" height="120" viewBox="0 0 100 100">{lookup[shape] || null}</svg>;
};

/* ─── Main Component ─── */
const FacesEdgesVertices = () => {
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

    const SKILL_ID = 1079;
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4AnswersPayload = useRef([]);
    const v4IsFinishedRef = useRef(false);
    const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Faces, Edges & Vertices";

    // FEV data
    const solids = [
        { name: 'Cube', F: 6, E: 12, V: 8, faceShape: 'Square', desc: 'A cube has 6 square faces, 12 straight edges, and 8 vertices (corners). All faces are identical squares.' },
        { name: 'Cuboid', F: 6, E: 12, V: 8, faceShape: 'Rectangle', desc: 'A cuboid has 6 rectangular faces (opposite faces are equal), 12 edges, and 8 vertices. Unlike a cube, not all faces are squares.' },
        { name: 'Triangular Pyramid', F: 4, E: 6, V: 4, faceShape: 'Triangle', desc: 'A triangular pyramid (tetrahedron) has 4 triangular faces, 6 edges, and 4 vertices. The apex is the topmost vertex.' },
        { name: 'Cylinder', F: 2, E: 2, V: 0, faceShape: 'Circle', desc: 'A cylinder has 2 flat circular faces (top and bottom), 2 curved edges, and 0 vertices. It also has 1 curved surface.' },
        { name: 'Cone', F: 1, E: 1, V: 1, faceShape: 'Circle', desc: 'A cone has 1 flat circular face (base), 1 curved edge, and 1 vertex (the apex/tip). It also has 1 curved surface.' },
        { name: 'Sphere', F: 0, E: 0, V: 0, faceShape: 'None', desc: 'A sphere has no flat faces, no edges, and no vertices. It has only 1 curved surface. Every point on it is equidistant from the center.' }
    ];

    /* ─── Helper: pick N random items from an array ─── */
    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
        const pick = arr => arr[Math.floor(Math.random() * arr.length)];

        // ── Subtopic 1 POOL: Faces (pick 3) ──
        const facesPool = [
            () => { const s = pick(solids.slice(0, 3)); return { text: `<p>How many <b>faces</b> does a <b>${s.name}</b> have?</p>`, visual: { shape: s.name, highlight: 'face' }, correctAnswer: String(s.F), options: shuffle([String(s.F), String(s.F + 2), String(s.F - 1), "10"]), solution: `<p><b>${s.name}</b> has <b>${s.F} faces</b>.</p><p>${s.desc}</p>` }; },
            () => { const s = pick(solids.slice(0, 3)); return { text: `<p>What is the shape of the faces of a <b>${s.name}</b>?</p>`, visual: { shape: s.name, highlight: 'face' }, correctAnswer: s.faceShape, options: shuffle(["Square", "Rectangle", "Triangle", "Circle"]), solution: `<p>The faces of a <b>${s.name}</b> are <b>${s.faceShape}s</b>.</p><p>${s.desc}</p>` }; },
            () => ({ text: `<p>Which solid has <b>circular</b> faces?</p>`, correctAnswer: "Cylinder", options: shuffle(["Cylinder", "Cube", "Triangular Pyramid", "Cuboid"]), solution: `<p>A <b>Cylinder</b> has 2 circular flat faces (top and bottom).</p>` }),
            () => ({ text: `<p>Which solid has <b>triangular</b> faces?</p>`, correctAnswer: "Triangular Pyramid", options: shuffle(["Triangular Pyramid", "Cube", "Cylinder", "Cone"]), solution: `<p>A <b>Triangular Pyramid</b> has 4 triangular faces.</p>` }),
            () => ({ text: `<p>How many <b>flat faces</b> does a <b>Sphere</b> have?</p>`, correctAnswer: "0", options: shuffle(["0", "1", "2", "4"]), solution: `<p>A <b>Sphere</b> has <b>0 flat faces</b>. It only has 1 curved surface.</p>` }),
            () => ({ text: `<p>How many <b>flat faces</b> does a <b>Cone</b> have?</p>`, correctAnswer: "1", options: shuffle(["0", "1", "2", "3"]), solution: `<p>A <b>Cone</b> has <b>1 flat face</b> (the circular base) and 1 curved surface.</p>` }),
            () => ({ text: `<p>A face of a solid is always:</p>`, correctAnswer: "A flat surface", options: shuffle(["A flat surface", "A curved surface", "A point", "A line"]), solution: `<p>A <b>face</b> is a <b>flat surface</b> of a solid shape.</p>` }),
            () => ({ text: `<p>Which solid has the <b>most flat faces</b>?</p>`, correctAnswer: "Cube (6 faces)", options: shuffle(["Cube (6 faces)", "Cone (1 face)", "Sphere (0 faces)", "Triangular Pyramid (4 faces)"]), solution: `<p>A <b>Cube</b> has <b>6 flat faces</b>, the most among the listed options.</p>` }),
        ];

        // ── Subtopic 2 POOL: Edges (pick 2) ──
        const edgesPool = [
            () => { const s = pick(solids.slice(0, 3)); return { text: `<p>How many <b>edges</b> does a <b>${s.name}</b> have?</p>`, visual: { shape: s.name, highlight: 'edge' }, correctAnswer: String(s.E), options: shuffle([String(s.E), String(s.E + 2), String(s.E - 3), "10"]), solution: `<p>A <b>${s.name}</b> has <b>${s.E} edges</b>.</p><p>An <b>edge</b> is where two faces meet. ${s.desc}</p>` }; },
            () => ({ text: `<p>Which solid has <b>more edges</b> — a Cube or a Triangular Pyramid?</p>`, correctAnswer: "Cube (12 edges)", options: shuffle(["Cube (12 edges)", "Triangular Pyramid (6 edges)", "Both have the same", "Cannot be determined"]), solution: `<p>A <b>Cube</b> has <b>12 edges</b> vs a <b>Triangular Pyramid</b> with <b>6 edges</b>.</p>` }),
            () => ({ text: `<p>How many <b>edges</b> does a <b>Cone</b> have?</p>`, correctAnswer: "1", options: shuffle(["0", "1", "2", "6"]), solution: `<p>A <b>Cone</b> has <b>1 curved edge</b> where the curved surface meets the base.</p>` }),
            () => ({ text: `<p>How many <b>edges</b> does a <b>Sphere</b> have?</p>`, correctAnswer: "0", options: shuffle(["0", "1", "2", "4"]), solution: `<p>A <b>Sphere</b> has <b>0 edges</b>. No flat faces = no edge-lines.</p>` }),
            () => ({ text: `<p>An <b>edge</b> of a solid is:</p>`, correctAnswer: "Where two faces meet", options: shuffle(["Where two faces meet", "A flat surface", "A corner point", "The center of the solid"]), solution: `<p>An <b>edge</b> is the line segment where <b>two faces meet</b>.</p>` }),
            () => ({ text: `<p>How many <b>edges</b> does a <b>Cylinder</b> have?</p>`, correctAnswer: "2", options: shuffle(["0", "1", "2", "3"]), solution: `<p>A <b>Cylinder</b> has <b>2 curved edges</b> — one at the top and one at the bottom.</p>` }),
        ];

        // ── Subtopic 3 POOL: Vertices (pick 2) ──
        const verticesPool = [
            () => { const s = pick(solids.slice(0, 3)); return { text: `<p>How many <b>vertices</b> (corners) does a <b>${s.name}</b> have?</p>`, visual: { shape: s.name, highlight: 'vertex' }, correctAnswer: String(s.V), options: shuffle([String(s.V), String(s.V + 2), String(s.V - 2), "5"]), solution: `<p>A <b>${s.name}</b> has <b>${s.V} vertices</b>.</p><p>A <b>vertex</b> is a corner where edges meet. ${s.desc}</p>` }; },
            () => ({ text: `<p>Which solid has <b>NO vertices</b>?</p>`, visual: { shape: 'Sphere' }, correctAnswer: "Sphere", options: shuffle(["Sphere", "Cube", "Cone", "Cuboid"]), solution: `<p>A <b>Sphere</b> has <b>0 vertices</b>. No corners, no edges, no flat faces.</p>` }),
            () => ({ text: `<p>How many <b>vertices</b> does a <b>Cone</b> have?</p>`, correctAnswer: "1", options: shuffle(["0", "1", "2", "4"]), solution: `<p>A <b>Cone</b> has <b>1 vertex</b> — the apex at the top.</p>` }),
            () => ({ text: `<p>How many <b>vertices</b> does a <b>Cylinder</b> have?</p>`, correctAnswer: "0", options: shuffle(["0", "1", "2", "4"]), solution: `<p>A <b>Cylinder</b> has <b>0 vertices</b>. Its edges are curved.</p>` }),
            () => ({ text: `<p>A <b>vertex</b> of a solid is:</p>`, correctAnswer: "A corner where edges meet", options: shuffle(["A corner where edges meet", "A flat surface", "A curved line", "The center of a face"]), solution: `<p>A <b>vertex</b> is a <b>corner point</b> where two or more edges meet.</p>` }),
            () => ({ text: `<p>Which solid has <b>exactly 4 vertices</b>?</p>`, correctAnswer: "Triangular Pyramid", options: shuffle(["Triangular Pyramid", "Cube", "Cylinder", "Cone"]), solution: `<p>A <b>Triangular Pyramid</b> has exactly <b>4 vertices</b>.</p>` }),
        ];

        // ── Subtopic 4 POOL: Counting FEV Together (pick 3) ──
        const fevPool = [
            () => { const s = pick(solids.slice(0, 3)); return { text: `<p>For a <b>${s.name}</b>: F=${s.F}, E=${s.E}. How many Vertices?</p>`, visual: { shape: s.name, highlight: 'vertex' }, correctAnswer: String(s.V), options: shuffle([String(s.V), String(s.V + 2), String(s.V - 2), "10"]), solution: `<p>A <b>${s.name}</b> has <b>${s.V} vertices</b>.</p><p>Euler's formula: F + V - E = 2 → ${s.F} + ${s.V} - ${s.E} = 2 ✓</p>` }; },
            () => ({ text: `<p>Which solid has <b>F=4, E=6, V=4</b>?</p>`, correctAnswer: "Triangular Pyramid", options: shuffle(["Triangular Pyramid", "Cube", "Cuboid", "Cone"]), solution: `<p>A <b>Triangular Pyramid</b> has F=4, E=6, V=4. Euler: 4 + 4 - 6 = 2 ✓</p>` }),
            () => ({ text: `<p>Which F-E-V combination is <b>INCORRECT</b>?</p>`, correctAnswer: "Cube: F=6, E=10, V=8", options: ["Cube: F=6, E=10, V=8", "Cuboid: F=6, E=12, V=8", "Cone: F=1, E=1, V=1", "Pyramid: F=4, E=6, V=4"], solution: `<p><b>Cube: F=6, E=10, V=8</b> is wrong. A cube has <b>12 edges</b>, not 10.</p>` }),
            () => ({ text: `<p>Euler's formula for any polyhedron states:</p>`, correctAnswer: "F + V - E = 2", options: shuffle(["F + V - E = 2", "F + E - V = 2", "F × V × E = 2", "F - V + E = 2"]), solution: `<p><b>Euler's formula</b>: F + V - E = 2. Example: Cube → 6 + 8 - 12 = 2 ✓</p>` }),
            () => { const s = pick(solids.slice(0, 3)); return { text: `<p>For a <b>${s.name}</b>: V=${s.V}, E=${s.E}. How many Faces?</p>`, correctAnswer: String(s.F), options: shuffle([String(s.F), String(s.F + 1), String(s.F - 1), "10"]), solution: `<p>Euler's formula: F = 2 - V + E = 2 - ${s.V} + ${s.E} = ${s.F}</p>` }; },
            () => ({ text: `<p>Which solid has <b>F=6, E=12, V=8</b>?</p>`, correctAnswer: "Cube", options: shuffle(["Cube", "Triangular Pyramid", "Cone", "Cylinder"]), solution: `<p>A <b>Cube</b> has F=6, E=12, V=8. Euler: 6 + 8 - 12 = 2 ✓</p>` }),
            () => ({ text: `<p>If a solid has F=5, V=5, how many edges?</p>`, correctAnswer: "8", options: shuffle(["6", "7", "8", "10"]), solution: `<p>E = F + V - 2 = 5 + 5 - 2 = <b>8 edges</b>. This is a Square Pyramid.</p>` }),
        ];

        // Pick: 3 + 2 + 2 + 3 = 10
        const selected = [
            ...pickRandom(facesPool, 3).map(fn => fn()),
            ...pickRandom(edgesPool, 2).map(fn => fn()),
            ...pickRandom(verticesPool, 2).map(fn => fn()),
            ...pickRandom(fevPool, 3).map(fn => fn()),
        ];

        setQuestions(selected);
    }, []);


    /* ─── Session & Timer ─── */
    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) api.createPracticeSession(userId, SKILL_ID).then(s => s && setSessionId(s.session_id)).catch(console.error);
        startSession({ nodeId: 'a4071015-0002-0000-0000-000000000000', sessionType: 'practice' });
        v4AnswersPayload.current = [];
        v4IsFinishedRef.current = false;
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const hv = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener("visibilitychange", hv);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", hv); };
    }, [sessionId]);

    const recordAttempt = async (q, sel, cor) => {
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!uid) return;
        let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current;
        try { await api.recordAttempt({ user_id: parseInt(uid), session_id: sessionId, skill_id: SKILL_ID, difficulty_level: 'Medium', question_text: String(q.text), correct_answer: String(q.correctAnswer), student_answer: String(sel), is_correct: cor, solution_text: String(q.solution), time_spent_seconds: Math.max(0, Math.round(t / 1000)) });
        const _v4t = Date.now() - questionStartTime.current;
        v4AnswersPayload.current.push({
            question_index: typeof qIndex !== 'undefined' ? qIndex : 0,
            answer_json: JSON.stringify({ selected: selectedOption }),
            is_correct: isRight !== undefined ? isRight : (typeof isCorrect !== 'undefined' ? isCorrect : false),
            marks_awarded: (isRight !== undefined ? isRight : false) ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: _v4t > 0 ? _v4t : 0,
        }); } catch (e) { console.error(e); }
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
            if (!v4IsFinishedRef.current) {
                v4IsFinishedRef.current = true;
                finishSession({ answers_payload: v4AnswersPayload.current });
            }
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Faces, Edges & Vertices</span></div>
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
                        <div className="c7-question-card" style={{ paddingLeft: '2rem' }}>
                            <div className="c7-question-header">
                                <h2 className="c7-question-text" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}><LatexContent html={cq.text} /></h2>
                            </div>
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><SolidVisual {...cq.visual} /></div>}
                            <div className="c7-interaction-area">
                                <div className="c7-options-grid">
                                    {cq.options.map((opt, i) => (
                                        <button key={i} className={`c7-option-btn ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === cq.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}><LatexContent html={opt} /></button>
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

export default FacesEdgesVertices;

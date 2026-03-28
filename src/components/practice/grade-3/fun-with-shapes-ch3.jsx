import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer, Star, ChevronLeft, RefreshCw, FileText, Eye, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../services/api';
import Navbar from '../../Navbar';
import { TOPIC_CONFIGS } from '../../../lib/topicConfig';
import { LatexText } from '../../LatexText';
import ExplanationModal from '../../ExplanationModal';
import StickerExit from '../../StickerExit';
import avatarImg from '../../../assets/avatar.png';
import './Grade3Practice.css';

/* ── Shape SVG renderings ──────────────────────────────── */
const SHAPE_SVGS = {
    circle:    <circle cx="50" cy="50" r="40" fill="#FF6B6B" stroke="#fff" strokeWidth="2" />,
    square:    <rect x="10" y="10" width="80" height="80" fill="#4ECDC4" stroke="#fff" strokeWidth="2" />,
    rectangle: <rect x="5" y="20" width="90" height="60" fill="#A78BFA" stroke="#fff" strokeWidth="2" />,
    triangle:  <polygon points="50,8 90,88 10,88" fill="#FFD200" stroke="#fff" strokeWidth="2" />,
    pentagon:  <polygon points="50,8 92,36 76,85 24,85 8,36" fill="#F97316" stroke="#fff" strokeWidth="2" />,
    hexagon:   <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" fill="#11998E" stroke="#fff" strokeWidth="2" />,
    oval:      <ellipse cx="50" cy="50" rx="45" ry="30" fill="#FC5C7D" stroke="#fff" strokeWidth="2" />,
    diamond:   <polygon points="50,5 95,50 50,95 5,50" fill="#667EEA" stroke="#fff" strokeWidth="2" />,
};

const ShapeDisplay = ({ shape, size = 90 }) => (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <svg width={size} height={size} viewBox="0 0 100 100">{SHAPE_SVGS[shape]}</svg>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B', textTransform: 'capitalize' }}></div>
    </motion.div>
);

const PatternRow = ({ shapes, blankIdx }) => (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        {shapes.map((sh, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 60, height: 60, borderRadius: 12, background: i === blankIdx ? 'rgba(124,106,247,0.1)' : 'rgba(255,255,255,0.8)', border: i === blankIdx ? '3px dashed #7C6AF7' : '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    {i === blankIdx
                        ? <span style={{ fontSize: '1.6rem', color: '#7C6AF7' }}>?</span>
                        : <svg width={42} height={42} viewBox="0 0 100 100">{SHAPE_SVGS[sh]}</svg>}
                </div>
                {i < shapes.length - 1 && <span style={{ fontSize: '1.2rem', color: '#CBD5E0' }}>→</span>}
            </div>
        ))}
    </motion.div>
);

const TextBox = ({ text }) => (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'rgba(124,106,247,0.08)', border: '2px dashed #A78BFA', borderRadius: 18, padding: '16px 24px', fontSize: '1.3rem', fontWeight: 700, color: '#31326F', textAlign: 'center', fontFamily: 'Nunito, sans-serif' }}>
        {text}
    </motion.div>
);

const DynamicVisual = ({ type, data }) => {
    if (type === 'shape') return <ShapeDisplay shape={data.shape} />;
    if (type === 'pattern') return <PatternRow shapes={data.shapes} blankIdx={data.blankIdx} />;
    if (type === 'textbox') return <TextBox text={data.text} />;
    return null;
};

/* ── Shape data ─────────────────────────────────────────── */
const SHAPES_DATA = {
    circle:    { sides: 0, corners: 0, name: 'circle' },
    square:    { sides: 4, corners: 4, name: 'square' },
    rectangle: { sides: 4, corners: 4, name: 'rectangle' },
    triangle:  { sides: 3, corners: 3, name: 'triangle' },
    pentagon:  { sides: 5, corners: 5, name: 'pentagon' },
    hexagon:   { sides: 6, corners: 6, name: 'hexagon' },
    oval:      { sides: 0, corners: 0, name: 'oval' },
    diamond:   { sides: 4, corners: 4, name: 'diamond (rhombus)' },
};

const SHAPE_KEYS = Object.keys(SHAPES_DATA);
const REAL_WORLD = [
    { obj: 'a ball', shape: 'circle', desc: 'round, no corners' },
    { obj: 'a book cover', shape: 'rectangle', desc: '4 sides, 4 corners, longer than wide' },
    { obj: 'a floor tile', shape: 'square', desc: '4 equal sides, 4 corners' },
    { obj: 'a traffic sign', shape: 'triangle', desc: '3 sides, 3 corners' },
    { obj: 'a coin', shape: 'circle', desc: 'perfectly round' },
    { obj: 'a door', shape: 'rectangle', desc: '4 sides, opposite sides equal' },
    { obj: 'a pizza slice', shape: 'triangle', desc: '3 sides, 3 corners' },
];

/* ── Helpers ───────────────────────────────────────────── */
const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const u4str = (correct, wrongs) => {
    const s = new Set([correct]);
    const d = wrongs.filter(v => !s.has(v) && (s.add(v), true));
    while (d.length < 3) { d.push(`option${d.length}`); }
    return shuffle([correct, ...d.slice(0,3)]);
};

const ALL_SKILLS = ['FWS-01','FWS-02','FWS-03','FWS-04','FWS-05','FWS-06','FWS-07','FWS-08'];

/* ── Single question generator ─────────────────────────── */
function makeSingleQuestion(sk) {
    if (sk === 'FWS-01') {
        // Shape identification
        const sk_key = SHAPE_KEYS[r(0, SHAPE_KEYS.length-1)];
        const correct = SHAPES_DATA[sk_key].name;
        const wrongs = SHAPE_KEYS.filter(k=>k!==sk_key).slice(0,3).map(k=>SHAPES_DATA[k].name);
        const opts = u4str(correct, wrongs);
        return { text: 'What shape is this?', options: opts, correct, type: 'shape', visualData: { shape: sk_key }, explanation: `This is a ${correct}.`, solution: `Shape = ${correct}` };
    }

    if (sk === 'FWS-02') {
        // Count sides
        const sk_key = SHAPE_KEYS[r(0, SHAPE_KEYS.length-1)];
        const sides = SHAPES_DATA[sk_key].sides;
        const opts = shuffle([...new Set([String(sides), String(sides+1), String(sides === 0 ? 1 : sides-1), String(sides+2)])].slice(0,4));
        return { text: `How many SIDES does a ${SHAPES_DATA[sk_key].name} have?`, options: opts, correct: String(sides), type: 'shape', visualData: { shape: sk_key }, explanation: `A ${SHAPES_DATA[sk_key].name} has ${sides} sides.`, solution: `${SHAPES_DATA[sk_key].name} → ${sides} sides` };
    }

    if (sk === 'FWS-03') {
        // Count corners
        const sk_key = ['square','rectangle','triangle','pentagon','hexagon','diamond'][r(0,5)];
        const corners = SHAPES_DATA[sk_key].corners;
        const opts = shuffle([...new Set([String(corners), String(corners+1), String(corners === 0 ? 1 : corners-1), String(corners+2)])].slice(0,4));
        return { text: `How many CORNERS (vertices) does a ${SHAPES_DATA[sk_key].name} have?`, options: opts, correct: String(corners), type: 'shape', visualData: { shape: sk_key }, explanation: `A ${SHAPES_DATA[sk_key].name} has ${corners} corners.`, solution: `${SHAPES_DATA[sk_key].name} → ${corners} corners` };
    }

    if (sk === 'FWS-04') {
        // Real-world shape matching
        const rw = REAL_WORLD[r(0, REAL_WORLD.length-1)];
        const correct = rw.shape;
        const wrongs = SHAPE_KEYS.filter(k=>k!==correct).slice(0,3);
        const opts = u4str(correct, wrongs);
        return { text: `${rw.obj} is shaped like a ___`, options: opts, correct, type: 'textbox', visualData: { text: `🤔 ${rw.obj}` }, explanation: `${rw.obj} is a ${correct} — ${rw.desc}`, solution: `Answer: ${correct}` };
    }

    if (sk === 'FWS-05') {
        // Pattern completion
        const patternShapes = ['circle','square','triangle','rectangle','pentagon'];
        const pat = [patternShapes[r(0,4)], patternShapes[r(0,4)]];
        if (pat[0] === pat[1]) pat[1] = patternShapes[(patternShapes.indexOf(pat[0])+1)%patternShapes.length];
        const full = [pat[0], pat[1], pat[0], pat[1], pat[0]];
        const blankIdx = r(2, 4);
        const correct = full[blankIdx];
        const wrong1 = pat[blankIdx % 2 === 0 ? 1 : 0];
        const wrong2 = patternShapes.find(s=>s!==pat[0]&&s!==pat[1]);
        const opts = u4str(correct, [wrong1, wrong2, 'oval']);
        const display = full.map((s,i) => i===blankIdx ? 'circle' : s); // circle is placeholder for blank visual
        return { text: 'What comes next in the pattern?', options: opts, correct, type: 'pattern', visualData: { shapes: display, blankIdx }, explanation: `Pattern: ${pat[0]}, ${pat[1]}, repeat. Missing = ${correct}`, solution: `Pattern repeats: ${pat[0]}, ${pat[1]}, ${pat[0]}, ${pat[1]}...` };
    }

    if (sk === 'FWS-06') {
        // Symmetry
        const symShapes = [
            { shape: 'circle', sym: 'Yes', reason: 'A circle has many lines of symmetry.' },
            { shape: 'square', sym: 'Yes', reason: 'A square has 4 lines of symmetry.' },
            { shape: 'rectangle', sym: 'Yes', reason: 'A rectangle has 2 lines of symmetry.' },
            { shape: 'triangle', sym: 'Yes', reason: 'An equilateral triangle has 3 lines of symmetry.' },
        ];
        const item = symShapes[r(0, symShapes.length-1)];
        const opts = shuffle(['Yes', 'No', 'Only diagonals', 'Cannot say'].filter((v,i,a)=>a.indexOf(v)===i));
        return { text: `Does a ${item.shape} have a line of symmetry?`, options: opts, correct: item.sym, type: 'shape', visualData: { shape: item.shape }, explanation: item.reason, solution: `Answer: ${item.sym}` };
    }

    if (sk === 'FWS-07') {
        // Which shapes can tile (tessellate)?
        const tileable = [
            { shape: 'square', can: 'Yes', reason: 'Squares tile perfectly — no gaps!' },
            { shape: 'triangle', can: 'Yes', reason: 'Equilateral triangles tile perfectly.' },
            { shape: 'rectangle', can: 'Yes', reason: 'Rectangles tile perfectly — like floor tiles.' },
            { shape: 'hexagon', can: 'Yes', reason: 'Regular hexagons tile perfectly — like honeycomb.' },
            { shape: 'circle', can: 'No', reason: 'Circles leave gaps when tiled.' },
        ];
        const item = tileable[r(0, tileable.length-1)];
        const opts = shuffle(['Yes', 'No', 'Only sometimes', 'With gaps']);
        return { text: `Can a ${item.shape} tile a flat surface WITHOUT gaps?`, options: opts, correct: item.can, type: 'shape', visualData: { shape: item.shape }, explanation: item.reason, solution: `Answer: ${item.can}` };
    }

    if (sk === 'FWS-08') {
        // 3D shapes
        const shapes3D = [
            { obj: 'a ball', shape: 'sphere', wrong: ['cube','cone','cylinder'] },
            { obj: 'a box', shape: 'cube', wrong: ['sphere','cone','pyramid'] },
            { obj: 'an ice cream cone', shape: 'cone', wrong: ['sphere','cylinder','cube'] },
            { obj: 'a tin can', shape: 'cylinder', wrong: ['sphere','cube','cone'] },
            { obj: 'a die', shape: 'cube', wrong: ['sphere','cone','pyramid'] },
            { obj: 'a birthday cap', shape: 'cone', wrong: ['cylinder','cube','sphere'] },
        ];
        const item = shapes3D[r(0, shapes3D.length-1)];
        const opts = u4str(item.shape, item.wrong);
        return { text: `${item.obj} is shaped like a ___`, options: opts, correct: item.shape, type: 'textbox', visualData: { text: `🎯 ${item.obj}` }, explanation: `${item.obj} → ${item.shape}`, solution: `Answer: ${item.shape}` };
    }

    return null;
}

/* ── Main component ────────────────────────────────────── */
const FunWithShapesCh3 = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const skillId = new URLSearchParams(location.search).get('skillId');
    const isTest = skillId === 'FWS-TEST';
    const totalQuestions = isTest ? 10 : 5;

    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timer, setTimer] = useState(0);
    const [answers, setAnswers] = useState({});
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const getTopicInfo = () => {
        for (const gk of Object.keys(TOPIC_CONFIGS)) {
            for (const [topicName, skills] of Object.entries(TOPIC_CONFIGS[gk])) {
                const sk = skills.find(s => s.id === skillId);
                if (sk) return { topicName, skillName: sk.name, grade: gk };
            }
        }
        return { topicName: 'Fun with Shapes', skillName: 'Shapes & Geometry', grade: '3' };
    };

    const getNextSkill = () => {
        const { grade } = getTopicInfo();
        const gc = TOPIC_CONFIGS[grade];
        const topics = Object.keys(gc);
        for (let i = 0; i < topics.length; i++) {
            const skills = gc[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) {
                if (idx < skills.length - 1) return { ...skills[idx+1], topicName: topics[i] };
                if (i < topics.length - 1) { const ns = gc[topics[i+1]]; return ns.length > 0 ? { ...ns[0], topicName: topics[i+1] } : null; }
            }
        }
        return null;
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (sel) => {
        const skillCycle = isTest
            ? Array.from({ length: 10 }, (_, i) => ALL_SKILLS[i % ALL_SKILLS.length])
            : Array(5).fill(sel);
        const questions = [];
        const usedTexts = new Set();
        let attempts = 0;
        while (questions.length < totalQuestions && attempts < 300) {
            attempts++;
            const sk = skillCycle[questions.length] || sel;
            const q = makeSingleQuestion(sk);
            if (!q) continue;
            const key = q.text.slice(0, 60) + q.correct;
            if (usedTexts.has(key)) continue;
            const uOpts = [...new Set(q.options.map(String))];
            if (uOpts.length < 4) continue;
            usedTexts.add(key);
            questions.push({ ...q, options: uOpts });
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const userId = user?.user_id || user?.id;
            if (!userId) return;
            setSessionQuestions(generateQuestions(skillId));
            try { const s = await api.createPracticeSession(userId, 0); setSessionId(s?.session_id); } catch (e) { console.error(e); }
        };
        init();
    }, [user, skillId]);

    useEffect(() => {
        let iv; if (!showResults && sessionQuestions.length > 0) iv = setInterval(() => setTimer(v => v+1), 1000);
        return () => clearInterval(iv);
    }, [showResults, sessionQuestions]);

    useEffect(() => { setShowExplanationModal(false); }, [qIndex]);
    useEffect(() => {
        if (answers[qIndex]) { setSelectedOption(answers[qIndex].selectedOption); setIsAnswered(true); }
        else { setSelectedOption(null); setIsAnswered(false); }
    }, [qIndex, answers]);

    const handleExit = async () => { try { if (sessionId) await api.finishSession(sessionId); } catch (e) {} navigate('/junior/grade/3'); };
    const handleOptionSelect = (opt) => { if (!isAnswered) setSelectedOption(opt); };
    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        setIsAnswered(true);
        const isCorrect = String(selectedOption) === String(sessionQuestions[qIndex].correct);
        if (isCorrect) setScore(s => s+1);
        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect, questionText: sessionQuestions[qIndex].text, correctAnswer: sessionQuestions[qIndex].correct, explanation: sessionQuestions[qIndex].explanation || '' } }));
        if (!isTest) setShowExplanationModal(true);
        else setTimeout(() => handleNext(), 800);
    };
    const handleSkip = () => {
        if (isAnswered) return;
        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption: 'Skipped', isCorrect: false, questionText: sessionQuestions[qIndex].text, correctAnswer: sessionQuestions[qIndex].correct, explanation: sessionQuestions[qIndex].explanation } }));
        handleNext();
    };
    const handleNext = async () => {
        if (qIndex < totalQuestions - 1) { setQIndex(v => v+1); }
        else {
            setShowResults(true);
            try {
                if (sessionId) { await api.finishSession(sessionId); await api.createReport({ uid: user?.id || 'unknown', category: 'Practice', reportData: { skill_id: skillId, skill_name: skillName, score: Math.round((score/totalQuestions)*100), total_questions: totalQuestions, correct_answers: score, time_spent: timer, timestamp: new Date().toISOString() } }); }
            } catch (e) { console.error(e); }
        }
    };
    const fmt = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

    if (sessionQuestions.length === 0) return <div className="grade3-practice-page"><div className="g3-loading-blob" /></div>;

    if (showResults) {
        const pct = Math.round((score/totalQuestions)*100);
        return (
            <div className="grade3-practice-page results-view overflow-y-auto">
                <Navbar />
                <header className="results-header"><h1 className="results-title">Adventure Report</h1><div className="exit-container"><StickerExit onClick={handleExit} /></div></header>
                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: 120, height: 120, margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Adventure Complete! 🎉</h2>
                        <div className="stars-container">{[1,2,3].map(i => (<motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i*0.2 }} className="star-wrapper"><Star size={60} fill={pct >= i*33 ? '#FFD700' : '#EDF2F7'} color={pct >= i*33 ? '#F6AD55' : '#CBD5E0'} /></motion.div>))}</div>
                        <div className="results-stats-grid">
                            <div className="stat-card"><span className="stat-label">Correct</span><span className="stat-value-large">{score}/{totalQuestions}</span></div>
                            <div className="stat-card"><span className="stat-label">Time</span><span className="stat-value-large">{fmt(timer)}</span></div>
                            <div className="stat-card"><span className="stat-label">Accuracy</span><span className="stat-value-large">{pct}%</span></div>
                            <div className="stat-card"><span className="stat-label">Score</span><span className="stat-value-large">{score*10}</span></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
                        {Object.values(answers).map((ans, idx) => (<motion.div key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx*0.1 }} style={{ width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', background: ans.isCorrect ? '#C6F6D5' : '#FED7D7' }}>{ans.isCorrect ? '✅' : '❌'}</motion.div>))}
                    </div>
                    <p style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 400, color: '#4A5568' }}>{pct >= 80 ? '🌟 Amazing work! Keep it up!' : pct >= 60 ? '💪 Good effort! Keep practicing!' : '🌱 Nice try! Practice makes perfect!'}</p>
                    <div className="results-actions">
                        <button className="action-btn-large retake-skill-btn" onClick={() => window.location.reload()}><RefreshCw size={24} /> Retake Skill</button>
                        {getNextSkill() && (<button className="action-btn-large next-skill-btn" onClick={() => { const n = getNextSkill(); navigate(`/junior/grade/3/${n.route}?skillId=${n.id}`); window.location.reload(); }}>Next Skill <ArrowRight size={24} /></button>)}
                        <button className="action-btn-large back-topics-btn" onClick={() => navigate('/junior/grade/3')}><FileText size={24} /> Back to Topics</button>
                    </div>
                </main>
            </div>
        );
    }

    const currentQ = sessionQuestions[qIndex];
    return (
        <div className="grade3-practice-page">
            <div className="g3-bg-blobs"><div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" /></div>
            <div className="g3-practice-container">
                <div className="g3-header-nav">
                    <div className="g3-timer-badge"><Timer size={18} />{fmt(timer)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15, flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: 15, boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>Q {qIndex+1}/{totalQuestions}</span>
                        <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem' }}><LatexText text={skillName} /></span>
                    </div>
                    {isTest && <button className="g3-skip-btn" onClick={handleSkip} disabled={isAnswered}>Skip Quest ⏭️</button>}
                    <div style={{ marginLeft: 'auto' }}><StickerExit onClick={handleExit} /></div>
                </div>
                <div className="g3-progress-container" style={{ margin: '0 0 10px 0' }}><div className="g3-progress-fill" style={{ width: `${((qIndex+1)/totalQuestions)*100}%` }} /></div>
                <div style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g3-question-card">
                    <h2 className="g3-question-text"><LatexText text={currentQ.text} /></h2>
                    <div className="g3-content-split">
                        <div className="g3-visual-area"><DynamicVisual type={currentQ.type} data={currentQ.visualData} /></div>
                        <div className="g3-quiz-side">
                            <div className="g3-options-grid">
                                {currentQ.options.map((opt, i) => (
                                    <button key={i}
                                        className={`g3-option-btn ${selectedOption === opt ? (isTest ? 'selected-test' : (isAnswered ? (String(opt) === String(currentQ.correct) ? 'selected-correct' : 'selected-wrong') : 'selected-test')) : ''} ${!isTest && isAnswered && String(opt) === String(currentQ.correct) ? 'revealed-correct' : ''}`}
                                        onClick={() => handleOptionSelect(opt)} disabled={isAnswered}>
                                        <LatexText text={String(opt)} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="g3-navigation-footer">
                        <button className="g3-nav-btn prev-btn" onClick={() => { if (qIndex > 0) setQIndex(qIndex-1); }} disabled={qIndex === 0}><ChevronLeft size={24} /> Prev</button>
                        <div>
                            {isAnswered && !isTest && !answers[qIndex]?.isCorrect && <button className="g3-nav-btn steps-btn" onClick={() => setShowExplanationModal(true)}><Eye size={24} /> Steps</button>}
                            {!isAnswered
                                ? <button className="g3-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>Check Answer <ChevronRight size={24} /></button>
                                : <button className="g3-nav-btn next-btn" onClick={handleNext}>{qIndex === totalQuestions-1 ? (isTest ? 'Finish Test' : 'Finish') : 'Next Question'} <ChevronRight size={24} /></button>}
                        </div>
                    </div>
                </motion.div>
            </div>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={answers[qIndex]?.isCorrect} correctAnswer={currentQ.correct} explanation={currentQ.explanation} solution={currentQ.solution} onClose={() => setShowExplanationModal(false)} onNext={() => { setShowExplanationModal(false); handleNext(); }} />
        </div>
    );
};

export default FunWithShapesCh3;

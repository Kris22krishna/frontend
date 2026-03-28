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

/* ── Visual components ─────────────────────────────────── */
const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#F97316'];

const TwoGroups = ({ n1, n2, color1, color2, op = '+' }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ display: 'flex', alignItems: 'center', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ background: 'rgba(255,255,255,0.6)', padding: 14, borderRadius: 18, border: `2px solid ${color1}` }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 130 }}>
                {Array.from({ length: n1 }).map((_, i) => (
                    <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: color1 }} />
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 6, fontWeight: 700, color: color1 }}>{n1}</div>
        </div>
        <div style={{ fontSize: '2.2rem', color: '#94A3B8', fontWeight: 700 }}>{op}</div>
        <div style={{ background: 'rgba(255,255,255,0.6)', padding: 14, borderRadius: 18, border: `2px solid ${color2}` }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 130 }}>
                {Array.from({ length: n2 }).map((_, i) => (
                    <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: color2 }} />
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 6, fontWeight: 700, color: color2 }}>{n2}</div>
        </div>
    </motion.div>
);

const SubtractionGroup = ({ total, removed, color }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 200, margin: '0 auto', background: 'rgba(255,255,255,0.6)', padding: 14, borderRadius: 18, border: `2px solid ${color}` }}>
        {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: i < removed ? 'rgba(229,62,62,0.15)' : color, border: i < removed ? '2px solid #e53e3e' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i < removed && <span style={{ color: '#e53e3e', fontWeight: 700, fontSize: 13 }}>✕</span>}
            </div>
        ))}
    </motion.div>
);

const NumberLineJump = ({ start, step, jumps }) => {
    const end = start + step * jumps;
    const total = end - start;
    const width = 320;
    const scale = width / total;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ overflowX: 'auto', paddingBottom: 8 }}>
            <svg width={width + 40} height={90} style={{ display: 'block', margin: '0 auto' }}>
                {/* baseline */}
                <line x1={20} y1={60} x2={width + 20} y2={60} stroke="#CBD5E0" strokeWidth={3} />
                {/* jumps */}
                {Array.from({ length: jumps }).map((_, j) => {
                    const x1 = 20 + j * step * scale;
                    const x2 = 20 + (j + 1) * step * scale;
                    const mx = (x1 + x2) / 2;
                    return (
                        <g key={j}>
                            <path d={`M${x1},60 Q${mx},18 ${x2},60`} fill="none" stroke={COLORS[j % COLORS.length]} strokeWidth={2.5} />
                            <text x={mx} y={14} textAnchor="middle" fontSize={11} fill={COLORS[j % COLORS.length]} fontWeight={700}>+{step}</text>
                        </g>
                    );
                })}
                {/* tick marks + labels */}
                {Array.from({ length: jumps + 1 }).map((_, j) => {
                    const x = 20 + j * step * scale;
                    const val = start + j * step;
                    return (
                        <g key={j}>
                            <line x1={x} y1={55} x2={x} y2={65} stroke="#64748B" strokeWidth={2} />
                            <text x={x} y={80} textAnchor="middle" fontSize={13} fill="#31326F" fontWeight={700}>{val}</text>
                        </g>
                    );
                })}
            </svg>
        </motion.div>
    );
};

const ColumnMath = ({ n1, n2, op }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ fontFamily: 'Nunito, monospace', fontSize: '2.2rem', fontWeight: 700, background: 'white', borderRadius: 20, padding: '18px 28px', display: 'inline-block', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', color: '#31326F', textAlign: 'right' }}>
        <div style={{ paddingRight: 8 }}>{n1}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #31326F', paddingBottom: 5, gap: 16 }}>
            <span style={{ color: op === '+' ? '#4ECDC4' : '#FF6B6B' }}>{op}</span><span>{n2}</span>
        </div>
        <div style={{ paddingTop: 5, color: '#7C6AF7' }}>?</div>
    </motion.div>
);

const TextBox = ({ text }) => (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'rgba(124,106,247,0.08)', border: '2px dashed #A78BFA', borderRadius: 18, padding: '16px 24px', fontSize: '1.5rem', fontWeight: 700, color: '#31326F', textAlign: 'center', fontFamily: 'Nunito, sans-serif' }}>
        {text}
    </motion.div>
);

const DynamicVisual = ({ type, data }) => {
    if (type === 'two-groups') return <TwoGroups {...data} />;
    if (type === 'subtraction') return <SubtractionGroup {...data} />;
    if (type === 'numberline') return <NumberLineJump {...data} />;
    if (type === 'column') return <ColumnMath {...data} />;
    if (type === 'textbox') return <TextBox text={data.text} />;
    return null;
};

/* ── Helpers ───────────────────────────────────────────── */
const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const u4 = (correct, distractors) => {
    const s = new Set([String(correct)]);
    const d = distractors.map(String).filter(v => !s.has(v) && (s.add(v), true));
    while (d.length < 3) { const n = Number(correct) + d.length * 4 + 3; const ns = String(n); if (!s.has(ns)) { d.push(ns); s.add(ns); } }
    return shuffle([String(correct), ...d.slice(0, 3)]);
};

const ALL_SKILLS = ['TJY-01','TJY-02','TJY-03','TJY-04','TJY-05','TJY-06','TJY-07','TJY-08'];

/* ── Single question generator ─────────────────────────── */
function makeSingleQuestion(sk) {
    if (sk === 'TJY-01') {
        // Groups of toys → addition by counting groups
        const g1 = r(3, 9), g2 = r(3, 9), total = g1 + g2;
        const variants = [
            { text: `There are two groups of toys. How many toys in total?`, visual: { type: 'two-groups', data: { n1: g1, n2: g2, color1: COLORS[0], color2: COLORS[1] } }, correct: total, explanation: `${g1} + ${g2} = ${total} toys`, solution: `Count both groups: ${g1} + ${g2} = ${total}` },
            { text: `Count all the marbles in both groups. What is the total?`, visual: { type: 'two-groups', data: { n1: g1, n2: g2, color1: COLORS[2], color2: COLORS[3] } }, correct: total, explanation: `${g1} + ${g2} = ${total}`, solution: `Add the groups: ${g1} + ${g2} = ${total}` },
        ];
        const v = variants[r(0, variants.length-1)];
        return { text: v.text, options: u4(total, [total+2, total-2, total+5]), correct: String(total), type: v.visual.type, visualData: v.visual.data, explanation: v.explanation, solution: v.solution };
    }

    if (sk === 'TJY-02') {
        // Simple addition up to 99, column format
        const a = r(10, 49), b = r(10, 40), sum = a + b;
        const variants = [
            { text: `Add these two numbers. What is the sum?`, op: '+' },
            { text: `What is ${a} plus ${b}?`, op: '+' },
            { text: `Raju has ${a} stickers and Priya has ${b}. How many in all?`, op: '+' },
        ];
        const v = variants[r(0, variants.length-1)];
        return { text: v.text, options: u4(sum, [sum+1, sum-1, sum+10]), correct: String(sum), type: 'column', visualData: { n1: a, n2: b, op: '+' }, explanation: `${a} + ${b} = ${sum}`, solution: `Ones: ${a%10}+${b%10}=${(a+b)%10 < 10 ? (a%10)+(b%10) : (a%10)+(b%10)}, Tens: ${Math.floor(a/10)}+${Math.floor(b/10)}` };
    }

    if (sk === 'TJY-03') {
        // Subtraction with visual removal
        const total = r(8, 20), removed = r(2, Math.min(total-2, 8)), rem = total - removed;
        const variants = [
            { text: `${total} toys, ${removed} are taken away. How many are left?` },
            { text: `There are ${total} balloons. ${removed} burst. How many remain?` },
            { text: `Mina had ${total} sweets. She ate ${removed}. How many are left?` },
        ];
        return { text: variants[r(0,2)].text, options: u4(rem, [rem+2, rem-2, rem+3]), correct: String(rem), type: 'subtraction', visualData: { total, removed, color: COLORS[r(0,4)] }, explanation: `${total} - ${removed} = ${rem}`, solution: `Cross out ${removed}, count remaining = ${rem}` };
    }

    if (sk === 'TJY-04') {
        // Number line jumps (addition on number line)
        const start = r(1, 15), step = r(2, 6), jumps = r(2, 4);
        const end = start + step * jumps;
        const variants = [
            { text: `Start at ${start}, take ${jumps} jumps of ${step} each. Where do you land?` },
            { text: `The frog starts at ${start} and jumps ${step} each time for ${jumps} jumps. Where does it reach?` },
        ];
        return { text: variants[r(0,1)].text, options: u4(end, [end+step, end-step, end+2*step]), correct: String(end), type: 'numberline', visualData: { start, step, jumps }, explanation: `Start ${start}, jump ${step} × ${jumps} = ${start}+${step*jumps} = ${end}`, solution: `${start} + (${step} × ${jumps}) = ${end}` };
    }

    if (sk === 'TJY-05') {
        // Column addition or subtraction
        const doAdd = r(0,1) === 0;
        const a = r(20, 79), b = r(10, Math.min(a-5, 39));
        const result = doAdd ? a + b : a - b;
        return { text: doAdd ? `What is the sum?` : `Find the difference:`, options: u4(result, [result+1, result-1, result+10]), correct: String(result), type: 'column', visualData: { n1: a, n2: b, op: doAdd ? '+' : '−' }, explanation: `${a} ${doAdd?'+':'-'} ${b} = ${result}`, solution: `Work column by column: answer is ${result}` };
    }

    if (sk === 'TJY-06') {
        // Missing number in addition or subtraction
        const variants = [
            () => { const total = r(10, 25), known = r(3, total-2), missing = total - known; return { text: `${known} + ___ = ${total}. Find the missing number!`, visual: `${known} + ? = ${total}`, correct: missing, exp: `${total} - ${known} = ${missing}` }; },
            () => { const total = r(15, 30), missing = r(5, total-5), known = total - missing; return { text: `___ + ${known} = ${total}. What is missing?`, visual: `? + ${known} = ${total}`, correct: missing, exp: `${total} - ${known} = ${missing}` }; },
            () => { const total = r(15, 30), removed = r(3, 10), rem = total - removed; return { text: `${total} - ___ = ${rem}. Find the missing number!`, visual: `${total} - ? = ${rem}`, correct: removed, exp: `${total} - ${rem} = ${removed}` }; },
        ];
        const v = variants[r(0,2)]();
        return { text: v.text, options: u4(v.correct, [v.correct+2, v.correct-1, v.correct+5]), correct: String(v.correct), type: 'textbox', visualData: { text: v.visual }, explanation: v.exp, solution: v.exp };
    }

    if (sk === 'TJY-07') {
        // Fact families
        const a = r(3, 9), b = r(3, 9), sum = a + b;
        const facts = [`${a} + ${b} = ${sum}`, `${b} + ${a} = ${sum}`, `${sum} - ${a} = ${b}`, `${sum} - ${b} = ${a}`];
        const question = facts[r(0,1)]; // show an addition fact
        const correct = facts[r(2,3)];  // ask for a subtraction related fact
        const wrong1 = `${sum} + ${a} = ${a+sum}`, wrong2 = `${a} - ${b} = ${Math.abs(a-b)}`, wrong3 = `${a} × ${b} = ${a*b}`;
        const opts = shuffle([correct, wrong1, wrong2, wrong3].filter((v,i,arr)=>arr.indexOf(v)===i).slice(0,4));
        return { text: `${question}. Which is a RELATED SUBTRACTION fact?`, options: opts, correct, type: 'textbox', visualData: { text: question }, explanation: `${question} → related: ${correct}`, solution: `Fact families link addition and subtraction.` };
    }

    if (sk === 'TJY-08') {
        // Word problems
        const wordProblems = [
            () => { const x = r(10,30), y = r(5,20); return { text: `Anaya had ${x} candies. She got ${y} more. How many does she have now?`, correct: x+y, exp: `${x} + ${y} = ${x+y}` }; },
            () => { const x = r(15,35), y = r(5,12); return { text: `Raju has ${x} marbles. He gave ${y} to his friend. How many are left?`, correct: x-y, exp: `${x} - ${y} = ${x-y}` }; },
            () => { const x = r(8,20), y = r(8,20); return { text: `One box has ${x} toys, another has ${y} toys. How many toys altogether?`, correct: x+y, exp: `${x} + ${y} = ${x+y}` }; },
            () => { const t = r(20,40), g = r(5,15); return { text: `There are ${t} children. ${g} go home. How many are left?`, correct: t-g, exp: `${t} - ${g} = ${t-g}` }; },
        ];
        const v = wordProblems[r(0,3)]();
        return { text: v.text, options: u4(v.correct, [v.correct+3, v.correct-2, v.correct+7]), correct: String(v.correct), type: 'textbox', visualData: { text: '📖 Word Problem' }, explanation: v.exp, solution: v.exp };
    }

    return null;
}

/* ── Main component ────────────────────────────────────── */
const ToyJoy = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const skillId = new URLSearchParams(location.search).get('skillId');
    const isTest = skillId === 'TJY-TEST';
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
        return { topicName: 'Toy Joy', skillName: 'Addition & Subtraction', grade: '3' };
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
                if (sessionId) {
                    await api.finishSession(sessionId);
                    await api.createReport({ uid: user?.id || 'unknown', category: 'Practice', reportData: { skill_id: skillId, skill_name: skillName, score: Math.round((score/totalQuestions)*100), total_questions: totalQuestions, correct_answers: score, time_spent: timer, timestamp: new Date().toISOString() } });
                }
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

export default ToyJoy;

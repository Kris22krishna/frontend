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
const TwoBars = ({ labelA, valA, labelB, valB }) => {
    const maxVal = Math.max(valA, valB, 1);
    const wA = Math.round((valA / maxVal) * 220);
    const wB = Math.round((valB / maxVal) * 220);
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '10px 0' }}>
            {[{ label: labelA, val: valA, w: wA, color: '#FF6B6B' }, { label: labelB, val: valB, w: wB, color: '#4ECDC4' }].map(({ label, val, w, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 56, fontSize: '0.85rem', fontWeight: 700, color: '#4A5568', textAlign: 'right' }}>{label}</div>
                    <div style={{ height: 32, width: w, background: color, borderRadius: '0 12px 12px 0', display: 'flex', alignItems: 'center', paddingRight: 8, justifyContent: 'flex-end', minWidth: 40, transition: 'width 0.5s ease' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>{val}cm</span>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

const RulerVisual = ({ cm }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ overflowX: 'auto' }}>
        <svg width={Math.min(cm * 6 + 40, 320)} height={56} style={{ display: 'block', margin: '0 auto' }}>
            <rect x={10} y={18} width={cm * 5} height={22} fill="white" stroke="#94A3B8" strokeWidth={2} rx={4} />
            {Array.from({ length: cm + 1 }).map((_, i) => (
                <g key={i}>
                    <line x1={10 + i*5} y1={18} x2={10 + i*5} y2={i % 5 === 0 ? 10 : 24} stroke="#64748B" strokeWidth={i % 5 === 0 ? 2 : 1} />
                    {i % 5 === 0 && <text x={10 + i*5} y={46} textAnchor="middle" fontSize={10} fill="#64748B">{i}</text>}
                </g>
            ))}
        </svg>
    </motion.div>
);

const TextBox = ({ text }) => (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'rgba(124,106,247,0.08)', border: '2px dashed #A78BFA', borderRadius: 18, padding: '16px 24px', fontSize: '1.3rem', fontWeight: 700, color: '#31326F', textAlign: 'center', fontFamily: 'Nunito, sans-serif' }}>
        {text}
    </motion.div>
);

const DynamicVisual = ({ type, data }) => {
    if (type === 'bars') return <TwoBars {...data} />;
    if (type === 'ruler') return <RulerVisual cm={data.cm} />;
    if (type === 'textbox') return <TextBox text={data.text} />;
    return null;
};

/* ── Helpers ───────────────────────────────────────────── */
const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const u4 = (correct, distractors) => {
    const s = new Set([String(correct)]);
    const d = distractors.map(String).filter(v => !s.has(v) && (s.add(v), true));
    while (d.length < 3) { const n = Number(correct) + d.length * 5 + 3; const ns = String(n); if (!s.has(ns)) { d.push(ns); s.add(ns); } }
    return shuffle([String(correct), ...d.slice(0, 3)]);
};

const ALL_SKILLS = ['NNM-01','NNM-02','NNM-03','NNM-04','NNM-05','NNM-06'];

/* ── Single question generator ─────────────────────────── */
function makeSingleQuestion(sk) {
    if (sk === 'NNM-01') {
        // Compare two lengths — which is longer/shorter
        const a = r(20, 80), b = r(20, 80);
        if (a === b) return makeSingleQuestion(sk);
        const longer = a > b ? 'A' : 'B';
        const shorter = a > b ? 'B' : 'A';
        const isLonger = r(0,1) === 0;
        const correct = isLonger ? longer : shorter;
        const opts = shuffle(['A', 'B', 'They are equal', 'Cannot say'].filter((v,i,arr)=>arr.indexOf(v)===i));
        return { text: `Which ${isLonger ? 'is LONGER' : 'is SHORTER'}? String A = ${a}cm, String B = ${b}cm`, options: opts, correct, type: 'bars', visualData: { labelA: 'A', valA: a, labelB: 'B', valB: b }, explanation: `A = ${a}cm, B = ${b}cm. ${correct} is ${isLonger ? 'longer' : 'shorter'}.`, solution: `Compare: ${a}cm vs ${b}cm` };
    }

    if (sk === 'NNM-02') {
        // Estimation — realistic objects
        const objects = [
            { name: 'a pencil', correct: 16, options: ['16 cm', '60 cm', '5 cm', '1 m'] },
            { name: 'a book', correct: 25, options: ['25 cm', '2 m', '5 cm', '100 cm'] },
            { name: 'a school desk', correct: 60, options: ['10 cm', '60 cm', '5 m', '200 cm'] },
            { name: 'a door', correct: 200, options: ['20 cm', '200 cm', '50 cm', '5 m'] },
            { name: 'a hand span', correct: 18, options: ['18 cm', '1 m', '5 cm', '50 cm'] },
        ];
        const obj = objects[r(0, objects.length-1)];
        return { text: `About how long is ${obj.name}?`, options: shuffle(obj.options), correct: String(obj.correct) + ' cm', type: 'ruler', visualData: { cm: Math.min(obj.correct, 30) }, explanation: `${obj.name} is about ${obj.correct} cm.`, solution: `Answer: ${obj.correct} cm` };
    }

    if (sk === 'NNM-03') {
        // Measure with a unit (handspan, footstep)
        const span = r(6, 10), count = r(2, 5), total = span * count;
        const variants = [
            { text: `1 hand-span = ${span} cm. If you measure ${count} hand-spans, total = ?`, correct: total, d: [total+span, total-span, total+2] },
            { text: `A stick is ${span} cm long. ${count} such sticks in a row = ? cm`, correct: total, d: [total+5, total-span, span*count+1] },
        ];
        const v = variants[r(0,1)];
        return { text: v.text, options: u4(v.correct, v.d), correct: String(v.correct), type: 'ruler', visualData: { cm: Math.min(total, 40) }, explanation: `${span} × ${count} = ${total} cm`, solution: `${span} cm × ${count} = ${total} cm` };
    }

    if (sk === 'NNM-04') {
        // Distance word problems
        const d1 = r(15, 50), d2 = r(10, 40), total = d1 + d2;
        const variants = [
            { text: `Road from home to school is ${d1}m. School to park is ${d2}m. Total distance = ?`, correct: total, d: [total+10, total-5, d1] },
            { text: `Riya walks ${d1}m to the market and ${d2}m back. How far did she walk in all?`, correct: total, d: [total+d2, total-d1, d1+1] },
        ];
        const v = variants[r(0,1)];
        return { text: v.text, options: u4(v.correct, v.d).map(x => x + 'm'), correct: String(v.correct) + 'm', type: 'textbox', visualData: { text: `${d1}m + ${d2}m = ?` }, explanation: `${d1} + ${d2} = ${total}m`, solution: `Add distances: ${d1} + ${d2} = ${total}` };
    }

    if (sk === 'NNM-05') {
        // Difference in lengths
        const a = r(40, 100), b = r(10, a-5), diff = a - b;
        const variants = [
            { text: `Rope A = ${a}cm, Rope B = ${b}cm. How much LONGER is Rope A?`, correct: diff, d: [diff+5, diff-5, a+b] },
            { text: `A ribbon is ${a}cm. A string is ${b}cm. How much shorter is the string?`, correct: diff, d: [diff+3, a, b] },
        ];
        const v = variants[r(0,1)];
        return { text: v.text, options: u4(v.correct, v.d).map(x => x + 'cm'), correct: String(v.correct) + 'cm', type: 'bars', visualData: { labelA: 'A', valA: a, labelB: 'B', valB: b }, explanation: `${a} - ${b} = ${diff}cm`, solution: `Difference: ${a} - ${b} = ${diff}` };
    }

    if (sk === 'NNM-06') {
        // Conversion cm ↔ m
        const mVal = r(1, 5), cmExtra = r(0, 9) * 10, totalCm = mVal * 100 + cmExtra;
        const variants = [
            { text: `${totalCm} cm = ? m and ? cm`, correct: `${mVal}m ${cmExtra}cm`, opts: shuffle([`${mVal}m ${cmExtra}cm`, `${mVal+1}m ${cmExtra}cm`, `${mVal}m ${cmExtra+10}cm`, `${mVal-1}m ${cmExtra}cm`].filter(v=>v!==`0m ${cmExtra}cm`).slice(0,4)) },
            { text: `${mVal} m ${cmExtra} cm = ? cm`, correct: String(totalCm), opts: u4(totalCm, [totalCm+10, totalCm-10, mVal*10+cmExtra]) },
            { text: `100 cm = ? m`, correct: '1 m', opts: shuffle(['1 m','10 m','100 m','0.1 m']) },
        ];
        const v = variants[r(0, variants.length-1)];
        return { text: v.text, options: v.opts, correct: v.correct, type: 'ruler', visualData: { cm: Math.min(mVal * 30, 30) }, explanation: `1 m = 100 cm. ${v.correct}`, solution: `100 cm = 1 m` };
    }

    return null;
}

/* ── Main component ────────────────────────────────────── */
const VacationNaniMaa = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const skillId = new URLSearchParams(location.search).get('skillId');
    const isTest = skillId === 'NNM-TEST';
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
        return { topicName: 'Vacation with My Nani Maa', skillName: 'Measurement & Length', grade: '3' };
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

export default VacationNaniMaa;

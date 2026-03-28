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
const BigNumber = ({ number, label }) => (
    <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4.5rem', fontWeight: 700, color: '#7C6AF7', background: 'rgba(124,106,247,0.08)', borderRadius: 24, padding: '20px 48px', display: 'inline-block', fontFamily: 'Nunito, sans-serif', boxShadow: '0 4px 20px rgba(124,106,247,0.18)', border: '2px solid rgba(124,106,247,0.2)' }}>
            {number}
        </div>
        {label && <div style={{ marginTop: 10, fontSize: '1rem', color: '#64748B', fontWeight: 600 }}>{label}</div>}
    </motion.div>
);

const PatternTrain = ({ nums, blankIdx }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        {nums.map((n, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 68, height: 56, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Nunito, sans-serif', background: i === blankIdx ? 'rgba(124,106,247,0.12)' : 'white', border: i === blankIdx ? '3px dashed #7C6AF7' : '2px solid #e2e8f0', color: i === blankIdx ? '#7C6AF7' : '#31326F', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    {i === blankIdx ? '?' : n}
                </div>
                {i < nums.length - 1 && <span style={{ fontSize: '1.3rem', color: '#CBD5E0' }}>→</span>}
            </div>
        ))}
    </motion.div>
);

const TwoNumbers = ({ n1, n2 }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'center' }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 700, color: '#FF6B6B', background: 'rgba(255,107,107,0.08)', borderRadius: 20, padding: '14px 28px', fontFamily: 'Nunito, sans-serif', border: '2px solid rgba(255,107,107,0.25)' }}>{n1}</div>
        <div style={{ fontSize: '2rem', color: '#94A3B8' }}>vs</div>
        <div style={{ fontSize: '3.5rem', fontWeight: 700, color: '#4ECDC4', background: 'rgba(78,205,196,0.08)', borderRadius: 20, padding: '14px 28px', fontFamily: 'Nunito, sans-serif', border: '2px solid rgba(78,205,196,0.25)' }}>{n2}</div>
    </motion.div>
);

const DynamicVisual = ({ type, data }) => {
    if (type === 'big-number') return <BigNumber number={data.number} label={data.label} />;
    if (type === 'pattern') return <PatternTrain nums={data.nums} blankIdx={data.blankIdx} />;
    if (type === 'two-numbers') return <TwoNumbers n1={data.n1} n2={data.n2} />;
    return null;
};

/* ── Helpers ───────────────────────────────────────────── */
const onesW = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tensW = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const numToWords = (n) => {
    if (n <= 0) return 'zero';
    if (n < 20) return onesW[n];
    if (n < 100) { const t = Math.floor(n/10), o = n%10; return o === 0 ? tensW[t] : `${tensW[t]}-${onesW[o]}`; }
    const h = Math.floor(n/100), rem = n%100;
    const hPart = `${onesW[h]} hundred`;
    return rem === 0 ? hPart : `${hPart} and ${numToWords(rem)}`;
};

const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const u4 = (correct, distractors) => {
    const s = new Set([String(correct)]);
    const d = distractors.map(String).filter(v => !s.has(v) && (s.add(v), true));
    while (d.length < 3) { const n = Number(correct) + d.length * 5 + 4; const ns = String(n); if (!s.has(ns)) { d.push(ns); s.add(ns); } }
    return shuffle([String(correct), ...d.slice(0, 3)]);
};

const ALL_SKILLS = ['DCY-01','DCY-02','DCY-03','DCY-04','DCY-05','DCY-06','DCY-07'];

/* ── Single question generator ─────────────────────────── */
function makeSingleQuestion(sk) {
    if (sk === 'DCY-01') {
        const num = r(100, 198);
        const variants = [
            { text: `What number comes AFTER ${num}?`, correct: num+1, distractors: [num+2, num-1, num+10] },
            { text: `What number comes BEFORE ${num+1}?`, correct: num, distractors: [num-1, num+1, num-2] },
            { text: `Which number is 2 MORE than ${num}?`, correct: num+2, distractors: [num+1, num-1, num+5] },
            { text: `Which number is 10 MORE than ${num}?`, correct: num+10, distractors: [num+1, num+5, num+11] },
        ];
        const v = variants[r(0, variants.length-1)];
        return { text: v.text, options: u4(v.correct, v.distractors), correct: String(v.correct), type: 'big-number', visualData: { number: num, label: 'Look at this number' }, explanation: v.distractors ? `Answer: ${v.correct}` : '', solution: `Answer: ${v.correct}` };
    }

    if (sk === 'DCY-02') {
        const num = r(100, 200);
        const word = numToWords(num);
        const w1 = numToWords(num + 1), w2 = numToWords(num + 2), w3 = numToWords(Math.max(100, num - 1));
        const opts = shuffle([word, w1, w2, w3].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4));
        return { text: `What is ${num} in words?`, options: opts, correct: word, type: 'big-number', visualData: { number: num }, explanation: `${num} → "${word}"`, solution: `${num} = ${word}` };
    }

    if (sk === 'DCY-03') {
        const mid = r(101, 198);
        return { text: `What number is BETWEEN ${mid-1} and ${mid+1}?`, options: u4(mid, [mid-1, mid+1, mid+2]), correct: String(mid), type: 'pattern', visualData: { nums: [mid-1, mid, mid+1], blankIdx: 1 }, explanation: `${mid-1} < ${mid} < ${mid+1}`, solution: `The middle number is ${mid}` };
    }

    if (sk === 'DCY-04') {
        const base = r(100, 160), step = 10, blankIdx = r(0, 3);
        const nums = [base, base+step, base+2*step, base+3*step];
        const correct = nums[blankIdx];
        const display = nums.map((n, i) => i === blankIdx ? '?' : n);
        return { text: `Find the missing number (counting by 10s):`, options: u4(correct, [correct+5, correct-5, correct+10]), correct: String(correct), type: 'pattern', visualData: { nums: display, blankIdx }, explanation: `Pattern +10: ${base}, ${base+step}, ${base+2*step}, ${base+3*step}`, solution: `Missing = ${correct}` };
    }

    if (sk === 'DCY-05') {
        const base = r(100, 170), step = 5, blankIdx = r(1, 3);
        const nums = [base, base+step, base+2*step, base+3*step];
        const correct = nums[blankIdx];
        const display = nums.map((n, i) => i === blankIdx ? '?' : n);
        return { text: `Find the missing number (counting by 5s):`, options: u4(correct, [correct+2, correct-2, correct+5]), correct: String(correct), type: 'pattern', visualData: { nums: display, blankIdx }, explanation: `Pattern +5: ${base}, ${base+step}, ${base+2*step}, ${base+3*step}`, solution: `Missing = ${correct}` };
    }

    if (sk === 'DCY-06') {
        const a = r(100, 200), b = r(100, 200);
        const sym = a > b ? '>' : a < b ? '<' : '=';
        const variants = [
            { text: `Which number is GREATER: ${a} or ${b}?`, correct: String(a > b ? a : b), opts: u4(a > b ? a : b, [a < b ? a : b, a+1, b-1]) },
            { text: `Which number is SMALLER: ${a} or ${b}?`, correct: String(a < b ? a : b), opts: u4(a < b ? a : b, [a > b ? a : b, a-1, b+1]) },
            { text: `Put the correct symbol between ${a} and ${b}:`, correct: sym, opts: shuffle(['>', '<', '=', '≠'].filter((v,i,arr)=>arr.indexOf(v)===i)) },
        ];
        const v = variants[r(0, 2)];
        return { text: v.text, options: v.opts, correct: v.correct, type: 'two-numbers', visualData: { n1: a, n2: b }, explanation: `${a} ${sym} ${b}`, solution: `Compare hundreds, then tens, then ones` };
    }

    if (sk === 'DCY-07') {
        const n1 = r(100, 140), n2 = r(141, 170), n3 = r(171, 200);
        const isAsc = r(0,1) === 0;
        const asc = `${n1}, ${n2}, ${n3}`, desc = `${n3}, ${n2}, ${n1}`;
        const correct = isAsc ? asc : desc;
        const wrong1 = `${n2}, ${n1}, ${n3}`, wrong2 = isAsc ? desc : asc, wrong3 = `${n3}, ${n1}, ${n2}`;
        const opts = shuffle([correct, wrong1, wrong2, wrong3].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4));
        return { text: `Arrange ${n1}, ${n2}, ${n3} in ${isAsc ? 'ASCENDING (smallest first)' : 'DESCENDING (largest first)'} order:`, options: opts, correct, type: 'pattern', visualData: { nums: [n1, n2, n3], blankIdx: -1 }, explanation: `${isAsc ? 'Ascending' : 'Descending'}: ${correct}`, solution: `Answer: ${correct}` };
    }

    return null;
}

/* ── Main component ────────────────────────────────────── */
const DoubleCentury = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const skillId = new URLSearchParams(location.search).get('skillId');
    const isTest = skillId === 'DCY-TEST';
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
        return { topicName: 'Double Century', skillName: 'Numbers 100–200', grade: '3' };
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

export default DoubleCentury;

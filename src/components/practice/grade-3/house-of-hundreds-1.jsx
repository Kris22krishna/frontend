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
const MiniChart = ({ highlight }) => {
    const rows = Array.from({ length: 10 }, (_, r) =>
        Array.from({ length: 10 }, (_, c) => r * 10 + c + 1)
    );
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 2, background: 'rgba(255,255,255,0.8)', padding: 8, borderRadius: 14, boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            {rows.flat().map(n => (
                <div key={n} style={{ width: 26, height: 26, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, background: n === highlight ? '#7C6AF7' : n % 10 === 0 ? '#E8E4FF' : '#F8FAFC', color: n === highlight ? 'white' : n % 10 === 0 ? '#7C6AF7' : '#4A5568', border: n === highlight ? '2px solid #5B4FD9' : 'none' }}>
                    {n}
                </div>
            ))}
        </motion.div>
    );
};

const SequenceTiles = ({ nums, blankIdx }) => (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        {nums.map((n, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ minWidth: 58, height: 52, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 700, fontFamily: 'Nunito, sans-serif', background: i === blankIdx ? 'rgba(124,106,247,0.12)' : 'white', border: i === blankIdx ? '3px dashed #7C6AF7' : '2px solid #e2e8f0', color: i === blankIdx ? '#7C6AF7' : '#31326F', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    {i === blankIdx ? '?' : n}
                </div>
                {i < nums.length - 1 && <span style={{ fontSize: '1.1rem', color: '#CBD5E0' }}>→</span>}
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
    if (type === 'chart') return <MiniChart highlight={data.highlight} />;
    if (type === 'sequence') return <SequenceTiles nums={data.nums} blankIdx={data.blankIdx} />;
    if (type === 'textbox') return <TextBox text={data.text} />;
    return null;
};

/* ── Helpers ───────────────────────────────────────────── */
const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const u4 = (correct, distractors) => {
    const s = new Set([String(correct)]);
    const d = distractors.map(String).filter(v => !s.has(v) && (s.add(v), true));
    while (d.length < 3) { const n = Math.max(1, Number(correct) + d.length * 3 + 2); const ns = String(n); if (!s.has(ns)) { d.push(ns); s.add(ns); } }
    return shuffle([String(correct), ...d.slice(0, 3)]);
};

const ALL_SKILLS = ['HH1-01','HH1-02','HH1-03','HH1-04','HH1-05','HH1-06','HH1-07','HH1-08','HH1-09'];

/* ── Single question generator ─────────────────────────── */
function makeSingleQuestion(sk) {
    if (sk === 'HH1-01') {
        // Hundreds chart — spot the highlighted number
        const num = r(1, 100);
        return { text: 'Which number is highlighted in purple on the chart?', options: u4(num, [num+1, num-1, num+10].map(n=>Math.max(1,Math.min(100,n)))), correct: String(num), type: 'chart', visualData: { highlight: num }, explanation: `The highlighted cell shows ${num}.`, solution: `Count rows and columns to find the number.` };
    }

    if (sk === 'HH1-02') {
        // Sequence by 1s — fill blank
        const start = r(40, 90), blankIdx = r(1, 3);
        const nums = [start, start+1, start+2, start+3];
        const correct = nums[blankIdx];
        const display = nums.map((n, i) => i === blankIdx ? '?' : String(n));
        return { text: 'Fill in the missing number (counting by 1s):', options: u4(correct, [correct+1, correct-1, correct+2]), correct: String(correct), type: 'sequence', visualData: { nums: display, blankIdx }, explanation: `Counting by 1s: ${nums.join(', ')}. Missing = ${correct}`, solution: `Pattern: +1 each time` };
    }

    if (sk === 'HH1-03') {
        // Skip counting by 5s
        const base = r(5, 15) * 5, blankIdx = r(1, 3);
        const nums = [base, base+5, base+10, base+15];
        const correct = nums[blankIdx];
        const display = nums.map((n, i) => i === blankIdx ? '?' : String(n));
        return { text: 'Fill in the missing number (skip count by 5s):', options: u4(correct, [correct+2, correct-2, correct+5]), correct: String(correct), type: 'sequence', visualData: { nums: display, blankIdx }, explanation: `Counting by 5s: ${nums.join(', ')}. Missing = ${correct}`, solution: `Pattern: +5 each time` };
    }

    if (sk === 'HH1-04') {
        // Skip counting by 10s
        const base = r(1, 5) * 10, blankIdx = r(1, 3);
        const nums = [base, base+10, base+20, base+30];
        const correct = nums[blankIdx];
        const display = nums.map((n, i) => i === blankIdx ? '?' : String(n));
        return { text: 'Fill in the missing number (skip count by 10s):', options: u4(correct, [correct+5, correct-5, correct+10]), correct: String(correct), type: 'sequence', visualData: { nums: display, blankIdx }, explanation: `Counting by 10s: ${nums.join(', ')}. Missing = ${correct}`, solution: `Pattern: +10 each time` };
    }

    if (sk === 'HH1-05') {
        // Neighbours on hundreds chart
        const mid = r(12, 89);
        const variants = [
            { text: `What number comes just BEFORE ${mid} on the chart?`, correct: mid-1, d: [mid+1, mid-2, mid+2] },
            { text: `What number comes just AFTER ${mid} on the chart?`, correct: mid+1, d: [mid-1, mid+2, mid-2] },
            { text: `What is the number ABOVE ${mid+10} on the hundreds chart?`, correct: mid, d: [mid-1, mid+1, mid+10] },
        ];
        const v = variants[r(0, variants.length-1)];
        return { text: v.text, options: u4(v.correct, v.d), correct: String(v.correct), type: 'chart', visualData: { highlight: mid }, explanation: `Answer: ${v.correct}`, solution: `Use the chart to find the neighbor.` };
    }

    if (sk === 'HH1-06') {
        // Missing number in a row of a partial grid
        const rowStart = r(1, 9) * 10 + 1;
        const blankPos = r(0, 4);
        const nums = Array.from({ length: 5 }, (_, i) => rowStart + i);
        const correct = nums[blankPos];
        const display = nums.map((n, i) => i === blankPos ? '?' : String(n));
        return { text: `What number is missing from this row?`, options: u4(correct, [correct+1, correct-1, correct+10]), correct: String(correct), type: 'sequence', visualData: { nums: display, blankIdx: blankPos }, explanation: `Numbers go in order: missing = ${correct}`, solution: `Complete the sequence: ${nums.join(', ')}` };
    }

    if (sk === 'HH1-07') {
        // Backward counting by 10s
        const start = r(7, 10) * 10, blankIdx = r(1, 3);
        const nums = [start, start-10, start-20, start-30];
        const correct = nums[blankIdx];
        const display = nums.map((n, i) => i === blankIdx ? '?' : String(n));
        return { text: 'Count BACKWARDS by 10s. Find the missing number:', options: u4(correct, [correct+5, correct-5, correct+10]), correct: String(correct), type: 'sequence', visualData: { nums: display, blankIdx }, explanation: `Counting back by 10s: ${nums.join(', ')}. Missing = ${correct}`, solution: `Pattern: -10 each time` };
    }

    if (sk === 'HH1-08') {
        // Sort numbers from the chart in ascending order
        const picks = [r(10,30), r(31,60), r(61,90)];
        const asc = [...picks].sort((a,b)=>a-b);
        const ascStr = asc.join(', ');
        const wrong1 = `${picks[1]}, ${picks[0]}, ${picks[2]}`;
        const wrong2 = `${asc[2]}, ${asc[1]}, ${asc[0]}`;
        const wrong3 = `${picks[2]}, ${picks[0]}, ${picks[1]}`;
        const opts = shuffle([ascStr, wrong1, wrong2, wrong3].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4));
        return { text: `Put these numbers in ASCENDING order: ${picks.join(', ')}`, options: opts, correct: ascStr, type: 'textbox', visualData: { text: picks.join(' | ') }, explanation: `Ascending (smallest first): ${ascStr}`, solution: `Order: ${ascStr}` };
    }

    if (sk === 'HH1-09') {
        // Number patterns on the chart
        const patterns = [
            { text: `Numbers that end in 5: 5, 15, 25, ___, 45`, correct: '35', wrongs: ['30','40','32'] },
            { text: `Numbers that end in 0 (multiples of 10): 10, 20, 30, ___, 50`, correct: '40', wrongs: ['35','45','42'] },
            { text: `Even numbers: 2, 4, 6, ___, 10`, correct: '8', wrongs: ['7','9','11'] },
            { text: `Odd numbers: 1, 3, 5, ___, 9`, correct: '7', wrongs: ['6','8','10'] },
            { text: `Skip count by 3: 3, 6, 9, ___, 15`, correct: '12', wrongs: ['11','13','14'] },
        ];
        const p = patterns[r(0, patterns.length-1)];
        return { text: p.text, options: u4(p.correct, p.wrongs), correct: p.correct, type: 'textbox', visualData: { text: `Pattern: ${p.text.split(':')[0]}` }, explanation: `Missing = ${p.correct}`, solution: `Find the pattern and fill in the blank` };
    }

    return null;
}

/* ── Main component ────────────────────────────────────── */
const HouseOfHundreds1 = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const skillId = new URLSearchParams(location.search).get('skillId');
    const isTest = skillId === 'HH1-TEST';
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
        return { topicName: 'House of Hundreds – I', skillName: 'Hundreds Chart', grade: '3' };
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

export default HouseOfHundreds1;

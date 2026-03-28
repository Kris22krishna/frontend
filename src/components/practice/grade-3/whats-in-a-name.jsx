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
const DotsGrid = ({ count, cols = 5 }) => {
    const rows = Math.ceil(count / cols);
    return (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(count, cols)}, 28px)`, gap: '8px', justifyContent: 'center' }}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: i % 2 === 0 ? '#7C6AF7' : '#FF6B6B', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
            ))}
        </motion.div>
    );
};

const TallyMarks = ({ count }) => {
    const groups = Math.floor(count / 5);
    const rem = count % 5;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            {Array.from({ length: groups }).map((_, g) => (
                <svg key={g} width="48" height="52" viewBox="0 0 48 52">
                    {[0,1,2,3].map(i => <line key={i} x1={8+i*9} y1="4" x2={8+i*9} y2="48" stroke="#31326F" strokeWidth="3" strokeLinecap="round" />)}
                    <line x1="2" y1="40" x2="46" y2="12" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
                </svg>
            ))}
            {rem > 0 && (
                <svg width={8+rem*9} height="52" viewBox={`0 0 ${8+rem*9} 52`}>
                    {Array.from({ length: rem }).map(i => <line key={i} x1={8+i*9} y1="4" x2={8+i*9} y2="48" stroke="#31326F" strokeWidth="3" strokeLinecap="round" />)}
                </svg>
            )}
        </motion.div>
    );
};

const NumberDisplay = ({ number, label }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', fontWeight: 700, color: '#31326F', background: 'rgba(124,106,247,0.1)', borderRadius: 20, padding: '20px 40px', display: 'inline-block', fontFamily: 'Nunito, sans-serif', boxShadow: '0 4px 15px rgba(124,106,247,0.2)' }}>
            {number}
        </div>
        {label && <div style={{ marginTop: 10, fontSize: '1rem', color: '#64748B', fontWeight: 600 }}>{label}</div>}
    </motion.div>
);

const TwoNumbers = ({ n1, n2 }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ display: 'flex', alignItems: 'center', gap: 30, justifyContent: 'center' }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 700, color: '#FF6B6B', background: 'rgba(255,107,107,0.1)', borderRadius: 20, padding: '15px 30px', fontFamily: 'Nunito, sans-serif' }}>{n1}</div>
        <div style={{ fontSize: '2rem', color: '#94A3B8', fontWeight: 400 }}>vs</div>
        <div style={{ fontSize: '3.5rem', fontWeight: 700, color: '#4ECDC4', background: 'rgba(78,205,196,0.1)', borderRadius: 20, padding: '15px 30px', fontFamily: 'Nunito, sans-serif' }}>{n2}</div>
    </motion.div>
);

const PlaceValueTable = ({ tens, ones }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
        {[['Tens', tens, '#7C6AF7'], ['Ones', ones, '#FF6B6B']].map(([label, val, color]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: `3px solid ${color}`, borderRadius: 14, overflow: 'hidden', minWidth: 80 }}>
                <div style={{ background: color, color: 'white', width: '100%', textAlign: 'center', padding: '6px 0', fontSize: '0.85rem', fontWeight: 700 }}>{label}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, padding: '12px 20px', color }}>{val}</div>
            </div>
        ))}
    </motion.div>
);

const DynamicVisual = ({ type, data }) => {
    if (type === 'dots') return <DotsGrid count={data.count} cols={data.cols || 5} />;
    if (type === 'tally') return <TallyMarks count={data.count} />;
    if (type === 'number') return <NumberDisplay number={data.number} label={data.label} />;
    if (type === 'two-numbers') return <TwoNumbers n1={data.n1} n2={data.n2} />;
    if (type === 'place-value') return <PlaceValueTable tens={data.tens} ones={data.ones} />;
    return null;
};

/* ── Helpers ───────────────────────────────────────────── */
const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens_ = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const numberToWords = (n) => {
    if (n < 20) return ones[n];
    const t = Math.floor(n / 10), o = n % 10;
    return o === 0 ? tens_[t] : `${tens_[t]}-${ones[o]}`;
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const uniqueOpts = (correct, wrongs) => {
    const all = [String(correct), ...wrongs.map(String)].filter((v, i, a) => a.indexOf(v) === i);
    while (all.length < 4) all.push(String(Number(correct) + (all.length * 3 + 7)));
    return shuffle(all.slice(0, 4));
};

const ALL_SKILLS = ['WIN-01','WIN-02','WIN-03','WIN-04','WIN-05','WIN-06','WIN-07'];

/* ── Single question generator ─────────────────────────── */
function makeSingleQuestion(sk) {
    const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    if (sk === 'WIN-01') {
        const variants = [
            () => { const c = r(5, 18); const opts = uniqueOpts(c, [c+2, c-2, c+4]); return { text: 'How many dots do you see? Count carefully!', options: opts, correct: String(c), type: 'dots', visualData: { count: c }, explanation: `Count each dot one by one. There are ${c} dots.`, solution: `Total dots = ${c}` }; },
            () => { const c = r(5, 15); const opts = uniqueOpts(c, [c+3, c-3, c+1]); return { text: 'Count the tally marks. What is the total?', options: opts, correct: String(c), type: 'tally', visualData: { count: c }, explanation: `Each bundle of 5 tallies = 5. Count remaining marks. Total = ${c}.`, solution: `Tally total = ${c}` }; },
            () => { const c = r(6, 20); const cols = r(3,5); const opts = uniqueOpts(c, [c+2, c-1, c+5]); return { text: `How many dots are there in total?`, options: opts, correct: String(c), type: 'dots', visualData: { count: c, cols }, explanation: `Count row by row. Total = ${c}.`, solution: `Total = ${c}` }; },
        ];
        return variants[r(0, variants.length-1)]();
    }

    if (sk === 'WIN-02') {
        const variants = [
            () => { const num = r(10, 99); const opts = uniqueOpts(num, [num+1, num-1, num+10]); return { text: 'What number is shown?', options: opts, correct: String(num), type: 'number', visualData: { number: num }, explanation: `The digits shown make the number ${num}.`, solution: `Number = ${num}` }; },
            () => { const num = r(10, 99); const opts = uniqueOpts(num, [num+10, num-10, num+11]); return { text: `Which number is TEN MORE than ${num - 10}?`, options: opts, correct: String(num), type: 'number', visualData: { number: num-10, label: 'Add 10 to this' }, explanation: `${num - 10} + 10 = ${num}.`, solution: `${num-10} + 10 = ${num}` }; },
            () => { const num = r(21, 99); const opts = uniqueOpts(num, [num-1, num+1, num+9]); return { text: `Which number comes just AFTER ${num-1}?`, options: opts, correct: String(num), type: 'number', visualData: { number: num-1, label: '? comes after' }, explanation: `The number after ${num-1} is ${num}.`, solution: `${num-1} + 1 = ${num}` }; },
        ];
        return variants[r(0, variants.length-1)]();
    }

    if (sk === 'WIN-03') {
        const num = r(20, 99);
        const word = numberToWords(num);
        const w1 = numberToWords(num + 1); const w2 = numberToWords(num + 2); const w3 = numberToWords(Math.max(20, num - 1));
        const opts = shuffle([word, w1, w2, w3].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4));
        return { text: `What is ${num} in words?`, options: opts, correct: word, type: 'number', visualData: { number: num }, explanation: `${num} is written as "${word}".`, solution: `${num} → ${word}` };
    }

    if (sk === 'WIN-04') {
        const a = r(10, 90), b = r(10, 90);
        const variants = [
            () => { const correct = String(Math.max(a,b)); const opts = uniqueOpts(correct, [String(Math.min(a,b)), String(a+1), String(b-1)]); return { text: 'Which number is GREATER?', options: opts, correct, type: 'two-numbers', visualData: { n1: a, n2: b }, explanation: `Compare ${a} and ${b}: ${correct} is greater.`, solution: `${a} vs ${b} → ${correct} is greater` }; },
            () => { const correct = String(Math.min(a,b)); const opts = uniqueOpts(correct, [String(Math.max(a,b)), String(a-1), String(b+1)]); return { text: 'Which number is SMALLER?', options: opts, correct, type: 'two-numbers', visualData: { n1: a, n2: b }, explanation: `Compare ${a} and ${b}: ${correct} is smaller.`, solution: `${a} vs ${b} → ${correct} is smaller` }; },
            () => { const sym = a > b ? '>' : a < b ? '<' : '='; const opts = shuffle(['>', '<', '=', '≠'].filter(v => v !== sym).slice(0,3).concat([sym])); return { text: `Put the correct symbol between ${a} and ${b}`, options: ['>', '<', '=', '≠'], correct: sym, type: 'two-numbers', visualData: { n1: a, n2: b }, explanation: `${a} ${sym} ${b}`, solution: `${a} ${sym} ${b}` }; },
        ];
        return variants[r(0,2)]();
    }

    if (sk === 'WIN-05') {
        const base = r(10, 60);
        const nums = [base, base + r(3,8), base + r(10,18)];
        const asc = [...nums].sort((a,b)=>a-b);
        const desc = [...asc].reverse();
        const ascStr = asc.join(', '); const descStr = desc.join(', ');
        const wrongStr1 = [nums[1], nums[0], nums[2]].join(', ');
        const wrongStr2 = [nums[2], nums[0], nums[1]].join(', ');
        const isAsc = r(0,1) === 0;
        const correct = isAsc ? ascStr : descStr;
        const opts = shuffle([correct, wrongStr1, wrongStr2, isAsc ? descStr : ascStr].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4));
        return { text: `Arrange ${nums[0]}, ${nums[1]}, ${nums[2]} in ${isAsc ? 'ASCENDING (smallest first)' : 'DESCENDING (largest first)'} order`, options: opts, correct, type: 'number', visualData: { number: nums.join(', '), label: 'Arrange these numbers' }, explanation: `${isAsc ? 'Ascending' : 'Descending'}: ${correct}`, solution: `Answer: ${correct}` };
    }

    if (sk === 'WIN-06') {
        const mid = r(15, 90);
        const types = ['before', 'after', 'between'];
        const t = types[r(0,2)];
        if (t === 'before') {
            const correct = String(mid - 1);
            const opts = uniqueOpts(correct, [String(mid+1), String(mid-2), String(mid+2)]);
            return { text: `What number comes BEFORE ${mid}?`, options: opts, correct, type: 'number', visualData: { number: mid, label: '? comes before this' }, explanation: `One less than ${mid} is ${mid-1}.`, solution: `${mid} - 1 = ${mid-1}` };
        } else if (t === 'after') {
            const correct = String(mid + 1);
            const opts = uniqueOpts(correct, [String(mid-1), String(mid+2), String(mid+10)]);
            return { text: `What number comes AFTER ${mid}?`, options: opts, correct, type: 'number', visualData: { number: mid, label: '? comes after this' }, explanation: `One more than ${mid} is ${mid+1}.`, solution: `${mid} + 1 = ${mid+1}` };
        } else {
            const correct = String(mid);
            const opts = uniqueOpts(correct, [String(mid+1), String(mid-1), String(mid+2)]);
            return { text: `What number is BETWEEN ${mid-1} and ${mid+1}?`, options: opts, correct, type: 'number', visualData: { number: `${mid-1}, ?, ${mid+1}`, label: 'Find the missing number' }, explanation: `Between ${mid-1} and ${mid+1} is ${mid}.`, solution: `${mid-1} < ${mid} < ${mid+1}` };
        }
    }

    if (sk === 'WIN-07') {
        const num = r(11, 99);
        const t = Math.floor(num / 10), o = num % 10;
        const variants = [
            () => { const correct = String(t); const opts = uniqueOpts(correct, [String(t+1), String(Math.max(0,t-1)), String(o)]); return { text: `How many TENS are in ${num}?`, options: opts, correct, type: 'place-value', visualData: { tens: t, ones: o }, explanation: `${num} = ${t} tens + ${o} ones`, solution: `${num} → ${t} tens` }; },
            () => { const correct = String(o); const opts = uniqueOpts(correct, [String(o+1), String(Math.max(0,o-1)), String(t)]); return { text: `How many ONES are in ${num}?`, options: opts, correct, type: 'place-value', visualData: { tens: t, ones: o }, explanation: `${num} = ${t} tens + ${o} ones`, solution: `${num} → ${o} ones` }; },
            () => { const correct = String(t*10 + o); const opts = uniqueOpts(correct, [String(t*10+o+1), String(o*10+t), String(t*10+o+10)]); return { text: `${t} tens and ${o} ones make which number?`, options: opts, correct, type: 'place-value', visualData: { tens: t, ones: o }, explanation: `${t} tens = ${t*10}, plus ${o} ones = ${num}.`, solution: `${t}×10 + ${o} = ${num}` }; },
        ];
        return variants[r(0, variants.length-1)]();
    }

    return null;
}

/* ── Main component ────────────────────────────────────── */
const WhatsInAName = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const skillId = new URLSearchParams(location.search).get('skillId');
    const isTest = skillId === 'WIN-TEST';
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
                if (skills.find(s => s.id === skillId)) return { topicName, skillName: skills.find(s=>s.id===skillId)?.name || 'Practice', grade: gk };
            }
        }
        return { topicName: "What's in a Name?", skillName: 'Numbers & Place Value', grade: '3' };
    };

    const getNextSkill = () => {
        const { grade } = getTopicInfo();
        const gradeConfig = TOPIC_CONFIGS[grade];
        const topics = Object.keys(gradeConfig);
        for (let i = 0; i < topics.length; i++) {
            const skills = gradeConfig[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) {
                if (idx < skills.length - 1) return { ...skills[idx+1], topicName: topics[i] };
                if (i < topics.length - 1) { const ns = gradeConfig[topics[i+1]]; return ns.length > 0 ? { ...ns[0], topicName: topics[i+1] } : null; }
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
            if (usedTexts.has(q.text + q.correct)) continue;
            const uOpts = [...new Set(q.options.map(String))];
            if (uOpts.length < 4) continue;
            usedTexts.add(q.text + q.correct);
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

    const handleExit = async () => {
        try { if (sessionId) await api.finishSession(sessionId); } catch (e) {}
        navigate('/junior/grade/3');
    };

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
                <header className="results-header">
                    <h1 className="results-title">Adventure Report</h1>
                    <div className="exit-container"><StickerExit onClick={handleExit} /></div>
                </header>
                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: 120, height: 120, margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Adventure Complete! 🎉</h2>
                        <div className="stars-container">
                            {[1,2,3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i*0.2 }} className="star-wrapper">
                                    <Star size={60} fill={pct >= i*33 ? '#FFD700' : '#EDF2F7'} color={pct >= i*33 ? '#F6AD55' : '#CBD5E0'} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid">
                            <div className="stat-card"><span className="stat-label">Correct</span><span className="stat-value-large">{score}/{totalQuestions}</span></div>
                            <div className="stat-card"><span className="stat-label">Time</span><span className="stat-value-large">{fmt(timer)}</span></div>
                            <div className="stat-card"><span className="stat-label">Accuracy</span><span className="stat-value-large">{pct}%</span></div>
                            <div className="stat-card"><span className="stat-label">Score</span><span className="stat-value-large">{score*10}</span></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
                        {Object.values(answers).map((ans, idx) => (
                            <motion.div key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx*0.1 }}
                                style={{ width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', background: ans.isCorrect ? '#C6F6D5' : '#FED7D7', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                {ans.isCorrect ? '✅' : '❌'}
                            </motion.div>
                        ))}
                    </div>
                    <p style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 400, color: '#4A5568' }}>
                        {pct >= 80 ? '🌟 Amazing work! Keep it up!' : pct >= 60 ? '💪 Good effort! Keep practicing!' : '🌱 Nice try! Practice makes perfect!'}
                    </p>
                    <div className="results-actions">
                        <button className="action-btn-large retake-skill-btn" onClick={() => window.location.reload()}><RefreshCw size={24} /> Retake Skill</button>
                        {getNextSkill() && (
                            <button className="action-btn-large next-skill-btn" onClick={() => { const n = getNextSkill(); navigate(`/junior/grade/3/${n.route}?skillId=${n.id}`); window.location.reload(); }}>
                                Next Skill <ArrowRight size={24} />
                            </button>
                        )}
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
                <div className="g3-progress-container" style={{ margin: '0 0 10px 0' }}>
                    <div className="g3-progress-fill" style={{ width: `${((qIndex+1)/totalQuestions)*100}%` }} />
                </div>
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
                                : <button className="g3-nav-btn next-btn" onClick={handleNext}>{qIndex === totalQuestions-1 ? (isTest ? 'Finish Test' : 'Finish') : 'Next Question'} <ChevronRight size={24} /></button>
                            }
                        </div>
                    </div>
                </motion.div>
            </div>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={answers[qIndex]?.isCorrect} correctAnswer={currentQ.correct} explanation={currentQ.explanation} solution={currentQ.solution} onClose={() => setShowExplanationModal(false)} onNext={() => { setShowExplanationModal(false); handleNext(); }} />
        </div>
    );
};

export default WhatsInAName;

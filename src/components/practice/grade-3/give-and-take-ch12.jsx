import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Timer, Star, ChevronLeft, RefreshCw, FileText, Eye, ChevronRight } from 'lucide-react';
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

/* ─── Visual Components ─── */

/** 3-digit column addition/subtraction with H/T/O boxes */
const ColumnMath3 = ({ a, b, op }) => {
    const aStr = String(a).padStart(3, ' ');
    const bStr = String(b).padStart(3, ' ');
    const aH = Math.floor(a / 100), aT = Math.floor((a % 100) / 10), aO = a % 10;
    const bH = Math.floor(b / 100), bT = Math.floor((b % 100) / 10), bO = b % 10;
    const colW = 52, gap = 4, padL = 16, boxH = 48;
    const totalW = padL * 2 + 3 * colW + 2 * gap + 24; // op col
    return (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ background: 'white', borderRadius: 20, padding: '20px 24px', display: 'inline-block', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <svg width={totalW} height={200} viewBox={`0 0 ${totalW} 200`}>
                {/* H T O header */}
                {['H', 'T', 'O'].map((lbl, ci) => (
                    <text key={lbl} x={padL + 24 + ci * (colW + gap) + colW / 2} y={22}
                        textAnchor="middle" fontSize={13} fontWeight="700" fill="#9575CD">{lbl}</text>
                ))}
                {/* Row 1: a */}
                {[aH, aT, aO].map((digit, ci) => (
                    <g key={`a-${ci}`}>
                        <rect x={padL + 24 + ci * (colW + gap)} y={30} width={colW} height={boxH} rx={8}
                            fill="rgba(78,205,196,0.12)" stroke="#4ECDC4" strokeWidth={1.5} />
                        <text x={padL + 24 + ci * (colW + gap) + colW / 2} y={30 + boxH / 2 + 7}
                            textAnchor="middle" fontSize={22} fontWeight="700" fill="#31326F">
                            {digit === 0 && ci === 0 ? '' : digit}
                        </text>
                    </g>
                ))}
                {/* Operator */}
                <text x={padL} y={30 + boxH / 2 + 7} textAnchor="middle" fontSize={24} fontWeight="700"
                    fill={op === '+' ? '#4ECDC4' : '#FF6B6B'}>{op === '+' ? '+' : '−'}</text>
                {/* Row 2: b */}
                {[bH, bT, bO].map((digit, ci) => (
                    <g key={`b-${ci}`}>
                        <rect x={padL + 24 + ci * (colW + gap)} y={30 + boxH + 8} width={colW} height={boxH} rx={8}
                            fill="rgba(255,107,107,0.08)" stroke="#FF6B6B" strokeWidth={1.5} />
                        <text x={padL + 24 + ci * (colW + gap) + colW / 2} y={30 + boxH + 8 + boxH / 2 + 7}
                            textAnchor="middle" fontSize={22} fontWeight="700" fill="#31326F">
                            {digit === 0 && ci === 0 ? '' : digit}
                        </text>
                    </g>
                ))}
                {/* Divider line */}
                <line x1={padL} y1={30 + 2 * boxH + 18} x2={totalW - padL} y2={30 + 2 * boxH + 18}
                    stroke="#31326F" strokeWidth={2.5} />
                {/* Answer row placeholder */}
                {[0, 1, 2].map((ci) => (
                    <g key={`ans-${ci}`}>
                        <rect x={padL + 24 + ci * (colW + gap)} y={30 + 2 * boxH + 24} width={colW} height={boxH} rx={8}
                            fill="rgba(124,106,247,0.12)" stroke="#7C6AF7" strokeWidth={1.5} strokeDasharray="4,3" />
                        <text x={padL + 24 + ci * (colW + gap) + colW / 2} y={30 + 2 * boxH + 24 + boxH / 2 + 7}
                            textAnchor="middle" fontSize={22} fontWeight="700" fill="#7C6AF7">?</text>
                    </g>
                ))}
            </svg>
        </motion.div>
    );
};

const NumberBox = ({ text, highlight }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ fontSize: '1.8rem', fontWeight: 700, color: '#31326F', background: highlight ? 'rgba(124,106,247,0.15)' : 'rgba(124,106,247,0.08)', borderRadius: 16, padding: '16px 28px', display: 'inline-block', fontFamily: 'Nunito, sans-serif', border: highlight ? '2px dashed #7C6AF7' : '2px solid transparent', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        {text}
    </motion.div>
);

const TextBox = ({ text }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ fontSize: '1.05rem', color: '#31326F', background: 'rgba(124,106,247,0.08)', borderRadius: 16, padding: '18px 22px', fontFamily: 'Nunito, sans-serif', lineHeight: 1.7, maxWidth: '320px', margin: '0 auto', textAlign: 'center', fontWeight: 600, border: '2px dashed #A78BFA' }}>
        {text}
    </motion.div>
);

const DynamicVisual = ({ type, data }) => {
    if (type === 'column3') return <ColumnMath3 a={data.a} b={data.b} op={data.op} />;
    if (type === 'number-box') return <NumberBox text={data.text} highlight={data.highlight} />;
    if (type === 'text-display') return <TextBox text={data.text} />;
    return null;
};

/* ─── Helpers ─── */

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const u4 = (correct, distractors) => {
    const s = new Set([String(correct)]);
    const d = distractors.map(String).filter(v => !s.has(v) && (s.add(v), true));
    let pad = 1;
    while (d.length < 3) {
        const candidate = String(Math.max(0, Number(correct) + pad * 5));
        if (!s.has(candidate)) { s.add(candidate); d.push(candidate); }
        pad++;
    }
    return shuffle([String(correct), ...d.slice(0, 3)]);
};

const ALL_SKILLS = ['GTK-01', 'GTK-02', 'GTK-03', 'GTK-04', 'GTK-05', 'GTK-06', 'GTK-07', 'GTK-08'];

const NAMES = ['Meera', 'Raju', 'Priya', 'Amit', 'Sunita', 'Rohan', 'Neha', 'Kiran'];

/* ─── Question Generator ─── */

const generateSingleQuestion = (sk) => {
    const rnd = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;

    if (sk === 'GTK-01') {
        // 3-digit addition without carrying: each digit pair sums < 10
        const aH = rnd(1, 4), aT = rnd(1, 4), aO = rnd(1, 4);
        const bH = rnd(1, 9 - aH), bT = rnd(1, 9 - aT), bO = rnd(0, 9 - aO);
        const a = aH * 100 + aT * 10 + aO;
        const b = bH * 100 + bT * 10 + bO;
        const correct = a + b;
        const dist = [correct + 10, correct - 10, correct + 100];
        return {
            text: `Add (no carrying). What is the sum?`,
            options: u4(correct, dist), correct: String(correct),
            type: 'column3', visualData: { a, b, op: '+' },
            explanation: `${a} + ${b} = ${correct}. Add ones: ${aO}+${bO}=${aO+bO}, tens: ${aT}+${bT}=${aT+bT}, hundreds: ${aH}+${bH}=${aH+bH}.`,
            solution: `Add column by column — ones first, then tens, then hundreds.`
        };
    }
    if (sk === 'GTK-02') {
        // 3-digit addition WITH carrying (ones or tens carry)
        const aO = rnd(5, 9), bO = rnd(5, 9 - aO + 9); // force carry in ones
        const aT = rnd(4, 8), bT = rnd(2, 9 - aT + 5);
        const aH = rnd(1, 4), bH = rnd(1, 4);
        const a = aH * 100 + aT * 10 + aO;
        const b = bH * 100 + bT * 10 + bO;
        const correct = a + b;
        const dist = [correct + 10, correct - 10, correct + 1];
        return {
            text: `Add (with carrying). What is the sum?`,
            options: u4(correct, dist), correct: String(correct),
            type: 'column3', visualData: { a, b, op: '+' },
            explanation: `${a} + ${b} = ${correct}. Ones: ${aO}+${bO}=${aO+bO} — write ${(aO+bO)%10} carry ${Math.floor((aO+bO)/10)}.`,
            solution: `When ones or tens sum ≥ 10, carry 1 to the next column.`
        };
    }
    if (sk === 'GTK-03') {
        // 3-digit subtraction WITHOUT borrowing
        const aH = rnd(3, 9), aT = rnd(3, 9), aO = rnd(3, 9);
        const bH = rnd(1, aH - 1), bT = rnd(1, aT), bO = rnd(0, aO);
        const a = aH * 100 + aT * 10 + aO;
        const b = bH * 100 + bT * 10 + bO;
        const correct = a - b;
        const dist = [correct + 10, correct - 10, correct + 100];
        return {
            text: `Subtract (no borrowing). What is the difference?`,
            options: u4(correct, dist), correct: String(correct),
            type: 'column3', visualData: { a, b, op: '-' },
            explanation: `${a} − ${b} = ${correct}. Subtract ones: ${aO}−${bO}=${aO-bO}, tens: ${aT}−${bT}=${aT-bT}, hundreds: ${aH}−${bH}=${aH-bH}.`,
            solution: `Subtract column by column — ones first, then tens, then hundreds.`
        };
    }
    if (sk === 'GTK-04') {
        // 3-digit subtraction WITH borrowing
        const aH = rnd(3, 9), aT = rnd(2, 8), aO = rnd(0, 4); // small ones so borrow needed
        const bO = rnd(aO + 1, 9); // force borrowing
        const bT = rnd(1, aT);
        const bH = rnd(1, aH - 1);
        const a = aH * 100 + aT * 10 + aO;
        const b = bH * 100 + bT * 10 + bO;
        const correct = a - b;
        const dist = [correct + 10, correct - 10, correct + 1];
        return {
            text: `Subtract (with borrowing). What is the difference?`,
            options: u4(correct, dist), correct: String(correct),
            type: 'column3', visualData: { a, b, op: '-' },
            explanation: `${a} − ${b} = ${correct}. Borrow from tens when ones digit is smaller.`,
            solution: `Borrow 1 from the next column when top digit is smaller than bottom digit.`
        };
    }
    if (sk === 'GTK-05') {
        // Missing addend: a + ___ = total  or  total - b = ___
        const a = rnd(10, 49) * 10; // round hundreds
        const b = rnd(5, 15) * 10;
        const total = a + b;
        const correct = b;
        const dist = [b + 10, b - 10, b + 20];
        return {
            text: `${a} + ___ = ${total}. What is the missing number?`,
            options: u4(correct, dist), correct: String(correct),
            type: 'number-box', visualData: { text: `${a} + ? = ${total}`, highlight: true },
            explanation: `${total} − ${a} = ${correct}. Subtract to find the missing addend.`,
            solution: `Missing addend = total − known number = ${total} − ${a} = ${correct}.`
        };
    }
    if (sk === 'GTK-06') {
        // Mental math with round numbers
        const a = rnd(2, 9) * 100;
        const b = rnd(1, 4) * 100;
        const doAdd = Math.random() < 0.5;
        const correct = doAdd ? a + b : a - b;
        const dist = [correct + 100, correct - 100, correct + 200];
        return {
            text: `Mental math: ${a} ${doAdd ? '+' : '−'} ${b} = ?`,
            options: u4(correct, dist), correct: String(correct),
            type: 'number-box', visualData: { text: `${a} ${doAdd ? '+' : '−'} ${b} = ?` },
            explanation: `${a} ${doAdd ? '+' : '−'} ${b} = ${correct}. Just work with hundreds!`,
            solution: `Round-number mental math: only the hundreds digit changes.`
        };
    }
    if (sk === 'GTK-07') {
        // Word problem: addition or subtraction
        const name = NAMES[Math.floor(Math.random() * NAMES.length)];
        const a = rnd(100, 399);
        const b = rnd(50, 200);
        const doAdd = Math.random() < 0.5;
        const correct = doAdd ? a + b : a - b;
        const dist = [correct + 10, correct - 10, correct + 100];
        const story = doAdd
            ? `${name}'s town has ${a} people. ${b} more people moved in. How many people are there now?`
            : `${name} collected ${a} stamps. She gave away ${b}. How many stamps are left?`;
        return {
            text: story,
            options: u4(correct, dist), correct: String(correct),
            type: 'text-display', visualData: { text: doAdd ? `${a} + ${b} = ?` : `${a} − ${b} = ?` },
            explanation: `${a} ${doAdd ? '+' : '−'} ${b} = ${correct}.`,
            solution: `Identify the operation from the story: "${doAdd ? 'moved in' : 'gave away'}" → ${doAdd ? 'add' : 'subtract'}.`
        };
    }
    if (sk === 'GTK-08') {
        // Check answer: "X says A + B = C. Is X correct?"
        const name = NAMES[Math.floor(Math.random() * NAMES.length)];
        const a = rnd(100, 450);
        const b = rnd(50, 250);
        const realAnswer = a + b;
        const wrongAnswer = realAnswer + (Math.random() < 0.5 ? 10 : -10);
        const isCorrect = Math.random() < 0.5;
        const claimedAnswer = isCorrect ? realAnswer : wrongAnswer;
        const correct = isCorrect ? 'Yes, correct' : 'No, incorrect';
        const opts = shuffle(['Yes, correct', 'No, incorrect', 'Cannot say', 'Need more info']);
        return {
            text: `${name} says ${a} + ${b} = ${claimedAnswer}. Is ${name} correct?`,
            options: opts, correct,
            type: 'text-display', visualData: { text: `${a} + ${b} = ${claimedAnswer}?` },
            explanation: `${a} + ${b} = ${realAnswer}. ${name} said ${claimedAnswer}. ${isCorrect ? 'That is correct!' : `That is wrong — the answer is ${realAnswer}.`}`,
            solution: `Always verify by adding: ${a} + ${b} = ${realAnswer}.`
        };
    }
    return null;
};

/* ─── Main Component ─── */

const GiveAndTakeCh12 = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === 'GTK-TEST';
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
        for (const gradeKey of Object.keys(TOPIC_CONFIGS)) {
            const gradeConfig = TOPIC_CONFIGS[gradeKey];
            for (const [topicName, skills] of Object.entries(gradeConfig)) {
                const skill = skills.find(s => s.id === skillId);
                if (skill) return { topicName, skillName: skill.name, grade: gradeKey };
            }
        }
        return { topicName: 'Give and Take', skillName: '3-Digit Addition & Subtraction', grade: '3' };
    };

    const getNextSkill = () => {
        const { grade } = getTopicInfo();
        const gradeConfig = TOPIC_CONFIGS[grade];
        if (!gradeConfig) return null;
        const topics = Object.keys(gradeConfig);
        let currentTopicIdx = -1, currentSkillIdx = -1;
        for (let i = 0; i < topics.length; i++) {
            const skills = gradeConfig[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) { currentTopicIdx = i; currentSkillIdx = idx; break; }
        }
        if (currentTopicIdx === -1) return null;
        const currentTopicSkills = gradeConfig[topics[currentTopicIdx]];
        if (currentSkillIdx < currentTopicSkills.length - 1) return { ...currentTopicSkills[currentSkillIdx + 1], topicName: topics[currentTopicIdx] };
        if (currentTopicIdx < topics.length - 1) {
            const nextTopicName = topics[currentTopicIdx + 1];
            const nextTopicSkills = gradeConfig[nextTopicName];
            if (nextTopicSkills.length > 0) return { ...nextTopicSkills[0], topicName: nextTopicName };
        }
        return null;
    };

    const { topicName, skillName } = getTopicInfo();

    const generateQuestions = (selectedSkill) => {
        const skillCycle = isTest
            ? Array.from({ length: 10 }, (_, i) => ALL_SKILLS[i % ALL_SKILLS.length])
            : Array(5).fill(selectedSkill);

        const questions = [];
        const usedTexts = new Set();
        let attempts = 0;

        while (questions.length < totalQuestions && attempts < 300) {
            attempts++;
            const sk = skillCycle[questions.length] || selectedSkill;
            const q = generateSingleQuestion(sk);
            if (!q) continue;
            const key = q.text + '|' + q.correct;
            if (usedTexts.has(key)) continue;
            const uniqueOpts = [...new Set(q.options.map(String))];
            if (uniqueOpts.length < 4) continue;
            usedTexts.add(key);
            questions.push({ ...q, options: uniqueOpts });
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            const userId = user?.user_id || user?.id;
            if (!userId) return;
            const qs = generateQuestions(skillId);
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(userId, 0);
                setSessionId(session?.session_id);
            } catch (e) { console.error(e); }
        };
        init();
    }, [user, skillId]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let interval;
        if (!showResults && sessionQuestions.length > 0) {
            interval = setInterval(() => setTimer(v => v + 1), 1000);
        }
        return () => clearInterval(interval);
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

    const handleOptionSelect = (option) => { if (isAnswered) return; setSelectedOption(option); };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;
        setIsAnswered(true);
        const isCorrect = String(option) === String(sessionQuestions[qIndex].correct);
        if (isCorrect) setScore(s => s + 1);
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option, isCorrect,
                type: sessionQuestions[qIndex].type,
                visualData: sessionQuestions[qIndex].visualData,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: sessionQuestions[qIndex].explanation || ''
            }
        }));
        if (!isTest) setShowExplanationModal(true);
        else setTimeout(() => handleNext(), 800);
    };

    const handleSkip = () => {
        if (isAnswered) return;
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped', isCorrect: false,
                type: sessionQuestions[qIndex].type,
                visualData: sessionQuestions[qIndex].visualData,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: sessionQuestions[qIndex].explanation
            }
        }));
        handleNext();
    };

    const handleNext = async () => {
        if (qIndex < totalQuestions - 1) { setQIndex(v => v + 1); }
        else {
            setShowResults(true);
            try {
                if (sessionId) {
                    await api.finishSession(sessionId);
                    await api.createReport({
                        uid: user?.id || 'unknown',
                        category: 'Practice',
                        reportData: {
                            skill_id: skillId, skill_name: skillName,
                            score: Math.round((score / totalQuestions) * 100),
                            total_questions: totalQuestions, correct_answers: score,
                            time_spent: timer, timestamp: new Date().toISOString(),
                            answers: Object.values(answers).filter(a => a !== undefined)
                        }
                    });
                }
            } catch (e) { console.error(e); }
        }
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (sessionQuestions.length === 0) return <div className="grade3-practice-page"><div className="g3-loading-blob" /></div>;

    if (showResults) {
        const percentage = Math.round((score / totalQuestions) * 100);
        return (
            <div className="grade3-practice-page results-view overflow-y-auto">
                <Navbar />
                <header className="results-header">
                    <h1 className="results-title">Adventure Report</h1>
                    <div className="exit-container"><StickerExit onClick={handleExit} /></div>
                </header>
                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Adventure Complete! 🎉</h2>
                        <div className="stars-container">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className="star-wrapper">
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid">
                            <div className="stat-card"><span className="stat-label">Correct</span><span className="stat-value-large">{score}/{totalQuestions}</span></div>
                            <div className="stat-card"><span className="stat-label">Time</span><span className="stat-value-large">{formatTime(timer)}</span></div>
                            <div className="stat-card"><span className="stat-label">Accuracy</span><span className="stat-value-large">{percentage}%</span></div>
                            <div className="stat-card"><span className="stat-label">Score</span><span className="stat-value-large">{score * 10}</span></div>
                        </div>
                    </div>
                    <div className="practice-summary" style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                            {Object.values(answers).map((ans, idx) => (
                                <motion.div key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.1 }}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', background: ans.isCorrect ? '#C6F6D5' : '#FED7D7', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                    {ans.isCorrect ? '✅' : '❌'}
                                </motion.div>
                            ))}
                        </div>
                        <p style={{ fontSize: '1.3rem', fontWeight: 400, color: '#4A5568', marginBottom: '10px' }}>
                            {percentage >= 80 ? '🌟 Amazing work! Keep it up!' : percentage >= 60 ? '💪 Good effort! Keep practicing!' : '🌱 Nice try! Practice makes perfect!'}
                        </p>
                    </div>
                    <div className="results-actions">
                        <button className="action-btn-large retake-skill-btn" onClick={() => window.location.reload()}><RefreshCw size={24} /> Retake Skill</button>
                        {getNextSkill() && (
                            <button className="action-btn-large next-skill-btn" onClick={() => { const next = getNextSkill(); navigate(`/junior/grade/3/${next.route}?skillId=${next.id}`); window.location.reload(); }}>
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
            <div className="g3-bg-blobs"><div className="blob blob-1"></div><div className="blob blob-2"></div><div className="blob blob-3"></div></div>
            <div className="g3-practice-container">
                <div className="g3-header-nav">
                    <div className="g3-timer-badge"><Timer size={18} />{formatTime(timer)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>Q {qIndex + 1}/{totalQuestions}</span>
                        <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem' }}><LatexText text={skillName} /></span>
                    </div>
                    {isTest && (<button className="g3-skip-btn" onClick={handleSkip} disabled={isAnswered}>Skip Quest ⏭️</button>)}
                    <div style={{ marginLeft: 'auto' }}><StickerExit onClick={handleExit} /></div>
                </div>
                <div className="g3-progress-container" style={{ margin: '0 0 10px 0' }}>
                    <div className="g3-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
                <div style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
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
                        <button className="g3-nav-btn prev-btn" onClick={() => { if (qIndex > 0) setQIndex(qIndex - 1); }} disabled={qIndex === 0}><ChevronLeft size={24} /> Prev</button>
                        <div>
                            {isAnswered && !isTest && !answers[qIndex]?.isCorrect && (<button className="g3-nav-btn steps-btn" onClick={() => setShowExplanationModal(true)}><Eye size={24} /> Steps</button>)}
                            {!isAnswered
                                ? (<button className="g3-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>Check Answer <ChevronRight size={24} /></button>)
                                : (<button className="g3-nav-btn next-btn" onClick={handleNext}>{qIndex === totalQuestions - 1 ? (isTest ? 'Finish Test' : 'Finish') : 'Next Question'} <ChevronRight size={24} /></button>)}
                        </div>
                    </div>
                </motion.div>
            </div>
            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={answers[qIndex]?.isCorrect}
                correctAnswer={currentQ.correct}
                explanation={currentQ.explanation}
                solution={currentQ.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => { setShowExplanationModal(false); handleNext(); }}
            />
        </div>
    );
};

export default GiveAndTakeCh12;

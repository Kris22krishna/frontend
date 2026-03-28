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

const ContainerSVG = ({ label, fillPct, color }) => {
    const pct = Math.max(5, Math.min(95, fillPct));
    const h = 100, w = 50;
    const fillH = (pct / 100) * h;
    const fillY = h - fillH;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <svg width={w + 20} height={h + 30} viewBox={`0 0 ${w + 20} ${h + 30}`}>
                {/* Container body */}
                <rect x={10} y={0} width={w} height={h} rx={6} fill="white" stroke="#CBD5E0" strokeWidth={2} />
                {/* Fill */}
                <rect x={10} y={fillY} width={w} height={fillH} rx={4} fill={color || '#4ECDC4'} fillOpacity={0.7} />
                {/* Outline over fill */}
                <rect x={10} y={0} width={w} height={h} rx={6} fill="none" stroke="#CBD5E0" strokeWidth={2} />
                {/* Percentage label */}
                <text x={w / 2 + 10} y={h / 2 + 5} textAnchor="middle" fontSize={13} fill="#31326F" fontWeight="700">{pct}%</text>
                {/* Base */}
                <rect x={5} y={h} width={w + 10} height={6} rx={3} fill="#CBD5E0" />
            </svg>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#31326F' }}>{label}</span>
        </div>
    );
};

const TwoContainersFill = ({ label1, fill1, label2, fill2 }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ display: 'flex', alignItems: 'flex-end', gap: 30, justifyContent: 'center', padding: '20px 16px', background: 'white', borderRadius: 20, boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
        <ContainerSVG label={label1} fillPct={fill1} color="#4ECDC4" />
        <ContainerSVG label={label2} fillPct={fill2} color="#FF6B6B" />
    </motion.div>
);

const BalanceScaleSVG = ({ leftLabel, rightLabel, tilt }) => {
    // tilt: 'left' (left is heavier), 'right' (right is heavier), 'level'
    const leftY = tilt === 'left' ? 80 : tilt === 'right' ? 60 : 70;
    const rightY = tilt === 'right' ? 80 : tilt === 'left' ? 60 : 70;
    return (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ textAlign: 'center', padding: '12px 16px', background: 'white', borderRadius: 20, boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
            <svg viewBox="0 0 220 130" width="220" height="130">
                {/* Stand */}
                <rect x={105} y={110} width={10} height={18} rx={2} fill="#9575CD" />
                <rect x={90} y={124} width={40} height={6} rx={3} fill="#9575CD" />
                {/* Pivot */}
                <circle cx={110} cy={30} r={6} fill="#7C6AF7" />
                {/* Beam (rotated by tilt) */}
                <line x1={110} y1={30} x2={110} y2={108} stroke="#9575CD" strokeWidth={3} />
                <line x1={30} y1={tilt === 'left' ? 60 : tilt === 'right' ? 40 : 50}
                      x2={190} y2={tilt === 'right' ? 60 : tilt === 'left' ? 40 : 50}
                      stroke="#7C6AF7" strokeWidth={3} />
                {/* Left pan cord */}
                <line x1={30} y1={tilt === 'left' ? 60 : tilt === 'right' ? 40 : 50} x2={30} y2={leftY} stroke="#B39DDB" strokeWidth={2} />
                {/* Left pan */}
                <ellipse cx={30} cy={leftY + 5} rx={22} ry={7} fill="#FF6B6B" fillOpacity={0.4} stroke="#FF6B6B" strokeWidth={2} />
                <text x={30} y={leftY + 9} textAnchor="middle" fontSize={11} fill="#C62828" fontWeight="700">{leftLabel}</text>
                {/* Right pan cord */}
                <line x1={190} y1={tilt === 'right' ? 60 : tilt === 'left' ? 40 : 50} x2={190} y2={rightY} stroke="#B39DDB" strokeWidth={2} />
                {/* Right pan */}
                <ellipse cx={190} cy={rightY + 5} rx={22} ry={7} fill="#4ECDC4" fillOpacity={0.4} stroke="#4ECDC4" strokeWidth={2} />
                <text x={190} y={rightY + 9} textAnchor="middle" fontSize={11} fill="#00695C" fontWeight="700">{rightLabel}</text>
            </svg>
        </motion.div>
    );
};

const TextBox = ({ text }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ fontSize: '1.1rem', color: '#31326F', background: 'rgba(124,106,247,0.08)', borderRadius: 16, padding: '18px 22px', fontFamily: 'Nunito, sans-serif', lineHeight: 1.7, maxWidth: '320px', margin: '0 auto', textAlign: 'center', fontWeight: 600, border: '2px dashed #A78BFA' }}>
        {text}
    </motion.div>
);

const DynamicVisual = ({ type, data }) => {
    if (type === 'containers') return <TwoContainersFill label1={data.label1} fill1={data.fill1} label2={data.label2} fill2={data.fill2} />;
    if (type === 'balance') return <BalanceScaleSVG leftLabel={data.left} rightLabel={data.right} tilt={data.tilt} />;
    if (type === 'text-display') return <TextBox text={data.text} />;
    return null;
};

/* ─── Helpers ─── */

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/** Build exactly 4 unique string options */
const u4 = (correct, distractors) => {
    const s = new Set([String(correct)]);
    const d = distractors.map(String).filter(v => !s.has(v) && (s.add(v), true));
    let pad = 1;
    while (d.length < 3) {
        const candidate = String(Number(correct) + pad * 3);
        if (!s.has(candidate)) { s.add(candidate); d.push(candidate); }
        pad++;
    }
    return shuffle([String(correct), ...d.slice(0, 3)]);
};

const ALL_SKILLS = ['FAL-01', 'FAL-02', 'FAL-03', 'FAL-04', 'FAL-05', 'FAL-06'];

/* ─── Question Generator ─── */

const CONTAINERS = [
    { name: 'bucket', emoji: '🪣' }, { name: 'jug', emoji: '🫙' }, { name: 'mug', emoji: '☕' },
    { name: 'bottle', emoji: '🍶' }, { name: 'pot', emoji: '🍯' }, { name: 'bowl', emoji: '🥣' },
    { name: 'tank', emoji: '🛢️' }, { name: 'glass', emoji: '🥛' },
];

const HEAVY_PAIRS = [
    ['elephant', 'mouse'], ['brick', 'leaf'], ['watermelon', 'grape'],
    ['iron', 'feather'], ['book', 'eraser'], ['stone', 'cotton'],
    ['chair', 'pencil'], ['bag', 'button'],
];

const generateSingleQuestion = (sk) => {
    if (sk === 'FAL-01') {
        // Compare capacity using fill percentage
        const fill1 = Math.floor(Math.random() * 40) + 50; // 50–89
        const fill2 = Math.floor(Math.random() * 35) + 10; // 10–44
        const swapped = Math.random() < 0.5;
        const labelA = CONTAINERS[Math.floor(Math.random() * 4)].name;
        let labelB;
        do { labelB = CONTAINERS[Math.floor(Math.random() * 4 + 4)].name; } while (labelB === labelA);
        const [l1, l2, f1, f2] = swapped ? [labelB, labelA, fill2, fill1] : [labelA, labelB, fill1, fill2];
        const correct = f1 > f2 ? l1 : l2;
        const opts = u4(correct, [f1 > f2 ? l2 : l1, 'They hold the same', f1 > f2 ? l1 + ' & ' + l2 : l2]);
        return {
            text: `Which container holds MORE?`,
            options: opts, correct,
            type: 'containers',
            visualData: { label1: l1, fill1: f1, label2: l2, fill2: f2 },
            explanation: `The ${correct} is filled more (${Math.max(f1, f2)}%) so it holds more.`,
            solution: `Look at the fill level — the higher level means more liquid.`
        };
    }
    if (sk === 'FAL-02') {
        // Compare weight on balance scale
        const pair = HEAVY_PAIRS[Math.floor(Math.random() * HEAVY_PAIRS.length)];
        const [heavier, lighter] = Math.random() < 0.5 ? [pair[0], pair[1]] : [pair[0], pair[1]];
        const correct = heavier;
        const opts = u4(correct, [lighter, 'They weigh the same', 'Cannot say']);
        return {
            text: `Which is HEAVIER?`,
            options: opts, correct,
            type: 'balance',
            visualData: { left: heavier, right: lighter, tilt: 'left' },
            explanation: `A ${heavier} is heavier than a ${lighter}.`,
            solution: `The heavier side on the balance goes down.`
        };
    }
    if (sk === 'FAL-03') {
        // Estimate cups to fill a container
        const data = [
            { container: 'bucket', cups: 20 }, { container: 'pot', cups: 12 },
            { container: 'jug', cups: 8 }, { container: 'glass', cups: 2 },
            { container: 'bowl', cups: 4 }, { container: 'tank', cups: 30 },
        ];
        const pick = data[Math.floor(Math.random() * data.length)];
        const correct = pick.cups;
        const dist = [correct - 4, correct + 4, correct + 8].map(v => Math.max(1, v));
        const opts = u4(correct, dist);
        return {
            text: `About how many cups of water fill a ${pick.container}?`,
            options: opts, correct: String(correct),
            type: 'text-display',
            visualData: { text: `🥛 cups → ${pick.container} ?` },
            explanation: `A ${pick.container} holds about ${correct} cups.`,
            solution: `Bigger containers hold more cups.`
        };
    }
    if (sk === 'FAL-04') {
        // Add two capacities
        const a = (Math.floor(Math.random() * 5) + 1) * 2; // 2,4,6,8,10
        const b = (Math.floor(Math.random() * 5) + 1) * 2;
        const correct = a + b;
        const dist = [correct - 2, correct + 2, correct - 4];
        const opts = u4(correct, dist);
        return {
            text: `A jug holds ${a} litres and a pot holds ${b} litres. Together they hold ___  litres.`,
            options: opts, correct: String(correct),
            type: 'text-display',
            visualData: { text: `🫙 ${a}L  +  🍯 ${b}L  =  ?` },
            explanation: `${a} + ${b} = ${correct} litres.`,
            solution: `Add the two amounts: ${a} + ${b} = ${correct}.`
        };
    }
    if (sk === 'FAL-05') {
        // Order three objects by weight
        const orderings = [
            { items: ['feather', 'apple', 'brick'], answer: 'feather, apple, brick' },
            { items: ['leaf', 'mango', 'stone'], answer: 'leaf, mango, stone' },
            { items: ['cotton', 'orange', 'iron'], answer: 'cotton, orange, iron' },
            { items: ['eraser', 'book', 'chair'], answer: 'eraser, book, chair' },
            { items: ['button', 'pencil', 'bag'], answer: 'button, pencil, bag' },
        ];
        const pick = orderings[Math.floor(Math.random() * orderings.length)];
        const correct = pick.answer;
        const wrong1 = `${pick.items[2]}, ${pick.items[0]}, ${pick.items[1]}`;
        const wrong2 = `${pick.items[1]}, ${pick.items[2]}, ${pick.items[0]}`;
        const wrong3 = `${pick.items[2]}, ${pick.items[1]}, ${pick.items[0]}`;
        const opts = shuffle([correct, wrong1, wrong2, wrong3]);
        return {
            text: `Arrange from LIGHTEST to HEAVIEST.`,
            options: opts, correct,
            type: 'text-display',
            visualData: { text: `⚖️ ${pick.items.join('  |  ')}` },
            explanation: `Lightest to heaviest: ${correct}.`,
            solution: `Think about which objects are naturally heavier.`
        };
    }
    if (sk === 'FAL-06') {
        // Balance scale: multiply
        const apples = Math.floor(Math.random() * 3) + 2; // 2–4
        const kgPerApple = 0; // skip — use whole number
        const applesPerKg = Math.floor(Math.random() * 3) + 2; // 2–4
        const kg = Math.floor(Math.random() * 3) + 2; // 2–4
        const correct = applesPerKg * kg;
        const dist = [correct - applesPerKg, correct + applesPerKg, correct - 1];
        const opts = u4(correct, dist);
        return {
            text: `If ${applesPerKg} apples balance 1 kg, how many apples balance ${kg} kg?`,
            options: opts, correct: String(correct),
            type: 'balance',
            visualData: { left: `${kg} kg`, right: `? apples`, tilt: 'level' },
            explanation: `${applesPerKg} apples = 1 kg. So ${kg} kg = ${applesPerKg} × ${kg} = ${correct} apples.`,
            solution: `Multiply: ${applesPerKg} × ${kg} = ${correct}.`
        };
    }
    return null;
};

/* ─── Main Component ─── */

const FillingAndLifting = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === 'FAL-TEST';
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
        return { topicName: 'Filling and Lifting', skillName: 'Capacity & Weight', grade: '3' };
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

export default FillingAndLifting;

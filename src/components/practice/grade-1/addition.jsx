import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../services/api';
import Navbar from '../../Navbar';
import { TOPIC_CONFIGS } from '../../../lib/topicConfig';
import { LatexText } from '../../LatexText';
import ExplanationModal from '../../ExplanationModal';
import StickerExit from '../../StickerExit';
import mascotImg from '../../../assets/mascot.png';
import avatarImg from '../../../assets/avatar.png';
import '../../../pages/juniors/class-1/Grade1Practice.css';

const NumberLine = ({ n1, n2, color1, color2 }) => {
    const totalTicks = 10;
    const width = 600;
    const height = 150;
    const padding = 50;
    const tickSpacing = (width - 2 * padding) / totalTicks;

    const getX = (val) => padding + val * tickSpacing;
    const baseY = 100;

    // First jump from 0 to n1
    const arc1 = `M ${getX(0)} ${baseY} Q ${(getX(0) + getX(n1)) / 2} ${baseY - 70} ${getX(n1)} ${baseY}`;

    // Small jumps for n2
    const arcs2 = [];
    for (let i = 0; i < n2; i++) {
        const start = n1 + i;
        const end = n1 + i + 1;
        arcs2.push(`M ${getX(start)} ${baseY} Q ${(getX(start) + getX(end)) / 2} ${baseY - 30} ${getX(end)} ${baseY}`);
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="number-line-visual" style={{ width: '100%', overflow: 'visible' }}>
            <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', maxWidth: '600px', filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.05))' }}>
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#4a5568" />
                    </marker>
                </defs>

                {/* Main Line with Arrow */}
                <line x1={padding - 30} y1={baseY} x2={width - padding + 30} y2={baseY} stroke="#cbd5e0" strokeWidth="3" strokeLinecap="round" />
                <path d={`M ${width - padding + 30} ${baseY} L ${width - padding + 40} ${baseY}`} stroke="#cbd5e0" strokeWidth="3" markerEnd="url(#arrowhead)" />

                {/* Ticks and Numbers */}
                {Array.from({ length: totalTicks + 1 }).map((_, i) => (
                    <g key={i}>
                        <line x1={getX(i)} y1={baseY - 8} x2={getX(i)} y2={baseY + 8} stroke="#4a5568" strokeWidth="2" />
                        <text x={getX(i)} y={baseY + 28} textAnchor="middle" fontSize="14" fill="#64748b" fontWeight="700">{i}</text>
                    </g>
                ))}

                {/* First Jump Animation */}
                {n1 > 0 && (
                    <>
                        <motion.path
                            d={arc1}
                            fill="none"
                            stroke={color1}
                            strokeWidth="4"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        <motion.circle
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8 }}
                            cx={getX(n1)} cy={baseY} r="5" fill={color1}
                        />
                    </>
                )}

                {/* Second Jumps (n2) */}
                {arcs2.map((d, i) => (
                    <motion.path
                        key={i}
                        d={d}
                        fill="none"
                        stroke={color2}
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 + i * 0.3 }}
                    />
                ))}
            </svg>
        </motion.div>
    );
};

const DynamicVisual = ({ type, data }) => {
    if (type === 'numberline') {
        return <NumberLine {...data} />;
    }
    if (type === 'visual') {
        const { n1, n2, color1, color2 } = data;
        return (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="g1-addition-visual">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(5px, 3vw, 20px)', justifyContent: 'center' }}>
                    <div className="g1-group" style={{ background: 'rgba(255,255,255,0.4)', padding: '15px', borderRadius: '25px' }}>
                        <svg width="100%" height="100%" style={{ maxWidth: '100px', maxHeight: '100px' }} viewBox="0 0 100 100">
                            {Array.from({ length: n1 }).map((_, i) => (
                                <circle key={i} cx={(i % 3) * 30 + 20} cy={Math.floor(i / 3) * 30 + 20} r="12" fill={color1} />
                            ))}
                        </svg>
                    </div>
                    <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 400, color: '#CBD5E0' }}>+</div>
                    <div className="g1-group" style={{ background: 'rgba(255,255,255,0.4)', padding: '15px', borderRadius: '25px' }}>
                        <svg width="100%" height="100%" style={{ maxWidth: '100px', maxHeight: '100px' }} viewBox="0 0 100 100">
                            {Array.from({ length: n2 }).map((_, i) => (
                                <circle key={i} cx={(i % 3) * 30 + 20} cy={Math.floor(i / 3) * 30 + 20} r="12" fill={color2} />
                            ))}
                        </svg>
                    </div>
                </div>
            </motion.div>
        );
    }
    if (type === 'numeric' || type === 'word') {
        const { n1, n2, color1, color2 } = data;
        return (
            <div className="g1-numeric-card" style={{ display: 'flex', gap: 'clamp(5px, 3vw, 20px)', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="g1-num-box" style={{ background: color1 + '20', color: color1 }}>{n1}</motion.div>
                <div style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 400, color: '#CBD5E0' }}>+</div>
                <motion.div initial={{ y: 20 }} animate={{ y: 0, transition: { delay: 0.1 } }} className="g1-num-box" style={{ background: color2 + '20', color: color2 }}>{n2}</motion.div>
                <div style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 400, color: '#CBD5E0' }}>=</div>
                <div className="g1-num-box" style={{ background: '#f0f0f0', border: '3px solid #cbd5e0', color: '#cbd5e0' }}>?</div>
            </div>
        );
    }
    return null;
};

const Addition = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === '304';
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
        const grade1Config = TOPIC_CONFIGS['1'];
        // Find current grade and skill info
        for (const gradeKey of Object.keys(TOPIC_CONFIGS)) {
            const gradeConfig = TOPIC_CONFIGS[gradeKey];
            for (const [topicName, skills] of Object.entries(gradeConfig)) {
                const skill = skills.find(s => s.id === skillId);
                if (skill) return { topicName, skillName: skill.name, grade: gradeKey };
            }
        }
        return { topicName: 'Addition', skillName: 'Mathematics', grade: '1' };
    };

    const getNextSkill = () => {
        const { grade } = getTopicInfo();
        const gradeConfig = TOPIC_CONFIGS[grade];
        const topics = Object.keys(gradeConfig);

        let currentTopicIdx = -1;
        let currentSkillIdx = -1;

        for (let i = 0; i < topics.length; i++) {
            const skills = gradeConfig[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) {
                currentTopicIdx = i;
                currentSkillIdx = idx;
                break;
            }
        }

        if (currentTopicIdx === -1) return null;

        const currentTopicSkills = gradeConfig[topics[currentTopicIdx]];

        // If there's another skill in the same topic
        if (currentSkillIdx < currentTopicSkills.length - 1) {
            return {
                ...currentTopicSkills[currentSkillIdx + 1],
                topicName: topics[currentTopicIdx]
            };
        }

        // If it's the last skill in the topic, go to the first skill of the next topic
        if (currentTopicIdx < topics.length - 1) {
            const nextTopicName = topics[currentTopicIdx + 1];
            const nextTopicSkills = gradeConfig[nextTopicName];
            if (nextTopicSkills.length > 0) {
                return {
                    ...nextTopicSkills[0],
                    topicName: nextTopicName
                };
            }
        }

        return null; // No more skills
    };

    const { topicName, skillName } = getTopicInfo();
    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'].sort(() => 0.5 - Math.random());

        // Pre-shuffled pools for uniqueness (mostly used in practice, but good for test variety too)
        const visualPairs = [[1, 2], [2, 1], [3, 2], [2, 3], [4, 1], [1, 4], [3, 3], [5, 2], [2, 5], [4, 3]].sort(() => 0.5 - Math.random());
        const numericPairs = [[6, 2], [3, 5], [4, 4], [7, 1], [2, 7], [1, 8], [5, 4], [3, 6], [2, 2], [9, 0]].sort(() => 0.5 - Math.random());

        for (let i = 0; i < totalQuestions; i++) {
            let question = {};
            const color1 = colors[i % colors.length];
            const color2 = colors[(i + 1) % colors.length];

            let typeToGen = 'visual';
            if (isTest) {
                // Balanced test: 3 Visual, 3 Numeric, 3 Number Line, 1 Zero
                if (i < 3) typeToGen = 'visual';
                else if (i < 6) typeToGen = 'numeric';
                else if (i < 9) typeToGen = 'numberline';
                else typeToGen = 'zero';
            } else {
                if (selectedSkill === '301' || !selectedSkill) typeToGen = 'visual';
                else if (selectedSkill === '302') typeToGen = 'numeric';
                else if (skillId === '303') typeToGen = 'numberline';
            }

            if (typeToGen === 'visual') {
                let n1, n2;
                if (isTest) {
                    [n1, n2] = visualPairs[i % visualPairs.length];
                } else {
                    n1 = Math.floor(Math.random() * 5) + 1;
                    n2 = Math.floor(Math.random() * 4) + 1;
                }
                question = {
                    text: `Count all the circles together! 🍭`,
                    options: [n1 + n2, (n1 + n2 + 1) % 11 || 1, Math.max(1, n1 + n2 - 1)].filter((v, idx, self) => self.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                    correct: n1 + n2,
                    type: 'visual',
                    visualData: { n1, n2, color1, color2 },
                    explanation: `We have ${n1} circles and ${n2} more circles. Counting them all gives us ${n1 + n2}.`,
                    solution: `${n1} + ${n2} = ${n1 + n2}`
                };
            } else if (typeToGen === 'numeric') {
                let n1, n2;
                if (isTest) {
                    [n1, n2] = numericPairs[i % numericPairs.length];
                } else {
                    n1 = Math.floor(Math.random() * 9) + 1;
                    n2 = Math.floor(Math.random() * (10 - n1));
                }
                question = {
                    text: `What is ${n1} plus ${n2}? ➕`,
                    options: [n1 + n2, n1 + n2 + 2, Math.max(0, n1 + n2 - 1)].filter((v, idx, self) => self.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                    correct: n1 + n2,
                    type: 'numeric',
                    visualData: { n1, n2, color1, color2 },
                    explanation: `Starting from ${n1}, if we count forward ${n2} times, we reach ${n1 + n2}.`,
                    solution: `${n1} + ${n2} = ${n1 + n2}`
                };
            } else if (typeToGen === 'numberline' || typeToGen === 'zero') {
                let n1, n2;
                if (typeToGen === 'numberline') {
                    if (isTest) {
                        n1 = Math.floor(Math.random() * 6) + 1;
                        n2 = Math.floor(Math.random() * (10 - n1)) + 1;
                    } else {
                        n1 = Math.floor(Math.random() * 6) + 1;
                        n2 = Math.floor(Math.random() * (10 - n1)) + 1;
                    }
                    question = {
                        text: `Use the number line to find: ${n1} + ${n2}`,
                        options: [n1 + n2, n1 + n2 + 1, Math.max(0, n1 + n2 - 1)].filter((v, idx, self) => self.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                        correct: n1 + n2,
                        type: 'numberline',
                        visualData: { n1, n2, color1, color2 },
                        explanation: `Starting at ${n1}, we take ${n2} hops forward on the number line to reach ${n1 + n2}.`,
                        solution: `${n1} + ${n2} = ${n1 + n2}`
                    };
                } else {
                    const val = Math.floor(Math.random() * 9) + 1;
                    const withZeroFirst = Math.random() > 0.5;
                    const z1 = withZeroFirst ? 0 : val;
                    const z2 = withZeroFirst ? val : 0;
                    question = {
                        text: `Add zero to the number! ✨`,
                        options: [val, 0, val + 1].sort(() => 0.5 - Math.random()),
                        correct: val,
                        type: 'numeric',
                        visualData: { n1: z1, n2: z2, color1, color2 },
                        explanation: `Adding zero to any number doesn't change it. So ${z1} + ${z2} is still ${val}.`,
                        solution: `${z1} + ${z2} = ${val}`
                    };
                }
            } else {
                question = { text: "Add them up!", options: ["2"], correct: "2", type: "numeric", visualData: { n1: 1, n2: 1, color1, color2 }, explanation: "Simple addition!" };
            }
            questions.push(question);
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
                const session = await api.createPracticeSession(userId, parseInt(skillId) || 301);
                setSessionId(session?.session_id);
            } catch (e) { console.error(e); }
        };
        init();
    }, [user, skillId]);

    useEffect(() => {
        let interval;
        if (!showResults && sessionQuestions.length > 0) {
            interval = setInterval(() => setTimer(v => v + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [showResults, sessionQuestions]);

    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    useEffect(() => {
        if (answers[qIndex]) {
            setSelectedOption(answers[qIndex].selectedOption);
            setIsAnswered(true);
        } else {
            setSelectedOption(null);
            setIsAnswered(false);
        }
    }, [qIndex, answers]);

    const handleExit = async () => {
        try {
            if (sessionId) {
                await api.finishSession(sessionId);
            }
        } catch (e) {
            console.error("Error finishing session:", e);
        }
        navigate('/junior/grade/1');
    };

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };


    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;

        setIsAnswered(true);
        const isCorrect = option === sessionQuestions[qIndex].correct;
        // --- AUTO-INJECTED LOGGING ---
        try {
            const uid = user?.user_id || user?.id || sessionStorage.getItem('userId') || localStorage.getItem('userId');
            const qData = sessionQuestions[qIndex] || {};
            const skId = typeof selectedSkill !== 'undefined' ? selectedSkill : (typeof skillId !== 'undefined' ? skillId : '0');
            const currentTimer = typeof timer !== 'undefined' ? timer : 0;

            if (uid && sessionId) {
                api.recordAttempt({
                    user_id: parseInt(uid, 10),
                    session_id: sessionId,
                    skill_id: parseInt(skId, 10) || 0,
                    template_id: null,
                    difficulty_level: 'Medium',
                    question_text: String(qData.text || ''),
                    correct_answer: String(qData.correct || qData.correctAnswer || ''),
                    student_answer: String(option),
                    is_correct: isCorrect,
                    solution_text: String(qData.explanation || qData.solution || ''),
                    time_spent_seconds: currentTimer
                }).catch(err => console.error("Auto-log failed:", err));
            }
        } catch (err) {
            console.error("Auto-log error:", err);
        }
        // -----------------------------

        if (isCorrect) {
            setScore(s => s + 1);
        }

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option,
                isCorrect,
                type: sessionQuestions[qIndex].type,
                visualData: sessionQuestions[qIndex].visualData,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: sessionQuestions[qIndex].explanation || "Here is the explanation."
            }
        }));

        // Show modal for all answers in practice mode
        if (!isTest) {
            setShowExplanationModal(true);
        } else {
            // Give a tiny delay so they see the option highlight green
            setTimeout(() => {
                handleNext();
            }, 800);
        }
    };

    const handleSkip = () => {
        if (isAnswered) return;
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped',
                isCorrect: false,
                type: sessionQuestions[qIndex].type,
                visualData: sessionQuestions[qIndex].visualData,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: "This question was skipped. " + sessionQuestions[qIndex].explanation
            }
        }));
        handleNext();
    };

    const handleNext = async () => {
        if (qIndex < totalQuestions - 1) {
            setQIndex(v => v + 1);
        } else {
            setShowResults(true);
            try {
                if (sessionId) {
                    await api.finishSession(sessionId);
                    await api.createReport({
                        uid: user?.id || 'unknown',
                        category: 'Practice',
                        reportData: {
                            skill_id: skillId,
                            skill_name: skillName,
                            score: Math.round((score / totalQuestions) * 100),
                            total_questions: totalQuestions,
                            correct_answers: score,
                            time_spent: timer,
                            timestamp: new Date().toISOString(),
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

    if (sessionQuestions.length === 0) return <div className="grade1-practice-page"><div className="g1-loading-blob" /></div>;

    if (showResults) {
        const percentage = Math.round((score / totalQuestions) * 100);
        return (
            <div className="grade1-practice-page results-view overflow-y-auto">
                <Navbar />
                <header className="results-header">
                    <h1 className="results-title">Adventure Report</h1>
                    <div className="exit-container">
                        <StickerExit onClick={handleExit} />
                    </div>
                </header>

                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Adventure Complete! 🎉</h2>

                        <div className="stars-container">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="star-wrapper"
                                >
                                    <Star
                                        size={60}
                                        fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"}
                                        color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <div className="results-stats-grid">
                            <div className="stat-card">
                                <span className="stat-label">Correct</span>
                                <span className="stat-value-large">{score}/{totalQuestions}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Time</span>
                                <span className="stat-value-large">{formatTime(timer)}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Accuracy</span>
                                <span className="stat-value-large">{percentage}%</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Score</span>
                                <span className="stat-value-large">{score * 10}</span>
                            </div>
                        </div>
                    </div>

                    {isTest ? (
                        <div className="detailed-breakdown">
                            <h3 className="breakdown-title">Quest Log 📜</h3>
                            <div className="quest-log-list">
                                {sessionQuestions.map((q, idx) => {
                                    const ans = answers[idx];
                                    if (!ans) return null;
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="quest-log-item"
                                        >
                                            <div className={`log-number ${!ans.isCorrect ? 'wrong' : ''}`}>
                                                {idx + 1}
                                            </div>
                                            <div className="log-content">
                                                <div className="log-question">
                                                    <LatexText text={ans.questionText} />
                                                    {ans.visualData && (
                                                        <div className="log-visual-area" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                                                            <DynamicVisual type={ans.type} data={ans.visualData} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="log-answers">
                                                    <div className={`log-answer-box ${ans.isCorrect ? 'correct-box' : 'wrong-box'}`}>
                                                        <span className="log-label">Your Answer</span>
                                                        <span className="log-value">{ans.selectedOption}</span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="log-answer-box correct-box">
                                                            <span className="log-label">Correct Answer</span>
                                                            <span className="log-value">{ans.correctAnswer}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="log-explanation">
                                                    <span className="log-label" style={{ color: '#4C51BF' }}>Explain? 💡</span>
                                                    <LatexText text={ans.explanation} />
                                                </div>
                                            </div>
                                            <div className="log-icon">
                                                {ans.isCorrect ? (
                                                    <Check size={32} color="#4FB7B3" strokeWidth={3} />
                                                ) : (
                                                    <X size={32} color="#FF6B6B" strokeWidth={3} />
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="practice-summary" style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                                {Object.values(answers).map((ans, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        style={{
                                            width: '50px', height: '50px', borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '1.5rem',
                                            background: ans.isCorrect ? '#C6F6D5' : '#FED7D7',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        {ans.isCorrect ? '✅' : '❌'}
                                    </motion.div>
                                ))}
                            </div>
                            <p style={{ fontSize: '1.3rem', fontWeight: 400, color: '#4A5568', marginBottom: '10px' }}>
                                {percentage >= 80 ? '🌟 Amazing work! Keep it up!' :
                                    percentage >= 60 ? '💪 Good effort! Keep practicing!' :
                                        '🌱 Nice try! Practice makes perfect!'}
                            </p>
                        </div>
                    )}

                    <div className="results-actions">
                        <button className="action-btn-large retake-skill-btn" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Retake Skill
                        </button>

                        {getNextSkill() && (
                            <button className="action-btn-large next-skill-btn" onClick={() => {
                                const next = getNextSkill();
                                navigate(`/junior/grade/1/${next.route}?skillId=${next.id}`);
                                window.location.reload(); // Ensure fresh state if route is the same
                            }}>
                                Next Skill <ArrowRight size={24} />
                            </button>
                        )}

                        <button className="action-btn-large back-topics-btn" onClick={() => navigate('/junior/grade/1')}>
                            <FileText size={24} /> Back to Topics
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    const currentQ = sessionQuestions[qIndex];

    return (
        <div className="grade1-practice-page">
            <div className="g1-bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="g1-practice-container">
                <div className="g1-header-nav">
                    <div className="g1-timer-badge">
                        <Timer size={18} />
                        {formatTime(timer)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
                            Q {qIndex + 1}/{totalQuestions}
                        </span>
                        <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <LatexText text={skillName} />
                        </span>
                    </div>

                    {isTest && (
                        <button
                            className="g1-skip-btn"
                            onClick={handleSkip}
                            disabled={isAnswered}
                            style={{
                                marginLeft: '10px',
                                background: '#EDF2F7',
                                color: '#4A5568',
                                padding: '8px 15px',
                                borderRadius: '15px',
                                fontWeight: 400,
                                fontSize: '0.9rem',
                                border: 'none',
                                cursor: isAnswered ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                        >
                            Skip Quest ⏭️
                        </button>
                    )}

                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
                        <StickerExit onClick={handleExit} />
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 10px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>

                    <div className="g1-content-split">
                        <div className="g1-visual-area">
                            <DynamicVisual type={currentQ.type} data={currentQ.visualData} />
                        </div>

                        <div className="g1-quiz-side">
                            <div className="g1-options-grid">
                                {currentQ.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`g1-option-btn 
                                            ${selectedOption === opt ? (isTest ? 'selected-test' : (isAnswered ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : 'selected-test')) : ''}
                                            ${!isTest && isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}
                                        `}
                                        onClick={() => handleOptionSelect(opt)}
                                        disabled={isAnswered}
                                    >
                                        <LatexText text={opt.toString()} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* --- INJECTED FOOTER V2 --- */}
                    <div className="g1-navigation-footer">
                        <button className="g1-nav-btn prev-btn" onClick={() => { if (qIndex > 0) setQIndex(qIndex - 1); }} disabled={qIndex === 0}>
                            <ChevronLeft size={24} /> Prev
                        </button>

                        <div>
                            {isAnswered && !isTest && !answers[qIndex]?.isCorrect && (
                                <button className="g1-nav-btn steps-btn" onClick={() => setShowExplanationModal(true)}>
                                    <Eye size={24} /> Steps
                                </button>
                            )}

                            {!isAnswered ? (
                                <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>
                                    Next <ChevronRight size={24} />
                                </button>
                            ) : (
                                <button className="g1-nav-btn next-btn" onClick={handleNext}>
                                    {qIndex === totalQuestions - 1 ? (isTest ? 'Finish Test' : 'Finish') : 'Next Question'} <ChevronRight size={24} />
                                </button>
                            )}
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
                onNext={() => {
                    setShowExplanationModal(false);
                    handleNext();
                }}
            />
        </div>
    );
};

export default Addition;

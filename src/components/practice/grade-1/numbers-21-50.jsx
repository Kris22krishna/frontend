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

const DynamicVisual = ({ type, data, isAnswered }) => {
    const { num, color } = data;
    const hundreds = Math.floor(num / 100);
    const tens = Math.floor((num % 100) / 10);
    const ones = num % 10;

    if (type === 'comparison') {
        const { n1, n2, color1, color2, isGreater } = data;
        return (
            <div style={{ display: 'flex', gap: 'clamp(20px, 8vw, 40px)', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-compare-item">
                    <div style={{ fontSize: '2rem', fontWeight: 400, color: color1, marginBottom: '8px' }}>{n1}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 15px)', gap: '4px' }}>
                        {Array.from({ length: Math.floor(n1 / 10) }).map((_, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column-reverse', gap: '2px', background: color1 + '20', padding: '2px', borderRadius: '4px' }}>
                                {Array.from({ length: 10 }).map((_, j) => (
                                    <div key={j} style={{ width: '15px', height: '6px', backgroundColor: color1, borderRadius: '1px' }}></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>
                <div style={{ fontSize: '1.5rem', fontWeight: 400, color: '#666' }}>VS</div>
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-compare-item">
                    <div style={{ fontSize: '2rem', fontWeight: 400, color: color2, marginBottom: '8px' }}>{n2}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 15px)', gap: '4px' }}>
                        {Array.from({ length: Math.floor(n2 / 10) }).map((_, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column-reverse', gap: '2px', background: color2 + '20', padding: '2px', borderRadius: '4px' }}>
                                {Array.from({ length: 10 }).map((_, j) => (
                                    <div key={j} style={{ width: '15px', height: '6px', backgroundColor: color2, borderRadius: '1px' }}></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="g1-place-value-table-container" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2px',
                background: '#E2E8F0',
                border: '3px solid #E2E8F0',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
            }}>
                {/* Header Row */}
                <div style={{ background: '#F8FAFC', padding: '12px', textAlign: 'center', borderBottom: '2px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>Hundreds</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '12px', textAlign: 'center', borderBottom: '2px solid #E2E8F0', borderLeft: '2px solid #E2E8F0', borderRight: '2px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#0891B2', textTransform: 'uppercase', letterSpacing: '1px' }}>Tens</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '12px', textAlign: 'center', borderBottom: '2px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#EC4899', textTransform: 'uppercase', letterSpacing: '1px' }}>Ones</div>
                </div>

                {/* Content Row */}
                <div style={{ background: 'white', padding: '20px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
                    {hundreds > 0 ? (
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: '#CBD5E1' }}>{hundreds}</div>
                    ) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px dashed #E2E8F0' }}></div>
                    )}
                </div>
                <div style={{ background: 'white', padding: '20px 10px', display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', alignItems: 'flex-end', minHeight: '120px', borderLeft: '2px solid #F1F5F9', borderRight: '2px solid #F1F5F9' }}>
                    {tens > 0 ? Array.from({ length: tens }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                            style={{ display: 'flex', flexDirection: 'column-reverse', gap: '1px', padding: '3px', border: '2px solid #E2E8F0', borderRadius: '6px', background: 'white' }}
                        >
                            {Array.from({ length: 10 }).map((_, j) => (
                                <div key={j} style={{ width: '12px', height: '6px', backgroundColor: color, borderRadius: '1px' }}></div>
                            ))}
                        </motion.div>
                    )) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px dashed #E2E8F0' }}></div>
                    )}
                </div>
                <div style={{ background: 'white', padding: '20px 10px', display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
                    {ones > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 14px)', gap: '4px' }}>
                            {Array.from({ length: ones }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (tens * 0.1) + (i * 0.05) }}
                                    style={{ width: '14px', height: '14px', backgroundColor: color, borderRadius: '3px', opacity: 0.9 }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px dashed #E2E8F0' }}></div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isAnswered && (
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={{ marginTop: '20px', textAlign: 'center' }}
                    >
                        <div style={{ display: 'inline-flex', gap: '12px', padding: '10px 24px', background: 'white', borderRadius: '100px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #F1F5F9' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0891B2' }}>{tens}</span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748B' }}>Tens</span>
                            </div>
                            <div style={{ width: '1px', background: '#E2E8F0' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#EC4899' }}>{ones}</span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748B' }}>Ones</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Numbers21to50 = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === '805';
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
        for (const gradeKey of Object.keys(TOPIC_CONFIGS)) {
            const gradeConfig = TOPIC_CONFIGS[gradeKey];
            for (const [topicName, skills] of Object.entries(gradeConfig)) {
                const skill = skills.find(s => s.id === skillId);
                if (skill) return { topicName, skillName: skill.name, grade: gradeKey };
            }
        }
        return { topicName: 'Numbers 21-50', skillName: 'Mathematics', grade: '1' };
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

        if (currentSkillIdx < currentTopicSkills.length - 1) {
            return {
                ...currentTopicSkills[currentSkillIdx + 1],
                topicName: topics[currentTopicIdx]
            };
        }

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

        return null;
    };

    const { topicName, skillName } = getTopicInfo();
    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];

        for (let i = 0; i < totalQuestions; i++) {
            let question = {};
            const color1 = colors[i % colors.length];
            const color2 = colors[(i + 1) % colors.length];

            let typeToGen = 'counting';
            if (isTest) {
                if (i < 4) typeToGen = 'counting';
                else if (i < 7) typeToGen = 'tens-ones';
                else typeToGen = 'comparison';
            } else if (selectedSkill === '801' || !selectedSkill) {
                typeToGen = 'counting';
            } else if (selectedSkill === '802') {
                typeToGen = 'tens-ones';
            } else if (selectedSkill === 'G1-CH8-03' || selectedSkill === '804') {
                typeToGen = 'comparison';
            } else {
                typeToGen = 'counting';
            }

            if (typeToGen === 'counting') {
                // Counting and recognition 21-50
                const num = Math.floor(Math.random() * 30) + 21;
                question = {
                    text: `Look at the table. What number is shown in the blocks? 🔢`,
                    options: [num, num + 1, num - (num > 30 ? 10 : 1)].filter((v, idx, s) => s.indexOf(v) === idx).sort(() => 0.5 - Math.random()),
                    correct: num,
                    type: 'counting',
                    visualData: { num, color: color1 },
                    explanation: `There are ${Math.floor(num / 10)} bundles of ten and ${num % 10} single blocks. That makes the number ${num}!`
                };
            } else if (typeToGen === 'tens-ones') {
                // Tens and Ones
                const tens = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
                const ones = Math.floor(Math.random() * 10);
                const num = tens * 10 + ones;
                const options = [
                    `${tens} Tens, ${ones} Ones`,
                    `${ones} Tens, ${tens} Ones`,
                    `${tens - 1} Tens, ${ones} Ones`
                ].sort(() => 0.5 - Math.random());
                question = {
                    text: `Break it down! How many Tens and Ones do you see? 🧐`,
                    options: options,
                    correct: `${tens} Tens, ${ones} Ones`,
                    type: 'tens-ones',
                    visualData: { num, color: color1 },
                    explanation: `The number ${num} is made of ${tens} Tens and ${ones} Ones.`
                };
            } else if (typeToGen === 'comparison') {
                // Comparison
                const n1 = Math.floor(Math.random() * 30) + 21;
                let n2 = Math.floor(Math.random() * 30) + 21;
                while (Math.abs(n1 - n2) < 5) n2 = Math.floor(Math.random() * 30) + 21;
                const isGreater = Math.random() > 0.5;
                const correct = isGreater ? (n1 > n2 ? n1 : n2) : (n1 < n2 ? n1 : n2);
                question = {
                    text: `Which number is ${isGreater ? 'LARGER' : 'SMALLER'}?`,
                    options: [n1, n2],
                    correct: correct,
                    type: 'comparison',
                    visualData: { n1, n2, color1, color2, isGreater },
                    explanation: `${correct} is ${isGreater ? 'larger' : 'smaller'} than ${correct === n1 ? n2 : n1}.`
                };
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
                const session = await api.createPracticeSession(userId, parseInt(skillId) || 801);
                setSessionId(session?.session_id);
            } catch (e) { console.error(e); }
        };
        init();
    }, [user, skillId]);

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
                explanation: sessionQuestions[qIndex].explanation || "Detailed explanation is coming soon! Feel free to ask your teacher for help in the meantime. 💡"
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

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        let interval;
        if (!showResults && sessionQuestions.length > 0) {
            interval = setInterval(() => setTimer(v => v + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [showResults, sessionQuestions]);

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
                                window.location.reload();
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

                    {isTest && !isAnswered && (
                        <button className="g1-skip-btn" onClick={handleSkip}>
                            Skip Quest ⏭️
                        </button>
                    )}

                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
                        <StickerExit onClick={handleExit} />
                    </div>
                </div>
                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text">{currentQ.text}</h2>
                    <div className="g1-content-split">
                        <div className="g1-visual-area">
                            <DynamicVisual type={currentQ.type} data={currentQ.visualData} isAnswered={isAnswered} />
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
                                    {isTest ? 'Next' : 'Check Answer'} <ChevronRight size={24} />
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
                onClose={() => setShowExplanationModal(false)}
                onNext={() => {
                    setShowExplanationModal(false);
                    handleNext();
                }}
            />
        </div>
    );
};

export default Numbers21to50;

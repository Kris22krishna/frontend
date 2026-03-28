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

const SizeVisual = ({ data }) => {
    const { aSize, bSize, orientation = 'vertical' } = data;
    const isHorizontal = orientation === 'horizontal';

    return (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="size-visual" style={{ border: 'none', background: 'transparent', display: 'flex', gap: '30px', alignItems: 'flex-end', justifyContent: 'center', height: '140px' }}>
            <div style={{ display: 'flex', flexDirection: isHorizontal ? 'column' : 'row', gap: '20px', alignItems: isHorizontal ? 'flex-start' : 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: isHorizontal ? 'row' : 'column', alignItems: 'center', gap: '8px' }}>
                    <motion.div
                        initial={isHorizontal ? { width: 0 } : { height: 0 }}
                        animate={isHorizontal ? { width: aSize } : { height: aSize }}
                        style={{
                            width: isHorizontal ? `${aSize}px` : '40px',
                            height: isHorizontal ? '40px' : `${aSize}px`,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                    />
                    <span style={{ fontWeight: 'bold', color: '#4A5568' }}>A</span>
                </div>
                <div style={{ display: 'flex', flexDirection: isHorizontal ? 'row' : 'column', alignItems: 'center', gap: '8px' }}>
                    <motion.div
                        initial={isHorizontal ? { width: 0 } : { height: 0 }}
                        animate={isHorizontal ? { width: bSize } : { height: bSize }}
                        style={{
                            width: isHorizontal ? `${bSize}px` : '40px',
                            height: isHorizontal ? '40px' : `${bSize}px`,
                            background: 'linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                    />
                    <span style={{ fontWeight: 'bold', color: '#4A5568' }}>B</span>
                </div>
            </div>
        </motion.div>
    );
};

const DynamicVisual = ({ type, data }) => {
    if (type === 'shape') {
        const { shape, color } = data;
        return (
            <motion.div
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="g1-visual-item"
            >
                <svg width="100%" height="100%" style={{ maxWidth: '300px', maxHeight: '300px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} viewBox="0 0 100 100">
                    {shape === 'circle' && <circle cx="50" cy="50" r="42" fill={color} />}
                    {shape === 'square' && <rect x="8" y="8" width="84" height="84" fill={color} />}
                    {shape === 'triangle' && <polygon points="50,5 95,90 5,90" fill={color} />}
                    {shape === 'rectangle' && <rect x="5" y="25" width="90" height="50" fill={color} />}
                    {shape === 'oval' && <ellipse cx="50" cy="50" rx="45" ry="30" fill={color} />}
                </svg>
            </motion.div>
        );
    }
    if (type === 'position') {
        const { pos } = data;
        return (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="position-visual" style={{ border: "none" }}>
                <svg width="100%" height="100%" style={{ maxWidth: '300px' }} viewBox="0 0 220 120">
                    <rect x="50" y="40" width="100" height="70" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
                    <text x="100" y="85" textAnchor="middle" fill="#64748B" fontSize="14" fontWeight="600">BOX</text>
                    {pos === 'top' && <motion.circle initial={{ y: -20 }} animate={{ y: 0 }} cx="100" cy="20" r="18" fill="url(#ballGradient)" />}
                    {pos === 'bottom' && <motion.circle initial={{ y: 20 }} animate={{ y: 0 }} cx="100" cy="95" r="18" fill="url(#ballGradient)" />}
                    {pos === 'inside' && <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} cx="100" cy="75" r="18" fill="url(#ballGradient)" />}
                    {pos === 'outside' && <motion.circle initial={{ x: -20 }} animate={{ x: 0 }} cx="25" cy="75" r="18" fill="url(#ballGradient)" />}
                    {pos === 'far' && <motion.circle initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} cx="205" cy="35" r="10" fill="url(#ballGradient)" />}
                    <defs>
                        <radialGradient id="ballGradient">
                            <stop offset="0%" stopColor="#FFD54F" />
                            <stop offset="100%" stopColor="#FB8C00" />
                        </radialGradient>
                    </defs>
                </svg>
            </motion.div>
        );
    }
    if (type === 'size') {
        return <SizeVisual data={data} />;
    }
    return null;
};

const ShapesAndSpace = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === '104';
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
    const qIndexRef = React.useRef(0);
    const nextTimeoutRef = React.useRef(null);
    const [isTransitioning, setIsTransitioning] = React.useState(false);
    useEffect(() => { qIndexRef.current = qIndex; }, [qIndex]);

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
        return { topicName: 'Shapes and Space', skillName: 'Mathematics', grade: '1' };
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
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'].sort(() => 0.5 - Math.random());

        // Pre-shuffled pools for 100% uniqueness per session
        const shapesPool = ['circle', 'square', 'triangle', 'rectangle', 'oval'].sort(() => 0.5 - Math.random());
        const posPool = [
            { q: 'Where is the yellow ball?', a: 'top' },
            { q: 'Is the ball inside or outside the box?', a: 'inside' },
            { q: 'Where is the ball located?', a: 'bottom' },
            { q: 'Where can you see the ball?', a: 'outside' },
            { q: 'Look closely, where is the ball?', a: 'far' }
        ].sort(() => 0.5 - Math.random());
        const sizePool = [
            { q: 'Which bar is HIGHER?', a: 'A', aSize: 120, bSize: 60, orient: 'vertical', exp: 'Bar A has a greater height than Bar B.' },
            { q: 'Which bar is SMALLER?', a: 'B', aSize: 100, bSize: 40, orient: 'vertical', exp: 'Bar B is significantly shorter than Bar A.' },
            { q: 'Which bar is BIGGER?', a: 'A', aSize: 130, bSize: 70, orient: 'vertical', exp: 'Bar A is the larger one among the two.' },
            { q: 'Which bar is LONGER?', a: 'A', aSize: 160, bSize: 80, orient: 'horizontal', exp: 'Bar A extends much further horizontally.' },
            { q: 'Which bar is SHORTER?', a: 'B', aSize: 150, bSize: 60, orient: 'horizontal', exp: 'Bar B is not as long as Bar A.' },
            { q: 'Which one is TALLER?', a: 'A', aSize: 130, bSize: 50, orient: 'vertical', exp: 'Looking at the vertical height, A is taller.' }
        ].sort(() => 0.5 - Math.random());

        for (let i = 0; i < totalQuestions; i++) {
            let question = {};

            // Skill Allocation Logic
            let typeToGen = 'shape';
            if (isTest) {
                if (i < 4) typeToGen = 'shape';
                else if (i < 7) typeToGen = 'position';
                else typeToGen = 'size';
            } else if (selectedSkill === '101' || !selectedSkill) {
                typeToGen = 'shape';
            } else if (selectedSkill === '102') {
                typeToGen = 'position';
            } else if (selectedSkill === '103') {
                typeToGen = 'size';
            }

            if (typeToGen === 'shape') {
                const target = shapesPool[i % shapesPool.length];
                const otherOptions = shapesPool.filter(s => s !== target);
                question = {
                    text: `What shape is this?`,
                    options: [target, ...otherOptions.sort(() => 0.5 - Math.random()).slice(0, 2)].sort(() => 0.5 - Math.random()),
                    correct: target,
                    type: 'shape',
                    visualData: { shape: target, color: colors[i % colors.length] },
                    explanation: `This object has the characteristics of ${target === 'oval' ? 'an' : 'a'} ${target.toUpperCase()}.`
                };
            } else if (typeToGen === 'position') {
                const item = posPool[i % posPool.length];
                const pool = ['top', 'bottom', 'inside', 'outside', 'far'];
                const otherOptions = pool.filter(p => p !== item.a);
                question = {
                    text: item.q,
                    options: [item.a, ...otherOptions.sort(() => 0.5 - Math.random()).slice(0, 3)].sort(() => 0.5 - Math.random()),
                    correct: item.a,
                    type: 'position',
                    visualData: { pos: item.a },
                    explanation: `The ball is positioned at the ${item.a.toUpperCase()} in this visual representation.`
                };
            } else if (typeToGen === 'size') {
                const item = sizePool[i % sizePool.length];
                question = {
                    text: item.q,
                    options: ['A', 'B'],
                    correct: item.a,
                    type: 'size',
                    visualData: { aSize: item.aSize, bSize: item.bSize, orientation: item.orient },
                    explanation: item.exp
                };
            } else {
                // Default fallback
                question = { text: "Look at the object!", options: ["Yes"], correct: "Yes", type: "shape", visualData: { shape: 'circle', color: '#FF6B6B' }, explanation: "Visual matching is key here!" };
            }
            questions.push(question);
        }
        return questions;
    };

    useEffect(() => {
        const init = async () => {
            setQIndex(0);
            setScore(0);
            setShowResults(false);
            setAnswers({});
            setIsAnswered(false);
            setSelectedOption(null);

            const userId = user?.user_id || user?.id;
            if (!userId) return;
            const qs = generateQuestions(skillId);
            setSessionQuestions(qs);
            try {
                const session = await api.createPracticeSession(userId, parseInt(skillId) || 101);
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
        setIsTransitioning(false);
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
            const skId = typeof skillId !== 'undefined' ? skillId : '0';
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
            // Clear any existing timeout just in case
            if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current);
            // Give a tiny delay so they see the option highlight green
            nextTimeoutRef.current = setTimeout(() => {
                handleNext();
            }, 800);
        }
    };

    const handleNext = async () => {
        if (showResults || isTransitioning) return;

        // Clear any pending auto-advance timeout
        if (nextTimeoutRef.current) {
            clearTimeout(nextTimeoutRef.current);
            nextTimeoutRef.current = null;
        }

        const currentIndex = qIndexRef.current;
        if (currentIndex < totalQuestions - 1) {
            setIsTransitioning(true);
            setQIndex(prev => prev + 1);
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
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#31326F', fontFamily: 'Fredoka, cursive' }}>Adventure Complete! 🎉</h2>

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
                                                        <span className="log-value">{typeof ans.selectedOption === 'string' ? ans.selectedOption.charAt(0).toUpperCase() + ans.selectedOption.slice(1) : ans.selectedOption}</span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="log-answer-box correct-box">
                                                            <span className="log-label">Correct Answer</span>
                                                            <span className="log-value">{typeof ans.correctAnswer === 'string' ? ans.correctAnswer.charAt(0).toUpperCase() + ans.correctAnswer.slice(1) : ans.correctAnswer}</span>
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
                            <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#4A5568', marginBottom: '10px' }}>
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
    if (!currentQ) return null;

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

                <div className="g1-progress-container" style={{ margin: '0 0 10px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>

                    <div className="g1-content-split">
                        <div className="g1-visual-area" style={{ border: "none", background: "transparent" }}>
                            <DynamicVisual key={qIndex} type={currentQ.type} data={currentQ.visualData} />
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
                                        <LatexText text={opt.charAt(0).toUpperCase() + opt.slice(1)} />
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
                correctAnswer={typeof currentQ.correct === 'string' ? currentQ.correct.charAt(0).toUpperCase() + currentQ.correct.slice(1) : currentQ.correct}
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

export default ShapesAndSpace;

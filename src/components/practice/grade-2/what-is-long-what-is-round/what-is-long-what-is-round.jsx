import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../../contexts/AuthContext';
import { api } from '../../../../services/api';
import Navbar from '../../../Navbar';
import { TOPIC_CONFIGS } from '../../../../lib/topicConfig';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import mascotImg from '../../../../assets/mascot.png';
import avatarImg from '../../../../assets/avatar.png';
import '../../../../pages/juniors/class-1/Grade1Practice.css';

const DynamicVisual = ({ type, data }) => {
    if (type === 'shape') {
        const { shape, color } = data;
        return (
            <motion.div initial={{ scale: 0.5, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} className="g1-visual-item flex justify-center w-full">
                <svg width="100%" height="auto" style={{ maxWidth: '300px', maxHeight: '300px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} viewBox="0 0 100 100">
                    {shape === 'circle' && <circle cx="50" cy="50" r="42" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="2" />}
                    {shape === 'square' && <rect x="8" y="8" width="84" height="84" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="2" />}
                    {shape === 'triangle' && <polygon points="50,5 95,90 5,90" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="2" />}
                    {shape === 'rectangle' && <rect x="5" y="25" width="90" height="50" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="2" />}
                    {shape === 'oval' && <ellipse cx="50" cy="50" rx="45" ry="30" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="2" />}
                </svg>
            </motion.div>
        );
    }

    if (type === 'length') {
        const { aLength, bLength, objectType } = data;
        const renderObject = (width, color, type, label) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%' }}>
                    <div style={{ fontWeight: '900', color: color, fontSize: '1.5rem', minWidth: '30px' }}>{label}</div>
                    <div className="g1-visual-item" style={{ flexGrow: 1, height: '60px', position: 'relative', background: '#f8fafc', borderRadius: '10px', padding: '10px', border: '1px dashed #cbd5e1' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${width}%` }}
                            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
                            style={{ height: '100%', position: 'relative' }}
                        >
                            {type === 'pencil' && (
                                <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0,5 L85,5 L95,10 L85,15 L0,15 Z" fill={color} />
                                    <path d="M85,5 L95,10 L85,15 Z" fill="#FFDBAC" />
                                    <path d="M92,8 L95,10 L92,12 Z" fill="#333" />
                                    <rect x="0" y="5" width="15" height="10" fill="#FFADAD" rx="2" />
                                    <rect x="15" y="5" width="2" height="10" fill="rgba(0,0,0,0.1)" />
                                </svg>
                            )}
                            {type === 'bat' && (
                                <svg width="100%" height="100%" viewBox="0 0 100 25" preserveAspectRatio="none">
                                    <rect x="0" y="8" width="30" height="9" rx="2" fill="#8B4513" />
                                    <path d="M30,5 L95,2 L100,5 L100,20 L95,23 L30,20 Z" fill="#DEB887" stroke="#8B4513" strokeWidth="0.5" />
                                    <rect x="0" y="9" width="15" height="7" fill="#4A90E2" rx="1" />
                                </svg>
                            )}
                            {type === 'snake' && (
                                <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
                                    <circle cx="100" cy="10" r="3" fill={color} />
                                    <circle cx="101" cy="9" r="0.5" fill="black" />
                                </svg>
                            )}
                            {type === 'ruler' && (
                                <svg width="100%" height="100%" viewBox="0 0 100 15" preserveAspectRatio="none">
                                    <rect x="0" y="2" width="100" height="11" fill="#FFD93D" stroke="#B8860B" strokeWidth="0.5" />
                                    {[...Array(20)].map((_, i) => (
                                        <line key={i} x1={i * 5} y1="2" x2={i * 5} y2={i % 5 === 0 ? 8 : 5} stroke="#B8860B" strokeWidth="0.5" />
                                    ))}
                                </svg>
                            )}
                        </motion.div>
                    </div>
                </div>
            );
        };
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', padding: '10px' }}>

                {renderObject(aLength, '#4ECDC4', objectType, 'A')}
                {renderObject(bLength, '#FF6B6B', objectType, 'B')}
            </div>
        );
    }

    if (type === 'emoji') {
        const { emoji } = data;
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ fontSize: '6rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', width: '100%' }}
            >
                {emoji}
            </motion.div>
        );
    }

    return null;
};

const Grade2WhatIsLong = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId ? (skillId.includes('TEST') || skillId.startsWith('11')) : false;
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
    const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);

    const getTopicInfo = () => {
        const grade2Config = TOPIC_CONFIGS['2'];
        if (!grade2Config) return { topicName: 'Practice', skillName: 'Mathematics' };

        for (const [topicName, skills] of Object.entries(grade2Config)) {
            const skill = skills.find(s => s.id === skillId);
            if (skill) return { topicName, skillName: skill.name };
        }
        return { topicName: 'What is Long, What is Round?', skillName: 'Practice' };
    };

    const { topicName, skillName } = getTopicInfo();
    const getNextSkill = () => {
        const grade2Config = TOPIC_CONFIGS['2'];
        if (!grade2Config) return null;

        const topics = Object.keys(grade2Config);
        let currentTopicIdx = -1;
        let currentSkillIdx = -1;

        for (let i = 0; i < topics.length; i++) {
            const skills = grade2Config[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) {
                currentTopicIdx = i;
                currentSkillIdx = idx;
                break;
            }
        }

        if (currentTopicIdx === -1) return null;

        const currentTopicSkills = grade2Config[topics[currentTopicIdx]];

        if (currentSkillIdx < currentTopicSkills.length - 1) {
            return {
                ...currentTopicSkills[currentSkillIdx + 1],
                topic: topics[currentTopicIdx]
            };
        }

        if (currentTopicIdx < topics.length - 1) {
            const nextTopicSkills = grade2Config[topics[currentTopicIdx + 1]];
            if (nextTopicSkills.length > 0) {
                return {
                    ...nextTopicSkills[0],
                    topic: topics[currentTopicIdx + 1]
                };
            }
        }

        return null;
    };

    const generateShapeQuestions = () => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#C9A9E9'];
        const shapes = ['circle', 'square', 'triangle', 'rectangle', 'oval'];
        const shuffledTargets = [...shapes].sort(() => 0.5 - Math.random());

        for (let i = 0; i < totalQuestions; i++) {
            const target = shuffledTargets[i % shapes.length];
            const otherOptions = shapes.filter(s => s !== target);
            questions.push({
                text: `Identify this 2D shape!`,
                options: [target, ...otherOptions.sort(() => 0.5 - Math.random()).slice(0, 3)].sort(() => 0.5 - Math.random()),
                correct: target,
                type: 'shape',
                visualData: { shape: target, color: colors[i % colors.length] },
                explanation: `This object has the properties of a ${target}.`
            });
        }
        return questions;
    };

    const generateLengthQuestions = () => {
        const questions = [];
        const objectTypes = ['pencil', 'bat', 'snake', 'ruler'];
        for (let i = 0; i < totalQuestions; i++) {
            const isALonger = Math.random() > 0.5;
            const aLen = isALonger ? 85 : 45;
            const bLen = isALonger ? 45 : 85;
            const longerQ = Math.random() > 0.5;
            const objectType = objectTypes[Math.floor(Math.random() * objectTypes.length)];

            questions.push({
                text: longerQ ? `Which one is LONGER?` : `Which one is SHORTER?`,
                options: ['A', 'B'],
                correct: longerQ ? (isALonger ? 'A' : 'B') : (isALonger ? 'B' : 'A'),
                type: 'length',
                visualData: { aLength: aLen, bLength: bLen, objectType },
                explanation: longerQ ? `The object that stretches further is longer.` : `The object that covers less distance is shorter.`
            });
        }
        return questions;
    };

    const generateRoundQuestions = () => {
        const questions = [];
        const roundObjects = [
            { emoji: '⚽', name: 'Ball' },
            { emoji: '🎡', name: 'Wheel' },
            { emoji: '🪙', name: 'Coin' },
            { emoji: '🍊', name: 'Orange' },
            { emoji: '📀', name: 'CD' }
        ];
        const nonRoundObjects = [
            { emoji: '📦', name: 'Box' },
            { emoji: '📐', name: 'Ruler' },
            { emoji: '🧱', name: 'Brick' },
            { emoji: '📱', name: 'Phone' },
            { emoji: '📖', name: 'Book' }
        ];

        // Shuffle arrays to ensure variety and uniqueness
        const shuffledRound = [...roundObjects].sort(() => 0.5 - Math.random());
        const shuffledNonRound = [...nonRoundObjects].sort(() => 0.5 - Math.random());

        // For a 5 question session, we want exactly 3 round and 2 non-round objects
        const targetTypes = [];
        for (let i = 0; i < totalQuestions; i++) {
            if (i < 3) { // First 3 are round
                targetTypes.push({ isRound: true, item: shuffledRound[i % shuffledRound.length] });
            } else { // Next 2 are non-round
                targetTypes.push({ isRound: false, item: shuffledNonRound[(i - 3) % shuffledNonRound.length] });
            }
        }

        // Shuffle the types so the order of round/non-round questions is random
        const shuffledTargets = targetTypes.sort(() => 0.5 - Math.random());

        for (let i = 0; i < totalQuestions; i++) {
            const { isRound, item } = shuffledTargets[i];

            if (isRound) {
                questions.push({
                    text: `Is this a ROUND object?`,
                    options: ['Yes', 'No'],
                    correct: 'Yes',
                    type: 'emoji',
                    visualData: { emoji: item.emoji, isRound: true },
                    explanation: `Objects like a ${item.name} are round.`
                });
            } else {
                questions.push({
                    text: `Is this a ROUND object?`,
                    options: ['Yes', 'No'],
                    correct: 'No',
                    type: 'emoji',
                    visualData: { emoji: item.emoji, isRound: false },
                    explanation: `Objects like a ${item.name} are not round.`
                });
            }
        }
        return questions;
    };

    const generateQuestions = (selectedSkill) => {
        if (selectedSkill === '1001') return generateShapeQuestions();
        if (selectedSkill === '1002') return generateLengthQuestions();
        if (selectedSkill === '1003') return generateRoundQuestions();

        // MIXED For Test — generate extra, deduplicate, then slice
        const pool = [
            ...generateShapeQuestions(),
            ...generateLengthQuestions(),
            ...generateRoundQuestions()
        ].sort(() => 0.5 - Math.random());
        const seen = new Set();
        const unique = pool.filter(q => {
            const key = q.text + '||' + q.correct;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
        return unique.slice(0, totalQuestions);
    };

    useEffect(() => {
        const init = async () => {
            const userId = user?.user_id || user?.id;
            if (!userId) return;
            const qs = generateQuestions(skillId);
            setSessionQuestions(qs);
            try {
                const parsedSkillId = parseInt(skillId) || 0;
                const session = await api.createPracticeSession(userId, parsedSkillId);
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
        navigate('/junior/grade/2');
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

        // Auto-log
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

        if (!isTest && !isCorrect) {
            setShowExplanationModal(true);
        } else {
            setIsAutoAdvancing(true);
            setTimeout(() => {
                handleNext();
                setIsAutoAdvancing(false);
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
                        <button className="action-btn-large play-again-btn" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Retake Test
                        </button>

                        {getNextSkill() && (
                            <button className="action-btn-large next-skill-btn" onClick={() => {
                                const next = getNextSkill();
                                navigate(`/junior/grade/2/${next.route}?skillId=${next.id}`);
                                window.location.reload();
                            }}>
                                Next Skill <ArrowRight size={24} />
                            </button>
                        )}

                        <button className="action-btn-large back-topics-btn" onClick={() => navigate('/junior/grade/2')}>
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
                        <button className="g1-skip-btn" onClick={handleSkip} style={{ marginLeft: '15px' }}>
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
                                            ${selectedOption === opt.toString() || selectedOption === opt ? (isTest ? 'selected-test' : (isAnswered ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : 'selected-test')) : ''}
                                            ${!isTest && isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}
                                        `}
                                        onClick={() => handleOptionSelect(opt)}
                                        disabled={isAnswered}
                                    >
                                        <LatexText text={opt.toString().charAt(0).toUpperCase() + opt.toString().slice(1)} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

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
                                    Check Answer <ChevronRight size={24} />
                                </button>
                            ) : (
                                <button className="g1-nav-btn next-btn" onClick={handleNext} disabled={isAutoAdvancing}>
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
                onNext={() => setShowExplanationModal(false)}
            />
        </div>
    );
};

export default Grade2WhatIsLong;
